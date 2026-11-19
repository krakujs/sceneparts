import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bathtub, about 940 px wide at s = 1. variant "built-in": tub sits on the floor; "clawfoot": raised on four claw feet.
// Origin = bottom centre. anim "bubbles" sends bubbles rising from the water.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};
// Bubble columns across the water, with a size for each.
const BUBBLES = [
  { x: -340, r: 18, o: 0 }, { x: -220, r: 12, o: 30 }, { x: -110, r: 22, o: 14 },
  { x: 20, r: 14, o: 46 }, { x: 150, r: 20, o: 8 }, { x: 280, r: 13, o: 38 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const claw = p.variant === "clawfoot";
  const dy = claw ? -80 : 0;
  const bubbles = p.anim === "bubbles";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={500} ry={20} fill={C.shadow} />
      {claw && [-390, -250, 250, 390].map((fx) => (
        <ellipse key={fx} cx={fx} cy={-36} rx={24} ry={36} fill={Math.abs(fx) > 300 ? C.greyDark : shade(C.greyDark, 0.2)} />
      ))}
      <g transform={`${motion(p.anim ?? "none", f)} translate(0 ${dy})`}>
        {/* tap: a pipe rising from behind the rim and curving over the tub */}
        <path d="M -340 -446 V -520 Q -340 -552 -308 -552 H -262 Q -236 -552 -236 -526 V -500" stroke={C.greyDark} strokeWidth={26} strokeLinecap="round" fill="none" />
        {/* tub body with a darker band along the bottom */}
        <rect x={-470} y={-420} width={940} height={420} rx={60} fill={c} />
        <path d="M -470 -110 L 470 -110 L 470 -60 Q 470 0 410 0 L -410 0 Q -470 0 -470 -60 Z" fill={shade(c, 0.12)} />
        {/* rim, dark interior and water surface */}
        <rect x={-480} y={-444} width={960} height={44} rx={22} fill={shade(c, 0.04)} />
        <rect x={-440} y={-436} width={880} height={36} rx={18} fill={shade(c, 0.25)} />
        <rect x={-430} y={-424} width={860} height={24} rx={12} fill={C.skyDeep} />
        <rect x={-400} y={-420} width={200} height={5} rx={2.5} fill={C.white} opacity={0.4} />
        {bubbles && BUBBLES.map((b, i) => {
          const t = (((f * 1.6) + b.o) % 110) / 110;
          return (
            <circle key={i} cx={b.x + Math.sin(t * 6 + i) * 8} cy={-420 - t * 160} r={b.r} fill={C.white} opacity={0.9 * (1 - t)} />
          );
        })}
      </g>
    </g>
  );
}
