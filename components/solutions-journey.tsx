"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Pause, Play, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { baseContent, solutions } from '@/lib/content';
import { businessScenes } from '@/lib/solution-journey';

export function SolutionsJourney(){
 const [business,setBusiness]=useState(businessScenes[0].id);
 const [stop,setStop]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [reduced,setReduced]=useState(false);
 const surface=useRef<HTMLDivElement>(null);
 const scene=businessScenes.find(s=>s.id===business)!;
 const solution=solutions.find(s=>s.id===business)!;
 const current=scene.stops[stop];
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduced(query.matches);if(query.matches)setPlaying(false)};update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 useEffect(()=>{const pause=()=>{if(document.hidden)setPlaying(false)};document.addEventListener('visibilitychange',pause);const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)setPlaying(false)},{threshold:.15});if(surface.current)observer.observe(surface.current);return()=>{document.removeEventListener('visibilitychange',pause);observer.disconnect()}},[business]);
 useEffect(()=>{if(!playing||reduced)return;const timer=window.setTimeout(()=>{if(stop===2)setPlaying(false);else setStop(s=>s+1)},5000);return()=>window.clearTimeout(timer)},[playing,stop,business,reduced]);
 const selectStop=(index:number)=>{setStop(index);setPlaying(false)};
 const selectBusiness=(id:string)=>{setBusiness(id);setStop(0);setPlaying(false)};
 return <main id="main" className="solutions-journey">
  <header className="journey-intro wrap"><div><p className="eyebrow">Business solutions / A connected experience</p><h1>Picture your brand<br/><em>out in the world.</em></h1></div><p>A sign that catches the eye. A space that welcomes. Something worth taking away. See how the pieces work together for your business.</p></header>
  <Tabs value={business} onValueChange={selectBusiness} className="journey-tabs">
   <div className="journey-picker wrap"><p className="eyebrow">01 / Choose your world</p><TabsList className="journey-businesses" aria-label="Choose your business">{businessScenes.map((s,i)=><TabsTrigger value={s.id} key={s.id} className="journey-business"><span className="journey-thumb"><img src={`/images/solution-scenes/${s.id}-thumb.webp`} alt="" width="1536" height="1024" loading={i===0?'eager':'lazy'}/></span><span>{s.short}</span></TabsTrigger>)}</TabsList></div>
   {businessScenes.map(s=><TabsContent value={s.id} key={s.id} className="journey-panel">
    <section className="journey-stage" aria-label={`${solution.title} visual journey`} ref={surface}>
     <div className="journey-stage-heading wrap"><div><p className="eyebrow">02 / Explore the touchpoints</p><h2>{scene.line}</h2></div>{!reduced&&<button type="button" className="journey-play" onClick={()=>{if(playing)setPlaying(false);else{setStop(0);setPlaying(true)}}}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pause tour':'Play the journey'}</button>}</div>
     <div className="journey-composition wrap">
      <div className="journey-scene"><img className="journey-scene-image" src={`/images/solution-scenes/${business}.webp`} alt={scene.alt} width="1536" height="1024" fetchPriority={business==='new-store-launch'?'high':'auto'}/><span className="journey-scene-note">Illustrative scene</span>
       {scene.stops.map((point,i)=><button key={i} className={`journey-hotspot ${i===stop?'is-selected':''}`} data-label-side={point.x>60?'left':'right'} style={{left:`${point.x}%`,top:`${point.y}%`}} type="button" aria-label={`Explore ${point.label.toLowerCase()}: ${point.title}`} aria-pressed={i===stop} onClick={()=>selectStop(i)}><span>0{i+1}</span><span className="journey-hotspot-label">{point.label}</span></button>)}
      </div>
      <aside className="journey-insight" aria-live={playing?'off':'polite'} aria-atomic="true"><div key={business+'-'+stop} className="journey-insight-body"><p className="journey-chapter"><span>0{stop+1}</span> / {current.label}</p><h3>{current.title}</h3><p>{current.description}</p><div className="journey-products"><p className="eyebrow">Bring it to life with</p>{current.products.map(id=>{const p=baseContent.find(item=>item.id===id&&item.kind==='product');return p?<Link key={id} href={`/services/${id}`}>{p.title}<ArrowUpRight size={17}/></Link>:null})}</div></div><button className="journey-next" type="button" onClick={()=>selectStop((stop+1)%3)}>{stop===2?'Back to the first touchpoint':'Next touchpoint'}<ArrowRight size={18}/></button></aside>
     </div>
     <ol className="journey-flow wrap" aria-label="Journey touchpoints">{scene.stops.map((point,i)=><li key={i}><button type="button" aria-pressed={i===stop} className={`${i===stop?'is-selected':''} ${playing&&i===stop?'is-playing':''}`} onClick={()=>selectStop(i)}><span className="journey-progress"/><span className="journey-step-number">0{i+1}</span><span>{point.label}</span><ArrowRight size={16}/></button></li>)}</ol>
    </section>
    <section className="journey-brief wrap"><div><p className="eyebrow">03 / Make it yours</p><h2>Your space.<br/><em>Your starting point.</em></h2><p>Start with your setting, your timings and the job each touchpoint needs to do. We’ll help connect the pieces.</p><Link href={`/solutions/${business}`} className="text-link">Explore this solution <ArrowUpRight size={18}/></Link></div><div className="journey-checklist"><p className="eyebrow">A few useful details to bring</p><ol>{solution.considerations.map((item,i)=><li key={item}><span>0{i+1}</span>{item}</li>)}</ol><Link className="button" href={`/contact?service=${encodeURIComponent(solution.title)}&brief=${encodeURIComponent(`My project: ${solution.title}. I'd like help planning the signage and printed materials for this setting. `)}`}>Plan my project <ArrowUpRight size={18}/></Link></div></section>
   </TabsContent>)}
  </Tabs>
 </main>
}
