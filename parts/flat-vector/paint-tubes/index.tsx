import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Three artist's paint tubes lying on a table: each is a silver metal tube with a crimped, ridged end,
// a coloured label band, a shoulder, a threaded neck and a ribbed cap. The front one is squeezed
// (dented body, cap off) with a blob of paint coming out of its nozzle.
// Origin = bottom centre (the tubes rest on y). About 640 px wide and 300 px tall at s = 1.
// anim "squeeze" = the paint blob swells and settles; "bob" = gentle hover.
const f1 = (v: number) => v.toFixed(1);

const metal = "#E3E7EE", metalDk = "#B9C0CD";

// One tube in local coordinates: crimped end at x = 0, nozzle pointing to +x, centre line on y = 0.
const Tube: React.FC<{ len: number; col: string; squeezed?: boolean; cap?: string }> = ({ len, col, squeezed, cap }) => {
  const h = 46; // half height of the body
  const sh = len - 70; // shoulder x
  const top = squeezed
    ? `M 34 ${-h + 8} Q 80 ${-h - 4} 120 ${-h + 14} Q 160 ${-h + 30} 200 ${-h + 10} Q 250 ${-h - 6} ${sh} ${-h}`
    : `M 34 ${-h + 8} L ${sh} ${-h}`;
  const bot = squeezed
    ? `L ${sh} ${h} Q 250 ${h + 4} 210 ${h - 12} Q 160 ${h - 28} 120 ${h - 10} Q 80 ${h + 2} 34 ${h - 8} Z`
    : `L ${sh} ${h} L 34 ${h - 8} Z`;
  const body = `${top} Q ${sh + 34} ${-h} ${sh + 40} -16 L ${sh + 40} 16 Q ${sh + 34} ${h} ${sh} ${h} ${bot}`;
  return (
    <g>
      {/* crimped end with ridges */}
      <rect x={0} y={-h + 2} width={38} height={2 * h - 4} rx={4} fill={metalDk} />
      {[8, 18, 28].map((rx) => <rect key={rx} x={rx} y={-h + 4} width={4} height={2 * h - 8} fill={shade(metalDk, 0.15)} />)}
      {/* body */}
      <path d={body} fill={metal} />
      <path d={`M 34 ${h - 8} L ${sh} ${h} Q ${sh + 34} ${h} ${sh + 40} 16 L ${sh + 40} 24 Q ${sh + 20} ${h - 18} ${sh} ${h - 18} L 34 ${h - 22} Z`} fill={metalDk} opacity={0.7} />
      {/* coloured label band with a paint swatch */}
      <path d={squeezed
        ? `M ${len * 0.3} ${-h + 18} Q ${len * 0.42} ${-h + 30} ${len * 0.62} ${-h + 4} L ${len * 0.62} ${h - 4} Q ${len * 0.42} ${h - 28} ${len * 0.3} ${h - 14} Z`
        : `M ${len * 0.3} ${-h + 5} L ${len * 0.62} ${-h + 2} L ${len * 0.62} ${h - 2} L ${len * 0.3} ${h - 5} Z`} fill={col} />
      <rect x={len * 0.36} y={-12} width={len * 0.18} height={10} rx={5} fill={C.white} opacity={0.75} />
      <rect x={len * 0.36} y={6} width={len * 0.11} height={8} rx={4} fill={C.white} opacity={0.5} />
      {/* shine */}
      <path d={`M 50 ${-h + 16} L ${sh - 10} ${-h + 10}`} stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
      {/* threaded neck */}
      <rect x={sh + 38} y={-14} width={24} height={28} rx={3} fill={metalDk} />
      {/* ribbed cap (or open nozzle) */}
      {cap ? (
        <g>
          <rect x={sh + 56} y={-26} width={52} height={52} rx={8} fill={cap} />
          {[66, 78, 90].map((cx) => <rect key={cx} x={sh + cx} y={-24} width={5} height={48} fill={shade(cap, 0.25)} />)}
        </g>
      ) : (
        <rect x={sh + 58} y={-9} width={12} height={18} rx={3} fill={shade(metalDk, 0.1)} />
      )}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.blue;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const c3 = p.color3 && p.color3 !== "none" ? p.color3 : C.yellow;
  const anim: string = p.anim ?? "none";
  const blob = anim === "squeeze" ? 0.75 + 0.25 * Math.sin((f * 2 * Math.PI) / 60) : 1;
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* back tube, lying flat */}
        <g transform="translate(-320 -150) rotate(-4)"><Tube len={420} col={c1} cap={C.ink} /></g>
        {/* middle tube, angled, resting across */}
        <g transform="translate(-200 -62) rotate(-14)"><Tube len={380} col={c2} cap={shade(c2, 0.3)} /></g>
        {/* front tube, squeezed, cap off, paint blob at the nozzle */}
        <g transform="translate(-260 -50) rotate(3)">
          <Tube len={470} col={c3} squeezed />
          <g transform={`translate(${470 - 70 + 76} 0) scale(${f1(blob)})`}>
            <path d="M -8 -10 C 30 -40 90 -30 96 4 C 100 34 60 44 30 40 C 0 36 -12 20 -8 -10 Z" fill={c3} />
            <path d="M 50 -20 C 70 -22 84 -12 86 0" stroke={C.white} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.6} />
            <path d="M 20 30 C 40 36 60 36 80 26" stroke={shade(c3, 0.2)} strokeWidth={7} fill="none" strokeLinecap="round" />
          </g>
        </g>
        {/* loose cap of the front tube lying to the left */}
        <g transform="translate(-350 -26) rotate(80)">
          <rect x={-26} y={-26} width={52} height={52} rx={8} fill={shade(c3, 0.35)} />
          {[-16, -4, 8].map((cx) => <rect key={cx} x={cx} y={-24} width={5} height={48} fill={shade(c3, 0.5)} />)}
        </g>
      </g>
    </g>
  );
}
