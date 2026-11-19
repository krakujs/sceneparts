import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Chunky whiteboard marker standing on its nib, with its cap off and standing beside it.
// The colour sets the ink window, the nib, the colour band and the cap. Origin = bottom centre of the nib (stands on y).
// About 300 px wide and 430 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const ink = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={70} cy={0} rx={160} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* marker body, centred on x = 0 */}
        <g transform="translate(-72 0)">
          <rect x={-48} y={-430} width={96} height={350} rx={26} fill={C.white} />
          <rect x={22} y={-430} width={26} height={350} rx={12} fill="#E3E7EE" />
          {/* ink window at the top and colour band */}
          <rect x={-40} y={-410} width={80} height={36} rx={10} fill={ink} />
          <rect x={-48} y={-170} width={96} height={36} fill={ink} />
          {/* nib collar and tip */}
          <path d="M -26 -80 L 26 -80 L 16 -36 L -16 -36 Z" fill={C.greyLight} />
          <rect x={-14} y={-36} width={28} height={36} rx={8} fill={shade(ink, 0.1)} />
          {/* cap, standing beside the marker */}
          <g transform="translate(120 0)">
            <rect x={-48} y={-300} width={96} height={300} rx={26} fill={ink} />
            <rect x={24} y={-300} width={24} height={300} rx={12} fill={shade(ink, 0.22)} />
            <rect x={-48} y={-22} width={96} height={22} rx={8} fill={shade(ink, 0.3)} />
            <rect x={-30} y={-280} width={14} height={180} rx={7} fill={C.white} opacity={0.3} />
          </g>
        </g>
      </g>
    </g>
  );
}
