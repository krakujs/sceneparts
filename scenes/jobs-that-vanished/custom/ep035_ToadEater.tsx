import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep035 Toad Eater – a quack's assistant "eats" a poisonous toad on a fairground stage.
// visual: { mode: "hook" | "stage" | "toad" | "gulp" | "cure" | "now", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, from?, to?, sub? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const TOAD = "#7E8F3E";
const TOAD_D = "#5C6B2A";
const TOAD_B = "#C9C27A";
const WOOD = "#A0703F";
const WOOD_D = "#7A5230";
const ELIXIR = "#5FA8A0";
const GOLD = "#F2B544";

type Mouth = "smile" | "open" | "o" | "grin" | "flat";
type Eyes = "normal" | "bulge" | "x" | "closed";

// A bespoke storybook person. Origin = feet; height ~540 (with hat ~640) at s = 1. Hands are local coords.
const Person: React.FC<{
  x: number; y: number; s?: number; rot?: number; coat?: string; trousers?: string; scarf?: string;
  hat?: "top" | "cap" | "none"; mouth?: Mouth; eyes?: Eyes; hl?: [number, number]; hr?: [number, number];
  headBob?: number; moustache?: boolean; children?: React.ReactNode;
}> = ({ x, y, s = 1, rot = 0, coat = C.teal, trousers = "#3A3330", scarf = GOLD, hat = "cap", mouth = "smile", eyes = "normal",
  hl = [-110, -230], hr = [110, -230], headBob = 0, moustache = false, children }) => {
  const sh: [number, number][] = [[-68, -360], [68, -360]];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {/* legs + shoes */}
      <rect x={-48} y={-175} width={38} height={170} fill={trousers} stroke={INK} strokeWidth={6} />
      <rect x={10} y={-175} width={38} height={170} fill={trousers} stroke={INK} strokeWidth={6} />
      <ellipse cx={-36} cy={-4} rx={34} ry={14} fill={INK} />
      <ellipse cx={36} cy={-4} rx={34} ry={14} fill={INK} />
      {/* coat */}
      <path d="M -72 -385 L 72 -385 L 90 -150 L -90 -150 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -380 L 0 -155" stroke={INK} strokeWidth={4} opacity={0.5} />
      {[-330, -270, -210].map((by) => <circle key={by} cx={14} cy={by} r={7} fill={GOLD} stroke={INK} strokeWidth={3} />)}
      <rect x={-52} y={-402} width={104} height={26} rx={12} fill={scarf} stroke={INK} strokeWidth={5} />
      {/* arms */}
      {[hl, hr].map((h, i) => (
        <g key={i}>
          <path d={`M ${sh[i][0]} ${sh[i][1]} Q ${(sh[i][0] + h[0]) / 2 + (i ? 20 : -20)} ${(sh[i][1] + h[1]) / 2 + 20} ${h[0]} ${h[1]}`} stroke={INK} strokeWidth={44} fill="none" strokeLinecap="round" />
          <path d={`M ${sh[i][0]} ${sh[i][1]} Q ${(sh[i][0] + h[0]) / 2 + (i ? 20 : -20)} ${(sh[i][1] + h[1]) / 2 + 20} ${h[0]} ${h[1]}`} stroke={coat} strokeWidth={32} fill="none" strokeLinecap="round" />
          <circle cx={h[0]} cy={h[1]} r={21} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      {/* head */}
      <g transform={`translate(0 ${headBob})`}>
        <circle cx={-70} cy={-455} r={16} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={70} cy={-455} r={16} fill={SKIN} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={-460} r={72} fill={SKIN} stroke={INK} strokeWidth={7} />
        <circle cx={-40} cy={-438} r={12} fill="#D9826A" opacity={0.55} />
        <circle cx={40} cy={-438} r={12} fill="#D9826A" opacity={0.55} />
        {eyes === "bulge" ? (
          [-26, 26].map((ex) => (
            <g key={ex}>
              <circle cx={ex} cy={-482} r={22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
              <circle cx={ex} cy={-480} r={9} fill={INK} />
            </g>
          ))
        ) : eyes === "x" ? (
          [-26, 26].map((ex) => (
            <path key={ex} d={`M ${ex - 11} -489 L ${ex + 11} -467 M ${ex + 11} -489 L ${ex - 11} -467`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          ))
        ) : eyes === "closed" ? (
          [-26, 26].map((ex) => <path key={ex} d={`M ${ex - 12} -478 Q ${ex} -468 ${ex + 12} -478`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />)
        ) : (
          [-26, 26].map((ex) => <circle key={ex} cx={ex} cy={-478} r={9} fill={INK} />)
        )}
        <ellipse cx={0} cy={-452} rx={13} ry={10} fill="#D9A07A" stroke={INK} strokeWidth={4} />
        {moustache ? <path d="M -42 -430 Q -20 -446 0 -436 Q 20 -446 42 -430 Q 20 -428 0 -432 Q -20 -428 -42 -430 Z" fill="#3A2A1E" stroke={INK} strokeWidth={3} /> : null}
        {mouth === "open" ? <ellipse cx={0} cy={-418} rx={26} ry={24} fill="#5A1A1A" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "o" ? <ellipse cx={0} cy={-418} rx={13} ry={15} fill="#5A1A1A" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "smile" ? <path d="M -24 -425 Q 0 -404 24 -425" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        {mouth === "flat" ? <path d="M -18 -418 L 18 -418" stroke={INK} strokeWidth={6} strokeLinecap="round" /> : null}
        {mouth === "grin" ? (
          <g>
            <path d="M -34 -428 Q 0 -390 34 -428 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <path d="M -30 -426 L 30 -426" stroke={INK} strokeWidth={3} />
          </g>
        ) : null}
        {hat === "top" ? (
          <g>
            <rect x={-52} y={-640} width={104} height={118} fill="#2A2420" stroke={INK} strokeWidth={6} />
            <rect x={-52} y={-552} width={104} height={20} fill={C.brick} />
            <rect x={-88} y={-532} width={176} height={20} rx={8} fill="#2A2420" stroke={INK} strokeWidth={6} />
          </g>
        ) : hat === "cap" ? (
          <g>
            <path d="M -74 -500 Q -70 -560 0 -566 Q 70 -560 74 -500 Z" fill="#6B5A44" stroke={INK} strokeWidth={6} />
            <path d="M 20 -505 Q 80 -510 112 -494 L 70 -488 Z" fill="#5A4A36" stroke={INK} strokeWidth={5} />
          </g>
        ) : null}
      </g>
      {children}
    </g>
  );
};

const Toad: React.FC<{ x: number; y: number; s?: number; rot?: number; f?: number; glow?: number; kick?: number }> = ({ x, y, s = 1, rot = 0, f = 0, glow = 0, kick = 0 }) => {
  const k = Math.sin(f / 2.2) * kick;
  const throat = Math.sin(f / 3);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {glow > 0 ? <ellipse cx={0} cy={-10} rx={120} ry={88} fill="#D7F26B" opacity={0.3 * glow} /> : null}
      <path d={`M -58 18 Q ${-110 - k} ${30 + k} ${-92 - k} ${62 + k} L -40 52 Z`} fill={TOAD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M 58 18 Q ${110 + k} ${30 - k} ${92 + k} ${62 - k} L 40 52 Z`} fill={TOAD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={0} cy={0} rx={78} ry={54} fill={TOAD} stroke={INK} strokeWidth={7} />
      <ellipse cx={0} cy={24} rx={52} ry={26} fill={TOAD_B} />
      {new Array(9).fill(0).map((_, i) => (
        <circle key={i} cx={-55 + random(`tw${i}`) * 110} cy={-30 + random(`th${i}`) * 32} r={4 + random(`tr${i}`) * 5} fill={TOAD_D} />
      ))}
      <ellipse cx={-40} cy={-34} rx={22} ry={12} fill={TOAD_D} stroke={INK} strokeWidth={4} />
      <ellipse cx={40} cy={-34} rx={22} ry={12} fill={TOAD_D} stroke={INK} strokeWidth={4} />
      {[-30, 30].map((ex) => (
        <g key={ex}>
          <circle cx={ex} cy={-52} r={17} fill="#E9C24A" stroke={INK} strokeWidth={5} />
          <ellipse cx={ex} cy={-52} rx={11} ry={4.5} fill={INK} />
        </g>
      ))}
      <path d="M -44 -10 Q 0 6 44 -10" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={10} rx={20 + 5 * throat} ry={9 + 3 * throat} fill="#E3DA9A" opacity={0.9} />
      <path d="M -46 36 L -58 64 L -30 64" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 46 36 L 58 64 L 30 64" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const Bottle: React.FC<{ x: number; y: number; s?: number; rot?: number; f?: number }> = ({ x, y, s = 1, rot = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle cx={0} cy={-30} r={70} fill={C.glow} opacity={0.25 + 0.12 * Math.sin(f / 4)} />
    <rect x={-24} y={-62} width={48} height={84} rx={12} fill={ELIXIR} stroke={INK} strokeWidth={5} />
    <rect x={-10} y={-94} width={20} height={36} fill={ELIXIR} stroke={INK} strokeWidth={5} />
    <rect x={-12} y={-106} width={24} height={16} rx={3} fill={C.sepia} stroke={INK} strokeWidth={4} />
    <rect x={-19} y={-42} width={38} height={36} fill={C.cream} stroke={INK} strokeWidth={3} />
    <path d="M -10 -24 L 10 -24 M 0 -34 L 0 -14" stroke={C.brick} strokeWidth={6} />
    <rect x={-16} y={-56} width={7} height={60} rx={3} fill="#FFFFFF" opacity={0.45} />
  </g>
);

const Sparkle: React.FC<{ x: number; y: number; f: number; n?: number; r?: number; seed?: string }> = ({ x, y, f, n = 6, r = 110, seed = "sp" }) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const a = (i / n) * Math.PI * 2 + f / 30;
      const tw = 0.5 + 0.5 * Math.sin(f / 4 + i * 2);
      const px = x + Math.cos(a) * r * (0.8 + random(`${seed}${i}`) * 0.4);
      const py = y + Math.sin(a) * r * (0.8 + random(`${seed}y${i}`) * 0.4);
      const z = 10 + 12 * tw;
      return <path key={i} d={`M ${px} ${py - z} L ${px + z * 0.3} ${py} L ${px} ${py + z} L ${px - z * 0.3} ${py} Z M ${px - z} ${py} L ${px} ${py + z * 0.3} L ${px + z} ${py} L ${px} ${py - z * 0.3} Z`} fill="#FFF3B0" stroke={INK} strokeWidth={2} opacity={0.4 + 0.6 * tw} />;
    })}
  </>
);

// fairground tent behind the stage + bunting
const Fair: React.FC<{ f: number; floor: number }> = ({ f, floor }) => {
  const pts = new Array(13).fill(0).map((_, i) => {
    const t = i / 12;
    return [t * 1080, (1 - t) * (1 - t) * 250 + 2 * (1 - t) * t * 420 + t * t * 250];
  });
  return (
    <g>
      {/* tent */}
      <path d={`M -40 ${floor} L 120 380 L 540 250 L 960 380 L 1120 ${floor} Z`} fill={C.cream} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {new Array(7).fill(0).map((_, i) => (
        <path key={i} d={`M 540 250 L ${-40 + i * 193} ${floor} L ${56 + i * 193} ${floor} Z`} fill={C.brick} opacity={0.85} />
      ))}
      <path d="M 540 250 L 540 170" stroke={INK} strokeWidth={8} />
      <path d={`M 540 172 L ${612 + Math.sin(f / 5) * 8} 192 L 540 214 Z`} fill={GOLD} stroke={INK} strokeWidth={4} />
      {/* bunting */}
      <path d={`M 0 250 Q 540 420 1080 250`} stroke={INK} strokeWidth={5} fill="none" />
      {pts.slice(0, 12).map((p, i) => {
        const q = pts[i + 1];
        const mx = (p[0] + q[0]) / 2;
        const my = (p[1] + q[1]) / 2;
        const sw = Math.sin(f / 6 + i) * 4;
        return <path key={i} d={`M ${mx - 34} ${my} L ${mx + 34} ${my} L ${mx + sw} ${my + 62} Z`} fill={[GOLD, C.teal, C.brick][i % 3]} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
      })}
      {/* lanterns */}
      {[170, 910].map((lx, i) => (
        <g key={lx}>
          <circle cx={lx} cy={560} r={60} fill={C.glow} opacity={0.3 + 0.1 * Math.sin(f / 3 + i)} />
          <rect x={lx - 22} y={530} width={44} height={60} rx={10} fill={C.glow} stroke={INK} strokeWidth={5} />
          <path d={`M ${lx} 530 L ${lx} 480`} stroke={INK} strokeWidth={5} />
        </g>
      ))}
    </g>
  );
};

const StageFloor: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={0} y={y} width={1080} height={46} fill={WOOD} stroke={INK} strokeWidth={7} />
    {[150, 390, 620, 860].map((px) => <path key={px} d={`M ${px} ${y + 6} L ${px} ${y + 40}`} stroke={WOOD_D} strokeWidth={5} />)}
    <rect x={0} y={y + 46} width={1080} height={1920 - y} fill={C.brickDark} />
    {new Array(9).fill(0).map((_, i) => <rect key={i} x={i * 130 - 10} y={y + 46} width={65} height={1920 - y} fill={C.brick} />)}
    <path d={`M 0 ${y + 46} ${new Array(18).fill(0).map((_, i) => `Q ${i * 60 + 30} ${y + 110} ${i * 60 + 60} ${y + 46}`).join(" ")}`} fill={GOLD} stroke={INK} strokeWidth={5} />
  </g>
);

const Crowd: React.FC<{ f: number; y: number; cheer?: number; gasp?: number }> = ({ f, y, cheer = 0, gasp = 0 }) => (
  <g>
    {new Array(9).fill(0).map((_, i) => {
      const cx = i * 128 + 10 + (i % 2) * 20;
      const bob = Math.sin(f / 7 + i) * 5 - cheer * Math.abs(Math.sin(f / 3 + i)) * 26;
      const coat = ["#4E5D6C", "#6B4E3A", "#2E7D7A", "#7E2E22", "#5A4A6E"][i % 5];
      const hy = y + bob + (i % 2) * 30;
      const arms = cheer > 0.4 && i % 2 === 0;
      return (
        <g key={i}>
          {arms ? (
            <>
              <path d={`M ${cx - 50} ${hy + 60} L ${cx - 90} ${hy - 80}`} stroke={coat} strokeWidth={30} strokeLinecap="round" />
              <path d={`M ${cx + 50} ${hy + 60} L ${cx + 90} ${hy - 80}`} stroke={coat} strokeWidth={30} strokeLinecap="round" />
            </>
          ) : null}
          <ellipse cx={cx} cy={hy + 170} rx={95} ry={120} fill={coat} stroke={INK} strokeWidth={6} />
          <circle cx={cx} cy={hy} r={56} fill={i % 3 === 1 ? "#C98F65" : SKIN} stroke={INK} strokeWidth={6} />
          {i % 3 === 0 ? <path d={`M ${cx - 62} ${hy - 26} Q ${cx} ${hy - 92} ${cx + 62} ${hy - 26} Z`} fill="#3A3330" stroke={INK} strokeWidth={5} /> : null}
          {gasp > 0 ? <ellipse cx={cx} cy={hy - 2} rx={9} ry={12 * gasp} fill="#5A1A1A" /> : null}
        </g>
      );
    })}
  </g>
);

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(10, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 120 - Math.min(age, 20) * 1.2, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const ASSIST = { coat: "#7A5A3A", trousers: "#4A3E33", scarf: C.teal, hat: "cap" as const };
const QUACK = { coat: C.brick, trousers: "#2A2420", scarf: GOLD, hat: "top" as const, moustache: true };

export const ToadEater: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "hook";
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" | "modern" = "dawn";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;

  if (mode === "hook") {
    // close-up: the assistant lifts a wriggling toad to his open mouth
    const tx = interpolate(f, [0, 22], [70, 34], { ...clamp, easing: Easing.out(Easing.cubic) });
    const wr = Math.sin(f / 2) * 7;
    body = (
      <>
        <Fair f={f} floor={1500} />
        <Person {...ASSIST} x={540} y={1990} s={2.3} mouth="open" eyes="bulge" hl={[-100, -250]} hr={[tx + 30, -392]}>
          <Toad x={tx} y={-418} s={0.48} rot={-18 + wr} f={f} kick={10} />
        </Person>
      </>
    );
  } else if (mode === "stage") {
    // wide: the quack sells his miracle cure, the assistant waits with a toad
    const wave = Math.sin(f / 6) * 18;
    body = (
      <>
        <Fair f={f} floor={1250} />
        <StageFloor y={1250} />
        <Person {...QUACK} x={360} y={1250} s={1.05} mouth="grin" hl={[-120, -300]} hr={[95, -585 + wave]}>
          <Bottle x={98} y={-610 + wave} s={1.1} rot={Math.sin(f / 5) * 8} f={f} />
          <Sparkle x={98} y={-650 + wave} f={f} n={6} r={95} seed="st" />
        </Person>
        <Person {...ASSIST} x={760} y={1250} s={0.92} mouth="flat" eyes="normal" hl={[-95, -255]} hr={[100, -230]}>
          <Toad x={-100} y={-280} s={0.5} f={f} kick={6} rot={Math.sin(f / 3) * 5} />
        </Person>
        <Crowd f={f} y={1660} />
      </>
    );
  } else if (mode === "toad") {
    // the "deadly" toad: glands glow
    sky = "paper";
    const pulse = 0.5 + 0.5 * Math.sin(f / 4);
    const S = 3.3;
    body = (
      <>
        <circle cx={540} cy={980} r={420} fill="#E3D3B0" stroke={INK} strokeWidth={6} />
        {[-40, 40].map((gx) => (
          <ellipse key={gx} cx={540 + gx * S} cy={980 - 34 * S} rx={(34 + 14 * pulse) * 1.6} ry={(20 + 8 * pulse) * 1.6} fill="#D7F26B" opacity={0.25 + 0.35 * pulse} />
        ))}
        <Toad x={540} y={980} s={S} f={f} kick={3} />
        {/* oozing drops from the glands */}
        {[-40, 40].map((gx, i) => {
          const age = (f + i * 11) % 26;
          return <ellipse key={gx} cx={540 + gx * S + (i ? 22 : -22)} cy={980 - 26 * S + age * 3.2} rx={9} ry={13} fill="#F4F0C8" stroke={INK} strokeWidth={3} opacity={1 - age / 26} />;
        })}
      </>
    );
  } else if (mode === "gulp") {
    // he swallows it, chokes, and collapses
    const t1 = dur * 0.3;
    const t2 = dur * 0.52;
    const t3 = dur * 0.56;
    const p1 = interpolate(f, [0, t1], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const p2 = interpolate(f, [t1, t2], [0, 1], clamp);
    const p3 = interpolate(f, [t3, t3 + 14], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const bounce = f > t3 + 14 ? Math.sin((f - t3 - 14) / 2) * 6 * Math.exp(-(f - t3 - 14) / 6) : 0;
    const swallowed = f >= t1;
    const toadX = interpolate(p1, [0, 1], [95, 0]);
    const toadY = interpolate(p1, [0, 1], [-385, -420]);
    const stage = f < t1 ? 0 : f < t3 ? 1 : 2;
    const shake = stage === 1 ? Math.sin(f * 2.3) * 6 : 0;
    body = (
      <>
        <Fair f={f} floor={1200} />
        <StageFloor y={1200} />
        <Person {...ASSIST} x={interpolate(p3, [0, 1], [540, 100]) + shake} y={1200} s={1.3} rot={p3 * 75 + bounce}
          mouth={stage === 0 ? "open" : stage === 1 ? "o" : "open"} eyes={stage === 0 ? "normal" : stage === 1 ? "bulge" : "x"}
          hl={stage === 0 ? [-100, -250] : stage === 1 ? [-34, -392] : [-40, -260]}
          hr={stage === 0 ? [toadX + 25, toadY + 18] : stage === 1 ? [34, -392] : [40, -250]}>
          {!swallowed ? <Toad x={toadX} y={toadY} s={interpolate(p1, [0, 1], [0.5, 0.28])} rot={-20 + Math.sin(f / 2) * 8} f={f} kick={10} /> : null}
          {stage === 1 ? <ellipse cx={0} cy={interpolate(p2, [0, 1], [-395, -250])} rx={38} ry={30} fill="#8C6A48" stroke={INK} strokeWidth={6} /> : null}
        </Person>
        <Crowd f={f} y={1660} gasp={interpolate(f, [t3, t3 + 8], [0, 1], clamp)} />
      </>
    );
    const beat = stage > 0 ? Math.max(0, Math.sin(f / 4)) ** 4 : 0;
    overlay = <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 ${200 + beat * 140}px rgba(181,69,47,${0.25 + beat * 0.35})` }} />;
  } else if (mode === "cure") {
    // one drop of the "cure" – he springs back up, coins rain on the stage
    const rv = dur * (v.reviveAt ?? 0.38);
    const pr = interpolate(f, [rv, rv + 12], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.8)) });
    const up = f >= rv;
    const drop = interpolate(f, [rv - 14, rv - 2], [0, 1], clamp);
    const quackRaise = interpolate(f, [rv + 6, rv + 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const bh: [number, number] = [interpolate(quackRaise, [0, 1], [-130, -100]), interpolate(quackRaise, [0, 1], [-330, -585])];
    body = (
      <>
        <Fair f={f} floor={1200} />
        <StageFloor y={1200} />
        <Person {...ASSIST} x={interpolate(pr, [0, 1], [100, 400])} y={1200} s={1.3} rot={75 * (1 - pr)}
          mouth={up ? "grin" : "open"} eyes={up ? "normal" : "x"}
          hl={up ? [-125, -560] : [-40, -260]} hr={up ? [125, -560] : [40, -250]} />
        <Person {...QUACK} x={830} y={1200} s={1.05} mouth="grin" hl={bh} hr={[110, -240]}>
          <Bottle x={bh[0] - 4} y={bh[1] - 10} s={1.1} rot={interpolate(quackRaise, [0, 1], [-160, 0])} f={f} />
          {drop > 0 && drop < 1 ? <ellipse cx={-160} cy={-350 + drop * 110} rx={10} ry={15} fill={ELIXIR} stroke={INK} strokeWidth={3} /> : null}
          {quackRaise > 0 ? <Sparkle x={-104} y={-640} f={f} n={6} r={90} seed="cu" /> : null}
        </Person>
        {up
          ? new Array(18).fill(0).map((_, i) => {
              const st = rv + 4 + random(`cs${i}`) * 30;
              const age = f - st;
              if (age < 0) return null;
              const cx = 90 + random(`cx${i}`) * 820;
              const cy = Math.min(1190, -60 + age * age * 0.9 + age * 12);
              const spin = Math.abs(Math.cos(age / 3 + i));
              return <ellipse key={i} cx={cx} cy={cy} rx={30 * (0.25 + 0.75 * spin)} ry={30} fill={GOLD} stroke={INK} strokeWidth={5} />;
            })
          : null}
        <Crowd f={f} y={1660} cheer={pr} />
      </>
    );
  } else if (mode === "now") {
    // the word shrinks: TOAD-EATER → TOADY · and the office toady today
    sky = "paper";
    const m = interpolate(f, [dur * 0.12, dur * 0.34], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const pop = interpolate(f, [dur * 0.3, dur * 0.3 + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
    const toadIn = interpolate(f, [dur * 0.5, dur * 0.5 + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
    const nod = Math.abs(Math.sin(f / 3.2)) * 16;
    const say = ["YES, BOSS!", "GENIUS IDEA!", "SO TRUE, BOSS!"][Math.floor(f / 26) % 3];
    body = (
      <>
        <rect x={0} y={700} width={1080} height={560} fill="#7FB3AE" stroke={INK} strokeWidth={7} />
        <rect x={0} y={1255} width={1080} height={700} fill="#B9A98E" />
        {new Array(8).fill(0).map((_, i) => <path key={i} d={`M ${i * 150} 1255 L ${i * 150 - 120} 1920`} stroke="#A39274" strokeWidth={5} />)}
        <rect x={600} y={760} width={250} height={190} fill="#DDEFF5" stroke={INK} strokeWidth={6} />
        <path d="M 725 760 L 725 950 M 600 855 L 850 855" stroke={INK} strokeWidth={5} />
        <Person x={720} y={1230} s={0.82} coat={C.navy} trousers="#1E2433" scarf={C.brick} hat="none" mouth="flat" eyes="normal" hl={[40, -250]} hr={[-40, -260]} />
        <Person x={320} y={1230} s={0.8} coat="#9AA6B2" trousers="#4A4E5E" scarf={GOLD} hat="none" mouth="grin" eyes="closed" headBob={nod} hl={[-25, -300]} hr={[25, -300]} />
        <rect x={150} y={1090} width={380} height={42} fill={WOOD} stroke={INK} strokeWidth={6} />
        <rect x={170} y={1132} width={30} height={100} fill={WOOD_D} stroke={INK} strokeWidth={5} />
        <rect x={480} y={1132} width={30} height={100} fill={WOOD_D} stroke={INK} strokeWidth={5} />
        <g opacity={toadIn}>
          <Toad x={440} y={1060} s={0.42 * toadIn} f={f} />
        </g>
      </>
    );
    overlay = (
      <>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: titleFont, fontSize: 116, color: INK, opacity: 1 - m, transform: `translateY(${-m * 60}px)` }}>
          TOAD<span style={{ color: C.brick, textDecoration: m > 0.05 ? "line-through" : "none" }}>-EATER</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", fontFamily: titleFont, fontSize: 190, color: INK, opacity: pop, transform: `scale(${0.6 + 0.4 * pop})` }}>
          TOAD<span style={{ color: C.brick }}>Y</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 530, textAlign: "center", fontFamily: typeFont, fontSize: 40, color: INK, opacity: pop }}>{v.sub ?? "toad-eater (1620s) → toady (1826)"}</div>
        <div style={{ position: "absolute", left: 70, top: 730, fontFamily: typeFont, fontSize: 42, color: INK, background: "#FFFFFF", border: `5px solid ${INK}`, borderRadius: 26, padding: "8px 22px", opacity: interpolate(f, [8, 14], [0, 1], clamp) }}>{say}</div>
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {overlay}
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
