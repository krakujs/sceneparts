import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SLUDGE = "#6B4A1E";
const SLUDGE_D = "#4E3412";
const STINK = "#9DBF4A";

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

// wavy green stink lines rising from (x, y)
const Stink: React.FC<{ x: number; y: number; f: number; n?: number; h?: number }> = ({ x, y, f, n = 3, h = 220 }) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const p = ((f / 40 + i / n) % 1);
      const yy = y - p * h;
      const xx = x + (i - (n - 1) / 2) * 60;
      const w = Math.sin(f / 6 + i) * 14;
      return (
        <path key={i} d={`M ${xx} ${yy} q ${18 + w} -30 0 -60 q ${-18 - w} -30 0 -60`} fill="none" stroke={STINK} strokeWidth={9} strokeLinecap="round" opacity={Math.sin(p * Math.PI) * 0.9} />
      );
    })}
  </>
);

const Flies: React.FC<{ x: number; y: number; f: number; n?: number; r?: number }> = ({ x, y, f, n = 5, r = 90 }) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const a = f / (5 + i) + i * 2;
      return <circle key={i} cx={x + Math.cos(a) * r * (0.5 + random(`fx${i}`) * 0.6)} cy={y + Math.sin(a * 1.7) * r * 0.5} r={6} fill={INK} />;
    })}
  </>
);

const Bucket: React.FC<{ x: number; y: number; s?: number; full?: boolean }> = ({ x, y, s = 1, full = true }) => (
  <g transform={`translate(${x}, ${y}) scale(${s})`}>
    <path d="M -42 -110 Q 0 -170 42 -110" fill="none" stroke={INK} strokeWidth={6} />
    <path d="M -46 -100 L 46 -100 L 36 0 L -36 0 Z" fill="#8C6239" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <line x1={-42} y1={-60} x2={42} y2={-60} stroke={INK} strokeWidth={5} />
    {full ? <ellipse cx={0} cy={-100} rx={42} ry={10} fill={SLUDGE} stroke={INK} strokeWidth={4} /> : null}
  </g>
);

const Barrel: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${s})`}>
    <path d="M -70 -200 Q -90 -100 -70 0 L 70 0 Q 90 -100 70 -200 Z" fill="#8C6239" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -80 -150 Q 0 -140 80 -150" fill="none" stroke={INK} strokeWidth={6} />
    <path d="M -80 -50 Q 0 -60 80 -50" fill="none" stroke={INK} strokeWidth={6} />
    <ellipse cx={0} cy={-200} rx={70} ry={16} fill={SLUDGE} stroke={INK} strokeWidth={6} />
  </g>
);

const DEFAULT_FIG: FigureSpec = { hat: "cap", coat: "#6B5A3A", scarf: C.brick, prop: "lantern", action: "idle" };

// visual: { mode: "street" | "pit" | "fall" | "privy", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, figure? }
export const GongFarmer: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "street";
  const fig: FigureSpec = v.figure ?? DEFAULT_FIG;
  const float: string[] = v.float ?? [];

  let body: React.ReactNode = null;
  if (mode === "street") {
    const ground = 1500;
    const FS = v.figScale ?? 1.4;
    const FX = 380 + Math.min(f, 90) * 0.6;
    const FEET = ground + 40;
    body = (
      <>
        <circle cx={880} cy={650} r={70} fill="#F4EAD5" opacity={0.9} />
        <circle cx={905} cy={635} r={62} fill="#1B1726" />
        <rect x={0} y={760} width={1080} height={ground - 760} fill="#3A2620" />
        {new Array(13).fill(0).map((_, r) => new Array(9).fill(0).map((__, c) => (
          <rect key={`${r}-${c}`} x={c * 130 - (r % 2) * 65} y={760 + r * 58} width={124} height={52} fill="#5A3328" stroke="#22130F" strokeWidth={4} opacity={0.85} />
        )))}
        {/* dark shuttered windows: everyone asleep */}
        {[160, 540, 920].map((x, i) => (
          <g key={i}>
            <rect x={x - 70} y={860} width={140} height={170} fill="#141019" stroke={INK} strokeWidth={8} />
            <line x1={x} y1={860} x2={x} y2={1030} stroke={INK} strokeWidth={6} />
          </g>
        ))}
        <ellipse cx={FX + 120} cy={FEET - 300} rx={260} ry={200} fill={C.mustard} opacity={0.12 + 0.04 * Math.sin(f / 5)} />
        <rect x={0} y={ground} width={1080} height={420} fill="#24201C" />
        {/* the cart with barrels */}
        <g transform={`translate(${830}, ${ground + 30})`}>
          <rect x={-200} y={-90} width={400} height={40} fill="#6B4A2E" stroke={INK} strokeWidth={7} />
          <circle cx={-120} cy={-20} r={60} fill="none" stroke={INK} strokeWidth={12} />
          <circle cx={120} cy={-20} r={60} fill="none" stroke={INK} strokeWidth={12} />
          <line x1={-120} y1={-80} x2={-120} y2={40} stroke={INK} strokeWidth={6} />
          <line x1={120} y1={-80} x2={120} y2={40} stroke={INK} strokeWidth={6} />
          <Barrel x={-90} y={-90} s={0.8} />
          <Barrel x={90} y={-90} s={0.8} />
          <Stink x={0} y={-270} f={f} n={3} h={240} />
          <Flies x={0} y={-330} f={f} n={6} r={120} />
        </g>
        <Figure {...fig} x={FX} y={FEET} scale={FS} walking={f < 90} action={f < 90 ? "walk" : fig.action} />
        <Bucket x={FX - 150} y={FEET - 120} s={1.1} />
        <Stink x={FX - 150} y={FEET - 260} f={f + 20} n={2} h={180} />
      </>
    );
  } else if (mode === "pit") {
    const top = 1050;
    const sl = 1390;
    const cycle = (f % 60) / 60;
    const by = interpolate(Math.sin(cycle * Math.PI * 2), [-1, 1], [sl + 40, top + 120]);
    body = (
      <>
        <rect x={0} y={top} width={1080} height={1020} fill="#2A1C14" />
        {/* brick-lined pit */}
        <rect x={160} y={top} width={720} height={760} fill="#1E140E" stroke={INK} strokeWidth={10} />
        {new Array(12).fill(0).map((_, r) => (
          <g key={r}>
            <rect x={120} y={top + r * 64} width={44} height={58} fill="#6E3B2E" stroke={INK} strokeWidth={3} />
            <rect x={876} y={top + r * 64} width={44} height={58} fill="#6E3B2E" stroke={INK} strokeWidth={3} />
          </g>
        ))}
        {/* beam + rope */}
        <rect x={120} y={top - 40} width={800} height={40} fill="#8C6239" stroke={INK} strokeWidth={7} />
        <line x1={620} y1={top - 20} x2={620} y2={by - 150} stroke="#C9A46A" strokeWidth={8} />
        <Bucket x={620} y={by} s={1.2} />
        {/* the boy, knee-deep */}
        <Figure hat="cap" coat="#5A6B7A" scarf={C.mustard} x={380} y={sl + 120} scale={0.85} action="idle" />
        <Bucket x={470} y={sl + 30} s={0.8} />
        <rect x={164} y={sl} width={712} height={400} fill={SLUDGE} />
        <path d={`M 164 ${sl} ${new Array(12).fill(0).map((_, k) => `Q ${200 + k * 60} ${sl + Math.sin(f / 6 + k) * 10} ${224 + k * 60} ${sl}`).join(" ")}`} fill={SLUDGE} stroke={SLUDGE_D} strokeWidth={6} />
        {/* gong farmer at the edge with his lantern */}
        <rect x={0} y={top - 10} width={120} height={20} fill="#3A2620" />
        <ellipse cx={930} cy={top - 220} rx={130} ry={110} fill={C.mustard} opacity={0.14 + 0.04 * Math.sin(f / 5)} />
        <Figure {...fig} facing="left" x={930} y={top - 40} scale={0.8} action="idle" />
        <Stink x={520} y={top + 100} f={f} n={3} h={200} />
        <Flies x={620} y={top + 60} f={f} n={5} r={100} />
      </>
    );
  } else if (mode === "fall") {
    const floorY = 1020;
    const sl = 1400;
    const breakAt = Math.max(12, dur * 0.35);
    const t = Math.max(0, f - breakAt);
    const crack = interpolate(t, [0, 10], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const fallY = floorY + Math.min(t * t * 0.9, 700);
    const splashT = Math.max(0, t - Math.sqrt((sl - floorY + 40) / 0.9));
    body = (
      <>
        <rect x={0} y={floorY} width={1080} height={900} fill="#1E140E" />
        <rect x={0} y={sl} width={1080} height={520} fill={SLUDGE} />
        <path d={`M 0 ${sl} ${new Array(18).fill(0).map((_, k) => `Q ${30 + k * 60} ${sl + Math.sin(f / 6 + k) * 12} ${60 + k * 60} ${sl}`).join(" ")}`} fill="none" stroke={SLUDGE_D} strokeWidth={6} />
        {/* the man: drawn before the sludge front so he sinks into it */}
        <g transform={`rotate(${crack * 25}, 540, ${fallY - 200})`}>
          <Figure hat="none" coat="#7A5A3A" scarf={C.brick} x={540} y={fallY} scale={1.1} action="idle" />
        </g>
        <rect x={0} y={sl + 8} width={1080} height={520} fill={SLUDGE} />
        {/* splash */}
        {splashT > 0 ? new Array(10).fill(0).map((_, k) => {
          const a = Math.PI + (k / 9) * Math.PI;
          const r = splashT * 14;
          return <circle key={k} cx={540 + Math.cos(a) * r} cy={sl + Math.sin(a) * r * 1.2 + splashT * splashT * 0.6} r={18} fill={SLUDGE} stroke={INK} strokeWidth={4} opacity={interpolate(splashT, [0, 25], [1, 0], clamp)} />;
        }) : null}
        {splashT > 0 ? <ellipse cx={540} cy={sl + 6} rx={60 + splashT * 9} ry={14 + splashT * 2} fill="none" stroke={SLUDGE_D} strokeWidth={6} opacity={interpolate(splashT, [0, 40], [1, 0], clamp)} /> : null}
        {/* rotten planks */}
        {new Array(7).fill(0).map((_, k) => {
          const x = 70 + k * 136;
          const mid = k === 3 || k === 2 || k === 4;
          const rot = mid ? crack * (k === 2 ? -70 : k === 4 ? 70 : 0) : 0;
          const drop = mid ? crack * (k === 3 ? 600 : 120) : 0;
          return (
            <g key={k} transform={`translate(0, ${drop}) rotate(${rot}, ${x + 64}, ${floorY})`}>
              <rect x={x} y={floorY - 40} width={128} height={40} fill={mid ? "#5E4A2E" : "#8C6239"} stroke={INK} strokeWidth={6} />
              {mid ? <path d={`M ${x + 20} ${floorY - 30} l 30 15 l 20 -12 l 30 18`} fill="none" stroke={INK} strokeWidth={4} /> : null}
            </g>
          );
        })}
        <Stink x={540} y={sl - 40} f={f} n={3} h={220} />
      </>
    );
  } else if (mode === "privy") {
    const levels = [910, 1150];
    const rise = interpolate(f, [5, Math.max(20, dur - 8)], [1730, 1450], { ...clamp, easing: Easing.inOut(Easing.quad) });
    body = (
      <>
        <rect x={0} y={600} width={1080} height={1320} fill="#2E2118" />
        {levels.map((ly, li) => (
          <g key={li}>
            {new Array(14).fill(0).map((_, k) => {
              const x = 70 + k * 72;
              const bob = Math.sin(f / 7 + k + li * 3) * 3;
              return (
                <g key={k}>
                  <rect x={x - 22} y={ly - 80 + bob} width={44} height={70} rx={12} fill={["#3B5F7A", "#7E2E22", "#4A4E5E", "#2F6B3A", "#8C6239"][(k + li * 2) % 5]} stroke={INK} strokeWidth={4} />
                  <circle cx={x} cy={ly - 100 + bob} r={20} fill="#E2B08A" stroke={INK} strokeWidth={4} />
                </g>
              );
            })}
            <rect x={20} y={ly - 14} width={1040} height={44} fill="#8C6239" stroke={INK} strokeWidth={7} />
          </g>
        ))}
        {/* brick chamber below, filling up */}
        <rect x={20} y={1200} width={1040} height={560} fill="#1E140E" stroke={INK} strokeWidth={8} />
        <Figure hat="cap" coat="#5A6B7A" scarf={C.mustard} x={860} y={1740} scale={0.62} action="idle" />
        <rect x={24} y={rise} width={1032} height={1760 - rise} fill={SLUDGE} opacity={0.97} />
        <path d={`M 24 ${rise} ${new Array(17).fill(0).map((_, k) => `Q ${54 + k * 60} ${rise + Math.sin(f / 6 + k) * 10} ${84 + k * 60} ${rise}`).join(" ")}`} fill="none" stroke={SLUDGE_D} strokeWidth={6} />
        <line x1={980} y1={1730} x2={980} y2={rise} stroke={C.mustard} strokeWidth={6} strokeDasharray="14 10" />
        <Stink x={300} y={1190} f={f} n={3} h={160} />
      </>
    );
  }

  return (
    <Backdrop sky="night" stars={false} moon={false} fog={false}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #171a2a 0%, #241d22 45%, #1E1712 100%)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
