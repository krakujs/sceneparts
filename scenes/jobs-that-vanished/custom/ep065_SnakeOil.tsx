import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, bodyFont, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep065 Snake-oil salesman – the travelling medicine-show huckster. Clark Stanley, the self-styled "Rattlesnake King",
// sold "Snake Oil Liniment"; the U.S. Bureau of Chemistry found it was mostly light mineral oil with ~1 % fatty oil
// (probably beef fat), capsicum and possibly a trace of camphor and turpentine – no snake. Fined $20 (15 June 1916).
// Look: warm carnival – a painted red-and-gold wagon at sunset, striped tent canvas, lanterns, bunting, a crowd below.
// The huckster here is a generic medicine-show seller (top hat, red tailcoat, striped waistcoat), not a portrait.
// visual: { mode: "stage" | "snakes" | "pitch" | "lab" | "today", headline?, accent?, top?, size?, tag?, tagX?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?, gaspAt? (snakes), priceAt? (pitch),
//           popAt?: number[] (lab ingredients 0–1), stampAt? (lab), answer?, answerAccent?, answerAt?, answerSize? (today) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const COAT = "#C0352B";
const COAT_D = "#8E231C";
const COAT_HI = "#E05A44";
const VEST = "#F2B544";
const VEST_D = "#C88A1E";
const PANTS = "#4A4550";
const PANTS_D = "#34303A";
const HAT = "#221D26";
const SKIN = "#EDBE96";
const SKIN_D = "#C98E68";
const CHEEK = "#E8857A";
const STACHE = "#5A3520";
const GLASS = "#9A5A22";
const GLASS_D = "#6E3E14";
const GLASS_HI = "#E3A15A";
const LABEL = "#F4EAD5";
const SNAKE = "#9C9248";
const SNAKE_D = "#5E5A26";
const SNAKE_B = "#E4D58E";
const WAGON = "#B8322A";
const WAGON_D = "#7E2218";
const GOLD = "#F2B544";
const WOOD = "#7A4E2C";
const WOOD_D = "#5A361C";
const WOOD_HI = "#A8774A";
const STRIPE = "#C8392E";
const CANVAS = "#F4E6C8";
const GLOW = "#FFD983";

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

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string; fit?: number }> = ({ x, y, p, text, rot = -8, size = 84, col = C.mustard, fit }) => {
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
      <text x={0} y={size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK} {...(fit ? { textLength: fit, lengthAdjust: "spacingAndGlyphs" } : {})}>
        {text}
      </text>
    </g>
  );
};

// amber medicine bottle with a cream "SNAKE OIL" label. Origin = bottom centre, ~262 tall at s = 1.
export const OilBottle: React.FC<{ x: number; y: number; s?: number; rot?: number; shine?: number }> = ({ x, y, s = 1, rot = 0, shine = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {shine > 0 ? (
      <g opacity={shine}>
        {new Array(12).fill(0).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <path key={i} d={`M ${Math.cos(a) * 150} ${-130 + Math.sin(a) * 150} L ${Math.cos(a + 0.12) * 260} ${-130 + Math.sin(a + 0.12) * 260} L ${Math.cos(a - 0.12) * 260} ${-130 + Math.sin(a - 0.12) * 260} Z`} fill={GLOW} opacity={0.75} />;
        })}
        <circle cx={0} cy={-130} r={150} fill={GLOW} opacity={0.35} />
      </g>
    ) : null}
    <path d="M -48 -150 Q -48 -182 -18 -190 L -18 -232 L 18 -232 L 18 -190 Q 48 -182 48 -150 L 48 -12 Q 48 0 36 0 L -36 0 Q -48 0 -48 -12 Z" fill={GLASS} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 30 -150 L 30 -14" stroke={GLASS_D} strokeWidth={12} strokeLinecap="round" opacity={0.7} />
    <rect x={-24} y={-264} width={48} height={38} rx={6} fill="#C9A273" stroke={INK} strokeWidth={6} />
    <rect x={-41} y={-132} width={82} height={102} rx={6} fill={LABEL} stroke={INK} strokeWidth={5} />
    <text x={0} y={-104} textAnchor="middle" fontFamily={titleFont} fontSize={22} fill={COAT_D} textLength={66} lengthAdjust="spacingAndGlyphs">
      SNAKE
    </text>
    <text x={0} y={-72} textAnchor="middle" fontFamily={titleFont} fontSize={32} fill={COAT_D}>
      OIL
    </text>
    <path d="M -30 -50 Q -18 -62 -6 -50 Q 6 -38 18 -50 Q 26 -58 32 -52" stroke={SNAKE_D} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -34 -176 Q -40 -110 -36 -142" stroke={GLASS_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -36 -26 L -36 -8" stroke={GLASS_HI} strokeWidth={8} strokeLinecap="round" opacity={0.8} />
  </g>
);

// a thick patterned snake body along any path, plus head and rattle helpers
const SnakeBody: React.FC<{ d: string; w?: number }> = ({ d, w = 26 }) => (
  <g>
    <path d={d} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={SNAKE} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={SNAKE_D} strokeWidth={w * 0.55} fill="none" strokeDasharray="12 22" strokeLinecap="round" />
    <path d={d} stroke={SNAKE_B} strokeWidth={w * 0.18} fill="none" strokeDasharray="4 30" strokeDashoffset={10} strokeLinecap="round" opacity={0.9} />
  </g>
);

const SnakeHead: React.FC<{ x: number; y: number; rot?: number; s?: number; f: number }> = ({ x, y, rot = 0, s = 1, f }) => {
  const flick = Math.sin(f / 2.5) > 0.2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {flick ? <path d="M 40 4 L 70 4 L 82 -6 M 70 4 L 82 14" stroke="#D7322A" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
      <path d="M -14 -20 Q 22 -30 46 -8 Q 52 4 46 14 Q 22 30 -14 22 Q -24 0 -14 -20 Z" fill={SNAKE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 0 -16 Q 18 -18 30 -8" stroke={SNAKE_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={24} cy={-6} r={8} fill="#F2D24A" stroke={INK} strokeWidth={3} />
      <ellipse cx={26} cy={-6} rx={2.5} ry={6} fill={INK} />
      <circle cx={42} cy={2} r={2.5} fill={INK} />
    </g>
  );
};

const Rattle: React.FC<{ x: number; y: number; rot?: number; s?: number; f: number }> = ({ x, y, rot = 0, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(f * 1.9) * 9}) scale(${s})`}>
    {[0, 1, 2, 3].map((k) => (
      <ellipse key={k} cx={0} cy={10 + k * 16} rx={14 - k * 2} ry={10} fill={k % 2 ? "#D9C48C" : "#C4AE72"} stroke={INK} strokeWidth={4} />
    ))}
    {Math.sin(f * 1.9) > 0.5 ? <path d="M -30 40 l -14 -6 M -30 56 l -16 2 M 30 40 l 14 -6 M 30 56 l 16 2" stroke={INK} strokeWidth={4} strokeLinecap="round" /> : null}
  </g>
);

// The huckster: top hat, red tailcoat, striped mustard waistcoat, handlebar moustache, big grin.
// Origin = feet centre, facing right, ~770 tall (hat top) at s = 1. raise 0..1 lifts the right ("bottle") arm.
type Hold = "bottle" | "snake" | "none";
export const Huckster: React.FC<{ x: number; y: number; s?: number; f: number; raise?: number; hold?: Hold; armSnake?: boolean; talk?: boolean; facing?: 1 | -1; bounce?: boolean; shine?: number }> = ({ x, y, s = 1, f, raise = 1, hold = "bottle", armSnake = true, talk = true, facing = 1, bounce = true, shine = 0 }) => {
  const bob = bounce ? Math.abs(Math.sin(f / 6)) * -8 : 0;
  const mouth = talk ? 0.35 + 0.65 * Math.abs(Math.sin(f / 2.3)) : 0.6;
  const shx = 84;
  const shy = -452;
  const ex = interpolate(raise, [0, 1], [158, 170]);
  const ey = interpolate(raise, [0, 1], [-376, -500]);
  const hx = interpolate(raise, [0, 1], [236, 188]) + Math.sin(f / 5) * 4 * raise;
  const hy = interpolate(raise, [0, 1], [-418, -578]) + Math.sin(f / 7) * 5;
  const sway = Math.sin(f / 8) * 8;
  const arm = `M ${shx} ${shy} Q ${ex} ${ey} ${hx} ${hy}`;
  const lArm = "M -84 -452 Q -150 -380 -198 -414";
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={150} ry={20} fill="#000" opacity={0.22} />
      {/* legs + boots */}
      {[-38, 38].map((lx) => (
        <g key={lx}>
          <rect x={lx - 26} y={-262} width={52} height={250} fill={PANTS} stroke={INK} strokeWidth={6} />
          {[-12, 0, 12].map((k) => (
            <path key={k} d={`M ${lx + k} -256 L ${lx + k} -18`} stroke={PANTS_D} strokeWidth={4} />
          ))}
          <path d={`M ${lx - 30} -6 Q ${lx - 30} -30 ${lx} -30 Q ${lx + 40} -30 ${lx + 48} -6 Z`} fill="#1E1A1A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        </g>
      ))}
      <g transform={`translate(0 ${bob})`}>
        {/* coat tails */}
        <path d="M -98 -440 Q -136 -300 -128 -150 L -40 -196 L 40 -196 L 128 -150 Q 136 -300 98 -440 Z" fill={COAT_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {/* left arm with a rattlesnake draped over it */}
        <path d={lArm} stroke={INK} strokeWidth={54} fill="none" strokeLinecap="round" />
        <path d={lArm} stroke={COAT} strokeWidth={42} fill="none" strokeLinecap="round" />
        {armSnake ? (
          <g>
            <Rattle x={-130} y={-262} rot={10} s={0.9} f={f} />
            <SnakeBody d={`M -130 -266 Q -118 -340 -160 -380 Q -196 -410 -228 -394 Q ${-266 + sway * 0.4} -372 ${-268 + sway} -432 Q ${-266 + sway} -488 ${-228 + sway} -500`} w={24} />
            <SnakeHead x={-226 + sway} y={-502} rot={-14} s={0.95} f={f} />
          </g>
        ) : null}
        <circle cx={-198} cy={-414} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M -214 -398 Q -198 -388 -182 -398" stroke={SKIN_D} strokeWidth={4} fill="none" />
        {/* torso: coat, waistcoat, shirt, bow tie */}
        <path d="M -102 -456 Q -114 -330 -90 -226 L 90 -226 Q 114 -330 102 -456 Q 0 -492 -102 -456 Z" fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -82 -430 Q -96 -340 -80 -250" stroke={COAT_HI} strokeWidth={7} fill="none" opacity={0.7} strokeLinecap="round" />
        <path d="M -56 -462 L 56 -462 L 68 -236 L 0 -214 L -68 -236 Z" fill={VEST} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[-44, -26, -8, 10, 28, 46].map((k) => (
          <path key={k} d={`M ${k} -452 L ${k * 1.18} -232`} stroke={VEST_D} strokeWidth={6} />
        ))}
        <path d="M -30 -470 L 30 -470 L 0 -396 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {[-370, -330, -290, -252].map((by) => (
          <circle key={by} cx={0} cy={by} r={7} fill={COAT_D} stroke={INK} strokeWidth={3} />
        ))}
        <path d="M -48 -318 Q -10 -286 30 -312" stroke={GOLD} strokeWidth={6} fill="none" />
        <circle cx={32} cy={-312} r={11} fill={GOLD} stroke={INK} strokeWidth={4} />
        <path d="M -58 -464 L -22 -404 L -66 -300 Z" fill={COAT_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 58 -464 L 22 -404 L 66 -300 Z" fill={COAT_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-16} y={-500} width={40} height={36} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M -30 -472 L 30 -472 L 22 -488 L -22 -488 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <path d="M 0 -470 L -40 -494 L -40 -446 Z M 0 -470 L 40 -494 L 40 -446 Z" fill={INK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={0} cy={-470} r={10} fill={COAT_D} stroke={INK} strokeWidth={3} />
        {/* head */}
        <ellipse cx={-44} cy={-548} rx={14} ry={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        <ellipse cx={8} cy={-548} rx={62} ry={68} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -48 -590 Q -40 -540 -40 -520" stroke={STACHE} strokeWidth={14} fill="none" strokeLinecap="round" />
        <circle cx={-6} cy={-528} r={13} fill={CHEEK} opacity={0.45} />
        <circle cx={56} cy={-528} r={11} fill={CHEEK} opacity={0.45} />
        <path d="M -10 -588 Q 2 -600 16 -590 M 32 -592 Q 46 -602 60 -590" stroke={STACHE} strokeWidth={7} fill="none" strokeLinecap="round" />
        <ellipse cx={6} cy={-566} rx={7} ry={9} fill={INK} />
        <ellipse cx={46} cy={-566} rx={7} ry={9} fill={INK} />
        <circle cx={8} cy={-569} r={2.5} fill="#FFFFFF" />
        <circle cx={48} cy={-569} r={2.5} fill="#FFFFFF" />
        <path d="M 26 -560 Q 44 -536 26 -526" stroke={SKIN_D} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d={`M 2 -514 L 52 -516 Q 50 ${-500 + 22 * mouth} 28 ${-494 + 20 * mouth} Q 6 ${-498 + 18 * mouth} 2 -514 Z`} fill="#7A1E18" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M 14 ${-498 + 18 * mouth} Q 28 ${-506 + 14 * mouth} 42 ${-500 + 18 * mouth}`} fill="#E8857A" stroke="none" />
        <path d="M 6 -510 L 48 -512" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
        <path d="M 26 -518 Q 4 -530 -26 -512 Q -38 -506 -42 -520 Q -30 -534 -6 -536 Q 14 -540 26 -530 Q 38 -540 58 -536 Q 82 -534 92 -520 Q 88 -506 76 -512 Q 48 -530 26 -518 Z" fill={STACHE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        {/* top hat */}
        <g transform="rotate(-6 8 -600)">
          <ellipse cx={8} cy={-602} rx={96} ry={18} fill={HAT} stroke={INK} strokeWidth={6} />
          <path d="M -52 -606 L -62 -772 Q 8 -786 80 -772 L 70 -606 Z" fill={HAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -54 -612 L -56 -642 Q 8 -652 74 -642 L 72 -612 Z" fill={COAT} stroke={INK} strokeWidth={4} />
          <path d="M -40 -660 L -46 -756" stroke="#4A4252" strokeWidth={9} strokeLinecap="round" />
        </g>
        {/* right arm: bottle or snake held up */}
        {hold === "snake" ? (
          <g>
            <Rattle x={hx + 70} y={hy + 320} rot={190} s={0.95} f={f} />
            <SnakeBody d={`M ${hx + 70} ${hy + 318} Q ${hx - 40 + sway} ${hy + 240} ${hx + 26} ${hy + 150} Q ${hx + 92} ${hy + 64} ${hx} ${hy} Q ${hx - 64 + sway} ${hy - 60} ${hx - 14 + sway} ${hy - 132}`} w={28} />
            <SnakeHead x={hx - 8 + sway} y={hy - 142} rot={-64} s={1.15} f={f} />
          </g>
        ) : null}
        {hold === "bottle" ? <OilBottle x={hx + 4} y={hy + 40} s={0.82} rot={6 + Math.sin(f / 6) * 4} shine={shine} /> : null}
        <path d={arm} stroke={INK} strokeWidth={54} fill="none" strokeLinecap="round" />
        <path d={arm} stroke={COAT} strokeWidth={42} fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={24} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d={`M ${hx - 18} ${hy - 6} L ${hx + 20} ${hy - 6} M ${hx - 18} ${hy + 8} L ${hx + 20} ${hy + 8}`} stroke={SKIN_D} strokeWidth={4} />
      </g>
    </g>
  );
};

// string of bunting flags sagging between two points
const Bunting: React.FC<{ x0: number; x1: number; y: number; sag?: number; n?: number; f: number }> = ({ x0, x1, y, sag = 60, n = 12, f }) => {
  const pt = (t: number) => ({ x: x0 + (x1 - x0) * t, y: y + Math.sin(Math.PI * t) * sag });
  return (
    <g>
      <path d={`M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}`} stroke={INK} strokeWidth={5} fill="none" />
      {new Array(n).fill(0).map((_, i) => {
        const p = pt((i + 0.5) / n);
        const flap = Math.sin(f / 6 + i) * 4;
        return <path key={i} d={`M ${p.x - 30} ${p.y} L ${p.x + 30} ${p.y} L ${p.x + flap} ${p.y + 62} Z`} fill={[STRIPE, GOLD, "#2E7D7A", CANVAS][i % 4]} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      })}
    </g>
  );
};

const Lanterns: React.FC<{ x0: number; x1: number; y: number; n?: number; f: number }> = ({ x0, x1, y, n = 6, f }) => (
  <g>
    <path d={`M ${x0} ${y} Q ${(x0 + x1) / 2} ${y + 110} ${x1} ${y}`} stroke={INK} strokeWidth={5} fill="none" />
    {new Array(n).fill(0).map((_, i) => {
      const t = (i + 0.5) / n;
      const lx = x0 + (x1 - x0) * t;
      const ly = y + Math.sin(Math.PI * t) * 55 + 10;
      return (
        <g key={i} transform={`translate(${lx} ${ly}) rotate(${Math.sin(f / 10 + i) * 4})`}>
          <circle cx={0} cy={40} r={70} fill={GLOW} opacity={0.18 + 0.06 * Math.sin(f / 4 + i)} />
          <ellipse cx={0} cy={40} rx={30} ry={38} fill={i % 2 ? GLOW : "#F08A4A"} stroke={INK} strokeWidth={5} />
          <path d="M -30 40 L 30 40 M -22 16 L 22 16 M -22 64 L 22 64" stroke={INK} strokeWidth={3} opacity={0.5} />
          <rect x={-12} y={-4} width={24} height={10} fill={INK} />
        </g>
      );
    })}
  </g>
);

// vertical red/cream striped tent canvas with a scalloped valance on top
const Tent: React.FC<{ y0: number; y1: number; dark?: number }> = ({ y0, y1, dark = 0 }) => (
  <g>
    {new Array(13).fill(0).map((_, i) => (
      <rect key={i} x={i * 90 - 20} y={y0} width={90} height={y1 - y0} fill={i % 2 ? CANVAS : STRIPE} />
    ))}
    {new Array(13).fill(0).map((_, i) => (
      <path key={`v${i}`} d={`M ${i * 90 - 20} ${y0} L ${i * 90 + 70} ${y0} L ${i * 90 + 70} ${y0 + 40} A 45 45 0 0 1 ${i * 90 - 20} ${y0 + 40} Z`} fill={i % 2 ? STRIPE : GOLD} stroke={INK} strokeWidth={5} />
    ))}
    <rect x={-10} y={y0 - 14} width={1100} height={20} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    {dark > 0 ? <rect x={0} y={y0} width={1080} height={y1 - y0} fill="#121A2C" opacity={dark} /> : null}
  </g>
);

// the painted medicine-show wagon seen from behind: tall red box, gold border, "SNAKE OIL!" lettering, a tailboard stage
const Wagon: React.FC<{ f: number; y: number }> = ({ f, y }) => (
  <g>
    <path d={`M 10 820 Q 540 690 1070 820 L 1070 860 L 10 860 Z`} fill={WAGON_D} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={30} y={850} width={1020} height={y - 850} fill={WAGON} stroke={INK} strokeWidth={8} />
    <rect x={62} y={884} width={956} height={y - 920} fill="none" stroke={GOLD} strokeWidth={10} />
    {[[62, 884], [1018, 884], [62, y - 36], [1018, y - 36]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={22} fill={GOLD} stroke={INK} strokeWidth={5} />
    ))}
    <g transform="rotate(-4 830 1200)">
      <text x={830} y={1150} textAnchor="middle" fontFamily={titleFont} fontSize={112} fill={GOLD} stroke={INK} strokeWidth={8} paintOrder="stroke" textLength={400} lengthAdjust="spacingAndGlyphs">
        SNAKE
      </text>
      <text x={830} y={1268} textAnchor="middle" fontFamily={titleFont} fontSize={112} fill={GOLD} stroke={INK} strokeWidth={8} paintOrder="stroke">
        OIL!
      </text>
    </g>
    <text x={830} y={1350} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={CANVAS} stroke={INK} strokeWidth={5} paintOrder="stroke">
      CURES ALL PAIN!
    </text>
    {[0, 1, 2, 3, 4, 5].map((k) => {
      const a = (k / 6) * Math.PI * 2 + f / 30;
      return <circle key={k} cx={830 + Math.cos(a) * 240} cy={1220 + Math.sin(a) * 180} r={9} fill={k % 2 ? GLOW : "#FFFFFF"} opacity={0.5 + 0.5 * Math.sin(f / 3 + k)} />;
    })}
    {/* tailboard stage + fringe */}
    <rect x={-10} y={y - 6} width={1100} height={52} fill={WOOD_HI} stroke={INK} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
      <path key={k} d={`M ${k * 92 - 6} ${y + 46} L ${k * 92 + 86} ${y + 46} L ${k * 92 + 40} ${y + 96} Z`} fill={k % 2 ? GOLD : STRIPE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    ))}
  </g>
);

const WagonWheel: React.FC<{ x: number; y: number; r: number; f: number }> = ({ x, y, r, f }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="none" stroke={INK} strokeWidth={30} />
    <circle r={r} fill="none" stroke={WAGON_D} strokeWidth={18} />
    {new Array(10).fill(0).map((_, i) => {
      const a = (i / 10) * Math.PI * 2 + f / 200;
      return <path key={i} d={`M 0 0 L ${Math.cos(a) * r} ${Math.sin(a) * r}`} stroke={GOLD} strokeWidth={12} />;
    })}
    <circle r={30} fill={GOLD} stroke={INK} strokeWidth={6} />
  </g>
);

const COATS = ["#3F4E6E", "#6B4A2E", "#4E5E3A", "#5A3B4E", "#7A5236", "#3A4A5A", "#6E5A3A", "#4A3F5E", "#5E4A2E"];
const HAIRS = ["#3A2618", "#1E1A18", "#6B4A2E", "#4A3420"];

const HatOn: React.FC<{ kind: number; x: number; y: number; r: number; col: string }> = ({ kind, x, y, r, col }) => {
  if (kind === 0)
    return (
      <g>
        <ellipse cx={x} cy={y - r * 0.35} rx={r * 1.25} ry={r * 0.22} fill={col} stroke={INK} strokeWidth={5} />
        <path d={`M ${x - r * 0.8} ${y - r * 0.4} Q ${x - r * 0.85} ${y - r * 1.35} ${x} ${y - r * 1.38} Q ${x + r * 0.85} ${y - r * 1.35} ${x + r * 0.8} ${y - r * 0.4} Z`} fill={col} stroke={INK} strokeWidth={5} />
      </g>
    );
  if (kind === 1)
    return (
      <g>
        <ellipse cx={x} cy={y - r * 0.4} rx={r * 1.7} ry={r * 0.3} fill="#A8774A" stroke={INK} strokeWidth={5} />
        <path d={`M ${x - r * 0.75} ${y - r * 0.5} Q ${x - r * 0.7} ${y - r * 1.4} ${x} ${y - r * 1.2} Q ${x + r * 0.7} ${y - r * 1.4} ${x + r * 0.75} ${y - r * 0.5} Z`} fill="#A8774A" stroke={INK} strokeWidth={5} />
        <path d={`M ${x - r * 0.74} ${y - r * 0.62} L ${x + r * 0.74} ${y - r * 0.62}`} stroke={INK} strokeWidth={8} />
      </g>
    );
  if (kind === 2)
    return <path d={`M ${x - r * 1.15} ${y + r * 0.3} Q ${x - r * 1.2} ${y - r * 1.25} ${x} ${y - r * 1.25} Q ${x + r * 1.2} ${y - r * 1.25} ${x + r * 1.15} ${y + r * 0.3} Q ${x} ${y - r * 0.2} ${x - r * 1.15} ${y + r * 0.3} Z`} fill={col} stroke={INK} strokeWidth={5} />;
  return (
    <g>
      <path d={`M ${x - r * 0.95} ${y - r * 0.2} Q ${x - r} ${y - r * 1.2} ${x} ${y - r * 1.15} Q ${x + r} ${y - r * 1.2} ${x + r * 0.95} ${y - r * 0.2} Z`} fill={col} stroke={INK} strokeWidth={5} />
      <ellipse cx={x + r * 0.5} cy={y - r * 0.25} rx={r * 0.7} ry={r * 0.16} fill={col} stroke={INK} strokeWidth={4} />
    </g>
  );
};

// the audience seen from behind (foreground of the stage shot); some hands up with coins
const CrowdBack: React.FC<{ f: number; y0: number; coins?: number[] }> = ({ f, y0, coins = [1, 6] }) => {
  const xs = [30, 160, 300, 440, 580, 720, 860, 990, 1110];
  return (
    <g>
      {xs.map((x, i) => {
        const hy = y0 + (i % 2) * 46 + random(`cb${i}`) * 24 + Math.sin(f / 7 + i) * 4;
        const col = COATS[i % COATS.length];
        const up = coins.includes(i);
        const wave = Math.sin(f / 4 + i) * 14;
        return (
          <g key={i}>
            {up ? (
              <g>
                <path d={`M ${x + 60} ${hy + 110} Q ${x + 120} ${hy - 20} ${x + 104 + wave} ${hy - 150}`} stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
                <path d={`M ${x + 60} ${hy + 110} Q ${x + 120} ${hy - 20} ${x + 104 + wave} ${hy - 150}`} stroke={col} strokeWidth={34} fill="none" strokeLinecap="round" />
                <circle cx={x + 104 + wave} cy={hy - 160} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
                <circle cx={x + 108 + wave} cy={hy - 196} r={22} fill={GOLD} stroke={INK} strokeWidth={5} />
                <path d={`M ${x + 136 + wave} ${hy - 226} l 6 -16 M ${x + 144 + wave} ${hy - 206} l 16 -4`} stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f / 2 + i)} />
              </g>
            ) : null}
            <path d={`M ${x - 120} 1940 Q ${x - 120} ${hy + 70} ${x} ${hy + 58} Q ${x + 120} ${hy + 70} ${x + 120} 1940 Z`} fill={col} stroke={INK} strokeWidth={6} />
            <circle cx={x} cy={hy} r={58} fill={HAIRS[i % HAIRS.length]} stroke={INK} strokeWidth={6} />
            <ellipse cx={x - 58} cy={hy + 6} rx={11} ry={17} fill={SKIN} stroke={INK} strokeWidth={4} />
            <ellipse cx={x + 58} cy={hy + 6} rx={11} ry={17} fill={SKIN} stroke={INK} strokeWidth={4} />
            <HatOn kind={i % 4} x={x} y={hy - 4} r={58} col={i % 4 === 2 ? "#E6D2A8" : "#2A2420"} />
          </g>
        );
      })}
    </g>
  );
};

// the audience facing us, gasping and leaning back (snakes shot)
const CrowdFront: React.FC<{ f: number; y0: number; gasp: number }> = ({ f, y0, gasp }) => {
  const xs = [80, 250, 420, 600, 780, 960];
  return (
    <g>
      {xs.map((x, i) => {
        const hy = y0 + (i % 2) * 50 + random(`cf${i}`) * 20;
        const lean = gasp * (i % 2 ? 7 : -7) + Math.sin(f / 9 + i) * 1.5;
        const col = COATS[(i + 3) % COATS.length];
        const o = 0.25 + gasp * 0.75;
        return (
          <g key={i} transform={`rotate(${lean} ${x} 1920) translate(0 ${gasp * 14})`}>
            <path d={`M ${x - 118} 1940 Q ${x - 118} ${hy + 72} ${x} ${hy + 60} Q ${x + 118} ${hy + 72} ${x + 118} 1940 Z`} fill={col} stroke={INK} strokeWidth={6} />
            <path d={`M ${x - 26} ${hy + 64} L ${x} ${hy + 110} L ${x + 26} ${hy + 64} Z`} fill={CANVAS} stroke={INK} strokeWidth={4} />
            <circle cx={x} cy={hy} r={58} fill={SKIN} stroke={INK} strokeWidth={6} />
            <ellipse cx={x - 20} cy={hy - 10} rx={8 + gasp * 3} ry={10 + gasp * 5} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
            <ellipse cx={x + 20} cy={hy - 10} rx={8 + gasp * 3} ry={10 + gasp * 5} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
            <circle cx={x - 20} cy={hy - 10} r={4.5} fill={INK} />
            <circle cx={x + 20} cy={hy - 10} r={4.5} fill={INK} />
            <path d={`M ${x - 34} ${hy - 36 - gasp * 8} Q ${x - 20} ${hy - 44 - gasp * 8} ${x - 8} ${hy - 36 - gasp * 8} M ${x + 8} ${hy - 36 - gasp * 8} Q ${x + 20} ${hy - 44 - gasp * 8} ${x + 34} ${hy - 36 - gasp * 8}`} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
            <ellipse cx={x} cy={hy + 26} rx={9 + 6 * o} ry={6 + 14 * o} fill="#5A1A14" stroke={INK} strokeWidth={4} />
            <HatOn kind={(i + 1) % 4} x={x} y={hy - 10} r={58} col={(i + 1) % 4 === 2 ? "#E6D2A8" : "#2A2420"} />
          </g>
        );
      })}
    </g>
  );
};

// government chemist (Bureau of Chemistry), waist-up behind the bench. Origin = bench line, body centre.
const Chemist: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const lift = Math.sin(f / 9) * 6;
  const tube = `M 112 -250 Q 210 -280 196 ${-420 + lift}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -150 0 Q -160 -200 -116 -276 Q 0 -306 116 -276 Q 160 -200 150 0 Z" fill="#F6F6F2" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -290 L 0 -200 L 40 -290" stroke={INK} strokeWidth={5} fill="#DDE6EE" strokeLinejoin="round" />
      <path d="M 0 -270 L -12 -210 L 0 -150 L 12 -210 Z" fill={C.navy} stroke={INK} strokeWidth={4} />
      <path d="M -60 -290 L -20 -150 M 60 -290 L 20 -150" stroke="#C9CCD2" strokeWidth={6} />
      <rect x={-120} y={-120} width={70} height={60} fill="none" stroke="#C9CCD2" strokeWidth={5} />
      <rect x={-20} y={-334} width={40} height={40} fill={SKIN} stroke={INK} strokeWidth={5} />
      <ellipse cx={0} cy={-392} rx={70} ry={80} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -70 -410 Q -86 -380 -64 -350 M 70 -410 Q 86 -380 64 -350" stroke="#9A9690" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M -40 -462 Q 0 -476 40 -462" stroke={SKIN_D} strokeWidth={4} fill="none" />
      {[-28, 28].map((ex) => (
        <g key={ex}>
          <circle cx={ex} cy={-398} r={24} fill="#EAF4FF" stroke={INK} strokeWidth={5} />
          <circle cx={ex + 2} cy={-398} r={6} fill={INK} />
          <path d={`M ${ex - 12} ${-410} L ${ex - 4} ${-418}`} stroke="#FFFFFF" strokeWidth={4} />
        </g>
      ))}
      <path d="M -4 -398 L 4 -398" stroke={INK} strokeWidth={5} />
      <path d="M -26 -352 Q 0 -364 26 -352" stroke="#9A9690" strokeWidth={10} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-336} rx={9} ry={7} fill="#7A1E18" stroke={INK} strokeWidth={3} />
      <path d={tube} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" />
      <path d={tube} stroke="#F6F6F2" strokeWidth={38} fill="none" strokeLinecap="round" />
      <g transform={`translate(196 ${-430 + lift}) rotate(12)`}>
        <rect x={-16} y={-150} width={32} height={150} rx={16} fill="#EAF4FF" stroke={INK} strokeWidth={5} />
        <rect x={-11} y={-80} width={22} height={74} rx={10} fill={GLASS_HI} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={(k - 1) * 5} cy={-90 - ((f * 2 + k * 20) % 50)} r={4} fill="#FFFFFF" opacity={0.8} />
        ))}
      </g>
      <circle cx={196} cy={-420 + lift} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// ingredient icons for the lab cards
const Ingredient: React.FC<{ kind: string }> = ({ kind }) => {
  if (kind === "oil")
    return (
      <g>
        <path d="M 0 -50 Q 34 -6 34 18 Q 34 50 0 50 Q -34 50 -34 18 Q -34 -6 0 -50 Z" fill="#E8C04A" stroke={INK} strokeWidth={6} />
        <path d="M -14 10 Q -16 30 0 36" stroke="#FFF3C0" strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    );
  if (kind === "fat")
    return (
      <g>
        <path d="M -48 -20 Q -40 -48 0 -44 Q 44 -48 50 -10 Q 54 30 10 40 Q -40 46 -50 14 Z" fill="#F4F0E2" stroke={INK} strokeWidth={6} />
        <path d="M -30 -10 Q -10 -24 14 -14 M -20 14 Q 4 4 28 16" stroke="#E7B9A8" strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    );
  if (kind === "pepper")
    return (
      <g transform="rotate(-30)">
        <path d="M -44 -6 Q -40 -26 -14 -24 Q 30 -22 52 20 Q 8 10 -30 16 Q -46 12 -44 -6 Z" fill="#D7322A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -44 -10 Q -60 -20 -58 -40" stroke="#3E7A2E" strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -24 -12 Q 0 -14 20 -2" stroke="#FF8A7A" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    );
  return (
    <g>
      <rect x={-30} y={-40} width={60} height={84} rx={8} fill="#7FA36A" stroke={INK} strokeWidth={6} />
      <path d="M 0 -30 L -18 0 L -8 0 L -22 24 L 22 24 L 8 0 L 18 0 Z" fill="#2E5A2A" />
      <rect x={-12} y={-54} width={24} height={16} fill="#9A9690" stroke={INK} strokeWidth={4} />
    </g>
  );
};

// shopping cart with a snake-oil bottle in it (today)
const Cart: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <OilBottle x={-10} y={-80} s={0.9} rot={-14} />
    <SnakeBody d={`M 80 -110 Q 150 -150 140 ${-210 + Math.sin(f / 5) * 10}`} w={18} />
    <Rattle x={140} y={-214 + Math.sin(f / 5) * 10} rot={180} s={0.7} f={f} />
    <path d="M -230 -250 L -190 -250 L -150 -20 L 150 -20 L 190 -180 L -168 -180" stroke={INK} strokeWidth={22} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M -230 -250 L -190 -250 L -150 -20 L 150 -20 L 190 -180 L -168 -180" stroke="#C9CCD2" strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    {[-90, -20, 50, 120].map((gx) => (
      <path key={gx} d={`M ${gx} -178 L ${gx - 8} -22`} stroke="#9AA0AA" strokeWidth={8} />
    ))}
    <path d="M -162 -100 L 170 -100" stroke="#9AA0AA" strokeWidth={8} />
    {[-110, 110].map((wx) => (
      <circle key={wx} cx={wx} cy={20} r={28} fill="#2B2F45" stroke={INK} strokeWidth={6} />
    ))}
  </g>
);

const CARDS: [string, string, string][] = [
  ["oil", "MINERAL OIL", ""],
  ["fat", "BEEF FAT", "(PROBABLY)"],
  ["pepper", "CHILI PEPPER", ""],
  ["turp", "TURPENTINE", "(A TRACE)"],
];

export const SnakeOil65: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "stage";
  const float: string[] = v.float ?? [];
  let sky: Sky = "dawn";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  const ansF = Math.round((v.answerAt ?? 0.42) * dur);

  if (mode === "stage") {
    // frame 0: the huckster on the back of his painted wagon, bottle held high and glowing, snake on his arm, crowd below
    body = (
      <>
        <circle cx={540} cy={900} r={420} fill={GLOW} opacity={0.22} />
        <WagonWheel x={140} y={1860} r={170} f={f} />
        <WagonWheel x={950} y={1860} r={170} f={f} />
        <Wagon f={f} y={1690} />
        <Bunting x0={30} x1={1050} y={864} sag={46} n={14} f={f} />
        <Huckster x={400} y={1700} s={1.48} f={f} raise={1} shine={0.65 + 0.35 * Math.sin(f / 5)} />
        <CrowdBack f={f} y0={1748} coins={[1, 6]} />
      </>
    );
  } else if (mode === "snakes") {
    // night show under the lanterns: he hoists a rattlesnake, more rise from a crate, the front row gasps
    sky = "night";
    const gaspAt = (v.gaspAt ?? 0.45) * dur;
    const gasp = ease(f, gaspAt, gaspAt + 6);
    body = (
      <>
        <Tent y0={640} y1={1700} dark={0.32} />
        <Lanterns x0={-20} x1={1100} y={690} n={7} f={f} />
        <rect x={-10} y={1640} width={1100} height={140} fill={WOOD_HI} stroke={INK} strokeWidth={7} />
        {[0, 1, 2].map((k) => {
          const rise = popIn(f, 4 + k * 6, 14);
          const bx = 660 + k * 110;
          const sw = Math.sin(f / 7 + k * 2) * 26;
          const top = 1440 - 270 * rise;
          return (
            <g key={k}>
              <SnakeBody d={`M ${bx} 1470 Q ${bx - 50 + sw} ${1440 - 150 * rise} ${bx + 10 + sw} ${top}`} w={24} />
              <SnakeHead x={bx + 14 + sw} y={top - 8} rot={-80 + sw * 0.6} s={1.0} f={f + k * 5} />
            </g>
          );
        })}
        <g>
          <path d="M 590 1440 L 600 1300 L 970 1340 L 960 1440 Z" fill={WOOD_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <rect x={590} y={1440} width={380} height={210} fill={WOOD} stroke={INK} strokeWidth={7} />
          {[1500, 1560, 1620].map((py) => (
            <path key={py} d={`M 594 ${py} L 966 ${py}`} stroke={WOOD_D} strokeWidth={5} />
          ))}
          <rect x={620} y={1488} width={320} height={80} fill={CANVAS} stroke={INK} strokeWidth={5} />
          <text x={780} y={1544} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={COAT_D} textLength={290} lengthAdjust="spacingAndGlyphs">
            RATTLESNAKES!
          </text>
        </g>
        <Huckster x={290} y={1690} s={1.38} f={f} raise={1} hold="snake" armSnake={false} />
        <CrowdFront f={f} y0={1790} gasp={gasp} />
        <Burst x={810} y={1010} p={popIn(f, gaspAt, 7) * 0.62} text="GASP!" rot={8} size={92} col={C.cream} />
      </>
    );
  } else if (mode === "pitch") {
    // daytime pitch in front of the striped tent: he thrusts the bottle at you, cures pop up, price tag swings in
    sky = "day";
    const priceAt = (v.priceAt ?? 0.75) * dur;
    const pp = popIn(f, priceAt, 8);
    body = (
      <>
        <Tent y0={500} y1={1620} />
        <rect x={-10} y={1560} width={1100} height={380} fill={WOOD} stroke={INK} strokeWidth={7} />
        <path d="M -10 1560 L 1090 1560 L 1090 1610 Q 1036 1650 982 1610 Q 928 1650 874 1610 Q 820 1650 766 1610 Q 712 1650 658 1610 Q 604 1650 550 1610 Q 496 1650 442 1610 Q 388 1650 334 1610 Q 280 1650 226 1610 Q 172 1650 118 1610 Q 64 1650 10 1610 L -10 1610 Z" fill={STRIPE} stroke={INK} strokeWidth={5} />
        {[
          [720, 1580], [830, 1580], [940, 1580],
          [775, 1445], [885, 1445],
          [830, 1310],
        ].map(([bx, by], i) => (
          <OilBottle key={i} x={bx} y={by} s={0.5} />
        ))}
        <Huckster x={340} y={1960} s={1.75} f={f} raise={0} armSnake={false} shine={0.5 + 0.3 * Math.sin(f / 4)} />
        {pp > 0 ? (
          <g transform={`translate(860 990) rotate(${10 + Math.sin(f / 5) * 6}) scale(${pp})`}>
            <path d="M -110 -20 L -150 -60" stroke={INK} strokeWidth={5} />
            <path d="M -96 -54 L 96 -54 L 96 54 L -96 54 L -130 0 Z" fill={C.cream} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <circle cx={-96} cy={0} r={10} fill={INK} />
            <text x={10} y={30} textAnchor="middle" fontFamily={titleFont} fontSize={84} fill={COAT_D}>
              50¢
            </text>
          </g>
        ) : null}
      </>
    );
  } else if (mode === "lab") {
    // the Bureau of Chemistry tests a bottle: ingredient cards pop in, then a red NO SNAKE! stamp slams down
    sky = "paper";
    const pops: number[] = (v.popAt ?? [0.25, 0.4, 0.55, 0.68]).map((k: number) => k * dur);
    const stampAt = (v.stampAt ?? 0.82) * dur;
    const sp = interpolate(f, [stampAt, stampAt + 5], [0, 1], clamp);
    const shake = f >= stampAt && f < stampAt + 8 ? Math.sin((f - stampAt) * 3) * 10 * (1 - (f - stampAt) / 8) : 0;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1260} fill="#CFE3DA" />
        {new Array(14).fill(0).map((_, i) => (
          <path key={`h${i}`} d={`M 0 ${i * 90} L 1080 ${i * 90}`} stroke="#B5CFC4" strokeWidth={4} />
        ))}
        {new Array(13).fill(0).map((_, i) => (
          <path key={`v${i}`} d={`M ${i * 90} 0 L ${i * 90} 1260`} stroke="#B5CFC4" strokeWidth={4} />
        ))}
        <g transform="translate(250 590) rotate(-2)">
          <rect x={-190} y={-44} width={380} height={88} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
          <text x={0} y={-4} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>
            U.S. BUREAU OF
          </text>
          <text x={0} y={30} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>
            CHEMISTRY
          </text>
        </g>
        <g transform={`translate(${shake} 0)`}>
          <Chemist x={250} y={1262} s={1.2} f={f} />
          <rect x={-10} y={1250} width={1100} height={700} fill={WOOD_HI} stroke={INK} strokeWidth={8} />
          <rect x={-10} y={1250} width={1100} height={26} fill={WOOD} stroke={INK} strokeWidth={6} />
          <OilBottle x={500} y={1262} s={0.95} />
          {CARDS.map(([kind, label, sub], i) => {
            const p = popIn(f, pops[i] ?? 9999, 8);
            if (p <= 0) return null;
            const cy = 540 + i * 150;
            return (
              <g key={kind} transform={`translate(790 ${cy}) rotate(${i % 2 ? 2 : -2}) scale(${p})`}>
                <rect x={-230} y={-68} width={460} height={136} rx={18} fill={i % 2 ? C.mustard : C.cream} stroke={INK} strokeWidth={7} />
                <g transform="translate(-160 0)">
                  <Ingredient kind={kind} />
                </g>
                <text x={-90} y={sub ? 4 : 18} fontFamily={titleFont} fontSize={50} fill={INK} textLength={label.length > 9 ? 290 : undefined} lengthAdjust="spacingAndGlyphs">
                  {label}
                </text>
                {sub ? (
                  <text x={-88} y={46} fontFamily={typeFont} fontSize={30} fill={INK}>
                    {sub}
                  </text>
                ) : null}
              </g>
            );
          })}
          {sp > 0 ? (
            <g transform={`translate(540 1160) rotate(-8) scale(${1 + (1 - sp) * 1.4})`} opacity={sp}>
              <rect x={-360} y={-108} width={720} height={216} rx={22} fill="rgba(244,234,213,0.92)" stroke="#D7322A" strokeWidth={18} />
              <rect x={-336} y={-84} width={672} height={168} rx={14} fill="none" stroke="#D7322A" strokeWidth={6} />
              <text x={0} y={48} textAnchor="middle" fontFamily={titleFont} fontSize={136} fill="#D7322A" textLength={600} lengthAdjust="spacingAndGlyphs">
                NO SNAKE!
              </text>
            </g>
          ) : null}
        </g>
      </>
    );
  }
  else if (mode === "today") {
    // the old bottle glowing on a sunburst → flash → today: a flashing BLACK FRIDAY "miracle deal" with the same bottle,
    // a countdown, ADD TO CART – and the bottle already in your cart, a rattle sticking out
    if (f < ansF) {
      sky = "paper";
      const spin = f / 3;
      body = (
        <>
          <g transform="translate(540 1200)">
            {new Array(16).fill(0).map((_, i) => {
              const a = ((i / 16) * 360 + spin) * (Math.PI / 180);
              const b = a + Math.PI / 16;
              return <path key={i} d={`M 0 0 L ${Math.cos(a) * 1400} ${Math.sin(a) * 1400} L ${Math.cos(b) * 1400} ${Math.sin(b) * 1400} Z`} fill={i % 2 ? C.cream : "#F5D58A"} />;
            })}
          </g>
          <OilBottle x={540} y={1640} s={2.2} rot={Math.sin(f / 8) * 3} shine={0.8} />
          <SnakeBody d={`M 380 1660 Q 330 1500 430 1440 Q 560 1380 680 1300 Q 760 1240 700 ${1150 + Math.sin(f / 6) * 10}`} w={30} />
          <SnakeHead x={690} y={1140 + Math.sin(f / 6) * 10} rot={-130} s={1.3} f={f} />
          <Rattle x={380} y={1670} rot={180} s={1.1} f={f} />
        </>
      );
    } else {
      headline = undefined;
      sky = "modern";
      const af = f - ansF;
      const flash = Math.floor(f / 7) % 2 === 0;
      const secs = String(59 - (Math.floor(af / 8) % 60)).padStart(2, "0");
      const btn = 1 + Math.sin(f / 3) * 0.04;
      const ph = popIn(f, ansF + 2, 10);
      body = (
        <>
          <g transform={`translate(540 900) scale(${0.85 + ph * 0.15}) translate(-540 -900)`}>
            <SnakeBody d={`M 1120 1160 Q 980 1120 930 ${1000 + Math.sin(f / 6) * 12} Q 900 940 930 ${880 + Math.sin(f / 6) * 12}`} w={24} />
            <SnakeHead x={934} y={868 + Math.sin(f / 6) * 12} rot={-100} s={1.1} f={f} />
            <rect x={190} y={540} width={700} height={712} rx={46} fill="#0E1426" stroke={INK} strokeWidth={10} />
            <rect x={214} y={564} width={652} height={664} rx={26} fill="#FFF8EC" />
            <rect x={214} y={564} width={652} height={112} rx={26} fill={flash ? "#E2483A" : INK} />
            <rect x={214} y={640} width={652} height={36} fill={flash ? "#E2483A" : INK} />
            <text x={540} y={648} textAnchor="middle" fontFamily={titleFont} fontSize={72} fill={flash ? "#FFFFFF" : GOLD} textLength={540} lengthAdjust="spacingAndGlyphs">
              BLACK FRIDAY
            </text>
            <rect x={236} y={700} width={250} height={400} rx={18} fill="#FFFFFF" stroke="#E2DCCB" strokeWidth={4} />
            <OilBottle x={362} y={1080} s={1.15} shine={0.45 + 0.25 * Math.sin(f / 4)} />
            <text x={512} y={756} fontFamily={bodyFont} fontWeight={900} fontSize={46} fill={INK}>
              MIRACLE
            </text>
            <text x={512} y={808} fontFamily={bodyFont} fontWeight={900} fontSize={46} fill={INK}>
              CURE-ALL!
            </text>
            <text x={512} y={876} fontFamily={bodyFont} fontWeight={800} fontSize={44} fill="#8A8A8A">
              $99.99
            </text>
            <path d="M 506 862 L 660 862" stroke="#E2483A" strokeWidth={6} />
            <text x={508} y={1000} fontFamily={titleFont} fontSize={120} fill="#E2483A">
              $1
            </text>
            <text x={512} y={1060} fontFamily={bodyFont} fontWeight={800} fontSize={34} fill="#E2483A" opacity={flash ? 1 : 0.35}>
              ONLY 3 LEFT!
            </text>
            <text x={540} y={1136} textAnchor="middle" fontFamily={typeFont} fontSize={32} fill={INK}>
              {`ENDS IN 00:00:${secs}`}
            </text>
            <g transform={`translate(540 1186) scale(${btn})`}>
              <rect x={-230} y={-32} width={460} height={64} rx={32} fill={C.mustard} stroke={INK} strokeWidth={6} />
              <text x={0} y={16} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={40} fill={INK}>
                ADD TO CART
              </text>
            </g>
            <g transform={`translate(800 900) rotate(${12 + Math.sin(f / 5) * 5}) scale(${popIn(f, ansF + 8, 8)})`}>
              <circle r={74} fill={GOLD} stroke={INK} strokeWidth={7} />
              <text x={0} y={16} textAnchor="middle" fontFamily={titleFont} fontSize={48} fill={INK}>
                -99%
              </text>
            </g>
          </g>
          <g transform={`translate(0 ${(1 - popIn(f, ansF + 10, 12)) * 500})`}>
            <Cart x={760} y={1800} s={1.0} f={f} />
          </g>
        </>
      );
      overlay = <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: interpolate(f, [ansF, ansF + 6], [0.9, 0], clamp) }} />;
    }
  }

  return (
    <Backdrop sky={sky} stars={mode === "snakes"} moon={false} fog={false}>
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
      {v.tag && !(mode === "today" && f >= ansF) ? <Tag text={v.tag} x={v.tagX ?? 540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
