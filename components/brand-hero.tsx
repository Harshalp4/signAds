'use client';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  { number: '01', title: 'Print', detail: 'Something to hold.', href: '/print-products' },
  { number: '02', title: 'Signage', detail: 'Somewhere to stand out.', href: '/signage' },
  { number: '03', title: 'Outdoor', detail: 'Everywhere to be seen.', href: '/outdoor' },
];

export function BrandHero() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const el = root.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    if (el) observer.observe(el);
    const visibility = () => { if (document.hidden) setVisible(false); else if (el) setVisible(el.getBoundingClientRect().bottom > 0); };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const still = paused || reduced || !visible;
  return <section ref={root} className={`brand-hero${still ? ' motion-still' : ''}`} aria-labelledby="brand-headline"
    onPointerMove={event => {
      if (still || event.pointerType !== 'mouse' || !root.current) return;
      const box = root.current.getBoundingClientRect();
      root.current.style.setProperty('--art-x', `${((event.clientX - box.left) / box.width - .5) * 18}px`);
      root.current.style.setProperty('--art-y', `${((event.clientY - box.top) / box.height - .5) * 12}px`);
    }}
    onPointerLeave={() => { root.current?.style.setProperty('--art-x', '0px'); root.current?.style.setProperty('--art-y', '0px'); }}>
    <div className="brand-stage wrap">
      <div className="brand-topline"><p><span className="brand-status"/> Your brand. In the real world.</p><span>Print / Signage / Outdoor</span></div>
      <div className="brand-art" aria-hidden="true"><div className="brand-art-float"><img src="/images/brand-sculpture.webp" alt="" width="1536" height="1024" fetchPriority="high"/></div></div>
      <div className="brand-copy">
        <h1 id="brand-headline"><span className="brand-title-intro">Ideas made.</span><span className="brand-title-impact">VISIBLE<span className="brand-period">.</span></span></h1>
        <p className="brand-description">From the first impression to the whole street.<br/>Print, signage and advertising that give<br className="brand-desktop-break"/> your business a physical presence.</p>
        <div className="brand-actions"><Link href="/contact" className="brand-primary">Let’s make your mark <span><ArrowUpRight size={21}/></span></Link><Link href="/work" className="brand-work">See our work <ArrowUpRight size={17}/></Link></div>
      </div>
      <div className="brand-art-note"><span className="brand-cross" aria-hidden="true">+</span><p>Paper. Metal. Light.<br/><span>Endless possibilities.</span></p></div>
      <div className="brand-stage-bottom"><a href="#explore"><ArrowDown size={16}/><span>Explore what’s possible</span></a><div><span className="brand-study-label">Material study / 001</span><button type="button" className="brand-motion-toggle" aria-label={reduced ? 'Animation disabled by your motion preference' : paused ? 'Play hero animation' : 'Pause hero animation'} aria-pressed={paused} onClick={() => setPaused(!paused)} disabled={reduced}>{still ? <Play size={14}/> : <Pause size={14}/>}<span>{reduced ? 'Motion reduced' : paused ? 'Motion paused' : 'Motion on'}</span></button></div></div>
    </div>
    <nav className="brand-service-nav wrap" aria-label="Explore SignAds services">{services.map(service => <Link key={service.number} href={service.href}><span className="brand-service-number">{service.number}</span><div><h2>{service.title}</h2><p>{service.detail}</p></div><ArrowUpRight size={27}/></Link>)}</nav>
  </section>;
}
