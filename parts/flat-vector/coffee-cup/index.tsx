import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Coffee cup (preset of flat-vector/drink): white cup on a saucer, dark coffee with a pale latte-art heart, steam.
const LOOK = { vessel: "cup", color: "#FFFFFF", liquid: "#4B2A1A", steam: true, h: 210 };
const HEART = "M 0 12 C -10 4 -26 -4 -26 -14 C -26 -22 -15 -25 -8 -20 C -4 -17 -1 -14 0 -12 C 1 -14 4 -17 8 -20 C 15 -25 26 -22 26 -14 C 26 -4 10 4 0 12 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560, h = q.h;
  const anim = q.anim ?? "none";
  const tr = anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6).toFixed(1)})`
    : anim === "wobble" ? `rotate(${(Math.sin((f * 2 * Math.PI) / 40) * 3).toFixed(1)})` : "";
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${x} ${y}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={tr}>
          {/* latte-art heart floating on the coffee surface */}
          <g transform={`translate(0 ${2 - h}) scale(1.4 0.7) translate(0 6.5)`}>
            <path d={HEART} fill="#F1DDB8" />
            <path d="M -12 -2 Q 0 -8 12 -2" fill="none" stroke="#FBF2E2" strokeWidth={2.4} strokeLinecap="round" />
          </g>
        </g>
      </g>
    </g>
  );
}
