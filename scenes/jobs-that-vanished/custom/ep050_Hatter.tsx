import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep050 Hatter (mercury felt maker) – a hatter in a tall top hat brushes an orange mercury solution onto rabbit fur
// ("carroting"), steams it and breathes the vapour; his hands shake ("Danbury shakes"); bosses blamed booze; and a century
// later the mercury is still in Danbury's river mud.
// Our own generic hatter – NOT the Tenniel/Disney Mad Hatter (no oversized hat with price card, no tea party).
// visual: { mode: "vat" | "brush" | "shakes" | "booze" | "phrase" | "river", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, breatheAt? (brush), revealAt? (booze),
//           bubbleAt? (phrase), answer?, answerAccent?, answerAt? (river), float2?, float2At? (after the answer) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2B88E";
const SKIN_D = "#D9946A";
const BLUSH = "#F07A6A";
const HAIR = "#6A4428";
const HAT = "#2B2622";
const HAT_HI = "#4A423B";
const BAND = "#C2412F";
const SHIRT = "#F7F0E0";
const VEST = "#3F6B4E";
const VEST_D = "#2B4C37";
const APRON = "#C98B4E";
const APRON_D = "#9E6532";
const SCARF = "#D8372B";
const WOOD = "#9A6738";
const WOOD_D = "#6B4422";
const WALL = "#F0C27E";
const WALL_D = "#DDA65E";
const ORANGE = "#F2862B";
const ORANGE_HI = "#FFC07A";
const FUR = "#A8988A";
const FUR_D = "#7C6D60";
const VAPOUR = "#CFC6F2";
const SILVER = "#D9DEE6";
const SILVER_D = "#8E97A6";
const GOLD = "#F2B544";

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side = "alt" }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || (side !== "right" && i % 2 === 0);
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 64, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// two-part arm: shirt sleeve to the elbow, bare forearm (sleeves rolled up)
const Arm: React.FC<{ a: P; b: P; c: P; sleeve?: string; skin?: string }> = ({ a, b, c, sleeve = SHIRT, skin = SKIN }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={76} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={sleeve} strokeWidth={62} fill="none" strokeLinecap="round" />
    <path d={`M ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={62} fill="none" strokeLinecap="round" />
    <path d={`M ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`} stroke={skin} strokeWidth={48} fill="none" strokeLinecap="round" />
    <circle cx={b[0]} cy={b[1]} r={38} fill={sleeve} stroke={INK} strokeWidth={7} />
  </g>
);
const elbowOf = (sh: P, hand: P, out: number): P => [(sh[0] + hand[0]) / 2 + out, Math.max(sh[1], hand[1]) + 60];

// tremor: a fast, irregular jitter (the "hatter's shakes")
const tremor = (f: number, amp: number, k = 0): P => [Math.sin(f * 1.7 + k) * amp + Math.sin(f * 2.9 + k * 2) * amp * 0.5, Math.cos(f * 2.3 + k) * amp * 0.6];

// the tall felt top hat (head centre = (0,-545)); also used on its own (brim centre at origin when standalone)
export const TopHat: React.FC<{ y?: number; tilt?: number; s?: number; x?: number }> = ({ y = -660, tilt = -4, s = 1, x = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
    <path d="M -116 -8 L -128 -330 Q 0 -352 128 -330 L 116 -8 Z" fill={HAT} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -84 -30 L -92 -310" stroke={HAT_HI} strokeWidth={22} strokeLinecap="round" />
    <ellipse cx={0} cy={-332} rx={128} ry={22} fill={HAT_HI} stroke={INK} strokeWidth={8} />
    <path d="M -117 -14 L -120 -76 Q 0 -94 120 -76 L 117 -14 Q 0 -32 -117 -14 Z" fill={BAND} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -178 6 Q -170 -26 -116 -20 Q 0 -36 116 -20 Q 170 -26 178 6 Q 150 30 0 30 Q -150 30 -178 6 Z" fill={HAT} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
  </g>
);

export type HFace = "strain" | "inhale" | "worry" | "snap" | "sad" | "grin";
const HHead: React.FC<{ f: number; face?: HFace; sweat?: boolean; flush?: number }> = ({ f, face = "strain", sweat = false, flush = 0 }) => {
  const eye = (k: number) => {
    const x = k * 36;
    if (face === "inhale") return <path key={k} d={`M ${x - 20} -556 Q ${x} -544 ${x + 20} -556`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    if (face === "grin") return <path key={k} d={`M ${x - 20} -552 Q ${x} -572 ${x + 20} -552`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    const big = face === "worry" || face === "strain";
    return (
      <g key={k}>
        <circle cx={x} cy={-556} r={big ? 21 : 18} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <circle cx={x + (face === "snap" ? -k * 3 : 0)} cy={-553} r={9} fill={INK} />
      </g>
    );
  };
  const brows =
    face === "snap"
      ? "M -60 -600 L -14 -584 M 60 -600 L 14 -584"
      : face === "worry" || face === "sad"
        ? "M -60 -590 Q -36 -606 -14 -600 M 60 -590 Q 36 -606 14 -600"
        : face === "strain"
          ? "M -60 -598 Q -36 -610 -14 -596 M 60 -598 Q 36 -610 14 -596"
          : "M -58 -594 Q -36 -608 -14 -596 M 58 -594 Q 36 -608 14 -596";
  return (
    <g>
      {/* ears */}
      <ellipse cx={-96} cy={-540} rx={20} ry={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      <ellipse cx={96} cy={-540} rx={20} ry={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -94 -580 Q -100 -470 -40 -446 Q 0 -432 40 -446 Q 100 -470 94 -580 Q 92 -648 0 -650 Q -92 -648 -94 -580 Z" fill={SKIN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -94 -580 Q -100 -470 -40 -446 Q 0 -432 40 -446 Q 100 -470 94 -580 Q 92 -648 0 -650 Q -92 -648 -94 -580 Z" fill="#E0473A" opacity={flush} />
      {/* mutton-chop sideburns */}
      <path d="M -94 -600 Q -108 -500 -60 -470 Q -66 -530 -70 -600 Z M 94 -600 Q 108 -500 60 -470 Q 66 -530 70 -600 Z" fill={HAIR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={-52} cy={-506} r={18} fill={BLUSH} opacity={0.4} />
      <circle cx={52} cy={-506} r={18} fill={BLUSH} opacity={0.4} />
      <path d={brows} stroke={HAIR} strokeWidth={10} fill="none" strokeLinecap="round" />
      {[-1, 1].map(eye)}
      <path d="M 0 -548 Q -16 -512 4 -504" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* moustache */}
      <path d="M -4 -500 Q -44 -508 -62 -484 Q -36 -492 -4 -488 Z M 4 -500 Q 44 -508 62 -484 Q 36 -492 4 -488 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      {face === "inhale" ? <ellipse cx={0} cy={-466} rx={16} ry={20} fill="#7A2A26" stroke={INK} strokeWidth={5} /> : null}
      {face === "strain" ? <path d="M -30 -468 L 30 -468" stroke={INK} strokeWidth={8} strokeLinecap="round" /> : null}
      {face === "worry" || face === "sad" ? <path d={`M -30 -460 Q 0 ${-480 + Math.sin(f * 2.1) * 4} 30 -460`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" /> : null}
      {face === "snap" ? <path d="M -36 -476 L 36 -476 L 30 -456 L -30 -456 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
      {face === "grin" ? <path d="M -40 -478 Q 0 -440 40 -478 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
      {sweat
        ? [0, 1].map((k) => {
            const p = ((f + k * 11) % 22) / 22;
            return <path key={k} transform={`translate(${k ? 104 : -110} ${-600 + p * 70})`} d="M 0 -18 Q 12 0 0 10 Q -12 0 0 -18 Z" fill="#9ED3F0" stroke={INK} strokeWidth={4} opacity={1 - p * 0.6} />;
          })
        : null}
    </g>
  );
};

// The hatter. Origin = belt centre. R = viewer-left arm, L = viewer-right arm. shake = tremor amplitude of the hands.
const SH_R: P = [-140, -404];
const SH_L: P = [140, -404];
export const Hatter: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  handR?: P;
  elbowR?: P;
  handL?: P;
  elbowL?: P;
  face?: HFace;
  shake?: number;
  lean?: number;
  sweat?: boolean;
  flush?: number;
  hat?: boolean;
  legs?: boolean;
  propR?: React.ReactNode; // drawn at the viewer-left hand (local coords, hand = origin)
  propL?: React.ReactNode; // drawn at the viewer-right hand
  children?: React.ReactNode; // behind the hands
  front?: React.ReactNode; // global coords, drawn over the body but under the arms
}> = ({ x, y, s = 1, f, handR = [-230, -150], elbowR, handL = [230, -150], elbowL, face = "strain", shake = 0, lean = 0, sweat = false, flush = 0, hat = true, legs = false, propR, propL, children, front }) => {
  const breathe = Math.sin(f / 10) * 3;
  const tR = tremor(f, shake, 0);
  const tL = tremor(f, shake, 1.3);
  const hR: P = [handR[0] + tR[0], handR[1] + tR[1]];
  const hL: P = [handL[0] + tL[0], handL[1] + tL[1]];
  const eR = elbowR ?? elbowOf(SH_R, hR, -50);
  const eL = elbowL ?? elbowOf(SH_L, hL, 50);
  const headShake = shake > 0 ? Math.sin(f * 2.2) * shake * 0.12 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {legs ? (
        <g>
          <path d="M -110 0 L -120 560 L -20 560 L 0 120 L 20 560 L 120 560 L 110 0 Z" fill="#4A4038" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <ellipse cx={-80} cy={570} rx={70} ry={26} fill={INK} />
          <ellipse cx={80} cy={570} rx={70} ry={26} fill={INK} />
        </g>
      ) : null}
      <g transform={`rotate(${lean} 0 0) translate(0 ${breathe})`}>
        {/* torso: shirt, waistcoat, leather apron */}
        <rect x={-38} y={-470} width={76} height={70} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -150 -420 Q 0 -450 150 -420 L 132 20 L -132 20 Z" fill={SHIRT} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -128 -410 Q -70 -432 -26 -436 L 0 -300 L 0 10 L -124 10 Z" fill={VEST} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 128 -410 Q 70 -432 26 -436 L 0 -300 L 0 10 L 124 10 Z" fill={VEST} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -90 -380 L -60 -200 M 90 -380 L 60 -200" stroke={VEST_D} strokeWidth={8} strokeLinecap="round" />
        {[-250, -180, -110].map((k) => (
          <circle key={k} cx={12} cy={k} r={9} fill={GOLD} stroke={INK} strokeWidth={4} />
        ))}
        {/* watch chain */}
        <path d="M 12 -110 Q 60 -80 100 -120" stroke={GOLD} strokeWidth={6} fill="none" />
        {/* apron */}
        <path d="M -120 -150 L 120 -150 L 150 330 L -150 330 Z" fill={APRON} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -100 -150 L -120 -420 M 100 -150 L 120 -420" stroke={APRON_D} strokeWidth={12} strokeLinecap="round" />
        <path d="M -90 60 L 90 60" stroke={APRON_D} strokeWidth={6} />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${-60 + k * 50} ${120 + (k % 2) * 40} q 10 20 0 40`} stroke={ORANGE} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
        ))}
        {/* neckerchief */}
        <path d="M -60 -452 Q 0 -420 60 -452 L 40 -404 Q 0 -390 -40 -404 Z" fill={SCARF} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -10 -410 L -40 -340 L 4 -360 L 30 -330 L 20 -410 Z" fill={SCARF} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <g transform={`rotate(${headShake} 0 -460)`}>
          <HHead f={f} face={face} sweat={sweat} flush={flush} />
          {hat ? <TopHat /> : null}
        </g>
        {children}
      </g>
      {/* "front" = things between the body and the hands (bench, pelt…), in GLOBAL coordinates */}
      {front ? <g transform={`scale(${1 / s}) translate(${-x} ${-y})`}>{front}</g> : null}
      <g transform={`rotate(${lean} 0 0) translate(0 ${breathe})`}>
        <Arm a={SH_L} b={eL} c={hL} />
        <Arm a={SH_R} b={eR} c={hR} />
        {propR ? <g transform={`translate(${hR[0]} ${hR[1]})`}>{propR}</g> : null}
        {propL ? <g transform={`translate(${hL[0]} ${hL[1]})`}>{propL}</g> : null}
        <circle cx={hR[0]} cy={hR[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        <circle cx={hL[0]} cy={hL[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        {shake > 0
          ? [hR, hL].map((h, k) => (
              <g key={k} opacity={0.85}>
                <path d={`M ${h[0] - 62} ${h[1] - 20} q -12 20 0 40`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
                <path d={`M ${h[0] + 62} ${h[1] - 20} q 12 20 0 40`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
              </g>
            ))
          : null}
      </g>
    </g>
  );
};

// brush held at the hand (origin), pointing along `ang` degrees; bristles soaked in the orange mercury solution
const Brush: React.FC<{ ang?: number; f: number; s?: number }> = ({ ang = 70, f, s = 1 }) => (
  <g transform={`rotate(${ang}) scale(${s})`}>
    <path d="M -50 0 L 120 0" stroke={INK} strokeWidth={30} strokeLinecap="round" />
    <path d="M -50 0 L 120 0" stroke={WOOD} strokeWidth={18} strokeLinecap="round" />
    <rect x={112} y={-26} width={40} height={52} rx={6} fill={SILVER} stroke={INK} strokeWidth={6} />
    <path d="M 150 -30 L 230 -36 L 236 36 L 150 30 Z" fill={ORANGE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 160 -18 L 228 -20 M 160 0 L 232 0 M 160 18 L 228 20" stroke="#B85A12" strokeWidth={4} />
    {[0, 1].map((k) => {
      const p = ((f + k * 9) % 18) / 18;
      return <circle key={k} cx={236 + p * 30} cy={(k ? 18 : -10) + p * 4} r={9 * (1 - p * 0.5)} fill={ORANGE} stroke={INK} strokeWidth={3} opacity={1 - p} />;
    })}
  </g>
);

// a flattened rabbit pelt on the bench; carrot = 0..1 how much of it has turned orange
const Pelt: React.FC<{ x: number; y: number; s?: number; carrot?: number; f: number }> = ({ x, y, s = 1, carrot = 0, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={220} ry={70} fill={FUR} stroke={INK} strokeWidth={7} />
    {new Array(18).fill(0).map((_, k) => {
      const a = (k / 18) * Math.PI * 2;
      const px = Math.cos(a) * 214;
      const py = Math.sin(a) * 66;
      return <path key={k} d={`M ${px} ${py} l ${Math.cos(a) * 26} ${Math.sin(a) * 18 + Math.sin(f / 6 + k) * 3}`} stroke={FUR_D} strokeWidth={9} strokeLinecap="round" />;
    })}
    {/* ears at one end */}
    <path d="M 200 -30 Q 280 -90 300 -40 Q 260 -20 210 -10 Z M 200 20 Q 290 40 290 80 Q 240 70 205 34 Z" fill={FUR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {carrot > 0 ? <ellipse cx={-40 + carrot * 40} cy={0} rx={60 + carrot * 150} ry={22 + carrot * 44} fill={ORANGE} opacity={0.85} /> : null}
    {carrot > 0 ? <ellipse cx={-60 + carrot * 30} cy={-14} rx={20 + carrot * 70} ry={8 + carrot * 12} fill={ORANGE_HI} opacity={0.7} /> : null}
    <path d="M -150 -20 q 20 -10 40 0 M -40 24 q 20 -10 40 0 M 60 -24 q 20 -10 40 0" stroke={FUR_D} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);

// basin of orange mercury-nitrate solution (rim centre at origin)
const Basin: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 L -120 150 Q 0 176 120 150 L 150 0 Z" fill="#B7BCC6" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={150} ry={34} fill="#8E97A6" stroke={INK} strokeWidth={8} />
    <ellipse cx={0} cy={6} rx={128} ry={24} fill={ORANGE} />
    <ellipse cx={-30 + Math.sin(f / 7) * 20} cy={2} rx={46} ry={8} fill={ORANGE_HI} opacity={0.8} />
    <path d="M -100 60 L -90 130" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.6} />
    <text x={0} y={110} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK}>Hg</text>
  </g>
);

// curling vapour wisps rising from (x,y) towards (tx,ty)
const Vapour: React.FC<{ x: number; y: number; tx: number; ty: number; f: number; n?: number; w?: number; col?: string; speed?: number }> = ({ x, y, tx, ty, f, n = 5, w = 16, col = VAPOUR, speed = 30 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const p = ((f + (k * speed) / n) % speed) / speed;
      const cx = x + (tx - x) * p + Math.sin(p * 9 + k) * 40;
      const cy = y + (ty - y) * p;
      const r = 34 + p * 46;
      const d = `M ${cx - r} ${cy} q ${r * 0.5} ${-r} ${r} 0 q ${r * 0.5} ${r} ${r} 0 q ${r * 0.3} ${-r * 0.7} ${-r * 0.2} ${-r * 1.1}`;
      const o = Math.sin(p * Math.PI) * 0.95;
      return (
        <g key={k} opacity={o}>
          <path d={d} stroke={INK} strokeWidth={w + 8} fill="none" strokeLinecap="round" opacity={0.35} />
          <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

// workshop: warm plank wall, sunny window, shelf of wooden hat blocks and finished top hats, steaming kettle on a stove
const Shop: React.FC<{ f: number; floor?: number; stove?: boolean }> = ({ f, floor = 1920, stove = true }) => (
  <g>
    <rect x={0} y={0} width={1080} height={floor} fill={WALL} />
    {new Array(9).fill(0).map((_, k) => (
      <path key={k} d={`M ${k * 130 + 40} 0 L ${k * 130 + 40} ${floor}`} stroke={WALL_D} strokeWidth={6} />
    ))}
    {/* window with light beam */}
    <rect x={60} y={520} width={260} height={360} fill="#BFE6F2" stroke={INK} strokeWidth={9} />
    <path d="M 190 520 L 190 880 M 60 700 L 320 700" stroke={INK} strokeWidth={8} />
    <path d="M 90 540 L 160 680" stroke="#FFFFFF" strokeWidth={12} opacity={0.7} strokeLinecap="round" />
    <path d="M 320 540 L 700 1500 L 1000 1500 L 320 880 Z" fill="#FFF3C4" opacity={0.25} />
    {/* shelf with hat blocks + hats */}
    <rect x={560} y={760} width={500} height={26} fill={WOOD} stroke={INK} strokeWidth={6} />
    {[640, 770, 900, 1010].map((hx, i) =>
      i % 2 ? (
        <TopHat key={hx} x={hx} y={760} s={0.42} tilt={0} />
      ) : (
        <path key={hx} d={`M ${hx - 54} 760 L ${hx - 54} 700 Q ${hx} 630 ${hx + 54} 700 L ${hx + 54} 760 Z`} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      ),
    )}
    {stove ? (
      <g transform="translate(900 1280)">
        <rect x={-110} y={-120} width={220} height={240} rx={14} fill="#3A3330" stroke={INK} strokeWidth={8} />
        <rect x={-70} y={-40} width={140} height={80} rx={10} fill="#E8622A" opacity={0.6 + Math.sin(f / 3) * 0.2} />
        <path d="M -60 -120 L -60 -220 Q 0 -260 60 -220 L 60 -120 Z" fill="#7E8C99" stroke={INK} strokeWidth={7} />
        <path d="M 60 -200 L 120 -240" stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <Vapour x={120} y={-250} tx={40} ty={-700} f={f} n={3} w={14} col="#FFFFFF" speed={36} />
      </g>
    ) : null}
  </g>
);

// comic "alarm" burst: slowly turning mustard/cream rays (for the shakes close-up)
const Burst: React.FC<{ f: number; cx: number; cy: number }> = ({ f, cx, cy }) => (
  <g>
    <rect x={0} y={0} width={1080} height={1920} fill={C.mustard} />
    <g transform={`translate(${cx} ${cy}) rotate(${f * 0.6})`}>
      {new Array(16).fill(0).map((_, k) => {
        const a0 = (k / 16) * Math.PI * 2;
        const a1 = a0 + Math.PI / 16;
        return <path key={k} d={`M 0 0 L ${Math.cos(a0) * 2000} ${Math.sin(a0) * 2000} L ${Math.cos(a1) * 2000} ${Math.sin(a1) * 2000} Z`} fill="#FFE3A3" />;
      })}
    </g>
    <circle cx={cx} cy={cy} r={520} fill="#FFF3D6" opacity={0.5} />
  </g>
);

// workbench front (top edge at y)
const Bench: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-20} y={y} width={1120} height={1920 - y} fill={WOOD} stroke={INK} strokeWidth={8} />
    <rect x={-20} y={y - 14} width={1120} height={34} fill={WOOD_D} stroke={INK} strokeWidth={7} />
    {[0, 1, 2, 3].map((k) => (
      <path key={k} d={`M -20 ${y + 80 + k * 110} L 1100 ${y + 80 + k * 110}`} stroke={WOOD_D} strokeWidth={6} />
    ))}
  </g>
);

// factory boss in a bowler and grey suit, pointing (origin = belt centre, facing left)
const Boss: React.FC<{ x: number; y: number; s?: number; f: number; point?: P; shock?: boolean }> = ({ x, y, s = 1, f, point = [-330, -380], shock = false }) => {
  const jab = Math.sin(f / 2.2) * 10;
  const hand: P = [point[0] + jab, point[1]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -150 -420 Q 0 -450 150 -420 L 140 30 L -140 30 Z" fill="#6E7280" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -50 -440 L 0 -280 L 50 -440 Z" fill={SHIRT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -14 -420 L 14 -420 L 20 -320 L 0 -290 L -20 -320 Z" fill="#2B3446" stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-200} r={10} fill={GOLD} stroke={INK} strokeWidth={4} />
      <circle cx={0} cy={-120} r={10} fill={GOLD} stroke={INK} strokeWidth={4} />
      <path d="M 140 -380 L 210 -150 L 170 -30" stroke={INK} strokeWidth={76} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 140 -380 L 210 -150 L 170 -30" stroke="#6E7280" strokeWidth={62} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={170} cy={-30} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d={`M -140 -390 L ${(-140 + hand[0]) / 2} ${hand[1] + 30} L ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={76} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M -140 -390 L ${(-140 + hand[0]) / 2} ${hand[1] + 30} L ${hand[0]} ${hand[1]}`} stroke="#6E7280" strokeWidth={62} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${hand[0]} ${hand[1]} l -80 -6`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${hand[0]} ${hand[1]} l -80 -6`} stroke={SKIN} strokeWidth={17} strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
      <rect x={-36} y={-470} width={72} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-550} rx={92} ry={100} fill={SKIN} stroke={INK} strokeWidth={8} />
      <path d={shock ? "M -60 -606 Q -36 -620 -14 -604 M 60 -606 Q 36 -620 14 -604" : "M -60 -600 L -14 -582 M 60 -600 L 14 -582"} stroke={INK} strokeWidth={11} strokeLinecap="round" fill="none" />
      <circle cx={-34} cy={-560} r={shock ? 14 : 10} fill={INK} />
      <circle cx={34} cy={-560} r={shock ? 14 : 10} fill={INK} />
      <path d="M 0 -556 Q -16 -520 4 -512" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M -70 -490 Q -36 -516 0 -500 Q 36 -516 70 -490 Q 36 -486 0 -494 Q -36 -486 -70 -490 Z" fill="#3A2A1E" stroke={INK} strokeWidth={4} />
      {shock ? <ellipse cx={0} cy={-470} rx={16} ry={20} fill="#7A2A26" stroke={INK} strokeWidth={5} /> : <path d="M -30 -470 Q 0 -484 30 -470" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
      {/* bowler hat */}
      <path d="M -150 -620 Q 0 -660 150 -620 Q 160 -600 120 -600 Q 0 -630 -120 -600 Q -160 -600 -150 -620 Z" fill="#1E1B18" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -100 -626 Q -100 -760 0 -764 Q 100 -760 100 -626 Z" fill="#1E1B18" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -60 -700 Q -40 -740 0 -744" stroke="#4A423B" strokeWidth={12} fill="none" strokeLinecap="round" />
    </g>
  );
};

// a gin bottle on the bench (origin = base centre); crossed = big red X over it
const Bottle: React.FC<{ x: number; y: number; s?: number; crossed?: number }> = ({ x, y, s = 1, crossed = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 0 L -60 -220 Q -60 -270 -24 -290 L -24 -360 L 24 -360 L 24 -290 Q 60 -270 60 -220 L 60 0 Z" fill="#4E9E5A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-30} y={-390} width={60} height={34} rx={6} fill={WOOD} stroke={INK} strokeWidth={6} />
    <rect x={-50} y={-180} width={100} height={90} rx={8} fill={C.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-118} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={INK}>GIN</text>
    <path d="M -40 -250 L -40 -40" stroke="#FFFFFF" strokeWidth={10} opacity={0.5} strokeLinecap="round" />
    {crossed > 0 ? (
      <g opacity={crossed} transform={`scale(${0.6 + crossed * 0.4})`}>
        <path d="M -120 -330 L 120 30 M 120 -330 L -120 30" stroke={INK} strokeWidth={46} strokeLinecap="round" />
        <path d="M -120 -330 L 120 30 M 120 -330 L -120 30" stroke="#E0302A" strokeWidth={30} strokeLinecap="round" />
      </g>
    ) : null}
  </g>
);

// a big shiny drop of mercury labelled Hg (origin = centre)
const MercuryDrop: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 5) * 8}) scale(${s})`}>
    <path d="M 0 -170 Q 120 -20 110 50 Q 100 140 0 140 Q -100 140 -110 50 Q -120 -20 0 -170 Z" fill={SILVER} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 0 -120 Q 70 -20 66 40 Q 60 100 0 104" stroke={SILVER_D} strokeWidth={16} fill="none" opacity={0.6} />
    <ellipse cx={-46} cy={-10} rx={18} ry={40} fill="#FFFFFF" opacity={0.85} transform="rotate(20 -46 -10)" />
    <text x={0} y={90} textAnchor="middle" fontFamily={titleFont} fontSize={70} fill={INK}>Hg</text>
  </g>
);

// comic speech bubble with a tail pointing down-right (origin = tail tip)
// big speech bubble: body centred at (cx,cy), tail to (tx,ty)
const Say: React.FC<{ cx: number; cy: number; w: number; h: number; tx: number; ty: number; text: string; p: number; size?: number; f: number }> = ({ cx, cy, w, h, tx, ty, text, p, size = 92, f }) =>
  p <= 0 ? null : (
    <g transform={`translate(${cx} ${cy}) scale(${p}) rotate(${Math.sin(f / 4) * 1.5}) translate(${-cx} ${-cy})`}>
      <path d={`M ${cx + (tx < cx ? -0.36 : 0.18) * w} ${cy + h / 2 - 10} L ${tx} ${ty} L ${cx + (tx < cx ? -0.18 : 0.36) * w} ${cy + h / 2 - 10} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={10} strokeLinejoin="round" />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2.4} fill="#FFFFFF" stroke={INK} strokeWidth={10} />
      <path d={`M ${cx + (tx < cx ? -0.36 : 0.18) * w + 10} ${cy + h / 2 - 5} L ${cx + (tx < cx ? -0.18 : 0.36) * w - 10} ${cy + h / 2 - 5}`} stroke="#FFFFFF" strokeWidth={14} />
      <text x={cx} y={cy + size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>{text}</text>
    </g>
  );

// Victorian hat shop front: brick, sign board, display window with hats, open door (right)
const ShopFront: React.FC<{ f: number; top: number; ground: number }> = ({ f, top, ground }) => (
  <g>
    <rect x={0} y={0} width={1080} height={ground} fill="#9FD0E0" />
    {[0, 1].map((k) => (
      <ellipse key={k} cx={((f * 1.2 + k * 520) % 1400) - 160} cy={200 + k * 90} rx={130} ry={40} fill="#FFFFFF" opacity={0.85} />
    ))}
    <rect x={0} y={top} width={1080} height={ground - top} fill={C.brick} />
    {new Array(Math.ceil((ground - top) / 60)).fill(0).map((_, r) => (
      <path key={r} d={`M 0 ${top + r * 60} L 1080 ${top + r * 60}`} stroke={C.brickDark} strokeWidth={5} />
    ))}
    <rect x={40} y={top + 40} width={1000} height={130} rx={10} fill="#2B4C37" stroke={INK} strokeWidth={9} />
    <text x={540} y={top + 138} textAnchor="middle" fontFamily={titleFont} fontSize={100} fill={GOLD} stroke={INK} strokeWidth={4} paintOrder="stroke">HATTER</text>
    {/* window */}
    <rect x={60} y={top + 230} width={460} height={500} fill="#CFE9F2" stroke={INK} strokeWidth={10} />
    <path d={`M 290 ${top + 230} L 290 ${top + 730}`} stroke={INK} strokeWidth={8} />
    <rect x={60} y={top + 640} width={460} height={90} fill={WOOD} stroke={INK} strokeWidth={7} />
    {[170, 400].map((hx) => (
      <g key={hx}>
        <path d={`M ${hx} ${top + 640} L ${hx} ${top + 520}`} stroke={INK} strokeWidth={10} />
        <TopHat x={hx} y={top + 520} s={0.55} tilt={0} />
      </g>
    ))}
    {/* door */}
    <rect x={570} y={top + 230} width={460} height={ground - top - 230} fill="#3B2A1E" stroke={INK} strokeWidth={10} />
    <rect x={600} y={top + 260} width={400} height={ground - top - 260} fill="#F6D9A0" />
    <rect x={0} y={ground} width={1080} height={1920 - ground} fill="#B9AE9C" />
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={8} />
  </g>
);

// river: then (factory pipe pouring orange waste) or today (green bank, angler); cutaway shows the mud
const River: React.FC<{ f: number; water: number; today: boolean }> = ({ f, water, today }) => {
  const mud = 1640;
  return (
    <g>
      <rect x={0} y={0} width={1080} height={water} fill={today ? "#8EC9E8" : "#D9C49C"} />
      {today ? <circle cx={860} cy={260} r={90} fill="#FFE27A" stroke={INK} strokeWidth={6} /> : null}
      {today
        ? [0, 1].map((k) => <ellipse key={k} cx={((f * 1.4 + k * 600) % 1400) - 160} cy={380 + k * 120} rx={140} ry={40} fill="#FFFFFF" opacity={0.9} />)
        : null}
      {today ? (
        <g>
          {/* modern bridge + trees on the far bank */}
          <path d={`M 0 ${water - 260} L 1080 ${water - 260}`} stroke="#5E6670" strokeWidth={30} />
          {[180, 540, 900].map((bx) => (
            <rect key={bx} x={bx - 20} y={water - 260} width={40} height={260} fill="#7A828C" stroke={INK} strokeWidth={5} />
          ))}
          <path d={`M 0 ${water - 290} L 1080 ${water - 290}`} stroke={INK} strokeWidth={6} />
          <rect x={620 + ((f * 6) % 700) - 300} y={water - 330} width={120} height={44} rx={12} fill="#E8402F" stroke={INK} strokeWidth={5} />
          {[40, 300, 760, 1010].map((tx, k) => (
            <g key={tx}>
              <rect x={tx - 12} y={water - 150} width={24} height={150} fill={WOOD_D} />
              <circle cx={tx} cy={water - 170} r={70 + (k % 2) * 20} fill="#5FA55A" stroke={INK} strokeWidth={6} />
            </g>
          ))}
        </g>
      ) : (
        <g>
          {/* old hat factory on the bank with a waste pipe */}
          <rect x={0} y={water - 620} width={560} height={620} fill={C.brick} stroke={INK} strokeWidth={9} />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={40 + c * 130} y={water - 580 + r * 170} width={80} height={110} fill="#F6D9A0" stroke={INK} strokeWidth={6} />),
          )}
          <rect x={430} y={water - 900} width={80} height={300} fill={C.brickDark} stroke={INK} strokeWidth={8} />
          {[0, 1, 2].map((k) => {
            const p = ((f + k * 10) % 30) / 30;
            return <circle key={k} cx={470 + p * 160} cy={water - 930 - p * 200} r={40 + p * 50} fill="#5A524C" opacity={0.7 * (1 - p)} />;
          })}
          <path d={`M 560 ${water - 120} L 660 ${water - 120}`} stroke={INK} strokeWidth={50} />
          <path d={`M 560 ${water - 120} L 660 ${water - 120}`} stroke="#7E8C99" strokeWidth={36} />
          <path d={`M 660 ${water - 120} Q 700 ${water - 110} 690 ${water + 20}`} stroke={ORANGE} strokeWidth={30 + Math.sin(f / 2) * 4} fill="none" />
        </g>
      )}
      {/* bank */}
      {today ? <path d={`M 0 ${water - 10} L 520 ${water - 10} Q 560 ${water + 40} 520 ${water + 60} L 0 ${water + 60} Z`} fill="#6FB25A" stroke={INK} strokeWidth={7} /> : null}
      {/* water + cutaway */}
      <rect x={0} y={water} width={1080} height={mud - water} fill={today ? "#3E8FBF" : "#6E7F6A"} />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M ${-60 + ((f * 3 + k * 400) % 1200)} ${water + 30 + k * 90} q 40 -16 80 0 q 40 16 80 0`} stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.45} />
      ))}
      <path d={`M 0 ${mud} Q 270 ${mud - 30} 540 ${mud} Q 810 ${mud + 30} 1080 ${mud} L 1080 1920 L 0 1920 Z`} fill="#7A5A3A" stroke={INK} strokeWidth={8} />
      {/* mercury beads in the mud */}
      {[[90, 1700], [230, 1780], [380, 1690], [520, 1820], [640, 1720], [790, 1800], [930, 1710], [170, 1870], [700, 1880], [1000, 1860]].map(([bx, by], k) => {
        const glint = (Math.sin(f / 3 + k * 1.7) + 1) / 2;
        return (
          <g key={k}>
            <circle cx={bx} cy={by} r={18 + (k % 3) * 6} fill={SILVER} stroke={INK} strokeWidth={4} />
            <circle cx={bx - 6} cy={by - 6} r={5} fill="#FFFFFF" opacity={0.5 + glint * 0.5} />
          </g>
        );
      })}
      {!today
        ? [0, 1, 2, 3].map((k) => {
            const p = ((f + k * 8) % 32) / 32;
            return <circle key={k} cx={690 + Math.sin(p * 6 + k) * 30 + k * 20} cy={water + 30 + p * (mud - water - 40)} r={12} fill={SILVER} stroke={INK} strokeWidth={3} />;
          })
        : null}
    </g>
  );
};

// small river fish (dace) with silver glints (origin = centre, facing right)
const Fish: React.FC<{ x: number; y: number; s?: number; f: number; flip?: boolean; glint?: boolean }> = ({ x, y, s = 1, f, flip = false, glint = true }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${Math.sin(f / 4) * 6})`}>
    <path d="M -70 0 L -110 -36 L -104 0 L -110 36 Z" fill="#9AA7B0" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={80} ry={30} fill="#B9C4CC" stroke={INK} strokeWidth={6} />
    <path d="M -60 4 L 60 4" stroke="#2C3540" strokeWidth={8} strokeLinecap="round" />
    <circle cx={50} cy={-8} r={7} fill={INK} />
    {glint
      ? [0, 1].map((k) => {
          const g = (Math.sin(f / 2.5 + k * 2) + 1) / 2;
          return <path key={k} transform={`translate(${-20 + k * 40} ${-30 - k * 6}) scale(${0.5 + g * 0.6})`} d="M 0 -20 L 5 -5 L 20 0 L 5 5 L 0 20 L -5 5 L -20 0 L -5 -5 Z" fill="#FFFFFF" stroke={INK} strokeWidth={2} />;
        })
      : null}
  </g>
);

// today's angler (cap + hoodie), holding a rod over the water (origin = belt centre)
const Angler: React.FC<{ x: number; y: number; s?: number; f: number; rodTip: P }> = ({ x, y, s = 1, f, rodTip }) => {
  const hand: P = [140, -260];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -110 0 L -120 520 L -20 520 L 0 120 L 20 520 L 120 520 L 110 0 Z" fill="#3B5A8C" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -150 -420 Q 0 -450 150 -420 L 140 30 L -140 30 Z" fill="#2E9C8C" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -70 -150 L 70 -150 L 60 -60 L -60 -60 Z" fill="#257E71" stroke={INK} strokeWidth={5} />
      <path d={`M 120 -390 L 200 -300 L ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={72} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M 120 -390 L 200 -300 L ${hand[0]} ${hand[1]}`} stroke="#2E9C8C" strokeWidth={58} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M -120 -390 L -40 -250 L ${hand[0] - 70} ${hand[1] + 30}`} stroke={INK} strokeWidth={72} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M -120 -390 L -40 -250 L ${hand[0] - 70} ${hand[1] + 30}`} stroke="#2E9C8C" strokeWidth={58} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${hand[0] - 90} ${hand[1] + 40} L ${rodTip[0]} ${rodTip[1]}`} stroke={INK} strokeWidth={16} strokeLinecap="round" />
      <path d={`M ${hand[0] - 90} ${hand[1] + 40} L ${rodTip[0]} ${rodTip[1]}`} stroke="#E8C547" strokeWidth={8} strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={hand[0] - 70} cy={hand[1] + 30} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
      <rect x={-36} y={-470} width={72} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-550} rx={88} ry={98} fill={SKIN} stroke={INK} strokeWidth={8} />
      <circle cx={-30} cy={-556} r={10} fill={INK} />
      <circle cx={30} cy={-556} r={10} fill={INK} />
      <path d={`M -30 -486 Q 0 ${-470 + Math.sin(f / 6) * 4} 30 -486`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M -96 -580 Q -90 -680 0 -684 Q 90 -680 96 -580 Z" fill="#E8402F" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 60 -590 Q 160 -600 180 -570 Q 120 -560 60 -572 Z" fill="#E8402F" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    </g>
  );
};

export const MercuryHatter: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "vat";
  let float: string[] = v.float ?? [];
  let floatAt: number[] | undefined = v.floatAt;
  let floatTop: number = v.floatTop ?? 330;
  let floatSide: string = v.floatSide ?? "alt";
  let sky: "day" | "paper" = "paper";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "vat") {
    // frame 0: the hatter, tall top hat, trembling hands brushing orange mercury solution onto a rabbit pelt; vapour curls into his face
    const carrot = 0.35 + ease(f, 0, dur) * 0.5;
    body = (
      <>
        <Shop f={f} />
        <Basin x={850} y={1470} s={0.95} f={f} />
        <Hatter
          x={560}
          y={1770}
          s={1.22}
          f={f}
          face="strain"
          sweat
          shake={9}
          handR={[-120, -228]}
          elbowR={[-270, -300]}
          handL={[160, -222]}
          elbowL={[280, -300]}
          propL={<Brush ang={172 + Math.sin(f / 3) * 10} f={f} s={0.9} />}
          front={
            <>
              <Bench y={1520} />
              <Pelt x={430} y={1520} s={0.95} carrot={carrot} f={f} />
            </>
          }
        />
        <Vapour x={430} y={1470} tx={540} ty={1130} f={f} n={6} w={22} />
        <Vapour x={850} y={1440} tx={620} ty={1110} f={f + 13} n={4} w={18} />
      </>
    );
  } else if (mode === "brush") {
    // close-up: the pelt turns orange under the brush (carroting), steam rises … and he breathes it in
    const breatheAt = (v.breatheAt ?? 0.6) * dur;
    const breathe = f >= breatheAt;
    const carrot = ease(f, 0, dur * 0.7);
    body = (
      <>
        <Shop f={f} />
        <Hatter
          x={330}
          y={1850}
          s={1.5}
          f={f}
          face={breathe ? "inhale" : "strain"}
          sweat
          flush={breathe ? 0.25 : 0}
          shake={6}
          handR={[-10, -176]}
          elbowR={[-200, -300]}
          handL={[190 + Math.sin(f / 2.4) * 30, -190]}
          elbowL={[270, -320]}
          propL={<Brush ang={166 + Math.sin(f / 2.4) * 10} f={f} s={0.85} />}
          front={
            <>
              <Basin x={930} y={1530} s={0.9} f={f} />
              <Bench y={1570} />
              <Pelt x={560} y={1620} s={1.25} carrot={carrot} f={f} />
            </>
          }
        />
        <Vapour x={560} y={1560} tx={330} ty={breathe ? 1060 : 1150} f={f} n={breathe ? 8 : 4} w={breathe ? 22 : 16} speed={breathe ? 22 : 30} />
      </>
    );
  } else if (mode === "shakes") {
    // the hatter's shakes: holding a finished top hat that rattles in his trembling hands
    const tr = tremor(f, 20, 0.5);
    body = (
      <>
        <Burst f={f} cx={540} cy={1000} />
        <Hatter
          x={540}
          y={1800}
          s={1.25}
          f={f}
          face="worry"
          sweat
          shake={20}
          handR={[-140, -116]}
          elbowR={[-250, -230]}
          handL={[140, -116]}
          elbowL={[250, -230]}
          front={
            <g transform={`translate(${540 + tr[0] * 1.25} ${1800 - 112 * 1.25 + tr[1] * 1.25}) rotate(${Math.sin(f * 2.1) * 4})`}>
              <TopHat x={0} y={0} s={0.9} tilt={0} />
            </g>
          }
        />
      </>
    );
  } else if (mode === "booze") {
    // the boss blames booze … the bottle gets crossed out: it was MERCURY
    const revealAt = (v.revealAt ?? 0.5) * dur;
    const rev = f >= revealAt;
    body = (
      <>
        <Shop f={f} stove={false} />
        <Boss x={820} y={1700} s={1.0} f={f} point={[-330, -560]} shock={rev} />
        <Hatter
          x={300}
          y={1700}
          s={1.05}
          f={f}
          face="sad"
          sweat
          shake={16}
          handR={[-150, -170]}
          elbowR={[-260, -260]}
          handL={[150, -170]}
          elbowL={[260, -260]}
          front={
            <>
              <Bench y={1540} />
              <Bottle x={590} y={1540} s={0.9} crossed={rev ? popIn(f, revealAt, 7) : 0} />
            </>
          }
        />
        {rev ? (
          <g transform={`translate(560 820) scale(${popIn(f, revealAt + 3, 9)}) translate(-560 -820)`}>
            <MercuryDrop x={560} y={820} s={1.25} f={f} />
          </g>
        ) : null}
      </>
    );
  } else if (mode === "phrase") {
    // outside the hat shop: "MAD AS A HATTER!" – the trembling hatter in his doorway
    sky = "day";
    const bubbleAt = (v.bubbleAt ?? 0.08) * dur;
    body = (
      <>
        <ShopFront f={f} top={520} ground={1720} />
        <Hatter x={800} y={1570} s={0.85} f={f} face="sad" sweat shake={14} handR={[-150, -150]} handL={[150, -150]} />
        <Say cx={540} cy={390} w={960} h={190} tx={70} ty={640} text={v.say ?? "MAD AS A HATTER!"} p={popIn(f, bubbleAt, 9)} size={74} f={f} />
      </>
    );
  } else if (mode === "river") {
    // then: the factory pipe pours orange waste into the river → (answer) today: an angler, a glinting fish, mercury beads still in the mud
    const answerAt = (v.answerAt ?? 0.5) * dur;
    const today = f >= answerAt;
    if (today && v.answer) headline = undefined;
    if (today) {
      float = v.float2 ?? [];
      floatAt = v.float2At;
      floatTop = v.float2Top ?? floatTop;
      floatSide = v.float2Side ?? floatSide;
    }
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    sky = "day";
    body = today ? (
      <>
        <River f={f} water={1250} today />
        <Angler x={250} y={930} s={0.6} f={f} rodTip={[760, 290]} />
        <path d={`M ${250 + 760 * 0.6} ${930 + 290 * 0.6} L 700 ${1560 + Math.sin(f / 4) * 10}`} stroke={INK} strokeWidth={3} />
        <Fish x={760} y={1560 + Math.sin(f / 4) * 10} s={1.0} f={f} flip />
        <Fish x={((f * 5) % 1400) - 160} y={1440} s={0.8} f={f + 7} />
        <Fish x={1240 - ((f * 4 + 500) % 1400)} y={1350} s={0.7} f={f + 3} flip />
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
      </>
    ) : (
      <>
        <River f={f} water={1250} today={false} />
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "river" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 96} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={floatTop} at={floatAt} side={floatSide} />
    </Backdrop>
  );
};
