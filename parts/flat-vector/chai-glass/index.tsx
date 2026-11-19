import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Chai glass (preset of flat-vector/drink): small ribbed Indian cutting-chai tumbler with milky orange-brown chai and steam.
const LOOK = { vessel: "tumbler", liquid: "#D4924F", level: 0.86, steam: true, h: 200 };
const f1 = (v: number) => v.toFixed(1);
const RIBS = [-29, -10, 10, 29];

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
          {/* thick pressed base */}
          <rect x={-58} y={-16} width={116} height={16} rx={7} fill="#B9DCEE" opacity={0.6} />
          {/* vertical ribs: a dark groove with a light edge beside it */}
          {RIBS.map((rx) => (
            <g key={rx}>
              <line x1={rx} y1={-0.1 * h} x2={rx} y2={-0.9 * h} stroke="#8A5A3C" strokeOpacity={0.22} strokeWidth={3.5} strokeLinecap="round" />
              <line x1={rx + 4} y1={-0.12 * h} x2={rx + 4} y2={-0.88 * h} stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={2.5} strokeLinecap="round" />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
