import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fire station with two big red roll-up bay doors, a yellow sign band and a tall hose tower. Origin = bottom centre. About 960 px wide and 1190 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : "#F4EFE8";
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : "#E8503F";
  const anim: string = p.anim ?? "none";
  const lit = (i: number) => (anim === "lights" ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <ellipse cx={0} cy={-6} rx={480} ry={22} fill={C.shadow} />
        <rect x={-460} y={-14} width={920} height={22} rx={6} fill={shade(wall, 0.2)} />
        {/* hose tower on the right */}
        <rect x={250} y={-1000} width={190} height={990} rx={10} fill={wall} />
        <rect x={236} y={-1030} width={218} height={36} rx={10} fill={roof} />
        {[-950, -850, -750, -650].map((hy) => (
          <rect key={hy} x={250} y={hy} width={190} height={14} fill={shade(wall, 0.15)} />
        ))}
        <rect x={300} y={-700} width={90} height={110} rx={8} fill={C.sky} opacity={anim === "lights" ? lit(0) : 1} />
        <rect x={300} y={-900} width={90} height={110} rx={8} fill={C.sky} opacity={anim === "lights" ? lit(1) : 1} />
        {/* main bay block */}
        <rect x={-440} y={-620} width={680} height={610} rx={12} fill={wall} />
        <rect x={-460} y={-650} width={720} height={36} rx={10} fill={roof} />
        <rect x={-460} y={-632} width={720} height={12} fill={shade(roof, 0.2)} />
        {/* two big roll-up bay doors */}
        {[-400, -90].map((dx, i) => (
          <g key={dx}>
            <rect x={dx} y={-500} width={280} height={490} rx={8} fill={C.red} />
            {[-450, -400, -350, -300, -250, -200, -150, -100, -50].map((ly) => (
              <rect key={ly} x={dx + 8} y={ly} width={264} height={8} rx={3} fill={C.redDark} />
            ))}
            <rect x={dx + 12} y={-500} width={256} height={10} rx={4} fill={shade(C.red, 0.25)} />
          </g>
        ))}
        {/* small sign band above the doors */}
        <rect x={-400} y={-600} width={560} height={28} rx={8} fill={C.yellow} />
        <rect x={-400} y={-600} width={560} height={10} fill={shade(C.yellow, 0.15)} />

      </g>
    </g>
  );
}
