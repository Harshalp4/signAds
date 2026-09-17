'use client';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, Pause, Play} from 'lucide-react';

const FORMATS = [
  {
    n: '01', title: 'Print & paper', href: '/print-products',
    items: ['Visiting cards', 'Flyers', 'Brochures', 'Banners'],
    line: 'Something to hold, hand over or leave behind.',
    image: 'print-study', video: 'print-study',
    alt: 'Printed sheets and folded stock photographed on a work surface',
  },
  {
    n: '02', title: 'Signage & fabrication', href: '/signage',
    items: ['LED signs', 'ACP cladding', 'Metal & PU letters', 'Glow signs'],
    line: 'Lettering, light and surfaces, built for a place.',
    image: 'letter-study', video: 'letter-study',
    alt: 'Dimensional letters catching light against a dark surface',
  },
  {
    n: '03', title: 'Outdoor & transit', href: '/outdoor',
    items: ['Hoardings', 'Vehicles', 'Bus shelters', 'Outdoor media'],
    line: 'Formats that meet people out on the route.',
    image: 'street-poles', video: 'street-formats',
    alt: 'Street pole and roadside advertising formats along a route',
  },
  {
    n: '04', title: 'Spaces & wayfinding', href: '/services/wayfinding',
    items: ['Reception branding', 'Directional signs', 'Safety signage'],
    line: 'Helping people read a space and find their way.',
    image: 'wayfinding', video: null,
    alt: 'Bilingual directional sign panels with arrows',
  },
] as const;

export function FormatExplorer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const current = FORMATS[active];

  // Honour reduced motion, and never leave a film running offscreen or in a
  // hidden tab — the same rules the other films on the site follow.
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionOk(!media.matches);
    sync();
    media.addEventListener('change', sync);

    const stop = () => {videoRef.current?.pause(); setPlaying(false);};
    const onHide = () => {if (document.hidden) stop();};
    document.addEventListener('visibilitychange', onHide);

    // Lazy panel images are never "visible" until they are switched to, so the
    // first hover on each row waited on a fetch. Warm all four once the section
    // is reached instead of loading them with the page.
    let warmed = false;
    const warm = () => {
      if (warmed) return;
      warmed = true;
      FORMATS.forEach((f) => {const img = new Image(); img.src = `/images/${f.image}.webp`;});
    };

    const el = panelRef.current;
    const io = el
      ? new IntersectionObserver((e) => {if (e[0].isIntersecting) warm(); else stop();}, {threshold: 0.2})
      : null;
    if (el && io) io.observe(el);

    return () => {
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', onHide);
      io?.disconnect();
    };
  }, []);

  const select = (i: number) => {
    if (i === active) return;
    videoRef.current?.pause();
    setPlaying(false);
    setActive(i);
  };

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {el.pause(); setPlaying(false);}
    else el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <div className="format-explorer">
      <ul className="format-rows">
        {FORMATS.map((f, i) => (
          <li key={f.n} className={i === active ? 'is-active' : undefined}>
            <Link
              href={f.href}
              className="format-row"
              onMouseEnter={() => select(i)}
              onFocus={() => select(i)}
              aria-describedby={`format-items-${f.n}`}
            >
              <span className="format-number">{f.n}</span>
              <span className="format-body">
                <span className="format-title">{f.title}</span>
                <span className="format-line">{f.line}</span>
                <span className="format-items" id={`format-items-${f.n}`}>
                  {f.items.join(' · ')}
                </span>
              </span>
              <ArrowUpRight className="format-arrow" size={22} aria-hidden="true"/>
            </Link>
            {/* Each row carries its own picture on narrow screens, where there
                is no side panel and hover is not available. */}
            <Link href={f.href} className="format-inline-media" tabIndex={-1} aria-hidden="true">
              <img src={`/images/${f.image}.webp`} alt="" width="800" height="533" loading="lazy" decoding="async"/>
            </Link>
          </li>
        ))}
      </ul>

      <div className="format-panel" ref={panelRef} aria-hidden="true">
        <div className="format-stage">
          {FORMATS.map((f, i) => (
            <img
              key={f.n}
              className={i === active ? 'is-shown' : undefined}
              src={`/images/${f.image}.webp`}
              alt=""
              width="800"
              height="533"
              loading="lazy"
              decoding="async"
            />
          ))}
          {current.video && (
            <video
              key={current.video}
              ref={videoRef}
              className={playing ? 'is-shown' : undefined}
              muted
              loop
              playsInline
              preload="none"
              poster={`/images/${current.image}.webp`}
            >
              <source src={`/videos/${current.video}.mp4`} type="video/mp4"/>
            </video>
          )}
        </div>
        <div className="format-panel-foot">
          <span>{current.title}</span>
          {current.video && motionOk && (
            <button type="button" onClick={toggle} aria-label={playing ? `Pause the ${current.title} film` : `Play the ${current.title} film`}>
              {playing ? <Pause size={14} aria-hidden="true"/> : <Play size={14} aria-hidden="true"/>}
              {playing ? 'Pause' : 'Play film'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
