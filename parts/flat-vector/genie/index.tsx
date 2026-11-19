import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Genie: a magic spirit with purple-magenta skin, long dark hair tied with a band, a deep plum waistcoat and arms folded.
// Rises from a smoky tail instead of legs. Custom drawing. Feet (base of the smoke) at 0,0, ~1000 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const HAIR = "#1E1A2B", WAIST = "#3B2A6B", WAISTD = shade("#3B2A6B", 0.25), BAND = "#E8503F", SMOKE = "#C9B6F2", SMOKED = "#9C82D9";
export default function Part(p: PartProps<any>) {
  const SKIN = (p as any).color || "#A8489E", SKIND = shade(SKIN, 0.2);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const sway = Math.sin(f / 26) * 14;
  const rise = Math.sin(f / 30) * 8;
  const wisp = Math.sin(f / 12) * 10;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* smoky tail from the ground up, swaying */}
      <g transform={`translate(${sway * 0.4} ${rise})`} opacity={0.92}>
        <path d="M -190 6 Q -110 -40 -60 -180 Q -30 -300 -110 -400 Q -170 -480 -110 -580 L 110 -580 Q 60 -480 120 -380 Q 170 -280 100 -170 Q 50 -60 190 6 Q 0 40 -190 6 Z" fill={SMOKE} />
        <path d={`M -150 -10 Q ${-100 + wisp} -120 -90 -230 Q -40 -330 -110 -430`} stroke={SMOKED} strokeWidth={28} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d={`M 150 -20 Q ${110 - wisp} -140 ${80 + wisp} -260 Q ${40} -360 ${100 - wisp} -460`} stroke={SMOKED} strokeWidth={24} fill="none" strokeLinecap="round" opacity={0.5} />
        <ellipse cx={0} cy={6} rx={210} ry={20} fill={SMOKED} opacity={0.5} />
        {/* puffs along the smoke edges */}
        <g fill={SMOKE}>
          <circle cx={-176} cy={-40} r={44} />
          <circle cx={178} cy={-60} r={50} />
          <circle cx={-132} cy={-210} r={40} />
          <circle cx={150} cy={-250} r={42} />
          <circle cx={-96} cy={-470} r={44} />
          <circle cx={112} cy={-420} r={46} />
        </g>
        <path d="M -40 -20 Q 40 -60 60 -20 Q 40 10 0 0 Z" fill={SMOKED} opacity={0.5} />
      </g>
      {/* hair flowing behind the shoulders */}
      <path d={`M -80 -800 Q -190 -740 ${-150 + sway * 0.3} -560 Q -120 -520 -60 -580 Z`} fill={HAIR} />
      <path d={`M 80 -800 Q 170 -740 ${140 + sway * 0.2} -560 Q 120 -520 60 -580 Z`} fill={HAIR} opacity={0.8} />
      {/* shoulders and waistcoat */}
      <path d="M -100 -760 Q 0 -800 100 -760 L 104 -560 Q 0 -520 -104 -560 Z" fill={SKIN} />
      <path d="M -70 -740 L 70 -740 L 80 -520 L -80 -520 Z" fill={WAIST} />
      <path d="M 0 -740 L 0 -520" stroke={WAISTD} strokeWidth={6} />
      {[-690, -640, -590].map((yy) => <circle key={yy} cx={18} cy={yy} r={7} fill={C.yellowDark} />)}
      <path d="M -70 -740 L -36 -640 L -70 -520 L -78 -520 Z" fill={WAISTD} />
      <path d="M 70 -740 L 36 -640 L 70 -520 L 78 -520 Z" fill={WAISTD} />
      {/* folded arms across the chest */}
      <path d="M -98 -700 Q -40 -600 40 -640 L 90 -620" stroke={SKIN} strokeWidth={56} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 98 -700 Q 40 -600 -40 -630 L -90 -612" stroke={SKIND} strokeWidth={56} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={92} cy={-620} r={24} fill={SKIN} />
      <circle cx={-92} cy={-612} r={24} fill={SKIND} />
      {/* head */}
      <ellipse cx={0} cy={-880} rx={92} ry={106} fill={SKIN} />
      <path d="M -94 -900 Q -100 -1000 0 -1000 Q 100 -990 92 -900 Q 90 -960 40 -968 Q 0 -972 -36 -960 Q -90 -940 -94 -900 Z" fill={HAIR} />
      <path d={`M -96 -930 Q -130 -870 -110 -790 L -80 -800 Q -92 -860 -70 -920 Z`} fill={HAIR} />
      {/* hair tie band */}
      <path d="M -102 -860 Q -110 -836 -94 -820 L -86 -838 Q -96 -846 -92 -860 Z" fill={BAND} />
      <path d="M -100 -876 Q -20 -884 -88 -900" stroke="none" />
      {/* calm, mischievous face */}
      <path d="M 18 -900 Q 42 -924 66 -902" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M -14 -900 Q 10 -924 34 -902" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
      <ellipse cx={26} cy={-878} rx={10} ry={12} fill={C.ink} />
      <ellipse cx={-28} cy={-878} rx={10} ry={12} fill={C.ink} />
      <path d="M -6 -850 Q 4 -836 16 -850" stroke={SKIND} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 10 -818 Q 36 -800 56 -824" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={-86} cy={-850} r={12} fill={SKIND} opacity={0.4} />
    </g>
  );
}
