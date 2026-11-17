import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep016 Log Driver – river drivers riding logs down spring rapids.
// visual: { mode: "ride" | "boots" | "jam" | "tree" | "now", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, figure?, releaseAt?, revealAt?, thenLabel?, nowLabel? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const BARK = "#8A5A34";
const BARK_D = "#5E3B22";
const WOOD = "#E2B878";
const WOOD_D = "#C99A5A";
const WATER = "#3F86A8";
const WATER_D = "#2F6E8E";
const FOAM = "#F4FBFF";
const PINE = "#2F6B47";
const PINE_D = "#24543A";
const LEATHER = "#6B4428";
const STEEL = "#8C929C";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(10, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + Math.floor(i / 2) * 120 + (i % 2) * 40 - Math.min(age, 20) * 1.2, fontFamily: typeFont, fontSize: 50, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// a log seen from the side: bark body + cut end with rings (spin turns the rings)
const Log: React.FC<{ x: number; y: number; w: number; h?: number; rot?: number; spin?: number; glow?: number }> = ({ x, y, w, h = 90, rot = 0, spin = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {glow > 0 ? <rect x={-w / 2 - 24} y={-h / 2 - 24} width={w + 48} height={h + 48} rx={h / 2 + 24} fill={C.mustard} opacity={0.55 * glow} /> : null}
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={BARK} stroke={INK} strokeWidth={6} />
    {new Array(Math.max(1, Math.floor(w / 90))).fill(0).map((_, k) => {
      const xx = -w / 2 + 50 + k * 90 + ((spin * 0.6) % 90);
      if (xx > w / 2 - 50) return null;
      return <path key={k} d={`M ${xx} ${-h / 2 + 14} q 14 ${h / 2 - 14} 0 ${h - 28}`} stroke={BARK_D} strokeWidth={5} fill="none" />;
    })}
    <ellipse cx={w / 2 - h * 0.18} cy={0} rx={h * 0.32} ry={h / 2} fill={WOOD} stroke={INK} strokeWidth={6} />
    <g transform={`rotate(${spin} ${w / 2 - h * 0.18} 0)`}>
      <ellipse cx={w / 2 - h * 0.18} cy={0} rx={h * 0.2} ry={h * 0.32} fill="none" stroke={WOOD_D} strokeWidth={4} />
      <ellipse cx={w / 2 - h * 0.18} cy={0} rx={h * 0.09} ry={h * 0.15} fill="none" stroke={WOOD_D} strokeWidth={4} />
      <line x1={w / 2 - h * 0.18} y1={-h * 0.4} x2={w / 2 - h * 0.18} y2={-h * 0.05} stroke={WOOD_D} strokeWidth={4} />
    </g>
  </g>
);

const Pines: React.FC<{ y: number; seed: string; scale?: number }> = ({ y, seed, scale = 1 }) => (
  <g>
    {new Array(14).fill(0).map((_, k) => {
      const x = k * 82 - 20 + random(`${seed}x${k}`) * 30;
      const h = (180 + random(`${seed}h${k}`) * 160) * scale;
      return (
        <g key={k}>
          <rect x={x - 8} y={y - 30} width={16} height={40} fill={BARK_D} />
          <path d={`M ${x} ${y - h} L ${x + h * 0.32} ${y - 20} L ${x - h * 0.32} ${y - 20} Z`} fill={k % 2 ? PINE : PINE_D} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        </g>
      );
    })}
  </g>
);

const River: React.FC<{ y: number; f: number; speed?: number }> = ({ y, f, speed = 9 }) => (
  <g>
    <rect x={0} y={y} width={1080} height={1920 - y} fill={WATER} />
    <rect x={0} y={y} width={1080} height={26} fill={WATER_D} />
    {new Array(14).fill(0).map((_, k) => {
      const row = y + 60 + k * ((1920 - y) / 14);
      const len = 80 + random(`rv${k}`) * 120;
      const x = ((random(`rx${k}`) * 1300 - f * speed * (0.7 + (k / 14) * 0.8)) % 1300 + 1300) % 1300 - 160;
      return (
        <g key={k}>
          <path d={`M ${x} ${row} q ${len / 2} -18 ${len} 0`} stroke={FOAM} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.75} />
          <path d={`M ${(x + 600) % 1300 - 160} ${row + 30} q ${len / 3} -12 ${len * 0.66} 0`} stroke="#9FD0E6" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7} />
        </g>
      );
    })}
  </g>
);

const Spray: React.FC<{ x: number; y: number; f: number; n?: number; spread?: number; seed?: string; up?: number }> = ({ x, y, f, n = 10, spread = 120, seed = "sp", up = 160 }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const per = 14 + Math.floor(random(`${seed}p${k}`) * 10);
      const age = (f + k * 3) % per;
      const p = age / per;
      const dx = (random(`${seed}x${k}`) - 0.5) * spread * 2 * p;
      const dy = -p * (up * 0.5 + random(`${seed}y${k}`) * up) + p * p * 120;
      return <circle key={k} cx={x + dx} cy={y + dy} r={9 * (1 - p) + 2} fill={FOAM} stroke="#BFE3F2" strokeWidth={2} opacity={1 - p * 0.8} />;
    })}
  </>
);

// spiked "calk" boot in side view
const Boot: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 -260 L 40 -260 L 46 -70 Q 150 -66 175 -20 L 178 0 L -78 0 L -70 -120 Z" fill={LEATHER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -230 L 40 -230" stroke="#4E301B" strokeWidth={8} />
    {[-200, -170, -140, -110].map((yy) => (
      <path key={yy} d={`M 30 ${yy} l 30 -8`} stroke={C.cream} strokeWidth={6} strokeLinecap="round" />
    ))}
    <rect x={-84} y={0} width={268} height={26} rx={8} fill="#3A2616" stroke={INK} strokeWidth={6} />
    {new Array(8).fill(0).map((_, k) => (
      <path key={k} d={`M ${-66 + k * 32} 26 l 10 34 l 10 -34 Z`} fill={STEEL} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    ))}
  </g>
);

const DEFAULT_FIG: FigureSpec = { hat: "cap", coat: C.brick, scarf: C.mustard, skirt: false, prop: "pole", action: "idle" };

export const LogDriver: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "ride";
  const fig: FigureSpec = { ...DEFAULT_FIG, ...(v.figure ?? {}) };
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" | "modern" = "day";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;

  if (mode === "ride") {
    // a driver balancing on a spinning log in white water, logs racing past
    const bob = Math.sin(f / 5) * 14;
    const tilt = Math.sin(f / 8) * 4;
    const sway = Math.sin(f / 6.5) * 9 - tilt;
    const LY = (v.logY ?? 1420) + bob;
    const spin = f * 14;
    const feetY = LY - 50;
    body = (
      <>
        <Pines y={1010} seed="rb" scale={0.9} />
        <River y={1000} f={f} speed={12} />
        {/* logs racing past behind and in front */}
        <Log x={((1500 - f * 13) % 1700) - 300} y={1110 + Math.sin(f / 7) * 6} w={420} h={70} spin={f * 10} rot={-3} />
        <Log x={((900 - f * 16) % 1800 + 1800) % 1800 - 350} y={1220 + Math.sin(f / 6) * 8} w={360} h={64} spin={f * 12} rot={4} />
        {/* the ridden log */}
        <g transform={`rotate(${tilt} 540 ${LY})`}>
          <Log x={540} y={LY} w={760} h={112} spin={spin} />
        </g>
        <Spray x={170} y={LY + 10} f={f} n={9} spread={90} seed="l" />
        <Spray x={910} y={LY + 10} f={f} n={9} spread={90} seed="r" />
        <path d={`M 120 ${LY + 60} Q 540 ${LY + 110} 960 ${LY + 60}`} stroke={FOAM} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.85} />
        {/* the driver, swaying for balance */}
        <g transform={`rotate(${sway} 540 ${feetY})`}>
          <Figure {...fig} prop="none" x={530} y={feetY} scale={v.figScale ?? 1.1} facing="right" />
          {/* long pike pole held level for balance */}
          <g transform={`rotate(${-sway * 1.6} 545 ${feetY - 200 * (v.figScale ?? 1.1)})`}>
            <rect x={225} y={feetY - 200 * (v.figScale ?? 1.1) - 8} width={640} height={16} rx={8} fill="#B98B52" stroke={INK} strokeWidth={4} />
            <path d={`M 865 ${feetY - 200 * (v.figScale ?? 1.1)} l 34 0 M 865 ${feetY - 200 * (v.figScale ?? 1.1)} l 22 -16`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          </g>
        </g>
        <Log x={((300 - f * 18) % 1900 + 1900) % 1900 - 300} y={1760 + Math.sin(f / 5) * 10} w={520} h={96} spin={f * 16} rot={-2} />
        <Spray x={((300 - f * 18) % 1900 + 1900) % 1900 - 40} y={1760} f={f} n={6} spread={60} seed="fr" up={100} />
      </>
    );
  } else if (mode === "boots") {
    // close-up: the spiked calk boot stamps into wet bark, chips fly
    sky = "paper";
    const PER = 26;
    const t = f % PER;
    const down = interpolate(t, [0, 8, 10, PER], [-140, 0, 0, -140], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const hit = t >= 8 ? t - 8 : 99;
    body = (
      <>
        <rect x={0} y={1180} width={1080} height={740} fill={WATER} />
        <River y={1180} f={f} speed={6} />
        {/* giant log under the boot */}
        <rect x={-60} y={1100} width={1200} height={260} rx={120} fill={BARK} stroke={INK} strokeWidth={8} />
        {new Array(9).fill(0).map((_, k) => (
          <path key={k} d={`M ${k * 135 - 20} 1120 q 30 110 0 220`} stroke={BARK_D} strokeWidth={8} fill="none" />
        ))}
        <path d="M 0 1130 L 1080 1130" stroke="#A9CBDA" strokeWidth={6} opacity={0.6} />
        {/* spike holes left by earlier steps */}
        {[180, 260, 760, 840].map((x) => (
          <g key={x}>
            {[0, 1, 2].map((k) => (
              <ellipse key={k} cx={x + k * 26} cy={1112} rx={6} ry={4} fill={BARK_D} />
            ))}
          </g>
        ))}
        <Boot x={470} y={1050 + down} s={1.9} rot={-4} />
        {hit < 14
          ? new Array(10).fill(0).map((_, k) => {
              const p = hit / 14;
              const dx = (random(`ch${k}`) - 0.5) * 520 * p;
              const dy = -p * (120 + random(`cy${k}`) * 160) + p * p * 160;
              return <rect key={k} x={540 + dx} y={1110 + dy} width={18} height={10} rx={3} fill={k % 2 ? BARK_D : WOOD} transform={`rotate(${k * 37 + hit * 20} ${540 + dx} ${1110 + dy})`} opacity={1 - p} />;
            })
          : null}
        {hit < 10 ? <Spray x={540} y={1180} f={hit} n={8} spread={260} seed="bs" up={120} /> : null}
      </>
    );
  } else if (mode === "jam") {
    // a mountain of locked logs; a driver pries the key log, the jam lets go and he runs
    sky = "dawn";
    const relAt = Math.round(dur * (v.releaseAt ?? 0.62));
    const rel = Math.max(0, f - relAt);
    const pry = Math.sin(f / 3) * 6;
    const keyGlow = f < relAt ? 0.5 + 0.5 * Math.sin(f / 3) : 0;
    const shake = f > relAt - 10 && f < relAt + 6 ? Math.sin(f * 3.1) * 6 : 0;
    const logs = new Array(26).fill(0).map((_, k) => {
      const row = Math.floor(k / 6);
      const x = 160 + (k % 6) * 160 + (row % 2) * 70 + (random(`jx${k}`) - 0.5) * 60;
      const y = 1500 - row * 120 - (1 - Math.abs((k % 6) - 2.5) / 3) * row * 40;
      const r = (random(`jr${k}`) - 0.5) * 70;
      return { x, y, r, w: 300 + random(`jw${k}`) * 160 };
    });
    const runX = 560 - Math.max(0, f - relAt + 4) * 22;
    body = (
      <>
        <Pines y={1000} seed="jb" scale={1.1} />
        <River y={990} f={f} speed={rel > 0 ? 16 : 3} />
        <g transform={`translate(${shake} 0)`}>
          {logs.map((l, k) => {
            const vel = rel > 0 ? rel * (6 + random(`jv${k}`) * 10) : 0;
            const drop = rel > 0 ? rel * rel * 0.6 : 0;
            return <Log key={k} x={l.x + vel} y={l.y + drop * 0.4} w={l.w} h={84} rot={l.r + (rel > 0 ? rel * (random(`jt${k}`) - 0.5) * 8 : 0)} spin={rel * 20} />;
          })}
          {/* the key log at the toe of the jam */}
          <Log x={620 + rel * 30} y={1430 + rel * 6} w={420} h={96} rot={-18 + (rel > 0 ? rel * 4 : 0)} glow={keyGlow} spin={rel * 25} />
        </g>
        {rel > 0 ? <Spray x={700} y={1500} f={rel} n={16} spread={400} seed="burst" up={420} /> : null}
        {/* the driver on top, prying with his pole, then running */}
        <g transform={`translate(${f < relAt ? 0 : runX - 560} ${f < relAt ? 0 : -Math.abs(Math.sin(rel / 2)) * 30})`}>
          <g transform={`rotate(${f < relAt ? pry : -8} 560 1050)`}>
            <Figure {...fig} action={f < relAt ? "tap" : "walk"} x={560} y={1050} scale={1.05} facing={f < relAt ? "right" : "left"} />
          </g>
        </g>
      </>
    );
  } else if (mode === "tree") {
    // quiet riverbank: a pair of spiked boots hanging from a branch
    sky = "dawn";
    const swingA = Math.sin(f / 18) * 5;
    const swingB = Math.sin(f / 18 + 0.8) * 5;
    body = (
      <>
        <River y={1250} f={f} speed={3} />
        <path d="M -40 1200 Q 300 1180 560 1300 L 560 1920 L -40 1920 Z" fill="#6E8B4E" stroke={INK} strokeWidth={6} />
        {/* tree */}
        <path d="M 180 1250 L 220 520 L 300 520 L 330 1250 Z" fill={BARK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 270 640 Q 520 560 820 600" stroke={BARK} strokeWidth={46} fill="none" strokeLinecap="round" />
        <path d="M 270 640 Q 520 560 820 600" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} />
        <circle cx={250} cy={430} r={230} fill={PINE} stroke={INK} strokeWidth={6} />
        <circle cx={420} cy={480} r={160} fill={PINE_D} stroke={INK} strokeWidth={6} />
        {/* the boots, tied together, hanging */}
        <g transform={`rotate(${swingA} 640 590)`}>
          <line x1={640} y1={590} x2={620} y2={880} stroke={C.cream} strokeWidth={5} />
          <Boot x={600} y={1150} s={1.0} rot={4} />
        </g>
        <g transform={`rotate(${swingB} 660 590)`}>
          <line x1={660} y1={590} x2={720} y2={900} stroke={C.cream} strokeWidth={5} />
          <Boot x={720} y={1170} s={1.0} rot={-6} />
        </g>
        <Log x={((1400 - f * 4) % 1600) - 200} y={1500} w={380} h={70} spin={f * 3} rot={2} />
      </>
    );
  } else if (mode === "now") {
    // THEN: logs on the river | NOW: a logging truck on the road
    sky = "paper";
    const rev = interpolate(f, [dur * (v.revealAt ?? 0.35), dur * (v.revealAt ?? 0.35) + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
    const truckX = interpolate(rev, [0, 1], [1400, 520]);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={960} fill="#BFD8E2" />
        <Pines y={520} seed="nb" scale={0.7} />
        <River y={520} f={f} speed={8} />
        {[0, 1, 2, 3].map((k) => (
          <Log key={k} x={((k * 330 + 1300 - f * 9) % 1300) - 120} y={640 + k * 80} w={300} h={64} spin={f * 8} rot={(k % 2 ? 3 : -3)} />
        ))}
        <rect x={0} y={960} width={1080} height={960} fill="#D9C49C" />
        <rect x={0} y={1730} width={1080} height={140} fill="#5B5550" />
        <path d="M 0 1800 L 1080 1800" stroke={C.cream} strokeWidth={8} strokeDasharray="60 50" />
        <g transform={`translate(${truckX - 520} 230)`} opacity={rev}>
          {/* trailer of logs */}
          {[0, 1, 2].map((r) => [0, 1, 2, 3].slice(0, 4 - r).map((c) => (
            <circle key={`${r}${c}`} cx={260 + c * 92 + r * 46} cy={1360 - r * 84} r={44} fill={WOOD} stroke={INK} strokeWidth={6} />
          )))}
          <rect x={190} y={1404} width={420} height={36} fill="#3A3A3A" stroke={INK} strokeWidth={6} />
          {/* cab */}
          <path d="M 640 1440 L 640 1270 L 760 1270 L 820 1350 L 860 1360 L 860 1440 Z" fill={C.brick} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 665 1290 L 745 1290 L 790 1350 L 665 1350 Z" fill="#BFE3F2" stroke={INK} strokeWidth={5} />
          {[260, 440, 700, 810].map((x) => (
            <circle key={x} cx={x} cy={1460} r={42} fill="#2B2B2B" stroke={INK} strokeWidth={6} />
          ))}
        </g>
        <circle cx={540} cy={960} r={80} fill={C.mustard} stroke={INK} strokeWidth={8} />
      </>
    );
    overlay = (
      <>
        <div style={{ position: "absolute", left: 0, right: 0, top: 960 - 48, textAlign: "center", fontFamily: titleFont, fontSize: 64, color: INK }}>VS</div>
        <div style={{ position: "absolute", left: 90, top: 250, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 12, padding: "6px 18px" }}>{v.thenLabel ?? "THEN: RIDE THE RIVER"}</div>
        <div style={{ position: "absolute", right: 170, top: 1100, fontFamily: typeFont, fontSize: 52, color: INK, background: C.mustard, border: `5px solid ${INK}`, borderRadius: 12, padding: "6px 18px", opacity: rev }}>{v.nowLabel ?? "NOW: TRUCKS"}</div>
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
