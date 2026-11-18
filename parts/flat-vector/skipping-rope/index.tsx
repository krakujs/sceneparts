import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Skipping rope: two chunky handles held apart by a rope that loops down to the floor. Origin = floor
// centre (the bottom of the loop touches y). anim "swing" turns the loop over and back like a rope being
// skipped. About 520 px wide and 720 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const RX = 230, RY = 300; // loop radii, its bottom at y = 0, centre at y = -RY

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const handleC = p.color && p.color !== "none" ? p.color : C.orange;
  const ropeC = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  // swing: the loop turns, so its visible width changes from full to a thin line and back
  const turn = anim === "swing" ? Math.max(0.12, Math.abs(Math.cos((f * 2 * Math.PI) / 36))) : 1;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const pop = anim === "pop" ? 1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI) : 1;
  const handle = (hx: number) => (
    <g transform={`translate(${hx} -640)`}>
      <rect x={-34} y={-130} width={68} height={260} rx={34} fill={handleC} />
      <rect x={-34} y={-130} width={68} height={260} rx={34} fill="none" stroke={shade(handleC, 0.2)} strokeWidth={0} />
      <rect x={-22} y={-100} width={12} height={200} rx={6} fill={C.white} opacity={0.3} />
      <circle cx={0} cy={-130} r={16} fill={ropeC} />
      <circle cx={0} cy={130} r={16} fill={ropeC} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) scale(${f1(pop)})`}>
      <ellipse cx={0} cy={0} rx={RX + 20} ry={12} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* rope loop: squeezed horizontally when turning */}
        <g transform={`scale(${f1(turn)} 1)`}>
          <ellipse cx={0} cy={-RY} rx={RX} ry={RY} fill="none" stroke={ropeC} strokeWidth={14} />
        </g>
        {handle(-210)}
        {handle(210)}
      </g>
    </g>
  );
}
