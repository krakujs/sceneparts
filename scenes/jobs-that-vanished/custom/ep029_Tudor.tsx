import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep029 – Groom of the Stool. Henry VIII's court: the king on his velvet close stool, the groom kneeling with towel + basin.
// visual: { mode?: "hook"|"stool"|"letter"|"block"|"stamp"|"deathbed", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, dropAt?: 0-1, stampAt?: 0-1, doc?: string }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const GOLD = "#E0B04A";
const GOLD_D = "#A9792A";
const VELVET = "#2A2030";
const VELVET_L = "#45364F";
const ROBE = "#B5452F";
const ROBE_D = "#7E2E22";
const FUR = "#F1E7D2";
const LIVERY = "#2F7A55";
const LIVERY_D = "#1F5A3D";
const SKIN = "#EDBE96";
const SKIN_K = "#F0C7A2";
const BEARD = "#B8692E";
const OAK = "#8C5A2B";
const OAK_D = "#5E3A1A";
const OAK_L = "#A8703A";
const PEWTER = "#B9BEC6";

const pop = (f: number, at = 0) => interpolate(f - at, [0, 12], [0.5, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });

const Chips: React.FC<{ items: string[]; dur: number; top: number }> = ({ items, dur, top }) => {
  const f = useCurrentFrame();
  return (
    <>
      {items.map((t, i) => {
        const at = 10 + i * Math.max(20, (dur - 24) / Math.max(1, items.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 104 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 44, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.3)", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </>
  );
};

const Overlay: React.FC<{ v: SceneProps["scene"]["visual"]; dur: number }> = ({ v, dur }) => (
  <>
    {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 96} /> : null}
    {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 470} /> : null}
    <Chips items={v.float ?? []} dur={dur} top={v.floatTop ?? 1010} />
  </>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="wall29" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F0D9A6" />
      <stop offset="1" stopColor="#DDB978" />
    </linearGradient>
    <linearGradient id="amber29" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5A2E22" />
      <stop offset="1" stopColor="#9C5A2E" />
    </linearGradient>
    <radialGradient id="candle29">
      <stop offset="0" stopColor={C.glow} stopOpacity={0.75} />
      <stop offset="1" stopColor={C.glow} stopOpacity={0} />
    </radialGradient>
    <linearGradient id="velvet29" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={VELVET_L} />
      <stop offset="1" stopColor={VELVET} />
    </linearGradient>
  </defs>
);

// Tudor chamber: tapestry with a gold lattice, linenfold oak panelling, chequered floor, red curtain swags.
const Chamber: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={900} fill="url(#wall29)" />
    <rect x={60} y={330} width={960} height={540} fill={ROBE_D} stroke={INK} strokeWidth={8} />
    {new Array(9).fill(0).map((_, i) => (
      <line key={`a${i}`} x1={60 + i * 120} y1={330} x2={60 + i * 120 + 540} y2={870} stroke={GOLD} strokeWidth={4} opacity={0.55} />
    ))}
    {new Array(9).fill(0).map((_, i) => (
      <line key={`b${i}`} x1={1020 - i * 120} y1={330} x2={1020 - i * 120 - 540} y2={870} stroke={GOLD} strokeWidth={4} opacity={0.55} />
    ))}
    <rect x={60} y={330} width={960} height={540} fill="none" stroke={GOLD} strokeWidth={14} />
    {/* Tudor rose in the middle of the tapestry */}
    <g transform="translate(540 560)">
      {[0, 72, 144, 216, 288].map((r) => <circle key={r} cx={Math.cos((r * Math.PI) / 180) * 38} cy={Math.sin((r * Math.PI) / 180) * 38} r={34} fill={C.brick} stroke={INK} strokeWidth={5} />)}
      <circle r={30} fill={C.cream} stroke={INK} strokeWidth={5} />
      <circle r={12} fill={GOLD} />
    </g>
    {/* oak panelling */}
    <rect x={0} y={880} width={1080} height={380} fill={OAK} />
    {[20, 230, 440, 650, 860].map((x) => (
      <g key={x}>
        <rect x={x} y={910} width={190} height={320} rx={10} fill={OAK_L} stroke={OAK_D} strokeWidth={6} />
        {[0, 1, 2].map((k) => <path key={k} d={`M ${x + 40 + k * 55} 940 Q ${x + 62 + k * 55} 1070 ${x + 40 + k * 55} 1200`} fill="none" stroke={OAK_D} strokeWidth={4} opacity={0.6} />)}
      </g>
    ))}
    <rect x={0} y={872} width={1080} height={16} fill={OAK_D} />
    {/* chequered floor */}
    <rect x={0} y={1260} width={1080} height={660} fill={C.paper} />
    {new Array(10).fill(0).map((_, i) =>
      new Array(6).fill(0).map((__, j) => ((i + j) % 2 === 0 ? <rect key={`${i}-${j}`} x={i * 120 - 60 + (j % 2) * 0} y={1260 + j * 110} width={120} height={110} fill={C.paperDark} /> : null)),
    )}
    <rect x={0} y={1252} width={1080} height={14} fill={OAK_D} />
    {/* curtain swags */}
    <path d={`M 0 0 L 0 1250 Q 70 ${1150 + Math.sin(f / 30) * 6} 120 1250 L 170 0 Z`} fill={C.brick} stroke={INK} strokeWidth={8} />
    <path d={`M 1080 0 L 1080 1250 Q 1010 ${1150 + Math.sin(f / 30 + 1) * 6} 960 1250 L 910 0 Z`} fill={C.brick} stroke={INK} strokeWidth={8} />
    <path d="M 0 0 L 1080 0 L 1080 110 Q 810 210 540 120 Q 270 210 0 110 Z" fill={C.brick} stroke={INK} strokeWidth={8} />
    <path d="M 0 104 Q 270 204 540 114 Q 810 204 1080 104" fill="none" stroke={GOLD} strokeWidth={10} />
  </>
);

// The close stool: a box covered in black velvet, gold nails along every edge, silk fringe, padded seat. open: 0..1 lifts the lid.
const CloseStool: React.FC<{ x: number; y: number; f: number; open?: number; s?: number }> = ({ x, y, f, open = 0, s = 1 }) => {
  const w = 300;
  const h = 190;
  const nails = (x1: number, y1: number, x2: number, y2: number, n: number) =>
    new Array(n).fill(0).map((_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const glint = Math.abs(Math.sin(f / 9 + i)) > 0.96;
      return <circle key={`${x1}-${y1}-${i}`} cx={x1 + (x2 - x1) * t} cy={y1 + (y2 - y1) * t} r={glint ? 8 : 6} fill={glint ? "#FFF3C4" : GOLD} stroke={INK} strokeWidth={2} />;
    });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* box */}
      <rect x={-w / 2} y={0} width={w} height={h} rx={10} fill="url(#velvet29)" stroke={INK} strokeWidth={7} />
      <rect x={-w / 2 + 22} y={26} width={w - 44} height={h - 56} rx={8} fill="none" stroke={GOLD} strokeWidth={4} opacity={0.7} />
      {nails(-w / 2 + 10, 12, w / 2 - 10, 12, 12)}
      {nails(-w / 2 + 10, h - 12, w / 2 - 10, h - 12, 12)}
      {nails(-w / 2 + 10, 12, -w / 2 + 10, h - 12, 7)}
      {nails(w / 2 - 10, 12, w / 2 - 10, h - 12, 7)}
      {/* fringe */}
      {new Array(20).fill(0).map((_, i) => (
        <line key={i} x1={-w / 2 + 8 + i * 14.6} y1={h} x2={-w / 2 + 8 + i * 14.6 + Math.sin(f / 10 + i) * 3} y2={h + 26} stroke={C.brick} strokeWidth={6} strokeLinecap="round" />
      ))}
      {/* opening: pewter pot inside */}
      {open > 0.02 ? (
        <g>
          <ellipse cx={0} cy={-2} rx={110} ry={30} fill={INK} />
          <ellipse cx={0} cy={0} rx={88} ry={22} fill={PEWTER} stroke={INK} strokeWidth={5} />
          <ellipse cx={0} cy={2} rx={66} ry={14} fill="#7D838D" />
        </g>
      ) : null}
      {/* padded seat / lid */}
      <g transform={`rotate(${-open * 35}, ${-w / 2}, -8)`}>
        <rect x={-w / 2 - 8} y={-30} width={w + 16} height={34} rx={16} fill={VELVET_L} stroke={INK} strokeWidth={7} />
        <path d={`M ${-w / 2 + 20} -14 Q 0 -40 ${w / 2 - 20} -14`} fill="none" stroke={C.brick} strokeWidth={6} opacity={0.8} />
        {nails(-w / 2 + 4, -12, w / 2 - 4, -12, 10)}
      </g>
    </g>
  );
};

// Henry VIII, seated (seat top at y). eyes: "open" | "shut" | "pale" (dying).
const King: React.FC<{ x: number; y: number; f: number; eyes?: "open" | "shut" | "blink" }> = ({ x, y, f, eyes = "blink" }) => {
  const shut = eyes === "shut" || (eyes === "blink" && Math.sin(f / 22) > 0.55);
  const hy = y - 330;
  const breathe = Math.sin(f / 18) * 3;
  return (
    <g>
      {/* hose + shoes */}
      {[-70, 70].map((dx) => (
        <g key={dx}>
          <rect x={x + dx - 24} y={y + 20} width={48} height={180} rx={20} fill={C.cream} stroke={INK} strokeWidth={6} />
          <ellipse cx={x + dx + (dx < 0 ? -10 : 10)} cy={y + 200} rx={52} ry={20} fill={INK} />
        </g>
      ))}
      {/* robe */}
      <g transform={`translate(0 ${breathe})`}>
        <path d={`M ${x - 175} ${y + 50} L ${x - 160} ${y - 200} Q ${x - 130} ${y - 262} ${x - 80} ${y - 262} L ${x + 80} ${y - 262} Q ${x + 130} ${y - 262} ${x + 160} ${y - 200} L ${x + 175} ${y + 50} Z`} fill={ROBE} stroke={INK} strokeWidth={8} />
        <rect x={x - 62} y={y - 250} width={124} height={290} fill="#E3C77A" stroke={INK} strokeWidth={6} />
        {[-30, 0, 30].map((dx) => [y - 210, y - 150, y - 90, y - 30].map((yy) => <rect key={`${dx}${yy}`} x={x + dx - 8} y={yy} width={16} height={26} rx={6} fill={C.cream} stroke={GOLD_D} strokeWidth={3} />))}
        {/* fur collar + front edges */}
        <path d={`M ${x - 168} ${y - 196} Q ${x - 120} ${y - 280} ${x - 64} ${y - 258} L ${x - 62} ${y + 46} L ${x - 108} ${y + 48} L ${x - 104} ${y - 200} Z`} fill={FUR} stroke={INK} strokeWidth={6} />
        <path d={`M ${x + 168} ${y - 196} Q ${x + 120} ${y - 280} ${x + 64} ${y - 258} L ${x + 62} ${y + 46} L ${x + 108} ${y + 48} L ${x + 104} ${y - 200} Z`} fill={FUR} stroke={INK} strokeWidth={6} />
        {/* gold chain */}
        <path d={`M ${x - 92} ${y - 240} Q ${x} ${y - 120} ${x + 92} ${y - 240}`} fill="none" stroke={GOLD} strokeWidth={12} strokeDasharray="14 8" />
        <circle cx={x} cy={y - 168} r={18} fill={GOLD} stroke={INK} strokeWidth={4} />
        {/* puffed sleeves to hands on knees */}
        {[-1, 1].map((sd) => (
          <g key={sd}>
            <path d={`M ${x + sd * 150} ${y - 220} Q ${x + sd * 230} ${y - 120} ${x + sd * 150} ${y + 10}`} fill="none" stroke={INK} strokeWidth={72} strokeLinecap="round" />
            <path d={`M ${x + sd * 150} ${y - 220} Q ${x + sd * 230} ${y - 120} ${x + sd * 150} ${y + 10}`} fill="none" stroke={ROBE} strokeWidth={58} strokeLinecap="round" />
            {[0.3, 0.55, 0.8].map((t) => <circle key={t} cx={x + sd * (150 + 80 * 2 * t * (1 - t) * 1.0)} cy={y - 220 + 230 * t} r={8} fill={C.cream} stroke={INK} strokeWidth={3} />)}
            <circle cx={x + sd * 140} cy={y + 24} r={26} fill={SKIN_K} stroke={INK} strokeWidth={6} />
          </g>
        ))}
        {/* head */}
        <rect x={x - 28} y={hy + 56} width={56} height={40} fill={SKIN_K} stroke={INK} strokeWidth={6} />
        <circle cx={x} cy={hy} r={76} fill={SKIN_K} stroke={INK} strokeWidth={8} />
        <path d={`M ${x - 74} ${hy + 6} Q ${x - 70} ${hy + 92} ${x} ${hy + 96} Q ${x + 70} ${hy + 92} ${x + 74} ${hy + 6} Q ${x + 40} ${hy + 44} ${x} ${hy + 42} Q ${x - 40} ${hy + 44} ${x - 74} ${hy + 6} Z`} fill={BEARD} stroke={INK} strokeWidth={6} />
        <path d={`M ${x - 30} ${hy + 30} Q ${x} ${hy + 18} ${x + 30} ${hy + 30} Q ${x} ${hy + 26} ${x - 30} ${hy + 30} Z`} fill={BEARD} stroke={INK} strokeWidth={4} />
        {shut ? (
          <>
            <path d={`M ${x - 40} ${hy - 6} Q ${x - 27} ${hy + 4} ${x - 14} ${hy - 6}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
            <path d={`M ${x + 14} ${hy - 6} Q ${x + 27} ${hy + 4} ${x + 40} ${hy - 6}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx={x - 26} cy={hy - 6} r={8} fill={INK} />
            <circle cx={x + 26} cy={hy - 6} r={8} fill={INK} />
          </>
        )}
        <path d={`M ${x - 44} ${hy - 26} Q ${x - 27} ${hy - 38} ${x - 10} ${hy - 28}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${x + 44} ${hy - 26} Q ${x + 27} ${hy - 38} ${x + 10} ${hy - 28}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <circle cx={x - 46} cy={hy + 14} r={12} fill="#E8957A" opacity={0.6} />
        <circle cx={x + 46} cy={hy + 14} r={12} fill="#E8957A" opacity={0.6} />
        {/* flat cap with feather + jewels */}
        <path d={`M ${x - 40} ${hy - 104} Q ${x + 30} ${hy - 160 + Math.sin(f / 9) * 6} ${x + 120} ${hy - 120 + Math.sin(f / 9) * 6}`} fill="none" stroke="#FFFFFF" strokeWidth={26} strokeLinecap="round" />
        <path d={`M ${x - 40} ${hy - 104} Q ${x + 30} ${hy - 160 + Math.sin(f / 9) * 6} ${x + 120} ${hy - 120 + Math.sin(f / 9) * 6}`} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="6 10" />
        <ellipse cx={x} cy={hy - 66} rx={110} ry={32} fill={INK} />
        <path d={`M ${x - 72} ${hy - 70} Q ${x - 70} ${hy - 124} ${x} ${hy - 124} Q ${x + 70} ${hy - 124} ${x + 72} ${hy - 70} Z`} fill={INK} />
        {[-60, -20, 20, 60].map((dx) => <circle key={dx} cx={x + dx} cy={hy - 72} r={7} fill={GOLD} />)}
      </g>
    </g>
  );
};

// The groom, kneeling (floor at y), facing right, holding a basin; towel over his arm. sweat = nervous drops.
const Groom: React.FC<{ x: number; y: number; f: number; sweat?: boolean; offer?: number }> = ({ x, y, f, sweat = true, offer = 1 }) => {
  const bob = Math.sin(f / 7) * 2.5;
  const hy = y - 380 + bob;
  const reach = 100 + offer * 40;
  const drop = (f % 40) / 40;
  return (
    <g>
      {/* legs: back knee on floor, front knee up */}
      <path d={`M ${x - 10} ${y - 140} L ${x - 30} ${y - 20} L ${x - 130} ${y - 14}`} fill="none" stroke={INK} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x - 10} ${y - 140} L ${x - 30} ${y - 20} L ${x - 130} ${y - 14}`} fill="none" stroke={LIVERY_D} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x + 10} ${y - 140} L ${x + 100} ${y - 140} L ${x + 100} ${y - 12}`} fill="none" stroke={INK} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x + 10} ${y - 140} L ${x + 100} ${y - 140} L ${x + 100} ${y - 12}`} fill="none" stroke={LIVERY_D} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={x + 118} cy={y - 6} rx={36} ry={14} fill={INK} />
      <ellipse cx={x - 146} cy={y - 8} rx={30} ry={12} fill={INK} />
      {/* tunic */}
      <g transform={`translate(0 ${bob})`}>
        <path d={`M ${x - 80} ${y - 110} L ${x - 58} ${y - 310} Q ${x} ${y - 336} ${x + 58} ${y - 310} L ${x + 80} ${y - 110} Z`} fill={LIVERY} stroke={INK} strokeWidth={7} />
        <rect x={x - 66} y={y - 190} width={132} height={16} fill={GOLD} stroke={INK} strokeWidth={4} />
        <circle cx={x} cy={y - 250} r={20} fill={C.brick} stroke={INK} strokeWidth={4} />
        <circle cx={x} cy={y - 250} r={8} fill={C.cream} />
        {/* towel draped over the left shoulder */}
        <path d={`M ${x - 62} ${y - 312} L ${x - 20} ${y - 318} L ${x - 30} ${y - 150} L ${x - 76} ${y - 160} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <line x1={x - 70} y1={y - 175} x2={x - 30} y2={y - 168} stroke={C.brick} strokeWidth={5} />
        {/* arms to the basin */}
        {[-1, 1].map((k) => (
          <g key={k}>
            <line x1={x + 30 * k} y1={y - 290} x2={x + reach + k * 10} y2={y - 236} stroke={INK} strokeWidth={30} strokeLinecap="round" />
            <line x1={x + 30 * k} y1={y - 290} x2={x + reach + k * 10} y2={y - 236} stroke={LIVERY} strokeWidth={18} strokeLinecap="round" />
          </g>
        ))}
        <path d={`M ${x + reach - 50} ${y - 236} Q ${x + reach + 20} ${y - 190} ${x + reach + 90} ${y - 236} Z`} fill={GOLD} stroke={INK} strokeWidth={6} />
        <ellipse cx={x + reach + 20} cy={y - 238} rx={72} ry={16} fill={GOLD} stroke={INK} strokeWidth={6} />
        <ellipse cx={x + reach + 20} cy={y - 238} rx={52} ry={9} fill="#9FC7D6" />
        <circle cx={x + reach - 6} cy={y - 236} r={15} fill={SKIN} stroke={INK} strokeWidth={4} />
        <circle cx={x + reach + 14} cy={y - 236} r={15} fill={SKIN} stroke={INK} strokeWidth={4} />
        {/* head */}
        <rect x={x - 18} y={hy + 40} width={36} height={34} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={x} cy={hy} r={54} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d={`M ${x - 54} ${hy - 4} Q ${x - 52} ${hy - 56} ${x} ${hy - 58} Q ${x + 30} ${hy - 58} ${x + 50} ${hy - 30} L ${x - 30} ${hy - 30} Q ${x - 44} ${hy - 20} ${x - 54} ${hy - 4} Z`} fill="#6B4223" />
        <ellipse cx={x - 6} cy={hy - 46} rx={62} ry={16} fill={INK} />
        <path d={`M ${x - 46} ${hy - 50} Q ${x - 6} ${hy - 92} ${x + 40} ${hy - 50} Z`} fill={INK} />
        <circle cx={x + 18} cy={hy - 2} r={7} fill={INK} />
        <circle cx={x + 42} cy={hy - 2} r={7} fill={INK} />
        <path d={`M ${x + 10} ${hy - 22} L ${x + 26} ${hy - 16} M ${x + 52} ${hy - 22} L ${x + 38} ${hy - 16}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d={`M ${x + 12} ${hy + 28} Q ${x + 20} ${hy + 20} ${x + 28} ${hy + 28} Q ${x + 36} ${hy + 36} ${x + 44} ${hy + 28}`} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        {sweat ? (
          <path d={`M ${x - 30} ${hy - 20 + drop * 50} q -9 16 0 22 q 9 -6 0 -22 Z`} fill="#8FD0F0" stroke={INK} strokeWidth={3} opacity={1 - drop} />
        ) : null}
      </g>
    </g>
  );
};

const Ewer: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x - 34} ${y} Q ${x - 50} ${y - 70} ${x - 22} ${y - 110} L ${x + 22} ${y - 110} Q ${x + 50} ${y - 70} ${x + 34} ${y} Z`} fill={GOLD} stroke={INK} strokeWidth={6} />
    <path d={`M ${x + 22} ${y - 104} L ${x + 56} ${y - 130}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
    <path d={`M ${x - 30} ${y - 90} Q ${x - 70} ${y - 70} ${x - 36} ${y - 34}`} fill="none" stroke={INK} strokeWidth={8} />
  </g>
);

const Court: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const offer = interpolate(f, [0, 14], [0.2, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <Chamber f={f} />
        <ellipse cx={690} cy={1262} rx={220} ry={26} fill={INK} opacity={0.18} />
        <CloseStool x={690} y={1062} f={f} />
        <King x={690} y={1040} f={f} />
        <Ewer x={500} y={1290} />
        <Groom x={250} y={1300} f={f} offer={offer} />
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

const StoolClose: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const open = interpolate(f, [dur * 0.35, dur * 0.35 + 14], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  const towel = interpolate(f, [dur * 0.55, dur * 0.55 + 12], [500, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <Chamber f={f} />
        <rect x={0} y={0} width={1080} height={1920} fill={C.glow} opacity={0.18} />
        <ellipse cx={540} cy={1410} rx={360} ry={40} fill={INK} opacity={0.2} />
        <g transform={`translate(540 1000) scale(${pop(f)}) translate(-540 -1000)`}>
          <CloseStool x={540} y={1000} f={f} open={open} s={1.9} />
        </g>
        {/* the groom's hand arriving with a towel */}
        <g transform={`translate(${towel} 0)`}>
          <path d="M 1100 760 L 900 790 L 900 900 L 1100 880 Z" fill={LIVERY} stroke={INK} strokeWidth={7} />
          <path d="M 760 770 L 920 760 L 930 960 L 790 980 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <line x1={770} y1={930} x2={925} y2={915} stroke={C.brick} strokeWidth={6} />
          <circle cx={900} cy={800} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

// The 1539 letter: parchment, a quill writing, the key words in red.
const Letter: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const lines: { t: string; hot?: boolean }[] = v.lines ?? [
    { t: "…by working of the pills" },
    { t: "and glister that his Highness" },
    { t: "had taken before, had" },
    { t: "a very fair siege", hot: true },
  ];
  const total = lines.reduce((a, l) => a + l.t.length, 0);
  const shown = interpolate(f, [4, dur * 0.72], [0, total], clamp);
  let left = shown;
  let qx = 200;
  let qy = 700;
  return (
    <Backdrop sky="paper" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <rect x={0} y={1320} width={1080} height={600} fill={OAK} />
        <rect x={0} y={1312} width={1080} height={16} fill={OAK_D} />
        <g transform={`rotate(-2 540 900) translate(540 900) scale(${pop(f)}) translate(-540 -900)`}>
          <rect x={110} y={500} width={860} height={860} rx={14} fill="#F6E7C4" stroke={INK} strokeWidth={8} />
          <path d="M 110 520 Q 140 500 170 520" fill="none" stroke={C.paperDark} strokeWidth={6} />
          <text x={540} y={590} textAnchor="middle" fontSize={40} fontFamily={typeFont} fill={C.sepia}>{v.doc ?? "To Cromwell · 12 Sept 1539"}</text>
          <line x1={180} y1={620} x2={900} y2={620} stroke={C.sepia} strokeWidth={3} opacity={0.6} />
          {lines.map((l, i) => {
            const n = Math.max(0, Math.min(l.t.length, Math.floor(left)));
            left -= l.t.length;
            const y = 730 + i * 110;
            if (n > 0 && n <= l.t.length) {
              qx = 170 + n * (l.hot ? 30 : 23);
              qy = y;
            }
            return (
              <g key={i}>
                <text x={170} y={y} fontSize={l.hot ? 62 : 46} fontFamily={l.hot ? titleFont : typeFont} fill={l.hot ? C.brick : INK}>{l.t.slice(0, n)}</text>
                {l.hot && n === l.t.length ? <line x1={170} y1={y + 20} x2={170 + interpolate(f, [dur * 0.72, dur * 0.8], [0, 640], clamp)} y2={y + 24} stroke={C.brick} strokeWidth={8} strokeLinecap="round" /> : null}
              </g>
            );
          })}
          <text x={880} y={1250} textAnchor="end" fontSize={40} fontFamily={typeFont} fill={C.sepia}>— Tho. Heneage</text>
          <circle cx={240} cy={1250} r={52} fill={C.brick} stroke={INK} strokeWidth={6} />
          <circle cx={240} cy={1250} r={30} fill="none" stroke={C.brickDark} strokeWidth={5} />
        </g>
        {/* quill */}
        <g transform={`translate(${Math.min(qx, 900)} ${qy + Math.sin(f / 2) * 4}) rotate(-35)`}>
          <path d="M 0 0 L 12 -40 Q 40 -220 130 -330 Q 90 -180 40 -30 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <line x1={4} y1={-10} x2={110} y2={-300} stroke={INK} strokeWidth={3} />
          <circle cx={0} cy={0} r={5} fill={INK} />
        </g>
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

// Tower Hill, 1536: a scaffold and block; a courtier's cap falls and lands. No body – let the cap say it.
const Block: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const at = (v.dropAt ?? 0.5) * dur;
  const t = Math.max(0, f - at);
  const capY = f < at ? -200 : Math.min(1068, -200 + t * t * 6);
  const landed = capY >= 1068;
  const bounce = landed ? Math.abs(Math.sin((t - 14) / 3)) * Math.max(0, 18 - (t - 14) * 2) : 0;
  return (
    <Backdrop sky="dawn" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {/* the White Tower silhouette */}
        <g fill={C.stone} opacity={0.75}>
          <rect x={300} y={520} width={480} height={520} />
          {[300, 740].map((x) => (
            <g key={x}>
              <rect x={x - 20} y={440} width={80} height={600} />
              <path d={`M ${x - 26} 444 Q ${x + 20} 360 ${x + 66} 444 Z`} />
            </g>
          ))}
          {new Array(8).fill(0).map((_, i) => <rect key={i} x={312 + i * 58} y={490} width={34} height={34} />)}
          {[420, 540, 660].map((x) => <rect key={x} x={x - 16} y={640} width={32} height={60} rx={16} fill={C.stoneDark} />)}
        </g>
        <rect x={0} y={1040} width={1080} height={880} fill="#7C8A5A" />
        {/* scaffold */}
        <rect x={160} y={1120} width={760} height={50} fill={OAK_L} stroke={INK} strokeWidth={7} />
        {[200, 400, 680, 880].map((x) => <rect key={x} x={x - 14} y={1170} width={28} height={260} fill={OAK} stroke={INK} strokeWidth={5} />)}
        <path d="M 186 1180 L 400 1420 M 400 1180 L 186 1420 M 680 1180 L 894 1420 M 894 1180 L 680 1420" stroke={OAK_D} strokeWidth={10} />
        {/* block + straw */}
        <rect x={430} y={1030} width={220} height={92} rx={10} fill={OAK} stroke={INK} strokeWidth={7} />
        <path d="M 500 1030 Q 540 1004 580 1030" fill="none" stroke={INK} strokeWidth={7} />
        {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={330 + k * 30} y1={1118} x2={346 + k * 30} y2={1100} stroke={C.mustard} strokeWidth={5} />)}
        {/* axe leaning */}
        <g transform="rotate(14 790 1110)">
          <rect x={782} y={760} width={18} height={360} rx={8} fill={OAK_D} stroke={INK} strokeWidth={5} />
          <path d="M 800 780 Q 900 760 912 840 Q 870 860 800 860 Z" fill={C.stone} stroke={INK} strokeWidth={6} />
        </g>
        {/* the cap */}
        <g transform={`translate(540 ${capY - bounce}) rotate(${landed ? -8 : t * 9})`}>
          <ellipse cx={0} cy={0} rx={84} ry={22} fill={INK} />
          <path d="M -54 -2 Q -52 -46 0 -46 Q 52 -46 54 -2 Z" fill={INK} />
          <path d="M -40 -30 Q 20 -86 96 -50" fill="none" stroke="#FFFFFF" strokeWidth={18} strokeLinecap="round" />
          <circle cx={-20} cy={-8} r={6} fill={GOLD} />
          <circle cx={20} cy={-8} r={6} fill={GOLD} />
        </g>
        {landed ? <path d="M 430 1050 L 400 1030 M 650 1050 L 680 1030 M 540 1000 L 540 970" stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={interpolate(t, [14, 24], [1, 0], clamp)} /> : null}
        {/* raven */}
        <g transform={`translate(${250 + Math.sin(f / 15) * 4} ${1110 - Math.abs(Math.sin(f / 6)) * 6})`}>
          <ellipse cx={0} cy={-26} rx={36} ry={24} fill={INK} />
          <circle cx={30} cy={-50} r={16} fill={INK} />
          <path d="M 42 -52 L 66 -46 L 42 -42 Z" fill={INK} />
          <circle cx={34} cy={-54} r={3} fill="#FFFFFF" />
          <line x1={-6} y1={-4} x2={-6} y2={4} stroke={INK} strokeWidth={4} />
          <line x1={6} y1={-4} x2={6} y2={4} stroke={INK} strokeWidth={4} />
        </g>
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

// The "dry stamp": a block presses the king's signature into paper as a groove; a clerk then inks it in.
const Stamp: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const at = (v.stampAt ?? 0.3) * dur;
  const down = interpolate(f, [at - 8, at], [-520, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  const up = interpolate(f, [at + 6, at + 18], [0, -620], { ...clamp, easing: Easing.in(Easing.quad) });
  const sy = f < at + 6 ? down : up;
  const pressed = f >= at;
  const ink = interpolate(f, [at + 20, at + 44], [0, 1], clamp);
  const shake = f >= at && f < at + 6 ? Math.sin(f * 3) * 10 : 0;
  return (
    <Backdrop sky="paper" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <rect x={0} y={1180} width={1080} height={740} fill={OAK} />
        <rect x={0} y={1172} width={1080} height={16} fill={OAK_D} />
        <g transform={`translate(${shake} ${shake * 0.4}) rotate(1.5 540 1000)`}>
          <rect x={110} y={560} width={860} height={760} rx={12} fill="#F6E7C4" stroke={INK} strokeWidth={8} />
          <text x={540} y={660} textAnchor="middle" fontSize={44} fontFamily={titleFont} fill={C.brickDark}>{v.doc ?? "BY THE KING"}</text>
          {v.docSub ? <text x={540} y={720} textAnchor="middle" fontSize={38} fontFamily={typeFont} fill={C.sepia}>{v.docSub}</text> : null}
          {[790, 850, 910, 970].map((y, i) => <line key={y} x1={180} y1={y} x2={i === 3 ? 640 : 900} y2={y} stroke={C.sepia} strokeWidth={6} opacity={0.35} strokeLinecap="round" />)}
          {pressed ? (
            <g>
              <text x={540} y={1170} textAnchor="middle" fontSize={150} fontStyle="italic" fontFamily="serif" fill="none" stroke={C.paperDark} strokeWidth={5}>Henry R</text>
              <text x={540} y={1170} textAnchor="middle" fontSize={150} fontStyle="italic" fontFamily="serif" fill={INK} opacity={ink}>Henry R</text>
            </g>
          ) : null}
          {pressed && ink < 1 && ink > 0 ? (
            <g transform={`translate(${300 + ink * 480} ${1150 - Math.abs(Math.sin(f / 2)) * 30}) rotate(-35)`}>
              <path d="M 0 0 L 12 -40 Q 40 -220 130 -330 Q 90 -180 40 -30 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
        </g>
        {/* the stamp */}
        <g transform={`translate(540 ${1040 + sy})`}>
          <rect x={-40} y={-360} width={80} height={220} rx={36} fill={OAK_D} stroke={INK} strokeWidth={7} />
          <ellipse cx={0} cy={-360} rx={64} ry={34} fill={OAK} stroke={INK} strokeWidth={7} />
          <rect x={-300} y={-150} width={600} height={120} rx={14} fill={GOLD} stroke={INK} strokeWidth={8} />
          <rect x={-290} y={-40} width={580} height={30} fill={GOLD_D} stroke={INK} strokeWidth={6} />
        </g>
        {pressed && f < at + 10 ? (
          <g stroke={INK} strokeWidth={8} strokeLinecap="round">
            <line x1={190} y1={1110} x2={140} y2={1080} />
            <line x1={890} y1={1110} x2={940} y2={1080} />
            <line x1={170} y1={1180} x2={110} y2={1190} />
            <line x1={910} y1={1180} x2={970} y2={1190} />
          </g>
        ) : null}
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

// January 1547: candlelit bedchamber, the dying king; his groom leans in to tell him.
const Deathbed: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const flick = 1 + Math.sin(f / 3) * 0.05 + Math.sin(f / 7) * 0.04;
  const lean = interpolate(f, [0, dur * 0.4], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const kx = 650;
  const ky = 900;
  return (
    <Backdrop sky="dark" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <rect x={0} y={0} width={1080} height={1920} fill="url(#amber29)" />
        <circle cx={200} cy={880} r={420 * flick} fill="url(#candle29)" />
        {/* four-poster bed */}
        <rect x={360} y={360} width={680} height={110} fill={ROBE_D} stroke={INK} strokeWidth={8} />
        <path d="M 360 470 Q 420 560 470 470 Q 530 560 590 470" fill={C.brick} stroke={INK} strokeWidth={6} />
        {[380, 1020].map((x) => <rect key={x} x={x - 18} y={360} width={36} height={900} fill={OAK_D} stroke={INK} strokeWidth={6} />)}
        <rect x={380} y={960} width={640} height={300} rx={20} fill={ROBE} stroke={INK} strokeWidth={8} />
        <path d="M 380 980 Q 700 900 1020 980 L 1020 1100 L 380 1100 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
        <path d="M 420 1010 Q 700 940 980 1010" fill="none" stroke={GOLD} strokeWidth={8} />
        {/* pillow + king's head, nightcap */}
        <ellipse cx={kx + 40} cy={ky + 30} rx={170} ry={64} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <circle cx={kx} cy={ky} r={70} fill="#E7C9AE" stroke={INK} strokeWidth={8} />
        <path d={`M ${kx - 68} ${ky + 8} Q ${kx - 62} ${ky + 86} ${kx} ${ky + 90} Q ${kx + 62} ${ky + 86} ${kx + 68} ${ky + 8} Q ${kx} ${ky + 44} ${kx - 68} ${ky + 8} Z`} fill={BEARD} stroke={INK} strokeWidth={6} opacity={0.9} />
        <path d={`M ${kx - 38} ${ky - 6} Q ${kx - 26} ${ky + 2} ${kx - 14} ${ky - 6} M ${kx + 14} ${ky - 6} Q ${kx + 26} ${ky + 2} ${kx + 38} ${ky - 6}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${kx - 72} ${ky - 30} Q ${kx} ${ky - 130} ${kx + 72} ${ky - 30} Z`} fill={C.cream} stroke={INK} strokeWidth={6} />
        {/* the groom leaning in from the left */}
        <g transform={`translate(${lean * 70} ${lean * 30}) rotate(${lean * 12} 330 1100)`}>
          <path d="M 200 1300 L 220 1020 Q 320 960 420 1020 L 440 1300 Z" fill={INK} stroke={INK} strokeWidth={6} />
          <path d="M 260 1010 Q 320 1080 380 1010" fill="none" stroke={GOLD} strokeWidth={10} strokeDasharray="12 7" />
          <circle cx={330} cy={900} r={64} fill={SKIN} stroke={INK} strokeWidth={8} />
          <path d="M 270 920 Q 280 1000 330 1004 Q 380 1000 392 920 Q 330 950 270 920 Z" fill="#5A3A22" stroke={INK} strokeWidth={5} />
          <ellipse cx={330} cy={846} rx={86} ry={24} fill={INK} />
          <path d="M 270 846 Q 330 790 392 846 Z" fill={INK} />
          <circle cx={350} cy={892} r={7} fill={INK} />
          <circle cx={376} cy={892} r={7} fill={INK} />
        </g>
        {/* whisper lines */}
        {lean > 0.8
          ? [0, 1, 2].map((k) => {
              const a = ((f + k * 10) % 30) / 30;
              return <path key={k} d={`M ${470 + a * 60} ${870 - a * 30} q 20 20 0 40`} fill="none" stroke={C.glow} strokeWidth={6} strokeLinecap="round" opacity={1 - a} />;
            })
          : null}
        {/* candle */}
        <rect x={150} y={1150} width={120} height={110} fill={OAK} stroke={INK} strokeWidth={6} />
        <rect x={190} y={1020} width={40} height={130} rx={6} fill={C.cream} stroke={INK} strokeWidth={5} />
        <path d={`M 210 ${1020 - 50 * flick} Q 232 990 210 1016 Q 188 990 210 ${1020 - 50 * flick} Z`} fill={C.glow} stroke={C.mustard} strokeWidth={4} />
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

export const Tudor: React.FC<SceneProps> = (p) => {
  const m = p.scene.visual.mode;
  if (m === "stool") return <StoolClose {...p} />;
  if (m === "letter") return <Letter {...p} />;
  if (m === "block") return <Block {...p} />;
  if (m === "stamp") return <Stamp {...p} />;
  if (m === "deathbed") return <Deathbed {...p} />;
  return <Court {...p} />;
};
