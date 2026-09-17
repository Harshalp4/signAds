'use client';
import {useId, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, RotateCw} from 'lucide-react';

const STOCKS = [
  {id: 'ivory', label: 'Ivory uncoated', note: 'A warm, textured stock. Ink sinks slightly and edges stay soft.'},
  {id: 'white', label: 'Bright white', note: 'A clean, high-contrast face. Colours stay close to the artwork.'},
  {id: 'orange', label: 'Colour throughout', note: 'A saturated stock that keeps its colour on the cut edge.'},
] as const;

type Stock = (typeof STOCKS)[number]['id'];

const FIELDS = [
  {key: 'name', label: 'Name', placeholder: 'Your name', max: 24, autoComplete: 'name'},
  {key: 'company', label: 'Company', placeholder: 'Your company', max: 22, autoComplete: 'organization'},
  {key: 'contact', label: 'Phone or email', placeholder: '+91 00000 00000', max: 30, autoComplete: 'tel'},
] as const;

export function CardStudio() {
  const [values, setValues] = useState({name: '', company: '', contact: ''});
  const [stock, setStock] = useState<Stock>('ivory');
  const [back, setBack] = useState(false);
  const groupId = useId();
  const baseId = useId();

  const name = values.name.trim() || 'Your Name';
  const company = values.company.trim() || 'Your Company';
  const contact = values.contact.trim() || '+91 00000 00000';
  const active = STOCKS.find((s) => s.id === stock)!;
  const face = back ? 'back' : 'front';

  const enquiry = `/contact?service=${encodeURIComponent('Visiting cards')}&brief=${encodeURIComponent(
    `Visiting cards on ${active.label.toLowerCase()}. Card details to set: ${name} / ${company} / ${contact}. Please confirm quantity, finished size and finish options.`,
  )}`;

  return (
    <div className="card-studio">
      <div className="card-studio-controls">
        {FIELDS.map((f) => (
          <label key={f.key} className="studio-field" htmlFor={`${baseId}-${f.key}`}>
            {f.label}
            <input
              id={`${baseId}-${f.key}`}
              type="text"
              value={values[f.key]}
              maxLength={f.max}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              onChange={(e) => setValues((v) => ({...v, [f.key]: e.target.value}))}
            />
          </label>
        ))}

        <fieldset className="studio-materials" aria-describedby={`${groupId}-note`}>
          <legend>Choose a stock</legend>
          {STOCKS.map((s) => (
            <label key={s.id} className={stock === s.id ? 'is-selected' : undefined}>
              <input
                type="radio"
                name={groupId}
                value={s.id}
                checked={stock === s.id}
                onChange={() => setStock(s.id)}
              />
              <span>{s.label}</span>
            </label>
          ))}
        </fieldset>
        <p className="studio-note" id={`${groupId}-note`}>{active.note}</p>
      </div>

      <div className="card-studio-preview">
        <div className="card-scene">
          <div
            className="card-object"
            data-stock={stock}
            data-face={face}
            role="img"
            aria-label={`Preview: a visiting card on ${active.label.toLowerCase()}, ${back ? `back showing ${name} and ${contact}` : `front showing ${company}`}.`}
          >
            <div className="card-face card-front" aria-hidden="true">
              <span className="card-mark">{company}</span>
              <span className="card-rule"/>
              <span className="card-tag">Advertising · Printing · Signages</span>
            </div>
            <div className="card-face card-back" aria-hidden="true">
              <span className="card-name">{name}</span>
              <span className="card-contact">{contact}</span>
            </div>
          </div>
        </div>

        <div className="studio-toolbar">
          <span className="studio-caption">90 × 54 mm, shown at approximate scale.</span>
          <button type="button" className="card-flip" onClick={() => setBack((b) => !b)} aria-pressed={back}>
            <RotateCw size={15} aria-hidden="true"/>
            {back ? 'Show the front' : 'Show the back'}
          </button>
        </div>

        <Link className="button studio-cta" href={enquiry}>
          Enquire about these cards <ArrowUpRight size={18} aria-hidden="true"/>
        </Link>
      </div>
    </div>
  );
}
