import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Troll: a hulking grey-green troll with a big bulbous nose, an underbite (no tusks), mossy hair, ragged shorts,
// leaning on a log club. Custom drawing. Body space: feet at 0,0, faces right, ~1100 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
const MOSS = "#4E7A3A", MOSSD = shade("#4E7A3A", 0.2), SHORTS = "#5A4636", LOG = "#7A5230";
export default function Part(p: PartProps<any>) {
  const SK = (p as any).color || "#7F9A7A", SKD = shade(SK, 0.16);
  const { x = 540, y = 1560, s = 1, f = 0, flip } = p as any;
  const breathe = Math.sin(f / 22) * 6;
  const blink = f % 110 < 5;
  return (
    <g transform={`translate(${x + (p.vx ?? 0) * f} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={320} ry={28} fill={C.shadow} />
      {/* back arm */}
      <path d={`M -190 -760 Q -270 -560 ${-240} ${-330 + breathe}`} stroke={SKD} strokeWidth={128} fill="none" strokeLinecap="round" />
      <circle cx={-240} cy={-300 + breathe} r={70} fill={SKD} />
      {/* legs */}
      <path d="M -170 -470 L -190 -60 M 150 -470 L 170 -60" stroke={SK} strokeWidth={170} strokeLinecap="round" />
      <ellipse cx={-200} cy={-30} rx={110} ry={44} fill={SKD} />
      <ellipse cx={190} cy={-30} rx={110} ry={44} fill={SKD} />
      {/* ragged shorts */}
      <path d="M -250 -560 L 250 -560 L 226 -420 L 190 -400 L 168 -436 L 120 -396 L 84 -440 L 40 -398 L -6 -436 L -50 -392 L -96 -440 L -150 -398 L -196 -430 L -232 -404 Z" fill={SHORTS} />
      {/* big barrel torso */}
      <path d={`M -230 -820 Q 0 ${-870 + breathe} 230 -820 Q 290 -640 240 -520 Q 0 ${-470 - breathe} -240 -520 Q -290 -640 -230 -820 Z`} fill={SK} />
      <ellipse cx={20} cy={-640 + breathe * 0.5} rx={170} ry={130} fill={SKD} opacity={0.25} />
      {/* moss on the shoulders */}
      <path d="M -230 -820 Q -180 -880 -120 -860 Q -150 -830 -170 -800 Z" fill={MOSS} />
      <path d="M 160 -860 Q 230 -870 240 -820 Q 190 -800 150 -820 Z" fill={MOSS} />
      {/* head with mossy hair */}
      <g transform={`translate(0 ${breathe * 0.4})`}>
        <ellipse cx={-136} cy={-950} rx={28} ry={44} fill={SKD} />
        <ellipse cx={0} cy={-950} rx={138} ry={122} fill={SK} />
        <path d="M -120 -1010 Q -100 -1090 -30 -1080 Q 10 -1120 60 -1086 Q 120 -1060 120 -1000 Q 60 -1030 0 -1024 Q -60 -1020 -120 -1010 Z" fill={MOSS} />
        <circle cx={-96} cy={-1040} r={44} fill={MOSS} />
        <circle cx={-40} cy={-1074} r={42} fill={MOSSD} />
        <path d="M -140 -980 Q -160 -920 -132 -880 Q -110 -930 -116 -986 Z" fill={MOSS} />
        {/* heavy brow and small eyes */}
        <path d="M 22 -1000 Q 70 -1030 118 -1000" stroke={SKD} strokeWidth={22} fill="none" strokeLinecap="round" />
        {blink ? <path d="M 48 -962 L 84 -962" stroke={C.ink} strokeWidth={8} strokeLinecap="round" /> : (
          <g>
            <ellipse cx={66} cy={-958} rx={16} ry={12} fill={C.white} />
            <circle cx={70} cy={-956} r={7} fill={C.ink} />
          </g>
        )}
        {/* big bulbous nose */}
        <ellipse cx={126} cy={-924} rx={56} ry={50} fill={SKD} />
        <circle cx={112} cy={-900} r={9} fill={C.ink} opacity={0.5} />
        <circle cx={142} cy={-902} r={8} fill={C.ink} opacity={0.5} />
        {/* underbite: jutting lower jaw, no tusks */}
        <path d="M 30 -870 Q 92 -830 150 -872 Q 140 -842 106 -840 Q 70 -840 30 -870 Z" fill={SKD} />
        <path d="M 40 -872 Q 90 -858 136 -872" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
      {/* log club */}
      <path d="M 430 0 L 214 -860" stroke={LOG} strokeWidth={104} strokeLinecap="round" />
      <path d="M 330 -120 Q 340 -150 360 -140 M 290 -420 Q 300 -450 322 -440 M 240 -700 Q 250 -730 270 -718" stroke={shade(LOG, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* front arm and fist gripping the log */}
      <path d="M 180 -770 Q 280 -640 260 -330" stroke={SK} strokeWidth={128} fill="none" strokeLinecap="round" />
      <circle cx={262} cy={-300} r={76} fill={SK} />
      <circle cx={262} cy={-300} r={76} fill="none" stroke={SKD} strokeWidth={6} opacity={0.5} />
    </g>
  );
}
