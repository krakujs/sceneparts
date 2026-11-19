import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Classic panelled football (soccer ball), generic: white ball, one black pentagon in the middle and five
// black pentagons around the rim. Origin = bottom centre; the ball rests on y. Hero size about 300 px at s = 1.
const f1 = (v: number) => v.toFixed(1);
const poly = (cx: number, cy: number, r: number, rot: number) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = ((rot + i * 72) * Math.PI) / 180;
    return `${f1(cx + Math.cos(a) * r)},${f1(cy + Math.sin(a) * r)}`;
  }).join(" ");

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const R = 150, cy = -R - 4;
  const panel = p.color && p.color !== "none" ? p.color : C.ink;
  const anim: string = p.anim ?? "none";
  const lift = anim === "bounce" ? Math.abs(Math.sin((f * 2 * Math.PI) / 30)) * 90 : 0;
  const spin = anim === "spin" ? f * 6 : 0;
  const k = 1 - 0.3 * (lift / 90);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130 * k} ry={11 * k} fill={C.shadow} />
      <g transform={`translate(0 ${f1(cy - lift)}) rotate(${f1(spin)})`}>
        <circle cx={0} cy={0} r={R} fill={C.greyLight} />
        <circle cx={-6} cy={-8} r={R - 6} fill={C.white} />
        <polygon points={poly(0, 0, 46, -90)} fill={panel} />
        {[0, 1, 2, 3, 4].map((i) => {
          const th = -90 + i * 72;
          const a = (th * Math.PI) / 180;
          return <polygon key={i} points={poly(Math.cos(a) * 110, Math.sin(a) * 110, 34, th + 180)} fill={panel} />;
        })}
      </g>
    </g>
  );
}
