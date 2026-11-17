import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep078 Canary Girl – WWI munitionettes filled shells with TNT that turned their skin yellow; their factory football
// teams (Dick, Kerr Ladies: 53,000 at Goodison Park, 1920) were then shut out by the FA for 50 years.
// visual: { mode: "fill" | "turn" | "pitch" | "stadium", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, tint? (turn: [from,to] 0–1), kickAt? (pitch, 0–1) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EDBE96";
const CANARY = "#F2C42E";
const HAIR_N = "#6A3A1E";
const HAIR_Y = "#D9822B";
const KHAKI = "#7F7A45";
const KHAKI_HI = "#948E56";
const CAP = "#F6EEDC";
const BRASS = "#D9A93E";
const BRASS_D = "#A87A22";
const POWDER = "#F7D84A";
const WOOD = "#8A5A32";
const STEEL = "#8C949E";
const STEEL_D = "#646B75";
const STEEL_HI = "#C2CAD2";

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  const k = Math.max(0, Math.min(1, t));
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join("");
};

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 400 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 18) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 1.0, fontFamily: typeFont, fontSize: 54, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// golden TNT dust drifting up through the light
const Dust: React.FC<{ f: number; n?: number; o?: number }> = ({ f, n = 40, o = 0.8 }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const sp = 0.6 + ((k * 37) % 10) / 10;
      const y = 1900 - ((f * 3 * sp + k * 211) % 1900);
      const x = ((k * 263) % 1080) + Math.sin(f / 17 + k) * 30;
      const r = 3 + ((k * 13) % 7);
      return <circle key={k} cx={x} cy={y} r={r} fill={POWDER} opacity={o * (0.4 + 0.6 * Math.abs(Math.sin(f / 11 + k)))} />;
    })}
  </>
);

// bright shell-filling shop: warm walls, tall windows with light shafts, racks of brass shells, a bench
const Shop: React.FC<{ f: number; bench?: number }> = ({ f, bench = 1640 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#E7D3A0" />
    <rect x={0} y={0} width={1080} height={160} fill="#CDB57E" />
    {[90, 420, 750].map((x) => (
      <g key={x}>
        <rect x={x} y={200} width={240} height={420} fill="#FFF4CF" stroke={INK} strokeWidth={8} />
        <path d={`M ${x + 120} 200 L ${x + 120} 620 M ${x} 410 L ${x + 240} 410`} stroke={INK} strokeWidth={8} />
        <path d={`M ${x} 620 L ${x - 140} ${bench} L ${x + 380} ${bench} L ${x + 240} 620 Z`} fill="#FFF6D8" opacity={0.18 + Math.sin(f / 25 + x) * 0.03} />
      </g>
    ))}
    {/* racks of finished shells */}
    {[760, 1020].map((ry) => (
      <g key={ry}>
        <rect x={0} y={ry + 150} width={1080} height={22} fill={WOOD} stroke={INK} strokeWidth={6} />
        {new Array(12).fill(0).map((_, k) => (
          <g key={k} transform={`translate(${30 + k * 90} ${ry})`}>
            <path d="M 0 150 L 0 40 Q 0 0 30 -20 Q 60 0 60 40 L 60 150 Z" fill={STEEL} stroke={INK} strokeWidth={5} />
            <rect x={0} y={100} width={60} height={14} fill={BRASS_D} />
          </g>
        ))}
      </g>
    ))}
    <rect x={0} y={bench} width={1080} height={1920 - bench} fill={WOOD} />
    <path d={`M 0 ${bench} L 1080 ${bench}`} stroke={INK} strokeWidth={8} />
    <path d={`M 0 ${bench + 34} L 1080 ${bench + 34}`} stroke="#6A4224" strokeWidth={6} />
  </>
);

// an open brass shell case being filled; level 0..1 of yellow powder
const Shell: React.FC<{ x: number; y: number; s?: number; level?: number }> = ({ x, y, s = 1, level = 0.5 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 0 L -80 -360 L 80 -360 L 80 0 Z" fill={STEEL} stroke={INK} strokeWidth={8} />
    <rect x={-58} y={-350} width={22} height={340} fill={STEEL_HI} opacity={0.7} />
    <rect x={-80} y={-60} width={160} height={24} fill={BRASS_D} stroke={INK} strokeWidth={5} />
    <ellipse cx={0} cy={-360} rx={80} ry={22} fill={STEEL_D} stroke={INK} strokeWidth={8} />
    <ellipse cx={0} cy={-356} rx={66 * Math.min(1, 0.6 + level * 0.4)} ry={16} fill={POWDER} opacity={Math.min(1, level * 2)} />
    <text x={0} y={-150} textAnchor="middle" fontFamily={typeFont} fontSize={44} fill="#2C2F3B">TNT</text>
  </g>
);

const Arm: React.FC<{ sx: number; sy: number; hx: number; hy: number; out: number; skin: string; sleeve: string }> = ({ sx, sy, hx, hy, out, skin, sleeve }) => {
  const ex = (sx + hx) / 2 + out;
  const ey = Math.max(sy, hy) + 40;
  return (
    <g>
      <path d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke={INK} strokeWidth={72} strokeLinecap="round" />
      <path d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke={sleeve} strokeWidth={60} strokeLinecap="round" />
      <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={52} strokeLinecap="round" />
      <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={skin} strokeWidth={40} strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={31} fill={skin} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// The munitionette, waist-up, origin = belt centre. tint 0 (normal skin) .. 1 (canary yellow)
// pose: "pour" (scoop over the shell on her right/our left) | "still"
export const Munitionette: React.FC<{ x: number; y: number; s?: number; f: number; tint?: number; pose?: "pour" | "still"; look?: number; worried?: boolean; shirt?: string }> = ({ x, y, s = 1, f, tint = 1, pose = "pour", look = -0.6, worried = false, shirt }) => {
  const skin = mix(SKIN, CANARY, tint);
  const skinD = mix("#CF9670", "#D4A21C", tint);
  const hair = mix(HAIR_N, HAIR_Y, tint);
  const body = shirt ?? KHAKI;
  const breathe = Math.sin(f / 13) * 3;
  const px = look * 9;
  const tilt = pose === "pour" ? 18 + Math.sin(f / 7) * 10 : 0;
  const hx = -255;
  const hy = -300 + Math.sin(f / 7) * 6;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* overall */}
        <path d="M -155 -380 Q 0 -418 155 -380 L 170 520 L -170 520 Z" fill={body} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 0 -398 L 0 520" stroke={shirt ? "#FFFFFF" : KHAKI_HI} strokeWidth={10} />
        {shirt ? null : (
          <>
            <rect x={-100} y={-120} width={80} height={90} rx={8} fill={KHAKI_HI} stroke={INK} strokeWidth={5} />
            <path d="M -170 160 L 170 160" stroke="#5E5A30" strokeWidth={26} />
            <circle cx={0} cy={160} r={22} fill={BRASS} stroke={INK} strokeWidth={5} />
          </>
        )}
        {/* neck */}
        <rect x={-32} y={-452} width={64} height={72} fill={skinD} stroke={INK} strokeWidth={6} />
        <path d="M -80 -392 L 0 -330 L 80 -392" stroke={INK} strokeWidth={7} fill={shirt ? "#FFFFFF" : "#E9E1C8"} />
        {/* head */}
        <ellipse cx={0} cy={-522} rx={96} ry={108} fill={skin} stroke={INK} strokeWidth={7} />
        {/* hair poking from the cap */}
        <path d="M -100 -540 Q -118 -470 -92 -440 L -80 -500 Z M 100 -540 Q 118 -470 92 -440 L 80 -500 Z" fill={hair} stroke={INK} strokeWidth={5} />
        {/* mob cap with ruffle */}
        <path d="M -132 -560 Q -140 -700 0 -712 Q 140 -700 132 -560 Q 0 -600 -132 -560 Z" fill={CAP} stroke={INK} strokeWidth={7} />
        {new Array(9).fill(0).map((_, k) => (
          <circle key={k} cx={-120 + k * 30} cy={-566 + Math.abs(k - 4) * -2} r={17} fill={CAP} stroke={INK} strokeWidth={4} />
        ))}
        <path d="M -60 -660 Q 0 -680 60 -660" stroke="#D9CFB6" strokeWidth={6} fill="none" />
        {/* eyes + brows */}
        <ellipse cx={-40} cy={-518} rx={17} ry={worried ? 15 : 12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <ellipse cx={40} cy={-518} rx={17} ry={worried ? 15 : 12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={-40 + px} cy={-515} r={8} fill={INK} />
        <circle cx={40 + px} cy={-515} r={8} fill={INK} />
        <path d={worried ? "M -64 -548 L -22 -560 M 64 -548 L 22 -560" : "M -62 -548 L -22 -552 M 62 -548 L 22 -552"} stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M -4 -500 q -10 26 6 30" stroke={skinD} strokeWidth={5} fill="none" />
        <ellipse cx={-62} cy={-478} rx={18} ry={9} fill="#E58C3A" opacity={0.45} />
        <ellipse cx={62} cy={-478} rx={18} ry={9} fill="#E58C3A" opacity={0.45} />
        <path d={worried ? "M -22 -446 Q 0 -458 22 -446" : "M -22 -450 Q 0 -436 22 -450"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        {pose === "pour" ? (
          <>
            <Arm sx={-125} sy={-350} hx={-180} hy={40} out={-70} skin={skin} sleeve={body} />
            <Arm sx={125} sy={-350} hx={hx + 40} hy={hy + 10} out={120} skin={skin} sleeve={body} />
            <g transform={`translate(${hx} ${hy}) rotate(${-tilt})`}>
              <path d="M -110 -30 L 10 -30 L 10 34 Q -60 50 -110 30 Z" fill={BRASS} stroke={INK} strokeWidth={6} />
              <path d="M -104 -22 L 4 -22 L 4 0 L -104 0 Z" fill={POWDER} />
              <rect x={10} y={-8} width={70} height={18} rx={8} fill={WOOD} stroke={INK} strokeWidth={5} />
            </g>
          </>
        ) : (
          <>
            <Arm sx={-125} sy={-350} hx={-150} hy={30} out={-60} skin={skin} sleeve={body} />
            <Arm sx={125} sy={-350} hx={150} hy={30} out={60} skin={skin} sleeve={body} />
          </>
        )}
      </g>
    </g>
  );
};

// full-body footballer, origin = hips. kick = leg angle (deg, + forward). kit = [shirt, stripe, shorts]
const Player: React.FC<{ x: number; y: number; s?: number; f: number; kick?: number; tint?: number; kit?: [string, string, string]; cap?: boolean; run?: boolean; hair?: string }> = ({ x, y, s = 1, f, kick = 0, tint = 0, kit = ["#F6EEDC", "#2F4A7A", "#1E2A47"], cap = true, run = false, hair }) => {
  const skin = mix(SKIN, CANARY, tint);
  const a = run ? Math.sin(f / 4) * 35 : kick;
  const b = run ? -Math.sin(f / 4) * 35 : -8;
  const leg = (ang: number, sock: string) => (
    <g transform={`rotate(${-ang})`}>
      <path d="M 0 0 L 0 300" stroke={INK} strokeWidth={62} strokeLinecap="round" />
      <path d="M 0 0 L 0 300" stroke={skin} strokeWidth={50} strokeLinecap="round" />
      <path d="M 0 190 L 0 300" stroke={sock} strokeWidth={52} strokeLinecap="round" />
      <path d="M -20 300 L 50 300 Q 62 330 30 336 L -26 336 Z" fill="#3A2614" stroke={INK} strokeWidth={6} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform="translate(-40 60)">{leg(b, kit[1])}</g>
      <g transform="translate(40 60)">{leg(a, kit[1])}</g>
      <path d="M -95 0 L 95 0 L 105 110 L -105 110 Z" fill={kit[2]} stroke={INK} strokeWidth={6} />
      <path d="M -100 -280 Q 0 -305 100 -280 L 105 20 L -105 20 Z" fill={kit[0]} stroke={INK} strokeWidth={7} />
      {[-60, 0, 60].map((k) => (
        <rect key={k} x={k - 14} y={-288} width={28} height={300} fill={kit[1]} opacity={0.9} />
      ))}
      <path d="M -100 -270 L -170 -120 M 100 -270 L 170 -110" stroke={INK} strokeWidth={50} strokeLinecap="round" />
      <path d="M -100 -270 L -170 -120 M 100 -270 L 170 -110" stroke={skin} strokeWidth={38} strokeLinecap="round" />
      <ellipse cx={0} cy={-370} rx={70} ry={80} fill={skin} stroke={INK} strokeWidth={6} />
      {hair ? <path d="M -72 -380 Q -70 -462 0 -458 Q 70 -462 72 -380 Q 40 -420 0 -418 Q -40 -420 -72 -380 Z" fill={hair} stroke={INK} strokeWidth={5} /> : null}
      {cap ? <path d="M -92 -400 Q -90 -480 0 -486 Q 90 -480 92 -400 Q 0 -428 -92 -400 Z" fill={CAP} stroke={INK} strokeWidth={6} /> : null}
      <circle cx={-24} cy={-372} r={7} fill={INK} />
      <circle cx={24} cy={-372} r={7} fill={INK} />
      <path d="M -20 -332 Q 0 -318 20 -332" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Ball: React.FC<{ x: number; y: number; r: number; spin: number; old?: boolean }> = ({ x, y, r, spin, old = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${spin})`}>
    <circle cx={0} cy={0} r={r} fill={old ? "#9A5A2A" : "#FFFFFF"} stroke={INK} strokeWidth={Math.max(3, r / 12)} />
    {old ? (
      <>
        <path d={`M ${-r} 0 Q 0 ${-r * 0.5} ${r} 0 M ${-r} 0 Q 0 ${r * 0.5} ${r} 0 M 0 ${-r} L 0 ${r}`} stroke="#5E3416" strokeWidth={Math.max(2, r / 16)} fill="none" />
        <path d={`M ${-r * 0.2} ${-r * 0.3} l ${r * 0.4} 0 M ${-r * 0.2} ${-r * 0.15} l ${r * 0.4} 0`} stroke="#F4EAD5" strokeWidth={Math.max(2, r / 22)} />
      </>
    ) : (
      <>
        <path d={`M 0 ${-r * 0.35} L ${r * 0.33} ${-r * 0.1} L ${r * 0.2} ${r * 0.3} L ${-r * 0.2} ${r * 0.3} L ${-r * 0.33} ${-r * 0.1} Z`} fill={INK} />
        <path d={`M ${-r * 0.9} ${-r * 0.3} L ${-r * 0.6} ${-r * 0.1} M ${r * 0.9} ${-r * 0.3} L ${r * 0.6} ${-r * 0.1} M 0 ${r} L 0 ${r * 0.6}`} stroke={INK} strokeWidth={Math.max(2, r / 14)} />
      </>
    )}
  </g>
);

// terraces packed with a crowd; modern = colourful + phone lights
const Crowd: React.FC<{ f: number; top: number; bottom: number; modern?: boolean }> = ({ f, top, bottom, modern = false }) => {
  const rows = Math.floor((bottom - top) / 34);
  const cols1920 = ["#3A2E22", "#5A4632", "#7A6248", "#2C2F3B", "#8A7A62"];
  const colsNow = ["#E8443A", "#F2F2F2", "#2F6FD6", "#F2B544", "#7A3AA8", "#1E2A47"];
  return (
    <>
      <rect x={0} y={top} width={1080} height={bottom - top} fill={modern ? "#1A1530" : "#6A5A44"} />
      {new Array(rows).fill(0).map((_, r) =>
        new Array(28).fill(0).map((__, k) => {
          const cx = k * 40 + (r % 2) * 20 + 10;
          const cy = top + 20 + r * 34 + Math.sin(f / 5 + k + r) * (modern ? 3 : 1.5);
          const col = (modern ? colsNow : cols1920)[(k * 7 + r * 3) % (modern ? 6 : 5)];
          const flash = modern && (k * 13 + r * 7 + Math.floor(f / 6)) % 37 === 0;
          return (
            <g key={`${r}-${k}`}>
              <circle cx={cx} cy={cy} r={13} fill={col} />
              {flash ? <circle cx={cx} cy={cy - 4} r={9} fill="#FFFFFF" /> : null}
            </g>
          );
        }),
      )}
    </>
  );
};

export const CanaryGirl: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "fill";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;

  if (mode === "fill") {
    // frame 0: big canary-yellow munitionette pouring TNT powder from a scoop into a brass shell
    const s = 1.6;
    const gx = 690;
    const gy = 1650;
    const tilt = 18 + Math.sin(f / 7) * 10;
    const hx = gx + s * -255;
    const hy = gy + s * (-300 + Math.sin(f / 7) * 6);
    const lipX = hx - s * 105 * Math.cos((tilt * Math.PI) / 180);
    const lipY = hy + s * 105 * Math.sin((tilt * Math.PI) / 180) - 10;
    const shellX = 175;
    const shellTop = 1700 - 360 * 1.2;
    const level = interpolate(f, [0, Math.max(30, dur)], [0.35, 0.9], clamp);
    body = (
      <>
        <Shop f={f} bench={1640} />
        <Shell x={shellX} y={1700} s={1.2} level={level} />
        {new Array(16).fill(0).map((_, k) => {
          const p = ((f * 0.09 + k / 16) % 1);
          const xx = lipX + (shellX - lipX) * p + Math.sin(k * 3.1 + f / 3) * 10;
          const yy = lipY + (shellTop - lipY) * p;
          return <circle key={k} cx={xx} cy={yy} r={7 + (k % 3) * 2} fill={POWDER} stroke="#C9A21E" strokeWidth={2} />;
        })}
        <Munitionette x={gx} y={gy} s={s} f={f} tint={1} pose="pour" look={-0.8} />
        <Dust f={f} n={46} o={0.85} />
        <defs>
          <radialGradient id="ep078vig" cx="0.5" cy="0.45" r="0.8">
            <stop offset="0.55" stopColor="#3A2A00" stopOpacity={0} />
            <stop offset="1" stopColor="#3A2A00" stopOpacity={0.45} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep078vig)" />
      </>
    );
  } else if (mode === "turn") {
    // close-up: her skin drains from normal to canary yellow as we watch
    const [t0, t1] = (v.tint as [number, number]) ?? [0, 1];
    const [a0, a1] = (v.tintAt as [number, number]) ?? [0.12, 0.7];
    const tint = interpolate(f, [dur * a0, dur * a1], [t0, t1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    body = (
      <>
        <Shop f={f} bench={2000} />
        <rect x={0} y={0} width={1080} height={1920} fill="#2A1E00" opacity={0.28} />
        <Munitionette x={540} y={2230} s={2.6} f={f} tint={tint} pose="still" look={0} worried={tint > 0.6} />
        <Dust f={f} n={36} o={0.7} />
      </>
    );
  } else if (mode === "pitch") {
    // 1920s muddy works pitch; she boots the leather ball straight at the camera
    const kickAt = Math.round((v.kickAt ?? 0.6) * dur);
    const kick = interpolate(f, [kickAt - 10, kickAt - 2, kickAt + 4], [-35, -40, 75], clamp);
    const p = interpolate(f, [kickAt, kickAt + 12], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const bx = interpolate(p, [0, 1], [700, 540]);
    const by = interpolate(p, [0, 1], [1800, 980]);
    const br = interpolate(p, [0, 1], [38, 760]);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1160} fill="#A8503A" />
        {new Array(19).fill(0).map((_, r) => (
          <g key={r}>
            <path d={`M 0 ${r * 62} L 1080 ${r * 62}`} stroke="#7A3626" strokeWidth={6} />
            {new Array(7).fill(0).map((__, k) => (
              <path key={k} d={`M ${k * 170 + (r % 2) * 85} ${r * 62} l 0 62`} stroke="#7A3626" strokeWidth={6} />
            ))}
          </g>
        ))}
        {[120, 450, 780].map((x) => (
          <g key={x}>
            <rect x={x} y={360} width={200} height={300} fill="#F4E6B8" stroke={INK} strokeWidth={8} />
            <path d={`M ${x + 100} 360 L ${x + 100} 660 M ${x} 510 L ${x + 200} 510`} stroke={INK} strokeWidth={8} />
          </g>
        ))}
        <rect x={0} y={150} width={1080} height={110} fill="#2C2F3B" />
        <text x={540} y={232} textAnchor="middle" fontFamily={typeFont} fontSize={72} fill="#F4EAD5">DICK, KERR &amp; CO · PRESTON</text>
        <rect x={0} y={1160} width={1080} height={760} fill="#8A8A82" />
        {new Array(9).fill(0).map((_, r) =>
          new Array(10).fill(0).map((__, k) => (
            <rect key={`${r}-${k}`} x={k * 112 + (r % 2) * 56 - 20} y={1170 + r * 86} width={100} height={74} rx={14} fill={r % 3 ? "#9A9A90" : "#7E7E76"} stroke="#5E5E58" strokeWidth={4} />
          )),
        )}
        <Player x={200} y={1330} s={0.8} f={f} kick={-10} kit={["#3A3A44", "#3A3A44", "#2C2C34"]} cap hair="#3A2614" />
        <Player x={640} y={1410} s={1.15} f={f} kick={kick} tint={0.3} kit={[KHAKI, KHAKI_HI, KHAKI]} />
        <Ball x={bx} y={by} r={br} spin={f * 14} />
      </>
    );
  } else if (mode === "stadium") {
    // today: a packed, floodlit stadium; the old leather ball lands a century later as a modern one
    const p = interpolate(f, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const br = interpolate(p, [0, 1], [760, 30]);
    const bx = interpolate(p, [0, 1], [540, 470]);
    const by = interpolate(p, [0, 1], [980, 1660]);
    body = (
      <>
        <defs>
          <linearGradient id="ep078sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E2A60" />
            <stop offset="0.6" stopColor="#6A3A8A" />
            <stop offset="1" stopColor="#F28A4A" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={420} fill="url(#ep078sky)" />
        <Crowd f={f} top={380} bottom={1060} modern />
        <path d="M 0 380 Q 540 300 1080 380" stroke="#C8C8D8" strokeWidth={18} fill="none" />
        {[70, 1010].map((x) => (
          <g key={x}>
            <rect x={x - 10} y={120} width={20} height={300} fill="#8A8AA0" stroke={INK} strokeWidth={4} />
            <rect x={x - 70} y={70} width={140} height={70} rx={8} fill="#F4F4FF" stroke={INK} strokeWidth={5} />
            <circle cx={x} cy={105} r={220} fill="#FFFBE0" opacity={0.18 + Math.sin(f / 9) * 0.02} />
          </g>
        ))}
        {new Array(10).fill(0).map((_, k) => (
          <rect key={k} x={0} y={1060 + k * 86} width={1080} height={86} fill={k % 2 ? "#3E9A48" : "#46A852"} />
        ))}
        <path d="M 0 1180 L 1080 1180 M 540 1060 L 540 1920" stroke="#FFFFFF" strokeWidth={10} opacity={0.85} />
        <ellipse cx={540} cy={1420} rx={300} ry={120} stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.85} />
        <Player x={760} y={1330} s={0.75} f={f} run kit={["#C8323A", "#C8323A", "#FFFFFF"]} cap={false} hair="#D9822B" />
        <Player x={360} y={1420} s={0.9} f={f + 7} run kit={["#FFFFFF", "#E8E8F0", "#1E2A47"]} cap={false} hair="#3A2614" />
        <Ball x={bx} y={by} r={br} spin={f * 12} old={p < 0.6} />
      </>
    );
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline key={v.headline} text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 400} />
    </Backdrop>
  );
};
