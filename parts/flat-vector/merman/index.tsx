import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Merman: a muscular-cheerful merman with a green-teal fish tail, swimming upright with a trident. Custom drawing.
// Bottom of the tail at y (the sea floor), ~1000 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const SKIN = "#E9B98F", SKIND = shade("#E9B98F", 0.14), HAIR = "#1F5C5A", STEEL = "#C9D3E0";
export default function Part(p: PartProps<any>) {
  const TAIL = (p as any).color || "#2E9E7A", TAILD = shade(TAIL, 0.22);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const sw = Math.sin(f / 9);
  const bob = Math.sin(f / 20) * 10;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* bubbles rising */}
      {[0, 1, 2].map((i) => {
        const t = ((f + i * 45) % 150) / 150;
        return <circle key={i} cx={170 + i * 30} cy={-1000 + bob - t * 500} r={8 + i * 3} fill="none" stroke={C.white} strokeWidth={4} opacity={1 - t} />;
      })}
      <g transform={`translate(0 ${bob})`}>
        {/* fish tail with a fan fin, curled and swaying */}
        <path d={`M -70 -440 Q -90 -300 -40 -200 Q -10 -120 ${-20 + sw * 14} -60 L ${20 + sw * 14} -60 Q 10 -120 40 -200 Q 90 -300 70 -440 Z`} fill={TAIL} />
        {[-300, -250, -200, -150].map((yy) => <path key={yy} d={`M -40 ${yy} Q 0 ${yy + 16} 40 ${yy}`} stroke={TAILD} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />)}
        <path d={`M ${-6 + sw * 14} -70 Q ${-120 + sw * 20} -90 ${-150 + sw * 24} -40 Q ${-90 + sw * 20} -20 ${-2 + sw * 14} -20 Z`} fill={TAILD} />
        <path d={`M ${14 + sw * 14} -70 Q ${130 + sw * 20} -90 ${160 + sw * 24} -40 Q ${100 + sw * 20} -20 ${20 + sw * 14} -20 Z`} fill={TAILD} />
        {/* torso */}
        <path d="M -80 -800 Q -92 -700 -72 -600 L -62 -440 L 66 -440 L 74 -600 Q 92 -700 80 -800 Z" fill={SKIN} />
        <path d="M -62 -440 L 66 -440 L 70 -410 L -66 -410 Z" fill={TAIL} />
        <path d="M -10 -760 Q 0 -700 12 -760" stroke={SKIND} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* back arm swimming out to the side */}
        <path d={`M -60 -770 Q ${-170 + sw * 20} -740 ${-220 + sw * 30} -660`} stroke={SKIND} strokeWidth={48} fill="none" strokeLinecap="round" />
        <circle cx={-222 + sw * 30} cy={-640} r={26} fill={SKIND} />
        {/* front arm holding the trident */}
        <path d="M 62 -770 Q 150 -720 170 -640" stroke={SKIN} strokeWidth={48} fill="none" strokeLinecap="round" />
        <circle cx={172} cy={-620} r={26} fill={SKIN} />
        <rect x={160} y={-1080} width={18} height={480} rx={9} fill={STEEL} />
        <path d="M 150 -1080 L 168 -1140 L 186 -1080 Z M 130 -1060 L 146 -1120 L 160 -1060 Z M 206 -1060 L 220 -1120 L 236 -1060 Z" fill={STEEL} />
        <rect x={148} y={-1060} width={110} height={16} rx={6} fill={STEEL} />
        {/* head with cheerful grin and short teal hair */}
        <circle cx={0} cy={-900} r={88} fill={SKIN} />
        <path d="M -90 -900 Q -96 -1000 0 -992 Q 92 -990 88 -910 Q 50 -960 -10 -952 Q -70 -950 -90 -900 Z" fill={HAIR} />
        <ellipse cx={34} cy={-902} rx={9} ry={12} fill={C.ink} />
        <ellipse cx={-6} cy={-902} rx={9} ry={12} fill={C.ink} />
        <path d="M 4 -860 Q 30 -834 60 -862" stroke={C.inkSoft} strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx={-44} cy={-862} r={14} fill={C.pink} opacity={0.35} />
        <circle cx={70} cy={-870} r={14} fill={C.pink} opacity={0.35} />
      </g>
    </g>
  );
}
