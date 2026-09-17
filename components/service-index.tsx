import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Content, hrefFor, imageUrl } from '@/lib/content';
import { productImageAlt } from '@/lib/product-media';

export function ServiceIndex({items,images=true}:{items:Content[];images?:boolean}){
  return <div className={`editorial-index${images?' with-thumbnails':''}`}>{items.map((item,i)=><Link href={hrefFor(item)} key={item.id}><span className="index-number">{String(i+1).padStart(2,'0')}</span>{images&&<img src={imageUrl(item.image)} alt={productImageAlt(item)} width="240" height="180" loading="lazy"/>}<div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={25}/></Link>)}</div>;
}
