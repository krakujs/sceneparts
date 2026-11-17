import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Detached garage, front view: a roll-up door with ribs, a side door and a small window, under a pitched roof.
// Origin = centre of the floor line. About 720 px wide and 560 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const DOOR_H = 300;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const door = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  // the door rises from 0 to 1 and back over the cycle
  const phase = anim === "lights" ? Math.abs(Math.sin((f * Math.PI) / 120)) : 0;
  const shown = DOOR_H * (1 - phase * 0.85);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={380} ry={18} fill={C.shadow} />
        {/* walls and pitched roof */}
        <rect x={-340} y={-420} width={680} height={420} rx={8} fill={wall} />
        <path d="M -380 -410 L 0 -570 L 380 -410 Z" fill={door} />
        <path d="M -380 -410 L 0 -570 L 0 -550 L -360 -405 Z" fill={shade(door, 0.2)} />
        <rect x={-340} y={-40} width={680} height={40} fill={shade(wall, 0.14)} />
        {/* roll-up door: panel grid that rises */}
        <rect x={-260} y={-40 - DOOR_H} width={300} height={DOOR_H} rx={6} fill={shade(door, 0.1)} />
        <rect x={-260} y={-40 - shown} width={300} height={shown} rx={6} fill={door} />
        {shown > 60 && [0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-260} y={-40 - shown + 20 + i * 52} width={300} height={6} fill={shade(door, 0.25)} />
        ))}
        {/* side door and window */}
        <rect x={100} y={-260} width={120} height={220} rx={8} fill={C.brown} />
        <circle cx={120} cy={-150} r={6} fill={C.yellow} />
        <rect x={100} y={-370} width={120} height={80} rx={8} fill={C.white} />
        <rect x={108} y={-362} width={104} height={64} rx={5} fill={C.sky} />
        <rect x={158} y={-362} width={4} height={64} fill={C.white} />
      </g>
    </g>
  );
}
