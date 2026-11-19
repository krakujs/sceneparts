import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Old crank hand drill (egg-beater style), upright with the bit pointing down to the floor.
// A straight blue body carries a big toothed side gear with a crank handle; a wooden top grip sits on top,
// and a chuck and drill bit sit at the bottom. anim "spin": the gear, crank and bit turn.
// Origin = bit tip on the floor. Room scale: about 600 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.blue;
  const gear = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spinning = anim === "spin";
  const turn = spinning ? f * 6 : 0;
  const flute = spinning ? Math.sin(f * 0.6) * 5 : 0;
  const teeth = Array.from({ length: 16 }, (_, k) => k);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* bit, with flutes that turn as it spins */}
        <polygon points="-9,-200 9,-200 9,-40 0,0 -9,-40" fill={C.grey} />
        <rect x={-3 + flute} y={-190} width={5} height={140} rx={2} fill={C.greyLight} />
        <rect x={-2 - flute} y={-190} width={4} height={140} rx={2} fill={C.greyLight} opacity={0.6} />
        {/* chuck and collar */}
        <rect x={-26} y={-236} width={52} height={40} rx={8} fill={gear} />
        <rect x={-18} y={-250} width={36} height={16} rx={6} fill={shade(gear, 0.2)} />
        {/* straight body */}
        <rect x={-22} y={-560} width={44} height={310} rx={12} fill={body} />
        <rect x={-22} y={-560} width={10} height={310} rx={5} fill={shade(body, 0.15)} />
        {/* wooden top grip */}
        <rect x={-70} y={-600} width={140} height={44} rx={20} fill={C.brown} />
        <rect x={-70} y={-600} width={140} height={12} rx={6} fill={C.brownDark} />
        {/* big toothed side gear with crank handle, all turning together */}
        <g transform={`translate(100 -390) rotate(${f1(turn)})`}>
          {teeth.map((k) => (
            <rect key={k} x={-19} y={-205} width={38} height={62} rx={6} fill={gear} transform={`rotate(${f1(k * 22.5)})`} />
          ))}
          <circle cx={0} cy={0} r={172} fill={gear} />
          <circle cx={0} cy={0} r={122} fill={shade(gear, 0.25)} />
          <circle cx={0} cy={0} r={46} fill={C.greyLight} />
          <circle cx={0} cy={0} r={14} fill={gear} />
          <line x1={0} y1={0} x2={250} y2={0} stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
          <circle cx={250} cy={0} r={34} fill={C.brown} />
        </g>
      </g>
    </g>
  );
}
