import type { Content } from './content';

// Describe the pictured object, rather than repeating marketing copy as alt text.
const descriptions:Record<string,string>={
 'visiting-cards':'Stack of thick white visiting cards with an orange card showing the printed front',
 'flyers':'Three flat promotional flyers with distinct orange and black printed layouts',
 'pamphlets-product':'An opened three-panel pamphlet beside a folded copy',
 'brochures-product':'A bound company brochure opened to a two-page spread with visible page edges',
 'flex-banner-product':'A horizontal flexible vinyl banner with reinforced edges and metal eyelets',
 'hoarding-product':'A large roadside advertising hoarding mounted on steel supports',
 'led-storefront':'Illuminated storefront sign photographed after dark',
 'acp-cladding':'Shop facade finished with aluminium composite cladding panels',
 'metal-letter-detail':'Raised metal storefront letters with illuminated edges',
 'glow-board':'An illuminated rectangular glow sign above a shopfront',
 'vehicle-branding':'Printed campaign graphics applied to a tempo advertising vehicle',
 'wayfinding':'Blue bilingual directional sign panels with arrows',
};
export const illustrativeProductImages=new Set(['visiting-cards','flyers','pamphlets-product','brochures-product','flex-banner-product','hoarding-product','print-study','banner-display','letter-study','brand-sculpture']);
export function productImageAlt(item:Content,image=item.image){return descriptions[image]||`${item.title}: product or application photograph`;}
export function productImageCaption(image:string){return illustrativeProductImages.has(image)?'Illustrative product example':'From the SignAds company profiles';}
