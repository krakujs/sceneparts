import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Victorian sailor: white blouse with a big square navy collar and neckerchief, flat round cap,
// and a canvas kit bag on the shoulder. Preset of storybook/townsfolk.
const INK = C.ink;

const Cap: React.FC = () => (
  <g>
    <ellipse cx={4} cy={-604} rx={72} ry={22} fill={C.navy} stroke={INK} strokeWidth={6} />
    <path d="M -64 -600 Q -66 -570 -60 -556 Q 4 -544 68 -556 Q 66 -570 64 -600 Q 4 -584 -64 -600 Z" fill={C.navy} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -58 -578 Q 4 -566 62 -578" stroke={C.cream} strokeWidth={6} fill="none" />
    <path d="M -30 -604 Q -10 -612 14 -606" stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

const KitBag: React.FC = () => (
  <g>
    <path d="M -86 -386 Q -70 -462 -30 -448" stroke={C.stone} strokeWidth={14} fill="none" strokeLinecap="round" />
    <g transform="rotate(-14 -86 -330)">
      <rect x={-130} y={-392} width={112} height={92} rx={34} fill={C.sepia} stroke={INK} strokeWidth={6} />
      <path d="M -120 -388 Q -74 -372 -28 -388" stroke={C.paperDark} strokeWidth={5} fill="none" />
      <rect x={-112} y={-344} width={20} height={14} rx={4} fill={C.stone} stroke={INK} strokeWidth={3} />
    </g>
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const collar = p.collar ?? C.navy;
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="none" front={<><Cap /><KitBag /></>} hair="short" hairColour={p.hairColour}
      top="shirt" shirt={C.cream} lower="trousers" legs={C.navy} boots="#2B2420"
      skin={p.skin} pose="down" backPose="down" action={p.walk ? "walk" : "idle"}
      body={
        <g>
          <path d="M -60 -446 Q 0 -424 60 -446 L 80 -360 L 20 -318 L 0 -300 L -20 -318 L -80 -360 Z" fill={collar} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -52 -438 Q 0 -418 52 -438 L 70 -368 L 16 -330 L 0 -318 L -16 -330 L -70 -368 Z" fill="none" stroke={C.cream} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -26 -404 L 26 -404 L 0 -322 Z" fill={C.brick} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        </g>
      }
    />
  );
}
