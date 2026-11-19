import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Spatula: flipping spatula / turner with a slotted steel blade and a wooden handle, leaning slightly.
// Origin = bottom of the handle (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const STEEL = "#C9D1DC";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={90} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        <g transform="rotate(16)">
          {/* handle */}
          <rect x={-24} y={-250} width={48} height={250} rx={24} fill={c} />
          <rect x={-24} y={-190} width={48} height={8} rx={4} fill={shade(c, 0.22)} />
          <rect x={-24} y={-160} width={48} height={8} rx={4} fill={shade(c, 0.22)} />
          {/* neck */}
          <rect x={-12} y={-272} width={24} height={36} rx={6} fill={shade(STEEL, 0.2)} />
          {/* blade */}
          <rect x={-82} y={-400} width={164} height={140} rx={24} fill={STEEL} />
          <rect x={46} y={-392} width={32} height={124} rx={14} fill={shade(STEEL, 0.2)} />
          {/* slots */}
          {[-36, 0, 36].map((xx, i) => (
            <rect key={i} x={xx - 8} y={-380} width={16} height={70} rx={8} fill={C.greyDark} />
          ))}
        </g>
      </g>
    </g>
  );
}
