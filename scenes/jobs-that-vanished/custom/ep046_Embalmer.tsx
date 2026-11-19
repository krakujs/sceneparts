import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep046 Egyptian embalmer – the brain came out through the nose; salt, linen, 70 days; later Europe ground mummies into paint.
// visual: { mode: "nose" | "close" | "stones" | "salt" | "paint" | "garden", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1 of the scene), floatTop?, floatSide?: "left" | "alt",
//           answer?, answerAccent?, answerAt? (paint), phases?: number[] (mode-specific timings, 0–1) }
// Human remains are kept stylised: the body is always under linen, eyes closed, no gore beyond a cartoon noodle.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SAND = "#EDC384";
const SAND_D = "#D9A35E";
const SAND_DD = "#B9803F";
const SKIN = "#B8723F";
const SKIN_D = "#91542D";
const SKIN_L = "#F0C29A";
const JACKAL = "#221D26";
const JACKAL_HI = "#433A4D";
const GOLD = "#EDB937";
const GOLD_D = "#B8861C";
const LAPIS = "#2E5DAA";
const TURQ = "#3FA7A0";
const LINEN = "#F4EAD0";
const LINEN_D = "#D6C49A";
const NATRON = "#FFFDF6";
const DEAD = "#BE9878";
const BRAIN = "#F29CB2";
const BRAIN_D = "#C76A86";
const IRON = "#6F737C";
const WOOD = "#8A5A34";
const MUMMY_BROWN = "#6B3F22";

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side = "alt" }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "left" || i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 90 } : { right: 170 }), top: top + i * 118 - Math.min(age, 30) * 1.0, fontFamily: typeFont, fontSize: 60, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 24px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.5, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// one hieroglyph-ish painted sign for the wall frieze
const Glyph: React.FC<{ k: number; x: number; y: number }> = ({ k, x, y }) => {
  const t = k % 4;
  return (
    <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {t === 0 ? (
        <>
          <ellipse cx={0} cy={-26} rx={13} ry={17} stroke={C.brick} strokeWidth={9} />
          <path d="M 0 -9 L 0 36 M -22 0 L 22 0" stroke={C.brick} strokeWidth={9} />
        </>
      ) : null}
      {t === 1 ? (
        <>
          <path d="M -36 0 Q 0 -30 36 0 Q 0 22 -36 0 Z" fill="#FFF7E2" />
          <circle cx={0} cy={-3} r={10} fill={INK} />
          <path d="M -36 -20 Q 0 -44 36 -20" />
          <path d="M 2 18 L -4 40 M 12 14 Q 32 42 42 26" stroke={LAPIS} strokeWidth={7} />
        </>
      ) : null}
      {t === 2 ? (
        <>
          <ellipse cx={-2} cy={6} rx={28} ry={19} fill={LAPIS} />
          <circle cx={22} cy={-22} r={12} fill={LAPIS} />
          <path d="M 32 -22 L 48 -18 M -26 10 L -46 22 M -8 24 L -10 42 M 8 24 L 8 42" />
        </>
      ) : null}
      {t === 3 ? <path d="M -40 0 l 10 -12 l 10 12 l 10 -12 l 10 12 l 10 -12 l 10 12 l 10 -12" stroke={TURQ} strokeWidth={8} /> : null}
    </g>
  );
};

// warm lamp-lit embalming room: sandstone blocks, a painted frieze, an oil lamp
const Tomb: React.FC<{ f: number; floor?: number; lamp?: [number, number] | null; frieze?: number }> = ({ f, floor = 1480, lamp = [960, 900], frieze = 600 }) => {
  const flick = Math.sin(f / 3) * 0.04 + Math.sin(f / 7) * 0.03;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill={SAND} />
      {new Array(Math.ceil(floor / 130)).fill(0).map((_, r) => (
        <g key={r}>
          <path d={`M 0 ${r * 130} L 1080 ${r * 130}`} stroke={SAND_D} strokeWidth={5} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${k * 300 + (r % 2) * 150 + 60} ${r * 130} l 0 130`} stroke={SAND_D} strokeWidth={5} />
          ))}
        </g>
      ))}
      <rect x={0} y={frieze} width={1080} height={150} fill="#F8E2B2" />
      <rect x={0} y={frieze - 14} width={1080} height={16} fill={LAPIS} />
      <rect x={0} y={frieze + 148} width={1080} height={16} fill={C.brick} />
      {new Array(9).fill(0).map((_, k) => (
        <Glyph key={k} k={k} x={60 + k * 120} y={frieze + 76} />
      ))}
      {lamp ? (
        <g transform={`translate(${lamp[0]} ${lamp[1]})`}>
          <circle cx={0} cy={-60} r={250} fill="#FFF0BF" opacity={0.38 + flick} />
          <path d="M -14 10 L -24 260 M 14 10 L 24 260" stroke={SAND_DD} strokeWidth={14} strokeLinecap="round" />
          <path d="M -64 -6 Q 0 46 64 -6 Z" fill={GOLD_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d={`M 0 ${-86 - flick * 120} Q 26 -40 0 -10 Q -26 -40 0 ${-86 - flick * 120} Z`} fill="#FFB53D" stroke="#E0731F" strokeWidth={5} />
          <path d="M 0 -50 Q 10 -30 0 -16 Q -10 -30 0 -50 Z" fill="#FFF1B0" />
        </g>
      ) : null}
      <rect x={0} y={floor} width={1080} height={1920 - floor} fill={SAND_DD} />
      <path d={`M 0 ${floor} L 1080 ${floor}`} stroke={INK} strokeWidth={7} />
    </>
  );
};

// The embalmer-priest in a jackal (Anubis) mask, waist-up and big, facing left. Origin = belt centre.
// hand = front hand (local coords). basket: holds a natron basket in that hand.
const Priest: React.FC<{ x: number; y: number; s?: number; f: number; hand?: [number, number]; basket?: number }> = ({ x, y, s = 1, f, hand = [-240, -300], basket = 0 }) => {
  const breathe = Math.sin(f / 14) * 3;
  const [hx, hy] = hand;
  const sx = -118;
  const sy = -350;
  const ex = (sx + hx) / 2 + 30;
  const ey = Math.max(sy, hy) + 80;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* striped head-cloth falling behind */}
        <path d="M 0 -630 Q 120 -620 132 -520 L 150 -330 L 50 -330 L 30 -520 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M ${44 + k * 8} ${-600 + k * 64} L ${136 + k * 3} ${-590 + k * 64}`} stroke={LAPIS} strokeWidth={16} />
        ))}
        {/* back arm */}
        <path d="M 118 -350 Q 180 -220 150 -90" stroke={SKIN} strokeWidth={66} fill="none" strokeLinecap="round" />
        <circle cx={150} cy={-80} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* kilt */}
        <path d="M -126 0 L 126 0 L 170 440 L -170 440 Z" fill="#FBF6E9" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-80, -30, 20, 70].map((k) => (
          <path key={k} d={`M ${k} 20 L ${k * 1.3} 430`} stroke={LINEN_D} strokeWidth={6} />
        ))}
        {/* neck + bare torso */}
        <rect x={-40} y={-460} width={80} height={90} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -142 -385 Q 0 -415 142 -385 L 118 10 L -118 10 Z" fill={SKIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -200 Q 0 -180 60 -200" stroke={SKIN_D} strokeWidth={6} fill="none" />
        <rect x={-132} y={-24} width={264} height={40} rx={6} fill={GOLD} stroke={INK} strokeWidth={6} />
        {/* broad collar */}
        <path d="M -136 -386 Q 0 -190 136 -386" stroke={LAPIS} strokeWidth={26} fill="none" />
        <path d="M -138 -390 Q 0 -232 138 -390" stroke={TURQ} strokeWidth={22} fill="none" />
        <path d="M -140 -394 Q 0 -276 140 -394" stroke={GOLD} strokeWidth={24} fill="none" />
        <path d="M -140 -380 Q 0 -178 140 -380" stroke={INK} strokeWidth={4} fill="none" />
        {/* ears */}
        <path d="M 4 -600 L 30 -805 L 84 -606 Z" fill={JACKAL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -66 -598 L -58 -800 L 0 -612 Z" fill={JACKAL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -50 -620 L -54 -740 L -18 -626 Z" fill={GOLD_D} />
        {/* head + long snout */}
        <ellipse cx={0} cy={-548} rx={90} ry={94} fill={JACKAL} stroke={INK} strokeWidth={7} />
        <path d="M -48 -598 Q -150 -588 -252 -536 Q -266 -516 -246 -504 Q -150 -492 -40 -470 Z" fill={JACKAL} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -588 Q -150 -578 -230 -540" stroke={JACKAL_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={-248} cy={-522} rx={17} ry={13} fill="#000" />
        <path d="M -232 -503 Q -150 -490 -72 -482" stroke={JACKAL_HI} strokeWidth={5} fill="none" />
        {/* gold-lined eye */}
        <path d="M -84 -578 Q -54 -604 -22 -582 Q -54 -562 -84 -578 Z" fill="#FFF4D0" stroke={GOLD} strokeWidth={6} />
        <circle cx={-50} cy={-580} r={9} fill={INK} />
        <path d="M -22 -582 L 14 -574" stroke={GOLD} strokeWidth={6} strokeLinecap="round" />
        {/* head-cloth lappet in front of the shoulder */}
        <path d="M 22 -560 Q 46 -460 26 -372 L 96 -372 Q 104 -480 84 -584 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${34 + k * 2} ${-520 + k * 50} L ${94 + k * 2} ${-526 + k * 50}`} stroke={LAPIS} strokeWidth={14} />
        ))}
        {/* front arm with a gold armband */}
        <path d={`M ${sx} ${sy} Q ${ex - 30} ${ey} ${ex} ${ey}`} stroke={INK} strokeWidth={78} fill="none" strokeLinecap="round" />
        <path d={`M ${sx} ${sy} Q ${ex - 30} ${ey} ${ex} ${ey}`} stroke={SKIN} strokeWidth={66} fill="none" strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={60} strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={SKIN} strokeWidth={48} strokeLinecap="round" />
        <circle cx={(sx + ex) / 2} cy={(sy + ey) / 2 + 6} r={30} fill={GOLD} stroke={INK} strokeWidth={5} />
        {basket > 0 ? (
          <g transform={`translate(${hx} ${hy}) rotate(${-50 * basket})`}>
            <path d="M -110 -20 Q 0 70 110 -20 L 96 -60 L -96 -60 Z" fill="#C9A15E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -96 -60 Q 0 -40 96 -60" stroke={INK} strokeWidth={5} fill={NATRON} />
            {[-60, -20, 20, 60].map((k) => (
              <path key={k} d={`M ${k} -50 L ${k * 0.8} 30`} stroke="#9E7A3E" strokeWidth={5} />
            ))}
          </g>
        ) : null}
        <circle cx={hx} cy={hy} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

// gilded lion-bed embalming table (top surface at y = 1360)
const LionBed: React.FC = () => (
  <g>
    {[180, 900].map((x) => (
      <g key={x}>
        <path d={`M ${x - 28} 1420 Q ${x - 50} 1560 ${x - 26} 1700 L ${x + 40} 1700 Q ${x + 20} 1560 ${x + 28} 1420 Z`} fill={GOLD_D} stroke={INK} strokeWidth={6} />
        <ellipse cx={x + 8} cy={1712} rx={56} ry={22} fill={GOLD} stroke={INK} strokeWidth={6} />
        <path d={`M ${x - 22} 1712 l 0 18 M ${x + 6} 1716 l 0 16 M ${x + 34} 1712 l 0 18`} stroke={INK} strokeWidth={5} />
      </g>
    ))}
    <path d="M 990 1384 Q 1066 1340 1044 1258 Q 1036 1226 1058 1210" stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 990 1384 Q 1066 1340 1044 1258 Q 1036 1226 1058 1210" stroke={GOLD} strokeWidth={12} fill="none" strokeLinecap="round" />
    <rect x={90} y={1358} width={910} height={66} rx={14} fill={GOLD} stroke={INK} strokeWidth={7} />
    <path d="M 112 1392 L 978 1392" stroke={GOLD_D} strokeWidth={6} />
    <g transform="translate(96 1326)">
      <circle r={72} fill={GOLD_D} stroke={INK} strokeWidth={6} />
      <ellipse cx={-10} cy={6} rx={48} ry={52} fill={GOLD} stroke={INK} strokeWidth={6} />
      <circle cx={-28} cy={-8} r={6} fill={INK} />
      <circle cx={8} cy={-8} r={6} fill={INK} />
      <path d="M -20 20 L -8 32 L 4 20 Z" fill={INK} />
    </g>
  </g>
);

const NOSE = "M 238 1240 Q 240 1204 262 1204 Q 276 1220 270 1242 Z";

// the deceased lying on the bed under a linen sheet (head left, face up, eyes closed).
// salt 0..1 = natron heaped over him; wrap 0..1 = linen bandages from the feet to the head; gold 0..1 = gilded mask
const Dead: React.FC<{ f: number; salt?: number; wrap?: number; gold?: number }> = ({ f, salt = 0, wrap = 0, gold = 0 }) => {
  const wx = 990 - 860 * wrap;
  const body = "M 300 1362 Q 296 1262 400 1250 L 860 1262 Q 962 1268 970 1362 Z";
  return (
    <g>
      <defs>
        <clipPath id="ep046mummy">
          <ellipse cx={250} cy={1294} rx={76} ry={66} />
          <path d={body} />
        </clipPath>
      </defs>
      <ellipse cx={250} cy={1294} rx={74} ry={64} fill={DEAD} stroke={INK} strokeWidth={6} />
      <path d="M 180 1316 Q 170 1256 214 1236 Q 192 1272 196 1326 Z" fill="#3A2A20" />
      <path d={NOSE} fill={DEAD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 206 1262 Q 220 1272 236 1262" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M 288 1256 L 304 1262" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d={body} fill={LINEN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 420 1282 Q 600 1302 820 1286 M 480 1322 Q 640 1338 860 1320" stroke={LINEN_D} strokeWidth={6} fill="none" />
      {wrap > 0 ? (
        <g clipPath="url(#ep046mummy)">
          <rect x={wx} y={1200} width={1000 - wx} height={180} fill={LINEN} />
          {new Array(44).fill(0).map((_, k) => {
            const x = 130 + k * 20;
            return x + 10 > wx ? <path key={k} d={`M ${x + 30} 1220 L ${x - 20} 1370`} stroke={LINEN_D} strokeWidth={6} /> : null;
          })}
          {wrap < 1 ? <rect x={wx - 6} y={1200} width={12} height={180} fill="#FFFFFF" opacity={0.9} /> : null}
        </g>
      ) : null}
      {wrap > 0 ? <path d={body} fill="none" stroke={INK} strokeWidth={6} /> : null}
      {wrap >= 1 ? <ellipse cx={250} cy={1294} rx={74} ry={64} fill="none" stroke={INK} strokeWidth={6} /> : null}
      {gold > 0 ? (
        <g transform={`translate(250 1290) scale(${gold})`}>
          <ellipse cx={0} cy={0} rx={80} ry={70} fill={GOLD} stroke={INK} strokeWidth={6} />
          {[-40, -14, 12, 38].map((k) => (
            <path key={k} d={`M -76 ${k} Q 0 ${k - 10} 76 ${k}`} stroke={LAPIS} strokeWidth={10} fill="none" opacity={0.9} />
          ))}
          <path d="M -14 -50 Q -10 -76 12 -74 Q 22 -60 16 -46 Z" fill={GOLD_D} stroke={INK} strokeWidth={4} />
          <path d="M -46 -20 Q -30 -8 -14 -20" stroke={INK} strokeWidth={5} fill="none" />
        </g>
      ) : null}
      {gold > 0
        ? [0, 1, 2, 3, 4].map((k) => {
            const p = ((f + k * 9) % 30) / 30;
            const sx = 220 + k * 160;
            return <path key={k} d={`M ${sx} ${1190 - p * 90} l 8 -20 l 8 20 l 20 8 l -20 8 l -8 20 l -8 -20 l -20 -8 Z`} fill="#FFF3B0" stroke={GOLD_D} strokeWidth={3} opacity={1 - p} />;
          })
        : null}
      {salt > 0
        ? [0, 1, 2, 3, 4, 5, 6].map((k) => (
            <ellipse key={k} cx={190 + k * 126} cy={1364} rx={120} ry={(70 + (k % 2) * 36) * salt} fill={NATRON} stroke={INK} strokeWidth={5} />
          ))
        : null}
    </g>
  );
};

type Lid = "human" | "baboon" | "jackal" | "falcon";
const Jar: React.FC<{ x: number; y: number; s?: number; lid: Lid; open?: number }> = ({ x, y, s = 1, lid, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={60} ry={12} fill="#000" opacity={0.18} />
    <path d="M -46 0 Q -66 -100 -50 -150 L 50 -150 Q 66 -100 46 0 Z" fill="#F1E3C6" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -54 -60 L 54 -60 M -56 -90 L 56 -90" stroke={LAPIS} strokeWidth={5} />
    <g transform={`translate(0 ${-150 - open * 60}) rotate(${open * -20})`}>
      {lid === "jackal" ? (
        <>
          <path d="M -20 -40 L -14 -110 L 8 -46 Z M 10 -40 L 22 -106 L 34 -40 Z" fill={JACKAL} stroke={INK} strokeWidth={5} />
          <ellipse cx={4} cy={-28} rx={40} ry={34} fill={JACKAL} stroke={INK} strokeWidth={5} />
          <path d="M -20 -40 L -76 -22 L -20 -10 Z" fill={JACKAL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        </>
      ) : lid === "falcon" ? (
        <>
          <ellipse cx={0} cy={-34} rx={42} ry={38} fill="#8C6A44" stroke={INK} strokeWidth={5} />
          <path d="M -36 -36 Q -64 -30 -50 -10 L -30 -24 Z" fill={GOLD} stroke={INK} strokeWidth={5} />
          <circle cx={-14} cy={-44} r={7} fill={INK} />
        </>
      ) : lid === "baboon" ? (
        <>
          <ellipse cx={0} cy={-36} rx={44} ry={40} fill="#9C9A8C" stroke={INK} strokeWidth={5} />
          <ellipse cx={-10} cy={-24} rx={22} ry={16} fill="#D9C7A6" stroke={INK} strokeWidth={4} />
          <circle cx={-18} cy={-48} r={6} fill={INK} />
        </>
      ) : (
        <>
          <path d="M -46 0 L -40 -60 Q 0 -96 40 -60 L 46 0 Z" fill={LAPIS} stroke={INK} strokeWidth={5} />
          <ellipse cx={0} cy={-34} rx={30} ry={34} fill={SKIN} stroke={INK} strokeWidth={5} />
          <circle cx={-10} cy={-40} r={5} fill={INK} />
          <circle cx={10} cy={-40} r={5} fill={INK} />
        </>
      )}
    </g>
  </g>
);

// the iron hook from the hand to the tip (with a little crook at the end)
const Hook: React.FC<{ hand: [number, number]; tip: [number, number] }> = ({ hand, tip }) => {
  const [hx, hy] = hand;
  const [tx, ty] = tip;
  const ang = (Math.atan2(ty - hy, tx - hx) * 180) / Math.PI;
  const gx = hx + (tx - hx) * 0.3;
  const gy = hy + (ty - hy) * 0.3;
  return (
    <g>
      <path d={`M ${hx} ${hy} L ${tx} ${ty}`} stroke={INK} strokeWidth={20} strokeLinecap="round" />
      <path d={`M ${hx} ${hy} L ${tx} ${ty}`} stroke={IRON} strokeWidth={11} strokeLinecap="round" />
      <path d={`M ${hx} ${hy} L ${tx} ${ty}`} stroke="#B8BEC8" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
      <path d={`M ${hx} ${hy} L ${gx} ${gy}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${hx} ${hy} L ${gx} ${gy}`} stroke={WOOD} strokeWidth={20} strokeLinecap="round" />
      <g transform={`translate(${tx} ${ty}) rotate(${ang})`}>
        <path d="M 0 0 q 18 0 18 -16 q 0 -12 -10 -12" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M 0 0 q 18 0 18 -16 q 0 -12 -10 -12" stroke={IRON} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// cartoon pink "noodle" pulled from the nose to the hook tip
const Goo: React.FC<{ from: [number, number]; to: [number, number]; f: number }> = ({ from, to, f }) => {
  const n = 9;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / len;
  const ny = dx / len;
  const pts = new Array(n + 1).fill(0).map((_, i) => {
    const t = i / n;
    const w = Math.sin(i * 1.7 + f / 3) * 12 * Math.sin(t * Math.PI);
    return [from[0] + dx * t + nx * w, from[1] + dy * t + ny * w];
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <g>
      <path d={d} stroke={BRAIN_D} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={BRAIN} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={to[0]} cy={to[1] + 10} r={22} fill={BRAIN} stroke={BRAIN_D} strokeWidth={5} />
      <path d={`M ${to[0] - 12} ${to[1] + 6} q 6 -8 12 0 q 6 8 12 0`} stroke={BRAIN_D} strokeWidth={4} fill="none" />
    </g>
  );
};

const NOSTRIL: [number, number] = [258, 1224];
const PX = 790;
const PY = 1600;
const PS = 1.35;

// the whole embalming set: priest behind the lion bed, hook in the nose.
// insert 0..1 (hook going in), twist 0..1 (wiggle), pull 0..1 (out, with the noodle)
const NoseSet: React.FC<{ f: number; insert: number; twist: number; pull: number; jars?: boolean }> = ({ f, insert, twist, pull, jars = true }) => {
  const tx = NOSTRIL[0] + (1 - insert) * 70 + pull * 80 + Math.sin(f * 0.9) * 8 * twist;
  const ty = NOSTRIL[1] - (1 - insert) * 150 - pull * 230 + Math.cos(f * 0.9) * 6 * twist;
  const hand: [number, number] = [tx + 210, ty - 122];
  const inside = insert >= 0.98 && pull < 0.04;
  return (
    <>
      <Tomb f={f} />
      <Priest x={PX} y={PY} s={PS} f={f} hand={[(hand[0] - PX) / PS, (hand[1] - PY) / PS]} />
      {jars ? (
        <>
          <Jar x={340} y={1830} s={0.95} lid="human" />
          <Jar x={480} y={1830} s={0.95} lid="baboon" />
          <Jar x={620} y={1830} s={0.95} lid="jackal" />
          <Jar x={760} y={1830} s={0.95} lid="falcon" />
        </>
      ) : null}
      <Dead f={f} />
      <LionBed />
      {pull > 0.02 ? <Goo from={NOSTRIL} to={[tx, ty]} f={f} /> : null}
      <Hook hand={hand} tip={[tx, ty]} />
      {inside ? <path d={NOSE} fill={DEAD} stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
      <circle cx={hand[0]} cy={hand[1]} r={32 * PS} fill={SKIN} stroke={INK} strokeWidth={6} />
      {twist > 0.05
        ? [0, 1].map((k) => {
            const a = (f * 14 + k * 180) % 360;
            return (
              <g key={k} transform={`translate(${NOSTRIL[0]} ${NOSTRIL[1] - 20}) rotate(${a})`} opacity={twist}>
                <path d="M 70 0 A 70 70 0 0 1 0 70" stroke={C.brick} strokeWidth={10} fill="none" strokeLinecap="round" />
                <path d="M 0 70 l 20 -16 M 0 70 l 22 12" stroke={C.brick} strokeWidth={10} strokeLinecap="round" />
              </g>
            );
          })
        : null}
    </>
  );
};

// the "slitter": a running man in a kilt with a flint blade, looking back in panic. Origin = feet centre, running left.
const Runner: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const ph = f / 2.6;
  const st = Math.sin(ph);
  const bob = -Math.abs(Math.cos(ph)) * 18;
  const leg = (k: number) => {
    const a = st * k;
    return `M 0 -250 L ${-a * 95} -125 L ${-a * 120 + (a > 0 ? -40 : 30)} 0`;
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={130} ry={18} fill="#000" opacity={0.18} />
      <g transform={`translate(0 ${bob})`}>
        {[1, -1].map((k) => (
          <g key={k}>
            <path d={leg(k)} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={leg(k)} stroke={k > 0 ? SKIN : SKIN_D} strokeWidth={38} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        {/* back arm */}
        <path d={`M 20 -450 L ${60 + st * 70} -360 L ${90 + st * 100} -300`} stroke={INK} strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 20 -450 L ${60 + st * 70} -360 L ${90 + st * 100} -300`} stroke={SKIN_D} strokeWidth={32} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* kilt + torso */}
        <path d="M -80 -300 L 80 -300 L 110 -170 L -110 -170 Z" fill="#FBF6E9" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-84} y={-312} width={168} height={22} fill={C.brick} stroke={INK} strokeWidth={5} />
        <path d="M -80 -490 Q 0 -515 80 -490 L 70 -300 L -70 -300 Z" fill={SKIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {/* head looking back over the shoulder (to the right) */}
        <rect x={-26} y={-530} width={52} height={50} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-575} r={66} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -66 -580 Q -60 -650 0 -648 Q 50 -648 40 -610 Q 0 -620 -20 -580 Q -30 -540 -60 -540 Z" fill="#1E1714" stroke={INK} strokeWidth={4} />
        <circle cx={30} cy={-590} r={12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={34} cy={-590} r={5} fill={INK} />
        <ellipse cx={44} cy={-545} rx={13} ry={17} fill="#5A1E1A" stroke={INK} strokeWidth={4} />
        <path d="M 14 -616 L 44 -626" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        {/* sweat */}
        {[0, 1].map((k) => {
          const p = ((f + k * 8) % 16) / 16;
          return <path key={k} d={`M ${-70 - p * 40} ${-620 + p * 30 + k * 40} q -10 14 0 20 q 10 -6 0 -20 Z`} fill="#9CD3E8" stroke={INK} strokeWidth={3} opacity={1 - p} />;
        })}
        {/* front arm with the flint blade */}
        <path d={`M -20 -450 L ${-70 - st * 70} -370 L ${-120 - st * 90} -320`} stroke={INK} strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M -20 -450 L ${-70 - st * 70} -370 L ${-120 - st * 90} -320`} stroke={SKIN} strokeWidth={32} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <g transform={`translate(${-120 - st * 90} -320) rotate(-30)`}>
          <path d="M 0 -10 L -90 -4 L -70 14 L 0 12 Z" fill="#5B5E68" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={0} cy={0} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      </g>
    </g>
  );
};

// small onlooker silhouette throwing (origin = feet), arm raise 0..1
const Thrower: React.FC<{ x: number; y: number; s?: number; raise: number; col: string }> = ({ x, y, s = 1, raise, col }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 0 L -40 -200 Q 0 -230 40 -200 L 50 0 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={-250} r={44} fill={SKIN_D} stroke={INK} strokeWidth={6} />
    <path d="M -44 -256 Q -40 -300 0 -298 Q 40 -300 44 -256 Q 20 -276 -44 -256 Z" fill="#1E1714" />
    <path d={`M -30 -190 L ${-80 + raise * 30} ${-150 - raise * 160}`} stroke={INK} strokeWidth={30} strokeLinecap="round" />
    <path d={`M -30 -190 L ${-80 + raise * 30} ${-150 - raise * 160}`} stroke={SKIN_D} strokeWidth={20} strokeLinecap="round" />
    <path d="M -20 -232 Q -6 -224 6 -232" stroke={INK} strokeWidth={5} fill="none" />
  </g>
);

const Stone: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 30, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M ${-r} 0 Q ${-r} ${-r * 0.9} 0 ${-r * 0.85} Q ${r * 1.1} ${-r * 0.7} ${r} ${r * 0.1} Q ${r * 0.6} ${r * 0.8} ${-r * 0.2} ${r * 0.7} Q ${-r * 0.9} ${r * 0.6} ${-r} 0 Z`} fill="#8F8577" stroke={INK} strokeWidth={5} />
    <path d={`M ${-r * 0.4} ${-r * 0.4} q ${r * 0.3} ${-r * 0.2} ${r * 0.6} 0`} stroke="#B9AF9F" strokeWidth={5} fill="none" />
  </g>
);

// A Victorian painter, waist-up and big, facing right. Origin = belt centre.
const Painter: React.FC<{ x: number; y: number; s?: number; f: number; hand?: [number, number]; coat?: string; beret?: boolean; frown?: boolean }> = ({ x, y, s = 1, f, hand = [240, -320], coat = "#4D6F9A", beret = true, frown = false }) => {
  const breathe = Math.sin(f / 14) * 3;
  const [hx, hy] = hand;
  const sx = 112;
  const sy = -345;
  const ex = (sx + hx) / 2 - 30;
  const ey = Math.max(sy, hy) + 80;
  const BEARD = "#8A5A32";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        <path d="M -112 -345 Q -176 -220 -136 -90" stroke={INK} strokeWidth={78} fill="none" strokeLinecap="round" />
        <path d="M -112 -345 Q -176 -220 -136 -90" stroke={coat} strokeWidth={66} fill="none" strokeLinecap="round" />
        <path d="M -142 -388 Q 0 -418 142 -388 L 176 540 L -176 540 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -44 -394 L 0 -230 L 44 -394 Z" fill="#FBF6E9" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -40 -372 L 0 -352 L -40 -332 Z M 40 -372 L 0 -352 L 40 -332 Z" fill={C.brick} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <rect x={-36} y={-452} width={72} height={70} fill="#D9A47C" stroke={INK} strokeWidth={6} />
        <ellipse cx={6} cy={-505} rx={88} ry={98} fill={SKIN_L} stroke={INK} strokeWidth={7} />
        <ellipse cx={-72} cy={-498} rx={18} ry={28} fill="#D9A47C" stroke={INK} strokeWidth={5} />
        <path d="M -84 -520 Q -84 -606 6 -606 Q 70 -606 92 -560 Q 40 -584 -20 -566 Q -50 -540 -60 -500 Z" fill={BEARD} stroke={INK} strokeWidth={5} />
        <circle cx={40} cy={-522} r={9} fill={INK} />
        <circle cx={88} cy={-518} r={9} fill={INK} />
        <path d={frown ? "M 22 -552 L 56 -540 M 76 -540 L 106 -552" : "M 22 -546 L 56 -552 M 74 -552 L 106 -546"} stroke={BEARD} strokeWidth={9} strokeLinecap="round" />
        <path d="M 100 -514 Q 128 -484 102 -470" fill={SKIN_L} stroke={INK} strokeWidth={5} />
        <path d="M -62 -476 Q -56 -360 34 -338 Q 112 -358 108 -462 Q 70 -432 30 -438 Q -20 -432 -62 -476 Z" fill={BEARD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 22 -454 Q 66 -474 110 -454 Q 70 -440 22 -446 Z" fill={BEARD} stroke={INK} strokeWidth={4} />
        {beret ? (
          <g transform="rotate(-10 0 -590)">
            <ellipse cx={0} cy={-592} rx={108} ry={36} fill="#7A2730" stroke={INK} strokeWidth={6} />
            <path d="M -2 -626 l 4 -24" stroke={INK} strokeWidth={8} strokeLinecap="round" />
          </g>
        ) : null}
        <path d={`M ${sx} ${sy} Q ${ex + 30} ${ey} ${ex} ${ey}`} stroke={INK} strokeWidth={78} fill="none" strokeLinecap="round" />
        <path d={`M ${sx} ${sy} Q ${ex + 30} ${ey} ${ex} ${ey}`} stroke={coat} strokeWidth={66} fill="none" strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={62} strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={coat} strokeWidth={50} strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={32} fill={SKIN_L} stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

// a big paint tube labelled MUMMY BROWN; nozzle points along +x. squeeze 0..1 dents the back end
const Tube: React.FC<{ x: number; y: number; s?: number; rot?: number; squeeze?: number }> = ({ x, y, s = 1, rot = 0, squeeze = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -150 ${-46 + squeeze * 18} L 110 -42 L 150 -20 L 150 20 L 110 42 L -150 ${46 - squeeze * 18} Z`} fill="#DCE1E8" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-170} y={-50 + squeeze * 18} width={26} height={100 - squeeze * 36} fill="#B9C0CA" stroke={INK} strokeWidth={5} />
    <rect x={-120} y={-34} width={216} height={68} rx={6} fill={MUMMY_BROWN} stroke={INK} strokeWidth={4} />
    <text x={-12} y={-6} textAnchor="middle" fontFamily={titleFont} fontSize={28} fill={C.cream}>MUMMY</text>
    <text x={-12} y={26} textAnchor="middle" fontFamily={titleFont} fontSize={28} fill={C.mustard}>BROWN</text>
    <rect x={150} y={-16} width={30} height={32} fill="#B9C0CA" stroke={INK} strokeWidth={5} />
  </g>
);

const Dunes: React.FC<{ y: number }> = ({ y }) => (
  <>
    <path d={`M 560 ${y} L 760 ${y - 260} L 960 ${y} Z`} fill="#E3B26A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M 760 ${y - 260} L 960 ${y} L 840 ${y} Z`} fill="#C9934E" />
    <path d={`M 380 ${y} L 470 ${y - 120} L 560 ${y} Z`} fill="#E3B26A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M 0 ${y + 20} Q 300 ${y - 70} 620 ${y + 10} Q 860 ${y - 50} 1080 ${y + 10} L 1080 1920 L 0 1920 Z`} fill={SAND} stroke={INK} strokeWidth={6} />
    <path d={`M 0 ${y + 220} Q 400 ${y + 150} 1080 ${y + 240}`} stroke={SAND_D} strokeWidth={8} fill="none" />
  </>
);

export const Embalmer: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "nose";
  const ph: number[] = v.phases ?? [];
  const float: string[] = v.float ?? [];
  let sky: "day" | "paper" = "paper";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "nose") {
    // frame 0: hook already in the nose and coming out with the noodle
    const pull = 0.12 + 0.62 * ease(f, 8, dur * 0.92);
    const twist = interpolate(f, [0, 10, 20], [0.8, 0.8, 0], clamp);
    body = <NoseSet f={f} insert={1} twist={twist} pull={pull} />;
  } else if (mode === "close") {
    // close-up on the head: hook goes in → twists → pulls
    const [a = 0.3, b = 0.5, c = 0.6, d = 0.8, e = 0.84] = ph;
    const insert = ease(f, a * dur, b * dur);
    const twist = interpolate(f, [c * dur, c * dur + 3, d * dur, d * dur + 3], [0, 1, 1, 0], clamp);
    const pull = 0.75 * ease(f, e * dur, dur);
    body = (
      <g transform="translate(-120 -2046) scale(2.4)">
        <NoseSet f={f} insert={insert} twist={twist} pull={pull} jars={false} />
      </g>
    );
  } else if (mode === "stones") {
    // the slitter runs for it; onlookers pelt him with (cartoon) stones
    sky = "day";
    const runX = interpolate(f, [0, dur], [660, 400], clamp);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1100} fill="#9FD0E0" />
        <circle cx={860} cy={300} r={90} fill="#FFE07A" opacity={0.9} />
        <Dunes y={1080} />
        {/* temple pylon behind on the left */}
        <path d="M 30 1100 L 70 640 L 330 640 L 370 1100 Z" fill="#E8C792" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={150} y={880} width={100} height={220} fill="#3A2A20" stroke={INK} strokeWidth={6} />
        <path d="M 60 700 L 340 700" stroke={C.brick} strokeWidth={14} />
        {[0, 1, 2].map((k) => (
          <Thrower key={k} x={850 + k * 95} y={1230 + (k % 2) * 30} s={1.1} raise={(Math.sin(f / 4 + k * 2) + 1) / 2} col={["#F7F1E1", "#D9E6EA", "#F2D8B0"][k]} />
        ))}
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${runX + 150} ${1180 + k * 70} l ${70 + k * 20} 0`} stroke={INK} strokeWidth={7} strokeLinecap="round" opacity={0.6} />
        ))}
        <Runner x={runX} y={1640} s={1.55} f={f} />
        {new Array(9).fill(0).map((_, k) => {
          const t0 = 2 + k * 6;
          const p = (f - t0) / 16;
          if (p < 0) return null;
          const sxs = 880 + (k % 3) * 80;
          const sys = 1000;
          const tx = runX - 220 + (k % 4) * 150;
          const ty = 1600 + (k % 2) * 60;
          if (p >= 1) return <Stone key={k} x={tx} y={ty} r={26} rot={k * 40} />;
          const x = sxs + (tx - sxs) * p;
          const y = sys + (ty - sys) * p - Math.sin(p * Math.PI) * 420;
          return <Stone key={k} x={x} y={y} r={30} rot={f * 25 + k * 40} />;
        })}
      </>
    );
  } else if (mode === "salt") {
    // natron heaped on → linen wrap → 70 days → gilded mask
    const [p0 = 0.27, p1 = 0.3, p2 = 0.52, p3 = 0.56, p4 = 0.78] = ph;
    const pour = interpolate(f, [0, 4, p0 * dur - 4, p0 * dur], [0, 1, 1, 0], clamp);
    const salt = interpolate(f, [2, p0 * dur, p1 * dur, p1 * dur + 4], [0.1, 1, 1, 0], clamp);
    const wrap = ease(f, p1 * dur, p2 * dur);
    const gold = popIn(f, p4 * dur, 10);
    const handUp = interpolate(f, [p0 * dur, p0 * dur + 8], [1, 0], clamp);
    const hand: [number, number] = [-250 + (1 - handUp) * 30, -300 - handUp * 260];
    const day = Math.round(interpolate(f, [p0 * dur * 0.5, p3 * dur], [1, 70], clamp));
    const done = popIn(f, p3 * dur, 8);
    body = (
      <>
        <Tomb f={f} floor={1220} frieze={520} lamp={[960, 760]} />
        <g transform="translate(0 -260)">
          <Priest x={800} y={1600} s={1.2} f={f} hand={hand} basket={pour} />
          <Dead f={f} salt={salt} wrap={wrap} gold={gold} />
          <LionBed />
          {pour > 0.2
            ? new Array(12).fill(0).map((_, k) => {
                const p = ((f + k * 2.3) % 10) / 10;
                return <rect key={k} x={420 + (k % 6) * 22 - p * 40} y={960 + p * 290} width={12} height={12} fill={NATRON} stroke={INK} strokeWidth={2} opacity={pour} />;
              })
            : null}
        </g>
      </>
    );
    overlay = (
      <div style={{ position: "absolute", left: 0, right: 0, top: v.chipTop ?? 400, display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: titleFont, fontSize: 112, color: INK, background: done > 0 ? C.mustard : C.cream, border: `8px solid ${INK}`, borderRadius: 26, padding: "4px 44px", rotate: "-2deg", scale: `${1 + done * 0.12 - Math.max(0, done - 1) * 0.12}` }}>
          DAY {day}
        </div>
      </div>
    );
  } else if (mode === "paint") {
    // a crate of mummies + a pigment mortar → (answer) a painter squeezing a MUMMY BROWN tube
    const answerAt = (v.answerAt ?? 0.55) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    if (f < answerAt) {
      const g = Math.sin(f / 2.5);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#C9A27A" />
          {new Array(8).fill(0).map((_, k) => (
            <path key={k} d={`M ${k * 140 + 40} 0 L ${k * 140 + 40} 1450`} stroke="#B08A62" strokeWidth={6} />
          ))}
          <rect x={0} y={1450} width={1080} height={470} fill="#7A5434" />
          <path d="M 0 1450 L 1080 1450" stroke={INK} strokeWidth={7} />
          <rect x={640} y={820} width={400} height={18} fill={WOOD} stroke={INK} strokeWidth={5} />
          {[680, 790, 900].map((x) => (
            <g key={x}>
              <rect x={x} y={710} width={80} height={110} rx={10} fill={MUMMY_BROWN} stroke={INK} strokeWidth={5} />
              <rect x={x + 10} y={696} width={60} height={20} fill="#3A2A20" stroke={INK} strokeWidth={4} />
            </g>
          ))}
          {/* crate with a wrapped mummy */}
          <path d="M 70 1060 Q 120 990 300 1000 L 520 1010 Q 560 1020 560 1070 Z" fill={LINEN} stroke={INK} strokeWidth={6} />
          {new Array(16).fill(0).map((_, k) => (
            <path key={k} d={`M ${110 + k * 28} 1000 L ${90 + k * 28} 1070`} stroke={LINEN_D} strokeWidth={6} />
          ))}
          <ellipse cx={120} cy={1040} rx={56} ry={46} fill={LINEN} stroke={INK} strokeWidth={6} />
          <rect x={50} y={1050} width={540} height={360} fill="#B98A52" stroke={INK} strokeWidth={7} />
          {[1110, 1180, 1250, 1320].map((y) => (
            <path key={y} d={`M 50 ${y} L 590 ${y}`} stroke="#9A6E3C" strokeWidth={6} />
          ))}
          <text x={320} y={1270} textAnchor="middle" fontFamily={titleFont} fontSize={64} fill="#5A3A1C" opacity={0.85}>EGYPT</text>
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M ${70 + k * 110} 1052 l ${20 + k * 3} -36 M ${100 + k * 110} 1052 l -14 -30`} stroke="#E8C66E" strokeWidth={6} strokeLinecap="round" />
          ))}
          {/* mortar + pestle grinding */}
          <g transform={`translate(830 1440)`}>
            <g transform={`rotate(${g * 16} 0 -150)`}>
              <rect x={-24} y={-420} width={48} height={300} rx={22} fill={WOOD} stroke={INK} strokeWidth={6} />
            </g>
            <path d="M -170 -170 Q -160 10 0 20 Q 160 10 170 -170 Z" fill="#9A9284" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <ellipse cx={0} cy={-170} rx={170} ry={36} fill="#7E776A" stroke={INK} strokeWidth={7} />
            <ellipse cx={0} cy={-166} rx={140} ry={24} fill={MUMMY_BROWN} />
            {[0, 1, 2, 3].map((k) => {
              const p = ((f + k * 6) % 24) / 24;
              return <circle key={k} cx={-60 + k * 40 + p * 30 * (k % 2 ? 1 : -1)} cy={-200 - p * 200} r={16 + p * 34} fill="#8A5A36" opacity={0.6 * (1 - p)} />;
            })}
          </g>
        </>
      );
    } else {
      const lf = f - answerAt;
      const squeeze = (Math.sin(lf / 3) + 1) / 2;
      const worm = interpolate(lf, [2, 30], [0, 1], clamp);
      // the painter holds the crimped end; tube centre sits 176 px along the tube from the hand
      const HX = 250 + 200 * 1.42;
      const HY = 1560 - 330 * 1.42;
      const ca = Math.cos((10 * Math.PI) / 180);
      const sa = Math.sin((10 * Math.PI) / 180);
      const TX = HX + 176 * ca;
      const TY = HY + 176 * sa;
      const nx = TX + 198 * ca;
      const ny = TY + 198 * sa;
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#EFD9AE" />
          <path d="M 0 0 L 360 0 L 120 1450 L 0 1450 Z" fill="#FFF3D2" opacity={0.6} />
          <rect x={0} y={1450} width={1080} height={470} fill="#8A6040" />
          <path d="M 0 1450 L 1080 1450" stroke={INK} strokeWidth={7} />
          {/* easel + canvas */}
          <path d="M 700 1500 L 800 480 L 900 1500 M 800 480 L 820 1520" stroke={WOOD} strokeWidth={22} strokeLinecap="round" />
          <rect x={590} y={560} width={430} height={450} fill="#5E3B22" stroke={INK} strokeWidth={9} />
          <ellipse cx={805} cy={760} rx={110} ry={140} fill="#C99A70" stroke={INK} strokeWidth={5} />
          <path d="M 695 760 Q 700 600 805 610 Q 915 600 915 760 Q 880 680 805 680 Q 730 680 695 760 Z" fill={MUMMY_BROWN} stroke={INK} strokeWidth={4} />
          <path d="M 680 1010 Q 805 880 930 1010 Z" fill="#7A4A2A" stroke={INK} strokeWidth={5} />
          <rect x={600} y={1000} width={410} height={22} fill={WOOD} stroke={INK} strokeWidth={5} />
          {/* palette on a stool */}
          <rect x={860} y={1250} width={30} height={200} fill={WOOD} stroke={INK} strokeWidth={5} />
          <path d="M 760 1230 Q 760 1190 860 1186 Q 1010 1180 1010 1222 Q 1010 1262 900 1262 Q 860 1262 850 1240 Q 820 1262 790 1258 Q 760 1254 760 1230 Z" fill="#D9A866" stroke={INK} strokeWidth={6} />
          <circle cx={960} cy={1214} r={16} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <circle cx={990} cy={1236} r={14} fill={C.brick} stroke={INK} strokeWidth={3} />
          <circle cx={810} cy={1226} r={14} fill={C.mustard} stroke={INK} strokeWidth={3} />
          <ellipse cx={nx + 6} cy={1222} rx={12 + worm * 34} ry={8 + worm * 12} fill={MUMMY_BROWN} stroke={INK} strokeWidth={3} />
          {worm > 0 ? <path d={`M ${nx} ${ny} Q ${nx + 18} ${ny + 30} ${nx + 4} ${ny + (1222 - ny) * worm}`} stroke={MUMMY_BROWN} strokeWidth={22} fill="none" strokeLinecap="round" /> : null}
          <Painter x={250} y={1560} s={1.42} f={f} hand={[200, -330]} />
          <Tube x={TX} y={TY} s={1.1} rot={10} squeeze={squeeze} />
          <circle cx={HX} cy={HY} r={32 * 1.42} fill={SKIN_L} stroke={INK} strokeWidth={6} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  } else if (mode === "garden") {
    // he buries his tube in the garden: hole → drop → little grave
    sky = "day";
    const [d0 = 0.35, d1 = 0.55] = ph;
    const t1 = d0 * dur;
    const t2 = d1 * dur;
    const fall = ease(f, t1, t1 + 9);
    const grave = popIn(f, t2, 9);
    const hx = 300 + 250 * 1.4;
    const hy = 1560 - 360 * 1.4;
    const tubeX = hx + 40 + (780 - hx - 40) * fall;
    const tubeY = hy + (1150 - hy) * fall;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1000} fill="#A9D8E6" />
        {[120, 420, 760, 1000].map((x, k) => (
          <g key={x}>
            <rect x={x - 16} y={700} width={32} height={260} fill={WOOD} stroke={INK} strokeWidth={5} />
            <circle cx={x} cy={660 + (k % 2) * 30} r={130} fill={k % 2 ? "#5E9E48" : "#4E8E3E"} stroke={INK} strokeWidth={6} />
          </g>
        ))}
        <path d="M 0 960 Q 100 900 200 950 Q 300 900 400 950 Q 500 900 600 950 Q 700 900 800 950 Q 900 900 1080 950 L 1080 1010 L 0 1010 Z" fill="#3F7D33" stroke={INK} strokeWidth={6} />
        <rect x={0} y={1000} width={1080} height={920} fill="#86BD5E" />
        <path d="M 0 1000 L 1080 1000" stroke={INK} strokeWidth={6} />
        {[[150, 1100], [520, 1060], [980, 1240], [640, 1330]].map(([x, y], k) => (
          <g key={k}>
            <circle cx={x} cy={y} r={12} fill={k % 2 ? C.mustard : "#F28AA0"} stroke={INK} strokeWidth={3} />
            <path d={`M ${x} ${y + 12} l 0 30`} stroke="#3F7D33" strokeWidth={5} />
          </g>
        ))}
        {/* dirt pile + spade */}
        <path d="M 860 1160 Q 900 1090 980 1100 Q 1040 1110 1050 1170 Z" fill="#7A5434" stroke={INK} strokeWidth={5} />
        <path d="M 960 1110 L 1000 940" stroke={WOOD} strokeWidth={14} strokeLinecap="round" />
        <path d="M 940 1100 L 978 1100 L 970 1160 L 944 1160 Z" fill="#9AA1AB" stroke={INK} strokeWidth={5} />
        {grave <= 0 ? <ellipse cx={780} cy={1160} rx={96} ry={28} fill="#3A2416" stroke={INK} strokeWidth={5} /> : null}
        {grave > 0 ? (
          <g transform={`translate(780 1160) scale(${grave})`}>
            <ellipse cx={0} cy={0} rx={110} ry={34} fill="#7A5434" stroke={INK} strokeWidth={5} />
            <path d="M -44 -10 L -44 -130 Q 0 -170 44 -130 L 44 -10 Z" fill="#B7B4AC" stroke={INK} strokeWidth={6} />
            <text x={0} y={-74} textAnchor="middle" fontFamily={titleFont} fontSize={30} fill={INK}>R.I.P.</text>
            <circle cx={70} cy={-26} r={12} fill="#F28AA0" stroke={INK} strokeWidth={3} />
            <path d="M 70 -14 l 0 16" stroke="#3F7D33" strokeWidth={5} />
          </g>
        ) : null}
        <Painter x={300} y={1560} s={1.4} f={f} hand={[250, -360]} coat="#3B3A48" beret={false} frown />
        {fall < 1 ? <Tube x={tubeX} y={tubeY} s={0.8 - fall * 0.3} rot={-10 + fall * 80} /> : null}
        {fall < 0.2 ? <circle cx={hx} cy={hy} r={32 * 1.4} fill={SKIN_L} stroke={INK} strokeWidth={6} /> : null}
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {overlay}
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 270} size={v.size ?? 100} /> : null}
      {mode === "paint" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.55) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 270} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
