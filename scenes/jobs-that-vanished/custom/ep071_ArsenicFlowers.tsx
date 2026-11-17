import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep071 Arsenic flower maker – Victorian girls dusted fake leaves with arsenic "emerald green"; Matilda Scheurer (19) died in 1861.
// visual: { mode: "hook" | "girl" | "ballroom" | "workshop" | "market", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, blow? (hook/girl: 0–1 when she blows a puff of dust), sick? (0–1 green pallor),
//           eyes? [from, to] (0–1 green whites, animated over the scene), hanky? (girl: handkerchief at mouth),
//           bouquet? (girl: false hides it), cloud? (workshop: 0–1 final size of the dust cloud), ghost? (market: 0–1 sepia ghost) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#F2C7A2";
const SKIN_D = "#D79C78";
const HAIR = "#8A3519";
const HAIR_D = "#64230F";
const DRESS = "#2B3F7A";
const DRESS_D = "#1E2C58";
const APRON = "#F7F1E3";
const EMERALD = "#22D35B";
const EMERALD_D = "#0E9A3C";
const EMERALD_HI = "#9CFFB8";
const MAGENTA_A = "#C2186F";
const MAGENTA_B = "#5B1A8C";

const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const k = Math.max(0, Math.min(1, t));
  return "#" + pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, "0")).join("");
};

// one leaf, base at origin, pointing up (-y)
const Leaf: React.FC<{ len: number; w: number; rot: number; x?: number; y?: number; fill?: string; vein?: boolean }> = ({ len, w, rot, x = 0, y = 0, fill = EMERALD, vein = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 Q ${w} ${-len * 0.4} 0 ${-len} Q ${-w} ${-len * 0.4} 0 0 Z`} fill={fill} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {vein ? <path d={`M 0 -8 L 0 ${-len * 0.88}`} stroke={EMERALD_D} strokeWidth={5} strokeLinecap="round" /> : null}
    <path d={`M ${-w * 0.25} ${-len * 0.3} Q ${-w * 0.4} ${-len * 0.55} ${-w * 0.1} ${-len * 0.78}`} stroke={EMERALD_HI} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);

const Blossom: React.FC<{ x: number; y: number; r: number; c: string; f: number }> = ({ x, y, r, c, f }) => (
  <g transform={`translate(${x} ${y}) rotate(${Math.sin(f / 30 + x) * 6})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx={0} cy={-r * 0.62} rx={r * 0.48} ry={r * 0.62} transform={`rotate(${a})`} fill={c} stroke={INK} strokeWidth={5} />
    ))}
    <circle cx={0} cy={0} r={r * 0.3} fill={C.mustard} stroke={INK} strokeWidth={5} />
  </g>
);

// big emerald spray held at its stems (origin = where the hand grips)
const Bouquet: React.FC<{ f: number; s?: number; rot?: number }> = ({ f, s = 1, rot = 0 }) => {
  const sway = Math.sin(f / 18) * 3;
  const leaves: [number, number, number][] = [
    [-70, 330, 120], [-48, 380, 130], [-26, 420, 140], [-4, 450, 135], [18, 430, 140], [40, 390, 130], [62, 340, 120], [84, 280, 105],
    [-92, 270, 100], [-36, 300, 110], [8, 330, 115], [50, 290, 110],
  ];
  return (
    <g transform={`rotate(${rot + sway}) scale(${s})`}>
      {/* glow behind the leaves */}
      <ellipse cx={0} cy={-260} rx={330} ry={240} fill={EMERALD_HI} opacity={0.1 + Math.sin(f / 9) * 0.04} />
      {[-30, -10, 10, 30].map((dx) => (
        <path key={dx} d={`M ${dx * 0.3} 60 Q ${dx} -60 ${dx * 2.2} -200`} stroke="#3C7A2A" strokeWidth={10} fill="none" strokeLinecap="round" />
      ))}
      {leaves.map(([r, len, w], k) => (
        <Leaf key={k} rot={r * 1.15 + Math.sin(f / 14 + k) * 2.5} len={len * 0.66} w={w * 0.85} y={-60} fill={k % 3 === 0 ? "#2BE36A" : EMERALD} />
      ))}
      <Blossom x={-150} y={-250} r={54} c="#FFFFFF" f={f} />
      <Blossom x={120} y={-330} r={60} c="#FFD3E6" f={f} />
      <Blossom x={-20} y={-330} r={50} c="#FFFFFF" f={f} />
      <Blossom x={190} y={-160} r={46} c="#FFFFFF" f={f} />
      <Blossom x={-230} y={-120} r={44} c="#FFD3E6" f={f} />
      <Blossom x={40} y={-190} r={42} c="#FFE9A8" f={f} />
      {/* powder glitter on the leaves */}
      {new Array(26).fill(0).map((_, k) => (
        <circle key={k} cx={((k * 97) % 520) - 260} cy={-90 - ((k * 61) % 380)} r={4 + (k % 3) * 2} fill={EMERALD_HI} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 7 + k))} />
      ))}
    </g>
  );
};

// drifting arsenic dust: a constant shimmer + an optional puff that bursts toward camera from (bx, by)
const Dust: React.FC<{ f: number; n?: number; top?: number; bottom?: number; puffAt?: number; bx?: number; by?: number; o?: number }> = ({ f, n = 50, top = 200, bottom = 1700, puffAt = -1, bx = 540, by = 900, o = 0.8 }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const sp = 0.5 + ((k * 37) % 10) / 12;
      const h = bottom - top;
      const y = bottom - ((f * 1.4 * sp + k * 211) % h);
      const x = ((k * 263) % 1080) + Math.sin(f / 21 + k) * 36;
      const r = 3 + ((k * 13) % 7);
      return <circle key={k} cx={x} cy={y} r={r} fill={EMERALD_HI} opacity={o * (0.35 + 0.65 * Math.abs(Math.sin(f / 11 + k)))} />;
    })}
    {puffAt >= 0 && f >= puffAt
      ? new Array(46).fill(0).map((_, k) => {
          const age = f - puffAt;
          const a = (k / 46) * Math.PI * 2 + k;
          const sp = 6 + (k % 7) * 2.2;
          const d = Math.min(age, 40) * sp * (1 - Math.min(age, 40) / 90);
          const r = (6 + (k % 5) * 4) * (1 + age / 30);
          return (
            <circle key={`p${k}`} cx={bx + Math.cos(a) * d * 1.2} cy={by + Math.sin(a) * d * 0.7 - age * 2} r={r} fill={k % 2 ? EMERALD : EMERALD_HI}
              opacity={interpolate(age, [0, 4, 30, 55], [0, 0.85, 0.5, 0], clamp)} />
          );
        })
      : null}
  </>
);

// the flower girl, chest-up. origin = centre of the head.
// blow 0..1 pursed lips; sick 0..1 green pallor; eyes 0..1 green whites; hanky = handkerchief at the mouth; brush = raised dusting brush
const Girl: React.FC<{ x: number; y: number; s?: number; f: number; blow?: number; sick?: number; eyes?: number; hanky?: boolean; brush?: boolean; sepia?: boolean; worried?: boolean }> = ({
  x, y, s = 1, f, blow = 0, sick = 0, eyes = 0, hanky = false, brush = true, sepia = false, worried = true,
}) => {
  const sk = sepia ? "#DCC6A2" : mix(SKIN, "#C9D9A0", sick * 0.55);
  const skD = sepia ? "#C2A982" : SKIN_D;
  const hair = sepia ? "#9A7F58" : HAIR;
  const hairD = sepia ? "#7E6644" : HAIR_D;
  const dress = sepia ? "#8E7A5C" : DRESS;
  const dressD = sepia ? "#7A6649" : DRESS_D;
  const white = sepia ? "#EFE3CA" : mix("#FFFFFF", "#8FE36A", eyes);
  const blink = Math.floor(f) % 97 > 93 && eyes < 0.3;
  const bob = Math.sin(f / 22) * 4;
  const bx = Math.sin(f / 6) * 16; // brush flick
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
      {/* shoulders + dress */}
      <path d="M -330 760 L -330 400 Q -320 250 -170 215 L 170 215 Q 320 250 330 400 L 330 760 Z" fill={dress} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -120 215 Q 0 330 120 215" fill={APRON} stroke={INK} strokeWidth={7} />
      <path d="M -250 330 Q -230 520 -250 760 M 250 330 Q 230 520 250 760" stroke={dressD} strokeWidth={10} fill="none" />
      {/* apron bib with green smears */}
      <path d="M -170 380 L 170 380 L 190 760 L -190 760 Z" fill={APRON} stroke={INK} strokeWidth={7} />
      {!sepia ? (
        <>
          <path d="M -120 470 q 40 -20 70 10 q -30 30 -70 -10 Z" fill={EMERALD} opacity={0.75} />
          <path d="M 60 560 q 50 -10 70 30 q -40 20 -70 -30 Z" fill={EMERALD} opacity={0.6} />
          <circle cx={-40} cy={640} r={16} fill={EMERALD} opacity={0.6} />
        </>
      ) : null}
      {/* neck */}
      <rect x={-52} y={120} width={104} height={110} fill={sk} stroke={INK} strokeWidth={7} />
      <path d="M -60 210 Q 0 250 60 210" stroke={APRON} strokeWidth={22} fill="none" />
      {/* hair back */}
      <ellipse cx={0} cy={-30} rx={176} ry={178} fill={hairD} stroke={INK} strokeWidth={7} />
      {/* face */}
      <ellipse cx={0} cy={10} rx={150} ry={164} fill={sk} stroke={INK} strokeWidth={8} />
      {/* ears */}
      <ellipse cx={-150} cy={20} rx={22} ry={34} fill={sk} stroke={INK} strokeWidth={6} />
      <ellipse cx={150} cy={20} rx={22} ry={34} fill={sk} stroke={INK} strokeWidth={6} />
      {/* hair front: centre parting, swept to a bun */}
      <path d="M -160 -10 Q -170 -150 0 -168 Q 170 -150 160 -10 Q 130 -110 20 -120 L 0 -150 L -20 -120 Q -130 -110 -160 -10 Z" fill={hair} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={0} cy={-200} r={72} fill={hair} stroke={INK} strokeWidth={7} />
      <path d="M -40 -230 Q 0 -260 40 -230 M -50 -190 Q 0 -215 50 -190" stroke={hairD} strokeWidth={6} fill="none" />
      {/* eyes */}
      {blink ? (
        <path d="M -95 0 Q -62 14 -30 0 M 30 0 Q 62 14 95 0" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />
      ) : (
        <>
          <ellipse cx={-62} cy={-4} rx={36} ry={30} fill={white} stroke={INK} strokeWidth={6} />
          <ellipse cx={62} cy={-4} rx={36} ry={30} fill={white} stroke={INK} strokeWidth={6} />
          <circle cx={-56} cy={-2} r={15} fill="#3A2A1E" />
          <circle cx={68} cy={-2} r={15} fill="#3A2A1E" />
          <circle cx={-51} cy={-8} r={5} fill="#FFFFFF" />
          <circle cx={73} cy={-8} r={5} fill="#FFFFFF" />
        </>
      )}
      {/* brows */}
      {worried ? (
        <path d="M -104 -62 Q -70 -76 -32 -54 M 104 -62 Q 70 -76 32 -54" stroke={hairD} strokeWidth={10} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M -104 -56 Q -70 -70 -32 -60 M 104 -56 Q 70 -70 32 -60" stroke={hairD} strokeWidth={10} fill="none" strokeLinecap="round" />
      )}
      {/* nose + cheeks */}
      <path d="M 6 20 q -16 34 8 44" stroke={skD} strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={-92} cy={66} rx={30} ry={15} fill={sick > 0.4 ? "#9BC57A" : "#F08A7A"} opacity={0.4} />
      <ellipse cx={92} cy={66} rx={30} ry={15} fill={sick > 0.4 ? "#9BC57A" : "#F08A7A"} opacity={0.4} />
      {/* green dust on the cheek */}
      {!sepia ? <path d="M 70 90 q 30 -6 44 14" stroke={EMERALD} strokeWidth={10} strokeLinecap="round" opacity={0.6} /> : null}
      {/* mouth */}
      {blow > 0.2 ? (
        <ellipse cx={8} cy={104} rx={16} ry={20} fill="#6A2A22" stroke={INK} strokeWidth={6} />
      ) : (
        <path d={worried ? "M -30 112 Q 6 96 42 112" : "M -30 102 Q 6 122 42 102"} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      )}
      {/* handkerchief at the mouth */}
      {hanky ? (
        <g transform="translate(-10 120) rotate(-8)">
          <path d="M -110 -40 L 90 -50 L 110 80 L -90 90 Z" fill="#FBF7EE" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M -20 0 q 30 -16 50 6 q -10 26 -50 -6 Z" fill={EMERALD} opacity={0.7} />
          <path d="M -150 140 Q -120 40 -90 60 L -60 150 Z" fill={sk} stroke={INK} strokeWidth={6} />
        </g>
      ) : null}
      {/* dusting brush raised in the right hand */}
      {brush ? (
        <g transform={`translate(${250 + bx} -40) rotate(${-20 + bx * 0.6})`}>
          <rect x={-14} y={0} width={28} height={230} rx={12} fill="#9A6A3C" stroke={INK} strokeWidth={6} />
          <path d="M -34 0 L 34 0 L 26 -90 Q 0 -110 -26 -90 Z" fill={sepia ? "#BBA57E" : EMERALD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <ellipse cx={0} cy={235} rx={46} ry={40} fill={sk} stroke={INK} strokeWidth={6} />
          {!sepia ? <circle cx={-18} cy={225} r={10} fill={EMERALD} opacity={0.8} /> : null}
        </g>
      ) : null}
    </g>
  );
};

// tin of pigment with a skull: the hazard as an object
const Tin: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-6 + Math.sin(f / 25) * 1.5})`}>
    <rect x={-120} y={-150} width={240} height={190} rx={14} fill="#B9C2C6" stroke={INK} strokeWidth={7} />
    <ellipse cx={0} cy={-150} rx={120} ry={26} fill={EMERALD} stroke={INK} strokeWidth={7} />
    <rect x={-104} y={-110} width={208} height={120} rx={8} fill="#F6F0DC" stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-74} r={24} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <circle cx={-9} cy={-78} r={6} fill={INK} />
    <circle cx={9} cy={-78} r={6} fill={INK} />
    <path d="M -36 -36 L 36 -60 M -36 -60 L 36 -36" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <text x={0} y={-6} textAnchor="middle" fontFamily={titleFont} fontSize={22} fill={EMERALD_D}>EMERALD GREEN</text>
  </g>
);

// a waltzing lady in an emerald crinoline + green wreath, partner in a tailcoat. origin = floor between them
const Couple: React.FC<{ x: number; y: number; s?: number; f: number; phase?: number }> = ({ x, y, s = 1, f, phase = 0 }) => {
  const t = f / 16 + phase;
  const sw = Math.sin(t) * 10;
  const skirtW = 260 + Math.sin(t * 2) * 18;
  return (
    <g transform={`translate(${x + Math.sin(t) * 30} ${y}) scale(${s}) rotate(${sw * 0.4})`}>
      <ellipse cx={0} cy={6} rx={300} ry={30} fill="#000000" opacity={0.22} />
      {/* gentleman */}
      <g transform="translate(110 0)">
        <rect x={-40} y={-330} width={34} height={330} fill={INK} />
        <rect x={10} y={-330} width={34} height={330} fill={INK} />
        <path d="M -60 -330 L -70 -600 Q 0 -640 70 -600 L 60 -330 Z" fill="#1F1F2A" stroke={INK} strokeWidth={6} />
        <path d="M 40 -340 L 90 -200 L 50 -330 Z" fill="#1F1F2A" stroke={INK} strokeWidth={5} />
        <path d="M -20 -600 L 0 -520 L 20 -600" fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={0} cy={-680} r={58} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -58 -690 Q -50 -750 0 -748 Q 50 -750 58 -690 Q 20 -720 -58 -690 Z" fill="#2A1A10" stroke={INK} strokeWidth={5} />
        <path d="M -60 -560 Q -140 -520 -170 -470" stroke="#1F1F2A" strokeWidth={34} strokeLinecap="round" fill="none" />
      </g>
      {/* lady */}
      <g transform="translate(-80 0)">
        <path d={`M ${-skirtW} 0 Q ${-skirtW * 0.7} -260 -50 -380 L 50 -380 Q ${skirtW * 0.7} -260 ${skirtW} 0 Z`} fill={EMERALD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-0.6, -0.2, 0.2, 0.6].map((k) => (
          <path key={k} d={`M ${k * 60} -370 Q ${k * skirtW * 0.8} -180 ${k * skirtW * 1.05} -4`} stroke={EMERALD_D} strokeWidth={6} fill="none" />
        ))}
        {[-0.75, -0.25, 0.25, 0.75].map((k, i) => (
          <Leaf key={i} x={k * skirtW * 0.9} y={-60} rot={k * 30} len={70} w={26} vein={false} />
        ))}
        <path d="M -50 -380 L -60 -560 Q 0 -590 60 -560 L 50 -380 Z" fill={EMERALD} stroke={INK} strokeWidth={6} />
        <rect x={-18} y={-610} width={36} height={50} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-660} r={56} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -58 -660 Q -60 -730 0 -726 Q 60 -730 58 -660 Q 30 -700 -58 -660 Z" fill="#5A2A14" stroke={INK} strokeWidth={5} />
        {/* the green wreath */}
        {[-60, -35, -10, 15, 40, 65].map((a, i) => (
          <Leaf key={i} x={Math.sin((a * Math.PI) / 180) * 62} y={-700 - Math.cos((a * Math.PI) / 180) * 30} rot={a} len={50} w={20} vein={false} fill={i % 2 ? EMERALD : "#2BE36A"} />
        ))}
        <path d="M 50 -540 Q 120 -520 150 -470" stroke={SKIN} strokeWidth={22} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
};

const Ballroom: React.FC<{ f: number }> = ({ f }) => (
  <>
    <defs>
      <linearGradient id="ep071ball" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4A1460" />
        <stop offset="0.6" stopColor={MAGENTA_A} />
        <stop offset="1" stopColor="#7A0E44" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep071ball)" />
    {/* tall gilded windows */}
    {[90, 420, 750].map((x) => (
      <g key={x}>
        <path d={`M ${x} 1120 L ${x} 640 Q ${x + 120} 520 ${x + 240} 640 L ${x + 240} 1120 Z`} fill="#FFB5DA" opacity={0.25} stroke={C.mustard} strokeWidth={8} />
      </g>
    ))}
    {/* chandelier */}
    <g transform={`translate(540 360) rotate(${Math.sin(f / 30) * 2})`}>
      <line x1={0} y1={-200} x2={0} y2={0} stroke={C.mustard} strokeWidth={8} />
      <path d="M -220 40 Q 0 160 220 40" stroke={C.mustard} strokeWidth={12} fill="none" />
      {[-200, -100, 0, 100, 200].map((dx) => (
        <g key={dx}>
          <rect x={dx - 8} y={20 + Math.abs(dx) * -0.2 + 40} width={16} height={40} fill="#FFF6D6" stroke={INK} strokeWidth={3} />
          <ellipse cx={dx} cy={50 + Math.abs(dx) * -0.2 + 30} rx={12} ry={20} fill={C.glow} opacity={0.6 + Math.sin(f / 4 + dx) * 0.3} />
        </g>
      ))}
      <circle cx={0} cy={60} r={200} fill={C.glow} opacity={0.14} />
    </g>
    {/* floor */}
    <rect x={0} y={1180} width={1080} height={740} fill="#3A0E30" />
    {new Array(10).fill(0).map((_, k) => (
      <path key={k} d={`M ${-400 + k * 190} 1920 L ${440 + k * 20} 1180`} stroke="#5A1A48" strokeWidth={6} />
    ))}
    <path d="M 0 1180 L 1080 1180" stroke={INK} strokeWidth={8} />
    <Couple x={300} y={1360} s={0.62} f={f} phase={1.4} />
    <Couple x={780} y={1340} s={0.58} f={f} phase={3.1} />
    <Couple x={560} y={1700} s={0.9} f={f} phase={0} />
    {/* sparkles */}
    {new Array(22).fill(0).map((_, k) => (
      <circle key={k} cx={(k * 149) % 1080} cy={300 + ((k * 211) % 900)} r={3 + (k % 3) * 2} fill="#FFFFFF" opacity={Math.max(0, Math.sin(f / 6 + k * 1.7))} />
    ))}
  </>
);

// worker girl at the table seen from the front (smaller, simpler than Girl)
const TableGirl: React.FC<{ x: number; y: number; s: number; f: number; k: number }> = ({ x, y, s, f, k }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Girl x={0} y={0} f={f + k * 23} brush={true} worried={true} sick={0.15 + k * 0.1} />
  </g>
);

const Workshop: React.FC<{ f: number; dur: number; cloud: number }> = ({ f, dur, cloud }) => {
  const grow = cloud * interpolate(f, [0, Math.max(30, dur * 0.85)], [0.35, 1], { ...clamp, easing: Easing.out(Easing.quad) });
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#1C4E5A" />
      {/* wallpaper stripes + gas lamp */}
      {new Array(9).fill(0).map((_, k) => (
        <rect key={k} x={k * 130} y={0} width={44} height={1200} fill="#24606C" />
      ))}
      <circle cx={540} cy={420} r={280} fill={C.glow} opacity={0.16} />
      <path d="M 520 300 L 560 300 L 580 380 L 500 380 Z" fill={C.glow} stroke={INK} strokeWidth={6} />
      <rect x={532} y={200} width={16} height={100} fill={INK} />
      {/* three girls behind the table */}
      <TableGirl x={220} y={860} s={0.55} f={f} k={0} />
      <TableGirl x={860} y={860} s={0.55} f={f} k={2} />
      <TableGirl x={540} y={900} s={0.62} f={f} k={1} />
      {/* the long table */}
      <rect x={-20} y={1170} width={1120} height={70} fill="#7A2E22" stroke={INK} strokeWidth={8} />
      <rect x={-20} y={1240} width={1120} height={680} fill="#5A1E16" />
      <path d="M 120 1240 L 120 1920 M 960 1240 L 960 1920" stroke={INK} strokeWidth={10} />
      {/* heaps of dusted leaves on the table */}
      {[110, 260, 420, 600, 760, 930].map((x, i) => (
        <g key={x}>
          {[-30, 0, 30].map((r, j) => (
            <Leaf key={j} x={x + j * 30 - 30} y={1185} rot={r + Math.sin(f / 20 + i + j) * 3} len={90 + ((i + j) % 3) * 16} w={34} fill={j % 2 ? "#2BE36A" : EMERALD} />
          ))}
        </g>
      ))}
      {/* the green cloud: the hazard drawn as a big object */}
      <g opacity={0.55} transform={`translate(540 1060) scale(${grow})`}>
        {[[-300, -40, 170], [-120, -150, 210], [80, -120, 220], [280, -30, 170], [0, 30, 230], [-200, 60, 150], [220, 70, 150]].map(([cx, cy, r], k) => (
          <circle key={k} cx={cx + Math.sin(f / 23 + k) * 20} cy={cy - f * 0.6 + Math.cos(f / 19 + k) * 14} r={r} fill={k % 2 ? EMERALD : EMERALD_HI} />
        ))}
      </g>
      <Dust f={f} n={60} top={500} bottom={1300} o={0.9} />
    </>
  );
};

const MARKET_COLS = ["#FF4F8B", "#FFD23F", "#FFFFFF", "#B46CFF", "#FF7A3D", "#FF9EC7"];
const Shelf: React.FC<{ y: number; f: number; seed: number; s?: number }> = ({ y, f, seed, s = 1 }) => (
  <g transform={`translate(0 ${y}) scale(1 ${s})`}>
    <rect x={0} y={0} width={1080} height={24} fill="#D8DCE2" stroke={INK} strokeWidth={5} />
    {new Array(11).fill(0).map((_, k) => {
      const x = 50 + k * 98;
      return (
        <g key={k}>
          <Leaf x={x - 20} y={0} rot={-30} len={70} w={26} vein={false} fill="#3FCB6A" />
          <Leaf x={x + 20} y={0} rot={30} len={70} w={26} vein={false} fill="#3FCB6A" />
          <Blossom x={x} y={-80} r={44} c={MARKET_COLS[(k + seed) % MARKET_COLS.length]} f={f} />
          <Blossom x={x + 40} y={-40} r={30} c={MARKET_COLS[(k + seed + 2) % MARKET_COLS.length]} f={f} />
        </g>
      );
    })}
  </g>
);

const Market: React.FC<{ f: number; ghost: number }> = ({ f, ghost }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#FFF2F7" />
    {/* fluorescent tubes */}
    {[160, 400, 640].map((y) => (
      <g key={y}>
        <rect x={160} y={y - 120} width={760} height={18} rx={9} fill="#FFFFFF" stroke="#C9CDD4" strokeWidth={4} />
      </g>
    ))}
    {/* shop sign */}
    <g transform="translate(540 545)">
      <rect x={-330} y={-60} width={660} height={110} rx={14} fill="#E3175F" stroke={INK} strokeWidth={7} />
      <text x={0} y={18} textAnchor="middle" fontFamily={titleFont} fontSize={56} fill="#FFFFFF">FAKE FLOWERS</text>
    </g>
    {/* sepia ghost of the Victorian girl behind the racks */}
    {ghost > 0 ? (
      <g opacity={ghost * 0.4 * interpolate(f, [10, 40], [0, 1], clamp)}>
        <Girl x={540} y={760} s={0.95} f={f} brush={false} sepia worried />
      </g>
    ) : null}
    <Shelf y={730} f={f} seed={0} />
    <Shelf y={960} f={f} seed={2} />
    <Shelf y={1190} f={f} seed={4} />
    <Shelf y={1420} f={f} seed={1} />
    <Shelf y={1650} f={f} seed={3} />
    {/* price tags */}
    {[[180, 760], [600, 990], [860, 1220], [330, 1450]].map(([x, y], k) => (
      <g key={k} transform={`translate(${x} ${y}) rotate(${Math.sin(f / 15 + k) * 8})`}>
        <line x1={0} y1={0} x2={0} y2={30} stroke={INK} strokeWidth={3} />
        <rect x={-46} y={30} width={92} height={50} rx={8} fill={C.mustard} stroke={INK} strokeWidth={4} />
        <text x={0} y={66} textAnchor="middle" fontFamily={typeFont} fontSize={30} fill={INK}>SALE</text>
      </g>
    ))}
  </>
);

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 400 }) => (
  <>
    {items.map((t, i) => {
      const at = 4 + i * Math.max(10, (dur - 18) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 1.0, fontFamily: typeFont, fontSize: 54, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const MagentaBg: React.FC = () => (
  <>
    <defs>
      <radialGradient id="ep071mag" cx="0.5" cy="0.42" r="0.85">
        <stop offset="0" stopColor="#FF4FA0" />
        <stop offset="0.55" stopColor={MAGENTA_A} />
        <stop offset="1" stopColor={MAGENTA_B} />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep071mag)" />
  </>
);

export const ArsenicFlowers: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "hook";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;

  if (mode === "hook" || mode === "girl") {
    const blowAt: number = v.blowAt ?? (mode === "hook" ? 0.35 : -1);
    const puffF = blowAt >= 0 ? Math.round(blowAt * dur) : -1;
    const blowing = puffF >= 0 && f >= puffF - 8 && f < puffF + 14 ? 1 : 0;
    const eyesR: [number, number] = v.eyes ?? [0, 0];
    const eyes = interpolate(f, [dur * (v.eyesAt ?? 0.2), dur * 0.8], eyesR, clamp);
    const showBouquet = v.bouquet !== false;
    const gx: number = v.gx ?? 540;
    const gy: number = v.gy ?? 800;
    body = (
      <>
        <MagentaBg />
        <Dust f={f} n={40} top={300} bottom={1700} o={0.7} />
        <Girl x={gx} y={gy} s={v.scale ?? 1} f={f} blow={blowing} sick={v.sick ?? 0} eyes={eyes} hanky={!!v.hanky} brush={v.brush !== false} />
        {showBouquet ? (
          <g transform={`translate(${gx - 40} ${gy + 690})`}>
            <Bouquet f={f} s={1.2} rot={-8} />
            <ellipse cx={0} cy={40} rx={70} ry={56} fill={SKIN} stroke={INK} strokeWidth={6} />
          </g>
        ) : null}
        {v.tin !== false ? <Tin x={v.tinX ?? 220} y={v.tinY ?? 1440} s={v.tinS ?? 1} f={f} /> : null}
        <Dust f={f} n={0} puffAt={puffF} bx={gx + 10} by={gy + 140} />
        <defs>
          <radialGradient id="ep071vig" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0.6" stopColor="#1A0020" stopOpacity={0} />
            <stop offset="1" stopColor="#1A0020" stopOpacity={0.45} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep071vig)" />
      </>
    );
  } else if (mode === "ballroom") {
    body = <Ballroom f={f} />;
  } else if (mode === "workshop") {
    body = <Workshop f={f} dur={dur} cloud={v.cloud ?? 1} />;
  } else if (mode === "market") {
    body = <Market f={f} ghost={v.ghost ?? 0.9} />;
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline key={v.headline} text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 400} />
    </Backdrop>
  );
};
