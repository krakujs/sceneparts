import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Printer: ink-smudged, in a folded newspaper hat and leather apron, holding two leather ink balls
// (one in each hand) for a letterpress. Preset of storybook/townsfolk.
const INK = C.ink;
const LEATHER = "#5C3A26";
const SMUDGE = "#1B1712";

const InkBall: React.FC = () => (
  <g>
    <rect x={-8} y={-8} width={16} height={100} rx={6} fill="#8A6A45" stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-58} r={46} fill={LEATHER} stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-58} r={30} fill="none" stroke="#D9C49C" strokeWidth={3} strokeDasharray="4 6" opacity={0.6} />
    <ellipse cx={-12} cy={-70} rx={10} ry={7} fill={SMUDGE} opacity={0.6} />
    <path d="M -24 -40 Q -18 -26 -6 -22" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.3} strokeLinecap="round" />
  </g>
);

const PaperHat: React.FC = () => (
  <g>
    <path d="M -68 -556 L -68 -604 L -30 -628 L 4 -600 L 38 -628 L 68 -604 L 68 -556 Z" fill={C.cream} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -68 -604 L 4 -576 L 68 -604" fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -54 -586 L 54 -586 M -54 -572 L 54 -572" stroke="#9AA4AE" strokeWidth={3} opacity={0.8} />
    <ellipse cx={-30} cy={-622} rx={10} ry={5} fill={SMUDGE} opacity={0.5} />
  </g>
);

const Smudges: React.FC = () => (
  <g>
    <ellipse cx={24} cy={-500} rx={10} ry={6} fill={SMUDGE} opacity={0.55} />
    <ellipse cx={14} cy={-470} rx={6} ry={4} fill={SMUDGE} opacity={0.45} />
    <ellipse cx={-6} cy={-392} rx={16} ry={8} fill={SMUDGE} opacity={0.4} transform="rotate(-18 -6 -392)" />
    <ellipse cx={-30} cy={-340} rx={12} ry={6} fill={SMUDGE} opacity={0.35} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="none" front={<><PaperHat /><Smudges /></>} hair="short" hairColour={p.hairColour} beard="none"
      top="shirt" shirt={C.cream} lower="trousers" legs="#3D3A44" boots="#2B2420"
      apron apronColour={p.apron ?? "#6B4B2E"} skin={p.skin}
      pose="carry" backPose="up" action={p.inking === false ? "idle" : "work"}
      held={() => <InkBall />}
      backHeld={() => <InkBall />}
    />
  );
}
