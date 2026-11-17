import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector croissant: a crescent on one curved arc, a fat centre segment with two smaller segments each side,
// thin darker grooves between segments and a baked shade along the top. Origin = resting point (bottom centre).
// Honours flip and s. ~420 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Croissant(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const dough = p.color ?? "#F0B046";
  const baked = shade(dough, 0.3);
  const CX = 0, CY = 170, R = 170; // arc centre (below the pastry), centreline radius
  const TM = 1.05; // half-angle of the crescent in radians (tips curl down)
  const wid = (u: number) => 74 + 120 * (1 - u * u); // band thickness along the arc, thin at tips
  // point on the arc at angle th with radial offset d (positive = outward)
  const pt = (th: number, d: number): [number, number] => [CX + (R + d) * Math.sin(th), CY - (R + d) * Math.cos(th)];

  // outer and inner edges, drawn as one closed band
  const N = 40;
  const outer: string[] = [], inner: string[] = [];
  for (let i = 0; i <= N; i++) {
    const th = -TM + (2 * TM * i) / N, u = th / TM;
    const [ox, oy] = pt(th, wid(u) / 2), [ix, iy] = pt(th, -wid(u) / 2);
    outer.push(`${f1(ox)} ${f1(oy)}`);
    inner.push(`${f1(ix)} ${f1(iy)}`);
  }
  const band = `M ${outer.join(" L ")} L ${inner.reverse().join(" L ")} Z`;

  // segment grooves: radial cuts at four angles
  const grooves = [-0.58, -0.22, 0.22, 0.58].map((k, i) => {
    const th = k * TM, u = k;
    const [ox, oy] = pt(th, wid(u) / 2 + 2), [ix, iy] = pt(th, -wid(u) / 2 - 2);
    return <path key={i} d={`M ${f1(ix)} ${f1(iy)} Q ${f1((ix + ox) / 2 + 4)} ${f1((iy + oy) / 2)} ${f1(ox)} ${f1(oy)}`} stroke={baked} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.85} />;
  });

  // segments along the arc: [angle, half-length along the arc, half-height across it]; tips first, centre last
  const SEG: [number, number, number][] = [[-1.05, 34, 30], [1.05, 34, 30], [-0.66, 50, 58], [0.66, 50, 58], [-0.3, 60, 82], [0.3, 60, 82], [0, 66, 100]];
  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // outer top arc in baked shade, drawn as a thick stroke along the top edge
  const topArc = Array.from({ length: 21 }, (_, i) => {
    const th = -TM * 0.9 + (2 * TM * 0.9 * i) / 20;
    const [ax, ay] = pt(th, wid(th / TM) / 2 - 8);
    return `${i ? "L" : "M"} ${f1(ax)} ${f1(ay)}`;
  }).join(" ");

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={18} fill={C.shadow} />
      <g transform={`translate(0 -150) scale(1.4) ${tr}`}>
        {SEG.map(([th, al, ra], i) => {
          const [sx, sy] = pt(th, 0);
          const deg = (th * 180) / Math.PI;
          return (
            <g key={i} transform={`translate(${f1(sx)} ${f1(sy)}) rotate(${f1(deg)})`}>
              <ellipse cx={0} cy={0} rx={al} ry={ra} fill={baked} />
              <ellipse cx={-al * 0.08} cy={-ra * 0.06} rx={al * 0.9} ry={ra * 0.9} fill={dough} />
              <ellipse cx={-al * 0.25} cy={-ra * 0.45} rx={al * 0.35} ry={ra * 0.18} fill="#FFFFFF" opacity={0.25} />
            </g>
          );
        })}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Croissant {...p} />;
}
