import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;

// A storybook rat. Origin = between the feet, facing right. ~180 px long at s=1.
export const Rat: React.FC<{ x: number; y: number; s?: number; color?: string; patch?: string; flip?: boolean; t: number; ribbon?: string; rot?: number }> = ({ x, y, s = 1, color = "#7B6A58", patch, flip = false, t, ribbon, rot = 0 }) => {
  const wig = Math.sin(t / 3) * 10;
  const step = Math.sin(t / 1.6) * 7;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${flip ? -s : s}, ${s})`}>
      <path d={`M -40 -8 Q -78 ${4 + wig} -108 ${-14 - wig}`} fill="none" stroke="#C98C86" strokeWidth={7} strokeLinecap="round" />
      <line x1={-22} y1={-2} x2={-22 - step} y2={8} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <line x1={20} y1={-2} x2={20 + step} y2={8} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={-18} rx={44} ry={24} fill={color} stroke={INK} strokeWidth={5} />
      {patch ? <ellipse cx={-12} cy={-24} rx={22} ry={13} fill={patch} /> : null}
      <path d="M 28 -34 Q 74 -22 78 -12 Q 70 -2 30 -4 Z" fill={color} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={30} cy={-38} r={12} fill="#E7B3A8" stroke={INK} strokeWidth={4} />
      <circle cx={54} cy={-20} r={4} fill={INK} />
      <circle cx={78} cy={-12} r={5} fill="#E08A8A" stroke={INK} strokeWidth={2} />
      <line x1={70} y1={-12} x2={96} y2={-20} stroke={INK} strokeWidth={2} />
      <line x1={70} y1={-10} x2={96} y2={-4} stroke={INK} strokeWidth={2} />
      {ribbon ? (
        <g transform="translate(22, -14)">
          <path d="M 0 0 L -16 -12 L -16 12 Z" fill={ribbon} stroke={INK} strokeWidth={3} />
          <path d="M 0 0 L 16 -12 L 16 12 Z" fill={ribbon} stroke={INK} strokeWidth={3} />
          <circle r={5} fill={ribbon} stroke={INK} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
};

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 8 + i * Math.max(18, (dur - 16) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 120 - Math.min(age, 40) * 2, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const DEFAULT_FIG: FigureSpec = { hat: "top", coat: "#2F6B3A", scarf: C.brick, prop: "none", action: "idle" };

// visual: { mode: "street" | "pit" | "cage" | "bite", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], figure? }
export const RatCatcher: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "street";
  const fig: FigureSpec = v.figure ?? DEFAULT_FIG;
  const float: string[] = v.float ?? [];

  let body: React.ReactNode = null;
  if (mode === "street") {
    const ground = 1500;
    const FS = v.figScale ?? 1.45;
    const FX = 540;
    const FEET = ground + 40;
    body = (
      <>
        {/* brick wall + gas lamp glow */}
        <rect x={0} y={560} width={1080} height={ground - 560} fill="#4A2C24" />
        {new Array(16).fill(0).map((_, r) => new Array(9).fill(0).map((__, c) => (
          <rect key={`${r}-${c}`} x={c * 130 - (r % 2) * 65} y={560 + r * 58} width={124} height={52} fill="#6E3B2E" stroke="#2A1712" strokeWidth={4} opacity={0.9} />
        )))}
        <ellipse cx={180} cy={760} rx={230} ry={150} fill={C.mustard} opacity={0.14 + 0.03 * Math.sin(f / 7)} />
        <rect x={0} y={ground} width={1080} height={420} fill="#24201C" />
        {/* sewer grate */}
        <rect x={760} y={ground - 6} width={220} height={40} rx={8} fill="#111" stroke={INK} strokeWidth={6} />
        {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={790 + k * 40} y1={ground} x2={790 + k * 40} y2={ground + 30} stroke="#555" strokeWidth={6} />)}
        <Figure {...fig} x={FX} y={FEET} scale={FS} walking={false} />
        {/* rats climbing all over him (bigger in the hook so it reads at a glance) */}
        {[
          { dx: 95, h: 0.8, r: -18, c: "#7B6A58" },
          { dx: -100, h: 0.62, r: 25, c: "#8B7B69", flip: true },
          { dx: 10, h: 1.06, r: -6, c: "#6E5E4E" },
          { dx: 70, h: 0.42, r: -35, c: "#5E5044" },
          { dx: -70, h: 0.25, r: 50, c: "#7B6A58", flip: true },
        ].slice(0, v.climbers ?? 5).map((p, i) => (
          <Rat key={i} x={FX + p.dx + Math.sin(f / (7 + i) + i) * 10} y={FEET - p.h * 430 * FS + Math.cos(f / (6 + i)) * 8} s={v.climberScale ?? 0.95} t={f + i * 4} rot={p.r} flip={p.flip} color={p.c} />
        ))}
        {/* a terrier chasing rats along the street (hunt scene) */}
        {v.dog ? (
          <g transform={`translate(${((f * 14) % 1500) - 250}, ${ground + 150})`}>
            <ellipse cx={0} cy={-40} rx={80} ry={38} fill="#F4EAD5" stroke={INK} strokeWidth={6} />
            <ellipse cx={-22} cy={-52} rx={28} ry={17} fill="#8A5A3A" />
            <circle cx={80} cy={-72} r={34} fill="#F4EAD5" stroke={INK} strokeWidth={6} />
            <path d="M 70 -100 L 60 -132 L 88 -104 Z" fill="#8A5A3A" stroke={INK} strokeWidth={4} />
            <circle cx={94} cy={-78} r={5} fill={INK} />
            <circle cx={114} cy={-66} r={7} fill={INK} />
            {[-45, -18, 28, 52].map((lx, k) => <line key={k} x1={lx} y1={-12} x2={lx + Math.sin(f / 1.4 + k) * 14} y2={14} stroke={INK} strokeWidth={9} strokeLinecap="round" />)}
          </g>
        ) : null}
        {/* rats pouring out of the grate and across the street */}
        {new Array(8).fill(0).map((_, i) => {
          const sp = 10 + random(`sp${i}`) * 8;
          const x = ((f * sp * (v.dog ? 1.6 : 1) + i * 190) % 1400) - 160;
          return <Rat key={i} x={x} y={ground + 70 + (i % 4) * 75} s={0.75 + (i % 3) * 0.08} t={f + i * 5} color={i % 3 ? "#7B6A58" : "#5E5044"} />;
        })}
      </>
    );
  } else if (mode === "pit") {
    const cx = 540, cy = 1180;
    const dogA = f / 11;
    const dog = { x: cx + Math.cos(dogA) * 250, y: cy + Math.sin(dogA * 2) * 120 };
    body = (
      <>
        <rect x={0} y={560} width={1080} height={1360} fill="#2E2118" />
        {/* crowd leaning over the rail, waving coins */}
        {new Array(9).fill(0).map((_, i) => {
          const x = 70 + i * 118;
          const bob = Math.sin(f / 4 + i) * 8;
          return (
            <g key={i}>
              <path d={`M ${x - 55} 960 Q ${x} ${840 + bob} ${x + 55} 960 Z`} fill={["#3B5F7A", "#7E2E22", "#4A4E5E", "#2F6B3A"][i % 4]} stroke={INK} strokeWidth={5} />
              <circle cx={x} cy={800 + bob} r={40} fill="#E2B08A" stroke={INK} strokeWidth={5} />
              {i % 2 ? <rect x={x - 36} y={740 + bob} width={72} height={30} rx={6} fill={INK} /> : <rect x={x - 46} y={762 + bob} width={92} height={12} fill={INK} />}
              {i % 3 === 0 ? <circle cx={x + 60} cy={760 + bob - Math.abs(Math.sin(f / 3 + i)) * 40} r={16} fill={C.mustard} stroke={INK} strokeWidth={4} /> : null}
            </g>
          );
        })}
        {/* the pit */}
        <ellipse cx={cx} cy={cy} rx={470} ry={290} fill="#6B4A2E" stroke={INK} strokeWidth={10} />
        <ellipse cx={cx} cy={cy + 10} rx={420} ry={250} fill="#C9A46A" stroke={INK} strokeWidth={6} />
        {new Array(14).fill(0).map((_, i) => {
          const a = random(`a${i}`) * Math.PI * 2 + f / (14 + i);
          const r = 0.3 + random(`r${i}`) * 0.6;
          const x = cx + Math.cos(a) * 380 * r;
          const y = cy + 10 + Math.sin(a) * 210 * r;
          // scatter away from the dog
          const dx = x - dog.x, dy = y - dog.y, d = Math.hypot(dx, dy) || 1;
          const push = Math.max(0, 160 - d) * 0.6;
          return <Rat key={i} x={x + (dx / d) * push} y={y + (dy / d) * push} s={0.62} t={f + i * 3} flip={Math.cos(a) > 0} />;
        })}
        {/* terrier */}
        <g transform={`translate(${dog.x}, ${dog.y}) scale(${Math.cos(dogA) < 0 ? -1 : 1}, 1)`}>
          <ellipse cx={0} cy={-40} rx={70} ry={34} fill="#F4EAD5" stroke={INK} strokeWidth={6} />
          <ellipse cx={-20} cy={-50} rx={26} ry={16} fill="#8A5A3A" />
          <circle cx={70} cy={-70} r={30} fill="#F4EAD5" stroke={INK} strokeWidth={6} />
          <path d="M 60 -96 L 52 -124 L 76 -100 Z" fill="#8A5A3A" stroke={INK} strokeWidth={4} />
          <circle cx={82} cy={-74} r={4} fill={INK} />
          <circle cx={100} cy={-64} r={6} fill={INK} />
          {[-40, -15, 25, 45].map((lx, k) => <line key={k} x1={lx} y1={-14} x2={lx + Math.sin(f / 1.5 + k) * 10} y2={10} stroke={INK} strokeWidth={8} strokeLinecap="round" />)}
          <path d={`M -68 -50 Q -96 ${-80 + Math.sin(f / 2) * 14} -100 -90`} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        </g>
        <rect x={0} y={1470} width={1080} height={450} fill="#24201C" opacity={0.9} />
      </>
    );
  } else if (mode === "cage") {
    const RATS = [
      { c: "#E8D2B0", p: "#FFFFFF", r: C.brick },
      { c: "#F7F3EA", p: "#1B1712", r: C.mustard },
      { c: "#1F1A16", p: "#F7F3EA", r: C.teal },
      { c: "#F7F3EA", p: "#B5452F", r: "#C97B5A" },
      { c: "#D9B98C", p: undefined, r: C.brick },
    ];
    body = (
      <>
        <rect x={0} y={560} width={1080} height={1360} fill="#3A2A30" />
        <ellipse cx={540} cy={1000} rx={480} ry={300} fill={C.mustard} opacity={0.1} />
        <rect x={60} y={1400} width={960} height={80} rx={12} fill="#8C6239" stroke={INK} strokeWidth={8} />
        <rect x={150} y={780} width={780} height={620} rx={18} fill="#2A2026" stroke={INK} strokeWidth={10} />
        {RATS.map((r, i) => {
          const x = 260 + (i % 3) * 260 + (i > 2 ? 130 : 0);
          const y = i > 2 ? 1392 : 1176;
          const sniff = Math.sin(f / 5 + i * 1.7) * 6;
          return <Rat key={i} x={x + sniff} y={y} s={1.05} t={i % 2 ? f : 0} color={r.c} patch={r.p} ribbon={r.r} flip={i % 2 === 1} />;
        })}
        {i0shelf()}
        {new Array(14).fill(0).map((_, k) => <line key={k} x1={190 + k * 54} y1={790} x2={190 + k * 54} y2={1392} stroke="#B9A27A" strokeWidth={6} />)}
        <path d="M 150 790 Q 540 640 930 790" fill="none" stroke="#B9A27A" strokeWidth={10} />
        <circle cx={540} cy={690} r={22} fill="none" stroke="#B9A27A" strokeWidth={8} />
      </>
    );
  } else if (mode === "bite") {
    const swell = interpolate(f, [10, Math.max(30, dur - 10)], [1, 1.35], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const red = interpolate(f, [10, Math.max(30, dur - 10)], [0, 0.75], clamp);
    const throb = 1 + Math.max(0, Math.sin(f / 4)) * 0.03 * swell;
    body = (
      <>
        <rect x={0} y={560} width={1080} height={1360} fill="#2A1C22" />
        <g transform={`translate(540, 1420) scale(${swell * throb}, ${throb})`}>
          <rect x={-130} y={-760} width={260} height={820} rx={130} fill="#E8B990" stroke={INK} strokeWidth={10} />
          <rect x={-130} y={-760} width={260} height={820} rx={130} fill="#C0392B" opacity={red * 0.55} />
          <path d="M -80 -720 Q 0 -770 80 -720 L 80 -600 Q 0 -560 -80 -600 Z" fill="#F4E4D8" stroke={INK} strokeWidth={6} />
          <path d="M -90 -380 Q 0 -400 90 -380" fill="none" stroke={INK} strokeWidth={6} opacity={0.5} />
          <path d="M -90 -150 Q 0 -170 90 -150" fill="none" stroke={INK} strokeWidth={6} opacity={0.5} />
        </g>
        {/* the snapped-off tooth */}
        <g transform={`translate(${560 + (swell - 1) * 60}, ${980})`}>
          <path d="M -26 -70 L 26 -70 L 10 40 L -10 40 Z" fill="#F7E7A8" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M -30 -70 L 30 -70" stroke={C.brick} strokeWidth={10} />
        </g>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const a = (k / 6) * Math.PI * 2 + f / 20;
          const r = 200 + Math.sin(f / 5 + k) * 20;
          return <line key={k} x1={560 + Math.cos(a) * r} y1={960 + Math.sin(a) * r * 0.8} x2={560 + Math.cos(a) * (r + 60)} y2={960 + Math.sin(a) * (r + 60) * 0.8} stroke={C.brick} strokeWidth={10} strokeLinecap="round" opacity={0.3 + red * 0.6} />;
        })}
      </>
    );
  }

  return (
    <Backdrop sky="night" stars={false} moon={false} fog={false}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #1B1726 0%, #2A1E22 45%, #1E1712 100%)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};

function i0shelf() {
  return <rect x={170} y={1180} width={740} height={22} fill="#5A3B22" stroke={INK} strokeWidth={5} />;
}
