import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Plate stack: five empty plates stacked neatly, seen from slightly above. Empty plates only (see dish for food).
// Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const edge = shade(c, 0.2), well = shade(c, 0.07);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {[0, 1, 2, 3, 4].map((i) => {
          const cy = -66 - 16 * i;
          return (
            <g key={i}>
              <ellipse cx={0} cy={cy + 10} rx={170} ry={56} fill={edge} />
              <ellipse cx={0} cy={cy} rx={170} ry={56} fill={c} />
              <ellipse cx={0} cy={cy + 2} rx={116} ry={36} fill={well} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
