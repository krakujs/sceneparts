import React from "react";
import type { PartProps } from "@sceneparts/core";
import Pine from "../pine-tree/index";
import Birch from "../birch-tree/index";
import Oak from "../oak-tree/index";
import Bush from "../bush/index";

// Forest vignette: a mix of pine, birch and oak trees and a bush, in two depth rows (small and far behind, large and near in front).
// Built from the tree parts. Origin = centre of the vignette on the ground. About 1000 px wide and 1250 px tall at s = 1.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, x = p.x ?? 540, y = p.y ?? 1600;
  const anim: string = p.anim ?? "none";
  const kid = { f: p.f, d: p.d, t: p.t, style: p.style, render: p.render, anim };
  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      {/* far row */}
      <Pine {...kid} x={-330} y={-190} s={0.5} />
      <Birch {...kid} x={-170} y={-210} s={0.6} />
      <Oak {...kid} x={170} y={-190} s={0.55} />
      <Pine {...kid} x={330} y={-200} s={0.5} flip />
      {/* near row */}
      <Oak {...kid} x={-110} y={10} s={0.85} />
      <Birch {...kid} x={300} y={20} s={0.8} />
      <Bush {...kid} x={-330} y={40} s={0.45} />
    </g>
  );
}
