import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Road sign on a pole. kind: stop-octagon (blank red octagon), give-way (triangle), no-entry (round, white bar),
// arrow (blue circle, white up arrow), warning (yellow diamond with an exclamation mark). No words.
// Origin = pole base. Room scale: about 930 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
// Corner points of a regular n-gon of radius r, first corner at angle rot (degrees, SVG y-down).
const poly = (n: number, r: number, rot: number) =>
  Array.from({ length: n }, (_, k) => { const a = ((rot + (360 * k) / n) * Math.PI) / 180; return `${f1(r * Math.cos(a))},${f1(r * Math.sin(a))}`; }).join(" ");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pole = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const kind: string = p.kind ?? "stop-octagon";
  let face;
  if (kind === "give-way") {
    face = (<g><polygon points={poly(3, 200, 90)} fill={C.red} /><polygon points={poly(3, 140, 90)} fill={C.white} /></g>);
  } else if (kind === "no-entry") {
    face = (<g><circle r={190} fill={C.red} /><rect x={-130} y={-34} width={260} height={68} rx={20} fill={C.white} /></g>);
  } else if (kind === "arrow") {
    face = (<g><circle r={190} fill={C.blue} /><polygon points="0,-130 -90,-30 90,-30" fill={C.white} /><rect x={-34} y={-40} width={68} height={150} rx={12} fill={C.white} /></g>);
  } else if (kind === "warning") {
    face = (<g><polygon points={poly(4, 210, -90)} fill={C.yellow} /><rect x={-18} y={-120} width={36} height={150} rx={12} fill={C.ink} /><circle cx={0} cy={85} r={20} fill={C.ink} /></g>);
  } else {
    face = (<g><polygon points={poly(8, 190, 22.5)} fill={C.red} /><polygon points={poly(8, 158, 22.5)} fill={C.white} /></g>);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-60} y={-28} width={120} height={28} rx={8} fill={pole} />
        <rect x={-12} y={-700} width={24} height={700} fill={pole} />
        <g transform="translate(0 -720)">{face}</g>
        <rect x={-14} y={-560} width={28} height={12} rx={4} fill={shade(pole, 0.2)} />
      </g>
    </g>
  );
}
