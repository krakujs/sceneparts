import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Fire spirit: a floating living flame with a cheerful face and little flame-tongue arms. Origin = bottom of the
// flame (it hovers above y); about 680 px tall and 460 px wide at s = 1.
// anim "flicker": the flame dances, the arms wave and the spirit bobs gently.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);

// A flame with its round base centred on (0,-210) and its tip at (tx, ty).
const flame = (tx: number, ty: number) =>
  `M -210 -210 A 210 210 0 0 0 210 -210 C 230 -330 120 -470 ${f1(tx)} ${f1(ty)} C ${f1(tx - 120)} -470 -230 -330 -210 -210 Z`;

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1100;
  const on = p.anim === "flicker";
  const t1 = (f * 2 * Math.PI) / 31, t2 = (f * 2 * Math.PI) / 19, t3 = (f * 2 * Math.PI) / 44;
  const tipX = on ? 26 * Math.sin(t1) : 0;
  const tipY = on ? -660 + 22 * Math.sin(t2 + 1) : -660;
  const midX = on ? 22 * Math.sin(t2 + 2) : 0;
  const midY = on ? -610 + 18 * Math.sin(t1) : -610;
  const inX = on ? 16 * Math.sin(t1 + 1) : 0;
  const inY = on ? -560 + 16 * Math.sin(t2) : -560;
  const bob = on ? -(Math.sin(t3) + 1) * 12 : 0;
  const wave = on ? Math.sin(t2 * 2) : 0;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* floating shadow */}
      <ellipse cx={0} cy={60 - bob * 0.4} rx={150 + bob * 0.6} ry={22} fill={C.shadow} opacity={0.6} />
      {/* flame arms */}
      <path d={`M -196 -236 Q -300 -250 ${f1(-332 + 12 * wave)} ${f1(-310 + 22 * wave)}`} stroke={C.orange} strokeWidth={42} fill="none" strokeLinecap="round" />
      <path d={`M 196 -236 Q 300 -250 ${f1(332 - 12 * wave)} ${f1(-310 - 22 * wave)}`} stroke={C.orange} strokeWidth={42} fill="none" strokeLinecap="round" />
      {/* layered flame: red outside, orange, yellow, white core */}
      <path d={flame(tipX, tipY)} fill={body} />
      <g transform="scale(0.74)">
        <path d={flame(midX, midY)} fill={C.orange} />
      </g>
      <g transform="scale(0.46)">
        <path d={flame(inX / 0.46, inY / 0.46)} fill={C.yellow} />
      </g>
      <g transform="translate(0 -30) scale(0.22)">
        <path d={flame(0, -560)} fill="#FFF6CC" />
      </g>
      {/* face */}
      <ellipse cx={-74} cy={-268} rx={22} ry={30} fill={C.ink} />
      <ellipse cx={74} cy={-268} rx={22} ry={30} fill={C.ink} />
      <circle cx={-68} cy={-278} r={8} fill={C.white} />
      <circle cx={80} cy={-278} r={8} fill={C.white} />
      <circle cx={-128} cy={-200} r={26} fill="#F27BA6" opacity={0.5} />
      <circle cx={128} cy={-200} r={26} fill="#F27BA6" opacity={0.5} />
      <path d="M -40 -190 Q 0 -150 40 -190" stroke={C.ink} strokeWidth={12} fill="none" strokeLinecap="round" />
    </g>
  );
}
