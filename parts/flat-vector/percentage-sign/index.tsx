import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Big chunky 3D-looking percent sign, centred on x, y. Made of two rings and a slash, extruded with
// stacked shade copies behind the face. For sale and discount scenes. Size about 460 px at s = 1.
// anim "pop": scales in with a small overshoot (starts at 70 %, so frame 0 is never empty).
// anim "spin": turns about its vertical axis, like a coin.
const f1 = (v: number) => v.toFixed(1);

// Glyph in local units: centred on (0, 0), the slash runs from top-right to bottom-left.
const Glyph = ({ c }: { c: string }) => (
  <g>
    <circle cx={-115} cy={-135} r={80} fill="none" stroke={c} strokeWidth={58} />
    <circle cx={115} cy={135} r={80} fill="none" stroke={c} strokeWidth={58} />
    <path d="M 150 -210 L -150 210" stroke={c} strokeWidth={62} strokeLinecap="round" />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const face = p.color && p.color !== "none" ? p.color : C.orange;
  const side = p.color2 && p.color2 !== "none" ? p.color2 : shade(face, 0.4);
  const anim: string = p.anim ?? "none";
  // pop: easeOutBack from 70 % over 24 frames.
  const t = Math.min(1, f / 24), c1 = 1.70158, c3 = c1 + 1;
  const back = 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
  const pop = anim === "pop" ? 0.7 + 0.3 * back : 1;
  // spin: squeezes horizontally and turns back, never below 12 % width.
  const sx = anim === "spin" ? 0.12 + 0.88 * Math.abs(Math.cos((f * 2 * Math.PI) / 120)) : 1;
  const k = pop;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${f1(s * k * sx * (p.flip ? -1 : 1))} ${f1(s * k)})`}>
      {/* extrusion: stacked copies stepping down and right */}
      {Array.from({ length: 14 }, (_, i) => {
        const j = 14 - i;
        return <g key={i} transform={`translate(${f1(j * 1.4)} ${f1(j * 2.2)})`}><Glyph c={side} /></g>;
      })}
      {/* front face with a light edge on top */}
      <Glyph c={shade(face, 0.1)} />
      <g transform="translate(-4 -6)"><Glyph c={face} /></g>
    </g>
  );
}
