import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Push lawn mower, room scale: about 630 px wide and 570 px tall at s = 1. Origin = floor centre under the deck.
// anim "roll": the wheels turn; "vibrate": the engine shakes.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "vibrate") return `translate(${f1(Math.sin((f * 2 * Math.PI) / 5) * 1.8)} 0)`;
  return "";
};
const WHEELS: [number, number][] = [[-200, -70], [180, -70]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const engine = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? (f * 8) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-20} cy={0} rx={340} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -220 -200 L -300 -500 L -350 -520" fill="none" stroke={engine} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={-392} y={-544} width={64} height={40} rx={16} fill={C.ink} />
        {WHEELS.map(([wx, wy]) => (
          <g key={wx}>
            <circle cx={wx} cy={wy} r={70} fill={C.ink} />
            <g transform={`rotate(${f1(spin)} ${wx} ${wy})`}>
              <rect x={wx - 6} y={wy - 56} width={12} height={112} rx={6} fill={C.greyLight} />
              <rect x={wx - 6} y={wy - 56} width={12} height={112} rx={6} fill={C.greyLight} transform={`rotate(90 ${wx} ${wy})`} />
            </g>
            <circle cx={wx} cy={wy} r={22} fill={C.grey} />
          </g>
        ))}
        <rect x={-250} y={-200} width={450} height={110} rx={22} fill={body} />
        <rect x={-250} y={-112} width={450} height={24} rx={12} fill={shade(body, 0.3)} />
        <rect x={-130} y={-296} width={190} height={100} rx={16} fill={engine} />
        <circle cx={-40} cy={-300} r={18} fill={shade(engine, 0.3)} />
        <rect x={-110} y={-270} width={44} height={50} rx={8} fill={shade(engine, 0.25)} />
        <rect x={150} y={-196} width={70} height={58} rx={12} fill={shade(body, 0.2)} />
        <rect x={-200} y={-180} width={300} height={10} rx={5} fill={C.white} opacity={0.25} />
      </g>
    </g>
  );
}
