import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Generic WW1 infantryman: khaki greatcoat, round steel helmet, puttees, rifle slung on the shoulder.
// No flags, badges or insignia. Preset of storybook/townsfolk.
const INK = C.ink;
const PUTTEE = "#7A7150";
const WOOD = "#6B4B2E";
const STEEL = "#7D8489";

const Rifle: React.FC = () => (
  <g>
    <path d="M -84 -236 Q -62 -360 -52 -446" stroke={C.stone} strokeWidth={6} fill="none" strokeLinecap="round" />
    <g transform="rotate(8 -96 -300)">
      <path d="M -112 -90 L -92 -236 L -76 -236 L -92 -80 Z" fill={WOOD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-102} y={-724} width={10} height={520} rx={3} fill={STEEL} stroke={INK} strokeWidth={4} />
      <rect x={-104} y={-296} width={16} height={34} rx={3} fill={WOOD} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

const Puttees: React.FC = () => (
  <g>
    {[-38, -6].map((x) => (
      <g key={x}>
        <rect x={x} y={-158} width={44} height={122} rx={5} fill={PUTTEE} stroke={INK} strokeWidth={4} />
        {[-146, -124, -102, -80, -58].map((y) => (
          <line key={y} x1={x + 4} y1={y} x2={x + 40} y2={y + 3} stroke={INK} strokeWidth={2} opacity={0.5} />
        ))}
      </g>
    ))}
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="helmet" hatColour={STEEL} hair="short" hairColour={p.hairColour} beard="none"
      top="coat" coat={p.coat ?? "#8A7F5B"} shirt={C.cream} lower="trousers" legs="#5C5444" boots="#2B2420"
      belt skin={p.skin} pose="down" backPose="down" action="idle"
      front={<><Puttees /><Rifle /></>}
    />
  );
}
