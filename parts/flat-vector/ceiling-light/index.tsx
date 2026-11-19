import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ceiling light: dome pendant hanging from a cord. Origin = where the cord meets the ceiling (top centre).
// anim "on" switches the glow on, "swing" makes it sway gently from the ceiling.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 0;
  const c = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const on = anim === "on";
  const k = on ? 0.92 + 0.08 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const sway = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 90) * 4 : 0;
  const inner = on ? "#FFF3C4" : shade(c, 0.45);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(sway)})`}>
          {on && (
            <g>
              <circle cx={0} cy={440} r={360} fill={C.yellow} opacity={0.07 * k} />
              <circle cx={0} cy={440} r={260} fill={C.yellow} opacity={0.11 * k} />
              <circle cx={0} cy={440} r={190} fill={C.yellow} opacity={0.16 * k} />
            </g>
          )}
          <rect x={-3} y={0} width={6} height={300} fill={C.inkSoft} />
          <rect x={-22} y={0} width={44} height={16} rx={6} fill={C.inkSoft} />
          <circle cx={0} cy={300} r={12} fill={shade(c, 0.3)} />
          <path d="M -170 420 C -170 340 -90 300 0 300 C 90 300 170 340 170 420 Z" fill={c} />
          <path d="M 60 316 C 120 340 170 372 170 420 L 110 420 C 110 380 90 340 60 316 Z" fill={shade(c, 0.2)} />
          <ellipse cx={0} cy={420} rx={170} ry={22} fill={shade(c, 0.2)} />
          <ellipse cx={0} cy={420} rx={150} ry={16} fill={inner} />
          <circle cx={0} cy={432} r={26} fill={on ? "#FFF6D0" : C.white} />
        </g>
      </g>
    </g>
  );
}
