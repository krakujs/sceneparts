import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";

// Three-step winners' podium, front view: "2" on the left, "1" in the tallest centre step, "3" on the
// right. Each step has a flat top, a darker front face and a bold numeral. Origin = floor centre.
// Room-scale: about 800 px wide and 560 px tall at s = 1 (1 m tall).
const f1 = (v: number) => v.toFixed(1);
const ease = (t: number) => t * t * (3 - 2 * t);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.yellow;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const c3 = p.color3 && p.color3 !== "none" ? p.color3 : "#E0A07A";
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  // rise: steps grow from zero height, centre first then the sides
  const grow = (delay: number) => (anim === "rise" ? ease(Math.min(1, Math.max(0, (f - delay) / 30))) : 1);
  const step = (x0: number, w: number, h: number, col: string, num: string, delay: number, numSize: number) => {
    const g = grow(delay);
    const hh = h * g;
    return (
      <g key={num}>
        <rect x={x0} y={-hh} width={w} height={hh} fill={shade(col, 0.2)} />
        <rect x={x0} y={-hh} width={w} height={Math.min(hh, 24)} fill={col} />
        <rect x={x0 + 10} y={-hh + 34} width={w - 20} height={Math.max(0, hh - 70)} rx={10} fill={shade(col, 0.1)} opacity={0.6} />
        {g > 0.6 && (
          <text x={x0 + w / 2} y={-hh + 70 + numSize * 0.5} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={numSize} fill={C.ink} opacity={Math.min(1, (g - 0.6) * 2.5)}>{num}</text>
        )}
      </g>
    );
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {step(-400, 250, 300, c2, "2", 8, 130)}
        {step(-130, 260, 460, c1, "1", 0, 160)}
        {step(150, 250, 190, c3, "3", 16, 120)}
      </g>
    </g>
  );
}
