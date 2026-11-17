import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

export const CRT: React.FC<{ x: number; y: number; w?: number; screen: Screen; seed?: string ; frame?: number }> = ({ frame = 0, x, y, w = 560, screen, seed = "tv" }) => {
  const f = frame;
  const h = w * 0.78;
  const sx = 30, sy = 30, sw = w * 0.7, sh = h - 60;
  const id = `scr-${seed}`;
  const cols = 22, rows = 16;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <line x1={w * 0.2} y1={h} x2={w * 0.12} y2={h + 70} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <line x1={w * 0.8} y1={h} x2={w * 0.88} y2={h + 70} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <rect x={0} y={0} width={w} height={h} rx={44} fill={P.woodDark} stroke={INK} strokeWidth={SW + 3} />
      <rect x={10} y={10} width={w - 20} height={h - 20} rx={36} fill={P.wood} />
      <rect x={sx - 10} y={sy - 10} width={sw + 20} height={sh + 20} rx={52} fill={INK} />
      <defs>
        <clipPath id={id}><rect x={sx} y={sy} width={sw} height={sh} rx={44} /></clipPath>
        <radialGradient id={`${id}-g`} cx="50%" cy="45%" r="70%"><stop offset="0" stopColor="#FFF4D6" /><stop offset="1" stopColor="#E9A94E" /></radialGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        {screen === "snow" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill="#777" />
            {new Array(cols * rows).fill(0).map((_, i) => {
              const v = Math.floor(random(`${seed}${i}-${f}`) * 255);
              return <rect key={i} x={sx + (i % cols) * (sw / cols)} y={sy + Math.floor(i / cols) * (sh / rows)} width={sw / cols + 1} height={sh / rows + 1} fill={`rgb(${v},${v},${v})`} />;
            })}
            <rect x={sx} y={sy + ((f * 9) % sh) - 30} width={sw} height={30} fill="#FFFFFF" opacity={0.25} />
          </>
        ) : null}
        {screen === "clear" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill={`url(#${id}-g)`} />
            <circle cx={sx + sw * 0.7} cy={sy + sh * 0.35} r={sh * 0.14} fill="#FFFFFF" opacity={0.9} />
            <path d={`M ${sx} ${sy + sh * 0.75} Q ${sx + sw * 0.3} ${sy + sh * 0.5} ${sx + sw * 0.6} ${sy + sh * 0.72} T ${sx + sw} ${sy + sh * 0.68} L ${sx + sw} ${sy + sh} L ${sx} ${sy + sh} Z`} fill={P.green} />
          </>
        ) : null}
        {screen === "bars" ? ["#FFFFFF", "#FFE14D", "#4DE1E1", "#4DE14D", "#E14DE1", "#E14D4D", "#4D4DE1"].map((c, i) => (
          <rect key={i} x={sx + (i * sw) / 7} y={sy} width={sw / 7 + 1} height={sh} fill={c} />
        )) : null}
        {screen === "khed" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill="#1F3A93" />
            <text x={sx + sw / 2} y={sy + sh * 0.44} textAnchor="middle" fontFamily={typeFont} fontSize={w * 0.075} fill="#FFFFFF">RUKAWAT KE LIYE</text>
            <text x={sx + sw / 2} y={sy + sh * 0.62} textAnchor="middle" fontFamily={typeFont} fontSize={w * 0.075} fill="#FFFFFF">KHED HAI</text>
          </>
        ) : null}
        {screen === "off" ? <rect x={sx} y={sy} width={sw} height={sh} fill="#2A2E2B" /> : null}
        <rect x={sx} y={sy} width={sw} height={sh} fill="#FFFFFF" opacity={0.06} />
        {new Array(Math.ceil(sh / 8)).fill(0).map((_, k) => <rect key={k} x={sx} y={sy + k * 8} width={sw} height={2} fill="#000" opacity={0.08} />)}
      </g>
      <path d={`M ${sx + 24} ${sy + 40} q 40 -20 110 -18`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.45} />
      {[0, 1].map((k) => (
        <g key={k}>
          <circle cx={sx + sw + (w - sx - sw) / 2 + 2} cy={sy + 60 + k * 100} r={w * 0.055} fill={INK} />
          <circle cx={sx + sw + (w - sx - sw) / 2 + 2} cy={sy + 60 + k * 100} r={w * 0.035} fill={P.mustard} />
        </g>
      ))}
      {[0, 1, 2, 3].map((k) => <rect key={k} x={sx + sw + 30} y={sy + 250 + k * 26} width={w - sx - sw - 60} height={10} rx={5} fill={INK} />)}
    </g>
  );
};

// ---------- roof antenna (Yagi) – `angle` turns it, `tilt` knocks it crooked ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <CRT {...(rest as any)} frame={f} />;
}
