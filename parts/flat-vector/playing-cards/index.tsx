import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A hand of five cards fanned from a common pivot at the bottom centre. Faces are plain white with generic
// suit symbols (diamond, heart, spade, club) and a rank number; no real deck designs.
// Origin = bottom centre. About 600 px wide, 300 px tall at s = 1. anim "deal": cards fan out in turn.
const f1 = (v: number) => v.toFixed(1);
const CW = 190, CH = 280;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

// Suit symbols drawn centred on 0,0 in a box of about 40 units. kind: 0 diamond, 1 heart, 2 spade, 3 club.
const SUIT_PATH = [
  "M 0 -20 L 14 0 L 0 20 L -14 0 Z",
  "M 0 16 C -22 0 -16 -18 -6 -14 C -2 -12 0 -9 0 -6 C 0 -9 2 -12 6 -14 C 16 -18 22 0 0 16 Z",
  "M 0 -18 C -20 -4 -18 8 -6 8 C -3 8 -2 6 -2 6 L -6 16 L 6 16 L 2 6 C 2 6 3 8 6 8 C 18 8 20 -4 0 -18 Z",
  "M 0 -4 C -6 -18 -20 -10 -14 0 C -18 0 -20 8 -12 8 C -8 8 -4 6 -4 6 L -6 16 L 6 16 L 4 6 C 4 6 8 8 12 8 C 20 8 18 0 14 0 C 20 -10 6 -18 0 -4 Z",
];

function Card({ back, backColour, red, suit, rank }: { back: boolean; backColour: string; red: string; suit: number; rank: number }) {
  // Card drawn upright with its bottom centre at (0, 0) so it can be rotated about the pivot.
  if (back) {
    return (
      <g>
        <rect x={-CW / 2} y={-CH} width={CW} height={CH} rx={18} fill={C.white} />
        <rect x={-CW / 2 + 14} y={-CH + 14} width={CW - 28} height={CH - 28} rx={12} fill={backColour} />
        <rect x={-CW / 2 + 30} y={-CH + 30} width={CW - 60} height={CH - 60} rx={8} fill={shade(backColour, 0.2)} />
      </g>
    );
  }
  const ink = suit <= 1 ? red : C.ink;
  return (
    <g>
      <rect x={-CW / 2} y={-CH} width={CW} height={CH} rx={18} fill={C.white} />
      <rect x={-CW / 2} y={-22} width={CW} height={22} rx={10} fill={C.greyLight} />
      <text x={-CW / 2 + 22} y={-CH + 50} fontFamily="Poppins, Arial, sans-serif" fontWeight={800} fontSize={40} fill={ink}>{rank}</text>
      <g transform={`translate(${-CW / 2 + 40} ${-CH + 92}) scale(0.6)`}><path d={SUIT_PATH[suit]} fill={ink} /></g>
      <g transform={`translate(0 ${-CH / 2 - 10}) scale(3.2)`}><path d={SUIT_PATH[suit]} fill={ink} /></g>
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const backC = p.color && p.color !== "none" ? p.color : C.blue;
  const red = p.accent && p.accent !== "none" ? p.accent : C.red;
  const anim: string = p.anim ?? "none";
  // Left to right, back to front: the rightmost card sits on top.
  const cards = [
    { angle: -28, suit: 2, rank: 9 },
    { angle: -14, suit: 1, rank: 10 },
    { angle: 0, suit: 0, rank: 12 },
    { angle: 14, suit: 3, rank: 8 },
    { angle: 28, suit: 1, rank: 11 },
  ];
  const bobY = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const popS = anim === "pop" ? (() => { const tt = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (tt - 1) ** 3 + c1 * (tt - 1) ** 2; })() : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bobY)}) scale(${f1(popS)})`}>
        {cards.map((c, i) => {
          // Deal: each card starts flat on the pivot and fans out, 6 frames apart.
          const k = anim === "deal" ? easeOut(Math.min(1, Math.max(0, (f - i * 6) / 24))) : 1;
          // Back faces show for the two outer cards while dealing, then all turn face up.
          const faceDown = anim === "deal" && f < i * 6 + 12;
          return (
            <g key={i} transform={`rotate(${f1(c.angle * k)} 0 0)`}>
              <Card back={faceDown} backColour={backC} red={red} suit={c.suit} rank={c.rank} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
