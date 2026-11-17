// Pure animation helpers with the same shape as Remotion's, so existing Remotion drawings can become parts
// by swapping `from "remotion"` for `from "@sceneparts/core"` and `useCurrentFrame()` for `p.f`.

export type EasingFn = (t: number) => number;
type Extrapolate = "extend" | "clamp" | "identity";
export type InterpolateOptions = { extrapolateLeft?: Extrapolate; extrapolateRight?: Extrapolate; easing?: EasingFn };

export function interpolate(input: number, inputRange: readonly number[], outputRange: readonly number[], opts: InterpolateOptions = {}): number {
  const n = inputRange.length;
  if (n !== outputRange.length || n < 2) throw new Error("interpolate: inputRange and outputRange need the same length (>= 2)");
  let i = 1;
  while (i < n - 1 && input > inputRange[i]) i++;
  const a = inputRange[i - 1], b = inputRange[i], oa = outputRange[i - 1], ob = outputRange[i];
  let t = b === a ? 0 : (input - a) / (b - a);
  const left = opts.extrapolateLeft ?? "extend", right = opts.extrapolateRight ?? "extend";
  if (input < inputRange[0]) { if (left === "clamp") return outputRange[0]; if (left === "identity") return input; }
  if (input > inputRange[n - 1]) { if (right === "clamp") return outputRange[n - 1]; if (right === "identity") return input; }
  if (opts.easing && t >= 0 && t <= 1) t = opts.easing(t);
  return oa + (ob - oa) * t;
}

const bezier = (x1: number, y1: number, x2: number, y2: number): EasingFn => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t, sy = (t: number) => ((ay * t + by) * t + cy) * t, dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0 || x >= 1) return x;
    let t = x;
    for (let k = 0; k < 8; k++) { const e = sx(t) - x, d = dx(t); if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break; t -= e / d; }
    return sy(Math.max(0, Math.min(1, t)));
  };
};

export const Easing = {
  linear: (t: number) => t,
  ease: bezier(0.42, 0, 1, 1),
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  poly: (n: number) => (t: number) => Math.pow(t, n),
  sin: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  back: (s = 1.70158) => (t: number) => t * t * ((s + 1) * t - s),
  elastic: (b = 1) => (t: number) => 1 - Math.pow(Math.cos((t * Math.PI) / 2), 3) * Math.cos(t * b * Math.PI),
  bounce: (t: number) => {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) { const u = t - 1.5 / 2.75; return 7.5625 * u * u + 0.75; }
    if (t < 2.5 / 2.75) { const u = t - 2.25 / 2.75; return 7.5625 * u * u + 0.9375; }
    const u = t - 2.625 / 2.75; return 7.5625 * u * u + 0.984375;
  },
  bezier,
  in: (e: EasingFn) => e,
  out: (e: EasingFn) => (t: number) => 1 - e(1 - t),
  inOut: (e: EasingFn) => (t: number) => (t < 0.5 ? e(t * 2) / 2 : 1 - e((1 - t) * 2) / 2),
};

/** Deterministic pseudo-random number in [0, 1) from a seed (string or number). */
export function random(seed: string | number | null): number {
  const s = String(seed ?? "null");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h += h << 13; h ^= h >>> 7; h += h << 3; h ^= h >>> 17; h += h << 5;
  return ((h >>> 0) % 1000003) / 1000003;
}

/** Damped spring from 0 to 1 (same idea as Remotion's spring), evaluated at `frame`. */
export function spring({ frame, fps = 30, config = {}, from = 0, to = 1, durationInFrames }: { frame: number; fps?: number; config?: { damping?: number; mass?: number; stiffness?: number; overshootClamping?: boolean }; from?: number; to?: number; durationInFrames?: number }): number {
  const { damping = 10, mass = 1, stiffness = 100, overshootClamping = false } = config;
  if (frame <= 0) return from;
  const f = durationInFrames ? (frame * 60) / durationInFrames : frame;
  const dt = 1 / fps / 4;
  let x = 0, v = 0;
  for (let i = 0; i < f * 4; i++) { const a = (-stiffness * (x - 1) - damping * v) / mass; v += a * dt; x += v * dt; }
  if (overshootClamping) x = Math.min(1, x);
  return from + (to - from) * x;
}
