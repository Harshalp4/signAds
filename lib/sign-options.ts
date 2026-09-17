// Options for the sign studio. These are the questions a signage brief
// actually has to answer — the same ones the product checklists in
// lib/content.ts ask for: letterform, material, finish, height, surface and
// how it reads by day and after dark.
//
// Nothing here implies a price or a lead time. The studio produces a brief,
// not a quotation.

export type Option = {id: string; label: string; note?: string};

export const LETTERFORMS = [
  {id: 'block', label: 'Block', note: 'Heavy, even strokes. The most legible at distance.', stack: "'Space Grotesk', Arial, sans-serif", weight: 700, tracking: '-.03em'},
  {id: 'grotesk', label: 'Grotesk', note: 'A neutral modern face. Works on a fascia or indoors.', stack: "'Archivo', Arial, sans-serif", weight: 600, tracking: '-.02em'},
  {id: 'serif', label: 'Serif', note: 'Traditional and formal. Common for jewellers and banks.', stack: "'DM Serif Display', Georgia, serif", weight: 400, tracking: '-.01em'},
  {id: 'wide', label: 'Wide', note: 'Letter-spaced and calm. Suits a wide, low fascia.', stack: "'Archivo', Arial, sans-serif", weight: 500, tracking: '.12em'},
] as const;

export const MATERIALS = [
  {id: 'metal', label: 'Metal letters', note: 'A brushed face with real depth, halo-lit from behind after dark.'},
  {id: 'neon', label: 'Neon glow', note: 'One continuous lit line. Quiet by day, unmistakable at night.'},
  {id: 'backlit', label: 'Backlit acrylic', note: 'An even, readable face on a lit box. Legible from across the street.'},
  {id: 'painted', label: 'Painted / unlit', note: 'No illumination. The cheapest to run, and it needs its own light.'},
] as const;

export const FINISHES = [
  {id: 'warm', label: 'Warm white', swatch: '#ffe9cf'},
  {id: 'cool', label: 'Cool white', swatch: '#eef4ff'},
  {id: 'orange', label: 'Signal orange', swatch: '#ff8b33'},
  {id: 'gold', label: 'Gold', swatch: '#e8c07a'},
  {id: 'chrome', label: 'Chrome', swatch: '#cdd3da'},
] as const;

export const HEIGHTS = [
  {id: '150', label: '150 mm', note: 'Reception walls and interior rooms.'},
  {id: '300', label: '300 mm', note: 'A standard shopfront fascia.'},
  {id: '450', label: '450 mm', note: 'A wide fascia, or a first-floor sign.'},
  {id: '600', label: '600 mm', note: 'Building identification, read from the road.'},
] as const;

export const SURFACES = [
  {id: 'brick', label: 'Brick'},
  {id: 'painted', label: 'Painted wall'},
  {id: 'acp', label: 'ACP panel'},
  {id: 'glass', label: 'Glass'},
  {id: 'wood', label: 'Wood'},
] as const;

export type Letterform = (typeof LETTERFORMS)[number]['id'];
export type Material = (typeof MATERIALS)[number]['id'];
export type Finish = (typeof FINISHES)[number]['id'];
export type Height = (typeof HEIGHTS)[number]['id'];
export type Surface = (typeof SURFACES)[number]['id'];

// The enquiry category each material belongs to, so the brief lands on the
// right service rather than a generic one.
export const SERVICE_FOR: Record<Material, string> = {
  metal: 'Dimensional letters',
  neon: 'LED signboards',
  backlit: 'Glow signs',
  painted: 'Dimensional letters',
};
