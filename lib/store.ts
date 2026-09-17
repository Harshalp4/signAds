import {env} from 'cloudflare:workers';
import {baseContent,Content} from './content';
import catalog from './asset-catalog.json';
export function db(){if(!env.DB)throw new Error('Data service unavailable');return env.DB}
export function bucket(){if(!env.BUCKET)throw new Error('File service unavailable');return env.BUCKET}
export async function getContent(){let overrides:Content[]=[];try{const r=await db().prepare('SELECT data FROM content').all<{data:string}>();overrides=r.results.map(x=>JSON.parse(x.data));}catch(e){console.error('Content store unavailable; using source catalogue',String(e))}const map=new Map(baseContent.map(c=>[c.id,c]));for(const c of overrides)map.set(c.id,c);return [...map.values()]}
export async function getPublishedContent(){const all=await getContent();return Promise.all(all.filter(x=>x.status==='published'&&(x.kind!=='project'||x.origin!=='ai-generated')).map(async x=>{let approved=false;if(x.clientApproved&&x.rightsStatus==='approved'&&x.assetId){try{const a=await getAsset(x.assetId);approved=a?.rightsStatus==='approved'&&a?.clientApproved===true}catch{}}return {...x,clientName:approved?x.clientName:undefined}}))}
export async function getAssets(){const map=new Map<string,Record<string,unknown>>(catalog.map(a=>[a.id,a]));const r=await db().prepare('SELECT data FROM assets').all<{data:string}>();for(const row of r.results){const a=JSON.parse(row.data);map.set(a.id,a)}return [...map.values()]}
export async function getAsset(id:string){const row=await db().prepare('SELECT data FROM assets WHERE id = ?').bind(id).first<{data:string}>();return row?JSON.parse(row.data):catalog.find(a=>a.id===id)}
