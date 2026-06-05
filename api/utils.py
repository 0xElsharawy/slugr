import random
import string

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
