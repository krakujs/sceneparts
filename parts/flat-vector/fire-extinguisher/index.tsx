import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Red fire extinguisher standing upright, with a top handle, a gauge, a hose and a nozzle. About 400 px tall.
// Origin = bottom centre. anim "spray" sends a jet of spray out of the nozzle.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const dark = C.inkSoft;
  const spray = p.anim === "spray";
  const jets = Array.from({ length: 8 }, (_, i) => ((f * 2 + i * 13) % 40) / 40);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={100} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* hose, drawn before the body so it leaves from behind it */}
        <path d="M 30 -334 C 110 -330 120 -250 92 -196" stroke={dark} strokeWidth={16} strokeLinecap="round" fill="none" />
        {/* cylinder with a darker right side and a white label */}
        <rect x={-72} y={-310} width={144} height={290} rx={40} fill={c} />
        <rect x={36} y={-300} width={36} height={270} rx={18} fill={shade(c, 0.2)} />
        <rect x={-52} y={-230} width={104} height={110} rx={18} fill={C.white} />
        <rect x={-52} y={-150} width={104} height={14} fill={c} />
        {/* base foot */}
        <rect x={-62} y={-34} width={124} height={34} rx={14} fill={dark} />
        {/* neck, valve head and operating handle */}
        <rect x={-22} y={-334} width={44} height={30} rx={8} fill={dark} />
        <rect x={-36} y={-358} width={72} height={28} rx={10} fill={dark} />
        <path d="M -52 -358 L -52 -392 Q -52 -404 -40 -404 L 40 -404 Q 52 -404 52 -392 L 52 -358" stroke={dark} strokeWidth={14} strokeLinecap="round" fill="none" />
        {/* pressure gauge with a needle */}
        <circle cx={22} cy={-340} r={14} fill={C.white} />
        <path d="M 22 -340 L 30 -348" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        {/* nozzle horn at the end of the hose */}
        <path d="M 84 -200 L 120 -238 L 136 -224 L 100 -184 Z" fill={dark} />
        {spray && jets.map((t, i) => (
          <circle key={i} cx={132 + t * 200} cy={-232 - t * 60 + t * t * 90} r={6 + t * 16} fill={C.skyDeep} opacity={0.9 * (1 - t)} />
        ))}
      </g>
    </g>
  );
}
