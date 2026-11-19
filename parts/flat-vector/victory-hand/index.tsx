import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector victory hand: index and middle finger spread in a V, the rest of the hand folded. Peace, victory, two.
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
  const anim = p.anim ?? "bob";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue };
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const pulse = anim === "pulse" ? 1 + Math.sin(f * 0.2) * 0.03 : 1;
  const G = 1.25;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <rect {...F("skin")} x={-140} y={-10} width={280} height={190} rx={80} />
        <rect {...F("skin")} x={-112} y={-250} width={62} height={280} rx={31} transform="rotate(-14 -81 30)" />
        <rect {...F("skin")} x={-2} y={-260} width={62} height={290} rx={31} transform="rotate(12 29 30)" />
        <rect {...F("skin")} x={-120} y={70} width={190} height={62} rx={31} />
        <rect {...F("sleeve")} x={-100} y={170} width={200} height={120} rx={20} />
      </>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G * pulse})`}>
        {layers(draw, col)}
        <path d="M -40 80 Q -30 100 -40 122 M 10 80 Q 20 100 10 122" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
        <rect x={-100} y={-200} width={12} height={120} rx={6} fill="#FFFFFF" opacity={0.45} transform="rotate(-14 -94 -140)" />
      </g>
    </g>
  );
}
