import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Mech suit: a big piloted walking mech with a glass cockpit on the chest, chunky legs and arms, orange and grey armour.
// Custom drawing. Feet at 0,0, faces the viewer, ~1000 px tall at s = 1, about 560 px wide.
const GREY = "#9AA3B5", GREY_D = "#5D6578", DARKG = "#3A4157", GLASS = "#BDE6F7", SCREEN = "#3DE0FF";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip, color = "#FF8A3D", anim = "walk" } = p as any;
  const OR = color, OR_D = shade(color, 0.22);
  const walking = anim === "walk";
  const k = walking ? Math.sin(f / 10) : 0;
  const bob = walking ? -Math.abs(Math.sin(f / 10)) * 12 : 0;
  const hipY = -480;
  const eyesOn = anim === "none" ? 0.9 : 0.6 + 0.4 * Math.sin(f / 9);

  // A leg pivots at the hip: orange thigh, grey shin, dark foot.
  const leg = (hx: number, a: number) => (
    <g transform={`rotate(${a.toFixed(2)} ${hx} ${hipY})`}>
      <rect x={hx - 84} y={hipY} width={168} height={250} rx={36} fill={OR} />
      <rect x={hx - 70} y={hipY + 230} width={140} height={190} rx={30} fill={GREY} />
      <rect x={hx - 110} y={-64} width={220} height={64} rx={22} fill={GREY_D} />
    </g>
  );
  // An arm pivots at the shoulder: upper arm, forearm and a blocky fist.
  const arm = (sx: number, a: number) => (
    <g transform={`rotate(${a.toFixed(2)} ${sx} -790)`}>
      <rect x={sx - 37} y={-790} width={74} height={170} rx={30} fill={OR} />
      <rect x={sx - 33} y={-630} width={66} height={170} rx={26} fill={GREY_D} />
      <rect x={sx - 45} y={-470} width={90} height={90} rx={26} fill={GREY} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={270} ry={24} fill={C.shadow} />
      {leg(-95, k * 14)}
      {leg(95, -k * 14)}
      <g transform={`translate(0 ${bob.toFixed(1)})`}>
        {/* hips */}
        <rect x={-170} y={-500} width={340} height={90} rx={26} fill={GREY_D} />
        {/* shoulders */}
        <rect x={-270} y={-840} width={90} height={130} rx={26} fill={GREY} />
        <rect x={180} y={-840} width={90} height={130} rx={26} fill={GREY} />
        {arm(-225, -k * 12)}
        {arm(225, k * 12)}
        {/* torso */}
        <rect x={-200} y={-840} width={400} height={370} rx={46} fill={OR} />
        <rect x={-200} y={-520} width={400} height={50} rx={22} fill={OR_D} opacity={0.5} />
        {/* cockpit glass with a pilot silhouette */}
        <rect x={-120} y={-790} width={240} height={170} rx={56} fill={GLASS} />
        <circle cx={0} cy={-722} r={34} fill={DARKG} opacity={0.5} />
        <path d="M -56 -612 Q -56 -664 0 -664 Q 56 -664 56 -612 Z" fill={DARKG} opacity={0.45} />
        <path d="M -100 -770 L -48 -770 L -100 -668 Z" fill={C.white} opacity={0.4} />
        {/* chest vents and a status light */}
        {[-575, -555].map((yy) => (
          <rect key={yy} x={-100} y={yy} width={200} height={10} rx={5} fill={OR_D} />
        ))}
        <circle cx={0} cy={-510} r={14} fill={C.yellow} opacity={eyesOn} />
        {/* head with a glowing visor slit */}
        <rect x={-40} y={-852} width={80} height={22} fill={GREY_D} />
        <rect x={-90} y={-950} width={180} height={110} rx={28} fill={GREY} />
        <rect x={-62} y={-905} width={124} height={26} rx={13} fill={SCREEN} opacity={eyesOn} />
        <line x1={0} y1={-950} x2={0} y2={-990} stroke={GREY_D} strokeWidth={8} strokeLinecap="round" />
        <circle cx={0} cy={-1000} r={10} fill={C.red} />
      </g>
    </g>
  );
}
