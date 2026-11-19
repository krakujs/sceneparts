import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small roadside tea stall, front view: open front with a shelf of glasses, a stove with a kettle on a burner,
// a counter with jars, a tiled gable roof and a bench out front. Origin = bottom centre; the stall stands on y.
// About 760 px wide and 800 px tall at s = 1.
// anim "lights": flames flicker on the stove and steam rises from the kettle. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const walls = p.color && p.color !== "none" ? p.color : C.sand;
  const roof = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const lights = anim === "lights";
  const flick = lights ? Math.sin(f * 0.9) * 8 : 0;
  const puff = (cx: number, base: number, k: number) => {
    const r = lights ? (f * 2 + k * 40) % 120 : 30 + k * 32;
    return (
      <circle key={`${cx}-${k}`} cx={f1(cx + (k % 2 ? 6 : -6) * (r / 120))} cy={f1(base - r)} r={f1(16 + r * 0.12)}
        fill={C.white} opacity={f1(lights ? 0.9 * (1 - r / 120) : 0.7)} />
    );
  };
  const rows = [-630, -670, -710, -750];
  const halfAt = (yy: number) => 360 * (yy + 790) / 200;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={16} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* back wall and open front */}
        <rect x={-330} y={-560} width={660} height={560} rx={10} fill={walls} />
        <rect x={-230} y={-470} width={460} height={250} rx={6} fill={shade(walls, 0.45)} />
        <rect x={-210} y={-400} width={420} height={12} rx={4} fill={C.brown} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={-180 + i * 66} y={-446} width={34} height={46} rx={6} fill={C.white} />
            <rect x={-175 + i * 66} y={-438} width={24} height={34} rx={4} fill={C.orange} />
          </g>
        ))}
        {/* stove with two burners, kettle on one */}
        <rect x={-120} y={-340} width={240} height={70} rx={10} fill={C.grey} />
        <ellipse cx={-70} cy={-340} rx={36} ry={9} fill={C.ink} />
        <ellipse cx={70} cy={-340} rx={36} ry={9} fill={C.ink} />
        {lights && (
          <g>
            <path d={`M -98 -342 Q -86 ${-392 + flick} -70 ${-420 + flick} Q -54 ${-392 + flick} -42 -342 Z`} fill={C.orange} />
            <path d={`M -84 -342 Q -74 ${-374 + flick} -70 ${-390 + flick} Q -64 ${-374 + flick} -56 -342 Z`} fill={C.yellow} />
          </g>
        )}
        <ellipse cx={70} cy={-340} rx={56} ry={6} fill={C.greyDark} />
        <path d="M 34 -398 Q 70 -462 106 -398 L 98 -394 Q 70 -440 42 -394 Z" fill={C.greyDark} />
        <path d="M 110 -392 L 150 -432 L 160 -422 L 124 -380 Z" fill={C.greyDark} />
        <ellipse cx={70} cy={-378} rx={56} ry={38} fill={C.greyDark} />
        <ellipse cx={70} cy={-406} rx={40} ry={8} fill={C.grey} />
        <circle cx={70} cy={-418} r={7} fill={C.ink} />
        {lights && [0, 1, 2].map((k) => puff(150, -440, k))}
        {!lights && [0, 1].map((k) => puff(150, -440, k))}
        {/* counter with jar and glasses */}
        <rect x={-260} y={-270} width={520} height={40} rx={8} fill={C.brown} />
        <rect x={-260} y={-270} width={520} height={10} rx={5} fill={C.sand} />
        <rect x={-230} y={-230} width={20} height={230} fill={C.brownDark} />
        <rect x={210} y={-230} width={20} height={230} fill={C.brownDark} />
        <rect x={-230} y={-312} width={52} height={42} rx={8} fill={C.yellow} />
        <rect x={-236} y={-320} width={64} height={10} rx={4} fill={C.greyDark} />
        {[130, 180, 230].map((gx) => (
          <g key={gx}>
            <rect x={gx} y={-306} width={34} height={36} rx={6} fill={C.white} />
            <rect x={gx + 5} y={-298} width={24} height={26} rx={4} fill={C.orange} />
          </g>
        ))}
        {/* tiled gable roof */}
        <path d="M -360 -590 L 0 -790 L 360 -590 Z" fill={roof} />
        {rows.map((ry, i) => (
          <rect key={i} x={-halfAt(ry)} y={ry - 10} width={2 * halfAt(ry)} height={10} fill={shade(roof, 0.18)} />
        ))}
        <circle cx={0} cy={-796} r={12} fill={shade(roof, 0.25)} />
        <rect x={-380} y={-586} width={760} height={32} rx={12} fill={shade(roof, 0.15)} />
        {/* bench out front */}
        <rect x={190} y={-122} width={18} height={122} fill={C.brownDark} />
        <rect x={432} y={-122} width={18} height={122} fill={C.brownDark} />
        <rect x={170} y={-150} width={300} height={28} rx={10} fill={C.brown} />
      </g>
    </g>
  );
}
