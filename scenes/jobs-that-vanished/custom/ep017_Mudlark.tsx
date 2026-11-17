import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep017 Mudlark – Thames foreshore at low tide.
// visual: { mode: "shore" | "feet" | "haul" | "tide", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, figure?, rise?: [from,to] (tide), items?: string[] (haul) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const MUD = "#5E4A35";
const MUD_D = "#47372A";
const MUD_L = "#7A6248";
const RIVER = "#6F8A86";
const COAL = "#2A2A2E";
const COPPER = "#C9783A";
const GLASS = "#A9D8C4";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 110 + Math.floor(i / 2) * 230 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 48, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// distant far bank: warehouses, a bridge, a moored barge
const FarBank: React.FC<{ y: number; f: number; tint?: string }> = ({ y, f, tint = "#6E5F73" }) => (
  <g>
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <rect key={k} x={k * 160 - 20} y={y - 90 - (k % 3) * 40} width={150} height={100 + (k % 3) * 40} fill={tint} opacity={0.75} />
    ))}
    {/* bridge */}
    <path d={`M -20 ${y - 40} L 1100 ${y - 40} L 1100 ${y - 10} L -20 ${y - 10} Z`} fill="#5A4E60" />
    {[60, 330, 600, 870].map((x) => (
      <path key={x} d={`M ${x} ${y + 30} Q ${x + 135} ${y - 70} ${x + 270} ${y + 30}`} fill="none" stroke="#5A4E60" strokeWidth={22} />
    ))}
    {/* moored barge, gently bobbing */}
    <g transform={`translate(${720}, ${y + 60 + Math.sin(f / 18) * 4})`}>
      <path d="M -150 0 L 150 0 L 120 40 L -130 40 Z" fill="#3F3530" stroke={INK} strokeWidth={5} />
      <rect x={-20} y={-150} width={10} height={150} fill="#3F3530" />
      <path d="M -10 -145 L 70 -40 L -10 -40 Z" fill={C.brick} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

// debris on the mud: stones, broken pottery, bones
const Debris: React.FC<{ y0: number; seed: string; n?: number }> = ({ y0, seed, n = 14 }) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const x = random(`${seed}x${i}`) * 1080;
      const y = y0 + random(`${seed}y${i}`) * (1920 - y0);
      const k = Math.floor(random(`${seed}k${i}`) * 4);
      const s = 0.6 + (y - y0) / 900;
      if (k === 0) return <ellipse key={i} cx={x} cy={y} rx={18 * s} ry={10 * s} fill="#8A8478" stroke={INK} strokeWidth={3} />;
      if (k === 1) return <path key={i} d={`M ${x} ${y} l ${22 * s} ${-8 * s} l ${10 * s} ${14 * s} l ${-26 * s} ${6 * s} Z`} fill="#C7A27A" stroke={INK} strokeWidth={3} />;
      if (k === 2) return <rect key={i} x={x} y={y} width={40 * s} height={9 * s} rx={4 * s} fill="#E9E0C8" stroke={INK} strokeWidth={3} transform={`rotate(${random(`${seed}r${i}`) * 60 - 30} ${x} ${y})`} />;
      return <ellipse key={i} cx={x} cy={y} rx={12 * s} ry={9 * s} fill={COAL} stroke={INK} strokeWidth={3} />;
    })}
  </>
);

// wet-mud shine streaks
const Shine: React.FC<{ y0: number; f: number }> = ({ y0, f }) => (
  <>
    {new Array(8).fill(0).map((_, k) => (
      <path key={k} d={`M ${(k * 197) % 1080 - 60} ${y0 + 60 + k * 95} q 80 -10 160 0`} stroke="#9A8468" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.35 + 0.25 * Math.sin(f / 15 + k)} />
    ))}
  </>
);

// mud bubbles that swell and pop
const Bubbles: React.FC<{ x: number; y: number; w: number; f: number; seed: string }> = ({ x, y, w, f, seed }) => (
  <>
    {[0, 1, 2, 3].map((k) => {
      const per = 38 + k * 7;
      const p = ((f + random(`${seed}${k}`) * per) % per) / per;
      const bx = x + (random(`${seed}b${k}`) - 0.5) * w;
      const r = p < 0.85 ? 4 + p * 16 : 0;
      return r ? <circle key={k} cx={bx} cy={y - r * 0.6} r={r} fill={MUD_L} stroke={INK} strokeWidth={3} /> : null;
    })}
  </>
);

// flying mud splats
const Splats: React.FC<{ x: number; y: number; f: number; every?: number }> = ({ x, y, f, every = 22 }) => (
  <>
    {[0, 1, 2, 3, 4].map((k) => {
      const age = (f + k * 4) % every;
      const p = age / 14;
      if (p > 1) return null;
      const dir = k % 2 ? 1 : -1;
      const px = x + dir * (40 + k * 18) * p;
      const py = y - 160 * p + 200 * p * p;
      return <circle key={k} cx={px} cy={py} r={9 - k} fill={MUD_D} opacity={1 - p * 0.6} />;
    })}
  </>
);

const Coal: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -30 -6 L -12 -28 L 18 -24 L 32 2 L 14 24 L -20 20 Z" fill={COAL} stroke={INK} strokeWidth={4} />
    <path d="M -10 -16 L 8 -18" stroke="#6A6A78" strokeWidth={4} strokeLinecap="round" />
  </g>
);

const Nail: React.FC<{ x: number; y: number; s?: number; rot?: number; glint?: number }> = ({ x, y, s = 1, rot = 0, glint = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-6} y={-60} width={12} height={110} rx={3} fill={COPPER} stroke={INK} strokeWidth={4} />
    <path d="M -6 50 L 0 70 L 6 50 Z" fill={COPPER} stroke={INK} strokeWidth={4} />
    <rect x={-18} y={-70} width={36} height={14} rx={5} fill={COPPER} stroke={INK} strokeWidth={4} />
    {glint > 0 ? <path d={`M 0 -100 l 6 18 l 18 6 l -18 6 l -6 18 l -6 -18 l -18 -6 l 18 -6 Z`} fill={C.glow} opacity={glint} /> : null}
  </g>
);

const Shard: React.FC<{ x: number; y: number; s?: number; rot?: number; glint?: number }> = ({ x, y, s = 1, rot = 0, glint = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 30 L -6 -60 L 44 22 L 10 10 Z" fill={GLASS} opacity={0.85} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -14 -20 L 2 -44" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
    {glint > 0 ? <path d={`M 4 -90 l 7 20 l 20 7 l -20 7 l -7 20 l -7 -20 l -20 -7 l 20 -7 Z`} fill="#FFFFFF" opacity={glint} /> : null}
  </g>
);

const Bone: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-40} y={-8} width={80} height={16} rx={8} fill="#EDE3CB" stroke={INK} strokeWidth={4} />
    {[-40, 40].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={-9} r={11} fill="#EDE3CB" stroke={INK} strokeWidth={4} />
        <circle cx={cx} cy={9} r={11} fill="#EDE3CB" stroke={INK} strokeWidth={4} />
      </g>
    ))}
  </g>
);

const Rope: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[34, 24, 14].map((r) => (
      <ellipse key={r} cx={0} cy={0} rx={r * 1.3} ry={r * 0.7} fill="none" stroke="#B08B57" strokeWidth={9} />
    ))}
  </g>
);

const DEFAULT_FIG: FigureSpec = { hat: "cap", coat: "#7B5B3E", scarf: "#B5452F", skirt: false, prop: "none", action: "idle" };

// rolled trousers + bare shins drawn over the kit figure's legs (figure-local coords)
const BareShins: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x}, ${y}) scale(${s})`}>
    <rect x={-20} y={-118} width={38} height={118} rx={14} fill={SKIN} stroke={INK} strokeWidth={5} />
    <rect x={-6} y={-118} width={38} height={118} rx={14} fill={SKIN} stroke={INK} strokeWidth={5} />
    <rect x={-30} y={-138} width={72} height={26} rx={10} fill="#4A3F38" stroke={INK} strokeWidth={5} />
  </g>
);

export const Mudlark: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "shore";
  const fig: FigureSpec = { ...DEFAULT_FIG, ...(v.figure ?? {}) };
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" = "dawn";
  let body: React.ReactNode = null;

  if (mode === "shore") {
    // a boy knee-deep in the foreshore mud, heaving a lump of coal out – action from frame 0
    const FX = 520;
    const FS = 2.0;
    const FEET = 1720;
    const MUDLINE = FEET - 95 * FS; // knee-deep
    const tug = Math.max(0, Math.sin(f / 6)) ** 2; // pulling rhythm
    const lift = interpolate(f, [0, 34], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const coalY = MUDLINE + 30 - lift * 330 - tug * 10;
    body = (
      <>
        <rect x={0} y={880} width={1080} height={260} fill={RIVER} />
        {new Array(6).fill(0).map((_, k) => (
          <line key={k} x1={(k * 211 + f * 1.2) % 1200 - 100} y1={930 + k * 34} x2={(k * 211 + f * 1.2) % 1200 + 30} y2={930 + k * 34} stroke="#A9C1B9" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
        ))}
        <FarBank y={880} f={f} />
        <path d="M 0 1100 Q 300 1060 560 1095 Q 820 1130 1080 1080 L 1080 1920 L 0 1920 Z" fill={MUD} stroke={INK} strokeWidth={6} />
        <Shine y0={1100} f={f} />
        <Debris y0={1130} seed="sh" n={16} />
        {/* a second, smaller mudlark further out */}
        <Figure hat="none" coat="#6E7B5A" scarf={C.mustard} x={180} y={1250} scale={0.75} action="idle" facing="right" />
        <rect x={110} y={1215} width={140} height={40} rx={20} fill={MUD} />
        {/* the hero boy */}
        <g transform={`translate(0 ${tug * -14})`}>
          <Figure {...fig} x={FX} y={FEET} scale={FS} facing="right" />
          <BareShins x={FX} y={FEET} s={FS} />
          {/* reaching arm + coal */}
          <path d={`M ${FX + 40} ${FEET - 300 * FS} Q ${FX + 150} ${(FEET - 300 * FS + coalY) / 2} ${FX + 170} ${coalY - 10}`} stroke={fig.coat ?? DEFAULT_FIG.coat} strokeWidth={60} fill="none" strokeLinecap="round" />
          <path d={`M ${FX + 40} ${FEET - 300 * FS} Q ${FX + 150} ${(FEET - 300 * FS + coalY) / 2} ${FX + 170} ${coalY - 10}`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.0} />
          <circle cx={FX + 172} cy={coalY - 14} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
          <Coal x={FX + 180} y={coalY + 20} s={1.7} rot={f * 0.5} />
          {/* mud dripping off the coal */}
          {[0, 1, 2].map((k) => {
            const p = ((f + k * 9) % 26) / 26;
            return <circle key={k} cx={FX + 165 + k * 14} cy={coalY + 50 + p * 120} r={7 - k} fill={MUD_D} opacity={1 - p} />;
          })}
        </g>
        {/* front mud swallows the legs */}
        <path d={`M 0 ${MUDLINE} Q 260 ${MUDLINE - 30} ${FX - 60} ${MUDLINE + 6} Q ${FX} ${MUDLINE - 24 - tug * 10} ${FX + 80} ${MUDLINE + 4} Q 820 ${MUDLINE + 30} 1080 ${MUDLINE - 10} L 1080 1920 L 0 1920 Z`} fill={MUD} />
        <path d={`M 0 ${MUDLINE} Q 260 ${MUDLINE - 30} ${FX - 60} ${MUDLINE + 6} Q ${FX} ${MUDLINE - 24 - tug * 10} ${FX + 80} ${MUDLINE + 4} Q 820 ${MUDLINE + 30} 1080 ${MUDLINE - 10}`} fill="none" stroke={INK} strokeWidth={6} />
        <Shine y0={MUDLINE} f={f + 20} />
        <Bubbles x={FX} y={MUDLINE + 10} w={220} f={f} seed="sb" />
        <Splats x={FX} y={MUDLINE} f={f} />
        <Debris y0={MUDLINE + 60} seed="sf" n={10} />
      </>
    );
  } else if (mode === "feet") {
    // close-up: bare shins sinking into the mud, glass and a copper nail glinting beside them
    sky = "day";
    const MUDLINE = 1180;
    const sink = interpolate(f, [0, dur], [0, 60], clamp);
    const g1 = Math.max(0, Math.sin(f / 7)) ** 8;
    const g2 = Math.max(0, Math.sin(f / 7 + 2)) ** 8;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill={MUD_L} />
        <Shine y0={300} f={f} />
        {/* shins */}
        {[380, 650].map((x, i) => (
          <g key={x}>
            <path d={`M ${x - 70} 380 Q ${x - 90} 700 ${x - 60} ${MUDLINE + sink + 40} L ${x + 70} ${MUDLINE + sink + 40} Q ${x + 95} 700 ${x + 70} 380 Z`} fill={SKIN} stroke={INK} strokeWidth={8} />
            <rect x={x - 100} y={300} width={200} height={110} rx={24} fill="#4A3F38" stroke={INK} strokeWidth={8} />
            {/* mud smears */}
            <path d={`M ${x - 60} ${MUDLINE - 140 + i * 30} q 40 -30 120 -10 q -50 30 -120 10`} fill={MUD} opacity={0.75} />
          </g>
        ))}
        <path d={`M 0 ${MUDLINE} Q 200 ${MUDLINE - 30} 380 ${MUDLINE + 10} Q 520 ${MUDLINE - 30} 650 ${MUDLINE + 10} Q 860 ${MUDLINE + 30} 1080 ${MUDLINE - 10} L 1080 1920 L 0 1920 Z`} fill={MUD} stroke={INK} strokeWidth={8} />
        <Shine y0={MUDLINE} f={f} />
        <Bubbles x={380} y={MUDLINE + 20} w={160} f={f} seed="fa" />
        <Bubbles x={650} y={MUDLINE + 20} w={160} f={f + 11} seed="fb" />
        <Shard x={200} y={MUDLINE + 220} s={1.6} rot={-12} glint={g1} />
        <Nail x={860} y={MUDLINE + 200} s={1.5} rot={58} glint={g2} />
        <Coal x={520} y={MUDLINE + 330} s={1.3} rot={20} />
        <Debris y0={MUDLINE + 120} seed="fd" n={8} />
      </>
    );
  } else if (mode === "haul") {
    // the tin kettle filling up with the day's finds
    sky = "paper";
    const items: string[] = v.items ?? ["coal", "bone", "rope", "nail", "coal", "nail"];
    const every = Math.max(8, Math.floor((dur - 10) / (items.length + 1)));
    const KX = 540;
    const KY = 1150;
    body = (
      <>
        <rect x={0} y={1350} width={1080} height={570} fill={MUD} />
        <path d="M 0 1350 Q 540 1320 1080 1350" stroke={INK} strokeWidth={6} fill="none" />
        <Shine y0={1350} f={f} />
        {/* kettle back */}
        <path d={`M ${KX - 230} ${KY - 120} L ${KX + 230} ${KY - 120} L ${KX + 200} ${KY + 200} Q ${KX} ${KY + 250} ${KX - 200} ${KY + 200} Z`} fill="#8E8A80" stroke={INK} strokeWidth={8} />
        {/* falling items */}
        {items.map((it, i) => {
          const t = f - 4 - i * every;
          if (t < 0) return null;
          const p = interpolate(t, [0, 12], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          const restX = KX - 120 + (i % 3) * 120;
          const restY = KY - 80 - Math.floor(i / 3) * 40;
          const x = restX + (1 - p) * (i % 2 ? 260 : -260);
          const y = restY - (1 - p) * 700;
          const r = (1 - p) * (i % 2 ? 200 : -200);
          if (it === "coal") return <Coal key={i} x={x} y={y} s={1.6} rot={r} />;
          if (it === "bone") return <Bone key={i} x={x} y={y} s={1.2} rot={r + 15} />;
          if (it === "rope") return <Rope key={i} x={x} y={y} s={1.2} />;
          return <Nail key={i} x={x} y={y} s={1.1} rot={r + 70} glint={p > 0.95 ? 1 : 0} />;
        })}
        {/* kettle front */}
        <path d={`M ${KX - 230} ${KY - 60} L ${KX + 222} ${KY - 60} L ${KX + 200} ${KY + 200} Q ${KX} ${KY + 250} ${KX - 200} ${KY + 200} Z`} fill="#A39F94" stroke={INK} strokeWidth={8} />
        <path d={`M ${KX - 150} ${KY + 20} l 40 30 M ${KX + 90} ${KY + 70} l 30 -20`} stroke={INK} strokeWidth={6} opacity={0.5} />
        <path d={`M ${KX + 222} ${KY} Q ${KX + 340} ${KY - 20} ${KX + 360} ${KY - 120}`} stroke="#8E8A80" strokeWidth={34} fill="none" strokeLinecap="round" />
        <path d={`M ${KX - 210} ${KY - 120} Q ${KX} ${KY - 420} ${KX + 210} ${KY - 120}`} stroke={INK} strokeWidth={12} fill="none" />
      </>
    );
  } else if (mode === "tide") {
    // the tide comes back in over the mud; the boy turns for the steps
    const rise: [number, number] = v.rise ?? [0.15, 1];
    const WL = interpolate(f, [dur * rise[0], dur * rise[1]], [1090, 1430], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const FS = 1.5;
    const FEET = 1560;
    body = (
      <>
        <rect x={0} y={880} width={1080} height={300} fill={RIVER} />
        <FarBank y={880} f={f} tint="#5E5068" />
        <path d="M 0 1100 Q 300 1060 560 1095 Q 820 1130 1080 1080 L 1080 1920 L 0 1920 Z" fill={MUD} stroke={INK} strokeWidth={6} />
        <Debris y0={1130} seed="td" n={14} />
        {/* incoming water from the top (river side) creeping down the shore */}
        <path d={`M 0 880 L 1080 880 L 1080 ${WL + 30} Q 800 ${WL + 60 + Math.sin(f / 8) * 12} 540 ${WL + 20} Q 260 ${WL - 10 + Math.cos(f / 9) * 12} 0 ${WL + 40} Z`} fill={RIVER} opacity={0.92} />
        <path d={`M 1080 ${WL + 30} Q 800 ${WL + 60 + Math.sin(f / 8) * 12} 540 ${WL + 20} Q 260 ${WL - 10 + Math.cos(f / 9) * 12} 0 ${WL + 40}`} stroke="#E8F0EA" strokeWidth={10} fill="none" strokeLinecap="round" />
        <Figure {...fig} x={600} y={FEET} scale={FS} action="walk" facing="left" />
        <BareShins x={600} y={FEET} s={FS} />
        {/* stone river stairs on the left */}
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={0} y={1300 + k * 70} width={200 - k * 30} height={70} fill="#8A8478" stroke={INK} strokeWidth={5} />
        ))}
        {/* warm-to-dusk light */}
        <rect x={0} y={0} width={1080} height={1920} fill="#3B3F6E" opacity={interpolate(f, [0, dur], [0, 0.22], clamp)} />
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
