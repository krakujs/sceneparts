import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person, poseAt } from "../person/index";
import { C } from "../style/index";

// Blind person with white cane: an adult in sunglasses walking. The long white cane (red tip) is drawn in the front hand
// and reaches forward to the ground. The ground height is worked out from the walk pose so the tip stays on the floor.
const rad = (d: number) => (d * Math.PI) / 180;
const legLen = (l: [number, number]) => 235 * Math.cos(rad(l[0])) + 215 * Math.cos(rad(l[0] - l[1]));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const P = poseAt("walk", p.f);
  const drop = 450 - Math.max(legLen(P.bl), legLen(P.fl)) - P.jump; // Person's body drop; ground is at y = -drop
  const cane = (h: { x: number; y: number }) => {
    const top = { x: h.x - 14, y: h.y - 120 };
    const tip = { x: h.x + 150, y: -drop };
    const mx = top.x + (tip.x - top.x) * 0.84, my = top.y + (tip.y - top.y) * 0.84;
    return (
      <g strokeLinecap="round">
        <line x1={top.x + 4} y1={top.y + 4} x2={tip.x + 4} y2={tip.y} stroke={C.greyLight} strokeWidth={14} />
        <line x1={top.x} y1={top.y} x2={tip.x} y2={tip.y} stroke={C.white} strokeWidth={14} />
        <line x1={mx} y1={my} x2={tip.x} y2={tip.y} stroke={C.red} strokeWidth={14} />
      </g>
    );
  };
  return (
    <Person {...p} x={p.x + (p.vx ?? 0) * p.f} f={p.f} flip={!!p.flip} age="adult" pose="walk" accessory="sunglasses" prop="none" held={cane} />
  );
}
