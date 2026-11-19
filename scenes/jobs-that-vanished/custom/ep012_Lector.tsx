import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep012 – Factory Lector. Cigar-factory floor: a reader on a raised platform, rollers at a long bench.
// visual: { mode?: "read"|"applause"|"brand"|"ban"|"radio"|"earbuds", lector?: bool, dropAt?: 0-1,
//           headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop?, book?: string }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const WOOD = "#8C5A2B";
const WOOD_L = "#A8703A";
const WOOD_D = "#5E3A1A";
const SKIN = ["#E8B990", "#C98E62", "#A8714A", "#E2A877"];
const SHIRT = ["#F4EAD5", "#9FB8C8", "#E3C77A"];
const TOBACCO = "#7A4A24";
const STEEL = "#C9CED6";
const LX = 790; // lector x

const Chips: React.FC<{ items: string[]; dur: number; top: number }> = ({ items, dur, top }) => {
  const f = useCurrentFrame();
  return (
    <>
      {items.map((t, i) => {
        const at = 12 + i * Math.max(22, (dur - 24) / Math.max(1, items.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 104 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 44, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.3)", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </>
  );
};

const Room: React.FC = () => (
  <>
    <rect x={0} y={0} width={1080} height={1180} fill="url(#wall12)" />
    {[70, 320, 570, 820].map((x) => (
      <g key={x}>
        <rect x={x} y={250} width={180} height={560} rx={90} fill="#CFE3E8" stroke={INK} strokeWidth={8} />
        <line x1={x + 90} y1={250} x2={x + 90} y2={810} stroke={INK} strokeWidth={5} />
        {[400, 540, 680].map((y) => <line key={y} x1={x} y1={y} x2={x + 180} y2={y} stroke={INK} strokeWidth={5} />)}
        <rect x={x - 10} y={806} width={200} height={18} fill={WOOD_L} stroke={INK} strokeWidth={5} />
      </g>
    ))}
    {/* coat pegs with straw hats */}
    <line x1={0} y1={872} x2={1080} y2={872} stroke={WOOD_D} strokeWidth={10} />
    {[40, 260, 500].map((x, i) => (
      <g key={x}>
        <ellipse cx={x + 30} cy={884} rx={44} ry={9} fill="#E3C77A" stroke={INK} strokeWidth={4} />
        <path d={`M ${x + 6} 884 Q ${x + 30} 846 ${x + 54} 884 Z`} fill="#E3C77A" stroke={INK} strokeWidth={4} />
        <rect x={x + 10} y={872} width={40} height={6} fill={i % 2 ? C.brick : C.teal} />
      </g>
    ))}
    {/* hanging lamps */}
    {[200, 540, 880].map((x) => (
      <g key={x}>
        <line x1={x} y1={0} x2={x} y2={190} stroke={INK} strokeWidth={4} />
        <path d={`M ${x - 50} 230 L ${x - 22} 190 L ${x + 22} 190 L ${x + 50} 230 Z`} fill={C.teal} stroke={INK} strokeWidth={5} />
        <ellipse cx={x} cy={236} rx={18} ry={10} fill={C.glow} />
      </g>
    ))}
    {/* floor */}
    <rect x={0} y={1180} width={1080} height={740} fill={WOOD} />
    {[1260, 1360, 1480, 1620, 1780].map((y) => <line key={y} x1={0} y1={y} x2={1080} y2={y} stroke={WOOD_D} strokeWidth={5} />)}
    <rect x={0} y={1172} width={1080} height={14} fill={WOOD_D} />
  </>
);

type RMode = "roll" | "tap" | "drop" | "idle" | "angry";

// Seated cigar roller behind the bench (torso + face; hands drawn on the bench top by <Hands>).
const Roller: React.FC<{ x: number; i: number; f: number; mode: RMode }> = ({ x, i, f, mode }) => {
  const skin = SKIN[i % SKIN.length];
  const shirt = SHIRT[i % SHIRT.length];
  const angry = mode === "angry" || mode === "drop";
  const look = mode === "roll" ? Math.sin(f / 40 + i) * 4 : 6; // listening: eyes toward the reader (right)
  const bob = Math.sin(f / 14 + i * 2) * 3;
  return (
    <g transform={`translate(0, ${bob})`}>
      <path d={`M ${x - 72} 1110 L ${x - 64} 990 Q ${x} 962 ${x + 64} 990 L ${x + 72} 1110 Z`} fill={shirt} stroke={INK} strokeWidth={7} />
      <path d={`M ${x - 16} 975 L ${x} 1010 L ${x + 16} 975`} fill="none" stroke={INK} strokeWidth={4} />
      <rect x={x - 18} y={946} width={36} height={34} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={x} cy={912} r={50} fill={skin} stroke={INK} strokeWidth={7} />
      <circle cx={x - 17 + look} cy={908} r={6} fill={INK} />
      <circle cx={x + 17 + look} cy={908} r={6} fill={INK} />
      {angry ? (
        <>
          <line x1={x - 30} y1={886} x2={x - 8} y2={896} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <line x1={x + 30} y1={886} x2={x + 8} y2={896} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <path d={`M ${x - 16} 940 Q ${x} 928 ${x + 16} 940`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        </>
      ) : (
        <path d={`M ${x - 15} 932 Q ${x} 944 ${x + 15} 932`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      )}
      {i % 2 === 0 ? (
        <>
          <ellipse cx={x} cy={870} rx={76} ry={13} fill="#E3C77A" stroke={INK} strokeWidth={5} />
          <path d={`M ${x - 42} 870 Q ${x - 40} 822 ${x} 820 Q ${x + 40} 822 ${x + 42} 870 Z`} fill="#E3C77A" stroke={INK} strokeWidth={5} />
          <rect x={x - 40} y={852} width={80} height={10} fill={i === 2 ? C.teal : C.brick} />
        </>
      ) : (
        <path d={`M ${x - 50} 900 Q ${x - 48} 852 ${x} 856 Q ${x + 50} 852 ${x + 50} 900 Q ${x + 30} 874 ${x} 878 Q ${x - 30} 874 ${x - 50} 900 Z`} fill={INK} />
      )}
    </g>
  );
};

// Arms + hands + cigar / chaveta knife on the bench top (drawn after the bench).
const Hands: React.FC<{ x: number; i: number; f: number; mode: RMode; dropF: number }> = ({ x, i, f, mode, dropF }) => {
  const skin = SKIN[i % SKIN.length];
  const shirt = SHIRT[i % SHIRT.length];
  const dx = mode === "roll" ? Math.sin(f / 5 + i * 1.7) * 14 : 0;
  const tapPhase = Math.abs(Math.sin(f * 0.42 + i * 0.9));
  const ry = mode === "tap" ? 1100 - tapPhase * 70 : 1100;
  const rx = x + 34;
  const L = { x: x - 34 + dx, y: 1100 };
  const R = { x: rx + dx, y: ry };
  const arm = (sx: number, p: { x: number; y: number }) => (
    <>
      <line x1={sx} y1={1010} x2={p.x} y2={p.y} stroke={INK} strokeWidth={34} strokeLinecap="round" />
      <line x1={sx} y1={1010} x2={p.x} y2={p.y} stroke={shirt} strokeWidth={22} strokeLinecap="round" />
    </>
  );
  // knife fall (drop mode)
  const ft = Math.max(0, f - dropF);
  const kd = mode === "drop" ? Math.min(1, ft / 12) : 0;
  const knifeY = mode === "drop" ? 1096 + kd * kd * 190 : ry - 4;
  const knifeR = mode === "drop" ? kd * (i % 2 ? 70 : -60) : -10;
  const showKnife = mode === "tap" || mode === "drop";
  return (
    <g>
      {mode === "roll" || mode === "idle" ? <rect x={x - 46 + dx} y={1086} width={92} height={18} rx={9} fill={TOBACCO} stroke={INK} strokeWidth={4} /> : null}
      {mode === "roll" || mode === "idle" ? <rect x={x - 46 + dx} y={1086} width={14} height={18} rx={4} fill="#B38A5A" /> : null}
      {arm(x - 56, L)}
      {arm(x + 56, mode === "drop" ? { x: rx, y: 1060 } : R)}
      <circle cx={L.x} cy={L.y} r={18} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={mode === "drop" ? rx : R.x} cy={mode === "drop" ? 1060 : R.y} r={18} fill={skin} stroke={INK} strokeWidth={5} />
      {showKnife ? (
        <g transform={`translate(${mode === "drop" ? rx + 8 : R.x + 8}, ${knifeY}) rotate(${knifeR})`}>
          <path d="M -34 0 A 34 34 0 0 1 34 0 Z" fill={STEEL} stroke={INK} strokeWidth={5} />
          <rect x={-8} y={-44} width={16} height={14} rx={4} fill={WOOD_D} stroke={INK} strokeWidth={3} />
        </g>
      ) : null}
      {mode === "tap" && tapPhase < 0.22 ? (
        <g stroke={C.mustard} strokeWidth={6} strokeLinecap="round">
          <line x1={R.x - 40} y1={1092} x2={R.x - 64} y2={1072} />
          <line x1={R.x + 52} y1={1092} x2={R.x + 76} y2={1072} />
          <line x1={R.x + 8} y1={1070} x2={R.x + 8} y2={1044} />
        </g>
      ) : null}
    </g>
  );
};

const Bench: React.FC = () => (
  <>
    <rect x={40} y={1100} width={580} height={26} fill={WOOD_L} stroke={INK} strokeWidth={6} />
    <rect x={56} y={1126} width={548} height={96} fill={WOOD} stroke={INK} strokeWidth={6} />
    {[150, 300, 450].map((x, k) => (
      <g key={x}>
        <rect x={x - 46} y={1146} width={92} height={50} fill={C.cream} stroke={INK} strokeWidth={4} />
        <text x={x} y={1184} textAnchor="middle" fontSize={34} fontFamily={titleFont} fill={INK}>{182 - k * 2}</text>
      </g>
    ))}
  </>
);

// The reader: shirt, vest, glasses, moustache, open book; mouth moves, pages flip.
const Reader: React.FC<{ f: number; x?: number; y?: number; ghost?: boolean; book?: string }> = ({ f, x = LX, y = 0, ghost, book }) => {
  const talk = 3 + Math.abs(Math.sin(f / 3.2)) * 8;
  const flipT = (f % 75) / 10; // page flip in the first 10 frames of every 2.5 s
  const flip = flipT < 1 ? Math.cos(flipT * Math.PI) : 1;
  const bx = x - 150;
  const by = y + 742;
  const ink = ghost ? C.sepia : INK;
  return (
    <g opacity={ghost ? 0.35 : 1}>
      <path d={`M ${x - 64} ${y + 905} L ${x - 58} ${y + 760} Q ${x} ${y + 734} ${x + 58} ${y + 760} L ${x + 64} ${y + 905} Z`} fill={ghost ? C.paper : C.cream} stroke={ink} strokeWidth={7} />
      <path d={`M ${x - 40} ${y + 905} L ${x - 34} ${y + 772} L ${x} ${y + 830} L ${x + 34} ${y + 772} L ${x + 40} ${y + 905} Z`} fill={ghost ? C.paperDark : C.brickDark} stroke={ink} strokeWidth={5} />
      <rect x={x - 18} y={y + 712} width={36} height={32} fill={ghost ? C.paper : SKIN[0]} stroke={ink} strokeWidth={5} />
      <circle cx={x} cy={y + 670} r={52} fill={ghost ? C.paper : SKIN[0]} stroke={ink} strokeWidth={7} />
      <path d={`M ${x - 52} ${y + 660} Q ${x - 50} ${y + 610} ${x} ${y + 612} Q ${x + 50} ${y + 610} ${x + 52} ${y + 660} Q ${x + 24} ${y + 634} ${x - 10} ${y + 640} Q ${x - 34} ${y + 642} ${x - 52} ${y + 660} Z`} fill={ink} />
      {/* glasses looking down-left at the book */}
      <circle cx={x - 20} cy={y + 672} r={15} fill="#FFFFFF" stroke={ink} strokeWidth={4} />
      <circle cx={x + 18} cy={y + 672} r={15} fill="#FFFFFF" stroke={ink} strokeWidth={4} />
      <line x1={x - 5} y1={y + 672} x2={x + 3} y2={y + 672} stroke={ink} strokeWidth={4} />
      <circle cx={x - 25} cy={y + 677} r={5} fill={ink} />
      <circle cx={x + 13} cy={y + 677} r={5} fill={ink} />
      <ellipse cx={x - 4} cy={y + 704} rx={12} ry={ghost ? 3 : talk} fill={ink} />
      <path d={`M ${x - 34} ${y + 696} Q ${x - 4} ${y + 682} ${x + 26} ${y + 696} Q ${x - 4} ${y + 690} ${x - 34} ${y + 696} Z`} fill={ink} />
      {/* arms to the book */}
      <line x1={x - 52} y1={y + 780} x2={bx + 70} y2={by + 50} stroke={ink} strokeWidth={34} strokeLinecap="round" />
      <line x1={x - 52} y1={y + 780} x2={bx + 70} y2={by + 50} stroke={ghost ? C.paper : C.cream} strokeWidth={22} strokeLinecap="round" />
      <line x1={x + 52} y1={y + 780} x2={bx + 150} y2={by + 56} stroke={ink} strokeWidth={34} strokeLinecap="round" />
      <line x1={x + 52} y1={y + 780} x2={bx + 150} y2={by + 56} stroke={ghost ? C.paper : C.cream} strokeWidth={22} strokeLinecap="round" />
      {/* open book */}
      <g transform={`rotate(-8, ${bx + 80}, ${by + 30})`}>
        <rect x={bx - 6} y={by - 6} width={172} height={84} rx={6} fill={ghost ? C.paperDark : C.brick} stroke={ink} strokeWidth={5} />
        <path d={`M ${bx} ${by} L ${bx + 80} ${by + 8} L ${bx + 80} ${by + 74} L ${bx} ${by + 68} Z`} fill={C.cream} stroke={ink} strokeWidth={4} />
        <path d={`M ${bx + 160} ${by} L ${bx + 80} ${by + 8} L ${bx + 80} ${by + 74} L ${bx + 160} ${by + 68} Z`} fill={C.cream} stroke={ink} strokeWidth={4} />
        {[20, 34, 48].map((ly) => (
          <g key={ly}>
            <line x1={bx + 12} y1={by + ly} x2={bx + 68} y2={by + ly + 4} stroke={ink} strokeWidth={3} opacity={0.5} />
            <line x1={bx + 92} y1={by + ly + 4} x2={bx + 148} y2={by + ly} stroke={ink} strokeWidth={3} opacity={0.5} />
          </g>
        ))}
        {flip < 1 ? <path d={`M ${bx + 80} ${by + 8} L ${bx + 80 + flip * 80} ${by - 4} L ${bx + 80 + flip * 80} ${by + 62} L ${bx + 80} ${by + 74} Z`} fill="#FFF8E6" stroke={ink} strokeWidth={4} /> : null}
      </g>
      <circle cx={bx + 70} cy={by + 50} r={17} fill={ghost ? C.paper : SKIN[0]} stroke={ink} strokeWidth={5} />
      <circle cx={bx + 150} cy={by + 56} r={17} fill={ghost ? C.paper : SKIN[0]} stroke={ink} strokeWidth={5} />
      {book ? (
        <text x={bx + 80} y={by + 120} textAnchor="middle" fontSize={30} fontFamily={typeFont} fill={ink}>{book}</text>
      ) : null}
    </g>
  );
};

// Sound arcs drifting left from a source point.
const Waves: React.FC<{ f: number; x: number; y: number; color?: string }> = ({ f, x, y, color = C.mustard }) => (
  <g>
    {[0, 1, 2].map((k) => {
      const a = ((f + k * 12) % 36) / 36;
      const r = 40 + a * 140;
      return <path key={k} d={`M ${x - r * 0.5} ${y - r * 0.8} Q ${x - r} ${y} ${x - r * 0.5} ${y + r * 0.8}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" opacity={(1 - a) * 0.9} />;
    })}
  </g>
);

// Raised reading platform (deck, front rail panel, legs, ladder). fall: 0..1 collapses it.
const Platform: React.FC<{ fall?: number; children?: React.ReactNode }> = ({ fall = 0, children }) => {
  const e = Easing.in(Easing.quad)(fall);
  return (
    <g>
      <g transform={`translate(0, ${e * 230}) rotate(${e * 14}, 795, 905)`}>
        {children}
        <rect x={640} y={846} width={310} height={60} fill={WOOD_L} stroke={INK} strokeWidth={6} />
        {[700, 760, 820, 880].map((x) => <line key={x} x1={x} y1={846} x2={x} y2={906} stroke={INK} strokeWidth={4} />)}
        <rect x={630} y={900} width={330} height={26} fill={WOOD} stroke={INK} strokeWidth={6} />
      </g>
      <g transform={`rotate(${-e * 70}, 668, 1180)`}>
        <rect x={656} y={926} width={24} height={254} fill={WOOD} stroke={INK} strokeWidth={5} />
      </g>
      <g transform={`rotate(${e * 75}, 922, 1180)`}>
        <rect x={910} y={926} width={24} height={254} fill={WOOD} stroke={INK} strokeWidth={5} />
      </g>
      {fall < 0.05 ? <path d="M 680 940 L 910 1170 M 910 940 L 680 1170" stroke={WOOD_D} strokeWidth={10} /> : null}
      <g opacity={1 - e}>
        <line x1={606} y1={930} x2={590} y2={1180} stroke={WOOD_D} strokeWidth={10} />
        <line x1={640} y1={930} x2={628} y2={1180} stroke={WOOD_D} strokeWidth={10} />
        {[980, 1040, 1100, 1160].map((y) => <line key={y} x1={600} y1={y} x2={634} y2={y} stroke={WOOD_D} strokeWidth={8} />)}
      </g>
      {fall > 0.95 ? (
        <g stroke={INK} strokeWidth={6} strokeLinecap="round">
          <line x1={640} y1={1160} x2={610} y2={1130} />
          <line x1={960} y1={1160} x2={995} y2={1128} />
          <line x1={800} y1={1100} x2={800} y2={1060} />
        </g>
      ) : null}
    </g>
  );
};

const Radio: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Waves f={f} x={700} y={760} color={C.teal} />
    <path d="M 700 900 L 700 730 Q 795 640 890 730 L 890 900 Z" fill={WOOD_D} stroke={INK} strokeWidth={7} />
    <path d="M 722 870 L 722 740 Q 795 672 868 740 L 868 870 Z" fill="#C9A86A" stroke={INK} strokeWidth={5} />
    {[750, 772, 795, 818, 840].map((x) => <line key={x} x1={x} y1={722} x2={x} y2={868} stroke={WOOD} strokeWidth={5} opacity={0.6} />)}
    <circle cx={760} cy={884} r={9} fill={C.mustard} stroke={INK} strokeWidth={3} />
    <circle cx={830} cy={884} r={9} fill={C.mustard} stroke={INK} strokeWidth={3} />
  </g>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="wall12" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#E9D7AE" />
      <stop offset="1" stopColor="#D2B98A" />
    </linearGradient>
    <linearGradient id="cigar12" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#9A6334" />
      <stop offset="0.5" stopColor="#7A4A24" />
      <stop offset="1" stopColor="#4E2E14" />
    </linearGradient>
  </defs>
);

const Overlay: React.FC<{ v: SceneProps["scene"]["visual"]; dur: number }> = ({ v, dur }) => (
  <>
    {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 96} /> : null}
    {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 470} /> : null}
    <Chips items={v.float ?? []} dur={dur} top={v.floatTop ?? 1010} />
  </>
);

const Factory: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "read";
  const dropF = (v.dropAt ?? 0.58) * dur;
  let rm: RMode = "roll";
  if (mode === "applause") rm = f < dropF ? "tap" : "drop";
  if (mode === "ban") rm = "angry";
  if (mode === "radio") rm = "idle";
  const fall = mode === "ban" ? interpolate(f, [dur * (v.fallAt ?? 0.3), dur * (v.fallAt ?? 0.3) + 16], [0, 1], clamp) : 0;
  const showReader = mode === "read" || mode === "applause";
  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <g transform="translate(540 1180) scale(1.1) translate(-540 -1180)">
        <Room />
        {[150, 300, 450].map((x, i) => <Roller key={x} x={x} i={i} f={f} mode={rm} />)}
        <Bench />
        {[150, 300, 450].map((x, i) => <Hands key={x} x={x} i={i} f={f} mode={rm} dropF={dropF + i * 3} />)}
        <Platform fall={fall}>
          {showReader ? <Reader f={mode === "applause" ? 0 : f} book={v.book} /> : null}
          {mode === "radio" ? <Radio f={f} /> : null}
        </Platform>
        {showReader && mode === "read" ? <Waves f={f} x={730} y={690} /> : null}
        </g>
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

const Brand: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const bookIn = interpolate(f, [0, 12], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
  const at = (v.cigarAt ?? 0.45) * dur;
  const cx = interpolate(f, [at, at + 14], [1200, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const smoke = (k: number) => ((f + k * 15) % 45) / 45;
  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <Room />
        <rect x={0} y={0} width={1080} height={1920} fill={INK} opacity={0.55} />
        {/* the novel */}
        <g transform={`translate(540, 720) scale(${bookIn}) rotate(${-4 + Math.sin(f / 20) * 2})`}>
          <rect x={-230} y={-250} width={460} height={500} rx={14} fill={C.brick} stroke={INK} strokeWidth={10} />
          <rect x={-200} y={-220} width={400} height={440} rx={8} fill="none" stroke={C.mustard} strokeWidth={6} />
          <text x={0} y={-110} textAnchor="middle" fontSize={56} fontFamily={titleFont} fill={C.cream}>THE COUNT</text>
          <text x={0} y={-40} textAnchor="middle" fontSize={44} fontFamily={titleFont} fill={C.cream}>OF</text>
          <text x={0} y={40} textAnchor="middle" fontSize={58} fontFamily={titleFont} fill={C.mustard}>MONTE</text>
          <text x={0} y={110} textAnchor="middle" fontSize={58} fontFamily={titleFont} fill={C.mustard}>CRISTO</text>
          <text x={0} y={190} textAnchor="middle" fontSize={34} fontFamily={typeFont} fill={C.cream}>A. DUMAS · 1844</text>
        </g>
        {/* the cigar slides in under it */}
        <g transform={`translate(${cx}, 0)`}>
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={150 - smoke(k) * 40} cy={1030 - smoke(k) * 120} r={14 + smoke(k) * 26} fill={C.cream} opacity={(1 - smoke(k)) * 0.5} />
          ))}
          <rect x={140} y={1030} width={800} height={104} rx={52} fill="url(#cigar12)" stroke={INK} strokeWidth={8} />
          <rect x={140} y={1030} width={70} height={104} rx={30} fill="#9C9690" stroke={INK} strokeWidth={6} />
          <circle cx={150} cy={1082} r={14} fill="#E8743B" />
          <rect x={470} y={1022} width={330} height={120} rx={10} fill={C.mustard} stroke={INK} strokeWidth={7} />
          <rect x={482} y={1034} width={306} height={96} rx={6} fill="none" stroke={C.brickDark} strokeWidth={4} />
          <text x={635} y={1100} textAnchor="middle" fontSize={37} fontFamily={titleFont} fill={C.brickDark}>MONTECRISTO</text>
        </g>
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

// Today: the reader's ghost behind a phone playing a podcast, earbuds in.
const Earbuds: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const pop = interpolate(f, [0, 12], [0.5, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
  const prog = interpolate(f, [0, dur], [0.18, 0.46], clamp);
  const bud = (x: number, y: number, flip: number, k: number) => (
    <g transform={`translate(${x}, ${y + Math.sin(f / 12 + k) * 12}) rotate(${flip * 20})`}>
      <ellipse cx={0} cy={0} rx={40} ry={34} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
      <rect x={-12} y={20} width={24} height={110} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
      <circle cx={-6} cy={-4} r={10} fill={C.stone} />
    </g>
  );
  return (
    <Backdrop sky="modern" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        <Reader f={f} x={300} y={-60} ghost />
        <Waves f={f} x={760} y={760} color={C.mustard} />
        <g transform={`translate(560, 880) scale(${pop}) translate(-560, -880)`}>
          <rect x={390} y={520} width={340} height={660} rx={46} fill={C.modernA} stroke={INK} strokeWidth={10} />
          <rect x={410} y={548} width={300} height={604} rx={30} fill="#1C1E3A" />
          <rect x={440} y={590} width={240} height={240} rx={18} fill={C.brick} stroke={C.cream} strokeWidth={5} />
          <path d="M 470 650 L 560 664 L 560 790 L 470 776 Z" fill={C.cream} />
          <path d="M 650 650 L 560 664 L 560 790 L 650 776 Z" fill={C.cream} />
          <text x={560} y={880} textAnchor="middle" fontSize={34} fontFamily={titleFont} fill={C.cream}>PODCAST</text>
          {new Array(9).fill(0).map((_, k) => {
            const h = 14 + Math.abs(Math.sin(f / 4 + k * 0.9)) * 44;
            return <rect key={k} x={448 + k * 26} y={942 - h / 2} width={14} height={h} rx={7} fill={C.mustard} />;
          })}
          <rect x={440} y={1000} width={240} height={10} rx={5} fill="#3A3D58" />
          <rect x={440} y={1000} width={240 * prog} height={10} rx={5} fill={C.cream} />
          <circle cx={560} cy={1080} r={42} fill={C.cream} />
          <rect x={545} y={1062} width={10} height={36} fill={C.modernA} />
          <rect x={565} y={1062} width={10} height={36} fill={C.modernA} />
        </g>
        {bud(830, 640, 1, 0)}
        {bud(880, 980, -1, 2)}
      </svg>
      <Overlay v={v} dur={dur} />
    </Backdrop>
  );
};

export const Lector: React.FC<SceneProps> = (p) => {
  const m = p.scene.visual.mode;
  if (m === "brand") return <Brand {...p} />;
  if (m === "earbuds") return <Earbuds {...p} />;
  return <Factory {...p} />;
};
