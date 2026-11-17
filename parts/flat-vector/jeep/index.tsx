import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open-top off-road 4x4, side view, facing right: boxy body with no roof, a roll bar, two seats, big wheels and a spare on the back.
// Generic design with no brand grille. Room scale: about 760 px wide and 380 px tall at s = 1.
// Origin = floor centre; the tyres stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.green;
  const rim = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={rim} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={shade(rim, 0.35)} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={400} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* boxy open body with a short bonnet */}
          <rect x={-320} y={-190} width={620} height={112} rx={16} fill={body} />
          <rect x={180} y={-212} width={130} height={30} rx={10} fill={body} />
          <rect x={-320} y={-120} width={620} height={12} rx={5} fill={shade(body, 0.2)} />
          {/* windscreen, low and upright */}
          <path d="M 196 -210 L 208 -318 L 262 -318 L 268 -210 Z" fill={C.sky} />
          {/* roll bar */}
          <rect x={-180} y={-330} width={12} height={142} rx={6} fill={C.greyDark} />
          <rect x={20} y={-330} width={12} height={142} rx={6} fill={C.greyDark} />
          <rect x={-186} y={-340} width={220} height={14} rx={7} fill={C.greyDark} />
          {/* seats */}
          <rect x={-120} y={-262} width={62} height={74} rx={14} fill={shade(body, 0.35)} />
          <rect x={40} y={-262} width={62} height={74} rx={14} fill={shade(body, 0.35)} />
          {/* headlight and bumper */}
          <circle cx={316} cy={-166} r={14} fill={C.yellow} />
          <rect x={302} y={-108} width={34} height={26} rx={8} fill={C.greyDark} />
          <rect x={-332} y={-150} width={12} height={40} rx={5} fill={C.red} />
          {arch(-205, 90)}
          {arch(205, 90)}
        </g>
        {/* spare wheel mounted on the back */}
        <circle cx={-352} cy={-150} r={60} fill={C.ink} />
        <circle cx={-352} cy={-150} r={34} fill={rim} />
        <circle cx={-352} cy={-150} r={10} fill={shade(rim, 0.35)} />
        {wheel(-205, 90)}
        {wheel(205, 90)}
      </g>
    </g>
  );
}
