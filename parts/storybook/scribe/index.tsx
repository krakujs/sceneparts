import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Ancient scribe: white linen kilt and headcloth, reed pen in hand, papyrus scroll under the other arm.
const Pen: React.FC = () => (
  <g transform="rotate(-30)">
    <rect x={-5} y={-230} width={10} height={260} rx={4} fill="#B8A56A" stroke={C.ink} strokeWidth={4} />
    <path d="M -5 30 L 5 30 L 0 56 Z" fill={C.ink} />
  </g>
);

const Scroll: React.FC = () => (
  <g transform="translate(0 -30)">
    <rect x={-46} y={-100} width={92} height={200} fill={C.paper} stroke={C.ink} strokeWidth={6} />
    <ellipse cx={-46} cy={0} rx={14} ry={100} fill={C.paperDark} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={46} cy={0} rx={14} ry={100} fill={C.paperDark} stroke={C.ink} strokeWidth={5} />
    <path d="M -26 -60 L 26 -60 M -26 -30 L 20 -30 M -26 0 L 26 0 M -26 30 L 14 30" stroke={C.sepia} strokeWidth={4} opacity={0.6} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="turban" hatColour="#F7F2E6" hair="bald" beard="none" skin={p.skin ?? "#C98E64"}
      top="shirt" shirt="#C98E64" coat="#C98E64" lower="shorts" legs="#C98E64" boots="#C98E64"
      pose="forward" backPose="down" action={p.walk ? "walk" : "idle"}
      body={<path d="M -70 -290 L 70 -290 L 80 -150 L -80 -150 Z" fill="#F7F2E6" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />}
      front={<g transform="translate(-34 -330) rotate(-6)"><Scroll /></g>}
      held={() => <Pen />}
    />
  );
}
