import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Bootlegger: 1920s man in pinstripe suit and fedora carrying a wooden crate of unlabelled bottles.
const Crate: React.FC = () => (
  <g transform="translate(0 -40)">
    <rect x={-80} y={-50} width={160} height={100} fill="#A87A4A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <line x1={-80} y1={-10} x2={80} y2={-10} stroke={C.ink} strokeWidth={4} />
    {[-48, 0, 48].map((x) => (
      <g key={x}>
        <rect x={x - 14} y={-100} width={28} height={50} rx={6} fill={C.teal} stroke={C.ink} strokeWidth={4} />
        <rect x={x - 6} y={-112} width={12} height={14} fill={C.brickDark} stroke={C.ink} strokeWidth={3} />
      </g>
    ))}
  </g>
);

const Fedora: React.FC = () => (
  <g>
    <path d="M -46 -572 Q -46 -640 4 -642 Q 54 -640 54 -572 Z" fill={C.sepia} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-46} y={-586} width={100} height={14} fill={C.brickDark} stroke={C.ink} strokeWidth={3} />
    <ellipse cx={4} cy={-568} rx={84} ry={18} fill={C.sepia} stroke={C.ink} strokeWidth={6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="short" hairColour={p.hairColour} beard="moustache" skin={p.skin}
      top="jacket" coat={p.coat ?? "#3B3F4E"} shirt={C.cream} lower="trousers" legs="#3B3F4E" boots="#1B1712"
      pose="carry" action={p.walk ? "walk" : "idle"}
      body={<path d="M -40 -420 L -40 -240 M -10 -420 L -10 -240 M 20 -420 L 20 -240 M 50 -420 L 50 -240" stroke="#FFFFFF" strokeOpacity={0.14} strokeWidth={5} />}
      held={() => <Crate />}
      front={<Fedora />}
    />
  );
}
