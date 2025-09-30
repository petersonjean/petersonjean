// Types that match your JSON rows
export type UNRow = {
  "Country Name": string;
  "Country Code": string;
  "Indicator Name": string;
  "Indicator Code": string;
  [year: string]: string; // "1960": "2.85", ...
};

export type Point = { year: number; value: number };

// Is this key a year like "1960".."2100"?
const isYearKey = (k: string) => /^\d{4}$/.test(k);

export function toSeries(row: UNRow, opts?: { from?: number; to?: number }): Point[] {
  if (!row) return [];
  const from = opts?.from ?? 1960;
  const to   = opts?.to   ?? 2100;

  const pts: Point[] = Object.keys(row)
    .filter(isYearKey)
    .map(y => ({ year: +y, value: parseFloat(row[y]) }))
    .filter(p => Number.isFinite(p.value) && p.year >= from && p.year <= to)
    .sort((a, b) => a.year - b.year);

  return pts;
}

export function getByCode(data: UNRow[], iso3: string| null): UNRow | undefined {
  return data.find(r => r["Country Code"] === iso3);
}
export function getByName(data: UNRow[], name: string): UNRow | undefined {
  return data.find(r => r["Country Name"].toLowerCase() === name.toLowerCase());
}

// Super-light projection: extend N years using the average slope of the last K years
export function projectLinear(series: Point[], extendYears = 10, slopeWindow = 5): Point[] {
  if (!series.length) return [];
  const last = series[series.length - 1];
  const baseYear = last.year;
  const w = Math.min(slopeWindow, series.length - 1);
  const slope =
    w > 0 ? (last.value - series[series.length - 1 - w].value) / w : 0;

  const proj: Point[] = [];
  for (let i = 1; i <= extendYears; i++) {
    proj.push({ year: baseYear + i, value: last.value + slope * i });
  }
  return proj;
}
