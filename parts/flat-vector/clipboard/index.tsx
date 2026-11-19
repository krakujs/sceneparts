import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Clipboard: brown board, metal clip at the top and a checklist sheet with tick boxes and grey lines.
// anim "check": the ticks appear one by one (every 18 frames), then stay. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const ITEMS = [-430, -360, -290, -220, -150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const board = p.color && p.color !== "none" ? p.color : C.brown;
  const tick = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* board */}
        <rect x={-180} y={-600} width={360} height={600} rx={26} fill={board} />
        <rect x={-180} y={-60} width={360} height={60} rx={26} fill={shade(board, 0.2)} />
        {/* sheet */}
        <rect x={-150} y={-540} width={300} height={500} rx={8} fill={C.white} />
        <rect x={-110} y={-504} width={220} height={22} rx={11} fill={C.greyDark} />
        {/* checklist */}
        {ITEMS.map((cy, i) => {
          const on = anim !== "check" || f >= 12 + i * 18;
          return (
            <g key={i}>
              <rect x={-118} y={cy - 22} width={44} height={44} rx={8} fill={C.greyLight} />
              <rect x={-118} y={cy + 14} width={44} height={8} rx={4} fill={shade(C.greyLight, 0.1)} />
              {on && (
                <path d={`M ${-110} ${cy} L ${-101} ${cy + 10} L ${-84} ${cy - 12}`} stroke={tick} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              )}
              <rect x={-54} y={cy - 7} width={150} height={14} rx={7} fill={C.grey} />
            </g>
          );
        })}
        {/* metal clip */}
        <rect x={-90} y={-630} width={180} height={76} rx={16} fill={C.grey} />
        <rect x={-90} y={-630} width={180} height={18} rx={9} fill={C.greyLight} />
        <rect x={-56} y={-612} width={112} height={36} rx={10} fill={shade(C.grey, 0.35)} />
      </g>
    </g>
  );
}
