import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade, skinColour } from "../style/index";

// Flat vector handshake, seen from the side. The left arm and hand reach in from the left with the
// thumb lying across the top; the right arm reaches in from the right and its fingers wrap down over the
// back of the left hand. Each piece (sleeve, hand, finger, thumb) gets its own darker shade, so the
// overlaps read as separate parts. Die-cut white edge and soft shadow, like praying-hands.
// Centre (x, y), about 830 px wide at s = 1. anim "shake" pumps up and down; "bob" gently lifts.

type Cols = Record<string, string>;
type Piece = { k: string; draw: (c: (k: string) => string, sw: number) => React.ReactNode };

// Rounded rectangle piece. sw > 0 adds a sticker edge of that width. Optional transform turns it.
const box = (x: number, y: number, w: number, h: number, rx: number, k: string, tf = ""): Piece => ({
  k,
  draw: (c, sw) => <rect x={x} y={y} width={w} height={h} rx={rx} fill={c(k)} stroke={sw ? c(k) : "none"} strokeWidth={sw} strokeLinejoin="round" transform={tf || undefined} />,
});

// Finger or thumb: a round-ended stroke of thickness t.
const digit = (x1: number, y1: number, x2: number, y2: number, t: number, k: string): Piece => ({
  k,
  draw: (c, sw) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c(k)} strokeWidth={t + sw} strokeLinecap="round" />,
});

// Freeform piece from a path (used for hands, so the wrist is narrower than the knuckles).
const shape = (d: string, k: string): Piece => ({
  k,
  draw: (c, sw) => <path d={d} fill={c(k)} stroke={sw ? c(k) : "none"} strokeWidth={sw} strokeLinejoin="round" />,
});

// Back to front. Left hand, then its sleeve; right hand, its sleeve; the right fingers wrap down over the
// left hand's back; the left thumb lies on top of the right hand last.
// Sleeves are angled so the arms come in diagonally from the lower left and lower right.
const LEFT_HAND = "M-340 -58 C-300 -62 -230 -96 -150 -100 C-90 -104 -40 -100 20 -92 C50 -88 60 -60 60 -20 C60 30 50 70 20 88 C-40 104 -120 100 -190 84 C-250 70 -300 66 -340 58 Z";
const RIGHT_HAND = "M340 -60 C300 -66 230 -96 150 -96 C90 -98 40 -100 -10 -88 C-40 -80 -48 -50 -46 -10 C-44 40 -30 70 0 84 C60 96 150 96 200 84 C260 70 300 66 340 58 Z";
const PIECES: Piece[] = [
  shape(LEFT_HAND, "skinL"),                      // left hand (back of the hand)
  box(-580, -78, 252, 156, 30, "sleeveL"),        // left forearm and sleeve, wrist at x = -330
  shape(RIGHT_HAND, "skinR"),                     // right hand (back of the hand)
  box(328, -78, 252, 156, 30, "sleeveR"),         // right forearm and sleeve, wrist at x = 330
  digit(-28, -52, -175, -28, 52, "skinR"),        // right fingers wrapping down over the left hand's back
  digit(-28, 0, -185, 24, 52, "skinR"),
  digit(-24, 52, -170, 76, 52, "skinR"),
  digit(-10, 100, -120, 118, 44, "skinR"),        // little finger
  digit(-150, -80, 30, -112, 52, "skinL"),        // left thumb lying across the top
];

// Piece-by-piece die-cut stack: sticker edge and shadow under everything, then each piece with its own shade.
function Sticker({ col }: { col: Cols }) {
  return (
    <>
      <g opacity={0.16} transform="translate(0 16)">{PIECES.map((p, i) => <g key={`s${i}`}>{p.draw(() => C.ink, 32)}</g>)}</g>
      {PIECES.map((p, i) => <g key={`e${i}`}>{p.draw(() => "#FFFFFF", 32)}</g>)}
      {PIECES.map((p, i) => (
        <g key={`p${i}`}>
          <g transform="translate(0 10)">{p.draw((k) => shade(col[k], 0.18), 0)}</g>
          {p.draw((k) => col[k], 0)}
        </g>
      ))}
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const SC = 0.72; // piece coordinates to px at s = 1

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  const anim = p.anim ?? "shake";
  const col: Cols = {
    sleeveL: p.color ?? C.blue,
    skinL: skinColour(p.skin ?? "fair"),
    sleeveR: p.color2 ?? C.teal,
    skinR: skinColour(p.skin2 ?? "brown"),
  };
  const ph = f * 0.3;
  const lift = anim === "shake" ? 12 * Math.sin(ph) : anim === "bob" ? 8 * Math.sin(f * 0.12) : 0;
  const tilt = anim === "shake" ? 2 * Math.sin(ph) : 0;
  return (
    <g transform={`translate(${x} ${y + lift}) rotate(${tilt}) scale(${s * k * SC})`}>
      <Sticker col={col} />
    </g>
  );
}
