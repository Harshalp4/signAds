// Names that are legibly visible on signs photographed in the SignAds company
// profile. Extracted from lib/asset-catalog.json (`visibleName`), not written
// by hand — see docs/client-index.md for how this list was derived and which
// entries were deliberately left out.
//
// IMPORTANT: every source asset is still marked `rightsStatus: 'permission-pending'`
// in the catalogue. Prune this list rather than editing photographs if a name
// should not appear publicly.

export type ClientGroup = {sector: string; names: string[]};

export const clientIndex: ClientGroup[] = [
  {sector: 'Banking', names: ['CSB Bank', 'HDFC Bank', 'IndusInd Bank']},
  {sector: 'Healthcare', names: ['Dr Agarwals', 'Yashoda Hospital', 'Polaris Hospital', 'MedPlus']},
  {sector: 'Retail & brands', names: ['vivo', 'Bata', 'GIVA', 'Paragon', 'MOC', 'Al Baik', 'Laptop World', 'Anmol Electronics']},
  {sector: 'Property & development', names: ['Gurukrupa Realcon', 'Neelkanth Luxuria', 'Gaurav Lords', 'Rajasthan Bhavan']},
  {sector: 'Jewellery', names: ['Aabhushan', 'Maheshwari Jewellers', 'Gehana']},
  {sector: 'Food & hospitality', names: ['Sukhad Home', 'Shubham Caterers', 'Turde Wine Centre']},
  {sector: 'Public & infrastructure', names: ['CIDCO', 'Customs']},
  {sector: 'Education', names: ['Disha Computer Institute', 'SkoolEase', 'Kidz N Kidz']},
  {sector: 'Industry & logistics', names: ['TESCON', 'Porter', 'Ajeya']},
];

export const clientCount = clientIndex.reduce((n, g) => n + g.names.length, 0);
