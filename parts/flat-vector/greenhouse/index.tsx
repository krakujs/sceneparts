import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glass greenhouse, front view: a pitched glazed roof on a white frame, a glazed door and plants on a bench inside.
// Origin = centre of the floor line. About 680 px wide and 560 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const glass = p.color && p.color !== "none" ? p.color : C.sky;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sway = anim === "lights" ? Math.sin((f * 2 * Math.PI) / 90) * 6 : 0;
  const plant = (px: number, col: string, h: number) => (
    <g key={px} transform={`translate(${px} 0)`}>
      <path d={`M 0 -120 Q ${sway} ${-120 - h / 2} ${sway * 1.4} ${-120 - h}`} stroke={C.greenDark} strokeWidth={10} fill="none" strokeLinecap="round" />
      <ellipse cx={sway * 1.4 - 22} cy={-120 - h * 0.7} rx={30} ry={16} fill={col} transform={`rotate(-30 ${sway * 1.4 - 22} ${-120 - h * 0.7})`} />
      <ellipse cx={sway * 1.4 + 22} cy={-120 - h * 0.55} rx={30} ry={16} fill={shade(col, 0.1)} transform={`rotate(30 ${sway * 1.4 + 22} ${-120 - h * 0.55})`} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={360} ry={20} fill={C.shadow} />
        {/* glass body */}
        <rect x={-320} y={-360} width={640} height={360} fill={glass} />
        {/* inner plants on a bench */}
        <rect x={-280} y={-150} width={560} height={20} rx={4} fill={C.brown} />
        {plant(-200, C.green, 180)}
        {plant(-60, C.lime, 220)}
        {plant(80, C.green, 160)}
        {plant(210, C.lime, 200)}
        {/* glazed roof */}
        <path d="M -340 -350 L 0 -560 L 340 -350 Z" fill={glass} />
        <path d="M 0 -560 L 340 -350 L 0 -350 Z" fill={shade(glass, 0.12)} />
        {/* frame: posts, ridge, bars */}
        {[-320, -160, 0, 160, 320].map((fx) => (
          <rect key={fx} x={fx - 8} y={-360} width={16} height={360} fill={frame} />
        ))}
        <path d="M -340 -350 L 0 -560 L 340 -350" stroke={frame} strokeWidth={16} fill="none" strokeLinejoin="round" />
        <path d="M -170 -455 L -170 -350 M 170 -455 L 170 -350 M -340 -350 L 340 -350" stroke={frame} strokeWidth={10} fill="none" />
        <path d="M -150 -350 L -150 -440 M 150 -350 L 150 -440" stroke={frame} strokeWidth={6} fill="none" opacity={0.7} />
        {/* glass highlight */}
        <path d="M -300 -340 L -250 -340 L -270 -200 L -300 -200 Z" fill={C.white} opacity={0.45} />
        {/* glazed door */}
        <rect x={-70} y={-300} width={140} height={300} fill={frame} />
        <rect x={-58} y={-288} width={116} height={276} fill={glass} />
        <circle cx={44} cy={-150} r={6} fill={C.greyDark} />
        {/* base */}
        <rect x={-340} y={-20} width={680} height={20} rx={4} fill={C.greyLight} />
      </g>
    </g>
  );
}
