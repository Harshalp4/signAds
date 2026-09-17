'use client';
import {useId, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, Moon, Sun} from 'lucide-react';
import {
  FINISHES, HEIGHTS, LETTERFORMS, MATERIALS, SERVICE_FOR, SURFACES,
  type Finish, type Height, type Letterform, type Material, type Surface,
} from '@/lib/sign-options';

const MAX = 22;
const PLACEHOLDER = 'Your Brand';

// Each control group is its own fieldset with a real legend, and every input
// is a native radio — so the whole builder is keyboard-operable and reads
// correctly without any custom ARIA.
function Group<T extends string>({
  legend, options, value, onChange, name, columns,
}: {
  legend: string;
  options: readonly {id: T; label: string; swatch?: string}[];
  value: T;
  onChange: (v: T) => void;
  name: string;
  columns?: boolean;
}) {
  return (
    <fieldset className={columns ? 'build-group is-columns' : 'build-group'}>
      <legend>{legend}</legend>
      <div className="build-options">
        {options.map((o) => (
          <label key={o.id} className={value === o.id ? 'is-selected' : undefined}>
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)}/>
            {o.swatch && <i style={{background: o.swatch}} aria-hidden="true"/>}
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SignBuilder() {
  const [name, setName] = useState('');
  const [letterform, setLetterform] = useState<Letterform>('block');
  const [material, setMaterial] = useState<Material>('neon');
  const [finish, setFinish] = useState<Finish>('warm');
  const [height, setHeight] = useState<Height>('300');
  const [surface, setSurface] = useState<Surface>('brick');
  const [night, setNight] = useState(true);
  const inputId = useId();
  const uid = useId();

  const shown = name.trim() || PLACEHOLDER;
  const form = LETTERFORMS.find((f) => f.id === letterform)!;
  const mat = MATERIALS.find((m) => m.id === material)!;
  const fin = FINISHES.find((f) => f.id === finish)!;
  const hgt = HEIGHTS.find((h) => h.id === height)!;
  const srf = SURFACES.find((s) => s.id === surface)!;

  const spec = [
    ['Name', shown],
    ['Letterform', form.label],
    ['Material', mat.label],
    ['Finish', fin.label],
    ['Letter height', hgt.label],
    ['Mounting surface', srf.label],
  ] as const;

  const brief =
    `Sign studio brief\n` +
    spec.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nPlease confirm the specification, fixing method and installation scope for my site.`;

  const enquiry = `/contact?service=${encodeURIComponent(SERVICE_FOR[material])}&brief=${encodeURIComponent(brief)}`;

  return (
    <div className="sign-builder">
      <div className="build-stage-wrap">
        <div
          className="build-stage"
          data-material={material}
          data-finish={finish}
          data-surface={surface}
          data-night={night || undefined}
          role="img"
          aria-label={`Preview: ${shown} in ${form.label.toLowerCase()} letters, ${mat.label.toLowerCase()}, ${fin.label.toLowerCase()}, ${hgt.label} tall on ${srf.label.toLowerCase()}, ${night ? 'after dark' : 'in daylight'}.`}
        >
          <span
            className="build-sign"
            aria-hidden="true"
            style={{
              fontFamily: form.stack,
              fontWeight: form.weight,
              letterSpacing: form.tracking,
              ['--sign-scale' as string]: {150: '.62', 300: '1', 450: '1.3', 600: '1.6'}[Number(height)],
            }}
          >
            {shown}
          </span>
        </div>

        <div className="build-stage-bar">
          <p className="build-caption">{mat.note}</p>
          <div className="build-light" role="group" aria-label="Lighting">
            <button type="button" aria-pressed={!night} onClick={() => setNight(false)}>
              <Sun size={14} aria-hidden="true"/>Day
            </button>
            <button type="button" aria-pressed={night} onClick={() => setNight(true)}>
              <Moon size={14} aria-hidden="true"/>Night
            </button>
          </div>
        </div>
      </div>

      <div className="build-panel">
        <div className="build-group">
          <label className="build-name-label" htmlFor={inputId}>Your brand name</label>
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

        <Group legend="Letterform" name={`${uid}-form`} options={LETTERFORMS} value={letterform} onChange={setLetterform}/>
        <Group legend="Material" name={`${uid}-mat`} options={MATERIALS} value={material} onChange={setMaterial} columns/>
        <Group legend="Finish" name={`${uid}-fin`} options={FINISHES} value={finish} onChange={setFinish}/>
        <Group legend="Letter height" name={`${uid}-hgt`} options={HEIGHTS} value={height} onChange={setHeight}/>
        <Group legend="Mounting surface" name={`${uid}-srf`} options={SURFACES} value={surface} onChange={setSurface}/>

        {/* The point of the whole page: the choices become a brief you can send. */}
        <div className="build-brief">
          <h3>Your brief so far</h3>
          <dl>
            {spec.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="build-note">{hgt.note} A preview, not a production drawing — the specification, fixing method and installation scope are confirmed for your site.</p>
          <Link className="button build-cta" href={enquiry}>
            Send this brief <ArrowUpRight size={18} aria-hidden="true"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
