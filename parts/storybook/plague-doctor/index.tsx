import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";
import { C, bodyFont, typeFont } from "../style/index";

// Plague doctor in a beaked mask, wide hat and long gown; walks, carries a stick or bucket, optional smoke.
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const GOWN = "#24202A";
const GOWN_HI = "#3A3542";
const MASK = "#EDE3CC";
const MASK_D = "#CFC2A4";
const GLOVE = "#5A3F2C";
const LENS = "#9CC9CF";
const COBBLE = "#A29683";
const COBBLE_D = "#8A7F6D";
const LAVENDER = "#8E6BC4";
const MINT = "#4E9E5A";

export const Doctor: React.FC<{ x: number; y: number; s?: number; f: number; walk?: boolean; stick?: number; prop?: "stick" | "bucket" | "none"; facing?: 1 | -1; cape?: string; smoke?: boolean }> = ({ x, y, s = 1, f, walk = false, stick = 0.3, prop = "stick", facing = 1, cape = GOWN, smoke = false }) => {
  const step = walk ? Math.sin(f / 5) : 0;
  const bob = walk ? Math.abs(Math.sin(f / 5)) * -8 : Math.sin(f / 20) * 2;
  const handX = 120 + stick * 40;
  const handY = -250 - stick * 30;
  const tipX = handX + 60 + stick * 160;
  const tipY = handY + 240 - stick * 200;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={140} ry={20} fill="#000" opacity={0.2} />
      {/* boots peeking under the gown */}
      <ellipse cx={-36 + step * 26} cy={-10} rx={38} ry={15} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <ellipse cx={40 - step * 26} cy={-10} rx={38} ry={15} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <g transform={`translate(0 ${bob})`}>
        {/* back arm */}
        <path d="M -40 -370 Q -90 -280 -70 -200" stroke={cape} strokeWidth={44} fill="none" strokeLinecap="round" />
        <circle cx={-70} cy={-196} r={22} fill={GLOVE} stroke={INK} strokeWidth={5} />
        {/* gown */}
        <path d={`M -62 -405 Q -100 -210 ${-128 + step * 8} -22 L ${128 - step * 8} -22 Q 100 -210 62 -405 Z`} fill={cape} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -20 -380 Q -40 -200 -60 -40 M 24 -380 Q 40 -200 56 -40" stroke={GOWN_HI} strokeWidth={6} fill="none" opacity={0.8} />
        {/* wax sheen */}
        <path d="M -70 -300 Q -80 -200 -96 -100" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.12} strokeLinecap="round" />
        {/* stick */}
        {prop === "stick" ? <path d={`M ${handX - 30} ${handY - 30 + stick * 10} L ${tipX} ${tipY}`} stroke="#6B4B2E" strokeWidth={11} strokeLinecap="round" /> : null}
        {prop === "bucket" ? (
          <g transform={`translate(${handX + 10} ${handY + 60})`}>
            <path d="M -40 -50 Q 0 -100 40 -50" stroke={INK} strokeWidth={6} fill="none" />
            <path d="M -50 -50 L 50 -50 Q 52 30 0 40 Q -52 30 -50 -50 Z" fill="#F08A24" stroke={INK} strokeWidth={6} />
            <path d="M -24 -20 l 12 12 l 12 -12 M 8 -20 l 12 12 l 12 -12 M -20 14 q 20 12 40 0" stroke={INK} strokeWidth={5} fill="none" />
          </g>
        ) : null}
        {/* front arm */}
        <path d={`M 34 -375 Q ${handX - 10} ${(handY - 375) / 2 + 10} ${handX} ${handY}`} stroke={cape} strokeWidth={46} fill="none" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r={24} fill={GLOVE} stroke={INK} strokeWidth={5} />
        {/* hood / collar */}
        <path d="M -62 -420 Q 0 -380 62 -420 L 52 -470 Q 0 -500 -52 -470 Z" fill="#2E2A33" stroke={INK} strokeWidth={6} />
        {/* head + mask */}
        <circle cx={0} cy={-470} r={50} fill={MASK} stroke={INK} strokeWidth={6} />
        <path d="M 30 -500 Q 120 -486 196 -418 Q 120 -432 30 -440 Z" fill={MASK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 60 -462 Q 120 -450 170 -424" stroke={MASK_D} strokeWidth={5} fill="none" />
        <circle cx={18} cy={-478} r={19} fill={LENS} stroke={INK} strokeWidth={6} />
        <circle cx={12} cy={-484} r={5} fill="#FFFFFF" />
        {/* wide-brimmed hat */}
        <ellipse cx={0} cy={-512} rx={118} ry={20} fill="#1A1719" stroke={INK} strokeWidth={6} />
        <path d="M -56 -514 L -50 -585 Q 0 -600 50 -585 L 56 -514 Z" fill="#1A1719" stroke={INK} strokeWidth={6} />
        <rect x={-54} y={-536} width={108} height={14} fill="#4A3B2E" />
        {smoke
          ? [0, 1, 2].map((k) => {
              const p = ((f + k * 12) % 36) / 36;
              return <circle key={k} cx={200 + p * 60} cy={-420 - p * 70} r={8 + p * 18} fill="#CFE3C5" opacity={0.55 * (1 - p)} />;
            })
          : null}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <Doctor x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} walk={p.walk} stick={p.stick} prop={p.prop} facing={p.flip ? -1 : 1} cape={p.cape} smoke={p.smoke} />;
}
