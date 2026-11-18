import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Yo-yo on its string, seen from the front: a fat round disc with its face showing and a hub cap in the
// middle, the rim edge visible underneath, and a string going up to a finger loop. About 300 px wide
// and 560 px tall at s = 1. Origin = top of the string (the finger loop hangs from x, y).
// anim "updown": the yo-yo drops to the end of the string and climbs back over 60 frames, and its face
// spins while it moves.
const f1 = (v: number) => v.toFixed(1);
const CY = 410; // centre of the face at rest
const R = 150; // face radius (300 px diameter)
const RIM = 58; // visible rim edge under the face: the second disc peeks out below
const NUB_TOP = CY - R - 16; // the axle nub the string ties to, on top of the face
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1000;
  const disc = p.color && p.color !== "none" ? p.color : C.red;
  const trim = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const cyc = ((f % 60) + 60) % 60;
  const drop = anim === "updown" ? 170 * (1 - Math.abs(cyc - 30) / 30) : 0;
  const spin = anim === "updown" ? f * 12 : 0; // degrees: the face turns 12 degrees a frame
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* finger loop */}
        <ellipse cx={0} cy={-24} rx={22} ry={22} fill="none" stroke={C.greyDark} strokeWidth={9} />
        {/* string from the finger loop down to the axle nub */}
        <line x1={0} y1={0} x2={0} y2={NUB_TOP + drop} stroke={C.ink} strokeWidth={3} />
        <g transform={`translate(0 ${f1(drop)})`}>
          {/* axle nub the string ties to */}
          <rect x={-12} y={NUB_TOP} width={24} height={20} rx={6} fill={trim} />
          {/* the second disc, behind the first: its edge shows as the dark crescent underneath */}
          <circle cx={0} cy={CY + RIM} r={R} fill={shade(disc, 0.3)} />
          {/* the first disc's face, with its rim band */}
          <circle cx={0} cy={CY} r={R} fill={disc} />
          <circle cx={0} cy={CY} r={R - 22} fill="none" stroke={shade(disc, 0.14)} strokeWidth={6} />
          <path d={`M ${-R + 6} ${CY + 40} Q 0 ${CY + 62} ${R - 6} ${CY + 40}`} fill="none" stroke={shade(disc, 0.4)} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
          {/* face markings turn with the spin */}
          <g transform={`rotate(${f1(spin)} 0 ${CY})`}>
            <circle cx={0} cy={CY - 98} r={12} fill={shade(disc, 0.3)} />
            <circle cx={0} cy={CY + 98} r={12} fill={shade(disc, 0.3)} />
            <rect x={-6} y={CY - 56} width={12} height={112} rx={6} fill={shade(disc, 0.14)} />
          </g>
          {/* sheen on the face */}
          <ellipse cx={-70} cy={CY - 70} rx={30} ry={12} transform={`rotate(-40 -70 ${CY - 70})`} fill="#FFFFFF" opacity={0.3} />
          {/* hub cap */}
          <circle cx={0} cy={CY} r={40} fill={trim} />
          <circle cx={0} cy={CY} r={26} fill={shade(trim, 0.2)} />
          <circle cx={0} cy={CY} r={10} fill={trim} />
        </g>
      </g>
    </g>
  );
}
