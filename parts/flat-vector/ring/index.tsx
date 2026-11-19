import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Gold ring standing upright, its band a circle with the gem on top. The gem is faceted in three tones with a table
// and girdle. Origin = bottom centre (the band rests on y). About 360 px wide and 490 px tall at s = 1 (hero size).
// anim "sparkle": four star glints twinkle around the gem.
const f1 = (v: number) => v.toFixed(1);

const Star = ({ x, y, k }: { x: number; y: number; k: number }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(k)})`} opacity={f1(Math.min(1, k))}>
    <path d="M 0 -26 L 6 -6 L 26 0 L 6 6 L 0 26 L -6 6 L -26 0 L -6 -6 Z" fill="#FFFFFF" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const gold = p.color && p.color !== "none" ? p.color : C.yellow;
  const gem = p.color2 && p.color2 !== "none" ? p.color2 : C.blue;
  const anim: string = p.anim ?? "none";
  const tw = (phase: number) => (anim === "sparkle" ? 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 45 + phase)) : 0);
  // the gem: table on top, girdle at y -436, pavilion point at y -352
  const girdleY = -436;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={12} fill={C.shadow} />
      {/* band: a circle standing upright, lit on top, shaded along the bottom */}
      <circle cx={0} cy={-175} r={150} fill="none" stroke={gold} strokeWidth={50} />
      <path d="M 141 -124 A 150 150 0 0 1 -141 -124" fill="none" stroke={shade(gold, 0.22)} strokeWidth={50} />
      <path d="M -141 -226 A 150 150 0 0 1 -51 -316" fill="none" stroke="#FFF3B0" strokeWidth={12} strokeLinecap="round" opacity={0.85} />
      {/* setting: a gold cradle that holds the gem */}
      <rect x={-72} y={-374} width={144} height={42} rx={14} fill={gold} />
      <rect x={-72} y={-374} width={144} height={12} rx={6} fill={shade(gold, 0.15)} />
      {/* faceted gem */}
      <polygon points="-58,-486 58,-486 96,-436 -96,-436" fill={shade(gem, -0.12)} />
      <polygon points="-96,-436 -30,-436 0,-352" fill={shade(gem, 0.1)} />
      <polygon points="30,-436 96,-436 0,-352" fill={shade(gem, 0.3)} />
      <polygon points="-30,-436 30,-436 0,-352" fill={gem} />
      <polygon points="-58,-486 -30,-436 -96,-436" fill={shade(gem, -0.3)} opacity={0.85} />
      <polygon points="58,-486 30,-436 96,-436" fill={shade(gem, 0.05)} />
      <polygon points="-58,-486 58,-486 30,-436 -30,-436" fill={C.white} opacity={0.4} />
      <line x1={-96} y1={-436} x2={96} y2={-436} stroke={shade(gem, 0.35)} strokeWidth={3} />
      {/* glints */}
      {anim === "sparkle" && (
        <g>
          <Star x={-150} y={-470} k={tw(0)} />
          <Star x={150} y={-430} k={tw(1.6)} />
          <Star x={-120} y={-320} k={tw(3.2)} />
          <Star x={125} y={-500} k={tw(4.8)} />
        </g>
      )}
    </g>
  );
}
