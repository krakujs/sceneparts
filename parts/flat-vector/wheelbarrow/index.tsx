import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Single-wheel barrow, room scale: about 690 px wide and 400 px tall at s = 1. Origin = floor centre.
// load = true puts a mound of soil in the tray. anim "roll": the wheel turns.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const tray = p.color && p.color !== "none" ? p.color : C.orange;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const load = p.load !== false;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? (f * 5) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-65} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform="translate(-60 0)">
          <rect x={-246} y={-16} width={84} height={16} rx={8} fill={shade(frame, 0.2)} />
          <rect x={-222} y={-170} width={22} height={160} rx={8} fill={frame} />
          <line x1={-200} y1={-300} x2={-380} y2={-236} stroke={frame} strokeWidth={24} strokeLinecap="round" />
          <circle cx={-380} cy={-236} r={18} fill={shade(frame, 0.25)} />
          <line x1={66} y1={-150} x2={170} y2={-105} stroke={frame} strokeWidth={22} strokeLinecap="round" />
          <path d="M -200 -340 L 130 -340 L 66 -150 L -200 -150 Z" fill={tray} />
          <path d="M -186 -330 L 118 -330 L 62 -176 L -186 -176 Z" fill={shade(tray, 0.15)} />
          <rect x={-206} y={-356} width={340} height={22} rx={10} fill={shade(tray, 0.2)} />
          {load && (
            <g>
              <path d="M -186 -342 Q -140 -398 -70 -380 Q -10 -410 60 -372 Q 100 -360 118 -344 Z" fill={C.brown} />
              <circle cx={-120} cy={-374} r={10} fill={C.brownDark} opacity={0.6} />
              <circle cx={-10} cy={-392} r={12} fill={C.brownDark} opacity={0.6} />
              <circle cx={70} cy={-374} r={9} fill={C.brownDark} opacity={0.6} />
            </g>
          )}
          <g transform={`rotate(${f1(spin)} 170 -105)`}>
            <circle cx={170} cy={-105} r={105} fill={C.inkSoft} />
            <circle cx={170} cy={-105} r={66} fill={C.greyLight} />
            <rect x={163} y={-165} width={14} height={120} rx={6} fill={frame} />
            <rect x={163} y={-165} width={14} height={120} rx={6} fill={frame} transform="rotate(60 170 -105)" />
            <rect x={163} y={-165} width={14} height={120} rx={6} fill={frame} transform="rotate(120 170 -105)" />
            <circle cx={170} cy={-105} r={16} fill={frame} />
          </g>
        </g>
      </g>
    </g>
  );
}
