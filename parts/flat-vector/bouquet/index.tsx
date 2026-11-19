import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hand bouquet: stems meet at a wrap point at the origin; leaves, a rose, a tulip, two daisies, kraft paper and a ribbon.
const f1 = (v: number) => v.toFixed(1);

const Rose = ({ x, y, r, c }: { x: number; y: number; r: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    <circle cx={0} cy={0} r={r} fill={c} />
    <path d={`M ${f1(-r * 0.6)} ${f1(-r * 0.1)} Q ${f1(-r * 0.6)} ${f1(-r * 0.7)} 0 ${f1(-r * 0.55)} Q ${f1(r * 0.6)} ${f1(-r * 0.6)} ${f1(r * 0.55)} ${f1(r * 0.05)} Q ${f1(r * 0.3)} ${f1(r * 0.55)} ${f1(-r * 0.2)} ${f1(r * 0.45)}`} fill="none" stroke={shade(c, 0.3)} strokeWidth={r * 0.14} strokeLinecap="round" />
    <circle cx={0} cy={0} r={r * 0.28} fill={shade(c, 0.22)} />
  </g>
);
const Daisy = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={0} cy={-r * 0.6} rx={r * 0.26} ry={r * 0.5} transform={`rotate(${i * 40})`} fill={C.white} stroke={C.greyLight} strokeWidth={2} />
    ))}
    <circle cx={0} cy={0} r={r * 0.3} fill={C.yellow} />
  </g>
);
const Tulip = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <g transform={`translate(${f1(x)} ${f1(y)})`}>
    <path d="M -44 0 L -48 -58 Q -46 -92 -20 -96 L 0 -74 L 20 -96 Q 46 -92 48 -58 L 44 0 Q 0 14 -44 0 Z" fill={c} />
    <path d="M -14 -6 L -16 -66 L 0 -74 L 16 -66 L 14 -6 Q 0 2 -14 -6 Z" fill={shade(c, 0.18)} opacity={0.7} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1500;
  const rose = p.color && p.color !== "none" ? p.color : C.pink;
  const tulip = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const anim: string = p.anim ?? "none";
  const tilt = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 100) * 3 : 0;
  const heads = [
    { x: -170, y: -390 }, { x: 170, y: -400 }, { x: -18, y: -560 }, { x: 42, y: -320 },
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s}) rotate(${f1(tilt)})`}>
      <ellipse cx={0} cy={0} rx={150} ry={20} fill={C.shadow} />
      {/* stems and leaves */}
      {heads.map((h, i) => (
        <path key={i} d={`M 0 -20 Q ${f1(h.x * 0.2)} ${f1(h.y * 0.5)} ${f1(h.x)} ${f1(h.y + 30)}`} fill="none" stroke={C.greenDark} strokeWidth={10} strokeLinecap="round" />
      ))}
      <ellipse cx={-110} cy={-240} rx={70} ry={26} transform="rotate(-35 -110 -240)" fill={C.green} />
      <ellipse cx={120} cy={-260} rx={70} ry={26} transform="rotate(32 120 -260)" fill={C.green} />
      <ellipse cx={-60} cy={-430} rx={52} ry={20} transform="rotate(-55 -60 -430)" fill={shade(C.green, 0.12)} />
      <ellipse cx={80} cy={-450} rx={50} ry={20} transform="rotate(50 80 -450)" fill={shade(C.green, 0.12)} />
      {/* flower heads */}
      <Tulip x={-18} y={-560} c={tulip} />
      <Rose x={-170} y={-390} r={74} c={rose} />
      <Daisy x={170} y={-400} r={66} />
      <Rose x={42} y={-320} r={50} c={shade(rose, 0.08)} />
      {/* kraft paper wrap */}
      <path d="M -40 0 Q -160 -140 -150 -210 L 150 -210 Q 160 -140 40 0 Z" fill={C.sand} />
      <path d="M -40 0 Q -100 -90 -110 -210 L -60 -210 Q -60 -90 -10 0 Z" fill={shade(C.sand, 0.1)} opacity={0.6} />
      {/* ribbon: two tails and a bow at the wrap point */}
      <path d="M 0 -10 Q -30 60 -70 110" fill="none" stroke={C.purple} strokeWidth={14} strokeLinecap="round" />
      <path d="M 0 -10 Q 30 60 70 110" fill="none" stroke={C.purple} strokeWidth={14} strokeLinecap="round" />
      <ellipse cx={-34} cy={-8} rx={34} ry={20} transform="rotate(-20 -34 -8)" fill={C.purple} />
      <ellipse cx={34} cy={-8} rx={34} ry={20} transform="rotate(20 34 -8)" fill={C.purple} />
      <circle cx={0} cy={-8} r={12} fill={C.purpleDark} />
    </g>
  );
}
