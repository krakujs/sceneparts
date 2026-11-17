import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector coral clump on the ground, scenery-style. Origin = bottom centre (y). About 360 px tall at s = 1.
// Faces right, honours flip, s and vx. variant: branch (branching tubes), brain (domed brain coral),
// fan (sea fan on a stem). color sets the coral colour. pose idle: gentle sway; sway: larger sway.

const BRANCHES: { pts: [number, number][]; w: number }[] = [
  { pts: [[0, 0], [0, -120], [-10, -200]], w: 46 },
  { pts: [[-4, -120], [-70, -170], [-96, -240]], w: 34 },
  { pts: [[2, -130], [70, -190], [88, -270]], w: 36 },
  { pts: [[-8, -200], [-40, -268]], w: 26 },
  { pts: [[-70, -170], [-130, -186]], w: 22 },
  { pts: [[70, -190], [130, -212]], w: 24 },
  { pts: [[-96, -240], [-120, -290]], w: 18 },
  { pts: [[88, -270], [70, -322]], w: 18 },
  { pts: [[-40, -268], [-18, -330]], w: 16 },
];

const pathOf = (pts: [number, number][], dx = 0) =>
  `M ${pts.map(([a, b]) => `${a + dx} ${b}`).join(" L ")}`;

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle", variant = p.variant ?? "branch";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const SH = p.color ?? "#F57F86", DK = shade(SH, 0.22);
  const amp = pose === "sway" ? 4.5 : 2;
  const sway = Math.sin(f * 0.04) * amp;

  let body: React.ReactNode;
  if (variant === "brain") {
    body = (
      <g>
        <path d="M -150 0 C -172 -40 -172 -150 -92 -200 C -40 -236 40 -236 92 -200 C 172 -150 172 -40 150 0 Z" fill={SH} />
        <path d="M -150 -14 C -120 -4 120 -4 150 -14 C 150 -6 150 -2 150 0 L -150 0 Z" fill={DK} />
        {[
          "M -120 -60 C -90 -80 -70 -40 -40 -60 S 10 -90 36 -60 S 90 -40 120 -70",
          "M -140 -110 C -110 -130 -90 -96 -60 -118 S -10 -140 20 -112 S 80 -96 110 -126",
          "M -100 -160 C -70 -178 -50 -146 -20 -164 S 30 -186 60 -156",
          "M -120 -30 C -96 -44 -74 -18 -50 -34 S -6 -44 14 -22",
          "M 30 -30 C 56 -46 80 -20 110 -36",
          "M -40 -200 C -10 -214 14 -190 40 -204",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={DK} strokeWidth={7} strokeLinecap="round" />
        ))}
        <path d="M -110 -170 Q -80 -206 -40 -214" fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.25} />
      </g>
    );
  } else if (variant === "fan") {
    const fanTop = [-140, -94, -48, 0, 48, 94, 140].map((xx, k) => [xx, -330 + 16 * (k % 2)] as [number, number]);
    body = (
      <g>
        <path d="M 0 -20 L 0 -150" stroke={DK} strokeWidth={16} strokeLinecap="round" />
        <path d="M 0 -140 C -120 -170 -170 -260 -150 -330 C -130 -360 -60 -360 0 -310 C 60 -360 130 -360 150 -330 C 170 -260 120 -170 0 -140 Z" fill={SH} />
        {fanTop.map(([tx, ty], k) => (
          <path key={k} d={`M 0 -140 L ${tx} ${ty}`} stroke={DK} strokeWidth={4} strokeLinecap="round" />
        ))}
        <path d="M -150 -250 Q 0 -226 150 -250" fill="none" stroke={DK} strokeWidth={4} strokeLinecap="round" />
        <path d="M -120 -300 Q 0 -276 120 -300" fill="none" stroke={DK} strokeWidth={4} strokeLinecap="round" />
        <path d="M -60 -200 Q 0 -186 60 -200" fill="none" stroke={DK} strokeWidth={4} strokeLinecap="round" />
      </g>
    );
  } else {
    body = (
      <g>
        {BRANCHES.map((b, i) => (
          <path key={`sh${i}`} d={pathOf(b.pts, 6)} fill="none" stroke={DK} strokeWidth={b.w} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {BRANCHES.map((b, i) => (
          <path key={`br${i}`} d={pathOf(b.pts)} fill="none" stroke={SH} strokeWidth={b.w} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {[[6, -60], [-8, -100], [-44, -150], [-74, -196], [40, -230], [84, -240]].map(([cx, cy], i) => (
          <circle key={`d${i}`} cx={cx} cy={cy} r={4} fill={DK} />
        ))}
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${sway} 0 0)`}>
        {body}
      </g>
    </g>
  );
}
