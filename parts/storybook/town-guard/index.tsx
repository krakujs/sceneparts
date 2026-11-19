import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Town guard: kettle helmet, mail and a coloured tabard, holding a halberd upright in the front hand.
// Preset of storybook/townsfolk. Halberd is drawn in the hand frame (origin = hand, +y down).
const INK = C.ink;
const STEEL = "#C9D3DA";

const Halberd: React.FC = () => (
  <g>
    <rect x={-8} y={-380} width={16} height={540} rx={5} fill="#8A6A45" stroke={INK} strokeWidth={5} />
    <path d="M 0 -446 L -11 -376 L 11 -376 Z" fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 8 -368 Q 84 -368 98 -316 Q 60 -290 8 -300 Z" fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -8 -350 L -44 -330 L -8 -312 Z" fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 14 -352 Q 60 -346 80 -322" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
    <rect x={-12} y={-200} width={24} height={14} rx={4} fill={C.mustard} stroke={INK} strokeWidth={4} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const tabard = p.tabard ?? C.brick;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="helmet" hatColour="#9AA4AE" hair="short" hairColour={p.hairColour} beard="moustache"
      top="armour" coat={p.mail ?? "#8E98A2"} lower="trousers" legs="#5C5444" boots="#2B2420"
      skin={p.skin} pose="carry" action="idle"
      body={
        <g>
          <path d="M -56 -436 L 56 -436 L 64 -232 L 0 -206 L -64 -232 Z" fill={tabard} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -56 -436 L 56 -436 L 64 -232 L 0 -206 L -64 -232 Z" fill="none" stroke={C.mustard} strokeWidth={5} strokeLinejoin="round" transform="translate(0 0) scale(0.92 0.94) translate(4 -20)" />
          <path d="M -40 -420 L -40 -360 M 36 -420 L 36 -360" stroke="#FFFFFF" strokeWidth={4} opacity={0.35} strokeLinecap="round" />
        </g>
      }
      front={<path d="M -52 -498 Q 4 -446 60 -498 L 62 -466 Q 4 -424 -54 -466 Z" fill={p.mail ?? "#8E98A2"} stroke={INK} strokeWidth={5} strokeLinejoin="round" />}
      held={() => <Halberd />}
    />
  );
}
