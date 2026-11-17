import React from "react";
import { Easing, Sequence, interpolate, interpolateColors, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont, bodyFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep021 Telegraph messenger boy – a Western Union-style messenger (visored cap, navy uniform, bicycle, yellow envelope).
// WWII home front: the boy everyone dreaded, because War Department death notices came by telegram.
// Warm, bright small-town palette; grief handled quietly (silhouettes, no faces of the bereaved, no melodrama).
// visual: { mode: "door" | "ride" | "telegram" | "office" | "mother" | "phone", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           knockAt? (door, 0–1), curtainAt? (door, 0–1), lines?: string[] (telegram strips), countTo?, countEnd?, chip?, chipAt?, chipY?,
//           runAt? (mother, 0–1), answer?, answerAccent?, answerAt?, answerSize? (phone) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const UNI = "#2E3A58";
const UNI_D = "#1E2740";
const UNI_HI = "#4A5A84";
const BRASS = "#E8B84A";
const SKIN = "#F1C39B";
const SKIN_D = "#D59D74";
const HAIR = "#6B3F22";
const SHIRT = "#F7F1E3";
const ENV = "#F7C62F";
const ENV_D = "#D9A514";
const SHOE = "#3A2418";
const BIKE = "#B23E2C";
const TYRE = "#2A2522";
const WALL = "#F4E6C8";
const DOOR = "#2F7A70";
const DOOR_D = "#225B54";
const PORCH = "#C98F55";
const PORCH_D = "#A8723F";
const LAWN = "#8CC05C";
const GLOW = "#FFD983";
const SIL = "#4A3646";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const kneeOf = (h: P, ft: P, L: number): P => {
  const dx = ft[0] - h[0];
  const dy = ft[1] - h[1];
  const d = Math.max(1, Math.hypot(dx, dy));
  const m: P = [(h[0] + ft[0]) / 2, (h[1] + ft[1]) / 2];
  const hh = Math.sqrt(Math.max(0, L * L - (d * d) / 4));
  let px = -dy / d;
  let py = dx / d;
  if (px < 0) {
    px = -px;
    py = -py;
  }
  return [m[0] + px * hh, m[1] + py * hh];
};

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 56, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.5, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// mustard chip drawn in SVG (fits text by textLength)
const Chip: React.FC<{ text: string; x?: number; y: number; p: number; w?: number; rot?: number; fill?: string }> = ({ text, x = 540, y, p, w = 760, rot = -3, fill = C.mustard }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-58} width={w} height={116} rx={18} fill={fill} stroke={INK} strokeWidth={8} />
      <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={58} fill={INK} textLength={Math.min(w - 60, text.length * 44)} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  ) : null;

// the yellow telegram envelope, origin = centre
export const Envelope: React.FC<{ x: number; y: number; s?: number; rot?: number; label?: boolean }> = ({ x, y, s = 1, rot = 0, label = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-52} width={160} height={104} rx={7} fill={ENV} stroke={INK} strokeWidth={6} />
    <path d="M -78 -50 L 0 4 L 78 -50" stroke={ENV_D} strokeWidth={5} fill="none" strokeLinejoin="round" />
    <rect x={-60} y={12} width={120} height={28} rx={3} fill="#FFF6D6" stroke={INK} strokeWidth={3} />
    {label ? (
      <text x={0} y={33} textAnchor="middle" fontFamily={typeFont} fontSize={21} fill={INK}>
        TELEGRAM
      </text>
    ) : null}
  </g>
);

// visored messenger cap (after Lewis Hine's 1913 New Orleans photo), origin = bottom centre of the band
const Cap: React.FC<{ x?: number; y?: number; rot?: number; s?: number }> = ({ x = 0, y = 0, rot = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -62 -4 L -56 -50 Q 6 -66 68 -50 L 74 -4 Z" fill={UNI} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-60} y={-20} width={132} height={15} fill={UNI_D} />
    <path d="M -50 -45 Q 6 -58 62 -45" stroke={UNI_HI} strokeWidth={5} fill="none" />
    <path d="M 38 -6 Q 104 -8 126 6 Q 92 18 34 6 Z" fill="#161412" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={30} cy={-36} rx={15} ry={11} fill={BRASS} stroke={INK} strokeWidth={4} />
  </g>
);

// The messenger boy. Origin = feet centre, facing right. ~660 units tall at s = 1.
// pose: "hold" (envelope at chest) | "knock" (fist at a door on the right, knock = 0..1 reach) | "bow" (cap off, held at chest, head down)
//       | "run" | "ride" (no legs, front hand on the handlebar = hand)
type Pose = "hold" | "knock" | "bow" | "run" | "ride";
export const Boy: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; pose?: Pose; knock?: number; reach?: number; look?: number; hand?: P; env?: boolean }> = ({
  x,
  y,
  s = 1,
  f,
  facing = 1,
  pose = "hold",
  knock = 0,
  reach = 1,
  look = 1,
  hand,
  env = true,
}) => {
  const run = pose === "run";
  const legs = pose !== "ride";
  const step = run ? Math.sin(f / 2.4) : 0;
  const bob = run ? -Math.abs(Math.sin(f / 2.4)) * 16 : pose === "ride" ? Math.abs(Math.sin(f / 3)) * -4 : Math.sin(f / 18) * 2;
  let fh: P = [124, -376];
  let bh: P = [-76, -290];
  if (pose === "knock") fh = [124 + reach * (50 + knock * 50), -376 - reach * 14];
  if (pose === "bow") {
    fh = [108, -344];
    bh = [-20, -344];
  }
  if (run) {
    fh = [90 + step * 70, -320 - Math.abs(step) * 30];
    bh = [-80 - step * 70, -320 - Math.abs(step) * 20];
  }
  if (pose === "ride") bh = [-40, -300];
  if (hand) fh = hand;
  const tilt = pose === "bow" ? 14 : run ? 6 : pose === "ride" ? 4 : 0;
  const capOn = pose !== "bow";
  const f1: P = [-18 + step * 70, -14 - Math.max(0, step) * 44];
  const f2: P = [22 - step * 70, -14 - Math.max(0, -step) * 44];
  const ctrl: P = [(58 + fh[0]) / 2 + 26, Math.max(-452, fh[1]) + 74];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      {legs ? <ellipse cx={0} cy={4} rx={150} ry={20} fill="#000" opacity={0.18} /> : null}
      {legs ? (
        <>
          {[f2, f1].map((ft, i) => (
            <g key={i}>
              <path d={`M ${i ? 22 : -22} -258 L ${ft[0]} ${ft[1] - 14}`} stroke={INK} strokeWidth={62} strokeLinecap="round" />
              <path d={`M ${i ? 22 : -22} -258 L ${ft[0]} ${ft[1] - 14}`} stroke={i ? UNI : UNI_D} strokeWidth={50} strokeLinecap="round" />
              <ellipse cx={ft[0] + 16} cy={ft[1]} rx={42} ry={17} fill={SHOE} stroke={INK} strokeWidth={5} />
            </g>
          ))}
        </>
      ) : null}
      <g transform={`translate(0 ${bob})`}>
        {/* back arm */}
        <path d={`M -60 -452 Q ${-94} ${(-452 + bh[1]) / 2 + 10} ${bh[0]} ${bh[1]}`} stroke={INK} strokeWidth={52} fill="none" strokeLinecap="round" />
        <path d={`M -60 -452 Q ${-94} ${(-452 + bh[1]) / 2 + 10} ${bh[0]} ${bh[1]}`} stroke={UNI_D} strokeWidth={40} fill="none" strokeLinecap="round" />
        {pose !== "bow" ? <circle cx={bh[0]} cy={bh[1]} r={21} fill={SKIN} stroke={INK} strokeWidth={5} /> : null}
        {/* jacket */}
        <path d="M -80 -470 Q -96 -360 -88 -226 Q 0 -212 88 -226 Q 96 -360 80 -470 Q 0 -492 -80 -470 Z" fill={UNI} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -440 Q -72 -340 -66 -250" stroke={UNI_HI} strokeWidth={8} fill="none" opacity={0.6} strokeLinecap="round" />
        <path d="M 20 -470 L 20 -224" stroke={UNI_D} strokeWidth={5} />
        <rect x={-90} y={-312} width={180} height={22} fill={UNI_D} stroke={INK} strokeWidth={4} />
        <rect x={9} y={-315} width={24} height={28} rx={3} fill={BRASS} stroke={INK} strokeWidth={3} />
        {[-442, -400, -358].map((by) => (
          <circle key={by} cx={34} cy={by} r={7} fill={BRASS} stroke={INK} strokeWidth={3} />
        ))}
        <path d="M -22 -480 L 6 -436 L 34 -480 Z" fill={SHIRT} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 0 -470 L 12 -470 L 15 -432 L 6 -420 L -3 -432 Z" fill={INK} />
        <rect x={-64} y={-434} width={48} height={30} rx={5} fill={BRASS} stroke={INK} strokeWidth={3} />
        <text x={-40} y={-411} textAnchor="middle" fontFamily={titleFont} fontSize={20} fill={INK}>
          21
        </text>
        {/* pouch on the hip with an envelope peeking out */}
        <g transform="translate(-86 -292) rotate(-6)">
          <rect x={-10} y={-30} width={46} height={40} fill={ENV} stroke={INK} strokeWidth={4} />
          <rect x={-32} y={-4} width={64} height={74} rx={10} fill="#7A4A2A" stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={16} r={6} fill={BRASS} stroke={INK} strokeWidth={2} />
        </g>
        {/* head */}
        <g transform={`rotate(${tilt} 0 -490)`}>
          <rect x={-17} y={-506} width={34} height={40} fill={SKIN_D} stroke={INK} strokeWidth={5} />
          <circle cx={6} cy={-548} r={64} fill={SKIN} stroke={INK} strokeWidth={6} />
          <path d="M -56 -572 Q -66 -528 -46 -504 Q -42 -540 -30 -570 Z" fill={HAIR} />
          <ellipse cx={-30} cy={-545} rx={13} ry={19} fill={SKIN} stroke={INK} strokeWidth={5} />
          <circle cx={24} cy={-522} r={13} fill="#F09A85" opacity={0.45} />
          {[[18, -530], [28, -536], [34, -526]].map(([fx, fy], i) => (
            <circle key={i} cx={fx} cy={fy} r={2.6} fill="#B9744E" />
          ))}
          {pose === "bow" ? (
            <path d="M 22 -556 Q 32 -550 42 -556 M 50 -556 Q 60 -550 70 -556" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <>
              <ellipse cx={32} cy={-558} rx={11} ry={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
              <ellipse cx={60} cy={-558} rx={11} ry={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
              <circle cx={32 + look * 4} cy={-556} r={6} fill={INK} />
              <circle cx={60 + look * 4} cy={-556} r={6} fill={INK} />
            </>
          )}
          <path d="M 20 -580 L 42 -590 M 50 -590 L 72 -580" stroke={HAIR} strokeWidth={6} strokeLinecap="round" />
          <path d="M 70 -550 Q 86 -534 68 -528" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d={run ? "M 42 -508 Q 54 -498 64 -508" : "M 40 -506 Q 52 -514 64 -506"} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          {capOn ? (
            <Cap x={4} y={-588} />
          ) : (
            <path d="M -58 -560 Q -56 -622 8 -622 Q 66 -620 72 -574 Q 50 -596 22 -590 Q 2 -606 -18 -590 Q -40 -600 -58 -560 Z" fill={HAIR} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          )}
        </g>
        {/* front arm */}
        <path d={`M 58 -452 Q ${ctrl[0]} ${ctrl[1]} ${fh[0]} ${fh[1]}`} stroke={INK} strokeWidth={54} fill="none" strokeLinecap="round" />
        <path d={`M 58 -452 Q ${ctrl[0]} ${ctrl[1]} ${fh[0]} ${fh[1]}`} stroke={UNI} strokeWidth={42} fill="none" strokeLinecap="round" />
        {pose === "bow" ? (
          <g transform="translate(44 -350) rotate(-6)">
            <path d="M -66 12 L -60 -40 Q 0 -58 60 -40 L 66 12 Z" fill={UNI_HI} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <rect x={-64} y={-6} width={128} height={15} fill={UNI_D} />
            <ellipse cx={0} cy={-24} rx={17} ry={12} fill={BRASS} stroke={INK} strokeWidth={4} />
            <path d="M -62 12 Q 0 48 62 12 Z" fill="#161412" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        ) : null}
        {env && (pose === "hold" || pose === "knock") ? <Envelope x={fh[0] + 66} y={fh[1] - 46} rot={-10} s={0.92} /> : null}
        <circle cx={fh[0]} cy={fh[1]} r={23} fill={SKIN} stroke={INK} strokeWidth={5} />
        {pose === "bow" ? <circle cx={bh[0]} cy={bh[1]} r={21} fill={SKIN} stroke={INK} strokeWidth={5} /> : null}
      </g>
    </g>
  );
};

// bicycle, side view facing right. Origin = ground under the middle. wheels r 96 at x ±160
const BIKE_PTS = { rear: [-160, -96] as P, front: [160, -96] as P, crank: [-10, -96] as P, seat: [-72, -258] as P, head: [124, -262] as P, grip: [74, -314] as P };
const Wheel: React.FC<{ cx: number; spin: number }> = ({ cx, spin }) => (
  <g transform={`translate(${cx} -96)`}>
    <circle r={96} fill="none" stroke={INK} strokeWidth={22} />
    <circle r={96} fill="none" stroke={TYRE} strokeWidth={14} />
    <circle r={82} fill="none" stroke="#9A9284" strokeWidth={4} />
    <g transform={`rotate(${spin})`}>
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <path key={a} d={`M ${-80 * Math.cos(rad(a))} ${-80 * Math.sin(rad(a))} L ${80 * Math.cos(rad(a))} ${80 * Math.sin(rad(a))}`} stroke="#B9B2A4" strokeWidth={3} />
      ))}
    </g>
    <circle r={11} fill="#8C8478" stroke={INK} strokeWidth={3} />
  </g>
);
export const Bike: React.FC<{ x: number; y: number; s?: number; spin?: number; rot?: number }> = ({ x, y, s = 1, spin = 0, rot = 0 }) => {
  const { rear, crank, seat, head, front, grip } = BIKE_PTS;
  const frame = `M ${rear[0]} ${rear[1]} L ${crank[0]} ${crank[1]} L ${seat[0]} ${seat[1]} Z M ${seat[0]} ${seat[1]} L ${head[0]} ${head[1]} L ${crank[0]} ${crank[1]}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={290} ry={16} fill="#000" opacity={0.16} />
      <Wheel cx={rear[0]} spin={spin} />
      <Wheel cx={front[0]} spin={spin} />
      <path d={frame} fill="none" stroke={INK} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" />
      <path d={frame} fill="none" stroke={BIKE} strokeWidth={13} strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M ${head[0]} ${head[1]} L ${front[0]} ${front[1]}`} stroke={INK} strokeWidth={20} strokeLinecap="round" />
      <path d={`M ${head[0]} ${head[1]} L ${front[0]} ${front[1]}`} stroke="#8E2F22" strokeWidth={11} strokeLinecap="round" />
      <path d={`M ${rear[0] - 70} ${rear[1] - 20} Q ${rear[0]} ${rear[1] - 120} ${rear[0] + 60} ${rear[1] - 60}`} stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d={`M ${head[0] - 4} ${head[1]} L ${head[0] - 14} ${head[1] - 40} Q ${head[0] - 28} ${grip[1] - 6} ${grip[0]} ${grip[1]}`} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M ${head[0] - 4} ${head[1]} L ${head[0] - 14} ${head[1] - 40} Q ${head[0] - 28} ${grip[1] - 6} ${grip[0]} ${grip[1]}`} stroke="#7D7A74" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M ${seat[0] + 4} ${seat[1]} L ${seat[0] - 4} ${seat[1] - 14}`} stroke={INK} strokeWidth={10} />
      <path d={`M ${seat[0] - 34} ${seat[1] - 12} Q ${seat[0] - 6} ${seat[1] - 28} ${seat[0] + 30} ${seat[1] - 16} L ${seat[0] + 22} ${seat[1] - 4} Q ${seat[0] - 8} ${seat[1] - 4} ${seat[0] - 34} ${seat[1] - 12} Z`} fill="#3A2418" stroke={INK} strokeWidth={4} />
      <g transform="translate(22 -212) rotate(-4)">
        <rect x={-54} y={-17} width={108} height={34} rx={5} fill={ENV} stroke={INK} strokeWidth={4} />
        <text x={0} y={8} textAnchor="middle" fontFamily={typeFont} fontSize={17} fill={INK} textLength={92} lengthAdjust="spacingAndGlyphs">
          TELEGRAMS
        </text>
      </g>
      <circle cx={crank[0]} cy={crank[1]} r={20} fill="#7D7A74" stroke={INK} strokeWidth={4} />
    </g>
  );
};

// the boy pedalling (pedal angle from f); same origin as Bike
const Rider: React.FC<{ x: number; y: number; s?: number; f: number; speed?: number }> = ({ x, y, s = 1, f, speed = 1 }) => {
  const a = f * 0.42 * speed;
  const { crank, seat, grip } = BIKE_PTS;
  const hip: P = [seat[0] + 6, seat[1] - 8];
  const pA: P = [crank[0] + 44 * Math.cos(a), crank[1] + 44 * Math.sin(a)];
  const pB: P = [crank[0] - 44 * Math.cos(a), crank[1] - 44 * Math.sin(a)];
  const leg = (ft: P, col: string) => {
    const k = kneeOf(hip, ft, 112);
    const d = `M ${hip[0]} ${hip[1]} L ${k[0]} ${k[1]} L ${ft[0]} ${ft[1] - 12}`;
    return (
      <g>
        <path d={d} stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} stroke={col} strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={ft[0] + 14} cy={ft[1]} rx={38} ry={15} fill={SHOE} stroke={INK} strokeWidth={5} />
      </g>
    );
  };
  const spin = f * 9 * speed;
  // boy origin so his hip (0,-250) sits on the saddle
  const bo: P = [hip[0], hip[1] + 250];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {leg(pB, UNI_D)}
      <Bike x={0} y={0} spin={spin} />
      <Boy x={bo[0]} y={bo[1]} f={f} pose="ride" hand={[grip[0] - bo[0], grip[1] - bo[1]]} env={false} />
      {leg(pA, UNI)}
    </g>
  );
};

// a window with lace curtains; open 0..1 pulls them aside and someone peeks out (silhouette only)
const Win: React.FC<{ x: number; y: number; w?: number; h?: number; open: number; who?: boolean; lit?: string }> = ({ x, y, w = 112, h = 136, open, who = true, lit = "#FFE6AE" }) => {
  const cw = (w / 2) * (1 - open * 0.72);
  const peek = interpolate(open, [0.15, 0.6], [0, 1], clamp);
  const sc = Math.min(w / 112, (h - 20) / 112);
  return (
    <g>
      <rect x={x - w / 2 - 8} y={y - 8} width={w + 16} height={h + 16} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      <rect x={x - w / 2} y={y} width={w} height={h} fill={lit} stroke={INK} strokeWidth={4} />
      {who && peek > 0 ? (
        <g opacity={peek}>
          <path d={`M ${x - 42 * sc} ${y + h} Q ${x} ${y + 62 * sc} ${x + 42 * sc} ${y + h} Z`} fill={SIL} />
          <circle cx={x} cy={y + 54 * sc} r={24 * sc} fill={SIL} />
          <circle cx={x - 8 * sc} cy={y + 52 * sc} r={3.6 * sc} fill="#FFFFFF" />
          <circle cx={x + 8 * sc} cy={y + 52 * sc} r={3.6 * sc} fill="#FFFFFF" />
        </g>
      ) : null}
      <rect x={x - w / 2} y={y} width={cw} height={h} fill="#FDF6E6" stroke={INK} strokeWidth={3} />
      <rect x={x + w / 2 - cw} y={y} width={cw} height={h} fill="#FDF6E6" stroke={INK} strokeWidth={3} />
      {[0.33, 0.66].map((k) => (
        <g key={k}>
          <path d={`M ${x - w / 2 + cw * k} ${y + 6} L ${x - w / 2 + cw * k} ${y + h - 6}`} stroke="#E4D6B8" strokeWidth={3} />
          <path d={`M ${x + w / 2 - cw * k} ${y + 6} L ${x + w / 2 - cw * k} ${y + h - 6}`} stroke="#E4D6B8" strokeWidth={3} />
        </g>
      ))}
      <rect x={x - w / 2 - 14} y={y + h + 6} width={w + 28} height={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
    </g>
  );
};

// small-town clapboard house for the ride; windows twitch when the boy is near
const HOUSE_COLS = ["#F4E6C8", "#CFE3E8", "#F6D9A8", "#E8D0D6"];
const ROOF_COLS = ["#7E2E22", "#2E4A6B", "#5B4636", "#6A3A52"];
const TownHouse: React.FC<{ x: number; base: number; k: number; boyX: number }> = ({ x, base, k, boyX }) => {
  const Wd = 460;
  const top = base - 440;
  const near = (wx: number) => interpolate(Math.abs(wx - boyX), [60, 300], [1, 0], clamp);
  return (
    <g>
      <path d={`M ${x - Wd / 2 - 34} ${top + 4} L ${x} ${top - 200} L ${x + Wd / 2 + 34} ${top + 4} Z`} fill={ROOF_COLS[k % 4]} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={x - Wd / 2} y={top} width={Wd} height={440} fill={HOUSE_COLS[k % 4]} stroke={INK} strokeWidth={6} />
      {new Array(9).fill(0).map((_, r) => (
        <path key={r} d={`M ${x - Wd / 2} ${top + 44 + r * 44} L ${x + Wd / 2} ${top + 44 + r * 44}`} stroke="#000" strokeWidth={3} opacity={0.08} />
      ))}
      <Win x={x - 120} y={top + 50} open={near(x - 120)} />
      <Win x={x + 120} y={top + 50} open={near(x + 120) * (k % 2 ? 1 : 0.6)} who={k % 2 === 1} />
      <Win x={x - 120} y={top + 250} open={near(x - 140)} who={k % 2 === 0} />
      <rect x={x + 60} y={base - 220} width={110} height={220} fill={k % 2 ? DOOR : "#8B3A2B"} stroke={INK} strokeWidth={6} />
      <circle cx={x + 76} cy={base - 108} r={7} fill={BRASS} stroke={INK} strokeWidth={2} />
      <rect x={x - Wd / 2 - 14} y={base - 250} width={Wd + 28} height={22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      {[-Wd / 2 + 6, 20, Wd / 2 - 14].map((px) => (
        <rect key={px} x={x + px} y={base - 230} width={14} height={230} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
      ))}
      <rect x={x - Wd / 2 - 10} y={base - 14} width={Wd + 20} height={18} fill={PORCH_D} stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Tree: React.FC<{ x: number; base: number; s?: number }> = ({ x, base, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <rect x={-16} y={-200} width={32} height={200} fill="#7A5232" stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-280} r={120} fill="#5E9E48" stroke={INK} strokeWidth={6} />
    <circle cx={-70} cy={-220} r={70} fill="#6FB050" stroke={INK} strokeWidth={5} />
    <circle cx={70} cy={-230} r={76} fill="#6FB050" stroke={INK} strokeWidth={5} />
  </g>
);

// porch set: clapboard wall + front door on the right (door x0..x1), window in the door with curtains
const PorchSet: React.FC<{ f: number; dur: number; curtain: number; shake?: number; dusk?: boolean; open?: number }> = ({ f, curtain, shake = 0, dusk = false, open = 0 }) => {
  const wall = dusk ? "#D9B48E" : WALL;
  const x0 = 680;
  const x1 = 1040;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1660} fill={wall} />
      {new Array(30).fill(0).map((_, r) => (
        <path key={r} d={`M 0 ${40 + r * 54} L 1080 ${40 + r * 54}`} stroke="#000" strokeWidth={4} opacity={0.07} />
      ))}
      {/* door frame */}
      <rect x={x0 - 34} y={560} width={x1 - x0 + 68} height={1110} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
      <rect x={x0} y={600} width={x1 - x0} height={1060} fill={open > 0 ? GLOW : "#2A2420"} stroke={INK} strokeWidth={6} />
      <g transform={`translate(${x0 + shake} 0) scale(${1 - open * 0.8} 1)`}>
        <rect x={0} y={600} width={x1 - x0} height={1060} fill={DOOR} stroke={INK} strokeWidth={6} />
        <rect x={40} y={1040} width={x1 - x0 - 80} height={240} rx={8} fill={DOOR_D} stroke={INK} strokeWidth={4} />
        <rect x={40} y={1320} width={x1 - x0 - 80} height={280} rx={8} fill={DOOR_D} stroke={INK} strokeWidth={4} />
        {open < 0.05 ? (
          <g transform={`translate(${-x0} 0)`}>
            <Win x={(x0 + x1) / 2} y={660} w={240} h={300} open={curtain} lit={dusk ? "#FFD27A" : "#F2D9A8"} />
          </g>
        ) : null}
        <circle cx={34} cy={1180} r={16} fill={BRASS} stroke={INK} strokeWidth={4} />
      </g>
      {/* porch floor */}
      <rect x={0} y={1660} width={1080} height={260} fill={PORCH} />
      {new Array(6).fill(0).map((_, r) => (
        <path key={r} d={`M 0 ${1700 + r * 44} L 1080 ${1700 + r * 44}`} stroke={PORCH_D} strokeWidth={5} />
      ))}
      <path d="M 0 1660 L 1080 1660" stroke={INK} strokeWidth={7} />
      <rect x={x0 - 10} y={1664} width={x1 - x0 + 20} height={44} rx={6} fill="#8A5A3A" stroke={INK} strokeWidth={4} />
      {/* porch post + railing on the left */}
      <rect x={20} y={0} width={64} height={1664} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <rect x={84} y={1330} width={420} height={24} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      {new Array(7).fill(0).map((_, k) => (
        <rect key={k} x={112 + k * 56} y={1354} width={18} height={306} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
      ))}
      {/* sunlight shaft */}
      {!dusk ? <path d="M 0 0 L 420 0 L 900 1920 L 300 1920 Z" fill="#FFF3C4" opacity={0.18 + Math.sin(f / 30) * 0.03} /> : null}
    </>
  );
};

// telegraph office printer spitting tape
const Printer: React.FC<{ x: number; y: number; f: number; tape: number }> = ({ x, y, f, tape }) => {
  const jig = Math.sin(f * 1.7) * 2;
  const pts: string[] = [];
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const L = 40 + tape * 900 * t;
    pts.push(`${x + 150 + Math.sin(t * 9 + f / 6) * 26 + t * 120} ${y - 70 + L * 0.9}`);
  }
  return (
    <g>
      <path d={`M ${pts.join(" L ")}`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${pts.join(" L ")}`} stroke="#FFFDF2" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${x} ${y + jig * 0.5})`}>
        <rect x={-150} y={-200} width={320} height={200} rx={20} fill="#4F6B5E" stroke={INK} strokeWidth={7} />
        <rect x={-120} y={-170} width={170} height={70} rx={8} fill="#2E3F37" stroke={INK} strokeWidth={4} />
        <circle cx={110} cy={-150} r={30} fill="#D9CDB0" stroke={INK} strokeWidth={5} />
        <path d={`M 110 -150 L ${110 + 22 * Math.cos(f / 2)} ${-150 + 22 * Math.sin(f / 2)}`} stroke={INK} strokeWidth={5} />
        {new Array(8).fill(0).map((_, k) => (
          <circle key={k} cx={-110 + k * 34} cy={-50 + (k % 2) * 4 + (Math.floor(f / 2 + k) % 3 === 0 ? 4 : 0)} r={12} fill="#E9E1CC" stroke={INK} strokeWidth={3} />
        ))}
        <text x={-35} y={-124} textAnchor="middle" fontFamily={typeFont} fontSize={26} fill="#FFD983">
          TELEGRAPH
        </text>
      </g>
    </g>
  );
};

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep021sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8FC3E0" />
      <stop offset="0.6" stopColor="#CFE6EE" />
      <stop offset="1" stopColor="#FBE3B8" />
    </linearGradient>
    <linearGradient id="ep021dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5F6696" />
      <stop offset="0.55" stopColor="#D98E7A" />
      <stop offset="1" stopColor="#F6C487" />
    </linearGradient>
    <linearGradient id="ep021modern" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFB38A" />
      <stop offset="0.55" stopColor="#FF8F8F" />
      <stop offset="1" stopColor="#B78CE8" />
    </linearGradient>
    <linearGradient id="ep021screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3C6FB5" />
      <stop offset="1" stopColor="#7FC8C2" />
    </linearGradient>
    <radialGradient id="ep021glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#FFE9A8" stopOpacity="0.95" />
      <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
    </radialGradient>
  </defs>
);

// woman's silhouette in a lit doorway (never a face): hand raised to her mouth
const Mother: React.FC<{ x: number; y: number; s?: number; slump: number }> = ({ x, y, s = 1, slump }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-slump * 4})`}>
    <path d="M -70 0 Q -90 -260 -60 -420 Q 0 -460 60 -420 Q 90 -260 80 0 Z" fill={SIL} />
    <circle cx={0} cy={-500} r={56} fill={SIL} />
    <path d="M -44 -530 Q 0 -590 46 -530 Q 50 -500 40 -480 Q 0 -560 -40 -480 Z" fill="#3A2836" />
    <path d={`M 50 -400 Q 96 -${330 + slump * 40} 30 -${470 + slump * 10}`} stroke={SIL} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M -50 -400 Q -80 -300 -40 -250" stroke={SIL} strokeWidth={34} fill="none" strokeLinecap="round" />
    <Envelope x={-30} y={-236} s={0.55} rot={-24} label={false} />
  </g>
);

// modern phone held in a hand; notification banner pops in (banner 0..1)
const Phone: React.FC<{ x: number; y: number; s?: number; banner: number; f: number }> = ({ x, y, s = 1, banner, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-262} y={-520} width={524} height={1040} rx={72} fill="#16161C" stroke={INK} strokeWidth={8} />
    <rect x={-238} y={-496} width={476} height={992} rx={54} fill="url(#ep021screen)" />
    <rect x={-60} y={-480} width={120} height={30} rx={15} fill="#16161C" />
    <circle cx={-120} cy={260} r={180} fill="#FFFFFF" opacity={0.08} />
    <text x={0} y={-310} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={150} fill="#FFFFFF">
      9:41
    </text>
    <text x={0} y={-250} textAnchor="middle" fontFamily={bodyFont} fontWeight={500} fontSize={36} fill="#FFFFFF" opacity={0.9}>
      Monday
    </text>
    {banner > 0 ? (
      <g transform={`translate(0 ${-130 - (1 - banner) * 80}) scale(${0.85 + banner * 0.15})`} opacity={banner}>
        <rect x={-214} y={-70} width={428} height={150} rx={34} fill="#FFFFFF" opacity={0.96} stroke={INK} strokeWidth={4} />
        <Envelope x={-148} y={4} s={0.56} rot={0} label={false} />
        <text x={-82} y={-10} fontFamily={bodyFont} fontWeight={900} fontSize={34} fill={INK}>
          New message
        </text>
        <text x={-82} y={36} fontFamily={bodyFont} fontWeight={500} fontSize={28} fill="#555">
          now · 1 notification
        </text>
      </g>
    ) : null}
    {banner > 0.5 ? (
      <g opacity={0.5 + Math.sin(f / 2) * 0.3}>
        <path d="M 290 -300 q 30 30 0 60 M 320 -320 q 46 50 0 100 M -290 -300 q -30 30 0 60 M -320 -320 q -46 50 0 100" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    ) : null}
    {/* hand */}
    <path d="M -300 380 Q -330 240 -262 200 L -262 470 Q -200 560 -120 600 L 200 640 Q 300 520 262 360 L 262 470 Z" fill={SKIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[120, 200, 280].map((fy) => (
      <rect key={fy} x={238} y={fy} width={60} height={64} rx={30} fill={SKIN} stroke={INK} strokeWidth={6} />
    ))}
    <path d="M -262 160 Q -330 220 -292 330 Q -270 360 -240 330 Z" fill={SKIN} stroke={INK} strokeWidth={6} />
  </g>
);

export const TelegraphBoy: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "door";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let answerLayer: React.ReactNode = null;

  if (mode === "door") {
    // frame 0: the messenger fills the frame on a front porch, yellow envelope up; a curtain twitches; he knocks
    const knockAt = (v.knockAt ?? 0.42) * dur;
    const curtainAt = (v.curtainAt ?? 0.18) * dur;
    const kn = [0, 6, 12].reduce((m, d) => Math.max(m, interpolate(f - knockAt - d, [0, 2, 5], [0, 1, 0], clamp)), 0);
    const reach = ease(f, knockAt - 7, knockAt);
    const curtain = ease(f, curtainAt, curtainAt + 9);
    body = (
      <>
        <PorchSet f={f} dur={dur} curtain={curtain} shake={kn * 5} />
        <Bike x={v.bikeX ?? 230} y={1760} s={0.95} rot={-2} />
        <Boy x={v.boyX ?? 380} y={v.boyY ?? 1812} s={v.boyS ?? 1.9} f={f} pose="knock" reach={reach} knock={kn} look={1} />
      </>
    );
  } else if (mode === "ride") {
    // a sunny small-town street; he pedals past, and in every window a curtain twitches
    const scroll = f * (v.speed ?? 11);
    const base = 1440;
    const boyX = v.riderX ?? 440;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep021sky)" />
        <circle cx={880} cy={560} r={260} fill="url(#ep021glow)" />
        <circle cx={880} cy={560} r={80} fill="#FFE7A0" stroke={INK} strokeWidth={5} />
        {[0, 1, 2, 3, 4].map((i) => {
          const hx = 250 + i * 620 - scroll;
          if (hx < -600 || hx > 1700) return null;
          return (
            <g key={i}>
              <Tree x={hx + 330} base={base} s={0.9} />
              <TownHouse x={hx} base={base} k={i} boyX={boyX + 40} />
            </g>
          );
        })}
        <rect x={0} y={base} width={1080} height={70} fill={LAWN} stroke={INK} strokeWidth={5} />
        <rect x={0} y={base + 70} width={1080} height={70} fill="#E3D9C6" stroke={INK} strokeWidth={5} />
        <rect x={0} y={base + 140} width={1080} height={480} fill="#9C968C" />
        {new Array(6).fill(0).map((_, k) => {
          const dx = ((k * 300 - scroll * 1.3) % 1800 + 1800) % 1800 - 300;
          return <rect key={k} x={dx} y={base + 400} width={150} height={18} rx={8} fill="#F2E6C2" />;
        })}
        {new Array(5).fill(0).map((_, k) => {
          const yy = 1060 + k * 110;
          const xx = 240 - (((f * 30 + k * 170) % 500));
          return <path key={k} d={`M ${xx} ${yy} L ${xx + 160} ${yy}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.75} />;
        })}
        <Rider x={boyX} y={1800} s={v.riderS ?? 1.5} f={f} speed={1.2} />
      </>
    );
  } else if (mode === "telegram") {
    // the telegram itself: tape strips typed onto the form, one by one
    const lines: string[] = v.lines ?? ["THE SECRETARY OF WAR DESIRES ME", "TO EXPRESS HIS DEEP REGRET", "THAT YOUR SON . . ."];
    const at: number[] = v.lineAt ?? [0.06, 0.3, 0.54];
    const cardIn = popIn(f, 0, 10);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#E9D3A8" />
        <rect x={0} y={1380} width={1080} height={540} fill="#9A6A3E" />
        <path d="M 0 1380 L 1080 1380" stroke={INK} strokeWidth={8} />
        <circle cx={540} cy={900} r={620} fill="url(#ep021glow)" opacity={0.6} />
        <g transform={`translate(540 ${v.cardY ?? 900}) rotate(-2.5) scale(${0.7 + cardIn * 0.3})`} opacity={cardIn}>
          <rect x={-450} y={-400} width={900} height={760} rx={10} fill="#000" opacity={0.18} transform="translate(16 20)" />
          <rect x={-450} y={-400} width={900} height={760} rx={10} fill="#FBEFC4" stroke={INK} strokeWidth={8} />
          <text x={0} y={-292} textAnchor="middle" fontFamily={titleFont} fontSize={92} fill={INK} letterSpacing={6}>
            TELEGRAM
          </text>
          <path d="M -400 -256 L 400 -256 M -400 -244 L 400 -244" stroke={INK} strokeWidth={4} />
          <text x={-400} y={-190} fontFamily={typeFont} fontSize={34} fill="#5A4A32">
            {v.from ?? "FROM: WAR DEPARTMENT"}
          </text>
          <Envelope x={330} y={-200} s={0.6} rot={8} label={false} />
          {lines.map((t, i) => {
            const start = (at[i] ?? 0.1 + i * 0.25) * dur;
            const n = Math.floor(interpolate(f, [start, start + Math.max(6, t.length * 0.55)], [0, t.length], clamp));
            if (n <= 0) return null;
            const yy = -110 + i * 120;
            return (
              <g key={i}>
                <rect x={-410} y={yy - 50} width={820} height={76} fill="#FFFDF4" stroke="#B9AD8E" strokeWidth={3} />
                <text x={-390} y={yy + 4} fontFamily={typeFont} fontSize={44} fill={INK} textLength={n === t.length ? 780 : undefined} lengthAdjust="spacingAndGlyphs">
                  {t.slice(0, n)}
                </text>
              </g>
            );
          })}
        </g>
      </>
    );
  } else if (mode === "office") {
    // the telegraph office: the printer will not stop; the stack of envelopes grows; a counter runs to 60+
    const p = f / Math.max(1, dur);
    const countEnd = (v.countEnd ?? 0.62) * dur;
    const to = v.countTo ?? 60;
    const count = Math.round(interpolate(f, [3, countEnd], [0, to], { ...clamp, easing: Easing.out(Easing.quad) }));
    const chip = popIn(f, (v.chipAt ?? 0.7) * dur, 9);
    const skyC = interpolateColors(p, [0, 0.5, 1], ["#9CCBE6", "#F2B27A", "#5E5C8E"]);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#E9CFA0" />
        {new Array(12).fill(0).map((_, k) => (
          <rect key={k} x={k * 96} y={0} width={34} height={1260} fill="#E0C391" />
        ))}
        <rect x={70} y={760} width={330} height={380} fill={skyC} stroke={INK} strokeWidth={8} />
        <path d="M 235 760 L 235 1140 M 70 950 L 400 950" stroke="#FFFFFF" strokeWidth={12} />
        <rect x={56} y={1140} width={358} height={22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <g transform="translate(560 900)">
          <circle r={96} fill="#FFF8E6" stroke={INK} strokeWidth={9} />
          {new Array(12).fill(0).map((_, k) => (
            <path key={k} d={`M ${78 * Math.cos(rad(k * 30))} ${78 * Math.sin(rad(k * 30))} L ${88 * Math.cos(rad(k * 30))} ${88 * Math.sin(rad(k * 30))}`} stroke={INK} strokeWidth={5} />
          ))}
          <path d={`M 0 0 L ${46 * Math.sin(rad(p * 600))} ${-46 * Math.cos(rad(p * 600))}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          <path d={`M 0 0 L ${70 * Math.sin(rad(p * 7200))} ${-70 * Math.cos(rad(p * 7200))}`} stroke={C.brick} strokeWidth={7} strokeLinecap="round" />
          <circle r={9} fill={INK} />
        </g>
        <Boy x={v.boyX ?? 830} y={1700} s={v.boyS ?? 1.3} f={f} pose="hold" look={-1} />
        <Printer x={230} y={1250} f={f} tape={p} />
        <rect x={0} y={1250} width={1080} height={44} fill="#B07A45" stroke={INK} strokeWidth={7} />
        <rect x={0} y={1294} width={1080} height={626} fill="#8E5E34" />
        {[60, 400, 740].map((px) => (
          <rect key={px} x={px} y={1340} width={280} height={300} rx={10} fill="#7C5029" stroke={INK} strokeWidth={5} />
        ))}
        {new Array(Math.min(14, Math.ceil(count / 5))).fill(0).map((_, k) => (
          <Envelope key={k} x={560 + (random(`st${k}`) - 0.5) * 30} y={1222 - k * 16} s={0.85} rot={(random(`sr${k}`) - 0.5) * 10} label={false} />
        ))}
        <text x={540} y={v.countY ?? 640} textAnchor="middle" fontFamily={titleFont} fontSize={250} fill={C.cream} stroke={INK} strokeWidth={16} paintOrder="stroke fill">
          {count}
          {count >= to ? "+" : ""}
        </text>
        <g transform={`translate(540 ${(v.countY ?? 640) + 64})`}>
          <rect x={-300} y={-36} width={600} height={66} rx={12} fill={C.cream} stroke={INK} strokeWidth={6} />
          <text x={0} y={12} textAnchor="middle" fontFamily={typeFont} fontSize={38} fill={INK}>
            {v.countLabel ?? "TELEGRAMS · ONE DAY"}
          </text>
        </g>
        {v.chip ? <Chip text={v.chip} x={420} y={v.chipY ?? 1120} p={chip} w={700} /> : null}
      </>
    );
  } else if (mode === "mother") {
    // dusk, the door open on warm light; a mother's silhouette; the boy, cap in hands – then he runs for the doctor
    const runAt = (v.runAt ?? 0.6) * dur;
    const running = f >= runAt;
    const rx = running ? (v.boyX ?? 360) - (f - runAt) * 34 : v.boyX ?? 360;
    const slump = ease(f, 4, 26);
    const chip = popIn(f, runAt + 2, 9);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep021dusk)" />
        <PorchSet f={f} dur={dur} curtain={0} dusk open={1} />
        <circle cx={860} cy={1120} r={520} fill="url(#ep021glow)" opacity={0.75} />
        <Mother x={v.motherX ?? 870} y={1662} s={1.15} slump={slump} />
        <g transform="translate(600 760)">
          <circle r={70} fill="url(#ep021glow)" />
          <rect x={-20} y={-34} width={40} height={60} rx={8} fill="#FFE9A8" stroke={INK} strokeWidth={5} />
        </g>
        {running
          ? new Array(4).fill(0).map((_, k) => (
              <path key={k} d={`M ${rx + 150} ${1260 + k * 90} L ${rx + 320} ${1260 + k * 90}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.8} />
            ))
          : null}
        <Boy x={rx} y={1812} s={v.boyS ?? 1.55} f={f} pose={running ? "run" : "bow"} facing={running ? -1 : 1} env={false} />
        {v.chip ? <Chip text={v.chip} x={540} y={v.chipY ?? 560} p={chip} w={720} rot={3} /> : null}
      </>
    );
  } else if (mode === "phone") {
    // twist: the yellow envelope → today's phone notification
    const answerAt = (v.answerAt ?? 0.45) * dur;
    if (f < answerAt) {
      const wob = Math.sin(f / 4) * 3;
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#E9D3A8" />
          <circle cx={540} cy={1050} r={560} fill="url(#ep021glow)" />
          <Envelope x={540} y={1060} s={3.6 + f * 0.01} rot={-6 + wob} />
        </>
      );
    } else {
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      const banner = popIn(f, answerAt + 6, 10);
      const chip = popIn(f, answerAt + (v.chipDelay ?? 14), 9);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep021modern)" />
          {new Array(10).fill(0).map((_, k) => (
            <circle key={k} cx={random(`c${k}`) * 1080} cy={random(`d${k}`) * 1920} r={20 + random(`r${k}`) * 50} fill="#FFFFFF" opacity={0.12} />
          ))}
          <Phone x={540} y={v.phoneY ?? 1170} s={v.phoneS ?? 0.98} banner={banner} f={f} />
          {v.chip ? <Chip text={v.chip} x={540} y={v.chipY ?? 520} p={chip} w={720} /> : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
      if (v.answer) {
        answerLayer = (
          <Sequence from={Math.round(answerAt)} layout="none">
            <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 100} />
          </Sequence>
        );
      }
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {answerLayer}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
