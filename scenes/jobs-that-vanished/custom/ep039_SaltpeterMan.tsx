import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep039 Saltpeter man – the King's diggers dug up floors, stables, dovecotes and churches for nitre-rich dirt;
// the King ordered everyone to save their pee; the black powder in tonight's Bonfire Night fireworks is still 75 % saltpeter.
// visual: { mode: "floor" | "warrant" | "church" | "dovecote" | "pee" | "fireworks", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1 of the scene), floatTop?, floatSide?: "left" | "alt",
//           answer?, answerAccent?, answerAt? (fireworks), sealAt? (warrant), banAt? (dovecote), phases?: number[] }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EBB68C";
const SKIN_D = "#C98E66";
const SHIRT = "#F1E6CC";
const SHIRT_D = "#D6C6A2";
const LEATHER = "#8A552E";
const LEATHER_D = "#5E3A1F";
const BREECH = "#56604E";
const HAT = "#3A2E26";
const BEARD = "#5A3A24";
const IRON = "#7C828C";
const IRON_HI = "#C3C8D0";
const WOOD = "#8A5A34";
const DIRT = "#4A3222";
const DIRT_D = "#2A1A10";
const DIRT_L = "#7A5636";
const PARCH = "#F6E7C4";
const SEAL = "#B3241C";
const GOLD = "#F0B93A";
const GOLD_D = "#B8861E";
const PLASTER = "#F5E7C8";
const BEAM = "#5A3A22";
const FLOOR = "#B88A5E";
const STONE = "#C9BFA9";
const STONE_D = "#A99E86";
const PEE = "#F2D033";

type P = [number, number];
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp2 = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side = "alt" }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || (side === "alt" && i % 2 === 0);
      const centre = side === "center";
      return (
        <div key={i} style={{ position: "absolute", ...(centre ? { left: 540, translate: "-50% 0" } : left ? { left: 90 } : { right: 170 }), top: top + i * 112 - Math.min(age, 30) * 0.8, fontFamily: typeFont, fontSize: 62, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 24px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.5, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// ---- the spade: grip G, blade tip B (world coords inside the figure group). load 0..1 = clod of dirt on the blade
const Spade: React.FC<{ g: P; b: P; load?: number }> = ({ g, b, load = 0 }) => {
  const dx = b[0] - g[0];
  const dy = b[1] - g[1];
  const len = Math.max(1, Math.hypot(dx, dy));
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const BL = 150;
  const t: P = [b[0] - ux * BL, b[1] - uy * BL];
  const w1 = 52;
  const w2 = 46;
  const blade = `M ${t[0] + nx * w1} ${t[1] + ny * w1} L ${t[0] - nx * w1} ${t[1] - ny * w1} L ${b[0] - nx * w2 - ux * 18} ${b[1] - ny * w2 - uy * 18} Q ${b[0]} ${b[1]} ${b[0] + nx * w2 - ux * 18} ${b[1] + ny * w2 - uy * 18} Z`;
  const grip1: P = [g[0] + nx * 46, g[1] + ny * 46];
  const grip2: P = [g[0] - nx * 46, g[1] - ny * 46];
  const lc: P = [t[0] + ux * 60 + nx * 4, t[1] + uy * 60 + ny * 4];
  return (
    <g>
      <path d={`M ${g[0]} ${g[1]} L ${t[0]} ${t[1]}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${g[0]} ${g[1]} L ${t[0]} ${t[1]}`} stroke={WOOD} strokeWidth={19} strokeLinecap="round" />
      <path d={`M ${grip1[0]} ${grip1[1]} L ${grip2[0]} ${grip2[1]}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${grip1[0]} ${grip1[1]} L ${grip2[0]} ${grip2[1]}`} stroke={WOOD} strokeWidth={19} strokeLinecap="round" />
      <path d={blade} fill={IRON} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${t[0] + nx * 30 + ux * 20} ${t[1] + ny * 30 + uy * 20} L ${b[0] + nx * 22 - ux * 30} ${b[1] + ny * 22 - uy * 30}`} stroke={IRON_HI} strokeWidth={7} strokeLinecap="round" opacity={0.8} />
      {load > 0 ? (
        <g transform={`translate(${lc[0]} ${lc[1]}) scale(${load})`}>
          <path d="M -70 10 Q -80 -50 -20 -60 Q 10 -95 50 -55 Q 90 -40 74 12 Q 0 34 -70 10 Z" fill={DIRT} stroke={INK} strokeWidth={6} />
          <circle cx={-20} cy={-30} r={9} fill={DIRT_L} />
          <circle cx={30} cy={-40} r={7} fill={DIRT_L} />
        </g>
      ) : null}
    </g>
  );
};

// a flying clod of earth
const Clod: React.FC<{ x: number; y: number; r: number; rot: number; o?: number }> = ({ x, y, r, rot, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={`M ${-r} ${r * 0.1} Q ${-r * 1.05} ${-r * 0.8} ${-r * 0.1} ${-r * 0.9} Q ${r * 0.9} ${-r} ${r} ${-r * 0.1} Q ${r * 0.95} ${r * 0.8} ${r * 0.1} ${r * 0.85} Q ${-r * 0.8} ${r} ${-r} ${r * 0.1} Z`} fill={DIRT} stroke={INK} strokeWidth={Math.max(3, r * 0.12)} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.22} fill={DIRT_L} />
  </g>
);

// an arm: rolled shirt sleeve to the elbow, bare forearm, fist. bend pushes the elbow sideways.
const Arm: React.FC<{ from: P; to: P; bend?: number; sleeve?: string; skin?: string; fist?: number }> = ({ from, to, bend = 50, sleeve = SHIRT, skin = SKIN, fist = 34 }) => {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const l = Math.max(1, Math.hypot(dx, dy));
  const e: P = [mx + (-dy / l) * bend, my + (dx / l) * bend];
  return (
    <g>
      <path d={`M ${from[0]} ${from[1]} L ${e[0]} ${e[1]}`} stroke={INK} strokeWidth={84} strokeLinecap="round" />
      <path d={`M ${from[0]} ${from[1]} L ${e[0]} ${e[1]}`} stroke={sleeve} strokeWidth={70} strokeLinecap="round" />
      <path d={`M ${e[0]} ${e[1]} L ${to[0]} ${to[1]}`} stroke={INK} strokeWidth={66} strokeLinecap="round" />
      <path d={`M ${e[0]} ${e[1]} L ${to[0]} ${to[1]}`} stroke={skin} strokeWidth={52} strokeLinecap="round" />
      <circle cx={to[0]} cy={to[1]} r={fist} fill={skin} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// the royal warrant: parchment with a crown and a red wax seal. open 0..1 unrolls it downwards from the top roll.
const Warrant: React.FC<{ x: number; y: number; s?: number; open: number; rot?: number }> = ({ x, y, s = 1, open, rot = 0 }) => {
  const h = 40 + open * 400;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-170} y={0} width={340} height={h} fill={PARCH} stroke={INK} strokeWidth={7} />
      <g opacity={interpolate(open, [0.35, 0.7], [0, 1], clamp)}>
        <path d="M -70 120 L -84 50 L -40 84 L 0 30 L 40 84 L 84 50 L 70 120 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-72} y={118} width={144} height={22} rx={5} fill={GOLD} stroke={INK} strokeWidth={5} />
        <text x={0} y={198} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick}>BY ORDER</text>
        <text x={0} y={246} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick}>OF THE KING</text>
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M -120 ${286 + k * 30} L ${110 - (k % 2) * 50} ${286 + k * 30}`} stroke="#8A7552" strokeWidth={8} strokeLinecap="round" />
        ))}
      </g>
      <g transform={`translate(110 ${h - 10})`} opacity={interpolate(open, [0.8, 0.95], [0, 1], clamp)}>
        <path d="M -12 0 L -30 70 L -8 56 L 0 80 L 10 54 L 30 68 Z" fill={SEAL} stroke={INK} strokeWidth={4} />
        <circle r={38} fill={SEAL} stroke={INK} strokeWidth={6} />
        <circle r={24} fill="none" stroke="#7E1712" strokeWidth={5} />
      </g>
      <rect x={-188} y={-22} width={376} height={40} rx={20} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
      <rect x={-188} y={h - 18} width={376} height={40} rx={20} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
    </g>
  );
};

// THE SALTPETER MAN. Origin = between his feet, facing the viewer, spade on the viewer's right.
// g / b = spade grip + blade tip in local coords. warrant 0..1 = left hand raises the unrolled royal warrant.
const Digger: React.FC<{ x: number; y: number; s?: number; f: number; g: P; b: P; load?: number; shout?: number; look?: number; warrant?: number; awe?: boolean }> = ({
  x, y, s = 1, f, g, b, load = 0, shout = 0, look = 0.6, warrant = 0, awe = false,
}) => {
  const breathe = Math.sin(f / 12) * 4;
  const SR: P = [128, -742];
  const SL: P = [-128, -742];
  const h2 = lerp2(g, b, 0.38);
  const wHand: P = [-200, -1090];
  const lHand: P = warrant > 0 ? lerp2(h2, wHand, ease(warrant, 0, 0.35)) : h2;
  const py = look * 6 - (awe ? 8 : 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={8} rx={250} ry={30} fill="#000" opacity={0.22} />
      <g transform={`translate(0 ${breathe * 0.4})`}>
        {/* legs: stockings + boots */}
        {[-1, 1].map((k) => (
          <g key={k}>
            <path d={`M ${k * 62} -300 L ${k * 100} -40`} stroke={INK} strokeWidth={74} strokeLinecap="round" />
            <path d={`M ${k * 62} -300 L ${k * 100} -40`} stroke="#D9D2C0" strokeWidth={60} strokeLinecap="round" />
            <path d={`M ${k * 64} -170 L ${k * 136} -170 L ${k * 140} -10 Q ${k * 170} 0 ${k * 176} 14 L ${k * 30} 14 L ${k * 56} -170 Z`} fill={LEATHER_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d={`M ${k * 58} -150 L ${k * 140} -150`} stroke={LEATHER} strokeWidth={14} />
          </g>
        ))}
        {/* breeches */}
        <path d="M -138 -450 L 138 -450 L 146 -250 L 22 -250 L 0 -330 L -22 -250 L -146 -250 Z" fill={BREECH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -146 -262 L -22 -262 M 22 -262 L 146 -262" stroke={GOLD_D} strokeWidth={8} />
        <g transform={`translate(0 ${breathe})`}>
          {/* shirt + leather jerkin */}
          <path d="M -156 -762 Q 0 -796 156 -762 L 140 -420 L -140 -420 Z" fill={SHIRT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M -156 -762 Q -100 -774 -42 -770 L -58 -420 L -140 -420 Z" fill={LEATHER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 156 -762 Q 100 -774 42 -770 L 58 -420 L 140 -420 Z" fill={LEATHER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M -48 ${-720 + k * 80} L 48 ${-700 + k * 80}`} stroke={LEATHER_D} strokeWidth={6} />
          ))}
          <path d="M -40 -770 L 0 -700 L 40 -770" stroke={SHIRT_D} strokeWidth={6} fill="none" />
          <rect x={-146} y={-462} width={292} height={44} rx={6} fill={LEATHER_D} stroke={INK} strokeWidth={6} />
          <rect x={-26} y={-468} width={52} height={56} rx={6} fill="none" stroke={GOLD} strokeWidth={9} />
          {/* rolled warrant on the belt (until he pulls it out) */}
          {warrant <= 0 ? (
            <g transform="translate(-118 -430) rotate(-12)">
              <rect x={-24} y={0} width={48} height={150} rx={20} fill={PARCH} stroke={INK} strokeWidth={6} />
              <circle cx={0} cy={110} r={22} fill={SEAL} stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
          {/* neck + head */}
          <rect x={-38} y={-812} width={76} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
          <ellipse cx={-88} cy={-872} rx={18} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
          <ellipse cx={88} cy={-872} rx={18} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
          <ellipse cx={0} cy={-878} rx={88} ry={96} fill={SKIN} stroke={INK} strokeWidth={7} />
          <path d="M -88 -890 Q -86 -790 0 -776 Q 86 -790 88 -890 Q 64 -828 0 -830 Q -64 -828 -88 -890 Z" fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={-50} cy={-858} r={15} fill="#E8846E" opacity={0.45} />
          <circle cx={50} cy={-858} r={15} fill="#E8846E" opacity={0.45} />
          <ellipse cx={-34} cy={-902} rx={14} ry={awe ? 17 : 13} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          <ellipse cx={34} cy={-902} rx={14} ry={awe ? 17 : 13} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          <circle cx={-32} cy={-902 + py} r={7} fill={INK} />
          <circle cx={36} cy={-902 + py} r={7} fill={INK} />
          <path d={awe ? "M -60 -940 Q -36 -952 -14 -938 M 14 -938 Q 36 -952 60 -940" : "M -64 -934 L -14 -920 M 14 -920 L 64 -934"} stroke={BEARD} strokeWidth={12} strokeLinecap="round" fill="none" />
          <ellipse cx={0} cy={-868} rx={20} ry={24} fill="#E39A78" stroke={INK} strokeWidth={5} />
          <path d="M -46 -838 Q -20 -852 0 -842 Q 20 -852 46 -838" stroke={BEARD} strokeWidth={13} fill="none" strokeLinecap="round" />
          {shout > 0.05 || awe ? (
            <>
              <ellipse cx={0} cy={-812} rx={awe ? 18 : 22 + 12 * shout} ry={awe ? 20 : 8 + 22 * shout} fill="#6E1C18" stroke={INK} strokeWidth={5} />
              {!awe ? <path d={`M -14 ${-818 - 18 * shout} L 14 ${-818 - 18 * shout}`} stroke="#FFFFFF" strokeWidth={6} /> : null}
            </>
          ) : (
            <path d="M -30 -820 Q 0 -800 30 -820 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          )}
          {/* felt hat with a red band */}
          <g transform="rotate(-6 0 -952)">
            <ellipse cx={0} cy={-952} rx={172} ry={34} fill={HAT} stroke={INK} strokeWidth={6} />
            <path d="M -84 -954 Q -90 -1064 0 -1070 Q 90 -1064 84 -954 Z" fill={HAT} stroke={INK} strokeWidth={6} />
            <rect x={-86} y={-990} width={172} height={30} fill={C.brick} stroke={INK} strokeWidth={5} />
            <path d="M -60 -1050 Q -20 -1062 20 -1052" stroke="#5B4A3C" strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
          {/* arms + spade (+ warrant) */}
          <Arm from={SL} to={lHand} bend={warrant > 0 ? 60 : -40} />
          {warrant > 0 ? (
            <>
              <Warrant x={lHand[0] - 150} y={lHand[1] - 6} s={0.95} open={ease(warrant, 0.3, 0.85)} rot={-4} />
              <circle cx={lHand[0]} cy={lHand[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
            </>
          ) : null}
          <Spade g={g} b={b} load={load} />
          <Arm from={SR} to={g} bend={-50} />
          {warrant <= 0 ? <circle cx={h2[0]} cy={h2[1]} r={34} fill={SKIN} stroke={INK} strokeWidth={6} /> : null}
        </g>
      </g>
    </g>
  );
};

// townsfolk, front-facing. Origin = feet. kind: woman (coif + apron), man, child, vicar (black cassock + white bands)
type Pose = "cheeks" | "fist" | "up" | "carry" | "pour" | "idle";
const Folk: React.FC<{ x: number; y: number; s?: number; f: number; kind: "woman" | "man" | "child" | "vicar"; pose?: Pose; col?: string; shock?: number; ph?: number }> = ({
  x, y, s = 1, f, kind, pose = "idle", col = "#5E7A8C", shock = 1, ph = 0,
}) => {
  const bob = Math.sin(f / 5 + ph) * 4 * shock;
  const skirt = kind === "woman" || kind === "child" || kind === "vicar";
  const body = kind === "vicar" ? "#1F1C24" : col;
  const shake = pose === "fist" ? Math.sin(f / 2 + ph) * 18 : 0;
  const hands: Record<Pose, [P, P]> = {
    cheeks: [[-50, -770], [50, -770]],
    fist: [[-112, -470], [150 + shake * 0.3, -930 + shake]],
    up: [[-170 + shake, -920], [170, -920 + Math.sin(f / 3 + ph) * 14]],
    carry: [[-70, -560], [70, -560]],
    pour: [[-112, -470], [150, -700]],
    idle: [[-116, -470], [116, -470]],
  };
  const [lh, rh] = hands[pose];
  const skin = kind === "man" ? SKIN_D : SKIN;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={150} ry={20} fill="#000" opacity={0.18} />
      {skirt ? (
        <>
          <path d="M -86 -480 L 86 -480 L 160 -14 L -160 -14 Z" fill={body} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {kind === "woman" ? <path d="M -62 -450 L 62 -450 L 84 -70 L -84 -70 Z" fill="#FBF6E9" stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
          <ellipse cx={-50} cy={-6} rx={40} ry={16} fill={INK} />
          <ellipse cx={50} cy={-6} rx={40} ry={16} fill={INK} />
        </>
      ) : (
        <>
          {[-1, 1].map((k) => (
            <g key={k}>
              <path d={`M ${k * 48} -470 L ${k * 66} -30`} stroke={INK} strokeWidth={66} strokeLinecap="round" />
              <path d={`M ${k * 48} -470 L ${k * 66} -30`} stroke={k > 0 ? "#6E5A44" : "#7D6850"} strokeWidth={52} strokeLinecap="round" />
              <ellipse cx={k * 74} cy={-8} rx={48} ry={18} fill={INK} />
            </g>
          ))}
        </>
      )}
      <path d="M -96 -700 Q 0 -726 96 -700 L 84 -460 L -84 -460 Z" fill={body} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {kind === "woman" ? <path d="M -70 -704 L 0 -610 L 70 -704 Z" fill="#FBF6E9" stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
      {kind === "vicar" ? <path d="M -16 -712 L -18 -650 L -2 -650 L -2 -712 Z M 2 -712 L 2 -650 L 18 -650 L 16 -712 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} /> : null}
      {[["l", lh, -1], ["r", rh, 1]].map(([key, h, k]) => {
        const hh = h as P;
        const kk = k as number;
        const sh: P = [kk * 84, -684];
        const e: P = [(sh[0] + hh[0]) / 2 + kk * 46, (sh[1] + hh[1]) / 2 + 20];
        return (
          <g key={key as string}>
            <path d={`M ${sh[0]} ${sh[1]} Q ${e[0]} ${e[1]} ${hh[0]} ${hh[1]}`} stroke={INK} strokeWidth={58} fill="none" strokeLinecap="round" />
            <path d={`M ${sh[0]} ${sh[1]} Q ${e[0]} ${e[1]} ${hh[0]} ${hh[1]}`} stroke={body} strokeWidth={46} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      <rect x={-26} y={-740} width={52} height={40} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-800} r={70} fill={skin} stroke={INK} strokeWidth={7} />
      {kind === "woman" ? (
        <path d="M -78 -770 Q -92 -880 0 -884 Q 92 -880 78 -770 Q 70 -830 0 -836 Q -70 -830 -78 -770 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ) : kind === "vicar" ? (
        <>
          <path d="M -70 -790 Q -76 -840 -50 -850 L -40 -800 Z M 70 -790 Q 76 -840 50 -850 L 40 -800 Z" fill="#CFCAC2" stroke={INK} strokeWidth={4} />
        </>
      ) : kind === "child" ? (
        <>
          <path d="M -70 -800 Q -70 -876 0 -874 Q 70 -876 70 -800 Q 40 -846 0 -846 Q -40 -846 -70 -800 Z" fill="#C9852E" stroke={INK} strokeWidth={5} />
          <circle cx={-78} cy={-790} r={20} fill="#C9852E" stroke={INK} strokeWidth={4} />
          <circle cx={78} cy={-790} r={20} fill="#C9852E" stroke={INK} strokeWidth={4} />
        </>
      ) : (
        <path d="M -72 -796 Q -76 -878 0 -876 Q 76 -878 72 -796 Q 50 -840 0 -842 Q -50 -840 -72 -796 Z" fill="#4A3424" stroke={INK} strokeWidth={5} />
      )}
      <circle cx={-26} cy={-806} r={shock > 0.5 ? 12 : 9} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
      <circle cx={26} cy={-806} r={shock > 0.5 ? 12 : 9} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
      <circle cx={-26} cy={-806} r={5} fill={INK} />
      <circle cx={26} cy={-806} r={5} fill={INK} />
      <path d={pose === "fist" ? "M -46 -842 L -12 -828 M 12 -828 L 46 -842" : "M -44 -836 Q -26 -850 -10 -838 M 10 -838 Q 26 -850 44 -836"} stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
      <ellipse cx={0} cy={-764} rx={14 + 6 * shock} ry={10 + 12 * shock} fill="#6E1C18" stroke={INK} strokeWidth={4} />
      <circle cx={lh[0]} cy={lh[1]} r={26} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={rh[0]} cy={rh[1]} r={26} fill={skin} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// King Charles I, waist-up: long hair, pointed beard, lace collar, crown, pointing to the viewer's right. Origin = belt centre.
const King: React.FC<{ x: number; y: number; s?: number; f: number; point?: number; shout?: number }> = ({ x, y, s = 1, f, point = 1, shout = 0 }) => {
  const breathe = Math.sin(f / 12) * 3;
  const hand: P = lerp2([150, -60], [380, -470], point);
  const HAIR = "#4A2E1C";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* ermine-lined red cloak */}
        <path d="M -190 -400 Q -260 -100 -250 300 L 250 300 Q 260 -100 190 -400 Z" fill="#B3241C" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -230 300 L -170 -380 L -120 -380 L -150 300 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M -160 ${-300 + k * 120} l 6 18 l -6 0 Z`} fill={INK} stroke={INK} strokeWidth={6} />
        ))}
        {/* satin doublet */}
        <path d="M -150 -400 Q 0 -428 150 -400 L 136 300 L -136 300 Z" fill="#5A6E9A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} cx={0} cy={-280 + k * 80} r={9} fill={GOLD} stroke={INK} strokeWidth={3} />
        ))}
        <path d="M -60 -300 L -70 280 M 60 -300 L 70 280" stroke="#7F93BE" strokeWidth={10} />
        {/* blue Garter sash */}
        <path d="M -150 -330 L 136 120" stroke="#2E5DAA" strokeWidth={34} />
        {/* hair behind */}
        <path d="M -104 -560 Q -150 -420 -120 -330 Q -60 -360 -60 -470 Z M 104 -560 Q 150 -420 120 -330 Q 60 -360 60 -470 Z" fill={HAIR} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {/* wide lace collar */}
        <path d="M -190 -404 Q 0 -440 190 -404 Q 170 -320 0 -300 Q -170 -320 -190 -404 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {new Array(9).fill(0).map((_, k) => (
          <circle key={k} cx={-160 + k * 40} cy={-338 + Math.abs(k - 4) * -8} r={10} fill="none" stroke="#C9C2B4" strokeWidth={4} />
        ))}
        {/* head */}
        <rect x={-30} y={-460} width={60} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-530} rx={76} ry={90} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M -82 -540 Q -86 -626 0 -628 Q 86 -626 82 -540 Q 60 -590 0 -592 Q -60 -590 -82 -540 Z" fill={HAIR} stroke={INK} strokeWidth={5} />
        <circle cx={-28} cy={-544} r={8} fill={INK} />
        <circle cx={28} cy={-544} r={8} fill={INK} />
        <path d="M -52 -572 L -12 -566 M 12 -566 L 52 -572" stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
        <path d="M 0 -540 Q 12 -514 0 -506" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -54 -476 Q -30 -500 0 -488 Q 30 -500 54 -476 Q 30 -488 0 -480 Q -30 -488 -54 -476 Z" fill={HAIR} stroke={INK} strokeWidth={4} />
        {shout > 0.05 ? <ellipse cx={0} cy={-466} rx={16 + 8 * shout} ry={6 + 14 * shout} fill="#6E1C18" stroke={INK} strokeWidth={4} /> : null}
        <path d={`M -14 ${-458 + shout * 14} L 0 ${-404 + shout * 14} L 14 ${-458 + shout * 14} Z`} fill={HAIR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        {/* crown */}
        <path d="M -78 -612 L -88 -700 L -44 -650 L 0 -722 L 44 -650 L 88 -700 L 78 -612 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-82} y={-622} width={164} height={30} rx={6} fill={GOLD} stroke={INK} strokeWidth={6} />
        <circle cx={0} cy={-607} r={10} fill={C.brick} stroke={INK} strokeWidth={3} />
        <circle cx={-46} cy={-607} r={8} fill="#2E5DAA" stroke={INK} strokeWidth={3} />
        <circle cx={46} cy={-607} r={8} fill="#2E5DAA" stroke={INK} strokeWidth={3} />
        {[-88, 0, 88].map((cx) => (
          <circle key={cx} cx={cx} cy={cx === 0 ? -726 : -704} r={10} fill={GOLD} stroke={INK} strokeWidth={4} />
        ))}
        {/* pointing arm */}
        <path d={`M 130 -370 Q ${(130 + hand[0]) / 2 + 20} ${(-370 + hand[1]) / 2 + 80} ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={82} fill="none" strokeLinecap="round" />
        <path d={`M 130 -370 Q ${(130 + hand[0]) / 2 + 20} ${(-370 + hand[1]) / 2 + 80} ${hand[0]} ${hand[1]}`} stroke="#5A6E9A" strokeWidth={68} fill="none" strokeLinecap="round" />
        <circle cx={hand[0] - 8} cy={hand[1] + 4} r={30} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <circle cx={hand[0] + 14} cy={hand[1]} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d={`M ${hand[0] + 30} ${hand[1] - 8} L ${hand[0] + 30 + 60 * point} ${hand[1] - 8 - 20 * point}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
        <path d={`M ${hand[0] + 30} ${hand[1] - 8} L ${hand[0] + 30 + 60 * point} ${hand[1] - 8 - 20 * point}`} stroke={SKIN} strokeWidth={12} strokeLinecap="round" />
      </g>
    </g>
  );
};

// ---- dig cycle: grip + blade keyframes (local coords of Digger) -------------------------------------------
const K: Array<[P, P]> = [
  [[190, -560], [211, 40]], // stab: blade in the hole
  [[110, -520], [295, 51]], // lever back
  [[140, -640], [422, -110]], // lift the load
  [[110, -860], [265, -280]], // fling!
];
const CYCLE = 21;
const FLING = 0.84;
const digPose = (f: number, off: number) => {
  const p = (((f + off) % CYCLE) + CYCLE) % CYCLE / CYCLE;
  let g: P;
  let b: P;
  if (p < 0.3) {
    const j = Math.sin(p * 40) * 10;
    g = [K[0][0][0], K[0][0][1] + j];
    b = [K[0][1][0], K[0][1][1] + j];
  } else if (p < 0.5) {
    const t = ease(p, 0.3, 0.5);
    g = lerp2(K[0][0], K[1][0], t);
    b = lerp2(K[0][1], K[1][1], t);
  } else if (p < 0.72) {
    const t = ease(p, 0.5, 0.72);
    g = lerp2(K[1][0], K[2][0], t);
    b = lerp2(K[1][1], K[2][1], t);
  } else if (p < FLING) {
    const t = ease(p, 0.72, FLING);
    g = lerp2(K[2][0], K[3][0], t);
    b = lerp2(K[2][1], K[3][1], t);
  } else {
    const t = ease(p, FLING, 1);
    g = lerp2(K[3][0], K[0][0], t);
    b = lerp2(K[3][1], K[0][1], t);
  }
  const load = p > 0.42 && p < FLING ? 1 : 0;
  const shout = interpolate(p, [0.7, 0.8, 0.95], [0, 1, 0], clamp);
  return { g, b, load, shout };
};

// clods flung from the blade towards the camera (they grow as they come at you)
const Flung: React.FC<{ f: number; off: number; x: number; y: number; s: number; n?: number; dur: number }> = ({ f, off, x, y, s, n = 5, dur }) => {
  const from: P = [x + K[3][1][0] * s, y + K[3][1][1] * s];
  const out: React.ReactNode[] = [];
  const first = Math.floor((-off) / CYCLE) - 2;
  const last = Math.ceil((dur - off) / CYCLE) + 1;
  const V: P[] = [[-17, -12], [-9, -20], [-24, -2], [6, -16], [-3, -6], [14, -8]];
  for (let k = first; k <= last; k++) {
    const t0 = k * CYCLE + FLING * CYCLE - off;
    const a = f - t0;
    if (a < 0 || a > 26) continue;
    for (let i = 0; i < n; i++) {
      const v = V[(i + k * 2 + 60) % V.length];
      const px = from[0] + v[0] * a * (1 + i * 0.12);
      const py = from[1] + v[1] * a + 1.1 * a * a;
      const r = (14 + i * 3) * (1 + a * 0.11);
      out.push(<Clod key={`${k}-${i}`} x={px} y={py} r={r} rot={a * (12 + i * 5)} o={interpolate(a, [18, 26], [1, 0], clamp)} />);
    }
  }
  return <>{out}</>;
};

const Hole: React.FC<{ cx: number; cy: number; rx: number; ry: number; floor?: string }> = ({ cx, cy, rx, ry, floor = FLOOR }) => (
  <g>
    <ellipse cx={cx} cy={cy + 6} rx={rx + 26} ry={ry + 16} fill={floor} opacity={0.6} />
    <path d={`M ${cx - rx} ${cy} Q ${cx - rx * 0.9} ${cy - ry * 1.1} ${cx - rx * 0.3} ${cy - ry} Q ${cx} ${cy - ry * 1.25} ${cx + rx * 0.4} ${cy - ry} Q ${cx + rx * 1.05} ${cy - ry * 0.9} ${cx + rx} ${cy} Q ${cx + rx * 0.8} ${cy + ry * 1.1} ${cx} ${cy + ry} Q ${cx - rx * 0.85} ${cy + ry * 1.05} ${cx - rx} ${cy} Z`} fill={DIRT_D} stroke={INK} strokeWidth={7} />
    <ellipse cx={cx} cy={cy + ry * 0.25} rx={rx * 0.7} ry={ry * 0.55} fill="#1A100A" />
    {[-0.6, -0.1, 0.45].map((k) => (
      <path key={k} d={`M ${cx + rx * k} ${cy - ry * 0.9} q 20 30 0 60`} stroke={DIRT_L} strokeWidth={8} fill="none" strokeLinecap="round" />
    ))}
  </g>
);

const Mound: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 0 Q -150 -110 -40 -140 Q 40 -170 110 -110 Q 180 -60 180 0 Z" fill={DIRT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[[-90, -60], [0, -100], [80, -50], [-20, -30]].map(([a, b], k) => (
      <circle key={k} cx={a} cy={b} r={12} fill={DIRT_L} />
    ))}
  </g>
);

// a cottage room: plaster + timber frame, leaded window, hearth, beaten-earth floor
const Cottage: React.FC<{ f: number }> = ({ f }) => {
  const flick = Math.sin(f / 3) * 0.05 + Math.sin(f / 7) * 0.04;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1460} fill={PLASTER} />
      {[40, 420, 1040].map((x) => (
        <rect key={x} x={x - 26} y={0} width={52} height={1460} fill={BEAM} stroke={INK} strokeWidth={5} />
      ))}
      <rect x={0} y={250} width={1080} height={50} fill={BEAM} stroke={INK} strokeWidth={5} />
      <path d="M 66 300 L 394 700 M 446 300 L 1014 900" stroke={BEAM} strokeWidth={40} />
      {/* leaded window with daylight */}
      <g transform="translate(110 760)">
        <rect x={0} y={0} width={260} height={300} fill="#BFE3EE" stroke={INK} strokeWidth={8} />
        <defs>
          <clipPath id="ep039win">
            <rect x={0} y={0} width={260} height={300} />
          </clipPath>
        </defs>
        <g clipPath="url(#ep039win)">
          {new Array(9).fill(0).map((_, k) => (
            <g key={k}>
              <path d={`M ${k * 60 - 300} 0 L ${k * 60} 300`} stroke="#5D646E" strokeWidth={4} />
              <path d={`M ${k * 60 - 200} 300 L ${k * 60 + 100} 0`} stroke="#5D646E" strokeWidth={4} />
            </g>
          ))}
        </g>
        <rect x={-20} y={300} width={300} height={26} fill={BEAM} stroke={INK} strokeWidth={5} />
      </g>
      <path d="M 110 1086 L 0 1460 L 0 1086 Z" fill="#FFF6D8" opacity={0.25} />
      {/* shelf with jugs */}
      <rect x={120} y={540} width={230} height={18} fill={WOOD} stroke={INK} strokeWidth={5} />
      {[150, 220, 290].map((x, k) => (
        <path key={x} d={`M ${x} 540 Q ${x - 22} ${500 - k * 8} ${x - 10} ${470 - k * 10} L ${x + 30} ${470 - k * 10} Q ${x + 44} ${500 - k * 8} ${x + 26} 540 Z`} fill={["#C77B4A", "#6E8BA8", "#D9B36A"][k]} stroke={INK} strokeWidth={5} />
      ))}
      {/* hearth on the right */}
      <path d="M 770 1460 L 770 1080 Q 900 980 1060 1080 L 1060 1460 Z" fill="#9C9384" stroke={INK} strokeWidth={7} />
      <path d="M 820 1460 L 820 1150 Q 915 1080 1010 1150 L 1010 1460 Z" fill="#2B1C14" stroke={INK} strokeWidth={6} />
      <circle cx={915} cy={1380} r={150} fill="#FFB347" opacity={0.25 + flick} />
      <path d={`M 860 1450 Q 870 ${1340 - flick * 200} 900 1330 Q 915 ${1380 - flick * 120} 935 1320 Q 970 1360 970 1450 Z`} fill="#FF9A2E" stroke="#C9531B" strokeWidth={5} />
      <path d="M 890 1450 Q 900 1390 918 1380 Q 940 1400 942 1450 Z" fill="#FFE07A" />
      {/* beaten-earth floor */}
      <rect x={0} y={1460} width={1080} height={460} fill={FLOOR} />
      <path d="M 0 1460 L 1080 1460" stroke={INK} strokeWidth={7} />
      {new Array(22).fill(0).map((_, k) => (
        <path key={k} d={`M ${(k * 197) % 1060 + 10} ${1500 + ((k * 83) % 400)} l 26 -6`} stroke={k % 3 ? "#9A6E46" : "#E3C27A"} strokeWidth={6} strokeLinecap="round" />
      ))}
    </>
  );
};

// a stone church: arches, stained glass, pews, flagstone floor with slabs prised up
const Church: React.FC<{ f: number }> = ({ f }) => {
  const glow = 0.3 + Math.sin(f / 9) * 0.05;
  const GLASS = ["#C9372C", "#2E5DAA", "#F0B93A", "#3F8F5A", "#8A4FA0"];
  return (
    <>
      <rect x={0} y={0} width={1080} height={1400} fill="#DCCFB2" />
      {new Array(11).fill(0).map((_, r) => (
        <g key={r}>
          <path d={`M 0 ${r * 130 + 60} L 1080 ${r * 130 + 60}`} stroke="#C2B494" strokeWidth={5} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${k * 290 + (r % 2) * 145 + 40} ${r * 130 + 60} l 0 130`} stroke="#C2B494" strokeWidth={5} />
          ))}
        </g>
      ))}
      {[230, 850].map((cx, w) => (
        <g key={cx}>
          <path d={`M ${cx - 150} 1180 L ${cx - 150} 600 Q ${cx} 360 ${cx + 150} 600 L ${cx + 150} 1180 Z`} fill="#8C8270" stroke={INK} strokeWidth={8} />
          <path d={`M ${cx - 116} 1150 L ${cx - 116} 616 Q ${cx} 420 ${cx + 116} 616 L ${cx + 116} 1150 Z`} fill={GLASS[w]} stroke={INK} strokeWidth={6} />
          {new Array(5).fill(0).map((_, k) => (
            <rect key={k} x={cx - 116 + (k % 2) * 116} y={640 + k * 104} width={116} height={104} fill={GLASS[(k + w * 2 + 1) % 5]} stroke={INK} strokeWidth={5} opacity={0.95} />
          ))}
          <path d={`M ${cx} 450 L ${cx} 1150 M ${cx - 116} 860 L ${cx + 116} 860`} stroke={INK} strokeWidth={8} />
          <path d={`M ${cx - 116} 1150 L ${cx - 260 + w * 120} 1900 L ${cx + 300 + w * 60} 1900 L ${cx + 116} 1150 Z`} fill="#FFF3C4" opacity={glow * 0.6} />
        </g>
      ))}
      {/* flagstone floor */}
      <rect x={0} y={1400} width={1080} height={520} fill={STONE} />
      <path d="M 0 1400 L 1080 1400" stroke={INK} strokeWidth={7} />
      {[1470, 1570, 1700, 1860].map((y) => (
        <path key={y} d={`M 0 ${y} L 1080 ${y}`} stroke={STONE_D} strokeWidth={6} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <path key={k} d={`M ${k * 180 - 40} 1400 L ${k * 220 - 200} 1920`} stroke={STONE_D} strokeWidth={6} />
      ))}
      {/* pews */}
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k ? 880 : -60} ${1300 + 0})`}>
          <rect x={0} y={0} width={260} height={120} fill="#7A4F2C" stroke={INK} strokeWidth={6} />
          <rect x={0} y={130} width={260} height={30} fill="#5E3A1F" stroke={INK} strokeWidth={5} />
          <rect x={20} y={160} width={24} height={90} fill="#5E3A1F" stroke={INK} strokeWidth={4} />
          <rect x={216} y={160} width={24} height={90} fill="#5E3A1F" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {/* slabs prised up, leaning */}
      <g transform="translate(160 1720) rotate(-18)">
        <rect x={-110} y={-90} width={220} height={90} fill={STONE} stroke={INK} strokeWidth={7} />
        <path d="M -80 -50 L 60 -60" stroke={STONE_D} strokeWidth={6} />
      </g>
      <g transform="translate(960 1760) rotate(14)">
        <rect x={-100} y={-80} width={200} height={80} fill={STONE} stroke={INK} strokeWidth={7} />
      </g>
    </>
  );
};

const Pigeon: React.FC<{ x: number; y: number; s?: number; f: number; k: number }> = ({ x, y, s = 1, f, k }) => {
  const flap = Math.sin(f / 1.6 + k * 2);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={40} ry={22} fill="#9AA3B5" stroke={INK} strokeWidth={5} />
      <circle cx={-36} cy={-14} r={16} fill="#7F889C" stroke={INK} strokeWidth={4} />
      <path d="M -52 -14 L -64 -8 L -50 -6 Z" fill="#E0A05A" stroke={INK} strokeWidth={3} />
      <circle cx={-40} cy={-18} r={3} fill={INK} />
      <path d={`M -8 -6 Q 10 ${-60 * flap} 40 ${-50 * flap - 10} Q 30 -6 20 0 Z`} fill="#C3C9D6" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 38 0 L 66 -10 L 64 12 Z" fill="#7F889C" stroke={INK} strokeWidth={4} />
    </g>
  );
};

// round brick dovecote with an open door onto its earth floor
const Dovecote: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={1300} width={1080} height={620} fill="#86BD5E" />
    <path d="M 0 1300 Q 300 1260 540 1300 Q 800 1340 1080 1290" stroke={INK} strokeWidth={6} fill="none" />
    <path d="M 0 1290 Q 200 1180 380 1260 L 380 1300 L 0 1300 Z" fill="#5E9E48" stroke={INK} strokeWidth={5} />
    <g>
      <path d="M 360 1480 L 360 760 Q 620 720 880 760 L 880 1480 Q 620 1520 360 1480 Z" fill="#C8693F" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {new Array(12).fill(0).map((_, r) => (
        <path key={r} d={`M 360 ${800 + r * 58} Q 620 ${770 + r * 58} 880 ${800 + r * 58}`} stroke="#A9532F" strokeWidth={5} fill="none" />
      ))}
      <path d="M 330 780 Q 620 330 910 780 Q 620 740 330 780 Z" fill="#6E4A34" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {new Array(6).fill(0).map((_, k) => (
        <path key={k} d={`M ${400 + k * 88} 760 L ${560 + k * 20} 480`} stroke="#5A3A26" strokeWidth={5} />
      ))}
      <rect x={570} y={360} width={100} height={110} fill="#E9DCC0" stroke={INK} strokeWidth={6} />
      <path d="M 552 366 L 620 300 L 688 366 Z" fill="#6E4A34" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 590 470 L 590 400 Q 620 380 650 400 L 650 470 Z" fill="#2A1A10" />
      {/* open door onto the earth floor */}
      <path d="M 540 1490 L 540 1200 Q 620 1150 700 1200 L 700 1490 Z" fill="#2A1A10" stroke={INK} strokeWidth={7} />
      <path d="M 548 1490 L 556 1400 L 684 1400 L 692 1490 Z" fill="#7A5636" />
      <path d="M 700 1200 L 780 1230 L 780 1500 L 700 1490 Z" fill="#8A5A34" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    </g>
    {[0, 1, 2, 3, 4].map((k) => {
      const t = ((f * (1.2 + k * 0.15) + k * 90) % 360) * (Math.PI / 180);
      return <Pigeon key={k} x={620 + Math.cos(t) * (260 + k * 30)} y={520 + Math.sin(t) * 110 + k * 40} s={0.9 - k * 0.06} f={f} k={k} />;
    })}
  </>
);

// red ink stamp that slams onto the screen. p 0..1
const Stamp: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number }> = ({ x, y, p, text, rot = -12, size = 150 }) => {
  if (p <= 0) return null;
  const sc = interpolate(p, [0, 0.35, 0.5], [2.8, 0.92, 1], clamp);
  const w = text.length * size * 0.7 + 80;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={interpolate(p, [0, 0.12], [0, 1], clamp)}>
      <rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.4} rx={24} fill="#FFF7EC" fillOpacity={0.85} stroke="#C21E1E" strokeWidth={16} />
      <rect x={-w / 2 + 18} y={-size * 0.78 + 18} width={w - 36} height={size * 1.4 - 36} rx={14} fill="none" stroke="#C21E1E" strokeWidth={6} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill="#C21E1E">{text}</text>
    </g>
  );
};

const Seal: React.FC<{ x: number; y: number; p: number; s?: number }> = ({ x, y, p, s = 1 }) => {
  if (p <= 0) return null;
  const sc = interpolate(p, [0, 0.3, 0.45], [2.6, 0.92, 1], clamp) * s;
  return (
    <g transform={`translate(${x} ${y}) scale(${sc}) rotate(-8)`} opacity={interpolate(p, [0, 0.1], [0, 1], clamp)}>
      <path d="M -150 0 Q -160 -60 -120 -110 Q -70 -170 0 -160 Q 80 -168 128 -112 Q 168 -50 150 10 Q 150 90 90 132 Q 20 170 -60 140 Q -140 110 -150 0 Z" fill={SEAL} stroke={INK} strokeWidth={8} />
      <circle cx={0} cy={-6} r={112} fill="none" stroke="#7E1712" strokeWidth={8} />
      <path d="M -78 34 L -88 -54 L -42 -14 L 0 -78 L 42 -14 L 88 -54 L 78 34 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-80} y={34} width={160} height={30} rx={6} fill={GOLD} stroke={INK} strokeWidth={6} />
      {[-88, 0, 88].map((cx) => <circle key={cx} cx={cx} cy={cx === 0 ? -86 : -60} r={12} fill={GOLD} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};

const Barrel: React.FC<{ x: number; y: number; s?: number; label?: string; fill?: string }> = ({ x, y, s = 1, label, fill = "#9A6A3E" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={140} ry={20} fill="#000" opacity={0.2} />
    <path d="M -110 0 Q -140 -170 -110 -340 L 110 -340 Q 140 -170 110 0 Z" fill={fill} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[-60, 0, 60].map((k) => (
      <path key={k} d={`M ${k} -336 Q ${k * 1.25} -170 ${k} -4`} stroke="#6E4A2A" strokeWidth={5} fill="none" />
    ))}
    {[-300, -60].map((yy) => (
      <path key={yy} d={`M -124 ${yy} Q 0 ${yy + 16} 124 ${yy}`} stroke={IRON} strokeWidth={18} fill="none" />
    ))}
    <ellipse cx={0} cy={-340} rx={110} ry={26} fill="#7A5232" stroke={INK} strokeWidth={6} />
    {label ? (
      <text x={0} y={-150} textAnchor="middle" fontFamily={titleFont} fontSize={label.length > 7 ? 44 : 56} fill={C.cream} stroke={INK} strokeWidth={3} paintOrder="stroke">{label}</text>
    ) : null}
  </g>
);

// one firework burst: rays + sparkle tips that expand and fade. a = age in frames (rocket trail before 0)
const Burst: React.FC<{ x: number; y: number; a: number; col: string; R?: number; n?: number; fromY?: number }> = ({ x, y, a, col, R = 260, n = 18, fromY = 1900 }) => {
  if (a < -10 || a > 44) return null;
  if (a < 0) {
    const t = (a + 10) / 10;
    const ry = lerp(fromY, y, t);
    return <path d={`M ${x} ${ry} L ${x + 4} ${ry + 90}`} stroke="#FFE7A0" strokeWidth={8} strokeLinecap="round" opacity={0.9} />;
  }
  const r = R * interpolate(a, [0, 18], [0.1, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const o = interpolate(a, [24, 44], [1, 0], clamp);
  const droop = a * a * 0.05;
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r * 0.5} fill={col} opacity={interpolate(a, [0, 6], [0.5, 0], clamp)} />
      {new Array(n).fill(0).map((_, k) => {
        const ang = (k / n) * Math.PI * 2;
        const x1 = x + Math.cos(ang) * r * 0.55;
        const y1 = y + Math.sin(ang) * r * 0.55 + droop * 0.5;
        const x2 = x + Math.cos(ang) * r;
        const y2 = y + Math.sin(ang) * r + droop;
        return (
          <g key={k}>
            <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={col} strokeWidth={9} strokeLinecap="round" />
            <circle cx={x2} cy={y2} r={9} fill="#FFFFFF" />
          </g>
        );
      })}
    </g>
  );
};

// a big proclamation unrolling at the top of the frame
const Proclaim: React.FC<{ x: number; y: number; open: number; title: string; f: number; w?: number }> = ({ x, y, open, title, f, w = 780 }) => {
  const h = 60 + open * 300;
  return (
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 16) * 1.2})`}>
      <rect x={-w / 2} y={0} width={w} height={h} fill={PARCH} stroke={INK} strokeWidth={8} />
      <g opacity={interpolate(open, [0.25, 0.5], [0, 1], clamp)}>
        <text x={0} y={70} textAnchor="middle" fontFamily={typeFont} fontSize={44} fill="#6B5636">BY THE KING · A PROCLAMATION</text>
      </g>
      <g opacity={interpolate(open, [0.5, 0.8], [0, 1], clamp)} transform={`translate(0 ${interpolate(open, [0.5, 0.8], [20, 0], clamp)})`}>
        <text x={0} y={205} textAnchor="middle" fontFamily={titleFont} fontSize={78} fill={C.brick} stroke={INK} strokeWidth={4} paintOrder="stroke">{title}</text>
      </g>
      {open > 0.9 ? <circle cx={w / 2 - 70} cy={h - 50} r={34} fill={SEAL} stroke={INK} strokeWidth={6} /> : null}
      <rect x={-w / 2 - 24} y={-22} width={w + 48} height={44} rx={22} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
      <rect x={-w / 2 - 24} y={h - 20} width={w + 48} height={44} rx={22} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
    </g>
  );
};

// a chamber pot (handle on the right); tip in degrees
const Pot: React.FC<{ x: number; y: number; s?: number; tip?: number }> = ({ x, y, s = 1, tip = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${tip}) scale(${s})`}>
    <path d="M -60 -40 L 60 -40 Q 64 30 0 40 Q -64 30 -60 -40 Z" fill="#F3F0E8" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-40} rx={70} ry={14} fill="#F3F0E8" stroke={INK} strokeWidth={6} />
    <path d="M 58 -20 Q 96 -10 60 16" stroke={INK} strokeWidth={9} fill="none" />
    <path d="M -40 -6 L 40 -6" stroke="#6E8BA8" strokeWidth={6} />
  </g>
);

export const SaltpeterMan: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "floor";
  const float: string[] = v.float ?? [];
  let sky: "day" | "paper" | "night" = "paper";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "floor") {
    // frame 0: the saltpeter man fills the frame, spade mid-swing, dirt flying at you; the family is horrified
    const X = 500;
    const Y = 1700;
    const S = 1.05;
    const off = 0.9 * CYCLE;
    const d = digPose(f, off);
    body = (
      <>
        <Cottage f={f} />
        <Folk x={150} y={1560} s={0.6} f={f} kind="woman" pose="cheeks" col="#6E8BA8" />
        <Folk x={290} y={1600} s={0.4} f={f} kind="child" pose="up" col="#C9572E" ph={1} />
        <Hole cx={740} cy={1764} rx={210} ry={66} />
        <Mound x={150} y={1930} s={1.2} />
        <Digger x={X} y={Y} s={S} f={f} g={d.g} b={d.b} load={d.load} shout={d.shout} />
        <Flung f={f} off={off} x={X} y={Y} s={S} dur={dur} />
      </>
    );
  } else if (mode === "warrant") {
    // he pulls out the King's warrant – the royal seal slams down
    const X = 620;
    const Y = 1700;
    const S = 1.05;
    const sealAt = (v.sealAt ?? 0.6) * dur;
    const w = interpolate(f, [2, sealAt - 2], [0.01, 1], clamp);
    body = (
      <>
        <Cottage f={f} />
        <Folk x={880} y={1570} s={0.6} f={f} kind="woman" pose="cheeks" col="#6E8BA8" />
        <Folk x={990} y={1600} s={0.58} f={f} kind="man" pose={f < sealAt ? "fist" : "up"} col="#7D6A55" ph={2} />
        <Hole cx={850} cy={1764} rx={200} ry={64} />
        <Mound x={150} y={1930} s={1.2} />
        <Digger x={X} y={Y} s={S} f={f} g={K[0][0]} b={K[0][1]} warrant={w} look={0} shout={f > sealAt ? 0.6 : 0} />
        <Seal x={330} y={1130} p={interpolate(f, [sealAt, sealAt + 12], [0, 1], clamp)} s={0.8} />
      </>
    );
  } else if (mode === "church") {
    // stables, cellars, dovecotes… even the church floor
    const X = 600;
    const Y = 1790;
    const S = 0.95;
    const d = digPose(f, 4);
    body = (
      <>
        <Church f={f} />
        <Folk x={210} y={1640} s={0.7} f={f} kind="vicar" pose="up" />
        <Hole cx={800} cy={1830} rx={190} ry={58} floor={STONE_D} />
        <Digger x={X} y={Y} s={S} f={f} g={d.g} b={d.b} load={d.load} shout={d.shout} />
        <Flung f={f} off={4} x={X} y={Y} s={S} dur={dur} n={4} />
      </>
    );
  } else if (mode === "dovecote") {
    // paving your pigeon house? ILLEGAL.
    sky = "day";
    const banAt = (v.banAt ?? 0.4) * dur;
    const fall = ease(f, banAt + 2, banAt + 10);
    const stamp = interpolate(f, [banAt, banAt + 12], [0, 1], clamp);
    const slabX = 290 + fall * 60;
    const slabY = 1300 + fall * 430;
    body = (
      <>
        <Dovecote f={f} />
        <Folk x={290} y={1760} s={0.8} f={f} kind="man" pose={f < banAt + 2 ? "carry" : "up"} col="#4F6B4A" shock={f < banAt ? 0.2 : 1} />
        <g transform={`translate(${slabX} ${slabY}) rotate(${fall * 24})`}>
          <rect x={-140} y={-44} width={280} height={88} rx={6} fill={STONE} stroke={INK} strokeWidth={7} />
          <path d="M -100 -10 L 80 -20 M -60 20 L 40 14" stroke={STONE_D} strokeWidth={6} />
        </g>
        {fall >= 1 ? <path d="M 240 1800 l -40 -30 M 370 1800 l 40 -34 M 310 1780 l 0 -44" stroke={INK} strokeWidth={8} strokeLinecap="round" /> : null}
        <Stamp x={600} y={820} p={stamp} text="BANNED!" size={140} />
      </>
    );
  } else if (mode === "pee") {
    // the King orders everyone: save your pee! – a townswoman tips her chamber pot into the King's barrel
    sky = "paper";
    const open = ease(f, 2, 16);
    const pour = interpolate(f, [8, 14], [0, 1], clamp);
    const PX = 820;
    const PY = 1410;
    body = (
      <>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <path d={`M ${k * 360} 1460 L ${k * 360} 780 L ${k * 360 + 180} 560 L ${k * 360 + 360} 780 L ${k * 360 + 360} 1460 Z`} fill={[PLASTER, "#F1DDB8", "#EDE1C6"][k]} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d={`M ${k * 360 + 20} 800 L ${k * 360 + 340} 800 M ${k * 360 + 20} 1100 L ${k * 360 + 340} 1100 M ${k * 360 + 60} 800 L ${k * 360 + 60} 1460 M ${k * 360 + 300} 800 L ${k * 360 + 300} 1460`} stroke={BEAM} strokeWidth={22} />
            <rect x={k * 360 + 120} y={880} width={120} height={150} fill="#BFE3EE" stroke={INK} strokeWidth={6} />
          </g>
        ))}
        <rect x={0} y={1460} width={1080} height={460} fill={STONE} />
        <path d="M 0 1460 L 1080 1460" stroke={INK} strokeWidth={7} />
        {new Array(14).fill(0).map((_, k) => (
          <ellipse key={k} cx={(k * 167) % 1080 + 40} cy={1520 + ((k * 97) % 360)} rx={50} ry={20} fill="none" stroke={STONE_D} strokeWidth={5} />
        ))}
        <Barrel x={930} y={1840} s={0.85} label="KING'S" />
        <Folk x={700} y={1860} s={0.62} f={f} kind="woman" pose="pour" col="#8A4FA0" shock={0.3} />
        {pour > 0 ? (
          <path d={`M ${PX + 30} ${PY + 6} Q ${PX + 90} ${PY + 10} ${930 - 20} ${1840 - 300 * 0.85 + 6}`} stroke={PEE} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray="26 14" strokeDashoffset={-f * 6} opacity={pour} />
        ) : null}
        <Pot x={PX} y={PY} s={0.75} tip={-70 * pour - 10} />
        <King x={300} y={1600} s={1.15} f={f} point={ease(f, 0, 10)} shout={0.4 + Math.abs(Math.sin(f / 4)) * 0.6} />
        <Proclaim x={560} y={300} open={open} title={v.title ?? "SAVE YOUR PEE!"} f={f} w={900} />
      </>
    );
  } else if (mode === "fireworks") {
    // a lit keg of gunpowder… → (answer) Bonfire Night: fireworks over the bonfire, the saltpeter man looks up
    sky = "night";
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 6], [1, 0], clamp);
    if (f < answerAt) {
      const fuse = interpolate(f, [0, answerAt], [0, 1], clamp);
      const sx = lerp(880, 630, fuse);
      const sy = lerp(620, 735, fuse);
      body = (
        <>
          <rect x={0} y={1180} width={1080} height={740} fill="#2A2232" />
          <path d="M 0 1180 L 1080 1180" stroke={INK} strokeWidth={6} />
          <circle cx={sx} cy={sy} r={120 + Math.sin(f) * 14} fill="#FFD983" opacity={0.25} />
          <Barrel x={540} y={1190} s={1.3} label="GUNPOWDER" fill="#6A4A2E" />
          <path d={`M 590 748 Q 610 740 ${sx} ${sy}`} stroke="#E8D3A2" strokeWidth={10} fill="none" />
          <path d={`M ${sx} ${sy} Q 820 640 880 620`} stroke="#5A4A3A" strokeWidth={10} fill="none" strokeDasharray="4 10" />
          {new Array(10).fill(0).map((_, k) => {
            const a = (k / 10) * Math.PI * 2 + f * 0.7;
            const r = 20 + ((f * 7 + k * 13) % 50);
            return <path key={k} d={`M ${sx} ${sy} L ${sx + Math.cos(a) * r} ${sy + Math.sin(a) * r}`} stroke={k % 2 ? "#FFF3B0" : "#FF9A2E"} strokeWidth={6} strokeLinecap="round" />;
          })}
        </>
      );
    } else {
      const lf = f - answerAt;
      const B: Array<[number, number, number, string]> = [
        [300, 700, 0, C.mustard],
        [790, 600, 5, "#FF7AA8"],
        [560, 950, 11, "#5FD3C8"],
        [870, 1000, 17, "#FFFFFF"],
        [220, 1040, 23, "#FF9A2E"],
        [640, 640, 29, "#A98BFF"],
        [330, 760, 36, "#5FD3C8"],
      ];
      const fl = Math.sin(f / 2) * 0.06 + Math.sin(f / 5) * 0.05;
      body = (
        <>
          {B.map(([bx, by, t0, col], k) => (
            <Burst key={k} x={bx} y={by} a={lf - t0 + 4} col={col} R={230 + (k % 3) * 40} />
          ))}
          <rect x={0} y={1560} width={1080} height={360} fill="#1E1A28" />
          <circle cx={780} cy={1650} r={300} fill="#FF9A2E" opacity={0.22 + fl} />
          {/* bonfire */}
          <path d="M 620 1760 L 940 1700 M 640 1700 L 930 1770 M 700 1780 L 860 1660" stroke={INK} strokeWidth={34} strokeLinecap="round" />
          <path d="M 620 1760 L 940 1700 M 640 1700 L 930 1770 M 700 1780 L 860 1660" stroke={WOOD} strokeWidth={22} strokeLinecap="round" />
          <path d={`M 630 1740 Q 640 ${1560 - fl * 300} 700 1500 Q 720 ${1420 - fl * 200} 780 ${1330 - fl * 260} Q 830 1440 860 1480 Q 930 ${1560 - fl * 200} 930 1740 Z`} fill="#FF7A1E" stroke="#C9441B" strokeWidth={6} />
          <path d={`M 690 1740 Q 700 1600 750 1560 Q 780 ${1480 - fl * 200} 800 1460 Q 830 1560 870 1740 Z`} fill="#FFC23D" />
          <path d="M 740 1740 Q 760 1640 790 1620 Q 810 1660 820 1740 Z" fill="#FFF1B0" />
          {/* crowd silhouettes */}
          {new Array(9).fill(0).map((_, k) => (
            <g key={k}>
              <circle cx={40 + k * 130} cy={1800 + (k % 2) * 26} r={46} fill="#120E18" />
              <path d={`M ${-30 + k * 130} 1920 Q ${-30 + k * 130} ${1840 + (k % 2) * 26} ${40 + k * 130} ${1838 + (k % 2) * 26} Q ${110 + k * 130} ${1840 + (k % 2) * 26} ${110 + k * 130} 1920 Z`} fill="#120E18" />
            </g>
          ))}
          <Digger x={250} y={1990} s={0.95} f={f} g={K[0][0]} b={K[0][1]} look={-1.4} awe />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={sky === "night"} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "fireworks" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
