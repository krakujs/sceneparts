import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Moon base: two glass domes and a connected habitat module on a grey regolith hill, with an antenna mast,
// a solar panel and lit windows. Origin = ground line at the centre of the base; about 900 px wide and 330 px tall.
// anim "glow": the windows glow and the antenna light blinks.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : "#C7CCD6";
  const glass = p.glass && p.glass !== "none" ? p.glass : "#CFE6F5";
  const glow = p.anim === "glow";
  const lit = glow ? 0.7 + 0.3 * Math.sin((f * 2 * Math.PI) / 60) : 1;
  const blink = glow ? (Math.floor(f / 30) % 2 === 0 ? 1 : 0.2) : 1;
  const windows = [-200, -130, -60, 10, 80, 150];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* grey regolith hill, with craters */}
      <path d="M -560 0 L -560 -30 Q -380 -70 -200 -40 Q 0 -10 200 -46 Q 380 -80 560 -30 L 560 400 L -560 400 Z" fill={C.grey} />
      <path d="M -560 -30 Q -380 -70 -200 -40 Q 0 -10 200 -46 Q 380 -80 560 -30 L 560 -20 Q 380 -70 200 -36 Q 0 -2 -200 -30 Q -380 -60 -560 -20 Z" fill={shade(C.grey, 0.12)} />
      <ellipse cx={-440} cy={-26} rx={46} ry={11} fill={C.greyDark} opacity={0.5} />
      <ellipse cx={380} cy={-62} rx={62} ry={14} fill={C.greyDark} opacity={0.5} />
      <ellipse cx={250} cy={-22} rx={24} ry={6} fill={C.greyDark} opacity={0.5} />
      {/* antenna mast with blinking light */}
      <rect x={-322} y={-300} width={8} height={240} fill={C.navy} />
      <rect x={-340} y={-250} width={44} height={6} fill={C.navy} />
      <rect x={-334} y={-200} width={32} height={5} fill={C.navy} />
      <circle cx={-318} cy={-306} r={10} fill={C.red} opacity={blink} />
      {/* solar panel on a leg */}
      <rect x={262} y={-120} width={8} height={120} fill={C.navy} />
      <rect x={206} y={-200} width={120} height={66} rx={4} fill="#2A50AE" />
      <line x1={246} y1={-200} x2={246} y2={-134} stroke="#3D6FE0" strokeWidth={4} />
      <line x1={266} y1={-200} x2={266} y2={-134} stroke="#3D6FE0" strokeWidth={4} />
      {/* connected habitat module */}
      <rect x={-240} y={-110} width={440} height={110} rx={40} fill={body} />
      <rect x={-240} y={-44} width={440} height={44} rx={22} fill={shade(body, 0.15)} />
      {windows.map((wx) => (
        <rect key={wx} x={wx} y={-84} width={34} height={28} rx={6} fill={C.yellow} opacity={lit} />
      ))}
      {/* domes */}
      <path d="M -190 -110 A 110 110 0 0 1 30 -110 Z" fill={glass} />
      <path d="M -160 -120 Q -150 -180 -100 -200" stroke={C.white} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
      <path d="M -80 -110 L -80 -220 M -190 -110 Q -160 -165 -80 -220 M 30 -110 Q 0 -165 -80 -220" stroke="#8EC5E8" strokeWidth={3} fill="none" opacity={0.6} />
      <path d="M 70 -110 A 70 70 0 0 1 210 -110 Z" fill={glass} />
      <path d="M 100 -116 Q 110 -150 140 -160" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
      <path d="M 140 -110 L 140 -180 M 70 -110 Q 100 -146 140 -180 M 210 -110 Q 180 -146 140 -180" stroke="#8EC5E8" strokeWidth={3} fill="none" opacity={0.6} />
      {/* airlock door */}
      <rect x={-20} y={-74} width={26} height={74} rx={4} fill={C.navy} opacity={0.6} />
    </g>
  );
}
