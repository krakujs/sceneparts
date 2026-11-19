import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";
import { Townsfolk } from "../townsfolk/index";

// Paper boy: child in a flat cap with a canvas satchel of papers. He winds up and throws a rolled paper
// in a loop: the roll sits in his hand, is released, flies in an arc, then is picked up again.
// Preset of storybook/townsfolk at child size.
const INK = C.ink;
const CANVAS = "#A9744F";

const Roll: React.FC = () => (
  <g>
    <rect x={-46} y={-14} width={92} height={28} rx={14} fill={C.cream} stroke={INK} strokeWidth={5} />
    <ellipse cx={44} cy={0} rx={8} ry={13} fill={C.paperDark} stroke={INK} strokeWidth={3} />
    <path d="M -30 -8 L 20 -8" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
  </g>
);

const Satchel: React.FC = () => (
  <g>
    <path d="M -54 -446 L 60 -262" stroke="#4A2E1E" strokeWidth={12} fill="none" strokeLinecap="round" />
    <rect x={22} y={-318} width={96} height={80} rx={10} fill={CANVAS} stroke={INK} strokeWidth={5} />
    <rect x={30} y={-362} width={26} height={52} fill={C.cream} stroke={INK} strokeWidth={4} transform="rotate(-6 43 -336)" />
    <rect x={62} y={-368} width={24} height={58} fill="#FFFFFF" stroke={INK} strokeWidth={4} transform="rotate(7 74 -339)" />
    <rect x={30} y={-306} width={80} height={10} rx={4} fill="#6B4B2E" stroke={INK} strokeWidth={3} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0;
  const throwing = p.throw !== false;
  // 90-frame loop: 0-29 holding, 30-74 flying, 75-89 empty hand.
  const t = f % 90;
  const u = Math.min(1, Math.max(0, (t - 30) / 45));
  const inFlight = throwing && t >= 30 && t < 75;
  const fx = 150 + 180 * u;
  const fy = -560 + 260 * u - 140 * Math.sin(Math.PI * u);
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * f} y={p.y} s={p.s} f={f} flip={p.flip}
      hat="flat" hatColour="#8A6A45" hair="short" hairColour={p.hairColour}
      top="jacket" coat={p.jacket ?? "#4A4E5E"} shirt={C.cream} lower="trousers" legs="#3D3A44" boots="#2B2420"
      age="child" skin={p.skin} pose={throwing ? "up" : "down"} backPose="down"
      action={throwing ? "work" : "idle"}
      body={<Satchel />}
      held={() => (throwing && t < 30 ? <Roll /> : null)}
      front={
        inFlight ? (
          <g transform={`translate(${fx} ${fy}) rotate(${u * 540})`}>
            <Roll />
          </g>
        ) : null
      }
    />
  );
}
