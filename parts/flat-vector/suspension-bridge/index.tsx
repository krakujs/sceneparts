import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Suspension bridge over water: two tall towers, a sagging main cable and vertical hanger cables down to the deck.
// Origin = centre on the water line. About 1040 px wide and 1100 px tall at s = 1. The deck sits at y = -220.
// anim "lights": the tower warning lamps blink in turn.
const f1 = (v: number) => v.toFixed(1);
const DECK_Y = -220;
const TOWER_XS = [-300, 300];
const TOP_Y = -1000;
// Main cable: sags between the tower tops, a parabola with its lowest point at x = 0.
const cableY = (x: number) => TOP_Y + 150 * (1 - (x / 300) * (x / 300));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const tower = p.color && p.color !== "none" ? p.color : C.red;
  const cable = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const hangers: number[] = [];
  for (let hx = -260; hx <= 260; hx += 40) hangers.push(hx);
  const lampOn = (i: number) => (anim === "lights" ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((f - i * 15) / 6)) : 0.9);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* water */}
      <rect x={-520} y={-40} width={1040} height={40} rx={6} fill={C.skyDeep} />
      <path d="M -480 -22 Q -440 -34 -400 -22 T -320 -22" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      <path d="M 320 -18 Q 360 -30 400 -18 T 480 -18" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      {/* piers in the water under the towers and the deck */}
      {TOWER_XS.map((tx) => (
        <rect key={tx} x={tx - 40} y={-40} width={80} height={-DECK_Y - 40} fill={C.grey} />
      ))}
      {/* deck */}
      <rect x={-500} y={DECK_Y} width={1000} height={28} rx={6} fill={C.greyLight} />
      <rect x={-500} y={DECK_Y + 28} width={1000} height={12} rx={4} fill={shade(C.greyLight, 0.2)} />
      {/* side anchor blocks */}
      <rect x={-520} y={DECK_Y - 60} width={40} height={60} rx={6} fill={C.greyDark} />
      <rect x={480} y={DECK_Y - 60} width={40} height={60} rx={6} fill={C.greyDark} />
      {/* towers */}
      {TOWER_XS.map((tx, i) => (
        <g key={tx}>
          <rect x={tx - 24} y={TOP_Y - 20} width={48} height={TOP_Y * -1 + 20 + DECK_Y * -1 * 0 + 0} fill={tower} />
          <rect x={tx - 30} y={TOP_Y - 20} width={60} height={14} rx={5} fill={shade(tower, 0.2)} />
          <rect x={tx - 40} y={-640} width={80} height={16} rx={6} fill={shade(tower, 0.2)} />
          <rect x={tx - 40} y={-420} width={80} height={16} rx={6} fill={shade(tower, 0.2)} />
          <rect x={tx - 6} y={TOP_Y - 60} width={12} height={44} fill={C.greyDark} />
          <circle cx={tx} cy={TOP_Y - 68} r={10} fill={C.red} opacity={lampOn(i)} />
        </g>
      ))}
      {/* main cable with its anchors at the deck ends */}
      <path d={`M -500 ${DECK_Y - 40} Q -300 ${f1(TOP_Y + 40)} -300 ${TOP_Y} Q 0 ${f1(TOP_Y + 300)} 300 ${TOP_Y} Q 300 ${f1(TOP_Y + 40)} 500 ${DECK_Y - 40}`} fill="none" stroke={cable} strokeWidth={12} strokeLinecap="round" />
      {/* hanger cables from the main cable down to the deck */}
      {hangers.map((hx) => (
        <line key={hx} x1={hx} y1={f1(cableY(hx))} x2={hx} y2={DECK_Y} stroke={cable} strokeWidth={3} />
      ))}
      {/* deck lamps */}
      {[-420, -140, 140, 420].map((lx) => (
        <circle key={lx} cx={lx} cy={DECK_Y - 6} r={6} fill={C.yellow} opacity={0.9} />
      ))}
    </g>
  );
}
