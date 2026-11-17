import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep061 Whaleman / harpooner – the boatsteerer standing in the bow of an open whaleboat, iron raised,
// a giant sperm whale surfacing in front of him. Daylight grey-blue Pacific with warm sun (never dark).
// visual: { mode: "hunt" | "sleigh" | "lamps" | "ram" | "adrift" | "car", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           throwAt? (hunt/sleigh, 0–1), ramAt?, ram2At? (ram, 0–1), countTo? (adrift days), chipAt? (adrift, 0–1), chip?,
//           answer?, answerAccent?, answerAt?, answerSize? (car) }
// Respectful to whales: no wounds, no blood – the whale stays majestic (and cute in the twist).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKY_T = "#86B2D3";
const SKY_M = "#B7D3E6";
const SKY_H = "#F3E3BE";
const SUN = "#FFF4CC";
const SEA_FAR = "#6F9CB8";
const SEA = "#41739A";
const SEA_DD = "#22496C";
const FOAM = "#F4F9FA";
const SPRAY = "#DDEEF5";
const WH = "#5B6679";
const WH_D = "#454E60";
const WH_HI = "#8290A6";
const WH_BELLY = "#A3AEBF";
const HULL = "#F0E7D2";
const HULL_D = "#CDBE9C";
const WOOD = "#B9874F";
const WOOD_D = "#8A6236";
const SHIRT = "#C4513A";
const SHIRT_D = "#93392A";
const SHIRT_HI = "#DE7457";
const TROUS = "#DCCB9C";
const TROUS_D = "#B3A070";
const HAT = "#2B3440";
const SKIN = "#E7B48A";
const SKIN_D = "#C88E66";
const BEARD = "#5A3A24";
const IRON = "#59606E";
const IRON_HI = "#A2AABA";
const SHAFT = "#D3A866";
const ROPE = "#E6CF98";
const LAMP = "#FFE08A";
const LAMP_GLOW = "#FFB547";

type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpP = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
const bendPt = (a: P, b: P, bend: number): P => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  return [mx - (b[1] - a[1]) * bend, my + (b[0] - a[0]) * bend];
};
const rad = (d: number) => (d * Math.PI) / 180;

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 330, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 58, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep061sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SKY_T} />
      <stop offset="0.65" stopColor={SKY_M} />
      <stop offset="1" stopColor={SKY_H} />
    </linearGradient>
    <linearGradient id="ep061sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SEA_FAR} />
      <stop offset="0.35" stopColor={SEA} />
      <stop offset="1" stopColor={SEA_DD} />
    </linearGradient>
    <linearGradient id="ep061seaFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SEA} />
      <stop offset="1" stopColor={SEA_DD} />
    </linearGradient>
    <radialGradient id="ep061sun">
      <stop offset="0" stopColor={SUN} stopOpacity={0.95} />
      <stop offset="0.35" stopColor="#FFE7A6" stopOpacity={0.5} />
      <stop offset="1" stopColor="#FFE7A6" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep061lamp">
      <stop offset="0" stopColor={LAMP} stopOpacity={0.95} />
      <stop offset="0.4" stopColor={LAMP_GLOW} stopOpacity={0.4} />
      <stop offset="1" stopColor={LAMP_GLOW} stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep061hot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F2B66A" />
      <stop offset="0.7" stopColor="#F8D9A0" />
      <stop offset="1" stopColor="#FCEBC6" />
    </linearGradient>
    <linearGradient id="ep061seventies" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7FC4D8" />
      <stop offset="0.7" stopColor="#CDE6D8" />
      <stop offset="1" stopColor="#F7E2B0" />
    </linearGradient>
    <linearGradient id="ep061room" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8E5B3A" />
      <stop offset="1" stopColor="#B87A4B" />
    </linearGradient>
  </defs>
);

const Sky: React.FC<{ horizon: number; f: number; sunX?: number; sunY?: number; fill?: string }> = ({ horizon, f, sunX = 220, sunY = 700, fill = "url(#ep061sky)" }) => (
  <>
    <rect x={0} y={0} width={1080} height={horizon + 40} fill={fill} />
    <circle cx={sunX} cy={sunY} r={330} fill="url(#ep061sun)" />
    <circle cx={sunX} cy={sunY} r={82} fill={SUN} stroke={INK} strokeWidth={5} />
    {[0, 1, 2].map((k) => (
      <g key={k} transform={`translate(${((k * 430 + f * (0.5 + k * 0.2)) % 1500) - 260} ${horizon - 340 + k * 110})`} opacity={0.9}>
        <ellipse cx={0} cy={0} rx={130} ry={34} fill="#F7FAFC" />
        <ellipse cx={70} cy={-24} rx={86} ry={34} fill="#F7FAFC" />
        <ellipse cx={150} cy={2} rx={96} ry={28} fill="#F7FAFC" />
      </g>
    ))}
  </>
);

// rows of wave crests between y0 (far, small) and y1 (near, big), scrolling left with `speed`
const Waves: React.FC<{ y0: number; y1: number; f: number; speed?: number; rows?: number; col?: string; o?: number }> = ({ y0, y1, f, speed = 1, rows = 8, col = FOAM, o = 1 }) => (
  <g opacity={o}>
    {new Array(rows).fill(0).map((_, r) => {
      const t = rows === 1 ? 1 : r / (rows - 1);
      const y = lerp(y0, y1, t * t) + Math.sin(f / 9 + r) * lerp(1, 6, t);
      const amp = lerp(5, 24, t);
      const wl = lerp(80, 280, t);
      const off = (f * speed * lerp(0.6, 3.2, t) + r * 97) % wl;
      let d = `M ${-wl * 2 - off} ${y}`;
      for (let x = -wl * 2 - off; x < 1080 + wl; x += wl) d += ` q ${wl / 4} ${-amp} ${wl / 2} 0 t ${wl / 2} 0`;
      return <path key={r} d={d} stroke={col} strokeWidth={lerp(3, 9, t)} fill="none" opacity={lerp(0.35, 0.75, t)} strokeLinecap="round" strokeLinejoin="round" />;
    })}
  </g>
);

// a band of big rolling water across the front: everything below `y` is sea
const SeaFront: React.FC<{ y: number; f: number; speed?: number; amp?: number }> = ({ y, f, speed = 1, amp = 26 }) => {
  const wl = 300;
  const off = (f * speed * 3) % wl;
  let d = `M ${-wl * 2 - off} ${y}`;
  for (let x = -wl * 2 - off; x < 1080 + wl; x += wl) d += ` q ${wl / 4} ${-amp} ${wl / 2} 0 t ${wl / 2} 0`;
  d += ` L ${1080 + wl * 2} 1940 L ${-wl * 2} 1940 Z`;
  return (
    <g>
      <path d={d} fill="url(#ep061seaFront)" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={FOAM} strokeWidth={10} opacity={0.75} transform="translate(0 8)" />
    </g>
  );
};

// Sperm whale, side view, head to the LEFT; origin = blunt front of the head (mid height).
// Head ≈ 0..620, hump ≈ 980, tail stock ≈ 1520, flukes beyond. flip = face right.
const Whale: React.FC<{ x: number; y: number; s?: number; rot?: number; flip?: boolean; f: number; tail?: boolean; tailLift?: number }> = ({ x, y, s = 1, rot = 0, flip = false, f, tail = true, tailLift = 0 }) => {
  const sw = Math.sin(f / 10) * 6;
  const body =
    "M 40 -175 L 600 -186 Q 760 -190 860 -150 Q 930 -182 1010 -150 Q 1160 -116 1300 -72 L 1520 -30 L 1520 22 Q 1300 62 1060 112 Q 820 150 560 132 L 390 122 Q 210 112 74 98 Q -16 76 -22 -36 Q -20 -162 40 -175 Z";
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>
      {tail ? (
        <g transform={`rotate(${tailLift + sw * 0.3} 1520 0)`}>
          <path d="M 1500 -10 Q 1600 -150 1730 -178 Q 1680 -60 1612 -6 Q 1680 56 1730 166 Q 1600 140 1500 10 Z" fill={WH_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 1560 -40 Q 1620 -110 1690 -140" stroke={WH_HI} strokeWidth={6} fill="none" opacity={0.6} strokeLinecap="round" />
        </g>
      ) : null}
      <path d={body} fill={WH} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M 560 132 Q 820 150 1060 112 Q 1300 62 1520 22 L 1520 0 Q 1250 30 1040 70 Q 800 104 560 96 Z" fill={WH_BELLY} opacity={0.55} />
      <path d="M 60 -150 Q 330 -168 600 -170" stroke={WH_HI} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.75} />
      <path d="M -8 -60 Q -6 20 40 70" stroke={WH_HI} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.5} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M ${700 + k * 110} ${-110 + k * 14} q 20 18 0 40 q -20 22 0 44`} stroke={WH_D} strokeWidth={6} fill="none" opacity={0.7} strokeLinecap="round" />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <path key={`w${k}`} d={`M ${120 + k * 120} ${-100 + (k % 2) * 30} q 40 -8 80 0`} stroke={WH_D} strokeWidth={5} fill="none" opacity={0.5} strokeLinecap="round" />
      ))}
      <path d="M 70 92 L 400 114 Q 428 126 396 140 L 84 114 Q 52 106 70 92 Z" fill={WH_BELLY} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 92 104 L 392 126" stroke={INK} strokeWidth={4} opacity={0.6} />
      <ellipse cx={340} cy={46} rx={16} ry={13} fill={INK} />
      <circle cx={335} cy={42} r={4.5} fill="#FFF" />
      <path d="M 316 24 Q 340 16 366 26" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M 700 60 Q 740 110 690 140" stroke={WH_D} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
};

// the sperm whale's bushy blow – angled forward from the front of the head
const Blow: React.FC<{ x: number; y: number; f: number; dir?: number; s?: number; on?: number }> = ({ x, y, f, dir = -1, s = 1, on = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={on}>
    {new Array(14).fill(0).map((_, k) => {
      const age = (f * 1.4 + k * 7) % 60;
      const t = age / 60;
      const cx = dir * (t * 150 + random(`bl${k}`) * 30);
      const cy = -t * 300 - random(`bly${k}`) * 20;
      return <circle key={k} cx={cx} cy={cy} r={18 + t * 46} fill="#FFFFFF" opacity={0.85 * (1 - t)} />;
    })}
  </g>
);

// water sheeting off / splashing around a point
const Splash: React.FC<{ x: number; y: number; f: number; w?: number; seed?: string; strength?: number }> = ({ x, y, f, w = 300, seed = "sp", strength = 1 }) => (
  <g>
    <ellipse cx={x} cy={y} rx={w} ry={w * 0.14} fill={FOAM} stroke={INK} strokeWidth={4} opacity={0.95} />
    {new Array(16).fill(0).map((_, k) => {
      const age = (f * 1.2 + k * 5.3) % 34;
      const vx = (random(`${seed}x${k}`) - 0.5) * 2 * w * 0.04;
      const vy = -(6 + random(`${seed}y${k}`) * 10) * strength;
      const px = x + (random(`${seed}p${k}`) - 0.5) * w * 1.6 + vx * age;
      const py = y + vy * age + 0.5 * age * age;
      if (py > y + 10) return null;
      return <circle key={k} cx={px} cy={py} r={7 + random(`${seed}r${k}`) * 12} fill={SPRAY} stroke={INK} strokeWidth={3} />;
    })}
  </g>
);

// hand harpoon ("iron"): butt at p, pointing along ang (deg)
const Harpoon: React.FC<{ p: P; ang: number; len?: number }> = ({ p, ang, len = 360 }) => (
  <g transform={`translate(${p[0]} ${p[1]}) rotate(${ang})`}>
    <path d={`M 0 -10 L ${len} -10 L ${len} 10 L 0 10 Z`} fill={SHAFT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M 10 -3 L ${len - 30} -3`} stroke="#F0CF92" strokeWidth={4} />
    <rect x={len - 26} y={-14} width={34} height={28} rx={4} fill={ROPE} stroke={INK} strokeWidth={4} />
    <path d={`M ${len + 8} -6 L ${len + 140} -4 L ${len + 140} 4 L ${len + 8} 6 Z`} fill={IRON} stroke={INK} strokeWidth={4} />
    <path d={`M ${len + 124} 0 L ${len + 150} -30 L ${len + 214} 0 L ${len + 150} 30 Z`} fill={IRON_HI} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${len + 150} -30 L ${len + 134} -8 M ${len + 150} 30 L ${len + 134} 8`} stroke={INK} strokeWidth={4} />
  </g>
);

const RopeLine: React.FC<{ a: P; b: P; sag?: number; w?: number }> = ({ a, b, sag = 60, w = 7 }) => {
  const c: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag];
  const d = `M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 6} fill="none" strokeLinecap="round" />
      <path d={d} stroke={ROPE} strokeWidth={w} fill="none" strokeLinecap="round" />
    </g>
  );
};

// open whaleboat, side view, bow to the RIGHT; origin = waterline centre. Split in two layers so the crew sits INSIDE it.
const BoatBack: React.FC<{ len: number }> = ({ len }) => {
  const h = len / 2;
  return (
    <g>
      <path d={`M ${-h} -92 Q 0 -32 ${h} -112 L ${h - 14} -134 Q 0 -70 ${-h + 14} -114 Z`} fill={WOOD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[-0.3, 0.05, 0.38].map((k) => (
        <path key={k} d={`M ${k * len - 10} -60 L ${k * len + 14} -96`} stroke={WOOD_D} strokeWidth={10} />
      ))}
    </g>
  );
};
const BoatFront: React.FC<{ len: number; name?: string }> = ({ len, name }) => {
  const h = len / 2;
  return (
    <g>
      <path d={`M ${-h} -92 Q 0 -32 ${h} -112 Q ${h + 22} -40 ${h - 74} 40 Q 0 72 ${-h + 74} 40 Q ${-h - 22} -40 ${-h} -92 Z`} fill={HULL} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M ${-h + 30} -40 Q 0 16 ${h - 30} -56`} stroke={HULL_D} strokeWidth={5} fill="none" />
      <path d={`M ${-h + 60} 0 Q 0 46 ${h - 60} -12`} stroke={HULL_D} strokeWidth={5} fill="none" />
      <path d={`M ${-h + 4} -82 Q 0 -20 ${h - 4} -102`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${-h + 4} -82 Q 0 -20 ${h - 4} -102`} stroke={C.mustard} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d={`M ${h - 10} -116 L ${h + 26} -128 L ${h + 30} -104 L ${h - 4} -96 Z`} fill={WOOD_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {name ? (
        <text x={-h * 0.45} y={-12} fontFamily={titleFont} fontSize={44} fill={C.brick} textAnchor="middle">
          {name}
        </text>
      ) : null}
    </g>
  );
};

// small oarsman in the boat, facing the stern (left); origin = seat
const Rower: React.FC<{ x: number; y: number; s?: number; f: number; shirt?: string; cap?: string; off?: number; oar?: boolean; hold?: boolean }> = ({ x, y, s = 1, f, shirt = "#3E6E9E", cap = "#2B3440", off = 0, oar = true, hold = false }) => {
  const k = hold ? 0 : Math.sin(f / 5 + off);
  const lean = hold ? 18 : k * 22;
  const Sh: P = [lean - 6, -190];
  const hand: P = hold ? [130, -70] : [-120 + lean * 2.4, -84 + k * 10];
  const oarEnd: P = [hand[0] - 420, hand[1] + 380 - k * 40];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {oar && !hold ? (
        <g>
          <path d={`M ${hand[0] + 30} ${hand[1] - 20} L ${oarEnd[0]} ${oarEnd[1]}`} stroke={INK} strokeWidth={20} strokeLinecap="round" />
          <path d={`M ${hand[0] + 30} ${hand[1] - 20} L ${oarEnd[0]} ${oarEnd[1]}`} stroke={SHAFT} strokeWidth={11} strokeLinecap="round" />
        </g>
      ) : null}
      <path d={`M -56 0 L ${Sh[0] - 54} ${Sh[1]} L ${Sh[0] + 50} ${Sh[1]} L 60 0 Z`} fill={shirt} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M -50 -40 L 52 -40 M -46 -90 L 54 -90 M -40 -140 L 56 -140`} stroke="#F4EAD5" strokeWidth={9} opacity={0.7} />
      <path d={`M ${Sh[0] - 30} ${Sh[1] + 20} L ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={36} strokeLinecap="round" />
      <path d={`M ${Sh[0] - 30} ${Sh[1] + 20} L ${hand[0]} ${hand[1]}`} stroke={shirt} strokeWidth={24} strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r={18} fill={SKIN} stroke={INK} strokeWidth={4} />
      <circle cx={Sh[0] - 4} cy={Sh[1] - 52} r={46} fill={SKIN} stroke={INK} strokeWidth={5} />
      <circle cx={Sh[0] - 36} cy={Sh[1] - 56} r={5} fill={INK} />
      <path d={`M ${Sh[0] - 52} ${Sh[1] - 76} Q ${Sh[0] - 4} ${Sh[1] - 130} ${Sh[0] + 46} ${Sh[1] - 72} Z`} fill={cap} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M ${Sh[0] - 70} ${Sh[1] - 70} L ${Sh[0] - 30} ${Sh[1] - 76}`} stroke={INK} strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

const Seg: React.FC<{ a: P; b: P; w: number; col: string }> = ({ a, b, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} strokeLinecap="round" />
  </g>
);
const LegQ: React.FC<{ a: P; c: P; b: P; w: number; col: string }> = ({ a, c, b, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);
const Arm: React.FC<{ a: P; b: P; bend: number }> = ({ a, b, bend }) => {
  const e = bendPt(a, b, bend);
  return (
    <g>
      <Seg a={a} b={e} w={44} col={SHIRT} />
      <Seg a={e} b={b} w={34} col={SKIN} />
      <circle cx={e[0]} cy={e[1]} r={24} fill={SHIRT_D} stroke={INK} strokeWidth={4} />
      <circle cx={b[0]} cy={b[1]} r={27} fill={SKIN} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// The harpooner (boatsteerer): tarred low hat, beard, mustard neckerchief, red shirt with rolled sleeves, canvas trousers.
// Origin = feet centre, facing right. pose "aim": iron raised overhead, pumping; "throw": tp 0..1 lunges forward
// (holding=false → the iron has left his hands); "brace": leans back, hands forward low (holding on).
type Pose = "aim" | "throw" | "brace";
const Harpooner: React.FC<{ x: number; y: number; s?: number; f: number; pose?: Pose; tp?: number; holding?: boolean; aim?: number; hlen?: number }> = ({ x, y, s = 1, f, pose = "aim", tp = 0, holding = true, aim = 8, hlen = 360 }) => {
  const pump = pose === "aim" ? 0.5 + 0.5 * Math.sin(f / 4.5) : 0;
  const t = pose === "throw" ? tp : 0;
  const lean = pose === "brace" ? -64 + Math.sin(f / 3) * 6 : lerp(-16 - pump * 14, 70, t);
  const S: P = [lean, -600 + (pose === "brace" ? 36 : lerp(0, 40, t))];
  const Sb: P = [S[0] - 44, S[1] + 6];
  const Sf: P = [S[0] + 40, S[1] + 10];
  const Hd: P = [S[0] + 14 + (pose === "throw" ? t * 20 : 0), S[1] - 98];
  const hipB: P = [-36, -318];
  const hipF: P = [34, -318];
  const footB: P = [-150, 0];
  const footF: P = pose === "brace" ? [150, -40] : [lerp(130, 170, t), -50];
  // the iron is held OVER the head (shaft clears the hat), tip angled down at the whale
  let ang = aim;
  const dir0: P = [Math.cos(rad(aim)), Math.sin(rad(aim))];
  let B: P = [S[0] - 200 - dir0[0] * pump * 40, S[1] - 285 - dir0[1] * pump * 40];
  if (pose === "throw") {
    B = lerpP([S[0] - 200, S[1] - 285], [S[0] + 80, S[1] - 60], t);
    ang = aim + 8 * t;
  }
  const dir: P = [Math.cos(rad(ang)), Math.sin(rad(ang))];
  let hb: P = [B[0] + dir[0] * 50, B[1] + dir[1] * 50];
  let hf: P = [B[0] + dir[0] * 210, B[1] + dir[1] * 210];
  if (pose === "brace") {
    hf = [S[0] + 200, S[1] + 170];
    hb = [S[0] + 140, S[1] + 236];
  } else if (pose === "throw" && !holding) {
    hb = lerpP(hb, [S[0] + 250, S[1] - 20], Math.min(1, t * 1.2));
    hf = lerpP(hf, [S[0] + 260, S[1] + 70], Math.min(1, t * 1.2));
  }
  const showIron = pose !== "brace" && holding;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Arm a={Sb} b={hb} bend={pose === "brace" ? 0.12 : -0.22} />
      <LegQ a={hipB} c={bendPt(hipB, footB, -0.1)} b={footB} w={50} col={TROUS_D} />
      <LegQ a={hipF} c={bendPt(hipF, footF, -0.16)} b={footF} w={50} col={TROUS} />
      <path d={`M -78 -330 L 80 -330 L 86 -270 L -84 -270 Z`} fill={TROUS} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path
        d={`M ${Sb[0] - 24} ${Sb[1]} L ${Sf[0] + 24} ${Sf[1]} Q ${Sf[0] + 46} ${Sf[1] + 150} 74 -318 L -74 -318 Q ${Sb[0] - 46} ${Sb[1] + 150} ${Sb[0] - 24} ${Sb[1]} Z`}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <path d={`M ${Sf[0] + 4} ${Sf[1] + 30} Q ${Sf[0] + 12} ${Sf[1] + 150} 44 -320`} stroke={SHIRT_D} strokeWidth={7} fill="none" />
      <path d={`M ${Sb[0]} ${Sb[1] + 40} Q ${Sb[0] - 14} ${Sb[1] + 150} -40 -330`} stroke={SHIRT_HI} strokeWidth={7} fill="none" opacity={0.7} strokeLinecap="round" />
      <rect x={-80} y={-340} width={162} height={30} rx={6} fill="#5A3A24" stroke={INK} strokeWidth={5} />
      <rect x={-10} y={-344} width={34} height={38} rx={4} fill={C.mustard} stroke={INK} strokeWidth={4} />
      <path d={`M ${S[0] - 36} ${S[1] + 2} Q ${S[0]} ${S[1] + 28} ${S[0] + 40} ${S[1] + 2}`} stroke={C.mustard} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d={`M ${S[0] + 26} ${S[1] + 16} l 4 70 l 26 -12 Z`} fill={C.mustard} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(${Hd[0]} ${Hd[1]})`}>
        <path d="M -22 36 L -18 84 L 24 84 L 28 36 Z" fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle r={62} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -54 6 Q -48 78 8 84 Q 56 80 66 26 Q 50 46 22 44 Q 4 30 -14 40 Q -36 34 -54 6 Z" fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 14 34 Q 30 26 46 34" stroke="#3A2416" strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={-18} cy={4} rx={12} ry={17} fill={SKIN_D} stroke={INK} strokeWidth={4} />
        <path d="M 52 -6 Q 82 8 58 24" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <ellipse cx={32} cy={-10} rx={7} ry={9} fill={INK} />
        <circle cx={34} cy={-13} r={2.5} fill="#FFF" />
        <path d={pose === "brace" ? "M 16 -34 L 50 -24" : "M 14 -26 L 50 -34"} stroke={INK} strokeWidth={9} strokeLinecap="round" />
        <circle cx={44} cy={14} r={14} fill="#E58A7A" opacity={0.3} />
        <g transform="rotate(-6)">
          <ellipse cx={6} cy={-42} rx={90} ry={17} fill={HAT} stroke={INK} strokeWidth={6} />
          <path d="M -52 -46 Q -54 -118 6 -122 Q 64 -118 62 -46 Z" fill={HAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -52 -62 Q 6 -54 62 -62" stroke={C.brick} strokeWidth={12} fill="none" />
          <path d="M -24 -104 Q 4 -112 30 -104" stroke="#55606E" strokeWidth={6} fill="none" strokeLinecap="round" />
        </g>
      </g>
      {showIron ? <Harpoon p={B} ang={ang} len={hlen} /> : null}
      <Arm a={Sf} b={hf} bend={pose === "brace" ? 0.1 : 0.2} />
    </g>
  );
};

// three-masted whaleship, side view, bow to the RIGHT; origin = waterline centre (hull ≈ ±400 wide)
const Ship: React.FC<{ x: number; y: number; s?: number; rot?: number; name?: string; f: number }> = ({ x, y, s = 1, rot = 0, name, f }) => {
  const masts: [number, number][] = [
    [-230, 560],
    [20, 650],
    [250, 570],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M 300 -180 L 560 -330" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d="M 300 -180 L 560 -330" stroke="#7A5232" strokeWidth={7} strokeLinecap="round" />
      {masts.map(([mx, mh], i) => (
        <g key={i}>
          <path d={`M ${mx} -150 L ${mx} ${-150 - mh}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
          <path d={`M ${mx} -150 L ${mx} ${-150 - mh}`} stroke="#8A6236" strokeWidth={9} strokeLinecap="round" />
          {[0.3, 0.58, 0.82].map((k, j) => {
            const yy = -150 - mh * k;
            const w = 150 - j * 30;
            const billow = Math.sin(f / 12 + i + j) * 6;
            return (
              <g key={j}>
                <path d={`M ${mx - w} ${yy - 110 + j * 20} L ${mx + w} ${yy - 110 + j * 20} Q ${mx + w + 16 + billow} ${yy - 40} ${mx + w - 10} ${yy + 20 - j * 10} L ${mx - w + 10} ${yy + 20 - j * 10} Q ${mx - w + 16 + billow} ${yy - 40} ${mx - w} ${yy - 110 + j * 20} Z`} fill="#F4EBD6" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
                <path d={`M ${mx - w - 10} ${yy - 110 + j * 20} L ${mx + w + 10} ${yy - 110 + j * 20}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              </g>
            );
          })}
          <path d={`M ${mx} ${-150 - mh} L ${mx < 0 ? -400 : 400} -170`} stroke={INK} strokeWidth={3} opacity={0.6} />
        </g>
      ))}
      <path d="M -405 -190 L 400 -172 Q 450 -150 430 -70 Q 380 30 270 46 L -330 46 Q -392 20 -405 -70 Z" fill="#6B4A2E" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -400 -136 L 418 -118" stroke={INK} strokeWidth={34} />
      <path d="M -400 -136 L 418 -118" stroke="#EFE3C6" strokeWidth={24} />
      {new Array(9).fill(0).map((_, k) => (
        <rect key={k} x={-330 + k * 82} y={-144 + k * 1.8} width={30} height={20} fill="#2B2420" />
      ))}
      <path d="M -390 -60 L 420 -46" stroke="#4E3420" strokeWidth={8} />
      {[-120, 150].map((bx) => (
        <g key={bx} transform={`translate(${bx} -200)`}>
          <path d="M -90 0 Q 0 20 90 -4 Q 80 30 50 40 L -50 40 Q -84 28 -90 0 Z" fill={HULL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -70 -10 L -70 -50 M 70 -14 L 70 -54" stroke={INK} strokeWidth={6} />
        </g>
      ))}
      {name ? (
        <text x={-300} y={-10} fontFamily={titleFont} fontSize={46} fill="#EFE3C6">
          {name}
        </text>
      ) : null}
    </g>
  );
};

// small whaleboat with a scrap sail, for the "adrift" wide shot
const SailBoat: React.FC<{ x: number; y: number; s?: number; f: number; off?: number }> = ({ x, y, s = 1, f, off = 0 }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 12 + off) * 6}) rotate(${Math.sin(f / 15 + off) * 2.5}) scale(${s})`}>
    <path d="M 0 -110 L 0 -470" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path d="M 0 -110 L 0 -470" stroke="#8A6236" strokeWidth={7} strokeLinecap="round" />
    <path d={`M 10 -450 L 190 -430 Q ${170 + Math.sin(f / 9 + off) * 10} -300 190 -170 L 10 -150 Z`} fill="#EADBBE" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 40 -380 L 150 -300 M 60 -250 L 140 -230" stroke="#C9B48A" strokeWidth={6} />
    <BoatBack len={520} />
    {[-150, -40, 90].map((hx, i) => (
      <g key={hx}>
        <circle cx={hx} cy={-150} r={30} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d={`M ${hx - 34} -160 Q ${hx} ${-206 - (i % 2) * 6} ${hx + 34} -160 Z`} fill={i === 1 ? C.brick : HAT} stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <BoatFront len={520} />
  </g>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string }> = ({ x, y, p, text, rot = -8, size = 78, col = C.mustard }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 210;
      return `${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 0.75}`;
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

// oil cask, origin = bottom centre
const Cask: React.FC<{ x: number; y: number; s?: number; label?: string }> = ({ x, y, s = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={150} ry={20} fill="#000" opacity={0.2} />
    <path d="M -120 0 Q -150 -170 -120 -340 L 120 -340 Q 150 -170 120 0 Z" fill="#B07A44" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[-70, -10, 50].map((sx) => (
      <path key={sx} d={`M ${sx} -6 Q ${sx * 1.25} -170 ${sx} -334`} stroke="#8A5A30" strokeWidth={5} fill="none" />
    ))}
    {[-40, -300].map((yy) => (
      <path key={yy} d={`M -128 ${yy} Q 0 ${yy + 14} 128 ${yy}`} stroke={INK} strokeWidth={22} fill="none" />
    ))}
    {[-40, -300].map((yy) => (
      <path key={`h${yy}`} d={`M -128 ${yy} Q 0 ${yy + 14} 128 ${yy}`} stroke="#6E7488" strokeWidth={12} fill="none" />
    ))}
    {label ? (
      <g transform="translate(0 -170) rotate(-4)">
        <rect x={-118} y={-46} width={236} height={92} rx={10} fill={C.cream} stroke={INK} strokeWidth={5} />
        <text x={0} y={-6} textAnchor="middle" fontFamily={titleFont} fontSize={34} fill={INK}>
          {label.split("|")[0]}
        </text>
        <text x={0} y={34} textAnchor="middle" fontFamily={titleFont} fontSize={34} fill={C.brick}>
          {label.split("|")[1] ?? ""}
        </text>
      </g>
    ) : null}
  </g>
);

// whale-oil table lamp, origin = base bottom centre
const OilLamp: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const fl = 0.88 + 0.12 * Math.sin(f / 2.2) * Math.sin(f / 3.3);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-330} r={460} fill="url(#ep061lamp)" opacity={fl} />
      <path d="M -110 0 L 110 0 L 80 -40 L -80 -40 Z" fill="#C9973E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -24 -40 L -30 -150 L 30 -150 L 24 -40 Z" fill="#E2B24E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -100 -150 Q -120 -230 -40 -250 L 40 -250 Q 120 -230 100 -150 Z" fill="#E2B24E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -70 -190 Q 0 -170 70 -190" stroke="#F6D88A" strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={-50} y={-278} width={100} height={30} rx={6} fill="#B98535" stroke={INK} strokeWidth={5} />
      <path d="M -40 -278 Q -78 -360 -44 -440 L -34 -520 L 34 -520 L 44 -440 Q 78 -360 40 -278 Z" fill="#FFFFFF" opacity={0.45} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={0} cy={-350} rx={22 * fl} ry={44 * fl} fill={LAMP} stroke={INK} strokeWidth={4} />
      <ellipse cx={0} cy={-344} rx={10 * fl} ry={22 * fl} fill="#FFFFFF" />
    </g>
  );
};

// a friendly little sperm whale (twist), origin = centre, facing right
const CuteWhale: React.FC<{ x: number; y: number; s?: number; f: number; rot?: number }> = ({ x, y, s = 1, f, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(f / 6) * 3}) scale(${s})`}>
    <path d="M -170 10 Q -240 -40 -280 -80 Q -250 0 -280 70 Q -230 40 -170 30 Z" fill={WH_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -180 30 Q -190 -70 -60 -100 L 140 -104 Q 200 -100 200 -20 Q 200 70 120 80 L -60 80 Q -170 80 -180 30 Z" fill={WH} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -40 -84 L 140 -88" stroke={WH_HI} strokeWidth={12} strokeLinecap="round" opacity={0.8} />
    <path d="M 20 62 Q 100 70 180 30" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 120 40 Q 150 56 176 36" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={100} cy={0} rx={13} ry={16} fill={INK} />
    <circle cx={104} cy={-5} r={4.5} fill="#FFF" />
    <circle cx={130} cy={30} r={16} fill="#E58A93" opacity={0.45} />
    {[0, 1, 2].map((k) => {
      const t = ((f * 1.3 + k * 14) % 42) / 42;
      return <circle key={k} cx={170 - t * 30 + k * 16} cy={-110 - t * 120} r={10 + t * 16} fill="#E8F5FB" stroke={INK} strokeWidth={3} opacity={1 - t} />;
    })}
  </g>
);

// 1970s wood-panel station wagon, side view, front to the RIGHT with the hood up; origin = ground centre
const Wagon: React.FC<{ x: number; y: number; s?: number; f: number; hood?: number; children?: React.ReactNode }> = ({ x, y, s = 1, f, hood = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={480} ry={26} fill="#000" opacity={0.18} />
    <path d="M -440 -70 L -440 -250 L -330 -258 L -250 -400 L 120 -400 L 220 -270 L 450 -250 Q 470 -200 460 -70 Z" fill="#E08A2E" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -420 -100 L -420 -230 L 300 -230 L 300 -100 Z" fill="#9A6A3C" stroke={INK} strokeWidth={6} />
    <path d="M -420 -100 L -420 -230 L 300 -230 L 300 -100 Z" fill="none" stroke="#D9B06E" strokeWidth={10} transform="translate(0 0)" />
    {[-180, 60].map((dx) => (
      <path key={dx} d={`M ${dx} -228 L ${dx} -102`} stroke="#D9B06E" strokeWidth={8} />
    ))}
    <path d="M -320 -262 L -244 -382 L -110 -382 L -110 -262 Z" fill="#BFE3EE" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -90 -262 L -90 -382 L 30 -382 L 30 -262 Z" fill="#BFE3EE" stroke={INK} strokeWidth={6} />
    <path d="M 50 -262 L 50 -382 L 112 -382 L 200 -262 Z" fill="#BFE3EE" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -230 -360 L -200 -300 M 70 -360 L 90 -320" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
    <path d="M -470 -80 L -420 -80 L -420 -40 L -470 -40 Z M 440 -80 L 490 -80 L 490 -40 L 440 -40 Z" fill="#D7DCE2" stroke={INK} strokeWidth={5} />
    <rect x={430} y={-200} width={36} height={30} rx={6} fill="#FFF3C4" stroke={INK} strokeWidth={4} />
    {children}
    <g transform={`rotate(${-48 * hood} 230 -262)`}>
      <path d="M 230 -262 L 452 -252 L 448 -232 L 228 -244 Z" fill="#E08A2E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    </g>
    {[-270, 300].map((wx) => (
      <g key={wx} transform={`translate(${wx} -40)`}>
        <circle r={78} fill="#2A2522" stroke={INK} strokeWidth={6} />
        <circle r={50} fill="#F4F1EA" stroke={INK} strokeWidth={4} />
        <circle r={30} fill="#C9CED6" stroke={INK} strokeWidth={4} />
        <path d={`M ${-24 * Math.cos(f / 8)} ${-24 * Math.sin(f / 8)} L ${24 * Math.cos(f / 8)} ${24 * Math.sin(f / 8)}`} stroke={INK} strokeWidth={4} opacity={0} />
      </g>
    ))}
  </g>
);

// can of transmission fluid with a whale on the label, origin = bottom centre
const FluidCan: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 0 L -90 -260 L 90 -260 L 90 0 Z" fill="#C0392B" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -90 -230 L 90 -230 M -90 -30 L 90 -30" stroke="#8E2A20" strokeWidth={8} />
    <rect x={-74} y={-210} width={148} height={160} rx={8} fill={C.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-166} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick}>
      ATF
    </text>
    <path d="M -50 -96 Q -60 -126 -24 -132 L 30 -132 Q 52 -130 52 -108 Q 52 -84 30 -82 L -24 -82 Q -48 -84 -50 -96 Z" fill={WH} stroke={INK} strokeWidth={4} />
    <path d="M -50 -104 L -66 -120 L -62 -96 L -66 -76 Z" fill={WH} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    <circle cx={30} cy={-108} r={4} fill={INK} />
    <path d="M -40 -260 L -40 -290 L 0 -290 L 0 -260 Z" fill="#D7DCE2" stroke={INK} strokeWidth={5} />
  </g>
);

const House70s: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M 20 ${y} L 20 ${y - 260} L 1060 ${y - 260} L 1060 ${y} Z`} fill="#F1E1C2" stroke={INK} strokeWidth={7} />
    <path d={`M -20 ${y - 250} L 140 ${y - 400} L 1100 ${y - 400} L 1100 ${y - 250} Z`} fill="#8A5A34" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[0, 1, 2, 3].map((k) => (
      <path key={k} d={`M ${40 + k * 40} ${y - 270 - k * 36} L 1090 ${y - 270 - k * 36}`} stroke="#6E4628" strokeWidth={5} />
    ))}
    <rect x={120} y={y - 220} width={200} height={130} fill="#BFE3EE" stroke={INK} strokeWidth={6} />
    <path d={`M 220 ${y - 220} L 220 ${y - 90}`} stroke={INK} strokeWidth={5} />
    <rect x={420} y={y - 230} width={110} height={230} fill="#E07A2E" stroke={INK} strokeWidth={6} />
    <circle cx={505} cy={y - 115} r={8} fill={C.mustard} stroke={INK} strokeWidth={3} />
    <rect x={640} y={y - 220} width={340} height={130} fill="#BFE3EE" stroke={INK} strokeWidth={6} />
    <path d={`M 753 ${y - 220} L 753 ${y - 90} M 866 ${y - 220} L 866 ${y - 90}`} stroke={INK} strokeWidth={5} />
  </g>
);

const Lighthouse: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const a = Math.sin(f / 14) * 30;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M 0 -330 L ${-700 * Math.cos(rad(a + 8))} ${-330 - 700 * Math.sin(rad(a + 8))} L ${-700 * Math.cos(rad(a - 8))} ${-330 - 700 * Math.sin(rad(a - 8))} Z`} fill="#FFF3C4" opacity={0.4} />
      <path d="M -60 0 L -40 -300 L 40 -300 L 60 0 Z" fill="#F4F1EA" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -54 -80 L 54 -80 L 50 -140 L -50 -140 Z M -46 -200 L 46 -200 L 44 -250 L -44 -250 Z" fill={C.brick} />
      <rect x={-36} y={-360} width={72} height={60} fill={LAMP} stroke={INK} strokeWidth={5} />
      <path d="M -50 -360 L 0 -400 L 50 -360 Z" fill={C.brick} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    </g>
  );
};

export const Whaleman: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "hunt";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;

  if (mode === "hunt") {
    // frame 0: the harpooner fills the frame in the bow, iron raised; a giant sperm whale bursts up in front of him
    const HZ = 1010;
    const rise = interpolate(f, [0, 16], [0.6, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const wy = lerp(240, 0, rise) + Math.sin(f / 11) * 8;
    const W: P = [v.whaleX ?? 760, (v.whaleY ?? 540) + wy];
    const wr = v.whaleRot ?? 55;
    const ws = v.whaleS ?? 1.3;
    const blowAt: P = [W[0] + (40 * Math.cos(rad(wr)) + 175 * Math.sin(rad(wr))) * ws, W[1] + (40 * Math.sin(rad(wr)) - 175 * Math.cos(rad(wr))) * ws];
    const boatRock = Math.sin(f / 9) * 2;
    body = (
      <>
        <Sky horizon={HZ} f={f} sunX={170} sunY={760} />
        <rect x={0} y={HZ} width={1080} height={1920 - HZ} fill="url(#ep061sea)" />
        <Ship x={150} y={HZ + 6} s={0.16} f={f} />
        <Waves y0={HZ + 12} y1={1240} f={f} speed={0.5} rows={6} />
        <Whale x={W[0]} y={W[1]} s={ws} rot={wr} f={f} tail={false} />
        <Blow x={blowAt[0] - 10} y={blowAt[1]} f={f} dir={-1} s={1.25} on={interpolate(f, [4, 12], [0, 1], clamp)} />
        <Splash x={900} y={1130} f={f} w={300} seed="h1" />
        <SeaFront y={1140} f={f} speed={0.5} />
        <Waves y0={1220} y1={1900} f={f} speed={0.7} rows={4} o={0.7} />
        <g transform={`translate(${v.boatX ?? 70} 1790) rotate(${-6 + boatRock})`}>
          <BoatBack len={1260} />
          <Rower x={30} y={-70} s={0.92} f={f} off={0.6} />
          <Harpooner x={v.harpX ?? 370} y={-62} s={v.harpS ?? 1.45} f={f} pose="aim" aim={v.aim ?? 22} hlen={v.hlen ?? 240} />
          <BoatFront len={1260} />
        </g>
        <Splash x={700} y={1720} f={f} w={150} seed="h2" strength={0.7} />
      </>
    );
  } else if (mode === "sleigh") {
    // the iron flies, bites, and the whale takes off – the "Nantucket sleigh ride"
    const HZ = 780;
    const throwAt = (v.throwAt ?? 0.04) * dur;
    const tp = ease(f, throwAt, throwAt + 10);
    const flyA = throwAt + 7;
    const flyB = throwAt + 19;
    const fly = interpolate(f, [flyA, flyB], [0, 1], clamp);
    const towing = f > flyB + 2;
    const sp = towing ? interpolate(f, [flyB, flyB + 10], [0.6, 5], clamp) : 0.6;
    const jerk = towing ? Math.sin((f - flyB) / 1.6) * interpolate(f, [flyB, flyB + 20], [8, 1.5], clamp) : 0;
    const WS = 0.8;
    const W: P = [1330 + (towing ? Math.sin(f / 7) * 10 : 0), 925];
    const mark: P = [W[0] - 600 * WS, W[1] - 170 * WS];
    const boatT = `translate(330 1600) rotate(${-11 + jerk * 0.4})`;
    const start: P = [660, 600];
    const harp: P = [lerp(start[0], mark[0], fly), lerp(start[1], mark[1], fly) - Math.sin(fly * Math.PI) * 160];
    const bow: P = [790, 1420];
    body = (
      <>
        <Sky horizon={HZ} f={f} sunX={880} sunY={560} />
        <rect x={0} y={HZ} width={1080} height={1920 - HZ} fill="url(#ep061sea)" />
        <Waves y0={HZ + 10} y1={1060} f={f} speed={sp} rows={6} />
        <Whale x={W[0]} y={W[1]} s={WS} rot={-3} flip f={f} tail tailLift={towing ? Math.sin(f / 4) * 10 : 0} />
        <SeaFront y={985} f={f} speed={sp} amp={14} />
        {towing ? <Splash x={W[0] - 300} y={990} f={f} w={260} seed="s1" /> : null}
        <Waves y0={1060} y1={1900} f={f} speed={sp} rows={6} />
        {towing
          ? new Array(7).fill(0).map((_, k) => {
              const yy = 1150 + k * 110;
              const xx = 1180 - (((f * 40 + k * 230) % 1600));
              return <path key={k} d={`M ${xx} ${yy} L ${xx + 260} ${yy}`} stroke={FOAM} strokeWidth={10} strokeLinecap="round" opacity={0.65} />;
            })
          : null}
        {fly > 0 ? <RopeLine a={bow} b={harp} sag={towing ? 0 : 120 * (1 - fly)} w={8} /> : null}
        {fly > 0 && fly < 1 ? (
          <g transform={`translate(${harp[0]} ${harp[1]}) rotate(${lerp(-80, -35, fly)}) scale(0.6)`}>
            <Harpoon p={[-514, 0]} ang={0} len={300} />
          </g>
        ) : null}
        {fly >= 1 ? (
          <g transform={`translate(${mark[0]} ${mark[1]}) rotate(-150) scale(0.55)`}>
            <path d="M 0 -9 L 300 -9 L 300 9 L 0 9 Z" fill={SHAFT} stroke={INK} strokeWidth={6} />
          </g>
        ) : null}
        <g transform={boatT}>
          <BoatBack len={940} />
          <Rower x={-250} y={-70} s={0.85} f={f} hold={towing} off={0.3} shirt="#2E7D7A" />
          <Harpooner x={240} y={-56} s={1.15} f={f} pose={towing ? "brace" : "throw"} tp={tp} holding={f < flyA} aim={-10} hlen={300} />
          <BoatFront len={940} />
        </g>
        {towing ? <Splash x={800} y={1500} f={f} w={200} seed="s2" strength={1.4} /> : null}
      </>
    );
  }
  else if (mode === "lamps") {
    // why? the oil: a warm parlour lit by a whale-oil lamp, casks of sperm oil, a lighthouse beam through the window
    const lampP = popIn(f, 2, 10);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#D99A5B" />
        {new Array(12).fill(0).map((_, k) => (
          <rect key={k} x={k * 96} y={0} width={44} height={1380} fill="#E3AA6C" />
        ))}
        <g transform="translate(560 420)">
          <rect x={0} y={0} width={420} height={560} fill="#24406E" stroke={INK} strokeWidth={10} />
          {new Array(16).fill(0).map((_, k) => (
            <circle key={k} cx={20 + random(`st61x${k}`) * 380} cy={20 + random(`st61y${k}`) * 300} r={3 + random(`st61r${k}`) * 3} fill="#FFF6DC" opacity={0.5 + 0.4 * Math.abs(Math.sin(f / 9 + k))} />
          ))}
          <path d="M 0 440 Q 210 400 420 440 L 420 560 L 0 560 Z" fill="#35577F" />
          <Lighthouse x={300} y={460} s={0.62} f={f} />
          <path d="M 210 0 L 210 560 M 0 280 L 420 280" stroke="#7A5232" strokeWidth={14} />
          <rect x={0} y={0} width={420} height={560} fill="none" stroke="#7A5232" strokeWidth={22} />
        </g>
        <rect x={0} y={1380} width={1080} height={540} fill="#8E5B3A" />
        <path d="M 0 1380 L 1080 1380" stroke={INK} strokeWidth={8} />
        <Cask x={190} y={1540} s={1.05} label="SPERM|OIL" />
        <Cask x={420} y={1500} s={0.75} />
        <path d="M 400 1560 L 1060 1560 L 1060 1600 L 400 1600 Z" fill="#6B4026" stroke={INK} strokeWidth={6} />
        <path d="M 460 1600 L 460 1900 M 1000 1600 L 1000 1900" stroke={INK} strokeWidth={30} />
        <path d="M 460 1600 L 460 1900 M 1000 1600 L 1000 1900" stroke="#6B4026" strokeWidth={18} />
        <g transform={`translate(740 1560) scale(${0.5 + 0.5 * lampP})`}>
          <OilLamp x={0} y={0} s={1.25} f={f} />
        </g>
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${880 + k * 50} 1560)`}>
            <rect x={-12} y={-150 + k * 20} width={24} height={150 - k * 20} rx={4} fill="#FFF8E6" stroke={INK} strokeWidth={4} />
            <ellipse cx={0} cy={-168 + k * 20} rx={9} ry={16} fill={LAMP} stroke={INK} strokeWidth={3} />
          </g>
        ))}
      </>
    );
  } else if (mode === "ram") {
    // 20 Nov 1820: a sperm whale rams the Essex – twice – and she goes down
    const HZ = 920;
    const ramAt = (v.ramAt ?? 0.3) * dur;
    const ram2At = (v.ram2At ?? 0.72) * dur;
    const hitX = 850;
    const p1 = ease(f, 0, ramAt);
    const back = ease(f, ramAt + 3, (ramAt + ram2At) / 2) - ease(f, (ramAt + ram2At) / 2, ram2At);
    const wx = f < ramAt ? lerp(1180, hitX, p1) : hitX + 260 * back;
    const shake = (at: number) => (f >= at ? Math.sin((f - at) * 2.2) * interpolate(f, [at, at + 14], [16, 0], clamp) : 0);
    const sh = shake(ramAt) + shake(ram2At);
    const tilt = ease(f, ram2At, ram2At + 30);
    const b1 = f < ramAt + 22 ? popIn(f, ramAt, 6) : 0;
    const b2 = popIn(f, ram2At, 6);
    body = (
      <>
        <Sky horizon={HZ} f={f} sunX={180} sunY={640} />
        <rect x={0} y={HZ} width={1080} height={1920 - HZ} fill="url(#ep061sea)" />
        <Waves y0={HZ + 10} y1={1240} f={f} speed={0.6} rows={6} />
        <Ship x={430 + sh} y={1200 + tilt * 60} s={0.95} rot={tilt * 8 + sh * 0.15} name="ESSEX" f={f} />
        <Whale x={wx} y={1172} s={0.62} rot={-5} f={f} tail={false} />
        {new Array(5).fill(0).map((_, k) => (
          <ellipse key={k} cx={wx + 380 + k * 120} cy={1206 + (k % 2) * 8} rx={100 - k * 10} ry={16} fill={FOAM} opacity={0.8 - k * 0.12} />
        ))}
        <SeaFront y={1215} f={f} speed={0.6} amp={18} />
        <Waves y0={1290} y1={1900} f={f} speed={0.8} rows={6} />
        {f >= ramAt ? <Splash x={hitX - 20} y={1175} f={f - ramAt} w={170} seed="r1" strength={1.6} /> : null}
        <Burst x={700} y={760} p={b1} text="RAMMED!" size={90} />
        <Burst x={700} y={760} p={b2} text="TWICE!" size={100} rot={6} />
      </>
    );
  } else if (mode === "adrift") {
    // three leaky whaleboats, alone under a blazing sun; the day counter climbs; only eight survived
    const HZ = 1060;
    const countTo: number = v.countTo ?? 90;
    const c0 = (v.countFrom ?? 0.18) * dur;
    const c1 = (v.countEnd ?? 0.62) * dur;
    const day = Math.max(1, Math.round(interpolate(f, [c0, c1], [1, countTo], { ...clamp, easing: Easing.in(Easing.quad) })));
    const cardP = popIn(f, c0 - 4, 8);
    const chipAt = (v.chipAt ?? 0.7) * dur;
    const chip = popIn(f, chipAt, 9);
    body = (
      <>
        <Sky horizon={HZ} f={f * 0.3} sunX={540} sunY={760} fill="url(#ep061hot)" />
        <rect x={0} y={HZ} width={1080} height={1920 - HZ} fill="url(#ep061sea)" />
        <path d={`M 360 ${HZ + 4} Q 540 ${HZ + 300} 720 ${HZ + 4} Z`} fill="#FFE7A6" opacity={0.35} />
        <Waves y0={HZ + 10} y1={1900} f={f} speed={0.25} rows={8} />
        <SailBoat x={790} y={1220} s={0.4} f={f} off={1.2} />
        <SailBoat x={250} y={1330} s={0.55} f={f} off={2.4} />
        <SailBoat x={640} y={1600} s={0.82} f={f} off={0.2} />
        {cardP > 0 ? (
          <g transform={`translate(540 560) rotate(-2) scale(${cardP})`}>
            <rect x={-260} y={-90} width={520} height={180} rx={20} fill={C.cream} stroke={INK} strokeWidth={8} />
            <text x={0} y={36} textAnchor="middle" fontFamily={titleFont} fontSize={104} fill={INK}>
              {`DAY ${day}`}
            </text>
          </g>
        ) : null}
        {v.chip && chip > 0 ? (
          <g transform={`translate(540 800) rotate(3) scale(${chip})`}>
            <rect x={-340} y={-60} width={680} height={120} rx={18} fill={C.mustard} stroke={INK} strokeWidth={8} />
            <text x={0} y={24} textAnchor="middle" fontFamily={titleFont} fontSize={66} fill={INK} textLength={600} lengthAdjust="spacingAndGlyphs">
              {v.chip}
            </text>
          </g>
        ) : null}
      </>
    );
  }
  else if (mode === "car") {
    // twist: the sperm-oil cask on the wharf ("THE CRAZY PART?") → drop + flash → a sunny 1970s driveway:
    // a wood-panel station wagon with the hood up, a friendly whale in the engine bay, a can of ATF
    const answerAt = (v.answerAt ?? 0.45) * dur;
    if (f < answerAt) {
      const HZ = 880;
      body = (
        <>
          <Sky horizon={HZ} f={f} sunX={860} sunY={640} />
          <rect x={0} y={HZ} width={1080} height={1920 - HZ} fill="url(#ep061sea)" />
          <Waves y0={HZ + 10} y1={1060} f={f} speed={0.4} rows={4} />
          <Ship x={700} y={HZ + 150} s={0.42} f={f} />
          <rect x={0} y={1060} width={1080} height={860} fill="#A87A4C" />
          {new Array(12).fill(0).map((_, k) => (
            <path key={k} d={`M 0 ${1100 + k * 72} L 1080 ${1100 + k * 72}`} stroke="#7E5632" strokeWidth={6} />
          ))}
          <path d="M 0 1060 L 1080 1060" stroke={INK} strokeWidth={8} />
          <Cask x={700} y={1200} s={0.8} />
          <Cask x={920} y={1230} s={0.85} />
          <g transform={`translate(0 ${interpolate(f, [0, answerAt], [0, -20], clamp)})`}>
            <Cask x={330} y={1250} s={1.3} label="SPERM|OIL" />
          </g>
        </>
      );
    } else {
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      const chip = popIn(f, answerAt + (v.chipDelay ?? 14), 9);
      const peek = popIn(f, answerAt + 6, 12);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep061seventies)" />
          <circle cx={170} cy={700} r={300} fill="url(#ep061sun)" />
          <circle cx={170} cy={700} r={90} fill="#FFD27A" stroke={INK} strokeWidth={5} />
          <House70s y={1000} />
          <rect x={0} y={1000} width={1080} height={920} fill="#8DBA5A" />
          <path d="M 160 1000 L 920 1000 L 1080 1500 L 1080 1920 L 0 1920 L 0 1500 Z" fill="#C9C3B6" stroke={INK} strokeWidth={6} />
          <Wagon x={470} y={1235} s={0.95} f={0} hood={ease(f, answerAt, answerAt + 8)}>
            <g transform={`translate(330 ${-250 - 110 * peek})`}>
              <CuteWhale x={0} y={0} s={0.85 * Math.max(0.01, peek)} f={f} rot={-8} />
            </g>
            <path d="M 236 -262 L 452 -252 L 448 -232 L 236 -240 Z" fill="#3A3330" stroke={INK} strokeWidth={5} />
          </Wagon>
          <FluidCan x={975} y={1240} s={0.62} rot={6} />
          {chip > 0 && v.chip ? (
            <g transform={`translate(540 ${v.chipY ?? 540}) rotate(-3) scale(${chip})`}>
              <rect x={-380} y={-58} width={760} height={116} rx={18} fill={C.mustard} stroke={INK} strokeWidth={8} />
              <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={58} fill={INK} textLength={700} lengthAdjust="spacingAndGlyphs">
                {v.chip}
              </text>
            </g>
          ) : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "car" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.45) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 100} color={C.brick} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
