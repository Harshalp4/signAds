import type {MetadataRoute} from 'next';
import {getPublishedContent} from '@/lib/store';
import {hrefFor,solutions} from '@/lib/content';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const origin='https://signads-brand-visibility.harshalp5.chatgpt.site';const staticPaths=['/','/print-products','/signage','/outdoor','/work','/solutions','/enterprise','/ideas','/about','/contact','/privacy'];return [...staticPaths,...solutions.map(s=>'/solutions/'+s.id),...(await getPublishedContent()).map(hrefFor)].map(p=>({url:origin+p,changeFrequency:'monthly' as const,priority:p==='/'?1:0.7}))}
