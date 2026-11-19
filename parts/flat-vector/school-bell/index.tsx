import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round red electric school gong bell on a square wall plate, with a striker arm pivoting from a bracket.
// Wall item: centred on (x, y), default y = 760. anim "ring": the striker swings and hits the dome in a
// 30-frame loop, and sound lines ripple out from the bell as it strikes.
const f1 = (v: number) => v.toFixed(1);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const plate = p.color2 && p.color2 !== "none" ? p.color2 : "#DDE2EA";
  const ring = p.anim === "ring";
  const cyc = (f % 30) / 30;
  const swing = ring ? Math.sin(cyc * 2 * Math.PI) * 10 : 0;
  const waveOp = ring ? 0.9 * (1 - cyc) : 0;
  const grow = ring ? 1 + 0.12 * cyc : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* sound lines, both sides, fading as they spread */}
      <g opacity={waveOp.toFixed(3)} transform={`scale(${f1(grow)})`} fill="none" stroke={red} strokeWidth={10} strokeLinecap="round">
        <path d="M -176 -64 Q -196 0 -176 64" />
        <path d="M -212 -100 Q -244 0 -212 100" />
        <path d="M 176 -64 Q 196 0 176 64" />
        <path d="M 212 -100 Q 244 0 212 100" />
      </g>
      {/* wall plate with screws */}
      <rect x={-150} y={-150} width={300} height={300} rx={40} fill={plate} />
      <rect x={-150} y={-150} width={300} height={300} rx={40} fill="none" stroke={shade(plate, 0.12)} strokeWidth={6} />
      {[[-120, -120], [120, -120], [-120, 120], [120, 120]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={7} fill={shade(plate, 0.3)} />
      ))}
      {/* bracket holding the striker pivot */}
      <rect x={-22} y={-186} width={44} height={40} rx={8} fill={C.greyDark} />
      {/* dome: red with a darker shadow side */}
      <circle cx={0} cy={0} r={120} fill={shade(red, 0.2)} />
      <circle cx={-12} cy={-10} r={106} fill={red} />
      {/* flange at the base of the dome */}
      <rect x={-132} y={96} width={264} height={26} rx={13} fill={shade(red, 0.35)} />
      {/* shine */}
      <path d="M -80 -20 A 90 90 0 0 1 -12 -92" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" opacity={0.4} />
      {/* striker arm, pivoting at the bracket */}
      <g transform={`rotate(${f1(swing)} 0 -170)`}>
        <rect x={-6} y={-172} width={12} height={58} rx={6} fill={C.greyDark} />
        <circle cx={0} cy={-116} r={12} fill={C.greyDark} />
      </g>
    </g>
  );
}
