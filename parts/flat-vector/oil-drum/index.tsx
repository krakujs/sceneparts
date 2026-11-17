import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Metal 200 L oil drum, upright, side view with vertical ribs and a bung on top. About 380 px wide and 540 px tall at s = 1.
// Origin = bottom centre (stands on y). color sets the drum colour. anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const RIBS = [-150, -90, -30, 30, 90, 150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-180} y={-540} width={360} height={530} rx={34} fill={body} />
        {/* ribs: vertical raised bands */}
        {RIBS.map((rx, i) => (
          <rect key={i} x={rx - 10} y={-520} width={20} height={490} rx={8} fill={shade(body, 0.22)} />
        ))}
        {/* shaded right edge */}
        <rect x={120} y={-520} width={60} height={490} rx={24} fill={shade(body, 0.3)} opacity={0.6} />
        {/* top and bottom rims */}
        <rect x={-190} y={-552} width={380} height={28} rx={12} fill={shade(body, 0.2)} />
        <rect x={-190} y={-22} width={380} height={22} rx={10} fill={shade(body, 0.3)} />
        {/* bung on top */}
        <rect x={-36} y={-572} width={72} height={26} rx={10} fill={C.greyDark} />
        {/* label band with no text */}
        <rect x={-180} y={-340} width={360} height={80} fill={C.white} opacity={0.18} />
      </g>
    </g>
  );
}
