import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector slice of layered cake on a small plate: sponge, cream and jam layers, cream top, strawberry.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~420 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SliceOfCake(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const sponge = "#F5D08A", cream = "#FFF8EE", jam = "#D9344F";
  const pl = C.white;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Cut face: right triangle, bottom edge on the plate, tall edge on the left, point to the right
  const tri = "M -170 -44 L -170 -250 L 130 -44 Z";
  // horizontal layers stacked from the bottom, each a band clipped to the triangle
  const bands: [number, number, string][] = [
    [-44, -92, sponge], [-92, -112, cream], [-112, -160, sponge], [-160, -172, jam], [-172, -222, sponge], [-222, -252, cream],
  ];
  // Top surface: a thin lighter strip along the sloped top edge
  const topFace = "M -170 -250 L -150 -274 L 150 -68 L 130 -44 Z";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={24} fill={C.shadow} />
      <g transform={tr}>
        {/* small plate */}
        <ellipse cx={0} cy={-26} rx={210} ry={40} fill={shade(pl, 0.12)} />
        <ellipse cx={0} cy={-34} rx={210} ry={40} fill={pl} />
        <ellipse cx={0} cy={-36} rx={150} ry={26} fill={shade(pl, 0.06)} opacity={0.6} />
        <defs>
          <clipPath id="slice-of-cake-face"><path d={tri} /></clipPath>
        </defs>
        <g clipPath="url(#slice-of-cake-face)">
          {bands.map(([y1, y2, col], i) => <rect key={i} x={-180} y={y2} width={320} height={y1 - y2} fill={col} />)}
          {/* sponge crumb speckles */}
          {[[-120, -70], [-60, -100], [-20, -140], [-100, -190], [10, -70], [-40, -200]].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={5} ry={3} fill="#E3B567" opacity={0.7} />
          ))}
        </g>
        <path d={tri} fill="none" stroke={shade(sponge, 0.25)} strokeWidth={3} strokeLinejoin="round" opacity={0.5} />
        <path d={topFace} fill={cream} />
        <path d={topFace} fill="none" stroke={shade(cream, 0.12)} strokeWidth={3} strokeLinejoin="round" />
        {/* cream dollops and a strawberry on top */}
        <path d="M -150 -262 Q -110 -292 -60 -272 Q -20 -254 40 -226" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.7} />
        <g transform="translate(-60 -272) rotate(-22)">
          <path d="M -34 0 C -34 -30 34 -30 34 0 C 34 34 0 52 0 52 C 0 52 -34 34 -34 0 Z" fill={C.red} />
          <path d="M -22 -6 l 8 6 l 8 -6 M -10 10 l 6 4 l 6 -4" stroke="#FFD0C0" strokeWidth={3} fill="none" opacity={0.7} />
          <path d="M -26 -6 Q -12 -22 0 -16 Q 12 -22 26 -6 Q 12 -12 0 -10 Q -12 -12 -26 -6 Z" fill="#4BB46A" />
          <path d="M -4 -16 Q 0 -28 8 -34" stroke="#3F7D3A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <SliceOfCake {...p} />;
}
