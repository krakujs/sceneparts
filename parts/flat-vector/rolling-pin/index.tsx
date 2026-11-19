import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Rolling pin: wooden barrel with a handle at each end, lying horizontally. anim "roll" moves the grain across the barrel.
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
  const c = p.color && p.color !== "none" ? p.color : "#E0B77A";
  const handle = shade(c, 0.15), dk = shade(c, 0.25);
  const roll = p.anim === "roll";
  const off = roll ? (f * 3) % 48 : 0;
  const grain = [0, 1, 2, 3, 4].map((k) => -112 + ((k * 48 + off) % 224));
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={290} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "roll" ? "none" : p.anim ?? "none", f)}>
        {/* handles and knobs, behind the barrel */}
        <rect x={130} y={-58} width={120} height={26} rx={13} fill={handle} />
        <rect x={-250} y={-58} width={120} height={26} rx={13} fill={handle} />
        <circle cx={250} cy={-45} r={26} fill={handle} />
        <circle cx={-250} cy={-45} r={26} fill={handle} />
        <circle cx={246} cy={-52} r={8} fill="#FFFFFF" opacity={0.25} />
        {/* barrel */}
        <rect x={-120} y={-90} width={240} height={90} fill={c} />
        <rect x={-120} y={-46} width={240} height={44} fill={dk} opacity={0.35} />
        {/* grain, moving when rolling */}
        {grain.map((gx, i) => (
          <rect key={i} x={gx} y={-82} width={6} height={74} rx={3} fill={shade(c, 0.25)} opacity={0.6} />
        ))}
        {/* end faces */}
        <ellipse cx={-120} cy={-45} rx={16} ry={45} fill={dk} />
        <ellipse cx={120} cy={-45} rx={16} ry={45} fill={shade(c, 0.4)} />
      </g>
    </g>
  );
}
