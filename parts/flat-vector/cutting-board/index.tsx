import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cutting board: wooden chopping board with a handle hole; optional chopped vegetables on top.
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
  const c = p.color && p.color !== "none" ? p.color : "#C98B55";
  const edge = shade(c, 0.22), dark = shade(c, 0.45), grain = shade(c, 0.14);
  const food = !!p.food;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={216} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* board thickness */}
        <rect x={-190} y={-40} width={380} height={40} rx={18} fill={edge} />
        {/* top face */}
        <rect x={-190} y={-200} width={380} height={176} rx={34} fill={c} />
        {[-150, -112, -74].map((yy, i) => (
          <rect key={i} x={-150 + i * 14} y={yy} width={230 - i * 30} height={8} rx={4} fill={grain} />
        ))}
        {/* handle hole */}
        <rect x={120} y={-160} width={46} height={26} rx={13} fill={dark} />
        {food && (
          <g>
            {/* carrot coins */}
            {[[-110, -110], [-60, -80], [-112, -58]].map(([cx, cy], i) => (
              <g key={`c${i}`}>
                <circle cx={cx} cy={cy} r={26} fill={C.orange} />
                <circle cx={cx} cy={cy} r={12} fill="#FFD08A" />
              </g>
            ))}
            {/* pepper cubes */}
            <rect x={-6} y={-150} width={46} height={46} rx={9} fill={C.green} transform="rotate(8 17 -127)" />
            <rect x={44} y={-146} width={40} height={40} rx={8} fill={C.lime} transform="rotate(-10 64 -126)" />
            {/* cucumber slices */}
            <circle cx={60} cy={-72} r={26} fill="#7DBE5A" />
            <circle cx={60} cy={-72} r={12} fill="#C9E8A6" />
          </g>
        )}
      </g>
    </g>
  );
}
