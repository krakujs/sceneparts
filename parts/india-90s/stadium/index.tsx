import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// floodlit stadium for the "today" twist
export const Stadium: React.FC<{ frame?: number }> = ({ frame = 0 }) => {
  const f = frame;
  return (
    <g>
      <rect width={1080} height={1920} fill="#0F1B33" />
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M -40 ${700 + k * 90} Q 540 ${640 + k * 90} 1120 ${700 + k * 90} L 1120 ${790 + k * 90} Q 540 ${730 + k * 90} -40 ${790 + k * 90} Z`} fill={k % 2 ? "#2A3A5E" : "#33466F"} stroke={INK} strokeWidth={4} />
      ))}
      {new Array(260).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * 1080, row = Math.floor(random(`cr${i}`) * 5);
        const y = 712 + row * 90 + random(`cy${i}`) * 60 - Math.sin((x / 1080) * Math.PI) * 55;
        const c = ["#FFC857", "#E88BA0", "#7FE3FF", "#FFFFFF", "#6FA36B", "#D9412B"][i % 6];
        const bob = Math.sin(f / 4 + i) * 3;
        return <circle key={i} cx={x} cy={y + bob} r={9} fill={c} opacity={0.9} />;
      })}
      {[150, 930].map((x, k) => (
        <g key={k}>
          <line x1={x} y1={700} x2={x} y2={260} stroke="#8A93A6" strokeWidth={16} />
          <rect x={x - 90} y={170} width={180} height={110} rx={10} fill="#FFF8D6" stroke={INK} strokeWidth={6} />
          {new Array(6).fill(0).map((_, j) => <circle key={j} cx={x - 60 + (j % 3) * 60} cy={200 + Math.floor(j / 3) * 50} r={18} fill="#FFFFFF" />)}
          <polygon points={`${x - 90},280 ${x + 90},280 ${x + (k ? -420 : 420)},1300 ${x + (k ? -620 : 120)},1300`} fill="#FFF6C8" opacity={0.08} />
        </g>
      ))}
      <path d="M -60 1180 Q 540 1080 1140 1180 L 1140 1920 L -60 1920 Z" fill="#3E8F4E" stroke={INK} strokeWidth={6} />
      {new Array(6).fill(0).map((_, k) => <path key={k} d={`M -60 ${1260 + k * 110} Q 540 ${1170 + k * 110} 1140 ${1260 + k * 110}`} stroke="#4FA35E" strokeWidth={40} fill="none" opacity={0.5} />)}
      <polygon points="470,1200 610,1200 660,1700 420,1700" fill="#D8C59A" stroke={INK} strokeWidth={5} />
      {new Array(5).fill(0).map((_, k) => {
        const on = random(`fl${k}-${Math.floor(f / 7)}`) > 0.6;
        return on ? <circle key={k} cx={100 + random(`fx${k}-${Math.floor(f / 7)}`) * 880} cy={720 + random(`fy${k}-${Math.floor(f / 7)}`) * 400} r={16} fill="#FFFFFF" opacity={0.9} /> : null;
      })}
    </g>
  );
};

// ---------- post: postcard, pillar letterbox, pen (generic – no real emblem/design) ----------
// Postcard centred at (x, y). `writ` 0..1 fills handwriting on the left half, `stamp` = text in the printed stamp box.

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Stadium {...(rest as any)} frame={f} />;
}
