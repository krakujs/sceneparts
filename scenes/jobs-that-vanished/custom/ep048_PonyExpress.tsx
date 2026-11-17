import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep048 Pony Express rider – a young rider flat over a galloping horse with the leather mochila, ~2,000 miles in ~10 days,
// a fresh horse every 10–15 miles, blizzards / desert / ambush, the no-cursing-no-booze oath – and the wire that killed the job
// (today: a text in one second).
// visual: { mode: "gallop" | "map" | "swap" | "storm" | "oath" | "wire", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "alt",
//           answer?, answerAccent?, answerAt?, answerSize? (wire) }
// Ambush is shown only as whizzing streaks – no attackers drawn.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const HORSE = "#A3582B";
const HORSE_D = "#7A3E1C";
const HORSE_HI = "#C9834C";
const GREY = "#E4DCCB";
const GREY_D = "#B8AC96";
const GREY_HI = "#F6F1E6";
const MANE = "#2E1B10";
const MANE_G = "#6E6458";
const HOOF = "#3A2A20";
const SKIN = "#EDB98E";
const SKIN_D = "#CF9466";
const HAIR = "#7A4A22";
const SHIRT = "#3F7FB8";
const SHIRT_D = "#2C5F8C";
const PANTS = "#6B4A2E";
const BOOT = "#3B2416";
const HAT = "#C99A58";
const HAT_D = "#9A7038";
const BANDANA = "#D63A2A";
const LEATHER = "#8E5A2A";
const LEATHER_D = "#653F1C";
const LEATHER_HI = "#B07A42";
const BRASS = "#E8B940";
const WOOD = "#8A5A34";
const WOOD_D = "#6A4224";
const SAGE = "#8DA466";
const SAGE_D = "#66804A";
const PAPER = "#FBF3DF";
const BLUE = "#2F8CF0";

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wrap = (v: number, m: number) => ((v % m) + m) % m;

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side = "alt" }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 64, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// ---------- horse ----------
// two-segment leg from hip h: a1 = thigh angle from straight down (+ = forward), a2 = shin bend relative to the thigh
const Leg: React.FC<{ h: P; l1: number; l2: number; a1: number; a2: number; w1: number; w2: number; col: string }> = ({ h, l1, l2, a1, a2, w1, w2, col }) => {
  const k: P = [h[0] + l1 * Math.sin(rad(a1)), h[1] + l1 * Math.cos(rad(a1))];
  const ft: P = [k[0] + l2 * Math.sin(rad(a1 + a2)), k[1] + l2 * Math.cos(rad(a1 + a2))];
  return (
    <g>
      <path d={`M ${h[0]} ${h[1]} L ${k[0]} ${k[1]}`} stroke={INK} strokeWidth={w1 + 13} strokeLinecap="round" />
      <path d={`M ${k[0]} ${k[1]} L ${ft[0]} ${ft[1]}`} stroke={INK} strokeWidth={w2 + 13} strokeLinecap="round" />
      <path d={`M ${h[0]} ${h[1]} L ${k[0]} ${k[1]}`} stroke={col} strokeWidth={w1} strokeLinecap="round" />
      <path d={`M ${k[0]} ${k[1]} L ${ft[0]} ${ft[1]}`} stroke={col} strokeWidth={w2} strokeLinecap="round" />
      <g transform={`translate(${ft[0]} ${ft[1]}) rotate(${-(a1 + a2)})`}>
        <path d="M -24 -10 L 24 -10 L 30 24 L -30 24 Z" fill={HOOF} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  );
};

type Gait = "gallop" | "stand" | "brake" | "tired";
// [a1, a2] for a leg at gait phase t (cycles) with offset off
const legAng = (gait: Gait, t: number, front: boolean, off: number): [number, number] => {
  if (gait === "stand" || gait === "tired") return front ? [3, 0] : [-8, 10];
  if (gait === "brake") return front ? [34, -6] : [26, 6];
  const p = 2 * Math.PI * (t - off);
  const s = Math.sin(p);
  const fold = Math.pow(Math.max(0, Math.cos(p)), 1.5);
  return front ? [12 + 44 * s, -118 * fold] : [-10 + 38 * s, 16 - 82 * fold];
};

// silhouette parts (facing right, origin = barrel centre)
const BODY_PARTS = (head: number) => [
  <ellipse key="b" cx={0} cy={0} rx={238} ry={118} />,
  <circle key="r" cx={-188} cy={-16} r={122} />,
  <circle key="c" cx={176} cy={-4} r={116} />,
  <path key="n" d={`M 105 -60 C 150 -170 ${215} ${-262 + head} ${288} ${-322 + head} L ${392} ${-262 + head} C 345 -190 300 -90 272 24 Z`} />,
  <path key="h" d={`M 272 ${-334 + head} C 310 ${-374 + head} 372 ${-362 + head} 398 ${-324 + head} L 506 ${-206 + head} C 524 ${-180 + head} 508 ${-150 + head} 480 ${-150 + head} C 452 ${-150 + head} 432 ${-160 + head} 412 ${-172 + head} L 300 ${-248 + head} Z`} />,
];

type Face = "shout" | "grin" | "shock" | "grit" | "calm";
type RiderPose = "crouch" | "upright" | "duck" | "jump";

const Horse: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  gait?: Gait;
  stride?: number;
  grey?: boolean;
  flip?: boolean;
  mochila?: boolean;
  rider?: RiderPose | null;
  face?: Face;
}> = ({ x, y, s = 1, f, gait = "gallop", stride = 13, grey = false, flip = false, mochila = true, rider = "crouch", face = "shout" }) => {
  const col = grey ? GREY : HORSE;
  const dark = grey ? GREY_D : HORSE_D;
  const hi = grey ? GREY_HI : HORSE_HI;
  const mane = grey ? MANE_G : MANE;
  const t = f / stride;
  const run = gait === "gallop";
  const bob = run ? 12 * Math.cos(2 * Math.PI * t) : 0;
  const pitch = run ? 3 * Math.sin(2 * Math.PI * t) : gait === "brake" ? -7 : 0;
  const head = gait === "tired" ? 70 : gait === "brake" ? -30 : run ? 6 * Math.sin(2 * Math.PI * t + 1) : 0;
  const tw = run ? 18 * Math.sin(f / 2.2) : 6 * Math.sin(f / 9);
  const tailLift = run ? 0 : 60;
  const legs: { h: P; front: boolean; off: number; far: boolean }[] = [
    { h: [-150, 40], front: false, off: 0, far: true },
    { h: [205, 55], front: true, off: 0.5, far: true },
    { h: [-185, 45], front: false, off: 0.1, far: false },
    { h: [170, 60], front: true, off: 0.6, far: false },
  ];
  const parts = BODY_PARTS(head);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${bob}) rotate(${pitch})`}>
        {legs.map((L, i) => {
          const [a1, a2] = legAng(gait, t, L.front, L.off);
          return <Leg key={i} h={L.h} l1={L.front ? 150 : 162} l2={L.front ? 152 : 158} a1={a1} a2={a2} w1={L.front ? 70 : 84} w2={40} col={L.far ? dark : col} />;
        })}
        {/* tail */}
        <path
          d={`M -290 -70 C -360 ${-150 + tw + tailLift} -450 ${-110 + tw + tailLift * 1.6} -530 ${-130 + 2 * tw + tailLift * 2.6} C -480 ${-60 + tw + tailLift * 2} -410 ${-10 + tailLift} -300 -14 Z`}
          fill={mane}
          stroke={INK}
          strokeWidth={8}
          strokeLinejoin="round"
        />
        <path d={`M -320 -46 C -390 ${-80 + tw + tailLift} -440 ${-70 + tw + tailLift * 1.6} -490 ${-96 + 2 * tw + tailLift * 2.4}`} stroke={dark} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* body silhouette: ink pass, then colour pass */}
        <g fill={INK} stroke={INK} strokeWidth={15} strokeLinejoin="round">{parts}</g>
        <g fill={col}>{parts}</g>
        {/* shading: thigh + shoulder + belly */}
        <path d="M -250 -70 Q -120 -20 -150 108" stroke={dark} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d="M 150 -90 Q 120 20 170 100" stroke={dark} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d="M -60 112 Q 40 126 120 104" stroke={dark} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5} />
        <path d="M -220 -110 Q -120 -132 -20 -118" stroke={hi} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* head details */}
        <g transform={`translate(0 ${head})`}>
          <path d="M 450 -216 L 506 -206 C 524 -180 508 -150 480 -150 C 458 -150 440 -158 424 -170 Z" fill={dark} />
          <path d="M 352 -336 L 468 -214 L 450 -206 L 340 -322 Z" fill="#FFFFFF" opacity={0.9} />
          <path d={gait === "gallop" ? "M 296 -328 L 238 -370 L 322 -346 Z" : "M 300 -330 L 296 -404 L 334 -342 Z"} fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <circle cx={350} cy={-298} r={12} fill={INK} />
          <circle cx={354} cy={-302} r={4} fill="#FFFFFF" />
          <ellipse cx={494} cy={-186} rx={10} ry={6} fill={INK} transform="rotate(40 494 -186)" />
          <path d="M 462 -158 Q 480 -152 500 -160" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          {/* bridle */}
          <path d="M 318 -336 L 410 -214 M 420 -236 L 466 -168" stroke={LEATHER_D} strokeWidth={11} strokeLinecap="round" />
          <circle cx={466} cy={-168} r={9} fill={BRASS} stroke={INK} strokeWidth={4} />
        </g>
        {/* mane tufts along the neck, blown back */}
        {new Array(7).fill(0).map((_, i) => {
          const u = i / 6;
          const bx = lerp(292, 116, u);
          const by = lerp(-326 + head, -74, u);
          const nx = lerp(292, 116, Math.min(1, u + 0.17));
          const ny = lerp(-326 + head, -74, Math.min(1, u + 0.17));
          const fl = run ? 14 * Math.sin(f / 2 + i * 1.3) : 3 * Math.sin(f / 8 + i);
          const tx = (bx + nx) / 2 - (run ? 46 : 30) + fl * 0.6;
          const ty = (by + ny) / 2 - (run ? 30 : -10) + fl * 0.4;
          return <path key={i} d={`M ${bx + 6} ${by + 6} L ${tx} ${ty} L ${nx + 6} ${ny + 8} Z`} fill={mane} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
        })}
        <path d={`M 300 ${-332 + head} q 30 30 40 70`} stroke={mane} strokeWidth={16} fill="none" strokeLinecap="round" />
        {mochila || rider ? (
          <g transform="translate(-15 -125)">
            {mochila ? <Mochila f={f} run={run} /> : <Saddle />}
            {rider ? <Rider f={f} pose={rider} face={face} run={run} reinTo={[483, -51 + head]} /> : null}
          </g>
        ) : null}
      </g>
    </g>
  );
};

// ---------- saddle, mochila, rider (origin = the seat) ----------
const Saddle: React.FC = () => (
  <g>
    <path d="M -110 10 Q -20 -10 120 6 L 130 70 Q 0 86 -120 70 Z" fill={LEATHER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -100 -26 Q -40 10 60 6 Q 110 -10 126 -30 L 130 0 Q 20 30 -110 18 Z" fill={LEATHER_D} stroke={INK} strokeWidth={6} />
    <circle cx={124} cy={-30} r={14} fill={LEATHER_D} stroke={INK} strokeWidth={5} />
  </g>
);

// the mochila: a leather cover thrown over the saddle with a padlocked mail pocket (cantina) in front of and behind the rider's leg
export const Mochila: React.FC<{ f: number; run?: boolean; s?: number }> = ({ f, run = true, s = 1 }) => {
  const fl = run ? Math.sin(f / 1.8) * 9 : 0;
  const Cantina: React.FC<{ x: number; lock?: boolean }> = ({ x, lock }) => (
    <g transform={`translate(${x} ${40 + fl * 0.4})`}>
      <rect x={0} y={0} width={88} height={102} rx={12} fill={LEATHER} stroke={INK} strokeWidth={7} />
      <path d={`M -4 4 Q 44 -6 92 4 L 92 46 Q 44 ${60 + fl * 0.3} -4 46 Z`} fill={LEATHER_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 10 64 L 78 64 M 10 84 L 78 84" stroke={LEATHER_HI} strokeWidth={4} strokeDasharray="8 7" />
      <rect x={34} y={38} width={20} height={22} rx={4} fill={BRASS} stroke={INK} strokeWidth={4} />
      {lock ? (
        <g transform={`translate(44 ${66 + fl * 0.5})`}>
          <path d="M -12 0 L -12 -12 Q 0 -26 12 -12 L 12 0" stroke={INK} strokeWidth={6} fill="none" />
          <rect x={-18} y={-2} width={36} height={30} rx={6} fill={BRASS} stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={11} r={4} fill={INK} />
        </g>
      ) : null}
    </g>
  );
  return (
    <g transform={`scale(${s})`}>
      <path d={`M -170 8 Q 0 -12 182 8 L ${192 + fl * 0.3} ${150 + fl} Q 0 ${170 - fl} ${-178 + fl * 0.3} ${150 + fl} Z`} fill={LEATHER_HI} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -150 30 Q 0 12 164 30" stroke={LEATHER} strokeWidth={6} fill="none" strokeDasharray="12 10" />
      <Cantina x={-160} />
      <Cantina x={96} lock />
      <circle cx={130} cy={-26} r={15} fill={LEATHER_D} stroke={INK} strokeWidth={5} />
      <path d="M -118 6 Q -112 -26 -84 -30" stroke={LEATHER_D} strokeWidth={14} fill="none" strokeLinecap="round" />
    </g>
  );
};

const POSES: Record<RiderPose, { knee: P; boot: P; sh: P; head: P; el: P; hand: P; hat: number }> = {
  crouch: { knee: [82, 74], boot: [62, 184], sh: [108, -168], head: [156, -252], el: [210, -108], hand: [282, -80], hat: 14 },
  duck: { knee: [82, 74], boot: [62, 184], sh: [128, -134], head: [190, -200], el: [226, -78], hand: [288, -64], hat: 26 },
  upright: { knee: [82, 74], boot: [62, 184], sh: [16, -206], head: [26, -300], el: [96, -118], hand: [172, -96], hat: -6 },
  jump: { knee: [70, 96], boot: [36, 204], sh: [26, -200], head: [40, -294], el: [116, -262], hand: [170, -336], hat: -10 },
};

const HeadHat: React.FC<{ hx: number; hy: number; face: Face; tilt: number; f: number; wind: boolean }> = ({ hx, hy, face, tilt, f, wind }) => {
  const w = wind ? Math.sin(f / 1.7) * 12 : Math.sin(f / 8) * 3;
  const kx = hx - 30;
  const ky = hy + 72;
  return (
    <g>
      {/* bandana tails blowing back */}
      <path d={`M ${kx} ${ky} Q ${kx - 70} ${ky - 16 + w} ${kx - 140} ${ky - 4 + w * 1.6} L ${kx - 120} ${ky + 26 + w} Q ${kx - 64} ${ky + 26} ${kx} ${ky + 20} Z`} fill={BANDANA} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={hx - 26} y={hy + 30} width={52} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <path d={`M ${hx - 64} ${hy - 4} Q ${hx - 80} ${hy + 50} ${hx - 30} ${hy + 50} L ${hx - 20} ${hy - 30} Z`} fill={HAIR} stroke={INK} strokeWidth={5} />
      <circle cx={hx} cy={hy} r={60} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d={`M ${hx - 58} ${hy - 12} Q ${hx - 40} ${hy - 46} ${hx + 6} ${hy - 44} Q ${hx - 10} ${hy - 20} ${hx - 52} ${hy + 14} Z`} fill={HAIR} />
      <ellipse cx={hx - 30} cy={hy + 8} rx={10} ry={14} fill={SKIN_D} stroke={INK} strokeWidth={4} />
      {/* face (looking right) */}
      {face === "shock" ? (
        <>
          <circle cx={hx + 30} cy={hy - 6} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          <circle cx={hx + 34} cy={hy - 6} r={7} fill={INK} />
        </>
      ) : (
        <circle cx={hx + 30} cy={hy - 6} r={8} fill={INK} />
      )}
      <path d={face === "shock" ? `M ${hx + 12} ${hy - 34} Q ${hx + 30} ${hy - 44} ${hx + 50} ${hy - 34}` : `M ${hx + 12} ${hy - 30} L ${hx + 50} ${hy - 20}`} stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M ${hx + 56} ${hy - 6} q 18 14 0 22`} stroke={INK} strokeWidth={5} fill={SKIN} strokeLinecap="round" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={hx + 14 + k * 10} cy={hy + 16 + (k % 2) * 6} r={3} fill="#B8683E" />
      ))}
      {face === "shout" ? <path d={`M ${hx + 22} ${hy + 30} Q ${hx + 40} ${hy + 22} ${hx + 54} ${hy + 30} Q ${hx + 48} ${hy + 50} ${hx + 32} ${hy + 46} Z`} fill="#6B2A22" stroke={INK} strokeWidth={4} strokeLinejoin="round" /> : null}
      {face === "grin" ? <path d={`M ${hx + 18} ${hy + 28} Q ${hx + 38} ${hy + 46} ${hx + 54} ${hy + 26} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={4} strokeLinejoin="round" /> : null}
      {face === "shock" ? <ellipse cx={hx + 36} cy={hy + 36} rx={12} ry={16} fill="#6B2A22" stroke={INK} strokeWidth={4} /> : null}
      {face === "grit" ? <rect x={hx + 20} y={hy + 26} width={34} height={14} rx={4} fill="#FFFFFF" stroke={INK} strokeWidth={4} /> : null}
      {face === "calm" ? <path d={`M ${hx + 22} ${hy + 32} Q ${hx + 38} ${hy + 38} ${hx + 52} ${hy + 30}`} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" /> : null}
      {/* cowboy hat, front brim pushed up by the wind */}
      <g transform={`translate(${hx + 4} ${hy - 44}) rotate(${tilt})`}>
        <path d="M -58 4 Q -64 -78 -10 -88 Q 30 -96 58 -82 Q 76 -58 70 4 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -10 -86 Q 4 -60 0 -40" stroke={HAT_D} strokeWidth={6} fill="none" />
        <rect x={-60} y={-22} width={130} height={20} fill={HAT_D} stroke={INK} strokeWidth={5} />
        <path d={`M -118 10 Q -50 -6 10 0 Q 80 -2 ${118} ${-34 + (wind ? w * 0.4 : 0)} Q 128 -6 104 8 Q 40 28 -20 26 Q -96 28 -118 10 Z`} fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      </g>
      {/* bandana front */}
      <path d={`M ${hx - 40} ${hy + 50} L ${hx + 40} ${hy + 46} L ${hx + 14} ${hy + 98} Z`} fill={BANDANA} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={hx + 2} cy={hy + 66} r={4} fill="#FFFFFF" />
    </g>
  );
};

const Rider: React.FC<{ f: number; pose: RiderPose; face: Face; run: boolean; reinTo?: P }> = ({ f, pose, face, run, reinTo }) => {
  const p = POSES[pose];
  const jig = run ? Math.sin(f / 2.1) * 5 : 0;
  const sh: P = [p.sh[0], p.sh[1] + jig];
  const head: P = [p.head[0], p.head[1] + jig * 1.3];
  const line = (a: P, b: P, w: number, col: string) => (
    <>
      <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 13} strokeLinecap="round" />
      <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
    </>
  );
  return (
    <g>
      {/* leg */}
      {line([0, 0], p.knee, 66, PANTS)}
      {line(p.knee, p.boot, 54, PANTS)}
      <path d={`M ${p.knee[0] - 30} ${p.knee[1] + 30} L ${p.boot[0] - 10} ${p.boot[1] + 26}`} stroke={LEATHER_D} strokeWidth={10} />
      <g transform={`translate(${p.boot[0]} ${p.boot[1]})`}>
        <path d="M -28 -56 L 26 -56 L 28 6 L 66 10 Q 76 32 52 36 L -28 36 Z" fill={BOOT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -36 30 Q 20 56 70 30" stroke={BRASS} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
      {/* torso */}
      {line([0, -10], sh, 118, SHIRT)}
      <path d={`M ${sh[0] * 0.3} ${sh[1] * 0.3 - 10} L ${sh[0] * 0.75} ${sh[1] * 0.75}`} stroke={SHIRT_D} strokeWidth={10} strokeLinecap="round" opacity={0.6} />
      <HeadHat hx={head[0]} hy={head[1]} face={face} tilt={p.hat} f={f} wind={run} />
      {/* reins + arm */}
      {reinTo ? <path d={`M ${p.hand[0]} ${p.hand[1]} Q ${(p.hand[0] + reinTo[0]) / 2} ${(p.hand[1] + reinTo[1]) / 2 + 30} ${reinTo[0]} ${reinTo[1]}`} stroke={LEATHER_D} strokeWidth={8} fill="none" /> : null}
      {line(sh, p.el, 46, SHIRT)}
      {line(p.el, p.hand, 42, SHIRT)}
      <circle cx={p.hand[0]} cy={p.hand[1]} r={25} fill={SKIN} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// ---------- landscapes (Great Basin scrub: mesas, sagebrush – no saguaros on this route) ----------
type Pal = "day" | "snow" | "desert" | "dusk" | "night";
const PALS: Record<Pal, { skyT: string; skyB: string; far: string; mesa: string; mesaD: string; ground: string; groundD: string; bush: string; bushD: string }> = {
  day: { skyT: "#F5AE58", skyB: "#FDE6B6", far: "#E9A57C", mesa: "#C96A40", mesaD: "#A24E2C", ground: "#EBC27E", groundD: "#D6A660", bush: SAGE, bushD: SAGE_D },
  snow: { skyT: "#56769F", skyB: "#C6D6E8", far: "#9DB2CB", mesa: "#E6EEF7", mesaD: "#B4C6DA", ground: "#F3F7FC", groundD: "#C7D6E7", bush: "#7D8F9E", bushD: "#5D6E7C" },
  desert: { skyT: "#FFAA2E", skyB: "#FFEDA6", far: "#F4B47C", mesa: "#DB7840", mesaD: "#B4572A", ground: "#F3D18C", groundD: "#DFB06A", bush: "#B5A15C", bushD: "#8A783E" },
  dusk: { skyT: "#5A3D7A", skyB: "#F28E5E", far: "#8E5070", mesa: "#6B3652", mesaD: "#4C2540", ground: "#C98658", groundD: "#A86844", bush: "#6E6A44", bushD: "#4E4A30" },
  night: { skyT: "#0E1730", skyB: "#30416F", far: "#29365C", mesa: "#1F2847", mesaD: "#151C34", ground: "#3F4B70", groundD: "#303A5A", bush: "#2B4A3E", bushD: "#1E3A30" },
};

const FAR: P[] = [[0, 0], [120, -90], [220, -40], [330, -150], [460, -60], [560, -120], [700, -30], [820, -140], [960, -50], [1080, 0]];

const Pole: React.FC<{ x: number; base: number; h: number; s?: number }> = ({ x, base, h, s = 1 }) => (
  <g transform={`translate(${x} ${base}) scale(${s})`}>
    <rect x={-14} y={-h} width={28} height={h} fill={WOOD} stroke={INK} strokeWidth={6} />
    <rect x={-90} y={-h + 34} width={180} height={22} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    {[-74, 74].map((k) => (
      <path key={k} d={`M ${k - 12} ${-h + 34} L ${k - 9} ${-h + 10} Q ${k} ${-h + 2} ${k + 9} ${-h + 10} L ${k + 12} ${-h + 34} Z`} fill="#7FCFB0" stroke={INK} strokeWidth={4} />
    ))}
  </g>
);

const Land: React.FC<{ f: number; pal: Pal; horizon: number; speed: number; poles?: boolean; seed: string; sunX?: number }> = ({ f, pal, horizon, speed, poles = false, seed, sunX = 800 }) => {
  const c = PALS[pal];
  const id = `ep048sky-${pal}-${seed}`;
  const farX = -wrap(f * speed * 0.05, 1080);
  const mesaX = -wrap(f * speed * 0.18, 1400);
  const poleX0 = -wrap(f * speed * 0.62, 560);
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.skyT} />
          <stop offset="100%" stopColor={c.skyB} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={horizon + 4} fill={`url(#${id})`} />
      {pal === "day" ? <circle cx={sunX} cy={horizon - 330} r={110} fill="#FFE59A" stroke="#FFF4C8" strokeWidth={20} /> : null}
      {pal === "desert" ? (
        <g transform={`translate(${sunX} ${horizon - 420})`}>
          {new Array(12).fill(0).map((_, k) => (
            <path key={k} d="M -18 -170 L 0 -250 L 18 -170 Z" fill="#FFF0A8" transform={`rotate(${k * 30 + f * 1.2})`} />
          ))}
          <circle r={150} fill="#FFF3B0" stroke="#FFFFFF" strokeWidth={18} />
        </g>
      ) : null}
      {pal === "dusk" ? <circle cx={sunX} cy={horizon - 40} r={130} fill="#FFC36A" opacity={0.9} /> : null}
      {pal === "night" ? (
        <g>
          {new Array(40).fill(0).map((_, k) => (
            <circle key={k} cx={random(`${seed}sx${k}`) * 1080} cy={random(`${seed}sy${k}`) * (horizon - 120)} r={2 + random(`${seed}sr${k}`) * 3} fill="#FFF6D8" opacity={0.5 + 0.5 * Math.sin(f / 5 + k)} />
          ))}
          <circle cx={sunX} cy={horizon - 520} r={80} fill="#FFF3C8" />
          <circle cx={sunX + 34} cy={horizon - 540} r={70} fill={c.skyT} opacity={0.0} />
        </g>
      ) : null}
      {[0, 1].map((k) => (
        <path key={k} d={`M ${farX + k * 1080} ${horizon} ${FAR.map(([x, y]) => `L ${farX + k * 1080 + x} ${horizon + y * 1.4}`).join(" ")} L ${farX + k * 1080 + 1080} ${horizon} Z`} fill={c.far} />
      ))}
      {[0, 1].map((k) => {
        const x = mesaX + k * 1400;
        return (
          <g key={k}>
            <path d={`M ${x + 80} ${horizon} L ${x + 130} ${horizon - 190} L ${x + 380} ${horizon - 190} L ${x + 430} ${horizon} Z`} fill={c.mesa} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d={`M ${x + 330} ${horizon - 190} L ${x + 380} ${horizon - 190} L ${x + 430} ${horizon} L ${x + 350} ${horizon} Z`} fill={c.mesaD} />
            <path d={`M ${x + 760} ${horizon} L ${x + 800} ${horizon - 120} L ${x + 940} ${horizon - 120} L ${x + 980} ${horizon} Z`} fill={c.mesa} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d={`M ${x + 1120} ${horizon} L ${x + 1150} ${horizon - 260} L ${x + 1210} ${horizon - 280} L ${x + 1250} ${horizon} Z`} fill={c.mesaD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        );
      })}
      <rect x={0} y={horizon} width={1080} height={1920 - horizon} fill={c.ground} />
      <path d={`M 0 ${horizon} L 1080 ${horizon}`} stroke={INK} strokeWidth={6} />
      {poles
        ? [0, 1, 2, 3].map((k) => {
            const x = poleX0 + k * 560;
            const top = horizon - 470;
            return (
              <g key={k}>
                {[-74, 74].map((o) => (
                  <path key={o} d={`M ${x + o} ${top + 10} Q ${x + 280 + o} ${top + 70} ${x + 560 + o} ${top + 10}`} stroke={INK} strokeWidth={4} fill="none" />
                ))}
                <Pole x={x} base={horizon + 40} h={510} />
              </g>
            );
          })
        : null}
      {new Array(10).fill(0).map((_, k) => {
        const d = random(`${seed}d${k}`);
        const y = horizon + 30 + d * (1920 - horizon - 60);
        const sc = 0.5 + d * 1.1;
        const x = wrap(k * 150 + random(`${seed}x${k}`) * 120 - f * speed * (0.35 + 0.9 * d), 1380) - 150;
        const rock = k % 3 === 0;
        return rock ? (
          <g key={k} transform={`translate(${x} ${y}) scale(${sc})`}>
            <path d="M -50 0 Q -46 -40 -6 -46 Q 40 -44 52 0 Z" fill={c.groundD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          </g>
        ) : (
          <g key={k} transform={`translate(${x} ${y}) scale(${sc})`}>
            {[-34, -12, 10, 32].map((o, j) => (
              <ellipse key={j} cx={o} cy={-26 - (j % 2) * 14} rx={26} ry={22} fill={j % 2 ? c.bushD : c.bush} stroke={INK} strokeWidth={4} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

// dust clouds kicked up behind the hooves
const Dust: React.FC<{ x: number; y: number; f: number; col?: string; s?: number }> = ({ x, y, f, col = "#E3C08A", s = 1 }) => (
  <g>
    {[0, 1, 2, 3, 4].map((k) => {
      const p = wrap(f + k * 6, 30) / 30;
      return <circle key={k} cx={x - p * 360 * s - k * 20} cy={y - p * 90 * s} r={(30 + p * 80) * s} fill={col} opacity={0.75 * (1 - p)} />;
    })}
  </g>
);

const SpeedLines: React.FC<{ f: number; y0: number; y1: number; seed: string; col?: string }> = ({ f, y0, y1, seed, col = "#FFFFFF" }) => (
  <g>
    {new Array(8).fill(0).map((_, k) => {
      const y = y0 + random(`${seed}l${k}`) * (y1 - y0);
      const len = 120 + random(`${seed}n${k}`) * 160;
      const x = 1180 - wrap(f * 60 + k * 197, 1500);
      return <path key={k} d={`M ${x} ${y} L ${x + len} ${y}`} stroke={col} strokeWidth={8} strokeLinecap="round" opacity={0.55} />;
    })}
  </g>
);

// ---------- props ----------
const Hut: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -250 -270 L 0 -400 L 250 -270 Z" fill="#7C5A3A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -230 -280 L 0 -392" stroke="#9C7A52" strokeWidth={10} />
    <rect x={-220} y={-280} width={440} height={280} fill="#B07A48" stroke={INK} strokeWidth={8} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <path key={k} d={`M -220 ${-280 + k * 46} L 220 ${-280 + k * 46}`} stroke={WOOD_D} strokeWidth={6} />
    ))}
    {[-220, 220].map((k) => (
      <g key={k}>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <circle key={r} cx={k} cy={-257 + r * 46} r={16} fill="#C99A68" stroke={INK} strokeWidth={4} />
        ))}
      </g>
    ))}
    <rect x={-60} y={-180} width={110} height={180} fill="#4A2F1C" stroke={INK} strokeWidth={7} />
    <rect x={100} y={-200} width={90} height={80} fill="#FFD983" stroke={INK} strokeWidth={7} />
    <path d="M 145 -200 L 145 -120 M 100 -160 L 190 -160" stroke={INK} strokeWidth={5} />
    <rect x={-170} y={-262} width={300} height={60} rx={6} fill={PAPER} stroke={INK} strokeWidth={6} />
    <text x={-20} y={-218} textAnchor="middle" fontFamily={titleFont} fontSize={36} fill={C.brick}>RELAY STATION</text>
  </g>
);

const Stopwatch: React.FC<{ x: number; y: number; s?: number; p: number }> = ({ x, y, s = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-138} width={44} height={36} rx={8} fill={BRASS} stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={0} r={110} fill={BRASS} stroke={INK} strokeWidth={8} />
    <circle cx={0} cy={0} r={88} fill={PAPER} stroke={INK} strokeWidth={6} />
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d="M 0 -84 L 0 -68" stroke={INK} strokeWidth={6} transform={`rotate(${k * 30})`} />
    ))}
    <path d={`M 0 0 A 70 70 0 ${p > 0.5 ? 1 : 0} 1 ${70 * Math.sin(2 * Math.PI * Math.min(p, 0.999))} ${-70 * Math.cos(2 * Math.PI * Math.min(p, 0.999))} L 0 0 Z`} fill={C.brick} opacity={0.35} transform="translate(0 0)" />
    <path d={`M 0 0 L 0 -74`} stroke={C.brick} strokeWidth={9} strokeLinecap="round" transform={`rotate(${p * 360})`} />
    <circle cx={0} cy={0} r={11} fill={INK} />
  </g>
);

const Bible: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-104} width={168} height={210} rx={10} fill="#F4ECD6" stroke={INK} strokeWidth={6} />
    <rect x={-90} y={-110} width={168} height={210} rx={10} fill="#3B2418" stroke={INK} strokeWidth={7} />
    <path d="M -6 -70 L -6 30 M -40 -36 L 28 -36" stroke={BRASS} strokeWidth={12} strokeLinecap="round" />
    <text x={-6} y={74} textAnchor="middle" fontFamily={titleFont} fontSize={24} fill={BRASS}>HOLY BIBLE</text>
  </g>
);

const Bottle: React.FC<{ x: number; y: number; s?: number; ban: number }> = ({ x, y, s = 1, ban }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -24 -250 L 24 -250 L 24 -170 Q 80 -140 80 -80 L 80 120 Q 0 140 -80 120 L -80 -80 Q -80 -140 -24 -170 Z" fill="#9B6A2A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-30} y={-290} width={60} height={46} rx={8} fill={WOOD} stroke={INK} strokeWidth={6} />
    <rect x={-70} y={-40} width={140} height={110} rx={8} fill={PAPER} stroke={INK} strokeWidth={6} />
    <text x={0} y={40} textAnchor="middle" fontFamily={titleFont} fontSize={56} fill={INK}>XXX</text>
    <path d="M -50 -110 Q -40 -150 -10 -160" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
    {ban > 0 ? (
      <g transform={`scale(${ban})`}>
        <circle cx={0} cy={-60} r={190} fill="none" stroke={C.brick} strokeWidth={30} />
        <path d="M -134 -194 L 134 74" stroke={C.brick} strokeWidth={30} strokeLinecap="round" />
      </g>
    ) : null}
  </g>
);

// standing young rider, facing the viewer (origin = between the boots). Right hand up for the oath, Bible in the left.
const OathRider: React.FC<{ x: number; y: number; s?: number; f: number; raise: number }> = ({ x, y, s = 1, f, raise }) => {
  const b = Math.sin(f / 10) * 3;
  const line = (a: P, c: P, w: number, col: string) => (
    <>
      <path d={`M ${a[0]} ${a[1]} L ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 13} strokeLinecap="round" />
      <path d={`M ${a[0]} ${a[1]} L ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
    </>
  );
  const handR: P = [lerp(-150, -210, raise), lerp(-380, -800, raise)];
  const elR: P = [lerp(-150, -250, raise), lerp(-470, -640, raise)];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {line([-46, -300], [-56, -40], 66, PANTS)}
      {line([46, -300], [56, -40], 66, PANTS)}
      {[-1, 1].map((k) => (
        <path key={k} d={`M ${k * 56 - 40} -70 L ${k * 56 + 40} -70 L ${k * 56 + 46} 0 L ${k * 56 + (k > 0 ? 90 : -90)} 4 L ${k * 56 + (k > 0 ? 90 : -90)} 24 L ${k * 56 - (k > 0 ? 44 : -44)} 24 Z`} fill={BOOT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ))}
      <g transform={`translate(0 ${b})`}>
        <path d="M -120 -590 Q 0 -620 120 -590 L 112 -290 L -112 -290 Z" fill={SHIRT} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -118 -580 L -40 -560 L -56 -292 L -112 -292 Z M 118 -580 L 40 -560 L 56 -292 L 112 -292 Z" fill={LEATHER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-116} y={-316} width={232} height={36} fill="#4A2F1C" stroke={INK} strokeWidth={6} />
        <rect x={-24} y={-320} width={48} height={44} rx={6} fill={BRASS} stroke={INK} strokeWidth={5} />
        {line([-112, -560], elR, 48, SHIRT)}
        {line(elR, handR, 44, SHIRT)}
        <g transform={`translate(${handR[0]} ${handR[1]})`}>
          {[-24, -8, 8, 24].map((o, k) => (
            <rect key={k} x={o - 8} y={-58 + Math.abs(o) * 0.6} width={16} height={44} rx={8} fill={SKIN} stroke={INK} strokeWidth={4} />
          ))}
          <circle r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
        {line([112, -560], [170, -420], 48, SHIRT)}
        {line([170, -420], [214, -470], 44, SHIRT)}
        <Bible x={262} y={-470} s={0.85} rot={8} />
        <circle cx={214} cy={-470} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* head, front view */}
        <rect x={-28} y={-630} width={56} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -60 -600 L 60 -600 L 0 -520 Z" fill={BANDANA} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <ellipse cx={-70} cy={-680} rx={16} ry={22} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <ellipse cx={70} cy={-680} rx={16} ry={22} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <ellipse cx={0} cy={-680} rx={68} ry={76} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M -66 -700 Q -50 -760 0 -756 Q 50 -760 66 -700 Q 30 -726 -66 -700 Z" fill={HAIR} />
        <circle cx={-26} cy={-690} r={8} fill={INK} />
        <circle cx={26} cy={-690} r={8} fill={INK} />
        <path d="M -44 -716 L -12 -708 M 44 -716 L 12 -708" stroke={HAIR} strokeWidth={8} strokeLinecap="round" />
        <path d="M 0 -684 q -10 22 4 26" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -22 -640 Q 0 -630 22 -640" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        {[-40, -30, 30, 40].map((o, k) => (
          <circle key={k} cx={o} cy={-664 + (k % 2) * 6} r={3} fill="#B8683E" />
        ))}
        <path d="M -150 -742 Q 0 -770 150 -742 Q 160 -724 140 -716 Q 0 -738 -140 -716 Q -160 -724 -150 -742 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -70 -748 Q -76 -830 -20 -840 Q 0 -826 20 -840 Q 76 -830 70 -748 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <rect x={-72} y={-774} width={144} height={22} fill={HAT_D} stroke={INK} strokeWidth={5} />
      </g>
    </g>
  );
};

const Phone: React.FC<{ x: number; y: number; s?: number; lf: number }> = ({ x, y, s = 1, lf }) => {
  const bub = popIn(lf, 6, 9);
  const tick = popIn(lf, 16, 8);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-210} y={-410} width={420} height={820} rx={60} fill="#1E2230" stroke={INK} strokeWidth={10} />
      <rect x={-186} y={-380} width={372} height={760} rx={40} fill="#F4F7FB" />
      <rect x={-60} y={-370} width={120} height={26} rx={13} fill="#1E2230" />
      <text x={0} y={-290} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill="#5B6478">TODAY</text>
      <path d="M -150 -260 L 150 -260" stroke="#D5DCE6" strokeWidth={4} />
      <g transform={`translate(30 -100) scale(${bub})`}>
        <path d="M -150 -80 L 140 -80 Q 166 -80 166 -54 L 166 50 Q 166 76 140 76 L -150 76 Q -176 76 -176 50 L -176 -54 Q -176 -80 -150 -80 Z" fill={BLUE} />
        <path d="M 150 60 L 186 92 L 120 72 Z" fill={BLUE} />
        <text x={-4} y={-14} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill="#FFFFFF">SENT FROM</text>
        <text x={-4} y={44} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill="#FFFFFF">MISSOURI!</text>
      </g>
      {tick > 0 ? (
        <g opacity={tick}>
          <text x={160} y={30} textAnchor="end" fontFamily={titleFont} fontSize={34} fill="#2E9E5B">DELIVERED · 1 SEC</text>
        </g>
      ) : null}
      <rect x={-150} y={250} width={300} height={70} rx={35} fill="#E6EBF2" stroke="#C9D2DE" strokeWidth={4} />
    </g>
  );
};

// ---------- the route map (St. Joseph, Missouri → Sacramento, California) ----------
const ROUTE: P[] = [[935, 1060], [830, 1004], [712, 968], [622, 924], [548, 958], [470, 984], [380, 1012], [268, 1000], [150, 1062]];
const routeLen = ROUTE.slice(1).reduce((acc, p, i) => acc + Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]), 0);
const routeAt = (p: number): P => {
  let left = p * routeLen;
  for (let i = 1; i < ROUTE.length; i++) {
    const a = ROUTE[i - 1];
    const b = ROUTE[i];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (left <= l) return [lerp(a[0], b[0], left / l), lerp(a[1], b[1], left / l)];
    left -= l;
  }
  return ROUTE[ROUTE.length - 1];
};

const Mountains: React.FC<{ x: number; y: number; n: number; s?: number }> = ({ x, y, n, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {new Array(n).fill(0).map((_, k) => (
      <g key={k} transform={`translate(${k * 46 - (n * 46) / 2} ${(k % 2) * 16})`}>
        <path d="M -34 0 L 0 -64 L 34 0 Z" fill="#B59A70" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -12 -40 L 0 -64 L 12 -40 L 4 -44 L 0 -36 L -5 -44 Z" fill="#FFFFFF" />
      </g>
    ))}
  </g>
);

const MapArt: React.FC<{ f: number; p: number; day: number }> = ({ f, p, day }) => {
  const at = routeAt(p);
  const pts = ROUTE.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <g>
      <rect x={30} y={590} width={1020} height={640} rx={20} fill="#F1DFB5" stroke={INK} strokeWidth={8} />
      <path d="M 30 610 Q 30 590 50 590 L 120 590 Q 90 700 116 820 Q 140 940 100 1060 Q 84 1150 110 1230 L 50 1230 Q 30 1230 30 1210 Z" fill="#9FCFE0" stroke={INK} strokeWidth={5} />
      <text x={66} y={900} fontFamily={typeFont} fontSize={30} fill="#3E7C94" transform="rotate(-90 66 900)" textAnchor="middle">PACIFIC</text>
      <ellipse cx={450} cy={936} rx={34} ry={22} fill="#9FCFE0" stroke={INK} strokeWidth={4} />
      <Mountains x={232} y={980} n={3} s={1} />
      <Mountains x={650} y={900} n={5} s={1} />
      <text x={360} y={1110} fontFamily={typeFont} fontSize={30} fill="#9A7A4E" textAnchor="middle">DESERT</text>
      <path d="M 890 1230 Q 900 1120 960 1060 Q 1010 1000 1000 900" stroke="#7FB8CC" strokeWidth={10} fill="none" />
      <polyline points={pts} fill="none" stroke="#C7A878" strokeWidth={10} strokeDasharray="4 18" strokeLinecap="round" />
      <polyline points={pts} fill="none" stroke={C.brick} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${routeLen} ${routeLen}`} strokeDashoffset={routeLen * (1 - p)} />
      {[ROUTE[0], ROUTE[5], ROUTE[ROUTE.length - 1]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={k === 1 ? 12 : 20} fill={k === 1 ? INK : C.mustard} stroke={INK} strokeWidth={6} />
      ))}
      <text x={1010} y={1118} fontFamily={titleFont} fontSize={40} fill={INK} textAnchor="end">ST. JOSEPH, MO</text>
      <text x={120} y={1122} fontFamily={titleFont} fontSize={40} fill={INK}>SACRAMENTO, CA</text>
      <text x={470} y={1030} fontFamily={typeFont} fontSize={26} fill={INK} textAnchor="middle">SALT LAKE CITY</text>
      <g transform={`translate(${at[0]} ${at[1] - 52})`}>
        <Horse x={0} y={0} s={0.13} f={f} flip stride={8} />
      </g>
      <g transform={`translate(540 720) scale(${1 + 0.08 * Math.max(0, 1 - ((f % 8) / 8)) * (p < 1 ? 1 : 0)})`}>
        <rect x={-150} y={-62} width={300} height={110} rx={24} fill={C.mustard} stroke={INK} strokeWidth={8} />
        <text x={0} y={28} textAnchor="middle" fontFamily={titleFont} fontSize={78} fill={INK}>DAY {day}</text>
      </g>
    </g>
  );
};

const Snow: React.FC<{ f: number; seed: string }> = ({ f, seed }) => (
  <g>
    {new Array(70).fill(0).map((_, k) => {
      const sp = 14 + (k % 5) * 4;
      const x = wrap(random(`${seed}a${k}`) * 1400 - f * sp * 0.9, 1400) - 160;
      const y = wrap(random(`${seed}b${k}`) * 2000 + f * sp, 2000) - 40;
      return <circle key={k} cx={x} cy={y} r={5 + (k % 4) * 3} fill="#FFFFFF" opacity={0.9} />;
    })}
  </g>
);

const Shimmer: React.FC<{ f: number; y0: number }> = ({ f, y0 }) => (
  <g>
    {new Array(6).fill(0).map((_, k) => (
      <path key={k} d={`M -20 ${y0 + k * 34} ${new Array(12).fill(0).map((__, i) => `Q ${i * 100 + 25} ${y0 + k * 34 + (i % 2 ? 12 : -12) * Math.sin(f / 3 + k)} ${i * 100 + 50} ${y0 + k * 34}`).join(" ")}`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.35} />
    ))}
  </g>
);

const Whiz: React.FC<{ f: number; ys: number[] }> = ({ f, ys }) => (
  <g>
    {ys.map((y, k) => {
      const lf = wrap(f + k * 7, 21);
      const x = 1200 - lf * 80;
      return (
        <g key={k} opacity={lf < 16 ? 1 : 0}>
          <path d={`M ${x} ${y} L ${x + 260} ${y}`} stroke="#FFF3C8" strokeWidth={10} strokeLinecap="round" />
          <path d={`M ${x} ${y} L ${x + 120} ${y}`} stroke="#FFFFFF" strokeWidth={14} strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

const Spark: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -180 0 L -20 0" stroke="#FFF3B0" strokeWidth={18} strokeLinecap="round" opacity={0.8} />
    <circle r={46 + Math.sin(f) * 6} fill="#FFF3B0" opacity={0.6} />
    <path d="M 8 -54 L -22 6 L 4 6 L -12 56 L 30 -10 L 4 -10 Z" fill={C.mustard} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

export const PonyExpress: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "gallop";
  const float: string[] = v.float ?? [];
  let sky: "day" | "paper" = "paper";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "gallop") {
    // frame 0: the rider flat over a galloping horse, mochila right in front of us, dust flying
    const HX = 470;
    const HY = 1210;
    body = (
      <>
        <Land f={f} pal="day" horizon={1000} speed={34} seed="hook" />
        <SpeedLines f={f} y0={680} y1={1560} seed="hook" />
        <Dust x={HX - 230} y={HY + 400} f={f} s={1.3} />
        <Horse x={HX} y={HY} s={1.1} f={f} face="shout" />
        <Dust x={HX + 120} y={HY + 420} f={f + 15} s={0.8} />
      </>
    );
  } else if (mode === "map") {
    const p = ease(f, dur * 0.08, dur * (v.mapEnd ?? 0.86));
    const day = Math.min(10, 1 + Math.floor(p * 9.999));
    body = <MapArt f={f} p={p} day={day} />;
  } else if (mode === "swap") {
    // a sweaty horse skids in, the rider leaps with the mochila onto a fresh horse, stopwatch – GO!
    const j0 = dur * (v.jumpAt ?? 0.3);
    const arrive = ease(f, 0, j0 - 4);
    const j1 = j0 + 12;
    const goAt = dur * (v.goAt ?? 0.8);
    const swAt = dur * (v.swAt ?? 0.5);
    const bx = lerp(-520, 330, arrive);
    const bayGait: Gait = f < j0 - 10 ? "gallop" : f < j0 + 6 ? "brake" : "tired";
    const q = ease(f, j0, j1);
    const jumping = f >= j0 && f < j1;
    const landed = f >= j1;
    const go = ease(f, goAt, goAt + 16);
    const gx = lerp(740, 1560, go);
    const BAY_S = 0.72;
    const GRY_S = 0.6;
    const seatB: P = [bx + BAY_S * -15, 1450 + BAY_S * -125];
    const seatG: P = [740 + GRY_S * -15, 1290 + GRY_S * -125];
    body = (
      <>
        <Land f={0} pal="day" horizon={1150} speed={0} seed="swap" sunX={220} />
        <Hut x={820} y={1200} s={0.85} />
        <g>
          <path d="M 470 1190 L 470 1290 M 640 1190 L 640 1290 M 450 1210 L 660 1210" stroke={WOOD_D} strokeWidth={16} strokeLinecap="round" />
        </g>
        <Horse x={gx} y={1290} s={GRY_S} f={f} grey gait={f >= goAt ? "gallop" : "stand"} mochila={landed} rider={landed ? (f >= goAt ? "crouch" : "upright") : null} face="grin" />
        {f >= goAt ? <Dust x={gx - 150} y={1520} f={f} s={0.8} /> : null}
        <Horse x={bx} y={1450} s={BAY_S} f={f} gait={bayGait} mochila={f < j0} rider={f < j0 ? "crouch" : null} face="grit" />
        {f < j0 ? <Dust x={bx - 140} y={1720} f={f} s={1} /> : null}
        {jumping ? (
          <g transform={`translate(${lerp(seatB[0], seatG[0], q)} ${lerp(seatB[1], seatG[1], q) - 260 * Math.sin(Math.PI * q)}) scale(${lerp(BAY_S, GRY_S, q)})`}>
            <Mochila f={f} run={false} />
            <Rider f={f} pose="jump" face="grin" run={false} />
          </g>
        ) : null}
        {f >= swAt ? (
          <g transform={`translate(220 790) scale(${popIn(f, swAt, 8)})`}>
            <Stopwatch x={0} y={0} s={1} p={ease(f, swAt, goAt)} />
          </g>
        ) : null}
      </>
    );
  } else if (mode === "storm") {
    // blizzard → scorching desert → ambush (whizzing streaks only) → night, the rider never stops
    const cuts: number[] = (v.cuts ?? [0.3, 0.55, 0.8]).map((c: number) => c * dur);
    const set = f < cuts[0] ? 0 : f < cuts[1] ? 1 : f < cuts[2] ? 2 : 3;
    const pal: Pal = (["snow", "desert", "dusk", "night"] as Pal[])[set];
    const since = f - (set === 0 ? 0 : cuts[set - 1]);
    const flash = set === 0 ? 0 : interpolate(since, [0, 5], [0.9, 0], clamp);
    const HX = 500;
    const HY = 1240;
    body = (
      <>
        <Land f={f} pal={pal} horizon={1040} speed={36} seed={`storm${set}`} sunX={set === 3 ? 820 : 780} />
        {set === 1 ? <Shimmer f={f} y0={980} /> : null}
        <SpeedLines f={f} y0={760} y1={1580} seed="storm" col={set === 3 ? "#9FB0D8" : "#FFFFFF"} />
        <Dust x={HX - 200} y={HY + 350} f={f} s={1.1} col={set === 0 ? "#FFFFFF" : set === 3 ? "#5A6890" : "#E3C08A"} />
        <Horse x={HX} y={HY} s={0.95} f={f} rider={set === 2 ? "duck" : "crouch"} face={set === 2 ? "shock" : "grit"} />
        {set === 0 ? <Snow f={f} seed="storm" /> : null}
        {set === 2 ? <Whiz f={f} ys={[880, 960, 1060]} /> : null}
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
      </>
    );
  } else if (mode === "oath") {
    // hand up, Bible in the other hand: no cursing, no booze, no fights
    const raise = ease(f, 2, dur * 0.22);
    const at: number[] = (v.itemsAt ?? [0.45, 0.66, 0.84]).map((c: number) => c * dur);
    const items = ["NO CURSING", "NO BOOZE", "NO FIGHTS"];
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#C99560" />
        {new Array(16).fill(0).map((_, k) => (
          <g key={k}>
            <rect x={-10} y={k * 110} width={1100} height={100} rx={40} fill={k % 2 ? "#B9844F" : "#C99560"} stroke={WOOD_D} strokeWidth={6} />
          </g>
        ))}
        <rect x={0} y={1700} width={1080} height={220} fill="#7A5232" />
        <path d="M 0 1700 L 1080 1700" stroke={INK} strokeWidth={6} />
        <g transform="translate(745 820) rotate(3) scale(0.9)">
          <rect x={-240} y={-290} width={480} height={580} rx={14} fill={PAPER} stroke={INK} strokeWidth={8} />
          <text x={0} y={-212} textAnchor="middle" fontFamily={typeFont} fontSize={38} fill={INK}>I DO HEREBY SWEAR…</text>
          <path d="M -190 -180 L 190 -180" stroke={INK} strokeWidth={4} />
          {items.map((t, k) => {
            const pk = popIn(f, at[k], 8);
            return (
              <g key={k} transform={`translate(0 ${-90 + k * 130})`}>
                <rect x={-200} y={-40} width={70} height={70} rx={8} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
                {pk > 0 ? (
                  <g transform={`translate(-165 -5) scale(${pk}) translate(165 5)`}>
                    <path d="M -188 -6 L -166 20 L -126 -46" stroke={C.brick} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                ) : null}
                <text x={-112} y={18} fontFamily={titleFont} fontSize={44} fill={pk > 0 ? INK : "#B9AE96"}>{t}</text>
              </g>
            );
          })}
        </g>
        <OathRider x={330} y={1830} s={1.1} f={f} raise={raise} />
        {f >= at[1] - 6 ? <Bottle x={890} y={1560} s={0.62} ban={popIn(f, at[1], 8)} /> : null}
      </>
    );
  } else if (mode === "wire") {
    // the rider races beside new telegraph poles – a spark on the wire overtakes him → (answer) the wire runs into today's phone
    const answerAt = (v.answerAt ?? 0.55) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    if (f < answerAt) {
      sky = "day";
      const sparks = [answerAt * 0.15, answerAt * 0.6];
      body = (
        <>
          <Land f={f} pal="day" horizon={1000} speed={30} poles seed="wire" />
          <Dust x={230} y={1600} f={f} s={1} />
          <Horse x={440} y={1250} s={0.9} f={f} face="grit" />
          {sparks.map((t0, k) => {
            const x = (f - t0) * 52 - 120;
            if (x < -150 || x > 1250) return null;
            return <Spark key={k} x={x} y={560} f={f} />;
          })}
        </>
      );
    } else {
      const lf = f - answerAt;
      const sp = ease(lf, 0, 7);
      const wx = (t: number): P => [lerp(244, 600, t), lerp(650, 900, t) + 120 * Math.sin(Math.PI * t)];
      const s0 = wx(sp);
      body = (
        <>
          <Land f={0} pal="desert" horizon={1300} speed={0} seed="wire2" sunX={880} />
          <path d={`M 244 650 Q 420 1010 600 900`} stroke={INK} strokeWidth={7} fill="none" />
          <Pole x={170} base={1560} h={920} />
          <Phone x={790} y={980} s={0.95} lf={lf} />
          {sp < 1 ? <Spark x={s0[0]} y={s0[1]} s={0.8} f={f} /> : null}
          <Horse x={300} y={1600} s={0.6} f={f} gait={lf < 10 ? "brake" : "stand"} rider="upright" face="shock" />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "wire" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.55) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
