import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep060 Fuller (Roman laundry worker) – the barefoot fullo who trod woollen togas in a stone tub of stale urine.
// Look: a steamy, sunlit fullonica with AQUA plaster walls, a brick-red dado and bright yellow tubs (deliberately
// unlike ep047's arena sand and ep056's firelit gold). Palace scenes are royal purple + white marble.
// visual: { mode: "stomp" | "ammonia" | "tread" | "emperor" | "coin" | "paris", headline?, accent?, top?, size?,
//           tag?, tagY?, float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           togaAt? (tread, 0–1), stampAt? (emperor, 0–1), headAt?, chip? (coin), answer?, answerAccent?,
//           answerAt?, answerSize?, chip?, chip2? (paris) }
// Gross-funny, never graphic: the "pee" is a bright cartoon yellow with green stink lines.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const WALL = "#86CBC3";
const WALL_D = "#5EA79F";
const WALL_HI = "#B4E2DA";
const DADO = "#C4503A";
const DADO_D = "#92362A";
const BEAM = "#8A5A34";
const BEAM_D = "#5E3B20";
const FLOOR = "#E2C596";
const FLOOR_D = "#C3A06C";
const STONE = "#EDE3CF";
const STONE_D = "#C2B396";
const STONE_HI = "#FBF6EA";
const PEE = "#F5D53A";
const PEE_D = "#D9AF1C";
const PEE_HI = "#FFF39A";
const STINK = "#7CC23A";
const TUNIC = "#F3EAD3";
const TUNIC_D = "#D3C5A6";
const SKIN = "#D9A06F";
const SKIN_D = "#B47A4C";
const HAIR = "#3A2416";
const CLAY = "#C8743F";
const CLAY_D = "#9A5228";
const CLAY_HI = "#E3955C";
const PURPLE = "#6B2D7E";
const PURPLE_D = "#4C1D5C";
const PURPLE_HI = "#8D4AA2";
const GOLD = "#F2B544";
const GOLD_D = "#C88A1E";
const MARBLE = "#F4F1EA";
const MARBLE_D = "#D4CEC2";
const LAUREL = "#4E8A3A";
const LAUREL_D = "#36652A";
const IRON_G = "#2F6447";
const IRON_GD = "#1F4732";
const IRON_GH = "#4A8A66";

type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: string }> = ({ items, f, dur, top = 420, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side === "right" ? false : side === "left" ? true : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// two-segment limb (hip→knee→foot / shoulder→elbow→hand), ink outline then fill so the joint has no seam
const Limb: React.FC<{ a: P; k: P; b: P; w: number; col: string }> = ({ a, k, b, w, col }) => {
  const d = `M ${a[0]} ${a[1]} L ${k[0]} ${k[1]} L ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep060sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFF8D8" stopOpacity={0.55} />
      <stop offset="1" stopColor="#FFF8D8" stopOpacity={0} />
    </linearGradient>
    <radialGradient id="ep060pee">
      <stop offset="0" stopColor={PEE_HI} />
      <stop offset="1" stopColor={PEE} />
    </radialGradient>
    <linearGradient id="ep060drape" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={PURPLE_D} />
      <stop offset="0.5" stopColor={PURPLE_HI} />
      <stop offset="1" stopColor={PURPLE_D} />
    </linearGradient>
    <linearGradient id="ep060paris" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7FC4F0" />
      <stop offset="1" stopColor="#D8EEFA" />
    </linearGradient>
    <radialGradient id="ep060spot">
      <stop offset="0" stopColor="#FFF6D8" stopOpacity={0.8} />
      <stop offset="1" stopColor="#FFF6D8" stopOpacity={0} />
    </radialGradient>
  </defs>
);

// the fullonica: aqua plaster, red dado, two columns, roof beams, a sunbeam and drying cloths on a line
const Workshop: React.FC<{ floorY: number; f: number; cloths?: boolean }> = ({ floorY, f, cloths = true }) => (
  <>
    <rect x={0} y={0} width={1080} height={floorY} fill={WALL} />
    <rect x={0} y={130} width={1080} height={70} fill={WALL_D} opacity={0.6} />
    {[0, 1, 2].map((k) => (
      <rect key={k} x={150 + k * 280} y={560} width={220} height={floorY - 900} rx={6} fill="none" stroke={WALL_HI} strokeWidth={10} opacity={0.8} />
    ))}
    <rect x={0} y={floorY - 280} width={1080} height={280} fill={DADO} />
    <rect x={0} y={floorY - 290} width={1080} height={20} fill={DADO_D} stroke={INK} strokeWidth={4} />
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={60 + k * 260} y={floorY - 230} width={180} height={170} fill="none" stroke="#E2876B" strokeWidth={6} />
    ))}
    <rect x={0} y={0} width={1080} height={130} fill={BEAM} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <rect key={k} x={k * 200 - 20} y={100} width={70} height={60} fill={BEAM_D} stroke={INK} strokeWidth={4} />
    ))}
    <rect x={0} y={126} width={1080} height={12} fill={BEAM_D} />
    <polygon points={`560,130 820,130 1020,${floorY} 300,${floorY}`} fill="url(#ep060sun)" />
    {[50, 1030].map((cx) => (
      <g key={cx}>
        <rect x={cx - 58} y={150} width={116} height={floorY - 150} fill={STONE} stroke={INK} strokeWidth={6} />
        {[-30, 0, 30].map((dx) => (
          <path key={dx} d={`M ${cx + dx} 200 L ${cx + dx} ${floorY - 20}`} stroke={STONE_D} strokeWidth={6} />
        ))}
        <rect x={cx - 76} y={138} width={152} height={40} rx={8} fill={STONE_HI} stroke={INK} strokeWidth={6} />
        <rect x={cx - 72} y={floorY - 36} width={144} height={36} rx={6} fill={STONE_HI} stroke={INK} strokeWidth={6} />
      </g>
    ))}
    {cloths ? (
      <g>
        <path d={`M 100 214 Q 540 260 980 214`} stroke={INK} strokeWidth={6} fill="none" />
        {[
          [190, "#F7F2E4", 170],
          [380, "#E7B7A8", 210],
          [600, "#F7F2E4", 190],
          [800, "#B9D7EE", 160],
        ].map(([cx, col, h], i) => {
          const sw = Math.sin(f / 14 + i) * 8;
          const x0 = (cx as number) - 75;
          const y0 = 220 + Math.sin(((cx as number) / 980) * Math.PI) * 22;
          return (
            <path key={i} d={`M ${x0} ${y0} L ${x0 + 150} ${y0} L ${x0 + 150 + sw} ${y0 + (h as number)} Q ${x0 + 75 + sw} ${y0 + (h as number) - 20} ${x0 + sw} ${y0 + (h as number)} Z`} fill={col as string} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          );
        })}
      </g>
    ) : null}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={FLOOR} />
    <rect x={0} y={floorY} width={1080} height={14} fill={FLOOR_D} />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <path key={k} d={`M ${k * 180 - 40} ${floorY + 14} L ${k * 220 - 300} 1920`} stroke={FLOOR_D} strokeWidth={5} />
    ))}
    {[1, 2, 3].map((k) => (
      <path key={`h${k}`} d={`M 0 ${floorY + k * k * 60} L 1080 ${floorY + k * k * 60}`} stroke={FLOOR_D} strokeWidth={5} />
    ))}
  </>
);

// rising steam puffs (cream), drifting and fading
const Steam: React.FC<{ f: number; x0: number; x1: number; y: number; n?: number; o?: number; seed?: string }> = ({ f, x0, x1, y, n = 7, o = 0.5, seed = "a" }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const life = 90;
      const age = (f + random(`st60${seed}${k}`) * life) % life;
      const t = age / life;
      const cx = lerp(x0, x1, random(`sx60${seed}${k}`)) + Math.sin(age / 12 + k) * 30;
      return <ellipse key={k} cx={cx} cy={y - t * 520} rx={50 + t * 90} ry={34 + t * 50} fill="#FFFDF4" opacity={o * Math.sin(t * Math.PI)} />;
    })}
  </g>
);

// wavy green stink lines rising
const Stink: React.FC<{ f: number; xs: number[]; y: number; h?: number; w?: number; o?: number }> = ({ f, xs, y, h = 300, w = 12, o = 0.85 }) => (
  <g>
    {xs.map((x, i) => {
      const t = ((f * 1.3 + i * 23) % 60) / 60;
      const yy = y - t * 120;
      const amp = 26;
      const d = `M ${x} ${yy} q ${amp} ${-h / 6} 0 ${-h / 3} q ${-amp} ${-h / 6} 0 ${-h / 3} q ${amp} ${-h / 6} 0 ${-h / 3}`;
      return (
        <g key={i} opacity={o * Math.sin(t * Math.PI)}>
          <path d={d} stroke={INK} strokeWidth={w + 8} fill="none" strokeLinecap="round" />
          <path d={d} stroke={STINK} strokeWidth={w} fill="none" strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

// clay jar of stale pee, origin = bottom centre
const Jar: React.FC<{ x: number; y: number; s?: number; label?: string; f?: number; slosh?: boolean }> = ({ x, y, s = 1, label, f = 0, slosh = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={130} ry={20} fill="#000" opacity={0.18} />
    <path d="M -60 -330 Q -150 -300 -150 -170 Q -150 -40 -70 0 L 70 0 Q 150 -40 150 -170 Q 150 -300 60 -330 Z" fill={CLAY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -110 -250 Q -130 -150 -96 -60" stroke={CLAY_HI} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
    <path d="M 120 -220 Q 128 -120 92 -40" stroke={CLAY_D} strokeWidth={12} fill="none" strokeLinecap="round" />
    <rect x={-70} y={-370} width={140} height={46} rx={10} fill={CLAY} stroke={INK} strokeWidth={7} />
    <ellipse cx={0} cy={-370} rx={70} ry={16} fill={PEE} stroke={INK} strokeWidth={6} />
    {slosh ? <ellipse cx={Math.sin(f / 4) * 14} cy={-371} rx={34} ry={6} fill={PEE_HI} /> : null}
    {label ? (
      <g transform="rotate(-4)">
        <rect x={-118} y={-232} width={236} height={88} rx={12} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={0} y={-172} textAnchor="middle" fontFamily={titleFont} fontSize={48} fill={INK} textLength={200} lengthAdjust="spacingAndGlyphs">
          {label}
        </text>
      </g>
    ) : null}
  </g>
);

const pmod = (a: number, n: number) => ((a % n) + n) % n;

// The fuller treading cloth in a stone treading stall full of stale pee. Origin = centre of the liquid surface.
// Legs pump up and down (the "stomp"), a splash of yellow drops each time a foot lands.
// pinch = holds his nose with one hand; the other hand grips the stall's low side wall.
const StompVat: React.FC<{ x: number; y: number; s?: number; f: number; off?: number; per?: number; pinch?: boolean; splash?: boolean; stink?: boolean; tunic?: string; hair?: string; skin?: string; toga?: number }> = ({
  x,
  y,
  s = 1,
  f,
  off = 0,
  per = 16,
  pinch = true,
  splash = true,
  stink = true,
  tunic = TUNIC,
  hair = HAIR,
  skin = SKIN,
  toga = 1,
}) => {
  const ff = f + off;
  const ph = (ff / per) * Math.PI * 2;
  const sp = Math.sin(ph);
  const liftL = Math.pow(Math.max(0, sp), 0.7);
  const liftR = Math.pow(Math.max(0, -sp), 0.7);
  const bob = -14 * Math.abs(sp);
  const lean = -sp * 12;
  const leg = (side: number, lift: number) => {
    const hx = side * 52 + lean;
    const hip: P = [hx, -380 + bob];
    const knee: P = [hx + side * 42, lerp(-165, -330, lift) + bob * 0.5];
    const foot: P = [hx + side * 22, lerp(70, -150, lift)];
    return { hip, knee, foot, lift };
  };
  const L = leg(-1, liftL);
  const R = leg(1, liftR);
  const splashes = splash
    ? [
        { age: pmod(ff - per / 2, per), cyc: Math.floor((ff - per / 2) / per), fx: L.foot[0] },
        { age: pmod(ff, per), cyc: Math.floor(ff / per), fx: R.foot[0] },
      ]
    : [];
  const shoulderL: P = [-110 + lean, -755 + bob];
  const shoulderR: P = [108 + lean, -752 + bob];
  const head: P = [lean * 1.3, -880 + bob];
  const handR: P = [372, -452];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {stink ? <Stink f={f + off} xs={[-250, -10, 230]} y={-60} h={330} /> : null}
      {/* low side walls of the treading stall */}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <rect x={sd < 0 ? -430 : 330} y={-430} width={100} height={690} fill={STONE} stroke={INK} strokeWidth={7} />
          <rect x={sd < 0 ? -442 : 318} y={-452} width={124} height={34} rx={8} fill={STONE_HI} stroke={INK} strokeWidth={6} />
          <path d={`M ${sd < 0 ? -400 : 360} -400 L ${sd < 0 ? -400 : 360} 240`} stroke={STONE_D} strokeWidth={8} opacity={0.7} />
        </g>
      ))}
      {/* rim + liquid */}
      <ellipse cx={0} cy={0} rx={340} ry={78} fill={STONE} stroke={INK} strokeWidth={7} />
      <ellipse cx={0} cy={0} rx={300} ry={58} fill="url(#ep060pee)" stroke={PEE_D} strokeWidth={5} />
      {toga > 0 ? (
        <path d={`M -250 -6 Q -140 -40 -40 -14 Q 60 10 170 -26 Q 240 -40 270 -6 Q 160 30 40 20 Q -100 30 -250 -6 Z`} fill={TUNIC} stroke={INK} strokeWidth={5} opacity={0.9 * toga} />
      ) : null}
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} cx={-200 + k * 130 + Math.sin(ff / 5 + k) * 10} cy={-14 + (k % 2) * 22} r={8 + (k % 2) * 4} fill={PEE_HI} stroke={PEE_D} strokeWidth={3} opacity={0.6 + 0.4 * Math.sin(ff / 3 + k)} />
      ))}
      {/* legs (behind the tunic) */}
      {[L, R].map((g, i) => (
        <g key={i}>
          <Limb a={g.hip} k={g.knee} b={g.foot} w={58} col={skin} />
          {g.foot[1] < 10 ? (
            <g>
              <ellipse cx={g.foot[0] + (i ? 10 : -10)} cy={g.foot[1] + 18} rx={46} ry={24} fill={skin} stroke={INK} strokeWidth={6} />
              {[0, 1].map((d) => (
                <ellipse key={d} cx={g.foot[0] - 16 + d * 30} cy={g.foot[1] + 48 + pmod(ff * 6 + d * 11, 40)} rx={7} ry={11} fill={PEE} stroke={INK} strokeWidth={3} />
              ))}
            </g>
          ) : null}
        </g>
      ))}
      {/* torso: exomis tunic off the right shoulder, rope belt, a few yellow splash stains */}
      <g transform={`translate(${lean} ${bob})`}>
        <path d="M -62 -796 L 118 -778 L 106 -640 L 0 -640 Z" fill={skin} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -120 -774 L -40 -792 L 102 -690 L 100 -560 L 152 -330 Q 76 -304 0 -322 Q -76 -304 -152 -330 L -100 -560 L -114 -700 Z" fill={tunic} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -40 -792 L 102 -690" stroke={TUNIC_D} strokeWidth={10} />
        <path d="M -96 -470 Q -60 -400 -110 -340 M 60 -480 Q 96 -420 70 -336" stroke={TUNIC_D} strokeWidth={7} fill="none" />
        <path d="M -102 -560 Q 0 -536 102 -560" stroke="#8A5A34" strokeWidth={20} fill="none" strokeLinecap="round" />
        <path d="M 30 -548 l 10 60 M 46 -548 l 22 54" stroke="#8A5A34" strokeWidth={9} strokeLinecap="round" />
        {[
          [-60, -420, 26],
          [70, -380, 20],
          [-20, -640, 16],
        ].map(([cx, cy, r], k) => (
          <circle key={k} cx={cx} cy={cy} r={r} fill={PEE} opacity={0.55} />
        ))}
      </g>
      {/* right arm grips the side wall */}
      <Limb a={shoulderR} k={[250, -615]} b={handR} w={46} col={skin} />
      <circle cx={handR[0]} cy={handR[1]} r={30} fill={skin} stroke={INK} strokeWidth={6} />
      {/* head */}
      <g transform={`translate(${head[0]} ${head[1]})`}>
        <rect x={-28} y={56} width={56} height={60} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <circle cx={-86} cy={6} r={20} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={86} cy={6} r={20} fill={skin} stroke={INK} strokeWidth={5} />
        <circle r={88} fill={skin} stroke={INK} strokeWidth={7} />
        {[200, 222, 245, 268, 292, 315, 338].map((a, k) => (
          <circle key={k} cx={Math.cos((a * Math.PI) / 180) * 78} cy={-20 + Math.sin((a * Math.PI) / 180) * 74} r={30} fill={hair} stroke={INK} strokeWidth={5} />
        ))}
        <path d="M -76 -34 Q 0 -112 76 -34 Q 40 -60 0 -56 Q -40 -60 -76 -34 Z" fill={hair} />
        <circle cx={-46} cy={26} r={20} fill={STINK} opacity={0.35} />
        <circle cx={46} cy={26} r={20} fill={STINK} opacity={0.35} />
        <path d="M -58 -12 L -30 -2 L -58 8" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 58 -12 L 30 -2 L 58 8" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M -64 -38 L -26 -24 M 64 -38 L 26 -24" stroke={INK} strokeWidth={9} strokeLinecap="round" />
        <path d="M -34 50 q 8.5 -12 17 0 q 8.5 12 17 0 q 8.5 -12 17 0 q 8.5 12 17 0" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={18} rx={18} ry={22} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M 74 -64 q 14 22 0 32 q -14 -10 0 -32 Z" fill="#9FD8F2" stroke={INK} strokeWidth={4} />
      </g>
      {/* left arm: pinching the nose */}
      {pinch ? (
        <g>
          <Limb a={shoulderL} k={[-238 + lean, -730 + bob]} b={[head[0] - 22, head[1] + 22]} w={46} col={skin} />
          <circle cx={head[0] - 20} cy={head[1] + 20} r={30} fill={skin} stroke={INK} strokeWidth={6} />
          <path d={`M ${head[0] - 14} ${head[1] + 2} q 18 6 14 22`} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <Limb a={shoulderL} k={[-250, -615]} b={[-372, -452]} w={46} col={skin} />
          <circle cx={-372} cy={-452} r={30} fill={skin} stroke={INK} strokeWidth={6} />
        </g>
      )}
      {/* front of the tub: the liquid in front of the legs, the rim, the stone wall */}
      <path d="M -300 0 A 300 58 0 0 0 300 0 Z" fill={PEE} opacity={0.9} />
      <path d="M -300 0 A 300 58 0 0 0 300 0" stroke={PEE_D} strokeWidth={5} fill="none" />
      <path d="M -340 0 A 340 78 0 0 0 340 0 L 300 0 A 300 58 0 0 1 -300 0 Z" fill={STONE_HI} stroke={INK} strokeWidth={6} />
      <path d="M -340 0 A 340 78 0 0 0 340 0 L 340 262 L -340 262 Z" fill={STONE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -340 140 L 340 140 M -120 78 L -120 140 M 150 76 L 150 140 M 0 140 L 0 262 M -240 140 L -240 262 M 230 140 L 230 262" stroke={STONE_D} strokeWidth={6} />
      <path d="M -300 60 Q -200 110 -120 92" stroke={PEE} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.7} />
      {splashes.map((sp2, i) =>
        sp2.age > 14 ? null : (
          <g key={i}>
            <ellipse cx={sp2.fx} cy={12} rx={40 + sp2.age * 9} ry={10 + sp2.age * 2} fill="none" stroke={PEE_HI} strokeWidth={6} opacity={1 - sp2.age / 14} />
            {new Array(9).fill(0).map((_, k) => {
              const vx = (random(`sp60x${sp2.cyc}-${i}-${k}`) - 0.5) * 22;
              const vy = -11 - random(`sp60y${sp2.cyc}-${i}-${k}`) * 13;
              const r = 8 + random(`sp60r${sp2.cyc}-${i}-${k}`) * 11;
              return <circle key={k} cx={sp2.fx + vx * sp2.age} cy={-4 + vy * sp2.age + 0.95 * sp2.age * sp2.age} r={r} fill={PEE} stroke={INK} strokeWidth={4} />;
            })}
          </g>
        ),
      )}
    </g>
  );
};

const Coin: React.FC<{ x: number; y: number; r?: number; f: number }> = ({ x, y, r = 46, f }) => {
  const g = 0.6 + 0.4 * Math.sin(f / 4);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={GOLD} stroke={INK} strokeWidth={6} />
      <circle r={r * 0.74} fill="none" stroke={GOLD_D} strokeWidth={5} />
      <circle cx={-r * 0.05} cy={-r * 0.08} r={r * 0.3} fill={GOLD_D} />
      <path d={`M ${r * 0.1} ${-r * 0.1} l ${r * 0.18} ${r * 0.06} l ${-r * 0.16} ${r * 0.08}`} fill={GOLD_D} />
      <path d={`M ${-r * 0.32} ${r * 0.34} Q 0 ${r * 0.5} ${r * 0.32} ${r * 0.34}`} stroke={GOLD_D} strokeWidth={6} fill="none" />
      <g transform={`translate(${r * 0.55} ${-r * 0.55}) rotate(${f * 4}) scale(${g})`}>
        <path d="M 0 -26 L 6 -6 L 26 0 L 6 6 L 0 26 L -6 6 L -26 0 L -6 -6 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      </g>
    </g>
  );
};

// A Roman, waist-up, facing right (3/4). who = "vesp" (Vespasian: bald, laurel wreath, jowls) or "titus" (young, curly hair).
// mood: grin | smug | ew | sniff | wow. hand/elbow (local coords) draw the right arm reaching out; hold = what it holds.
// marble = a white statue version (blank eyes).
type Mood = "grin" | "smug" | "ew" | "sniff" | "wow";
const Roman: React.FC<{ x: number; y: number; s?: number; f: number; who: "vesp" | "titus"; mood?: Mood; hand?: P; elbow?: P; hold?: "coin" | "stamp"; marble?: boolean; flip?: boolean }> = ({ x, y, s = 1, f, who, mood = "smug", hand, elbow, hold, marble = false, flip = false }) => {
  const skin = marble ? MARBLE : who === "vesp" ? "#E2A97E" : "#E8B990";
  const skinD = marble ? MARBLE_D : who === "vesp" ? "#C18660" : "#C99670";
  const toga = marble ? MARBLE : "#FAF6EC";
  const togaD = marble ? MARBLE_D : "#DCD3BF";
  const band = marble ? MARBLE_D : PURPLE;
  const hairC = marble ? MARBLE_D : who === "vesp" ? "#A8A39A" : "#5A3A22";
  const laurel = marble ? MARBLE_D : LAUREL;
  const laurelD = marble ? "#BDB6A8" : LAUREL_D;
  const bob = Math.sin(f / 10) * 3;
  const shoulder: P = [175, -372];
  const eyeOpen = mood === "wow";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M -260 0 L -238 -330 Q -226 -404 -150 -414 L 150 -414 Q 224 -404 240 -330 L 262 0 Z" fill={toga} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -150 -410 Q 10 -240 210 0" stroke={band} strokeWidth={36} fill="none" />
      <path d="M -150 -410 Q 10 -240 210 0" stroke={INK} strokeWidth={4} fill="none" opacity={0.4} />
      <path d="M -190 -300 Q -150 -150 -200 -10 M -90 -250 Q -40 -120 -70 0 M 120 -330 Q 150 -200 120 -60" stroke={togaD} strokeWidth={8} fill="none" strokeLinecap="round" />
      <g transform={`translate(0 ${bob})`}>
        <rect x={-46} y={-480} width={92} height={80} fill={skinD} stroke={INK} strokeWidth={6} />
        <g transform="translate(0 -590)">
          {who === "vesp" ? (
            <path d="M -112 -30 Q -120 -150 0 -152 Q 120 -150 116 -36 Q 128 60 74 106 Q 0 138 -62 106 Q -128 62 -112 -30 Z" fill={skin} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          ) : (
            <path d="M -110 -20 Q -112 -140 0 -142 Q 112 -140 112 -24 Q 112 64 60 98 Q 0 120 -54 96 Q -112 60 -110 -20 Z" fill={skin} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          )}
          {who === "vesp" ? (
            <path d="M -114 -20 Q -132 50 -86 92 Q -96 30 -70 -10 Q -90 -30 -114 -20 Z" fill={hairC} stroke={INK} strokeWidth={5} />
          ) : (
            [150, 175, 200, 225, 250, 275, 300, 325].map((a, k) => (
              <circle key={k} cx={Math.cos((a * Math.PI) / 180) * 100 + 4} cy={-34 + Math.sin((a * Math.PI) / 180) * 104} r={34} fill={hairC} stroke={INK} strokeWidth={5} />
            ))
          )}
          <ellipse cx={-50} cy={8} rx={22} ry={30} fill={skinD} stroke={INK} strokeWidth={5} />
          {/* laurel wreath (Vespasian) */}
          {who === "vesp"
            ? new Array(9).fill(0).map((_, k) => {
                const t = k / 8;
                const lx = lerp(-118, 104, t);
                const ly = -58 - Math.sin(t * Math.PI) * 52;
                return <ellipse key={k} cx={lx} cy={ly} rx={30} ry={13} transform={`rotate(${-30 + k * 8} ${lx} ${ly})`} fill={k % 2 ? laurel : laurelD} stroke={INK} strokeWidth={4} />;
              })
            : null}
          {who === "vesp" ? <path d="M 10 -110 Q 50 -122 86 -106 M 20 -92 Q 55 -100 88 -88" stroke={skinD} strokeWidth={5} fill="none" strokeLinecap="round" /> : null}
          {/* eyes */}
          {marble ? (
            <ellipse cx={52} cy={-22} rx={14} ry={10} fill={MARBLE_D} />
          ) : mood === "sniff" || mood === "ew" ? (
            <path d="M 36 -22 Q 52 -12 68 -22" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
          ) : (
            <g>
              <ellipse cx={52} cy={-22} rx={eyeOpen ? 18 : 12} ry={eyeOpen ? 22 : 15} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
              <circle cx={58} cy={-20} r={eyeOpen ? 9 : 8} fill={INK} />
            </g>
          )}
          <path d={mood === "smug" ? "M 28 -54 L 78 -64" : mood === "wow" ? "M 30 -66 Q 54 -82 80 -66" : mood === "ew" ? "M 30 -44 L 78 -58" : "M 30 -52 L 80 -54"} stroke={marble ? MARBLE_D : who === "vesp" ? "#8E887E" : INK} strokeWidth={10} strokeLinecap="round" fill="none" />
          {/* nose */}
          <path d="M 96 -30 Q 150 24 112 40 Q 100 40 94 30" fill={skin} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {mood === "sniff" && !marble ? (
            <g stroke={INK} strokeWidth={5} strokeLinecap="round">
              <path d={`M ${150 + (f % 8)} 10 l 26 -6 M ${150 + ((f + 4) % 8)} 34 l 26 4`} />
            </g>
          ) : null}
          {/* mouth */}
          {marble ? (
            <path d="M 50 70 Q 74 76 96 66" stroke={MARBLE_D} strokeWidth={6} fill="none" strokeLinecap="round" />
          ) : mood === "grin" ? (
            <path d="M 34 56 Q 72 102 108 52 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          ) : mood === "ew" ? (
            <g>
              <path d="M 40 70 Q 70 50 104 66 Q 76 96 40 70 Z" fill="#7A2A22" stroke={INK} strokeWidth={5} />
              <path d="M 62 78 Q 70 112 90 100 Q 96 86 88 74 Z" fill="#E77E8A" stroke={INK} strokeWidth={4} />
            </g>
          ) : mood === "wow" ? (
            <ellipse cx={74} cy={72} rx={18} ry={22} fill="#7A2A22" stroke={INK} strokeWidth={5} />
          ) : mood === "sniff" ? (
            <path d="M 52 74 Q 74 66 98 72" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 46 68 Q 76 80 104 58" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          )}
          {who === "vesp" && !marble ? <path d="M 30 92 Q 70 120 104 82" stroke={skinD} strokeWidth={5} fill="none" strokeLinecap="round" /> : null}
          {mood === "ew" && !marble ? <circle cx={62} cy={22} r={24} fill={STINK} opacity={0.4} /> : null}
        </g>
      </g>
      {hand ? (
        <g>
          <Limb a={shoulder} k={elbow ?? [300, -300]} b={hand} w={64} col={toga} />
          <circle cx={hand[0]} cy={hand[1]} r={34} fill={skin} stroke={INK} strokeWidth={6} />
          {hold === "coin" ? <Coin x={hand[0] + 30} y={hand[1] - 36} r={52} f={f} /> : null}
          {hold === "stamp" ? (
            <g transform={`translate(${hand[0]} ${hand[1]})`}>
              <rect x={-22} y={-90} width={44} height={110} rx={12} fill={BEAM} stroke={INK} strokeWidth={6} />
              <circle cx={0} cy={-100} r={34} fill={BEAM} stroke={INK} strokeWidth={6} />
              <rect x={-90} y={20} width={180} height={50} rx={8} fill={BEAM_D} stroke={INK} strokeWidth={6} />
              <rect x={-96} y={66} width={192} height={18} rx={4} fill={C.brick} stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
        </g>
      ) : null}
    </g>
  );
};

// the palace: white marble columns, royal purple drapes, a gold-trimmed marble ledge in front at y = ledgeY
const Palace: React.FC<{ f: number; ledgeY: number }> = ({ f, ledgeY }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#F3E6C8" />
    {[0, 1, 2, 3, 4].map((k) => (
      <rect key={k} x={k * 240 - 40} y={0} width={120} height={1920} fill="#EADBB6" />
    ))}
    {[170, 910].map((cx) => (
      <g key={cx}>
        <rect x={cx - 70} y={120} width={140} height={ledgeY} fill={MARBLE} stroke={INK} strokeWidth={6} />
        {[-36, 0, 36].map((dx) => (
          <path key={dx} d={`M ${cx + dx} 170 L ${cx + dx} ${ledgeY}`} stroke={MARBLE_D} strokeWidth={7} />
        ))}
        <rect x={cx - 92} y={110} width={184} height={50} rx={10} fill={MARBLE} stroke={INK} strokeWidth={6} />
      </g>
    ))}
    {[-1, 1].map((sd) => {
      const sw = Math.sin(f / 18 + sd) * 10;
      const x0 = sd < 0 ? 0 : 1080;
      return (
        <path key={sd} d={`M ${x0} 0 L ${x0 - sd * 300} 0 Q ${x0 - sd * (190 + sw)} 500 ${x0 - sd * (120 + sw)} 1100 L ${x0} 1160 Z`} fill="url(#ep060drape)" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      );
    })}
    <path d={`M 0 0 L 1080 0 L 1080 90 Q 810 210 540 110 Q 270 210 0 90 Z`} fill={PURPLE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M 0 90 Q 270 210 540 110 Q 810 210 1080 90`} stroke={GOLD} strokeWidth={12} fill="none" />
  </>
);

const Ledge: React.FC<{ ledgeY: number }> = ({ ledgeY }) => (
  <>
    <rect x={0} y={ledgeY} width={1080} height={1920 - ledgeY} fill={MARBLE} stroke={INK} strokeWidth={7} />
    <rect x={0} y={ledgeY} width={1080} height={34} fill={GOLD} stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <rect key={k} x={40 + k * 175} y={ledgeY + 80} width={130} height={1920 - ledgeY - 120} rx={10} fill="none" stroke={MARBLE_D} strokeWidth={8} />
    ))}
  </>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string }> = ({ x, y, p, text, rot = -8, size = 78, col = C.mustard }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 205;
      return `${Math.cos(a) * r * 1.3},${Math.sin(a) * r * 0.72}`;
    })
    .join(" ");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <polygon points={pts} fill={col} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <text x={0} y={size * 0.35} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>
        {text}
      </text>
    </g>
  );
};

const Chip: React.FC<{ x: number; y: number; p: number; text: string; w?: number; rot?: number; col?: string; font?: string; size?: number }> = ({ x, y, p, text, w = 640, rot = -3, col = C.mustard, font = titleFont, size = 60 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-56} width={w} height={112} rx={18} fill={col} stroke={INK} strokeWidth={8} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={font} fontSize={size} fill={INK} textLength={w - 70} lengthAdjust="spacingAndGlyphs">
        {text}
      </text>
    </g>
  );

// Paris street urinal ("vespasienne"): a round green cast-iron screen on short legs, a little roof on top.
// A gentleman inside: only his shoes/trousers below and his bowler hat above show. Origin = bottom centre.
const Vespasienne: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const sway = Math.sin(f / 7) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={230} ry={26} fill="#000" opacity={0.18} />
      {/* the gentleman's legs and shoes, seen under the screen */}
      <rect x={-50} y={-110} width={40} height={96} fill="#2E3550" stroke={INK} strokeWidth={5} />
      <rect x={14} y={-110} width={40} height={96} fill="#2E3550" stroke={INK} strokeWidth={5} />
      <path d="M -62 -16 L -6 -16 Q 4 -16 4 2 L -64 2 Z M 10 -16 L 66 -16 Q 76 -16 76 2 L 8 2 Z" fill={INK} />
      {/* legs of the urinal */}
      {[-170, -60, 60, 170].map((lx) => (
        <rect key={lx} x={lx - 9} y={-130} width={18} height={130} fill={IRON_GD} stroke={INK} strokeWidth={4} />
      ))}
      {/* the screen */}
      <path d="M -190 -130 L -190 -460 Q 0 -500 190 -460 L 190 -130 Q 0 -96 -190 -130 Z" fill={IRON_G} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {[-130, -66, 0, 66, 130].map((px) => (
        <path key={px} d={`M ${px} ${-474 + Math.abs(px) * 0.08} L ${px} ${-118 - Math.abs(px) * 0.08}`} stroke={IRON_GD} strokeWidth={7} />
      ))}
      <path d="M -190 -400 Q 0 -436 190 -400" stroke={IRON_GH} strokeWidth={10} fill="none" />
      <path d="M -190 -190 Q 0 -160 190 -190" stroke={IRON_GH} strokeWidth={10} fill="none" />
      {[-98, 0, 98].map((cx) => (
        <circle key={cx} cx={cx} cy={-300 + Math.abs(cx) * 0.05} r={22} fill="none" stroke={IRON_GH} strokeWidth={7} />
      ))}
      <path d="M -150 -440 L -150 -140" stroke={IRON_GH} strokeWidth={8} opacity={0.6} />
      {/* the gentleman's bowler hat peeking over */}
      <g transform={`translate(${sway} 0)`}>
        <path d="M -54 -486 Q -50 -560 0 -562 Q 50 -560 54 -486 Z" fill="#2A2532" stroke={INK} strokeWidth={6} />
        <ellipse cx={0} cy={-486} rx={76} ry={14} fill="#2A2532" stroke={INK} strokeWidth={6} />
      </g>
      {/* posts + roof */}
      {[-176, 176].map((px) => (
        <rect key={px} x={px - 8} y={-640} width={16} height={180} fill={IRON_GD} stroke={INK} strokeWidth={4} />
      ))}
      <ellipse cx={0} cy={-640} rx={240} ry={40} fill={IRON_G} stroke={INK} strokeWidth={8} />
      <path d="M -240 -640 Q 0 -590 240 -640" stroke={IRON_GH} strokeWidth={8} fill="none" />
      <path d="M -160 -660 Q 0 -760 160 -660 Z" fill={IRON_G} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -730 L 0 -790" stroke={INK} strokeWidth={10} strokeLinecap="round" />
      <circle cx={0} cy={-798} r={16} fill={GOLD} stroke={INK} strokeWidth={5} />
      <Stink f={f} xs={[-120, 120]} y={-540} h={200} w={9} o={0.6} />
    </g>
  );
};

const ParisStreet: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep060paris)" />
    {[0, 1].map((k) => (
      <g key={k} transform={`translate(${((k * 560 + f * 0.6) % 1300) - 200} ${300 + k * 160})`} opacity={0.95}>
        <ellipse cx={0} cy={0} rx={110} ry={34} fill="#FFFFFF" />
        <ellipse cx={70} cy={-20} rx={80} ry={36} fill="#FFFFFF" />
      </g>
    ))}
    {/* the Eiffel Tower, far away */}
    <g transform="translate(560 1130)" fill="none" stroke="#7A5E4E" strokeLinejoin="round">
      <path d="M -150 0 Q -70 -150 -22 -440 L -8 -600 L 8 -600 L 22 -440 Q 70 -150 150 0" strokeWidth={14} />
      <path d="M -90 0 Q 0 -90 90 0" strokeWidth={12} />
      <path d="M -96 -150 L 96 -150 M -46 -330 L 46 -330" strokeWidth={14} />
      <path d="M -120 -60 L 60 -150 M 120 -60 L -60 -150 M -60 -150 L 30 -330 M 60 -150 L -30 -330" strokeWidth={5} opacity={0.7} />
      <path d="M 0 -600 L 0 -660" strokeWidth={8} />
    </g>
    {/* Haussmann buildings */}
    {[
      [0, 330, 640],
      [770, 1080, 600],
    ].map(([x0, x1, top], i) => (
      <g key={i}>
        <path d={`M ${x0} ${top} L ${x0 + 30} ${top - 90} L ${x1 - 30} ${top - 90} L ${x1} ${top} Z`} fill="#7C8BA0" stroke={INK} strokeWidth={6} />
        <rect x={x0} y={top} width={x1 - x0} height={1500 - top} fill="#F1E4C8" stroke={INK} strokeWidth={6} />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => {
            const wx = x0 + 34 + c * ((x1 - x0 - 40) / 3);
            const wy = top + 50 + r * 190;
            return (
              <g key={`${r}-${c}`}>
                <rect x={wx} y={wy} width={60} height={110} fill="#8FB6CF" stroke={INK} strokeWidth={5} />
                <path d={`M ${wx - 10} ${wy + 112} L ${wx + 70} ${wy + 112} M ${wx - 10} ${wy + 92} L ${wx + 70} ${wy + 92}`} stroke={INK} strokeWidth={5} />
              </g>
            );
          }),
        )}
      </g>
    ))}
    <rect x={0} y={1180} width={1080} height={320} fill="#E9DFC9" opacity={0.0} />
    {/* pavement + kerb */}
    <rect x={0} y={1500} width={1080} height={420} fill="#D8D2C4" />
    <path d="M 0 1500 L 1080 1500" stroke={INK} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => (
      <path key={k} d={`M ${k * 180} 1500 L ${k * 200 - 80} 1920`} stroke="#B9B2A2" strokeWidth={5} />
    ))}
    <rect x={0} y={1820} width={1080} height={100} fill="#9AA0A8" stroke={INK} strokeWidth={6} />
    {/* a plane tree */}
    <rect x={930} y={980} width={60} height={560} fill="#9C8A6A" stroke={INK} strokeWidth={6} />
    <circle cx={960} cy={940} r={150} fill="#5FA04A" stroke={INK} strokeWidth={6} />
    <circle cx={860} cy={1010} r={100} fill="#4E8A3A" stroke={INK} strokeWidth={6} />
    <circle cx={1050} cy={1030} r={100} fill="#4E8A3A" stroke={INK} strokeWidth={6} />
    {/* a street lamp */}
    <rect x={92} y={1060} width={18} height={480} fill="#2E3A3A" stroke={INK} strokeWidth={4} />
    <path d="M 70 1060 L 132 1060 L 122 990 L 80 990 Z" fill="#FFF3C4" stroke={INK} strokeWidth={5} />
  </>
);

// a big woollen toga sheet hung on a pole, greasy stains that vanish one by one at zaps[] (frames)
const Toga: React.FC<{ f: number; zaps: number[]; stains: P[] }> = ({ f, zaps, stains }) => {
  const clean = zaps.length ? ease(f, zaps[0], zaps[zaps.length - 1] + 6) : 0;
  const sw = Math.sin(f / 16) * 10;
  const d = `M 560 770 L 1000 770 L ${1010 + sw} 1440 Q ${900 + sw} 1400 ${800 + sw} 1450 Q ${690 + sw} 1400 ${580 + sw} 1450 Z`;
  return (
    <g>
      <path d={d} fill="#FBF8EE" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={d} fill="#B8A57A" opacity={0.55 * (1 - clean)} />
      {[650, 760, 870, 960].map((fx, k) => (
        <path key={k} d={`M ${fx} 790 Q ${fx + 20 + sw * 0.5} 1100 ${fx + sw} 1420`} stroke="#DCD3BF" strokeWidth={8} fill="none" />
      ))}
      <rect x={520} y={748} width={520} height={30} rx={14} fill={BEAM} stroke={INK} strokeWidth={6} />
      {stains.map((p, i) => {
        const z = zaps[i] ?? 1e9;
        const o = interpolate(f, [z, z + 5], [1, 0], clamp);
        const sp = f >= z && f < z + 14 ? popIn(f, z, 5) * interpolate(f, [z + 6, z + 14], [1, 0], clamp) : 0;
        return (
          <g key={i}>
            {o > 0 ? <path d={`M ${p[0] - 50} ${p[1]} Q ${p[0] - 46} ${p[1] - 44} ${p[0]} ${p[1] - 40} Q ${p[0] + 56} ${p[1] - 46} ${p[0] + 52} ${p[1] + 4} Q ${p[0] + 40} ${p[1] + 50} ${p[0] - 6} ${p[1] + 42} Q ${p[0] - 60} ${p[1] + 40} ${p[0] - 50} ${p[1]} Z`} fill="#7A5A2E" stroke={INK} strokeWidth={4} opacity={o} /> : null}
            {sp > 0 ? (
              <g transform={`translate(${p[0]} ${p[1]}) scale(${sp})`}>
                <path d="M 0 -70 L 14 -14 L 70 0 L 14 14 L 0 70 L -14 14 L -70 0 L -14 -14 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};

const StampTool: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-90} width={44} height={110} rx={12} fill={BEAM} stroke={INK} strokeWidth={6} />
    <circle cx={0} cy={-100} r={34} fill={BEAM} stroke={INK} strokeWidth={6} />
    <rect x={-90} y={20} width={180} height={50} rx={8} fill={BEAM_D} stroke={INK} strokeWidth={6} />
    <rect x={-96} y={66} width={192} height={18} rx={4} fill={C.brick} stroke={INK} strokeWidth={5} />
  </g>
);

export const FullerScene: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "stomp";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let answerOn = false;

  if (mode === "stomp") {
    // frame 0: one big fuller knee-deep in a stone tub of yellow pee, stomping a toga, pinching his nose
    body = (
      <>
        <Workshop floorY={1180} f={f} />
        <Steam f={f} x0={160} x1={920} y={1260} n={8} o={0.55} seed="h" />
        <StompVat x={540} y={1475} s={0.92} f={f} off={4} per={14} />
        <Jar x={96} y={1790} s={0.72} f={f} slosh />
        <Jar x={990} y={1820} s={0.82} f={f} slosh />
        <Steam f={f + 40} x0={200} x1={880} y={1500} n={4} o={0.3} seed="h2" />
      </>
    );
  } else if (mode === "ammonia") {
    // why pee? stale urine → ammonia bubbles that zap grease stains off a woollen toga
    const zaps: number[] = (v.zapAt ?? [0.36, 0.52, 0.68]).map((t: number) => t * dur);
    const stains: P[] = [
      [700, 950],
      [890, 1110],
      [730, 1290],
    ];
    const JX = 300;
    const JY = 1820;
    const JS = 1.6;
    const mouthY = JY - 370 * JS;
    const life = 22;
    const n = Math.ceil(dur / 5);
    body = (
      <>
        <Workshop floorY={1180} f={f} cloths={false} />
        <rect x={0} y={0} width={1080} height={1920} fill={C.cream} opacity={0.3} />
        <Steam f={f} x0={150} x1={950} y={1400} n={6} o={0.4} seed="am" />
        <Toga f={f} zaps={zaps} stains={stains} />
        <Stink f={f} xs={[JX - 120, JX + 120]} y={mouthY - 10} h={260} />
        <Jar x={JX} y={JY} s={JS} f={f} label={v.jarLabel ?? "OLD PEE"} slosh />
        {new Array(n).fill(0).map((_, i) => {
          const spawn = 3 + i * 5;
          const age = f - spawn;
          if (age < 0 || age > life) return null;
          const t = age / life;
          const tgt = stains[i % stains.length];
          const bx = lerp(JX + 10, tgt[0], t);
          const by = lerp(mouthY - 30, tgt[1], t) - Math.sin(t * Math.PI) * 200;
          const r = lerp(26, 48, t);
          return (
            <g key={i} transform={`translate(${bx} ${by})`} opacity={interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0])}>
              <circle r={r} fill="#E9FBC9" stroke={INK} strokeWidth={5} />
              <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.2} fill="#FFFFFF" />
              <text x={0} y={r * 0.3} textAnchor="middle" fontFamily={titleFont} fontSize={r * 0.75} fill={INK}>
                NH
                <tspan fontSize={r * 0.5} dy={r * 0.15}>
                  3
                </tspan>
              </text>
            </g>
          );
        })}
      </>
    );
  } else if (mode === "tread") {
    // a row of treading stalls: togas in, feet in, stomp
    const togaAt = (v.togaAt ?? 0.08) * dur;
    const tp = ease(f, togaAt, togaAt + 12);
    const landed = f >= togaAt + 12;
    body = (
      <>
        <Workshop floorY={1140} f={f} />
        <Steam f={f} x0={80} x1={1000} y={1300} n={10} o={0.5} seed="tr" />
        <StompVat x={175} y={1500} s={0.5} f={f} off={0} per={13} pinch={false} tunic="#E9D8B8" hair="#1E140C" skin="#C88A5C" />
        <StompVat x={905} y={1500} s={0.5} f={f} off={7} per={13} pinch tunic="#F0E2C6" hair="#5A3A22" skin="#E0AD80" />
        <StompVat x={540} y={1500} s={0.56} f={f} off={3} per={13} toga={landed ? 1 : 0} />
        {!landed ? (
          <g transform={`translate(540 ${lerp(160, 1480, tp)}) rotate(${lerp(-30, 8, tp)}) scale(${lerp(1.3, 0.6, tp)})`}>
            <path d="M -200 -60 Q -100 -110 0 -70 Q 110 -120 210 -60 L 180 90 Q 60 60 -40 100 Q -140 70 -190 100 Z" fill={TUNIC} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <path d="M -120 -70 Q -110 20 -140 80 M 40 -80 Q 60 0 30 90" stroke={TUNIC_D} strokeWidth={7} fill="none" />
          </g>
        ) : null}
      </>
    );
  } else if (mode === "emperor") {
    // Vespasian slams a TAXED stamp on a jar of pee; coins pour out
    const stampAt = (v.stampAt ?? 0.55) * dur;
    const VX = 360;
    const VY = 1290;
    const VS = 1.1;
    const JX = 800;
    const JY = 1268;
    const JS = 0.9;
    const down = ease(f, stampAt - 7, stampAt);
    const lift = f > stampAt + 10 ? ease(f, stampAt + 10, stampAt + 20) * 0.5 : 0;
    const wob = Math.sin(f / 5) * 12 * (1 - down);
    const hand: P = [400, lerp(-610 + wob, -406, down - lift)];
    const elbow: P = [lerp(330, 300, down), lerp(-480, -300, down)];
    const hw: P = [VX + hand[0] * VS, VY + hand[1] * VS];
    const st = ease(f, stampAt, stampAt + 5);
    const coins = new Array(9).fill(0).map((_, i) => {
      const spawn = stampAt + 3 + i * 3;
      const age = f - spawn;
      if (age < 0) return null;
      const t = Math.min(1, age / 12);
      const tx = i < 5 ? 600 + i * 40 : 900 + (i - 5) * 40;
      const ty = 1230 - (i % 2) * 14;
      const cx = lerp(JX, tx, t);
      const cy = lerp(JY - 370 * JS, ty, t) - Math.sin(t * Math.PI) * 180;
      return <Coin key={i} x={cx} y={cy} r={32} f={f + i * 3} />;
    });
    body = (
      <>
        <Palace f={f} ledgeY={1250} />
        <Roman x={VX} y={VY} s={VS} f={f} who="vesp" mood={f >= stampAt ? "grin" : "smug"} hand={hand} elbow={elbow} />
        <Ledge ledgeY={1250} />
        <Jar x={JX} y={JY} s={JS} f={f} label="PEE" slosh />
        {st > 0 ? (
          <g transform={`translate(${JX} ${JY - 150}) rotate(-12) scale(${lerp(2.2, 1, st)})`} opacity={Math.min(1, st * 1.4)}>
            <rect x={-150} y={-50} width={300} height={100} rx={12} fill="none" stroke={C.brick} strokeWidth={12} />
            <text x={0} y={24} textAnchor="middle" fontFamily={titleFont} fontSize={64} fill={C.brick} textLength={260} lengthAdjust="spacingAndGlyphs">
              TAXED!
            </text>
          </g>
        ) : null}
        <StampTool x={hw[0]} y={hw[1]} s={VS} />
        {coins}
      </>
    );
  } else if (mode === "coin") {
    // Vespasian holds a coin under his son Titus's nose: smell anything?
    const raiseAt = (v.raiseAt ?? 0.22) * dur;
    const sniffAt = (v.sniffAt ?? 0.45) * dur;
    const headAt = (v.headAt ?? 0.72) * dur;
    const r = ease(f, raiseAt, raiseAt + 10);
    const hand: P = [lerp(240, 275, r), lerp(-240, -488, r)];
    const elbow: P = [lerp(300, 330, r), lerp(-260, -330, r)];
    const titusMood: Mood = f < sniffAt ? "ew" : f < headAt ? "sniff" : "wow";
    if (f < headAt) headline = undefined;
    const gross = f < sniffAt ? popIn(f, 2, 8) : 0;
    const sniff = f >= sniffAt && f < headAt ? popIn(f, sniffAt, 7) : 0;
    body = (
      <>
        <Palace f={f} ledgeY={1500} />
        <Roman x={810} y={1560} s={0.95} f={f} who="titus" mood={titusMood} flip />
        <Roman x={300} y={1560} s={1.05} f={f} who="vesp" mood="smug" hand={hand} elbow={elbow} hold="coin" />
        <Ledge ledgeY={1500} />
        {gross > 0 ? (
          <g transform={`translate(800 650) scale(${gross})`}>
            <path d="M -190 -80 Q -190 -130 -140 -130 L 140 -130 Q 190 -130 190 -80 L 190 40 Q 190 90 140 90 L 40 90 L 10 150 L -10 90 L -140 90 Q -190 90 -190 40 Z" fill={C.cream} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <text x={0} y={2} textAnchor="middle" fontFamily={titleFont} fontSize={84} fill={C.brick}>
              GROSS!
            </text>
          </g>
        ) : null}
        <Burst x={560} y={760} p={sniff} text="SNIFF!" size={70} rot={-6} />
        <Chip x={540} y={650} p={popIn(f, headAt + 8, 9)} text={v.chip ?? "PECUNIA NON OLET"} w={680} font={typeFont} col={C.cream} size={58} />
      </>
    );
  } else if (mode === "paris") {
    // twist: a marble Vespasian ("AND TODAY?") → flash → a Paris street urinal, still called a "vespasienne"
    const answerAt = (v.answerAt ?? 0.5) * dur;
    if (f < answerAt) {
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#3E7F86" />
          <ellipse cx={540} cy={1100} rx={520} ry={760} fill="url(#ep060spot)" />
          <rect x={0} y={1640} width={1080} height={280} fill="#2F6168" />
          <rect x={330} y={1500} width={420} height={260} fill={MARBLE} stroke={INK} strokeWidth={7} />
          <rect x={300} y={1480} width={480} height={44} rx={8} fill={MARBLE} stroke={INK} strokeWidth={7} />
          <Roman x={540} y={1490} s={1.05} f={0} who="vesp" marble />
          {[0, 1, 2].map((k) => {
            const p = popIn(f, 4 + k * 7, 8);
            return p > 0 ? (
              <text key={k} x={[170, 900, 860][k]} y={[900, 820, 1250][k]} textAnchor="middle" fontFamily={titleFont} fontSize={150} fill={C.mustard} stroke={INK} strokeWidth={8} transform={`rotate(${[-12, 10, 6][k]} ${[170, 900, 860][k]} ${[900, 820, 1250][k]})`} opacity={p} paintOrder="stroke">
                ?
              </text>
            ) : null;
          })}
        </>
      );
    } else {
      answerOn = !!v.answer;
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      body = (
        <>
          <ParisStreet f={f} />
          <Vespasienne x={470} y={1700} s={1.2} f={f} />
          <Roman x={900} y={1640} s={0.52} f={f} who="vesp" mood="grin" />
          <g transform={`translate(470 660) rotate(-2) scale(${popIn(f, answerAt + 8, 9)})`}>
            <rect x={-300} y={-58} width={600} height={116} rx={16} fill={C.cream} stroke={INK} strokeWidth={8} />
            <text x={0} y={22} textAnchor="middle" fontFamily={titleFont} fontSize={62} fill={IRON_GD} textLength={520} lengthAdjust="spacingAndGlyphs">
              {v.label ?? "VESPASIENNE"}
            </text>
            <path d="M -20 58 L 0 110 L 20 58" fill={C.cream} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          </g>
          {v.chip ? <Chip x={540} y={1590} p={popIn(f, answerAt + 20, 9)} text={v.chip} w={720} rot={2} /> : null}
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
      </svg>
      {headline && mode === "coin" ? (
        <Sequence from={Math.round((v.headAt ?? 0.72) * dur)} layout="none">
          <Headline text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} />
        </Sequence>
      ) : headline ? (
        <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} />
      ) : null}
      {mode === "paris" && answerOn ? (
        <Sequence from={Math.round((v.answerAt ?? 0.5) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} color={C.brick} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
