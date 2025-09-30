// src/utils/Haptics.ts
export function vibrate(pattern: number[] | number) {
  if (!('vibrate' in navigator)) return;
  try {
    // Safari iOS ignores arrays; single numbers still help.
    navigator.vibrate(pattern as any);
  } catch {
    /* noop */
  }
}

export function buzzForThreshold(level: 10 | 20 | 30) {
  const patterns: Record<number, number[] | number> = {
    10: 60,
    20: [60, 40, 60],
    30: 120
  };
  vibrate(patterns[level]);
}

export function buzzForLevel(L: number) {
  // One short pulse per completed 10%
  const pulses = Math.floor(L / 10);
  if (pulses <= 0) return;
  const pattern: number[] = [];
  for (let i = 0; i < pulses; i++) pattern.push(40, 60);
  vibrate(pattern);
}
