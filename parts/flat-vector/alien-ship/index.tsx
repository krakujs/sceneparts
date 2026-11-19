import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Alien ship: an organic mothership seen from the side, facing right. A long pod-shaped hull with soft ribs,
// a glowing bridge bulb, glowing pods underneath and dangling tendrils. Origin = centre of the hull; about 900 px wide at s = 1.
// anim "hover": the hull floats up and down, the pods pulse and the tendrils wave.
/* eslint-disable @typescript-eslint/no-explicit-any */
const f1 = (v: number) => v.toFixed(1);
const PODS = [-250, 0, 250];
const TENDRILS = [-330, -190, -60, 80, 210, 330];
const PORTHOLES = [-360, -220, -80, 60, 200, 340];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const body = p.color && p.color !== "none" ? p.color : "#2FA58A";
  const glow = p.glow && p.glow !== "none" ? p.glow : C.lime;
  const hover = p.anim === "hover";
  const dy = hover ? -(Math.sin((f * 2 * Math.PI) / 90) + 1) * 14 : 0;
  const pulse = 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 50);
  const wave = (i: number, k: number) => (hover ? Math.sin((f * 2 * Math.PI) / 70 + i * 1.3) * k : 0);
  const dark = shade(body, 0.25);
  return (
    <g transform={`translate(${f1(x)} ${f1(y + dy)}) scale(${p.flip ? -s : s} ${s})`}>
      {/* tendrils hang from the underside */}
      {TENDRILS.map((tx, i) => (
        <path key={i} d={`M ${tx} 60 Q ${tx + 30 + wave(i, 26)} 150 ${tx + wave(i, 60)} ${230 + wave(i, 10)}`} stroke={dark} strokeWidth={16} fill="none" strokeLinecap="round" />
      ))}
      {TENDRILS.map((tx, i) => (
        <circle key={`t${i}`} cx={tx + wave(i, 60)} cy={230 + wave(i, 10)} r={10} fill={glow} />
      ))}
      {/* hull: long pod with a darker underside */}
      <path d="M -450 0 C -440 -120 -250 -170 0 -165 C 250 -170 440 -120 450 0 C 440 60 260 70 0 70 C -260 70 -440 60 -450 0 Z" fill={body} />
      <path d="M -450 0 C -300 30 300 30 450 0 C 440 60 260 70 0 70 C -260 70 -440 60 -450 0 Z" fill={dark} />
      {[-300, -150, 0, 150, 300].map((rx) => (
        <path key={rx} d={`M ${rx} -150 Q ${rx + 22} -50 ${rx} 60`} stroke={dark} strokeWidth={8} fill="none" opacity={0.45} />
      ))}
      {/* glowing bridge bulb on the back */}
      <path d="M 60 -160 Q 150 -250 250 -168 Z" fill={body} />
      <path d="M 90 -166 Q 150 -224 218 -170 Z" fill={C.skyDeep} opacity={0.9} />
      <path d="M 105 -186 Q 128 -202 150 -198" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
      {PORTHOLES.map((px, i) => (
        <circle key={i} cx={px} cy={-30} r={14} fill="#CFF5E8" opacity={0.75} />
      ))}
      {/* glowing pods under the hull */}
      {PODS.map((px, i) => (
        <g key={`p${i}`}>
          <circle cx={px} cy={60} r={72} fill={glow} opacity={0.15 + 0.15 * pulse} />
          <ellipse cx={px} cy={56} rx={46} ry={32} fill={dark} />
          <ellipse cx={px} cy={50} rx={34} ry={20} fill={glow} opacity={0.6 + 0.4 * pulse} />
        </g>
      ))}
    </g>
  );
}
