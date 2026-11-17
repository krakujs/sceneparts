import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep010 Chimney climbing boy – Georgian/Victorian Britain.
// visual: { mode: "hearth" | "master" | "flue" | "fire" | "memorial" | "wedding", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#E8B990";
const SOOT = "#2A2522";
const SOOTY_SKIN = "#9C8574";
const BRICK = "#A85A40";
const BRICK_D = "#8A4632";
const WALL = "#E9C9A0";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 150 }), top: top + (i % 2) * 120 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

// brick pattern inside a rect
const Bricks: React.FC<{ x: number; y: number; w: number; h: number; seed: string; dark?: boolean }> = ({ x, y, w, h, seed, dark }) => {
  const rows = Math.ceil(h / 44);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={dark ? BRICK_D : BRICK} />
      {new Array(rows).fill(0).map((_, r) =>
        new Array(Math.ceil(w / 90) + 1).fill(0).map((__, k) => {
          const bx = x + k * 90 - (r % 2) * 45;
          const shade = random(`${seed}${r}${k}`) > 0.7;
          return <rect key={`${r}-${k}`} x={Math.max(x, bx)} y={y + r * 44} width={Math.max(0, Math.min(86, x + w - Math.max(x, bx)))} height={40} fill={shade ? (dark ? "#743A2A" : "#B86A4E") : "none"} stroke="#6E3626" strokeWidth={3} />;
        }),
      )}
    </g>
  );
};

// falling soot specks
const Soot: React.FC<{ f: number; x0: number; x1: number; y0: number; y1: number; n?: number; seed: string }> = ({ f, x0, x1, y0, y1, n = 26, seed }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const sp = 6 + random(`${seed}s${k}`) * 8;
      const y = y0 + ((f * sp + random(`${seed}y${k}`) * (y1 - y0)) % (y1 - y0));
      const x = x0 + random(`${seed}x${k}`) * (x1 - x0) + Math.sin(f / 8 + k) * 10;
      return <circle key={k} cx={x} cy={y} r={3 + random(`${seed}r${k}`) * 6} fill={SOOT} opacity={0.75} />;
    })}
  </>
);

// small sooty boy. Origin = feet centre. pose: "kneel" (looking up, brush raised), "stand", "climb" (back view, elbows+knees out)
const Boy: React.FC<{ x: number; y: number; s?: number; f: number; pose?: "kneel" | "stand" | "climb" | "palm"; sooty?: number; facing?: 1 | -1 }> = ({ x, y, s = 1, f, pose = "stand", sooty = 1, facing = 1 }) => {
  const skin = sooty > 0.5 ? SOOTY_SKIN : SKIN;
  const cloth = "#4B4038";
  if (pose === "climb") {
    const t = Math.sin(f / 6);
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {/* legs braced on flue walls */}
        <path d={`M -20 -80 L -70 ${-40 + t * 18} L -74 ${10 + t * 18}`} stroke={skin} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 20 -80 L 70 ${-40 - t * 18} L 74 ${10 - t * 18}`} stroke={skin} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* body (back view) */}
        <ellipse cx={0} cy={-150} rx={52} ry={82} fill={skin} stroke={INK} strokeWidth={6} />
        <path d="M -20 -180 q 20 30 40 0" stroke="#7E6A5C" strokeWidth={5} fill="none" />
        {/* arms: elbows pressed on walls */}
        <path d={`M -40 -200 L -84 ${-240 - t * 20} L -60 ${-310 - t * 20}`} stroke={skin} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 40 -200 L 84 ${-240 + t * 20} L 60 ${-310 + t * 20}`} stroke={skin} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* head + cap from behind */}
        <circle cx={0} cy={-262} r={44} fill={skin} stroke={INK} strokeWidth={6} />
        <path d="M -46 -262 Q -44 -316 0 -318 Q 44 -316 46 -262 Z" fill={SOOT} stroke={INK} strokeWidth={5} />
      </g>
    );
  }
  const kneel = pose === "kneel";
  const bob = Math.sin(f / 7) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={90} ry={14} fill="#000" opacity={0.2} />
      {kneel ? (
        <>
          <path d="M -40 -10 L 40 -10 L 50 -70 L -30 -80 Z" fill={cloth} stroke={INK} strokeWidth={5} />
          <ellipse cx={-50} cy={-10} rx={34} ry={14} fill={skin} stroke={INK} strokeWidth={4} />
        </>
      ) : (
        <>
          <rect x={-34} y={-110} width={28} height={110} fill={cloth} stroke={INK} strokeWidth={5} />
          <rect x={6} y={-110} width={28} height={110} fill={cloth} stroke={INK} strokeWidth={5} />
          <ellipse cx={-22} cy={-4} rx={22} ry={10} fill={skin} stroke={INK} strokeWidth={4} />
          <ellipse cx={22} cy={-4} rx={22} ry={10} fill={skin} stroke={INK} strokeWidth={4} />
        </>
      )}
      <g transform={`translate(0 ${kneel ? 60 : 0})`}>
        {/* torso: ragged shirt */}
        <path d="M -50 -110 L -56 -230 Q 0 -256 56 -230 L 50 -110 Z" fill="#6E6258" stroke={INK} strokeWidth={6} />
        <path d="M -50 -112 l 12 14 l 12 -12 l 14 14 l 12 -14 l 14 12 l 12 -12 l 14 12" stroke={INK} strokeWidth={4} fill="none" />
        {/* arms */}
        {pose === "palm" ? (
          <>
            <path d="M 46 -220 Q 90 -170 110 -150" stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
            <ellipse cx={122} cy={-150} rx={26} ry={12} fill={skin} stroke={INK} strokeWidth={5} />
            <path d="M -46 -220 Q -70 -170 -60 -120" stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
          </>
        ) : kneel ? (
          <>
            {/* brush arm raised up the flue */}
            <path d={`M 40 -224 Q 70 -300 60 ${-370 + bob}`} stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
            <circle cx={60} cy={-376 + bob} r={18} fill={skin} stroke={INK} strokeWidth={5} />
            <rect x={54} y={-560 + bob} width={12} height={190} fill="#8A6236" stroke={INK} strokeWidth={4} />
            <g transform={`translate(60 ${-570 + bob})`}>
              {new Array(9).fill(0).map((_, k) => (
                <path key={k} d={`M 0 0 L ${Math.cos((k / 9) * Math.PI * 2) * 50} ${Math.sin((k / 9) * Math.PI * 2) * 30}`} stroke={SOOT} strokeWidth={7} strokeLinecap="round" />
              ))}
            </g>
            <path d="M -46 -220 Q -80 -170 -70 -130" stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 46 -220 Q 70 -170 64 -120" stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
            <path d="M -46 -220 Q -70 -170 -64 -120" stroke="#6E6258" strokeWidth={26} fill="none" strokeLinecap="round" />
          </>
        )}
        {/* head, looking up when kneeling */}
        <g transform={`translate(0 -290) rotate(${kneel ? -24 : 0})`}>
          <circle cx={0} cy={0} r={56} fill={skin} stroke={INK} strokeWidth={6} />
          {sooty > 0 ? <ellipse cx={-18} cy={18} rx={24} ry={14} fill={SOOT} opacity={0.45} /> : null}
          <circle cx={18} cy={-6} r={7} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <circle cx={20} cy={-8} r={3.5} fill={INK} />
          <circle cx={-12} cy={-6} r={7} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
          <circle cx={-10} cy={-8} r={3.5} fill={INK} />
          <path d="M -4 26 q 10 -6 20 0" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M -60 -6 Q -60 -66 0 -68 Q 60 -66 62 -6 L 84 0 L 40 -20 Q 0 -30 -50 -14 Z" fill={SOOT} stroke={INK} strokeWidth={5} />
        </g>
      </g>
    </g>
  );
};

// a big open fireplace (hearth opening at bottom), from x-w/2..x+w/2, floor at y
const Fireplace: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x - w / 2 - 70} y={y - h - 80} width={w + 140} height={h + 80} fill="#C9B79A" stroke={INK} strokeWidth={8} />
    <rect x={x - w / 2 - 100} y={y - h - 110} width={w + 200} height={44} fill="#8A6236" stroke={INK} strokeWidth={8} />
    <Bricks x={x - w / 2} y={y - h} w={w} h={h} seed="fp" dark />
    <path d={`M ${x - w / 2} ${y - h} L ${x - 70} ${y - h - 2} L ${x + 70} ${y - h - 2} L ${x + w / 2} ${y - h} Z`} fill={SOOT} />
    <rect x={x - 70} y={y - h - 80} width={140} height={84} fill={SOOT} />
    <rect x={x - w / 2 - 20} y={y - 14} width={w + 40} height={20} fill="#6E6258" stroke={INK} strokeWidth={5} />
  </g>
);

const Flame: React.FC<{ x: number; y: number; s?: number; f: number; k?: number }> = ({ x, y, s = 1, f, k = 0 }) => {
  const w = Math.sin(f / 3 + k) * 10;
  const h = 1 + Math.sin(f / 4 + k * 2) * 0.12;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${s * h})`}>
      <path d={`M -50 0 Q -60 -80 ${-10 + w} -170 Q 10 -100 30 -120 Q 60 -60 50 0 Z`} fill="#F28C28" stroke={INK} strokeWidth={5} />
      <path d={`M -26 0 Q -30 -50 ${0 + w * 0.6} -100 Q 20 -50 26 0 Z`} fill={C.glow} />
    </g>
  );
};

const Coin: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={26} ry={26 * Math.max(0.2, Math.abs(Math.cos((rot * Math.PI) / 180)))} fill={C.mustard} stroke={INK} strokeWidth={4} />
  </g>
);

const Floor: React.FC<{ y: number }> = ({ y }) => (
  <>
    <rect x={0} y={y} width={1080} height={1920 - y} fill="#9A7350" />
    {new Array(8).fill(0).map((_, k) => (
      <path key={k} d={`M 0 ${y + 30 + k * k * 9} L 1080 ${y + 30 + k * k * 9}`} stroke="#7E5C3E" strokeWidth={4} />
    ))}
  </>
);

export const ClimbingBoy: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "hearth";
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" | "dark" = "paper";
  let body: React.ReactNode = null;

  if (mode === "hearth") {
    // frame 0: a small sooty boy kneels in a big fireplace, brush already up the flue, soot raining down
    sky = "dawn";
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1500} fill={WALL} />
        <rect x={0} y={1080} width={1080} height={30} fill="#B48A62" />
        <Fireplace x={540} y={1500} w={620} h={560} />
        <Soot f={f} x0={380} x1={700} y0={880} y1={1480} seed="h" />
        <Floor y={1500} />
        <Boy x={500} y={1470} s={1.25} f={f} pose="kneel" />
        <path d="M 120 1700 q 40 -20 80 0 q 40 20 80 0" stroke={SOOT} strokeWidth={10} fill="none" opacity={0.5} />
      </>
    );
  } else if (mode === "master") {
    // the lady pays the master; the boy's hand stays empty
    sky = "day";
    const pay = interpolate(f, [6, 26], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    const zero = interpolate(f, [dur * 0.55, dur * 0.55 + 8], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1450} fill="#D9B48A" />
        <rect x={700} y={520} width={300} height={930} fill="#5A3C2A" stroke={INK} strokeWidth={8} />
        <rect x={730} y={550} width={240} height={420} fill="#F2D9A0" stroke={INK} strokeWidth={5} />
        <Floor y={1450} />
        <Figure hat="bonnet" coat="#7A4E6E" scarf={C.cream} skirt x={860} y={1720} scale={1.5} action="idle" facing="left" />
        <Figure hat="top" coat="#2B2622" scarf={C.brick} x={420} y={1720} scale={1.6} action="idle" facing="right" />
        <Boy x={170} y={1760} s={0.95} f={f} pose="palm" />
        {[0, 1, 2].map((k) => {
          const p = interpolate(pay, [k * 0.15, 0.7 + k * 0.1], [0, 1], clamp);
          return <Coin key={k} x={interpolate(p, [0, 1], [760, 540])} y={1180 - Math.sin(p * Math.PI) * 160 + k * 10} s={1.2} rot={f * 30 + k * 40} />;
        })}
        {zero > 0 ? (
          <g transform={`translate(290 1440) scale(${zero})`}>
            <circle r={78} fill={C.cream} stroke={C.brick} strokeWidth={12} />
            <text y={30} textAnchor="middle" fontFamily={typeFont} fontSize={96} fill={C.brick}>0</text>
          </g>
        ) : null}
      </>
    );
  } else if (mode === "flue") {
    // cut-away: the boy wriggles up a narrow brick flue with knees and elbows
    sky = "paper";
    const up = interpolate(f, [0, dur], [0, 260], clamp);
    const gap = 210;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#CDB896" />
        <Bricks x={140} y={0} w={540 - gap / 2 - 140} h={1920} seed="fl" />
        <Bricks x={540 + gap / 2} y={0} w={940 - 540 - gap / 2} h={1920} seed="fr" />
        <rect x={540 - gap / 2} y={0} width={gap} height={1920} fill="#1F1A17" />
        <Soot f={f} x0={540 - gap / 2} x1={540 + gap / 2} y0={0} y1={1920} n={30} seed="fs" />
        <Boy x={540} y={1500 - up} s={1.15} f={f} pose="climb" />
        {/* ruler showing the width */}
        <g transform="translate(0 1640)">
          <path d={`M ${540 - gap / 2} 0 L ${540 + gap / 2} 0`} stroke={C.mustard} strokeWidth={8} />
          <path d={`M ${540 - gap / 2} -26 L ${540 - gap / 2} 26 M ${540 + gap / 2} -26 L ${540 + gap / 2} 26`} stroke={C.mustard} strokeWidth={8} />
        </g>
        <rect x={0} y={0} width={140} height={1920} fill="#CDB896" />
        <rect x={940} y={0} width={140} height={1920} fill="#CDB896" />
      </>
    );
  } else if (mode === "fire") {
    // looking up from the grate: straw catches, smoke rises toward the boy's bare feet
    sky = "dark";
    const lit = interpolate(f, [4, 16], [0, 1], clamp);
    const kick = Math.sin(f / 3) * 16;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#1A1512" />
        <Bricks x={0} y={0} w={300} h={1920} seed="wl" dark />
        <Bricks x={780} y={0} w={300} h={1920} seed="wr" dark />
        {/* boy's dangling feet near the top */}
        <g transform={`translate(540 ${300})`}>
          <path d={`M -40 -300 L -44 60 L ${-60 + kick} 110`} stroke={SOOTY_SKIN} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M 40 -300 L 44 60 L ${60 - kick} 110`} stroke={SOOTY_SKIN} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx={-62 + kick} cy={124} rx={34} ry={18} fill={SOOTY_SKIN} stroke={INK} strokeWidth={5} />
          <ellipse cx={62 - kick} cy={124} rx={34} ry={18} fill={SOOTY_SKIN} stroke={INK} strokeWidth={5} />
        </g>
        {/* smoke */}
        {new Array(8).fill(0).map((_, k) => {
          const p = ((f * 1.4 + k * 26) % 200) / 200;
          return <circle key={k} cx={540 + Math.sin(k * 2 + f / 10) * 70} cy={1500 - p * 1100} r={60 + p * 90} fill="#6E6660" opacity={lit * (0.55 - p * 0.45)} />;
        })}
        {/* the grate + straw */}
        <rect x={300} y={1560} width={480} height={30} fill="#3A3330" stroke={INK} strokeWidth={6} />
        {new Array(14).fill(0).map((_, k) => (
          <path key={k} d={`M ${330 + k * 30} 1560 l ${(k % 3) * 14 - 14} -60`} stroke="#E0C068" strokeWidth={8} strokeLinecap="round" />
        ))}
        {lit > 0 ? (
          <g opacity={lit}>
            <Flame x={430} y={1560} s={1.1} f={f} k={0} />
            <Flame x={540} y={1560} s={1.4} f={f} k={1.3} />
            <Flame x={650} y={1560} s={1.05} f={f} k={2.6} />
          </g>
        ) : null}
        <rect x={0} y={1590} width={1080} height={330} fill="#2B2420" />
      </>
    );
  } else if (mode === "memorial") {
    // a plain card for George Brewster; the 1875 law slams in
    sky = "paper";
    const card = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const law = interpolate(f, [dur * 0.55, dur * 0.55 + 7], [2.2, 1], { ...clamp, easing: Easing.in(Easing.quad) });
    const lawOn = f >= dur * 0.55;
    const flick = 1 + Math.sin(f / 2.3) * 0.08;
    body = (
      <>
        <g transform={`translate(540 ${700 + (1 - card) * 120}) rotate(-2)`} opacity={card}>
          <rect x={-380} y={-360} width={760} height={640} rx={12} fill={C.cream} stroke={INK} strokeWidth={8} />
          <rect x={-350} y={-330} width={700} height={580} rx={8} fill="none" stroke={C.sepia} strokeWidth={4} />
          <text y={-200} textAnchor="middle" fontFamily={typeFont} fontSize={60} fill={C.sepia}>FULBOURN · 1875</text>
          <text y={-70} textAnchor="middle" fontFamily={typeFont} fontSize={92} fill={INK}>GEORGE</text>
          <text y={40} textAnchor="middle" fontFamily={typeFont} fontSize={92} fill={INK}>BREWSTER</text>
          <text y={160} textAnchor="middle" fontFamily={typeFont} fontSize={58} fill={C.brick}>STUCK IN A CHIMNEY</text>
        </g>
        {/* candle */}
        <g transform="translate(990 1360) scale(0.55)">
          <rect x={-34} y={-150} width={68} height={150} rx={8} fill={C.cream} stroke={INK} strokeWidth={6} />
          <g transform={`translate(0 -156) scale(${flick})`}>
            <path d="M 0 -80 Q 30 -30 0 0 Q -30 -30 0 -80 Z" fill={C.mustard} stroke={INK} strokeWidth={4} />
          </g>
          <ellipse cx={0} cy={4} rx={120} ry={20} fill="#000" opacity={0.15} />
        </g>
        {lawOn ? (
          <g transform={`translate(540 1180) rotate(-6) scale(${law * 0.9})`}>
            <rect x={-400} y={-80} width={800} height={160} rx={16} fill="none" stroke={C.brick} strokeWidth={14} />
            <text y={30} textAnchor="middle" fontFamily={typeFont} fontSize={74} fill={C.brick}>LAW ENDS IT · 1875</text>
          </g>
        ) : null}
      </>
    );
  } else if (mode === "wedding") {
    // today: a sweep in a top hat shakes the bride's hand outside a church, confetti
    sky = "day";
    const shake = Math.sin(f / 3) * 10;
    body = (
      <>
        <rect x={140} y={300} width={800} height={1180} fill="#D8CDB8" stroke={INK} strokeWidth={8} />
        <path d="M 380 1480 L 380 900 Q 540 700 700 900 L 700 1480 Z" fill="#5A3C2A" stroke={INK} strokeWidth={8} />
        <path d="M 540 360 L 540 560 M 470 430 L 610 430" stroke={INK} strokeWidth={14} />
        <rect x={0} y={1480} width={1080} height={440} fill="#9CB27A" />
        <rect x={360} y={1480} width={360} height={440} fill="#C9BCA4" />
        <Figure hat="bonnet" coat="#FFFFFF" scarf="#F4EAD5" skirt x={360} y={1760} scale={1.6} action="idle" facing="right" />
        <Figure hat="top" coat="#1D1A1E" scarf={C.brick} prop="pole" x={720} y={1760} scale={1.6} action="idle" facing="left" />
        <g transform={`translate(540 ${1450 + shake})`}>
          <circle cx={-26} cy={0} r={26} fill={SKIN} stroke={INK} strokeWidth={5} />
          <circle cx={26} cy={0} r={26} fill={SOOTY_SKIN} stroke={INK} strokeWidth={5} />
        </g>
        {new Array(40).fill(0).map((_, k) => {
          const y = ((f * (5 + (k % 4)) + random(`c${k}`) * 1900) % 1900) - 40;
          const x = random(`cx${k}`) * 1080 + Math.sin(f / 9 + k) * 30;
          const cols = [C.mustard, "#E98AA0", "#8EC3D6", C.cream];
          return <rect key={k} x={x} y={y} width={18} height={12} fill={cols[k % 4]} transform={`rotate(${f * 6 + k * 30} ${x} ${y})`} />;
        })}
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
