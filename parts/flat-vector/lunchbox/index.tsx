import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lunchbox (standalone). variant "box": plastic lunchbox with a clip lid flipped up behind it, open to show a sandwich,
// an apple and carrot sticks in three compartments. variant "tiffin": stacked 3-tier steel tiffin carrier with a handle.
// Origin = base centre.
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
/** Same motion as the dish generator. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const STEEL = "#C9D1DC";
const TIER_R = 180, TIER_H = 124, TIER_RY = 36;

/** One steel tier: body from y0 (bottom) to y1 (top), with a lighter top ellipse and a shaded right side. */
const tier = (y0: number, y1: number, key: string) => {
  const sx = 60, yb = y0 + TIER_RY * Math.sqrt(1 - (sx / TIER_R) ** 2);
  return (
    <g key={key}>
      <path d={`M ${-TIER_R} ${y1} L ${-TIER_R} ${y0} A ${TIER_R} ${TIER_RY} 0 0 0 ${TIER_R} ${y0} L ${TIER_R} ${y1} Z`} fill={STEEL} />
      <path d={`M ${sx} ${y1} L ${TIER_R} ${y1} L ${TIER_R} ${y0} A ${TIER_R} ${TIER_RY} 0 0 1 ${sx} ${yb} Z`} fill={shade(STEEL, 0.2)} />
      <ellipse cx={0} cy={y1} rx={TIER_R} ry={TIER_RY} fill="#E9EEF3" />
      <ellipse cx={0} cy={y1} rx={TIER_R - 12} ry={TIER_RY - 8} fill={shade(STEEL, 0.1)} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1560, s = p.s ?? 1, f: number = p.f ?? 0;
  const tiffin = p.variant === "tiffin";
  const body: string = p.bodyColor ?? "#1FA39A";

  let art: React.ReactNode;
  if (tiffin) {
    const H = TIER_H;
    art = (
      <g>
        {/* handle over the lid */}
        <path d="M -62 -372 C -62 -486 62 -486 62 -372" stroke="#9AA3B5" strokeWidth={22} strokeLinecap="round" fill="none" />
        {tier(0, -H, "t0")}
        {tier(-H, -2 * H, "t1")}
        {tier(-2 * H, -3 * H, "t2")}
        {/* lid knob */}
        <rect x={-44} y={-3 * H - 18} width={88} height={22} rx={10} fill="#9AA3B5" />
        {/* side clasps */}
        <rect x={-TIER_R - 12} y={-2 * H - 40} width={18} height={30} rx={5} fill="#5D6578" />
        <rect x={TIER_R - 6} y={-2 * H - 40} width={18} height={30} rx={5} fill="#5D6578" />
      </g>
    );
  } else {
    const lid = shade(body, -0.2), inner = "#F4F1EA";
    art = (
      <g>
        {/* clip lid, flipped up and back */}
        <g transform="translate(0 -300) rotate(-4)">
          <rect x={-226} y={-36} width={452} height={72} rx={22} fill={lid} />
          <rect x={160} y={-20} width={40} height={20} rx={6} fill="#253058" />
        </g>
        {/* box walls */}
        <rect x={-220} y={-210} width={440} height={210} rx={18} fill={body} />
        <path d="M 160 -210 H 202 A 18 18 0 0 1 220 -192 V -18 A 18 18 0 0 1 202 0 H 160 Z" fill={shade(body, 0.18)} />
        {/* top rim and open interior */}
        <polygon points="-220,-210 220,-210 204,-262 -204,-262" fill={lid} />
        <polygon points="-200,-214 200,-214 186,-252 -186,-252" fill={inner} />
        {/* compartments */}
        <polygon points="-64,-252 -58,-252 -58,-214 -64,-214" fill={shade(body, 0.2)} />
        <polygon points="58,-252 64,-252 64,-214 58,-214" fill={shade(body, 0.2)} />
        {/* sandwich: bread triangle with a green filling */}
        <polygon points="-180,-216 -100,-216 -140,-258" fill="#F2C47A" />
        <polygon points="-168,-221 -112,-221 -140,-248" fill="#4BB46A" />
        {/* apple */}
        <circle cx={0} cy={-236} r={26} fill="#E8503F" />
        <circle cx={-8} cy={-244} r={6} fill="#FFFFFF" opacity={0.5} />
        <ellipse cx={8} cy={-262} rx={10} ry={5} fill="#4BB46A" transform="rotate(-25 8 -262)" />
        {/* carrot sticks */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={92 + i * 20} y={-256 - (i % 2) * 6} width={14} height={44} rx={7} fill="#FF8A3D" />
        ))}
        {/* clip on the front */}
        <rect x={170} y={-150} width={36} height={24} rx={6} fill="#253058" />
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={tiffin ? 200 : 240} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f, 400)}>{art}</g>
    </g>
  );
}
