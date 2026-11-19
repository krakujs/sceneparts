import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep059 Privateer (licensed pirate) – a red-coated captain in a plumed tricorn on a sunny Caribbean deck, cutlass up,
// holding the sealed LETTER OF MARQUE at the camera. White sails, turquoise sea, an enemy galleon on the horizon.
// visual: { mode: "deck" | "board" | "letter" | "charter", headline?, accent?, top?, size?, tag?, tagY?,
//           boardAt?, goldAt?, chip? (board, 0–1 / text), lostAt?, pirateAt?, stampText? (letter),
//           answer?, answerAccent?, answerAt?, answerSize?, chip?, chipY? (charter) }
// Cartoon action only: nobody is hurt; the noose only dangles. Flags are generic (red banner; enemy = white with a red saltire).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EDBB92";
const SKIN_D = "#CF9670";
const CHEEK = "#E58A7A";
const HAIR = "#4A2E1E";
const COAT = "#C0392B";
const COAT_D = "#8E2A20";
const GOLD = "#F2B544";
const GOLD_D = "#C98E1E";
const VEST = "#2E5A7A";
const SHIRT = "#F7F1E1";
const BREECH = "#E3D3B0";
const BOOT = "#1E1714";
const BOOT_CUFF = "#5A3A22";
const HAT = "#1E1A1C";
const STEEL = "#DCE3E8";
const STEEL_D = "#9AA6B0";
const PARCH = "#F4E6C4";
const PARCH_D = "#D9C49C";
const WAX = "#B3202A";
const WOOD = "#9C6E44";
const WOOD_D = "#6B4A2E";
const WOOD_HI = "#C08A55";
const SAIL = "#FBF6E9";
const SAIL_D = "#E3D9C2";
const SEA_D = "#137A92";
const FOAM = "#E9FBFF";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string }> = ({ a, b, c, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

// ---------- props ----------
// the letter of marque: parchment sheet hanging below the hand grip (origin = grip point), red wax seal + ribbons
export const Letter: React.FC<{ x: number; y: number; s?: number; f: number; rot?: number; glint?: boolean }> = ({ x, y, s = 1, f, rot = 0, glint = true }) => {
  const flap = Math.sin(f / 4) * 6;
  const g = ((f % 50) / 50) * 1.6 - 0.3;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={`M -120 0 L 120 0 L ${124 + flap * 0.4} 300 Q 0 ${318 + flap} ${-124 + flap * 0.4} 300 Z`} fill={PARCH} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M -126 -6 Q 0 -26 126 -6 Q 132 14 120 18 Q 0 2 -120 18 Q -134 12 -126 -6 Z`} fill={PARCH_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <text x={0} y={60} textAnchor="middle" fontFamily={titleFont} fontSize={30} fill={INK}>LETTER OF</text>
      <text x={0} y={100} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={WAX}>MARQUE</text>
      {[130, 154, 178, 202].map((ly, k) => (
        <path key={ly} d={`M -92 ${ly} q 12 -6 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t ${k % 2 ? 10 : 24} 0`} stroke="#7A6250" strokeWidth={3.5} fill="none" />
      ))}
      <path d="M -20 262 L -46 330 L -30 322 L -22 340 L -6 270 Z M 20 262 L 46 330 L 30 322 L 22 340 L 6 270 Z" fill={WAX} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={0} cy={250} r={40} fill={WAX} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={250} r={26} fill="none" stroke="#7E1018" strokeWidth={4} />
      <path d="M -12 252 L 0 236 L 12 252 L 0 264 Z" fill="#7E1018" />
      {glint && g > 0 && g < 1 ? <path d={`M ${-120 + g * 240} 0 l 40 0 l -60 300 l -40 0 Z`} fill="#FFFFFF" opacity={0.35} /> : null}
    </g>
  );
};

// curved cutlass; origin = grip, blade points "up" (negative y) before rotation
const Cutlass: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -14 -30 Q -22 -190 30 -330 Q 50 -360 62 -352 Q 40 -250 24 -30 Z" fill={STEEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 6 -50 Q 4 -190 44 -320" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.8} strokeLinecap="round" />
    <path d="M -10 -40 Q -6 -180 34 -300" stroke={STEEL_D} strokeWidth={4} fill="none" opacity={0.7} />
    <path d="M -46 -34 Q 0 -48 44 -34 Q 46 -22 40 -18 Q 0 -32 -40 -18 Q -48 -22 -46 -34 Z" fill={GOLD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 40 -26 Q 70 10 40 46" stroke={GOLD} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 40 -26 Q 70 10 40 46" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
    <rect x={-12} y={-20} width={24} height={64} rx={8} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={50} r={13} fill={GOLD} stroke={INK} strokeWidth={4} />
  </g>
);

type Face = "shout" | "grin" | "shock";

// The privateer captain, frontal. Origin = feet centre, ~1100 tall at s = 1 (+ cutlass to ~ -1300).
// raise: 0..1 (letter hand down → held high); letter: draw the letter in the raised hand; sword: cutlass in the other hand
export const Captain: React.FC<{ x: number; y: number; s?: number; f: number; raise?: number; letter?: boolean; sword?: boolean; face?: Face; swing?: number }> = ({ x, y, s = 1, f, raise = 1, letter = true, sword = true, face = "shout", swing = 1 }) => {
  const bob = Math.sin(f / 9) * 5;
  const lh: P = [lerp(-190, -255, raise), lerp(-520, -1040, raise) + Math.sin(f / 7) * 6];
  const le: P = [lerp(-190, -240, raise), lerp(-640, -820, raise)];
  const sh: P = [262, -960 + Math.sin(f / 6 + 1) * 8];
  const sRot = 16 + Math.sin(f / 5) * 7 * swing;
  const eyesY = -858;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={26} fill="#000" opacity={0.22} />
      {/* legs + boots */}
      <Limb a={[-55, -440]} b={[-62, -300]} c={[-66, -170]} w={78} col={BREECH} />
      <Limb a={[55, -440]} b={[62, -300]} c={[66, -170]} w={78} col={BREECH} />
      {[-1, 1].map((d) => (
        <g key={d} transform={`scale(${d} 1)`}>
          <path d="M 24 -268 L 112 -268 L 116 -40 Q 160 -34 170 -8 Q 168 6 150 6 L 34 6 Q 22 -2 26 -30 Z" fill={BOOT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 14 -300 L 122 -300 L 118 -240 L 20 -240 Z" fill={BOOT_CUFF} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 50 -150 L 60 -40" stroke="#3A2E26" strokeWidth={5} opacity={0.7} />
        </g>
      ))}
      <g transform={`translate(0 ${bob})`}>
        {/* hair behind */}
        <path d="M -100 -880 Q -118 -770 -78 -735 L 78 -735 Q 118 -770 100 -880 Z" fill={HAIR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {/* waistcoat + shirt */}
        <path d="M -74 -748 L 74 -748 L 80 -420 L 0 -396 L -80 -420 Z" fill={VEST} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[-700, -640, -580, -520, -460].map((by) => <circle key={by} cx={0} cy={by} r={9} fill={GOLD} stroke={INK} strokeWidth={3} />)}
        {/* coat halves */}
        {[-1, 1].map((d) => (
          <g key={d} transform={`scale(${d} 1)`}>
            <path d="M 40 -764 Q 140 -790 138 -752 Q 176 -500 214 -196 Q 136 -172 50 -204 L 52 -560 Q 62 -700 40 -764 Z" fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d="M 40 -764 Q 62 -700 52 -560 L 50 -204" stroke={GOLD} strokeWidth={11} fill="none" strokeLinecap="round" />
            <path d="M 52 -560 L 50 -204" stroke={INK} strokeWidth={2} fill="none" opacity={0.4} />
            <path d="M 42 -762 L 112 -742 L 64 -612 Z" fill={COAT_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d="M 150 -480 Q 170 -330 190 -220" stroke={COAT_D} strokeWidth={8} fill="none" opacity={0.6} strokeLinecap="round" />
            {[-690, -620, -550, -480, -410].map((by) => <circle key={by} cx={74} cy={by} r={10} fill={GOLD} stroke={INK} strokeWidth={3} />)}
            <rect x={110} y={-440} width={60} height={22} rx={6} fill={COAT_D} stroke={INK} strokeWidth={4} transform="rotate(8 140 -430)" />
          </g>
        ))}
        {/* belt + baldric */}
        <rect x={-82} y={-482} width={164} height={36} fill={BOOT} stroke={INK} strokeWidth={5} />
        <rect x={-24} y={-488} width={48} height={48} rx={6} fill="none" stroke={GOLD} strokeWidth={9} />
        <path d="M 118 -742 L -150 -380" stroke={INK} strokeWidth={46} strokeLinecap="round" />
        <path d="M 118 -742 L -150 -380" stroke={WOOD_D} strokeWidth={34} strokeLinecap="round" />
        <path d="M 112 -726 L -142 -390" stroke={GOLD} strokeWidth={4} strokeDasharray="10 12" />
        {/* cravat + neck */}
        <rect x={-30} y={-800} width={60} height={52} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M -48 -770 Q 0 -742 48 -770 L 36 -690 Q 18 -676 0 -690 Q -18 -676 -36 -690 Z" fill={SHIRT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -24 -730 Q 0 -716 24 -730 M -20 -708 Q 0 -696 20 -708" stroke={SAIL_D} strokeWidth={4} fill="none" />
        {/* head */}
        <circle cx={-92} cy={-846} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={92} cy={-846} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-850} r={92} fill={SKIN} stroke={INK} strokeWidth={6} />
        <circle cx={-56} cy={-818} r={15} fill={CHEEK} opacity={0.5} />
        <circle cx={56} cy={-818} r={15} fill={CHEEK} opacity={0.5} />
        {face === "shock" ? (
          <g>
            <circle cx={-32} cy={eyesY} r={18} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={32} cy={eyesY} r={18} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={-32} cy={eyesY} r={7} fill={INK} />
            <circle cx={32} cy={eyesY} r={7} fill={INK} />
            <path d="M -58 -900 Q -34 -916 -12 -900 M 12 -900 Q 34 -916 58 -900" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <ellipse cx={-32} cy={eyesY} rx={10} ry={14} fill={INK} />
            <ellipse cx={32} cy={eyesY} rx={10} ry={14} fill={INK} />
            <circle cx={-29} cy={eyesY - 5} r={3.5} fill="#FFFFFF" />
            <circle cx={35} cy={eyesY - 5} r={3.5} fill="#FFFFFF" />
            <path d="M -60 -896 L -14 -882 M 14 -882 L 60 -896" stroke={HAIR} strokeWidth={11} fill="none" strokeLinecap="round" />
          </g>
        )}
        <path d="M -6 -850 Q 4 -818 16 -826" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        {face === "shout" ? (
          <g>
            <path d="M -36 -796 Q 0 -790 36 -796 Q 32 -748 0 -744 Q -32 -748 -36 -796 Z" fill="#5A1E1A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d="M -30 -790 L 30 -790" stroke="#FFFFFF" strokeWidth={7} />
            <ellipse cx={0} cy={-756} rx={14} ry={6} fill="#E06A6A" />
          </g>
        ) : face === "grin" ? (
          <path d="M -40 -798 Q 0 -756 40 -798 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        ) : (
          <ellipse cx={0} cy={-774} rx={16} ry={20} fill="#5A1E1A" stroke={INK} strokeWidth={5} />
        )}
        <path d="M 0 -814 Q -30 -826 -54 -808 Q -68 -796 -76 -810 Q -66 -784 -32 -798 Q -10 -802 0 -806 Q 10 -802 32 -798 Q 66 -784 76 -810 Q 68 -796 54 -808 Q 30 -826 0 -814 Z" fill={HAIR} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {face !== "shock" ? <path d="M -14 -740 Q 0 -712 14 -740 Z" fill={HAIR} stroke={INK} strokeWidth={3} /> : null}
        {/* plumed tricorn */}
        <path d="M 50 -1000 Q 150 -1110 270 -1070 Q 210 -1056 170 -1030 Q 236 -1032 256 -996 Q 160 -1006 70 -978 Z" fill={SHIRT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 90 -1010 Q 170 -1060 240 -1060" stroke={SAIL_D} strokeWidth={4} fill="none" />
        <path d="M -84 -930 Q -86 -1012 0 -1024 Q 86 -1012 84 -930 Z" fill={HAT} stroke={INK} strokeWidth={6} />
        <path d="M -206 -944 Q -110 -918 0 -892 Q 110 -918 206 -944 Q 132 -966 76 -1008 Q 0 -1040 -76 -1008 Q -132 -966 -206 -944 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -206 -944 Q -132 -966 -76 -1008 Q 0 -1040 76 -1008 Q 132 -966 206 -944" stroke={GOLD} strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -150 -930 Q -70 -912 0 -900 Q 70 -912 150 -930" stroke="#3A3236" strokeWidth={5} fill="none" />
        <circle cx={-96} cy={-968} r={20} fill={WAX} stroke={INK} strokeWidth={4} />
        <circle cx={-96} cy={-968} r={8} fill={GOLD} />
      </g>
      {/* sword arm */}
      {sword ? (
        <g transform={`translate(0 ${bob})`}>
          <Limb a={[125, -735]} b={[236, -790]} c={sh} w={64} col={COAT} />
          <Cutlass x={sh[0] + 4} y={sh[1] - 6} s={1.15} rot={sRot} />
          <path d={`M ${sh[0] - 44} ${sh[1] + 38} L ${sh[0] + 40} ${sh[1] + 52}`} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
          <circle cx={sh[0]} cy={sh[1]} r={31} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      ) : (
        <g transform={`translate(0 ${bob})`}>
          <Limb a={[125, -735]} b={[180, -600]} c={[170, -470]} w={64} col={COAT} />
          <circle cx={170} cy={-466} r={31} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      )}
      {/* letter arm */}
      <g transform={`translate(0 ${bob})`}>
        <Limb a={[-125, -735]} b={le} c={lh} w={64} col={COAT} />
        {letter ? <Letter x={lh[0] - 10} y={lh[1] + 6} s={1.05} f={f} rot={Math.sin(f / 9) * 3} /> : null}
        <circle cx={lh[0]} cy={lh[1]} r={31} fill={SKIN} stroke={INK} strokeWidth={5} />
      </g>
    </g>
  );
};

// ---------- scenery ----------
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep059sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2F86D9" />
      <stop offset="60%" stopColor="#86CDF2" />
      <stop offset="100%" stopColor="#FFF0C8" />
    </linearGradient>
    <linearGradient id="ep059sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3B3F8E" />
      <stop offset="55%" stopColor="#E2766A" />
      <stop offset="100%" stopColor="#F9C46B" />
    </linearGradient>
    <linearGradient id="ep059sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3CC7C9" />
      <stop offset="100%" stopColor={SEA_D} />
    </linearGradient>
    <linearGradient id="ep059seaDusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E9906A" />
      <stop offset="100%" stopColor="#4A3A7A" />
    </linearGradient>
    <radialGradient id="ep059glow">
      <stop offset="0%" stopColor="#FFF4C2" stopOpacity={0.95} />
      <stop offset="100%" stopColor="#FFF4C2" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep059gold">
      <stop offset="0%" stopColor="#FFE58A" stopOpacity={0.95} />
      <stop offset="100%" stopColor="#FFE58A" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const Sky: React.FC<{ h: number; f: number; sun?: P; dusk?: boolean }> = ({ h, f, sun = [840, 430], dusk = false }) => (
  <g>
    <rect x={0} y={0} width={1080} height={h} fill={dusk ? "url(#ep059sunset)" : "url(#ep059sky)"} />
    <circle cx={sun[0]} cy={sun[1]} r={280} fill="url(#ep059glow)" />
    <circle cx={sun[0]} cy={sun[1]} r={dusk ? 130 : 96} fill={dusk ? "#FFD27A" : "#FFF6D0"} stroke={dusk ? "#F2A24A" : "#FFE08A"} strokeWidth={8} />
    {!dusk
      ? [[120, 560, 1], [620, 300, 0.8], [980, 760, 1.1], [330, 900, 0.7]].map(([cx, cy, cs], k) => {
          const dx = ((((cx + f * (0.6 + k * 0.2)) % 1400) + 1400) % 1400) - 200;
          return (
            <g key={k} transform={`translate(${dx} ${cy}) scale(${cs})`}>
              <path d="M -150 30 Q -160 -20 -100 -24 Q -84 -80 -20 -70 Q 20 -110 74 -64 Q 140 -70 140 -10 Q 176 10 150 34 Z" fill="#FFFFFF" opacity={0.92} />
            </g>
          );
        })
      : null}
    {[0, 1, 2].map((k) => {
      const gx = ((((k * 380 + f * 3) % 1300) + 1300) % 1300) - 110;
      const gy = 640 + k * 120 + Math.sin(f / 6 + k) * 16;
      const fl = Math.sin(f / 3 + k) * 14;
      return <path key={k} d={`M ${gx - 34} ${gy - fl} Q ${gx - 16} ${gy - 14} ${gx} ${gy} Q ${gx + 16} ${gy - 14} ${gx + 34} ${gy - fl}`} stroke={dusk ? "#3A2A4A" : "#33404E"} strokeWidth={6} fill="none" strokeLinecap="round" />;
    })}
  </g>
);

const Sea: React.FC<{ y0: number; f: number; dusk?: boolean; rows?: number }> = ({ y0, f, dusk = false, rows = 7 }) => (
  <g>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={dusk ? "url(#ep059seaDusk)" : "url(#ep059sea)"} />
    {new Array(rows).fill(0).map((_, r) => {
      const yy = y0 + 30 + r * r * 14 + r * 26;
      const amp = 5 + r * 2.4;
      const wl = 90 + r * 24;
      const off = (f * (1.4 + r * 0.5)) % wl;
      const pts: string[] = [];
      for (let x = -wl; x <= 1080 + wl; x += wl / 2) pts.push(`${x - off} ${yy + ((Math.round(x / (wl / 2)) % 2) ? -amp : amp)}`);
      return <path key={r} d={`M ${pts.join(" L ")}`} stroke={dusk ? "#FFD9A0" : FOAM} strokeWidth={3 + r * 0.9} fill="none" opacity={0.45} strokeLinejoin="round" />;
    })}
    {new Array(12).fill(0).map((_, k) => {
      const tw = Math.abs(Math.sin(f / 5 + k * 1.7));
      return <path key={k} d={`M ${random(`sp${k}`) * 1080 - 10} ${y0 + 20 + random(`spy${k}`) * 240} l 20 0`} stroke="#FFFFFF" strokeWidth={5} opacity={tw * 0.8} strokeLinecap="round" />;
    })}
  </g>
);

// flag waving to the right of its pole point (origin = top of the hoist); kind: "red" (privateer banner) | "enemy" (white + red saltire)
const Flag: React.FC<{ x: number; y: number; s?: number; f: number; kind?: "red" | "enemy"; dir?: 1 | -1 }> = ({ x, y, s = 1, f, kind = "red", dir = 1 }) => {
  const w = 150;
  const h = 96;
  const wave = (t: number) => Math.sin(f / 3 - t * 5) * 10 * t;
  const d = `M 0 0 Q ${w * 0.5} ${wave(0.5) - 8} ${w} ${wave(1)} L ${w} ${h + wave(1)} Q ${w * 0.5} ${h + wave(0.5) - 8} 0 ${h} Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
      <path d={d} fill={kind === "red" ? COAT : "#FBF6E9"} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {kind === "red" ? (
        <path d={`M 34 ${16 + wave(0.25)} l 20 0 l 0 ${h - 34} l -20 0 Z`} fill={GOLD} stroke={INK} strokeWidth={3} />
      ) : (
        <path d={`M 14 ${10 + wave(0.1)} L ${w - 14} ${h - 10 + wave(0.9)} M ${w - 14} ${10 + wave(0.9)} L 14 ${h - 10 + wave(0.1)}`} stroke={WAX} strokeWidth={14} strokeLinecap="round" />
      )}
    </g>
  );
};

// square sail, origin = yard centre (top), billowing toward the viewer
const Sail: React.FC<{ x: number; y: number; w: number; h: number; f: number; k?: number; col?: string }> = ({ x, y, w, h, f, k = 0, col = SAIL }) => {
  const b = 22 + Math.sin(f / 8 + k) * 6;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M ${-w / 2} 0 L ${w / 2} 0 Q ${w / 2 + b} ${h * 0.55} ${w / 2 - 6} ${h} Q 0 ${h + b * 1.2} ${-w / 2 + 6} ${h} Q ${-w / 2 - b} ${h * 0.55} ${-w / 2} 0 Z`} fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${-w * 0.2} 8 Q ${-w * 0.24} ${h * 0.5} ${-w * 0.2} ${h + b * 0.6} M ${w * 0.2} 8 Q ${w * 0.24} ${h * 0.5} ${w * 0.2} ${h + b * 0.6}`} stroke={SAIL_D} strokeWidth={5} fill="none" />
      <rect x={-w / 2 - 20} y={-10} width={w + 40} height={18} rx={8} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// side-view sailing ship facing right (dir flips). Origin = waterline centre. big = galleon with a tall stern castle.
const Ship: React.FC<{ x: number; y: number; s?: number; f: number; dir?: 1 | -1; big?: boolean; flag?: "red" | "enemy"; flagP?: number; hull?: string; rollK?: number }> = ({ x, y, s = 1, f, dir = 1, big = false, flag = "red", flagP = 1, hull, rollK = 0 }) => {
  const roll = Math.sin(f / 12 + rollK) * 2.2;
  const bob = Math.sin(f / 10 + rollK) * 6;
  const hc = hull ?? (big ? "#8A5A34" : WOOD);
  const masts: [number, number][] = big ? [[-150, -720], [70, -820], [250, -600]] : [[-80, -680], [140, -620]];
  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${roll}) scale(${s * dir} ${s})`}>
      {masts.map(([mx, top], i) => (
        <rect key={`m${i}`} x={mx - 11} y={top} width={22} height={-top} fill={WOOD_D} stroke={INK} strokeWidth={5} />
      ))}
      <path d={`M ${masts[0][0]} ${masts[0][1] + 20} L ${big ? -400 : -330} -150 M ${masts[masts.length - 1][0]} ${masts[masts.length - 1][1] + 20} L ${big ? 520 : 470} -170`} stroke={INK} strokeWidth={4} opacity={0.7} />
      {masts.map(([mx, top], i) => (
        <g key={`s${i}`}>
          <Sail x={mx} y={top + 60} w={big ? 200 : 210} h={big ? 150 : 160} f={f} k={i} />
          <Sail x={mx} y={top + 250} w={big ? 250 : 260} h={big ? 190 : 200} f={f} k={i + 2} />
        </g>
      ))}
      <path d={`M ${big ? 380 : 340} -120 L ${big ? 560 : 500} -210`} stroke={WOOD_D} strokeWidth={14} strokeLinecap="round" />
      {big ? (
        <path d="M -440 -330 L -300 -330 L -290 -150 L 330 -150 Q 400 -150 420 -200 L 400 -40 Q 300 30 140 34 L -250 34 Q -380 20 -420 -100 Z" fill={hc} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ) : (
        <path d="M -380 -170 L 350 -150 Q 400 -150 410 -190 L 380 -40 Q 300 30 140 34 L -230 34 Q -350 20 -380 -100 Z" fill={hc} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      )}
      <path d={big ? "M -416 -110 L 410 -110" : "M -372 -110 L 392 -110"} stroke={GOLD} strokeWidth={12} />
      {(big ? [-240, -140, -40, 60, 160, 260] : [-260, -140, -20, 100, 220]).map((gx) => <rect key={gx} x={gx} y={-88} width={34} height={30} fill="#2A1E16" stroke={INK} strokeWidth={4} />)}
      {big ? <path d="M -430 -290 L -310 -290 M -432 -240 L -306 -240" stroke={GOLD} strokeWidth={8} /> : null}
      {big ? [-410, -370, -330].map((wx) => <rect key={wx} x={wx} y={-280} width={26} height={30} fill="#FFE08A" stroke={INK} strokeWidth={3} />) : null}
      <path d="M -300 34 Q 0 56 300 30" stroke={FOAM} strokeWidth={10} fill="none" opacity={0.8} strokeLinecap="round" />
      {flagP > 0 ? <Flag x={masts[1][0] + 8} y={masts[1][1] + (1 - flagP) * 420} s={1.1} f={f} kind={flag} /> : null}
    </g>
  );
};

// treasure chest, origin = bottom centre; open 0..1; coins burst while open
const Chest: React.FC<{ x: number; y: number; s?: number; f: number; open?: number; empty?: boolean }> = ({ x, y, s = 1, f, open = 1, empty = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={260} ry={26} fill="#000" opacity={0.25} />
    {open > 0.3 && !empty ? <circle cx={0} cy={-230} r={330} fill="url(#ep059gold)" opacity={open} /> : null}
    {/* lid (hinged at back) */}
    {open < 0.5 ? (
      <g transform={`translate(0 -200) scale(1 ${1 - open})`}>
        <path d="M -220 0 Q -220 -120 0 -130 Q 220 -120 220 0 Z" fill={WOOD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -150 -6 Q -150 -100 -140 -110 M 150 -6 Q 150 -100 140 -110" stroke={GOLD_D} strokeWidth={18} fill="none" />
      </g>
    ) : (
      <g>
        <path d={`M -226 -200 L -240 ${-200 - 230 * open} Q 0 ${-250 - 240 * open} 240 ${-200 - 230 * open} L 226 -200 Z`} fill={WOOD_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M -150 -200 L -158 ${-210 - 230 * open} M 150 -200 L 158 ${-210 - 230 * open}`} stroke={GOLD_D} strokeWidth={18} />
      </g>
    )}
    <rect x={-220} y={-200} width={440} height={200} rx={10} fill={WOOD} stroke={INK} strokeWidth={7} />
    {open > 0.3 && !empty ? (
      <g>
        <path d="M -206 -200 Q -120 -270 0 -250 Q 130 -280 206 -200 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {new Array(9).fill(0).map((_, k) => <circle key={k} cx={-160 + k * 40} cy={-222 - Math.sin(k * 1.3) * 18} r={20} fill="#FFD45A" stroke={INK} strokeWidth={4} />)}
      </g>
    ) : null}
    {[-150, 150].map((bx) => <rect key={bx} x={bx - 18} y={-200} width={36} height={200} fill={GOLD_D} stroke={INK} strokeWidth={5} />)}
    <path d="M -220 -120 L 220 -120" stroke={WOOD_D} strokeWidth={6} />
    <rect x={-34} y={-186} width={68} height={70} rx={10} fill={GOLD} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-158} r={9} fill={INK} />
    {open > 0.5 && !empty
      ? new Array(10).fill(0).map((_, k) => {
          const p = ((f * 1.3 + k * 7) % 34) / 34;
          const a = rad(-160 + random(`cn${k}`) * 140);
          const r = 140 + p * 360;
          return (
            <g key={k} transform={`translate(${Math.cos(a) * r} ${-260 + Math.sin(a) * r + p * p * 380})`} opacity={1 - p * 0.6}>
              <ellipse rx={22 * Math.abs(Math.cos(f / 3 + k))+ 6} ry={22} fill="#FFD45A" stroke={INK} strokeWidth={4} />
            </g>
          );
        })
      : null}
    {empty ? <path d="M -60 -230 q 20 -30 40 0 q 20 -30 40 0" stroke="#8A7A6A" strokeWidth={5} fill="none" /> : null}
  </g>
);

const Burst: React.FC<{ x: number; y: number; s?: number; col?: string; f: number }> = ({ x, y, s = 1, col = "#FFE08A", f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${f * 2})`}>
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${Math.cos(rad(k * 30)) * 40} ${Math.sin(rad(k * 30)) * 40} L ${Math.cos(rad(k * 30)) * 120} ${Math.sin(rad(k * 30)) * 120}`} stroke={col} strokeWidth={10} strokeLinecap="round" />
    ))}
    <circle r={26} fill="#FFFFFF" />
  </g>
);

const Bang: React.FC<{ x: number; y: number; text: string; p: number; f: number; rot?: number; size?: number }> = ({ x, y, text, p, f, rot = -10, size = 120 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <Burst x={0} y={-30} s={1.5} f={f} />
      <text x={0} y={20} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">{text}</text>
    </g>
  ) : null;

const Stamp: React.FC<{ x: number; y: number; text: string; p: number; w?: number }> = ({ x, y, text, p, w = 640 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(-8) scale(${lerp(2.2, 1, Math.min(1, p))})`} opacity={Math.min(1, p * 1.6)}>
      <rect x={-w / 2 - 60} y={-100} width={w + 120} height={200} rx={20} fill="#FFF3E0" opacity={0.92} stroke={C.brick} strokeWidth={16} />
      <rect x={-w / 2 - 36} y={-78} width={w + 72} height={156} rx={12} fill="none" stroke={C.brick} strokeWidth={5} />
      <text x={0} y={42} textAnchor="middle" fontFamily={titleFont} fontSize={112} fill={C.brick} textLength={w} lengthAdjust="spacingAndGlyphs">{text}</text>
    </g>
  ) : null;

const Chip: React.FC<{ x: number; y: number; text: string; p: number; w?: number; size?: number; bg?: string; rot?: number }> = ({ x, y, text, p, w = 640, size = 50, bg = C.cream, rot = -2 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-50} width={w} height={100} rx={18} fill={bg} stroke={INK} strokeWidth={7} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>{text}</text>
    </g>
  ) : null;

// dangling rope noose from the top edge (origin = bottom of the loop), swings
const Noose: React.FC<{ x: number; y: number; f: number; p: number }> = ({ x, y, f, p }) => {
  if (p <= 0) return null;
  const sw = Math.sin(f / 7) * 6;
  const dy = lerp(-700, 0, Math.min(1, p));
  return (
    <g transform={`translate(${x} ${y + dy}) rotate(${sw} 0 -900)`}>
      <path d="M 0 -900 L 0 -230" stroke="#8A6A3E" strokeWidth={16} />
      <path d="M 0 -900 L 0 -230" stroke={INK} strokeWidth={2} strokeDasharray="10 10" opacity={0.5} />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-18} y={-230 + k * 22} width={36} height={22} rx={8} fill="#B08850" stroke={INK} strokeWidth={4} />)}
      <ellipse cx={0} cy={-36} rx={56} ry={78} fill="none" stroke={INK} strokeWidth={22} />
      <ellipse cx={0} cy={-36} rx={56} ry={78} fill="none" stroke="#B08850" strokeWidth={14} />
    </g>
  );
};

// ---------- deck dressing ----------
const Cannon: React.FC<{ x: number; y: number; s?: number; dir?: 1 | -1 }> = ({ x, y, s = 1, dir = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
    <rect x={-120} y={-90} width={200} height={70} rx={10} fill={WOOD_D} stroke={INK} strokeWidth={6} />
    <circle cx={-80} cy={-14} r={30} fill={WOOD} stroke={INK} strokeWidth={6} />
    <circle cx={50} cy={-14} r={30} fill={WOOD} stroke={INK} strokeWidth={6} />
    <path d="M -130 -150 L 190 -132 Q 214 -130 214 -112 L 214 -104 Q 214 -86 190 -86 L -130 -76 Q -170 -90 -170 -112 Q -170 -140 -130 -150 Z" fill="#2E3238" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -120 -138 L 180 -124" stroke="#5A626C" strokeWidth={6} />
  </g>
);

const Barrel: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 0 Q -112 -110 -90 -220 L 90 -220 Q 112 -110 90 0 Z" fill={WOOD} stroke={INK} strokeWidth={6} />
    <path d="M -100 -50 L 100 -50 M -100 -170 L 100 -170" stroke="#4A4E5E" strokeWidth={14} />
    <ellipse cx={0} cy={-220} rx={90} ry={22} fill={WOOD_HI} stroke={INK} strokeWidth={6} />
  </g>
);

// near deck: bulwark rail + planks in light perspective
const Deck: React.FC<{ rail: number }> = ({ rail }) => (
  <g>
    <rect x={0} y={rail} width={1080} height={110} fill={WOOD} stroke={INK} strokeWidth={6} />
    <rect x={0} y={rail - 22} width={1080} height={30} fill={WOOD_HI} stroke={INK} strokeWidth={6} />
    {new Array(8).fill(0).map((_, k) => <rect key={k} x={40 + k * 140} y={rail - 8} width={26} height={118} fill={WOOD_D} stroke={INK} strokeWidth={4} />)}
    <rect x={0} y={rail + 104} width={1080} height={1920 - rail - 104} fill={WOOD_HI} />
    {new Array(11).fill(0).map((_, k) => {
      const bx = 540 + (k - 5) * 120;
      return <path key={k} d={`M ${540 + (k - 5) * 70} ${rail + 104} L ${bx + (k - 5) * 120} 1920`} stroke={WOOD} strokeWidth={6} />;
    })}
    {[rail + 200, rail + 330].map((ly) => <path key={ly} d={`M 0 ${ly} L 1080 ${ly}`} stroke={WOOD} strokeWidth={4} opacity={0.6} />)}
  </g>
);

// ---------- today: the Constitution ----------
const Capitol: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.95}>
    <rect x={-520} y={-170} width={1040} height={170} fill="#EEF1F4" stroke="#8A96A6" strokeWidth={5} />
    {new Array(21).fill(0).map((_, k) => <rect key={k} x={-500 + k * 50} y={-150} width={14} height={130} fill="#C9D2DC" />)}
    <path d="M -260 -170 L 0 -250 L 260 -170 Z" fill="#E3E8EE" stroke="#8A96A6" strokeWidth={5} />
    <rect x={-220} y={-330} width={440} height={90} fill="#EEF1F4" stroke="#8A96A6" strokeWidth={5} />
    {new Array(12).fill(0).map((_, k) => <rect key={k} x={-200 + k * 36} y={-320} width={12} height={72} fill="#C9D2DC" />)}
    <path d="M -200 -330 Q -200 -560 0 -580 Q 200 -560 200 -330 Z" fill="#F4F6F8" stroke="#8A96A6" strokeWidth={6} />
    {[-120, -60, 0, 60, 120].map((rx) => <path key={rx} d={`M ${rx} -334 Q ${rx * 0.8} -480 ${rx * 0.2} -572`} stroke="#C9D2DC" strokeWidth={5} fill="none" />)}
    <rect x={-40} y={-650} width={80} height={80} fill="#EEF1F4" stroke="#8A96A6" strokeWidth={5} />
    <path d="M -40 -650 Q 0 -700 40 -650 Z" fill="#F4F6F8" stroke="#8A96A6" strokeWidth={5} />
    <path d="M 0 -690 L 0 -740" stroke="#8A96A6" strokeWidth={10} />
  </g>
);

const Quill: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 Q -40 -160 -10 -360 Q 40 -260 30 -120 Q 20 -40 0 0 Z" fill={SHIRT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 0 Q -6 -180 -8 -340" stroke={SAIL_D} strokeWidth={4} fill="none" />
    <path d="M -4 0 L 6 46 L 12 0 Z" fill={INK} />
  </g>
);

// parchment page of the US Constitution (drawn), origin = top centre; hl: 0..1 highlighter sweep over the clause
const Charter: React.FC<{ x: number; y: number; s?: number; hl: number; rot?: number }> = ({ x, y, s = 1, hl, rot = -2 }) => {
  const W = 780;
  const H = 860;
  const edge: string[] = [];
  for (let k = 0; k <= 20; k++) edge.push(`${-W / 2 + (W * k) / 20} ${(k % 2 ? 6 : -4)}`);
  const rows = [300, 350, 400, 620, 670, 720, 770];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-W / 2 + 18} y={22} width={W} height={H} rx={8} fill="#000" opacity={0.22} />
      <path d={`M ${edge.join(" L ")} L ${W / 2} ${H} L ${-W / 2} ${H} Z`} fill={PARCH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-W / 2 + 26} y={30} width={W - 52} height={H - 60} fill="none" stroke={PARCH_D} strokeWidth={6} />
      <text x={0} y={170} textAnchor="middle" fontFamily="Georgia, 'DejaVu Serif', serif" fontStyle="italic" fontWeight={700} fontSize={104} fill={INK}>Section. 8.</text>
      <text x={0} y={238} textAnchor="middle" fontFamily="Georgia, 'DejaVu Serif', serif" fontStyle="italic" fontSize={40} fill="#5A4636">The Congress shall have Power…</text>
      {rows.map((ry, k) => (
        <path key={ry} d={`M ${-W / 2 + 70} ${ry} q 14 -7 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t 28 0 t ${k % 3 ? 28 : 12} 0`} stroke="#7A6250" strokeWidth={4} fill="none" />
      ))}
      <rect x={-W / 2 + 50} y={448} width={(W - 100) * hl} height={124} rx={14} fill={C.mustard} opacity={0.85} />
      {hl > 0.98 ? <rect x={-W / 2 + 44} y={442} width={W - 88} height={136} rx={16} fill="none" stroke={GOLD_D} strokeWidth={5} /> : null}
      <text x={0} y={500} textAnchor="middle" fontFamily="Georgia, 'DejaVu Serif', serif" fontStyle="italic" fontSize={48} fill={INK}>…To declare War, grant</text>
      <text x={0} y={556} textAnchor="middle" fontFamily="Georgia, 'DejaVu Serif', serif" fontStyle="italic" fontWeight={700} fontSize={50} fill={INK}>Letters of Marque…</text>
    </g>
  );
};

export const Privateer: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "deck";
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let sky: "night" | "dawn" | "day" = "day";

  if (mode === "deck") {
    // frame 0: the captain fills the frame on his own sunny deck, cutlass up, the sealed letter of marque held high
    const roll = Math.sin(f / 18) * 1.2;
    body = (
      <>
        <g transform={`rotate(${roll} 540 1500)`}>
          <Sky h={1250} f={f} sun={[830, 520]} />
          <Sea y0={1180} f={f} rows={5} />
          <Ship x={820} y={1205} s={0.24} f={f} dir={-1} big flag="enemy" rollK={2} />
          <rect x={128} y={-20} width={48} height={1500} fill={WOOD_D} stroke={INK} strokeWidth={6} />
          <Sail x={152} y={60} w={560} h={460} f={f} />
          <Sail x={152} y={-400} w={500} h={380} f={f} k={2} />
          {[[152, 260, 470, 1420], [152, 260, -40, 1420], [152, 700, 330, 1420]].map(([x1, y1, x2, y2], k) => (
            <path key={k} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={INK} strokeWidth={5} opacity={0.8} />
          ))}
          <rect x={984} y={980} width={14} height={440} fill={WOOD_D} stroke={INK} strokeWidth={4} />
          <Flag x={990} y={1000} s={1.05} f={f} dir={-1} />
        </g>
        <Deck rail={1440} />
        <Barrel x={120} y={1760} s={0.95} />
        <Cannon x={930} y={1700} s={0.85} dir={-1} />
        <Captain x={560} y={1895} s={1.0} f={f} raise={1} face={v.face ?? "shout"} />
      </>
    );
  } else if (mode === "board") {
    // side view: the enemy galleon slides in, our banner runs up, the captain swings across → treasure chest pops up
    const boardAt = (v.boardAt ?? 0.32) * dur;
    const goldAt = (v.goldAt ?? 0.6) * dur;
    const payAt = (v.payAt ?? 0.75) * dur;
    const ex = interpolate(f, [0, boardAt], [1250, 840], { ...clamp, easing: Easing.out(Easing.cubic) });
    const flagP = interpolate(f, [2, 14], [0.05, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const jt = interpolate(f, [boardAt, boardAt + 12], [0, 1], clamp);
    const jx = lerp(300, 790, jt);
    const jy = lerp(1420, 1345, jt) - Math.sin(jt * Math.PI) * 260;
    const chestP = popIn(f, goldAt, 8);
    const open = interpolate(f, [goldAt + 5, goldAt + 11], [0, 1], clamp);
    body = (
      <>
        <Sky h={1150} f={f} sun={[170, 430]} />
        <Sea y0={1080} f={f} />
        <Ship x={ex} y={1450} s={0.66} f={f} dir={-1} big flag="enemy" rollK={1.5} />
        <Ship x={215} y={1570} s={0.62} f={f} flag="red" flagP={flagP} />
        {jt > 0 ? (
          <g>
            <path d={`M 560 860 L ${jx - 66} ${jy - 270}`} stroke={INK} strokeWidth={6} />
            <Captain x={jx} y={jy} s={0.26} f={f} raise={1} letter={false} face="shout" />
          </g>
        ) : null}
        <Bang x={720} y={820} text="BOARD!" p={f < goldAt ? popIn(f, boardAt + 2, 7) : 0} f={f} size={120} rot={-8} />
        {chestP > 0 ? (
          <g>
            <rect x={0} y={1440} width={1080} height={480} fill={WOOD_HI} opacity={Math.min(1, chestP)} />
            <path d="M 0 1440 L 1080 1440" stroke={INK} strokeWidth={6} opacity={Math.min(1, chestP)} />
            <Chest x={540} y={1880} s={1.05 * chestP} f={f} open={open} />
          </g>
        ) : null}
        <Chip x={540} y={v.chipY ?? 900} text={v.chip ?? "NO LOOT = NO PAY"} p={popIn(f, payAt, 8)} w={720} size={62} bg={C.mustard} rot={-3} />
      </>
    );
  } else if (mode === "letter") {
    // close-up: a gust rips the letter out of his hand → shocked face, PIRATE! stamp, a noose drops in
    const lostAt = (v.lostAt ?? 0.18) * dur;
    const pirateAt = (v.pirateAt ?? 0.55) * dur;
    const lt = interpolate(f, [lostAt, lostAt + 18], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const S = 1.45;
    const X = 560;
    const Y = 2210;
    const hand: P = [X - 265 * S, Y - 1034 * S];
    const gust = interpolate(f, [lostAt - 4, lostAt + 4, lostAt + 16], [0, 1, 0], clamp);
    body = (
      <>
        <Sky h={1400} f={f} sun={[880, 380]} />
        <Sea y0={1330} f={f} rows={5} />
        <Deck rail={1560} />
        <Captain x={X} y={Y} s={S} f={f} raise={1} letter={lt <= 0} face={f >= lostAt + 3 ? "shock" : "grin"} swing={0.4} />
        {lt > 0 ? <Letter x={lerp(hand[0], 1300, lt)} y={lerp(hand[1], 120, lt) - Math.sin(lt * Math.PI) * 120} s={S * 1.05 * (1 - lt * 0.4)} f={f} rot={lt * 540} glint={false} /> : null}
        {gust > 0
          ? [0, 1, 2, 3].map((k) => (
              <path key={k} d={`M ${-100 + gust * 400 + k * 60} ${700 + k * 120} q 220 -40 440 0 t 300 -30`} stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={gust * 0.85} strokeLinecap="round" />
            ))
          : null}
        <Noose x={190} y={1230} f={f} p={interpolate(f, [pirateAt + 4, pirateAt + 14], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) })} />
      </>
    );
    overlay = <Stamp x={560} y={v.stampY ?? 560} text={v.stampText ?? "PIRATE!"} p={popIn(f, pirateAt, 7)} w={560} />;
  } else if (mode === "charter") {
    // sunset at sea ("AND TODAY?") → flash → the US Constitution, the letters-of-marque clause glowing under a highlighter
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      sky = "dawn";
      body = (
        <>
          <Sky h={1260} f={f} sun={[540, 1150]} dusk />
          <Sea y0={1180} f={f} dusk />
          <Ship x={lerp(380, 470, f / Math.max(1, answerAt))} y={1230} s={0.42} f={f} hull="#3A2A4A" />
        </>
      );
    } else {
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 7], [1, 0], clamp);
      const hl = interpolate(lf, [6, 20], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
      const pageP = interpolate(lf, [0, 8], [0.85, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep059sky)" />
          <circle cx={540} cy={1000} r={700} fill="url(#ep059glow)" opacity={0.6} />
          <Capitol x={540} y={1760} s={0.95} />
          <rect x={0} y={1740} width={1080} height={180} fill="#7FB069" />
          <Charter x={540} y={540} s={pageP} hl={hl} />
          <Quill x={900} y={1330} s={1.1} rot={22} />
          <Chip x={540} y={v.chipY ?? 1620} text={v.chip ?? "ARTICLE I · SECTION 8"} p={popIn(lf, 14, 8)} w={760} size={60} bg={C.mustard} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
        {overlay}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "charter" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
    </Backdrop>
  );
};
