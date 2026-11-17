import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep062 Ornamental hermit – the man a Georgian landowner hired to sit in a garden grotto and look wise for the guests.
// Look: a bright SUMMER GARDEN (sky blue, lawn green, roses) around a mossy rock grotto – unlike ep061's grey sea
// and ep060's aqua workshop. The hermit: hooded brown robe, white beard, long curly nails, bare feet, staff.
// visual: { mode: "grotto" | "contract" | "guests" | "pub" | "dummy" | "gnome", headline?, accent?, top?, size?,
//           tag?, tagY?, float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           growFrom?, growTo? (contract), shhAt?, wiseAt? (guests), catchAt?, chip?, chipAt? (pub),
//           headAt? (dummy), answer?, answerAccent?, answerAt?, answerSize?, chip? (gnome) }
// Absurd-funny, never mocking: the hermit is a lovable deadpan old man.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const ROCK = "#A99C86";
const ROCK_D = "#857760";
const ROCK_HI = "#CDC2AC";
const MOSS = "#86B84E";
const MOSS_D = "#5E9136";
const CAVE_D = "#2E251D";
const GRASS = "#82C75E";
const GRASS_D = "#5FA444";
const HEDGE = "#4F9C46";
const HEDGE_D = "#377A33";
const HEDGE_HI = "#6EBA5C";
const ROBE = "#7A5236";
const ROBE_D = "#5A3A24";
const ROBE_HI = "#9A6C48";
const ROPE = "#D9B56A";
const BEARD = "#F4F1EA";
const BEARD_D = "#CFC8B8";
const SKIN = "#E6B088";
const SKIN_D = "#C38860";
const NAIL = "#F3E4A8";
const SACK = "#E2CB98";
const SACK_D = "#BFA36C";
const STRAW = "#F0C94A";
const ROSE = "#E8667C";
const ROSE_D = "#B9435A";
const PINK = "#F4A9BA";
const PINK_D = "#D77F95";
const WIG = "#F8F5EF";
const WIG_D = "#D9D2C4";
const BLUE = "#3F6FB0";
const GOLD = "#F2B544";
const GOLD_D = "#C88A1E";
const WOOD = "#A86F3C";
const WOOD_D = "#7A4A22";
const WOOD_HI = "#C88E55";
const GNOME_RED = "#E0402F";
const GNOME_RED_D = "#A82A1E";

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
        <div key={i} style={{ position: "absolute", ...(left ? { left: 70 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Limb: React.FC<{ a: P; k: P; b: P; w: number; col: string }> = ({ a, k, b, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${k[0]} ${k[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

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

const Chip: React.FC<{ x: number; y: number; p: number; text: string; w?: number; rot?: number; col?: string; font?: string; size?: number }> = ({ x, y, p, text, w = 640, rot = -3, col = C.mustard, font = titleFont, size = 60 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-56} width={w} height={112} rx={18} fill={col} stroke={INK} strokeWidth={8} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={font} fontSize={size} fill={INK} textLength={w - 70} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  );

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep062sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8FD0F4" />
      <stop offset="1" stopColor="#E6F6FF" />
    </linearGradient>
    <radialGradient id="ep062cave" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0" stopColor="#62747A" />
      <stop offset="1" stopColor="#26313A" />
    </radialGradient>
    <radialGradient id="ep062glow">
      <stop offset="0" stopColor="#FFF4D0" stopOpacity={0.75} />
      <stop offset="1" stopColor="#FFF4D0" stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep062pub" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8A5530" />
      <stop offset="1" stopColor="#6A3E1E" />
    </linearGradient>
    <linearGradient id="ep062ale" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F7C04A" />
      <stop offset="1" stopColor="#D58A1A" />
    </linearGradient>
  </defs>
);

// ---------- set pieces ----------

const Rock: React.FC<{ x: number; y: number; r: number; seed: string; col?: string }> = ({ x, y, r, seed, col = ROCK }) => {
  const n = 8;
  const pts = new Array(n)
    .fill(0)
    .map((_, i) => {
      const a = (i / n) * Math.PI * 2 + random(`rk${seed}`) * 0.6;
      const rr = r * (0.78 + random(`rk${seed}${i}`) * 0.3);
      return `${(x + Math.cos(a) * rr * 1.15).toFixed(1)},${(y + Math.sin(a) * rr * 0.85).toFixed(1)}`;
    })
    .join(" ");
  return (
    <g>
      <polygon points={pts} fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.32} rx={r * 0.38} ry={r * 0.16} fill={ROCK_HI} opacity={0.7} />
    </g>
  );
};

const Fern: React.FC<{ x: number; y: number; s?: number; f: number; flip?: boolean; col?: string }> = ({ x, y, s = 1, f, flip = false, col = HEDGE_HI }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[-70, -40, -12, 16, 44].map((a, i) => {
      const sw = Math.sin(f / 18 + i) * 3;
      return (
        <g key={i} transform={`rotate(${a + sw})`}>
          <path d="M 0 0 Q 18 -110 0 -230 Q -18 -110 0 0 Z" fill={col} stroke={INK} strokeWidth={5} />
          {[50, 100, 150, 190].map((yy, k) => (
            <path key={k} d={`M 0 ${-yy} l ${22 - k * 3} ${-16} M 0 ${-yy} l ${-22 + k * 3} ${-16}`} stroke={HEDGE_D} strokeWidth={5} strokeLinecap="round" />
          ))}
        </g>
      );
    })}
  </g>
);

// garden: sky, sun, drifting clouds, distant round trees, lawn
const Garden: React.FC<{ f: number; horizon: number }> = ({ f, horizon }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep062sky)" />
    <circle cx={880} cy={240} r={90} fill="#FFF0A8" opacity={0.9} />
    <circle cx={880} cy={240} r={150} fill="#FFF6C8" opacity={0.35} />
    {[0, 1, 2].map((k) => {
      const cx = ((k * 420 + f * 0.8) % 1500) - 200;
      const cy = 190 + k * 110;
      return (
        <g key={k} opacity={0.95}>
          <ellipse cx={cx} cy={cy} rx={110} ry={42} fill="#FFFFFF" />
          <ellipse cx={cx + 60} cy={cy - 26} rx={70} ry={44} fill="#FFFFFF" />
          <ellipse cx={cx - 50} cy={cy - 14} rx={60} ry={36} fill="#FFFFFF" />
        </g>
      );
    })}
    {[
      [60, 150],
      [240, 120],
      [880, 140],
      [1040, 170],
      [520, 110],
    ].map(([tx, r], i) => (
      <g key={i}>
        <rect x={tx - 16} y={horizon - r * 0.9} width={32} height={r} fill="#7A6040" />
        <circle cx={tx} cy={horizon - r * 1.1} r={r} fill={i % 2 ? "#6FAF5A" : "#5E9F4C"} />
        <circle cx={tx - r * 0.5} cy={horizon - r * 0.75} r={r * 0.7} fill={i % 2 ? "#64A34F" : "#559245"} />
      </g>
    ))}
    <rect x={0} y={horizon} width={1080} height={1920 - horizon} fill={GRASS} />
    <path d={`M 0 ${horizon} L 1080 ${horizon}`} stroke={GRASS_D} strokeWidth={10} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <path key={k} d={`M ${k * 210 + 30} ${horizon + 90 + (k % 2) * 140} q 10 -24 20 0 q 10 -24 20 0`} stroke={GRASS_D} strokeWidth={6} fill="none" strokeLinecap="round" />
    ))}
  </>
);

// mossy rock grotto: an arch of stones around a dark cave mouth, ivy hanging from the top, ferns at the base
const Grotto: React.FC<{ f: number; x0: number; x1: number; top: number; bottom: number }> = ({ f, x0, x1, top, bottom }) => {
  const r = (x1 - x0) / 2;
  const cx = (x0 + x1) / 2;
  const cy = top + r;
  const out = 170;
  const mass = `M ${x0 - out} ${bottom} L ${x0 - out} ${cy} Q ${x0 - out} ${top - out} ${cx} ${top - out - 20} Q ${x1 + out} ${top - out} ${x1 + out} ${cy} L ${x1 + out} ${bottom} Z`;
  const mouth = `M ${x0} ${bottom} L ${x0} ${cy} A ${r} ${r} 0 0 1 ${x1} ${cy} L ${x1} ${bottom} Z`;
  const ring: Array<[number, number, number]> = [];
  for (let y = bottom - 50; y > cy; y -= 118) {
    ring.push([x0 - 62, y, 72]);
    ring.push([x1 + 62, y, 72]);
  }
  for (let a = 180; a >= 0; a -= 22) {
    const rad = (a * Math.PI) / 180;
    ring.push([cx + Math.cos(rad) * (r + 62), cy - Math.sin(rad) * (r + 62), 74]);
  }
  const outer: Array<[number, number, number]> = [];
  for (let y = bottom - 120; y > cy; y -= 150) {
    outer.push([x0 - 150, y, 60]);
    outer.push([x1 + 150, y, 60]);
  }
  for (let a = 170; a >= 10; a -= 32) {
    const rad = (a * Math.PI) / 180;
    outer.push([cx + Math.cos(rad) * (r + 150), cy - Math.sin(rad) * (r + 140), 62]);
  }
  return (
    <g>
      <path d={mass} fill={ROCK_D} stroke={INK} strokeWidth={7} />
      {outer.map(([x, y, rr], i) => (
        <Rock key={`o${i}`} x={x} y={y} r={rr} seed={`o${i}`} col={i % 2 ? ROCK_D : ROCK} />
      ))}
      <path d={mouth} fill="url(#ep062cave)" stroke={INK} strokeWidth={8} />
      <ellipse cx={cx} cy={bottom - 10} rx={r * 0.95} ry={40} fill={CAVE_D} opacity={0.6} />
      {ring.map(([x, y, rr], i) => (
        <Rock key={`r${i}`} x={x} y={y} r={rr} seed={`r${i}`} col={i % 3 === 0 ? ROCK_HI : ROCK} />
      ))}
      {/* moss on the crown */}
      {[-0.8, -0.45, -0.1, 0.25, 0.6, 0.9].map((t, i) => {
        const a = Math.PI / 2 - t * 1.25;
        return <ellipse key={i} cx={cx + Math.cos(a) * (r + 95)} cy={cy - Math.sin(a) * (r + 100)} rx={64} ry={26} fill={i % 2 ? MOSS : MOSS_D} stroke={INK} strokeWidth={5} />;
      })}
      {/* ivy */}
      {[-0.55, -0.2, 0.3, 0.62].map((t, i) => {
        const a = Math.PI / 2 - t * 1.3;
        const sx = cx + Math.cos(a) * (r + 10);
        const sy = cy - Math.sin(a) * (r + 10);
        const len = 170 + (i % 2) * 130;
        const sw = Math.sin(f / 20 + i * 1.7) * 14;
        return (
          <g key={i}>
            <path d={`M ${sx} ${sy} Q ${sx + sw} ${sy + len / 2} ${sx + sw * 1.6} ${sy + len}`} stroke={HEDGE_D} strokeWidth={6} fill="none" />
            {[0.25, 0.5, 0.75, 1].map((u, k) => (
              <path key={k} transform={`translate(${sx + sw * 1.6 * u} ${sy + len * u}) rotate(${k % 2 ? 30 : -30})`} d="M 0 0 q -22 -14 -14 -32 q 14 4 14 14 q 0 -10 14 -14 q 8 18 -14 32 Z" fill={k % 2 ? HEDGE_HI : HEDGE} stroke={INK} strokeWidth={4} />
            ))}
          </g>
        );
      })}
      <Fern x={x0 - 40} y={bottom + 10} s={0.9} f={f} />
      <Fern x={x1 + 40} y={bottom + 10} s={0.9} f={f} flip />
    </g>
  );
};

// a low clipped hedge with pink roses along the bottom
const Hedge: React.FC<{ y: number; f: number }> = ({ y, f }) => (
  <g>
    <rect x={0} y={y + 40} width={1080} height={1920 - y} fill={HEDGE} />
    {new Array(10).fill(0).map((_, k) => (
      <circle key={k} cx={k * 120 - 20} cy={y + 50} r={78} fill={k % 2 ? HEDGE : HEDGE_HI} stroke={INK} strokeWidth={6} />
    ))}
    <rect x={0} y={y + 60} width={1080} height={1920 - y} fill={HEDGE} />
    {new Array(9).fill(0).map((_, k) => {
      const rx = 60 + k * 120 + (k % 2) * 30;
      const ry = y + 60 + (k % 3) * 70;
      const sc = 1 + Math.sin(f / 12 + k) * 0.04;
      return (
        <g key={k} transform={`translate(${rx} ${ry}) scale(${sc})`}>
          <circle r={26} fill={k % 2 ? ROSE : PINK} stroke={INK} strokeWidth={5} />
          <path d="M -10 -4 q 10 -12 18 0 q -6 12 -16 6" stroke={ROSE_D} strokeWidth={4} fill="none" />
        </g>
      );
    })}
  </g>
);

const Hourglass: React.FC<{ x: number; y: number; s?: number; f: number; rot?: number; sand?: number }> = ({ x, y, s = 1, f, rot = 0, sand }) => {
  const t = sand ?? ((f % 150) / 150);
  const top = 1 - t;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-62} y={-150} width={124} height={18} rx={6} fill={WOOD} stroke={INK} strokeWidth={5} />
      <rect x={-62} y={-10} width={124} height={18} rx={6} fill={WOOD} stroke={INK} strokeWidth={5} />
      <path d="M -46 -132 L 46 -132 Q 46 -90 6 -72 Q 46 -54 46 -10 L -46 -10 Q -46 -54 -6 -72 Q -46 -90 -46 -132 Z" fill="#E8F6FB" opacity={0.85} stroke={INK} strokeWidth={5} />
      <path d={`M ${-40 * top} ${-80 - 46 * top} L ${40 * top} ${-80 - 46 * top} L 0 -76 Z`} fill={GOLD} />
      <path d={`M ${-42} -12 L 42 -12 L ${30 * (1 - t * 0.6)} ${-12 - 44 * t} L ${-30 * (1 - t * 0.6)} ${-12 - 44 * t} Z`} fill={GOLD} />
      {t < 0.98 ? <rect x={-2.5} y={-76} width={5} height={60} fill={GOLD_D} /> : null}
      {[-52, 52].map((px) => (
        <rect key={px} x={px - 5} y={-134} width={10} height={124} fill={WOOD_D} stroke={INK} strokeWidth={3} />
      ))}
    </g>
  );
};

const Skull: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -52 -10 Q -62 -86 0 -92 Q 62 -86 52 -10 L 40 0 L 36 26 L -36 26 L -40 0 Z" fill="#F4EEDC" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={-22} cy={-30} rx={16} ry={18} fill={INK} />
    <ellipse cx={22} cy={-30} rx={16} ry={18} fill={INK} />
    <path d="M 0 -12 L -8 4 L 8 4 Z" fill={INK} />
    {[-24, -8, 8, 24].map((tx) => (
      <path key={tx} d={`M ${tx} 12 L ${tx} 26`} stroke={INK} strokeWidth={4} />
    ))}
  </g>
);

const Book: React.FC<{ x: number; y: number; s?: number; specs?: boolean }> = ({ x, y, s = 1, specs = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 L -100 -40 Q -50 -56 0 -36 Q 50 -56 100 -40 L 110 0 Q 50 -14 0 6 Q -50 -14 -110 0 Z" fill="#7A2E2A" stroke={INK} strokeWidth={5} />
    <path d="M -100 -12 L -92 -46 Q -46 -62 0 -42 Q 46 -62 92 -46 L 100 -12 Q 50 -26 0 -6 Q -50 -26 -100 -12 Z" fill="#FBF4E2" stroke={INK} strokeWidth={5} />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${-80} ${-36 + k * 9} Q -46 ${-48 + k * 9} -14 ${-34 + k * 9} M 14 ${-34 + k * 9} Q 46 ${-48 + k * 9} 80 ${-36 + k * 9}`} stroke="#B9AE96" strokeWidth={3} fill="none" />
    ))}
    {specs ? (
      <g transform="translate(0 -44)">
        <circle cx={-26} cy={0} r={20} fill="#DFF3FF" fillOpacity={0.5} stroke={INK} strokeWidth={5} />
        <circle cx={26} cy={0} r={20} fill="#DFF3FF" fillOpacity={0.5} stroke={INK} strokeWidth={5} />
        <path d="M -6 0 Q 0 -8 6 0" stroke={INK} strokeWidth={4} fill="none" />
      </g>
    ) : null}
  </g>
);

const Tankard: React.FC<{ x: number; y: number; s?: number; rot?: number; foam?: number }> = ({ x, y, s = 1, rot = 0, foam = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 40 -70 Q 90 -70 90 -30 Q 90 10 40 10" stroke={INK} strokeWidth={22} fill="none" />
    <path d="M 40 -70 Q 90 -70 90 -30 Q 90 10 40 10" stroke="#B9C0C8" strokeWidth={10} fill="none" />
    <rect x={-50} y={-100} width={96} height={130} rx={8} fill="#B9C0C8" stroke={INK} strokeWidth={6} />
    <rect x={-50} y={-70} width={96} height={12} fill="#8E969F" />
    <rect x={-50} y={-6} width={96} height={12} fill="#8E969F" />
    <path d="M -36 -92 L -36 20" stroke="#E2E7EC" strokeWidth={8} />
    {foam > 0 ? (
      <g opacity={foam}>
        {[-40, -14, 12, 36].map((fx, k) => (
          <circle key={k} cx={fx} cy={-104 - (k % 2) * 10} r={24} fill="#FFFDF2" stroke={INK} strokeWidth={5} />
        ))}
        <rect x={-50} y={-110} width={96} height={18} fill="#FFFDF2" />
      </g>
    ) : null}
  </g>
);

// ---------- the hermit ----------

// long curly fingernails growing out of a hand at (x, y); dir = 1 → curl to the right
const Nails: React.FC<{ x: number; y: number; dir: number; len: number; col?: string }> = ({ x, y, dir, len, col = NAIL }) => {
  if (len < 4) return null;
  return (
    <g>
      {[0, 1, 2, 3].map((k) => {
        const L = len * (0.82 + k * 0.08);
        const sx = x + dir * 24;
        const sy = y - 20 + k * 13;
        const d = `M ${sx} ${sy} c ${dir * L * 0.5} ${-L * 0.25} ${dir * L} ${L * 0.1} ${dir * L * 0.85} ${L * 0.5} c ${-dir * L * 0.1} ${L * 0.25} ${-dir * L * 0.35} ${L * 0.25} ${-dir * L * 0.35} ${L * 0.1}`;
        return (
          <g key={k}>
            <path d={d} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d={d} stroke={col} strokeWidth={7} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

const Straw: React.FC<{ x: number; y: number; dir?: number; n?: number }> = ({ x, y, dir = 1, n = 7 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const a = ((-50 + (k * 100) / (n - 1)) * Math.PI) / 180;
      const L = 40 + (k % 3) * 18;
      return <path key={k} d={`M ${x} ${y} l ${dir * Math.cos(a) * L} ${Math.sin(a) * L}`} stroke={STRAW} strokeWidth={7} strokeLinecap="round" />;
    })}
    <circle cx={x} cy={y} r={14} fill={STRAW} stroke={INK} strokeWidth={4} />
  </g>
);

type HMood = "calm" | "side" | "wise" | "shh" | "grin" | "shock";

// Seated hermit, front view. Origin = seat (centre of the hips). Head centre is at (0, -655).
// beard / nails / hair: 0–1 growth. handL / elbowL: the figure's left arm (viewer's right). hold: what that hand holds.
const Hermit: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  beard?: number;
  nails?: number;
  hair?: number;
  mood?: HMood;
  gaze?: number;
  handL?: P;
  elbowL?: P;
  hold?: "skull" | "tankard" | "finger" | "none";
  staff?: boolean;
  dummy?: boolean;
  tilt?: number;
  foamBeard?: number;
  feet?: boolean;
}> = ({ x, y, s = 1, f, beard = 0.2, nails = 0.3, hair = 0.2, mood = "calm", gaze = 0, handL = [170, -190], elbowL = [235, -300], hold = "none", staff = true, dummy = false, tilt = 0, foamBeard = 0, feet = true }) => {
  const skin = dummy ? SACK : SKIN;
  const skinD = dummy ? SACK_D : SKIN_D;
  const beardC = dummy ? "#EDE3C6" : BEARD;
  const tip = -560 + 280 + beard * 560;
  const mid = lerp(-480, tip, 0.5);
  const bw = 112 - beard * 22;
  const hl = 80 + hair * 440;
  const blink = !dummy && f % 96 > 90;
  const breathe = Math.sin(f / 22) * 4;
  const shR: P = [-150, -470];
  const shL: P = [150, -470];
  const hR: P = [-262, -410];
  const eR: P = [-238, -300];
  const nailLen = dummy ? 0 : 16 + nails * 150;
  const brow = mood === "shock" ? -18 : mood === "wise" ? -8 : 0;
  const eyes = () => {
    if (dummy) {
      return (
        <g>
          {[
            [-40, -662, 17],
            [40, -664, 13],
          ].map(([ex, ey, r], k) => (
            <g key={k}>
              <circle cx={ex} cy={ey} r={r} fill={k ? "#3E6FB0" : "#2A2A2A"} stroke={INK} strokeWidth={4} />
              {[-1, 1].map((dx) => [-1, 1].map((dy) => <circle key={`${dx}${dy}`} cx={ex + dx * r * 0.32} cy={ey + dy * r * 0.32} r={2.6} fill="#FFFFFF" />))}
            </g>
          ))}
        </g>
      );
    }
    if (blink || mood === "wise") return <path d="M -60 -662 Q -40 -650 -20 -662 M 20 -662 Q 40 -650 60 -662" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
    if (mood === "grin") return <path d="M -60 -656 Q -40 -678 -20 -656 M 20 -656 Q 40 -678 60 -656" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
    if (mood === "shock" || mood === "shh")
      return (
        <g>
          {[-40, 40].map((ex) => (
            <g key={ex}>
              <circle cx={ex} cy={-664} r={mood === "shock" ? 22 : 17} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
              <circle cx={ex + gaze * 6} cy={-662} r={mood === "shock" ? 7 : 8} fill={INK} />
            </g>
          ))}
        </g>
      );
    // calm / side: heavy half-closed lids, pupils slide with gaze
    const gx = mood === "side" ? (gaze || 1) * 9 : gaze * 6;
    return (
      <g>
        {[-40, 40].map((ex) => (
          <g key={ex}>
            <path d={`M ${ex - 20} -662 Q ${ex} -648 ${ex + 20} -662 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={ex + gx} cy={-657} r={6} fill={INK} />
            <path d={`M ${ex - 22} -663 L ${ex + 22} -663`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
          </g>
        ))}
      </g>
    );
  };
  const mouth = () => {
    if (dummy) return <path d="M -30 -574 L 30 -574 M -22 -584 L -14 -564 M -2 -584 L 6 -564 M 18 -584 L 26 -564" stroke={INK} strokeWidth={4} />;
    if (mood === "grin") return <path d="M -42 -588 Q 0 -530 42 -588 Z" fill="#7A2E2A" stroke={INK} strokeWidth={5} />;
    if (mood === "shock") return <ellipse cx={0} cy={-566} rx={20} ry={28} fill="#5A1E1A" stroke={INK} strokeWidth={5} />;
    if (mood === "shh") return <ellipse cx={0} cy={-576} rx={10} ry={12} fill="#5A1E1A" stroke={INK} strokeWidth={4} />;
    return <path d="M -16 -578 Q 0 -574 16 -578" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />;
  };
  // the figure's left hand + whatever it holds
  const leftHand = () => {
    if (dummy) return <Straw x={handL[0]} y={handL[1]} dir={1} />;
    if (hold === "finger")
      return (
        <g>
          <circle cx={handL[0]} cy={handL[1]} r={30} fill={skin} stroke={INK} strokeWidth={6} />
          <path d={`M ${handL[0] - 6} ${handL[1] - 22} L ${handL[0] - 10} ${handL[1] - 82}`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
          <path d={`M ${handL[0] - 6} ${handL[1] - 22} L ${handL[0] - 10} ${handL[1] - 82}`} stroke={skin} strokeWidth={14} strokeLinecap="round" />
          <Nails x={handL[0] - 34} y={handL[1] - 74} dir={1} len={nailLen * 0.5} />
        </g>
      );
    return (
      <g>
        {hold === "tankard" ? <Tankard x={handL[0] + 34} y={handL[1] + 10} s={1.05} rot={-8} /> : null}
        <circle cx={handL[0]} cy={handL[1]} r={32} fill={skin} stroke={INK} strokeWidth={6} />
        {hold === "skull" ? <Skull x={handL[0] + 20} y={handL[1] - 40} s={1.05} rot={-6} /> : null}
        <Nails x={handL[0]} y={handL[1] + (hold === "skull" ? -6 : 0)} dir={1} len={nailLen} />
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* robe skirt over the crossed legs */}
      <path d="M -195 -260 Q -272 -170 -256 -60 L -246 170 Q -180 190 -120 175 Q -60 195 0 178 Q 60 195 120 175 Q 180 190 246 170 L 256 -60 Q 272 -170 195 -260 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -120 -150 Q -140 20 -150 160 M 0 -120 L 0 170 M 120 -150 Q 140 20 150 160" stroke={ROBE_D} strokeWidth={7} fill="none" />
      {dummy ? (
        <g>
          <rect x={60} y={20} width={90} height={80} fill={ROBE_HI} stroke={INK} strokeWidth={4} transform="rotate(8 105 60)" />
          <path d="M 66 30 L 144 30 M 66 90 L 144 90" stroke={INK} strokeWidth={3} strokeDasharray="8 8" transform="rotate(8 105 60)" />
          <Straw x={-100} y={180} dir={-1} n={6} />
          <Straw x={100} y={180} dir={1} n={6} />
        </g>
      ) : feet ? (
        <g>
          {[-1, 1].map((sd) => (
            <g key={sd}>
              <ellipse cx={sd * 96} cy={188} rx={54} ry={26} fill={skin} stroke={INK} strokeWidth={6} />
              {[0, 1, 2, 3].map((k) => (
                <circle key={k} cx={sd * (66 + k * 18)} cy={206 - Math.abs(k - 1.5) * 3} r={9} fill={skin} stroke={INK} strokeWidth={4} />
              ))}
              {nails > 0.25
                ? [0, 1, 2].map((k) => (
                    <path key={k} d={`M ${sd * (68 + k * 18)} 214 q ${sd * 6} ${10 + nails * 30} ${sd * 18} ${8 + nails * 26}`} stroke={NAIL} strokeWidth={6} fill="none" strokeLinecap="round" />
                  ))
                : null}
            </g>
          ))}
        </g>
      ) : null}
      {/* torso */}
      <g transform={`translate(0 ${breathe * 0.5})`}>
        <path d="M -150 -490 Q 0 -520 150 -490 L 196 -250 Q 0 -226 -196 -250 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -480 Q -80 -360 -96 -262 M 70 -480 Q 86 -360 100 -262" stroke={ROBE_D} strokeWidth={7} fill="none" />
        <path d="M -196 -256 Q 0 -230 196 -256" stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M -196 -256 Q 0 -230 196 -256" stroke={ROPE} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M 70 -244 q 14 70 -4 140" stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M 70 -244 q 14 70 -4 140" stroke={ROPE} strokeWidth={9} fill="none" strokeLinecap="round" />
        <circle cx={68} cy={-104} r={12} fill={ROPE} stroke={INK} strokeWidth={4} />
      </g>
      {/* staff in the right hand (viewer's left) */}
      {staff ? (
        <g>
          <path d="M -262 -700 Q -252 -560 -270 -420 Q -282 -200 -262 190" stroke={INK} strokeWidth={36} fill="none" strokeLinecap="round" />
          <path d="M -262 -700 Q -252 -560 -270 -420 Q -282 -200 -262 190" stroke={WOOD} strokeWidth={22} fill="none" strokeLinecap="round" />
          <path d="M -262 -700 q -30 -20 -24 -50 q 30 -6 40 22" fill={WOOD} stroke={INK} strokeWidth={6} />
        </g>
      ) : null}
      {/* head group (tilts for the dummy) */}
      <g transform={`rotate(${tilt} 0 -540) translate(0 ${breathe})`}>
        {/* hood */}
        <path d="M -168 -470 Q -218 -640 -152 -772 Q -82 -864 0 -866 Q 82 -864 152 -772 Q 218 -640 168 -470 Q 80 -500 0 -500 Q -80 -500 -168 -470 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -120 -800 Q 0 -880 120 -800" stroke={ROBE_HI} strokeWidth={10} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={-652} rx={124} ry={152} fill="#3B2616" />
        {/* long grey hair under the hood */}
        {[-1, 1].map((sd) => (
          <path key={sd} d={`M ${sd * 82} -720 Q ${sd * 128} -640 ${sd * (122 + hair * 30)} ${-600 + hl} L ${sd * 84} ${-600 + hl - 10} Q ${sd * 96} -640 ${sd * 64} -700 Z`} fill={dummy ? STRAW : BEARD_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        ))}
        {/* face */}
        <circle cx={0} cy={-652} r={96} fill={skin} stroke={INK} strokeWidth={7} />
        {dummy ? <path d="M -96 -652 Q 0 -630 96 -652" stroke={SACK_D} strokeWidth={5} strokeDasharray="10 10" fill="none" /> : null}
        <circle cx={-58} cy={-618} r={20} fill={ROSE} opacity={0.35} />
        <circle cx={58} cy={-618} r={20} fill={ROSE} opacity={0.35} />
        {eyes()}
        {!dummy ? (
          <g>
            <path d={`M -72 ${-688 + brow} Q -40 ${-712 + brow} -10 ${-690 + brow} Q -40 ${-694 + brow} -72 ${-680 + brow} Z`} fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d={`M 72 ${-688 + brow} Q 40 ${-712 + brow} 10 ${-690 + brow} Q 40 ${-694 + brow} 72 ${-680 + brow} Z`} fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        ) : null}
        <ellipse cx={0} cy={-626} rx={dummy ? 10 : 24} ry={dummy ? 10 : 28} fill={skinD} stroke={INK} strokeWidth={5} />
        {/* beard */}
        <path
          d={`M -94 -650 Q -120 -560 -${bw} -480 Q -${bw - 8} ${mid} -52 ${tip - 60} Q -20 ${tip - 8} 0 ${tip} Q 20 ${tip - 8} 52 ${tip - 60} Q ${bw - 8} ${mid} ${bw} -480 Q 120 -560 94 -650 Q 70 -598 0 -596 Q -70 -598 -94 -650 Z`}
          fill={beardC}
          stroke={INK}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        {[-44, 0, 44].map((bx, k) => (
          <path key={k} d={`M ${bx} -540 q ${10 - k * 10} ${(tip + 480) * 0.3} 0 ${(tip + 540) * 0.55} q -12 ${(tip + 540) * 0.2} ${bx * -0.3} ${(tip + 540) * 0.3}`} stroke={BEARD_D} strokeWidth={6} fill="none" strokeLinecap="round" />
        ))}
        {mouth()}
        <path d="M 0 -608 Q -42 -626 -76 -588 Q -40 -598 0 -590 Q 40 -598 76 -588 Q 42 -626 0 -608 Z" fill={beardC} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {foamBeard > 0 ? (
          <g opacity={foamBeard}>
            {[-50, -20, 12, 44].map((fx, k) => (
              <circle key={k} cx={fx} cy={-598 + (k % 2) * 8} r={16} fill="#FFFDF2" stroke={INK} strokeWidth={4} />
            ))}
          </g>
        ) : null}
      </g>
      {/* right arm → staff */}
      <Limb a={shR} k={eR} b={hR} w={78} col={ROBE} />
      <circle cx={hR[0] + 8} cy={hR[1] + 26} r={44} fill={ROBE_HI} stroke={INK} strokeWidth={6} />
      {dummy ? (
        <Straw x={hR[0]} y={hR[1]} dir={-1} />
      ) : (
        <g>
          <circle cx={hR[0]} cy={hR[1]} r={32} fill={skin} stroke={INK} strokeWidth={6} />
          <Nails x={hR[0]} y={hR[1] + 4} dir={-1} len={nailLen} />
        </g>
      )}
      {/* left arm */}
      <Limb a={shL} k={elbowL} b={handL} w={78} col={ROBE} />
      <circle cx={lerp(elbowL[0], handL[0], 0.8)} cy={lerp(elbowL[1], handL[1], 0.8)} r={44} fill={ROBE_HI} stroke={INK} strokeWidth={6} />
      {leftHand()}
    </g>
  );
};

// ---------- Georgian guests (waist-up, facing right; flip = facing left). Origin = bottom centre ----------
type GMood = "peer" | "clap" | "angry" | "ooh";
const Guest: React.FC<{ x: number; y: number; s?: number; f: number; who: "lady" | "gent"; mood?: GMood; flip?: boolean; point?: number }> = ({ x, y, s = 1, f, who, mood = "peer", flip = false, point = 0 }) => {
  const clap = mood === "clap" ? Math.abs(Math.sin(f / 3)) : 0;
  const bob = Math.sin(f / 15) * 4;
  if (who === "gent") {
    const angry = mood === "angry";
    return (
      <g transform={`translate(${x} ${y + bob}) scale(${flip ? -s : s} ${s})`}>
        {/* wig queue behind */}
        <path d="M -40 -300 Q -90 -250 -70 -200" stroke={INK} strokeWidth={30} strokeLinecap="round" fill="none" />
        <path d="M -40 -300 Q -90 -250 -70 -200" stroke={WIG} strokeWidth={18} strokeLinecap="round" fill="none" />
        <path d="M -150 0 Q -162 -150 -122 -230 Q 0 -272 122 -230 Q 162 -150 150 0 Z" fill={BLUE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 20 -250 L 46 0 M 90 -236 L 70 -100" stroke={GOLD} strokeWidth={8} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={36} cy={-150 + k * 50} r={9} fill={GOLD} stroke={INK} strokeWidth={3} />
        ))}
        <rect x={-6} y={-276} width={44} height={40} fill={SKIN} stroke={INK} strokeWidth={5} />
        {[0, 1, 2].map((k) => (
          <ellipse key={k} cx={22 + (k % 2) * 8} cy={-240 + k * 22} rx={30} ry={16} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        ))}
        <circle cx={14} cy={-330} r={72} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* side rolls of the powdered wig */}
        <path d="M -58 -360 Q -60 -410 10 -404 Q 70 -406 76 -372 Q 40 -380 0 -376 Q -30 -372 -58 -360 Z" fill={WIG} stroke={INK} strokeWidth={5} />
        {[0, 1].map((k) => (
          <ellipse key={k} cx={-46} cy={-340 + k * 36} rx={30} ry={16} fill={WIG} stroke={INK} strokeWidth={5} />
        ))}
        {/* tricorn */}
        <path d="M -96 -386 Q 10 -486 118 -382 Q 64 -404 12 -400 Q -40 -404 -96 -386 Z" fill="#2A2420" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -96 -386 Q 12 -416 118 -382" stroke={GOLD} strokeWidth={6} fill="none" />
        {/* face, 3/4 to the right */}
        <path d="M 82 -340 L 104 -316 L 80 -306 Z" fill={SKIN_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={44} cy={-296} r={14} fill={ROSE} opacity={0.4} />
        <path d={angry ? "M 0 -368 L 34 -356 M 50 -356 L 82 -368" : "M 0 -364 Q 16 -374 30 -366 M 48 -368 Q 64 -378 80 -368"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <circle cx={18} cy={-340} r={7} fill={INK} />
        {mood === "peer" ? (
          <g>
            <circle cx={62} cy={-340} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={66} cy={-338} r={10} fill={INK} />
            <circle cx={62} cy={-340} r={32} fill="#DFF3FF" fillOpacity={0.35} stroke={GOLD} strokeWidth={8} />
            <path d="M 62 -308 L 70 -236" stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
            <Limb a={[96, -210]} k={[130, -170]} b={[72, -228]} w={44} col={BLUE} />
            <circle cx={72} cy={-228} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
            <ellipse cx={58} cy={-288} rx={9} ry={11} fill="#5A1E1A" />
          </g>
        ) : (
          <g>
            <circle cx={62} cy={-340} r={7} fill={INK} />
            {angry ? <path d="M 34 -296 Q 60 -320 84 -296 Q 60 -276 34 -296 Z" fill="#5A1E1A" stroke={INK} strokeWidth={4} /> : <path d="M 36 -296 Q 60 -276 84 -298" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
          </g>
        )}
        {mood === "clap" ? (
          <g>
            <Limb a={[-90, -200]} k={[-30, -120]} b={[40 - clap * 30, -150]} w={44} col={BLUE} />
            <Limb a={[96, -210]} k={[150, -120]} b={[80 + clap * 30, -150]} w={44} col={BLUE} />
            <circle cx={40 - clap * 30} cy={-150} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
            <circle cx={80 + clap * 30} cy={-150} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
          </g>
        ) : null}
        {angry && point > 0 ? (
          <g>
            <Limb a={[96, -210]} k={[lerp(120, 190, point), lerp(-170, -260, point)]} b={[lerp(110, 290, point), lerp(-200, -300, point)]} w={44} col={BLUE} />
            <circle cx={lerp(110, 290, point)} cy={lerp(-200, -300, point)} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
            <path d={`M ${lerp(110, 290, point) + 14} ${lerp(-200, -300, point) - 6} l 44 -14`} stroke={INK} strokeWidth={20} strokeLinecap="round" />
            <path d={`M ${lerp(110, 290, point) + 14} ${lerp(-200, -300, point) - 6} l 44 -14`} stroke={SKIN} strokeWidth={10} strokeLinecap="round" />
          </g>
        ) : null}
      </g>
    );
  }
  // lady: tall powdered pouf with a bow and a feather, pink gown, fan
  const fanA = Math.sin(f / (mood === "ooh" ? 2.5 : 6)) * 10;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${flip ? -s : s} ${s})`}>
      <path d="M -140 0 Q -152 -140 -100 -210 Q 0 -244 100 -210 Q 152 -140 140 0 Z" fill={PINK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -100 -210 Q -50 -170 0 -200 Q 50 -170 100 -210" stroke="#FFFFFF" strokeWidth={14} fill="none" />
      <path d="M -60 -120 Q 0 -100 60 -120 M -80 -60 Q 0 -40 80 -60" stroke={PINK_D} strokeWidth={6} fill="none" />
      <path d="M 0 -170 l -30 -18 l 0 36 Z M 0 -170 l 30 -18 l 0 36 Z" fill={ROSE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <rect x={-4} y={-250} width={36} height={44} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* pouf */}
      <path d="M -20 -575 Q -70 -650 -110 -670 Q -60 -610 -40 -565 Z" fill={PINK} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -66 -296 Q -112 -410 -84 -490 Q -48 -588 20 -590 Q 92 -588 114 -490 Q 132 -410 92 -300 Q 50 -360 12 -362 Q -28 -360 -66 -296 Z" fill={WIG} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${-60 + k * 10} ${-400 - k * 42} q 40 -26 ${80 - k * 10} 0 q 30 -20 60 0`} stroke={WIG_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      <path d="M 50 -525 l -34 -26 l 0 46 Z M 50 -525 l 34 -26 l 0 46 Z" fill={ROSE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={50} cy={-525} r={11} fill={ROSE_D} stroke={INK} strokeWidth={4} />
      <circle cx={14} cy={-300} r={66} fill={SKIN} stroke={INK} strokeWidth={6} />
      {[0, 1].map((k) => (
        <ellipse key={k} cx={-44} cy={-318 + k * 34} rx={24} ry={16} fill={WIG} stroke={INK} strokeWidth={5} />
      ))}
      <circle cx={-6} cy={-270} r={14} fill={ROSE} opacity={0.55} />
      <circle cx={54} cy={-270} r={12} fill={ROSE} opacity={0.55} />
      {[14, 54].map((ex) => (
        <g key={ex}>
          <circle cx={ex} cy={-308} r={mood === "ooh" ? 9 : 7} fill={INK} />
          <path d={`M ${ex - 12} -322 l -6 -10 M ${ex} -324 l 0 -12 M ${ex + 12} -322 l 6 -10`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </g>
      ))}
      <path d="M 10 -348 Q 22 -356 32 -348 M 48 -348 Q 60 -356 72 -348" stroke={INK} strokeWidth={5} fill="none" />
      <circle cx={70} cy={-282} r={3.5} fill={INK} />
      {mood === "clap" ? (
        <path d="M 22 -262 Q 36 -246 52 -262" stroke="#A4243A" strokeWidth={7} fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx={36} cy={-256} rx={mood === "ooh" ? 12 : 8} ry={mood === "ooh" ? 15 : 9} fill="#A4243A" stroke={INK} strokeWidth={4} />
      )}
      {mood === "clap" ? (
        <g>
          <Limb a={[-80, -190]} k={[-20, -110]} b={[30 - clap * 30, -150]} w={40} col={PINK} />
          <Limb a={[90, -196]} k={[140, -110]} b={[70 + clap * 30, -150]} w={40} col={PINK} />
          <circle cx={30 - clap * 30} cy={-150} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
          <circle cx={70 + clap * 30} cy={-150} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      ) : (
        <g>
          <Limb a={[90, -196]} k={[150, -140]} b={[120, -200]} w={40} col={PINK} />
          <g transform={`translate(120 -205) rotate(${-30 + fanA})`}>
            <path d="M 0 0 L -120 -60 A 134 134 0 0 1 -40 -126 Z" fill={GOLD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            {[0.25, 0.5, 0.75].map((u, k) => (
              <path key={k} d={`M 0 0 L ${lerp(-120, -40, u) - 6} ${lerp(-60, -126, u) - 6}`} stroke={ROSE} strokeWidth={5} />
            ))}
          </g>
          <circle cx={120} cy={-200} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      )}
    </g>
  );
};

// ---------- garden gnome (the twist). Origin = bottom centre of its little base ----------
const Gnome: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const wob = Math.sin(f / 10) * 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${wob})`}>
      <ellipse cx={0} cy={6} rx={210} ry={30} fill="#000" opacity={0.18} />
      <path d="M -180 0 Q -170 -40 -120 -44 L 120 -44 Q 170 -40 180 0 Z" fill="#9AA36A" stroke={INK} strokeWidth={6} />
      {[-1, 1].map((sd) => (
        <ellipse key={sd} cx={sd * 62} cy={-60} rx={58} ry={30} fill="#3A2A20" stroke={INK} strokeWidth={6} />
      ))}
      {/* hermit-brown robe + rope belt */}
      <path d="M -150 -60 Q -150 -250 -110 -330 Q 0 -360 110 -330 Q 150 -250 150 -60 Q 0 -40 -150 -60 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -132 -180 Q 0 -160 132 -180" stroke={INK} strokeWidth={24} fill="none" strokeLinecap="round" />
      <path d="M -132 -180 Q 0 -160 132 -180" stroke={ROPE} strokeWidth={12} fill="none" strokeLinecap="round" />
      {/* beard */}
      <path d="M -96 -430 Q -130 -300 -70 -190 Q -30 -140 0 -130 Q 30 -140 70 -190 Q 130 -300 96 -430 Q 50 -380 0 -382 Q -50 -380 -96 -430 Z" fill={BEARD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[-40, 0, 40].map((bx) => (
        <path key={bx} d={`M ${bx} -360 q 10 60 0 120`} stroke={BEARD_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      {/* arms hugging a tiny hourglass */}
      <Limb a={[-110, -320]} k={[-140, -240]} b={[-50, -220]} w={50} col={ROBE} />
      <Limb a={[110, -320]} k={[140, -240]} b={[50, -220]} w={50} col={ROBE} />
      <Hourglass x={0} y={-176} s={0.5} f={f} />
      <circle cx={-48} cy={-222} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
      <circle cx={48} cy={-222} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* face */}
      <circle cx={0} cy={-470} r={92} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={-50} cy={-450} r={20} fill={ROSE} opacity={0.6} />
      <circle cx={50} cy={-450} r={20} fill={ROSE} opacity={0.6} />
      <path d="M -54 -488 Q -36 -506 -18 -488 M 18 -488 Q 36 -506 54 -488" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-456} r={30} fill="#F08A7A" stroke={INK} strokeWidth={5} />
      <path d="M 0 -424 Q -44 -440 -70 -410 Q -36 -414 0 -406 Q 36 -414 70 -410 Q 44 -440 0 -424 Z" fill={BEARD} stroke={INK} strokeWidth={5} />
      <path d="M -24 -398 Q 0 -380 24 -398" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* pointy red hat */}
      <path d="M -112 -506 Q -40 -640 30 -880 Q 70 -640 112 -506 Q 0 -540 -112 -506 Z" fill={GNOME_RED} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -560 Q 0 -700 30 -860" stroke="#F06A58" strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d="M -120 -500 Q 0 -548 120 -500" stroke={GNOME_RED_D} strokeWidth={22} fill="none" strokeLinecap="round" />
    </g>
  );
};

// modern lawn: house, picket fence, flower bed
const Suburb: React.FC<{ f: number }> = ({ f }) => (
  <>
    <Garden f={f} horizon={1240} />
    <g>
      <rect x={140} y={720} width={760} height={520} fill="#F3D9A8" stroke={INK} strokeWidth={7} />
      <path d="M 100 730 L 520 470 L 940 730 Z" fill="#6D7C8E" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[220, 640].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={800} width={180} height={160} fill="#A9DDF5" stroke={INK} strokeWidth={6} />
          <path d={`M ${wx + 90} 800 L ${wx + 90} 960 M ${wx} 880 L ${wx + 180} 880`} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <rect x={455} y={1010} width={130} height={230} fill="#3E7F86" stroke={INK} strokeWidth={6} />
      <circle cx={565} cy={1130} r={8} fill={GOLD} stroke={INK} strokeWidth={3} />
    </g>
    {/* white picket fence */}
    <rect x={0} y={1180} width={1080} height={26} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <rect x={0} y={1280} width={1080} height={26} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    {new Array(14).fill(0).map((_, k) => (
      <path key={k} d={`M ${k * 80 + 10} 1360 L ${k * 80 + 10} 1150 L ${k * 80 + 32} 1120 L ${k * 80 + 54} 1150 L ${k * 80 + 54} 1360 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    ))}
    <rect x={0} y={1350} width={1080} height={570} fill={GRASS} />
    <path d="M 0 1350 L 1080 1350" stroke={GRASS_D} strokeWidth={8} />
    {new Array(11).fill(0).map((_, k) => (
      <g key={k} transform={`translate(${k * 100 + 30} ${1390 + (k % 2) * 18})`}>
        <path d="M 0 0 L 0 -50" stroke={HEDGE_D} strokeWidth={6} />
        <circle cx={0} cy={-56} r={20} fill={[ROSE, GOLD, "#B48AE0"][k % 3]} stroke={INK} strokeWidth={4} />
        <circle cx={0} cy={-56} r={7} fill="#FFF3C4" />
      </g>
    ))}
  </>
);

// pub interior: panelled walls, shelves of tankards, a window, a door at the left
const Pub: React.FC<{ f: number; door: number }> = ({ f, door }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep062pub)" />
    {[0, 1, 2, 3, 4].map((k) => (
      <rect key={k} x={k * 240 - 40} y={0} width={36} height={1400} fill={WOOD_D} opacity={0.6} />
    ))}
    <rect x={0} y={130} width={1080} height={50} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    {/* window with sunshine */}
    <rect x={700} y={560} width={260} height={240} fill="#BEE6FA" stroke={INK} strokeWidth={7} />
    <path d="M 830 560 L 830 800 M 700 680 L 960 680" stroke={WOOD_D} strokeWidth={10} />
    {/* shelves */}
    {[880, 1060].map((sy, r) => (
      <g key={sy}>
        <rect x={560} y={sy} width={500} height={22} fill={WOOD_HI} stroke={INK} strokeWidth={5} />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k} transform={`translate(${600 + k * 96} ${sy})`}>
            {(k + r) % 2 ? (
              <g>
                <rect x={-20} y={-96} width={40} height={96} rx={8} fill={["#3E7F4A", "#7A2E2A"][k % 2]} stroke={INK} strokeWidth={5} />
                <rect x={-8} y={-130} width={16} height={36} fill={["#3E7F4A", "#7A2E2A"][k % 2]} stroke={INK} strokeWidth={4} />
              </g>
            ) : (
              <g>
                <rect x={-30} y={-80} width={60} height={80} rx={6} fill="#B9C0C8" stroke={INK} strokeWidth={5} />
                <path d="M 30 -60 q 26 0 26 24 q 0 24 -26 24" stroke={INK} strokeWidth={6} fill="none" />
              </g>
            )}
          </g>
        ))}
      </g>
    ))}
    {/* hanging pub sign inside */}
    <g transform={`rotate(${Math.sin(f / 14) * 2} 360 180)`}>
      <path d="M 260 180 L 260 230 M 460 180 L 460 230" stroke={INK} strokeWidth={6} />
      <rect x={210} y={230} width={300} height={100} rx={12} fill={C.cream} stroke={INK} strokeWidth={7} />
      <text x={360} y={298} textAnchor="middle" fontFamily={typeFont} fontSize={52} fill={WOOD_D}>
        ALE
      </text>
    </g>
    {/* door frame + door swinging open (door 0–1) */}
    <rect x={20} y={640} width={290} height={760} fill="#FFF3C4" stroke={INK} strokeWidth={8} />
    <ellipse cx={165} cy={1020} rx={200} ry={400} fill="url(#ep062glow)" opacity={door} />
    <g transform={`translate(30 0) scale(${1 - door * 0.82} 1)`}>
      <rect x={0} y={650} width={270} height={740} fill={WOOD} stroke={INK} strokeWidth={7} />
      {[0, 1].map((k) => (
        <rect key={k} x={36} y={700 + k * 340} width={198} height={290} fill="none" stroke={WOOD_D} strokeWidth={8} />
      ))}
      <circle cx={234} cy={1040} r={14} fill={GOLD} stroke={INK} strokeWidth={4} />
    </g>
  </>
);

const Bar: React.FC<{ top: number }> = ({ top }) => (
  <g>
    <rect x={0} y={top} width={1080} height={1920 - top} fill={WOOD} stroke={INK} strokeWidth={7} />
    <rect x={-10} y={top - 30} width={1100} height={46} rx={10} fill={WOOD_HI} stroke={INK} strokeWidth={7} />
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={40 + k * 260} y={top + 70} width={210} height={360} rx={10} fill="none" stroke={WOOD_D} strokeWidth={9} />
    ))}
  </g>
);

const Sparkle: React.FC<{ x: number; y: number; p: number; s?: number }> = ({ x, y, p, s = 1 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p * s}) rotate(${p * 40})`}>
      <path d="M 0 -40 L 9 -9 L 40 0 L 9 9 L 0 40 L -9 9 L -40 0 L -9 -9 Z" fill="#FFF6C8" stroke={INK} strokeWidth={4} />
    </g>
  );

// hook / dummy / twist share the same garden grotto framing
const GX0 = 150;
const GX1 = 830;
const GTOP = 560;
const GBOT = 1560;

export const Hermit62: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "grotto";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let headFrom = 0;
  let body: React.ReactNode = null;
  let answerOn = false;

  if (mode === "grotto") {
    // frame 0: one huge hermit in a mossy grotto, skull held up, hourglass running; Georgian guests peeking over the hedge
    body = (
      <>
        <Garden f={f} horizon={1480} />
        <Grotto f={f} x0={GX0} x1={GX1} top={GTOP} bottom={GBOT} />
        <ellipse cx={480} cy={1150} rx={330} ry={480} fill="url(#ep062glow)" opacity={0.55} />
        <Hermit x={460} y={1400} s={1} f={f} beard={0.38} nails={0.5} hair={0.4} mood="side" gaze={-1} hold="skull" handL={[215, -470]} elbowL={[275, -330]} />
        <Rock x={760} y={1545} r={84} seed="hg" col={ROCK_HI} />
        <Hourglass x={760} y={1486} s={1.0} f={f} />
        <Book x={600} y={1618} s={0.85} specs />
        <Hedge y={1700} f={f} />
        <Guest x={150} y={1965} s={1.05} f={f} who="gent" mood="peer" />
        <Guest x={915} y={1885} s={0.95} f={f + 20} who="lady" mood="ooh" flip />
      </>
    );
  } else if (mode === "contract") {
    // inside the grotto: YEAR 1 → 7 while the beard, hair and nails grow absurdly long
    const p = ease(f, (v.growFrom ?? 0.15) * dur, (v.growTo ?? 0.95) * dur);
    const q = Math.min(6.999, p * 7);
    const k = Math.floor(q);
    const fr = q - k;
    const year = k + 1;
    const flip = 180 * (k + Math.min(1, fr * 5));
    const g = 0.08 + p * 0.92;
    const birdP = popIn(f, (v.growTo ?? 0.95) * dur - 6, 8);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep062cave)" />
        <ellipse cx={620} cy={1150} rx={460} ry={640} fill="url(#ep062glow)" opacity={0.6} />
        {[
          [40, 300, 120],
          [60, 620, 110],
          [30, 940, 120],
          [1050, 360, 120],
          [1040, 720, 110],
          [1060, 1100, 120],
          [300, 120, 110],
          [620, 90, 120],
          [900, 140, 110],
        ].map(([rx, ry, rr], i) => (
          <Rock key={i} x={rx} y={ry} r={rr} seed={`c${i}`} col={i % 2 ? ROCK_D : ROCK} />
        ))}
        <rect x={0} y={1640} width={1080} height={280} fill={ROCK_D} stroke={INK} strokeWidth={7} />
        {/* cobweb grows in the top-right corner */}
        <g opacity={p} stroke="#FFFFFF" strokeWidth={4} fill="none">
          {[0, 1, 2, 3, 4].map((i) => {
            const a = Math.PI / 2 + (i / 4) * (Math.PI / 2);
            return <path key={i} d={`M 1080 230 l ${Math.cos(a) * 260 * p} ${Math.sin(a) * 260 * p}`} />;
          })}
          {[0.35, 0.65, 0.95].map((u, i) => (
            <path key={`w${i}`} d={`M ${1080} ${230 + 260 * u * p} Q ${1080 - 130 * u * p} ${230 + 130 * u * p} ${1080 - 260 * u * p} 230`} />
          ))}
        </g>
        {/* the YEAR counter scratched on a board */}
        <g transform="translate(210 1010) rotate(-4)">
          <rect x={-140} y={-66} width={280} height={132} rx={14} fill={WOOD} stroke={INK} strokeWidth={7} />
          <text x={0} y={26} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={C.cream} stroke={INK} strokeWidth={4} paintOrder="stroke">
            {`YEAR ${year}`}
          </text>
          {new Array(year).fill(0).map((_, i) => (
            <path key={i} d={`M ${-110 + i * 30} 96 l 0 60`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
          ))}
        </g>
        <Hourglass x={200} y={1660} s={1.0} f={f} rot={flip} sand={fr} />
        <Hermit x={640} y={1500} s={0.95} f={f} beard={g} nails={g} hair={g} mood={p > 0.92 ? "shock" : "calm"} gaze={p > 0.5 ? 1 : 0} />
        {birdP > 0 ? (
          <g transform={`translate(${640 + 60} ${1500 - 0.95 * 420}) scale(${birdP})`}>
            <ellipse cx={0} cy={0} rx={46} ry={34} fill="#5BA7E0" stroke={INK} strokeWidth={5} />
            <circle cx={34} cy={-26} r={24} fill="#5BA7E0" stroke={INK} strokeWidth={5} />
            <circle cx={40} cy={-30} r={5} fill={INK} />
            <path d="M 56 -24 l 20 6 l -20 6 Z" fill={GOLD} stroke={INK} strokeWidth={3} />
            <path d="M -40 -6 l -30 -18 l 4 30 Z" fill="#3E86C0" stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
      </>
    );
  } else if (mode === "guests") {
    // guests stroll by: the gentleman's quizzing glass, the lady's fan – the hermit says SHHH, then strikes a wise pose
    const shhAt = (v.shhAt ?? 0.08) * dur;
    const wiseAt = (v.wiseAt ?? 0.66) * dur;
    const wise = f >= wiseAt;
    const shh = popIn(f, shhAt, 8) * (wise ? interpolate(f, [wiseAt, wiseAt + 5], [1, 0], clamp) : 1);
    body = (
      <>
        <Garden f={f} horizon={1300} />
        <Grotto f={f} x0={320} x1={760} top={560} bottom={1300} />
        <ellipse cx={540} cy={1000} rx={230} ry={330} fill="url(#ep062glow)" opacity={0.5} />
        <Hermit
          x={540}
          y={1235}
          s={0.62}
          f={f}
          beard={0.45}
          nails={0.55}
          hair={0.45}
          mood={wise ? "wise" : "shh"}
          hold="finger"
          handL={wise ? [215, -650] : [14, -520]}
          elbowL={wise ? [275, -470] : [215, -390]}
        />
        {wise
          ? [
              [380, 700],
              [700, 640],
              [720, 860],
            ].map(([sx, sy], i) => <Sparkle key={i} x={sx} y={sy} p={popIn(f, wiseAt + 2 + i * 4, 8)} />)
          : null}
        <Burst x={230} y={860} p={shh * 0.62} text="SHHH!" size={86} rot={-8} col={C.cream} />
        <Hedge y={1700} f={f} />
        <Guest x={210} y={1985} s={1.15} f={f} who="gent" mood="peer" />
        <Guest x={880} y={1905} s={1.05} f={f + 30} who="lady" mood={wise ? "ooh" : "peer"} flip />
      </>
    );
  } else if (mode === "pub") {
    // the pub: foam on his beard, tankard up – the door bursts open – CAUGHT!
    const catchAt = (v.catchAt ?? 0.6) * dur;
    const chipAt = (v.chipAt ?? 0.25) * dur;
    const door = ease(f, catchAt - 5, catchAt + 3);
    const caught = f >= catchAt;
    const sip = caught ? 0 : Math.max(0, Math.sin((f / 24) * Math.PI));
    const handL: P = caught ? [230, -560] : [lerp(240, 150, sip), lerp(-470, -600, sip)];
    const elbowL: P = caught ? [300, -420] : [lerp(300, 290, sip), lerp(-330, -420, sip)];
    const chipP = popIn(f, chipAt, 9) * interpolate(f, [catchAt, catchAt + 6], [1, 0], clamp);
    const g = f - catchAt;
    body = (
      <>
        <Pub f={f} door={door} />
        {door > 0.3 ? <Guest x={165} y={1420} s={1.0} f={f} who="gent" mood="angry" point={ease(f, catchAt, catchAt + 6)} /> : null}
        <Hermit x={620} y={1580} s={1.0} f={f} beard={0.42} nails={0.5} hair={0.45} mood={caught ? "shock" : "grin"} gaze={caught ? -1 : 0} hold="tankard" handL={handL} elbowL={elbowL} staff={false} foamBeard={f > dur * 0.12 ? 1 : 0} feet={false} />
        {caught && g < 16
          ? new Array(10).fill(0).map((_, i) => {
              const vx = (random(`fz${i}`) - 0.5) * 30;
              const vy = -10 - random(`fy${i}`) * 12;
              return <circle key={i} cx={620 + 264 + vx * g} cy={1580 - 640 + vy * g + 0.9 * g * g} r={12 + (i % 3) * 5} fill="#FFFDF2" stroke={INK} strokeWidth={4} opacity={1 - g / 16} />;
            })
          : null}
        <Bar top={1420} />
        <Tankard x={180 + 700} y={1400} s={0.8} foam={1} />
        <Chip x={420} y={470} p={chipP} text={v.chip ?? "3 WEEKS!"} w={460} rot={-4} size={72} />
        <Burst x={620} y={560} p={popIn(f, catchAt + 2, 8) * 0.92} text="CAUGHT!" size={86} rot={6} col={C.mustard} />
      </>
    );
  } else if (mode === "dummy") {
    // no hermit? a stuffed dummy in the grotto, button eyes and straw – the guests applaud anyway
    headFrom = Math.round((v.headAt ?? 0.45) * dur);
    const tilt = Math.sin(f / 9) * 6;
    body = (
      <>
        <Garden f={f} horizon={1480} />
        <Grotto f={f} x0={GX0} x1={GX1} top={GTOP} bottom={GBOT} />
        <ellipse cx={480} cy={1150} rx={330} ry={480} fill="url(#ep062glow)" opacity={0.55} />
        <Rock x={760} y={1545} r={84} seed="hg" col={ROCK_HI} />
        <Hourglass x={760} y={1486} s={1.0} f={f} />
        <Hermit x={480} y={1400} s={0.98} f={f} beard={0.35} nails={0} hair={0.3} dummy tilt={tilt} />
        {new Array(6).fill(0).map((_, i) => {
          const life = 50;
          const age = (f + i * 9) % life;
          const t = age / life;
          return <path key={i} d={`M ${300 + i * 60} ${1100 + t * 520} l 26 ${10 + i * 2}`} stroke={STRAW} strokeWidth={7} strokeLinecap="round" opacity={Math.sin(t * Math.PI)} transform={`rotate(${t * 90 + i * 20} ${300 + i * 60} ${1100 + t * 520})`} />;
        })}
        <Hedge y={1700} f={f} />
        <Guest x={170} y={1965} s={1.0} f={f} who="gent" mood="clap" />
        <Guest x={915} y={1890} s={0.92} f={f + 10} who="lady" mood="clap" flip />
        {[0, 1, 2].map((i) => {
          const p = popIn(f, headFrom + 4 + i * 5, 6) * interpolate((f + i * 7) % 24, [0, 12, 24], [1, 0.4, 1]);
          return (
            <g key={i} transform={`translate(${[300, 760, 120][i]} ${[1560, 1520, 1700][i]}) rotate(${[-20, 20, -10][i]}) scale(${p})`}>
              <path d="M -40 0 L -20 0 M 0 -40 L 0 -20 M 40 0 L 20 0" stroke={C.cream} strokeWidth={9} strokeLinecap="round" />
            </g>
          );
        })}
      </>
    );
  } else if (mode === "gnome") {
    // twist: the grotto stands empty ("AND TODAY?") → flash → a modern lawn and a garden gnome dressed like a hermit
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f < answerAt) {
      body = (
        <>
          <Garden f={f} horizon={1480} />
          <Grotto f={f} x0={GX0} x1={GX1} top={GTOP} bottom={GBOT} />
          <Rock x={760} y={1545} r={84} seed="hg" col={ROCK_HI} />
          <Hourglass x={760} y={1486} s={1.0} f={f} />
          <Book x={480} y={1530} s={1.1} specs />
          {[0, 1, 2].map((k) => {
            const p = popIn(f, 4 + k * 7, 8);
            const qx = [330, 640, 480][k];
            const qy = [980, 900, 1220][k];
            return p > 0 ? (
              <text key={k} x={qx} y={qy} textAnchor="middle" fontFamily={titleFont} fontSize={170} fill={C.mustard} stroke={INK} strokeWidth={8} transform={`rotate(${[-12, 10, 4][k]} ${qx} ${qy})`} opacity={p} paintOrder="stroke">
                ?
              </text>
            ) : null;
          })}
          <Hedge y={1700} f={f} />
        </>
      );
    } else {
      answerOn = !!v.answer;
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      body = (
        <>
          <Suburb f={f} />
          <Gnome x={540} y={1900} s={popIn(f, answerAt, 7) * 0.92} f={f} />
          {[
            [250, 1000],
            [830, 1060],
          ].map(([sx, sy], i) => (
            <Sparkle key={i} x={sx} y={sy} p={popIn(f, answerAt + 10 + i * 5, 8)} s={1.2} />
          ))}
          {v.chip ? <Chip x={540} y={660} p={popIn(f, answerAt + 18, 9)} text={v.chip} w={600} rot={-3} size={70} /> : null}
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
      {headline && headFrom > 0 ? (
        <Sequence from={headFrom} layout="none">
          <Headline text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} />
        </Sequence>
      ) : headline ? (
        <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} />
      ) : null}
      {mode === "gnome" && answerOn ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} color={C.brick} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
