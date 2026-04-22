# Setup Guide

This repository is intentionally scaffolded without application code so implementation can be added deliberately.

## Suggested Order

1. Initialize the root workspace package manager files.
2. Scaffold the Next.js app inside `apps/web`.
3. Initialize Prisma in `prisma`.
4. Create the Go module inside `workers/snapshots`.
5. Connect Clerk, Postgres, and the market data provider.

## Suggested Local Tooling

- Node.js `24.x`
- npm `11.x` or `pnpm` if you prefer workspaces
- Go `1.24.x`
- Docker Desktop for local Postgres

## Environment Setup

Copy `.env.example` to `.env.local` for the web app and to `.env` files for worker-specific local runs.

## Suggested Bootstrap Commands

Run these manually when you are ready to start implementation:

```bash
npm init -y
npx create-next-app@latest apps/web --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*"
npm install @clerk/nextjs @prisma/client zod lightweight-charts
npm install -D prisma tsx vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/node
cd workers/snapshots && go mod init github.com/stanleywoo/gj504b-snapshots
```

Adjust package manager or module path conventions as you prefer.

