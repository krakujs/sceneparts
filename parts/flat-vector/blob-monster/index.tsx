import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Monster blob: wobbly round jelly blob with one big eye and tiny arms. Feet at (0,0); about 560 px tall at s = 1.
// anim: wobble (the body jiggles) | blink (eye blinks, body still) | none.
/* eslint-disable @typescript-eslint/no-explicit-any */
const ring = (ph: number): [number, number][] => {
  const n = 16, pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 1 + 0.05 * Math.cos(3 * t + ph) + 0.03 * Math.cos(2 * t - ph * 1.3);
    const ry = Math.sin(t) > 0 ? 0.85 : 1;
    pts.push([0 + 240 * r * Math.cos(t), -300 + 230 * r * Math.sin(t) * ry]);
  }
  return pts;
};
const smooth = (pts: [number, number][]) => {
  const n = pts.length;
  const mid = (i: number): [number, number] => {
    const a = pts[i % n], b = pts[(i + 1) % n];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };
  const m0 = mid(n - 1);
  let d = `M ${m0[0].toFixed(1)} ${m0[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + " Z";
};

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : "#F27BA6";
  const dark = shade(body, 0.2);
  const anim: string = p.anim ?? "wobble";
  const ph = anim === "wobble" ? f * 0.12 : 0;
  const blink = anim === "blink" && f % 100 < 5 ? 0.1 : 1;
  const wave = Math.sin(f * 0.15);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={240} ry={18} fill={C.shadow} />
      <path d="M -210 -280 Q -290 -300 -300 -240" stroke={body} strokeWidth={30} strokeLinecap="round" fill="none" />
      <path d="M 210 -280 Q 290 -300 300 -240" stroke={body} strokeWidth={30} strokeLinecap="round" fill="none" />
      <circle cx={-300 - wave * 6} cy={-240} r={20} fill={body} />
      <circle cx={300 + wave * 6} cy={-240} r={20} fill={body} />
      <ellipse cx={-80} cy={-14} rx={36} ry={18} fill={dark} />
      <ellipse cx={80} cy={-14} rx={36} ry={18} fill={dark} />
      <path d={smooth(ring(ph))} fill={body} />
      <ellipse cx={-110} cy={-430} rx={36} ry={18} fill="#FFFFFF" opacity={0.55} transform="rotate(-30 -110 -430)" />
      <g transform={`translate(0 -340) scale(1 ${blink})`}>
        <circle r={62} fill="#FFFFFF" />
        <circle cx={6} cy={4} r={30} fill={C.ink} />
        <circle cx={16} cy={-6} r={9} fill="#FFFFFF" />
      </g>
      <path d="M -40 -210 Q 0 -185 40 -210" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
}
