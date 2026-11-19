import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Space rover: a six-wheeled planetary rover in side view, facing right, with a blue solar panel, a mast camera
// and a small instrument box. Plain shapes only, no logos. Origin = ground point under the rear-middle wheel;
// about 560 px wide and 560 px tall at s = 1.
// anim "roll": the wheels turn and the mast camera pans slowly.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const WHEELS = [-230, -30, 170];
const FAR = [-210, -10, 190];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.white;
  const accent = p.accent && p.accent !== "none" ? p.accent : C.orange;
  const roll = p.anim === "roll";
  const spin = roll ? (f * 4) : 0;
  const pan = roll ? 14 * Math.sin((f * 2 * Math.PI) / 120) : 0;
  const wheel = (wx: number, wy: number, dark: string, key: string) => (
    <g key={key} transform={`translate(${wx} ${wy})`}>
      <circle cx={0} cy={0} r={70} fill={dark} />
      <circle cx={0} cy={0} r={46} fill={C.grey} />
      <g transform={`rotate(${f1(spin)})`}>
        {[0, 60, 120].map((a) => (
          <rect key={a} x={-40} y={-5} width={80} height={10} rx={5} fill={C.greyDark} transform={`rotate(${a})`} />
        ))}
      </g>
      <circle cx={0} cy={0} r={14} fill={accent} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* far-side wheels, slightly higher and behind */}
      {FAR.map((wx) => wheel(wx + 22, -92, C.ink, `far${wx}`))}
      {/* struts */}
      {WHEELS.map((wx) => (
        <rect key={`st${wx}`} x={wx - 8} y={-160} width={16} height={100} fill={C.greyDark} />
      ))}
      {/* solar panel on posts */}
      <rect x={-150} y={-300} width={14} height={60} fill={C.greyDark} />
      <rect x={110} y={-300} width={14} height={60} fill={C.greyDark} />
      <g transform={`translate(${f1(pan * 0.3)} 0)`}>
        <rect x={-190} y={-370} width={380} height={80} rx={6} fill="#2A50AE" />
        {[-130, -65, 0, 65, 130].map((gx) => (
          <line key={gx} x1={gx} y1={-370} x2={gx} y2={-290} stroke="#3D6FE0" strokeWidth={4} />
        ))}
        <line x1={-190} y1={-330} x2={190} y2={-330} stroke="#3D6FE0" strokeWidth={4} />
      </g>
      {/* chassis and cabin */}
      <rect x={-270} y={-270} width={500} height={120} rx={22} fill={body} />
      <rect x={-270} y={-180} width={500} height={30} rx={10} fill={shade(body, 0.2)} />
      <rect x={-270} y={-232} width={500} height={14} fill={accent} />
      <rect x={110} y={-340} width={120} height={72} rx={12} fill={body} />
      <rect x={122} y={-322} width={96} height={20} rx={6} fill={C.navy} />
      {/* mast camera */}
      <rect x={168} y={-470} width={12} height={130} fill={C.greyDark} />
      <g transform={`translate(${f1(176 + pan * 0.2)} -492)`}>
        <rect x={-30} y={-18} width={60} height={36} rx={8} fill={C.navy} />
        <circle cx={34} cy={0} r={11} fill={C.skyDeep} />
        <circle cx={31} cy={-4} r={4} fill={C.white} />
      </g>
      {/* antenna */}
      <line x1={142} y1={-340} x2={142} y2={-400} stroke={C.greyDark} strokeWidth={5} />
      <circle cx={142} cy={-404} r={9} fill={C.red} />
      {/* wheels on the near side */}
      {WHEELS.map((wx) => wheel(wx, -70, C.ink, `near${wx}`))}
    </g>
  );
}
