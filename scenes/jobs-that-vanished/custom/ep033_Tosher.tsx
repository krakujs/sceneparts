import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep033 Tosher – Victorian London sewer-hunters (Mayhew 1851): long greasy velveteen coat with huge pockets,
// dark lantern strapped on the right breast, a 7–8 ft pole with an iron hoe, gangs of 3–4.
// visual: { mode: "wade" | "coin" | "gang" | "danger" | "police" | "flush", headline?, accent?, top?, size?,
//           tag?, tagY?, float?: string[], floatTop?, rise? (danger: 0..1 tide) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const BRICK = "#A25A38";
const BRICK_D = "#7E4127";
const BRICK_L = "#C27449";
const MORTAR = "#5A3220";
const WATER = "#6E6A3A";
const WATER_D = "#4F4C28";
const COAT = "#6A5A36";
const COAT_D = "#4E4227";
const SKIN = "#E2B48C";
const GOLD = "#F2C14E";
const AMBER = "#FFD983";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(10, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 120 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 54, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// brick wall pattern filling a rect
const Bricks: React.FC<{ x0?: number; y0: number; y1: number; seed: string; bw?: number; bh?: number; base?: string }> = ({ x0 = 0, y0, y1, seed, bw = 120, bh = 52, base = BRICK }) => {
  const rows = Math.ceil((y1 - y0) / bh);
  return (
    <>
      <rect x={x0} y={y0} width={1080 - x0} height={y1 - y0} fill={MORTAR} />
      {new Array(rows).fill(0).map((_, r) =>
        new Array(Math.ceil(1080 / bw) + 2).fill(0).map((__, k) => {
          const x = x0 + k * bw - (r % 2) * bw * 0.5;
          const shade = random(`${seed}${r}-${k}`);
          return <rect key={`${r}-${k}`} x={x + 3} y={y0 + r * bh + 3} width={bw - 6} height={bh - 6} rx={4} fill={shade > 0.7 ? BRICK_L : shade < 0.25 ? BRICK_D : base} />;
        }),
      )}
    </>
  );
};

// receding brick arch tunnel, lit warm from a lantern at (lx, ly)
const Tunnel: React.FC<{ f: number; lx?: number; ly?: number; waterY?: number; dim?: number }> = ({ f, lx = 540, ly = 900, waterY = 1330, dim = 0 }) => {
  const rings = [0, 1, 2, 3, 4, 5];
  const flick = 0.92 + Math.sin(f / 3) * 0.04 + Math.sin(f / 7.3) * 0.04;
  return (
    <>
      <defs>
        <radialGradient id="ep033glow" cx={lx / 1080} cy={ly / 1920} r="0.62">
          <stop offset="0%" stopColor={AMBER} stopOpacity={0.55 * flick} />
          <stop offset="45%" stopColor="#F2A24E" stopOpacity={0.18 * flick} />
          <stop offset="100%" stopColor="#000" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="ep033vig" cx="0.5" cy="0.45" r="0.75">
          <stop offset="55%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.55 + dim * 0.3} />
        </radialGradient>
      </defs>
      <Bricks y0={0} y1={1920} seed="tw" />
      {rings.map((k) => {
        const s = Math.pow(0.66, k + 1);
        const w = 1240 * s;
        const cx = 540;
        const spring = 1180 - 520 * s;
        const crown = spring - w * 0.62;
        const base = 1180 + 160 * s;
        const x0 = cx - w / 2;
        const x1 = cx + w / 2;
        const d = `M ${x0} ${base} L ${x0} ${spring} Q ${x0} ${crown} ${cx} ${crown} Q ${x1} ${crown} ${x1} ${spring} L ${x1} ${base} Z`;
        const fill = k === rings.length - 1 ? "#140C08" : k % 2 ? BRICK_D : "#8C4B2E";
        return <path key={k} d={d} fill={fill} stroke={INK} strokeWidth={Math.max(2, 7 * s * 1.5)} opacity={1} />;
      })}
      {/* water */}
      <path d={`M 0 ${waterY} L 420 1200 L 660 1200 L 1080 ${waterY} L 1080 1920 L 0 1920 Z`} fill={WATER} />
      <path d={`M 0 ${waterY + 80} L 1080 ${waterY + 80} L 1080 1920 L 0 1920 Z`} fill={WATER_D} opacity={0.5} />
      {new Array(9).fill(0).map((_, i) => {
        const y = 1230 + i * 75 + ((f * 1.5) % 75);
        const half = 120 + (y - 1200) * 0.9;
        return <path key={i} d={`M ${540 - half} ${y} q 40 -10 80 0 t 80 0 M ${540 + half * 0.3} ${y + 20} q 40 -10 80 0`} stroke="#9C9660" strokeWidth={5} fill="none" opacity={0.6} strokeLinecap="round" />;
      })}
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep033glow)" style={{ mixBlendMode: "screen" }} />
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep033vig)" />
    </>
  );
};

// The tosher. Origin = where his body meets the water (waist), facing right.
// probe 0..1 swings the pole/hoe; lantern on the right breast with a beam.
export const TosherMan: React.FC<{ x: number; y: number; s?: number; f: number; probe?: number; facing?: 1 | -1; coat?: string; beam?: boolean; wade?: boolean; shut?: boolean }> = ({ x, y, s = 1, f, probe = 0.5, facing = 1, coat = COAT, beam = true, wade = true, shut = false }) => {
  const bob = wade ? Math.sin(f / 6) * 6 : 0;
  const handX = 120 + probe * 30;
  const handY = -190 + probe * 20;
  const ang = (-58 + probe * 22) * (Math.PI / 180);
  const back = 300;
  const fwd = 330;
  const bx = handX - Math.cos(ang) * back;
  const by = handY + Math.sin(ang) * back * -1;
  const tx = handX + Math.cos(ang) * fwd;
  const ty = handY - Math.sin(ang) * fwd;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s * facing} ${s})`}>
      {/* beam */}
      {beam && !shut ? <path d="M 60 -232 L 520 -380 L 520 -40 Z" fill={AMBER} opacity={0.16 + Math.sin(f / 3) * 0.03} /> : null}
      {/* back arm */}
      <path d="M -50 -300 Q -100 -210 -70 -130" stroke={COAT_D} strokeWidth={48} fill="none" strokeLinecap="round" />
      <circle cx={-70} cy={-126} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* coat */}
      <path d="M -78 -330 Q -112 -170 -128 10 L 128 10 Q 112 -170 78 -330 Z" fill={coat} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -320 L 0 10" stroke={COAT_D} strokeWidth={6} />
      {/* grease sheen */}
      <path d="M -60 -260 Q -78 -150 -92 -40" stroke="#FFFFFF" strokeWidth={7} fill="none" opacity={0.14} strokeLinecap="round" />
      {/* huge pockets */}
      <path d="M -112 -130 L -24 -130 L -26 -40 Q -70 -28 -116 -40 Z" fill={COAT_D} stroke={INK} strokeWidth={5} />
      <path d="M 24 -130 L 112 -130 L 116 -40 Q 70 -28 26 -40 Z" fill={COAT_D} stroke={INK} strokeWidth={5} />
      {/* strap + dark lantern on the right breast */}
      <path d="M -70 -320 L 70 -200" stroke="#3A2A1C" strokeWidth={12} />
      <g transform="translate(46 -238)">
        <rect x={-28} y={-40} width={56} height={74} rx={8} fill="#2E2C2A" stroke={INK} strokeWidth={5} />
        <path d="M -20 -40 Q 0 -66 20 -40" fill="#2E2C2A" stroke={INK} strokeWidth={5} />
        <circle cx={14} cy={-3} r={20} fill={shut ? "#3E3A34" : AMBER} stroke={INK} strokeWidth={5} />
        {!shut ? <circle cx={14} cy={-3} r={44} fill={AMBER} opacity={0.25 + Math.sin(f / 3) * 0.06} /> : null}
      </g>
      {/* pole with iron hoe */}
      <path d={`M ${bx} ${by} L ${tx} ${ty}`} stroke="#7A5634" strokeWidth={13} strokeLinecap="round" />
      <g transform={`translate(${tx} ${ty}) rotate(${(-ang * 180) / Math.PI + 90})`}>
        <path d="M -6 0 L -6 22 L -52 30 L -52 46 L 18 40 L 14 0 Z" fill="#4A4A4E" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      </g>
      {/* front arm */}
      <path d={`M 40 -305 Q ${handX - 20} ${(handY - 305) / 2 - 10} ${handX} ${handY}`} stroke={coat} strokeWidth={48} fill="none" strokeLinecap="round" />
      <circle cx={handX} cy={handY} r={24} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* neckerchief */}
      <path d="M -40 -336 Q 0 -310 40 -336 L 30 -350 Q 0 -340 -30 -350 Z" fill="#B5452F" stroke={INK} strokeWidth={5} />
      {/* head */}
      <circle cx={0} cy={-392} r={50} fill={SKIN} stroke={INK} strokeWidth={6} />
      <path d="M -26 -366 Q 6 -350 34 -372" stroke="#7A5A44" strokeWidth={10} fill="none" opacity={0.5} strokeLinecap="round" />
      <circle cx={22} cy={-398} r={6} fill={INK} />
      <path d="M 12 -416 L 32 -420" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M 44 -386 q 10 6 0 14" stroke={INK} strokeWidth={4} fill="none" />
      {/* slouch hat */}
      <path d="M -96 -424 Q 0 -452 104 -420 Q 0 -404 -96 -424 Z" fill="#3B3226" stroke={INK} strokeWidth={6} />
      <path d="M -52 -430 Q -50 -490 0 -494 Q 50 -490 54 -432 Z" fill="#3B3226" stroke={INK} strokeWidth={6} />
      {/* water ring around the waist */}
      {wade ? <ellipse cx={0} cy={8} rx={160} ry={22} fill="none" stroke="#B8B27A" strokeWidth={6} opacity={0.75} /> : null}
    </g>
  );
};

const Coin: React.FC<{ x: number; y: number; s?: number; glint?: number; edge?: boolean; rot?: number }> = ({ x, y, s = 1, glint = 0, edge = true, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {edge ? (
      <>
        <rect x={-14} y={-60} width={28} height={120} rx={12} fill="#C9962E" stroke={INK} strokeWidth={5} />
        <rect x={-6} y={-52} width={8} height={104} rx={4} fill="#FFE59A" opacity={0.8} />
      </>
    ) : (
      <>
        <circle r={58} fill={GOLD} stroke={INK} strokeWidth={6} />
        <circle r={42} fill="none" stroke="#C9962E" strokeWidth={5} />
      </>
    )}
    {glint > 0 ? (
      <g transform={`scale(${glint}) rotate(${glint * 45})`}>
        <path d="M 0 -90 L 12 -12 L 90 0 L 12 12 L 0 90 L -12 12 L -90 0 L -12 -12 Z" fill="#FFF7D6" />
      </g>
    ) : null}
  </g>
);

const Rat: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1 }> = ({ x, y, s = 1, f, facing = 1 }) => {
  const sniff = Math.sin(f / 3) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <path d={`M -150 -40 Q -320 ${-20 + Math.sin(f / 8) * 30} -360 ${-110 + Math.sin(f / 8) * 20}`} stroke="#C99A8A" strokeWidth={14} fill="none" strokeLinecap="round" />
      <ellipse cx={-20} cy={-90} rx={170} ry={100} fill="#6E655E" stroke={INK} strokeWidth={7} />
      <ellipse cx={160 + sniff} cy={-110} rx={80} ry={58} fill="#6E655E" stroke={INK} strokeWidth={7} />
      <circle cx={110} cy={-180} r={36} fill="#C99A8A" stroke={INK} strokeWidth={6} />
      <circle cx={190 + sniff} cy={-126} r={11} fill="#E8433A" />
      <circle cx={238 + sniff} cy={-104} r={10} fill="#E58A93" stroke={INK} strokeWidth={4} />
      <path d={`M 228 -100 l 60 -14 M 228 -96 l 62 6`} stroke={INK} strokeWidth={3} />
      <path d={`M 222 -84 l 6 14 l 6 -12`} fill="#FFF" stroke={INK} strokeWidth={3} />
    </g>
  );
};

const Toilet: React.FC<{ x: number; y: number; s?: number; f: number; flush?: number }> = ({ x, y, s = 1, f, flush = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-430} width={200} height={170} rx={16} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
    <rect x={120} y={-400} width={50} height={18} rx={8} fill="#B8C4CC" stroke={INK} strokeWidth={4} transform={`rotate(${flush > 0 && flush < 0.3 ? 20 : 0} 120 -391)`} />
    <rect x={-10} y={-260} width={50} height={90} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <path d="M -150 -170 L 190 -170 Q 180 -60 60 -40 L 50 0 L -30 0 L -40 -40 Q -150 -60 -150 -170 Z" fill="#FFFFFF" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={20} cy={-170} rx={170} ry={26} fill="#E6EEF2" stroke={INK} strokeWidth={6} />
    {flush > 0 ? <ellipse cx={20} cy={-170} rx={120 * (1 - flush * 0.6)} ry={16} fill="#8FC7E0" opacity={0.9} transform={`rotate(${f * 12} 20 -170)`} /> : null}
  </g>
);

export const Tosher: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "wade";
  const float: string[] = v.float ?? [];
  let sky: "dark" | "dawn" | "day" | "paper" = "dark";
  let body: React.ReactNode = null;
  const headline: string | undefined = v.headline;

  if (mode === "wade") {
    // frame 0: already waist-deep in the brick sewer, lantern on his chest, hoe probing; a coin glints
    const probe = 0.5 + Math.sin(f / 9) * 0.35;
    const gl = interpolate((f % 40) / 40, [0.4, 0.55, 0.7], [0, 1, 0], clamp);
    const x = interpolate(f, [0, dur], [260, 320], clamp);
    body = (
      <>
        <Tunnel f={f} lx={x + 80} ly={960} />
        <TosherMan x={x} y={1390} s={1.75} f={f} probe={probe} />
        <Coin x={x + 560} y={1475} s={0.6} glint={gl} edge={false} rot={-15} />
      </>
    );
  } else if (mode === "coin") {
    // close-up of the sewer floor under shallow water: coins standing on edge between the bricks, the hoe scrapes in
    const coins = [
      { x: 470, y: 1004, at: 4 },
      { x: 760, y: 1224, at: 14 },
      { x: 300, y: 1444, at: 24 },
    ];
    const hoeX = interpolate(f, [0, dur * 0.8], [1180, 560], { ...clamp, easing: Easing.out(Easing.cubic) });
    const hoeY = interpolate(f, [0, dur * 0.8], [700, 1000], { ...clamp, easing: Easing.out(Easing.cubic) });
    body = (
      <>
        <Bricks y0={0} y1={1920} seed="fl" bw={250} bh={110} />
        <rect x={0} y={0} width={1080} height={1920} fill={WATER} opacity={0.42} />
        {new Array(10).fill(0).map((_, i) => (
          <path key={i} d={`M ${(i * 137 + f * 3) % 1180 - 100} ${200 + i * 170} q 50 -14 100 0 t 100 0`} stroke="#D9D39A" strokeWidth={5} fill="none" opacity={0.45} />
        ))}
        {coins.map((c, i) => {
          const p = interpolate(f, [c.at, c.at + 6], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
          const gl = interpolate(f, [c.at + 2, c.at + 6, c.at + 12], [0, 1.2, 0], clamp);
          return <Coin key={i} x={c.x} y={c.y} s={1.2 * p} glint={gl} />;
        })}
        <g transform={`translate(${hoeX} ${hoeY}) rotate(-35)`}>
          <path d="M 0 0 L 0 -900" stroke="#7A5634" strokeWidth={30} strokeLinecap="round" />
          <path d="M -20 10 L -20 60 L -150 90 L -150 130 L 40 110 L 30 10 Z" fill="#4A4A4E" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        </g>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep033cv)" />
        <defs>
          <radialGradient id="ep033cv" cx="0.45" cy="0.6" r="0.7">
            <stop offset="0%" stopColor={AMBER} stopOpacity={0.25} />
            <stop offset="60%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.6} />
          </radialGradient>
        </defs>
      </>
    );
  } else if (mode === "gang") {
    // a gang of three wading in single file, lanterns bobbing, hoes probing the brickwork
    const drift = interpolate(f, [0, dur], [0, 60], clamp);
    body = (
      <>
        <Tunnel f={f} lx={640} ly={1000} />
        <TosherMan x={720 + drift * 0.4} y={1235} s={0.62} f={f + 20} probe={0.5 + Math.sin(f / 8 + 2) * 0.3} coat="#5E5A3A" />
        <TosherMan x={600 + drift * 0.7} y={1300} s={0.95} f={f + 10} probe={0.5 + Math.sin(f / 8 + 1) * 0.3} coat="#73603A" />
        <TosherMan x={250 + drift} y={1480} s={1.5} f={f} probe={0.5 + Math.sin(f / 8) * 0.3} />
      </>
    );
  } else if (mode === "danger") {
    // rats → foul gas → the tide roaring up the tunnel
    const rise = v.rise ?? 1;
    const ratX = interpolate(f, [0, dur * 0.3], [-420, 330], { ...clamp, easing: Easing.out(Easing.cubic) });
    const gas = interpolate(f, [dur * 0.3, dur * 0.5], [0, 1], clamp);
    const tide = interpolate(f, [dur * 0.62, dur], [0, rise], { ...clamp, easing: Easing.in(Easing.quad) });
    const tideTop = 1920 - tide * 1350;
    body = (
      <>
        <Tunnel f={f} lx={760} ly={950} dim={0.5} />
        {/* eyes in the dark */}
        {[0, 1, 2, 3, 4].map((k) => {
          const ex = 420 + random(`ex${k}`) * 240;
          const ey = 1060 + random(`ey${k}`) * 120;
          const blink = (f + k * 11) % 50 < 3 ? 0.1 : 1;
          return (
            <g key={k} opacity={interpolate(f, [k * 3, k * 3 + 6], [0, 1], clamp)}>
              <ellipse cx={ex} cy={ey} rx={9} ry={9 * blink} fill="#FF4A3A" />
              <ellipse cx={ex + 26} cy={ey} rx={9} ry={9 * blink} fill="#FF4A3A" />
            </g>
          );
        })}
        <TosherMan x={800} y={1420} s={1.25} f={f} probe={0.2} facing={-1} />
        <Rat x={ratX} y={1560} s={1.1} f={f} />
        {/* green gas */}
        {gas > 0
          ? new Array(7).fill(0).map((_, k) => (
              <circle key={k} cx={(random(`gx${k}`) * 1080 + f * (1 + k * 0.3)) % 1300 - 110} cy={600 + random(`gy${k}`) * 700} r={150 + random(`gr${k}`) * 120} fill="#9DCB5A" opacity={0.22 * gas} />
            ))
          : null}
        {/* the tide */}
        {tide > 0 ? (
          <>
            <rect x={0} y={tideTop} width={1080} height={1920 - tideTop} fill="#5D6A44" opacity={0.92} />
            <path d={`M 0 ${tideTop} ${new Array(12).fill(0).map((_, i) => `Q ${i * 90 + 45} ${tideTop - 30 - Math.sin(f / 2 + i) * 14} ${i * 90 + 90} ${tideTop}`).join(" ")}`} fill="none" stroke="#E8E4C0" strokeWidth={12} strokeLinecap="round" />
            {new Array(8).fill(0).map((_, i) => (
              <path key={i} d={`M ${((i * 160 + f * 30) % 1300) - 200} ${tideTop + 60 + i * 90} l 160 0`} stroke="#C9C69A" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
            ))}
          </>
        ) : null}
      </>
    );
  } else if (mode === "police") {
    // street above at dawn, a policeman with his lantern passes the grating; below, the tosher shutters his lantern and waits
    sky = "dawn";
    const copX = interpolate(f, [0, dur], [-80, 760], clamp);
    const rays = 0.25 + Math.sin(f / 5) * 0.05;
    body = (
      <>
        <rect x={0} y={760} width={1080} height={70} fill="#8C7F6E" stroke={INK} strokeWidth={6} />
        <rect x={60} y={360} width={18} height={400} fill="#2C2F3B" />
        <circle cx={69} cy={350} r={34} fill={AMBER} stroke={INK} strokeWidth={5} />
        <Figure hat="top" coat={C.navy} scarf="#1E2A47" prop="lantern" action="walk" x={copX} y={760} scale={1.05} facing="right" />
        <g transform="translate(0 830)">
          <Bricks y0={0} y1={1090} seed="pb" />
          <rect x={0} y={0} width={1080} height={1090} fill="#000" opacity={0.35} />
        </g>
        {/* grating */}
        <rect x={600} y={760} width={220} height={70} fill="#1A1A1E" stroke={INK} strokeWidth={6} />
        {[630, 670, 710, 750, 790].map((gx) => (
          <rect key={gx} x={gx - 6} y={766} width={12} height={58} fill="#5A5A60" />
        ))}
        <path d="M 610 830 L 470 1700 L 980 1700 L 810 830 Z" fill={AMBER} opacity={rays} />
        <TosherMan x={330} y={1640} s={1.15} f={f} probe={0.1} wade={false} shut beam={false} />
        <rect x={0} y={1640} width={1080} height={280} fill={WATER} />
      </>
    );
  } else if (mode === "flush") {
    // today: a modern bathroom upstairs, the pipe runs down into a Victorian brick sewer that still carries it away
    sky = "day";
    const flush = interpolate(f, [6, dur * 0.7], [0, 1], clamp);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={880} fill="#DCEBF0" />
        {new Array(9).fill(0).map((_, r) =>
          new Array(8).fill(0).map((__, k) => <rect key={`${r}-${k}`} x={k * 140 + 4} y={300 + r * 64 + 4} width={132} height={56} fill="#C6DDE6" />),
        )}
        <rect x={0} y={860} width={1080} height={40} fill="#9A8C7C" stroke={INK} strokeWidth={6} />
        <Toilet x={430} y={860} s={1.1} f={f} flush={flush} />
        {/* earth layers */}
        <rect x={0} y={900} width={1080} height={1020} fill="#8A6A4A" />
        <rect x={0} y={1080} width={1080} height={840} fill="#76583C" />
        {/* pipe */}
        <rect x={432} y={900} width={70} height={500} fill="#9AA4AA" stroke={INK} strokeWidth={6} />
        {flush > 0
          ? new Array(6).fill(0).map((_, i) => {
              const py = 910 + ((f * 18 + i * 85) % 490);
              return <circle key={i} cx={467} cy={py} r={18} fill="#8FC7E0" opacity={0.9} />;
            })
          : null}
        {/* Victorian egg-shaped brick sewer */}
        <g transform="translate(540 1590)">
          <ellipse cx={0} cy={0} rx={430} ry={260} fill={BRICK} stroke={INK} strokeWidth={10} />
          <ellipse cx={0} cy={0} rx={370} ry={205} fill="#2A1A12" stroke={BRICK_D} strokeWidth={14} strokeDasharray="40 10" />
          <path d="M -330 90 Q 0 140 330 90 L 300 150 Q 0 205 -300 150 Z" fill="#6E8A9A" />
          {new Array(5).fill(0).map((_, i) => (
            <path key={i} d={`M ${((i * 150 + f * 10) % 700) - 350} ${115 + (i % 2) * 20} l 70 0`} stroke="#CFE3EA" strokeWidth={6} strokeLinecap="round" />
          ))}
        </g>
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
