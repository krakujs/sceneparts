import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep081 Well Shooter – oil-boom "shooters" hauled liquid nitroglycerin by wagon and blasted oil wells open with torpedoes.
// visual: { mode: "wagon" | "shaft" | "gusher" | "night" | "empty" | "modern", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, jolt? (0–1 of the scene: the big bump, wagon), sky? ("day"|"dusk"),
//           blowAt? (0–1, gusher/shaft blast), coins? (gusher), dark? (0–1 overlay), ghost? (modern: 0–1 sepia ghost of the shooter),
//           fireAt? (0–1, modern: perforating charges fire), zoomIn? (wagon/night close-up scale) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E9B48C";
const SKIN_D = "#C98C66";
const HAIR = "#4A2C18";
const TIN = "#B8BEC6";
const TIN_D = "#8A929C";
const TIN_HI = "#E4E8EC";
const WOOD = "#8A5A32";
const WOOD_D = "#6A4224";
const OIL = "#1A1410";
const DIRT = "#B58A58";
const DIRT_D = "#93683E";

const ease = Easing.bezier(0.2, 1.4, 0.4, 1);

// ---------- the shooter (big, face at the centre). origin = middle of the seat line ----------
type ShooterProps = {
  x: number; y: number; s?: number; f: number; lift?: number; scared?: number; hat?: "bowler" | "cap" | "hardhat";
  coat?: string; can?: boolean; strap?: boolean; lantern?: boolean; sweat?: boolean; sepia?: boolean; vest?: boolean; look?: number;
};
export const Shooter: React.FC<ShooterProps> = ({ x, y, s = 1, f, lift = 0, scared = 0, hat = "bowler", coat = "#5A4636", can = true, strap = false, lantern = false, sweat = true, sepia = false, vest = false, look = 0 }) => {
  const skin = sepia ? "#D6C09C" : SKIN;
  const skinD = sepia ? "#BFA67E" : SKIN_D;
  const hair = sepia ? "#7E6646" : HAIR;
  const coatC = sepia ? "#A68C66" : coat;
  const eyeR = 22 + scared * 10;
  const pupil = 10 - scared * 3;
  const canY = -560 - lift * 120;
  const canRot = lift * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* torso */}
      <path d="M -300 0 L -280 -420 Q -250 -520 -120 -540 L 120 -540 Q 250 -520 280 -420 L 300 0 Z" fill={coatC} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
      {vest ? <path d="M -250 -10 L -230 -440 L -90 -530 L -60 -10 Z M 250 -10 L 230 -440 L 90 -530 L 60 -10 Z" fill="#FF8A1E" stroke={INK} strokeWidth={7} /> : null}
      {vest ? <path d="M -240 -200 L -70 -200 M 240 -200 L 70 -200" stroke="#E8F0F0" strokeWidth={22} /> : null}
      <path d="M -110 -540 L 0 -440 L 110 -540" fill={sepia ? "#E6DCC6" : "#EFE6D2"} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {!vest ? <path d="M -40 -470 L 0 -440 L 40 -470 L 20 -410 L -20 -410 Z" fill={sepia ? "#8E7656" : C.brick} stroke={INK} strokeWidth={5} /> : null}
      {strap ? <path d="M -230 -520 L 230 -60" stroke={WOOD_D} strokeWidth={34} strokeLinecap="round" /> : null}
      {/* the can of nitro hugged to the chest */}
      {can ? (
        <g transform={`translate(0 ${canY}) rotate(${canRot})`}>
          <rect x={-120} y={160} width={240} height={330} rx={22} fill={TIN} stroke={INK} strokeWidth={9} />
          <rect x={-120} y={190} width={240} height={18} fill={TIN_D} />
          <rect x={-120} y={440} width={240} height={18} fill={TIN_D} />
          <rect x={-90} y={175} width={30} height={300} fill={TIN_HI} opacity={0.7} />
          <rect x={-40} y={130} width={80} height={40} rx={8} fill={TIN_D} stroke={INK} strokeWidth={7} />
          <rect x={-104} y={262} width={208} height={110} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
          <text x={0} y={334} textAnchor="middle" fontFamily={typeFont} fontSize={62} fill={C.brick}>NITRO</text>
          <path d="M -60 160 Q -80 120 -40 110" stroke={INK} strokeWidth={6} fill="none" />
        </g>
      ) : null}
      {/* arms wrapped round the can */}
      {can ? (
        <>
          <path d={`M -270 -400 Q -300 -180 -110 ${-210 - lift * 60}`} stroke={INK} strokeWidth={84} strokeLinecap="round" fill="none" />
          <path d={`M -270 -400 Q -300 -180 -110 ${-210 - lift * 60}`} stroke={coatC} strokeWidth={68} strokeLinecap="round" fill="none" />
          <path d={`M 270 -400 Q 300 -180 110 ${-210 - lift * 60}`} stroke={INK} strokeWidth={84} strokeLinecap="round" fill="none" />
          <path d={`M 270 -400 Q 300 -180 110 ${-210 - lift * 60}`} stroke={coatC} strokeWidth={68} strokeLinecap="round" fill="none" />
          <circle cx={-96} cy={-212 - lift * 60} r={40} fill={skin} stroke={INK} strokeWidth={7} />
          <circle cx={96} cy={-212 - lift * 60} r={40} fill={skin} stroke={INK} strokeWidth={7} />
        </>
      ) : null}
      {lantern ? (
        <g>
          <circle cx={330} cy={-560} r={300 + Math.sin(f / 4) * 12} fill="#FFD983" opacity={0.22} />
          <path d="M 250 -440 Q 380 -560 330 -720" stroke={INK} strokeWidth={84} strokeLinecap="round" fill="none" />
          <path d="M 250 -440 Q 380 -560 330 -720" stroke={coatC} strokeWidth={68} strokeLinecap="round" fill="none" />
          <circle cx={330} cy={-730} r={40} fill={skin} stroke={INK} strokeWidth={7} />
          <path d="M 330 -700 L 330 -660" stroke={INK} strokeWidth={8} />
          <rect x={275} y={-660} width={110} height={160} rx={18} fill="#FFE7A0" stroke={INK} strokeWidth={8} />
          <path d={`M 330 ${-540 + Math.sin(f / 3) * 4} Q 312 -570 330 -610 Q 348 -570 330 ${-540 + Math.sin(f / 3) * 4} Z`} fill="#F28A1E" />
          <rect x={260} y={-510} width={140} height={22} rx={6} fill={INK} />
        </g>
      ) : null}
      {/* neck + head */}
      <rect x={-60} y={-600} width={120} height={90} fill={skinD} stroke={INK} strokeWidth={7} />
      <g transform="translate(0 -780)">
        <ellipse cx={0} cy={0} rx={180} ry={200} fill={skin} stroke={INK} strokeWidth={9} />
        <ellipse cx={-178} cy={20} rx={30} ry={46} fill={skin} stroke={INK} strokeWidth={7} />
        <ellipse cx={178} cy={20} rx={30} ry={46} fill={skin} stroke={INK} strokeWidth={7} />
        <path d="M -176 -40 Q -186 -110 -150 -140 L -150 -60 Z M 176 -40 Q 186 -110 150 -140 L 150 -60 Z" fill={hair} stroke={INK} strokeWidth={6} />
        {/* eyes */}
        <ellipse cx={-70} cy={-20} rx={eyeR + 6} ry={eyeR + 2} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <ellipse cx={70} cy={-20} rx={eyeR + 6} ry={eyeR + 2} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
        <circle cx={-70 + look * 12} cy={-14 + scared * 6} r={pupil + 4} fill={INK} />
        <circle cx={70 + look * 12} cy={-14 + scared * 6} r={pupil + 4} fill={INK} />
        <path d={`M -120 ${-78 - scared * 22} Q -70 ${-100 - scared * 26} -24 ${-74 - scared * 10}`} stroke={hair} strokeWidth={16} strokeLinecap="round" fill="none" />
        <path d={`M 120 ${-78 - scared * 22} Q 70 ${-100 - scared * 26} 24 ${-74 - scared * 10}`} stroke={hair} strokeWidth={16} strokeLinecap="round" fill="none" />
        {/* nose, cheeks */}
        <path d="M 0 0 Q -30 60 4 70" stroke={skinD} strokeWidth={8} fill="none" strokeLinecap="round" />
        <ellipse cx={-110} cy={50} rx={30} ry={14} fill="#E06A3A" opacity={sepia ? 0 : 0.3} />
        <ellipse cx={110} cy={50} rx={30} ry={14} fill="#E06A3A" opacity={sepia ? 0 : 0.3} />
        {/* big handlebar moustache */}
        {hat !== "hardhat" ? (
          <path d="M 0 92 Q -50 70 -100 96 Q -150 120 -170 80 Q -150 140 -90 128 Q -40 120 0 106 Q 40 120 90 128 Q 150 140 170 80 Q 150 120 100 96 Q 50 70 0 92 Z" fill={hair} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        ) : null}
        {/* mouth: tight grimace, opens when scared */}
        {scared > 0.4 ? (
          <ellipse cx={0} cy={150} rx={36} ry={22 + scared * 18} fill="#5A1E14" stroke={INK} strokeWidth={6} />
        ) : (
          <path d="M -46 146 Q -20 136 0 146 Q 20 136 46 146" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        {/* sweat */}
        {sweat ? (
          <>
            <path d={`M 150 ${-110 + ((f * 3) % 140)} q -16 26 0 34 q 16 -8 0 -34 Z`} fill="#BFE6FF" stroke={INK} strokeWidth={4} opacity={0.95} />
            <path d={`M -140 ${-60 + ((f * 2 + 60) % 120)} q -12 20 0 26 q 12 -6 0 -26 Z`} fill="#BFE6FF" stroke={INK} strokeWidth={4} opacity={0.9} />
          </>
        ) : null}
        {/* hats */}
        {hat === "bowler" ? (
          <g>
            <ellipse cx={0} cy={-150} rx={250} ry={40} fill="#2B241E" stroke={INK} strokeWidth={8} />
            <path d="M -160 -150 Q -170 -330 0 -330 Q 170 -330 160 -150 Z" fill="#2B241E" stroke={INK} strokeWidth={8} />
            <rect x={-160} y={-196} width={320} height={34} fill="#4A3A2A" />
            <path d="M -110 -290 Q -60 -320 0 -318" stroke="#5A4A3A" strokeWidth={10} fill="none" strokeLinecap="round" />
          </g>
        ) : null}
        {hat === "cap" ? (
          <g>
            <path d="M -186 -110 Q -180 -260 0 -262 Q 180 -260 186 -110 Z" fill="#3A3A44" stroke={INK} strokeWidth={8} />
            <path d="M 100 -120 Q 240 -130 270 -90 Q 200 -86 120 -96 Z" fill="#2A2A32" stroke={INK} strokeWidth={7} />
          </g>
        ) : null}
        {hat === "hardhat" ? (
          <g>
            <path d="M -200 -110 Q -200 -300 0 -304 Q 200 -300 200 -110 Z" fill="#F6F2E8" stroke={INK} strokeWidth={8} />
            <rect x={-240} y={-130} width={480} height={36} rx={18} fill="#F6F2E8" stroke={INK} strokeWidth={8} />
            <path d="M 0 -300 L 0 -130" stroke="#D8D2C2" strokeWidth={22} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

// wooden derrick (cartoon), base centre at (x, y), height h
const Derrick: React.FC<{ x: number; y: number; h: number; color?: string }> = ({ x, y, h, color = WOOD }) => {
  const wB = h * 0.36;
  const wT = h * 0.06;
  const rungs = 7;
  return (
    <g>
      <path d={`M ${x - wB} ${y} L ${x - wT} ${y - h} L ${x + wT} ${y - h} L ${x + wB} ${y}`} stroke={INK} strokeWidth={14} fill="none" strokeLinejoin="round" />
      <path d={`M ${x - wB} ${y} L ${x - wT} ${y - h} L ${x + wT} ${y - h} L ${x + wB} ${y}`} stroke={color} strokeWidth={7} fill="none" strokeLinejoin="round" />
      {new Array(rungs).fill(0).map((_, k) => {
        const t = (k + 1) / (rungs + 1);
        const yy = y - h * t;
        const half = wB + (wT - wB) * t;
        const t2 = (k + 2) / (rungs + 1);
        const half2 = wB + (wT - wB) * t2;
        return (
          <g key={k}>
            <line x1={x - half} y1={yy} x2={x + half} y2={yy} stroke={INK} strokeWidth={8} />
            {k < rungs - 1 ? <line x1={x - half} y1={yy} x2={x + half2} y2={y - h * t2} stroke={color} strokeWidth={5} /> : null}
          </g>
        );
      })}
    </g>
  );
};

// rolling oil-country hills with distant derricks, scrolling left
const Country: React.FC<{ f: number; speed?: number; dusk?: boolean; groundY?: number }> = ({ f, speed = 6, dusk = false, groundY = 1180 }) => {
  const off = (f * speed) % 1080;
  const off2 = (f * speed * 0.4) % 1080;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill={dusk ? "#E9A27A" : "#F4D9A8"} />
      <rect x={0} y={0} width={1080} height={700} fill={dusk ? "#8E5E8A" : "#F7E7C4"} opacity={0.6} />
      <circle cx={820} cy={480} r={110} fill={dusk ? "#FFD983" : "#FFF3CF"} opacity={0.9} />
      {[0, 1].map((r) => (
        <g key={r} transform={`translate(${-off2 + r * 1080} 0)`}>
          <path d={`M 0 ${groundY - 160} Q 270 ${groundY - 300} 540 ${groundY - 180} Q 810 ${groundY - 80} 1080 ${groundY - 160} L 1080 ${groundY} L 0 ${groundY} Z`} fill={dusk ? "#7A5A70" : "#B9A27A"} />
          <Derrick x={260} y={groundY - 230} h={200} color={dusk ? "#5A3E50" : "#8A6A45"} />
          <Derrick x={760} y={groundY - 140} h={150} color={dusk ? "#5A3E50" : "#8A6A45"} />
        </g>
      ))}
      <rect x={0} y={groundY} width={1080} height={1920 - groundY} fill={DIRT} />
      {[0, 1].map((r) => (
        <g key={r} transform={`translate(${-off + r * 1080} 0)`}>
          {[80, 330, 610, 900].map((x, k) => (
            <ellipse key={k} cx={x} cy={groundY + 60 + (k % 2) * 90} rx={70 - k * 6} ry={14} fill={DIRT_D} />
          ))}
          <path d={`M 0 ${groundY + 20} Q 300 ${groundY + 50} 540 ${groundY + 20} T 1080 ${groundY + 20}`} stroke={DIRT_D} strokeWidth={8} fill="none" />
        </g>
      ))}
    </>
  );
};

const Wheel: React.FC<{ x: number; y: number; r: number; f: number; speed?: number }> = ({ x, y, r, f, speed = 6 }) => (
  <g transform={`translate(${x} ${y}) rotate(${f * speed})`}>
    <circle cx={0} cy={0} r={r} fill="none" stroke={INK} strokeWidth={30} />
    <circle cx={0} cy={0} r={r} fill="none" stroke={WOOD} strokeWidth={18} />
    {new Array(10).fill(0).map((_, k) => (
      <line key={k} x1={0} y1={0} x2={Math.cos((k * Math.PI) / 5) * r} y2={Math.sin((k * Math.PI) / 5) * r} stroke={WOOD_D} strokeWidth={12} />
    ))}
    <circle cx={0} cy={0} r={34} fill={WOOD_D} stroke={INK} strokeWidth={7} />
  </g>
);

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 400 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 18) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 1.0, fontFamily: typeFont, fontSize: 54, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: ease }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Coins: React.FC<{ f: number; x: number; y: number; start?: number }> = ({ f, x, y, start = 8 }) => (
  <>
    {new Array(6).fill(0).map((_, k) => {
      const at = start + k * 7;
      const age = f - at;
      if (age < 0) return null;
      const yy = y - Math.min(age, 22) * 7 - k * 6;
      return (
        <g key={k} transform={`translate(${x + (k - 2.5) * 80} ${yy})`} opacity={interpolate(age, [0, 4, 50, 60], [0, 1, 1, 0], clamp)}>
          <ellipse cx={0} cy={0} rx={40} ry={40} fill={C.mustard} stroke={INK} strokeWidth={6} />
          <text x={0} y={16} textAnchor="middle" fontFamily={typeFont} fontSize={46} fill={INK}>$</text>
        </g>
      );
    })}
  </>
);

// oil fountain above a derrick top
const Gush: React.FC<{ f: number; x: number; y: number; age: number; h?: number }> = ({ f, x, y, age, h = 900 }) => {
  if (age < 0) return null;
  const grow = interpolate(age, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const top = y - h * grow;
  return (
    <g>
      <path d={`M ${x - 26} ${y} Q ${x - 40 + Math.sin(f / 3) * 10} ${(y + top) / 2} ${x - 120} ${top + 60} Q ${x} ${top - 60} ${x + 120} ${top + 60} Q ${x + 40 + Math.sin(f / 4) * 10} ${(y + top) / 2} ${x + 26} ${y} Z`} fill={OIL} stroke={INK} strokeWidth={6} />
      {new Array(18).fill(0).map((_, k) => {
        const t = ((f * 0.04 + k * 0.137) % 1);
        const dir = k % 2 ? 1 : -1;
        const dx = dir * (60 + (k * 23) % 260) * t;
        const dy = -80 * Math.sin(t * Math.PI) + 700 * t * t;
        return <circle key={k} cx={x + dx} cy={top + 60 + dy} r={10 + (k % 4) * 4} fill={OIL} opacity={grow * (1 - t * 0.6)} />;
      })}
    </g>
  );
};

const Smoke: React.FC<{ f: number; x: number; y: number; o?: number }> = ({ f, x, y, o = 1 }) => (
  <>
    {new Array(9).fill(0).map((_, k) => {
      const ang = (k / 9) * Math.PI * 2;
      const r = 120 + (k % 3) * 40 + f * 1.2;
      return <circle key={k} cx={x + Math.cos(ang) * r * 0.9} cy={y - 120 + Math.sin(ang) * r * 0.5 - f * 1.5} r={110 + (k % 4) * 30 + f * 0.8} fill="#8C8478" opacity={o * Math.max(0, 0.55 - f / 220)} />;
    })}
  </>
);

const RockLayers: React.FC<{ top: number }> = ({ top }) => (
  <>
    <rect x={0} y={top} width={1080} height={1920 - top} fill="#9C7650" />
    <rect x={0} y={top + 260} width={1080} height={260} fill="#7E6A58" />
    <rect x={0} y={top + 520} width={1080} height={240} fill="#A89478" />
    <rect x={0} y={top + 760} width={1080} height={1920} fill="#5E4A36" />
    {new Array(26).fill(0).map((_, k) => (
      <ellipse key={k} cx={(k * 167) % 1080} cy={top + 800 + ((k * 71) % 220)} rx={16} ry={10} fill={OIL} opacity={0.75} />
    ))}
    {[260, 520, 760].map((d) => (
      <path key={d} d={`M 0 ${top + d} Q 270 ${top + d - 18} 540 ${top + d} T 1080 ${top + d}`} stroke={INK} strokeWidth={6} fill="none" opacity={0.6} />
    ))}
    <path d={`M 0 ${top} L 1080 ${top}`} stroke={INK} strokeWidth={9} />
  </>
);

export const WellShooter: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "wagon";
  const float: string[] = v.float ?? [];
  const dark: number = v.dark ?? 0;
  let body: React.ReactNode = null;
  let sky: "day" | "night" = "day";

  if (mode === "wagon") {
    const j = (v.jolt ?? -1) * dur;
    const lift = v.jolt != null ? interpolate(f, [j, j + 6, j + 13], [0, 1, 0], { ...clamp, easing: Easing.inOut(Easing.quad) }) : 0;
    const scared = Math.max(v.scared ?? 0.3, v.jolt != null ? interpolate(f, [j, j + 4, j + 30], [0, 1, 0.75], clamp) : 0);
    const bump = Math.abs(Math.sin(f / 3.2)) * 12 + lift * 40;
    const zs: number = v.zoomIn ?? 1;
    const shake = lift > 0.05 ? Math.sin(f * 3) * 10 * lift : 0;
    body = (
      <g transform={`translate(${shake} 0)`}>
        <Country f={f} speed={7} dusk={v.sky === "dusk"} groundY={1240} />
        {/* dust puffs behind the wagon */}
        {new Array(5).fill(0).map((_, k) => {
          const t = ((f / 22 + k / 5) % 1);
          return <circle key={k} cx={960 + t * 220} cy={1660 - t * 120} r={40 + t * 90} fill="#D9BE90" opacity={0.6 * (1 - t)} />;
        })}
        <g transform={`translate(540 1700) scale(${zs}) translate(-540 -1700)`}>
          {/* seat back + wagon box */}
          <rect x={60} y={1560} width={960} height={420} fill={WOOD} stroke={INK} strokeWidth={10} />
          {[1620, 1700, 1780].map((yy) => <path key={yy} d={`M 60 ${yy} L 1020 ${yy}`} stroke={WOOD_D} strokeWidth={7} />)}
          <Wheel x={70} y={1830} r={240} f={f} speed={-7} />
          <Wheel x={1010} y={1830} r={240} f={f} speed={-7} />
          <g transform={`translate(0 ${-bump})`}>
            <Shooter x={540} y={1640} s={0.9} f={f} lift={lift} scared={scared} hat="bowler" />
          </g>
          {/* seat front rail over the lap */}
          <rect x={150} y={1620} width={780} height={46} rx={10} fill={WOOD_D} stroke={INK} strokeWidth={8} />
        </g>
        {lift > 0.3 ? (
          <g opacity={lift}>
            <path d="M 300 1180 l -60 -40 M 780 1180 l 60 -40 M 260 1300 l -80 0 M 820 1300 l 80 0" stroke={INK} strokeWidth={10} strokeLinecap="round" />
          </g>
        ) : null}
      </g>
    );
  } else if (mode === "shaft") {
    const top = 760;
    const bottom = 1720;
    const blow = (v.blowAt ?? 0.78) * dur;
    const torY = interpolate(f, [4, dur * 0.5], [top - 60, bottom - 200], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const devilY = interpolate(f, [blow - 12, blow], [top - 40, bottom - 220], { ...clamp, easing: Easing.in(Easing.quad) });
    const flash = interpolate(f, [blow, blow + 3, blow + 16], [0, 1, 0], clamp);
    const crack = interpolate(f, [blow, blow + 10], [0, 1], clamp);
    const runX = interpolate(f, [dur * 0.45, dur * 0.85], [620, 1020], clamp);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={top} fill="#F4D9A8" />
        <Derrick x={540} y={top} h={420} />
        <RockLayers top={top} />
        <rect x={510} y={top} width={60} height={bottom - top} fill="#2A2018" stroke={INK} strokeWidth={6} />
        <line x1={540} y1={top - 420} x2={540} y2={torY} stroke="#E8DCC0" strokeWidth={5} />
        <g transform={`translate(540 ${torY})`}>
          <rect x={-22} y={0} width={44} height={190} rx={10} fill={TIN} stroke={INK} strokeWidth={6} />
          <rect x={-22} y={60} width={44} height={14} fill={C.brick} />
        </g>
        {f > blow - 13 && f < blow + 2 ? <rect x={524} y={devilY} width={32} height={60} rx={6} fill="#2E2E34" stroke={INK} strokeWidth={5} /> : null}
        {crack > 0 ? (
          <g opacity={1 - flash * 0.3}>
            {new Array(8).fill(0).map((_, k) => {
              const a = (k / 8) * Math.PI * 2 + 0.3;
              const L = 330 * crack;
              return <path key={k} d={`M 540 ${bottom - 120} l ${Math.cos(a) * L * 0.5} ${Math.sin(a) * L * 0.25} l ${Math.cos(a + 0.4) * L * 0.5} ${Math.sin(a + 0.4) * L * 0.25}`} stroke={C.mustard} strokeWidth={10} fill="none" strokeLinecap="round" />;
            })}
            <circle cx={540} cy={bottom - 120} r={120 * crack + flash * 120} fill="#FFE7A0" opacity={0.85 * (1 - crack * 0.6)} />
          </g>
        ) : null}
        <Figure x={runX} y={top} scale={0.9} hat="bowler" coat="#5A4636" scarf={C.brick} prop="none" action="walk" facing="right" />
        <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash * 0.7} />
      </>
    );
  } else if (mode === "gusher") {
    const ground = 1400;
    const blow = (v.blowAt ?? 0.15) * dur;
    const age = f - blow;
    const shake = age >= 0 && age < 10 ? Math.sin(f * 4) * 12 : 0;
    body = (
      <g transform={`translate(${shake} 0)`}>
        <Country f={f} speed={0} groundY={ground} />
        <Derrick x={540} y={ground} h={820} />
        <Gush f={f} x={540} y={ground - 820} age={age} h={520} />
        <Figure x={200} y={ground + 260} scale={1.4} hat="bowler" coat="#5A4636" scarf={C.brick} prop="none" action="wave" facing="right" />
        <Figure x={890} y={ground + 280} scale={1.5} hat="top" coat="#2E3A4E" scarf={C.mustard} prop="none" action="idle" facing="left" />
        {v.coins ? <Coins f={f} x={540} y={ground + 120} start={Math.max(4, blow + 6)} /> : null}
      </g>
    );
  } else if (mode === "night") {
    sky = "night";
    body = (
      <>
        <rect x={0} y={1250} width={1080} height={670} fill="#1C2234" />
        <Derrick x={250} y={1250} h={560} color="#2A3048" />
        <Derrick x={900} y={1250} h={380} color="#2A3048" />
        <Shooter x={560} y={1960} s={0.95} f={f} hat="cap" coat="#2C3444" can={false} strap lantern sweat={false} look={-0.6} scared={0.15} />
        <rect x={0} y={0} width={1080} height={1920} fill="#0A0E1C" opacity={0.25} />
      </>
    );
  } else if (mode === "empty") {
    const hx = interpolate(f, [0, dur * 0.6], [150, 610], { ...clamp, easing: Easing.out(Easing.quad) });
    const hr = interpolate(f, [0, dur * 0.6], [0, 380], { ...clamp, easing: Easing.out(Easing.quad) });
    body = (
      <>
        <Country f={f} speed={0} dusk groundY={1300} />
        <Smoke f={f} x={560} y={1250} o={v.smoke ?? 1} />
        <g transform="translate(860 1560) rotate(-12)">
          <path d="M -200 0 A 200 200 0 0 1 200 0" stroke={INK} strokeWidth={30} fill="none" />
          <path d="M -200 0 A 200 200 0 0 1 200 0" stroke={WOOD} strokeWidth={18} fill="none" />
          <line x1={0} y1={0} x2={-120} y2={-150} stroke={WOOD_D} strokeWidth={12} />
          <line x1={0} y1={0} x2={110} y2={-160} stroke={WOOD_D} strokeWidth={12} />
        </g>
        <g transform={`translate(${hx} 1580) rotate(${hr})`}>
          <ellipse cx={0} cy={0} rx={110} ry={20} fill="#2B241E" stroke={INK} strokeWidth={7} />
          <path d="M -72 0 Q -76 -120 0 -120 Q 76 -120 72 0 Z" fill="#2B241E" stroke={INK} strokeWidth={7} />
        </g>
      </>
    );
  } else if (mode === "modern") {
    const ground = 1060;
    const fire = (v.fireAt ?? 0.55) * dur;
    const fl = interpolate(f, [fire, fire + 3, fire + 14], [0, 1, 0], clamp);
    const jet = interpolate(f, [fire, fire + 8], [0, 1], clamp);
    const gunX = interpolate(f, [0, fire], [120, 360], { ...clamp, easing: Easing.out(Easing.quad) });
    const g = v.ghost ?? 0.8;
    const gy = 1730;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={ground} fill="#CFE4F2" />
        <rect x={0} y={0} width={1080} height={400} fill="#9EC6E6" opacity={0.6} />
        {/* steel rig + pump trucks */}
        <rect x={700} y={330} width={70} height={ground - 330} fill="#8C949E" stroke={INK} strokeWidth={8} />
        <path d={`M 700 ${ground} L 735 360 L 770 ${ground}`} stroke={INK} strokeWidth={6} fill="none" />
        <rect x={640} y={560} width={190} height={30} fill="#5C646E" stroke={INK} strokeWidth={6} />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${-40 + k * 250} ${ground - 170 + k * 30}) scale(${0.8 + k * 0.06})`}>
            <rect x={0} y={0} width={220} height={120} fill={k === 1 ? "#E9E4DA" : "#C0392B"} stroke={INK} strokeWidth={7} />
            <rect x={150} y={30} width={90} height={90} fill="#3A4048" stroke={INK} strokeWidth={6} />
            <circle cx={50} cy={130} r={26} fill={INK} />
            <circle cx={200} cy={130} r={26} fill={INK} />
          </g>
        ))}
        <RockLayers top={ground} />
        {/* the well: vertical, then the horizontal leg with the perforating gun */}
        <rect x={715} y={ground} width={40} height={gy - ground} fill="#3A4048" stroke={INK} strokeWidth={5} />
        <rect x={60} y={gy - 20} width={695} height={40} fill="#3A4048" stroke={INK} strokeWidth={5} />
        <path d={`M 735 ${ground} L 735 ${gy} L ${gunX + 300} ${gy}`} stroke="#E8DCC0" strokeWidth={4} fill="none" />
        <g transform={`translate(${gunX} ${gy})`}>
          <rect x={0} y={-16} width={300} height={32} rx={12} fill="#B8BEC6" stroke={INK} strokeWidth={5} />
          {[30, 90, 150, 210, 270].map((cx) => <circle key={cx} cx={cx} cy={0} r={8} fill={C.brick} />)}
          {jet > 0 ? [30, 90, 150, 210, 270].map((cx, k) => (
            <g key={k}>
              <path d={`M ${cx - 8} ${-16} L ${cx} ${-16 - 160 * jet} L ${cx + 8} ${-16} Z`} fill={C.mustard} stroke={INK} strokeWidth={3} opacity={1 - jet * 0.3} />
              <path d={`M ${cx - 8} 16 L ${cx} ${16 + 160 * jet} L ${cx + 8} 16 Z`} fill={C.mustard} stroke={INK} strokeWidth={3} opacity={1 - jet * 0.3} />
            </g>
          )) : null}
        </g>
        <circle cx={gunX + 150} cy={gy} r={200 * fl} fill="#FFE7A0" opacity={fl * 0.8} />
        {/* sepia ghost of the old shooter + today's crew member */}
        {g > 0 ? <g opacity={g * 0.42}><Shooter x={900} y={ground + 40} s={0.42} f={f} hat="bowler" sepia sweat={false} scared={0.2} /></g> : null}
        <Shooter x={330} y={ground + 70} s={0.6} f={f} hat="hardhat" coat="#3A5A8A" can={false} vest sweat={false} scared={0.1} look={0.5} />
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={sky === "night"} moon={sky === "night"} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
        {dark > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#0E1424" opacity={dark * 0.55} /> : null}
        <defs>
          <radialGradient id="ep081vig" cx="0.5" cy="0.55" r="0.8">
            <stop offset="0.55" stopColor="#2A1A00" stopOpacity={0} />
            <stop offset="1" stopColor="#2A1A00" stopOpacity={0.4} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep081vig)" />
      </svg>
      {v.headline ? <Headline key={v.headline} text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 400} />
    </Backdrop>
  );
};
