import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HomeSections } from '@/components/home-sections';
import { BrandHero } from '@/components/brand-hero';
import { Reveal } from '@/components/motion';
import { getPublishedContent } from '@/lib/store';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const projects = (await getPublishedContent()).filter(p => p.kind === 'project');
  return <main id="main" className="home-page">
    <BrandHero/>
    <section className="brand-introduction section wrap" id="explore">
      <Reveal><div className="brand-manifesto"><p className="eyebrow">01 / Make an impression</p><div><h2>Noticed on paper.<br/>Recognised in a space.<br/><span>Remembered on the street.</span></h2><p>A brand is more than what’s on a screen. We bring yours into the places where people meet it—with print, signs and outdoor advertising.</p></div></div></Reveal>
      <div className="brand-entry-grid">
        <Link href="/print-products" className="brand-entry brand-entry-print"><div className="brand-entry-image"><img src="/images/flyers.webp" alt="Illustrative flat flyers with orange and black layouts" width="1536" height="1024" loading="lazy"/><span className="brand-entry-index">01 / In your hands</span><span className="brand-entry-arrow"><ArrowUpRight/></span></div><div className="brand-entry-caption"><h3>Small format.<br/>Lasting impression.</h3><p>Visiting cards, brochures,<br/>flyers & print essentials.</p></div></Link>
        <Link href="/signage" className="brand-entry brand-entry-sign"><div className="brand-entry-image"><img src="/images/projecting-sign.webp" alt="Projecting sign photographed in the SignAds company profile" width="1672" height="941" loading="lazy"/><span className="brand-entry-index">02 / In your space · From the profile</span><span className="brand-entry-arrow"><ArrowUpRight/></span></div><div className="brand-entry-caption"><h3>Big presence.<br/>Every dimension.</h3><p>Dimensional lettering,<br/>illuminated signs & branded spaces.</p></div></Link>
      </div>
    </section>
    <HomeSections projects={projects}/>
  </main>;
}
