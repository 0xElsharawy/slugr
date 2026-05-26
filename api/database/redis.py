import redis

REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_PASSWORD = "slugr_redis_passwrod"


def get_redis():
    client = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        decode_responses=True,
    )
    try:
        yield client
    finally:
        client.close()
