import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Room, lit, mix, asTime } from "../backdrop/index";

// Gym interior: mirror wall with glints, a weight rack with dumbbells at the left, treadmills and dumbbells at the right, tiled floor.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  const accent = L(p.accent ?? C.orange), floorY = 1280;
  const glint = drift ? Math.sin(f / 25) * 30 : 0;
  const dumb = (x: number, y: number, c: string) => (
    <g transform={`translate(${x} ${y}) scale(1.5)`}>
      <rect x={-44} y={-6} width={88} height={12} rx={5} fill={L(C.greyDark)} />
      <rect x={-54} y={-26} width={24} height={42} rx={7} fill={L(c)} />
      <rect x={30} y={-26} width={24} height={42} rx={7} fill={L(c)} />
    </g>
  );
  const treadmill = (x: number, c: string) => (
    <g>
      <rect x={x} y={floorY - 60} width={340} height={46} rx={18} fill={L(C.ink)} />
      <rect x={x + 30} y={floorY - 46} width={290} height={18} rx={9} fill={L(C.greyDark)} />
      <rect x={x + 290} y={floorY - 330} width={22} height={290} rx={8} fill={L(C.inkSoft)} />
      <rect x={x + 250} y={floorY - 380} width={110} height={72} rx={12} fill={L(c)} />
      <rect x={x + 266} y={floorY - 364} width={78} height={34} rx={6} fill={L("#CFE6F5")} />
      <rect x={x + 290} y={floorY - 330} width={60} height={10} rx={5} fill={L(C.greyDark)} />
    </g>
  );
  return (
    <g>
      <Room time={time} wall={L("#E9EEF5")} floor={L("#5A6073")} floorY={floorY} floorKind="tiles" panels={false} skirting={false} />
      {/* full mirror wall: frame, mullion, glints */}
      <rect x={250} y={120} width={580} height={560} rx={10} fill={L(C.greyDark)} />
      <rect x={266} y={136} width={548} height={528} fill={mix(L("#A9C4E0"), L("#FFFFFF"), 0.35)} />
      <rect x={532} y={136} width={16} height={528} fill={L(C.greyDark)} />
      <path d={`M ${400 + glint} 136 L ${450 + glint} 136 L ${360 + glint} 664 L ${330 + glint} 664 Z`} fill="#FFFFFF" opacity={0.4} />
      <path d={`M ${650 + glint} 136 L ${670 + glint} 136 L ${590 + glint} 664 L ${570 + glint} 664 Z`} fill="#FFFFFF" opacity={0.3} />
      <rect x={0} y={740} width={1080} height={26} fill={accent} />
      {/* weight rack at the left, standing on the floor */}
      <rect x={20} y={880} width={18} height={400} fill={L(C.greyDark)} />
      <rect x={250} y={880} width={18} height={400} fill={L(C.greyDark)} />
      <rect x={20} y={960} width={248} height={16} rx={6} fill={L(C.inkSoft)} />
      <rect x={20} y={1120} width={248} height={16} rx={6} fill={L(C.inkSoft)} />
      {[C.blue, C.orange, C.green].map((c, i) => <g key={i}>{dumb(70 + i * 80, 960, c)}</g>)}
      {[C.red, C.yellow, C.teal].map((c, i) => <g key={i}>{dumb(70 + i * 80, 1120, c)}</g>)}
      {/* two treadmills at the right, side view */}
      <g>{treadmill(700, C.blue)}</g>
      {dumb(960, floorY - 14, C.orange)}
    </g>
  );
}
