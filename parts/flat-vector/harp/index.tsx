import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Concert harp: a wide base, a soundboard on the left, a curved neck arching over to a column on the right,
// and strings fanned between the soundboard and the neck. Origin = bottom centre (base on y).
// anim "pluck": the strings take turns to vibrate.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  return "";
};
const N = 18;
// string endpoints: soundboard point S(t) and neck point N(t), t in 0..1
const S = (t: number): [number, number] => [-120, -120 - t * 480];
const NK = (t: number): [number, number] => [-100 + 310 * t, -640 - 240 * t];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.brown;
  const anim: string = p.anim ?? "none";
  const plucked = anim === "pluck" ? Math.floor(f / 8) % N : -1;
  const phase = (f % 8) / 8;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={280} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* base */}
        <rect x={-250} y={-44} width={500} height={44} rx={18} fill={shade(wood, 0.3)} />
        {/* soundboard, a curved wedge on the left */}
        <path d="M -200 -50 Q -240 -360 -150 -660 L -80 -650 Q -150 -360 -110 -50 Z" fill={wood} />
        <path d="M -182 -70 Q -210 -360 -134 -640" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.2} />
        {/* soundhole */}
        <ellipse cx={-160} cy={-260} rx={16} ry={28} fill={shade(wood, 0.5)} />
        {/* strings from soundboard to neck; the plucked one bends */}
        {Array.from({ length: N }, (_, i) => {
          const t = (i + 0.5) / N;
          const [sx, sy] = S(t), [nx, ny] = NK(t);
          const mx = (sx + nx) / 2, my = (sy + ny) / 2;
          const bend = i === plucked ? 10 * Math.sin(phase * Math.PI * 3) * (1 - phase) : 0;
          return (
            <path key={i} d={`M ${f1(sx)} ${f1(sy)} Q ${f1(mx + bend)} ${f1(my)} ${f1(nx)} ${f1(ny)}`} fill="none" stroke={C.inkSoft} strokeWidth={2.4} opacity={0.75} />
          );
        })}
        {/* neck: a curved arm from the soundboard top to the column */}
        <path d="M -110 -650 Q 60 -720 232 -900" fill="none" stroke={shade(wood, 0.15)} strokeWidth={44} strokeLinecap="round" />
        {/* column on the right */}
        <path d="M 236 -40 Q 270 -460 236 -900" fill="none" stroke={wood} strokeWidth={54} strokeLinecap="round" />
        <path d="M 252 -80 Q 280 -460 252 -860" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" opacity={0.2} />
        {/* top scroll */}
        <circle cx={236} cy={-920} r={34} fill={shade(wood, 0.15)} />
        <circle cx={236} cy={-920} r={14} fill={shade(wood, 0.4)} />
        {/* tuning pins on the neck */}
        {[0.2, 0.5, 0.8].map((t, i) => (
          <circle key={i} cx={NK(t)[0] + 6} cy={NK(t)[1] + 22} r={6} fill={C.yellowDark} />
        ))}
      </g>
    </g>
  );
}
