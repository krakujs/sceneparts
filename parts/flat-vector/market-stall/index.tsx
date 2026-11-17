import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open market stall: a striped awning on two poles, a counter and crates of produce. Origin = floor centre.
// About 620 px wide and 620 px tall at s = 1 (street scale, about one person high at s = 1.1).
// anim "lights": the awning stripes sway very gently in the breeze.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const stripe1 = p.color && p.color !== "none" ? p.color : C.red;
  const stripe2 = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sway = anim === "lights" ? Math.sin(f / 10) * 4 : 0;
  const stripes = [-300, -180, -60, 60, 180, 300];
  const fruit = [
    { cx: -200, cy: -100, c: C.orange }, { cx: -170, cy: -100, c: C.red }, { cx: -140, cy: -100, c: C.lime },
    { cx: -210, cy: -130, c: C.yellow }, { cx: -180, cy: -130, c: C.orange }, { cx: -150, cy: -130, c: C.red },
    { cx: 150, cy: -100, c: C.green }, { cx: 180, cy: -100, c: C.lime }, { cx: 210, cy: -100, c: C.green },
    { cx: 165, cy: -130, c: C.yellow }, { cx: 195, cy: -130, c: C.orange },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={18} fill={C.shadow} />
      {/* poles */}
      <rect x={-290} y={-440} width={14} height={440} fill={C.brownDark} />
      <rect x={276} y={-440} width={14} height={440} fill={C.brownDark} />
      {/* counter with a cloth */}
      <rect x={-320} y={-190} width={640} height={190} rx={8} fill={C.brown} />
      <rect x={-320} y={-190} width={640} height={22} rx={6} fill={C.sand} />
      <rect x={-300} y={-168} width={600} height={150} fill={shade(C.brown, 0.1)} />
      {/* crates of produce on the counter */}
      <rect x={-240} y={-160} width={140} height={60} rx={4} fill={C.brownDark} />
      <rect x={100} y={-160} width={140} height={60} rx={4} fill={C.brownDark} />
      {fruit.map((fr, i) => (
        <circle key={i} cx={fr.cx} cy={fr.cy} r={20} fill={fr.c} />
      ))}
      {/* striped awning with a scalloped edge */}
      <g transform={`translate(${f1(sway)} 0)`}>
        {stripes.map((sx, i) => (
          <path key={sx} d={`M ${sx} -440 L ${sx + 60} -440 L ${sx + 60} -300 L ${sx} -300 Z`} fill={i % 2 ? stripe2 : stripe1} />
        ))}
        <path d="M -320 -440 L 320 -440 L 340 -360 L 300 -360 L 0 -330 L -300 -360 L -340 -360 Z" fill={stripe1} />
        <path d="M -320 -440 L 320 -440 L 320 -420 L -320 -420 Z" fill={shade(stripe1, 0.2)} />
        {/* scalloped valance */}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={-300 + i * 86} cy={-300} r={22} fill={i % 2 ? stripe2 : stripe1} />
        ))}
      </g>
      {/* a hanging price tag (blank) */}
      <rect x={-20} y={-270} width={40} height={24} rx={4} fill={C.white} />
    </g>
  );
}
