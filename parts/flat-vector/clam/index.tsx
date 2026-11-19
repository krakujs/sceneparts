import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector ridged clam on the ground, seen from the side. Origin = bottom centre (y). About 200 px wide at s = 1.
// Faces right, honours flip, s and vx. The hinge is the left end of the shell.
// pose open: opens and closes slowly from p.f. closed: shut. chatter: quick small snapping open and shut.

const FLESH = "#F4A7B9";
const HX = -100, HY = -60; // hinge

// Radial ridges from the hinge to points on one valve's outer arc.
function ridges(upper: boolean, stroke: string) {
  return [0.2, 0.4, 0.6, 0.8].map((t, i) => {
    const th = upper ? Math.PI + t * Math.PI : t * Math.PI;
    const ex = 100 * Math.cos(th), ey = HY + 60 * Math.sin(th);
    return <path key={i} d={`M ${HX} ${HY} L ${ex.toFixed(1)} ${ey.toFixed(1)}`} stroke={stroke} strokeWidth={3.5} strokeLinecap="round" fill="none" />;
  });
}

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "open";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#D9C3A5", DK = shade(SH, 0.22);
  const open =
    pose === "closed" ? 0 :
    pose === "chatter" ? Math.max(0, Math.sin(f * 0.9)) * 14 :
    18 + 14 * Math.sin(f * 0.05);

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-60} rx={96} ry={54} fill={FLESH} />
      <g>
        <path d={`M ${HX} ${HY} A 100 60 0 0 0 100 ${HY} Z`} fill={SH} />
        {ridges(false, DK)}
      </g>
      <g transform={`rotate(${-open} ${HX} ${HY})`}>
        <path d={`M ${HX} ${HY} A 100 60 0 0 1 100 ${HY} Z`} fill={SH} />
        {ridges(true, DK)}
      </g>
    </g>
  );
}
