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

- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [Just](https://github.com/casey/just) (command runner)
- Docker and Docker Compose

### Setup

```bash
# Start Postgres and Redis
just up

# Run database migrations
just migrate

# Start the development server
just dev
```

The API will be available at `http://localhost:8080`.

### Commands

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `just dev`           | Start the development server on port 8080 |
| `just migrate`       | Apply Alembic migrations                  |
| `just up`            | Start Docker services (Postgres, Redis)   |
| `just down`          | Stop and remove containers                |
| `just down-all`      | Stop and remove containers, volumes       |
| `just logs <svc>`    | Show logs for a specific service          |
| `just restart <svc>` | Restart a specific service                |
| `just rebuild`       | Rebuild and restart all services          |
| `just shell <svc>`   | Open a shell inside a running container   |
| `just ps`            | Check container status                    |

## API Endpoints

### `GET /`

Health check.

**Response:** `{"message": "Hello World"}`

---

### `POST /urls`

Create a shortened URL.

**Request body:**

| Field       | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `url`       | string | yes      | The original URL to shorten (must be a valid URL)     |
| `expire_in` | string | no       | Optional expiration duration (e.g. `1h`, `30m`, `7d`) |

`expire_in` supports `s` (seconds), `m` (minutes), `h` (hours), and `d` (days). Multiple units can be combined (e.g. `1h30m`).

**Response:** `{"short_code": "<10-character alphanumeric slug>"}`

If the URL already exists in the database, the existing short code is returned.

---

### `GET /{short_code}`

Redirect to the original URL associated with the given short code.

- Checks Redis cache first (5-minute TTL).
- Falls back to PostgreSQL on cache miss, then populates the cache.
- Returns `404` with `{"detail": "URL not found"}` if the short code does not exist.

## Database Model

### `urls` table

| Column       | Type        | Notes                         |
| ------------ | ----------- | ----------------------------- |
| `id`         | BIGINT      | Primary key, auto-increment   |
| `url`        | TEXT        | The original URL              |
| `short_code` | VARCHAR(10) | Unique, generated slug        |
| `clicks`     | BIGINT      | Click counter (default 0)     |
| `created_at` | TIMESTAMPTZ | Auto-set on creation          |
| `expires_at` | TIMESTAMPTZ | Nullable; set via `expire_in` |
