import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector narwhal, side view, with a long spiral tusk. Centre (x, y), faces right, honours flip.
// About 840 px long including the tusk at s = 1. pose swim: body wave and fluke beat from p.f. idle: slow bob only.

const BODY = "#7F8E9F", DARK = shade(BODY, 0.24), PALE = "#D5DDE6", MOTTLE = "#5E6B7B", IVORY = "#F3EBD6", IVORY_DK = "#CFC3A4";

type P2 = [number, number];
const qb = (a: P2, c: P2, b: P2, t: number): P2 => [
  (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1100;
  const swim = (p.pose ?? "swim") === "swim";
  const ph = f * 0.07;
  const bob = swim ? Math.sin(ph * 0.5) * 8 : Math.sin(f * 0.05) * 8;
  const bodyRot = swim ? Math.sin(ph) * 2 : 0;
  const tailRot = swim ? Math.sin(ph - 0.9) * 6 : 0;
  const flukeRot = swim ? Math.sin(ph - 1.6) * 12 : Math.sin(f * 0.05) * 2;

  // tusk: tapered spiral, grooves drawn as slanted lines across it
  const TA: P2 = [226, -12], TC: P2 = [400, -22], TB: P2 = [566, -44];
  const grooves = [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const t = 0.12 + i * 0.12;
    const pt = qb(TA, TC, TB, t), q = qb(TA, TC, TB, Math.min(1, t + 0.01)), o = qb(TA, TC, TB, Math.max(0, t - 0.01));
    let dx = q[0] - o[0], dy = q[1] - o[1];
    const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
    const w = ((24 + (2 - 24) * t) / 2) * 0.9;
    const nx = -dy, ny = dx;
    return (
      <path key={i} d={`M ${pt[0] - nx * w - dx * 7} ${pt[1] - ny * w - dy * 7} L ${pt[0] + nx * w + dx * 7} ${pt[1] + ny * w + dy * 7}`}
        stroke={IVORY_DK} strokeWidth={3} strokeLinecap="round" />
    );
  });

  const mottles: [number, number, number, number][] = [[-120, -40, 30, 14], [-60, -66, 40, 12], [10, -40, 46, 16], [80, -30, 30, 11], [-200, -6, 22, 9], [136, -52, 26, 10], [-30, -18, 22, 8], [-150, -60, 26, 9]];

  return (
    <g transform={`translate(${x} ${y + bob}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${bodyRot})`}>
        <g transform={`rotate(${tailRot} -270 0)`}>
          <path d="M -176 -58 C -220 -52 -254 -40 -270 -28 L -270 28 C -240 36 -210 44 -176 44 Z" fill={BODY} />
          <g transform={`translate(-270 0) rotate(${flukeRot})`}>
            <path d="M 6 -8 C -26 -36 -56 -66 -92 -84 C -80 -56 -72 -30 -66 0 C -72 30 -80 56 -92 84 C -56 66 -26 36 6 8 Z" fill={DARK} />
          </g>
        </g>
        <path d="M 260 14 C 262 -30 236 -76 166 -92 C 70 -112 -40 -104 -180 -62 L -180 40 C -100 60 0 70 90 66 C 180 62 240 44 260 14 Z" fill={BODY} />
        <g fill={MOTTLE} opacity={0.45}>
          {mottles.map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />)}
        </g>
        <path d="M -180 22 C -90 30 0 40 80 40 C 150 40 210 28 258 14 C 240 40 200 56 150 60 C 80 66 -40 66 -180 40 Z" fill={PALE} />
        <path d="M -110 -78 C -104 -96 -96 -106 -84 -110 C -86 -98 -90 -88 -96 -76 Z" fill={DARK} />
        {taper([120, 30], [100, 90], [60, 150], 60, 14, DARK)}
        <circle cx={150} cy={-30} r={7} fill={DARK} />
        {taper(TA, TC, TB, 24, 2, IVORY)}
        {grooves}
      </g>
    </g>
  );
}
