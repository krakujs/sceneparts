import React from "react";
import { ui, startFrame, enter, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Polaroid: white card, thick bottom margin, handwritten-style caption, tilted. The photo area (u.soft) is
// left empty so an image can be placed under or over it at the same centre and size.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const W = p.w ?? 760;
  const pad = 36, photo = W - pad * 2, bottom = 200, H = pad + photo + bottom;
  const drop = enter(p.f, at, 18);
  const dropY = (1 - drop) * -160;
  const k = 0.9 + 0.1 * drop;
  const cap = String(p.caption ?? "");
  const capIn = enter(p.f, at + 14, 12);
  const rot = (p.rot ?? -4) * drop;
  return (
    <g transform={`translate(${p.x ?? 540} ${(p.y ?? 900)}) rotate(${rot}) scale(${s * k}) translate(0 ${dropY})`} opacity={enter(p.f, at, 6)}>
      <rect x={-W / 2 + 8} y={-H / 2 + 18} width={W} height={H} rx={10} fill="rgba(0,0,0,0.22)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={10} fill={u.white} stroke={u.ink} strokeWidth={6} />
      <rect x={-W / 2 + pad} y={-H / 2 + pad} width={photo} height={photo} fill={p.color ?? u.soft} stroke={u.ink} strokeWidth={4} />
      {cap ? (
        <g opacity={capIn}>
          <Txt x={0} y={H / 2 - bottom / 2 + 22} u={u} size={fitSize(cap, 62, W - 120)} weight={700} fill={u.ink} maxW={W - 120}>{cap}</Txt>
        </g>
      ) : null}
    </g>
  );
}
