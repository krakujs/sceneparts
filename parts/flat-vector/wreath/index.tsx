import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round evergreen wreath with red berries and a red bow at the bottom, hung from a cord.
// Origin = the top hook point (the wreath hangs from y). About 540 px wide and 690 px tall at s = 1.
// anim "sway": the wreath turns gently on its hook.
const f1 = (v: number) => v.toFixed(1);
const RC = 300, R_OUT = 265, R_IN = 215;
const leaf = "M 0 0 Q 22 -16 0 -46 Q -22 -16 0 0 Z";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 240;
  const leafA = p.color && p.color !== "none" ? p.color : C.green;
  const berry = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 100) * 3 : 0;
  const leaves: React.ReactNode[] = [];
  for (let i = 0; i < 40; i++) {
    const th = (i * 9 * Math.PI) / 180;
    for (const [r, col, tilt] of [[R_OUT, leafA, 40], [R_IN, shade(leafA, 0.22), -40]] as [number, string, number][]) {
      const px = Math.sin(th) * r, py = RC - Math.cos(th) * r;
      const rot = (i * 9) + 180 + (i % 2 ? tilt : -tilt);
      leaves.push(<path key={`${r}-${i}`} d={leaf} fill={col} transform={`translate(${f1(px)} ${f1(py)}) rotate(${rot})`} />);
    }
  }
  const berries = Array.from({ length: 9 }, (_, k) => {
    const th = ((20 + k * 40) * Math.PI) / 180;
    return { x: Math.sin(th) * 240, y: RC - Math.cos(th) * 240 };
  });
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <line x1={0} y1={0} x2={0} y2={40} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
      <g transform={`rotate(${f1(sway)})`}>
        {leaves}
        {berries.map((b, k) => (
          <g key={k}>
            <circle cx={f1(b.x)} cy={f1(b.y)} r={11} fill={berry} />
            <circle cx={f1(b.x - 3)} cy={f1(b.y - 3)} r={3} fill={C.white} opacity={0.7} />
          </g>
        ))}
        {/* bow at the bottom */}
        <path d="M -12 580 L -46 700 L -26 700 L 0 610 Z" fill={shade(berry, 0.25)} />
        <path d="M 12 580 L 46 700 L 26 700 L 0 610 Z" fill={shade(berry, 0.25)} />
        <ellipse cx={-56} cy={572} rx={56} ry={30} transform="rotate(-24 -56 572)" fill={berry} />
        <ellipse cx={56} cy={572} rx={56} ry={30} transform="rotate(24 56 572)" fill={berry} />
        <ellipse cx={-56} cy={572} rx={28} ry={14} transform="rotate(-24 -56 572)" fill={shade(berry, 0.15)} />
        <ellipse cx={56} cy={572} rx={28} ry={14} transform="rotate(24 56 572)" fill={shade(berry, 0.15)} />
        <circle cx={0} cy={580} r={18} fill={shade(berry, 0.2)} />
      </g>
    </g>
  );
}
