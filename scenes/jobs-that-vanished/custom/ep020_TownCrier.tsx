import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep020 Town crier – the bellman in tricorn and red coat who shouted the news (good or bad) at the market square.
// visual: { mode: "square" | "crown" | "oyez" | "tax" | "gallows" | "court", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, answer?, answerAccent?, answerAt? (court), oyezAt? (oyez), sealAt? (crown) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const RED = "#CC3A2C";
const RED_D = "#9A2A20";
const GOLD = "#F0B93A";
const GOLD_D = "#B8861E";
const SKIN = "#EDB98E";
const SKIN_D = "#CF9670";
const WIG = "#EEE8DC";
const HAT = "#1C1A1E";
const BRASS = "#E2AE3C";
const BRASS_D = "#A87A1E";
const BRASS_HI = "#FFF0B8";
const WOOD = "#7A4F2C";
const PARCH = "#F6E7C4";
const BREECH = "#F1E8D4";
const COBBLE = "#B4A48A";
const COBBLE_D = "#9A8B72";
const MOB_SKIN = ["#EDB98E", "#D9A07A", "#C68B63", "#F1C9A5", "#B97D58"];
const MOB_COAT = ["#5E7A8C", "#7D6A55", "#4F6B4A", "#8A5A3A", "#6B5B7A", "#A0703C"];

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 330 }) => (
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

// brass handbell, origin = the grip on the handle; bell mouth points down (+y)
export const HandBell: React.FC<{ x: number; y: number; s?: number; rot?: number; f: number }> = ({ x, y, s = 1, rot = 0, f }) => {
  const clap = Math.sin(f / 2.2) * 28;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-17} y={-80} width={34} height={124} rx={13} fill={WOOD} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-84} r={22} fill={WOOD} stroke={INK} strokeWidth={6} />
      <circle cx={clap} cy={214} r={22} fill={BRASS_D} stroke={INK} strokeWidth={5} />
      <path d="M -36 40 Q -46 120 -100 196 L 100 196 Q 46 120 36 40 Z" fill={BRASS} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={0} cy={196} rx={104} ry={24} fill={BRASS_D} stroke={INK} strokeWidth={7} />
      <path d="M -18 62 Q -30 124 -66 180" stroke={BRASS_HI} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.9} />
      <rect x={-42} y={34} width={84} height={16} rx={7} fill={BRASS_D} stroke={INK} strokeWidth={5} />
    </g>
  );
};

// "CLANG!" sound burst lines around a point; p = 0..1 life of one burst
const Clang: React.FC<{ x: number; y: number; p: number; text?: string; size?: number; rot?: number }> = ({ x, y, p, text = "CLANG!", size = 92, rot = -8 }) => {
  if (p <= 0 || p >= 1) return null;
  const sc = interpolate(p, [0, 0.25], [0.4, 1.1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const op = interpolate(p, [0.6, 1], [1, 0], clamp);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={op}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
        const a = (k / 8) * Math.PI * 2;
        return <path key={k} d={`M ${Math.cos(a) * 120} ${Math.sin(a) * 70} L ${Math.cos(a) * 190} ${Math.sin(a) * 110}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />;
      })}
      <text x={0} y={size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={GOLD} stroke={INK} strokeWidth={8} paintOrder="stroke">
        {text}
      </text>
    </g>
  );
};

// The crier, full length, facing the viewer. Origin = between the feet. Height ≈ 940 units.
// shout 0..1 (mouth), bell: "up" (arm raised, bell swinging) | "side" | "none", bellRot (deg), bellS,
// scroll: "none" | "short" | "long" (left hand), scrollText
export const Crier: React.FC<{
  x: number; y: number; s?: number; f: number; shout?: number; bell?: "up" | "side" | "none"; bellRot?: number; bellS?: number;
  scroll?: "none" | "short" | "long"; scrollText?: string; coat?: string; coatD?: string;
}> = ({ x, y, s = 1, f, shout = 0, bell = "up", bellRot = 0, bellS = 1, scroll = "short", scrollText, coat = RED, coatD = RED_D }) => {
  const bob = Math.sin(f / 14) * 3;
  const hand: [number, number] = bell === "up" ? [255, -905] : [225, -430];
  const elbow: [number, number] = bell === "up" ? [265, -705] : [215, -540];
  const sh: [number, number] = [140, -640];
  const sHand: [number, number] = [-175, -560];
  const paperLen = scroll === "long" ? 420 : 250;
  const mouthRy = 6 + 26 * shout;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={28} fill="#000" opacity={0.2} />
      <g transform={`translate(0 ${bob})`}>
        {/* coat back panel */}
        <path d="M -150 -660 Q -205 -440 -238 -200 L 238 -200 Q 205 -440 150 -660 Z" fill={coatD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {/* stockings, boots */}
        <rect x={-95} y={-340} width={62} height={250} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <rect x={33} y={-340} width={62} height={250} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <path d="M -108 -130 L -24 -130 L -20 -10 Q -60 4 -130 -6 Q -134 -40 -108 -60 Z" fill="#1A1614" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 108 -130 L 24 -130 L 20 -10 Q 60 4 130 -6 Q 134 -40 108 -60 Z" fill="#1A1614" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-84} y={-52} width={34} height={22} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
        <rect x={50} y={-52} width={34} height={22} rx={4} fill={GOLD} stroke={INK} strokeWidth={4} />
        {/* breeches */}
        <path d="M -112 -440 L 112 -440 L 102 -310 L 16 -310 L 0 -370 L -16 -310 L -102 -310 Z" fill={BREECH} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {/* waistcoat */}
        <path d="M -50 -655 L 50 -655 L 76 -400 L 0 -378 L -76 -400 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={0} cy={-620 + k * 52} r={8} fill={GOLD_D} stroke={INK} strokeWidth={3} />)}
        {/* coat front panels with gold braid */}
        <path d="M -150 -662 Q -195 -440 -232 -205 L -112 -214 Q -78 -420 -46 -652 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 150 -662 Q 195 -440 232 -205 L 112 -214 Q 78 -420 46 -652 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -46 -652 Q -78 -420 -112 -214 L -232 -205 M 46 -652 Q 78 -420 112 -214 L 232 -205" stroke={GOLD} strokeWidth={13} fill="none" strokeLinejoin="round" />
        {[0, 1, 2, 3].map((k) => <circle key={k} cx={-62 - k * 10} cy={-600 + k * 90} r={9} fill={GOLD} stroke={INK} strokeWidth={3} />)}
        {/* collar + jabot + neck */}
        <rect x={-30} y={-722} width={60} height={50} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -150 -662 Q -100 -700 -40 -690 L -46 -652 Z M 150 -662 Q 100 -700 40 -690 L 46 -652 Z" fill={coatD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -30 -690 L 30 -690 L 22 -598 Q 0 -580 -22 -598 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -16 -660 Q 0 -650 16 -660 M -18 -630 Q 0 -620 18 -630" stroke="#C9C2B4" strokeWidth={4} fill="none" />
        {/* scroll arm (viewer's left) */}
        {scroll !== "none" ? (
          <>
            <path d={`M -140 -640 Q -232 -600 ${sHand[0]} ${sHand[1]}`} stroke={INK} strokeWidth={76} fill="none" strokeLinecap="round" />
            <path d={`M -140 -640 Q -232 -600 ${sHand[0]} ${sHand[1]}`} stroke={coat} strokeWidth={62} fill="none" strokeLinecap="round" />
            <rect x={sHand[0] - 150} y={sHand[1] - 8} width={300} height={paperLen} fill={PARCH} stroke={INK} strokeWidth={6} />
            {scrollText ? (
              <text x={sHand[0]} y={sHand[1] + 110} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={C.brick}>
                {scrollText}
              </text>
            ) : null}
            {[0, 1, 2, 3, 4, 5, 6].filter((k) => 60 + k * 32 < paperLen - 30 && (!scrollText || k > 3)).map((k) => (
              <path key={k} d={`M ${sHand[0] - 110} ${sHand[1] + 50 + k * 32} L ${sHand[0] + 90 - (k % 3) * 30} ${sHand[1] + 50 + k * 32}`} stroke="#8A7552" strokeWidth={8} strokeLinecap="round" />
            ))}
            <rect x={sHand[0] - 168} y={sHand[1] + paperLen - 22} width={336} height={34} rx={17} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
            <rect x={sHand[0] - 168} y={sHand[1] - 26} width={336} height={34} rx={17} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
            <rect x={sHand[0] - 40} y={sHand[1] - 34} width={80} height={52} rx={14} fill={GOLD} stroke={INK} strokeWidth={5} />
            <circle cx={sHand[0]} cy={sHand[1] - 6} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
          </>
        ) : null}
        {/* head with powdered side curls */}
        <ellipse cx={0} cy={-790} rx={80} ry={88} fill={SKIN} stroke={INK} strokeWidth={7} />
        {[[-80, -786, 26], [-76, -742, 22], [80, -786, 26], [76, -742, 22]].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={WIG} stroke={INK} strokeWidth={5} />
        ))}
        <circle cx={-44} cy={-768} r={16} fill="#E88B7A" opacity={0.45} />
        <circle cx={44} cy={-768} r={16} fill="#E88B7A" opacity={0.45} />
        <circle cx={-28} cy={-800} r={10} fill={INK} />
        <circle cx={28} cy={-800} r={10} fill={INK} />
        <path d={`M -54 ${-830 - shout * 6} L -12 -818 M 12 -818 L 54 ${-830 - shout * 6}`} stroke="#6E6A62" strokeWidth={11} strokeLinecap="round" />
        <path d="M 0 -798 Q 14 -774 0 -766" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        {shout > 0.05 ? (
          <>
            <ellipse cx={0} cy={-740 + mouthRy * 0.3} rx={22 + 12 * shout} ry={mouthRy} fill="#7A1E1A" stroke={INK} strokeWidth={5} />
            <ellipse cx={0} cy={-740 + mouthRy * 0.9} rx={12 + 6 * shout} ry={mouthRy * 0.35} fill="#E06A6A" />
          </>
        ) : (
          <path d="M -20 -742 Q 0 -732 20 -742" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
        {/* tricorn hat with gold braid */}
        <path d="M -92 -856 Q -84 -940 0 -946 Q 84 -940 92 -856 Z" fill={HAT} stroke={INK} strokeWidth={6} />
        <path d="M -182 -872 Q -100 -846 0 -828 Q 100 -846 182 -872 Q 156 -912 124 -948 Q 60 -900 0 -906 Q -60 -900 -124 -948 Q -156 -912 -182 -872 Z" fill={HAT} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -182 -872 Q -156 -912 -124 -948 Q -60 -900 0 -906 Q 60 -900 124 -948 Q 156 -912 182 -872" stroke={GOLD} strokeWidth={11} fill="none" strokeLinejoin="round" />
        <path d="M -182 -872 Q -100 -846 0 -828 Q 100 -846 182 -872" stroke={GOLD} strokeWidth={7} fill="none" />
        <circle cx={-118} cy={-890} r={18} fill={coat} stroke={GOLD} strokeWidth={6} />
        {/* bell arm (viewer's right) */}
        {bell !== "none" ? (
          <>
            <path d={`M ${sh[0]} ${sh[1]} Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={76} fill="none" strokeLinecap="round" />
            <path d={`M ${sh[0]} ${sh[1]} Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={coat} strokeWidth={62} fill="none" strokeLinecap="round" />
            <HandBell x={hand[0]} y={hand[1]} s={bellS} rot={bellRot} f={f} />
            <rect x={hand[0] - 42} y={hand[1] + 14} width={84} height={40} rx={14} fill={GOLD} stroke={INK} strokeWidth={5} />
            <circle cx={hand[0]} cy={hand[1]} r={32} fill={SKIN} stroke={INK} strokeWidth={6} />
          </>
        ) : null}
      </g>
    </g>
  );
};

// one angry townsperson, head + shoulders (front), origin = bottom centre. calm 0..1 lowers the fist + widens the eyes.
const Mob: React.FC<{ x: number; y: number; s?: number; f: number; i: number; calm?: number; back?: boolean; fist?: boolean; turn?: number }> = ({ x, y, s = 1, f, i, calm = 0, back = false, fist = true, turn = 0 }) => {
  const skin = MOB_SKIN[i % MOB_SKIN.length];
  const coat = MOB_COAT[i % MOB_COAT.length];
  const hat = ["cap", "none", "bonnet", "cap", "none", "hood"][i % 6];
  const shake = Math.sin(f / 2.6 + i * 1.7) * 18 * (1 - calm);
  const side = i % 2 ? 1 : -1;
  const fx = side * (120 + 10 * calm);
  const fy = interpolate(calm, [0, 1], [-330 + shake, -120]);
  const hair = ["#3A2618", "#6B4A2E", "#1F1A17", "#9A7A4A", "#4A3A30"][i % 5];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {fist ? (
        <>
          <path d={`M ${side * 70} -150 Q ${side * 150} -200 ${fx} ${fy}`} stroke={INK} strokeWidth={52} fill="none" strokeLinecap="round" />
          <path d={`M ${side * 70} -150 Q ${side * 150} -200 ${fx} ${fy}`} stroke={coat} strokeWidth={40} fill="none" strokeLinecap="round" />
          <circle cx={fx} cy={fy - 8} r={30} fill={skin} stroke={INK} strokeWidth={6} />
        </>
      ) : null}
      <path d="M -120 10 Q -118 -168 0 -178 Q 118 -168 120 10 Z" fill={coat} stroke={INK} strokeWidth={6} />
      <rect x={-24} y={-200} width={48} height={40} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-255} r={68} fill={back ? hair : skin} stroke={INK} strokeWidth={6} />
      {!back ? (
        <g transform={`translate(${turn * 20} 0)`}>
          <circle cx={-22} cy={-262} r={7 + calm * 4} fill={calm > 0.5 ? "#FFFFFF" : INK} stroke={INK} strokeWidth={calm > 0.5 ? 4 : 0} />
          <circle cx={22} cy={-262} r={7 + calm * 4} fill={calm > 0.5 ? "#FFFFFF" : INK} stroke={INK} strokeWidth={calm > 0.5 ? 4 : 0} />
          {calm > 0.5 ? <><circle cx={-22} cy={-262} r={4} fill={INK} /><circle cx={22} cy={-262} r={4} fill={INK} /></> : null}
          <path d={calm > 0.5 ? "M -38 -292 Q -22 -302 -8 -292 M 8 -292 Q 22 -302 38 -292" : "M -40 -292 L -8 -278 M 8 -278 L 40 -292"} stroke={INK} strokeWidth={7} strokeLinecap="round" fill="none" />
          <ellipse cx={0} cy={-222} rx={calm > 0.5 ? 10 : 20} ry={calm > 0.5 ? 10 : 14 + Math.abs(Math.sin(f / 3 + i)) * 8} fill="#5A1A16" stroke={INK} strokeWidth={4} />
        </g>
      ) : null}
      {hat === "cap" ? <path d="M -70 -280 Q -60 -340 0 -340 Q 60 -340 76 -284 L 100 -276 L -70 -270 Z" fill="#5A4A3A" stroke={INK} strokeWidth={5} /> : null}
      {hat === "bonnet" ? <path d="M -84 -232 Q -96 -340 0 -342 Q 96 -340 84 -232 Q 70 -300 0 -304 Q -70 -300 -84 -232 Z" fill="#F4EAD5" stroke={INK} strokeWidth={5} /> : null}
      {hat === "hood" ? <path d="M -80 -200 Q -100 -340 0 -344 Q 100 -340 80 -200 Q 64 -300 0 -306 Q -64 -300 -80 -200 Z" fill="#7A3A2A" stroke={INK} strokeWidth={5} /> : null}
      {hat === "none" && !back ? <path d="M -66 -280 Q -50 -334 0 -330 Q 50 -334 66 -280 Q 30 -306 0 -300 Q -30 -306 -66 -280 Z" fill={hair} stroke={INK} strokeWidth={5} /> : null}
    </g>
  );
};

const Cobbles: React.FC<{ y0: number; seed: string }> = ({ y0, seed }) => (
  <>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={COBBLE} />
    {new Array(Math.ceil((1920 - y0) / 54)).fill(0).map((_, r) =>
      new Array(11).fill(0).map((__, k) => {
        const sc = 0.6 + (r * 54) / 900;
        const w = 110 * sc;
        const xx = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 8;
        const yy = y0 + r * 54 * sc * 0.9;
        return <rect key={`${r}-${k}`} x={xx} y={yy} width={w - 10} height={46 * sc} rx={15 * sc} fill={(r + k) % 3 ? COBBLE_D : "#C2B398"} stroke={INK} strokeWidth={2.5} opacity={0.9} />;
      }),
    )}
  </>
);

// sunny market square: timber-framed houses, bunting, an inn sign
const Square: React.FC<{ y0: number; f: number; dim?: number }> = ({ y0, f, dim = 0 }) => {
  const houses = [
    { x: -40, w: 260, h: 700, wall: "#F3E3BF", roof: C.brick },
    { x: 220, w: 230, h: 820, wall: "#EBD2A6", roof: "#8E3E2A" },
    { x: 450, w: 250, h: 740, wall: "#F6E9CC", roof: C.brick },
    { x: 700, w: 230, h: 860, wall: "#E8CFA0", roof: "#7E2E22" },
    { x: 930, w: 220, h: 720, wall: "#F3E3BF", roof: C.brick },
  ];
  return (
    <>
      {houses.map((hs, k) => {
        const top = y0 - hs.h;
        return (
          <g key={k}>
            <path d={`M ${hs.x - 14} ${top + 4} L ${hs.x + hs.w / 2} ${top - 170} L ${hs.x + hs.w + 14} ${top + 4} Z`} fill={hs.roof} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
            <rect x={hs.x} y={top} width={hs.w} height={hs.h} fill={hs.wall} stroke={INK} strokeWidth={6} />
            {[0.33, 0.66].map((p) => (
              <path key={p} d={`M ${hs.x} ${top + hs.h * p} L ${hs.x + hs.w} ${top + hs.h * p}`} stroke="#4A3424" strokeWidth={12} />
            ))}
            <path d={`M ${hs.x + 20} ${top + 10} L ${hs.x + hs.w - 20} ${top + hs.h * 0.33 - 6} M ${hs.x + hs.w - 20} ${top + 10} L ${hs.x + 20} ${top + hs.h * 0.33 - 6}`} stroke="#4A3424" strokeWidth={9} />
            {[0.28, 0.72].map((p) => (
              <g key={p}>
                <rect x={hs.x + hs.w * p - 34} y={top + hs.h * 0.4} width={68} height={90} fill={dim > 0.5 ? "#F2C77A" : "#9CC9CF"} stroke={INK} strokeWidth={5} />
                <path d={`M ${hs.x + hs.w * p} ${top + hs.h * 0.4} L ${hs.x + hs.w * p} ${top + hs.h * 0.4 + 90}`} stroke={INK} strokeWidth={4} />
              </g>
            ))}
          </g>
        );
      })}
      {/* inn sign */}
      <path d={`M 470 ${y0 - 560} L 600 ${y0 - 560}`} stroke={INK} strokeWidth={10} />
      <rect x={520} y={y0 - 556} width={90} height={110} rx={8} fill={C.mustard} stroke={INK} strokeWidth={6} transform={`rotate(${Math.sin(f / 16) * 4} 565 ${y0 - 556})`} />
      {/* bunting */}
      <path d={`M 0 ${y0 - 640} Q 540 ${y0 - 520} 1080 ${y0 - 660}`} stroke={INK} strokeWidth={4} fill="none" />
      {new Array(12).fill(0).map((_, k) => {
        const t = (k + 0.5) / 12;
        const bx = t * 1080;
        const by = (1 - t) * (1 - t) * (y0 - 640) + 2 * (1 - t) * t * (y0 - 520) + t * t * (y0 - 660);
        return <path key={k} d={`M ${bx - 26} ${by} L ${bx + 26} ${by} L ${bx} ${by + 50 + Math.sin(f / 6 + k) * 4} Z`} fill={[C.brick, C.mustard, C.teal, C.cream][k % 4]} stroke={INK} strokeWidth={3} />;
      })}
      <Cobbles y0={y0} seed="sq" />
      {dim > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#2A1830" opacity={dim * 0.35} /> : null}
    </>
  );
};

// red wax seal with a crown, slams in; p = 0..1
const Seal: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  if (p <= 0) return null;
  const sc = interpolate(p, [0, 0.3, 0.45], [2.6, 0.92, 1], clamp);
  return (
    <g transform={`translate(${x} ${y}) scale(${sc}) rotate(-8)`} opacity={interpolate(p, [0, 0.1], [0, 1], clamp)}>
      <path d="M -150 0 Q -160 -60 -120 -110 Q -70 -170 0 -160 Q 80 -168 128 -112 Q 168 -50 150 10 Q 150 90 90 132 Q 20 170 -60 140 Q -140 110 -150 0 Z" fill="#B3241C" stroke={INK} strokeWidth={8} />
      <circle cx={0} cy={-6} r={112} fill="none" stroke="#7E1712" strokeWidth={8} />
      <path d="M -78 34 L -88 -54 L -42 -14 L 0 -78 L 42 -14 L 88 -54 L 78 34 Z" fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-80} y={34} width={160} height={30} rx={6} fill={GOLD} stroke={INK} strokeWidth={6} />
      {[-88, 0, 88].map((cx) => <circle key={cx} cx={cx} cy={cx === 0 ? -86 : -60} r={12} fill={GOLD} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};

// empty gallows on a scaffold, origin = scaffold floor right edge area
const Gallows: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const sway = Math.sin(f / 12) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-330} y={-20} width={520} height={50} fill="#6B4527" stroke={INK} strokeWidth={6} />
      {[-300, -100, 140].map((lx) => <rect key={lx} x={lx} y={30} width={34} height={260} fill="#5A3A20" stroke={INK} strokeWidth={5} />)}
      <rect x={90} y={-640} width={46} height={622} fill="#6B4527" stroke={INK} strokeWidth={6} />
      <rect x={-210} y={-664} width={350} height={44} fill="#6B4527" stroke={INK} strokeWidth={6} />
      <path d="M 96 -560 L 30 -626" stroke="#5A3A20" strokeWidth={26} strokeLinecap="round" />
      <path d={`M -150 -620 Q ${-150 + sway} -500 ${-150 + sway * 1.5} -400`} stroke="#C9A66B" strokeWidth={10} fill="none" />
      <ellipse cx={-150 + sway * 1.5} cy={-362} rx={34} ry={42} fill="none" stroke="#C9A66B" strokeWidth={10} />
      {/* a crow on the beam */}
      <g transform={`translate(-30 -664) scale(${1 + Math.sin(f / 3) * 0.02})`}>
        <ellipse cx={0} cy={-30} rx={36} ry={24} fill="#1F1C24" stroke={INK} strokeWidth={4} />
        <circle cx={30} cy={-48} r={16} fill="#1F1C24" stroke={INK} strokeWidth={4} />
        <path d="M 44 -48 L 64 -42 L 44 -38 Z" fill={C.mustard} stroke={INK} strokeWidth={3} />
        <path d="M -30 -30 L -60 -20" stroke="#1F1C24" strokeWidth={10} strokeLinecap="round" />
      </g>
    </g>
  );
};

const Stocks: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-150} width={40} height={150} fill="#5A3A20" stroke={INK} strokeWidth={5} />
    <rect x={-170} y={-210} width={340} height={70} rx={8} fill="#8A5A34" stroke={INK} strokeWidth={6} />
    <path d="M -170 -175 L 170 -175" stroke={INK} strokeWidth={4} />
    {[-110, 0, 110].map((cx, k) => (
      <circle key={cx} cx={cx} cy={-175} r={k === 1 ? 26 : 16} fill="#2A1C14" stroke={INK} strokeWidth={4} />
    ))}
  </g>
);

// US Supreme Court courtroom: red drapes, marble columns, the long bench with nine chairs, a clock
const Courtroom: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#EFE8DA" />
    <rect x={60} y={360} width={960} height={900} fill="#8E1B1B" stroke={INK} strokeWidth={7} />
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${100 + k * 80} 360 Q ${120 + k * 80 + Math.sin(f / 20 + k) * 3} 800 ${100 + k * 80} 1260`} stroke="#6E1212" strokeWidth={14} fill="none" />
    ))}
    {[0, 300, 720, 1020].map((cx) => (
      <g key={cx}>
        <rect x={cx - 50} y={300} width={100} height={1000} fill="#F4EEE2" stroke={INK} strokeWidth={6} />
        {[-26, 0, 26].map((d) => <path key={d} d={`M ${cx + d} 320 L ${cx + d} 1280`} stroke="#D6CDBB" strokeWidth={6} />)}
        <rect x={cx - 66} y={280} width={132} height={36} fill="#E4DBC7" stroke={INK} strokeWidth={5} />
      </g>
    ))}
    <rect x={0} y={230} width={1080} height={70} fill="#E4DBC7" stroke={INK} strokeWidth={6} />
    {/* clock */}
    <g transform="translate(540 560)">
      <circle r={70} fill="#F7F1E3" stroke={GOLD_D} strokeWidth={12} />
      <path d={`M 0 0 L 0 -44 M 0 0 L ${Math.sin(f / 30) * 34} ${-Math.cos(f / 30) * 34}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
    </g>
    {/* nine high-backed chairs behind the bench */}
    {new Array(9).fill(0).map((_, k) => {
      const cx = 150 + k * 97.5;
      const tall = k === 4 ? 30 : 0;
      return <rect key={k} x={cx - 34} y={880 - tall} width={68} height={200 + tall} rx={18} fill="#2A1C18" stroke={INK} strokeWidth={5} />;
    })}
    {/* the bench */}
    <path d="M 40 1010 L 1040 1010 L 1040 1260 L 40 1260 Z" fill="#7A4326" stroke={INK} strokeWidth={8} />
    <rect x={30} y={990} width={1020} height={36} fill="#5E3019" stroke={INK} strokeWidth={6} />
    {new Array(6).fill(0).map((_, k) => <rect key={k} x={80 + k * 160} y={1060} width={120} height={160} rx={8} fill="none" stroke="#5E3019" strokeWidth={7} />)}
    <rect x={0} y={1260} width={1080} height={660} fill="#A08C70" />
    <path d="M 0 1260 L 1080 1260" stroke={INK} strokeWidth={7} />
    {new Array(8).fill(0).map((_, k) => <path key={k} d={`M ${k * 160} 1260 L ${k * 160 - 200} 1920`} stroke="#8E7A60" strokeWidth={5} />)}
  </>
);

// today's court marshal at a lectern (waist up), gavel in hand. origin = lectern top centre.
const Marshal: React.FC<{ x: number; y: number; s?: number; f: number; shout?: number; strike?: number }> = ({ x, y, s = 1, f, shout = 0, strike = 0 }) => {
  const SUIT = "#1F2638";
  const gy = -260 + strike * 120;
  const mouthRy = 5 + 22 * shout;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${Math.sin(f / 14) * 2})`}>
        {/* torso */}
        <path d="M -150 20 L -140 -230 Q 0 -280 140 -230 L 150 20 Z" fill={SUIT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -40 -262 L 0 -150 L 40 -262 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <path d="M -14 -240 L 14 -240 L 8 -150 L 0 -138 L -8 -150 Z" fill="#8E1B1B" stroke={INK} strokeWidth={4} />
        <path d="M -40 -262 L -70 -100 M 40 -262 L 70 -100" stroke="#2E3852" strokeWidth={10} />
        {/* head */}
        <rect x={-26} y={-300} width={52} height={44} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <ellipse cx={0} cy={-370} rx={68} ry={78} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -74 -340 Q -92 -460 0 -462 Q 92 -460 74 -340 Q 70 -410 0 -420 Q -70 -410 -74 -340 Z" fill="#6B4A2E" stroke={INK} strokeWidth={5} />
        <circle cx={-24} cy={-374} r={8} fill={INK} />
        <circle cx={24} cy={-374} r={8} fill={INK} />
        <path d="M -42 -398 L -10 -392 M 10 -392 L 42 -398" stroke="#4A3424" strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={0} cy={-326 + mouthRy * 0.2} rx={16 + 10 * shout} ry={mouthRy} fill="#7A1E1A" stroke={INK} strokeWidth={4} />
        {/* gavel arm */}
        <path d={`M 120 -220 Q 200 -170 180 ${gy + 30}`} stroke={INK} strokeWidth={58} fill="none" strokeLinecap="round" />
        <path d={`M 120 -220 Q 200 -170 180 ${gy + 30}`} stroke={SUIT} strokeWidth={46} fill="none" strokeLinecap="round" />
        <g transform={`translate(180 ${gy}) rotate(${-30 + strike * 40})`}>
          <rect x={-8} y={-110} width={16} height={130} rx={6} fill="#6B3A1E" stroke={INK} strokeWidth={4} />
          <rect x={-46} y={-150} width={92} height={46} rx={10} fill="#7A4326" stroke={INK} strokeWidth={5} />
        </g>
        <circle cx={180} cy={gy} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
      </g>
      {/* lectern */}
      <path d="M -190 0 L 190 0 L 160 420 L -160 420 Z" fill="#7A4326" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <rect x={-210} y={-24} width={420} height={36} rx={6} fill="#5E3019" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={170} r={70} fill={GOLD} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={170} r={48} fill="none" stroke={GOLD_D} strokeWidth={6} />
    </g>
  );
};

// big comic speech bubble with stacked lines; p = 0..1 pop-in
const Bubble: React.FC<{ x: number; y: number; lines: string[]; p: number; size?: number; tailX?: number; tailY?: number; w?: number }> = ({ x, y, lines, p, size = 96, tailX = 0, tailY = 300, w = 560 }) => {
  if (p <= 0) return null;
  const sc = interpolate(p, [0, 1], [0.3, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
  const h = lines.length * size * 1.05 + 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`}>
      <path d={`M -60 ${h / 2 - 10} L ${tailX} ${tailY} L 60 ${h / 2 - 10} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={60} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
      <path d={`M -54 ${h / 2 - 12} L 54 ${h / 2 - 12}`} stroke="#FFFFFF" strokeWidth={12} />
      {lines.map((t, i) => (
        <text key={i} x={0} y={-h / 2 + 35 + size * 0.85 + i * size * 1.05} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={i % 2 ? C.brick : INK}>
          {t}
        </text>
      ))}
    </g>
  );
};

// sound rings from a point (e.g. the crier's mouth), opening to one side
const Rings: React.FC<{ x: number; y: number; f: number; dir?: 1 | -1; strength?: number }> = ({ x, y, f, dir = -1, strength = 1 }) => (
  <>
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 6) % 18) / 18;
      const r = 50 + p * 230;
      return (
        <path key={k} d={`M ${x + dir * r * 0.5} ${y - r * 0.85} Q ${x + dir * r} ${y} ${x + dir * r * 0.5} ${y + r * 0.85}`} stroke={C.cream} strokeWidth={14 * (1 - p) + 4} fill="none" strokeLinecap="round" opacity={(1 - p) * strength} />
      );
    })}
  </>
);

const Proclamation: React.FC<{ x: number; y: number; open: number; title: string; f: number }> = ({ x, y, open, title, f }) => {
  const h = 80 + open * 560;
  return (
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 18) * 1.2})`}>
      <rect x={-330} y={0} width={660} height={h} fill={PARCH} stroke={INK} strokeWidth={7} />
      <g opacity={interpolate(open, [0.3, 0.6], [0, 1], clamp)}>
        <text x={0} y={90} textAnchor="middle" fontFamily={typeFont} fontSize={46} fill="#6B5636">PROCLAMATION</text>
        <path d="M -220 116 L 220 116" stroke="#8A7552" strokeWidth={5} />
      </g>
      <g opacity={interpolate(open, [0.55, 0.8], [0, 1], clamp)} transform={`translate(0 ${interpolate(open, [0.55, 0.8], [20, 0], clamp)})`}>
        <text x={0} y={290} textAnchor="middle" fontFamily={titleFont} fontSize={116} fill={C.brick} stroke={INK} strokeWidth={4} paintOrder="stroke">{title}</text>
      </g>
      {[0, 1, 2].map((k) => (open > 0.75 + k * 0.08 ? <path key={k} d={`M -240 ${380 + k * 52} L ${200 - (k % 2) * 80} ${380 + k * 52}`} stroke="#8A7552" strokeWidth={10} strokeLinecap="round" /> : null))}
      {[[-250, 560], [250, 560]].map(([cx, cy], k) => (open > 0.9 ? (
        <g key={k} transform={`translate(${cx} ${cy})`}>
          <circle r={44} fill={GOLD} stroke={INK} strokeWidth={6} />
          <text x={0} y={18} textAnchor="middle" fontFamily={titleFont} fontSize={52} fill={INK}>£</text>
        </g>
      ) : null))}
      <rect x={-356} y={-24} width={712} height={44} rx={22} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
      <rect x={-356} y={h - 20} width={712} height={44} rx={22} fill="#E8D3A2" stroke={INK} strokeWidth={6} />
    </g>
  );
};

// a notice pinned to a post, unreadable squiggles
const Notice: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-20} y={0} width={40} height={760} fill={WOOD} stroke={INK} strokeWidth={6} />
    <rect x={-150} y={-30} width={300} height={360} fill={PARCH} stroke={INK} strokeWidth={6} />
    {new Array(7).fill(0).map((_, k) => (
      <path key={k} d={`M -110 ${20 + k * 44} q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 30 0`} stroke="#6B5636" strokeWidth={6} fill="none" strokeLinecap="round" />
    ))}
    <circle cx={0} cy={-14} r={10} fill={C.brick} stroke={INK} strokeWidth={4} />
  </g>
);

const QMark: React.FC<{ x: number; y: number; f: number; k: number }> = ({ x, y, f, k }) => (
  <text x={x} y={y + Math.sin(f / 5 + k) * 8} textAnchor="middle" fontFamily={titleFont} fontSize={110} fill={C.mustard} stroke={INK} strokeWidth={6} paintOrder="stroke">?</text>
);

export const TownCrier: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "square";
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" = "day";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  let showFloats = true;
  const swing = Math.sin(f / 3);

  if (mode === "square") {
    // frame 0: the crier fills the frame, bell already clanging over an angry crowd
    const cx = 480;
    const S = 1.35;
    const clangP = (k: number) => ((f + k * 9) % 18) / 18;
    body = (
      <>
        <Square y0={1220} f={f} />
        {[[80, 1640, 0], [270, 1600, 1], [840, 1610, 2], [1010, 1650, 3]].map(([mx, my, i]) => (
          <Mob key={i} x={mx} y={my} s={1.05} f={f} i={i} />
        ))}
        <Crier x={cx} y={1965} s={S} f={f} shout={0.55 + Math.abs(Math.sin(f / 4)) * 0.45} bell="up" bellRot={swing * 34} bellS={1.05} scroll="short" />
        <Rings x={cx - 40} y={1965 - 740 * S} f={f} dir={-1} />
        <Clang x={800} y={1230} p={clangP(0)} rot={8} size={84} />
        <Clang x={190} y={1030} p={clangP(9) * (f > 8 ? 1 : 0)} text="CLANG!" size={72} />
      </>
    );
  } else if (mode === "crown") {
    // the crowd surges – then the royal seal slams down: he speaks for the monarch
    const sealAt = (v.sealAt ?? 0.45) * dur;
    const calm = interpolate(f, [sealAt + 2, sealAt + 10], [0, 1], clamp);
    body = (
      <>
        <Square y0={1180} f={f} />
        <rect x={250} y={1290} width={380} height={70} fill="#C9B79A" stroke={INK} strokeWidth={6} />
        <rect x={210} y={1350} width={460} height={70} fill="#B8A688" stroke={INK} strokeWidth={6} />
        <Crier x={440} y={1300} s={0.78} f={f} shout={0.5 + Math.abs(Math.sin(f / 4)) * 0.5} bell="up" bellRot={swing * 30} scroll="short" />
        {[[110, 1760, 0], [380, 1800, 4], [700, 1790, 2], [970, 1760, 5]].map(([mx, my, i]) => (
          <Mob key={i} x={mx} y={my} s={1.45} f={f} i={i} back calm={calm} />
        ))}
        {[[240, 1960, 1], [820, 1990, 3]].map(([mx, my, i]) => (
          <Mob key={i} x={mx} y={my} s={1.7} f={f} i={i} back calm={calm} />
        ))}
        <Seal x={860} y={820} p={interpolate(f, [sealAt, sealAt + 12], [0, 1], clamp)} />
      </>
    );
  } else if (mode === "oyez") {
    // nobody can read the notice… so the crier rings and ROARS it
    const oyezAt = (v.oyezAt ?? 0.62) * dur;
    const age = f - oyezAt;
    const roar = age >= 0;
    const S = 1.15;
    const mouthY = 1900 - 740 * S;
    body = (
      <>
        <Square y0={1240} f={f} />
        <Notice x={830} y={820} />
        <Mob x={760} y={1760} s={0.95} f={f} i={3} fist={false} calm={roar ? 1 : 0.6} turn={roar ? -1 : 0} />
        <Mob x={990} y={1800} s={1.0} f={f} i={2} fist={false} calm={roar ? 1 : 0.6} turn={roar ? -1 : 0} />
        {!roar ? <><QMark x={760} y={1330} f={f} k={0} /><QMark x={990} y={1360} f={f} k={2} /></> : null}
        <Crier x={380} y={1900} s={S} f={f} shout={roar ? 1 : 0.15} bell="side" bellRot={swing * 40} scroll="none" />
        {roar ? <Rings x={380} y={mouthY} f={age} dir={1} strength={1.2} /> : null}
        {roar ? <Rings x={380} y={mouthY} f={age + 9} dir={-1} strength={1.2} /> : null}
      </>
    );
    if (roar) {
      const sc = interpolate(age, [0, 6], [0.2, 1], { ...clamp, easing: Easing.bezier(0.2, 1.6, 0.4, 1) });
      const shake = age < 10 ? Math.sin(age * 2.5) * (10 - age) : 0;
      overlay = (
        <>
          <div style={{ position: "absolute", left: 0, width: 1080, top: 380, textAlign: "center", fontFamily: titleFont, fontSize: 215, color: C.mustard, WebkitTextStroke: `12px ${INK}`, paintOrder: "stroke", transform: `translateX(${shake}px) scale(${sc}) rotate(-4deg)`, textShadow: `10px 12px 0 ${INK}` }}>
            OYEZ!
          </div>
          {age > 8 ? (
            <div style={{ position: "absolute", right: 130, top: 700, fontFamily: typeFont, fontSize: 56, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", rotate: "3deg", opacity: interpolate(age, [8, 13], [0, 1], clamp), scale: interpolate(age, [8, 16], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
              = “HEAR YE!”
            </div>
          ) : null}
        </>
      );
    }
  } else if (mode === "tax") {
    // the proclamation unrolls: NEW TAX – the crowd boos
    const open = interpolate(f, [2, 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const booP = (k: number) => (f > 24 ? ((f - 24 + k * 10) % 24) / 24 : 0);
    body = (
      <>
        <Square y0={1300} f={f} />
        <Crier x={540} y={1890} s={0.86} f={f} shout={0.5 + Math.abs(Math.sin(f / 4)) * 0.5} bell="up" bellRot={swing * 30} scroll="none" />
        <Proclamation x={540} y={350} open={open} title={v.title ?? "NEW TAX!"} f={f} />
        {[[90, 1940, 0], [990, 1950, 5]].map(([mx, my, i]) => (
          <Mob key={i} x={mx} y={my} s={1.5} f={f} i={i} back />
        ))}
        <Clang x={210} y={1240} p={booP(0)} text="BOO!" size={96} rot={-10} />
        <Clang x={870} y={1300} p={booP(12)} text="BOO!" size={96} rot={8} />
      </>
    );
  } else if (mode === "gallows") {
    // dusk at the gallows: the crier reads out the crime (scaffold empty – no body shown)
    sky = "dawn";
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#3B2E4E" opacity={0.45} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={k * 190 - 30} y={1100 - (k % 3) * 70} width={180} height={300 + (k % 3) * 70} fill="#4A3A52" stroke={INK} strokeWidth={4} />
        ))}
        <rect x={0} y={1380} width={1080} height={540} fill="#6E5E4E" />
        <path d="M 0 1380 L 1080 1380" stroke={INK} strokeWidth={6} />
        <Gallows x={760} y={1350} s={1.2} f={f} />
        <Crier x={480} y={1326} s={0.7} f={f} shout={0.35 + Math.abs(Math.sin(f / 5)) * 0.35} bell="none" scroll="long" />
        <Stocks x={220} y={1820} s={1.3} />
        {[[620, 1980, 1], [820, 1990, 4], [1010, 1970, 2]].map(([mx, my, i]) => (
          <g key={i} opacity={0.92}>
            <Mob x={mx} y={my} s={1.15} f={f} i={i} back fist={false} />
          </g>
        ))}
      </>
    );
  } else if (mode === "court") {
    // the bell's ring travels… flash → today's US Supreme Court, the Marshal calls "Oyez! Oyez! Oyez!"
    const answerAt = (v.answerAt ?? 0.4) * dur;
    const after = f >= answerAt;
    const age = f - answerAt;
    if (after && v.answer) headline = undefined;
    showFloats = !after;
    const flash = interpolate(f, [answerAt - 2, answerAt, answerAt + 6], [0, 1, 0], clamp);
    body = !after ? (
      <>
        <Square y0={1240} f={f} />
        <Crier x={540} y={1900} s={1.1} f={f} shout={0.6 + Math.abs(Math.sin(f / 4)) * 0.4} bell="up" bellRot={swing * 34} scroll="short" />
        <Rings x={540} y={1900 - 740 * 1.1} f={f} dir={1} />
        <Rings x={540} y={1900 - 740 * 1.1} f={f + 9} dir={-1} />
      </>
    ) : (
      <>
        <Courtroom f={f} />
        <Marshal x={810} y={1540} s={1.15} f={f} shout={0.6 + Math.abs(Math.sin(age / 3)) * 0.4} strike={age < 8 ? interpolate(age, [0, 3, 8], [0, 1, 0], clamp) : 0} />
        <Bubble x={370} y={840} lines={v.bubble ?? ["OYEZ!", "OYEZ!", "OYEZ!"]} p={interpolate(age, [3, 11], [0, 1], clamp)} size={100} tailX={390} tailY={290} />
      </>
    );
    overlay = <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash }} />;
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {overlay}
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 96} /> : null}
      {mode === "court" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.4) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 92} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      {showFloats ? <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} /> : null}
    </Backdrop>
  );
};
