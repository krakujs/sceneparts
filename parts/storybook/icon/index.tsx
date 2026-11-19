import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Flat storybook icons drawn in a 200x200 box. Add new ones here for future episodes.
const S = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export const ICONS: Record<string, React.ReactNode> = {
  clock: (
    <g>
      <circle cx={100} cy={108} r={72} fill={C.cream} {...S} />
      <line x1={100} y1={108} x2={100} y2={62} {...S} />
      <line x1={100} y1={108} x2={134} y2={124} {...S} />
      <circle cx={52} cy={36} r={20} fill={C.mustard} {...S} />
      <circle cx={148} cy={36} r={20} fill={C.mustard} {...S} />
      <line x1={60} y1={176} x2={50} y2={192} {...S} />
      <line x1={140} y1={176} x2={150} y2={192} {...S} />
    </g>
  ),
  coin: (
    <g>
      <circle cx={100} cy={100} r={78} fill={C.mustard} {...S} />
      <circle cx={100} cy={100} r={56} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5} />
      <text x={100} y={124} textAnchor="middle" fontSize={68} fontWeight={900} fill={C.ink} fontFamily="serif">6d</text>
    </g>
  ),
  ring: (
    <g>
      <circle cx={100} cy={118} r={62} fill="none" stroke={C.ink} strokeWidth={30} />
      <circle cx={100} cy={118} r={62} fill="none" stroke={C.mustard} strokeWidth={18} />
      <path d="M 70 52 L 100 22 L 130 52 L 100 74 Z" fill="#7FC8C0" {...S} />
      <path d="M 88 44 L 100 32" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
    </g>
  ),
  bed: (
    <g>
      <rect x={20} y={100} width={160} height={50} rx={10} fill={C.teal} {...S} />
      <rect x={20} y={60} width={20} height={120} fill={C.sepia} {...S} />
      <rect x={160} y={80} width={20} height={100} fill={C.sepia} {...S} />
      <rect x={46} y={78} width={50} height={26} rx={12} fill={C.cream} {...S} />
      <text x={140} y={60} fontSize={44} fontWeight={900} fill={C.cream} fontFamily="sans-serif">z</text>
      <text x={160} y={30} fontSize={30} fontWeight={900} fill={C.cream} fontFamily="sans-serif">z</text>
    </g>
  ),
  factory: (
    <g>
      <path d="M 20 180 L 20 100 L 70 70 L 70 100 L 120 70 L 120 100 L 170 70 L 170 180 Z" fill={C.brick} {...S} />
      <rect x={140} y={20} width={24} height={60} fill={C.stone} {...S} />
      <rect x={40} y={130} width={26} height={26} fill={C.glow} {...S} />
      <rect x={90} y={130} width={26} height={26} fill={C.glow} {...S} />
      <rect x={134} y={130} width={26} height={26} fill={C.glow} {...S} />
    </g>
  ),
  moon: (
    <g>
      <path d="M 130 30 A 76 76 0 1 0 170 140 A 60 60 0 1 1 130 30 Z" fill={C.glow} {...S} />
    </g>
  ),
  peas: (
    <g>
      <path d="M 20 120 Q 100 30 180 80 Q 110 170 20 120 Z" fill="#6FA84F" {...S} />
      <circle cx={70} cy={104} r={18} fill="#9BD06F" {...S} />
      <circle cx={106} cy={96} r={18} fill="#9BD06F" {...S} />
      <circle cx={142} cy={92} r={16} fill="#9BD06F" {...S} />
    </g>
  ),
  bread: (
    <g>
      <path d="M 24 120 Q 24 60 100 60 Q 176 60 176 120 L 170 160 L 30 160 Z" fill="#D9A15B" {...S} />
      <path d="M 60 80 l 16 30 M 96 76 l 16 30 M 132 80 l 16 30" {...S} />
    </g>
  ),
  lamp: (
    <g>
      <circle cx={100} cy={76} r={70} fill={C.glow} opacity={0.35} />
      <rect x={90} y={118} width={20} height={70} fill={C.ink} />
      <rect x={66} y={184} width={68} height={12} rx={4} fill={C.ink} />
      <rect x={80} y={110} width={40} height={12} fill={C.ink} />
      <polygon points="62,42 138,42 126,112 74,112" fill={C.glow} {...S} />
      <line x1={100} y1={42} x2={100} y2={112} stroke={C.ink} strokeWidth={5} />
      <polygon points="50,44 150,44 100,10" fill={C.ink} {...S} />
      <path d="M 100 92 q -10 -14 0 -30 q 10 16 0 30 Z" fill={C.brick} />
    </g>
  ),
  question: (
    <g>
      <text x={100} y={170} textAnchor="middle" fontSize={190} fontWeight={900} fill={C.mustard} stroke={C.ink} strokeWidth={8} fontFamily="serif">?</text>
    </g>
  ),
  police: (
    <g>
      <path d="M 40 110 Q 40 40 100 36 Q 160 40 160 110 Z" fill={C.navy} {...S} />
      <rect x={30} y={106} width={140} height={22} rx={10} fill={C.navy} {...S} />
      <path d="M 100 60 l 16 14 l -16 22 l -16 -22 Z" fill={C.mustard} {...S} />
    </g>
  ),
  slate: (
    <g>
      <rect x={30} y={40} width={140} height={120} rx={8} fill="#3A3F48" stroke={C.sepia} strokeWidth={14} />
      <text x={100} y={115} textAnchor="middle" fontSize={44} fill={C.cream} fontFamily="monospace">4:30</text>
    </g>
  ),
  sensor: (
    <g>
      <rect x={60} y={120} width={80} height={56} rx={10} fill={C.stone} {...S} />
      <path d="M 54 124 Q 100 50 146 124 Z" fill="#9FD3E6" {...S} />
      <circle cx={100} cy={102} r={10} fill={C.ink} />
      <path d="M 100 34 L 100 12 M 52 52 L 36 36 M 148 52 L 164 36 M 30 100 L 10 100 M 170 100 L 190 100" {...S} stroke={C.mustard} />
    </g>
  ),
  star: (
    <g>
      <circle cx={100} cy={100} r={80} fill={C.glow} opacity={0.3} />
      <polygon points="100,22 120,78 180,80 132,116 150,174 100,140 50,174 68,116 20,80 80,78" fill={C.mustard} {...S} />
    </g>
  ),
  rocket: (
    <g>
      <path d="M 100 14 Q 140 50 140 120 L 60 120 Q 60 50 100 14 Z" fill={C.cream} {...S} />
      <circle cx={100} cy={70} r={16} fill="#9FD3E6" {...S} />
      <path d="M 60 96 L 34 140 L 60 130 Z M 140 96 L 166 140 L 140 130 Z" fill={C.brick} {...S} />
      <path d="M 76 120 L 124 120 L 112 140 L 88 140 Z" fill={C.stone} {...S} />
      <path d="M 90 142 Q 100 196 110 142 Z" fill={C.mustard} {...S} />
    </g>
  ),
  ice: (
    <g>
      <path d="M 40 70 L 100 40 L 165 68 L 105 100 Z" fill="#E8F4F8" {...S} />
      <path d="M 40 70 L 105 100 L 105 175 L 40 145 Z" fill="#B9DCE8" {...S} />
      <path d="M 105 100 L 165 68 L 165 142 L 105 175 Z" fill="#8FC4D6" {...S} />
      <path d="M 58 92 L 58 124 M 128 104 L 128 134" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
    </g>
  ),
  fridge: (
    <g>
      <rect x={48} y={14} width={104} height={174} rx={14} fill={C.cream} {...S} />
      <line x1={48} y1={78} x2={152} y2={78} {...S} />
      <line x1={66} y1={36} x2={66} y2={62} {...S} />
      <line x1={66} y1={96} x2={66} y2={140} {...S} />
      <path d="M 120 40 l 12 0 M 126 34 l 0 12 M 121 35 l 10 10 M 131 35 l -10 10" stroke="#5FA8C4" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  crown: (
    <g>
      <path d="M 26 150 L 20 60 L 64 104 L 100 40 L 136 104 L 180 60 L 174 150 Z" fill={C.mustard} {...S} />
      <rect x={26} y={150} width={148} height={26} rx={6} fill={C.mustard} {...S} />
      <path d="M 70 128 L 84 114 L 98 128 L 84 142 Z M 116 128 L 130 114 L 144 128 L 130 142 Z" fill="#B9DCE8" stroke={C.ink} strokeWidth={4} />
    </g>
  ),
  ship: (
    <g>
      <path d="M 20 132 L 180 132 L 158 172 L 44 172 Z" fill={C.sepia} {...S} />
      <line x1={100} y1={20} x2={100} y2={132} {...S} />
      <path d="M 104 28 Q 160 70 104 118 Z" fill={C.cream} {...S} />
      <path d="M 96 40 Q 50 76 96 116 Z" fill={C.cream} {...S} />
      <path d="M 100 20 l 26 8 l -26 8" fill={C.brick} stroke={C.ink} strokeWidth={4} />
    </g>
  ),
  pin: (
    <g>
      <g transform="rotate(-14 70 110)">
        <path d="M 70 26 C 50 26 48 52 56 70 C 62 82 40 108 42 142 C 44 172 56 186 70 186 C 84 186 96 172 98 142 C 100 108 78 82 84 70 C 92 52 90 26 70 26 Z" fill="#FBF7EE" {...S} />
        <path d="M 57 74 L 83 74 M 55 84 L 85 84" stroke={C.brick} strokeWidth={8} />
      </g>
      <g transform="rotate(12 132 110)">
        <path d="M 132 26 C 112 26 110 52 118 70 C 124 82 102 108 104 142 C 106 172 118 186 132 186 C 146 186 158 172 160 142 C 162 108 140 82 146 70 C 154 52 152 26 132 26 Z" fill="#FBF7EE" {...S} />
        <path d="M 119 74 L 145 74 M 117 84 L 147 84" stroke={C.brick} strokeWidth={8} />
      </g>
    </g>
  ),
  pinspotter: (
    <g>
      <rect x={22} y={40} width={156} height={120} rx={10} fill="#5E6B74" {...S} />
      <path d="M 100 58 L 140 128 L 60 128 Z" fill={C.mustard} {...S} />
      <circle cx={100} cy={100} r={9} fill={C.brick} stroke={C.ink} strokeWidth={4} />
      <circle cx={88} cy={116} r={7} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      <circle cx={112} cy={116} r={7} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      <line x1={30} y1={176} x2={170} y2={176} {...S} />
      <line x1={50} y1={160} x2={50} y2={176} {...S} />
      <line x1={150} y1={160} x2={150} y2={176} {...S} />
    </g>
  ),
  rat: (
    <g transform="translate(96, 130)">
      <path d="M -40 -8 Q -70 10 -88 -20" fill="none" stroke="#C98C86" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={0} cy={-18} rx={44} ry={24} fill="#6E5E4E" {...S} />
      <path d="M 28 -34 Q 74 -22 78 -12 Q 70 -2 30 -4 Z" fill="#6E5E4E" {...S} />
      <circle cx={30} cy={-38} r={12} fill="#E7B3A8" stroke={C.ink} strokeWidth={4} />
      <circle cx={54} cy={-20} r={4} fill={C.ink} />
      <circle cx={78} cy={-12} r={5} fill="#E08A8A" />
      <line x1={-22} y1={-2} x2={-26} y2={8} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <line x1={20} y1={-2} x2={24} y2={8} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    </g>
  ),
  petrat: (
    <g transform="translate(96, 130)">
      <path d="M -40 -8 Q -70 10 -88 -20" fill="none" stroke="#E7B3A8" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={0} cy={-18} rx={44} ry={24} fill="#F7F3EA" {...S} />
      <ellipse cx={-12} cy={-24} rx={22} ry={13} fill="#1B1712" />
      <path d="M 28 -34 Q 74 -22 78 -12 Q 70 -2 30 -4 Z" fill="#F7F3EA" {...S} />
      <circle cx={30} cy={-38} r={12} fill="#E7B3A8" stroke={C.ink} strokeWidth={4} />
      <circle cx={54} cy={-20} r={4} fill={C.ink} />
      <circle cx={78} cy={-12} r={5} fill="#E08A8A" />
      <g transform="translate(22, -14)">
        <path d="M 0 0 L -16 -12 L -16 12 Z" fill={C.brick} stroke={C.ink} strokeWidth={3} />
        <path d="M 0 0 L 16 -12 L 16 12 Z" fill={C.brick} stroke={C.ink} strokeWidth={3} />
      </g>
      <path d="M 60 -70 l 6 12 l 13 2 l -9 9 l 2 13 l -12 -6 l -12 6 l 2 -13 l -9 -9 l 13 -2 Z" fill={C.mustard} stroke={C.ink} strokeWidth={3} />
    </g>
  ),
  coffin: (
    <g>
      <path d="M 78 14 L 122 14 L 150 58 L 132 188 L 68 188 L 50 58 Z" fill="#7A4A2A" {...S} />
      <path d="M 86 30 L 114 30 L 134 62 L 120 172 L 80 172 L 66 62 Z" fill="#8E5A34" stroke={C.ink} strokeWidth={4} />
      <line x1={100} y1={64} x2={100} y2={128} stroke={C.mustard} strokeWidth={9} />
      <line x1={80} y1={86} x2={120} y2={86} stroke={C.mustard} strokeWidth={9} />
    </g>
  ),
  headset: (
    <g>
      <path d="M 44 112 Q 44 30 100 30 Q 156 30 156 112" fill="none" stroke={C.ink} strokeWidth={14} />
      <rect x={28} y={98} width={34} height={58} rx={12} fill="#2C2F3B" {...S} />
      <rect x={138} y={98} width={34} height={58} rx={12} fill="#2C2F3B" {...S} />
      <path d="M 50 150 Q 60 186 104 182" fill="none" stroke={C.ink} strokeWidth={8} />
      <ellipse cx={116} cy={182} rx={16} ry={12} fill={C.mustard} {...S} />
    </g>
  ),
  dial: (
    <g>
      <circle cx={100} cy={100} r={84} fill={C.ink} {...S} />
      <circle cx={100} cy={100} r={70} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => {
        const a = ((-60 - k * 28) * Math.PI) / 180;
        return <circle key={k} cx={100 + Math.cos(a) * 52} cy={100 + Math.sin(a) * 52} r={12} fill={C.mustard} stroke={C.ink} strokeWidth={4} />;
      })}
      <circle cx={100} cy={100} r={24} fill={C.brick} stroke={C.ink} strokeWidth={4} />
      <path d="M 160 136 L 182 150" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    </g>
  ),
  switchboard: (
    <g>
      <rect x={20} y={30} width={160} height={120} rx={8} fill="#6B4A2E" {...S} />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((q) => (
        <circle key={`${r}${q}`} cx={50 + q * 34} cy={56 + r * 26} r={7} fill={r === 1 && q === 2 ? C.glow : "#24180F"} stroke={C.ink} strokeWidth={3} />
      )))}
      <path d="M 60 170 Q 70 110 84 82" fill="none" stroke={C.brick} strokeWidth={7} />
      <path d="M 140 170 Q 130 120 118 108" fill="none" stroke={C.mustard} strokeWidth={7} />
      <rect x={14} y={150} width={172} height={26} rx={6} fill="#8C6239" {...S} />
    </g>
  ),
  bucket: (
    <g>
      <path d="M 50 70 Q 100 0 150 70" fill="none" {...S} />
      <path d="M 40 70 L 160 70 L 145 185 L 55 185 Z" fill="#8C6239" {...S} />
      <line x1={46} y1={115} x2={154} y2={115} {...S} />
      <ellipse cx={100} cy={70} rx={58} ry={12} fill="#6B4A1E" {...S} />
      <path d="M 80 50 q 10 -14 0 -28 M 120 50 q 10 -14 0 -28" fill="none" stroke="#9DBF4A" strokeWidth={7} strokeLinecap="round" />
    </g>
  ),
  leech: (
    <g>
      <path d="M 30 120 Q 60 60 110 80 Q 160 100 172 70" fill="none" stroke={C.ink} strokeWidth={44} strokeLinecap="round" />
      <path d="M 30 120 Q 60 60 110 80 Q 160 100 172 70" fill="none" stroke="#33391F" strokeWidth={32} strokeLinecap="round" />
      <path d="M 40 112 Q 62 70 108 88 Q 150 104 164 80" fill="none" stroke="#C77A33" strokeWidth={5} strokeLinecap="round" />
      <circle cx={34} cy={150} r={10} fill="#A3201B" {...S} />
      <path d="M 26 176 q 8 10 16 0" fill="none" stroke="#A3201B" strokeWidth={6} strokeLinecap="round" />
    </g>
  ),
  toilet: (
    <g>
      <rect x={110} y={20} width={60} height={90} rx={10} fill={C.cream} {...S} />
      <rect x={124} y={34} width={18} height={10} rx={4} fill="#9AA3AD" stroke={C.ink} strokeWidth={4} />
      <path d="M 30 110 L 170 110 Q 165 160 120 165 L 130 190 L 70 190 L 80 165 Q 35 160 30 110 Z" fill={C.cream} {...S} />
      <ellipse cx={100} cy={110} rx={70} ry={14} fill="#DCE8EE" {...S} />
    </g>
  ),
  phone: (
    <g>
      <rect x={56} y={16} width={88} height={168} rx={18} fill={C.ink} {...S} />
      <rect x={66} y={34} width={68} height={128} rx={8} fill={C.modernB} />
    </g>
  ),
};

export const ICON_NAMES = Object.keys(ICONS);

/** One icon centred on (x, y), `size` px wide; bobs gently if bob is set, pops in at `at`. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const size = p.size;
  const bob = p.bob ? Math.sin(p.f / 9) * 8 : 0;
  return (
    <g transform={`translate(${p.x - size / 2} ${p.y - size / 2 + bob}) rotate(${p.r} ${size / 2} ${size / 2}) scale(${size / 200})`}>
      {ICONS[p.name] ?? ICONS.question}
    </g>
  );
}
