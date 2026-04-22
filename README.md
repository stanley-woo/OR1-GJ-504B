# GJ 504B

Starter workspace for a paper-trading application.

## Current Status

- Workspace root is initialized with npm workspaces
- `apps/web` is scaffolded with Next.js, TypeScript, Tailwind, and ESLint
- Prisma is installed and connected to hosted Postgres through Supabase
- `workers/snapshots` is initialized as a Go module
- Clerk env vars are configured for the web app
- Twelve Data env vars are configured and the quote API was tested successfully

## Core Decisions

- Frontend and primary backend: `Next.js + TypeScript`
- Database: `Postgres` hosted on `Supabase`
- ORM: `Prisma`
- Auth: `Clerk`
- Charts: `lightweight-charts`
- Styling: `Tailwind CSS`
- Background worker: `Go`
- Market data provider: `Twelve Data`
- Architecture shape: modular monolith plus one worker, not many microservices

## Workspace Shape

- `apps/web`: Next.js app and product-facing API routes
- `packages/domain`: shared business concepts and validation boundaries
- `packages/config`: shared config contracts for app and worker
- `workers/snapshots`: Go worker for portfolio snapshot and background jobs
- `prisma`: database schema and migrations
- `infra`: deployment and local infrastructure notes
- `docs`: product, architecture, setup, and decision records

## Next Documents To Read

- [MVP](./docs/mvp.md)
- [Architecture](./docs/architecture.md)
- [Status](./docs/status.md)
- [Setup](./docs/setup.md)
- [Project Structure](./docs/project-structure.md)
- [Dependencies](./docs/dependencies.md)
