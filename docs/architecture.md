# Architecture

## Primary Stack

- Frontend and primary backend: `Next.js + TypeScript`
- Database: `Postgres`
- Database host: `Supabase`
- ORM: `Prisma`
- Auth: `Clerk`
- Charts: `lightweight-charts`
- Styling: `Tailwind CSS`
- Background worker: `Go`
- Market data provider: `Twelve Data`

## Architecture Shape

Use a modular monolith for the main product plus one separate worker.

Why this shape:

- the hardest part of the project is domain correctness, not service orchestration
- a solo MVP does not need many independently deployed services
- a separate worker still provides real infrastructure and background-job experience
- it keeps debugging focused on product and business logic instead of distributed-system overhead

## Runtime Responsibilities

### `apps/web`

Owns:

- UI rendering
- auth/session handling
- stock search
- stock detail APIs
- order placement
- holdings and order history reads

### `workers/snapshots`

Owns:

- scheduled portfolio snapshot generation
- quote refresh or other background jobs added later

The worker does not own trading logic.

## Domain Modules

Keep code grouped by responsibility inside the main app:

- `auth`
- `market-data`
- `orders`
- `portfolio`
- `history`
- `snapshots`

## Core Domain Models

- `User`
- `BrokerageAccount`
- `Instrument`
- `Order`
- `Fill`
- `Position`
- `PortfolioSnapshot`
- `QuoteCache`

## Market Data Contract

Hide the vendor behind one app-level interface:

- `searchSymbols(query)`
- `getQuote(symbol)`
- `getHistoricalBars(symbol, range)`

This keeps the application portable if you later switch from Twelve Data to another provider.

## Public API Shape For V1

- `GET /api/search?query=`
- `GET /api/stocks/:symbol`
- `GET /api/stocks/:symbol/history?range=1D|1W|1M|3M|1Y`
- `GET /api/portfolio`
- `GET /api/orders`
- `POST /api/orders`

## V1 Execution Rules

- U.S. equities only
- market orders only
- immediate fills using the latest known provider price
- no partial fills
- no order book or matching engine
- no options
- no after-hours complexity in the execution model

## Persistence Rules

- portfolio state is derived from executed fills plus current quotes
- frontend code should never be the source of truth for balances or positions
- Prisma uses `prisma.config.ts` with a root `.env`
- Supabase should use the `session pooler` connection string in the current setup

## Deployment Direction

- deploy `apps/web` to `Vercel`
- deploy `workers/snapshots` to `Railway`
- keep `Supabase` as the managed Postgres host
- local development can still use Docker later if you want more infrastructure practice

