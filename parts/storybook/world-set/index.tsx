import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";
import { C, bodyFont, typeFont } from "../style/index";
import { Waves, Flames } from "../world-sky/index";

// Settings for the World scene (SceneParts, 5 Nov 2026). Each set draws a background ("back"),
// optional layers between props and the hero ("mid") and over the hero ("front"), and the default hero placement (x, y, s, pose).
const INK = C.ink;
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ctx = { f: number; dur: number; v: Record<string, any> };
export type SetDef = {
  sky: string;
  hero?: Record<string, unknown>;
  back: (c: Ctx) => React.ReactNode;
  mid?: (c: Ctx) => React.ReactNode;
  front?: (c: Ctx) => React.ReactNode;
  rain?: boolean;
  snow?: boolean;
  ash?: boolean;
};

const Ground: React.FC<{ y: number; color: string; hill?: number; seed?: string; stroke?: boolean }> = ({ y, color, hill = 30, seed = "g", stroke = true }) => {
  const pts: string[] = [];
  for (let x = -80; x <= 1160; x += 80) pts.push(`${x} ${(y + Math.sin(x / 160 + random(seed) * 6) * hill).toFixed(1)}`);
  return <path d={`M -80 1920 L ${pts.join(" L ")} L 1160 1920 Z`} fill={color} stroke={stroke ? INK : "none"} strokeWidth={5} />;
};

// --- sailing ship (galleon / carrack / Mayflower style). Origin = waterline centre ---
export const Galleon: React.FC<{ f: number; x?: number; y?: number; s?: number; broken?: boolean; sail?: string; hull?: string; flag?: string; children?: React.ReactNode }> = ({ f, x = 540, y = 1250, s = 1, broken = false, sail = "#F4EAD5", hull = "#6B4226", flag = "#C8102E", children }) => {
  const billow = Math.sin(f / 12) * 8;
  const mast = (mx: number, h: number, k: number) => (
    <g key={k}>
      <rect x={mx - 9} y={-h} width={18} height={h} fill="#4A2E18" stroke={INK} strokeWidth={4} />
      {!broken || k !== 1 ? (
        <>
          <path d={`M ${mx - 120} ${-h + 40} Q ${mx + billow} ${-h + 70} ${mx + 120} ${-h + 40} L ${mx + 110} ${-h + 170} Q ${mx + billow} ${-h + 200} ${mx - 110} ${-h + 170} Z`} fill={sail} stroke={INK} strokeWidth={5} />
          <path d={`M ${mx - 100} ${-h + 200} Q ${mx + billow} ${-h + 230} ${mx + 100} ${-h + 200} L ${mx + 90} ${-h + 320} Q ${mx + billow} ${-h + 345} ${mx - 90} ${-h + 320} Z`} fill={sail} stroke={INK} strokeWidth={5} />
        </>
      ) : null}
      <path d={`M ${mx} ${-h} L ${mx + 70} ${-h + 18 + Math.sin(f / 5) * 6} L ${mx} ${-h + 34}`} fill={flag} stroke={INK} strokeWidth={3} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {mast(-200, 560, 0)}
      {mast(20, 660, 1)}
      {mast(230, 500, 2)}
      <path d="M -420 -150 L -330 -260 L -200 -170 L 250 -170 L 330 -230 L 430 -170 L 360 30 L -360 30 Z" fill={hull} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -390 -110 L 400 -110" stroke="#C9A36A" strokeWidth={10} />
      {[-280, -180, -80, 20, 120, 220].map((gx) => <rect key={gx} x={gx} y={-80} width={36} height={30} fill="#2A1A10" stroke={INK} strokeWidth={3} />)}
      <path d="M 430 -170 L 560 -210" stroke="#4A2E18" strokeWidth={14} />
      {children}
    </g>
  );
};

// --- four-funnel liner (Lusitania) ---
export const Liner: React.FC<{ f: number; tilt: number }> = ({ f, tilt }) => (
  <g transform={`translate(560 1250) rotate(${tilt}) scale(0.78)`}>
    {[-330, -140, 50, 240].map((fx, i) => (
      <g key={i} transform={`translate(${fx} -250) skewX(-8)`}>
        <rect x={-42} y={-220} width={84} height={230} fill="#1A1A1A" stroke={INK} strokeWidth={6} />
        <rect x={-42} y={-60} width={84} height={70} fill="#B5452F" stroke={INK} strokeWidth={6} />
        <circle cx={10} cy={-240 - ((f * 2 + i * 17) % 60)} r={18 + ((f * 2 + i * 17) % 60) / 3} fill="#5A5E6B" opacity={0.45} />
      </g>
    ))}
    <path d="M -560 -250 L 470 -250 L 450 -190 L -540 -190 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
    <path d="M -720 -190 L 700 -190 L 760 -200 L 660 30 L -640 30 Q -700 -60 -720 -190 Z" fill="#15171F" stroke={INK} strokeWidth={7} />
    {new Array(30).fill(0).map((_, i) => <circle key={i} cx={-660 + i * 45} cy={-110} r={8} fill={random(`lq${i}`) < 0.6 ? C.glow : "#3A3A3A"} />)}
  </g>
);

const Houses: React.FC<{ era: string; f: number; fire?: number }> = ({ era, f, fire = 0 }) => {
  const wall = era === "victorian" ? "#8E5A44" : era === "colonial" ? "#B8A07A" : "#E9DCC0";
  const beam = era === "victorian" ? "#5A3A2A" : "#4A2E18";
  const left = [0, 1, 2];
  return (
    <g>
      {left.map((i) => {
        const x = i * 120;
        const h = 760 - i * 120;
        const top = 1500 - h;
        return (
          <g key={`l${i}`}>
            <path d={`M ${x} ${top} L ${x + 150} ${top + 70} L ${x + 150} ${1500 - i * 20} L ${x} 1500 Z`} fill={wall} stroke={INK} strokeWidth={6} />
            <path d={`M ${x - 20} ${top + 10} L ${x + 75} ${top - 140} L ${x + 170} ${top + 76} Z`} fill={era === "colonial" ? "#5A4A3A" : "#8A3A2A"} stroke={INK} strokeWidth={6} />
            {era !== "victorian" && <path d={`M ${x + 10} ${top + 160} L ${x + 140} ${top + 210} M ${x + 75} ${top + 40} L ${x + 75} ${1490}`} stroke={beam} strokeWidth={12} />}
            <rect x={x + 40} y={top + 240} width={60} height={80} fill={fire ? "#F2B544" : "#3A4A6A"} stroke={INK} strokeWidth={5} />
          </g>
        );
      })}
      {left.map((i) => {
        const x = 1080 - i * 120;
        const h = 760 - i * 120;
        const top = 1500 - h;
        return (
          <g key={`r${i}`}>
            <path d={`M ${x} ${top} L ${x - 150} ${top + 70} L ${x - 150} ${1500 - i * 20} L ${x} 1500 Z`} fill={wall} stroke={INK} strokeWidth={6} />
            <path d={`M ${x + 20} ${top + 10} L ${x - 75} ${top - 140} L ${x - 170} ${top + 76} Z`} fill={era === "colonial" ? "#5A4A3A" : "#8A3A2A"} stroke={INK} strokeWidth={6} />
            {era !== "victorian" && <path d={`M ${x - 10} ${top + 160} L ${x - 140} ${top + 210} M ${x - 75} ${top + 40} L ${x - 75} ${1490}`} stroke={beam} strokeWidth={12} />}
            <rect x={x - 100} y={top + 240} width={60} height={80} fill={fire ? "#F2B544" : "#3A4A6A"} stroke={INK} strokeWidth={5} />
          </g>
        );
      })}
      {fire ? <g opacity={0.9}><Flames f={f} y={900} level={fire * 0.9} x0={-20} x1={300} /><Flames f={f + 7} y={960} level={fire * 0.8} x0={800} x1={1100} /></g> : null}
    </g>
  );
};

const Cobbles: React.FC<{ y0: number }> = ({ y0 }) => (
  <g>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill="#8A7F6D" />
    {new Array(9).fill(0).map((_, r) => (
      <path key={r} d={`M 0 ${y0 + 30 + r * 50} L 1080 ${y0 + 30 + r * 50}`} stroke="#6E6556" strokeWidth={4} />
    ))}
  </g>
);

const Pines: React.FC<{ y: number; n?: number; color?: string; seed?: string; snowy?: boolean }> = ({ y, n = 9, color = "#2E4A3A", seed = "p", snowy }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const x = (i + 0.5) * (1080 / n) + (random(seed + i) - 0.5) * 60;
      const h = 220 + random(seed + "h" + i) * 180;
      return (
        <g key={i}>
          <path d={`M ${x - h * 0.32} ${y} L ${x} ${y - h} L ${x + h * 0.32} ${y} Z`} fill={color} stroke={INK} strokeWidth={5} />
          {snowy && <path d={`M ${x - h * 0.12} ${y - h * 0.6} L ${x} ${y - h} L ${x + h * 0.12} ${y - h * 0.6} Z`} fill="#FFFFFF" />}
        </g>
      );
    })}
  </g>
);

const Soldiers: React.FC<{ f: number; y: number; n?: number }> = ({ f, y, n = 9 }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => {
      const x = ((i * 130 + f * 1.2) % 1300) - 110;
      return (
        <g key={i} transform={`translate(${x} ${y + (i % 3) * 12}) scale(0.55)`} opacity={0.85}>
          <path d="M -40 0 L -30 -200 L 30 -200 L 40 0 Z" fill="#3A3F52" stroke={INK} strokeWidth={6} />
          <circle cx={0} cy={-240} r={40} fill="#C9A090" stroke={INK} strokeWidth={5} />
          <path d="M -40 -270 L 0 -330 L 40 -270 Z" fill="#1F1B18" stroke={INK} strokeWidth={5} />
          <path d="M 30 -190 L 70 -380" stroke="#5A4A33" strokeWidth={10} />
        </g>
      );
    })}
  </g>
);

export const SETS: Record<string, SetDef> = {
  sea: {
    sky: "night",
    hero: { y: 1760, s: 1.05, pose: "hug", face: "cold", shiver: true, wet: true },
    back: ({ f, v }) => (
      <g>
        {v.ship === "liner" ? <Liner f={f} tilt={v.shipTilt ?? 8} /> : v.ship === "galleon" ? <Galleon f={f} y={1250} s={0.55} x={760} /> : null}
        <Waves y={1250} f={f} color="#16294A" amp={8} seed="far" />
      </g>
    ),
    front: ({ f }) => (
      <>
        <Waves y={1330} f={f} />
        <Waves y={1450} f={f} color="#16294A" amp={10} seed="near" />
      </>
    ),
  },
  galleon: {
    sky: "day",
    hero: { x: 430, y: 1078, s: 0.36, pose: "panic", face: "panic" },
    back: ({ f, v }) => (
      <g>
        <Waves y={1180} f={f} color="#2B5D8A" amp={8} seed="gf" />
        <Galleon f={f} y={1250} s={v.shipScale ?? 0.9} broken={!!v.broken} sail={v.sail} hull={v.hull} flag={v.flag} />
      </g>
    ),
    front: ({ f, v }) => (
      <>
        <Waves y={v.seaY ?? 1270} f={f} color="#1E4A70" />
        <Waves y={(v.seaY ?? 1270) + 110} f={f} color="#2B5D8A" amp={10} seed="g2" />
      </>
    ),
  },
  liner: {
    sky: "day",
    hero: { x: 260, y: 1010, s: 0.34, pose: "panic", face: "panic" },
    back: ({ f, v }) => <Liner f={f} tilt={v.shipTilt ?? 0} />,
    front: ({ f }) => (
      <>
        <Waves y={1270} f={f} color="#1E4A70" />
        <Waves y={1380} f={f} color="#2B5D8A" amp={10} seed="l2" />
      </>
    ),
  },
  deck: {
    sky: "day",
    hero: { x: 470, y: 1620, s: 0.95 },
    back: ({ f, v }) => (
      <g>
        <Waves y={1020} f={f} color={v.night ? "#16294A" : "#2B5D8A"} amp={6} seed="dk" />
        <rect x={0} y={1230} width={1080} height={690} fill="#9A7348" />
        {new Array(12).fill(0).map((_, i) => <path key={i} d={`M 0 ${1260 + i * 56} L 1080 ${1260 + i * 56}`} stroke="#7A5634" strokeWidth={5} />)}
        <path d="M 0 1140 L 1080 1140" stroke="#5A3A22" strokeWidth={22} />
        {new Array(12).fill(0).map((_, i) => <rect key={i} x={i * 95 + 10} y={1140} width={18} height={90} fill="#5A3A22" />)}
        <rect x={830} y={0} width={50} height={1240} fill="#4A2E18" stroke={INK} strokeWidth={5} />
        <path d="M 855 120 L 60 1140 M 855 300 L 1080 900 M 855 120 L 1080 600" stroke="#3A2A1A" strokeWidth={6} />
      </g>
    ),
    front: ({ v }) =>
      v.netting ? (
        <g opacity={0.9}>
          {new Array(16).fill(0).map((_, i) => <path key={`a${i}`} d={`M ${i * 80 - 300} 600 L ${i * 80 + 500} 1400`} stroke="#3A2A1A" strokeWidth={6} />)}
          {new Array(16).fill(0).map((_, i) => <path key={`b${i}`} d={`M ${i * 80 + 300} 600 L ${i * 80 - 500} 1400`} stroke="#3A2A1A" strokeWidth={6} />)}
        </g>
      ) : null,
  },
  boat: {
    sky: "day",
    hero: { x: 420, y: 1500, s: 0.62, pose: "hold", face: "worried" },
    back: ({ f }) => <Waves y={1180} f={f} color="#2B5D8A" amp={8} seed="bb" />,
    mid: ({ f, v }) => (
      <g>
        {new Array(v.crew ?? 4).fill(0).map((_, i) => (
          <g key={i} transform={`translate(${560 + i * 85} ${1420 + Math.sin(f / 9) * 6}) scale(0.6)`}>
            <path d="M -50 0 Q -56 -120 -40 -190 L 40 -190 Q 56 -120 50 0 Z" fill={["#5A6B8C", "#7A4E3A", "#4E6B4A", "#8C5A6B"][i % 4]} stroke={INK} strokeWidth={5} />
            <circle cx={0} cy={-232} r={44} fill="#E8B990" stroke={INK} strokeWidth={5} />
          </g>
        ))}
      </g>
    ),
    front: ({ f, v }) => (
      <g>
        <g transform={`translate(540 ${1460 + Math.sin(f / 9) * 6})`}>
          <path d={v.raft ? "M -420 -30 L 420 -30 L 400 30 L -400 30 Z" : "M -420 -60 L 420 -60 Q 380 70 0 90 Q -380 70 -420 -60 Z"} fill={v.raft ? "#9A7348" : "#8A5A2B"} stroke={INK} strokeWidth={7} />
          {v.raft && new Array(9).fill(0).map((_, i) => <path key={i} d={`M ${-380 + i * 95} -30 L ${-380 + i * 95} 30`} stroke="#6B4A2B" strokeWidth={6} />)}
          {!v.raft && <path d="M -400 -40 L 400 -40" stroke="#C9A36A" strokeWidth={8} />}
        </g>
        <Waves y={1500} f={f} color="#1E4A70" />
        <Waves y={1600} f={f} color="#2B5D8A" amp={10} seed="b2" />
      </g>
    ),
  },
  ice: {
    sky: "snow",
    hero: { x: 540, y: 1640, s: 0.95, pose: "hug", face: "cold", shiver: true },
    back: ({ f, v }) => (
      <g>
        <path d="M -40 1180 L 160 980 L 300 1120 L 480 900 L 640 1100 L 800 960 L 1120 1180 Z" fill="#E6EEF5" stroke={INK} strokeWidth={5} />
        <Ground y={1220} color="#F4F8FB" hill={14} seed="ice" />
        <path d="M 120 1400 L 300 1460 L 380 1420 M 700 1330 L 860 1400 L 980 1380" stroke="#A9C6DA" strokeWidth={6} fill="none" />
        {v.ship && (
          <g transform={`translate(${v.shipX ?? 780} 1260) rotate(${v.shipTilt ?? -14}) scale(0.5)`}>
            <Galleon f={f} x={0} y={0} broken={!!v.broken} sail="#C9C2B0" hull="#2A2A30" flag="#1F3A6B" />
            <rect x={-500} y={-10} width={1000} height={80} fill="#F4F8FB" />
          </g>
        )}
      </g>
    ),
    snow: true,
  },
  street: {
    sky: "night",
    hero: { x: 540, y: 1650, s: 0.95 },
    back: ({ f, v }) => (
      <g>
        {v.skyline && <path d="M 300 900 L 300 760 L 360 760 L 360 700 L 420 640 L 480 700 L 480 760 L 600 760 L 600 600 Q 640 520 680 600 L 680 760 L 780 760 L 780 900 Z" fill="#2A3150" opacity={0.8} />}
        <Cobbles y0={1480} />
        <Houses era={v.era ?? "medieval"} f={f} fire={v.houseFire} />
      </g>
    ),
  },
  court: {
    sky: "dusk",
    hero: { x: 540, y: 1700, s: 0.95, pose: "shrug", face: "worried" },
    back: () => (
      <g>
        <rect x={0} y={0} width={1080} height={1920} fill="#7A5A3A" />
        {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 - 20} y={300} width={110} height={1100} fill="#6B4A2B" stroke={INK} strokeWidth={4} />)}
        <rect x={0} y={1000} width={1080} height={180} fill="#4A2E18" stroke={INK} strokeWidth={6} />
        {[300, 540, 780].map((x, i) => (
          <g key={i} transform={`translate(${x} 1000) scale(0.85)`}>
            <path d="M -70 0 Q -80 -160 -50 -230 L 50 -230 Q 80 -160 70 0 Z" fill="#1F1B18" stroke={INK} strokeWidth={5} />
            <rect x={-30} y={-240} width={60} height={30} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
            <circle cx={0} cy={-285} r={52} fill="#E8C4A8" stroke={INK} strokeWidth={5} />
            <path d="M -60 -300 Q -70 -360 0 -365 Q 70 -360 60 -300 Q 70 -230 50 -220 L 40 -300 L -40 -300 L -50 -220 Q -70 -230 -60 -300 Z" fill="#EDEDED" stroke={INK} strokeWidth={4} />
            <path d="M -18 -290 L -8 -290 M 8 -290 L 18 -290 M -16 -262 L 16 -262" stroke={INK} strokeWidth={5} />
          </g>
        ))}
        <rect x={0} y={1460} width={1080} height={460} fill="#5A3A22" />
        <rect x={250} y={1450} width={580} height={36} fill="#3A2416" stroke={INK} strokeWidth={5} />
      </g>
    ),
  },
  trench: {
    sky: "storm",
    hero: { x: 540, y: 1660, s: 0.95, pose: "hug", face: "worried", shiver: true },
    back: ({ f }) => (
      <g>
        <path d="M 0 700 L 1080 700" stroke="#2A2A2A" strokeWidth={4} />
        {new Array(8).fill(0).map((_, i) => <path key={i} d={`M ${i * 140} 690 l 40 -40 l 30 50 l 40 -40`} stroke="#2A2A2A" strokeWidth={5} fill="none" />)}
        <path d="M 0 760 L 260 900 L 260 1520 L 0 1700 Z" fill="#5A4632" stroke={INK} strokeWidth={6} />
        <path d="M 1080 760 L 820 900 L 820 1520 L 1080 1700 Z" fill="#5A4632" stroke={INK} strokeWidth={6} />
        {new Array(6).fill(0).map((_, i) => (
          <g key={i}>
            <rect x={-10 + i * 46} y={720 + i * 26} width={120} height={50} rx={18} fill="#B8A07A" stroke={INK} strokeWidth={4} />
            <rect x={970 - i * 46} y={720 + i * 26} width={120} height={50} rx={18} fill="#B8A07A" stroke={INK} strokeWidth={4} />
          </g>
        ))}
        <rect x={260} y={1520} width={560} height={400} fill="#4A3A2A" />
        {new Array(7).fill(0).map((_, i) => <rect key={i} x={280 + i * 76} y={1560} width={56} height={360} fill="#8A6A45" stroke={INK} strokeWidth={4} />)}
        <ellipse cx={540} cy={1600 + Math.sin(f / 20) * 2} rx={260} ry={26} fill="#6E7E8E" opacity={0.6} />
      </g>
    ),
    rain: true,
  },
  underwater: {
    sky: "murk",
    hero: { x: 540, y: 1300, s: 0.9, pose: "swim", face: "panic" },
    back: ({ f }) => (
      <g>
        {[200, 480, 760].map((x, i) => <path key={i} d={`M ${x} 0 L ${x + 140} 0 L ${x + 300} 1400 L ${x + 60} 1400 Z`} fill="#FFFFFF" opacity={0.06 + 0.03 * Math.sin(f / 15 + i)} />)}
        <Ground y={1720} color="#C9B48A" hill={20} seed="sand" />
        {new Array(14).fill(0).map((_, i) => <circle key={i} cx={(random(`bx${i}`) * 1080)} cy={1700 - ((f * 3 + random(`by${i}`) * 1700) % 1700)} r={6 + random(`bs${i}`) * 10} fill="none" stroke="#BFE3F2" strokeWidth={3} />)}
      </g>
    ),
  },
  frontier: {
    sky: "day",
    hero: { x: 540, y: 1660, s: 0.95, walk: true, pose: "stand", face: "worried" },
    back: ({ f, v }) => (
      <g>
        <path d="M -40 1100 L 160 820 L 300 980 L 460 760 L 640 1000 L 820 800 L 1120 1100 Z" fill="#6E7FA0" stroke={INK} strokeWidth={5} />
        <path d="M 400 830 L 460 760 L 520 830 Z M 760 870 L 820 800 L 880 870 Z" fill="#FFFFFF" />
        <Ground y={1150} color="#8FA35A" hill={24} seed="pr" />
        {v.river && <path d={`M -40 1400 Q 300 ${1340 + Math.sin(f / 20) * 10} 540 1420 Q 800 1500 1120 1380 L 1120 1520 Q 800 1620 540 1540 Q 300 1460 -40 1530 Z`} fill="#4F8FC0" stroke={INK} strokeWidth={5} />}
        <Ground y={1560} color="#7A8F48" hill={16} seed="pr2" />
        {v.fort && (
          <g transform="translate(780 1240) scale(0.8)">
            {new Array(9).fill(0).map((_, i) => <path key={i} d={`M ${-240 + i * 60} 0 L ${-240 + i * 60} -220 L ${-210 + i * 60} -260 L ${-180 + i * 60} -220 L ${-180 + i * 60} 0 Z`} fill="#8A6A45" stroke={INK} strokeWidth={5} />)}
          </g>
        )}
        {v.pines && <Pines y={1200} n={7} seed="fp" />}
      </g>
    ),
  },
  volcano: {
    sky: "ash",
    hero: { x: 540, y: 1660, s: 0.95, pose: "panic", face: "panic", walk: false },
    back: ({ f, dur }) => {
      const plume = interpolate(f, [0, dur], [0.85, 1.05], clamp);
      return (
        <g>
          <g transform={`translate(540 640) scale(${plume})`}>
            {new Array(7).fill(0).map((_, i) => <circle key={i} cx={(i - 3) * 90 + Math.sin(f / 15 + i) * 12} cy={-120 - (i % 3) * 110} r={150 + (i % 2) * 50} fill="#4A3F3A" stroke={INK} strokeWidth={5} />)}
          </g>
          <path d="M 60 1200 L 420 720 L 660 720 L 1020 1200 Z" fill="#5A4A3E" stroke={INK} strokeWidth={6} />
          <path d="M 420 720 L 480 760 L 540 720 L 600 770 L 660 720" fill="#E5383B" stroke={INK} strokeWidth={4} />
          <Ground y={1250} color="#8A7A62" hill={10} seed="vg" />
          {[120, 330, 760, 960].map((x, i) => (
            <g key={i} transform={`translate(${x} 1440)`}>
              <rect x={-90} y={-160} width={180} height={160} fill="#E9D7B4" stroke={INK} strokeWidth={5} />
              <path d="M -110 -160 L 0 -230 L 110 -160 Z" fill="#B5452F" stroke={INK} strokeWidth={5} />
              {[-50, 0, 50].map((cx) => <rect key={cx} x={cx - 10} y={-150} width={20} height={150} fill="#F4EAD5" stroke={INK} strokeWidth={3} />)}
            </g>
          ))}
          <rect x={0} y={1480} width={1080} height={440} fill="#9A8C76" />
        </g>
      );
    },
    ash: true,
  },
  island: {
    sky: "night",
    hero: { x: 300, y: 1560, s: 0.6, pose: "hold", face: "worried" },
    back: ({ f }) => {
      const beam = Math.sin(f / 20) * 40;
      return (
        <g>
          <path d="M 0 1040 L 1080 1040" stroke="#2A3150" strokeWidth={4} />
          {new Array(18).fill(0).map((_, i) => <circle key={i} cx={i * 64 + 20} cy={1030 - (i % 4) * 6} r={4} fill={C.glow} opacity={0.7} />)}
          <path d={`M 690 760 L ${300 + beam * 8} 1250 L ${560 + beam * 8} 1250 Z`} fill="#FFF7D6" opacity={0.12} />
          <path d="M 420 1180 Q 600 900 940 1180 Z" fill="#4A4E5E" stroke={INK} strokeWidth={6} />
          <rect x={560} y={930} width={300} height={150} fill="#B9B4A8" stroke={INK} strokeWidth={5} />
          {new Array(6).fill(0).map((_, i) => <rect key={i} x={575 + i * 48} y={960} width={22} height={40} fill="#2A2A30" />)}
          <rect x={670} y={760} width={40} height={180} fill="#E9E4D8" stroke={INK} strokeWidth={5} />
          <circle cx={690} cy={760} r={22} fill={C.glow} />
          <Waves y={1180} f={f} color="#0B1830" amp={12} seed="is" />
          <Waves y={1320} f={f} color="#16294A" amp={14} seed="is2" />
        </g>
      );
    },
  },
  winter: {
    sky: "snow",
    hero: { x: 540, y: 1660, s: 0.95, pose: "hug", face: "cold", shiver: true, walk: true },
    back: ({ f, v }) => (
      <g>
        <Pines y={1150} n={10} color="#3A5244" seed="wp" snowy />
        <Ground y={1150} color="#F4F8FB" hill={18} seed="ws" />
        {v.river && <path d="M -40 1330 L 1120 1300 L 1120 1440 L -40 1470 Z" fill="#4F6F8F" stroke={INK} strokeWidth={5} />}
        {v.bridge && <path d="M 100 1330 L 980 1300" stroke="#6B4A2B" strokeWidth={30} />}
        {v.army !== false && <Soldiers f={f} y={1300} n={v.army ?? 9} />}
      </g>
    ),
    snow: true,
  },
  space: {
    sky: "space",
    hero: { x: 540, y: 1500, s: 0.85, pose: "hug", face: "cold", shiver: true },
    back: ({ f, v }) => (
      <g>
        <circle cx={880} cy={420} r={130} fill="#C9C9C9" stroke={INK} strokeWidth={5} />
        <circle cx={840} cy={390} r={22} fill="#A9A9A9" />
        <circle cx={160} cy={1520} r={360} fill="#2E6FB0" stroke={INK} strokeWidth={6} />
        <path d="M 40 1400 Q 140 1300 240 1420 Q 300 1500 220 1600 Q 120 1580 40 1400 Z" fill="#5A9A5A" />
        {v.capsule !== false && (
          <g transform={`translate(560 ${980 + Math.sin(f / 20) * 10}) rotate(${Math.sin(f / 30) * 6})`}>
            <path d="M -120 120 L -40 -120 L 40 -120 L 120 120 Z" fill="#D9DCE0" stroke={INK} strokeWidth={7} />
            <rect x={-130} y={120} width={260} height={170} fill="#B9BEC4" stroke={INK} strokeWidth={7} />
            <rect x={-40} y={-60} width={80} height={60} rx={10} fill="#2A3150" stroke={INK} strokeWidth={5} />
            {v.damaged && <path d="M 60 170 L 140 150 L 110 220 L 170 260" stroke="#E5383B" strokeWidth={10} fill="none" />}
            {v.damaged && new Array(6).fill(0).map((_, i) => <circle key={i} cx={150 + ((f * 3 + i * 30) % 200)} cy={200 + Math.sin(i) * 60} r={10} fill="#E9EEF2" opacity={0.7} />)}
          </g>
        )}
      </g>
    ),
  },
  bridge: {
    sky: "storm",
    hero: { x: 540, y: 1700, s: 0.7, pose: "panic", face: "panic" },
    back: ({ f, v }) => (
      <g>
        <rect x={0} y={1250} width={1080} height={670} fill="#2E4058" />
        <Waves y={1260} f={f} color="#2E4058" amp={16} seed="tb" />
        {new Array(7).fill(0).map((_, i) => {
          const x = i * 170 - 20;
          const broken = v.broken && i >= 2 && i <= 4;
          return (
            <g key={i}>
              <rect x={x + 60} y={1000} width={40} height={300} fill="#5A4A3E" stroke={INK} strokeWidth={5} />
              {!broken && <path d={`M ${x} 980 L ${x + 170} 980 L ${x + 170} 860 L ${x} 860 Z M ${x} 980 L ${x + 170} 860 M ${x} 860 L ${x + 170} 980`} fill="none" stroke="#3A3F52" strokeWidth={10} />}
            </g>
          );
        })}
        {!v.broken && (
          <g transform={`translate(${interpolate(f, [0, 120], [-500, 600], clamp)} 960)`}>
            <rect x={0} y={-60} width={300} height={60} fill="#1F2A1F" stroke={INK} strokeWidth={5} />
            <rect x={240} y={-110} width={60} height={50} fill="#1F2A1F" stroke={INK} strokeWidth={5} />
            {[60, 140, 220].map((wx) => <rect key={wx} x={wx} y={-50} width={40} height={26} fill={C.glow} />)}
          </g>
        )}
      </g>
    ),
    rain: true,
  },
  flood: {
    sky: "storm",
    hero: { x: 540, y: 1300, s: 0.6, pose: "panic", face: "panic" },
    back: ({ f }) => (
      <g>
        {[100, 330, 560, 790, 1000].map((x, i) => (
          <g key={i} transform={`translate(${x} 1250) rotate(${Math.sin(f / 10 + i) * 2})`}>
            <rect x={-100} y={-260} width={200} height={260} fill={["#E9DCC0", "#C9B48A", "#E9D7B4", "#B8A07A", "#E9DCC0"][i]} stroke={INK} strokeWidth={5} />
            <path d="M -120 -260 L 0 -360 L 120 -260 Z" fill="#6B4A2B" stroke={INK} strokeWidth={5} />
            <rect x={-30} y={-200} width={60} height={60} fill="#3A4A6A" stroke={INK} strokeWidth={4} />
          </g>
        ))}
        {i18(f)}
      </g>
    ),
    rain: true,
  },
  airship: {
    sky: "dusk",
    hero: { x: 540, y: 1700, s: 0.8, pose: "panic", face: "panic" },
    back: ({ f, v, dur }) => {
      const burn = v.burn ? interpolate(f, [0, dur], [0.2, 1], clamp) : 0;
      return (
        <g>
          <Ground y={1500} color="#6E7E5A" hill={6} seed="af" />
          <rect x={900} y={700} width={36} height={800} fill="#6B6E78" stroke={INK} strokeWidth={5} />
          <g transform={`translate(520 ${820 + (v.burn ? interpolate(f, [0, dur], [0, 220], clamp) : 0)}) rotate(${v.burn ? interpolate(f, [0, dur], [0, 12], clamp) : 0})`}>
            <ellipse cx={0} cy={0} rx={470} ry={120} fill="#B9BEC4" stroke={INK} strokeWidth={7} />
            {new Array(9).fill(0).map((_, i) => <path key={i} d={`M ${-420 + i * 105} -110 Q ${-410 + i * 105} 0 ${-420 + i * 105} 110`} stroke="#8E949C" strokeWidth={4} fill="none" />)}
            <path d="M -420 -60 L -520 -170 L -470 -10 Z M -420 60 L -520 170 L -470 10 Z" fill="#8E949C" stroke={INK} strokeWidth={5} />
            <rect x={-40} y={110} width={140} height={40} rx={10} fill="#5A5E6B" stroke={INK} strokeWidth={4} />
            {burn > 0 && (
              <g opacity={0.95}>
                {new Array(10).fill(0).map((_, i) => {
                  const x = -460 + i * 60 * burn * 1.6;
                  return <circle key={i} cx={x} cy={Math.sin(f / 3 + i) * 40} r={70 + 30 * Math.sin(f / 2 + i)} fill={i % 2 ? "#F2B544" : "#E5383B"} />;
                })}
              </g>
            )}
          </g>
        </g>
      );
    },
  },
  sickroom: {
    sky: "night",
    hero: { x: 470, y: 1790, s: 0.78, pose: "hug", face: "worried", sick: true },
    back: () => (
      <g>
        <rect x={0} y={0} width={1080} height={1920} fill="#C9B48A" />
        <rect x={0} y={1400} width={1080} height={520} fill="#7A5A3A" />
        <rect x={640} y={420} width={280} height={360} fill="#1B2A4D" stroke={INK} strokeWidth={10} />
        <path d="M 780 420 L 780 780 M 640 600 L 920 600" stroke={INK} strokeWidth={10} />
      </g>
    ),
    front: () => (
      <g transform="translate(540 1600)">
        <path d="M -360 -150 Q 0 -210 360 -150 L 360 40 L -360 40 Z" fill="#8FA6C9" stroke={INK} strokeWidth={7} />
        <rect x={-380} y={40} width={760} height={60} fill="#6B4A2B" stroke={INK} strokeWidth={6} />
      </g>
    ),
  },
  tower: {
    sky: "day",
    hero: { x: 540, y: 1620, s: 0.6, pose: "panic", face: "panic" },
    back: ({ f, v, dur }) => {
      const fall = v.fall ? interpolate(f, [0, dur], [0, 1], clamp) : 0;
      return (
        <g>
          {[100, 250, 830, 980].map((x, i) => <rect key={i} x={x - 70} y={900 + (i % 2) * 120} width={140} height={1100} fill="#8E949C" stroke={INK} strokeWidth={4} opacity={0.7} />)}
          <path d="M 380 1920 L 380 520 L 420 520 L 420 380 L 460 380 L 460 240 L 500 240 L 520 80 L 540 40 L 560 80 L 580 240 L 620 240 L 620 380 L 660 380 L 660 520 L 700 520 L 700 1920 Z" fill="#C9C2B0" stroke={INK} strokeWidth={7} />
          {new Array(26).fill(0).map((_, r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={400 + c * 72} y={560 + r * 52} width={30} height={30} fill="#3A4A6A" />))}
          {v.fog && <rect x={0} y={200} width={1080} height={500} fill="#E9EEF2" opacity={0.65} />}
          {v.shaft && (
            <g>
              <rect x={480} y={420} width={120} height={1500} fill="#2A2A30" stroke={C.mustard} strokeWidth={6} />
              <g transform={`translate(540 ${480 + fall * 1200})`}>
                <rect x={-50} y={-70} width={100} height={140} fill="#B5452F" stroke={INK} strokeWidth={5} />
                <circle cx={0} cy={-20} r={20} fill="#E8B990" stroke={INK} strokeWidth={3} />
              </g>
              <text x={540} y={400} textAnchor="middle" fontFamily={typeFont} fontSize={42} fill={INK}>75 FLOORS</text>
            </g>
          )}
        </g>
      );
    },
  },
};

// flood helper: rising water handled by visual.water; this adds debris
function i18(f: number) {
  return (
    <g>
      {new Array(5).fill(0).map((_, i) => (
        <rect key={i} x={((i * 260 + f * 2) % 1200) - 60} y={1300 + (i % 2) * 60} width={140} height={20} rx={6} fill="#6B4A2B" stroke={INK} strokeWidth={4} transform={`rotate(${i * 17})`} />
      ))}
    </g>
  );
}

export const SET_NAMES = Object.keys(SETS);

/** A whole world setting (sea, galleon, liner deck, trench, volcano, space…) drawn behind the characters.
 *  Pair with storybook/world-set-front for the layer in front of them (waves over a swimmer, smoke, railings). */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const set = SETS[p.set] ?? SETS.sea;
  const { f, d, t: _t, style: _s, render: _r, ...v } = p;
  const tilt = v.tilt ? interpolate(f, [0, d], v.tilt, { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const sinkY = v.sink ? interpolate(f, [0, d], v.sink, { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  return (
    <g>
      <g transform={`translate(0 ${sinkY})`}>
        <g transform={`rotate(${tilt} 540 1300)`}>{set.back({ f, dur: d, v })}</g>
      </g>
      {p.mid !== false && set.mid ? set.mid({ f, dur: d, v }) : null}
    </g>
  );
}
