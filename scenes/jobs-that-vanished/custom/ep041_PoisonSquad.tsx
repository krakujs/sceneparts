import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep041 Poison Squad volunteer – 1902 USDA "Hygienic Table": young men ate free meals laced with borax & co.
// visual: { mode: "dinner" | "butter" | "capsule" | "satchel" | "clinic", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, scared? (0–1), pourAt? (0–1, dinner: powder starts), milkAt? (0–1, butter: switch to milk),
//           gulpAt? (0–1, capsule), ghost? (clinic: 0–1 sepia ghost of the 1902 diner), swallowAt? (0–1, clinic) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E9B48C";
const SKIN_D = "#C98C66";
const HAIR = "#3A2416";
const CLOTH = "#FBF7EE";
const GLASS = "#8A5A2E";
const POWDER = "#FFFFFF";
const ease = Easing.bezier(0.2, 1.4, 0.4, 1);

// ---------- the diner: young clerk in a 1900s suit, starched collar, bow tie. origin = table line, centre ----------
type DinerProps = {
  x: number; y: number; s?: number; f: number; scared?: number; look?: number; fork?: number; mouth?: number;
  gown?: boolean; sepia?: boolean; napkin?: boolean; satchel?: boolean; cheeks?: number;
};
const Diner: React.FC<DinerProps> = ({ x, y, s = 1, f, scared = 0.3, look = 0, fork = 0, mouth = 0, gown = false, sepia = false, napkin = true, satchel = false, cheeks = 0 }) => {
  const skin = sepia ? "#D6C09C" : SKIN;
  const skinD = sepia ? "#BFA67E" : SKIN_D;
  const hair = sepia ? "#7E6646" : HAIR;
  const coat = gown ? (sepia ? "#C9D6D2" : "#9FD3D0") : sepia ? "#8E7A5C" : "#2E3448";
  const eyeR = 22 + scared * 10;
  const pupil = 10 - scared * 3;
  const forkY = -260 - fork * 360;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* torso */}
      <path d="M -300 40 L -280 -420 Q -250 -520 -120 -540 L 120 -540 Q 250 -520 280 -420 L 300 40 Z" fill={coat} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
      {gown ? (
        <>
          {[-200, -100, 0, 100, 200].map((dx) => <circle key={dx} cx={dx} cy={-300 + (dx % 200 === 0 ? 0 : 80)} r={10} fill="#5FA8A6" />)}
          <path d="M -110 -540 Q 0 -470 110 -540" fill="none" stroke={INK} strokeWidth={7} />
        </>
      ) : (
        <>
          {/* lapels, shirt, starched collar + bow tie */}
          <path d="M -120 -540 L 0 -300 L 120 -540 Z" fill="#F6F2E8" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M -120 -540 L -40 -380 L -150 -420 Z M 120 -540 L 40 -380 L 150 -420 Z" fill={sepia ? "#7A6648" : "#232838"} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -70 -548 L 0 -505 L 70 -548 L 64 -510 L 0 -480 L -64 -510 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d="M 0 -488 L -62 -520 L -62 -456 Z M 0 -488 L 62 -520 L 62 -456 Z" fill={sepia ? "#6E5A40" : C.brick} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <circle cx={0} cy={-488} r={13} fill={sepia ? "#6E5A40" : C.brick} stroke={INK} strokeWidth={5} />
        </>
      )}
      {/* tucked napkin */}
      {napkin ? <path d="M -90 -470 L 90 -470 L 140 -150 Q 0 -110 -140 -150 Z" fill={CLOTH} stroke={INK} strokeWidth={7} strokeLinejoin="round" /> : null}
      {satchel ? (
        <g>
          <path d="M -250 -500 L 230 -40" stroke="#6A4224" strokeWidth={34} strokeLinecap="round" />
          <rect x={120} y={-140} width={260} height={210} rx={22} fill="#8A5A32" stroke={INK} strokeWidth={9} />
          <path d="M 120 -90 Q 250 -40 380 -90 L 380 -140 L 120 -140 Z" fill="#6A4224" stroke={INK} strokeWidth={7} />
          <rect x={232} y={-80} width={36} height={30} rx={4} fill={C.mustard} stroke={INK} strokeWidth={5} />
        </g>
      ) : null}
      {/* right arm (screen right) with the fork */}
      {fork >= 0 && !satchel ? (
        <g>
          <path d={`M 270 -400 Q 340 -200 200 ${forkY + 40}`} stroke={INK} strokeWidth={84} strokeLinecap="round" fill="none" />
          <path d={`M 270 -400 Q 340 -200 200 ${forkY + 40}`} stroke={coat} strokeWidth={68} strokeLinecap="round" fill="none" />
          <g transform={`translate(190 ${forkY}) rotate(-20)`}>
            <rect x={-8} y={-10} width={16} height={150} rx={6} fill="#D8DCE2" stroke={INK} strokeWidth={5} />
            <path d="M -26 -70 L -26 -10 L 26 -10 L 26 -70 M -9 -70 L -9 -10 M 9 -70 L 9 -10" stroke={INK} strokeWidth={7} fill="none" />
            <ellipse cx={0} cy={-80} rx={46} ry={30} fill="#8A4A2A" stroke={INK} strokeWidth={6} />
            <circle cx={-12} cy={-92} r={7} fill={POWDER} />
            <circle cx={14} cy={-86} r={6} fill={POWDER} />
          </g>
          <circle cx={200} cy={forkY + 40} r={40} fill={skin} stroke={INK} strokeWidth={7} />
        </g>
      ) : null}
      {/* neck + head */}
      <rect x={-60} y={-600} width={120} height={80} fill={skinD} stroke={INK} strokeWidth={7} />
      <g transform="translate(0 -780)">
        <ellipse cx={0} cy={0} rx={178 + cheeks * 20} ry={200} fill={skin} stroke={INK} strokeWidth={9} />
        <ellipse cx={-176} cy={20} rx={30} ry={46} fill={skin} stroke={INK} strokeWidth={7} />
        <ellipse cx={176} cy={20} rx={30} ry={46} fill={skin} stroke={INK} strokeWidth={7} />
        {/* slick centre-parted 1900s hair */}
        <path d="M -182 -30 Q -200 -190 -10 -206 L 0 -150 L 10 -206 Q 200 -190 182 -30 Q 150 -120 20 -150 L 0 -120 L -20 -150 Q -150 -120 -182 -30 Z" fill={hair} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {/* eyes */}
        <ellipse cx={-70} cy={-10} rx={eyeR + 6} ry={eyeR + 2} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <ellipse cx={70} cy={-10} rx={eyeR + 6} ry={eyeR + 2} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <circle cx={-70 + look * 12} cy={-4 + scared * 6} r={pupil + 4} fill={INK} />
        <circle cx={70 + look * 12} cy={-4 + scared * 6} r={pupil + 4} fill={INK} />
        <path d={`M -120 ${-70 - scared * 22} Q -70 ${-92 - scared * 26} -24 ${-66 - scared * 10}`} stroke={hair} strokeWidth={15} strokeLinecap="round" fill="none" />
        <path d={`M 120 ${-70 - scared * 22} Q 70 ${-92 - scared * 26} 24 ${-66 - scared * 10}`} stroke={hair} strokeWidth={15} strokeLinecap="round" fill="none" />
        <path d="M 0 10 Q -30 70 4 80" stroke={skinD} strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={-110} cy={60} rx={30} ry={14} fill="#E06A3A" opacity={sepia ? 0 : 0.3 + cheeks * 0.3} />
        <ellipse cx={110} cy={60} rx={30} ry={14} fill="#E06A3A" opacity={sepia ? 0 : 0.3 + cheeks * 0.3} />
        {/* mouth */}
        {mouth > 0.3 ? (
          <ellipse cx={0} cy={140} rx={30 + mouth * 14} ry={16 + mouth * 26} fill="#5A1E14" stroke={INK} strokeWidth={6} />
        ) : cheeks > 0.3 ? (
          <path d="M -30 140 Q 0 150 30 140" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M -50 140 Q -20 128 0 138 Q 20 128 50 140" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        {scared > 0.5 ? <path d={`M 150 ${-100 + ((f * 3) % 140)} q -16 26 0 34 q 16 -8 0 -34 Z`} fill="#BFE6FF" stroke={INK} strokeWidth={4} /> : null}
      </g>
    </g>
  );
};

// big apothecary jar with a skull label. origin = centre of the body
const Jar: React.FC<{ label?: string; w?: number; h?: number; sepia?: boolean }> = ({ label = "BORAX", w = 400, h = 560, sepia = false }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={60} fill={sepia ? "#A08A66" : GLASS} stroke={INK} strokeWidth={11} />
    <rect x={-w / 2 + 40} y={-h / 2 + 30} width={40} height={h - 60} rx={20} fill="#FFFFFF" opacity={0.28} />
    <rect x={-w * 0.32} y={-h / 2 - 70} width={w * 0.64} height={80} rx={14} fill={sepia ? "#8E7656" : "#6A4224"} stroke={INK} strokeWidth={10} />
    <rect x={-w * 0.4} y={-h * 0.28} width={w * 0.8} height={h * 0.62} rx={18} fill={C.cream} stroke={INK} strokeWidth={8} />
    {/* skull */}
    <g transform={`translate(0 ${-h * 0.08})`}>
      <path d="M -70 20 Q -80 -90 0 -96 Q 80 -90 70 20 L 46 30 L 46 64 L -46 64 L -46 30 Z" fill="#FFFFFF" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <ellipse cx={-30} cy={-14} rx={22} ry={26} fill={INK} />
      <ellipse cx={30} cy={-14} rx={22} ry={26} fill={INK} />
      <path d="M 0 14 L -10 34 L 10 34 Z" fill={INK} />
      <path d="M -24 64 L -24 46 M 0 64 L 0 46 M 24 64 L 24 46" stroke={INK} strokeWidth={6} />
      <path d="M -120 90 L 120 150 M 120 90 L -120 150" stroke={INK} strokeWidth={22} strokeLinecap="round" />
      <path d="M -120 90 L 120 150 M 120 90 L -120 150" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" />
    </g>
    <text x={0} y={h * 0.28} textAnchor="middle" fontFamily={typeFont} fontSize={w * 0.22} fill={C.brick}>{label}</text>
  </g>
);

const Plate: React.FC<{ x: number; y: number; s?: number; food?: "roast" | "dessert"; powder?: number }> = ({ x, y, s = 1, food = "roast", powder = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={20} rx={290} ry={86} fill="#D9D2C2" />
    <ellipse cx={0} cy={0} rx={280} ry={84} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={200} ry={56} fill="none" stroke="#C9B48A" strokeWidth={6} />
    {food === "roast" ? (
      <>
        <path d="M -150 -10 Q -140 -90 -20 -96 Q 100 -96 110 -20 Q 60 20 -60 20 Q -140 20 -150 -10 Z" fill="#8A4A2A" stroke={INK} strokeWidth={7} />
        <path d="M -100 -50 Q -40 -76 40 -60" stroke="#B5703E" strokeWidth={10} fill="none" strokeLinecap="round" />
        {[[140, -10], [170, 10], [120, 20], [160, -30], [190, -12]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={18} fill="#5FAE3A" stroke={INK} strokeWidth={4} />)}
        <rect x={-210} y={-30} width={70} height={46} rx={8} fill="#FFE27A" stroke={INK} strokeWidth={5} />
      </>
    ) : (
      <path d="M -110 0 Q -110 -120 0 -130 Q 110 -120 110 0 Z" fill="#E9C46A" stroke={INK} strokeWidth={7} />
    )}
    {powder > 0 ? <ellipse cx={-40} cy={-60} rx={130 * powder} ry={40 * powder} fill={POWDER} stroke={INK} strokeWidth={4} opacity={0.95} /> : null}
  </g>
);

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 400 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 18) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 80 } : { right: 120 }), top: top + i * 120 - Math.min(age, 30) * 1.0, fontFamily: typeFont, fontSize: 54, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: ease }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// red Edwardian dining-room wall
const DiningWall: React.FC<{ color?: string; dark?: string }> = ({ color = "#C8382C", dark = "#A82C22" }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill={color} />
    {new Array(10).fill(0).map((_, k) => <rect key={k} x={k * 120 + 40} y={0} width={40} height={1200} fill={dark} opacity={0.55} />)}
    <rect x={0} y={1180} width={1080} height={40} fill="#E2B04A" stroke={INK} strokeWidth={6} />
    <rect x={0} y={1220} width={1080} height={700} fill={dark} />
  </>
);

const Table: React.FC<{ top: number }> = ({ top }) => (
  <>
    <rect x={-20} y={top} width={1120} height={1920 - top} fill={CLOTH} stroke={INK} strokeWidth={9} />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${140 + k * 260} ${top + 30} L ${120 + k * 270} 1920`} stroke="#E6DFCF" strokeWidth={8} />)}
  </>
);

// falling powder stream from (x1,y1) to (x2,y2)
const Pour: React.FC<{ f: number; x1: number; y1: number; x2: number; y2: number; o?: number }> = ({ f, x1, y1, x2, y2, o = 1 }) => (
  <g opacity={o}>
    <path d={`M ${x1 - 14} ${y1} Q ${x1 + 60} ${(y1 + y2) / 2 - 40} ${x2 - 30} ${y2} L ${x2 + 30} ${y2} Q ${x1 + 100} ${(y1 + y2) / 2 - 40} ${x1 + 18} ${y1} Z`} fill={POWDER} opacity={0.85} stroke={INK} strokeWidth={4} />
    {new Array(14).fill(0).map((_, k) => {
      const t = ((f * 0.05 + k * 0.071) % 1);
      const px = x1 + (x2 - x1) * t + Math.sin(k * 2.1) * 40 * t;
      const py = y1 + (y2 - y1) * t * t + (y2 - y1) * 0.2 * t;
      return <circle key={k} cx={px} cy={Math.min(py, y2)} r={6 + (k % 3) * 3} fill={POWDER} stroke={INK} strokeWidth={2} />;
    })}
  </g>
);

const Hand: React.FC<{ x: number; y: number; rot?: number; children?: React.ReactNode }> = ({ x, y, rot = 0, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M 0 0 L 420 -260" stroke={INK} strokeWidth={96} strokeLinecap="round" />
    <path d="M 0 0 L 420 -260" stroke="#F6F2E8" strokeWidth={80} strokeLinecap="round" />
    {children}
    <circle cx={0} cy={0} r={58} fill={SKIN} stroke={INK} strokeWidth={8} />
  </g>
);

const Tin: React.FC<{ label?: string }> = ({ label = "BORAX" }) => (
  <g>
    <rect x={-110} y={-90} width={220} height={260} rx={18} fill="#C9CED6" stroke={INK} strokeWidth={9} />
    <rect x={-90} y={-30} width={180} height={130} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
    <text x={0} y={52} textAnchor="middle" fontFamily={typeFont} fontSize={52} fill={C.brick}>{label}</text>
    <rect x={-110} y={170} width={220} height={26} rx={8} fill="#8A929C" stroke={INK} strokeWidth={6} />
    {[-60, -20, 20, 60].map((dx) => <circle key={dx} cx={dx} cy={183} r={6} fill={INK} />)}
  </g>
);

export const PoisonSquad: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "dinner";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;

  if (mode === "dinner") {
    const pile = interpolate(f, [0, dur], [0.55, 1], clamp);
    const forkUp = 0.3 + Math.sin(f / 9) * 0.05;
    const tilt = 34 + Math.sin(f / 7) * 2;
    body = (
      <>
        <DiningWall />
        <Table top={1470} />
        <Diner x={640} y={1520} s={0.85} f={f} scared={v.scared ?? 0.75} look={-0.7} fork={forkUp} mouth={0.5} />
        <Plate x={660} y={1660} s={1} food="roast" powder={pile} />
        <Pour f={f} x1={530} y1={1110} x2={620} y2={1600} />
        <g transform={`translate(305 1450) rotate(${tilt})`}>
          <Jar w={520} h={720} />
        </g>
      </>
    );
  } else if (mode === "butter") {
    const milkAt = (v.milkAt ?? 0.55) * dur;
    const toMilk = interpolate(f, [milkAt - 8, milkAt + 6], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const hx = interpolate(toMilk, [0, 1], [330, 760]);
    const shake = Math.sin(f / 2) * 10;
    const tinX = hx - 40;
    const tinY = 860;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2E7D6E" />
        {new Array(9).fill(0).map((_, k) => <rect key={k} x={0} y={k * 140} width={1080} height={8} fill="#256A5D" />)}
        <rect x={0} y={1290} width={1080} height={630} fill="#C9A06A" stroke={INK} strokeWidth={9} />
        <rect x={0} y={1290} width={1080} height={36} fill="#A97E4A" />
        {/* butter dish */}
        <g transform="translate(330 1470)">
          <ellipse cx={0} cy={40} rx={230} ry={60} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
          <path d="M -150 30 L -120 -90 L 120 -90 L 150 30 Z" fill="#FFE27A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d="M -120 -90 L -90 -130 L 150 -130 L 120 -90 Z" fill="#FFF0A8" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <ellipse cx={0} cy={-100} rx={90 * (1 - toMilk * 0.2)} ry={18} fill={POWDER} opacity={interpolate(f, [4, 20], [0, 1], clamp)} />
        </g>
        {/* milk jug */}
        <g transform="translate(770 1400)">
          <path d="M -120 160 L -140 -150 Q -150 -200 -90 -210 L 100 -210 Q 170 -220 170 -170 L 130 160 Z" fill="#F4F6FA" stroke={INK} strokeWidth={9} strokeLinejoin="round" />
          <path d="M 140 -110 Q 260 -80 140 60" stroke={INK} strokeWidth={14} fill="none" />
          <ellipse cx={0} cy={-200} rx={120} ry={22} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text x={0} y={20} textAnchor="middle" fontFamily={typeFont} fontSize={64} fill="#4A6FA5">MILK</text>
          <ellipse cx={0} cy={-200} rx={80 * toMilk} ry={14 * toMilk} fill={POWDER} stroke={INK} strokeWidth={3} />
        </g>
        <Pour f={f} x1={tinX + 50} y1={tinY + 272} x2={toMilk > 0.5 ? 770 : 330} y2={toMilk > 0.5 ? 1200 : 1360} />
        <Hand x={tinX + 330} y={tinY + 140 + shake} rot={0}>
          <g transform={`translate(-330 -40) rotate(-20)`}>
            <Tin />
          </g>
        </Hand>
      </>
    );
  } else if (mode === "capsule") {
    const gulp = (v.gulpAt ?? 0.6) * dur;
    const p = interpolate(f, [0, gulp], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const swallowed = f > gulp;
    const cheeks = interpolate(f, [gulp, gulp + 4, gulp + 18], [0, 1, 0.4], clamp);
    const cx = interpolate(p, [0, 1], [820, 560]);
    const cy = interpolate(p, [0, 1], [1500, 1150]);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2C4A8A" />
        <circle cx={540} cy={1000} r={620} fill="#3A5CA6" />
        <Diner x={540} y={1960} s={1.12} f={f} scared={swallowed ? 0.9 : 0.6} look={swallowed ? 0 : 0.6} fork={-1} mouth={swallowed ? 0 : 0.7} cheeks={cheeks} napkin />
        {!swallowed ? (
          <g transform={`translate(${cx} ${cy}) rotate(-30) scale(${1 - p * 0.45})`}>
            <rect x={-30} y={20} width={60} height={420} rx={20} fill="#D8DCE2" stroke={INK} strokeWidth={7} />
            <ellipse cx={0} cy={0} rx={120} ry={70} fill="#D8DCE2" stroke={INK} strokeWidth={8} />
            <g transform="rotate(30)">
              <rect x={-150} y={-55} width={150} height={110} rx={55} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
              <rect x={-10} y={-55} width={160} height={110} rx={55} fill={C.brick} stroke={INK} strokeWidth={8} />
              <rect x={-14} y={-55} width={20} height={110} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
              <text x={-75} y={18} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={C.brick}>BORAX</text>
            </g>
          </g>
        ) : (
          <path d={`M 470 ${1300 + (f - gulp) * 2} q 70 -30 140 0`} stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" opacity={interpolate(f - gulp, [0, 6, 20], [0, 1, 0], clamp)} />
        )}
      </>
    );
  } else if (mode === "satchel") {
    const walk = Math.sin(f / 4) * 10;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#E2A43A" />
        {[0, 1].map((k) => (
          <g key={k}>
            <rect x={80 + k * 600} y={300} width={320} height={520} fill="#9ED0F0" stroke={INK} strokeWidth={10} />
            <path d={`M ${240 + k * 600} 300 L ${240 + k * 600} 820 M ${80 + k * 600} 560 L ${400 + k * 600} 560`} stroke={INK} strokeWidth={10} />
          </g>
        ))}
        <rect x={0} y={1500} width={1080} height={420} fill="#B5452F" />
        <g transform={`translate(0 ${Math.abs(walk)})`}>
          <Diner x={500} y={1760} s={0.95} f={f} scared={0.45} look={0.8} fork={-1} napkin={false} satchel />
        </g>
      </>
    );
  } else if (mode === "clinic") {
    const g = v.ghost ?? 0.8;
    const sw = (v.swallowAt ?? 0.6) * dur;
    const cupUp = interpolate(f, [sw - 12, sw], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) });
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#DFF3F1" />
        <rect x={0} y={1100} width={1080} height={820} fill="#BFE3DF" />
        <rect x={640} y={560} width={360} height={420} rx={14} fill="#9FD8F5" stroke={INK} strokeWidth={9} />
        <path d="M 820 560 L 820 980 M 640 770 L 1000 770" stroke={INK} strokeWidth={8} />
        {/* bed */}
        <rect x={160} y={1180} width={60} height={600} fill="#B8BEC6" stroke={INK} strokeWidth={8} />
        <rect x={140} y={1460} width={860} height={150} rx={30} fill="#FFFFFF" stroke={INK} strokeWidth={9} />
        <rect x={200} y={1560} width={800} height={60} fill="#8FC9C4" stroke={INK} strokeWidth={7} />
        <Diner x={560} y={1520} s={0.78} f={f} scared={0.25} look={0.4} fork={-1} gown napkin mouth={cupUp > 0.8 ? 0.6 : 0} />
        {/* arm with the pill cup + wristband */}
        <g>
          <path d={`M 770 1230 Q 860 1120 ${700 - cupUp * 60} ${1060 - cupUp * 60}`} stroke={INK} strokeWidth={70} strokeLinecap="round" fill="none" />
          <path d={`M 770 1230 Q 860 1120 ${700 - cupUp * 60} ${1060 - cupUp * 60}`} stroke="#9FD3D0" strokeWidth={56} strokeLinecap="round" fill="none" />
          <rect x={776 - cupUp * 40} y={1112 - cupUp * 40} width={60} height={26} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <g transform={`translate(${690 - cupUp * 60} ${1010 - cupUp * 60}) rotate(${-cupUp * 30})`}>
            <path d="M -50 -60 L 50 -60 L 36 40 L -36 40 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
            {cupUp < 0.9 ? <circle cx={0} cy={-62} r={16} fill={C.brick} stroke={INK} strokeWidth={4} /> : null}
          </g>
          <circle cx={700 - cupUp * 60} cy={1060 - cupUp * 60} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
        {/* tray with the pay envelope */}
        <rect x={60} y={1300} width={300} height={24} rx={8} fill="#8A929C" stroke={INK} strokeWidth={6} />
        <rect x={90} y={1210} width={230} height={100} rx={8} fill="#F6EFD8" stroke={INK} strokeWidth={7} transform="rotate(-6 205 1260)" />
        <text x={205} y={1290} textAnchor="middle" fontFamily={typeFont} fontSize={72} fill="#2E7D32" transform="rotate(-6 205 1260)">$</text>
        {/* nurse with clipboard (right edge) */}
        <g transform="translate(980 1920)">
          <path d="M -170 0 L -150 -520 Q -120 -600 0 -610 Q 120 -600 150 -520 L 170 0 Z" fill="#4A90C8" stroke={INK} strokeWidth={9} />
          <ellipse cx={0} cy={-740} rx={110} ry={125} fill="#C98C66" stroke={INK} strokeWidth={8} />
          <path d="M -115 -760 Q -110 -880 0 -880 Q 110 -880 115 -760 Q 60 -820 0 -810 Q -60 -820 -115 -760 Z" fill="#1E1E24" stroke={INK} strokeWidth={6} />
          <circle cx={-40} cy={-735} r={10} fill={INK} />
          <circle cx={40} cy={-735} r={10} fill={INK} />
          <path d="M -30 -680 Q 0 -665 30 -680" stroke={INK} strokeWidth={6} fill="none" />
          <rect x={-200} y={-460} width={160} height={210} rx={10} fill="#C9A06A" stroke={INK} strokeWidth={7} />
          <rect x={-185} y={-430} width={130} height={165} fill="#FFFFFF" />
          {[0, 1, 2, 3].map((k) => <path key={k} d={`M -175 ${-405 + k * 36} l 100 0`} stroke="#8A929C" strokeWidth={6} />)}
        </g>
        {g > 0 ? (
          <g opacity={g * 0.45} style={{ filter: "sepia(1)" }}>
            <Diner x={240} y={1060} s={0.34} f={f} scared={0.6} look={0.5} fork={0.3} sepia />
          </g>
        ) : null}
      </>
    );
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
        <defs>
          <radialGradient id="ep041vig" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0.55" stopColor="#2A1A00" stopOpacity={0} />
            <stop offset="1" stopColor="#2A1A00" stopOpacity={0.38} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep041vig)" />
      </svg>
      {v.headline ? <Headline key={v.headline} text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 400} />
    </Backdrop>
  );
};
