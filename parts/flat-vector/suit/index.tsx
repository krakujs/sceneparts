import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two-piece suit on one wooden coat hanger: a jacket with lapels, a white shirt and a tie in front, and matching
// trousers hanging behind the jacket. Origin = bottom centre: the trouser hems rest on y, the hook is the highest.
// About 520 px wide and 690 px tall at s = 1. anim "sway": the suit swings gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const tie = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={260} ry={14} fill={C.shadow} />
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -150 -432 L 0 -600 L 150 -432" stroke={WOOD} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        {/* trousers behind the jacket: waistband hidden, two legs down to the hems on y */}
        <path d="M -118 -360 L 118 -360 L 124 0 L 16 0 L 0 -250 L -16 0 L -124 0 Z" fill={shade(cloth, 0.2)} />
        <path d="M -118 -360 L 118 -360 L 120 -330 L -120 -330 Z" fill={shade(cloth, 0.3)} />
        <line x1={-62} y1={-300} x2={-68} y2={-10} stroke={shade(cloth, 0.4)} strokeWidth={4} strokeLinecap="round" />
        <line x1={62} y1={-300} x2={68} y2={-10} stroke={shade(cloth, 0.4)} strokeWidth={4} strokeLinecap="round" />
        {/* jacket: body, then sleeves hanging from the shoulders */}
        <path d="M -150 -440 L 150 -440 L 160 -200 Q 0 -170 -160 -200 Z" fill={cloth} />
        <path d="M -150 -440 L -262 -206 L -206 -190 L -128 -372 Z" fill={cloth} />
        <path d="M 150 -440 L 262 -206 L 206 -190 L 128 -372 Z" fill={cloth} />
        {/* sleeve cuffs and a vent */}
        <path d="M -262 -206 L -206 -190 L -208 -170 L -266 -186 Z" fill={shade(cloth, 0.2)} />
        <path d="M 262 -206 L 206 -190 L 208 -170 L 266 -186 Z" fill={shade(cloth, 0.2)} />
        <path d="M 0 -170 L 0 -120" stroke={shade(cloth, 0.3)} strokeWidth={5} strokeLinecap="round" />
        {/* white shirt visible in the V of the jacket */}
        <path d="M -60 -440 L 0 -300 L 60 -440 Z" fill={C.white} />
        {/* tie hanging down the shirt front */}
        <path d="M -12 -434 L 12 -434 L 22 -236 L 0 -206 L -22 -236 Z" fill={tie} />
        <path d="M -12 -434 L 12 -434 L 9 -414 L -9 -414 Z" fill={shade(tie, 0.2)} />
        {/* lapels: darker shaped panels either side of the shirt */}
        <path d="M -60 -440 L -18 -440 L 14 -300 L -70 -360 Z" fill={shade(cloth, 0.25)} />
        <path d="M 60 -440 L 18 -440 L -14 -300 L 70 -360 Z" fill={shade(cloth, 0.25)} />
        <path d="M -60 -440 L -18 -440 L 14 -300 L -70 -360 Z" fill="none" stroke={shade(cloth, 0.4)} strokeWidth={3} />
        {/* pocket and buttons */}
        <path d="M -120 -262 L -74 -262" stroke={shade(cloth, 0.35)} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={-260} r={7} fill={C.white} opacity={0.8} />
        <circle cx={0} cy={-214} r={7} fill={C.white} opacity={0.8} />
      </g>
    </g>
  );
}
