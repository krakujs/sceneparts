import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep063 Milkmaid – the dairy girl whose cowpox blisters gave Edward Jenner the smallpox vaccine (1796).
// Look: a warm DAWN MEADOW (peach sky, rising sun, green hills, a rail fence) – unlike ep062's blue summer garden.
// The milkmaid: frilly white mob cap, rosy cheeks, blue bodice, white apron, wooden yoke with two milk pails.
// visual: { mode: "milking" | "yoke" | "smallpox" | "immune" | "vacca", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?: "left" | "right",
//           blisterAt? (yoke), dieAt?, safeAt?, chip?, chipAt? (smallpox), germAt?, okAt?, chip? (immune),
//           answer?, answerAccent?, answerAt?, answerSize?, chip? (vacca) }
// Medically careful: no gore, no modern claims – only the 1796 story and the word vacca = cow.

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const GRASS = "#8CCB5E";
const GRASS_D = "#64A944";
const HILL = "#A9D872";
const HILL_D = "#7DBB55";
const FENCE = "#B07A45";
const FENCE_D = "#7E5228";
const SKIN = "#F2C29C";
const SKIN_D = "#D39A72";
const CHEEK = "#F08A8A";
const HAIR = "#8A4E2A";
const HAIR_D = "#64341A";
const CAP = "#FFFDF6";
const CAP_D = "#DCD6C8";
const BODICE = "#3F78C0";
const BODICE_D = "#2B5690";
const SKIRT = "#C9503E";
const SKIRT_D = "#9C3A2C";
const APRON = "#FBF7EE";
const APRON_D = "#DCD3C2";
const BLOUSE = "#FFFFFF";
const WOOD = "#B9813F";
const WOOD_D = "#83561F";
const WOOD_HI = "#D9A35E";
const METAL = "#9AA3AC";
const MILK = "#FFFFFF";
const MILK_D = "#E8EEF2";
const COW = "#FFF8EE";
const COW_P = "#8A4A2A";
const COW_PINK = "#F6A9B4";
const COW_PINK_D = "#D97C8C";
const HORN = "#F3E6C4";
const BLISTER = "#F7E2B8";
const BLISTER_R = "#E0606A";
const SPOT = "#D2443C";
const GERM = "#7CC24A";
const GERM_D = "#4E8E2C";
const COAT = "#2C2A35";
const COAT_HI = "#45424F";
const WIG = "#F1EEE8";
const WIG_D = "#CFC9BD";
const GOLD = "#F2B544";
const GOLD_D = "#C88A1E";
const SHIRT_BOY = "#E9DDC4";
const BREECH = "#6E5A3E";
const STONE = "#A3A6AE";
const STONE_D = "#7C808A";
const CLINIC_A = "#BFE8F0";
const CLINIC_B = "#F4FBFD";

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
        <div key={i} style={{ position: "absolute", ...(left ? { left: 70 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 60, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// two-part arm: sleeve (shoulder → elbow), bare forearm (elbow → hand)
const Arm: React.FC<{ a: P; k: P; b: P; w: number; sleeve: string; skin?: string }> = ({ a, k, b, w, sleeve, skin = SKIN }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} L ${k[0]} ${k[1]} L ${b[0]} ${b[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${k[0]} ${k[1]} L ${b[0]} ${b[1]}`} stroke={skin} strokeWidth={w * 0.82} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} L ${k[0]} ${k[1]}`} stroke={sleeve} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
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

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep063dawn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F7B88C" />
      <stop offset="0.55" stopColor="#FCDDA6" />
      <stop offset="1" stopColor="#FFF3D2" />
    </linearGradient>
    <linearGradient id="ep063dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5B5A8E" />
      <stop offset="1" stopColor="#C99AA6" />
    </linearGradient>
    <linearGradient id="ep063clinic" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={CLINIC_A} />
      <stop offset="1" stopColor={CLINIC_B} />
    </linearGradient>
    <radialGradient id="ep063glow">
      <stop offset="0" stopColor="#FFF4C8" stopOpacity={0.9} />
      <stop offset="1" stopColor="#FFF4C8" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep063aura">
      <stop offset="0.55" stopColor="#FFE38A" stopOpacity={0} />
      <stop offset="0.8" stopColor="#FFE38A" stopOpacity={0.55} />
      <stop offset="1" stopColor="#FFE38A" stopOpacity={0} />
    </radialGradient>
    <linearGradient id="ep063parlour" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#E8D2A8" />
      <stop offset="1" stopColor="#D2B580" />
    </linearGradient>
  </defs>
);

// ---------- set pieces ----------

// dawn meadow: peach sky, rising sun, clouds, rolling hills, a rail fence, lawn
const Meadow: React.FC<{ f: number; horizon: number; fence?: boolean; dusk?: boolean; sunX?: number }> = ({ f, horizon, fence = true, dusk = false, sunX = 820 }) => {
  const rise = interpolate(f, [0, 120], [40, 0], clamp);
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill={dusk ? "url(#ep063dusk)" : "url(#ep063dawn)"} />
      {!dusk ? (
        <g>
          <circle cx={sunX} cy={horizon - 330 + rise} r={240} fill="#FFF0B8" opacity={0.35} />
          <circle cx={sunX} cy={horizon - 330 + rise} r={130} fill="#FFE07A" stroke="#F7C64E" strokeWidth={10} />
        </g>
      ) : (
        <circle cx={860} cy={260} r={70} fill="#F6EBD0" opacity={0.85} />
      )}
      {[0, 1, 2].map((k) => {
        const cx = ((k * 430 + f * 0.7) % 1500) - 200;
        const cy = 170 + k * 120;
        return (
          <g key={k} opacity={dusk ? 0.5 : 0.95}>
            <ellipse cx={cx} cy={cy} rx={110} ry={40} fill="#FFFFFF" />
            <ellipse cx={cx + 60} cy={cy - 24} rx={70} ry={42} fill="#FFFFFF" />
            <ellipse cx={cx - 50} cy={cy - 12} rx={60} ry={34} fill="#FFFFFF" />
          </g>
        );
      })}
      <path d={`M -40 ${horizon} Q 260 ${horizon - 260} 620 ${horizon - 60} Q 860 ${horizon - 220} 1120 ${horizon - 40} L 1120 ${horizon + 40} L -40 ${horizon + 40} Z`} fill={dusk ? "#7E8E6A" : HILL_D} stroke={INK} strokeWidth={6} />
      <path d={`M -40 ${horizon + 10} Q 380 ${horizon - 140} 760 ${horizon + 10} Q 960 ${horizon - 80} 1120 ${horizon} L 1120 1920 L -40 1920 Z`} fill={dusk ? "#8E9C70" : HILL} stroke={INK} strokeWidth={6} />
      <rect x={0} y={horizon + 60} width={1080} height={1920 - horizon} fill={dusk ? "#94A672" : GRASS} />
      <path d={`M 0 ${horizon + 60} L 1080 ${horizon + 60}`} stroke={GRASS_D} strokeWidth={8} />
      {fence ? (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <rect key={k} x={k * 180 + 10} y={horizon - 90} width={30} height={170} fill={FENCE} stroke={INK} strokeWidth={5} />
          ))}
          {[horizon - 60, horizon].map((ry) => (
            <rect key={ry} x={-10} y={ry} width={1100} height={24} rx={8} fill={FENCE} stroke={INK} strokeWidth={5} />
          ))}
          <path d={`M -10 ${horizon - 52} L 1090 ${horizon - 52}`} stroke={FENCE_D} strokeWidth={4} />
        </g>
      ) : null}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M ${k * 200 + 40} ${horizon + 160 + (k % 2) * 150} q 10 -24 20 0 q 10 -24 20 0`} stroke={GRASS_D} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <g key={`d${k}`} transform={`translate(${(k * 157 + 60) % 1080} ${horizon + 120 + ((k * 97) % 260)})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-9} rx={5} ry={9} fill="#FFFFFF" transform={`rotate(${a})`} />
          ))}
          <circle r={5} fill={GOLD} />
        </g>
      ))}
    </>
  );
};

// wooden milk pail, origin = bottom centre
const Pail: React.FC<{ x: number; y: number; s?: number; fill?: number; f?: number; slosh?: boolean }> = ({ x, y, s = 1, fill = 0.8, f = 0, slosh = false }) => {
  const top = -150;
  const sl = slosh ? Math.sin(f / 5) * 5 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -70 -150 Q 0 -250 70 -150" stroke={INK} strokeWidth={14} fill="none" />
      <path d="M -70 -150 Q 0 -250 70 -150" stroke={METAL} strokeWidth={6} fill="none" />
      <path d={`M -78 ${top} L 78 ${top} L 62 0 L -62 0 Z`} fill={WOOD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[-40, 0, 40].map((sx) => (
        <path key={sx} d={`M ${sx} ${top + 4} L ${sx * 0.8} -4`} stroke={WOOD_D} strokeWidth={4} />
      ))}
      {[top + 28, -34].map((by) => (
        <path key={by} d={`M ${-78 + (by - top) * 0.107} ${by} L ${78 - (by - top) * 0.107} ${by}`} stroke={INK} strokeWidth={16} />
      ))}
      {[top + 28, -34].map((by) => (
        <path key={`m${by}`} d={`M ${-78 + (by - top) * 0.107} ${by} L ${78 - (by - top) * 0.107} ${by}`} stroke={METAL} strokeWidth={8} />
      ))}
      <ellipse cx={0} cy={top} rx={78} ry={20} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      {fill > 0 ? <ellipse cx={0} cy={top + 4 + (1 - fill) * 10} rx={70 - (1 - fill) * 4} ry={14} fill={MILK} transform={`rotate(${sl} 0 ${top})`} /> : null}
      {fill > 0.6
        ? [-40, -12, 18, 44].map((fx, k) => <circle key={k} cx={fx} cy={top - 4 - (k % 2) * 6} r={13} fill={MILK} stroke={MILK_D} strokeWidth={3} />)
        : null}
    </g>
  );
};

// cowpox pustule: a pale raised blister with a red ring and a dark centre dot
const Blister: React.FC<{ x: number; y: number; r: number; p?: number }> = ({ x, y, r, p = 1 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <circle r={r * 1.55} fill={BLISTER_R} opacity={0.45} />
      <circle r={r} fill={BLISTER} stroke={INK} strokeWidth={Math.max(2, r * 0.22)} />
      <circle r={r * 0.32} fill="#B98A5A" />
      <ellipse cx={-r * 0.35} cy={-r * 0.38} rx={r * 0.28} ry={r * 0.18} fill="#FFFFFF" opacity={0.8} />
    </g>
  );

// big cartoon cow face, front view; origin = centre of the face
const CowHead: React.FC<{ x: number; y: number; s?: number; f: number; chew?: boolean; mood?: "calm" | "happy" | "wink"; bell?: boolean }> = ({ x, y, s = 1, f, chew = true, mood = "calm", bell = true }) => {
  const jaw = chew ? Math.sin(f / 4) * 6 : 0;
  const ear = Math.sin(f / 13) * 6;
  const blink = f % 80 > 75;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* horns */}
      {[-1, 1].map((sd) => (
        <path key={`h${sd}`} d={`M ${sd * 60} -120 Q ${sd * 110} -170 ${sd * 96} -230 Q ${sd * 130} -180 ${sd * 96} -104 Z`} fill={HORN} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ))}
      {/* ears */}
      {[-1, 1].map((sd) => (
        <g key={`e${sd}`} transform={`rotate(${sd * (ear - 8)} ${sd * 100} -80)`}>
          <ellipse cx={sd * 170} cy={-70} rx={78} ry={36} fill={COW} stroke={INK} strokeWidth={6} />
          <ellipse cx={sd * 172} cy={-68} rx={50} ry={18} fill={COW_PINK} />
        </g>
      ))}
      {/* face */}
      <path d="M -112 -130 Q 0 -170 112 -130 Q 140 0 110 110 Q 0 130 -110 110 Q -140 0 -112 -130 Z" fill={COW} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -112 -130 Q -40 -150 -20 -120 Q -50 -60 -126 -40 Q -136 -100 -112 -130 Z" fill={COW_P} />
      <path d="M 70 -150 Q 116 -140 118 -96 Q 90 -100 70 -150 Z" fill={COW_P} />
      <path d="M -40 -150 Q 0 -190 40 -150 Q 0 -130 -40 -150 Z" fill={COW_P} stroke={INK} strokeWidth={5} />
      {/* eyes */}
      {[-1, 1].map((sd) =>
        blink || (mood === "wink" && sd === 1) ? (
          <path key={`y${sd}`} d={`M ${sd * 52 - 24} -40 Q ${sd * 52} -26 ${sd * 52 + 24} -40`} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        ) : (
          <g key={`y${sd}`}>
            <ellipse cx={sd * 52} cy={-40} rx={26} ry={30} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            <circle cx={sd * 52 + 4} cy={-34} r={14} fill={INK} />
            <circle cx={sd * 52 + 9} cy={-40} r={5} fill="#FFFFFF" />
            <path d={`M ${sd * 52 - 26} -76 l ${sd * 6} 10 M ${sd * 52 - 8} -80 l 0 12 M ${sd * 52 + 12} -78 l ${-sd * 4} 11`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
          </g>
        ),
      )}
      {/* muzzle + jaw */}
      <g transform={`translate(0 ${jaw * 0.5})`}>
        <ellipse cx={0} cy={66} rx={112} ry={70} fill={COW_PINK} stroke={INK} strokeWidth={7} />
        <ellipse cx={-42} cy={56} rx={14} ry={20} fill={COW_PINK_D} stroke={INK} strokeWidth={4} />
        <ellipse cx={42} cy={56} rx={14} ry={20} fill={COW_PINK_D} stroke={INK} strokeWidth={4} />
        {mood === "happy" || mood === "wink" ? (
          <path d="M -46 100 Q 0 140 46 100" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        ) : (
          <path d={`M -30 ${108 + jaw * 0.3} Q 0 ${116 + jaw} 30 ${108 + jaw * 0.3}`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
      </g>
      {bell ? (
        <g>
          <path d="M -96 130 Q 0 176 96 130" stroke={INK} strokeWidth={22} fill="none" />
          <path d="M -96 130 Q 0 176 96 130" stroke="#C0392B" strokeWidth={12} fill="none" />
          <g transform={`rotate(${Math.sin(f / 7) * 8} 0 152)`}>
            <path d="M -30 160 Q -30 214 -40 226 L 40 226 Q 30 214 30 160 Q 0 146 -30 160 Z" fill={GOLD} stroke={INK} strokeWidth={5} />
            <circle cx={0} cy={232} r={10} fill={GOLD_D} stroke={INK} strokeWidth={4} />
          </g>
        </g>
      ) : null}
    </g>
  );
};

// side-view cow facing right, head turned to the viewer; origin = ground under the middle of the body
const Cow: React.FC<{ x: number; y: number; s?: number; f: number; udderPulse?: number }> = ({ x, y, s = 1, f, udderPulse = 0 }) => {
  const tail = Math.sin(f / 11) * 14;
  const leg = (lx: number, back: boolean) => (
    <g key={lx}>
      <path d={`M ${lx} -330 L ${lx + 4} -40`} stroke={INK} strokeWidth={66} strokeLinecap="round" />
      <path d={`M ${lx} -330 L ${lx + 4} -40`} stroke={back ? "#EFE6D8" : COW} strokeWidth={52} strokeLinecap="round" />
      <path d={`M ${lx - 30} -42 L ${lx + 34} -42 L ${lx + 30} 0 L ${lx - 26} 0 Z`} fill="#4A3628" stroke={INK} strokeWidth={5} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* far legs */}
      {leg(-210, true)}
      {leg(210, true)}
      {/* tail */}
      <path d={`M -300 -560 Q ${-350 + tail} -420 ${-336 + tail * 1.6} -270`} stroke={INK} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M -300 -560 Q ${-350 + tail} -420 ${-336 + tail * 1.6} -270`} stroke={COW} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d={`M ${-336 + tail * 1.6} -290 q -24 30 -6 70 q 20 -10 30 -10 q 6 -40 -24 -60 Z`} fill={COW_P} stroke={INK} strokeWidth={5} />
      {/* body */}
      <path d="M -310 -560 Q -320 -640 -220 -650 L 200 -660 Q 300 -660 316 -560 Q 330 -420 290 -330 Q 0 -300 -290 -330 Q -330 -440 -310 -560 Z" fill={COW} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -200 -650 Q -120 -560 -200 -470 Q -270 -440 -306 -500 Q -320 -600 -260 -640 Z" fill={COW_P} />
      <path d="M 20 -655 Q 110 -600 60 -520 Q -10 -500 -40 -580 Q -30 -640 20 -655 Z" fill={COW_P} />
      <path d="M 180 -440 Q 250 -470 286 -400 Q 270 -340 210 -340 Q 160 -380 180 -440 Z" fill={COW_P} />
      <path d="M -100 -360 Q -60 -400 -20 -360" stroke="#E9DFCF" strokeWidth={6} fill="none" />
      {/* near legs */}
      {leg(-250, false)}
      {leg(170, false)}
      {/* udder + four teats */}
      <g transform={`translate(-95 -318) scale(${1 + udderPulse * 0.04})`}>
        <ellipse cx={0} cy={0} rx={96} ry={62} fill={COW_PINK} stroke={INK} strokeWidth={6} />
        {[-54, -18, 18, 54].map((tx, k) => (
          <rect key={k} x={tx - 11} y={34 + (k % 2) * 4} width={22} height={50} rx={11} fill={COW_PINK_D} stroke={INK} strokeWidth={5} />
        ))}
        <ellipse cx={-30} cy={-16} rx={30} ry={12} fill="#FFFFFF" opacity={0.4} />
      </g>
      {/* neck + head turned to camera */}
      <path d="M 150 -640 Q 220 -730 250 -710 L 300 -540 Q 250 -500 190 -520 Z" fill={COW} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <CowHead x={250} y={-730} s={0.86} f={f} />
    </g>
  );
};

// ---------- the milkmaid ----------
// Front view. Origin = hips (seat). Head centre (0, -680). seated: skirt to +220, stool, ground at +300;
// standing: skirt to +360, ground at +390. Yoke across the shoulders with ropes to two pails (local coords).
type Pose = "milk" | "yoke" | "show" | "hips";
type Mood = "smile" | "focus" | "ew" | "proud" | "wow";
const BL_A: Array<[number, number, number]> = [
  [-14, -12, 11],
  [16, 8, 9],
  [-4, 20, 7],
];
const BL_PALM: Array<[number, number, number]> = [
  [-16, -6, 14],
  [18, 12, 12],
  [-4, 26, 10],
  [20, -22, 9],
];
const Maid: React.FC<{
  x: number;
  y: number;
  s?: number;
  f: number;
  seated?: boolean;
  pose?: Pose;
  mood?: Mood;
  gaze?: number;
  yoke?: boolean;
  pailL?: P | null;
  pailR?: P | null;
  handA?: P;
  handB?: P;
  elbowA?: P;
  elbowB?: P;
  blisters?: number;
  squeeze?: number;
  glow?: number;
}> = ({ x, y, s = 1, f, seated = true, pose = "milk", mood = "smile", gaze = 0, yoke = true, pailL = null, pailR = null, handA, handB, elbowA, elbowB, blisters = 0, squeeze = 0, glow = 0 }) => {
  const shA: P = [-128, -520];
  const shB: P = [128, -520];
  const hem = seated ? 220 : 360;
  const sway = seated ? 0 : Math.sin(f / 8) * 3;
  const blink = f % 90 > 85;
  // default arm targets per pose
  let hA: P = handA ?? [-250, -300];
  let hB: P = handB ?? [250, -300];
  let eA: P = elbowA ?? [-220, -380];
  let eB: P = elbowB ?? [220, -380];
  if (pose === "yoke") {
    hA = handA ?? [-292, -430];
    hB = handB ?? [292, -430];
    eA = elbowA ?? [-236, -360];
    eB = elbowB ?? [236, -360];
  } else if (pose === "show") {
    hA = handA ?? [-280, -650];
    hB = handB ?? [280, -650];
    eA = elbowA ?? [-262, -420];
    eB = elbowB ?? [262, -420];
  } else if (pose === "hips") {
    hA = handA ?? [-118, -312];
    hB = handB ?? [118, -312];
    eA = elbowA ?? [-262, -400];
    eB = elbowB ?? [262, -400];
  }
  const sq = Math.sin(f / 3.2) * 14 * squeeze;
  if (pose === "milk") {
    hA = [hA[0], hA[1] + sq];
    hB = [hB[0], hB[1] - sq];
  }
  const palm = pose === "show";
  const hand = (h: P, side: number, key: string) => {
    const r = palm ? 50 : 34;
    return (
      <g key={key}>
        {palm ? (
          <g>
            {[-30, -10, 10, 30].map((fx, k) => (
              <rect key={k} x={h[0] + fx - 11} y={h[1] - r - 42 + Math.abs(k - 1.5) * 8} width={22} height={56} rx={11} fill={SKIN} stroke={INK} strokeWidth={5} />
            ))}
            <rect x={h[0] - side * 62} y={h[1] - 30} width={22} height={50} rx={11} fill={SKIN} stroke={INK} strokeWidth={5} transform={`rotate(${side * 40} ${h[0] - side * 51} ${h[1] - 5})`} />
          </g>
        ) : null}
        <circle cx={h[0]} cy={h[1]} r={r} fill={SKIN} stroke={INK} strokeWidth={6} />
        {(palm ? BL_PALM : BL_A).map(([bx, by, br], k) => {
          const n = palm ? BL_PALM.length : BL_A.length;
          const p = interpolate(blisters * n, [k, k + 0.6], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.6, 0.4, 1) });
          return <Blister key={k} x={h[0] + bx * side} y={h[1] + by} r={br} p={p} />;
        })}
      </g>
    );
  };
  const eyes = () => {
    const gx = gaze * 10;
    if (blink) return <path d="M -62 -690 Q -42 -678 -22 -690 M 22 -690 Q 42 -678 62 -690" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
    if (mood === "proud") return <path d="M -64 -688 Q -42 -706 -20 -688 M 20 -688 Q 42 -706 64 -688" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />;
    const big = mood === "ew" || mood === "wow";
    return (
      <g>
        {[-42, 42].map((ex) => (
          <g key={ex}>
            <ellipse cx={ex} cy={-690} rx={big ? 22 : 18} ry={big ? 26 : 22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            <circle cx={ex + gx} cy={-686} r={big ? 9 : 11} fill={INK} />
            <circle cx={ex + gx + 4} cy={-691} r={3.5} fill="#FFFFFF" />
            <path d={`M ${ex - 20} -716 l -8 -8 M ${ex + 18} -716 l 8 -8`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
          </g>
        ))}
      </g>
    );
  };
  const mouth = () => {
    if (mood === "ew") return <path d="M -34 -612 Q -18 -628 0 -612 Q 18 -596 34 -612" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />;
    if (mood === "wow") return <ellipse cx={0} cy={-610} rx={18} ry={24} fill="#8A2A2A" stroke={INK} strokeWidth={5} />;
    if (mood === "focus") return <path d="M -24 -620 Q 4 -600 30 -622" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />;
    return (
      <g>
        <path d="M -40 -626 Q 0 -572 40 -626 Z" fill="#8A2A2A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -26 -606 Q 0 -592 26 -606" stroke="#F07A7A" strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
    );
  };
  const rope = (end: P, pail: P) => {
    const top: P = [pail[0], pail[1] - 200];
    const d = `M ${end[0]} ${end[1]} Q ${lerp(end[0], top[0], 0.5) + (top[0] - end[0]) * 0.1} ${lerp(end[1], top[1], 0.55) + 30} ${top[0]} ${top[1]}`;
    return (
      <g>
        <path d={d} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={d} stroke="#D9B56A" strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sway} 0 300)`}>
      {glow > 0 ? <circle cx={0} cy={-300} r={620} fill="url(#ep063aura)" opacity={glow} /> : null}
      {/* stool */}
      {seated ? (
        <g>
          {[-130, 0, 130].map((lx) => (
            <path key={lx} d={`M ${lx * 0.6} 180 L ${lx} 300`} stroke={INK} strokeWidth={28} strokeLinecap="round" />
          ))}
          {[-130, 0, 130].map((lx) => (
            <path key={`w${lx}`} d={`M ${lx * 0.6} 180 L ${lx} 300`} stroke={WOOD} strokeWidth={16} strokeLinecap="round" />
          ))}
        </g>
      ) : null}
      {/* skirt + apron */}
      <path d={`M -100 -300 Q -210 ${hem * 0.3 - 100} -${seated ? 290 : 250} ${hem} Q -200 ${hem + 26} -110 ${hem + 6} Q 0 ${hem + 30} 110 ${hem + 6} Q 200 ${hem + 26} ${seated ? 290 : 250} ${hem} Q 210 ${hem * 0.3 - 100} 100 -300 Z`} fill={SKIRT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M -150 ${hem - 30} Q 0 ${hem} 150 ${hem - 30}`} stroke={SKIRT_D} strokeWidth={8} fill="none" />
      <path d={`M -84 -300 Q -150 ${hem * 0.4 - 90} -170 ${hem - 40} Q 0 ${hem - 10} 170 ${hem - 40} Q 150 ${hem * 0.4 - 90} 84 -300 Z`} fill={APRON} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M -60 -200 Q -80 ${hem * 0.3} -96 ${hem - 60} M 60 -200 Q 80 ${hem * 0.3} 96 ${hem - 60}`} stroke={APRON_D} strokeWidth={5} fill="none" />
      {/* shoes */}
      {[-1, 1].map((sd) => (
        <ellipse key={sd} cx={sd * 84} cy={hem + 30} rx={50} ry={24} fill="#3A2A20" stroke={INK} strokeWidth={5} />
      ))}
      {/* pails on the ground + ropes up to the yoke */}
      {yoke && pailL ? rope([-300, -500], pailL) : null}
      {yoke && pailR ? rope([300, -500], pailR) : null}
      {pailL ? <Pail x={pailL[0]} y={pailL[1]} f={f} fill={0.85} /> : null}
      {pailR ? <Pail x={pailR[0]} y={pailR[1]} f={f} fill={0.7} slosh /> : null}
      {/* torso */}
      <path d="M -132 -540 Q 0 -566 132 -540 L 100 -300 Q 0 -286 -100 -300 Z" fill={BODICE} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -26 -470 L 26 -430 M 26 -470 L -26 -430 M -26 -420 L 26 -380 M 26 -420 L -26 -380 M -26 -370 L 26 -330 M 26 -370 L -26 -330" stroke={CAP} strokeWidth={5} />
      <path d="M -100 -300 Q 0 -286 100 -300" stroke={BODICE_D} strokeWidth={12} fill="none" />
      {/* fichu (white kerchief) */}
      <path d="M -136 -544 Q -60 -520 0 -440 Q 60 -520 136 -544 Q 60 -580 0 -572 Q -60 -580 -136 -544 Z" fill={BLOUSE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-26} y={-600} width={52} height={50} fill={SKIN} stroke={INK} strokeWidth={5} />
      {/* yoke across the shoulders */}
      {yoke ? (
        <g>
          <path d="M -312 -496 Q -160 -548 -60 -590 Q 0 -606 60 -590 Q 160 -548 312 -496" stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
          <path d="M -312 -496 Q -160 -548 -60 -590 Q 0 -606 60 -590 Q 160 -548 312 -496" stroke={WOOD} strokeWidth={32} fill="none" strokeLinecap="round" />
          <path d="M -280 -510 Q -160 -552 -60 -594" stroke={WOOD_HI} strokeWidth={8} fill="none" strokeLinecap="round" />
          {[-1, 1].map((sd) => (
            <circle key={sd} cx={sd * 300} cy={-500} r={14} fill={METAL} stroke={INK} strokeWidth={5} />
          ))}
        </g>
      ) : null}
      {/* head */}
      <g transform={`rotate(${pose === "milk" ? 6 : Math.sin(f / 20) * 2} 0 -600)`}>
        <ellipse cx={0} cy={-700} rx={128} ry={120} fill={HAIR} stroke={INK} strokeWidth={6} />
        <circle cx={0} cy={-680} r={100} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d="M -100 -700 Q -70 -760 0 -764 Q 70 -760 100 -700 Q 60 -736 0 -734 Q -60 -736 -100 -700 Z" fill={HAIR} stroke={INK} strokeWidth={5} />
        {[-1, 1].map((sd) => (
          <path key={sd} d={`M ${sd * 98} -700 Q ${sd * 128} -640 ${sd * 108} -590 Q ${sd * 96} -630 ${sd * 90} -660 Z`} fill={HAIR_D} stroke={INK} strokeWidth={4} />
        ))}
        <circle cx={-62} cy={-640} r={22} fill={CHEEK} opacity={0.55} />
        <circle cx={62} cy={-640} r={22} fill={CHEEK} opacity={0.55} />
        {[-70, -54, 54, 70].map((fx, k) => (
          <circle key={k} cx={fx} cy={-652 + (k % 2) * 8} r={3.5} fill="#C9805A" />
        ))}
        {eyes()}
        <path d="M -6 -664 Q 8 -650 -2 -640" stroke={SKIN_D} strokeWidth={6} fill="none" strokeLinecap="round" />
        {mouth()}
        {/* mob cap: puffy crown, ribbon, frilled edge */}
        <ellipse cx={0} cy={-800} rx={150} ry={92} fill={CAP} stroke={INK} strokeWidth={7} />
        <path d="M -110 -830 Q 0 -880 110 -830" stroke={CAP_D} strokeWidth={6} fill="none" />
        {new Array(13).fill(0).map((_, k) => {
          const a = Math.PI + (k / 12) * Math.PI;
          return <circle key={k} cx={Math.cos(a) * 128} cy={-722 + Math.sin(a) * 66} r={26} fill={CAP} stroke={INK} strokeWidth={5} />;
        })}
        <path d="M -126 -736 Q 0 -790 126 -736" stroke="#E25A6E" strokeWidth={16} fill="none" strokeLinecap="round" />
        <g transform="translate(118 -742)">
          <path d="M 0 0 l 34 -24 l 4 40 Z M 0 0 l 30 34 l 10 -20 Z" fill="#E25A6E" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <circle r={9} fill="#C2405A" stroke={INK} strokeWidth={3} />
        </g>
      </g>
      {/* arms + hands */}
      <Arm a={shA} k={eA} b={hA} w={60} sleeve={BLOUSE} />
      <Arm a={shB} k={eB} b={hB} w={60} sleeve={BLOUSE} />
      {[-1, 1].map((sd) => (
        <ellipse key={sd} cx={sd * 138} cy={-516} rx={52} ry={44} fill={BLOUSE} stroke={INK} strokeWidth={6} />
      ))}
      {hand(hA, -1, "a")}
      {hand(hB, 1, "b")}
    </g>
  );
};

// ---------- smallpox village ----------
// a sick villager wrapped in a blanket, red spots on the face; origin = bottom centre
const Villager: React.FC<{ x: number; y: number; s?: number; f: number; col: string; seed: string; hat?: boolean }> = ({ x, y, s = 1, f, col, seed, hat = false }) => {
  const shiver = Math.sin(f / 2.2 + random(seed) * 6) * 2.5;
  return (
    <g transform={`translate(${x + shiver} ${y}) scale(${s})`}>
      <path d="M -150 0 Q -170 -260 -110 -380 Q 0 -430 110 -380 Q 170 -260 150 0 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -110 -380 Q -40 -250 -60 0 M 110 -380 Q 50 -250 70 0" stroke={INK} strokeWidth={4} opacity={0.35} fill="none" />
      <circle cx={0} cy={-470} r={92} fill="#E8C7A6" stroke={INK} strokeWidth={6} />
      {new Array(9).fill(0).map((_, k) => (
        <circle key={k} cx={(random(`${seed}x${k}`) - 0.5) * 130} cy={-470 + (random(`${seed}y${k}`) - 0.5) * 120} r={7 + random(`${seed}r${k}`) * 6} fill={SPOT} opacity={0.9} />
      ))}
      <path d="M -50 -500 Q -34 -490 -18 -500 M 18 -500 Q 34 -490 50 -500" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M -58 -526 L -20 -516 M 58 -526 L 20 -516" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M -24 -424 Q 0 -440 24 -424" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {hat ? <path d="M -96 -520 Q -90 -590 0 -596 Q 90 -590 96 -520 Q 0 -540 -96 -520 Z" fill="#6E5A3E" stroke={INK} strokeWidth={5} /> : <path d="M -90 -500 Q -80 -580 0 -580 Q 80 -580 90 -500 Q 40 -550 0 -546 Q -40 -550 -90 -500 Z" fill="#5A3A24" stroke={INK} strokeWidth={5} />}
      <path d="M -96 -380 Q 0 -330 96 -380" stroke={INK} strokeWidth={5} fill="none" />
    </g>
  );
};

const Cottage: React.FC<{ x: number; y: number; s?: number; col?: string; roof?: string }> = ({ x, y, s = 1, col = "#E9D9B8", roof = "#9C7A4C" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-260} width={340} height={260} fill={col} stroke={INK} strokeWidth={6} />
    <path d="M -200 -250 L 0 -420 L 200 -250 Z" fill={roof} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -150 -290 L 150 -290 M -110 -330 L 110 -330 M -70 -370 L 70 -370" stroke="#7A5A30" strokeWidth={5} />
    <rect x={-40} y={-140} width={80} height={140} fill="#6A4A2A" stroke={INK} strokeWidth={5} />
    <rect x={-140} y={-200} width={70} height={60} fill="#3A3550" stroke={INK} strokeWidth={5} />
    <rect x={70} y={-200} width={70} height={60} fill="#3A3550" stroke={INK} strokeWidth={5} />
  </g>
);

const Gravestone: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <path d="M -110 0 L -110 -250 Q -110 -340 0 -340 Q 110 -340 110 -250 L 110 0 Z" fill={STONE} stroke={INK} strokeWidth={7} />
      <path d="M -80 -260 Q -80 -310 0 -312" stroke="#C3C6CC" strokeWidth={8} fill="none" />
      <path d="M 0 -270 L 0 -150 M -44 -230 L 44 -230" stroke={STONE_D} strokeWidth={16} strokeLinecap="round" />
      <ellipse cx={0} cy={4} rx={150} ry={22} fill={GRASS_D} stroke={INK} strokeWidth={5} />
    </g>
  );

// a cartoon smallpox germ: spiky green ball with a grumpy face
const Germ: React.FC<{ x: number; y: number; r?: number; f: number; rot?: number; o?: number }> = ({ x, y, r = 50, f, rot = 0, o = 1 }) => {
  const spikes = new Array(12).fill(0).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return (
      <g key={i}>
        <path d={`M ${Math.cos(a) * r * 0.8} ${Math.sin(a) * r * 0.8} L ${Math.cos(a) * r * 1.35} ${Math.sin(a) * r * 1.35}`} stroke={INK} strokeWidth={r * 0.2} strokeLinecap="round" />
        <circle cx={Math.cos(a) * r * 1.38} cy={Math.sin(a) * r * 1.38} r={r * 0.16} fill={GERM_D} stroke={INK} strokeWidth={3} />
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(f / 6) * 8})`} opacity={o}>
      {spikes}
      <circle r={r} fill={GERM} stroke={INK} strokeWidth={Math.max(3, r * 0.1)} />
      <circle cx={-r * 0.32} cy={-r * 0.12} r={r * 0.16} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={r * 0.32} cy={-r * 0.12} r={r * 0.16} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={-r * 0.3} cy={-r * 0.1} r={r * 0.07} fill={INK} />
      <circle cx={r * 0.3} cy={-r * 0.1} r={r * 0.07} fill={INK} />
      <path d={`M ${-r * 0.5} ${-r * 0.4} L ${-r * 0.12} ${-r * 0.26} M ${r * 0.5} ${-r * 0.4} L ${r * 0.12} ${-r * 0.26}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d={`M ${-r * 0.3} ${r * 0.38} Q 0 ${r * 0.2} ${r * 0.3} ${r * 0.38}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ---------- 1796: Dr Jenner + the boy ----------
// Jenner, standing, 3/4 to the left (towards the boy); origin = feet centre
const Jenner: React.FC<{ x: number; y: number; s?: number; f: number; mood?: "calm" | "happy"; lancetUp?: number }> = ({ x, y, s = 1, f, mood = "calm", lancetUp = 0 }) => {
  const bob = Math.sin(f / 18) * 3;
  const hand: P = [lerp(-170, -200, lancetUp), lerp(-640, -760, lancetUp)];
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
      {/* legs: breeches, white stockings, buckled shoes */}
      {[-50, 50].map((lx) => (
        <g key={lx}>
          <rect x={lx - 34} y={-360} width={68} height={140} rx={20} fill="#3E3A44" stroke={INK} strokeWidth={6} />
          <rect x={lx - 28} y={-230} width={56} height={200} rx={16} fill="#F4F1EA" stroke={INK} strokeWidth={6} />
          <path d={`M ${lx - 56} -6 Q ${lx - 50} -50 ${lx + 4} -46 L ${lx + 34} -40 L ${lx + 34} 0 Z`} fill="#1E1A20" stroke={INK} strokeWidth={5} />
          <rect x={lx - 22} y={-40} width={22} height={16} fill={GOLD} stroke={INK} strokeWidth={3} />
        </g>
      ))}
      {/* coat with tails */}
      <path d="M -150 -760 Q 0 -800 150 -760 L 190 -260 Q 120 -230 60 -300 L 0 -420 L -60 -300 Q -120 -230 -190 -260 Z" fill={COAT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -40 -760 L -10 -420 M 40 -760 L 10 -420" stroke={COAT_HI} strokeWidth={8} />
      {/* waistcoat + cravat */}
      <path d="M -40 -760 L 40 -760 L 20 -430 L -20 -430 Z" fill="#E7C46A" stroke={INK} strokeWidth={5} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={0} cy={-680 + k * 70} r={7} fill={INK} />
      ))}
      <path d="M -50 -790 Q 0 -760 50 -790 Q 40 -720 0 -700 Q -40 -720 -50 -790 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      {/* head + grey wig with side curls */}
      <circle cx={-10} cy={-900} r={96} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -104 -910 Q -110 -1010 -10 -1012 Q 90 -1010 90 -920 Q 60 -976 -10 -972 Q -70 -972 -104 -910 Z" fill={WIG} stroke={INK} strokeWidth={6} />
      {[0, 1].map((k) => (
        <ellipse key={k} cx={84} cy={-900 + k * 44} rx={30} ry={20} fill={WIG} stroke={INK} strokeWidth={5} />
      ))}
      <path d="M 70 -960 Q 130 -930 112 -860" stroke={INK} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M 70 -960 Q 130 -930 112 -860" stroke={WIG_D} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* face, looking left */}
      <path d="M -102 -900 L -128 -872 L -100 -862 Z" fill={SKIN_D} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {mood === "happy" ? (
        <path d="M -78 -922 Q -62 -940 -46 -922 M -20 -922 Q -4 -940 12 -922" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <circle cx={-62} cy={-920} r={9} fill={INK} />
          <circle cx={-6} cy={-920} r={9} fill={INK} />
        </g>
      )}
      <path d="M -82 -948 L -44 -942 M -26 -942 L 10 -948" stroke={WIG_D} strokeWidth={7} strokeLinecap="round" />
      <path d={mood === "happy" ? "M -76 -846 Q -46 -816 -16 -846" : "M -70 -846 Q -46 -836 -22 -846"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* far arm on hip, near arm holding the lancet */}
      <Arm a={[110, -740]} k={[200, -560]} b={[120, -470]} w={62} sleeve={COAT} skin={SKIN} />
      <circle cx={120} cy={-470} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
      <Arm a={[-110, -740]} k={[-210, -600]} b={hand} w={62} sleeve={COAT} skin={COAT} />
      <rect x={hand[0] - 34} y={hand[1] - 24} width={46} height={48} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      <circle cx={hand[0] - 20} cy={hand[1]} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
      <g transform={`translate(${hand[0] - 40} ${hand[1] - 10}) rotate(-35)`}>
        <rect x={-90} y={-8} width={70} height={16} rx={4} fill="#E9E2D0" stroke={INK} strokeWidth={4} />
        <path d="M -20 -6 L 30 0 L -20 6 Z" fill="#DDE6EE" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </g>
  );
};

// the boy on a chair, sleeve rolled up; origin = chair seat centre
const Boy: React.FC<{ x: number; y: number; s?: number; f: number; mood?: "nervous" | "grin" | "wow"; mark?: number }> = ({ x, y, s = 1, f, mood = "nervous", mark = 1 }) => {
  const kick = Math.sin(f / 5) * 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* chair */}
      <rect x={-150} y={-420} width={34} height={420} rx={10} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      <rect x={-170} y={-30} width={340} height={44} rx={12} fill={WOOD} stroke={INK} strokeWidth={6} />
      {[-140, 130].map((lx) => (
        <rect key={lx} x={lx} y={10} width={30} height={240} fill={WOOD_D} stroke={INK} strokeWidth={6} />
      ))}
      {/* legs dangling */}
      {[-1, 1].map((sd) => (
        <g key={sd} transform={`rotate(${sd > 0 ? kick : -kick} ${sd * 50} 0)`}>
          <rect x={sd * 50 - 34} y={-20} width={68} height={130} rx={24} fill={BREECH} stroke={INK} strokeWidth={6} />
          <rect x={sd * 50 - 26} y={100} width={52} height={110} rx={18} fill={SKIN} stroke={INK} strokeWidth={6} />
          <ellipse cx={sd * 50 + 10} cy={214} rx={38} ry={18} fill={SKIN} stroke={INK} strokeWidth={5} />
        </g>
      ))}
      {/* body */}
      <path d="M -110 -330 Q 0 -350 110 -330 L 100 -10 L -100 -10 Z" fill={SHIRT_BOY} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -30 -340 L 0 -280 L 30 -340" stroke={INK} strokeWidth={5} fill="none" />
      {/* bare right arm (viewer's right) with the cowpox mark */}
      <Arm a={[110, -310]} k={[190, -170]} b={[150, -60]} w={58} sleeve={SKIN} skin={SKIN} />
      <ellipse cx={136} cy={-320} rx={48} ry={36} fill={SHIRT_BOY} stroke={INK} strokeWidth={6} />
      <circle cx={150} cy={-60} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
      {mark > 0 ? <Blister x={160} y={-240} r={14} p={mark} /> : null}
      <Arm a={[-110, -310]} k={[-170, -170]} b={[-120, -70]} w={58} sleeve={SHIRT_BOY} skin={SKIN} />
      <circle cx={-120} cy={-70} r={28} fill={SKIN} stroke={INK} strokeWidth={6} />
      {/* head */}
      <circle cx={0} cy={-440} r={96} fill={SKIN} stroke={INK} strokeWidth={7} />
      <path d="M -96 -450 Q -100 -540 0 -548 Q 100 -540 96 -450 Q 70 -500 30 -490 Q 0 -520 -40 -490 Q -80 -500 -96 -450 Z" fill="#A86A34" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-56} cy={-412} r={18} fill={CHEEK} opacity={0.5} />
      <circle cx={56} cy={-412} r={18} fill={CHEEK} opacity={0.5} />
      {mood === "grin" ? (
        <g>
          <path d="M -54 -452 Q -36 -470 -18 -452 M 18 -452 Q 36 -470 54 -452" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M -46 -400 Q 0 -340 46 -400 Z" fill="#8A2A2A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -30 -396 L 30 -396" stroke="#FFFFFF" strokeWidth={8} />
        </g>
      ) : (
        <g>
          {[-36, 36].map((ex) => (
            <g key={ex}>
              <ellipse cx={ex} cy={-452} rx={18} ry={22} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
              <circle cx={ex + 6} cy={-448} r={9} fill={INK} />
            </g>
          ))}
          {mood === "wow" ? <ellipse cx={0} cy={-388} rx={16} ry={20} fill="#8A2A2A" stroke={INK} strokeWidth={5} /> : <path d="M -24 -390 Q -10 -400 0 -390 Q 12 -380 24 -390" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
        </g>
      )}
    </g>
  );
};

// ---------- twist: today's version ----------
// a big syringe with a black-and-white cow-print barrel; origin = barrel centre, horizontal
const Syringe: React.FC<{ x: number; y: number; s?: number; rot?: number; f: number }> = ({ x, y, s = 1, rot = -28, f }) => {
  const patches: Array<[number, number, number, number]> = [
    [-200, -30, 60, 40],
    [-90, 34, 54, 36],
    [10, -36, 64, 34],
    [110, 26, 50, 40],
    [-150, 50, 30, 20],
    [60, 50, 34, 22],
    [170, -40, 30, 26],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(f / 14) * 2}) scale(${s})`}>
      <defs>
        <clipPath id="ep063barrel">
          <rect x={-260} y={-62} width={460} height={124} rx={20} />
        </clipPath>
      </defs>
      {/* plunger */}
      <rect x={-420} y={-16} width={170} height={32} fill="#E7EDF1" stroke={INK} strokeWidth={6} />
      <rect x={-440} y={-70} width={30} height={140} rx={10} fill="#E7EDF1" stroke={INK} strokeWidth={6} />
      {/* finger flange */}
      <rect x={-276} y={-100} width={28} height={200} rx={10} fill="#E7EDF1" stroke={INK} strokeWidth={6} />
      {/* cow-print barrel */}
      <rect x={-260} y={-62} width={460} height={124} rx={20} fill="#FFFFFF" />
      <g clipPath="url(#ep063barrel)">
        {patches.map(([px, py, rx, ry], k) => (
          <path key={k} d={`M ${px - rx} ${py} Q ${px - rx * 0.6} ${py - ry * 1.2} ${px + rx * 0.2} ${py - ry} Q ${px + rx * 1.1} ${py - ry * 0.6} ${px + rx} ${py + ry * 0.3} Q ${px + rx * 0.4} ${py + ry * 1.2} ${px - rx * 0.4} ${py + ry * 0.8} Q ${px - rx * 1.1} ${py + ry * 0.6} ${px - rx} ${py} Z`} fill="#1E1E22" />
        ))}
      </g>
      <rect x={-260} y={-62} width={460} height={124} rx={20} fill="none" stroke={INK} strokeWidth={8} />
      <rect x={-230} y={-50} width={420} height={18} rx={9} fill="#FFFFFF" opacity={0.45} />
      {[-180, -120, -60, 0, 60, 120].map((gx) => (
        <path key={gx} d={`M ${gx} 62 L ${gx} 34`} stroke={COW_PINK_D} strokeWidth={6} />
      ))}
      {/* hub + needle */}
      <path d="M 200 -34 L 250 -16 L 250 16 L 200 34 Z" fill="#E7EDF1" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={250} y={-5} width={150} height={10} fill="#C9D3DA" stroke={INK} strokeWidth={4} />
    </g>
  );
};

// a little glass vial with a cow-print cap and a VACC|INE label; origin = bottom centre
const Vial: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 12) * 4}) scale(${s})`}>
    <rect x={-110} y={-380} width={220} height={380} rx={34} fill="#E6F6FB" fillOpacity={0.9} stroke={INK} strokeWidth={8} />
    <rect x={-96} y={-170} width={192} height={160} rx={24} fill="#F7D9DE" />
    <rect x={-76} y={-430} width={152} height={64} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
    {[-40, 10, 46].map((cx, k) => (
      <ellipse key={k} cx={cx} cy={-398 + (k % 2) * 10} rx={18} ry={11} fill="#1E1E22" />
    ))}
    <rect x={-76} y={-430} width={152} height={64} rx={12} fill="none" stroke={INK} strokeWidth={7} />
    <rect x={-122} y={-300} width={244} height={120} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text x={0} y={-218} textAnchor="middle" fontFamily={titleFont} fontSize={52} textLength={210} lengthAdjust="spacingAndGlyphs">
      <tspan fill={C.brick}>VACC</tspan>
      <tspan fill={INK}>INE</tspan>
    </text>
    <rect x={-80} y={-360} width={20} height={300} rx={10} fill="#FFFFFF" opacity={0.6} />
  </g>
);

const Clinic: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep063clinic)" />
    {new Array(7).fill(0).map((_, k) => (
      <circle key={k} cx={(k * 173 + f * 0.6) % 1180 - 50} cy={300 + ((k * 211) % 1300)} r={30 + (k % 3) * 18} fill="#FFFFFF" opacity={0.5} />
    ))}
    <rect x={0} y={1770} width={1080} height={150} fill="#DCEFF3" />
    <rect x={-10} y={1750} width={1100} height={40} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
  </>
);

// 1796 parlour: warm wall, a window onto the garden, floorboards
const Parlour: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep063parlour)" />
    <rect x={0} y={1080} width={1080} height={30} fill={WOOD_D} stroke={INK} strokeWidth={5} />
    <rect x={0} y={1110} width={1080} height={300} fill="#C8A26A" opacity={0.5} />
    <g>
      <rect x={560} y={500} width={380} height={460} fill="#BDE7F7" stroke={INK} strokeWidth={8} />
      <path d={`M 560 860 Q 660 ${800 + Math.sin(f / 20) * 6} 760 850 Q 860 790 940 840 L 940 960 L 560 960 Z`} fill={HILL} />
      <path d="M 750 500 L 750 960 M 560 730 L 940 730" stroke={WOOD} strokeWidth={14} />
      <rect x={540} y={950} width={420} height={30} rx={8} fill={WOOD_HI} stroke={INK} strokeWidth={6} />
    </g>
    <rect x={0} y={1640} width={1080} height={280} fill={WOOD} />
    {[0, 1, 2, 3, 4].map((k) => (
      <path key={k} d={`M 0 ${1660 + k * 56} L 1080 ${1660 + k * 56}`} stroke={WOOD_D} strokeWidth={5} />
    ))}
    <rect x={-10} y={1620} width={1100} height={30} fill={WOOD_D} stroke={INK} strokeWidth={6} />
  </>
);

const Sparkle: React.FC<{ x: number; y: number; p: number; s?: number }> = ({ x, y, p, s = 1 }) =>
  p <= 0 ? null : (
    <g transform={`translate(${x} ${y}) scale(${p * s}) rotate(${p * 40})`}>
      <path d="M 0 -40 L 9 -9 L 40 0 L 9 9 L 0 40 L -9 9 L -40 0 L -9 -9 Z" fill="#FFF6C8" stroke={INK} strokeWidth={4} />
    </g>
  );

// milk streams from the teats into the pail
const Streams: React.FC<{ f: number; from: P[]; toY: number; on: number }> = ({ f, from, toY, on }) =>
  on <= 0 ? null : (
    <g opacity={on}>
      {from.map(([sx, sy], k) => {
        const phase = (f + k * 3) % 6 < 3;
        if (!phase) return null;
        return (
          <g key={k}>
            <path d={`M ${sx} ${sy} Q ${sx + 6} ${(sy + toY) / 2} ${sx + 14} ${toY}`} stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.25} />
            <path d={`M ${sx} ${sy} Q ${sx + 6} ${(sy + toY) / 2} ${sx + 14} ${toY}`} stroke={MILK} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="38 14" strokeDashoffset={-f * 9} />
          </g>
        );
      })}
      {[0, 1, 2].map((k) => {
        const age = (f + k * 4) % 12;
        return <circle key={`s${k}`} cx={from[0][0] + 14 + (k - 1) * 22 + age * (k - 1) * 1.5} cy={toY - age * 2.4 + age * age * 0.14} r={7} fill={MILK} stroke={MILK_D} strokeWidth={2} opacity={1 - age / 12} />;
      })}
    </g>
  );

// ---------- the scene ----------
export const Milkmaid63: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "milking";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let answerOn = false;

  if (mode === "milking") {
    // frame 0: one big milkmaid on her stool, yoke on her shoulders, milking a cow into the pail; cowpox blisters on her knuckles
    const mx = 360;
    const my = 1440;
    body = (
      <>
        <Meadow f={f} horizon={1100} sunX={600} />
        <Cow x={690} y={1700} s={1} f={f} udderPulse={Math.sin(f / 3.2)} />
        <Maid x={mx} y={my} s={1} f={f} seated pose="milk" mood="smile" gaze={0.3} pailL={[-290, 300]} pailR={[270, 310]} handA={[220, 0]} handB={[292, 12]} elbowA={[40, -250]} elbowB={[262, -300]} blisters={v.blisters ?? 0.67} squeeze={1} />
        <Streams f={f} from={[[588, 1480], [660, 1492]]} toY={1604} on={1} />
      </>
    );
  } else if (mode === "yoke") {
    // dawn walk with the yoke and two full pails → she lifts her hands: cowpox blisters pop up – COWPOX!
    const bAt = (v.blisterAt ?? 0.55) * dur;
    const show = f >= bAt;
    const b = ease(f, bAt, bAt + 16);
    body = (
      <>
        <Meadow f={f} horizon={1250} />
        <Cow x={930} y={1330} s={0.42} f={f + 40} />
        <Maid x={540} y={1400} s={1} f={f} seated={false} pose={show ? "show" : "yoke"} mood={show ? "ew" : "smile"} pailL={[-330, 260]} pailR={[330, 260]} blisters={show ? b : 0} />
        <Burst x={540} y={470} p={popIn(f, bAt + 6, 8) * 0.85} text={v.chip ?? "COWPOX!"} size={84} rot={-6} />
      </>
    );
  } else if (mode === "smallpox") {
    // dusk village: three sick villagers, one becomes a gravestone (up to 1 in 3) → the milkmaid strolls in glowing – SAFE?
    const dieAt = (v.dieAt ?? 0.3) * dur;
    const safeAt = (v.safeAt ?? 0.55) * dur;
    const fade = interpolate(f, [dieAt, dieAt + 8], [1, 0], clamp);
    const inP = ease(f, safeAt - 8, safeAt + 6);
    const mx = lerp(1360, 820, inP);
    const chipP = popIn(f, (v.chipAt ?? 0.08) * dur, 9);
    body = (
      <>
        <Meadow f={f} horizon={1150} dusk fence={false} />
        <Cottage x={200} y={1260} s={0.8} />
        <Cottage x={870} y={1230} s={0.7} col="#E3CFAE" roof="#8A6A40" />
        <Villager x={150} y={1640} s={0.62} f={f} col="#7A6A9A" seed="a" />
        <g opacity={fade}>
          <Villager x={345} y={1650} s={0.62} f={f} col="#9A6A4A" seed="b" hat />
        </g>
        <Gravestone x={345} y={1650} p={popIn(f, dieAt + 4, 9) * 0.7} />
        <Villager x={540} y={1640} s={0.62} f={f} col="#5E7E6A" seed="c" />
        {[0, 1, 2, 3, 4].map((k) => {
          const gx = 120 + k * 120 + Math.sin(f / 9 + k) * 30;
          const gy = 1050 + (k % 2) * 90 + Math.cos(f / 11 + k) * 26;
          return <Germ key={k} x={gx} y={gy} r={26 + (k % 3) * 6} f={f + k * 7} o={0.9} />;
        })}
        {inP > 0 ? (
          <g>
            <Maid x={mx} y={1500} s={0.74} f={f} seated={false} pose="hips" mood="proud" yoke={false} glow={1} />
            {[0, 1, 2].map((k) => {
              const t = ((f - safeAt + k * 7) % 21) / 21;
              const a = -2.3 + k * 0.5;
              const rr = lerp(260, 420, t);
              return f > safeAt ? <Germ key={`b${k}`} x={mx + Math.cos(a) * rr} y={1220 + Math.sin(a) * rr} r={22} f={f} o={1 - t} /> : null;
            })}
          </g>
        ) : null}
        <Chip x={540} y={540} p={chipP} text={v.chip ?? "KILLS UP TO 1 IN 3"} w={700} rot={-2} size={62} col={C.cream} />
        <Burst x={790} y={770} p={popIn(f, safeAt + 8, 8) * 0.68} text={v.safe ?? "SAFE?"} size={92} rot={6} />
      </>
    );
  } else if (mode === "immune") {
    // Jenner's parlour: smallpox germs fly at the boy and bounce off – NOTHING!
    const germAt = (v.germAt ?? 0.15) * dur;
    const okAt = (v.okAt ?? 0.6) * dur;
    const ok = f >= okAt;
    const bx = 330;
    const by = 1420;
    const cy = by - 300;
    const shield = popIn(f, germAt + 8, 8);
    body = (
      <>
        <Parlour f={f} />
        <text x={760} y={460} textAnchor="middle" fontFamily={typeFont} fontSize={48} fill={WOOD_D} opacity={0.9}>
          {v.sign ?? "BERKELEY · 1796"}
        </text>
        {shield > 0 ? (
          <g>
            <circle cx={bx} cy={cy} r={360 * shield} fill="url(#ep063aura)" />
            <circle cx={bx} cy={cy} r={330 * shield} fill="none" stroke="#FFE38A" strokeWidth={10} strokeDasharray="30 18" opacity={0.85} transform={`rotate(${f * 2} ${bx} ${cy})`} />
          </g>
        ) : null}
        <Boy x={bx} y={by} s={1.15} f={f} mood={ok ? "grin" : f > germAt ? "wow" : "nervous"} mark={1} />
        <Jenner x={800} y={1800} s={0.95} f={f} mood={ok ? "happy" : "calm"} lancetUp={ease(f, 0, germAt)} />
        {[0, 1, 2, 3, 4].map((k) => {
          const start = germAt + k * 4;
          const age = f - start;
          if (age < 0) return null;
          const a0 = -0.6 - k * 0.55;
          const sx = bx + Math.cos(a0) * 900;
          const sy = cy + Math.sin(a0) * 900;
          const hitX = bx + Math.cos(a0) * 330;
          const hitY = cy + Math.sin(a0) * 330;
          const tIn = Math.min(1, age / 12);
          const out = Math.max(0, age - 12);
          const gx = out > 0 ? hitX + Math.cos(a0) * out * 22 : lerp(sx, hitX, tIn);
          const gy = out > 0 ? hitY + Math.sin(a0) * out * 22 : lerp(sy, hitY, tIn);
          return <Germ key={k} x={gx} y={gy} r={40} f={f} rot={out * 20} o={interpolate(out, [0, 14], [1, 0], clamp)} />;
        })}
        {ok
          ? [
              [140, 840],
              [520, 760],
              [560, 1200],
            ].map(([sx, sy], i) => <Sparkle key={i} x={sx} y={sy} p={popIn(f, okAt + 3 + i * 4, 8)} />)
          : null}
        <Chip x={720} y={560} p={popIn(f, germAt, 8) * interpolate(f, [okAt - 4, okAt], [1, 0], clamp)} text="SMALLPOX!" w={480} rot={4} size={66} col="#CDEBB0" />
        <Burst x={560} y={560} p={popIn(f, okAt, 8) * 0.9} text={v.chip ?? "NOTHING!"} size={90} rot={-5} />
      </>
    );
  } else if (mode === "vacca") {
    // twist: Blossom's face + "?" → flash → today: a cow-print syringe and a VACC|INE vial – VACCA = COW!
    const answerAt = (v.answerAt ?? 0.45) * dur;
    if (f < answerAt) {
      body = (
        <>
          <Meadow f={f} horizon={1300} sunX={540} />
          <CowHead x={540} y={990} s={1.75} f={f} />
          {[0, 1, 2].map((k) => {
            const p = popIn(f, 3 + k * 6, 8);
            const qx = [190, 890, 840][k];
            const qy = [760, 720, 1180][k];
            return p > 0 ? (
              <text key={k} x={qx} y={qy} textAnchor="middle" fontFamily={titleFont} fontSize={170} fill={C.mustard} stroke={INK} strokeWidth={8} transform={`rotate(${[-12, 10, 4][k]} ${qx} ${qy})`} opacity={p} paintOrder="stroke">
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
          <Clinic f={f} />
          <Syringe x={520} y={960} s={1.1 * popIn(f, answerAt, 7)} f={f} />
          <Vial x={830} y={1760} s={0.9 * popIn(f, answerAt + 5, 8)} f={f} />
          <CowHead x={220} y={1640} s={0.9 * popIn(f, answerAt + 10, 8)} f={f} mood="wink" />
          <Burst x={530} y={1560} p={popIn(f, answerAt + 16, 8) * 0.48} text="MOO!" size={100} rot={-8} col={C.cream} />
          {[
            [900, 900],
            [140, 980],
          ].map(([sx, sy], i) => (
            <Sparkle key={i} x={sx} y={sy} p={popIn(f, answerAt + 12 + i * 5, 8)} s={1.2} />
          ))}
          {v.chip ? <Chip x={540} y={610} p={popIn(f, answerAt + 8, 9)} text={v.chip} w={680} rot={-3} size={64} /> : null}
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
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "vacca" && answerOn ? (
        <Sequence from={Math.round((v.answerAt ?? 0.45) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} color={C.brick} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
