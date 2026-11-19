import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Magic wand standing on its handle end, leaning slightly to the right. Origin = bottom of the handle.
// About 380 px long at s = 1. anim "sparkle": a ring of sparkles bursts out of the white tip and fades.
const f1 = (v: number) => v.toFixed(1);
const TIP = { x: 120, y: -360 };
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 2, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const dark = p.color && p.color !== "none" ? p.color : "#3A2A4A";
  const anim: string = p.anim ?? "none";
  const k = (f % 40) / 40;                 // burst cycle
  const grow = 20 + k * 70, fade = 1 - k;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={36} ry={6} fill={C.shadow} />
      {/* handle and shaft */}
      <path d={`M -20 0 L ${TIP.x - 8} ${TIP.y + 10} L ${TIP.x + 8} ${TIP.y + 10} L 20 0 Z`} fill={dark} />
      <path d={`M -4 -10 L ${TIP.x - 4} ${TIP.y + 16} L ${TIP.x + 2} ${TIP.y + 16} L 4 -10 Z`} fill={shade(dark, 0.25)} opacity={0.6} />
      <rect x={-30} y={-22} width={60} height={22} rx={8} fill={C.yellow} />
      <rect x={-30} y={-22} width={60} height={22} rx={8} fill={C.yellowDark} opacity={0.4} />
      {/* star-tipped end */}
      <circle cx={TIP.x} cy={TIP.y} r={22} fill={C.white} />
      <circle cx={TIP.x} cy={TIP.y} r={12} fill={C.yellow} opacity={0.6} />
      {anim === "sparkle" && (
        <g transform={`translate(${TIP.x} ${TIP.y})`}>
          {RAYS.map((a) => {
            const r = (a * Math.PI) / 180;
            return (
              <line key={a} x1={f1(Math.cos(r) * grow * 0.4)} y1={f1(Math.sin(r) * grow * 0.4)}
                x2={f1(Math.cos(r) * grow)} y2={f1(Math.sin(r) * grow)}
                stroke={C.yellow} strokeWidth={7} strokeLinecap="round" opacity={fade} />
            );
          })}
          <circle cx={0} cy={0} r={18 + grow * 0.3} fill={C.white} opacity={fade * 0.35} />
        </g>
      )}
    </g>
  );
}
