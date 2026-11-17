import { clamp, ease, hashStr, lerp } from "./math.js";

// Camera rig. A shot's `cam` is a list of keys [x, y, zoom, rotationDeg?] in canvas pixels (1080 x 1920).
// 2 keys = one eased move, 3+ keys = a path eased per segment. Unless `auto: false`, every shot also gets an
// automatic move chosen from its seed (push-in, pull-out, Dutch tilt, drift, swing), a handheld sway and a
// short punch-in right after the cut. Layers: "bg" moves with 55 % of the camera (parallax), "fg" with 130 %.
export type CamState = { x: number; y: number; z: number; r: number };
export type CamKey = [number, number, number] | [number, number, number, number];

export const W = 1080;
export const H = 1920;

export const camAt = (
  keys: number[][],
  f: number,
  d: number,
  seed = "",
  opts: { auto?: boolean; shake?: number } = {},
): CamState => {
  const T = clamp(f / Math.max(1, d));
  const n = keys.length;
  let k0 = keys[0], k1 = keys[n - 1], u = ease(T);
  if (n > 2) {
    const s = Math.min(n - 2, Math.floor(T * (n - 1)));
    k0 = keys[s];
    k1 = keys[s + 1];
    u = ease(T * (n - 1) - s);
  }
  let x = lerp(k0[0], k1[0], u), y = lerp(k0[1], k1[1], u), z = lerp(k0[2], k1[2], u), r = lerp(k0[3] ?? 0, k1[3] ?? 0, u);
  if (opts.auto !== false) {
    const v = hashStr(seed) % 5, e = ease(T);
    if (v === 0) z *= lerp(1.0, 1.24, e); // push in
    else if (v === 1) z *= lerp(1.28, 1.0, e); // pull out
    else if (v === 2) { r += lerp(-4, 4, T); z *= lerp(1.06, 1.18, e); } // Dutch tilt
    else if (v === 3) { x += lerp(-70, 70, T) / z; z *= 1.12; } // lateral drift
    else { r += Math.sin(T * Math.PI) * 3; z *= 1 + 0.18 * Math.sin(T * Math.PI); y -= (40 * Math.sin(T * Math.PI)) / z; } // swing
    z *= 1 + 0.09 * Math.max(0, 1 - f / 7); // punch-in after the cut
    x += (Math.sin(f * 0.09 + v) * 5) / z; // handheld
    y += (Math.cos(f * 0.07 + v) * 4) / z;
    r += Math.sin(f * 0.05 + v) * 0.35;
  }
  if (opts.shake) {
    x += (Math.sin(f * 2.1) * opts.shake) / z;
    y += (Math.cos(f * 1.7) * opts.shake) / z;
  }
  return { x, y, z, r };
};

/** SVG transform for a camera state; k < 1 = background parallax, k > 1 = foreground. */
export const camTransform = (c: CamState, k = 1) => {
  const z = 1 + (c.z - 1) * k, x = W / 2 + (c.x - W / 2) * k, y = H / 2 + (c.y - H / 2) * k;
  return `translate(${W / 2} ${H / 2}) rotate(${c.r * k}) scale(${z}) translate(${-x} ${-y})`;
};

export const STILL: number[][] = [[540, 960, 1], [540, 960, 1]];
