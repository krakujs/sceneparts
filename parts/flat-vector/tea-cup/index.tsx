import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";
import { C } from "../style/index";

// Tea cup (preset of flat-vector/drink): dainty cream teacup on a saucer, amber tea, steam and a small floral band.
const LOOK = { vessel: "teacup", color: "#F7EFE3", liquid: "#D98A2B", steam: true, h: 190 };
const f1 = (v: number) => v.toFixed(1);
const R = 95; // body radius at the band
const BY = -91; // band height (local, above the saucer)
// The front of the band curves down at the centre, like a ring seen from slightly above.
const front = (x: number) => BY + 18 * Math.sqrt(Math.max(0, 1 - (x / R) ** 2));
const BAND = Array.from({ length: 25 }, (_, i) => {
  const x = -0.9 * R + (1.8 * R * i) / 24;
  return `${i ? "L" : "M"} ${f1(x)} ${f1(front(x))}`;
}).join(" ");
const FLOWERS = [-66, -33, 0, 33, 66];
const PETALS = [0, 72, 144, 216, 288];

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
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          <path d={BAND} fill="none" stroke={C.skyDeep} strokeWidth={9} strokeLinecap="round" />
          {FLOWERS.map((fx) => {
            const k = Math.sqrt(Math.max(0, 1 - (fx / R) ** 2));
            return (
              <g key={fx} transform={`translate(${f1(fx)} ${f1(front(fx) - 2)}) scale(${f1(k)} 1)`}>
                {PETALS.map((a) => <circle key={a} cx={f1(Math.cos((a * Math.PI) / 180) * 6)} cy={f1(Math.sin((a * Math.PI) / 180) * 6)} r={5} fill="#FFFFFF" />)}
                <circle r={3.5} fill={C.yellow} />
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );
}
