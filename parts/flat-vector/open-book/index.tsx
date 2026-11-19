import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Open book lying flat, seen from slightly above: a coloured cover with two cream pages and grey text lines.
// Origin = bottom centre (the book rests on y). About 840 x 300 px at s = 1.
// anim "flip": the right page turns over onto the left and back, a loop of 120 frames.
const f1 = (v: number) => v.toFixed(1);
const PAPER = "#F4F1EA";
const BACK = "#E6DECB";
const LINE = C.grey;

// Text lines for one page: x0 is the page's left text edge; lines run to the right.
const Lines = ({ x0 }: { x0: number }) => {
  const widths = [250, 230, 262, 200, 240, 172, 220];
  return (
    <g>
      {widths.map((w, i) => (
        <rect key={i} x={x0} y={-226 + i * 30} width={w} height={9} rx={4} fill={LINE} opacity={0.7} />
      ))}
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cover = p.color && p.color !== "none" ? p.color : "#7B5CD6";
  const anim: string = p.anim ?? "none";
  // Page angle: 0 = lying on the right, PI = lying on the left, eased in and out.
  const phase = (f % 120) / 120;
  const a = anim === "flip" ? (Math.PI * (1 - Math.cos(2 * Math.PI * phase))) / 2 : 0;
  const k = Math.cos(a);
  const back = k < 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-2} rx={430} ry={16} fill={C.shadow} />
      {/* cover: an outline slightly larger than the pages */}
      <path d="M -420 -6 Q -420 -292 -230 -292 Q -110 -292 0 -248 Q 110 -292 230 -292 Q 420 -292 420 -6 Q 210 -34 0 -2 Q -210 -34 -420 -6 Z" fill={cover} />
      <path d="M -420 -6 Q -420 -292 -230 -292 Q -110 -292 0 -248" fill="none" stroke={shade(cover, 0.2)} strokeWidth={6} opacity={0.5} />
      {/* left page */}
      <path d="M -16 -246 Q -120 -282 -224 -276 Q -320 -272 -386 -258 L -386 -24 Q -320 -40 -224 -40 Q -120 -40 -16 -10 Z" fill={PAPER} />
      <Lines x0={-340} />
      {/* right page underneath (the next page) */}
      <path d="M 16 -246 Q 120 -282 224 -276 Q 320 -272 386 -258 L 386 -24 Q 320 -40 224 -40 Q 120 -40 16 -10 Z" fill={PAPER} />
      <g transform="translate(70 0)">
        <Lines x0={0} />
      </g>
      {/* gutter shadow */}
      <rect x={-14} y={-250} width={28} height={240} rx={8} fill={shade(cover, 0.35)} opacity={0.55} />
      {/* turning page: its width is cos(angle), so it flattens and flips over the spine */}
      <g transform={`scale(${f1(k)} 1)`}>
        <path d="M 16 -246 Q 120 -282 224 -276 Q 320 -272 386 -258 L 386 -24 Q 320 -40 224 -40 Q 120 -40 16 -10 Z" fill={back ? BACK : PAPER} />
        {!back && (
          <g transform="translate(70 0)">
            <Lines x0={0} />
          </g>
        )}
      </g>
    </g>
  );
}
