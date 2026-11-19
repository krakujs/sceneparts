import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Trumpet held level, bell to the right: mouthpiece on the left, three valve casings with silver caps
// on top, the tubing and a flared bell. anim "toot" puffs sound rings out of the bell in turn.
// Origin = bottom centre (bottom of the bell on y). About 740 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
const VALVES = [-40, 20, 80];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brass = p.color && p.color !== "none" ? p.color : C.yellow;
  const anim: string = p.anim ?? "none";
  const tootOn = anim === "toot";
  // each of three rings starts at its own time, grows and fades
  const ring = (k: number) => {
    const t = ((f + k * 14) % 42) / 42;
    return { r: 30 + t * 120, o: tootOn ? Math.max(0, 1 - t) * 0.7 : 0 };
  };
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform="translate(0 -110)">
          {/* mouthpiece */}
          <ellipse cx={-360} cy={0} rx={14} ry={24} fill={C.greyDark} />
          <rect x={-352} y={-16} width={20} height={32} rx={8} fill={C.greyDark} />
          {/* lead pipe and main tube */}
          <rect x={-340} y={-18} width={560} height={36} rx={18} fill={shade(brass, 0.25)} />
          <rect x={-340} y={-10} width={560} height={18} rx={9} fill={brass} />
          {/* valve casings with caps */}
          {VALVES.map((vx, i) => (
            <g key={i}>
              <rect x={vx - 22} y={-130} width={44} height={110} rx={12} fill={brass} />
              <rect x={vx - 18} y={-120} width={12} height={100} rx={6} fill={C.white} opacity={0.25} />
              <circle cx={vx} cy={-136} r={30} fill={C.greyLight} />
              <circle cx={vx} cy={-136} r={13} fill={C.greyDark} />
              {/* valve tubing going down into the loop */}
              <rect x={vx - 8} y={-22} width={16} height={30} fill={shade(brass, 0.2)} />
            </g>
          ))}
          {/* tuning slide hint */}
          <rect x={-40} y={-44} width={160} height={14} rx={7} fill={shade(brass, 0.15)} />
          {/* bell tube and flare */}
          <rect x={210} y={-18} width={40} height={36} rx={12} fill={shade(brass, 0.2)} />
          <path d="M 240 -18 L 330 -110 Q 372 0 330 110 L 240 18 Z" fill={shade(brass, 0.25)} />
          <path d="M 240 -12 L 320 -96 Q 350 0 320 96 L 240 12 Z" fill={brass} />
          <ellipse cx={330} cy={0} rx={20} ry={110} fill={shade(brass, 0.4)} />
          <ellipse cx={330} cy={0} rx={13} ry={100} fill={C.ink} opacity={0.5} />
          <rect x={246} y={-70} width={10} height={140} rx={5} fill={C.white} opacity={0.3}/>
          {/* sound rings */}
          {tootOn && [0, 1, 2].map((k) => {
            const g = ring(k);
            return <circle key={k} cx={370} cy={0} r={g.r} fill="none" stroke={C.yellow} strokeWidth={12} opacity={g.o} />;
          })}
        </g>
      </g>
    </g>
  );
}
