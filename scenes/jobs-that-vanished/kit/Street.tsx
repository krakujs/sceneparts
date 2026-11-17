import React from "react";
import { interpolate, random } from "remotion";
import { C } from "../theme";

const HOUSE_W = 300;
const TOP = 930; // top of house walls
const GROUND = 1580; // pavement line
const BODY = [C.brick, "#8E5A43", C.teal, "#9C4A3A", "#6E5B4A"];

export type LitMode = "none" | "all" | "behind" | "random";

type Props = {
  scroll: number; // world x offset of the camera
  lit?: LitMode;
  litX?: number; // for "behind": windows left of this screen x light up
  tint?: number; // 0..1 darkness overlay (night)
  lamps?: boolean;
  lampsLit?: boolean | "behind";
};

const Window: React.FC<{ x: number; y: number; w: number; h: number; on: number }> = ({ x, y, w, h, on }) => (
  <g>
    {on > 0 ? <rect x={x - 18} y={y - 18} width={w + 36} height={h + 36} rx={20} fill={C.glow} opacity={0.25 * on} /> : null}
    <rect x={x} y={y} width={w} height={h} rx={6} fill={C.night} stroke={C.ink} strokeWidth={6} />
    <rect x={x} y={y} width={w} height={h} rx={6} fill={C.glow} opacity={on} />
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={C.ink} strokeWidth={5} />
    <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={C.ink} strokeWidth={5} />
    <rect x={x - 8} y={y + h} width={w + 16} height={10} fill={C.cream} opacity={0.8} />
  </g>
);

export const Street: React.FC<Props> = ({ scroll, lit = "none", litX = 0, tint = 0.35, lamps = true, lampsLit = true }) => {
  const first = Math.floor((scroll - HOUSE_W) / HOUSE_W);
  const houses = [] as React.ReactNode[];
  const lampEls = [] as React.ReactNode[];
  for (let i = first; i < first + 6; i++) {
    const wx = i * HOUSE_W - scroll;
    const color = BODY[((i % BODY.length) + BODY.length) % BODY.length];
    const roofH = 70 + random(`roof${i}`) * 40;
    const winOn = (k: number, sx: number) => {
      if (lit === "all") return 1;
      if (lit === "none") return 0;
      if (lit === "random") return random(`w${i}-${k}`) > 0.55 ? 1 : 0;
      return interpolate(litX - sx, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    };
    const w1 = wx + 50;
    const w2 = wx + 170;
    houses.push(
      <g key={i}>
        {/* chimney */}
        <rect x={wx + 200} y={TOP - roofH - 70} width={44} height={90} fill={C.stoneDark} />
        <rect x={wx + 194} y={TOP - roofH - 80} width={56} height={16} fill={C.stone} />
        {/* roof */}
        <polygon points={`${wx - 6},${TOP} ${wx + 30},${TOP - roofH} ${wx + HOUSE_W - 30},${TOP - roofH} ${wx + HOUSE_W + 6},${TOP}`} fill={C.stoneDark} />
        {/* wall */}
        <rect x={wx} y={TOP} width={HOUSE_W} height={GROUND - TOP} fill={color} stroke={C.ink} strokeWidth={6} />
        {/* brick hints */}
        {[0, 1, 2, 3, 4, 5].map((b) => (
          <rect key={b} x={wx + 20 + random(`bx${i}${b}`) * 240} y={TOP + 30 + random(`by${i}${b}`) * 560} width={34} height={14} rx={3} fill={C.ink} opacity={0.15} />
        ))}
        <rect x={wx - 6} y={TOP - roofH - 80} width={HOUSE_W + 12} height={GROUND - TOP + roofH + 80} fill={C.night} opacity={tint} />
        <Window x={w1} y={TOP + 70} w={80} h={120} on={winOn(0, w1 + 40)} />
        <Window x={w2} y={TOP + 70} w={80} h={120} on={winOn(1, w2 + 40)} />
        <Window x={w1} y={TOP + 330} w={80} h={120} on={winOn(2, w1 + 40) * 0.6} />
        {/* door */}
        <rect x={wx + 175} y={TOP + 380} width={80} height={GROUND - TOP - 380} rx={8} fill={C.ink} opacity={0.85} />
        <circle cx={wx + 240} cy={TOP + 520} r={6} fill={C.mustard} />
        <rect x={wx + 165} y={GROUND - 14} width={100} height={14} fill={C.stone} />
      </g>,
    );
    if (lamps && i % 2 === 0) {
      const lx = wx + HOUSE_W - 10;
      const lampOn = lampsLit === "behind" ? lx < litX - 10 : !!lampsLit;
      lampEls.push(
        <g key={`lamp${i}`}>
          {lampOn ? <circle cx={lx} cy={GROUND - 420} r={90} fill={C.glow} opacity={0.3} /> : null}
          <rect x={lx - 7} y={GROUND - 400} width={14} height={400} fill={C.ink} />
          <polygon points={`${lx - 30},${GROUND - 400} ${lx + 30},${GROUND - 400} ${lx + 20},${GROUND - 450} ${lx - 20},${GROUND - 450}`} fill={lampOn ? C.glow : C.stone} stroke={C.ink} strokeWidth={5} />
          <polygon points={`${lx - 36},${GROUND - 450} ${lx + 36},${GROUND - 450} ${lx},${GROUND - 480}`} fill={C.ink} />
        </g>,
      );
    }
  }
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      {houses}
      {lampEls}
      {/* pavement + cobbles */}
      <rect x={0} y={GROUND} width={1080} height={1920 - GROUND} fill={C.stoneDark} />
      <rect x={0} y={GROUND} width={1080} height={26} fill={C.stone} />
      {new Array(40).fill(0).map((_, k) => {
        const row = Math.floor(k / 8);
        const col = k % 8;
        const x = ((col * 150 + row * 75 - scroll * 1.1) % 1200 + 1200) % 1200 - 60;
        return <ellipse key={k} cx={x} cy={GROUND + 70 + row * 62} rx={58} ry={20} fill={C.stone} opacity={0.55} />;
      })}
      <rect x={0} y={GROUND} width={1080} height={1920 - GROUND} fill={C.night} opacity={tint} />
    </svg>
  );
};

export const STREET_GROUND = GROUND;
export const STREET_TOP = TOP;
