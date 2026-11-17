import React from "react";
import type { PartProps } from "@sceneparts/core";
import { INK, P } from "../style/index";
import { Jar } from "../jar/index";
import { Feather } from "../feather/index";

// Egyptian tomb-painting figure: head + legs in profile, torso frontal, flat colours, thick outline.
// Faces RIGHT (flip: true faces left). Local coords: feet on y = 0, top of head about y = -1000 at s = 1.

// ---------------- god heads and crowns ----------------
export type HeadType = "jackal" | "ibis" | "croc" | "cat" | "hippo" | "scarab" | "setanimal" | "ammit" | "human" | "humanf" | "pharaoh" | "frog";
export type Crown = "none" | "atef" | "double" | "throne" | "moon" | "feather" | "disk" | "horns" | "nemes" | "white";

const GodEye: React.FC<{ x: number; y: number; s?: number; glow?: number; shut?: boolean; c?: string }> = ({ x, y, s = 1, glow = 0, shut, c = P.linen }) =>
  shut ? (
    <path d={`M${x - 22 * s} ${y} Q${x} ${y + 10 * s} ${x + 22 * s} ${y}`} fill="none" {...S} strokeWidth={6} />
  ) : (
    <g>
      {glow > 0 && <ellipse cx={x} cy={y} rx={55 * s * glow} ry={36 * s * glow} fill="#ff3b1f" opacity={0.35} />}
      <path d={`M${x - 24 * s} ${y} Q${x} ${y - 18 * s} ${x + 22 * s} ${y} Q${x} ${y + 12 * s} ${x - 24 * s} ${y} Z`} fill={glow > 0.5 ? "#ffd36a" : c} {...S} strokeWidth={5} />
      <circle cx={x + 3 * s} cy={y - 1} r={8 * s} fill={glow > 0.5 ? "#c8102e" : INK} />
      <path d={`M${x + 22 * s} ${y} L${x + 44 * s} ${y + 4 * s}`} {...S} strokeWidth={5} />
    </g>
  );
const Wig: React.FC<{ c?: string; long?: boolean }> = ({ c = P.blue, long = true }) => (
  <g>
    <path d={`M-115 -985 Q-70 -1075 30 -1050 Q100 -1020 92 -945 L${long ? 76 : 70} ${long ? -770 : -860} L-40 ${long ? -770 : -860} L-118 -830 Z`} fill={c} {...S} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${-105 + i * 6} ${-930 + i * 40} L${55 - i * 5} ${-930 + i * 40}`} stroke={P.gold} strokeWidth={5} opacity={0.75} />)}
  </g>
);

export const GodHead: React.FC<{ head: HeadType; mouth?: string; glow?: number; skin?: string }> = ({ head, mouth = "closed", glow = 0, skin = P.red }) => {
  const open = mouth === "open" || mouth === "roar";
  const shut = mouth === "sleep";
  switch (head) {
    case "jackal": // Anubis / Wepwawet
      return (
        <g>
          <Wig />
          <path d="M-10 -1050 L0 -1170 L40 -1060 Z M30 -1045 L60 -1160 L80 -1040 Z" fill="#1d1a19" {...S} />
          <path d="M-25 -1050 Q40 -1080 80 -1020 L200 -975 Q215 -960 196 -945 L100 -930 Q60 -880 20 -880 Q-20 -900 -25 -960 Z" fill="#1d1a19" {...S} />
          {open && <path d="M196 -945 L110 -930 L180 -905 Z" fill="#7a1010" {...S} strokeWidth={5} />}
          <path d="M60 -1000 L100 -1008" stroke={P.gold} strokeWidth={10} />
          <GodEye x={70} y={-990} s={0.8} glow={glow} shut={shut} c={P.gold} />
        </g>
      );
    case "ibis": // Thoth
      return (
        <g>
          <Wig />
          <path d="M-20 -1040 Q40 -1070 80 -1020 Q95 -980 70 -950 Q30 -920 -15 -950 Z" fill="#f2efe6" {...S} />
          <path d="M70 -1000 Q170 -980 230 -880 Q236 -868 224 -868 Q170 -950 66 -975 Z" fill="#1a1410" {...S} strokeWidth={6} />
          <GodEye x={40} y={-1000} s={0.7} glow={glow} shut={shut} c="#fff" />
        </g>
      );
    case "croc": // Sobek
      return (
        <g>
          <Wig />
          <path d="M-25 -1045 Q40 -1080 90 -1030 L230 -990 Q248 -975 230 -960 L100 -945 Q70 -905 20 -900 Q-25 -920 -25 -980 Z" fill="#4f7a3a" {...S} />
          <path d={`M100 ${open ? -935 : -955} L230 ${open ? -925 : -962}`} {...S} strokeWidth={6} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${110 + i * 20} -958 l8 12 l8 -12`} fill="#fff" stroke={INK} strokeWidth={3} />)}
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={20 + i * 22} cy={-1055 + (i % 2) * 6} r={7} fill="#3a5f2a" stroke={INK} strokeWidth={3} />)}
          <GodEye x={60} y={-1010} s={0.7} glow={glow} shut={shut} c={P.gold} />
        </g>
      );
    case "cat": // Bastet
      return (
        <g>
          <path d="M-20 -910 L60 -910 L66 -785 L-24 -785 Z" fill="#26201c" {...S} />
          <path d="M-5 -1040 L10 -1135 L50 -1050 Z M55 -1045 L85 -1130 L100 -1030 Z" fill="#26201c" {...S} />
          <path d="M-40 -1030 Q30 -1090 100 -1030 Q150 -990 150 -950 Q140 -905 90 -895 Q40 -880 0 -900 Q-45 -930 -40 -1030 Z" fill="#26201c" {...S} />
          <path d="M150 -955 L170 -945 L150 -935 Z" fill="#c98b8b" {...S} strokeWidth={4} />
          <circle cx={-10} cy={-930} r={16} fill="none" stroke={P.gold} strokeWidth={8} />
          {open && <path d="M120 -915 Q140 -905 152 -918" fill="#7a1010" {...S} strokeWidth={4} />}
          <GodEye x={80} y={-990} s={0.85} glow={glow} shut={shut} c="#7be07a" />
        </g>
      );
    case "hippo": // Taweret
      return (
        <g>
          <Wig />
          <path d="M-25 -1040 Q40 -1090 110 -1040 Q200 -1020 215 -960 Q215 -900 150 -895 Q60 -880 0 -905 Q-40 -940 -25 -1040 Z" fill="#9c8f9a" {...S} />
          <path d="M10 -1060 q10 -30 30 -10 Z" fill="#9c8f9a" {...S} strokeWidth={5} />
          <ellipse cx={190} cy={-985} rx={10} ry={6} fill={INK} />
          {open && <path d="M215 -930 L120 -905 L200 -890 Z" fill="#7a1010" {...S} strokeWidth={5} />}
          <GodEye x={70} y={-1015} s={0.7} glow={glow} shut={shut} />
        </g>
      );
    case "scarab": // Khepri: a beetle for a head
      return (
        <g>
          <Wig />
          <g transform="translate(20 -1010)">
            <ellipse cx={0} cy={0} rx={80} ry={95} fill="#2e5a7a" {...S} />
            <path d="M0 -95 L0 95" stroke={INK} strokeWidth={6} />
            <ellipse cx={0} cy={-105} rx={44} ry={26} fill="#24475f" {...S} />
            {[-1, 1].map((sd) => [0, 1, 2].map((i) => <path key={`${sd}${i}`} d={`M${sd * 70} ${-30 + i * 40} l${sd * 45} ${-20 + i * 20}`} {...S} strokeWidth={8} />))}
          </g>
        </g>
      );
    case "setanimal": // Set
      return (
        <g>
          <Wig c="#1f3f5a" />
          <path d="M10 -1050 L0 -1170 L40 -1170 L40 -1060 Z M50 -1050 L50 -1165 L90 -1165 L80 -1050 Z" fill="#b5523b" {...S} />
          <path d="M-25 -1045 Q40 -1080 90 -1030 Q170 -990 200 -930 Q205 -915 190 -915 L100 -930 Q60 -885 15 -885 Q-25 -905 -25 -980 Z" fill="#b5523b" {...S} />
          {open && <path d="M190 -918 L110 -930 L170 -900 Z" fill="#7a1010" {...S} strokeWidth={5} />}
          <GodEye x={60} y={-1000} s={0.8} glow={glow} shut={shut} />
        </g>
      );
    case "ammit": // Ammit: crocodile head, lion mane
      return (
        <g>
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <path key={i} d={`M10 -980 L${10 + Math.cos(a) * 150} ${-980 + Math.sin(a) * 150} L${10 + Math.cos(a + 0.25) * 100} ${-980 + Math.sin(a + 0.25) * 100} Z`} fill="#c48a2e" {...S} strokeWidth={6} />;
          })}
          <path d="M-25 -1045 Q40 -1080 90 -1030 L230 -990 Q248 -975 230 -960 L100 -945 Q70 -905 20 -900 Q-25 -920 -25 -980 Z" fill="#4f7a3a" {...S} />
          <path d={`M100 ${open ? -930 : -955} L230 ${open ? -918 : -962}`} {...S} strokeWidth={6} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${110 + i * 20} -958 l8 12 l8 -12`} fill="#fff" stroke={INK} strokeWidth={3} />)}
          <GodEye x={60} y={-1010} s={0.75} glow={glow} shut={shut} c={P.gold} />
        </g>
      );
    case "frog":
      return (
        <g>
          <Wig />
          <path d="M-25 -1030 Q50 -1090 140 -1020 Q180 -980 160 -940 Q120 -900 40 -900 Q-25 -920 -25 -1030 Z" fill="#6f9a3e" {...S} />
          <circle cx={60} cy={-1050} r={30} fill="#6f9a3e" {...S} />
          <path d="M60 -945 Q110 -925 160 -950" fill="none" {...S} strokeWidth={5} />
          <GodEye x={62} y={-1050} s={0.7} glow={glow} shut={shut} />
        </g>
      );
    case "pharaoh":
    case "human":
    case "humanf": {
      const sk = head === "humanf" ? P.ochre : skin;
      return (
        <g>
          {head === "pharaoh" ? (
            <g>
              <path d="M-110 -980 Q-60 -1080 40 -1060 Q100 -1040 95 -980 L120 -780 L60 -800 L40 -900 L-60 -900 L-130 -790 Z" fill="#e8c24a" {...S} />
              {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M-120 ${-1000 + i * 38} L80 ${-1000 + i * 38}`} stroke={P.lapis} strokeWidth={10} opacity={0.85} />)}
            </g>
          ) : (
            <path d="M-80 -1000 Q-20 -1060 60 -1030 Q90 -1010 80 -960 L60 -850 L-60 -850 L-95 -900 Z" fill={head === "humanf" ? P.blue : INK} {...S} />
          )}
          <path d="M20 -1030 Q90 -1025 100 -975 L118 -945 L102 -935 Q108 -915 96 -905 Q80 -890 60 -888 L30 -880 L10 -930 Z" fill={sk} {...S} />
          {open ? <ellipse cx={92} cy={-910} rx={9} ry={12} fill="#5a1414" {...S} strokeWidth={5} /> : <path d="M80 -915 l18 0" {...S} strokeWidth={5} />}
          {head === "pharaoh" && <path d="M60 -885 L70 -820 L90 -820 L84 -885" fill="#2c4f9e" {...S} strokeWidth={5} />}
          <GodEye x={66} y={-975} s={0.75} glow={glow} shut={shut} />
        </g>
      );
    }
  }
  return null;
};

export const CrownOn: React.FC<{ c: Crown }> = ({ c }) => {
  switch (c) {
    case "atef":
      return (
        <g>
          <path d="M-30 -1050 Q-40 -1200 10 -1260 Q60 -1200 50 -1050 Z" fill={P.linen} {...S} />
          <path d="M-60 -1050 L-50 -1240 L-30 -1060 Z M80 -1050 L70 -1240 L50 -1060 Z" fill="#7aa0c8" {...S} strokeWidth={6} />
        </g>
      );
    case "double":
      return (
        <g>
          <path d="M-70 -1040 L-70 -1130 L-10 -1130 L-10 -1170 L80 -1170 L80 -1040 Z" fill={P.scarlet} {...S} />
          <path d="M-20 -1040 Q-30 -1210 20 -1240 Q60 -1200 50 -1040 Z" fill={P.linen} {...S} />
        </g>
      );
    case "white":
      return <path d="M-40 -1040 Q-50 -1220 10 -1250 Q60 -1210 55 -1040 Z" fill={P.linen} {...S} />;
    case "throne":
      return <path d="M-30 -1050 L-30 -1170 L10 -1170 L10 -1110 L50 -1110 L50 -1050 Z" fill={P.lapis} {...S} />;
    case "moon":
      return (
        <g>
          <circle cx={10} cy={-1120} r={70} fill="#f2efe6" {...S} />
          <path d="M-60 -1100 Q10 -1040 80 -1100 Q10 -1070 -60 -1100 Z" fill={P.gold} {...S} strokeWidth={6} />
        </g>
      );
    case "feather":
      return <path d="M20 -1040 Q-20 -1150 30 -1260 Q70 -1150 40 -1040 Z" fill={P.linen} {...S} strokeWidth={6} />;
    case "disk":
      return (
        <g>
          <circle cx={0} cy={-1130} r={90} fill={P.scarlet} {...S} />
          <circle cx={0} cy={-1130} r={74} fill="none" stroke={P.gold} strokeWidth={8} />
        </g>
      );
    case "horns":
      return (
        <g>
          <path d="M-110 -1080 Q-90 -1220 0 -1220 Q90 -1220 110 -1080 Q80 -1180 0 -1185 Q-80 -1180 -110 -1080 Z" fill="#2a2420" {...S} strokeWidth={6} />
          <circle cx={0} cy={-1135} r={60} fill={P.scarlet} {...S} />
        </g>
      );
    default:
      return null;
  }
};


// ---------------- body ----------------
const OW = 14; // outline width added around strokes

type Pt = [number, number];
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");
export const Limb: React.FC<{ p: Pt[]; w: number; c: string }> = ({ p, w, c }) => (
  <>
    <polyline points={pts(p)} fill="none" stroke={INK} strokeWidth={w + OW} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts(p)} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
  </>
);
const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const rad = (d: number) => (d * Math.PI) / 180;
const arm = (sh: Pt, a1: number, a2: number, l1 = 170, l2 = 160): Pt[] => {
  const el: Pt = [sh[0] + l1 * Math.sin(rad(a1)), sh[1] + l1 * Math.cos(rad(a1))];
  const ha: Pt = [el[0] + l2 * Math.sin(rad(a2)), el[1] + l2 * Math.cos(rad(a2))];
  return [sh, el, ha];
};

// ---------------- heads ----------------
export type Mouth = "closed" | "open" | "roar" | "smile" | "grin" | "sleep";
const EgyEye: React.FC<{ x: number; y: number; s?: number; glow?: number; shut?: boolean; c?: string }> = ({ x, y, s = 1, glow = 0, shut, c = "#fff" }) =>
  shut ? (
    <path d={`M${x - 26 * s} ${y} Q${x} ${y + 12 * s} ${x + 26 * s} ${y}`} fill="none" {...S} strokeWidth={7} />
  ) : (
    <g>
      {glow > 0 && <ellipse cx={x} cy={y} rx={60 * s * glow} ry={40 * s * glow} fill="#ff3b1f" opacity={0.35} />}
      <path d={`M${x - 28 * s} ${y} Q${x} ${y - 20 * s} ${x + 26 * s} ${y} Q${x} ${y + 14 * s} ${x - 28 * s} ${y} Z`} fill={glow > 0.5 ? "#ffd36a" : c} {...S} strokeWidth={6} />
      <circle cx={x + 4 * s} cy={y - 1} r={9 * s} fill={glow > 0.5 ? "#c8102e" : INK} />
      <path d={`M${x + 26 * s} ${y} L${x + 52 * s} ${y + 4 * s}`} {...S} strokeWidth={6} />
      <path d={`M${x - 30 * s} ${y - 26 * s} Q${x} ${y - 40 * s} ${x + 34 * s} ${y - 28 * s}`} fill="none" {...S} strokeWidth={7} />
    </g>
  );

export const SunDisk: React.FC<{ x: number; y: number; r?: number; c?: string }> = ({ x, y, r = 95, c = P.scarlet }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={c} {...S} />
    <circle cx={x} cy={y} r={r - 16} fill="none" stroke={P.gold} strokeWidth={8} />
    {/* uraeus cobra */}
    <path d={`M${x + r * 0.55} ${y + r * 0.8} q38 -20 30 -80 q-4 -30 -26 -24 q-18 8 -4 30`} fill={P.gold} {...S} strokeWidth={7} />
  </g>
);

const LionHead: React.FC<{ mouth: Mouth; glow: number; disk: boolean }> = ({ mouth, glow, disk }) => (
  <g>
    {disk && <SunDisk x={-10} y={-1130} r={110} />}
    {/* tripartite wig */}
    <path d="M-120 -990 Q-70 -1080 40 -1050 Q110 -1020 100 -940 L80 -760 L-40 -760 L-120 -820 Z" fill={P.blue} {...S} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${-110 + i * 8} ${-930 + i * 45} L${60 - i * 5} ${-930 + i * 45}`} stroke={P.gold} strokeWidth={6} opacity={0.8} />)}
    {/* ear */}
    <path d="M-10 -1040 L10 -1110 L52 -1036 Z" fill={P.ochre} {...S} />
    {/* face + muzzle */}
    <path d={`M-20 -1040 Q60 -1060 110 -1000 L170 -965 Q190 -940 168 -918 L140 -905 Q${mouth === "roar" ? "150 -840 110 -830" : "135 -872 100 -870"} L40 -865 Q-10 -900 -20 -960 Z`} fill={P.ochre} {...S} />
    {mouth === "roar" && (
      <g>
        <path d="M150 -906 L96 -884 L156 -846 Z" fill="#7a1010" {...S} strokeWidth={6} />
        <path d="M138 -902 L130 -880 L124 -898 Z" fill="#fff" stroke={INK} strokeWidth={3} />
        <path d="M142 -852 L134 -872 L128 -856 Z" fill="#fff" stroke={INK} strokeWidth={3} />
      </g>
    )}
    {mouth === "smile" && <path d="M108 -895 Q128 -880 150 -900" {...S} fill="none" strokeWidth={6} />}
    {mouth === "grin" && <path d="M100 -900 Q130 -872 160 -905" {...S} fill="#fff" strokeWidth={6} />}
    {mouth === "sleep" && <path d="M110 -895 Q130 -890 150 -898" {...S} fill="none" strokeWidth={5} />}
    {/* nose + whisker dots */}
    <path d="M165 -968 L184 -945 L166 -935 Z" fill={INK} />
    {[0, 1, 2].map((i) => <circle key={i} cx={128 + i * 12} cy={-925 + (i % 2) * 8} r={3.5} fill={INK} />)}
    <EgyEye x={80} y={-985} s={1} glow={glow} shut={mouth === "sleep"} c={P.linen} />
  </g>
);

const FalconHead: React.FC<{ disk: boolean; old?: boolean }> = ({ disk, old }) => (
  <g>
    {disk && <SunDisk x={-20} y={-1120} r={100} c={old ? "#d9762f" : P.scarlet} />}
    <path d="M-110 -980 Q-60 -1060 30 -1040 Q90 -1010 80 -940 L60 -770 L-60 -770 L-115 -830 Z" fill={P.blue} {...S} />
    <path d="M-20 -1040 Q70 -1060 110 -990 Q120 -950 90 -900 L30 -880 Q-20 -900 -25 -960 Z" fill="#7a5a3a" {...S} />
    {/* hooked beak */}
    <path d="M100 -990 Q150 -985 160 -950 Q150 -935 120 -945 L104 -940 Z" fill={P.gold} {...S} strokeWidth={7} />
    {/* falcon cheek marking */}
    <path d="M60 -975 Q50 -930 70 -905" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
    <EgyEye x={68} y={-990} s={0.85} c={P.linen} />
    {old && <path d="M20 -900 q-10 30 10 60 q20 20 -5 40" stroke={P.linen} strokeWidth={10} fill="none" />}
  </g>
);

const HumanHead: React.FC<{ skin: string; mouth: Mouth; wig?: string }> = ({ skin, mouth, wig = P.black }) => (
  <g>
    <path d="M-80 -1000 Q-20 -1060 60 -1030 Q90 -1010 80 -960 L60 -850 L-60 -850 L-95 -900 Z" fill={wig} {...S} />
    <path d="M20 -1030 Q90 -1025 100 -975 L118 -945 L102 -935 Q108 -915 96 -905 Q80 -890 60 -888 L30 -880 L10 -930 Z" fill={skin} {...S} />
    {mouth === "open" || mouth === "roar" ? <ellipse cx={92} cy={-910} rx={9} ry={12} fill="#5a1414" {...S} strokeWidth={5} /> : <path d="M80 -915 l18 0" {...S} strokeWidth={5} />}
    <EgyEye x={66} y={-975} s={0.75} c={P.linen} />
  </g>
);

// A modern traveller dropped into the myth: the kit's generic recurring character.
// Colours and hair are options, so every channel can make its own look.
export type Outfit = { top?: string; legs?: string; shoes?: string; hair?: string; skin?: string; hairStyle?: "short" | "long" | "bald" | "cap"; cap?: string };
export const HERO: Required<Omit<Outfit, "hairStyle" | "cap">> & { hairStyle: NonNullable<Outfit["hairStyle"]>; cap: string } = {
  top: "#2a8c82", legs: "#6b5a3e", shoes: "#3a2a1c", hair: "#1f1a17", skin: "#e8b48c", hairStyle: "short", cap: "#d9a441",
};

const HeroHead: React.FC<{ mouth: Mouth; o: typeof HERO }> = ({ mouth, o }) => (
  <g>
    <path d="M-10 -880 L40 -880 L44 -790 L-14 -790 Z" fill={o.skin} {...S} />
    {o.hairStyle === "long" && <path d="M-70 -980 Q-110 -880 -80 -780 L-20 -800 L-30 -900 Z" fill={o.hair} {...S} />}
    <path d="M-60 -960 Q-50 -1060 40 -1050 Q110 -1040 112 -970 Q115 -900 80 -870 Q40 -850 0 -860 Q-60 -880 -60 -960 Z" fill={o.skin} {...S} />
    {o.hairStyle === "short" && <path d="M-64 -950 Q-66 -1062 40 -1060 Q116 -1056 114 -990 Q90 -1018 40 -1012 Q0 -1008 -20 -990 L-34 -950 Z" fill={o.hair} {...S} />}
    {o.hairStyle === "long" && <path d="M-64 -950 Q-66 -1062 40 -1060 Q116 -1056 114 -990 Q80 -1022 20 -1014 L-40 -980 Z" fill={o.hair} {...S} />}
    {o.hairStyle === "cap" && (
      <g>
        <path d="M-66 -965 Q-60 -1070 40 -1066 Q112 -1060 112 -985 Z" fill={o.cap} {...S} />
        <path d="M100 -990 L178 -982 Q182 -968 168 -965 L104 -968 Z" fill={o.cap} {...S} strokeWidth={6} />
      </g>
    )}
    <circle cx={-34} cy={-935} r={20} fill={o.skin} {...S} strokeWidth={6} />
    <EgyEye x={62} y={-960} s={0.8} c="#fff" />
    {mouth === "open" || mouth === "roar" ? (
      <ellipse cx={90} cy={-895} rx={13} ry={17} fill="#5a1414" {...S} strokeWidth={5} />
    ) : mouth === "grin" ? (
      <path d="M62 -905 Q90 -880 112 -905 Z" fill="#fff" {...S} strokeWidth={5} />
    ) : mouth === "smile" ? (
      <path d="M68 -900 Q90 -885 108 -902" fill="none" {...S} strokeWidth={5} />
    ) : (
      <path d="M74 -896 l26 0" {...S} strokeWidth={5} />
    )}
  </g>
);

// ---------------- body ----------------
export type Kind = "sekhmet" | "ra" | "hero" | "man" | "woman" | "god";
export type FigProps = {
  kind: Kind;
  x?: number; y?: number; s?: number; flip?: boolean;
  // arm angles in degrees (0 = hanging down, +90 = pointing forward, 180 = straight up)
  back?: [number, number]; front?: [number, number];
  stride?: number;      // half distance between feet
  lift?: number;        // back foot lifted (running)
  mouth?: Mouth; glow?: number; disk?: boolean; old?: boolean;
  hold?: string | null; holdBack?: string | null;
  tilt?: number;        // whole-body lean, degrees
  skin?: string;
  head?: HeadType; crown?: Crown; female?: boolean; dress?: string; mummy?: boolean;
  outfit?: Outfit;
};

const Held: React.FC<{ at: Pt; what: string; angle: number }> = ({ at, what, angle }) => {
  const [x, y] = at;
  if (what === "ankh")
    return (
      <g transform={`translate(${x} ${y}) rotate(${-angle + 0})`}>
        <ellipse cx={0} cy={-20} rx={22} ry={30} fill="none" stroke={INK} strokeWidth={22} />
        <ellipse cx={0} cy={-20} rx={22} ry={30} fill="none" stroke={P.gold} strokeWidth={10} />
        <Limb p={[[-34, 14], [34, 14]]} w={10} c={P.gold} />
        <Limb p={[[0, 14], [0, 110]]} w={10} c={P.gold} />
      </g>
    );
  if (what === "was" || what === "cane")
    return (
      <g>
        <Limb p={[[x, y - 420], [x, y + 330]]} w={10} c={what === "was" ? P.gold : "#7a5a3a"} />
        {what === "was" && <path d={`M${x} ${y - 420} q-10 -40 30 -50 l10 18`} fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />}
      </g>
    );
  if (what === "jar") return <Jar x={x} y={y + 110} s={0.75} red />;
  if (what === "spear")
    return (
      <g>
        <Limb p={[[x - 260, y + 160], [x + 260, y - 160]]} w={10} c="#7a5a3a" />
        <path d={`M${x + 250} ${y - 154} l60 -60 l-14 74 Z`} fill="#c9c9c9" stroke={INK} strokeWidth={6} />
      </g>
    );
  if (what === "crook")
    return <path d={`M${x} ${y + 200} L${x} ${y - 150} q0 -60 40 -60 q40 0 40 40`} fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />;
  if (what === "flail")
    return <g><Limb p={[[x, y + 60], [x + 40, y - 150]]} w={10} c={P.gold} />{[0, 1, 2].map((i) => <path key={i} d={`M${x + 40} ${y - 150} l${-30 + i * 25} 90`} stroke={INK} strokeWidth={10} />)}</g>;
  if (what === "pen")
    return <g><Limb p={[[x - 10, y + 30], [x + 70, y - 90]]} w={8} c="#c9a067" /><rect x={x - 120} y={y + 20} width={110} height={60} fill={P.linen} stroke={INK} strokeWidth={6} /></g>;
  if (what === "feather") return <Feather x={x} y={y + 40} s={0.5} />;
  if (what === "cup")
    return <path d={`M${x - 30} ${y - 40} L${x + 30} ${y - 40} L${x + 20} ${y + 10} L${x - 20} ${y + 10} Z`} fill={P.gold} {...S} />;
  return null;
};

export const Figure: React.FC<FigProps> = (p) => {
  const {
    kind, x = 0, y = 0, s = 1, flip = false, back = [10, 10], front = [20, 30], stride = 70, lift = 0,
    mouth = "closed", glow = 0, disk = true, old = false, hold = null, holdBack = null, tilt = 0,
  } = p;
  const female = p.female ?? (kind === "sekhmet" || kind === "woman");
  const hero = kind === "hero" ? { ...HERO, ...(p.outfit ?? {}) } : null;
  const skin = p.skin ?? (female ? P.ochre : hero ? hero.skin : P.red);
  const mummy = !!p.mummy;
  const top = hero ? hero.top : null;
  const legC = hero ? hero.legs : skin;
  const shB: Pt = [-90, -770];
  const shF: Pt = [95, -770];
  const aB = arm(shB, back[0], back[1]);
  const aF = arm(shF, front[0], front[1]);
  const hipB: Pt = [-25, -480], hipF: Pt = [25, -480];
  const ankF: Pt = [stride, -34], ankB: Pt = [-stride, -34 - lift];
  const kneeF: Pt = [stride * 0.55 + 10, -260], kneeB: Pt = [-stride * 0.55 + (lift ? -40 : 0), -260 - lift * 0.4];
  const foot = (a: Pt, c: string) => (
    <path d={`M${a[0] - 26} ${a[1] - 6} L${a[0] + 70} ${a[1] + 20} L${a[0] + 80} ${a[1] + 34} L${a[0] - 30} ${a[1] + 34} Z`} fill={c} {...S} />
  );
  const shoe = hero ? hero.shoes : skin;
  const bodyRot = old ? 12 : tilt;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`rotate(${bodyRot} 0 -480)`}>
        {/* back arm (behind torso) */}
        <Limb p={aB} w={44} c={top ?? skin} />
        {hero && <circle cx={aB[2][0]} cy={aB[2][1]} r={26} fill={skin} {...S} />}
        {holdBack && <Held at={aB[2]} what={holdBack} angle={back[1]} />}
      </g>
      {/* legs */}
      {mummy ? null : !female || kind === "woman" ? (
        <>
          <Limb p={[hipB, kneeB, ankB]} w={58} c={legC} />
          {foot(ankB, shoe)}
          <Limb p={[hipF, kneeF, ankF]} w={58} c={legC} />
          {foot(ankF, shoe)}
        </>
      ) : (
        <>
          <Limb p={[hipB, kneeB, ankB]} w={50} c={skin} />
          {foot(ankB, skin)}
          <Limb p={[hipF, kneeF, ankF]} w={50} c={skin} />
          {foot(ankF, skin)}
        </>
      )}
      <g transform={`rotate(${bodyRot} 0 -480)`}>
        {/* torso (frontal) */}
        {mummy ? (
          <path d="M-100 -800 L104 -800 L84 -40 L60 0 L-60 0 L-80 -40 Z" fill={P.linen} {...S} />
        ) : female ? (
          <path d={`M-92 -790 L100 -790 L70 -560 L${Math.max(80, stride * 0.9)} -150 L${-Math.max(80, stride * 0.9)} -150 L-70 -560 Z`} fill={p.dress ?? (kind === "sekhmet" ? P.scarlet : P.linen)} {...S} />
        ) : hero ? (
          <>
            <path d="M-100 -800 L104 -800 L92 -470 L-92 -470 Z" fill={hero.top} {...S} />
            {/* open jacket collar + satchel strap */}
            <path d="M-40 -800 L0 -720 L40 -800" fill="none" {...S} strokeWidth={7} />
            <path d="M-90 -790 L92 -500" stroke={INK} strokeWidth={22} strokeLinecap="round" />
            <path d="M-90 -790 L92 -500" stroke="#8a5a2c" strokeWidth={12} strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M-92 -790 L100 -790 L58 -500 L-56 -500 Z" fill={skin} {...S} />
            {/* shendyt kilt */}
            <path d="M-64 -520 L72 -520 L130 -270 L-70 -290 Z" fill={P.linen} {...S} />
            {[0, 1, 2].map((i) => <path key={i} d={`M${-20 + i * 35} -510 L${10 + i * 45} -285`} stroke={INK} strokeWidth={4} opacity={0.6} />)}
          </>
        )}
        {female && <path d="M-60 -790 L-30 -620 M70 -790 L40 -620" stroke={P.gold} strokeWidth={10} />}
        {/* broad collar */}
        {!hero && (
          <g>
            <path d="M-96 -800 Q0 -690 104 -800 Q0 -760 -96 -800 Z" fill={P.green} {...S} strokeWidth={6} />
            <path d="M-80 -790 Q0 -712 90 -790" stroke={P.gold} strokeWidth={9} fill="none" />
            <path d="M-70 -776 Q0 -730 80 -776" stroke={P.lapis} strokeWidth={7} fill="none" />
          </g>
        )}
        {/* head */}
        {kind === "sekhmet" && <LionHead mouth={mouth} glow={glow} disk={disk} />}
        {kind === "ra" && <FalconHead disk={disk} old={old} />}
        {hero && <HeroHead mouth={mouth} o={hero} />}
        {(kind === "man" || kind === "woman") && <HumanHead skin={skin} mouth={mouth} />}
        {kind === "god" && <GodHead head={p.head ?? "human"} mouth={mouth} glow={glow} skin={skin} />}
        {p.crown && p.crown !== "none" && <CrownOn c={p.crown} />}
        {/* front arm */}
        <Limb p={aF} w={44} c={top ?? skin} />
        <circle cx={aF[2][0]} cy={aF[2][1]} r={hero ? 26 : 24} fill={skin} {...S} />
        {hold && <Held at={aF[2]} what={hold} angle={front[1]} />}
        {female && !mummy && <path d={`M${-Math.max(80, stride * 0.9)} -150 L${Math.max(80, stride * 0.9)} -150`} stroke={P.gold} strokeWidth={8} />}
      </g>
    </g>
  );
};


/* eslint-disable @typescript-eslint/no-explicit-any */
/** Item wrapper: run / wave cycles, sideways walk (vx), lying down, angry aura. */
export default function Part(p: PartProps<any>) {
  const f = p.f;
  const run = !!p.run;
  const ph = f * (p.speed ?? 0.85) + (p.phase ?? 0);
  const fp: FigProps = {
    kind: p.kind ?? "man", head: p.head, crown: p.crown, female: p.female, dress: p.dress, mummy: p.mummy, skin: p.skin, outfit: p.outfit,
    x: (p.x ?? 540) + (p.vx ? p.vx * f : 0), y: p.y ?? 1520, s: p.s ?? 1, flip: !!p.flip,
    front: run ? [110 + Math.sin(ph) * 40, 150] : p.wave ? [150 + Math.sin(ph) * 20, 172] : p.front ?? [20, 30],
    back: run ? [-80 - Math.sin(ph) * 40, -100] : p.wave ? [-150 - Math.sin(ph) * 20, -172] : p.back ?? [10, 10],
    stride: run ? Math.sin(ph) * (p.stride ?? 120) : p.stride ?? 70, lift: run ? Math.abs(Math.sin(ph)) * 50 : p.lift ?? 0,
    mouth: p.laugh ? (Math.floor(f / 4) % 2 ? "grin" : "open") : p.mouth ?? "closed", glow: p.glow ?? 0, disk: p.disk ?? true, old: !!p.old,
    hold: p.hold ?? null, holdBack: p.holdBack ?? null, tilt: (p.tilt ?? 0) + (p.shake ? Math.sin(f * 1.3) * p.shake : 0),
  };
  if (p.lie) return <g transform={`translate(${fp.x} ${fp.y}) rotate(-90)`}><Figure {...fp} x={0} y={0} /></g>;
  const gl = fp.glow ?? 0;
  return (
    <g>
      {gl > 0 ? (
        <g opacity={0.45 * gl}>
          <circle cx={(fp.x ?? 540) + (fp.flip ? -60 : 60) * (fp.s ?? 1)} cy={(fp.y ?? 1520) - 960 * (fp.s ?? 1)} r={330 * (fp.s ?? 1) * (1 + 0.06 * Math.sin(f * 0.3))} fill="url(#egypt-aura)" />
        </g>
      ) : null}
      <Figure {...fp} />
    </g>
  );
}
