# Editorial redesign

Reference: local Revora source, reviewed read-only. Borrowed pacing, focused content, useful motion and multiple page silhouettes; retained SignAds identity and domain-specific content.

## Media

Original SignAds wordmark: public/brand/signads-original.jpg, extracted intact from profile 1, page 1. The English lockup is selected using a CSS viewport. No AI redraw of the logo.

Three new generated illustrative product photographs: visiting-cards, flyers, banner-display. Exact prompts and source paths are in product-media-prompts.json. Existing paper study is now dedicated to brochures rather than reused across all print products. Seven additional real profile photos are used in relevant service/about/campaign contexts.

Three original 12.3-second, 1280x720 silent H.264 films:
- public/videos/brand-materials.mp4: generated material and product concepts for the homepage.
- public/videos/print-editorial.mp4: cards, flyers and brochure concepts.
- public/videos/street-formats.mp4: edited actual profile photographs, visibly labelled as a photo montage.

These are edited still-based films, not captured production footage or AI-generated motion footage. Source renderer: scripts/render-editorial-films.py. Video title overlays are generated as typography, then composited in FFmpeg. Original artwork is preserved.

## Page families

Print catalogue; dark signage; wide outdoor; three product detail variants; text-based solution index and planning pages; editorial journal and articles; photographic about; existing project galleries and enquiry flows.
