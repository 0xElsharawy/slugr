import re
import random
import string
from datetime import datetime, timedelta, UTC

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


DURATION_RE = re.compile(r"(\d+)([smhd])")


def parse_expires_at(value: str | None) -> datetime | None:
    if value is None:
        return None

    matches = DURATION_RE.findall(value)

    if not matches:
        raise ValueError("Invalid duration format")

    delta = timedelta()

    for amount, unit in matches:
        amount = int(amount)

        if unit == "s":
            delta += timedelta(seconds=amount)
        elif unit == "m":
            delta += timedelta(minutes=amount)
        elif unit == "h":
            delta += timedelta(hours=amount)
        elif unit == "d":
            delta += timedelta(days=amount)

    return datetime.now(UTC) + delta
