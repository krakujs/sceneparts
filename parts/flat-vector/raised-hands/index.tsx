import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector raised hands: two open hands thrown up in celebration with sparkles around them.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 420 px wide at s = 1. anim "sparkle" twinkles the sparkles.

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

const sparkD = (r: number) => `M 0 ${-r} Q 0 0 ${r} 0 Q 0 0 0 ${r} Q 0 0 ${-r} 0 Q 0 0 0 ${-r} Z`;
const FINGERS = [
  { x: -64, y: -150, w: 34, h: 200, a: -14 },
  { x: -26, y: -182, w: 36, h: 230, a: -4 },
  { x: 12, y: -168, w: 34, h: 210, a: 6 },
  { x: 46, y: -120, w: 28, h: 170, a: 16 },
];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "sparkle";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue, accent: C.yellow };
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const G = 0.75;
  const L = "translate(-120 40) rotate(-22)";
  const R = "translate(120 40) scale(-1 1) rotate(-22)";
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
      <g transform={L}>{hand(c, sw)}</g>
      <g transform={R}>{hand(c, sw)}</g>
    </>
  );
  const cr = shade(col.skin, 0.25);
  const creases = (
    <path d="M -29 -110 L -29 10 M 11 -120 L 11 10 M 45 -80 L 45 10" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
  );
  const sparks: [number, number, number][] = [[-300, -150, 46], [300, -150, 46], [-200, -300, 36], [200, -300, 36], [0, -330, 52]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G})`}>
        {layers(draw, col)}
        <g transform={L}>{creases}</g>
        <g transform={R}>{creases}</g>
        {sparks.map(([sx, sy, r], i) => {
          const sc = anim === "sparkle" ? 0.7 + 0.3 * Math.abs(Math.sin(f * 0.2 + i * 1.3)) : 1;
          return <path key={i} d={sparkD(r)} fill={C.yellow} stroke={C.yellowDark} strokeWidth={4} transform={`translate(${sx} ${sy}) scale(${sc})`} />;
        })}
      </g>
    </g>
  );
}
