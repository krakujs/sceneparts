import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Alchemist: robed scholar in a pointed cap, raising a round glass flask with coloured fumes.
// Preset of storybook/townsfolk. The flask is drawn in the front hand; bubbles and fumes loop with p.f.
const INK = C.ink;
const FUME = ["#8FD3C7", "#F2B544", "#C77DBA", "#F08A24"];

const Flask: React.FC<{ f: number; liquid: string; fumes: boolean }> = ({ f, liquid, fumes }) => (
  <g>
    {fumes
      ? [0, 1, 2, 3].map((k) => {
          const t = (f * 1.1 + k * 25) % 100;
          const x = Math.sin((f + k * 40) / 14) * 16 + (k - 1.5) * 10;
          return <circle key={k} cx={x} cy={-130 - t * 1.5} r={18 + t * 0.2} fill={FUME[k]} opacity={0.9 * (1 - t / 100)} stroke={INK} strokeWidth={3} />;
        })
      : null}
    <rect x={-12} y={-100} width={24} height={44} rx={4} fill="#D7E3E2" stroke={INK} strokeWidth={5} />
    <rect x={-16} y={-114} width={32} height={18} rx={4} fill={C.sepia} stroke={INK} strokeWidth={4} />
    <circle cx={0} cy={-40} r={46} fill="#D7E3E2" stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-30} r={32} fill={liquid} />
    {[0, 1, 2].map((k) => {
      const t = (f + k * 21) % 50;
      return <circle key={k} cx={-14 + k * 14} cy={-6 - t * 0.7} r={4 + (k % 2) * 2} fill="#FFFFFF" opacity={0.85} />;
    })}
    <path d="M -28 -62 Q -30 -48 -22 -40" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);

const Cap: React.FC = () => (
  <g>
    <path d="M -62 -564 Q -70 -640 40 -718 Q 30 -640 68 -564 Z" fill={C.dusk} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-66} y={-582} width={134} height={22} rx={6} fill={C.mustard} stroke={INK} strokeWidth={5} />
    <path d="M -40 -630 Q -10 -600 14 -648" stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="none" front={<Cap />} hair="short" hairColour={p.hairColour ?? "#C9C5BC"} beard="full"
      top="robe" coat={p.robe ?? "#3B3F6E"} belt skin={p.skin} age="old"
      pose="chest" backPose="hip"
      held={() => <Flask f={f} liquid={p.liquid ?? C.teal} fumes={p.fumes !== false} />}
    />
  );
}
