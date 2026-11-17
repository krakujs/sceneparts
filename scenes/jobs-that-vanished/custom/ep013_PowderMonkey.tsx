import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep013 Powder Monkey – a boy sprints gunpowder along a warship's gun deck.
// visual: { mode: "deck" | "magazine", view?: "upper" | "lower" (deck), speed?, headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, figure?, fireAt?: number[] (frames) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const WOOD = "#9A6A3E";
const WOOD_D = "#6E4A2A";
const WOOD_L = "#C08D58";
const IRON = "#2E2F36";
const IRON_L = "#4B4D57";
const SEA = "#3F7F95";
const LEATHER = "#5B3A22";
const COPPER = "#B8733F";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 150 }), top: top + i * 120 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 50, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// leather powder case (cylindrical box with a lid) – what the boys carried
const PowderCase: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-38} y={-60} width={76} height={120} rx={12} fill={LEATHER} stroke={INK} strokeWidth={6} />
    <rect x={-44} y={-74} width={88} height={30} rx={10} fill="#46291A" stroke={INK} strokeWidth={6} />
    <rect x={-38} y={-10} width={76} height={12} fill="#46291A" />
    <path d="M -20 -40 L -20 40" stroke="#7A5236" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
  </g>
);

// one cannon seen from behind (inboard), barrel poking through a gunport
const Gun: React.FC<{ x: number; y: number; age: number; s?: number }> = ({ x, y, age, s = 1 }) => {
  const recoil = age >= 0 ? interpolate(age, [0, 3, 18], [0, 1, 0], clamp) : 0;
  return (
    <g transform={`translate(${x} ${y + recoil * 26}) scale(${s * (1 + recoil * 0.06)})`}>
      {/* carriage */}
      <path d="M -150 40 L 150 40 L 128 -70 L -128 -70 Z" fill={WOOD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -150 40 L 150 40 L 150 70 L -150 70 Z" fill={WOOD_D} stroke={INK} strokeWidth={7} />
      {[-110, 110].map((wx) => (
        <circle key={wx} cx={wx} cy={74} r={30} fill={WOOD_D} stroke={INK} strokeWidth={7} />
      ))}
      {/* breech + cascabel knob */}
      <circle cx={0} cy={-110} r={82} fill={IRON} stroke={INK} strokeWidth={8} />
      <circle cx={0} cy={-110} r={56} fill={IRON_L} />
      <circle cx={0} cy={-110} r={22} fill={IRON} stroke={INK} strokeWidth={5} />
      {/* breeching rope */}
      <path d="M -200 -60 Q 0 30 200 -60" stroke="#C9A46B" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M -200 -60 Q 0 30 200 -60" stroke={INK} strokeWidth={3} fill="none" strokeDasharray="10 14" opacity={0.6} />
    </g>
  );
};

const Smoke: React.FC<{ x: number; y: number; age: number; seed: string }> = ({ x, y, age, seed }) => {
  if (age < 0 || age > 60) return null;
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = age - k * 2;
        if (a < 0) return null;
        const p = a / 60;
        const r = 50 + p * 170 + random(`${seed}r${k}`) * 40;
        const dx = (random(`${seed}x${k}`) - 0.5) * 260 * Math.sqrt(p);
        const dy = -p * 260 - k * 18;
        return <circle key={k} cx={x + dx} cy={y + dy} r={r} fill="#EDE6DA" opacity={(1 - p) * 0.75} stroke={INK} strokeWidth={4} strokeOpacity={(1 - p) * 0.4} />;
      })}
    </>
  );
};

const DEFAULT_FIG: FigureSpec = { hat: "cap", coat: "#2F4C7A", scarf: "#E9E0C8", skirt: false, prop: "none", action: "walk" };

export const PowderMonkey: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "deck";
  const fig: FigureSpec = { ...DEFAULT_FIG, ...(v.figure ?? {}) };
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" | "dark" = "dawn";
  let body: React.ReactNode = null;
  let shake = 0;
  let flash = 0;

  if (mode === "deck") {
    const lower = v.view === "lower";
    sky = lower ? "paper" : "dawn";
    const speed: number = v.speed ?? 10;
    const scroll = f * speed;
    const GAP = 420;
    const WALL_TOP = lower ? 640 : 760;
    const PORT_Y = lower ? 820 : 900;
    const DECK_Y = 1260;
    const FIRE_X = v.fireX ?? 720; // a gun fires as it passes this screen x
    const guns = new Array(8).fill(0).map((_, i) => {
      const wx = 300 + i * GAP - (v.offset ?? 0);
      const sx = wx - scroll;
      const fireT = (wx - FIRE_X) / speed;
      return { sx, age: f - fireT, i };
    });
    // shake + flash from the most recent shot
    for (const g of guns) {
      if (g.age >= 0 && g.age < 8) {
        shake = Math.max(shake, (1 - g.age / 8) * 16);
        flash = Math.max(flash, (1 - g.age / 5) * 0.55);
      }
    }
    const FEET = 1720;
    const FS: number = v.figScale ?? 1.75;
    const FX: number = v.figX ?? 430;
    const run = f * 1.6; // faster gait
    body = (
      <>
        {/* sky / rigging (upper deck) or beams (lower deck) */}
        {lower ? (
          <>
            <rect x={0} y={0} width={1080} height={WALL_TOP} fill="#4A3424" />
            {new Array(7).fill(0).map((_, k) => {
              const bx = ((k * 220 - scroll * 0.9) % 1540 + 1540) % 1540 - 230;
              return <rect key={k} x={bx} y={0} width={70} height={WALL_TOP} fill="#3A281B" stroke={INK} strokeWidth={5} />;
            })}
            {/* hanging lantern glow */}
            {[0, 1, 2].map((k) => {
              const lx = ((k * 520 + 260 - scroll * 0.9) % 1560 + 1560) % 1560 - 240;
              const sw = Math.sin(f / 9 + k) * 8;
              return (
                <g key={k} transform={`rotate(${sw} ${lx} 0)`}>
                  <line x1={lx} y1={0} x2={lx} y2={300} stroke={INK} strokeWidth={5} />
                  <circle cx={lx} cy={350} r={110} fill={C.glow} opacity={0.25} />
                  <rect x={lx - 30} y={300} width={60} height={80} rx={10} fill={C.glow} stroke={INK} strokeWidth={6} />
                </g>
              );
            })}
          </>
        ) : (
          <>
            {new Array(5).fill(0).map((_, k) => {
              const rx = ((k * 300 - scroll * 0.35) % 1500 + 1500) % 1500 - 200;
              return <path key={k} d={`M ${rx} ${WALL_TOP} L ${rx + 260} 0`} stroke="#5C4632" strokeWidth={8} opacity={0.7} />;
            })}
            <path d={`M 0 ${WALL_TOP - 120} Q 540 ${WALL_TOP - 170} 1080 ${WALL_TOP - 120}`} stroke="#5C4632" strokeWidth={6} fill="none" opacity={0.6} />
          </>
        )}
        {/* ship's side (bulwark) with gunports showing the sea */}
        <rect x={0} y={WALL_TOP} width={1080} height={DECK_Y - WALL_TOP} fill={WOOD} stroke={INK} strokeWidth={8} />
        {new Array(6).fill(0).map((_, k) => (
          <line key={k} x1={0} y1={WALL_TOP + 70 + k * 85} x2={1080} y2={WALL_TOP + 70 + k * 85} stroke={WOOD_D} strokeWidth={5} opacity={0.6} />
        ))}
        {guns.map((g) => (
          <g key={`p${g.i}`}>
            <rect x={g.sx - 120} y={PORT_Y - 120} width={240} height={200} fill={SEA} stroke={INK} strokeWidth={8} />
            <rect x={g.sx - 120} y={PORT_Y - 120} width={240} height={90} fill="#F3C98E" />
            <line x1={g.sx - 120} y1={PORT_Y - 30} x2={g.sx + 120} y2={PORT_Y - 30} stroke="#2C5E70" strokeWidth={6} />
            {/* muzzle flash in the port */}
            {g.age >= 0 && g.age < 7 ? (
              <g>
                <circle cx={g.sx} cy={PORT_Y - 20} r={150 - g.age * 12} fill={C.glow} opacity={1 - g.age / 7} />
                <path d={`M ${g.sx} ${PORT_Y - 210} L ${g.sx + 40} ${PORT_Y - 60} L ${g.sx + 190} ${PORT_Y - 40} L ${g.sx + 50} ${PORT_Y + 10} L ${g.sx + 80} ${PORT_Y + 150} L ${g.sx} ${PORT_Y + 40} L ${g.sx - 80} ${PORT_Y + 150} L ${g.sx - 50} ${PORT_Y + 10} L ${g.sx - 190} ${PORT_Y - 40} L ${g.sx - 40} ${PORT_Y - 60} Z`} fill={C.mustard} stroke={INK} strokeWidth={6} opacity={1 - g.age / 7} />
              </g>
            ) : null}
          </g>
        ))}
        {/* deck planks */}
        <rect x={0} y={DECK_Y} width={1080} height={1920 - DECK_Y} fill={WOOD_L} stroke={INK} strokeWidth={8} />
        {new Array(9).fill(0).map((_, k) => (
          <line key={k} x1={0} y1={DECK_Y + 40 + k * k * 9} x2={1080} y2={DECK_Y + 40 + k * k * 9} stroke={WOOD} strokeWidth={5} />
        ))}
        {new Array(12).fill(0).map((_, k) => {
          const px = ((k * 140 - scroll) % 1680 + 1680) % 1680 - 300;
          return <line key={k} x1={px} y1={DECK_Y + 40} x2={px - 60} y2={1920} stroke={WOOD} strokeWidth={4} opacity={0.6} />;
        })}
        {guns.map((g) => (
          <Gun key={`g${g.i}`} x={g.sx} y={PORT_Y + 300} age={g.age} />
        ))}
        {guns.map((g) => (
          <Smoke key={`s${g.i}`} x={g.sx} y={PORT_Y + 60} age={g.age} seed={`s${g.i}`} />
        ))}
        {/* the boy, sprinting with a powder case */}
        <g>
          <Figure {...fig} x={FX} y={FEET} scale={FS} facing="right" walking frameOffset={Math.round(run - f)} />
          <PowderCase x={FX + 62 * FS} y={FEET - 250 * FS + Math.abs(Math.sin(run / 5)) * -10} s={FS * 0.95} rot={8} />
          <circle cx={FX + 30 * FS} cy={FEET - 215 * FS + Math.abs(Math.sin(run / 5)) * -10} r={17 * FS} fill="#E8B990" stroke={INK} strokeWidth={5} />
          {/* speed lines */}
          {[0, 1, 2].map((k) => {
            const p = ((f * 2 + k * 9) % 24) / 24;
            return <line key={k} x1={FX - 120 * FS - p * 160} y1={FEET - (140 + k * 90) * FS} x2={FX - 60 * FS - p * 160} y2={FEET - (140 + k * 90) * FS} stroke={INK} strokeWidth={7} strokeLinecap="round" opacity={1 - p} />;
          })}
        </g>
      </>
    );
  } else if (mode === "magazine") {
    // copper-lined powder room below the waterline; lantern light only through a window; a stray spark drifts down
    sky = "dark";
    const spark = interpolate(f, [0, dur * 0.85], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
    const sx = 760 - spark * 330 + Math.sin(f / 5) * 26;
    const sy = 520 + spark * 760;
    const pulse = 0.6 + 0.4 * Math.sin(f / 2.5);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2A1C14" />
        {/* copper wall tiles */}
        {new Array(10).fill(0).map((_, r) =>
          new Array(6).fill(0).map((__, c) => (
            <rect key={`${r}-${c}`} x={c * 190 - (r % 2) * 95} y={r * 140} width={186} height={136} fill={COPPER} opacity={0.18 + 0.06 * ((r + c) % 3)} />
          )),
        )}
        {/* the light-room window with the lantern behind glass */}
        <rect x={700} y={330} width={280} height={260} fill="#FFDFA0" stroke={INK} strokeWidth={10} />
        <circle cx={840} cy={460} r={120} fill={C.glow} opacity={0.65 + 0.15 * Math.sin(f / 7)} />
        <rect x={810} y={410} width={60} height={90} rx={10} fill={C.mustard} stroke={INK} strokeWidth={6} />
        <line x1={840} y1={330} x2={840} y2={590} stroke={INK} strokeWidth={8} />
        <line x1={700} y1={460} x2={980} y2={460} stroke={INK} strokeWidth={8} />
        <path d="M 700 590 L 380 1920 L 1080 1920 L 980 590 Z" fill={C.glow} opacity={0.08} />
        {/* powder barrels */}
        {[[200, 1450, 1.3], [470, 1520, 1.45], [760, 1460, 1.3], [330, 1240, 1.0], [620, 1250, 1.0]].map(([bx, by, s], k) => (
          <g key={k} transform={`translate(${bx} ${by}) scale(${s})`}>
            <path d="M -110 -150 Q -135 0 -110 150 L 110 150 Q 135 0 110 -150 Z" fill="#7A5232" stroke={INK} strokeWidth={8} />
            {[-110, -40, 40, 110].map((hy) => (
              <path key={hy} d={`M -122 ${hy} Q 0 ${hy + 12} 122 ${hy}`} stroke="#3B3B42" strokeWidth={12} fill="none" />
            ))}
            {k === 1 ? <text x={0} y={18} textAnchor="middle" fontFamily={typeFont} fontSize={46} fill={C.cream}>POWDER</text> : null}
          </g>
        ))}
        {/* the spark */}
        <circle cx={sx} cy={sy} r={70 * pulse} fill={C.glow} opacity={0.35} />
        <path d={`M ${sx} ${sy - 30} l 8 22 l 22 8 l -22 8 l -8 22 l -8 -22 l -22 -8 l 22 -8 Z`} fill="#FFF3C4" stroke={C.mustard} strokeWidth={3} />
        {[1, 2, 3].map((k) => (
          <circle key={k} cx={sx + Math.sin((f - k * 3) / 5) * 26 + k * 10} cy={sy - k * 22} r={6 - k} fill={C.mustard} opacity={0.7 - k * 0.18} />
        ))}
        {/* vignette deepens as it falls */}
        <rect x={0} y={0} width={1080} height={1920} fill="#000" opacity={interpolate(f, [0, dur], [0.05, 0.3], clamp)} />
      </>
    );
  }

  const sx = shake ? (random(`sx${f}`) - 0.5) * shake * 2 : 0;
  const sy = shake ? (random(`sy${f}`) - 0.5) * shake * 2 : 0;
  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute", translate: `${sx}px ${sy}px` }}>{body}</svg>
      {flash > 0 ? <div style={{ position: "absolute", inset: 0, background: "#FFF6DA", opacity: flash }} /> : null}
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
