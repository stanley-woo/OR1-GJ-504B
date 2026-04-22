# Dependency Guide

This list is grouped by purpose so you can install only what you need when each layer starts.

## Core Web App

- `next`
- `react`
- `react-dom`
- `typescript`

## Auth

- `@clerk/nextjs`

## Database And Validation

- `@prisma/client`
- `prisma`
- `zod`

## UI And Charts

- `tailwindcss`
- `lightweight-charts`
- `clsx`

## Testing

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `tsx`

## Go Worker

- Standard library is enough for the first pass
- Add `pgx` when the worker starts reading or writing Postgres
- Add a scheduler library only if simple cron orchestration becomes awkward

## Suggested Install Commands

```bash
npm install next react react-dom @clerk/nextjs @prisma/client zod lightweight-charts clsx
npm install -D typescript prisma tailwindcss vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event tsx @types/node
go get github.com/jackc/pgx/v5
```

