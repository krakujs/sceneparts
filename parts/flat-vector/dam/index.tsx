import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Concrete arch dam filling the valley between two rock cliffs, with the reservoir high behind it on the top left
// and white spillway water gushing from three outlets into the river below. No windows.
// Origin = centre of the river bed (y). About 1000 px wide and 960 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const OUTLETS = [-150, 0, 150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const concrete = pick(p.color, "#D9DDE3");
  const water = pick(p.color2, "#3F86C4");
  const anim: string = p.anim ?? "none";
  const flow = (i: number) => (anim === "flow" ? ((f * 4 + i * 37) % 90) : 0);
  const rock = "#8A7F72";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        {/* reservoir: high blue water behind the dam, top left */}
        <path d="M -500 -940 L -60 -940 L -60 -720 L -250 -660 L -500 -640 Z" fill={water} />
        <path d="M -480 -860 Q -300 -840 -120 -860 M -460 -800 Q -280 -782 -110 -800" stroke={C.white} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.35} />
        {/* rock cliffs either side */}
        <path d="M -500 0 L -500 -640 L -420 -700 L -320 -640 L -300 -420 L -270 0 Z" fill={rock} />
        <path d="M -330 -640 L -320 -640 L -300 -420 L -270 0 L -300 0 L -340 -360 Z" fill={shade(rock, 0.2)} />
        <path d="M 300 0 L 330 -420 L 350 -600 L 430 -700 L 500 -760 L 500 0 Z" fill={rock} />
        <path d="M 330 -420 L 350 -600 L 380 -520 L 360 0 L 300 0 Z" fill={shade(rock, 0.2)} />
        {/* arch dam: curved crest, tapering wall, shaded foot */}
        <path d="M -330 -640 Q 0 -716 330 -640 L 290 -360 Q 180 -120 120 0 L -120 0 Q -180 -120 -290 -360 Z" fill={concrete} />
        <path d="M 120 0 Q 180 -120 290 -360 L 330 -640 Q 340 -628 336 -612 L 300 -360 Q 200 -120 170 0 Z" fill={shade(concrete, 0.18)} />
        {[-250, -120, 0, 120, 250].map((jx) => (
          <line key={jx} x1={jx * 0.8} y1={-620 + Math.abs(jx) * 0.2} x2={jx * 0.45} y2={-200} stroke={shade(concrete, 0.2)} strokeWidth={4} opacity={0.6} />
        ))}
        {/* spillway outlets and gushing white water into the river */}
        {OUTLETS.map((ox, i) => {
          const k = flow(i);
          const fx = ox + (i === 1 ? 0 : i === 0 ? -18 : 18);
          return (
            <g key={ox}>
              <rect x={ox - 36} y={-236} width={72} height={34} rx={6} fill={C.greyDark} />
              <path d={`M ${ox - 30} -204 L ${ox + 30} -204 L ${ox + 46} -70 L ${ox - 46} -70 Z`} fill={C.white} opacity={0.95} />
              <path d={`M ${fx - 8} -70 Q ${fx} -40 ${fx + 14} -16 L ${fx - 14} -16 Q ${fx - 6} -40 ${fx - 8} -70 Z`} fill={C.white} opacity={0.9} />
              {anim === "flow" ? (
                <line x1={ox - 26} y1={-190 + k * 1.3} x2={ox - 26} y2={-120 + k * 1.3} stroke={shade(C.skyDeep, 0.1)} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
              ) : null}
            </g>
          );
        })}
        {/* river in front of the dam foot */}
        <path d="M -500 -70 Q -200 -92 0 -76 Q 250 -60 500 -84 L 500 0 L -500 0 Z" fill={C.skyDeep} />
        <path d="M -380 -36 Q -300 -48 -240 -36 M 120 -28 Q 200 -40 280 -28" stroke={C.white} strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.5} />
      </g>
    </g>
  );
}
