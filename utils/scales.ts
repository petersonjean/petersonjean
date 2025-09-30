// src/utils/scales.ts
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function scaleLinear(value: number, [d0, d1]: [number, number], [r0, r1]: [number, number]) {
  const t = (value - d0) / (d1 - d0);
  return r0 + clamp(t, 0, 1) * (r1 - r0);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
