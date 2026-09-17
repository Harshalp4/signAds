import {getChatGPTUser} from '@/app/chatgpt-auth';
import {env} from 'cloudflare:workers';
export async function adminUser(){const user=await getChatGPTUser();if(!user)return null;const configured=(env as unknown as Record<string,string>).ADMIN_EMAILS||'signadsindia@gmail.com';const emails=configured.toLowerCase().split(',').map(x=>x.trim());if(import.meta.env.DEV&&user.email==='seedy@sites.test')return user;return emails.includes(user.email.toLowerCase())?user:null}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
