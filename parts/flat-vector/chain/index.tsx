import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Length of big metal chain, hero scale: alternating oval links in side view, about 500 px long at s = 1.
// Links are drawn as true rings (even-odd hole), so the background shows through.
// Origin = bottom centre (the chain lies on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const LINKS = [-220, -150, -80, -10, 60, 130, 200];
// Ring path for an upright oval link centred at (cx, cy): outer half-size 36 x 80, bar 14.
const ring = (cx: number, cy: number) => {
  const ox = 36, oy = 80, ix = 22, iy = 66;
  return `M${cx - ox + 36} ${cy - oy} H${cx + ox - 36} A36 36 0 0 1 ${cx + ox} ${cy - oy + 36} V${cy + oy - 36} A36 36 0 0 1 ${cx + ox - 36} ${cy + oy} H${cx - ox + 36} A36 36 0 0 1 ${cx - ox} ${cy + oy - 36} V${cy - oy + 36} A36 36 0 0 1 ${cx - ox + 36} ${cy - oy} Z M${cx - ix + 22} ${cy - iy} H${cx + ix - 22} A22 22 0 0 1 ${cx + ix} ${cy - iy + 22} V${cy + iy - 22} A22 22 0 0 1 ${cx + ix - 22} ${cy + iy} H${cx - ix + 22} A22 22 0 0 1 ${cx - ix} ${cy + iy - 22} V${cy - iy + 22} A22 22 0 0 1 ${cx - ix + 22} ${cy - iy} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.grey;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : shade(body, 0.35);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {LINKS.map((lx, i) => (
          <path key={i} d={ring(lx, -80)} fill={i % 2 ? dark : body} fillRule="evenodd" />
        ))}
      </g>
    </g>
  );
}
