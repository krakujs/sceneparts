import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Classic light bulb with a screw base, standing on its tip. Origin = bottom tip on the floor or table.
// anim "on" lights the filament, brightens the glass and throws glow rings and rays.
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
  const glass = p.color && p.color !== "none" ? p.color : "#FFE9A3";
  const metal = C.grey;
  const anim: string = p.anim ?? "none";
  const on = anim === "on";
  const k = on ? 0.9 + 0.1 * Math.sin((f * 2 * Math.PI) / 50) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={70} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {on && (
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x={-7} y={-206} width={14} height={40} rx={7} fill={C.yellow} opacity={0.85 * k}
                transform={`translate(0 -262) rotate(${i * 45}) translate(0 ${f1(4 * Math.sin((f * 2 * Math.PI) / 50))})`} />
            ))}
            <circle cx={0} cy={-262} r={300} fill={C.yellow} opacity={0.07 * k} />
            <circle cx={0} cy={-262} r={230} fill={C.yellow} opacity={0.11 * k} />
            <circle cx={0} cy={-262} r={170} fill={C.yellow} opacity={0.16 * k} />
          </g>
        )}
        <path d="M -72 -150 C -110 -180 -122 -210 -122 -262 A 122 122 0 0 1 122 -262 C 122 -210 110 -180 72 -150 Z" fill={glass} />
        <path d="M 60 -360 A 122 122 0 0 1 122 -262 C 122 -210 110 -180 72 -150 L 40 -150 C 80 -180 92 -210 92 -262 C 92 -300 78 -336 60 -360 Z" fill={shade(glass, 0.12)} />
        <ellipse cx={-56} cy={-300} rx={14} ry={34} fill={C.white} opacity={0.6} transform="rotate(20 -56 -300)" />
        {on && <circle cx={0} cy={-262} r={118} fill={C.white} opacity={0.35 * k} />}
        <path d="M -24 -150 V -200 Q -12 -230 0 -200 Q 12 -230 24 -200 V -150" fill="none" stroke={on ? C.orange : C.grey} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={-68} y={-150} width={136} height={80} rx={14} fill={metal} />
        <rect x={-68} y={-138} width={136} height={12} rx={4} fill={shade(metal, 0.25)} />
        <rect x={-68} y={-116} width={136} height={12} rx={4} fill={shade(metal, 0.25)} />
        <rect x={-68} y={-94} width={136} height={12} rx={4} fill={shade(metal, 0.25)} />
        <rect x={-40} y={-70} width={80} height={70} rx={10} fill={C.greyDark} />
      </g>
    </g>
  );
}
