import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure, FigureSpec } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep037 Rivet Catcher – hot-rivet gang high on the steel.
// visual: { mode: "toss" | "forge" | "gang" | "net" | "now", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, figure?, value?, label?, thenLabel?, nowLabel?, thenCaption?, nowCaption? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const STEEL = "#5B6170";
const STEEL_D = "#3E4350";
const STEEL_L = "#7D8494";
const HOT = "#FF5A1F";
const HOT_C = "#FFD25A";
const ORANGE = "#C0362C"; // Golden Gate "International Orange"-ish
const TIN = "#9FA3A8";
const HAT = "#F5C518";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(10, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + Math.floor(i / 2) * 120 + (i % 2) * 40 - Math.min(age, 20) * 1.2, fontFamily: typeFont, fontSize: 50, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// horizontal I-beam with rivet heads
const Beam: React.FC<{ x: number; y: number; w: number; h?: number }> = ({ x, y, w, h = 70 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={STEEL} stroke={INK} strokeWidth={6} />
    <rect x={x} y={y} width={w} height={14} fill={STEEL_L} stroke={INK} strokeWidth={4} />
    <rect x={x} y={y + h - 14} width={w} height={14} fill={STEEL_D} stroke={INK} strokeWidth={4} />
    {new Array(Math.max(1, Math.floor(w / 70))).fill(0).map((_, k) => (
      <circle key={k} cx={x + 35 + k * 70} cy={y + h / 2} r={7} fill={STEEL_D} stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

// vertical column
const Column: React.FC<{ x: number; y: number; h: number; w?: number }> = ({ x, y, h, w = 70 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={STEEL_D} stroke={INK} strokeWidth={6} />
    <rect x={x + w / 2 - 6} y={y} width={12} height={h} fill={STEEL} opacity={0.7} />
    {new Array(Math.max(1, Math.floor(h / 90))).fill(0).map((_, k) => (
      <circle key={k} cx={x + w / 2} cy={y + 45 + k * 90} r={6} fill={STEEL} stroke={INK} strokeWidth={3} />
    ))}
  </g>
);

// tiny city far below
const CityBelow: React.FC<{ y: number; f: number }> = ({ y, f }) => (
  <g>
    <rect x={0} y={y} width={1080} height={1920 - y} fill="#9DB3C4" />
    {new Array(16).fill(0).map((_, k) => {
      const bw = 50 + random(`cw${k}`) * 40;
      const bh = 60 + random(`ch${k}`) * 160;
      const bx = k * 70 - 20;
      return <rect key={k} x={bx} y={y + 260 - bh} width={bw} height={bh + 400} fill={k % 3 ? "#7F95A8" : "#6E8397"} stroke="#5A6C7E" strokeWidth={2} />;
    })}
    {/* toy traffic */}
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={((f * (2 + k) + k * 260) % 1180) - 50} y={y + 300 + k * 6} width={14} height={7} fill={k % 2 ? C.brick : C.mustard} />
    ))}
    <rect x={0} y={y} width={1080} height={1920 - y} fill="#EAF2F6" opacity={0.35} />
  </g>
);

// the glowing rivet (a short cylinder with a domed head), heat 0..1
const HotRivet: React.FC<{ x: number; y: number; s?: number; rot?: number; heat?: number }> = ({ x, y, s = 1, rot = 0, heat = 1 }) => {
  const body = heat > 0.5 ? HOT : heat > 0.2 ? "#B0503A" : STEEL;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {heat > 0.3 ? <circle cx={0} cy={0} r={46} fill={HOT_C} opacity={0.35 * heat} /> : null}
      <rect x={-11} y={-6} width={22} height={50} rx={5} fill={body} stroke={INK} strokeWidth={4} />
      <path d="M -22 -4 Q 0 -30 22 -4 Z" fill={body} stroke={INK} strokeWidth={4} />
      {heat > 0.5 ? <rect x={-4} y={2} width={6} height={30} rx={3} fill={HOT_C} opacity={0.9} /> : null}
    </g>
  );
};

// tin bucket (catch can)
const Bucket: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 ? <ellipse cx={0} cy={-6} rx={70} ry={30} fill={HOT_C} opacity={0.6 * glow} /> : null}
    <path d="M -55 -10 L 55 -10 L 42 90 L -42 90 Z" fill={TIN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-10} rx={55} ry={14} fill="#6E7378" stroke={INK} strokeWidth={6} />
    <path d="M -40 20 L 38 20 M -36 55 L 34 55" stroke="#C7CBD0" strokeWidth={5} />
  </g>
);

const Sparks: React.FC<{ x: number; y: number; f: number; n?: number; spread?: number; seed?: string }> = ({ x, y, f, n = 10, spread = 120, seed = "s" }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const per = 16 + Math.floor(random(`${seed}p${k}`) * 10);
      const age = (f + k * 3) % per;
      const p = age / per;
      const dx = (random(`${seed}x${k}`) - 0.5) * spread * 2 * p;
      const dy = -p * (90 + random(`${seed}y${k}`) * 160) + p * p * 60;
      return <circle key={k} cx={x + dx} cy={y + dy} r={5 * (1 - p) + 1} fill={k % 2 ? HOT_C : HOT} opacity={1 - p} />;
    })}
  </>
);

const Smoke: React.FC<{ x: number; y: number; f: number; start: number }> = ({ x, y, f, start }) => (
  <>
    {[0, 1, 2].map((k) => {
      const age = f - start - k * 3;
      if (age < 0 || age > 30) return null;
      const p = age / 30;
      return <circle key={k} cx={x + (k - 1) * 30 + p * 20} cy={y - p * 140} r={20 + p * 40} fill="#E9E6E0" opacity={0.7 * (1 - p)} />;
    })}
  </>
);

const DEFAULT_FIG: FigureSpec = { hat: "cap", coat: "#4E5D6C", scarf: C.brick, skirt: false, prop: "none", action: "idle" };

const HardHat: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 20 Q -120 -110 0 -115 Q 120 -110 120 20 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -10 -112 L -10 20 M 10 -112 L 10 20" stroke="#D9A90F" strokeWidth={8} />
    <path d="M -160 20 Q 0 50 160 20 L 150 42 Q 0 70 -150 42 Z" fill={HAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -70 -80 Q -40 -100 -10 -102" stroke="#FFF3B0" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

const bez = (p: number, a: [number, number], c: [number, number], b: [number, number]) => {
  const q = 1 - p;
  return [q * q * a[0] + 2 * q * p * c[0] + p * p * b[0], q * q * a[1] + 2 * q * p * c[1] + p * p * b[1]];
};

export const Rivet: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "toss";
  const fig: FigureSpec = { ...DEFAULT_FIG, ...(v.figure ?? {}) };
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" | "modern" = "day";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;

  if (mode === "toss") {
    // heater on the lower beam throws a glowing rivet; the catcher snaps it into his tin bucket
    const PER = 30;
    const FLY = 19;
    const t = (f + 9) % PER;
    const p = Math.min(1, t / FLY);
    const A: [number, number] = [330, 1110];
    const B: [number, number] = [705, 770];
    const CTRL: [number, number] = [470, 470];
    const [rx, ry] = bez(p, A, CTRL, B);
    const landed = t >= FLY;
    const landAge = landed ? t - FLY : 99;
    const glow = landed ? 1 - landAge / (PER - FLY) : 0;
    const throwArm = interpolate(t, [0, 4, PER - 6, PER], [-150, -40, -30, -150], clamp);
    const jolt = landed ? Math.max(0, 1 - landAge / 4) * 10 : 0;
    body = (
      <>
        <CityBelow y={1480} f={f} />
        <Column x={40} y={160} h={1560} />
        <Column x={960} y={0} h={1300} />
        <Beam x={0} y={1450} w={660} />
        <Beam x={500} y={1180} w={580} />
        {/* heater + forge on the lower beam */}
        <Figure {...fig} coat="#6B4E3A" x={200} y={1450} scale={1.0} facing="right" />
        <g transform={`rotate(${throwArm + 180} 200 1140)`}>
          <rect x={186} y={1140} width={28} height={130} rx={14} fill="#6B4E3A" stroke={INK} strokeWidth={5} />
          <path d="M 196 1265 L 192 1330 M 206 1265 L 214 1330" stroke={INK} strokeWidth={6} />
        </g>
        <g transform="translate(420 1450)">
          <path d="M -70 -110 L 70 -110 L 55 -40 L -55 -40 Z" fill="#3A3330" stroke={INK} strokeWidth={6} />
          <path d="M -50 -40 L -60 0 M 50 -40 L 60 0" stroke={INK} strokeWidth={8} />
          <ellipse cx={0} cy={-112} rx={66} ry={16} fill={HOT} opacity={0.75 + 0.25 * Math.sin(f / 3)} />
          <ellipse cx={0} cy={-118} rx={46} ry={10} fill={HOT_C} opacity={0.8} />
        </g>
        <Sparks x={420} y={1338} f={f} n={8} spread={50} seed="fg" />
        {/* catcher on the upper beam, bucket held out */}
        <g transform={`translate(0 ${jolt * 0.4})`}>
          <Figure {...fig} x={860} y={1180} scale={1.15} facing="left" />
          <path d={`M 880 ${830} Q 800 ${800 + jolt} 735 ${790 + jolt}`} stroke={fig.coat ?? DEFAULT_FIG.coat} strokeWidth={36} fill="none" strokeLinecap="round" />
          <circle cx={732} cy={794 + jolt} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
          <Bucket x={700} y={760 + jolt} s={1.15} glow={glow} />
        </g>
        {/* rivet + comet trail */}
        {!landed
          ? [5, 4, 3, 2, 1].map((k) => {
              const pp = Math.max(0, p - k * 0.035);
              const [tx, ty] = bez(pp, A, CTRL, B);
              return <circle key={k} cx={tx} cy={ty} r={14 - k * 2} fill={k < 3 ? HOT_C : HOT} opacity={0.55 - k * 0.09} />;
            })
          : null}
        {!landed ? <HotRivet x={rx} y={ry} s={1.2} rot={f * 25} /> : null}
        {landed ? <Sparks x={705} y={745} f={landAge} n={10} spread={90} seed="land" /> : null}
        {landed ? <Smoke x={705} y={740} f={landAge} start={0} /> : null}
      </>
    );
  } else if (mode === "forge") {
    // close-up: tongs pull a cherry-red rivet out of the coals
    sky = "paper";
    const lift = interpolate(f, [4, 26], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const rx = 540 + lift * 60;
    const ry = 1260 - lift * 380;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2A2220" opacity={0.85} />
        {/* heat shimmer */}
        {new Array(6).fill(0).map((_, k) => (
          <path key={k} d={`M ${200 + k * 130} 1150 q 20 -60 0 -120 q -20 -60 0 -120`} stroke={HOT_C} strokeWidth={5} fill="none" opacity={0.12 + 0.1 * Math.sin(f / 5 + k)} transform={`translate(0 ${-((f * 3 + k * 40) % 120)})`} />
        ))}
        {/* brazier */}
        <path d="M 160 1250 L 920 1250 L 840 1560 L 240 1560 Z" fill="#3A3330" stroke={INK} strokeWidth={8} />
        <ellipse cx={540} cy={1250} rx={380} ry={60} fill="#5A1A10" stroke={INK} strokeWidth={8} />
        {new Array(22).fill(0).map((_, k) => {
          const cx = 200 + random(`co${k}`) * 680;
          const cy = 1235 + random(`cy${k}`) * 40;
          const g = 0.6 + 0.4 * Math.sin(f / 4 + k);
          return <ellipse key={k} cx={cx} cy={cy} rx={34} ry={16} fill={k % 3 ? HOT : HOT_C} opacity={g} stroke={INK} strokeWidth={3} />;
        })}
        {/* other rivets heating in the coals */}
        {[380, 470, 660, 740].map((x, k) => (
          <HotRivet key={x} x={x} y={1215} s={1.3} rot={80 + k * 15} heat={0.9} />
        ))}
        <Sparks x={540} y={1230} f={f} n={14} spread={260} seed="fz" />
        {/* tongs from the right */}
        <path d={`M 1120 ${ry - 140} L ${rx + 30} ${ry - 8}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
        <path d={`M 1120 ${ry - 100} L ${rx + 30} ${ry + 18}`} stroke={STEEL_D} strokeWidth={18} strokeLinecap="round" />
        <HotRivet x={rx} y={ry} s={3.2} rot={-70} heat={1} />
        <Sparks x={rx} y={ry} f={f} n={8} spread={100} seed="tr" />
        <circle cx={rx} cy={ry} r={260} fill={HOT} opacity={0.08 + 0.04 * Math.sin(f / 3)} />
      </>
    );
  } else if (mode === "gang") {
    // side view of the joint: rivet goes in, holder-on presses the dolly, riveter hammers the tail into a dome
    sky = "paper";
    const pIn = interpolate(f, [0, dur * 0.2], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const pDolly = interpolate(f, [dur * 0.18, dur * 0.32], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
    const pHam = interpolate(f, [dur * 0.32, dur * 0.85], [0, 1], clamp);
    const hammering = pHam > 0 && pHam < 1;
    const shake = hammering ? Math.sin(f * 2.7) * 7 : 0;
    const heat = interpolate(f, [dur * 0.5, dur], [1, 0.15], clamp);
    const PY = 960;
    const headX = 380 + (1 - pIn) * -420;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#E3D3B0" />
        {/* the two steel plates being joined */}
        <rect x={420} y={560} width={110} height={800} fill={STEEL} stroke={INK} strokeWidth={8} />
        <rect x={530} y={600} width={110} height={760} fill={STEEL_L} stroke={INK} strokeWidth={8} />
        {[700, 1220].map((y) => (
          <g key={y}>
            <path d={`M 400 ${y - 30} Q 380 ${y} 400 ${y + 30} L 420 ${y + 30} L 420 ${y - 30} Z`} fill={STEEL_D} stroke={INK} strokeWidth={5} />
            <rect x={640} y={y - 20} width={30} height={40} rx={18} fill={STEEL_D} stroke={INK} strokeWidth={5} />
          </g>
        ))}
        {/* the hot rivet (horizontal): head on the left, tail through to the right */}
        <g transform={`translate(${headX} ${PY})`}>
          <circle cx={0} cy={0} r={150} fill={HOT_C} opacity={0.25 * heat} />
          <rect x={30} y={-26} width={250} height={52} fill={heat > 0.5 ? HOT : heat > 0.25 ? "#B0503A" : STEEL} stroke={INK} strokeWidth={6} />
          <path d="M 40 -60 Q -20 0 40 60 Z" fill={heat > 0.5 ? HOT : heat > 0.25 ? "#B0503A" : STEEL} stroke={INK} strokeWidth={6} />
          {/* tail grows into a dome as it is hammered */}
          <path d={`M 280 ${-26 - pHam * 30} Q ${280 + 20 + pHam * 40} 0 280 ${26 + pHam * 30} Z`} fill={heat > 0.5 ? HOT : heat > 0.25 ? "#B0503A" : STEEL} stroke={INK} strokeWidth={6} />
        </g>
        {/* catcher's tongs carrying it in */}
        {pIn < 1 ? (
          <path d={`M ${headX + 120} ${PY - 40} L ${headX - 240} ${PY - 380}`} stroke={INK} strokeWidth={18} strokeLinecap="round" />
        ) : null}
        {/* holder-on's dolly bar from the left */}
        <g transform={`translate(${(1 - pDolly) * -500} ${shake * 0.2})`}>
          <rect x={-40} y={PY - 45} width={360} height={90} rx={12} fill={STEEL_D} stroke={INK} strokeWidth={8} />
          <path d={`M 320 ${PY - 45} Q 345 ${PY} 320 ${PY + 45}`} fill={STEEL_D} stroke={INK} strokeWidth={8} />
          <circle cx={120} cy={PY + 45} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
        {/* riveter's pneumatic hammer from the right */}
        <g transform={`translate(${(pHam > 0 ? 0 : 600) + shake} ${shake * 0.5})`}>
          <rect x={720} y={PY - 30} width={90} height={60} fill="#7A6F64" stroke={INK} strokeWidth={8} />
          <rect x={800} y={PY - 70} width={260} height={140} rx={20} fill="#2E2A28" stroke={INK} strokeWidth={8} />
          <rect x={900} y={PY + 60} width={60} height={150} rx={14} fill="#2E2A28" stroke={INK} strokeWidth={8} />
          <path d={`M 960 ${PY + 200} Q 1060 ${PY + 320} 1100 ${PY + 480}`} stroke={INK} strokeWidth={22} fill="none" />
          <circle cx={930} cy={PY + 110} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
        {hammering ? <Sparks x={690} y={PY} f={f} n={12} spread={120} seed="hm" /> : null}
        {hammering ? (
          <g opacity={0.7}>
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M ${720 + k * 30} ${PY - 140 - k * 20} l 20 -40`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={(f + k) % 4 < 2 ? 1 : 0.2} />
            ))}
          </g>
        ) : null}
        <Smoke x={690} y={PY - 40} f={f} start={Math.round(dur * 0.86)} />
      </>
    );
  } else if (mode === "net") {
    // Golden Gate: a man slips off the deck and drops into the safety net
    sky = "day";
    const FALL0 = 6;
    const fallP = interpolate(f, [FALL0, FALL0 + 16], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const after = Math.max(0, f - FALL0 - 16);
    const bounce = fallP >= 1 ? Math.sin(after / 3) * 40 * Math.exp(-after / 10) : 0;
    const sag = fallP >= 1 ? 60 + bounce : 0;
    const manY = interpolate(fallP, [0, 1], [880, 1210]) - bounce;
    const count = Math.round(interpolate(f, [4, Math.min(dur - 6, 40)], [0, v.value ?? 19], clamp));
    body = (
      <>
        {/* fog + water */}
        <rect x={0} y={1400} width={1080} height={520} fill="#5C7F95" />
        {new Array(7).fill(0).map((_, k) => (
          <line key={k} x1={(k * 173 + f * 1.5) % 1200 - 100} y1={1450 + k * 60} x2={(k * 173 + f * 1.5) % 1200 + 20} y2={1450 + k * 60} stroke="#9EC1D4" strokeWidth={6} strokeLinecap="round" />
        ))}
        {/* tower */}
        <rect x={110} y={140} width={70} height={1300} fill={ORANGE} stroke={INK} strokeWidth={6} />
        <rect x={250} y={140} width={70} height={1300} fill={ORANGE} stroke={INK} strokeWidth={6} />
        {[260, 520, 760].map((y) => (
          <rect key={y} x={150} y={y} width={140} height={50} fill={ORANGE} stroke={INK} strokeWidth={6} />
        ))}
        {/* main cable + suspenders */}
        <path d="M 215 160 Q 700 760 1180 560" stroke={ORANGE} strokeWidth={22} fill="none" />
        {[400, 520, 640, 760, 880, 1000].map((x) => {
          const t = (x - 215) / 965;
          const cy = (1 - t) * (1 - t) * 160 + 2 * (1 - t) * t * 760 + t * t * 560;
          return <line key={x} x1={x} y1={cy} x2={x} y2={900} stroke={ORANGE} strokeWidth={6} />;
        })}
        {/* deck */}
        <rect x={0} y={900} width={1080} height={60} fill={ORANGE} stroke={INK} strokeWidth={6} />
        {/* safety net */}
        <path d={`M 330 1060 Q 700 ${1110 + sag} 1080 1060`} stroke="#E8E0CC" strokeWidth={8} fill="none" />
        {new Array(12).fill(0).map((_, k) => {
          const x = 340 + k * 64;
          return <line key={k} x1={x} y1={965} x2={x} y2={1060 + (sag + 50) * Math.sin((Math.PI * (x - 330)) / 750)} stroke="#E8E0CC" strokeWidth={3} opacity={0.8} />;
        })}
        {new Array(4).fill(0).map((_, r) => (
          <path key={r} d={`M 330 ${1000 + r * 16} Q 700 ${1040 + r * 16 + sag * (0.4 + r * 0.2)} 1080 ${1000 + r * 16}`} stroke="#E8E0CC" strokeWidth={3} fill="none" opacity={0.8} />
        ))}
        {/* the falling man */}
        <g transform={`rotate(${fallP * 160} 720 ${manY - 200})`}>
          <Figure {...fig} x={720} y={manY} scale={0.75} action={fallP > 0 && fallP < 1 ? "wave" : "idle"} facing="left" />
        </g>
      </>
    );
    overlay = (
      <div style={{ position: "absolute", right: 170, top: 300, textAlign: "right", color: INK }}>
        <div style={{ fontFamily: titleFont, fontSize: 230, lineHeight: 1, color: C.brick, WebkitTextStroke: `6px ${INK}` }}>{count}</div>
        <div style={{ fontFamily: typeFont, fontSize: 46, background: C.cream, border: `5px solid ${INK}`, borderRadius: 12, padding: "6px 16px", marginTop: 10, display: "inline-block" }}>{v.label ?? "MEN SAVED BY THE NET"}</div>
      </div>
    );
  } else if (mode === "now") {
    // THEN: tin bucket + hot rivet | NOW: the hard hat
    sky = "paper";
    const rev = interpolate(f, [dur * (v.revealAt ?? 0.35), dur * (v.revealAt ?? 0.35) + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
    body = (
      <>
        <rect x={0} y={0} width={1080} height={960} fill="#D9C49C" />
        <rect x={0} y={960} width={1080} height={960} fill="#2E3A55" />
        <Bucket x={540} y={560} s={2.6} glow={0.6 + 0.3 * Math.sin(f / 4)} />
        <HotRivet x={540} y={500} s={2.2} rot={-20} heat={1} />
        <Sparks x={540} y={520} f={f} n={8} spread={90} seed="nw" />
        <g transform={`translate(0 ${(1 - rev) * 700})`} opacity={rev}>
          <HardHat x={540} y={1360} s={2.0} />
        </g>
        <circle cx={540} cy={960} r={80} fill={C.mustard} stroke={INK} strokeWidth={8} />
      </>
    );
    overlay = (
      <>
        <div style={{ position: "absolute", left: 0, right: 0, top: 960 - 48, textAlign: "center", fontFamily: titleFont, fontSize: 64, color: INK }}>VS</div>
        <div style={{ position: "absolute", left: 90, top: 250, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 12, padding: "6px 18px" }}>{v.thenLabel ?? "THEN: HOT RIVETS"}</div>
        <div style={{ position: "absolute", right: 170, top: 1080, fontFamily: typeFont, fontSize: 52, color: INK, background: HAT, border: `5px solid ${INK}`, borderRadius: 12, padding: "6px 18px", opacity: rev }}>{v.nowLabel ?? "NOW: BOLTS + WELDS"}</div>
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {overlay}
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
