import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Dyson sphere: a bright star enclosed by a partial shell of solar-panel tiles, with gaps where light escapes.
// Origin = centre of the star; about 640 px across at s = 1. Built for a dark background; a faint dark disc sits behind it.
// anim "pulse": the star's glow breathes and the shell turns slowly.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const R = 300;
const DEG = Math.PI / 180;

type Pt = { x: number; y: number; z: number };
const project = (phi: number, lam: number): Pt => ({
  x: R * Math.cos(phi * DEG) * Math.sin(lam * DEG),
  y: -R * Math.sin(phi * DEG),
  z: R * Math.cos(phi * DEG) * Math.cos(lam * DEG),
});

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const anim: string = p.anim ?? "pulse";
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60);
  const turn = anim === "pulse" ? f * 0.25 : 0;
  const back: string[] = [];
  const front: string[] = [];
  for (let i = -3; i <= 3; i++) {
    for (let j = 0; j < 12; j++) {
      if ((i * 3 + j * 7) % 9 === 0) continue; // gaps in the shell
      const phi = i * 20, lam = j * 30 + turn;
      const c = project(phi, lam + 15);
      const corners = [project(phi - 7, lam + 4), project(phi - 7, lam + 26), project(phi + 7, lam + 26), project(phi + 7, lam + 4)];
      const d = corners.map((q, k) => `${k === 0 ? "M" : "L"} ${f1(q.x)} ${f1(q.y)}`).join(" ") + " Z";
      (c.z > 0 ? front : back).push(d);
    }
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      <circle r={R + 30} fill="#0B1024" opacity={0.3} />
      {/* star glow */}
      <circle r={340} fill={C.yellow} opacity={0.08 + 0.06 * pulse} />
      <circle r={240} fill={C.yellow} opacity={0.14 + 0.1 * pulse} />
      {/* shell tiles behind the star */}
      {back.map((d, k) => (
        <path key={`b${k}`} d={d} fill="#1B2440" stroke={C.skyDeep} strokeWidth={2} strokeLinejoin="round" opacity={0.8} />
      ))}
      {/* star */}
      <circle r={160} fill={C.yellow} />
      <circle r={120 + 6 * pulse} fill="#FFE58A" />
      <circle r={70} fill="#FFF6CC" />
      {/* shell tiles in front of the star */}
      {front.map((d, k) => (
        <path key={`f${k}`} d={d} fill="#34497A" stroke={C.skyDeep} strokeWidth={3} strokeLinejoin="round" opacity={0.95} />
      ))}
    </g>
  );
}
