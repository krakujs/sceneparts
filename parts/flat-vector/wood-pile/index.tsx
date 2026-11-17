import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stacked firewood: a neat rectangular pile of split logs with cut ends showing in the front.
// About 640 px wide and 250 px tall at s = 1 (room scale). Origin = bottom centre (rests on y). anim: bob, wobble, pop.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const ROWS = [0, 1, 2];          // row index from the bottom
const COLS = [-270, -190, -110, -30, 50, 130, 210];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const bark = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const rowY = (r: number) => -80 - r * 84;   // top of each row
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {ROWS.map((r) => (
          <g key={r}>
            {/* log bodies, one row, with a shaded lower edge */}
            <rect x={-320} y={rowY(r)} width={640} height={80} rx={34} fill={bark} />
            <rect x={-320} y={rowY(r) + 56} width={640} height={24} rx={12} fill={shade(bark, 0.25)} />
            {/* cut ends sit on the front of the stack, staggered */}
            {COLS.filter((_, i) => (i + r) % 2 === 0).map((cx) => (
              <g key={cx}>
                <ellipse cx={cx} cy={rowY(r) + 40} rx={30} ry={34} fill={wood} />
                <ellipse cx={cx} cy={rowY(r) + 40} rx={16} ry={18} fill={shade(wood, 0.12)} />
                <circle cx={cx} cy={rowY(r) + 40} r={5} fill={shade(wood, 0.3)} />
              </g>
            ))}
          </g>
        ))}
      </g>
    </g>
  );
}
