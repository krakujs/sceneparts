import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { startFrame } from "../stat-card/index";

// Light leak: warm orange and pink translucent blobs that drift along one edge of the frame, like light bleeding
// into a film camera. Each blob is a radial gradient fading to nothing, so layering them works like a screen blend.
// Covers the full frame and ignores x and y. Drift wraps, so it loops.

const uid = (v: unknown) => String(v).replace(/[^a-zA-Z0-9]/g, "_");
const COLS = ["#FF9A3D", "#FF5E9E", "#FFD27A", "#FF7A5C"];

export default function Part(p: PartProps<any>) {
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const edge = p.edge === "right" || p.edge === "top" || p.edge === "bottom" ? p.edge : "left";
  const horizontal = edge === "top" || edge === "bottom";
  const L = horizontal ? 1080 : 1920;
  const pad = 400, span = L + 2 * pad;
  const k = clamp(Number(p.strength ?? 0.6), 0, 1);
  const sd = String(p.seed ?? "leak");
  const blobs = [0, 1, 2, 3].map((i) => {
    const q = (j: number) => random(`${sd}-${i}-${j}`);
    const along = ((q(0) * span + lf * (1.5 + q(1) * 2.5)) % span) - pad;
    const wave = 0.5 + 0.5 * Math.sin((lf / (240 + q(2) * 200)) * Math.PI * 2 + q(3) * 6.28);
    const depth = 30 + wave * 230;
    const R = 300 + q(4) * 200;
    return { along, depth, R, c: COLS[i % COLS.length], op: k * (0.3 + 0.35 * wave), id: `ll-${uid(sd)}-${edge}-${i}` };
  });
  return (
    <g>
      <defs>
        {blobs.map((b) => (
          <radialGradient key={b.id} id={b.id}>
            <stop offset="0" stopColor={b.c} stopOpacity={1} />
            <stop offset="0.45" stopColor={b.c} stopOpacity={0.55} />
            <stop offset="1" stopColor={b.c} stopOpacity={0} />
          </radialGradient>
        ))}
      </defs>
      {blobs.map((b) => {
        const nx = edge === "left" ? b.depth : edge === "right" ? 1080 - b.depth : b.along;
        const ny = edge === "top" ? b.depth : edge === "bottom" ? 1920 - b.depth : b.along;
        return <circle key={b.id} cx={nx.toFixed(1)} cy={ny.toFixed(1)} r={b.R} fill={`url(#${b.id})`} opacity={b.op} />;
      })}
    </g>
  );
}
