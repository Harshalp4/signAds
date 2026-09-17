'use client';
import {useId, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, Moon, Sun} from 'lucide-react';

const MATERIALS = [
  {id: 'metal', label: 'Metal', full: 'Metal letters', note: 'A brushed face with real depth, lit from behind after dark.'},
  {id: 'neon', label: 'Neon', full: 'Neon glow', note: 'One continuous lit line. Quiet by day, unmistakable at night.'},
  {id: 'backlit', label: 'Backlit', full: 'Backlit acrylic', note: 'An even, readable face on a lit box. Legible from across the street.'},
] as const;

type Material = (typeof MATERIALS)[number]['id'];

const MAX = 18;
const PLACEHOLDER = 'Your Brand';

export function SignStudio() {
  const [name, setName] = useState('');
  const [material, setMaterial] = useState<Material>('neon');
  const [night, setNight] = useState(true);
  const inputId = useId();
  const groupId = useId();

  const shown = name.trim() || PLACEHOLDER;
  const active = MATERIALS.find((m) => m.id === material)!;
  const light = night ? 'after dark' : 'in daylight';

  // The typed name travels into the enquiry so the conversation starts where
  // the visitor left off, rather than on an empty form.
  const enquiry = `/contact?service=${encodeURIComponent(
    material === 'backlit' ? 'Glow signs' : material === 'metal' ? 'Dimensional letters' : 'LED signboards',
  )}&brief=${encodeURIComponent(`I tried "${shown}" as ${active.full.toLowerCase()} on the SignAds site and would like to discuss it for my own sign.`)}`;

  return (
    <div className="sign-studio">
      {/* The lit sign leads; the controls sit under it as one bar. */}
      <div
        className="studio-stage"
        data-material={material}
        data-night={night || undefined}
        role="img"
        aria-label={`Preview: the name ${shown} shown as ${active.full.toLowerCase()} ${light}.`}
      >
        <span className="studio-sign" aria-hidden="true">{shown}</span>
      </div>

      <div className="studio-bar">
        <div className="studio-cell studio-cell-name">
          <label htmlFor={inputId}>Your brand name</label>
          <input
            id={inputId}
            type="text"
            value={name}
            maxLength={MAX}
            placeholder={PLACEHOLDER}
            autoComplete="organization"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Native radios rather than buttons: a single-choice group keeps
            arrow-key navigation and the correct role for free. */}
        <fieldset className="studio-cell studio-cell-material">
          <legend>Material</legend>
          <div className="studio-segments">
            {MATERIALS.map((m) => (
              <label key={m.id} className={material === m.id ? 'is-selected' : undefined} title={m.full}>
                <input
                  type="radio"
                  name={groupId}
                  value={m.id}
                  checked={material === m.id}
                  onChange={() => setMaterial(m.id)}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="studio-cell studio-cell-light">
          <span className="studio-cell-label" id={`${groupId}-light`}>Light</span>
          <div className="studio-segments" role="group" aria-labelledby={`${groupId}-light`}>
            <button type="button" aria-pressed={!night} onClick={() => setNight(false)}>
              <Sun size={14} aria-hidden="true"/>Day
            </button>
            <button type="button" aria-pressed={night} onClick={() => setNight(true)}>
              <Moon size={14} aria-hidden="true"/>Night
            </button>
          </div>
        </div>

        <Link className="button studio-cta" href={enquiry}>
          Enquire <ArrowUpRight size={17} aria-hidden="true"/>
        </Link>
      </div>

      <p className="studio-footnote">
        <span>{active.note}</span>
        <span>A preview, not a production drawing.</span>
      </p>
    </div>
  );
}
