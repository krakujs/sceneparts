import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Escalator: a moving staircase in side view, rising to the right, with a glass balustrade and handrail.
// anim "drive": the steps climb the slope, looping every 40 frames. Room scale: about 800 px wide at s = 1.
// Origin = ground under the lower landing; the steps sink into the floor there.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const L = -340, R = 340, H = 380, W = 60, DEPTH = 50;
const m = H / (R - L);
const yl = (x: number) => -m * (x - L);

// Stair top as a sawtooth: a flat tread, then a riser, repeated. o shifts the pattern along the slope.
const stair = (o: number) => {
  const x0 = L - 2 * W + o;
  let d = `M ${f1(x0)} ${f1(yl(x0))}`;
  let x = x0;
  while (x < R + W) {
    d += ` L ${f1(x + W)} ${f1(yl(x))} L ${f1(x + W)} ${f1(yl(x + W))}`;
    x += W;
  }
  return { d, x0, x };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const step = p.color && p.color !== "none" ? p.color : C.grey;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const o = anim === "drive" ? (f * 1.5) % W : 0;
  const top = stair(o);
  const body = `${top.d} L ${f1(top.x)} ${f1(yl(top.x) + DEPTH)} L ${f1(top.x0)} ${f1(yl(top.x0) + DEPTH)} Z`;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <defs>
          <clipPath id="flat-escalator-clip">
            <rect x={L} y={-700} width={R - L} height={700} />
          </clipPath>
        </defs>
        {/* moving steps, cut off at the floor and at the landings */}
        <g clipPath="url(#flat-escalator-clip)">
          <path d={body} fill={step} />
          <path d={top.d} fill="none" stroke={shade(step, 0.3)} strokeWidth={5} />
        </g>
        {/* glass balustrade and handrail */}
        <path d={`M ${L} -40 L ${R} -420 L ${R} -510 L ${L} -130 Z`} fill={C.sky} opacity={0.85} />
        <line x1={L - 10} y1={-135} x2={R + 10} y2={-515} stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
        {/* landing plates at both ends */}
        <rect x={L - 60} y={-14} width={64} height={14} rx={4} fill={frame} />
        <rect x={R} y={-394} width={64} height={14} rx={4} fill={frame} />
      </g>
    </g>
  );
}
