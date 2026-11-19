import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep054 Witch-finder – Matthew Hopkins, the self-styled "Witchfinder General" (East Anglia, 1645–47),
// drawn after the 1647 frontispiece of "The Discovery of Witches": tall Puritan hat, long black cloak,
// white falling-band collar, pale bucket-top boots, a tall staff – plus a pointing finger.
// Bright golden-hour English village (NOT a night/gallows look – ep053 executioner is the other Friday-13th Short).
// visual: { mode: "village" | "tests" | "watch" | "pond" | "fee" | "toll" | "ship" | "today", headline?, accent?, top?, size?,
//           tag?, tagY?, float?: string[], floatAt?: number[] (0–1), floatTop?, cutAt? (tests, 0–1),
//           answer?, answerAccent?, answerAt?, answerSize? (ship), stampAt? (today, 0–1) }
// Respect for the accused: nobody accused is ever drawn suffering or mocked – the chair at the pond is empty,
// the watched stool holds only a shawl, the dead are remembered as candles. No gallows, no hanging, no gore.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const CLOAK = "#211D26";
const CLOAK_HI = "#3B3544";
const CLOAK_IN = "#6E2A2A";
const DOUBLET = "#2E2731";
const BREECH = "#3C2E26";
const BOOT = "#CDB089";
const BOOT_D = "#A88B63";
const HAT = "#17151A";
const BAND = "#7A5A36";
const SILVER = "#D8D2C4";
const COLLAR = "#F7F0E0";
const SKIN = "#EBBE97";
const SKIN_D = "#CF9C74";
const HAIR = "#5A3A22";
const STAFF = "#7A5230";
const GRASS = "#8DBF6A";
const GRASS_D = "#6FA250";
const HEDGE = "#5E8F4A";
const PLASTER = "#F3E4C2";
const BEAM = "#4A3426";
const ROOF = "#B5452F";
const ROOF_D = "#8E3322";
const FLINT = "#A7A396";
const FLINT_D = "#86826F";
const WATER = "#5FA3B4";
const WATER_D = "#3F7F92";
const GOLD = "#FFD24A";
const GOLD_D = "#D9A21E";
const GOLD_HI = "#FFF2A8";
const CANDLE = "#F6EBD0";
const FLAME = "#FFC24A";

type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[] }> = ({ items, f, dur, top = 330, at }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// ---------- Matthew Hopkins (own drawing after the 1647 frontispiece) ----------
// origin = feet centre, facing right (+x). point: 0 = arm down, 1 = arm thrust out, finger pointing.
// Local height ≈ 700 (hat top at y ≈ -700).
export const Hopkins: React.FC<{ x: number; y: number; s?: number; f: number; point?: number; walk?: boolean; facing?: 1 | -1; staff?: boolean; purse?: boolean; wind?: number; aim?: number }> = ({ x, y, s = 1, f, point = 1, walk = false, facing = 1, staff = true, purse = false, wind = 1, aim = -8 }) => {
  const step = walk ? Math.sin(f / 4.5) : 0;
  const bob = walk ? -Math.abs(Math.sin(f / 4.5)) * 10 : Math.sin(f / 18) * 2;
  const flap = Math.sin(f / 7) * 14 * wind;
  // pointing arm: shoulder (46,-452) → hand
  const ang = lerp(80, aim, point); // degrees from +x, 80 = hanging down
  const r = (ang * Math.PI) / 180;
  const sh: P = [46, -452];
  const elbow: P = [sh[0] + Math.cos(r) * 100 + (1 - point) * 6, sh[1] + Math.sin(r) * 100 + 10 * (1 - point)];
  const hand: P = [elbow[0] + Math.cos(r) * 108, elbow[1] + Math.sin(r) * 108];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={22} fill="#000" opacity={0.22} />
      <g transform={`translate(0 ${bob})`}>
        {/* cloak back panel (billows behind) */}
        <path d={`M -58 -470 Q -150 -300 ${-190 - flap} -120 Q -120 -100 -60 -140 Z`} fill={CLOAK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M -58 -470 Q -130 -320 ${-170 - flap} -150`} stroke={CLOAK_IN} strokeWidth={10} fill="none" opacity={0.7} />
        {/* staff (in the back hand) */}
        {staff ? <path d="M -118 -720 L -112 -6" stroke={STAFF} strokeWidth={13} strokeLinecap="round" /> : null}
        {staff ? <path d="M -118 -720 L -112 -6" stroke={INK} strokeWidth={3} opacity={0.35} /> : null}
        {/* legs: breeches + pale bucket-top boots with spurs */}
        {[-1, 1].map((k) => {
          const sw = walk ? step * 26 * k : 0;
          const lx = k * 42 + sw;
          return (
            <g key={k}>
              <path d={`M ${k * 40} -300 L ${lx - 30} -205 L ${lx + 30} -205 Z`} fill={BREECH} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <path d={`M ${lx - 26} -190 L ${lx - 22} -22 L ${lx + 24} -22 L ${lx + 28} -190 Z`} fill={BOOT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <path d={`M ${lx - 46} -230 L ${lx + 48} -230 L ${lx + 36} -180 L ${lx - 36} -180 Z`} fill={BOOT_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <path d={`M ${lx - 26} -22 Q ${lx - 30} 2 ${lx} 4 L ${lx + 64} 4 Q ${lx + 70} -16 ${lx + 24} -26 Z`} fill={BOOT_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <path d={`M ${lx - 26} -40 l -26 -8`} stroke={SILVER} strokeWidth={5} strokeLinecap="round" />
              <circle cx={lx - 56} cy={-50} r={9} fill="none" stroke={SILVER} strokeWidth={4} />
            </g>
          );
        })}
        {/* back arm holding the staff */}
        <path d="M -48 -440 Q -100 -380 -112 -330" stroke={CLOAK} strokeWidth={50} fill="none" strokeLinecap="round" />
        {staff ? <circle cx={-114} cy={-326} r={24} fill={SKIN} stroke={INK} strokeWidth={5} /> : null}
        {/* doublet + breeches top */}
        <path d="M -62 -470 L 62 -470 L 70 -300 L -70 -300 Z" fill={DOUBLET} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={4} cy={-440 + k * 30} r={6} fill={SILVER} stroke={INK} strokeWidth={2.5} />)}
        <path d="M -70 -310 L 70 -310" stroke={BAND} strokeWidth={10} />
        {/* cloak front edges hanging from the shoulders */}
        <path d={`M -64 -472 Q -100 -330 ${-120 - flap * 0.5} -150 L -70 -170 Q -66 -330 -40 -460 Z`} fill={CLOAK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d={`M 64 -472 Q 104 -330 ${118 - flap * 0.3} -160 L 84 -170 Q 76 -330 46 -460 Z`} fill={CLOAK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d={`M -80 -420 Q -96 -300 -104 -190`} stroke={CLOAK_HI} strokeWidth={6} fill="none" />
        {/* purse at the belt */}
        {purse ? (
          <g transform="translate(54 -286)">
            <path d="M -26 0 Q -34 46 0 52 Q 34 46 26 0 Z" fill="#8A5A2E" stroke={INK} strokeWidth={5} />
            <path d="M -26 0 L 26 0" stroke={GOLD} strokeWidth={6} />
          </g>
        ) : null}
        {/* pointing arm */}
        <path d={`M ${sh[0]} ${sh[1]} Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={CLOAK} strokeWidth={50} fill="none" strokeLinecap="round" />
        <path d={`M ${sh[0]} ${sh[1]} Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={CLOAK_HI} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} transform="translate(0 -12)" />
        <g transform={`translate(${hand[0]} ${hand[1]}) rotate(${ang})`}>
          <path d="M -14 -28 L 6 -28 L 6 28 L -14 28 Z" fill={COLLAR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <ellipse cx={22} cy={0} rx={26} ry={22} fill={SKIN} stroke={INK} strokeWidth={5} />
          <rect x={34} y={-14} width={58 * Math.max(0.25, point)} height={15} rx={7.5} fill={SKIN} stroke={INK} strokeWidth={4.5} />
          <path d="M 22 -8 Q 30 4 22 14" stroke={SKIN_D} strokeWidth={4} fill="none" />
        </g>
        {/* falling-band collar */}
        <path d="M -58 -482 L 58 -482 L 70 -436 Q 0 -420 -70 -436 Z" fill={COLLAR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 0 -482 L 0 -428" stroke="#D9CFBA" strokeWidth={4} />
        {/* hair, head, face (3/4 view, looking right) */}
        <path d="M -48 -560 Q -70 -510 -60 -470 L -30 -476 Q -38 -520 -30 -548 Z" fill={HAIR} stroke={INK} strokeWidth={5} />
        <path d="M 48 -560 Q 64 -512 54 -474 L 34 -480 Q 40 -520 34 -548 Z" fill={HAIR} stroke={INK} strokeWidth={5} />
        <ellipse cx={4} cy={-530} rx={44} ry={52} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M 40 -536 Q 58 -522 42 -510" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -6 -556 L 18 -548 M 26 -548 L 44 -556" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <circle cx={12} cy={-538} r={5.5} fill={INK} />
        <circle cx={36} cy={-538} r={5.5} fill={INK} />
        <path d="M 6 -500 Q 24 -508 44 -500 L 46 -494 Q 24 -500 6 -494 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
        <path d="M 22 -490 L 30 -470 L 38 -490 Z" fill={HAIR} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M -38 -510 Q -30 -500 -36 -490" stroke={SKIN_D} strokeWidth={4} fill="none" />
        {/* tall Puritan hat (capotain) */}
        <ellipse cx={4} cy={-574} rx={112} ry={20} fill={HAT} stroke={INK} strokeWidth={6} />
        <path d="M -48 -576 L -42 -704 Q 8 -716 54 -704 L 58 -576 Z" fill={HAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <ellipse cx={6} cy={-704} rx={48} ry={10} fill="#25222A" stroke={INK} strokeWidth={5} />
        <rect x={-47} y={-604} width={104} height={20} fill={BAND} stroke={INK} strokeWidth={4} />
        <rect x={-6} y={-608} width={26} height={28} rx={3} fill="none" stroke={SILVER} strokeWidth={6} />
        <path d="M -30 -690 L -26 -610" stroke="#3A3640" strokeWidth={6} opacity={0.8} />
      </g>
    </g>
  );
};

// ---------- scenery ----------
const GoldSky: React.FC<{ id: string; horizon: number; top?: string; mid?: string; low?: string; sun?: P }> = ({ id, horizon, top = "#7FB8D0", mid = "#F7D9A0", low = "#FBEACB", sun }) => (
  <>
    <defs>
      <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="0.65" stopColor={mid} />
        <stop offset="1" stopColor={low} />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={horizon + 4} fill={`url(#${id}sky)`} />
    {sun ? (
      <>
        <circle cx={sun[0]} cy={sun[1]} r={150} fill="#FFF4C8" opacity={0.45} />
        <circle cx={sun[0]} cy={sun[1]} r={84} fill="#FFE9A0" stroke="#F2B544" strokeWidth={6} />
      </>
    ) : null}
  </>
);

const Cloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 20 Q -130 -30 -70 -30 Q -50 -80 10 -66 Q 60 -96 100 -46 Q 150 -46 140 20 Z" fill="#FFF8EA" stroke={INK} strokeWidth={5} strokeLinejoin="round" opacity={0.95} />
  </g>
);

// half-timbered cottage, origin = bottom centre
const Cottage: React.FC<{ x: number; y: number; s?: number; w?: number; lit?: boolean; seed?: string }> = ({ x, y, s = 1, w = 260, lit = false, seed = "c" }) => {
  const h = 230;
  const tone = random(`${seed}t`) > 0.5 ? PLASTER : "#F2D7A6";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-w / 2} y={-h} width={w} height={h} fill={tone} stroke={INK} strokeWidth={6} />
      {[-w / 2 + 6, -w / 6, w / 6, w / 2 - 6].map((bx, k) => <path key={k} d={`M ${bx} ${-h} L ${bx} 0`} stroke={BEAM} strokeWidth={12} />)}
      <path d={`M ${-w / 2} ${-h / 2} L ${w / 2} ${-h / 2}`} stroke={BEAM} strokeWidth={12} />
      <path d={`M ${-w / 2 + 6} ${-h / 2} L ${-w / 6} ${-h} M ${w / 6} ${-h} L ${w / 2 - 6} ${-h / 2}`} stroke={BEAM} strokeWidth={10} />
      <rect x={-24} y={-100} width={48} height={100} fill="#6B4A2E" stroke={INK} strokeWidth={5} />
      <rect x={w / 6 + 14} y={-96} width={44} height={48} fill={lit ? "#FFD983" : "#3A3A48"} stroke={INK} strokeWidth={5} />
      <path d={`M ${-w / 2 - 26} ${-h + 4} L 0 ${-h - 150} L ${w / 2 + 26} ${-h + 4} Z`} fill={random(`${seed}r`) > 0.5 ? ROOF : "#C9A060"} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={w / 4} y={-h - 120} width={34} height={70} fill={C.brickDark} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// flint church tower, origin = bottom centre
const Church: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-470} width={160} height={470} fill={FLINT} stroke={INK} strokeWidth={6} />
    {new Array(20).fill(0).map((_, k) => <circle key={k} cx={-60 + random(`fl${k}`) * 120} cy={-450 + random(`fly${k}`) * 430} r={6} fill={FLINT_D} />)}
    {[-80, -40, 0, 40].map((bx) => <rect key={bx} x={bx} y={-500} width={40} height={30} fill={bx % 80 === 0 ? FLINT : "none"} stroke={bx % 80 === 0 ? INK : "none"} strokeWidth={5} />)}
    <path d="M -30 -330 Q 0 -380 30 -330 L 30 -250 L -30 -250 Z" fill="#2E2A33" stroke={INK} strokeWidth={5} />
    <rect x={-200} y={-200} width={130} height={200} fill={FLINT} stroke={INK} strokeWidth={6} />
    <path d="M -214 -200 L -135 -270 L -60 -200 Z" fill={ROOF_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

// simple villager (bystander), origin = feet
const Villager: React.FC<{ x: number; y: number; s?: number; f: number; coat: string; hat?: "coif" | "cap" | "none"; look?: number; seed?: string }> = ({ x, y, s = 1, f, coat, hat = "cap", look = 1, seed = "v" }) => {
  const sway = Math.sin(f / 9 + random(seed) * 6) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M -44 0 Q -50 -120 -34 -170 L 34 -170 Q 50 -120 44 0 Z`} fill={coat} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -30 -170 L 30 -170 L 22 -150 L -22 -150 Z" fill={COLLAR} stroke={INK} strokeWidth={4} />
      <g transform={`translate(${sway} 0)`}>
        <circle cx={0} cy={-205} r={34} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={10 * look} cy={-208} r={4.5} fill={INK} />
        <circle cx={-6 + 10 * look} cy={-208} r={4.5} fill={INK} />
        <ellipse cx={4 * look} cy={-188} rx={7} ry={8} fill={INK} />
        {hat === "coif" ? <path d="M -38 -200 Q -40 -250 0 -250 Q 40 -250 38 -200 Q 20 -230 -20 -230 Q -36 -222 -38 -200 Z" fill={COLLAR} stroke={INK} strokeWidth={4} /> : null}
        {hat === "cap" ? <path d="M -36 -222 Q 0 -262 36 -222 Z" fill={BEAM} stroke={INK} strokeWidth={4} /> : null}
      </g>
    </g>
  );
};

const Pond: React.FC<{ x: number; y: number; rx: number; ry: number; f: number }> = ({ x, y, rx, ry, f }) => (
  <g>
    <ellipse cx={x} cy={y} rx={rx + 18} ry={ry + 10} fill={GRASS_D} stroke={INK} strokeWidth={5} />
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={WATER} stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((k) => {
      const p = ((f / 40 + k / 3) % 1);
      return <ellipse key={k} cx={x + (k - 1) * rx * 0.35} cy={y + (k % 2 ? -ry * 0.2 : ry * 0.25)} rx={rx * 0.18 * (0.4 + p)} ry={ry * 0.1 * (0.4 + p)} fill="none" stroke="#DDF1F2" strokeWidth={4} opacity={1 - p} />;
    })}
    {[[-0.75, -0.2], [0.8, 0.1], [-0.6, 0.45]].map(([a, b], k) => (
      <g key={k} transform={`translate(${x + a * rx} ${y + b * ry})`}>
        <path d="M 0 0 L -6 -70 M 8 0 L 14 -60 M -8 0 L -22 -50" stroke={HEDGE} strokeWidth={6} strokeLinecap="round" />
        <rect x={-10} y={-90} width={10} height={30} rx={5} fill="#6B4A2E" />
      </g>
    ))}
  </g>
);

const Candle: React.FC<{ x: number; y: number; s?: number; f: number; lit?: number; h?: number }> = ({ x, y, s = 1, f, lit = 1, h = 120 }) => {
  const fl = 1 + Math.sin(f / 2.3 + x) * 0.08;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lit > 0 ? <circle cx={0} cy={-h - 26} r={70 * lit} fill={FLAME} opacity={0.22 * lit} /> : null}
      <rect x={-18} y={-h} width={36} height={h} rx={6} fill={CANDLE} stroke={INK} strokeWidth={5} />
      <path d={`M -18 ${-h + 8} Q -10 ${-h + 26} -6 ${-h + 10}`} stroke={INK} strokeWidth={3} fill="#FFFFFF" />
      <path d={`M 0 ${-h} L 0 ${-h - 12}`} stroke={INK} strokeWidth={4} />
      {lit > 0 ? (
        <g transform={`translate(0 ${-h - 12}) scale(${lit * fl})`}>
          <path d="M 0 -46 Q 18 -16 12 0 Q 0 10 -12 0 Q -18 -16 0 -46 Z" fill={FLAME} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 0 -24 Q 7 -8 4 0 Q 0 4 -4 0 Q -7 -8 0 -24 Z" fill="#FFF4C8" />
        </g>
      ) : null}
    </g>
  );
};

const Coin: React.FC<{ x: number; y: number; s?: number; spin?: number }> = ({ x, y, s = 1, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * Math.max(0.15, Math.abs(Math.cos(spin)))} ${s})`}>
    <circle r={34} fill={GOLD} stroke={INK} strokeWidth={5} />
    <circle r={22} fill="none" stroke={GOLD_D} strokeWidth={4} />
    <path d="M -8 -10 Q 8 -18 8 -4 Q 8 8 -8 12" stroke={GOLD_D} strokeWidth={4} fill="none" />
  </g>
);

// wooden sign on a post, origin = post foot
const Signpost: React.FC<{ x: number; y: number; s?: number; signs: { t: string; dir: 1 | -1; col?: string; crossed?: number; pop?: number }[] }> = ({ x, y, s = 1, signs }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-12} y={-560} width={24} height={560} fill={STAFF} stroke={INK} strokeWidth={5} />
    {signs.map((g, k) => {
      const yy = -520 + k * 130;
      const w = 30 + g.t.length * 31;
      const p = g.pop ?? 1;
      if (p <= 0) return null;
      const d = g.dir;
      return (
        <g key={k} transform={`translate(0 ${yy}) scale(${p})`}>
          <path d={`M 0 -44 L ${d * w} -44 L ${d * (w + 40)} 0 L ${d * w} 44 L 0 44 Z`} fill={g.col ?? "#E8C58C"} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <text x={d * (w / 2 + 6)} y={16} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={INK}>{g.t}</text>
          {g.crossed && g.crossed > 0 ? <path d={`M ${d * 10} 0 L ${d * (10 + (w + 10) * g.crossed)} 0`} stroke={C.brick} strokeWidth={14} strokeLinecap="round" /> : null}
        </g>
      );
    })}
  </g>
);

const Hourglass: React.FC<{ x: number; y: number; s?: number; f: number; period?: number }> = ({ x, y, s = 1, f, period = 24 }) => {
  const k = Math.floor(f / period);
  const t = (f % period) / period;
  const flip = interpolate(t, [0.82, 1], [0, 180], clamp);
  const sand = Math.min(1, t / 0.8);
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${flip + (k % 2) * 0})`}>
      <rect x={-80} y={-130} width={160} height={20} rx={6} fill="#7A5230" stroke={INK} strokeWidth={5} />
      <rect x={-80} y={110} width={160} height={20} rx={6} fill="#7A5230" stroke={INK} strokeWidth={5} />
      <path d="M -60 -110 L 60 -110 Q 60 -40 8 0 Q 60 40 60 110 L -60 110 Q -60 40 -8 0 Q -60 -40 -60 -110 Z" fill="#E8F4F6" opacity={0.7} stroke={INK} strokeWidth={5} />
      <path d={`M ${-50 * (1 - sand)} ${-110 + 100 * sand} L ${50 * (1 - sand)} ${-110 + 100 * sand} L 0 -6 Z`} fill={GOLD_D} opacity={sand < 1 ? 1 : 0} />
      <path d={`M -54 106 Q 0 ${106 - 80 * sand} 54 106 Z`} fill={GOLD_D} />
      {sand < 1 ? <path d="M 0 -4 L 0 104" stroke={GOLD_D} strokeWidth={4} /> : null}
    </g>
  );
};

// the book: "The Discovery of Witches" (1647) as a small quarto pamphlet, origin = centre
const Book: React.FC<{ x: number; y: number; s?: number; rot?: number; glow?: number }> = ({ x, y, s = 1, rot = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {glow > 0 ? <circle r={260} fill={GOLD_HI} opacity={0.35 * glow} /> : null}
    <rect x={-150} y={-200} width={300} height={400} rx={10} fill="#E9DCC0" stroke={INK} strokeWidth={8} />
    <rect x={-150} y={-200} width={24} height={400} fill="#C9B28A" stroke={INK} strokeWidth={6} />
    <rect x={-104} y={-170} width={232} height={340} fill="none" stroke={INK} strokeWidth={4} />
    <text x={12} y={-110} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>THE</text>
    <text x={12} y={-64} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={INK}>DISCOVERY</text>
    <text x={12} y={-24} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>OF</text>
    <text x={12} y={26} textAnchor="middle" fontFamily={titleFont} fontSize={48} fill={C.brick}>WITCHES</text>
    <path d="M -60 60 L 84 60" stroke={INK} strokeWidth={3} />
    <text x={12} y={110} textAnchor="middle" fontFamily={typeFont} fontSize={26} fill={INK}>M. HOPKINS</text>
    <text x={12} y={150} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>1647</text>
  </g>
);

// 17th-century merchant ship, origin = waterline centre, sailing right
const Ship: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const rock = Math.sin(f / 10) * 3;
  const billow = 1 + Math.sin(f / 6) * 0.04;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rock}) scale(${s})`}>
      <path d="M -260 -90 L 250 -90 L 300 -150 L 330 -150 L 250 30 L -220 30 L -280 -170 L -250 -170 Z" fill="#8A5A34" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -250 -60 L 260 -60" stroke="#5E3A1E" strokeWidth={8} />
      {[-150, -60, 30, 120].map((px) => <rect key={px} x={px} y={-50} width={36} height={26} fill="#3A2416" stroke={INK} strokeWidth={4} />)}
      {[-120, 60, 210].map((mx, k) => {
        const h = [470, 560, 380][k];
        return (
          <g key={mx}>
            <rect x={mx - 8} y={-90 - h} width={16} height={h} fill="#6B4A2E" stroke={INK} strokeWidth={4} />
            {[0, 1].map((r) => {
              const top = -90 - h + 40 + r * (h * 0.45);
              const w = (k === 1 ? 150 : 120) * (1 - r * 0.15);
              return <path key={r} d={`M ${mx - w} ${top} L ${mx + w} ${top} Q ${mx + w * billow * 1.08} ${top + h * 0.2} ${mx + w} ${top + h * 0.36} L ${mx - w} ${top + h * 0.36} Q ${mx - w * 0.9} ${top + h * 0.2} ${mx - w} ${top} Z`} fill="#FBF3E2" stroke={INK} strokeWidth={6} strokeLinejoin="round" />;
            })}
          </g>
        );
      })}
      <path d={`M 60 ${-650} l 70 16 l -70 16 Z`} fill={C.brick} stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Waves: React.FC<{ y: number; f: number; col: string; amp?: number; speed?: number }> = ({ y, f, col, amp = 18, speed = 3 }) => {
  const off = (f * speed) % 160;
  let d = `M ${-160 - off} ${y}`;
  for (let k = 0; k < 10; k++) d += ` q 40 ${-amp} 80 0 q 40 ${amp} 80 0`;
  d += ` L 1240 1920 L -160 1920 Z`;
  return <path d={d} fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />;
};

// a modern student at a desk (seen from behind/side), origin = desk front centre
const Student: React.FC<{ x: number; y: number; s?: number; f: number; shirt: string; hair: string; skin?: string; hand?: number; seed: string }> = ({ x, y, s = 1, f, shirt, hair, skin = SKIN, hand = 0, seed }) => {
  const wob = Math.sin(f / 5 + random(seed) * 6) * 4;
  const up = hand;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M -70 -40 Q -80 -170 -50 -200 L 50 -200 Q 80 -170 70 -40 Z`} fill={shirt} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M 50 -180 Q ${70 + up * 10} ${-260 - up * 60} ${60 + wob} ${-300 - up * 90}`} stroke={shirt} strokeWidth={34} fill="none" strokeLinecap="round" opacity={up > 0 ? 1 : 0} />
      {up > 0 ? <circle cx={60 + wob} cy={-310 - up * 90} r={22} fill={skin} stroke={INK} strokeWidth={5} /> : null}
      <circle cx={0} cy={-250} r={52} fill={skin} stroke={INK} strokeWidth={6} />
      <path d="M -54 -256 Q -50 -320 0 -316 Q 54 -320 54 -256 Q 30 -290 -54 -256 Z" fill={hair} stroke={INK} strokeWidth={5} />
      <circle cx={-16} cy={-246} r={6} fill={INK} />
      <circle cx={18} cy={-246} r={6} fill={INK} />
      <path d="M -14 -220 Q 2 -206 18 -220" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={-130} y={-40} width={260} height={30} rx={6} fill="#C99A62" stroke={INK} strokeWidth={6} />
      <rect x={-110} y={-10} width={220} height={60} fill="#8E7A62" stroke={INK} strokeWidth={6} />
    </g>
  );
};

// the 2022 record clearing her name, origin = centre; stamp: 0..1
const Record: React.FC<{ x: number; y: number; s?: number; stamp: number; rot?: number }> = ({ x, y, s = 1, stamp, rot = -3 }) => {
  const sc = stamp > 0 ? interpolate(stamp, [0, 1], [2.2, 1], clamp) : 0;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-250} y={-320} width={500} height={640} rx={10} fill="#FFFDF6" stroke={INK} strokeWidth={8} />
      <text x={0} y={-240} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>COMMONWEALTH OF</text>
      <text x={0} y={-196} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>MASSACHUSETTS</text>
      <path d="M -180 -170 L 180 -170" stroke={INK} strokeWidth={4} />
      <text x={0} y={-110} textAnchor="middle" fontFamily={titleFont} fontSize={38} fill={INK}>ELIZABETH</text>
      <text x={0} y={-62} textAnchor="middle" fontFamily={titleFont} fontSize={38} fill={INK}>JOHNSON JR.</text>
      <text x={0} y={-16} textAnchor="middle" fontFamily={typeFont} fontSize={28} fill={INK}>convicted 1693</text>
      {[40, 80, 120, 160, 200, 240].map((ly, k) => <path key={ly} d={`M -190 ${ly} L ${k % 2 ? 150 : 190} ${ly}`} stroke="#B8B0A0" strokeWidth={8} strokeLinecap="round" />)}
      {stamp > 0 ? (
        <g transform={`translate(10 140) rotate(-12) scale(${sc})`} opacity={Math.min(1, stamp * 2)}>
          <rect x={-220} y={-80} width={440} height={160} rx={18} fill="none" stroke="#2E9E5A" strokeWidth={14} />
          <text x={0} y={-6} textAnchor="middle" fontFamily={titleFont} fontSize={78} fill="#2E9E5A">CLEARED</text>
          <text x={0} y={56} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill="#2E9E5A">2022</text>
        </g>
      ) : null}
    </g>
  );
};

const Silhouette: React.FC<{ id: string; opacity?: number; children: React.ReactNode }> = ({ id, opacity = 0.35, children }) => (
  <>
    <defs>
      <filter id={id}><feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0 0.08  0 0 0 1 0" /></filter>
    </defs>
    <g filter={`url(#${id})`} opacity={opacity}>{children}</g>
  </>
);

const Fields: React.FC<{ y: number; seed: string }> = ({ y, seed }) => (
  <>
    <path d={`M 0 ${y + 30} Q 270 ${y - 30} 540 ${y + 10} Q 820 ${y + 40} 1080 ${y - 10} L 1080 1920 L 0 1920 Z`} fill={GRASS} stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <path key={k} d={`M ${-40 + k * 220} ${y + 40} q ${60 + random(`${seed}h${k}`) * 40} -40 ${150} 0`} fill={HEDGE} stroke={INK} strokeWidth={4} />
    ))}
    <path d={`M 0 ${y + 160} Q 540 ${y + 110} 1080 ${y + 170}`} stroke={GRASS_D} strokeWidth={8} fill="none" opacity={0.6} />
  </>
);

const Village: React.FC<{ f: number; y: number }> = ({ f, y }) => (
  <>
    <Church x={950} y={y + 10} s={0.62} />
    <Cottage x={640} y={y + 24} s={0.5} seed="a" />
    <Cottage x={800} y={y + 40} s={0.55} w={220} seed="b" />
    <Cottage x={1010} y={y + 52} s={0.5} w={200} seed="d" />
    <path d={`M 560 ${y + 60} L 1080 ${y + 60}`} stroke={INK} strokeWidth={4} opacity={0.3} />
    {[0, 1, 2].map((k) => {
      const p = ((f / 30 + k / 3) % 1);
      return <circle key={k} cx={690 + 6 * Math.sin(p * 6)} cy={y - 190 - p * 120} r={10 + p * 20} fill="#EFE6D6" opacity={0.6 * (1 - p)} />;
    })}
  </>
);

export const WitchFinder: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  let mode: string = v.mode ?? "village";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let sky: "night" | "day" | "dark" | "dawn" = "day";
  let body: React.ReactNode = null;
  let lf = f;
  if (mode === "tests") {
    const cut = (v.cutAt ?? 0.5) * dur;
    mode = f < cut ? "watch" : "pond";
    lf = f < cut ? f : f - cut;
  }

  if (mode === "village") {
    // frame 0: the witch-finder fills the frame, finger already jabbing at the villagers by the pond
    const jab = 0.82 + 0.18 * popIn(f, 0, 7) + 0.03 * Math.sin(f / 6);
    body = (
      <>
        <GoldSky id="ep054v" horizon={1180} sun={[880, 760]} />
        <Cloud x={230} y={640} s={1.1} />
        <Cloud x={720} y={560} s={0.8} />
        <Fields y={1150} seed="v" />
        <Village f={f} y={1150} />
        <Pond x={800} y={1330} rx={230} ry={52} f={f} />
        <Villager x={660} y={1520} s={0.92} f={f} coat="#7E4A6A" hat="coif" look={-1} seed="v1" />
        <Villager x={800} y={1545} s={1.0} f={f} coat={C.teal} hat="cap" look={-1} seed="v2" />
        <Villager x={940} y={1515} s={0.9} f={f} coat="#C9772E" hat="coif" look={-1} seed="v3" />
        <Villager x={1040} y={1560} s={0.95} f={f} coat="#5A6C9A" hat="cap" look={-1} seed="v4" />
        <rect x={0} y={1700} width={1080} height={220} fill={GRASS_D} opacity={0.5} />
        <Hopkins x={360} y={1880} s={1.8} f={f} point={jab} aim={-6} wind={1.2} />
      </>
    );
  } else if (mode === "watch") {
    // 'watching': a candle-lit room, an empty stool with a shawl, the hourglass flipping, days and nights passing at the window
    sky = "dark";
    const day = Math.floor(lf / 14) % 2 === 0;
    const burn = interpolate(lf, [0, 60], [150, 70], clamp);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1440} fill="#3E3046" />
        <rect x={0} y={1440} width={1080} height={480} fill="#5A4636" stroke={INK} strokeWidth={6} />
        {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M 0 ${1500 + k * 90} L 1080 ${1500 + k * 90}`} stroke="#4A382A" strokeWidth={6} />)}
        <circle cx={430} cy={1300} r={520} fill={FLAME} opacity={0.13} />
        <g transform="translate(110 620)">
          <rect x={0} y={0} width={250} height={320} fill={day ? "#9CCFE0" : "#1E2A47"} stroke={INK} strokeWidth={10} />
          {day ? <circle cx={170} cy={90} r={46} fill="#FFE9A0" stroke={INK} strokeWidth={5} /> : <path d="M 160 60 a 44 44 0 1 0 40 70 a 34 34 0 1 1 -40 -70 Z" fill="#F4EAD5" stroke={INK} strokeWidth={4} />}
          <path d="M 125 0 L 125 320 M 0 160 L 250 160" stroke={BEAM} strokeWidth={12} />
          <rect x={-20} y={320} width={290} height={24} fill={BEAM} stroke={INK} strokeWidth={5} />
        </g>
        <circle cx={640} cy={900} r={430} fill={FLAME} opacity={0.16} />
        <Silhouette id="ep054sh" opacity={0.6}>
          <Hopkins x={660} y={1480} s={2.0} f={f} point={0} facing={-1} wind={0} />
        </Silhouette>
        {/* empty stool with a shawl */}
        <g transform="translate(430 1640)">
          <path d="M -110 -150 L -130 0 M 110 -150 L 130 0 M -40 -150 L -50 0 M 40 -150 L 50 0" stroke="#7A5230" strokeWidth={18} strokeLinecap="round" />
          <ellipse cx={0} cy={-160} rx={140} ry={34} fill="#9A6A40" stroke={INK} strokeWidth={6} />
          <path d="M -120 -176 Q -40 -230 60 -190 Q 120 -170 110 -120 Q 70 -150 -10 -150 Q -90 -140 -120 -176 Z" fill="#8C8FA6" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        </g>
        <Candle x={660} y={1660} s={1.3} f={f} h={burn} />
        <Hourglass x={820} y={1080} s={0.9} f={lf} period={20} />
        <Hopkins x={930} y={1910} s={1.5} f={f} point={0} facing={-1} wind={0.2} />
      </>
    );
  } else if (mode === "pond") {
    // the swimming test: an EMPTY chair is lowered from the beam into the pond; FLOAT? → GUILTY
    const dip = interpolate(lf, [4, 14, 22, 30], [0, 1, 1, 0.75], clamp);
    const splash = interpolate(lf, [12, 16, 30], [0, 1, 0], clamp);
    const guiltyAt = v.guiltyAt !== undefined ? v.guiltyAt * dur - ((v.cutAt ?? 0.5) * dur) : 30;
    const g = popIn(lf, guiltyAt, 6);
    body = (
      <>
        <GoldSky id="ep054p" horizon={1100} top="#8FB4C6" mid="#E6E2CC" low="#F3EAD2" />
        <Cloud x={820} y={760} s={1.2} />
        <Fields y={1080} seed="p" />
        <Villager x={400} y={1240} s={0.62} f={f} coat="#7E4A6A" hat="coif" seed="p1" />
        <Villager x={500} y={1250} s={0.66} f={f} coat={C.teal} hat="cap" seed="p2" />
        <Villager x={600} y={1236} s={0.6} f={f} coat="#C9772E" hat="coif" seed="p3" />
        <Pond x={560} y={1520} rx={470} ry={190} f={f} />
        {/* the swimming test, shown only as a rope from a stake on the bank, pulled taut into the pond (nobody drawn) */}
        <rect x={150} y={1420} width={30} height={150} rx={6} fill={BEAM} stroke={INK} strokeWidth={6} />
        <path d={`M 165 1440 Q ${380} ${1380 + dip * 60} 590 1470`} stroke="#C9A060" strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d={`M 165 1440 Q ${380} ${1380 + dip * 60} 590 1470`} stroke={INK} strokeWidth={2.5} fill="none" opacity={0.5} />
        {dip > 0.3 ? <ellipse cx={590} cy={1470} rx={110 + 30 * Math.sin(lf / 3)} ry={26} fill="none" stroke="#DDF1F2" strokeWidth={6} /> : null}
        {dip > 0.3 ? <ellipse cx={590} cy={1470} rx={150 + 40 * Math.sin(lf / 4 + 1)} ry={40} fill="none" stroke="#DDF1F2" strokeWidth={4} opacity={0.6} /> : null}
        {dip > 0.3 ? <ellipse cx={590} cy={1470} rx={90} ry={18} fill={WATER_D} opacity={0.5} /> : null}
        <g transform={`translate(${290} ${990 + Math.sin(lf / 5) * 6}) rotate(-6)`}>
          <rect x={-150} y={-60} width={300} height={110} rx={16} fill={C.cream} stroke={INK} strokeWidth={7} />
          <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={68} fill={INK}>FLOAT?</text>
        </g>
        {splash > 0
          ? [0, 1, 2, 3, 4, 5].map((k) => (
              <circle key={k} cx={590 + Math.cos(k) * 130 * splash} cy={1460 - Math.abs(Math.sin(k * 1.7)) * 140 * splash} r={18 * (1 - splash * 0.5)} fill="#DDF1F2" stroke={INK} strokeWidth={3} />
            ))
          : null}
        <Hopkins x={960} y={1910} s={1.45} f={f} point={1} aim={38} facing={-1} wind={0.6} />
        {g > 0 ? (
          <g transform={`translate(540 820) rotate(-8) scale(${g})`}>
            <rect x={-300} y={-90} width={600} height={180} rx={20} fill={C.cream} stroke={C.brick} strokeWidth={14} />
            <text x={0} y={42} textAnchor="middle" fontFamily={titleFont} fontSize={124} fill={C.brick}>GUILTY!</text>
          </g>
        ) : null}
      </>
    );
  }
  if (mode === "fee") {
    // sunny road out of town: coins rain into his purse, £23 counts up, STOWMARKET gets crossed off → NEXT TOWN
    const nextAt = (v.nextAt ?? 0.72) * dur;
    const hx = interpolate(f, [0, dur], [640, 800], clamp) + (f > nextAt ? (f - nextAt) * 9 : 0);
    const count = Math.round(interpolate(f, [6, 30], [0, 23], { ...clamp, easing: Easing.out(Easing.cubic) }));
    const pop = popIn(f, 4, 8);
    const purse: P = [hx + 54 * 1.3, 1850 - 286 * 1.3];
    body = (
      <>
        <GoldSky id="ep054f" horizon={1120} sun={[200, 820]} />
        <Cloud x={820} y={700} s={0.9} />
        <Fields y={1100} seed="f" />
        <path d="M 470 1120 L 610 1120 L 1000 1920 L 80 1920 Z" fill="#D9B98A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 540 1140 L 540 1920" stroke="#C4A272" strokeWidth={10} strokeDasharray="40 50" />
        <Cottage x={880} y={1135} s={0.42} seed="ff" />
        <Church x={1010} y={1140} s={0.4} />
        <Signpost x={100} y={1640} s={0.82} signs={[
          { t: "STOWMARKET", dir: 1, crossed: ease(f, nextAt - 10, nextAt - 2) },
          { t: "NEXT TOWN", dir: 1, col: C.mustard, pop: popIn(f, nextAt, 7) },
        ]} />
        {new Array(9).fill(0).map((_, k) => {
          const t0 = 4 + k * 3;
          const age = f - t0;
          if (age < 0 || age > 16) return null;
          const p = age / 16;
          return <Coin key={k} x={purse[0] + (random(`cx${k}`) - 0.5) * 120 * (1 - p)} y={lerp(560, purse[1], p * p)} s={0.9} spin={f / 2 + k} />;
        })}
        <Hopkins x={hx} y={1850} s={1.3} f={f} walk point={0} purse wind={0.8} />
        {pop > 0 ? (
          <g transform={`translate(560 860) rotate(-4) scale(${pop})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={250} fill={C.mustard} stroke={INK} strokeWidth={14} paintOrder="stroke" strokeLinejoin="round">{`£${count}`}</text>
          </g>
        ) : null}
      </>
    );
  } else if (mode === "toll") {
    // remembered, not shown: one candle lit for each life, ~100 in all
    sky = "night";
    const n = Math.round(interpolate(f, [4, dur * 0.8], [0, 100], { ...clamp, easing: Easing.inOut(Easing.quad) }));
    const cells: React.ReactNode[] = [];
    for (let r = 0; r < 10; r++) {
      const yy = 1050 + r * 72 + r * r * 3;
      const sc = 0.32 + r * 0.06;
      const span = 300 + r * 46;
      for (let c = 0; c < 10; c++) {
        const idx = r * 10 + c;
        const xx = 540 - span + (c + 0.5) * ((span * 2) / 10);
        cells.push(<Candle key={idx} x={xx} y={yy} s={sc} f={f + idx} h={90} lit={idx < n ? 1 : 0} />);
      }
    }
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#1B1830" />
        <circle cx={540} cy={1400} r={700} fill={FLAME} opacity={0.06 + 0.1 * (n / 100)} />
        <path d="M 0 1000 Q 540 930 1080 1000 L 1080 1920 L 0 1920 Z" fill="#2A2440" stroke={INK} strokeWidth={6} />
        {cells}
        <text x={540} y={830} textAnchor="middle" fontFamily={titleFont} fontSize={230} fill={C.cream} stroke={INK} strokeWidth={12} paintOrder="stroke">{`~${n}`}</text>
      </>
    );
  } else if (mode === "ship") {
    // his little book in a spotlight: where did it go? → flash → a ship carries it west, ENGLAND ⋯> SALEM
    const answerAt = (v.answerAt ?? 0.6) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      sky = "dark";
      body = (
        <>
          <path d="M 470 0 L 610 0 L 960 1700 L 120 1700 Z" fill={GOLD_HI} opacity={0.14} />
          <ellipse cx={540} cy={1240} rx={360} ry={50} fill={GOLD_HI} opacity={0.2} />
          <Book x={540} y={930} s={1.25} rot={Math.sin(f / 10) * 4} glow={0.6} />
          {[0, 1, 2].map((k) => {
            const p = popIn(f, 6 + k * 7, 8);
            const qx = [860, 210, 900][k];
            const qy = [680, 760, 1200][k];
            return p > 0 ? (
              <text key={k} x={qx} y={qy} textAnchor="middle" fontFamily={titleFont} fontSize={[150, 110, 100][k]} fill={C.mustard} stroke={INK} strokeWidth={9} paintOrder="stroke" opacity={p} transform={`rotate(${Math.sin(f / 6 + k) * 14} ${qx} ${qy})`}>?</text>
            ) : null;
          })}
        </>
      );
    } else {
      const a = f - answerAt;
      const flash = interpolate(a, [0, 6], [1, 0], clamp);
      const sx = interpolate(a, [0, 60], [330, 560], clamp);
      const route = ease(a, 2, 22);
      const pin = popIn(a, 18, 8);
      const arc = (t: number): P => [lerp(220, 800, t), 1010 - Math.sin(t * Math.PI) * 120];
      const pts = new Array(21).fill(0).map((_, k) => arc((k / 20) * route));
      body = (
        <>
          <GoldSky id="ep054s" horizon={1300} top="#6FA8C9" mid="#F7C98A" low="#FCE3B4" sun={[880, 1150]} />
          <Cloud x={200} y={760} s={0.8} />
          <path d={`M ${pts.map((p) => `${p[0]} ${p[1]}`).join(" L ")}`} stroke={C.brick} strokeWidth={12} fill="none" strokeDasharray="26 22" strokeLinecap="round" />
          <g transform="translate(220 1040)">
            <rect x={-150} y={-46} width={300} height={80} rx={14} fill={C.cream} stroke={INK} strokeWidth={6} />
            <text x={0} y={16} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK}>ENGLAND</text>
          </g>
          {pin > 0 ? (
            <g transform={`translate(800 1040) scale(${pin})`}>
              <path d="M 0 -150 a 46 46 0 1 1 0.1 0 Z" fill={C.brick} stroke={INK} strokeWidth={6} transform="translate(0 30)" />
              <path d="M -36 -96 L 0 -30 L 36 -96 Z" fill={C.brick} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <circle cx={0} cy={-120} r={18} fill={C.cream} stroke={INK} strokeWidth={5} />
              <rect x={-170} y={-6} width={340} height={80} rx={14} fill={C.mustard} stroke={INK} strokeWidth={6} />
              <text x={0} y={56} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK}>SALEM · 1692</text>
            </g>
          ) : null}
          <Waves y={1330} f={f} col="#4F8FA6" amp={14} speed={2} />
          <Ship x={sx} y={1500} s={0.62} f={f} />
          <Waves y={1560} f={f + 40} col={WATER} amp={20} speed={4} />
          <Waves y={1740} f={f + 80} col="#7FC0CC" amp={22} speed={5} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  } else if (mode === "today") {
    // today: a classroom of eighth-graders; the record of the last Salem 'witch' gets stamped CLEARED 2022
    const stampAt = (v.stampAt ?? 0.4) * dur;
    const st = interpolate(f, [stampAt, stampAt + 5], [0, 1], clamp);
    const rec = popIn(f, 2, 9);
    const shake = f >= stampAt && f < stampAt + 6 ? Math.sin(f * 3) * 6 : 0;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#CFE6E0" />
        <rect x={0} y={1500} width={1080} height={420} fill="#B7A48A" />
        <rect x={110} y={600} width={860} height={420} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={10} />
        <text x={540} y={684} textAnchor="middle" fontFamily={typeFont} fontSize={56} fill="#2D5DA8">CLEAR HER NAME!</text>
        <path d="M 250 712 L 830 712" stroke="#2D5DA8" strokeWidth={5} />
        <rect x={200} y={1018} width={680} height={22} fill="#9A9A9A" stroke={INK} strokeWidth={5} />
        <g transform={`translate(${shake} 0)`}>
          {rec > 0 ? <Record x={540} y={1010} s={0.86 * rec} stamp={st} /> : null}
        </g>
        <Student x={190} y={1850} s={1.05} f={f} shirt={C.teal} hair="#3A2A1E" hand={ease(f, stampAt, stampAt + 8)} seed="s1" />
        <Student x={540} y={1890} s={1.1} f={f} shirt={C.mustard} hair="#C98A3A" hand={ease(f, stampAt + 2, stampAt + 10)} seed="s2" />
        <Student x={890} y={1850} s={1.05} f={f} shirt="#B5452F" hair="#1E1A18" skin="#B07A52" hand={ease(f, stampAt + 4, stampAt + 12)} seed="s3" />
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 92} /> : null}
      {mode === "ship" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.6) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 88} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      {v.floatUntil === undefined || f < v.floatUntil * dur ? <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} /> : null}
    </Backdrop>
  );
};
