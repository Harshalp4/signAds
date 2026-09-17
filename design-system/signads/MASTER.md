# SignAds visual system

Visual thesis: an architectural portfolio for physical brand visibility. Oversized sans serif headlines, real project photography and an orange framing device evoke the scale and precision of signage.

UI/UX Pro Max searches: `signage fabrication portfolio editorial` (design system) and `industrial portfolio typography` (typography). Adopt its spacious layout, asymmetric portfolio and keyboard/reduced-motion recommendations. Override its suggested serif type and red/navy palette with the brief's orange/charcoal identity and the better-fitting Minimalist Portfolio typography result: Archivo / Space Grotesk.

Tokens: charcoal #171918; orange #ff650b; paper #f5f5f0; white #ffffff; muted #666861; line #dcded8. Orange surfaces use charcoal text; small orange text on white uses #b83e00. Display type Space Grotesk, body Archivo with system sans fallback. Corners 2–6 px; spacing 8/16/24/32/48/72/104. Body 16–18 px; metadata 12–14 px; fluid H1 48–112 px. Visible 3 px focus outlines, 44 px controls, semantic links and buttons.

Motion: 400 ms opacity/20 px reveal; 200 ms control transitions; slow silent video loops with play/pause; day/night toggle crossfade. No scroll hijacking. Reduced motion disables reveal translations and starts videos paused. Reserve media aspect ratios and lazy-load below fold. No invented statistics, testimonials or client-logo strip.


## Homepage revision — 17 September 2026

User direction: remove project imagery from the hero and make the opening a creative animated brand experience. This overrides the earlier portfolio-led hero.

- Concept: **Ideas made visible.** Charcoal stage, oversized orange display type, and an original sculptural S combining paper, metal and light.
- Header joins the dark hero. Primary enquiry CTA is always available; three direct service links sit at the base of the stage.
- One slow material animation with subtle mouse parallax; short type entrance. Pause control, offscreen and hidden-tab suspension, and reduced-motion fallback. No scroll hijacking.
- Mobile repositions art between copy and actions, preserves touch targets and direct service access.
- The next section uses editorial hierarchy and asymmetrically placed material studies. Real portfolio photographs remain in the work section.
- Supporting skill search: Immersive/Interactive Experience pattern; retained established orange/charcoal identity. Reduced Motion and Excessive Motion UX guidance applied.


## Revora-informed editorial revision — 17 September 2026

Reference inspected directly: `/Users/harshalpatil/Marketing/revora-website`, including homepage, typography, film player and business-use-case structures. User requested original logo, more appropriate imagery and videos, less repetition, smaller content surfaces and varied inner-page layouts. This replaces the sculptural-S homepage concept.

- Real SignAds English wordmark from company profile image `profile-1-p01-02`; preserve the original grey/orange artwork. CSS viewport exposes the existing English logo without redrawing it.
- Headline contrast: Space Grotesk with DM Serif Display italic emphasis. Charcoal, ivory and orange stay grounded in SignAds.
- Homepage: material film beside a concise brand statement, slim service navigation, editorial introduction. No portfolio photographs in the hero.
- Print: panoramic concept film and compact thumbnail catalogue. Signage: dark material-led opening and a text-first service index. Outdoor: wide display image and a separate clearly labelled profile-photo film.
- Product detail compositions vary by print, signage and outdoor. Distinct images for all eleven products.
- Solutions use numbered text rows and a planning sidebar; remove repeated product-image grids. Guides use a journal index and long-form reading layout with in-page links; no decorative stock hero. About has its own photographic diptych.
- Films respect reduced motion and offscreen/hidden-tab suspension. Pause remains sticky. No audio, fake project outcomes or misleading generated work.


## UX pass — typography, image framing and rhythm

Applied as `app/redesign.css`, loaded after globals/brand-experience/editorial so it refines the established system rather than replacing it. The orange/charcoal identity and the Space Grotesk / Archivo / DM Serif Display stack are unchanged.

UI/UX Pro Max searches used: `orphan heading line balance`, `image aspect ratio reserve space`, `whitespace vertical rhythm spacing scale` (ux), `portfolio gallery grid card` (landing), `image optimization layout shift` (nextjs stack).

**Type.** Fluid `clamp()` scale as `--t-label` through `--t-h1`. Measures are bounded in `ch`: 64ch long-form, 44ch section descriptions, 36ch cards. `text-wrap: balance` on headings, `text-wrap: pretty` on body; both are progressive, so no layout depends on support. Body line-height 1.6–1.68.

**No hardcoded line breaks in body copy.** The guideline is explicit that forced `<br>` should not stand in for wrapping. The hero previously read "Real-worldpresence." between 501–800px, because a media query hid the second `<br>` and no whitespace sat behind it. The hero headline is now plain text; the serif accent is `display:block` with an 11ch measure, so the line break comes from the measure at every width.

**Serif accent metrics.** DM Serif Display's inline box is ~1.37× the Space Grotesk strut, so at the previous 1.02 line-height the italic lines overflowed the `h1` box by 15px and crowded the deck. Set to 0.9em / 1.04 inside a 1.14 heading, overflow is 6px and the lines sit evenly.

**Images.** Source photography ranges 0.84–2.38 in aspect ratio, so ratios belong on the frame and `object-fit: cover` on the photo. Cards use a single 3:2 frame with a hairline border, dark-section variants included, so dark photographs don't bleed into dark backgrounds. The featured grid is equal-column: the previous `1.2fr 1fr 1fr` pushed the first card's meta row ~50px below its neighbours.

Product plates no longer letterbox. `object-fit: contain` inside a forced 3:2 box produced grey bands above and below every product photograph; sizing the image itself inside a padded mat shows the whole format with no bands, which was the original intent of that rule.

`lib/image-dimensions.ts` carries each file's true intrinsic size, regenerated by `node scripts/image-dimensions.mjs`. Cards previously declared `1000×700` for every image regardless of the file, and the homepage signage entry declared `1672×941` for a 540×641 portrait.

**Rhythm.** One `--space-section` clamp for section padding. Section headings give the description its own column with a 44ch measure instead of pinning it bottom-right. The two homepage entry cards share a frame and a reduced offset. The FAQ heading column is sticky above 900px rather than a tall empty block.


## About page, owner portrait and the "try it" studios

UI/UX Pro Max searches: `Trust & Authority` (landing) returned the pattern order used here — **Hero (mission/credibility) → Proof → Solution overview → Clear CTA path** — plus its requirement that any interactive or rotating element carry pause/keyboard equivalents and a static reduced-motion state. `interactive product demo try it` (ux) supplied the input-affordance, hover-state, disabled-state and accessible-name rules the studios follow.

**About.** Was a headline, two photographs and three paragraphs. Now: manifesto → Managing Director → sign studio → profile photographs → CTA. The capability list spans the full row as three columns rather than stacking beside the portrait, which is what left a tall empty block.

**Owner portrait.** `public/images/founder-portrait.webp`, cropped from the supplied square to drop the blurred fill bands (`cwebp -crop 40 62 560 578`, 28 KB). Framed 1:1 at `object-position: 50% 20%`; the two framed portraits behind the subject stay in shot because they carry meaning the crop should not discard.

**Nothing invented about a real person.** The name was not supplied, so `MANAGING_DIRECTOR` in `components/editorial-pages.tsx` is an empty constant and the caption falls back to the title alone. Setting that one string fills the caption in. No quote is attributed to him anywhere; all About copy is company voice and consistent with claims already made elsewhere on the site.

**The studios.** Two interactive pieces sharing one pattern, so "try it" means the same thing site-wide:
- `SignStudio` (About) — type a brand name, switch between metal letters / neon glow / backlit acrylic, toggle day and night.
- `CardStudio` (visiting cards) — type name, company and a contact line, switch stock, flip the card over.

Both carry what the visitor set into `/contact` via `service` and `brief`. The contact route now forwards `brief` to `QuoteForm`, which already accepted the prop but was never passed it.

Accessibility: visible labels on every input, real radio groups in a `fieldset`/`legend` (keyboard and screen-reader navigable), `aria-pressed` on the day/night and flip toggles, `role="img"` with a describing `aria-label` on each preview, 44–48px controls, 3px focus outlines, and transitions disabled under `prefers-reduced-motion`.

**Material rendering.** Metal and neon first read as the same thing — both bright faces with an orange halo. Halo-lit metal is a *dark* brushed face with light spilling from behind it, so the night variant now uses a dark gradient face plus tight warm drop-shadows, and neon keeps the lit-tube stroke and wide glow.

**The card flip.** `filter: drop-shadow()` on the flipping element silently flattens `transform-style: preserve-3d`, so the back face never hid the front and the flip only mirrored it. The cast shadow moved onto the faces as `box-shadow`.

**Homepage manifesto.** The 18ch cap added in the previous pass was too tight: the statement wrapped to four ragged lines while the right half of the row stayed empty. The label column is now 9rem and the statement and its paragraph sit side by side.

**Mobile.** Chrome's window floor is 606 CSS px, so narrower widths were verified by loading pages in a 390px iframe, which establishes its own viewport (`matchMedia('(max-width:500px)')` confirmed true). Home, About and visiting cards all report `scrollWidth === 390`. The one element wider than the viewport is the oversized logo artwork inside its `overflow:hidden` mask — pre-existing and intentional.


## Category pages and the format explorer

**The tab strip is gone.** `.category-nav` rendered three links as an underlined tab bar. Two problems: the tab affordance implies switching content in place, but these are three separate pages; and it duplicated the header nav, which already lists all three. Removing it also recovered a whole band of vertical space above every category hero.

Searched for a database rule on tabs and found none — `tabs hidden content progressive disclosure` and `nav-hierarchy overloaded navigation` (ux) returned nothing on the point, so **this call is judgment, not a database match**. What the database did supply is the Portfolio Grid pattern's "visuals first, filter by category" (landing), which the new grid follows.

**The wasted half.** `.category-introduction` was `grid-template-columns:1fr 2fr` with a short heading alone in the 1fr column and the entire product list in the 2fr column — so the left ~40% of the page was empty for the full height of the list. The heading row now spans the column (statement left, intro right) and the products run the full width beneath it.

**The catalogue grid.** `ServiceIndex` takes a `grid` prop that lays products out as cards with 3:2 images instead of a narrow thumbnail list. Three columns, not four: the catalogues hold 2–5 products and four tracks stranded a single card alone on a second row.

**Everything is visible.** `CatalogueIndex` closes every category page with all eleven products across three columns, the current one marked "You are here". Nothing about the catalogue sits behind a click.

**Format explorer** (homepage, replacing the flat `service-list`). The old rows were a lucide icon, a title and a dot-separated string, with the right half of the row empty and no picture of what any format actually is. Rows now drive a media panel that fills that space: hover or keyboard focus switches it, with a crossfade and a slow scale settle. Three of the four formats carry a film with an explicit play/pause control; the panel pauses offscreen and on tab hide, matching the other films on the site.

- Hover is never the only affordance: focus drives the same state, and below 900px the panel is replaced by a picture inline under each row.
- The panel is `aria-hidden` — the row text carries the meaning — and rows stay ordinary links, so keyboard and screen-reader use is unaffected.
- Panel images are lazy and start at `opacity:0`, so they were never "visible" and the first hover on each row waited on a fetch. They are warmed with `new Image()` when the section first intersects, rather than loaded with the page.

**One CSS bug worth remembering.** `.format-rows>li>a` (0,2,1) also matched the inline media link and beat `.format-inline-media` (0,1,0), so the mobile picture showed on desktop. The row link now carries its own `.format-row` class.

**Verified:** typecheck clean; no lint errors from this work (the remaining ones are pre-existing in `scripts/*.cjs`, `admin-library` and `site-shell`). All twelve routes 200. Home, signage and print-products report `scrollWidth === 390` in a 390px iframe.


## Scale, density and motion correction

Feedback: type too large on every page, too much unused space, some sections reading as plain text, and the site not looking like a creative agency made it.

Skill run: `creative agency signage editorial portfolio --design-system --variance 8 --motion 7 --density 7`. Took its **Stagger List** motion spec (300–450ms, ~60ms each) and its reminder to keep each section readable in its final state under reduced motion. Ignored its palette (pink/cyan) and type (Inter/Playfair) — the orange/charcoal and Space Grotesk/Archivo/DM Serif identity stands.

**Type was the main fault.** Headings ran to 132px (`.enterprise-hero h1`), 114px (`.about-manifesto h1`, `.outdoor-opening h1`) and 94px in several places; `/about` measured 104px and `/print-products` 88px. A four-step display scale now caps everything in `app/refine.css`:

- `--d1` 40–68px, homepage hero only
- `--d2` 32–52px, every page `h1`
- `--d3` 24–36px, section `h2`
- `--d4` 19–25px, card and row titles

Measured after: `/about` and `/print-products` `h1` = 52px desktop, 33px at 390px.

**Density.** `--space-section` 72–120px → 44–72px. `.page-intro` carried 80px/65px and the section after it added another 72px — a 137px dead band before any content. Intros, detail openings, quote bands and studio sections are all on tighter clamps, and `.two-column` rows centre so a short column reads as whitespace rather than a hole.

**Catalogue column counts.** Print holds 4 products, signage 5, outdoor 2, so a fixed three-track grid stranded Print's fourth card alone on a second row. `:has(> a:nth-child(4):last-child)` gives four tracks, `:nth-child(2):last-child` gives two capped at 60rem; the three-track rule stays as the fallback where `:has()` is unsupported.

**Motion, added where sections read as flat text.**
- **Stagger** — `.stagger > *` rises 14px over 500ms with a 55–60ms step, driven by an `--i` custom property per child. Applied to the catalogue grid, catalogue columns, the homepage project grid and the solution grid. It runs on load and finishes visible, so no content can be left permanently hidden.
- **Ticker** — a running band of the eleven formats between the catalogue and the closing CTA on every category page. It fills a full-width strip that was dead space. Pauses on hover and on focus-within, has an explicit pause button, and under reduced motion the animation stops and the band wraps as a static list with the duplicate group hidden.
- **Hover** — catalogue cards lift 3px and their photograph scales 1.04.

Films use MP4 rather than GIF throughout: same motion, a fraction of the weight, and they can carry a real pause control.

**A dev-only CSS drop.** Rapid HMR during this work occasionally left a page unstyled mid-edit. Verified afterwards that a fresh load and a client-side navigation both carry all seven stylesheets with no console errors; it does not survive a reload and does not apply to a production build, where CSS is emitted into the HTML.

**Verified:** typecheck clean; no lint errors from this work (the 13 are pre-existing in `scripts/*.cjs`, `admin-library`, `site-shell`, plus one in the Lumi assistant). Twelve routes 200. Home, print-products, about and work all report `scrollWidth === 390` at mobile width; the ticker's track is wider than the viewport by design and is clipped by `overflow:hidden`.


## The studio as hero, and the last of the flat sections

**The studio sits directly below the hero — it is not the hero.** An earlier pass replaced the homepage hero with the studio; that was a misreading and has been reverted. `BrandHero` is unchanged, and the studio is the first section after it, on the dark ground, carrying `id="explore"` so the hero's existing "Discover the possibilities" anchor lands straight on it. `HeroStudio` and the `hero` variant of `SignStudio` were deleted rather than left unused, and the duplicate studio section was removed from `/about`.

The stage is 2.1:1 — a fascia is wider than it is tall, and 16:9 left the name floating in an empty field.

**The ticker is a lit sign.** It was a plain grey strip. Now: near-black ground, bulb runs along the top and bottom edge from a repeating radial gradient, and the type carries a three-layer warm glow — a fascia trim rather than a band of text. Pause on hover, on focus-within, and an explicit button; under reduced motion the travel stops but the lit look stays.

**Catalogue columns got photographs and a shared baseline.** Each column leads with its category's shot at 16:10. Two alignment faults fixed: the "You are here" badge sat inline after the title and pushed that heading out of line — it now has its own row, with a format count in the other columns so all three rows exist; and the first column's `padding-left:0` made it wider, its photograph taller and its heading 14px lower than its neighbours. Measured after: padding 32px, image heights 236/236/236.7, heading tops within 1px.

**Solutions is no longer eight rows of text.** `SolutionExplorer` applies the same pattern as the homepage format explorer: rows on the left, a sticky photograph on the right that follows hover or focus, and an inline picture per row below 900px where there is no panel and no hover. The photograph comes from each solution's linked project.

**About.** The portrait moved up beside the statement, filling a hero that was half empty; the leader section below then split into heading and prose so it did not inherit the same hole.

**A class-name collision worth noting.** `.solution-note` already existed as a callout style (32px padding, orange left rule), so the new row descriptions inherited it. Renamed to `.solution-desc`.

**Verified:** typecheck clean; no lint errors from this work (the 15 are pre-existing in `admin-library`, `scripts/*.cjs`, `site-shell`, `app/admin`, plus four in the Lumi assistant). Twelve routes 200. Home, solutions, about and signage all report `scrollWidth === 390` at mobile width — the ticker track is wider by design and clipped.


## The seam between hero and studio

The hero and the try-it section were both `rgb(17,18,17)`, so they read as one unbroken black block with no boundary — the section change was invisible.

Searched `section boundary visual separation background` and `surface elevation contrast layering` (ux); **no database rule covers section separation**, so the treatment below is a design call, not a match. The search did surface two applicable rules: Smooth Scroll (High) — already satisfied, `scroll-behavior: smooth` is set globally and the hero's "Discover the possibilities" anchor targets this section — and Color Contrast 4.5:1, verified below.

The studio is now a distinct surface separated by a **lit seam**: a 2px warm gradient rule with a glow, and the light it throws down onto the panel below. For a signage company the divider is the thing the section is about — light escaping the top edge of an illuminated fascia — rather than a generic grey line. The panel itself runs `#1b1d1e → #111211` so it reads as mounted on the hero's wall.

Contrast over the glow, measured: eyebrow 8.75:1, heading 14.59:1, deck 7.91:1 — all above 4.5:1.

**One specificity bug found by that check.** The eyebrow is itself a `<p class="eyebrow">` inside `.studio-heading`, so `.home-studio .studio-heading p` (0,3,1) was beating `.home-studio .eyebrow` (0,2,0) and painting it grey instead of orange. The deck rule is now `.studio-heading>p:not(.eyebrow)`.


## The work page: proof before the grid

Searched `social proof logos credibility clients` (landing) and `filter results count empty state` (ux). The Trust & Authority pattern's order — **Hero (credibility) → Proof → Solution → CTA** — put the client index between the work hero and the portfolio grid. The filter guidance (No Results, Chip Reflow) was already satisfied: `Portfolio` renders an empty state with a message and a Clear filters action, and the selects wrap.

**Where the names came from.** The supplied `SignAds venture Profile.pdf` was checked first: its **text layer holds no client names**, only service lists and contact details. The names are in the photographs, and `lib/asset-catalog.json` had already catalogued them as `visibleName` across 184 assets — 48 distinct values, 33 published. `lib/clients.ts` is generated from that field, not written by hand, and every published name was verified back against the catalogue before shipping. `docs/client-index.md` records the derivation and the exclusion table.

**A wall of signs, not a list.** A first attempt set the names as a plain sectioned text index and read as flat. Every one of these names was made into a sign, so the wall shows them as signs: 33 plates on a dark wall, cycling through the studio's three material treatments, unlit by day. A **Day/Night control lights the whole wall**; hovering lights one plate. The toggle is the real affordance — `Hover vs Tap` (High) is explicit that hover does not exist on touch, so the lit state can never depend on it. Contrast unlit, measured: names 11.66:1, sector labels 5.47:1 (the first pass measured 4.47 and was lifted).

**Rights, flagged rather than assumed.** Every source asset is still `rightsStatus: 'permission-pending'`, and `getPublishedContent()` deliberately suppresses per-project `clientName` unless an asset is both `clientApproved` and `approved`. The client index sits outside that gate because it republishes names from the company's own marketing material rather than attributing individual projects. That is a business decision; `lib/clients.ts` is the single source, so removing a name is a one-line edit.

Contrast on the dark ground, measured: names 16.68:1, sector labels 6.05:1. Three columns, two at 900px, one at 600px; `/work` reports `scrollWidth === 390` at mobile width.

**Also noted from the PDF:** it lists `signadsventure@gmail.com` and a second number `7977483952`, where the site uses `signadsindia@gmail.com` and `91529 00157` alone. Left unchanged — worth confirming which is current.


## Sign studio, compacted

The studio read as bulky, and measurement backed that up: the section was ~1100px tall, with a 537px stage holding a single line of type, three stacked material boxes eating ~200px, and the CTA and day/night control stranded in separate rows below.

Searched `segmented control radio group compact` and `minimum touch target size spacing` (ux). Two rules shaped the rebuild:

- **Compact Control Semantics (Critical)** — chips need a native role, accessible name, state, keyboard operation and visible focus. The materials stayed **native radios** styled as a segmented control rather than becoming buttons: a single-choice group gets arrow-key navigation and the right role for free. Verified — pressing Right moves metal → neon.
- **Touch Target Size (High)** — web is 24 CSS px plus WCAG exceptions, 44pt on iOS. Controls are 40px on desktop and 44px+ on mobile.

Rebuilt as a fascia-proportioned stage (3.8:1) over **one control bar**: name, material, light, CTA in a single row, with the material note and disclaimer as a footnote beneath. Section height **1100px → 724px**, stage **537px → 349px**, bar 62px.

**The CTA alignment bug.** `.button` carries `min-height:52px`, which beats a plain `height:40px`, so the Enquire button sat 12px taller than every other control and broke the row. Fixed with an explicit `min-height`, and its global `translateY(-2px)` hover lift was neutralised since it now sits in an aligned row. Measured after: input, material, light and CTA all `height 40`, all `bottom 1378`.

On mobile the 1px container borders left the segment labels at 42px inside a 44px box; the container is now 46px so the targets themselves clear 44.


## About: the director, and what came off

`MANAGING_DIRECTOR` is set to **Nitesh Telange**, so the portrait caption reads "Nitesh Telange / Managing Director, SignAds". That was the one constant left blank earlier because a real person's name must not be invented.

**The two photographs at the foot of About were removed.** They were the only place `interior-wall.webp` and `building-day.webp` appeared, and neither earned the space: both are under-construction site shots — scaffolding, an unfinished interior, a building part-hidden by trees — carrying captions ("A space that tells a story", "An identity on the skyline") that say nothing specific. The visitor already has eleven curated project photographs on `/work` and more on every category page. About now runs statement + portrait → what we cover → capabilities → CTA, and ends on the call to action rather than on filler. The files remain in `public/images/` if they are ever wanted back.

## A note on concurrent sessions

Midway through this work the site returned 500: `app/layout.tsx` imported `./solutions-journey.css` before that file existed. It came from another session editing the same repo, so the import was left alone rather than deleted; the file appeared ~30s later and the site recovered on its own. Worth knowing that a missing stylesheet import takes the whole dev server down, not just the page that uses it.


## Sign studio gets its own page

The studio outgrew a homepage section, so it has one: **`/sign-studio`**, in the header nav between Signage and Our work. The homepage keeps the compact version as a teaser, now linking through to the full builder.

Pattern used: **Interactive 3D Configurator** (landing) — *configurator first → synced detail → specs → purchase*, with the CTA inside the configurator UI. The specs slot became "Your brief so far" rather than a price, because SignAds does not quote from a web form.

**Six real decisions, not toy ones.** Letterform, material, finish, letter height, mounting surface and light. These are the questions the product checklists in `lib/content.ts` already ask — dimensions, finish, illumination, surface — so the output is a brief the team can actually act on. `lib/sign-options.ts` holds the data; the material also picks which service the enquiry lands on, so a backlit brief arrives under Glow signs rather than a generic category.

Every control is a **native radio in a `fieldset` with a real `legend`**, so the whole builder is keyboard-operable with arrow keys and no custom ARIA. The stage carries a `role="img"` whose label describes the full configuration in words ("CSB Bank in serif letters, backlit acrylic, gold, 600 mm tall on glass, after dark").

**Finish was a dead control for one commit.** The swatches rendered and the brief recorded the choice, but no CSS consumed `data-finish` — picking Gold changed nothing on screen. Each finish now sets `--face` and `--glow`, and all four materials consume them: metal takes a brushed gradient, neon strokes and glows, backlit fills its box, painted stays flat and unlit by design.

Worth recording a testing trap: an early check reported all finishes rendering identically. That was the test, not the code — the preview span is replaced on re-render, so a cached element reference measures a detached node. Re-query after each state change.

**Surfaces** are drawn in CSS rather than photographed: brick, painted wall, ACP panel, glass and wood, each a layered gradient. Daylight lifts the whole stage with a brightness filter; night drops an inset shadow.

Verified: six groups render, `--face` updates per finish (`#f2d49b` for gold), the CTA carries all six values into `/contact`, mobile reports `scrollWidth === 390` with 44px+ targets throughout.
