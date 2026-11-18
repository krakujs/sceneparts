import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall lightbox showing a chest x-ray: white ribs and spine on dark blue. Wall item, centred on (x, y).
// anim "on": the light warms up from dim and flickers, then steadies with the odd blink.
const f1 = (v: number) => v.toFixed(1);

const ribs = [0, 1, 2, 3, 4, 5];
const Rib = ({ y0 }: { y0: number }) => (
  <path d={`M -14 ${y0} C -90 ${y0 - 46} -170 ${y0 - 22} -200 ${y0 + 30}`} stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" />
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const frame = p.color && p.color !== "none" ? p.color : "#DDE2EA";
  const glass = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  const warm = anim === "on" ? Math.min(1, f / 40) : 1;
  const dip = anim === "on" && warm >= 1 && f % 37 < 3 ? 0.3 : 0;
  const level = anim === "on" ? Math.max(0.2, Math.min(1, 0.25 + 0.75 * warm - dip)) : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      {/* light box frame and back */}
      <rect x={-290} y={-360} width={580} height={728} rx={36} fill={shade(frame, 0.12)} />
      <rect x={-290} y={-368} width={580} height={728} rx={36} fill={frame} />
      <rect x={-252} y={-330} width={504} height={648} rx={18} fill={glass} />
      {/* the picture: fades with the light */}
      <g opacity={level.toFixed(3)}>
        {/* soft shape of the chest */}
        <ellipse cx={0} cy={0} rx={206} ry={262} fill={C.blue} opacity={0.22} />
        {/* heart shadow, lighter and to the left */}
        <ellipse cx={-54} cy={60} rx={88} ry={104} fill={C.skyDeep} opacity={0.22} />
        {/* spine */}
        {Array.from({ length: 12 }, (_, k) => (
          <rect key={k} x={-14} y={-250 + k * 36} width={28} height={24} rx={8} fill={C.white} />
        ))}
        {/* ribs, mirrored */}
        {ribs.map((i) => (
          <g key={i}>
            <Rib y0={-190 + i * 62} />
            <g transform="scale(-1 1)"><Rib y0={-190 + i * 62} /></g>
          </g>
        ))}
        {/* collarbones */}
        <path d="M -20 -228 Q -110 -262 -200 -200" stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" />
        <path d="M 20 -228 Q 110 -262 200 -200" stroke={C.white} strokeWidth={16} strokeLinecap="round" fill="none" />
      </g>
      {/* light glow on the glass */}
      <rect x={-252} y={-330} width={504} height={648} rx={18} fill={C.white} opacity={0.05 * level} />
    </g>
  );
}
