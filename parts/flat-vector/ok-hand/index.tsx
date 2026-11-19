import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector OK hand: thumb and index finger make a ring, three fingers stand up. Reads as okay / perfect.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 380 px wide at s = 1. Motion from p.f only.

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
  const G = 1.15;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <circle cx={-30} cy={-60} r={78} fill="none" stroke={c("skin")} strokeWidth={52 + sw} />
        <rect {...F("skin")} x={40} y={-60} width={150} height={190} rx={60} />
        <rect {...F("skin")} x={62} y={-200} width={38} height={210} rx={19} />
        <rect {...F("skin")} x={106} y={-220} width={38} height={230} rx={19} />
        <rect {...F("skin")} x={150} y={-190} width={36} height={200} rx={18} />
        <rect {...F("sleeve")} x={60} y={120} width={130} height={130} rx={20} />
      </>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G * pulse})`}>
        {layers(draw, col)}
        <path d="M 103 -110 L 103 -10 M 147 -120 L 147 -10 M 60 -10 L 60 40" fill="none" stroke={cr} strokeWidth={8} strokeLinecap="round" />
        <rect x={-96} y={-120} width={12} height={70} rx={6} fill="#FFFFFF" opacity={0.45} transform="rotate(-40 -90 -85)" />
      </g>
    </g>
  );
}
