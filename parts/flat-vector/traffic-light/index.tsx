import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Traffic light: a pole with a three-lamp housing (red top, amber middle, green bottom), lamp hoods and a base.
// Param light picks the lit lamp; anim "cycle" runs red (90 frames), green (90), amber (30) and repeats every 210 frames.
// Origin = pole base. Room scale: about 1100 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const housing = p.color && p.color !== "none" ? p.color : C.ink;
  const pole = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const ph = f % 210;
  const active = anim === "cycle" ? (ph < 90 ? "red" : ph < 180 ? "green" : "amber") : p.light ?? "green";
  const lamps = [
    { name: "red", cy: -1030, col: C.red },
    { name: "amber", cy: -880, col: C.yellow },
    { name: "green", cy: -730, col: C.green },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <rect x={-70} y={-40} width={140} height={40} rx={10} fill={pole} />
        <rect x={-14} y={-1000} width={28} height={960} fill={pole} />
        <rect x={-85} y={-1100} width={170} height={440} rx={36} fill={housing} />
        {lamps.map((l) => {
          const on = active === l.name;
          return (
            <g key={l.name}>
              <rect x={-64} y={l.cy - 70} width={128} height={14} rx={7} fill={shade(housing, 0.3)} />
              <circle cx={0} cy={l.cy} r={56} fill={on ? l.col : shade(l.col, 0.6)} />
              {on ? <circle cx={-18} cy={l.cy - 20} r={12} fill={C.white} opacity={0.55} /> : null}
            </g>
          );
        })}
      </g>
    </g>
  );
}
