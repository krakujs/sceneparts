import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic safety razor standing upright: a grip, a neck and a head with a guard comb and blade strip. No brand.
// Origin = bottom of the grip; hero size. anim "shave" tilts the razor from its base, as if shaving.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "shave") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 36) * 6)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.blue;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={110} ry={10} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* grip with ridges and a darker right side */}
        <rect x={-36} y={-300} width={72} height={300} rx={30} fill={c} />
        <rect x={14} y={-290} width={22} height={280} rx={10} fill={shade(c, 0.2)} />
        {[-250, -220, -190, -160].map((gy) => (
          <path key={gy} d={`M -22 ${gy} L 2 ${gy}`} stroke={shade(c, 0.3)} strokeWidth={8} strokeLinecap="round" fill="none" />
        ))}
        {/* neck */}
        <rect x={-24} y={-334} width={48} height={44} rx={10} fill={C.greyDark} />
        {/* head: silver body, blade strip and guard comb on top */}
        <rect x={-96} y={-420} width={192} height={92} rx={26} fill={C.greyLight} />
        <rect x={-96} y={-352} width={192} height={24} rx={12} fill={C.grey} />
        <rect x={-90} y={-382} width={180} height={8} rx={4} fill={C.greyDark} />
        {[-80, -20, 40].map((gx) => (
          <rect key={gx} x={gx} y={-430} width={40} height={14} rx={7} fill={C.greyDark} />
        ))}
      </g>
    </g>
  );
}
