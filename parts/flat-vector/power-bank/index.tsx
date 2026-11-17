import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Power bank: an upright battery pack with four level LEDs, a power button and a cable from its charging port,
// plugged into a short lead on the floor. Origin = bottom centre (on the floor). anim "fill": the LEDs fill up in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const lit = anim === "fill" ? Math.floor((f % 80) / 20) + 1 : 3;
  const LEDS = [-72, -24, 24, 72];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* cable from the bottom port, lying on the floor, ending in a plug */}
        <path d="M 0 -6 C 30 4 80 6 140 4 S 200 -4 236 -4" fill="none" stroke={C.inkSoft} strokeWidth={14} strokeLinecap="round" />
        <rect x={226} y={-22} width={40} height={26} rx={8} fill={C.greyDark} />
        <rect x={-130} y={-414} width={260} height={414} rx={34} fill={body} />
        <rect x={-106} y={-396} width={16} height={300} rx={8} fill={C.white} opacity={0.25} />
        <rect x={-130} y={-120} width={260} height={120} rx={34} fill={shade(body, 0.12)} opacity={0.6} />
        {LEDS.map((lx, i) => (
          <circle key={lx} cx={lx} cy={-350} r={13} fill={i < lit ? C.yellow : shade(body, 0.35)} />
        ))}
        <circle cx={0} cy={-270} r={22} fill={shade(body, 0.25)} />
        <circle cx={0} cy={-270} r={8} fill={C.white} />
        <rect x={-26} y={-14} width={52} height={14} rx={5} fill={C.ink} />
      </g>
    </g>
  );
}
