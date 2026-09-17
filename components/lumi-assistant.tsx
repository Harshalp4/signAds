'use client';

import { type CSSProperties, type FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Pause, Play, Send, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QuoteForm } from '@/components/quote-form';
import { lumiGreeting, type LumiReply } from '@/lib/lumi';

type Emotion = 'calm' | 'curious' | 'welcoming' | 'attentive' | 'thinking' | 'delighted';
type Message = LumiReply & { id: number; role: 'lumi' | 'visitor' };
const poses: Record<Emotion, number> = { calm: 0, curious: 1, welcoming: 2, attentive: 3, thinking: 4, delighted: 5 };
const starters = ['Print materials', 'Signage', 'Get a quote'];

function Mascot({ emotion }: { emotion: Emotion }) {
  return <span aria-hidden="true" className={`lumi-art lumi-${emotion}`} style={{ '--lumi-pose': poses[emotion] } as CSSProperties} />;
}

export function LumiAssistant() {
  const path = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'quote'>('chat');
  const [emotion, setEmotion] = useState<Emotion>('calm');
  const [motion, setMotion] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [product, setProduct] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [retryText, setRetryText] = useState('');
  const [saved, setSaved] = useState(false);
  const [quoteDraft, setQuoteDraft] = useState<{ service: string; brief: string } | null>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const emotionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequence = useRef(0);
  const sending = useRef(false);
  const oldPath = useRef(path);

  function react(next: Emotion, settle: Emotion = 'calm', duration = 1700) {
    if (emotionTimer.current) clearTimeout(emotionTimer.current);
    setEmotion(next);
    emotionTimer.current = setTimeout(() => setEmotion(settle), duration);
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    try { setMotion(localStorage.getItem('signads-lumi-motion') !== 'off'); } catch { /* Motion preference is optional. */ }
    return () => { media.removeEventListener('change', update); controller.current?.abort(); if (emotionTimer.current) clearTimeout(emotionTimer.current); };
  }, []);

  useEffect(() => {
    if (oldPath.current === path) return;
    oldPath.current = path;
    controller.current?.abort();
    controller.current = null;
    sending.current = false;
    if (emotionTimer.current) clearTimeout(emotionTimer.current);
    setOpen(false); setBusy(false); setMode('chat'); setMessages([]); setProduct(''); setInput(''); setError(''); setRetryText(''); setSaved(false); setQuoteDraft(null); setEmotion('calm');
  }, [path]);

  useEffect(() => {
    transcript.current?.scrollTo({ top: transcript.current.scrollHeight, behavior: 'instant' });
  }, [messages, busy, mode, open]);

  const animated = motion && !reduced;
  const reply = [...messages].reverse().find(m => m.role === 'lumi');
  const suggestions = reply?.suggestions || starters;
  const serviceId = product || (path.startsWith('/services/') ? path.split('/').pop() || '' : '');
  const service = ({ 'visiting-cards': 'Visiting cards', 'flyers-pamphlets': 'Flyers & pamphlets', brochures: 'Brochures', banners: 'Banners', 'led-signboards': 'LED signboards', 'acp-cladding': 'ACP cladding', 'dimensional-letters': 'Dimensional letters', 'glow-signs': 'Glow signs', 'vehicle-branding': 'Vehicle branding', hoardings: 'Hoardings', wayfinding: 'Safety & wayfinding' } as Record<string, string>)[serviceId] || '';
  const brief = messages.filter(m => m.role === 'visitor').map(m => m.text).join('\n').slice(-4500);

  function changeOpen(value: boolean) {
    setOpen(value);
    if (value) {
      if (!messages.length) setMessages([{ id: ++sequence.current, role: 'lumi', text: lumiGreeting(path), suggestions: starters }]);
      if (busy) setEmotion('thinking');
      else react(saved ? 'delighted' : 'welcoming', 'attentive');
    } else {
      if (!busy) react('calm');
      setMode('chat'); setQuoteDraft(null);
    }
  }

  async function send(text: string, retry = false) {
    const message = text.trim();
    if (!message || sending.current) return;
    sending.current = true;
    setBusy(true); setError(''); setRetryText(''); setInput('');
    if (emotionTimer.current) clearTimeout(emotionTimer.current);
    setEmotion('thinking');
    if (!retry) setMessages(previous => [...previous.slice(-29), { id: ++sequence.current, role: 'visitor', text: message, suggestions: [] }]);
    const request = new AbortController();
    controller.current = request;
    const timeout = setTimeout(() => request.abort(), 12000);
    try {
      const response = await fetch('/api/lumi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, path, product }), signal: request.signal });
      const data = await response.json() as LumiReply & { error?: string };
      if (!response.ok || !data.text) throw new Error(data.error || 'Lumi couldn’t load a reply. Please try again.');
      if (controller.current !== request) return;
      if (data.product) setProduct(data.product);
      setMessages(previous => [...previous, { ...data, id: ++sequence.current, role: 'lumi' }]);
      react('welcoming', 'attentive', 1200);
    } catch (cause) {
      if (controller.current !== request) return;
      setError(cause instanceof Error && cause.name !== 'AbortError' ? cause.message : 'Lumi is taking a little longer. Please retry or contact the team.');
      setRetryText(message); setEmotion('curious');
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) { setBusy(false); sending.current = false; controller.current = null; }
    }
  }

  function showQuote() { if (!quoteDraft) setQuoteDraft({ service, brief }); setMode('quote'); react(saved ? 'delighted' : 'welcoming', 'attentive'); }
  function submit(event: FormEvent) { event.preventDefault(); void send(input); }
  if (/^\/(admin|signin|signout)(\/|-|$)/.test(path)) return null;

  return <div className="lumi-root" data-motion={animated ? 'on' : 'off'}>
    <Dialog open={open} onOpenChange={changeOpen} modal={false}>
      <DialogTrigger asChild>
        <button className={`lumi-launcher ${open ? 'lumi-launcher-open' : ''}`} aria-label={open ? 'Close Lumi product guide' : 'Chat with Lumi, the SignAds product guide'} onPointerEnter={() => { if (!open && !busy) react('curious'); }} onFocus={() => { if (!open && !busy) react('curious'); }}>
          {open ? <X size={22} aria-hidden="true" /> : <><Mascot emotion={emotion} /><span className="lumi-launcher-label">Ask Lumi <span aria-hidden="true">↗</span></span></>}
        </button>
      </DialogTrigger>
      <DialogContent className="lumi-panel" data-motion={animated ? 'on' : 'off'} showCloseButton={false} onInteractOutside={event => event.preventDefault()} onOpenAutoFocus={event => { event.preventDefault(); composer.current?.focus({ preventScroll: true }); }}>
        <header className="lumi-header">
          <Mascot emotion={emotion} />
          <div><DialogTitle className="lumi-title">Lumi</DialogTitle><DialogDescription className="lumi-description">Your SignAds product guide</DialogDescription></div>
          <button className="lumi-icon-button" type="button" onClick={() => { setMotion(!motion); try { localStorage.setItem('signads-lumi-motion', motion ? 'off' : 'on'); } catch { /* Preference remains active for this visit. */ } }} disabled={reduced} aria-label={reduced ? 'Motion disabled by your device preference' : motion ? 'Pause Lumi animations' : 'Enable Lumi animations'} title={reduced ? 'Reduced motion enabled' : motion ? 'Pause animations' : 'Enable animations'}>{animated ? <Pause size={17} /> : <Play size={17} />}</button>
          <button className="lumi-icon-button" type="button" aria-label="Close Lumi" onClick={() => changeOpen(false)}><X size={20} /></button>
        </header>
        <div className="lumi-chat-body" hidden={mode !== 'chat'}>
          <div className="lumi-conversation" ref={transcript} role="log" aria-label="Conversation with Lumi" aria-live="polite" aria-relevant="additions text">
            {messages.map(message => <div key={message.id} className={`lumi-message lumi-message-${message.role}`}><span className="lumi-speaker">{message.role === 'visitor' ? 'You' : 'Lumi'}</span><p>{message.text}</p>{message.link && <Link className="lumi-message-link" href={message.link.href} target={message.link.href.startsWith('https:') ? '_blank' : undefined} rel={message.link.href.startsWith('https:') ? 'noreferrer' : undefined}>{message.link.label}<ArrowUpRight size={15} /></Link>}{message.quote && <button className="lumi-primary" onClick={showQuote}>Prepare my enquiry <ArrowUpRight size={16} /></button>}</div>)}
            {busy && <div className="lumi-thinking" role="status"><span /><span /><span /><span className="sr-only">Lumi is preparing a reply</span></div>}
          </div>
          <div className="lumi-actions"><div className="lumi-suggestions" aria-label="Suggested questions">{suggestions.map(suggestion => <button key={suggestion} disabled={busy} onClick={() => void send(suggestion)}>{suggestion}</button>)}</div><button className="lumi-quote-link" onClick={showQuote}>Prepare a quote enquiry <ArrowUpRight size={16} /></button></div>
          {error && <div className="lumi-error" role="alert">{error} <button onClick={() => void send(retryText, true)} disabled={busy}>Retry</button><a href="tel:+919152900157">Call SignAds</a></div>}
          <form className="lumi-composer" onSubmit={submit}><label className="sr-only" htmlFor="lumi-message">Ask about print or signage</label><input id="lumi-message" ref={composer} value={input} maxLength={600} onChange={event => { setInput(event.target.value); if (!busy) { if (emotionTimer.current) clearTimeout(emotionTimer.current); setEmotion(event.target.value ? 'attentive' : 'calm'); } }} placeholder="Ask about print or signage…" autoComplete="off" enterKeyHint="send" readOnly={busy} aria-busy={busy}/><button type="submit" aria-label="Send message" disabled={busy || !input.trim()}><Send size={19} /></button></form>
          <p className="lumi-footnote">Product guidance · Prices and dates confirmed by the team.</p>
        </div>
        <div className="lumi-quote-scroll" hidden={mode !== 'quote'}><button className="lumi-back" onClick={() => { setMode('chat'); react('attentive'); }}><ArrowLeft size={16} /> Back to conversation</button>{quoteDraft && <QuoteForm service={quoteDraft.service} brief={quoteDraft.brief} onSaved={id => { setSaved(true); react('delighted', 'delighted', 1800); setMessages(previous => [...previous, { id: ++sequence.current, role: 'lumi', text: `Your enquiry is saved in the SignAds team inbox. Your reference is ${id}. The team will review the details with you.`, suggestions: ['Talk to the team'], link: { label: 'Continue on WhatsApp', href: `https://wa.me/919152900157?text=${encodeURIComponent('Hello SignAds, I would like to discuss enquiry ' + id)}` } }]); }} />}</div>
      </DialogContent>
    </Dialog>
  </div>;
}
