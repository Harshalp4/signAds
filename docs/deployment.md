# Deployment

The project can build for two targets. They do not conflict.

## Cloudflare Workers (original, full-featured)

`npm run dev` / `npm run build` run the vinext + `@cloudflare/vite-plugin`
pipeline and emit a Workers bundle. This is the only target where **D1** and
**R2** bindings exist, so it is the only one where the enquiry form, the admin
CMS and the media library actually work.

## Vercel (marketing site)

Live: **https://signads.vercel.app** — project `harshalp4s-projects/signads`.

`vercel.json` overrides the build command to `next build`, because
`npm run build` would run the Cloudflare pipeline and emit a bundle Vercel
cannot serve.

`cloudflare:workers` only resolves inside the Workers runtime, so
`next.config.ts` aliases it to `lib/workers-stub.ts` for the Next build only.
The stub exposes `process.env`, which contains no `DB` or `BUCKET`.

### What works, and what does not

| | Vercel | Cloudflare |
|---|---|---|
| Marketing pages, portfolio, sign studio | ✅ | ✅ |
| Images, video, fonts | ✅ | ✅ |
| Enquiry form (`/api/enquiries`) | ❌ 503 | ✅ |
| Admin CMS (`/admin`, `/api/admin`) | ❌ | ✅ |
| Media library (`/api/media/[id]`) | ❌ | ✅ |

Everything a visitor reads comes from `lib/content.ts` and
`lib/asset-catalog.json`, so the site renders completely with no database:
`getContent`, `getAssets` and `getAsset` all fall back to those files and log
"store unavailable; using source catalogue".

**The contact form returns 503 on Vercel.** The message is already written for
this case — "We couldn't save your enquiry. Your form is still here—please
retry, or call +91 91529 00157" — and `/contact` still offers phone, email and
WhatsApp directly. But no enquiry is recorded.

### To make enquiries work on Vercel

Provision storage and replace the two accessors in `lib/store.ts`:

- `db()` → Vercel Postgres or Neon, with the `content`, `assets` and
  `enquiries` tables from `drizzle/`
- `bucket()` → Vercel Blob for artwork uploads

`dbOrNull()` / `bucketOrNull()` exist alongside them for the read paths that are
meant to fall back; leave those as they are.
