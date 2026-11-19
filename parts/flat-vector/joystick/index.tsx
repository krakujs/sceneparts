import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Retro desktop joystick: round base, a stick with a ball top and one big fire button. Origin = bottom centre.
// anim "fire": the fire button presses down and the stick jiggles.
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
  const body = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const fire = anim === "fire";
  const press = fire ? (Math.sin((f * 2 * Math.PI) / 24) > 0.6 ? 10 : 0) : 0;
  const tilt = fire ? 4 * Math.sin((f * 2 * Math.PI) / 24) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "fire" ? "none" : anim, f)}>
        {/* base */}
        <rect x={-220} y={-80} width={440} height={80} rx={40} fill={body} />
        <rect x={-220} y={-30} width={440} height={30} rx={15} fill={shade(body, 0.3)} />
        <path d="M -180 -62 Q -60 -76 80 -62" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.25} />
        {/* fire button on the base */}
        <rect x={-110} y={-100 + press * 0.5} width={220} height={30} rx={14} fill={shade(body, 0.2)} />
        <circle cx={0} cy={-124 + press} r={38} fill={C.red} />
        <circle cx={-10} cy={-134 + press} r={12} fill={C.white} opacity={0.35} />
        {/* stick */}
        <g transform={`rotate(${f1(tilt)} 0 -100)`}>
          <rect x={-18} y={-420} width={36} height={300} rx={16} fill={C.greyLight} />
          <rect x={-10} y={-420} width={8} height={280} rx={4} fill={C.white} opacity={0.5} />
          <circle cx={0} cy={-440} r={44} fill={C.inkSoft} />
          <circle cx={-14} cy={-454} r={12} fill={C.white} opacity={0.3} />
        </g>
        {/* small side buttons */}
        <circle cx={-170} cy={-40} r={16} fill={C.yellow} />
        <circle cx={170} cy={-40} r={16} fill={C.green} />
      </g>
    </g>
  );
}
