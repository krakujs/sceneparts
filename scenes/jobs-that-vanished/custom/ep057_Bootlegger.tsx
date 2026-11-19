import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep057 Prohibition bootlegger / rum-runner – a fedora-wearing runner in a souped-up open 1930s car, crates of
// bottles rattling in the back seat, racing a police car down a moonlit country road. Later: the moonshine still in
// the hills, smoke screen / oil slick / tacks, and the picture twist: dirt-track runner races → a modern stock car.
// visual: { mode: "chase" | "load" | "poison" | "hills" | "tricks" | "track", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, cutAt? (tricks: engine → chase, 0–1),
//           countAt? (poison, 0–1), countLabel? (poison), stampText?, stampAt? (hills),
//           answer?, answerAccent?, answerAt?, answerSize?, chip? (track) }
// Historical cartoon only: nobody is hurt, the police car just spins out. No real logos (the stock car is generic).

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const SKIN = "#EDBB92";
const SKIN_D = "#CF9670";
const CHEEK = "#E58A7A";
const SUIT = "#3E4152";
const SUIT_D = "#2C2E3B";
const STRIPE = "#5C6076";
const SHIRT = "#F4EEDF";
const TIE = "#C0392B";
const FEDORA = "#6B4A33";
const FEDORA_D = "#4E3423";
const RUNNER = "#B5452F";
const RUNNER_D = "#7E2E22";
const CHROME = "#D9D3C4";
const CHROME_D = "#9C968A";
const TIRE = "#1A1714";
const GOLDL = "#F2B544";
const WOOD = "#9C6E44";
const WOOD_D = "#6B4A2E";
const AMBER = "#C98E1E";
const BGREEN = "#3E7A4A";
const COPPER = "#C8743A";
const COPPER_D = "#8E4A22";
const COPPER_HI = "#F0A86A";
const POISON = "#7BD84A";
const COP = "#1F2230";
const COP_BLUE = "#26365E";
const SIREN = "#FF3B30";

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const popIn = (f: number, at: number, len = 8) => interpolate(f, [at, at + len], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[] }> = ({ items, f, dur, top = 330, at }) => (
  <>
    {items.map((t, i) => {
      const start = at && at[i] !== undefined ? at[i] * dur : 4 + i * Math.max(10, (dur - 16) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 0.8, fontFamily: titleFont, fontSize: 62, color: INK, background: i % 2 ? C.mustard : C.cream, border: `6px solid ${INK}`, borderRadius: 16, padding: "6px 26px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 4], [0, 1], clamp), scale: interpolate(age, [0, 9], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Limb: React.FC<{ a: P; b: P; c: P; w: number; col: string }> = ({ a, b, c, w, col }) => (
  <g>
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={INK} strokeWidth={w + 12} fill="none" strokeLinecap="round" />
    <path d={`M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
  </g>
);

const Fist: React.FC<{ p: P; r?: number; col?: string }> = ({ p, r = 24, col = SKIN }) => <circle cx={p[0]} cy={p[1]} r={r} fill={col} stroke={INK} strokeWidth={5} />;

const Wheel: React.FC<{ cx: number; cy: number; r: number; rot: number; rim?: string }> = ({ cx, cy, r, rot, rim = C.cream }) => (
  <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
    <circle r={r} fill={TIRE} stroke={INK} strokeWidth={6} />
    <circle r={r * 0.64} fill={rim} stroke={INK} strokeWidth={4} />
    {new Array(10).fill(0).map((_, k) => (
      <path key={k} d={`M ${Math.cos(rad(k * 36)) * r * 0.16} ${Math.sin(rad(k * 36)) * r * 0.16} L ${Math.cos(rad(k * 36 + 14)) * r * 0.62} ${Math.sin(rad(k * 36 + 14)) * r * 0.62}`} stroke={INK} strokeWidth={4} />
    ))}
    <circle r={r * 0.2} fill={GOLDL} stroke={INK} strokeWidth={4} />
    <path d={`M ${-r * 0.82} ${-r * 0.2} A ${r * 0.84} ${r * 0.84} 0 0 1 ${-r * 0.3} ${-r * 0.78}`} stroke="#4A4440" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// wooden crate of bottles (bottle necks poke out of the top), origin = bottom centre
const Crate: React.FC<{ x: number; y: number; w?: number; h?: number; f: number; k?: number; jiggle?: number }> = ({ x, y, w = 140, h = 92, f, k = 0, jiggle = 1 }) => {
  const jy = Math.sin(f / 1.7 + k * 1.3) * 4 * jiggle;
  const jr = Math.sin(f / 2.3 + k) * 1.6 * jiggle;
  const n = Math.max(3, Math.round(w / 34));
  return (
    <g transform={`translate(${x} ${y + jy}) rotate(${jr})`}>
      {new Array(n).fill(0).map((_, i) => {
        const bx = -w / 2 + (w / n) * (i + 0.5);
        const bj = Math.sin(f / 1.3 + i * 2 + k) * 3 * jiggle;
        const col = (i + k) % 2 ? BGREEN : AMBER;
        return (
          <g key={i} transform={`translate(${bx} ${bj})`}>
            <path d={`M -15 ${-h + 10} L -15 ${-h - 10} Q -9 ${-h - 22} -8 ${-h - 40} L 8 ${-h - 40} Q 9 ${-h - 22} 15 ${-h - 10} L 15 ${-h + 10} Z`} fill={col} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <rect x={-9} y={-h - 52} width={18} height={14} rx={3} fill="#E3C9A0" stroke={INK} strokeWidth={3} />
            <path d={`M -6 ${-h - 30} L -6 ${-h - 4}`} stroke="#FFFFFF" strokeWidth={3} opacity={0.6} strokeLinecap="round" />
          </g>
        );
      })}
      <rect x={-w / 2} y={-h} width={w} height={h} fill={WOOD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${-w / 2} ${-h * 0.66} L ${w / 2} ${-h * 0.66} M ${-w / 2} ${-h * 0.33} L ${w / 2} ${-h * 0.33}`} stroke={WOOD_D} strokeWidth={4} />
      <text x={0} y={-h * 0.4} textAnchor="middle" fontFamily={titleFont} fontSize={h * 0.28} fill={RUNNER_D}>XXX</text>
    </g>
  );
};

type Hat = "fedora" | "cop" | "helmet";
type Face = "shout" | "grin" | "smirk";

// head facing right, origin = centre (r 56 at k = 1)
const Head: React.FC<{ x: number; y: number; r?: number; hat?: Hat; face?: Face }> = ({ x, y, r = 56, hat = "fedora", face = "shout" }) => (
  <g transform={`translate(${x} ${y}) scale(${r / 56})`}>
    <path d="M -54 -10 Q -66 30 -40 50 L -28 18 Z" fill="#3A2A1C" stroke={INK} strokeWidth={4} />
    <circle r={56} fill={SKIN} stroke={INK} strokeWidth={6} />
    <ellipse cx={-16} cy={8} rx={12} ry={17} fill={SKIN_D} stroke={INK} strokeWidth={4} />
    <circle cx={30} cy={22} r={12} fill={CHEEK} opacity={0.55} />
    {[[4, 34], [14, 42], [-4, 44], [24, 46]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={2.4} fill="#7A6250" />)}
    <path d={face === "smirk" ? "M 18 -22 L 50 -20" : "M 18 -26 L 50 -14"} stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <ellipse cx={36} cy={-4} rx={7} ry={9} fill={INK} />
    <circle cx={38} cy={-7} r={2.4} fill="#FFFFFF" />
    <path d="M 48 -10 Q 76 8 52 18" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {face === "shout" ? (
      <g>
        <path d="M 16 28 Q 40 22 58 30 Q 54 60 32 58 Q 16 50 16 28 Z" fill="#5A1E1A" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 20 32 L 54 33" stroke="#FFFFFF" strokeWidth={5} />
      </g>
    ) : face === "grin" ? (
      <path d="M 14 30 Q 38 54 60 28 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    ) : (
      <path d="M 22 36 Q 42 42 56 28" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
    )}
    {hat === "fedora" ? (
      <g>
        <path d="M -62 -30 Q -70 -96 -14 -106 Q 12 -96 28 -104 Q 72 -96 64 -32 Z" fill={FEDORA} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -8 -102 Q -4 -76 -12 -54" stroke={FEDORA_D} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -64 -46 Q 0 -58 66 -48 L 65 -32 Q 0 -44 -63 -30 Z" fill={INK} />
        <path d="M -102 -26 Q -10 -50 96 -36 Q 112 -28 94 -18 Q -10 -34 -96 -12 Q -112 -18 -102 -26 Z" fill={FEDORA_D} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      </g>
    ) : hat === "cop" ? (
      <g>
        <path d="M -58 -28 Q -66 -92 0 -98 Q 66 -92 60 -28 Z" fill={COP_BLUE} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -60 -40 L 60 -40" stroke={INK} strokeWidth={12} />
        <path d="M 16 -34 Q 70 -40 96 -16 Q 60 -20 16 -24 Z" fill={INK} />
        <circle cx={20} cy={-66} r={12} fill={GOLDL} stroke={INK} strokeWidth={4} />
      </g>
    ) : (
      <g>
        <path d="M -60 -2 Q -68 -84 0 -88 Q 64 -84 62 -16 Q 10 -34 -60 -2 Z" fill="#7A4E2E" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -60 -30 Q 0 -46 62 -30" stroke={INK} strokeWidth={10} fill="none" />
        <circle cx={34} cy={-40} r={18} fill="#BFE3EA" stroke={INK} strokeWidth={5} />
      </g>
    )}
  </g>
);

// seated driver inside the car (car-local coords, facing right): hands on the wheel
const Driver: React.FC<{ f: number; hat?: Hat; face?: Face; suit?: string }> = ({ f, hat = "fedora", face = "shout", suit = SUIT }) => {
  const bob = Math.sin(f / 2.2) * 4;
  const wx = 168;
  const wy = -350;
  return (
    <g transform={`translate(0 ${bob})`}>
      <Limb a={[50, -410]} b={[110, -330]} c={[wx - 6, wy - 28]} w={36} col={SUIT_D} />
      <Fist p={[wx - 6, wy - 28]} r={19} />
      <path d="M 0 -250 L 124 -250 Q 136 -340 112 -430 Q 66 -452 18 -432 Q -6 -340 0 -250 Z" fill={suit} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      {[30, 54, 78].map((sx) => <path key={sx} d={`M ${sx} -430 L ${sx + 4} -262`} stroke={STRIPE} strokeWidth={3} />)}
      <rect x={58} y={-466} width={34} height={38} fill={SKIN_D} stroke={INK} strokeWidth={5} />
      <path d="M 90 -440 L 122 -428 L 108 -366 Z" fill={SHIRT} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 104 -432 L 116 -430 L 122 -362 L 112 -346 L 104 -362 Z" fill={TIE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <Head x={78} y={-508} r={54} hat={hat} face={face} />
      <path d={`M ${wx} ${wy} L 214 -268`} stroke={INK} strokeWidth={10} />
      <ellipse cx={wx} cy={wy} rx={15} ry={52} transform={`rotate(-18 ${wx} ${wy})`} fill="none" stroke={INK} strokeWidth={11} />
      <Limb a={[96, -410]} b={[150, -360]} c={[wx + 6, wy + 22]} w={38} col={suit} />
      <Fist p={[wx + 6, wy + 22]} r={21} />
    </g>
  );
};

// open 1930s touring car, side view facing right. Origin = ground under the middle; ~1060 long, ~620 tall with driver.
// kind: runner (red, crates of bottles, fedora) | cop (black + POLICE door, flashing red light) | racer (number roundel, helmet)
type Kind = "runner" | "cop" | "racer";
export const Car: React.FC<{ x: number; y: number; s?: number; f: number; kind?: Kind; body?: string; crates?: boolean; driver?: boolean; number?: string; smoke?: number; beam?: boolean; spin?: number; tilt?: number; dir?: 1 | -1; face?: Face; hat?: Hat; bounce?: number }> = ({ x, y, s = 1, f, kind = "runner", body, crates, driver = true, number, smoke = 0, beam = false, spin = 14, tilt = 0, dir = 1, face = "shout", hat, bounce = 1 }) => {
  const col = body ?? (kind === "cop" ? COP : RUNNER);
  const hasCrates = crates ?? kind === "runner";
  const bob = Math.sin(f / 2) * 4 * bounce;
  const rot = f * spin;
  const flash = Math.floor(f / 4) % 2 === 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
      <ellipse cx={0} cy={6} rx={560} ry={26} fill="#000" opacity={0.25} />
      {smoke > 0
        ? new Array(9).fill(0).map((_, k) => {
            const p = ((f * 1.4 + k * 10) % 90) / 90;
            return <circle key={k} cx={-580 - p * 900 + Math.sin(k * 3) * 40} cy={-100 - p * 170 + Math.cos(k * 2) * 30} r={44 + p * 190} fill={k % 2 ? "#ECE7DC" : "#D2CCBF"} stroke={INK} strokeWidth={4} opacity={smoke * (1 - p * 0.6)} />;
          })
        : null}
      <g transform={`rotate(${tilt})`}>
        <Wheel cx={-300} cy={-95} r={95} rot={rot} rim={kind === "cop" ? CHROME : C.cream} />
        <Wheel cx={330} cy={-95} r={95} rot={rot} rim={kind === "cop" ? CHROME : C.cream} />
        <g transform={`translate(0 ${bob})`}>
          {beam ? <path d="M 470 -300 L 1600 -600 L 1600 -10 Z" fill="url(#ep057beam)" /> : null}
          <circle cx={-512} cy={-196} r={74} fill={TIRE} stroke={INK} strokeWidth={6} />
          <circle cx={-512} cy={-196} r={42} fill={C.cream} stroke={INK} strokeWidth={4} />
          {hasCrates ? (
            <>
              <Crate x={-420} y={-250} f={f} k={0} />
              <Crate x={-280} y={-252} f={f} k={1} />
              <Crate x={-140} y={-250} f={f} k={2} />
              <Crate x={-350} y={-342} f={f} k={3} />
              <Crate x={-212} y={-344} f={f} k={4} />
            </>
          ) : null}
          <path d="M -40 -268 Q -50 -366 -10 -376 Q 22 -364 16 -268 Z" fill="#5A2A1E" stroke={INK} strokeWidth={5} />
          {driver ? <Driver f={f} hat={hat ?? (kind === "cop" ? "cop" : kind === "racer" ? "helmet" : "fedora")} face={face} suit={kind === "cop" ? COP_BLUE : SUIT} /> : null}
          <path d="M -500 -118 L -500 -226 Q -496 -272 -440 -274 L 198 -274 L 206 -118 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <path d="M 198 -274 L 452 -252 Q 478 -248 478 -226 L 482 -120 L 204 -118 Z" fill={col} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          {[280, 310, 340, 370, 400].map((lx) => <path key={lx} d={`M ${lx} -236 L ${lx} -176`} stroke={INK} strokeWidth={5} opacity={0.55} strokeLinecap="round" />)}
          <path d="M 472 -254 L 506 -246 L 510 -126 L 476 -122 Z" fill={CHROME} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          {[-226, -200, -174, -148].map((gy) => <path key={gy} d={`M 478 ${gy} L 506 ${gy + 2}`} stroke={CHROME_D} strokeWidth={4} />)}
          <path d="M -500 -152 L 482 -150 L 482 -120 L -500 -118 Z" fill="#000" opacity={0.18} />
          <path d="M -494 -210 L 474 -200" stroke={kind === "cop" ? C.cream : GOLDL} strokeWidth={7} />
          <path d="M -40 -268 L -40 -128 M 186 -268 L 190 -128" stroke={INK} strokeWidth={4} opacity={0.6} />
          {kind === "cop" ? (
            <g>
              <rect x={-30} y={-262} width={208} height={104} rx={10} fill={C.cream} stroke={INK} strokeWidth={5} />
              <g transform={`translate(74 -194) scale(${dir} 1)`}>
                <text x={0} y={16} textAnchor="middle" fontFamily={titleFont} fontSize={48} fill={COP}>POLICE</text>
              </g>
            </g>
          ) : (
            <path d="M 136 -232 L 166 -232" stroke={CHROME} strokeWidth={8} strokeLinecap="round" />
          )}
          {number ? (
            <g transform={`translate(70 -196) scale(${dir} 1)`}>
              <circle r={58} fill={C.cream} stroke={INK} strokeWidth={6} />
              <text x={0} y={24} textAnchor="middle" fontFamily={titleFont} fontSize={70} fill={INK}>{number}</text>
            </g>
          ) : null}
          <path d="M 198 -274 L 172 -436 L 188 -440 L 216 -274 Z" fill={CHROME} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          {[
            "M -444 -112 Q -300 -302 -156 -112",
            "M 196 -112 Q 330 -302 476 -106 L 524 -100",
          ].map((d) => (
            <g key={d}>
              <path d={d} stroke={INK} strokeWidth={50} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} stroke={col} strokeWidth={36} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          <path d="M -160 -106 L 200 -106" stroke={INK} strokeWidth={22} strokeLinecap="round" />
          <path d="M -160 -106 L 200 -106" stroke="#4A4440" strokeWidth={12} strokeLinecap="round" />
          <rect x={502} y={-152} width={26} height={58} rx={8} fill={CHROME} stroke={INK} strokeWidth={5} />
          <rect x={-538} y={-142} width={24} height={52} rx={8} fill={CHROME} stroke={INK} strokeWidth={5} />
          <circle cx={-500} cy={-244} r={13} fill={SIREN} stroke={INK} strokeWidth={4} />
          <path d="M 420 -236 L 440 -282" stroke={INK} strokeWidth={10} />
          <circle cx={448} cy={-298} r={32} fill={CHROME} stroke={INK} strokeWidth={6} />
          <circle cx={462} cy={-298} r={20} fill={beam ? "#FFF6C8" : "#E8E2C8"} stroke={INK} strokeWidth={4} />
          {kind === "cop" ? (
            <g>
              <circle cx={180} cy={-462} r={flash ? 110 : 60} fill="url(#ep057siren)" />
              <circle cx={180} cy={-458} r={22} fill={flash ? SIREN : "#8E1E18"} stroke={INK} strokeWidth={5} />
            </g>
          ) : null}
        </g>
      </g>
    </g>
  );
};

const Shoe: React.FC<{ a: P }> = ({ a }) => (
  <g transform={`translate(${a[0]} ${a[1]})`}>
    <path d="M -34 -16 L 22 -20 Q 80 -12 82 16 L -38 16 Z" fill={C.cream} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 34 -18 Q 80 -12 82 16 L 38 16 Z" fill={WOOD_D} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

// standing bootlegger (fedora, pinstripe double-breasted suit, red tie, two-tone shoes) hugging a crate of bottles.
// Origin = feet centre, facing right, ~840 tall at s = 1.
export const Runner: React.FC<{ x: number; y: number; s?: number; f: number; face?: Face }> = ({ x, y, s = 1, f, face = "grin" }) => {
  const bob = Math.sin(f / 5) * 4;
  const lift = Math.sin(f / 6) * 6;
  const cc: P = [130, -470 + lift + bob];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={180} ry={22} fill="#000" opacity={0.28} />
      <Limb a={[-26, -380]} b={[-34, -210]} c={[-44, -40]} w={64} col={SUIT_D} />
      <Shoe a={[-44, -26]} />
      <Limb a={[30, -380]} b={[40, -210]} c={[54, -40]} w={66} col={SUIT} />
      <Shoe a={[54, -26]} />
      <g transform={`translate(0 ${bob})`}>
        <Limb a={[-40, -600]} b={[-30, -470]} c={[cc[0] - 96, cc[1] - bob + 6]} w={50} col={SUIT_D} />
        <path d="M -84 -620 Q 0 -650 88 -620 Q 104 -500 96 -360 L -90 -360 Q -100 -500 -84 -620 Z" fill={SUIT} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-58, -32, -6, 20, 46, 72].map((sx) => <path key={sx} d={`M ${sx} -620 L ${sx + 3} -366`} stroke={STRIPE} strokeWidth={3} />)}
        <path d="M 14 -628 L 84 -620 L 56 -516 Z" fill={SHIRT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 44 -622 L 60 -622 L 68 -536 L 54 -512 L 42 -536 Z" fill={TIE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 14 -628 L 48 -516 L 36 -440 M 84 -620 L 58 -516" stroke={INK} strokeWidth={5} fill="none" />
        {[[66, -470], [66, -420], [16, -470], [16, -420]].map(([bx, by], k) => <circle key={k} cx={bx} cy={by} r={7} fill={CHROME_D} stroke={INK} strokeWidth={3} />)}
        <path d="M -70 -570 L -36 -572 L -40 -552 L -66 -550 Z" fill={C.cream} stroke={INK} strokeWidth={3} />
        <rect x={-6} y={-672} width={46} height={52} fill={SKIN_D} stroke={INK} strokeWidth={5} />
        <Head x={18} y={-716} r={66} hat="fedora" face={face} />
      </g>
      <Crate x={cc[0]} y={cc[1] + 72} w={230} h={140} f={f} k={2} jiggle={0.6} />
      <Fist p={[cc[0] - 96, cc[1] + 6]} r={25} />
      <g transform={`translate(0 ${bob})`}>
        <Limb a={[56, -600]} b={[96, -500]} c={[cc[0] + 104, cc[1] - bob + 6]} w={52} col={SUIT} />
      </g>
      <Fist p={[cc[0] + 104, cc[1] + 6]} r={27} />
    </g>
  );
};

// generic modern stock car (no real logos or sponsors), side view facing right. Origin = ground centre, ~1140 long.
const StockCar: React.FC<{ x: number; y: number; s?: number; f: number; num?: string }> = ({ x, y, s = 1, f, num = "57" }) => {
  const rot = f * 26;
  const bob = Math.sin(f / 1.5) * 2;
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={-70} r={96} fill={INK} />
      <g transform={`translate(${cx} -70) rotate(${rot})`}>
        <circle r={84} fill={TIRE} stroke={INK} strokeWidth={6} />
        <circle r={50} fill={GOLDL} stroke={INK} strokeWidth={5} />
        {[0, 72, 144, 216, 288].map((a) => <path key={a} d={`M 0 0 L ${Math.cos(rad(a)) * 46} ${Math.sin(rad(a)) * 46}`} stroke={INK} strokeWidth={9} />)}
        <circle r={14} fill={CHROME} stroke={INK} strokeWidth={4} />
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={8} rx={620} ry={26} fill="#000" opacity={0.3} />
      <g transform={`translate(0 ${bob})`}>
        <path d="M -548 -168 L -582 -240 L -462 -232 L -466 -180 Z" fill={C.mustard} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -560 -60 L -560 -172 L -460 -192 L -262 -202 Q -150 -322 40 -326 Q 150 -322 252 -234 L 470 -202 Q 556 -186 566 -118 L 570 -64 Z" fill="#C0392B" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -560 -112 L 568 -102 L 570 -64 L -560 -60 Z" fill={INK} opacity={0.85} />
        <path d="M -556 -150 L 556 -136" stroke={C.mustard} strokeWidth={18} />
        <path d="M -222 -206 Q -130 -298 36 -304 Q 132 -300 216 -226 Z" fill="#2A3A52" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        {[-120, -60, 0, 60, 120].map((nx) => <path key={nx} d={`M ${nx - 40} -212 L ${nx + 30} -292`} stroke="#6E8AAA" strokeWidth={3} opacity={0.7} />)}
        <rect x={250} y={-186} width={96} height={30} rx={6} fill={C.teal} stroke={INK} strokeWidth={4} />
        <rect x={360} y={-178} width={70} height={26} rx={6} fill={C.cream} stroke={INK} strokeWidth={4} />
        <rect x={-430} y={-196} width={120} height={34} rx={6} fill={C.cream} stroke={INK} strokeWidth={4} />
        <path d="M 474 -182 L 544 -168 L 540 -146 L 478 -156 Z" fill="#FFF6C8" stroke={INK} strokeWidth={4} />
        <path d="M 520 -64 L 610 -60 L 610 -48 L 520 -50 Z" fill={INK} />
        <ellipse cx={-10} cy={-150} rx={104} ry={76} fill={C.cream} stroke={INK} strokeWidth={6} />
        <text x={-10} y={-108} textAnchor="middle" fontFamily={titleFont} fontSize={112} fill={INK}>{num}</text>
      </g>
      {wheel(-340)}
      {wheel(370)}
    </g>
  );
};

const Skull: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = C.cream }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -62 38 L 62 72 M 62 38 L -62 72" stroke={INK} strokeWidth={20} strokeLinecap="round" />
    <path d="M -62 38 L 62 72 M 62 38 L -62 72" stroke={col} strokeWidth={10} strokeLinecap="round" />
    <path d="M -40 10 Q -54 -52 0 -58 Q 54 -52 40 10 L 26 14 L 26 32 L -26 32 L -26 14 Z" fill={col} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={-17} cy={-14} r={12} fill={INK} />
    <circle cx={17} cy={-14} r={12} fill={INK} />
    <path d="M 0 0 L -7 11 L 7 11 Z" fill={INK} />
    <path d="M -12 32 L -12 21 M 0 32 L 0 21 M 12 32 L 12 21" stroke={INK} strokeWidth={4} />
  </g>
);

// big bootleg bottle with a skull label and green fumes, origin = bottom centre (~520 tall)
const Bottle: React.FC<{ x: number; y: number; s?: number; f: number; rot?: number }> = ({ x, y, s = 1, f, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2, 3].map((k) => {
      const p = ((f + k * 12) % 48) / 48;
      return <circle key={k} cx={Math.sin(p * 7 + k) * 40} cy={-540 - p * 300} r={22 + p * 50} fill={POISON} opacity={0.5 * (1 - p)} stroke={INK} strokeWidth={3} />;
    })}
    <circle cx={0} cy={-220} r={260} fill="url(#ep057green)" opacity={0.6 + 0.2 * Math.sin(f / 4)} />
    <path d="M -110 0 L -110 -300 Q -110 -362 -42 -392 L -42 -500 L 42 -500 L 42 -392 Q 110 -362 110 -300 L 110 0 Z" fill={BGREEN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -80 -40 L -80 -300" stroke="#9FD4A6" strokeWidth={14} strokeLinecap="round" opacity={0.6} />
    <rect x={-36} y={-536} width={72} height={44} rx={6} fill="#C9A27A" stroke={INK} strokeWidth={5} />
    <rect x={-92} y={-270} width={184} height={190} rx={12} fill={C.cream} stroke={INK} strokeWidth={6} />
    <Skull x={0} y={-196} s={0.95} />
  </g>
);

// steel drum of industrial alcohol, origin = bottom centre (~560 tall)
const Drum: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -190 0 L -190 -520 L 190 -520 L 190 0 Q 0 34 -190 0 Z" fill="#4E7A8C" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 -500 L -150 -20" stroke="#78A4B6" strokeWidth={16} strokeLinecap="round" opacity={0.7} />
    <path d="M -190 -370 Q 0 -340 190 -370 M -190 -150 Q 0 -120 190 -150" stroke={INK} strokeWidth={7} fill="none" />
    <ellipse cx={0} cy={-520} rx={190} ry={42} fill="#3E6474" stroke={INK} strokeWidth={7} />
    <ellipse cx={70} cy={-524} rx={30} ry={10} fill="#1E2E36" stroke={INK} strokeWidth={4} />
    <rect x={-160} y={-330} width={320} height={150} rx={10} fill={C.cream} stroke={INK} strokeWidth={6} />
    <text x={0} y={-268} textAnchor="middle" fontFamily={titleFont} fontSize={46} fill={INK}>INDUSTRIAL</text>
    <text x={0} y={-206} textAnchor="middle" fontFamily={titleFont} fontSize={56} fill={C.brick}>ALCOHOL</text>
  </g>
);

// tipped can of poison pouring a green stream to (tx, ty)
const PoisonCan: React.FC<{ x: number; y: number; tx: number; ty: number; f: number; p: number }> = ({ x, y, tx, ty, f, p }) => {
  const wob = Math.sin(f / 2) * 8;
  const ang = lerp(0, 52, Math.min(1, p * 3));
  const sx = x + 120 * Math.cos(rad(ang)) + 160 * Math.sin(rad(ang));
  const sy = y + 120 * Math.sin(rad(ang)) - 160 * Math.cos(rad(ang));
  const sp = interpolate(p, [0.3, 0.6], [0, 1], clamp);
  const ey = lerp(sy, ty, sp);
  return (
    <g>
      {sp > 0 ? (
        <>
          <path d={`M ${sx} ${sy} Q ${sx + 40 + wob} ${sy + 10} ${tx + wob * 0.5} ${ey}`} stroke={INK} strokeWidth={34} fill="none" strokeLinecap="round" />
          <path d={`M ${sx} ${sy} Q ${sx + 40 + wob} ${sy + 10} ${tx + wob * 0.5} ${ey}`} stroke={POISON} strokeWidth={22} fill="none" strokeLinecap="round" />
        </>
      ) : null}
      <g transform={`translate(${x} ${y}) rotate(${ang})`}>
        <rect x={-110} y={-130} width={220} height={260} rx={16} fill="#C9C2B4" stroke={INK} strokeWidth={7} />
        <path d="M 60 -130 L 110 -170 L 130 -150 L 100 -110" fill="#9C968A" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-90} y={-70} width={180} height={150} rx={10} fill={C.mustard} stroke={INK} strokeWidth={5} />
        <Skull x={0} y={-6} s={0.7} />
        <text x={0} y={76} textAnchor="middle" fontFamily={titleFont} fontSize={30} fill={INK}>METHANOL</text>
      </g>
    </g>
  );
};

const Jar: React.FC<{ x: number; y: number; s?: number; fill?: number }> = ({ x, y, s = 1, fill = 0.75 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-52} y={-150} width={104} height={150} rx={18} fill="#DCEFF2" stroke={INK} strokeWidth={6} />
    <rect x={-44} y={-144 + 144 * (1 - fill)} width={88} height={138 * fill} rx={12} fill="#F7EDC6" />
    <path d="M -32 -130 L -32 -20" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
    <rect x={-46} y={-178} width={92} height={32} rx={6} fill={CHROME} stroke={INK} strokeWidth={5} />
    <text x={6} y={-52} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={RUNNER_D}>XXX</text>
  </g>
);

// copper moonshine still on a stone firebox, gooseneck to a wooden worm barrel. Origin = bottom centre of the firebox.
const Still: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 2.5);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-80} r={320 * flick} fill="url(#ep057fire)" />
      {[0, 1, 2].map((k) => {
        const p = ((f + k * 16) % 48) / 48;
        return <circle key={k} cx={Math.sin(p * 5 + k) * 30} cy={-560 - p * 260} r={30 + p * 60} fill="#F4EEDF" opacity={0.7 * (1 - p)} stroke={INK} strokeWidth={3} />;
      })}
      <path d="M -240 0 L -228 -160 L 228 -160 L 240 0 Z" fill="#6A6070" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -234 -80 L 234 -80 M -120 -160 L -120 -80 M 110 -160 L 110 -80 M -10 -80 L -10 0 M 170 -80 L 170 0 M -170 -80 L -170 0" stroke="#4A4250" strokeWidth={6} />
      <path d="M -90 0 L -90 -70 Q 0 -120 90 -70 L 90 0 Z" fill="#2A1A14" stroke={INK} strokeWidth={6} />
      {[-50, 0, 50].map((fx, k) => (
        <path key={fx} d={`M ${fx - 34} 0 Q ${fx - 30} ${-60 - 30 * Math.abs(Math.sin(f / 3 + k))} ${fx} ${-90 - 30 * Math.abs(Math.sin(f / 2.4 + k))} Q ${fx + 30} ${-50} ${fx + 34} 0 Z`} fill={k === 1 ? "#FFD27A" : "#FF8A3A"} stroke={INK} strokeWidth={4} />
      ))}
      <path d="M -220 -160 Q -262 -340 -150 -430 Q 0 -490 150 -430 Q 262 -340 220 -160 Z" fill={COPPER} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -160 -390 Q -205 -300 -180 -200" stroke={COPPER_HI} strokeWidth={20} strokeLinecap="round" fill="none" />
      {new Array(9).fill(0).map((_, k) => <circle key={k} cx={-200 + k * 50} cy={-300 + Math.abs(k - 4) * 6} r={6} fill={COPPER_D} />)}
      <path d="M -72 -462 Q -62 -552 0 -560 Q 62 -552 72 -462 Z" fill={COPPER} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 -556 Q 50 -660 220 -610 L 430 -470" stroke={INK} strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M 0 -556 Q 50 -660 220 -610 L 430 -470" stroke={COPPER} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M 360 0 L 348 -400 Q 470 -430 592 -400 L 580 0 Z" fill={WOOD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 352 -320 Q 470 -340 588 -320 M 356 -90 Q 470 -110 584 -90" stroke={INK} strokeWidth={9} fill="none" />
      <path d="M 572 -120 L 650 -120 L 650 -84" stroke={INK} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 572 -120 L 650 -120 L 650 -84" stroke={COPPER} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={650} cy={-64 + ((f * 3) % 30)} rx={7} ry={11} fill="#F7EDC6" stroke={INK} strokeWidth={3} />
    </g>
  );
};

// a souped-up V8, front view, shaking with revs; origin = bottom centre
const Engine: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const shake = Math.sin(f * 1.9) * 4;
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s})`}>
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M ${d * 200} -60 Q ${d * 300} -40 ${d * 330} 60`} stroke={INK} strokeWidth={46} fill="none" strokeLinecap="round" />
          <path d={`M ${d * 200} -60 Q ${d * 300} -40 ${d * 330} 60`} stroke={CHROME_D} strokeWidth={32} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M -230 0 L -250 -220 L 250 -220 L 230 0 Z" fill="#5A6070" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M ${d * 250} -220 L ${d * 400} -470 L ${d * 230} -540 L ${d * 60} -250 Z`} fill="#6E7688" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d={`M ${d * 392} -490 L ${d * 236} -556 L ${d * 214} -516 L ${d * 370} -452 Z`} fill={RUNNER} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M ${d * (330 - k * 40)} ${-420 + k * 60} Q ${d * (420 - k * 30)} ${-360 + k * 40} ${d * 300} ${-160 + k * 10}`} stroke={[C.mustard, C.teal, C.cream, C.brick][k]} strokeWidth={7} fill="none" />
          ))}
        </g>
      ))}
      <path d="M -160 -330 L -160 -410 A 160 56 0 0 1 160 -410 L 160 -330 A 160 56 0 0 1 -160 -330 Z" fill={CHROME} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={0} cy={-410} rx={160} ry={56} fill="#EDE8DC" stroke={INK} strokeWidth={6} />
      <text x={0} y={-340} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill={RUNNER}>V8</text>
      <g transform={`translate(0 -110) rotate(${f * 40})`}>
        <circle r={96} fill="#4A4E5E" stroke={INK} strokeWidth={6} />
        {[0, 90, 180, 270].map((a) => <ellipse key={a} cx={Math.cos(rad(a)) * 52} cy={Math.sin(rad(a)) * 52} rx={44} ry={18} transform={`rotate(${a} ${Math.cos(rad(a)) * 52} ${Math.sin(rad(a)) * 52})`} fill={GOLDL} stroke={INK} strokeWidth={4} />)}
        <circle r={20} fill={CHROME} stroke={INK} strokeWidth={4} />
      </g>
    </g>
  );
};

const Burst: React.FC<{ x: number; y: number; s?: number; col?: string; f: number }> = ({ x, y, s = 1, col = "#FFE08A", f }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${f * 2})`}>
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${Math.cos(rad(k * 30)) * 40} ${Math.sin(rad(k * 30)) * 40} L ${Math.cos(rad(k * 30)) * 120} ${Math.sin(rad(k * 30)) * 120}`} stroke={col} strokeWidth={10} strokeLinecap="round" />
    ))}
    <circle r={26} fill="#FFFFFF" />
  </g>
);

const Bang: React.FC<{ x: number; y: number; text: string; p: number; f: number; rot?: number; size?: number }> = ({ x, y, text, p, f, rot = -10, size = 120 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <Burst x={0} y={-30} s={1.5} f={f} />
      <text x={0} y={20} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={C.mustard} stroke={INK} strokeWidth={12} paintOrder="stroke" strokeLinejoin="round">{text}</text>
    </g>
  ) : null;

// red ink stamp, origin = centre
const Stamp: React.FC<{ x: number; y: number; text: string; p: number }> = ({ x, y, text, p }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(-8) scale(${lerp(2.2, 1, Math.min(1, p))})`} opacity={Math.min(1, p * 1.6)}>
      <rect x={-380} y={-100} width={760} height={200} rx={20} fill="#FFF3E0" opacity={0.9} stroke={C.brick} strokeWidth={16} />
      <rect x={-356} y={-78} width={712} height={156} rx={12} fill="none" stroke={C.brick} strokeWidth={5} />
      <text x={0} y={42} textAnchor="middle" fontFamily={titleFont} fontSize={112} fill={C.brick} textLength={640} lengthAdjust="spacingAndGlyphs">{text}</text>
    </g>
  ) : null;

const Chip: React.FC<{ x: number; y: number; text: string; p: number; w?: number; size?: number; bg?: string; rot?: number }> = ({ x, y, text, p, w = 640, size = 50, bg = C.cream, rot = -2 }) =>
  p > 0 ? (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <rect x={-w / 2} y={-50} width={w} height={100} rx={18} fill={bg} stroke={INK} strokeWidth={7} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>{text}</text>
    </g>
  ) : null;

// ---------- scenery ----------
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep057night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1C1C4E" />
      <stop offset="55%" stopColor="#4A2F70" />
      <stop offset="85%" stopColor="#B8507A" />
      <stop offset="100%" stopColor="#F2965A" />
    </linearGradient>
    <linearGradient id="ep057sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3B3F8E" />
      <stop offset="50%" stopColor="#E2766A" />
      <stop offset="100%" stopColor="#F9C46B" />
    </linearGradient>
    <linearGradient id="ep057day" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3E8EDB" />
      <stop offset="70%" stopColor="#9ED3F2" />
      <stop offset="100%" stopColor="#FCE3B0" />
    </linearGradient>
    <linearGradient id="ep057beam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#FFF2B0" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#FFF2B0" stopOpacity={0} />
    </linearGradient>
    <radialGradient id="ep057glow">
      <stop offset="0%" stopColor="#FFE7A0" stopOpacity={0.85} />
      <stop offset="100%" stopColor="#FFE7A0" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep057siren">
      <stop offset="0%" stopColor="#FF3B30" stopOpacity={0.85} />
      <stop offset="100%" stopColor="#FF3B30" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep057fire">
      <stop offset="0%" stopColor="#FFB347" stopOpacity={0.9} />
      <stop offset="100%" stopColor="#FFB347" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="ep057green">
      <stop offset="0%" stopColor={POISON} stopOpacity={0.7} />
      <stop offset="100%" stopColor={POISON} stopOpacity={0} />
    </radialGradient>
  </defs>
);

const NightSky: React.FC<{ h: number; moon?: P; moonR?: number }> = ({ h, moon = [820, 560], moonR = 110 }) => (
  <g>
    <rect x={0} y={0} width={1080} height={h} fill="url(#ep057night)" />
    {new Array(46).fill(0).map((_, i) => <circle key={i} cx={random(`s${i}`) * 1080} cy={random(`sy${i}`) * h * 0.6} r={2 + random(`sr${i}`) * 2.5} fill="#FFF4DC" opacity={0.75} />)}
    <circle cx={moon[0]} cy={moon[1]} r={moonR * 2.6} fill="url(#ep057glow)" opacity={0.75} />
    <circle cx={moon[0]} cy={moon[1]} r={moonR} fill="#FFF1C4" stroke="#F2D58A" strokeWidth={6} />
    <circle cx={moon[0] - moonR * 0.3} cy={moon[1] - moonR * 0.2} r={moonR * 0.17} fill="#F1DFA8" />
    <circle cx={moon[0] + moonR * 0.3} cy={moon[1] + moonR * 0.25} r={moonR * 0.12} fill="#F1DFA8" />
  </g>
);

const Ridge: React.FC<{ base: number; amp: number; col: string; seed: number; off?: number; depth?: number }> = ({ base, amp, col, seed, off = 0, depth = 900 }) => {
  const pts: string[] = [];
  for (let x = -40; x <= 1120; x += 40) {
    const wx = x + off;
    const yy = base - amp * (0.55 + 0.3 * Math.sin(wx / 170 + seed) + 0.15 * Math.sin(wx / 63 + seed * 2));
    pts.push(`${x} ${yy.toFixed(1)}`);
  }
  return <path d={`M -40 ${base + depth} L ${pts.join(" L ")} L 1120 ${base + depth} Z`} fill={col} />;
};

const Pines: React.FC<{ base: number; f: number; speed: number; col: string; h?: number; seed: string; n?: number }> = ({ base, f, speed, col, h = 220, seed, n = 10 }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const span = 1500;
      const x = (((k * (span / n) + random(`${seed}${k}`) * 60 - f * speed) % span) + span) % span - 200;
      const hh = h * (0.7 + random(`${seed}h${k}`) * 0.5);
      return <path key={k} d={`M ${x} ${base - hh} L ${x + hh * 0.22} ${base - hh * 0.55} L ${x + hh * 0.12} ${base - hh * 0.55} L ${x + hh * 0.32} ${base} L ${x - hh * 0.32} ${base} L ${x - hh * 0.12} ${base - hh * 0.55} L ${x - hh * 0.22} ${base - hh * 0.55} Z`} fill={col} />;
    })}
  </g>
);

const SpeedLines: React.FC<{ f: number; y0: number; y1: number; n?: number; speed?: number; col?: string }> = ({ f, y0, y1, n = 9, speed = 60, col = "#FFF4DC" }) => (
  <g>
    {new Array(n).fill(0).map((_, k) => {
      const len = 160 + random(`sl${k}`) * 200;
      const x = 1300 - (((f * speed + random(`slx${k}`) * 1400) % 1600));
      const y = y0 + random(`sly${k}`) * (y1 - y0);
      return <path key={k} d={`M ${x} ${y} L ${x + len} ${y}`} stroke={col} strokeWidth={6} strokeLinecap="round" opacity={0.55} />;
    })}
  </g>
);

const Dust: React.FC<{ x: number; y: number; f: number; s?: number; col?: string }> = ({ x, y, f, s = 1, col = "#C9A27A" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {new Array(7).fill(0).map((_, k) => {
      const p = ((f * 1.5 + k * 9) % 60) / 60;
      return <circle key={k} cx={-p * 520 - k * 10} cy={-30 - p * 110 + Math.sin(k * 2) * 20} r={36 + p * 110} fill={col} opacity={0.75 * (1 - p)} />;
    })}
  </g>
);

export const Bootlegger: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "chase";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let sky: "night" | "dawn" | "day" = "night";

  if (mode === "chase") {
    // frame 0: the runner's red open car fills the frame, crates of bottles rattling, a police car on the hill road behind
    const off = f * 26;
    body = (
      <>
        <NightSky h={1500} moon={[830, 650]} moonR={118} />
        <Ridge base={1130} amp={210} col="#3E3070" seed={1} off={off * 0.12} />
        <path d="M -60 1030 Q 260 1000 430 1050 Q 640 1120 1140 1120" stroke="#9A7A5E" strokeWidth={46} fill="none" />
        <Car x={200} y={1032} s={0.3} f={f} kind="cop" beam bounce={0.6} />
        <Ridge base={1290} amp={130} col="#2A2352" seed={4} off={off * 0.35} />
        <Pines base={1345} f={f} speed={10} col="#1C1838" h={250} seed="p1" />
        <rect x={0} y={1335} width={1080} height={585} fill="#9A7556" />
        <rect x={0} y={1328} width={1080} height={18} fill="#2E4A3A" />
        {[1470, 1760].map((ry) => <path key={ry} d={`M 0 ${ry} L 1080 ${ry}`} stroke="#7A5A42" strokeWidth={14} />)}
        {new Array(16).fill(0).map((_, k) => {
          const px = (((k * 131 - f * 44) % 1300) + 1300) % 1300 - 100;
          return <ellipse key={k} cx={px} cy={1400 + (k % 5) * 110} rx={18 + (k % 3) * 6} ry={7} fill="#7A5A42" />;
        })}
        <Dust x={150} y={1665} f={f} s={1.35} />
        <SpeedLines f={f} y0={1360} y1={1900} />
        <Car x={575} y={1665} s={1.22} f={f} kind="runner" beam spin={18} tilt={-2 + Math.sin(f / 5)} face="shout" />
        {new Array(4).fill(0).map((_, k) => {
          const px = (((k * 360 - f * 70) % 1440) + 1440) % 1440 - 180;
          return (
            <g key={k}>
              <rect x={px} y={1790} width={34} height={200} fill={WOOD_D} stroke={INK} strokeWidth={5} />
              <path d={`M ${px - 200} 1840 L ${px + 230} 1830`} stroke={WOOD} strokeWidth={14} />
            </g>
          );
        })}
      </>
    );
  } else if (mode === "load") {
    // barn at night: the bootlegger hugs a crate of bottles toward the car's back seat
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1520} fill="#9A3E2C" />
        {new Array(13).fill(0).map((_, i) => <path key={i} d={`M ${i * 90 + 30} 0 L ${i * 90 + 30} 1520`} stroke="#74291D" strokeWidth={8} />)}
        <rect x={540} y={560} width={500} height={960} fill="#2A2458" />
        {new Array(14).fill(0).map((_, i) => <circle key={i} cx={560 + random(`b${i}`) * 460} cy={600 + random(`by${i}`) * 420} r={3} fill="#FFF4DC" opacity={0.8} />)}
        <circle cx={860} cy={760} r={230} fill="url(#ep057glow)" opacity={0.7} />
        <circle cx={860} cy={760} r={84} fill="#FFF1C4" stroke="#F2D58A" strokeWidth={5} />
        <path d="M 540 1520 L 540 560 L 1040 560 L 1040 1520" stroke={WOOD_D} strokeWidth={30} fill="none" />
        <path d="M 540 560 L 1040 1040 M 1040 560 L 540 1040" stroke={WOOD_D} strokeWidth={14} opacity={0.5} />
        <g transform={`translate(190 640)`}>
          <circle r={230} fill="url(#ep057glow)" opacity={0.85 + 0.15 * Math.sin(f / 3)} />
          <path d="M 0 -120 L 0 -40" stroke={INK} strokeWidth={6} />
          <rect x={-32} y={-40} width={64} height={84} rx={8} fill="#FFE08A" stroke={INK} strokeWidth={6} />
          <path d="M -38 -40 L 0 -70 L 38 -40" fill={INK} />
        </g>
        {[[30, 1280], [190, 1280], [110, 1130]].map(([hx, hy], k) => (
          <g key={k}>
            <rect x={hx} y={hy} width={170} height={150} rx={14} fill="#E2B85A" stroke={INK} strokeWidth={6} />
            <path d={`M ${hx + 10} ${hy + 50} L ${hx + 160} ${hy + 50} M ${hx + 10} ${hy + 100} L ${hx + 160} ${hy + 100}`} stroke="#B58A3A" strokeWidth={6} />
          </g>
        ))}
        <rect x={0} y={1500} width={1080} height={420} fill="#6B4A2E" />
        {new Array(12).fill(0).map((_, i) => <path key={i} d={`M ${random(`st${i}`) * 1080} ${1540 + random(`sty${i}`) * 360} l 40 -8`} stroke="#E2B85A" strokeWidth={5} strokeLinecap="round" />)}
        <Car x={905} y={1660} s={0.82} f={f} kind="runner" driver={false} spin={0} bounce={0.2} />
        <Runner x={300} y={1760} s={1.25} f={f} face="grin" />
      </>
    );
  } else if (mode === "poison") {
    // the government's poison: methanol into industrial alcohol → a bootleg bottle with a skull → 10,000+ count
    const countAt = (v.countAt ?? 0.5) * dur;
    const pour = interpolate(f, [3, 18], [0, 1], clamp);
    const n = interpolate(f, [countAt, countAt + 22], [0, 10000], { ...clamp, easing: Easing.out(Easing.cubic) });
    const numP = popIn(f, countAt, 8);
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill="#2C5C58" />
        <circle cx={540} cy={1300} r={760} fill="url(#ep057glow)" opacity={0.35} />
        {[1010, 1170].map((sy) => (
          <g key={sy}>
            <rect x={0} y={sy} width={1080} height={18} fill={WOOD_D} />
            {new Array(9).fill(0).map((_, k) => <rect key={k} x={40 + k * 120} y={sy - 70} width={36} height={70} rx={8} fill={k % 2 ? "#1E4A3A" : "#5A3A22"} opacity={0.5} />)}
          </g>
        ))}
        <rect x={0} y={1830} width={1080} height={90} fill="#3A2A22" />
        <Drum x={330} y={1900} s={1.05} />
        <PoisonCan x={140} y={1240} tx={340} ty={1350} f={f} p={pour} />
        <Bottle x={810} y={1900} s={0.98} f={f} rot={Math.sin(f / 6) * 3} />
        {numP > 0 ? (
          <g transform={`translate(540 640) scale(${numP})`}>
            <text x={0} y={70} textAnchor="middle" fontFamily={titleFont} fontSize={220} fill={C.cream} stroke={INK} strokeWidth={16} paintOrder="stroke" strokeLinejoin="round">{`${Math.round(n).toLocaleString("en-US")}${v.countSuffix ?? ""}`}</text>
          </g>
        ) : null}
        <Chip x={540} y={790} text={v.countLabel ?? "DIED, BY ONE COUNT"} p={popIn(f, countAt + 10, 8)} w={640} size={54} bg={C.mustard} />
      </>
    );
  } else if (mode === "hills") {
    // repeal stamp over the moonlit hills; a copper still keeps cooking, a runner's car snakes down the mountain road
    sky = "night";
    const stampP = popIn(f, (v.stampAt ?? 0.04) * dur, 7);
    const cx = lerp(1000, 330, f / dur);
    const cy = cx > 640 ? 1060 + (1120 - cx) * 0.19 : 1150 + (640 - cx) * 0.176;
    body = (
      <>
        <NightSky h={1300} moon={[800, 600]} moonR={100} />
        <Ridge base={1010} amp={260} col="#4A3A7A" seed={2} />
        <Ridge base={1160} amp={190} col="#3A2E66" seed={5} />
        <path d="M 1120 1060 Q 760 1080 640 1150 Q 520 1220 300 1210 Q 100 1200 -40 1260" stroke="#C9A27A" strokeWidth={30} fill="none" />
        <Car x={cx} y={cy + 6} s={0.2} f={f} kind="runner" dir={-1} beam bounce={0.4} />
        <Ridge base={1330} amp={150} col="#2A2352" seed={8} />
        <Pines base={1430} f={0} speed={0} col="#1C1838" h={300} seed="hp" n={8} />
        <rect x={0} y={1420} width={1080} height={500} fill="#2E3A2E" />
        <Still x={320} y={1850} s={0.95} f={f} />
        <Jar x={760} y={1890} s={0.85} />
        <Jar x={880} y={1870} s={1.0} />
        <Jar x={1000} y={1895} s={0.9} fill={0.5} />
      </>
    );
    overlay = <Stamp x={540} y={v.stampY ?? 860} text={v.stampText ?? "REPEALED 1933"} p={stampP} />;
  } else if (mode === "tricks") {
    // V8 close-up → the chase from the side: smoke screen, oil slick, tacks – the police car spins out (nobody hurt)
    const cut = (v.cutAt ?? 0.3) * dur;
    if (f < cut) {
      sky = "dawn";
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="#D98A3A" />
          <circle cx={540} cy={1300} r={700} fill="url(#ep057glow)" opacity={0.8} />
          {new Array(8).fill(0).map((_, r) => new Array(10).fill(0).map((__, c) => <circle key={`${r}-${c}`} cx={70 + c * 106} cy={760 + r * 80} r={7} fill="#A8642A" />))}
          <path d="M 120 860 L 260 860 L 260 900 L 120 900 Z M 800 900 L 960 900 L 960 930 L 800 930 Z" fill={INK} opacity={0.5} />
          <rect x={0} y={1600} width={1080} height={320} fill="#5A3A22" />
          <Engine x={540} y={1780} s={1.18} f={f} />
          {new Array(6).fill(0).map((_, k) => {
            const p = ((f * 2 + k * 9) % 30) / 30;
            return <circle key={k} cx={540 + Math.cos(k * 1.1) * (200 + p * 300)} cy={1300 - p * 200 + Math.sin(k) * 80} r={8 * (1 - p)} fill="#FFE08A" />;
          })}
          <Bang x={540} y={630} text="VROOM!" p={popIn(f, 2, 7)} f={f} size={130} rot={-6} />
        </>
      );
    } else {
      const fa: number[] = v.floatAt ?? [0.36, 0.58, 0.8];
      const oilAt = (fa[1] ?? 0.58) * dur;
      const tackAt = (fa[2] ?? 0.8) * dur;
      const smokeP = interpolate(f, [cut + 1, cut + 8], [0, 0.8], clamp) * interpolate(f, [tackAt, tackAt + 8], [1, 0.45], clamp);
      const oilP = interpolate(f, [oilAt, oilAt + 8], [0, 1], clamp);
      const tackP = interpolate(f, [tackAt, tackAt + 6], [0, 1], clamp);
      const spinP = interpolate(f, [tackAt + 4, tackAt + 20], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
      const off = f * 30;
      body = (
        <>
          <NightSky h={1450} moon={[190, 560]} moonR={90} />
          <Ridge base={1180} amp={180} col="#3A2E66" seed={3} off={off * 0.2} />
          <Pines base={1300} f={f} speed={12} col="#1C1838" h={240} seed="tp" />
          <rect x={0} y={1290} width={1080} height={630} fill="#9A7556" />
          <rect x={0} y={1284} width={1080} height={16} fill="#2E4A3A" />
          {oilP > 0 ? (
            <g>
              <ellipse cx={330} cy={1730} rx={300 * oilP} ry={56 * oilP} fill="#15121A" stroke={INK} strokeWidth={4} />
              <ellipse cx={300} cy={1722} rx={130 * oilP} ry={16 * oilP} fill="#6A4E9A" opacity={0.6} />
            </g>
          ) : null}
          {new Array(16).fill(0).map((_, k) => {
            if (k / 16 >= tackP) return null;
            const tx = 380 + random(`tk${k}`) * 260;
            const ty = 1640 + random(`tky${k}`) * 160;
            return <path key={k} d={`M ${tx} ${ty - 22} L ${tx + 14} ${ty} L ${tx - 14} ${ty} Z`} fill={CHROME} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
          })}
          <SpeedLines f={f} y0={1320} y1={1880} />
          <Car x={150 - spinP * 50} y={1770} s={0.55} f={f} kind="cop" beam spin={16 * (1 - spinP * 0.8)} tilt={-spinP * 16 + Math.sin(f / 1.4) * spinP * 5} />
          <Car x={790} y={1700} s={0.7} f={f} kind="runner" smoke={smokeP} spin={20} face="grin" />
          <Bang x={250} y={1340} text="POP!" p={popIn(f, tackAt + 4, 7)} f={f} size={110} />
        </>
      );
    }
  } else if (mode === "track") {
    // 1940s dirt track: two runners' cars racing each other → flash → a modern stock car on a banked track
    const answerAt = (v.answerAt ?? 0.62) * dur;
    if (f >= answerAt && v.answer) headline = undefined;
    if (f < answerAt) {
      sky = "dawn";
      const crowd = new Array(3).fill(0).map((_, r) =>
        new Array(20).fill(0).map((__, c) => {
          const hx = c * 56 + (r % 2) * 28 - 10;
          const hy = 1060 + r * 50 - Math.abs(Math.sin(f / 4 + c + r)) * 8;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={hx} cy={hy} r={20} fill={["#EDBB92", "#B98260", "#E8B990", "#8A5A3A"][(c + r) % 4]} stroke={INK} strokeWidth={3} />
              {(c + r) % 3 === 0 ? <path d={`M ${hx - 26} ${hy - 12} L ${hx + 26} ${hy - 12} L ${hx + 16} ${hy - 32} L ${hx - 16} ${hy - 32} Z`} fill={["#6B4A33", "#3E4152", "#C9A27A"][c % 3]} stroke={INK} strokeWidth={3} /> : null}
            </g>
          );
        }),
      );
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1300} fill="url(#ep057sunset)" />
          <circle cx={820} cy={980} r={330} fill="url(#ep057glow)" />
          <circle cx={820} cy={980} r={120} fill="#FFE08A" stroke="#F2B544" strokeWidth={6} />
          <rect x={0} y={1040} width={1080} height={200} fill="#5A4A6A" />
          {crowd}
          <rect x={0} y={1200} width={1080} height={80} fill="#7A5A42" />
          {new Array(13).fill(0).map((_, k) => <rect key={k} x={k * 90 - 10} y={1180} width={20} height={110} fill={C.cream} stroke={INK} strokeWidth={4} />)}
          {[1196, 1240].map((ry) => <rect key={ry} x={0} y={ry} width={1080} height={16} fill={C.cream} stroke={INK} strokeWidth={4} />)}
          <rect x={0} y={1290} width={1080} height={630} fill="#C27A44" />
          {[1420, 1600, 1840].map((ry, k) => <path key={ry} d={`M -40 ${ry} Q 540 ${ry - 60 + k * 10} 1120 ${ry}`} stroke="#A5602F" strokeWidth={10} fill="none" />)}
          <Dust x={260} y={1600} f={f} s={1.3} col="#D9A070" />
          <Car x={430 + Math.sin(f / 8) * 20} y={1600} s={0.6} f={f} kind="racer" number="7" body={C.teal} tilt={-4} spin={22} face="grin" />
          <Dust x={420} y={1830} f={f} s={1.2} col="#D9A070" />
          <Car x={700 + Math.cos(f / 9) * 20} y={1830} s={0.68} f={f} kind="racer" number="11" body={RUNNER} tilt={-3} spin={22} face="shout" />
        </>
      );
    } else {
      sky = "day";
      const lf = f - answerAt;
      const flash = interpolate(lf, [0, 7], [1, 0], clamp);
      const chipP = popIn(lf, 8, 8);
      const flagWave = (t: number) => Math.sin(f / 3 + t * 4) * 14 * t;
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#ep057day)" />
          <path d="M -40 1180 L 1120 1060 L 1120 600 L -40 760 Z" fill="#5A6070" stroke={INK} strokeWidth={8} />
          {new Array(9).fill(0).map((_, r) =>
            new Array(24).fill(0).map((__, c) => {
              const cx = c * 48 - 10 + (r % 2) * 24;
              const cy = 790 + r * 44 - cx * 0.135 + Math.abs(Math.sin(f / 3 + c * 0.7 + r)) * -6;
              return <circle key={`${r}-${c}`} cx={cx} cy={cy} r={12} fill={["#C0392B", "#F4EAD5", "#2E5AAC", "#F2B544", "#2E7D7A"][(r * 7 + c) % 5]} stroke={INK} strokeWidth={2} />;
            }),
          )}
          <path d="M -40 760 L 1120 600 L 1120 560 L -40 720 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
          <path d="M -40 1180 L 1120 1060 L 1120 1150 L -40 1270 Z" fill={C.cream} stroke={INK} strokeWidth={6} />
          <path d="M -40 1236 L 1120 1116" stroke={C.brick} strokeWidth={14} />
          <path d="M -40 1270 L 1120 1150 L 1120 1920 L -40 1920 Z" fill="#5E5A66" />
          {[1520, 1880].map((ly) => <path key={ly} d={`M -40 ${ly} L 1120 ${ly - 120}`} stroke={ly === 1880 ? GOLDL : C.cream} strokeWidth={10} />)}
          <g transform="translate(850 650)">
            <path d="M 0 0 L 0 330" stroke={INK} strokeWidth={14} />
            {new Array(4).fill(0).map((_, r) =>
              new Array(5).fill(0).map((__, c) => (
                <rect key={`${r}-${c}`} x={c * 44} y={r * 40 + flagWave((c + 1) / 5)} width={44} height={40} fill={(r + c) % 2 ? "#FFFFFF" : INK} />
              )),
            )}
          </g>
          <SpeedLines f={f} y0={1300} y1={1880} col="#FFFFFF" />
          <g transform="rotate(-6 560 1720)">
            <Dust x={60} y={1720} f={f} s={1.2} col="#DCD6CC" />
            <StockCar x={560} y={1720} s={0.94} f={f} num={v.num ?? "57"} />
          </g>
          <Chip x={540} y={v.chipY ?? 560} text={v.chip ?? "FOUNDED 1948"} p={chipP} w={560} size={62} bg={C.mustard} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={flash} />
        </>
      );
    }
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
        {overlay}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "track" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.62) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 120} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 330} at={v.floatAt} />
    </Backdrop>
  );
};
