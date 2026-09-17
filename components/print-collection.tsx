import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { type Content, hrefFor, imageUrl } from '@/lib/content';
import { productImageAlt } from '@/lib/product-media';

const scenes: Record<string, { alt: string; detail: string }> = {
  'visiting-cards': { alt: 'Hands exchanging a textured ivory visiting card over a wooden office desk', detail: 'Made for a first introduction' },
  'flyers-pamphlets': { alt: 'An orange event flyer being picked up beside an open three-panel pamphlet on a café counter', detail: 'A message worth picking up' },
  brochures: { alt: 'Hands turning a page of a bound architectural brochure, showing the paper texture and printed spread', detail: 'A story that unfolds in your hands' },
  banners: { alt: 'A flexible orange vinyl banner secured with eyelets and ties to a café railing', detail: 'A bigger welcome, out in the world' },
};

export function PrintCollection({ items }: { items: Content[] }) {
  return <div className="print-collection">
    <div className="print-scene-grid">{items.map((item, index) => {
      const scene = scenes[item.id];
      return <Link key={item.id} href={hrefFor(item)} className="print-scene">
        <figure className="print-scene-photo">
          <img src={scene ? `/images/print-scenes/${item.id}.webp` : imageUrl(item.image)} alt={scene?.alt || productImageAlt(item)} width="1536" height="1024" sizes="(max-width:640px) 100vw, (max-width:1440px) 47vw, 640px" loading="lazy" decoding="async" />
          <figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>{scene?.detail || item.category}</span></figcaption>
        </figure>
        <div className="print-scene-copy"><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={24} aria-hidden="true" /></div>
      </Link>;
    })}</div>
    <p className="print-scene-note">Illustrative product scenes. Paper, finish and production details are confirmed for your project.</p>
  </div>;
}
