'use client';
import {useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {clientIndex, clientCount} from '@/lib/clients';

// Every one of these names was made into a sign, so the wall shows them as
// signs rather than as a list. Unlit by day; the toggle lights the whole wall.
// Hover lights one, but it is an enhancement — the toggle is the real control,
// which is what makes this work on touch and by keyboard.
const MATERIALS = ['metal', 'neon', 'backlit'] as const;

const signs = clientIndex.flatMap((g) =>
  g.names.map((name) => ({name, sector: g.sector})),
);

export function NameWall() {
  const [night, setNight] = useState(false);

  return (
    <section className="name-wall" data-night={night || undefined}>
      <div className="wrap">
        <div className="wall-head">
          <div className="section-heading">
            <p className="eyebrow">Names on the work</p>
            <h2>Every one of these was a sign.</h2>
            <p>{clientCount} businesses whose signage appears in the SignAds company profile. Turn the lights on.</p>
          </div>
          <div className="wall-light" role="group" aria-label="Lighting">
            <button type="button" aria-pressed={!night} onClick={() => setNight(false)}>
              <Sun size={14} aria-hidden="true"/>Day
            </button>
            <button type="button" aria-pressed={night} onClick={() => setNight(true)}>
              <Moon size={14} aria-hidden="true"/>Night
            </button>
          </div>
        </div>

        <ul className="wall-signs">
          {signs.map((s, i) => (
            <li key={s.name} data-material={MATERIALS[i % MATERIALS.length]}>
              <span className="wall-name">{s.name}</span>
              <span className="wall-sector">{s.sector}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
