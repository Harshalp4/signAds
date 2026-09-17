# SignAds

A responsive website for print, signage, physical branding and outdoor advertising. Built with React, TypeScript and Vinext, with Cloudflare D1 for content/enquiries and R2 for private uploads.

## Run locally

Use Node 22.13 or later. Install with `npm run install:ci`, then `npm run dev`. The development server prints its local URL and provides a local sign-in simulation for `/admin`.

Generate database changes with `npm run db:generate`. After building, apply pending SQL migrations locally using:

```
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_gigantic_rumiko_fujikawa.sql
```

Do not replay an applied migration. Production deployment applies tracked migrations separately. `npm run build` creates the Worker and static assets. `npx tsc --noEmit` checks types.

## Manage content

`/admin` supports products, projects, guides, asset metadata/uploads and enquiries. Content starts with a source catalogue and accepts durable CMS overrides. Project pages and product categories include newly published records automatically. `ADMIN_EMAILS` is the comma-separated server-side membership list. Hosted access is restricted separately by the Sites audience policy.

The selected contact address is signadsindia@gmail.com. The site owner is also authorised for the CMS. Enquiries persist in the private inbox; automatic email notifications are not configured. No payments or orders are processed.

## Evidence and media

- `docs/discovery.md`: source findings, sitemap, competitor observations and open decisions.
- `research/image-inventory.csv`: complete asset inventory and quality/rights assessment.
- `research/source-images/`: extracted master files and two generated supporting images.
- `lib/private-previews.json`: compressed source previews, served only to authorised team members.
- `public/images/`: selected website photographs and internally labelled illustrative studies.
- `public/videos/`: two silent, eight-second, 1280 × 720 material-study loops.
- `docs/photography-shot-list.md`: capture plan for original photographs and real footage.
- `docs/content-model.md`: data model and permission rules.
- `docs/launch-checklist.md`: remaining decisions before public launch.

No named customer list, testimonials, project results, national coverage, prices, guarantees or turnaround claims have been invented. Source photographs may contain visible brands; that is not a customer endorsement. Generated assets are excluded from completed project records.

## Verification

The browser checks cover desktop/mobile page rendering, images, portfolio filtering, mobile navigation, keyboard entry, reduced motion and enquiry receipt. API checks cover private media, server validation, idempotency, cross-origin requests, CMS publication and rights safeguards. Scripts use the locally bundled browser runtime; adjust the Playwright path if running on another machine. Screenshots and detailed check output live in the ignored `outputs/` directory.

The first deployed Site is owner-private. Review the launch checklist before changing its audience.
