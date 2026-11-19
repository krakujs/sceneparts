import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hologram: a small round projector throws a translucent blue cone up to a rotating wireframe cube or globe, with
// scanlines running over the beam. Effect: origin = centre of the projector lens (its top surface).
// The cone rises about 620 px at s = 1.
const METAL = "#4A5268";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1500, s = 1, f = 0, flip, color = "#5BC8FF", shape = "cube", anim = "spin" } = p as any;
  const spin = anim === "spin";
  const a = spin ? f * 0.03 : 0.5;
  const flicker = anim === "flicker" ? 0.85 + 0.15 * Math.sin(f / 2.5) : 1;
  const R = 130, OX = 0, OY = -340;
  const cone = "M -96 0 L -320 -620 A 320 60 0 0 0 320 -620 L 96 0 A 96 24 0 0 1 -96 0 Z";
  // Cube: 8 corners, rotated around Y then tilted; draw the 12 edges.
  const verts: number[][] = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) verts.push([sx, sy, sz]);
  const proj = (v: number[]) => {
    const X = v[0] * R, Y = v[1] * R, Z = v[2] * R;
    const X1 = X * Math.cos(a) + Z * Math.sin(a);
    const Z1 = -X * Math.sin(a) + Z * Math.cos(a);
    const Y1 = Y * Math.cos(0.45) - Z1 * Math.sin(0.45);
    return [OX + X1, OY + Y1];
  };
  const edges: React.ReactElement[] = [];
  verts.forEach((v, i) =>
    verts.forEach((w, j) => {
      if (j <= i) return;
      const diff = v.filter((c, k) => c !== w[k]).length;
      if (diff !== 1) return;
      const [x1, y1] = proj(v), [x2, y2] = proj(w);
      edges.push(<line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={5} strokeLinecap="round" />);
    }),
  );
  // Globe: an outline, meridians that turn with the angle, and latitude rings.
  const meridians = [0, 1, 2, 3, 4, 5].map((k) => {
    const ang = a + (k * Math.PI) / 6;
    return <ellipse key={k} cx={OX} cy={OY} rx={Math.abs(Math.cos(ang)) * R} ry={R} fill="none" stroke={color} strokeWidth={3} />;
  });
  const lats = [-0.6, -0.3, 0, 0.3, 0.6].map((lat) => {
    const hw = Math.sqrt(R * R - (lat * R) ** 2);
    return <ellipse key={lat} cx={OX} cy={OY + lat * R} rx={hw} ry={hw * 0.22} fill="none" stroke={color} strokeWidth={3} />;
  });
  // Scanlines: thin horizontal bars that drift upward.
  const scanOffset = spin ? (f * 1.2) % 7 : 0;
  let scan = "";
  for (let yy = -640 + scanOffset; yy < 0; yy += 7) scan += `M -340 ${yy.toFixed(1)} h 680 `;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <defs>
        <linearGradient id="hologram-cone" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={-620}>
          <stop offset="0" stopColor={color} stopOpacity={0.5} />
          <stop offset="1" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
        <clipPath id="hologram-clip">
          <path d={cone} />
        </clipPath>
      </defs>
      {/* projector: a round lens on a metal base */}
      <rect x={-90} y={0} width={180} height={40} rx={12} fill={METAL} />
      <ellipse cx={0} cy={40} rx={110} ry={24} fill={shade(METAL, 0.2)} />
      <ellipse cx={0} cy={0} rx={96} ry={24} fill={color} opacity={0.85} />
      <ellipse cx={0} cy={0} rx={60} ry={14} fill={C.white} opacity={0.6} />
      {/* beam */}
      <g opacity={flicker}>
        <path d={cone} fill="url(#hologram-cone)" />
        <g clipPath="url(#hologram-clip)">
          {shape === "globe" ? (
            <g>
              <circle cx={OX} cy={OY} r={R} fill={color} opacity={0.12} />
              <circle cx={OX} cy={OY} r={R} fill="none" stroke={color} strokeWidth={5} />
              {meridians}
              {lats}
            </g>
          ) : (
            <g>{edges}</g>
          )}
          {spin || anim === "flicker" ? <path d={scan} stroke={color} strokeWidth={2} opacity={0.22} /> : null}
        </g>
      </g>
    </g>
  );
}
