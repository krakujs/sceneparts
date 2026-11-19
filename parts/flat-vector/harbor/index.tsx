import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Harbour quay at the water's edge: bollards, a stack of containers and a warehouse. Origin = quay centre on the waterline.
// About 1000 px wide and 620 px tall at s = 1 (the water lies in front, the quay behind).
// anim "lights": the warehouse lamps and the crane light glow in turn.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const box = p.color && p.color !== "none" ? p.color : C.orange;
  const wall = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const lamp = (i: number) => (anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 12) / 6)) : 0.95);
  const containers = [
    { x: -420, y: -110, c: box }, { x: -300, y: -110, c: C.blue }, { x: -180, y: -110, c: C.teal },
    { x: -360, y: -200, c: C.blue }, { x: -240, y: -200, c: box },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* water in front */}
      <rect x={-520} y={0} width={1040} height={40} rx={6} fill={C.skyDeep} />
      <path d="M -460 16 Q -420 6 -380 16 T -300 16" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      <path d="M 220 26 Q 260 16 300 26 T 380 26" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      {/* quay edge */}
      <rect x={-520} y={-40} width={1040} height={40} rx={6} fill={C.grey} />
      <rect x={-520} y={-46} width={1040} height={8} rx={4} fill={C.greyLight} />
      {/* warehouse at the back */}
      <rect x={140} y={-400} width={360} height={360} rx={8} fill={wall} />
      <path d="M 120 -400 L 320 -480 L 520 -400 Z" fill={C.blueDark} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={180 + k * 110} y={-180} width={80} height={140} rx={4} fill={C.greyDark} />
      ))}
      {[0, 1, 2].map((k) => (
        <rect key={k} x={180 + k * 110} y={-340} width={80} height={60} rx={6} fill={C.skyDeep} />
      ))}
      {[0, 1].map((k) => (
        <circle key={k} cx={220 + k * 180} cy={-362} r={8} fill={C.yellow} opacity={lamp(k)} />
      ))}
      {/* stacked shipping containers */}
      {containers.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y - 90} width={120} height={90} rx={4} fill={b.c} />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={b.x + 10 + k * 36} y={b.y - 84} width={6} height={78} fill={shade(b.c, 0.2)} />
          ))}
        </g>
      ))}
      {/* bollards along the edge */}
      {[-480, -320, -160, 0, 160, 320, 480].map((bx) => (
        <g key={bx}>
          <rect x={bx - 12} y={-96} width={24} height={56} rx={6} fill={C.greyDark} />
          <rect x={bx - 14} y={-102} width={28} height={10} rx={4} fill={C.ink} />
        </g>
      ))}
      {/* mooring rope from a bollard to the water */}
      <path d="M -160 -40 Q -140 10 -110 -6" fill="none" stroke={C.brown} strokeWidth={6} strokeLinecap="round" />
      {/* a small dock crane */}
      <rect x={-20} y={-360} width={12} height={320} fill={C.yellowDark} />
      <rect x={-20} y={-368} width={150} height={14} rx={5} fill={C.yellowDark} />
      <circle cx={122} cy={-364} r={9} fill={C.red} opacity={lamp(3)} />
    </g>
  );
}
