import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Concert flute held across the body, tilted so the mouth end is up and to the left.
// Origin = bottom centre; the lowest end rests on y. About 740 px long at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const ANG = 12;
const KEYS = [-230, -150, -80, -10, 60, 130, 200];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const metal = p.color && p.color !== "none" ? p.color : C.greyLight;
  const anim: string = p.anim ?? "none";
  const R = 360;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 -92) rotate(${ANG})`}>
          {/* tube */}
          <rect x={-R} y={-17} width={2 * R} height={34} rx={17} fill={metal} />
          <rect x={-R} y={5} width={2 * R} height={12} rx={6} fill={shade(metal, 0.2)} />
          {/* head joint, slightly darker, with the embouchure hole */}
          <rect x={-R} y={-17} width={150} height={34} rx={17} fill={shade(metal, 0.1)} />
          <ellipse cx={-290} cy={-2} rx={22} ry={9} fill={C.ink} opacity={0.8} />
          {/* end cap */}
          <rect x={R - 16} y={-19} width={16} height={38} rx={6} fill={shade(metal, 0.2)} />
          {/* ring rollers and keys along the top */}
          {KEYS.map((kx, i) => (
            <g key={i}>
              <rect x={kx - 14} y={-30} width={28} height={14} rx={6} fill={C.greyDark} />
              <circle cx={kx} cy={-34} r={11} fill={C.greyLight} stroke="none" />
              <circle cx={kx} cy={-34} r={5} fill={C.greyDark} />
            </g>
          ))}
          {/* tone holes along the underside, shown as dark ovals */}
          {[-120, 20, 110].map((kx, i) => (
            <ellipse key={i} cx={kx} cy={10} rx={8} ry={5} fill={C.greyDark} />
          ))}
          {/* highlight */}
          <rect x={-R + 170} y={-11} width={R * 2 - 260} height={5} rx={2.5} fill={C.white} opacity={0.6} />
        </g>
      </g>
    </g>
  );
}
