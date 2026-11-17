import React from "react";
import { interpolate, random, Easing, type PartProps } from "@sceneparts/core";
import { INK, P, SW, clamp, pop, ease, Arm, BACK, titleFont, bodyFont, typeFont, type KidPose, type Screen } from "../style/index";

// Bittu – the series' original recurring kid. Feet at (x, y). Head ≈ y - 430*scale.
export const Kid: React.FC<{ x: number; y: number; scale?: number; pose?: KidPose; mouth?: "smile" | "open" | "o" | "grr"; facing?: 1 | -1; look?: number;
  tee?: [string, string]; shorts?: string; hair?: "side" | "spiky" | "bowl"; prop?: "bat"; swing?: number; skin?: string ; frame?: number }> = ({ frame = 0,
  x, y, scale = 1, pose = "idle", mouth = "smile", facing = 1, look = 0, tee = [P.stripeB, P.stripeA], shorts = P.shorts, hair = "side", prop, swing = 0, skin = P.skin,
}) => {
  const f = frame;
  const wave = Math.sin(f / 4) * 18;
  const arms: Record<KidPose, [number, number, number, number][]> = {
    // [elbowX, elbowY, handX, handY] for left & right arm (shoulders at -60,-350 / 60,-350)
    up: [[-110, -450, -95, -590], [110, -450, 95, -600]],
    grip: [[40, -300, 140, -390], [120, -420, 140, -480]],
    idle: [[-85, -270, -80, -190], [85, -270, 80, -190]],
    wave: [[-85, -270, -80, -190], [120, -420, 150 + wave, -530]],
    point: [[-85, -270, -80, -190], [140, -360, 230, -380]],
    cheer: [[-120, -420, -150 - wave / 2, -530], [120, -420, 150 + wave / 2, -530]],
    bat: [[10, -290, 95, -300], [80, -300, 105, -320]],
    catch: [[-85, -270, -80, -190], [130, -470, 120, -600]],
    bowl: [[-120, -330, -170, -260], [70, -470, 20, -580]],
    run: [[-90, -300, -40 + wave, -250], [90, -300, 40 - wave, -260]],
  };
  const [L, R] = arms[pose];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      {/* legs + chappals */}
      <Arm x1={-35} y1={-170} x2={-38} y2={-80} x3={-40} y3={-10} color={skin} w={30} />
      <Arm x1={35} y1={-170} x2={38} y2={-80} x3={40} y3={-10} color={skin} w={30} />
      <ellipse cx={-48} cy={0} rx={34} ry={11} fill={P.brick} stroke={INK} strokeWidth={5} />
      <ellipse cx={48} cy={0} rx={34} ry={11} fill={P.brick} stroke={INK} strokeWidth={5} />
      {/* shorts */}
      <path d="M -80 -240 L 80 -240 L 88 -150 L 8 -150 L 0 -185 L -8 -150 L -88 -150 Z" fill={shorts} stroke={INK} strokeWidth={SW} />
      {/* striped tee */}
      <defs>
        <clipPath id="tee">
          <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" />
        </clipPath>
      </defs>
      <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" fill={tee[0]} />
      <g clipPath="url(#tee)">
        {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-100} y={-380 + k * 30} width={200} height={15} fill={tee[1]} />)}
      </g>
      <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" fill="none" stroke={INK} strokeWidth={SW} />
      {/* arms (in front of the tee) */}
      <Arm x1={-62} y1={-352} x2={L[0]} y2={L[1]} x3={L[2]} y3={L[3]} color={skin} />
      <Arm x1={62} y1={-352} x2={R[0]} y2={R[1]} x3={R[2]} y3={R[3]} color={skin} />
      {/* sleeves */}
      <circle cx={-66} cy={-352} r={26} fill={tee[1]} stroke={INK} strokeWidth={5} />
      <circle cx={66} cy={-352} r={26} fill={tee[1]} stroke={INK} strokeWidth={5} />
      {prop === "bat" ? (
        <g transform={`translate(100 -300) rotate(${swing})`}>
          <rect x={-9} y={-10} width={18} height={70} rx={6} fill="#3B3B3B" stroke={INK} strokeWidth={5} />
          <path d="M -24 58 L 24 58 L 22 270 Q 0 286 -22 270 Z" fill="#E8C27A" stroke={INK} strokeWidth={6} />
          <line x1={0} y1={70} x2={0} y2={260} stroke="#C99A4E" strokeWidth={5} />
        </g>
      ) : null}
      {/* neck + head */}
      <rect x={-18} y={-405} width={36} height={40} fill={P.skinDark} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-470} r={78} fill={skin} stroke={INK} strokeWidth={SW} />
      <circle cx={-78} cy={-465} r={16} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={78} cy={-465} r={16} fill={skin} stroke={INK} strokeWidth={5} />
      {/* side-parted hair */}
      {hair === "side" ? <path d="M -82 -480 Q -86 -560 -10 -556 Q 70 -560 84 -486 Q 60 -520 10 -528 L 4 -505 Q -40 -530 -82 -480 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {hair === "spiky" ? <path d="M -80 -480 L -70 -560 L -40 -530 L -20 -575 L 5 -535 L 30 -578 L 45 -530 L 72 -560 L 82 -482 Q 40 -515 0 -512 Q -40 -515 -80 -480 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {hair === "bowl" ? <path d="M -86 -470 Q -90 -565 0 -562 Q 90 -565 86 -470 L 70 -470 Q 60 -505 0 -505 Q -60 -505 -70 -470 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {/* face */}
      <g transform={`translate(${look * 10} 0)`}>
        <circle cx={-28} cy={-472} r={8} fill={INK} />
        <circle cx={28} cy={-472} r={8} fill={INK} />
        <path d="M -44 -494 q 14 -8 28 0 M 16 -494 q 14 -8 28 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        {mouth === "smile" ? <path d="M -26 -436 Q 0 -414 26 -436" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        {mouth === "open" ? <path d="M -26 -440 Q 0 -398 26 -440 Z" fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "o" ? <ellipse cx={0} cy={-430} rx={14} ry={18} fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "grr" ? <path d="M -24 -428 Q 0 -446 24 -428" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-446} r={10} fill="#E57B6A" opacity={0.45} />
        <circle cx={46} cy={-446} r={10} fill="#E57B6A" opacity={0.45} />
      </g>
    </g>
  );
};

// Adults: papa (moustache, half-sleeve shirt), mummy (saree, bun), bittu (grown-up Bittu in a hoodie)

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d: _d, t: _t, style: _s, render: _r, ...rest } = p;
  return <Kid {...(rest as any)} frame={f} />;
}
