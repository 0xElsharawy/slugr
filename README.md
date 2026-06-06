# Slugr

A URL shortener with a FastAPI backend and a Preact/TypeScript frontend. Shorten long URLs into 10-character alphanumeric slugs with optional expiration times.

## Tech Stack

**Backend:** Python 3.11+, FastAPI, SQLAlchemy, Alembic, PostgreSQL 16, Redis 7, Loguru

**Frontend:** Preact, TypeScript, Tailwind CSS v4, Vite, pnpm

## Architecture

```
slugr/
├── api/        # Backend — FastAPI, PostgreSQL, Redis, Alembic
└── web/        # Frontend — Preact, TypeScript, Tailwind CSS v4, Vite
```

## Quick Start

### Prerequisites

- Git
- Docker and Docker Compose
- [pnpm](https://pnpm.io/) (Node.js package manager)

### Clone the repository

```bash
git clone <repository-url>
cd slugr
```

### Backend

```bash
cd api
mv .env.example .env
docker compose up -d
```

### Frontend

```bash
cd web
pnpm install
pnpm dev
```

The frontend communicates with the backend at `http://localhost:8000`.

## Web UIs

| UI                | URL                          |
| ----------------- | ---------------------------- |
| API documentation | `http://localhost:8000/docs` |
| Frontend UI       | `http://localhost:3000`      |
