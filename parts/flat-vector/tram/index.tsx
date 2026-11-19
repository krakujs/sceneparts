import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// City tram car, side view, facing right: rounded body with a sloped front, row of windows, doors,
// a pantograph on the roof whose contact shoe touches an overhead wire (drawn in the scene at the top).
// Room scale: about 900 px wide and 560 px tall at s = 1. Origin = floor centre; the wheels stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.58} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* pantograph: base, two arms, contact shoe under the wire at y -600 */}
          <rect x={-60} y={-520} width={120} height={20} rx={6} fill={C.greyDark} />
          <path d="M -40 -520 L 40 -520 L 10 -580 L -10 -580 Z" fill={C.greyDark} />
          <rect x={-70} y={-592} width={140} height={14} rx={6} fill={C.ink} />
          {/* overhead wire, drawn over the pantograph */}
          <rect x={-470} y={-606} width={940} height={6} rx={3} fill={C.ink} opacity={0.6} />
          {/* roof and body with rounded front */}
          <path d="M -400 -500 Q -400 -520 -370 -520 L 300 -520 Q 400 -520 410 -420 L 420 -190 Q 422 -140 380 -140 L -400 -140 Z" fill={body} />
          <rect x={-410} y={-530} width={820} height={18} rx={9} fill={shade(body, 0.15)} />
          <rect x={-410} y={-150} width={840} height={36} rx={14} fill={shade(body, 0.2)} />
          {/* windows */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-360 + i * 120} y={-460} width={96} height={130} rx={12} fill={C.sky} />
          ))}
          {/* front windscreen */}
          <path d="M 300 -460 L 360 -460 Q 380 -460 384 -420 L 390 -330 L 300 -330 Z" fill={C.sky} />
          {/* doors (tram side) */}
          <rect x={-100} y={-300} width={6} height={150} fill={shade(body, 0.25)} />
          <rect x={-70} y={-300} width={6} height={150} fill={shade(body, 0.25)} />
          <rect x={-175} y={-300} width={6} height={150} fill={shade(body, 0.25)} />
          {/* headlight and tail light */}
          <rect x={390} y={-230} width={22} height={30} rx={8} fill={C.yellow} />
          <rect x={-420} y={-230} width={18} height={30} rx={6} fill={C.red} />
          {/* bogies and wheels */}
          <rect x={-340} y={-100} width={680} height={20} rx={8} fill={C.greyDark} />
        </g>
        {wheel(-270, -80, 80, rim, spin)}
        {wheel(270, -80, 80, rim, spin)}
      </g>
    </g>
  );
}
