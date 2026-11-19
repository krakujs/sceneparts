import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Centipede: a long segmented body of brown-orange ovals, one pair of legs per segment (near solid, far in
// shade). The legs ripple in a wave that travels from tail to head, driven by f. Friendly head with antennae.
// Origin = ground under the body, bottom centre; faces right; honours flip, s and vx.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, flip = !!p.flip;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const col: string = p.color ?? "#D9803F", dk = shade(col, 0.25), legC: string = p.legColor ?? "#5E3B26", legFar = shade(legC, 0.3);
  const N = 13, step = 26, rx = 19, ry = 15, BY = -40; // body centre height above ground
  const seg = Array.from({ length: N }, (_, i) => ({ i, cx: -150 + i * step }));
  const legSvg = (far: boolean) => seg.flatMap((g) => [0, 1].map((side) => {
    if ((side === 1) !== far) return null;
    // stride phase: a wave runs tail -> head; the far side is half a cycle out of phase
    const u = f * 0.28 - g.i * 0.5 + (far ? Math.PI : 0);
    const hipX = g.cx, hipY = BY + ry * 0.55;
    const lift = 10 * Math.max(0, Math.cos(u));
    const footX = g.cx + 16 * Math.sin(u) + 6, footY = -lift;
    const kneeX = (hipX + footX) / 2 + 12, kneeY = BY * 0.5 - 4;
    return <path key={`${far ? "f" : "n"}${g.i}`} d={`M ${hipX.toFixed(1)} ${hipY.toFixed(1)} L ${kneeX.toFixed(1)} ${kneeY.toFixed(1)} L ${footX.toFixed(1)} ${footY.toFixed(1)}`}
      stroke={far ? legFar : legC} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
  }));
  const hx = 190, hy = BY - 2, wob = Math.sin(f * 0.2) * 5;

  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={8} fill={C.shadow} />
      {legSvg(true)}
      {seg.map((g) => (
        <g key={`s${g.i}`}>
          <ellipse cx={g.cx} cy={BY + 3} rx={rx} ry={ry} fill={dk} />
          <ellipse cx={g.cx} cy={BY} rx={rx - 1} ry={ry - 1} fill={col} />
          <ellipse cx={g.cx + 4} cy={BY - 6} rx={6} ry={3} fill="#F2B27A" opacity={0.6} />
        </g>
      ))}
      {legSvg(false)}
      {/* head with antennae */}
      <path d={`M ${hx + 12} ${hy - 16} Q ${hx + 30} ${hy - 50} ${hx + 60 + wob} ${hy - 72}`} stroke={dk} strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d={`M ${hx + 18} ${hy - 18} Q ${hx + 40} ${hy - 44} ${hx + 74 - wob} ${hy - 60}`} stroke={dk} strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx={hx + 60 + wob} cy={hy - 72} r={5} fill={C.yellow} />
      <circle cx={hx + 74 - wob} cy={hy - 60} r={5} fill={C.yellow} />
      <ellipse cx={hx} cy={hy + 3} rx={30} ry={22} fill={dk} />
      <ellipse cx={hx} cy={hy} rx={29} ry={21} fill={shade(col, 0.1)} />
      <circle cx={hx + 12} cy={hy - 6} r={8} fill={C.white} />
      <circle cx={hx + 15} cy={hy - 5} r={4.5} fill={C.ink} />
      <circle cx={hx + 16.5} cy={hy - 7} r={1.5} fill={C.white} />
      <path d={`M ${hx + 12} ${hy + 10} Q ${hx + 20} ${hy + 15} ${hx + 26} ${hy + 8}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" fill="none" />
    </g>
  );
}
