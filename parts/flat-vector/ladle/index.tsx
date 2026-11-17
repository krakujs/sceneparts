import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Soup ladle: a slim steel handle with a hook curl at the top end, and a deep round bowl at the bottom end,
// the handle joined to the bowl's rim. Hangs upright on its bowl, leaning a little.
// Origin = bottom of the bowl (resting point). Honours flip, s and anim.
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
  const c = p.color && p.color !== "none" ? p.color : "#C9D1DC";
  const dk = shade(c, 0.22);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <g transform="rotate(-8)">
          {/* hook curl at the top end of the handle */}
          <path d="M 0 -480 C 46 -500 52 -552 22 -566 C 2 -574 -14 -560 -4 -544" fill="none" stroke={c} strokeWidth={18} strokeLinecap="round" />
          {/* slim tapered handle, joined to the rim of the bowl */}
          <path d="M -14 -150 L -9 -480 L 9 -480 L 14 -150 Z" fill={c} />
          <path d="M 4 -470 L 9 -480 L 14 -150 L 6 -150 Z" fill={dk} />
          {/* bowl: deep half-round body, open rim on top */}
          <path d="M -110 -110 A 110 110 0 0 0 110 -110 Z" fill={c} />
          <path d="M 60 -108 A 110 110 0 0 0 110 -110 A 110 110 0 0 0 40 -10 Q 62 -40 60 -108 Z" fill={dk} />
          <ellipse cx={0} cy={-110} rx={110} ry={30} fill={c} />
          <ellipse cx={0} cy={-110} rx={92} ry={22} fill={shade(c, 0.4)} />
        </g>
      </g>
    </g>
  );
}
