import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep056 Vestal Virgin – the priestess in white robes and veil (suffibulum + red-and-white infula) who kept
// Vesta's sacred fire burning in the round temple in the Roman Forum. Warm firelit golds, Roman ochre and marble.
// visual: { mode: "hearth" | "chosen" | "fire" | "vip" | "vault" | "today", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, cutAt? (chosen / vip, 0–1), dieAt?, curtainAt? (fire),
//           freeAt? (vip), slabAt? (vault), answer?, answerAccent?, answerAt?, answerSize? (today) }
// Respectful: no violence shown – the whipping is a shadow behind a curtain, the vault is shown empty (steps, a lamp, a slab).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const ROBE = "#F7F2E6";
const ROBE_D = "#DCD3BF";
const ROBE_S = "#C9BEA6";
const PURPLE = "#7A3E8E";
const WOOL_R = "#C0392B";
const GOLDL = "#F2B544";
const GOLD_D = "#C98E1E";
const SKIN = "#EDBB92";
const SKIN_D = "#CF9670";
const CHEEK = "#E58A7A";
const HAIR = "#5A3A26";
const MARBLE = "#ECE6D8";
const MARBLE_D = "#C7BEAC";
const MARBLE_S = "#A99F8C";
const STONE = "#CDB48C";
const STONE_D = "#A88E66";
const BRICK = "#B0623E";
const BRONZE = "#B07A32";
const BRONZE_D = "#7E5420";
const WOOD = "#7A5232";
const WOOD_D = "#5A3A20";
const EARTH = "#6B4A33";
const EARTH_D = "#4E3424";
const GRASS = "#6E9A4A";
const GRASS_D = "#557A38";
const WATER = "#5FA8C8";

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

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string; line?: string }> = ({ a, b, c, w, col, line = INK }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={line} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

const Hand: React.FC<{ p: P; r?: number; col?: string; line?: string }> = ({ p, r = 22, col = SKIN, line = INK }) => <circle cx={p[0]} cy={p[1]} r={r} fill={col} stroke={line} strokeWidth={5} />;

// ---------- figures ----------

// The Vestal: long white stola with a draped palla, white veil (suffibulum) with a purple border pinned under the chin
// with a gold brooch, red-and-white woollen band (infula) across the brow. Origin = feet centre, facing right.
// pose: feed (both hands push a log into the fire) | gasp (hand to mouth) | walk | touch (hand held out) | calm (hands folded)
// marble: draw her as a white marble statue (no colour, blank eyes). glow: warm firelight from the right (0–1).
type VPose = "feed" | "gasp" | "walk" | "touch" | "calm";
export const Vestal: React.FC<{ x: number; y: number; s?: number; f: number; pose?: VPose; facing?: 1 | -1; marble?: boolean; glow?: number; off?: number }> = ({ x, y, s = 1, f, pose = "calm", facing = 1, marble = false, glow = 0, off = 0 }) => {
  const g = f + off * 40;
  const walk = pose === "walk";
  const step = walk ? Math.sin(g / 5) : 0;
  const breathe = marble ? 0 : Math.sin(g / 14) * 3;
  const robe = marble ? MARBLE : ROBE;
  const robeD = marble ? MARBLE_D : ROBE_D;
  const robeS = marble ? MARBLE_S : ROBE_S;
  const skin = marble ? MARBLE : SKIN;
  const line = marble ? "#6E6658" : INK;
  const purple = marble ? MARBLE_D : PURPLE;
  const wool = marble ? MARBLE_D : WOOL_R;
  const Sb: P = [-66, -540];
  let Sf: P = [70, -540];
  let Hf: P;
  let Hb: P;
  let Ef: P;
  let Eb: P;
  if (pose === "feed") {
    const push = Math.sin(g / 7) * 8;
    Hf = [240 + push, -436 - push * 0.4];
    Hb = [170 + push, -404 - push * 0.4];
    Sf = [76, -500];
    Ef = [96, -360];
    Eb = [40, -380];
  } else if (pose === "gasp") {
    Hf = [84, -616];
    Hb = [34, -500];
    Ef = [150, -560];
    Eb = [-30, -440];
  } else if (pose === "walk") {
    const sw = Math.sin(g / 5);
    Hf = [70 + sw * 36, -330];
    Hb = [-56 - sw * 36, -334];
    Ef = [92, -440];
    Eb = [-84, -440];
  } else if (pose === "touch") {
    Hf = [256, -490 + Math.sin(g / 8) * 6];
    Hb = [30, -420];
    Ef = [160, -470];
    Eb = [-40, -440];
  } else {
    Hf = [44, -420];
    Hb = [8, -414];
    Ef = [100, -470];
    Eb = [-70, -450];
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={200} ry={24} fill="#000" opacity={0.2} />
      {/* back of the veil, falling over the shoulders */}
      <path d={`M -70 -650 Q -92 -772 12 -776 Q 110 -772 96 -650 Q 110 -560 70 -520 L ${-160 - breathe} -420 Q -146 -546 -70 -650 Z`} fill={robe} stroke={line} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M -150 -432 Q -120 -540 -70 -640`} stroke={purple} strokeWidth={8} fill="none" />
      {/* back arm */}
      <Limb a={Sb} b={Eb} c={Hb} w={44} col={robeD} line={line} />
      <Hand p={Hb} r={21} col={skin} line={line} />
      {/* stola */}
      <path d={`M -100 -560 Q -134 -300 ${-188 - step * 12} -12 Q -124 4 -62 -8 Q 0 6 62 -8 Q 124 4 ${188 + step * 12} -12 Q 134 -300 100 -560 Q 0 -${584 + breathe} -100 -560 Z`} fill={robe} stroke={line} strokeWidth={7} strokeLinejoin="round" />
      {[[-40, -400, -70, -200, -96, -18], [16, -380, 22, -200, 30, -14], [66, -420, 96, -220, 128, -18], [-80, -330, -120, -160, -150, -16]].map(([a, b, c2, d, e, h], k) => (
        <path key={k} d={`M ${a} ${b} Q ${c2 + step * 10} ${d} ${e + step * 14} ${h}`} stroke={robeD} strokeWidth={7} fill="none" strokeLinecap="round" />
      ))}
      {/* palla draped across the body */}
      <path d="M -100 -556 Q 10 -470 118 -330 L 132 -276 Q 10 -372 -126 -410 Q -128 -500 -100 -556 Z" fill={marble ? MARBLE : "#EFE6D2"} stroke={line} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -112 -440 Q 0 -400 120 -300" stroke={robeS} strokeWidth={5} fill="none" />
      <path d="M -106 -404 Q 0 -388 110 -404" stroke={robeS} strokeWidth={8} fill="none" />
      {/* sandals */}
      {[-52 - step * 30, 64 + step * 30].map((fx, k) => (
        <g key={k}>
          <ellipse cx={fx} cy={-4} rx={34} ry={12} fill={skin} stroke={line} strokeWidth={4} />
          <path d={`M ${fx - 18} -10 L ${fx + 14} -2`} stroke={marble ? MARBLE_S : WOOD} strokeWidth={5} />
        </g>
      ))}
      {/* neck + head */}
      <rect x={-6} y={-616} width={40} height={52} fill={marble ? MARBLE_D : SKIN_D} stroke={line} strokeWidth={5} />
      <circle cx={14} cy={-662} r={60} fill={skin} stroke={line} strokeWidth={6} />
      {marble ? (
        <path d="M 30 -664 Q 42 -658 54 -664 M 70 -672 Q 84 -650 70 -640 M 38 -626 Q 46 -622 56 -626" stroke={MARBLE_S} strokeWidth={5} fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <path d="M 28 -692 Q 42 -700 58 -690" stroke={HAIR} strokeWidth={6} fill="none" strokeLinecap="round" />
          {pose === "gasp" ? <ellipse cx={44} cy={-666} rx={9} ry={12} fill="#FFFFFF" stroke={INK} strokeWidth={3} /> : null}
          <ellipse cx={45} cy={-665} rx={6} ry={pose === "calm" ? 3 : 8} fill={INK} />
          {pose !== "calm" ? <circle cx={47} cy={-668} r={2.2} fill="#FFFFFF" /> : null}
          <path d="M 72 -676 Q 88 -652 72 -642" fill={skin} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={52} cy={-640} r={12} fill={CHEEK} opacity={0.55} />
          {pose === "feed" || pose === "touch" ? <path d="M 36 -624 Q 48 -616 60 -626" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" /> : <path d="M 38 -624 L 56 -624" stroke={INK} strokeWidth={5} strokeLinecap="round" />}
        </g>
      )}
      {/* hair at the brow + infula (red-and-white woollen band) + veil front with purple border */}
      <path d="M -48 -676 Q -30 -726 14 -728 Q 58 -726 88 -676" stroke={marble ? MARBLE_D : HAIR} strokeWidth={22} fill="none" />
      <path d="M -50 -684 Q -32 -734 14 -736 Q 60 -734 90 -684" stroke={robe} strokeWidth={14} fill="none" />
      <path d="M -50 -684 Q -32 -734 14 -736 Q 60 -734 90 -684" stroke={wool} strokeWidth={14} fill="none" strokeDasharray="12 12" />
      <path d="M -66 -640 Q -76 -778 14 -784 Q 104 -780 94 -676 Q 62 -746 14 -748 Q -36 -744 -52 -680 Z" fill={robe} stroke={line} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -52 -680 Q -36 -744 14 -748 Q 62 -746 94 -676" stroke={purple} strokeWidth={9} fill="none" />
      {/* veil flaps framing the face, pinned under the chin */}
      <path d="M -66 -644 Q -86 -572 16 -544 Q -24 -584 -48 -664 Z" fill={robe} stroke={line} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 94 -680 Q 108 -596 16 -544 Q 70 -594 80 -652 Z" fill={robe} stroke={line} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={16} cy={-546} r={15} fill={marble ? MARBLE_D : GOLDL} stroke={line} strokeWidth={4} />
      {!marble ? <circle cx={12} cy={-550} r={4} fill="#FFF6D8" /> : null}
      {/* the log she feeds into the fire */}
      {pose === "feed" ? (
        <g>
          <path d="M 110 -376 L 400 -510" stroke={INK} strokeWidth={34} strokeLinecap="round" />
          <path d="M 110 -376 L 400 -510" stroke={WOOD} strokeWidth={22} strokeLinecap="round" />
          <path d="M 150 -400 L 360 -496" stroke={WOOD_D} strokeWidth={5} />
        </g>
      ) : null}
      {/* front arm */}
      <Limb a={Sf} b={Ef} c={Hf} w={46} col={robe} line={line} />
      <path d={`M ${Sf[0] - 10} ${Sf[1] + 20} Q ${Ef[0]} ${Ef[1] + 30} ${(Ef[0] + Hf[0]) / 2} ${(Ef[1] + Hf[1]) / 2 + 22}`} stroke={robeD} strokeWidth={6} fill="none" />
      <Hand p={Hf} r={23} col={skin} line={line} />
      {glow > 0 ? <ellipse cx={110} cy={-430} rx={190} ry={400} fill="url(#ep056rim)" opacity={glow} /> : null}
    </g>
  );
};

// a little girl in a tunic (candidates were 6–10). Origin = feet centre, facing right.
const Girl: React.FC<{ x: number; y: number; s?: number; f: number; tunic: string; hair?: string; skin?: string; facing?: 1 | -1; reach?: P; off?: number; happy?: boolean }> = ({ x, y, s = 1, f, tunic, hair = HAIR, skin = SKIN, facing = 1, reach, off = 0, happy = false }) => {
  const g = f + off * 30;
  const bob = Math.sin(g / 9) * 3;
  const Hf: P = reach ?? [60, -170];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={90} ry={14} fill="#000" opacity={0.18} />
      <g transform={`translate(0 ${bob})`}>
        <Limb a={[-30, -250]} b={[-60, -200]} c={[-56, -150]} w={26} col={skin} />
        <path d="M -56 -270 Q 0 -290 56 -270 L 84 -20 L -84 -20 Z" fill={tunic} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -64 -160 L 64 -160" stroke="#00000033" strokeWidth={10} />
        {[-30, 30].map((lx) => <ellipse key={lx} cx={lx} cy={-8} rx={24} ry={10} fill={skin} stroke={INK} strokeWidth={4} />)}
        <circle cx={6} cy={-330} r={58} fill={skin} stroke={INK} strokeWidth={6} />
        <path d="M -52 -330 Q -60 -400 6 -398 Q 66 -398 62 -350 Q 30 -380 -10 -366 Q -30 -340 -52 -330 Z" fill={hair} stroke={INK} strokeWidth={5} />
        <circle cx={-44} cy={-384} r={24} fill={hair} stroke={INK} strokeWidth={5} />
        <ellipse cx={34} cy={-334} rx={6} ry={8} fill={INK} />
        <circle cx={36} cy={-337} r={2} fill="#FFFFFF" />
        <circle cx={40} cy={-308} r={10} fill={CHEEK} opacity={0.6} />
        {happy ? <path d="M 22 -300 Q 34 -290 48 -302" stroke={INK} strokeWidth={4} fill="none" /> : <path d="M 26 -298 L 44 -298" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
        <Limb a={[34, -250]} b={[(34 + Hf[0]) / 2 + 10, (-250 + Hf[1]) / 2 + 20]} c={Hf} w={26} col={skin} />
        <circle cx={Hf[0]} cy={Hf[1]} r={16} fill={skin} stroke={INK} strokeWidth={4} />
      </g>
    </g>
  );
};

// the Pontifex Maximus: toga with a purple border pulled over his head (capite velato), grey hair.
// Origin = feet centre, facing right. hand = where his front hand is (local).
const Priest: React.FC<{ x: number; y: number; s?: number; f: number; hand?: P; facing?: 1 | -1; walk?: boolean }> = ({ x, y, s = 1, f, hand = [210, -420], facing = 1, walk = false }) => {
  const step = walk ? Math.sin(f / 5) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={190} ry={22} fill="#000" opacity={0.2} />
      <path d={`M -110 -580 Q -150 -300 ${-170 - step * 10} -10 L ${170 + step * 10} -10 Q 150 -300 110 -580 Q 0 -610 -110 -580 Z`} fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -110 -580 Q 30 -440 150 -170" stroke={PURPLE} strokeWidth={22} fill="none" />
      <path d="M -110 -580 Q 30 -440 150 -170" stroke={INK} strokeWidth={4} fill="none" opacity={0.5} />
      {[[-60, -400, -110, -16], [20, -320, 40, -14], [90, -300, 130, -16]].map(([a, b, c2, d], k) => <path key={k} d={`M ${a} ${b} Q ${(a + c2) / 2 - 10} ${(b + d) / 2} ${c2} ${d}`} stroke={ROBE_D} strokeWidth={7} fill="none" />)}
      {[-50 - step * 26, 60 + step * 26].map((fx, k) => <ellipse key={k} cx={fx} cy={-4} rx={36} ry={12} fill="#6B4A2E" stroke={INK} strokeWidth={4} />)}
      {/* head + hood of the toga */}
      <path d="M -84 -640 Q -96 -790 14 -796 Q 112 -790 100 -660 Q 110 -600 80 -570 L -120 -560 Q -110 -600 -84 -640 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -84 -640 Q -94 -760 14 -770" stroke={PURPLE} strokeWidth={10} fill="none" />
      <circle cx={20} cy={-670} r={60} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -36 -690 Q -40 -730 0 -728 Q -20 -712 -24 -680 Z" fill="#C9C2B4" stroke={INK} strokeWidth={4} />
      <path d="M 34 -700 L 62 -694" stroke="#8C8478" strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={50} cy={-676} rx={6} ry={7} fill={INK} />
      <path d="M 74 -684 Q 92 -656 74 -646" fill={SKIN} stroke={INK} strokeWidth={5} />
      <path d="M 42 -632 L 62 -634" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M 10 -640 Q 30 -620 50 -650" stroke={SKIN_D} strokeWidth={4} fill="none" />
      <path d="M 100 -660 Q 120 -720 80 -760" stroke={INK} strokeWidth={6} fill="none" />
      <Limb a={[70, -540]} b={[(70 + hand[0]) / 2 + 20, (-540 + hand[1]) / 2 + 40]} c={hand} w={48} col={ROBE} />
      <Hand p={hand} r={24} />
    </g>
  );
};

// fasces: a bundle of rods tied with red straps (no axe inside the city). origin = bottom end, along -y.
const Fasces: React.FC<{ len?: number }> = ({ len = 420 }) => (
  <g>
    <rect x={-30} y={-len} width={60} height={len} rx={14} fill="#B98A50" stroke={INK} strokeWidth={6} />
    {[-14, 0, 14].map((dx) => <path key={dx} d={`M ${dx} ${-len + 10} L ${dx} -10`} stroke="#8E6A3A" strokeWidth={4} />)}
    {[0.15, 0.4, 0.65, 0.88].map((t) => <path key={t} d={`M -34 ${-len * t} L 34 ${-len * t - 26}`} stroke={WOOL_R} strokeWidth={12} />)}
  </g>
);

// the lictor (her bodyguard) in a toga, fasces on his shoulder. Origin = feet, facing right.
const Lictor: React.FC<{ x: number; y: number; s?: number; f: number; off?: number }> = ({ x, y, s = 1, f, off = 0 }) => {
  const g = f + off * 30;
  const step = Math.sin(g / 5);
  const bob = -Math.abs(Math.sin(g / 5)) * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${s})`}>
      <ellipse cx={0} cy={6} rx={150} ry={20} fill="#000" opacity={0.2} />
      <Limb a={[-20, -300]} b={[-30 - step * 20, -150]} c={[-40 - step * 50, -20]} w={44} col={SKIN} />
      <Limb a={[20, -300]} b={[30 + step * 20, -150]} c={[40 + step * 50, -20]} w={44} col={SKIN} />
      {[-40 - step * 50, 40 + step * 50].map((fx, k) => <ellipse key={k} cx={fx + 14} cy={-14} rx={36} ry={13} fill="#6B4A2E" stroke={INK} strokeWidth={4} />)}
      <g transform={`translate(0 ${bob})`}>
        <path d="M -80 -560 Q -110 -420 -96 -240 L 96 -240 Q 110 -420 84 -560 Q 0 -586 -80 -560 Z" fill={ROBE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -80 -560 Q 20 -440 90 -280" stroke={ROBE_D} strokeWidth={8} fill="none" />
        <g transform="translate(-40 -470) rotate(-28)"><Fasces len={460} /></g>
        <Limb a={[-60, -530]} b={[-40, -440]} c={[-10, -470]} w={40} col={ROBE} />
        <Hand p={[-10, -470]} r={20} />
        <rect x={-6} y={-616} width={38} height={50} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={14} cy={-660} r={54} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -40 -660 Q -44 -722 14 -720 Q 64 -720 66 -684 Q 30 -700 -10 -690 Q -30 -676 -40 -660 Z" fill="#2A1C14" stroke={INK} strokeWidth={4} />
        <path d="M 32 -684 L 58 -676" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={46} cy={-662} rx={5} ry={7} fill={INK} />
        <path d="M 64 -670 Q 80 -650 64 -640" fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M 36 -628 L 56 -630" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        <Limb a={[60, -530]} b={[90, -420]} c={[80 + step * 30, -330]} w={40} col={ROBE} />
        <Hand p={[80 + step * 30, -330]} r={20} />
      </g>
    </g>
  );
};

// the condemned man on his way to execution: rough brown tunic, wrists roped in front; free = 0..1 (rope snaps, arms up).
// Origin = feet, facing right (mirror with facing -1).
const Prisoner: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; free?: number }> = ({ x, y, s = 1, f, facing = 1, free = 0 }) => {
  const shake = free > 0 ? 0 : Math.sin(f / 3) * 3;
  const Hf: P = [lerp(70, 130, free), lerp(-330, -640, free) + Math.sin(f / 3) * 10 * free];
  const Hb: P = [lerp(40, -110, free), lerp(-336, -640, free) + Math.cos(f / 3) * 10 * free];
  return (
    <g transform={`translate(${x + shake} ${y - free * Math.abs(Math.sin(f / 4)) * 30}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={6} rx={130} ry={18} fill="#000" opacity={0.2} />
      <Limb a={[-24, -260]} b={[-30, -140]} c={[-40, -18]} w={40} col={SKIN} />
      <Limb a={[24, -260]} b={[30, -140]} c={[40, -18]} w={40} col={SKIN} />
      <Limb a={[-50, -500]} b={[lerp(-40, -110, free), lerp(-400, -560, free)]} c={Hb} w={36} col={SKIN} />
      <path d="M -70 -520 Q 0 -540 72 -520 L 92 -230 Q 0 -210 -92 -230 Z" fill="#8A6A45" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -86 -300 L 88 -300" stroke="#5E4428" strokeWidth={12} />
      <path d="M -40 -500 L -20 -260 M 30 -500 L 50 -250" stroke="#6E5234" strokeWidth={5} />
      <rect x={-6} y={-576} width={38} height={50} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <g transform="translate(14 -616)">
        <circle cx={0} cy={0} r={54} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -52 -6 Q -56 -62 4 -62 Q 50 -60 54 -26 Q 20 -40 -16 -30 Q -36 -20 -52 -6 Z" fill="#3A2A1C" stroke={INK} strokeWidth={4} />
        {[[0, 30], [14, 36], [-10, 38], [26, 38]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={2.4} fill="#5A4A3A" />)}
        <path d={free > 0.5 ? "M 22 -22 Q 34 -32 48 -22" : "M 20 -24 L 48 -14"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <ellipse cx={36} cy={-6} rx={6} ry={free > 0.5 ? 9 : 6} fill={INK} />
        <path d="M 50 -12 Q 68 6 50 14" fill={SKIN} stroke={INK} strokeWidth={5} />
        {free > 0.5 ? <path d="M 18 24 Q 36 46 54 22" stroke={INK} strokeWidth={5} fill="#5A1E1A" /> : <path d="M 22 32 Q 36 24 50 32" stroke={INK} strokeWidth={5} fill="none" />}
        {free < 0.5 ? <path d="M 56 0 q 6 14 0 22 q -8 -8 0 -22 Z" fill="#BFE3EA" stroke={INK} strokeWidth={3} /> : null}
      </g>
      <Limb a={[50, -500]} b={[lerp(110, 150, free), lerp(-420, -560, free)]} c={Hf} w={36} col={SKIN} />
      <Hand p={Hf} r={20} />
      <Hand p={Hb} r={20} />
      {/* the rope around the wrists, flying apart when she frees him */}
      {free < 0.05 ? (
        <g>
          <ellipse cx={56} cy={-334} rx={48} ry={22} fill="none" stroke="#C9A060" strokeWidth={12} />
          <path d="M 56 -316 Q -20 -250 -105 -300" stroke="#C9A060" strokeWidth={10} fill="none" />
        </g>
      ) : (
        <g opacity={1 - free * 0.6}>
          <path d={`M ${20 - free * 120} ${-330 + free * 260} q 30 -30 60 0`} stroke="#C9A060" strokeWidth={12} fill="none" />
          <path d={`M ${100 + free * 160} ${-330 + free * 240} q 30 30 60 0`} stroke="#C9A060" strokeWidth={12} fill="none" />
        </g>
      )}
    </g>
  );
};

// a Roman guard escorting the prisoner: red tunic, bronze helmet with a crest, holding the rope. Origin = feet, facing right.
const Guard: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; shock?: number }> = ({ x, y, s = 1, f, facing = 1, shock = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
    <ellipse cx={0} cy={6} rx={140} ry={18} fill="#000" opacity={0.2} />
    <Limb a={[-24, -260]} b={[-30, -140]} c={[-40, -18]} w={42} col={SKIN} />
    <Limb a={[24, -260]} b={[30, -140]} c={[40, -18]} w={42} col={SKIN} />
    {[-40, 40].map((fx) => <ellipse key={fx} cx={fx + 14} cy={-12} rx={36} ry={13} fill="#5A3A20" stroke={INK} strokeWidth={4} />)}
    <path d="M 160 -40 L 120 -780" stroke={INK} strokeWidth={16} />
    <path d="M 160 -40 L 120 -780" stroke={WOOD} strokeWidth={8} />
    <path d="M 108 -780 L 120 -850 L 134 -780 Z" fill="#C9CED6" stroke={INK} strokeWidth={4} />
    <path d="M -74 -530 Q 0 -552 76 -530 L 96 -230 Q 0 -212 -96 -230 Z" fill={C.brick} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -70 -520 Q 0 -540 72 -520 L 76 -390 Q 0 -372 -74 -390 Z" fill="#B9A06A" stroke={INK} strokeWidth={5} />
    {[-470, -430].map((by) => <path key={by} d={`M -72 ${by} Q 0 ${by + 14} 74 ${by}`} stroke="#8E7444" strokeWidth={5} fill="none" />)}
    <rect x={-6} y={-586} width={38} height={50} fill={SKIN_D} stroke={INK} strokeWidth={5} />
    <g transform="translate(14 -626)">
      <circle cx={0} cy={0} r={54} fill={SKIN} stroke={INK} strokeWidth={6} />
      <ellipse cx={36} cy={-4} rx={shock > 0.5 ? 9 : 6} ry={shock > 0.5 ? 11 : 7} fill={INK} />
      <path d="M 50 -12 Q 68 6 50 14" fill={SKIN} stroke={INK} strokeWidth={5} />
      {shock > 0.5 ? <ellipse cx={36} cy={30} rx={9} ry={13} fill="#5A1E1A" stroke={INK} strokeWidth={4} /> : <path d="M 24 30 L 48 30" stroke={INK} strokeWidth={5} strokeLinecap="round" />}
      <path d="M -60 6 Q -66 -66 0 -70 Q 62 -66 60 -10 L 40 -20 Q 20 -40 -20 -36 L -40 20 Z" fill={BRONZE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -40 -64 Q 0 -130 50 -66" fill={C.brick} stroke={INK} strokeWidth={5} />
      <path d="M -40 -10 L -50 40" stroke={BRONZE_D} strokeWidth={14} strokeLinecap="round" />
    </g>
    <Limb a={[60, -500]} b={[110, -420]} c={[140, -330]} w={36} col={SKIN} />
    <Hand p={[140, -330]} r={20} />
  </g>
);

// a tourist today, facing the camera (bust), phone up. Origin = bottom centre.
const Tourist: React.FC<{ x: number; y: number; s?: number; f: number; shirt: string; skin?: string; hair?: string; cap?: string; shades?: boolean; off?: number; selfie?: boolean }> = ({ x, y, s = 1, f, shirt, skin = SKIN, hair = HAIR, cap, shades = false, off = 0, selfie = false }) => {
  const g = f + off * 20;
  const flash = (Math.floor(g / 14) % 3 === 0) && g % 14 < 3;
  return (
    <g transform={`translate(${x} ${y + Math.sin(g / 14) * 4}) scale(${s})`}>
      <path d="M -170 0 Q -170 -230 -60 -250 L 60 -250 Q 170 -230 170 0 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -250 Q 0 -220 40 -250" stroke={INK} strokeWidth={6} fill="none" />
      <path d="M -120 -220 L -110 -40 M 120 -220 L 110 -40" stroke="#2A2E3A" strokeWidth={16} />
      <rect x={-30} y={-290} width={60} height={46} fill={skin} stroke={INK} strokeWidth={5} />
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
        {shades ? (
          <g>
            <rect x={-62} y={-14} width={50} height={30} rx={10} fill={INK} />
            <rect x={12} y={-14} width={50} height={30} rx={10} fill={INK} />
            <path d="M -12 -2 L 12 -2" stroke={INK} strokeWidth={5} />
          </g>
        ) : (
          <path d="M -48 -4 Q -34 -16 -20 -4 M 20 -4 Q 34 -16 48 -4" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        <circle cx={-52} cy={30} r={14} fill={CHEEK} opacity={0.6} />
        <circle cx={52} cy={30} r={14} fill={CHEEK} opacity={0.6} />
        <path d="M -30 40 Q 0 70 30 40" stroke={INK} strokeWidth={6} fill="#FFFFFF" />
      </g>
      {/* arm up holding a phone */}
      <path d={selfie ? "M 140 -150 Q 230 -300 210 -470" : "M -140 -150 Q -120 -330 -40 -420"} stroke={INK} strokeWidth={60} fill="none" strokeLinecap="round" />
      <path d={selfie ? "M 140 -150 Q 230 -300 210 -470" : "M -140 -150 Q -120 -330 -40 -420"} stroke={shirt} strokeWidth={46} fill="none" strokeLinecap="round" />
      <g transform={selfie ? "translate(210 -520) rotate(-8)" : "translate(-20 -470) rotate(10)"}>
        <rect x={-40} y={-70} width={80} height={140} rx={14} fill="#22252E" stroke={INK} strokeWidth={6} />
        <rect x={-30} y={-58} width={60} height={110} rx={6} fill={selfie ? "#2A2E3A" : "#8FD0F0"} />
        {flash ? <circle cx={0} cy={0} r={80} fill="#FFFFFF" opacity={0.85} /> : null}
      </g>
      <circle cx={selfie ? 210 : -30} cy={selfie ? -450 : -420} r={30} fill={skin} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// ---------- fire ----------
const flamePath = (w: number, h: number, f: number, seed: number, n: number) => {
  let d = `M ${-w / 2} 0`;
  for (let k = 0; k < n; k++) {
    const x0 = -w / 2 + (k / n) * w;
    const x1 = -w / 2 + ((k + 1) / n) * w;
    const mid = (x0 + x1) / 2;
    const center = 1 - Math.abs(mid) / (w / 2);
    const th = h * (0.32 + 0.68 * center) * (0.8 + 0.2 * Math.sin(f / 2.3 + k * 1.7 + seed));
    const sway = Math.sin(f / 4 + k + seed) * w * 0.05;
    d += ` Q ${x0 + (mid - x0) * 0.1} ${-th * 0.55} ${mid + sway} ${-th} Q ${x1 - (x1 - mid) * 0.1} ${-th * 0.55} ${x1} ${-h * 0.14 * center}`;
  }
  d += ` Q ${w / 2} ${h * 0.12} 0 ${h * 0.14} Q ${-w / 2} ${h * 0.12} ${-w / 2} 0 Z`;
  return d;
};

// the sacred fire. origin = base centre. level 0..1 (0 = dead embers + smoke)
const Fire: React.FC<{ x: number; y: number; w?: number; h?: number; f: number; level?: number }> = ({ x, y, w = 300, h = 460, f, level = 1 }) => {
  const L = Math.max(0, level);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-h * 0.4} r={w * 1.5} fill="url(#ep056glow)" opacity={0.25 + 0.75 * L} />
      {L > 0.02 ? (
        <g>
          <path d={flamePath(w, h * L, f, 0, 5)} fill="#E2552A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d={flamePath(w * 0.74, h * 0.78 * L, f + 5, 2, 4)} fill="#F59A2E" />
          <path d={flamePath(w * 0.46, h * 0.52 * L, f + 9, 4, 3)} fill="#FFE07A" />
          {new Array(9).fill(0).map((_, k) => {
            const age = ((f * 1.3 + k * 11) % 40) / 40;
            return <circle key={k} cx={Math.sin(k * 2.1 + f / 9) * w * 0.4 + (random(`em${k}`) - 0.5) * 60} cy={-h * L * (0.6 + age * 1.1)} r={6 * (1 - age) + 2} fill="#FFD27A" opacity={(1 - age) * L} />;
          })}
        </g>
      ) : null}
      {/* embers in the bowl */}
      {new Array(7).fill(0).map((_, k) => <ellipse key={k} cx={-w * 0.36 + k * w * 0.12} cy={-8 - (k % 2) * 10} rx={26} ry={12} fill={k % 2 ? "#C2421E" : "#FF8A3A"} stroke={INK} strokeWidth={3} opacity={0.6 + 0.4 * Math.sin(f / 3 + k)} />)}
      {/* smoke when the fire is low */}
      {L < 0.6
        ? new Array(5).fill(0).map((_, k) => {
            const age = ((f + k * 9) % 45) / 45;
            return <circle key={k} cx={Math.sin(age * 5 + k) * 40} cy={-40 - age * 520} r={30 + age * 70} fill="#8C8478" opacity={(1 - age) * 0.55 * (1 - L / 0.6)} />;
          })
        : null}
    </g>
  );
};

// round stone hearth-altar with a bronze bowl. origin = centre of the top rim.
const Hearth: React.FC<{ x: number; y: number; s?: number; f: number; level?: number }> = ({ x, y, s = 1, f, level = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={300} rx={240} ry={40} fill="#000" opacity={0.25} />
    <path d="M -200 0 L -200 280 Q 0 330 200 280 L 200 0 Z" fill={STONE} stroke={INK} strokeWidth={7} />
    <path d="M -200 60 Q 0 104 200 60 M -200 230 Q 0 276 200 230" stroke={STONE_D} strokeWidth={12} fill="none" />
    {[-120, -40, 40, 120].map((gx) => <path key={gx} d={`M ${gx} 80 L ${gx * 1.02} 236`} stroke={STONE_D} strokeWidth={5} opacity={0.6} />)}
    <path d="M -150 140 Q 0 176 150 140" stroke={GOLD_D} strokeWidth={10} fill="none" strokeDasharray="20 16" />
    <ellipse cx={0} cy={0} rx={224} ry={50} fill={STONE} stroke={INK} strokeWidth={7} />
    <path d="M -190 -6 Q -170 -70 0 -76 Q 170 -70 190 -6 Q 0 40 -190 -6 Z" fill={BRONZE} stroke={INK} strokeWidth={6} />
    <Fire x={0} y={-20} f={f} level={level} />
    <path d="M -190 -6 Q 0 40 190 -6" stroke={BRONZE_D} strokeWidth={10} fill="none" />
  </g>
);

// ---------- scenery ----------
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep056warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3A2020" />
      <stop offset="40%" stopColor="#7A3A26" />
      <stop offset="100%" stopColor="#C46A3A" />
    </linearGradient>
    <linearGradient id="ep056dawn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#6FA9D6" />
      <stop offset="60%" stopColor="#F2C79A" />
      <stop offset="100%" stopColor="#F7D9A8" />
    </linearGradient>
    <linearGradient id="ep056day" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4F9AD8" />
      <stop offset="100%" stopColor="#BFE0F2" />
    </linearGradient>
    <linearGradient id="ep056night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#141633" />
      <stop offset="70%" stopColor="#33305E" />
      <stop offset="100%" stopColor="#6A4A5E" />
    </linearGradient>
    <radialGradient id="ep056glow">
      <stop offset="0%" stopColor="#FFE7A0" stopOpacity={0.9} />
      <stop offset="100%" stopColor="#FFB060" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep056rim" cx="0.85" cy="0.4" r="0.7">
      <stop offset="0%" stopColor="#FFC870" stopOpacity={0.55} />
      <stop offset="100%" stopColor="#FFC870" stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep056shaft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFF2C8" stopOpacity={0.5} />
      <stop offset="100%" stopColor="#FFF2C8" stopOpacity={0} />
    </linearGradient>
  </defs>
);

// inside the round temple: curved Pompeian-red wall, pilasters, smoke vent in the roof with a light shaft, round marble floor.
const TempleInside: React.FC<{ f: number; dark?: number }> = ({ f, dark = 0 }) => {
  const angles = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
  const px = (a: number) => 540 + 640 * Math.sin(rad(a));
  const top = (a: number) => 560 + 90 * Math.cos(rad(a));
  const bot = (a: number) => 1520 - 150 * Math.cos(rad(a));
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep056warm)" />
      {/* roof + smoke vent */}
      <path d="M -40 640 Q 540 120 1120 640 L 1120 0 L -40 0 Z" fill="#2A1A16" />
      <ellipse cx={540} cy={250} rx={110} ry={40} fill="#F7E0A8" stroke={INK} strokeWidth={6} opacity={0.9} />
      <path d="M 450 250 L 630 250 L 900 1500 L 300 1500 Z" fill="url(#ep056shaft)" opacity={0.5 * (1 - dark)} />
      {/* wall panels */}
      {angles.slice(0, -1).map((a, i) => {
        const b = angles[i + 1];
        return (
          <path key={a} d={`M ${px(a)} ${top(a)} L ${px(b)} ${top(b)} L ${px(b)} ${bot(b)} L ${px(a)} ${bot(a)} Z`} fill={i % 2 ? "#A8382A" : "#C9762E"} stroke={INK} strokeWidth={5} />
        );
      })}
      {angles.slice(0, -1).map((a, i) => {
        const b = angles[i + 1];
        const m = (a + b) / 2;
        const cx = px(m);
        const w = Math.abs(px(b) - px(a)) * 0.5;
        return <rect key={`p${a}`} x={cx - w / 2} y={top(m) + 120} width={w} height={bot(m) - top(m) - 260} fill="none" stroke={i % 2 ? "#E0A63A" : "#7E2E22"} strokeWidth={6} />;
      })}
      {angles.map((a) => {
        const w = 56 * Math.cos(rad(a)) + 14;
        return (
          <g key={`c${a}`}>
            <rect x={px(a) - w / 2} y={top(a) - 10} width={w} height={bot(a) - top(a) + 10} fill={MARBLE} stroke={INK} strokeWidth={5} />
            <rect x={px(a) - w / 2 - 8} y={top(a) - 30} width={w + 16} height={30} fill={MARBLE_D} stroke={INK} strokeWidth={4} />
          </g>
        );
      })}
      <path d={`M ${px(-80)} ${top(-80) - 30} ${angles.map((a) => `L ${px(a)} ${top(a) - 30}`).join(" ")}`} stroke={GOLDL} strokeWidth={14} fill="none" />
      {/* floor */}
      <path d={`M -40 1600 ${angles.map((a) => `L ${px(a)} ${bot(a)}`).join(" ")} L 1120 1600 L 1120 1920 L -40 1920 Z`} fill="#D9B48A" stroke={INK} strokeWidth={6} />
      <ellipse cx={540} cy={1720} rx={640} ry={200} fill="none" stroke="#B88E62" strokeWidth={10} />
      <ellipse cx={540} cy={1720} rx={420} ry={130} fill="none" stroke="#B88E62" strokeWidth={8} />
      {/* rising smoke to the vent */}
      {new Array(4).fill(0).map((_, k) => {
        const age = ((f + k * 15) % 60) / 60;
        return <circle key={k} cx={760 - age * 220 + Math.sin(age * 6 + k) * 30} cy={900 - age * 620} r={40 + age * 60} fill="#E9D9C0" opacity={(1 - age) * 0.18} />;
      })}
      {dark > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#0E0A1E" opacity={dark * 0.55} /> : null}
    </g>
  );
};

// the round Temple of Vesta (outside): ring of columns on a round podium, conical roof with a smoke vent.
// origin = front-bottom centre of the podium. ruin: only the three rebuilt columns + a scrap of entablature remain.
const RoundTemple: React.FC<{ x: number; y: number; s?: number; f: number; ruin?: boolean }> = ({ x, y, s = 1, f, ruin = false }) => {
  const R = 300;
  const colTop = -620;
  const base = -150;
  const angs = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
  const cx = (a: number) => R * Math.sin(rad(a));
  const cy = (a: number) => base - 30 * Math.cos(rad(a));
  const keep = ruin ? [-20, 0, 20] : angs;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* podium */}
      <path d={`M ${-R - 40} -190 Q 0 -150 ${R + 40} -190 L ${R + 40} -20 Q 0 20 ${-R - 40} -20 Z`} fill={ruin ? "#B9A890" : STONE} stroke={INK} strokeWidth={7} />
      <path d={`M ${-R - 40} -190 Q 0 -230 ${R + 40} -190 Q 0 -150 ${-R - 40} -190 Z`} fill={ruin ? "#C9B89E" : "#DCC6A0"} stroke={INK} strokeWidth={6} />
      {!ruin ? (
        <g>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-110 + k * 6} y={-150 + k * 34} width={220 - k * 12 + k * 24} height={34} fill={k % 2 ? STONE_D : STONE} stroke={INK} strokeWidth={4} transform={`translate(${-k * 6} 0)`} />)}
          {/* cella wall + door */}
          <rect x={-R + 40} y={colTop + 40} width={(R - 40) * 2} height={base - colTop - 30} fill="#EDE0C4" stroke={INK} strokeWidth={6} />
          <path d={`M -70 ${base - 10} L -70 ${colTop + 170} Q 0 ${colTop + 120} 70 ${colTop + 170} L 70 ${base - 10} Z`} fill={BRONZE} stroke={INK} strokeWidth={6} />
          <path d={`M 0 ${colTop + 140} L 0 ${base - 10}`} stroke={BRONZE_D} strokeWidth={6} />
          <rect x={-70} y={base - 140} width={140} height={130} fill="#FFD27A" opacity={0.25 + 0.15 * Math.sin(f / 4)} />
        </g>
      ) : null}
      {/* columns (back ones first) */}
      {keep.map((a) => {
        const w = 44 * (0.55 + 0.45 * Math.cos(rad(a)));
        return (
          <g key={a}>
            <rect x={cx(a) - w / 2} y={colTop} width={w} height={cy(a) - colTop} fill={MARBLE} stroke={INK} strokeWidth={5} />
            <path d={`M ${cx(a) - w / 6} ${colTop + 20} L ${cx(a) - w / 6} ${cy(a) - 10} M ${cx(a) + w / 6} ${colTop + 20} L ${cx(a) + w / 6} ${cy(a) - 10}`} stroke={MARBLE_D} strokeWidth={4} />
            <rect x={cx(a) - w / 2 - 10} y={colTop - 30} width={w + 20} height={34} rx={8} fill={MARBLE_D} stroke={INK} strokeWidth={4} />
            <rect x={cx(a) - w / 2 - 8} y={cy(a) - 14} width={w + 16} height={18} fill={MARBLE_D} stroke={INK} strokeWidth={4} />
          </g>
        );
      })}
      {/* entablature + roof */}
      {ruin ? (
        <path d={`M ${cx(-26)} ${colTop - 30} L ${cx(26)} ${colTop - 30} L ${cx(22)} ${colTop - 110} L ${cx(-6)} ${colTop - 100} L ${cx(-24)} ${colTop - 120} Z`} fill={MARBLE_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <g>
          <path d={`M ${-R - 30} ${colTop - 30} Q 0 ${colTop + 10} ${R + 30} ${colTop - 30} L ${R + 30} ${colTop - 110} Q 0 ${colTop - 70} ${-R - 30} ${colTop - 110} Z`} fill={MARBLE_D} stroke={INK} strokeWidth={6} />
          <path d={`M ${-R - 30} ${colTop - 70} Q 0 ${colTop - 30} ${R + 30} ${colTop - 70}`} stroke={GOLDL} strokeWidth={8} fill="none" />
          <path d={`M ${-R - 50} ${colTop - 110} Q 0 ${colTop - 70} ${R + 50} ${colTop - 110} L 50 ${colTop - 330} L -50 ${colTop - 330} Z`} fill={BRONZE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {[-200, -100, 0, 100, 200].map((rx) => <path key={rx} d={`M ${rx} ${colTop - 90 + Math.abs(rx) * -0.05} L ${rx * 0.22} ${colTop - 320}`} stroke={BRONZE_D} strokeWidth={5} />)}
          {new Array(4).fill(0).map((_, k) => {
            const age = ((f + k * 12) % 48) / 48;
            return <circle key={k} cx={Math.sin(age * 5 + k) * 30 + age * 40} cy={colTop - 340 - age * 260} r={26 + age * 50} fill="#EDE6DA" opacity={(1 - age) * 0.6} />;
          })}
        </g>
      )}
    </g>
  );
};

// marble statue of a Vestal on an inscribed pedestal (as in the House of the Vestals). origin = pedestal bottom centre.
const Statue: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; headless?: boolean }> = ({ x, y, s = 1, f, facing = 1, headless = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-380} width={260} height={380} fill={MARBLE_D} stroke={INK} strokeWidth={7} />
    <rect x={-150} y={-410} width={300} height={40} fill={MARBLE} stroke={INK} strokeWidth={6} />
    <rect x={-150} y={-30} width={300} height={30} fill={MARBLE} stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M -90 ${-330 + k * 50} L ${80 - (k % 2) * 30} ${-330 + k * 50}`} stroke={MARBLE_S} strokeWidth={10} strokeLinecap="round" />)}
    <g transform="translate(0 -410)">
      <Vestal x={0} y={0} s={0.62} f={f} pose="calm" marble facing={facing} />
      {headless ? <rect x={-60} y={-520} width={120} height={150} fill="url(#ep056day)" /> : null}
    </g>
  </g>
);

// red ink stamp, origin = centre
const Stamp: React.FC<{ x: number; y: number; text: string; p: number; w?: number }> = ({ x, y, text, p, w = 600 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(-9) scale(${lerp(2.2, 1, p)})`} opacity={Math.min(1, p * 1.6)}>
      <rect x={-w / 2} y={-100} width={w} height={200} rx={20} fill="#FFF3E0" opacity={0.85} stroke={C.brick} strokeWidth={16} />
      <rect x={-w / 2 + 24} y={-78} width={w - 48} height={156} rx={12} fill="none" stroke={C.brick} strokeWidth={5} />
      <text x={0} y={44} textAnchor="middle" fontFamily={titleFont} fontSize={124} fill={C.brick}>{text}</text>
    </g>
  ) : null;

const Burst: React.FC<{ x: number; y: number; s?: number; col?: string; f: number }> = ({ x, y, s = 1, col = "#FFE08A", f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${f * 2})`}>
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${Math.cos(rad(k * 30)) * 40} ${Math.sin(rad(k * 30)) * 40} L ${Math.cos(rad(k * 30)) * 120} ${Math.sin(rad(k * 30)) * 120}`} stroke={col} strokeWidth={10} strokeLinecap="round" />
    ))}
    <circle r={26} fill="#FFFFFF" />
  </g>
);

const Sun: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 90 }) => (
  <g>
    <circle cx={x} cy={y} r={r * 2.6} fill="url(#ep056glow)" opacity={0.6} />
    <circle cx={x} cy={y} r={r} fill="#FFE08A" stroke="#F2B544" strokeWidth={6} />
  </g>
);

const Cloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.9}>
    <ellipse cx={0} cy={0} rx={150} ry={46} fill="#FFFFFF" />
    <ellipse cx={-60} cy={-24} rx={70} ry={50} fill="#FFFFFF" />
    <ellipse cx={50} cy={-34} rx={80} ry={60} fill="#FFFFFF" />
  </g>
);

// Roman street: colonnaded fronts, a temple pediment, basalt paving. scroll moves the buildings left.
const Street: React.FC<{ f: number; scroll?: number; ground?: number }> = ({ f, scroll = 0, ground = 1380 }) => (
  <g>
    <rect x={0} y={0} width={1080} height={ground} fill="url(#ep056dawn)" />
    <Cloud x={(300 - f * 0.4) % 1300} y={420} s={1.1} />
    <Cloud x={(900 - f * 0.3) % 1300} y={560} s={0.8} />
    <g transform={`translate(${-(scroll % 900)} 0)`}>
      {[0, 900].map((ox) => (
        <g key={ox} transform={`translate(${ox} 0)`}>
          <rect x={0} y={ground - 560} width={420} height={560} fill="#E8C99A" stroke={INK} strokeWidth={6} />
          <rect x={0} y={ground - 600} width={420} height={50} fill={BRICK} stroke={INK} strokeWidth={5} />
          {[50, 150, 250, 350].map((wx) => <rect key={wx} x={wx} y={ground - 500} width={50} height={80} fill="#5A3A28" stroke={INK} strokeWidth={4} />)}
          {[30, 130, 230, 330].map((wx) => <path key={wx} d={`M ${wx} ${ground} L ${wx} ${ground - 300} Q ${wx + 50} ${ground - 360} ${wx + 100} ${ground - 300} L ${wx + 100} ${ground}`} fill="#7A4A2E" stroke={INK} strokeWidth={5} />)}
          <path d={`M 470 ${ground - 640} L 690 ${ground - 780} L 910 ${ground - 640} Z`} fill={MARBLE_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <rect x={470} y={ground - 640} width={440} height={40} fill={MARBLE} stroke={INK} strokeWidth={5} />
          <rect x={470} y={ground - 600} width={440} height={600} fill="#EDE0C4" stroke={INK} strokeWidth={5} />
          {[490, 590, 690, 790].map((cx2) => <rect key={cx2} x={cx2} y={ground - 600} width={44} height={600} fill={MARBLE} stroke={INK} strokeWidth={4} />)}
        </g>
      ))}
    </g>
    <rect x={0} y={ground} width={1080} height={1920 - ground} fill="#5E5A58" />
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={8} />
    {new Array(7).fill(0).map((_, r) =>
      new Array(8).fill(0).map((__, k) => {
        const w = 150 + r * 8;
        const xx = ((k * w - (r % 2) * w * 0.5 - scroll * 1.3) % (8 * w) + 8 * w) % (8 * w) - w;
        return <path key={`${r}-${k}`} d={`M ${xx} ${ground + 20 + r * 76} l ${w * 0.45} -14 l ${w * 0.45} 14 l -12 60 l ${-w * 0.8} 6 Z`} fill={(r + k) % 3 ? "#4A4648" : "#6A6466"} stroke={INK} strokeWidth={3} />;
      }),
    )}
  </g>
);

// the long courtyard of the House of the Vestals in perspective, with its pools.
// ruin = today: low broken brick walls, grass, statues on pedestals; else = ancient two-storey colonnades.
const Atrium: React.FC<{ f: number; ruin?: boolean }> = ({ f, ruin = false }) => {
  const depth = [0.95, 0.8, 0.62, 0.42, 0.2, 0.0];
  const X = (t: number, side: -1 | 1) => 540 + side * lerp(480, 150, t);
  const Yb = (t: number) => lerp(1640, 1130, t);
  const Hh = (t: number) => lerp(760, 250, t);
  const S = (t: number) => lerp(1.0, 0.36, t);
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1200} fill="url(#ep056day)" />
      <Sun x={880} y={300} r={70} />
      <Cloud x={(260 - f * 0.4 + 1300) % 1300} y={360} s={0.9} />
      {/* Palatine hill behind */}
      <path d="M -40 1160 Q 200 860 520 900 Q 820 940 1120 820 L 1120 1200 L -40 1200 Z" fill={ruin ? "#7FA35A" : "#8CAA60"} stroke={INK} strokeWidth={6} />
      {ruin ? (
        <g>
          <path d="M 640 930 L 640 760 L 760 740 L 780 900 Z M 820 900 L 840 700 L 980 690 L 1000 880 Z" fill={BRICK} stroke={INK} strokeWidth={5} />
          {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={120 + k * 70} cy={1000 - (k % 2) * 30} r={40} fill="#4E7A3A" stroke={INK} strokeWidth={4} />)}
        </g>
      ) : (
        <path d="M 600 920 L 600 760 L 1000 700 L 1000 900 Z" fill="#E8C99A" stroke={INK} strokeWidth={5} />
      )}
      {/* ground */}
      <path d="M -40 1200 L 1120 1200 L 1120 1920 L -40 1920 Z" fill={ruin ? GRASS : "#D9C4A0"} stroke={INK} strokeWidth={6} />
      {ruin ? new Array(30).fill(0).map((_, k) => <path key={k} d={`M ${random(`gr${k}`) * 1080} ${1230 + random(`gy${k}`) * 680} l 8 -22 l 8 22`} stroke={GRASS_D} strokeWidth={4} fill="none" />) : null}
      {/* pools */}
      {[[0.15, 0.45], [0.55, 0.85]].map(([t0, t1], k) => {
        const y0 = lerp(1600, 1150, t1);
        const y1 = lerp(1600, 1150, t0);
        const w0 = lerp(260, 80, t1);
        const w1 = lerp(260, 80, t0);
        return (
          <g key={k}>
            <path d={`M ${540 - w0 - 16} ${y0 - 10} L ${540 + w0 + 16} ${y0 - 10} L ${540 + w1 + 22} ${y1 + 12} L ${540 - w1 - 22} ${y1 + 12} Z`} fill={ruin ? "#B9A890" : MARBLE} stroke={INK} strokeWidth={5} />
            <path d={`M ${540 - w0} ${y0} L ${540 + w0} ${y0} L ${540 + w1} ${y1} L ${540 - w1} ${y1} Z`} fill={WATER} stroke={INK} strokeWidth={4} />
            <path d={`M ${540 - w1 * 0.5 + Math.sin(f / 9) * 20} ${(y0 + y1) / 2} l ${w1 * 0.4} 0`} stroke="#BFE3EA" strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      })}
      {/* sides, far to near */}
      {depth.map((t) =>
        ([-1, 1] as const).map((side) => {
          const x = X(t, side);
          const yb = Yb(t);
          const h = Hh(t);
          const s = S(t);
          return ruin ? (
            <g key={`${t}${side}`}>
              <path d={`M ${x + side * 60 * s} ${yb} L ${x + side * 60 * s} ${yb - h * (0.35 + 0.25 * random(`w${t}${side}`))} L ${x + side * 200 * s} ${yb - h * 0.3} L ${x + side * 200 * s} ${yb} Z`} fill={BRICK} stroke={INK} strokeWidth={4} />
              {t >= 0.15 && t <= 0.65 ? <Statue x={x} y={yb + 10 * s} s={s * 0.95} f={f} facing={side === -1 ? 1 : -1} /> : null}
            </g>
          ) : (
            <g key={`${t}${side}`}>
              <rect x={x - 18 * s} y={yb - h} width={36 * s} height={h} fill={MARBLE} stroke={INK} strokeWidth={4} />
              <rect x={x - 26 * s} y={yb - h - 16 * s} width={52 * s} height={18 * s} fill={MARBLE_D} stroke={INK} strokeWidth={3} />
              <path d={`M ${x - 18 * s} ${yb - h * 0.5} L ${x + side * 120 * s} ${yb - h * 0.5}`} stroke={MARBLE_D} strokeWidth={14 * s} />
              <rect x={x + side * 30 * s - (side === 1 ? 0 : 160 * s)} y={yb - h} width={160 * s} height={h} fill="#C9763A" opacity={0.35} />
            </g>
          );
        }),
      )}
      {!ruin ? (
        <g>
          <Vestal x={420} y={1500} s={0.42} f={f} pose="walk" off={0.2} />
          <Vestal x={690} y={1420} s={0.34} f={f} pose="walk" facing={-1} off={0.6} />
        </g>
      ) : (
        <RoundTemple x={250} y={1210} s={0.42} f={f} ruin />
      )}
    </g>
  );
};

// a shadow play behind a curtain: the high priest's shadow raises a whip (nothing else is shown)
const CurtainShadow: React.FC<{ f: number; p: number; crack: number }> = ({ f, p, crack }) => {
  const off = (1 - p) * -1100;
  const arm = interpolate(crack, [0, 1], [0, 1], clamp);
  const whip = `M 800 ${lerp(980, 720, arm)} Q ${lerp(900, 980, arm)} ${lerp(1150, 560, arm)} ${lerp(860, 900, arm)} ${lerp(1300, 400, arm)}`;
  return (
    <g transform={`translate(${off} 0)`}>
      <rect x={0} y={0} width={1080} height={1920} fill="#E9C98A" />
      <circle cx={540} cy={900} r={700} fill="url(#ep056glow)" opacity={0.8} />
      {new Array(12).fill(0).map((_, k) => <path key={k} d={`M ${k * 92 + 40} 0 Q ${k * 92 + 40 + Math.sin(f / 10 + k) * 12} 960 ${k * 92 + 40} 1920`} stroke="#C9A060" strokeWidth={14} fill="none" opacity={0.6} />)}
      <g fill="#3A2420" opacity={0.75}>
        <path d="M 520 860 Q 500 760 600 740 Q 700 750 690 860 L 740 980 Q 790 1300 800 1700 L 420 1700 Q 430 1300 480 980 Z" />
        <path d={`M 690 960 L ${lerp(760, 790, arm)} ${lerp(1180, 740, arm)}`} stroke="#3A2420" strokeWidth={56} strokeLinecap="round" />
        <path d={whip} stroke="#3A2420" strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
      <rect x={0} y={0} width={60} height={1920} fill="#B98A50" opacity={0.5} />
    </g>
  );
};

export const VestalScene: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "hearth";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let sky: "dawn" | "night" | "day" = "dawn";

  if (mode === "hearth") {
    // frame 0: the Vestal fills the frame inside the round temple, feeding a log into the roaring sacred fire
    body = (
      <>
        <TempleInside f={f} />
        <Hearth x={800} y={1330} f={f} level={1} />
        <Vestal x={330} y={1880} s={1.45} f={f} pose="feed" glow={1} />
      </>
    );
  } else if (mode === "chosen") {
    // six Vestals before the round temple → cut: the high priest takes a little girl by the hand
    const cut = (v.cutAt ?? 0.4) * dur;
    if (f < cut) {
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1460} fill="url(#ep056dawn)" />
          <Sun x={180} y={760} r={80} />
          <Cloud x={820} y={520} s={0.8} />
          <rect x={0} y={1440} width={1080} height={480} fill="#CDB89A" stroke={INK} strokeWidth={6} />
          {new Array(5).fill(0).map((_, r) => <path key={r} d={`M 0 ${1500 + r * 90} L 1080 ${1500 + r * 90}`} stroke="#B49C7E" strokeWidth={5} />)}
          <RoundTemple x={540} y={1470} s={1.12} f={f} />
          {[110, 282, 454, 626, 798, 970].map((vx, k) => (
            <Vestal key={vx} x={vx} y={1840 + (k % 2) * 30} s={0.6} f={f} pose="calm" facing={k < 3 ? 1 : -1} off={k * 0.3} />
          ))}
        </>
      );
    } else {
      const lf = f - cut;
      const chosen = popIn(lf, 6, 10);
      const PX = 290;
      const PY = 1840;
      const PS = 1.32;
      const GX = 650;
      const GS = 1.3;
      const hand: P = [200, -300];
      const hw: P = [PX + hand[0] * PS, PY + hand[1] * PS];
      const reach: P = [((hw[0] - GX) / GS) * -1, (hw[1] - PY) / GS];
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1360} fill="url(#ep056dawn)" />
          <Sun x={880} y={600} r={70} />
          <rect x={0} y={1340} width={1080} height={580} fill="#CDB89A" stroke={INK} strokeWidth={6} />
          {new Array(5).fill(0).map((_, r) => <path key={r} d={`M 0 ${1400 + r * 100} L 1080 ${1400 + r * 100}`} stroke="#B49C7E" strokeWidth={5} />)}
          <RoundTemple x={760} y={1360} s={0.62} f={f} />
          <Girl x={980} y={1740} s={0.95} f={f} tunic="#7FB2C9" facing={-1} off={0.5} />
          <Girl x={850} y={1790} s={1.05} f={f} tunic="#E29A6A" hair="#2A1C14" facing={-1} off={0.2} />
          {chosen > 0 ? <circle cx={GX} cy={PY - 300 * GS} r={300 * chosen} fill="url(#ep056glow)" opacity={0.9} /> : null}
          <Girl x={GX} y={PY} s={GS} f={f} tunic={ROBE} hair="#7A4A2A" facing={-1} reach={reach} happy />
          <Priest x={PX} y={PY} s={PS} f={f} hand={hand} />
        </>
      );
    }
  } else if (mode === "fire") {
    // the fire dies → gasp → curtain: the high priest's shadow raises a whip (CRACK!)
    const dieAt = (v.dieAt ?? 0.4) * dur;
    const curtainAt = (v.curtainAt ?? 0.66) * dur;
    const level = interpolate(f, [dieAt, dieAt + 14], [1, 0.05], clamp);
    sky = "night";
    body = (
      <>
        <TempleInside f={f} dark={1 - level * 0.6} />
        <Hearth x={800} y={1330} f={f} level={level} />
        <Vestal x={320} y={1880} s={1.4} f={f} pose={f < dieAt + 6 ? "feed" : "gasp"} glow={level} />
      </>
    );
    if (f >= curtainAt) {
      const lf = f - curtainAt;
      const p = ease(lf, 0, 7);
      const crack = ease(lf, 8, 14);
      const boom = popIn(lf, 13, 7);
      overlay = (
        <g>
          <CurtainShadow f={f} p={p} crack={crack} />
          {boom > 0 ? (
            <g transform={`translate(440 820) rotate(-10) scale(${boom})`}>
              <Burst x={0} y={-30} s={1.7} f={f} col={C.brick} />
              <text x={0} y={30} textAnchor="middle" fontFamily={titleFont} fontSize={140} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">CRACK!</text>
            </g>
          ) : null}
        </g>
      );
    }
  } else if (mode === "vip") {
    // the lictor clears the way with his fasces → cut: she passes a condemned man by chance; his rope falls away
    const cut = (v.cutAt ?? 0.5) * dur;
    if (f < cut) {
      body = (
        <>
          <Street f={f} scroll={f * 7} />
          <Vestal x={360} y={1830} s={1.3} f={f} pose="walk" />
          <Lictor x={800} y={1820} s={1.2} f={f} />
        </>
      );
    } else {
      const lf = f - cut;
      const freeAt = (v.freeAt ?? 0.5) * (dur - cut);
      const free = ease(lf, freeAt, freeAt + 10);
      const stampP = popIn(lf, freeAt + 4, 6);
      body = (
        <>
          <Street f={f} scroll={cut * 7} />
          <Vestal x={230} y={1840} s={1.25} f={f} pose="touch" />
          <Prisoner x={730} y={1800} s={1.2} f={f} facing={-1} free={free} />
          <Guard x={1010} y={1810} s={1.1} f={f} facing={-1} shock={free} />
        </>
      );
      overlay = <Stamp x={560} y={770} text="FREED!" p={stampP} w={560} />;
    }
  } else if (mode === "vault") {
    // night outside the city wall: steps lead down to a small room – a couch, a lamp, bread, a bowl of milk. A slab seals it.
    sky = "night";
    const slabAt = (v.slabAt ?? 0.55) * dur;
    const slab = ease(f, slabAt, slabAt + 10);
    const lamp = 0.85 + 0.15 * Math.sin(f / 3);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1180} fill="url(#ep056night)" />
        {new Array(30).fill(0).map((_, i) => <circle key={i} cx={random(`vs${i}`) * 1080} cy={random(`vy${i}`) * 700} r={2 + random(`vr${i}`) * 2} fill="#FFF4DC" opacity={0.6} />)}
        <circle cx={860} cy={260} r={70} fill="#F4EAD5" opacity={0.9} />
        {/* city wall with the gate */}
        <rect x={0} y={880} width={1080} height={300} fill="#6A5A50" stroke={INK} strokeWidth={6} />
        {new Array(12).fill(0).map((_, k) => <rect key={k} x={k * 96} y={850} width={56} height={40} fill="#6A5A50" stroke={INK} strokeWidth={5} />)}
        {new Array(4).fill(0).map((_, r) => <path key={r} d={`M 0 ${930 + r * 60} L 1080 ${930 + r * 60}`} stroke="#54463E" strokeWidth={4} />)}
        <path d="M 760 1180 L 760 1000 Q 840 900 920 1000 L 920 1180 Z" fill="#1A1420" stroke={INK} strokeWidth={6} />
        {/* the mound + cutaway earth */}
        <path d="M -40 1200 Q 300 1120 600 1150 Q 900 1170 1120 1210 L 1120 1920 L -40 1920 Z" fill={EARTH} stroke={INK} strokeWidth={6} />
        <path d="M -40 1200 Q 300 1120 600 1150 Q 900 1170 1120 1210" stroke={GRASS_D} strokeWidth={26} fill="none" />
        {new Array(6).fill(0).map((_, r) => <path key={r} d={`M 0 ${1300 + r * 100} Q 540 ${1280 + r * 100} 1080 ${1310 + r * 100}`} stroke={EARTH_D} strokeWidth={6} fill="none" opacity={0.7} />)}
        {/* the room */}
        <rect x={360} y={1460} width={500} height={320} fill="#5A3E2A" stroke={INK} strokeWidth={8} />
        <circle cx={640} cy={1600} r={260 * lamp} fill="url(#ep056glow)" opacity={0.85} />
        {/* steps down from the surface */}
        <path d="M 170 1160 L 300 1160 L 470 1780 L 360 1780 Z" fill="#3E2A1E" stroke={INK} strokeWidth={6} />
        {new Array(8).fill(0).map((_, k) => {
          const t = (k + 0.5) / 8;
          return <path key={k} d={`M ${lerp(170, 360, t)} ${lerp(1160, 1780, t)} L ${lerp(300, 470, t)} ${lerp(1160, 1780, t)}`} stroke={STONE} strokeWidth={14} />;
        })}
        {/* couch */}
        <rect x={680} y={1660} width={160} height={50} rx={10} fill="#E9DCC0" stroke={INK} strokeWidth={5} />
        <rect x={670} y={1700} width={180} height={26} fill={WOOD} stroke={INK} strokeWidth={5} />
        {[680, 830].map((lx) => <rect key={lx} x={lx} y={1724} width={14} height={50} fill={WOOD_D} stroke={INK} strokeWidth={3} />)}
        {/* table: bread, bowl of milk, oil jug, lamp */}
        <rect x={500} y={1690} width={150} height={18} fill={WOOD} stroke={INK} strokeWidth={4} />
        <rect x={515} y={1706} width={12} height={70} fill={WOOD_D} />
        <rect x={622} y={1706} width={12} height={70} fill={WOOD_D} />
        <ellipse cx={530} cy={1676} rx={30} ry={18} fill="#D99A4E" stroke={INK} strokeWidth={4} />
        <path d="M 572 1688 Q 590 1660 608 1688 Z" fill="#F7F2E6" stroke={INK} strokeWidth={4} />
        <path d="M 620 1690 L 616 1650 Q 630 1636 642 1650 L 638 1690 Z" fill={C.brick} stroke={INK} strokeWidth={4} />
        <g transform="translate(560 1560)">
          <rect x={-6} y={0} width={12} height={110} fill={BRONZE_D} />
          <ellipse cx={0} cy={0} rx={40} ry={14} fill={BRONZE} stroke={INK} strokeWidth={4} />
          <path d={`M 30 -6 Q ${40 + Math.sin(f / 2) * 4} -46 34 -60 Q 22 -40 30 -6 Z`} fill="#FFD27A" stroke="#F59A2E" strokeWidth={3} />
        </g>
        {/* the slab slides over the entrance; earth falls */}
        <g transform={`translate(${lerp(-360, 0, slab)} 0)`}>
          <path d="M 140 1150 L 330 1146 L 336 1182 L 134 1186 Z" fill="#8C8478" stroke={INK} strokeWidth={6} />
        </g>
        {slab >= 1
          ? new Array(10).fill(0).map((_, k) => {
              const age = Math.min(1, (f - slabAt - 10 - k * 1.5) / 14);
              return age > 0 ? <circle key={k} cx={160 + k * 18} cy={lerp(980, 1140, age)} r={10 + (k % 3) * 4} fill={EARTH} stroke={INK} strokeWidth={3} /> : null;
            })
          : null}
      </>
    );
  } else if (mode === "today") {
    // the ancient courtyard with Vestals walking → flash → today: the ruined courtyard, their statues, tourists with phones
    const answerAt = (v.answerAt ?? 0.62) * dur;
    sky = "day";
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      body = <Atrium f={f} />;
    } else {
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 7], [1, 0], clamp);
      body = (
        <>
          <Atrium f={f} ruin />
          <Tourist x={170} y={1960} s={0.95} f={f} shirt="#2E7D7A" cap="#C0392B" off={0.3} />
          <Tourist x={900} y={1960} s={0.95} f={f} shirt="#F2B544" skin="#B98260" hair="#2A1C14" shades off={0.7} />
          <Tourist x={540} y={2000} s={1.15} f={f} shirt="#E26A5A" skin="#E8B990" hair="#C98A3A" selfie />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
        {overlay}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "today" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.62) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} />
    </Backdrop>
  );
};
