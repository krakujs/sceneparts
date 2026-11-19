import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep028 Hello Girls (Veterans Day) – the US Army Signal Corps Female Telephone Operators Unit, France 1918.
// They swore the Army oath, wore Army uniforms, ran the switchboards within range of German artillery …
// then the Army called them civilians, and it took ~60 years (1977 law) to make them veterans; Congressional Gold Medal 2024.
// visual: { mode: "fire" | "oath" | "front" | "denied" | "fight" | "medal", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSize?,
//           shellAt?: number[] (fire/front), helmetAt? (front), answer?, answerAccent?, answerAt? (denied/medal), years?: [from, to] (fight) }
// Respectful: no injuries, no gore; shells are distant flashes in a window; the medal is an illustration (the real design was not final).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const NAVY = "#2C3A5E";
const NAVY_D = "#1F2A45";
const NAVY_L = "#41558A";
const SKIN = "#F4C6A2";
const SKIN_D = "#DDA27C";
const BLUSH = "#F08C7A";
const HAIR = "#5A3420";
const HAIR_GREY = "#CFCAC2";
const COLLAR = "#F7F1E3";
const BRASS = "#E0B04A";
const OLIVE = "#7E7C46";
const OLIVE_D = "#5C5A30";
const KHAKI = "#B59B62";
const WOOD = "#9A6638";
const WOOD_D = "#6A4424";
const WOOD_L = "#C08A52";
const JACK = "#D8B878";
const RED = "#C8372B";
const GOLD = "#F5C542";
const GOLD_D = "#C9952A";
const FBLUE = "#2B3D73";
const CORDS = [C.mustard, RED, C.teal, "#E07B3C", COLLAR];

type P = [number, number];
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

// two-bone IK; picks the elbow that sits further "out" (side = -1 → left, +1 → right)
const ik = (a: P, c: P, l1: number, l2: number, side: number): P => {
  const dx = c[0] - a[0];
  const dy = c[1] - a[1];
  const d = Math.max(Math.abs(l1 - l2) + 1, Math.min(Math.hypot(dx, dy), l1 + l2 - 1));
  const ang = Math.atan2(dy, dx);
  const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const e1: P = [a[0] + Math.cos(ang + A) * l1, a[1] + Math.sin(ang + A) * l1];
  const e2: P = [a[0] + Math.cos(ang - A) * l1, a[1] + Math.sin(ang - A) * l1];
  return (e1[0] - e2[0]) * side > 0 ? e1 : e2;
};

const Seg: React.FC<{ a: P; b: P; w: number; col: string }> = ({ a, b, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; size?: number }> = ({ items, f, dur, top = 330, at, size = 60 }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: size, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Pop: React.FC<{ x: number; y: number; f: number; at?: number; size?: number; rot?: number; text: string; col?: string }> = ({ x, y, f, at = 0, size = 80, rot = -8, text, col = C.mustard }) => {
  const p = popIn(f, at, 7);
  if (p <= 0) return null;
  const wob = Math.sin(f / 2.5) * 3;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + wob}) scale(${p})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={col} stroke={INK} strokeWidth={9} paintOrder="stroke">{text}</text>
    </g>
  );
};

// a telephone plug (brass tip + coloured sleeve) at `at`, pointing along `dir`
const Plug: React.FC<{ at: P; dir: P; col: string; s?: number }> = ({ at, dir, col, s = 1 }) => {
  const ang = (Math.atan2(dir[1], dir[0]) * 180) / Math.PI;
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang}) scale(${s})`}>
      <rect x={-44} y={-15} width={58} height={30} rx={8} fill={col} stroke={INK} strokeWidth={5} />
      <rect x={12} y={-8} width={30} height={16} fill="#E8D9A8" stroke={INK} strokeWidth={4} />
      <circle cx={46} cy={0} r={7} fill="#E8D9A8" stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Hand: React.FC<{ at: P; dir: P; open?: boolean; col?: string }> = ({ at, dir, open = false, col = SKIN }) => {
  const ang = (Math.atan2(dir[1], dir[0]) * 180) / Math.PI;
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang})`}>
      {open
        ? [-21, -7, 7, 21].map((k, i) => <rect key={k} x={6} y={k - 7} width={i === 0 || i === 3 ? 40 : 50} height={15} rx={7} fill={col} stroke={INK} strokeWidth={5} />)
        : null}
      {open ? <rect x={-10} y={-44} width={34} height={15} rx={7} fill={col} stroke={INK} strokeWidth={5} transform="rotate(-35 0 -36)" /> : null}
      <circle cx={0} cy={0} r={31} fill={col} stroke={INK} strokeWidth={6} />
    </g>
  );
};

export type Pose = "plug" | "oath" | "type" | "shock" | "salute";
export type Face = "fierce" | "proud" | "shock" | "calm";
const SR: P = [-148, -292];
const SL: P = [148, -292];

// THE Hello Girl: WWI Signal Corps operator, front view, waist-up (+ skirt). Origin = waist centre.
// Navy Army uniform (Norfolk-style jacket, belt, brass buttons, white collar), Signal Corps armband,
// head-band receiver + chest transmitter horn, 1918 updo. Optional Brodie helmet (drops in), cap, gas-mask bag, age (grey hair + glasses).
export const HelloGirl: React.FC<{
  x: number; y: number; s?: number; f: number; pose?: Pose; face?: Face; handR?: P; handL?: P; age?: number;
  helmet?: number; cap?: boolean; headset?: boolean; bag?: boolean; talk?: boolean; plugCol?: string; blink?: boolean;
}> = ({ x, y, s = 1, f, pose = "plug", face = "fierce", handR, handL, age = 0, helmet = -1, cap = false, headset = true, bag = false, talk = false, plugCol = C.mustard, blink = true }) => {
  const bob = Math.sin(f / 9) * 4;
  const type = pose === "type" ? Math.sin(f * 0.9) : 0;
  const hR: P =
    handR ??
    (pose === "oath" ? [-250, -650] : pose === "type" ? [-96, -30 + type * 10] : pose === "shock" ? [-222, -450] : pose === "salute" ? [-86, -508] : [-300, -430]);
  const hL: P =
    handL ??
    (pose === "type" ? [96, -30 - type * 10] : pose === "shock" ? [222, -450] : pose === "plug" ? [150, -420] : [196, -30]);
  const eR = ik(SR, hR, 165, 150, -1);
  const eL = ik(SL, hL, 165, 150, 1);
  const dR: P = [hR[0] - eR[0], hR[1] - eR[1]];
  const dL: P = [hL[0] - eL[0], hL[1] - eL[1]];
  const hairCol = mix(HAIR, HAIR_GREY, Math.min(1, age));
  const skinCol = age > 0.5 ? mix(SKIN, "#EDC0A6", (age - 0.5) * 2) : SKIN;
  const hy = -445 + bob * 0.4;
  const blinking = blink && f % 70 > 66;
  const mouthOpen = talk ? 6 + Math.abs(Math.sin(f / 2.6)) * 14 : 0;
  const hel = helmet >= 0 ? helmet : -1;
  const helY = hel >= 0 ? interpolate(hel, [0, 1], [-1100, 0], clamp) : 0;
  const armbandA: P = [SL[0] + (eL[0] - SL[0]) * 0.32, SL[1] + (eL[1] - SL[1]) * 0.32];
  const armbandB: P = [SL[0] + (eL[0] - SL[0]) * 0.58, SL[1] + (eL[1] - SL[1]) * 0.58];
  const armbandM: P = [(armbandA[0] + armbandB[0]) / 2, (armbandA[1] + armbandB[1]) / 2];
  const pv: P = [hR[0] - SR[0], hR[1] - SR[1]];
  const plugDir: P = [pv[0] / (Math.hypot(pv[0], pv[1]) || 1), pv[1] / (Math.hypot(pv[0], pv[1]) || 1)];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* hair at the back + bun */}
      {hel < 0 && !cap ? <circle cx={0} cy={hy - 132} r={56} fill={hairCol} stroke={INK} strokeWidth={7} /> : null}
      <ellipse cx={0} cy={hy - 30} rx={124} ry={106} fill={hairCol} stroke={INK} strokeWidth={8} />
      {/* skirt */}
      <path d="M -152 -6 L -200 440 L 200 440 L 152 -6 Z" fill={NAVY_D} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -60 10 L -76 440 M 64 10 L 80 440" stroke={NAVY} strokeWidth={8} opacity={0.8} />
      {/* jacket */}
      <path d="M -126 -318 Q -170 -304 -176 -250 L -158 4 L 158 4 L 176 -250 Q 170 -304 126 -318 Z" fill={NAVY} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -74 -300 L -82 -10 M 74 -300 L 82 -10" stroke={NAVY_D} strokeWidth={12} opacity={0.75} />
      <path d="M -150 -270 Q -160 -150 -146 -20" stroke={NAVY_L} strokeWidth={8} fill="none" opacity={0.6} />
      {/* pockets */}
      {[-1, 1].map((k) => (
        <g key={k}>
          <rect x={k * 104 - 42} y={-224} width={84} height={74} rx={8} fill={NAVY} stroke={INK} strokeWidth={5} />
          <path d={`M ${k * 104 - 46} -224 L ${k * 104 + 46} -224 L ${k * 104 + 40} -196 L ${k * 104} -186 L ${k * 104 - 40} -196 Z`} fill={NAVY_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={k * 104} cy={-198} r={7} fill={BRASS} stroke={INK} strokeWidth={3} />
        </g>
      ))}
      {/* belt + buttons */}
      <rect x={-162} y={-74} width={324} height={42} rx={6} fill={NAVY_D} stroke={INK} strokeWidth={6} />
      <rect x={-24} y={-80} width={48} height={54} rx={6} fill={BRASS} stroke={INK} strokeWidth={5} />
      {[-138, -110, -18].map((by) => (
        <circle key={by} cx={0} cy={by} r={9} fill={BRASS} stroke={INK} strokeWidth={4} />
      ))}
      {/* neck + white collar */}
      <rect x={-30} y={hy + 70} width={60} height={70} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <path d="M -40 -330 L 40 -330 L 0 -236 Z" fill={COLLAR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -36 -334 L -132 -318 L -112 -262 L -4 -244 Z" fill={COLLAR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 36 -334 L 132 -318 L 112 -262 L 4 -244 Z" fill={COLLAR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -118 -300 L -24 -258 M 118 -300 L 24 -258" stroke="#C9C1AE" strokeWidth={4} />
      {/* chest transmitter (horn mouthpiece on a breastplate) */}
      {headset ? (
        <g>
          <path d="M -58 -326 L -34 -262 M 58 -326 L 34 -262" stroke="#2A2A2A" strokeWidth={9} strokeLinecap="round" />
          <rect x={-42} y={-270} width={84} height={64} rx={12} fill="#2E2E30" stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={-238} r={10} fill="#58585C" />
          <path d="M -14 -262 L -30 -314 Q 0 -326 30 -314 L 14 -262 Z" fill="#1E1E20" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={0} cy={-316} rx={32} ry={11} fill="#4A4A50" stroke={INK} strokeWidth={5} />
        </g>
      ) : null}
      {/* gas-mask bag */}
      {bag ? (
        <g>
          <path d="M -150 -292 L 40 -120" stroke="#8C7444" strokeWidth={16} strokeLinecap="round" />
          <rect x={-10} y={-180} width={150} height={118} rx={16} fill={KHAKI} stroke={INK} strokeWidth={6} />
          <path d="M -10 -150 Q 65 -126 140 -150 L 140 -170 Q 140 -180 128 -180 L 2 -180 Q -10 -180 -10 -170 Z" fill="#9C8450" stroke={INK} strokeWidth={5} />
          <circle cx={65} cy={-136} r={8} fill={BRASS} stroke={INK} strokeWidth={3} />
        </g>
      ) : null}
      {/* head */}
      <g transform={`translate(0 ${hy})`}>
        <ellipse cx={-96} cy={6} rx={20} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <ellipse cx={96} cy={6} rx={20} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <ellipse cx={0} cy={0} rx={92} ry={104} fill={skinCol} stroke={INK} strokeWidth={8} />
        <circle cx={-56} cy={40} r={17} fill={BLUSH} opacity={0.45} />
        <circle cx={56} cy={40} r={17} fill={BLUSH} opacity={0.45} />
        {/* eyes */}
        {[-1, 1].map((k) =>
          blinking ? (
            <path key={k} d={`M ${k * 36 - 20} 4 Q ${k * 36} 14 ${k * 36 + 20} 4`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          ) : (
            <g key={k}>
              <ellipse cx={k * 36} cy={2} rx={face === "shock" ? 22 : 19} ry={face === "shock" ? 27 : 23} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
              <circle cx={k * 36 + (face === "fierce" ? -4 * k * 0 : 0)} cy={face === "shock" ? 2 : 5} r={face === "shock" ? 7 : 11} fill={INK} />
              <circle cx={k * 36 - 4} cy={face === "shock" ? -2 : 0} r={4} fill="#FFFFFF" />
              {face === "fierce" ? <path d={`M ${k * 60} -22 L ${k * 12} -10`} stroke={skinCol} strokeWidth={12} strokeLinecap="round" /> : null}
              {face === "fierce" ? <path d={`M ${k * 56} -15 L ${k * 14} -4`} stroke={INK} strokeWidth={5} strokeLinecap="round" /> : null}
            </g>
          ),
        )}
        {/* brows */}
        {face === "fierce" ? (
          <path d="M -62 -38 L -16 -24 M 62 -38 L 16 -24" stroke={hairCol} strokeWidth={11} strokeLinecap="round" />
        ) : face === "shock" ? (
          <path d="M -60 -46 Q -38 -64 -16 -48 M 60 -46 Q 38 -64 16 -48" stroke={hairCol} strokeWidth={10} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M -58 -34 Q -38 -44 -18 -34 M 58 -34 Q 38 -44 18 -34" stroke={hairCol} strokeWidth={10} fill="none" strokeLinecap="round" />
        )}
        {face === "fierce" ? <path d="M -62 -38 L -16 -24 M 62 -38 L 16 -24" stroke={INK} strokeWidth={3} opacity={0.4} /> : null}
        {/* nose */}
        <path d="M -2 18 Q 12 40 -6 46" stroke={SKIN_D} strokeWidth={7} fill="none" strokeLinecap="round" />
        {/* mouth */}
        {face === "shock" ? (
          <ellipse cx={0} cy={72} rx={17} ry={23} fill="#7A2A26" stroke={INK} strokeWidth={5} />
        ) : talk ? (
          <ellipse cx={0} cy={70} rx={18} ry={mouthOpen / 2 + 3} fill="#7A2A26" stroke={INK} strokeWidth={5} />
        ) : face === "fierce" ? (
          <path d="M -20 70 Q 0 64 20 70" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M -28 62 Q 0 86 28 62" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        {/* age: glasses + lines */}
        {age > 0.45 ? (
          <g opacity={interpolate(age, [0.45, 0.7], [0, 1], clamp)}>
            <circle cx={-36} cy={2} r={31} fill="none" stroke="#6B5A3A" strokeWidth={6} />
            <circle cx={36} cy={2} r={31} fill="none" stroke="#6B5A3A" strokeWidth={6} />
            <path d="M -6 0 Q 0 -8 6 0 M -66 -4 L -90 -12 M 66 -4 L 90 -12" stroke="#6B5A3A" strokeWidth={6} fill="none" />
            <path d="M -40 56 Q -46 72 -38 86 M 40 56 Q 46 72 38 86 M -78 14 l -10 6 M 78 14 l 10 6" stroke={SKIN_D} strokeWidth={4} fill="none" />
          </g>
        ) : null}
        {/* front hair: side-parted 1918 waves covering the top and the ears */}
        <path d="M -118 20 Q -132 -96 -40 -112 Q 30 -126 98 -92 Q 132 -60 120 20 Q 108 -40 70 -66 Q 30 -50 -10 -74 Q -50 -52 -84 -60 Q -108 -30 -118 20 Z" fill={hairCol} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -70 -86 Q -40 -100 -6 -88 M 30 -100 Q 64 -96 90 -76" stroke={mix(hairCol, "#000000", 0.25)} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* headset: band + receiver on her left ear (viewer's right) */}
        {headset ? (
          <g>
            <path d="M -112 -6 Q -124 -150 0 -154 Q 124 -150 112 -6" stroke={INK} strokeWidth={18} fill="none" />
            <path d="M -112 -6 Q -124 -150 0 -154 Q 124 -150 112 -6" stroke="#44444A" strokeWidth={9} fill="none" />
            <rect x={-124} y={-16} width={22} height={40} rx={8} fill="#2E2E30" stroke={INK} strokeWidth={5} />
            <circle cx={116} cy={4} r={36} fill="#26262A" stroke={INK} strokeWidth={7} />
            <circle cx={116} cy={4} r={18} fill="#4C4C52" stroke={INK} strokeWidth={4} />
            <path d="M 132 36 Q 160 140 120 230" stroke="#2A2A2A" strokeWidth={8} fill="none" />
          </g>
        ) : null}
        {/* cap */}
        {cap && hel < 0 ? (
          <g>
            <path d="M -104 -78 Q -100 -164 0 -170 Q 100 -164 104 -78 Q 0 -100 -104 -78 Z" fill={NAVY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d="M -104 -78 Q 0 -100 104 -78 L 102 -98 Q 0 -122 -102 -98 Z" fill={COLLAR} stroke={INK} strokeWidth={5} />
            <circle cx={0} cy={-132} r={16} fill={BRASS} stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
        {/* Brodie helmet (drops in) */}
        {hel >= 0 ? (
          <g transform={`translate(0 ${helY}) rotate(${hel < 1 ? (1 - hel) * 18 : 0})`}>
            {hel >= 1 ? <path d="M -100 -96 Q -112 40 -54 92 M 100 -96 Q 112 40 54 92" stroke="#6E4A28" strokeWidth={7} fill="none" /> : null}
            <path d="M -116 -104 Q -108 -214 0 -220 Q 108 -214 116 -104 Z" fill={OLIVE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <ellipse cx={0} cy={-102} rx={186} ry={38} fill={OLIVE} stroke={INK} strokeWidth={8} />
            <path d="M -160 -96 Q 0 -78 160 -96" stroke={OLIVE_D} strokeWidth={7} fill="none" />
            <path d="M -70 -180 Q -30 -206 20 -204" stroke="#A8A66A" strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>
        ) : null}
      </g>
      {/* arms */}
      <Seg a={SR} b={eR} w={64} col={NAVY} />
      <Seg a={eR} b={hR} w={56} col={NAVY} />
      <Seg a={SL} b={eL} w={64} col={NAVY} />
      <path d={`M ${armbandA[0]} ${armbandA[1]} L ${armbandB[0]} ${armbandB[1]}`} stroke={INK} strokeWidth={80} strokeLinecap="butt" />
      <path d={`M ${armbandA[0]} ${armbandA[1]} L ${armbandB[0]} ${armbandB[1]}`} stroke={COLLAR} strokeWidth={66} strokeLinecap="butt" />
      <g transform={`translate(${armbandM[0]} ${armbandM[1]})`}>
        <rect x={-16} y={-10} width={14} height={11} fill={RED} stroke={INK} strokeWidth={2.5} />
        <rect x={3} y={-10} width={14} height={11} fill={COLLAR} stroke={INK} strokeWidth={2.5} />
        <rect x={7} y={-7} width={6} height={5} fill={RED} />
      </g>
      <Seg a={eL} b={hL} w={56} col={NAVY} />
      {pose === "plug" ? <Plug at={[hR[0] + plugDir[0] * 30, hR[1] + plugDir[1] * 30]} dir={plugDir} col={plugCol} s={1.3} /> : null}
      <Hand at={hR} dir={dR} open={pose === "oath" || pose === "shock" || pose === "salute"} col={skinCol} />
      <Hand at={hL} dir={dL} open={pose === "shock"} col={skinCol} />
    </g>
  );
};

// ---------- sets ----------
type BoardSpec = { x: number; y: number; w: number; h: number; cols: number; rows: number };
const jackXY = (b: BoardSpec, i: number): P => {
  const px = b.x + 44;
  const py = b.y + 110;
  const pw = b.w - 88;
  const ph = b.h - 330;
  const c = i % b.cols;
  const r = Math.floor(i / b.cols);
  return [px + ((c + 0.5) * pw) / b.cols, py + ((r + 0.5) * ph) / b.rows];
};

// tall wooden Army switchboard: jack field with lamps, key shelf with plugs standing in a row
const Board: React.FC<{ b: BoardSpec; f: number; lit?: number[]; hot?: number }> = ({ b, f, lit = [], hot = -1 }) => {
  const shelfY = b.y + b.h - 200;
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} fill={WOOD} stroke={INK} strokeWidth={9} />
      <path d={`M ${b.x - 10} ${b.y + 10} Q ${b.x + b.w / 2} ${b.y - 70} ${b.x + b.w + 10} ${b.y + 10} Z`} fill={WOOD_D} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <rect x={b.x + 30} y={b.y + 70} width={b.w - 60} height={b.h - 290} rx={8} fill="#2A1C12" stroke={INK} strokeWidth={6} />
      {new Array(b.cols * b.rows).fill(0).map((_, i) => {
        const [jx, jy] = jackXY(b, i);
        const isHot = i === hot && Math.floor(f / 4) % 2 === 0;
        const on = isHot || lit.includes(i) || random(`ep028l${i}-${Math.floor(f / 15)}`) > 0.84;
        return (
          <g key={i}>
            {on ? <circle cx={jx} cy={jy - 30} r={22} fill={isHot ? "#FF6A4A" : C.glow} opacity={0.4} /> : null}
            <circle cx={jx} cy={jy - 30} r={10} fill={on ? (isHot ? "#FF6A4A" : C.glow) : "#4A3A2A"} stroke={INK} strokeWidth={4} />
            <circle cx={jx} cy={jy + 8} r={15} fill={JACK} stroke={INK} strokeWidth={5} />
            <circle cx={jx} cy={jy + 8} r={6} fill={INK} />
          </g>
        );
      })}
      {/* key shelf */}
      <path d={`M ${b.x - 16} ${shelfY} L ${b.x + b.w + 40} ${shelfY} L ${b.x + b.w + 70} ${shelfY + 60} L ${b.x - 16} ${shelfY + 60} Z`} fill={WOOD_L} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {new Array(Math.floor(b.w / 64)).fill(0).map((_, k) => (
        <g key={k}>
          <rect x={b.x + 30 + k * 64} y={shelfY - 44} width={22} height={46} rx={6} fill={CORDS[k % CORDS.length]} stroke={INK} strokeWidth={4} />
          <rect x={b.x + 36 + k * 64} y={shelfY - 62} width={10} height={20} fill="#E8D9A8" stroke={INK} strokeWidth={3} />
          <rect x={b.x + 30 + k * 64} y={shelfY + 14} width={18} height={30} rx={4} fill="#3A3A3A" stroke={INK} strokeWidth={3} transform={`rotate(${k % 2 ? 12 : -12} ${b.x + 39 + k * 64} ${shelfY + 40})`} />
        </g>
      ))}
      <rect x={b.x} y={shelfY + 60} width={b.w} height={b.h - (shelfY + 60 - b.y)} fill={WOOD_D} stroke={INK} strokeWidth={8} />
    </g>
  );
};

const Cord: React.FC<{ a: P; b: P; col: string; sag?: number }> = ({ a, b, col, sag = 120 }) => {
  const d = `M ${a[0]} ${a[1]} Q ${(a[0] + b[0]) / 2} ${Math.max(a[1], b[1]) + sag} ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={d} stroke={col} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
};

// shell bursts: flash 0..1 and screen shake for the frames after each shell
const shellFx = (f: number, shells: number[]) => {
  let flash = 0;
  let shake = 0;
  for (const t of shells) {
    const a = f - t;
    if (a >= 0 && a < 40) {
      flash = Math.max(flash, interpolate(a, [0, 2, 14], [0.7, 1, 0], clamp));
      shake += Math.sin(a * 2.6) * 18 * Math.max(0, 1 - a / 22);
    }
  }
  return { flash, shake };
};

// sandbagged dugout window onto the night front, with shell bursts on the horizon
const Window: React.FC<{ x: number; y: number; w: number; h: number; f: number; shells: number[] }> = ({ x, y, w, h, f, shells }) => (
  <g>
    <defs>
      <clipPath id="ep028win">
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
    </defs>
    <g clipPath="url(#ep028win)">
      <rect x={x} y={y} width={w} height={h} fill="url(#ep028night)" />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={x + 30 + k * (w / 5)} cy={y + 30 + ((k * 37) % 60)} r={3} fill="#FFF3C4" opacity={0.6} />
      ))}
      {shells.map((t, k) => {
        const a = f - t;
        if (a < 0 || a > 60) return null;
        const bx = x + w * (k % 2 ? 0.7 : 0.32);
        const by = y + h * 0.72;
        const r = interpolate(a, [0, 10, 60], [110, 170, 200], clamp);
        return (
          <g key={k}>
            <circle cx={bx} cy={by} r={r} fill="url(#ep028burst)" opacity={interpolate(a, [0, 30, 60], [1, 0.6, 0], clamp)} />
            <circle cx={bx} cy={by - a * 2} r={30 + a * 1.6} fill="#4A4048" opacity={interpolate(a, [6, 60], [0.8, 0], clamp)} />
          </g>
        );
      })}
      {/* shattered trees + ridge */}
      <path d={`M ${x} ${y + h * 0.8} Q ${x + w * 0.3} ${y + h * 0.7} ${x + w * 0.55} ${y + h * 0.78} T ${x + w} ${y + h * 0.74} L ${x + w} ${y + h} L ${x} ${y + h} Z`} fill="#1A1420" />
      {[0.2, 0.62, 0.86].map((k) => (
        <path key={k} d={`M ${x + w * k} ${y + h * 0.78} l 0 -70 m 0 30 l -18 -24 m 18 10 l 16 -30`} stroke="#1A1420" strokeWidth={8} fill="none" strokeLinecap="round" />
      ))}
    </g>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={WOOD_D} strokeWidth={26} />
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={7} />
    <path d={`M ${x + w / 2} ${y} L ${x + w / 2} ${y + h} M ${x} ${y + h / 2} L ${x + w} ${y + h / 2}`} stroke={WOOD_D} strokeWidth={14} />
    {/* sandbags on the sill */}
    {new Array(Math.ceil(w / 110) + 1).fill(0).map((_, k) => (
      <rect key={k} x={x - 30 + k * 110} y={y + h - 26} width={120} height={56} rx={24} fill="#C9AE78" stroke={INK} strokeWidth={6} />
    ))}
  </g>
);

const Lamp: React.FC<{ x: number; y: number; f: number; kick?: number }> = ({ x, y, f, kick = 0 }) => {
  const ang = Math.sin(f / 11) * 5 + kick * Math.sin(f / 3) * 10;
  return (
    <g transform={`rotate(${ang} ${x} 0)`}>
      <circle cx={x} cy={y + 40} r={300} fill="url(#ep028glow)" />
      <line x1={x} y1={0} x2={x} y2={y} stroke={INK} strokeWidth={6} />
      <path d={`M ${x - 60} ${y + 40} Q ${x} ${y - 30} ${x + 60} ${y + 40} Z`} fill="#3E5A3A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={x} cy={y + 46} r={18} fill="#FFF3C4" stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Dust: React.FC<{ f: number; shells: number[] }> = ({ f, shells }) => (
  <>
    {shells.map((t, k) => {
      const a = f - t;
      if (a < 0 || a > 45) return null;
      return new Array(16).fill(0).map((_, i) => {
        const x = random(`ep028d${k}-${i}`) * 1080;
        const y = 120 + a * (8 + random(`ep028v${k}-${i}`) * 10);
        return <circle key={`${k}-${i}`} cx={x} cy={y} r={3 + (i % 3) * 2} fill="#D9C49C" opacity={interpolate(a, [0, 45], [0.9, 0], clamp)} />;
      });
    })}
  </>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep028wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7A4E2C" />
      <stop offset="1" stopColor="#5A3820" />
    </linearGradient>
    <linearGradient id="ep028night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#241C3A" />
      <stop offset="1" stopColor="#8A3A2A" />
    </linearGradient>
    <radialGradient id="ep028burst">
      <stop offset="0" stopColor="#FFF6C8" />
      <stop offset="0.35" stopColor="#FFB347" />
      <stop offset="1" stopColor="#E8402F" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="ep028glow">
      <stop offset="0" stopColor="#FFE7A0" stopOpacity="0.55" />
      <stop offset="1" stopColor="#FFE7A0" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="ep028day" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8FCBEA" />
      <stop offset="1" stopColor="#FCE6BE" />
    </linearGradient>
    <radialGradient id="ep028gold">
      <stop offset="0" stopColor="#FFF3B0" stopOpacity="0.95" />
      <stop offset="1" stopColor="#FFD24A" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="ep028room" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#E9C79A" />
      <stop offset="1" stopColor="#C99A6A" />
    </linearGradient>
  </defs>
);

// dugout / HQ office wall: planks, ceiling beam
const Wall: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep028wall)" />
    {new Array(9).fill(0).map((_, k) => (
      <path key={k} d={`M ${k * 124 + 20} 0 L ${k * 124 + 24} 1920`} stroke="#4A2E1A" strokeWidth={6} opacity={0.7} />
    ))}
    {[180, 380].map((by, k) => (
      <rect key={k} x={-20} y={by - 40} width={1120} height={60} fill={WOOD_D} stroke={INK} strokeWidth={6} opacity={k ? 0 : 1} />
    ))}
  </g>
);

const Star: React.FC<{ x: number; y: number; r: number; col?: string }> = ({ x, y, r, col = COLLAR }) => {
  const pts = new Array(10).fill(0).map((_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.42 : r;
    return `${x + Math.cos(a) * rr} ${y + Math.sin(a) * rr}`;
  });
  return <path d={`M ${pts.join(" L ")} Z`} fill={col} stroke={INK} strokeWidth={3} strokeLinejoin="round" />;
};

// waving US flag band across the frame (stylised – not a star count)
const Flag: React.FC<{ top: number; h: number; f: number }> = ({ top, h, f }) => {
  const st = h / 13;
  const wave = (x: number) => Math.sin(x / 150 + f / 7) * 16;
  const band = (y0: number, y1: number, x0 = -40, x1 = 1120) => {
    const xs: number[] = [];
    for (let x = x0; x <= x1; x += 40) xs.push(x);
    const topE = xs.map((x) => `${x} ${y0 + wave(x)}`).join(" L ");
    const botE = xs.slice().reverse().map((x) => `${x} ${y1 + wave(x)}`).join(" L ");
    return `M ${topE} L ${botE} Z`;
  };
  return (
    <g>
      {new Array(13).fill(0).map((_, i) => (
        <path key={i} d={band(top + i * st, top + (i + 1) * st + 1)} fill={i % 2 ? COLLAR : RED} />
      ))}
      <path d={band(top, top + 7 * st, -40, 480)} fill={FBLUE} />
      {new Array(4).fill(0).map((_, r) =>
        new Array(5).fill(0).map((__, c) => {
          const sx = 20 + c * 92 + (r % 2) * 46;
          return <Star key={`${r}-${c}`} x={sx} y={top + 50 + r * 92 + wave(sx)} r={26} />;
        }),
      )}
      <path d={band(top, top + h)} fill="none" stroke={INK} strokeWidth={8} />
    </g>
  );
};

const Typewriter: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => {
  const car = ((f * 6) % 120) - 60;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-150 + car * 0.2} y={-210} width={300} height={160} fill="#FBF6EA" stroke={INK} strokeWidth={5} />
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${-120 + car * 0.2} ${-180 + k * 28} L ${40 + car * 0.2 - k * 20} ${-180 + k * 28}`} stroke="#8A8072" strokeWidth={6} />
      ))}
      <rect x={-200 + car * 0.3} y={-80} width={400} height={44} rx={20} fill="#2A2A2E" stroke={INK} strokeWidth={6} />
      <path d="M -230 -40 L 230 -40 L 260 120 L -260 120 Z" fill="#26262A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {[0, 1, 2].map((r) =>
        new Array(9 - r).fill(0).map((_, c) => {
          const kx = -176 + r * 22 + c * 44;
          const down = Math.floor(f / 2 + c * 3 + r * 5) % 9 === 0 ? 5 : 0;
          return <circle key={`${r}-${c}`} cx={kx} cy={0 + r * 38 + down} r={15} fill="#F2E6C8" stroke={INK} strokeWidth={4} />;
        }),
      )}
    </g>
  );
};

const Envelope: React.FC<{ x: number; y: number; rot?: number; s?: number; label?: string }> = ({ x, y, rot = 0, s = 1, label }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-100} y={-60} width={200} height={120} rx={6} fill="#F7EEDC" stroke={INK} strokeWidth={5} />
    <path d="M -100 -60 L 0 10 L 100 -60" stroke={INK} strokeWidth={4} fill="none" />
    {label ? <text x={0} y={44} textAnchor="middle" fontFamily={typeFont} fontSize={26} fill={INK}>{label}</text> : null}
  </g>
);

const Medal: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(f / 10) * 3})`}>
    <circle cx={0} cy={0} r={168} fill={GOLD_D} stroke={INK} strokeWidth={9} />
    <circle cx={0} cy={0} r={142} fill={GOLD} stroke={GOLD_D} strokeWidth={8} />
    {new Array(14).fill(0).map((_, k) => {
      const a = (k / 14) * Math.PI * 2;
      return <ellipse key={k} cx={Math.cos(a) * 118} cy={Math.sin(a) * 118} rx={16} ry={8} fill={GOLD_D} transform={`rotate(${(a * 180) / Math.PI + 90} ${Math.cos(a) * 118} ${Math.sin(a) * 118})`} />;
    })}
    <Star x={0} y={6} r={78} col="#FFE27A" />
    <path d="M -96 -96 Q -40 -136 30 -126" stroke="#FFF6CF" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.8} />
  </g>
);

export const HelloGirls: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "fire";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let top: React.ReactNode = null;
  let shake = 0;
  let flash = 0;
  const answerAt = Math.round((v.answerAt ?? 0.55) * dur);

  if (mode === "fire" || mode === "front") {
    // frame 0: she jams a plug into the board while shells light up the dugout window; "front": faster, mirrored, helmet drops on
    const front = mode === "front";
    const shells: number[] = (v.shellAt ?? (front ? [0.12] : [0.02, 0.6])).map((t: number) => Math.round(t * dur));
    const fx = shellFx(f, shells);
    shake = fx.shake;
    flash = fx.flash;
    const b: BoardSpec = front ? { x: 24, y: 560, w: 420, h: 1160, cols: 4, rows: 6 } : { x: 28, y: 600, w: 400, h: 1100, cols: 4, rows: 6 };
    const gx = front ? 640 : 690;
    const gy = front ? 1760 : 1700;
    const gs = front ? 1.55 : 1.4;
    const shelfY = b.y + b.h - 200;
    const toLocal = (p: P): P => [(p[0] - gx) / gs, (p[1] - gy) / gs];
    const target = (j: number): P => {
      const t = jackXY(b, j);
      return [t[0], t[1] + 8];
    };
    const handFor = (tgt: P, push: number): P => {
      const t = toLocal(tgt);
      const dx = t[0] - SR[0];
      const dy = t[1] - SR[1];
      const n = Math.hypot(dx, dy) || 1;
      const back = 96 + (1 - push) * 70;
      return [t[0] - (dx / n) * back, t[1] - (dy / n) * back];
    };
    let hand: P;
    let plugCol: string = C.mustard;
    let done: { j: number; col: string }[] = [];
    let hot = -1;
    let cordFrom: P = [b.x + 300, shelfY];
    if (!front) {
      const sw = Math.round(dur * 0.55);
      const second = f >= sw;
      const j = second ? 14 : 9;
      const push = interpolate(f - (second ? sw : 0), [0, 2, 7], [0.4, 0.4, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
      hand = handFor(target(j), push);
      plugCol = second ? RED : C.mustard;
      done = second ? [{ j: 9, col: C.mustard }] : [];
      hot = push < 1 ? j : -1;
      cordFrom = [b.x + (second ? 230 : 300), shelfY - 40];
    } else {
      const PER = 12;
      const seq = [1, 4, 9, 2, 8, 5, 13, 0, 10, 6, 12, 14];
      const cyc = Math.floor(f / PER);
      const c = f % PER;
      const cur = seq[cyc % seq.length];
      const prev = seq[(cyc + seq.length - 1) % seq.length];
      const mv = cyc === 0 ? 1 : interpolate(c, [0, 5], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
      const pin = interpolate(c, [5, 8], [0, 1], clamp);
      const tp = target(prev);
      const tc = target(cur);
      hand = handFor([tp[0] + (tc[0] - tp[0]) * mv, tp[1] + (tc[1] - tp[1]) * mv], mv < 1 ? 0 : pin);
      plugCol = CORDS[cyc % CORDS.length];
      done = seq.slice(0, Math.min(cyc, seq.length)).map((j, k) => ({ j, col: CORDS[k % CORDS.length] }));
      hot = cur;
      cordFrom = [b.x + 40 + (cyc % 6) * 64, shelfY - 40];
    }
    const hAt = Math.round((v.helmetAt ?? 0.55) * dur);
    const hel = front ? (f < hAt - 12 ? -1 : interpolate(f, [hAt - 12, hAt], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) })) : -1;
    const handScreen: P = [gx + hand[0] * gs, gy + hand[1] * gs];
    const set = (
      <>
        <Wall />
        <Window x={590} y={548} w={450} h={330} f={f} shells={shells} />
        <Lamp x={front ? 820 : 560} y={front ? 900 : 640} f={f} kick={flash} />
        <Board b={b} f={f} lit={done.map((d) => d.j)} hot={hot} />
        {done.map((d, k) => {
          const t = jackXY(b, d.j);
          return (
            <g key={k}>
              <Cord a={[t[0], t[1] + 60]} b={[b.x + 40 + (k % 6) * 64, shelfY - 40]} col={d.col} sag={60} />
              <Plug at={[t[0], t[1] + 40]} dir={[0, -1]} col={d.col} s={0.9} />
            </g>
          );
        })}
        <Cord a={cordFrom} b={handScreen} col={plugCol} sag={140} />
        <HelloGirl x={gx} y={gy} s={gs} f={f} pose="plug" face="fierce" handR={hand} plugCol={plugCol} helmet={hel} bag={front && f >= hAt + 3} blink={!front} />
        <Dust f={f} shells={shells} />
      </>
    );
    body = front ? <g transform="translate(1080 0) scale(-1 1)">{set}</g> : set;
    if (front) {
      top = (
        <>
          {f >= hAt ? <Pop x={800} y={760} f={f} at={hAt} size={96} rot={10} text="CLANG!" col={C.cream} /> : null}
        </>
      );
    }
  } else if (mode === "oath") {
    // sunny parade-ground flag; she raises her right hand – the Army oath
    const oathAt = Math.round((v.oathAt ?? 0.08) * dur);
    const raise = interpolate(f, [oathAt - 6, oathAt + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
    const hR: P = [-196 - raise * 54, -60 - raise * 590];
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep028day)" />
        <circle cx={880} cy={430} r={260} fill="url(#ep028glow)" />
        <Flag top={600} h={700} f={f} />
        <rect x={0} y={1420} width={1080} height={500} fill="#D9B97A" />
        <path d="M 0 1420 L 1080 1420" stroke={INK} strokeWidth={8} />
        <HelloGirl x={560} y={1690} s={1.32} f={f} pose="oath" face="proud" handR={hR} cap headset={false} />
        {raise > 0.9
          ? [0, 1, 2, 3, 4].map((k) => {
              const a = (k / 5) * Math.PI * 2 + f / 10;
              const r = 120 + ((f - oathAt) % 20) * 3;
              return <Star key={k} x={560 + hR[0] * 1.32 + Math.cos(a) * r} y={1690 + hR[1] * 1.32 + Math.sin(a) * r} r={18} col={C.mustard} />;
            })
          : null}
      </>
    );
  }

  if (mode === "denied") {
    // TWIST picture: her Army service card … a rubber stamp slams CIVILIAN across it; she gasps below
    const st = answerAt;
    const stampY = f < st ? interpolate(f, [st - 9, st], [-1000, 0], { ...clamp, easing: Easing.in(Easing.cubic) }) : interpolate(f, [st + 5, st + 16], [0, -1000], { ...clamp, easing: Easing.in(Easing.quad) });
    const inked = f >= st;
    const sa = f - st;
    shake = sa >= 0 && sa < 16 ? Math.sin(sa * 2.8) * 16 * (1 - sa / 16) : 0;
    if (f >= st && v.answer) headline = undefined;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep028room)" />
        <rect x={0} y={1300} width={1080} height={620} fill={WOOD} />
        <path d="M 0 1300 L 1080 1300" stroke={INK} strokeWidth={8} />
        {/* service card */}
        <g transform="rotate(-2 540 920)">
          <rect x={128} y={628} width={824} height={600} rx={18} fill="#000" opacity={0.18} />
          <rect x={120} y={612} width={840} height={600} rx={18} fill="#FBF3E0" stroke={INK} strokeWidth={9} />
          <rect x={120} y={612} width={840} height={96} rx={18} fill={NAVY} stroke={INK} strokeWidth={9} />
          <text x={540} y={676} textAnchor="middle" fontFamily={typeFont} fontSize={42} fill={COLLAR}>U.S. ARMY · SIGNAL CORPS</text>
          <defs>
            <clipPath id="ep028oval">
              <ellipse cx={300} cy={950} rx={130} ry={165} />
            </clipPath>
          </defs>
          <ellipse cx={300} cy={950} rx={130} ry={165} fill="#D9C49C" stroke={INK} strokeWidth={7} />
          <g clipPath="url(#ep028oval)">
            <HelloGirl x={300} y={1175} s={0.52} f={f} pose="salute" face="proud" cap headset={false} blink={false} />
          </g>
          <ellipse cx={300} cy={950} rx={130} ry={165} fill="none" stroke={INK} strokeWidth={7} />
          {["SERVED: FRANCE 1918", "OATH: ARMY", "UNIFORM: ARMY", "STATUS:"].map((t, k) => (
            <g key={k}>
              <text x={470} y={812 + k * 92} fontFamily={typeFont} fontSize={38} fill={INK}>{t}</text>
              <path d={`M 470 ${826 + k * 92} L 920 ${826 + k * 92}`} stroke="#B8A888" strokeWidth={3} />
            </g>
          ))}
          {inked ? (
            <g transform={`translate(560 1080) rotate(-11) scale(${interpolate(sa, [0, 4], [1.25, 1], clamp)})`} opacity={0.93}>
              <rect x={-330} y={-92} width={660} height={150} rx={14} fill="none" stroke={RED} strokeWidth={14} />
              <text x={0} y={34} textAnchor="middle" fontFamily={titleFont} fontSize={124} fill={RED}>CIVILIAN</text>
              {[[-360, -60], [350, 40], [-200, 90], [280, -110]].map(([sx, sy], k) => (
                <circle key={k} cx={sx} cy={sy} r={8 + k * 3} fill={RED} />
              ))}
            </g>
          ) : null}
        </g>
        {/* rubber stamp */}
        <g transform={`translate(560 ${1000 + stampY}) rotate(-11)`}>
          <rect x={-300} y={-40} width={600} height={60} rx={10} fill="#3A2A22" stroke={INK} strokeWidth={8} />
          <rect x={-250} y={-120} width={500} height={86} rx={14} fill={WOOD} stroke={INK} strokeWidth={8} />
          <path d="M -50 -120 L -40 -300 L 40 -300 L 50 -120 Z" fill={WOOD_L} stroke={INK} strokeWidth={8} />
          <ellipse cx={0} cy={-320} rx={100} ry={60} fill={WOOD_D} stroke={INK} strokeWidth={8} />
        </g>
        <HelloGirl x={850} y={2020} s={0.95} f={f} pose={inked ? "shock" : "salute"} face={inked ? "shock" : "proud"} cap headset={false} blink={false} />
      </>
    );
  } else if (mode === "fight") {
    // the decades roll by: she types letter after letter to Congress while her hair turns grey
    const [y0, y1]: number[] = v.years ?? [1919, 1977];
    const p = interpolate(f, [4, dur * 0.7], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const yr = Math.round(y0 + (y1 - y0) * p);
    const frac = ((y0 + (y1 - y0) * p) % 1 + 1) % 1;
    const age = interpolate(f, [0, dur * 0.7], [0, 1], clamp);
    const sent = Math.floor(f / 7);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep028room)" />
        {/* wall calendar */}
        <g transform="translate(230 860)">
          <rect x={-170} y={-170} width={340} height={340} rx={14} fill="#FBF3E0" stroke={INK} strokeWidth={8} />
          <rect x={-170} y={-170} width={340} height={80} rx={14} fill={RED} stroke={INK} strokeWidth={8} />
          {[-90, 90].map((rx) => (
            <rect key={rx} x={rx - 10} y={-196} width={20} height={50} rx={8} fill="#8A8A90" stroke={INK} strokeWidth={4} />
          ))}
          <text x={0} y={70} textAnchor="middle" fontFamily={titleFont} fontSize={124} fill={INK}>{yr}</text>
          {p < 1 ? (
            <g transform={`translate(${frac * 260} ${-frac * 120}) rotate(${frac * 50})`} opacity={1 - frac}>
              <rect x={-160} y={-80} width={320} height={240} fill="#FBF3E0" stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
        </g>
        <rect x={0} y={1560} width={1080} height={360} fill={WOOD} />
        <path d="M 0 1560 L 1080 1560" stroke={INK} strokeWidth={8} />
        <HelloGirl x={620} y={1600} s={1.12} f={f} pose="type" face="fierce" age={age} headset={false} />
        <Typewriter x={620} y={1600} f={f} />
        {/* letter stack */}
        {new Array(Math.min(sent, 14)).fill(0).map((_, k) => (
          <Envelope key={k} x={930 + ((k * 13) % 9) - 4} y={1700 - k * 22} rot={((k * 37) % 9) - 4} s={0.8} label={k === Math.min(sent, 14) - 1 ? "TO: CONGRESS" : undefined} />
        ))}
        {(() => {
          const a = (f % 7) / 7;
          return <Envelope x={620 + a * 310} y={1380 - Math.sin(a * Math.PI) * 220 + a * 300} rot={a * 30} s={0.8} />;
        })()}
      </>
    );
  } else if (mode === "medal") {
    // today: a gold medal on the old switchboard, her portrait beside it, flags out
    const land = answerAt;
    const my = interpolate(f, [land - 12, land, land + 4, land + 8], [-260, 1010, 980, 1000], clamp);
    const glow = interpolate(f, [land, land + 8], [0, 1], clamp);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep028day)" />
        <g opacity={glow} transform={`rotate(${f * 0.6} 540 1000)`}>
          {new Array(12).fill(0).map((_, k) => (
            <path key={k} d={`M 540 1000 L ${540 + Math.cos((k / 12) * Math.PI * 2) * 1400} ${1000 + Math.sin((k / 12) * Math.PI * 2) * 1400} L ${540 + Math.cos((k / 12 + 0.035) * Math.PI * 2) * 1400} ${1000 + Math.sin((k / 12 + 0.035) * Math.PI * 2) * 1400} Z`} fill="#FFF3B0" opacity={0.5} />
          ))}
        </g>
        {/* bunting */}
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M ${k * 270 - 10} 640 Q ${k * 270 + 135} 760 ${k * 270 + 280} 640 L ${k * 270 + 280} 660 Q ${k * 270 + 135} 800 ${k * 270 - 10} 660 Z`} fill={[RED, COLLAR, FBLUE, RED][k]} stroke={INK} strokeWidth={6} />
        ))}
        <rect x={0} y={1440} width={1080} height={480} fill={WOOD} />
        <path d="M 0 1440 L 1080 1440" stroke={INK} strokeWidth={8} />
        {/* old field switchboard box */}
        <g transform="translate(330 1440)">
          <rect x={-230} y={-300} width={460} height={300} rx={12} fill={WOOD_L} stroke={INK} strokeWidth={8} />
          <rect x={-200} y={-270} width={400} height={180} rx={8} fill="#2A1C12" stroke={INK} strokeWidth={6} />
          {new Array(10).fill(0).map((_, k) => (
            <circle key={k} cx={-160 + (k % 5) * 80} cy={-220 + Math.floor(k / 5) * 80} r={14} fill={JACK} stroke={INK} strokeWidth={4} />
          ))}
          <path d="M -120 -60 Q -60 40 40 -40 Q 120 -100 170 -40" stroke="#2A2A2A" strokeWidth={10} fill="none" />
          <circle cx={170} cy={-40} r={30} fill="#26262A" stroke={INK} strokeWidth={6} />
        </g>
        {/* her portrait (1918) */}
        <g transform="translate(830 1440) rotate(5)">
          <rect x={-130} y={-360} width={260} height={340} rx={10} fill={WOOD_D} stroke={INK} strokeWidth={8} />
          <rect x={-104} y={-334} width={208} height={288} fill="#D9C49C" />
          <defs>
            <clipPath id="ep028frame">
              <rect x={-104} y={-334} width={208} height={288} />
            </clipPath>
          </defs>
          <g clipPath="url(#ep028frame)">
            <HelloGirl x={0} y={110} s={0.5} f={f} pose="salute" face="proud" cap headset={false} blink={false} />
            <rect x={-104} y={-334} width={208} height={288} fill="#8A6A45" opacity={0.35} />
          </g>
        </g>
        {/* ribbon + medal */}
        <path d={`M 470 -20 L 540 ${my - 150} L 610 -20 Z`} fill={FBLUE} stroke={INK} strokeWidth={6} />
        <path d={`M 510 -20 L 540 ${my - 150} L 570 -20 Z`} fill={COLLAR} />
        <path d={`M 528 -20 L 540 ${my - 150} L 552 -20 Z`} fill={RED} />
        <circle cx={540} cy={my} r={260} fill="url(#ep028gold)" opacity={glow} />
        <Medal x={540} y={my} s={1} f={f} />
      </>
    );
  }

  return (
    <Backdrop sky="paper" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <g transform={`translate(${shake} ${shake * 0.6})`}>{body}</g>
        {top}
        {flash > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#FFB347" opacity={flash * 0.32} /> : null}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {v.answer && (mode === "denied" || mode === "medal") ? (
        <Sequence from={answerAt} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 104} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} size={v.floatSize ?? 60} />
    </Backdrop>
  );
};
