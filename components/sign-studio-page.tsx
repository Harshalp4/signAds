import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {SignBuilder} from './sign-builder';
import {MATERIALS} from '@/lib/sign-options';
import {EditorialCTA} from './editorial-pages';

export function SignStudioPage() {
  return (
    <main id="main" className="editorial-page studio-page">
      <section className="studio-page-head">
        <div className="wrap">
          <p className="eyebrow">Sign studio / Build it before you brief it</p>
          <h1>See your name <em>in lights.</em></h1>
          <p className="studio-page-deck">
            Set the letterform, the material, the finish and the height, then look at it by day and after dark.
            What you end up with is a brief you can send us — not a quotation.
          </p>
        </div>
      </section>

      <section className="studio-page-build">
        <div className="wrap"><SignBuilder/></div>
      </section>

      <section className="section wrap studio-page-notes">
        <div className="section-heading">
          <p className="eyebrow">What the materials mean</p>
          <h2>Four ways to put a name on a wall.</h2>
          <p>Each behaves differently in daylight, after dark and over time. This is the shortlist we work from.</p>
        </div>
        <dl className="material-notes">
          {MATERIALS.map((m) => (
            <div key={m.id}><dt>{m.label}</dt><dd>{m.note}</dd></div>
          ))}
        </dl>
        <Link className="text-link" href="/signage">See these made, in the signage work <ArrowUpRight size={18}/></Link>
      </section>

      <EditorialCTA title="Bring the brief. We'll talk specification." service="Signage"/>
    </main>
  );
}
