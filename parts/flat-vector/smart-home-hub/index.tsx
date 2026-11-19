import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Smart home hub: a small display on a stand showing four generic home-control tiles (light, thermostat, lock, fan).
// Only simple shapes, no brand marks. Origin = bottom centre (the base rests on y). anim "pulse": tiles glow in turn.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const TILES = [
  { x: -160, y: -380, fill: C.yellow },
  { x: 10, y: -380, fill: C.teal },
  { x: -160, y: -256, fill: C.purple },
  { x: 10, y: -256, fill: C.blue },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <path d="M -90 -140 L 90 -140 L 120 -24 L -120 -24 Z" fill={shade(body, 0.2)} />
        <rect x={-150} y={-24} width={300} height={24} rx={12} fill={C.greyDark} />
        <rect x={-190} y={-400} width={380} height={260} rx={30} fill={body} />
        <rect x={-176} y={-386} width={352} height={232} rx={20} fill={C.navy} />
        {TILES.map((t, i) => {
          const glow = anim === "pulse" ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60 + i * 1.6) : 0;
          return (
            <g key={i}>
              <rect x={t.x} y={t.y} width={150} height={110} rx={18} fill={t.fill} />
              <rect x={t.x} y={t.y} width={150} height={110} rx={18} fill={C.white} opacity={f1(0.35 * glow)} />
            </g>
          );
        })}
        {/* light: bulb */}
        <circle cx={-85} cy={-327} r={20} fill={C.white} />
        <rect x={-94} y={-302} width={18} height={8} rx={3} fill={C.white} />
        {/* thermostat: ring */}
        <circle cx={85} cy={-325} r={24} fill="none" stroke={C.white} strokeWidth={8} />
        <circle cx={85} cy={-325} r={6} fill={C.white} />
        {/* lock: body and shackle */}
        <rect x={-98} y={-214} width={26} height={22} rx={5} fill={C.white} />
        <path d="M -92 -214 L -92 -232 Q -85 -246 -78 -232 L -78 -214" fill="none" stroke={C.white} strokeWidth={6} />
        {/* fan: three blades */}
        {[0, 120, 240].map((a) => (
          <ellipse key={a} cx={85} cy={-201} rx={9} ry={22} fill={C.white} transform={`rotate(${a} 85 -201) translate(0 -12)`} />
        ))}
        <circle cx={0} cy={-80} r={10} fill={C.green} />
      </g>
    </g>
  );
}
