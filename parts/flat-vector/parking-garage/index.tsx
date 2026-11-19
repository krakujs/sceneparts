import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Multi-storey car park, front view: open concrete decks with railings and rounded corners, a parking "P" sign and a ramp.
// Origin = bottom centre on the ground. About 900 px wide and 1100 px tall at s = 1.
// anim "lights": the deck lamps switch on floor by floor with f.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => (anim === "pop" ? `scale(${f1(popS(f))})` : "");
const floors = [0, 1, 2, 3, 4];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const concrete = p.color && p.color !== "none" ? p.color : C.greyLight;
  const sign = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={8} rx={460} ry={22} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* stair/lift core on the left */}
        <rect x={-420} y={-1040} width={150} height={1040} rx={10} fill={C.grey} />
        <rect x={-400} y={-1000} width={110} height={940} rx={8} fill={shade(C.grey, 0.15)} />
        {/* open decks: slabs, railings, and lamps */}
        {floors.map((i) => {
          const top = -240 - i * 200; // deck i: ground deck sits on the floor line
          const on = anim === "lights" && Math.floor(f / 10) % floors.length >= i;
          return (
            <g key={i}>
              <rect x={-270} y={top + 170} width={620} height={30} rx={6} fill={concrete} />
              <rect x={-270} y={top + 196} width={620} height={8} fill={shade(concrete, 0.2)} />
              {/* railing bars */}
              {[-240, -170, -100, -30, 40, 110, 180, 250, 320].map((bx) => (
                <rect key={bx} x={bx} y={top + 110} width={8} height={60} fill={C.greyDark} />
              ))}
              <rect x={-270} y={top + 110} width={620} height={8} rx={4} fill={C.greyDark} />
              {/* a few parked car roofs (simple shapes) */}
              {[-230, 0, 230].map((cx, j) => (
                <g key={cx}>
                  <rect x={cx - 50} y={top + 130} width={100} height={40} rx={14} fill={j % 2 ? C.orange : C.teal} />
                  <rect x={cx - 30} y={top + 116} width={60} height={20} rx={8} fill={C.sky} />
                </g>
              ))}
              {/* deck lamp */}
              <rect x={170} y={top + 60} width={24} height={8} rx={3} fill={C.greyDark} />
              <rect x={156} y={top + 66} width={52} height={10} rx={4} fill={on ? C.yellow : C.white} />
            </g>
          );
        })}
        {/* ramp from the bottom deck */}
        <path d="M 350 -40 L 350 -180 L 420 -180 L 420 -40 Z" fill={C.greyDark} />
        {/* P sign on a pole above the top corner */}
        <rect x={-6} y={-1120} width={12} height={80} fill={C.greyDark} />
        <rect x={-120} y={-1200} width={240} height={110} rx={16} fill={sign} />
        <rect x={-62} y={-1172} width={24} height={74} rx={4} fill={C.white} />
        <path d="M -40 -1162 H 0 Q 24 -1162 24 -1146 Q 24 -1130 0 -1130 H -40" fill="none" stroke={C.white} strokeWidth={16} strokeLinejoin="round" />
        {/* base and columns */}
        <rect x={-290} y={-30} width={680} height={30} rx={6} fill={C.greyDark} />
      </g>
    </g>
  );
}
