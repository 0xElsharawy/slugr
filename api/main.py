from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyHttpUrl

from middlewares import logging
from database.db import get_db
from database.redis import get_redis
from database.models import Url
from utils import create_unique_slug

app = FastAPI()


app.add_middleware(logging.LoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


class CreateUrlRequest(BaseModel):
    url: AnyHttpUrl


@app.post("/urls")
def create_url(
    payload: CreateUrlRequest, db: Session = Depends(get_db), redis=Depends(get_redis)
):
    stmt = select(Url).where(Url.url == str(payload.url))
    url = db.execute(stmt).scalar_one_or_none()
    if url:
        return {"short_code": url.short_code}
    slug = create_unique_slug(db)
    url = Url(url=str(payload.url), short_code=slug)
    db.add(url)
    db.commit()
    redis.set(slug, str(payload.url), ex=300)
    return {"short_code": slug}


@app.get("/{short_code}")
def redirect(short_code: str, db: Session = Depends(get_db), redis=Depends(get_redis)):
    url = redis.get(short_code)
    if url:
        print("URL from Redis:", url)
        return RedirectResponse(url)
    stmt = select(Url).where(Url.short_code == short_code)
    url = db.execute(stmt).scalar_one_or_none()
    print("URL:", url.url if url else "None")
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    redis.set(short_code, url.url, ex=300)
    return RedirectResponse(url.url)
