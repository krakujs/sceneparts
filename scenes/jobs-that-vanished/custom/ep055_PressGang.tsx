import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep055 Press gang (naval impressment) – the Royal Navy lieutenant and his gang of seamen who grabbed men in
// harbour streets and taverns and dragged them aboard a warship. Warm sunset harbour, timber tavern, frigates.
// visual: { mode: "grab" | "burst" | "spot" | "war" | "anthem", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, cutAt? (burst, 0–1), stampAt? (spot, 0–1),
//           answer?, answerAccent?, answerAt?, answerSize?, chip? (anthem) }
// Cartoon action only: the cudgel is waved, nobody is hit. Flags are plain period flags (15-star US, red ensign).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const NAVY = "#24345E";
const NAVY_D = "#18233F";
const NAVY_HI = "#33487A";
const WHITE = "#F3EEE2";
const WHITE_D = "#D8D0BE";
const GOLDL = "#F2B544";
const GOLD_D = "#C98E1E";
const BOOT = "#1E1714";
const BOOT_CUFF = "#6B4A2E";
const SKIN = "#EDBB92";
const SKIN_D = "#CF9670";
const CHEEK = "#E58A7A";
const HAIR = "#6B4A33";
const HAIR_G = "#C9C2B4";
const WOOD = "#7A5232";
const WOOD_D = "#5A3A20";
const WOOD_HI = "#9C6E44";
const PEWTER = "#A9AFB5";
const PEWTER_D = "#7E858C";
const BEER = "#F2B544";
const FOAM = "#FFF6E0";
const SHIRT = "#F1E6CF";
const WAIST = "#9C3B2A";
const BREECH = "#6B4A2E";
const JACKET = "#2F4A7A";
const HULL = "#2A2320";
const OCHRE = "#E0A63A";
const SAIL = "#F4EAD5";
const SAIL_D = "#D9C49C";
const SEA = "#2E6E8E";
const SEA_D = "#21536D";
const US_RED = "#C0392B";
const US_BLUE = "#23376B";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
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
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 62, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string }> = ({ a, b, c, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

const Fist: React.FC<{ p: P; r?: number; col?: string }> = ({ p, r = 24, col = SKIN }) => <circle cx={p[0]} cy={p[1]} r={r} fill={col} stroke={INK} strokeWidth={5} />;

const Foot: React.FC<{ a: P; col?: string; dir?: 1 | -1 }> = ({ a, col = BOOT, dir = 1 }) => (
  <g transform={`translate(${a[0]} ${a[1]}) scale(${dir} 1)`}>
    <path d="M -30 -14 L 18 -18 Q 70 -10 72 16 L -32 16 Z" fill={col} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

// wooden cudgel along +x from the hand (knob at the far end)
const Cudgel: React.FC<{ p: P; ang: number; len?: number }> = ({ p, ang, len = 210 }) => (
  <g transform={`translate(${p[0]} ${p[1]}) rotate(${ang})`}>
    <path d={`M -26 -11 L ${len - 30} -20 Q ${len + 12} -22 ${len + 10} 0 Q ${len + 12} 22 ${len - 30} 20 L -26 11 Z`} fill={WOOD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 10 -6 L ${len - 40} -10`} stroke={WOOD_HI} strokeWidth={5} strokeLinecap="round" />
    <circle cx={len * 0.55} cy={4} r={5} fill={WOOD_D} />
  </g>
);

// period flags. origin = top of the hoist (pole side). wave animates the fly.
const Flag: React.FC<{ x: number; y: number; w: number; h: number; kind: "us" | "uk"; f: number; dir?: 1 | -1; modern?: boolean }> = ({ x, y, w, h, kind, f, dir = 1, modern = false }) => {
  const wv = (t: number) => Math.sin(f / 4 + t * 4) * h * 0.08 * t;
  const stripes = kind === "us" ? (modern ? 13 : 15) : 1;
  const nStars = modern ? 50 : 15;
  const starPos = (k: number, cw: number, ch: number): P =>
    modern
      ? (() => {
          // 9 rows alternating 6 / 5 stars
          let r = 0;
          let left = k;
          while (left >= (r % 2 ? 5 : 6)) {
            left -= r % 2 ? 5 : 6;
            r++;
          }
          return [cw * ((r % 2 ? 0.17 : 0.08) + left * 0.168), ch * (0.08 + r * 0.105)];
        })()
      : [cw * (0.14 + (k % 5) * 0.18), ch * (0.2 + Math.floor(k / 5) * 0.3)];
  const rows = new Array(stripes).fill(0).map((_, i) => {
    const y0 = (i * h) / stripes;
    const y1 = ((i + 1) * h) / stripes;
    const col = kind === "us" ? (i % 2 ? WHITE : US_RED) : "#B8332A";
    return <path key={i} d={`M 0 ${y0} Q ${w * 0.5} ${y0 + wv(0.5)} ${w} ${y0 + wv(1)} L ${w} ${y1 + wv(1)} Q ${w * 0.5} ${y1 + wv(0.5)} 0 ${y1} Z`} fill={col} />;
  });
  const cw = w * 0.42;
  const ch = kind === "us" ? h * ((modern ? 7 : 8) / stripes) : h * 0.5;
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      {rows}
      {kind === "us" ? (
        <g>
          <rect x={0} y={0} width={cw} height={ch} fill={US_BLUE} />
          {new Array(nStars).fill(0).map((_, k) => {
            const [sx, sy] = starPos(k, cw, ch);
            return <circle key={k} cx={sx} cy={sy} r={Math.max(2.5, w * (modern ? 0.008 : 0.012))} fill={WHITE} />;
          })}
        </g>
      ) : (
        <g>
          <rect x={0} y={0} width={cw} height={ch} fill="#24387A" />
          <path d={`M 0 0 L ${cw} ${ch} M ${cw} 0 L 0 ${ch}`} stroke={WHITE} strokeWidth={ch * 0.2} />
          <path d={`M 0 0 L ${cw} ${ch} M ${cw} 0 L 0 ${ch}`} stroke="#C0392B" strokeWidth={ch * 0.07} />
          <path d={`M ${cw / 2} 0 L ${cw / 2} ${ch} M 0 ${ch / 2} L ${cw} ${ch / 2}`} stroke={WHITE} strokeWidth={ch * 0.3} />
          <path d={`M ${cw / 2} 0 L ${cw / 2} ${ch} M 0 ${ch / 2} L ${cw} ${ch / 2}`} stroke="#C0392B" strokeWidth={ch * 0.17} />
        </g>
      )}
      <path d={`M 0 0 Q ${w * 0.5} ${wv(0.5)} ${w} ${wv(1)} L ${w} ${h + wv(1)} Q ${w * 0.5} ${h + wv(0.5)} 0 ${h} Z`} fill="none" stroke={INK} strokeWidth={Math.max(3, w * 0.02)} strokeLinejoin="round" />
    </g>
  );
};

type Face = "snarl" | "grin" | "squint";

// The press-gang lieutenant: fore-and-aft bicorne with gold lace, navy coat with white lapels and gold buttons,
// white waistcoat and breeches, knee boots, hanger at the hip, cudgel up. Origin = feet centre, facing right.
// club: 0 (hanging) .. 1 (raised over the head). grab: local point for the front hand (a fistful of collar).
// glass: the front hand holds a brass telescope to his eye instead.
export const Officer: React.FC<{ x: number; y: number; s?: number; f: number; club?: number; grab?: P; face?: Face; walk?: boolean; facing?: 1 | -1; glass?: boolean; point?: boolean }> = ({ x, y, s = 1, f, club = 1, grab, face = "snarl", walk = false, facing = 1, glass = false, point = false }) => {
  const step = walk ? Math.sin(f / 4) : 0;
  const bob = walk ? -Math.abs(Math.sin(f / 4)) * 10 : Math.sin(f / 9) * 3;
  const shake = Math.sin(f / 1.6) * 7 * club;
  const tw = Math.sin(f / 5) * 10;
  const Sb: P = [-50, -546];
  const Sf: P = [44, -546];
  const Hb: P = [lerp(-92, -150, club), lerp(-368, -770, club) + shake];
  const Eb: P = [lerp(-104, -196, club), lerp(-450, -600, club)];
  const Hf: P = glass ? [128, -664] : point ? [260, -640] : grab ?? [150, -420];
  const Ef: P = glass ? [150, -560] : [(Sf[0] + Hf[0]) / 2 + 14, (Sf[1] + Hf[1]) / 2 + 46];
  const cAng = lerp(96, -142, club) + shake * 0.6;
  const bk: P = [-38 - step * 18, -226];
  const ba: P = [-52 - step * 40, -24];
  const fk: P = [40 + step * 18, -226];
  const fa: P = [56 + step * 40, -24];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={170} ry={22} fill="#000" opacity={0.22} />
      {/* back leg */}
      <Limb a={[-30, -380]} b={[-40, -300]} c={bk} w={62} col={WHITE_D} />
      <Limb a={bk} b={[bk[0] - 4, -120]} c={ba} w={56} col={BOOT} />
      <ellipse cx={bk[0]} cy={bk[1] + 6} rx={38} ry={17} fill={BOOT_CUFF} stroke={INK} strokeWidth={5} />
      <Foot a={ba} />
      <g transform={`translate(0 ${bob})`}>
        {/* hanger (sword) behind */}
        <path d="M -16 -396 L -150 -170" stroke={INK} strokeWidth={20} strokeLinecap="round" />
        <path d="M -16 -396 L -150 -170" stroke="#2A2A30" strokeWidth={10} strokeLinecap="round" />
        <circle cx={-150} cy={-170} r={9} fill={GOLDL} stroke={INK} strokeWidth={4} />
        {/* coat tails flaring behind */}
        <path d={`M -70 -404 Q -112 -322 ${-160 - tw} -226 L -60 -232 Q -40 -300 -18 -392 Z`} fill={NAVY_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d={`M ${-150 - tw} -232 L -64 -238`} stroke={WHITE} strokeWidth={8} />
        {/* back arm + cudgel */}
        <Limb a={Sb} b={Eb} c={Hb} w={48} col={NAVY_D} />
        <Cudgel p={Hb} ang={cAng} />
        <Fist p={Hb} r={25} />
      </g>
      {/* front leg */}
      <Limb a={[30, -380]} b={[40, -300]} c={fk} w={64} col={WHITE} />
      <Limb a={fk} b={[fk[0] + 4, -120]} c={fa} w={58} col={BOOT} />
      <ellipse cx={fk[0]} cy={fk[1] + 6} rx={40} ry={17} fill={BOOT_CUFF} stroke={INK} strokeWidth={5} />
      <Foot a={fa} />
      <g transform={`translate(0 ${bob})`}>
        {/* torso */}
        <path d="M -76 -556 Q 4 -586 86 -556 Q 100 -470 86 -390 L -74 -390 Q -92 -470 -76 -556 Z" fill={NAVY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 10 -550 L 68 -550 Q 80 -470 74 -382 Q 50 -360 20 -382 Z" fill={WHITE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {[-520, -480, -440, -405].map((by) => <circle key={by} cx={48} cy={by} r={4.5} fill={WHITE_D} />)}
        <path d="M 66 -558 L 102 -540 L 92 -430 L 74 -444 Z" fill={WHITE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {[-528, -496, -464].map((by) => <circle key={by} cx={108} cy={by} r={7} fill={GOLDL} stroke={INK} strokeWidth={3} />)}
        <path d="M 86 -396 Q 102 -330 98 -276 L 60 -280 Q 58 -340 40 -390 Z" fill={NAVY} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -60 -540 Q -70 -470 -64 -400" stroke={NAVY_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* collar + cravat */}
        <rect x={-8} y={-606} width={46} height={44} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M -44 -568 Q 10 -600 64 -572 L 60 -548 Q 10 -570 -40 -546 Z" fill={NAVY_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 28 -578 Q 70 -566 62 -528 Q 42 -516 28 -540 Z" fill={WHITE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {/* head */}
        <g transform="translate(16 -644)">
          <path d="M -50 -30 Q -86 4 -62 46 L -40 30 Z" fill={HAIR_G} stroke={INK} strokeWidth={5} />
          <path d="M -64 30 L -96 92" stroke={INK} strokeWidth={14} strokeLinecap="round" />
          <path d="M -88 70 l -22 -10 l 6 24 Z M -88 70 l 18 -16 l 4 24 Z" fill={INK} />
          <circle cx={0} cy={0} r={62} fill={SKIN} stroke={INK} strokeWidth={7} />
          <ellipse cx={-14} cy={6} rx={14} ry={20} fill={SKIN_D} stroke={INK} strokeWidth={5} />
          <path d="M -40 -40 Q -10 -64 40 -52 Q 10 -50 -20 -30 Q -30 0 -36 30 Q -50 0 -40 -40 Z" fill={HAIR_G} stroke={INK} strokeWidth={4} />
          <circle cx={36} cy={24} r={14} fill={CHEEK} opacity={0.55} />
          <path d={face === "squint" ? "M 22 -26 L 60 -26" : "M 20 -34 L 58 -18"} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          {face === "squint" ? <path d="M 30 -8 L 52 -8" stroke={INK} strokeWidth={7} strokeLinecap="round" /> : <ellipse cx={42} cy={-8} rx={8} ry={10} fill={INK} />}
          {face !== "squint" ? <circle cx={44} cy={-11} r={2.6} fill="#FFFFFF" /> : null}
          <path d="M 54 -16 Q 92 8 60 22" fill={SKIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {face === "snarl" ? (
            <g>
              <path d="M 22 34 Q 46 30 62 38 Q 58 62 36 60 Q 22 52 22 34 Z" fill="#5A1E1A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
              <path d="M 26 38 L 58 40" stroke="#FFFFFF" strokeWidth={6} />
            </g>
          ) : face === "grin" ? (
            <path d="M 22 36 Q 44 54 64 34" stroke={INK} strokeWidth={6} fill="#FFFFFF" />
          ) : (
            <path d="M 28 40 L 54 38" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          )}
        </g>
        {/* fore-and-aft bicorne with gold lace + cockade */}
        <g transform="translate(16 -690)">
          <path d="M -150 14 Q -60 -6 40 0 Q 120 4 168 -10 Q 132 -110 20 -122 Q -96 -112 -150 14 Z" fill="#17141A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M -140 6 Q -90 -100 20 -112 Q 120 -104 158 -12" stroke={GOLDL} strokeWidth={8} fill="none" strokeLinecap="round" />
          <circle cx={30} cy={-50} r={22} fill={INK} stroke={GOLDL} strokeWidth={4} />
          <path d="M 30 -72 L 30 -28" stroke={GOLDL} strokeWidth={6} />
          <path d="M -120 4 Q 10 -14 150 -6" stroke="#3A3440" strokeWidth={5} fill="none" />
        </g>
        {/* front arm */}
        <Limb a={Sf} b={Ef} c={Hf} w={50} col={NAVY} />
        {(() => {
          const ang = Math.atan2(Hf[1] - Ef[1], Hf[0] - Ef[0]);
          const cx = Hf[0] - Math.cos(ang) * 36;
          const cy = Hf[1] - Math.sin(ang) * 36;
          return <circle cx={cx} cy={cy} r={29} fill={WHITE} stroke={INK} strokeWidth={5} />;
        })()}
        {glass ? (
          <g transform="translate(96 -676) rotate(-6)">
            <rect x={-10} y={-20} width={250} height={40} rx={6} fill={GOLDL} stroke={INK} strokeWidth={6} />
            <rect x={150} y={-26} width={100} height={52} rx={6} fill={GOLD_D} stroke={INK} strokeWidth={6} />
            <path d="M 60 -20 L 60 20 M 120 -20 L 120 20" stroke={INK} strokeWidth={4} />
            <ellipse cx={250} cy={0} rx={8} ry={24} fill="#BFE3EA" stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
        <Fist p={Hf} r={27} />
        {point ? <path d={`M ${Hf[0] + 18} ${Hf[1] - 6} L ${Hf[0] + 64} ${Hf[1] - 14}`} stroke={INK} strokeWidth={22} strokeLinecap="round" /> : null}
        {point ? <path d={`M ${Hf[0] + 18} ${Hf[1] - 6} L ${Hf[0] + 64} ${Hf[1] - 14}`} stroke={SKIN} strokeWidth={12} strokeLinecap="round" /> : null}
      </g>
    </g>
  );
};

// The startled drinker / merchant seaman: knit cap, open red waistcoat, teal neckerchief, knee breeches.
// Origin = feet centre, drawn facing right; facing -1 mirrors. lean (deg) tilts the whole man around his feet.
// pose: flail (arms up in panic) | walk (rolling sailor's gait, sleeves rolled, anchor tattoo) | drag (arms pulled out wide)
type Pose = "flail" | "walk" | "drag";
const COLLAR: P = [22, -446];
export const collarAt = (x: number, y: number, s: number, facing: 1 | -1, lean: number): P => {
  const lx = COLLAR[0] * s * facing;
  const ly = COLLAR[1] * s;
  return [x + lx * Math.cos(rad(lean)) - ly * Math.sin(rad(lean)), y + lx * Math.sin(rad(lean)) + ly * Math.cos(rad(lean))];
};

export const Drinker: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; lean?: number; pose?: Pose; cap?: number; tattoo?: boolean }> = ({ x, y, s = 1, f, facing = 1, lean = 0, pose = "flail", cap = 0, tattoo = false }) => {
  const walk = pose === "walk";
  const step = walk ? Math.sin(f / 4) : pose === "drag" ? Math.sin(f / 3) * 0.4 : 0;
  const sw = walk ? Math.sin(f / 4) : 0;
  const Sb: P = [-40, -428];
  const Sf: P = [42, -428];
  let Hb: P;
  let Hf: P;
  if (pose === "flail") {
    Hb = [-118, -600 + Math.sin(f / 2) * 22];
    Hf = [126, -590 + Math.cos(f / 2) * 22];
  } else if (pose === "drag") {
    Hb = [-196, -420 + Math.sin(f / 3) * 8];
    Hf = [200, -430 + Math.cos(f / 3) * 8];
  } else {
    Hb = [-40 - sw * 70, -268];
    Hf = [56 + sw * 70, -262];
  }
  const Eb: P = pose === "walk" ? [-46 - sw * 30, -344] : [(Sb[0] + Hb[0]) / 2 - 20, (Sb[1] + Hb[1]) / 2 + 30];
  const Ef: P = pose === "walk" ? [52 + sw * 30, -340] : [(Sf[0] + Hf[0]) / 2 + 20, (Sf[1] + Hf[1]) / 2 + 30];
  const bk: P = [-30 - step * 22, -160];
  const ba: P = [-38 - step * 46, -22];
  const fk: P = [34 + step * 22, -160];
  const fa: P = [42 + step * 46, -22];
  return (
    <g transform={`translate(${x} ${y}) rotate(${lean}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={120} ry={18} fill="#000" opacity={0.2} />
      <Limb a={[-22, -300]} b={[-26, -230]} c={bk} w={50} col="#563A22" />
      <Limb a={bk} b={[bk[0] - 2, -90]} c={ba} w={38} col={WHITE_D} />
      <Foot a={ba} col="#2A2018" />
      <Limb a={Sb} b={Eb} c={Hb} w={36} col={walk ? SHIRT : SHIRT} />
      <Fist p={Hb} r={20} />
      <Limb a={[24, -300]} b={[28, -230]} c={fk} w={52} col={BREECH} />
      <Limb a={fk} b={[fk[0] + 2, -90]} c={fa} w={40} col={WHITE} />
      <circle cx={fa[0] + 22} cy={fa[1] - 4} r={1} fill={INK} />
      <Foot a={fa} col="#2A2018" />
      <rect x={fa[0] - 2} y={fa[1] - 14} width={18} height={12} fill={GOLDL} stroke={INK} strokeWidth={3} />
      {/* torso */}
      <path d="M -60 -440 Q 0 -464 62 -440 Q 76 -370 66 -296 L -62 -296 Q -74 -370 -60 -440 Z" fill={SHIRT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -60 -440 L -18 -444 L -12 -298 L -62 -298 Q -74 -370 -60 -440 Z" fill={WAIST} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 62 -440 L 28 -444 L 22 -298 L 66 -298 Q 76 -370 62 -440 Z" fill={WAIST} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -62 -312 L 66 -312" stroke="#3A2A1C" strokeWidth={14} />
      <rect x={-8} y={-480} width={36} height={40} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <path d="M -24 -450 Q 10 -432 44 -450 L 34 -414 L 12 -392 L -6 -416 Z" fill={C.teal} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {/* head */}
      <g transform="translate(12 -522)">
        <path d="M -54 -10 Q -60 -60 -10 -62 Q 30 -70 50 -40 Q 20 -46 -6 -30 Z" fill={HAIR} stroke={INK} strokeWidth={4} />
        <circle cx={0} cy={0} r={54} fill={SKIN} stroke={INK} strokeWidth={6} />
        <ellipse cx={-16} cy={6} rx={12} ry={17} fill={SKIN_D} stroke={INK} strokeWidth={4} />
        <path d="M -52 -6 Q -40 -40 -20 -30 L -30 6 Z" fill={HAIR} stroke={INK} strokeWidth={4} />
        <circle cx={32} cy={-8} r={pose === "walk" ? 10 : 16} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={36} cy={-8} r={pose === "walk" ? 5 : 6} fill={INK} />
        <path d={pose === "walk" ? "M 18 -26 L 46 -24" : "M 16 -38 Q 32 -50 50 -38"} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M 50 -14 Q 72 4 52 14" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        {pose === "walk" ? <path d="M 26 30 Q 40 38 52 28" stroke={INK} strokeWidth={5} fill="none" /> : <ellipse cx={40} cy={32} rx={11} ry={16} fill="#5A1E1A" stroke={INK} strokeWidth={4} />}
        {pose !== "walk" ? <path d={`M -34 -60 q -6 14 0 20 q 8 -6 0 -20 Z M -56 -36 q -6 12 0 18 q 8 -6 0 -18 Z`} fill="#BFE3EA" stroke={INK} strokeWidth={3} /> : null}
        <g transform={`translate(${cap * 80} ${-cap * 180}) rotate(${cap * 50})`} opacity={cap > 1 ? 0 : 1}>
          <path d="M -50 -26 Q -46 -86 4 -84 Q 52 -80 56 -36 Q 0 -50 -50 -26 Z" fill={C.brick} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -46 -36 Q 0 -54 54 -42" stroke={C.brickDark} strokeWidth={8} fill="none" />
        </g>
      </g>
      {/* front arm (sleeve rolled when walking, anchor tattoo on the forearm) */}
      <Limb a={Sf} b={Ef} c={Ef} w={38} col={SHIRT} />
      <Limb a={Ef} b={[(Ef[0] + Hf[0]) / 2, (Ef[1] + Hf[1]) / 2]} c={Hf} w={walk ? 32 : 36} col={walk ? SKIN : SHIRT} />
      {tattoo ? (
        <g transform={`translate(${(Ef[0] + Hf[0]) / 2} ${(Ef[1] + Hf[1]) / 2}) rotate(${(Math.atan2(Hf[1] - Ef[1], Hf[0] - Ef[0]) * 180) / Math.PI - 90}) scale(0.45)`}>
          <Anchor />
        </g>
      ) : null}
      <Fist p={Hf} r={21} />
    </g>
  );
};

// blue-ink anchor tattoo, origin = centre, ~80 tall
const Anchor: React.FC<{ col?: string }> = ({ col = "#2F4F8E" }) => (
  <g stroke={col} strokeWidth={9} fill="none" strokeLinecap="round">
    <circle cx={0} cy={-34} r={9} />
    <path d="M 0 -25 L 0 38 M -22 -12 L 22 -12 M -34 18 Q -26 44 0 40 Q 26 44 34 18" />
  </g>
);

// a seaman of the gang: round tarred hat, short blue jacket, striped slops, cudgel up. Origin = feet, facing right.
export const Ganger: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; club?: number; walk?: boolean; reach?: P; hat?: string; off?: number }> = ({ x, y, s = 1, f, facing = 1, club = 1, walk = false, reach, hat = "#1C1A1E", off = 0 }) => {
  const g = f + off * 30;
  const step = walk ? Math.sin(g / 4) : 0;
  const shake = Math.sin(g / 1.8) * 6 * club;
  const Sb: P = [-36, -420];
  const Sf: P = [40, -420];
  const Hb: P = [lerp(-70, -120, club), lerp(-280, -610, club) + shake];
  const Eb: P = [lerp(-80, -150, club), lerp(-350, -480, club)];
  const Hf: P = reach ?? [140, -360];
  const Ef: P = [(Sf[0] + Hf[0]) / 2 + 10, (Sf[1] + Hf[1]) / 2 + 36];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={120} ry={18} fill="#000" opacity={0.2} />
      <Limb a={Sb} b={Eb} c={Hb} w={40} col={JACKET} />
      <Cudgel p={Hb} ang={lerp(96, -116, club) + shake * 0.6} len={180} />
      <Fist p={Hb} r={21} />
      <path d={`M -54 -300 L 54 -300 L ${70 + step * 30} -26 L ${12 + step * 20} -26 L 0 -190 L ${-12 - step * 20} -26 L ${-70 - step * 30} -26 Z`} fill="url(#ep055slops)" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <Foot a={[-44 - step * 30, -16]} col="#2A2018" />
      <Foot a={[44 + step * 30, -16]} col="#2A2018" />
      <path d="M -56 -440 Q 0 -462 60 -440 Q 72 -370 64 -290 L -60 -290 Q -70 -370 -56 -440 Z" fill={JACKET} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 4 -446 L 30 -446 L 26 -296 L 8 -296 Z" fill={SHIRT} stroke={INK} strokeWidth={4} />
      {[-410, -370, -330].map((by) => <circle key={by} cx={44} cy={by} r={5} fill={WHITE_D} stroke={INK} strokeWidth={2} />)}
      <rect x={-6} y={-478} width={34} height={38} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <path d="M -22 -452 Q 8 -436 40 -452 L 24 -414 L 8 -420 Z" fill="#1C1A1E" stroke={INK} strokeWidth={4} />
      <g transform="translate(12 -516)">
        <path d="M -48 0 Q -70 30 -62 60" stroke={INK} strokeWidth={12} strokeLinecap="round" fill="none" />
        <circle cx={0} cy={0} r={50} fill={SKIN} stroke={INK} strokeWidth={6} />
        <ellipse cx={-14} cy={6} rx={11} ry={16} fill={SKIN_D} stroke={INK} strokeWidth={4} />
        {[[4, 28], [16, 34], [-4, 36], [10, 42], [24, 40]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={2.6} fill="#6A5A4A" />)}
        <path d="M 16 -22 L 46 -12" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={34} cy={-4} rx={6} ry={8} fill={INK} />
        <path d="M 46 -10 Q 66 6 48 14" fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M 20 30 Q 36 40 50 28" stroke={INK} strokeWidth={5} fill="#FFFFFF" />
        <ellipse cx={0} cy={-36} rx={76} ry={14} fill={hat} stroke={INK} strokeWidth={5} />
        <path d="M -42 -40 Q -44 -90 0 -92 Q 44 -90 42 -40 Z" fill={hat} stroke={INK} strokeWidth={5} />
        <path d="M -42 -52 Q 0 -60 42 -52" stroke={C.mustard} strokeWidth={7} fill="none" />
      </g>
      <Limb a={Sf} b={Ef} c={Hf} w={42} col={JACKET} />
      <Fist p={Hf} r={22} />
    </g>
  );
};

// pewter tankard with foam; origin = centre. spill: beer flying out of the mouth
const Tankard: React.FC<{ x: number; y: number; s?: number; rot?: number; spill?: number; glass?: boolean; f?: number }> = ({ x, y, s = 1, rot = 0, spill = 0, glass = false, f = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {spill > 0
      ? [0, 1, 2, 3, 4, 5].map((k) => (
          <ellipse key={k} cx={-30 + k * 14 + Math.sin(k * 2) * 20} cy={-110 - spill * (30 + k * 26)} rx={12 + (k % 3) * 5} ry={18 + (k % 2) * 6} fill={BEER} stroke={INK} strokeWidth={3} opacity={1 - spill * 0.3} />
        ))
      : null}
    <path d="M 70 -50 Q 130 -50 130 0 Q 130 50 70 50" stroke={INK} strokeWidth={26} fill="none" />
    <path d="M 70 -50 Q 130 -50 130 0 Q 130 50 70 50" stroke={PEWTER} strokeWidth={14} fill="none" />
    <path d="M -74 -86 L 74 -86 L 80 86 L -80 86 Z" fill={PEWTER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -76 -50 L 76 -50 M -80 60 L 80 60" stroke={PEWTER_D} strokeWidth={8} />
    <path d="M -50 -76 L -54 76" stroke="#E1E6EA" strokeWidth={10} opacity={0.7} strokeLinecap="round" />
    <path d="M -84 -86 Q -70 -126 -30 -112 Q 0 -140 30 -114 Q 70 -128 84 -86 Z" fill={FOAM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {glass ? (
      <g>
        <ellipse cx={0} cy={86} rx={80} ry={18} fill="#BFE3EA" stroke={INK} strokeWidth={6} opacity={0.95} />
        <ellipse cx={-20} cy={82} rx={22} ry={5} fill="#FFFFFF" opacity={0.8 + 0.2 * Math.sin(f / 4)} />
      </g>
    ) : null}
  </g>
);

// ---------- scenery ----------
const Defs: React.FC = () => (
  <defs>
    <pattern id="ep055slops" width="34" height="34" patternUnits="userSpaceOnUse">
      <rect width="34" height="34" fill={WHITE} />
      <rect width="14" height="34" fill="#3E5C9A" />
    </pattern>
    <linearGradient id="ep055dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2E2F5E" />
      <stop offset="45%" stopColor="#8E4E78" />
      <stop offset="75%" stopColor="#E2766A" />
      <stop offset="100%" stopColor="#F9C46B" />
    </linearGradient>
    <linearGradient id="ep055night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0E1230" />
      <stop offset="70%" stopColor="#2A2A5E" />
      <stop offset="100%" stopColor="#5A3A5E" />
    </linearGradient>
    <radialGradient id="ep055glow">
      <stop offset="0%" stopColor="#FFE7A0" stopOpacity={0.85} />
      <stop offset="100%" stopColor="#FFE7A0" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const DuskSky: React.FC<{ horizon: number; sunX?: number; f: number }> = ({ horizon, sunX = 300, f }) => (
  <g>
    <rect x={0} y={0} width={1080} height={horizon + 20} fill="url(#ep055dusk)" />
    <circle cx={sunX} cy={horizon - 70} r={260} fill="url(#ep055glow)" />
    <circle cx={sunX} cy={horizon - 70} r={96} fill="#FFE08A" stroke="#F2B544" strokeWidth={6} />
    {[[180, horizon - 520, 220], [760, horizon - 640, 260], [520, horizon - 360, 180]].map(([cx, cy, w], k) => (
      <ellipse key={k} cx={cx + Math.sin(f / 60 + k) * 20} cy={cy} rx={w} ry={26} fill="#F6B08A" opacity={0.55} />
    ))}
  </g>
);

const Sea: React.FC<{ y0: number; f: number; h?: number; col?: string; colD?: string }> = ({ y0, f, h = 1920, col = SEA, colD = SEA_D }) => (
  <g>
    <rect x={0} y={y0} width={1080} height={h} fill={col} />
    {[0, 1, 2, 3, 4, 5].map((r) => (
      <path key={r} d={new Array(10).fill(0).map((_, k) => `${k === 0 ? "M" : "L"} ${k * 130 - 60 + ((f * (2 + r)) % 130)} ${y0 + 24 + r * 46 + (k % 2) * 10}`).join(" ")} stroke={r % 2 ? colD : "#5E9CB8"} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
    ))}
  </g>
);

const Cobbles: React.FC<{ y0: number; seed: string }> = ({ y0, seed }) => (
  <>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill="#A28B72" />
    {new Array(Math.ceil((1920 - y0) / 56)).fill(0).map((_, r) =>
      new Array(11).fill(0).map((__, k) => {
        const sc = 0.6 + (r * 56) / 900;
        const w = 110 * sc;
        const x = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 8;
        const y = y0 + r * 56 * sc * 0.9;
        return <rect key={`${r}-${k}`} x={x} y={y} width={w - 10} height={48 * sc} rx={16 * sc} fill={(r + k) % 3 ? "#8C7560" : "#B49C80"} stroke={INK} strokeWidth={2.5} opacity={0.9} />;
      }),
    )}
  </>
);

// three-masted warship, side view, bow to the right. Origin = waterline centre.
const Frigate: React.FC<{ x: number; y: number; s?: number; f: number; dir?: 1 | -1; flag?: "us" | "uk"; sails?: "set" | "furled"; fire?: boolean; seed?: string }> = ({ x, y, s = 1, f, dir = 1, flag = "uk", sails = "furled", fire = false, seed = "fr" }) => {
  const roll = Math.sin(f / 14) * 1.2;
  const masts: [number, number][] = [[-260, 820], [10, 930], [270, 780]];
  return (
    <g transform={`translate(${x} ${y}) rotate(${roll}) scale(${s * dir} ${s})`}>
      <path d="M 500 -190 L 720 -300" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d="M 500 -190 L 720 -300" stroke={WOOD} strokeWidth={7} strokeLinecap="round" />
      {masts.map(([mx, mh], i) => (
        <g key={i}>
          <path d={`M ${mx} -160 L ${mx} ${-160 - mh}`} stroke={INK} strokeWidth={18} />
          <path d={`M ${mx} -160 L ${mx} ${-160 - mh}`} stroke={WOOD} strokeWidth={9} />
          {[0.3, 0.55, 0.78].map((t, k) => {
            const yy = -160 - mh * t;
            const half = 170 - k * 40;
            const sh = mh * 0.21;
            return (
              <g key={k}>
                {sails === "set" ? (
                  <path d={`M ${mx - half} ${yy} L ${mx + half} ${yy} L ${mx + half - 16} ${yy + sh} Q ${mx + 20} ${yy + sh + 34} ${mx - half + 16} ${yy + sh} Z`} fill={SAIL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
                ) : null}
                <path d={`M ${mx - half} ${yy} L ${mx + half} ${yy}`} stroke={INK} strokeWidth={12} strokeLinecap="round" />
                {sails === "furled" ? <path d={`M ${mx - half + 10} ${yy + 6} L ${mx + half - 10} ${yy + 6}`} stroke={SAIL_D} strokeWidth={12} strokeLinecap="round" /> : null}
              </g>
            );
          })}
          <path d={`M ${mx} ${-160 - mh} L ${i === 0 ? -520 : masts[i - 1][0]} -200 M ${mx} ${-160 - mh} L ${i === 2 ? 640 : masts[i + 1][0]} -200`} stroke={INK} strokeWidth={3} opacity={0.6} />
        </g>
      ))}
      {/* hull */}
      <path d="M -520 -210 L -330 -210 L -320 -160 L 440 -160 L 540 -210 Q 520 -60 420 20 L -440 20 Q -520 -80 -520 -210 Z" fill={HULL} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -500 -120 L 470 -120 L 460 -80 L -490 -80 Z" fill={OCHRE} stroke={INK} strokeWidth={4} />
      {new Array(13).fill(0).map((_, k) => {
        const gx = -430 + k * 68;
        const flash = fire && random(`${seed}${k}${Math.floor(f / 5)}`) > 0.72;
        return (
          <g key={k}>
            <rect x={gx} y={-114} width={30} height={28} fill={HULL} />
            {flash ? (
              <g>
                <circle cx={gx + 15} cy={-100} r={34} fill="#FFE08A" stroke={INK} strokeWidth={3} />
                <circle cx={gx + 15 + 50} cy={-110} r={46} fill="#EFE6D6" opacity={0.85} />
              </g>
            ) : null}
          </g>
        );
      })}
      <path d="M -440 -30 L 430 -30" stroke="#4A3A30" strokeWidth={6} />
      {/* big masthead flag on the mainmast so the nation reads at any size */}
      <g transform={`translate(${masts[1][0]} ${-150 - masts[1][1]}) scale(-1 1)`}>
        <Flag x={0} y={0} w={260} h={170} kind={flag} f={f + 7} />
      </g>
      {/* stern lanterns + ensign */}
      <circle cx={-520} cy={-230} r={14} fill={C.glow} stroke={INK} strokeWidth={4} />
      <path d="M -500 -210 L -540 -400" stroke={INK} strokeWidth={8} />
      <g transform="translate(-540 -400) scale(-1 1)">
        <Flag x={0} y={0} w={190} h={120} kind={flag} f={f} />
      </g>
    </g>
  );
};

const Rowboat: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 8) * 5}) scale(${s})`}>
    <path d="M -220 -60 L 220 -60 Q 200 30 120 40 L -140 40 Q -210 20 -220 -60 Z" fill={WOOD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -214 -40 L 214 -40" stroke={WOOD_HI} strokeWidth={8} />
    <path d="M -60 -60 L -170 40 M 60 -60 L 180 30" stroke={WOOD_D} strokeWidth={10} strokeLinecap="round" />
  </g>
);

// half-timbered tavern front with glowing windows and a hanging anchor-and-tankard sign. Origin = bottom-left corner.
const Tavern: React.FC<{ x: number; y: number; w?: number; h?: number; f: number; open?: number }> = ({ x, y, w = 520, h = 700, f, open = 0 }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 3);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-h} width={w} height={h} fill="#E9D7B4" stroke={INK} strokeWidth={7} />
      {[0, 0.33, 0.66, 1].map((t) => <path key={t} d={`M ${t * w} ${-h} L ${t * w} 0`} stroke={WOOD_D} strokeWidth={22} />)}
      <path d={`M 0 ${-h * 0.5} L ${w} ${-h * 0.5}`} stroke={WOOD_D} strokeWidth={22} />
      <path d={`M 0 ${-h * 0.5} L ${w * 0.33} ${-h} M ${w * 0.66} ${-h} L ${w} ${-h * 0.5}`} stroke={WOOD_D} strokeWidth={16} />
      <path d={`M -30 ${-h} L ${w * 0.5} ${-h - 200} L ${w + 30} ${-h} Z`} fill="#7E2E22" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[0.08, 0.72].map((t) => (
        <g key={t}>
          <rect x={t * w} y={-h * 0.42} width={w * 0.2} height={h * 0.2} fill="#FFD983" opacity={flick} stroke={INK} strokeWidth={6} />
          <path d={`M ${t * w + w * 0.1} ${-h * 0.42} L ${t * w + w * 0.1} ${-h * 0.22} M ${t * w} ${-h * 0.32} L ${t * w + w * 0.2} ${-h * 0.32}`} stroke={WOOD_D} strokeWidth={5} />
        </g>
      ))}
      <rect x={w * 0.36} y={-h * 0.4} width={w * 0.28} height={h * 0.4} fill="#FFD983" opacity={flick} stroke={INK} strokeWidth={7} />
      <g transform={`translate(${w * 0.36} 0) scale(${1 - open * 0.85} 1)`}>
        <rect x={0} y={-h * 0.4} width={w * 0.28} height={h * 0.4} fill={WOOD} stroke={INK} strokeWidth={6} />
        <path d={`M ${w * 0.09} ${-h * 0.38} L ${w * 0.09} -6 M ${w * 0.19} ${-h * 0.38} L ${w * 0.19} -6`} stroke={WOOD_D} strokeWidth={5} />
      </g>
      {/* bracket + hanging sign */}
      <path d={`M ${w * 0.02} ${-h * 0.62} L -140 ${-h * 0.62}`} stroke={INK} strokeWidth={10} />
      <g transform={`translate(-80 ${-h * 0.62}) rotate(${Math.sin(f / 12) * 4})`}>
        <path d="M -50 0 L -50 30 M 50 0 L 50 30" stroke={INK} strokeWidth={5} />
        <rect x={-90} y={30} width={180} height={140} rx={12} fill={C.teal} stroke={INK} strokeWidth={7} />
        <g transform="translate(-30 100) scale(0.75)"><Anchor col={C.cream} /></g>
        <g transform="translate(40 108) scale(0.28)"><Tankard x={0} y={0} /></g>
      </g>
      {/* lantern */}
      <g transform={`translate(${w * 0.68} ${-h * 0.46})`}>
        <circle r={110} fill="url(#ep055glow)" opacity={flick} />
        <rect x={-20} y={-30} width={40} height={56} rx={6} fill="#FFE08A" stroke={INK} strokeWidth={5} />
        <path d="M -24 -30 L 0 -50 L 24 -30" fill={INK} />
      </g>
    </g>
  );
};

// world position of a point given in a Drinker's local coordinates
const ptAt = (lp: P, x: number, y: number, s: number, facing: 1 | -1, lean: number): P => {
  const lx = lp[0] * s * facing;
  const ly = lp[1] * s;
  return [x + lx * Math.cos(rad(lean)) - ly * Math.sin(rad(lean)), y + lx * Math.sin(rad(lean)) + ly * Math.cos(rad(lean))];
};
// world → local for a figure at (x, y), scale s, facing
const toLocal = (p: P, x: number, y: number, s: number, facing: 1 | -1 = 1): P => [((p[0] - x) / s) * facing, (p[1] - y) / s];

const Burst: React.FC<{ x: number; y: number; s?: number; col?: string; f: number }> = ({ x, y, s = 1, col = "#FFE08A", f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${f * 2})`}>
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${Math.cos(rad(k * 30)) * 40} ${Math.sin(rad(k * 30)) * 40} L ${Math.cos(rad(k * 30)) * 120} ${Math.sin(rad(k * 30)) * 120}`} stroke={col} strokeWidth={10} strokeLinecap="round" />
    ))}
    <circle r={26} fill="#FFFFFF" />
  </g>
);

// star fort on a low bank (Fort McHenry style), origin = centre of the bank top
const Fort: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -620 60 Q -300 -40 0 -40 Q 300 -40 620 60 L 620 300 L -620 300 Z" fill="#26402E" stroke={INK} strokeWidth={7} />
    <path d="M -420 0 L -300 -80 L -180 -60 L -60 -120 L 60 -120 L 180 -60 L 300 -80 L 420 0 Z" fill="#6A5A48" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -300 -80 L -260 -40 M 300 -80 L 260 -40 M -60 -120 L -40 -70 M 60 -120 L 40 -70" stroke="#4A3E32" strokeWidth={6} />
    {[-220, -110, 110, 220].map((wx) => <rect key={wx} x={wx - 14} y={-70} width={28} height={16} fill={INK} />)}
  </g>
);

const Rocket: React.FC<{ f: number; at: number; from: P; to: P; peak: number }> = ({ f, at, from, to, peak }) => {
  const p = interpolate(f, [at, at + 22], [0, 1], clamp);
  if (p <= 0) return null;
  const pt = (t: number): P => [lerp(from[0], to[0], t), lerp(from[1], to[1], t) - Math.sin(t * Math.PI) * peak];
  const n = 14;
  const pts = new Array(n + 1).fill(0).map((_, k) => pt((k / n) * p));
  const d = pts.map((q, k) => `${k ? "L" : "M"} ${q[0]} ${q[1]}`).join(" ");
  const head = pt(p);
  const boom = p >= 1 ? interpolate(f, [at + 22, at + 34], [0, 1], clamp) : 0;
  return (
    <g>
      <path d={d} stroke="#FF7A3A" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.45} />
      <path d={d} stroke="#FFD27A" strokeWidth={5} fill="none" strokeLinecap="round" />
      {p < 1 ? <circle cx={head[0]} cy={head[1]} r={12} fill="#FFF2C0" /> : null}
      {boom > 0 ? (
        <g opacity={1 - boom * 0.7}>
          <circle cx={head[0]} cy={head[1]} r={30 + boom * 110} fill="#FF8A3A" opacity={0.35} />
          {new Array(10).fill(0).map((_, k) => (
            <circle key={k} cx={head[0] + Math.cos(rad(k * 36)) * boom * 130} cy={head[1] + Math.sin(rad(k * 36)) * boom * 130} r={9} fill="#FFE08A" />
          ))}
        </g>
      ) : null}
    </g>
  );
};

const Firework: React.FC<{ x: number; y: number; f: number; at: number; col: string; r?: number }> = ({ x, y, f, at, col, r = 150 }) => {
  const age = ((f - at) % 36 + 36) % 36;
  const p = age / 36;
  return (
    <g opacity={1 - p}>
      {new Array(16).fill(0).map((_, k) => (
        <path key={k} d={`M ${x + Math.cos(rad(k * 22.5)) * r * p * 0.5} ${y + Math.sin(rad(k * 22.5)) * r * p * 0.5} L ${x + Math.cos(rad(k * 22.5)) * r * p} ${y + Math.sin(rad(k * 22.5)) * r * p + p * 20}`} stroke={col} strokeWidth={7} strokeLinecap="round" />
      ))}
    </g>
  );
};

// a fan at a game today, facing the camera, hand on heart, singing. Origin = bottom centre (bust).
const Fan: React.FC<{ x: number; y: number; s?: number; f: number; shirt: string; skin?: string; hair?: string; cap?: string; paint?: boolean; off?: number }> = ({ x, y, s = 1, f, shirt, skin = SKIN, hair = HAIR, cap, paint = false, off = 0 }) => {
  const sing = 0.6 + 0.4 * Math.abs(Math.sin((f + off * 20) / 6));
  return (
    <g transform={`translate(${x} ${y + Math.sin((f + off * 10) / 14) * 4}) scale(${s})`}>
      <path d="M -170 0 Q -170 -230 -60 -250 L 60 -250 Q 170 -230 170 0 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -250 Q 0 -220 40 -250" stroke={INK} strokeWidth={6} fill="none" />
      <rect x={-30} y={-290} width={60} height={46} fill={skin} stroke={INK} strokeWidth={5} />
      {/* right hand over the heart (the fan's left chest = viewer's right) */}
      <path d="M -150 -40 Q -60 -60 40 -150" stroke={INK} strokeWidth={60} fill="none" strokeLinecap="round" />
      <path d="M -150 -40 Q -60 -60 40 -150" stroke={shirt} strokeWidth={46} fill="none" strokeLinecap="round" />
      <ellipse cx={66} cy={-160} rx={48} ry={36} fill={skin} stroke={INK} strokeWidth={6} />
      <g transform="translate(0 -370)">
        <circle cx={0} cy={0} r={92} fill={skin} stroke={INK} strokeWidth={7} />
        {cap ? (
          <g>
            <path d="M -92 -20 Q -90 -110 0 -112 Q 90 -110 92 -20 Z" fill={cap} stroke={INK} strokeWidth={6} />
            <path d="M -60 -26 Q 0 -10 130 -30 Q 120 -8 60 -4 Q 0 -6 -60 -26 Z" fill={cap} stroke={INK} strokeWidth={6} />
          </g>
        ) : (
          <path d="M -92 -10 Q -96 -100 0 -104 Q 96 -100 92 -10 Q 60 -60 0 -56 Q -60 -60 -92 -10 Z" fill={hair} stroke={INK} strokeWidth={6} />
        )}
        <path d="M -48 -4 Q -34 -16 -20 -4 M 20 -4 Q 34 -16 48 -4" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx={-52} cy={26} r={14} fill={CHEEK} opacity={0.6} />
        <circle cx={52} cy={26} r={14} fill={CHEEK} opacity={0.6} />
        <ellipse cx={0} cy={44} rx={20} ry={14 + 12 * sing} fill="#5A1E1A" stroke={INK} strokeWidth={5} />
        {paint ? (
          <g>
            <path d="M -66 4 l 6 12 l 13 2 l -10 9 l 3 13 l -12 -7 l -12 7 l 3 -13 l -10 -9 l 13 -2 Z" fill="#FFFFFF" stroke={US_BLUE} strokeWidth={3} />
            <path d="M 52 8 L 80 8 M 52 18 L 80 18 M 52 28 L 80 28" stroke={US_RED} strokeWidth={6} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

const Note: React.FC<{ x: number; y: number; f: number; at: number }> = ({ x, y, f, at }) => {
  const age = ((f - at) % 40 + 40) % 40;
  const p = age / 40;
  return (
    <g transform={`translate(${x + Math.sin(p * 6) * 20} ${y - p * 260})`} opacity={1 - p}>
      <ellipse cx={0} cy={0} rx={22} ry={16} fill={C.mustard} stroke={INK} strokeWidth={4} transform="rotate(-20)" />
      <path d="M 18 -6 L 18 -80 L 50 -66" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  );
};

// red ink stamp, origin = centre
const Stamp: React.FC<{ x: number; y: number; text: string; p: number }> = ({ x, y, text, p }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(-9) scale(${lerp(2.2, 1, p)})`} opacity={Math.min(1, p * 1.6)}>
      <rect x={-330} y={-100} width={660} height={200} rx={20} fill="#FFF3E0" opacity={0.85} stroke={C.brick} strokeWidth={16} />
      <rect x={-306} y={-78} width={612} height={156} rx={12} fill="none" stroke={C.brick} strokeWidth={5} />
      <text x={0} y={44} textAnchor="middle" fontFamily={titleFont} fontSize={124} fill={C.brick}>{text}</text>
    </g>
  ) : null;

export const PressGang: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "grab";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;

  if (mode === "grab") {
    // frame 0: the lieutenant fills the frame outside a harbour tavern at sunset, cudgel up,
    // a fistful of a startled drinker's collar; the drinker's tankard flies, his cap pops off
    const lean = 9 + Math.sin(f / 3) * 3;
    const VX = 745;
    const VY = 1800;
    const VS = 1.28;
    const OX = 395;
    const OY = 1815;
    const OS = 1.46;
    const collar = collarAt(VX, VY, VS, -1, lean);
    const grab = toLocal(collar, OX, OY, OS);
    const p = f / 40;
    const tx = 900 + 70 * p;
    const ty = 990 - 260 * p + 430 * p * p;
    const capFly = interpolate(f, [0, 18], [0.35, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    body = (
      <>
        <DuskSky horizon={1180} sunX={250} f={f} />
        <Sea y0={1080} f={f} h={120} />
        <Frigate x={-60} y={1110} s={0.22} f={f} seed="g1" />
        <Frigate x={300} y={1125} s={0.36} f={f} seed="g2" />
        <Tavern x={590} y={1196} w={500} h={640} f={f} open={1} />
        <Ganger x={845} y={1196} s={0.5} f={f} facing={-1} club={1} />
        <Cobbles y0={1186} seed="grab" />
        <Drinker x={VX} y={VY} s={VS} f={f} facing={-1} lean={lean} pose="flail" cap={capFly} />
        <Officer x={OX} y={OY} s={OS} f={f} club={1} grab={grab} face="snarl" />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${collar[0] + 40 + k * 18} ${collar[1] - 70 + k * 40} l 50 ${-20 + k * 20}`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={0.8} />
        ))}
        {ty < 2100 ? <Tankard x={tx} y={ty} s={0.5 + 0.8 * p} rot={-30 + 190 * p} spill={Math.min(1, p * 2)} /> : null}
      </>
    );
  } else if (mode === "burst") {
    // the tavern door bangs open: the officer and two seamen with cudgels charge in → cut: dragged down the quay to the boat
    const cut = (v.cutAt ?? 0.5) * dur;
    if (f < cut) {
      const open = ease(f, 2, 8);
      const k = interpolate(f, [4, cut], [1, 1.32], clamp);
      const gy = interpolate(f, [4, cut], [1380, 1490], clamp);
      const bang = popIn(f, 3, 7);
      const jump = (o: number) => -Math.abs(Math.sin((f + o) / 4)) * 26 * open;
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1420} fill="#7A4E2E" />
          {new Array(12).fill(0).map((_, i) => <path key={i} d={`M ${i * 96 + 20} 0 L ${i * 96 + 20} 1420`} stroke="#5E3A20" strokeWidth={8} />)}
          <path d="M 0 640 L 1080 640" stroke="#4A2E18" strokeWidth={30} />
          {[150, 930].map((lx) => (
            <g key={lx} transform={`translate(${lx} 860)`}>
              <circle r={150} fill="url(#ep055glow)" opacity={0.8 + 0.2 * Math.sin(f / 3)} />
              <rect x={-24} y={-36} width={48} height={64} rx={6} fill="#FFE08A" stroke={INK} strokeWidth={5} />
              <path d="M -28 -36 L 0 -60 L 28 -36" fill={INK} />
            </g>
          ))}
          {[[130, 1420], [950, 1420]].map(([bx, by], i) => (
            <g key={i} transform={`translate(${bx} ${by})`}>
              <path d="M -90 0 L -100 -110 Q -90 -220 -90 -230 L 90 -230 Q 90 -220 100 -110 L 90 0 Z" fill={WOOD_HI} stroke={INK} strokeWidth={6} />
              <path d="M -100 -70 L 100 -70 M -100 -160 L 100 -160" stroke={INK} strokeWidth={8} />
            </g>
          ))}
          {/* the doorway with sunset light behind */}
          <rect x={360} y={720} width={360} height={700} fill="#F9C46B" stroke={INK} strokeWidth={10} />
          <rect x={360} y={720} width={360} height={700} fill="url(#ep055dusk)" opacity={0.5} />
          <g transform={`translate(360 0) scale(${1 - open * 0.92} 1)`}>
            <rect x={0} y={720} width={360} height={700} fill={WOOD} stroke={INK} strokeWidth={7} />
            {[90, 180, 270].map((dx) => <path key={dx} d={`M ${dx} 730 L ${dx} 1410`} stroke={WOOD_D} strokeWidth={6} />)}
          </g>
          <rect x={0} y={1420} width={1080} height={500} fill="#4A3220" />
          {new Array(6).fill(0).map((_, i) => <path key={i} d={`M 0 ${1460 + i * 80} L 1080 ${1460 + i * 80}`} stroke="#3A2618" strokeWidth={6} />)}
          <g transform={`translate(540 ${gy}) scale(${k}) translate(-540 ${-gy})`}>
            <Ganger x={385} y={gy} s={0.62} f={f} facing={1} club={1} walk off={0.3} />
            <Ganger x={700} y={gy} s={0.62} f={f} facing={-1} club={1} walk off={0.7} hat="#2A2A30" />
            <Officer x={540} y={gy + 10} s={0.6} f={f} club={1} face="snarl" walk point />
          </g>
          {bang > 0 ? (
            <g transform={`translate(260 700) rotate(-12) scale(${bang})`}>
              <Burst x={0} y={-30} s={1.6} f={f} />
              <text x={0} y={20} textAnchor="middle" fontFamily={titleFont} fontSize={130} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">BANG!</text>
            </g>
          ) : null}
          {/* foreground: the table, tankards, two drinkers jumping up */}
          <rect x={60} y={1640} width={960} height={70} rx={10} fill={WOOD} stroke={INK} strokeWidth={8} />
          <Tankard x={430} y={1590 + jump(3) * 0.5} s={0.45} rot={-12 * open} />
          <Tankard x={640} y={1590} s={0.45} rot={20 * open} spill={open * 0.6} />
          <g transform={`translate(0 ${jump(0)})`}>
            <ellipse cx={170} cy={1880} rx={190} ry={150} fill="#5A4A6A" stroke={INK} strokeWidth={8} />
            <circle cx={170} cy={1700} r={92} fill={HAIR} stroke={INK} strokeWidth={8} />
            <path d="M 90 1660 Q 170 1580 250 1660 Q 170 1630 90 1660 Z" fill={C.brick} stroke={INK} strokeWidth={6} />
          </g>
          <g transform={`translate(0 ${jump(6)})`}>
            <ellipse cx={920} cy={1890} rx={190} ry={150} fill="#3E6A5A" stroke={INK} strokeWidth={8} />
            <circle cx={920} cy={1710} r={92} fill="#3A2A1C" stroke={INK} strokeWidth={8} />
          </g>
        </>
      );
    } else {
      const lf = f - cut;
      const d = ease(lf, 0, dur - cut);
      const VX = lerp(640, 470, d);
      const VY = 1790;
      const lean = 16 + Math.sin(f / 3) * 4;
      const hand1 = ptAt([200, -430], VX, VY, 1.0, -1, lean);
      const hand2 = ptAt([-196, -420], VX, VY, 1.0, -1, lean);
      const g1x = VX - 300;
      const g2x = VX + 290;
      body = (
        <>
          <DuskSky horizon={1150} sunX={860} f={f} />
          <Sea y0={1050} f={f} h={200} />
          <Frigate x={560} y={1135} s={0.6} f={f} seed="q" />
          <Rowboat x={150} y={1150} s={0.8} f={f} />
          <rect x={0} y={1230} width={1080} height={690} fill="#9C8A74" />
          <path d="M 0 1230 L 1080 1230" stroke={INK} strokeWidth={10} />
          {new Array(5).fill(0).map((_, r) =>
            new Array(6).fill(0).map((__, c) => <rect key={`${r}${c}`} x={c * 200 - (r % 2) * 100} y={1240 + r * 140} width={196} height={136} fill="none" stroke="#7E6E5A" strokeWidth={5} />),
          )}
          <Ganger x={g1x} y={1800} s={0.95} f={f} facing={1} club={0.2} walk reach={toLocal(hand1, g1x, 1800, 0.95, 1)} off={0.1} />
          <Drinker x={VX} y={VY} s={1.0} f={f} facing={-1} lean={lean} pose="drag" cap={2} />
          <Ganger x={g2x} y={1810} s={0.95} f={f} facing={-1} club={0.2} walk reach={toLocal(hand2, g2x, 1810, 0.95, -1)} off={0.5} hat="#2A2A30" />
          <Officer x={960} y={1850} s={0.9} f={f} club={1} facing={-1} face="grin" point />
        </>
      );
    }
  } else if (mode === "spot") {
    // the lieutenant spies through a brass telescope: tattoo? rolling walk? → PRESSED!
    const lean = Math.sin(f / 4) * 9;
    const VX = lerp(1010, 700, f / dur);
    const VY = 1650;
    const stampP = popIn(f, (v.stampAt ?? 0.66) * dur, 6);
    const lens = popIn(f, 4, 9);
    const arm = ptAt([56, -300], VX, VY, 1.0, -1, lean);
    body = (
      <>
        <DuskSky horizon={1260} sunX={860} f={f} />
        <Sea y0={1150} f={f} h={120} />
        <Frigate x={820} y={1185} s={0.3} f={f} seed="sp" />
        <Tavern x={-80} y={1270} w={420} h={560} f={f} />
        <Cobbles y0={1262} seed="spot" />
        <Drinker x={VX} y={VY} s={1.0} f={f} facing={-1} lean={lean} pose="walk" tattoo />
        <Officer x={200} y={2340} s={1.95} f={f} club={0} glass face="squint" />
        {lens > 0 ? (
          <g>
            <path d={`M ${arm[0]} ${arm[1]} L 790 840`} stroke={INK} strokeWidth={6} strokeDasharray="14 10" opacity={lens} />
            <g transform={`translate(800 720) scale(${lens})`}>
              <circle r={150} fill={C.cream} stroke={INK} strokeWidth={12} />
              <path d="M -170 90 L 170 -60" stroke={INK} strokeWidth={130} />
              <path d="M -170 90 L 170 -60" stroke={SKIN} strokeWidth={112} />
              <g transform="translate(0 16) rotate(-24) scale(1.3)"><Anchor /></g>
              <circle r={150} fill="none" stroke={INK} strokeWidth={12} />
            </g>
          </g>
        ) : null}
      </>
    );
    overlay = <Stamp x={540} y={1290} text="PRESSED!" p={stampP} />;
  } else if (mode === "war") {
    // a US frigate (15-star flag) and a Royal Navy ship trade broadsides
    body = (
      <>
        <DuskSky horizon={1120} sunX={540} f={f} />
        <Sea y0={1100} f={f} />
        <Frigate x={830} y={1215} s={0.42} f={f} dir={-1} flag="uk" sails="set" fire seed="w2" />
        {[0, 1, 2, 3].map((k) => (
          <circle key={k} cx={(300 + k * 160 + f * (2 + k)) % 1200 - 60} cy={1020 + (k % 2) * 60} r={110 + k * 14} fill="#EFE6D6" opacity={0.35} />
        ))}
        <Frigate x={310} y={1390} s={0.62} f={f} dir={1} flag="us" sails="set" fire seed="w1" />
      </>
    );
  } else if (mode === "anthem") {
    // night of the bombardment: rockets over the star fort and its huge flag → flash → today: fans at a game, hand on heart
    const answerAt = (v.answerAt ?? 0.66) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep055night)" />
          {new Array(40).fill(0).map((_, i) => <circle key={i} cx={random(`an${i}`) * 1080} cy={random(`any${i}`) * 900} r={2 + random(`anr${i}`) * 2} fill="#FFF4DC" opacity={0.6} />)}
          <Rocket f={f} at={-6} from={[1100, 1640]} to={[300, 820]} peak={380} />
          <Rocket f={f} at={8} from={[1100, 1700]} to={[620, 760]} peak={300} />
          <Rocket f={f} at={22} from={[1100, 1660]} to={[200, 1000]} peak={420} />
          <Rocket f={f} at={40} from={[1100, 1700]} to={[760, 880]} peak={260} />
          <Sea y0={1600} f={f} col="#1E2E52" colD="#16233F" />
          <path d="M 1080 1660 L 900 1660 L 920 1610 L 1080 1610 Z" fill="#0C0E1A" />
          <path d="M 980 1610 L 980 1450 M 1040 1610 L 1040 1470" stroke="#0C0E1A" strokeWidth={8} />
          <Fort x={420} y={1520} s={0.9} />
          <path d="M 420 1420 L 420 760" stroke={INK} strokeWidth={16} />
          <path d="M 420 1420 L 420 760" stroke="#C9C2B4" strokeWidth={8} />
          <Flag x={420} y={770} w={460} h={300} kind="us" f={f} />
        </>
      );
    } else {
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 7], [1, 0], clamp);
      const chip = popIn(lf, 10, 8);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep055night)" />
          {[[90, 520], [990, 520]].map(([lx, ly], i) => (
            <g key={i}>
              <circle cx={lx} cy={ly} r={220} fill="url(#ep055glow)" />
              <rect x={lx - 70} y={ly - 40} width={140} height={80} rx={10} fill="#FFF6D8" stroke={INK} strokeWidth={6} />
              <path d={`M ${lx} ${ly + 40} L ${lx} 1100`} stroke={INK} strokeWidth={14} />
            </g>
          ))}
          <Firework x={300} y={620} f={f} at={answerAt} col="#FF6A5A" />
          <Firework x={800} y={580} f={f} at={answerAt + 14} col="#8AD0FF" />
          <Firework x={560} y={700} f={f} at={answerAt + 26} col="#FFE08A" r={120} />
          <path d="M -40 1300 Q 540 760 1120 1300 L 1120 1920 L -40 1920 Z" fill="#2A2E52" stroke={INK} strokeWidth={8} />
          {new Array(9).fill(0).map((_, r) =>
            new Array(22).fill(0).map((__, c) => {
              const cx = c * 52 - 20 + (r % 2) * 26;
              const cy = 1060 + r * 46 + Math.abs(cx - 540) * 0.32;
              return cy < 1500 ? <circle key={`${r}-${c}`} cx={cx} cy={cy} r={13} fill={["#C0392B", "#F4EAD5", "#2E5AAC", "#F2B544"][(r * 7 + c) % 4]} stroke={INK} strokeWidth={2} /> : null;
            }),
          )}
          <Flag x={300} y={820} w={480} h={300} kind="us" f={f} modern />
          <Note x={250} y={1500} f={f} at={answerAt} />
          <Note x={830} y={1460} f={f} at={answerAt + 18} />
          <Fan x={190} y={1960} s={1.0} f={f} shirt="#2E5AAC" cap="#C0392B" off={0.3} />
          <Fan x={890} y={1960} s={1.0} f={f} shirt="#C0392B" skin="#B98260" hair="#2A1C14" off={0.7} />
          <Fan x={540} y={1980} s={1.3} f={f} shirt="#F4EAD5" skin="#E8B990" hair="#C98A3A" paint />
          {chip > 0 ? (
            <g transform={`translate(540 640) scale(${chip}) rotate(-2)`}>
              <rect x={-370} y={-46} width={740} height={92} rx={18} fill={C.cream} stroke={INK} strokeWidth={7} />
              <text x={0} y={14} textAnchor="middle" fontFamily={titleFont} fontSize={38} fill={INK} textLength={680} lengthAdjust="spacingAndGlyphs">STAR-SPANGLED BANNER, 1814</text>
            </g>
          ) : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={mode === "anthem" ? "night" : "dawn"} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
        {overlay}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "anthem" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.66) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} />
    </Backdrop>
  );
};
