import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector high five: two open palms slapping together over a yellow impact burst.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 480 px wide at s = 1. anim "slap" brings the palms in.

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

const FINGERS = [
  { x: -64, y: -150, w: 34, h: 200, a: -12 },
  { x: -26, y: -182, w: 36, h: 230, a: -3 },
  { x: 12, y: -168, w: 34, h: 210, a: 6 },
  { x: 46, y: -120, w: 28, h: 170, a: 14 },
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "slap";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue, accent: C.yellow };
  const slap = anim === "slap" ? Math.abs(Math.sin(f * 0.3)) * 12 : 0;
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const burst = 1 + (anim === "slap" ? Math.abs(Math.sin(f * 0.3)) * 0.06 : 0);
  const G = 0.85;
  const L = `translate(${-140 + slap} 120) rotate(35)`;
  const R = `translate(${140 - slap} 120) scale(-1 1) rotate(35)`;
  const hand = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <rect {...F("skin")} x={-72} y={-10} width={144} height={170} rx={56} />
        {FINGERS.map((q, i) => (
          <rect key={i} {...F("skin")} x={q.x} y={q.y} width={q.w} height={q.h} rx={q.w / 2} transform={`rotate(${q.a} ${q.x + q.w / 2} 20)`} />
        ))}
        <rect {...F("skin")} x={-100} y={30} width={44} height={120} rx={22} transform="rotate(-38 -82 80)" />
        <rect {...F("sleeve")} x={-80} y={150} width={160} height={120} rx={20} />
      </>
    );
  };
  const draw = (c: (k: string) => string, sw: number) => (
    <>
      <path d={starD(130, 84, 12)} fill={c("accent")} stroke={sw ? c("accent") : "none"} strokeWidth={sw} strokeLinejoin="round" transform={`translate(0 -60) scale(${burst})`} />
      <g transform={L}>{hand(c, sw)}</g>
      <g transform={R}>{hand(c, sw)}</g>
    </>
  );
  const cr = shade(col.skin, 0.25);
  const creases = (
    <path d="M -29 -110 L -29 10 M 11 -120 L 11 10 M 45 -80 L 45 10" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G})`}>
        {layers(draw, col)}
        <g transform={L}>{creases}</g>
        <g transform={R}>{creases}</g>
        <path d={starD(60, 34, 12)} fill="#FFFFFF" opacity={0.5} transform={`translate(0 -60) scale(${burst})`} />
      </g>
    </g>
  );
}
