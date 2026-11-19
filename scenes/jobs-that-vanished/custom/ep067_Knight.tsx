import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep067 Knight (and the "free lance") – a knight in full plate on a barded warhorse charges head-on at the camera,
// lance lowered straight at the lens. Side-on joust (visors snap, lances drop, CRACK), ~50 lb of steel, the 1559 joust
// that killed Henry II of France (a lance shatters on a crowned helm, the crown tumbles into the sand – nothing gory),
// France quits jousting, knights for hire, and the twist: Walter Scott's Ivanhoe called hired knights "free lances" →
// a knight in full armour hunched over a laptop in a coffee shop: FREELANCER.
// visual: { mode: "charge" | "joust" | "armour" | "splinter" | "hire" | "book", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[], floatTop?, visorAt?, hitAt? (joust/splinter), crownAt?, stamp?, stampAt? (splinter),
//           turnAt?, turnHeadline?, turnAccent?, coinsAt? (hire), answer?, answerAccent?, answerAt?, answerSize? (book) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const STEEL = "#C5CEDA";
const STEEL_D = "#7E899A";
const STEEL_HI = "#F2F6FA";
const STEEL_K = "#4E5868";
const RED = "#C8322A";
const RED_D = "#8E1F1A";
const GOLD = "#F2B544";
const GOLD_D = "#C98A1E";
const BLUE = "#2F5DA8";
const BLUE_D = "#1E3E78";
const WHITE = "#F6F0E2";
const PLUME = "#E2483A";
const SAND = "#E6CB94";
const SAND_D = "#CDAE72";
const WOOD = "#8A5530";
const WOOD_D = "#5A341A";
const HORSE = "#ECE6DC";
const HORSE_D = "#C9C0B2";
const HORSE_HI = "#FFFFFF";
const HORSE2 = "#5A3A28";
const HORSE2_D = "#3A2418";
const HORSE2_HI = "#7E563C";
const MANE = "#3A3330";
const HOOF = "#3A2A20";
const LANCE = "#F4EAD5";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
// tapered band between a and b, from fraction t0 to t1, half-width w0 at a → w1 at b
const band = (a: P, b: P, t0: number, t1: number, w0: number, w1: number) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L = Math.hypot(dx, dy) || 1;
  const n: P = [-dy / L, dx / L];
  const at = (t: number, side: number): string => {
    const w = lerp(w0, w1, t) * side;
    return `${a[0] + dx * t + n[0] * w} ${a[1] + dy * t + n[1] * w}`;
  };
  return `M ${at(t0, 1)} L ${at(t1, 1)} L ${at(t1, -1)} L ${at(t0, -1)} Z`;
};
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[] }> = ({ items, f, dur, top = 640, at }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 120 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 56, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 24px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

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

// red rubber stamp that slams in (p = frames since it started)
const RedStamp: React.FC<{ x: number; y: number; age: number; text: string; w?: number; rot?: number; size?: number }> = ({ x, y, age, text, w = 700, rot = -8, size = 96 }) =>
  age < 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${interpolate(age, [0, 6], [2.2, 1], { ...clamp, easing: Easing.bezier(0.3, 1.4, 0.5, 1) })})`} opacity={interpolate(age, [0, 3], [0, 1], clamp)}>
      <rect x={-w / 2} y={-84} width={w} height={168} rx={18} fill="rgba(244,234,213,0.92)" stroke="#D7322A" strokeWidth={14} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill="#D7322A" textLength={w - 70} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  );

// thick limb with an ink outline
const Limb: React.FC<{ a: P; b: P; w: number; col?: string }> = ({ a, b, w, col = STEEL }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={STEEL_HI} strokeWidth={w * 0.22} strokeLinecap="round" opacity={col === STEEL ? 0.7 : 0} transform={`translate(${-w * 0.18} ${-w * 0.18})`} />
  </g>
);

// heater shield, origin = centre
const Heater: React.FC<{ col?: string; col2?: string; s?: number }> = ({ col = RED, col2 = GOLD, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M -60 -72 L 60 -72 L 56 10 Q 36 70 0 92 Q -36 70 -56 10 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -50 24 L 0 -26 L 50 24 L 44 50 L 0 8 L -44 50 Z" fill={col2} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -46 -60 L 44 -60" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
  </g>
);

// side-view lance: origin = grip, along +x, rotated by ang (deg, + = tip down). front = length ahead of the grip
const Lance: React.FC<{ ang: number; front?: number; back?: number; broken?: boolean; col?: string }> = ({ ang, front = 620, back = 190, broken = false, col = RED }) => {
  const w = (x: number) => lerp(17, 7, (x + back) / (front + back + 1));
  const bands: number[] = [];
  for (let k = -back + 40; k < front - 40; k += 72) bands.push(k);
  return (
    <g transform={`rotate(${ang})`}>
      <path d={`M ${-back} ${-w(-back)} L ${front} ${-w(front)} L ${front} ${w(front)} L ${-back} ${w(-back)} Z`} fill={LANCE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {bands.map((k) => (
        <path key={k} d={`M ${k} ${-w(k) + 2} L ${k + 30} ${-w(k + 30) + 2} L ${k + 18} ${w(k + 18) - 2} L ${k - 12} ${w(k - 12) - 2} Z`} fill={col} />
      ))}
      {broken ? (
        <path d={`M ${front} ${-w(front) - 3} L ${front + 22} ${-3} L ${front + 6} ${1} L ${front + 26} ${w(front) + 2} L ${front} ${w(front) + 3}`} fill={LANCE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      ) : (
        <path d={`M ${front} -9 L ${front + 30} -16 L ${front + 22} -4 L ${front + 34} 0 L ${front + 22} 4 L ${front + 30} 16 L ${front} 9 Z`} fill={STEEL} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      )}
      <path d="M 16 -48 L 84 -17 L 84 17 L 16 48 Q 6 0 16 -48 Z" fill={STEEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 26 -30 L 70 -12" stroke={STEEL_HI} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// gold crown, origin = centre of the band's bottom edge
const Crown: React.FC = () => (
  <g>
    <path d="M -60 -6 L -52 -48 L -34 -22 L -14 -58 L 6 -22 L 26 -50 L 40 -20 L 56 -40 L 60 0 Q 0 10 -60 2 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -56 -10 Q 0 -2 58 -12" stroke={GOLD_D} strokeWidth={6} fill="none" />
    {[-24, 12].map((cx) => (
      <circle key={cx} cx={cx} cy={-8} r={7} fill={RED} stroke={INK} strokeWidth={3} />
    ))}
    <circle cx={-14} cy={-58} r={5} fill={WHITE} stroke={INK} strokeWidth={2} />
  </g>
);

type Arm = "couch" | "type" | "down";
// side-view knight facing right, origin = seat (hip). visor: 1 = down, 0 = up
const SideKnight: React.FC<{
  f: number;
  visor?: number;
  arm?: Arm;
  lanceAng?: number;
  lanceFront?: number;
  broken?: boolean;
  legs?: "ride" | "sit" | "none";
  coat?: string;
  coat2?: string;
  plume?: string;
  shield?: string | null;
  crown?: boolean;
  lanceCol?: string;
  tap?: number;
}> = ({ f, visor = 1, arm = "couch", lanceAng = 6, lanceFront = 620, broken = false, legs = "ride", coat = RED, coat2 = GOLD, plume = PLUME, shield = RED, crown = false, lanceCol = RED, tap = 0 }) => {
  const wave = Math.sin(f / 3) * 10;
  return (
    <g>
      {/* plume streams back */}
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M -4 -300 Q ${-60 - k * 10} ${-352 + k * 14 + wave * 0.5} ${-140 - k * 18} ${-312 + k * 30 + wave}`} stroke={INK} strokeWidth={30 - k * 5} fill="none" strokeLinecap="round" />
      ))}
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M -4 -300 Q ${-60 - k * 10} ${-352 + k * 14 + wave * 0.5} ${-140 - k * 18} ${-312 + k * 30 + wave}`} stroke={k === 1 ? WHITE : plume} strokeWidth={20 - k * 5} fill="none" strokeLinecap="round" />
      ))}
      {shield ? (
        <g transform="translate(84 -126) rotate(-6)">
          <Heater col={shield} col2={shield === BLUE ? WHITE : GOLD} s={0.82} />
        </g>
      ) : null}
      {legs === "ride" ? (
        <g>
          <Limb a={[0, 0]} b={[86, 72]} w={44} />
          <Limb a={[86, 72]} b={[66, 222]} w={36} />
          <circle cx={86} cy={72} r={26} fill={STEEL} stroke={INK} strokeWidth={6} />
          <path d="M 40 212 L 150 236 L 56 252 Z" fill={STEEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 44 256 L 112 256" stroke={INK} strokeWidth={9} strokeLinecap="round" />
        </g>
      ) : legs === "sit" ? (
        <g>
          <Limb a={[0, 0]} b={[132, 8]} w={46} />
          <Limb a={[132, 8]} b={[140, 166]} w={36} />
          <circle cx={132} cy={8} r={26} fill={STEEL} stroke={INK} strokeWidth={6} />
          <path d="M 116 158 L 222 180 L 126 196 Z" fill={STEEL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        </g>
      ) : null}
      {/* tabard skirt + steel torso */}
      <path d="M -62 -24 L 64 -24 L 84 80 Q 0 96 -82 80 Z" fill={coat} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 2 -24 L 64 -24 L 84 80 Q 44 90 2 92 Z" fill={coat2} />
      <path d="M -62 -24 L 64 -24 L 84 80 Q 0 96 -82 80 Z" fill="none" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -56 8 Q -66 -60 -64 -120 Q -60 -176 -40 -194 L 26 -196 Q 66 -176 72 -116 Q 80 -56 58 8 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 44 -170 Q 70 -110 54 -24" stroke={STEEL_HI} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M -40 -150 Q -48 -90 -40 -30" stroke={STEEL_D} strokeWidth={7} fill="none" strokeLinecap="round" />
      <rect x={-62} y={-34} width={130} height={20} rx={6} fill={WOOD_D} stroke={INK} strokeWidth={5} />
      <rect x={30} y={-36} width={22} height={24} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
      <path d="M -36 -212 L 48 -212 L 52 -188 L -40 -188 Z" fill={STEEL_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* helmet */}
      <path d="M -50 -226 Q -60 -300 0 -314 Q 60 -316 72 -262 L 72 -214 Q 20 -200 -50 -206 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -26 -296 Q 10 -312 44 -298" stroke={STEEL_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
      {visor < 1 ? (
        <g>
          <ellipse cx={52} cy={-248} rx={28} ry={24} fill="#2A2420" stroke={INK} strokeWidth={5} />
          <circle cx={62} cy={-252} r={8} fill="#FFFFFF" />
          <circle cx={66} cy={-252} r={4} fill={INK} />
        </g>
      ) : null}
      <g transform={`rotate(${-(1 - visor) * 80} -6 -258)`}>
        <path d="M 16 -294 Q 72 -292 112 -246 Q 72 -210 20 -204 Q 34 -250 16 -294 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 40 -262 L 100 -248" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={58 + k * 13} cy={-226 + k * 2} r={4} fill={INK} />
        ))}
      </g>
      {crown ? (
        <g transform="translate(10 -278)">
          <Crown />
        </g>
      ) : null}
      {/* near arm (+ lance) */}
      {arm === "couch" ? (
        <g>
          <g transform="translate(76 -100)">
            <Lance ang={lanceAng} front={lanceFront} broken={broken} col={lanceCol} />
          </g>
          <Limb a={[8, -158]} b={[-8, -92]} w={36} />
          <Limb a={[-8, -92]} b={[70, -100]} w={32} />
          <circle cx={76} cy={-100} r={22} fill={STEEL_D} stroke={INK} strokeWidth={6} />
        </g>
      ) : arm === "type" ? (
        <g>
          <Limb a={[8, -158]} b={[46, -80]} w={36} />
          <Limb a={[46, -80]} b={[146, -84 + tap]} w={32} />
          <circle cx={152} cy={-84 + tap} r={22} fill={STEEL_D} stroke={INK} strokeWidth={6} />
        </g>
      ) : (
        <g>
          <Limb a={[8, -158]} b={[16, -80]} w={36} />
          <Limb a={[16, -80]} b={[30, 0]} w={32} />
          <circle cx={32} cy={6} r={22} fill={STEEL_D} stroke={INK} strokeWidth={6} />
        </g>
      )}
      <path d="M -38 -150 Q -40 -206 8 -212 Q 56 -206 54 -150 Q 8 -136 -38 -150 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -34 -166 Q 8 -152 50 -166 M -30 -182 Q 8 -170 46 -182" stroke={STEEL_D} strokeWidth={5} fill="none" />
    </g>
  );
};

// front-view knight, origin = feet centre. legs=false draws from the hips up (for the head-on charger)
const FrontKnight: React.FC<{ f: number; legs?: boolean; upright?: boolean; shield?: boolean; helmY?: number; coat?: string; coat2?: string; pennant?: string }> = ({ f, legs = true, upright = false, shield = true, helmY = 0, coat = RED, coat2 = GOLD, pennant }) => {
  const wave = Math.sin(f / 3) * 14;
  return (
    <g>
      {upright ? (
        <g>
          <path d={`M -214 -1290 L -150 ${-1250 + wave * 0.6} L -214 -1196 Z`} fill={coat} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {pennant ? null : null}
          <path d="M -214 30 L -214 -1300" stroke={INK} strokeWidth={30} strokeLinecap="round" />
          <path d="M -214 30 L -214 -1300" stroke={LANCE} strokeWidth={18} strokeLinecap="round" />
          {[-1180, -1040, -900, -760, -620, -480, -340, -200, -60].map((y) => (
            <path key={y} d={`M -223 ${y} L -205 ${y - 30}`} stroke={coat} strokeWidth={14} />
          ))}
        </g>
      ) : null}
      {legs
        ? [-1, 1].map((sd) => (
            <g key={sd}>
              <path d={`M ${sd * 30} -444 L ${sd * 114} -444 L ${sd * 104} -262 L ${sd * 52} -262 Z`} fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
              <path d={`M ${sd * 54} -228 L ${sd * 104} -228 L ${sd * 98} -52 L ${sd * 62} -52 Z`} fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
              <path d={`M ${sd * 70} -410 L ${sd * 66} -280 M ${sd * 70} -210 L ${sd * 72} -70`} stroke={STEEL_HI} strokeWidth={8} strokeLinecap="round" />
              <circle cx={sd * 79} cy={-244} r={36} fill={STEEL} stroke={INK} strokeWidth={7} />
              <circle cx={sd * 79} cy={-244} r={14} fill={STEEL_D} />
              <path d={`M ${sd * 36} -54 L ${sd * 120} -54 Q ${sd * 128} -6 ${sd * 80} 2 Q ${sd * 32} -6 ${sd * 36} -54 Z`} fill={STEEL_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            </g>
          ))
        : null}
      {/* tabard (party per pale) */}
      <path d="M -128 -694 L 128 -694 L 142 -484 L 162 -300 Q 0 -280 -162 -300 L -142 -484 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -694 L 128 -694 L 142 -484 L 162 -300 Q 80 -290 0 -288 Z" fill={coat2} />
      <path d="M -128 -694 L 128 -694 L 142 -484 L 162 -300 Q 0 -280 -162 -300 L -142 -484 Z" fill="none" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -60 -640 L 0 -580 L 60 -640 M -60 -600 L 0 -540 L 60 -600" stroke={coat === RED ? WHITE : GOLD} strokeWidth={16} fill="none" strokeLinejoin="round" opacity={0.95} />
      <rect x={-146} y={-500} width={292} height={30} rx={8} fill={WOOD_D} stroke={INK} strokeWidth={5} />
      <rect x={-22} y={-504} width={44} height={38} rx={6} fill={GOLD} stroke={INK} strokeWidth={5} />
      {/* arms */}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <Limb a={[sd * 196, -664]} b={[sd * 214, -548]} w={50} />
          <Limb a={[sd * 214, -548]} b={[sd * 214, -440]} w={46} />
          <circle cx={sd * 214} cy={-548} r={30} fill={STEEL} stroke={INK} strokeWidth={6} />
          <circle cx={sd * 214} cy={-420} r={36} fill={STEEL_D} stroke={INK} strokeWidth={6} />
          <path d={`M ${sd * 90} -764 Q ${sd * 200} -796 ${sd * 234} -692 Q ${sd * 238} -640 ${sd * 210} -618 Q ${sd * 150} -650 ${sd * 92} -660 Z`} fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d={`M ${sd * 110} -700 Q ${sd * 180} -716 ${sd * 222} -664 M ${sd * 116} -676 Q ${sd * 176} -690 ${sd * 214} -642`} stroke={STEEL_D} strokeWidth={6} fill="none" />
          <path d={`M ${sd * 120} -760 Q ${sd * 180} -770 ${sd * 214} -730`} stroke={STEEL_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M -80 -784 L 80 -784 L 94 -692 L -94 -692 Z" fill={STEEL_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -84 -754 L 84 -754 M -88 -724 L 88 -724" stroke={STEEL_K} strokeWidth={5} />
      {/* helmet + plume */}
      <g transform={`translate(0 ${helmY})`}>
        {[-2, -1, 0, 1, 2].map((k) => (
          <path key={k} d={`M ${k * 8} -996 Q ${k * 44 + wave * 0.6} -1120 ${k * 92 + wave} ${-1096 + Math.abs(k) * 34}`} stroke={INK} strokeWidth={40 - Math.abs(k) * 4} fill="none" strokeLinecap="round" />
        ))}
        {[-2, -1, 0, 1, 2].map((k) => (
          <path key={k} d={`M ${k * 8} -996 Q ${k * 44 + wave * 0.6} -1120 ${k * 92 + wave} ${-1096 + Math.abs(k) * 34}`} stroke={k % 2 ? WHITE : PLUME} strokeWidth={28 - Math.abs(k) * 4} fill="none" strokeLinecap="round" />
        ))}
        <path d="M -106 -790 Q -116 -944 -64 -994 Q 0 -1022 64 -994 Q 116 -944 106 -790 Q 0 -766 -106 -790 Z" fill={STEEL} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -96 -930 Q 0 -962 96 -930 L 92 -800 Q 0 -780 -92 -800 Z" fill="#B3BDCB" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 0 -1010 L 0 -786" stroke={STEEL_D} strokeWidth={7} />
        <rect x={-88} y={-906} width={176} height={20} rx={9} fill={INK} />
        <ellipse cx={-40} cy={-896} rx={9} ry={5} fill="#FFFFFF" opacity={0.6 + 0.4 * Math.sin(f / 4)} />
        <ellipse cx={40} cy={-896} rx={9} ry={5} fill="#FFFFFF" opacity={0.6 + 0.4 * Math.sin(f / 4)} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={36 + c * 16} cy={-852 + r * 16} r={4.5} fill={INK} />),
        )}
        <path d="M -70 -966 Q -94 -900 -86 -826" stroke={STEEL_HI} strokeWidth={11} fill="none" strokeLinecap="round" />
      </g>
      {shield ? (
        <g transform="translate(262 -560) rotate(6)">
          <Heater col={coat} col2={coat2} s={1.55} />
        </g>
      ) : null}
    </g>
  );
};

// the head-on charge: barded warhorse + knight, lance lowered straight at the lens. origin = ground centre
const Charger: React.FC<{ f: number; lanceP?: number }> = ({ f, lanceP = 0 }) => {
  const ph = f / 2.4;
  const hem = (y: number) =>
    new Array(9)
      .fill(0)
      .map((_, i) => {
        const x0 = -350 + i * (700 / 9);
        const x1 = x0 + 700 / 9;
        return `Q ${(x0 + x1) / 2} ${y + 46 + Math.sin(f / 2 + i) * 10} ${x1} ${y}`;
      })
      .join(" ");
  const grip: P = [-176, -900];
  const tip: P = [-96, -440];
  const tr = 138 * (1 + lanceP * 0.25);
  return (
    <g>
      {/* neck (crinet cloth) */}
      <path d="M -128 -1060 L 128 -1060 L 176 -720 L -176 -720 Z" fill={RED_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* knight from the hips up */}
      <g transform="translate(0 -548) scale(0.8)">
        <FrontKnight f={f} legs={false} shield />
      </g>
      {/* front legs (galloping) */}
      {[-1, 1].map((sd, i) => {
        const lift = Math.max(0, Math.sin(ph + i * Math.PI));
        const knee: P = [sd * 108, -190 - lift * 70];
        const hoof: P = [sd * 112, -14 - lift * 150];
        return (
          <g key={sd}>
            <Limb a={[sd * 104, -340]} b={knee} w={74} col={HORSE_D} />
            <Limb a={knee} b={hoof} w={58} col={HORSE} />
            <ellipse cx={hoof[0]} cy={hoof[1] + 10} rx={44 * (1 + lift * 0.25)} ry={22 * (1 + lift * 0.25)} fill={HOOF} stroke={INK} strokeWidth={6} />
          </g>
        );
      })}
      {/* caparison (party per pale) */}
      <path d={`M -176 -770 Q -330 -640 -350 -300 ${hem(-300)} Q 330 -640 176 -770 Z`} fill={RED} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M 0 -790 L 176 -770 Q 330 -640 350 -300 Q 175 -260 0 -270 Z`} fill={GOLD} />
      <path d={`M -176 -770 Q -330 -640 -350 -300 ${hem(-300)} Q 330 -640 176 -770 Z`} fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M -350 -300 ${hem(-300)}`} stroke={WHITE} strokeWidth={14} fill="none" opacity={0.9} />
      <g transform="translate(0 -500)">
        <Heater col={BLUE} col2={WHITE} s={1.25} />
      </g>
      {/* rider's legs at the horse's sides */}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <Limb a={[sd * 196, -880]} b={[sd * 300, -700]} w={50} />
          <Limb a={[sd * 300, -700]} b={[sd * 318, -560]} w={42} />
          <circle cx={sd * 300} cy={-700} r={30} fill={STEEL} stroke={INK} strokeWidth={6} />
          <path d={`M ${sd * 290} -566 L ${sd * 350} -566 L ${sd * 330} -520 L ${sd * 296} -520 Z`} fill={STEEL_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        </g>
      ))}
      {/* horse head, front view, with a steel chanfron */}
      {[-1, 1].map((sd) => (
        <path key={sd} d={`M ${sd * 64} -1046 L ${sd * 118} -1150 L ${sd * 104} -1020 Z`} fill={HORSE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ))}
      <path d="M -102 -1044 Q -124 -900 -88 -764 Q -76 -664 0 -654 Q 76 -664 88 -764 Q 124 -900 102 -1044 Q 0 -1084 -102 -1044 Z" fill={HORSE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <circle cx={sd * 100} cy={-930} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={sd * 102} cy={-928} r={9} fill={INK} />
          <ellipse cx={sd * 38} cy={-700} rx={17} ry={22 + 6 * Math.abs(Math.sin(ph))} fill="#4A3028" stroke={INK} strokeWidth={4} />
          <circle cx={sd * 82} cy={-712} r={15} fill="none" stroke={GOLD} strokeWidth={7} />
        </g>
      ))}
      <path d="M -74 -1056 L 74 -1056 L 60 -778 Q 0 -742 -60 -778 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -1050 L 0 -760" stroke={STEEL_D} strokeWidth={7} />
      <path d="M -50 -1030 Q -60 -900 -44 -800" stroke={STEEL_HI} strokeWidth={9} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-990} r={22} fill={GOLD} stroke={INK} strokeWidth={5} />
      {[-1, 1].map((sd) => (
        <path key={sd} d={`M ${sd * 82} -712 Q ${sd * 150} -800 ${sd * 171} -884`} stroke={RED_D} strokeWidth={9} fill="none" />
      ))}
      {/* breath puffs */}
      {[0, 1].map((k) => {
        const p = ((f + k * 9) % 18) / 18;
        return <circle key={k} cx={(k ? 1 : -1) * (50 + p * 70)} cy={-650 + p * 40} r={14 + p * 26} fill="#FFFFFF" opacity={0.6 * (1 - p)} />;
      })}
      {/* lance: foreshortened shaft from the grip to a huge coronel at the lens */}
      <circle cx={tip[0] + 14} cy={tip[1] + 18} r={tr + 14} fill="#000" opacity={0.22} />
      <path d={band(grip, tip, 0, 1, 34, tr * 0.8)} fill={LANCE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={band(grip, tip, 0.3, 0.48, 34, tr * 0.8)} fill={RED} />
      <path d={band(grip, tip, 0.66, 0.84, 34, tr * 0.8)} fill={RED} />
      <ellipse cx={grip[0] + 16} cy={grip[1] + 14} rx={84} ry={74} fill={STEEL} stroke={INK} strokeWidth={7} />
      <path d={`M ${grip[0] - 40} ${grip[1] - 30} Q ${grip[0] + 10} ${grip[1] - 50} ${grip[0] + 60} ${grip[1] - 10}`} stroke={STEEL_HI} strokeWidth={9} fill="none" strokeLinecap="round" />
      <ellipse cx={grip[0] + 26} cy={grip[1] + 24} rx={40} ry={34} fill={STEEL_D} stroke={INK} strokeWidth={5} />
      <circle cx={grip[0] - 4} cy={grip[1] - 8} r={30} fill={STEEL_D} stroke={INK} strokeWidth={6} />
      <g transform={`translate(${tip[0]} ${tip[1]})`}>
        <circle r={tr} fill={STEEL} stroke={INK} strokeWidth={9} />
        <circle r={tr * 0.62} fill="#B3BDCB" stroke={INK} strokeWidth={6} />
        {[0, 1, 2].map((k) => {
          const a = (k / 3) * Math.PI * 2 - Math.PI / 2;
          return <path key={k} d={`M ${Math.cos(a) * tr * 0.2} ${Math.sin(a) * tr * 0.2} L ${Math.cos(a) * tr * 0.92} ${Math.sin(a) * tr * 0.92}`} stroke={INK} strokeWidth={14} strokeLinecap="round" />;
        })}
        {[0, 1, 2].map((k) => {
          const a = (k / 3) * Math.PI * 2 - Math.PI / 2;
          return <circle key={k} cx={Math.cos(a) * tr * 0.92} cy={Math.sin(a) * tr * 0.92} r={tr * 0.16} fill={STEEL_HI} stroke={INK} strokeWidth={5} />;
        })}
        <ellipse cx={-tr * 0.4} cy={-tr * 0.45} rx={tr * 0.2} ry={tr * 0.1} fill="#FFFFFF" opacity={0.8} transform={`rotate(-35 ${-tr * 0.4} ${-tr * 0.45})`} />
      </g>
    </g>
  );
};

// ---------- side-view warhorse (leg/body approach copied from ep066 Steed), with caparison + chanfron ----------
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

const BODY_PARTS = (head: number) => [
  <ellipse key="b" cx={0} cy={0} rx={238} ry={118} />,
  <circle key="r" cx={-188} cy={-16} r={122} />,
  <circle key="c" cx={176} cy={-4} r={116} />,
  <path key="n" d={`M 105 -60 C 150 -170 ${215} ${-262 + head} ${288} ${-322 + head} L ${392} ${-262 + head} C 345 -190 300 -90 272 24 Z`} />,
  <path key="h" d={`M ${272} ${-334 + head} C ${310} ${-374 + head} ${372} ${-362 + head} ${398} ${-324 + head} L ${506} ${-206 + head} C ${524} ${-180 + head} ${508} ${-150 + head} ${480} ${-150 + head} C ${452} ${-150 + head} ${432} ${-160 + head} ${412} ${-172 + head} L ${300} ${-248 + head} Z`} />,
];

// origin: x = barrel centre, gy = ground line. rider node is drawn at the saddle.
const Destrier: React.FC<{ x: number; gy: number; s?: number; f: number; run?: boolean; flip?: boolean; dark?: boolean; cap?: [string, string]; rider?: React.ReactNode; stride?: number }> = ({ x, gy, s = 1, f, run = true, flip = false, dark = false, cap = [RED, GOLD], rider, stride = 11 }) => {
  const col = dark ? HORSE2 : HORSE;
  const dcol = dark ? HORSE2_D : HORSE_D;
  const hi = dark ? HORSE2_HI : HORSE_HI;
  const t = f / stride;
  const bob = run ? 12 * Math.cos(2 * Math.PI * t) : 0;
  const pitch = run ? 3 * Math.sin(2 * Math.PI * t) : 0;
  const head = run ? 6 * Math.sin(2 * Math.PI * t + 1) : 4 * Math.sin(f / 14);
  const tw = run ? 18 * Math.sin(f / 2.6) : 6 * Math.sin(f / 9);
  const Y = gy - (run ? 372 : 386) * s;
  const legs: { h: P; front: boolean; off: number; far: boolean }[] = [
    { h: [-150, 40], front: false, off: 0, far: true },
    { h: [205, 55], front: true, off: 0.5, far: true },
    { h: [-185, 45], front: false, off: 0.1, far: false },
    { h: [170, 60], front: true, off: 0.6, far: false },
  ];
  const legAng = (L: { front: boolean; off: number }): [number, number] => {
    if (!run) return L.front ? [3, 0] : [-8, 10];
    const p = 2 * Math.PI * (t - L.off);
    const sn = Math.sin(p);
    const fold = Math.pow(Math.max(0, Math.cos(p)), 1.5);
    return L.front ? [12 + 44 * sn, -118 * fold] : [-10 + 38 * sn, 16 - 82 * fold];
  };
  const parts = BODY_PARTS(head);
  const hemPts = new Array(8)
    .fill(0)
    .map((_, i) => {
      const x0 = 250 - i * 75;
      return `Q ${x0 - 37} ${200 + Math.sin(f / 2 + i) * 10} ${x0 - 75} ${170}`;
    })
    .join(" ");
  return (
    <g transform={`translate(${x} ${Y + bob}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`rotate(${pitch} -170 45)`}>
        {legs.map((L, i) => {
          const [a1, a2] = legAng(L);
          return <Leg key={i} h={L.h} l1={L.front ? 150 : 162} l2={L.front ? 152 : 158} a1={a1} a2={a2} w1={L.front ? 70 : 84} w2={40} col={L.far ? dcol : col} />;
        })}
        <path d={`M -290 -70 C -360 ${-90 + tw} -450 ${-50 + tw} -530 ${-70 + 2 * tw} C -480 ${0 + tw} -410 ${50} -300 -14 Z`} fill={MANE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <g fill={INK} stroke={INK} strokeWidth={15} strokeLinejoin="round">{parts}</g>
        <g fill={col}>{parts}</g>
        <path d={`M 130 -110 C 170 -180 ${230} ${-260 + head} ${280} ${-300 + head}`} stroke={hi} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
        <g transform={`translate(0 ${head})`}>
          <path d="M 450 -216 L 506 -206 C 524 -180 508 -150 480 -150 C 458 -150 440 -158 424 -170 Z" fill={dcol} />
          <path d="M 296 -328 L 238 -370 L 322 -346 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {/* chanfron */}
          <path d="M 300 -342 L 372 -352 L 500 -214 L 470 -186 L 330 -300 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 336 -334 L 470 -212" stroke={STEEL_HI} strokeWidth={7} strokeLinecap="round" />
          <circle cx={352} cy={-290} r={13} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          <circle cx={356} cy={-292} r={6} fill={INK} />
          <ellipse cx={494} cy={-186} rx={10} ry={6} fill={INK} transform="rotate(40 494 -186)" />
          <path d="M 318 -336 L 410 -214 M 420 -236 L 466 -168" stroke={RED_D} strokeWidth={11} strokeLinecap="round" />
          <circle cx={466} cy={-168} r={9} fill={GOLD} stroke={INK} strokeWidth={4} />
        </g>
        {/* crinet (neck cloth) + caparison */}
        <path d={`M 110 -90 C 150 -180 ${220} ${-250 + head} ${282} ${-300 + head} L ${344} ${-250 + head} C 310 -180 290 -90 276 10 Z`} fill={cap[0]} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M -300 -110 Q -60 -150 250 -120 L 268 170 ${hemPts} Q -320 60 -300 -110 Z`} fill={cap[0]} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d={`M -40 -136 Q 100 -140 250 -120 L 268 170 Q 170 196 120 170 Q 80 196 -40 176 Z`} fill={cap[1]} opacity={0.95} />
        <path d={`M -300 -110 Q -60 -150 250 -120 L 268 170 ${hemPts} Q -320 60 -300 -110 Z`} fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d={`M 268 170 ${hemPts}`} stroke={WHITE} strokeWidth={12} fill="none" opacity={0.85} />
        <g transform="translate(-160 30)">
          <Heater col={cap[1]} col2={cap[0]} s={0.9} />
        </g>
        {rider ? <g transform={`translate(-15 -128) rotate(${-pitch})`}>{rider}</g> : null}
      </g>
    </g>
  );
};

// tournament field background: stands with a crowd, striped pavilions, banners; y0 = top of the sand
const Lists: React.FC<{ f: number; y0: number; seed: string; crowd?: boolean }> = ({ f, y0, seed, crowd = true }) => (
  <>
    {[0, 1, 2, 3].map((k) => {
      const px = 60 + k * 300;
      const h = 220 + (k % 2) * 60;
      return (
        <g key={k}>
          <path d={`M ${px - 110} ${y0 - 60} L ${px} ${y0 - 60 - h} L ${px + 110} ${y0 - 60} Z`} fill={k % 2 ? BLUE : RED} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {[-60, 0, 60].map((sx) => (
            <path key={sx} d={`M ${px} ${y0 - 60 - h} L ${px + sx * 1.6} ${y0 - 60}`} stroke={WHITE} strokeWidth={14} opacity={0.85} />
          ))}
          <path d={`M ${px} ${y0 - 60 - h} L ${px} ${y0 - 110 - h}`} stroke={INK} strokeWidth={6} />
          <path d={`M ${px} ${y0 - 110 - h} L ${px + 60} ${y0 - 96 - h + Math.sin(f / 4 + k) * 8} L ${px} ${y0 - 80 - h} Z`} fill={GOLD} stroke={INK} strokeWidth={4} />
        </g>
      );
    })}
    <rect x={-10} y={y0 - 120} width={1100} height={130} fill={WOOD} stroke={INK} strokeWidth={6} />
    {crowd
      ? new Array(26).fill(0).map((_, i) => {
          const cx = 20 + i * 42 + random(`${seed}c${i}`) * 10;
          const cy = y0 - 92 + (i % 2) * 22 - Math.abs(Math.sin(f / 5 + i)) * 8;
          const cols = [RED, BLUE, GOLD, "#2E7D7A", "#7A3E8E", WHITE];
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={15} fill="#E8B98E" stroke={INK} strokeWidth={3} />
              <path d={`M ${cx - 18} ${cy + 40} Q ${cx} ${cy + 6} ${cx + 18} ${cy + 40} Z`} fill={cols[i % cols.length]} stroke={INK} strokeWidth={3} />
            </g>
          );
        })
      : null}
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <path key={k} d={`M ${k * 160 + 20} ${y0 - 120} L ${k * 160 + 60} ${y0 - 120} L ${k * 160 + 40} ${y0 - 70} Z`} fill={k % 2 ? RED : GOLD} stroke={INK} strokeWidth={4} />
    ))}
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={SAND} />
    {new Array(14).fill(0).map((_, i) => (
      <ellipse key={i} cx={random(`${seed}s${i}`) * 1080} cy={y0 + 40 + random(`${seed}t${i}`) * (1880 - y0)} rx={40} ry={8} fill={SAND_D} opacity={0.7} />
    ))}
  </>
);

// sunburst for close-ups
const Rays: React.FC<{ f: number; cx: number; cy: number; c1?: string; c2?: string }> = ({ f, cx, cy, c1 = C.brick, c2 = C.mustard }) => (
  <>
    <circle cx={cx} cy={cy} r={560} fill={c1} opacity={0.35} />
    <circle cx={cx} cy={cy} r={400} fill={c2} opacity={0.2} />
    {new Array(16).fill(0).map((_, i) => {
      const a = (i / 16) * Math.PI * 2 + f / 70;
      return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a) * 1500} ${cy + Math.sin(a) * 1500} L ${cx + Math.cos(a + 0.12) * 1500} ${cy + Math.sin(a + 0.12) * 1500} Z`} fill={c2} opacity={0.1} />;
    })}
  </>
);

// world position of a point given in rider coords for a Destrier at (x, gy, s, flip)
const riderPt = (x: number, gy: number, s: number, flip: boolean, p: P): P => {
  const Y = gy - 372 * s;
  const lx = -15 + p[0];
  const ly = -128 + p[1];
  return [x + (flip ? -lx : lx) * s, Y + ly * s];
};
// lance angle (deg) + front length (rider units) so that the tip meets target
const aimAt = (grip: P, target: P, s: number, flip: boolean): [number, number] => {
  const dx = (target[0] - grip[0]) * (flip ? -1 : 1);
  const dy = target[1] - grip[1];
  return [(Math.atan2(dy, dx) * 180) / Math.PI, Math.hypot(dx, dy) / s];
};

const Splinters: React.FC<{ x: number; y: number; age: number; n?: number; seed: string; sc?: number }> = ({ x, y, age, n = 16, seed, sc = 1 }) =>
  age < 0 ? null : (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const a = random(`${seed}a${i}`) * Math.PI * 2;
        const sp = (9 + random(`${seed}v${i}`) * 16) * sc;
        const px = x + Math.cos(a) * sp * age;
        const py = y + Math.sin(a) * sp * age * 0.8 + age * age * 0.6 * sc;
        const len = (30 + random(`${seed}l${i}`) * 50) * sc;
        return (
          <g key={i} transform={`translate(${px} ${py}) rotate(${age * (20 + i * 7) + i * 40})`} opacity={interpolate(age, [14, 24], [1, 0], clamp)}>
            <path d={`M ${-len / 2} -${5 * sc} L ${len / 2} -${2 * sc} L ${len / 2 + 8 * sc} 0 L ${len / 2} ${3 * sc} L ${-len / 2} ${5 * sc} Z`} fill={i % 3 ? LANCE : RED} stroke={INK} strokeWidth={3 * sc} strokeLinejoin="round" />
          </g>
        );
      })}
      <circle cx={x} cy={y} r={20 + age * 14 * sc} fill="none" stroke="#FFFFFF" strokeWidth={14 * sc} opacity={interpolate(age, [0, 8], [0.9, 0], clamp)} />
    </>
  );

export const Knight67: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "charge";
  const float: string[] = v.float ?? [];
  let sky: Sky = "day";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  let accent: string[] = v.accent ?? [];
  let hlFrom = mode === "charge" ? -30 : 0;
  const ansF = Math.round((v.answerAt ?? 0.65) * dur);

  if (mode === "charge") {
    // frame 0: the knight thunders head-on at the lens, lance lowered straight at the viewer
    const k = interpolate(f, [0, dur], [0.9, 0.98], clamp);
    const bob = -Math.abs(Math.sin(f / 2.4)) * 16;
    const lp = interpolate(f, [0, dur], [0, 1], clamp);
    body = (
      <>
        <Lists f={f} y0={1080} seed="ch" />
        <path d="M 620 1070 L 1090 1470 L 1090 1780 L 620 1112 Z" fill={BLUE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 620 1070 L 1090 1470" stroke={WOOD} strokeWidth={22} strokeLinecap="round" />
        {[0.12, 0.3, 0.55, 0.88].map((t) => (
          <path key={t} d={`M ${lerp(620, 1090, t)} ${lerp(1070, 1470, t)} L ${lerp(620, 1090, t)} ${lerp(1112, 1780, t)}`} stroke={WOOD_D} strokeWidth={8 + t * 30} />
        ))}
        <path d="M 460 1070 L -10 1470 L -10 1500 L 460 1086 Z" fill={WOOD} stroke={INK} strokeWidth={5} />
        {new Array(16).fill(0).map((_, i) => {
          const a = (i / 16) * Math.PI * 2 + 0.2;
          const r = 260 + ((f * 46 + i * 131) % 900);
          return <path key={i} d={`M ${540 + Math.cos(a) * r} ${1000 + Math.sin(a) * r} L ${540 + Math.cos(a) * (r + 150)} ${1000 + Math.sin(a) * (r + 150)}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.55} />;
        })}
        {[-1, 1].map((sd) =>
          [0, 1, 2].map((j) => {
            const p = ((f + j * 6) % 18) / 18;
            return <ellipse key={`${sd}${j}`} cx={540 + sd * (240 + p * 260)} cy={1860 - p * 60} rx={70 + p * 120} ry={34 + p * 50} fill="#D9BE88" opacity={0.75 * (1 - p)} />;
          }),
        )}
        <g transform={`translate(540 ${1900 + bob}) scale(${k})`}>
          <Charger f={f} lanceP={lp} />
        </g>
      </>
    );
  } else if (mode === "joust") {
    // side-on: two knights gallop at each other along the tilt; visors snap down, lances drop… CRACK
    const hit = (v.hitAt ?? 0.86) * dur;
    const vis = (v.visorAt ?? 0.2) * dur;
    const p = interpolate(Math.min(f, hit), [0, hit], [0, 1], clamp);
    const sN = 0.66;
    const sF = 0.58;
    const gN = 1830;
    const gF = 1560;
    const nx = lerp(-60, 330, p);
    const fx = lerp(1160, 770, p);
    const nxH = 330;
    const fxH = 770;
    const visor = ease(f, vis, vis + 4);
    const lanceAt = (v.lanceAt ?? 0.3) * dur;
    const couch = ease(f, lanceAt, lanceAt + 10);
    const broke = f >= hit;
    const [angN, lenN] = aimAt(riderPt(nxH, gN, sN, false, [76, -100]), riderPt(fxH, gF, sF, true, [84, -126]), sN, false);
    const [angF, lenF] = aimAt(riderPt(fxH, gF, sF, true, [76, -100]), riderPt(nxH, gN, sN, false, [84, -126]), sF, true);
    const contact = riderPt(fxH, gF, sF, true, [84, -126]);
    body = (
      <>
        <Lists f={f} y0={1120} seed="js" />
        <Destrier x={fx} gy={gF} s={sF} f={f + 5} flip dark cap={[BLUE, WHITE]} rider={<SideKnight f={f} visor={visor} lanceAng={lerp(-62, angF, couch)} lanceFront={broke ? 300 : lerp(620, lenF, couch)} broken={broke} shield={BLUE} coat={BLUE} coat2={WHITE} plume={BLUE} lanceCol={BLUE} />} />
        <rect x={-10} y={1460} width={1100} height={130} fill={BLUE_D} stroke={INK} strokeWidth={6} />
        <path d="M -10 1494 L 1090 1494" stroke={GOLD} strokeWidth={8} opacity={0.8} />
        <rect x={-10} y={1436} width={1100} height={32} rx={8} fill={WOOD} stroke={INK} strokeWidth={6} />
        <Destrier x={nx} gy={gN} s={sN} f={f} rider={<SideKnight f={f} visor={visor} lanceAng={lerp(-62, angN, couch)} lanceFront={broke ? 300 : lerp(620, lenN, couch)} broken={broke} />} />
        {[0, 1, 2].map((k) => (
          <ellipse key={k} cx={nx - 200 - k * 60 - ((f * 6) % 40)} cy={gN - 10} rx={60 + k * 20} ry={24} fill="#D9BE88" opacity={0.7 - k * 0.2} />
        ))}
        <Splinters x={contact[0]} y={contact[1]} age={f - hit} seed="jo" />
        <Burst x={600} y={880} p={broke ? popIn(f, hit, 6) : 0} text="CRACK!" size={100} w={0.9} col={C.mustard} rot={-6} />
      </>
    );
  } else if (mode === "armour") {
    // ~50 lb of steel: the helmet slams down onto a big knight, glints, weight chips
    sky = "paper";
    const land = 7;
    const helmY = f < land ? interpolate(f, [0, land], [-760, 0], { ...clamp, easing: Easing.in(Easing.quad) }) : 0;
    const shake = f >= land && f < land + 8 ? Math.sin((f - land) * 2.8) * 10 * (1 - (f - land) / 8) : 0;
    body = (
      <>
        <Rays f={f} cx={540} cy={1000} />
        <ellipse cx={540} cy={1880} rx={360} ry={40} fill="#000" opacity={0.18} />
        <g transform={`translate(${540 + shake} 1890) scale(1.04)`}>
          <FrontKnight f={f} helmY={helmY} />
        </g>
        {f >= land ? <Burst x={830} y={860} p={popIn(f, land, 6) * interpolate(f, [land + 14, land + 20], [1, 0], clamp)} text="CLANG!" size={70} w={0.62} col={C.cream} rot={8} /> : null}
        {[0, 1, 2].map((k) => {
          const age = (f + k * 11) % 33;
          const gx = [420, 640, 500][k];
          const gy = [1180, 1420, 820][k];
          return (
            <path key={k} d={`M ${gx} ${gy - 30} L ${gx + 8} ${gy - 8} L ${gx + 30} ${gy} L ${gx + 8} ${gy + 8} L ${gx} ${gy + 30} L ${gx - 8} ${gy + 8} L ${gx - 30} ${gy} L ${gx - 8} ${gy - 8} Z`} fill="#FFFFFF" opacity={interpolate(age, [0, 6, 12], [0, 1, 0], clamp)} />
          );
        })}
      </>
    );
  } else if (mode === "splinter") {
    // Paris 1559, close: a lance shatters on the crowned helm; the crown tumbles into the sand (nothing gory)
    sky = "dark";
    const hit = (v.hitAt ?? 0.06) * dur;
    const crownAt = (v.crownAt ?? 0.5) * dur;
    const stampAt = (v.stampAt ?? 0.72) * dur;
    const S = 2.7;
    const seat: P = [360, 1900];
    const contact: P = [seat[0] + 108 * S, seat[1] - 244 * S];
    const tipX = f < hit ? interpolate(f, [-6, hit], [1500, contact[0]], clamp) : contact[0];
    const recoil = f >= hit ? ease(f, hit, hit + 12) * 260 : 0;
    const jolt = f >= hit ? -16 * Math.exp(-(f - hit) / 6) * Math.cos((f - hit) / 2.2) : 0;
    const sag = ease(f, crownAt, crownAt + 30) * -9;
    const ca = f - crownAt;
    const crownOn = ca < 0;
    let cx = seat[0] + 10 * S;
    let cy = seat[1] - 278 * S;
    let crot = 0;
    if (!crownOn) {
      const t1 = 16;
      if (ca < t1) {
        cx += ca * 17;
        cy += -ca * 14 + ca * ca * 2.4;
        crot = ca * 14;
      } else {
        const y1 = seat[1] - 278 * S + -t1 * 14 + t1 * t1 * 2.4;
        const groundY = 1712;
        const b = Math.min(1, (ca - t1) / 10);
        cx += t1 * 17 + 170 * (1 - Math.exp(-(ca - t1) / 10));
        cy = Math.min(groundY, y1 + (ca - t1) * 22) - (ca - t1 > 4 ? Math.abs(Math.sin((ca - t1) / 3)) * 30 * Math.exp(-(ca - t1) / 8) : 0);
        crot = t1 * 14 + b * 70;
      }
    }
    body = (
      <>
        <Rays f={f} cx={540} cy={1050} />
        <g transform={`rotate(${jolt + sag} ${seat[0]} ${seat[1] - 200 * S})`}>
          <g transform={`translate(${seat[0]} ${seat[1]}) scale(${S})`}>
            <SideKnight f={f} visor={1} arm="down" legs="none" shield={null} crown={crownOn} coat={BLUE} coat2={GOLD} plume={WHITE} />
          </g>
        </g>
        <g transform={`translate(${f < hit ? tipX + 620 * S : contact[0] + 40 + 230 * S + recoil} ${contact[1]}) scale(${-S} ${S})`}>
          <Lance ang={0} front={f >= hit ? 230 : 620} broken={f >= hit} col={RED} />
        </g>
        <Splinters x={contact[0]} y={contact[1]} age={f - hit} n={20} seed="sp" sc={1.4} />
        <rect x={-10} y={1690} width={1100} height={240} fill={SAND} stroke={INK} strokeWidth={6} />
        {[0, 1, 2, 3].map((k) => (
          <ellipse key={k} cx={120 + k * 260} cy={1780 + (k % 2) * 40} rx={60} ry={10} fill={SAND_D} />
        ))}
        {!crownOn ? (
          <g transform={`translate(${cx} ${cy}) rotate(${crot}) scale(${S * 0.9})`}>
            <Crown />
          </g>
        ) : null}
        <RedStamp x={540} y={640} age={f - stampAt} text={v.stamp ?? "10 DAYS LATER"} w={720} />
      </>
    );
  } else if (mode === "hire") {
    // France quits jousting (empty lists, sign) → a knight with his lance FOR HIRE; purses toss in gold
    const turn = (v.turnAt ?? 0.36) * dur;
    if (f < turn) {
      headline = v.quitHeadline ?? "FRANCE QUITS!";
      accent = v.quitAccent ?? ["quits"];
      const drop = interpolate(f, [2, 9], [-700, 0], { ...clamp, easing: Easing.bezier(0.3, 1.3, 0.5, 1) });
      body = (
        <>
          <Lists f={f} y0={1180} seed="hq" crowd={false} />
          <rect x={-10} y={1300} width={1100} height={130} fill={BLUE_D} stroke={INK} strokeWidth={6} />
          <rect x={-10} y={1278} width={1100} height={30} rx={8} fill={WOOD} stroke={INK} strokeWidth={6} />
          <g transform="translate(300 1640) rotate(-8)">
            <Lance ang={0} front={240} back={160} broken col={RED} />
          </g>
          <g transform="translate(760 1700) rotate(14)">
            <Lance ang={180} front={180} back={60} broken col={RED} />
          </g>
          <g transform={`translate(540 ${1050 + drop}) rotate(-4)`}>
            <path d="M -150 -120 L 0 -230 L 150 -120" stroke={INK} strokeWidth={8} fill="none" />
            <rect x={-330} y={-120} width={660} height={250} rx={18} fill={WOOD} stroke={INK} strokeWidth={9} />
            <text x={0} y={-20} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={C.cream}>
              NO MORE
            </text>
            <text x={0} y={84} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={C.cream}>
              JOUSTING
            </text>
            {[-300, 300].map((nx) => (
              <circle key={nx} cx={nx} cy={-90} r={10} fill={STEEL_D} stroke={INK} strokeWidth={3} />
            ))}
          </g>
        </>
      );
    } else {
      const coinsAt = (v.coinsAt ?? 0.55) * dur;
      const lf = f - turn;
      hlFrom = Math.round(turn);
      const chest: P = [800, 1790];
      const purses: P[] = [
        [lerp(-120, 70, ease(f, coinsAt - 8, coinsAt)), 1180],
        [lerp(1200, 1010, ease(f, coinsAt - 4, coinsAt + 4)), 1000],
      ];
      body = (
        <>
          <path d="M -10 1260 Q 260 1120 540 1200 Q 820 1280 1090 1160 L 1090 1920 L -10 1920 Z" fill="#7EAE5A" stroke={INK} strokeWidth={6} />
          <path d="M 640 1180 L 660 1060 L 700 1060 L 700 1010 L 730 1010 L 730 1060 L 770 1060 L 770 1010 L 800 1010 L 800 1060 L 840 1060 L 860 1190 Z" fill="#9EA7B8" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -10 1420 Q 300 1340 540 1400 Q 800 1460 1090 1380 L 1090 1920 L -10 1920 Z" fill="#6A9A48" stroke={INK} strokeWidth={6} />
          <ellipse cx={540} cy={1880} rx={330} ry={36} fill="#000" opacity={0.18} />
          <g transform={`translate(520 ${1880 + (1 - popIn(lf, 0, 10)) * 80}) scale(1.12)`}>
            <FrontKnight f={f} upright />
          </g>
          <g transform={`translate(${520 - 214 * 1.12} ${1880 - 980 * 1.12}) rotate(${Math.sin(f / 6) * 4})`}>
            <path d="M -70 -60 L 0 -10 L 70 -60" stroke={INK} strokeWidth={6} fill="none" />
            <rect x={-150} y={-10} width={300} height={110} rx={14} fill={WOOD} stroke={INK} strokeWidth={7} />
            <text x={0} y={70} textAnchor="middle" fontFamily={titleFont} fontSize={56} fill={C.cream}>
              FOR HIRE
            </text>
          </g>
          <g transform={`translate(${chest[0]} ${chest[1]})`}>
            <rect x={-110} y={-90} width={220} height={110} rx={10} fill={WOOD} stroke={INK} strokeWidth={7} />
            <path d="M -110 -90 L 110 -90 L 96 -128 L -96 -128 Z" fill={WOOD_D} stroke={INK} strokeWidth={6} />
            <ellipse cx={0} cy={-96} rx={96} ry={18} fill={GOLD} opacity={ease(f, coinsAt + 10, coinsAt + 30)} />
            <rect x={-12} y={-60} width={24} height={30} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
          </g>
          {purses.map((pp, i) => (
            <g key={i} transform={`translate(${pp[0]} ${pp[1]}) scale(${i ? -1 : 1} 1)`}>
              <path d="M -200 -40 L -40 -40 L -40 40 L -200 40 Z" fill={i ? "#7A3E8E" : "#2E7D7A"} stroke={INK} strokeWidth={6} />
              <circle cx={-20} cy={0} r={36} fill="#E8B98E" stroke={INK} strokeWidth={5} />
              <path d="M 10 -50 Q 60 -60 70 0 Q 60 56 10 46 Q 0 0 10 -50 Z" fill={i ? GOLD_D : "#B5452F"} stroke={INK} strokeWidth={5} />
            </g>
          ))}
          {new Array(10).fill(0).map((_, i) => {
            const from = purses[i % 2];
            const st = coinsAt + i * 3;
            const t = interpolate(f, [st, st + 14], [0, 1], clamp);
            if (t <= 0 || t >= 1) return null;
            const sx = from[0] + (i % 2 ? -60 : 60);
            const px = lerp(sx, chest[0] + (random(`cx${i}`) - 0.5) * 120, t);
            const py = lerp(from[1], chest[1] - 110, t) - Math.sin(t * Math.PI) * 240;
            return (
              <g key={i} transform={`translate(${px} ${py}) scale(${Math.cos(f / 2 + i)} 1)`}>
                <circle r={24} fill={GOLD} stroke={INK} strokeWidth={5} />
                <circle r={12} fill="none" stroke={GOLD_D} strokeWidth={4} />
              </g>
            );
          })}
        </>
      );
    }
  } else if (mode === "book") {
    // the twist: Ivanhoe (1819) – "my Free Lances" … flash → a knight at a laptop in a coffee shop: FREELANCER
    if (f < ansF) {
      sky = "paper";
      const open = popIn(f, 0, 10);
      const hl = ease(f, (v.hlAt ?? 0.3) * dur, ((v.hlAt ?? 0.3) + 0.16) * dur);
      const ring = popIn(f, ((v.hlAt ?? 0.3) + 0.18) * dur, 8);
      body = (
        <g transform={`translate(540 1060) scale(${0.85 + 0.15 * open}) translate(-540 -1060)`}>
          <rect x={40} y={640} width={1000} height={860} rx={24} fill="#6E2A1E" stroke={INK} strokeWidth={9} />
          <path d="M 70 672 Q 300 650 535 682 L 535 1470 Q 300 1440 70 1464 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
          <path d="M 545 682 Q 780 650 1010 672 L 1010 1464 Q 780 1440 545 1470 Z" fill="#F7EEDB" stroke={INK} strokeWidth={6} />
          <path d="M 540 676 L 540 1474" stroke="#B89A6A" strokeWidth={8} />
          <text x={302} y={790} textAnchor="middle" fontFamily={titleFont} fontSize={84} fill={INK}>
            IVANHOE
          </text>
          <text x={302} y={850} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>
            A ROMANCE
          </text>
          <g transform="translate(230 1180) scale(0.5)" opacity={0.9}>
            <SideKnight f={f} visor={1} lanceAng={2} lanceFront={300} legs="ride" />
          </g>
          <path d="M 120 1300 L 490 1300" stroke={C.sepia} strokeWidth={5} />
          <text x={302} y={1390} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>
            WALTER SCOTT · 1819
          </text>
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={590} y={730 + r * 50} width={r === 3 ? 240 : 370} height={18} rx={9} fill="#CDBB98" />
          ))}
          <rect x={584} y={958} width={392 * hl} height={250} rx={12} fill={C.mustard} opacity={0.55} />
          <text x={596} y={1010} fontFamily={typeFont} fontSize={40} fill={INK}>
            “I offered Richard
          </text>
          <text x={596} y={1070} fontFamily={typeFont} fontSize={40} fill={INK}>
            the service of my
          </text>
          <text x={600} y={1160} fontFamily={titleFont} fontSize={66} fill={C.brick} textLength={360} lengthAdjust="spacingAndGlyphs">
            FREE LANCES”
          </text>
          {ring > 0 ? (
            <ellipse cx={782} cy={1138} rx={220 * ring} ry={70 * ring} fill="none" stroke="#D7322A" strokeWidth={10} transform="rotate(-4 782 1138)" />
          ) : null}
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={590} y={1250 + r * 50} width={r === 3 ? 200 : 370} height={18} rx={9} fill="#CDBB98" />
          ))}
        </g>
      );
    } else {
      sky = "modern";
      headline = undefined;
      const lf = f - ansF;
      const tap = Math.sin(f * 1.3) * 6;
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#E9C48F" />
          <rect x={0} y={1200} width={1080} height={720} fill="#B97A48" />
          {new Array(7).fill(0).map((_, k) => (
            <path key={k} d={`M ${k * 170} 1200 L ${k * 170} 1920`} stroke="#9A6038" strokeWidth={6} />
          ))}
          <rect x={60} y={520} width={420} height={460} rx={10} fill="#8EC9E8" stroke={INK} strokeWidth={9} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={80 + k * 100} y={720 - (k % 2) * 90} width={80} height={260 + (k % 2) * 90} fill={k % 2 ? "#5C6C8A" : "#7A88A6"} stroke={INK} strokeWidth={4} />
          ))}
          <path d="M 270 520 L 270 980 M 60 750 L 480 750" stroke={INK} strokeWidth={8} />
          {[680, 900].map((lx) => (
            <g key={lx}>
              <path d={`M ${lx} 0 L ${lx} 540`} stroke={INK} strokeWidth={5} />
              <path d={`M ${lx - 60} 600 Q ${lx} 520 ${lx + 60} 600 Z`} fill={C.mustard} stroke={INK} strokeWidth={6} />
              <circle cx={lx} cy={612} r={22} fill="#FFF3C0" opacity={0.9} />
            </g>
          ))}
          <g transform="translate(110 1900) rotate(12)">
            <path d="M 0 0 L 0 -1300" stroke={INK} strokeWidth={34} strokeLinecap="round" />
            <path d="M 0 0 L 0 -1300" stroke={LANCE} strokeWidth={22} strokeLinecap="round" />
            {[-1150, -950, -750, -550, -350].map((y) => (
              <path key={y} d={`M -11 ${y} L 11 ${y - 34}`} stroke={RED} strokeWidth={16} />
            ))}
            <path d={`M 0 -1290 L 80 ${-1250 + Math.sin(f / 4) * 8} L 0 -1206 Z`} fill={RED} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          </g>
          <g transform="translate(0 -220)">
          <path d="M 250 1450 L 220 2120 M 370 1450 L 400 2120 M 230 1800 L 390 1800" stroke={WOOD_D} strokeWidth={22} strokeLinecap="round" />
          <rect x={200} y={1420} width={210} height={40} rx={14} fill={WOOD} stroke={INK} strokeWidth={6} />
          <g transform="translate(430 1800) rotate(-10)">
            <Heater col={RED} col2={GOLD} s={1.2} />
          </g>
          <g transform="translate(300 1420) scale(1.5)">
            <SideKnight f={f} visor={0} arm="type" legs="sit" shield={null} tap={tap} />
          </g>
          <rect x={470} y={1330} width={620} height={36} rx={10} fill={WOOD} stroke={INK} strokeWidth={7} />
          <path d="M 560 1366 L 540 2140 M 1000 1366 L 1020 2140" stroke={WOOD_D} strokeWidth={26} strokeLinecap="round" />
          <path d="M 500 1330 L 800 1330 L 780 1312 L 520 1312 Z" fill="#C9CED6" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <g transform="translate(560 1310) skewX(-8)">
            <rect x={0} y={-330} width={340} height={330} rx={16} fill="#2B2F3A" stroke={INK} strokeWidth={8} />
            <rect x={18} y={-312} width={304} height={294} rx={8} fill="#F4F7FB" />
            <rect x={18} y={-312} width={304} height={56} rx={8} fill={BLUE} />
            <text x={170} y={-272} textAnchor="middle" fontFamily={titleFont} fontSize={34} fill="#FFFFFF">
              INVOICE
            </text>
            {[0, 1, 2].map((r) => (
              <rect key={r} x={40} y={-228 + r * 44} width={r === 2 ? 150 : 250} height={18} rx={9} fill="#C9D2DE" />
            ))}
            <g transform={`translate(170 -70) scale(${popIn(lf, 10, 8)})`}>
              <rect x={-110} y={-34} width={220} height={68} rx={34} fill="#3FA65A" stroke={INK} strokeWidth={5} />
              <text x={0} y={14} textAnchor="middle" fontFamily={titleFont} fontSize={38} fill="#FFFFFF">
                SENT ✓
              </text>
            </g>
          </g>
          <g transform="translate(940 1330)">
            <path d="M -50 -110 L 50 -110 L 40 0 L -40 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <rect x={-46} y={-80} width={92} height={36} fill={WOOD} />
            <path d="M 50 -90 Q 86 -70 46 -36" stroke={INK} strokeWidth={8} fill="none" />
            {[0, 1].map((k) => {
              const p = ((f + k * 10) % 20) / 20;
              return <path key={k} d={`M ${-14 + k * 22} ${-124 - p * 80} q 16 -20 0 -40`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8 * (1 - p)} />;
            })}
          </g>
          </g>
        </>
      );
      overlay = <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: interpolate(lf, [0, 6], [0.85, 0], clamp) }} />;
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
      </svg>
      {overlay}
      {headline ? (
        <Sequence key={headline} from={hlFrom} layout="none">
          <Headline text={headline} accent={accent} top={v.top ?? 290} size={v.size ?? 100} />
        </Sequence>
      ) : null}
      {mode === "book" && v.answer ? (
        <Sequence from={ansF} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 640} at={v.floatAt} />
    </Backdrop>
  );
};
