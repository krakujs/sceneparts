import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Haunted tree: a bare, twisted dark trunk with crooked branches and a face of knots and hollows in the bark
// (two glowing eyes and a wide mouth). Origin = floor centre at the base. About 620 px wide and 1100 px tall at s = 1.
// anim "sway": the crown rocks in the wind, the eyes blink.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const bark = p.color && p.color !== "none" ? p.color : "#4A3B55";
  const anim: string = p.anim ?? "sway";
  const rock = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 120) * 2.5 : 0;
  const blink = anim === "sway" && Math.floor(f / 90) % 3 === 2 && f % 90 < 6;
  const eyeH = blink ? 2 : 14;
  // branches: [from x, from y, to x, to y, width]; drawn as tapered strokes
  const BRANCHES: [number, number, number, number, number][] = [
    [-30, -640, -170, -840, 26], [-150, -800, -250, -900, 16], [-120, -760, -40, -960, 14],
    [30, -700, 190, -880, 24], [150, -820, 270, -940, 14], [120, -780, 230, -1010, 12],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={18} fill={C.shadow} />
      {/* roots */}
      <path d="M -70 -10 Q -140 -40 -200 0 L -150 4 Z M 70 -10 Q 140 -40 200 0 L 150 4 Z" fill={shade(bark, 0.15)} />
      <g transform={`rotate(${f1(rock)} 0 -20)`}>
        {/* branches behind the trunk top */}
        {BRANCHES.map(([x1, y1, x2, y2, w], i) => (
          <path key={i} d={`M ${x1} ${y1} Q ${f1((x1 + x2) / 2 + (i % 2 ? 20 : -20))} ${f1((y1 + y2) / 2 - 30)} ${x2} ${y2}`}
            fill="none" stroke={bark} strokeWidth={w} strokeLinecap="round" />
        ))}
        {/* trunk: crooked, tapering to the base */}
        <path d="M -90 0 Q -70 -300 -40 -520 Q -20 -640 -50 -800 Q -60 -900 -20 -1000 L 30 -1000 Q 0 -880 30 -760 Q 60 -600 50 -420 Q 60 -200 90 0 Z" fill={bark} />
        <path d="M 30 -1000 Q 0 -880 30 -760 Q 60 -600 50 -420 Q 60 -200 90 0 L 40 0 Q 20 -200 20 -420 Q 30 -620 0 -760 Q -10 -900 30 -1000 Z" fill={shade(bark, 0.25)} opacity={0.7} />
        {/* bark ridges */}
        <path d="M -40 -20 Q -60 -200 -30 -360" fill="none" stroke={shade(bark, 0.3)} strokeWidth={6} strokeLinecap="round" />
        <path d="M 10 -40 Q 30 -220 0 -320" fill="none" stroke={shade(bark, 0.3)} strokeWidth={6} strokeLinecap="round" />
        {/* the face: knot eyes and a wide hollow mouth, enlarged around the trunk */}
        <g transform="translate(0 -600) scale(1.7) translate(0 600)">
          <ellipse cx={-22} cy={-620} rx={22} ry={eyeH} fill={C.yellow} />
          <ellipse cx={26} cy={-620} rx={22} ry={eyeH} fill={C.yellow} />
          <ellipse cx={-22} cy={-620} rx={8} ry={Math.max(1, eyeH * 0.4)} fill={C.ink} />
          <ellipse cx={26} cy={-620} rx={8} ry={Math.max(1, eyeH * 0.4)} fill={C.ink} />
          <path d="M -50 -560 Q 2 -500 54 -560 Q 2 -530 -50 -560 Z" fill={C.ink} />
          <path d="M -40 -560 Q 2 -520 44 -560" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
