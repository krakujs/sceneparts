/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector corn cob: a standing ear with a yellow kernel grid, green husk leaves peeled back and silk on top.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

const H = 430, RW = 100;
/** Half width of the cob at height fraction u (0 = bottom, 1 = tip). */
const hw = (u: number) => RW * Math.sqrt(Math.max(0, 1 - (2 * u - 1) ** 2)) * (0.9 + 0.1 * (1 - u));

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const husk = C.green, huskD = C.greenDark;

  const N = 40;
  const L: [number, number][] = [], R: [number, number][] = [];
  for (let i = 0; i <= N; i++) { const u = i / N, yy = -u * H; L.push([-hw(u), yy]); R.push([hw(u), yy]); }
  const cobD = "M " + [...R, ...L.slice().reverse()].map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";
  const cobShade = "M " + [...R.map(([a, b]) => [0, b] as [number, number]), ...R.slice().reverse()].map(([a, b]) => `${f1(a)} ${f1(b)}`).join(" L ") + " Z";

  // kernel grid: staggered rows, rounded rectangles inside the outline
  const kernels: React.ReactNode[] = [];
  for (let row = 0; row < 14; row++) {
    const cy = -22 - row * 30;
    const u = -cy / H;
    for (let col = -4; col <= 4; col++) {
      const cx = col * 28 + (row % 2) * 14;
      if (Math.abs(cx) + 14 > hw(u) * 0.92) continue;
      const k = (row * 7 + col * 3 + 40) % 3;
      kernels.push(<rect key={`${row}-${col}`} x={cx - 12} y={cy - 13} width={25} height={27} rx={9} fill={k === 0 ? "#FFE06A" : C.yellow} />);
    }
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {/* back husks, peeled out to both sides */}
        <path d="M -8 -8 C -150 -40 -205 -170 -160 -330 C -115 -215 -70 -110 -8 -8 Z" fill={huskD} />
        <path d="M 8 -8 C 150 -40 205 -170 160 -330 C 115 -215 70 -110 8 -8 Z" fill={huskD} />
        <path d="M -20 -22 C -90 -80 -120 -170 -150 -260" stroke={husk} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.55} />
        <path d="M 20 -22 C 90 -80 120 -170 150 -260" stroke={husk} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.55} />
        {/* cob */}
        <path d="M 0 -4 L 0 -8" stroke={C.brownDark} strokeWidth={8} strokeLinecap="round" />
        <path d={cobD} fill={C.yellowDark} />
        {kernels}
        <path d={cobShade} fill={shade(C.yellowDark, 0.1)} opacity={0.4} />
        <ellipse cx={-48} cy={-240} rx={11} ry={62} fill="#FFFFFF" opacity={0.4} transform="rotate(8 -48 -240)" />
        {/* front husk, half covering the left of the base */}
        <path d="M -6 -8 C -70 -60 -110 -120 -96 -200 C -70 -140 -40 -70 -6 -8 Z" fill={husk} />
        <path d="M -8 -12 Q -50 -90 -92 -190" stroke={huskD} strokeWidth={4} strokeLinecap="round" fill="none" />
        {/* silk */}
        <path d="M 0 -424 C -12 -450 -28 -468 -22 -486" stroke="#C98B3A" strokeWidth={4} strokeLinecap="round" fill="none" />
        <path d="M 4 -426 C 6 -456 16 -470 30 -478" stroke="#C98B3A" strokeWidth={4} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
