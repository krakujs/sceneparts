import React from "react";
import type { PartProps } from "@sceneparts/core";
import { TileRect, snap } from "../backdrop/index";

// Bedroom: a bed with pillow and blanket, a window, a nightstand lamp, abstract posters, a rug and a wardrobe.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const fy = snap(p.floorY ?? 1480, 12);
  const on = (p.anim ?? "glow") === "glow";
  const glow = on ? 0.2 + 0.07 * (Math.floor(p.f / 12) % 2) : 0.22;
  return (
    <g>
      <TileRect tile="wall" x={0} y={0} w={1080} h={fy} cell={12} pal={{ S: "#d8c6e8", T: "#b8a4d0" }} />
      <rect x={0} y={fy - 180} width={1080} height={12} fill="#7a5aa0" />
      {/* window with curtains */}
      <rect x={60} y={fy - 900} width={264} height={300} fill="#5a4030" />
      <rect x={72} y={fy - 888} width={240} height={276} fill="#8fd0f8" />
      <rect x={180} y={fy - 888} width={12} height={276} fill="#5a4030" />
      <rect x={72} y={fy - 760} width={240} height={12} fill="#5a4030" />
      <rect x={24} y={fy - 920} width={48} height={360} fill="#ef8fb4" />
      <rect x={324} y={fy - 920} width={48} height={360} fill="#ef8fb4" />
      {/* posters (abstract) */}
      <rect x={780} y={fy - 860} width={156} height={216} fill="#5a4030" />
      <rect x={792} y={fy - 848} width={132} height={192} fill="#2a2a40" />
      <rect x={816} y={fy - 800} width={84} height={60} fill="#f08a3c" />
      <rect x={816} y={fy - 728} width={84} height={24} fill="#7af0c0" />
      <rect x={960} y={fy - 780} width={84} height={108} fill="#5a4030" />
      <rect x={972} y={fy - 768} width={60} height={84} fill="#ef8fb4" />
      {/* wardrobe */}
      <rect x={936} y={fy - 480} width={144} height={480} fill="#a06c44" />
      <rect x={948} y={fy - 468} width={120} height={456} fill="#c9874f" />
      <rect x={1000} y={fy - 468} width={12} height={456} fill="#7a4a2b" />
      <rect x={1020} y={fy - 300} width={12} height={48} fill="#f7d154" />
      <rect x={948} y={fy - 24} width={120} height={24} fill="#7a4a2b" />
      {/* bed with pillow and blanket, along the left */}
      <rect x={24} y={fy - 420} width={24} height={420} fill="#7a4a2b" />
      <rect x={24} y={fy - 240} width={396} height={24} fill="#a06c44" />
      <rect x={24} y={fy - 420} width={396} height={180} fill="#7a4a2b" />
      <rect x={420} y={fy - 264} width={24} height={264} fill="#7a4a2b" />
      <rect x={48} y={fy - 336} width={372} height={96} fill="#f5f1e8" />
      <rect x={48} y={fy - 384} width={96} height={48} fill="#fff" />
      <rect x={156} y={fy - 336} width={264} height={96} fill="#ef8fb4" />
      <rect x={156} y={fy - 336} width={264} height={12} fill="#c96a94" />
      {/* nightstand lamp */}
      <rect x={456} y={fy - 240} width={84} height={240} fill="#7a4a2b" />
      <circle cx={498} cy={fy - 330} r={150} fill="#f7d154" opacity={glow} />
      <rect x={480} y={fy - 384} width={36} height={36} fill="#5a6170" />
      <rect x={456} y={fy - 384} width={84} height={24} fill="#f7d154" />
      <rect x={456} y={fy - 384} width={84} height={6} fill="#d2a23a" />
      {/* rug */}
      <TileRect tile="carpet" x={252} y={fy + 12} w={576} h={120} cell={12} pal={{ r: "#7a4bb5", R: "#5a3490" }} />
      <rect x={252} y={fy + 12} width={576} height={12} fill="#f7d154" />
      {/* wooden floor */}
      <TileRect tile="wood" x={0} y={fy} w={1080} h={1920 - fy} cell={12} />
      <rect x={0} y={fy} width={1080} height={12} fill="#4a2c18" />
    </g>
  );
}
