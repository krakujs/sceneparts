import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Dish } from "../dish/index";

// Fruit bowl (preset of flat-vector/dish): bowl heaped with round fruit, a banana and a bunch of grapes on top.
const LOOK = { vessel: "bowl", w: 440, vesselColor: "#FFFFFF", fill: "balls", fillColor: "#FF8A3D", fillColor2: "#E8503F", steam: false };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator, so extra SVG on top moves with the bowl. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const GRAPES: [number, number][] = [[0.16, -0.36], [0.23, -0.36], [0.3, -0.36], [0.195, -0.415], [0.265, -0.415], [0.23, -0.47]];

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
          {/* banana lying across the top of the heap */}
          <path d={`M ${X(-0.22)} ${-X(0.5)} Q ${X(0.03)} ${-X(0.84)} ${X(0.3)} ${-X(0.58)} Q ${X(0.03)} ${-X(0.68)} ${X(-0.22)} ${-X(0.5)} Z`} fill="#FFD23F" />
          <path d={`M ${X(0.03)} ${-X(0.76)} Q ${X(0.12)} ${-X(0.68)} ${X(0.25)} ${-X(0.62)}`} stroke="#E0A21F" strokeWidth={X(0.012)} fill="none" strokeLinecap="round" />
          <circle cx={X(-0.22)} cy={-X(0.5)} r={X(0.02)} fill="#5E3B26" />
          <circle cx={X(0.31)} cy={-X(0.6)} r={X(0.02)} fill="#5E3B26" />
          {/* bunch of grapes, front right */}
          {GRAPES.map(([u, v], i) => (
            <g key={i}>
              <circle cx={X(u)} cy={X(v)} r={X(0.035)} fill="#7B5CD6" />
              <circle cx={X(u) + X(0.012)} cy={X(v) + X(0.02)} r={X(0.018)} fill="#5A40A8" opacity={0.6} />
              <circle cx={X(u) - X(0.012)} cy={X(v) - X(0.012)} r={X(0.009)} fill="#FFFFFF" opacity={0.45} />
            </g>
          ))}
          <path d={`M ${X(0.23)} ${-X(0.5)} L ${X(0.23)} ${-X(0.52)}`} stroke="#5E3B26" strokeWidth={X(0.012)} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}
