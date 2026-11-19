import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glass skyscraper, flat front elevation with stepped top and antenna. Origin = centre of the floor line.
// About 380 px wide and 1400 px tall at s = 1 (antenna included).
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const ROWS = 14, RH = 70, BODY_TOP = -1140;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const glass = p.color && p.color !== "none" ? p.color : C.skyDeep;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const floors: React.ReactNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    const ry = BODY_TOP + 30 + r * RH;
    const lit = anim === "lights" && Math.floor(f / 6) % ROWS === r;
    floors.push(
      <g key={r}>
        <rect x={-150} y={ry} width={300} height={RH - 14} fill={lit ? C.yellow : glass} />
        <rect x={-150} y={ry} width={300} height={4} fill={shade(glass, 0.2)} />
        <path d={`M -120 ${ry + 8} L -90 ${ry + 8} L -120 ${ry + 40} Z`} fill={C.white} opacity={0.4} />
      </g>
    );
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={230} ry={18} fill={C.shadow} />
        {/* stepped crown */}
        <rect x={-190} y={-1160} width={380} height={24} rx={4} fill={frame} />
        <rect x={-130} y={-1200} width={260} height={44} rx={4} fill={frame} />
        <rect x={-70} y={-1240} width={140} height={44} rx={4} fill={frame} />
        {/* antenna with blinking light */}
        <rect x={-5} y={-1340} width={10} height={104} fill={frame} />
        <circle cx={0} cy={-1344} r={10} fill={anim === "lights" && Math.floor(f / 10) % 2 ? C.red : C.greyLight} />
        {/* body */}
        <rect x={-170} y={BODY_TOP} width={340} height={1120} rx={6} fill={frame} />
        {floors}
        {/* mullions */}
        {[-100, -50, 0, 50, 100].map((mx) => (
          <rect key={mx} x={mx - 2} y={BODY_TOP + 30} width={4} height={ROWS * RH - 14} fill={frame} opacity={0.6} />
        ))}
        {/* plinth and entrance */}
        <rect x={-190} y={-60} width={380} height={60} rx={6} fill={shade(frame, 0.2)} />
        <rect x={-70} y={-150} width={140} height={90} rx={6} fill={C.sky} />
      </g>
    </g>
  );
}
