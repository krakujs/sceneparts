import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Casual shorts with a waistband, belt loops, side pockets, a fly and contrast stitching, hung from a clip hanger
// by the waistband. Origin = bottom centre: the hems rest on y, the hook is the highest point.
// About 340 px wide and 690 px tall at s = 1. anim "sway": the shorts swing gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.teal;
  const stitch = p.color2 && p.color2 !== "none" ? p.color2 : C.white;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={14} fill={C.shadow} />
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect x={-150} y={-612} width={300} height={22} rx={11} fill={WOOD} />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        <rect x={-22} y={-612} width={44} height={60} rx={8} fill={C.grey} />
        {/* hanger neck from the clip down to the waistband */}
        <line x1={0} y1={-552} x2={0} y2={-344} stroke={C.grey} strokeWidth={8} strokeLinecap="round" />
        {/* body squashed to short-leg proportions: waist at about -330, hems on y */}
        <g transform="scale(1 0.66)">
        {/* legs: a left and right leg joined at the crotch */}
        <path d="M -125 -496 L -4 -496 L -2 -410 L -22 0 L -152 0 L -138 -300 Z" fill={cloth} />
        <path d="M 125 -496 L 4 -496 L 2 -410 L 22 0 L 152 0 L 138 -300 Z" fill={cloth} />
        {/* shaded inner legs for depth */}
        <path d="M -4 -496 L -2 -410 L -22 0 L -40 0 L -26 -300 L -40 -496 Z" fill={shade(cloth, 0.18)} opacity={0.55} />
        <path d="M 4 -496 L 2 -410 L 22 0 L 40 0 L 26 -300 L 40 -496 Z" fill={shade(cloth, 0.18)} opacity={0.55} />
        {/* contrast stitching along the outer seams and hems */}
        <path d="M -118 -488 L -134 -300 L -146 -8" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="12 8" strokeLinecap="round" />
        <path d="M 118 -488 L 134 -300 L 146 -8" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="12 8" strokeLinecap="round" />
        <path d="M -148 -24 L -26 -24 M 26 -24 L 148 -24" stroke={stitch} strokeWidth={4} strokeDasharray="10 8" />
        {/* side pockets: a curved opening on each hip */}
        <path d="M -108 -470 Q -80 -420 -52 -440" stroke={shade(cloth, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 108 -470 Q 80 -420 52 -440" stroke={shade(cloth, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* fly */}
        <path d="M 0 -480 L 0 -396" stroke={shade(cloth, 0.3)} strokeWidth={6} strokeLinecap="round" />
        {/* waistband with belt loops */}
        <rect x={-126} y={-520} width={252} height={28} rx={8} fill={stitch} />
        {[-100, -40, 40, 100].map((bx) => <rect key={bx} x={bx - 5} y={-534} width={10} height={20} rx={3} fill={shade(stitch, 0.2)} />)}
        <rect x={-6} y={-528} width={12} height={12} rx={3} fill={shade(stitch, 0.3)} />
        </g>
      </g>
    </g>
  );
}
