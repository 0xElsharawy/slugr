from fastapi import FastAPI

from middlewares import logging

app = FastAPI()


app.add_middleware(logging.LoggingMiddleware)


@app.get("/")
def root():
    return {"message": "Hello World"}
