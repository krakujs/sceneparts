import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector flexed arm: a big bicep, a thick forearm up and a fist at the top, in a sleeve. Strong, power, workout.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 400 px wide at s = 1. anim "flex" swells the bicep.

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
  const anim = p.anim ?? "flex";
  const sx = p.flip ? -1 : 1;
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.teal };
  const bulge = anim === "flex" ? Math.sin(f * 0.2) * 0.05 : 0;
  const pulse = anim === "pulse" ? 1 + Math.sin(f * 0.2) * 0.02 : 1;
  const G = 0.85;
  const bicepT = `translate(-120 60) scale(${1 + bulge}) translate(120 -60)`;
  const arm = "rotate(30 -40 200)";
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <rect {...F("sleeve")} x={-260} y={40} width={150} height={190} rx={40} />
        <g transform={arm}>
          <rect {...F("skin")} x={-100} y={-100} width={120} height={300} rx={60} />
          <rect {...F("skin")} x={-125} y={-265} width={170} height={170} rx={60} />
        </g>
        <ellipse {...F("skin")} cx={-120} cy={60} rx={110} ry={120} transform={bicepT} />
      </>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x - 20} ${y}) scale(${s * k * 1.35})`}>
      <g transform={`scale(${G * pulse * sx} ${G * pulse})`}>
        {layers(draw, col)}
        <g transform={arm}>
          <path d="M -105 -225 Q -60 -215 -20 -225 M -105 -190 Q -60 -180 -20 -190" fill="none" stroke={cr} strokeWidth={8} strokeLinecap="round" />
        </g>
        <path d="M -200 -10 Q -160 -60 -100 -30" fill="none" stroke={cr} strokeWidth={8} strokeLinecap="round" transform={bicepT} />
        <ellipse cx={-190} cy={20} rx={16} ry={34} fill="#FFFFFF" opacity={0.45} transform={`rotate(-20 -190 20) ${bicepT}`} />
      </g>
    </g>
  );
}
