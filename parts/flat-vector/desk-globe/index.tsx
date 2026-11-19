import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Desk globe on a round stand with a curved support and a tilted brass meridian ring.
// Land is a few generic blobs, not an exact map. Origin = bottom centre (the stand rests on y).
// About 480 px wide and 760 px tall at s = 1. anim "spin": the globe turns slowly on its axis.
const f1 = (v: number) => v.toFixed(1);
const R = 230, CY = -520;
type Blob = { c: [number, number]; pts: [number, number][] };
const BLOBS: Blob[] = [
  { c: [-95, 38], pts: [[-125, 50], [-100, 50], [-80, 45], [-70, 40], [-80, 25], [-95, 18], [-105, 22], [-115, 30], [-125, 40]] },
  { c: [15, 8], pts: [[-10, 35], [20, 38], [35, 32], [50, 12], [42, -5], [35, -25], [20, -34], [12, -15], [-5, 5], [-17, 15]] },
  { c: [95, 30], pts: [[40, 40], [70, 45], [110, 50], [140, 40], [130, 20], [105, 10], [80, 8], [65, 25], [45, 30]] },
  { c: [135, -27], pts: [[115, -22], [135, -14], [150, -25], [145, -38], [125, -34], [114, -30]] },
  { c: [-40, 66], pts: [[-50, 70], [-30, 72], [-25, 62], [-42, 60]] },
  { c: [-55, -15], pts: [[-80, 10], [-60, 8], [-35, -5], [-40, -22], [-58, -40], [-70, -52], [-75, -30], [-80, -5]] },
];

// Orthographic projection of a lon/lat point on the globe, for a given spin angle.
const proj = (lon: number, lat: number, rot: number) => {
  const l = ((lon + rot) * Math.PI) / 180, t = (lat * Math.PI) / 180;
  return { X: R * Math.cos(t) * Math.sin(l), Y: -R * Math.sin(t), Z: Math.cos(t) * Math.cos(l) };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const ocean = p.color && p.color !== "none" ? p.color : C.blue;
  const land = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const rot = anim === "spin" ? 40 + (f * 360) / 300 : 40;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={215} ry={14} fill={C.shadow} />
      {/* stand: curved support, round foot */}
      <path d="M -26 -292 Q 0 -200 -74 -112 L 74 -112 Q 0 -200 26 -292 Z" fill={C.grey} />
      <ellipse cx={0} cy={-56} rx={190} ry={46} fill={C.greyDark} />
      <ellipse cx={0} cy={-70} rx={176} ry={34} fill={C.grey} />
      {/* globe */}
      <g transform={`translate(0 ${CY})`}>
        <circle cx={0} cy={0} r={R} fill={ocean} />
        <g>
          {BLOBS.map((b, i) => {
            const cz = proj(b.c[0], b.c[1], rot).Z;
            if (cz <= -0.05) return null;
            const op = Math.min(1, (cz + 0.05) * 4);
            const d = b.pts.map(([lo, la], k) => {
              const q = proj(lo, la, rot);
              let X = q.X, Y = q.Y;
              if (q.Z < 0) { const m = Math.hypot(X, Y) || 1; X = (X / m) * R * 0.98; Y = (Y / m) * R * 0.98; }
              return `${k ? "L" : "M"} ${f1(X)} ${f1(Y)}`;
            }).join(" ") + " Z";
            return <path key={i} d={d} fill={land} opacity={op.toFixed(2)} />;
          })}
        </g>
        {/* highlight */}
        <ellipse cx={-80} cy={-120} rx={60} ry={34} fill={C.white} opacity={0.22} transform="rotate(-30 -80 -120)" />
        {/* brass half-meridian arc holding the globe at both poles, tilted with the axis */}
        <g transform="rotate(-20)">
          <path d={`M 0 ${-(R + 22)} A ${R + 22} ${R + 22} 0 0 1 0 ${R + 22}`} fill="none" stroke={C.yellowDark} strokeWidth={18} strokeLinecap="round" />
          <circle cx={0} cy={-(R + 22)} r={14} fill={shade(C.yellowDark, 0.2)} />
          <circle cx={0} cy={R + 22} r={14} fill={shade(C.yellowDark, 0.2)} />
        </g>
      </g>
    </g>
  );
}
