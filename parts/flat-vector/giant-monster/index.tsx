import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Giant monster: an original, huge, stocky upright lizard in side view facing right, stomping through the city.
// Feet on y = 0, about 920 px tall at s = 1. The head and lower jaw are ONE connected shape; the mouth is an open
// wedge cut into it. Back plates are rounded spikes in a contrasting colour, arms are small, the tail rests on the
// ground behind, and the eyes glow. anim: none | idle (slow breathing) | roar (jaw opens slightly, still attached).
/* eslint-disable @typescript-eslint/no-explicit-any */
const PLATE = C.yellow, PLATE_D = C.yellowDark, BELLY = "#6FD3C8", MOUTH = "#7A2E2A", TOOTH = "#F6EFD8", CLAW = "#F6EFD8";
const f1 = (v: number) => v.toFixed(1);
const quad = (p0: number[], c: number[], p1: number[], t: number) => [
  (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0],
  (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1],
];

// Head + lower jaw as one closed path. o = how far the jaw has dropped (0..1); the back of the mouth stays fixed.
const headPath = (o: number) => {
  const dy = 30 * o;
  return `M 150 -800 Q 215 -925 320 -915 Q 405 -910 440 -855 L 446 -838 Q 440 -826 420 -826 L 300 -800 ` +
    `L 418 ${f1(-762 + dy)} Q 436 ${f1(-752 + dy)} 420 ${f1(-738 + dy)} Q 330 ${f1(-722 + dy / 2)} 240 -700 ` +
    `Q 190 -680 170 -640 L 120 -760 Z`;
};

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const body: string = p.color && p.color !== "none" ? p.color : C.teal;
  const bodyD = shade(body, 0.22);
  const roar = p.anim === "roar";
  const o = roar ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60) : 0.2;
  const breathe = p.anim === "none" ? 0 : Math.sin((f * 2 * Math.PI) / 90) * 4;
  const glow = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50);

  // Tail: two quadratic segments, drawn as a row of circles that taper toward the tip on the ground.
  const seg1 = [[-200, -520], [-380, -440], [-380, -160]];
  const seg2 = [[-380, -160], [-390, -60], [-420, -24]];
  const tail: { x: number; y: number; r: number }[] = [];
  const N = 24;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const pt = t < 0.5 ? quad(seg1[0], seg1[1], seg1[2], t * 2) : quad(seg2[0], seg2[1], seg2[2], (t - 0.5) * 2);
    tail.push({ x: pt[0], y: pt[1], r: 50 - 36 * t });
  }

  // Back plates: rounded triangles standing on the top of the back, leaning slightly back.
  const plates: [number, number][] = [[-150, -610], [-124, -700], [-80, -775], [-14, -835], [50, -855]];

  // Lower jaw teeth follow the lower jaw's top edge: from (300,-800) to (418, -762+dy).
  const dy = 30 * o;
  const lowerY = (tx: number) => -800 + ((tx - 300) / 118) * (38 + dy);

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={8} rx={520} ry={30} fill={C.shadow} />
      {/* tail on the ground, behind the body */}
      <g>
        {tail.map((c, i) => <circle key={i} cx={f1(c.x)} cy={f1(c.y)} r={f1(c.r)} fill={bodyD} />)}
      </g>
      {/* far leg, near leg (stubby and thick, feet toward the viewer's right) */}
      <path d="M -120 -520 L -110 -110" stroke={bodyD} strokeWidth={120} strokeLinecap="round" />
      <ellipse cx={-76} cy={-40} rx={110} ry={40} fill={bodyD} />
      <path d="M 60 -520 L 80 -110" stroke={body} strokeWidth={120} strokeLinecap="round" />
      <ellipse cx={116} cy={-40} rx={118} ry={40} fill={body} />
      <path d="M 56 -66 L 56 -30 M 90 -66 L 92 -30 M 124 -64 L 128 -30" stroke={shade(body, 0.4)} strokeWidth={7} strokeLinecap="round" />
      {/* back plates (drawn before the body so their bases tuck in) */}
      {plates.map(([px, py], i) => (
        <path key={i} d={`M ${px - 26} ${py + 10} L ${px - 14} ${py - 104} L ${px + 22} ${py + 10} Z`} fill={PLATE} stroke={PLATE} strokeWidth={10} strokeLinejoin="round" />
      ))}
      {/* stocky torso */}
      <g transform={`translate(0 ${f1(breathe)})`}>
        <path d="M -150 -500 Q -190 -700 -110 -820 Q -20 -880 60 -830 Q 140 -780 140 -680 Q 150 -560 110 -470 Q 60 -420 -20 -420 L -120 -420 Q -150 -460 -150 -500 Z" fill={body} />
        <ellipse cx={0} cy={-600} rx={100} ry={120} fill={BELLY} opacity={0.9} />
        <path d="M -140 -480 Q -120 -440 -40 -424" stroke={bodyD} strokeWidth={10} fill="none" strokeLinecap="round" />
        {/* small arms with claws */}
        <path d="M 160 -700 L 236 -636 L 262 -592" stroke={body} strokeWidth={42} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={266} cy={-584} r={26} fill={body} />
        <path d="M 282 -600 L 300 -582 M 276 -576 L 296 -562" stroke={CLAW} strokeWidth={6} strokeLinecap="round" />
        {/* head and lower jaw: one connected shape */}
        <path d={headPath(o)} fill={body} />
        <path d={`M 436 -826 L 300 -800 L 418 ${f1(-762 + dy)} L 438 ${f1(-794 + dy / 2)} Z`} fill={MOUTH} />
        {/* upper teeth hang down from the upper jaw, lower teeth point up */}
        <path d="M 340 -806 L 352 -790 L 364 -806 Z M 376 -812 L 388 -794 L 400 -812 Z" fill={TOOTH} />
        <path d={`M 338 ${f1(lowerY(338) + 0)} L 350 ${f1(lowerY(350) - 14)} L 362 ${f1(lowerY(362) + 0)} Z M 374 ${f1(lowerY(374))} L 386 ${f1(lowerY(386) - 14)} L 398 ${f1(lowerY(398))} Z`} fill={TOOTH} />
        {/* brow ridge and glowing eye */}
        <path d="M 306 -886 Q 336 -902 368 -884" stroke={bodyD} strokeWidth={12} fill="none" strokeLinecap="round" />
        <circle cx={338} cy={-870} r={34} fill={C.yellow} opacity={0.2 + 0.2 * glow} />
        <circle cx={338} cy={-870} r={16} fill={C.yellow} />
        <circle cx={342} cy={-874} r={6} fill={C.white} />
      </g>
    </g>
  );
}
