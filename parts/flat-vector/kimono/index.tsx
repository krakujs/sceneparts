import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// T-shaped kimono robe on a wooden hanger: wide sleeves, a crossed collar (left over right), a wide
// obi sash with a knot, and a floral pattern. Origin = bottom centre (the hem rests on y).
// About 660 px wide and 740 px tall at s = 1 including the hanger.
const f1 = (v: number) => v.toFixed(1);
const mix = (hex: string, k: number) => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.round(v + (255 - v) * k).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
};

const Hanger = () => (
  <g fill="none" stroke={C.brown} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d="M 0 -654 L 0 -680 Q 0 -712 20 -708 Q 34 -702 26 -688" />
    <path d="M -198 -594 L 0 -654 L 198 -594" />
  </g>
);

const Flower = ({ x, y, r, c, centre }: { x: number; y: number; r: number; c: string; centre: string }) => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      return <circle key={i} cx={f1(x + Math.cos(a) * r * 0.6)} cy={f1(y + Math.sin(a) * r * 0.6)} r={f1(r * 0.45)} fill={c} />;
    })}
    <circle cx={x} cy={y} r={r * 0.3} fill={centre} />
  </g>
);

const FLOWERS: [number, number, number][] = [
  [-96, -520, 22], [-30, -470, 18], [56, -530, 22], [104, -430, 18], [-100, -370, 20], [-44, -250, 22],
  [60, -196, 18], [-96, -120, 22], [-30, -60, 18], [84, -100, 20], [-236, -520, 22], [-270, -420, 20],
  [-236, -300, 20], [-250, -150, 18], [236, -520, 22], [270, -420, 20], [240, -300, 20], [250, -150, 18],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const main = p.color && p.color !== "none" ? p.color : C.navy;
  const trim = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const swing = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const pop = anim === "pop" ? 1 + 0.06 * Math.sin(Math.PI * Math.min(1, f / 20)) : 1;
  const petal = mix(main, 0.55);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`rotate(${f1(swing)} 0 -700)`}>
        <Hanger />
        <g transform={`scale(${f1(pop)})`}>
          {/* wide sleeves hanging from the shoulders, and the body */}
          <path d="M -116 -586 L -300 -566 Q -328 -560 -328 -530 L -328 -100 L -236 -98 L -154 -420 Z" fill={main} />
          <path d="M 116 -586 L 300 -566 Q 328 -560 328 -530 L 328 -100 L 236 -98 L 154 -420 Z" fill={main} />
          <path d="M -116 -586 L 116 -586 L 152 -420 L 152 0 L -152 0 L -152 -420 Z" fill={main} />
          {/* floral pattern */}
          {FLOWERS.map(([fx, fy, r], i) => (
            <Flower key={i} x={fx} y={fy} r={r} c={petal} centre={C.white} />
          ))}
          {/* crossed collar: lining, then the right-hand panel laid over the left */}
          <path d="M -76 -588 L 0 -414 L 76 -588 Z" fill={C.white} />
          <path d="M 76 -588 L 0 -414 L -26 -452 L 40 -588 Z" fill={main} stroke={shade(main, 0.3)} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -76 -588 L 0 -414" stroke={shade(main, 0.3)} strokeWidth={5} fill="none" />
          {/* obi sash and knot */}
          <rect x={-152} y={-320} width={304} height={84} rx={4} fill={trim} />
          <path d="M -152 -306 L 152 -306 M -152 -250 L 152 -250" stroke={shade(trim, 0.2)} strokeWidth={4} />
          <rect x={-48} y={-330} width={96} height={110} rx={14} fill={shade(trim, 0.18)} />
          <path d="M -30 -310 L 30 -310" stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
        </g>
      </g>
    </g>
  );
}
