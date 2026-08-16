# MARQ — Operations & Integration Guide

Enterprise operational reference for the portfolio site. Covers integrations,
API contracts, security posture, and deployment configuration.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS v4
- Zod for shared client/server validation
- Resend for transactional email (optional — degrades to a Gmail hand-off)

## Verification

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # production build
npm run verify      # all three, in order
```

## Visual-asset requests: Gmail + Canva

Visual Assets are commissioned work, not downloads. Every project with
`category: "Visual Assets"` (or `requestOnly: true`) is routed through two
first-class channels, defined once in `src/lib/assetRequest.ts`:

| Channel | Destination | Purpose |
| --- | --- | --- |
| **Gmail** | `https://mail.google.com/mail/u/0/?view=cm&…` pre-filled to `mebsamson04@gmail.com` | Requester sends a written brief |
| **Canva** | Project `canvaUrl`, else `NEXT_PUBLIC_CANVA_PROFILE_URL` | Requester views/duplicates the design |
| _mailto fallback_ | `mailto:…` with the same subject/body | Works without a Gmail session |

Entry points:

- **Project card** — "Request" button on all 6 Visual Assets projects
- **Project detail page** — `AssetRequestPanel` with "Request via Gmail" and "View on Canva"
- **API** — `POST /api/asset-request`

The API always returns working `channels.gmail`, `channels.canva`, and
`channels.mailto` links, so the user journey completes even when server-side
email delivery is unconfigured or fails.

## API contracts

All routes share one envelope:

```jsonc
// success
{ "ok": true,  "data": { … },                          "requestId": "…" }
// error
{ "ok": false, "error": { "code": "…", "message": "…", "fields": { … } }, "requestId": "…" }
```

| Route | Method | Rate limit | Notes |
| --- | --- | --- | --- |
| `/api/asset-request` | POST | 8 / hour / IP | Returns Gmail + Canva hand-off links (202) |
| `/api/contact` | POST | 5 / hour / IP | Returns `gmailFallback` when delivery is skipped |
| `/api/projects` | GET | — | `?category=` `?q=`; CDN-cached 1h; includes `acquisition` metadata |
| `/api/health` | GET | — | Readiness probe with per-integration status |

Error codes: `VALIDATION_ERROR` (422), `RATE_LIMITED` (429),
`PAYLOAD_TOO_LARGE` (413), `BAD_REQUEST` (400), `METHOD_NOT_ALLOWED` (405),
`UPSTREAM_ERROR`, `INTERNAL_ERROR`.

Every response carries `X-Request-Id`; rate-limited routes also return
`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and
`Retry-After`.

## Security

Set globally in `next.config.ts`:

- Content-Security-Policy scoped to Google Fonts, `image.thum.io`, and
  Gmail/Canva as permitted `form-action` targets
- `Strict-Transport-Security` (2 years, preload), `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy`
- `poweredByHeader: false`
- `/api/*` is `no-store` and `X-Robots-Tag: noindex`

Request-level defences: Zod validation, 32 KB body cap, sliding-window rate
limiting, and a honeypot field that **accepts and silently discards** bot
submissions (returning an error would tell a bot which field tripped it).

Logs are structured JSON with PII redaction — emails and phone numbers are
masked before they reach the log sink (`src/lib/logger.ts`).

## Environment

Copy `.env.example` to `.env.local`. Every variable is optional; the site is
fully functional without any of them.

| Variable | Effect when unset |
| --- | --- |
| `RESEND_API_KEY` | Email delivery reports `skipped`; UI uses the Gmail hand-off |
| `CONTACT_FROM_EMAIL` | Defaults to `onboarding@resend.dev` |
| `CONTACT_TO_EMAIL` | Defaults to `mebsamson04@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | Defaults to the Vercel URL; affects canonical/OG/sitemap |
| `NEXT_PUBLIC_CANVA_PROFILE_URL` | Defaults to `https://www.canva.com/` |
| `LOG_LEVEL` | `info` in production, `debug` in development |

Check what is live at any time:

```bash
curl -s /api/health | jq '.data.checks'
```

`checks.email.mode` is either `smtp_api` (Resend active) or
`gmail_handoff_fallback`.

## SEO & discoverability

- `sitemap.xml` — 16 URLs (6 routes + 10 projects), generated from project data
- `robots.txt` — allows all, disallows `/api/`
- `manifest.webmanifest` — installable PWA metadata
- JSON-LD `@graph` — `Person`, `WebSite`, `ProfessionalService` on every page;
  `CreativeWork` + `Offer` on project pages
- Per-project `generateMetadata` with canonical URLs, OpenGraph, and Twitter cards

## Accessibility

Skip link to bypass the icon nav, visible focus rings on all interactive
elements, `aria-label`/`aria-pressed`/`aria-current` on icon-only controls,
`role="dialog"` + `aria-modal` with Escape-to-close and scroll locking, and
`aria-invalid`/`aria-describedby` on form fields with errors.
