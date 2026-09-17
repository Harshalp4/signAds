import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Content,hrefFor,imageUrl} from '@/lib/content';
import {productImageAlt} from '@/lib/product-media';
import {dimensionsFor} from '@/lib/image-dimensions';
export function ContentCard({item,sizes='(max-width:500px) 100vw, (max-width:900px) 50vw, 32vw'}:{item:Content;sizes?:string}){const [w,h]=dimensionsFor(item.image);return <Link className={`content-card ${item.kind}`} href={hrefFor(item)}><div className="card-image"><img src={imageUrl(item.image)} alt={item.kind==='product'?productImageAlt(item):item.description} width={w} height={h} sizes={sizes} loading="lazy" decoding="async"/><span className="round-arrow"><ArrowUpRight size={23}/></span></div><div className="card-meta"><span>{item.category}</span>{item.industry&&<span>{item.industry}</span>}</div><h3>{item.title}</h3><p>{item.description}</p></Link>}
export function QuoteBand({title='Let’s make your brand impossible to miss.',service=''}:{title?:string;service?:string}){return <section className="quote-band"><div className="wrap"><p className="eyebrow">The next thing we make could be yours.</p><h2>{title}</h2><Link href={`/contact${service?'?service='+encodeURIComponent(service):''}`} className="button dark">Tell us about your project <ArrowUpRight size={20}/></Link></div></section>}
