import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sunglasses: generic pair of sunglasses, front view, with rounded lenses, a bridge and short arm stubs.
// Origin = bottom centre (the lenses' lowest point sits on y, so the pair stands on its bottom edge); faces the viewer.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** One lens, right-hand side (centred near x = 110). Drawn as a rounded shape with a glint. */
const lensPath = "M 36 -150 Q 36 -190 84 -196 L 150 -196 Q 192 -192 196 -150 L 196 -80 Q 190 -18 134 -10 Q 80 -4 48 -52 Q 34 -84 36 -150 Z";

const Pair = ({ frame, lens }: { frame: string; lens: string }) => (
  <g>
    {/* frame behind each lens, slightly larger */}
    <path d={lensPath} fill={frame} />
    <path d={lensPath} fill={lens} transform="translate(116 -100) scale(0.86) translate(-116 100)" />
    <ellipse cx={130} cy={-146} rx={22} ry={10} fill={C.white} opacity={0.45} transform="rotate(-18 130 -146)" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const frame = p.color && p.color !== "none" ? p.color : C.ink;
  const lens = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* arm stubs at the outer edges */}
        <rect x={-236} y={-170} width={54} height={22} rx={10} fill={frame} />
        <rect x={182} y={-170} width={54} height={22} rx={10} fill={frame} />
        {/* bridge */}
        <path d="M -48 -150 Q 0 -176 48 -150 L 48 -128 Q 0 -150 -48 -128 Z" fill={frame} />
        {/* right lens */}
        <Pair frame={frame} lens={lens} />
        {/* left lens: mirror of the right */}
        <g transform="scale(-1 1)">
          <Pair frame={frame} lens={lens} />
        </g>
      </g>
    </g>
  );
}
