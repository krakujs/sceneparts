import React from "react";
import { interpolate, random, type PartProps } from "@sceneparts/core";
import { C, bodyFont, typeFont } from "../style/index";
import { Doctor } from "../plague-doctor/index";

// Prop library for the World scene (SceneParts, 5 Nov 2026). All own drawings.
// { kind, x, y, s?, r?, flip?, text?, color?, n?, front?, bob?, drift?: [dx, dy] (moves over the scene), at?: 0..1 (pops in) }
const INK = C.ink;
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropSpec = { kind: string; x: number; y: number; s?: number; r?: number; flip?: boolean; text?: string; color?: string; n?: number; front?: boolean; bob?: boolean; drift?: [number, number]; at?: number; [k: string]: any };

const Person: React.FC<{ f: number; seed: string; color?: string; hat?: string; s?: number }> = ({ f, seed, color, hat, s = 1 }) => {
  const col = color ?? ["#5A6B8C", "#7A4E3A", "#4E6B4A", "#8C5A6B", "#6B5A3A"][Math.floor(random(seed) * 5)];
  const bob = Math.sin(f / 9 + random(seed) * 6) * 3;
  return (
    <g transform={`scale(${s}) translate(0 ${bob})`}>
      <path d="M -50 0 Q -56 -120 -40 -190 L 40 -190 Q 56 -120 50 0 Z" fill={col} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-232} r={44} fill={random(seed + "k") > 0.5 ? "#E8B990" : "#C99169"} stroke={INK} strokeWidth={5} />
      <circle cx={-14} cy={-236} r={5} fill={INK} />
      <circle cx={14} cy={-236} r={5} fill={INK} />
      {hat === "tricorn" && <path d="M -60 -262 L 0 -300 L 60 -262 Q 0 -250 -60 -262 Z" fill="#2A2420" stroke={INK} strokeWidth={4} />}
      {hat === "cap" && <path d="M -46 -258 Q 0 -300 46 -258 Z" fill="#3A3F52" stroke={INK} strokeWidth={4} />}
      {hat === "helmet" && <path d="M -62 -250 Q 0 -320 62 -250 Z" fill="#6B6E4E" stroke={INK} strokeWidth={4} />}
      {hat === "bonnet" && <path d="M -52 -230 Q -56 -290 0 -292 Q 56 -290 52 -230 Q 30 -270 0 -272 Q -30 -270 -52 -230 Z" fill="#F4EAD5" stroke={INK} strokeWidth={4} />}
      {hat === "puritan" && <><rect x={-34} y={-330} width={68} height={60} fill="#1F1B18" stroke={INK} strokeWidth={4} /><rect x={-60} y={-276} width={120} height={14} rx={6} fill="#1F1B18" /><rect x={-34} y={-290} width={68} height={10} fill={C.mustard} /></>}
    </g>
  );
};

const draw: Record<string, (p: PropSpec, f: number) => React.ReactNode> = {
  crowd: (p, f) => (
    <g>
      {new Array(p.n ?? 5).fill(0).map((_, i) => (
        <g key={i} transform={`translate(${(i - ((p.n ?? 5) - 1) / 2) * (p.gap ?? 90)} ${(i % 2) * 18})`}>
          <Person f={f} seed={`${p.seed ?? "c"}${i}`} hat={p.hat} color={p.color} s={p.ps ?? 0.8} />
        </g>
      ))}
    </g>
  ),
  person: (p, f) => <Person f={f} seed={p.seed ?? "p"} hat={p.hat} color={p.color} />,
  doctor: (p, f) => <Doctor x={0} y={0} s={1} f={f} walk={!!p.walk} stick={0.4} />,
  rat: (_p, f) => (
    <g transform={`translate(${Math.sin(f / 4) * 6} 0)`}>
      <ellipse cx={0} cy={-30} rx={70} ry={34} fill="#6B625A" stroke={INK} strokeWidth={5} />
      <circle cx={64} cy={-44} r={26} fill="#6B625A" stroke={INK} strokeWidth={5} />
      <circle cx={56} cy={-70} r={14} fill="#C99A9A" stroke={INK} strokeWidth={4} />
      <circle cx={76} cy={-48} r={5} fill={INK} />
      <path d="M -66 -30 Q -140 -10 -150 -70" stroke="#C99A9A" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  ),
  flea: (_p, f) => (
    <g transform={`translate(0 ${-Math.abs(Math.sin(f / 3)) * 40})`}>
      <ellipse cx={0} cy={0} rx={26} ry={18} fill="#5A3A22" stroke={INK} strokeWidth={4} />
      <path d="M -10 14 l -16 26 M 6 14 l 12 28 M 14 10 l 26 18" stroke={INK} strokeWidth={4} />
    </g>
  ),
  barrel: () => (
    <g>
      <path d="M -60 0 Q -78 -90 -60 -180 L 60 -180 Q 78 -90 60 0 Z" fill="#9A6A3A" stroke={INK} strokeWidth={6} />
      <path d="M -70 -40 L 70 -40 M -74 -140 L 74 -140" stroke="#4A4E5E" strokeWidth={10} />
    </g>
  ),
  biscuit: () => (
    <g>
      <rect x={-60} y={-60} width={120} height={120} rx={14} fill="#D9B27A" stroke={INK} strokeWidth={5} />
      {[-30, 0, 30].map((a) => [-30, 0, 30].map((b) => <circle key={`${a}${b}`} cx={a} cy={b} r={5} fill="#8A6A3A" />))}
      <path d="M 20 -40 q 10 -6 16 2 M -30 20 q 8 -8 14 0" stroke="#4A3A22" strokeWidth={4} fill="none" />
    </g>
  ),
  iceberg: () => (
    <g>
      <path d="M -160 0 L -110 -120 L -60 -90 L -10 -230 L 50 -150 L 90 -180 L 160 0 Z" fill="#DCEBF5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -10 -230 L 10 -60 L 50 -150" stroke="#A9C6DA" strokeWidth={6} fill="none" />
    </g>
  ),
  tent: (_p, f) => (
    <g>
      <path d="M -170 0 L 0 -230 L 170 0 Z" fill="#C9B48A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -230 L -30 0 L 30 0 Z" fill="#5A4A33" stroke={INK} strokeWidth={5} />
      <path d={`M 0 -230 L 0 -300 L ${60 + Math.sin(f / 5) * 8} -285 L 0 -270`} fill="#E5383B" stroke={INK} strokeWidth={4} />
    </g>
  ),
  flag: (p, f) => (
    <g>
      <rect x={-6} y={-300} width={12} height={300} fill="#5A4A33" stroke={INK} strokeWidth={3} />
      <path d={`M 6 -300 Q 60 ${-310 + Math.sin(f / 4) * 10} 130 -295 L 130 -215 Q 60 ${-230 + Math.sin(f / 4) * 10} 6 -220 Z`} fill={p.color ?? "#C8102E"} stroke={INK} strokeWidth={4} />
      {p.cross && <path d="M 50 -298 L 50 -222 M 6 -262 L 130 -258" stroke="#FFFFFF" strokeWidth={12} />}
    </g>
  ),
  pump: () => (
    <g>
      <rect x={-40} y={-260} width={80} height={260} rx={10} fill="#2F3A4A" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={-280} r={36} fill="#2F3A4A" stroke={INK} strokeWidth={6} />
      <path d="M 40 -200 L 140 -250" stroke="#2F3A4A" strokeWidth={22} strokeLinecap="round" />
      <path d="M -40 -150 L -90 -150 L -90 -125" stroke="#2F3A4A" strokeWidth={18} fill="none" />
      <rect x={-130} y={-60} width={120} height={60} rx={8} fill="#6B5A3A" stroke={INK} strokeWidth={5} />
    </g>
  ),
  mug: () => (
    <g>
      <rect x={-50} y={-120} width={100} height={120} rx={10} fill="#C98A2B" stroke={INK} strokeWidth={6} />
      <path d="M -54 -120 Q -60 -160 -20 -150 Q 0 -175 25 -150 Q 60 -160 54 -120 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      <path d="M 50 -95 Q 95 -90 90 -50 Q 85 -20 50 -25" stroke={INK} strokeWidth={14} fill="none" />
    </g>
  ),
  candle: (_p, f) => (
    <g>
      <rect x={-20} y={-120} width={40} height={120} fill="#F4EAD5" stroke={INK} strokeWidth={4} />
      <path d={`M 0 -120 Q ${-18 + Math.sin(f / 3) * 4} -150 0 -185 Q ${18 + Math.sin(f / 3) * 4} -150 0 -120 Z`} fill={C.mustard} stroke={INK} strokeWidth={3} />
      <circle cx={0} cy={-150} r={70} fill={C.glow} opacity={0.18} />
    </g>
  ),
  shark: (p, f) => (
    <g transform={`translate(${Math.sin(f / 10) * 30} ${Math.sin(f / 7) * 8})`}>
      <path d="M -260 0 Q -60 -110 200 -30 L 260 -60 L 240 0 L 260 60 L 200 30 Q -60 100 -260 0 Z" fill="#6E7E8E" stroke={INK} strokeWidth={7} />
      <path d="M -20 -70 L 30 -170 L 70 -60 Z" fill="#6E7E8E" stroke={INK} strokeWidth={6} />
      <path d="M -260 0 Q -60 60 160 20" fill="#E9EEF2" opacity={0.9} />
      <circle cx={-170} cy={-20} r={10} fill={INK} />
      {p.bite && <path d="M -250 16 l 14 12 l 14 -12 l 14 12 l 14 -12 l 14 12" stroke="#FFF" strokeWidth={6} fill="none" />}
    </g>
  ),
  fin: (_p, f) => (
    <g transform={`translate(${((f * 4) % 600) - 300} 0)`}>
      <path d="M -40 0 L 10 -120 L 50 0 Z" fill="#6E7E8E" stroke={INK} strokeWidth={6} />
    </g>
  ),
  sign: (p) => (
    <g transform={`rotate(${p.tiltSign ?? -3})`}>
      <rect x={-6} y={0} width={12} height={p.post ?? 160} fill="#5A4A33" />
      <rect x={-((p.w ?? 360) / 2)} y={-110} width={p.w ?? 360} height={110} rx={10} fill={p.color ?? "#C9A36A"} stroke={INK} strokeWidth={6} />
      <text x={0} y={-40} textAnchor="middle" fontFamily={typeFont} fontSize={p.fs ?? 52} fill={INK}>{p.text}</text>
    </g>
  ),
  carved: (p) => (
    <g>
      <rect x={-60} y={-520} width={120} height={520} fill="#8A6A45" stroke={INK} strokeWidth={6} />
      <path d="M -60 -520 L 0 -580 L 60 -520" fill="#8A6A45" stroke={INK} strokeWidth={6} />
      {String(p.text ?? "").split("").map((ch, i) => (
        <text key={i} x={0} y={-460 + i * 54} textAnchor="middle" fontFamily={typeFont} fontSize={50} fill="#3A2A1A">{ch}</text>
      ))}
    </g>
  ),
  lifeboat: (p, f) => (
    <g transform={`translate(0 ${Math.sin(f / 9) * 6})`}>
      <path d="M -220 -40 L 220 -40 Q 190 60 0 70 Q -190 60 -220 -40 Z" fill={p.color ?? "#F4EAD5"} stroke={INK} strokeWidth={7} />
      <rect x={-224} y={-52} width={448} height={20} rx={8} fill="#8A5A2B" stroke={INK} strokeWidth={5} />
    </g>
  ),
  buoy: () => (
    <g>
      <circle cx={0} cy={0} r={70} fill="#E5383B" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={0} r={34} fill="#0B1830" stroke={INK} strokeWidth={5} />
      {[0, 90, 180, 270].map((a) => <rect key={a} x={-12} y={-70} width={24} height={36} fill="#FFF" transform={`rotate(${a})`} />)}
    </g>
  ),
  thermo: (p) => (
    <g>
      <rect x={-26} y={-300} width={52} height={300} rx={26} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={10} r={44} fill="#4FA3E0" stroke={INK} strokeWidth={6} />
      <rect x={-12} y={-(p.level ?? 0.25) * 280} width={24} height={(p.level ?? 0.25) * 280 + 10} fill="#4FA3E0" />
    </g>
  ),
  skulltag: (p) => (
    <g>
      <rect x={-120} y={-50} width={240} height={100} rx={16} fill={C.cream} stroke={INK} strokeWidth={6} />
      <text x={0} y={18} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={48} fill="#E5383B">{p.text}</text>
    </g>
  ),
  cross: () => (
    <g>
      <rect x={-90} y={-260} width={180} height={260} fill="#6B4A2B" stroke={INK} strokeWidth={6} />
      <path d="M 0 -240 L 0 -20 M -70 -150 L 70 -150" stroke="#C8102E" strokeWidth={26} />
    </g>
  ),
  bed: () => (
    <g>
      <rect x={-300} y={-120} width={600} height={120} rx={14} fill="#F4EAD5" stroke={INK} strokeWidth={7} />
      <rect x={-320} y={-260} width={30} height={300} fill="#6B4A2B" stroke={INK} strokeWidth={5} />
      <rect x={290} y={-180} width={30} height={220} fill="#6B4A2B" stroke={INK} strokeWidth={5} />
      <path d="M -260 -120 Q 0 -170 280 -120 L 280 -40 L -260 -40 Z" fill="#8FA6C9" stroke={INK} strokeWidth={6} />
    </g>
  ),
  lancet: () => (
    <g>
      <rect x={-8} y={-160} width={16} height={120} rx={6} fill="#B9B9C2" stroke={INK} strokeWidth={4} />
      <path d="M -8 -160 L 0 -210 L 8 -160 Z" fill="#E9EEF2" stroke={INK} strokeWidth={3} />
    </g>
  ),
  cow: (_p, f) => (
    <g transform={`translate(0 ${Math.sin(f / 12) * 2})`}>
      <ellipse cx={0} cy={-150} rx={170} ry={90} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <ellipse cx={-40} cy={-170} rx={50} ry={34} fill={INK} />
      <ellipse cx={60} cy={-130} rx={40} ry={28} fill={INK} />
      <path d="M -120 -80 L -120 0 M -60 -70 L -60 0 M 60 -70 L 60 0 M 120 -80 L 120 0" stroke={INK} strokeWidth={22} />
      <ellipse cx={190} cy={-190} rx={60} ry={50} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <ellipse cx={220} cy={-170} rx={30} ry={22} fill="#F2B5B5" stroke={INK} strokeWidth={4} />
      <circle cx={180} cy={-205} r={7} fill={INK} />
    </g>
  ),
  dummy: () => (
    <g>
      <rect x={-150} y={-60} width={300} height={60} rx={20} fill="#8FA6C9" stroke={INK} strokeWidth={6} />
      <circle cx={-110} cy={-70} r={46} fill="#E8B990" stroke={INK} strokeWidth={5} />
      <path d="M -150 -90 Q -110 -130 -70 -96" stroke="#3A2A1A" strokeWidth={16} fill="none" />
      <path d="M -126 -70 L -112 -70 M -100 -70 L -88 -70" stroke={INK} strokeWidth={4} />
    </g>
  ),
  raincoatraft: (_p, f) => (
    <g transform={`translate(0 ${Math.sin(f / 8) * 6})`}>
      <path d="M -200 0 Q -220 -60 -150 -70 L 150 -70 Q 220 -60 200 0 Q 0 40 -200 0 Z" fill="#E8C64A" stroke={INK} strokeWidth={6} />
      {[-120, -40, 40, 120].map((x) => <path key={x} d={`M ${x} -66 L ${x + 10} 10`} stroke="#B8962A" strokeWidth={5} />)}
    </g>
  ),
  tape: () => (
    <g>
      <circle cx={0} cy={0} r={70} fill="#A9B0B8" stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={0} r={32} fill="#1A1F2B" stroke={INK} strokeWidth={5} />
      <path d="M 60 30 L 160 70 L 150 100 L 50 60 Z" fill="#A9B0B8" stroke={INK} strokeWidth={5} />
    </g>
  ),
  bear: (_p, f) => (
    <g transform={`translate(0 ${Math.sin(f / 6) * 3})`}>
      <ellipse cx={0} cy={-170} rx={160} ry={120} fill="#6B4A2B" stroke={INK} strokeWidth={7} />
      <circle cx={130} cy={-260} r={80} fill="#6B4A2B" stroke={INK} strokeWidth={7} />
      <circle cx={100} cy={-330} r={26} fill="#6B4A2B" stroke={INK} strokeWidth={5} />
      <circle cx={170} cy={-330} r={26} fill="#6B4A2B" stroke={INK} strokeWidth={5} />
      <ellipse cx={175} cy={-240} rx={34} ry={24} fill="#C9A36A" stroke={INK} strokeWidth={4} />
      <circle cx={140} cy={-280} r={8} fill={INK} />
      <path d="M -100 -60 L -100 0 M 90 -60 L 90 0" stroke={INK} strokeWidth={40} strokeLinecap="round" />
    </g>
  ),
  canoe: (_p, f) => (
    <g transform={`translate(0 ${Math.sin(f / 9) * 5})`}>
      <path d="M -300 -30 Q 0 60 300 -30 Q 0 20 -300 -30 Z" fill="#8A5A2B" stroke={INK} strokeWidth={7} />
    </g>
  ),
  fireball: (p, f) => (
    <g>
      {new Array(7).fill(0).map((_, i) => {
        const a = (i / 7) * Math.PI * 2 + f / 10;
        const r = (p.r2 ?? 120) * (0.7 + 0.3 * Math.sin(f / 3 + i));
        return <circle key={i} cx={Math.cos(a) * r * 0.6} cy={Math.sin(a) * r * 0.4} r={r * 0.7} fill={i % 2 ? "#F2B544" : "#E5383B"} opacity={0.85} />;
      })}
    </g>
  ),
  coin: (_p, f) => (
    <g transform={`scale(${Math.abs(Math.cos(f / 6))} 1)`}>
      <circle cx={0} cy={0} r={60} fill={C.mustard} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={0} r={40} fill="none" stroke="#B8862A" strokeWidth={5} />
    </g>
  ),
  bubble: (p) => (
    <g>
      <rect x={-((p.w ?? 380) / 2)} y={-120} width={p.w ?? 380} height={110} rx={30} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <path d="M -20 -12 L 0 30 L 20 -12 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <rect x={-18} y={-20} width={36} height={14} fill="#FFFFFF" />
      <text x={0} y={-48} textAnchor="middle" fontFamily={bodyFont} fontWeight={900} fontSize={p.fs ?? 46} fill={INK}>{p.text}</text>
    </g>
  ),
  dog: (_p, f) => (
    <g transform={`translate(0 ${-Math.abs(Math.sin(f / 4)) * 8})`}>
      <ellipse cx={0} cy={-80} rx={90} ry={46} fill="#9A7A5A" stroke={INK} strokeWidth={6} />
      <circle cx={90} cy={-120} r={42} fill="#9A7A5A" stroke={INK} strokeWidth={6} />
      <path d="M 70 -160 L 80 -200 L 100 -158 Z" fill="#6B4A2B" stroke={INK} strokeWidth={4} />
      <circle cx={104} cy={-124} r={6} fill={INK} />
      <path d="M -60 -40 L -60 0 M 50 -40 L 50 0" stroke={INK} strokeWidth={18} />
      <path d={`M -88 -90 Q -130 ${-130 + Math.sin(f / 2) * 20} -120 -150`} stroke="#9A7A5A" strokeWidth={14} fill="none" strokeLinecap="round" />
    </g>
  ),
};

export const Prop: React.FC<{ p: PropSpec; f: number; dur: number }> = ({ p, f, dur }) => {
  const fn = draw[p.kind];
  if (!fn) return null;
  const at = Math.round((p.at ?? 0) * dur);
  if (f < at) return null;
  const pop = p.at ? interpolate(f - at, [0, 8], [0.5, 1], clamp) : 1;
  const [dx, dy] = p.drift ? [interpolate(f, [0, dur], [0, p.drift[0]], clamp), interpolate(f, [0, dur], [0, p.drift[1]], clamp)] : [0, 0];
  const bob = p.bob ? Math.sin(f / 8 + p.x) * 8 : 0;
  return (
    <g transform={`translate(${p.x + dx} ${p.y + dy + bob}) rotate(${p.r ?? 0}) scale(${(p.flip ? -1 : 1) * (p.s ?? 1) * pop} ${(p.s ?? 1) * pop})`}>
      {fn(p, f)}
    </g>
  );
};

export const PROP_KINDS = Object.keys(draw);

/** One world prop (crowd, person, flag, shark, sign, lifeboat, fireball…) at x, y; pops in at `at`, drifts, bobs. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { f, d, t: _t, style: _s, render: _r, ...spec } = p;
  return <Prop p={spec as PropSpec} f={f} dur={d} />;
}
