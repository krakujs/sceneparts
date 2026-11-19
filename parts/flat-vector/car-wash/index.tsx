import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Car wash tunnel, front view: a boxy tunnel house with an open arch, hanging spinning brushes and rising bubbles.
// Origin = bottom centre on the ground. About 800 px wide and 720 px tall at s = 1.
// anim "lights": the brushes spin round (the brush rolls turn with f) and the bubbles drift up.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const bubbles = [[-300, 0], [-240, 60], [280, 20], [330, 80], [-60, 40]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.blue;
  const brush = p.color2 && p.color2 !== "none" ? p.color2 : C.lime;
  const anim: string = p.anim ?? "none";
  const spin = anim === "lights" ? f * 8 : 0;
  const rise = anim === "lights" ? (f * 3) % 80 : 0;
  const brushes = [-260, 0, 260];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={420} ry={20} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tunnel house: side walls and a flat roof */}
        <rect x={-400} y={-620} width={800} height={620} rx={18} fill={wall} />
        <rect x={-420} y={-660} width={840} height={50} rx={12} fill={shade(wall, 0.2)} />
        <rect x={-400} y={-22} width={800} height={14} fill={shade(wall, 0.15)} />
        {/* open tunnel arch */}
        <path d="M -230 -20 L -230 -330 Q -230 -440 0 -440 Q 230 -440 230 -330 L 230 -20 Z" fill={C.greyDark} />
        <path d="M -200 -20 L -200 -330 Q -200 -410 0 -410 Q 200 -410 200 -330 L 200 -20 Z" fill={C.greyLight} />
        <path d="M -150 -40 L -150 -320 Q -150 -370 0 -370 Q 150 -370 150 -320 L 150 -40 Z" fill={C.sky} />
        {/* glass highlight and sign panel */}
        <path d="M -120 -330 L -90 -330 L -110 -60 L -130 -60 Z" fill={C.white} opacity={0.4} />
        <rect x={-120} y={-600} width={240} height={60} rx={12} fill={C.white} />
        <rect x={-108} y={-590} width={216} height={40} rx={8} fill={C.teal} />
        {/* hanging spinning brushes */}
        {brushes.map((bx, i) => (
          <g key={bx} transform={`translate(${bx} -330)`}>
            <rect x={-6} y={-120} width={12} height={40} fill={C.greyDark} />
            <g transform={`rotate(${f1(spin + i * 40)})`}>
              <rect x={-14} y={-60} width={28} height={120} rx={14} fill={brush} />
              {[-40, -20, 0, 20, 40].map((by) => (
                <line key={by} x1={-14} y1={by} x2={14} y2={by + 10} stroke={shade(brush, 0.2)} strokeWidth={5} strokeLinecap="round" />
              ))}
            </g>
          </g>
        ))}
        {/* bubbles, rising while the brushes run */}
        {bubbles.map(([bx, by], i) => (
          <circle key={i} cx={bx} cy={by - rise} r={14 + (i % 3) * 5} fill={C.white} opacity={0.75} />
        ))}
        {/* floor and drain strip */}
        <rect x={-430} y={-30} width={860} height={10} rx={4} fill={C.greyDark} />
      </g>
    </g>
  );
}
