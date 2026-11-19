import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Table lamp: drum shade on a short stem and a round base. Origin = base centre.
// anim "on" switches the warm glow on around the shade and on the table.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.sand;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.teal;
  const anim: string = p.anim ?? "none";
  const on = anim === "on";
  const k = on ? 0.92 + 0.08 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const inner = on ? "#FFF3C4" : shade(c, 0.35);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {on && (
          <g>
            <ellipse cx={0} cy={-4} rx={210} ry={22} fill={C.yellow} opacity={0.3 * k} />
            <circle cx={0} cy={-265} r={330} fill={C.yellow} opacity={0.07 * k} />
            <circle cx={0} cy={-265} r={250} fill={C.yellow} opacity={0.11 * k} />
            <circle cx={0} cy={-265} r={180} fill={C.yellow} opacity={0.16 * k} />
          </g>
        )}
        <rect x={-12} y={-220} width={24} height={180} rx={10} fill={c2} />
        <ellipse cx={0} cy={-22} rx={130} ry={22} fill={c2} />
        <path d="M -130 -22 A 130 22 0 0 0 130 -22 Z" fill={shade(c2, 0.2)} />
        <path d="M -100 -330 L -140 -200 A 140 26 0 0 0 140 -200 L 100 -330 Z" fill={c} />
        <path d="M 60 -326 L 100 -330 L 140 -200 L 104 -200 Z" fill={shade(c, 0.15)} />
        <ellipse cx={0} cy={-330} rx={100} ry={18} fill={inner} />
      </g>
    </g>
  );
}
