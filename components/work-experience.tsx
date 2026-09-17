'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ArrowDown,ArrowLeft,ArrowRight} from 'lucide-react';
import {Carousel,CarouselContent,CarouselItem,type CarouselApi} from '@/components/ui/carousel';
import {Content,hrefFor,imageUrl} from '@/lib/content';
import {DayNight} from './motion';
import {Portfolio} from './portfolio';

const selections=['restaurant-day-night','reception-lettering','tempo-campaign','jewellery-storefront'];
const observations:Record<string,string>={
 'restaurant-day-night':'Watch how illumination changes the same frontage. Switch between daylight and after dark.',
 'reception-lettering':'Letter depth, a dark surface and a halo of light give the reception its focal point.',
 'tempo-campaign':'A vehicle becomes a moving surface for a campaign. See how the artwork uses the available panels.',
 'jewellery-storefront':'Warm metal lettering and illumination bring the identity into the shopfront.'
};
export function WorkExperience({items}:{items:Content[]}){
 const featured=selections.map(id=>items.find(p=>p.id===id)).filter((p):p is Content=>!!p);
 const [api,setApi]=useState<CarouselApi>();const [selected,setSelected]=useState(0);const [reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{if(!api)return;const update=()=>setSelected(api.selectedScrollSnap());update();api.on('select',update);return()=>{api.off('select',update)}},[api]);
 const go=(index:number)=>api?.scrollTo(index,reduced);
 return <main id="main" className="work-experience">
  <section className="work-opening"><div className="wrap"><header className="work-opening-head"><div><p className="eyebrow">Our work / Seen in the real world</p><h1>Made to be seen.<br/><em>Worth a closer look.</em></h1></div><div><p>Storefronts. Reception walls. Campaigns on the move. Explore the physical details in the SignAds profile photographs.</p><a className="work-archive-link" href="#work-archive">Explore the archive <ArrowDown size={18}/></a></div></header>
  {featured.length>0&&<Carousel setApi={setApi} opts={{loop:false,watchDrag:!reduced,duration:reduced?0:25}} className="work-showcase" aria-label="Selected project photographs">
   <div className="work-showcase-top"><p className="eyebrow">In focus <span aria-live="polite">/ {String(selected+1).padStart(2,'0')} of {String(featured.length).padStart(2,'0')}</span></p><div className="work-carousel-arrows"><button type="button" aria-label="Previous featured project" disabled={selected===0} onClick={()=>go(selected-1)}><ArrowLeft size={20}/></button><button type="button" aria-label="Next featured project" disabled={selected===featured.length-1} onClick={()=>go(selected+1)}><ArrowRight size={20}/></button></div></div>
   <CarouselContent className="work-slides">{featured.map((p,i)=><CarouselItem key={p.id} className="work-slide" aria-hidden={selected!==i} inert={selected!==i} aria-label={`${i+1} of ${featured.length}: ${p.title}`}><div className="work-feature-layout"><div className="work-feature-copy"><span className="work-feature-number" aria-hidden="true">0{i+1}</span><p className="eyebrow">{p.industry} / {p.application}</p><h2>{p.title}</h2><p>{observations[p.id]||p.description}</p><Link href={hrefFor(p)} className="text-link">View project notes <ArrowUpRight size={18}/></Link></div><div className="work-feature-media">{p.id==='restaurant-day-night'?<DayNight/>:<figure><img src={imageUrl(p.image)} alt={p.description} width="1040" height="700" loading={i===0?'eager':'lazy'}/><figcaption>{p.category} <span>Profile photograph</span></figcaption></figure>}</div></div></CarouselItem>)}</CarouselContent>
   <div className="work-filmstrip" aria-label="Choose a featured project">{featured.map((p,i)=><button key={p.id} type="button" aria-pressed={i===selected} onClick={()=>go(i)}><img src={imageUrl(p.image)} alt="" width="96" height="64" loading="lazy"/><span><small>0{i+1} / {p.industry}</small>{p.application}</span><ArrowUpRight size={17}/></button>)}</div>
  </Carousel>}
  </div></section>
  <section id="work-archive" className="work-archive wrap"><Portfolio items={items}/><p className="work-source">Photographs from the SignAds company profiles. Dates, locations and project outcomes are included only when confirmed.</p></section>
  <section className="work-end"><div className="wrap"><p className="eyebrow">Inspired by something here?</p><h2>Let’s picture it<br/><em>in your space.</em></h2><Link href="/contact?brief=I%20saw%20a%20project%20in%20your%20portfolio%20and%20would%20like%20to%20discuss%20something%20similar.%20" className="button">Discuss your project <ArrowUpRight size={19}/></Link><Link href="/solutions" className="work-end-secondary">Explore ideas for your business <ArrowUpRight size={17}/></Link></div></section>
 </main>
}
