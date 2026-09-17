# Lumi product guide

Lumi is a guided assistant using the published SignAds product catalogue and explicit answers for artwork, prices, timing and installation. It is not connected to an LLM or live chat operator. Unknown questions offer a team handoff. No prices, stock, coverage or production dates are invented.

## Interaction

- Six generated character poses: calm, curious, welcoming, attentive, thinking and delighted.
- Hover/focus reacts; clicking opens the panel with a greeting animation. Typing changes the pose. Pending requests show the thinking pose. Successful enquiry submission shows delight.
- Product-page greetings and enquiry service defaults use the current route.
- Product questions retrieve published catalogue content from the server, including content-library overrides.
- Chat is held in React memory, reset on navigation and refresh. Closing the panel preserves the conversation. The quote draft remains available when switching between chat and form while the panel is open; closing the panel discards an unsent form.
- Enquiries reuse the existing validated endpoint, privacy consent, artwork upload and private inbox. A successful reference is added to the conversation.
- Prices, delivery timing, installation and availability require team confirmation.
- Animation can be paused, and follows the device reduced-motion preference. The device-local animation preference is saved in localStorage.
- The dialog uses existing Radix primitives and supports keyboard dismissal and focus return. The chat is nonmodal so the catalogue remains accessible.

## Asset

`public/images/lumi/emotions.png` is a 2172 × 724 transparent PNG generated with the built-in imagegen tool from the approved Lumi storyboard. Six 362 × 724 cells, in the pose order above. CSS crops the transparent margins and selects a cell; transforms animate the supplied art. No customer portfolio image is used.

Asset brief: preserve Lumi's orange metal sign body, charcoal face, warm LED eyes, black hands and orange feet; render the six expressions in equally spaced cells, consistent camera and baseline, genuine transparent background, no text or surrounding interface.

## Verification

- TypeScript check.
- Local HTTP requests cover product recognition, follow-up context, artwork, prices, quote intent and unknown-question fallback.
- Empty and oversized messages rejected; cross-origin requests rejected.
- Production build required before publication.
- Browser regression check: all six Meet Lumi controls selected distinct visible sprite positions (0%, 20%, 40%, 60%, 80%, 100%). Typing selected attentive; sending selected thinking. Mobile panel bounds were x=10..380 and y=98..778 at 390 × 844.
- Fixed the inherited centre-dialog translate that pushed the header off-screen. The mascot is larger; Meet Lumi exposes every expression; fast replies keep a short thinking gesture without delaying the response text.

Publication isolates this feature from pre-existing, uncommitted page redesigns in the shared workspace.
