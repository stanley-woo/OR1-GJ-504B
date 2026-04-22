# Project Status

## Decisions Made

- Build `v1` as a web-first product with `Next.js + TypeScript`
- Use a modular monolith for the main product and one separate `Go` worker for snapshots and background jobs
- Use `Postgres` as the primary database
- Host the database on `Supabase`
- Use `Prisma` as the ORM and database client layer
- Use `Clerk` for authentication
- Use `Tailwind CSS` for styling
- Use `lightweight-charts` for market charts
- Use `Twelve Data` as the initial market data provider
- Keep the market data integration behind a provider abstraction so it can be swapped later

## API And Domain Decisions

- `v1` supports `U.S. equities` only
- `v1` supports `market orders` only
- Orders fill immediately using the latest known provider price
- `v1` does not support options, social features, real money movement, or a complex matching engine
- Portfolio state should be derived from executed fills plus current quotes, not from frontend-calculated values
- Planned `v1` API surfaces:
  - `GET /api/search?query=`
  - `GET /api/stocks/:symbol`
  - `GET /api/stocks/:symbol/history?range=1D|1W|1M|3M|1Y`
  - `GET /api/portfolio`
  - `GET /api/orders`
  - `POST /api/orders`

## Progress So Far

- Step 1 complete: root `package.json` exists and is configured as the workspace root
- Step 2 complete: `apps/web` was scaffolded and the Next.js dev server runs successfully
- Step 3 complete: Prisma is installed, `prisma/schema.prisma` exists, `prisma.config.ts` is in place, and Prisma connects to Supabase
- Step 4 complete: `workers/snapshots/go.mod` exists and the Go worker is initialized as a module
- Step 5 complete: Clerk, Supabase, and Twelve Data env vars are wired and each integration was sanity-checked independently

## Current Files And Runtime Notes

- Root Prisma connection lives in `.env`
- Next.js runtime env vars live in `apps/web/.env.local`
- Supabase uses the `session pooler` connection string because the direct connection path was not reachable from the current network
- Prisma is using `prisma.config.ts`, which matches the installed `Prisma 7` setup

## Good Next Steps

- Define the first Prisma models
- Add the minimal Clerk integration to the Next.js app
- Create a `MarketDataProvider` adapter in the web app
- Start shaping the first product API routes

