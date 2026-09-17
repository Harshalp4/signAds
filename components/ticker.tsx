'use client';
import {useState} from 'react';
import {Pause, Play} from 'lucide-react';

// A running band of what the company actually makes. It fills a full-width
// strip that was otherwise dead space, and gives the page a pulse between
// two static sections.
export function Ticker({
  items,
  duration = 42,
  onDark = false,
  label = 'What SignAds makes',
}: {
  items: string[];
  duration?: number;
  onDark?: boolean;
  label?: string;
}) {
  const [paused, setPaused] = useState(false);

  const group = (hidden: boolean) => (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {items.map((t) => <span className="ticker-item" key={t}>{t}</span>)}
    </div>
  );

  return (
    <div
      className={onDark ? 'ticker on-dark' : 'ticker'}
      data-paused={paused || undefined}
      style={{['--ticker-duration' as string]: `${duration}s`}}
    >
      {/* The first group is the readable list; the second only exists to make
          the loop seamless, so it is hidden from assistive technology. */}
      <div className="ticker-track" role="list" aria-label={label}>
        {group(false)}
        {group(true)}
      </div>
      <button
        type="button"
        className="ticker-pause"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Resume the ${label} ticker` : `Pause the ${label} ticker`}
      >
        {paused ? <Play size={12} aria-hidden="true"/> : <Pause size={12} aria-hidden="true"/>}
      </button>
    </div>
  );
}
