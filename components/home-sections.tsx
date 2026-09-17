import Link from 'next/link';
import {ArrowUpRight, Plus, MoveUpRight, Paperclip} from 'lucide-react';
import {Content,imageUrl,hrefFor} from '@/lib/content';
export function HomeSections({projects}:{projects:Content[]}){
 const chosen=['reception-lettering','jewellery-storefront','tempo-campaign'].map(id=>projects.find(p=>p.id===id)).filter((p):p is Content=>!!p);
 return <>
 {chosen.length>0&&<section className="home-proof wrap"><div className="home-proof-heading"><div><p className="eyebrow">From the company profiles</p><h2>Made. Installed. Seen.</h2></div><Link href="/work" className="text-link">Explore all the work <ArrowUpRight size={18}/></Link></div><div className="home-proof-grid">{chosen.map(p=><Link key={p.id} href={hrefFor(p)}><div className="home-proof-image"><img src={imageUrl(p.image)} alt={p.description} width="900" height="600" loading="lazy"/></div><p>{p.category}<span>{p.industry}</span></p><h3>{p.title}<ArrowUpRight size={17}/></h3></Link>)}</div></section>}
 <section className="home-start wrap" id="start-a-project" aria-labelledby="home-start-title">
  <div className="home-brief">
   <div className="home-brief-top"><p className="eyebrow">Your next project</p><Paperclip size={22} aria-hidden="true"/></div>
   <h2 id="home-start-title">A rough idea is <em>a good start.</em></h2>
   <p className="home-brief-intro">Tell us what you want to make. We’ll discuss the details with you.</p>
   <div className="home-brief-notes" aria-label="Helpful details for your enquiry">
    <span><small>01 / What</small>Product or space</span>
    <span><small>02 / Scale</small>Size & quantity</span>
    <span><small>03 / When</small>Your target date</span>
   </div>
   <Link href="/contact" className="home-brief-cta">Start your brief <MoveUpRight size={20} aria-hidden="true"/></Link>
  </div>
  <div className="home-start-help">
   <p className="eyebrow">Good to know</p>
   <h3>A little clarity first.</h3>
   <div className="home-start-questions">
    <details open name="home-start-answers"><summary>What if I’m not sure what I need?<Plus size={18} aria-hidden="true"/></summary><div><p>Start with where it will be used and what you want it to do. Add a reference or a photo if you have one; the format, material and finish can be discussed.</p><Link href="/solutions">Explore ideas for your business <ArrowUpRight size={16} aria-hidden="true"/></Link></div></details>
    <details name="home-start-answers"><summary>Can I enquire about a single item?<Plus size={18} aria-hidden="true"/></summary><div><p>Yes. Send the product or sign you have in mind, its size and where it will be used. Quantities and available options are reviewed for your project.</p></div></details>
    <details name="home-start-answers"><summary>Planning several locations or formats?<Plus size={18} aria-hidden="true"/></summary><div><p>Bring the locations, products, quantities and target dates into one brief. The team will review the scope and execution requirements with you.</p><Link href="/enterprise">Plan a larger project <ArrowUpRight size={16} aria-hidden="true"/></Link></div></details>
   </div>
  </div>
 </section>
 </>
}
