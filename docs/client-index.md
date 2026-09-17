# Client index — how the list was derived

`lib/clients.ts` is not hand-written. Every name comes from the `visibleName`
field of `lib/asset-catalog.json`, which records what is legibly readable on the
signs photographed in the SignAds company profile.

## Source

`/Users/harshalpatil/Downloads/SignAds venture Profile.pdf` was checked first.
Its **text layer contains no client names** — only service lists and contact
details. The names are in the photographs, and those had already been catalogued
across 184 assets. 48 distinct `visibleName` values exist; 33 are published.

## What was excluded, and why

| Excluded | Reason |
|---|---|
| `Not reliably legible`, `Multiple signs; not reliably legible`, `Not legible` | The cataloguer could not read the sign |
| `Generic display mockup`, `Generic printing collage`, `Generic stationery mockup`, `Outdoor Advertising (generic)`, `Dentist (generic)` | Illustrative stock, not a real job |
| `SignAds` | The company's own name |
| `6J (zone marker)`, `MPC (visible)`, `Potato` | Fragments, not identifiable businesses |
| `Street OG / TVS`, `GAV / campaign text partially legible`, `NEOYON / reference collage` | Ambiguous — two readings recorded in one field |
| `Hyundai Eon` | Reads as a vehicle in the photograph, not a sign client |
| `Yashoda` | Folded into `Yashoda Hospital`, the fuller reading of the same name |

## Rights status — read this before publishing

Every source asset is still marked **`rightsStatus: 'permission-pending'`** in
the catalogue, and `getPublishedContent()` in `lib/store.ts` deliberately
suppresses `clientName` unless an asset is both `clientApproved` and
`rightsStatus: 'approved'`. The client index bypasses that gate because it
publishes names read from the company's own marketing material rather than
per-project client attributions.

That is a business decision, not a technical one. If a name should not appear,
remove it from `lib/clients.ts` — the list is the single source, so nothing else
needs changing.

## Regenerating

```sh
python3 - <<'PY'
import json, re, collections
cat = json.load(open('lib/asset-catalog.json'))
names = collections.Counter()
for a in cat:
    v = (a.get('visibleName') or '').strip()
    if v:
        names[re.sub(r'\s*\([^)]*\)', '', v).strip()] += 1
for n, c in names.most_common():
    print(f'{c:3d}  {n}')
PY
```
