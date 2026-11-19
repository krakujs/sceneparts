import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Swimming pool, low 3/4 view: a rectangular blue pool sunk into a tiled deck, with lane ropes, a ladder whose rails
// go into the water, a diving board on a grounded stand at the far end and a lifeguard chair. Origin = centre of the front edge.
// About 1000 px wide and 400 px tall at s = 1. anim lights shimmers the water.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const TILE = "#F7F3EC", WATER = "#4FB3E8", DECK_TOP = -220, POOL_BACK = -150, POOL_FRONT = -30;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const tile = p.color && p.color !== "none" ? p.color : TILE;
  const water = p.color2 && p.color2 !== "none" ? p.color2 : WATER;
  const anim: string = p.anim ?? "none";
  const shimmer = anim === "lights" ? 0.12 + 0.12 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const ropes = [-112, -84];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={500} ry={18} fill={C.shadow} />
        {/* tiled deck, the front strip and the back strip */}
        <rect x={-500} y={DECK_TOP} width={1000} height={-DECK_TOP} rx={6} fill={tile} />
        <rect x={-500} y={-22} width={1000} height={22} rx={4} fill={shade(tile, 0.15)} />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-500 + i * 125} y1={DECK_TOP} x2={-500 + i * 125} y2={0} stroke={shade(tile, 0.12)} strokeWidth={3} />
        ))}
        {/* sunken pool: rim, then water */}
        <rect x={-424} y={POOL_BACK - 10} width={848} height={POOL_FRONT - POOL_BACK + 20} rx={8} fill={C.white} />
        <rect x={-404} y={POOL_BACK} width={808} height={POOL_FRONT - POOL_BACK} rx={6} fill={water} />
        <rect x={-404} y={POOL_BACK} width={808} height={16} fill={shade(water, 0.2)} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-380 + i * 260} y={-132 + i * 18} width={150} height={8} rx={4} fill={C.white} opacity={0.25 + shimmer} />
        ))}
        {/* lane ropes with buoys */}
        {ropes.map((ry, ri) => (
          <g key={ri}>
            <line x1={-404} y1={ry} x2={404} y2={ry} stroke={C.white} strokeWidth={5} />
            {Array.from({ length: 11 }, (_, i) => (
              <circle key={i} cx={-400 + i * 80} cy={ry} r={8} fill={i % 2 ? C.white : C.red} />
            ))}
          </g>
        ))}
        {/* ladder at the back-left edge: rails run from the deck into the water */}
        <rect x={-345} y={DECK_TOP + 8} width={6} height={150} fill={C.greyLight} />
        <rect x={-300} y={DECK_TOP + 8} width={6} height={150} fill={C.greyLight} />
        {[-190, -160, -130, -100, -70].map((ry, i) => (
          <rect key={i} x={-345} y={ry} width={61} height={6} rx={3} fill={C.greyLight} />
        ))}
        {/* diving board on a grounded stand at the far right */}
        <rect x={394} y={DECK_TOP - 172} width={12} height={172} fill={C.greyDark} />
        <rect x={380} y={DECK_TOP - 6} width={40} height={14} rx={4} fill={C.greyDark} />
        <rect x={250} y={DECK_TOP - 170} width={160} height={16} rx={5} fill={C.white} />
        <rect x={250} y={DECK_TOP - 160} width={160} height={6} fill={shade(C.white, 0.15)} />
        <rect x={386} y={DECK_TOP - 170} width={28} height={16} rx={4} fill={C.greyDark} />
        {/* lifeguard chair on the left deck */}
        <rect x={-470} y={DECK_TOP - 172} width={8} height={172} fill={C.greyDark} />
        <rect x={-424} y={DECK_TOP - 172} width={8} height={172} fill={C.greyDark} />
        <rect x={-500} y={DECK_TOP - 172} width={110} height={16} rx={5} fill={C.yellow} />
        <rect x={-500} y={DECK_TOP - 262} width={16} height={92} rx={5} fill={C.yellow} />
        <rect x={-478} y={DECK_TOP - 200} width={60} height={12} fill={C.yellow} />
      </g>
    </g>
  );
}
