import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bar of soap on a white dish, with bubbles around it. Origin = bottom centre; hero size.
// anim "bubbles" makes the bubbles rise and fade above the bar.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};
const BUBBLES = [
  { x: -200, y: -180, r: 14, o: 0 }, { x: -120, y: -230, r: 20, o: 20 }, { x: -30, y: -200, r: 11, o: 40 },
  { x: 60, y: -250, r: 18, o: 10 }, { x: 150, y: -200, r: 13, o: 30 }, { x: 210, y: -150, r: 9, o: 50 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.lime;
  const rising = p.anim === "bubbles";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* dish: rim ellipse over a shallow body */}
        <path d="M -230 -50 Q -220 -4 0 -4 Q 220 -4 230 -50 Z" fill={shade(C.white, 0.12)} />
        <ellipse cx={0} cy={-50} rx={230} ry={26} fill={C.white} />
        <ellipse cx={0} cy={-50} rx={170} ry={14} fill={shade(C.white, 0.08)} />
        {/* bar with a lighter top edge and a darker right side */}
        <rect x={-170} y={-170} width={340} height={120} rx={40} fill={c} />
        <path d="M 110 -170 H 130 A 40 40 0 0 1 170 -130 V -90 A 40 40 0 0 1 130 -50 H 110 Z" fill={shade(c, 0.2)} />
        <rect x={-150} y={-166} width={300} height={18} rx={9} fill={C.white} opacity={0.3} />
        {/* bubbles, rising and fading when animated */}
        {BUBBLES.map((b, i) => {
          const t = rising ? (((f * 1.2) + b.o) % 80) / 80 : 0;
          return (
            <circle key={i} cx={b.x + (rising ? Math.sin(t * 6 + i) * 6 : 0)} cy={b.y - t * 90} r={b.r}
              fill={C.white} opacity={rising ? 0.9 * (1 - t) : 0.85} />
          );
        })}
      </g>
    </g>
  );
}
