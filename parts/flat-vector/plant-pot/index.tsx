import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Empty terracotta flower pot with a rim and a saucer. Origin = centre of the saucer on the floor.
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
  const c = p.color && p.color !== "none" ? p.color : "#C9704E";
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-150} y={-22} width={300} height={22} rx={10} fill={shade(c, 0.2)} />
        <path d="M -100 -236 L -80 -26 Q -80 -22 -74 -22 H 74 Q 80 -22 80 -26 L 100 -236 Z" fill={c} />
        <path d="M 40 -236 L 100 -236 L 80 -26 L 40 -26 Z" fill={shade(c, 0.2)} />
        <rect x={-122} y={-262} width={244} height={40} rx={14} fill={c} />
        <rect x={52} y={-262} width={70} height={40} rx={14} fill={shade(c, 0.2)} />
        <ellipse cx={0} cy={-262} rx={108} ry={14} fill={shade(c, 0.45)} />
      </g>
    </g>
  );
}
