import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const POND = "#3E5A48";
const LEECH = "#33391F";
const STRIPE = "#C77A33";
const BLOOD = "#A3201B";

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

// A wriggling medicinal leech: olive body, rusty stripes. Length ~ 70*s.
export const Leech: React.FC<{ x: number; y: number; s?: number; rot?: number; f: number; fat?: number; ph?: number }> = ({ x, y, s = 1, rot = 0, f, fat = 1, ph = 0 }) => {
  const w = 1 + 0.14 * Math.sin(f / 4 + ph);
  const L = 36 * w;
  const T = 11 * fat / Math.sqrt(w);
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={L} ry={T} fill={LEECH} stroke={INK} strokeWidth={4} />
      <path d={`M ${-L * 0.8} ${-T * 0.3} Q 0 ${-T * 0.75} ${L * 0.8} ${-T * 0.3}`} fill="none" stroke={STRIPE} strokeWidth={3} />
      <path d={`M ${-L * 0.8} ${T * 0.3} Q 0 ${T * 0.75} ${L * 0.8} ${T * 0.3}`} fill="none" stroke={STRIPE} strokeWidth={3} opacity={0.7} />
      <circle cx={L * 0.95} cy={0} r={T * 0.75} fill={LEECH} stroke={INK} strokeWidth={3} />
    </g>
  );
};

const Reeds: React.FC<{ x: number; y: number; f: number; n?: number; h?: number }> = ({ x, y, f, n = 5, h = 260 }) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const xx = x + i * 26;
      const hh = h * (0.7 + random(`rd${x}${i}`) * 0.4);
      const sway = Math.sin(f / 18 + i) * 10;
      return (
        <g key={i}>
          <path d={`M ${xx} ${y} Q ${xx + sway / 2} ${y - hh / 2} ${xx + sway} ${y - hh}`} fill="none" stroke="#5E6B2E" strokeWidth={8} strokeLinecap="round" />
          {i % 2 === 0 ? <rect x={xx + sway - 9} y={y - hh - 10} width={18} height={56} rx={9} fill="#6B4A2E" stroke={INK} strokeWidth={4} /> : null}
        </g>
      );
    })}
  </>
);

const Ripples: React.FC<{ x: number; y: number; f: number; w?: number }> = ({ x, y, f, w = 120 }) => (
  <>
    {[0, 1, 2].map((k) => {
      const p = ((f / 45 + k / 3) % 1);
      return <ellipse key={k} cx={x} cy={y} rx={w * (0.6 + p)} ry={w * 0.16 * (0.6 + p)} fill="none" stroke="#9FC2AE" strokeWidth={5} opacity={(1 - p) * 0.8} />;
    })}
  </>
);

// attached-leech spots on the bare calves (figure-local coords, before scale)
const SPOTS: [number, number, number][] = [
  [-24, -112, 82], [24, -96, 98], [-25, -74, 72], [25, -128, 92], [-22, -132, 104], [24, -70, 80], [-26, -94, 96], [23, -112, 76],
];

const DEFAULT_FIG: FigureSpec = { hat: "bonnet", coat: "#7A4A5E", scarf: C.mustard, skirt: false, prop: "none", action: "idle" };

// visual: { mode: "pond" | "feed" | "jar", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, figure?, start?: number (leeches already on), every?: frames per new leech, bleed?: bool }
export const LeechCollector: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "pond";
  const fig: FigureSpec = { ...DEFAULT_FIG, ...(v.figure ?? {}) };
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "night" = "dawn";

  let body: React.ReactNode = null;
  if (mode === "pond") {
    const FX = 600;
    const FS = 1.9;
    const FEET = 1700;
    const WL = FEET - 40 * FS;
    const start: number = v.start ?? 2;
    const every: number = v.every ?? 12;
    const shown = Math.min(SPOTS.length, start + Math.floor(f / every));
    body = (
      <>
        <path d="M 0 1000 Q 200 930 420 990 Q 700 1060 1080 960 L 1080 1080 L 0 1080 Z" fill="#4A5A34" stroke={INK} strokeWidth={6} />
        <rect x={0} y={1060} width={1080} height={860} fill={POND} />
        {new Array(9).fill(0).map((_, k) => (
          <line key={k} x1={(k * 173 + f * 0.8) % 1200 - 100} y1={1110 + k * 52} x2={(k * 173 + f * 0.8) % 1200 + 40} y2={1110 + k * 52} stroke="#5E7E68" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        ))}
        <Reeds x={40} y={1120} f={f} n={6} h={300} />
        <Reeds x={880} y={1130} f={f + 30} n={6} h={280} />
        {/* the collector, skirts hitched, standing in the pond */}
        <Figure {...fig} x={FX} y={FEET} scale={FS} action="idle" />
        <g transform={`translate(${FX}, ${FEET}) scale(${FS})`}>
          <rect x={-40} y={-146} width={32} height={146} rx={14} fill={SKIN} stroke={INK} strokeWidth={5} />
          <rect x={8} y={-146} width={32} height={146} rx={14} fill={SKIN} stroke={INK} strokeWidth={5} />
          <rect x={-84} y={-156} width={168} height={22} rx={11} fill={C.cream} stroke={INK} strokeWidth={5} />
          {SPOTS.slice(0, shown).map(([lx, ly, r], i) => {
            const born = i < start ? -99 : (i - start + 1) * every;
            const pop = interpolate(f - born, [0, 8], [0.2, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
            return <Leech key={i} x={lx} y={ly} s={0.55 * pop} rot={r} f={f} ph={i * 1.7} />;
          })}
        </g>
        {/* front water hides her feet */}
        <rect x={0} y={WL} width={1080} height={1920 - WL} fill={POND} opacity={0.88} />
        <Ripples x={FX} y={WL} f={f} w={110} />
        {[0, 1, 2, 3].map((k) => {
          const side = k % 2 ? 1 : -1;
          const p = ((f / 70 + k * 0.27) % 1);
          return <Leech key={k} x={FX + side * (520 - p * 380)} y={WL + 90 + k * 60} s={0.9} rot={side > 0 ? 180 : 0} f={f} ph={k} />;
        })}
      </>
    );
  } else if (mode === "feed") {
    const bleedAt = v.bleed ? Math.max(20, dur * (v.bleedAt ?? 0.55)) : 1e9;
    const WL = 1470;
    const legSpots: [number, number, number][] = [[475, 880, 80], [600, 940, 100], [480, 1030, 95], [610, 1100, 78], [500, 1170, 88], [590, 1240, 102]];
    const fat = interpolate(f, [0, Math.min(bleedAt, dur)], [1, 1.9], clamp);
    body = (
      <>
        <rect x={0} y={1300} width={1080} height={620} fill={POND} />
        <Reeds x={60} y={1320} f={f} n={5} h={420} />
        <Reeds x={860} y={1330} f={f + 20} n={5} h={400} />
        {/* the calf, close up */}
        <path d="M 450 760 Q 400 940 430 1100 Q 450 1300 470 1600 L 650 1600 Q 680 1300 700 1100 Q 720 940 640 760 Z" fill={SKIN} stroke={INK} strokeWidth={8} />
        <rect x={380} y={720} width={330} height={70} rx={30} fill={C.cream} stroke={INK} strokeWidth={7} />
        {legSpots.map(([x, y, r], i) => {
          const t = f - bleedAt - i * 4;
          if (t < 0) return <Leech key={i} x={x} y={y} s={1.5} rot={r} f={f} fat={fat} ph={i * 1.3} />;
          const drip = Math.min(t * 7, 330);
          return (
            <g key={i}>
              <path d={`M ${x} ${y} q ${6} ${drip * 0.5} ${-4} ${drip}`} fill="none" stroke={BLOOD} strokeWidth={11} strokeLinecap="round" />
              <path d={`M ${x - 9} ${y - 7} L ${x} ${y} L ${x + 9} ${y - 7} M ${x} ${y} L ${x} ${y + 10}`} stroke={BLOOD} strokeWidth={5} fill="none" strokeLinecap="round" />
              <g opacity={interpolate(t, [10, 26], [1, 0], clamp)}>
                <Leech x={x + t * 2} y={y + t * t * 0.9} s={1.5} rot={r + t * 9} f={f} fat={fat} ph={i} />
              </g>
            </g>
          );
        })}
        <rect x={0} y={WL} width={1080} height={1920 - WL} fill={POND} opacity={0.9} />
        <Ripples x={560} y={WL} f={f} w={150} />
      </>
    );
  } else if (mode === "jar") {
    sky = "night";
    const T = 1500;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2E2630" />
        <rect x={0} y={T} width={1080} height={40} fill="#8C6239" stroke={INK} strokeWidth={7} />
        <rect x={0} y={T + 40} width={1080} height={440} fill="#4E3826" />
        {/* small jars */}
        {[110, 760].map((x, i) => (
          <g key={i}>
            <rect x={x - 50} y={T - 150} width={100} height={150} rx={18} fill="#9FC2AE" opacity={0.45} stroke={INK} strokeWidth={6} />
            <rect x={x - 56} y={T - 172} width={112} height={26} rx={8} fill="#6B4A2E" stroke={INK} strokeWidth={5} />
            <Leech x={x} y={T - 70} s={0.7} rot={20 + i * 30} f={f} ph={i} />
          </g>
        ))}
        {/* the big leech jar */}
        <rect x={250} y={1020} width={400} height={480} rx={50} fill="#9FC2AE" opacity={0.4} stroke={INK} strokeWidth={9} />
        {new Array(7).fill(0).map((_, k) => {
          const a = f / (28 + k * 3) + k;
          return <Leech key={k} x={450 + Math.cos(a) * (120 - k * 6)} y={1270 + Math.sin(a * 1.3) * 160} s={1.1} rot={(a * 57) % 360} f={f} ph={k} />;
        })}
        <rect x={250} y={1020} width={400} height={480} rx={50} fill="none" stroke={INK} strokeWidth={9} />
        <rect x={236} y={978} width={428} height={60} rx={14} fill="#6B4A2E" stroke={INK} strokeWidth={7} />
        <rect x={300} y={1150} width={300} height={90} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={450} y={1212} textAnchor="middle" fontFamily={typeFont} fontSize={56} fill={INK}>LEECHES</text>
        {/* the doctor */}
        <Figure hat="top" coat="#22252E" scarf={C.cream} x={880} y={T} scale={1.15} facing="left" action="idle" />
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
