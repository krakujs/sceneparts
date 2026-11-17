import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Server rack: tall cabinet with nine stacked units, each with drive slots and status LEDs. Room scale.
// Origin = bottom centre (the cabinet stands on y). anim "blink": the unit LEDs flash at different rates.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const UNITS = Array.from({ length: 9 }, (_, i) => -960 + i * 100);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const frame = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const blink = anim === "blink";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-240} y={-24} width={480} height={24} rx={6} fill={shade(frame, 0.3)} />
        <rect x={-230} y={-1000} width={460} height={980} rx={14} fill={frame} />
        <rect x={-200} y={-970} width={400} height={900} fill={shade(frame, 0.35)} />
        {UNITS.map((uy, i) => (
          <g key={i}>
            <rect x={-186} y={uy} width={372} height={92} rx={6} fill={C.inkSoft} />
            <rect x={-186} y={uy + 84} width={372} height={8} rx={3} fill={shade(C.inkSoft, 0.3)} />
            {[0, 1, 2, 3].map((k) => (
              <rect key={k} x={-160 + k * 34} y={uy + 30} width={24} height={30} rx={3} fill={C.greyDark} />
            ))}
            {[0, 1, 2, 3].map((k) => (
              <rect key={k} x={-160 + k * 34 + 6} y={uy + 38} width={12} height={4} rx={2} fill={shade(C.greyDark, 0.4)} />
            ))}
            <circle cx={110} cy={uy + 30} r={7} fill={!blink || Math.floor(f / (8 + i * 3)) % 2 === 0 ? C.green : shade(C.green, 0.6)} />
            <circle cx={132} cy={uy + 30} r={7} fill={!blink || Math.floor(f / (11 + i * 2)) % 2 === 0 ? C.yellow : shade(C.yellow, 0.6)} />
            <circle cx={154} cy={uy + 30} r={7} fill={C.blue} />
          </g>
        ))}
      </g>
    </g>
  );
}
