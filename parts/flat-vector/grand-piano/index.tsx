import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Grand piano in side three-quarter view: the curved body and keyboard at the front-left, the open lid
// propped on a stick at the back-right, and three tapered legs with brass casters.
// Origin = bottom centre (feet on y). About 860 px wide and 900 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const WHITE = 22;
const KW = 330 / WHITE;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.ink;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* legs: three tapered legs and brass casters */}
        <path d="M -330 -300 L -350 -20 L -320 -20 L -300 -300 Z" fill={shade(body, 0.1)} />
        <path d="M 300 -300 L 330 -20 L 360 -20 L 340 -300 Z" fill={shade(body, 0.1)} />
        <path d="M 60 -250 L 70 -20 L 96 -20 L 90 -250 Z" fill={shade(body, 0.1)} />
        {[[-335, -12], [345, -12], [83, -12]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={12} fill={C.yellowDark} />
        ))}
        {/* pedal lyre under the middle */}
        <rect x={-40} y={-220} width={20} height={70} rx={6} fill={C.yellowDark} />
        <rect x={0} y={-220} width={20} height={70} rx={6} fill={C.yellowDark} />
        <rect x={-30} y={-180} width={60} height={14} rx={6} fill={C.yellowDark} />
        {/* open lid, propped on a stick at the back */}
        <path d="M -390 -380 L -170 -730 L 330 -900 L 420 -420 Z" fill={body} />
        <path d="M -340 -390 L -160 -690 L 300 -850 L 370 -430 Z" fill={shade(body, 0.2)} opacity={0.6} />
        <path d="M -200 -640 L 280 -820" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.2} />
        <line x1={230} y1={-640} x2={150} y2={-410} stroke={C.greyDark} strokeWidth={10} strokeLinecap="round" />
        {/* main body with a rounded tail on the left */}
        <path d="M -400 -330 Q -440 -260 -390 -210 L -330 -190 L 400 -190 L 420 -330 Z" fill={body} />
        <path d="M -390 -340 L 410 -340 L 400 -300 L -380 -300 Z" fill={shade(body, 0.25)} opacity={0.5} />
        <rect x={-400} y={-340} width={800} height={16} rx={8} fill={C.white} opacity={0.15} />
        {/* keyslip and keys */}
        <rect x={-380} y={-260} width={380} height={22} rx={6} fill={shade(body, 0.3)} />
        <rect x={-372} y={-240} width={364} height={44} rx={4} fill={C.ink} />
        {Array.from({ length: WHITE }, (_, i) => (
          <rect key={i} x={-372 + i * KW + 1} y={-240} width={KW - 2} height={42} rx={2} fill={C.white} />
        ))}
        {Array.from({ length: WHITE - 1 }, (_, i) => i).filter((i) => [0, 1, 3, 4, 5].includes(i % 7)).map((i) => (
          <rect key={i} x={-372 + (i + 1) * KW - 6} y={-240} width={12} height={26} rx={2} fill={C.ink} />
        ))}
        {/* brass name-plate area: a plain strip, no text */}
        <rect x={-120} y={-200} width={120} height={8} rx={4} fill={C.yellowDark} />
      </g>
    </g>
  );
}
