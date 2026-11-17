import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lift doors in a wall frame, with an up and down arrow indicator and a call button.
// anim "open": the two doors slide apart over 40 frames and stay open. Room scale: about 620 px wide and 1000 px tall.
// Origin = floor centre in front of the doors.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const door = p.color && p.color !== "none" ? p.color : C.greyLight;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const t = Math.min(1, Math.max(0, f / 40));
  const slide = anim === "open" ? 220 * (1 - (1 - t) ** 3) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* wall and door frame */}
        <rect x={-310} y={-1000} width={620} height={1000} fill={C.sand} />
        <rect x={-270} y={-850} width={540} height={850} fill={frame} />
        {/* up and down arrow indicator */}
        <rect x={-60} y={-960} width={120} height={100} rx={16} fill={C.ink} />
        <path d="M 0 -948 L -24 -922 L 24 -922 Z" fill={C.yellow} />
        <path d="M 0 -872 L -24 -898 L 24 -898 Z" fill={C.grey} />
        {/* call button on the wall */}
        <circle cx={290} cy={-520} r={14} fill={C.yellow} />
        {/* doorway, with the two doors clipped to it */}
        <rect x={-220} y={-810} width={440} height={810} fill={C.navy} />
        <defs>
          <clipPath id="flat-elevator-open">
            <rect x={-220} y={-810} width={440} height={810} />
          </clipPath>
        </defs>
        <g clipPath="url(#flat-elevator-open)">
          <g transform={`translate(${f1(-slide)} 0)`}>
            <rect x={-220} y={-810} width={220} height={810} fill={door} />
            <rect x={-200} y={-790} width={180} height={770} rx={10} fill={shade(door, 0.08)} />
            <rect x={-38} y={-470} width={12} height={120} rx={6} fill={frame} />
          </g>
          <g transform={`translate(${f1(slide)} 0)`}>
            <rect x={0} y={-810} width={220} height={810} fill={door} />
            <rect x={20} y={-790} width={180} height={770} rx={10} fill={shade(door, 0.08)} />
            <rect x={26} y={-470} width={12} height={120} rx={6} fill={frame} />
          </g>
        </g>
        {/* floor */}
        <rect x={-300} y={-12} width={600} height={12} fill={frame} />
      </g>
    </g>
  );
}
