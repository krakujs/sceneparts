import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep043 Barber-surgeon – the man who shaved you also pulled teeth and let blood.
// visual: { mode: "bleed" | "tools" | "grip" | "battle" | "pole", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, answer?, answerAccent?, answerAt? (pole) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B48A";
const SKIN_D = "#C98E64";
const SHIRT = "#F3E6CC";
const APRON = "#7A4A2A";
const APRON_HI = "#94603A";
const HAIR = "#3A2618";
const BRASS = "#D9A637";
const BRASS_D = "#A87A1E";
const BLOOD = "#C0201A";
const STEEL = "#D8DEE6";
const WOOD = "#8A5A34";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + i * 115 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 56, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// warm candle-lit shop interior (amber wall, wood panelling, shelf of jars, window light)
const Shop: React.FC<{ f: number; floor?: number }> = ({ f, floor = 1300 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#E9B872" />
    <path d="M 760 0 L 1080 0 L 1080 900 L 560 1300 Z" fill="#FFE6A8" opacity={0.35 + Math.sin(f / 18) * 0.04} />
    <rect x={800} y={420} width={220} height={300} fill="#FFF1C9" stroke={INK} strokeWidth={7} />
    <path d="M 910 420 L 910 720 M 800 570 L 1020 570" stroke={WOOD} strokeWidth={8} />
    <rect x={40} y={560} width={360} height={18} fill={WOOD} stroke={INK} strokeWidth={5} />
    {[70, 150, 230, 310].map((x, i) => (
      <g key={x}>
        <rect x={x} y={470} width={56} height={90} rx={10} fill={["#6FA38C", "#C9A2D8", "#9CC9CF", "#E58A4E"][i]} stroke={INK} strokeWidth={5} />
        <rect x={x + 8} y={458} width={40} height={16} fill="#5A3F2C" stroke={INK} strokeWidth={4} />
      </g>
    ))}
    <rect x={0} y={floor} width={1080} height={1920 - floor} fill={WOOD} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <path key={k} d={`M ${k * 190 + 40} ${floor} L ${k * 190 + 40} 1920`} stroke="#6E4527" strokeWidth={6} />
    ))}
    <path d={`M 0 ${floor} L 1080 ${floor}`} stroke={INK} strokeWidth={7} />
  </>
);

type Tool = "lancet" | "razor" | "pliers" | "saw" | "scissors" | "none";

// a tool drawn at the hand, pointing left (-x)
const ToolAt: React.FC<{ tool: Tool; f: number }> = ({ tool, f }) => {
  const glint = 0.5 + Math.sin(f / 4) * 0.5;
  if (tool === "lancet")
    return (
      <g>
        <rect x={-10} y={-12} width={60} height={24} rx={8} fill="#F4EAD5" stroke={INK} strokeWidth={5} />
        <path d="M -10 -10 L -110 0 L -10 10 Z" fill={STEEL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={-70} cy={-2} r={9} fill="#FFFFFF" opacity={glint} />
      </g>
    );
  if (tool === "razor")
    return (
      <g>
        <rect x={-6} y={-12} width={70} height={24} rx={10} fill="#2A2420" stroke={INK} strokeWidth={5} />
        <rect x={-120} y={-20} width={116} height={36} rx={4} fill={STEEL} stroke={INK} strokeWidth={5} />
        <path d="M -116 14 L -6 14" stroke="#FFFFFF" strokeWidth={4} opacity={glint} />
      </g>
    );
  if (tool === "pliers")
    return (
      <g>
        <path d="M 40 -24 L -40 -6 L -120 -16 M 40 24 L -40 6 L -120 16" stroke={STEEL} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 40 -24 L -40 -6 L -120 -16 M 40 24 L -40 6 L -120 16" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.5} />
        <circle cx={-40} cy={0} r={9} fill={INK} />
      </g>
    );
  if (tool === "saw")
    return (
      <g>
        <rect x={-6} y={-16} width={60} height={32} rx={10} fill={WOOD} stroke={INK} strokeWidth={5} />
        <path d="M -6 -40 L -190 -40 L -190 26 L -6 26" stroke={INK} strokeWidth={8} fill="none" />
        <rect x={-190} y={-40} width={184} height={30} fill={STEEL} stroke={INK} strokeWidth={4} />
        {new Array(9).fill(0).map((_, k) => (
          <path key={k} d={`M ${-188 + k * 20} -10 l 10 12 l 10 -12`} fill={STEEL} stroke={INK} strokeWidth={3} />
        ))}
      </g>
    );
  if (tool === "scissors")
    return (
      <g transform={`rotate(${Math.sin(f / 2) * 8})`}>
        <path d="M 0 0 L -120 -18 M 0 0 L -120 18" stroke={STEEL} strokeWidth={14} strokeLinecap="round" />
        <circle cx={26} cy={-16} r={16} fill="none" stroke={INK} strokeWidth={7} />
        <circle cx={26} cy={16} r={16} fill="none" stroke={INK} strokeWidth={7} />
      </g>
    );
  return null;
};

// The barber-surgeon, waist-up and big, facing left. Origin = belt centre.
// hand = front hand position (local), tool in it; apron = leather (old) or a modern tunic colour.
export const Barber: React.FC<{ x: number; y: number; s?: number; f: number; tool?: Tool; hand?: [number, number]; apron?: string; shirt?: string; cap?: boolean; flip?: boolean; toolRot?: number }> = ({ x, y, s = 1, f, tool = "lancet", hand = [-300, -190], apron = APRON, shirt = SHIRT, cap = true, flip = false, toolRot = 0 }) => {
  const breathe = Math.sin(f / 14) * 3;
  const [hx, hy] = hand;
  const sx = -100;
  const sy = -340;
  const ex = (sx + hx) / 2 + 20;
  const ey = Math.max(sy, hy) + 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* back arm */}
        <path d="M 110 -340 Q 170 -220 130 -90" stroke={shirt} strokeWidth={70} fill="none" strokeLinecap="round" />
        <circle cx={128} cy={-78} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* torso */}
        <path d="M -135 -385 Q 0 -420 135 -385 L 120 40 L -120 40 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {/* apron with neck strap */}
        <path d="M -70 -390 L -95 -300 M 70 -390 L 95 -300" stroke={apron} strokeWidth={16} />
        <path d="M -105 -300 L 105 -300 L 150 520 L -150 520 Z" fill={apron} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -60 -260 Q -70 100 -95 500 M 50 -250 Q 60 100 80 500" stroke={APRON_HI} strokeWidth={8} fill="none" opacity={0.7} />
        <rect x={-60} y={-40} width={120} height={80} rx={8} fill={APRON_HI} stroke={INK} strokeWidth={5} />
        {/* neck + head (3/4 view, looking left) */}
        <rect x={-34} y={-430} width={68} height={60} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <ellipse cx={-6} cy={-505} rx={92} ry={100} fill={SKIN} stroke={INK} strokeWidth={7} />
        <ellipse cx={74} cy={-500} rx={18} ry={28} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <path d="M -92 -500 Q -122 -478 -96 -458" fill={SKIN} stroke={INK} strokeWidth={6} />
        {/* eyes + brows */}
        <circle cx={-56} cy={-522} r={10} fill={INK} />
        <circle cx={6} cy={-522} r={10} fill={INK} />
        <path d="M -80 -552 L -38 -544 M -14 -546 L 28 -554" stroke={HAIR} strokeWidth={10} strokeLinecap="round" />
        {/* the big moustache */}
        <path d="M -24 -462 Q -60 -490 -98 -466 Q -116 -452 -128 -470 Q -112 -430 -70 -446 Q -44 -452 -24 -440 Q -4 -452 22 -446 Q 60 -430 74 -470 Q 64 -452 46 -466 Q 12 -490 -24 -462 Z" fill={HAIR} stroke={INK} strokeWidth={4} />
        {cap ? (
          <>
            <path d="M -96 -548 Q -90 -626 0 -628 Q 86 -624 92 -548 Z" fill="#B5452F" stroke={INK} strokeWidth={7} />
            <path d="M -96 -552 L 92 -552" stroke={INK} strokeWidth={7} />
          </>
        ) : (
          <path d="M -96 -540 Q -80 -620 0 -616 Q 80 -616 92 -530 Q 60 -580 0 -578 Q -60 -580 -96 -540 Z" fill={HAIR} stroke={INK} strokeWidth={6} />
        )}
        {/* front arm (rolled sleeve) */}
        <path d={`M ${sx} ${sy} Q ${ex - 40} ${ey} ${ex} ${ey}`} stroke={shirt} strokeWidth={72} fill="none" strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={58} strokeLinecap="round" />
        <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={SKIN} strokeWidth={46} strokeLinecap="round" />
        <g transform={`translate(${hx} ${hy}) rotate(${toolRot})`}>
          <ToolAt tool={tool} f={f} />
          <circle cx={0} cy={0} r={34} fill={SKIN} stroke={INK} strokeWidth={6} />
        </g>
      </g>
    </g>
  );
};

// brass bleeding bowl; level 0..1 = how much blood is in it
const Basin: React.FC<{ x: number; y: number; s?: number; level?: number }> = ({ x, y, s = 1, level = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={50} rx={150} ry={22} fill="#000" opacity={0.18} />
    <path d="M -140 -10 Q -120 60 0 64 Q 120 60 140 -10 Z" fill={BRASS} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={-10} rx={140} ry={34} fill={BRASS_D} stroke={INK} strokeWidth={7} />
    {level > 0 ? <ellipse cx={0} cy={-6 + (1 - level) * 6} rx={118 * Math.min(1, 0.4 + level)} ry={26 * Math.min(1, 0.4 + level)} fill={BLOOD} /> : null}
    <path d="M -100 20 Q -60 46 -10 48" stroke="#FFE7A0" strokeWidth={8} fill="none" opacity={0.8} />
  </g>
);

// the patient's outstretched arm from the left edge, fist gripping a staff; cut = 0..1 (blood stream on)
const PatientArm: React.FC<{ f: number; cut: number; level: number; pulse?: boolean }> = ({ f, cut, level, pulse = true }) => {
  const swell = pulse ? 1 + Math.max(0, Math.sin(f / 4)) * 0.25 : 1;
  const drip = (f % 10) / 10;
  return (
    <g>
      {/* staff */}
      <rect x={430} y={880} width={40} height={720} rx={14} fill={WOOD} stroke={INK} strokeWidth={6} />
      {/* sleeve + bare forearm */}
      <path d="M -60 1170 L 170 1200" stroke={INK} strokeWidth={112} strokeLinecap="round" />
      <path d="M -60 1170 L 170 1200" stroke="#4F78A8" strokeWidth={98} strokeLinecap="round" />
      <path d="M 160 1210 L 420 1200" stroke={INK} strokeWidth={92} strokeLinecap="round" />
      <path d="M 160 1210 L 420 1200" stroke={SKIN} strokeWidth={80} strokeLinecap="round" />
      {/* the swelling vein */}
      <path d="M 190 1222 Q 260 1214 330 1222 Q 380 1228 410 1214" stroke="#6C7FC0" strokeWidth={9 * swell} fill="none" strokeLinecap="round" />
      {/* fist around the staff */}
      <ellipse cx={450} cy={1200} rx={62} ry={56} fill={SKIN} stroke={INK} strokeWidth={6} />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M ${474} ${1166 + k * 26} q 20 8 0 22`} stroke={INK} strokeWidth={5} fill="none" />
      ))}
      {/* the cut + stream into the bowl */}
      {cut > 0 ? (
        <>
          <path d="M 236 1230 L 262 1228" stroke={BLOOD} strokeWidth={10} strokeLinecap="round" />
          <path d={`M 250 1236 Q 254 ${1236 + 160 * cut} 250 ${1236 + 300 * cut}`} stroke={BLOOD} strokeWidth={14} fill="none" strokeLinecap="round" />
          {cut >= 1 ? <circle cx={250} cy={1300 + drip * 230} r={10} fill={BLOOD} /> : null}
        </>
      ) : null}
      <Basin x={250} y={1560} s={1.05} level={level} />
    </g>
  );
};

// diagonal stripe bands clipped to a pole; t = scroll offset (px); colours cycle per band
const Stripes: React.FC<{ id: string; x: number; y: number; w: number; h: number; t: number; colors: string[]; bg: string; band?: number; show?: number; stains?: boolean }> = ({ id, x, y, w, h, t, colors, bg, band = 70, show = 1, stains = false }) => {
  const period = band * colors.length;
  const n = Math.ceil(h / band) + colors.length + 4;
  const visibleFrom = y + h - h * show; // bands appear from the bottom up (wrapping)
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={x} y={y} width={w} height={h} rx={w / 2.4} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={w / 2.4} fill={bg} />
      <g clipPath={`url(#${id})`}>
        {new Array(n).fill(0).map((_, i) => {
          const y0 = y - period + i * band + (t % period);
          if (y0 + band < visibleFrom) return null;
          const col = colors[i % colors.length];
          if (col === "none") return null;
          return (
            <g key={i}>
              <path d={`M ${x - 4} ${y0 + w * 0.9} L ${x + w + 4} ${y0} L ${x + w + 4} ${y0 + band} L ${x - 4} ${y0 + band + w * 0.9} Z`} fill={col} />
              {stains && i % 3 === 0 ? <ellipse cx={x + w * 0.45} cy={y0 + band * 0.9} rx={w * 0.22} ry={band * 0.28} fill={BLOOD} opacity={0.85} /> : null}
            </g>
          );
        })}
        <rect x={x + w * 0.16} y={y} width={w * 0.14} height={h} fill="#FFFFFF" opacity={0.35} />
      </g>
      <rect x={x} y={y} width={w} height={h} rx={w / 2.4} fill="none" stroke={INK} strokeWidth={7} />
    </g>
  );
};

const Brick: React.FC = () => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="#B5452F" />
    {new Array(30).fill(0).map((_, r) => (
      <g key={r}>
        <path d={`M 0 ${r * 70} L 1080 ${r * 70}`} stroke="#8E3424" strokeWidth={5} />
        {new Array(8).fill(0).map((__, k) => (
          <path key={k} d={`M ${k * 150 + (r % 2) * 75} ${r * 70} l 0 70`} stroke="#8E3424" strokeWidth={5} />
        ))}
      </g>
    ))}
  </>
);

// a modern customer in the chair with a big Movember moustache
const Customer: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-60} width={300} height={260} rx={30} fill="#B5452F" stroke={INK} strokeWidth={7} />
    <rect x={-120} y={-330} width={240} height={290} rx={40} fill="#C9564A" stroke={INK} strokeWidth={7} />
    <path d="M -130 -200 Q 0 -260 130 -200 L 160 120 L -160 120 Z" fill="#FFFFFF" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={-290} rx={78} ry={88} fill={SKIN} stroke={INK} strokeWidth={7} />
    <path d="M -78 -320 Q -70 -390 0 -392 Q 70 -390 78 -320 Q 40 -360 0 -356 Q -40 -360 -78 -320 Z" fill="#6B4A2E" stroke={INK} strokeWidth={5} />
    <circle cx={-28} cy={-300} r={8} fill={INK} />
    <circle cx={28} cy={-300} r={8} fill={INK} />
    <path d="M 0 -262 Q -40 -284 -84 -262 Q -96 -250 -104 -268 Q -92 -232 -50 -244 Q -20 -250 0 -238 Q 20 -250 50 -244 Q 92 -232 104 -268 Q 96 -250 84 -262 Q 40 -284 0 -262 Z" fill="#6B4A2E" stroke={INK} strokeWidth={4} />
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 7) % 21) / 21;
      return <rect key={k} x={-70 + k * 50 + p * 10} y={-236 + p * 200} width={8} height={4} fill="#6B4A2E" opacity={1 - p} />;
    })}
  </g>
);

export const BarberSurgeon: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "bleed";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  let showFloats = true;

  if (mode === "bleed") {
    // frame 0: the lancet is already at the vein; it nicks at frame 6, blood runs into the brass bowl
    const stab = interpolate(f, [0, 6], [-330, -297], { ...clamp, easing: Easing.in(Easing.cubic) });
    const cut = interpolate(f, [6, 16], [0, 1], clamp);
    const level = interpolate(f, [12, dur], [0.05, 0.8], clamp);
    body = (
      <>
        <Shop f={f} floor={1320} />
        <PatientArm f={f} cut={cut} level={level} />
        <Barber x={700} y={1520} s={1.5} f={f} tool="lancet" hand={[-242, stab]} toolRot={-60} />
      </>
    );
  } else if (mode === "tools") {
    // razor → pliers (a tooth pops out) → lancet
    const third = dur / 3;
    const tool: Tool = f < third ? "razor" : f < third * 2 ? "pliers" : "lancet";
    const local = f % third;
    const lift = interpolate(local, [0, 5], [40, 0], { ...clamp, easing: Easing.out(Easing.back(2)) });
    const tooth = f >= third && f < third * 2 ? local : -1;
    body = (
      <>
        <Shop f={f} floor={1500} />
        <Barber x={640} y={1660} s={1.75} f={f} tool={tool} hand={[-250, -300 + lift]} toolRot={-20} />
        {tooth >= 4 ? (
          <g transform={`translate(${190 - (tooth - 4) * 10} ${1050 - Math.sin(Math.min(1, (tooth - 4) / 18) * Math.PI) * 220 + (tooth - 4) * 6}) rotate(${(tooth - 4) * 25})`}>
            <path d="M -30 -30 Q 0 -44 30 -30 Q 40 0 24 20 L 16 50 L 4 22 L -4 22 L -16 50 L -24 20 Q -40 0 -30 -30 Z" fill="#FFFDF4" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          </g>
        ) : null}
        {local < 4 && f > 4 ? <circle cx={200} cy={980} r={60 + local * 30} fill="#FFFFFF" opacity={0.5 - local * 0.12} /> : null}
      </>
    );
  } else if (mode === "grip") {
    // close-up: fist squeezes the staff, vein bulges, the bowl fills
    const level = interpolate(f, [0, dur], [0.35, 1], clamp);
    body = (
      <>
        <Shop f={f} floor={1320} />
        <g transform="translate(-87 -1318) scale(1.9)">
          <PatientArm f={f} cut={1} level={level} />
        </g>
      </>
    );
  } else if (mode === "battle") {
    // field-tent surgery: the saw comes out
    const lift = interpolate(f, [0, 8], [60, 0], { ...clamp, easing: Easing.out(Easing.back(2)) });
    const sway = Math.sin(f / 10) * 8;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#CDB98E" />
        <path d="M 540 0 L 0 900 L 0 0 Z M 540 0 L 1080 900 L 1080 0 Z" fill="#B9A274" />
        <path d="M 540 0 L 120 1920 M 540 0 L 960 1920" stroke="#A48D60" strokeWidth={8} />
        <g transform={`translate(860 ${560 + sway}) `}>
          <path d="M 0 -200 L 0 -60" stroke={INK} strokeWidth={6} />
          <rect x={-40} y={-60} width={80} height={110} rx={14} fill="#FFD983" stroke={INK} strokeWidth={6} />
          <circle cx={0} cy={0} r={90} fill="#FFE7A0" opacity={0.25} />
        </g>
        <rect x={0} y={1560} width={1080} height={360} fill="#7C6A48" />
        <Barber x={640} y={1680} s={1.6} f={f} tool="saw" hand={[-150, -330 + lift]} toolRot={30} />
      </>
    );
  } else if (mode === "pole") {
    // bandages wind round the staff outside the shop → today's spinning barber pole at a Movember trim
    const answerAt = (v.answerAt ?? 0.6) * dur;
    const wrap = interpolate(f, [2, answerAt - 4], [0.05, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const flap = Math.sin(f / 3) * 18;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f >= answerAt) showFloats = false;
    const flash = interpolate(f, [answerAt - 1, answerAt + 5], [1, 0], clamp);
    body =
      f < answerAt ? (
        <>
          <Brick />
          <rect x={470} y={700} width={540} height={500} fill="#FFE6A8" stroke={INK} strokeWidth={8} />
          <path d="M 740 700 L 740 1200 M 470 950 L 1010 950" stroke={WOOD} strokeWidth={10} />
          <rect x={0} y={1500} width={1080} height={420} fill="#9E8F7C" />
          <path d="M 0 1500 L 1080 1500" stroke={INK} strokeWidth={7} />
          {/* bracket + basin sign on top */}
          <Basin x={300} y={640} s={0.8} level={0} />
          <Stripes id="ep043old" x={250} y={690} w={100} h={820} t={0} colors={["#F7F2E6", "none"]} bg={WOOD} band={64} show={wrap} stains />
          <path d={`M 350 ${700 + 820 * (1 - wrap)} q 60 ${flap} 120 ${10 - flap}`} stroke="#F7F2E6" strokeWidth={30} fill="none" strokeLinecap="round" opacity={wrap < 0.98 ? 1 : 0} />
        </>
      ) : (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#2E7D7A" />
          <rect x={340} y={640} width={690} height={760} fill="#FFF4D6" stroke={INK} strokeWidth={9} />
          <rect x={340} y={560} width={690} height={80} fill="#1B1712" />
          <defs>
            <clipPath id="ep043win">
              <rect x={344} y={644} width={682} height={752} />
            </clipPath>
          </defs>
          <g clipPath="url(#ep043win)">
            <Customer x={640} y={1330} s={1.15} f={f} />
            <Barber x={900} y={1500} s={0.95} f={f} tool="scissors" hand={[-250, -470]} apron="#2B2B33" shirt="#FFFFFF" cap={false} />
          </g>
          <rect x={340} y={640} width={690} height={760} fill="none" stroke={INK} strokeWidth={9} />
          <rect x={0} y={1480} width={1080} height={440} fill="#B8B2A6" />
          <path d="M 0 1480 L 1080 1480" stroke={INK} strokeWidth={7} />
          <rect x={150} y={520} width={150} height={40} rx={12} fill="#E6E9EE" stroke={INK} strokeWidth={6} />
          <Stripes id="ep043new" x={160} y={560} w={130} h={820} t={f * 6} colors={[BLOOD, "#FFFFFF"]} bg="#FFFFFF" band={60} />
          <rect x={150} y={1380} width={150} height={40} rx={12} fill="#E6E9EE" stroke={INK} strokeWidth={6} />
          <rect x={205} y={1420} width={40} height={60} fill="#9AA1AB" stroke={INK} strokeWidth={5} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {mode === "pole" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.6) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 230} size={v.answerSize ?? 100} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      {showFloats ? <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 300} /> : null}
    </Backdrop>
  );
};
