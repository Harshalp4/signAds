import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Content, hrefFor, imageUrl } from '@/lib/content';
import { productImageAlt } from '@/lib/product-media';
import { dimensionsFor } from '@/lib/image-dimensions';

// `grid` lays the catalogue out across the full column width as cards.
// The default list keeps the narrow, text-led layout used inside sidebars.
export function ServiceIndex({items,images=true,grid=false}:{items:Content[];images?:boolean;grid?:boolean}){
  const sizes = grid ? '(max-width:560px) 100vw, (max-width:1000px) 50vw, 31vw' : '150px';
  return <div className={`editorial-index${images?' with-thumbnails':''}${grid?' catalogue-grid stagger':''}`}>
    {items.map((item,i)=>{
      const [w,h]=dimensionsFor(item.image);
      return <Link href={hrefFor(item)} key={item.id} style={{['--i' as string]:i}}>
        <span className="index-number">{String(i+1).padStart(2,'0')}</span>
        {images&&<img src={imageUrl(item.image)} alt={productImageAlt(item)} width={w} height={h} sizes={sizes} loading="lazy" decoding="async"/>}
        <div><h3>{item.title}</h3><p>{item.description}</p></div>
        <ArrowUpRight size={25}/>
      </Link>;
    })}
  </div>;
}
