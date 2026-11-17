import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";

// Flat vector rough grey oyster on the ground. Origin = bottom centre (y). About 200 px wide at s = 1.
// Faces right, honours flip, s and vx. The top shell is a lid hinged at the back.
// pose idle: slowly opens and closes from p.f. open: wide open. closed: shut.
// pearl = true shows a white pearl in the bowl whenever the shell is open.

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, pose = p.pose ?? "idle";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = p.y ?? 1560;
  const pearl = p.pearl ?? true;
  const SH = p.color ?? "#9EA5AF", DK = shade(SH, 0.25), IN = "#CFE3E8", PEARL_DK = "#D9D2E4";
  const open = pose === "closed" ? 0 : pose === "open" ? 30 : 14 + 14 * Math.sin(f * 0.03);
  const showPearl = pearl && open > 6;

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <path d="M -100 -52 Q 0 -36 100 -52 C 104 -26 70 0 0 0 C -70 0 -104 -26 -100 -52 Z" fill={SH} />
      <ellipse cx={0} cy={-50} rx={90} ry={14} fill={IN} />
      {showPearl && (
        <g>
          <circle cx={3} cy={-38} r={18} fill={PEARL_DK} />
          <circle cx={0} cy={-40} r={18} fill="#FFFFFF" />
          <circle cx={-5} cy={-46} r={4} fill="#FFFFFF" opacity={0.9} />
        </g>
      )}
      {[[-80, -24, -56, -8, -30, -6], [-60, -38, -40, -22, -16, -18], [30, -10, 52, -24, 74, -20], [56, -40, 74, -28, 90, -36]].map((d, i) => (
        <path key={i} d={`M ${d[0]} ${d[1]} Q ${d[2]} ${d[3]} ${d[4]} ${d[5]}`} fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
      ))}
      {[[-70, -44], [-40, -40], [0, -38], [40, -40], [70, -44]].map(([cx, cy], i) => (
        <circle key={`r${i}`} cx={cx} cy={cy} r={3} fill={DK} />
      ))}
      <g transform={`rotate(${-open} -96 -52)`}>
        <path d="M -100 -52 C -102 -116 98 -116 100 -52 Q 0 -36 -100 -52 Z" fill={SH} />
        <path d="M -70 -70 Q -40 -96 -10 -104" fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
        <path d="M -40 -50 Q -20 -80 20 -92" fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
        <path d="M 30 -50 Q 50 -78 84 -84" fill="none" stroke={DK} strokeWidth={5} strokeLinecap="round" />
        <path d="M -100 -52 Q 0 -36 100 -52" fill="none" stroke={DK} strokeWidth={4} opacity={0.6} />
      </g>
    </g>
  );
}
