import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Hermit: very old man with a long white beard, ragged hooded robe, gnarled staff and a small lantern.
const Staff: React.FC = () => (
  <g>
    <rect x={-9} y={-330} width={18} height={560} rx={8} fill="#7A5A3A" stroke={C.ink} strokeWidth={5} />
    <path d="M -4 -150 q -26 -8 -30 -30 M 4 -90 q 24 -6 28 -28" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

const Beard: React.FC = () => (
  <path d="M -28 -470 Q -40 -400 -14 -340 Q 4 -312 22 -340 Q 46 -400 36 -470 Q 4 -436 -28 -470 Z" fill="#F4F0E8" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      age="old" hat="none" hair="bald" beard="none" skin={p.skin}
      top="robe" coat={p.coat ?? "#6E5B45"} lower="long" legs="#6E5B45" boots="#2B2420"
      pose="carry" backPose="up" action={p.walk ? "walk" : "idle"}
      body={<path d="M -40 -330 L -52 -270 M 30 -330 L 46 -256 M -70 -420 L -88 -300 M -6 -360 L -18 -290" stroke={C.ink} strokeOpacity={0.35} strokeWidth={4} fill="none" />}
      held={() => <Staff />}
      backHeld={() => (
        <g>
          <circle cx={0} cy={-10} r={36} fill={C.glow} opacity={0.3} />
          <rect x={-12} y={-24} width={24} height={32} fill="#FCEBB6" stroke={C.ink} strokeWidth={5} />
          <path d="M 0 -14 Q 6 -4 0 0 Q -6 -4 0 -14 Z" fill="#F08A24" />
        </g>
      )}
      front={<g><Beard /><path d="M -58 -560 Q -62 -600 4 -602 Q 66 -600 62 -560" fill="none" stroke="#F4F0E8" strokeWidth={6} strokeLinecap="round" /></g>}
    />
  );
}
