import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wheel pulley on a floor-standing frame: a rope runs over the wheel, with a weight hanging on the left and a
// loose handle on the right. Origin = floor centre under the base. About 730 px tall and 360 px wide at s = 1.
// anim "lift": the weight rises while the free end drops, and the wheel turns.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const WC = -600; // wheel centre height
const WR = 130; // wheel radius

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wheelCol = p.color && p.color !== "none" ? p.color : C.orange;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const lift = anim === "lift" ? (160 * (1 - Math.cos((f * 2 * Math.PI) / 120))) / 2 : 0;
  const spin = lift * 0.8; // degrees the wheel turns as the rope moves
  const weightTop = -330 - lift; // the weight rises on the left
  const handleY = -300 + lift; // the free end drops on the right
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* base, post and yoke */}
        <rect x={-130} y={-36} width={260} height={36} rx={10} fill={frame} />
        <rect x={-20} y={WC} width={40} height={WC * -1 - 36} rx={8} fill={frame} />
        <rect x={-160} y={-660} width={320} height={26} rx={10} fill={frame} />
        {/* rope: left strand down to the weight, right strand down to the free end */}
        <path d={`M-${WR},${WC} L-${WR},${weightTop} M${WR},${WC} L${WR},${handleY}`}
          fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" />
        {/* wheel with a groove and turning spokes */}
        <circle cx={0} cy={WC} r={WR} fill={wheelCol} />
        <circle cx={0} cy={WC} r={WR - 20} fill="none" stroke={shade(wheelCol, 0.22)} strokeWidth={14} />
        <g transform={`rotate(${f1(spin)} 0 ${WC})`}>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={-12} y={WC - (WR - 30)} width={24} height={(WR - 30) * 2} rx={8}
              fill={shade(wheelCol, 0.15)} transform={`rotate(${k * 60} 0 ${WC})`} />
          ))}
        </g>
        <circle cx={0} cy={WC} r={26} fill={frame} />
        {/* weight on the left strand */}
        <rect x={-180} y={weightTop} width={100} height={100} rx={10} fill={frame} />
        <rect x={-180} y={weightTop + 36} width={100} height={8} fill={shade(frame, 0.25)} />
        {/* free end with a loop handle on the right strand */}
        <rect x={112} y={handleY} width={36} height={26} rx={8} fill={C.inkSoft} />
      </g>
    </g>
  );
}
