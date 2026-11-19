import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep030 Pure finder – Victorian London dog-dung collector who sold "pure" to tanners.
// visual: { mode: "street" | "glove" | "sell" | "vat", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const POO = "#6B4423";
const POO_D = "#4E3019";
const SHAWL = "#7A4E6E";
const SKIRT = "#4F5B4A";
const COBBLE = "#9C9286";
const COBBLE_D = "#857B70";
const WICKER = "#B98A4E";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 120 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// cobbled street floor from y0 down
const Cobbles: React.FC<{ y0: number; seed: string }> = ({ y0, seed }) => (
  <>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={COBBLE} />
    {new Array(Math.ceil((1920 - y0) / 60)).fill(0).map((_, r) =>
      new Array(10).fill(0).map((__, k) => {
        const s = 0.6 + (r * 60) / 900;
        const w = 110 * s;
        const x = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 8;
        const y = y0 + r * 60 * s * 0.9;
        return <rect key={`${r}-${k}`} x={x} y={y} width={w - 10} height={50 * s} rx={16 * s} fill={(r + k) % 3 ? COBBLE_D : "#A79D90"} stroke={INK} strokeWidth={2.5} opacity={0.9} />;
      }),
    )}
  </>
);

// a dung pile with buzzing flies
const Pile: React.FC<{ x: number; y: number; s?: number; f: number; flies?: boolean; seed?: string }> = ({ x, y, s = 1, f, flies = true, seed = "p" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={46} ry={12} fill="#000" opacity={0.18} />
    <path d="M -40 0 Q -42 -22 -18 -24 Q -22 -44 2 -44 Q 0 -62 16 -60 Q 30 -44 22 -32 Q 44 -26 40 0 Z" fill={POO} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -14 -30 q 12 -6 22 0" stroke={POO_D} strokeWidth={4} fill="none" />
    {flies
      ? [0, 1, 2].map((k) => {
          const a = f / (5 + k) + k * 2.1 + random(`${seed}${k}`) * 6;
          return <circle key={k} cx={Math.cos(a) * (40 + k * 10)} cy={-70 + Math.sin(a * 1.7) * 22} r={5} fill={INK} />;
        })
      : null}
  </g>
);

// lidded wicker basket ("a handle basket, generally with a cover" – Mayhew)
const Basket: React.FC<{ x: number; y: number; s?: number; rot?: number; lid?: number }> = ({ x, y, s = 1, rot = 0, lid = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -60 Q 0 -170 70 -60" stroke="#8A6236" strokeWidth={12} fill="none" />
    <path d="M -80 -60 L 80 -60 L 64 40 Q 0 54 -64 40 Z" fill={WICKER} stroke={INK} strokeWidth={6} />
    {[-40, 0, 40].map((k) => (
      <path key={k} d={`M ${k} -56 L ${k * 0.8} 44`} stroke="#8A6236" strokeWidth={4} />
    ))}
    {[-30, -5, 20].map((k) => (
      <path key={k} d={`M -76 ${k} L 76 ${k}`} stroke="#8A6236" strokeWidth={4} />
    ))}
    <g transform={`rotate(${-lid} -84 -62)`}>
      <path d="M -88 -62 Q 0 -86 88 -62 L 88 -54 L -88 -54 Z" fill="#9C7442" stroke={INK} strokeWidth={6} />
    </g>
  </g>
);

// the stooped old pure finder (own drawing: bent back, shawl, bonnet). Origin = feet centre.
const Finder: React.FC<{ x: number; y: number; s?: number; f: number; reach: number; facing?: 1 | -1; basket?: boolean }> = ({ x, y, s = 1, f, reach, facing = 1, basket = true }) => {
  const sway = Math.sin(f / 14) * 2;
  const handX = 120 + reach * 40;
  const handY = -60 + (1 - reach) * -140;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={20} cy={4} rx={130} ry={18} fill="#000" opacity={0.18} />
      {/* boots */}
      <ellipse cx={-30} cy={-6} rx={30} ry={14} fill="#2B2420" stroke={INK} strokeWidth={4} />
      <ellipse cx={34} cy={-6} rx={30} ry={14} fill="#2B2420" stroke={INK} strokeWidth={4} />
      {/* skirt */}
      <path d="M -70 -10 Q -80 -120 -40 -190 L 60 -200 Q 100 -110 80 -10 Z" fill={SKIRT} stroke={INK} strokeWidth={6} />
      <path d="M -50 -60 Q 10 -50 70 -64" stroke="#3E4839" strokeWidth={6} fill="none" />
      {/* apron */}
      <path d="M 10 -190 L 74 -186 Q 84 -110 70 -40 L 20 -46 Z" fill="#D8CDB4" stroke={INK} strokeWidth={5} />
      {/* bent torso + shawl */}
      <g transform={`rotate(${sway} 0 -190)`}>
        <path d="M -50 -190 Q -60 -300 10 -330 Q 100 -350 150 -280 Q 150 -220 70 -190 Z" fill={SHAWL} stroke={INK} strokeWidth={6} />
        <path d="M -20 -300 Q 50 -250 120 -270" stroke="#5E3A55" strokeWidth={6} fill="none" />
        {/* reaching arm */}
        <path d={`M 110 -280 Q ${handX + 20} ${(-280 + handY) / 2 - 20} ${handX} ${handY}`} stroke={SHAWL} strokeWidth={36} fill="none" strokeLinecap="round" />
        <circle cx={handX} cy={handY + 6} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        {/* head + bonnet, tilted down */}
        <g transform="translate(170 -300) rotate(28)">
          <circle cx={0} cy={0} r={48} fill={SKIN} stroke={INK} strokeWidth={6} />
          <circle cx={22} cy={-2} r={5} fill={INK} />
          <path d="M 14 22 q 12 6 22 -2" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M 40 4 q 14 6 4 16" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M -58 10 Q -66 -66 6 -70 Q 60 -66 62 -20 L 40 -18 Q 30 -50 0 -50 Q -40 -46 -36 12 Z" fill="#3A3346" stroke={INK} strokeWidth={6} />
          <path d="M -40 14 L -30 60" stroke="#3A3346" strokeWidth={8} />
        </g>
        {/* basket on the back arm */}
        {basket ? <Basket x={-40} y={-170} s={0.8} rot={-8} /> : null}
      </g>
    </g>
  );
};

const Dog: React.FC<{ x: number; y: number; s?: number; f: number; facing?: 1 | -1 }> = ({ x, y, s = 1, f, facing = 1 }) => {
  const step = Math.sin(f / 3) * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      {[-50, -30, 30, 50].map((lx, i) => (
        <path key={lx} d={`M ${lx} -40 L ${lx + (i % 2 ? step : -step)} 0`} stroke="#8B6A47" strokeWidth={14} strokeLinecap="round" />
      ))}
      <ellipse cx={0} cy={-54} rx={70} ry={30} fill="#A9825A" stroke={INK} strokeWidth={5} />
      <path d={`M -66 -60 Q -100 ${-90 + step * 0.6} -96 -100`} stroke="#A9825A" strokeWidth={12} fill="none" strokeLinecap="round" />
      <circle cx={70} cy={-84} r={28} fill="#A9825A" stroke={INK} strokeWidth={5} />
      <path d="M 56 -108 L 50 -80 L 70 -100 Z" fill="#7A5A3A" stroke={INK} strokeWidth={4} />
      <circle cx={80} cy={-90} r={4} fill={INK} />
      <ellipse cx={98} cy={-80} rx={7} ry={5} fill={INK} />
    </g>
  );
};

const Coin: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={30} ry={30 * Math.abs(Math.cos((rot * Math.PI) / 90))} fill="#C9C4B8" stroke={INK} strokeWidth={4} />
  </g>
);

// house fronts behind the street
const Houses: React.FC<{ y: number }> = ({ y }) => (
  <>
    {[0, 1, 2, 3, 4].map((k) => (
      <g key={k}>
        <rect x={k * 230 - 30} y={y - 420 - (k % 2) * 60} width={220} height={420 + (k % 2) * 60} fill={k % 2 ? "#B98B6E" : "#A06A55"} stroke={INK} strokeWidth={5} />
        {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={k * 230 + c * 100} y={y - 360 - (k % 2) * 60 + r * 170} width={60} height={90} fill="#F2D9A0" stroke={INK} strokeWidth={4} />))}
      </g>
    ))}
    <rect x={0} y={y - 30} width={1080} height={30} fill="#7D7468" stroke={INK} strokeWidth={4} />
  </>
);

export const PureFinder: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "street";
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" = "dawn";
  let body: React.ReactNode = null;

  if (mode === "street") {
    // frame 0: she is already bent over a pile, hand going down; a dog trots past behind her
    const reach = 0.55 + 0.45 * Math.max(0, Math.sin(f / 9));
    const grab = Math.sin(f / 9) > 0.92;
    const dogX = interpolate(f, [0, dur], [1180, -200], clamp);
    body = (
      <>
        <Houses y={1060} />
        <Cobbles y0={1060} seed="st" />
        <Dog x={dogX} y={1180} s={0.9} f={f} facing={-1} />
        <Pile x={180} y={1300} s={0.9} f={f} seed="a" />
        <Pile x={900} y={1420} s={1.0} f={f + 20} seed="b" />
        <Finder x={430} y={1700} s={1.55} f={f} reach={reach} />
        <Pile x={430 + (120 + reach * 40) * 1.55 + 30} y={1690} s={1.6} f={f} seed="c" />
        {grab ? <path d="M 700 1520 l 20 -40 M 760 1510 l 30 -30 M 820 1530 l 40 -16" stroke={INK} strokeWidth={6} strokeLinecap="round" /> : null}
      </>
    );
  } else if (mode === "glove") {
    // close-up: one black leather glove peels off, a bare hand goes for the pile
    sky = "day";
    const off = interpolate(f, [8, 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const down = interpolate(f, [34, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const cross = interpolate(f, [26, 32], [0, 1], clamp);
    body = (
      <>
        <Cobbles y0={0} seed="gl" />
        <rect x={0} y={0} width={1080} height={1920} fill="#E9DCC0" opacity={0.25} />
        <Pile x={560} y={1500} s={3.2} f={f} seed="g" />
        {/* forearm + bare hand */}
        <g transform={`translate(${560} ${560 + down * 420})`}>
          <rect x={-70} y={-700} width={140} height={600} rx={40} fill={SHAWL} stroke={INK} strokeWidth={8} />
          <path d="M -80 -110 Q -90 40 -40 90 L 50 90 Q 100 40 80 -110 Z" fill={SKIN} stroke={INK} strokeWidth={8} />
          {[-46, -16, 14, 44].map((k) => (
            <rect key={k} x={k - 13} y={60} width={28} height={80} rx={14} fill={SKIN} stroke={INK} strokeWidth={6} />
          ))}
        </g>
        {/* the glove flying off */}
        <g transform={`translate(${560 + off * 330} ${600 - off * 260}) rotate(${off * 140})`} opacity={1 - Math.max(0, off - 0.9) * 2}>
          <path d="M -86 -120 Q -96 40 -44 96 L 54 96 Q 104 40 86 -120 Z" fill="#1D1A1E" stroke={INK} strokeWidth={8} />
          {[-46, -16, 14, 44].map((k) => (
            <rect key={k} x={k - 15} y={66} width={32} height={86} rx={15} fill="#1D1A1E" stroke={INK} strokeWidth={6} />
          ))}
          <path d="M -40 -60 q 40 -20 80 0" stroke="#55505A" strokeWidth={6} fill="none" />
        </g>
        {cross > 0 ? (
          <g transform={`translate(${890} ${340}) scale(${cross})`}>
            <circle r={90} fill={C.cream} stroke={C.brick} strokeWidth={14} />
            <path d="M -50 -50 L 50 50 M 50 -50 L -50 50" stroke={C.brick} strokeWidth={18} strokeLinecap="round" />
          </g>
        ) : null}
      </>
    );
  } else if (mode === "sell") {
    // tan-yard gate: basket handed over, coins drop into her palm
    sky = "day";
    const hand = interpolate(f, [4, 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    body = (
      <>
        <rect x={0} y={420} width={1080} height={760} fill="#8E6B4E" stroke={INK} strokeWidth={6} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={k * 180} y={420} width={180} height={760} fill={k % 2 ? "#836247" : "#8E6B4E"} stroke={INK} strokeWidth={4} />
        ))}
        <rect x={220} y={470} width={640} height={110} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={540} y={548} textAnchor="middle" fontFamily={typeFont} fontSize={70} fill={INK}>TAN-YARD</text>
        <Cobbles y0={1180} seed="se" />
        {/* tanner on the right, finder on the left */}
        <Figure hat="cap" coat="#5A4A3C" scarf={C.brick} x={820} y={1720} scale={1.45} action="idle" facing="left" />
        <Finder x={180} y={1720} s={1.15} f={f} reach={0.2} basket={false} />
        <Basket x={interpolate(hand, [0, 1], [330, 610])} y={1320 - Math.sin(hand * Math.PI) * 80} s={1.3} lid={hand > 0.95 ? 30 : 0} />
        {[0, 1, 2, 3].map((k) => {
          const t = f - 26 - k * 7;
          if (t < 0) return null;
          const p = interpolate(t, [0, 10], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          return <Coin key={k} x={420 + k * 8} y={1060 + p * 260 - k * 14 * p} s={1.1} rot={t * 24 * (1 - p)} />;
        })}
      </>
    );
  } else if (mode === "vat") {
    // a tanner works a stiff skin in a brown vat; it goes floppy-soft
    sky = "paper";
    const soft = interpolate(f, [0, dur * 0.8], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const knead = Math.sin(f / 5);
    const wave = (k: number) => Math.sin(f / 6 + k) * 40 * soft;
    body = (
      <>
        <rect x={0} y={1250} width={1080} height={670} fill="#7C6A55" />
        <Figure hat="cap" coat="#5A4A3C" scarf={C.mustard} x={540} y={1260} scale={1.5} action="idle" facing="right" />
        {/* the vat */}
        <ellipse cx={540} cy={1180} rx={430} ry={90} fill="#5A3C22" stroke={INK} strokeWidth={8} />
        <ellipse cx={540} cy={1180} rx={390} ry={70} fill={POO} />
        {[0, 1, 2, 3, 4].map((k) => {
          const p = ((f + k * 11) % 40) / 40;
          return <circle key={k} cx={260 + k * 130} cy={1180 - p * 30} r={6 + p * 14} fill="none" stroke="#8C6440" strokeWidth={5} opacity={1 - p} />;
        })}
        {/* stink lines */}
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${300 + k * 220} ${1100 - ((f * 2 + k * 30) % 90)} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="#7FA05A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
        ))}
        {/* the skin, lifted out of the vat by two hands */}
        <g transform={`translate(540 ${960 + knead * 14})`}>
          <path d={`M -260 0 Q -130 ${-40 + wave(0)} 0 ${wave(1)} Q 130 ${40 + wave(2)} 260 0 L ${260 - soft * 30} ${200 + wave(3) * 1.6} Q 0 ${200 + wave(4) * 2} ${-260 + soft * 30} ${200 + wave(5) * 1.6} Z`} fill="#E3C79A" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d={`M -180 70 q 60 ${-20 + wave(1) * 0.5} 120 0 M 40 110 q 60 ${10 + wave(2) * 0.5} 120 -10`} stroke="#C9A877" strokeWidth={6} fill="none" />
          <circle cx={-250} cy={10} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
          <circle cx={250} cy={10} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
        <Cobbles y0={1520} seed="va" />
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
