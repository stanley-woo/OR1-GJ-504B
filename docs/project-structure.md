# Project Structure

## Top Level

- `apps/web`: web product, pages, API routes, UI components, frontend tests
- `packages/domain`: domain models, DTOs, order rules, portfolio math
- `packages/config`: shared env parsing and configuration contracts
- `workers/snapshots`: background jobs for quote refresh and portfolio snapshots
- `prisma`: schema, migrations, and seed scripts
- `infra/docker`: local development container notes and manifests
- `infra/vercel`: deployment notes for the web app
- `infra/railway`: deployment notes for the worker
- `docs/adrs`: architecture decision records

## First Code You’ll Probably Add

- `apps/web/app`
- `apps/web/components`
- `apps/web/lib`
- `prisma/schema.prisma`
- `workers/snapshots/main.go`

