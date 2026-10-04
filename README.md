# Pardis Toos

Pardis Toos is the frontend website for a senior care and rehabilitation center in Mashhad. The current repository contains the public-facing website and the initial scaffolding for future backend work.

## Stack

- React 19 with Vinext and Vite
- TypeScript
- Tailwind CSS 4 and shadcn/ui components
- Cloudflare Worker runtime with optional D1/Drizzle scaffolding

## Requirements

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
npm run start        # Run the built Worker locally through Wrangler
npm run db:generate  # Generate Drizzle migrations after schema changes
```

Run `npm run build` before `npm run start`. The local Worker/D1 preview requires the appropriate Cloudflare `DB` binding when database-backed features are added.

## Project structure

- `app/` — application entrypoint, layout, and global styles
- `components/` — page sections and reusable UI components
- `lib/` — site content and shared utilities
- `public/` — static images and other public assets
- `db/` — database access and the application schema
- `drizzle.config.ts` — Drizzle migration configuration
- `scripts/` — local install, development, and build helpers

## Backend status

The backend, API routes, and database persistence are not fully implemented yet. The main database schema is intentionally empty, while the D1/Drizzle files provide a starting point for future work.

The consultation form UI is implemented, but it is not connected to a real backend endpoint or server action. It does not persist or send requests yet. A Backend Developer can add the API, validation, persistence, migrations, authentication, and tests in a later phase.

## Environment variables

The current frontend does not require a local environment file. If backend development introduces required variables, document their names and safe placeholders in `.env.example`; keep real values in ignored `.env*` files.
