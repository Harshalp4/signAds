import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Content,imageUrl,hrefFor} from '@/lib/content';
const questions=[
 ['Can I enquire about just one sign?','Yes. Tell us about the sign, its dimensions and its intended location. The scope and available options can be discussed for your project.'],
 ['What should I share for a print quote?','The product, quantity, finished dimensions, artwork status and needed-by date are a useful start. Add any paper or finishing preferences to your brief.'],
 ['Can I discuss several locations or formats?','Yes. The enterprise form captures sites, units, locations, dates and artwork status. Coverage and execution requirements are reviewed for each enquiry.'],
 ['Can I see examples before enquiring?','The Work gallery contains photographs from the company profiles, organised by service and application. Ask about specifications relevant to your project when you enquire.']
];
export function HomeSections({projects}:{projects:Content[]}){
 const chosen=['reception-lettering','jewellery-storefront','tempo-campaign'].map(id=>projects.find(p=>p.id===id)).filter((p):p is Content=>!!p);
 return <>
 {chosen.length>0&&<section className="home-proof wrap"><div className="home-proof-heading"><div><p className="eyebrow">From the company profiles</p><h2>Made. Installed. Seen.</h2></div><Link href="/work" className="text-link">Explore all the work <ArrowUpRight size={18}/></Link></div><div className="home-proof-grid">{chosen.map(p=><Link key={p.id} href={hrefFor(p)}><div className="home-proof-image"><img src={imageUrl(p.image)} alt={p.description} width="900" height="600" loading="lazy"/></div><p>{p.category}<span>{p.industry}</span></p><h3>{p.title}<ArrowUpRight size={17}/></h3></Link>)}</div></section>}
 <section className="home-project-paths"><div className="wrap"><div><p className="eyebrow">Planning more than one piece?</p><h2>Start with <br/><em>the whole picture.</em></h2></div><div className="home-path-links"><Link href="/solutions"><span><strong>A store, an office or a launch</strong><small>Explore the touchpoints around your business.</small></span><ArrowUpRight size={22}/></Link><Link href="/enterprise"><span><strong>Several sites or a larger campaign</strong><small>Bring locations, quantities and timings into one brief.</small></span><ArrowUpRight size={22}/></Link></div></div></section>
 <section className="home-faq wrap"><div><p className="eyebrow">Before you begin</p><h2>A few useful answers.</h2><Link href="/contact" className="text-link">Talk to SignAds <ArrowUpRight size={18}/></Link></div><div className="faq-list">{questions.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 </>
}
