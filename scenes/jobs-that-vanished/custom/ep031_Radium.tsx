import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep031 – Radium Dial Painter. Modes: lips (hook close-up) · bench (factory wide, LIP/DIP/PAINT) ·
// glow (night, glowing smiles + nails) · lab (chemist behind a lead screen with tongs) · xray (jaw) · court (bed + gavel → safety sign)
// visual: { mode, headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, steps?: string[], stepsAt?: number[], hitAt?, revealAt?, stamp? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const HAIR = "#4A2E1F";
const GREEN = "#B8FF5A";
const GREEN_D = "#6FD13A";
const LIP = "#B5452F";
const pop = (age: number, len = 10) => interpolate(age, [0, len], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const GlowDefs: React.FC = () => (
  <defs>
    <filter id="rglow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="14" />
    </filter>
    <filter id="rglowS" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>
);

// a glowing blob: blurred halo + bright core
const Glow: React.FC<{ x: number; y: number; r: number; o?: number }> = ({ x, y, r, o = 1 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r * 2.2} fill={GREEN} filter="url(#rglow)" opacity={0.75} />
    <circle cx={x} cy={y} r={r} fill={GREEN} />
  </g>
);

const Chips: React.FC<{ items: string[]; f: number; dur: number; top: number }> = ({ items, f, dur, top }) => (
  <>
    {items.map((t, i) => {
      const at = 8 + i * Math.max(18, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 110 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: pop(age) }}>
          {t}
        </div>
      );
    })}
  </>
);

// a watch dial; `painted` 0–12 numerals glowing
const Dial: React.FC<{ x: number; y: number; r: number; painted: number; f: number }> = ({ x, y, r, painted, f }) => (
  <g>
    <circle cx={x} cy={y} r={r + 10} fill="#B9A27A" stroke={INK} strokeWidth={6} />
    <circle cx={x} cy={y} r={r} fill={C.cream} stroke={INK} strokeWidth={4} />
    {new Array(12).fill(0).map((_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(a) * r * 0.78;
      const py = y + Math.sin(a) * r * 0.78;
      const lit = i < painted;
      return lit ? (
        <g key={i}>
          <circle cx={px} cy={py} r={r * 0.13} fill={GREEN} filter="url(#rglowS)" opacity={0.8 + 0.2 * Math.sin(f / 6 + i)} />
          <circle cx={px} cy={py} r={r * 0.07} fill={GREEN} />
        </g>
      ) : (
        <circle key={i} cx={px} cy={py} r={r * 0.06} fill="#B9AF98" />
      );
    })}
    <line x1={x} y1={y} x2={x} y2={y - r * 0.55} stroke={INK} strokeWidth={6} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x + r * 0.4} y2={y + r * 0.1} stroke={INK} strokeWidth={6} strokeLinecap="round" />
  </g>
);

// ---------- LIPS: profile close-up, brush cycles lip → dip → paint ----------
const CYCLE = 54;
const LipsScene: React.FC<{ f: number }> = ({ f }) => {
  const L = { x: 676, y: 902 }; // lips
  const P = { x: 880, y: 1240 }; // paint pot
  const D = { x: 250, y: 1560 }; // dial on the bench
  const t = f % CYCLE;
  const keys = [0, 9, 20, 26, 36, 42, CYCLE];
  const xs = [L.x, L.x, P.x, P.x, D.x + 60, D.x + 40, L.x];
  const ys = [L.y, L.y, P.y - 30, P.y + 10, D.y - 50, D.y - 40, L.y];
  const ease = { ...clamp, easing: Easing.inOut(Easing.cubic) };
  const tx = interpolate(t, keys, xs, ease);
  const ty = interpolate(t, keys, ys, ease);
  const touches = Math.floor(f / CYCLE) + 1;
  const lipGlow = Math.min(1, 0.45 + touches * 0.25);
  const painted = Math.min(12, 3 + Math.floor((f + 18) / CYCLE) * 3);
  const atLips = t < 10 || t > 50;
  // brush handle runs from tip down-right
  const hx = tx + 150;
  const hy = ty + 250;
  return (
    <>
      {/* warm workshop wall + window light */}
      <rect x={0} y={0} width={1080} height={1920} fill="#E7C99A" />
      <rect x={760} y={330} width={260} height={560} fill="#F7E7C4" stroke={INK} strokeWidth={8} />
      <line x1={890} y1={330} x2={890} y2={890} stroke={INK} strokeWidth={6} />
      <line x1={760} y1={610} x2={1020} y2={610} stroke={INK} strokeWidth={6} />
      <rect x={0} y={1180} width={1080} height={740} fill="#8C5A2B" stroke={INK} strokeWidth={8} />
      {/* shoulders */}
      <path d="M 170 1420 Q 220 1110 430 1080 Q 600 1070 700 1180 Q 760 1260 780 1420 Z" fill="#5E7B8C" stroke={INK} strokeWidth={8} />
      <rect x={385} y={980} width={110} height={130} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M 380 1090 Q 440 1150 500 1090" fill="none" stroke={C.cream} strokeWidth={22} strokeLinecap="round" />
      {/* head (profile, facing right) */}
      <ellipse cx={480} cy={810} rx={205} ry={235} fill={SKIN} stroke={INK} strokeWidth={8} />
      <path d="M 668 760 Q 730 820 676 862" fill={SKIN} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* hair bob */}
      <path d="M 268 900 Q 230 560 470 565 Q 680 570 690 700 Q 610 640 520 668 Q 430 700 420 790 Q 410 900 330 990 Q 280 960 268 900 Z" fill={HAIR} stroke={INK} strokeWidth={8} />
      <ellipse cx={440} cy={840} rx={30} ry={42} fill="#D9A57B" stroke={INK} strokeWidth={6} />
      {/* eye (looking down at the brush) + brow */}
      <path d="M 575 770 Q 600 785 625 770" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <path d="M 565 730 Q 600 715 635 728" fill="none" stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
      <circle cx={600} cy={835} r={22} fill="#E89A86" opacity={0.6} />
      {/* lips with growing radium glow */}
      <Glow x={L.x - 8} y={L.y} r={18} o={lipGlow * (atLips ? 1 : 0.75)} />
      <ellipse cx={L.x - 10} cy={L.y - 9} rx={28} ry={12} fill={LIP} stroke={INK} strokeWidth={5} />
      <ellipse cx={L.x - 10} cy={L.y + 9} rx={28} ry={13} fill={LIP} stroke={INK} strokeWidth={5} />
      {/* paint pot */}
      <Glow x={P.x} y={P.y - 10} r={34} o={0.9} />
      <path d={`M ${P.x - 70} ${P.y - 30} L ${P.x + 70} ${P.y - 30} L ${P.x + 55} ${P.y + 60} L ${P.x - 55} ${P.y + 60} Z`} fill="#D8D2C2" stroke={INK} strokeWidth={7} />
      <ellipse cx={P.x} cy={P.y - 30} rx={70} ry={16} fill={GREEN} stroke={INK} strokeWidth={6} />
      {/* dial held at the bench */}
      <Dial x={D.x} y={D.y} r={95} painted={painted} f={f} />
      {/* brush + hand */}
      <line x1={tx} y1={ty} x2={hx} y2={hy} stroke="#7A4A22" strokeWidth={14} strokeLinecap="round" />
      <line x1={tx} y1={ty} x2={tx + 26} y2={ty + 43} stroke="#C0C4CA" strokeWidth={16} />
      <Glow x={tx} y={ty} r={10} o={1} />
      <path d={`M ${tx - 7} ${ty + 6} L ${tx} ${ty - 12} L ${tx + 9} ${ty + 4} Z`} fill={GREEN_D} stroke={INK} strokeWidth={3} />
      <ellipse cx={tx + 95} cy={ty + 165} rx={46} ry={38} fill={SKIN} stroke={INK} strokeWidth={7} transform={`rotate(-30 ${tx + 95} ${ty + 165})`} />
    </>
  );
};

// ---------- BENCH: factory wide shot, rows of painters ----------
const BenchScene: React.FC<{ f: number }> = ({ f }) => {
  const GIRLS = [
    { x: 230, coat: "#7A4A5E" },
    { x: 540, coat: "#5E7B8C" },
    { x: 850, coat: "#8E6B26" },
  ];
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#EBD9B4" />
      {[60, 400, 740].map((x, i) => (
        <g key={i}>
          <rect x={x} y={230} width={280} height={640} fill="#FBF3DE" stroke={INK} strokeWidth={8} />
          {[1, 2].map((k) => <line key={k} x1={x + (280 * k) / 3} y1={230} x2={x + (280 * k) / 3} y2={870} stroke={INK} strokeWidth={5} />)}
          {[1, 2, 3].map((k) => <line key={k} x1={x} y1={230 + 160 * k} x2={x + 280} y2={230 + 160 * k} stroke={INK} strokeWidth={5} />)}
        </g>
      ))}
      {[230, 540, 850].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={0} x2={x} y2={150} stroke={INK} strokeWidth={5} />
          <path d={`M ${x - 80} 210 Q ${x} 120 ${x + 80} 210 Z`} fill="#4E6B5E" stroke={INK} strokeWidth={6} />
        </g>
      ))}
      <rect x={0} y={870} width={1080} height={1050} fill="#C9AE84" />
      {GIRLS.map((g, i) => (
        <Figure key={i} x={g.x} y={1470} scale={1.45} hat="none" coat={g.coat} scarf={C.cream} skirt prop="pencil" action="write" facing="right" frameOffset={i * 11} />
      ))}
      {GIRLS.map((g, i) => {
        const x = g.x + 4;
        const y = 904;
        return <path key={i} d={`M ${x - 72} ${y + 10} Q ${x - 88} ${y - 82} ${x} ${y - 80} Q ${x + 72} ${y - 78} ${x + 76} ${y - 22} Q ${x + 22} ${y - 52} ${x - 18} ${y - 30} Q ${x - 44} ${y + 8} ${x - 38} ${y + 62} Q ${x - 70} ${y + 52} ${x - 72} ${y + 10} Z`} fill={HAIR} stroke={INK} strokeWidth={6} />;
      })}
      {/* long bench */}
      <rect x={-20} y={1160} width={1120} height={46} rx={10} fill="#8C5A2B" stroke={INK} strokeWidth={8} />
      <rect x={0} y={1206} width={1080} height={300} fill="#6E4522" stroke={INK} strokeWidth={8} />
      {GIRLS.map((g, i) => (
        <g key={i}>
          <ellipse cx={g.x + 130} cy={1150} rx={48} ry={14} fill="#F4EAD5" stroke={INK} strokeWidth={5} />
          <Glow x={g.x + 130} y={1146} r={9} o={0.6 + 0.4 * Math.abs(Math.sin(f / 9 + i))} />
        </g>
      ))}
    </>
  );
};

// big LIP / DIP / PAINT words
const Steps: React.FC<{ words: string[]; at: number[]; f: number; top: number }> = ({ words, at, f, top }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", gap: 18 }}>
    {words.map((w, i) => {
      const age = f - at[i];
      return (
        <div key={i} style={{ fontFamily: titleFont, fontSize: 92, color: GREEN, background: INK, borderRadius: 20, padding: "4px 20px", WebkitTextStroke: `4px ${INK}`, paintOrder: "stroke fill", textShadow: `0 0 26px ${GREEN}`, opacity: age < 0 ? 0 : 1, scale: age < 0 ? 0.4 : pop(age, 8), rotate: `${i % 2 ? 4 : -4}deg` }}>
          {w}
        </div>
      );
    })}
  </div>
);

// ---------- GLOW: night out, glowing smiles + nails ----------
const GlowScene: React.FC<{ f: number }> = ({ f }) => {
  const xs = [240, 540, 840];
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#141826" />
      {new Array(40).fill(0).map((_, k) => {
        const x = random(`gx${k}`) * 1080;
        const y = (random(`gy${k}`) * 1500 + 300 - f * (0.6 + random(`gs${k}`))) % 1600 + 250;
        return <circle key={k} cx={x} cy={y} r={3 + random(`gr${k}`) * 5} fill={GREEN} opacity={0.35 + 0.4 * Math.sin(f / 7 + k)} />;
      })}
      {xs.map((x, i) => {
        const bob = Math.sin(f / 6 + i * 2) * 14;
        const cy = 900 + bob;
        const sway = Math.sin(f / 8 + i) * 18;
        return (
          <g key={i} transform={`rotate(${sway * 0.2} ${x} ${cy + 300})`}>
            {/* dress, dusted with glow */}
            <path d={`M ${x - 130} 1460 Q ${x - 110} ${cy + 170} ${x} ${cy + 150} Q ${x + 110} ${cy + 170} ${x + 130} 1460 Z`} fill={["#3E2E4E", "#2E3E4E", "#4E2E36"][i]} stroke={INK} strokeWidth={7} />
            {new Array(9).fill(0).map((_, k) => <circle key={k} cx={x - 90 + random(`d${i}${k}`) * 180} cy={cy + 200 + random(`e${i}${k}`) * 300} r={5} fill={GREEN} opacity={0.5 + 0.5 * Math.sin(f / 5 + k)} />)}
            {/* head */}
            <ellipse cx={x} cy={cy} rx={115} ry={130} fill="#C9A88A" stroke={INK} strokeWidth={7} />
            <path d={`M ${x - 125} ${cy + 40} Q ${x - 140} ${cy - 150} ${x} ${cy - 140} Q ${x + 140} ${cy - 150} ${x + 125} ${cy + 40} Q ${x + 90} ${cy - 60} ${x} ${cy - 80} Q ${x - 90} ${cy - 60} ${x - 125} ${cy + 40} Z`} fill={HAIR} stroke={INK} strokeWidth={7} />
            <path d={`M ${x - 55} ${cy - 10} Q ${x - 35} ${cy - 30} ${x - 15} ${cy - 10}`} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
            <path d={`M ${x + 15} ${cy - 10} Q ${x + 35} ${cy - 30} ${x + 55} ${cy - 10}`} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
            {/* glowing grin */}
            <path d={`M ${x - 60} ${cy + 40} Q ${x} ${cy + 115} ${x + 60} ${cy + 40} Z`} fill={GREEN} filter="url(#rglow)" opacity={0.9} />
            <path d={`M ${x - 60} ${cy + 40} Q ${x} ${cy + 115} ${x + 60} ${cy + 40} Z`} fill={GREEN} stroke={INK} strokeWidth={6} />
            {[-30, 0, 30].map((dx) => <line key={dx} x1={x + dx} y1={cy + 42} x2={x + dx} y2={cy + 66} stroke={GREEN_D} strokeWidth={4} />)}
            {/* hands up with glowing nails */}
            {[-1, 1].map((s) => {
              const hx = x + s * 150;
              const hy = cy - 40 + Math.sin(f / 4 + i + s) * 20;
              return (
                <g key={s}>
                  <ellipse cx={hx} cy={hy} rx={34} ry={40} fill="#C9A88A" stroke={INK} strokeWidth={6} />
                  {[-22, -8, 8, 22].map((d, k) => <Glow key={k} x={hx + d} y={hy - 40 + Math.abs(d) * 0.3} r={6} />)}
                </g>
              );
            })}
          </g>
        );
      })}
    </>
  );
};

// ---------- LAB: chemist safe behind a lead screen, tongs ----------
const LabScene: React.FC<{ f: number }> = ({ f }) => {
  const open = Math.sin(f / 10) * 4;
  const vy = 1010 + Math.sin(f / 14) * 12;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#CBD6DE" />
      {new Array(8).fill(0).map((_, k) => <line key={k} x1={0} y1={300 + k * 110} x2={1080} y2={300 + k * 110} stroke="#B6C3CC" strokeWidth={4} />)}
      <rect x={0} y={1250} width={1080} height={670} fill="#8E9AA3" stroke={INK} strokeWidth={8} />
      {/* chemist, white coat, behind the screen */}
      <Figure x={470} y={1420} scale={1.55} hat="none" coat="#F4F4F0" scarf="#9AA6AE" facing="right" action="idle" />
      {/* face mask over the lower face */}
      <rect x={462} y={822} width={78} height={42} rx={14} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      {/* lead screen */}
      <rect x={250} y={880} width={460} height={420} rx={10} fill="#676C75" stroke={INK} strokeWidth={9} />
      {[0, 1, 2, 3].map((k) => [0, 1].map((j) => <circle key={`${k}${j}`} cx={290 + k * 127} cy={915 + j * 350} r={9} fill="#9CA1AA" stroke={INK} strokeWidth={4} />))}
      <text x={480} y={1130} textAnchor="middle" fontFamily={titleFont} fontSize={110} fill="#A6ABB4" stroke={INK} strokeWidth={4}>LEAD</text>
      {/* long tongs reaching out to a glowing vial */}
      <line x1={700} y1={960} x2={900} y2={vy - 20 - open} stroke="#5A5F66" strokeWidth={12} strokeLinecap="round" />
      <line x1={700} y1={975} x2={900} y2={vy + 20 + open} stroke="#5A5F66" strokeWidth={12} strokeLinecap="round" />
      <Glow x={915} y={vy} r={16} />
      <rect x={895} y={vy - 30} width={40} height={60} rx={10} fill="none" stroke={INK} strokeWidth={6} />
    </>
  );
};

// ---------- XRAY: radium settles in the jaw ----------
const XrayScene: React.FC<{ f: number; dur: number }> = ({ f, dur }) => {
  const BONE = "#D4E8F6";
  const n = Math.floor(interpolate(f, [0, dur * 0.7], [4, 34], clamp));
  const crack = interpolate(f, [dur * 0.45, dur * 0.75], [0, 1], clamp);
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#0F1A28" />
      <rect x={130} y={430} width={820} height={880} rx={24} fill="#1C3350" stroke="#9EC7E8" strokeWidth={8} />
      <rect x={130} y={430} width={820} height={880} rx={24} fill="none" stroke="#9EC7E8" strokeWidth={30} opacity={0.15} />
      <g fill="none" stroke={BONE} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
        {/* skull profile facing right */}
        <path d="M 330 960 Q 250 700 470 600 Q 690 540 760 760 Q 780 830 760 880 L 790 940 L 750 950" />
        <ellipse cx={660} cy={800} rx={50} ry={44} />
        <path d="M 750 950 Q 740 1000 700 1010 L 520 1010" />
        <path d="M 330 960 Q 350 1010 420 1010" />
        {/* mandible */}
        <path d="M 420 1010 L 430 1120 Q 470 1190 600 1180 L 730 1150 Q 750 1100 720 1060 L 520 1060" />
      </g>
      {/* teeth */}
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={540 + k * 32} y={1012} width={24} height={40} rx={6} fill={BONE} opacity={k === 2 || k === 4 ? 1 - crack : 1} />)}
      {/* radium specks settling into bone */}
      {new Array(n).fill(0).map((_, k) => {
        const inJaw = k % 3 !== 0;
        const x = inJaw ? 450 + random(`jx${k}`) * 270 : 360 + random(`sx${k}`) * 360;
        const y = inJaw ? 1080 + random(`jy${k}`) * 80 : 640 + random(`sy${k}`) * 260;
        return <Glow key={k} x={x} y={y} r={6} o={0.6 + 0.4 * Math.sin(f / 6 + k)} />;
      })}
      {/* fracture lines */}
      <path d="M 560 1180 L 585 1140 L 565 1110 L 595 1075" fill="none" stroke="#E0533D" strokeWidth={9} strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - crack)} />
      <path d="M 680 1160 L 660 1120 L 690 1090" fill="none" stroke="#E0533D" strokeWidth={9} strokeLinecap="round" strokeDasharray="200" strokeDashoffset={200 * (1 - crack)} />
    </>
  );
};

// ---------- COURT: sick-bed hearing, gavel → today's safety sign ----------
const CourtScene: React.FC<{ f: number; dur: number; hitAt: number; revealAt: number; stamp?: string }> = ({ f, dur, hitAt, revealAt, stamp }) => {
  const H0 = dur * hitAt;
  const R0 = dur * revealAt;
  const swing = interpolate(f, [H0 - 8, H0], [-55, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  const shake = f >= H0 && f < H0 + 6 ? Math.sin(f * 3) * 10 : 0;
  const slide = interpolate(f, [R0, R0 + 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#E4C79A" />
      <rect x={0} y={1250} width={1080} height={670} fill="#9C6A3A" stroke={INK} strokeWidth={8} />
      <g transform={`translate(${-slide * 260 + shake}, ${slide * 40}) scale(${1 - slide * 0.25})`}>
        {/* the bed */}
        <rect x={90} y={820} width={60} height={520} rx={12} fill="#7A4A22" stroke={INK} strokeWidth={8} />
        <rect x={120} y={1080} width={700} height={110} rx={20} fill={C.cream} stroke={INK} strokeWidth={8} />
        <rect x={140} y={1010} width={190} height={90} rx={40} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
        <ellipse cx={250} cy={1000} rx={72} ry={66} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M 180 990 Q 190 920 260 925 Q 320 930 318 985 Q 280 960 250 965 Q 210 970 180 990 Z" fill={HAIR} stroke={INK} strokeWidth={6} />
        <path d="M 260 1005 Q 280 1012 298 1004" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <path d="M 300 1060 Q 560 990 800 1070 L 800 1110 L 300 1110 Z" fill="#A85A5A" stroke={INK} strokeWidth={8} />
        <rect x={790} y={980} width={50} height={360} rx={12} fill="#7A4A22" stroke={INK} strokeWidth={8} />
      </g>
      {/* gavel + block */}
      <g opacity={1 - slide}>
        <rect x={720} y={760} width={220} height={60} rx={12} fill="#6E4522" stroke={INK} strokeWidth={8} />
        <g transform={`rotate(${swing} 940 700)`}>
          <rect x={720} y={680} width={240} height={30} rx={12} fill="#8C5A2B" stroke={INK} strokeWidth={7} />
          <rect x={700} y={620} width={110} height={150} rx={22} fill="#7A4A22" stroke={INK} strokeWidth={8} />
        </g>
      </g>
      {stamp && f >= H0 + 4 ? (
        <g transform={`translate(800 470) rotate(-10) scale(${interpolate(f - H0 - 4, [0, 6], [1.8, 1], clamp)})`} opacity={1 - slide}>
          <rect x={-190} y={-62} width={380} height={124} rx={12} fill="none" stroke={C.brick} strokeWidth={12} />
          <text x={0} y={30} textAnchor="middle" fontFamily={titleFont} fontSize={84} fill={C.brick}>{stamp}</text>
        </g>
      ) : null}
      {/* today's safety sign + hard hat */}
      {slide > 0 ? (
        <g transform={`translate(${760 + (1 - slide) * 600}, 930)`}>
          <path d="M 0 -240 L 220 160 L -220 160 Z" fill={C.mustard} stroke={INK} strokeWidth={12} strokeLinejoin="round" />
          <rect x={-14} y={-120} width={28} height={170} rx={12} fill={INK} />
          <circle cx={0} cy={100} r={18} fill={INK} />
        </g>
      ) : null}
    </>
  );
};

export const Radium: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual as any;
  const mode: string = v.mode ?? "lips";
  let body: React.ReactNode = null;
  let sky: "dawn" | "night" | "day" = "dawn";
  if (mode === "lips") body = <LipsScene f={f} />;
  else if (mode === "bench") body = <BenchScene f={f} />;
  else if (mode === "glow") { sky = "night"; body = <GlowScene f={f} />; }
  else if (mode === "lab") { sky = "day"; body = <LabScene f={f} />; }
  else if (mode === "xray") { sky = "night"; body = <XrayScene f={f} dur={dur} />; }
  else if (mode === "court") body = <CourtScene f={f} dur={dur} hitAt={v.hitAt ?? 0.2} revealAt={v.revealAt ?? 0.5} stamp={v.stamp} />;
  const steps: string[] = v.steps ?? [];
  const stepsAt: number[] = (v.stepsAt ?? [0.5, 0.65, 0.8]).map((p: number) => p * dur);
  const headlineOn = v.headlineAt == null || f >= dur * v.headlineAt;
  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <GlowDefs />
        {body}
      </svg>
      {v.headline && headlineOn ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      {steps.length ? <Steps words={steps} at={stepsAt} f={f} top={v.stepsTop ?? 300} /> : null}
      <Chips items={v.float ?? []} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
