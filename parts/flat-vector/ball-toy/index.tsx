import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ball toy: a classic beach ball, a sphere split into six curved vertical wedges that meet at a small top cap, with a highlight.
// Wedges alternate colour, white, colour, white, colour, white. anim "bounce" bounces it on the ground with a shrinking shadow.
// Origin = bottom centre (the ball rests on y). Faces the viewer, honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);
const R = 170;
const CY = -R; // ball centre

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** Point on the sphere for latitude lat and longitude phi (degrees, 0 = facing the viewer), in screen coordinates. */
const pt = (lat: number, phi: number) => {
  const la = (lat * Math.PI) / 180, ph = (phi * Math.PI) / 180;
  return [R * Math.cos(la) * Math.sin(ph), CY - R * Math.sin(la)] as const;
};

/** One wedge between longitudes p0 and p1: down the first meridian, back up the second. */
const wedge = (p0: number, p1: number) => {
  const N = 24;
  const left = Array.from({ length: N + 1 }, (_, i) => pt(-90 + (180 * i) / N, p0));
  const right = Array.from({ length: N + 1 }, (_, i) => pt(90 - (180 * i) / N, p1));
  return `M ${[...left, ...right].map(([x, y]) => `${f1(x)} ${f1(y)}`).join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c1 = p.color && p.color !== "none" ? p.color : C.red;
  const c2 = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const c3 = C.blue;
  const bounce = p.anim === "bounce" ? Math.abs(Math.sin((f * Math.PI) / 42)) : 0;
  const lift = bounce * 260;
  const squash = 1 - bounce * 0.12;
  const shadowK = 1 - bounce * 0.45;
  // six wedges across the visible front, 30 degrees each, alternating colour and white
  const wedges = [
    { p0: -90, p1: -60, c: c1 },
    { p0: -60, p1: -30, c: C.white },
    { p0: -30, p1: 0, c: c3 },
    { p0: 0, p1: 30, c: C.white },
    { p0: 30, p1: 60, c: c2 },
    { p0: 60, p1: 90, c: C.white },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190 * shadowK} ry={16 * shadowK} fill={C.shadow} />
      <g transform={motion(p.anim === "bounce" ? "none" : (p.anim ?? "none"), f)}>
        <g transform={`translate(0 ${f1(-lift)}) scale(1 ${f1(squash)})`}>
          {wedges.map((w, i) => (
            <path key={i} d={wedge(w.p0, w.p1)} fill={w.c} />
          ))}
          {/* top cap where the wedges meet */}
          <circle cx={0} cy={CY - R + 4} r={18} fill={C.greyLight} />
          {/* highlight */}
          <ellipse cx={-70} cy={CY - 90} rx={34} ry={20} fill={C.white} opacity={0.5} transform={`rotate(-30 -70 ${f1(CY - 90)})`} />
        </g>
      </g>
    </g>
  );
}
