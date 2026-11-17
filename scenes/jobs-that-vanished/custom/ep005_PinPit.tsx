import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const FAR = 1010; // y of the pin deck (far end of the lane)
const NEAR = 1920;
// lane edges: x at depth t (0 = pin deck, 1 = bottom of frame)
const laneL = (t: number) => 380 - 300 * t;
const laneR = (t: number) => 700 + 300 * t;
const yAt = (t: number) => FAR + (NEAR - FAR) * t;

// 10 pins: [col offset, row] – row 0 = head pin (nearest), row 3 = back row
const PINS: [number, number][] = [
  [0, 0], [-0.5, 1], [0.5, 1], [-1, 2], [0, 2], [1, 2], [-1.5, 3], [-0.5, 3], [0.5, 3], [1.5, 3],
];

const Pin: React.FC<{ x: number; y: number; s: number; rot?: number; o?: number }> = ({ x, y, s, rot = 0, o = 1 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 -80 C -11 -80 -12 -66 -8 -56 C -5 -49 -17 -34 -16 -16 C -15 -4 -9 0 0 0 C 9 0 15 -4 16 -16 C 17 -34 5 -49 8 -56 C 12 -66 11 -80 0 -80 Z" fill="#FBF7EE" stroke={INK} strokeWidth={4} />
    <path d="M -8 -54 L 8 -54 M -9 -48 L 9 -48" stroke={C.brick} strokeWidth={4} />
  </g>
);

// visual: { headline?, accent?, top?, size?, tag?, tagY?, figure?, float?: string[], period?: number }
export const PinPit: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const fig: FigureSpec = v.figure ?? { hat: "cap", coat: "#7A3B2E", scarf: C.mustard, prop: "none", action: "idle" };
  const P = v.period ?? 96; // one throw → strike → reset cycle
  const c = f % P;
  const cycle = Math.floor(f / P);
  const HIT = Math.round(P * 0.34);
  // ball rolls from the bottom to the pins (perspective: slows as it gets far)
  const bt = interpolate(c, [0, HIT], [1, 0.02], { ...clamp, easing: Easing.out(Easing.quad) });
  const ballOn = c <= HIT + 3;
  const ballX = 540 + Math.sin(bt * 3.2) * 50 * bt;
  const ballR = 22 + 70 * bt;
  // after the strike: pins fly (HIT → HIT+18), boy drops in (…+30), resets pins one by one, climbs back
  const since = c - HIT;
  const flying = since >= 0 && since < 22;
  const dropIn = interpolate(since, [24, 34], [0, 1], clamp);
  const climbOut = interpolate(since, [P - HIT - 14, P - HIT - 4], [0, 1], clamp);
  const boyDown = dropIn * (1 - climbOut);
  const jump = since >= -2 && since < 12 ? Math.sin(((since + 2) / 14) * Math.PI) * 26 : 0;
  const resetN = Math.floor(interpolate(since, [34, P - HIT - 16], [0, 10.99], clamp));
  // camera shake on impact
  const shake = since >= 0 && since < 8 ? Math.sin(since * 2.4) * (8 - since) * 1.6 : 0;
  const float: string[] = v.float ?? [];

  return (
    <Backdrop sky="night" stars={false} moon={false} fog={false}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #1E1712 0%, #3A2718 38%, #5A3B22 52%, #2A1C12 100%)", opacity: 0.95 }} />
      <svg width={1080} height={1920} style={{ position: "absolute", transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
        {/* back wall: wood panelling + hanging lamps */}
        {new Array(12).fill(0).map((_, i) => (
          <line key={i} x1={i * 95} y1={560} x2={i * 95} y2={FAR - 210} stroke="#2A1C12" strokeWidth={5} opacity={0.6} />
        ))}
        {[220, 540, 860].map((lx, i) => (
          <g key={i}>
            <line x1={lx} y1={0} x2={lx} y2={600} stroke={INK} strokeWidth={5} />
            <path d={`M ${lx - 46} 640 Q ${lx} 584 ${lx + 46} 640 Z`} fill={C.mustard} stroke={INK} strokeWidth={6} />
            <ellipse cx={lx} cy={660} rx={120} ry={40} fill={C.mustard} opacity={0.12 + 0.04 * Math.sin(f / 9 + i)} />
          </g>
        ))}
        {/* the pit: dark hole behind the pins, ledge where the pin boy perches */}
        <rect x={300} y={FAR - 210} width={480} height={220} fill="#120D09" stroke={INK} strokeWidth={8} />
        <rect x={280} y={FAR - 236} width={520} height={34} fill="#6B4A2E" stroke={INK} strokeWidth={7} />
        <text x={540} y={FAR - 211} textAnchor="middle" fontSize={22} fontFamily={typeFont} fill={C.cream} opacity={0.8}>LANE 7</text>
        {/* neighbouring lanes */}
        <path d={`M 0 ${FAR} L ${laneL(0) - 40} ${FAR} L ${laneL(1) - 120} ${NEAR} L 0 ${NEAR} Z`} fill="#8C6239" stroke={INK} strokeWidth={6} />
        <path d={`M 1080 ${FAR} L ${laneR(0) + 40} ${FAR} L ${laneR(1) + 120} ${NEAR} L 1080 ${NEAR} Z`} fill="#8C6239" stroke={INK} strokeWidth={6} />
        {/* gutters */}
        <path d={`M ${laneL(0) - 40} ${FAR} L ${laneL(0)} ${FAR} L ${laneL(1)} ${NEAR} L ${laneL(1) - 120} ${NEAR} Z`} fill="#3A2A1C" stroke={INK} strokeWidth={5} />
        <path d={`M ${laneR(0) + 40} ${FAR} L ${laneR(0)} ${FAR} L ${laneR(1)} ${NEAR} L ${laneR(1) + 120} ${NEAR} Z`} fill="#3A2A1C" stroke={INK} strokeWidth={5} />
        {/* the lane: maple boards */}
        <defs>
          <linearGradient id="maple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9C48A" />
            <stop offset="100%" stopColor="#C8914F" />
          </linearGradient>
        </defs>
        <path d={`M ${laneL(0)} ${FAR} L ${laneR(0)} ${FAR} L ${laneR(1)} ${NEAR} L ${laneL(1)} ${NEAR} Z`} fill="url(#maple)" stroke={INK} strokeWidth={7} />
        {new Array(9).fill(0).map((_, i) => {
          const k = (i + 1) / 10;
          return <line key={i} x1={laneL(0) + (laneR(0) - laneL(0)) * k} y1={FAR} x2={laneL(1) + (laneR(1) - laneL(1)) * k} y2={NEAR} stroke="#A9733D" strokeWidth={3} opacity={0.6} />;
        })}
        {/* aiming arrows */}
        {[-2, -1, 0, 1, 2].map((k) => {
          const t = 0.55 + Math.abs(k) * 0.04;
          const x = 540 + k * (laneR(t) - laneL(t)) * 0.16;
          return <path key={k} d={`M ${x} ${yAt(t) - 22} l 14 34 l -28 0 Z`} fill={C.brick} stroke={INK} strokeWidth={3} />;
        })}
        {/* pin deck */}
        <rect x={laneL(0)} y={FAR - 52} width={laneR(0) - laneL(0)} height={54} fill="#D9AE70" stroke={INK} strokeWidth={6} />
        {/* lane shine */}
        <path d={`M 520 ${FAR + 40} L 560 ${FAR + 40} L 620 ${NEAR} L 470 ${NEAR} Z`} fill="#FFFFFF" opacity={0.12} />
        {/* pin boy – perched on the ledge, lifts his legs at impact, drops into the pit to reset */}
        <g>
          <Figure {...fig} x={720 - boyDown * 170} y={FAR - 236 - jump + boyDown * 175} scale={0.4} walking={false} />
        </g>
        {/* pins: standing, flying after the hit, then re-set one by one */}
        {PINS.map(([col, row], i) => {
          const t = 0.0 - row * 0.0;
          const px = 540 + col * 72;
          const py = FAR + 34 - row * 24;
          const s = 0.95 - row * 0.06;
          if (since < 0) return <Pin key={i} x={px} y={py} s={s} />;
          if (flying) {
            const dir = (random(`d${i}-${cycle}`) - 0.5) * 2;
            const up = 120 + random(`u${i}-${cycle}`) * 200;
            const p = since / 22;
            return <Pin key={i} x={px + dir * 380 * p} y={py - up * Math.sin(p * Math.PI) - 10 * p + t} s={s} rot={dir * 720 * p} o={1 - Math.max(0, p - 0.75) * 4} />;
          }
          // reset order: back row first
          const order = 9 - i;
          if (resetN > order || c >= P - 6) {
            return <Pin key={i} x={px} y={py} s={s} />;
          }
          return null;
        })}
        {/* the ball */}
        {ballOn ? (
          <g transform={`translate(${ballX}, ${yAt(bt) - ballR * 0.9}) rotate(${-c * 14})`}>
            <circle r={ballR} fill="#1F2A44" stroke={INK} strokeWidth={6} />
            <circle cx={-ballR * 0.3} cy={-ballR * 0.3} r={ballR * 0.12} fill="#0B0F1A" />
            <circle cx={ballR * 0.05} cy={-ballR * 0.42} r={ballR * 0.12} fill="#0B0F1A" />
            <circle cx={-ballR * 0.05} cy={-ballR * 0.05} r={ballR * 0.12} fill="#0B0F1A" />
            <ellipse cx={-ballR * 0.4} cy={-ballR * 0.5} rx={ballR * 0.18} ry={ballR * 0.1} fill="#FFFFFF" opacity={0.35} />
          </g>
        ) : null}
        {/* impact burst */}
        {since >= 0 && since < 10 ? (
          <g transform={`translate(540, ${FAR - 20})`} opacity={1 - since / 10}>
            {new Array(10).fill(0).map((_, k) => {
              const a = (k / 10) * Math.PI * 2;
              const r1 = 40 + since * 10;
              return <line key={k} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1 * 0.6} x2={Math.cos(a) * (r1 + 50)} y2={Math.sin(a) * (r1 + 50) * 0.6} stroke={C.mustard} strokeWidth={8} strokeLinecap="round" />;
            })}
          </g>
        ) : null}
      </svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 250} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 700} /> : null}
      {float.map((t, i) => {
        const at = 12 + i * Math.max(24, (dur - 20) / Math.max(1, float.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: 1200 + (i % 2) * 130 - Math.min(age, 40) * 2, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </Backdrop>
  );
};
