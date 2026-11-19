import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Monk scribe: tonsured monk in brown hooded robe and rope belt, holding a big book and a quill.
const Book: React.FC = () => (
  <g transform="translate(0 -20)">
    <rect x={-80} y={-60} width={160} height={110} rx={6} fill="#6B3A22" stroke={C.ink} strokeWidth={6} />
    <rect x={-72} y={-52} width={144} height={94} rx={4} fill={C.cream} stroke={C.ink} strokeWidth={4} />
    <path d="M -56 -30 L 56 -30 M -56 -6 L 56 -6 M -56 18 L 30 18" stroke={C.stone} strokeWidth={4} opacity={0.5} />
    <path d="M 0 -52 L 0 42" stroke={C.ink} strokeWidth={4} opacity={0.3} />
  </g>
);

const Quill: React.FC = () => (
  <g transform="rotate(20)">
    <path d="M 0 0 L 0 -150 Q 26 -170 14 -220 Q -10 -180 -6 -150 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 0 L 0 -150" stroke={C.ink} strokeWidth={3} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat="none" hair="tonsure" hairColour={p.hairColour ?? "#8A7A6A"} beard="none" skin={p.skin}
      top="robe" coat={p.coat ?? "#6E4A2E"} lower="long" legs="#6E4A2E" boots="#2B2420"
      pose="carry" backPose="up" action={p.walk ? "walk" : "idle"}
      body={<g><path d="M -66 -330 Q 0 -310 66 -330 L 68 -300 Q 0 -280 -68 -300 Z" fill={C.sepia} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" /><path d="M -60 -440 Q -70 -360 -66 -300" fill="none" stroke={C.ink} strokeOpacity={0.3} strokeWidth={4} /></g>}
      held={() => <Book />}
      backHeld={() => <Quill />}
      front={<path d="M -70 -560 Q -86 -470 -56 -440 M 70 -560 Q 86 -470 56 -440" fill="none" stroke={C.ink} strokeOpacity={0.2} strokeWidth={4} />}
    />
  );
}
