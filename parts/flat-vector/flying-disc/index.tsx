import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flying disc (generic plastic flying disc) seen at an angle: a thick rim, a flat top with a raised dome
// and an inner ring. It hovers above a shadow on the ground at y. About 480 px wide at s = 1.
// anim "spin": the disc turns about its vertical axis, going edge-on and back.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1400;
  const disc = p.color && p.color !== "none" ? p.color : C.orange;
  const ring = p.accent && p.accent !== "none" ? p.accent : C.blue;
  const anim: string = p.anim ?? "none";
  const turn = anim === "spin" ? (f * 2 * Math.PI) / 50 : 0;
  const sx = Math.max(0.08, Math.abs(Math.cos(turn)));
  const hover = anim === "spin" ? -220 + Math.sin(turn * 2) * 10 : -220;
  const shadowScale = 1 - Math.min(0.3, (-hover - 150) / 500);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190 * shadowScale} ry={18 * shadowScale} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(hover)}) scale(${f1(sx)} 1)`}>
          {/* underside of the rim (thickness) */}
          <ellipse cx={0} cy={26} rx={240} ry={118} fill={shade(disc, 0.25)} />
          {/* rim top */}
          <ellipse cx={0} cy={0} rx={240} ry={118} fill={disc} />
          {/* flat inner area */}
          <ellipse cx={0} cy={0} rx={200} ry={96} fill={shade(disc, 0.1)} />
          {/* raised dome */}
          <ellipse cx={0} cy={-2} rx={150} ry={70} fill={disc} />
          <ellipse cx={0} cy={-2} rx={120} ry={54} fill={ring} opacity={0.85} />
          <ellipse cx={-30} cy={-22} rx={40} ry={14} fill={C.white} opacity={0.4} />
        </g>
      </g>
    </g>
  );
}
