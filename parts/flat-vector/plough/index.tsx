import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Old horse-drawn farm plough, room scale: about 720 px wide and 580 px tall at s = 1. Origin = floor centre under the land wheel.
// Wooden beam, stilts (handles) on the left, iron share and coulter at the front on the right.
// anim "roll": the land wheel turns.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
const bar = (x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
  const pts = [[x1 + (nx * w1) / 2, y1 + (ny * w1) / 2], [x2 + (nx * w2) / 2, y2 + (ny * w2) / 2], [x2 - (nx * w2) / 2, y2 - (ny * w2) / 2], [x1 - (nx * w1) / 2, y1 - (ny * w1) / 2]];
  return pts.map((q) => `${f1(q[0])},${f1(q[1])}`).join(" ");
};
const HUB = [-120, -120];
const SPOKES = [0, 30, 60, 90, 120, 150];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const iron = p.color2 && p.color2 !== "none" ? p.color2 : C.greyDark;
  const anim: string = p.anim ?? "none";
  const spin = anim === "roll" ? (f * 4) % 360 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-60} cy={0} rx={380} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(spin)} ${HUB[0]} ${HUB[1]})`}>
          <circle cx={HUB[0]} cy={HUB[1]} r={116} fill={shade(wood, 0.2)} />
          <circle cx={HUB[0]} cy={HUB[1]} r={96} fill={wood} />
          {SPOKES.map((a) => (
            <rect key={a} x={HUB[0] - 7} y={HUB[1] - 96} width={14} height={192} rx={5} fill={shade(wood, 0.3)} transform={`rotate(${a} ${HUB[0]} ${HUB[1]})`} />
          ))}
          <circle cx={HUB[0]} cy={HUB[1]} r={18} fill={iron} />
        </g>
        <polygon points={bar(-310, -300, 240, -250, 34, 30)} fill={wood} />
        <polygon points={bar(-300, -290, -380, -560, 26, 22)} fill={wood} />
        <polygon points={bar(-420, -572, -350, -584, 22, 22)} fill={shade(wood, 0.2)} />
        <path d="M 150 -210 C 80 -210 20 -270 -60 -320 L -30 -340 C 40 -300 100 -260 170 -230 Z" fill={C.grey} />
        <rect x={180} y={-262} width={16} height={216} rx={6} fill={iron} />
        <path d="M 150 -210 L 262 -210 L 300 -40 Q 304 -6 270 -4 L 160 -20 Z" fill={iron} />
        <path d="M 160 -40 L 290 -40 L 300 -40 Q 304 -6 270 -4 L 160 -20 Z" fill={shade(iron, 0.25)} />
        <circle cx={250} cy={-268} r={12} fill={iron} />
      </g>
    </g>
  );
}
