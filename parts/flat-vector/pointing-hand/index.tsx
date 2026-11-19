import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector pointing hand: an index finger pointing sideways from a cartoon fist. Points right; flip for left.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 420 px wide at s = 1. Motion from p.f only.

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

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "nudge";
  const sx = p.flip ? -1 : 1;
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue };
  const nudge = anim === "nudge" ? Math.sin(f * 0.15) * 12 : 0;
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const G = 0.85;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <rect {...F("skin")} x={-170} y={-80} width={240} height={190} rx={80} />
        <rect {...F("skin")} x={-130} y={-140} width={150} height={80} rx={40} />
        <rect {...F("skin")} x={20} y={-55} width={230} height={70} rx={35} />
        <rect {...F("skin")} x={-40} y={10} width={110} height={44} rx={22} />
        <rect {...F("skin")} x={-40} y={56} width={100} height={44} rx={22} />
        <rect {...F("sleeve")} x={-290} y={-60} width={140} height={140} rx={22} />
      </>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x + 50 * s * (p.flip ? -1 : 1)} ${y}) scale(${s * k * 1.35})`}>
      <g transform={`translate(${nudge} ${bob}) scale(${G * sx} ${G})`}>
        {layers(draw, col)}
        <path d="M -36 12 L 62 12 M -36 58 L 60 58 M 205 -36 L 205 -6" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
        <rect x={40} y={-44} width={170} height={8} rx={4} fill="#FFFFFF" opacity={0.45} />
      </g>
    </g>
  );
}
