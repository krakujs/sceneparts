import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep052 Shotgun messenger – the express guard who rode up top beside the stagecoach driver, a short double-barrel
// across his knees and the strongbox of gold right under the seat. Moonlit desert canyon (not ep048's sunny plain).
// visual: { mode: "coach" | "box" | "fire" | "car" | "movie", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, fireAt? (fire, 0–1), openAt? (box, 0–1),
//           answer?, answerAccent?, answerAt?, answerSize? (car) }
// Cartoon action only: the buckshot never hits anyone – the bandits lose their hats and turn tail.
// No company logos anywhere (the strongbox is a plain green box with iron straps).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const DUSTER = "#C9A272";
const DUSTER_D = "#A07A4C";
const DUSTER_HI = "#E3C595";
const VEST = "#3C2A22";
const SHIRT = "#EFE3C8";
const SCARF = "#2E8C86";
const PANTS = "#4E3A2C";
const PANTS_D = "#3A2A1F";
const BOOT = "#2E1C12";
const SKIN = "#E7B48A";
const SKIN_D = "#C98E62";
const MUST = "#6A4426";
const HATC = "#7A4E2C";
const HAT_D = "#55341C";
const STEEL = "#5E6670";
const STEEL_HI = "#A9B3BD";
const STOCK = "#8A4E24";
const STOCK_D = "#5E3416";
const COACH = "#A8322A";
const COACH_D = "#7A2019";
const COACH_HI = "#CC4E40";
const TRIM = "#F2B544";
const WHEEL = "#E2A93B";
const LEATHER = "#4A3022";
const LEATHER_HI = "#6E4A32";
const BOXG = "#3F7A4A";
const BOXG_D = "#2B5634";
const IRON = "#2A2A2E";
const BRASS = "#E8B940";
const GOLD = "#FFD24A";
const GOLD_D = "#D9A21E";
const GOLD_HI = "#FFF2A8";
const DGREY = "#4A4A55";
const BEARD = "#D9D4CC";
const HORSE = "#8A4A26";
const HORSE_D = "#653318";
const MANE = "#2A1A10";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const wrap = (v: number, m: number) => ((v % m) + m) % m;
const rot = (p: P, a: number): P => [p[0] * Math.cos(rad(a)) - p[1] * Math.sin(rad(a)), p[0] * Math.sin(rad(a)) + p[1] * Math.cos(rad(a))];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[] }> = ({ items, f, dur, top = 330, at }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 64, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// ---------- scenery: moonlit desert canyon ----------
type Pal = { sky: [string, string, string]; far: string; mid: string; ground: string; groundD: string; cactus: string; moon: boolean };
const PALS: Record<"night" | "dusk", Pal> = {
  night: { sky: ["#141238", "#3D2A63", "#C0605A"], far: "#4C2F5C", mid: "#7E3A40", ground: "#B0603E", groundD: "#8C4A30", cactus: "#2B1D33", moon: true },
  dusk: { sky: ["#2A1E58", "#9A4A6A", "#F29A5A"], far: "#6A3A62", mid: "#A0483E", ground: "#D07A48", groundD: "#A85E36", cactus: "#3A2238", moon: true },
};

const Sky: React.FC<{ pal: Pal; horizon: number; moonX?: number; moonY?: number; f: number }> = ({ pal, horizon, moonX = 850, moonY = 700, f }) => (
  <g>
    <defs>
      <linearGradient id="ep052sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={pal.sky[0]} />
        <stop offset="60%" stopColor={pal.sky[1]} />
        <stop offset="100%" stopColor={pal.sky[2]} />
      </linearGradient>
      <radialGradient id="ep052moon">
        <stop offset="0%" stopColor="#FFE9B0" stopOpacity={0.7} />
        <stop offset="100%" stopColor="#FFE9B0" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={horizon + 40} fill="url(#ep052sky)" />
    {new Array(46).fill(0).map((_, i) => (
      <circle key={i} cx={random(`s52x${i}`) * 1080} cy={random(`s52y${i}`) * horizon * 0.7} r={1.5 + random(`s52r${i}`) * 2.5} fill="#FFF4DC" opacity={0.4 + 0.5 * Math.abs(Math.sin(f / (10 + i % 7 * 4) + i))} />
    ))}
    {pal.moon ? (
      <g>
        <circle cx={moonX} cy={moonY} r={250} fill="url(#ep052moon)" />
        <circle cx={moonX} cy={moonY} r={92} fill="#FFF1C9" stroke={INK} strokeWidth={5} />
        <circle cx={moonX - 28} cy={moonY - 18} r={15} fill="#EADBB0" />
        <circle cx={moonX + 30} cy={moonY + 26} r={21} fill="#EADBB0" />
      </g>
    ) : null}
  </g>
);

const mesaFar = (h: number) => `M 0 ${h + 10} L 0 ${h - 110} L 110 ${h - 110} L 140 ${h - 250} L 370 ${h - 250} L 410 ${h - 130} L 630 ${h - 130} L 650 ${h - 190} L 820 ${h - 190} L 860 ${h - 80} L 1000 ${h - 80} L 1040 ${h - 150} L 1160 ${h - 150} L 1200 ${h - 110} L 1200 ${h + 10} Z`;
const butte = (h: number) => `M 0 ${h + 10} L 60 ${h - 60} L 120 ${h - 70} L 160 ${h - 330} L 190 ${h - 350} L 330 ${h - 350} L 360 ${h - 320} L 400 ${h - 80} L 640 ${h - 60} L 700 ${h - 210} L 720 ${h - 380} L 760 ${h - 390} L 780 ${h - 210} L 830 ${h - 70} L 1500 ${h - 50} L 1500 ${h + 10} Z`;

export const Saguaro: React.FC<{ x: number; y: number; s?: number; col: string }> = ({ x, y, s = 1, col }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={col}>
    <rect x={-26} y={-320} width={52} height={320} rx={26} />
    <path d="M -20 -150 L -70 -150 Q -90 -150 -90 -170 L -90 -250 Q -90 -270 -72 -270 Q -54 -270 -54 -250 L -54 -186 L -20 -186 Z" />
    <path d="M 20 -200 L 66 -200 Q 84 -200 84 -220 L 84 -280 Q 84 -298 68 -298 Q 52 -298 52 -280 L 52 -236 L 20 -236 Z" />
  </g>
);

const Canyon: React.FC<{ f: number; pal: Pal; horizon: number; speed: number; seed: string; cacti?: boolean }> = ({ f, pal, horizon, speed, seed, cacti = true }) => {
  const o1 = -wrap(f * speed * 0.12, 1200);
  const o2 = -wrap(f * speed * 0.3, 1500);
  const o3 = -wrap(f * speed, 1400);
  return (
    <g>
      {[0, 1].map((k) => <path key={k} d={mesaFar(horizon)} transform={`translate(${o1 + k * 1200} 0)`} fill={pal.far} stroke={INK} strokeWidth={4} opacity={0.95} />)}
      {[0, 1].map((k) => <path key={k} d={butte(horizon + 30)} transform={`translate(${o2 + k * 1500} 0)`} fill={pal.mid} stroke={INK} strokeWidth={5} />)}
      <rect x={0} y={horizon + 30} width={1080} height={1920 - horizon} fill={pal.ground} />
      {new Array(9).fill(0).map((_, i) => {
        const yy = horizon + 60 + i * i * 14;
        const len = 80 + i * 30;
        const ox = wrap(i * 230 - f * speed * (0.5 + i * 0.15), 1300) - 150;
        return <path key={i} d={`M ${ox} ${yy} l ${len} 0`} stroke={pal.groundD} strokeWidth={6 + i} strokeLinecap="round" />;
      })}
      {cacti
        ? [0, 1, 2, 3].map((k) => {
            const x = o3 + k * 700 + random(`${seed}c${k}`) * 200;
            if (x < -200 || x > 1300) return null;
            return <Saguaro key={k} x={x} y={horizon + 60 + (k % 2) * 30} s={0.6 + (k % 2) * 0.25} col={pal.cactus} />;
          })
        : null}
    </g>
  );
};

const Dust: React.FC<{ x: number; y: number; f: number; s?: number; col?: string; dir?: 1 | -1 }> = ({ x, y, f, s = 1, col = "#E3B98A", dir = -1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {new Array(9).fill(0).map((_, i) => {
      const p = wrap(f / 16 + i / 9, 1);
      return <circle key={i} cx={dir * p * 420 + Math.sin(i * 7) * 30} cy={-p * 120 + Math.cos(i * 3) * 20} r={30 + p * 70} fill={col} opacity={0.75 * (1 - p)} />;
    })}
  </g>
);

const SpeedLines: React.FC<{ f: number; y0: number; y1: number; seed: string; col?: string }> = ({ f, y0, y1, seed, col = "#FFFFFF" }) => (
  <g>
    {new Array(10).fill(0).map((_, i) => {
      const y = lerp(y0, y1, random(`${seed}y${i}`));
      const x = 1200 - wrap(f * 60 + random(`${seed}x${i}`) * 1400, 1500);
      return <path key={i} d={`M ${x} ${y} l 160 0`} stroke={col} strokeWidth={5} strokeLinecap="round" opacity={0.35} />;
    })}
  </g>
);

// ---------- the messenger shotgun (short double barrel). Local: butt at 0, muzzle at +346 ----------
const MuzzleFlash: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 60 -50 L 50 -14 L 130 -20 L 60 8 L 120 50 L 40 26 L 20 70 L 4 20 Z" fill={GOLD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 10 0 L 50 -22 L 70 2 L 44 18 Z" fill={GOLD_HI} />
  </g>
);

const Gun: React.FC<{ flash?: number }> = ({ flash = 0 }) => (
  <g>
    <path d="M 0 -16 L 0 24 Q 56 26 112 10 L 114 -8 Q 60 -10 0 -16 Z" fill={STOCK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 12 -6 Q 60 -4 102 0" stroke={STOCK_D} strokeWidth={4} fill="none" />
    <path d="M 120 -14 L 110 -32 L 124 -34 L 134 -14 Z M 138 -14 L 130 -30 L 144 -32 L 150 -14 Z" fill={STEEL} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <rect x={108} y={-16} width={46} height={28} rx={6} fill={STEEL} stroke={INK} strokeWidth={6} />
    <path d="M 114 12 Q 126 34 142 12" stroke={INK} strokeWidth={5} fill="none" />
    <rect x={150} y={-16} width={196} height={13} rx={4} fill={STEEL} stroke={INK} strokeWidth={5} />
    <rect x={150} y={-3} width={196} height={13} rx={4} fill={STEEL} stroke={INK} strokeWidth={5} />
    <path d="M 156 -11 L 338 -11" stroke={STEEL_HI} strokeWidth={3} strokeLinecap="round" />
    <path d="M 154 10 L 240 10 Q 246 24 234 28 L 160 28 Z" fill={STOCK} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {flash > 0 ? <MuzzleFlash x={346} y={-3} s={flash} /> : null}
  </g>
);

const Boot: React.FC<{ a: P; col?: string }> = ({ a, col = BOOT }) => (
  <g transform={`translate(${a[0]} ${a[1]})`}>
    <path d="M -26 -46 L 22 -46 L 26 -8 L 70 -2 Q 82 4 76 20 L -30 20 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -30 8 L 76 8" stroke="#5A3A26" strokeWidth={4} />
    <circle cx={-40} cy={4} r={11} fill={BRASS} stroke={INK} strokeWidth={4} />
  </g>
);

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string }> = ({ a, b, c, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 13} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

type Face = "grit" | "shout" | "grin" | "shock";

const GuardHead: React.FC<{ look: 1 | -1; face: Face; f: number; wind: number }> = ({ look, face, f, wind }) => {
  const w = Math.sin(f / 2.3) * 6 * wind;
  return (
    <g transform={`translate(14 -292) scale(${look} 1)`}>
      <ellipse cx={-22} cy={8} rx={13} ry={19} fill={SKIN} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={0} r={56} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -56 -6 Q -62 34 -30 44 L -36 -14 Z" fill={MUST} stroke={INK} strokeWidth={4} />
      <path d={face === "shock" ? "M 12 -32 L 42 -36" : "M 10 -30 L 44 -18"} stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <ellipse cx={30} cy={-6} rx={face === "shock" ? 9 : 7} ry={face === "shock" ? 11 : 8} fill={INK} />
      <circle cx={32} cy={-9} r={2.5} fill="#FFFFFF" />
      <path d="M 50 -14 Q 72 6 52 16" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {face === "shout" || face === "shock" ? <ellipse cx={42} cy={44} rx={15} ry={face === "shout" ? 14 : 10} fill="#5A1E1A" stroke={INK} strokeWidth={4} /> : null}
      {face === "grin" ? <path d="M 26 42 Q 44 56 60 40" stroke={INK} strokeWidth={5} fill="#FFFFFF" /> : null}
      <path d="M 18 18 Q 44 6 68 18 Q 78 38 64 48 Q 52 32 42 36 Q 30 46 12 42 Q 8 26 18 18 Z" fill={MUST} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {/* wide-brim hat, brim lifting in the wind */}
      <path d={`M -100 ${-34 + w * 0.5} Q 0 -62 112 -38 Q 120 -26 106 -22 Q 0 -44 -104 ${-22 + w} Q -112 -28 -100 ${-34 + w * 0.5} Z`} fill={HATC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -46 -44 Q -52 -122 -12 -124 Q 6 -110 22 -124 Q 58 -120 52 -46 Z" fill={HATC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -47 -62 Q 2 -72 52 -64 L 52 -48 Q 2 -58 -46 -46 Z" fill={HAT_D} stroke={INK} strokeWidth={4} />
      <path d="M -20 -112 Q -18 -80 -10 -64" stroke={HAT_D} strokeWidth={4} fill="none" />
    </g>
  );
};

// The shotgun messenger, seated, facing right. Origin = seat point. aim = gun angle (deg, 0 = right, 180 = left, 225 = up-left).
// rest = gun across the knees. fire = 0..1 (flash + recoil).
export const Guard: React.FC<{ x: number; y: number; s?: number; f: number; aim?: number; rest?: boolean; fire?: number; face?: Face; wind?: number; look?: 1 | -1 }> = ({ x, y, s = 1, f, aim = 225, rest = false, fire = 0, face = "grit", wind = 1, look }) => {
  const w = Math.sin(f / 2.1) * 14 * wind;
  const ang = rest ? -10 : aim - fire * 10;
  const left = Math.cos(rad(ang)) < 0;
  const flipY = left ? -1 : 1;
  const back = fire * 14;
  const P0: P = rest ? [-120, -60] : [10 - Math.cos(rad(ang)) * back, -178 - Math.sin(rad(ang)) * back];
  const wp = (lx: number, ly: number): P => {
    const r = rot([lx, ly * flipY], ang);
    return [P0[0] + r[0], P0[1] + r[1]];
  };
  const G = wp(100, 8);
  const F = wp(200, 22);
  const Sn: P = [44, -206];
  const Sf: P = [-34, -210];
  const elbow = (a: P, b: P, dy: number): P => [(a[0] + b[0]) / 2 + 10, (a[1] + b[1]) / 2 + dy];
  const lk: 1 | -1 = look ?? (left ? -1 : 1);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* duster tail flapping back in the wind */}
      <path d={`M -56 -150 Q ${-130 - w} -90 ${-190 - w * 1.4} ${-6 + w} L ${-130 - w * 0.6} 40 Q -80 26 -60 14 Z`} fill={DUSTER_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* far leg */}
      <Limb a={[6, -24]} b={[90, -50]} c={[150, -40]} w={50} col={PANTS_D} />
      <Limb a={[150, -40]} b={[160, 70]} c={[160, 186]} w={44} col={PANTS_D} />
      <Boot a={[160, 196]} col="#22150D" />
      {/* torso */}
      <path d="M -58 -226 Q 6 -246 68 -228 Q 86 -120 82 -14 L -68 -14 Q -80 -120 -58 -226 Z" fill={DUSTER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 8 -232 L 46 -232 L 62 -36 L 22 -36 Z" fill={VEST} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 16 -234 L 40 -234 L 28 -196 Z" fill={SHIRT} />
      <circle cx={40} cy={-150} r={5} fill={BRASS} />
      <circle cx={44} cy={-110} r={5} fill={BRASS} />
      <path d="M 4 -228 Q -4 -150 16 -36" stroke={DUSTER_D} strokeWidth={6} fill="none" />
      <path d="M -66 -224 Q 6 -254 76 -226 L 84 -170 Q 6 -150 -72 -172 Z" fill={DUSTER_HI} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* lap of the coat */}
      <path d="M -64 -50 L 74 -52 L 128 -30 L 120 22 L -66 22 Z" fill={DUSTER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* near leg */}
      <Limb a={[60, -10]} b={[130, -28]} c={[176, -16]} w={54} col={PANTS} />
      <Limb a={[176, -16]} b={[186, 90]} c={[188, 200]} w={46} col={PANTS} />
      <Boot a={[188, 210]} />
      {/* scarf */}
      <path d={`M 0 -238 Q ${-60 - w} ${-250 + w * 0.4} ${-110 - w * 1.5} ${-230 + w} L ${-96 - w} ${-206 + w * 0.6} Q -50 -220 4 -220 Z`} fill={SCARF} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-2} y={-262} width={34} height={36} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <path d="M -6 -236 Q 20 -224 46 -236 L 42 -218 Q 20 -208 -2 -218 Z" fill={SCARF} stroke={INK} strokeWidth={5} />
      {/* far arm → fore-end, gun, near arm → grip */}
      <Limb a={Sf} b={elbow(Sf, F, 40)} c={F} w={40} col={DUSTER_D} />
      <g transform={`translate(${P0[0]} ${P0[1]}) rotate(${ang}) scale(1 ${flipY})`}>
        <Gun flash={fire} />
      </g>
      <circle cx={F[0]} cy={F[1]} r={21} fill={SKIN} stroke={INK} strokeWidth={5} />
      <Limb a={Sn} b={elbow(Sn, G, 36)} c={G} w={42} col={DUSTER} />
      <circle cx={G[0]} cy={G[1]} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
      <GuardHead look={lk} face={face} f={f} wind={wind} />
    </g>
  );
};

// the driver ("whip"), seated to the messenger's right, reins forward, whip up. Origin = seat point, facing right.
const Driver: React.FC<{ x: number; y: number; s?: number; f: number; face?: Face; reinTo?: P }> = ({ x, y, s = 1, f, face = "grit", reinTo }) => {
  const w = Math.sin(f / 2.4) * 10;
  const H: P = [150, -112 + Math.sin(f / 3) * 6];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Limb a={[40, -10]} b={[120, -30]} c={[170, -18]} w={50} col="#3B3B46" />
      <Limb a={[170, -18]} b={[178, 90]} c={[180, 196]} w={44} col="#3B3B46" />
      <Boot a={[180, 206]} />
      <path d="M -56 -214 Q 6 -236 64 -216 Q 82 -120 78 -10 L -64 -10 Q -76 -120 -56 -214 Z" fill={DGREY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -60 -48 L 70 -50 L 120 -26 L 112 22 L -62 22 Z" fill={DGREY} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {/* whip: stock up from the near hand, lash curling back */}
      <path d={`M 170 -110 L 210 -460 Q ${120 - w * 3} ${-520 + w} ${40 - w * 4} ${-470 + w * 2}`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 170 -110 L 202 -390" stroke={STOCK} strokeWidth={10} strokeLinecap="round" />
      <Limb a={[-24, -196]} b={[60, -120]} c={[H[0] - 10, H[1] + 6]} w={38} col="#383842" />
      <Limb a={[40, -200]} b={[110, -140]} c={H} w={40} col={DGREY} />
      {reinTo ? <path d={`M ${H[0]} ${H[1]} Q ${(H[0] + reinTo[0]) / 2} ${(H[1] + reinTo[1]) / 2 + 40} ${reinTo[0]} ${reinTo[1]}`} stroke={LEATHER} strokeWidth={8} fill="none" /> : null}
      <circle cx={H[0]} cy={H[1]} r={21} fill={SKIN} stroke={INK} strokeWidth={5} />
      <rect x={-4} y={-252} width={32} height={34} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <g transform="translate(12 -284)">
        <circle cx={0} cy={0} r={52} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M -40 14 Q -30 74 20 70 Q 58 64 54 16 Q 30 30 10 24 Q -20 30 -40 14 Z" fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d={face === "shock" ? "M 12 -26 L 38 -30" : "M 12 -24 L 40 -14"} stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={28} cy={-4} rx={6} ry={8} fill={INK} />
        <path d="M 46 -8 Q 64 8 48 16" fill={SKIN} stroke={INK} strokeWidth={5} />
        {face === "shock" || face === "shout" ? <ellipse cx={34} cy={36} rx={11} ry={10} fill="#5A1E1A" stroke={INK} strokeWidth={4} /> : null}
        <ellipse cx={0} cy={-38} rx={78} ry={14} fill="#26262C" stroke={INK} strokeWidth={6} />
        <path d="M -44 -40 Q -50 -104 0 -106 Q 50 -104 44 -40 Z" fill="#26262C" stroke={INK} strokeWidth={6} />
        <path d="M -44 -52 Q 0 -60 44 -52" stroke="#55556A" strokeWidth={8} fill="none" />
      </g>
    </g>
  );
};

// the treasure box: plain green wooden box with iron straps and a padlock. Origin = bottom centre. open: 0..1 (lid up, gold glowing)
export const Strongbox: React.FC<{ x: number; y: number; s?: number; open?: number; f: number }> = ({ x, y, s = 1, open = 0, f }) => {
  const lid = -open * 105;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {open > 0 ? (
        <g opacity={open}>
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <path key={k} d={`M 0 -150 L ${-260 + k * 87} -520 L ${-210 + k * 87} -520 Z`} fill={GOLD_HI} opacity={0.22 + 0.12 * Math.sin(f / 4 + k)} />
          ))}
        </g>
      ) : null}
      {/* back of lid when open */}
      {open > 0 ? (
        <g transform={`translate(0 -150) scale(1 ${Math.cos(rad(lid))})`}>
          <rect x={-128} y={-60} width={256} height={60} rx={8} fill={BOXG_D} stroke={INK} strokeWidth={7} />
        </g>
      ) : null}
      {open > 0 ? (
        <g>
          <path d="M -118 -150 Q -90 -232 -30 -214 Q 0 -262 40 -218 Q 96 -240 118 -150 Z" fill={GOLD} stroke={INK} strokeWidth={6} />
          {[[-70, -190], [-20, -214], [36, -200], [80, -176], [-96, -164], [6, -176]].map(([cx, cy], k) => (
            <ellipse key={k} cx={cx} cy={cy - popIn(f, 4 + k * 2, 8) * 8} rx={22} ry={11} fill={GOLD} stroke={GOLD_D} strokeWidth={4} />
          ))}
          <path d="M -60 -200 L 20 -200 L 34 -168 L -74 -168 Z" fill={GOLD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -56 -196 L 16 -196" stroke={GOLD_HI} strokeWidth={4} />
          <path d="M 40 -230 Q 70 -250 92 -228 Q 100 -190 66 -180 Q 34 -190 40 -230 Z" fill="#C9A06A" stroke={INK} strokeWidth={5} />
          <path d="M 48 -228 Q 68 -236 86 -228" stroke={INK} strokeWidth={4} fill="none" />
        </g>
      ) : null}
      <rect x={-130} y={-150} width={260} height={150} rx={8} fill={BOXG} stroke={INK} strokeWidth={8} />
      <path d="M -120 -110 L 120 -110 M -120 -60 L 120 -60" stroke={BOXG_D} strokeWidth={5} />
      {[-88, 88].map((sx) => <rect key={sx} x={sx - 13} y={-150} width={26} height={150} fill={IRON} stroke={INK} strokeWidth={4} />)}
      {[-88, 88].map((sx) => [-130, -30].map((sy) => <circle key={`${sx}${sy}`} cx={sx} cy={sy} r={5} fill={STEEL_HI} />))}
      {[[-130, -150], [130, -150], [-130, 0], [130, 0]].map(([cx, cy], k) => <rect key={k} x={cx - 14} y={cy - 14} width={28} height={28} rx={4} fill={BRASS} stroke={INK} strokeWidth={4} />)}
      {open === 0 ? <rect x={-136} y={-164} width={272} height={30} rx={8} fill={BOXG_D} stroke={INK} strokeWidth={7} /> : null}
      <g transform={`translate(0 ${open > 0 ? -90 : -112})`}>
        <path d="M -16 0 L -16 -18 Q 0 -38 16 -18 L 16 0" stroke={INK} strokeWidth={7} fill="none" />
        <rect x={-24} y={-2} width={48} height={40} rx={7} fill={BRASS} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={16} r={5} fill={INK} />
      </g>
    </g>
  );
};

// ---------- stagecoach (Concord-style, no lettering) ----------
const Wheel: React.FC<{ x: number; y: number; r: number; f: number; spin?: number }> = ({ x, y, r, f, spin = 9 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="none" stroke={INK} strokeWidth={30} />
    <circle r={r} fill="none" stroke={WHEEL} strokeWidth={18} />
    <g transform={`rotate(${f * spin})`}>
      {new Array(12).fill(0).map((_, k) => (
        <path key={k} d={`M 0 0 L ${Math.cos(rad(k * 30)) * r} ${Math.sin(rad(k * 30)) * r}`} stroke={INK} strokeWidth={14} />
      ))}
      {new Array(12).fill(0).map((_, k) => (
        <path key={k} d={`M 0 0 L ${Math.cos(rad(k * 30)) * r} ${Math.sin(rad(k * 30)) * r}`} stroke={WHEEL} strokeWidth={7} />
      ))}
    </g>
    <circle r={r * 0.16} fill={WHEEL} stroke={INK} strokeWidth={7} />
  </g>
);

// origin = top front of the driver's bench. The front boot under the bench holds the strongbox.
const Coach: React.FC<{ x: number; y: number; s?: number; f: number; bob?: number; children?: React.ReactNode; glow?: boolean; boxOpen?: number }> = ({ x, y, s = 1, f, bob = 0, children, glow = true, boxOpen = 0 }) => (
  <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
    <Wheel x={-780} y={560 - bob / s} r={250} f={f} />
    <path d="M -930 470 L 80 470" stroke={INK} strokeWidth={30} strokeLinecap="round" />
    <path d="M -930 470 L 80 470" stroke={WHEEL} strokeWidth={16} strokeLinecap="round" />
    <path d="M -880 420 Q -560 500 -240 420" stroke={LEATHER} strokeWidth={22} fill="none" />
    {/* body */}
    <path d="M -230 -40 L -910 -40 Q -980 200 -880 420 L -250 420 Q -170 200 -230 -40 Z" fill={COACH} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -905 -14 L -236 -14 M -892 392 L -252 392" stroke={TRIM} strokeWidth={10} />
    <path d="M -870 30 Q -900 200 -850 360 M -270 30 Q -240 200 -270 360" stroke={COACH_HI} strokeWidth={8} fill="none" />
    {[-800, -420].map((wx) => (
      <g key={wx}>
        <rect x={wx} y={40} width={220} height={150} rx={18} fill={glow ? "#FFD983" : "#2A1E22"} stroke={INK} strokeWidth={7} />
        <path d={`M ${wx + 110} 40 L ${wx + 110} 190`} stroke={COACH_D} strokeWidth={8} />
      </g>
    ))}
    <rect x={-560} y={220} width={120} height={150} rx={10} fill={COACH_D} stroke={INK} strokeWidth={6} />
    {/* roof rail + luggage */}
    <rect x={-910} y={-74} width={680} height={20} rx={8} fill={COACH_D} stroke={INK} strokeWidth={6} />
    {[-880, -720, -560, -400, -260].map((px) => <rect key={px} x={px} y={-110} width={12} height={46} fill={INK} />)}
    <path d="M -880 -110 L -250 -110" stroke={INK} strokeWidth={8} />
    <path d="M -840 -74 Q -800 -170 -680 -150 Q -620 -170 -600 -74 Z" fill="#CBB892" stroke={INK} strokeWidth={6} />
    <rect x={-580} y={-150} width={150} height={76} rx={10} fill="#8A5A34" stroke={INK} strokeWidth={6} />
    {/* lantern */}
    <circle cx={-246} cy={70} r={110} fill={GOLD_HI} opacity={glow ? 0.28 + 0.06 * Math.sin(f / 3) : 0} />
    <path d="M -236 40 L -206 40" stroke={INK} strokeWidth={8} />
    <rect x={-270} y={34} width={48} height={70} rx={8} fill={glow ? GOLD : "#8A7A50"} stroke={INK} strokeWidth={6} />
    <path d="M -276 34 L -246 10 L -216 34 Z" fill={INK} />
    {/* bench + backrest */}
    <rect x={-262} y={-130} width={26} height={140} rx={8} fill={LEATHER} stroke={INK} strokeWidth={6} />
    {/* front boot (open at the side: the strongbox rides here, right under the seat) */}
    <path d="M -246 20 L 76 20 L 62 246 L -226 246 Z" fill="#2A1C14" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <Strongbox x={-80} y={240} s={0.8} f={f} open={boxOpen} />
    <path d="M -246 20 L 76 20 L 72 64 Q -90 84 -244 62 Z" fill={LEATHER_HI} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-262} y={-6} width={360} height={30} rx={8} fill={LEATHER} stroke={INK} strokeWidth={7} />
    {/* footboard */}
    <path d="M -40 246 L 270 220 L 276 242 L -40 270 Z" fill="#8A5A34" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 120 236 L 60 470 M 240 226 L 180 470" stroke={INK} strokeWidth={10} />
    <Wheel x={-30} y={620 - bob / s} r={200} f={f} />
    {children}
  </g>
);

// simple galloping horse facing right, origin = barrel centre
const HorseRun: React.FC<{ x: number; y: number; s?: number; f: number; col?: string; dark?: string; stride?: number; off?: number }> = ({ x, y, s = 1, f, col = HORSE, dark = HORSE_D, stride = 11, off = 0 }) => {
  const t = f / stride + off;
  const bob = 10 * Math.cos(2 * Math.PI * t);
  const leg = (hx: number, ph: number, front: boolean, c: string) => {
    const p = 2 * Math.PI * (t + ph);
    const a1 = (front ? 10 : -8) + 40 * Math.sin(p);
    const k: P = [hx + 120 * Math.sin(rad(a1)), 50 + 120 * Math.cos(rad(a1))];
    return <Limb a={[hx, 40]} b={[(hx + k[0]) / 2, (40 + k[1]) / 2]} c={k} w={46} col={c} />;
  };
  const shin = (hx: number, ph: number, front: boolean, c: string) => {
    const p = 2 * Math.PI * (t + ph);
    const a1 = (front ? 10 : -8) + 40 * Math.sin(p);
    const a2 = front ? -90 * Math.max(0, Math.cos(p)) : 70 * Math.max(0, Math.cos(p));
    const k: P = [hx + 120 * Math.sin(rad(a1)), 50 + 120 * Math.cos(rad(a1))];
    const ft: P = [k[0] + 120 * Math.sin(rad(a1 + a2)), k[1] + 120 * Math.cos(rad(a1 + a2))];
    return (
      <g>
        <Limb a={k} b={[(k[0] + ft[0]) / 2, (k[1] + ft[1]) / 2]} c={ft} w={28} col={c} />
        <circle cx={ft[0]} cy={ft[1]} r={18} fill={INK} />
      </g>
    );
  };
  const tw = 16 * Math.sin(f / 2.5);
  return (
    <g transform={`translate(${x} ${y + bob * s}) scale(${s})`}>
      {leg(-130, 0.1, false, dark)}
      {shin(-130, 0.1, false, dark)}
      {leg(130, 0.6, true, dark)}
      {shin(130, 0.6, true, dark)}
      <path d={`M -200 -40 Q -290 ${-60 + tw} -350 ${10 + tw} Q -280 ${10 + tw / 2} -210 0 Z`} fill={MANE} stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={0} rx={210} ry={86} fill={col} stroke={INK} strokeWidth={8} />
      <path d="M 120 -40 Q 170 -150 230 -200 L 300 -150 Q 240 -90 200 30 Z" fill={col} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 220 -214 Q 270 -240 300 -200 L 360 -120 Q 370 -96 340 -92 L 270 -130 Z" fill={col} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 130 -50 Q 170 -150 222 -206 L 206 -150 Q 170 -100 150 -30 Z" fill={MANE} />
      <circle cx={280} cy={-170} r={8} fill={INK} />
      <path d="M 236 -214 L 226 -250 L 254 -222 Z" fill={col} stroke={INK} strokeWidth={5} />
      {leg(-100, 0.0, false, col)}
      {shin(-100, 0.0, false, col)}
      {leg(160, 0.5, true, col)}
      {shin(160, 0.5, true, col)}
    </g>
  );
};

// masked road agent on a dark horse (no weapon drawn). hatOff 0..1 sends the hat flying; flee turns him around.
const Bandit: React.FC<{ x: number; y: number; s?: number; f: number; hatOff?: number; flee?: boolean; off?: number }> = ({ x, y, s = 1, f, hatOff = 0, flee = false, off = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${flee ? -s : s} ${s})`}>
    <HorseRun x={0} y={0} f={f} col="#4A3326" dark="#33231A" stride={9} off={off} />
    <g transform={`translate(-10 ${-80 + 8 * Math.cos((2 * Math.PI * f) / 9)})`}>
      <path d="M -40 0 Q -50 -120 0 -170 L 60 -160 Q 70 -60 50 0 Z" fill="#2E2A36" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <Limb a={[40, -140]} b={[110, -100]} c={[170, -60]} w={30} col="#2E2A36" />
      <circle cx={20} cy={-215} r={48} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -26 -206 Q 20 -190 66 -210 L 64 -170 Q 20 -150 -24 -172 Z" fill={C.brick} stroke={INK} strokeWidth={5} />
      <ellipse cx={36} cy={-226} rx={6} ry={7} fill={INK} />
      <path d="M 16 -240 L 50 -236" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <g transform={`translate(${20 - hatOff * 60} ${-250 - hatOff * 260}) rotate(${-hatOff * 260})`}>
        <ellipse cx={0} cy={0} rx={82} ry={14} fill="#1E1A22" stroke={INK} strokeWidth={6} />
        <path d="M -40 -2 Q -44 -70 0 -72 Q 44 -70 40 -2 Z" fill="#1E1A22" stroke={INK} strokeWidth={6} />
      </g>
    </g>
  </g>
);

// today: a teen sprinting for the front seat (facing right; flip with facing=-1). Origin = ground between the feet.
const Teen: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1; shirt: string; hair?: string; shout?: boolean; armUp?: boolean; run?: boolean }> = ({ x, y, s = 1, f, facing = 1, shirt, hair = "#3A2416", shout = false, armUp = false, run = true }) => {
  const p = run ? Math.sin(f / 3) : 0;
  const bob = run ? Math.abs(Math.cos(f / 3)) * -14 : 0;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${facing * s} ${s})`}>
      <Limb a={[0, -250]} b={[-30 - p * 40, -150]} c={[-20 - p * 80, -30]} w={44} col="#3D5E9A" />
      <path d={`M ${-50 - p * 80} -40 L ${10 - p * 80} -40 L ${14 - p * 80} -6 L ${-56 - p * 80} -6 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <Limb a={[10, -250]} b={[40 + p * 40, -150]} c={[30 + p * 80, -30]} w={44} col="#4A6EAE" />
      <path d={`M ${10 + p * 80} -40 L ${70 + p * 80} -40 L ${74 + p * 80} -6 L ${4 + p * 80} -6 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <Limb a={[-20, -440]} b={[-80, -380]} c={[-100 - p * 20, -320]} w={36} col={shirt} />
      <path d="M -60 -470 Q 10 -500 70 -470 L 76 -240 L -62 -240 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -10 -330 L 50 -330" stroke={INK} strokeWidth={5} opacity={0.4} />
      {armUp ? (
        <g>
          <Limb a={[40, -450]} b={[80, -540]} c={[90, -640]} w={36} col={shirt} />
          <circle cx={90} cy={-660} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
          <path d="M 80 -676 L 80 -720" stroke={SKIN} strokeWidth={14} strokeLinecap="round" />
        </g>
      ) : (
        <Limb a={[40, -450]} b={[100, -380]} c={[130 + p * 20, -330]} w={36} col={shirt} />
      )}
      <rect x={-6} y={-510} width={34} height={40} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <circle cx={14} cy={-566} r={62} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -50 -580 Q -40 -650 20 -640 Q 80 -640 76 -590 Q 50 -610 20 -600 Q -10 -616 -50 -580 Z" fill={hair} stroke={INK} strokeWidth={5} />
      <ellipse cx={44} cy={-574} rx={7} ry={9} fill={INK} />
      <path d="M 34 -600 L 58 -596" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      {shout ? <ellipse cx={54} cy={-536} rx={16} ry={18} fill="#5A1E1A" stroke={INK} strokeWidth={5} /> : <path d="M 40 -536 Q 54 -528 66 -538" stroke={INK} strokeWidth={5} fill="none" />}
    </g>
  );
};

// modern hatchback, side view facing left. Origin = ground centre. door = front passenger door glow 0..1
const Car: React.FC<{ x: number; y: number; s?: number; door?: number; col?: string }> = ({ x, y, s = 1, door = 0, col = "#2F8F9D" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={380} ry={22} fill="#000" opacity={0.2} />
    <path d="M -360 -60 Q -362 -120 -300 -132 L -190 -150 L -110 -232 Q -90 -250 -50 -250 L 180 -250 Q 230 -250 260 -210 L 330 -130 Q 362 -120 362 -70 L 362 -40 L -360 -40 Z" fill={col} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -170 -150 L -96 -222 Q -84 -232 -60 -232 L 30 -232 L 30 -150 Z" fill="#BFE3EA" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 50 -232 L 170 -232 Q 210 -232 236 -196 L 270 -150 L 50 -150 Z" fill="#BFE3EA" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {door > 0 ? <path d="M -186 -150 L 40 -150 L 40 -46 L -200 -46 Z" fill={GOLD_HI} opacity={0.35 * door} stroke={C.mustard} strokeWidth={12 * door} /> : null}
    <path d="M -186 -150 L -200 -46 M 40 -150 L 40 -46 M 260 -150 L 270 -46" stroke={INK} strokeWidth={5} />
    <rect x={-10} y={-120} width={36} height={10} rx={5} fill={INK} />
    <rect x={220} y={-120} width={36} height={10} rx={5} fill={INK} />
    <path d="M -356 -90 L -320 -96 L -320 -78 L -356 -74 Z" fill={GOLD_HI} stroke={INK} strokeWidth={4} />
    {[-220, 220].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-30} r={70} fill="#1E1E24" stroke={INK} strokeWidth={8} />
        <circle cx={wx} cy={-30} r={34} fill="#B8BEC6" stroke={INK} strokeWidth={6} />
      </g>
    ))}
  </g>
);

const House: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-420} width={600} height={420} fill="#F2E3C4" stroke={INK} strokeWidth={8} />
    <path d="M -340 -420 L 0 -620 L 340 -420 Z" fill={C.brick} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-240} y={-320} width={140} height={120} fill="#BFE3EA" stroke={INK} strokeWidth={6} />
    <rect x={60} y={-260} width={180} height={260} fill="#8A6A45" stroke={INK} strokeWidth={6} />
    <path d="M 60 -200 L 240 -200 M 60 -140 L 240 -140 M 60 -80 L 240 -80" stroke={INK} strokeWidth={4} opacity={0.5} />
  </g>
);

const Arrow: React.FC<{ a: P; b: P; p: number }> = ({ a, b, p }) => {
  if (p <= 0) return null;
  const e: P = [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
  const ang = Math.atan2(e[1] - a[1], e[0] - a[0]);
  const h = (d: number): P => [e[0] - 40 * Math.cos(ang + d), e[1] - 40 * Math.sin(ang + d)];
  return (
    <g>
      <path d={`M ${a[0]} ${a[1]} Q ${(a[0] + e[0]) / 2 - 60} ${(a[1] + e[1]) / 2} ${e[0]} ${e[1]}`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${a[0]} ${a[1]} Q ${(a[0] + e[0]) / 2 - 60} ${(a[1] + e[1]) / 2} ${e[0]} ${e[1]}`} stroke={C.mustard} strokeWidth={11} fill="none" strokeLinecap="round" />
      <path d={`M ${h(0.5)[0]} ${h(0.5)[1]} L ${e[0]} ${e[1]} L ${h(-0.5)[0]} ${h(-0.5)[1]}`} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export const ShotgunMessenger: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "coach";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let sky: "night" | "day" | "dark" = "night";
  let body: React.ReactNode = null;
  const bob = 8 * Math.sin(f / 3.2);

  if (mode === "coach") {
    // frame 0: the messenger fills the frame on top of a racing coach at night, shotgun up, strongbox right under him
    const pal = PALS.night;
    body = (
      <>
        <Sky pal={pal} horizon={1150} f={f} moonX={870} moonY={680} />
        <Canyon f={f} pal={pal} horizon={1150} speed={30} seed="hook" />
        <SpeedLines f={f} y0={640} y1={1300} seed="hook" />
        <Dust x={120} y={1720} f={f} s={1.3} col="#D9A878" />
        <HorseRun x={1190} y={1375} s={0.9} f={f} />
        <Coach x={560} y={1265} s={1.5} f={f} bob={bob}>
          <Driver x={40} y={-4} f={f} reinTo={[430, -30]} />
          <Guard x={-110} y={0} f={f} aim={232 + 3 * Math.sin(f / 6)} face="shout" />
        </Coach>
      </>
    );
  } else if (mode === "answer") {
    // wide: who's who on the coach → cut: close-up of the strongbox under the seat, lid opens on gold
    const cut = (v.cutAt ?? 0.5) * dur;
    const pal = PALS.night;
    if (f < cut) {
      body = (
        <>
          <Sky pal={pal} horizon={1000} f={f} moonX={880} moonY={620} />
          <Canyon f={f} pal={pal} horizon={1000} speed={30} seed="wide" />
          <Dust x={120} y={1500} f={f} s={1.2} col="#D9A878" />
          <HorseRun x={1010} y={1330} s={0.55} f={f} off={0.3} />
          <Coach x={730} y={1030} s={0.78} f={f} bob={bob * 0.7}>
            <Driver x={40} y={-4} f={f} reinTo={[420, 60]} />
            <Guard x={-110} y={0} f={f} aim={258} face="grit" wind={0.6} />
          </Coach>
          <HorseRun x={1150} y={1300} s={0.7} f={f} off={0.1} />
          <Arrow a={[300, 470]} b={[560, 680]} p={ease(f, 8, 18)} />
        </>
      );
    } else {
      const lf = f - cut;
      const open = ease(lf, 4, 14);
      body = (
        <>
          <Sky pal={pal} horizon={700} f={f} moonX={900} moonY={420} />
          <Canyon f={f} pal={pal} horizon={700} speed={30} seed="box" cacti={false} />
          <rect x={0} y={760} width={1080} height={1160} fill="#2A1C14" />
          <path d="M 0 760 L 1080 760" stroke={INK} strokeWidth={10} />
          <rect x={0} y={700} width={1080} height={70} fill={LEATHER} stroke={INK} strokeWidth={8} />
          <rect x={0} y={1250} width={1080} height={90} fill="#8A5A34" stroke={INK} strokeWidth={8} />
          <Strongbox x={540} y={1250} s={2.0} open={open} f={lf} />
          <Limb a={[-40, 720]} b={[120, 700]} c={[180, 790]} w={80} col={PANTS} />
          <Limb a={[180, 790]} b={[190, 980]} c={[180, 1150]} w={70} col={PANTS} />
          <g transform="translate(180 1170) scale(1.5)"><Boot a={[0, 0]} /></g>
          <Limb a={[1120, 720]} b={[960, 700]} c={[920, 790]} w={80} col="#3B3B46" />
          <Limb a={[920, 790]} b={[910, 980]} c={[920, 1150]} w={70} col="#3B3B46" />
          <g transform="translate(920 1170) scale(-1.5 1.5)"><Boot a={[0, 0]} /></g>
        </>
      );
    }
  } else if (mode === "fire") {
    // riders in a dust cloud behind the coach → he turns and fires: BOOM, hats fly, they turn tail (nobody hit)
    const pal = PALS.night;
    const fireAt = (v.fireAt ?? 0.75) * dur;
    const fire = interpolate(f, [fireAt - 1, fireAt + 2, fireAt + 10], [0, 1, 0], clamp);
    const hatOff = ease(f, fireAt + 2, fireAt + 16);
    const flee = f > fireAt + 8;
    const runOff = flee ? (f - fireAt - 8) * 14 : 0;
    const ang = 200 - fire * 10;
    const P0: P = [10, -178];
    const m = rot([346, 3], ang);
    const GS = 1.15;
    const muzzle: P = [720 + GS * (-110 + P0[0] + m[0]), 1200 + bob + GS * (P0[1] + m[1])];
    const smoke = f >= fireAt ? ease(f, fireAt, fireAt + 14) : 0;
    const boom = popIn(f, fireAt, 7);
    body = (
      <>
        <Sky pal={pal} horizon={1060} f={f} moonX={860} moonY={640} />
        <Canyon f={f} pal={pal} horizon={1060} speed={30} seed="fire" />
        <Dust x={140} y={1110} f={f} s={0.9} col="#C99068" />
        <Bandit x={260 - runOff + 20 * Math.sin(f / 12)} y={1010} s={0.3} f={f} hatOff={hatOff} flee={flee} off={0.2} />
        <Bandit x={440 - runOff * 0.8 + 16 * Math.sin(f / 10)} y={1060} s={0.34} f={f} hatOff={ease(f, fireAt + 4, fireAt + 18)} flee={flee} off={0.6} />
        <SpeedLines f={f} y0={1150} y1={1500} seed="fire" />
        <HorseRun x={1210} y={1420} s={0.85} f={f} />
        <Coach x={720} y={1200} s={GS} f={f} bob={bob}>
          <Driver x={40} y={-4} f={f} reinTo={[430, 0]} face={f > fireAt ? "shock" : "grit"} />
          <Guard x={-110} y={0} f={f} aim={200} fire={fire} face="shout" />
        </Coach>
        {smoke > 0 ? (
          <g opacity={1 - smoke * 0.6}>
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} cx={muzzle[0] - smoke * (40 + k * 30)} cy={muzzle[1] - smoke * (k * 18 - 20)} r={30 + smoke * (50 + k * 12)} fill="#EFE6D6" stroke={INK} strokeWidth={4} />
            ))}
          </g>
        ) : null}
        {boom > 0 ? (
          <g transform={`translate(500 790) rotate(-10) scale(${boom})`}>
            <text x={0} y={0} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">BOOM!</text>
          </g>
        ) : null}
        <rect x={0} y={0} width={1080} height={1920} fill="#FFF6D8" opacity={interpolate(f, [fireAt, fireAt + 4], [0.45, 0], clamp)} />
      </>
    );
  } else if (mode === "car") {
    // he's in a spotlight on his strongbox: what survives? → flash → today: a teen sprinting for the front seat yelling SHOTGUN!
    const answerAt = (v.answerAt ?? 0.6) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      sky = "dark";
      body = (
        <>
          <path d="M 470 0 L 610 0 L 980 1760 L 100 1760 Z" fill={GOLD_HI} opacity={0.16} />
          <ellipse cx={540} cy={1700} rx={460} ry={70} fill={GOLD_HI} opacity={0.22} />
          <Strongbox x={430} y={1690} s={1.15} f={f} />
          <Guard x={420} y={1520} s={1.35} f={f} rest face="grin" wind={0.15} look={1} />
          {[0, 1, 2].map((k) => {
            const p = popIn(f, 6 + k * 8, 8);
            return p > 0 ? (
              <text key={k} x={[820, 930, 760][k]} y={[760, 940, 1040][k]} textAnchor="middle" fontFamily={titleFont} fontSize={[150, 110, 90][k]} fill={C.mustard} stroke={INK} strokeWidth={9} paintOrder="stroke" transform={`rotate(${Math.sin(f / 6 + k) * 14} ${[820, 930, 760][k]} ${[760, 940, 1040][k]}) scale(1)`} opacity={p}>?</text>
            ) : null;
          })}
        </>
      );
    } else {
      sky = "day";
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 6], [1, 0], clamp);
      const tx = interpolate(lf, [0, 16], [1040, 790], { ...clamp, easing: Easing.out(Easing.cubic) });
      const bub = popIn(lf, 3, 8);
      body = (
        <>
          <House x={250} y={1300} />
          <rect x={0} y={1300} width={1080} height={620} fill="#8DBF6A" />
          <path d="M 0 1420 L 1080 1380 L 1080 1920 L 0 1920 Z" fill="#C9C1B4" />
          <path d="M 0 1420 L 1080 1380" stroke={INK} strokeWidth={6} />
          <Car x={430} y={1600} s={1.05} door={0.6 + 0.4 * Math.sin(lf / 3)} />
          <Teen x={tx + 230} y={1730} s={0.95} f={f} facing={-1} shirt={C.teal} hair="#C98A3A" />
          <Teen x={tx} y={1790} s={1.2} f={f} facing={-1} shirt={C.mustard} shout armUp />
          {bub > 0 ? (
            <g transform={`translate(540 840) scale(${bub})`}>
              <path d="M -330 -100 L 330 -100 Q 360 -100 360 -70 L 360 60 Q 360 90 330 90 L 190 90 L 250 170 L 100 90 L -330 90 Q -360 90 -360 60 L -360 -70 Q -360 -100 -330 -100 Z" fill="#FFFFFF" stroke={INK} strokeWidth={10} strokeLinejoin="round" />
              <text x={0} y={38} textAnchor="middle" fontFamily={titleFont} fontSize={104} fill={C.brick}>SHOTGUN!</text>
            </g>
          ) : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  } else if (mode === "movie") {
    // a drive-in at night: the Western on the big screen made the phrase famous
    const film = (
      <g>
        <Sky pal={{ ...PALS.dusk, moon: false }} horizon={420} f={f} />
        <Canyon f={f} pal={PALS.dusk} horizon={420} speed={34} seed="film" />
        <Dust x={160} y={640} f={f} s={0.8} col="#D9A878" />
        <HorseRun x={980} y={560} s={0.36} f={f} />
        <Coach x={700} y={500} s={0.42} f={f} bob={bob * 0.4}>
          <Driver x={40} y={-4} f={f} reinTo={[430, 40]} />
          <Guard x={-110} y={0} f={f} aim={225} face="shout" />
        </Coach>
      </g>
    );
    const flick = 0.05 + 0.07 * random(`fl${Math.floor(f / 2)}`);
    body = (
      <>
        <defs>
          <filter id="ep052gray"><feColorMatrix type="saturate" values="0.08" /></filter>
          <clipPath id="ep052screen"><rect x={0} y={0} width={1080} height={690} /></clipPath>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="#141030" />
        {new Array(40).fill(0).map((_, i) => <circle key={i} cx={random(`mv${i}`) * 1080} cy={random(`mvy${i}`) * 560} r={2 + random(`mvr${i}`) * 2} fill="#FFF4DC" opacity={0.6} />)}
        <path d="M 540 1460 L 140 610 L 940 610 Z" fill={GOLD_HI} opacity={0.1} />
        <rect x={200} y={1130} width={30} height={260} fill="#2A2438" stroke={INK} strokeWidth={5} />
        <rect x={850} y={1130} width={30} height={260} fill="#2A2438" stroke={INK} strokeWidth={5} />
        <rect x={110} y={590} width={860} height={560} rx={8} fill="#2A2438" stroke={INK} strokeWidth={8} />
        <g transform="translate(130 610) scale(0.759)" clipPath="url(#ep052screen)">
          <g filter="url(#ep052gray)">{film}</g>
          <rect x={0} y={0} width={1080} height={690} fill="#FFFFFF" opacity={flick} />
        </g>
        <rect x={0} y={1380} width={1080} height={540} fill="#231C2E" />
        {[[300, 1740, 1], [790, 1760, 1.1]].map(([cx, cy, cs], k) => (
          <g key={k} transform={`translate(${cx} ${cy}) scale(${cs})`}>
            <path d="M -230 0 L -230 -90 Q -220 -140 -160 -150 L -120 -230 Q -100 -250 -60 -250 L 60 -250 Q 100 -250 120 -230 L 160 -150 Q 220 -140 230 -90 L 230 0 Z" fill="#3A2E4A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d="M -100 -150 L -70 -220 L 70 -220 L 100 -150 Z" fill="#5A6C9A" opacity={0.6} stroke={INK} strokeWidth={5} />
            <path d="M -230 -90 L -250 -150 L -200 -110 Z M 230 -90 L 250 -150 L 200 -110 Z" fill="#3A2E4A" stroke={INK} strokeWidth={5} />
            <rect x={-215} y={-80} width={44} height={22} rx={8} fill="#E2453A" stroke={INK} strokeWidth={4} />
            <rect x={171} y={-80} width={44} height={22} rx={8} fill="#E2453A" stroke={INK} strokeWidth={4} />
          </g>
        ))}
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "car" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.6) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} />
    </Backdrop>
  );
};
