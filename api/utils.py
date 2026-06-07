import random
import string
from fastapi import Request, HTTPException
from redis import Redis

from database.models import Url

ALPHABET = string.ascii_letters + string.digits


def generate_slug(length: int = 10) -> str:
    return "".join(random.choices(ALPHABET, k=length))


def create_unique_slug(db):
    while True:
        slug = generate_slug()

        exists = db.query(Url).filter_by(short_code=slug).first()
        if not exists:
            return slug


def get_client_identifier(request: Request) -> str:
    ip = request.client.host
    user_agent = request.headers.get("user-agent", "unknown")
    return f"{ip}:{user_agent}"


async def rate_limit(
    redis: Redis, identifier: str, limit: int = 20, window: int = 60
) -> None:
    key = f"rate_limit:{identifier}"
    current = await redis.incr(key)
    if current == 1:
        redis.expire(key, window)
    if int(current) > limit:
        raise HTTPException(status_code=429, detail="Too many requests")
