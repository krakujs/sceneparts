import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Refuse (garbage) truck, side view, facing right: a big rear compactor hopper with ribbed panels, a cab at the front,
// and a bin lift arm at the back with a wheelie bin on the ground. Room scale: about 880 px wide and 470 px tall at s = 1.
// Origin = floor centre; the wheels stand on y.
// anim "drive": the wheels spin and the body bounces a little; vx moves it along x (px per frame).
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
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -4 : 0;
  const wheel = (cx: number, r: number) => (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={C.ink} />
      <circle cx={cx} cy={-r} r={r * 0.58} fill={C.greyLight} />
      <g transform={`rotate(${f1(spin)} ${cx} ${-r})`}>
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - r * 0.07} y={-r - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
            fill={C.grey} transform={`rotate(${k * 72} ${cx} ${-r})`} />
        ))}
      </g>
      <circle cx={cx} cy={-r} r={r * 0.16} fill={C.grey} />
    </g>
  );
  const arch = (cx: number, r: number) => (
    <path d={`M ${cx - r - 9} ${-r} A ${r + 9} ${r + 9} 0 0 1 ${cx + r + 9} ${-r} Z`} fill={C.ink} opacity={0.85} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={440} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* chassis */}
          <rect x={-370} y={-170} width={770} height={40} rx={8} fill={frame} />
          {/* compactor hopper with ribbed panels */}
          <rect x={-370} y={-420} width={400} height={260} rx={16} fill={body} />
          <rect x={-370} y={-420} width={400} height={22} rx={10} fill={shade(body, 0.2)} />
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={-310 + k * 70} y={-392} width={14} height={210} rx={5} fill={shade(body, 0.15)} />
          ))}
          {/* cab */}
          <path d="M 60 -170 L 60 -360 Q 60 -390 90 -390 L 210 -390 Q 240 -390 262 -358 L 350 -250 Q 370 -226 370 -192 L 370 -170 Z" fill={body} />
          <path d="M 100 -364 L 200 -364 Q 216 -364 226 -350 L 292 -268 L 100 -268 Z" fill={C.sky} />
          <rect x={110} y={-260} width={8} height={90} rx={3} fill={shade(body, 0.22)} />
          {/* headlight and bumper */}
          <rect x={352} y={-224} width={14} height={26} rx={6} fill={C.yellow} />
          <rect x={366} y={-150} width={22} height={26} rx={6} fill={C.greyDark} />
          {/* bin lift arm reaching down to a wheelie bin on the ground */}
          <path d="M -372 -176 L -420 -226 L -452 -126" fill="none" stroke={C.greyDark} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={-492} y={-136} width={76} height={16} rx={6} fill={C.inkSoft} />
          <path d="M -488 -120 L -418 -120 L -426 0 L -480 0 Z" fill={C.inkSoft} />
          <rect x={-470} y={-100} width={30} height={6} rx={3} fill={C.greyDark} />
          {arch(-265, 80)}
          {arch(270, 80)}
        </g>
        {wheel(-265, 80)}
        {wheel(270, 80)}
      </g>
    </g>
  );
}
