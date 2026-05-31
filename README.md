# Slugr

A URL shortener with a FastAPI backend and a Preact/TypeScript frontend. Shorten long URLs into 10-character alphanumeric slugs with optional expiration times.

## Architecture

```
slugr/
├── api/        # Backend — FastAPI, PostgreSQL, Redis, Alembic
└── web/        # Frontend — Preact, TypeScript, Tailwind CSS v4, Vite
```

## Quick Start

### Prerequisites

- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [Just](https://github.com/casey/just) (command runner)
- Docker and Docker Compose
- [pnpm](https://pnpm.io/) (Node.js package manager)

### Backend

```bash
cd api
just up            # Start PostgreSQL and Redis
just db-migrate    # Run database migrations
just dev           # Start development server on http://localhost:8080
```

### Frontend

```bash
cd web
pnpm install
pnpm dev           # Start dev server on http://localhost:3000
```

The frontend communicates with the backend at `http://localhost:8080`.

## Backend API

| Method | Path            | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/`             | Health check                 |
| POST   | `/urls`         | Create a shortened URL       |
| GET    | `/{short_code}` | Redirect to the original URL |

### `POST /urls`

```json
{ "url": "https://example.com/very/long/url", "expire_in": "7d" }
```

Returns `{"short_code": "aB3xK9mZ2p"}`. The `expire_in` field is optional and supports combinations like `1h30m`, `500s`, etc.

Redirects use Redis caching (5-minute TTL) with PostgreSQL as the persistent store. See [`api/README.md`](api/README.md) for full documentation.

## Tech Stack

**Backend:** Python 3.11+, FastAPI, SQLAlchemy, Alembic, PostgreSQL 16, Redis 7, Loguru

**Frontend:** Preact, TypeScript, Tailwind CSS v4, Vite, pnpm
