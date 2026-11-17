import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Icon } from "../kit/Icons";
import { Figure, FigureSpec } from "../kit/Figure";
import { C, bodyFont, titleFont, typeFont } from "../theme";
import { Headline } from "../kit/Text";
import type { SceneProps } from "./types";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const pop = (f: number, d = 10) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
const stroke = (px: number) => ({ WebkitTextStroke: `${px}px ${C.ink}`, paintOrder: "stroke fill" as const });

// THEN vs NOW split screen. visual: { then: {label, icon?|figure?, caption?}, now: {label, icon, caption?}, revealAt? }
export const Versus: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const at = (v.revealAt ?? 0.45) * dur;
  const half = (side: "then" | "now", top: number, bg: string, delay: number) => {
    const d = v[side] ?? {};
    const fig: FigureSpec | undefined = d.figure;
    return (
      <div style={{ position: "absolute", left: 0, right: 0, top, height: 700, background: bg, overflow: "hidden", translate: `${interpolate(f - delay, [0, 10], [side === "then" ? -1080 : 1080, 0], { ...clamp, easing: Easing.out(Easing.cubic) })}px 0px` }}>
        <div style={{ position: "absolute", left: 80, top: 40, fontFamily: typeFont, fontSize: 46, letterSpacing: 6, color: side === "then" ? C.sepia : "#C9C6E8" }}>{side === "then" ? "THEN" : "NOW"}</div>
        <div style={{ position: "absolute", left: 80, top: 110, width: 520, fontFamily: titleFont, fontSize: 84, lineHeight: 1.02, color: side === "then" ? C.ink : C.cream, ...(side === "now" ? stroke(8) : {}) }}>{d.label}</div>
        {d.caption ? <div style={{ position: "absolute", left: 80, top: 330, width: 520, fontFamily: bodyFont, fontWeight: 800, fontSize: 44, color: side === "then" ? C.brickDark : C.mustard }}>{d.caption}</div> : null}
        <div style={{ position: "absolute", right: 140, top: 120, scale: pop(f - delay - 6, 12), rotate: `${Math.sin((f + (side === "now" ? 20 : 0)) / 10) * 5}deg` }}>
          {fig ? (
            <svg width={360} height={520} viewBox="-180 -500 360 520"><Figure {...fig} x={0} y={0} scale={1} walking={false} /></svg>
          ) : (
            <Icon name={d.icon ?? "question"} size={360} />
          )}
        </div>
      </div>
    );
  };
  return (
    <Backdrop sky="dark" stars={false} moon={false} fog={false}>
      {half("then", 230, C.paper, 0)}
      {half("now", 950, `linear-gradient(160deg, ${C.modernA}, ${C.modernB})`, at)}
      <div style={{ position: "absolute", left: 540, top: 945, translate: "-50% -50%", width: 170, height: 170, borderRadius: "50%", background: C.brick, border: `8px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: titleFont, fontSize: 76, color: C.cream, scale: pop(f - at + 4, 10), rotate: "-8deg" }}>VS</div>
    </Backdrop>
  );
};

// Timeline: a ruler of years with events popping in. visual: { from, to, events: [{year, label}], title? }
export const Timeline: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const from = Number(v.from ?? 1800);
  const to = Number(v.to ?? 2000);
  const events: { year: number; label: string }[] = v.events ?? [];
  const x = (yr: number) => 120 + ((yr - from) / (to - from)) * 780;
  const prog = interpolate(f, [6, dur * 0.85], [from, to], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const ticks = [] as number[];
  const raw = (to - from) / 4;
  const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].find((n) => n >= raw) ?? raw;
  for (let t = Math.ceil(from / step) * step; t <= to; t += step) ticks.push(t);
  return (
    <Backdrop sky="paper" moon={false} fog={false}>
      {v.title ? <div style={{ position: "absolute", top: 260, left: 80, right: 160, textAlign: "center", fontFamily: titleFont, fontSize: 86, color: C.ink, opacity: pop(f, 8) }}>{v.title}</div> : null}
      <div style={{ position: "absolute", top: 520, left: 540, translate: "-50% 0", fontFamily: titleFont, fontSize: 190, color: C.brick, ...stroke(10) }}>{Math.round(prog)}</div>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <line x1={120} y1={900} x2={900} y2={900} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
        <line x1={120} y1={900} x2={x(prog)} y2={900} stroke={C.mustard} strokeWidth={10} strokeLinecap="round" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={880} x2={x(t)} y2={920} stroke={C.ink} strokeWidth={6} />
            <text x={x(t)} y={975} textAnchor="middle" fontSize={34} fontFamily={typeFont} fill={C.sepia}>{t}</text>
          </g>
        ))}
        <circle cx={x(prog)} cy={900} r={22} fill={C.brick} stroke={C.ink} strokeWidth={6} />
      </svg>
      {events.map((e, i) => {
        const shown = prog >= e.year;
        const up = i % 2 === 0;
        return (
          <div key={i} style={{ position: "absolute", left: ((w) => Math.min(Math.max(x(e.year), 80 + w / 2), 920 - w / 2))(`${e.year}: ${e.label}`.length * 22 + 50), top: up ? 1030 : 1115, translate: "-50% 0", fontFamily: bodyFont, fontWeight: 800, fontSize: 40, color: C.ink, background: C.cream, border: `5px solid ${C.ink}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", opacity: shown ? 1 : 0, scale: shown ? 1 : 0.6 }}>
            {e.year}: {e.label}
          </div>
        );
      })}
    </Backdrop>
  );
};


// Desk / office scene: a worker at a desk doing the job by hand, with numbers or notes floating up.
// visual: { figure, tag, float: string[], wall?: "teal"|"sepia"|"navy", window?: "night"|"day"|false, clock?: bool, plates?: bool }
export const Desk: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const fig: FigureSpec = v.figure ?? { hat: "none", prop: "pencil", action: "write" };
  const walls: Record<string, string> = { teal: "#2F5E5C", sepia: "#6B5136", navy: "#24304F" };
  const wall = walls[v.wall ?? "teal"] ?? walls.teal;
  const float: string[] = v.float ?? [];
  const win = v.headline ? false : v.window ?? "night";
  return (
    <Backdrop sky="dark" stars={false} moon={false} fog={false}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${wall} 0%, ${wall} 62%, #3A2A1C 62%, #2A1E14 100%)` }} />
      {/* wallpaper stripes */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.12 }}>
        {new Array(14).fill(0).map((_, i) => <rect key={i} x={i * 80} y={0} width={30} height={1190} fill={C.cream} />)}
      </svg>
      {win ? (
        <div style={{ position: "absolute", left: 640, top: 300, width: 320, height: 400, border: `14px solid #5A4128`, background: win === "night" ? `linear-gradient(180deg, #0B1122, ${C.navy})` : "linear-gradient(180deg, #8EC3D6, #CFE3DA)", overflow: "hidden" }}>
          {win === "night" ? new Array(18).fill(0).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: (i * 53) % 290, top: (i * 37) % 360, width: 5, height: 5, borderRadius: 3, background: C.cream, opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 9 + i)) }} />
          )) : null}
          <div style={{ position: "absolute", left: 143, top: 0, width: 10, height: 400, background: "#5A4128" }} />
          <div style={{ position: "absolute", left: 0, top: 190, width: 320, height: 10, background: "#5A4128" }} />
        </div>
      ) : null}
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={300} size={v.size ?? 100} /> : null}
      {v.clock !== false && !v.headline ? (
        <svg width={220} height={220} style={{ position: "absolute", left: 120, top: 320 }} viewBox="0 0 200 200">
          <circle cx={100} cy={100} r={86} fill={C.cream} stroke={C.ink} strokeWidth={8} />
          <line x1={100} y1={100} x2={100 + 50 * Math.sin(f / 90)} y2={100 - 50 * Math.cos(f / 90)} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <line x1={100} y1={100} x2={100 + 70 * Math.sin(f / 8)} y2={100 - 70 * Math.cos(f / 8)} stroke={C.brick} strokeWidth={4} strokeLinecap="round" />
        </svg>
      ) : null}
      {/* worker behind the desk */}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Figure {...fig} x={430} y={1440} scale={0.95} walking={false} />
      </svg>
      {/* desk */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 1240, height: 60, background: "#8A5A35", border: `6px solid ${C.ink}`, borderRadius: 10 }} />
      <div style={{ position: "absolute", left: 130, right: 130, top: 1296, height: 330, background: "#6E452A", border: `6px solid ${C.ink}`, borderTop: "none" }} />
      {/* papers / plates on the desk */}
      {v.plates ? (
        [0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 560 + i * 110, top: 1160 - i * 6, width: 100, height: 84, background: "#1C2333", border: `4px solid ${C.cream}`, rotate: `${-6 + i * 5}deg`, boxShadow: `0 0 18px ${C.glow}66` }}>
            {new Array(7).fill(0).map((_, k) => <div key={k} style={{ position: "absolute", left: (k * 29 + i * 11) % 88, top: (k * 17 + i * 23) % 72, width: 4, height: 4, borderRadius: 2, background: C.cream }} />)}
          </div>
        ))
      ) : (
        [0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 600 + i * 14, top: 1196 - i * 10, width: 210, height: 50, background: C.cream, border: `4px solid ${C.ink}`, rotate: `${-4 + i * 3}deg` }} />)
      )}
      {v.tag ? (
        <div style={{ position: "absolute", left: 540, top: 770, translate: "-50% 0", fontFamily: typeFont, fontSize: 44, color: C.ink, background: C.cream, border: `5px solid ${C.ink}`, borderRadius: 12, padding: "10px 26px", whiteSpace: "nowrap", rotate: "-2deg", boxShadow: "0 10px 0 rgba(0,0,0,0.35)", opacity: interpolate(f - 8, [0, 6], [0, 1], clamp) }}>{v.tag}</div>
      ) : null}
      {/* floating numbers */}
      {float.map((t, i) => {
        const period = Math.max(30, Math.floor(dur / Math.max(1, float.length)));
        const start = i * period * 0.8;
        const age = f - start;
        if (age < 0) return null;
        const p = Math.min(1, age / 45);
        // fade out when the next float on the same side arrives, so they never stack on top of each other
        const nextStart = i + 2 < float.length ? (i + 2) * period * 0.8 : Infinity;
        const fade = Number.isFinite(nextStart) ? interpolate(f, [nextStart - 6, nextStart + 6], [1, 0], clamp) : 1;
        if (fade <= 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 80, width: 280, whiteSpace: "normal" as const, lineHeight: 1.1 } : { left: 640, whiteSpace: "nowrap" as const }), top: 1150 - p * 250, fontFamily: typeFont, fontSize: 48, color: C.glow, opacity: fade * interpolate(p, [0, 0.15, 0.8, 1], [0, 1, 1, 0.85]), textShadow: "0 4px 0 rgba(0,0,0,0.6)" }}>
            {t}
          </div>
        );
      })}
    </Backdrop>
  );
};
