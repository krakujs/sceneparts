import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

const f1 = (v: number) => v.toFixed(1);
const popS = (f: number, d = 0) => { const t = Math.min(1, Math.max(0, (f - d) / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};
const col = (v: unknown, d: string) => (typeof v === "string" && v && v !== "none" ? v : d);

// Three big steel nails lying crossed on the floor in side view: flat heads, long shanks and sharp points.
// Origin = floor centre. Hero size: about 440 px across at s = 1. anim pop drops them in one by one.
const NAILS = [
  { x: -10, y: -26, a: 0, L: 400, d: 0 },
  { x: 20, y: -78, a: -9, L: 360, d: 6 },
  { x: -30, y: -122, a: 11, L: 330, d: 12 },
];
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const steel = col(p.color, C.grey);
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={anim === "bob" ? motion("bob", f) : ""}>
        {NAILS.map((n, i) => {
          const sc = anim === "pop" ? popS(f, n.d) : 1;
          const h = n.L / 2;
          return (
            <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${n.a}) scale(${f1(sc)})`}>
              <rect x={-h + 20} y={-14} width={n.L - 20 - 50} height={28} rx={5} fill={steel} />
              <rect x={-h + 20} y={4} width={n.L - 20 - 50} height={10} rx={4} fill={shade(steel, 0.22)} />
              <polygon points={`${h - 52},-14 ${h},0 ${h - 52},14`} fill={steel} />
              <rect x={-h} y={-40} width={30} height={80} rx={8} fill={shade(steel, 0.3)} />
              <rect x={-h + 40} y={-10} width={n.L * 0.45} height={6} rx={3} fill={C.white} opacity={0.4} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
