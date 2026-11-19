import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Full-length tailored trousers with a centre crease, belt loops, side pockets and a fly, hung from a clip hanger
// by the waistband. Origin = bottom centre: the hems rest on y, the hook is the highest point.
// About 340 px wide and 690 px tall at s = 1. anim "sway": the trousers swing gently from the hook.
const f1 = (v: number) => v.toFixed(1);
const WOOD = "#C9A272";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cloth = p.color && p.color !== "none" ? p.color : C.navy;
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
        {/* legs with a slight taper to the hem */}
        <path d="M -126 -496 L -4 -496 L -2 -410 L -30 0 L -168 0 L -132 -300 Z" fill={cloth} />
        <path d="M 126 -496 L 4 -496 L 2 -410 L 30 0 L 168 0 L 132 -300 Z" fill={cloth} />
        {/* inner-leg shading */}
        <path d="M -4 -496 L -2 -410 L -30 0 L -48 0 L -28 -300 L -40 -496 Z" fill={shade(cloth, 0.2)} opacity={0.6} />
        <path d="M 4 -496 L 2 -410 L 30 0 L 48 0 L 28 -300 L 40 -496 Z" fill={shade(cloth, 0.2)} opacity={0.6} />
        {/* creases down the front of each leg */}
        <line x1={-84} y1={-470} x2={-96} y2={-20} stroke={shade(cloth, 0.3)} strokeWidth={4} strokeLinecap="round" />
        <line x1={84} y1={-470} x2={96} y2={-20} stroke={shade(cloth, 0.3)} strokeWidth={4} strokeLinecap="round" />
        {/* side pockets */}
        <path d="M -116 -478 Q -90 -430 -60 -446" stroke={shade(cloth, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 116 -478 Q 90 -430 60 -446" stroke={shade(cloth, 0.3)} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* fly */}
        <path d="M 0 -484 L 0 -396" stroke={shade(cloth, 0.35)} strokeWidth={6} strokeLinecap="round" />
        {/* waistband with belt loops and a stitched hem line */}
        <rect x={-128} y={-522} width={256} height={28} rx={8} fill={cloth} />
        <rect x={-128} y={-522} width={256} height={28} rx={8} fill="none" stroke={stitch} strokeWidth={3} strokeDasharray="8 6" />
        {[-104, -40, 40, 104].map((bx) => <rect key={bx} x={bx - 5} y={-540} width={10} height={24} rx={3} fill={shade(cloth, 0.2)} />)}
        <path d="M -150 -20 L -36 -20 M 36 -20 L 150 -20" stroke={stitch} strokeWidth={3} strokeDasharray="8 6" />
      </g>
    </g>
  );
}
