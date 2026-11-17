import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const HORIZON = 860;

// A simple storybook horse pulling an ice plough. Origin = hooves, faces right.
const Horse: React.FC<{ x: number; y: number; s: number; f: number }> = ({ x, y, s, f }) => {
  const leg = (i: number) => Math.sin(f / 4 + i * Math.PI) * 14;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {[[-70, 0], [-40, 1], [40, 1], [70, 0]].map(([lx, k], i) => (
        <g key={i} transform={`rotate(${leg(k)}, ${lx}, -120)`}>
          <rect x={lx - 10} y={-130} width={20} height={130} rx={8} fill="#6B4A2E" stroke={INK} strokeWidth={6} />
          <rect x={lx - 13} y={-12} width={26} height={14} rx={4} fill={C.stone} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      <ellipse cx={0} cy={-170} rx={115} ry={62} fill="#7E5634" stroke={INK} strokeWidth={7} />
      <path d="M 80 -200 L 130 -300 L 175 -285 L 150 -190 Z" fill="#7E5634" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 125 -305 L 205 -270 L 196 -240 L 150 -250 Z" fill="#7E5634" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 120 -300 L 92 -210" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d="M -112 -190 Q -160 -170 -150 -100" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect x={-60} y={-235} width={30} height={70} fill={C.brick} stroke={INK} strokeWidth={5} />
    </g>
  );
};

const lakeY = (t: number) => HORIZON + (1920 - HORIZON) * t; // 0 = horizon, 1 = bottom

// visual: { headline?, accent?, top?, size?, tag?, tagY?, figure?, horse?: bool, float?: string[] }
export const IceLake: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const fig: FigureSpec = v.figure ?? { hat: "cap", coat: "#2E5E7A", scarf: C.brick, prop: "saw", action: "saw" };
  const grid = interpolate(f, [0, Math.max(30, dur * 0.8)], [0, 1], clamp);
  const horseX = interpolate(f, [0, dur], [80, 760]);
  const float: string[] = v.float ?? [];
  // perspective grid on the ice: rows get further apart towards the viewer
  const rows = [0.06, 0.13, 0.22, 0.33, 0.47, 0.64];
  const cols = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const vx = 540;
  return (
    <Backdrop sky="dawn" stars={false} moon={false} fog={false}>
      {/* cold winter sky over the warm dawn */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #2A3656 0%, #5D7393 45%, #B7C8D3 78%, #E9EEF0 100%)", opacity: 0.88 }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {/* far shore: snowy bank, pines, ice house */}
        <path d={`M 0 ${HORIZON - 40} Q 300 ${HORIZON - 90} 560 ${HORIZON - 50} T 1080 ${HORIZON - 60} L 1080 ${HORIZON + 10} L 0 ${HORIZON + 10} Z`} fill="#F3F6F7" stroke={INK} strokeWidth={6} />
        {new Array(9).fill(0).map((_, i) => {
          const px = 30 + i * 70 + random(`p${i}`) * 30;
          const h = 70 + random(`ph${i}`) * 50;
          return <path key={i} d={`M ${px} ${HORIZON - 40} l 34 ${-h} l 34 ${h} Z`} fill="#24443F" stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
        })}
        <g>
          <rect x={760} y={HORIZON - 170} width={260} height={130} fill="#8A5A35" stroke={INK} strokeWidth={7} />
          <path d={`M 740 ${HORIZON - 168} L 890 ${HORIZON - 240} L 1040 ${HORIZON - 168} Z`} fill="#F3F6F7" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={790 + k * 50} y1={HORIZON - 165} x2={790 + k * 50} y2={HORIZON - 42} stroke={INK} strokeWidth={4} opacity={0.5} />)}
          <rect x={865} y={HORIZON - 120} width={50} height={80} fill="#3A2A1C" stroke={INK} strokeWidth={5} />
        </g>
        {/* frozen lake */}
        <defs>
          <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3EFF3" />
            <stop offset="100%" stopColor="#A9CBD8" />
          </linearGradient>
        </defs>
        <rect x={0} y={HORIZON + 10} width={1080} height={1920 - HORIZON} fill="url(#ice)" />
        {/* sheen streaks */}
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M ${120 + k * 240} ${HORIZON + 140 + k * 160} l 160 -40`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.55} />
        ))}
        {/* score lines appear as the plough works */}
        {rows.map((t, i) => {
          const y = lakeY(t);
          const len = interpolate(grid, [i / rows.length, (i + 1) / rows.length], [0, 1], clamp);
          return <line key={`r${i}`} x1={0} y1={y} x2={1080 * len} y2={y} stroke="#4E7F93" strokeWidth={3 + t * 8} opacity={0.75} />;
        })}
        {cols.map((c, i) => {
          const len = interpolate(grid, [0.2 + i * 0.06, 0.45 + i * 0.06], [0, 1], clamp);
          const x0 = vx + c * 70;
          const x1 = vx + c * 330;
          const yTop = lakeY(rows[0]);
          const yBot = lakeY(rows[rows.length - 1]);
          return <line key={`c${i}`} x1={x0} y1={yTop} x2={x0 + (x1 - x0) * len} y2={yTop + (yBot - yTop) * len} stroke="#4E7F93" strokeWidth={5} opacity={0.75} />;
        })}
        {/* open-water channel with cut blocks floating to the ice house */}
        <rect x={0} y={1510} width={1080} height={120} fill="#1E3B4E" stroke={INK} strokeWidth={6} />
        {new Array(7).fill(0).map((_, i) => {
          const bx = ((i * 190 + f * 2.4) % 1330) - 200;
          const bob = Math.sin(f / 8 + i) * 4;
          return (
            <g key={i} transform={`translate(${bx}, ${1530 + bob})`}>
              <rect x={0} y={0} width={150} height={70} rx={6} fill="#CFE7EF" stroke={INK} strokeWidth={5} />
              <rect x={0} y={0} width={150} height={20} rx={6} fill="#EEF8FB" stroke={INK} strokeWidth={4} />
            </g>
          );
        })}
        {/* horse + plough scoring the ice in the middle distance */}
        {v.horse !== false ? (
          <g>
            <line x1={horseX - 260} y1={1045} x2={horseX - 20} y2={1045} stroke="#4E7F93" strokeWidth={6} opacity={0.8} />
            <line x1={horseX - 120} y1={1010} x2={horseX - 30} y2={990} stroke={INK} strokeWidth={5} />
            <path d={`M ${horseX - 150} 1045 l 40 -40 l 30 0 l -10 40 Z`} fill={C.stone} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <Horse x={horseX} y={1050} s={0.62} f={f} />
          </g>
        ) : null}
        {/* the ice cutter */}
        <line x1={300} y1={1455} x2={520} y2={1455} stroke="#25475A" strokeWidth={10} strokeLinecap="round" />
        <Figure {...fig} x={v.x ?? 300} y={1450} scale={v.scale ?? 0.92} walking={false} />
        {/* frosty breath */}
        {[0, 1, 2].map((k) => {
          const age = (f + k * 14) % 42;
          const p = age / 42;
          return <circle key={k} cx={(v.x ?? 300) + 70 + p * 70} cy={1450 - 360 * (v.scale ?? 0.92) - p * 50} r={10 + p * 26} fill="#FFFFFF" opacity={(1 - p) * 0.55} />;
        })}
        {/* falling snow */}
        {new Array(40).fill(0).map((_, i) => {
          const sx = (random(`sx${i}`) * 1080 + Math.sin(f / 20 + i) * 30) % 1080;
          const sy = (random(`sy${i}`) * 1920 + f * (2 + random(`sv${i}`) * 3)) % 1920;
          return <circle key={i} cx={sx} cy={sy} r={3 + random(`sr${i}`) * 4} fill="#FFFFFF" opacity={0.75} />;
        })}
      </svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 660} /> : null}
      {float.map((t, i) => {
        const at = 12 + i * Math.max(24, (dur - 20) / Math.max(1, float.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: 1230 + (i % 2) * 120 - Math.min(age, 40) * 2, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </Backdrop>
  );
};
