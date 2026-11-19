import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep079 Mill Scavenger – children swept cotton fluff from under spinning mules while the iron carriage rolled over them.
// visual: { mode: "under" | "mill" | "vacuum", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?,
//           period? (frames per carriage cycle, under/mill), dark? (0–1, under), empty? (under: no child, brush left behind),
//           phase? (0–1 start of the carriage cycle), ghost? (vacuum: 0–1 sepia ghost of the child under the sofa),
//           coins? (mill: true = coins pop over the minder) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EDBE96";
const SKIN_D = "#CF9670";
const HAIR = "#6A3A1E";
const SHIRT = "#5D7FA3";
const SHIRT_D = "#46637F";
const TROUSER = "#7A5536";
const IRON = "#4A4F57";
const IRON_D = "#33373D";
const IRON_HI = "#7C838D";
const YARN = "#FBF6EA";
const FLUFF = "#FFFDF6";
const FLOOR = "#B88A5A";
const FLOOR_D = "#9A6F44";
const WALL = "#E9D7B0";
const WOOD = "#8A5A32";

const FLOOR_Y = 1560;
const BEAM_X = 170; // right edge of the fixed roller beam

// carriage left edge for frame f: rolls out (right) and back in (left, over the child)
const carriageX = (f: number, period: number, phase = 0) => {
  const t = ((f / period + phase) % 1 + 1) % 1;
  // dwell a little at each end, glide in between
  const e = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
  return interpolate(e, [0, 1], [BEAM_X + 6, 1020]);
};

const Fluff: React.FC<{ f: number; n?: number; o?: number; top?: number; bottom?: number }> = ({ f, n = 40, o = 0.85, top = 400, bottom = 1560 }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const sp = 0.4 + ((k * 37) % 10) / 14;
      const h = bottom - top;
      const y = top + ((f * 1.3 * sp + k * 197) % h);
      const x = ((k * 263) % 1080) + Math.sin(f / 19 + k) * 40;
      const r = 4 + ((k * 13) % 8);
      return <circle key={k} cx={x} cy={y} r={r} fill={FLUFF} opacity={o * (0.45 + 0.55 * Math.abs(Math.sin(f / 13 + k)))} />;
    })}
  </>
);

// warm mill wall with tall windows and light shafts falling to the floor
const MillWall: React.FC<{ f: number }> = ({ f }) => (
  <>
    <rect x={0} y={0} width={1080} height={FLOOR_Y} fill={WALL} />
    <rect x={0} y={0} width={1080} height={140} fill="#CDB57E" />
    {[60, 400, 740].map((x) => (
      <g key={x}>
        <rect x={x} y={470} width={280} height={360} fill="#FFF6D6" stroke={INK} strokeWidth={8} />
        <path d={`M ${x + 93} 470 L ${x + 93} 830 M ${x + 187} 470 L ${x + 187} 830 M ${x} 650 L ${x + 280} 650`} stroke={INK} strokeWidth={7} />
        <path d={`M ${x} 830 L ${x - 120} ${FLOOR_Y} L ${x + 420} ${FLOOR_Y} L ${x + 280} 830 Z`} fill="#FFF6D8" opacity={0.2 + Math.sin(f / 25 + x) * 0.03} />
      </g>
    ))}
    <rect x={0} y={FLOOR_Y} width={1080} height={1920 - FLOOR_Y} fill={FLOOR} />
    {new Array(7).fill(0).map((_, k) => (
      <path key={k} d={`M 0 ${FLOOR_Y + 30 + k * 52} L 1080 ${FLOOR_Y + 30 + k * 52}`} stroke={FLOOR_D} strokeWidth={5} />
    ))}
    <path d={`M 0 ${FLOOR_Y} L 1080 ${FLOOR_Y}`} stroke={INK} strokeWidth={8} />
    {/* rails */}
    <rect x={0} y={FLOOR_Y + 6} width={1080} height={14} fill={IRON_D} />
  </>
);

// the scavenger lying flat on the floor, head toward camera-right, brush forward. origin = chin on the floor.
// duck 0..1 = carriage overhead (head pressed down, eyes squeezed)
export const Scavenger: React.FC<{ x: number; y: number; s?: number; f: number; duck?: number; sweep?: boolean; sepia?: boolean; wide?: boolean }> = ({ x, y, s = 1, f, duck = 0, sweep = true, sepia = false, wide = false }) => {
  const sw = sweep ? Math.sin(f / 5) * 38 * (1 - duck) : 0;
  const hy = -128 + duck * 26;
  const skin = sepia ? "#D9C3A0" : SKIN;
  const shirt = sepia ? "#B9A07A" : SHIRT;
  const shirtD = sepia ? "#A38B66" : SHIRT_D;
  const trouser = sepia ? "#9C8460" : TROUSER;
  const hair = sepia ? "#8A7350" : HAIR;
  const squeeze = duck > 0.5 && !wide;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* legs + bare feet trailing off left */}
      <rect x={-900} y={-92} width={360} height={88} rx={40} fill={trouser} stroke={INK} strokeWidth={7} />
      <path d="M -900 -60 L -960 -78 Q -990 -50 -960 -20 L -900 -14 Z" fill={skin} stroke={INK} strokeWidth={6} />
      {/* far arm */}
      <path d={`M -170 -110 L -30 -34 L ${100 + sw * 0.6} -28`} stroke={INK} strokeWidth={50} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M -170 -110 L -30 -34 L ${100 + sw * 0.6} -28`} stroke={shirtD} strokeWidth={38} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* torso */}
      <path d="M -600 -6 L -600 -120 Q -560 -176 -380 -178 L -150 -176 Q -96 -150 -100 -60 L -110 -6 Z" fill={shirt} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -470 -170 Q -440 -90 -470 -10 M -300 -176 Q -280 -100 -300 -8" stroke={shirtD} strokeWidth={8} fill="none" />
      {/* brush */}
      <g transform={`translate(${170 + sw} -30)`}>
        <rect x={0} y={-12} width={190} height={22} rx={10} fill={WOOD} stroke={INK} strokeWidth={5} />
        <rect x={180} y={-40} width={70} height={50} rx={8} fill="#A07444" stroke={INK} strokeWidth={5} />
        {new Array(6).fill(0).map((_, k) => (
          <path key={k} d={`M ${186 + k * 11} 10 l ${-4 + (k % 2) * 8} 22`} stroke="#5A3A1C" strokeWidth={5} />
        ))}
      </g>
      {/* near arm */}
      <path d={`M -200 -120 L -70 -40 L ${150 + sw} -30`} stroke={INK} strokeWidth={56} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M -200 -120 L -70 -40 L ${150 + sw} -30`} stroke={shirt} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={160 + sw} cy={-30} r={30} fill={skin} stroke={INK} strokeWidth={6} />
      {/* head */}
      <g transform={`translate(0 ${hy})`}>
        <ellipse cx={0} cy={0} rx={120} ry={116} fill={skin} stroke={INK} strokeWidth={7} />
        <path d="M -122 -6 Q -138 -120 -10 -128 Q 110 -132 124 -40 Q 80 -92 20 -84 Q -40 -96 -70 -50 Q -96 -40 -122 -6 Z" fill={hair} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 40 -112 l 18 -26 M 70 -100 l 26 -18 M -20 -124 l 0 -28" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        {/* cotton fluff caught in the hair */}
        {[[-70, -90], [-20, -110], [40, -98], [85, -70], [-100, -40]].map(([cx, cy], k) => (
          <circle key={k} cx={cx} cy={cy} r={9 + (k % 2) * 4} fill={FLUFF} stroke="#D8D0BC" strokeWidth={2} />
        ))}
        <ellipse cx={-118} cy={10} rx={18} ry={26} fill={skin} stroke={INK} strokeWidth={5} />
        {/* eyes looking up at the carriage */}
        {squeeze ? (
          <path d="M -60 -6 Q -40 4 -20 -6 M 30 -6 Q 52 4 74 -6" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        ) : (
          <>
            <ellipse cx={-40} cy={-8} rx={20} ry={18} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <ellipse cx={52} cy={-8} rx={20} ry={18} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={-38} cy={-16} r={9} fill={INK} />
            <circle cx={54} cy={-16} r={9} fill={INK} />
          </>
        )}
        <path d="M -66 -40 L -18 -32 M 78 -40 L 30 -32" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M 6 6 q -10 22 6 28" stroke={SKIN_D} strokeWidth={5} fill="none" />
        <ellipse cx={-70} cy={34} rx={20} ry={10} fill="#E58C3A" opacity={0.35} />
        <ellipse cx={86} cy={34} rx={20} ry={10} fill="#E58C3A" opacity={0.35} />
        {/* smudges of dust */}
        <circle cx={-60} cy={48} r={6} fill="#A08A6A" opacity={0.5} />
        <circle cx={70} cy={56} r={5} fill="#A08A6A" opacity={0.5} />
        {duck > 0.3 ? <ellipse cx={8} cy={66} rx={14} ry={16} fill="#5A2A1A" stroke={INK} strokeWidth={5} /> : <path d="M -16 64 Q 8 58 30 64" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
      </g>
    </g>
  );
};

// the fixed roller beam (left) + the rolling carriage with its spindles and yarn
const Mule: React.FC<{ f: number; cx: number; bottom: number }> = ({ f, cx, bottom }) => {
  const top = bottom - 90;
  const spTop = top - 240;
  const spindles = new Array(44).fill(0).map((_, k) => cx + 40 + k * 46);
  return (
    <>
      {/* yarn from the rollers to the spindle tips */}
      {spindles.map((sx, k) => (k % 2 === 0 ? <line key={`y${k}`} x1={BEAM_X - 20} y1={top - 200} x2={sx} y2={spTop + 10} stroke={YARN} strokeWidth={3} opacity={0.9} /> : null))}
      {/* carriage */}
      <rect x={cx} y={top} width={2400} height={90} fill={IRON} stroke={INK} strokeWidth={8} />
      <rect x={cx} y={top + 8} width={2400} height={14} fill={IRON_HI} opacity={0.6} />
      <rect x={cx} y={bottom - 22} width={2400} height={22} fill={IRON_D} />
      {spindles.map((sx, k) => (
        <g key={k}>
          <line x1={sx} y1={top} x2={sx} y2={spTop} stroke={IRON_D} strokeWidth={6} />
          <path d={`M ${sx - 16} ${top - 30} Q ${sx} ${top - 150 - Math.sin(f / 9 + k) * 4} ${sx + 16} ${top - 30} Z`} fill={YARN} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {/* sharp leading edge */}
      <path d={`M ${cx} ${top} L ${cx - 12} ${bottom} L ${cx} ${bottom}`} fill={IRON_D} stroke={INK} strokeWidth={6} />
      {/* fixed roller beam */}
      <rect x={0} y={top - 260} width={BEAM_X} height={350} fill={IRON} stroke={INK} strokeWidth={8} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={BEAM_X - 40} cy={top - 220 + k * 46} r={20} fill={IRON_HI} stroke={INK} strokeWidth={5} />
      ))}
      <rect x={30} y={bottom} width={60} height={FLOOR_Y - bottom} fill={IRON_D} stroke={INK} strokeWidth={6} />
    </>
  );
};

const FluffPile: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-50, -14, 26], [-10, -26, 32], [34, -16, 26], [64, -8, 18], [-80, -6, 16]].map(([cx, cy, r], k) => (
      <circle key={k} cx={cx} cy={cy} r={r} fill={FLUFF} stroke="#D8D0BC" strokeWidth={3} />
    ))}
  </g>
);

// one mule bay (beam + carriage + child) in a group, so the wide shot can repeat it
const Bay: React.FC<{ f: number; period: number; phase: number; child?: boolean }> = ({ f, period, phase, child = true }) => {
  const cx = carriageX(f, period, phase);
  const duck = interpolate(cx, [640, 860], [1, 0], clamp);
  return (
    <>
      <Mule f={f} cx={cx} bottom={1215} />
      {child ? <Scavenger x={560} y={FLOOR_Y} s={1.25} f={f} duck={duck} /> : null}
    </>
  );
};

const Coins: React.FC<{ f: number; x: number; y: number }> = ({ f, x, y }) => (
  <>
    {new Array(5).fill(0).map((_, k) => {
      const at = 8 + k * 9;
      const age = f - at;
      if (age < 0) return null;
      const yy = y - Math.min(age, 24) * 6 - k * 4;
      return (
        <g key={k} transform={`translate(${x + (k - 2) * 70} ${yy})`} opacity={interpolate(age, [0, 4, 40, 50], [0, 1, 1, 0], clamp)}>
          <ellipse cx={0} cy={0} rx={36} ry={36} fill={C.mustard} stroke={INK} strokeWidth={6} />
          <text x={0} y={14} textAnchor="middle" fontFamily={typeFont} fontSize={40} fill={INK}>d</text>
        </g>
      );
    })}
  </>
);

// today: a living room; a robot vacuum glides under the sofa and eats the fluff
const LivingRoom: React.FC<{ f: number; dur: number; ghost: number }> = ({ f, dur, ghost }) => {
  const floorY = 1500;
  const vx = interpolate(f, [0, Math.max(40, dur * 0.8)], [1180, 330], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const eaten = vx < 640;
  const ghostO = ghost * interpolate(vx, [520, 900], [0, 1], clamp);
  return (
    <>
      <rect x={0} y={0} width={1080} height={floorY} fill="#F1DDB8" />
      <rect x={0} y={0} width={1080} height={1920} fill="#FFD9A0" opacity={0.12} />
      {/* window at dusk + lamp glow */}
      <rect x={110} y={330} width={360} height={430} rx={10} fill="#F6B27A" stroke={INK} strokeWidth={8} />
      <rect x={110} y={330} width={360} height={200} fill="#8A6AB0" opacity={0.55} />
      <path d="M 290 330 L 290 760 M 110 545 L 470 545" stroke={INK} strokeWidth={8} />
      <circle cx={860} cy={520} r={260} fill="#FFF1C4" opacity={0.35} />
      <path d="M 800 430 L 920 430 L 950 540 L 770 540 Z" fill="#F7E3A8" stroke={INK} strokeWidth={7} />
      <rect x={852} y={540} width={16} height={420} fill={INK} />
      {/* floor */}
      <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill="#C98E5A" />
      {new Array(9).fill(0).map((_, k) => (
        <path key={k} d={`M 0 ${floorY + 26 + k * 48} L 1080 ${floorY + 26 + k * 48}`} stroke="#B07A48" strokeWidth={5} />
      ))}
      <path d={`M 0 ${floorY} L 1080 ${floorY}`} stroke={INK} strokeWidth={8} />
      {/* sepia ghost of the scavenger, lying exactly where the robot goes */}
      {ghostO > 0.01 ? (
        <g opacity={ghostO * 0.55}>
          <Scavenger x={470} y={floorY} s={0.62} f={f} duck={1} sweep={false} sepia />
        </g>
      ) : null}
      {/* fluff tuft */}
      {!eaten ? <FluffPile x={600} y={floorY} s={0.9} /> : null}
      {/* robot vacuum */}
      <g transform={`translate(${vx} ${floorY - 6})`}>
        <ellipse cx={0} cy={0} rx={150} ry={18} fill="#000000" opacity={0.25} />
        <path d="M -140 -10 L -140 -58 Q -140 -82 -110 -86 L 110 -86 Q 140 -82 140 -58 L 140 -10 Z" fill="#2F3338" stroke={INK} strokeWidth={7} />
        <rect x={-140} y={-46} width={280} height={14} fill="#4C535B" />
        <ellipse cx={0} cy={-86} rx={110} ry={10} fill="#5C646E" />
        <circle cx={-90} cy={-64} r={9} fill={Math.floor(f / 8) % 2 ? "#4BD6FF" : "#1E8AB0"} stroke={INK} strokeWidth={3} />
        <path d="M -150 -14 l -26 6 M -150 -24 l -24 -8" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      </g>
      {/* sofa (drawn over the robot so it slides underneath) */}
      <g>
        <rect x={60} y={1040} width={960} height={250} rx={40} fill="#D9A23E" stroke={INK} strokeWidth={8} />
        <rect x={120} y={1180} width={840} height={140} rx={30} fill="#E8B550" stroke={INK} strokeWidth={8} />
        <path d="M 540 1185 L 540 1320" stroke={INK} strokeWidth={6} />
        <rect x={20} y={1110} width={150} height={260} rx={50} fill="#C99232" stroke={INK} strokeWidth={8} />
        <rect x={910} y={1110} width={150} height={260} rx={50} fill="#C99232" stroke={INK} strokeWidth={8} />
        <rect x={80} y={1310} width={920} height={60} fill="#B98226" stroke={INK} strokeWidth={8} />
        {/* shadowed gap under the sofa: the robot shows through it */}
        <rect x={90} y={1370} width={900} height={130} fill="#3A2A1A" opacity={0.28} />
        <rect x={110} y={1370} width={36} height={130} fill={WOOD} stroke={INK} strokeWidth={6} />
        <rect x={934} y={1370} width={36} height={130} fill={WOOD} stroke={INK} strokeWidth={6} />
      </g>
    </>
  );
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

export const MillScavenger: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "under";
  const float: string[] = v.float ?? [];
  const period: number = v.period ?? 84;
  const phase: number = v.phase ?? 0.5;
  let body: React.ReactNode = null;

  if (mode === "under") {
    const cx = carriageX(f, period, phase);
    const duck = interpolate(cx, [640, 860], [1, 0], clamp);
    const dark: number = v.dark ?? 0;
    const zs: number = v.zoomIn ?? 1.6;
    body = (
      <>
        <g transform={`translate(540 1000) scale(${zs}) translate(-560 -1350)`}>
        <MillWall f={f} />
        <Mule f={f} cx={cx} bottom={1215} />
        <FluffPile x={1000} y={FLOOR_Y} s={1.1} />
        {v.empty ? (
          <g transform={`translate(${v.brushX ?? 470} ${FLOOR_Y - 18}) rotate(-6)`}>
            <rect x={0} y={-12} width={240} height={24} rx={10} fill={WOOD} stroke={INK} strokeWidth={6} />
            <rect x={230} y={-40} width={90} height={56} rx={8} fill="#A07444" stroke={INK} strokeWidth={6} />
          </g>
        ) : (
          <Scavenger x={560} y={FLOOR_Y} s={1.25} f={f} duck={duck} wide={!!v.wideEyes} />
        )}
        <Fluff f={f} n={44} o={0.85} />
        </g>
        {dark > 0 ? <rect x={0} y={0} width={1080} height={1920} fill="#0E1424" opacity={dark * 0.55} /> : null}
        <defs>
          <radialGradient id="ep079vig" cx="0.5" cy="0.6" r="0.8">
            <stop offset="0.55" stopColor="#2A1A00" stopOpacity={0} />
            <stop offset="1" stopColor="#2A1A00" stopOpacity={0.42} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep079vig)" />
      </>
    );
  } else if (mode === "mill") {
    // wide: a hall of mules rolling in step, a tiny child under each, the minder at the end
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill={WALL} />
        {[40, 400, 760].map((x) => (
          <g key={x}>
            <rect x={x} y={300} width={280} height={300} fill="#FFF6D6" stroke={INK} strokeWidth={7} />
            <path d={`M ${x + 140} 300 L ${x + 140} 600 M ${x} 450 L ${x + 280} 450`} stroke={INK} strokeWidth={6} />
          </g>
        ))}
        <rect x={0} y={700} width={1080} height={1220} fill={FLOOR} />
        <g transform="translate(0 150) scale(0.55)">
          <Bay f={f} period={period} phase={phase + 0.15} />
        </g>
        <g transform="translate(0 600) scale(0.72)">
          <Bay f={f} period={period} phase={phase} />
        </g>
        <Fluff f={f} n={30} o={0.7} top={200} bottom={1900} />
        <Figure x={880} y={1880} scale={1.5} hat="cap" coat="#3A3A44" scarf="#7A2E2A" prop="none" action="idle" facing="left" />
        {v.coins ? <Coins f={f} x={860} y={1080} /> : null}
      </>
    );
  } else if (mode === "vacuum") {
    body = <LivingRoom f={f} dur={dur} ghost={v.ghost ?? 1} />;
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
