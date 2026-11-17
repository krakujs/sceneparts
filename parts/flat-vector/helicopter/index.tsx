import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Helicopter, side view, facing right: bubble cabin with a canopy, tail boom and fin, skids, main and tail rotor.
// Origin = bottom centre (the skids); about 840 px wide (rotor tip to tip) and 410 px tall at s = 1.
// anim "fly": gentle hover, the main rotor disc and the tail rotor spin.
const f1 = (v: number) => v.toFixed(1);
const hover = (anim: string, f: number) => {
  if (anim === "fly") return -(Math.sin((f * 2 * Math.PI) / 80) + 1) * 8;
  if (anim === "bob") return -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6;
  return 0;
};
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1500;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const dark = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spinning = anim === "fly";
  const tailTurn = spinning ? f * 34 : 0;
  const blur = spinning ? 0.12 + 0.06 * Math.sin((f * 2 * Math.PI) / 10) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y + hover(anim, f))}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        {/* skids and struts */}
        <rect x={-230} y={-14} width={470} height={14} rx={7} fill={dark} />
        <rect x={-122} y={-94} width={12} height={84} fill={dark} />
        <rect x={108} y={-94} width={12} height={84} fill={dark} />
        {/* tail boom, fin and tail rotor */}
        <path d="M -110 -250 L -470 -208 Q -482 -198 -470 -186 L -110 -138 Z" fill={body} />
        <path d="M -414 -198 L -456 -330 L -416 -330 L -370 -198 Z" fill={body} />
        <rect x={-470} y={-262} width={14} height={60} rx={6} fill={dark} />
        <g transform={`translate(-462 -236) rotate(${f1(tailTurn)})`}>
          {spinning && <ellipse cx={0} cy={0} rx={12} ry={54} fill={C.white} opacity={0.3} />}
          <rect x={-5} y={-50} width={10} height={100} rx={4} fill={dark} />
        </g>
        {/* cabin: body, lower shade, glass */}
        <ellipse cx={0} cy={-170} rx={165} ry={112} fill={body} />
        <path d="M -165 -170 A 165 112 0 0 0 165 -170 Z" fill={shade(body, 0.2)} />
        <rect x={-112} y={-248} width={112} height={92} rx={34} fill={C.sky} />
        <path d="M 30 -270 Q 120 -262 150 -190 Q 156 -160 140 -150 L 30 -150 Z" fill={C.sky} />
        <rect x={-150} y={-186} width={300} height={12} rx={6} fill={shade(body, 0.3)} />
        {/* mast, hub and main rotor */}
        <rect x={-8} y={-312} width={16} height={38} fill={dark} />
        {spinning && <ellipse cx={0} cy={-322} rx={424} ry={22} fill={C.white} opacity={blur} />}
        <rect x={-420} y={-330} width={840} height={16} rx={8} fill={dark} />
        <circle cx={0} cy={-322} r={14} fill={C.ink} />
      </g>
    </g>
  );
}
