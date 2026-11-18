import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector thought cloud: a fluffy cloud made of round lobes with two small trailing puffs, a white die-cut
// edge, shadow and one darker shade. Floats from p.f only. Centre (x, y), about 460 px wide at s = 1.

const LOBES = [
  { x: -100, y: -10, r: 100 },
  { x: 0, y: -70, r: 115 },
  { x: 105, y: -5, r: 100 },
  { x: 0, y: 50, r: 90 },
  { x: -150, y: 150, r: 36 },
  { x: -200, y: 215, r: 20 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.greyLight;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim: string = p.anim ?? "bob";
  const flip = p.flip ? -1 : 1;
  let dy = 0, sc = 1;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.2) * 0.03;
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc * flip} ${s * k * sc})`}>
      {LOBES.map((c, i) => (
        <circle key={`s${i}`} cx={c.x} cy={c.y + 16} r={c.r} fill={C.shadow} stroke={C.shadow} strokeWidth={34} />
      ))}
      {LOBES.map((c, i) => (
        <circle key={`e${i}`} cx={c.x} cy={c.y} r={c.r} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={34} />
      ))}
      {LOBES.map((c, i) => (
        <circle key={`d${i}`} cx={c.x} cy={c.y + 14} r={c.r} fill={shade(col, 0.18)} />
      ))}
      {LOBES.map((c, i) => (
        <circle key={`c${i}`} cx={c.x} cy={c.y} r={c.r} fill={col} />
      ))}
      <ellipse cx={-120} cy={-70} rx={30} ry={16} transform="rotate(-25 -120 -70)" fill="#FFFFFF" opacity={0.8} />
    </g>
  );
}
