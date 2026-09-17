import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HomeSections } from '@/components/home-sections';
import { HomeFormatFinder } from '@/components/home-format-finder';
import { BrandHero } from '@/components/brand-hero';
import { SignStudio } from '@/components/sign-studio';
import { getPublishedContent } from '@/lib/store';
export const dynamic = 'force-dynamic';
export default async function Home() {
 const content=await getPublishedContent();
 const projects=content.filter(p=>p.kind==='project');
 const products=content.filter(p=>p.kind==='product');
 return <main id="main" className="home-page home-refined">
  <BrandHero/>
  <HomeFormatFinder products={products}/>
  <section className="home-studio home-studio-compact" id="try-your-sign"><div className="wrap"><div className="studio-heading"><div><p className="eyebrow">Try it / Your name in lights</p><h2>Picture your own sign.</h2></div><p>Type a name, explore the finish and switch the lighting. <Link className="text-link studio-more" href="/sign-studio">Open the full sign studio <ArrowUpRight size={16}/></Link></p></div><SignStudio/></div></section>
  <HomeSections projects={projects}/>
 </main>;
}
