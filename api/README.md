# Slugr API

A URL shortener built with [FastAPI](https://fastapi.tiangolo.com/).

## Stack

- **Framework:** FastAPI
- **Database:** PostgreSQL 16
- **Cache:** Redis 7
- **Migrations:** Alembic
- **Logging:** Loguru

## Getting Started

### Prerequisites

- Docker and Docker Compose
- uv (optional, for local development without Docker)

### Setup

```bash
mv .env.example .env
docker compose up -d
```

The API will be available at `http://localhost:8000`.
The API documentation can be accessed at `http://localhost:8000/docs`.

## Project Structure

```
api/
├── alembic/              # Database migrations (Alembic)
│   └── versions/
├── alembic.ini           # Alembic config
├── compose.yml           # Docker Compose (PostgreSQL, Redis)
├── database/             # Database layer
│   ├── db.py             #   Session & connection logic
│   ├── models.py         #   SQLAlchemy ORM models
│   └── redis.py          #   Redis client
├── Dockerfile
├── main.py               # App entry point
├── middlewares/
│   └── logging.py        # Request logging middleware
├── pyproject.toml        # Python project config
├── utils.py              # Helpers
└── .env.example          # Environment template
```

## Database Model

### `urls` table

| Column       | Type        | Notes                       |
| ------------ | ----------- | --------------------------- |
| `id`         | BIGINT      | Primary key, auto-increment |
| `url`        | TEXT        | The original URL            |
| `short_code` | VARCHAR(10) | Unique, generated slug      |
| `created_at` | TIMESTAMPTZ | Auto-set on creation        |
