import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glider (sailplane), seen from the side and a little above, facing right: slim pointed fuselage with a bubble canopy,
// very long thin wings crossing it on a diagonal (near wing to the lower left, far wing to the upper right),
// T-tail, single main wheel. No engine or propeller.
// About 960 px wide and 420 px tall at s = 1. Origin = floor centre under the main wheel; the wheel stands on y.
// anim "fly": floats up and down and tilts gently; vx moves it along x (px per frame).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "fly") return `translate(0 ${f1(-Math.sin((f * 2 * Math.PI) / 90) * 18)}) rotate(${f1(Math.sin((f * 2 * Math.PI) / 120) * 2.5)} 0 -200)`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const hull = p.color && p.color !== "none" ? p.color : C.white;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const wingLight = shade(hull, 0.07), wingDark = shade(hull, 0.24);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {anim !== "fly" && <ellipse cx={0} cy={0} rx={300} ry={12} fill={C.shadow} />}
      <g transform={motion(anim, f)}>
        {/* far wing: up and to the right, behind the fuselage */}
        <path d="M 20 -170 L 130 -190 L 460 -330 L 432 -334 Z" fill={wingDark} />
        <path d="M 440 -330 L 470 -350 L 462 -318 Z" fill={trim} />
        {/* far tailplane */}
        <path d="M -420 -342 L -380 -344 L -330 -372 L -345 -374 Z" fill={shade(trim, 0.2)} />
        {/* fin */}
        <path d="M -330 -170 L -420 -340 L -365 -346 L -280 -175 Z" fill={trim} />
        {/* fuselage: pod at the front tapering to a thin tail boom */}
        <path d="M 400 -160 Q 380 -205 280 -215 L 120 -222 Q 0 -222 -120 -196 L -350 -172 Q -372 -168 -372 -160 Q -372 -150 -350 -148 L -120 -140 Q 20 -112 140 -110 L 300 -118 Q 390 -128 400 -160 Z" fill={hull} />
        <path d="M 395 -150 Q 370 -122 300 -118 L 140 -110 Q 20 -112 -120 -140 L -350 -148 L -350 -158 L -120 -152 Q 20 -126 140 -126 L 300 -132 Q 360 -136 395 -150 Z" fill={wingDark} />
        {/* trim stripe and nose */}
        <path d="M 360 -168 L -120 -170 L -330 -162 L -330 -156 L -120 -160 L 360 -156 Z" fill={trim} />
        {/* canopy */}
        <path d="M 340 -205 Q 300 -268 200 -262 Q 150 -258 130 -220 Z" fill={C.sky} />
        <path d="M 290 -250 Q 250 -262 210 -258 L 222 -232 Q 255 -236 300 -228 Z" fill="#FFFFFF" opacity={0.6} />
        {/* main wheel under the fuselage */}
        <rect x={42} y={-112} width={16} height={40} fill={C.greyDark} />
        <circle cx={50} cy={-36} r={36} fill={C.ink} />
        <circle cx={50} cy={-36} r={14} fill={C.greyLight} />
        {/* tail skid */}
        <rect x={-342} y={-150} width={12} height={34} rx={6} fill={C.greyDark} />
        {/* near tailplane on top of the fin */}
        <path d="M -460 -338 L -330 -348 L -318 -336 L -440 -326 Z" fill={trim} />
        {/* near wing: down and to the left, in front of the fuselage */}
        <path d="M 140 -192 L 10 -164 L -450 -26 Q -470 -22 -462 -40 L -440 -62 Z" fill={wingLight} />
        <path d="M 10 -164 L -450 -26 L -446 -44 L 20 -180 Z" fill={wingDark} />
        <path d="M -452 -44 L -480 -20 L -470 -56 Z" fill={trim} />
        {/* wing root fairing */}
        <ellipse cx={75} cy={-178} rx={70} ry={18} fill={hull} />
      </g>
    </g>
  );
}
