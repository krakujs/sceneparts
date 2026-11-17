import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep058 Resurrection man (body snatcher) – the night digger who sold fresh corpses to anatomy schools.
// Moonlit-blue churchyard + warm lantern light (kept readable: mid blues, never black).
// visual: { mode: "dig" | "shaft" | "law" | "burke" | "donors", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           crackAt?, pullAt? (shaft, 0–1), stampA?, stampB? (law, 0–1), xAt?, paperAt? (burke, 0–1),
//           answer?, answerAccent?, answerAt?, answerSize?, chip? (donors) }
// No corpse is ever drawn: only a tied, covered sack.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKY0 = "#1B2C58";
const SKY1 = "#2F4E8C";
const SKY2 = "#6283BE";
const MOON = "#FFF6DC";
const FOG = "#D2DDF2";
const GRASS = "#35606F";
const GRASS_D = "#284B58";
const GRASS_HI = "#4A7C88";
const EARTH = "#7A5232";
const EARTH_D = "#553820";
const EARTH_HI = "#A07048";
const STONE = "#A9B4CC";
const STONE_D = "#7884A0";
const LAMP = "#FFE08A";
const LAMP_GLOW = "#FFB547";
const COAT = "#8A4430";
const COAT_D = "#62301F";
const COAT_HI = "#AE5C3E";
const HAT = "#2A2532";
const HAT_BAND = "#6B5642";
const SCARF = "#E9A93A";
const TROUSER = "#4E4866";
const BOOT = "#1E1714";
const SKIN = "#EDBB92";
const SKIN_D = "#CF9670";
const STUBBLE = "#8E6E58";
const WOODS = "#D6A464";
const WOODS_D = "#A3753F";
const SACK = "#D2B07C";
const SACK_D = "#A98752";
const ROPE = "#E2C88E";
const IRON = "#4A4F60";
const IRON_HI = "#6E7488";
const COFFIN = "#8A5A34";
const COFFIN_D = "#5E3B20";

type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const norm = (x: number, y: number): P => {
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
};
// control point that bends a limb sideways by `bend` (fraction of its length)
const bendPt = (a: P, b: P, bend: number): P => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  return [mx - (b[1] - a[1]) * bend, my + (b[0] - a[0]) * bend];
};
const inOut = Easing.inOut(Easing.cubic);

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 58, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep058sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SKY0} />
      <stop offset="0.6" stopColor={SKY1} />
      <stop offset="1" stopColor={SKY2} />
    </linearGradient>
    <radialGradient id="ep058moon">
      <stop offset="0" stopColor={MOON} stopOpacity={0.6} />
      <stop offset="1" stopColor={MOON} stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep058lamp">
      <stop offset="0" stopColor={LAMP} stopOpacity={0.9} />
      <stop offset="0.4" stopColor={LAMP_GLOW} stopOpacity={0.38} />
      <stop offset="1" stopColor={LAMP_GLOW} stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep058soil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={EARTH_HI} />
      <stop offset="1" stopColor={EARTH_D} />
    </linearGradient>
    <linearGradient id="ep058hall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F7E7C4" />
      <stop offset="1" stopColor="#EBCB92" />
    </linearGradient>
    <radialGradient id="ep058candle">
      <stop offset="0" stopColor="#FFF3C4" stopOpacity={0.9} />
      <stop offset="1" stopColor="#FFD27A" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const NightSky: React.FC<{ horizon: number; f: number; moonX?: number; moonY?: number }> = ({ horizon, f, moonX = 840, moonY = 640 }) => (
  <>
    <rect x={0} y={0} width={1080} height={horizon + 60} fill="url(#ep058sky)" />
    {new Array(36).fill(0).map((_, i) => (
      <circle key={i} cx={random(`s58x${i}`) * 1080} cy={random(`s58y${i}`) * (horizon - 220)} r={1.6 + random(`s58r${i}`) * 2.6} fill={MOON} opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 15 + i))} />
    ))}
    <circle cx={moonX} cy={moonY} r={320} fill="url(#ep058moon)" />
    <circle cx={moonX} cy={moonY} r={112} fill={MOON} stroke={INK} strokeWidth={5} />
    <circle cx={moonX - 36} cy={moonY - 22} r={20} fill="#EEE2C2" />
    <circle cx={moonX + 34} cy={moonY + 36} r={13} fill="#EEE2C2" />
    <g transform={`translate(${moonX - 300 + f * 0.7} ${moonY + 90})`} opacity={0.9}>
      <ellipse cx={0} cy={0} rx={120} ry={30} fill="#3E5F9A" />
      <ellipse cx={70} cy={-22} rx={80} ry={30} fill="#3E5F9A" />
      <ellipse cx={150} cy={4} rx={90} ry={24} fill="#3E5F9A" />
    </g>
  </>
);

const Fog: React.FC<{ y: number; f: number; o?: number }> = ({ y, f, o = 0.22 }) => (
  <g opacity={o}>
    {[0, 1, 2, 3].map((k) => (
      <ellipse key={k} cx={((k * 330 + f * (1.2 + k * 0.3)) % 1500) - 200} cy={y + (k % 2) * 50} rx={300} ry={46} fill={FOG} />
    ))}
  </g>
);

const Church: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-300} width={340} height={300} fill="#3A4F80" stroke={INK} strokeWidth={6} />
    <path d="M -200 -300 L 0 -430 L 200 -300 Z" fill="#2E4170" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={170} y={-520} width={130} height={520} fill="#3A4F80" stroke={INK} strokeWidth={6} />
    <path d="M 155 -520 L 235 -690 L 315 -520 Z" fill="#2E4170" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 235 -690 L 235 -745 M 213 -724 L 257 -724" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    {[-90, 10].map((wx) => (
      <path key={wx} d={`M ${wx} -110 L ${wx} -190 Q ${wx + 30} -232 ${wx + 60} -190 L ${wx + 60} -110 Z`} fill={LAMP} opacity={0.75 + 0.2 * Math.sin(f / 5 + wx)} stroke={INK} strokeWidth={5} />
    ))}
    <path d="M 210 -390 L 210 -440 Q 235 -470 260 -440 L 260 -390 Z" fill="#22305A" stroke={INK} strokeWidth={5} />
  </g>
);

const Stone: React.FC<{ x: number; y: number; s?: number; rot?: number; kind?: number; text?: string }> = ({ x, y, s = 1, rot = 0, kind = 0, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {kind === 1 ? (
      <path d="M -22 0 L -22 -170 L -80 -170 L -80 -214 L -22 -214 L -22 -270 L 22 -270 L 22 -214 L 80 -214 L 80 -170 L 22 -170 L 22 0 Z" fill={STONE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    ) : kind === 2 ? (
      <path d="M -80 0 L -80 -200 L 0 -250 L 80 -200 L 80 0 Z" fill={STONE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    ) : (
      <path d="M -85 0 L -85 -180 Q -85 -260 0 -260 Q 85 -260 85 -180 L 85 0 Z" fill={STONE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    )}
    {kind === 1 ? null : <path d="M 62 -12 L 62 -180" stroke={STONE_D} strokeWidth={12} opacity={0.6} strokeLinecap="round" />}
    {text ? (
      <text x={0} y={-140} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={STONE_D}>
        {text}
      </text>
    ) : null}
  </g>
);

// lantern, origin = bottom centre of its base; the handle top sits ~190 above
const Lantern: React.FC<{ x: number; y: number; s?: number; f: number; glow?: number }> = ({ x, y, s = 1, f, glow = 1 }) => {
  const fl = 0.86 + 0.14 * Math.sin(f / 2.3) * Math.sin(f / 3.7);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-70} r={360} fill="url(#ep058lamp)" opacity={glow * fl} />
      <path d="M -30 -150 Q 0 -192 30 -150" stroke={INK} strokeWidth={8} fill="none" />
      <path d="M -46 -142 L 46 -142 L 36 -122 L -36 -122 Z" fill="#3A3330" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-38} y={-122} width={76} height={100} rx={8} fill={LAMP} stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-68} rx={14 * fl} ry={26 * fl} fill="#FFFFFF" opacity={0.95} />
      <path d="M -38 -88 L 38 -88 M 0 -122 L 0 -22" stroke={INK} strokeWidth={4} opacity={0.55} />
      <rect x={-48} y={-22} width={96} height={22} rx={4} fill="#3A3330" stroke={INK} strokeWidth={5} />
    </g>
  );
};

// tied burlap sack (never a body shape), origin = bottom centre
const Sack: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={110} ry={18} fill="#000" opacity={0.2} />
    <path d="M -96 0 Q -132 -130 -70 -236 Q -44 -268 -22 -276 L 22 -276 Q 52 -262 78 -226 Q 128 -126 100 0 Z" fill={SACK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -50 -200 Q -76 -110 -60 -20 M 40 -210 Q 70 -120 56 -20" stroke={SACK_D} strokeWidth={6} fill="none" />
    <rect x={-30} y={-120} width={54} height={46} fill={SACK_D} stroke={INK} strokeWidth={4} transform="rotate(8 -3 -97)" />
    <path d="M -24 -276 L -40 -330 Q 0 -310 40 -332 L 24 -276" fill={SACK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -34 -282 Q 0 -266 34 -282" stroke={ROPE} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -34 -282 Q 0 -266 34 -282" stroke={INK} strokeWidth={3} fill="none" opacity={0.5} />
  </g>
);

// wooden spade: blade tip at p, shaft along `ang` (deg) for `len`, T-grip at the end. load = earth on the blade
const Spade: React.FC<{ p: P; ang: number; len: number; load?: number }> = ({ p, ang, len, load = 0 }) => (
  <g transform={`translate(${p[0]} ${p[1]}) rotate(${ang})`}>
    <path d={`M 104 -10 L ${len} -10 L ${len} 10 L 104 10 Z`} fill={WOODS} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${len} -36 L ${len} 36`} stroke={INK} strokeWidth={24} strokeLinecap="round" />
    <path d={`M ${len} -36 L ${len} 36`} stroke={WOODS} strokeWidth={13} strokeLinecap="round" />
    <path d="M 0 -40 Q -10 0 0 40 L 102 30 Q 122 0 102 -30 Z" fill={WOODS} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 18 -22 L 88 -17 M 18 22 L 88 17" stroke={WOODS_D} strokeWidth={4} />
    {load > 0 ? (
      <g opacity={load}>
        <ellipse cx={52} cy={38} rx={54} ry={22} fill={EARTH} stroke={INK} strokeWidth={5} />
        <circle cx={30} cy={50} r={14} fill={EARTH_HI} stroke={INK} strokeWidth={4} />
        <circle cx={76} cy={52} r={11} fill={EARTH_D} stroke={INK} strokeWidth={4} />
      </g>
    ) : null}
  </g>
);

// iron mortsafe cage over a grave, 3/4 view; origin = front-centre bottom
const Mortsafe: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const W = 460;
  const H = 210;
  const dx = 140;
  const dy = -96;
  const n = 8;
  return (
    <g transform={`translate(${x - (W * s) / 2} ${y}) scale(${s})`}>
      <path d={`M -20 10 L ${W + 20} 10 L ${W + dx + 20} ${dy} L ${dx - 20} ${dy} Z`} fill={EARTH_D} stroke={INK} strokeWidth={5} />
      {new Array(n + 1).fill(0).map((_, i) => (
        <path key={`b${i}`} d={`M ${dx + (i * W) / n} ${dy} L ${dx + (i * W) / n} ${dy - H}`} stroke={IRON} strokeWidth={9} />
      ))}
      {new Array(n + 1).fill(0).map((_, i) => (
        <path key={`t${i}`} d={`M ${(i * W) / n} ${-H} L ${dx + (i * W) / n} ${dy - H}`} stroke={INK} strokeWidth={16} strokeLinecap="round" />
      ))}
      {new Array(n + 1).fill(0).map((_, i) => (
        <path key={`th${i}`} d={`M ${(i * W) / n} ${-H} L ${dx + (i * W) / n} ${dy - H}`} stroke={IRON_HI} strokeWidth={8} strokeLinecap="round" />
      ))}
      <path d={`M 0 ${-H} L ${W} ${-H} L ${W + dx} ${dy - H} L ${dx} ${dy - H} Z`} fill="none" stroke={INK} strokeWidth={18} strokeLinejoin="round" />
      <path d={`M 0 ${-H} L ${W} ${-H} L ${W + dx} ${dy - H} L ${dx} ${dy - H} Z`} fill="none" stroke={IRON_HI} strokeWidth={9} strokeLinejoin="round" />
      <path d={`M ${W} 0 L ${W + dx} ${dy} L ${W + dx} ${dy - H}`} fill="none" stroke={INK} strokeWidth={16} />
      <path d={`M ${W} 0 L ${W + dx} ${dy} L ${W + dx} ${dy - H}`} fill="none" stroke={IRON} strokeWidth={8} />
      {new Array(n + 1).fill(0).map((_, i) => (
        <g key={`f${i}`}>
          <path d={`M ${(i * W) / n} 0 L ${(i * W) / n} ${-H}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
          <path d={`M ${(i * W) / n} 0 L ${(i * W) / n} ${-H}`} stroke={IRON_HI} strokeWidth={9} strokeLinecap="round" />
        </g>
      ))}
      {[0, -H / 2].map((yy) => (
        <g key={yy}>
          <path d={`M -8 ${yy} L ${W + 8} ${yy}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
          <path d={`M -8 ${yy} L ${W + 8} ${yy}`} stroke="#8A5A3A" strokeWidth={8} strokeLinecap="round" opacity={0.85} />
        </g>
      ))}
      <rect x={W / 2 - 24} y={-H / 2 - 10} width={48} height={56} rx={8} fill={C.mustard} stroke={INK} strokeWidth={5} />
      <path d={`M ${W / 2 - 14} ${-H / 2 - 10} Q ${W / 2} ${-H / 2 - 44} ${W / 2 + 14} ${-H / 2 - 10}`} stroke={INK} strokeWidth={7} fill="none" />
    </g>
  );
};

const Limb: React.FC<{ a: P; c: P; b: P; w: number; col: string }> = ({ a, c, b, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

// The resurrection man: battered top hat, mustard scarf, rust frock coat, wooden spade. Origin = feet centre, facing right.
// pose "dig": heaves earth out of the grave with the spade (loops); "pull": hauls a rope hand over hand (ropeTo = world point);
// "lantern": holds the lantern out over the grave.
type Pose = "dig" | "pull" | "lantern";
const Digger: React.FC<{ x: number; y: number; s?: number; f: number; pose?: Pose; ropeTo?: P }> = ({ x, y, s = 1, f, pose = "dig", ropeTo }) => {
  const PER = 34;
  const fo = f + 22;
  const t = (fo % PER) / PER;
  const ph = pose === "dig" ? (t < 0.12 ? 0 : t < 0.48 ? inOut((t - 0.12) / 0.36) : t < 0.66 ? 1 : 1 - inOut((t - 0.66) / 0.34)) : 0;
  const lean = pose === "dig" ? lerp(58, 12, ph) : pose === "pull" ? -20 + Math.sin(f / 3.2) * 8 : 18;
  const dip = pose === "dig" ? lerp(46, 0, ph) : pose === "pull" ? 10 : 0;
  const S: P = [lean, -505 + dip];
  const Sb: P = [S[0] - 34, S[1] + 6];
  const Sf: P = [S[0] + 30, S[1] + 10];
  const Hd: P = [S[0] + 16, S[1] - 80];
  const bob = Math.sin(f / 9) * 3;
  const legB = { a: [-26, -268] as P, b: [-70, -14] as P };
  const legF = { a: [26, -268] as P, b: [80, -14] as P };
  const kneeOut = pose === "dig" ? 0.2 + 0.08 * (1 - ph) : 0.14;
  let hb: P;
  let hf: P;
  let spade: React.ReactNode = null;
  let held: React.ReactNode = null;
  let rope: React.ReactNode = null;
  if (pose === "dig") {
    const B: P = [lerp(205, 262, ph), lerp(22, -440, ph)];
    const d0 = norm(-0.5, -1);
    const d1 = norm(-1, 0.72);
    const d = norm(lerp(d0[0], d1[0], ph), lerp(d0[1], d1[1], ph));
    const L = 370;
    hb = [B[0] + d[0] * L, B[1] + d[1] * L];
    hf = [B[0] + d[0] * L * 0.5, B[1] + d[1] * L * 0.5];
    spade = <Spade p={B} ang={(Math.atan2(d[1], d[0]) * 180) / Math.PI} len={L} load={ph < 0.5 ? 1 : 0} />;
  } else if (pose === "pull") {
    const k = Math.sin(f / 3.2);
    hf = [S[0] + 140, S[1] + 90 + k * 46];
    hb = [S[0] + 110, S[1] + 170 - k * 46];
    if (ropeTo) {
      const lx = (ropeTo[0] - x) / s;
      const ly = (ropeTo[1] - y) / s;
      const d = `M ${hb[0] - 70} ${hb[1] + 120} Q ${hb[0] - 40} ${hb[1] + 40} ${hb[0]} ${hb[1]} L ${hf[0]} ${hf[1]} L ${lx} ${ly}`;
      rope = (
        <g>
          <path d={d} stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} stroke={ROPE} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    }
  } else {
    hf = [S[0] + 170, S[1] + 120];
    hb = [S[0] - 40, S[1] + 240];
    held = <Lantern x={hf[0]} y={hf[1] + 180} s={0.95} f={f} />;
  }
  // flying clods (dig): released at the top of each heave, flying up and toward the camera
  const clods =
    pose === "dig"
      ? [0, 1].flatMap((back) => {
          const c = Math.floor(fo / PER) - back;
          const age = fo - (c * PER + 0.44 * PER);
          if (age < 0 || age > 30) return [];
          return new Array(7).fill(0).map((_, k) => {
            const vx = 3 + random(`c58x${c}-${k}`) * 13;
            const vy = -13 - random(`c58y${c}-${k}`) * 13;
            const r = (9 + random(`c58r${c}-${k}`) * 14) * (1 + age * 0.05);
            return <circle key={`${c}-${k}`} cx={262 + vx * age} cy={-450 + vy * age + 0.9 * age * age} r={r} fill={k % 3 ? EARTH : EARTH_HI} stroke={INK} strokeWidth={4} />;
          });
        })
      : [];
  const sway = Math.sin(f / 6) * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={24} fill="#000" opacity={0.25} />
      {rope}
      <Limb a={Sb} c={bendPt(Sb, hb, -0.2)} b={hb} w={40} col={COAT_D} />
      <Limb a={legB.a} c={bendPt(legB.a, legB.b, -0.16)} b={legB.b} w={44} col={TROUSER} />
      <Limb a={legF.a} c={bendPt(legF.a, legF.b, -kneeOut)} b={legF.b} w={44} col={TROUSER} />
      <path d={`M ${legB.b[0] - 40} -24 L ${legB.b[0] + 30} -28 Q ${legB.b[0] + 60} -18 ${legB.b[0] + 58} 4 L ${legB.b[0] - 42} 4 Z`} fill={BOOT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M ${legF.b[0] - 36} -24 L ${legF.b[0] + 34} -28 Q ${legF.b[0] + 66} -18 ${legF.b[0] + 64} 4 L ${legF.b[0] - 38} 4 Z`} fill={BOOT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(0 ${bob * 0.3})`}>
        <path
          d={`M ${Sb[0] - 22} ${Sb[1]} L ${Sf[0] + 24} ${Sf[1]} Q ${Sf[0] + 46} ${Sf[1] + 130} 62 -250 L 92 -96 Q 4 -80 -92 -100 L -64 -252 Q ${Sb[0] - 44} ${Sb[1] + 130} ${Sb[0] - 22} ${Sb[1]} Z`}
          fill={COAT}
          stroke={INK}
          strokeWidth={7}
          strokeLinejoin="round"
        />
        <path d={`M ${Sf[0] + 6} ${Sf[1] + 20} Q ${Sf[0] + 10} ${Sf[1] + 140} 40 -250`} stroke={COAT_D} strokeWidth={7} fill="none" />
        <path d={`M ${Sb[0] - 4} ${Sb[1] + 40} Q ${Sb[0] - 18} ${Sb[1] + 160} -50 -140`} stroke={COAT_HI} strokeWidth={7} fill="none" opacity={0.7} strokeLinecap="round" />
        <path d="M -60 -258 Q 0 -246 64 -256" stroke={COAT_D} strokeWidth={14} fill="none" strokeLinecap="round" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={lerp(Sf[0] + 10, 46, (k + 1) / 4)} cy={lerp(Sf[1] + 30, -262, (k + 1) / 4)} r={7} fill={C.mustard} stroke={INK} strokeWidth={3} />
        ))}
        <path d={`M ${S[0] - 30} ${S[1] + 4} Q ${S[0]} ${S[1] + 26} ${S[0] + 34} ${S[1] + 4}`} stroke={SCARF} strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d={`M ${S[0] + 22} ${S[1] + 18} l ${8 + sway * 0.3} 64 l 22 -6 Z`} fill={SCARF} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={S[0] + 24} cy={S[1] + 18} r={14} fill={SCARF} stroke={INK} strokeWidth={5} />
        <g transform={`translate(${Hd[0]} ${Hd[1]})`}>
          <path d="M -20 36 L -16 82 L 24 82 L 28 36 Z" fill={SKIN_D} stroke={INK} strokeWidth={5} />
          <circle r={58} fill={SKIN} stroke={INK} strokeWidth={6} />
          <path d="M -58 -12 Q -72 30 -40 50 Q -52 10 -30 -22 Z" fill="#4A3424" stroke={INK} strokeWidth={4} />
          <path d="M -6 16 Q 30 70 58 14 Q 52 50 22 60 Q -8 54 -6 16 Z" fill={STUBBLE} opacity={0.55} />
          <ellipse cx={-14} cy={6} rx={12} ry={17} fill={SKIN_D} stroke={INK} strokeWidth={4} />
          <path d="M 46 -8 Q 84 4 58 26 Q 50 24 44 18" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <ellipse cx={30} cy={-10} rx={7} ry={9} fill={INK} />
          <circle cx={32} cy={-13} r={2.5} fill="#FFF" />
          <path d="M 14 -30 L 48 -22" stroke={INK} strokeWidth={9} strokeLinecap="round" />
          <path d="M 22 38 Q 36 32 50 40" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          <circle cx={40} cy={16} r={16} fill="#E58A7A" opacity={0.35} />
          <g transform="rotate(-8)">
            <ellipse cx={6} cy={-44} rx={86} ry={17} fill={HAT} stroke={INK} strokeWidth={6} />
            <path d="M -50 -48 L -44 -190 Q -18 -178 -4 -196 Q 24 -180 52 -188 L 58 -48 Z" fill={HAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -48 -84 L 57 -84 L 57 -66 L -49 -66 Z" fill={HAT_BAND} stroke={INK} strokeWidth={4} />
            <path d="M -20 -150 Q -6 -130 8 -160" stroke="#4A4252" strokeWidth={5} fill="none" />
            <rect x={18} y={-140} width={24} height={20} fill="#4A4252" stroke={INK} strokeWidth={3} transform="rotate(10 30 -130)" />
          </g>
        </g>
      </g>
      {spade}
      {held}
      <Limb a={Sf} c={bendPt(Sf, hf, -0.18)} b={hf} w={42} col={COAT} />
      <circle cx={hb[0]} cy={hb[1]} r={25} fill={SKIN} stroke={INK} strokeWidth={5} />
      <circle cx={hf[0]} cy={hf[1]} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
      {clods}
    </g>
  );
};

// coffin seen from the side, head end on the left; crack 0..1 = the head end of the lid splits open
const Coffin: React.FC<{ x: number; y: number; w?: number; crack?: number }> = ({ x, y, w = 560, crack = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 40 L 40 0 L ${w - 60} 0 L ${w} 50 L ${w - 60} 120 L 40 120 Z`} fill={COFFIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M 20 22 L ${w - 50} 22`} stroke={COFFIN_D} strokeWidth={8} />
    {[0.3, 0.6, 0.85].map((k) => (
      <circle key={k} cx={w * k} cy={70} r={8} fill={C.mustard} stroke={INK} strokeWidth={3} />
    ))}
    {crack > 0 ? (
      <g>
        <path d={`M 4 40 L 42 2 L ${40 + 110 * crack} 2 L ${30 + 100 * crack} 60 L ${12} 64 Z`} fill="#1A110A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M ${40 + 110 * crack} 2 l 18 30 l -16 18 l 22 30`} stroke={INK} strokeWidth={6} fill="none" strokeLinejoin="round" />
      </g>
    ) : null}
  </g>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number }> = ({ x, y, p, text, rot = -8, size = 78 }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 210;
      return `${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 0.75}`;
    })
    .join(" ");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <polygon points={pts} fill={C.mustard} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <text x={0} y={size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>
        {text}
      </text>
    </g>
  );
};

const Shirt: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -64 L -30 -84 Q 0 -62 30 -84 L 70 -64 L 104 -10 L 68 8 L 56 -18 L 56 92 L -56 92 L -56 -18 L -68 8 L -104 -10 Z" fill="#F3EEE2" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -30 -84 L 0 -40 L 30 -84 M 0 -40 L 0 80" stroke={INK} strokeWidth={4} fill="none" />
    {[-10, 20, 50].map((yy) => (
      <circle key={yy} cx={8} cy={yy} r={5} fill={INK} />
    ))}
  </g>
);

// evidence card with a stamp; p = pop-in, st = stamp 0..1
const Card: React.FC<{ x: number; y: number; p: number; label: string; icon: "shirt" | "sack"; stamp: string; st: number; col: string; rot: number }> = ({ x, y, p, label, icon, stamp, st, col, rot }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-200} y={-210} width={400} height={420} rx={24} fill={C.cream} stroke={INK} strokeWidth={8} />
      <text x={0} y={-134} textAnchor="middle" fontFamily={titleFont} fontSize={62} fill={INK}>
        {label}
      </text>
      {icon === "shirt" ? <Shirt x={0} y={30} s={1.05} /> : <Sack x={0} y={160} s={0.62} />}
      {st > 0 ? (
        <g transform={`translate(0 120) rotate(-14) scale(${lerp(2.2, 1, st)})`} opacity={Math.min(1, st * 1.4)}>
          <rect x={-180} y={-52} width={360} height={104} rx={12} fill="none" stroke={col} strokeWidth={12} />
          <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={66} fill={col} textLength={320} lengthAdjust="spacingAndGlyphs">
            {stamp}
          </text>
        </g>
      ) : null}
    </g>
  );

const Student: React.FC<{ x: number; y: number; s?: number; f: number; skin: string; hair: string; long?: boolean; off?: number }> = ({ x, y, s = 1, f, skin, hair, long = false, off = 0 }) => {
  const fl = 0.85 + 0.15 * Math.sin(f / 2.1 + off * 7);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -120 420 L -110 120 Q -100 70 -40 60 L 40 60 Q 100 70 110 120 L 120 420 Z" fill="#F7F4EC" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 60 L 0 150 L 40 60" fill="#8EC3D6" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 0 150 L 0 420" stroke={INK} strokeWidth={4} />
      {long ? <path d="M -62 -40 Q -80 60 -50 90 L 50 90 Q 80 60 62 -40 Z" fill={hair} stroke={INK} strokeWidth={5} /> : null}
      <path d="M -18 30 L -16 66 L 18 66 L 20 30 Z" fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={0} r={58} fill={skin} stroke={INK} strokeWidth={6} />
      <path d="M -60 -6 Q -62 -66 0 -66 Q 62 -66 60 -6 Q 40 -40 0 -36 Q -40 -40 -60 -6 Z" fill={hair} stroke={INK} strokeWidth={5} />
      <path d="M -30 8 Q -20 16 -10 8 M 10 8 Q 20 16 30 8" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M -12 34 Q 0 40 12 34" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={150} r={130} fill="url(#ep058candle)" opacity={fl} />
      <rect x={-12} y={140} width={24} height={90} rx={4} fill="#FFF8E6" stroke={INK} strokeWidth={4} />
      <ellipse cx={0} cy={124} rx={10 * fl} ry={18 * fl} fill="#FFD27A" stroke={INK} strokeWidth={3} />
      <circle cx={-30} cy={226} r={24} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={30} cy={226} r={24} fill={skin} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// far-away anonymous silhouette with a top hat (burke scene)
const Shadow: React.FC<{ x: number; y: number; s?: number; lean?: number }> = ({ x, y, s = 1, lean = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) skewX(${lean})`} fill="#141B30" stroke={INK} strokeWidth={5}>
    <path d="M -70 0 L -60 -260 Q -40 -330 0 -330 Q 40 -330 60 -260 L 70 0 Z" />
    <circle cx={0} cy={-370} r={46} />
    <rect x={-40} y={-500} width={80} height={110} />
    <rect x={-66} y={-400} width={132} height={16} rx={6} />
  </g>
);

export const ResurrectionMan: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "dig";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;

  if (mode === "dig") {
    // frame 0: the resurrection man fills the frame, heaving earth out of a fresh grave by lantern light
    body = (
      <>
        <NightSky horizon={1250} f={f} moonX={830} moonY={700} />
        <Church x={160} y={1262} s={0.9} f={f} />
        <rect x={0} y={1240} width={1080} height={680} fill={GRASS} />
        <path d="M 0 1246 Q 280 1222 560 1248 T 1080 1240 L 1080 1330 Q 540 1300 0 1330 Z" fill={GRASS_HI} opacity={0.55} />
        <Stone x={600} y={1300} s={0.6} kind={0} />
        <Stone x={420} y={1296} s={0.46} rot={5} kind={2} />
        <Stone x={960} y={1310} s={0.72} rot={-6} kind={1} />
        <rect x={860} y={1180} width={150} height={80} fill="#4A3A2E" stroke={INK} strokeWidth={5} />
        <circle cx={900} cy={1270} r={30} fill="none" stroke={INK} strokeWidth={8} />
        <path d="M 1010 1200 L 1080 1170" stroke={INK} strokeWidth={8} />
        <Fog y={1300} f={f} o={0.26} />
        <path d="M 0 1500 Q 540 1440 1080 1500 L 1080 1920 L 0 1920 Z" fill={GRASS_D} />
        <ellipse cx={300} cy={1810} rx={420} ry={110} fill={LAMP_GLOW} opacity={0.22} />
        <Stone x={990} y={1500} s={0.8} rot={7} kind={0} text="R.I.P." />
        <ellipse cx={770} cy={1822} rx={262} ry={76} fill={EARTH} stroke={INK} strokeWidth={6} />
        <ellipse cx={770} cy={1826} rx={226} ry={56} fill="#1A120C" />
        <path d="M 900 1830 Q 980 1660 1100 1690 L 1100 1860 Z" fill={EARTH} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 960 1730 q 20 -10 40 0 M 1010 1780 q 20 -10 40 0" stroke={EARTH_D} strokeWidth={6} fill="none" />
        <Sack x={92} y={1806} s={1.0} rot={-6} />
        <Lantern x={250} y={1810} s={1.25} f={f} />
        <Digger x={440} y={1800} s={1.62} f={f} pose="dig" />
      </>
    );
  } else if (mode === "shaft") {
    // cut-away: he digs only a narrow shaft at the HEAD end, cracks the lid, then hauls the covered sack up on a rope
    const crackAt = (v.crackAt ?? 0.52) * dur;
    const pullAt = (v.pullAt ?? 0.7) * dur;
    const GY = 880;
    const SX0 = 270;
    const SX1 = 392;
    const SC = (SX0 + SX1) / 2;
    const depth = lerp(GY + 20, 1500, ease(f, 2, crackAt - 4));
    const crack = ease(f, crackAt, crackAt + 6);
    const rise = ease(f, pullAt, dur - 2);
    const sackS = 0.4;
    const sackY = lerp(1600, 1010, rise);
    const sackTop: P = [SC, sackY - 330 * sackS];
    const pose: Pose = f < crackAt ? "dig" : f < pullAt ? "lantern" : "pull";
    const burst = f < pullAt + 8 ? popIn(f, crackAt, 7) * interpolate(f, [pullAt, pullAt + 8], [1, 0], clamp) : 0;
    body = (
      <>
        <NightSky horizon={GY} f={f} moonX={880} moonY={330} />
        <Stone x={820} y={GY + 8} s={0.85} kind={0} text="R.I.P." />
        <rect x={0} y={GY} width={1080} height={1920 - GY} fill="url(#ep058soil)" />
        {new Array(26).fill(0).map((_, i) => {
          const sx = random(`st58x${i}`) * 1080;
          const sy = GY + 80 + random(`st58y${i}`) * 960;
          return sx > SX0 - 30 && sx < SX1 + 30 ? null : <ellipse key={i} cx={sx} cy={sy} rx={14 + random(`st58r${i}`) * 22} ry={10 + random(`st58q${i}`) * 12} fill={i % 3 ? EARTH_D : "#B08A66"} stroke={INK} strokeWidth={3} opacity={0.75} />;
        })}
        {[1080, 1260, 1700].map((yy) => (
          <path key={yy} d={`M 0 ${yy} Q 270 ${yy - 24} 540 ${yy} T 1080 ${yy}`} stroke={EARTH_D} strokeWidth={6} fill="none" opacity={0.6} />
        ))}
        <rect x={-10} y={GY - 14} width={1100} height={36} fill={GRASS} stroke={INK} strokeWidth={5} />
        <rect x={SX0} y={GY + 4} width={SX1 - SX0} height={depth - GY - 4} fill="#24170D" stroke={INK} strokeWidth={5} />
        <rect x={SX0 + 10} y={GY + 4} width={16} height={Math.max(0, depth - GY - 10)} fill={LAMP_GLOW} opacity={0.18} />
        {f >= pullAt - 1 ? <Sack x={SC} y={sackY} s={sackS} /> : null}
        <Coffin x={260} y={1490} w={600} crack={crack} />
        <Burst x={640} y={1120} p={burst} text="CRACK!" size={84} />
        <Digger x={170} y={GY} s={0.78} f={f} pose={pose} ropeTo={sackTop} />
      </>
    );
  } else if (mode === "law") {
    // clothes thrown back into the grave (taking them was theft); the body itself – legally – belonged to no one
    const stA = (v.stampA ?? 0.3) * dur;
    const stB = (v.stampB ?? 0.74) * dur;
    const GY = 1060;
    const p = ease(f, 0, dur * 0.28);
    const sx = lerp(1000, 560, p);
    const sy = lerp(800, 1150, p) - 300 * Math.sin(p * Math.PI);
    body = (
      <>
        <NightSky horizon={GY} f={f} moonX={880} moonY={300} />
        <Church x={110} y={GY + 12} s={0.55} f={f} />
        <rect x={0} y={GY} width={1080} height={1920 - GY} fill={GRASS} />
        <Stone x={720} y={GY + 30} s={0.5} kind={1} />
        <Stone x={960} y={GY + 40} s={0.55} rot={-5} kind={0} />
        <Fog y={GY + 40} f={f} o={0.2} />
        <ellipse cx={210} cy={1190} rx={320} ry={90} fill={LAMP_GLOW} opacity={0.2} />
        <ellipse cx={560} cy={1160} rx={270} ry={76} fill={EARTH} stroke={INK} strokeWidth={6} />
        <ellipse cx={560} cy={1166} rx={232} ry={54} fill="#1A120C" />
        <Lantern x={180} y={1200} s={1.0} f={f} />
        <Sack x={880} y={1210} s={0.78} rot={8} />
        {p < 1 ? <Shirt x={sx} y={sy} s={lerp(1.15, 0.5, p)} rot={420 * p} /> : null}
        <Card x={290} y={600} p={popIn(f, dur * 0.06, 9) * 0.9} label="CLOTHES" icon="shirt" stamp="THEFT!" st={ease(f, stA, stA + 5)} col={C.brick} rot={-4} />
        <Card x={740} y={620} p={popIn(f, dur * 0.48, 9) * 0.9} label="BODY" icon="sack" stamp="NO OWNER" st={ease(f, stB, stB + 5)} col={C.teal} rot={4} />
      </>
    );
  } else if (mode === "burke") {
    // an Edinburgh close by night: Burke and Hare never dug – a spade crossed out, then the broadsheet: murderers
    const xAt = (v.xAt ?? 0.06) * dur;
    const paperAt = (v.paperAt ?? 0.44) * dur;
    const xp = popIn(f, xAt, 8);
    const cross = ease(f, xAt + 6, xAt + 12);
    const slam = popIn(f, paperAt, 7);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill={SKY1} />
        <rect x={360} y={260} width={360} height={1060} fill="url(#ep058sky)" />
        <circle cx={600} cy={470} r={70} fill={MOON} stroke={INK} strokeWidth={5} />
        <circle cx={600} cy={470} r={170} fill="url(#ep058moon)" />
        <path d="M 360 1150 L 720 1150 L 720 1320 L 360 1320 Z" fill="#46629A" />
        <Shadow x={470} y={1310} s={0.42} lean={-3} />
        <Shadow x={610} y={1310} s={0.44} lean={4} />
        <path d="M 0 0 L 360 260 L 360 1320 L 0 1920 Z" fill="#3E4E78" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 1080 0 L 720 260 L 720 1320 L 1080 1920 Z" fill="#33426A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => {
          const t = k / 9;
          return (
            <g key={k}>
              <path d={`M 0 ${lerp(120, 1820, t)} L 360 ${lerp(320, 1280, t)}`} stroke="#2C3A5E" strokeWidth={5} />
              <path d={`M 1080 ${lerp(120, 1820, t)} L 720 ${lerp(320, 1280, t)}`} stroke="#25324F" strokeWidth={5} />
            </g>
          );
        })}
        <path d="M 360 1320 L 720 1320 L 1080 1920 L 0 1920 Z" fill="#5A6A8A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((r) => (
          <path key={r} d={`M ${lerp(360, 0, r / 5)} ${lerp(1320, 1920, r / 5)} L ${lerp(720, 1080, r / 5)} ${lerp(1320, 1920, r / 5)}`} stroke="#46557A" strokeWidth={5} />
        ))}
        <circle cx={250} cy={800} r={240} fill="url(#ep058lamp)" opacity={0.85 + 0.15 * Math.sin(f / 3)} />
        <path d="M 200 760 L 250 760 L 250 700" stroke={INK} strokeWidth={10} fill="none" />
        <Lantern x={250} y={900} s={0.9} f={f} glow={0} />
        {xp > 0 && f < paperAt + 8 ? (
          <g transform={`translate(540 1000) scale(${xp})`}>
            <Spade p={[0, 0]} ang={-90} len={460} />
            <path d="M -170 -470 L 170 -40 M 170 -470 L -170 -40" stroke={INK} strokeWidth={46 * cross} strokeLinecap="round" />
            <path d="M -170 -470 L 170 -40 M 170 -470 L -170 -40" stroke={C.brick} strokeWidth={30 * cross} strokeLinecap="round" />
            <g transform="translate(0 90) rotate(-3)">
              <rect x={-230} y={-50} width={460} height={100} rx={16} fill={C.cream} stroke={INK} strokeWidth={7} />
              <text x={0} y={24} textAnchor="middle" fontFamily={titleFont} fontSize={64} fill={INK}>
                NEVER DUG
              </text>
            </g>
          </g>
        ) : null}
        {slam > 0 ? (
          <g transform={`translate(540 ${lerp(-500, 820, Math.min(1, slam))}) rotate(-4) scale(${lerp(1.3, 1, Math.min(1, slam))})`}>
            <rect x={-390} y={-340} width={780} height={690} fill="#F1E6CF" stroke={INK} strokeWidth={8} />
            <text x={0} y={-262} textAnchor="middle" fontFamily={typeFont} fontSize={44} fill={INK}>
              EDINBURGH · 1828
            </text>
            <path d="M -350 -236 L 350 -236 M -350 -226 L 350 -226" stroke={INK} strokeWidth={4} />
            <text x={0} y={-110} textAnchor="middle" fontFamily={titleFont} fontSize={130} fill={C.brick} textLength={700} lengthAdjust="spacingAndGlyphs">
              MURDERERS!
            </text>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={INK}>
              BURKE &amp; HARE
            </text>
            <rect x={-250} y={40} width={500} height={110} rx={14} fill={C.mustard} stroke={INK} strokeWidth={6} />
            <text x={0} y={120} textAnchor="middle" fontFamily={titleFont} fontSize={78} fill={INK}>
              16 VICTIMS
            </text>
            {[190, 222, 254, 286, 318].map((yy) => (
              <g key={yy}>
                <path d={`M -350 ${yy} L -40 ${yy}`} stroke="#9C8E74" strokeWidth={8} />
                <path d={`M 40 ${yy} L 350 ${yy}`} stroke="#9C8E74" strokeWidth={8} />
              </g>
            ))}
          </g>
        ) : null}
      </>
    );
  }
  else if (mode === "donors") {
    // twist: the moonlit kirkyard with its iron mortsafe ("AND TODAY?") → flash → a bright hall where
    // medical students hold candles for the people who GAVE their bodies to science
    const answerAt = (v.answerAt ?? 0.55) * dur;
    if (f < answerAt) {
      body = (
        <>
          <NightSky horizon={1180} f={f} moonX={820} moonY={620} />
          <Church x={150} y={1190} s={0.75} f={f} />
          <rect x={0} y={1170} width={1080} height={750} fill={GRASS} />
          <Stone x={880} y={1220} s={0.6} kind={1} />
          <Stone x={420} y={1210} s={0.5} rot={4} kind={0} />
          <Fog y={1230} f={f} o={0.24} />
          <Mortsafe x={540} y={1640} s={1.35} />
          <Fog y={1700} f={f + 40} o={0.18} />
        </>
      );
    } else {
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      const chip = popIn(f, answerAt + 16, 9);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep058hall)" />
          {[200, 540, 880].map((wx) => (
            <g key={wx}>
              <path d={`M ${wx - 110} 1000 L ${wx - 110} 520 Q ${wx} 390 ${wx + 110} 520 L ${wx + 110} 1000 Z`} fill="#BFE0EE" stroke={INK} strokeWidth={7} />
              <path d={`M ${wx} 440 L ${wx} 1000 M ${wx - 110} 720 L ${wx + 110} 720`} stroke="#8A6A45" strokeWidth={8} />
              <path d={`M ${wx - 80} 560 L ${wx - 30} 520`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
            </g>
          ))}
          <rect x={0} y={1000} width={1080} height={920} fill="#A8784A" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={30 + k * 265} y={1040} width={225} height={200} rx={8} fill="#B98A58" stroke="#7A5232" strokeWidth={6} />
          ))}
          <g transform={`translate(540 660) rotate(-1.5) scale(${popIn(f, answerAt + 2, 10)})`}>
            <rect x={-420} y={-70} width={840} height={140} rx={14} fill={C.cream} stroke={INK} strokeWidth={8} />
            <rect x={-400} y={-52} width={800} height={104} rx={8} fill="none" stroke={C.mustard} strokeWidth={6} />
            <text x={0} y={24} textAnchor="middle" fontFamily={titleFont} fontSize={66} fill={INK} textLength={740} lengthAdjust="spacingAndGlyphs">
              THANK YOU, DONORS
            </text>
          </g>
          <Student x={230} y={900} s={0.95} f={f} skin="#B98260" hair="#2A1C14" long off={0.2} />
          <Student x={540} y={880} s={1.02} f={f} skin="#EDBB92" hair="#C98A3A" off={0.5} />
          <Student x={850} y={900} s={0.95} f={f} skin="#E8B990" hair="#4A3424" long off={0.8} />
          <rect x={40} y={1290} width={1000} height={70} fill="#FFFDF6" stroke={INK} strokeWidth={7} />
          <path d="M 40 1360 L 40 1560 L 1040 1560 L 1040 1360" fill="#F3EEE2" stroke={INK} strokeWidth={7} />
          {[110, 210, 320, 760, 870, 970].map((cx, i) => {
            const fl = 0.85 + 0.15 * Math.sin(f / 2 + i * 1.7);
            return (
              <g key={cx}>
                <circle cx={cx} cy={1210} r={70} fill="url(#ep058candle)" opacity={fl} />
                <rect x={cx - 13} y={1214} width={26} height={78} rx={4} fill="#FFF8E6" stroke={INK} strokeWidth={4} />
                <ellipse cx={cx} cy={1198} rx={10 * fl} ry={18 * fl} fill="#FFD27A" stroke={INK} strokeWidth={3} />
              </g>
            );
          })}
          <g transform="translate(540 1290)">
            <path d="M -50 0 L -40 -100 L 40 -100 L 50 0 Z" fill="#7FB2C9" stroke={INK} strokeWidth={6} />
            {[-60, -20, 20, 60, 0].map((fx, i) => (
              <g key={i}>
                <path d={`M 0 -100 L ${fx} ${-170 - (i % 2) * 30}`} stroke="#3E7A44" strokeWidth={6} />
                <circle cx={fx} cy={-175 - (i % 2) * 30} r={24} fill={["#F2B544", "#E58A93", "#F4EAD5", "#E58A93", "#F2B544"][i]} stroke={INK} strokeWidth={4} />
              </g>
            ))}
          </g>
          {v.chip && chip > 0 ? (
            <g transform={`translate(540 1150) rotate(-3) scale(${chip})`}>
              <rect x={-330} y={-56} width={660} height={112} rx={18} fill={C.mustard} stroke={INK} strokeWidth={8} />
              <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={60} fill={INK} textLength={590} lengthAdjust="spacingAndGlyphs">
                {v.chip}
              </text>
            </g>
          ) : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="night" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
        {overlay}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "donors" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.55) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 100} color={C.brick} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
