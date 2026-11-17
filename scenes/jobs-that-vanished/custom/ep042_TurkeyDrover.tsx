import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep042 Turkey drover – the men and boys who WALKED hundreds of turkeys to market (Thanksgiving episode).
// Look: a warm AUTUMN PRAIRIE (gold sky, orange trees, dusty road) – unlike ep062's green summer garden.
// The drover: wide slouch hat, red neckerchief, blue shirt, braces, a long stick with a red rag on the tip.
// visual: { mode: "road" | "wagon" | "roost" | "roof" | "boots" | "pardon", headline?, accent?, top?, size?,
//           tag?, tagY?, float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           chip?, chipAt? (roost), crashAt? (roof), bootsAt? (boots), answer?, answerAccent?, answerAt?, answerSize? (pardon) }
// Light and funny: the turkeys are the stars, the drover is a cheerful, slightly exasperated hero.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const DIRT = "#D9A866";
const DIRT_D = "#B9874F";
const DIRT_HI = "#EBC48A";
const PRAIRIE = "#D7B65A";
const PRAIRIE_D = "#B8963C";
const HILL = "#C9A04E";
const HILL_FAR = "#E3C27E";
const T_ORANGE = "#E0782F";
const T_RED = "#C8452E";
const T_YEL = "#F2B544";
const BARK = "#6E4A2C";
const BARK_D = "#4E321C";
const BODY = "#5B3A26";
const BODY_D = "#3E2718";
const BODY_HI = "#8A5A36";
const TAIL_B = "#C9A26A";
const TAIL_TIP = "#F4EAD5";
const HEAD = "#E8566A";
const HEAD_HI = "#F28A97";
const WATTLE = "#C9283A";
const BEAK = "#F2B544";
const LEG = "#E89A3C";
const SKIN = "#EDB48A";
const SKIN_D = "#C88862";
const SHIRT = "#4F7FC0";
const SHIRT_D = "#3A62A0";
const PANTS = "#6B4A2E";
const PANTS_D = "#523621";
const HAT = "#8A6236";
const HAT_D = "#64431F";
const BOOT = "#3A2617";
const KERCHIEF = "#D8402F";
const RAG = "#E2412F";
const STICK = "#8E6436";
const WOOD = "#A86F3C";
const WOOD_D = "#7A4A22";
const CORN = "#F6C841";
const CORN_D = "#D9A21E";
const MULE = "#8C7462";
const MULE_D = "#6A5546";
const SCHOOL = "#C9452F";
const SCHOOL_D = "#97301F";
const TAR = "#15110E";
const SAND = "#E8C98A";
const LEATHER = "#8A4E25";
const LEATHER_HI = "#B26A35";
const WH = "#F6F3EA";
const WH_D = "#D9D3C4";
const LAWN = "#6FBF55";
const LAWN_D = "#4F9C3E";
const GOLD = "#F2B544";

type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 70 } : { right: 170 }), top: top + i * 118 - Math.min(age, 30) * 0.6, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string }> = ({ x, y, p, text, rot = -8, size = 78, col = C.mustard }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 205;
      return `${Math.cos(a) * r * 1.3},${Math.sin(a) * r * 0.72}`;
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

const Chip: React.FC<{ x: number; y: number; p: number; text: string; w?: number; rot?: number; col?: string; size?: number }> = ({ x, y, p, text, w = 640, rot = -3, col = C.mustard, size = 60 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-56} width={w} height={112} rx={18} fill={col} stroke={INK} strokeWidth={8} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK} textLength={w - 70} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  );

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep042sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F9C46A" />
      <stop offset="0.6" stopColor="#FFE3A6" />
      <stop offset="1" stopColor="#FFF3D2" />
    </linearGradient>
    <linearGradient id="ep042sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5B3F7A" />
      <stop offset="0.45" stopColor="#D0566A" />
      <stop offset="0.8" stopColor="#F59A4A" />
      <stop offset="1" stopColor="#FFD27A" />
    </linearGradient>
    <linearGradient id="ep042blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7CC4F0" />
      <stop offset="1" stopColor="#DDF2FF" />
    </linearGradient>
    <linearGradient id="ep042road" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={DIRT_HI} />
      <stop offset="1" stopColor={DIRT} />
    </linearGradient>
    <radialGradient id="ep042sun">
      <stop offset="0" stopColor="#FFF6D0" stopOpacity={1} />
      <stop offset="0.45" stopColor="#FFE9A0" stopOpacity={0.7} />
      <stop offset="1" stopColor="#FFE9A0" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep042tar" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#4A4038" />
      <stop offset="1" stopColor={TAR} />
    </radialGradient>
  </defs>
);

// ---------- the turkey (side view, facing right; origin = between the feet) ----------
// fan 0..1 (tail fan), flap 0..1 (wings up = flying), perch (sitting on a branch/roof, no legs),
// feet: plain | tar | boots, gobble (beak open), shock (big eye)
type TurkeyProps = {
  x: number;
  y: number;
  s?: number;
  f: number;
  facing?: 1 | -1;
  phase?: number;
  walk?: boolean;
  fan?: number;
  flap?: number;
  perch?: boolean;
  feet?: "plain" | "tar" | "boots";
  gobble?: boolean;
  shock?: boolean;
  lift?: number; // raise one foot 0..1 (for dipping)
  simple?: boolean; // cheap version for big flocks
};

const Foot: React.FC<{ x: number; y: number; kind: "plain" | "tar" | "boots" }> = ({ x, y, kind }) => {
  if (kind === "tar") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M -16 -26 Q -20 -4 -26 2 Q 0 12 30 2 Q 22 -6 14 -26 Z" fill="url(#ep042tar)" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {[
          [-12, -4],
          [2, -12],
          [14, -2],
          [-2, 2],
          [22, -0],
          [-18, -14],
        ].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={2.6} fill={SAND} />
        ))}
        <ellipse cx={-6} cy={-18} rx={4} ry={7} fill="#FFFFFF" opacity={0.5} />
      </g>
    );
  }
  if (kind === "boots") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M -14 -38 L 12 -38 L 12 -12 Q 34 -10 36 2 L -16 2 Z" fill={LEATHER} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-18} y={-44} width={34} height={10} rx={4} fill={LEATHER_HI} stroke={INK} strokeWidth={4} />
        <path d="M -6 -30 l 12 6 M -6 -22 l 12 6 M 6 -30 l -12 6 M 6 -22 l -12 6" stroke={C.cream} strokeWidth={2.5} />
        <path d="M -16 2 L 36 2" stroke={BOOT} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  }
  return <path d={`M ${x} ${y - 4} l 22 4 M ${x} ${y - 4} l -14 6 M ${x} ${y - 4} l 8 8`} stroke={LEG} strokeWidth={6} strokeLinecap="round" fill="none" />;
};

const Turkey: React.FC<TurkeyProps> = ({ x, y, s = 1, f, facing = 1, phase = 0, walk = true, fan = 0.35, flap = 0, perch = false, feet = "plain", gobble = false, shock = false, lift = 0, simple = false }) => {
  const t = (f + phase) / 4;
  const step = walk && !perch ? Math.sin(t) : 0;
  const bob = walk && !perch ? -Math.abs(Math.sin(t)) * 5 : Math.sin((f + phase) / 14) * 1.5;
  const headX = walk ? Math.sin(t * 2) * 6 : 0;
  const pivot: P = [-40, -112];
  const N = simple ? 6 : 9;
  const a0 = lerp(-200, -178, fan);
  const a1 = lerp(-160, -2, fan);
  const L = lerp(72, 128, fan);
  const feathers = new Array(N).fill(0).map((_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / (N - 1)) * Math.PI) / 180;
    return [pivot[0] + Math.cos(a) * L, pivot[1] + Math.sin(a) * L] as P;
  });
  const flapA = flap > 0 ? lerp(-20, -120, flap) + Math.sin((f + phase) / 2) * 35 * flap : 0;
  const open = gobble ? Math.max(0, Math.sin((f + phase) / 3)) : 0;
  const leg1 = -12 + step * 14;
  const leg2 = 14 - step * 14;
  const up1 = walk ? Math.max(0, Math.sin(t)) * 8 : 0;
  const up2 = walk ? Math.max(0, -Math.sin(t)) * 8 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      {!perch && flap < 0.3 ? <ellipse cx={0} cy={2} rx={62} ry={11} fill="#000" opacity={0.16} /> : null}
      <g transform={`translate(0 ${bob})`}>
        {/* tail fan */}
        {feathers.map(([tx, ty], i) => (
          <path key={`o${i}`} d={`M ${pivot[0]} ${pivot[1]} L ${tx} ${ty}`} stroke={INK} strokeWidth={simple ? 30 : 34} strokeLinecap="round" />
        ))}
        {feathers.map(([tx, ty], i) => (
          <g key={`i${i}`}>
            <path d={`M ${pivot[0]} ${pivot[1]} L ${tx} ${ty}`} stroke={i % 2 ? BODY : BODY_D} strokeWidth={simple ? 22 : 26} strokeLinecap="round" />
            {!simple ? <path d={`M ${lerp(pivot[0], tx, 0.72)} ${lerp(pivot[1], ty, 0.72)} L ${lerp(pivot[0], tx, 0.86)} ${lerp(pivot[1], ty, 0.86)}`} stroke={TAIL_B} strokeWidth={24} /> : null}
            <circle cx={tx} cy={ty} r={simple ? 9 : 11} fill={TAIL_TIP} />
          </g>
        ))}
        {/* legs */}
        {!perch ? (
          <g>
            <path d={`M -10 -64 L ${leg1} ${-up1 - lift * 60}`} stroke={INK} strokeWidth={14} strokeLinecap="round" />
            <path d={`M -10 -64 L ${leg1} ${-up1 - lift * 60}`} stroke={LEG} strokeWidth={8} strokeLinecap="round" />
            <Foot x={leg1} y={-up1 - lift * 60} kind={feet} />
            <path d={`M 12 -64 L ${leg2} ${-up2}`} stroke={INK} strokeWidth={14} strokeLinecap="round" />
            <path d={`M 12 -64 L ${leg2} ${-up2}`} stroke={LEG} strokeWidth={8} strokeLinecap="round" />
            <Foot x={leg2} y={-up2} kind={feet} />
          </g>
        ) : null}
        {/* body */}
        <ellipse cx={0} cy={perch ? -80 : -100} rx={66} ry={54} fill={BODY} stroke={INK} strokeWidth={6} />
        {!simple
          ? [0, 1, 2].map((k) => (
              <path key={k} d={`M ${18 + k * 10} ${(perch ? -70 : -90) + k * 14} q 10 10 20 0`} stroke={BODY_HI} strokeWidth={5} fill="none" strokeLinecap="round" />
            ))
          : null}
        {/* wing */}
        <g transform={`rotate(${flapA} 6 ${perch ? -98 : -118})`}>
          <ellipse cx={-30} cy={perch ? -88 : -108} rx={48} ry={26} fill={BODY_HI} stroke={INK} strokeWidth={5} />
          {!simple ? <path d={`M -64 ${perch ? -84 : -104} q 20 12 50 4 M -60 ${perch ? -94 : -114} q 22 8 46 2`} stroke={BODY} strokeWidth={4} fill="none" /> : null}
        </g>
        {/* neck + head */}
        <g transform={`translate(${headX} 0)`}>
          <path d={`M 38 ${perch ? -104 : -124} Q 64 -150 64 ${perch ? -166 : -182}`} stroke={INK} strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d={`M 38 ${perch ? -104 : -124} Q 64 -150 64 ${perch ? -166 : -182}`} stroke={HEAD} strokeWidth={20} fill="none" strokeLinecap="round" />
          <g transform={`translate(0 ${perch ? 16 : 0})`}>
            <circle cx={66} cy={-192} r={19} fill={HEAD} stroke={INK} strokeWidth={5} />
            <ellipse cx={60} cy={-200} rx={7} ry={4} fill={HEAD_HI} />
            <path d={`M 82 ${-197 - open * 4} L 104 ${-191 - open * 6} L 82 -186 Z`} fill={BEAK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            {open > 0.1 ? <path d={`M 82 -184 L 100 ${-180 + open * 6} L 82 -178 Z`} fill={BEAK} stroke={INK} strokeWidth={4} strokeLinejoin="round" /> : null}
            <path d="M 80 -204 Q 92 -200 92 -184 Q 92 -172 98 -166" stroke={WATTLE} strokeWidth={7} fill="none" strokeLinecap="round" />
            <ellipse cx={70} cy={-170} rx={9} ry={14} fill={WATTLE} stroke={INK} strokeWidth={4} />
            <circle cx={73} cy={-197} r={shock ? 9 : 6} fill="#FFFFFF" stroke={INK} strokeWidth={2.5} />
            <circle cx={75} cy={-197} r={shock ? 3.5 : 3.2} fill={INK} />
          </g>
        </g>
      </g>
    </g>
  );
};

// ---------- the drover (3/4 view, facing right; origin = feet centre; ~930 px tall at s = 1) ----------
const Limb: React.FC<{ a: P; k: P; b: P; w: number; col: string }> = ({ a, k, b, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${k[0]} ${k[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

type DroverProps = {
  x: number;
  y: number;
  s?: number;
  f: number;
  facing?: 1 | -1;
  walk?: boolean;
  hat?: "wide" | "cap";
  shirt?: string;
  kid?: boolean;
  mouth?: "grin" | "shout" | "o";
  pose?: "stick" | "hands-up" | "point";
  phase?: number;
};

const Drover: React.FC<DroverProps> = ({ x, y, s = 1, f, facing = 1, walk = true, hat = "wide", shirt = SHIRT, kid = false, mouth = "shout", pose = "stick", phase = 0 }) => {
  const g = f + phase;
  const step = walk ? Math.sin(g / 5) : 0;
  const bob = walk ? -Math.abs(Math.sin(g / 5)) * 10 : Math.sin(g / 18) * 3;
  const swing = walk ? Math.sin(g / 5) * 30 : 0;
  const sway = Math.sin(g / 8) * 5;
  const talk = mouth === "shout" ? 0.5 + Math.max(0, Math.sin(g / 2.6)) * 0.5 : mouth === "o" ? 1 : 0;
  // arms
  const shL: P = [-84, -682];
  const shR: P = [84, -682];
  let elL: P = [-128, -560];
  let haL: P = [-112 - swing * 0.6, -450];
  let elR: P = [196, -626];
  let haR: P = [236, -748];
  if (pose === "hands-up") {
    const w = Math.sin(g / 3) * 12;
    elL = [-190, -760];
    haL = [-200 + w, -900];
    elR = [190, -760];
    haR = [200 - w, -900];
  } else if (pose === "point") {
    elR = [200, -700];
    haR = [330, -760];
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={24} fill="#000" opacity={0.18} />
      <g transform={`translate(0 ${bob})`}>
        {/* legs + boots */}
        <Limb a={[-36, -440]} k={[-40 - step * 30, -236]} b={[-48 - step * 62, -46]} w={74} col={PANTS_D} />
        <ellipse cx={-48 - step * 62 + 14} cy={-24} rx={56} ry={28} fill={BOOT} stroke={INK} strokeWidth={6} />
        <Limb a={[36, -440]} k={[42 + step * 30, -236]} b={[50 + step * 62, -46]} w={74} col={PANTS} />
        <ellipse cx={50 + step * 62 + 16} cy={-24} rx={58} ry={28} fill={BOOT} stroke={INK} strokeWidth={6} />
        {/* back arm */}
        <Limb a={shL} k={elL} b={haL} w={58} col={pose === "hands-up" ? shirt : SHIRT_D} />
        <circle cx={haL[0]} cy={haL[1]} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* torso */}
        <path d="M -98 -700 Q -112 -560 -84 -430 L 84 -430 Q 112 -560 98 -700 Q 0 -730 -98 -700 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -54 -712 L -46 -440 M 54 -712 L 46 -440" stroke={PANTS_D} strokeWidth={16} />
        <path d="M -54 -712 L -46 -440 M 54 -712 L 46 -440" stroke={HAT_D} strokeWidth={8} />
        <rect x={-88} y={-462} width={176} height={34} rx={8} fill={BOOT} stroke={INK} strokeWidth={5} />
        <rect x={-18} y={-460} width={36} height={30} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
        {/* stick with the red rag */}
        {pose === "stick" ? (
          <g transform={`rotate(${sway} ${haR[0]} ${haR[1]})`}>
            <path d={`M ${haR[0] - 40} ${haR[1] + 70} L ${haR[0] + 300} ${haR[1] - 470}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
            <path d={`M ${haR[0] - 40} ${haR[1] + 70} L ${haR[0] + 300} ${haR[1] - 470}`} stroke={STICK} strokeWidth={12} strokeLinecap="round" />
            <path
              d={`M ${haR[0] + 296} ${haR[1] - 462} Q ${haR[0] + 380} ${haR[1] - 470 + Math.sin(g / 2.4) * 30} ${haR[0] + 440} ${haR[1] - 430 + Math.sin(g / 2.4 + 1) * 40} L ${haR[0] + 420} ${haR[1] - 380 + Math.sin(g / 2.4 + 2) * 30} Q ${haR[0] + 360} ${haR[1] - 410 + Math.sin(g / 2.4 + 1) * 20} ${haR[0] + 286} ${haR[1] - 420} Z`}
              fill={RAG}
              stroke={INK}
              strokeWidth={6}
              strokeLinejoin="round"
            />
          </g>
        ) : null}
        {/* front arm */}
        <Limb a={shR} k={elR} b={haR} w={60} col={shirt} />
        <circle cx={haR[0]} cy={haR[1]} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* neck + kerchief */}
        <rect x={-26} y={-748} width={56} height={50} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M -62 -712 Q 6 -688 70 -712 L 14 -630 Z" fill={KERCHIEF} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={10} cy={-704} r={14} fill={KERCHIEF} stroke={INK} strokeWidth={5} />
        {/* head */}
        <circle cx={-48} cy={-782} r={20} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={8} cy={-786} r={kid ? 64 : 68} fill={SKIN} stroke={INK} strokeWidth={7} />
        <ellipse cx={-14} cy={-760} rx={16} ry={11} fill="#F2958A" opacity={0.6} />
        <path d="M 22 -820 q 14 -8 26 0 M 56 -818 q 10 -6 20 2" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <circle cx={36} cy={-800} r={7.5} fill={INK} />
        <circle cx={66} cy={-798} r={7} fill={INK} />
        <path d="M 66 -790 Q 92 -776 72 -764" fill={SKIN_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {!kid ? <path d="M 30 -752 Q 54 -768 78 -754 Q 90 -746 84 -738 Q 62 -752 50 -744 Q 38 -752 22 -740 Q 18 -748 30 -752 Z" fill="#6A4424" stroke={INK} strokeWidth={4} /> : null}
        {talk > 0 ? (
          <ellipse cx={52} cy={-728 + (kid ? -6 : 0)} rx={20} ry={8 + talk * 14} fill="#6E1E1E" stroke={INK} strokeWidth={5} />
        ) : (
          <path d="M 30 -734 Q 52 -716 74 -736" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
        {kid ? <path d="M -40 -838 q 20 -20 40 -6 q 14 -18 34 -4" stroke="#8A5A2A" strokeWidth={14} fill="none" strokeLinecap="round" /> : null}
        {/* hat */}
        {hat === "wide" ? (
          <g>
            <path d="M -70 -836 Q -74 -930 6 -942 Q 90 -932 90 -836 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d="M -2 -938 Q 8 -900 0 -870" stroke={HAT_D} strokeWidth={6} fill="none" />
            <path d="M -68 -858 Q 10 -846 88 -858 L 90 -836 Q 10 -826 -70 -836 Z" fill={HAT_D} stroke={INK} strokeWidth={5} />
            <path d="M -170 -826 Q -150 -856 10 -854 Q 170 -856 196 -820 Q 200 -804 176 -808 Q 10 -826 -150 -806 Q -180 -806 -170 -826 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          </g>
        ) : (
          <g>
            <path d="M -60 -824 Q -62 -886 8 -892 Q 76 -886 74 -824 Z" fill="#3E5C8A" stroke={INK} strokeWidth={6} />
            <path d="M 50 -830 Q 110 -836 128 -818 Q 100 -808 50 -814 Z" fill="#2E466C" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        )}
      </g>
    </g>
  );
};

// ---------- set pieces ----------

const Sparkle: React.FC<{ x: number; y: number; p: number; s?: number; col?: string }> = ({ x, y, p, s = 1, col = "#FFF6C8" }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p * s}) rotate(${p * 40})`}>
      <path d="M 0 -50 L 12 -12 L 50 0 L 12 12 L 0 50 L -12 12 L -50 0 L -12 -12 Z" fill={col} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    </g>
  );

const Dust: React.FC<{ x: number; y: number; f: number; s?: number; seed: string; n?: number }> = ({ x, y, f, s = 1, seed, n = 5 }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const life = 36;
      const age = (f + i * (life / n)) % life;
      const t = age / life;
      const dx = (random(`${seed}x${i}`) - 0.5) * 160 * s;
      return <circle key={i} cx={x + dx + t * 30 * s} cy={y - t * 90 * s} r={(18 + t * 40) * s} fill={DIRT_HI} opacity={0.55 * (1 - t)} />;
    })}
  </g>
);

const AutumnTree: React.FC<{ x: number; y: number; s?: number; f: number; seed: string }> = ({ x, y, s = 1, f, seed }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -18 0 L -12 -170 L 12 -170 L 18 0 Z" fill={BARK} stroke={INK} strokeWidth={6} />
    {[
      [0, -250, 110],
      [-80, -200, 80],
      [80, -205, 84],
      [-40, -320, 80],
      [50, -310, 76],
    ].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx + Math.sin(f / 20 + i) * 3} cy={cy} r={r} fill={[T_ORANGE, T_RED, T_YEL, T_ORANGE, T_RED][(i + Math.floor(random(seed) * 5)) % 5]} stroke={INK} strokeWidth={6} />
    ))}
  </g>
);

// warm prairie with a dusty road running to the horizon (vanishing point at x = 540)
const PrairieRoad: React.FC<{ f: number; horizon: number }> = ({ f, horizon }) => {
  const H = 1920 - horizon;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042sky)" />
      <circle cx={820} cy={horizon - 250} r={260} fill="url(#ep042sun)" />
      <circle cx={820} cy={horizon - 250} r={86} fill="#FFF3C4" />
      {[0, 1].map((k) => {
        const cx = ((k * 560 + f * 0.6) % 1400) - 200;
        return (
          <g key={k} opacity={0.9}>
            <ellipse cx={cx} cy={horizon - 520 + k * 120} rx={120} ry={38} fill="#FFFFFF" />
            <ellipse cx={cx + 60} cy={horizon - 546 + k * 120} rx={70} ry={40} fill="#FFFFFF" />
          </g>
        );
      })}
      <path d={`M 0 ${horizon} Q 200 ${horizon - 90} 420 ${horizon - 30} Q 700 ${horizon - 120} 1080 ${horizon - 40} L 1080 ${horizon} Z`} fill={HILL_FAR} />
      <rect x={0} y={horizon} width={1080} height={H} fill={PRAIRIE} />
      {new Array(8).fill(0).map((_, k) => {
        const yy = horizon + Math.pow((k + 1) / 8, 1.7) * H;
        return <path key={k} d={`M 0 ${yy} L 1080 ${yy}`} stroke={PRAIRIE_D} strokeWidth={3 + k} opacity={0.35} />;
      })}
      <path d={`M 525 ${horizon} L 555 ${horizon} L 1500 1920 L -420 1920 Z`} fill="url(#ep042road)" />
      <path d={`M 532 ${horizon} L -180 1920 M 548 ${horizon} L 1260 1920`} stroke={DIRT_D} strokeWidth={10} opacity={0.5} />
      {/* fence posts along both edges */}
      {new Array(9).fill(0).map((_, k) => {
        const u = Math.pow((k + 1) / 9, 1.6);
        const yy = horizon + u * H;
        const sc = 0.1 + u * 1.1;
        return (
          <g key={k}>
            <rect x={540 - (40 + u * 1080) - 10 * sc} y={yy - 120 * sc} width={20 * sc} height={120 * sc} fill={WOOD_D} />
            <rect x={540 + (40 + u * 1080) - 10 * sc} y={yy - 120 * sc} width={20 * sc} height={120 * sc} fill={WOOD_D} />
          </g>
        );
      })}
      <AutumnTree x={110} y={horizon + 40} s={0.55} f={f} seed="a" />
      <AutumnTree x={960} y={horizon + 60} s={0.65} f={f} seed="b" />
      <AutumnTree x={290} y={horizon + 6} s={0.25} f={f} seed="c" />
      <AutumnTree x={760} y={horizon + 4} s={0.22} f={f} seed="d" />
    </g>
  );
};

// a river of turkeys flowing down the road toward the viewer
const Flock: React.FC<{ f: number; horizon: number; n: number; seed: string; minU?: number }> = ({ f, horizon, n, seed, minU = 0 }) => {
  const H = 1920 + 80 - horizon;
  const birds = new Array(n).fill(0).map((_, i) => {
    const u0 = random(`${seed}u${i}`);
    const u = minU + (1 - minU) * ((u0 + f * 0.0011) % 1);
    const e = Math.pow(u, 1.7);
    const yy = horizon + 8 + e * H;
    const hw = 30 + e * 900;
    const xx = 540 + (random(`${seed}x${i}`) * 2 - 1) * hw;
    const sc = 0.07 + e * 0.95;
    return { i, xx, yy, sc, facing: (random(`${seed}f${i}`) > 0.5 ? 1 : -1) as 1 | -1, fan: random(`${seed}n${i}`) * 0.7 };
  });
  birds.sort((a, b) => a.yy - b.yy);
  return (
    <g>
      {birds.map((b) => (
        <Turkey key={b.i} x={b.xx} y={b.yy} s={b.sc} f={f} phase={b.i * 7} facing={b.facing} fan={b.fan} simple={b.sc < 0.45} gobble={b.i % 11 === 0} />
      ))}
    </g>
  );
};

const Wheel: React.FC<{ x: number; y: number; r: number; rot: number }> = ({ x, y, r, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r} fill="none" stroke={INK} strokeWidth={18} />
    <circle r={r} fill="none" stroke={WOOD} strokeWidth={10} />
    {new Array(8).fill(0).map((_, i) => (
      <path key={i} d={`M 0 0 L ${Math.cos((i * Math.PI) / 4) * r} ${Math.sin((i * Math.PI) / 4) * r}`} stroke={WOOD_D} strokeWidth={8} />
    ))}
    <circle r={r * 0.2} fill={WOOD_D} stroke={INK} strokeWidth={5} />
  </g>
);

const Mule: React.FC<{ x: number; y: number; s?: number; f: number; col?: string; phase?: number }> = ({ x, y, s = 1, f, col = MULE, phase = 0 }) => {
  const g = (f + phase) / 4;
  const legs = [-80, -50, 60, 90];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {legs.map((lx, i) => (
        <path key={i} d={`M ${lx} -110 L ${lx + Math.sin(g + (i % 2) * Math.PI) * 22} 0`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      ))}
      {legs.map((lx, i) => (
        <path key={`c${i}`} d={`M ${lx} -110 L ${lx + Math.sin(g + (i % 2) * Math.PI) * 22} 0`} stroke={col} strokeWidth={13} strokeLinecap="round" />
      ))}
      <path d={`M -120 -150 q -40 20 -36 ${70 + Math.sin(g) * 6}`} stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-150} rx={135} ry={62} fill={col} stroke={INK} strokeWidth={7} />
      <path d="M 100 -180 L 160 -260 L 200 -230 L 150 -150 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={200} cy={-246} rx={56} ry={30} fill={col} stroke={INK} strokeWidth={7} transform="rotate(28 200 -246)" />
      <path d="M 166 -278 l -14 -70 l 26 54 Z M 182 -282 l 6 -72 l 12 64 Z" fill={MULE_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={196} cy={-258} r={6} fill={INK} />
      <path d="M 70 -120 L -60 -120" stroke="#5A3A1E" strokeWidth={10} />
    </g>
  );
};

const CornWagon: React.FC<{ x: number; y: number; s?: number; f: number; roll?: number }> = ({ x, y, s = 1, f, roll = 6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 210 -130 L 330 -110" stroke={WOOD_D} strokeWidth={14} strokeLinecap="round" />
    <Wheel x={-140} y={-80} r={80} rot={f * roll} />
    <path d="M -210 -300 Q -150 -390 -40 -380 Q 60 -420 140 -360 Q 200 -330 220 -300 Z" fill={CORN} stroke={INK} strokeWidth={6} />
    {new Array(22).fill(0).map((_, i) => (
      <ellipse key={i} cx={-190 + random(`k${i}`) * 390} cy={-310 - random(`ky${i}`) * 60} rx={9} ry={6} fill={CORN_D} />
    ))}
    <rect x={-230} y={-310} width={460} height={150} rx={10} fill={WOOD} stroke={INK} strokeWidth={7} />
    {[-150, -40, 70, 170].map((px) => (
      <path key={px} d={`M ${px} -306 L ${px} -164`} stroke={WOOD_D} strokeWidth={6} />
    ))}
    <text x={0} y={-218} textAnchor="middle" fontFamily={titleFont} fontSize={54} fill={C.cream} stroke={INK} strokeWidth={3} paintOrder="stroke">
      CORN
    </text>
    <Wheel x={150} y={-80} r={80} rot={f * roll} />
  </g>
);

// big bare-ish roosting tree; returns perch points through ROOST
const ROOST: P[] = [
  [520, 860],
  [640, 760],
  [880, 700],
  [1000, 830],
  [470, 1060],
  [620, 990],
  [930, 960],
  [1040, 1080],
  [700, 600],
  [560, 1180],
];
const RoostTree: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M 700 1640 Q 720 1300 740 1100 Q 750 900 760 700 L 830 700 Q 830 900 836 1100 Q 850 1350 900 1640 Z" fill={BARK} stroke={INK} strokeWidth={8} />
    {[
      "M 760 1000 Q 640 1000 470 1060",
      "M 770 930 Q 660 900 520 860",
      "M 780 820 Q 720 780 640 760",
      "M 790 720 Q 750 640 700 600",
      "M 810 760 Q 860 720 880 700",
      "M 820 880 Q 920 850 1000 830",
      "M 830 1000 Q 880 960 930 960",
      "M 830 1080 Q 960 1070 1040 1080",
      "M 750 1150 Q 660 1160 560 1180",
    ].map((d, i) => (
      <g key={i}>
        <path d={d} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d={d} stroke={i % 2 ? BARK : BARK_D} strokeWidth={22} fill="none" strokeLinecap="round" />
      </g>
    ))}
    {new Array(16).fill(0).map((_, i) => {
      const [bx, by] = ROOST[i % ROOST.length];
      const lx = bx + (random(`lf${i}`) - 0.5) * 120;
      const ly = by - 30 - random(`lfy${i}`) * 70 + Math.sin(f / 15 + i) * 3;
      return <ellipse key={i} cx={lx} cy={ly} rx={22} ry={13} fill={[T_ORANGE, T_RED, T_YEL][i % 3]} stroke={INK} strokeWidth={4} transform={`rotate(${i * 37} ${lx} ${ly})`} />;
    })}
  </g>
);

const Schoolhouse: React.FC<{ ridge: number; f: number }> = ({ ridge, f }) => {
  const caved = ridge > 820;
  return (
    <g>
      {/* bell tower (falls in with the roof) */}
      {!caved ? (
        <g transform={`translate(540 ${ridge})`}>
          <rect x={-46} y={-130} width={92} height={130} fill={WH} stroke={INK} strokeWidth={6} />
          <path d="M -26 -100 Q 0 -126 26 -100 L 26 -40 L -26 -40 Z" fill={INK} />
          <path d="M -12 -84 Q 0 -96 12 -84 L 16 -52 L -16 -52 Z" fill={GOLD} stroke={INK} strokeWidth={3} transform={`rotate(${Math.sin(f / 5) * 10} 0 -90)`} />
          <path d="M -66 -130 L 0 -200 L 66 -130 Z" fill={SCHOOL_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        </g>
      ) : null}
      {/* walls */}
      <rect x={250} y={1080} width={580} height={520} fill={SCHOOL} stroke={INK} strokeWidth={8} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M 254 ${1140 + k * 76} L 826 ${1140 + k * 76}`} stroke={SCHOOL_D} strokeWidth={4} />
      ))}
      {[320, 680].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={1180} width={84} height={130} fill="#FFE29A" stroke={INK} strokeWidth={6} />
          <path d={`M ${wx + 42} 1180 L ${wx + 42} 1310 M ${wx} 1245 L ${wx + 84} 1245`} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <rect x={480} y={1380} width={120} height={220} fill={WOOD_D} stroke={INK} strokeWidth={7} />
      <circle cx={580} cy={1490} r={8} fill={GOLD} />
      <rect x={430} y={1310} width={220} height={58} rx={6} fill={WH} stroke={INK} strokeWidth={5} />
      <text x={540} y={1352} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={INK}>
        SCHOOL
      </text>
      {/* roof: two halves meeting at the ridge (when it caves in, the ridge drops into the house) */}
      <path d={`M 210 1092 L 540 ${ridge} L 540 ${ridge + 36} L 236 1112 Z`} fill="#6A4A3A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M 870 1092 L 540 ${ridge} L 540 ${ridge + 36} L 844 1112 Z`} fill="#7E5A46" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[0.25, 0.5, 0.75].map((u, k) => (
        <g key={k}>
          <path d={`M ${lerp(210, 540, u)} ${lerp(1092, ridge, u)} l 18 22`} stroke={INK} strokeWidth={4} />
          <path d={`M ${lerp(870, 540, u)} ${lerp(1092, ridge, u)} l -18 22`} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {caved
        ? [0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${400 + k * 80} 1090 l ${10 - k * 6} -40 l 20 34`} stroke={INK} strokeWidth={6} fill="none" strokeLinejoin="round" />
          ))
        : null}
    </g>
  );
};

const TarPot: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 14) % 42) / 42;
      return <path key={k} d={`M ${-40 + k * 40} ${-130 - p * 120} q 16 -24 0 -48 q -16 -24 0 -48`} stroke="#FFFFFF" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.6 * (1 - p)} />;
    })}
    <path d="M -110 -120 L 110 -120 L 92 0 L -92 0 Z" fill="#3A3A40" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-120} rx={110} ry={26} fill="url(#ep042tar)" stroke={INK} strokeWidth={7} />
    <ellipse cx={-30} cy={-126} rx={26} ry={6} fill="#FFFFFF" opacity={0.35} />
    <rect x={-80} y={-84} width={160} height={58} rx={8} fill={C.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-40} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={INK}>
      TAR
    </text>
  </g>
);

const SandPile: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -140 0 Q -90 -120 0 -130 Q 90 -120 140 0 Z" fill={SAND} stroke={INK} strokeWidth={7} />
    {new Array(14).fill(0).map((_, i) => (
      <circle key={i} cx={-100 + random(`sd${i}`) * 200} cy={-14 - random(`sdy${i}`) * 90} r={4} fill="#C9A35E" />
    ))}
    <rect x={-70} y={-70} width={140} height={50} rx={8} fill={C.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-32} textAnchor="middle" fontFamily={titleFont} fontSize={36} fill={INK}>
      SAND
    </text>
  </g>
);

const Fingerpost: React.FC<{ x: number; y: number; s?: number; text: string }> = ({ x, y, s = 1, text }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-420} width={28} height={420} fill={WH} stroke={INK} strokeWidth={6} />
    <path d="M -30 -400 L 300 -400 L 350 -350 L 300 -300 L -30 -300 Z" fill={WH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <text x={150} y={-332} textAnchor="middle" fontFamily={titleFont} fontSize={60} fill={INK}>
      {text}
    </text>
  </g>
);

// modern lorry with crates of turkeys (today they ride)
const Truck: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-520} y={-430} width={720} height={340} rx={10} fill="#E9E4D8" stroke={INK} strokeWidth={8} />
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3, 4].map((c) => (
        <g key={`${r}${c}`}>
          <rect x={-500 + c * 138} y={-414 + r * 106} width={128} height={96} fill="#C9A26A" stroke={INK} strokeWidth={5} />
          {[0, 1, 2].map((b) => (
            <path key={b} d={`M ${-500 + c * 138 + 30 + b * 34} ${-414 + r * 106 + 4} L ${-500 + c * 138 + 30 + b * 34} ${-414 + r * 106 + 92}`} stroke={WOOD_D} strokeWidth={4} />
          ))}
          {(r + c) % 2 === 0 ? (
            <g transform={`translate(${-500 + c * 138 + 70} ${-414 + r * 106 + 30 + Math.sin(f / 3 + r + c) * 4})`}>
              <circle r={15} fill={HEAD} stroke={INK} strokeWidth={4} />
              <path d="M 12 -4 L 30 0 L 12 6 Z" fill={BEAK} stroke={INK} strokeWidth={3} />
              <circle cx={4} cy={-4} r={4} fill={INK} />
            </g>
          ) : null}
        </g>
      )),
    )}
    <path d="M 220 -330 L 360 -330 Q 420 -320 440 -230 L 450 -90 L 220 -90 Z" fill={T_RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 250 -310 L 350 -310 Q 395 -300 408 -230 L 250 -230 Z" fill="#BFE6F7" stroke={INK} strokeWidth={6} />
    <rect x={-540} y={-100} width={1000} height={36} fill="#4A4E5E" stroke={INK} strokeWidth={6} />
    {[-400, -260, 330].map((wx) => (
      <g key={wx} transform={`translate(${wx} -50) rotate(${f * 16})`}>
        <circle r={58} fill="#2C2F3B" stroke={INK} strokeWidth={7} />
        <circle r={24} fill="#B9C0C8" stroke={INK} strokeWidth={5} />
        <path d="M -24 0 L 24 0" stroke={INK} strokeWidth={5} />
      </g>
    ))}
  </g>
);

// a generic white mansion with a columned portico on a green lawn (the twist set)
const WhiteHouse: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042blue)" />
    {[0, 1].map((k) => {
      const cx = ((k * 600 + f * 0.8) % 1500) - 220;
      return (
        <g key={k}>
          <ellipse cx={cx} cy={560 + k * 90} rx={120} ry={40} fill="#FFFFFF" />
          <ellipse cx={cx + 60} cy={534 + k * 90} rx={70} ry={42} fill="#FFFFFF" />
        </g>
      );
    })}
    <rect x={0} y={1180} width={1080} height={740} fill={LAWN} />
    <path d="M 0 1180 L 1080 1180" stroke={LAWN_D} strokeWidth={10} />
    <rect x={90} y={820} width={900} height={380} fill={WH} stroke={INK} strokeWidth={8} />
    <rect x={70} y={790} width={940} height={40} fill={WH_D} stroke={INK} strokeWidth={6} />
    {[130, 210, 290, 790, 870, 950].map((wx) =>
      [880, 1040].map((wy) => <rect key={`${wx}${wy}`} x={wx - 26} y={wy} width={52} height={90} fill="#8FB8D8" stroke={INK} strokeWidth={5} />),
    )}
    <path d="M 340 830 L 740 830 L 740 1210 L 340 1210 Z" fill={WH_D} stroke={INK} strokeWidth={6} />
    <path d="M 320 830 L 540 700 L 760 830 Z" fill={WH} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    {[370, 440, 510, 580, 650, 720].map((cx) => (
      <g key={cx}>
        <rect x={cx - 18} y={850} width={36} height={350} fill={WH} stroke={INK} strokeWidth={5} />
        <rect x={cx - 26} y={836} width={52} height={18} fill={WH} stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <rect x={500} y={1080} width={80} height={120} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    <path d="M 540 700 L 540 600" stroke={INK} strokeWidth={6} />
    <g transform={`translate(540 600)`}>
      <path d={`M 0 0 Q 50 ${-10 + Math.sin(f / 4) * 8} 100 0 L 100 60 Q 50 ${50 + Math.sin(f / 4) * 8} 0 60 Z`} fill={WH} stroke={INK} strokeWidth={4} />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M 0 ${10 + k * 20} Q 50 ${k * 20 + Math.sin(f / 4) * 8} 100 ${10 + k * 20}`} stroke={T_RED} strokeWidth={8} fill="none" />
      ))}
      <rect x={0} y={0} width={42} height={32} fill="#3F5FA0" />
    </g>
    {[140, 940].map((bx) => (
      <g key={bx}>
        <circle cx={bx} cy={1240} r={80} fill={LAWN_D} stroke={INK} strokeWidth={6} />
        <circle cx={bx + 40} cy={1210} r={50} fill="#5FAF47" stroke={INK} strokeWidth={5} />
      </g>
    ))}
  </g>
);

const Confetti: React.FC<{ f: number; from: number }> = ({ f, from }) => (
  <g>
    {new Array(34).fill(0).map((_, i) => {
      const g = f - from - random(`cf${i}`) * 10;
      if (g < 0) return null;
      const cx = random(`cx${i}`) * 1080 + Math.sin(g / 6 + i) * 30;
      const cy = -40 + g * (7 + random(`cv${i}`) * 6);
      return <rect key={i} x={cx} y={cy} width={22} height={12} fill={[T_RED, GOLD, "#3F6FB0", WH][i % 4]} stroke={INK} strokeWidth={2} transform={`rotate(${g * 12 + i * 30} ${cx} ${cy})`} />;
    })}
  </g>
);

export const TurkeyDrover: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "road";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let answerOn = false;

  if (mode === "road") {
    // frame 0: one big drover striding down a dusty road, stick + red rag up, a river of turkeys behind him to the horizon
    const horizon = 820;
    body = (
      <>
        <PrairieRoad f={f} horizon={horizon} />
        <CornWagon x={600} y={horizon + 26} s={0.11} f={f} />
        <Dust x={540} y={horizon + 40} f={f} s={1.2} seed="hz" n={6} />
        <Flock f={f} horizon={horizon} n={230} seed="road" />
        <Drover x={330 + interpolate(f, [0, dur], [0, 40], clamp)} y={1880} s={1.06} f={f} mouth="shout" />
        <Turkey x={860} y={1905} s={1.25} f={f} facing={-1} fan={0.9} gobble phase={5} />
        <Turkey x={70} y={1960} s={1.1} f={f} facing={1} fan={0.5} phase={13} />
        <Dust x={330} y={1900} f={f} s={1.4} seed="ft" n={4} />
      </>
    );
  } else if (mode === "wagon") {
    // side view on the trail: two boys with sticks, the corn wagon, the flock streaming along; the land scrolls past
    const scroll = f * 9;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042sky)" />
        <circle cx={860} cy={720} r={240} fill="url(#ep042sun)" />
        <circle cx={860} cy={720} r={80} fill="#FFF3C4" />
        <path d={`M ${-((f * 1.5) % 540)} 1120 q 135 -90 270 0 q 135 -110 270 0 q 135 -90 270 0 q 135 -110 270 0 q 135 -90 270 0 L 1620 1200 L -540 1200 Z`} fill={HILL_FAR} />
        <rect x={0} y={1150} width={1080} height={770} fill={PRAIRIE} />
        {[0, 1, 2, 3, 4].map((k) => {
          const tx = ((k * 300 - f * 3) % 1500 + 1500) % 1500 - 200;
          return <AutumnTree key={k} x={tx} y={1190} s={0.42} f={f} seed={`w${k}`} />;
        })}
        {new Array(8).fill(0).map((_, k) => {
          const px = ((k * 170 - scroll) % 1360 + 1360) % 1360 - 140;
          return (
            <g key={k}>
              <rect x={px} y={1230} width={16} height={110} fill={WOOD_D} stroke={INK} strokeWidth={4} />
              <path d={`M ${px - 160} 1262 L ${px + 16} 1262 M ${px - 160} 1300 L ${px + 16} 1300`} stroke={WOOD_D} strokeWidth={6} />
            </g>
          );
        })}
        <rect x={0} y={1360} width={1080} height={460} fill="url(#ep042road)" />
        <path d="M 0 1360 L 1080 1360" stroke={DIRT_D} strokeWidth={8} />
        {(() => {
          const sx = interpolate(f, [0, dur], [1180, -380], clamp);
          return <Fingerpost x={sx} y={1360} s={0.8} text="DENVER" />;
        })()}
        <CornWagon x={250} y={1470} s={0.62} f={f} />
        <Mule x={560} y={1470} s={0.6} f={f} col={MULE_D} phase={6} />
        <Mule x={600} y={1490} s={0.62} f={f} />
        <Dust x={250} y={1470} f={f} s={1} seed="wd" n={4} />
        {[0, 1, 2].map((row) =>
          new Array(7).fill(0).map((_, i) => {
            const yy = 1560 + row * 110 + (random(`wy${row}${i}`) - 0.5) * 30;
            const xx = ((i * 175 + row * 80 + Math.sin(f / 20 + i) * 20 + f * 0.6) % 1300) - 110;
            return <Turkey key={`${row}-${i}`} x={xx} y={yy} s={0.6 + row * 0.12} f={f} phase={row * 9 + i * 5} fan={random(`wf${row}${i}`) * 0.6} gobble={(row + i) % 5 === 0} />;
          }),
        )}
        <Drover x={190} y={1880} s={0.6} f={f} kid hat="cap" shirt="#C8452E" mouth="grin" phase={4} />
        <Drover x={850} y={1860} s={0.58} f={f} kid hat="cap" shirt="#3F7F5A" mouth="shout" pose="stick" phase={11} />
      </>
    );
  } else if (mode === "roost") {
    // sunset: one by one the turkeys flap up into the tree – the drover throws up his hands
    const dusk = ease(f, 0, dur * 0.55);
    const chipP = v.chip ? popIn(f, (v.chipAt ?? 0.55) * dur, 9) : 0;
    const startFly = (v.flyAt ?? 0.12) * dur;
    const gap = (v.flyGap ?? 0.06) * dur;
    const flown = f > startFly + 4;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042sky)" />
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042sunset)" opacity={dusk} />
        <circle cx={300} cy={lerp(900, 1300, dusk)} r={200} fill="url(#ep042sun)" />
        <circle cx={300} cy={lerp(900, 1300, dusk)} r={90} fill={dusk > 0.5 ? "#FFB860" : "#FFF3C4"} />
        <path d="M 0 1400 Q 300 1300 600 1380 Q 850 1320 1080 1390 L 1080 1500 L 0 1500 Z" fill={dusk > 0.5 ? "#8A5A6A" : HILL} opacity={0.9} />
        <rect x={0} y={1480} width={1080} height={440} fill={dusk > 0.5 ? "#9A7A42" : PRAIRIE} />
        <RoostTree f={f} />
        {ROOST.map(([px, py], i) => {
          const at = startFly + i * gap;
          const p = ease(f, at, at + 14);
          const gx = 280 + i * 70 + (i % 2) * 30;
          const gy = 1640 + (i % 3) * 70;
          if (p <= 0) return <Turkey key={i} x={gx} y={gy} s={0.62} f={f} phase={i * 6} fan={0.3} />;
          const x = lerp(gx, px, p);
          const y = lerp(gy, py + 10, p) - Math.sin(p * Math.PI) * 220;
          return <Turkey key={i} x={x} y={y} s={0.62} f={f} phase={i * 6} fan={0.2} flap={p < 1 ? 1 : 0} perch={p >= 1} walk={false} facing={i % 2 ? -1 : 1} />;
        })}
        <Drover x={210} y={1890} s={0.82} f={f} walk={false} pose={flown ? "hands-up" : "stick"} mouth={flown ? "o" : "shout"} />
        {flown ? (
          <g transform={`translate(400 1000) rotate(-10) scale(${popIn(f, startFly + 6, 8)})`}>
            <text x={0} y={50} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={C.mustard} stroke={INK} strokeWidth={8} paintOrder="stroke">
              ?!
            </text>
          </g>
        ) : null}
        {f > dur * 0.8
          ? [0, 1, 2].map((k) => (
              <text key={k} x={880 + k * 50} y={640 - k * 60 - ((f - dur * 0.8) % 30) * 1.2} fontFamily={titleFont} fontSize={60 + k * 14} fill={C.cream} stroke={INK} strokeWidth={5} paintOrder="stroke">
                z
              </text>
            ))
          : null}
        <Chip x={540} y={480} p={chipP} text={v.chip ?? ""} w={680} rot={-4} size={66} />
      </>
    );
  } else if (mode === "roof") {
    // dusk: turkeys land on a little schoolhouse roof one by one, it sags… and CAVES IN
    const crashAt = (v.crashAt ?? 0.62) * dur;
    const N = 9;
    const landGap = (crashAt - 6) / N;
    const landed = Math.max(0, Math.min(N, Math.floor((f - 4) / landGap)));
    const crashed = f >= crashAt;
    const ridge = crashed ? lerp(760, 1180, ease(f, crashAt, crashAt + 6)) : 760 + landed * 5 + (landed > 6 ? Math.sin(f * 1.3) * 4 : 0);
    const g = f - crashAt;
    const shake = crashed && g < 12 ? Math.sin(g * 3) * (12 - g) * 1.2 : 0;
    body = (
      <g transform={`translate(${shake} 0)`}>
        <rect x={-40} y={0} width={1160} height={1920} fill="url(#ep042sunset)" />
        <circle cx={880} cy={1180} r={120} fill="#FFB860" opacity={0.9} />
        <rect x={-40} y={1560} width={1160} height={400} fill="#7E6A3A" />
        <AutumnTree x={110} y={1600} s={0.9} f={f} seed="r1" />
        <AutumnTree x={990} y={1610} s={0.8} f={f} seed="r2" />
        <Schoolhouse ridge={ridge} f={f} />
        {new Array(N).fill(0).map((_, i) => {
          const at = 4 + i * landGap;
          const side = i % 2 ? 1 : -1;
          const u = 0.3 + ((i * 0.19) % 0.62);
          const rx = side < 0 ? lerp(210, 540, u) : lerp(870, 540, u);
          const ry = lerp(1092, 760 + Math.min(i, N) * 5, u) - 6;
          const p = ease(f, at, at + 12);
          if (p <= 0) return null;
          if (!crashed) {
            const x = lerp(side < 0 ? -120 : 1200, rx, p);
            const y = lerp(500 + i * 30, ry, p) - Math.sin(p * Math.PI) * 120;
            return <Turkey key={i} x={x} y={y} s={0.55} f={f} phase={i * 5} fan={0.2} flap={p < 1 ? 1 : 0} perch={p >= 1} walk={false} facing={side < 0 ? 1 : -1} />;
          }
          const vx = (random(`rv${i}`) - 0.5) * 34;
          const vy = -18 - random(`rh${i}`) * 10;
          return <Turkey key={i} x={rx + vx * g} y={ry + vy * g + 0.35 * g * g} s={0.55} f={f} phase={i * 5} fan={0.8} flap={1} walk={false} shock facing={vx > 0 ? 1 : -1} />;
        })}
        {crashed
          ? new Array(8).fill(0).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const r = 80 + g * 14;
              return <circle key={i} cx={540 + Math.cos(a) * r} cy={1120 + Math.sin(a) * r * 0.4} r={50 + g * 3} fill={DIRT_HI} opacity={Math.max(0, 0.8 - g / 30)} />;
            })
          : null}
        {crashed && g > 8 ? (
          <g transform={`translate(${interpolate(g, [8, 40], [560, 1000], clamp)} 0)`}>
            <Drover x={0} y={1640} s={0.36} f={f} hat="cap" shirt="#5A4A7A" pose="hands-up" mouth="o" />
          </g>
        ) : null}
        <Burst x={540} y={640} p={popIn(f, crashAt + 1, 8)} text="CRASH!" size={96} rot={-6} />
      </g>
    );
  } else if (mode === "boots") {
    // England: hot tar + sand on the feet… and a few lucky birds in tiny leather boots
    const bootsAt = (v.bootsAt ?? 0.55) * dur;
    const dipAt = (v.dipAt ?? 0.12) * dur;
    const lift = f < dipAt ? ease(f, 0, dipAt * 0.6) : 1 - ease(f, dipAt, dipAt + 6);
    const tarred = f >= dipAt;
    const second = f >= bootsAt;
    const slide = ease(f, bootsAt, bootsAt + 10);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042sky)" />
        <path d="M 0 1180 Q 270 1080 540 1150 Q 800 1090 1080 1170 L 1080 1300 L 0 1300 Z" fill="#9CB866" />
        <rect x={0} y={1260} width={1080} height={660} fill="#B9A06A" />
        <rect x={0} y={1220} width={1080} height={90} fill="#5E9F4C" />
        {new Array(10).fill(0).map((_, k) => (
          <circle key={k} cx={k * 120 - 10} cy={1230} r={66} fill={k % 2 ? "#5E9F4C" : "#6FAF5A"} stroke={INK} strokeWidth={5} />
        ))}
        <rect x={0} y={1300} width={1080} height={620} fill="url(#ep042road)" />
        <Fingerpost x={170} y={1330} s={0.95} text="LONDON" />
        <TarPot x={lerp(800, 880, slide)} y={1830} s={1.0} f={f} />
        <SandPile x={lerp(860, 1000, slide)} y={1560} s={0.8} />
        <Turkey x={lerp(470, 280, slide)} y={1800} s={lerp(2.4, 1.9, slide)} f={f} walk={false} fan={0.55} feet={tarred ? "tar" : "plain"} lift={tarred ? 0 : lift} shock={!tarred && f > dipAt - 6} gobble={tarred && !second} />
        {tarred && f < dipAt + 14 ? <Burst x={600} y={1460} p={popIn(f, dipAt, 6) * (1 - ease(f, dipAt + 10, dipAt + 14))} text="SPLAT!" size={70} rot={8} col={C.cream} /> : null}
        {second ? (
          <>
            <Turkey x={lerp(1300, 700, slide)} y={1830} s={1.9} f={f} walk={slide < 1} facing={-1} fan={1} feet="boots" phase={8} />
            {[
              [600, 1760],
              [820, 1700],
              [700, 1640],
            ].map(([sx, sy], i) => (
              <Sparkle key={i} x={sx} y={sy} p={popIn(f, bootsAt + 10 + i * 4, 8)} s={0.8} />
            ))}
          </>
        ) : null}
        <Burst x={600} y={800} p={second ? popIn(f, bootsAt + 6, 8) : 0} text={v.burst ?? "TINY BOOTS!"} size={80} rot={-6} />
      </>
    );
  } else if (mode === "pardon") {
    // twist: AND TODAY? a lorry of crated turkeys → flash → a turkey on the White House lawn, PARDONED!
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f < answerAt) {
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep042blue)" />
          <path d="M 0 1180 Q 300 1060 620 1140 Q 860 1080 1080 1150 L 1080 1300 L 0 1300 Z" fill={LAWN} />
          <rect x={0} y={1260} width={1080} height={660} fill={LAWN_D} />
          <rect x={0} y={1420} width={1080} height={380} fill="#55596A" />
          {new Array(7).fill(0).map((_, k) => {
            const dx = ((k * 220 - f * 24) % 1540 + 1540) % 1540 - 230;
            return <rect key={k} x={dx} y={1600} width={130} height={18} fill={C.cream} />;
          })}
          <Truck x={interpolate(f, [0, answerAt], [-300, 1500], clamp)} y={1760} s={1.0} f={f} />
          <Dust x={interpolate(f, [0, answerAt], [-860, 940], clamp)} y={1760} f={f} s={1.2} seed="tk" n={4} />
        </>
      );
    } else {
      answerOn = !!v.answer;
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      const stampP = interpolate(g, [8, 13], [2.4, 1], { ...clamp, easing: Easing.in(Easing.quad) });
      body = (
        <>
          <WhiteHouse f={f} />
          <g transform="translate(330 1640)">
            <path d="M -110 -320 L 110 -320 L 90 0 L -90 0 Z" fill={WOOD} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <rect x={-130} y={-350} width={260} height={40} rx={8} fill={WOOD_D} stroke={INK} strokeWidth={6} />
            <circle cx={0} cy={-190} r={62} fill={GOLD} stroke={INK} strokeWidth={6} />
            <path d="M 0 -236 L 13 -204 L 46 -204 L 20 -184 L 30 -150 L 0 -170 L -30 -150 L -20 -184 L -46 -204 L -13 -204 Z" fill={WH} stroke={INK} strokeWidth={4} />
            <path d="M -20 -350 L -40 -430 M 20 -350 L 40 -430" stroke={INK} strokeWidth={8} />
            <circle cx={-40} cy={-436} r={14} fill={INK} />
            <circle cx={40} cy={-436} r={14} fill={INK} />
          </g>
          <rect x={560} y={1640} width={380} height={60} rx={10} fill={T_RED} stroke={INK} strokeWidth={6} />
          <Turkey x={750} y={1650} s={popIn(f, answerAt, 7) * 1.75} f={f} walk={false} fan={1} gobble phase={3} />
          <Confetti f={f} from={answerAt + 4} />
          {g >= 8 ? (
            <g transform={`translate(540 1010) rotate(-9) scale(${stampP * 0.9})`} opacity={interpolate(g, [8, 10], [0, 1], clamp)}>
              <rect x={-290} y={-80} width={580} height={160} rx={18} fill="none" stroke={T_RED} strokeWidth={16} />
              <text x={0} y={36} textAnchor="middle" fontFamily={titleFont} fontSize={104} fill={T_RED}>
                PARDONED
              </text>
            </g>
          ) : null}
          {v.chip ? <Chip x={330} y={1790} p={popIn(f, answerAt + 18, 9)} text={v.chip} w={420} rot={-3} size={54} /> : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "pardon" && answerOn ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
