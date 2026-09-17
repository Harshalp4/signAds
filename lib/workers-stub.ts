// Stand-in for the `cloudflare:workers` runtime module on platforms that do
// not provide it. Vercel has no D1 or R2, so no binding is present here and
// every caller has to tolerate their absence — see db() and bucket() in
// lib/store.ts, which return null rather than throwing at import time.
//
// The Cloudflare dev/build path never loads this file: next.config.ts only
// aliases `cloudflare:workers` to it for the Next.js build.
export const env: Record<string, unknown> = process.env as unknown as Record<string, unknown>;
