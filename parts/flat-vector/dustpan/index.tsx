import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Dustpan seen from the side and slightly above: a flat wide scoop with a low back wall, a lip resting on the floor,
// and a long handle leaning up and back at about 45 degrees. A small hand brush lies on the floor beside it.
// Origin = bottom centre; hero size. anim "tilt" rocks the pan from the floor point, as if tipping dust in.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "tilt") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 60) * 5)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.orange;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={`translate(-110 0) ${motion(p.anim ?? "none", f)}`}>
        {/* handle leaning up and back, behind the back wall, with a grip knob */}
        <path d="M 40 -140 L 200 -330" stroke={C.greyDark} strokeWidth={22} strokeLinecap="round" fill="none" />
        <circle cx={200} cy={-330} r={24} fill={C.greyDark} />
        {/* low back wall, darker on its right */}
        <rect x={-150} y={-150} width={300} height={64} rx={14} fill={c} />
        <rect x={100} y={-150} width={50} height={64} rx={14} fill={shade(c, 0.2)} />
        {/* flat scoop floor rising from the lip to the back wall */}
        <path d="M -190 -26 L 190 -26 L 150 -92 L -150 -92 Z" fill={c} />
        <path d="M 110 -26 L 190 -26 L 150 -92 L 104 -92 Z" fill={shade(c, 0.12)} />
        {[[-60, -60, 9], [-10, -50, 11], [40, -66, 8], [80, -48, 7]].map(([dx, dy, r], i) => (
          <circle key={i} cx={dx} cy={dy} r={r} fill={C.grey} />
        ))}
        {/* lip resting on the floor */}
        <rect x={-206} y={-28} width={412} height={28} rx={14} fill={shade(c, 0.2)} />
        {/* small hand brush lying on the floor, handle pointing out to the right */}
        <path d="M 320 -36 L 420 -80" stroke={C.teal} strokeWidth={20} strokeLinecap="round" fill="none" />
        <rect x={226} y={-56} width={100} height={40} rx={12} fill={C.tealDark} />
        <rect x={228} y={-20} width={96} height={20} rx={6} fill={C.sand} />
        {[246, 264, 282, 300].map((bx) => (
          <path key={bx} d={`M ${bx} -18 L ${bx} 0`} stroke={shade(C.sand, 0.25)} strokeWidth={4} fill="none" />
        ))}
      </g>
    </g>
  );
}
