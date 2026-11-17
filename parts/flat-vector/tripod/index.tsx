import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Camera tripod: three splayed legs meeting at a centre column with a pan head and a quick-release plate.
// Room-scale stand. Origin = centre of the three feet on the floor.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const HUB: [number, number] = [0, -900];
const FEET: [number, number][] = [[-290, -4], [290, -4], [40, 4]];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const leg = p.color && p.color !== "none" ? p.color : C.greyDark;
  const head = p.head && p.head !== "none" ? p.head : C.ink;
  const anim: string = p.anim ?? "none";
  const legAt = (t: number) => [lerp(HUB[0], FEET[t][0], 0.6), lerp(HUB[1], FEET[t][1], 0.6)];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* back leg first, front leg last */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1={HUB[0]} y1={HUB[1]} x2={FEET[i][0]} y2={FEET[i][1]} stroke={i === 2 ? leg : shade(leg, 0.25)} strokeWidth={34} strokeLinecap="round" />
            <line x1={HUB[0]} y1={HUB[1]} x2={FEET[i][0]} y2={FEET[i][1]} stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.12} />
            <ellipse cx={FEET[i][0]} cy={FEET[i][1] + 2} rx={24} ry={9} fill={C.ink} />
            <rect x={legAt(i)[0] - 20} y={legAt(i)[1] - 12} width={40} height={24} rx={8} fill={C.greyLight} />
          </g>
        ))}
        {/* centre column */}
        <rect x={-18} y={-900} width={36} height={190} rx={10} fill={C.greyDark} />
        <rect x={-40} y={-720} width={80} height={30} rx={10} fill={C.greyDark} />
        {/* pan head */}
        <rect x={-60} y={-984} width={120} height={84} rx={16} fill={head} />
        <rect x={-30} y={-960} width={60} height={24} rx={8} fill={C.inkSoft} />
        <rect x={60} y={-968} width={70} height={16} rx={8} fill={C.inkSoft} />
        <circle cx={136} cy={-960} r={16} fill={C.red} />
        <rect x={-90} y={-1010} width={180} height={28} rx={8} fill={C.greyLight} />
        <circle cx={0} cy={-996} r={8} fill={C.ink} />
        <rect x={-46} y={-1006} width={92} height={4} rx={2} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}
