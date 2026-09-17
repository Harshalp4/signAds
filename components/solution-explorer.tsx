'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Content, imageUrl, solutions} from '@/lib/content';
import {dimensionsFor} from '@/lib/image-dimensions';

// The directory was eight rows of text with the right half of every row empty.
// Each setting now shows the photograph it belongs to, driven by hover, focus
// or — on narrow screens, where neither exists — an inline picture per row.
export function SolutionExplorer({projects}: {projects: Content[]}) {
  const [active, setActive] = useState(0);

  const shotFor = (id: string) =>
    projects.find((p) => p.id === id)?.image ?? 'hero-signage';

  const current = solutions[active];
  const currentShot = shotFor(current.project);
  const [cw, ch] = dimensionsFor(currentShot);

  return (
    <div className="solution-explorer wrap">
      <ol className="solution-rows">
        {solutions.map((s, i) => {
          const shot = shotFor(s.project);
          const [w, h] = dimensionsFor(shot);
          return (
            <li key={s.id} className={i === active ? 'is-active' : undefined}>
              <Link
                href={`/solutions/${s.id}`}
                className="solution-row"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="solution-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="solution-body">
                  <span className="solution-title">{s.title}</span>
                  <span className="solution-desc">{s.description}</span>
                </span>
                <ArrowUpRight className="solution-arrow" size={20} aria-hidden="true"/>
              </Link>
              <Link href={`/solutions/${s.id}`} className="solution-inline-media" tabIndex={-1} aria-hidden="true">
                <img src={imageUrl(shot)} alt="" width={w} height={h} sizes="100vw" loading="lazy" decoding="async"/>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="solution-panel" aria-hidden="true">
        <div className="solution-stage">
          <img
            key={currentShot}
            src={imageUrl(currentShot)}
            alt=""
            width={cw}
            height={ch}
            sizes="42vw"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="solution-panel-foot">
          <span>{current.title}</span>
          <span>{current.services.length} services in this plan</span>
        </p>
      </div>
    </div>
  );
}
