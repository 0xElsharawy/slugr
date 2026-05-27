import redis

REDIS_HOST = "localhost"
REDIS_PORT = 6379


def get_redis():
    client = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        decode_responses=True,
    )
    try:
        yield client
    finally:
        client.close()
