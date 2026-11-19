import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector praying hands: two hands pressed palm to palm, fingers pointing up, split by a centre line.
// Each hand has four stacked fingertips and a thumb along the inner edge, and a sleeve at the bottom.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 420 px tall at s = 1.
// anim "breathe" gently swells, "bob" lifts and drops.

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

// Left hand's fingers: x of the bar, top of the fingertip. Index is the tallest, nearest the centre line.
const FINGERS = [
  { x: -136, top: -116 },
  { x: -102, top: -150 },
  { x: -68, top: -176 },
  { x: -34, top: -196 },
];
const FW = 34, FBOT = 60;
// Small fan: the outer fingers lean out a little, the index stays nearly upright by the centre line.
const TILT = [-7, -3, 0, 1];

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "breathe";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue, line: shade(skinColour(p.skin ?? "#FFC83D"), 0.3) };
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const breathe = anim === "breathe" ? 1 + Math.sin(f * 0.08) * 0.015 : 1;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    const O = (kk: string) => ({ fill: c(kk), stroke: c("line"), strokeWidth: sw || 6, strokeLinejoin: "round" as const });
    const hand = (
      <>
        <rect {...F("sleeve")} x={-164} y={168} width={160} height={130} rx={26} />
        <rect {...F("skin")} x={-146} y={-10} width={140} height={190} rx={60} />
        {FINGERS.map((q, i) => (
          <rect key={i} {...O("skin")} x={q.x} y={q.top} width={FW} height={FBOT - q.top} rx={FW / 2} transform={`rotate(${TILT[i]} ${q.x + FW / 2} ${FBOT})`} />
        ))}
        <rect {...O("skin")} x={-22} y={-40} width={22} height={200} rx={11} />
      </>
    );
    return (
      <>
        {hand}
        <g transform="scale(-1 1)">{hand}</g>
      </>
    );
  };
  const cr = col.line;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s * k * breathe})`}>
      <g transform="scale(0.95)">
        {layers(draw, col)}
        <path d="M0 -200 L0 176" fill="none" stroke={cr} strokeWidth={6} strokeLinecap="round" />
      </g>
    </g>
  );
}
