import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Coal miner: sooty face, helmet with a small lamp, pick carried on the shoulder, canvas trousers.
const Pick: React.FC = () => (
  <g>
    <rect x={-8} y={-400} width={16} height={440} rx={7} fill="#8A6A45" stroke={C.ink} strokeWidth={5} />
    <path d="M -96 -400 Q -40 -470 0 -412 Q 40 -470 96 -400 L 84 -390 Q 40 -440 6 -404 L -6 -404 Q -40 -440 -84 -390 Z" fill="#7D8590" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

const HelmetLamp: React.FC<{ f: number }> = ({ f }) => {
  const flick = 1 + Math.sin(f / 2.4) * 0.1;
  return (
    <g transform="translate(58 -606)">
      <circle r={30 * flick} fill={C.glow} opacity={0.3} />
      <rect x={-10} y={-10} width={20} height={20} rx={4} fill="#FCEBB6" stroke={C.ink} strokeWidth={4} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="helmet" hatColour={p.hatColour ?? "#3D3A44"} hair="short" hairColour="#1B1712" beard="stubble"
      skin={p.skin ?? "#5A4536"} top="shirt" shirt="#8F8A7A" coat="#8F8A7A" lower="trousers" legs="#B5A27A" boots="#2B2420"
      belt pose="carry" backPose="down" action={p.walk ? "walk" : "work"}
      body={<g><path d="M -60 -420 L 60 -420" stroke={C.ink} strokeOpacity={0.3} strokeWidth={4} /><path d="M -20 -480 Q 0 -470 20 -480" stroke="#1B1712" strokeWidth={6} fill="none" opacity={0.6} /></g>}
      front={<g><HelmetLamp f={p.f} /><ellipse cx={-22} cy={-500} rx={14} ry={8} fill="#1B1712" opacity={0.55} /><ellipse cx={22} cy={-490} rx={10} ry={6} fill="#1B1712" opacity={0.55} /></g>}
      held={() => <g transform="translate(0 -4)"><Pick /></g>}
    />
  );
}
