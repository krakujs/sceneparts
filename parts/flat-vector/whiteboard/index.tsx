import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mobile whiteboard on a stand: a white board in a frame, two posts, a base bar with wheels, a marker tray.
// Origin = floor under the centre (stands on y). Floor scale 1 m ≈ 560 px: the board is 1.2 m by 0.9 m,
// lower edge 0.75 m above the floor. anim "draw": the marker doodles (boxes and arrows, no words) are sketched in turn.
const f1 = (v: number) => v.toFixed(1);

// Marker doodles in board coordinates, each with its colour.
const DOODLES: { d: string; c: string }[] = [
  { d: "M -230 -840 L -70 -840 L -70 -740 L -230 -740 Z", c: C.blue },
  { d: "M -60 -790 L 60 -790 M 36 -814 L 60 -790 L 36 -766", c: C.red },
  { d: "M 80 -860 L 220 -860 L 220 -760 L 80 -760 Z", c: C.green },
  { d: "M 150 -760 L 150 -700 M 128 -722 L 150 -700 L 172 -722", c: C.blue },
  { d: "M 150 -640 A 60 60 0 1 0 150.1 -640 Z", c: C.red },
  { d: "M -260 -600 L -90 -600 L -90 -500 L -260 -500 Z", c: C.green },
  { d: "M -90 -550 L -20 -640 M -44 -640 L -20 -640 L -20 -616", c: C.red },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : "#C4CBD8";
  const dark = shade(frame, 0.3);
  const draw = p.anim === "draw";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={360} ry={14} fill={C.shadow} />
      {/* base bar and wheels */}
      <rect x={-350} y={-26} width={700} height={22} rx={10} fill={C.greyDark} />
      <circle cx={-320} cy={-14} r={15} fill={C.ink} />
      <circle cx={320} cy={-14} r={15} fill={C.ink} />
      {/* posts */}
      <rect x={-262} y={-424} width={22} height={404} rx={8} fill={C.grey} />
      <rect x={240} y={-424} width={22} height={404} rx={8} fill={C.grey} />
      {/* board frame and surface */}
      <rect x={-336} y={-924} width={672} height={504} rx={12} fill={frame} />
      <rect x={-336} y={-924} width={672} height={504} rx={12} fill="none" stroke={dark} strokeWidth={6} />
      <rect x={-318} y={-906} width={636} height={468} rx={4} fill={C.white} />
      {/* doodles */}
      {DOODLES.map((g, i) => {
        const prog = draw ? Math.min(1, Math.max(0, (f - i * 45) / 45)) : 1;
        return (
          <path key={i} d={g.d} fill="none" stroke={g.c} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={`${prog.toFixed(3)} 1`} />
        );
      })}
      {/* marker tray with a marker on it */}
      <rect x={-300} y={-420} width={600} height={22} rx={8} fill={dark} />
      <rect x={-40} y={-436} width={110} height={16} rx={8} fill={C.blue} />
      <rect x={60} y={-438} width={20} height={18} rx={4} fill={C.blueDark} />
    </g>
  );
}
