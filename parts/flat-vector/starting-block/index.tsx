import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of sprint starting blocks, side view, facing right: each block is a sloped frame on a rail with a
// front and a rear footplate angled up to meet the runner's feet. Origin = track centre (the rail sits on y).
// Room-scale: about 840 px wide and 400 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const pad = p.color && p.color !== "none" ? p.color : C.red;
  const frame = p.color2 && p.color2 !== "none" ? p.color2 : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const block = (cx: number) => (
    <g key={cx} transform={`translate(${cx} 0)`}>
      {/* sloped frame from the rail up to the pads */}
      <path d="M -90 -40 L 90 -40 L 60 -250 L -70 -250 Z" fill={frame} />
      <path d="M 10 -40 L 90 -40 L 60 -250 L 30 -250 Z" fill={shade(frame, 0.25)} />
      {/* front footplate, angled up towards the runner */}
      <g transform="translate(-10 -262) rotate(-30)">
        <rect x={-120} y={-18} width={240} height={36} rx={14} fill={pad} />
        <rect x={-120} y={10} width={240} height={8} rx={4} fill={shade(pad, 0.25)} />
      </g>
      {/* rear footplate, lower and further back */}
      <g transform="translate(-110 -180) rotate(-30)">
        <rect x={-100} y={-16} width={200} height={32} rx={13} fill={shade(pad, 0.12)} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* rail along the track */}
        <rect x={-430} y={-40} width={860} height={40} rx={10} fill={frame} />
        <rect x={-430} y={-16} width={860} height={16} rx={8} fill={shade(frame, 0.25)} />
        {block(-190)}
        {block(190)}
      </g>
    </g>
  );
}
