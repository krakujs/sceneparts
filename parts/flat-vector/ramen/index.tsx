import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Ramen (preset of flat-vector/dish): deep navy bowl of golden broth with noodles, a halved egg, fish cake,
// spring onion, chopsticks and steam.
const LOOK = { vessel: "deepbowl", w: 440, vesselColor: "#253058", rimColor: "#3A4A7A", fill: "strands", fillColor: "#F7E3A1", fillColor2: "#E9A146", garnish: "egg", steam: true };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the bowl. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const w: number = q.w ?? 440, s: number = q.s ?? 1, f: number = q.f ?? 0;
  const X = (u: number) => u * w;
  return (
    <g>
      <Dish {...q} />
      <g transform={`translate(${q.x ?? 540} ${q.y ?? 1560}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f, w)}>
          {/* chopsticks leaning out over the rim */}
          <line x1={X(0.14)} y1={-X(0.46)} x2={X(0.58)} y2={-X(1.0)} stroke="#B5814F" strokeWidth={X(0.018)} strokeLinecap="round" />
          <line x1={X(0.19)} y1={-X(0.46)} x2={X(0.66)} y2={-X(0.97)} stroke="#B5814F" strokeWidth={X(0.018)} strokeLinecap="round" />
          {/* fish cake slice standing at the back */}
          <path d={`M ${X(-0.1)} ${-X(0.44)} A ${X(0.1)} ${X(0.13)} 0 0 1 ${X(0.1)} ${-X(0.44)} Z`} fill="#FFFFFF" />
          <path d={`M ${X(-0.1)} ${-X(0.44)} L ${X(0.1)} ${-X(0.44)}`} stroke="#E0E4EC" strokeWidth={X(0.02)} strokeLinecap="round" />
          <path d={`M ${X(-0.05)} ${-X(0.47)} C ${X(-0.07)} ${-X(0.54)} ${X(0.05)} ${-X(0.56)} ${X(0.04)} ${-X(0.49)} C ${X(0.03)} ${-X(0.46)} ${X(-0.01)} ${-X(0.47)} ${X(-0.01)} ${-X(0.5)}`} stroke="#F27BA6" strokeWidth={X(0.014)} fill="none" strokeLinecap="round" />
          {/* two spring onion rings */}
          <circle cx={X(-0.05)} cy={-X(0.4)} r={X(0.03)} fill="#4BB46A" />
          <circle cx={X(-0.05)} cy={-X(0.4)} r={X(0.015)} fill="#A8D85A" />
          <circle cx={X(0.03)} cy={-X(0.35)} r={X(0.03)} fill="#4BB46A" />
          <circle cx={X(0.03)} cy={-X(0.35)} r={X(0.015)} fill="#A8D85A" />
        </g>
      </g>
    </g>
  );
}
