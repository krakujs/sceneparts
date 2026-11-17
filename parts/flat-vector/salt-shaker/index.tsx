import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Salt shaker (standalone): glass body full of white salt, silver dome cap with holes. Origin = base centre.
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
/** Same motion as the dish generator. */
const motion = (anim: string, f: number, w: number) =>
  anim === "bob" ? `translate(0 ${(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * w * 0.012).toFixed(1)})`
    : anim === "pop" ? `scale(${easeOutBack(clamp01(f / 20)).toFixed(1)})` : "";

const HOLES: [number, number][] = [[-100, -495], [-50, -495], [0, -495], [50, -495], [100, -495], [-60, -525], [-20, -525], [20, -525], [60, -525], [-22, -552], [22, -552]];
const GRAINS = Array.from({ length: 40 }, (_, i) => [(hash(i) * 2 - 1) * 110, -330 + hash(i + 40) * 280, 3 + hash(i + 80) * 3] as [number, number, number]);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const x = p.x ?? 540, y = p.y ?? 1560, s = p.s ?? 1, f: number = p.f ?? 0;
  const glass: string = p.glassColor ?? "#BFE0F2";
  const cap: string = p.capColor ?? "#C9D1DC";
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={175} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f, 320)}>
        {/* foot */}
        <rect x={-130} y={-22} width={260} height={22} rx={8} fill={shade(glass, 0.25)} />
        {/* glass body */}
        <rect x={-150} y={-440} width={300} height={420} rx={36} fill={glass} />
        <path d="M 100 -440 H 114 A 36 36 0 0 1 150 -404 V -56 A 36 36 0 0 1 114 -20 H 100 Z" fill={shade(glass, 0.14)} />
        {/* salt inside: a white heap with a bumpy top */}
        <rect x={-120} y={-330} width={240} height={296} rx={22} fill="#FFFFFF" />
        <ellipse cx={0} cy={-330} rx={120} ry={18} fill="#FFFFFF" />
        {GRAINS.map(([gx, gy, r], i) => <circle key={i} cx={gx} cy={gy} r={r} fill="#DDE7F0" />)}
        {/* glass sheen */}
        <rect x={-118} y={-420} width={16} height={370} rx={8} fill="#FFFFFF" opacity={0.55} />
        {/* cap: band and silver dome */}
        <rect x={-160} y={-472} width={320} height={36} rx={12} fill={cap} />
        <path d="M -158 -472 C -158 -546 -90 -576 0 -576 C 90 -576 158 -546 158 -472 Z" fill={cap} />
        <path d="M 40 -472 C 40 -520 22 -570 0 -576 C 90 -576 158 -546 158 -472 Z" fill={shade(cap, 0.2)} />
        {HOLES.map(([hx, hy], i) => <ellipse key={i} cx={hx} cy={hy} rx={7} ry={5} fill="#5D6578" />)}
        <path d="M -120 -500 C -110 -530 -80 -552 -50 -560" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.6} />
      </g>
    </g>
  );
}
