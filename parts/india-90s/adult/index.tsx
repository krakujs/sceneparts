import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Adults: papa (moustache, half-sleeve shirt), mummy (saree, bun), bittu (grown-up Bittu in a hoodie)
export const Adult: React.FC<{ x: number; y: number; scale?: number; kind: "papa" | "mummy" | "bittu"; arm?: number; armR?: number; mouth?: "smile" | "open" | "flat"; facing?: 1 | -1; phone?: boolean }> = ({
  x, y, scale = 1, kind, arm = 20, armR = -20, mouth = "smile", facing = 1, phone = false,
}) => {
  const top = kind === "papa" ? "#9CC7E0" : kind === "mummy" ? P.green : P.teal;
  const bottom = kind === "papa" ? "#6B4A35" : kind === "mummy" ? P.green : "#2E4A7A";
  const hx = (deg: number, len: number) => Math.sin((deg * Math.PI) / 180) * len;
  const hy = (deg: number, len: number) => Math.cos((deg * Math.PI) / 180) * len;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      {kind === "mummy" ? (
        <path d="M -95 -470 L 95 -470 L 130 0 L -130 0 Z" fill={bottom} stroke={INK} strokeWidth={SW} />
      ) : (
        <>
          <Arm x1={-40} y1={-300} x2={-44} y2={-150} x3={-46} y3={-10} color={bottom} w={46} />
          <Arm x1={40} y1={-300} x2={44} y2={-150} x3={46} y3={-10} color={bottom} w={46} />
          <ellipse cx={-56} cy={0} rx={40} ry={12} fill={INK} />
          <ellipse cx={56} cy={0} rx={40} ry={12} fill={INK} />
        </>
      )}
      <path d="M -100 -560 Q 0 -585 100 -560 L 110 -300 Q 0 -285 -110 -300 Z" fill={top} stroke={INK} strokeWidth={SW} />
      {kind === "mummy" ? <path d="M 90 -560 L -60 -300 L -20 -300 L 110 -520 Z" fill={P.mustard} stroke={INK} strokeWidth={5} /> : null}
      {kind === "papa" ? <path d="M 0 -575 L 0 -300 M -20 -575 L 0 -540 L 20 -575" stroke={INK} strokeWidth={4} fill="none" /> : null}
      <Arm x1={-92} y1={-545} x2={-92 - hx(arm, 130)} y2={-545 + hy(arm, 130)} x3={-92 - hx(arm, 250)} y3={-545 + hy(arm, 250)} color={P.skin} w={30} />
      <Arm x1={92} y1={-545} x2={92 + hx(-armR, 130)} y2={-545 + hy(-armR, 130)} x3={92 + hx(-armR, 250)} y3={-545 + hy(-armR, 250)} color={P.skin} w={30} />
      {phone ? (
        <g transform={`translate(${92 + hx(-armR, 262)} ${-545 + hy(-armR, 262)}) rotate(${armR + 180})`}>
          <rect x={-34} y={-62} width={68} height={124} rx={12} fill="#15171C" stroke={INK} strokeWidth={5} />
          <rect x={-26} y={-52} width={52} height={100} rx={6} fill="#8FD3FF" />
        </g>
      ) : null}
      <rect x={-22} y={-605} width={44} height={50} fill={P.skinDark} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-680} r={82} fill={P.skin} stroke={INK} strokeWidth={SW} />
      {kind === "papa" ? (
        <>
          <path d="M -84 -690 Q -88 -740 -60 -755 L -50 -700 Z M 84 -690 Q 88 -740 60 -755 L 50 -700 Z" fill={P.hair} stroke={INK} strokeWidth={4} />
          <path d="M -40 -648 Q 0 -668 40 -648 Q 30 -630 0 -640 Q -30 -630 -40 -648 Z" fill={P.hair} stroke={INK} strokeWidth={4} />
        </>
      ) : null}
      {kind === "mummy" ? (
        <>
          <path d="M -86 -690 Q -80 -778 0 -770 Q 80 -778 86 -690 Q 60 -735 0 -735 Q -60 -735 -86 -690 Z" fill={P.hair} stroke={INK} strokeWidth={5} />
          <circle cx={-70} cy={-740} r={38} fill={P.hair} stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={-712} r={8} fill={P.brick} />
        </>
      ) : null}
      {kind === "bittu" ? (
        <path d="M -86 -690 Q -90 -775 -10 -770 Q 75 -775 88 -696 Q 62 -735 10 -742 L 4 -718 Q -42 -742 -86 -690 Z" fill={P.hair} stroke={INK} strokeWidth={5} />
      ) : null}
      <circle cx={-30} cy={-685} r={8} fill={INK} />
      <circle cx={30} cy={-685} r={8} fill={INK} />
      {mouth === "smile" ? <path d="M -28 -630 Q 0 -606 28 -630" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
      {mouth === "open" ? <path d="M -28 -634 Q 0 -588 28 -634 Z" fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
      {mouth === "flat" ? <path d="M -24 -626 L 24 -626" stroke={INK} strokeWidth={6} strokeLinecap="round" /> : null}
    </g>
  );
};

// ---------- CRT TV ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Adult {...(rest as any)} frame={f} />;
}
