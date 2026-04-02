# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — defines all tables: `site_data`, `contact_messages`, `project_requests`
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`)
- Exports: `.` (pool, db, schema), `./schema` (schema only)
- `DATABASE_URL` optional in dev — server starts without it (DB ops return 500 gracefully)

**Tables:**
- `site_data (key TEXT PK, value JSONB)` — CMS content from admin (all localStorage keys)
- `contact_messages` — structured table for public contact form submissions
- `project_requests` — structured table for StartProject form submissions

**Migrations:** run automatically on api-server startup via raw `CREATE TABLE IF NOT EXISTS` SQL (no drizzle-kit push required at runtime).

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/gab-digital` (`@workspace/gab-digital`)

Premium Arabic-language (RTL) digital marketing agency website for **GAB Digital** (Algeria).

- **Stack**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Language**: Arabic only — `lang="ar" dir="rtl"` on `<html>`. Brand name "GAB Digital" always in `dir="ltr"`.
- **Font**: Cairo Google Fonts — `@import` first line in `index.css`
- **Data layer**: Hybrid — `localStorage` (fast UX) + PostgreSQL (persistence). `useLocalStorage` auto-syncs with `/api/site-data/:key` (upsert on write, fetch on mount).
- **Contact/Project forms**: POST directly to `/api/contact-messages` and `/api/project-requests`.
- **Admin messages/requests**: Fetch live from API (real-time DB reads).
- **Admin credentials**: admin@gabdigital.com / admin123 (localStorage auth)
- **Branding**: Dark navy (`#0B1120`) + Orange (`#F97316`) palette
- **Instagram**: https://www.instagram.com/digital.gab16

#### Public Pages (8 pages)
| Path | Page |
|------|------|
| `/` | الرئيسية (Home) |
| `/services` | الخدمات — category grid |
| `/services/:categorySlug` | ServiceCategoryPage — services within a category |
| `/services/:categorySlug/:serviceSlug` | ServiceDetailPage — single service detail |
| `/our-work` | أعمالنا (Portfolio) |
| `/products` | المنتجات الرقمية |
| `/academy` | الأكاديمية |
| `/contact` | تواصل معنا |
| `/about` | من نحن |

#### Admin Pages (at `/admin`)
| Path | Feature |
|------|---------|
| `/admin` | Dashboard — live stats from localStorage |
| `/admin/service-categories` | CRUD for ServiceCategory (with image upload) |
| `/admin/services` | CRUD for ServiceItem (with category selector, image upload) |
| `/admin/portfolio` | CRUD for Portfolio projects |
| `/admin/products` | CRUD for digital products |
| `/admin/courses` | CRUD for academy courses |
| `/admin/testimonials` | CRUD for testimonials |
| `/admin/messages` | View contact messages |
| `/admin/faq` | CRUD for FAQ items |
| `/admin/project-requests` | View project requests |

#### Services Architecture (3-level hierarchy)
```
ServiceCategory  (admin_service_categories key)
  └── ServiceItem[] per category  (admin_service_items key)
        └── Detail page per item
```
- **`ServiceCategory`**: id, title, slug, description, icon, imageUrl, isFeatured, order
- **`ServiceItem`**: id, categoryId, title, slug, description, longDescription, imageUrl, price, features[], includedItems[], targetAudience[], isVisible, isFeatured, order
- Slugs auto-generated via `slugify()`, manually editable
- Images stored as base64 (max 2MB) in `imageUrl` field
- `useServices()` is **REMOVED** — use `useServiceCategories()` and `useServiceItems()`
- Old `admin_services` localStorage key is **DEPRECATED**

#### Key Files
- `src/lib/adminData.ts` — all interfaces + mock data (ServiceCategory x6, ServiceItem x10 + legacy types)
- `src/hooks/useSiteData.ts` — all `useLocalStorage` hooks for public data reading
- `src/hooks/useLocalStorage.ts` — generic typed localStorage hook
- `src/lib/palette.ts` — `getIcon()`, `getPalette()`, `getAccent()`, `parseFeatures()` helpers
- `src/components/admin/AdminLayout.tsx` — admin shell
- `src/components/admin/AdminSidebar.tsx` — admin nav with all sections

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
