from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.orm import Session
from pydantic import BaseModel, AnyHttpUrl

from middlewares import logging
from database.db import get_db
from database.models import Url
from utils import create_unique_slug, parse_expires_at

app = FastAPI()


app.add_middleware(logging.LoggingMiddleware)


@app.get("/")
def root():
    return {"message": "Hello World"}


class CreateUrlRequest(BaseModel):
    url: AnyHttpUrl
    expire_in: str | None = None


@app.post("/urls")
def create_url(payload: CreateUrlRequest, db: Session = Depends(get_db)):
    stmt = select(Url).where(Url.url == str(payload.url))
    url = db.execute(stmt).scalar_one_or_none()
    if url:
        return {"short_code": url.short_code}
    slug = create_unique_slug(db)
    expires_at = parse_expires_at(payload.expire_in) if payload.expire_in else None
    url = Url(url=str(payload.url), short_code=slug, expires_at=expires_at)
    db.add(url)
    db.commit()
    return {"short_code": slug}


@app.get("/{short_code}")
def redirect(short_code: str, db: Session = Depends(get_db)):
    stmt = select(Url).where(Url.short_code == short_code)
    url = db.execute(stmt).scalar_one_or_none()
    print("URL:", url.url if url else "None")
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    return RedirectResponse(url.url)
