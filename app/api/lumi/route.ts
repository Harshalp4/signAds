import { sameOrigin } from '@/lib/admin';
import { getPublishedContent } from '@/lib/store';
import { replyToLumi } from '@/lib/lumi';

export async function POST(request: Request) {
  const respond = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
  if (!sameOrigin(request)) return respond({ error: 'Please open Lumi from the SignAds website.' }, 403);
  if (Number(request.headers.get('content-length') || 0) > 8192) return respond({ error: 'Please keep your message shorter than 600 characters.' }, 413);
  try {
    const body = await request.text();
    if (body.length > 8192) return respond({ error: 'Your message is too long.' }, 413);
    const data = JSON.parse(body);
    if (typeof data.message !== 'string' || !data.message.trim() || data.message.length > 600) return respond({ error: 'Please enter a message of 1–600 characters.' }, 400);
    const path = typeof data.path === 'string' ? data.path.slice(0, 200) : '';
    const product = typeof data.product === 'string' ? data.product.slice(0, 100) : '';
    return respond(replyToLumi(data.message.trim(), path, product, await getPublishedContent()));
  } catch {
    return respond({ error: 'Lumi couldn’t load a reply. Please try again or contact the team.' }, 503);
  }
}
