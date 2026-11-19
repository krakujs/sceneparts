import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector fist bump: two big fists meeting knuckle to knuckle, with a small impact burst behind them.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 620 px wide at s = 1.
// The left cuff is blue, the right cuff orange (p.color and p.color2). anim "bump" pushes the fists together on a beat.

type Cols = Record<string, string>;
// Die-cut stack: soft shadow, white sticker edge, one darker shade offset, then the colour pass.
function layers(draw: (c: (k: string) => string, sw: number) => React.ReactNode, col: Cols) {
  const mono = (v: string) => () => v;
  return (
    <>
      <g opacity={0.16} transform="translate(0 16)">{draw(mono(C.ink), 32)}</g>
      {draw(mono("#FFFFFF"), 32)}
      <g transform="translate(0 10)">{draw((k) => shade(col[k], 0.18), 0)}</g>
      {draw((k) => col[k], 0)}
    </>
  );
}

const starD = (R: number, r: number, n: number) => {
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n - Math.PI / 2, rr = i % 2 ? r : R;
    d += `${i ? "L" : "M"} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)} `;
  }
  return d + "Z";
};

// Four knuckle segments stacked on the fist's inner edge, centre y of each.
const KNUCKLES = [-78, -26, 26, 78];

// One fist facing right, cuff at the far left. The mirror image is the other fist.
const fist = (c: (k: string) => string, sw: number, sleeve: string) => {
  const F = (k: string) => ({ fill: c(k), stroke: sw ? c(k) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
  // Skin pieces get a line-coloured edge so each knuckle and the thumb read as separate forms.
  const O = (k: string) => ({ fill: c(k), stroke: c("line"), strokeWidth: sw || 6, strokeLinejoin: "round" as const });
  return (
    <>
      <rect {...F(sleeve)} x={-300} y={-124} width={128} height={248} rx={26} />
      <rect {...O("skin")} x={-204} y={-106} width={204} height={212} rx={60} />
      {KNUCKLES.map((cy) => <rect key={cy} {...O("skin")} x={-48} y={cy - 26} width={72} height={52} rx={26} />)}
      <rect {...O("skin")} x={-116} y={-158} width={132} height={60} rx={30} />
    </>
  );
};

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "bump";
  const skin = skinColour(p.skin ?? "#FFC83D");
  const col: Cols = {
    skin,
    sleeve: p.color ?? C.blue,
    sleeve2: p.color2 ?? C.orange,
    accent: C.red,
    line: shade(skin, 0.3),
  };
  const push = anim === "bump" ? Math.abs(Math.sin(f * 0.3)) * 14 : anim === "shake" ? Math.sin(f * 0.9) * 4 : 0;
  const burst = 1 + (anim === "bump" ? Math.abs(Math.sin(f * 0.3)) * 0.08 : 0);
  // The fists are staggered: the left one sits higher, so the two knuckle columns read as two fists, not one.
  const L = `translate(${-18 + push} -26) rotate(-4)`;
  const R = `translate(${18 - push} 26) scale(-1 1) rotate(-4)`;
  const draw = (c: (k: string) => string, sw: number) => (
    <>
      <path d={starD(178, 100, 12)} fill={c("accent")} stroke={sw ? c("accent") : "none"} strokeWidth={sw} strokeLinejoin="round" transform={`translate(0 -10) scale(${burst})`} />
      <g transform={L}>{fist(c, sw, "sleeve")}</g>
      <g transform={R}>{fist(c, sw, "sleeve2")}</g>
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform="scale(0.9)">{layers(draw, col)}</g>
    </g>
  );
}
