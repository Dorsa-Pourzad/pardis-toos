# Pardis Toos

Pardis Toos is the public website for a senior care and rehabilitation center in Mashhad. The frontend is connected to an independent Flask/PostgreSQL backend located at `D:\Arian\Projects\backend`.

## Stack

- React 19 with Vinext and Vite
- TypeScript
- Tailwind CSS 4 and shadcn/ui components
- Flask API with SQLAlchemy and psycopg
- PostgreSQL

## Frontend requirements

- Node.js `>=22.13.0`
- npm

## Getting started

```bash
npm ci
npm run dev
```

The development server runs locally at `http://localhost:5173`.

## Useful commands

```bash
npm run lint         # Run ESLint
npm run build        # Build the production artifact locally
npm run start        # Run the built frontend locally
```

Run the Flask backend separately by following `D:\Arian\Projects\backend\README.md`. The frontend reads `NEXT_PUBLIC_API_BASE_URL` and defaults to `http://localhost:5000/api/v1`.

## Project structure

- `app/` — application entrypoint, layout, and global styles
- `components/` — page sections and reusable UI components
- `lib/` — site content and shared utilities
- `public/` — static images and other public assets
- `scripts/` — local install, development, and build helpers
- `D:\Arian\Projects\backend` — independent Flask/PostgreSQL API

## Backend integration

The consultation form sends data to `POST /api/v1/contact-requests`. The admin panel uses the authenticated Flask API for login, request listing, search, status filtering, complete request details, summary counts, status changes, and logout. Mock requests and placeholder authentication behavior have been removed.

The backend includes PostgreSQL models, an initial SQL migration, session authentication with CSRF protection, validation, a health endpoint, a database bootstrap CLI, Docker Compose for local PostgreSQL, and API tests. Follow the backend README for setup and admin creation.

## Environment variables

Copy `.env.example` to `.env.local` when the backend is hosted somewhere other than the default URL. Keep real values in ignored `.env*` files.
