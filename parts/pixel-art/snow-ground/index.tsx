import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Far, GroundBand, TileRect, rnd, snap } from "../backdrop/index";
import { Pixels, PAL, gridOf, outlined } from "../style/index";

// Snow ground: winter outdoors. Grey sky with falling pixel snowflakes, snowy hills, a snow tile ground and
// snowy pines at the edges. anim "snow" makes the flakes fall from p.f; the centre stage stays clear.

const SPINE = gridOf([
  "....w....",
  "...wfw...",
  "..wfwfw..",
  "...fwf...",
  "..fwfwf..",
  ".wfwfwfw.",
  "..fwfwf..",
  ".fwfwfwf.",
  "wfwfwfwfw",
  "....u....",
  "....u....",
]);
const PINE_PAL = { ...PAL, f: "#2a5a48", e: "#2f7a52", w: "#f5f1e8", u: "#5a3a22" };
const SKY = ["#8d9aab", "#9eabbb", "#b4c0cd", "#c9d3de"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const gy = snap(p.groundY ?? 1600, 12);
  const seed = p.seed ?? 7;
  const falling = (p.anim ?? "snow") === "snow";
  const flakes = Array.from({ length: 70 }, (_, i) => {
    const big = i % 4 === 0;
    const x0 = rnd(seed, i) * 1080;
    const y0 = rnd(seed, i + 100) * 1920;
    const vx = 0.3 + rnd(seed, i + 200) * 0.4;
    const vy = 0.8 + rnd(seed, i + 300) * 1.2;
    const x = snap((((x0 + (falling ? p.f * vx : 0)) % 1080) + 1080) % 1080);
    const y = snap((((y0 + (falling ? p.f * vy : 0)) % gy) + gy) % gy);
    return { x, y, big };
  });
  const band = gy / SKY.length;
  const pines = [
    { x: 40, cell: 16 },
    { x: 980, cell: 16 },
    { x: 250, cell: 10 },
    { x: 830, cell: 10 },
  ];
  return (
    <g>
      {SKY.map((c, i) => (
        <rect key={i} x={0} y={i * band} width={1080} height={band + 1} fill={c} />
      ))}
      <Far kind="mountains" base={gy - 60} time="day" seed={seed + 1} maxH={300} tint="#7f8aa0" />
      <Far kind="mountains" base={gy - 10} time="day" seed={seed + 4} maxH={180} tint="#9aa6b8" />
      <TileRect tile="snow" x={0} y={gy - 150} w={1080} h={162} cell={12} />
      <GroundBand y={gy} top="snowTop" body="snow" />
      {pines.map((t, i) => (
        <Pixels key={"pn" + i} grid={outlined(SPINE)} px={t.cell} pal={PINE_PAL} x={t.x} y={gy + 12 - outlined(SPINE).length * t.cell} />
      ))}
      {flakes.map((f, i) => (
        <rect key={"f" + i} x={f.x} y={f.y} width={f.big ? 12 : 6} height={f.big ? 12 : 6} fill="#f5f1e8" />
      ))}
    </g>
  );
}
