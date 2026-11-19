import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Blue denim jeans with a waistband, belt loops, rivets, back pockets with contrast stitching, a button fly and
// fading at the knees, hung from a clip hanger by the waistband. Origin = bottom centre: the hems rest on y,
// the hook is the highest point. About 340 px wide and 690 px tall at s = 1. anim "sway": swings from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const denim = p.color && p.color !== "none" ? p.color : C.blueDark;
  const stitch = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const sw = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 80) * 3 : 0;
  const rivet = (cx: number, cy: number) => <circle key={cx + "_" + cy} cx={cx} cy={cy} r={6} fill={C.grey} stroke={shade(C.grey, 0.3)} strokeWidth={2} />;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={14} fill={C.shadow} />
      <path d="M 0 -600 L 0 -636 Q 0 -684 30 -684 Q 52 -684 46 -660" stroke={WOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect x={-150} y={-612} width={300} height={22} rx={11} fill={WOOD} />
      <g transform={`rotate(${f1(sw)} 0 -600)`}>
        <rect x={-22} y={-612} width={44} height={60} rx={8} fill={C.grey} />
        {/* legs, tapering to the hem */}
        <path d="M -126 -496 L -4 -496 L -2 -410 L -30 0 L -168 0 L -132 -300 Z" fill={denim} />
        <path d="M 126 -496 L 4 -496 L 2 -410 L 30 0 L 168 0 L 132 -300 Z" fill={denim} />
        {/* inner-leg shading */}
        <path d="M -4 -496 L -2 -410 L -30 0 L -48 0 L -28 -300 L -40 -496 Z" fill={shade(denim, 0.25)} opacity={0.7} />
        <path d="M 4 -496 L 2 -410 L 30 0 L 48 0 L 28 -300 L 40 -496 Z" fill={shade(denim, 0.25)} opacity={0.7} />
        {/* knee fade lines */}
        <path d="M -120 -250 Q -90 -236 -62 -252" stroke={C.sky} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.35} />
        <path d="M 120 -250 Q 90 -236 62 -252" stroke={C.sky} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.35} />
        {/* contrast stitching on the front pockets and outer seams */}
        <path d="M -116 -476 Q -88 -424 -54 -440" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="10 6" strokeLinecap="round" />
        <path d="M 116 -476 Q 88 -424 54 -440" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="10 6" strokeLinecap="round" />
        <path d="M -120 -488 L -150 -20" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="12 8" strokeLinecap="round" />
        <path d="M 120 -488 L 150 -20" stroke={stitch} strokeWidth={4} fill="none" strokeDasharray="12 8" strokeLinecap="round" />
        {/* rivets at the pocket corners */}
        {rivet(-116, -478)}{rivet(116, -478)}{rivet(-54, -440)}{rivet(54, -440)}
        {/* fly with a button */}
        <path d="M 0 -484 L 0 -396" stroke={shade(denim, 0.4)} strokeWidth={6} strokeLinecap="round" />
        <circle cx={0} cy={-500} r={8} fill={C.yellow} />
        {/* waistband with belt loops and a rivet on the band */}
        <rect x={-128} y={-522} width={256} height={28} rx={8} fill={denim} />
        {[-104, -40, 40, 104].map((bx) => <rect key={bx} x={bx - 5} y={-540} width={10} height={24} rx={3} fill={shade(denim, 0.2)} />)}
        <rect x={-128} y={-522} width={256} height={5} rx={2} fill={stitch} opacity={0.9} />
        {/* hem cuffs with contrast stitching */}
        <path d="M -160 -22 L -36 -22 M 36 -22 L 160 -22" stroke={stitch} strokeWidth={4} strokeDasharray="10 6" />
      </g>
    </g>
  );
}
