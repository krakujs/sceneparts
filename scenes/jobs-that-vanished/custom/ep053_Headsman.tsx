import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep053 Headsman – a 16th-century German executioner (Frantz Schmidt's Nuremberg era): red and black parti-coloured
// clothes, the pointless two-handed execution sword (Richtschwert) on his shoulder, a sunset town square.
// visual: { mode: "square" | "crowd" | "unmask" | "night" | "ledger" | "jar", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?,
//           missAt? (crowd), unmaskAt?, shunAt? (unmask), answer?, answerAccent?, answerAt?, answerSize? (night),
//           countAt? (ledger), dipAt? (jar) }
// NO GORE, ever: no condemned person, no head, no blood. Only the block, the sword, the crowd. Flying veggies are
// cabbages and turnips (green/purple – nothing red that could read as blood).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const RED = "#C3362B";
const RED_D = "#8A231C";
const RED_HI = "#E25A49";
const BLK = "#26212C";
const BLK_HI = "#40394C";
const SLASH = "#F2B544";
const SKIN = "#E7B48A";
const SKIN_D = "#C98E62";
const HAIR = "#4A2C1A";
const BEARD = "#5E3820";
const STEEL = "#A3ADB8";
const STEEL_HI = "#E4EAF0";
const STEEL_D = "#6E7782";
const BRASS = "#E8B940";
const GRIP = "#3A2418";
const WOOD = "#9A6234";
const WOOD_D = "#6E4222";
const WOOD_HI = "#BC8048";
const CREAM = "#F4EAD5";
const APRON = "#EFE3C8";
const CLAY = "#C9824A";
const CLAY_D = "#9A5C30";
const GLOW = "#FFD983";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const dirOf = (a: number): P => [Math.cos(rad(a)), Math.sin(rad(a))];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: "left" | "right" }> = ({ items, f, dur, top = 330, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side ? side === "left" : i % 2 === 0;
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
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

const Glint: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) =>
  s > 0 ? (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M 0 -46 L 9 -9 L 46 0 L 9 9 L 0 46 L -9 9 L -46 0 L -9 -9 Z" fill="#FFFFFF" />
    </g>
  ) : null;

// ---------- the execution sword: origin = crossguard centre, blade along +x (flat end – it has NO point), grip along -x ----------
export const Sword: React.FC<{ glint?: number }> = ({ glint = 0 }) => (
  <g>
    <rect x={-132} y={-12} width={110} height={24} rx={10} fill={GRIP} stroke={INK} strokeWidth={5} />
    {[-118, -98, -78, -58, -40].map((gx) => <path key={gx} d={`M ${gx} -10 L ${gx + 10} 10`} stroke="#6A4630" strokeWidth={4} />)}
    <circle cx={-148} cy={0} r={24} fill={BRASS} stroke={INK} strokeWidth={6} />
    <circle cx={-154} cy={-7} r={7} fill="#FFF0B0" />
    <rect x={-16} y={-84} width={24} height={168} rx={11} fill={BRASS} stroke={INK} strokeWidth={6} />
    <path d="M 8 -31 L 566 -31 L 566 31 L 8 31 Z" fill={STEEL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 26 -2 L 430 -2" stroke={STEEL_D} strokeWidth={7} strokeLinecap="round" />
    <path d="M 22 -20 L 552 -20" stroke={STEEL_HI} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
    <Glint x={120 + glint * 400} y={-16} s={glint > 0 && glint < 1 ? Math.sin(glint * Math.PI) * 1.2 : 0} />
  </g>
);

// ---------- heads (frontal), centred on the head ----------
type Face = "stern" | "sad" | "kind" | "shock" | "shout";

const BareHead: React.FC<{ face: Face; f: number }> = ({ face, f }) => {
  const blink = Math.floor(f / 3) % 37 === 0;
  return (
    <g>
      <ellipse cx={-78} cy={6} rx={15} ry={23} fill={SKIN} stroke={INK} strokeWidth={6} />
      <ellipse cx={78} cy={6} rx={15} ry={23} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={0} r={78} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -82 0 Q -90 -88 0 -94 Q 90 -88 82 0 Q 66 -46 30 -54 Q 0 -40 -30 -54 Q -66 -46 -82 0 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -78 12 Q -76 100 0 108 Q 76 100 78 12 Q 62 44 40 46 Q 20 36 0 40 Q -20 36 -40 46 Q -62 44 -78 12 Z" fill={BEARD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* brows */}
      {face === "stern" || face === "shout" ? (
        <g stroke={INK} strokeWidth={9} strokeLinecap="round">
          <path d="M -48 -30 L -14 -20" />
          <path d="M 48 -30 L 14 -20" />
        </g>
      ) : face === "sad" ? (
        <g stroke={INK} strokeWidth={8} strokeLinecap="round">
          <path d="M -46 -22 L -14 -32" />
          <path d="M 46 -22 L 14 -32" />
        </g>
      ) : (
        <g stroke={INK} strokeWidth={8} strokeLinecap="round" fill="none">
          <path d={face === "shock" ? "M -48 -40 Q -30 -50 -12 -42" : "M -48 -30 Q -30 -38 -12 -30"} />
          <path d={face === "shock" ? "M 48 -40 Q 30 -50 12 -42" : "M 48 -30 Q 30 -38 12 -30"} />
        </g>
      )}
      {blink ? (
        <g stroke={INK} strokeWidth={6} strokeLinecap="round">
          <path d="M -40 -6 L -18 -6" />
          <path d="M 18 -6 L 40 -6" />
        </g>
      ) : (
        <g>
          <ellipse cx={-29} cy={-6} rx={face === "shock" ? 10 : 8} ry={face === "shock" ? 12 : 10} fill={INK} />
          <ellipse cx={29} cy={-6} rx={face === "shock" ? 10 : 8} ry={face === "shock" ? 12 : 10} fill={INK} />
          <circle cx={-26} cy={-9} r={2.6} fill="#FFFFFF" />
          <circle cx={32} cy={-9} r={2.6} fill="#FFFFFF" />
        </g>
      )}
      <path d="M -4 -2 Q -16 26 -2 32 Q 10 34 14 26" fill={SKIN_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {face === "shock" || face === "shout" ? (
        <ellipse cx={0} cy={66} rx={20} ry={face === "shout" ? 20 : 15} fill="#4A1A16" stroke={INK} strokeWidth={5} />
      ) : face === "kind" ? (
        <path d="M -26 58 Q 0 80 26 58" stroke={INK} strokeWidth={6} fill="#FFFFFF" strokeLinejoin="round" />
      ) : face === "sad" ? (
        <path d="M -22 70 Q 0 56 22 70" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M -22 64 L 22 64" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      )}
      <path d="M -40 54 Q -20 36 0 46 Q 20 36 40 54 Q 20 50 0 54 Q -20 50 -40 54 Z" fill={HAIR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

// the black hood of the films (the myth): pointed, two eye holes. Same centre as the head; its hem sits on the shoulders.
const Hood: React.FC<{ f: number }> = ({ f }) => {
  const glow = 0.75 + 0.25 * Math.sin(f / 5);
  return (
    <g>
      <path d="M -176 152 Q -168 24 -104 -72 Q -44 -172 0 -196 Q 44 -172 104 -72 Q 168 24 176 152 Q 0 180 -176 152 Z" fill={BLK} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -70 -140 Q -30 -90 -24 130" stroke={BLK_HI} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 80 -100 Q 110 0 120 120" stroke={BLK_HI} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} />
      {[-36, 36].map((ex) => (
        <g key={ex}>
          <ellipse cx={ex} cy={-6} rx={28} ry={18} fill="#0E0A12" stroke={INK} strokeWidth={5} />
          <ellipse cx={ex + (ex < 0 ? 4 : -4)} cy={-5} rx={8} ry={8} fill="#FFF6D8" opacity={glow} />
        </g>
      ))}
    </g>
  );
};

// ---------- the headsman, frontal. Origin = between the feet. ----------
// pose: shoulder (sword resting on his right shoulder) | raise (sword high over his head) | duck (arm up, sword down)
//       | work (no sword, apron, hands at hands[0]/hands[1])
// hood: 0 = hood on … 1 = hood flown off (undefined = no hood)
type Pose = "shoulder" | "raise" | "duck" | "work";
export const Headsman: React.FC<{ x: number; y: number; s?: number; f: number; pose?: Pose; hood?: number; face?: Face; hands?: [P, P]; glint?: number; swordAng?: number }> = ({ x, y, s = 1, f, pose = "shoulder", hood, face = "stern", hands, glint = 0, swordAng }) => {
  const breath = Math.sin(f / 11) * 4;
  const SL: P = [-134, -640 + breath];
  const SR: P = [134, -640 + breath];
  // sword placement + hands
  let C0: P = [-22, -520];
  let ang = swordAng ?? -135;
  if (pose === "raise") {
    C0 = [6, -1010];
    ang = swordAng ?? -102;
  } else if (pose === "duck") {
    C0 = [176, -520];
    ang = swordAng ?? 78;
  }
  const d = dirOf(ang);
  const along = (k: number): P => [C0[0] - d[0] * k, C0[1] - d[1] * k];
  let hL: P = along(30);
  let hR: P = along(86);
  let eL: P = [-150, -500];
  let eR: P = [168, -520];
  if (pose === "raise") {
    hL = along(30);
    hR = along(84);
    eL = [-190, -860];
    eR = [190, -840];
  } else if (pose === "duck") {
    hL = [-30, -880];
    eL = [-200, -760];
    hR = along(34);
    eR = [214, -600];
  } else if (pose === "work") {
    hL = hands ? hands[0] : [-70, -500];
    hR = hands ? hands[1] : [70, -500];
    eL = [-200, -470];
    eR = [200, -470];
  }
  const sleeveL = pose === "work" ? SKIN : RED_D;
  const sleeveR = pose === "work" ? SKIN : BLK;
  const sword = pose === "work" ? null : (
    <g transform={`translate(${C0[0]} ${C0[1]}) rotate(${ang})`}>
      <Sword glint={glint} />
    </g>
  );
  const hoodOff = hood === undefined ? 1 : hood;
  const head: P = [0, -792 + breath];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* legs: parti-coloured hose (red / black) */}
      <Limb a={[-56, -390]} b={[-62, -220]} c={[-64, -64]} w={72} col={RED} />
      <Limb a={[56, -390]} b={[62, -220]} c={[64, -64]} w={72} col={BLK} />
      <path d="M -40 -74 L -104 -74 L -136 -12 Q -138 8 -116 8 L -30 8 Q -20 -30 -40 -74 Z" fill="#2E1C12" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 40 -74 L 104 -74 L 136 -12 Q 138 8 116 8 L 30 8 Q 20 -30 40 -74 Z" fill="#2E1C12" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* skirt of the doublet */}
      <path d="M -136 -430 L 136 -430 L 178 -292 Q 0 -270 -178 -292 Z" fill={RED_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[-120, -70, -20, 30, 80, 130].map((px) => <path key={px} d={`M ${px * 0.85} -424 L ${px * 1.05} -292`} stroke={SLASH} strokeWidth={9} strokeLinecap="round" />)}
      {/* doublet: left half red, right half black, slashed with yellow */}
      <path d={`M 0 ${-686 + breath} Q -80 ${-690 + breath} -136 ${-652 + breath} L -132 -424 L 0 -424 Z`} fill={RED} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M 0 ${-686 + breath} Q 80 ${-690 + breath} 136 ${-652 + breath} L 132 -424 L 0 -424 Z`} fill={BLK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {[-96, -58].map((px) => <path key={px} d={`M ${px} ${-610 + breath} Q ${px + 6} -540 ${px + 2} -470`} stroke={SLASH} strokeWidth={12} strokeLinecap="round" fill="none" />)}
      {[58, 96].map((px) => <path key={px} d={`M ${px} ${-610 + breath} Q ${px - 6} -540 ${px - 2} -470`} stroke={RED_HI} strokeWidth={12} strokeLinecap="round" fill="none" />)}
      {[-600, -550, -500, -455].map((by) => <circle key={by} cx={0} cy={by + breath * 0.5} r={8} fill={BRASS} stroke={INK} strokeWidth={3} />)}
      <rect x={-140} y={-446} width={280} height={34} rx={8} fill="#1A1418" stroke={INK} strokeWidth={6} />
      <rect x={-26} y={-452} width={52} height={46} rx={8} fill={BRASS} stroke={INK} strokeWidth={6} />
      <path d="M 96 -412 L 150 -412 L 146 -340 Q 122 -326 100 -340 Z" fill="#6A4630" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {pose === "work" ? (
        <g>
          <path d="M -112 -600 L 112 -600 L 138 -300 Q 0 -284 -138 -300 Z" fill={APRON} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -80 -600 L -56 -690 M 80 -600 L 56 -690" stroke={APRON} strokeWidth={14} />
          <path d="M -60 -520 Q 0 -500 60 -520" stroke="#D9C9A6" strokeWidth={6} fill="none" />
        </g>
      ) : null}
      {/* neck + white collar */}
      <rect x={-32} y={-724 + breath} width={64} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <path d={`M -58 ${-684 + breath} Q 0 ${-650 + breath} 58 ${-684 + breath} L 50 ${-706 + breath} Q 0 ${-676 + breath} -50 ${-706 + breath} Z`} fill={CREAM} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {/* head (+ hood) */}
      <g transform={`translate(${head[0]} ${head[1]})`}>
        <BareHead face={face} f={f} />
        {hood !== undefined && hoodOff < 1 ? (
          <g transform={`translate(${hoodOff * 120} ${-hoodOff * 560}) rotate(${hoodOff * 38})`} opacity={interpolate(hoodOff, [0.7, 1], [1, 0], clamp)}>
            <Hood f={f} />
          </g>
        ) : null}
      </g>
      {/* his right arm (screen left) – puffed red sleeve */}
      <Limb a={SL} b={[(SL[0] + eL[0]) / 2 - 20, (SL[1] + eL[1]) / 2]} c={eL} w={78} col={RED} />
      <Limb a={eL} b={[(eL[0] + hL[0]) / 2, (eL[1] + hL[1]) / 2 + 10]} c={hL} w={50} col={sleeveL} />
      {sword}
      {/* his left arm (screen right) – black sleeve */}
      <Limb a={SR} b={[(SR[0] + eR[0]) / 2 + 20, (SR[1] + eR[1]) / 2]} c={eR} w={78} col={BLK} />
      <Limb a={eR} b={[(eR[0] + hR[0]) / 2, (eR[1] + hR[1]) / 2 + 10]} c={hR} w={50} col={sleeveR} />
      <circle cx={hL[0]} cy={hL[1]} r={27} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={hR[0]} cy={hR[1]} r={27} fill={SKIN} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// ---------- scenery: a German town square at sunset ----------
const SunsetSky: React.FC<{ h: number; f: number; sunY?: number }> = ({ h, f, sunY }) => (
  <g>
    <defs>
      <linearGradient id="ep053sunset" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2C1A48" />
        <stop offset="45%" stopColor="#8A3458" />
        <stop offset="78%" stopColor="#E8743A" />
        <stop offset="100%" stopColor="#F9C062" />
      </linearGradient>
      <radialGradient id="ep053sun">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#FFB050" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={h} fill="url(#ep053sunset)" />
    <circle cx={760} cy={sunY ?? h - 120} r={330} fill="url(#ep053sun)" />
    <circle cx={760} cy={sunY ?? h - 120} r={110} fill="#FFD27A" opacity={0.95} />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${-200 + ((f * (0.6 + k * 0.2) + k * 400) % 1500)} ${180 + k * 150} q 120 -50 240 0 q 90 -30 180 0 z`} fill="#F7A0A0" opacity={0.25} />
    ))}
  </g>
);

// a row of gabled half-timbered houses. y = ground line. night: dark plaster, glowing windows.
const Houses: React.FC<{ y: number; f: number; night?: boolean; seed: string; scale?: number; tint?: string }> = ({ y, f, night = false, seed, scale = 1, tint }) => {
  const plaster = tint ?? (night ? "#4A3E5E" : "#E9CFA0");
  const timber = night ? "#221A2A" : "#5A3420";
  const roof = night ? "#2A1E34" : "#8E3A2A";
  const ws = [0, 1, 2, 3, 4];
  return (
    <g>
      {ws.map((i) => {
        const w = 230 * scale;
        const hx = -40 + i * 225 * scale;
        const hh = (430 + random(`${seed}h${i}`) * 190) * scale;
        const top = y - hh;
        const gable = 170 * scale;
        return (
          <g key={i}>
            <path d={`M ${hx} ${y} L ${hx} ${top} L ${hx + w / 2} ${top - gable} L ${hx + w} ${top} L ${hx + w} ${y} Z`} fill={plaster} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d={`M ${hx - 14} ${top + 6} L ${hx + w / 2} ${top - gable - 16} L ${hx + w + 14} ${top + 6}`} stroke={roof} strokeWidth={30 * scale} fill="none" strokeLinejoin="round" />
            <path d={`M ${hx - 14} ${top + 6} L ${hx + w / 2} ${top - gable - 16} L ${hx + w + 14} ${top + 6}`} stroke={INK} strokeWidth={5} fill="none" strokeLinejoin="round" />
            <path d={`M ${hx} ${top + hh * 0.38} L ${hx + w} ${top + hh * 0.38} M ${hx} ${top + 8} L ${hx + w} ${top + 8} M ${hx + w / 2} ${top - gable + 20} L ${hx + w / 2} ${y} M ${hx} ${top + 8} L ${hx + w / 2} ${top + hh * 0.38} L ${hx + w} ${top + 8}`} stroke={timber} strokeWidth={9 * scale} fill="none" />
            {[0, 1].map((r) =>
              [0, 1].map((cI) => {
                const lit = night ? random(`${seed}l${i}${r}${cI}`) > 0.3 : random(`${seed}l${i}${r}${cI}`) > 0.55;
                const fl = 0.85 + 0.15 * Math.sin(f / 4 + i + r);
                return (
                  <rect key={`${r}${cI}`} x={hx + w * (0.14 + cI * 0.5)} y={top + hh * (0.08 + r * 0.42)} width={w * 0.24} height={hh * 0.17} rx={6} fill={lit ? GLOW : night ? "#1A1424" : "#6A5A7A"} opacity={lit ? fl : 1} stroke={INK} strokeWidth={4} />
                );
              }),
            )}
          </g>
        );
      })}
    </g>
  );
};

const Cobbles: React.FC<{ y0: number; seed: string; col?: string; dark?: string }> = ({ y0, seed, col = "#B49A80", dark = "#9A806A" }) => (
  <g>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={col} />
    {new Array(Math.ceil((1920 - y0) / 70)).fill(0).map((_, r) =>
      new Array(9).fill(0).map((__, k) => {
        const sc = 0.6 + (r * 70) / 1000;
        const w = 130 * sc;
        const xx = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 10;
        const yy = y0 + 10 + r * 64 * sc;
        return <rect key={`${r}-${k}`} x={xx} y={yy} width={w - 12} height={46 * sc} rx={18 * sc} fill={(r + k) % 3 ? dark : col} stroke={INK} strokeWidth={2.5} opacity={0.85} />;
      }),
    )}
  </g>
);

// wooden scaffold: top surface at y, from x0 to x1
const Scaffold: React.FC<{ x0: number; x1: number; y: number; h?: number }> = ({ x0, x1, y, h = 260 }) => (
  <g>
    {[x0 + 40, (x0 + x1) / 2, x1 - 40].map((px) => <rect key={px} x={px - 18} y={y} width={36} height={h} fill={WOOD_D} stroke={INK} strokeWidth={5} />)}
    <path d={`M ${x0 + 40} ${y + 30} L ${(x0 + x1) / 2} ${y + h - 20} M ${x1 - 40} ${y + 30} L ${(x0 + x1) / 2} ${y + h - 20}`} stroke={WOOD_D} strokeWidth={18} />
    <rect x={x0} y={y - 30} width={x1 - x0} height={60} rx={6} fill={WOOD} stroke={INK} strokeWidth={7} />
    {new Array(Math.floor((x1 - x0) / 90)).fill(0).map((_, k) => <path key={k} d={`M ${x0 + 90 * (k + 1)} ${y - 30} L ${x0 + 90 * (k + 1)} ${y + 30}`} stroke={WOOD_D} strokeWidth={4} />)}
    <path d={`M ${x0 + 10} ${y - 18} L ${x1 - 10} ${y - 18}`} stroke={WOOD_HI} strokeWidth={6} />
  </g>
);

// the wooden block (empty, always). Origin = bottom centre.
export const Block: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 L -138 -150 L 138 -150 L 150 0 Q 0 22 -150 0 Z" fill={WOOD} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -100 -140 L -104 -10 M -30 -140 L -34 8 M 60 -140 L 64 6 M 110 -140 L 116 -6" stroke={WOOD_D} strokeWidth={5} />
    <ellipse cx={0} cy={-150} rx={140} ry={40} fill={WOOD_HI} stroke={INK} strokeWidth={7} />
    <ellipse cx={0} cy={-150} rx={92} ry={25} fill="none" stroke={WOOD_D} strokeWidth={4} />
    <ellipse cx={0} cy={-150} rx={44} ry={12} fill="none" stroke={WOOD_D} strokeWidth={4} />
    <path d="M -56 -128 Q 0 -104 56 -128" stroke={INK} strokeWidth={6} fill="none" />
    {[-170, -120, 120, 160, 196].map((sx, k) => <path key={k} d={`M ${sx} 6 l ${30 - k * 8} -26`} stroke="#E8C468" strokeWidth={6} strokeLinecap="round" />)}
  </g>
);

// crowd seen from behind (silhouettes). angry 0..1 raises fists; jeer adds bounce.
const Crowd: React.FC<{ y: number; f: number; n: number; s?: number; col: string; seed: string; angry?: number; x0?: number; span?: number }> = ({ y, f, n, s = 1, col, seed, angry = 0, x0 = -40, span = 1160 }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const px = x0 + (i + 0.5) * (span / n) + (random(`${seed}x${i}`) - 0.5) * 40;
      const bob = angry > 0 ? Math.abs(Math.sin(f / 3 + i * 1.7)) * -18 * angry : Math.sin(f / 14 + i) * 3;
      const hat = Math.floor(random(`${seed}h${i}`) * 3);
      const sc = s * (0.9 + random(`${seed}s${i}`) * 0.2);
      const side = i % 2 ? 1 : -1;
      const fist: P = [side * (70 + 30 * Math.sin(f / 2.5 + i)), -170 - 120 * angry + 14 * Math.sin(f / 2 + i)];
      return (
        <g key={i} transform={`translate(${px} ${y + bob}) scale(${sc})`}>
          {angry > 0.05 ? <Limb a={[side * 50, -90]} b={[side * 90, -130]} c={fist} w={30} col={col} /> : null}
          {angry > 0.05 ? <circle cx={fist[0]} cy={fist[1]} r={22} fill={col} stroke={INK} strokeWidth={5} /> : null}
          <path d="M -92 30 Q -94 -96 -40 -118 L 40 -118 Q 94 -96 92 30 Z" fill={col} stroke={INK} strokeWidth={6} />
          <circle cx={0} cy={-160} r={50} fill={col} stroke={INK} strokeWidth={6} />
          {hat === 0 ? <path d="M -54 -176 Q 0 -238 54 -176 Z" fill={col} stroke={INK} strokeWidth={5} /> : null}
          {hat === 1 ? (
            <g>
              <ellipse cx={0} cy={-190} rx={78} ry={14} fill={col} stroke={INK} strokeWidth={5} />
              <path d="M -40 -192 Q -40 -244 0 -246 Q 40 -244 40 -192 Z" fill={col} stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
          {hat === 2 ? <path d="M -54 -150 Q -58 -222 0 -224 Q 58 -222 54 -150 L 64 -110 L -64 -110 Z" fill={col} stroke={INK} strokeWidth={5} /> : null}
        </g>
      );
    })}
  </g>
);

const Torch: React.FC<{ x: number; y: number; f: number; s?: number }> = ({ x, y, f, s = 1 }) => {
  const fl = Math.sin(f / 2) * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-330} r={170} fill={GLOW} opacity={0.18 + 0.05 * Math.sin(f / 3)} />
      <rect x={-12} y={-300} width={24} height={300} fill={WOOD_D} stroke={INK} strokeWidth={5} />
      <path d="M -26 -300 L 26 -300 L 20 -270 L -20 -270 Z" fill="#4A3020" stroke={INK} strokeWidth={5} />
      <path d={`M -30 -300 Q -40 ${-360 + fl} ${-6 + fl} ${-430 - fl} Q 10 ${-380 + fl} 30 ${-410 + fl} Q 44 -350 30 -300 Z`} fill="#F28A2E" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -14 -302 Q -16 ${-340 + fl} ${4 + fl / 2} ${-372 - fl / 2} Q 18 -336 16 -302 Z`} fill="#FFE07A" />
    </g>
  );
};

const Crow: React.FC<{ x: number; y: number; f: number; s?: number }> = ({ x, y, f, s = 1 }) => {
  const peck = Math.max(0, Math.sin(f / 9)) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -60 0 Q -40 -60 10 -60 Q 40 -60 50 -30 L 80 -10 Q 30 10 -60 0 Z" fill="#17131C" stroke={INK} strokeWidth={4} />
      <circle cx={34} cy={-70 + peck} r={24} fill="#17131C" />
      <path d={`M 54 ${-74 + peck} L 86 ${-62 + peck} L 54 ${-58 + peck} Z`} fill={SLASH} stroke={INK} strokeWidth={3} />
      <circle cx={40} cy={-76 + peck} r={5} fill="#FFFFFF" />
      <path d="M -70 -4 L -110 10 L -66 12 Z" fill="#17131C" />
      <path d="M -6 0 L -12 24 M 14 0 L 10 24" stroke={SLASH} strokeWidth={4} />
    </g>
  );
};

// cabbages and turnips flung by the crowd (never anything red)
const Veg: React.FC<{ kind: number; x: number; y: number; r: number }> = ({ kind, x, y, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    {kind === 0 ? (
      <g>
        <circle r={34} fill="#7DB85A" stroke={INK} strokeWidth={5} />
        <path d="M -20 -20 Q 0 0 -6 30 M 10 -28 Q 24 0 12 28" stroke="#4E8A3A" strokeWidth={5} fill="none" />
      </g>
    ) : (
      <g>
        <path d="M 0 -30 Q 32 -26 30 6 Q 22 34 0 44 Q -22 34 -30 6 Q -32 -26 0 -30 Z" fill="#F2ECE0" stroke={INK} strokeWidth={5} />
        <path d="M -28 -6 Q 0 -30 28 -6 Q 26 -26 0 -30 Q -26 -26 -28 -6 Z" fill="#8E5AA8" />
        <path d="M 0 -30 L -10 -56 M 0 -30 L 12 -58" stroke="#4E8A3A" strokeWidth={7} strokeLinecap="round" />
      </g>
    )}
  </g>
);

// a townsperson in profile, facing right. Origin = feet. prop: lantern | sling | bandage | cane | none
const Villager: React.FC<{ x: number; y: number; s?: number; f: number; coat: string; hat?: "cap" | "kerchief" | "brim" | "none"; skirt?: boolean; prop?: "lantern" | "sling" | "bandage" | "cane" | "none"; old?: boolean; knock?: boolean; face?: "ok" | "ouch" }> = ({ x, y, s = 1, f, coat, hat = "cap", skirt = false, prop = "none", old = false, knock = false, face = "ok" }) => {
  const sway = Math.sin(f / 9 + x) * 3;
  const kn = knock ? Math.max(0, Math.sin(f / 2.2)) * 30 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {skirt ? (
        <path d="M -60 -260 L 60 -260 L 84 0 L -84 0 Z" fill={coat} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <g>
          <rect x={-40} y={-200} width={34} height={196} rx={10} fill="#4A3A30" stroke={INK} strokeWidth={5} />
          <rect x={6} y={-200} width={34} height={196} rx={10} fill="#3A2C24" stroke={INK} strokeWidth={5} />
          <path d="M -46 -8 L 0 -8 L 4 6 L -50 6 Z M 4 -8 L 54 -8 L 58 6 L 2 6 Z" fill="#2A1A10" stroke={INK} strokeWidth={4} />
        </g>
      )}
      <path d={`M -62 ${-200} Q -70 -380 -20 -420 L 34 -420 Q 76 -380 66 ${-200} Z`} fill={coat} stroke={INK} strokeWidth={6} strokeLinejoin="round" transform={`rotate(${old ? 8 : 0} 0 -200)`} />
      <g transform={`translate(${old ? 30 : 6} ${old ? -460 : -470}) rotate(${sway})`}>
        <circle cx={0} cy={0} r={52} fill={SKIN} stroke={INK} strokeWidth={6} />
        <ellipse cx={24} cy={-6} rx={6} ry={8} fill={INK} />
        <path d="M 44 -2 Q 62 14 46 20" fill={SKIN} stroke={INK} strokeWidth={5} />
        {face === "ouch" ? <path d="M 18 30 Q 30 22 42 30" stroke={INK} strokeWidth={5} fill="none" /> : <path d="M 20 28 Q 32 36 42 28" stroke={INK} strokeWidth={5} fill="none" />}
        {old ? <path d="M -10 24 Q 10 62 44 36 Q 30 70 0 64 Q -24 56 -10 24 Z" fill="#E8E2D8" stroke={INK} strokeWidth={4} /> : null}
        {hat === "cap" ? <path d="M -56 -10 Q -52 -70 4 -66 Q 60 -60 54 -14 Q 10 -34 -56 -10 Z" fill="#5A4A6A" stroke={INK} strokeWidth={5} /> : null}
        {hat === "kerchief" ? <path d="M -60 20 Q -66 -66 4 -62 Q 60 -56 50 -16 Q 0 -30 -30 0 L -40 50 Z" fill="#E9D7B0" stroke={INK} strokeWidth={5} /> : null}
        {hat === "brim" ? (
          <g>
            <ellipse cx={0} cy={-34} rx={80} ry={14} fill="#3A2E28" stroke={INK} strokeWidth={5} />
            <path d="M -40 -36 Q -40 -88 0 -90 Q 40 -88 40 -36 Z" fill="#3A2E28" stroke={INK} strokeWidth={5} />
          </g>
        ) : null}
        {prop === "bandage" ? <path d="M -54 -16 Q 0 -40 54 -18 L 52 4 Q 0 -18 -54 6 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} /> : null}
      </g>
      {prop === "sling" ? (
        <g>
          <path d="M -30 -400 L 60 -300 L -20 -300 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <Limb a={[-10, -380]} b={[20, -330]} c={[60, -310]} w={30} col={coat} />
        </g>
      ) : null}
      {prop === "lantern" || prop === "none" || prop === "bandage" ? <Limb a={[10, -390]} b={[50, -320]} c={[82 + kn * 0.6, -300 - kn]} w={30} col={coat} /> : null}
      {prop === "lantern" ? (
        <g transform="translate(84 -290)">
          <circle cx={0} cy={40} r={80} fill={GLOW} opacity={0.3 + 0.08 * Math.sin(f / 3)} />
          <path d="M 0 0 L 0 14" stroke={INK} strokeWidth={5} />
          <rect x={-20} y={14} width={40} height={54} rx={8} fill={GLOW} stroke={INK} strokeWidth={5} />
          <path d="M -24 14 L 0 -4 L 24 14 Z" fill={INK} />
        </g>
      ) : null}
      {prop === "cane" ? (
        <g>
          <Limb a={[20, -390]} b={[60, -320]} c={[90, -260]} w={30} col={coat} />
          <path d="M 90 -260 L 110 0" stroke={WOOD_D} strokeWidth={14} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// ---------- night: his house outside the town wall ----------
const NightSky: React.FC<{ h: number; f: number }> = ({ h, f }) => (
  <g>
    <defs>
      <linearGradient id="ep053night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#141238" />
        <stop offset="65%" stopColor="#3D2A63" />
        <stop offset="100%" stopColor="#8A4A6A" />
      </linearGradient>
      <radialGradient id="ep053moon">
        <stop offset="0%" stopColor="#FFE9B0" stopOpacity={0.6} />
        <stop offset="100%" stopColor="#FFE9B0" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={h} fill="url(#ep053night)" />
    {new Array(40).fill(0).map((_, i) => (
      <circle key={i} cx={random(`n53x${i}`) * 1080} cy={random(`n53y${i}`) * h * 0.75} r={1.5 + random(`n53r${i}`) * 2.5} fill="#FFF4DC" opacity={0.4 + 0.5 * Math.abs(Math.sin(f / (9 + (i % 6) * 4) + i))} />
    ))}
    <circle cx={250} cy={700} r={230} fill="url(#ep053moon)" />
    <circle cx={250} cy={700} r={84} fill="#FFF1C9" stroke={INK} strokeWidth={5} />
    <circle cx={226} cy={684} r={14} fill="#EADBB0" />
    <circle cx={278} cy={720} r={19} fill="#EADBB0" />
  </g>
);

const TownWall: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={0} y={y - 150} width={1080} height={170} fill="#3A2C4A" stroke={INK} strokeWidth={6} />
    {new Array(14).fill(0).map((_, k) => <rect key={k} x={k * 80} y={y - 190} width={46} height={44} fill="#3A2C4A" stroke={INK} strokeWidth={5} />)}
    {[180, 620, 980].map((tx) => (
      <g key={tx}>
        <rect x={tx - 60} y={y - 330} width={120} height={350} fill="#33264A" stroke={INK} strokeWidth={6} />
        <path d={`M ${tx - 76} ${y - 326} L ${tx} ${y - 460} L ${tx + 76} ${y - 326} Z`} fill="#24182E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={tx - 14} y={y - 270} width={28} height={50} rx={14} fill={GLOW} opacity={0.7} stroke={INK} strokeWidth={4} />
      </g>
    ))}
  </g>
);

// the headsman's own house, alone outside the wall. Origin = ground centre. door: 0 closed .. 1 open (light spills out)
const HisHouse: React.FC<{ x: number; y: number; s?: number; f: number; door?: number }> = ({ x, y, s = 1, f, door = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-480} width={460} height={480} fill="#E2C38E" stroke={INK} strokeWidth={8} />
    <path d="M -230 -470 L 230 -470 M -230 -250 L 230 -250 M -230 -470 L 0 -250 L 230 -470 M -120 -250 L -120 0 M 120 -250 L 120 0" stroke="#4A2C1A" strokeWidth={12} fill="none" />
    <path d="M -270 -470 L 0 -700 L 270 -470 Z" fill="#7A2E24" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={150} y={-760} width={50} height={130} fill="#6A4A3A" stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((k) => {
      const p = ((f / 40 + k / 3) % 1);
      return <circle key={k} cx={175 + Math.sin(p * 6 + k) * 20} cy={-780 - p * 200} r={18 + p * 30} fill="#B9A9C9" opacity={0.5 * (1 - p)} />;
    })}
    <rect x={-190} y={-420} width={110} height={120} rx={8} fill={GLOW} opacity={0.85 + 0.15 * Math.sin(f / 4)} stroke={INK} strokeWidth={6} />
    <path d="M -135 -420 L -135 -300 M -190 -360 L -80 -360" stroke={INK} strokeWidth={5} />
    {/* herbs drying by the window */}
    {[-170, -130, -95].map((hx, k) => <path key={k} d={`M ${hx} -440 L ${hx} -404 M ${hx - 12} -404 L ${hx} -436 L ${hx + 12} -404`} stroke="#4E8A3A" strokeWidth={6} />)}
    <rect x={-50} y={-210} width={120} height={210} fill="#2A1A12" stroke={INK} strokeWidth={6} />
    {door > 0 ? <rect x={-50} y={-210} width={120} height={210} fill={GLOW} opacity={door} /> : null}
    <g transform={`translate(-50 0) scale(${1 - door * 0.75} 1)`}>
      <rect x={0} y={-210} width={120} height={210} fill="#6A3E22" stroke={INK} strokeWidth={6} />
      <path d="M 40 -210 L 40 0 M 80 -210 L 80 0" stroke="#4A2A14" strokeWidth={4} />
      <circle cx={100} cy={-100} r={8} fill={BRASS} stroke={INK} strokeWidth={3} />
    </g>
    {door > 0 ? <path d="M -50 0 L 70 0 L 200 160 L -200 160 Z" fill={GLOW} opacity={0.25 * door} /> : null}
  </g>
);

// warm candle-lit room: shelves of jars and herbs, his sword hung up on the wall
const Room: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs>
      <radialGradient id="ep053room" cx="0.5" cy="0.45" r="0.7">
        <stop offset="0%" stopColor="#C98A4E" />
        <stop offset="60%" stopColor="#7A4A2C" />
        <stop offset="100%" stopColor="#3A2216" />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep053room)" />
    {new Array(9).fill(0).map((_, k) => <path key={k} d={`M ${k * 130 + 40} 0 L ${k * 130 + 40} 1920`} stroke="#5A3420" strokeWidth={5} opacity={0.5} />)}
    {[560, 760].map((sy, r) => (
      <g key={sy}>
        <rect x={40} y={sy} width={1000} height={26} rx={6} fill={WOOD} stroke={INK} strokeWidth={6} />
        {new Array(7).fill(0).map((_, k) => {
          const jx = 90 + k * 140 + r * 40;
          const jh = 70 + random(`jar${r}${k}`) * 60;
          const col = ["#5A8A6A", CLAY, "#6A7AA8", "#C9A46A", "#8A5A9A"][(k + r) % 5];
          return (
            <g key={k}>
              <rect x={jx - 34} y={sy - jh} width={68} height={jh} rx={18} fill={col} stroke={INK} strokeWidth={5} />
              <rect x={jx - 22} y={sy - jh - 16} width={44} height={20} rx={5} fill="#E9D7B0" stroke={INK} strokeWidth={4} />
              <rect x={jx - 22} y={sy - jh * 0.62} width={44} height={jh * 0.3} fill={CREAM} opacity={0.85} />
            </g>
          );
        })}
      </g>
    ))}
    {[200, 470, 840].map((hx, k) => (
      <g key={k} transform={`rotate(${Math.sin(f / 20 + k) * 3} ${hx} 800)`}>
        <path d={`M ${hx} 790 L ${hx} 850`} stroke={INK} strokeWidth={4} />
        <path d={`M ${hx - 30} 940 L ${hx} 850 L ${hx + 30} 940 M ${hx} 850 L ${hx} 950`} stroke="#4E8A3A" strokeWidth={9} strokeLinecap="round" />
      </g>
    ))}
    {/* sword hung up, off duty */}
    {[260, 700].map((px) => <rect key={px} x={px - 12} y={1012} width={24} height={30} rx={6} fill={WOOD_D} stroke={INK} strokeWidth={4} />)}
    <g transform="translate(330 1000) scale(0.95)">
      <Sword glint={((f % 70) / 70)} />
    </g>
  </g>
);

// an old man on a stool, facing left, one trouser leg rolled up over a sore knee. Origin = hip.
const OldMan: React.FC<{ x: number; y: number; s?: number; f: number; relief?: number }> = ({ x, y, s = 1, f, relief = 0 }) => {
  const COAT = "#5E6A9A";
  const TR = "#5A4636";
  const TR_D = "#46362A";
  const ok = relief > 0.5;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={14} width={150} height={30} rx={8} fill={WOOD} stroke={INK} strokeWidth={5} />
      <path d="M -30 44 L -40 280 M 80 44 L 90 280" stroke={WOOD_D} strokeWidth={16} />
      <Limb a={[10, -10]} b={[-120, -16]} c={[-160, -6]} w={66} col={TR_D} />
      <Limb a={[-160, -6]} b={[-162, 120]} c={[-164, 250]} w={52} col={TR_D} />
      <path d="M -150 250 L -232 250 Q -244 272 -224 276 L -146 276 Z" fill="#2A1A10" stroke={INK} strokeWidth={5} />
      <path d={`M 40 0 Q 50 -160 30 -300 Q -10 -320 -60 -300 Q -80 -150 -50 0 Z`} fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <Limb a={[20, 10]} b={[-110, 14]} c={[-160, 20]} w={70} col={TR} />
      <rect x={-196} y={-14} width={52} height={60} rx={14} fill={TR} stroke={INK} strokeWidth={5} transform="rotate(-6 -170 16)" />
      <Limb a={[-196, 40]} b={[-200, 150]} c={[-202, 262]} w={50} col={SKIN} />
      <circle cx={-198} cy={30} r={36} fill={SKIN} stroke={INK} strokeWidth={6} />
      {!ok ? <path d="M -238 -6 l -20 -16 M -244 22 l -26 0 M -236 50 l -20 14" stroke={C.mustard} strokeWidth={7} strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(f / 2)} /> : null}
      <path d="M -186 262 L -262 262 Q -274 284 -254 288 L -180 288 Z" fill="#2A1A10" stroke={INK} strokeWidth={5} />
      <Limb a={[-20, -270]} b={[-60, -150]} c={[-100, -40]} w={44} col={COAT} />
      <circle cx={-104} cy={-34} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
      <g transform="translate(-20 -370)">
        <circle cx={0} cy={0} r={60} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M 20 -52 Q 62 -30 58 16 Q 40 -14 26 -20 Z" fill="#E8E2D8" stroke={INK} strokeWidth={4} />
        <path d="M -52 20 Q -40 80 10 72 Q 40 66 36 24 Q 10 36 -20 30 Q -40 34 -52 20 Z" fill="#E8E2D8" stroke={INK} strokeWidth={5} />
        <path d="M -58 -2 Q -78 14 -60 22" fill={SKIN} stroke={INK} strokeWidth={5} />
        {ok ? (
          <g stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round">
            <path d="M -38 -14 Q -28 -24 -18 -14" />
            <path d="M -40 34 Q -26 46 -12 36" />
          </g>
        ) : (
          <g stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round">
            <path d="M -42 -30 L -16 -22" />
            <circle cx={-30} cy={-10} r={4} fill={INK} />
            <path d="M -42 38 l 8 -6 l 8 6 l 8 -6" />
          </g>
        )}
      </g>
    </g>
  );
};

// the clay jar of "poor sinner's fat". Origin = bottom centre. lid 0..1 lifts the cloth cover off.
const FatJar: React.FC<{ x: number; y: number; s?: number; lid?: number }> = ({ x, y, s = 1, lid = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={170} ry={20} fill="#000" opacity={0.25} />
    <path d="M -120 0 Q -176 -200 -132 -384 Q -120 -424 -80 -432 L 80 -432 Q 120 -424 132 -384 Q 176 -200 120 0 Z" fill={CLAY} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -110 -380 Q -140 -200 -100 -20" stroke="#E3A26A" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.7} />
    <path d="M -140 -120 Q 0 -96 140 -120" stroke={CLAY_D} strokeWidth={6} fill="none" />
    <rect x={-100} y={-474} width={200} height={50} rx={16} fill={CLAY_D} stroke={INK} strokeWidth={7} />
    <ellipse cx={0} cy={-474} rx={86} ry={16} fill="#F1E4BE" stroke={INK} strokeWidth={4} opacity={lid} />
    <g transform="rotate(-3)">
      <rect x={-128} y={-356} width={256} height={196} rx={10} fill="#F2E6C8" stroke={INK} strokeWidth={6} />
      <text x={0} y={-304} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={INK}>POOR</text>
      <text x={0} y={-258} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={RED_D}>SINNER'S</text>
      <text x={0} y={-212} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={INK}>FAT</text>
      <text x={0} y={-176} textAnchor="middle" fontFamily={typeFont} fontSize={22} fill={INK} opacity={0.75}>ARMSÜNDERFETT</text>
    </g>
    <g transform={`translate(${-lid * 190} ${-lid * 170}) rotate(${-lid * 34} 0 -474)`} opacity={interpolate(lid, [0.8, 1], [1, 0.9], clamp)}>
      <path d="M -112 -470 Q -120 -540 0 -548 Q 120 -540 112 -470 Q 60 -450 0 -456 Q -60 -450 -112 -470 Z" fill="#D9C49C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -108 -476 Q 0 -460 108 -476" stroke="#8A5A34" strokeWidth={9} fill="none" />
    </g>
  </g>
);

// open diary/ledger with two columns. count01: left counter progress; count02: right counter progress
const Ledger: React.FC<{ f: number; c1: number; c2: number }> = ({ f, c1, c2 }) => {
  const n1 = Math.round(361 * c1);
  const n2 = Math.round((15000 * c2) / 100) * 100;
  const tallies = Math.floor(c2 * 60);
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill="#6A3E24" />
      {new Array(12).fill(0).map((_, k) => <path key={k} d={`M 0 ${120 + k * 160} Q 540 ${100 + k * 160 + (k % 2) * 30} 1080 ${130 + k * 160}`} stroke="#5A321C" strokeWidth={6} fill="none" />)}
      <circle cx={940} cy={520} r={260} fill={GLOW} opacity={0.22 + 0.05 * Math.sin(f / 3)} />
      <rect x={918} y={470} width={44} height={150} rx={6} fill="#F2E6C8" stroke={INK} strokeWidth={5} />
      <path d={`M 940 470 Q 920 ${436 + Math.sin(f / 2) * 4} 940 ${404 + Math.sin(f / 2.5) * 6} Q 960 436 940 470 Z`} fill="#FFC24A" stroke={INK} strokeWidth={4} />
      {/* book */}
      <path d="M 60 600 Q 300 560 540 610 Q 780 560 1020 600 L 1020 1250 Q 780 1210 540 1260 Q 300 1210 60 1250 Z" fill="#4A2A18" stroke={INK} strokeWidth={8} />
      <path d="M 76 590 Q 300 550 540 600 L 540 1240 Q 300 1196 76 1236 Z" fill="#F4E8CC" stroke={INK} strokeWidth={6} />
      <path d="M 1004 590 Q 780 550 540 600 L 540 1240 Q 780 1196 1004 1236 Z" fill="#F7EDD6" stroke={INK} strokeWidth={6} />
      <path d="M 540 600 L 540 1240" stroke="#C9B48A" strokeWidth={10} />
      <text x={300} y={690} textAnchor="middle" fontFamily={typeFont} fontSize={46} fill={INK}>EXECUTIONS</text>
      <text x={300} y={880} textAnchor="middle" fontFamily={titleFont} fontSize={160} fill={RED_D}>{n1}</text>
      <g transform="translate(200 990) scale(0.34)"><Sword /></g>
      {new Array(Math.min(4, Math.ceil(c1 * 4))).fill(0).map((_, k) => <path key={k} d={`M ${180 + k * 26} 1080 l 6 70`} stroke={INK} strokeWidth={7} strokeLinecap="round" />)}
      <text x={780} y={690} textAnchor="middle" fontFamily={typeFont} fontSize={46} fill={INK}>PATIENTS</text>
      <text x={780} y={748} textAnchor="middle" fontFamily={typeFont} fontSize={32} fill={INK} opacity={c2 > 0 ? 0.75 : 0}>ABOUT</text>
      <text x={780} y={880} textAnchor="middle" fontFamily={titleFont} fontSize={100} fill={C.teal} transform={`rotate(-2 780 880)`}>{n2.toLocaleString("en-US")}</text>
      {new Array(tallies).fill(0).map((_, k) => {
        const col = k % 15;
        const row = Math.floor(k / 15);
        return <path key={k} d={`M ${600 + col * 26} ${940 + row * 64} l 6 50`} stroke={INK} strokeWidth={6} strokeLinecap="round" />;
      })}
    </g>
  );
};

const Fog: React.FC<{ f: number; y: number; op?: number }> = ({ f, y, op = 0.22 }) => (
  <g>
    {[0, 1, 2, 3].map((k) => (
      <ellipse key={k} cx={((f * (1.2 + k * 0.4) + k * 340) % 1600) - 260} cy={y + k * 40} rx={420} ry={60} fill="#FFF1E0" opacity={op} />
    ))}
  </g>
);

export const HeadsmanScene: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "square";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;

  if (mode === "square") {
    // frame 0: the hooded headsman of legend fills the frame, sword on his shoulder, the empty block, a crow, the crowd
    body = (
      <>
        <SunsetSky h={1200} f={f} sunY={1020} />
        <Houses y={1180} f={f} seed="sq" scale={1.05} />
        <Cobbles y0={1170} seed="sq" />
        <Torch x={96} y={1500} f={f} s={1.05} />
        <Torch x={990} y={1480} f={f} s={1.0} />
        <Scaffold x0={-30} x1={1110} y={1640} h={300} />
        <Block x={858} y={1640} s={0.88} />
        <Crow x={862} y={1500} f={f} s={0.9} />
        <Headsman x={500} y={1640} s={1.1} f={f} pose="shoulder" hood={0} glint={interpolate(f % 75, [10, 34], [0, 1], clamp)} />
        <Fog f={f} y={1560} op={0.16} />
        <Crowd y={1930} f={f} n={6} s={1.05} col="#2A1830" seed="sqc" />
      </>
    );
  } else if (mode === "crowd") {
    // the sword goes up … (cut away) … the crowd erupts: fists, cabbages, turnips – he ducks
    const miss = (v.missAt ?? 0.55) * dur;
    const after = f >= miss;
    const lf = f - miss;
    const angry = after ? ease(lf, 0, 6) : 0;
    const boo = popIn(lf, 2, 7);
    const shake = after ? Math.sin(lf * 2.2) * Math.max(0, 8 - lf * 0.4) : 0;
    const vegs = [0, 1, 2, 3, 4, 5].map((k) => {
      const st = miss + 2 + k * 3.5;
      const p = (f - st) / 14;
      if (p < 0 || p > 1) return null;
      const sx = 120 + k * 170;
      const sy = 1760;
      const ex = 480 + ((k * 73) % 160) - 60;
      const ey = 760 + ((k * 41) % 200);
      return <Veg key={k} kind={k % 2} x={lerp(sx, ex, p)} y={lerp(sy, ey, p) - Math.sin(p * Math.PI) * 300} r={f * 18 + k * 40} />;
    });
    body = (
      <g transform={`translate(${shake} 0)`}>
        <SunsetSky h={1000} f={f} sunY={860} />
        <Houses y={1000} f={f} seed="cr" scale={0.85} />
        <Cobbles y0={990} seed="cr" />
        <Torch x={150} y={1220} f={f} s={0.8} />
        <Torch x={930} y={1210} f={f} s={0.8} />
        <Scaffold x0={170} x1={910} y={1180} h={240} />
        <Block x={740} y={1180} s={0.55} />
        <Headsman x={500} y={1180} s={0.6} f={f} pose={after ? "duck" : "raise"} face={after ? "shock" : "stern"} glint={after ? 0 : interpolate(f, [6, 26], [0, 1], clamp)} />
        <Crowd y={1520} f={f} n={8} s={0.62} col="#4A2A4A" seed="crb" angry={angry} />
        {vegs}
        <Crowd y={1940} f={f} n={6} s={1.15} col="#2A1830" seed="crf" angry={angry} />
        {boo > 0 ? (
          <g transform={`translate(740 800) rotate(8) scale(${boo})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={120} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">BOOO!</text>
          </g>
        ) : null}
      </g>
    );
  } else if (mode === "unmask") {
    // close-up: the hood flies off – a plain bearded face. Then the townsfolk turn their backs on him.
    const unmask = ease(f, (v.unmaskAt ?? 0.2) * dur, (v.unmaskAt ?? 0.2) * dur + 11);
    const shun = (v.shunAt ?? 0.6) * dur;
    const turned = f >= shun;
    const walk = turned ? (f - shun) * 9 : 0;
    body = (
      <>
        <SunsetSky h={1250} f={f} sunY={1080} />
        <Houses y={1250} f={f} seed="um" scale={1.1} />
        <Cobbles y0={1240} seed="um" />
        <g transform={`translate(${150 - walk} 1420) scale(${turned ? -0.62 : 0.62} 0.62)`}>
          <Villager x={0} y={0} f={f} coat="#5E8A6A" hat="kerchief" skirt />
        </g>
        <g transform={`translate(${940 + walk} 1400) scale(${turned ? 0.6 : -0.6} 0.6)`}>
          <Villager x={0} y={0} f={f} coat="#6A6AA8" hat="brim" />
        </g>
        <Headsman x={540} y={2170} s={1.55} f={f} pose="shoulder" hood={unmask} face={turned ? "sad" : "stern"} />
        {unmask > 0 && unmask < 1 ? <Glint x={540} y={860} s={Math.sin(unmask * Math.PI) * 2} /> : null}
      </>
    );
  } else if (mode === "night") {
    // the twist: at night they queue at HIS door → flash → inside: he is bandaging a patient
    const answerAt = (v.answerAt ?? 0.6) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      const door = ease(f, answerAt - 8, answerAt);
      body = (
        <>
          <NightSky h={1300} f={f} />
          <g transform="translate(0 0) scale(1)">
            <Houses y={1050} f={f} night seed="nt" scale={0.62} />
          </g>
          <TownWall y={1110} />
          <rect x={0} y={1100} width={1080} height={820} fill="#3E3456" />
          <path d="M 0 1640 Q 400 1560 760 1500 L 1080 1480 L 1080 1920 L 0 1920 Z" fill="#5A4A62" />
          <HisHouse x={840} y={1520} s={0.92} f={f} door={door} />
          <Villager x={120} y={1720} s={0.8} f={f} coat="#7A6A5A" hat="none" prop="cane" old />
          <Villager x={300} y={1690} s={0.84} f={f} coat="#5E8A6A" hat="kerchief" skirt prop="lantern" />
          <Villager x={480} y={1650} s={0.86} f={f} coat="#6A6AA8" hat="cap" prop="sling" face="ouch" />
          <Villager x={650} y={1590} s={0.86} f={f} coat="#9A5A3A" hat="none" prop="bandage" knock={f < answerAt - 10} face="ouch" />
        </>
      );
    } else {
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 6], [1, 0], clamp);
      const wraps = Math.min(5, Math.floor(lf / 4));
      body = (
        <>
          <Room f={f} />
          <Headsman x={400} y={1700} s={0.95} f={f} pose="work" face="kind" hands={[[150, -560], [300, -520]]} />
          <OldMan x={930} y={1340} s={0.95} f={f} relief={lf > 30 ? 1 : 0} />
          {/* the patient's forearm on the table, being bandaged */}
          <Limb a={[860, 1110]} b={[760, 1190]} c={[640, 1200]} w={44} col="#5E6A9A" />
          <circle cx={626} cy={1200} r={24} fill={SKIN} stroke={INK} strokeWidth={5} />
          {new Array(wraps).fill(0).map((_, k) => <rect key={k} x={662 + k * 26} y={1176} width={20} height={50} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={4} transform={`rotate(-8 ${672 + k * 26} 1200)`} />)}
          <rect x={-20} y={1240} width={1120} height={60} rx={10} fill={WOOD_HI} stroke={INK} strokeWidth={8} />
          <rect x={0} y={1300} width={1080} height={620} fill={WOOD} stroke={INK} strokeWidth={6} />
          {[1400, 1520, 1640, 1760].map((py) => <path key={py} d={`M 0 ${py} L 1080 ${py}`} stroke={WOOD_D} strokeWidth={5} />)}
          <g transform="translate(180 1240) scale(0.38)">
            <FatJar x={0} y={0} lid={0} />
          </g>
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  } else if (mode === "ledger") {
    const c1 = ease(f, 0.06 * dur, 0.3 * dur);
    const c2 = interpolate(f, [(v.countAt ?? 0.45) * dur, (v.countAt ?? 0.45) * dur + 26], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    body = <Ledger f={f} c1={c1} c2={c2} />;
  } else if (mode === "jar") {
    const dip = (v.dipAt ?? 0.3) * dur;
    const lid = ease(f, dip - 14, dip - 4);
    const toKnee = ease(f, dip + 10, dip + 22);
    const rubbing = f > dip + 22;
    const KNEE: P = [744, 1150];
    const hover: P = [400, 520];
    const inJar: P = [380, 690];
    let hand: P = f < dip ? [lerp(hover[0], inJar[0], ease(f, dip - 6, dip)), lerp(hover[1], inJar[1], ease(f, dip - 6, dip))] : [lerp(inJar[0], hover[0], ease(f, dip, dip + 8)), lerp(inJar[1], hover[1], ease(f, dip, dip + 8))];
    if (toKnee > 0) hand = [lerp(hover[0], KNEE[0], toKnee), lerp(hover[1], KNEE[1] - 40, toKnee)];
    if (rubbing) hand = [KNEE[0] + Math.sin((f - dip) / 2) * 26, KNEE[1] - 40];
    const relief = rubbing ? ease(f, dip + 34, dip + 40) : 0;
    const ahh = popIn(f, dip + 40, 8);
    body = (
      <>
        <Room f={f} />
        <rect x={-20} y={1236} width={640} height={50} rx={10} fill={WOOD_HI} stroke={INK} strokeWidth={8} />
        <rect x={10} y={1286} width={570} height={640} fill={WOOD} stroke={INK} strokeWidth={6} />
        <OldMan x={930} y={1130} s={1.0} f={f} relief={relief} />
        <FatJar x={330} y={1240} s={1.22} lid={lid} />
        {/* his arm reaching in from above: puffed red sleeve, then the forearm with a cuff */}
        <Limb a={[hand[0] - 300, 40]} b={[hand[0] - 250, 160]} c={[hand[0] - 170, hand[1] - 260]} w={96} col={RED} />
        {[0.3, 0.6].map((t) => <circle key={t} cx={lerp(hand[0] - 300, hand[0] - 170, t)} cy={lerp(40, hand[1] - 260, t)} r={10} fill={SLASH} stroke={INK} strokeWidth={3} />)}
        <Limb a={[hand[0] - 170, hand[1] - 260]} b={[hand[0] - 90, hand[1] - 140]} c={hand} w={54} col={RED_D} />
        <circle cx={hand[0] - 34} cy={hand[1] - 46} r={30} fill={CREAM} stroke={INK} strokeWidth={5} />
        <g transform={`translate(${hand[0]} ${hand[1]})`}>
          <circle cx={0} cy={0} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
          <path d="M 18 -16 L 52 -26 M 22 0 L 58 -4" stroke={INK} strokeWidth={22} strokeLinecap="round" />
          <path d="M 18 -16 L 52 -26 M 22 0 L 58 -4" stroke={SKIN} strokeWidth={12} strokeLinecap="round" />
          {f > dip ? <ellipse cx={56} cy={-14} rx={14} ry={10} fill="#F6EBCB" stroke={INK} strokeWidth={3} /> : null}
        </g>
        {ahh > 0 ? (
          <g transform={`translate(860 640) rotate(6) scale(${ahh})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={120} fill={C.mustard} stroke={INK} strokeWidth={10} paintOrder="stroke" strokeLinejoin="round">AHH!</text>
          </g>
        ) : null}
      </>
    );
  }

  return (
    <Backdrop sky="dark" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "night" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.6) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 460} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
