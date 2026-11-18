import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big white molar with two roots and four cusps. Optional cavity spot. Organ-style item, centred on (x, y),
// about 360 px wide and 420 px tall at s = 1. anim "shine": a sparkle twinkles on the enamel.
const f1 = (v: number) => v.toFixed(1);
const CROWN = "M -150 -60 C -165 -150 -100 -185 -55 -160 C -20 -195 30 -195 60 -160 C 105 -185 165 -150 152 -60 C 146 0 128 40 120 70 L 96 170 C 92 200 60 205 52 178 L 36 110 L -36 110 L -52 178 C -60 205 -92 200 -96 170 L -120 70 C -128 40 -156 0 -150 -60 Z";
const STAR = "M 0 -26 Q 4 -4 26 0 Q 4 4 0 26 Q -4 4 -26 0 Q -4 -4 0 -26 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const col = p.color && p.color !== "none" ? p.color : C.white;
  const spark = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const cavity = p.cavity === true || p.cavity === "true";
  const tw = anim === "shine" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50) : 0.6;
  const tw2 = anim === "shine" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50 + 2.2) : 0.4;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s)})`}>
      <ellipse cx={0} cy={215} rx={170} ry={14} fill={C.shadow} />
      <g transform="translate(0 -110)">
        {/* roots, slightly shaded */}
        <path d={CROWN} fill={shade(col, 0.12)} transform="translate(10 6)" />
        <path d={CROWN} fill={col} />
        {/* grooves across the chewing surface */}
        <path d="M -20 -150 Q 0 -120 14 -150" stroke={shade(col, 0.15)} strokeWidth={9} strokeLinecap="round" fill="none" />
        <path d="M -110 -70 Q -60 -90 -10 -60" stroke={shade(col, 0.12)} strokeWidth={8} strokeLinecap="round" fill="none" />
        {/* cavity */}
        {cavity && (
          <g>
            <circle cx={92} cy={-112} r={26} fill="#8A5A3C" />
            <circle cx={92} cy={-112} r={13} fill="#5E3B26" />
          </g>
        )}
        {/* shine on the enamel */}
        <path d="M -105 -110 Q -95 -140 -60 -150" stroke={C.white} strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.7} />
        {/* sparkles */}
        <g transform={`translate(-112 -150) scale(${f1(0.6 + 0.6 * tw)})`} opacity={f1(0.6 + 0.4 * tw)}>
          <path d={STAR} fill={spark} />
        </g>
        <g transform={`translate(128 -190) scale(${f1(0.4 + 0.5 * tw2)})`} opacity={f1(0.5 + 0.5 * tw2)}>
          <path d={STAR} fill={spark} />
        </g>
      </g>
    </g>
  );
}
