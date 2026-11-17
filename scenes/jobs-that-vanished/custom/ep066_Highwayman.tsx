import React from "react";
import { Easing, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep066 Highwayman – "Stand and deliver!": a masked rider in a gold-trimmed tricorn and claret coat on a rearing black
// horse, pistol raised, on a moonlit English heath with a coach lantern behind. Then the brutal real Dick Turpin
// (his gang's raid on a 70-year-old farmer – said, never shown), caught over a shot rooster, hanged at York for horse
// theft (no gallows shown), and the twist: the famous ride to York on Black Bess is fiction (Ainsworth's Rookwood, 1834)
// – today his TV comedy is literally called "The Completely Made-Up Adventures of Dick Turpin" (2024).
// Cartoon action only: nobody is hurt on screen.
// visual: { mode: "rear" | "hold" | "farm" | "caught" | "book" | "tv", headline?, accent?, top?, size?, tag?, tagX?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?, bubble?, bubbleAt?, purseAt? (hold),
//           turnAt? (farm), shotAt?, lockAt?, stamp? (caught), answer?, answerAccent?, answerAt?, answerSize? (book),
//           title?, chip? (tv) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const COAT = "#A3262A";
const COAT_D = "#741A1E";
const COAT_HI = "#C9473F";
const GOLD = "#F2B544";
const GOLD_D = "#C98A1E";
const CAPE = "#1E1B28";
const CAPE_IN = "#8E2430";
const HATC = "#18161F";
const MASK = "#0E0E13";
const SKIN = "#EDB98E";
const SKIN_D = "#CF9466";
const HAIR = "#2A2018";
const CRAVAT = "#F6F0E2";
const BREECH = "#E3CFA4";
const BOOTC = "#1E1A1C";
const CUFF = "#8A5A34";
const HORSE = "#2E2738";
const HORSE_D = "#1B1622";
const HORSE_HI = "#6A5F86";
const BAY = "#9A5A2E";
const BAY_D = "#6E3C1C";
const BAY_HI = "#C07E4A";
const MANE = "#121016";
const HOOF = "#3A2A20";
const BLAZE = "#F4EEE2";
const STEEL = "#A7B0BC";
const STEEL_D = "#5E6670";
const WOODC = "#8A5530";
const WOOD_D = "#5A341A";
const MOON = "#FFF3CF";
const GLOW = "#FFD983";
const HEATH = "#3D4A72";
const HEATH_D = "#2A3356";
const HEATH_N = "#4C5A86";
const GORSE = "#F2C744";
const ROAD = "#9C8462";
const ROAD_D = "#7A6448";
const COACH = "#8E2229";
const COACH_D = "#621519";
const COACH_K = "#1F1D26";
const WHEEL = "#E0B23A";
const STONE = "#8E8A86";
const STONE_D = "#6C6864";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 70 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
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

// ---------- horse (silhouette approach after ep048, own poses: rear / stand / gallop) ----------
// two-segment leg from hip h: a1 = thigh angle from straight down (+ = forward), a2 = shin bend relative to the thigh
const Leg: React.FC<{ h: P; l1: number; l2: number; a1: number; a2: number; w1: number; w2: number; col: string; sock?: boolean }> = ({ h, l1, l2, a1, a2, w1, w2, col, sock }) => {
  const k: P = [h[0] + l1 * Math.sin(rad(a1)), h[1] + l1 * Math.cos(rad(a1))];
  const ft: P = [k[0] + l2 * Math.sin(rad(a1 + a2)), k[1] + l2 * Math.cos(rad(a1 + a2))];
  const sk: P = [lerp(k[0], ft[0], 0.55), lerp(k[1], ft[1], 0.55)];
  return (
    <g>
      <path d={`M ${h[0]} ${h[1]} L ${k[0]} ${k[1]}`} stroke={INK} strokeWidth={w1 + 13} strokeLinecap="round" />
      <path d={`M ${k[0]} ${k[1]} L ${ft[0]} ${ft[1]}`} stroke={INK} strokeWidth={w2 + 13} strokeLinecap="round" />
      <path d={`M ${h[0]} ${h[1]} L ${k[0]} ${k[1]}`} stroke={col} strokeWidth={w1} strokeLinecap="round" />
      <path d={`M ${k[0]} ${k[1]} L ${ft[0]} ${ft[1]}`} stroke={col} strokeWidth={w2} strokeLinecap="round" />
      {sock ? <path d={`M ${sk[0]} ${sk[1]} L ${ft[0]} ${ft[1]}`} stroke={BLAZE} strokeWidth={w2} strokeLinecap="round" /> : null}
      <g transform={`translate(${ft[0]} ${ft[1]}) rotate(${-(a1 + a2)})`}>
        <path d="M -24 -10 L 24 -10 L 30 24 L -30 24 Z" fill={HOOF} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  );
};

const BODY_PARTS = (head: number, hx: number) => [
  <ellipse key="b" cx={0} cy={0} rx={238} ry={118} />,
  <circle key="r" cx={-188} cy={-16} r={122} />,
  <circle key="c" cx={176} cy={-4} r={116} />,
  <path key="n" d={`M 105 -60 C 150 -170 ${215 + hx} ${-262 + head} ${288 + hx} ${-322 + head} L ${392 + hx} ${-262 + head} C 345 -190 300 -90 272 24 Z`} />,
  <path key="h" d={`M ${272 + hx} ${-334 + head} C ${310 + hx} ${-374 + head} ${372 + hx} ${-362 + head} ${398 + hx} ${-324 + head} L ${506 + hx} ${-206 + head} C ${524 + hx} ${-180 + head} ${508 + hx} ${-150 + head} ${480 + hx} ${-150 + head} C ${452 + hx} ${-150 + head} ${432 + hx} ${-160 + head} ${412 + hx} ${-172 + head} L ${300 + hx} ${-248 + head} Z`} />,
];

type Pose = "rear" | "stand" | "gallop";
// origin: x = barrel centre, gy = ground line. rear = degrees the front is lifted. rider = node drawn at the saddle
// (kept upright: counter-rotated by the rear angle).
const Steed: React.FC<{ x: number; gy: number; s?: number; f: number; pose?: Pose; flip?: boolean; bay?: boolean; rear?: number; rider?: React.ReactNode; saddle?: boolean; stride?: number; off?: number; lean?: number }> = ({ x, gy, s = 1, f, pose = "stand", flip = false, bay = false, rear = 34, rider, saddle = true, stride = 12, off = 0, lean = 4 }) => {
  const col = bay ? BAY : HORSE;
  const dark = bay ? BAY_D : HORSE_D;
  const hi = bay ? BAY_HI : HORSE_HI;
  const t = (f + off) / stride;
  const run = pose === "gallop";
  const isRear = pose === "rear";
  const ang = isRear ? rear + 3 * Math.sin(f / 7) : 0;
  const bob = run ? 12 * Math.cos(2 * Math.PI * t) : 0;
  const pitch = run ? 3 * Math.sin(2 * Math.PI * t) : 0;
  const head = isRear ? -55 + 12 * Math.sin(f / 5) : run ? 6 * Math.sin(2 * Math.PI * t + 1) : 4 * Math.sin(f / 14);
  const hx = isRear ? 10 : 0;
  const tw = run || isRear ? 18 * Math.sin(f / 2.6) : 6 * Math.sin(f / 9);
  const tailLift = run ? 0 : isRear ? -40 : 60;
  const Y = gy - (isRear ? 376 : run ? 372 : 386) * s;
  const legs: { h: P; front: boolean; off: number; far: boolean }[] = [
    { h: [-150, 40], front: false, off: 0, far: true },
    { h: [205, 55], front: true, off: 0.5, far: true },
    { h: [-185, 45], front: false, off: 0.1, far: false },
    { h: [170, 60], front: true, off: 0.6, far: false },
  ];
  const legAng = (L: { front: boolean; off: number; far: boolean }): [number, number] => {
    if (isRear) {
      if (L.front) {
        const k = Math.sin(f / 3.4 + (L.far ? 1.6 : 0));
        return [72 + 26 * k, -108 - 22 * k];
      }
      return [22 - ang + (L.far ? -8 : 0), -32];
    }
    if (!run) return L.front ? [3, 0] : [-8, 10];
    const p = 2 * Math.PI * (t - L.off);
    const sn = Math.sin(p);
    const fold = Math.pow(Math.max(0, Math.cos(p)), 1.5);
    return L.front ? [12 + 44 * sn, -118 * fold] : [-10 + 38 * sn, 16 - 82 * fold];
  };
  const parts = BODY_PARTS(head, hx);
  return (
    <g transform={`translate(${x} ${Y + bob}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`rotate(${-ang + pitch} -170 45)`}>
        {legs.map((L, i) => {
          const [a1, a2] = legAng(L);
          return <Leg key={i} h={L.h} l1={L.front ? 150 : 162} l2={L.front ? 152 : 158} a1={a1} a2={a2} w1={L.front ? 70 : 84} w2={40} col={L.far ? dark : col} sock={!bay && !L.far} />;
        })}
        <path d={`M -290 -70 C -360 ${-150 + tw + tailLift} -450 ${-110 + tw + tailLift * 1.6} -530 ${-130 + 2 * tw + tailLift * 2.6} C -480 ${-60 + tw + tailLift * 2} -410 ${-10 + tailLift} -300 -14 Z`} fill={MANE} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <g fill={INK} stroke={INK} strokeWidth={15} strokeLinejoin="round">{parts}</g>
        <g fill={col}>{parts}</g>
        <path d="M -250 -70 Q -120 -20 -150 108" stroke={dark} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d="M 150 -90 Q 120 20 170 100" stroke={dark} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d="M -220 -110 Q -120 -132 -20 -118" stroke={hi} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
        <path d={`M 130 -110 C 170 -180 ${230 + hx} ${-260 + head} ${280 + hx} ${-300 + head}`} stroke={hi} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
        <g transform={`translate(${hx} ${head})`}>
          <path d="M 450 -216 L 506 -206 C 524 -180 508 -150 480 -150 C 458 -150 440 -158 424 -170 Z" fill={dark} />
          {!bay ? <path d="M 352 -336 L 468 -214 L 450 -206 L 340 -322 Z" fill={BLAZE} /> : null}
          <path d={isRear || run ? "M 296 -328 L 238 -370 L 322 -346 Z" : "M 300 -330 L 296 -404 L 334 -342 Z"} fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <circle cx={350} cy={-298} r={13} fill={isRear ? "#FFFFFF" : INK} stroke={INK} strokeWidth={isRear ? 4 : 0} />
          <circle cx={isRear ? 355 : 354} cy={-300} r={isRear ? 6 : 4} fill={isRear ? INK : "#FFFFFF"} />
          <ellipse cx={494} cy={-186} rx={10} ry={6} fill={INK} transform="rotate(40 494 -186)" />
          {isRear ? <path d="M 470 -160 Q 490 -140 508 -158" stroke={INK} strokeWidth={6} fill="#6B2A22" strokeLinecap="round" /> : <path d="M 462 -158 Q 480 -152 500 -160" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />}
          {saddle ? (
            <g>
              <path d="M 318 -336 L 410 -214 M 420 -236 L 466 -168" stroke={COAT_D} strokeWidth={11} strokeLinecap="round" />
              <circle cx={466} cy={-168} r={9} fill={GOLD} stroke={INK} strokeWidth={4} />
              <circle cx={410} cy={-214} r={8} fill={GOLD} stroke={INK} strokeWidth={4} />
            </g>
          ) : (
            <path d="M 318 -336 L 410 -214 M 420 -236 L 466 -168" stroke={WOOD_D} strokeWidth={10} strokeLinecap="round" />
          )}
        </g>
        {new Array(7).fill(0).map((_, i) => {
          const u = i / 6;
          const bx = lerp(292 + hx, 116, u);
          const by = lerp(-326 + head, -74, u);
          const nx = lerp(292 + hx, 116, Math.min(1, u + 0.17));
          const ny = lerp(-326 + head, -74, Math.min(1, u + 0.17));
          const fl = run || isRear ? 14 * Math.sin(f / 2 + i * 1.3) : 3 * Math.sin(f / 8 + i);
          const tx = (bx + nx) / 2 - (run || isRear ? 50 : 30) + fl * 0.6;
          const ty = (by + ny) / 2 - (run || isRear ? 26 : -10) + fl * 0.4;
          return <path key={i} d={`M ${bx + 6} ${by + 6} L ${tx} ${ty} L ${nx + 6} ${ny + 8} Z`} fill={MANE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
        })}
        {saddle ? (
          <g transform="translate(-15 -125)">
            <path d="M -130 -6 Q 0 -22 126 -6 L 134 96 Q 0 112 -138 96 Z" fill={COAT_D} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d="M -116 80 Q 0 96 120 80" stroke={GOLD} strokeWidth={8} fill="none" />
            <path d="M -100 -20 Q -40 14 60 8 Q 110 -8 126 -30 L 130 4 Q 20 30 -110 16 Z" fill="#3A2416" stroke={INK} strokeWidth={6} />
          </g>
        ) : null}
        {rider ? <g transform={`translate(-15 -128) rotate(${ang - pitch + lean})`}>{rider}</g> : null}
      </g>
    </g>
  );
};

// ---------- the highwayman ----------
// flintlock pistol, local: hand at 0,0, barrel along +x, muzzle at ~168
const Pistol: React.FC<{ fire?: number }> = ({ fire = 0 }) => (
  <g>
    {fire > 0 ? (
      <g transform={`translate(176 -8) scale(${fire})`}>
        <polygon points="0,-60 26,-22 82,-30 40,4 90,40 26,30 0,72 -10,26 -40,20 -8,-6" fill={GLOW} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={22} cy={4} r={20} fill="#FFFFFF" />
      </g>
    ) : null}
    <path d="M 20 -2 L 132 -2 L 132 10 L 14 10 Z" fill={WOODC} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={26} y={-17} width={136} height={15} rx={4} fill={STEEL} stroke={INK} strokeWidth={5} />
    <path d="M 34 -13 L 150 -13" stroke="#E4E9F0" strokeWidth={3} strokeLinecap="round" />
    <rect x={156} y={-20} width={14} height={21} rx={3} fill={GOLD} stroke={INK} strokeWidth={4} />
    <rect x={-6} y={-20} width={40} height={18} rx={3} fill={STEEL_D} stroke={INK} strokeWidth={4} />
    <path d="M 4 -20 Q -6 -40 8 -44 L 16 -34 Q 10 -28 14 -20 Z" fill={STEEL_D} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -6 -6 Q -30 22 -34 60 Q -22 72 -8 64 Q -2 30 20 8 Z" fill={WOODC} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={-22} cy={64} r={11} fill={GOLD} stroke={INK} strokeWidth={4} />
    <path d="M 6 6 Q 10 30 30 26" stroke={GOLD_D} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

// three-cornered hat, local origin = where it sits on the head
const Tricorn: React.FC<{ plume?: boolean }> = ({ plume = false }) => (
  <g>
    <ellipse cx={2} cy={-56} rx={50} ry={30} fill={HATC} stroke={INK} strokeWidth={7} />
    {plume ? <path d="M -40 -70 Q -110 -150 -10 -150 Q 40 -140 20 -90" fill="#F6F0E2" stroke={INK} strokeWidth={5} /> : null}
    <path d="M -116 -8 Q -106 -62 -72 -76 Q -32 -42 0 -48 Q 36 -42 78 -78 Q 112 -62 122 -10 Q 62 6 6 22 Q -52 6 -116 -8 Z" fill={HATC} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -110 -12 Q -100 -58 -72 -70 Q -32 -38 0 -43 Q 36 -38 78 -72 Q 106 -58 116 -14" stroke={GOLD} strokeWidth={7} fill="none" strokeLinecap="round" />
    <circle cx={-6} cy={-30} r={12} fill={COAT} stroke={INK} strokeWidth={4} />
  </g>
);

type Face = "shout" | "sneer" | "hero" | "scowl" | "glum";
// the rider, upright, facing right. Origin = the seat (or the hip when standing). aim = pistol angle (deg, 0 = right, -90 = up).
// legs: "ride" (seated) | "none" (coat falls straight – bust shots)
const Rider: React.FC<{ f: number; aim?: number | null; fire?: number; face?: Face; wind?: number; mask?: boolean; legs?: "ride" | "none"; pocks?: boolean; cape?: boolean; plume?: boolean; armsUp?: boolean; chains?: boolean }> = ({ f, aim = -20, fire = 0, face = "sneer", wind = 1, mask = true, legs = "ride", pocks = false, cape = true, plume = false, armsUp = false, chains = false }) => {
  const w = Math.sin(f / 3) * 14 * wind;
  const recoil = fire > 0 ? -10 * fire : 0;
  const a = (aim ?? 0) + recoil;
  const S: P = [34, -192];
  const el: P = [S[0] + 88 * Math.cos(rad(a + 28)), S[1] + 88 * Math.sin(rad(a + 28))];
  const hd: P = [el[0] + 84 * Math.cos(rad(a)), el[1] + 84 * Math.sin(rad(a))];
  const arm = (p: P[], col: string) => (
    <>
      <path d={`M ${p[0][0]} ${p[0][1]} L ${p[1][0]} ${p[1][1]} L ${p[2][0]} ${p[2][1]}`} stroke={INK} strokeWidth={58} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${p[0][0]} ${p[0][1]} L ${p[1][0]} ${p[1][1]} L ${p[2][0]} ${p[2][1]}`} stroke={col} strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  const backHand: P = armsUp ? [-40, -420 + Math.sin(f / 4) * 6] : [118, -78];
  const backEl: P = armsUp ? [-70, -300] : [52, -112];
  return (
    <g>
      {cape ? (
        <path d={`M -20 -218 Q -150 ${-206 + w} -300 ${-156 + w * 1.5} Q -246 ${-50 + w} ${-292 + w * 0.5} ${50 + w} Q -150 30 -40 -30 Z`} fill={CAPE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      ) : null}
      {cape ? <path d={`M -60 -190 Q -170 ${-160 + w} -250 ${-120 + w * 1.4}`} stroke={CAPE_IN} strokeWidth={10} fill="none" strokeLinecap="round" /> : null}
      {legs === "ride" ? (
        <>
          <path d={`M -40 -50 Q -110 10 -156 116 L -64 132 Q -12 60 10 -20 Z`} fill={COAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -150 108 L -66 124" stroke={GOLD} strokeWidth={7} strokeLinecap="round" />
          <path d="M 0 0 L 80 58" stroke={INK} strokeWidth={70} strokeLinecap="round" />
          <path d="M 0 0 L 80 58" stroke={BREECH} strokeWidth={58} strokeLinecap="round" />
          <path d="M 80 58 L 66 168" stroke={INK} strokeWidth={62} strokeLinecap="round" />
          <path d="M 80 58 L 66 168" stroke={BOOTC} strokeWidth={50} strokeLinecap="round" />
          <ellipse cx={80} cy={70} rx={38} ry={20} fill={CUFF} stroke={INK} strokeWidth={5} />
          <path d="M 40 150 L 94 152 Q 124 162 120 186 L 36 186 Z" fill={BOOTC} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 30 186 Q 76 214 124 186" stroke={GOLD} strokeWidth={8} fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M -60 -40 L -84 400 L 92 400 L 70 -40 Z" fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 4 -30 L 0 400" stroke={COAT_D} strokeWidth={8} />
          <path d="M 60 -36 L 82 400" stroke={GOLD} strokeWidth={7} />
        </>
      )}
      {/* back arm */}
      {arm([[-6, -186], backEl, backHand], COAT_D)}
      <circle cx={backHand[0]} cy={backHand[1]} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* torso */}
      <path d="M -50 -26 Q -58 -130 -46 -206 Q 6 -230 60 -206 Q 72 -120 62 -26 Z" fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -30 -196 Q -40 -120 -34 -40" stroke={COAT_HI} strokeWidth={8} fill="none" opacity={0.7} strokeLinecap="round" />
      <path d="M 52 -200 Q 64 -120 58 -32" stroke={GOLD} strokeWidth={8} fill="none" strokeLinecap="round" />
      {[-170, -134, -98, -62].map((by) => (
        <circle key={by} cx={42} cy={by} r={7} fill={GOLD} stroke={INK} strokeWidth={3} />
      ))}
      <rect x={-52} y={-52} width={116} height={20} fill={HATC} stroke={INK} strokeWidth={4} />
      <rect x={-4} y={-56} width={26} height={28} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
      {chains ? (
        <g>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <ellipse key={k} cx={-30 + k * 26} cy={-90 + Math.sin(k + f / 6) * 3} rx={16} ry={10} fill="none" stroke="#5E6670" strokeWidth={8} />
          ))}
        </g>
      ) : null}
      {/* cravat + neck */}
      <rect x={4} y={-246} width={40} height={34} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <path d="M 2 -222 Q 28 -228 52 -214 L 46 -176 Q 32 -156 22 -186 Q 12 -160 4 -178 Z" fill={CRAVAT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {/* head */}
      <g transform={`translate(0 ${Math.sin(f / 9) * 2})`}>
        <path d={`M -24 -292 Q -60 ${-282 + w * 0.3} -66 ${-246 + w * 0.3}`} stroke={HAIR} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M -38 -276 l -18 -16 l 6 26 Z M -38 -276 l -22 6 l 18 12 Z" fill={MASK} stroke={INK} strokeWidth={3} />
        <circle cx={24} cy={-282} r={56} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M -30 -290 Q -24 -338 30 -338 Q 6 -318 -10 -300 Q -16 -270 -26 -256 Z" fill={HAIR} />
        <ellipse cx={-6} cy={-276} rx={11} ry={16} fill={SKIN_D} stroke={INK} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} cx={20 + (k % 3) * 14} cy={-240 + Math.floor(k / 3) * 10} r={3} fill="#9C6E50" opacity={0.8} />
        ))}
        {pocks ? [0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={12 + random(`pk${k}`) * 46} cy={-276 + random(`pq${k}`) * 30} r={4.5} fill="#B9785A" stroke={SKIN_D} strokeWidth={2} />) : null}
        <path d="M 74 -284 Q 98 -262 78 -254" stroke={INK} strokeWidth={5} fill={SKIN} strokeLinecap="round" />
        {mask ? (
          <g>
            <path d={`M -26 -300 l ${-46 + w * 0.5} ${-10 + w * 0.4} l 6 14 Z`} fill={MASK} stroke={INK} strokeWidth={3} />
            <path d="M -30 -306 Q 30 -322 84 -306 L 86 -272 Q 70 -264 56 -270 Q 30 -284 -30 -274 Z" fill={MASK} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <ellipse cx={52} cy={-290} rx={14} ry={10} fill="#FFFFFF" />
            <circle cx={57} cy={-290} r={6} fill={INK} />
          </g>
        ) : (
          <g>
            <ellipse cx={52} cy={-290} rx={face === "hero" ? 9 : 8} ry={face === "hero" ? 11 : 8} fill={INK} />
            {face === "hero" ? <circle cx={55} cy={-294} r={3} fill="#FFFFFF" /> : null}
          </g>
        )}
        <path d={face === "hero" ? "M 34 -316 Q 54 -326 74 -316" : face === "glum" ? "M 36 -318 L 76 -312" : "M 34 -322 L 78 -306"} stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
        {face === "shout" ? <path d="M 40 -248 Q 62 -258 80 -246 Q 76 -214 54 -218 Q 40 -226 40 -248 Z" fill="#6B2A22" stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
        {face === "shout" ? <path d="M 44 -248 L 76 -248" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" /> : null}
        {face === "sneer" || face === "scowl" ? <path d={face === "sneer" ? "M 42 -242 Q 62 -236 80 -252" : "M 44 -238 Q 60 -246 78 -238"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        {face === "sneer" ? <path d="M 66 -242 L 70 -232 L 74 -244 Z" fill="#FFFFFF" stroke={INK} strokeWidth={2} /> : null}
        {face === "hero" ? <path d="M 36 -250 Q 60 -222 84 -252 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
        {face === "glum" ? <path d="M 44 -236 Q 60 -248 78 -236" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        <g transform="translate(20 -322) rotate(-4)">
          <Tricorn plume={plume} />
        </g>
      </g>
      {/* front arm + pistol */}
      {aim !== null && !armsUp ? (
        <g>
          {arm([S, el, hd], COAT)}
          <g transform={`translate(${hd[0]} ${hd[1]}) rotate(${a})`}>
            <Pistol fire={fire} />
            <circle cx={0} cy={0} r={23} fill={SKIN} stroke={INK} strokeWidth={5} />
            <path d="M -30 -20 L -30 22" stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
          </g>
        </g>
      ) : (
        <g>
          {arm([S, armsUp ? [70, -300] : [60, -110], armsUp ? [50, -420 + Math.sin(f / 4 + 1) * 6] : [100, -70]], COAT)}
          <circle cx={armsUp ? 50 : 100} cy={armsUp ? -420 + Math.sin(f / 4 + 1) * 6 : -70} r={23} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      )}
    </g>
  );
};

// ---------- English coach (no lettering), facing right, origin = ground centre ----------
const Wheel: React.FC<{ x: number; y: number; r: number; f: number; spin?: number }> = ({ x, y, r, f, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${f * spin})`}>
    {new Array(12).fill(0).map((_, i) => (
      <path key={i} d={`M 0 0 L ${Math.cos((i / 12) * Math.PI * 2) * r} ${Math.sin((i / 12) * Math.PI * 2) * r}`} stroke={INK} strokeWidth={13} />
    ))}
    {new Array(12).fill(0).map((_, i) => (
      <path key={i} d={`M 0 0 L ${Math.cos((i / 12) * Math.PI * 2) * r} ${Math.sin((i / 12) * Math.PI * 2) * r}`} stroke={WHEEL} strokeWidth={6} />
    ))}
    <circle r={r} fill="none" stroke={INK} strokeWidth={22} />
    <circle r={r} fill="none" stroke={WHEEL} strokeWidth={9} />
    <circle r={r * 0.2} fill={WHEEL} stroke={INK} strokeWidth={6} />
  </g>
);

const Coachman: React.FC<{ f: number; up: boolean }> = ({ f, up }) => {
  const j = Math.sin(f / 2.5) * 5;
  return (
    <g>
      <path d="M -50 0 Q -60 -110 -36 -160 L 40 -160 Q 60 -100 50 0 Z" fill="#7A6A4E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -40 -150 Q 0 -120 44 -150 L 40 -176 L -36 -176 Z" fill="#6A5A40" stroke={INK} strokeWidth={5} />
      <rect x={-34} y={-188} width={70} height={20} rx={8} fill={C.brick} stroke={INK} strokeWidth={4} />
      {up ? (
        <>
          <path d={`M -30 -150 L -64 ${-250 + j}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
          <path d={`M -30 -150 L -64 ${-250 + j}`} stroke="#6A5A40" strokeWidth={20} strokeLinecap="round" />
          <path d={`M 30 -150 L 66 ${-252 - j}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
          <path d={`M 30 -150 L 66 ${-252 - j}`} stroke="#6A5A40" strokeWidth={20} strokeLinecap="round" />
          <circle cx={-64} cy={-256 + j} r={15} fill={SKIN} stroke={INK} strokeWidth={4} />
          <circle cx={66} cy={-258 - j} r={15} fill={SKIN} stroke={INK} strokeWidth={4} />
        </>
      ) : (
        <path d="M 30 -140 L 90 -100" stroke={INK} strokeWidth={22} strokeLinecap="round" />
      )}
      <circle cx={4} cy={-222} r={38} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={20} cy={-226} r={up ? 9 : 5} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={22} cy={-226} r={4} fill={INK} />
      {up ? <ellipse cx={22} cy={-200} rx={9} ry={11} fill="#6B2A22" stroke={INK} strokeWidth={3} /> : null}
      <rect x={-30} y={-312} width={64} height={58} rx={5} fill={HATC} stroke={INK} strokeWidth={5} />
      <rect x={-48} y={-262} width={100} height={12} rx={6} fill={HATC} stroke={INK} strokeWidth={4} />
    </g>
  );
};

const Coach: React.FC<{ x: number; y: number; s?: number; f: number; flip?: boolean; hands?: number; driverUp?: boolean; spin?: number; shake?: number }> = ({ x, y, s = 1, f, flip = false, hands = 0, driverUp = false, spin = 0, shake = 0 }) => {
  const sw = Math.sin(f / 6) * 10;
  const hw = Math.sin(f / 3) * 8;
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={330} ry={26} fill="#000" opacity={0.25} />
      <path d="M -200 -110 L 210 -96" stroke={INK} strokeWidth={22} />
      <path d="M 210 -96 L 420 -120" stroke={WOOD_D} strokeWidth={14} />
      <Wheel x={-200} y={-112} r={112} f={f} spin={spin} />
      <path d="M -300 -330 L -250 -330 L -250 -220 L -300 -220 Z" fill={COACH_K} stroke={INK} strokeWidth={6} />
      {/* body */}
      <path d="M -262 -170 Q -282 -300 -246 -400 L 246 -400 Q 282 -300 262 -170 Q 0 -150 -262 -170 Z" fill={COACH} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -250 -400 L 250 -400 L 262 -300 L -262 -300 Z" fill={COACH_K} stroke={INK} strokeWidth={6} />
      <rect x={-210} y={-382} width={120} height={70} rx={10} fill={GLOW} stroke={INK} strokeWidth={6} />
      <rect x={90} y={-382} width={120} height={70} rx={10} fill={GLOW} stroke={INK} strokeWidth={6} />
      <rect x={-62} y={-392} width={124} height={226} rx={10} fill={COACH_D} stroke={GOLD} strokeWidth={6} />
      <rect x={-46} y={-380} width={92} height={74} rx={8} fill={GLOW} stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-236} rx={30} ry={38} fill="none" stroke={GOLD} strokeWidth={6} />
      <path d="M -238 -290 Q 0 -280 238 -290" stroke={GOLD} strokeWidth={5} fill="none" />
      {hands > 0 ? (
        <g opacity={Math.min(1, hands * 2)}>
          {[-20, 22].map((hx, i) => (
            <g key={i} transform={`translate(${hx + (i ? hw : -hw) * 0.4} ${-312 - 70 * hands})`}>
              <path d="M 0 0 L 0 70" stroke={INK} strokeWidth={26} strokeLinecap="round" />
              <path d="M 0 0 L 0 70" stroke={i ? "#3F6F8A" : "#8E5A9A"} strokeWidth={16} strokeLinecap="round" />
              <circle cx={0} cy={-6} r={16} fill={SKIN} stroke={INK} strokeWidth={4} />
            </g>
          ))}
          <circle cx={-10} cy={-330} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
          <circle cx={-2} cy={-334} r={7} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
          <ellipse cx={-2} cy={-318} rx={6} ry={8} fill="#6B2A22" />
        </g>
      ) : null}
      {/* roof + luggage */}
      <rect x={-262} y={-428} width={524} height={32} rx={8} fill={COACH_K} stroke={INK} strokeWidth={6} />
      <rect x={-200} y={-500} width={150} height={74} rx={8} fill="#8A5A34" stroke={INK} strokeWidth={6} />
      <rect x={-30} y={-484} width={120} height={58} rx={8} fill="#5E7A4A" stroke={INK} strokeWidth={6} />
      <path d="M -160 -500 L -160 -428 M -90 -500 L -90 -428" stroke={GOLD_D} strokeWidth={6} />
      {/* box seat + coachman */}
      <path d="M 246 -400 L 340 -430 L 352 -330 L 262 -300 Z" fill={COACH_K} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <g transform="translate(300 -420) scale(0.8)">
        <Coachman f={f} up={driverUp} />
      </g>
      <Wheel x={210} y={-92} r={92} f={f} spin={spin} />
      {/* lantern */}
      <g transform={`translate(272 -340) rotate(${sw})`}>
        <circle cx={0} cy={40} r={90} fill={GLOW} opacity={0.3 + 0.06 * Math.sin(f / 3)} />
        <path d="M 0 0 L 0 18" stroke={INK} strokeWidth={5} />
        <rect x={-20} y={18} width={40} height={52} rx={6} fill={GLOW} stroke={INK} strokeWidth={5} />
        <path d={`M -7 60 Q ${Math.sin(f / 2) * 3} 30 7 60 Z`} fill="#F08A24" />
        <path d="M -24 16 L 24 16 L 16 6 L -16 6 Z" fill={COACH_K} stroke={INK} strokeWidth={4} />
      </g>
    </g>
  );
};

// ---------- moonlit heath ----------
const Heath: React.FC<{ f: number; horizon: number; moon?: P; moonR?: number; seed: string; road?: boolean; sign?: string; pan?: number }> = ({ f, horizon, moon = [600, 760], moonR = 300, seed, road = true, sign, pan = 0 }) => (
  <>
    <circle cx={moon[0]} cy={moon[1]} r={moonR * 1.5} fill={MOON} opacity={0.12} />
    <circle cx={moon[0]} cy={moon[1]} r={moonR * 1.2} fill={MOON} opacity={0.14} />
    <circle cx={moon[0]} cy={moon[1]} r={moonR} fill={MOON} stroke={INK} strokeWidth={6} />
    {[
      [-0.3, -0.2, 0.18],
      [0.25, 0.1, 0.12],
      [-0.05, 0.38, 0.1],
      [0.4, -0.35, 0.08],
    ].map(([cx, cy, r], i) => (
      <circle key={i} cx={moon[0] + cx * moonR} cy={moon[1] + cy * moonR} r={r * moonR} fill="#F1DFAE" />
    ))}
    {[0, 1].map((k) => {
      const cx = ((f * (1.2 + k * 0.6) + k * 500 + pan) % 1500) - 300;
      return <path key={k} d={`M ${cx} ${moon[1] + 120 - k * 260} q 120 -40 260 0 q 90 22 200 -6`} stroke="#7A7FAE" strokeWidth={26} fill="none" strokeLinecap="round" opacity={0.65} />;
    })}
    <path d={`M 0 ${horizon - 60} Q 200 ${horizon - 160} 420 ${horizon - 90} Q 640 ${horizon - 20} 820 ${horizon - 130} Q 960 ${horizon - 190} 1080 ${horizon - 110} L 1080 ${horizon + 40} L 0 ${horizon + 40} Z`} fill={HEATH_D} stroke={INK} strokeWidth={5} />
    <rect x={0} y={horizon} width={1080} height={1920 - horizon} fill={HEATH} />
    <path d={`M 0 ${horizon + 6} Q 540 ${horizon - 30} 1080 ${horizon + 6}`} stroke={HEATH_N} strokeWidth={10} fill="none" />
    {road ? <path d={`M 380 1920 Q 520 ${horizon + 260} 760 ${horizon + 40} L 900 ${horizon + 40} Q 760 ${horizon + 300} 1000 1920 Z`} fill={ROAD} stroke={INK} strokeWidth={5} /> : null}
    {road ? <path d={`M 700 1920 Q 690 ${horizon + 300} 830 ${horizon + 50}`} stroke={ROAD_D} strokeWidth={8} fill="none" strokeDasharray="30 30" /> : null}
    {new Array(9).fill(0).map((_, i) => {
      const bx = random(`${seed}gx${i}`) * 1080;
      const by = horizon + 30 + random(`${seed}gy${i}`) * (1920 - horizon - 60);
      if (road && bx > 380 && bx < 1000 && by > horizon + 200) return null;
      const sc = 0.6 + ((by - horizon) / (1920 - horizon)) * 1.1;
      return (
        <g key={i} transform={`translate(${bx} ${by}) scale(${sc})`}>
          <path d="M -70 0 Q -80 -60 -30 -70 Q 0 -110 40 -70 Q 90 -60 72 0 Z" fill="#2E4A3A" stroke={INK} strokeWidth={5} />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <circle key={k} cx={-50 + random(`${seed}d${i}${k}`) * 100} cy={-10 - random(`${seed}e${i}${k}`) * 70} r={7} fill={GORSE} />
          ))}
        </g>
      );
    })}
    {sign ? (
      <g transform={`translate(970 ${horizon + 170})`}>
        <rect x={-10} y={-200} width={20} height={220} fill={WOODC} stroke={INK} strokeWidth={5} />
        <path d="M -10 -190 L -170 -190 L -196 -164 L -170 -138 L -10 -138 Z" fill={C.cream} stroke={INK} strokeWidth={5} />
        <text x={-96} y={-152} textAnchor="middle" fontFamily={titleFont} fontSize={30} fill={INK}>
          {sign}
        </text>
      </g>
    ) : null}
  </>
);

// old farmer in nightshirt + nightcap, hands up, knees knocking. Origin = feet, facing left.
const Farmer: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const sh = Math.sin(f * 1.6) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${-s} ${s})`}>
      <path d={`M -20 -150 L ${-30 + sh} -10 M 30 -150 L ${40 - sh} -10`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M -20 -150 L ${-30 + sh} -10 M 30 -150 L ${40 - sh} -10`} stroke={SKIN} strokeWidth={18} strokeLinecap="round" />
      <ellipse cx={-30 + sh + 14} cy={-6} rx={34} ry={14} fill="#7A3E2A" stroke={INK} strokeWidth={5} />
      <ellipse cx={40 - sh + 14} cy={-6} rx={34} ry={14} fill="#7A3E2A" stroke={INK} strokeWidth={5} />
      <path d="M -70 -120 Q -60 -330 0 -350 Q 70 -330 80 -120 Q 0 -100 -70 -120 Z" fill={CRAVAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -300 Q -50 -200 -46 -130 M 40 -300 Q 50 -200 50 -130" stroke="#CFC2A4" strokeWidth={6} fill="none" />
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M ${d * 40} -320 L ${d * 96} ${-410 + sh * d}`} stroke={INK} strokeWidth={34} strokeLinecap="round" />
          <path d={`M ${d * 40} -320 L ${d * 96} ${-410 + sh * d}`} stroke={CRAVAT} strokeWidth={22} strokeLinecap="round" />
          <circle cx={d * 100} cy={-422 + sh * d} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      <circle cx={6} cy={-400} r={58} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -44 -380 Q -56 -340 -20 -352 M 50 -386 Q 66 -350 34 -354" stroke="#F4F1EA" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M -10 -362 Q 10 -330 30 -362" fill="#F4F1EA" stroke={INK} strokeWidth={4} />
      <circle cx={-14} cy={-410} r={11} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={24} cy={-410} r={11} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={-16} cy={-410} r={5} fill={INK} />
      <circle cx={22} cy={-410} r={5} fill={INK} />
      <ellipse cx={6} cy={-376} rx={10} ry={13} fill="#6B2A22" stroke={INK} strokeWidth={3} />
      <path d="M -54 -424 Q -40 -500 30 -476 Q 90 -470 120 -520 Q 130 -500 110 -470 Q 80 -430 64 -430 Z" fill="#E2E0DA" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -50 -440 Q 0 -460 60 -440" stroke={C.brick} strokeWidth={10} fill="none" />
      <circle cx={122} cy={-524} r={16} fill={C.brick} stroke={INK} strokeWidth={4} />
      {[0, 1].map((k) => (
        <path key={k} d={`M ${-60 - k * 20} ${-460 - k * 10} q -10 20 0 30`} stroke="#7FB8E6" strokeWidth={6} fill="none" opacity={0.5 + 0.5 * Math.sin(f / 3 + k)} />
      ))}
    </g>
  );
};

const Rooster: React.FC<{ x: number; y: number; s?: number; f: number; plucked?: number }> = ({ x, y, s = 1, f, plucked = 0 }) => {
  const peck = Math.sin(f / 5) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - plucked}>
      <path d="M -20 0 L -26 -40 M 20 0 L 16 -40" stroke="#E0A030" strokeWidth={8} />
      <path d="M -70 -110 Q -150 -200 -110 -240 Q -80 -190 -60 -170 Q -100 -250 -50 -250 Q -40 -190 -30 -150 Z" fill="#2E6B4A" stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={-90} rx={80} ry={58} fill="#C8502A" stroke={INK} strokeWidth={7} />
      <path d="M -30 -110 Q 10 -70 50 -100" stroke="#E8A040" strokeWidth={10} fill="none" />
      <g transform={`translate(${peck} 0)`}>
        <path d="M 40 -130 Q 50 -200 80 -210 Q 110 -200 100 -150 Z" fill="#E8A040" stroke={INK} strokeWidth={6} />
        <circle cx={80} cy={-200} r={30} fill="#E8A040" stroke={INK} strokeWidth={6} />
        <path d="M 62 -226 q 6 -24 18 -6 q 8 -24 18 -2 q 10 -16 12 6 Z" fill="#E2322A" stroke={INK} strokeWidth={4} />
        <path d="M 106 -204 L 132 -196 L 106 -188 Z" fill="#F2C744" stroke={INK} strokeWidth={4} />
        <path d="M 100 -186 q 6 20 -6 22" fill="#E2322A" stroke={INK} strokeWidth={3} />
        <circle cx={88} cy={-206} r={5} fill={INK} />
      </g>
    </g>
  );
};

// little galloping horse silhouette for the map
const MiniRide: React.FC<{ x: number; y: number; f: number; s?: number }> = ({ x, y, f, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Steed x={0} gy={0} s={0.16} f={f} pose="gallop" stride={7} rider={<Rider f={f} aim={-30} face="hero" mask={false} plume />} />
  </g>
);

const Purse: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -40 -10 Q -56 50 0 56 Q 56 50 40 -10 Q 20 -24 0 -22 Q -20 -24 -40 -10 Z" fill="#8A5A34" stroke={INK} strokeWidth={6} />
    <path d="M -22 -22 Q 0 -40 22 -22" stroke={GOLD} strokeWidth={8} fill="none" />
    <circle cx={-10} cy={-30} r={12} fill={GOLD} stroke={INK} strokeWidth={4} />
    <circle cx={12} cy={-34} r={12} fill={GOLD} stroke={INK} strokeWidth={4} />
  </g>
);

const Bubble: React.FC<{ x: number; y: number; p: number; text: string; w?: number; tail?: P }> = ({ x, y, p, text, w = 820, tail = [-220, 150] }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <path d={`M -170 60 L ${tail[0]} ${tail[1]} L -80 70 Z`} fill={C.cream} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-w / 2} y={-86} width={w} height={172} rx={40} fill={C.cream} stroke={INK} strokeWidth={8} />
      <path d="M -164 76 L -88 78" stroke={C.cream} strokeWidth={12} />
      <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={60} fill={C.brick} textLength={w - 80} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  );

export const Highwayman66: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "rear";
  const float: string[] = v.float ?? [];
  let sky: Sky = "night";
  let stars = true;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let topLayer: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "rear") {
    // frame 0: the masked rider rears his black horse against a huge moon, pistol raised; a coach lantern on the road behind
    const fireAt = v.fireAt !== undefined ? v.fireAt * dur : -100;
    const fire = f >= fireAt && f < fireAt + 7 ? 1 - (f - fireAt) / 7 : 0;
    const dust = (k: number) => 0.6 + 0.4 * Math.sin(f / 3 + k);
    body = (
      <>
        <Heath f={f} horizon={1330} moon={[560, 830]} moonR={310} seed="rh" />
        <Steed x={720} gy={1400} s={0.2} f={f} pose="stand" bay flip saddle={false} />
        <Steed x={800} gy={1408} s={0.2} f={f} pose="stand" bay flip saddle={false} />
        <Coach x={1000} y={1410} s={0.4} f={f} flip driverUp={f > dur * 0.35} />
        {[0, 1, 2].map((k) => (
          <ellipse key={k} cx={220 + k * 120} cy={1800 - k * 10} rx={110 * dust(k)} ry={40 * dust(k)} fill="#C9B48E" opacity={0.55} />
        ))}
        <Steed x={560} gy={1810} s={1.1} f={f} pose="rear" rear={v.rear ?? 34} rider={<Rider f={f} aim={(v.aim ?? -74) + 5 * Math.sin(f / 4)} face="shout" fire={fire} />} />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${560 + k * 40} ${1060 - k * 60} q 60 -20 120 0`} stroke={C.cream} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f / 2 + k)} transform={`translate(${(f * 3) % 30} 0)`} />
        ))}
      </>
    );
  } else if (mode === "hold") {
    // the hold-up: coach stopped, hands up at the window, the purse flies out to the rider; "YOUR MONEY OR YOUR LIFE!"
    const purseAt = (v.purseAt ?? 0.55) * dur;
    const pt = interpolate(f, [purseAt, purseAt + 14], [0, 1], clamp);
    const px = lerp(740, 236, pt);
    const py = lerp(1210, 1225, pt) - Math.sin(pt * Math.PI) * 260;
    const caught = f >= purseAt + 14;
    body = (
      <>
        <Heath f={f} horizon={1200} moon={[880, 640]} moonR={140} seed="hd" road={false} />
        <rect x={0} y={1460} width={1080} height={460} fill={ROAD} />
        <path d="M 0 1460 L 1080 1460" stroke={INK} strokeWidth={5} />
        <Coach x={760} y={1580} s={1.0} f={f} hands={ease(f, 2, 12)} driverUp shake={f < 8 ? Math.sin(f * 2) * 6 * (1 - f / 8) : 0} />
        <Steed x={150} gy={1720} s={0.8} f={f} pose="stand" rider={<Rider f={f} aim={v.aim ?? 6} face="sneer" />} />
        {pt > 0 && !caught ? <Purse x={px} y={py} rot={pt * 540} /> : null}
        {caught ? (
          <g>
            <Purse x={236} y={1222} rot={-10} />
            {[0, 1, 2, 3].map((k) => {
              const age = f - purseAt - 14;
              const a = (k / 4) * Math.PI * 2 + 0.4;
              return <circle key={k} cx={236 + Math.cos(a) * (40 + age * 4)} cy={1200 + Math.sin(a) * (40 + age * 4)} r={9} fill={GOLD} stroke={INK} strokeWidth={3} opacity={Math.max(0, 1 - age / 14)} />;
            })}
          </g>
        ) : null}
        <Bubble x={540} y={690} p={popIn(f, (v.bubbleAt ?? 0.2) * dur, 8)} text={v.bubble ?? "YOUR MONEY OR YOUR LIFE!"} tail={[-300, 260]} />
      </>
    );
  } else if (mode === "farm") {
    // Dick Turpin, close: tricorn, mask, smallpox-marked cheeks – then the gang's shadows fall across an old farmer's kitchen
    const turn = (v.turnAt ?? 0.34) * dur;
    if (f < turn) {
      sky = "dark";
      stars = false;
      body = (
        <>
          <circle cx={540} cy={980} r={520} fill={C.brick} opacity={0.35} />
          <circle cx={540} cy={980} r={380} fill={C.mustard} opacity={0.18} />
          {new Array(16).fill(0).map((_, i) => {
            const a = (i / 16) * Math.PI * 2 + f / 60;
            return <path key={i} d={`M 540 980 L ${540 + Math.cos(a) * 1400} ${980 + Math.sin(a) * 1400} L ${540 + Math.cos(a + 0.12) * 1400} ${980 + Math.sin(a + 0.12) * 1400} Z`} fill={C.mustard} opacity={0.08} />;
          })}
          <g transform={`translate(440 ${1620 + (1 - popIn(f, 0, 10)) * 120}) scale(2.45)`}>
            <Rider f={f} aim={-60} legs="none" face="sneer" pocks cape={false} />
          </g>
        </>
      );
    } else {
      headline = undefined;
      sky = "paper";
      stars = false;
      const lf = f - turn;
      const grow = ease(lf, 0, 16);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1560} fill="#E4C08C" />
          {[0, 380, 1050].map((bx) => (
            <rect key={bx} x={bx} y={0} width={30} height={1560} fill="#5A3B24" />
          ))}
          <rect x={0} y={520} width={1080} height={26} fill="#5A3B24" />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${70 + k * 170 + grow * 30} ${1420 - k * 30}) scale(${1.0 + grow * 0.7 + k * 0.1})`} opacity={0.62}>
              <path d="M -100 0 L -86 -250 Q -40 -292 0 -292 Q 40 -292 86 -250 L 100 0 Z" fill="#3A1E16" />
              <circle cx={0} cy={-340} r={50} fill="#3A1E16" />
              <path d="M -120 -366 Q -100 -430 -60 -440 Q -20 -400 0 -404 Q 24 -400 64 -442 Q 104 -430 122 -366 Q 60 -350 4 -336 Q -60 -350 -120 -366 Z" fill="#3A1E16" />
              {k === 1 ? <path d="M 80 -230 L 220 -300 L 228 -284 L 92 -212 Z" fill="#3A1E16" /> : null}
            </g>
          ))}
          {/* hearth */}
          <rect x={600} y={720} width={480} height={860} fill={STONE} stroke={INK} strokeWidth={8} />
          {new Array(8).fill(0).map((_, r) => (
            <path key={r} d={`M 600 ${800 + r * 100} L 1080 ${800 + r * 100}`} stroke={STONE_D} strokeWidth={5} />
          ))}
          <rect x={570} y={700} width={540} height={60} fill="#5A3B24" stroke={INK} strokeWidth={7} />
          <path d="M 660 1580 L 660 1000 Q 840 900 1020 1000 L 1020 1580 Z" fill="#2A1A14" stroke={INK} strokeWidth={7} />
          {[0, 1, 2, 3, 4].map((k) => {
            const fl = Math.sin(f / 2 + k * 1.7) * 18;
            const fx = 720 + k * 62;
            return <path key={k} d={`M ${fx - 44} 1560 Q ${fx - 50 + fl} ${1420 - (k % 2) * 60} ${fx + fl * 0.6} ${1330 - (k % 3) * 50 + fl} Q ${fx + 40} 1440 ${fx + 46} 1560 Z`} fill={k % 2 ? "#F2B544" : "#E8642A"} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
          })}
          <circle cx={840} cy={1440} r={240} fill={GLOW} opacity={0.18 + 0.06 * Math.sin(f / 3)} />
          <path d="M 840 760 L 840 1150" stroke={INK} strokeWidth={8} />
          <path d="M 770 1160 Q 770 1260 840 1270 Q 910 1260 910 1160 Z" fill="#3A3530" stroke={INK} strokeWidth={7} />
          <path d="M 790 1160 L 890 1160 L 870 1130 L 810 1130 Z" fill="#3A3530" stroke={INK} strokeWidth={6} />
          <path d="M 910 1190 Q 960 1170 980 1130" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={990 + k * 14 + Math.sin(f / 4 + k) * 8} cy={1110 - k * 50 - ((f * 2) % 50)} r={24 + k * 6} fill="#FFFFFF" opacity={0.55} />
          ))}
          <rect x={0} y={1560} width={1080} height={360} fill="#9A6A40" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={k} d={`M 0 ${1600 + k * 60} L 1080 ${1600 + k * 60}`} stroke="#7A4E2C" strokeWidth={5} />
          ))}
          <Farmer x={420} y={1640} s={1.2} f={f} />
          <Burst x={560} y={980} p={popIn(lf, 4, 8)} text="?!" size={100} w={0.4} col={C.cream} rot={10} />
        </>
      );
    }
  }
 else if (mode === "caught") {
    // dawn, Yorkshire: "John Palmer" shoots a rooster off a wall (feathers, no blood) → York Castle: bars slam, HANGED · 1739 stamp
    const shot = (v.shotAt ?? 0.12) * dur;
    const lock = (v.lockAt ?? 0.5) * dur;
    if (f < lock) {
      sky = "dawn";
      stars = false;
      const fire = f >= shot && f < shot + 7 ? 1 - (f - shot) / 7 : 0;
      const pl = ease(f, shot, shot + 3);
      body = (
        <>
          <circle cx={820} cy={760} r={160} fill={GLOW} opacity={0.8} />
          <path d="M 0 900 Q 260 780 520 860 Q 800 940 1080 820 L 1080 1400 L 0 1400 Z" fill="#7E9A5A" stroke={INK} strokeWidth={5} />
          <path d="M 0 1000 Q 340 920 700 990 Q 900 1030 1080 970 L 1080 1400 L 0 1400 Z" fill="#6A8A4A" stroke={INK} strokeWidth={5} />
          <g transform="translate(0 -220)">
          <g transform={`translate(250 1560) scale(1.75)`}>
            <Rider f={f} aim={v.aim ?? -28} legs="none" face="sneer" mask={false} cape={false} fire={fire} />
          </g>
          <rect x={0} y={1330} width={1080} height={820} fill={STONE} />
          {new Array(9).fill(0).map((_, r) =>
            new Array(8).fill(0).map((__, k) => (
              <rect key={`${r}-${k}`} x={k * 150 - (r % 2) * 75 + 4} y={1350 + r * 96} width={142} height={88} rx={18} fill={(r + k) % 3 ? STONE : "#A29E98"} stroke={INK} strokeWidth={4} />
            )),
          )}
          <rect x={-10} y={1310} width={1100} height={44} rx={10} fill="#A29E98" stroke={INK} strokeWidth={6} />
          <Rooster x={860} y={1316} s={1.1} f={f} plucked={pl} />
          {f >= shot
            ? new Array(14).fill(0).map((_, i) => {
                const age = f - shot;
                const a = random(`fa${i}`) * Math.PI * 2;
                const sp = 10 + random(`fs${i}`) * 14;
                const fx = 880 + Math.cos(a) * sp * age * 0.9 + Math.sin(age / 3 + i) * 10;
                const fy = 1220 + Math.sin(a) * sp * age * 0.6 + age * age * 0.12;
                return <ellipse key={i} cx={fx} cy={fy} rx={26} ry={9} fill={i % 3 ? "#C8502A" : i % 2 ? "#2E6B4A" : "#E8A040"} stroke={INK} strokeWidth={3} transform={`rotate(${age * 18 + i * 30} ${fx} ${fy})`} />;
              })
            : null}
          </g>
          <Burst x={640} y={640} p={f >= shot ? popIn(f, shot, 7) : 0} text="BANG!" size={96} w={0.8} col={C.mustard} />
        </>
      );
    } else {
      headline = undefined;
      sky = "dark";
      stars = false;
      const lf = f - lock;
      const drop = ease(lf, 0, 5);
      const shake = lf > 4 && lf < 12 ? Math.sin(lf * 2.6) * 12 * (1 - (lf - 4) / 8) : 0;
      body = (
        <g transform={`translate(${shake} 0)`}>
          <rect x={0} y={0} width={1080} height={1920} fill={STONE_D} />
          {new Array(18).fill(0).map((_, r) =>
            new Array(6).fill(0).map((__, k) => (
              <rect key={`${r}-${k}`} x={k * 200 - (r % 2) * 100 + 4} y={r * 110 + 4} width={192} height={102} rx={10} fill={(r * 7 + k) % 4 ? STONE : "#9C9892"} stroke={INK} strokeWidth={3} opacity={0.9} />
            )),
          )}
          <rect x={720} y={620} width={200} height={170} fill="#FFE2A8" stroke={INK} strokeWidth={8} />
          {[770, 820, 870].map((bx) => (
            <path key={bx} d={`M ${bx} 620 L ${bx} 790`} stroke={INK} strokeWidth={12} />
          ))}
          <path d="M 720 790 L 560 1560 L 1080 1560 L 920 790 Z" fill="#FFE2A8" opacity={0.18} />
          <g transform="translate(540 1650) scale(2.0)">
            <Rider f={f} aim={null} legs="none" face="glum" mask={false} cape={false} chains />
          </g>
          <g transform={`translate(0 ${(1 - drop) * -1500})`}>
            {new Array(7).fill(0).map((_, k) => (
              <g key={k}>
                <rect x={60 + k * 160 - 14} y={380} width={28} height={1200} fill={INK} />
                <rect x={60 + k * 160 - 7} y={380} width={10} height={1200} fill="#6E7680" />
              </g>
            ))}
            {[620, 1380].map((by) => (
              <rect key={by} x={0} y={by} width={1080} height={34} fill="#3A3E46" stroke={INK} strokeWidth={6} />
            ))}
          </g>
          <g transform={`translate(330 ${470 + (1 - drop) * -900}) rotate(-3)`}>
            <path d="M 60 0 L 120 -60 L 180 0" stroke={INK} strokeWidth={6} fill="none" />
            <rect x={0} y={0} width={420} height={96} rx={10} fill={WOODC} stroke={INK} strokeWidth={7} />
            <text x={210} y={66} textAnchor="middle" fontFamily={titleFont} fontSize={56} fill={C.cream}>
              YORK CASTLE
            </text>
          </g>
          {lf >= 10 ? (
            <g transform={`translate(540 860) rotate(-8) scale(${interpolate(lf, [10, 16], [2.2, 1], { ...clamp, easing: Easing.bezier(0.3, 1.4, 0.5, 1) })})`} opacity={interpolate(lf, [10, 13], [0, 1], clamp)}>
              <rect x={-330} y={-80} width={660} height={160} rx={18} fill="none" stroke="#D7322A" strokeWidth={14} />
              <text x={0} y={36} textAnchor="middle" fontFamily={titleFont} fontSize={96} fill="#D7322A" textLength={580} lengthAdjust="spacingAndGlyphs">
                {v.stamp ?? "HANGED · 1739"}
              </text>
            </g>
          ) : null}
        </g>
      );
    }
  } else if (mode === "book") {
    // the legend: an open novel – the real Rookwood frontispiece (Turpin clearing a toll-gate) + the London→York map ride… FICTION
    sky = "paper";
    stars = false;
    const ansF = (v.answerAt ?? 0.6) * dur;
    const rideP = ease(f, 0.12 * dur, ansF - 2);
    const route: P[] = [
      [700, 1130],
      [790, 1040],
      [740, 940],
      [840, 840],
      [800, 740],
    ];
    const seg = rideP * 0.7 * (route.length - 1);
    const si = Math.min(route.length - 2, Math.floor(seg));
    const rp: P = [lerp(route[si][0], route[si + 1][0], seg - si), lerp(route[si][1], route[si + 1][1], seg - si)];
    const open = popIn(f, 0, 10);
    const slam = f >= ansF ? interpolate(f - ansF, [0, 6], [2.4, 1], { ...clamp, easing: Easing.bezier(0.3, 1.4, 0.5, 1) }) : 0;
    if (f >= ansF) headline = undefined;
    body = (
      <g transform={`translate(540 900) scale(${0.85 + 0.15 * open}) translate(-540 -900)`}>
        <rect x={50} y={540} width={980} height={720} rx={24} fill="#6E2A1E" stroke={INK} strokeWidth={9} />
        <path d="M 80 570 Q 300 548 535 580 L 535 1236 Q 300 1206 80 1230 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
        <path d="M 545 580 Q 780 548 1000 570 L 1000 1230 Q 780 1206 545 1236 Z" fill="#F7EEDB" stroke={INK} strokeWidth={6} />
        <path d="M 540 576 L 540 1240" stroke="#B89A6A" strokeWidth={8} />
        <text x={308} y={622} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>
          ROOKWOOD · 1834
        </text>
        <text x={772} y={622} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>
          THE RIDE TO YORK
        </text>
        <path d={`M ${route.map((p) => p.join(" ")).join(" L ")}`} stroke="#8A6A45" strokeWidth={8} fill="none" strokeDasharray="18 14" />
        {[
          [route[0], "LONDON"],
          [route[route.length - 1], "YORK"],
        ].map(([p, t], i) => (
          <g key={i}>
            <circle cx={(p as P)[0]} cy={(p as P)[1]} r={16} fill={C.brick} stroke={INK} strokeWidth={5} />
            <text x={(p as P)[0] + (i ? -30 : -30)} y={(p as P)[1] + (i ? -30 : 60)} textAnchor="middle" fontFamily={titleFont} fontSize={42} fill={INK}>
              {t as string}
            </text>
          </g>
        ))}
        <text x={640} y={900} textAnchor="middle" fontFamily={titleFont} fontSize={36} fill="#8A6A45" transform="rotate(-70 640 900)">
          200 MILES
        </text>
        <MiniRide x={rp[0]} y={rp[1] + 10} f={f} />
        <g transform={`translate(${Math.min(rp[0] - 90, 770)} ${rp[1] + 84})`} opacity={rideP > 0.05 ? 1 : 0}>
          <rect x={-10} y={-34} width={200} height={50} rx={10} fill={C.mustard} stroke={INK} strokeWidth={4} />
          <text x={90} y={2} textAnchor="middle" fontFamily={typeFont} fontSize={28} fill={INK}>
            BLACK BESS
          </text>
        </g>
      </g>
    );
    topLayer =
      slam > 0 ? (
        <g transform={`translate(560 900) rotate(-14) scale(${slam})`}>
          <rect x={-420} y={-96} width={840} height={192} rx={20} fill="rgba(244,234,213,0.9)" stroke="#D7322A" strokeWidth={16} />
          <text x={0} y={42} textAnchor="middle" fontFamily={titleFont} fontSize={120} fill="#D7322A" textLength={760} lengthAdjust="spacingAndGlyphs">
            {v.stamp ?? "NEVER HAPPENED"}
          </text>
        </g>
      ) : null;
    const img = staticFile(`ep/${ep.id}-extra/photos/tollgate.jpg`);
    const sc = 0.85 + 0.15 * open;
    overlay = (
      <>
        <div style={{ position: "absolute", left: 540 + (118 - 540) * sc, top: 900 + (650 - 900) * sc, width: 380 * sc, height: 573 * sc, rotate: "-2deg", border: `${6 * sc}px solid ${C.cream}`, boxShadow: "0 10px 0 rgba(0,0,0,0.3)", background: C.cream, zIndex: slam > 0 ? 0 : 1 }}>
          <Img src={img} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.3) contrast(1.05)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 6 * sc, fontFamily: typeFont, fontSize: 18 * sc, color: C.cream, textAlign: "center", textShadow: "0 2px 3px rgba(0,0,0,0.9)" }}>ROOKWOOD FRONTISPIECE · public domain</div>
        </div>
        {f >= ansF ? <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: interpolate(f, [ansF, ansF + 6], [0.85, 0], clamp) }} /> : null}
      </>
    );
  } else if (mode === "tv") {
    // today: a TV comedy literally titled "The Completely Made-Up Adventures of Dick Turpin" (2024)
    sky = "modern";
    stars = false;
    const on = ease(f, 2, 8);
    const scroll = (f * 14) % 400;
    body = (
      <>
        <rect x={0} y={1180} width={1080} height={740} fill="#2B2440" />
        <rect x={360} y={1150} width={360} height={40} rx={10} fill="#1A1626" stroke={INK} strokeWidth={6} />
        <rect x={50} y={540} width={980} height={620} rx={28} fill="#0E0E16" stroke={INK} strokeWidth={10} />
        <clipPath id="ep66scr">
          <rect x={76} y={566} width={928} height={568} rx={14} />
        </clipPath>
        <g clipPath="url(#ep66scr)" opacity={on}>
          <rect x={76} y={566} width={928} height={568} fill="#7CC4E8" />
          <circle cx={880} cy={680} r={60} fill="#FFE27A" />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${k * 400 - scroll} 1000 q 100 -90 200 -20 q 100 -70 200 0 L ${k * 400 - scroll + 400} 1140 L ${k * 400 - scroll} 1140 Z`} fill="#6AB04C" stroke={INK} strokeWidth={4} />
          ))}
          <rect x={76} y={1060} width={928} height={80} fill="#C9A86A" />
          <Steed x={560} gy={1110} s={0.4} f={f} pose="gallop" stride={8} rider={<Rider f={f} aim={-60} face="hero" mask={false} plume />} />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M ${300 - k * 30} ${880 + k * 60} l -120 0`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
          ))}
          <g transform={`translate(540 640) scale(${popIn(f, 6, 10)})`}>
            <rect x={-430} y={-58} width={860} height={150} rx={18} fill={C.mustard} stroke={INK} strokeWidth={7} />
            <text x={0} y={-6} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK} textLength={800} lengthAdjust="spacingAndGlyphs">
              {v.title ?? "THE COMPLETELY MADE-UP"}
            </text>
            <text x={0} y={60} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK} textLength={760} lengthAdjust="spacingAndGlyphs">
              {v.title2 ?? "ADVENTURES OF DICK TURPIN"}
            </text>
          </g>
        </g>
        <rect x={76} y={566} width={928} height={568} rx={14} fill="#FFFFFF" opacity={interpolate(f, [2, 8], [0.9, 0], clamp)} />
        {/* sofa + viewers */}
        <path d="M -20 1920 L -20 1640 Q 540 1560 1100 1640 L 1100 1920 Z" fill="#7A2E3A" stroke={INK} strokeWidth={8} />
        {[300, 760].map((hx, i) => (
          <g key={hx}>
            <circle cx={hx} cy={1560} r={92} fill={i ? "#3A2416" : "#C98A3A"} stroke={INK} strokeWidth={7} />
            <path d={`M ${hx - 150} 1920 Q ${hx - 150} 1650 ${hx} 1650 Q ${hx + 150} 1650 ${hx + 150} 1920 Z`} fill={i ? "#2F8F9D" : "#E2483A"} stroke={INK} strokeWidth={7} />
          </g>
        ))}
        <g transform="translate(530 1700)">
          <path d="M -60 -40 L 60 -40 L 46 90 L -46 90 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <path d="M -40 -40 L -30 90 M 0 -40 L 0 90 M 40 -40 L 30 90" stroke="#E2483A" strokeWidth={14} />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={-44 + k * 22} cy={-50 - (k % 2) * 14} r={18} fill="#FFF6D8" stroke={INK} strokeWidth={4} />
          ))}
        </g>
      </>
    );
  }

  const ansF = Math.round((v.answerAt ?? 0.6) * dur);
  return (
    <Backdrop sky={sky} stars={stars} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
      </svg>
      {overlay}
      {topLayer ? (
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {topLayer}
        </svg>
      ) : null}
      {headline ? (
        <Sequence key={headline} from={mode === "rear" ? -14 : 0} layout="none">
          <Headline text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} />
        </Sequence>
      ) : null}
      {mode === "book" && v.answer ? (
        <Sequence from={ansF} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag && !(mode === "book" && f >= ansF) && !(mode === "caught" && f >= (v.lockAt ?? 0.5) * dur) ? <Tag text={v.tag} x={v.tagX ?? 540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
