import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector thumbs-up: a chunky cartoon fist with the thumb up, die-cut white edge, soft shadow, one darker shade.
// Centre (x, y), about 400 px wide at s = 1. Idle motion (bob, pulse) comes only from p.f.
// flat-vector/thumbs-down reuses this drawing turned upside down (internal prop `down`).

type Cols = Record<string, string>;
// Die-cut stack: soft shadow, white sticker edge, one darker shade offset, then the colour pass.
function layers(draw: (c: (k: string) => string, sw: number) => React.ReactNode, col: Cols, sd = 1) {
  const mono = (v: string) => () => v;
  return (
    <>
      <g opacity={0.16} transform={`translate(0 ${16 * sd})`}>{draw(mono(C.ink), 32)}</g>
      {draw(mono("#FFFFFF"), 32)}
      <g transform={`translate(0 ${10 * sd})`}>{draw((k) => shade(col[k], 0.18), 0)}</g>
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
  const G = 1.2;
  const draw = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <g>
        <rect {...F("skin")} x={-150} y={-60} width={300} height={250} rx={92} />
        <rect {...F("skin")} x={-150} y={-250} width={136} height={232} rx={68} />
        <rect {...F("sleeve")} x={-118} y={170} width={236} height={130} rx={24} />
      </g>
    );
  };
  const cr = shade(col.skin, 0.25);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G * pulse})${p.down ? " rotate(180)" : ""}`}>
        {layers(draw, col, p.down ? -1 : 1)}
        <g fill="none" stroke={cr} strokeWidth={9} strokeLinecap="round">
          <path d="M -20 60 Q 50 70 130 58 M -20 128 Q 50 138 130 126" />
          <path d="M -105 -206 Q -88 -232 -66 -214" strokeWidth={8} />
        </g>
        <rect x={-128} y={-150} width={18} height={80} rx={9} fill="#FFFFFF" opacity={0.55} />
        <rect x={-124} y={-30} width={14} height={130} rx={7} fill="#FFFFFF" opacity={0.4} />
      </g>
    </g>
  );
}
