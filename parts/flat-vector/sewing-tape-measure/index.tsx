import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Soft cloth tailor's tape measure: a rolled coil with the tape strip running out to the right and tick marks.
// Hero scale. Origin = floor centre under the coil. anim "unroll" slides the tape strip out and back.
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
  const body = p.color && p.color !== "none" ? p.color : "#FFE38A";
  const ink = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const slide = anim === "unroll" ? 30 * (1 - Math.cos((f * 2 * Math.PI) / 90)) / 2 : 0;
  const ticks = Array.from({ length: 9 }, (_, i) => i);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={230} ry={13} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* tape strip running out of the coil */}
        <g transform={`translate(${f1(slide)} 0)`}>
          <rect x={120} y={-104} width={200} height={34} rx={10} fill={body} />
          <rect x={300} y={-112} width={22} height={50} rx={8} fill={shade(body, 0.2)} />
          {ticks.map((i) => (
            <rect key={i} x={140 + i * 18} y={-96} width={5} height={14} rx={2} fill={ink} />
          ))}
        </g>
        {/* coil: underside, top layer, groove and hollow centre */}
        <ellipse cx={-20} cy={-72} rx={180} ry={76} fill={shade(body, 0.22)} />
        <ellipse cx={-20} cy={-86} rx={180} ry={76} fill={body} />
        <ellipse cx={-20} cy={-86} rx={124} ry={50} fill="none" stroke={shade(body, 0.14)} strokeWidth={12} />
        <ellipse cx={-20} cy={-86} rx={70} ry={28} fill={shade(body, 0.14)} />
        <ellipse cx={-20} cy={-86} rx={22} ry={10} fill={C.inkSoft} />
      </g>
    </g>
  );
}
