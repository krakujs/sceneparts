import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const COLS = 8;
const ROWS = 6;
const jack = (i: number) => ({ x: 172 + (i % COLS) * 105, y: 770 + Math.floor(i / COLS) * 96 });
const OPS = [300, 780]; // operators (seen from behind)
const CORD = [C.mustard, C.brick, C.teal, "#C97B5A", C.cream];

// target jack for a given cycle: lower three rows, on the active operator's half
const targetOf = (cyc: number) => {
  const side = cyc % 2;
  const row = 3 + Math.floor(random(`r${cyc}`) * 3);
  const col = side * 4 + Math.floor(random(`c${cyc}`) * 4);
  return row * COLS + col;
};
const originOf = (cyc: number) => ({ x: OPS[cyc % 2] + (cyc % 2 ? -70 : 70), y: 1392 });

const cordPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = Math.max(a.y, b.y) + 90;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y + 22}`;
};

const Plug: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x={-11} y={6} width={22} height={34} rx={5} fill={color} stroke={INK} strokeWidth={4} />
    <rect x={-6} y={-6} width={12} height={14} fill="#D8D2C2" stroke={INK} strokeWidth={3} />
  </g>
);

const Operator: React.FC<{ ox: number; coat: string; hair: string }> = ({ ox, coat, hair }) => (
  <g>
    <path d={`M ${ox - 170} 1920 C ${ox - 165} 1700 ${ox - 150} 1580 ${ox - 95} 1560 L ${ox + 95} 1560 C ${ox + 150} 1580 ${ox + 165} 1700 ${ox + 170} 1920 Z`} fill={coat} stroke={INK} strokeWidth={8} />
    <path d={`M ${ox - 52} 1556 Q ${ox} 1590 ${ox + 52} 1556 L ${ox + 40} 1538 L ${ox - 40} 1538 Z`} fill={C.cream} stroke={INK} strokeWidth={5} />
    <rect x={ox - 26} y={1500} width={52} height={50} fill="#D9A47E" stroke={INK} strokeWidth={6} />
    <circle cx={ox} cy={1450} r={66} fill={hair} stroke={INK} strokeWidth={8} />
    <circle cx={ox} cy={1478} r={30} fill={hair} stroke={INK} strokeWidth={6} />
    {/* headset band + earpieces */}
    <path d={`M ${ox - 70} 1462 Q ${ox} 1350 ${ox + 70} 1462`} fill="none" stroke={INK} strokeWidth={11} />
    <rect x={ox - 88} y={1440} width={24} height={44} rx={8} fill="#2C2F3B" stroke={INK} strokeWidth={5} />
    <rect x={ox + 64} y={1440} width={24} height={44} rx={8} fill="#2C2F3B" stroke={INK} strokeWidth={5} />
  </g>
);

// visual: { headline?, accent?, top?, size?, tag?, tagY?, float?: string[], period?: number, sign?: string }
export const Switchboard: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const P = v.period ?? 54;
  const c = f % P;
  const cyc = Math.floor(f / P);
  const tgt = targetOf(cyc);
  const tj = jack(tgt);
  const org = originOf(cyc);
  const reach = interpolate(c, [6, P * 0.5], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const back = interpolate(c, [P * 0.62, P * 0.9], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const plugged = c >= P * 0.5;
  const plugPos = { x: org.x + (tj.x - org.x) * reach, y: org.y + (tj.y - org.y) * reach - Math.sin(reach * Math.PI) * 60 };
  const rest = { x: OPS[cyc % 2] + (cyc % 2 ? -110 : 110), y: 1430 };
  const handFrom = plugged ? { x: tj.x, y: tj.y + 34 } : { x: plugPos.x, y: plugPos.y + 30 };
  const hand = plugged ? { x: handFrom.x + (rest.x - handFrom.x) * back, y: handFrom.y + (rest.y - handFrom.y) * back } : handFrom;
  const prev = [1, 2, 3, 4, 5].map((k) => cyc - k).filter((k) => k >= 0 || f < P * 6);
  const float: string[] = v.float ?? [];

  return (
    <Backdrop sky="night" stars={false} moon={false} fog={false}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #2A2233 0%, #3A2C24 40%, #2A1C12 100%)", opacity: 0.95 }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {/* wall lamps */}
        {[260, 820].map((lx, i) => (
          <g key={i}>
            <line x1={lx} y1={0} x2={lx} y2={540} stroke={INK} strokeWidth={5} />
            <path d={`M ${lx - 44} 580 Q ${lx} 526 ${lx + 44} 580 Z`} fill={C.mustard} stroke={INK} strokeWidth={6} />
            <ellipse cx={lx} cy={600} rx={130} ry={40} fill={C.mustard} opacity={0.1 + 0.03 * Math.sin(f / 9 + i)} />
          </g>
        ))}
        {/* the board */}
        <rect x={100} y={640} width={880} height={720} rx={18} fill="#6B4A2E" stroke={INK} strokeWidth={10} />
        <rect x={130} y={706} width={820} height={620} rx={8} fill="#24180F" stroke={INK} strokeWidth={6} />
        <text x={540} y={688} textAnchor="middle" fontSize={34} fontFamily={typeFont} fill={C.cream} opacity={0.9}>{v.sign ?? "CENTRAL EXCHANGE"}</text>
        {new Array(COLS * ROWS).fill(0).map((_, i) => {
          const { x, y } = jack(i);
          const isT = i === tgt && !plugged;
          const flick = random(`l${i}-${Math.floor(f / 18)}`) > 0.86;
          const lit = isT ? Math.floor(c / 4) % 2 === 0 || c < 4 : flick;
          return (
            <g key={i}>
              {lit ? <circle cx={x} cy={y - 34} r={24} fill={C.glow} opacity={0.35} /> : null}
              <circle cx={x} cy={y - 34} r={11} fill={lit ? C.glow : "#4A3A2A"} stroke={INK} strokeWidth={4} />
              <circle cx={x} cy={y + 8} r={17} fill="#B9A27A" stroke={INK} strokeWidth={5} />
              <circle cx={x} cy={y + 8} r={7} fill={INK} />
            </g>
          );
        })}
        {/* desk */}
        <rect x={50} y={1352} width={980} height={70} rx={10} fill="#8C6239" stroke={INK} strokeWidth={8} />
        {new Array(12).fill(0).map((_, i) => (
          <Plug key={i} x={150 + i * 70} y={1350} color={CORD[i % CORD.length]} />
        ))}
        {/* cords already connected (earlier calls) */}
        {prev.map((k) => {
          const kk = ((k % 1000) + 1000) % 1000;
          const j = jack(targetOf(kk));
          const o = originOf(kk);
          const col = CORD[kk % CORD.length];
          return (
            <g key={k}>
              <path d={cordPath(o, j)} fill="none" stroke={INK} strokeWidth={11} />
              <path d={cordPath(o, j)} fill="none" stroke={col} strokeWidth={6} />
              <Plug x={j.x} y={j.y} color={col} />
            </g>
          );
        })}
        {/* the cord being placed now */}
        <path d={cordPath(org, plugged ? tj : plugPos)} fill="none" stroke={INK} strokeWidth={11} />
        <path d={cordPath(org, plugged ? tj : plugPos)} fill="none" stroke={CORD[cyc % CORD.length]} strokeWidth={6} />
        <Plug x={plugged ? tj.x : plugPos.x} y={plugged ? tj.y : plugPos.y} color={CORD[cyc % CORD.length]} />
        {plugged && c < P * 0.5 + 8 ? (
          <g transform={`translate(${tj.x}, ${tj.y})`} opacity={1 - (c - P * 0.5) / 8}>
            {new Array(8).fill(0).map((_, k) => {
              const a = (k / 8) * Math.PI * 2;
              const r1 = 30 + (c - P * 0.5) * 5;
              return <line key={k} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * (r1 + 22)} y2={Math.sin(a) * (r1 + 22)} stroke={C.mustard} strokeWidth={6} strokeLinecap="round" />;
            })}
          </g>
        ) : null}
        {/* operators from behind; the active one reaches up */}
        {OPS.map((ox, i) => {
          const active = cyc % 2 === i;
          const sh = { x: ox + (i ? -100 : 100), y: 1590 };
          const h = active ? hand : { x: ox + (i ? -110 : 110), y: 1440 + Math.sin(f / 14 + i) * 4 };
          const coat = i ? "#3B5F7A" : C.brickDark;
          return (
            <g key={i}>
              <Operator ox={ox} coat={coat} hair={i ? "#2E1E14" : "#6A3E22"} />
              <line x1={sh.x} y1={sh.y} x2={h.x} y2={h.y} stroke={INK} strokeWidth={44} strokeLinecap="round" />
              <line x1={sh.x} y1={sh.y} x2={h.x} y2={h.y} stroke={coat} strokeWidth={32} strokeLinecap="round" />
              <circle cx={h.x} cy={h.y} r={22} fill="#E8B990" stroke={INK} strokeWidth={6} />
            </g>
          );
        })}
      </svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 240} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 600} /> : null}
      {float.map((t, i) => {
        const at = 12 + i * Math.max(24, (dur - 20) / Math.max(1, float.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: 1120 + (i % 2) * 120 - Math.min(age, 40) * 2, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </Backdrop>
  );
};
