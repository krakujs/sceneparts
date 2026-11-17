import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sundae: tall stemmed sundae glass with three scoops, a chocolate sauce drip, whipped cream, a cherry and a long spoon.
// Origin = resting point (bottom centre); faces the viewer, honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);
const GLASS = "#DDEFF8", GLASS_DK = "#B9DCEE";
const DRIPS: [number, number, number][] = [[-86, 46, 16], [-44, 22, 14], [-2, 74, 18], [40, 32, 15], [84, 58, 16]];

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const sauce = p.sauce && p.sauce !== "none" ? p.sauce : "#5B3420";
  const cherry = p.cherry ?? true;
  const spoon = p.spoon ?? true;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={120} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* foot, stem and tulip bowl */}
        <ellipse cx={0} cy={-14} rx={112} ry={18} fill={GLASS_DK} />
        <rect x={-9} y={-120} width={18} height={108} rx={6} fill={GLASS_DK} />
        <path d="M -125 -300 C -120 -220 -70 -140 -18 -116 L 18 -116 C 70 -140 120 -220 125 -300 Z" fill={GLASS} opacity={0.92} />
        <ellipse cx={0} cy={-300} rx={125} ry={20} fill={GLASS_DK} />
        <path d="M -100 -262 C -95 -230 -82 -186 -58 -150" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
        {/* long spoon standing in the glass */}
        {spoon && (
          <g>
            <path d="M -12 -214 L 205 -470" stroke="#C3CBD8" strokeWidth={12} strokeLinecap="round" />
            <path d="M -12 -214 L 205 -470" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.6} transform="translate(-3 -3)" />
            <ellipse cx={-14} cy={-222} rx={19} ry={26} fill="#DDE2EA" transform="rotate(-38 -14 -222)" />
          </g>
        )}
        {/* three scoops: vanilla, strawberry, chocolate */}
        <circle cx={-50} cy={-352} r={56} fill="#FFF1C9" />
        <circle cx={54} cy={-354} r={56} fill="#F7A8C8" />
        <circle cx={0} cy={-418} r={60} fill="#B98355" />
        <circle cx={-70} cy={-372} r={10} fill="#FFFFFF" opacity={0.5} />
        <circle cx={34} cy={-374} r={10} fill="#FFFFFF" opacity={0.5} />
        <circle cx={-22} cy={-440} r={11} fill="#FFFFFF" opacity={0.25} />
        {/* chocolate sauce band with drips running down the scoops and glass */}
        <rect x={-112} y={-384} width={224} height={30} rx={12} fill={sauce} />
        {DRIPS.map(([dx, len, w], i) => (
          <rect key={i} x={dx - w / 2} y={-372} width={w} height={len} rx={w / 2} fill={sauce} />
        ))}
        <rect x={-100} y={-388} width={200} height={8} rx={4} fill={shade(sauce, 0.25)} opacity={0.6} />
        {/* whipped cream */}
        {[[-26, -482, 18], [0, -492, 20], [26, -480, 18], [-10, -468, 16], [14, -466, 16]].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFFFF" />
        ))}
        {/* cherry */}
        {cherry && (
          <g>
            <path d="M 0 -512 Q 6 -536 22 -540" fill="none" stroke={C.green} strokeWidth={4} strokeLinecap="round" />
            <circle cx={0} cy={-520} r={17} fill={C.red} />
            <circle cx={-6} cy={-526} r={5} fill="#FFFFFF" opacity={0.6} />
          </g>
        )}
      </g>
    </g>
  );
}
