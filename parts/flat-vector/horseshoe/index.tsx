import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Iron horseshoe lying open-side up on the floor, with nail holes along the curve. Hero scale: about 400 px wide at s = 1.
// Origin = floor under the middle of the curve. anim "spin": the shoe turns around its centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const CY = -200, RO = 200, RI = 150, RM = 175;
const SHOE = `M -200 ${CY} A ${RO} ${RO} 0 0 0 200 ${CY} L 150 ${CY} A ${RI} ${RI} 0 0 1 -150 ${CY} Z`;
const HOLES = [30, 62, 118, 150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const iron = p.color && p.color !== "none" ? p.color : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? (f * 3) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(spin)} 0 -100)`}>
          <path d={SHOE} transform="translate(0 10)" fill={shade(iron, 0.35)} />
          <path d={SHOE} fill={iron} />
          {HOLES.map((a) => {
            const r = (a * Math.PI) / 180;
            return <circle key={a} cx={Number(f1(Math.cos(r) * RM))} cy={Number(f1(CY + Math.sin(r) * RM))} r={11} fill={C.ink} />;
          })}
        </g>
      </g>
    </g>
  );
}
