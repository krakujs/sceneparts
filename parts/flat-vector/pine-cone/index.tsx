/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pine cone: brown oval cone with rows of overlapping scales. Origin = bottom tip of the cone.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const brown = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const pop = anim === "pop" ? easeOutBack(f / 20) : 1;
  const rows: React.ReactNode[] = [];
  // scale rows from the bottom tip up; each scale is a rounded lobe with a darker crease
  for (let r = 0; r < 6; r++) {
    const yy = -40 - r * 42;
    const half = 60 + Math.sin(((r + 1) / 7) * Math.PI) * 40;
    const n = 4 + (r % 2 ? 0 : 1);
    for (let i = 0; i < n; i++) {
      const cx = -half + ((i + 0.5) * 2 * half) / n + (r % 2 ? 0 : 0);
      const c = r % 2 ? shade(brown, 0.12) : brown;
      rows.push(<path key={`${r}-${i}`} d={`M ${f1(cx - 42)} ${f1(yy)} Q ${f1(cx)} ${f1(yy + 46)} ${f1(cx + 42)} ${f1(yy)} Q ${f1(cx)} ${f1(yy - 18)} ${f1(cx - 42)} ${f1(yy)} Z`} fill={c} />);
      rows.push(<path key={`c${r}-${i}`} d={`M ${f1(cx)} ${f1(yy + 4)} L ${f1(cx)} ${f1(yy + 26)}`} stroke={shade(brown, 0.35)} strokeWidth={4} strokeLinecap="round" />);
    }
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={80} ry={8} fill={C.shadow} />
      <g transform={`scale(${f1(pop)})`}>
        <path d="M 0 0 C -90 -60 -100 -200 -70 -290 Q 0 -400 70 -290 C 100 -200 90 -60 0 0 Z" fill={shade(brown, 0.15)} />
        <path d="M 10 0 C -60 -60 -70 -190 -50 -270 Q 0 -360 50 -270 C 70 -190 60 -60 10 0 Z" fill={brown} />
        {rows}
      </g>
    </g>
  );
}
