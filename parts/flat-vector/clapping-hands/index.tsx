import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector clapping hands: two chunky cartoon hands meeting in the middle with little motion lines.
// Die-cut white edge, soft shadow, one darker shade. Centre (x, y), about 450 px wide at s = 1. anim "clap" moves the hands together.

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
  const anim = p.anim ?? "clap";
  const col: Cols = { skin: skinColour(p.skin ?? "#FFC83D"), sleeve: p.color ?? C.blue };
  const cl = anim === "clap" ? Math.abs(Math.sin(f * 0.25)) * 18 : 0;
  const bob = anim === "bob" ? Math.sin(f * 0.12) * 8 : 0;
  const G = 0.9;
  const L = `translate(${-105 + cl} 40) rotate(24)`;
  const R = `translate(${105 - cl} 40) scale(-1 1) rotate(24)`;
  const hand = (c: (k: string) => string, sw: number) => {
    const F = (kk: string) => ({ fill: c(kk), stroke: sw ? c(kk) : "none", strokeWidth: sw, strokeLinejoin: "round" as const });
    return (
      <>
        <rect {...F("skin")} x={-72} y={-10} width={144} height={170} rx={56} />
        <rect {...F("skin")} x={-64} y={-150} width={34} height={200} rx={17} />
        <rect {...F("skin")} x={-26} y={-182} width={36} height={230} rx={18} />
        <rect {...F("skin")} x={12} y={-168} width={34} height={210} rx={17} />
        <rect {...F("skin")} x={46} y={-120} width={28} height={170} rx={14} />
        <rect {...F("skin")} x={-100} y={30} width={44} height={120} rx={22} transform="rotate(-28 -78 90)" />
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
    <path d="M -29 -100 L -29 0 M 11 -120 L 11 0 M 45 -80 L 45 0" fill="none" stroke={cr} strokeWidth={7} strokeLinecap="round" />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s * k})`}>
      <g transform={`translate(0 ${bob}) scale(${G})`}>
        {layers(draw, col)}
        <g transform={L}>{creases}</g>
        <g transform={R}>{creases}</g>
        <g fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" opacity={0.55 + 0.45 * Math.abs(Math.sin(f * 0.25))}>
          <path d="M -250 -130 L -292 -160 M -272 -50 L -322 -56 M -250 20 L -290 44" />
          <path d="M 250 -130 L 292 -160 M 272 -50 L 322 -56 M 250 20 L 290 44" />
        </g>
      </g>
    </g>
  );
}
