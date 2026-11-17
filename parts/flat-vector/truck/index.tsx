import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Lorry, side view, facing right: a cab with a sloped windscreen at the front and a tall box trailer behind it,
// joined by a chassis. Three axles of wheels. Room scale: about 960 px wide and 520 px tall at s = 1.
// Origin = floor centre; the tyres stand on y.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const wheel = (cx: number, cy: number, r: number, rim: string, spin: number) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.ink} />
    <circle cx={cx} cy={cy} r={r * 0.58} fill={rim} />
    <g transform={`rotate(${f1(spin)} ${cx} ${cy})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={cx - r * 0.07} y={cy - r * 0.52} width={r * 0.14} height={r * 0.52} rx={4}
          fill={shade(rim, 0.25)} transform={`rotate(${k * 72} ${cx} ${cy})`} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.16} fill={shade(rim, 0.35)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const cab = p.color && p.color !== "none" ? p.color : C.red;
  const box = p.color2 && p.color2 !== "none" ? p.color2 : C.greyLight;
  const anim: string = p.anim ?? "none";
  const driving = anim === "drive" || (p.vx ?? 0) !== 0;
  const spin = driving ? f * 9 : 0;
  const bounce = driving ? Math.abs(Math.sin((f * 2 * Math.PI) / 16)) * -3 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={460} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={`translate(0 ${f1(bounce)})`}>
          {/* wheel arches */}
          <circle cx={-300} cy={-80} r={92} fill={C.ink} opacity={0.85} />
          <circle cx={300} cy={-80} r={92} fill={C.ink} opacity={0.85} />
          {/* chassis */}
          <rect x={-420} y={-150} width={800} height={36} rx={10} fill={C.greyDark} />
          {/* box trailer */}
          <rect x={-460} y={-500} width={470} height={350} rx={20} fill={box} />
          <rect x={-460} y={-500} width={470} height={24} rx={12} fill={shade(box, 0.12)} />
          <rect x={-460} y={-170} width={470} height={24} rx={6} fill={shade(box, 0.22)} />
          <rect x={-440} y={-430} width={12} height={260} rx={4} fill={shade(box, 0.2)} />
          {/* cab */}
          <path d="M 20 -330 L 20 -470 Q 20 -500 50 -500 L 170 -500 Q 210 -500 240 -440 L 330 -250 L 380 -250 L 380 -150 L 20 -150 Z" fill={cab} />
          <path d="M 80 -450 L 160 -450 Q 190 -450 215 -400 L 260 -320 L 80 -320 Z" fill={C.sky} />
          <rect x={20} y={-270} width={360} height={30} rx={10} fill={shade(cab, 0.2)} />
          {/* lights and bumper */}
          <rect x={370} y={-210} width={24} height={30} rx={8} fill={C.yellow} />
          <rect x={-470} y={-230} width={20} height={34} rx={6} fill={C.red} />
          <rect x={350} y={-132} width={50} height={22} rx={8} fill={C.greyDark} />
        </g>
        {wheel(-330, -80, 80, C.greyLight, spin)}
        {wheel(-200, -80, 80, C.greyLight, spin)}
        {wheel(260, -80, 80, C.greyLight, spin)}
      </g>
    </g>
  );
}
