import React from "react";
import { ui, startFrame, type UI } from "../stat-card/index";
import { Hand } from "../pointer-hand/index";
import { clamp, ease, type PartProps } from "@sceneparts/core";

// Swipe gesture hint: the UI pointing hand (finger up, as on a touch screen) slides across with a fading trail
// and an arrow showing the swipe direction, then fades and repeats. Centred on (x, y).
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1, S = s * 1.4;
  const x = p.x ?? 540, y = p.y ?? 960;
  const dir: string = p.dir ?? "left";
  const dist = (p.dist ?? 380) * s;
  const cyc = p.cycle ?? 48;
  const col = p.color ?? u.accent;
  const f = p.f ?? 0;
  const t = Math.max(0, f - at);
  const c = t % cyc;
  // 0..1 slide over 60 % of the cycle, then hold and fade; frame 0 shows the hand at the start with the arrow.
  const m = ease(clamp((c - 4) / (cyc * 0.55)));
  const fade = c > cyc * 0.75 ? 1 - clamp((c - cyc * 0.75) / (cyc * 0.2)) : 1;
  const horiz = dir === "left" || dir === "right";
  const sg = dir === "left" || dir === "up" ? -1 : 1;
  const ux = horiz ? sg : 0, uy = horiz ? 0 : sg;
  const sx = x - (ux * dist) / 2, sy = y - (uy * dist) / 2;
  const hx = sx + ux * dist * m, hy = sy + uy * dist * m;
  // arrow along the swipe path, drawn above (horizontal) or beside (vertical) the finger path
  const ax = horiz ? 0 : -110 * S / 1.4, ay = horiz ? -90 * S / 1.4 : 0;
  const a0x = sx + ax, a0y = sy + ay, a1x = sx + ux * dist + ax, a1y = sy + uy * dist + ay;
  const hd = 34 * S / 1.4;
  const head = `M ${a1x - ux * hd - uy * hd} ${a1y - uy * hd - ux * hd} L ${a1x} ${a1y} L ${a1x - ux * hd + uy * hd} ${a1y - uy * hd + ux * hd}`;
  return (
    <g>
      <g opacity={0.9}>
        <path d={`M ${a0x} ${a0y} L ${a1x} ${a1y}`} stroke={col} strokeWidth={14 * s} strokeLinecap="round" strokeDasharray={`${24 * s} ${22 * s}`} fill="none" />
        <path d={head} stroke={col} strokeWidth={14 * s} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* trail behind the fingertip */}
      {m > 0.02 ? (
        <path d={`M ${sx} ${sy} L ${hx} ${hy}`} stroke={col} strokeWidth={30 * s} strokeLinecap="round" opacity={0.28 * fade} />
      ) : null}
      <circle cx={hx} cy={hy} r={22 * s} fill={col} opacity={0.35 * fade} />
      <g opacity={fade} transform={`translate(${hx} ${hy}) scale(${S}) translate(0 10)`}>
        <Hand u={u} />
      </g>
    </g>
  );
}
