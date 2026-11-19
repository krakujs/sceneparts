import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Doll: generic rag doll with yarn hair in loops and pigtails, a simple A-line dress, stubby legs and shoes.
// Origin = bottom centre (between the shoes); faces the viewer, honours flip, s, anim and skin.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

// Yarn loops around the top of the head and two hanging pigtails.
const yarnLoops = [-80, -54, -28, 0, 28, 54, 80].map((dx, i) => (
  <circle key={`y${i}`} cx={dx} cy={-486 + Math.abs(dx) * 0.22} r={26} fill="currentColor" />
));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const dress = p.color && p.color !== "none" ? p.color : C.pink;
  const hair = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const skin = skinColour(p.skin ?? "light");
  const skinDk = shade(skin, 0.12);
  const dressDk = shade(dress, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* legs and shoes */}
        <rect x={-54} y={-110} width={42} height={100} rx={20} fill={skin} />
        <rect x={12} y={-110} width={42} height={100} rx={20} fill={skin} />
        <ellipse cx={-34} cy={-16} rx={44} ry={18} fill={C.navy} />
        <ellipse cx={34} cy={-16} rx={44} ry={18} fill={C.navy} />
        {/* arms behind the dress */}
        <ellipse cx={-116} cy={-250} rx={28} ry={76} fill={skin} transform="rotate(22 -116 -250)" />
        <ellipse cx={116} cy={-250} rx={28} ry={76} fill={skinDk} transform="rotate(-22 116 -250)" />
        <circle cx={-146} cy={-160} r={26} fill={skin} />
        <circle cx={146} cy={-160} r={26} fill={skinDk} />
        {/* dress */}
        <path d="M -80 -318 Q 0 -336 80 -318 L 150 -108 Q 0 -86 -150 -108 Z" fill={dress} />
        <path d="M 40 -318 Q 80 -318 80 -318 L 150 -108 Q 100 -100 60 -104 Z" fill={dressDk} opacity={0.6} />
        <rect x={-150} y={-124} width={300} height={16} rx={8} fill={dressDk} />
        {/* dots on the dress */}
        {[[-60, -240], [0, -262], [60, -236], [-30, -190], [36, -176]].map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r={9} fill={C.white} opacity={0.6} />
        ))}
        {/* neck and head */}
        <rect x={-22} y={-352} width={44} height={40} rx={14} fill={skinDk} />
        <g color={hair} fill={hair}>
          {yarnLoops}
          {/* pigtails */}
          <ellipse cx={-118} cy={-430} rx={28} ry={70} fill={hair} transform="rotate(12 -118 -430)" />
          <ellipse cx={118} cy={-430} rx={28} ry={70} fill={hair} transform="rotate(-12 118 -430)" />
        </g>
        <circle cx={0} cy={-430} r={100} fill={skin} />
        {/* yarn fringe over the forehead */}
        <path d="M -96 -446 Q -60 -500 0 -498 Q 60 -500 96 -446 Q 60 -470 0 -466 Q -60 -470 -96 -446 Z" fill={hair} />
        {/* face: button eyes, rosy cheeks, stitched smile */}
        <circle cx={-36} cy={-410} r={11} fill={C.ink} />
        <circle cx={36} cy={-410} r={11} fill={C.ink} />
        <circle cx={-68} cy={-384} r={14} fill={C.pink} opacity={0.6} />
        <circle cx={68} cy={-384} r={14} fill={C.pink} opacity={0.6} />
        <path d="M -20 -374 Q 0 -358 20 -374" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      </g>
    </g>
  );
}
