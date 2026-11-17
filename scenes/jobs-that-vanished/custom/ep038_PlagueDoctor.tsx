import React from "react";
import { Easing, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Figure } from "../kit/Figure";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep038 Plague doctor – 17th-century town-hired plague physician in the beaked mask.
// visual: { mode: "street" | "door" | "beak" | "flea" | "porch", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatTop?, answer?, answerAt? (porch) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const GOWN = "#24202A";
const GOWN_HI = "#3A3542";
const MASK = "#EDE3CC";
const MASK_D = "#CFC2A4";
const GLOVE = "#5A3F2C";
const LENS = "#9CC9CF";
const COBBLE = "#A29683";
const COBBLE_D = "#8A7F6D";
const LAVENDER = "#8E6BC4";
const MINT = "#4E9E5A";

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number }> = ({ items, f, dur, top = 1120 }) => (
  <>
    {items.map((t, i) => {
      const at = 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - at;
      if (age < 0) return null;
      return (
        <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 120 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Cobbles: React.FC<{ y0: number; seed: string }> = ({ y0, seed }) => (
  <>
    <rect x={0} y={y0} width={1080} height={1920 - y0} fill={COBBLE} />
    {new Array(Math.ceil((1920 - y0) / 60)).fill(0).map((_, r) =>
      new Array(10).fill(0).map((__, k) => {
        const s = 0.6 + (r * 60) / 900;
        const w = 110 * s;
        const x = k * w - (r % 2) * w * 0.5 + (random(`${seed}${r}${k}`) - 0.5) * 8;
        const y = y0 + r * 60 * s * 0.9;
        return <rect key={`${r}-${k}`} x={x} y={y} width={w - 10} height={50 * s} rx={16 * s} fill={(r + k) % 3 ? COBBLE_D : "#B0A592"} stroke={INK} strokeWidth={2.5} opacity={0.9} />;
      }),
    )}
  </>
);

// The plague doctor (own drawing after the 1656 Fürst print: wide hat, beak mask with glass eyes,
// ankle-length waxed gown, gloves, stick). Origin = feet centre, facing right.
// prop: "stick" | "bucket" | "none"; walk: animate legs; stick: 0..1 raise (0 = pointing down-forward, 1 = poke forward)
export const Doctor: React.FC<{ x: number; y: number; s?: number; f: number; walk?: boolean; stick?: number; prop?: "stick" | "bucket" | "none"; facing?: 1 | -1; cape?: string; smoke?: boolean }> = ({ x, y, s = 1, f, walk = false, stick = 0.3, prop = "stick", facing = 1, cape = GOWN, smoke = false }) => {
  const step = walk ? Math.sin(f / 5) : 0;
  const bob = walk ? Math.abs(Math.sin(f / 5)) * -8 : Math.sin(f / 20) * 2;
  const handX = 120 + stick * 40;
  const handY = -250 - stick * 30;
  const tipX = handX + 60 + stick * 160;
  const tipY = handY + 240 - stick * 200;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * facing} ${s})`}>
      <ellipse cx={0} cy={4} rx={140} ry={20} fill="#000" opacity={0.2} />
      {/* boots peeking under the gown */}
      <ellipse cx={-36 + step * 26} cy={-10} rx={38} ry={15} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <ellipse cx={40 - step * 26} cy={-10} rx={38} ry={15} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <g transform={`translate(0 ${bob})`}>
        {/* back arm */}
        <path d="M -40 -370 Q -90 -280 -70 -200" stroke={cape} strokeWidth={44} fill="none" strokeLinecap="round" />
        <circle cx={-70} cy={-196} r={22} fill={GLOVE} stroke={INK} strokeWidth={5} />
        {/* gown */}
        <path d={`M -62 -405 Q -100 -210 ${-128 + step * 8} -22 L ${128 - step * 8} -22 Q 100 -210 62 -405 Z`} fill={cape} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        <path d="M -20 -380 Q -40 -200 -60 -40 M 24 -380 Q 40 -200 56 -40" stroke={GOWN_HI} strokeWidth={6} fill="none" opacity={0.8} />
        {/* wax sheen */}
        <path d="M -70 -300 Q -80 -200 -96 -100" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.12} strokeLinecap="round" />
        {/* stick */}
        {prop === "stick" ? <path d={`M ${handX - 30} ${handY - 30 + stick * 10} L ${tipX} ${tipY}`} stroke="#6B4B2E" strokeWidth={11} strokeLinecap="round" /> : null}
        {prop === "bucket" ? (
          <g transform={`translate(${handX + 10} ${handY + 60})`}>
            <path d="M -40 -50 Q 0 -100 40 -50" stroke={INK} strokeWidth={6} fill="none" />
            <path d="M -50 -50 L 50 -50 Q 52 30 0 40 Q -52 30 -50 -50 Z" fill="#F08A24" stroke={INK} strokeWidth={6} />
            <path d="M -24 -20 l 12 12 l 12 -12 M 8 -20 l 12 12 l 12 -12 M -20 14 q 20 12 40 0" stroke={INK} strokeWidth={5} fill="none" />
          </g>
        ) : null}
        {/* front arm */}
        <path d={`M 34 -375 Q ${handX - 10} ${(handY - 375) / 2 + 10} ${handX} ${handY}`} stroke={cape} strokeWidth={46} fill="none" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r={24} fill={GLOVE} stroke={INK} strokeWidth={5} />
        {/* hood / collar */}
        <path d="M -62 -420 Q 0 -380 62 -420 L 52 -470 Q 0 -500 -52 -470 Z" fill="#2E2A33" stroke={INK} strokeWidth={6} />
        {/* head + mask */}
        <circle cx={0} cy={-470} r={50} fill={MASK} stroke={INK} strokeWidth={6} />
        <path d="M 30 -500 Q 120 -486 196 -418 Q 120 -432 30 -440 Z" fill={MASK} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 60 -462 Q 120 -450 170 -424" stroke={MASK_D} strokeWidth={5} fill="none" />
        <circle cx={18} cy={-478} r={19} fill={LENS} stroke={INK} strokeWidth={6} />
        <circle cx={12} cy={-484} r={5} fill="#FFFFFF" />
        {/* wide-brimmed hat */}
        <ellipse cx={0} cy={-512} rx={118} ry={20} fill="#1A1719" stroke={INK} strokeWidth={6} />
        <path d="M -56 -514 L -50 -585 Q 0 -600 50 -585 L 56 -514 Z" fill="#1A1719" stroke={INK} strokeWidth={6} />
        <rect x={-54} y={-536} width={108} height={14} fill="#4A3B2E" />
        {smoke
          ? [0, 1, 2].map((k) => {
              const p = ((f + k * 12) % 36) / 36;
              return <circle key={k} cx={200 + p * 60} cy={-420 - p * 70} r={8 + p * 18} fill="#CFE3C5" opacity={0.55 * (1 - p)} />;
            })
          : null}
      </g>
    </g>
  );
};

// plague house front with a red-cross door; open: 0..1
const House: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-760} width={520} height={760} fill="#C79A6E" stroke={INK} strokeWidth={7} />
    <path d="M -290 -760 L 0 -940 L 290 -760 Z" fill={C.brickDark} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {[-150, 150].map((wx) => (
      <g key={wx}>
        <rect x={wx - 55} y={-640} width={110} height={140} fill="#2A2420" stroke={INK} strokeWidth={6} />
        <path d={`M ${wx - 70} -495 L ${wx + 70} -495`} stroke={INK} strokeWidth={8} />
        <path d={`M ${wx} -640 L ${wx} -500 M ${wx - 55} -570 L ${wx + 55} -570`} stroke="#8A6A45" strokeWidth={6} />
      </g>
    ))}
    {/* doorway */}
    <rect x={-90} y={-340} width={180} height={340} fill="#120E0C" stroke={INK} strokeWidth={7} />
    <g transform={`translate(-90 0) scale(${1 - open * 0.85} 1)`}>
      <rect x={0} y={-340} width={180} height={340} fill="#6B4A2E" stroke={INK} strokeWidth={6} />
      {[40, 90, 140].map((k) => (
        <path key={k} d={`M ${k} -330 L ${k} -10`} stroke="#57391F" strokeWidth={5} />
      ))}
      <path d="M 90 -300 L 90 -140 M 30 -220 L 150 -220" stroke="#C0301E" strokeWidth={26} strokeLinecap="round" />
    </g>
  </g>
);

const Rat: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => {
  const sniff = Math.sin(f / 3) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={190} ry={22} fill="#000" opacity={0.18} />
      <path d={`M -150 -40 Q -320 ${-20 + Math.sin(f / 8) * 30} -360 ${-110 + Math.sin(f / 8) * 20}`} stroke="#C99A8A" strokeWidth={14} fill="none" strokeLinecap="round" />
      <ellipse cx={-20} cy={-90} rx={170} ry={100} fill="#7D736C" stroke={INK} strokeWidth={7} />
      <ellipse cx={160 + sniff} cy={-110} rx={80} ry={58} fill="#7D736C" stroke={INK} strokeWidth={7} />
      <circle cx={110} cy={-180} r={36} fill="#C99A8A" stroke={INK} strokeWidth={6} />
      <circle cx={190 + sniff} cy={-126} r={9} fill={INK} />
      <circle cx={238 + sniff} cy={-104} r={10} fill="#E58A93" stroke={INK} strokeWidth={4} />
      <path d={`M 230 ${-100} l 60 -14 M 230 -96 l 62 6`} stroke={INK} strokeWidth={3} />
      {[-110, -40, 50, 110].map((lx) => (
        <ellipse key={lx} cx={lx} cy={0} rx={22} ry={10} fill="#C99A8A" stroke={INK} strokeWidth={4} />
      ))}
    </g>
  );
};

// cartoon flea, origin = body centre
const Flea: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-20, 0, 20].map((k, i) => (
      <path key={k} d={`M ${k} 20 L ${k - 16 + i * 6} 56 L ${k - 30 + i * 8} 60`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ))}
    <ellipse cx={0} cy={0} rx={46} ry={34} fill="#7A3E1E" stroke={INK} strokeWidth={6} />
    <path d="M -30 -10 Q 0 -30 30 -10" stroke="#A4592D" strokeWidth={6} fill="none" />
    <circle cx={48} cy={4} r={18} fill="#7A3E1E" stroke={INK} strokeWidth={6} />
    <circle cx={54} cy={-2} r={4} fill="#FFF" />
    <path d="M 62 12 L 86 34" stroke={INK} strokeWidth={5} strokeLinecap="round" />
  </g>
);

const Pumpkin: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-80} rx={130} ry={95} fill="#F08A24" stroke={INK} strokeWidth={7} />
    <path d="M -40 -170 Q -60 -80 -40 10 M 40 -170 Q 60 -80 40 10" stroke="#C86A12" strokeWidth={6} fill="none" />
    <rect x={-12} y={-200} width={24} height={40} rx={6} fill={MINT} stroke={INK} strokeWidth={5} />
    <path d="M -70 -110 l 30 -34 l 30 34 Z M 10 -110 l 30 -34 l 30 34 Z" fill="#FFE07A" opacity={0.8 + Math.sin(f / 4) * 0.2} stroke={INK} strokeWidth={4} />
    <path d="M -80 -50 Q 0 0 80 -50 L 60 -40 L 40 -60 L 20 -36 L 0 -60 L -20 -36 L -40 -60 L -60 -40 Z" fill="#FFE07A" opacity={0.8 + Math.sin(f / 4) * 0.2} stroke={INK} strokeWidth={4} />
  </g>
);

const Sprig: React.FC<{ x: number; y: number; s?: number; rot?: number; kind: "lavender" | "mint" }> = ({ x, y, s = 1, rot = 0, kind }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 L 0 -90" stroke="#3E7A44" strokeWidth={6} />
    {kind === "lavender"
      ? [0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={k % 2 ? 7 : -7} cy={-50 - k * 13} rx={9} ry={12} fill={LAVENDER} stroke={INK} strokeWidth={3} />)
      : [0, 1, 2].map((k) => <ellipse key={k} cx={k % 2 ? 22 : -22} cy={-30 - k * 24} rx={24} ry={13} fill={MINT} stroke={INK} strokeWidth={3} transform={`rotate(${k % 2 ? -30 : 30} ${k % 2 ? 22 : -22} ${-30 - k * 24})`} />)}
  </g>
);

const Skyline: React.FC<{ y: number }> = ({ y }) => (
  <>
    {[0, 1, 2].map((k) => (
      <g key={k}>
        <rect x={k * 190 - 40} y={y - 520 - (k % 2) * 80} width={180} height={520 + (k % 2) * 80} fill={k % 2 ? "#B48A68" : "#9E6F55"} stroke={INK} strokeWidth={5} />
        {[0, 1].map((r) => <rect key={r} x={k * 190 + 20} y={y - 450 - (k % 2) * 80 + r * 190} width={60} height={90} fill="#F2C77A" stroke={INK} strokeWidth={4} />)}
      </g>
    ))}
  </>
);

export const PlagueDoctor: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "street";
  const float: string[] = v.float ?? [];
  let sky: "dawn" | "day" | "paper" = "dawn";
  let body: React.ReactNode = null;
  let headline: string | undefined = v.headline;

  if (mode === "street") {
    // frame 0: he is already striding toward the red-cross door, stick swinging
    const dx = interpolate(f, [0, dur], [300, 470], clamp);
    body = (
      <>
        <Skyline y={1180} />
        <House x={820} y={1180} s={0.85} />
        <Cobbles y0={1180} seed="st" />
        <Doctor x={dx} y={1760} s={1.6} f={f} walk stick={0.25 + Math.sin(f / 5) * 0.12} smoke />
      </>
    );
  } else if (mode === "door") {
    // the door swings open; another physician runs the other way
    sky = "day";
    const open = interpolate(f, [8, 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const dx = interpolate(f, [0, dur], [250, 400], clamp);
    const runX = interpolate(f, [0, dur * 0.8], [980, -260], clamp);
    body = (
      <>
        <House x={640} y={1460} s={1.3} open={open} />
        <Cobbles y0={1460} seed="dr" />
        <Doctor x={dx} y={1640} s={1.25} f={f} walk stick={0.4} />
        <Figure hat="top" coat={C.navy} scarf={C.cream} x={runX} y={1840} scale={1.25} action="walk" facing="left" />
        {runX > -200 ? (
          <path d={`M ${runX + 110} 1640 l 60 0 M ${runX + 120} 1690 l 80 0 M ${runX + 110} 1740 l 60 0`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        ) : null}
      </>
    );
  } else if (mode === "beak") {
    // giant side profile; the beak turns into a cut-away and fills with herbs
    sky = "paper";
    const cut = interpolate(f, [6, 16], [0, 1], clamp);
    const S = 3.2;
    const herbs: { x: number; y: number; r: number; k: "lavender" | "mint"; at: number }[] = [
      { x: 70, y: -440, r: 70, k: "lavender", at: 12 },
      { x: 105, y: -436, r: 95, k: "mint", at: 18 },
      { x: 135, y: -430, r: 80, k: "lavender", at: 24 },
      { x: 52, y: -446, r: 100, k: "mint", at: 30 },
      { x: 160, y: -424, r: 110, k: "lavender", at: 36 },
    ];
    body = (
      <>
        <defs>
          <clipPath id="ep038beak">
            <path d="M 30 -500 Q 120 -486 196 -418 Q 120 -432 30 -440 Z" />
          </clipPath>
        </defs>
        <Doctor x={300} y={800 + 470 * S} s={S} f={f} prop="none" />
        <g transform={`translate(300 ${800 + 470 * S}) scale(${S})`} opacity={cut}>
          <path d="M 30 -500 Q 120 -486 196 -418 Q 120 -432 30 -440 Z" fill="#F7EFDC" />
          <g clipPath="url(#ep038beak)">
            {herbs.map((h, i) => {
              const p = interpolate(f, [h.at, h.at + 6], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) });
              return <Sprig key={i} x={h.x} y={h.y + 14} s={0.42 * p} rot={h.r} kind={h.k} />;
            })}
          </g>
          <path d="M 30 -500 Q 120 -486 196 -418 Q 120 -432 30 -440 Z" fill="none" stroke={C.brick} strokeWidth={2.4} strokeDasharray="6 4" />
        </g>
      </>
    );
  } else if (mode === "flea") {
    // the real killer: a flea hopping off a rat, magnified; the herb sprig gets a red X
    sky = "day";
    const hop = (f % 24) / 24;
    const hx = 520 + Math.sin((f / 24) * Math.PI) * 60;
    const hy = 1180 - Math.sin(hop * Math.PI) * 160;
    const lens = interpolate(f, [4, 14], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
    const cross = interpolate(f, [18, 24], [0, 1], clamp);
    body = (
      <>
        <rect x={0} y={1420} width={1080} height={500} fill="#B59E7E" />
        <Rat x={470} y={1560} s={1.45} f={f} />
        <Flea x={hx} y={hy} s={0.5} rot={hop * 40 - 20} />
        <g transform={`translate(730 760) scale(${lens})`}>
          <path d="M 150 150 L 260 260" stroke="#6B4B2E" strokeWidth={34} strokeLinecap="round" />
          <circle r={220} fill={C.cream} stroke={INK} strokeWidth={14} />
          <Flea x={-20} y={0} s={2.4} rot={Math.sin(f / 6) * 6} />
        </g>
        <g transform="translate(270 720)">
          <Sprig x={-20} y={60} s={1.6} rot={-10} kind="lavender" />
          <Sprig x={40} y={60} s={1.6} rot={14} kind="mint" />
          {cross > 0 ? (
            <g transform={`scale(${cross})`}>
              <path d="M -110 -150 L 120 80 M 120 -150 L -110 80" stroke={C.brick} strokeWidth={26} strokeLinecap="round" />
            </g>
          ) : null}
        </g>
      </>
    );
  } else if (mode === "porch") {
    // today: a trick-or-treater in the beak mask at a lit front door, pumpkin glowing
    sky = "dawn";
    const answerAt = (v.answerAt ?? 0.35) * dur;
    const kidX = interpolate(f, [0, 16], [200, 360], { ...clamp, easing: Easing.out(Easing.cubic) });
    const glow = interpolate(f, [answerAt - 4, answerAt + 4], [0, 1], clamp);
    if (f >= answerAt && v.answer) headline = undefined;
    body = (
      <>
        <rect x={560} y={560} width={520} height={1000} fill="#5C6C8A" stroke={INK} strokeWidth={7} />
        <rect x={680} y={940} width={240} height={620} fill={glow > 0 ? "#FFD983" : "#8A5A3A"} stroke={INK} strokeWidth={7} />
        <rect x={680} y={940} width={240 * (1 - glow * 0.7)} height={620} fill="#8A5A3A" stroke={INK} strokeWidth={6} />
        <circle cx={640} cy={1080} r={14} fill={C.mustard} stroke={INK} strokeWidth={4} />
        <rect x={0} y={1560} width={1080} height={360} fill="#8C7B6A" />
        <rect x={520} y={1540} width={560} height={40} fill="#6E6052" stroke={INK} strokeWidth={5} />
        <Pumpkin x={930} y={1560} s={0.9} f={f} />
        <Doctor x={kidX} y={1700} s={1.05} f={f} walk={f < 16} prop="bucket" stick={0.1} cape="#2A2340" />
      </>
    );
  }

  return (
    <Backdrop sky={sky} stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>{body}</svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 104} /> : null}
      {mode === "porch" && v.answer ? (
        <Sequence from={Math.round((v.answerAt ?? 0.35) * dur)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 230} size={v.answerSize ?? 110} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 1120} />
    </Backdrop>
  );
};
