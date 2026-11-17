// Small, deterministic helpers. Everything in SceneParts is a pure function of the frame number,
// so any frame can be rendered on its own (previews, parallel renders, server-side SVG).

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Pop-in scale: 0 before `at`, overshoots slightly, settles at 1 after `len` frames. */
export const pop = (f: number, at: number, len = 8) => {
  const t = clamp((f - at) / len);
  return t <= 0 ? 0.001 : ease(t) + Math.sin(t * Math.PI) * 0.2;
};

/** A spec value may be a number or a [from, to] pair, eased across the shot (t = 0..1). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const anim = (v: any, t: number, dflt?: number): any =>
  Array.isArray(v) && v.length === 2 && typeof v[0] === "number" ? lerp(v[0], v[1], ease(t)) : v ?? dflt;

export const hashStr = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

/** Park–Miller PRNG; same seed, same sequence. */
export const rng = (seed: number) => {
  let s = Math.max(1, Math.floor(seed)) % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};
