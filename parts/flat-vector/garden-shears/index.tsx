import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Long hedge shears lying on the floor: two long blades on the right, two long handles on the left, crossing at the pivot.
// Hero scale: about 460 px long at s = 1; use about 0.25 next to a person.
// anim "snip": the blades open and close.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  return "";
};
const P = { x: 0, y: -70 };
/** Quad polygon for a tapered bar from (x1,y1) to (x2,y2). */
const bar = (x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
  const pts = [[x1 + (nx * w1) / 2, y1 + (ny * w1) / 2], [x2 + (nx * w2) / 2, y2 + (ny * w2) / 2], [x2 - (nx * w2) / 2, y2 - (ny * w2) / 2], [x1 - (nx * w1) / 2, y1 - (ny * w1) / 2]];
  return pts.map((q) => `${f1(q[0])},${f1(q[1])}`).join(" ");
};
const end = (deg: number, len: number) => [P.x + Math.cos((deg * Math.PI) / 180) * len, P.y + Math.sin((deg * Math.PI) / 180) * len];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const blade = p.color && p.color !== "none" ? p.color : C.grey;
  const grip = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const o = anim === "snip" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 40) : 0.5;
  const upper = end(-(8 + 14 * o), 200);
  const lower = end(6 + 12 * o, 200);
  const hU = end(196, 210), hL = end(166, 210);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-40} cy={0} rx={250} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <polygon points={bar(P.x, P.y, lower[0], lower[1], 34, 14)} fill={shade(blade, 0.15)} />
        <polygon points={bar(P.x, P.y, upper[0], upper[1], 34, 14)} fill={blade} />
        <polygon points={bar(P.x, P.y, hU[0], hU[1], 34, 30)} fill={grip} />
        <polygon points={bar(P.x, P.y, hL[0], hL[1], 34, 30)} fill={shade(grip, 0.15)} />
        <circle cx={hU[0]} cy={hU[1]} r={26} fill={shade(grip, 0.25)} />
        <circle cx={hL[0]} cy={hL[1]} r={26} fill={shade(grip, 0.25)} />
        <circle cx={P.x} cy={P.y} r={13} fill={C.greyDark} />
      </g>
    </g>
  );
}
