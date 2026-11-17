import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Tower windmill, front view: a tapering tower, a door and windows, a cap, and four lattice sails that turn with f.
// Origin = centre of the floor line. About 620 px wide and 1300 px tall at s = 1 (sail tips included).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const HUB_Y = -930, SAIL = 300;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const wall = p.color && p.color !== "none" ? p.color : C.paper;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const spin = anim === "lights" ? f * 1.2 : 0;
  // one sail: a lattice frame pointing up, drawn around the hub at the origin
  const sail = (
    <g>
      <rect x={-22} y={-SAIL} width={44} height={SAIL} rx={6} fill={wood} />
      {[-200, -140, -80, -20].map((yy) => (
        <rect key={yy} x={-64} y={yy - 60} width={128} height={14} rx={4} fill={wood} />
      ))}
      <rect x={-64} y={-SAIL + 30} width={128} height={SAIL - 30} rx={6} fill={C.white} opacity={0.5} />
      {[-200, -140, -80, -20].map((yy) => (
        <rect key={`l${yy}`} x={-56} y={yy - 40} width={112} height={6} fill={shade(wood, 0.2)} />
      ))}
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={200} ry={18} fill={C.shadow} />
        {/* tapering tower */}
        <path d="M -130 0 L -90 -720 L 90 -720 L 130 0 Z" fill={wall} />
        <path d="M 40 -720 L 90 -720 L 130 0 L 60 0 Z" fill={shade(wall, 0.15)} />
        <path d="M -150 -40 L -150 -20 L 150 -20 L 150 -40 Z" fill={shade(wall, 0.1)} />
        {/* door and windows */}
        <path d="M -40 0 L -40 -110 Q -40 -140 0 -140 Q 40 -140 40 -110 L 40 0 Z" fill={wood} />
        <rect x={-22} y={-300} width={44} height={70} rx={22} fill={C.navy} />
        <rect x={-20} y={-500} width={40} height={60} rx={20} fill={C.navy} />
        {/* gallery and cap */}
        <rect x={-120} y={-730} width={240} height={18} rx={6} fill={wood} />
        <path d="M -110 -740 L 0 -840 L 110 -740 Z" fill={wood} />
        <path d="M -40 -860 L 0 -820 L 40 -860 Z" fill={shade(wood, 0.2)} />
        {/* turning sails around the hub */}
        <g transform={`translate(0 ${HUB_Y}) rotate(${f1(spin)})`}>
          {[0, 90, 180, 270].map((a) => (
            <g key={a} transform={`rotate(${a})`}>{sail}</g>
          ))}
          <circle cx={0} cy={0} r={34} fill={shade(wood, 0.2)} />
          <circle cx={0} cy={0} r={14} fill={C.white} />
        </g>
      </g>
    </g>
  );
}
