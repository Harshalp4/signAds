import type { Content } from './content';

export type LumiReply = { text: string; suggestions: string[]; product?: string; link?: { label: string; href: string }; quote?: boolean };

const aliases: Record<string, RegExp> = {
  'visiting-cards': /\b(visiting|business|name) cards?\b/i,
  'flyers-pamphlets': /\b(flyers?|pamphlets?|leaflets?)\b/i,
  brochures: /\b(brochures?|catalogues?|catalogs?)\b/i,
  banners: /\b(banners?|flex)\b/i,
  'led-signboards': /\b(led|illuminated|shop ?boards?|signboards?)\b/i,
  'acp-cladding': /\b(acp|cladding|facade)\b/i,
  'dimensional-letters': /\b(letters?|lettering|metal|pu|3d)\b/i,
  'glow-signs': /\b(glow|lightbox|backlit)\b/i,
  'vehicle-branding': /\b(vehicle|car|bus|fleet|truck)\b/i,
  hoardings: /\b(hoardings?|billboards?)\b/i,
  wayfinding: /\b(wayfinding|directional|safety)\b/i,
};

export function lumiGreeting(path: string): string {
  if (path.includes('visiting-cards')) return 'Hi, I’m Lumi. Planning visiting cards? I can help you prepare the quantity, paper and finish details for your brief.';
  if (/flyers|pamphlets/.test(path)) return 'Hi, I’m Lumi. Working on a flyer or pamphlet? Let’s start with the message, format and quantity.';
  if (path === '/print-products') return 'Hi, I’m Lumi. What are you printing? I can help you explore formats and prepare a quote enquiry.';
  if (/signage|led|cladding|letters|glow|wayfinding/.test(path)) return 'Hi, I’m Lumi. Planning a sign? Tell me where it will go and whether it needs to light up.';
  if (/outdoor|hoarding|vehicle/.test(path)) return 'Hi, I’m Lumi. Planning an outdoor campaign? I can help you organise the format, locations and project details.';
  return 'Hi, I’m Lumi, your SignAds product guide. Tell me what you’re creating, or choose a starting point below.';
}

export function replyToLumi(message: string, path: string, previousProduct: string, content: Content[]): LumiReply {
  const products = content.filter(p => p.kind === 'product' && p.status === 'published');
  const matched = products.find(p => aliases[p.id]?.test(message) || message.toLowerCase().includes(p.title.toLowerCase()));
  const current = matched || products.find(p => p.id === previousProduct) || products.find(p => path.endsWith('/' + p.id));
  const product = current?.id;
  const next = ['What details do you need?', 'Artwork help', 'Get a quote'];
  if (/\b(hi|hello|hey)\b/i.test(message) && message.trim().split(/\s+/).length < 4) return { text: lumiGreeting(path), product, suggestions: ['Print materials', 'Signage', 'Get a quote'] };
  if (/\b(human|person|team|call|contact|whatsapp)\b/i.test(message)) return { text: 'You can speak with SignAds on +91 91529 00157 or email signadsindia@gmail.com. You can also open WhatsApp to discuss your project with the team.', product, suggestions: ['Get a quote'], link: { label: 'Talk to SignAds on WhatsApp', href: 'https://wa.me/919152900157' } };
  if (/\b(quote|quotation|enquiry|enquire|order|buy|book)\b/i.test(message)) return { text: `Let’s prepare your ${current ? current.title.toLowerCase() + ' ' : ''}enquiry. Review your brief, add your contact details and send it to the SignAds team. This requests a quote; it does not place an order.`, product, quote: true, suggestions: ['What details do you need?'] };
  if (/\b(price|pricing|cost|rate|rates|cheap|budget|discount)\b/i.test(message)) return { text: 'Pricing depends on the format, quantity, materials, finish and any installation. I don’t have confirmed prices. Share your requirements in a quote enquiry so the team can scope your project.', product, suggestions: ['Get a quote', 'What details do you need?'] };
  if (/\b(deliver|delivery|days|urgent|tomorrow|turnaround|timeline|time|when)\b/i.test(message)) return { text: 'Share your needed-by date in the enquiry. The team needs to confirm production and delivery timing after reviewing your specification, artwork and location.', product, suggestions: ['Get a quote', 'Artwork help'] };
  if (/\b(artwork|file|pdf|logo|upload|resolution|bleed|cmyk)\b/i.test(message)) return { text: 'You can attach a PDF, JPG, PNG or WebP up to 10 MB to the enquiry. Share your logo or draft and the finished dimensions. Ask the team to confirm bleed, colour and production requirements for your chosen format before finalising the artwork.', product, suggestions: ['Get a quote', 'What details do you need?'] };
  if (/\b(install|installation|location|coverage|city|cities)\b/i.test(message)) return { text: 'Add the project location, approximate dimensions and a clear site photograph to your enquiry. Installation, site access, electrical work and service coverage need confirmation for your project.', product, suggestions: ['Get a quote', 'Signage'] };
  if (/\b(paper|finish|gsm|matte|matt|gloss|foil|material|stock)\b/i.test(message) && !/print materials/i.test(message)) return { text: current ? `${current.title}: ${current.body.join(' ')}\n\nInclude any material or finish references you like. The team will confirm the available options for your brief.` : 'Tell me the product you’re considering so I can point you to the right requirements. Material and finishing options are confirmed for each project.', product, suggestions: current ? next : ['Visiting cards', 'Brochures', 'LED signboards'] };
  if (/\b(details|need|quantity|size|dimensions|prepare)\b/i.test(message) && current) return { text: `For ${current.title.toLowerCase()}, a useful starting point is:\n${current.details.map(d => '• ' + d).join('\n')}\n\nAdd your project location and needed-by date when you enquire.`, product, suggestions: ['Get a quote', 'Artwork help'] };
  if (matched) return { text: `${matched.description}\n\nFor ${matched.title.toLowerCase()}, share:\n${matched.details.map(d => '• ' + d).join('\n')}`, product, suggestions: next, link: { label: `Explore ${matched.title.toLowerCase()}`, href: `/services/${matched.id}` } };
  if (/\b(print|printing|stationery)\b/i.test(message)) return { text: 'Start with the format: visiting cards for introductions, flyers and pamphlets for a short message, brochures for more detail, or banners for a larger display. Which one are you considering?', suggestions: products.filter(p => p.category === 'Print').map(p => p.title).slice(0, 4), link: { label: 'Explore print products', href: '/print-products' } };
  if (/\b(sign|signs|signage|storefront|shop|store)\b/i.test(message)) return { text: 'For signage, consider the viewing distance, available space and whether it needs to be visible after dark. Which format would you like to explore?', suggestions: ['LED signboards', 'Dimensional letters', 'ACP cladding', 'Get a quote'], link: { label: 'Explore signage', href: '/signage' } };
  if (/\b(outdoor|advertising|campaign)\b/i.test(message)) return { text: 'For an outdoor campaign, start with the locations, display format and campaign period. Media availability, permissions and execution scope need review by the team.', suggestions: ['Hoardings', 'Vehicle branding', 'Get a quote'], link: { label: 'Explore outdoor advertising', href: '/outdoor' } };
  if (/\b(thanks|thank you|great|perfect)\b/i.test(message)) return { text: 'You’re welcome. Ready to put your idea into a brief?', product, suggestions: ['Get a quote', 'Talk to the team'] };
  return { text: 'I can help with SignAds products, artwork requirements and preparing a quote enquiry. I don’t have a confirmed answer to that question. Choose a topic below or ask the team for project-specific advice.', product, suggestions: ['Print materials', 'Signage', 'Talk to the team', 'Get a quote'] };
}
