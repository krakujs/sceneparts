import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep047 Roman gladiator – "barley men": a mostly plant diet, a thumb nobody can decode, blood as a "cure",
// heartthrob but still owned, and an ash drink that may have built their bones (today: a recovery shake).
// visual: { mode: "arena" | "barley" | "thumbs" | "blood" | "star" | "ash", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "alt",
//           magAt? (barley), chainAt? (star), answer?, answerAccent?, answerAt? (ash) }
// Cartoon violence only: no wounds or blood on bodies – a bandage and a red drink in a goblet at most.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#D9925E";
const SKIN_D = "#B5703F";
const HAIR = "#2B1D14";
const BRONZE = "#D6A23C";
const BRONZE_D = "#A8741E";
const BRONZE_HI = "#FFE7A3";
const RED = "#C8372D";
const RED_D = "#8F2219";
const GOLD = "#F2B544";
const CLOTH = "#F7F0DE";
const CLOTH_D = "#D8CCAE";
const WRAP = "#EFE4C8";
const SAND = "#EBC584";
const SAND_D = "#D4A863";
const STONE = "#E2CFA8";
const STONE_D = "#C4AB80";
const WOOD = "#8A5A34";
const STEEL = "#C9D0DA";
const STEEL_D = "#8C95A3";
const BARLEY = "#E8C46A";
const LEAF = "#5FA544";
const LEAF_D = "#3E7D2C";
const ASH = "#9A968E";
const ASH_D = "#6E6A63";
const CLAY = "#C4693A";
const FAN_SKIN = ["#E7B48A", "#C98D62", "#A8693F", "#F0C9A3", "#8C5634"];
const FAN_TOGA = ["#F4EEDC", "#E0C89A", "#B9D2D8", "#E8B7A0", "#D7D0E6", "#F2D27A", "#C9E0B4"];

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];
const W2 = (x: number, y: number, s: number, p: P): P => [x + p[0] * s, y + p[1] * s];

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

// a limb: shoulder/hip → joint → end, ink outline + colour (+ dashed wraps)
const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string; wrap?: string; wrapFrom?: number }> = ({ a, b, c, w, col, wrap, wrapFrom = 0 }) => {
  const d = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
  const lower = `M ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {wrap ? (
        <>
          <path d={wrapFrom ? lower : d} stroke={wrap} strokeWidth={w} fill="none" strokeLinecap="butt" strokeLinejoin="round" />
          <path d={wrapFrom ? lower : d} stroke={CLOTH_D} strokeWidth={w} fill="none" strokeDasharray="6 16" strokeLinejoin="round" />
        </>
      ) : null}
    </g>
  );
};

const elbowOf = (sh: P, hand: P, out: number): P => [(sh[0] + hand[0]) / 2 + out, Math.max(sh[1], hand[1]) + 50];

// murmillo-style helmet: red crest, bronze dome, wide brim, grille face-plate (like the Pompeii helmets). Head centre = (0,-575).
export const Helmet: React.FC<{ f: number; glint?: boolean }> = ({ f, glint = true }) => {
  const sway = Math.sin(f / 6) * 4;
  return (
    <g>
      {/* crest + plume */}
      <path d="M -70 -650 Q -40 -770 60 -778 Q 128 -772 132 -700 L 108 -660 Z" fill={BRONZE_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M -86 -668 Q -60 ${-818 + sway} 60 ${-834 + sway} Q 170 ${-828 + sway} 174 ${-720 + sway} Q 150 -690 120 -704 Q 100 -760 40 -760 Q -30 -752 -50 -660 Z`} fill={RED} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M ${-56 + k * 44} ${-704 - k * 14 + sway} q 14 ${-40 + k * 4} 40 ${-50 + k * 8}`} stroke={RED_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      {/* dome */}
      <ellipse cx={0} cy={-612} rx={110} ry={94} fill={BRONZE} stroke={INK} strokeWidth={7} />
      <path d="M -70 -660 Q -30 -690 20 -688" stroke={BRONZE_HI} strokeWidth={12} fill="none" strokeLinecap="round" />
      {/* face plate with grille */}
      <path d="M -92 -540 L 92 -540 Q 104 -456 56 -418 L -56 -418 Q -104 -456 -92 -540 Z" fill={BRONZE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((r) =>
        [-3, -2, -1, 0, 1, 2, 3].map((c) => {
          const cx = c * 24;
          const cy = -520 + r * 22;
          if (Math.abs(cx) > 82 - r * 12) return null;
          return <circle key={`${r}${c}`} cx={cx} cy={cy} r={7.5} fill={INK} />;
        }),
      )}
      {glint ? (
        <>
          <circle cx={-36} cy={-498} r={4} fill="#FFFFFF" />
          <circle cx={36} cy={-498} r={4} fill="#FFFFFF" />
        </>
      ) : null}
      {/* wide brim */}
      <path d="M -208 -566 Q -120 -538 0 -544 Q 120 -538 208 -566 Q 224 -546 204 -534 Q 100 -506 0 -510 Q -100 -506 -204 -534 Q -224 -546 -208 -566 Z" fill={BRONZE_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -150 -540 Q 0 -520 150 -540" stroke={BRONZE_HI} strokeWidth={5} fill="none" opacity={0.7} />
      {[-150, -75, 0, 75, 150].map((k) => (
        <circle key={k} cx={k} cy={-528 + Math.abs(k) * 0.03} r={6} fill={BRONZE_HI} stroke={INK} strokeWidth={3} />
      ))}
    </g>
  );
};

type Face = "grin" | "chew" | "gulp" | "frown" | "shock";
// bare head (no helmet), centre (0,-575)
const Head: React.FC<{ f: number; face?: Face }> = ({ f, face = "grin" }) => {
  const chew = face === "chew" ? (Math.sin(f / 2.2) + 1) / 2 : 0;
  return (
    <g>
      <ellipse cx={-92} cy={-570} rx={20} ry={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      <ellipse cx={92} cy={-570} rx={20} ry={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -92 -600 Q -96 -480 -40 -470 L 40 -470 Q 96 -480 92 -600 Q 92 -672 0 -676 Q -92 -672 -92 -600 Z" fill={SKIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* buzz-cut hair + stubble */}
      <path d="M -94 -596 Q -96 -682 0 -684 Q 96 -682 94 -596 Q 70 -640 0 -642 Q -70 -640 -94 -596 Z" fill={HAIR} stroke={INK} strokeWidth={5} />
      <path d="M -80 -520 Q -70 -472 -30 -466 L 30 -466 Q 70 -472 80 -520 Q 40 -490 0 -492 Q -40 -490 -80 -520 Z" fill={SKIN_D} opacity={0.55} />
      {/* brows + eyes */}
      {face === "gulp" ? (
        <path d="M -60 -584 l 30 8 M 60 -584 l -30 8" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      ) : (
        <>
          <circle cx={-36} cy={-578} r={10} fill={INK} />
          <circle cx={36} cy={-578} r={10} fill={INK} />
          {face === "shock" ? (
            <>
              <circle cx={-36} cy={-578} r={20} fill="none" stroke={INK} strokeWidth={4} />
              <circle cx={36} cy={-578} r={20} fill="none" stroke={INK} strokeWidth={4} />
            </>
          ) : null}
        </>
      )}
      <path d={face === "frown" ? "M -62 -608 L -16 -598 M 62 -608 L 16 -598" : "M -62 -604 L -16 -612 M 62 -604 L 16 -612"} stroke={HAIR} strokeWidth={11} strokeLinecap="round" />
      <path d="M 0 -578 Q -14 -540 -2 -532 Q 10 -530 16 -538" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* mouth */}
      {face === "grin" ? <path d="M -40 -516 Q 0 -478 40 -516 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
      {face === "chew" ? <ellipse cx={0} cy={-506} rx={26 - chew * 8} ry={6 + chew * 12} fill="#6B2A22" stroke={INK} strokeWidth={5} /> : null}
      {face === "gulp" ? <ellipse cx={4} cy={-508} rx={22} ry={16} fill="#6B2A22" stroke={INK} strokeWidth={5} /> : null}
      {face === "frown" ? <path d="M -34 -496 Q 0 -526 34 -496" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /> : null}
      {face === "shock" ? <ellipse cx={0} cy={-500} rx={20} ry={26} fill="#6B2A22" stroke={INK} strokeWidth={5} /> : null}
      {face === "chew" ? (
        <>
          <circle cx={-58} cy={-520} r={14 + chew * 6} fill={SKIN} stroke={INK} strokeWidth={4} />
          <circle cx={58} cy={-520} r={14 + chew * 6} fill={SKIN} stroke={INK} strokeWidth={4} />
        </>
      ) : null}
    </g>
  );
};

// short Roman sword: pommel at the hand, blade along `ang` (deg, 0 = right, -90 = up)
const Gladius: React.FC<{ at: P; ang: number; s?: number; shine?: number }> = ({ at, ang, s = 1, shine = 0 }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang}) scale(${s})`}>
    <circle cx={-46} cy={0} r={18} fill={GOLD} stroke={INK} strokeWidth={5} />
    <rect x={-40} y={-15} width={64} height={30} rx={8} fill={WOOD} stroke={INK} strokeWidth={5} />
    <rect x={22} y={-34} width={22} height={68} rx={8} fill={GOLD} stroke={INK} strokeWidth={5} />
    <path d="M 44 -22 L 270 -18 L 320 0 L 270 18 L 44 22 Z" fill={STEEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 50 0 L 300 0" stroke={STEEL_D} strokeWidth={5} />
    {shine > 0 ? <path d="M 230 -40 l 10 30 l 30 10 l -30 10 l -10 30 l -10 -30 l -30 -10 l 30 -10 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} opacity={shine} transform={`rotate(${-ang} 240 0)`} /> : null}
  </g>
);

// big curved red scutum centred on `at`
const Shield: React.FC<{ at: P; rot?: number; s?: number }> = ({ at, rot = -4, s = 1 }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-270} width={300} height={540} rx={34} fill={RED_D} stroke={INK} strokeWidth={8} transform="translate(14 8)" />
    <rect x={-150} y={-270} width={300} height={540} rx={34} fill={RED} stroke={INK} strokeWidth={8} />
    <rect x={-130} y={-250} width={260} height={500} rx={24} fill="none" stroke={GOLD} strokeWidth={10} />
    <path d="M -110 -10 L -40 -40 L -60 -150 L 0 -60 L 60 -150 L 40 -40 L 110 -10 L 40 20 L 60 150 L 0 60 L -60 150 L -40 20 Z" fill={GOLD} stroke={INK} strokeWidth={4} strokeLinejoin="round" opacity={0.95} />
    <circle cx={0} cy={0} r={52} fill={BRONZE} stroke={INK} strokeWidth={7} />
    <circle cx={-14} cy={-14} r={16} fill={BRONZE_HI} opacity={0.8} />
    <path d="M -120 -200 Q -110 -230 -80 -236" stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5} />
  </g>
);

// The gladiator. Origin = belt centre. R = viewer-left arm (sword arm, padded manica), L = viewer-right arm (shield arm).
// Hands are in local coords; draw props in hands from the caller with W2(x, y, s, hand).
const SH_R: P = [-138, -404];
const SH_L: P = [138, -404];
type Legs = "lunge" | "stand" | "sit" | "none";
const LEGS: Record<Exclude<Legs, "none">, { back: [P, P, P]; front: [P, P, P] }> = {
  lunge: { back: [[55, 70], [175, 320], [300, 585]], front: [[-55, 70], [-215, 300], [-232, 585]] },
  stand: { back: [[55, 70], [78, 330], [92, 585]], front: [[-55, 70], [-78, 330], [-92, 585]] },
  sit: { back: [[40, 90], [-170, 150], [-380, 170]], front: [[-40, 90], [-240, 120], [-450, 130]] },
};

const Glad: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  legs?: Legs;
  helmet?: boolean;
  shield?: boolean;
  handR?: P;
  elbowR?: P;
  handL?: P;
  elbowL?: P;
  face?: Face;
  lean?: number;
  bandage?: boolean;
  shieldRot?: number;
  children?: React.ReactNode; // props held in the hands, drawn in local coords under the hand circles
}> = ({ x, y, s = 1, f, legs = "none", helmet = true, shield = true, handR = [-250, -600], elbowR, handL = [170, -230], elbowL, face = "grin", lean = 0, bandage = false, shieldRot = -4, children }) => {
  const breathe = Math.sin(f / 12) * 3;
  const eR = elbowR ?? elbowOf(SH_R, handR, -60);
  const eL = elbowL ?? elbowOf(SH_L, handL, 60);
  const L = legs !== "none" ? LEGS[legs] : null;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {L ? (
        <g>
          <Limb a={L.back[0]} b={L.back[1]} c={L.back[2]} w={64} col={SKIN_D} wrap={WRAP} wrapFrom={1} />
          <ellipse cx={L.back[2][0] + 22} cy={L.back[2][1] + 8} rx={52} ry={22} fill={WOOD} stroke={INK} strokeWidth={6} />
          <Limb a={L.front[0]} b={L.front[1]} c={L.front[2]} w={68} col={SKIN} wrap={WRAP} wrapFrom={1} />
          <ellipse cx={L.front[2][0] - 18} cy={L.front[2][1] + 8} rx={56} ry={22} fill={WOOD} stroke={INK} strokeWidth={6} />
          {/* bronze greave on the front shin */}
          {legs !== "sit" ? (
            <path
              d={`M ${L.front[1][0] - 44} ${L.front[1][1] + 10} Q ${L.front[1][0]} ${L.front[1][1] - 30} ${L.front[1][0] + 44} ${L.front[1][1] + 10} L ${L.front[2][0] + 34} ${L.front[2][1] - 40} L ${L.front[2][0] - 36} ${L.front[2][1] - 40} Z`}
              fill={BRONZE}
              stroke={INK}
              strokeWidth={6}
              strokeLinejoin="round"
            />
          ) : null}
        </g>
      ) : null}
      <g transform={`rotate(${lean} 0 0) translate(0 ${breathe})`}>
        {/* shield arm goes behind the shield */}
        <Limb a={SH_L} b={eL} c={handL} w={66} col={SKIN_D} />
        {/* loin cloth */}
        <path d="M -122 10 L 122 10 L 96 150 Q 0 196 -96 150 Z" fill={CLOTH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 20 L -40 160 M 10 24 L 14 176 M 70 20 L 54 160" stroke={CLOTH_D} strokeWidth={6} />
        {/* torso */}
        <rect x={-42} y={-492} width={84} height={90} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -156 -424 Q 0 -456 156 -424 L 120 6 L -120 6 Z" fill={SKIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -112 -320 Q -56 -276 -2 -310 Q 56 -276 112 -320" stroke={SKIN_D} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M 0 -300 L 0 -60 M -50 -200 Q 0 -186 50 -200 M -46 -130 Q 0 -118 46 -130" stroke={SKIN_D} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* wide bronze belt */}
        <rect x={-130} y={-34} width={260} height={56} rx={10} fill={BRONZE} stroke={INK} strokeWidth={7} />
        {[-96, -48, 0, 48, 96].map((k) => (
          <circle key={k} cx={k} cy={-6} r={9} fill={BRONZE_HI} stroke={INK} strokeWidth={3} />
        ))}
        {helmet ? <Helmet f={f} /> : <Head f={f} face={face} />}
        {shield ? <Shield at={[handL[0] + 20, handL[1] + 10]} rot={shieldRot} /> : null}
        {/* sword arm with the segmented manica */}
        <Limb a={SH_R} b={eR} c={handR} w={70} col={SKIN} wrap={WRAP} />
        {bandage ? (
          <g>
            <path d={`M ${(SH_R[0] + eR[0]) / 2 - 40} ${(SH_R[1] + eR[1]) / 2 - 20} l 80 40`} stroke={INK} strokeWidth={40} strokeLinecap="butt" />
            <path d={`M ${(SH_R[0] + eR[0]) / 2 - 40} ${(SH_R[1] + eR[1]) / 2 - 20} l 80 40`} stroke="#FFFFFF" strokeWidth={30} strokeLinecap="butt" />
            <circle cx={(SH_R[0] + eR[0]) / 2 + 6} cy={(SH_R[1] + eR[1]) / 2 + 4} r={7} fill={RED} />
          </g>
        ) : null}
        {children}
        <circle cx={handR[0]} cy={handR[1]} r={36} fill={SKIN} stroke={INK} strokeWidth={6} />
        {!shield ? <circle cx={handL[0]} cy={handL[1]} r={34} fill={SKIN_D} stroke={INK} strokeWidth={6} /> : null}
      </g>
    </g>
  );
};

// one fan in the stands (origin = shoulders centre). thumb: draws a fist with a thumb that flips up/down.
const Fan: React.FC<{ x: number; y: number; s: number; i: number; f: number; arm: number; thumb?: boolean }> = ({ x, y, s, i, f, arm, thumb = false }) => {
  const skin = FAN_SKIN[i % FAN_SKIN.length];
  const toga = FAN_TOGA[i % FAN_TOGA.length];
  const bob = Math.sin(f / 3.2 + i * 1.9) * 6;
  const wave = Math.sin(f / 2.6 + i * 2.3);
  const hx = (i % 2 ? 1 : -1) * (40 + wave * 14);
  const hy = -95 + wave * 10;
  // thumb angle: -90 = up, +90 = down (smoothly flipping)
  const ph = Math.tanh(4 * Math.sin(f / 7 + i * 1.37));
  const tAng = 90 * ph;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
      <path d="M -40 0 Q 0 -16 40 0 L 46 60 L -46 60 Z" fill={toga} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={0} cy={-34} r={27} fill={skin} stroke={INK} strokeWidth={5} />
      <path d={`M -27 -40 Q -24 -66 0 -64 Q 24 -66 27 -40 Q 10 -54 -27 -40 Z`} fill={["#2B1D14", "#5C3B22", "#1B1712", "#8A6A40", "#3A2A20"][i % 5]} />
      {arm > 0.3 ? (
        <g>
          <path d={`M ${hx * 0.4} 4 L ${hx} ${hy}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
          <path d={`M ${hx * 0.4} 4 L ${hx} ${hy}`} stroke={skin} strokeWidth={10} strokeLinecap="round" />
          <circle cx={hx} cy={hy} r={12} fill={skin} stroke={INK} strokeWidth={4} />
          {thumb ? <path d={`M ${hx} ${hy} L ${hx + Math.cos((tAng * Math.PI) / 180) * 24} ${hy + Math.sin((tAng * Math.PI) / 180) * 24}`} stroke={INK} strokeWidth={10} strokeLinecap="round" /> : null}
        </g>
      ) : null}
    </g>
  );
};

// the stands: velarium awning, arcade, tiers of fans
const Stands: React.FC<{ f: number; top: number; bottom: number; thumbs?: boolean; seed: string }> = ({ f, top, bottom, thumbs = false, seed }) => {
  const rows = Math.max(1, Math.floor((bottom - top) / 82));
  return (
    <g>
      <rect x={0} y={0} width={1080} height={top + 40} fill="#9ED3E6" />
      {/* awning (velarium) */}
      {new Array(10).fill(0).map((_, k) => {
        const x0 = k * 108;
        const sag = 150 + Math.sin(f / 18 + k) * 6;
        return <path key={k} d={`M ${x0} 0 L ${x0 + 108} 0 L ${x0 + 108} ${sag - 20} Q ${x0 + 54} ${sag + 20} ${x0} ${sag - 20} Z`} fill={k % 2 ? CLOTH : RED} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
      })}
      {/* arcade */}
      <rect x={0} y={top - 150} width={1080} height={190} fill={STONE} stroke={INK} strokeWidth={6} />
      {new Array(7).fill(0).map((_, k) => (
        <path key={k} d={`M ${30 + k * 150} ${top + 40} L ${30 + k * 150} ${top - 80} Q ${80 + k * 150} ${top - 140} ${130 + k * 150} ${top - 80} L ${130 + k * 150} ${top + 40} Z`} fill="#6E5A44" stroke={INK} strokeWidth={5} />
      ))}
      {new Array(rows).fill(0).map((_, r) => {
        const y = top + 60 + r * 82;
        const sc = 0.9 + r * 0.06;
        const n = Math.ceil(1080 / (78 * sc)) + 1;
        return (
          <g key={r}>
            <rect x={0} y={y + 28} width={1080} height={58} fill={r % 2 ? STONE : STONE_D} stroke={INK} strokeWidth={4} />
            {new Array(n).fill(0).map((_, k) => {
              const i = r * 31 + k;
              const jx = (random(`${seed}x${i}`) - 0.5) * 20;
              return <Fan key={k} x={k * 78 * sc + (r % 2) * 36 + jx} y={y + 22} s={sc} i={i} f={f} arm={random(`${seed}a${i}`)} thumb={thumbs} />;
            })}
          </g>
        );
      })}
    </g>
  );
};

// podium wall + sand floor
const Floor: React.FC<{ y: number; wall?: number }> = ({ y, wall = 200 }) => (
  <g>
    <rect x={0} y={y - wall} width={1080} height={wall} fill={RED_D} stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={24 + k * 268} y={y - wall + 30} width={232} height={wall - 60} rx={8} fill={RED} stroke={GOLD} strokeWidth={6} />
    ))}
    <rect x={0} y={y - wall - 24} width={1080} height={30} fill={CLOTH} stroke={INK} strokeWidth={6} />
    <rect x={0} y={y} width={1080} height={1920 - y} fill={SAND} />
    <path d={`M 0 ${y} L 1080 ${y}`} stroke={INK} strokeWidth={7} />
    {new Array(14).fill(0).map((_, k) => (
      <ellipse key={k} cx={(k * 173) % 1080} cy={y + 60 + ((k * 97) % (1900 - y - 60))} rx={30} ry={6} fill={SAND_D} />
    ))}
  </g>
);

const Grain: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 9, rot = 0 }) => (
  <ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill={BARLEY} stroke={INK} strokeWidth={2.5} transform={`rotate(${rot} ${x} ${y})`} />
);

// an ear of barley (stalk up from the origin)
const Ear: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 Q 4 -60 0 -120" stroke={LEAF_D} strokeWidth={7} fill="none" strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((k) => (
      <g key={k}>
        <ellipse cx={-10} cy={-90 - k * 18} rx={11} ry={7} fill={BARLEY} stroke={INK} strokeWidth={3} transform={`rotate(-30 -10 ${-90 - k * 18})`} />
        <ellipse cx={10} cy={-96 - k * 18} rx={11} ry={7} fill={BARLEY} stroke={INK} strokeWidth={3} transform={`rotate(30 10 ${-96 - k * 18})`} />
        <path d={`M ${12} ${-100 - k * 18} l 26 -34`} stroke={BARLEY} strokeWidth={3} />
      </g>
    ))}
  </g>
);

const Leaf: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 Q 40 -60 0 -120 Q -40 -60 0 0 Z" fill={LEAF} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 -6 L 0 -104" stroke={LEAF_D} strokeWidth={4} />
  </g>
);

// big wooden bowl of barley porridge (centre = rim centre)
const Bowl: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 Q -140 130 0 140 Q 140 130 150 0 Z" fill={WOOD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -120 40 Q 0 70 120 40" stroke="#6A4224" strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={0} rx={150} ry={34} fill="#F3DFA6" stroke={INK} strokeWidth={7} />
    {new Array(16).fill(0).map((_, k) => (
      <Grain key={k} x={-110 + ((k * 53) % 220)} y={-12 + ((k * 7) % 22)} r={10} rot={k * 37} />
    ))}
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 12) % 36) / 36;
      return <path key={k} d={`M ${-60 + k * 60} ${-20 - p * 120} q 14 -20 0 -40 q -14 -20 0 -40`} stroke="#FFFFFF" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.7 * (1 - p)} />;
    })}
  </g>
);

// big bone (femur) centred at the origin, vertical
const Bone: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((e) => (
      <g key={e}>
        <circle cx={-40} cy={e * 190} r={50} fill="#FBF3E0" stroke={INK} strokeWidth={8} />
        <circle cx={40} cy={e * 190} r={50} fill="#FBF3E0" stroke={INK} strokeWidth={8} />
      </g>
    ))}
    <rect x={-34} y={-200} width={68} height={400} fill="#FBF3E0" />
    <path d="M -34 -142 L -34 142 M 34 -142 L 34 142" stroke={INK} strokeWidth={8} />
    <path d="M -10 -120 Q 0 0 -10 120" stroke="#E6D6B4" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

const Magnifier: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 120 120 L 260 260" stroke={INK} strokeWidth={50} strokeLinecap="round" />
    <path d="M 120 120 L 260 260" stroke={WOOD} strokeWidth={36} strokeLinecap="round" />
    <circle cx={0} cy={0} r={170} fill="#D8F0F6" fillOpacity={0.35} stroke={INK} strokeWidth={30} />
    <circle cx={0} cy={0} r={170} fill="none" stroke={GOLD} strokeWidth={16} />
    <path d="M -110 -60 Q -90 -110 -40 -126" stroke="#FFFFFF" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
  </g>
);

const Sack: React.FC<{ x: number; y: number; s?: number; label?: string }> = ({ x, y, s = 1, label = "BARLEY" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 0 Q -150 -200 -70 -250 L -90 -290 Q 0 -310 90 -290 L 70 -250 Q 150 -200 130 0 Z" fill="#D8BC86" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -80 -262 Q 0 -240 80 -262" stroke={WOOD} strokeWidth={12} fill="none" />
    <text x={0} y={-110} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill="#6A4224">{label}</text>
    {[-70, -30, 20, 60].map((k, i) => (
      <Grain key={k} x={k} y={-296 - (i % 2) * 10} r={11} rot={i * 50} />
    ))}
  </g>
);

// a giant fist with a thumb that turns: ang -90 = up, 0 = sideways, 90 = down
const BigFist: React.FC<{ x: number; y: number; s?: number; ang: number }> = ({ x, y, s = 1, ang }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 120 L -80 380 L 80 380 L 70 120 Z" fill={FAN_TOGA[0]} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-90} y={60} width={180} height={90} rx={30} fill={SKIN} stroke={INK} strokeWidth={8} />
    <g transform={`rotate(${ang + 90} 70 -40)`}>
      <rect x={42} y={-210} width={64} height={190} rx={32} fill={SKIN} stroke={INK} strokeWidth={8} />
      <path d="M 54 -180 Q 74 -196 94 -180" stroke={SKIN_D} strokeWidth={6} fill="none" />
    </g>
    <rect x={-120} y={-110} width={220} height={200} rx={56} fill={SKIN} stroke={INK} strokeWidth={8} />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${-120 + 10} ${-50 + k * 50} Q ${-60} ${-40 + k * 50} ${-6} ${-50 + k * 50}`} stroke={SKIN_D} strokeWidth={7} fill="none" strokeLinecap="round" />
    ))}
  </g>
);

const QMark: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <text x={0} y={60} textAnchor="middle" fontFamily={titleFont} fontSize={220} fill={GOLD} stroke={INK} strokeWidth={10} paintOrder="stroke">?</text>
  </g>
);

// a Roman in a toga, waist-up (origin = belt), holding a goblet to his lips: sip 0..1 tilts it
const Citizen: React.FC<{ x: number; y: number; s?: number; f: number; sip: number }> = ({ x, y, s = 1, f, sip }) => {
  const b = Math.sin(f / 10) * 3;
  return (
    <g transform={`translate(${x} ${y + b}) scale(${s})`}>
      <path d="M -170 0 Q -180 -300 -130 -400 Q 0 -440 130 -400 Q 180 -300 170 0 Z" fill={CLOTH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -130 -400 Q 40 -260 150 -40" stroke={CLOTH_D} strokeWidth={30} fill="none" />
      <path d="M -120 -380 Q 50 -240 160 -20" stroke={RED} strokeWidth={12} fill="none" opacity={0.8} />
      <rect x={-40} y={-470} width={80} height={80} fill="#E7B48A" stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-560} rx={92} ry={100} fill="#F0C9A3" stroke={INK} strokeWidth={7} />
      <path d="M -92 -560 Q -100 -620 -70 -630 Q -84 -580 -80 -540 Z M 92 -560 Q 100 -620 70 -630 Q 84 -580 80 -540 Z" fill="#B9B4AA" stroke={INK} strokeWidth={4} />
      <path d="M -26 -580 Q -10 -570 6 -580 M 50 -580 Q 66 -570 82 -580" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 44 -570 Q 82 -526 52 -512" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={-20} cy={-530} rx={16} ry={9} fill="#F29C8C" opacity={0.7} />
      <ellipse cx={80} cy={-494} rx={13} ry={10} fill="#8A3A30" stroke={INK} strokeWidth={4} />
      {/* goblet at the lips, arm from the right shoulder */}
      <path d="M 120 -380 Q 230 -330 190 -440" stroke={INK} strokeWidth={70} fill="none" strokeLinecap="round" />
      <path d="M 120 -380 Q 230 -330 190 -440" stroke={CLOTH} strokeWidth={56} fill="none" strokeLinecap="round" />
      <g transform={`translate(176 -456) rotate(${-40 - sip * 30}) scale(0.8)`}>
        <path d="M -80 -90 L 80 -90 Q 76 10 0 24 Q -76 10 -80 -90 Z" fill={GOLD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <ellipse cx={0} cy={-90} rx={80} ry={18} fill={RED} stroke={INK} strokeWidth={6} />
        <rect x={-12} y={20} width={24} height={70} fill={GOLD} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={94} rx={56} ry={14} fill={GOLD} stroke={INK} strokeWidth={6} />
        <circle cx={-40} cy={-40} r={10} fill="#FFF3B0" />
      </g>
      <circle cx={190} cy={-440} r={34} fill="#E7B48A" stroke={INK} strokeWidth={6} />
    </g>
  );
};

const Heart: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = "#E8506A" }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 30 C -60 -10 -50 -60 -20 -60 C -5 -60 0 -45 0 -40 C 0 -45 5 -60 20 -60 C 50 -60 60 -10 0 30 Z" fill={col} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
);

// iron shackle on an ankle + chain to a ball (ball at bx, by)
const Shackle: React.FC<{ at: P; ball: P; drop: number }> = ({ at, ball, drop }) => {
  const by = ball[1] - (1 - drop) * 900;
  const n = 7;
  return (
    <g>
      {new Array(n).fill(0).map((_, k) => {
        const t = (k + 0.5) / n;
        const cx = at[0] + (ball[0] - at[0]) * t;
        const cy = at[1] + (by - at[1]) * t + Math.sin(t * Math.PI) * 40 * drop;
        return <ellipse key={k} cx={cx} cy={cy} rx={20} ry={13} fill="none" stroke={INK} strokeWidth={14} transform={`rotate(${k % 2 ? 0 : 90} ${cx} ${cy})`} />;
      })}
      {new Array(n).fill(0).map((_, k) => {
        const t = (k + 0.5) / n;
        const cx = at[0] + (ball[0] - at[0]) * t;
        const cy = at[1] + (by - at[1]) * t + Math.sin(t * Math.PI) * 40 * drop;
        return <ellipse key={k} cx={cx} cy={cy} rx={20} ry={13} fill="none" stroke="#5B5E68" strokeWidth={6} transform={`rotate(${k % 2 ? 0 : 90} ${cx} ${cy})`} />;
      })}
      <circle cx={ball[0]} cy={by} r={86} fill="#3E4048" stroke={INK} strokeWidth={8} />
      <path d={`M ${ball[0] - 40} ${by - 40} q 20 -20 46 -18`} stroke="#8C8F99" strokeWidth={10} fill="none" strokeLinecap="round" />
      {drop >= 1 ? <rect x={at[0] - 60} y={at[1] - 28} width={120} height={56} rx={14} fill="#5B5E68" stroke={INK} strokeWidth={7} /> : null}
    </g>
  );
};

// clay drinking cup (origin = rim centre, opening up before rotation)
const ClayCup: React.FC<{ at: P; rot: number; s?: number }> = ({ at, rot, s = 1 }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${rot}) scale(${s})`}>
    <path d="M -80 0 L 80 0 L 60 120 Q 0 140 -60 120 Z" fill={CLAY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -70 40 L 70 40" stroke="#1B1712" strokeWidth={8} opacity={0.6} />
    <path d="M -64 70 L 64 70" stroke="#E6A06A" strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={80} ry={20} fill={ASH} stroke={INK} strokeWidth={6} />
  </g>
);

const Fire: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const fl = Math.sin(f / 2.2) * 12;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 1, 2].map((k) => {
        const p = ((f + k * 14) % 42) / 42;
        return <circle key={k} cx={-20 + k * 20 + Math.sin(p * 6 + k) * 30} cy={-260 - p * 420} r={40 + p * 60} fill={ASH} opacity={0.45 * (1 - p)} />;
      })}
      <path d="M -150 30 L 150 -10 M -150 -10 L 150 30" stroke={INK} strokeWidth={46} strokeLinecap="round" />
      <path d="M -150 30 L 150 -10 M -150 -10 L 150 30" stroke={WOOD} strokeWidth={34} strokeLinecap="round" />
      <path d={`M -110 0 Q -120 -120 -40 ${-190 - fl} Q -30 -110 0 ${-250 + fl} Q 40 -130 70 ${-200 - fl} Q 130 -110 110 0 Z`} fill="#FF9A2E" stroke="#C4501A" strokeWidth={7} strokeLinejoin="round" />
      <path d={`M -60 0 Q -60 -80 -10 ${-130 + fl} Q 20 -70 50 ${-120 - fl} Q 80 -60 60 0 Z`} fill="#FFE07A" />
      <path d="M -200 40 Q 0 -10 200 40 Q 0 80 -200 40 Z" fill={ASH} stroke={INK} strokeWidth={6} />
      <path d="M -140 38 Q -60 20 0 30" stroke={ASH_D} strokeWidth={5} fill="none" />
    </g>
  );
};

// modern gym shaker bottle (origin = centre), with a PLANT ASH label and sloshing grey drink
const Shaker: React.FC<{ x: number; y: number; s?: number; rot?: number; slosh: number }> = ({ x, y, s = 1, rot = 0, slosh }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <clipPath id="ep047shaker">
        <path d="M -110 -150 L 110 -150 L 96 190 Q 0 214 -96 190 Z" />
      </clipPath>
    </defs>
    <path d="M -110 -150 L 110 -150 L 96 190 Q 0 214 -96 190 Z" fill="#EAF6FA" fillOpacity={0.9} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <g clipPath="url(#ep047shaker)">
      <path d={`M -140 ${-30 + slosh * 30} Q -40 ${-60 - slosh * 30} 0 ${-30} Q 60 ${0 + slosh * 30} 140 ${-30 - slosh * 30} L 140 240 L -140 240 Z`} fill={ASH} />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={-60 + k * 30} cy={40 + ((k * 37) % 120)} r={6} fill={ASH_D} />
      ))}
    </g>
    <rect x={-104} y={10} width={208} height={120} rx={10} fill={GOLD} stroke={INK} strokeWidth={6} />
    <text x={0} y={60} textAnchor="middle" fontFamily={titleFont} fontSize={42} fill={INK}>PLANT</text>
    <text x={0} y={112} textAnchor="middle" fontFamily={titleFont} fontSize={50} fill={RED}>ASH</text>
    <path d="M -86 -150 L -86 120" stroke="#FFFFFF" strokeWidth={12} opacity={0.6} strokeLinecap="round" />
    <rect x={-120} y={-200} width={240} height={60} rx={14} fill="#26282E" stroke={INK} strokeWidth={7} />
    <rect x={-40} y={-250} width={80} height={56} rx={12} fill="#26282E" stroke={INK} strokeWidth={7} />
    <rect x={-16} y={-270} width={32} height={30} rx={6} fill={RED} stroke={INK} strokeWidth={5} />
  </g>
);

// a modern gym wall: rack of dumbbells, mirror strip, rubber floor
const Gym: React.FC<{ floor: number }> = ({ floor }) => (
  <g>
    <rect x={0} y={0} width={1080} height={floor} fill="#3C4A5C" />
    <rect x={0} y={0} width={1080} height={floor} fill="url(#ep047gymglow)" />
    <defs>
      <radialGradient id="ep047gymglow" cx="0.5" cy="0.35" r="0.7">
        <stop offset="0%" stopColor="#7FA6C9" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#3C4A5C" stopOpacity={0} />
      </radialGradient>
    </defs>
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <rect key={k} x={40 + k * 180} y={560} width={150} height={floor - 760} rx={6} fill="#4C5D72" stroke="#2A3442" strokeWidth={5} />
    ))}
    <rect x={0} y={floor - 260} width={1080} height={22} fill="#C9D0DA" stroke={INK} strokeWidth={5} />
    {new Array(7).fill(0).map((_, k) => (
      <g key={k}>
        <rect x={52 + k * 146} y={floor - 300} width={70} height={20} fill="#9AA3B0" stroke={INK} strokeWidth={4} />
        <rect x={34 + k * 146} y={floor - 330} width={30} height={70} rx={8} fill={k % 2 ? RED : "#26282E"} stroke={INK} strokeWidth={5} />
        <rect x={110 + k * 146} y={floor - 330} width={30} height={70} rx={8} fill={k % 2 ? RED : "#26282E"} stroke={INK} strokeWidth={5} />
      </g>
    ))}
    <rect x={0} y={floor} width={1080} height={1920 - floor} fill="#22262E" />
    <path d={`M 0 ${floor} L 1080 ${floor}`} stroke={INK} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <path key={k} d={`M ${k * 180} ${floor} L ${k * 180 - 120} 1920`} stroke="#30353F" strokeWidth={6} />
    ))}
  </g>
);

const StoneWall: React.FC<{ to: number; col?: string; line?: string }> = ({ to, col = "#E9D3A8", line = STONE_D }) => (
  <g>
    <rect x={0} y={0} width={1080} height={to} fill={col} />
    {new Array(Math.ceil(to / 120)).fill(0).map((_, r) => (
      <g key={r}>
        <path d={`M 0 ${r * 120} L 1080 ${r * 120}`} stroke={line} strokeWidth={5} />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M ${k * 300 + (r % 2) * 150 + 70} ${r * 120} l 0 120`} stroke={line} strokeWidth={5} />
        ))}
      </g>
    ))}
  </g>
);

export const Gladiator: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "arena";
  const float: string[] = v.float ?? [];
  let sky: "day" | "paper" = "paper";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "arena") {
    // frame 0: mid-lunge, sword raised, shield up, crowd roaring → slash, wind up, slash again
    sky = "day";
    const sw = interpolate(f, [0, 4, 10, 44, 56, 60, 66], [0, 0, 1, 1, 0.2, 0.2, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const handR: P = [-250 - 110 * sw, -640 + 270 * sw];
    const ang = -100 - 75 * sw;
    const swing = interpolate(f, [4, 8, 14], [0, 1, 0], clamp) + interpolate(f, [60, 63, 70], [0, 1, 0], clamp);
    const GX = 560;
    const GY = 1330;
    const GS = 0.95;
    const tip = W2(GX, GY, GS, [handR[0] + Math.cos((ang * Math.PI) / 180) * 300, handR[1] + Math.sin((ang * Math.PI) / 180) * 300]);
    body = (
      <>
        <Stands f={f} top={430} bottom={1150} seed="arena" />
        <Floor y={1380} wall={210} />
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 9) % 27) / 27;
          return <circle key={k} cx={GX - 260 + k * 30 - p * 80} cy={1880 - p * 60} r={30 + p * 50} fill={SAND_D} opacity={0.6 * (1 - p)} />;
        })}
        <Glad x={GX} y={GY} s={GS} f={f} legs="lunge" helmet shield handR={handR} handL={[180, -250]} lean={-3 * sw}>
          <Gladius at={handR} ang={ang} s={1.35} shine={interpolate(f, [12, 18, 30], [0, 1, 0], clamp)} />
        </Glad>
        {swing > 0.02 ? <path d={`M ${tip[0] + 140} ${tip[1] - 260} Q ${tip[0] - 60} ${tip[1] - 120} ${tip[0]} ${tip[1] + 40}`} stroke="#FFFFFF" strokeWidth={26} fill="none" strokeLinecap="round" opacity={0.85 * swing} /> : null}
      </>
    );
  } else if (mode === "barley") {
    // eating barley porridge; a bone under the magnifier sprouts plants
    const magAt = (v.magAt ?? 0.45) * dur;
    const mag = ease(f, magAt - 10, magAt);
    const t = (Math.sin(f / 5) + 1) / 2;
    const handR: P = [-40 - 20 * t, -250 - 220 * t];
    const sprouts: [number, number, number, "leaf" | "ear"][] = [
      [650, 820, -40, "leaf"],
      [960, 840, 35, "ear"],
      [640, 1120, -60, "ear"],
      [970, 1130, 50, "leaf"],
      [810, 700, 0, "ear"],
    ];
    body = (
      <>
        <StoneWall to={1500} />
        <rect x={0} y={1480} width={1080} height={440} fill="#9A6A40" />
        <rect x={0} y={1470} width={1080} height={50} fill={WOOD} stroke={INK} strokeWidth={6} />
        <Bone x={800} y={990} s={1.0} rot={12} />
        {sprouts.map(([x, y, r, k], i) => {
          const p = popIn(f, magAt + 2 + i * 3, 9);
          if (p <= 0) return null;
          return k === "leaf" ? <Leaf key={i} x={x} y={y} s={p} rot={r} /> : <Ear key={i} x={x} y={y} s={p * 1.2} rot={r} />;
        })}
        {mag > 0 ? <Magnifier x={800 + (1 - mag) * 600} y={980} s={0.8} /> : null}
        <Glad x={330} y={1600} s={1.2} f={f} helmet={false} shield={false} face="chew" handR={handR} handL={[150, -190]}>
          <Bowl x={80} y={-200} s={0.85} f={f} />
          <g transform={`translate(${handR[0]} ${handR[1]}) rotate(-35)`}>
            <path d="M 0 0 L 110 0" stroke={INK} strokeWidth={22} strokeLinecap="round" />
            <path d="M 0 0 L 110 0" stroke={WOOD} strokeWidth={12} strokeLinecap="round" />
            <ellipse cx={130} cy={0} rx={34} ry={22} fill={WOOD} stroke={INK} strokeWidth={6} />
            {t < 0.6 ? <ellipse cx={130} cy={-6} rx={24} ry={12} fill="#F3DFA6" stroke={INK} strokeWidth={3} /> : null}
          </g>
        </Glad>
        <Sack x={900} y={1880} s={1.0} />
      </>
    );
  } else if (mode === "thumbs") {
    // a stadium of thumbs flipping up/down, a giant thumb in front, "?" – and the loser raising a finger for mercy
    sky = "day";
    const big = 90 * Math.tanh(3 * Math.sin(f / 9));
    body = (
      <>
        <Stands f={f} top={300} bottom={1240} thumbs seed="thumbs" />
        <Floor y={1470} wall={200} />
        <BigFist x={560} y={860} s={1.25} ang={big} />
        <QMark x={860} y={640} s={1.0} rot={Math.sin(f / 6) * 18} />
        <QMark x={220} y={700} s={0.75} rot={-Math.sin(f / 7) * 18} />
        <g transform="translate(860 1860) rotate(-78) scale(0.42)">
          <Shield at={[0, 0]} rot={0} />
        </g>
        <Glad x={640} y={1820} s={0.46} f={f} legs="sit" helmet shield={false} handR={[-190, -740]} elbowR={[-230, -520]} handL={[150, -120]}>
          <path d="M -190 -760 L -190 -830" stroke={INK} strokeWidth={30} strokeLinecap="round" />
          <path d="M -190 -760 L -190 -830" stroke={SKIN} strokeWidth={18} strokeLinecap="round" />
        </Glad>
      </>
    );
  } else if (mode === "blood") {
    // a Roman sips from a goblet while the bandaged gladiator recoils
    sky = "day";
    const sip = ease(f, dur * 0.25, dur * 0.65);
    const shock = popIn(f, dur * 0.5, 8);
    body = (
      <>
        <Stands f={f} top={260} bottom={1060} seed="blood" />
        <Floor y={1560} wall={480} />
        <Glad x={790} y={1760} s={0.95} f={f} helmet shield={false} bandage lean={6 * shock} handR={[-260, -560]} handL={[160, -180]} />
        {shock > 0 ? (
          <g transform={`translate(850 900) scale(${shock})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={C.cream} stroke={INK} strokeWidth={10} paintOrder="stroke">?!</text>
          </g>
        ) : null}
        {[0, 1].map((k) => {
          const p = ((f + k * 10) % 20) / 20;
          return <path key={k} d={`M ${700 - k * 20} ${1030 + p * 50} q -12 18 0 26 q 12 -8 0 -26 Z`} fill="#9CD3E8" stroke={INK} strokeWidth={3} opacity={shock * (1 - p)} />;
        })}
        <Citizen x={320} y={1720} s={1.15} f={f} sip={sip} />
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 7) % 21) / 21;
          return <path key={k} d={`M ${200 + k * 90} ${960 - p * 80} l 8 -20 l 8 20 l 20 8 l -20 8 l -8 20 l -8 -20 l -20 -8 Z`} fill="#FFF3B0" stroke={INK} strokeWidth={3} opacity={sip * (1 - p)} />;
        })}
      </>
    );
  } else if (mode === "star") {
    // heartthrob on a Pompeii wall of graffiti → an iron ball and chain slam onto his ankle
    const chainAt = (v.chainAt ?? 0.58) * dur;
    const drop = ease(f, chainAt - 7, chainAt);
    const owned = f >= chainAt;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1620} fill="#F1E2C2" />
        <rect x={0} y={1280} width={1080} height={340} fill={C.brick} />
        <path d="M 0 1280 L 1080 1280" stroke={INK} strokeWidth={6} />
        <g fontFamily={typeFont} fill={INK} opacity={0.72}>
          <text x={240} y={560} fontSize={72} textAnchor="middle" transform="rotate(-8 240 560)">CELADVS</text>
          <text x={880} y={640} fontSize={52} textAnchor="middle" transform="rotate(6 880 640)">SVSPIRIVM</text>
          <text x={880} y={706} fontSize={52} textAnchor="middle" transform="rotate(6 880 706)">PVELLARVM</text>
        </g>
        {[[150, 860], [930, 820], [880, 1000], [170, 1020]].map(([x, y], k) => (
          <path key={k} transform={`translate(${x} ${y}) scale(0.8)`} d="M 0 30 C -60 -10 -50 -60 -20 -60 C -5 -60 0 -45 0 -40 C 0 -45 5 -60 20 -60 C 50 -60 60 -10 0 30 Z" fill="none" stroke={INK} strokeWidth={5} opacity={0.6} />
        ))}
        <rect x={0} y={1620} width={1080} height={300} fill="#A9A399" />
        {new Array(8).fill(0).map((_, k) => (
          <path key={k} d={`M ${k * 150} 1620 L ${k * 150 - 60} 1920`} stroke="#8C877E" strokeWidth={6} />
        ))}
        <path d="M 0 1620 L 1080 1620" stroke={INK} strokeWidth={6} />
        {new Array(7).fill(0).map((_, k) => {
          const t0 = 2 + k * 5;
          const p = (f - t0) / 40;
          if (p < 0 || p > 1) return null;
          const x = [200, 880, 300, 800, 160, 940, 520][k];
          return <Heart key={k} x={x} y={1500 - p * 700} s={(owned ? 0.6 : 1) * interpolate(p, [0, 0.15], [0.3, 1], clamp)} col={owned ? "#9A968E" : "#E8506A"} />;
        })}
        <Glad x={540} y={1250} s={0.95} f={f} legs="stand" helmet={false} shield={false} face={owned ? "frown" : "grin"} handR={[-300, -620]} elbowR={[-320, -420]} handL={[190, -130]}>
          <g transform="translate(240 -140) scale(0.55) translate(0 575)">
            <Helmet f={f} glint={false} />
          </g>
        </Glad>
        {drop > 0 ? <Shackle at={[460, 1770]} ball={[240, 1820]} drop={drop} /> : null}
      </>
    );
  } else if (mode === "ash") {
    // he gulps a grey ash drink by the fire → (answer) today: a PLANT ASH shaker in the gym
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    if (f < answerAt) {
      const tilt = ease(f, 0, answerAt * 0.8);
      body = (
        <>
          <StoneWall to={1540} col="#E3C89A" />
          <rect x={0} y={1540} width={1080} height={380} fill={SAND} />
          <path d="M 0 1540 L 1080 1540" stroke={INK} strokeWidth={7} />
          <Fire x={850} y={1600} s={1.0} f={f} />
          <Glad x={400} y={1660} s={1.25} f={f} helmet={false} shield={false} face="gulp" handR={[-96, -486]} elbowR={[-250, -330]} handL={[150, -160]}>
            <ClayCup at={[-22, -520]} rot={45 + 35 * tilt} s={0.8} />
          </Glad>
          {[0, 1, 2].map((k) => {
            const p = ((f + k * 8) % 24) / 24;
            return <circle key={k} cx={400 + 40} cy={1660 - 470 * 1.25 + p * 120} r={8} fill={ASH} stroke={INK} strokeWidth={2} opacity={1 - p} />;
          })}
        </>
      );
    } else {
      const lf = f - answerAt;
      const shake = Math.sin(lf / 1.6);
      const handR: P = [-310, -520 + shake * 30];
      body = (
        <>
          <Gym floor={1520} />
          <g transform="translate(880 1760)">
            <rect x={-90} y={-170} width={180} height={190} rx={20} fill="#26282E" stroke={INK} strokeWidth={7} />
            <rect x={-96} y={-196} width={192} height={44} rx={12} fill={RED} stroke={INK} strokeWidth={6} />
            <rect x={-70} y={-120} width={140} height={80} rx={8} fill={GOLD} stroke={INK} strokeWidth={5} />
            <text x={0} y={-62} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={INK}>ASH</text>
          </g>
          <Glad x={610} y={1660} s={1.2} f={f} helmet shield={false} handR={handR} handL={[300, -640]} elbowL={[320, -420]}>
            <Shaker x={handR[0] + 10} y={handR[1] - 120} s={0.8} rot={-8 + shake * 6} slosh={shake} />
          </Glad>
          {[0, 1, 2, 3].map((k) => {
            const p = ((lf + k * 6) % 24) / 24;
            const sx = [200, 420, 140, 470][k];
            const sy = [640, 700, 900, 980][k];
            return <path key={k} d={`M ${sx} ${sy - p * 40} l 10 -26 l 10 26 l 26 10 l -26 10 l -10 26 l -10 -26 l -26 -10 Z`} fill="#FFF3B0" stroke={INK} strokeWidth={3} opacity={1 - p} />;
          })}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "ash" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 112} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
