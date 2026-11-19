import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep011 Aircraft listener (Armistice Day extra) – before radar, soldiers hunted Zeppelins and bombers by EAR:
// giant brass horns ("war tubas") piped into a stethoscope, then concrete "sound mirrors" on the English coast.
// visual: { mode: "horns" | "hush" | "zeppelin" | "mirror" | "phones", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?, floatSize?,
//           zepAt? (zeppelin: when the airship breaks cloud), dimAt? (mirror: 200 FT arrow), pingAt? (phones) }
// Respectful + neutral: no combat, no casualties; the modern scene is a field of sensor poles and a far-off drone dot.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2B88E";
const SKIN_D = "#D9946A";
const BLUSH = "#F07A6A";
const HAIR = "#4A3020";
const KHAKI = "#A39158";
const KHAKI_D = "#7E6F40";
const KHAKI_L = "#C2B27A";
const PUTTEE = "#8A7A4A";
const HELMET = "#6F7A4A";
const HELMET_D = "#4F5833";
const BOOT = "#3A2A1C";
const BELT = "#6A4424";
const BRASS = "#E8B04A";
const BRASS_L = "#FFE08A";
const BRASS_D = "#A8711F";
const THROAT = "#3A2410";
const TUBE = "#6A2E22";
const STEEL = "#5E6470";
const CONC = "#D8CFBD";
const CONC_D = "#B2A893";
const CONC_DD = "#857C6B";
const WOOD = "#9A6A3A";
const WOOD_D = "#6A4424";
const WHEAT = "#F0C75A";
const WHEAT_D = "#C99A34";

const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];

const ik = (a: P, c: P, l1: number, l2: number, bend: number): P => {
  const dx = c[0] - a[0];
  const dy = c[1] - a[1];
  const d = Math.max(Math.abs(l1 - l2) + 1, Math.min(Math.hypot(dx, dy), l1 + l2 - 1));
  const ang = Math.atan2(dy, dx);
  const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const t = ang + bend * A;
  return [a[0] + Math.cos(t) * l1, a[1] + Math.sin(t) * l1];
};
const rot = (p: P, deg: number): P => {
  const r = (deg * Math.PI) / 180;
  return [p[0] * Math.cos(r) - p[1] * Math.sin(r), p[0] * Math.sin(r) + p[1] * Math.cos(r)];
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

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string; size?: number }> = ({ items, f, dur, top = 330, at, side = "alt", size = 64 }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: size, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Pop: React.FC<{ x: number; y: number; f: number; at?: number; size?: number; rot?: number; text: string; col?: string }> = ({ x, y, f, at = 0, size = 80, rot: r = -8, text, col = C.mustard }) => {
  const p = popIn(f, at, 7);
  if (p <= 0) return null;
  const wob = Math.sin(f / 2.5) * 3;
  return (
    <g transform={`translate(${x} ${y}) rotate(${r + wob}) scale(${p})`}>
      <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={col} stroke={INK} strokeWidth={9} paintOrder="stroke">{text}</text>
    </g>
  );
};

// ---------- the listener: WWI soldier, side view facing RIGHT, feet at (0,0); helmet, tunic, puttees; stethoscope earpiece ----------
export type Pose = "listen" | "hush" | "alert";
const Boot: React.FC<{ x: number; col?: string }> = ({ x, col = BOOT }) => (
  <path d={`M ${x - 40} -70 L ${x + 26} -70 Q ${x + 40} -34 ${x + 86} -26 Q ${x + 100} -20 ${x + 98} 0 L ${x - 44} 0 Z`} fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
);
const Leg: React.FC<{ hip: P; knee: P; ankle: P; dark?: boolean }> = ({ hip, knee, ankle, dark }) => (
  <g>
    <Seg a={hip} b={knee} w={92} col={dark ? KHAKI_D : KHAKI} />
    <Seg a={knee} b={ankle} w={66} col={dark ? "#6E6238" : PUTTEE} />
    {[0.25, 0.45, 0.65, 0.85].map((t) => {
      const x = knee[0] + (ankle[0] - knee[0]) * t;
      const y = knee[1] + (ankle[1] - knee[1]) * t;
      return <path key={t} d={`M ${x - 32} ${y + 10} L ${x + 32} ${y - 12}`} stroke={dark ? "#4E4426" : "#6A5C34"} strokeWidth={5} />;
    })}
  </g>
);

export const Soldier: React.FC<{ f: number; pose?: Pose; hand?: P }> = ({ f, pose = "listen", hand = [230, -640] }) => {
  const sh: P = [62, -790];
  const shB: P = [-30, -790];
  const handF: P = pose === "hush" ? [150, -888] : pose === "alert" ? [300, -1130] : hand;
  const elbF = ik(sh, handF, 190, 180, pose === "listen" ? 1 : -1);
  const handB: P = pose === "alert" ? [-90, -560] : [-50, -540];
  const elbB = ik(shB, handB, 190, 180, 1);
  const breath = Math.sin(f / 9) * 4;
  const H: P = [46, -945 + breath * 0.4];
  return (
    <g>
      {/* back arm */}
      <Seg a={shB} b={elbB} w={56} col={KHAKI_D} />
      <Seg a={elbB} b={handB} w={50} col={KHAKI_D} />
      <circle cx={handB[0]} cy={handB[1]} r={27} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      {/* legs + boots */}
      <Leg hip={[-26, -470]} knee={[-46, -250]} ankle={[-50, -64]} dark />
      <Boot x={-50} col="#2A1E13" />
      <Leg hip={[26, -470]} knee={[44, -250]} ankle={[40, -64]} />
      <Boot x={40} />
      {/* tunic */}
      <path d={`M -100 -410 L -112 -760 Q -104 -836 -24 ${-846 + breath} L 70 ${-846 + breath} Q 126 -832 124 -760 L 112 -410 Q 6 -390 -100 -410 Z`} fill={KHAKI} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 82 -830 L 92 -420" stroke={KHAKI_D} strokeWidth={6} />
      {[-760, -680, -600, -470].map((y) => (
        <circle key={y} cx={98} cy={y} r={8} fill={BRASS} stroke={INK} strokeWidth={3} />
      ))}
      <rect x={-6} y={-760} width={70} height={64} rx={8} fill={KHAKI_L} stroke={INK} strokeWidth={5} />
      <rect x={-6} y={-760} width={70} height={18} fill={KHAKI_D} stroke={INK} strokeWidth={4} />
      <rect x={-112} y={-530} width={232} height={40} fill={BELT} stroke={INK} strokeWidth={6} />
      <rect x={70} y={-536} width={38} height={52} rx={6} fill={BRASS} stroke={INK} strokeWidth={5} />
      {/* neck + head */}
      <rect x={6} y={-890} width={70} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <path d="M -6 -850 L 100 -850" stroke={KHAKI} strokeWidth={26} strokeLinecap="round" />
      <g transform={`translate(${H[0]} ${H[1]})`}>
        <circle cx={0} cy={0} r={88} fill={SKIN} stroke={INK} strokeWidth={8} />
        <circle cx={58} cy={30} r={20} fill={BLUSH} opacity={0.4} />
        {/* nose */}
        <path d="M 80 -26 Q 122 2 92 20" fill={SKIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {/* moustache */}
        <path d="M 54 34 Q 74 24 100 36 Q 80 48 54 34 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
        {/* eye + brow by pose */}
        {pose === "listen" ? (
          <g>
            <path d="M 34 -22 Q 50 -10 66 -22" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M 28 -50 L 72 -38" stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
            <path d="M 60 62 L 86 58" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          </g>
        ) : pose === "hush" ? (
          <g>
            <circle cx={52} cy={-20} r={17} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            <circle cx={58} cy={-27} r={8} fill={INK} />
            <path d="M 30 -52 Q 50 -64 72 -52" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
            <ellipse cx={74} cy={60} rx={8} ry={6} fill="#7A2A26" />
          </g>
        ) : (
          <g>
            <circle cx={54} cy={-22} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            <circle cx={60} cy={-24} r={9} fill={INK} />
            <path d="M 28 -62 Q 50 -78 74 -62" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
            <ellipse cx={78} cy={64} rx={16} ry={20} fill="#7A2A26" stroke={INK} strokeWidth={5} />
          </g>
        )}
        {/* ear + stethoscope earpiece */}
        <ellipse cx={-26} cy={6} rx={18} ry={26} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={-26} cy={6} r={20} fill={TUBE} stroke={INK} strokeWidth={5} />
        <circle cx={-31} cy={0} r={6} fill="#C46A55" />
        {/* Brodie helmet + chin strap */}
        <path d="M -20 10 Q 20 70 80 76" stroke={BELT} strokeWidth={7} fill="none" />
        <g transform="rotate(-7)">
          <path d="M -86 -44 Q -76 -142 8 -146 Q 92 -142 104 -44 Z" fill={HELMET} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d="M -50 -110 Q 0 -134 50 -118" stroke="#8C9862" strokeWidth={10} fill="none" strokeLinecap="round" />
          <ellipse cx={10} cy={-44} rx={162} ry={26} fill={HELMET_D} stroke={INK} strokeWidth={8} />
        </g>
      </g>
      {/* front arm */}
      <Seg a={sh} b={elbF} w={58} col={KHAKI} />
      <Seg a={elbF} b={handF} w={50} col={KHAKI} />
      <circle cx={handF[0]} cy={handF[1]} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      {pose === "hush" ? <path d={`M ${handF[0] + 4} ${handF[1] - 8} L ${handF[0] + 10} ${handF[1] - 60}`} stroke={INK} strokeWidth={24} strokeLinecap="round" /> : null}
      {pose === "hush" ? <path d={`M ${handF[0] + 4} ${handF[1] - 8} L ${handF[0] + 10} ${handF[1] - 60}`} stroke={SKIN} strokeWidth={13} strokeLinecap="round" /> : null}
      {pose === "alert" ? <path d={`M ${handF[0]} ${handF[1]} L ${handF[0] + 52} ${handF[1] - 40}`} stroke={INK} strokeWidth={24} strokeLinecap="round" /> : null}
      {pose === "alert" ? <path d={`M ${handF[0]} ${handF[1]} L ${handF[0] + 52} ${handF[1] - 40}`} stroke={SKIN} strokeWidth={13} strokeLinecap="round" /> : null}
    </g>
  );
};

// ---------- one brass horn ("war tuba" bell) along +x: throat at 0, mouth at len ----------
const Horn: React.FC<{ len: number; r0?: number; r1: number; dark?: boolean; f: number }> = ({ len, r0 = 20, r1, dark, f }) => {
  const glint = (Math.sin(f / 11) + 1) / 2;
  return (
    <g>
      <path d={`M -10 ${-r0} C ${len * 0.55} ${-r0 * 1.15}, ${len * 0.82} ${-r1 * 0.5}, ${len} ${-r1} L ${len} ${r1} C ${len * 0.82} ${r1 * 0.5}, ${len * 0.55} ${r0 * 1.15}, -10 ${r0} Z`} fill={dark ? "url(#ep011brassD)" : "url(#ep011brass)"} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M 20 ${-r0 * 0.4} C ${len * 0.55} ${-r0 * 0.5}, ${len * 0.8} ${-r1 * 0.3}, ${len - 6} ${-r1 * 0.62}`} stroke={BRASS_L} strokeWidth={9} fill="none" strokeLinecap="round" opacity={dark ? 0.25 : 0.45 + glint * 0.4} />
      <ellipse cx={len} cy={0} rx={r1 * 0.3} ry={r1} fill={THROAT} stroke={INK} strokeWidth={8} />
      <ellipse cx={len + 4} cy={0} rx={r1 * 0.22} ry={r1 * 0.86} fill="none" stroke={dark ? BRASS_D : BRASS} strokeWidth={10} />
      <ellipse cx={len - 6} cy={r1 * 0.2} rx={r1 * 0.1} ry={r1 * 0.42} fill="#000000" opacity={0.35} />
      <rect x={-16} y={-r0 - 8} width={34} height={r0 * 2 + 16} rx={6} fill={dark ? BRASS_D : BRASS} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// ---------- the sound locator rig + the listener. Local origin = the soldier's feet; the soldier faces LEFT toward the horns ----------
export const PV: P = [-250, -640];
const CL = [
  { y: -175, len: 370, r1: 112, dark: true },
  { y: 75, len: 370, r1: 112, dark: true },
  { y: -75, len: 400, r1: 124, dark: false },
  { y: 175, len: 400, r1: 124, dark: false },
];
const toRig = (p: P, aim: number): P => {
  const q = rot(p, aim);
  return [PV[0] + q[0], PV[1] + q[1]];
};
export const Rig: React.FC<{ x: number; y: number; s?: number; f: number; aim?: number; pose?: Pose; rings?: number }> = ({ x, y, s = 1, f, aim = -140, pose = "listen", rings = 0 }) => {
  const J = toRig([-80, 0], aim);
  const hEnd = toRig([-72, 8], aim);
  const hStart = toRig([-10, 30], aim);
  const ear: P = [-20, -939];
  const handS: P = [-hEnd[0], hEnd[1]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* coiled-cable ring + stakes (as in the 1915 photo) and the post */}
      <ellipse cx={PV[0]} cy={-14} rx={190} ry={44} fill="none" stroke={INK} strokeWidth={30} />
      <ellipse cx={PV[0]} cy={-14} rx={190} ry={44} fill="none" stroke="#4A3A2A" strokeWidth={20} />
      <ellipse cx={PV[0]} cy={-20} rx={190} ry={44} fill="none" stroke="#6A5440" strokeWidth={6} />
      {[-170, -90, 0, 90, 170].map((dx) => (
        <rect key={dx} x={PV[0] + dx - 7} y={-70 + Math.abs(dx) * 0.12} width={14} height={56} rx={4} fill={WOOD_D} stroke={INK} strokeWidth={4} />
      ))}
      <rect x={PV[0] - 16} y={PV[1]} width={32} height={-PV[1] - 20} fill={STEEL} stroke={INK} strokeWidth={7} />
      <rect x={PV[0] - 30} y={-250} width={60} height={22} rx={6} fill={STEEL} stroke={INK} strokeWidth={6} />
      {/* the horn cluster */}
      <g transform={`translate(${PV[0]} ${PV[1]}) rotate(${aim})`}>
        {CL.map((h, k) => (
          <g key={k} transform={`translate(${h.dark ? -24 : 0} ${h.y})`}>
            <Horn len={h.len} r1={h.r1} dark={h.dark} f={f + k * 9} />
          </g>
        ))}
        <rect x={-46} y={-215} width={40} height={430} rx={14} fill={STEEL} stroke={INK} strokeWidth={7} />
        {CL.map((h, k) => (
          <path key={`t${k}`} d={`M -30 ${h.y} Q -70 ${h.y * 0.5} -80 0`} stroke={TUBE} strokeWidth={12} fill="none" />
        ))}
        <circle cx={-26} cy={0} r={26} fill={BRASS_D} stroke={INK} strokeWidth={6} />
      </g>
      {/* steering handle */}
      <Seg a={hStart} b={hEnd} w={20} col={WOOD} />
      {/* sound rings arriving at the mouths */}
      {rings > 0
        ? [0, 1, 2].map((k) => {
            const p = ((f + k * 12) % 36) / 36;
            const m = toRig([420 + (1 - p) * 360, 0], aim);
            return <circle key={`r${k}`} cx={m[0]} cy={m[1]} r={70 + (1 - p) * 220} fill="none" stroke="#FFF1C2" strokeWidth={8} strokeDasharray="22 18" opacity={rings * p * 0.75} />;
          })
        : null}
      {/* the soldier (flipped to face the horns) */}
      <g transform="scale(-1 1)">
        <Soldier f={f} pose={pose} hand={handS} />
      </g>
      {/* visible ear tube */}
      <path d={`M ${J[0]} ${J[1]} C ${J[0] + 70} ${J[1] - 40}, ${ear[0] + 16} ${ear[1] + 190}, ${ear[0]} ${ear[1] + 14}`} stroke={INK} strokeWidth={24} fill="none" strokeLinecap="round" />
      <path d={`M ${J[0]} ${J[1]} C ${J[0] + 70} ${J[1] - 40}, ${ear[0] + 16} ${ear[1] + 190}, ${ear[0]} ${ear[1] + 14}`} stroke={TUBE} strokeWidth={13} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ---------- props: Zeppelin, clouds, searchlight, biplane, drone, sensor pole ----------
const Zeppelin: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -250 0 L -300 -70 L -230 -40 Z M -250 0 L -300 70 L -230 40 Z" fill="#2E3350" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={270} ry={64} fill={lit > 0 ? "#C9CCD8" : "#3A4062"} stroke={INK} strokeWidth={8} />
    {[-180, -120, -60, 0, 60, 120, 180].map((rx) => (
      <path key={rx} d={`M ${rx} ${-62 + Math.abs(rx) * 0.06} Q ${rx + 8} 0 ${rx} ${62 - Math.abs(rx) * 0.06}`} stroke={lit > 0 ? "#9EA3B6" : "#2A2E48"} strokeWidth={5} fill="none" />
    ))}
    <path d="M -240 -10 Q 0 -40 250 -12" stroke={lit > 0 ? "#FFFFFF" : "#5A6088"} strokeWidth={8} fill="none" opacity={0.7} />
    <rect x={-60} y={58} width={110} height={30} rx={10} fill="#2A2E48" stroke={INK} strokeWidth={6} />
    {lit > 0 ? <ellipse cx={0} cy={0} rx={300} ry={96} fill="#FFF6C8" opacity={0.25 * lit} /> : null}
  </g>
);
const Cloud: React.FC<{ x: number; y: number; s?: number; col?: string; o?: number }> = ({ x, y, s = 1, col = "#F6E3D0", o = 0.9 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -170 30 Q -190 -20 -120 -26 Q -100 -80 -30 -66 Q 10 -110 70 -70 Q 140 -84 150 -24 Q 200 -10 180 30 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
  </g>
);
const Beam: React.FC<{ x: number; y: number; ang: number; len?: number; o?: number }> = ({ x, y, ang, len = 1700, o = 0.5 }) => (
  <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    <path d={`M 0 -14 L ${len} -120 L ${len} 120 L 0 14 Z`} fill="url(#ep011beam)" />
  </g>
);
const Biplane: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-14} width={170} height={28} rx={14} fill="#3A3550" stroke={INK} strokeWidth={5} />
    <rect x={-40} y={-56} width={30} height={112} rx={8} fill="#4A4568" stroke={INK} strokeWidth={5} />
    <rect x={-10} y={-48} width={30} height={96} rx={8} fill="#4A4568" stroke={INK} strokeWidth={5} />
    <path d="M -90 0 L -120 -30 L -112 0 Z" fill="#3A3550" stroke={INK} strokeWidth={5} />
    <circle cx={86} cy={0} r={10} fill={INK} />
  </g>
);
const Drone: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 0 L 50 -6 L 60 0 L 50 6 Z" fill="#3A3F52" stroke={INK} strokeWidth={4} />
    <path d="M -10 -2 L -40 -46 L -24 -46 L 14 -2 Z M -10 2 L -40 46 L -24 46 L 14 2 Z" fill="#4A5068" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </g>
);
const SensorPole: React.FC<{ x: number; y: number; s?: number; f: number; ping?: number; big?: boolean }> = ({ x, y, s = 1, f, ping = 0, big }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ping > 0
      ? [0, 1].map((k) => {
          const p = ((f + k * 15) % 30) / 30;
          return <circle key={k} cx={0} cy={-560} r={40 + p * 180} fill="none" stroke={C.mustard} strokeWidth={8} opacity={(1 - p) * ping} />;
        })
      : null}
    <rect x={-16} y={-520} width={32} height={520} fill={WOOD} stroke={INK} strokeWidth={7} />
    <path d="M -4 -500 L -4 -20" stroke={WOOD_D} strokeWidth={5} />
    {/* weatherproof box with the phone */}
    <rect x={-70} y={-470} width={140} height={190} rx={14} fill="#E8E4D8" stroke={INK} strokeWidth={7} />
    <rect x={-50} y={-452} width={100} height={154} rx={12} fill="#15192A" stroke={INK} strokeWidth={5} />
    {big ? (
      <g>
        <path d={`M -40 -375 ${new Array(9).fill(0).map((_, k) => `L ${-40 + k * 10} ${-375 + Math.sin(f / 2 + k * 1.3) * (ping > 0 ? 34 : 8) * (k % 2 ? 1 : -1)}`).join(" ")}`} stroke="#5FE0A6" strokeWidth={5} fill="none" />
        <circle cx={30} cy={-436} r={8} fill={ping > 0 && f % 10 < 6 ? "#FF5A4A" : "#5A2A2A"} />
      </g>
    ) : null}
    {/* microphone on top */}
    <rect x={-10} y={-600} width={20} height={80} fill={STEEL} stroke={INK} strokeWidth={5} />
    <ellipse cx={0} cy={-610} rx={30} ry={38} fill="#2A2E3A" stroke={INK} strokeWidth={6} />
    <path d="M -18 -626 L 18 -626 M -20 -608 L 20 -608 M -18 -590 L 18 -590" stroke="#5A6070" strokeWidth={4} />
  </g>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep011brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={BRASS_D} />
      <stop offset="0.28" stopColor={BRASS_L} />
      <stop offset="0.6" stopColor={BRASS} />
      <stop offset="1" stopColor={BRASS_D} />
    </linearGradient>
    <linearGradient id="ep011brassD" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7A5218" />
      <stop offset="0.3" stopColor="#D49A3A" />
      <stop offset="1" stopColor="#7A5218" />
    </linearGradient>
    <linearGradient id="ep011dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2E3170" />
      <stop offset="0.42" stopColor="#8E4F8C" />
      <stop offset="0.74" stopColor="#F2875A" />
      <stop offset="1" stopColor="#FFD27A" />
    </linearGradient>
    <linearGradient id="ep011night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#0B1028" />
      <stop offset="0.6" stopColor="#1E2A5E" />
      <stop offset="1" stopColor="#47508E" />
    </linearGradient>
    <linearGradient id="ep011sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5B78C0" />
      <stop offset="0.55" stopColor="#F4A57E" />
      <stop offset="1" stopColor="#FFE3A2" />
    </linearGradient>
    <linearGradient id="ep011day" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#6FB9E6" />
      <stop offset="1" stopColor="#D8F0F4" />
    </linearGradient>
    <linearGradient id="ep011beam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#FFF6C8" stopOpacity={0.95} />
      <stop offset="1" stopColor="#FFF6C8" stopOpacity={0} />
    </linearGradient>
    <linearGradient id="ep011wall" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={CONC} />
      <stop offset="0.5" stopColor={CONC_D} />
      <stop offset="1" stopColor={CONC} />
    </linearGradient>
    <radialGradient id="ep011sun">
      <stop offset="0" stopColor="#FFF3C0" stopOpacity={1} />
      <stop offset="0.4" stopColor="#FFD27A" stopOpacity={0.8} />
      <stop offset="1" stopColor="#FFD27A" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const Stars: React.FC<{ f: number; n?: number; h?: number }> = ({ f, n = 40, h = 1200 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => (
      <circle key={k} cx={(k * 197) % 1080} cy={(k * 331) % h} r={2 + (k % 3)} fill="#FFF3C4" opacity={0.35 + 0.45 * Math.abs(Math.sin(f / 9 + k))} />
    ))}
  </g>
);
const Field: React.FC<{ top: number; night?: boolean }> = ({ top, night }) => (
  <g>
    <rect x={0} y={top} width={1080} height={1920 - top} fill={night ? "#2E3A2A" : "#7E9A4A"} />
    <path d={`M 0 ${top} Q 200 ${top - 30} 420 ${top - 6} Q 700 ${top - 40} 1080 ${top - 10} L 1080 ${top + 20} L 0 ${top + 20} Z`} fill={night ? "#26301F" : "#5E7A36"} stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3].map((k) => (
      <path key={k} d={`M 0 ${top + 80 + k * 70} Q 540 ${top + 60 + k * 76} 1080 ${top + 90 + k * 70}`} stroke={night ? "#24301E" : "#6C8A3E"} strokeWidth={8} fill="none" opacity={0.7} />
    ))}
  </g>
);

export const AircraftListener: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "horns";
  const float: string[] = v.float ?? [];
  const headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let shake = 0;

  if (mode === "horns" || mode === "hush") {
    // frame 0: the listener at a four-horn locator, eyes shut, tubes in his ears; a Zeppelin faint in the dusk clouds
    const hush = mode === "hush";
    const ground = 1580;
    const aim = hush ? -139 : -140 + Math.sin(f / 16) * 4;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={ground} fill={hush ? "url(#ep011night)" : "url(#ep011dusk)"} />
        {hush ? <Stars f={f} /> : <circle cx={860} cy={1460} r={330} fill="url(#ep011sun)" />}
        {hush ? <circle cx={880} cy={330} r={70} fill="#FFF3D1" opacity={0.9} /> : null}
        <Cloud x={840 - f * 0.4} y={980} s={1.1} col={hush ? "#3A4478" : "#F8D2B8"} o={0.85} />
        <Zeppelin x={190 + f * 0.6} y={610} s={0.45} o={hush ? 0.45 : 0.8} />
        <Cloud x={130 + f * 0.5} y={700} s={0.8} col={hush ? "#2E3868" : "#F6C6B0"} o={0.75} />
        <Cloud x={980 - f * 0.3} y={1250} s={0.7} col={hush ? "#2E3868" : "#FBDCC0"} o={0.8} />
        <Field top={ground} night={hush} />
        <Rig x={790} y={1730} s={1} f={f} aim={aim} pose={hush ? "hush" : "listen"} rings={hush ? 0.35 : 1} />
        {hush ? <Pop x={560} y={600} f={f} at={6} size={84} rot={-6} text="shhh…" col={C.cream} /> : null}
        {hush ? <rect x={0} y={0} width={1080} height={1920} fill="#060818" opacity={interpolate(f, [0, 12], [0, 0.22], clamp)} /> : null}
      </>
    );
  } else if (mode === "zeppelin") {
    // night: the horns swing up, the airship breaks cloud, searchlights lock on – ZEPPELIN!
    const zepAt = (v.zepAt ?? 0.45) * dur;
    const alarmAt = (v.alarmAt ?? 0.78) * dur;
    const zx = interpolate(f, [0, zepAt, dur], [-120, 430, 560], clamp);
    const zy = 840;
    const found = f >= zepAt;
    const cloudOff = interpolate(f, [zepAt - 10, zepAt + 6], [0, 1], clamp);
    const lights: P[] = [[120, 1900], [600, 1960], [1000, 1900]];
    const aim = interpolate(f, [0, zepAt], [-152, -114], { ...clamp, easing: Easing.inOut(Easing.quad) });
    shake = found ? Math.sin((f - zepAt) * 2.6) * 10 * Math.max(0, 1 - (f - zepAt) / 14) : 0;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep011night)" />
        <Stars f={f} n={50} h={1500} />
        {lights.map(([lx, ly], k) => {
          const toZ = (Math.atan2(zy - ly, zx - lx) * 180) / Math.PI;
          const search = -90 + Math.sin(f / 12 + k * 2) * 30;
          const ang = found ? interpolate(f, [zepAt, zepAt + 8], [search, toZ], clamp) : search;
          return <Beam key={k} x={lx} y={ly} ang={ang} o={found ? 0.55 : 0.32} />;
        })}
        <Zeppelin x={zx} y={zy} s={1.05} lit={found ? 1 : 0} />
        <g opacity={1 - cloudOff}>
          <Cloud x={zx + 40} y={zy + 10} s={1.6} col="#3A4478" o={0.95} />
          <Cloud x={zx - 160} y={zy + 50} s={1.1} col="#2E3868" o={0.95} />
        </g>
        <Cloud x={900 - f * 0.6} y={1150} s={1.0} col="#2E3868" o={0.85} />
        <Field top={1700} night />
        <Rig x={900} y={1930} s={0.52} f={f} aim={aim} pose={found ? "alert" : "listen"} rings={found ? 0.4 : 1} />
        {found ? <Pop x={540} y={1120} f={f} at={zepAt} size={124} rot={-6} text="ZEPPELIN!" /> : null}
        {f >= alarmAt ? <Pop x={250} y={1420} f={f} at={alarmAt} size={84} rot={8} text="ALARM!" col={C.cream} /> : null}
      </>
    );
  } else if (mode === "mirror") {
    // the 200-ft concrete "ear" on the Kent coast: a curved wall, microphones on its forecourt, a listener at the focus
    const dimAt = (v.dimAt ?? 0.55) * dur;
    const pl = interpolate(f, [0, dur], [-60, 260], clamp);
    const dimP = interpolate(f, [dimAt, dimAt + 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1300} fill="url(#ep011sunset)" />
        <circle cx={820} cy={980} r={300} fill="url(#ep011sun)" />
        <Cloud x={820} y={420} s={0.8} col="#FBD9C4" o={0.7} />
        <Biplane x={140 + pl} y={520} s={0.8} />
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 14) % 42) / 42;
          return <circle key={k} cx={140 + pl} cy={520} r={60 + p * 520} fill="none" stroke="#FFF1C2" strokeWidth={7} strokeDasharray="20 20" opacity={(1 - p) * 0.6} />;
        })}
        {/* land behind the wall */}
        <rect x={0} y={1060} width={1080} height={240} fill="#8FA45A" />
        <path d="M 0 1060 Q 300 1030 600 1050 Q 860 1030 1080 1056" stroke={INK} strokeWidth={5} fill="none" />
        {/* the wall: concave face, panel joints, cap, end buttresses */}
        <path d="M 20 1270 L 0 760 L 40 750 L 60 1262 Z" fill={CONC_DD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 1060 1270 L 1080 760 L 1040 750 L 1020 1262 Z" fill={CONC_DD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 40 750 Q 540 860 1040 750 L 1040 1262 Q 540 1196 40 1262 Z" fill="url(#ep011wall)" stroke={INK} strokeWidth={9} strokeLinejoin="round" />
        {new Array(11).fill(0).map((_, k) => {
          const x = 40 + (k + 1) * (1000 / 12);
          const t = (x - 40) / 1000;
          const ty = 750 + 4 * t * (1 - t) * 55;
          const by = 1262 - 4 * t * (1 - t) * 33;
          return <path key={k} d={`M ${x} ${ty + 6} L ${x} ${by - 4}`} stroke={CONC_DD} strokeWidth={4} opacity={0.7} />;
        })}
        <path d="M 40 750 Q 540 860 1040 750" stroke="#EDE6D6" strokeWidth={14} fill="none" />
        <path d="M 40 750 Q 540 860 1040 750" stroke={INK} strokeWidth={5} fill="none" />
        {[[180, 0.35], [420, 0.25], [760, 0.3]].map(([sx, o], k) => (
          <path key={k} d={`M ${sx} ${880 + k * 40} q 30 60 6 140`} stroke="#8F8676" strokeWidth={6} fill="none" opacity={o} />
        ))}
        {/* forecourt + water in front */}
        <path d="M 0 1262 Q 540 1190 1080 1262 L 1080 1500 L 0 1500 Z" fill="#CDBF9E" stroke={INK} strokeWidth={6} />
        <rect x={0} y={1500} width={1080} height={420} fill="#5FA3BE" />
        <path d="M 0 1500 L 1080 1500" stroke={INK} strokeWidth={6} />
        {new Array(6).fill(0).map((_, k) => (
          <path key={k} d={`M ${60 + ((k * 170 + f * 2) % 1000)} ${1560 + k * 55} l 90 0`} stroke="#D8F0F8" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        ))}
        {/* microphone posts on the forecourt + the listener at the focus */}
        {[240, 360, 480, 600, 720, 840].map((mx, k) => (
          <g key={k}>
            <rect x={mx - 5} y={1290 + Math.abs(mx - 540) * 0.05} width={10} height={70} fill={STEEL} stroke={INK} strokeWidth={3} />
            <circle cx={mx} cy={1288 + Math.abs(mx - 540) * 0.05} r={13} fill="#2A2E3A" stroke={INK} strokeWidth={4} />
          </g>
        ))}
        <g transform="translate(100 1440) scale(0.3)">
          <Soldier f={f} pose="listen" hand={[150, -700]} />
        </g>
        {/* 200 FT dimension */}
        {dimP > 0 ? (
          <g opacity={dimP}>
            <path d={`M ${540 - 500 * dimP}  725 L ${540 + 500 * dimP}  725`} stroke={INK} strokeWidth={14} />
            <path d={`M ${540 - 500 * dimP}  725 L ${540 + 500 * dimP}  725`} stroke={C.mustard} strokeWidth={6} />
            <path d={`M ${540 - 500 * dimP}  725 l 34 -24 M ${540 - 500 * dimP}  725 l 34 24 M ${540 + 500 * dimP}  725 l -34 -24 M ${540 + 500 * dimP}  725 l -34 24`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          </g>
        ) : null}
        {f >= dimAt ? <Pop x={540} y={680} f={f} at={dimAt + 4} size={110} rot={-3} text="200 FT!" /> : null}
      </>
    );
  } else if (mode === "phones") {
    // today's version: a field of sensor poles (phone + mic), each pinging as a far-off drone passes
    const pingAt = (v.pingAt ?? 0.3) * dur;
    const dx = interpolate(f, [0, dur], [140, 420], clamp);
    const small: [number, number, number][] = [
      [90, 1135, 0.2], [230, 1125, 0.18], [370, 1140, 0.21], [520, 1128, 0.18], [660, 1142, 0.2], [820, 1126, 0.18], [980, 1138, 0.2],
      [70, 1270, 0.32], [290, 1255, 0.3], [510, 1285, 0.34], [980, 1265, 0.32],
      [130, 1520, 0.55], [430, 1560, 0.6],
    ];
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1120} fill="url(#ep011day)" />
        <Cloud x={820} y={300} s={0.9} col="#FFFFFF" o={0.85} />
        <Cloud x={200} y={1000} s={0.7} col="#FFFFFF" o={0.8} />
        <rect x={0} y={1110} width={1080} height={810} fill={WHEAT} />
        <path d="M 0 1110 L 1080 1110" stroke={INK} strokeWidth={6} />
        {new Array(9).fill(0).map((_, k) => (
          <path key={k} d={`M ${540 + (k - 4) * 40} 1112 L ${540 + (k - 4) * 330} 1920`} stroke={WHEAT_D} strokeWidth={8} opacity={0.6} />
        ))}
        <Drone x={dx} y={1000} s={0.8} />
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 12) % 36) / 36;
          return <circle key={k} cx={dx} cy={1000} r={30 + p * 360} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeDasharray="16 16" opacity={(1 - p) * 0.7} />;
        })}
        {small.map(([px, py, ps], k) => (
          <SensorPole key={k} x={px} y={py} s={ps} f={f} ping={f >= pingAt + (k % 5) * 3 ? 1 : 0} />
        ))}
        <SensorPole x={760} y={1900} s={1.45} f={f} ping={f >= pingAt ? 1 : 0} big />
      </>
    );
  }

  return (
    <Backdrop sky="paper" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <g transform={`translate(${shake} ${shake * 0.6})`}>{body}</g>
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} size={v.floatSize ?? 64} />
    </Backdrop>
  );
};
