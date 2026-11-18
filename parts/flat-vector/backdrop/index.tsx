import React from "react";
import { random, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector backdrop generator: full-frame 1080x1920 backgrounds with time-of-day and weather.
// Every flat-vector background preset imports these helpers (Sky, Weather, Room, Window, Hills, ...) so
// time and weather look the same in every setting.

export type Time = "day" | "morning" | "dusk" | "night";
export type Weather = "clear" | "cloudy" | "rain" | "snow" | "fog" | "storm";
export const TIMES: Time[] = ["day", "morning", "dusk", "night"];
export const WEATHERS: Weather[] = ["clear", "cloudy", "rain", "snow", "fog", "storm"];

const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
const hex = (h: string) => { const m = /^#?([0-9a-f]{6})$/i.exec(h); const n = m ? parseInt(m[1], 16) : 0; return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
/** Blend colour a towards b by t (0..1). Both #rrggbb. */
export const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, t))).toString(16).padStart(2, "0")).join("");
};
/** Seeded 0..1 number (deterministic). */
export const rnd = (seed: number | string, i: number) => random(`${seed}:${i}`);
export const asTime = (t: any): Time => (TIMES.includes(t) ? t : "day");
export const asWeather = (w: any): Weather => (WEATHERS.includes(w) ? w : "clear");

/** Light any colour for the time of day. indoor = lamps are on, so night is only a little darker. */
export const lit = (c: string, time: Time = "day", indoor = false) => {
  if (!/^#?[0-9a-f]{6}$/i.test(c)) return c;
  if (time === "night") return indoor ? mix(c, "#2A2F55", 0.18) : mix(shade(c, 0.45), "#1C2550", 0.35);
  if (time === "dusk") return indoor ? mix(c, "#FF9F6A", 0.08) : mix(shade(c, 0.15), "#7A4C8A", 0.2);
  if (time === "morning") return mix(c, "#FFD9A8", indoor ? 0.06 : 0.14);
  return c;
};

const SKY: Record<Time, [string, string, string]> = {
  day: ["#7DBBE6", "#A9D4F0", "#DCEFF9"],
  morning: ["#8FB8E6", "#F3C9C0", "#FFE4B0"],
  dusk: ["#3B3A78", "#B85C7E", "#FF9F5A"],
  night: ["#0F1634", "#1C2652", "#334272"],
};
/** Sky colours [top, middle, horizon] for a time and weather. */
export const skyColours = (time: Time = "day", weather: Weather = "clear"): [string, string, string] => {
  const s = SKY[time];
  const k = weather === "storm" ? 0.7 : weather === "rain" || weather === "fog" ? 0.5 : weather === "snow" || weather === "cloudy" ? 0.35 : 0;
  const grey = time === "night" ? "#2A3048" : weather === "storm" ? "#5D6578" : "#AEB6C4";
  return [mix(s[0], grey, k), mix(s[1], grey, k), mix(s[2], grey, k * 0.8)];
};

/** Puffy flat cloud centred on x,y (about 360 x 150 at s = 1). */
export const Cloud: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({ x, y, s = 1, fill = C.white }) => (
  <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={180} ry={40} fill={shade(fill, 0.08)} />
    {[[-110, 10, 62], [-30, -30, 86], [70, -18, 72], [130, 20, 54], [0, 22, 70]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />)}
    <rect x={-170} y={20} width={340} height={40} rx={20} fill={fill} />
  </g>
);

/** Twinkling stars above maxY. */
export const Stars: React.FC<{ f?: number; count?: number; seed?: number; maxY?: number }> = ({ f = 0, count = 60, seed = 3, maxY = 900 }) => (
  <g>
    {new Array(count).fill(0).map((_, i) => {
      const x = rnd(seed, i * 3) * 1080, y = rnd(seed, i * 3 + 1) * maxY, r = 2 + rnd(seed, i * 3 + 2) * 4;
      const tw = 0.55 + 0.45 * Math.sin(f / 9 + i * 1.7);
      return <circle key={i} cx={f1(x)} cy={f1(y)} r={f1(r)} fill="#FFF6D8" opacity={f1(tw)} />;
    })}
  </g>
);

/** Full-frame sky down to the horizon (fills to 1920 so nothing shows through): banded colours, sun or moon,
 *  drifting clouds and night stars. */
export const Sky: React.FC<{ time?: Time; weather?: Weather; horizon?: number; f?: number; sun?: boolean; clouds?: number; seed?: number; drift?: boolean }> = ({
  time = "day", weather = "clear", horizon = 1100, f = 0, sun = true, clouds, seed = 1, drift = true,
}) => {
  const [a, b, c] = skyColours(time, weather);
  const bands = 7, bh = horizon / bands;
  const nClouds = clouds ?? (weather === "clear" ? 2 : weather === "cloudy" || weather === "snow" ? 5 : weather === "fog" ? 2 : 6);
  const dark = weather === "rain" || weather === "storm";
  const cloudFill = time === "night" ? (dark ? "#3A4060" : "#4A5378") : dark ? (weather === "storm" ? "#7A8296" : "#B7BECB") : time === "dusk" ? "#F6C6B4" : C.white;
  const showSun = sun && (weather === "clear" || weather === "cloudy");
  const sp = time === "day" ? [800, 330] : time === "morning" ? [250, horizon - 230] : time === "dusk" ? [740, horizon - 150] : [790, 330];
  return (
    <g>
      <rect x={0} y={0} width={1080} height={1920} fill={c} />
      {new Array(bands).fill(0).map((_, i) => {
        const t = i / (bands - 1);
        const col = t < 0.5 ? mix(a, b, t * 2) : mix(b, c, (t - 0.5) * 2);
        return <rect key={i} x={0} y={f1(i * bh)} width={1080} height={f1(bh + 1)} fill={col} />;
      })}
      {time === "night" && weather !== "storm" && weather !== "rain" && <Stars f={f} seed={seed + 7} maxY={horizon * 0.8} count={weather === "clear" ? 70 : 25} />}
      {showSun && time !== "night" && (
        <g>
          <circle cx={sp[0]} cy={sp[1]} r={time === "day" ? 150 : 170} fill={time === "dusk" ? "#FFB36B" : "#FFF1B0"} opacity={0.35} />
          <circle cx={sp[0]} cy={sp[1]} r={time === "day" ? 95 : 115} fill={time === "dusk" ? "#FF8A3D" : C.yellow} />
        </g>
      )}
      {showSun && time === "night" && (
        <g>
          <circle cx={sp[0]} cy={sp[1]} r={130} fill="#FFF6D8" opacity={0.12} />
          <circle cx={sp[0]} cy={sp[1]} r={78} fill="#F4F1EA" />
          <circle cx={sp[0] - 22} cy={sp[1] - 14} r={14} fill="#DDD8CB" />
          <circle cx={sp[0] + 24} cy={sp[1] + 20} r={10} fill="#DDD8CB" />
        </g>
      )}
      {new Array(nClouds).fill(0).map((_, i) => {
        const w = 1500, speed = drift ? 0.25 + rnd(seed, i * 5) * 0.35 : 0;
        const x = (((rnd(seed, i * 5 + 1) * w + f * speed) % w) + w) % w - 210;
        const y = 120 + rnd(seed, i * 5 + 2) * Math.max(120, horizon * 0.55);
        const s = 0.55 + rnd(seed, i * 5 + 3) * 0.6;
        return <Cloud key={i} x={x} y={y} s={s} fill={cloudFill} />;
      })}
    </g>
  );
};

/** Rolling hills filling from y down to the bottom of the frame. */
export const Hills: React.FC<{ y?: number; color?: string; amp?: number; seed?: number; waves?: number }> = ({ y = 1150, color = C.green, amp = 70, seed = 2, waves = 2 }) => {
  const ph = [rnd(seed, 1) * 6.28, rnd(seed, 2) * 6.28];
  const pts: string[] = [];
  for (let x = -20; x <= 1100; x += 40) {
    const h = Math.sin((x / 1080) * Math.PI * waves + ph[0]) * amp + Math.sin((x / 1080) * Math.PI * waves * 2.3 + ph[1]) * amp * 0.35;
    pts.push(`${x} ${f1(y - h)}`);
  }
  return <path d={`M -20 1920 L ${pts.join(" L ")} L 1100 1920 Z`} fill={color} />;
};

/** Row of jagged mountains with optional snow caps, standing on y. */
export const Mountains: React.FC<{ y?: number; color?: string; h?: number; seed?: number; snow?: boolean; peaks?: number }> = ({ y = 1150, color = "#7C86A8", h = 420, seed = 4, snow = true, peaks = 4 }) => {
  const pk = new Array(peaks).fill(0).map((_, i) => {
    const x = -60 + (i + 0.5) * (1200 / peaks) + (rnd(seed, i) - 0.5) * 80;
    return [x, y - h * (0.6 + 0.4 * rnd(seed, i + 20))];
  });
  const val = (i: number) => (i < 0 ? [-120, y] : i >= peaks - 1 ? [1200, y] : [(pk[i][0] + pk[i + 1][0]) / 2, y - h * (0.15 + 0.2 * rnd(seed, i + 40))]);
  const d = ["M -120 1920 L -120 " + y];
  pk.forEach((p, i) => { d.push(`L ${f1(p[0])} ${f1(p[1])}`); const v = val(i); d.push(`L ${f1(v[0])} ${f1(v[1])}`); });
  d.push("L 1200 1920 Z");
  return (
    <g>
      <path d={d.join(" ")} fill={color} />
      {pk.map((p, i) => {
        const L = i === 0 ? [-120, y] : val(i - 1), R = val(i);
        const k = 0.28, lx = p[0] + (L[0] - p[0]) * k, ly = p[1] + (L[1] - p[1]) * k, rx = p[0] + (R[0] - p[0]) * k, ry = p[1] + (R[1] - p[1]) * k;
        return (
          <g key={i}>
            <path d={`M ${f1(p[0])} ${f1(p[1])} L ${f1(R[0])} ${f1(R[1])} L ${f1(p[0] + (R[0] - p[0]) * 0.15)} ${y} L ${f1(p[0])} ${f1(p[1] + h * 0.05)} Z`} fill={shade(color, 0.14)} />
            {snow && <path d={`M ${f1(p[0])} ${f1(p[1])} L ${f1(rx)} ${f1(ry)} L ${f1((p[0] + rx) / 2 + 10)} ${f1(ry - 18)} L ${f1(p[0])} ${f1(ry + 6)} L ${f1((p[0] + lx) / 2 - 8)} ${f1(ly - 16)} L ${f1(lx)} ${f1(ly)} Z`} fill="#F4F6FA" />}
          </g>
        );
      })}
    </g>
  );
};

/** City skyline: a row of flat buildings standing on y; windows glow at night (lit). */
export const Skyline: React.FC<{ y?: number; color?: string; seed?: number; minH?: number; maxH?: number; lit?: boolean; windows?: boolean }> = ({ y = 1200, color = "#6F7FA6", seed = 5, minH = 220, maxH = 620, lit: on = false, windows = true }) => {
  const out: React.ReactNode[] = [];
  let x = -30, i = 0;
  while (x < 1100 && i < 30) {
    const w = 80 + rnd(seed, i * 4) * 90, h = minH + rnd(seed, i * 4 + 1) * (maxH - minH), col = shade(color, rnd(seed, i * 4 + 2) * 0.16);
    const win: React.ReactNode[] = [];
    if (windows) {
      const cols = Math.max(1, Math.floor((w - 20) / 28)), rows = Math.floor((h - 40) / 40);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const glow = on && rnd(seed, i * 997 + r * 31 + c) > 0.45;
        win.push(<rect key={`${r}-${c}`} x={f1(x + 14 + c * 28)} y={f1(y - h + 24 + r * 40)} width={14} height={20} fill={glow ? "#FFD66B" : on ? shade(col, 0.25) : mix(col, "#DCEFF9", 0.4)} />);
      }
    }
    out.push(<g key={i}><rect x={f1(x)} y={f1(y - h)} width={f1(w)} height={f1(h + 2)} fill={col} />{win}</g>);
    x += w + 4 + rnd(seed, i * 4 + 3) * 10; i++;
  }
  return <g>{out}</g>;
};

/** A row of simple trees (round or pine) standing on y. */
export const TreeLine: React.FC<{ y?: number; color?: string; seed?: number; size?: number; kind?: "round" | "pine" | "mixed"; f?: number }> = ({ y = 1200, color = C.green, seed = 6, size = 1, kind = "round", f = 0 }) => {
  const out: React.ReactNode[] = [];
  let x = -40, i = 0;
  while (x < 1120 && i < 40) {
    const r = (40 + rnd(seed, i * 3) * 34) * size, col = shade(color, rnd(seed, i * 3 + 1) * 0.18);
    const pine = kind === "pine" || (kind === "mixed" && rnd(seed, i * 3 + 2) > 0.5);
    const sw = Math.sin(f / 40 + i) * 3;
    out.push(
      <g key={i} transform={`rotate(${f1(sw)} ${f1(x)} ${y})`}>
        <rect x={f1(x - 7 * size)} y={f1(y - r * 1.2)} width={f1(14 * size)} height={f1(r * 1.2)} fill={C.brownDark} />
        {pine
          ? <path d={`M ${f1(x)} ${f1(y - r * 3.2)} L ${f1(x + r)} ${f1(y - r * 0.6)} L ${f1(x - r)} ${f1(y - r * 0.6)} Z`} fill={col} />
          : <circle cx={f1(x)} cy={f1(y - r * 1.7)} r={f1(r)} fill={col} />}
      </g>,
    );
    x += r * 1.5; i++;
  }
  return <g>{out}</g>;
};

/** Flat ground from y to the bottom of the frame. */
export const Ground: React.FC<{ y?: number; color?: string; kind?: "grass" | "sand" | "dirt" | "snow" | "road" | "water" | "rock"; time?: Time; f?: number }> = ({ y = 1500, color, kind = "grass", time = "day", f = 0 }) => {
  const base = color ?? { grass: "#8CC66E", sand: "#EED9A8", dirt: "#B58A5E", snow: "#F2F5FA", road: "#5D6578", water: "#4E9ED8", rock: "#8F8A86" }[kind];
  const g = lit(base, time);
  return (
    <g>
      <rect x={0} y={y} width={1080} height={1920 - y} fill={g} />
      <rect x={0} y={y} width={1080} height={16} fill={shade(g, 0.1)} />
      {kind === "road" && new Array(6).fill(0).map((_, i) => <rect key={i} x={((i * 220 - f * 4) % 1320 + 1320) % 1320 - 120} y={y + (1920 - y) / 2 - 8} width={120} height={16} rx={8} fill={lit("#F4F1EA", time)} />)}
      {kind === "water" && new Array(8).fill(0).map((_, i) => <rect key={i} x={f1(((i * 170 + Math.sin(f / 25 + i) * 30) % 1180) - 60)} y={f1(y + 40 + i * ((1920 - y - 60) / 8))} width={110} height={8} rx={4} fill={lit("#BFE2F7", time)} opacity={0.7} />)}
      {kind === "grass" && new Array(14).fill(0).map((_, i) => { const x = rnd(9, i) * 1080, yy = y + 60 + rnd(9, i + 50) * (1920 - y - 100); return <path key={i} d={`M ${f1(x - 14)} ${f1(yy)} L ${f1(x - 6)} ${f1(yy - 28)} L ${f1(x)} ${f1(yy - 8)} L ${f1(x + 7)} ${f1(yy - 32)} L ${f1(x + 14)} ${f1(yy)} Z`} fill={shade(g, 0.15)} />; })}
    </g>
  );
};

/** Weather drawn on top of a scene: rain streaks, falling snow, drifting fog bands, storm darkening + lightning. */
export const WeatherFx: React.FC<{ kind?: Weather; f?: number; intensity?: number; seed?: number; x?: number; y?: number; w?: number; h?: number }> = ({ kind = "clear", f = 0, intensity = 1, seed = 8, x = 0, y = 0, w = 1080, h = 1920 }) => {
  if (kind === "clear" || kind === "cloudy") return null;
  const area = (w * h) / (1080 * 1920);
  const n = Math.max(4, Math.round((kind === "snow" ? 70 : 90) * intensity * area));
  const wrap = (v: number, m: number) => ((v % m) + m) % m;
  return (
    <g>
      {kind === "storm" && <rect x={x} y={y} width={w} height={h} fill="#1F2433" opacity={0.18} />}
      {(kind === "rain" || kind === "storm") && new Array(n).fill(0).map((_, i) => {
        const px = x + rnd(seed, i) * (w + 40), py = y + wrap(rnd(seed, i + 500) * h + f * (34 + rnd(seed, i + 900) * 12), h + 60) - 50;
        const len = Math.min(46, h * 0.12);
        return <line key={i} x1={f1(px)} y1={f1(py)} x2={f1(px - len * 0.18)} y2={f1(Math.min(y + h, py + len))} stroke="#E8F2FB" strokeWidth={4} strokeLinecap="round" opacity={0.6} />;
      })}
      {kind === "snow" && new Array(n).fill(0).map((_, i) => {
        const px = x + wrap(rnd(seed, i) * w + Math.sin(f / 22 + i) * 14, w), py = y + wrap(rnd(seed, i + 500) * h + f * (2.2 + rnd(seed, i + 900) * 2.5), h);
        return <circle key={i} cx={f1(px)} cy={f1(py)} r={f1(4 + rnd(seed, i + 300) * 7)} fill="#FFFFFF" opacity={0.92} />;
      })}
      {kind === "fog" && [0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={f1(x - 300 + Math.sin(f / 70 + i * 2) * 120)} y={f1(y + h * (0.3 + i * 0.14))} width={w + 600} height={f1(h * 0.1)} rx={f1(h * 0.05)} fill="#F4F6FA" opacity={0.38} />
      ))}
      {kind === "storm" && f % 96 < 4 && (
        <g>
          <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" opacity={0.35} />
          <path d={`M ${x + w * 0.62} ${y} L ${x + w * 0.54} ${y + h * 0.22} L ${x + w * 0.6} ${y + h * 0.22} L ${x + w * 0.5} ${y + h * 0.42} L ${x + w * 0.66} ${y + h * 0.18} L ${x + w * 0.6} ${y + h * 0.18} Z`} fill="#FFF1A8" />
        </g>
      )}
    </g>
  );
};

/** Glazed opening (Window) showing the outside (sky colour by time + weather) with frame, sill and optional curtains. */
export const Window: React.FC<{ x: number; y: number; w?: number; h?: number; time?: Time; weather?: Weather; f?: number; frame?: string; curtains?: string; view?: "sky" | "city" | "trees" }> = ({ x, y, w = 260, h = 320, time = "day", weather = "clear", f = 0, frame = C.white, curtains, view = "sky" }) => {
  const [a, , c] = skyColours(time, weather);
  return (
    <g>
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx={8} fill={frame} />
      <rect x={x} y={y} width={w} height={h} fill={c} />
      <rect x={x} y={y} width={w} height={h * 0.5} fill={mix(a, c, 0.4)} />
      {time === "night" && weather === "clear" && <circle cx={x + w * 0.72} cy={y + h * 0.25} r={Math.min(w, h) * 0.1} fill="#F4F1EA" />}
      {time !== "night" && weather === "clear" && <circle cx={x + w * 0.72} cy={y + h * 0.28} r={Math.min(w, h) * 0.11} fill={time === "dusk" ? C.orange : C.yellow} />}
      {view === "city" && new Array(5).fill(0).map((_, i) => { const bw = w / 5, bh = h * (0.25 + rnd(x + y, i) * 0.3); return <rect key={i} x={f1(x + i * bw)} y={f1(y + h - bh)} width={f1(bw - 3)} height={f1(bh)} fill={lit("#8A97B8", time)} />; })}
      {view === "trees" && [0, 1, 2].map((i) => <circle key={i} cx={x + w * (0.2 + i * 0.32)} cy={y + h * 0.95} r={w * 0.2} fill={lit(C.green, time)} />)}
      <WeatherFx kind={weather === "storm" ? "rain" : weather} f={f} x={x} y={y} w={w} h={h} intensity={1.4} />
      <rect x={x + w / 2 - 6} y={y} width={12} height={h} fill={frame} />
      <rect x={x} y={y + h / 2 - 6} width={w} height={12} fill={frame} />
      <rect x={x - 30} y={y + h + 10} width={w + 60} height={20} rx={6} fill={shade(frame, 0.1)} />
      {curtains && (
        <g>
          <path d={`M ${x - 40} ${y - 40} L ${x + w * 0.22} ${y - 40} Q ${x + w * 0.08} ${y + h * 0.5} ${x + w * 0.16} ${y + h + 20} L ${x - 40} ${y + h + 20} Z`} fill={curtains} />
          <path d={`M ${x + w + 40} ${y - 40} L ${x + w * 0.78} ${y - 40} Q ${x + w * 0.92} ${y + h * 0.5} ${x + w * 0.84} ${y + h + 20} L ${x + w + 40} ${y + h + 20} Z`} fill={shade(curtains, 0.08)} />
          <rect x={x - 60} y={y - 54} width={w + 120} height={16} rx={8} fill={C.greyDark} />
        </g>
      )}
    </g>
  );
};

export type FloorKind = "boards" | "tiles" | "checker" | "carpet" | "concrete";
/** Interior shell: back wall down to floorY, skirting board and a floor in simple perspective. */
export const Room: React.FC<{ time?: Time; wall?: string; floor?: string; floorY?: number; floorKind?: FloorKind; skirting?: boolean; panels?: boolean }> = ({
  time = "day", wall = "#F3E3C7", floor = "#C99A6B", floorY = 1360, floorKind = "boards", skirting = true, panels = true,
}) => {
  const W = lit(wall, time, true), F = lit(floor, time, true), vx = 540, vy = floorY - 900;
  const fan = (n: number) => new Array(n + 1).fill(0).map((_, i) => {
    const bx = -600 + (i * 2280) / n, tx = vx + (bx - vx) * ((floorY - vy) / (1920 - vy));
    return <line key={i} x1={f1(tx)} y1={floorY} x2={f1(bx)} y2={1920} stroke={shade(F, 0.14)} strokeWidth={4} />;
  });
  const rows = (n: number) => new Array(n).fill(0).map((_, i) => { const t = (i + 1) / (n + 1), yy = floorY + (1920 - floorY) * t * t; return <line key={i} x1={0} y1={f1(yy)} x2={1080} y2={f1(yy)} stroke={shade(F, 0.14)} strokeWidth={4} />; });
  return (
    <g>
      <rect x={0} y={0} width={1080} height={floorY} fill={W} />
      {panels && new Array(6).fill(0).map((_, i) => <rect key={i} x={i * 180 + 90} y={0} width={90} height={floorY} fill={shade(W, 0.03)} />)}
      <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={F} />
      {floorKind === "boards" && fan(14)}
      {floorKind === "tiles" && <g>{fan(10)}{rows(6)}</g>}
      {floorKind === "checker" && new Array(6).fill(0).map((_, r) => new Array(12).fill(0).map((__, c) => {
        if ((r + c) % 2) return null;
        const t0 = r / 6, t1 = (r + 1) / 6, y0 = floorY + (1920 - floorY) * t0 * t0, y1 = floorY + (1920 - floorY) * t1 * t1;
        const X = (b: number, yy: number) => vx + (b - vx) * ((yy - vy) / (1920 - vy));
        const b0 = -600 + (c * 2280) / 12, b1 = -600 + ((c + 1) * 2280) / 12;
        return <path key={`${r}-${c}`} d={`M ${f1(X(b0, y0))} ${f1(y0)} L ${f1(X(b1, y0))} ${f1(y0)} L ${f1(X(b1, y1))} ${f1(y1)} L ${f1(X(b0, y1))} ${f1(y1)} Z`} fill={shade(F, 0.3)} />;
      }))}
      {floorKind === "carpet" && <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={shade(F, 0.04)} />}
      {floorKind === "concrete" && new Array(10).fill(0).map((_, i) => <circle key={i} cx={f1(rnd(11, i) * 1080)} cy={f1(floorY + 40 + rnd(11, i + 20) * (1880 - floorY))} r={f1(4 + rnd(11, i + 40) * 6)} fill={shade(F, 0.08)} />)}
      {skirting && <rect x={0} y={floorY - 26} width={1080} height={30} fill={shade(W, 0.22)} />}
      <rect x={0} y={floorY} width={1080} height={10} fill={shade(F, 0.2)} opacity={0.6} />
    </g>
  );
};

/** Ceiling pendant lamp hanging from the top of the frame at x; glows when on. */
export const Lamp: React.FC<{ x: number; y?: number; on?: boolean; color?: string }> = ({ x, y = 260, on = true, color = C.navy }) => (
  <g>
    <rect x={x - 3} y={0} width={6} height={y - 50} fill={C.ink} />
    {on && <ellipse cx={x} cy={y + 30} rx={150} ry={70} fill="#FFE9A8" opacity={0.25} />}
    <path d={`M ${x - 70} ${y} L ${x - 30} ${y - 60} L ${x + 30} ${y - 60} L ${x + 70} ${y} Z`} fill={color} />
    <ellipse cx={x} cy={y} rx={70} ry={12} fill={shade(color, 0.25)} />
    <circle cx={x} cy={y + 8} r={16} fill={on ? "#FFF3C4" : C.greyLight} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), weather = asWeather(p.weather), seed = p.seed ?? 1;
  const drift = (p.anim ?? "drift") !== "none";
  if ((p.setting ?? "outdoor") === "indoor") {
    const floorY = p.floorY ?? 1360;
    return (
      <g>
        <Room time={time} wall={p.wall ?? "#F3E3C7"} floor={p.floor ?? "#C99A6B"} floorY={floorY} floorKind={p.floorKind ?? "boards"} />
        {p.showWindow !== false && <Window x={400} y={420} w={280} h={340} time={time} weather={weather} f={drift ? f : 0} curtains={p.curtains === "none" ? undefined : p.curtains ?? C.teal} />}
        {p.lamp !== false && <Lamp x={540} on={time === "night" || time === "dusk"} />}
      </g>
    );
  }
  const horizon = p.horizon ?? 1150, land = p.land ?? "hills", g = p.groundColor ?? C.green;
  return (
    <g>
      <Sky time={time} weather={weather} horizon={horizon} f={drift ? f : 0} seed={seed} />
      {land === "mountains" && <Mountains y={horizon + 60} color={lit("#7C86A8", time)} seed={seed} snow={p.snow ?? true} />}
      {land === "city" && <Skyline y={horizon + 80} color={lit("#6F7FA6", time)} seed={seed} lit={time === "night" || time === "dusk"} />}
      {(land === "hills" || land === "mountains") && <Hills y={horizon + 140} color={lit(shade(g, 0.12), time)} seed={seed + 1} amp={50} />}
      {land === "hills" && <TreeLine y={horizon + 210} color={lit(C.greenDark, time)} seed={seed} f={drift ? f : 0} size={0.8} />}
      <Ground y={land === "city" ? horizon + 78 : horizon + 280} color={weather === "snow" ? "#F2F5FA" : land === "city" ? undefined : g} kind={land === "city" ? "road" : "grass"} time={time} f={drift ? f : 0} />
      <WeatherFx kind={weather} f={f} seed={seed} />
    </g>
  );
}
