import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, bodyFont, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep018 Film projectionist (nitrate era) – one man in a cramped booth beside a roaring carbon-arc projector.
// Nitrate film carries its own oxygen (it can keep burning under water), so booths were fireproofed and port windows
// got metal fire shutters; features ran on two projectors, switched on the cue dots in the top-right corner.
// Twist: today the film is a hard drive and often nobody is in the booth.
// visual: { mode: "booth" | "reel" | "tank" | "screen" | "today", headline?, accent?, top?, size?, tag?, tagX?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?,
//           fireAt?, shutterAt? (booth), igniteAt? (reel), dropAt? (tank), cueAt?, cue2At?, switchAt? (screen),
//           answer?, answerAccent?, answerAt?, answerSize? (today) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const WALL = "#E9C68E";
const WALL_D = "#C99A62";
const PANEL = "#8C5A3A";
const FLOOR = "#6E4A30";
const FLOOR_D = "#5A3B25";
const STEEL = "#8C98A4";
const STEEL_D = "#5F6A75";
const STEEL_HI = "#B9C4CE";
const PROJ = "#2F4A4C";
const PROJ_D = "#223536";
const PROJ_HI = "#45686A";
const BRASS = "#D9A441";
const LENS = "#9CC9CF";
const FILM = "#7A4A22";
const FILM_D = "#5E3618";
const SHIRT = "#F6F1E6";
const SHIRT_D = "#D8CDB8";
const VEST = "#7A2E2E";
const TROUSER = "#3A3A48";
const SKIN = "#E9BB95";
const SKIN_D = "#C98E68";
const HAIR = "#3A2A1E";
const TIE = "#2E7D7A";
const F1 = "#FF6A1A";
const F2 = "#FFC23A";
const F3 = "#FFF2A8";
const BEAM = "#FFF6D8";

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : side === "alt-right" ? i % 2 === 1 : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 70 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string }> = ({ x, y, p, text, rot = -8, size = 84, col = C.mustard }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 205;
      return `${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 0.7}`;
    })
    .join(" ");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <polygon points={pts} fill={col} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <text x={0} y={size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// flickering cartoon flame, origin = base centre
export const Flame: React.FC<{ x: number; y: number; s?: number; f: number; k?: number }> = ({ x, y, s = 1, f, k = 0 }) => {
  const w = (n: number) => Math.sin(f / 2.3 + n * 1.7 + k) * 12;
  const h = 1 + Math.sin(f / 3.1 + k) * 0.1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${s * h})`}>
      <path d={`M -70 0 Q -96 -80 ${-34 + w(1)} -150 Q -20 -96 ${-2 + w(2) * 0.5} ${-215 + w(2)} Q 24 -110 ${44 + w(3)} -165 Q 96 -80 70 0 Z`} fill={F1} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -44 -4 Q -54 -60 ${-14 + w(4) * 0.6} -112 Q 0 -72 ${12 + w(5) * 0.6} -134 Q 52 -60 44 -4 Z`} fill={F2} />
      <path d={`M -22 -4 Q -24 -36 ${w(6) * 0.4} -74 Q 24 -36 22 -4 Z`} fill={F3} />
    </g>
  );
};

const sector = (r1: number, r2: number, a1: number, a2: number) => {
  const p = (r: number, a: number) => `${(r * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return `M ${p(r1, a1)} L ${p(r2, a1)} A ${r2} ${r2} 0 0 1 ${p(r2, a2)} L ${p(r1, a2)} A ${r1} ${r1} 0 0 0 ${p(r1, a1)} Z`;
};

// open steel film reel; the brown film pack shows through 5 windows
export const Reel: React.FC<{ x: number; y: number; r: number; rot: number; col?: string }> = ({ x, y, r, rot, col = STEEL }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r + 4} fill="#000" opacity={0.15} cx={10} cy={14} />
    <circle r={r} fill={col} stroke={INK} strokeWidth={Math.max(5, r * 0.035)} />
    <circle r={r * 0.93} fill="none" stroke={STEEL_HI} strokeWidth={Math.max(3, r * 0.02)} opacity={0.7} />
    <g transform={`rotate(${rot})`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={sector(r * 0.3, r * 0.86, i * 72 + 8, i * 72 + 56)} fill={FILM} stroke={INK} strokeWidth={Math.max(4, r * 0.025)} strokeLinejoin="round" />
          <path d={sector(r * 0.55, r * 0.56, i * 72 + 10, i * 72 + 54)} fill="none" stroke={FILM_D} strokeWidth={Math.max(2, r * 0.012)} />
          <path d={sector(r * 0.72, r * 0.73, i * 72 + 10, i * 72 + 54)} fill="none" stroke={FILM_D} strokeWidth={Math.max(2, r * 0.012)} />
        </g>
      ))}
      <rect x={-r * 0.05} y={-r * 0.3} width={r * 0.1} height={r * 0.14} fill={INK} />
    </g>
    <circle r={r * 0.22} fill={STEEL_HI} stroke={INK} strokeWidth={Math.max(4, r * 0.03)} />
    <circle r={r * 0.07} fill={INK} />
  </g>
);

// carbon-arc 35 mm projector, facing LEFT (lens on the left), origin = floor centre under the pedestal.
// beam: 0..1 opacity of the light beam; beamLen: how far it reaches to the left; fire: 0..1 flames at the gate
export const Projector: React.FC<{ x: number; y: number; s?: number; f: number; beam?: number; beamLen?: number; fire?: number; spin?: number }> = ({ x, y, s = 1, f, beam = 1, beamLen = 700, fire = 0, spin = 1 }) => {
  const rot = f * 7 * spin;
  const flick = 0.85 + Math.sin(f * 1.7) * 0.08 + Math.sin(f * 4.3) * 0.05;
  const lx = -306;
  const ly = -538;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* light beam out of the lens */}
      {beam > 0 ? (
        <g opacity={beam}>
          <polygon points={`${lx},${ly - 26} ${lx - beamLen},${ly - 26 - beamLen * 0.22} ${lx - beamLen},${ly + 26 + beamLen * 0.22} ${lx},${ly + 26}`} fill={BEAM} opacity={0.42 * flick} />
          <polygon points={`${lx},${ly - 12} ${lx - beamLen},${ly - 12 - beamLen * 0.1} ${lx - beamLen},${ly + 12 + beamLen * 0.1} ${lx},${ly + 12}`} fill="#FFFFFF" opacity={0.5 * flick} />
          {new Array(14).fill(0).map((_, i) => {
            const t = ((f * 0.6 + random(`mote${i}`) * 100) % 100) / 100;
            const mx = lx - t * beamLen;
            const my = ly + (random(`moy${i}`) - 0.5) * (40 + t * beamLen * 0.36);
            return <circle key={i} cx={mx} cy={my} r={2 + random(`mor${i}`) * 3} fill="#FFFFFF" opacity={0.7 * (1 - t)} />;
          })}
        </g>
      ) : null}
      <ellipse cx={0} cy={6} rx={230} ry={26} fill="#000" opacity={0.25} />
      {/* chimney from the lamphouse up through the ceiling */}
      <rect x={180} y={-2100} width={52} height={1410} fill={STEEL_D} stroke={INK} strokeWidth={6} />
      <rect x={172} y={-760} width={68} height={24} fill={STEEL} stroke={INK} strokeWidth={5} />
      {/* base + pedestal */}
      <rect x={-170} y={-36} width={340} height={36} rx={10} fill={PROJ_D} stroke={INK} strokeWidth={6} />
      <path d="M -84 -36 L -52 -410 L 52 -410 L 84 -36 Z" fill={PROJ} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -30 -60 L -16 -390" stroke={PROJ_HI} strokeWidth={8} opacity={0.7} />
      {/* film path: upper reel -> head -> lower reel */}
      <path d="M -150 -870 L -150 -640 M -150 -420 Q -170 -330 -150 -260" stroke={FILM} strokeWidth={10} fill="none" />
      {/* lower take-up reel */}
      <Reel x={-110} y={-230} r={130} rot={rot * 1.3} />
      {/* lamphouse (carbon arc) */}
      <rect x={86} y={-704} width={236} height={300} rx={40} fill={PROJ_HI} stroke={INK} strokeWidth={7} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${120 + k * 26} -680 L ${120 + k * 26} -620`} stroke={PROJ_D} strokeWidth={8} strokeLinecap="round" />
      ))}
      <circle cx={210} cy={-540} r={96} fill={F2} opacity={0.25 * flick} />
      <circle cx={210} cy={-540} r={58} fill="#FFF8D6" stroke={INK} strokeWidth={7} opacity={flick} />
      <circle cx={210} cy={-540} r={58} fill="none" stroke={F1} strokeWidth={10} opacity={0.8} />
      <path d={`M 186 -540 L ${204 + Math.sin(f) * 2} -540 M 216 -540 L 234 -540`} stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <circle cx={210} cy={-540} r={8} fill="#FFFFFF" opacity={0.6 + Math.sin(f * 3) * 0.4} />
      {/* sparks from the vent */}
      {new Array(6).fill(0).map((_, k) => {
        const p = ((f + k * 7) % 26) / 26;
        return <circle key={k} cx={110 + k * 36 + Math.sin(p * 9 + k) * 18} cy={-708 - p * 150} r={6 * (1 - p) + 2} fill={k % 2 ? F2 : F1} opacity={1 - p} />;
      })}
      {/* mechanism head */}
      <rect x={-196} y={-664} width={292} height={262} rx={26} fill={PROJ} stroke={INK} strokeWidth={7} />
      <rect x={-180} y={-650} width={262} height={22} rx={8} fill={BRASS} stroke={INK} strokeWidth={4} />
      <circle cx={-64} cy={-526} r={52} fill={PROJ_D} stroke={INK} strokeWidth={6} />
      <circle cx={-64} cy={-526} r={34} fill="#FFE9A8" opacity={0.75 * flick} stroke={INK} strokeWidth={4} />
      {[-150, 40].map((kx) => (
        <g key={kx} transform={`translate(${kx} -470) rotate(${rot * 2})`}>
          <circle r={22} fill={STEEL} stroke={INK} strokeWidth={4} />
          <path d="M -14 0 L 14 0 M 0 -14 L 0 14" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {/* lens barrel */}
      <rect x={lx + 4} y={ly - 34} width={112} height={68} rx={10} fill={BRASS} stroke={INK} strokeWidth={6} />
      <rect x={lx + 30} y={ly - 38} width={14} height={76} fill="#B58630" stroke={INK} strokeWidth={4} />
      <ellipse cx={lx + 4} cy={ly} rx={16} ry={38} fill={LENS} stroke={INK} strokeWidth={6} />
      {/* upper feed reel on its arm */}
      <rect x={-162} y={-900} width={24} height={250} fill={PROJ_D} stroke={INK} strokeWidth={5} />
      <Reel x={-40} y={-880} r={220} rot={rot} />
      {/* fire at the gate */}
      {fire > 0 ? (
        <g opacity={Math.min(1, fire * 2)}>
          <Flame x={-90} y={-600} s={0.8 * fire} f={f} k={1} />
          <Flame x={-160} y={-640} s={0.6 * fire} f={f} k={2.4} />
          <Flame x={-20} y={-650} s={0.55 * fire} f={f} k={4} />
        </g>
      ) : null}
    </g>
  );
};

// the projectionist: slicked hair, moustache, rolled shirtsleeves, waistcoat + tie; faces LEFT; origin = feet.
// reach = front hand position (local units); shock 0..1 (raised brows, wide eye, sweat)
export const Man: React.FC<{ x: number; y: number; s?: number; f: number; reach?: [number, number]; shock?: number; opacity?: number }> = ({ x, y, s = 1, f, reach = [-240, -850], shock = 0, opacity = 1 }) => {
  const bob = Math.sin(f / 9) * 3;
  const S: [number, number] = [-80, -770];
  const H = reach;
  const E: [number, number] = [(S[0] + H[0]) / 2 + 10, (S[1] + H[1]) / 2 + 70];
  const arm = (a: [number, number], b: [number, number], col: string, w: number) => (
    <>
      <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} strokeLinecap="round" />
      <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <ellipse cx={0} cy={4} rx={160} ry={22} fill="#000" opacity={0.25} />
      {/* legs */}
      <path d="M -74 -470 L -66 -24 L -8 -24 L -2 -470 Z" fill={TROUSER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 4 -470 L 12 -24 L 68 -24 L 74 -470 Z" fill={TROUSER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={-56} cy={-14} rx={56} ry={18} fill="#1E1714" stroke={INK} strokeWidth={5} />
      <ellipse cx={30} cy={-14} rx={52} ry={18} fill="#1E1714" stroke={INK} strokeWidth={5} />
      <g transform={`translate(0 ${bob})`}>
        {/* back arm hanging */}
        {arm([86, -760], [116, -630], SHIRT, 50)}
        <circle cx={116} cy={-630} r={27} fill={SHIRT_D} stroke={INK} strokeWidth={5} />
        {arm([116, -630], [104, -520], SKIN, 38)}
        <circle cx={104} cy={-512} r={25} fill={SKIN} stroke={INK} strokeWidth={5} />
        {/* torso */}
        <path d="M -102 -800 Q -122 -620 -98 -462 L 98 -462 Q 122 -620 102 -800 Q 0 -842 -102 -800 Z" fill={SHIRT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -98 -790 L -44 -796 L -24 -640 L -4 -796 L 72 -792 Q 100 -620 94 -470 L -94 -470 Q -114 -620 -98 -790 Z" fill={VEST} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -36 -800 L -12 -800 L -10 -680 L -24 -658 L -38 -680 Z" fill={TIE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -52 -812 L -24 -790 L -46 -770 Z M 4 -812 L -18 -790 L 10 -772 Z" fill={SHIRT} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        {[-620, -580, -540, -500].map((by) => (
          <circle key={by} cx={-22 + (by + 620) * 0.02} cy={by} r={7} fill={BRASS} stroke={INK} strokeWidth={3} />
        ))}
        <rect x={-98} y={-486} width={196} height={22} fill="#2A2420" stroke={INK} strokeWidth={4} />
        <path d="M 40 -760 Q 60 -640 52 -500" stroke="#5E2222" strokeWidth={6} fill="none" opacity={0.6} />
        {/* neck + head */}
        <rect x={-30} y={-862} width={58} height={70} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={-6} cy={-924} r={88} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M 46 -940 Q 70 -930 64 -906 Q 58 -892 44 -900" fill={SKIN_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -92 -934 Q -120 -904 -88 -892" fill={SKIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <ellipse cx={-50} cy={-938} rx={17 + shock * 4} ry={19 + shock * 5} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <ellipse cx={-56} cy={-936} rx={8 + shock * 2} ry={11 + shock * 3} fill={INK} />
        <circle cx={-59} cy={-941} r={3} fill="#FFFFFF" />
        <path d={`M -74 ${-970 - shock * 16} L -28 ${-962 - shock * 18}`} stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
        <path d="M -88 -882 Q -62 -868 -38 -884 Q -60 -862 -90 -874 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
        {shock > 0.3 ? <ellipse cx={-56} cy={-850} rx={12} ry={14} fill={INK} /> : <path d="M -72 -858 Q -58 -852 -44 -860" stroke={INK} strokeWidth={4} fill="none" />}
        <path d="M -94 -944 Q -94 -1030 -4 -1022 Q 88 -1016 84 -906 Q 70 -952 34 -958 Q -24 -990 -94 -944 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -60 -990 Q -10 -1010 40 -992" stroke="#6A5240" strokeWidth={6} fill="none" />
        {shock > 0.3 ? <path d="M 60 -980 q 12 20 0 30 q -12 -10 0 -30 Z" fill="#9CD3F0" stroke={INK} strokeWidth={3} /> : null}
        {/* front arm reaching */}
        {arm(S, E, SHIRT, 52)}
        <circle cx={E[0]} cy={E[1]} r={28} fill={SHIRT_D} stroke={INK} strokeWidth={5} />
        {arm(E, H, SKIN, 40)}
        <circle cx={H[0]} cy={H[1]} r={28} fill={SKIN} stroke={INK} strokeWidth={5} />
      </g>
    </g>
  );
};

const Bucket: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -150 Q 0 -230 70 -150" stroke={INK} strokeWidth={7} fill="none" />
    <path d="M -80 -150 L 80 -150 L 62 0 L -62 0 Z" fill={C.brick} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={-150} rx={80} ry={16} fill="#E6D3A6" stroke={INK} strokeWidth={6} />
    <text x={0} y={-56} textAnchor="middle" fontFamily={titleFont} fontSize={42} fill={C.cream}>
      FIRE
    </text>
  </g>
);

const Cans: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => (
      <g key={k} transform={`translate(${(k % 2) * 14} ${-k * 70})`}>
        <rect x={-150} y={-70} width={300} height={60} fill={STEEL} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-10} rx={150} ry={24} fill={STEEL_D} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-70} rx={150} ry={24} fill={STEEL_HI} stroke={INK} strokeWidth={6} />
        <rect x={-70} y={-56} width={140} height={34} fill={C.brick} stroke={INK} strokeWidth={4} />
        <text x={0} y={-30} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={24} fill={C.cream}>
          NITRATE
        </text>
      </g>
    ))}
  </g>
);

// cramped booth wall: port window on the left with a steel fire shutter above it (shutter 0..1 = dropped)
const BoothRoom: React.FC<{ f: number; shutter: number; glow?: number }> = ({ f, shutter, glow = 0 }) => {
  const sy = 990 + shutter * 176;
  return (
    <>
      <defs>
        <radialGradient id="ep018lamp" cx="0.6" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#FFE7A8" stopOpacity={0.85} />
          <stop offset="1" stopColor={WALL} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={WALL} />
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep018lamp)" opacity={0.8 + Math.sin(f * 1.3) * 0.08} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M 0 ${560 + k * 160} L 1080 ${560 + k * 160}`} stroke={WALL_D} strokeWidth={4} opacity={0.5} />
      ))}
      <rect x={0} y={1480} width={1080} height={230} fill={PANEL} stroke={INK} strokeWidth={6} />
      <rect x={0} y={1700} width={1080} height={220} fill={FLOOR} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M 0 ${1740 + k * 50} L 1080 ${1740 + k * 50}`} stroke={FLOOR_D} strokeWidth={5} />
      ))}
      {/* NO SMOKING sign */}
      <g transform="translate(70 640) rotate(-3)">
        <rect width={300} height={84} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={150} y={58} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick}>
          NO SMOKING
        </text>
      </g>
      {/* port window + rails + shutter */}
      <rect x={18} y={1170} width={154} height={156} fill="#140F0C" stroke={INK} strokeWidth={7} />
      <rect x={4} y={960} width={14} height={380} fill={STEEL_D} stroke={INK} strokeWidth={4} />
      <rect x={172} y={960} width={14} height={380} fill={STEEL_D} stroke={INK} strokeWidth={4} />
      <path d={`M 95 860 L 95 ${sy}`} stroke={INK} strokeWidth={5} strokeDasharray="10 6" />
      <circle cx={95} cy={860} r={14} fill={STEEL} stroke={INK} strokeWidth={4} />
      <g transform={`translate(0 ${sy})`}>
        <rect x={12} y={0} width={166} height={170} fill={STEEL} stroke={INK} strokeWidth={7} />
        <rect x={24} y={12} width={142} height={146} fill="none" stroke={STEEL_HI} strokeWidth={4} />
        {[30, 160].map((rx) => [24, 146].map((ry) => <circle key={`${rx}-${ry}`} cx={rx} cy={ry} r={6} fill={STEEL_D} />))}
        <text x={95} y={98} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={26} fill={INK}>
          FIRE
        </text>
        <text x={95} y={126} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={26} fill={INK}>
          SHUTTER
        </text>
      </g>
      {glow > 0 ? <rect x={0} y={0} width={1080} height={1920} fill={F1} opacity={glow * 0.18} /> : null}
    </>
  );
};

const WarmWall: React.FC<{ f: number; glow?: number; floorY?: number }> = ({ f, glow = 0, floorY = 1640 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill={WALL} />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <path key={k} d={`M 0 ${560 + k * 160} L 1080 ${560 + k * 160}`} stroke={WALL_D} strokeWidth={4} opacity={0.45} />
    ))}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={FLOOR} />
    <path d={`M 0 ${floorY} L 1080 ${floorY}`} stroke={INK} strokeWidth={6} />
    {glow > 0 ? <rect x={0} y={0} width={1080} height={1920} fill={F1} opacity={glow * (0.16 + Math.sin(f * 1.9) * 0.04)} /> : null}
  </>
);

const O2: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => (
  <g transform={`translate(${x} ${y}) scale(${p})`}>
    <rect x={-110} y={-36} width={220} height={72} rx={36} fill="#DFF3FA" stroke={INK} strokeWidth={6} />
    <text x={0} y={13} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={38} fill={INK}>
      OXYGEN
    </text>
  </g>
);

const Chair: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const turn = Math.cos(f / 22);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={18} fill="#000" opacity={0.3} />
      {[-120, -40, 40, 120].map((wx) => (
        <circle key={wx} cx={wx * 0.9} cy={-14} r={16} fill="#111" stroke={INK} strokeWidth={4} />
      ))}
      <path d="M -120 -24 L 120 -24" stroke="#333A48" strokeWidth={14} strokeLinecap="round" />
      <rect x={-10} y={-200} width={20} height={176} fill="#5B6476" stroke={INK} strokeWidth={4} />
      <g transform={`scale(${0.75 + 0.25 * Math.abs(turn)} 1)`}>
        <rect x={-120} y={-250} width={240} height={56} rx={24} fill="#3B4A6B" stroke={INK} strokeWidth={6} />
        <rect x={-100} y={-520} width={200} height={250} rx={40} fill="#3B4A6B" stroke={INK} strokeWidth={6} />
        <rect x={-14} y={-280} width={28} height={40} fill="#5B6476" stroke={INK} strokeWidth={4} />
      </g>
    </g>
  );
};

type Pt = [number, number];
const bez = (a: Pt, b: Pt, c: Pt, t: number): Pt => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];

export const Projectionist18: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "booth";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let sky: "paper" | "dark" | "modern" = "paper";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  const ansF = Math.round((v.answerAt ?? 0.45) * dur);
  const driveF = Math.round((v.driveAt ?? Math.max(0, (v.answerAt ?? 0.45) - 0.2)) * dur);

  if (mode === "booth") {
    // frame 0: the projectionist with his hand on the big feed reel, carbon arc roaring, beam out of the port
    const fireF = v.fireAt !== undefined ? v.fireAt * dur : -1;
    const shutF = v.shutterAt !== undefined ? v.shutterAt * dur : -1;
    const fire = fireF >= 0 ? popIn(f, fireF, 8) : 0;
    const shut = shutF >= 0 ? interpolate(f, [shutF, shutF + 4], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) }) : 0;
    const shock = fireF >= 0 ? ease(f, fireF, fireF + 5) : 0;
    const reach: Pt = [-245 + Math.sin(f / 6) * 6 + shock * 20, -853 - shock * 60];
    const shake = shutF >= 0 && f >= shutF + 4 && f < shutF + 12 ? Math.sin(f * 5) * 10 : 0;
    body = (
      <g transform={`translate(${shake} 0)`}>
        <BoothRoom f={f} shutter={shut} glow={fire} />
        <Bucket x={130} y={1800} s={0.95} />
        <Cans x={1000} y={1860} s={0.8} />
        <Projector x={470} y={1760} s={0.95} f={f} beamLen={shut > 0.5 ? 6 : 600} fire={fire} />
        <Man x={850} y={1830} s={1.02} f={f} reach={reach} shock={shock} />
        <Burst x={330} y={1060} p={shutF >= 0 ? popIn(f, shutF + 3, 7) : 0} text="SLAM!" rot={-8} size={80} />
      </g>
    );
  } else if (mode === "reel") {
    // close-up: the nitrate reel; a spark runs up the loose film and the reel goes up in flames, O2 pops out
    const ig = (v.igniteAt ?? 0.3) * dur;
    const P0: Pt = [300, 1340];
    const P1: Pt = [80, 1560];
    const P2: Pt = [330, 1800];
    const d = `M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;
    const front = interpolate(f, [ig, ig + 12], [1, 0], clamp);
    const lit = f >= ig;
    const rim = popIn(f, ig + 10, 10);
    body = (
      <>
        <WarmWall f={f} glow={lit ? Math.min(1, (f - ig) / 10) : 0} />
        <path d={d} stroke={INK} strokeWidth={74} fill="none" strokeLinecap="round" />
        <path d={d} stroke={FILM} strokeWidth={60} fill="none" strokeLinecap="round" />
        <path d={d} stroke="#A0683A" strokeWidth={36} fill="none" strokeDasharray="46 10" />
        <Reel x={560} y={1040} r={380} rot={f * 3} />
        <g transform="translate(830 1840)">
          <ellipse cx={0} cy={-10} rx={190} ry={40} fill={STEEL_D} stroke={INK} strokeWidth={7} />
          <rect x={-190} y={-80} width={380} height={70} fill={STEEL} stroke={INK} strokeWidth={7} />
          <ellipse cx={0} cy={-80} rx={190} ry={40} fill={STEEL_HI} stroke={INK} strokeWidth={7} />
          <rect x={-120} y={-66} width={240} height={46} fill={C.brick} stroke={INK} strokeWidth={5} />
          <text x={0} y={-31} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={34} fill={C.cream}>
            NITRATE
          </text>
        </g>
        {lit
          ? [0.98, 0.84, 0.7, 0.56, 0.42, 0.28, 0.14, 0.02].map((t, i) => {
              if (t < front) return null;
              const [px, py] = bez(P0, P1, P2, t);
              return <Flame key={i} x={px} y={py + 20} s={0.62 + (i % 3) * 0.08} f={f} k={i * 1.3} />;
            })
          : null}
        {lit && f < ig + 3 ? <circle cx={P2[0]} cy={P2[1]} r={40} fill={F3} opacity={0.9} /> : null}
        {rim > 0
          ? [200, 225, 250, 275, 300, 325, 350, 175, 150].map((a, i) => (
              <Flame key={a} x={560 + Math.cos((a * Math.PI) / 180) * 360} y={1040 + Math.sin((a * Math.PI) / 180) * 360 + 40} s={(0.75 + (i % 2) * 0.2) * rim} f={f} k={i * 0.9} />
            ))
          : null}
        {[0, 1, 2, 3].map((k) => {
          const st = ig + 16 + k * 5;
          if (f < st) return null;
          const age = f - st;
          return <O2 key={k} x={250 + k * 190 + Math.sin(age / 5 + k) * 14} y={1000 - age * 5 + (k % 2) * 70} p={popIn(f, st, 7) * interpolate(age, [24, 34], [1, 0], clamp)} />;
        })}
      </>
    );
  } else if (mode === "tank") {
    // a burning reel dropped into a tank of water: it keeps burning, bubbles everywhere
    const dropF = (v.dropAt ?? 0.3) * dur;
    const p = interpolate(f, [dropF, dropF + 9], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const ry = interpolate(p, [0, 1], [700, 1400]);
    const wet = f >= dropF + 5;
    const splash = wet ? interpolate(f, [dropF + 5, dropF + 20], [0, 1], clamp) : 0;
    body = (
      <>
        <WarmWall f={f} glow={0.6} floorY={1700} />
        <rect x={120} y={1700} width={840} height={60} fill="#6B4A32" stroke={INK} strokeWidth={6} />
        <rect x={170} y={960} width={740} height={740} fill="#CFEAF2" opacity={0.5} stroke={INK} strokeWidth={10} />
        <Reel x={540} y={ry} r={170} rot={f * 5} />
        <rect x={180} y={1080 + Math.sin(f / 4) * 4} width={720} height={612 - Math.sin(f / 4) * 4} fill="#3E9AC0" opacity={0.5} />
        <path d={`M 180 ${1080 + Math.sin(f / 4) * 4} Q 360 ${1066 + Math.sin(f / 3) * 8} 540 ${1080} T 900 ${1080 + Math.sin(f / 4) * 4}`} stroke="#E8F7FC" strokeWidth={8} fill="none" />
        <g opacity={wet ? 0.95 : 1}>
          <Flame x={540} y={ry - 120} s={0.95} f={f} k={0} />
          <Flame x={430} y={ry - 70} s={0.7} f={f} k={2} />
          <Flame x={650} y={ry - 70} s={0.72} f={f} k={3.5} />
          {wet ? <Flame x={540} y={ry + 120} s={0.6} f={f} k={5} /> : null}
        </g>
        {wet
          ? new Array(16).fill(0).map((_, k) => {
              const life = 22;
              const t = ((f - dropF + k * 3.7) % life) / life;
              const bx = 400 + random(`bx${k}`) * 280 + Math.sin(t * 6 + k) * 16;
              const by = 1380 - t * 300;
              return <circle key={k} cx={bx} cy={by} r={8 + random(`br${k}`) * 14} fill="none" stroke="#FFFFFF" strokeWidth={5} opacity={by > 1085 ? 0.9 : 0} />;
            })
          : null}
        {splash > 0 && splash < 1
          ? [-3, -2, -1, 1, 2, 3].map((k) => (
              <circle key={k} cx={540 + k * 70 * splash * 2} cy={1070 - Math.sin(splash * Math.PI) * (160 - Math.abs(k) * 20)} r={16} fill="#9ED6EC" stroke={INK} strokeWidth={4} />
            ))
          : null}
        <path d="M 196 990 L 196 1680" stroke="#FFFFFF" strokeWidth={10} opacity={0.5} />
        <path d="M 230 990 L 230 1400" stroke="#FFFFFF" strokeWidth={5} opacity={0.4} />
      </>
    );
  } else if (mode === "screen") {
    // the audience view: a dot flashes in the top-right corner of the screen – twice – then SWITCH!
    sky = "dark";
    const cue1 = (v.cueAt ?? 0.25) * dur;
    const cue2 = (v.cue2At ?? 0.5) * dur;
    const sw = (v.switchAt ?? 0.72) * dur;
    const dotOn = (f >= cue1 && f < cue1 + 6) || (f >= cue2 && f < cue2 + 6);
    const ring = popIn(f, cue1, 8);
    const boatX = interpolate(f, [0, dur], [260, 760], clamp);
    const flick = f >= sw && f < sw + 3 ? 0.6 : 0;
    body = (
      <>
        <defs>
          <linearGradient id="ep018sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F59A5A" />
            <stop offset="0.6" stopColor="#FFD27A" />
            <stop offset="1" stopColor="#FFE9B0" />
          </linearGradient>
          <clipPath id="ep018scr">
            <rect x={130} y={570} width={820} height={500} />
          </clipPath>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="#3A1418" />
        <polygon points="300,0 780,0 950,570 130,570" fill={BEAM} opacity={0.07 + Math.sin(f * 1.5) * 0.015} />
        <rect x={110} y={550} width={860} height={540} fill="#1A0C0E" stroke={INK} strokeWidth={8} />
        <g clipPath="url(#ep018scr)">
          <rect x={130} y={570} width={820} height={500} fill="url(#ep018sunset)" />
          <circle cx={540} cy={900} r={110} fill="#FFF4C8" stroke="#F2B544" strokeWidth={8} />
          <rect x={130} y={900} width={820} height={170} fill="#3E7FA0" />
          {[930, 970, 1010].map((wy, k) => (
            <path key={wy} d={`M ${150 + k * 40} ${wy} l 120 0 M ${560 + k * 30} ${wy + 10} l 160 0`} stroke="#9FD0E6" strokeWidth={6} strokeLinecap="round" />
          ))}
          <g transform={`translate(${boatX} ${905 + Math.sin(f / 6) * 4})`}>
            <path d="M -90 0 L 90 0 L 60 40 L -60 40 Z" fill="#7A3B22" stroke={INK} strokeWidth={6} />
            <path d="M 0 -6 L 0 -190 L 80 -14 Z" fill={C.cream} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -8 -20 L -8 -150 L -70 -20 Z" fill="#F4EAD5" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
          {dotOn ? <circle cx={890} cy={630} r={24} fill="#1A1410" stroke="#FFF8E0" strokeWidth={6} /> : null}
          <rect x={130} y={570} width={820} height={500} fill="#FFFFFF" opacity={flick} />
        </g>
        {ring > 0 ? (
          <g transform={`translate(890 630) scale(${ring})`}>
            <circle r={66} fill="none" stroke={C.mustard} strokeWidth={10} strokeDasharray="18 10" transform={`rotate(${f * 4})`} />
          </g>
        ) : null}
        <path d="M 40 560 Q 90 900 40 1160 L 110 1160 L 110 560 Z M 1040 560 Q 990 900 1040 1160 L 970 1160 L 970 560 Z" fill="#9E2A2A" stroke={INK} strokeWidth={6} />
        <rect x={0} y={1120} width={1080} height={800} fill="#2A0E12" />
        {[0, 1].map((row) =>
          new Array(row ? 6 : 5).fill(0).map((_, k) => {
            const hx = row ? 90 + k * 180 : 180 + k * 180;
            const hy = row ? 1660 : 1420;
            const s = row ? 1.25 : 1;
            const hat = (k + row) % 3 === 0;
            return (
              <g key={`${row}-${k}`} transform={`translate(${hx} ${hy + Math.sin(f / 10 + k) * 2}) scale(${s})`}>
                <path d="M -95 140 Q -90 40 0 40 Q 90 40 95 140 Z" fill="#140A0C" stroke="#6E3A2E" strokeWidth={3} />
                <circle cx={0} cy={-10} r={58} fill="#140A0C" stroke="#8C5A44" strokeWidth={3} />
                {hat ? <path d="M -80 -40 L 80 -40 L 50 -60 L 44 -100 L -44 -100 L -50 -60 Z" fill="#1E1416" stroke="#6E3A2E" strokeWidth={3} /> : null}
              </g>
            );
          }),
        )}
        <Burst x={540} y={830} p={f >= sw ? popIn(f, sw, 7) : 0} text="SWITCH!" rot={-6} size={96} />
      </>
    );
  } else if (mode === "today") {
    // twist: the booth today – a digital projector, a server, a hard drive, an empty chair
    sky = "modern";
    const ghost = 1 - ease(f, 2, Math.max(6, ansF - 4));
    const slide = ease(f, driveF, driveF + 10);
    if (f >= ansF && v.answer) headline = undefined;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2B3550" />
        <rect x={0} y={1640} width={1080} height={280} fill="#1C2233" />
        <path d="M 0 1640 L 1080 1640" stroke={INK} strokeWidth={6} />
        <rect x={18} y={880} width={120} height={140} fill="#0A0D16" stroke={INK} strokeWidth={6} />
        <polygon points={`138,940 0,${940 - 40} 0,${960 + 40} 138,960`} fill={BEAM} opacity={0.35} />
        <g opacity={0.9}>
          <Reel x={250} y={680} r={100} rot={-12} col="#7E8794" />
          <path d="M 150 600 Q 200 640 250 580 M 160 640 L 240 600 M 180 700 L 250 680" stroke="#C9D2DE" strokeWidth={2} opacity={0.7} fill="none" />
        </g>
        <rect x={330} y={1040} width={170} height={600} fill="#3A4256" stroke={INK} strokeWidth={6} />
        <rect x={130} y={790} width={590} height={260} rx={34} fill="#14171F" stroke={INK} strokeWidth={8} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={420 + k * 44} y={830} width={22} height={120} rx={8} fill="#232838" />
        ))}
        <circle cx={150} cy={950} r={70} fill="#232838" stroke={INK} strokeWidth={8} />
        <circle cx={150} cy={950} r={44} fill={LENS} stroke={INK} strokeWidth={6} />
        <circle cx={680} cy={1010} r={9} fill="#4CE0FF" opacity={0.6 + Math.sin(f / 3) * 0.4} />
        <rect x={760} y={700} width={260} height={940} rx={14} fill="#20242E" stroke={INK} strokeWidth={8} />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <g key={k}>
            <rect x={784} y={740 + k * 120} width={212} height={90} rx={8} fill="#2C3242" stroke={INK} strokeWidth={4} />
            <circle cx={970} cy={760 + k * 120} r={7} fill={(Math.floor(f / 4) + k) % 3 ? "#43E06B" : "#1E5A2E"} />
            <circle cx={950} cy={760 + k * 120} r={7} fill={(Math.floor(f / 6) + k) % 2 ? "#4CE0FF" : "#1C4A5A"} />
          </g>
        ))}
        <g transform={`translate(${(1 - slide) * 260} 0)`}>
          <rect x={790} y={970} width={200} height={100} rx={10} fill={C.mustard} stroke={INK} strokeWidth={6} />
          <rect x={806} y={986} width={120} height={20} rx={4} fill="#B58630" />
          <text x={890} y={1052} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={30} fill={INK}>
            FEATURE
          </text>
          <circle cx={968} cy={994} r={8} fill="#43E06B" opacity={slide > 0.9 ? 1 : 0.2} />
        </g>
        <Chair x={600} y={1730} s={1.05} f={f} />
        {ghost > 0 ? <Man x={600} y={1760} s={0.95} f={f} reach={[-220, -760]} opacity={ghost * 0.85} /> : null}
        <g transform="translate(60 1430) scale(0.9)">
          <rect width={240} height={170} rx={14} fill="#0E1A2E" stroke={INK} strokeWidth={6} />
          <text x={22} y={58} fontFamily={bodyFont} fontWeight={900} fontSize={34} fill="#43E06B">
            ▶ 7:30 PM
          </text>
          <text x={22} y={112} fontFamily={bodyFont} fontWeight={900} fontSize={34} fill="#4CE0FF">
            AUTO
          </text>
          <rect x={108} y={170} width={24} height={60} fill="#3A4256" />
        </g>
      </>
    );
    overlay = <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: f >= ansF ? interpolate(f, [ansF, ansF + 6], [0.85, 0], clamp) : 0 }} />;
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
      </svg>
      {overlay}
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "today" && v.answer ? (
        <Sequence from={ansF} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 92} />
        </Sequence>
      ) : null}
      {v.tag && !(mode === "today" && f < driveF + 6) ? <Tag text={v.tag} x={v.tagX ?? 540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
