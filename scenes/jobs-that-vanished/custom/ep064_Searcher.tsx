import React from "react";
import { Easing, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Sky } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, bodyFont, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";
import { Doctor } from "./ep038_PlagueDoctor";

// ep064 Searcher of the dead – the parish's sworn "searcher", usually a poor old woman, who viewed each corpse and
// named the cause of death for London's weekly Bills of Mortality. The 1665 plague orders made searchers carry
// "a red rod or wand of three feet in length … open and evident to be seen".
// Look: the same plague-London world as ep038 (dusk street, red-cross doors, the beaked doctor in cameo) but warmer:
// lamplit plaster, timber frames. NO bodies are ever shown – the bed stays behind closed curtains.
// visual: { mode: "door" | "street" | "room" | "bribe" | "today", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[] (0–1), floatTop?, floatSide?, knockAt?: number[] (door),
//           ring?, big?, doctor? (street), lockAt?, burst? (room), coinAt?, strikeAt?, writeAt?, bubble?, bubbleAt? (bribe),
//           answer?, answerAccent?, answerAt?, answerSize?, chip? (today) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const CLOAK = "#4E4160";
const CLOAK_D = "#3A3048";
const CLOAK_HI = "#6E5E86";
const COIF = "#F6F0E2";
const APRON = "#EDE3CC";
const APRON_D = "#CFC2A4";
const SKIN = "#E9BB95";
const SKIN_D = "#C98E68";
const CHEEK = "#E8857A";
const HAIR = "#DCD8D0";
const WAND = "#D7322A";
const CROSS = "#C8231B";
const WOOD = "#7A4E2C";
const WOOD_D = "#5A361C";
const WOOD_HI = "#9A6A40";
const PLASTER = "#EED3A0";
const BEAM = "#5A3B24";
const GLOW = "#FFD983";
const COBBLE = "#A29683";
const COBBLE_D = "#8A7F6D";
const CURTAIN = "#9E3A3A";
const CURTAIN_D = "#7A2828";

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

const Burst: React.FC<{ x: number; y: number; p: number; text: string; rot?: number; size?: number; col?: string }> = ({ x, y, p, text, rot = -8, size = 84, col = C.mustard }) => {
  if (p <= 0) return null;
  const pts = new Array(24)
    .fill(0)
    .map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 150 : 205;
      return `${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 0.7}`;
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


// The searcher: a stooped old woman in a hooded plum cloak, white coif and apron, holding the red wand.
// Origin = feet centre, facing right, ~620 tall at s = 1. wand = angle in degrees from upright (90 = pointing forward).
type Hold = "wand" | "quill" | "none";
export const SearcherFig: React.FC<{ x: number; y: number; s?: number; f: number; walk?: boolean; wand?: number; hold?: Hold; lantern?: boolean; facing?: 1 | -1; look?: number; glow?: number }> = ({ x, y, s = 1, f, walk = false, wand = 22, hold = "wand", lantern = true, facing = 1, look = 0, glow = 0 }) => {
  const step = walk ? Math.sin(f / 5) : 0;
  const bob = walk ? Math.abs(Math.sin(f / 5)) * -7 : Math.sin(f / 18) * 2;
  const hx = 128;
  const hy = -300;
  const a = (wand * Math.PI) / 180;
  const L = 280;
  const bx = hx - Math.sin(a) * L * 0.28;
  const by = hy + Math.cos(a) * L * 0.28;
  const tx = hx + Math.sin(a) * L * 0.72;
  const ty = hy - Math.cos(a) * L * 0.72;
  const swing = Math.sin(f / 9) * 6;
  const armD = `M 30 -382 Q ${hx - 34} -372 ${hx} ${hy}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={20} fill="#000" opacity={0.22} />
      <ellipse cx={-34 + step * 24} cy={-10} rx={36} ry={14} fill="#2A2018" stroke={INK} strokeWidth={4} />
      <ellipse cx={44 - step * 24} cy={-10} rx={36} ry={14} fill="#2A2018" stroke={INK} strokeWidth={4} />
      <g transform={`translate(0 ${bob})`}>
        {/* back arm + lantern */}
        <path d="M -40 -380 Q -104 -300 -90 -228" stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
        <path d="M -40 -380 Q -104 -300 -90 -228" stroke={CLOAK_D} strokeWidth={44} fill="none" strokeLinecap="round" />
        <circle cx={-90} cy={-222} r={20} fill={SKIN} stroke={INK} strokeWidth={5} />
        {lantern ? (
          <g transform={`translate(-90 -206) rotate(${swing})`}>
            <circle cx={0} cy={80} r={110} fill={GLOW} opacity={0.22 + 0.05 * Math.sin(f / 4)} />
            <path d="M 0 0 L 0 34" stroke={INK} strokeWidth={5} />
            <path d="M -30 34 L 30 34 L 24 46 L -24 46 Z" fill="#3A2E24" stroke={INK} strokeWidth={4} />
            <rect x={-26} y={46} width={52} height={68} rx={6} fill={GLOW} stroke={INK} strokeWidth={5} />
            <path d={`M -9 104 Q ${Math.sin(f / 3) * 3} 66 9 104 Z`} fill="#F08A24" />
            <path d="M -32 114 L 32 114 L 22 128 L -22 128 Z" fill="#3A2E24" stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
        {/* cloak */}
        <path d={`M -64 -405 Q -120 -210 ${-150 + step * 6} -22 L ${150 - step * 6} -22 Q 112 -220 58 -405 Z`} fill={CLOAK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -30 -380 Q -62 -200 -88 -44" stroke={CLOAK_HI} strokeWidth={7} fill="none" opacity={0.7} strokeLinecap="round" />
        {/* apron */}
        <path d="M 2 -352 Q -14 -190 -22 -40 L 98 -40 Q 88 -190 54 -352 Z" fill={APRON} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 24 -300 Q 34 -180 34 -60" stroke={APRON_D} strokeWidth={5} fill="none" />
        <path d="M -24 -334 Q 30 -318 86 -334" stroke={APRON_D} strokeWidth={9} fill="none" strokeLinecap="round" />
        {/* the red wand */}
        {hold === "wand" ? (
          <g>
            {glow > 0 ? <circle cx={tx} cy={ty} r={70 * glow} fill={GLOW} opacity={0.55 * glow} /> : null}
            <path d={`M ${bx} ${by} L ${tx} ${ty}`} stroke={INK} strokeWidth={22} strokeLinecap="round" />
            <path d={`M ${bx} ${by} L ${tx} ${ty}`} stroke={WAND} strokeWidth={12} strokeLinecap="round" />
            <path d={`M ${bx - 3} ${by - 2} L ${tx - 3} ${ty - 2}`} stroke="#FF9A8A" strokeWidth={3} strokeLinecap="round" opacity={0.7} />
          </g>
        ) : null}
        {/* front arm */}
        <path d={armD} stroke={INK} strokeWidth={56} fill="none" strokeLinecap="round" />
        <path d={armD} stroke={CLOAK} strokeWidth={44} fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={22} fill={SKIN} stroke={INK} strokeWidth={5} />
        {hold === "quill" ? (
          <g transform={`translate(${hx} ${hy}) rotate(${-28 + Math.sin(f / 2) * 5})`}>
            <path d="M 0 14 L 0 -70" stroke={INK} strokeWidth={4} />
            <path d="M 0 -10 Q 20 -44 6 -90 Q -10 -50 0 -10 Z" fill="#F4F1EA" stroke={INK} strokeWidth={4} />
          </g>
        ) : null}
        {/* hood */}
        <path d="M -66 -392 Q -122 -500 -18 -578 Q 92 -618 134 -500 Q 144 -436 100 -394 Z" fill={CLOAK} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -42 -420 Q -82 -500 -12 -556" stroke={CLOAK_HI} strokeWidth={7} fill="none" opacity={0.7} strokeLinecap="round" />
        {/* coif + face */}
        <ellipse cx={66} cy={-470} rx={58} ry={68} fill={COIF} stroke={INK} strokeWidth={6} />
        <ellipse cx={74} cy={-466} rx={44} ry={54} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M 38 -508 Q 58 -498 74 -511 Q 92 -498 112 -507" stroke={HAIR} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d="M 80 -495 L 106 -489" stroke="#BDB7AC" strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={93 + look * 4} cy={-477} rx={5.5} ry={6.5} fill={INK} />
        <path d="M 82 -467 Q 93 -462 103 -467" stroke={SKIN_D} strokeWidth={3} fill="none" />
        <path d="M 106 -486 Q 140 -458 113 -443 Q 104 -443 102 -450" fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={82} cy={-449} r={11} fill={CHEEK} opacity={0.45} />
        <path d="M 88 -425 Q 98 -430 109 -427" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M 52 -462 q 8 5 15 0 M 54 -447 q 7 4 13 0 M 60 -500 q 10 -3 18 0" stroke={SKIN_D} strokeWidth={3} fill="none" />
        <circle cx={104} cy={-416} r={3.5} fill={SKIN_D} />
      </g>
    </g>
  );
};

// a plague house door: "Lord, have mercy upon us" notice + red cross (cross 0..1 = painted), planks/padlock when locked.
const PlagueDoor: React.FC<{ x: number; y: number; s?: number; cross?: number; notice?: number; planks?: number; shake?: number; crack?: number }> = ({ x, y, s = 1, cross = 1, notice = 1, planks = 0, shake = 0, crack = 0 }) => {
  const pv = Math.min(1, cross * 2);
  const ph = Math.max(0, cross * 2 - 1);
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s})`}>
      <rect x={-212} y={-902} width={424} height={902} fill="#77706A" stroke={INK} strokeWidth={8} />
      <rect x={-175} y={-862} width={350} height={862} fill={crack > 0 ? "#FFD983" : WOOD} stroke={INK} strokeWidth={7} />
      <g transform={`translate(-175 0) scale(${1 - crack * 0.12} 1)`}>
        <rect x={0} y={-862} width={350} height={862} fill={WOOD} stroke={INK} strokeWidth={6} />
        {[58, 117, 175, 233, 292].map((k) => (
          <path key={k} d={`M ${k} -852 L ${k} -10`} stroke={WOOD_D} strokeWidth={6} />
        ))}
        <path d="M 30 -840 L 30 -20" stroke={WOOD_HI} strokeWidth={6} opacity={0.6} />
        {[-770, -140].map((yy) => (
          <g key={yy}>
            <rect x={0} y={yy} width={350} height={32} fill="#3A3530" stroke={INK} strokeWidth={5} />
            {[30, 120, 230, 320].map((sx) => (
              <circle key={sx} cx={sx} cy={yy + 16} r={6} fill="#8A8278" />
            ))}
          </g>
        ))}
        <circle cx={175} cy={-330} r={14} fill="#3A3530" stroke={INK} strokeWidth={4} />
        <circle cx={175} cy={-298} r={30} fill="none" stroke={INK} strokeWidth={13} />
        <circle cx={175} cy={-298} r={30} fill="none" stroke="#5A544C" strokeWidth={7} />
        {notice > 0 ? (
          <g opacity={notice} transform="rotate(-2 175 -775)">
            <rect x={30} y={-840} width={290} height={118} fill={C.cream} stroke={INK} strokeWidth={5} />
            <text x={175} y={-790} textAnchor="middle" fontFamily={titleFont} fontSize={36} fill={CROSS} textLength={250} lengthAdjust="spacingAndGlyphs">
              LORD, HAVE MERCY
            </text>
            <text x={175} y={-742} textAnchor="middle" fontFamily={titleFont} fontSize={36} fill={CROSS}>
              UPON US
            </text>
          </g>
        ) : null}
        <path d="M 175 -690 L 175 -460" stroke={CROSS} strokeWidth={48} strokeDasharray={`${230 * pv} 400`} />
        <path d="M 85 -605 L 265 -605" stroke={CROSS} strokeWidth={48} strokeDasharray={`${180 * ph} 400`} />
        {pv >= 1 ? <path d="M 168 -460 L 168 -420 M 186 -460 L 186 -440" stroke={CROSS} strokeWidth={8} strokeLinecap="round" /> : null}
      </g>
      {planks > 0 ? (
        <g opacity={Math.min(1, planks * 2)}>
          <g transform={`translate(0 -330) rotate(${-14 * Math.min(1, planks * 1.5)}) translate(${(1 - Math.min(1, planks * 1.5)) * -500} 0)`}>
            <rect x={-230} y={-34} width={460} height={68} fill={WOOD_HI} stroke={INK} strokeWidth={6} />
            <circle cx={-190} cy={0} r={7} fill={INK} />
            <circle cx={190} cy={0} r={7} fill={INK} />
          </g>
          {planks > 0.5 ? (
            <g transform={`translate(110 -250) scale(${popIn(planks * 20, 10, 6)})`}>
              <path d="M -30 -20 L -30 -50 Q 0 -86 30 -50 L 30 -20" stroke={INK} strokeWidth={12} fill="none" />
              <rect x={-46} y={-24} width={92} height={78} rx={10} fill={C.mustard} stroke={INK} strokeWidth={6} />
              <circle cx={0} cy={12} r={9} fill={INK} />
            </g>
          ) : null}
        </g>
      ) : null}
    </g>
  );
};

const Cobbles: React.FC<{ y0: number; seed: string }> = ({ y0, seed }) => (
  <>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={COBBLE} />
    {new Array(Math.ceil((1920 - y0) / 54)).fill(0).map((_, r) =>
      new Array(11).fill(0).map((__, k) => {
        const s = 0.6 + (r * 60) / 900;
        const w = 110 * s;
        const x = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 8;
        const y = y0 + r * 60 * s * 0.9;
        return <rect key={`${r}-${k}`} x={x} y={y} width={w - 10} height={50 * s} rx={16 * s} fill={(r + k) % 3 ? COBBLE_D : "#B0A592"} stroke={INK} strokeWidth={2.5} opacity={0.9} />;
      }),
    )}
  </>
);

// a timber-framed London house front (jettied upper storey), origin = bottom-left
const House: React.FC<{ x: number; y: number; w: number; h: number; col?: string; seed: string; cross?: boolean; lit?: number[] }> = ({ x, y, w, h, col = PLASTER, seed, cross = false, lit = [] }) => {
  const g = h * 0.48;
  return (
    <g>
      <path d={`M ${x - 20} ${y - h} L ${x + w / 2} ${y - h - w * 0.45} L ${x + w + 20} ${y - h} Z`} fill={C.brickDark} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={x - 16} y={y - h} width={w + 32} height={h - g} fill={col} stroke={INK} strokeWidth={6} />
      <rect x={x} y={y - g} width={w} height={g} fill={col} stroke={INK} strokeWidth={6} />
      <rect x={x - 22} y={y - g - 16} width={w + 44} height={22} fill={BEAM} stroke={INK} strokeWidth={5} />
      {[0.0, 0.5, 1.0].map((k) => (
        <path key={k} d={`M ${x - 16 + k * (w + 32)} ${y - h} L ${x - 16 + k * (w + 32)} ${y - g - 16}`} stroke={BEAM} strokeWidth={14} />
      ))}
      <path d={`M ${x - 10} ${y - h + 10} L ${x + w * 0.45} ${y - g - 20} M ${x + w + 10} ${y - h + 10} L ${x + w * 0.55} ${y - g - 20}`} stroke={BEAM} strokeWidth={10} />
      {[0, 1].map((k) => {
        const on = lit.includes(k) || random(`${seed}w${k}`) > 0.55;
        return <rect key={k} x={x + w * (0.14 + k * 0.48)} y={y - h + (h - g) * 0.28} width={w * 0.24} height={(h - g) * 0.4} fill={on ? GLOW : "#2A2420"} stroke={INK} strokeWidth={5} />;
      })}
      <rect x={x + w * 0.3} y={y - g * 0.78} width={w * 0.4} height={g * 0.78} fill={WOOD} stroke={INK} strokeWidth={5} />
      {cross ? <path d={`M ${x + w * 0.5} ${y - g * 0.68} L ${x + w * 0.5} ${y - g * 0.38} M ${x + w * 0.39} ${y - g * 0.58} L ${x + w * 0.61} ${y - g * 0.58}`} stroke={CROSS} strokeWidth={Math.max(8, w * 0.07)} /> : null}
    </g>
  );
};

// John Graunt, haberdasher of Cornhill: periwig, black coat, white bands. Origin = chest centre bottom.
const Graunt: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const nod = Math.sin(f / 7) * 3;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -190 0 Q -180 -190 -80 -230 L 80 -230 Q 180 -190 190 0 Z" fill="#26222A" stroke={INK} strokeWidth={7} />
      <g transform={`rotate(${nod} 0 -300)`}>
        {[-1, 1].map((d) => (
          <g key={d}>
            {[0, 1, 2, 3].map((k) => (
              <circle key={k} cx={d * (78 + (k % 2) * 10)} cy={-330 + k * 46} r={40} fill="#6B4A2E" stroke={INK} strokeWidth={5} />
            ))}
          </g>
        ))}
        <ellipse cx={0} cy={-330} rx={74} ry={88} fill={SKIN} stroke={INK} strokeWidth={6} />
        <path d="M -82 -360 Q -70 -440 0 -446 Q 70 -440 82 -360 Q 40 -400 0 -398 Q -40 -400 -82 -360 Z" fill="#6B4A2E" stroke={INK} strokeWidth={5} />
        <ellipse cx={-26} cy={-334} rx={7} ry={9} fill={INK} />
        <ellipse cx={26} cy={-334} rx={7} ry={9} fill={INK} />
        <path d="M -40 -356 L -14 -352 M 40 -356 L 14 -352" stroke="#4A3220" strokeWidth={6} strokeLinecap="round" />
        <path d="M 0 -326 Q 10 -300 -2 -294" stroke={SKIN_D} strokeWidth={5} fill="none" />
        <path d="M -24 -276 Q 0 -266 24 -276" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -20 -258 Q 0 -248 20 -258" stroke="#6B4A2E" strokeWidth={6} fill="none" />
      </g>
      <path d="M -40 -238 L 40 -238 L 30 -150 L -30 -150 Z" fill={COIF} stroke={INK} strokeWidth={5} />
      <path d="M 0 -236 L 0 -152" stroke={APRON_D} strokeWidth={4} />
    </g>
  );
};

// a stack of printed bills on the desk
const BillStack: React.FC<{ x: number; y: number; n: number; seed: string }> = ({ x, y, n, seed }) => (
  <g>
    {new Array(n).fill(0).map((_, i) => (
      <g key={i} transform={`translate(${x + (random(`${seed}${i}`) - 0.5) * 18} ${y - i * 16}) rotate(${(random(`${seed}r${i}`) - 0.5) * 6})`}>
        <rect x={-110} y={-14} width={220} height={18} fill={i % 2 ? C.cream : "#E8DCC0"} stroke={INK} strokeWidth={3} />
      </g>
    ))}
    <g transform={`translate(${x} ${y - n * 16 - 70}) rotate(-4)`}>
      <rect x={-110} y={-60} width={220} height={130} fill={C.cream} stroke={INK} strokeWidth={4} />
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M -90 ${-36 + k * 22} L ${40 + (k % 2) * 30} ${-36 + k * 22}`} stroke="#8A7A62" strokeWidth={4} />
      ))}
    </g>
  </g>
);

export const Searcher64: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "door";
  const float: string[] = v.float ?? [];
  let sky: Sky = "dawn";
  let body: React.ReactNode = null;
  let overlay: React.ReactNode = null;
  let headline: string | undefined = v.headline;
  const S = 1.85;

  if (mode === "door") {
    // frame 0: the hooded searcher already rapping her red wand on a red-cross plague door
    const knocks: number[] = (v.knockAt ?? [0.02, 0.4]).map((k: number) => k * dur);
    let pull = 0;
    for (const k of knocks) {
      const d = f - k;
      if (d >= 0 && d < 7) pull = Math.max(pull, d < 3 ? d / 3 : 1 - (d - 3) / 4);
    }
    const ang = 82 - pull * 20;
    const sx = 330;
    const sy = 1800;
    const a = (ang * Math.PI) / 180;
    const tipX = sx + (128 + Math.sin(a) * 201.6) * S;
    const tipY = sy - (300 + Math.cos(a) * 201.6) * S;
    const peek = ease(f, (v.peekAt ?? 0.55) * dur, (v.peekAt ?? 0.55) * dur + 8);
    body = (
      <>
        <rect x={0} y={520} width={1080} height={1130} fill={PLASTER} />
        <rect x={0} y={500} width={1080} height={34} fill={BEAM} stroke={INK} strokeWidth={6} />
        {[30, 600].map((bx) => (
          <rect key={bx} x={bx} y={530} width={26} height={1110} fill={BEAM} />
        ))}
        <path d="M 56 1000 L 300 560 M 600 1000 L 420 560" stroke={BEAM} strokeWidth={18} />
        <rect x={160} y={572} width={250} height={160} fill={GLOW} stroke={INK} strokeWidth={7} />
        <g transform={`translate(${200 + peek * 90} 0)`} opacity={peek}>
          <circle cx={60} cy={680} r={46} fill="#E8B990" stroke={INK} strokeWidth={5} />
          <circle cx={46} cy={672} r={7} fill={INK} />
          <circle cx={76} cy={672} r={7} fill={INK} />
          <path d="M 44 704 Q 60 694 76 704" stroke={INK} strokeWidth={4} fill="none" />
        </g>
        <path d="M 285 572 L 285 732 M 160 652 L 410 652" stroke={INK} strokeWidth={8} />
        <rect x={150} y={732} width={270} height={20} fill={BEAM} stroke={INK} strokeWidth={5} />
        <PlagueDoor x={850} y={1650} s={1.0} />
        <Cobbles y0={1650} seed="dr64" />
        <SearcherFig x={sx} y={sy} s={S} f={f} wand={ang} />
        {knocks.map((k, i) => {
          const age = f - (k + 3);
          if (age < 0 || age > 12) return null;
          return (
            <g key={i} opacity={1 - age / 12}>
              {[0, 1].map((r) => (
                <circle key={r} cx={tipX} cy={tipY} r={34 + age * 9 + r * 26} fill="none" stroke={C.cream} strokeWidth={8} strokeDasharray="22 16" />
              ))}
            </g>
          );
        })}
      </>
    );
  } else if (mode === "street") {
    // she walks the dusk street with the red wand held high; people scatter; ep038's plague doctor in the distance
    const big = !!v.big;
    const s = big ? 1.95 : 1.6;
    const sx = interpolate(f, [0, dur], big ? [300, 370] : [210, 380], clamp);
    const ringP = v.ring ? popIn(f, 8, 10) : 0;
    const pulse = 1 + Math.sin(f / 5) * 0.04;
    body = (
      <>
        <House x={-60} y={1440} w={300} h={760} seed="h1" lit={[1]} />
        <House x={280} y={1440} w={280} h={700} col="#E6C08C" seed="h2" cross />
        <House x={600} y={1440} w={300} h={800} seed="h3" lit={[0]} />
        <House x={940} y={1440} w={260} h={720} col="#E6C08C" seed="h4" cross />
        <Cobbles y0={1440} seed="st64" />
        {v.doctor ? <Doctor x={interpolate(f, [0, dur], [900, 760], clamp)} y={1560} s={0.55} f={f} walk facing={-1} smoke /> : null}
        {v.ring ? (
          <>
            {[0, 1].map((k) => {
              const fx = interpolate(f, [0, dur * 0.8], [680 + k * 120, 1250 + k * 120], clamp);
              return (
                <g key={k}>
                  <Figure hat={k ? "bonnet" : "cap"} skirt={!!k} coat={k ? "#3F6F8A" : "#7A5236"} scarf={C.cream} x={fx} y={1700 + k * 70} scale={1.05} action="walk" facing="right" />
                  <path d={`M ${fx - 90} ${1440 + k * 70} l -70 0 M ${fx - 100} ${1500 + k * 70} l -90 0 M ${fx - 90} ${1560 + k * 70} l -70 0`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
                </g>
              );
            })}
            <ellipse cx={sx} cy={1820} rx={330 * (s / 1.6) * pulse * ringP} ry={86 * ringP} fill="none" stroke={WAND} strokeWidth={10} strokeDasharray="34 22" opacity={0.9} />
          </>
        ) : null}
        <SearcherFig x={sx} y={1820} s={s} f={f} walk wand={22} glow={v.ring ? 0.6 + Math.sin(f / 4) * 0.3 : 0} />
      </>
    );
  } else if (mode === "room") {
    // inside: lantern, curtained bed (no body ever shown), family in the doorway – then PLAGUE: the house is shut up
    const lockAt = (v.lockAt ?? 0.55) * dur;
    if (f < lockAt) {
      sky = "paper";
      const lift = ease(f, (v.liftAt ?? 0.15) * dur, (v.liftAt ?? 0.15) * dur + 10);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1560} fill="#E2C493" />
          {[0, 360, 1050].map((bx) => (
            <rect key={bx} x={bx} y={0} width={30} height={1560} fill={BEAM} />
          ))}
          <rect x={0} y={460} width={1080} height={28} fill={BEAM} />
          <rect x={90} y={560} width={220} height={260} fill="#1E2A47" stroke={INK} strokeWidth={8} />
          <circle cx={240} cy={630} r={34} fill="#FFF3D1" />
          <path d="M 200 560 L 200 820 M 90 690 L 310 690" stroke={INK} strokeWidth={8} />
          <rect x={440} y={900} width={190} height={660} fill="#3A2A20" stroke={INK} strokeWidth={7} />
          <Figure hat="bonnet" skirt coat="#3F6F8A" scarf={C.cream} x={540} y={1560} scale={0.85} facing="left" />
          <Figure hat="cap" coat="#7A5236" scarf={C.mustard} x={610} y={1560} scale={0.55} facing="left" />
          <rect x={0} y={1560} width={1080} height={360} fill={WOOD_HI} />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={k} d={`M 0 ${1600 + k * 60} L 1080 ${1600 + k * 60}`} stroke={WOOD} strokeWidth={5} />
          ))}
          <rect x={660} y={600} width={420} height={80} fill={CURTAIN_D} stroke={INK} strokeWidth={7} />
          <rect x={672} y={600} width={26} height={1000} fill={WOOD_D} stroke={INK} strokeWidth={5} />
          <rect x={690} y={680} width={390} height={900} fill="#2A1A16" />
          <path d={`M ${700 + lift * 110} 680 L 870 680 L 870 1580 L ${700 + lift * 120} 1580 Z`} fill={CURTAIN} stroke={INK} strokeWidth={6} />
          <path d="M 870 680 L 1080 680 L 1080 1580 L 870 1580 Z" fill={CURTAIN} stroke={INK} strokeWidth={6} />
          {[760, 820, 930, 1000].map((cx) => (
            <path key={cx} d={`M ${cx} 690 L ${cx} 1570`} stroke={CURTAIN_D} strokeWidth={8} opacity={cx < 870 ? 1 - lift * 0.5 : 1} />
          ))}
          <SearcherFig x={240} y={1800} s={1.45} f={f} wand={66 - lift * 8} />
        </>
      );
    } else {
      sky = "dawn";
      const lf = f - lockAt;
      const shake = lf < 8 ? Math.sin(lf * 2.4) * 14 * (1 - lf / 8) : 0;
      body = (
        <>
          <rect x={0} y={560} width={1080} height={1100} fill={PLASTER} />
          <rect x={0} y={540} width={1080} height={34} fill={BEAM} stroke={INK} strokeWidth={6} />
          <rect x={800} y={820} width={240} height={250} fill="#2A2420" stroke={INK} strokeWidth={8} />
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${860 + k * 110} ${960 + k * 30})`}>
              <circle r={k ? 34 : 46} fill="#E8B990" stroke={INK} strokeWidth={5} />
              <circle cx={-14} cy={-6} r={6} fill={INK} />
              <circle cx={14} cy={-6} r={6} fill={INK} />
              <path d={`M -14 ${k ? 16 : 22} Q 0 ${k ? 8 : 12} 14 ${k ? 16 : 22}`} stroke={INK} strokeWidth={4} fill="none" />
            </g>
          ))}
          {[860, 920, 980].map((bx) => (
            <path key={bx} d={`M ${bx} 820 L ${bx} 1070`} stroke="#3A3530" strokeWidth={12} />
          ))}
          <PlagueDoor x={500} y={1660} s={1.0} cross={ease(f, lockAt + 2, lockAt + 14)} notice={popIn(f, lockAt + 8, 6)} planks={ease(f, lockAt + 4, lockAt + 20)} shake={shake} />
          <Cobbles y0={1660} seed="lk64" />
          <Figure hat="cap" coat="#5A4632" scarf="#B5452F" prop="pole" x={170} y={1840} scale={1.3} facing="right" />
          <Burst x={540} y={440} p={popIn(lf, 0, 8)} text={v.burst ?? "PLAGUE!"} col="#E2483A" />
        </>
      );
    }
  }
 else if (mode === "bribe") {
    // close-up at the table: she writes PLAGUE, a family hand slides a coin over… PLAGUE is struck out, FEVER written
    sky = "paper";
    const coinAt = (v.coinAt ?? 0.12) * dur;
    const strikeAt = (v.strikeAt ?? 0.5) * dur;
    const writeAt = (v.writeAt ?? 0.64) * dur;
    const handIn = ease(f, coinAt, coinAt + 10);
    const handOut = ease(f, coinAt + 20, coinAt + 30);
    const coinX = interpolate(handIn, [0, 1], [1180, 850]);
    const strike = ease(f, strikeAt, strikeAt + 8);
    const write = ease(f, writeAt, writeAt + 14);
    const hx2 = coinX + 50 + handOut * 420;
    const sparkle = f > coinAt + 24 ? 0.5 + 0.5 * Math.sin(f / 2) : 0;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={940} fill="#C9A273" />
        <circle cx={980} cy={720} r={260} fill={GLOW} opacity={0.32} />
        <rect x={962} y={760} width={36} height={170} fill={C.cream} stroke={INK} strokeWidth={5} />
        <path d={`M 968 760 Q ${980 + Math.sin(f / 3) * 4} 690 992 760 Z`} fill="#F08A24" stroke={INK} strokeWidth={3} />
        <SearcherFig x={200} y={1712} s={2.3} f={f} hold="none" lantern={false} look={f > coinAt + 6 ? 1 : 0} />
        <rect x={-10} y={930} width={1100} height={1000} fill={WOOD_HI} stroke={INK} strokeWidth={8} />
        {[1060, 1240, 1420, 1600, 1780].map((ly) => (
          <path key={ly} d={`M 0 ${ly} L 1080 ${ly + 10}`} stroke={WOOD} strokeWidth={5} />
        ))}
        <g transform="translate(230 1150)">
          <rect x={-56} y={-150} width={112} height={150} rx={12} fill="#9A9690" stroke={INK} strokeWidth={6} />
          <path d="M 56 -120 Q 110 -110 104 -60 Q 98 -24 56 -30" stroke={INK} strokeWidth={14} fill="none" />
          <path d="M 56 -120 Q 110 -110 104 -60 Q 98 -24 56 -30" stroke="#9A9690" strokeWidth={6} fill="none" />
          <path d="M -64 -150 Q -40 -186 -10 -162 Q 14 -192 40 -164 Q 66 -176 64 -146 Z" fill={C.cream} stroke={INK} strokeWidth={5} />
          <path d="M -30 -120 L -30 -20" stroke="#C8C4BC" strokeWidth={8} strokeLinecap="round" />
        </g>
        <g transform={`translate(${coinX} 1150)`}>
          <circle r={42} fill={C.mustard} stroke={INK} strokeWidth={6} />
          <circle r={28} fill="none" stroke="#C88A1E" strokeWidth={4} />
          {sparkle > 0 ? <path d="M 40 -60 l 8 20 l 20 8 l -20 8 l -8 20 l -8 -20 l -20 -8 l 20 -8 Z" fill={C.cream} opacity={sparkle} /> : null}
        </g>
        {handIn > 0 && hx2 < 1200 ? (
          <g>
            <path d={`M 1200 1280 Q 1100 1190 ${hx2} 1150`} stroke={INK} strokeWidth={82} fill="none" strokeLinecap="round" />
            <path d={`M 1200 1280 Q 1100 1190 ${hx2} 1150`} stroke="#6B4A2E" strokeWidth={70} fill="none" strokeLinecap="round" />
            <ellipse cx={hx2 - 10} cy={1146} rx={44} ry={34} fill="#E8B990" stroke={INK} strokeWidth={6} />
          </g>
        ) : null}
        <g>
          <path d="M 500 760 L 440 735 L 510 810 Z" fill={C.cream} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
          <rect x={496} y={660} width={520} height={250} rx={34} fill={C.cream} stroke={INK} strokeWidth={8} />
          <path d="M 503 764 L 503 806" stroke={C.cream} strokeWidth={12} />
          <text x={756} y={712} textAnchor="middle" fontFamily={typeFont} fontSize={34} fill={INK}>
            CAUSE OF DEATH?
          </text>
          <text x={756} y={790} textAnchor="middle" fontFamily={titleFont} fontSize={74} fill="#8E1E14" opacity={1 - write * 0.6}>
            PLAGUE…
          </text>
          <path d={`M 560 765 L ${560 + strike * 400} 760`} stroke={INK} strokeWidth={12} strokeLinecap="round" />
          <text x={756} y={884} textAnchor="middle" fontFamily={titleFont} fontSize={86} fill={INK} transform={`translate(756 856) scale(${popIn(f, writeAt, 8)}) translate(-756 -856)`}>
            FEVER!
          </text>
        </g>
        {v.bubble ? (
          <g transform={`translate(780 470) scale(${popIn(f, (v.bubbleAt ?? 0.4) * dur, 8)})`}>
            <path d="M 180 60 L 250 130 L 120 70 Z" fill={C.cream} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <rect x={-240} y={-80} width={480} height={160} rx={36} fill={C.cream} stroke={INK} strokeWidth={8} />
            <text x={0} y={18} textAnchor="middle" fontFamily={titleFont} fontSize={50} fill={INK} textLength={410} lengthAdjust="spacingAndGlyphs">
              {v.bubble}
            </text>
          </g>
        ) : null}
      </>
    );
  } else if (mode === "today") {
    // 1662: John Graunt crunches the bills (his real 1662 title page pinned up; his Table of Casualties beside the modern chart) → flash → today's weekly death chart
    const ansF = (v.answerAt ?? 0.42) * dur;
    const title = staticFile(`ep/${ep.id}-extra/photos/graunt_title.jpg`);
    const table = staticFile(`ep/${ep.id}-extra/photos/graunt_table.jpg`);
    if (f < ansF) {
      sky = "paper";
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1260} fill="#D9BC8C" />
          {[120, 400, 680, 960].map((px) => (
            <rect key={px} x={px - 110} y={1000} width={220} height={240} fill="none" stroke="#B89A6A" strokeWidth={8} />
          ))}
          <Graunt x={360} y={1262} s={1.25} f={f} />
          <rect x={-10} y={1250} width={1100} height={700} fill={WOOD_HI} stroke={INK} strokeWidth={8} />
          <BillStack x={150} y={1250} n={6} seed="ga" />
          <BillStack x={820} y={1250} n={4} seed="gb" />
        </>
      );
      overlay = (
        <div style={{ position: "absolute", left: 672, top: 530, width: 282, height: 480, rotate: "3deg", border: `8px solid ${C.cream}`, boxShadow: "0 14px 0 rgba(0,0,0,0.35)", background: C.cream, translate: `0px ${(1 - popIn(f, 2, 10)) * -80}px` }}>
          <Img src={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.35) contrast(1.05)" }} />
          <div style={{ position: "absolute", left: 130, top: -14, width: 26, height: 26, borderRadius: 13, background: "#E2483A", border: `4px solid ${INK}` }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 484, fontFamily: typeFont, fontSize: 22, color: INK, textAlign: "center", opacity: 0.85 }}>HIS BOOK, 1662 · public domain</div>
        </div>
      );
    } else {
      headline = undefined;
      sky = "modern";
      const bars = new Array(14).fill(0).map((_, i) => {
        const g = ease(f, ansF + 3 + i * 1.2, ansF + 12 + i * 1.2);
        const h = (380 * Math.exp(-((i - 6.5) ** 2) / 9) + 24) * g;
        return { x: 170 + i * 54, h };
      });
      const line = bars.map((b) => `${b.x + 22},${1130 - b.h}`).join(" ");
      body = (
        <>
          <rect x={470} y={1196} width={140} height={60} fill="#2B2F45" stroke={INK} strokeWidth={6} />
          <rect x={360} y={1250} width={360} height={26} rx={12} fill="#2B2F45" stroke={INK} strokeWidth={6} />
          <rect x={90} y={560} width={900} height={640} rx={30} fill="#0E1426" stroke={INK} strokeWidth={10} />
          <rect x={112} y={582} width={856} height={596} rx={18} fill="#16213D" />
          <text x={300} y={662} fontFamily={bodyFont} fontWeight={900} fontSize={48} fill="#FFFFFF">
            WEEKLY DEATHS
          </text>
          {[760, 880, 1000].map((gy) => (
            <path key={gy} d={`M 150 ${gy} L 940 ${gy}`} stroke="#2E3B5E" strokeWidth={3} />
          ))}
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={1130 - b.h} width={44} height={b.h} rx={6} fill="#E2483A" />
          ))}
          <polyline points={line} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinejoin="round" opacity={ease(f, ansF + 14, ansF + 24)} />
          <path d="M 150 1132 L 940 1132" stroke="#9AA6C8" strokeWidth={4} />
        </>
      );
      overlay = (
        <>
          <div style={{ position: "absolute", left: 40, top: 500, width: 250, height: 279, rotate: "-7deg", border: `6px solid ${C.cream}`, boxShadow: "0 10px 0 rgba(0,0,0,0.4)", background: C.cream, scale: String(popIn(f, ansF + 12, 8)) }}>
            <Img src={table} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.35)" }} />
            <div style={{ position: "absolute", left: -6, right: -6, top: 279, background: C.cream, fontFamily: typeFont, fontSize: 22, color: INK, textAlign: "center", padding: "2px 0" }}>GRAUNT'S TABLE, 1662</div>
          </div>
          <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: interpolate(f, [ansF, ansF + 6], [0.9, 0], clamp) }} />
        </>
      );
    }
  }

  const ansF = Math.round((v.answerAt ?? 0.42) * dur);
  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {body}
      </svg>
      {overlay}
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 290} size={v.size ?? 100} /> : null}
      {mode === "today" && v.answer ? (
        <Sequence from={ansF} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 290} size={v.answerSize ?? 92} />
        </Sequence>
      ) : null}
      {v.tag && !(mode === "today" && f >= ansF) ? <Tag text={v.tag} x={v.tagX ?? 540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
