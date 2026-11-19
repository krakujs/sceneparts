import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep034 Royal food taster – paid to take the first bite of the king's food in case it was poisoned.
// visual: { mode: "taste" | "watch" | "mushroom" | "women" | "credenza", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, fadeAt? (women: others vanish), answer?, answerAccent?, answerAt? (credenza) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B48A";
const SKIN_D = "#C98E64";
const GOLD = "#E2B33C";
const GOLD_D = "#A9801F";
const WALL = "#6B2228";
const WALL_D = "#561A1F";
const CLOTH = "#F4ECDA";
const DOUBLET = "#2F5D50";
const DOUBLET_HI = "#3E7464";
const HAIR = "#4A2E1C";
const WOOD = "#7A4B2A";
const POISON = "#7BD64A";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 115 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 56, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// candle-lit banqueting hall: red wall with gold diamonds, two candles, a laid table
const Hall: React.FC<{ f: number; table?: number }> = ({ f, table = 1380 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill={WALL} />
    {new Array(9).fill(0).map((_, r) =>
      new Array(6).fill(0).map((__, k) => (
        <path key={`${r}-${k}`} d={`M ${k * 200 + (r % 2) * 100} ${r * 170 + 40} l 26 34 l -26 34 l -26 -34 Z`} fill={WALL_D} />
      )),
    )}
    {[150, 930].map((x, i) => {
      const fl = Math.sin(f / 3 + i * 2) * 4;
      return (
        <g key={x}>
          <circle cx={x} cy={560} r={150 + fl * 3} fill="#FFD27A" opacity={0.16} />
          <rect x={x - 18} y={580} width={36} height={140} fill="#F7EBD0" stroke={INK} strokeWidth={5} />
          <path d={`M ${x} ${528 + fl} Q ${x + 18} 560 ${x} 580 Q ${x - 18} 560 ${x} ${528 + fl} Z`} fill="#FFB238" stroke={INK} strokeWidth={4} />
          <rect x={x - 50} y={716} width={100} height={20} rx={8} fill={GOLD} stroke={INK} strokeWidth={5} />
        </g>
      );
    })}
    <rect x={0} y={table} width={1080} height={1920 - table} fill={CLOTH} />
    <path d={`M 0 ${table} L 1080 ${table}`} stroke={INK} strokeWidth={7} />
    <path d={`M 0 ${table + 40} L 1080 ${table + 40}`} stroke="#D9CDB2" strokeWidth={6} />
  </>
);

const Crown: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 L -80 -70 L -40 -30 L 0 -90 L 40 -30 L 80 -70 L 70 0 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={-36} r={12} fill="#C0201A" stroke={INK} strokeWidth={4} />
  </g>
);

// the king, seated in the shadows behind, watching (eyes glint)
const King: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const blink = f % 70 > 66;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-170} y={-520} width={340} height={600} rx={40} fill="#3A1216" stroke={INK} strokeWidth={6} />
      <path d="M -140 -200 Q 0 -260 140 -200 L 160 80 L -160 80 Z" fill="#4B2A6B" stroke={INK} strokeWidth={6} />
      <path d="M -150 -190 Q -110 -170 -90 -120 L -90 80 M 150 -190 Q 110 -170 90 -120 L 90 80" stroke="#F4ECDA" strokeWidth={22} fill="none" />
      <ellipse cx={0} cy={-300} rx={80} ry={90} fill={SKIN_D} stroke={INK} strokeWidth={6} />
      <path d="M -70 -260 Q 0 -150 70 -260 Q 40 -220 0 -222 Q -40 -220 -70 -260 Z" fill="#7A5A3A" stroke={INK} strokeWidth={4} />
      {blink ? (
        <path d="M -42 -310 l 24 0 M 18 -310 l 24 0" stroke={INK} strokeWidth={6} />
      ) : (
        <>
          <circle cx={-30} cy={-310} r={10} fill={INK} />
          <circle cx={30} cy={-310} r={10} fill={INK} />
          <circle cx={-26} cy={-314} r={3} fill="#FFFFFF" />
          <circle cx={34} cy={-314} r={3} fill="#FFFFFF" />
        </>
      )}
      <path d="M -50 -340 L -14 -330 M 50 -340 L 14 -330" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <Crown x={0} y={-370} s={1} />
    </g>
  );
};

// The taster: waist-up, big, facing left, Tudor doublet + ruff + feathered cap. Origin = belt centre.
// t = spoon lift 0 (at plate) .. 1 (in mouth); look = pupil shift (-1 left .. 1 right); sweat = 0..1
export const Taster: React.FC<{ x: number; y: number; s?: number; f: number; t?: number; look?: number; sweat?: number; chew?: boolean; spoon?: boolean }> = ({ x, y, s = 1, f, t = 0, look = 0, sweat = 0, chew = false, spoon = true }) => {
  const breathe = Math.sin(f / 14) * 3;
  const bx = interpolate(t, [0, 1], [-330, -96]);
  const by = interpolate(t, [0, 1], [-170, -452]);
  const hx = bx - 120;
  const hy = by + 60;
  const sx = -110;
  const sy = -340;
  const ex = (sx + hx) / 2 + 30;
  const ey = Math.max(sy, hy) + 80;
  const mouthOpen = chew ? 6 + Math.abs(Math.sin(f / 3)) * 10 : interpolate(t, [0.7, 0.95], [6, 24], clamp);
  const px = look * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* back arm */}
        <path d="M 110 -340 Q 170 -220 130 -90" stroke={DOUBLET} strokeWidth={74} fill="none" strokeLinecap="round" />
        <circle cx={128} cy={-78} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* doublet with slashes + buttons */}
        <path d="M -140 -385 Q 0 -420 140 -385 L 150 520 L -150 520 Z" fill={DOUBLET} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-90, -40, 40, 90].map((k) => (
          <path key={k} d={`M ${k} -320 l 0 120`} stroke="#E9C46A" strokeWidth={14} strokeLinecap="round" opacity={0.85} />
        ))}
        <path d="M 0 -390 L 0 520" stroke={DOUBLET_HI} strokeWidth={14} />
        {[-300, -220, -140, -60, 20, 100].map((k) => (
          <circle key={k} cx={0} cy={k} r={11} fill={GOLD} stroke={INK} strokeWidth={4} />
        ))}
        <rect x={-150} y={10} width={300} height={44} fill="#3A2416" stroke={INK} strokeWidth={6} />
        <rect x={-28} y={6} width={56} height={52} rx={6} fill={GOLD} stroke={INK} strokeWidth={5} />
        {/* neck + ruff */}
        <rect x={-34} y={-440} width={68} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-398} rx={150} ry={42} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        {new Array(12).fill(0).map((_, k) => (
          <path key={k} d={`M ${-140 + k * 25} -420 q 6 22 0 44`} stroke="#C9C2B4" strokeWidth={4} fill="none" />
        ))}
        {/* head (3/4, looking left) */}
        <ellipse cx={-6} cy={-505} rx={92} ry={100} fill={SKIN} stroke={INK} strokeWidth={7} />
        <ellipse cx={74} cy={-500} rx={18} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M -92 -505 Q -124 -482 -96 -462" fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* eyes: whites + pupils that dart */}
        <ellipse cx={-56} cy={-522} rx={17} ry={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <ellipse cx={8} cy={-522} rx={17} ry={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={-60 + px} cy={-521} r={8} fill={INK} />
        <circle cx={4 + px} cy={-521} r={8} fill={INK} />
        <path d={`M -80 ${-552 - sweat * 8} L -38 -544 M -14 -546 L 28 ${-556 - sweat * 8}`} stroke={HAIR} strokeWidth={10} strokeLinecap="round" />
        {/* mouth */}
        <ellipse cx={-46} cy={-452} rx={16} ry={mouthOpen / 2} fill="#5A1A1A" stroke={INK} strokeWidth={4} />
        {/* sweat drops */}
        {sweat > 0 ? (
          <>
            <path d={`M 40 ${-560 + ((f * 3) % 60) * sweat} q -12 18 0 26 q 12 -8 0 -26 Z`} fill="#BFE6FF" stroke={INK} strokeWidth={3} opacity={sweat} />
            <path d={`M -70 ${-590 + ((f * 2 + 30) % 50) * sweat} q -10 15 0 22 q 10 -7 0 -22 Z`} fill="#BFE6FF" stroke={INK} strokeWidth={3} opacity={sweat} />
          </>
        ) : null}
        {/* hair + flat feathered cap */}
        <path d="M -96 -540 Q -80 -610 0 -606 Q 80 -606 92 -520 Q 60 -570 0 -568 Q -60 -570 -96 -540 Z" fill={HAIR} stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-600} rx={130} ry={34} fill="#1E1A22" stroke={INK} strokeWidth={6} />
        <path d="M 60 -620 Q 160 -700 200 -640 Q 150 -650 90 -604 Z" fill="#F4ECDA" stroke={INK} strokeWidth={5} />
        {/* front arm + spoon */}
        <path d={`M ${sx} ${sy} Q ${ex - 40} ${ey} ${ex} ${ey}`} stroke={DOUBLET} strokeWidth={76} fill="none" strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={60} strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={DOUBLET_HI} strokeWidth={48} strokeLinecap="round" />
        {spoon ? (
          <g>
            <path d={`M ${hx} ${hy} L ${bx} ${by}`} stroke={INK} strokeWidth={16} strokeLinecap="round" />
            <path d={`M ${hx} ${hy} L ${bx} ${by}`} stroke="#E6E9EE" strokeWidth={9} strokeLinecap="round" />
            <ellipse cx={bx} cy={by} rx={30} ry={18} fill="#E6E9EE" stroke={INK} strokeWidth={5} />
            {t < 0.92 ? <ellipse cx={bx} cy={by - 6} rx={20} ry={9} fill="#8C5A2B" /> : null}
          </g>
        ) : null}
        <circle cx={hx} cy={hy} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
      </g>
    </g>
  );
};

// a gold platter with food; poison = 0..1 green glow
const Platter: React.FC<{ x: number; y: number; s?: number; f: number; poison?: number; mushrooms?: boolean }> = ({ x, y, s = 1, f, poison = 0, mushrooms = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={20} rx={230} ry={56} fill="#000" opacity={0.15} />
    <ellipse cx={0} cy={0} rx={220} ry={60} fill={GOLD} stroke={INK} strokeWidth={7} />
    <ellipse cx={0} cy={-4} rx={170} ry={40} fill={GOLD_D} />
    {mushrooms
      ? [-110, -40, 30, 100, -70, 60].map((mx, i) => (
          <g key={i} transform={`translate(${mx} ${i > 3 ? -40 : -14})`}>
            <rect x={-12} y={-10} width={24} height={34} rx={8} fill="#F4ECDA" stroke={INK} strokeWidth={4} />
            <path d="M -46 -6 Q -40 -60 0 -62 Q 40 -60 46 -6 Z" fill="#B5652F" stroke={INK} strokeWidth={5} />
            <circle cx={-16} cy={-30} r={7} fill="#F4ECDA" />
            <circle cx={14} cy={-40} r={6} fill="#F4ECDA" />
          </g>
        ))
      : (
          <>
            <ellipse cx={-30} cy={-34} rx={110} ry={46} fill="#B5652F" stroke={INK} strokeWidth={6} />
            <path d="M -110 -40 Q -30 -90 60 -50" stroke="#D88A4A" strokeWidth={10} fill="none" />
            <circle cx={110} cy={-30} r={28} fill="#6FA34A" stroke={INK} strokeWidth={5} />
            <circle cx={-140} cy={-18} r={22} fill="#C0201A" stroke={INK} strokeWidth={5} />
          </>
        )}
    {poison > 0 ? (
      <>
        <ellipse cx={0} cy={-40} rx={200} ry={70} fill={POISON} opacity={0.18 * poison + Math.sin(f / 4) * 0.05 * poison} />
        {[0, 1, 2].map((k) => {
          const p = ((f + k * 9) % 27) / 27;
          return <path key={k} d={`M ${-80 + k * 80} ${-60 - p * 160} q 20 -20 0 -40 q -20 -20 0 -40`} stroke={POISON} strokeWidth={8} fill="none" opacity={(1 - p) * poison} strokeLinecap="round" />;
        })}
      </>
    ) : null}
  </g>
);

// a young woman (1940s rolled hair, blouse) seated behind the table; origin = table edge under her
const Woman: React.FC<{ x: number; y: number; s?: number; f: number; blouse: string; hair: string; o?: number; phase?: number }> = ({ x, y, s = 1, f, blouse, hair, o = 1, phase = 0 }) => {
  const bite = Math.max(0, Math.sin(f / 7 + phase));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M -95 0 Q -100 -170 0 -180 Q 100 -170 95 0 Z" fill={blouse} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -30 -178 L 0 -140 L 30 -178" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      <rect x={-20} y={-215} width={40} height={40} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <ellipse cx={0} cy={-270} rx={62} ry={70} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -66 -270 Q -70 -350 0 -350 Q 70 -350 66 -270 Q 50 -320 0 -318 Q -50 -320 -66 -270 Z" fill={hair} stroke={INK} strokeWidth={5} />
      <circle cx={-62} cy={-300} r={22} fill={hair} stroke={INK} strokeWidth={5} />
      <circle cx={62} cy={-300} r={22} fill={hair} stroke={INK} strokeWidth={5} />
      <circle cx={-22} cy={-276} r={7} fill={INK} />
      <circle cx={22} cy={-276} r={7} fill={INK} />
      <path d="M -36 -296 L -10 -292 M 36 -296 L 10 -292" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={0} cy={-238} rx={12} ry={3 + bite * 6} fill="#7A2A2A" />
      {/* forearms on the table, fork lifting */}
      <path d="M -80 -60 L -30 -10" stroke={blouse} strokeWidth={40} strokeLinecap="round" />
      <path d={`M 80 -60 L 40 ${-40 - bite * 120}`} stroke={blouse} strokeWidth={40} strokeLinecap="round" />
      <circle cx={40} cy={-40 - bite * 120} r={18} fill={SKIN} stroke={INK} strokeWidth={4} />
      <path d={`M 40 ${-40 - bite * 120} L 20 ${-90 - bite * 120}`} stroke="#9AA1AB" strokeWidth={7} strokeLinecap="round" />
    </g>
  );
};

const Chair: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-330} width={160} height={330} rx={12} fill="#8A6A48" stroke={INK} strokeWidth={6} />
    <rect x={-56} y={-300} width={112} height={60} rx={8} fill="#6E5236" />
  </g>
);

const Barracks: React.FC<{ table: number }> = ({ table }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#8F9A84" />
    {new Array(14).fill(0).map((_, k) => (
      <path key={k} d={`M ${k * 80} 0 L ${k * 80} ${table}`} stroke="#77826D" strokeWidth={6} />
    ))}
    <rect x={360} y={420} width={360} height={300} fill="#2E4A3A" stroke={INK} strokeWidth={8} />
    {[0, 1, 2, 3, 4].map((k) => (
      <path key={k} d={`M ${390 + k * 70} 720 L ${420 + k * 70} 520 L ${450 + k * 70} 720 Z`} fill="#1F3529" />
    ))}
    <path d="M 540 420 L 540 720 M 360 570 L 720 570" stroke="#E6E1D3" strokeWidth={10} />
    <rect x={0} y={table} width={1080} height={1920 - table} fill={CLOTH} />
    <path d={`M 0 ${table} L 1080 ${table}`} stroke={INK} strokeWidth={7} />
  </>
);

// a mid-century credenza in a modern living room
const LivingRoom: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#E3D3B8" />
    <rect x={0} y={1420} width={1080} height={500} fill="#B9875A" />
    <path d="M 0 1420 L 1080 1420" stroke={INK} strokeWidth={7} />
    {/* framed art */}
    <rect x={380} y={520} width={320} height={230} fill="#F4ECDA" stroke={INK} strokeWidth={8} />
    <circle cx={480} cy={640} r={60} fill="#E58A4E" />
    <rect x={540} y={590} width={110} height={110} fill="#2E7D7A" />
    {/* lamp */}
    <path d="M 170 1060 L 230 920 L 330 920 L 390 1060 Z" fill="#F2C35B" stroke={INK} strokeWidth={6} />
    <circle cx={280} cy={1100} r={180} fill="#FFE6A8" opacity={0.18 + Math.sin(f / 20) * 0.03} />
    {/* the credenza */}
    <rect x={110} y={1080} width={860} height={260} rx={14} fill="#8A5530" stroke={INK} strokeWidth={8} />
    {[0, 1, 2, 3].map((k) => (
      <g key={k}>
        <rect x={130 + k * 207} y={1100} width={195} height={220} rx={6} fill={k % 2 ? "#9C6339" : "#7C4B29"} stroke={INK} strokeWidth={5} />
        <rect x={k % 2 ? 140 + k * 207 : 300 + k * 207} y={1190} width={14} height={50} rx={6} fill={GOLD} stroke={INK} strokeWidth={3} />
      </g>
    ))}
    <path d="M 170 1340 L 140 1440 M 910 1340 L 940 1440 M 400 1340 L 390 1420 M 680 1340 L 690 1420" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    {/* things on top: TV, plant, record player */}
    <rect x={430} y={860} width={360} height={210} rx={10} fill="#1B1712" stroke={INK} strokeWidth={7} />
    <rect x={446} y={876} width={328} height={178} fill="#2B3E52" />
    <path d="M 470 900 L 560 900" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} />
    <rect x={590} y={1070} width={40} height={14} fill="#1B1712" />
    <rect x={170} y={1000} width={90} height={80} rx={8} fill="#C9564A" stroke={INK} strokeWidth={5} />
    {[-40, 0, 40].map((a) => (
      <ellipse key={a} cx={215} cy={950} rx={18} ry={60} fill="#5E9E5A" stroke={INK} strokeWidth={4} transform={`rotate(${a + Math.sin(f / 15) * 3} 215 1000)`} />
    ))}
    <rect x={820} y={1030} width={130} height={50} rx={6} fill="#D8D2C4" stroke={INK} strokeWidth={5} />
    <ellipse cx={885} cy={1030} rx={50} ry={12} fill="#1B1712" transform={`rotate(${f * 4} 885 1030)`} />
  </>
);

// the old sideboard where the servant tasted (sepia scene before the reveal)
const OldSideboard: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={110} y={1080} width={860} height={340} rx={10} fill={WOOD} stroke={INK} strokeWidth={8} />
    {[0, 1, 2].map((k) => (
      <g key={k}>
        <rect x={140 + k * 275} y={1110} width={250} height={280} rx={8} fill="#6A3F22" stroke={INK} strokeWidth={5} />
        <path d={`M ${265 + k * 275} 1140 l 40 110 l -40 110 l -40 -110 Z`} fill="#83512D" stroke={INK} strokeWidth={4} />
      </g>
    ))}
    {[260, 480, 820].map((gx, i) => (
      <g key={gx} transform={`translate(${gx} 1080)`}>
        <path d="M -40 -120 L 40 -120 Q 40 -50 0 -40 Q -40 -50 -40 -120 Z" fill={GOLD} stroke={INK} strokeWidth={5} />
        <rect x={-6} y={-40} width={12} height={30} fill={GOLD} stroke={INK} strokeWidth={4} />
        <rect x={-30} y={-12} width={60} height={12} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
        {i === 1 ? <circle cx={0} cy={-150 - Math.sin(f / 5) * 6} r={8} fill={POISON} opacity={0.7} /> : null}
      </g>
    ))}
  </>
);

// watchers' eyes glinting in the dark around the edges
const Eyes: React.FC<{ f: number; dur: number }> = ({ f, dur }) => {
  const spots: [number, number][] = [[120, 380], [930, 300], [80, 900], [990, 820], [160, 1450], [920, 1400], [540, 230]];
  return (
    <>
      {spots.map(([x, y], i) => {
        const at = 3 + i * Math.max(3, (dur * 0.6) / spots.length);
        const o = interpolate(f, [at, at + 4], [0, 1], clamp);
        const blink = (f + i * 13) % 50 > 47;
        return (
          <g key={i} opacity={o}>
            {blink ? (
              <path d={`M ${x - 40} ${y} l 30 0 M ${x + 10} ${y} l 30 0`} stroke="#FFF1C9" strokeWidth={5} />
            ) : (
              <>
                <ellipse cx={x - 25} cy={y} rx={18} ry={11} fill="#FFF1C9" />
                <ellipse cx={x + 25} cy={y} rx={18} ry={11} fill="#FFF1C9" />
                <circle cx={x - 25 + (x < 540 ? 6 : -6)} cy={y} r={7} fill={INK} />
                <circle cx={x + 25 + (x < 540 ? 6 : -6)} cy={y} r={7} fill={INK} />
              </>
            )}
          </g>
        );
      })}
    </>
  );
};

export const FoodTaster: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "taste";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  let showFloats = true;
  let sky: "day" | "night" = "day";

  if (mode === "taste") {
    // frame 0: the spoon is already half-way up; it reaches the mouth at ~frame 20; the platter glows faintly
    const t = interpolate(f, [0, 20], [0.45, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const pulse = 1 + Math.max(0, Math.sin(f / 4.5)) * 0.04;
    body = (
      <>
        <Hall f={f} table={1420} />
        <King x={230} y={1300} s={0.85} f={f} />
        <g transform={`translate(540 960) scale(${pulse}) translate(-540 -960)`}>
          <Taster x={640} y={1700} s={1.6} f={f} t={t} look={-0.6} />
        </g>
        <Platter x={300} y={1560} s={1.05} f={f} poison={0.6} />
      </>
    );
  } else if (mode === "watch") {
    // close-up: he chews, freezes, sweats; eyes appear in the dark all around
    const chew = f < dur * 0.4;
    const sweat = interpolate(f, [dur * 0.35, dur * 0.6], [0, 1], clamp);
    const look = f < dur * 0.4 ? 0 : Math.sin(f / 5) > 0 ? -1 : 1;
    body = (
      <>
        <Hall f={f} table={1900} />
        <Taster x={600} y={2050} s={2.3} f={f} t={0} spoon={false} chew={chew} sweat={sweat} look={look} />
        <defs>
          <radialGradient id="ep034vig" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0.45" stopColor="#000" stopOpacity={0} />
            <stop offset="1" stopColor="#000" stopOpacity={0.85} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep034vig)" />
        <Eyes f={f} dur={dur} />
      </>
    );
  } else if (mode === "mushroom") {
    // close-up: a plate of mushrooms; the taster's green sleeve tips a vial over it
    const tip = interpolate(f, [4, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const poison = interpolate(f, [14, 30], [0, 1], clamp);
    body = (
      <>
        <Hall f={f} table={1150} />
        <Platter x={500} y={1500} s={2.0} f={f} poison={poison} mushrooms />
        <g transform={`translate(820 900) rotate(${-20 - tip * 70})`}>
          <path d="M 300 60 L 60 20" stroke={INK} strokeWidth={96} strokeLinecap="round" />
          <path d="M 300 60 L 60 20" stroke={DOUBLET} strokeWidth={84} strokeLinecap="round" />
          <circle cx={40} cy={18} r={44} fill={SKIN} stroke={INK} strokeWidth={6} />
          <rect x={-90} y={-6} width={110} height={48} rx={18} fill="#BFE6D0" stroke={INK} strokeWidth={6} opacity={0.95} />
          <rect x={-120} y={4} width={34} height={28} rx={6} fill="#8A5A34" stroke={INK} strokeWidth={5} />
        </g>
        {tip >= 1
          ? [0, 1, 2, 3].map((k) => {
              const p = ((f + k * 6) % 24) / 24;
              return <circle key={k} cx={640 - k * 18} cy={980 + p * 420} r={14} fill={POISON} stroke={INK} strokeWidth={3} opacity={1 - p * 0.3} />;
            })
          : null}
      </>
    );
  } else if (mode === "women") {
    // barracks table: young women tasting; after fadeAt the others vanish, leaving empty chairs and one woman
    const fadeAt = (v.fadeAt ?? 2) * dur;
    const others = interpolate(f, [fadeAt, fadeAt + 12], [1, 0], clamp);
    const people = [
      { x: 150, blouse: "#7E95B8", hair: "#3A2618", ph: 0 },
      { x: 345, blouse: "#C9A2D8", hair: "#8A5A34", ph: 2 },
      { x: 735, blouse: "#E58A4E", hair: "#2A1E16", ph: 4 },
      { x: 930, blouse: "#9CC9CF", hair: "#B5852F", ph: 1 },
    ];
    body = (
      <>
        <Barracks table={1380} />
        {people.map((p) => (
          <Chair key={`c${p.x}`} x={p.x} y={1380} s={0.85} />
        ))}
        <Chair x={540} y={1380} s={1.05} />
        {people.map((p) => (
          <Woman key={p.x} x={p.x} y={1380} s={0.85} f={f} blouse={p.blouse} hair={p.hair} phase={p.ph} o={others} />
        ))}
        <Woman x={540} y={1400} s={1.25} f={f} blouse="#F3E6CC" hair="#5A3A22" phase={3} />
        {[150, 345, 540, 735, 930].map((px) => (
          <g key={`p${px}`} transform={`translate(${px} 1470)`}>
            <ellipse cx={0} cy={0} rx={80} ry={22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            <ellipse cx={0} cy={-6} rx={46} ry={12} fill={px === 540 ? "#6FA34A" : "#D88A4A"} />
          </g>
        ))}
      </>
    );
  } else if (mode === "credenza") {
    // sepia: a servant tastes at the old sideboard → flash → today's credenza in your living room
    const answerAt = (v.answerAt ?? 0.45) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f >= answerAt) showFloats = false;
    const flash = interpolate(f, [answerAt - 1, answerAt + 6], [1, 0], clamp);
    const t = interpolate(f, [0, 16], [0.3, 1], clamp);
    body =
      f < answerAt ? (
        <g style={{ filter: "sepia(0.85)" }}>
          <Hall f={f} table={1420} />
          <OldSideboard f={f} />
          <Taster x={760} y={1500} s={0.95} f={f} t={t} look={-1} />
        </g>
      ) : (
        <>
          <LivingRoom f={f} />
          {v.ghostAt != null ? (
            <g opacity={interpolate(f, [v.ghostAt * dur, v.ghostAt * dur + 10], [0, 0.6], clamp)} style={{ filter: "sepia(1)" }}>
              <defs>
                <clipPath id="ep034ghost">
                  <rect x={0} y={0} width={1080} height={1082} />
                </clipPath>
              </defs>
              <g clipPath="url(#ep034ghost)">
                <Taster x={330} y={1160} s={0.62} f={f} t={interpolate(f, [v.ghostAt * dur, v.ghostAt * dur + 16], [0.3, 1], clamp)} look={-1} />
              </g>
            </g>
          ) : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {mode === "credenza" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.45) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 230} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag && (mode !== "credenza" || f >= (v.answerAt ?? 0.45) * dur) ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      {showFloats ? <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 300} /> : null}
    </Backdrop>
  );
};
