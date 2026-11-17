import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall light switch: a rounded plate with four corner screws and a rocker. The pressed half shows the state:
// variant "on" presses the top half in, "off" presses the bottom half. anim "toggle" flips it every second.
// Wall item: centred on (x, y), default y 760, no ground shadow.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(Math.min(1, Math.max(0, f / 20)))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.12);
  const toggling = p.anim === "toggle";
  const on = toggling ? Math.floor(f / 30) % 2 === 0 : p.variant !== "off";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(toggling ? "none" : (p.anim ?? "none"), f)}>
        {/* plate */}
        <rect x={-150} y={-170} width={300} height={340} rx={36} fill={c} />
        <rect x={-150} y={150} width={300} height={20} rx={10} fill={dk} opacity={0.5} />
        {[[-120, -140], [120, -140], [-120, 140], [120, 140]].map(([sx, sy]) => (
          <circle key={`${sx}${sy}`} cx={sx} cy={sy} r={9} fill={C.greyDark} opacity={0.45} />
        ))}
        {/* rocker: the pressed half sits in (darker), the other half stands out */}
        <rect x={-92} y={-112} width={184} height={224} rx={28} fill={C.greyLight} />
        <rect x={-80} y={on ? -100 : 4} width={160} height={96} rx={22} fill={shade(C.greyLight, 0.3)} />
        <rect x={-60} y={on ? -82 : 22} width={120} height={10} rx={5} fill={C.white} opacity={0.7} />
      </g>
    </g>
  );
}
