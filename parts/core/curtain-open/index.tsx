import React from "react";
import { clamp, ease, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Curtain open: red velvet theatre curtains with a gold tie and trim, and a scalloped top valance.
// mode "out": the curtains part to the sides and the valance lifts away (reveals the scene).
// mode "in": the curtains close across the frame. Folds are a horizontal gradient of stripes.

const VELVET_DARK = "#6e0d18";
const VELVET_LIGHT = "#a3182a";
const GOLD = "#d4a437";

// Gradient of fold stripes across a panel: dark-light-dark repeated 12 times.
function Folds({ id }: { id: string }) {
  const stops: React.ReactElement[] = [];
  const F = 12;
  for (let i = 0; i < F; i++) {
    stops.push(<stop key={`a${i}`} offset={i / F} stopColor={VELVET_DARK} />);
    stops.push(<stop key={`b${i}`} offset={(i + 0.5) / F} stopColor={VELVET_LIGHT} />);
  }
  stops.push(<stop key="end" offset={1} stopColor={VELVET_DARK} />);
  return <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">{stops}</linearGradient>;
}

// One panel in local coordinates: spans x -40..560 at the left edge. The right panel is this one mirrored.
function Panel({ id }: { id: string }) {
  return (
    <g>
      <Folds id={id} />
      <rect x={-40} y={-40} width={600} height={2000} fill={`url(#${id})`} />
      <rect x={528} y={-40} width={12} height={2000} fill={GOLD} opacity={0.9} />
      <path d="M-40 1000 Q200 1070 470 1000" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
      <circle cx={470} cy={1000} r={22} fill={GOLD} />
      <rect x={458} y={1018} width={24} height={110} rx={8} fill={GOLD} />
    </g>
  );
}

// Scalloped valance across the top, with a gold-trimmed scalloped lower edge.
function Valance() {
  let fill = "M-60 -40 H1140 V190";
  let trim = "M-60 190";
  for (let x = 1140; x > -60; x -= 120) fill += ` A60 60 0 0 0 ${x - 120} 190`;
  for (let x = -60; x < 1140; x += 120) trim += ` A60 60 0 0 0 ${x + 120} 190`;
  return (
    <g>
      <path d={fill + " Z"} fill={VELVET_DARK} />
      <path d={trim} fill="none" stroke={GOLD} strokeWidth={8} />
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  const out = p.mode === "out";
  const len = Math.max(8, Number(p.len ?? 40));
  const prog = ease(clamp(lf / len));
  const cover = out ? 1 - prog : prog;
  const open = 1 - cover;
  if (open >= 0.999) return null;
  const seg = 560 * open;
  return (
    <g>
      <g transform={`translate(${-seg} 0)`}>
        <Panel id="curtain-fold-l" />
      </g>
      <g transform={`translate(${seg} 0) translate(1080 0) scale(-1 1)`}>
        <Panel id="curtain-fold-r" />
      </g>
      <g transform={`translate(0 ${-420 * open})`}>
        <Valance />
      </g>
    </g>
  );
}
