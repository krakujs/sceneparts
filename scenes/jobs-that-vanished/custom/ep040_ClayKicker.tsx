import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep040 Clay-kicker (Remembrance Sunday) – WWI tunnellers lay back on a wooden "cross" and kicked a spade into the clay,
// in near silence, under enemy lines … then the Messines mines (7 June 1917) – and some charges are still down there.
// visual: { mode: "kick" | "cross" | "listen" | "ridge" | "field" | "storm", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "alt",
//           blastAt? (ridge), answer?, answerAccent?, answerAt? (field), strikeAt? (storm) }
// Respectful: no bodies, no gore – blasts are earth and fire seen in an underground cutaway; the enemy listener is a plain soldier.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2B88E";
const SKIN_D = "#D9946A";
const BLUSH = "#F07A6A";
const SHIRT = "#E8DCC0";
const SHIRT_D = "#C2B28C";
const TROU = "#6E5B3C";
const TROU_D = "#54442B";
const BOOT = "#3A2A1C";
const CAPC = "#7C6B48";
const BRACE = "#8A3B26";
const HAIR = "#4A3020";
const CLAY = "#C98A4B";
const CLAY_L = "#E3AD6E";
const CLAY_D = "#A56A36";
const CLAY_DD = "#7A4A24";
const EARTH = "#5E3B1F";
const TIMBER = "#A8743F";
const TIMBER_D = "#6A4424";
const STEEL = "#C9D0DA";
const STEEL_D = "#8E97A4";
const FLAME = "#FFD24A";
const GLOW = "#FFD983";
const GREY_U = "#7F8A84";
const GREY_UD = "#5E6862";
const BAND = "#C0392B";
const GRASS = "#7DB35A";
const GRASS_D = "#5A8E3C";
const SAND = "#D9C08A";
const SAND_D = "#B39A62";
const HOT = "#E8402F";
const POPPY = "#D8372B";
const XRAY = "#0E3B43";
const XLINE = "#5FE0D6";

const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
type P = [number, number];

// two-bone IK: joint between a and c (bend = ±1 picks the side)
const ik = (a: P, c: P, l1: number, l2: number, bend: number): P => {
  const dx = c[0] - a[0];
  const dy = c[1] - a[1];
  const d = Math.max(Math.abs(l1 - l2) + 1, Math.min(Math.hypot(dx, dy), l1 + l2 - 1));
  const ang = Math.atan2(dy, dx);
  const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const t = ang + bend * A;
  return [a[0] + Math.cos(t) * l1, a[1] + Math.sin(t) * l1];
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

const Seg: React.FC<{ a: P; b: P; w: number; col: string }> = ({ a, b, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ---------- the clay-kicker: lying back at ~45° on a wooden cross, feet on the spade, kicking it into the clay face (left) ----------
// local origin = hip. Kick cycle every CYC frames. Exposes the blade tip via kickGeom() so scenes can spawn falling clay.
export const CYC = 22;
const kickPhase = (f: number, pose: string) => {
  if (pose !== "kick") return { push: 0, lever: 0 };
  const t = (f % CYC) / CYC;
  const push = t < 0.28 ? Easing.out(Easing.cubic)(t / 0.28) : t < 0.55 ? 1 : 1 - Easing.inOut(Easing.quad)((t - 0.55) / 0.45);
  const lever = t > 0.3 && t < 0.62 ? Math.sin(((t - 0.3) / 0.32) * Math.PI) : 0;
  return { push, lever };
};
export const kickGeom = (f: number, pose = "kick") => {
  const { push, lever } = kickPhase(f, pose);
  const dx = -46 * push;
  const R: P = [-418 + dx, -6 + lever * 6];
  const G: P = pose === "hush" ? [-40, -160] : [-70 + dx * 0.4, -205 - lever * 18];
  const ux0 = R[0] - G[0];
  const uy0 = R[1] - G[1];
  const n0 = Math.hypot(ux0, uy0) || 1;
  const u: P = [ux0 / n0, uy0 / n0];
  const nrm: P = [-u[1], u[0]];
  const T: P = [R[0] + u[0] * 130, R[1] + u[1] * 130];
  return { push, lever, dx, R, G, u, nrm, T };
};

// boot: ankle at origin, sole facing +x, toe towards -y (before the caller's flip)
const Boot: React.FC<{ at: P; ang: number; col?: string }> = ({ at, ang, col = BOOT }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang}) scale(1 -1)`}>
    <path d="M -34 -30 Q -40 34 -12 44 L 40 44 Q 54 44 54 28 L 54 -78 Q 54 -96 36 -96 L 18 -96 Q -4 -64 -34 -30 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 54 -92 L 54 40" stroke="#1E140C" strokeWidth={12} strokeLinecap="round" />
  </g>
);

export type TFace = "grit" | "hush" | "calm";
const THead: React.FC<{ at: P; f: number; face: TFace }> = ({ at, f, face }) => (
  <g transform={`translate(${at[0]} ${at[1]}) rotate(-16)`}>
    {/* ear + back of head */}
    <circle cx={0} cy={0} r={80} fill={SKIN} stroke={INK} strokeWidth={8} />
    <ellipse cx={30} cy={8} rx={16} ry={22} fill={SKIN_D} stroke={INK} strokeWidth={5} />
    {/* soft cap, peak pointing at the face (left) */}
    <path d="M -64 -34 Q -58 -100 12 -104 Q 86 -100 86 -22 Q 12 -46 -64 -34 Z" fill={CAPC} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -64 -34 Q -112 -32 -124 -12 Q -84 -16 -48 -26 Z" fill={CAPC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -40 -40 Q 20 -58 80 -36" stroke="#5E5036" strokeWidth={6} fill="none" />
    <circle cx={-30} cy={26} r={18} fill={BLUSH} opacity={0.4} />
    {/* eye */}
    {face === "hush" ? (
      <g>
        <circle cx={-36} cy={-6} r={17} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <circle cx={-30} cy={-14} r={8} fill={INK} />
        <path d="M -58 -32 Q -38 -46 -16 -34" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    ) : face === "grit" ? (
      <g>
        <path d="M -52 -6 Q -36 -14 -20 -4" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M -60 -26 L -18 -20" stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
      </g>
    ) : (
      <g>
        <ellipse cx={-36} cy={-4} rx={10} ry={13} fill={INK} />
        <circle cx={-39} cy={-9} r={3.5} fill="#FFFFFF" />
        <path d="M -56 -26 Q -38 -34 -20 -26" stroke={HAIR} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    )}
    {/* nose + moustache + mouth */}
    <path d="M -70 4 Q -98 18 -72 32" fill={SKIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -78 40 Q -58 28 -30 40 Q -56 50 -78 40 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
    {face === "grit" ? <path d="M -66 56 L -34 58" stroke={INK} strokeWidth={7} strokeLinecap="round" /> : null}
    {face === "hush" ? <ellipse cx={-52} cy={58} rx={9} ry={7} fill="#7A2A26" /> : null}
    {face === "calm" ? <path d="M -64 56 Q -48 62 -32 56" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
    {/* sweat drop */}
    {face === "grit" ? <path d={`M ${-6} ${-60 + ((f * 2) % 40)} q -9 14 0 20 q 9 -6 0 -20 Z`} fill="#BFE6F5" stroke={INK} strokeWidth={3} opacity={0.9} /> : null}
  </g>
);

export const Tunneller: React.FC<{ x: number; y: number; s?: number; f: number; pose?: "kick" | "hush"; glow?: number }> = ({ x, y, s = 1, f, pose = "kick", glow = 0 }) => {
  const g = kickGeom(f, pose);
  const { R, G, u, nrm } = g;
  const hip: P = [0, 0];
  const sh: P = [200, -205];
  const head: P = [284, -292];
  const footN: P = [R[0] - u[0] * 46 + nrm[0] * 14, R[1] - u[1] * 46 + nrm[1] * 14];
  const footF: P = [R[0] - u[0] * 46 - nrm[0] * 22, R[1] - u[1] * 46 - nrm[1] * 22];
  const kN = ik(hip, footN, 238, 232, 1);
  const hipF: P = [-12, -24];
  const kF = ik(hipF, footF, 238, 232, 1);
  const handN: P = pose === "hush" ? [232, -168] : G;
  const eN = ik(sh, handN, 165, 158, pose === "hush" ? 1 : -1);
  const shF: P = [184, -232];
  const handF: P = [G[0] + 20, G[1] - 22];
  const eF = ik(shF, handF, 165, 158, -1);
  const bootAng = (Math.atan2(u[1], u[0]) * 180) / Math.PI;
  const plank0: P = [-70, 120];
  const plank1: P = [440, -470];
  const pd: P = [0.654, -0.757];
  const pp: P = [0.757, 0.654];
  const q: P = [190, -197];
  const bar0: P = [q[0] - pp[0] * 172, q[1] - pp[1] * 172];
  const bar1: P = [q[0] + pp[0] * 172, q[1] + pp[1] * 172];
  const gl = glow > 0 ? glow * (0.6 + 0.4 * Math.sin(f / 3)) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* the cross */}
      {gl > 0 ? (
        <g opacity={gl}>
          <path d={`M ${plank0[0]} ${plank0[1]} L ${plank1[0]} ${plank1[1]} M ${bar0[0]} ${bar0[1]} L ${bar1[0]} ${bar1[1]}`} stroke={C.mustard} strokeWidth={130} strokeLinecap="round" opacity={0.55} />
        </g>
      ) : null}
      <path d={`M ${plank0[0]} ${plank0[1]} L ${plank1[0]} ${plank1[1]}`} stroke={INK} strokeWidth={84} strokeLinecap="square" />
      <path d={`M ${plank0[0]} ${plank0[1]} L ${plank1[0]} ${plank1[1]}`} stroke={TIMBER} strokeWidth={70} strokeLinecap="square" />
      <path d={`M ${plank0[0] + pp[0] * 14} ${plank0[1] + pp[1] * 14} L ${plank1[0] + pp[0] * 14} ${plank1[1] + pp[1] * 14}`} stroke={TIMBER_D} strokeWidth={6} opacity={0.6} />
      <path d={`M ${bar0[0]} ${bar0[1]} L ${bar1[0]} ${bar1[1]}`} stroke={INK} strokeWidth={70} strokeLinecap="square" />
      <path d={`M ${bar0[0]} ${bar0[1]} L ${bar1[0]} ${bar1[1]}`} stroke={TIMBER} strokeWidth={56} strokeLinecap="square" />
      {[bar0, bar1, [q[0] + pd[0] * 230, q[1] + pd[1] * 230] as P].map((p, k) => (
        <circle key={k} cx={p[0] - pp[0] * 0} cy={p[1]} r={7} fill={TIMBER_D} />
      ))}
      {/* wedge block under the foot of the cross */}
      <path d="M -130 150 L -10 150 L -40 96 L -110 104 Z" fill={TIMBER_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* far leg + far arm */}
      <Seg a={hipF} b={kF} w={66} col={TROU_D} />
      <Seg a={kF} b={footF} w={60} col={TROU_D} />
      <Boot at={footF} ang={bootAng} col="#2A1E13" />
      <Seg a={shF} b={eF} w={50} col={SHIRT_D} />
      <Seg a={eF} b={handF} w={42} col={SKIN_D} />
      <circle cx={handF[0]} cy={handF[1]} r={26} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      {/* torso: shirt, braces, belt */}
      <path d={`M ${hip[0]} ${hip[1]} L ${sh[0]} ${sh[1]}`} stroke={INK} strokeWidth={164} strokeLinecap="round" />
      <path d={`M ${hip[0]} ${hip[1]} L ${sh[0]} ${sh[1]}`} stroke={SHIRT} strokeWidth={150} strokeLinecap="round" />
      <path d="M -40 -50 L 150 -246 M 30 30 L 226 -170" stroke={SHIRT_D} strokeWidth={10} opacity={0.6} />
      <path d="M -6 -44 L 168 -226 M 44 4 L 214 -170" stroke={BRACE} strokeWidth={14} strokeLinecap="round" />
      <path d="M -56 -6 L 6 60" stroke={INK} strokeWidth={34} strokeLinecap="round" />
      <path d="M -56 -6 L 6 60" stroke="#5A3A1E" strokeWidth={22} strokeLinecap="round" />
      {/* neck + head */}
      <path d={`M ${sh[0]} ${sh[1]} L ${head[0] - 20} ${head[1] + 30}`} stroke={INK} strokeWidth={64} strokeLinecap="round" />
      <path d={`M ${sh[0]} ${sh[1]} L ${head[0] - 20} ${head[1] + 30}`} stroke={SKIN_D} strokeWidth={50} strokeLinecap="round" />
      <THead at={head} f={f} face={pose === "hush" ? "hush" : g.push > 0.5 ? "grit" : "calm"} />
      {/* near leg (the spade handle runs over it, the boot sits on the foot-rest) */}
      <Seg a={hip} b={kN} w={72} col={TROU} />
      <Seg a={kN} b={footN} w={64} col={TROU} />
      {/* the spade: handle, T-grip, blade with two footrests */}
      <path d={`M ${R[0] - u[0] * 10} ${R[1] - u[1] * 10} L ${G[0]} ${G[1]}`} stroke={INK} strokeWidth={40} strokeLinecap="round" />
      <path d={`M ${R[0] - u[0] * 10} ${R[1] - u[1] * 10} L ${G[0]} ${G[1]}`} stroke="#DDA463" strokeWidth={26} strokeLinecap="round" />
      <path d={`M ${R[0] - u[0] * 10 + nrm[0] * 6} ${R[1] - u[1] * 10 + nrm[1] * 6} L ${G[0] + nrm[0] * 6} ${G[1] + nrm[1] * 6}`} stroke="#F2C88A" strokeWidth={6} strokeLinecap="round" />
      <path d={`M ${G[0] + nrm[0] * 38} ${G[1] + nrm[1] * 38} L ${G[0] - nrm[0] * 38} ${G[1] - nrm[1] * 38}`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d={`M ${G[0] + nrm[0] * 38} ${G[1] + nrm[1] * 38} L ${G[0] - nrm[0] * 38} ${G[1] - nrm[1] * 38}`} stroke={TIMBER_D} strokeWidth={14} strokeLinecap="round" />
      <path
        d={`M ${R[0] + nrm[0] * 38} ${R[1] + nrm[1] * 38} L ${g.T[0] + nrm[0] * 12} ${g.T[1] + nrm[1] * 12} L ${g.T[0] + u[0] * 22} ${g.T[1] + u[1] * 22} L ${g.T[0] - nrm[0] * 12} ${g.T[1] - nrm[1] * 12} L ${R[0] - nrm[0] * 38} ${R[1] - nrm[1] * 38} Z`}
        fill={STEEL}
        stroke={INK}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <path d={`M ${R[0] + u[0] * 20} ${R[1] + u[1] * 20} L ${g.T[0]} ${g.T[1]}`} stroke={STEEL_D} strokeWidth={6} />
      <path d={`M ${R[0] + nrm[0] * 56} ${R[1] + nrm[1] * 56} L ${R[0] - nrm[0] * 56} ${R[1] - nrm[1] * 56}`} stroke={INK} strokeWidth={20} strokeLinecap="round" />
      <path d={`M ${R[0] + nrm[0] * 56} ${R[1] + nrm[1] * 56} L ${R[0] - nrm[0] * 56} ${R[1] - nrm[1] * 56}`} stroke={STEEL_D} strokeWidth={9} strokeLinecap="round" />
      <Boot at={footN} ang={bootAng} />
      {g.push > 0.6 ? <path d={`M ${footN[0] + 60} ${footN[1] - 70} l 40 -20 M ${footN[0] + 70} ${footN[1] - 30} l 46 -6`} stroke={INK} strokeWidth={7} strokeLinecap="round" opacity={0.7} /> : null}
      {/* near arm (rolled sleeve) */}
      <Seg a={sh} b={eN} w={56} col={SHIRT} />
      <Seg a={eN} b={handN} w={46} col={SKIN} />
      <circle cx={handN[0]} cy={handN[1]} r={29} fill={SKIN} stroke={INK} strokeWidth={6} />
      {pose === "hush" ? <path d={`M ${handN[0] - 6} ${handN[1] - 6} L 250 -232`} stroke={INK} strokeWidth={24} strokeLinecap="round" /> : null}
      {pose === "hush" ? <path d={`M ${handN[0] - 6} ${handN[1] - 6} L 250 -232`} stroke={SKIN} strokeWidth={13} strokeLinecap="round" /> : null}
    </g>
  );
};

// ---------- sets ----------
const Earth: React.FC<{ top: number; bottom: number; seed?: number }> = ({ top, bottom, seed = 0 }) => {
  const h = bottom - top;
  return (
    <g>
      <rect x={0} y={top} width={1080} height={h} fill={EARTH} />
      {[0.18, 0.42, 0.66, 0.86].map((k, i) => {
        const y = top + h * k;
        return <path key={i} d={`M 0 ${y} Q 270 ${y - 26 + i * 8} 540 ${y + 4} T 1080 ${y - 10}`} stroke={i % 2 ? "#6E4626" : "#4E3018"} strokeWidth={h * 0.09} fill="none" opacity={0.8} />;
      })}
      {new Array(9).fill(0).map((_, i) => {
        const x = ((i * 397 + seed * 131) % 1000) + 40;
        const y = top + ((i * 211 + seed * 77) % Math.max(1, h - 40)) + 20;
        return <ellipse key={`st${i}`} cx={x} cy={y} rx={16 + (i % 3) * 7} ry={11 + (i % 2) * 5} fill="#8C7A66" stroke="#3A2614" strokeWidth={4} />;
      })}
    </g>
  );
};

// candle stuck in a clay lump on a ledge, flickering, with a big warm glow
const Candle: React.FC<{ x: number; y: number; f: number; s?: number; r?: number }> = ({ x, y, f, s = 1, r = 420 }) => {
  const fl = 1 + 0.14 * Math.sin(f * 0.9) + 0.06 * Math.sin(f * 2.3);
  return (
    <g>
      <circle cx={x} cy={y - 70 * s} r={r * (0.96 + 0.04 * fl)} fill="url(#ep040glow)" />
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={6} rx={40} ry={18} fill={CLAY_D} stroke={INK} strokeWidth={6} />
        <rect x={-12} y={-70} width={24} height={72} rx={5} fill="#F7EEDC" stroke={INK} strokeWidth={6} />
        <path d="M -12 -60 q 6 14 0 26" stroke="#E9DDC4" strokeWidth={6} fill="none" />
        <g transform={`translate(0 -76) scale(1 ${fl})`}>
          <path d="M 0 -52 Q 22 -16 0 4 Q -22 -16 0 -52 Z" fill={FLAME} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M 0 -26 Q 9 -10 0 0 Q -9 -10 0 -26 Z" fill="#FFF6D0" />
        </g>
      </g>
    </g>
  );
};

// tunnel cavity from faceX to the right edge, roof..floor, with timber setts and a candle
const Tunnel: React.FC<{ f: number; roof: number; floor: number; faceX: number; posts?: number[]; candle?: P; candleS?: number }> = ({ f, roof, floor, faceX, posts = [], candle, candleS = 1 }) => (
  <g>
    <rect x={faceX} y={roof} width={1080 - faceX} height={floor - roof} fill={CLAY} />
    <rect x={faceX} y={roof} width={1080 - faceX} height={floor - roof} fill="url(#ep040wall)" />
    {/* spade-cut marks on the back wall */}
    {new Array(10).fill(0).map((_, i) => {
      const x = faceX + 60 + ((i * 173) % Math.max(1, 1080 - faceX - 80));
      const y = roof + 60 + ((i * 97) % Math.max(1, floor - roof - 120));
      return <path key={i} d={`M ${x} ${y} q 26 -22 52 0`} stroke={CLAY_D} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />;
    })}
    {candle ? <Candle x={candle[0]} y={candle[1]} f={f} s={candleS} /> : null}
    {/* setts: posts + roof lagging + floor boards */}
    {posts.map((px) => (
      <g key={px}>
        <rect x={px - 22} y={roof} width={44} height={floor - roof} fill={TIMBER} stroke={INK} strokeWidth={7} />
        <path d={`M ${px - 8} ${roof + 30} L ${px - 8} ${floor - 30}`} stroke={TIMBER_D} strokeWidth={5} opacity={0.6} />
      </g>
    ))}
    <rect x={faceX - 10} y={roof - 16} width={1100 - faceX} height={34} fill={TIMBER_D} stroke={INK} strokeWidth={7} />
    <rect x={faceX - 10} y={floor - 14} width={1100 - faceX} height={30} fill={TIMBER_D} stroke={INK} strokeWidth={7} />
  </g>
);

// the clay face – drawn after the figure so the blade bites into it
const Face: React.FC<{ faceX: number; roof: number; floor: number; bite?: number }> = ({ faceX, roof, floor, bite = 0 }) => {
  const h = floor - roof;
  const pts: string[] = [];
  for (let k = 0; k <= 8; k++) {
    const y = roof + (h * k) / 8;
    pts.push(`${faceX + (k % 2 ? 18 : -6)} ${y}`);
  }
  return (
    <g>
      <path d={`M 0 ${roof - 20} L ${faceX} ${roof - 20} L ${pts.join(" L ")} L ${faceX} ${floor + 20} L 0 ${floor + 20} Z`} fill={CLAY_DD} />
      <path d={`M ${faceX} ${roof - 20} L ${pts.join(" L ")} L ${faceX} ${floor + 20}`} stroke={INK} strokeWidth={8} fill="none" strokeLinejoin="round" />
      <path d={`M ${faceX - 40} ${roof + h * 0.3} q 20 30 0 60 M ${faceX - 60} ${roof + h * 0.62} q 24 26 0 54`} stroke={CLAY_D} strokeWidth={8} fill="none" />
      {bite > 0 ? <ellipse cx={faceX + 4} cy={roof + h * 0.86} rx={20 + 16 * bite} ry={12} fill={CLAY_L} opacity={0.8 * bite} /> : null}
    </g>
  );
};

// clay lumps levered off the face, tumbling to the floor
const Lumps: React.FC<{ f: number; tip: P; floor: number }> = ({ f, tip, floor }) => (
  <>
    {[0, 1, 2].map((k) => {
      const start = (Math.floor(f / CYC) - k) * CYC + CYC * 0.4;
      const age = f - start;
      if (age < 0 || age > 40) return null;
      const x = tip[0] + 30 + age * (4 + k);
      const y = Math.min(floor - 22, tip[1] - 20 + age * age * 0.9);
      return <path key={k} transform={`translate(${x} ${y}) rotate(${age * 14})`} d="M -26 -14 Q -6 -30 20 -18 Q 32 4 14 18 Q -14 26 -28 8 Z" fill={CLAY_L} stroke={INK} strokeWidth={5} />;
    })}
  </>
);

// night surface: sandbag parapet, barbed-wire pickets, a drifting flare
const Surface: React.FC<{ f: number; ground: number; flare?: boolean }> = ({ f, ground, flare = true }) => (
  <g>
    <rect x={0} y={0} width={1080} height={ground} fill="url(#ep040night)" />
    {[[140, 180], [380, 120], [620, 210], [860, 150], [980, 260], [250, 300], [720, 90]].map(([sx, sy], k) => (
      <circle key={k} cx={sx} cy={sy} r={3 + (k % 2) * 2} fill="#FFF3C4" opacity={0.5 + 0.4 * Math.sin(f / 7 + k)} />
    ))}
    {flare ? (
      <g transform={`translate(${760 - f * 0.6} ${150 + f * 0.9})`}>
        <circle r={110} fill="url(#ep040glow)" opacity={0.7} />
        <circle r={13} fill="#FFF6D0" stroke={INK} strokeWidth={4} />
        <path d="M 0 -14 L 0 -60" stroke="#FFF6D0" strokeWidth={3} opacity={0.6} />
      </g>
    ) : null}
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={8} />
    <rect x={0} y={ground - 40} width={1080} height={44} fill="#4B3A2A" />
    {[60, 300, 540, 780, 1020].map((px, k) => (
      <g key={px}>
        <path d={`M ${px} ${ground - 30} L ${px + 8} ${ground - 150}`} stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <path d={`M ${px} ${ground - 30} L ${px + 8} ${ground - 150}`} stroke={TIMBER_D} strokeWidth={7} strokeLinecap="round" />
        {k < 4 ? <path d={`M ${px + 8} ${ground - 130} q 30 -30 60 0 q 30 30 60 0 q 30 -30 60 0 q 30 30 60 0 M ${px + 8} ${ground - 80} q 30 -30 60 0 q 30 30 60 0 q 30 -30 60 0 q 30 30 60 0`} stroke="#3A3530" strokeWidth={5} fill="none" /> : null}
      </g>
    ))}
    {[0, 1, 2, 3].map((k) => (
      <rect key={`sb${k}`} x={-20 + k * 70} y={ground - 70 - (k % 2) * 6} width={86} height={44} rx={18} fill={SAND} stroke={INK} strokeWidth={5} />
    ))}
  </g>
);

const Defs: React.FC = () => (
  <defs>
    <radialGradient id="ep040glow">
      <stop offset="0%" stopColor={GLOW} stopOpacity={0.75} />
      <stop offset="45%" stopColor={GLOW} stopOpacity={0.28} />
      <stop offset="100%" stopColor={GLOW} stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep040hot">
      <stop offset="0%" stopColor="#FFB13B" stopOpacity={0.9} />
      <stop offset="100%" stopColor={HOT} stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep040wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#5A3418" stopOpacity={0.55} />
      <stop offset="30%" stopColor="#5A3418" stopOpacity={0} />
      <stop offset="80%" stopColor="#5A3418" stopOpacity={0} />
      <stop offset="100%" stopColor="#5A3418" stopOpacity={0.5} />
    </linearGradient>
    <linearGradient id="ep040night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#141A30" />
      <stop offset="100%" stopColor="#3B3F6E" />
    </linearGradient>
    <linearGradient id="ep040dawn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1E2A47" />
      <stop offset="70%" stopColor="#4A4A7A" />
      <stop offset="100%" stopColor="#B87A6A" />
    </linearGradient>
    <linearGradient id="ep040day" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#7EC3EC" />
      <stop offset="100%" stopColor="#D8F0FA" />
    </linearGradient>
    <linearGradient id="ep040storm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1B1F2E" />
      <stop offset="100%" stopColor="#3E4660" />
    </linearGradient>
  </defs>
);

// enemy listener kneeling in his trench, geophone discs on the floor, tubes to his ears (plain grey uniform, field cap)
const Listener: React.FC<{ x: number; y: number; s?: number; f: number; alarm?: boolean }> = ({ x, y, s = 1, f, alarm = false }) => {
  const lean = Math.sin(f / 9) * 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* discs + tubes */}
      <ellipse cx={150} cy={0} rx={44} ry={14} fill="#3A3F4E" stroke={INK} strokeWidth={5} />
      <ellipse cx={-120} cy={0} rx={40} ry={13} fill="#3A3F4E" stroke={INK} strokeWidth={5} />
      <g transform={`rotate(${lean} 0 0)`}>
        {/* legs kneeling */}
        <Seg a={[-20, -120]} b={[90, -40]} w={56} col={GREY_UD} />
        <Seg a={[90, -40]} b={[-40, -20]} w={50} col={GREY_UD} />
        <path d="M -40 -40 L -96 -36 L -92 0 L -36 0 Z" fill={BOOT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {/* torso bent forward */}
        <path d="M -20 -120 L 50 -300" stroke={INK} strokeWidth={130} strokeLinecap="round" />
        <path d="M -20 -120 L 50 -300" stroke={GREY_U} strokeWidth={116} strokeLinecap="round" />
        {[-200, -250].map((k, i) => (
          <circle key={k} cx={24 + i * 12} cy={k} r={8} fill="#D9C27A" stroke={INK} strokeWidth={3} />
        ))}
        {/* head */}
        <circle cx={92} cy={-388} r={64} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M 30 -414 Q 34 -470 96 -472 Q 160 -470 158 -414 Z" fill={GREY_U} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={30} y={-428} width={128} height={20} fill={BAND} stroke={INK} strokeWidth={5} />
        <circle cx={94} cy={-418} r={6} fill="#F2B544" stroke={INK} strokeWidth={2} />
        {alarm ? (
          <g>
            <circle cx={118} cy={-382} r={15} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={124} cy={-376} r={7} fill={INK} />
            <path d="M 100 -404 Q 118 -416 138 -406" stroke={HAIR} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <path d="M 104 -384 Q 118 -376 132 -384" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
        <path d="M 150 -380 Q 166 -366 150 -356" fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M 120 -346 L 142 -346" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        {/* ear pieces + tubes down to the discs */}
        <circle cx={40} cy={-380} r={14} fill="#3A3F4E" stroke={INK} strokeWidth={4} />
        <path d="M 40 -380 Q -60 -260 -120 -8" stroke={INK} strokeWidth={9} fill="none" />
        <path d="M 40 -380 Q 160 -250 150 -8" stroke={INK} strokeWidth={9} fill="none" />
        {/* hand cupped to the ear */}
        <Seg a={[30, -290]} b={[-30, -330]} w={44} col={GREY_U} />
        <Seg a={[-30, -330]} b={[22, -404]} w={36} col={GREY_U} />
        <circle cx={22} cy={-404} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
      </g>
    </g>
  );
};

// a stack of sandbagged explosive in a chamber, glowing (pulse 0–1)
const Charge: React.FC<{ x: number; y: number; s?: number; pulse?: number; outline?: boolean }> = ({ x, y, s = 1, pulse = 0.5, outline = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-40} r={150 + pulse * 30} fill="url(#ep040hot)" opacity={0.55 + 0.35 * pulse} />
    {[[-70, 0], [0, 0], [70, 0], [-35, -44], [35, -44], [0, -88]].map(([bx, by], k) => (
      <rect key={k} x={bx - 40} y={by - 24} width={80} height={48} rx={20} fill={outline ? "none" : k % 2 ? SAND_D : SAND} stroke={outline ? XLINE : INK} strokeWidth={6} />
    ))}
  </g>
);

// y of the Messines ridge line (two quadratic curves: (0,980)->(300,860)->(540,850) and (540,850)->(800,850)->(1080,960))
const ridgeY = (x: number) => {
  const seg = x <= 540 ? [[0, 980], [300, 860], [540, 850]] : [[540, 850], [800, 850], [1080, 960]];
  let best = seg[0][1];
  let bd = 1e9;
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const px = (1 - t) * (1 - t) * seg[0][0] + 2 * (1 - t) * t * seg[1][0] + t * t * seg[2][0];
    const py = (1 - t) * (1 - t) * seg[0][1] + 2 * (1 - t) * t * seg[1][1] + t * t * seg[2][1];
    if (Math.abs(px - x) < bd) {
      bd = Math.abs(px - x);
      best = py;
    }
  }
  return best;
};

// an eruption of earth + fire from an underground charge up through the ground (p = 0 → 1)
const Plume: React.FC<{ x: number; base: number; top: number; p: number; f: number; w?: number }> = ({ x, base, top, p, f, w = 150 }) => {
  if (p <= 0) return null;
  const grow = Easing.out(Easing.cubic)(Math.min(1, p));
  const h = (base - top) * grow;
  const late = Math.max(0, p - 1);
  const rise = Math.min(late, 6) * 14;
  const yTop = base - h - rise;
  const spread = 1 + Math.min(late, 6) * 0.06;
  const wob = Math.sin(f / 3 + x) * 8;
  const fade = interpolate(p, [4, 9], [1, 0.7], clamp);
  const W = w * spread;
  // jagged earth cone, wide at the top
  const cone = `M ${x - w * 0.22} ${base} L ${x - w * 0.34 + wob} ${base - h * 0.35} L ${x - w * 0.52} ${base - h * 0.62} L ${x - W * 0.7 - wob} ${yTop + 70} L ${x + W * 0.7 + wob} ${yTop + 70} L ${x + w * 0.5} ${base - h * 0.6} L ${x + w * 0.36 - wob} ${base - h * 0.32} L ${x + w * 0.22} ${base} Z`;
  return (
    <g opacity={fade}>
      <circle cx={x} cy={yTop + 80} r={W * 1.1} fill="url(#ep040hot)" opacity={0.6 * Math.max(0, 1 - late / 5)} />
      <path d={cone} fill="#6E4626" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${x - w * 0.14} ${base} L ${x - W * 0.34} ${yTop + 90} L ${x + W * 0.34} ${yTop + 90} L ${x + w * 0.14} ${base} Z`} fill="#FF9A2E" opacity={0.95 * Math.max(0.35, 1 - late / 4)} />
      <path d={`M ${x - w * 0.05} ${base} L ${x} ${yTop + 120} L ${x + w * 0.05} ${base} Z`} fill="#FFE27A" opacity={Math.max(0.2, 1 - late / 3)} />
      {/* billowing cloud cap */}
      {[[-0.62, 30, 0.42], [-0.28, -10, 0.5], [0.1, -30, 0.55], [0.46, 0, 0.48], [0.74, 40, 0.38], [-0.05, 50, 0.45]].map(([dx, dy, r], k) => (
        <circle key={k} cx={x + dx * W + wob * (k % 2 ? 1 : -1)} cy={yTop + dy + 40} r={W * r * Math.min(1, p + 0.25)} fill={k % 2 ? "#8A5A34" : "#7A4E2C"} stroke={INK} strokeWidth={7} />
      ))}
      <circle cx={x} cy={yTop + 70} r={W * 0.26} fill="#FF9A2E" opacity={Math.max(0, 0.9 - late / 3)} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = -Math.PI / 2 + (k - 2.5) * 0.45;
        const d = (h * 0.35 + 60) * Math.min(p, 2.5);
        return <circle key={`c${k}`} cx={x + Math.cos(a) * d} cy={yTop + 40 + Math.sin(a) * d * 0.45 + late * late * 6} r={12 + (k % 2) * 7} fill="#4E3018" stroke={INK} strokeWidth={4} />;
      })}
    </g>
  );
};

// a grazing Holstein cow, facing left (origin = ground under its body). graze 0 = head up, 1 = head down
const Cow: React.FC<{ x: number; y: number; s?: number; f: number; graze?: number }> = ({ x, y, s = 1, f, graze = 1 }) => {
  const tail = Math.sin(f / 6) * 14;
  const hx = -230;
  const hy = -250 + graze * 120;
  const chew = graze > 0.5 ? Math.sin(f / 2.5) * 4 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <clipPath id="ep040cowbody">
          <rect x={-200} y={-340} width={400} height={220} rx={100} />
        </clipPath>
      </defs>
      {/* legs */}
      {[-150, -100, 100, 150].map((lx, k) => (
        <g key={lx}>
          <rect x={lx - 22} y={-170} width={44} height={170} rx={14} fill={k % 2 ? "#E8E4DA" : "#FFFFFF"} stroke={INK} strokeWidth={7} />
          <rect x={lx - 24} y={-26} width={48} height={28} rx={8} fill="#3A3530" stroke={INK} strokeWidth={6} />
        </g>
      ))}
      {/* tail */}
      <path d={`M 190 -310 Q ${250 + tail} -230 ${230 + tail} -150`} stroke={INK} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d={`M ${230 + tail} -150 q -10 30 6 40 q 16 -14 -6 -40 Z`} fill="#3A3530" stroke={INK} strokeWidth={4} />
      {/* body + patches */}
      <rect x={-200} y={-340} width={400} height={220} rx={100} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
      <g clipPath="url(#ep040cowbody)">
        <path d="M -60 -350 Q 20 -300 -10 -250 Q -70 -220 -110 -280 Q -130 -330 -60 -350 Z" fill="#26221E" />
        <path d="M 90 -260 Q 160 -280 210 -230 L 210 -110 Q 120 -120 90 -180 Q 70 -230 90 -260 Z" fill="#26221E" />
        <path d="M -200 -200 Q -150 -220 -120 -170 Q -130 -120 -200 -120 Z" fill="#26221E" />
      </g>
      <ellipse cx={70} cy={-122} rx={40} ry={22} fill="#F4A6B4" stroke={INK} strokeWidth={5} />
      {/* neck + head */}
      <path d={`M -160 -300 Q ${hx + 20} ${hy - 40} ${hx} ${hy}`} stroke={INK} strokeWidth={96} strokeLinecap="round" fill="none" />
      <path d={`M -160 -300 Q ${hx + 20} ${hy - 40} ${hx} ${hy}`} stroke="#FFFFFF" strokeWidth={82} strokeLinecap="round" fill="none" />
      <g transform={`translate(${hx} ${hy}) rotate(${graze * 24})`}>
        <path d="M 30 -60 L 56 -96 L 60 -56 Z" fill="#F2E6C8" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <ellipse cx={46} cy={-36} rx={34} ry={16} fill="#FFFFFF" stroke={INK} strokeWidth={5} transform="rotate(-24 46 -36)" />
        <ellipse cx={0} cy={0} rx={62} ry={78} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
        <path d="M -30 -70 Q 10 -40 40 -66 L 40 -10 Q 0 0 -30 -20 Z" fill="#26221E" opacity={0.9} />
        <ellipse cx={-14} cy={58 + chew} rx={50} ry={34} fill="#F4A6B4" stroke={INK} strokeWidth={6} />
        <circle cx={-32} cy={58 + chew} r={6} fill={INK} />
        <circle cx={4} cy={58 + chew} r={6} fill={INK} />
        <circle cx={-30} cy={-14} r={10} fill={INK} />
        <circle cx={-33} cy={-18} r={3.5} fill="#FFFFFF" />
      </g>
      {graze > 0.5 ? <path d={`M ${hx - 70} ${-8} q 10 -40 20 0 q 10 -50 20 0 q 8 -36 18 0`} stroke={GRASS_D} strokeWidth={7} fill="none" /> : null}
    </g>
  );
};

const Poppy: React.FC<{ x: number; y: number; s?: number; f: number; k?: number }> = ({ x, y, s = 1, f, k = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(f / 12 + k) * 5})`}>
    <path d="M 0 0 Q 6 60 -4 120" stroke={GRASS_D} strokeWidth={8} fill="none" />
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx={0} cy={-22} rx={20} ry={26} fill={POPPY} stroke={INK} strokeWidth={4} transform={`rotate(${a} 0 0)`} />
    ))}
    <circle cx={0} cy={0} r={11} fill="#1E1A16" />
  </g>
);

const Pylon: React.FC<{ x: number; ground: number; h?: number }> = ({ x, ground, h = 560 }) => {
  const t = ground - h;
  return (
    <g stroke="#2A2E38" strokeWidth={9} fill="none" strokeLinecap="round">
      <path d={`M ${x - 90} ${ground} L ${x - 18} ${t} L ${x + 18} ${t} L ${x + 90} ${ground}`} />
      {[0.2, 0.4, 0.6, 0.8].map((k) => {
        const y = ground - h * k;
        const w = 90 - 72 * k;
        return <path key={k} d={`M ${x - w} ${y} L ${x + w} ${y} M ${x - w} ${y} L ${x + w - 14} ${y - h * 0.2} M ${x + w} ${y} L ${x - w + 14} ${y - h * 0.2}`} strokeWidth={6} />;
      })}
      <path d={`M ${x - 130} ${t + 70} L ${x + 130} ${t + 70} M ${x - 100} ${t + 150} L ${x + 100} ${t + 150}`} />
      <path d={`M ${x - 130} ${t + 70} Q ${x - 400} ${t + 160} ${x - 700} ${t + 90} M ${x + 130} ${t + 70} Q ${x + 300} ${t + 130} ${x + 500} ${t + 100}`} strokeWidth={4} />
    </g>
  );
};

const Bolt: React.FC<{ x: number; y: number; to: P; o: number }> = ({ x, y, to, o }) => {
  if (o <= 0) return null;
  const pts: P[] = [[x, y]];
  const n = 7;
  for (let k = 1; k < n; k++) {
    const t = k / n;
    pts.push([x + (to[0] - x) * t + (k % 2 ? 60 : -50), y + (to[1] - y) * t]);
  }
  pts.push(to);
  const d = "M " + pts.map((p) => `${p[0]} ${p[1]}`).join(" L ");
  return (
    <g opacity={o}>
      <path d={d} stroke="#FFF3A0" strokeWidth={40} fill="none" opacity={0.35} strokeLinejoin="round" />
      <path d={d} stroke={INK} strokeWidth={22} fill="none" strokeLinejoin="round" />
      <path d={d} stroke="#FFFBE0" strokeWidth={12} fill="none" strokeLinejoin="round" />
    </g>
  );
};

// sunny Flanders farmland today (or the 1955 storm) – horizon, farmhouse, field, cut edge at `ground`
const Farm: React.FC<{ f: number; ground: number; storm?: boolean }> = ({ f, ground, storm = false }) => (
  <g>
    <rect x={0} y={0} width={1080} height={ground} fill={storm ? "url(#ep040storm)" : "url(#ep040day)"} />
    {!storm ? <circle cx={860} cy={250} r={80} fill="#FFE68A" stroke="#F2B544" strokeWidth={10} /> : null}
    {!storm
      ? [[180, 640], [640, 560]].map(([cx, cy], k) => (
          <g key={k} transform={`translate(${cx + ((f * 0.4) % 60)} ${cy})`} opacity={0.95}>
            <ellipse cx={0} cy={0} rx={110} ry={42} fill="#FFFFFF" />
            <ellipse cx={-50} cy={-26} rx={60} ry={40} fill="#FFFFFF" />
            <ellipse cx={40} cy={-30} rx={56} ry={36} fill="#FFFFFF" />
          </g>
        ))
      : [[200, 300], [620, 240], [900, 380]].map(([cx, cy], k) => (
          <g key={k} transform={`translate(${cx} ${cy})`}>
            <ellipse cx={0} cy={0} rx={220} ry={70} fill="#2A2F42" />
            <ellipse cx={-80} cy={-40} rx={120} ry={70} fill="#323850" />
          </g>
        ))}
    {/* horizon: hedges + farmhouse */}
    <path d={`M 0 ${ground - 250} Q 270 ${ground - 280} 540 ${ground - 256} T 1080 ${ground - 262} L 1080 ${ground} L 0 ${ground} Z`} fill={storm ? "#3E5A3A" : GRASS} />
    {[60, 160, 920, 1010].map((tx, k) => (
      <circle key={tx} cx={tx} cy={ground - 290 - (k % 2) * 16} r={46} fill={storm ? "#2E4A2C" : GRASS_D} stroke={INK} strokeWidth={5} />
    ))}
    <g transform={`translate(240 ${ground - 250})`}>
      <rect x={-80} y={-90} width={160} height={90} fill={storm ? "#8A7A6A" : "#F2E6C8"} stroke={INK} strokeWidth={6} />
      <path d="M -96 -88 L 0 -160 L 96 -88 Z" fill={storm ? "#6A2E22" : "#C8553D"} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-20} y={-50} width={36} height={50} fill={TIMBER_D} stroke={INK} strokeWidth={4} />
      <rect x={30} y={-70} width={30} height={26} fill={storm ? "#FFD983" : "#9ED3E6"} stroke={INK} strokeWidth={4} />
    </g>
    {/* furrows */}
    {[0, 1, 2, 3].map((k) => (
      <path key={k} d={`M 0 ${ground - 200 + k * 50} Q 540 ${ground - 216 + k * 50} 1080 ${ground - 196 + k * 50}`} stroke={storm ? "#2E4A2C" : GRASS_D} strokeWidth={6} fill="none" opacity={0.6} />
    ))}
    <path d={`M 0 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={9} />
    {/* grass fringe on the cut edge */}
    {new Array(28).fill(0).map((_, k) => (
      <path key={`g${k}`} d={`M ${k * 40} ${ground} l 10 -26 l 10 26`} fill={storm ? "#3E5A3A" : GRASS} stroke={INK} strokeWidth={3} />
    ))}
  </g>
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

const XRayLayer: React.FC<{ top: number; scanY: number; f: number; charges: [number, number, number][]; tunnelY?: number }> = ({ top, scanY, f, charges, tunnelY }) => {
  if (scanY <= top) return null;
  const pulse = (Math.sin(f / 3) + 1) / 2;
  return (
    <g>
      <defs>
        <clipPath id="ep040xclip">
          <rect x={0} y={top} width={1080} height={scanY - top} />
        </clipPath>
      </defs>
      <g clipPath="url(#ep040xclip)">
        <rect x={0} y={top} width={1080} height={1920 - top} fill={XRAY} />
        {new Array(12).fill(0).map((_, k) => (
          <path key={`h${k}`} d={`M 0 ${top + k * 70} L 1080 ${top + k * 70}`} stroke={XLINE} strokeWidth={2} opacity={0.18} />
        ))}
        {new Array(16).fill(0).map((_, k) => (
          <path key={`v${k}`} d={`M ${k * 72} ${top} L ${k * 72} 1920`} stroke={XLINE} strokeWidth={2} opacity={0.18} />
        ))}
        {tunnelY ? <path d={`M -20 ${tunnelY} Q 540 ${tunnelY - 40} 1100 ${tunnelY + 10}`} stroke={XLINE} strokeWidth={34} fill="none" opacity={0.35} strokeDasharray="30 18" /> : null}
        {charges.map(([cx, cy, cs], k) => (
          <g key={k}>
            <Charge x={cx} y={cy} s={cs} pulse={pulse} outline />
            <text x={cx} y={cy - 150 * cs} textAnchor="middle" fontFamily={titleFont} fontSize={90 * cs + 20} fill={HOT} stroke={INK} strokeWidth={7} paintOrder="stroke">?</text>
          </g>
        ))}
      </g>
      {scanY < 1920 ? <rect x={0} y={scanY - 8} width={1080} height={16} fill={XLINE} opacity={0.9} /> : null}
    </g>
  );
};

export const ClayKicker: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "kick";
  const float: string[] = v.float ?? [];
  const floatAt: number[] | undefined = v.floatAt;
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let shake = 0;

  if (mode === "kick" || mode === "cross") {
    // frame 0: lying back on the cross, kicking the spade into the clay face, candle-lit, enemy wire on the surface above
    const ground = 580;
    const roof = 690;
    const floor = 1555;
    const faceX = 34;
    const fx = 600;
    const fy = 1402;
    const s = 1.25;
    const g = kickGeom(f, "kick");
    const tip: P = [fx + g.T[0] * s, fy + g.T[1] * s];
    const cross = mode === "cross";
    const pf = fx - 72 * s;
    const pfy = floor - 2;
    body = (
      <>
        <Surface f={f} ground={ground} />
        <Earth top={ground} bottom={1920} seed={1} />
        <Tunnel f={f} roof={roof} floor={floor} faceX={faceX} posts={[210, 900]} candle={[330, 900]} candleS={1.15} />
        {/* filled spoil bags waiting on the floor */}
        {[[930, 1505], [1022, 1505], [976, 1457]].map(([bx, by], k) => (
          <rect key={k} x={bx - 50} y={by - 28} width={100} height={56} rx={22} fill={k === 2 ? SAND_D : SAND} stroke={INK} strokeWidth={6} />
        ))}
        <Tunneller x={fx} y={fy} s={s} f={f} pose="kick" glow={cross ? 1 : 0} />
        <Lumps f={f} tip={[Math.max(tip[0], faceX - 10), tip[1] - 50]} floor={floor} />
        <Face faceX={faceX} roof={roof} floor={floor} bite={g.push} />
        {cross ? (
          <g>
            <path d={`M ${pf + 190} ${pfy} A 190 190 0 0 0 ${pf + 190 * Math.cos(0.857)} ${pfy - 190 * Math.sin(0.857)}`} stroke={C.mustard} strokeWidth={14} fill="none" />
            <path d={`M ${pf + 190} ${pfy} A 190 190 0 0 0 ${pf + 190 * Math.cos(0.857)} ${pfy - 190 * Math.sin(0.857)}`} stroke={INK} strokeWidth={4} fill="none" opacity={0.6} />
            <Pop x={pf + 300} y={pfy - 40} f={f} at={6} size={76} rot={0} text="45°" />
            {[0, 1, 2].map((k) => {
              const at = (v.kickAt ?? [0.45, 0.6, 0.75])[k] * dur;
              return f >= at && f < at + 14 ? <Pop key={k} x={260 + k * 30} y={1240 - k * 70} f={f} at={at} size={92} rot={-10 + k * 8} text="KICK!" /> : null;
            })}
          </g>
        ) : null}
      </>
    );
  } else if (mode === "listen") {
    // the enemy listens above; below, the kicker freezes – finger to his lips. Whisper-tense, dimmed.
    const ground = 620;
    const trenchB = 830;
    const roof = 1220;
    const floor = 1700;
    const faceX = 230;
    const alarm = f > dur * (v.alarmAt ?? 0.45);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={ground} fill="url(#ep040night)" />
        {[[140, 160], [380, 110], [640, 200], [900, 140], [980, 300], [240, 320]].map(([sx, sy], k) => (
          <circle key={k} cx={sx} cy={sy} r={3 + (k % 2) * 2} fill="#FFF3C4" opacity={0.5 + 0.4 * Math.sin(f / 7 + k)} />
        ))}
        <Earth top={ground} bottom={1920} seed={3} />
        <rect x={260} y={ground} width={600} height={trenchB - ground} fill="#2A2030" />
        <rect x={260} y={trenchB - 20} width={600} height={24} fill={TIMBER_D} stroke={INK} strokeWidth={5} />
        <path d={`M 0 ${ground} L 260 ${ground} L 260 ${trenchB} L 860 ${trenchB} L 860 ${ground} L 1080 ${ground}`} stroke={INK} strokeWidth={8} fill="none" />
        {[[200, 0], [270, -8], [880, 0], [950, -8]].map(([bx, dy], k) => (
          <rect key={k} x={bx - 50} y={ground - 46 + dy} width={100} height={48} rx={20} fill={SAND} stroke={INK} strokeWidth={5} />
        ))}
        <Listener x={470} y={trenchB - 10} s={0.62} f={f} alarm={alarm} />
        {alarm ? <Pop x={560} y={ground - 150} f={f} at={dur * (v.alarmAt ?? 0.45)} size={110} rot={8} text="?" /> : null}
        {/* sound rings rising from the tunnel */}
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 14) % 42) / 42;
          return <circle key={k} cx={470} cy={1330} r={60 + p * 420} fill="none" stroke="#FFE7A8" strokeWidth={6} strokeDasharray="18 22" opacity={(1 - p) * 0.45} />;
        })}
        <Tunnel f={f} roof={roof} floor={floor} faceX={faceX} posts={[930]} candle={[420, 1440]} candleS={0.8} />
        <Tunneller x={640} y={1610} s={0.72} f={f} pose="hush" />
        <Face faceX={faceX} roof={roof} floor={floor} />
        <Pop x={760} y={1300} f={f} at={8} size={64} rot={-6} text="shhh…" col={C.cream} />
        <rect x={0} y={0} width={1080} height={1920} fill="#0B0E1A" opacity={0.18} />
      </>
    );
  } else if (mode === "ridge") {
    // Messines Ridge before dawn: charges under the enemy line … then the mines go up (earth and fire only)
    const blast = (v.blastAt ?? 0.3) * dur;
    const lb = f - blast;
    const xs = [130, 290, 450, 610, 770, 930];
    const ys = [1260, 1210, 1180, 1190, 1220, 1270];
    const pulse = (Math.sin(f / 3) + 1) / 2;
    shake = lb > 0 ? Math.sin(lb * 2.7) * 16 * Math.max(0, 1 - lb / 30) : 0;
    const flash = lb >= 0 ? interpolate(lb, [0, 8], [0.95, 0], clamp) : 0;
    body = (
      <>
        <Earth top={820} bottom={1920} seed={5} />
        {/* tunnels to the charges */}
        {xs.map((cx, k) => (
          <path key={`t${k}`} d={`M ${k < 3 ? -20 : 1100} 1620 Q ${(cx + (k < 3 ? 0 : 1080)) / 2} 1560 ${cx} ${ys[k] + 10}`} stroke="#2A1A0E" strokeWidth={18} fill="none" opacity={0.85} />
        ))}
        {lb < 4
          ? xs.map((cx, k) => <Charge key={`c${k}`} x={cx} y={ys[k]} s={0.62} pulse={pulse} />)
          : xs.map((cx, k) => (
              <g key={`b${k}`} opacity={interpolate(lb, [4, 60], [1, 0.25], clamp)}>
                <ellipse cx={cx} cy={ys[k] - 30} rx={110} ry={80} fill="#2A1A0E" stroke={INK} strokeWidth={6} />
                <circle cx={cx} cy={ys[k] - 30} r={170} fill="url(#ep040hot)" />
              </g>
            ))}
        <path d="M 0 0 L 1080 0 L 1080 960 Q 800 850 540 850 Q 300 860 0 980 Z" fill="url(#ep040dawn)" />
        <path d="M 0 980 Q 300 860 540 850 Q 800 850 1080 960" stroke={GRASS_D} strokeWidth={26} fill="none" />
        <path d="M 0 980 Q 300 860 540 850 Q 800 850 1080 960" stroke={INK} strokeWidth={7} fill="none" />
        {/* enemy trench line (zigzag) + the lone tree */}
        <path d="M 0 962 Q 300 842 540 832 Q 800 832 1080 942" stroke="#4B3A2A" strokeWidth={22} fill="none" strokeDasharray="44 16" />
        <g transform="translate(560 852)">
          <path d="M 0 0 L 0 -90 M 0 -60 L -30 -96 M 0 -74 L 26 -110" stroke={INK} strokeWidth={10} strokeLinecap="round" />
        </g>
        {xs.map((cx, k) => (
          <Plume key={`p${k}`} x={cx} base={ridgeY(cx) + 6} top={300 + ((k * 2) % 3) * 70} p={(lb - [0, 3, 1, 4, 2, 5][k] * 1.2) / 10} f={f} w={k % 2 ? 230 : 200} />
        ))}
        {lb > 0 ? <Pop x={540} y={760} f={f} at={(v.quakeAt ?? 0.72) * dur} size={96} rot={-6} text="EARTHQUAKE?!" col={C.cream} /> : null}
        <rect x={0} y={0} width={1080} height={1920} fill="#FFF6D0" opacity={flash} />
      </>
    );
  } else if (mode === "field") {
    // TWIST picture – a sunny Flanders field today, a cow grazing … and an X-ray of charges still underground
    const ground = 1180;
    const answerAt = (v.answerAt ?? 0.55) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const scanY = interpolate(f, [answerAt, answerAt + 12], [ground, 1920], clamp);
    body = (
      <>
        <Earth top={ground} bottom={1920} seed={7} />
        <Farm f={f} ground={ground} />
        <Cow x={560} y={ground - 40} s={1.0} f={f} graze={f >= answerAt ? interpolate(f, [answerAt, answerAt + 8], [1, 0], clamp) : 1} />
        {[[80, 1100, 0.9], [170, 1130, 1.1], [880, 1120, 1.0], [985, 1095, 0.85], [1040, 1140, 1.0]].map(([px, py, ps], k) => (
          <Poppy key={k} x={px} y={py} s={ps} f={f} k={k} />
        ))}
        <XRayLayer top={ground + 8} scanY={scanY} f={f} charges={[[300, 1640, 0.95], [790, 1690, 0.9]]} tunnelY={1530} />
      </>
    );
  } else if (mode === "storm") {
    // 1955: lightning hits a pylon over a forgotten charge – it goes up. Then: more are still down there.
    const ground = 1180;
    const strike = (v.strikeAt ?? 0.1) * dur;
    const ls = f - strike;
    const scanAt = (v.scanAt ?? 0.55) * dur;
    const bolt = ls >= 0 && ls < 8 ? (ls % 3 === 2 ? 0.4 : 1) : 0;
    const flash = ls >= 0 ? interpolate(ls, [0, 7], [0.85, 0], clamp) : 0;
    shake = ls > 4 ? Math.sin(ls * 2.9) * 12 * Math.max(0, 1 - (ls - 4) / 24) : 0;
    const scanY = interpolate(f, [scanAt, scanAt + 12], [ground, 1920], clamp);
    body = (
      <>
        <Earth top={ground} bottom={1920} seed={9} />
        <Farm f={f} ground={ground} storm />
        <Pylon x={700} ground={ground - 30} h={520} />
        {ls < 5 ? (
          <Charge x={700} y={1640} s={0.8} pulse={(Math.sin(f / 3) + 1) / 2} />
        ) : (
          <g opacity={interpolate(ls, [5, 60], [1, 0.3], clamp)}>
            <ellipse cx={700} cy={1610} rx={130} ry={90} fill="#2A1A0E" stroke={INK} strokeWidth={6} />
            <circle cx={700} cy={1610} r={200} fill="url(#ep040hot)" />
            <path d="M 700 1520 L 700 1185" stroke="#FF9A2E" strokeWidth={22} opacity={0.7} strokeDasharray="30 16" />
          </g>
        )}
        <Plume x={700} base={ground + 4} top={480} p={(ls - 5) / 10} f={f} w={250} />
        <Bolt x={600} y={-20} to={[700, ground - 550]} o={bolt} />
        {new Array(26).fill(0).map((_, k) => {
          const x = (k * 83 + f * 22) % 1180 - 50;
          const y = ((k * 137 + f * 48) % (ground + 100)) - 60;
          return <path key={`r${k}`} d={`M ${x} ${y} l -14 44`} stroke="#B8C6E0" strokeWidth={5} opacity={0.6} />;
        })}
        <XRayLayer top={ground + 8} scanY={scanY} f={f} charges={[[140, 1720, 0.5], [340, 1780, 0.5], [540, 1700, 0.5], [740, 1790, 0.5], [940, 1720, 0.5]]} />
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFBE0" opacity={flash} />
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
      {mode === "field" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.55) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 108} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats key={float.join("|")} items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={floatAt} side={v.floatSide} size={v.floatSize ?? 64} />
    </Backdrop>
  );
};
