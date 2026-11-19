import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Seashell prop: a scallop fan shell and a spiral conch side by side on the sand. Origin = centre of the shared base line.
// About 400 px wide and 240 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const SCALLOP = "#FF9F7A", CONCH = "#F9A77A";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1560;
  const scallop = p.color && p.color !== "none" ? p.color : SCALLOP;
  const conch = p.color2 && p.color2 !== "none" ? p.color2 : CONCH;
  const R = 210;
  const pt = (deg: number) => [f1(R * Math.cos((deg * Math.PI) / 180)), f1(R * Math.sin((deg * Math.PI) / 180))];
  const [l, r] = [pt(-155), pt(-25)];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={360} ry={16} fill={C.shadow} />
      {/* scallop: fan with ribs, hinge ears at the base */}
      <g transform="translate(-190 0)">
        <path d={`M 0 0 L ${l[0]} ${l[1]} A ${R} ${R} 0 0 1 ${r[0]} ${r[1]} Z`} fill={scallop} />
        {[-140, -120, -100, -80, -60, -40].map((deg) => (
          <line key={deg} x1={0} y1={0} x2={f1(R * 0.9 * Math.cos((deg * Math.PI) / 180))} y2={f1(R * 0.9 * Math.sin((deg * Math.PI) / 180))} stroke={shade(scallop, 0.22)} strokeWidth={8} strokeLinecap="round" />
        ))}
        <rect x={-62} y={-22} width={124} height={22} rx={8} fill={shade(scallop, 0.2)} />
      </g>
      {/* spiral conch: flared lip on the right, spire on the left */}
      <g transform="translate(170 0)">
        <path d="M -90 -170 C -50 -150 0 -110 40 -70 C 70 -40 100 -30 120 -12 L 118 6 C 90 4 60 4 30 2 C -20 0 -50 -30 -70 -90 C -80 -120 -88 -145 -90 -170 Z" fill={conch} />
        <path d="M -70 -120 Q -30 -90 10 -62" stroke={shade(conch, 0.22)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M -52 -82 Q -10 -56 50 -36" stroke={shade(conch, 0.22)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M -40 -40 Q 0 -20 60 -14" stroke={shade(conch, 0.22)} strokeWidth={7} fill="none" strokeLinecap="round" />
        <ellipse cx={100} cy={-8} rx={18} ry={9} fill={C.white} opacity={0.6} />
      </g>
    </g>
  );
}
