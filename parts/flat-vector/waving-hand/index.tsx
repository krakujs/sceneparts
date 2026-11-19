import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector waving hand: an open palm with fingers spread, rocking at the wrist with motion arcs.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 400 px wide at s = 1. Motion from p.f only.

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
  const anim = p.anim ?? "wave";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue };
  const wave = anim === "wave" ? Math.sin(f * 0.2) * 14 : 0;
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const arcOp = anim === "wave" ? 0.55 + 0.45 * Math.abs(Math.sin(f * 0.2)) : 1;
  const G = 1.3;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <g transform={`rotate(${wave} 0 150)`}>
        <rect {...F("skin")} x={-95} y={-10} width={190} height={170} rx={70} />
        <rect {...F("skin")} x={-88} y={-170} width={40} height={200} rx={20} transform="rotate(-10 -68 20)" />
        <rect {...F("skin")} x={-42} y={-200} width={42} height={220} rx={21} transform="rotate(-3 -21 20)" />
        <rect {...F("skin")} x={4} y={-190} width={40} height={210} rx={20} transform="rotate(4 24 20)" />
        <rect {...F("skin")} x={44} y={-140} width={34} height={170} rx={17} transform="rotate(12 61 20)" />
        <rect {...F("skin")} x={-140} y={-10} width={62} height={130} rx={31} transform="rotate(-35 -110 90)" />
        <rect {...F("sleeve")} x={-70} y={150} width={140} height={120} rx={20} />
      </g>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G})`}>
        {layers(draw, col)}
        <g transform={`rotate(${wave} 0 150)`}>
          <path d="M -45 -110 L -45 10 M 2 -120 L 2 10 M 44 -70 L 44 10" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
          <rect x={-70} y={-150} width={12} height={90} rx={6} fill="#FFFFFF" opacity={0.45} transform="rotate(-10 -64 -105)" />
        </g>
        <g fill="none" stroke={C.ink} strokeWidth={13} strokeLinecap="round" opacity={arcOp}>
          <path d="M 170 -150 Q 205 -110 170 -70 M 215 -190 Q 275 -120 215 -50" />
          <path d="M -200 -150 Q -235 -110 -200 -70 M -245 -190 Q -305 -120 -245 -50" />
        </g>
      </g>
    </g>
  );
}
