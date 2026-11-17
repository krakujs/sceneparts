import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";
import { C } from "../style/index";

// Juice glass (preset of flat-vector/drink): glass of orange juice with an orange slice hooked on the rim.
const LOOK = { vessel: "glass", h: 250, color: "#DDEFF8", liquid: "#FF9A2E", level: 0.8, ice: false };
const f1 = (v: number) => v.toFixed(1);
const SEGS = [0, 60, 120, 180, 240, 300];

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560, h = q.h;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* orange slice hooked over the rim */}
          <g transform={`translate(56 ${f1(-h - 6)}) rotate(-15)`}>
            <circle r={34} fill={C.orange} />
            <circle r={30} fill="#FFF3DC" />
            <circle r={27} fill="#FFB23E" />
            {SEGS.map((a) => (
              <line key={a} x1={0} y1={0} x2={f1(Math.cos((a * Math.PI) / 180) * 26)} y2={f1(Math.sin((a * Math.PI) / 180) * 26)} stroke="#FFF3DC" strokeWidth={3} strokeLinecap="round" />
            ))}
            <circle r={4} fill="#FFF3DC" />
          </g>
        </g>
      </g>
    </g>
  );
}
