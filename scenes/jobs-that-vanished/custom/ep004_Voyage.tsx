import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Icon } from "../kit/Icons";
import { C, bodyFont, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const pop = (f: number, d = 10) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
const INK = C.ink;

// Sea-chart voyage: a ship sails a dotted route between two ports while the ice cargo shrinks.
// visual: { title, from, to, startTons, endTons, unit, months, chip }
const P = [
  [230, 470],
  [60, 820],
  [560, 1180],
  [850, 1010],
];
const bez = (t: number) => {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((d) => k.reduce((s, kk, i) => s + kk * P[i][d], 0)) as [number, number];
};

export const Voyage: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const t = interpolate(f, [8, dur * 0.85], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const [sx, sy] = bez(t);
  const [nx, ny] = bez(Math.min(1, t + 0.01));
  const tilt = (Math.atan2(ny - sy, nx - sx) * 180) / Math.PI;
  const start = Number(v.startTons ?? 180);
  const end = Number(v.endTons ?? 100);
  const tons = Math.round(interpolate(t, [0, 1], [start, end]));
  const blockScale = interpolate(t, [0, 1], [1, Math.sqrt(end / start)]);
  const months = Number(v.months ?? 4);
  const month = Math.min(months, Math.max(1, Math.ceil(t * months)));
  const dots = new Array(46).fill(0).map((_, i) => bez(i / 45));
  return (
    <Backdrop sky="paper" moon={false} fog={false}>
      {v.title ? (
        <div style={{ position: "absolute", top: 230, left: 80, right: 160, textAlign: "center", fontFamily: titleFont, fontSize: 70, color: INK, lineHeight: 1.05, opacity: pop(f, 8) }}>{v.title}</div>
      ) : null}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {/* sea waves */}
        {new Array(8).fill(0).map((_, r) => (
          <path key={r} d={new Array(7).fill(0).map((__, k) => `${k === 0 ? "M" : ""} ${(k * 170 + ((f * 1.5 + r * 60) % 170)) - 170} ${500 + r * 95} q 40 -18 80 0`).join(" ")} stroke="#6F8F9A" strokeWidth={4} fill="none" opacity={0.35} />
        ))}
        {/* equator */}
        <line x1={60} y1={900} x2={920} y2={900} stroke={C.brick} strokeWidth={4} strokeDasharray="18 14" opacity={0.7} />
        <text x={900} y={885} textAnchor="end" fontSize={34} fontFamily={typeFont} fill={C.brick}>EQUATOR</text>
        {/* route */}
        {dots.map(([x, y], i) => (i / 45 <= t + 0.001 ? <circle key={i} cx={x} cy={y} r={7} fill={INK} /> : <circle key={i} cx={x} cy={y} r={5} fill={INK} opacity={0.25} />))}
        {/* ports */}
        <circle cx={P[0][0]} cy={P[0][1]} r={18} fill={C.brick} stroke={INK} strokeWidth={5} />
        <text x={P[0][0] + 34} y={P[0][1] + 12} fontSize={44} fontFamily={titleFont} fill={INK}>{v.from ?? "BOSTON"}</text>
        <circle cx={P[3][0]} cy={P[3][1]} r={18} fill={C.teal} stroke={INK} strokeWidth={5} />
        <text x={P[3][0] + 40} y={P[3][1] + 115} textAnchor="end" fontSize={44} fontFamily={titleFont} fill={INK} opacity={interpolate(t, [0.7, 0.9], [0.3, 1], clamp)}>{v.to ?? "CALCUTTA"}</text>
      </svg>
      {/* ship */}
      <div style={{ position: "absolute", left: sx, top: sy, translate: "-50% -80%", rotate: `${Math.max(-25, Math.min(25, tilt * 0.3)) + Math.sin(f / 6) * 4}deg`, scale: pop(f, 10) }}>
        <Icon name="ship" size={190} />
      </div>
      {/* cargo meter */}
      <div style={{ position: "absolute", left: 120, top: 1390, width: 800, display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 170, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ scale: blockScale }}><Icon name="ice" size={170} /></div>
        </div>
        <div>
          <div style={{ fontFamily: titleFont, fontSize: 96, color: C.brick, WebkitTextStroke: `7px ${INK}`, paintOrder: "stroke fill", lineHeight: 1 }}>{tons} {v.unit ?? "TONS"}</div>
          <div style={{ fontFamily: typeFont, fontSize: 42, color: INK, marginTop: 8 }}>MONTH {month} OF {months}</div>
        </div>
      </div>
      {v.chip ? (
        <div style={{ position: "absolute", left: 700, top: 560, fontFamily: bodyFont, fontWeight: 800, fontSize: 40, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", translate: "-50% 0", rotate: "3deg", opacity: interpolate(f - dur * 0.35, [0, 6], [0, 1], clamp), scale: pop(f - dur * 0.35, 10) }}>{v.chip}</div>
      ) : null}
    </Backdrop>
  );
};
