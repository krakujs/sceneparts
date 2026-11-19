import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Royal crown: a gold band with five points topped by balls, jewels set in the band and a velvet cap.
// Origin = bottom centre (y). About 480 px wide and 340 px tall at s = 1. anim "sparkle": the jewels twinkle.
const f1 = (v: number) => v.toFixed(1);
const GEMS: [number, number, string][] = [[-120, -62, C.red], [0, -62, C.teal], [120, -62, C.red]];
const POINTS = [-200, -100, 0, 100, 200];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const velvet = p.color2 && p.color2 !== "none" ? p.color2 : C.purple;
  const anim: string = p.anim ?? "none";
  const tw = (i: number) => (anim === "sparkle" ? 0.55 + 0.45 * Math.sin((f * 2 * Math.PI) / 30 + i * 1.3) : 1);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={240} ry={14} fill={C.shadow} />
      {/* velvet cap arching above the band */}
      <path d="M -190 -130 Q -200 -300 0 -330 Q 200 -300 190 -130 Z" fill={velvet} />
      <path d="M 40 -322 Q 190 -290 190 -130 L 150 -130 Q 150 -270 40 -322 Z" fill={shade(velvet, 0.25)} opacity={0.7} />
      {/* gold points with balls on top */}
      {POINTS.map((px, i) => {
        const h = i === 2 ? -300 : -250;
        return (
          <g key={px}>
            <path d={`M ${px - 52} -128 L ${px} ${h} L ${px + 52} -128 Z`} fill={gold} />
            <path d={`M ${px} ${h} L ${px + 52} -128 L ${px} -128 Z`} fill={shade(gold, 0.15)} />
            <circle cx={px} cy={h - 14} r={22} fill={gold} />
            <circle cx={px - 6} cy={h - 20} r={7} fill={C.white} opacity={0.5} />
          </g>
        );
      })}
      {/* band */}
      <rect x={-220} y={-130} width={440} height={130} rx={18} fill={gold} />
      <rect x={-220} y={-40} width={440} height={40} rx={14} fill={shade(gold, 0.18)} />
      {/* ermine-style trim: a white strip with black spots above the base */}
      <rect x={-204} y={-96} width={408} height={18} rx={9} fill={C.white} opacity={0.9} />
      {[-160, -110, -60, 0, 60, 110, 160].map((ex) => <circle key={ex} cx={ex} cy={-87} r={4} fill={C.ink} />)}
      {/* jewels */}
      {GEMS.map(([gx, gy, c], i) => (
        <g key={gx} opacity={tw(i)}>
          <circle cx={gx} cy={gy - 14} r={28} fill={c} />
          <circle cx={gx - 8} cy={gy - 22} r={8} fill={C.white} opacity={0.6} />
        </g>
      ))}
      {/* sparkle stars next to the centre jewel */}
      {anim === "sparkle" && (
        <path d="M 0 -150 L 6 -134 L 22 -128 L 6 -122 L 0 -106 L -6 -122 L -22 -128 L -6 -134 Z" fill={C.white} opacity={tw(3)} transform="translate(0 0)" />
      )}
    </g>
  );
}
