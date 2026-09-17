# Verification — 17 September 2026

- TypeScript checks passed and Worker build succeeded.
- Inspected homepage, category hero, contact form and private library at desktop and 390 px mobile widths. No horizontal overflow or broken images in the checked routes.
- Verified all primary routes and representative product, project, guide and solution details render with page-specific titles and one main heading.
- Verified mobile navigation after route completion, text search across project descriptions/applications, service filtering and empty-filter recovery.
- Submitted a test enquiry in the browser and confirmed it in the persistent private inbox.
- Ten API checks passed: anonymous admin denial; private-image denial; authorised image access; field validation; foreign-origin rejection; invalid artwork signature rejection; private upload and idempotent retry; draft/published visibility; generated-project prohibition; and pending client-permission prohibition.
- Verified CMS tab switching after fixing an initial render issue.
- Verified reduced-motion video pause, keyboard skip link and alt text on every homepage image. Contrast checks: headline orange 3.39:1 on paper (large display text), charcoal button text 5.99:1 on orange, secondary text 5.36:1 on paper.
- Both silent H.264 video loops are 1280 × 720, eight seconds, approximately 380 KB and 633 KB. Poster images remain visible when playback is paused or unavailable.
- Local cached desktop DOM content loaded in approximately 50 ms. This is a local smoke measurement, not a production performance score. Images use WebP and reserved dimensions, below-fold images lazy-load, video preloading is disabled, and offscreen video pauses.
- Native WebMCP support was unavailable in the local browser; feature detection is in place and this optional integration did not block delivery.

Automated checks are not a full accessibility or legal compliance audit. Public launch still requires the factual and permissions review in the launch checklist.
