# PM Kanban — Frontend

Next.js **App Router** client: **Kanban** tasks, **JWT auth**, **Redux Toolkit** for client-only session/UI state, **TanStack Query** for server state, **Axios** for HTTP, and **shadcn/ui** + Tailwind for UI.

---

## Table of contents

- [Requirements](#requirements)
- [Environment variables](#environment-variables)
- [Local development](#local-development)
- [Production build](#production-build)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [API integration](#api-integration)
- [Troubleshooting](#troubleshooting)

---

## Requirements

| Tool | Version | Notes |
|------|---------|--------|
| **Node.js** | 20.x or newer | `engines` in `package.json` |
| **npm** | 10+ | Or compatible client |
| **Backend API** | Running instance | See [`../Backend/README.md`](../Backend/README.md) |

The dev server listens on **port 3001** by default (`package.json` scripts).

---

## Environment variables

Public (browser-exposed) variables must use the `NEXT_PUBLIC_` prefix.

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | **Yes** (production) | Origin of the Nest API **without** trailing slash, e.g. `http://localhost:3000`. The Axios client normalizes this and appends `/api` when needed (see `src/lib/axios/axios.ts`). |

**Never commit** `.env`, `.env.local`, or any file containing real tokens. Only `.env.example` belongs in Git.

---

## Local development

```bash
cd front-end
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your API (e.g. http://localhost:3000)

npm run dev
```

Open **http://localhost:3001**. Sign in against the backend you configured.

Use **React Query Devtools** only in development (they are not bundled for production usage in `QueryProvider`).

---

## Production build

```bash
npm install
npm run build
npm run start
```

- **Build**: Next.js compiles optimized server and client bundles; type checking runs as part of `next build`.
- **Start**: Serves on port **3001** (override with `next start -p <port>` or your process manager’s port mapping).

**Hosting notes**

- Set `NEXT_PUBLIC_API_URL` in the hosting provider’s environment to the **public** API URL (HTTPS in production).
- Ensure the API **CORS** configuration allows your deployed front-end origin (see Backend README).
- Prefer **HTTPS** everywhere; cookies are not used for JWT here (localStorage) — still protect the origin against XSS (Content Security Policy at the edge is recommended).

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next dev server on port 3001. |
| `npm run build` | Production build. |
| `npm run start` | Serve production build on port 3001. |
| `npm run lint` | ESLint over the project tree. |
| `npm run lint:fix` | ESLint with auto-fix. |
| `npm run typecheck` | `tsc --noEmit` (useful in CI alongside `next build`). |

### Continuous integration (recommended)

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Some third-party patterns (TanStack Table, React Hook Form `watch`) may surface as **ESLint warnings** from the React Compiler ruleset; they do not fail `npm run lint` by default. Tighten with `--max-warnings 0` only after addressing or explicitly suppressing each case.

---

## Architecture

High-level rules (see `.cursor/rules/frontend-architecture.mdc` in the repo for detail):

| Layer | Responsibility |
|-------|------------------|
| `src/services/` | Axios calls only — no React hooks. |
| `src/hooks/` | TanStack Query and other reusable non-UI logic. |
| `src/components/` | Presentational UI; **no** direct `useQuery` / `useMutation` in feature components. |
| `src/views/` | Route-scoped client bundles that compose hooks + UI. |
| `src/store/` | Client-only state (auth token snapshot, filters, UI). **No** server entity duplication. |
| `src/schemas/` | Zod schemas and inferred types. |

---

## API integration

- Base URL is derived in `src/lib/axios/axios.ts` from `NEXT_PUBLIC_API_URL`.
- **401** on protected routes clears client auth state and stored token (see Axios response interceptor).

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Network errors / blank data | Wrong or missing `NEXT_PUBLIC_API_URL`; API not running; CORS blocking browser. |
| 401 after login | Token cleared by interceptor — clock skew, revoked user, or calling protected route before hydrate. |
| `next/font` build failure in CI | Build environment must allow outbound access to Google Fonts, or switch to self-hosted fonts. |

---

## License

Private project — see root or `package.json` for terms.
