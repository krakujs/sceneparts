import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TP, rnd, snap } from "../backdrop/index";
import { Pixels, gridOf } from "../style/index";

// Wooden floor: a full-frame floor of long planks seen from above, with staggered joints, grain lines, a knot or
// two and a soft light patch from a window. anim "shine" slides the light patch slowly across the planks from p.f.

const KNOT = gridOf(["..QQ..", ".QuuQ.", "QuuuuQ", ".QuuQ.", "..QQ.."]);
const LIGHT = Array.from({ length: 10 }, (_, r) =>
  Array.from({ length: 16 }, (_, c) => {
    const corner = ((r === 0 || r === 9) && (c < 3 || c > 12)) || ((c === 0 || c === 15) && (r < 2 || r > 7));
    return corner ? "." : "L";
  }),
);
const KNOTS = [
  { x: 300, y: 380 },
  { x: 700, y: 1180 },
  { x: 160, y: 1560 },
];
const PLANK_H = 96;
const PLANK_COLS = ["#b07a45", "#a46d3c", "#b8834e"];
const SEAM = "#5a3a22";
const GRAIN = "#8a5a32";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = 12;
  const shine = (p.anim ?? "shine") === "shine";
  const lx = shine ? snap(120 + ((p.f * 0.5) % 700)) : 420;
  const rows = Array.from({ length: 21 }, (_, r) => r);
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={SEAM} />
      {rows.map((r) => {
        const y = r * PLANK_H;
        const joint = (r % 3) * 144;
        const joints: number[] = [];
        for (let x = joint - 432; x < 1080; x += 432) joints.push(x);
        const grain = snap(rnd(seed, r) * 900);
        return (
          <g key={"row" + r}>
            <rect x={0} y={y + 12} width={1080} height={PLANK_H - 12} fill={PLANK_COLS[r % PLANK_COLS.length]} />
            {joints.map((x) => (
              <rect key={"j" + x} x={x} y={y + 12} width={12} height={PLANK_H - 12} fill={SEAM} />
            ))}
            <rect x={grain} y={y + 44} width={120} height={12} fill={GRAIN} opacity={0.6} />
            <rect x={grain + 300} y={y + 70} width={72} height={8} fill={GRAIN} opacity={0.5} />
          </g>
        );
      })}
      {KNOTS.map((k, i) => (
        <Pixels key={i} grid={KNOT} px={12} pal={TP} x={k.x} y={k.y} />
      ))}
      <Pixels grid={LIGHT} px={24} pal={{ L: "#fff3b0" }} x={lx} y={860} opacity={0.3} />
    </g>
  );
}
