import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wifi router: flat box with two angled antennas, vent slots on the right and status LEDs on the left.
// Origin = bottom centre (the router stands on y). anim "blink": each LED flickers at its own rate.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const LEDS = [
  { x: -170, c: C.green },
  { x: -134, c: C.green },
  { x: -98, c: C.yellow },
  { x: -62, c: C.blue },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.greyLight;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <line x1={-120} y1={-150} x2={-180} y2={-390} stroke={C.inkSoft} strokeWidth={14} strokeLinecap="round" />
        <line x1={120} y1={-150} x2={180} y2={-390} stroke={C.inkSoft} strokeWidth={14} strokeLinecap="round" />
        <circle cx={-180} cy={-392} r={14} fill={C.inkSoft} />
        <circle cx={180} cy={-392} r={14} fill={C.inkSoft} />
        <rect x={-230} y={-150} width={460} height={150} rx={42} fill={body} />
        <rect x={-210} y={-150} width={420} height={18} rx={9} fill={C.white} opacity={0.5} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={80} y={-118 + i * 22} width={130} height={8} rx={4} fill={shade(body, 0.25)} />
        ))}
        {LEDS.map((l, i) => {
          const on = anim !== "blink" || Math.floor(f / (10 + i * 5)) % 2 === 0;
          return <circle key={i} cx={l.x} cy={-70} r={9} fill={on ? l.c : shade(l.c, 0.55)} />;
        })}
        <rect x={-200} y={-22} width={400} height={6} rx={3} fill={shade(body, 0.3)} />
      </g>
    </g>
  );
}
