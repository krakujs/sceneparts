import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { rnd, mix } from "../backdrop/index";

// Underwater: blue water bands, light rays from the surface, a sandy seabed, seaweed and coral at the sides and rising bubbles.
// No time or weather here: the depth param sets how far light reaches.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, deep = (p.depth ?? "shallow") === "deep";
  const t = (p.anim ?? "drift") !== "none" ? f : 0;
  const top = deep ? "#2A7DB0" : "#6FD0EE", bottom = deep ? "#0A2F5C" : "#1A7FB8";
  const sand = deep ? "#5B6170" : "#E9D3A9";
  const weedCol = deep ? "#2F6B52" : "#3FA06A";
  const weed = (x: number, base: number, h: number, k: string) => {
    const sw = Math.sin(t / 30 + x) * 34;
    return <path key={k} d={`M ${x} ${base} Q ${(x + sw).toFixed(1)} ${base - h * 0.5} ${(x + sw * 0.6).toFixed(1)} ${base - h}`} stroke={weedCol} strokeWidth={18} fill="none" strokeLinecap="round" />;
  };
  const coral = (x: number, y: number, col: string, k: string) => (
    <g key={k}>
      <path d={`M ${x} ${y} L ${x - 40} ${y - 120}`} stroke={col} strokeWidth={22} strokeLinecap="round" />
      <path d={`M ${x} ${y} L ${x + 10} ${y - 160}`} stroke={col} strokeWidth={22} strokeLinecap="round" />
      <path d={`M ${x} ${y} L ${x + 50} ${y - 110}`} stroke={col} strokeWidth={22} strokeLinecap="round" />
    </g>
  );
  const bands = 14;
  return (
    <g>
      {Array.from({ length: bands }, (_, i) => <rect key={i} x={0} y={i * (1920 / bands)} width={1080} height={1920 / bands + 1} fill={mix(top, bottom, i / (bands - 1))} />)}
      {/* light rays from the surface */}
      {Array.from({ length: deep ? 1 : 4 }, (_, i) => {
        const x = 120 + i * 260 + Math.sin(t / 40 + i) * 30;
        return <path key={i} d={`M ${x} 0 L ${x + 80} 0 L ${x + 260} 1400 L ${x + 160} 1400 Z`} fill="#FFFFFF" opacity={deep ? 0.06 : 0.14} />;
      })}
      {/* seabed */}
      <path d="M 0 1420 Q 270 1360 540 1410 T 1080 1400 L 1080 1920 L 0 1920 Z" fill={sand} />
      {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={rnd(31, i) * 1080} cy={1480 + rnd(31, i + 10) * 400} rx={14 + rnd(31, i + 20) * 14} ry={8} fill={shade(sand, 0.12)} />)}
      {/* seaweed at the sides */}
      {weed(60, 1920, 380, "w1")}
      {weed(130, 1920, 300, "w2")}
      {weed(186, 1900, 240, "w3")}
      {weed(902, 1920, 340, "w4")}
      {weed(970, 1920, 420, "w5")}
      {weed(1034, 1910, 260, "w6")}
      {/* coral at the sides */}
      {coral(120, 1560, deep ? "#8A4A6A" : C.pink, "c1")}
      {coral(1000, 1620, deep ? "#7A4A3A" : C.orange, "c2")}
      {/* bubbles rising */}
      {Array.from({ length: 16 }, (_, i) => {
        const x = 100 + rnd(41, i) * 880, sp = 1.5 + rnd(41, i + 16) * 2.5;
        const y = 1920 - (((t * sp + rnd(41, i + 32) * 1920) % 1920) + 1920) % 1920;
        const r = 6 + rnd(41, i + 48) * 10;
        return (
          <g key={`b${i}`}>
            <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(1)} fill="#FFFFFF" opacity={0.3} />
            <circle cx={(x - r * 0.3).toFixed(1)} cy={(y - r * 0.3).toFixed(1)} r={(r * 0.3).toFixed(1)} fill="#FFFFFF" opacity={0.7} />
          </g>
        );
      })}
    </g>
  );
}
