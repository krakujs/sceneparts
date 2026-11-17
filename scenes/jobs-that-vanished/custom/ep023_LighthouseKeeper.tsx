import React from "react";
import { Easing, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Headline, Tag, Typewriter } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep023 Lighthouse keeper – frame 0: a bearded keeper in yellow oilskins and a peaked cap trims the lamp wick inside the
// lantern room while a storm hits (rain on the diamond panes, lightning, spray). Then the "wickies" (trim the wick, wind
// the clock), the Flannan Isles mystery of December 1900 told straight (light out, storms delay the relief boat, beds
// unmade, clock stopped, one set of oilskins left – the three men never found), the fake logbook / "uneaten meal" myths
// vs the official report (a huge wave), and the picture twist: today the lantern room is empty and the lights are
// watched from an office in Edinburgh. Three real men died: no people are ever shown in danger, no supernatural spin.
// visual: { mode: "lamp" | "wick" | "dark" | "empty" | "myth" | "today", headline?, accent?, top?, size?, headlineAt?,
//           trimAt?, windAt? (wick), outAt?, label? (dark), turn?, items?: number[] (empty), stampAt?, waveAt? (myth),
//           answer?, answerAccent?, answerAt?, answerSize?, screenAt?, chip?, chipAt? (today), tag?, tagX?, tagY?, tagAt? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const OIL = "#F4C02E";
const OIL_D = "#C8921A";
const OIL_HI = "#FFE27A";
const CAP = "#22305A";
const CAP_D = "#141C36";
const SKIN = "#EDB98E";
const SKIN_D = "#CF9466";
const BEARD = "#8A5230";
const BEARD_D = "#5E3519";
const BRASS = "#D9A441";
const BRASS_D = "#9C6E22";
const BRASS_HI = "#F6D27A";
const STEEL = "#C9D1DA";
const IRON = "#4A5164";
const IRON_D = "#2A2E3B";
const SEA = "#2C5577";
const SEA_D = "#183450";
const FOAM = "#EAF4F7";
const WHITE = "#F6F2E8";
const ROCK = "#5A5462";
const ROCK_D = "#3C3744";
const GRASS = "#5E7D43";
const GLOW = "#FFD983";
const WOOD = "#8A5A34";
const WOOD_D = "#5C3A1E";
const OK = "#3FCF6E";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const flashP = (f: number, flashes: number[]) => Math.max(0, ...flashes.map((t) => (f >= t && f < t + 8 ? 1 - (f - t) / 8 : 0)));

// two-bone IK: elbow for shoulder s reaching to t
const ik = (s: P, t: P, l1: number, l2: number, bend: number): P => {
  const dx = t[0] - s[0];
  const dy = t[1] - s[1];
  const d = Math.min(l1 + l2 - 1, Math.max(Math.abs(l1 - l2) + 1, Math.hypot(dx, dy)));
  const a = Math.acos(Math.min(1, Math.max(-1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const th = Math.atan2(dy, dx);
  return [s[0] + l1 * Math.cos(th + bend * a), s[1] + l1 * Math.sin(th + bend * a)];
};

const Chip: React.FC<{ text: string; x: number; y: number; at: number; f: number; rot?: number; col?: string; size?: number }> = ({ text, x, y, at, f, rot = -3, col = C.mustard, size = 56 }) => {
  const age = f - at;
  if (age < 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: "-50% 0", fontFamily: titleFont, fontSize: size, color: INK, background: col, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: `${rot}deg`, boxShadow: "0 10px 0 rgba(0,0,0,0.35)", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
      {text}
    </div>
  );
};

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string; w?: number }> = ({ x, y, p, text, rot = -8, size = 84, col = C.mustard, w = 1 }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 205;
      return `${Math.cos(a) * r * 1.35 * w},${Math.sin(a) * r * 0.7}`;
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

// ---------- weather ----------
const Rain: React.FC<{ f: number; top: number; bottom: number; n?: number; op?: number; seed?: string }> = ({ f, top, bottom, n = 70, op = 0.5, seed = "r" }) => {
  const h = bottom - top;
  return (
    <g opacity={op}>
      {new Array(n).fill(0).map((_, i) => {
        const x = ((random(`${seed}x${i}`) * 1400 + f * 16) % 1400) - 200;
        const y = ((random(`${seed}y${i}`) * h + f * (48 + 24 * random(`${seed}s${i}`))) % h) + top;
        return <path key={i} d={`M ${x} ${y} l 16 54`} stroke="#D6E8F4" strokeWidth={4} strokeLinecap="round" />;
      })}
    </g>
  );
};

const Bolt: React.FC<{ x: number; y: number; p: number; len?: number }> = ({ x, y, p, len = 520 }) =>
  p <= 0 ? null : (
    <g opacity={p}>
      <path d={`M ${x} ${y} L ${x - 40} ${y + len * 0.3} L ${x + 30} ${y + len * 0.36} L ${x - 30} ${y + len * 0.7} L ${x + 20} ${y + len * 0.73} L ${x - 50} ${y + len}`} stroke="#BFD8FF" strokeWidth={30} fill="none" strokeLinejoin="round" opacity={0.5} />
      <path d={`M ${x} ${y} L ${x - 40} ${y + len * 0.3} L ${x + 30} ${y + len * 0.36} L ${x - 30} ${y + len * 0.7} L ${x + 20} ${y + len * 0.73} L ${x - 50} ${y + len}`} stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinejoin="round" />
    </g>
  );

const Clouds: React.FC<{ f: number; y: number; col: string; seed: string; n?: number; speed?: number }> = ({ f, y, col, seed, n = 6, speed = 0.8 }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const cx = ((random(`${seed}c${i}`) * 1500 + f * speed * (0.6 + random(`${seed}v${i}`))) % 1500) - 210;
      const cy = y + random(`${seed}h${i}`) * 160;
      const r = 90 + random(`${seed}r${i}`) * 80;
      return (
        <g key={i} fill={col}>
          <ellipse cx={cx} cy={cy} rx={r * 1.6} ry={r * 0.6} />
          <circle cx={cx - r * 0.5} cy={cy - r * 0.3} r={r * 0.6} />
          <circle cx={cx + r * 0.4} cy={cy - r * 0.45} r={r * 0.7} />
        </g>
      );
    })}
  </g>
);

// rows of sea waves from y0 down to bottom
const Sea: React.FC<{ f: number; y0: number; bottom?: number; amp?: number; rows?: number; calm?: boolean }> = ({ f, y0, bottom = 1920, amp = 16, rows = 3, calm = false }) => (
  <g>
    {new Array(rows).fill(0).map((_, r) => {
      const yy = y0 + r * 70;
      const pts: string[] = [];
      for (let x = -120; x <= 1200; x += 60) pts.push(`${x} ${yy + amp * Math.sin(x / 70 + f / 6 + r * 1.7) + amp * 0.5 * Math.sin(x / 31 - f / 4 + r)}`);
      const col = calm ? ["#6E9CB8", "#5A88A6", "#4C7896"][r % 3] : [SEA_D, SEA, "#22476A"][r % 3];
      return (
        <g key={r}>
          <path d={`M ${pts.join(" L ")} L 1200 ${bottom} L -120 ${bottom} Z`} fill={col} />
          <path d={`M ${pts.join(" L ")}`} stroke={FOAM} strokeWidth={calm ? 4 : 7} fill="none" opacity={0.7} strokeLinejoin="round" />
        </g>
      );
    })}
  </g>
);

const Spray: React.FC<{ x: number; y: number; p: number; h?: number; seed?: string }> = ({ x, y, p, h = 480, seed = "sp" }) =>
  p <= 0 ? null : (
    <g>
      {new Array(16).fill(0).map((_, i) => {
        const u = random(`${seed}u${i}`);
        const cx = x + (random(`${seed}x${i}`) - 0.5) * 260 * (0.4 + p);
        const cy = y - u * h * p;
        const r = (30 + random(`${seed}r${i}`) * 60) * (0.5 + 0.5 * p);
        return <circle key={i} cx={cx} cy={cy} r={r} fill={FOAM} stroke={INK} strokeWidth={5} opacity={0.92 * Math.min(1, p * 1.5)} />;
      })}
    </g>
  );

const Beam: React.FC<{ x: number; y: number; ang: number; len?: number; spread?: number; op?: number }> = ({ x, y, ang, len = 1400, spread = 7, op = 0.28 }) => {
  const a1 = rad(ang - spread);
  const a2 = rad(ang + spread);
  return <polygon points={`${x},${y} ${x + Math.cos(a1) * len},${y + Math.sin(a1) * len} ${x + Math.cos(a2) * len},${y + Math.sin(a2) * len}`} fill={GLOW} opacity={op} />;
};

// ---------- the lantern room (window band WIN_T..WIN_B with diamond glazing, iron roof above, iron floor below) ----------
const WIN_T = 470;
const WIN_B = 1360;
const LanternRoom: React.FC<{ f: number; flashes?: number[]; waveAt?: number; calm?: boolean; beam?: P | null; children?: React.ReactNode }> = ({ f, flashes = [], waveAt = -999, calm = false, beam = null, children }) => {
  const fl = flashP(f, flashes);
  const wv = interpolate(f - waveAt, [0, 9, 24, 40], [0, 1, 0.7, 0], clamp);
  const pulse = 0.14 + 0.16 * Math.max(0, Math.sin(f / 9));
  return (
    <g>
      <defs>
        <clipPath id="ep23win">
          <rect x={0} y={WIN_T} width={1080} height={WIN_B - WIN_T} />
        </clipPath>
        <linearGradient id="ep23sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={calm ? "#8FB3CC" : "#121A31"} />
          <stop offset="1" stopColor={calm ? "#E4ECEC" : "#3A4C78"} />
        </linearGradient>
      </defs>
      <g clipPath="url(#ep23win)">
        <rect x={0} y={WIN_T} width={1080} height={WIN_B - WIN_T} fill="url(#ep23sky)" />
        <Clouds f={f} y={WIN_T + 20} col={calm ? "#F4F6F4" : "#0E1428"} seed={calm ? "cc" : "sc"} speed={calm ? 0.4 : 1.6} />
        {!calm ? <Clouds f={f} y={WIN_T + 160} col="#26325A" seed="sc2" n={4} speed={2.4} /> : null}
        <Bolt x={820} y={WIN_T} p={fl} len={560} />
        <Sea f={f} y0={1160} bottom={WIN_B} amp={calm ? 6 : 18} rows={3} calm={calm} />
        <path d="M 110 1362 L 160 1250 L 250 1214 L 330 1250 L 380 1362 Z" fill={ROCK_D} stroke={INK} strokeWidth={6} />
        <Spray x={250} y={1240} p={wv} h={560} />
        {beam ? (
          <>
            <Beam x={beam[0]} y={beam[1]} ang={180 + 10 * Math.sin(f / 14)} op={pulse} spread={8} />
            <Beam x={beam[0]} y={beam[1]} ang={-4 + 10 * Math.sin(f / 14 + 1)} op={0.3 - pulse * 0.6} spread={8} />
          </>
        ) : null}
        {!calm ? <Rain f={f} top={WIN_T} bottom={WIN_B} /> : null}
        {children}
        {/* diamond (helical) glazing bars */}
        {new Array(9).fill(0).map((_, k) => {
          const x = -520 + k * 260;
          return (
            <g key={`o${k}`} stroke={INK} strokeWidth={20}>
              <path d={`M ${x} ${WIN_T} L ${x + 520} ${WIN_B}`} />
              <path d={`M ${x + 520} ${WIN_T} L ${x} ${WIN_B}`} />
            </g>
          );
        })}
        {new Array(9).fill(0).map((_, k) => {
          const x = -520 + k * 260;
          return (
            <g key={`i${k}`} stroke={IRON} strokeWidth={9}>
              <path d={`M ${x} ${WIN_T} L ${x + 520} ${WIN_B}`} />
              <path d={`M ${x + 520} ${WIN_T} L ${x} ${WIN_B}`} />
            </g>
          );
        })}
        {!calm
          ? new Array(10).fill(0).map((_, i) => {
              const x = 60 + random(`dr${i}`) * 960;
              const y = WIN_T + ((random(`dy${i}`) * 800 + f * (6 + 6 * random(`ds${i}`))) % 880);
              return <path key={i} d={`M ${x} ${y} q 4 30 0 60`} stroke="#E6F2FA" strokeWidth={5} fill="none" opacity={0.55} strokeLinecap="round" />;
            })
          : null}
        <rect x={0} y={WIN_T} width={1080} height={WIN_B - WIN_T} fill="#FFFFFF" opacity={fl * 0.55} />
      </g>
      {/* roof */}
      <rect x={0} y={0} width={1080} height={WIN_T} fill={IRON_D} />
      {new Array(8).fill(0).map((_, k) => (
        <path key={k} d={`M 540 60 L ${-80 + k * 177} ${WIN_T - 20}`} stroke={IRON} strokeWidth={14} />
      ))}
      <circle cx={540} cy={60} r={56} fill={BRASS_D} stroke={INK} strokeWidth={7} />
      <rect x={0} y={WIN_T - 34} width={1080} height={44} fill={IRON} stroke={INK} strokeWidth={7} />
      {new Array(14).fill(0).map((_, k) => (
        <circle key={k} cx={30 + k * 80} cy={WIN_T - 12} r={7} fill={IRON_D} />
      ))}
      {/* floor */}
      <rect x={0} y={WIN_B} width={1080} height={1920 - WIN_B} fill={IRON_D} />
      {new Array(8).fill(0).map((_, r) =>
        new Array(12).fill(0).map((__, c) => <path key={`${r}-${c}`} d={`M ${c * 96 + (r % 2) * 48} ${WIN_B + 90 + r * 70} l 30 -14`} stroke={IRON} strokeWidth={7} strokeLinecap="round" />),
      )}
      <rect x={0} y={WIN_B - 12} width={1080} height={52} fill={IRON} stroke={INK} strokeWidth={7} />
      {new Array(14).fill(0).map((_, k) => (
        <circle key={k} cx={30 + k * 80} cy={WIN_B + 14} r={7} fill={IRON_D} />
      ))}
      <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={fl * 0.18} />
    </g>
  );
};

// Fresnel lens: glass beehive with prism rings and a central belt
const Lens: React.FC<{ cx: number; cy: number; w: number; h: number; f: number; glow?: number }> = ({ cx, cy, w, h, f, glow = 1 }) => {
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const belt = h * 0.2;
  const rows = 6;
  const band = (h / 2 - belt / 2 - 40) / rows;
  return (
    <g>
      <defs>
        <linearGradient id="ep23glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7FB3C8" />
          <stop offset="0.5" stopColor="#F4FBFF" />
          <stop offset="1" stopColor="#7FB3C8" />
        </linearGradient>
      </defs>
      <rect x={x0 + 40} y={y0 + h} width={w - 80} height={60} fill={BRASS_D} stroke={INK} strokeWidth={8} />
      <rect x={x0} y={y0} width={w} height={h} rx={w * 0.22} fill="url(#ep23glass)" opacity={0.82} stroke={INK} strokeWidth={10} />
      {new Array(rows).fill(0).map((_, i) => {
        const yt = y0 + 36 + i * band;
        const yb = y0 + h - 36 - i * band;
        return (
          <g key={i} fill="none" strokeLinecap="round">
            <path d={`M ${x0 + 22} ${yt} Q ${cx} ${yt - 16} ${x0 + w - 22} ${yt}`} stroke="#6E9FB6" strokeWidth={6} />
            <path d={`M ${x0 + 30} ${yt + 8} Q ${cx} ${yt - 8} ${x0 + w - 30} ${yt + 8}`} stroke="#FFFFFF" strokeWidth={3} opacity={0.8} />
            <path d={`M ${x0 + 22} ${yb} Q ${cx} ${yb + 16} ${x0 + w - 22} ${yb}`} stroke="#6E9FB6" strokeWidth={6} />
            <path d={`M ${x0 + 30} ${yb - 8} Q ${cx} ${yb + 8} ${x0 + w - 30} ${yb - 8}`} stroke="#FFFFFF" strokeWidth={3} opacity={0.8} />
          </g>
        );
      })}
      <rect x={x0 + 4} y={cy - belt / 2} width={w - 8} height={belt} fill="#E8F7FF" opacity={0.7} />
      {new Array(7).fill(0).map((_, j) => (
        <path key={j} d={`M ${x0 + 30 + (j * (w - 60)) / 6} ${cy - belt / 2} L ${x0 + 30 + (j * (w - 60)) / 6} ${cy + belt / 2}`} stroke="#6E9FB6" strokeWidth={5} />
      ))}
      {[0.33, 0.67].map((u) => (
        <g key={u}>
          <path d={`M ${x0 + w * u} ${y0 + 8} L ${x0 + w * u} ${y0 + h - 8}`} stroke={INK} strokeWidth={14} />
          <path d={`M ${x0 + w * u} ${y0 + 8} L ${x0 + w * u} ${y0 + h - 8}`} stroke={BRASS} strokeWidth={7} />
        </g>
      ))}
      <ellipse cx={cx} cy={cy} rx={w * 0.46} ry={h * 0.42} fill={GLOW} opacity={glow * (0.22 + 0.08 * Math.sin(f / 3))} />
    </g>
  );
};

// oil lamp (wick at 0,0)
const Lamp: React.FC<{ x: number; y: number; f: number; s?: number; lit?: number }> = ({ x, y, f, s = 1, lit = 1 }) => {
  const fl = 1 + 0.08 * Math.sin(f / 1.7) + 0.05 * Math.sin(f / 0.9);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lit > 0 ? <circle cx={0} cy={-60} r={300} fill="url(#ep23glow)" opacity={lit} /> : null}
      <rect x={-26} y={226} width={52} height={130} fill={BRASS_D} stroke={INK} strokeWidth={7} />
      <path d="M -70 40 L 70 40 L 104 170 Q 104 222 0 232 Q -104 222 -104 170 Z" fill={BRASS} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -60 70 Q -80 150 -84 196" stroke={BRASS_HI} strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={-84} y={22} width={168} height={30} rx={8} fill={BRASS_D} stroke={INK} strokeWidth={7} />
      <rect x={-30} y={-4} width={60} height={30} rx={6} fill={BRASS_D} stroke={INK} strokeWidth={6} />
      <rect x={-15} y={-16} width={30} height={14} fill="#2A1E14" stroke={INK} strokeWidth={4} />
      {lit > 0 ? (
        <g transform={`translate(0 -14) scale(${fl} ${fl * lit})`}>
          <path d="M 0 -170 Q 50 -80 34 -20 Q 18 8 0 8 Q -18 8 -34 -20 Q -50 -80 0 -170 Z" fill={C.mustard} stroke={INK} strokeWidth={6} />
          <path d="M 0 -110 Q 26 -50 16 -14 Q 0 0 -16 -14 Q -26 -50 0 -110 Z" fill="#FFF6D0" />
          <ellipse cx={0} cy={-4} rx={14} ry={8} fill="#7CC4E8" />
        </g>
      ) : null}
    </g>
  );
};

const Scissors: React.FC<{ x: number; y: number; ang: number; open: number }> = ({ x, y, ang, open }) => (
  <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    {[1, -1].map((k) => (
      <g key={k} transform={`rotate(${k * open * 13} 22 0)`}>
        <path d="M 16 -8 L 132 -1 L 16 8 Z" fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M 22 0 L -6 ${k * 14}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
        <circle cx={-16} cy={k * 18} r={15} fill="none" stroke={INK} strokeWidth={12} />
        <circle cx={-16} cy={k * 18} r={15} fill="none" stroke={BRASS} strokeWidth={5} />
      </g>
    ))}
    <circle cx={22} cy={0} r={7} fill={BRASS} stroke={INK} strokeWidth={3} />
  </g>
);

const Gear: React.FC<{ x: number; y: number; r: number; rot: number; teeth?: number; col?: string }> = ({ x, y, r, rot, teeth = 12, col = BRASS }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {new Array(teeth).fill(0).map((_, i) => (
      <rect key={i} x={-r * 0.14} y={-r - r * 0.2} width={r * 0.28} height={r * 0.4} fill={col} stroke={INK} strokeWidth={4} transform={`rotate(${(i / teeth) * 360})`} />
    ))}
    <circle r={r} fill={col} stroke={INK} strokeWidth={6} />
    <circle r={r * 0.58} fill="none" stroke={BRASS_D} strokeWidth={6} />
    <circle r={r * 0.17} fill={BRASS_D} stroke={INK} strokeWidth={4} />
  </g>
);

// ---------- the keeper: yellow oilskins, navy peaked cap, big auburn beard. Local origin = head centre. ----------
const NavyCap: React.FC<{ peak?: number }> = ({ peak = 1 }) => (
  <g>
    <path d="M -110 -44 Q -122 -128 -30 -148 Q 72 -160 122 -102 Q 134 -72 114 -44 Z" fill={CAP} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -70 -128 Q -10 -146 60 -136" stroke="#3A4C82" strokeWidth={10} fill="none" strokeLinecap="round" />
    <rect x={-114} y={-64} width={232} height={30} rx={6} fill={CAP_D} stroke={INK} strokeWidth={6} />
    <path d={`M ${40 * peak} -40 Q ${130 * peak} -50 ${182 * peak} -16 Q ${120 * peak} -2 ${30 * peak} -22 Z`} fill="#0E1220" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={34 * peak} cy={-98} r={19} fill={BRASS} stroke={INK} strokeWidth={5} />
    <path d={`M ${34 * peak} -110 L ${34 * peak} -86 M ${24 * peak} -92 Q ${34 * peak} -80 ${44 * peak} -92`} stroke={INK} strokeWidth={4} fill="none" />
  </g>
);

const Keeper: React.FC<{ x: number; y: number; s?: number; f: number; hand: P; bend?: number; mouth?: "set" | "o" | "shout"; look?: number; tool?: React.ReactNode }> = ({ x, y, s = 1, f, hand, bend = 1, mouth = "set", look = 1, tool }) => {
  const H: P = [(hand[0] - x) / s, (hand[1] - y) / s];
  const S: P = [150, 210];
  const l1 = 215;
  const l2 = 205;
  const E = ik(S, H, l1, l2, bend);
  const dx = H[0] - E[0];
  const dy = H[1] - E[1];
  const dd = Math.hypot(dx, dy) || 1;
  const Hh: P = [E[0] + (dx / dd) * l2, E[1] + (dy / dd) * l2];
  const cuff: P = [E[0] + (dx / dd) * (l2 - 44), E[1] + (dy / dd) * (l2 - 44)];
  const lx = 14 * look;
  const blink = f % 70 > 66;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* coat */}
      <path d="M -140 140 Q -244 170 -266 330 L -350 1420 L 350 1420 L 266 330 Q 244 170 140 140 Q 0 186 -140 140 Z" fill={OIL} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
      <path d="M -206 340 Q -236 760 -262 1200" stroke={OIL_HI} strokeWidth={18} fill="none" strokeLinecap="round" opacity={0.75} />
      <path d="M 196 360 Q 226 640 240 940" stroke={GLOW} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M -120 520 Q -80 580 -112 660 M -60 820 Q -20 880 -56 960 M 120 700 Q 160 760 128 840" stroke={OIL_D} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 6 190 L 34 1420" stroke={OIL_D} strokeWidth={9} />
      {[300, 440, 580, 720].map((yy, i) => (
        <rect key={yy} x={22 + i * 6} y={yy} width={44} height={18} rx={8} fill={WOOD} stroke={INK} strokeWidth={5} />
      ))}
      {new Array(7).fill(0).map((_, i) => (
        <ellipse key={i} cx={-200 + random(`kd${i}`) * 400} cy={360 + random(`ke${i}`) * 700} rx={7} ry={11} fill="#FFFFFF" opacity={0.7} />
      ))}
      {/* turned-up collar */}
      <path d="M -150 150 L -118 58 L -34 150 Z" fill={OIL_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 150 150 L 118 58 L 34 150 Z" fill={OIL_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* head */}
      <circle cx={-94} cy={14} r={26} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={0} r={102} fill={SKIN} stroke={INK} strokeWidth={8} />
      <path d="M -102 -30 Q -118 30 -96 70 L -84 -20 Z" fill={BEARD} stroke={INK} strokeWidth={5} />
      {blink ? (
        <g stroke={INK} strokeWidth={6} strokeLinecap="round">
          <path d={`M ${-42 + lx} -6 L ${-8 + lx} -6`} />
          <path d={`M ${18 + lx} -6 L ${52 + lx} -6`} />
        </g>
      ) : (
        <g>
          <ellipse cx={-24 + lx} cy={-8} rx={16} ry={19} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <ellipse cx={34 + lx} cy={-8} rx={16} ry={19} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={-19 + lx + 2 * look} cy={-4} r={8} fill={INK} />
          <circle cx={39 + lx + 2 * look} cy={-4} r={8} fill={INK} />
        </g>
      )}
      <path d={`M ${-50 + lx} -40 L ${-4 + lx} -32 M ${14 + lx} -32 L ${60 + lx} -42`} stroke={BEARD_D} strokeWidth={12} strokeLinecap="round" />
      <circle cx={-48 + lx} cy={28} r={18} fill="#E8806A" opacity={0.45} />
      <circle cx={62 + lx} cy={28} r={18} fill="#E8806A" opacity={0.45} />
      <path d="M -98 6 Q -106 140 -50 192 Q 0 226 50 192 Q 106 140 98 6 Q 82 70 40 72 Q 0 92 -40 72 Q -82 70 -98 6 Z" fill={BEARD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -60 120 Q -50 160 -30 180 M 0 130 L 0 196 M 52 116 Q 46 160 30 182" stroke={BEARD_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      {mouth === "shout" ? (
        <ellipse cx={8 + lx * 0.5} cy={96} rx={28} ry={24} fill="#5A1E1A" stroke={INK} strokeWidth={5} />
      ) : mouth === "o" ? (
        <ellipse cx={8 + lx * 0.5} cy={94} rx={14} ry={17} fill="#5A1E1A" stroke={INK} strokeWidth={5} />
      ) : (
        <path d={`M ${-14 + lx * 0.5} 92 Q ${8 + lx * 0.5} 100 ${30 + lx * 0.5} 90`} stroke="#5A1E1A" strokeWidth={8} fill="none" strokeLinecap="round" />
      )}
      <path d={`M ${-34 + lx} 56 Q ${8 + lx} 34 ${52 + lx} 56 Q ${30 + lx} 74 ${9 + lx} 62 Q ${-12 + lx} 74 ${-34 + lx} 56 Z`} fill={BEARD_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={10 + lx} cy={24} rx={21} ry={18} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <NavyCap peak={look >= 0 ? 1 : -1} />
      {/* front arm (oilskin sleeve) */}
      <path d={`M ${S[0]} ${S[1]} L ${E[0]} ${E[1]}`} stroke={INK} strokeWidth={112} strokeLinecap="round" />
      <path d={`M ${E[0]} ${E[1]} L ${cuff[0]} ${cuff[1]}`} stroke={INK} strokeWidth={100} strokeLinecap="round" />
      <path d={`M ${S[0]} ${S[1]} L ${E[0]} ${E[1]}`} stroke={OIL} strokeWidth={96} strokeLinecap="round" />
      <path d={`M ${E[0]} ${E[1]} L ${cuff[0]} ${cuff[1]}`} stroke={OIL} strokeWidth={84} strokeLinecap="round" />
      <path d={`M ${S[0] - 10} ${S[1] - 30} L ${E[0] - 6} ${E[1] - 34}`} stroke={OIL_HI} strokeWidth={14} strokeLinecap="round" opacity={0.8} />
      <g transform={`translate(${Hh[0]} ${Hh[1]}) scale(${1 / s})`}>{tool}</g>
      <circle cx={Hh[0]} cy={Hh[1]} r={38} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d={`M ${cuff[0]} ${cuff[1]} L ${cuff[0] + (dx / dd) * 8} ${cuff[1] + (dy / dd) * 8}`} stroke={OIL_D} strokeWidth={90} />
    </g>
  );
};

// ---------- exterior: the island, the tower, ships ----------
// tower base centre (x, y); lantern centre at y - 470
const Tower: React.FC<{ x: number; y: number; lit: number; s?: number }> = ({ x, y, lit, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -76 0 L -56 -400 L 56 -400 L 76 0 Z" fill={WHITE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 40 -390 L 58 -10" stroke="#D8D0C0" strokeWidth={18} />
    <rect x={-12} y={-300} width={24} height={40} rx={6} fill={IRON_D} stroke={INK} strokeWidth={4} />
    <rect x={-12} y={-170} width={24} height={40} rx={6} fill={IRON_D} stroke={INK} strokeWidth={4} />
    <rect x={-84} y={-424} width={168} height={26} fill={IRON} stroke={INK} strokeWidth={6} />
    <path d="M -80 -424 L -80 -456 L 80 -456 L 80 -424 M -40 -424 L -40 -456 M 0 -424 L 0 -456 M 40 -424 L 40 -456" stroke={INK} strokeWidth={5} fill="none" />
    <rect x={-54} y={-520} width={108} height={98} fill={lit > 0 ? "#FFE48A" : "#25304A"} stroke={INK} strokeWidth={7} />
    {lit > 0 ? <circle cx={0} cy={-470} r={34} fill="#FFFFFF" opacity={lit} /> : null}
    <path d="M -54 -520 L 54 -422 M 54 -520 L -54 -422 M -18 -520 L -18 -422 M 18 -520 L 18 -422" stroke={IRON_D} strokeWidth={4} opacity={0.8} />
    <path d="M -64 -518 Q 0 -600 64 -518 Z" fill={IRON} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={0} cy={-596} r={11} fill={IRON} stroke={INK} strokeWidth={5} />
  </g>
);

const Island: React.FC<{ f: number; lit: number; tx?: number; ty?: number; s?: number }> = ({ f, lit, tx = 0, ty = 0, s = 1 }) => (
  <g transform={`translate(${tx} ${ty}) scale(${s})`}>
    <path d="M 20 1340 L 70 1190 L 180 1126 L 320 1104 L 520 1094 L 680 1120 L 760 1200 L 800 1340 Z" fill={ROCK} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 70 1190 L 180 1126 L 320 1104 L 520 1094 L 680 1120 L 760 1200 L 730 1212 L 660 1146 L 520 1122 L 320 1132 L 190 1152 L 92 1206 Z" fill={GRASS} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 110 1250 L 300 1236 M 420 1280 L 640 1262 M 200 1300 L 380 1310" stroke={ROCK_D} strokeWidth={7} strokeLinecap="round" />
    <g>
      <rect x={430} y={1036} width={230} height={70} fill={WHITE} stroke={INK} strokeWidth={7} />
      <path d="M 420 1040 L 466 1000 L 626 1000 L 670 1040 Z" fill={IRON} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[466, 530, 594].map((wx) => (
        <rect key={wx} x={wx} y={1054} width={30} height={30} fill="#25304A" stroke={INK} strokeWidth={4} />
      ))}
    </g>
    <Tower x={330} y={1112} lit={lit} />
    <Spray x={60} y={1310} p={0.5 + 0.5 * Math.sin(f / 9)} h={200} seed="isl" />
  </g>
);

const Steamer: React.FC<{ x: number; y: number; s?: number; f: number; rock?: number }> = ({ x, y, s = 1, f, rock = 2 }) => (
  <g transform={`translate(${x} ${y + 4 * Math.sin(f / 7)}) rotate(${rock * Math.sin(f / 9)}) scale(${s})`}>
    {new Array(4).fill(0).map((_, i) => {
      const age = ((f * 0.6 + i * 18) % 72) / 72;
      return <circle key={i} cx={20 + age * 120} cy={-150 - age * 90} r={22 + age * 26} fill="#5A6070" opacity={0.7 * (1 - age)} stroke={INK} strokeWidth={3} />;
    })}
    <path d="M -140 0 L 150 0 L 120 46 L -120 46 Z" fill="#26222C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -128 14 L 140 14" stroke="#A3262A" strokeWidth={8} />
    <rect x={-70} y={-48} width={130} height={48} fill={WHITE} stroke={INK} strokeWidth={5} />
    <rect x={0} y={-130} width={34} height={84} fill="#A3262A" stroke={INK} strokeWidth={5} />
    <rect x={0} y={-130} width={34} height={20} fill="#26222C" stroke={INK} strokeWidth={4} />
    <path d="M -110 0 L -110 -120 M 110 0 L 110 -100" stroke={INK} strokeWidth={6} />
    {[-50, -22, 6, 34].map((wx) => (
      <circle key={wx} cx={wx} cy={-24} r={7} fill="#FFE27A" stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

// ---------- props for the mystery ----------
const Calendar: React.FC<{ x: number; y: number; day: number; flip: number }> = ({ x, y, day, flip }) => (
  <g transform={`translate(${x} ${y}) rotate(4)`}>
    <rect x={-130} y={-140} width={260} height={290} rx={18} fill={C.cream} stroke={INK} strokeWidth={8} />
    <rect x={-130} y={-140} width={260} height={74} rx={18} fill={C.brick} stroke={INK} strokeWidth={8} />
    <text x={0} y={-86} textAnchor="middle" fontFamily={titleFont} fontSize={50} fill={C.cream}>
      DEC
    </text>
    <text x={0} y={100} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={INK}>
      {day}
    </text>
    {[-80, 0, 80].map((rx) => (
      <circle key={rx} cx={rx} cy={-140} r={12} fill={IRON} stroke={INK} strokeWidth={4} />
    ))}
    {flip > 0 && flip < 1 ? (
      <g transform={`translate(${flip * 160} ${flip * 380}) rotate(${flip * 70})`} opacity={1 - flip}>
        <rect x={-130} y={-66} width={260} height={216} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={0} y={100} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={INK}>
          {day - 1}
        </text>
      </g>
    ) : null}
  </g>
);

const WallClock: React.FC<{ x: number; y: number; f: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={90} width={140} height={250} rx={14} fill={WOOD} stroke={INK} strokeWidth={8} />
    <rect x={-46} y={120} width={92} height={190} rx={10} fill="#1E1A20" stroke={INK} strokeWidth={5} />
    <path d="M 0 120 L 0 268" stroke={BRASS} strokeWidth={6} />
    <circle cx={0} cy={274} r={26} fill={BRASS} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={0} r={118} fill={WOOD} stroke={INK} strokeWidth={8} />
    <circle cx={0} cy={0} r={96} fill={C.cream} stroke={INK} strokeWidth={6} />
    {new Array(12).fill(0).map((_, i) => (
      <path key={i} d={`M ${Math.sin((i / 12) * Math.PI * 2) * 78} ${-Math.cos((i / 12) * Math.PI * 2) * 78} L ${Math.sin((i / 12) * Math.PI * 2) * 88} ${-Math.cos((i / 12) * Math.PI * 2) * 88}`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
    ))}
    <path d="M 0 0 L -38 -30" stroke={INK} strokeWidth={11} strokeLinecap="round" />
    <path d="M 0 0 L 22 -70" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <circle cx={0} cy={0} r={9} fill={INK} />
  </g>
);

const Bed: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-150} width={34} height={330} rx={8} fill={IRON} stroke={INK} strokeWidth={7} />
    <rect x={380} y={-40} width={30} height={220} rx={8} fill={IRON} stroke={INK} strokeWidth={7} />
    <rect x={20} y={20} width={380} height={70} rx={14} fill="#DCD3C0" stroke={INK} strokeWidth={7} />
    <path d="M 44 -6 Q 70 -60 150 -40 Q 180 -10 140 20 Q 80 34 44 -6 Z" fill={WHITE} stroke={INK} strokeWidth={6} transform="rotate(-14 100 -10)" />
    <path d="M 150 30 Q 190 -50 260 -10 Q 300 -60 360 0 Q 420 40 400 110 Q 420 170 380 220 L 330 140 Q 250 120 190 90 Q 140 70 150 30 Z" fill="#7A3B3B" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 200 40 Q 250 10 300 40 M 260 90 Q 320 70 360 110" stroke="#5A2626" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

const HangingOilskins: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g transform={`translate(${x} ${y}) rotate(${1.5 * Math.sin(f / 18)} 0 0)`}>
    <rect x={-60} y={-24} width={120} height={20} rx={6} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    <path d="M 0 -6 L 0 20" stroke={INK} strokeWidth={8} />
    <path d="M -70 30 Q 0 0 70 30 L 110 360 Q 0 384 -110 360 Z" fill={OIL} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -70 30 L -120 220 L -90 230 L -62 120 M 70 30 L 120 220 L 90 230 L 62 120" fill={OIL_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 22 L 6 370" stroke={OIL_D} strokeWidth={7} />
    <path d="M -40 30 L 0 80 L 40 30" fill="none" stroke={OIL_D} strokeWidth={8} />
    <path d="M -60 120 Q -80 220 -90 330" stroke={OIL_HI} strokeWidth={12} fill="none" opacity={0.7} strokeLinecap="round" />
  </g>
);

const Logbook: React.FC<{ f: number; open: number }> = ({ f, open }) => {
  const lines = ["12 DEC: storm…", "13 DEC: all praying…", "15 DEC: God is over all."];
  return (
    <g transform={`translate(540 900) scale(${0.85 + 0.15 * open}) translate(-540 -900)`}>
      <rect x={50} y={560} width={980} height={700} rx={24} fill="#3E2A1E" stroke={INK} strokeWidth={9} />
      <path d="M 80 590 Q 300 568 535 600 L 535 1236 Q 300 1206 80 1230 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
      <path d="M 545 600 Q 780 568 1000 590 L 1000 1230 Q 780 1206 545 1236 Z" fill="#F7EEDB" stroke={INK} strokeWidth={6} />
      <path d="M 540 596 L 540 1240" stroke="#B89A6A" strokeWidth={8} />
      <text x={308} y={662} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick}>
        LOGBOOK
      </text>
      {lines.map((t, i) => (
        <text key={i} x={110} y={770 + i * 120} fontFamily={typeFont} fontSize={34} fill={INK} opacity={interpolate(f, [4 + i * 7, 10 + i * 7], [0, 1], clamp)} transform={`rotate(-3 110 ${770 + i * 120})`}>
          {t}
        </text>
      ))}
      <text x={772} y={662} textAnchor="middle" fontFamily={typeFont} fontSize={32} fill={INK}>
        THE "UNEATEN MEAL"
      </text>
      {/* table + plate + knocked-over chair */}
      <rect x={590} y={900} width={380} height={26} rx={6} fill={WOOD} stroke={INK} strokeWidth={6} />
      <path d="M 620 926 L 620 1120 M 940 926 L 940 1120" stroke={WOOD_D} strokeWidth={18} />
      <ellipse cx={720} cy={890} rx={90} ry={22} fill={WHITE} stroke={INK} strokeWidth={6} />
      <ellipse cx={700} cy={878} rx={34} ry={16} fill="#8A4A2A" stroke={INK} strokeWidth={4} />
      <circle cx={746} cy={876} r={14} fill="#E8C870" stroke={INK} strokeWidth={4} />
      <path d="M 840 900 L 850 840 M 870 900 L 866 846" stroke={STEEL} strokeWidth={7} strokeLinecap="round" />
      <g transform="translate(860 1110) rotate(-78)">
        <rect x={-10} y={-150} width={20} height={150} fill={WOOD} stroke={INK} strokeWidth={5} />
        <rect x={-10} y={-20} width={130} height={20} fill={WOOD} stroke={INK} strokeWidth={5} />
        <path d="M 110 0 L 110 90 M 0 0 L 0 90" stroke={WOOD_D} strokeWidth={14} />
      </g>
    </g>
  );
};

// the official explanation: a huge sea rushing up the west landing (no people shown)
const Landing: React.FC<{ f: number; p: number }> = ({ f, p }) => {
  const sc = lerp(0.55, 1.15, p);
  const slide = lerp(520, 0, p);
  return (
    <g>
      <Clouds f={f} y={520} col="#0E1428" seed="lw" speed={2} />
      <Sea f={f} y0={1260} amp={22} rows={3} />
      <path d="M -20 1920 L -20 980 L 120 900 L 260 960 L 340 1080 L 420 1240 L 470 1920 Z" fill={ROCK} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
      <path d="M 40 1020 L 200 990 M 80 1160 L 300 1120 M 120 1320 L 380 1290" stroke={ROCK_D} strokeWidth={8} strokeLinecap="round" />
      {new Array(6).fill(0).map((_, i) => (
        <rect key={i} x={250 + i * 24} y={1000 + i * 46} width={70} height={18} fill="#9C948A" stroke={INK} strokeWidth={4} />
      ))}
      <path d="M 120 900 L 120 700 L 300 640" stroke={IRON} strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 300 640 L 300 760" stroke={INK} strokeWidth={4} />
      <rect x={60} y={862} width={110} height={44} fill={WOOD} stroke={INK} strokeWidth={6} />
      <g transform={`translate(${1080 - 1000 * sc + slide} ${1480 - 820 * sc}) scale(${sc})`}>
        <path d="M 1000 820 L 1000 120 Q 700 -40 380 60 Q 180 130 160 300 Q 150 420 260 430 Q 330 430 330 360 Q 300 380 280 340 Q 270 250 400 220 Q 560 200 600 400 L 560 820 Z" fill={SEA} stroke={INK} strokeWidth={10} strokeLinejoin="round" />
        <path d="M 980 140 Q 700 0 400 80 Q 220 140 190 300" stroke={FOAM} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M 900 300 Q 760 240 640 330 M 860 520 Q 760 460 660 560" stroke="#4C7896" strokeWidth={12} fill="none" strokeLinecap="round" />
        {new Array(10).fill(0).map((_, i) => (
          <circle key={i} cx={180 + random(`wf${i}`) * 420} cy={60 + random(`wg${i}`) * 140 - (f % 20) * 1.5} r={18 + random(`wr${i}`) * 26} fill={FOAM} stroke={INK} strokeWidth={4} />
        ))}
      </g>
      <Rain f={f} top={500} bottom={1920} op={0.4} seed="lr" />
    </g>
  );
};

const LedBeacon: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => {
  const on = (f % 30) < 6 ? 1 : 0.25;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-120} r={220} fill="url(#ep23glow)" opacity={on * 0.9} />
      <rect x={-30} y={60} width={60} height={300} fill={IRON} stroke={INK} strokeWidth={7} />
      <rect x={-110} y={40} width={220} height={36} rx={8} fill={IRON_D} stroke={INK} strokeWidth={7} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={-80} y={-60 - k * 90} width={160} height={70} rx={14} fill={on > 0.5 ? "#FFE48A" : "#C9A85A"} stroke={INK} strokeWidth={7} />
          {[-48, -16, 16, 48].map((lx) => (
            <circle key={lx} cx={lx} cy={-25 - k * 90} r={10} fill={on > 0.5 ? "#FFFFFF" : "#E8D69A"} />
          ))}
          <rect x={-90} y={-70 - k * 90} width={180} height={14} rx={6} fill={IRON_D} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <rect x={-90} y={-330} width={180} height={30} rx={8} fill={IRON_D} stroke={INK} strokeWidth={6} />
    </g>
  );
};

const Stool: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -80 0 L -110 230 M 80 0 L 110 230 M -20 0 L -30 230 M 20 0 L 30 230" stroke={INK} strokeWidth={26} strokeLinecap="round" />
    <path d="M -80 0 L -110 230 M 80 0 L 110 230 M -20 0 L -30 230 M 20 0 L 30 230" stroke={WOOD} strokeWidth={14} strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={130} ry={34} fill={WOOD} stroke={INK} strokeWidth={8} />
    <g transform="translate(0 -8) scale(0.7) rotate(-8)">
      <NavyCap />
    </g>
  </g>
);

const Monitor: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const names = ["FLANNAN ISLES", "FAIR ISLE", "BELL ROCK", "CAPE WRATH"];
  return (
    <g>
      <rect x={0} y={1240} width={1080} height={680} fill="#3A2E4A" />
      <rect x={0} y={1240} width={1080} height={30} fill="#4E3F63" stroke={INK} strokeWidth={6} />
      <rect x={440} y={1180} width={200} height={70} fill="#1A1626" stroke={INK} strokeWidth={6} />
      <rect x={60} y={540} width={960} height={660} rx={28} fill="#0E0E16" stroke={INK} strokeWidth={10} />
      <rect x={86} y={566} width={908} height={608} rx={12} fill="#13203A" />
      <text x={540} y={626} textAnchor="middle" fontFamily={typeFont} fontSize={38} fill="#9FD6FF">
        EDINBURGH · REMOTE MONITORING
      </text>
      {names.map((n, i) => {
        const cx = 120 + (i % 2) * 430;
        const cy = 660 + Math.floor(i / 2) * 170;
        const pop = popIn(f, at + i * 2, 8);
        return (
          <g key={n} transform={`translate(${cx} ${cy})`} opacity={pop}>
            <rect x={0} y={0} width={410} height={150} rx={14} fill={i === 0 ? "#1F3B5E" : "#1A2C48"} stroke={i === 0 ? C.mustard : "#3A5A86"} strokeWidth={i === 0 ? 7 : 4} />
            <path d="M 40 120 L 52 40 L 76 40 L 88 120 Z" fill={WHITE} stroke={INK} strokeWidth={3} />
            <rect x={48} y={24} width={32} height={18} fill="#FFE48A" />
            <text x={110} y={66} fontFamily={titleFont} fontSize={30} fill={C.cream} textLength={n.length > 11 ? 280 : undefined} lengthAdjust="spacingAndGlyphs">
              {n}
            </text>
            <circle cx={128} cy={104} r={14} fill={OK} opacity={(f + i * 5) % 24 < 18 ? 1 : 0.4} />
            <text x={154} y={116} fontFamily={titleFont} fontSize={34} fill={OK}>
              OK
            </text>
          </g>
        );
      })}
      <g transform="translate(840 1330)">
        <path d="M -50 -60 L 50 -60 L 42 50 Q 0 64 -42 50 Z" fill={C.cream} stroke={INK} strokeWidth={7} />
        <path d="M 50 -36 Q 96 -30 90 6 Q 84 30 46 26" stroke={INK} strokeWidth={10} fill="none" />
        <path d="M -20 -80 q 10 -20 0 -40 M 14 -84 q 10 -20 0 -40" stroke="#D6E0E8" strokeWidth={6} fill="none" opacity={0.7} strokeLinecap="round" />
      </g>
      <rect x={200} y={1300} width={500} height={70} rx={12} fill="#2A2438" stroke={INK} strokeWidth={6} />
      {new Array(10).fill(0).map((_, i) => (
        <rect key={i} x={216 + i * 48} y={1316} width={36} height={36} rx={6} fill="#4A4060" />
      ))}
    </g>
  );
};

export const Keeper23: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "lamp";
  let sky: Sky = "night";
  let stars = false;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let topLayer: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  let headlineFrom = v.headlineAt !== undefined ? Math.round(v.headlineAt * dur) : mode === "lamp" ? -30 : 0;
  let answer: string | undefined;
  const ansF = Math.round((v.answerAt ?? 0.6) * dur);

  if (mode === "lamp") {
    // frame 0: the keeper trims the wick inside the lantern room while the storm hits the glass
    sky = "dark";
    const snip = 0.5 + 0.5 * Math.sin(f / 2.4);
    body = (
      <>
        <LanternRoom f={f} flashes={v.flashes ?? [4, 50]} waveAt={v.waveAt ?? 10} beam={[850, 940]} />
        <Lens cx={850} cy={950} w={400} h={700} f={f} />
        <Lamp x={850} y={1010} f={f} />
        <Keeper x={300} y={820} s={1.15} f={f} hand={[740, 1040]} tool={<Scissors x={0} y={0} ang={-8} open={snip} />} look={1} />
      </>
    );
  } else if (mode === "wick") {
    // the "wickies": trim the wick… then wind the clockwork that turns the lens
    sky = "dark";
    const windF = (v.windAt ?? 0.55) * dur;
    const trimF = (v.trimAt ?? 0.2) * dur;
    const k = ease(f, windF - 5, windF + 3);
    const turn = Math.max(0, f - windF) * 0.32;
    const crank: P = [600 + 60 * Math.cos(turn), 1250 + 60 * Math.sin(turn)];
    const trim: P = [680, 905];
    const hand: P = [lerp(trim[0], crank[0], k), lerp(trim[1], crank[1], k)];
    const snip = 0.5 + 0.5 * Math.sin(f / 2.4);
    body = (
      <>
        <LanternRoom f={f} flashes={[34]} waveAt={52} beam={[790, 830]} />
        <Lens cx={790} cy={830} w={380} h={560} f={f} />
        <Lamp x={790} y={890} f={f} s={0.9} />
        {/* clockwork pedestal that turns the lens */}
        <rect x={620} y={1150} width={340} height={200} rx={16} fill="#2F4A44" stroke={INK} strokeWidth={8} />
        <rect x={660} y={1176} width={260} height={148} rx={10} fill="#1A2A26" stroke={INK} strokeWidth={5} />
        <Gear x={730} y={1250} r={52} rot={turn * 40} />
        <Gear x={845} y={1236} r={40} rot={-turn * 52 + 10} teeth={10} col={BRASS_HI} />
        <path d="M 600 1250 L 640 1250" stroke={INK} strokeWidth={18} />
        <path d={`M 600 1250 L ${crank[0]} ${crank[1]}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
        <path d={`M 600 1250 L ${crank[0]} ${crank[1]}`} stroke={BRASS} strokeWidth={10} strokeLinecap="round" />
        <circle cx={600} cy={1250} r={16} fill={BRASS_D} stroke={INK} strokeWidth={5} />
        <Keeper x={290} y={800} s={1.0} f={f} hand={hand} tool={k < 0.5 ? <Scissors x={0} y={0} ang={-6} open={snip} /> : <circle r={22} fill={WOOD} stroke={INK} strokeWidth={5} />} look={1} />
      </>
    );
    overlay = (
      <>
        {f < windF ? <Chip text={v.chip ?? "TRIM THE WICK"} x={610} y={500} at={trimF} f={f} /> : null}
        <Chip text={v.chip2 ?? "WIND THE CLOCK"} x={610} y={500} at={windF} f={f} rot={3} col={C.cream} />
      </>
    );
  } else if (mode === "dark") {
    // December 1900: a passing steamer sees the Flannan Isles light is OUT
    const outF = (v.outAt ?? 0.6) * dur;
    const lit = f < outF - 6 ? 1 : f < outF ? (Math.floor(f / 2) % 2 === 0 ? 1 : 0) : 0;
    const fl = flashP(f, v.flashes ?? [8, 62]);
    const bx = 390;
    const by = 642;
    body = (
      <>
        <Clouds f={f} y={470} col="#0B1022" seed="dk" speed={1.4} />
        <Clouds f={f} y={640} col="#1E2846" seed="dk2" n={4} speed={2.2} />
        <Bolt x={860} y={470} p={fl} len={600} />
        {lit > 0 ? (
          <>
            <Beam x={bx} y={by} ang={180 + 14 * Math.sin(f / 12)} len={1200} op={0.32} spread={6} />
            <Beam x={bx} y={by} ang={-6 + 14 * Math.sin(f / 12 + 1)} len={1200} op={0.32} spread={6} />
          </>
        ) : null}
        <Sea f={f} y0={1210} amp={20} rows={3} />
        <Steamer x={interpolate(f, [0, dur], [990, 860])} y={1236} s={0.5} f={f} />
        <Island f={f} lit={lit} tx={60} />
        <Rain f={f} top={400} bottom={1920} op={0.45} seed="dr" />
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={fl * 0.3} />
      </>
    );
    topLayer = <Burst x={720} y={780} p={popIn(f, outF, 8)} text="OUT!" size={90} w={0.62} col={C.cream} rot={8} />;
    overlay = v.label ? <Typewriter text={v.label} top={v.labelTop ?? 430} size={v.labelSize ?? 50} delay={4} /> : null;
  } else if (mode === "empty") {
    // storms keep the relief boat away for days… then the empty station: beds unmade, clock stopped, oilskins left
    const turn = (v.turn ?? 0.34) * dur;
    sky = "dark";
    if (f < turn) {
      const span = Math.max(1, turn - 6);
      const dd = interpolate(f, [0, span], [20, 26], clamp);
      const day = Math.floor(dd);
      const flip = dd - day;
      const fl = flashP(f, [5]);
      body = (
        <>
          <Clouds f={f} y={430} col="#0B1022" seed="em" speed={2} />
          <Bolt x={300} y={420} p={fl} len={560} />
          <g transform="translate(110 1000)">
            <path d="M -80 60 L -40 10 L 60 0 L 110 60 Z" fill={ROCK_D} stroke={INK} strokeWidth={5} />
            <Tower x={0} y={10} lit={0} s={0.32} />
          </g>
          <Sea f={f} y0={1060} amp={34} rows={4} />
          <Steamer x={500} y={1110} s={1.3} f={f * 1.6} rock={10} />
          <Spray x={700} y={1180} p={0.5 + 0.5 * Math.sin(f / 5)} h={320} seed="bw" />
          <Sea f={f + 20} y0={1230} amp={30} rows={2} />
          <Rain f={f} top={380} bottom={1920} op={0.55} seed="er" />
          <Calendar x={800} y={720} day={day} flip={day < 26 ? flip : 0} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={fl * 0.3} />
        </>
      );
    } else {
      headline = v.headline2 ?? "NOBODY THERE.";
      headlineFrom = Math.round(turn);
      const items: number[] = (v.items ?? [0.5, 0.66, 0.82]).map((u: number) => u * dur);
      const lightOn = (i: number) => popIn(f, items[i], 8);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1200} fill="#2C3650" />
          {new Array(9).fill(0).map((_, i) => (
            <path key={i} d={`M ${60 + i * 120} 420 L ${60 + i * 120} 1060`} stroke="#34405E" strokeWidth={30} />
          ))}
          <rect x={0} y={1040} width={1080} height={30} fill={WOOD_D} stroke={INK} strokeWidth={6} />
          <rect x={0} y={1180} width={1080} height={740} fill="#4A3828" />
          {new Array(6).fill(0).map((_, i) => (
            <path key={i} d={`M 0 ${1240 + i * 110} L 1080 ${1240 + i * 110}`} stroke="#33261A" strokeWidth={6} />
          ))}
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={[540, 270, 800][i]} cy={[720, 1030, 960][i]} rx={[200, 290, 190][i]} ry={[300, 230, 290][i]} fill="#CFE4FF" opacity={0.16 * lightOn(i)} />
          ))}
          <WallClock x={540} y={640} f={f} />
          <Bed x={60} y={1010} />
          <HangingOilskins x={800} y={770} f={f} />
          {new Array(18).fill(0).map((_, i) => (
            <circle key={i} cx={(random(`mx${i}`) * 1080 + f * 0.8) % 1080} cy={500 + ((random(`my${i}`) * 700 + f * 0.6) % 700)} r={3 + random(`mr${i}`) * 4} fill="#E6EEFF" opacity={0.4} />
          ))}
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep23vig)" />
        </>
      );
      overlay = (
        <>
          <Chip text="STOPPED" x={540} y={830} at={items[0]} f={f} col={C.cream} size={48} rot={3} />
          <Chip text="EMPTY" x={250} y={1120} at={items[1]} f={f} col={C.cream} size={48} />
          <Chip text="LEFT BEHIND" x={720} y={1150} at={items[2]} f={f} col={C.cream} size={48} />
        </>
      );
    }
  } else if (mode === "myth") {
    // the creepy logbook + "uneaten meal" were made up later; the official report: a huge sea swept them away
    const waveF = (v.waveAt ?? 0.55) * dur;
    const stampF = (v.stampAt ?? 0.38) * dur;
    if (f < waveF) {
      sky = "paper";
      const slam = f >= stampF ? interpolate(f - stampF, [0, 6], [2.4, 1], { ...clamp, easing: Easing.bezier(0.3, 1.4, 0.5, 1) }) : 0;
      body = <Logbook f={f} open={popIn(f, 0, 10)} />;
      topLayer =
        slam > 0 ? (
          <>
            <g transform={`translate(560 910) rotate(-12) scale(${slam})`}>
              <rect x={-380} y={-100} width={760} height={200} rx={20} fill="rgba(244,234,213,0.92)" stroke="#D7322A" strokeWidth={16} />
              <text x={0} y={(v.stamp ?? "MADE UP!").length > 7 ? 46 : 60} textAnchor="middle" fontFamily={titleFont} fontSize={(v.stamp ?? "MADE UP!").length > 7 ? 128 : 168} fill="#D7322A" textLength={(v.stamp ?? "MADE UP!").length > 7 ? 660 : undefined} lengthAdjust="spacingAndGlyphs">
                {v.stamp ?? "MADE UP!"}
              </text>
            </g>
            <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(f, [stampF, stampF + 6], [0.7, 0], clamp)} />
          </>
        ) : null;
    } else {
      headline = v.headline2 ?? "A GIANT WAVE";
      headlineFrom = Math.round(waveF);
      body = <Landing f={f} p={ease(f, waveF, waveF + 20)} />;
      overlay = <Tag text={v.tag ?? "THE OFFICIAL REPORT"} x={540} y={v.tagY ?? 440} delay={Math.round(waveF) + 4} />;
    }
  } else if (mode === "today") {
    // TODAY: the lantern room is empty – an LED light flashes by itself, the old cap on a stool – watched from Edinburgh
    const screenF = (v.screenAt ?? 0.66) * dur;
    const photoF = (v.photoAt ?? 0.36) * dur;
    answer = v.answer;
    if (f >= photoF && f < screenF) {
      // the real Flannan Isles lighthouse today: solar panels, nobody living there
      sky = "day";
      const pop = popIn(f, photoF, 9);
      body = (
        <>
          <rect x={0} y={1180} width={1080} height={740} fill="#7FA35A" />
          <Clouds f={f} y={1200} col="#9CC070" seed="gr" n={4} speed={0.3} />
        </>
      );
      overlay = (
        <>
          <div style={{ position: "absolute", left: 80, top: 470, width: 920, height: 720, rotate: "-2deg", scale: `${0.8 + 0.2 * pop}`, opacity: Math.min(1, pop * 1.4), background: C.cream, border: `6px solid ${INK}`, boxShadow: "0 14px 0 rgba(0,0,0,0.3)" }}>
            <div style={{ position: "absolute", left: 18, top: 18, right: 18, bottom: 70, overflow: "hidden", border: `3px solid ${INK}` }}>
              <Img src={staticFile(`ep/${ep.id}-extra/photos/tower.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${1 + 0.04 * (f - photoF) / 30}` }} />
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, textAlign: "center", fontFamily: typeFont, fontSize: 34, color: INK }}>{v.photoLabel ?? "FLANNAN ISLES LIGHTHOUSE · 2012"}</div>
            <div style={{ position: "absolute", right: 22, top: 22, fontFamily: typeFont, fontSize: 20, color: C.cream, textShadow: "0 2px 3px rgba(0,0,0,0.9)" }}>Photo: Chris Downer · CC BY-SA 2.0</div>
            <div style={{ position: "absolute", left: 380, top: -26, width: 160, height: 46, background: "rgba(240,226,180,0.85)", rotate: "4deg" }} />
          </div>
          <Chip text={v.photoChip ?? "SOLAR PANELS"} x={760} y={1150} at={photoF + 8} f={f} size={50} rot={4} />
        </>
      );
    } else if (f < screenF) {
      sky = "day";
      body = (
        <>
          <LanternRoom f={f} calm />
          <g transform="translate(150 1250) rotate(-12)">
            <rect x={-120} y={-60} width={240} height={110} fill="#1F3E7A" stroke={INK} strokeWidth={7} />
            <path d="M -60 -60 L -60 50 M 0 -60 L 0 50 M 60 -60 L 60 50 M -120 -5 L 120 -5" stroke="#6E9CD8" strokeWidth={4} />
          </g>
          <LedBeacon x={720} y={1010} f={f} />
          <ellipse cx={300} cy={1660} rx={250} ry={70} fill={GLOW} opacity={0.22} />
          <ellipse cx={300} cy={1400} rx={170} ry={120} fill="#FFFFFF" opacity={0.1} />
          <Stool x={300} y={1440} />
          <path d="M 0 470 L 170 470 M 0 470 L 0 640 M 0 470 L 150 560 M 0 470 L 80 620 M 0 470 L 140 510 M 40 470 Q 30 500 0 506 M 90 470 Q 70 540 0 560 M 140 470 Q 110 580 0 610" stroke="#E8E8E8" strokeWidth={3} fill="none" opacity={0.8} />
          <g transform="translate(940 440)">
            <rect x={-50} y={-10} width={100} height={60} rx={10} fill="#D8DCE2" stroke={INK} strokeWidth={6} />
            <circle cx={-10} cy={20} r={18} fill={INK} />
            <circle cx={30} cy={6} r={7} fill="#FF3B30" opacity={f % 20 < 10 ? 1 : 0.2} />
          </g>
        </>
      );
    } else {
      sky = "modern";
      body = <Monitor f={f} at={screenF + 2} />;
      overlay = v.chip ? <Chip text={v.chip} x={540} y={1010} at={(v.chipAt ?? 0.75) * dur} f={f} size={44} /> : null;
    }
  }

  return (
    <Backdrop sky={sky} stars={stars} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="ep23glow">
            <stop offset="0" stopColor="#FFF1C0" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#F2B544" stopOpacity="0.4" />
            <stop offset="1" stopColor="#F2B544" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ep23vig" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.5" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {body}
      </svg>
      {overlay}
      {topLayer ? (
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {topLayer}
        </svg>
      ) : null}
      {headline && !(answer && f >= ansF) ? (
        <Sequence key={headline} from={headlineFrom} layout="none">
          <Headline text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} />
        </Sequence>
      ) : null}
      {answer ? (
        <Sequence from={ansF} layout="none">
          <Headline text={answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag && mode !== "myth" ? <Tag text={v.tag} x={v.tagX ?? 540} y={v.tagY ?? 640} delay={Math.round((v.tagAt ?? 0.2) * dur)} /> : null}
    </Backdrop>
  );
};
