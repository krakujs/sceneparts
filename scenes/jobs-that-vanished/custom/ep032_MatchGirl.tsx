import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep032 Matchstick girl – teenage girls dipped match splints in white-phosphorus paste; the fumes rotted their jaws (phossy jaw).
// visual: { mode: "dip" | "fumes" | "bench" | "jaw" | "kitchen", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, strikeAt? (kitchen, 0–1), glowAt? (jaw, 0–1) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EDBE96";
const SKIN_D = "#CF9670";
const DRESS = "#33415C";
const DRESS_HI = "#43547A";
const APRON = "#EFE6D2";
const HAIR = "#6A3A1E";
const BRICK = "#8E4A32";
const BRICK_D = "#743A26";
const MORTAR = "#5E2E1E";
const PASTE = "#F2E6B0";
const FUME = "#D9F0A0";
const GLOW = "#B8FF9A";
const WOOD = "#7A4B2A";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
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

// sooty brick factory wall with a grimy window and a workbench
const Factory: React.FC<{ f: number; bench?: number; dark?: number }> = ({ f, bench = 1760, dark = 0 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill={BRICK} />
    {new Array(30).fill(0).map((_, r) => (
      <g key={r}>
        <path d={`M 0 ${r * 64} L 1080 ${r * 64}`} stroke={MORTAR} strokeWidth={6} />
        {new Array(7).fill(0).map((__, k) => (
          <path key={k} d={`M ${k * 170 + (r % 2) * 85} ${r * 64} l 0 64`} stroke={MORTAR} strokeWidth={6} />
        ))}
        {r % 3 === 1 ? <rect x={((r * 137) % 900) + 40} y={r * 64 + 6} width={150} height={52} fill={BRICK_D} /> : null}
      </g>
    ))}
    <g>
      <rect x={720} y={180} width={300} height={380} fill="#C9C59A" stroke={INK} strokeWidth={8} />
      <rect x={720} y={180} width={300} height={380} fill="#3A3A2A" opacity={0.25 + Math.sin(f / 20) * 0.03} />
      <path d="M 870 180 L 870 560 M 720 370 L 1020 370" stroke={INK} strokeWidth={10} />
      <path d="M 700 560 L 1040 560" stroke={INK} strokeWidth={14} />
    </g>
    <rect x={0} y={0} width={1080} height={1920} fill="#120A06" opacity={0.25 + dark} />
    <rect x={0} y={bench} width={1080} height={1920 - bench} fill={WOOD} />
    <path d={`M 0 ${bench} L 1080 ${bench}`} stroke={INK} strokeWidth={8} />
    <path d={`M 0 ${bench + 30} L 1080 ${bench + 30}`} stroke="#5E381E" strokeWidth={6} />
  </>
);

// rising phosphorus fumes from (x, y) drifting to the right / up
const Fumes: React.FC<{ x: number; y: number; f: number; n?: number; reach?: number; o?: number }> = ({ x, y, f, n = 5, reach = 900, o = 0.5 }) => (
  <>
    {new Array(n).fill(0).map((_, k) => {
      const p = ((f * 1.4 + k * (reach / n)) % reach) / reach;
      const yy = y - p * reach;
      const xx = x + p * 320 + Math.sin(f / 9 + k) * 40;
      return (
        <path
          key={k}
          d={`M ${xx - 70} ${yy} q 35 -50 70 0 t 70 0 q 30 -40 60 -10`}
          stroke={FUME}
          strokeWidth={22 - p * 10}
          strokeLinecap="round"
          fill="none"
          opacity={o * Math.sin(p * Math.PI)}
        />
      );
    })}
  </>
);

// match splints in a dipping frame; hy = top bar y (local); coated = 0..1 white paste on the heads
const DipFrame: React.FC<{ hx: number; hy: number; coated: number }> = ({ hx, hy, coated }) => (
  <g>
    {new Array(11).fill(0).map((_, k) => {
      const sx = hx - 90 + k * 18;
      return (
        <g key={k}>
          <path d={`M ${sx} ${hy + 6} L ${sx} ${hy + 150}`} stroke="#E8C98A" strokeWidth={7} />
          <ellipse cx={sx} cy={hy + 152} rx={7} ry={11} fill={coated > 0.5 ? PASTE : "#E8C98A"} stroke={INK} strokeWidth={2.5} />
        </g>
      );
    })}
    <rect x={hx - 112} y={hy - 12} width={224} height={26} rx={6} fill={WOOD} stroke={INK} strokeWidth={5} />
    <rect x={hx - 112} y={hy + 70} width={224} height={14} rx={4} fill={WOOD} stroke={INK} strokeWidth={4} />
  </g>
);

const Arm: React.FC<{ sx: number; sy: number; hx: number; hy: number; out: number }> = ({ sx, sy, hx, hy, out }) => {
  const ex = (sx + hx) / 2 + out;
  const ey = Math.max(sy, hy) + 40;
  return (
    <g>
      <path d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke={INK} strokeWidth={70} strokeLinecap="round" />
      <path d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke={DRESS} strokeWidth={58} strokeLinecap="round" />
      <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={INK} strokeWidth={52} strokeLinecap="round" />
      <path d={`M ${ex} ${ey} L ${hx} ${hy}`} stroke={SKIN} strokeWidth={40} strokeLinecap="round" />
      <ellipse cx={ex} cy={ey} rx={34} ry={22} fill={APRON} stroke={INK} strokeWidth={5} />
      <circle cx={hx} cy={hy} r={30} fill={SKIN} stroke={INK} strokeWidth={6} />
    </g>
  );
};

// The matchgirl, waist-up, origin = belt centre. dip = 0 (frame up) .. 1 (in the pot); look = -1 left .. 1 right
// pose: "dip" (both hands on the frame) | "eat" (bread to mouth, t 0..1) | "still"
export const Girl: React.FC<{ x: number; y: number; s?: number; f: number; dip?: number; look?: number; pose?: "dip" | "eat" | "still"; t?: number; cough?: number; worried?: boolean }> = ({ x, y, s = 1, f, dip = 0, look = -0.6, pose = "dip", t = 0, cough = 0, worried = false }) => {
  const breathe = Math.sin(f / 13) * 3;
  const HX = -235;
  const hy = interpolate(dip, [0, 1], [-190, -95]);
  const px = look * 9;
  const squint = cough > 0.5;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform={`translate(0 ${breathe})`}>
        {/* body */}
        <path d="M -150 -380 Q 0 -415 150 -380 L 165 520 L -165 520 Z" fill={DRESS} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M 0 -395 L 0 520" stroke={DRESS_HI} strokeWidth={10} />
        {/* apron bib */}
        <path d="M -95 -300 L 95 -300 L 120 520 L -120 520 Z" fill={APRON} stroke={INK} strokeWidth={6} />
        <path d="M -95 -300 L -140 -385 M 95 -300 L 140 -385" stroke={APRON} strokeWidth={18} />
        <path d="M -95 -300 Q 0 -260 95 -300" stroke="#D3C6A8" strokeWidth={5} fill="none" />
        {[-40, 60, 160].map((k) => (
          <ellipse key={k} cx={-30 + (k % 7)} cy={k} rx={26} ry={12} fill="#C9B98E" opacity={0.6} />
        ))}
        {/* neck + kerchief */}
        <rect x={-32} y={-450} width={64} height={70} fill={SKIN_D} stroke={INK} strokeWidth={6} />
        <path d="M -70 -395 Q 0 -350 70 -395 L 40 -360 Q 0 -340 -40 -360 Z" fill="#B23A2E" stroke={INK} strokeWidth={5} />
        {/* head */}
        <ellipse cx={0} cy={-520} rx={95} ry={108} fill={SKIN} stroke={INK} strokeWidth={7} />
        {/* hair: bun + fringe */}
        <circle cx={70} cy={-610} r={55} fill={HAIR} stroke={INK} strokeWidth={6} />
        <path d="M -98 -515 Q -110 -650 0 -640 Q 110 -650 98 -520 Q 80 -585 20 -592 Q -40 -560 -98 -515 Z" fill={HAIR} stroke={INK} strokeWidth={6} />
        {/* eyes + brows */}
        {squint ? (
          <path d="M -58 -520 l 30 6 M 28 -514 l 30 -6" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        ) : (
          <>
            <ellipse cx={-40} cy={-518} rx={17} ry={worried ? 15 : 12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <ellipse cx={40} cy={-518} rx={17} ry={worried ? 15 : 12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={-40 + px} cy={-515} r={8} fill={INK} />
            <circle cx={40 + px} cy={-515} r={8} fill={INK} />
          </>
        )}
        <path d={worried ? "M -64 -548 L -22 -560 M 64 -548 L 22 -560" : "M -62 -548 L -22 -552 M 62 -548 L 22 -552"} stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M -4 -500 q -10 26 6 30" stroke={SKIN_D} strokeWidth={5} fill="none" />
        <ellipse cx={-62} cy={-478} rx={18} ry={9} fill="#E58C7A" opacity={0.5} />
        <ellipse cx={62} cy={-478} rx={18} ry={9} fill="#E58C7A" opacity={0.5} />
        {pose === "eat" ? (
          <ellipse cx={0} cy={-450} rx={18} ry={interpolate(t, [0.6, 0.9], [6, 16], clamp)} fill="#7A2E24" stroke={INK} strokeWidth={4} />
        ) : cough > 0 ? (
          <ellipse cx={0} cy={-450} rx={20} ry={8 + cough * 12} fill="#7A2E24" stroke={INK} strokeWidth={4} />
        ) : (
          <path d={worried ? "M -22 -446 Q 0 -458 22 -446" : "M -20 -449 Q 0 -445 20 -449"} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
        {/* arms */}
        {pose === "dip" ? (
          <>
            <DipFrame hx={HX} hy={hy} coated={dip > 0.85 || f > 18 ? 1 : 0} />
            <Arm sx={-125} sy={-350} hx={HX - 95} hy={hy} out={-30} />
            <Arm sx={125} sy={-350} hx={HX + 95} hy={hy} out={40} />
          </>
        ) : pose === "eat" ? (
          <>
            <Arm sx={-125} sy={-350} hx={-150} hy={20} out={-60} />
            {(() => {
              const bx = interpolate(t, [0, 1], [200, 95]);
              const by = interpolate(t, [0, 1], [10, -385]);
              return (
                <>
                  <Arm sx={125} sy={-350} hx={bx} hy={by} out={90} />
                  <g transform={`translate(${bx - 40} ${by - 60}) rotate(-15)`}>
                    <path d="M 0 0 Q 0 -40 40 -40 Q 80 -40 80 0 L 80 70 L 0 70 Z" fill="#E1B26A" stroke={INK} strokeWidth={5} />
                    <path d="M 8 4 Q 8 -30 40 -30 Q 72 -30 72 4 L 72 64 L 8 64 Z" fill="#F6E2B4" />
                    <circle cx={30} cy={30} r={6} fill={GLOW} opacity={0.8} />
                    <circle cx={52} cy={46} r={4} fill={GLOW} opacity={0.8} />
                  </g>
                </>
              );
            })()}
          </>
        ) : (
          <>
            <Arm sx={-125} sy={-350} hx={-150} hy={20} out={-60} />
            <Arm sx={125} sy={-350} hx={150} hy={20} out={60} />
          </>
        )}
      </g>
    </g>
  );
};

// big iron pot of phosphorus paste (front drawn over the splints)
const PotBack: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g>
    <ellipse cx={x} cy={y} rx={210} ry={46} fill="#2A2522" stroke={INK} strokeWidth={8} />
    <ellipse cx={x} cy={y + 4} rx={186} ry={34} fill={PASTE} />
    {[0, 1, 2].map((k) => {
      const p = ((f + k * 9) % 27) / 27;
      return <circle key={k} cx={x - 90 + k * 80} cy={y + 4} r={6 + p * 12} fill="none" stroke="#D8C98A" strokeWidth={4} opacity={1 - p} />;
    })}
  </g>
);
const PotFront: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M ${x - 210} ${y} Q ${x - 200} ${y + 190} ${x} ${y + 200} Q ${x + 200} ${y + 190} ${x + 210} ${y} Q ${x} ${y + 60} ${x - 210} ${y} Z`} fill="#3A3330" stroke={INK} strokeWidth={8} />
    <path d={`M ${x - 150} ${y + 80} Q ${x} ${y + 120} ${x + 150} ${y + 80}`} stroke="#57504A" strokeWidth={10} fill="none" />
    <text x={x} y={y + 150} textAnchor="middle" fontFamily={typeFont} fontSize={40} fill="#C9B98E">PHOSPHORUS</text>
  </g>
);

// bright modern kitchen counter with a safety-match box; a hand strikes a match on the red strip at strikeAt (frames)
const Kitchen: React.FC<{ f: number; strike: number }> = ({ f, strike }) => {
  const sweep = interpolate(f, [strike - 12, strike], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const lit = f >= strike;
  const lift = interpolate(f, [strike, strike + 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const headX = interpolate(sweep, [0, 1], [820, 330]) + lift * 160;
  const headY = 1150 - lift * 330;
  const burst = interpolate(f, [strike, strike + 4, strike + 14], [0, 1.4, 1], clamp);
  const flick = 1 + Math.sin(f / 2.2) * 0.06;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="#EAF3F0" />
      {new Array(12).fill(0).map((_, r) =>
        new Array(6).fill(0).map((__, k) => <rect key={`${r}-${k}`} x={k * 190 - 20} y={r * 120 - 20} width={176} height={106} rx={6} fill="#DDEBE6" />),
      )}
      <rect x={60} y={120} width={340} height={300} rx={12} fill="#BFE3F2" stroke={INK} strokeWidth={7} />
      <path d="M 230 120 L 230 420" stroke={INK} strokeWidth={7} />
      <rect x={0} y={1290} width={1080} height={630} fill="#C99B6A" />
      <rect x={0} y={1290} width={1080} height={26} fill="#E2BC8C" stroke={INK} strokeWidth={6} />
      <rect x={0} y={1316} width={1080} height={604} fill="#F4F1EA" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={40 + k * 345} y={1360} width={310} height={520} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <rect x={150 + k * 345} y={1400} width={90} height={16} rx={8} fill="#9AA3A8" stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {/* the matchbox: top label face + long side with the striker strip */}
      <path d="M 200 1080 L 290 900 L 970 900 L 880 1080 Z" fill="#F7EBD0" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <text x={585} y={1010} textAnchor="middle" fontFamily={typeFont} fontSize={64} fill="#B23A2E">SAFETY MATCHES</text>
      <path d="M 880 1080 L 970 900 L 970 1050 L 880 1240 Z" fill="#D9C9A6" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <rect x={200} y={1080} width={680} height={160} fill="#E9DDBF" stroke={INK} strokeWidth={8} />
      <rect x={220} y={1104} width={640} height={112} rx={8} fill="#7A2A22" />
      {new Array(40).fill(0).map((_, k) => (
        <circle key={k} cx={235 + ((k * 53) % 620)} cy={1115 + ((k * 31) % 90)} r={4} fill="#A2463A" />
      ))}
      {/* scorch trail on the strip */}
      <rect x={lit ? 330 : headX} y={1140} width={Math.max(0, 820 - (lit ? 330 : headX))} height={22} rx={10} fill="#3A120E" opacity={sweep > 0 && !lit ? 0.6 : lit ? 0.45 : 0} />
      {/* the match + hand */}
      <g>
        <path d={`M ${headX} ${headY} L ${headX + 300} ${headY + 40}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
        <path d={`M ${headX} ${headY} L ${headX + 300} ${headY + 40}`} stroke="#F0D7A0" strokeWidth={12} strokeLinecap="round" />
        <ellipse cx={headX - 6} cy={headY - 1} rx={22} ry={17} fill={lit ? "#2A1A14" : "#B23A2E"} stroke={INK} strokeWidth={5} />
        <path d={`M ${headX + 270} ${headY + 20} L 1180 ${headY + 140}`} stroke={INK} strokeWidth={120} strokeLinecap="round" />
        <path d={`M ${headX + 270} ${headY + 20} L 1180 ${headY + 140}`} stroke="#5C8FB8" strokeWidth={106} strokeLinecap="round" />
        <circle cx={headX + 285} cy={headY + 34} r={58} fill={SKIN} stroke={INK} strokeWidth={7} />
        <path d={`M ${headX + 240} ${headY + 20} q 30 -30 60 -14`} stroke={INK} strokeWidth={6} fill="none" />
      </g>
      {lit ? (
        <g transform={`translate(${headX - 10} ${headY - 10}) scale(${burst * flick})`}>
          <circle cx={0} cy={-20} r={150} fill="#FFD27A" opacity={0.28} />
          <circle cx={0} cy={-20} r={80} fill="#FFB238" opacity={0.35} />
          <path d="M 0 -150 Q 46 -70 34 -10 Q 20 26 0 28 Q -20 26 -34 -10 Q -46 -70 0 -150 Z" fill="#FF8A1E" stroke={INK} strokeWidth={6} />
          <path d="M 0 -96 Q 22 -50 16 -12 Q 8 10 0 10 Q -8 10 -16 -12 Q -22 -50 0 -96 Z" fill="#FFE27A" />
          {f < strike + 10
            ? new Array(8).fill(0).map((_, k) => {
                const a = (k / 8) * Math.PI * 2;
                const r1 = 60 + (f - strike) * 12;
                return <path key={k} d={`M ${Math.cos(a) * r1} ${Math.sin(a) * r1} l ${Math.cos(a) * 30} ${Math.sin(a) * 30}`} stroke="#FFB238" strokeWidth={8} strokeLinecap="round" />;
              })
            : null}
        </g>
      ) : null}
    </>
  );
};

export const MatchGirl: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "dip";
  const float: string[] = v.float ?? [];
  let body: React.ReactNode = null;
  const sky: "day" | "night" = "day";

  if (mode === "dip" || mode === "fumes") {
    // frame 0: frame of splints already going down into the pot; fumes curl up past her face
    const heavy = mode === "fumes";
    const dip = 0.5 - 0.5 * Math.cos((f + 12) / 9);
    const s = 1.6;
    const gx = 640;
    const gy = 1600;
    const potX = gx + s * -235;
    const potY = gy - 40;
    const cough = heavy ? interpolate(f, [dur * 0.45, dur * 0.55, dur * 0.7], [0, 1, 0.3], clamp) : 0;
    body = (
      <>
        <Factory f={f} bench={potY + 150} dark={heavy ? 0.12 : 0} />
        <PotBack x={potX} y={potY} f={f} />
        <Girl x={gx} y={gy} s={s} f={f} dip={dip} look={-0.7} worried={heavy} cough={cough} />
        <PotFront x={potX} y={potY} />
        <Fumes x={potX - 40} y={potY - 10} f={f} n={heavy ? 9 : 5} reach={heavy ? 1000 : 820} o={heavy ? 0.75 : 0.5} />
        <defs>
          <radialGradient id="ep032vig" cx="0.55" cy="0.45" r="0.75">
            <stop offset="0.5" stopColor="#000" stopOpacity={0} />
            <stop offset="1" stopColor="#000" stopOpacity={heavy ? 0.8 : 0.55} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#ep032vig)" />
      </>
    );
  } else if (mode === "bench") {
    // lunch at the bench: bread to her mouth, phosphorus pot steaming beside her
    const t = interpolate(f, [4, Math.max(20, dur * 0.4)], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    body = (
      <>
        <Factory f={f} bench={1600} />
        <PotBack x={880} y={1560} f={f} />
        <PotFront x={880} y={1560} />
        <Fumes x={840} y={1550} f={f} n={6} reach={900} o={0.55} />
        <Girl x={470} y={1800} s={1.55} f={f} pose="eat" t={t} look={0.5} />
        {[0, 1, 2, 3].map((k) => (
          <g key={k} transform={`translate(${120 + k * 70} ${1680 - k * 6}) rotate(${k * 7 - 10})`}>
            <rect x={-40} y={-24} width={80} height={48} rx={4} fill="#E9DDBF" stroke={INK} strokeWidth={4} />
            <rect x={-40} y={10} width={80} height={10} fill="#7A2A22" />
          </g>
        ))}
      </>
    );
  } else if (mode === "jaw") {
    // dark room: her silhouette, the jaw line glowing faint green (no gore)
    const glowAt = (v.glowAt ?? 0.25) * dur;
    const g = interpolate(f, [glowAt, glowAt + 14], [0, 1], clamp) * (0.85 + Math.sin(f / 4) * 0.15);
    const s = 2.7;
    const gx = 560;
    const gy = 2320;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#0B1114" />
        <Girl x={gx} y={gy} s={s} f={f} pose="still" look={0} worried />
        <rect x={0} y={0} width={1080} height={1920} fill="#05090B" opacity={0.78} />
        <defs>
          <filter id="ep032blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g transform={`translate(${gx} ${gy}) scale(${s})`} opacity={g}>
          <path d="M -84 -470 Q -62 -418 0 -412 Q 62 -418 84 -470" stroke={GLOW} strokeWidth={22} fill="none" filter="url(#ep032blur)" />
          <path d="M -84 -470 Q -62 -418 0 -412 Q 62 -418 84 -470" stroke="#E6FFD9" strokeWidth={5} fill="none" opacity={0.8} />
        </g>
      </>
    );
  } else if (mode === "kitchen") {
    const strike = Math.round((v.strikeAt ?? 0.35) * dur);
    body = <Kitchen f={f} strike={strike} />;
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {v.headline ? <Headline key={v.headline} text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 300} />
    </Backdrop>
  );
};
