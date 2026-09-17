import {AboutExperience} from './about-experience';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Content, hrefFor, imageUrl, solutions } from '@/lib/content';
import { Film } from './film';
import { productImageAlt,productImageCaption } from '@/lib/product-media';
import { ServiceIndex } from './service-index';
import { PrintCollection } from './print-collection';
import { DayNight } from './motion';
import { Ticker } from './ticker';
import { SolutionsJourney } from './solutions-journey';
import { CardStudio } from './card-studio';
import { QuoteForm } from './quote-form';

export function EditorialCTA({service='',title='Have something in mind?'}:{service?:string;title?:string}){
  return <section className="editorial-cta"><div className="wrap"><div><p className="eyebrow">Your next project</p><h2>{title}<br/><em>Let’s make it real.</em></h2></div><Link className="button" href={`/contact${service?'?service='+encodeURIComponent(service):''}`}>Start a conversation <ArrowUpRight size={19}/></Link></div></section>;
}
const CATEGORIES=[
  {href:'print-products',name:'Print',label:'Print & paper',note:'Something to hold, hand over or leave behind.',shot:'flyers'},
  {href:'signage',name:'Signage',label:'Signage & fabrication',note:'Lettering, light and surfaces, built for a place.',shot:'metal-letters'},
  {href:'outdoor',name:'Outdoor',label:'Outdoor & transit',note:'Formats that meet people out on the route.',shot:'hoarding-product'},
];

// Every product on the site, grouped and visible, on every category page.
// Nothing about the catalogue sits behind a click.
function CatalogueIndex({products,active}:{products:Content[];active:string}){
  return <section className="catalogue-all">
    <div className="wrap">
      <div className="section-heading">
        <p className="eyebrow">Everything we make</p>
        <h2>The whole catalogue, in one place.</h2>
        <p>Three groups, eleven formats. Open any one of them for what to send with an enquiry.</p>
      </div>
      <div className="catalogue-columns stagger">
        {CATEGORIES.map(c=>{
          const items=products.filter(p=>p.category===c.name);
          return <div key={c.href} style={{['--i' as string]:CATEGORIES.indexOf(c)}} className={c.href===active?'catalogue-column is-current':'catalogue-column'}>
            <Link href={'/'+c.href} className="catalogue-shot" tabIndex={-1} aria-hidden="true">
              <img src={imageUrl(c.shot)} alt="" width="800" height="533" sizes="(max-width:700px) 100vw, 31vw" loading="lazy" decoding="async"/>
            </Link>
            <p className="catalogue-flag">{c.href===active?<span className="catalogue-here">You are here</span>:<span className="catalogue-count">{items.length} formats</span>}</p>
            <h3><Link href={'/'+c.href}>{c.label}</Link></h3>
            <p className="catalogue-note">{c.note}</p>
            <ul>{items.map(i=><li key={i.id}><Link href={hrefFor(i)}>{i.title}<ArrowUpRight size={15} aria-hidden="true"/></Link></li>)}</ul>
          </div>;
        })}
      </div>
    </div>
  </section>;
}
export function CategoryPage({category,products}:{category:string;products:Content[]}){
  const print=category==='print-products',outdoor=category==='outdoor';const name=print?'Print':outdoor?'Outdoor':'Signage';const items=products.filter(p=>p.category===name);
  return <main id="main" className={`editorial-page category-${print?'print':outdoor?'outdoor':'signage'}`}>
    {print?<><section className="editorial-heading wrap"><p className="eyebrow">Print / Something to hold</p><h1>Good on screen.<br/><em>Better in your hands.</em></h1><div><p>A first introduction. A new offer. The whole story. Find the printed format your message deserves.</p><Link className="text-link" href="/contact?service=Print">Discuss your print brief <ArrowUpRight size={18}/></Link></div></section></>:outdoor?<section className="outdoor-opening wrap"><p className="eyebrow">Outdoor / Meet people out there</p><h1>One message.<br/><em>A much bigger canvas.</em></h1><div className="outdoor-opening-bottom"><p>From a passing vehicle to a street-side display, build a campaign around the places your audience moves through.</p><Link href="/contact?service=Outdoor%20campaign" className="button">Discuss your campaign <ArrowUpRight size={18}/></Link></div><div className="outdoor-panorama"><img src="/images/hoarding-product.webp" alt="Illustrative roadside advertising hoarding on steel supports" width="1536" height="1024"/></div><p className="editorial-media-caption"><span>Start with the place. Then choose the format.</span><span>Concept display</span></p></section>:<section className="signage-opening"><div className="wrap"><div><p className="eyebrow">Signage / Give your brand dimension</p><h1>Some brands<br/><em>light up a place.</em></h1><p>Lettering, light and surfaces. Bring your identity into the spaces people see, enter and remember.</p><Link className="button" href="/contact?service=Signage">Tell us about your space <ArrowUpRight size={18}/></Link></div><Film name="letter-study" poster="/images/letter-study.webp" label="Illuminated letter material film"/></div></section>}
    <section className="category-introduction wrap"><div className="section-heading"><p className="eyebrow">Find your format</p><h2>{print?<>A little paper. <em>A lot to say.</em></>:outdoor?<>Choose your <em>next move.</em></>:<>Made for <em>your space.</em></>}</h2><p>{print?'Choose the product, then share the size, quantity and artwork. We\u2019ll discuss the specification that fits your brief.':outdoor?'Tell us where you want to be seen, for how long and in which format. Locations, permissions and media availability are confirmed for your campaign.':'Start with how the sign should be seen\u2014from the pavement, across a room or after dark.'}</p></div><>{print?<PrintCollection items={items}/>:<ServiceIndex items={items} images grid/>}</>{outdoor&&<p className="outdoor-extra">Also in the profiles: autorickshaws, street poles, bus shelters, buses, LED screens and railway advertising. <Link href="/contact?service=Outdoor%20formats">Ask about your format \u2197</Link></p>}</section>
    {!print&&!outdoor&&<section className="daynight-section"><div className="wrap two-column"><div><p className="eyebrow">Light changes everything</p><h2>A different mood.<br/><em>The same identity.</em></h2><p>See how one storefront reads in daylight and after dark.</p></div><DayNight/></div></section>}
    {outdoor&&<section className="street-story"><div className="wrap"><div><p className="eyebrow">From the company profiles</p><h2>Along the route.<br/><em>In the everyday.</em></h2><p>A look at street poles, transit and shelter formats photographed in the SignAds profiles.</p><Link href="/work" className="text-link">Explore the work <ArrowUpRight size={18}/></Link></div><div><Film name="street-formats" poster="/images/street-poles.webp" label="Outdoor format photo montage"/><p className="editorial-media-caption">Edited photographs from the profiles</p></div></div></section>}
    <Ticker items={['Visiting cards','LED signboards','Brochures','ACP cladding','Hoardings','Dimensional letters','Flyers','Glow signs','Vehicle branding','Banners','Safety & wayfinding']} label="What SignAds makes"/>
    <CatalogueIndex products={products} active={category}/>
    <EditorialCTA service={name}/>
  </main>;
}
export function ProductPage({item,projects}:{item:Content;projects:Content[]}){
  const kind=item.category.toLowerCase();const category=item.category==='Print'?'print-products':item.category==='Outdoor'?'outdoor':'signage';const related=projects.filter(p=>p.related.includes(item.id));const media=item.images?.length?item.images:[item.image];
  return <main id="main" className={`editorial-page detail-${kind}`}><section className="detail-opening"><div className="wrap"><Link href={'/'+category} className="back-link"><ArrowLeft size={16}/> {item.category}</Link><div className="detail-title"><div><p className="eyebrow">{item.category} / {kind==='print'?'The collection':'The possibilities'}</p><h1>{item.title}</h1></div><div><p className="lead">{item.description}</p><Link href={`/contact?service=${encodeURIComponent(item.title)}`} className="button">Discuss {item.title.toLowerCase()} <ArrowUpRight size={18}/></Link></div></div><div className={`product-image-set${media.length>1?' multiple':''}`}>{media.map((name,i)=><figure className="detail-visual" key={name}><img src={imageUrl(name)} alt={productImageAlt(item,name)} width="1536" height="1024" loading={i===0?'eager':'lazy'}/><figcaption>{media.length>1?<><strong>{name==='flyers'?'Flat flyers':name==='pamphlets-product'?'Folded pamphlets':item.title}</strong><span>{productImageCaption(name)}</span></>:productImageCaption(name)}</figcaption></figure>)}</div></div></section><section className="detail-body wrap"><div className="prose"><h2>{kind==='print'?<>Make every<br/><em>detail count.</em></>:kind==='outdoor'?<>Start with<br/><em>the location.</em></>:<>The right sign.<br/><em>The right setting.</em></>}</h2>{item.body.map((p,i)=><p key={i}>{p}</p>)}</div><aside className="detail-brief"><p className="eyebrow">Your project checklist</p><ol>{item.details.map((d,i)=><li key={d}><span>0{i+1}</span>{d}</li>)}</ol><Link className="text-link" href={`/contact?service=${encodeURIComponent(item.title)}`}>Share your brief <ArrowUpRight size={17}/></Link></aside></section>{item.id==='visiting-cards'&&<section className="product-studio"><div className="wrap"><div className="studio-heading"><p className="eyebrow">Try it / Set your card</p><h2>A card is the smallest thing you hand someone.</h2><p>Put your own details on it, change the stock and turn it over. A sketch to think with, not a production proof — the final specification is confirmed in your quote.</p></div><CardStudio/></div></section>}{related.length>0&&<section className="related-inline wrap"><p className="eyebrow">See it in a space</p><div className="related-work-list">{related.slice(0,3).map(p=><Link href={hrefFor(p)} key={p.id}><img src={imageUrl(p.image)} alt="" width="200" height="160" loading="lazy"/><div><h3>{p.title}</h3><p>{p.application} ↗</p></div></Link>)}</div></section>}<EditorialCTA service={item.title} title="Make it your own."/></main>;
}
export function JournalPage({guides}:{guides:Content[]}){return <main id="main" className="editorial-page editorial-journal"><section className="editorial-heading wrap"><p className="eyebrow">The SignAds journal / Practical notes</p><h1>A little insight.<br/><em>A better starting point.</em></h1><div><p>Before the artwork, the materials or the quote—get clear on what your project needs.</p></div></section><section className="journal-list wrap">{guides.map((g,i)=><Link href={hrefFor(g)} key={g.id}><span className="journal-number">0{i+1}</span><h2>{g.title}</h2><p>{g.description}</p><ArrowUpRight/></Link>)}</section><EditorialCTA/></main>}
export function GuidePage({item}:{item:Content}){return <main id="main" className="editorial-page"><article className="article-editorial wrap"><Link href="/ideas" className="back-link"><ArrowLeft size={16}/> The journal</Link><p className="eyebrow">Planning notes / {Math.max(2,Math.ceil(item.body.join(' ').split(' ').length/180))} minute read</p><h1>{item.title}</h1><p className="article-deck">{item.description}</p><div className="article-columns"><aside><p className="eyebrow">In this guide</p><ul>{item.details.map((d,i)=><li key={d}><a href={'#note-'+i}>{d}</a></li>)}</ul><Link href="/contact" className="text-link">Talk through your brief <ArrowUpRight size={16}/></Link></aside><div>{item.body.map((p,i)=><section id={'note-'+i} className="article-paragraph" key={i}>{i>0&&<h2>{item.details[i]||'Before you send it'}</h2>}<p>{p}</p></section>)}</div></div></article><EditorialCTA/></main>}
export function SolutionsPage(_props?:{projects?:Content[]}){return <SolutionsJourney/>}
export function SolutionPage({solution:s,products,projects}:{solution:typeof solutions[number];products:Content[];projects:Content[]}){
 const related=products.filter(p=>s.services.includes(p.id));const example=projects.find(p=>p.id===s.project);
 return <main id="main" className="editorial-page"><section className="editorial-heading wrap"><p className="eyebrow">Business solutions / Your project plan</p><h1>{s.title}</h1><div><p>{s.description}</p><a href="#solution-brief" className="text-link">Start your brief <ArrowUpRight size={18}/></a></div></section><section className="solution-route wrap"><aside><p className="eyebrow">Think it through</p><p>A few details make a more useful starting point.</p><ul>{s.considerations.map(c=><li key={c}>{c}</li>)}</ul></aside><div><h2>The touchpoints,<br/><em>connected.</em></h2><ServiceIndex items={related}/>{example&&<Link href={hrefFor(example)} className="solution-example"><img src={imageUrl(example.image)} alt="" width="360" height="260" loading="lazy"/><div><p className="eyebrow">A relevant application</p><h3>{example.title}</h3><p>{example.description} ↗</p></div></Link>}</div></section><section id="solution-brief" className="quote-section"><div className="wrap quote-layout"><div><p className="eyebrow">Bring your requirements together</p><h2>Your space.<br/><em>Your starting point.</em></h2><p>Share what you’re planning. We’ll discuss the formats, materials and scope for your project.</p></div><QuoteForm service={s.title} brief={`I'm planning ${s.title.toLowerCase()}. `}/></div></section></main>;
}
// Set the Managing Director's name here and the caption fills in automatically.
// Left blank deliberately: nothing invented for a real person.
const MANAGING_DIRECTOR = 'Nitesh Telange';

export function AboutPage(){return <AboutExperience/>}
