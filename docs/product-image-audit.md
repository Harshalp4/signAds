# Product image corrections

## Findings

The current local content source already had separate card and flyer images, but the brochure used a mixed paper/card study. Banners showed a roll-up stand, while hoardings showed smaller illuminated advertising panels. All print product heroes were cropped to a wide 2.7:1 strip; the mobile catalogue hid product thumbnails. Those treatments obscured the differences between products. There were no locally saved CMS content overrides.

## Corrections

- Visiting cards: dedicated stack and printed front, fully visible.
- Flyers and pamphlets: separate flat-flyer and folded-leaflet examples on the same product page.
- Brochures: a bound, multipage brochure and open spread.
- Banners: flexible vinyl with reinforced edges and eyelets.
- Hoardings: a full-size roadside billboard on steel supports.
- Signage, cladding, letters, glow signs, vehicles and wayfinding: retain relevant profile photographs.
- Product heroes show complete images; category and related-service thumbnails stay visible on mobile.
- Remove the repeated concept film above the print catalogue.

Generated examples are labelled illustrative; real project photography remains separately identified.

## Verification

All eleven product routes returned HTTP 200. Every product gallery image returned HTTP 200. SHA-256 checks of the fetched primary image bytes confirmed eleven distinct images, not just different filenames. The flyers-and-pamphlets gallery includes two images. TypeScript and production build passed. Browser interaction testing was not run for this correction.
