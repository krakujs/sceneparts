import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Pixels, makeGrid } from "../style/index";
import type { Grid } from "../style/index";
import { rnd, snap, TP } from "../backdrop/index";

// Space: pixel-art outer space. Deep blue-black sky with twinkling pixel stars, a small far moon and a ringed
// planet whose ring passes behind and in front of the globe. No ground: sprites float over the whole frame.


/** Planet + ring as three layers: ring behind the globe, globe, ring in front. */
const planet = (R: number) => {
  const W = 4 * R + 1, H = 2 * R + 1;
  const back = makeGrid(W, H), body = makeGrid(W, H), front = makeGrid(W, H);
  for (let r = 0; r < H; r++)
    for (let q = 0; q < W; q++) {
      const dx = q - 2 * R, dy = r - R;
      const t = (dx / (2 * R)) ** 2 + (dy / (0.5 * R)) ** 2;
      const inRing = t >= 0.62 && t <= 1.0;
      if (dx * dx + dy * dy <= R * R) {
        let c = r % 4 === 0 ? "b" : "c";
        if (dx + dy < -R * 0.55) c = "I";
        if (dx + dy > R * 0.7) c = "n";
        body[r][q] = c;
      } else if (inRing) {
        if (dy < 0) back[r][q] = "N";
        else front[r][q] = "O";
      }
      if (inRing && dy < 0 && dx * dx + dy * dy <= R * R) back[r][q] = "N";
      if (inRing && dy >= 0 && dx * dx + dy * dy <= R * R) front[r][q] = "O";
    }
  return { back, body, front };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const seed = p.seed ?? 5;
  const twinkle = (p.anim ?? "twinkle") !== "none";
  const f = twinkle ? p.f ?? 0 : 0;
  const stars = Array.from({ length: 90 }).map((_, i) => {
    const x = snap(rnd(seed, i) * 1068), y = snap(rnd(seed, i + 300) * 1900);
    const on = !twinkle || Math.floor((f + i * 13) / 16) % 4 !== 0;
    const big = i % 9 === 0;
    const col = i % 5 === 0 ? "#f7d154" : i % 3 === 0 ? "#9aa6d8" : "#f5f1e8";
    return <rect key={"s" + i} x={x} y={y} width={big ? 12 : 6} height={big ? 12 : 6} fill={col} opacity={on ? 1 : 0.25} />;
  });
  const P = planet(8);
  const px = 24, px0 = 540 - 16 * px, py0 = 420 - 8 * px;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill="#07071a" />
      <rect x={0} y={0} width={1080} height={480} fill="#0b0b22" />
      {stars}
      <g shapeRendering="crispEdges">
        {[[-2, 4], [-3, 6], [-4, 8], [-4, 8], [-4, 8], [-4, 8], [-3, 6], [-2, 4]].map(([o, w], r) => (
          <rect key={"m" + r} x={240 + o * 24} y={1200 + r * 24} width={w * 24} height={24} fill={r < 3 ? "#ef8fb4" : "#c96f95"} />
        ))}
        <rect x={192} y={1272} width={24} height={24} fill="#a85a7c" />
        <rect x={264} y={1320} width={48} height={24} fill="#a85a7c" />
      </g>
      <Pixels grid={P.back} px={px} pal={TP} x={px0} y={py0} />
      <Pixels grid={P.body} px={px} pal={TP} x={px0} y={py0} />
      <Pixels grid={P.front} px={px} pal={TP} x={px0} y={py0} />
    </g>
  );
}
