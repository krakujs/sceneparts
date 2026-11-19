import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Stack of four or five books, each a little narrower and shorter, offset slightly, with cream page edges.
// Optional red apple on top. Origin = bottom centre (the bottom book rests on y). About 480 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";
const W = [460, 420, 400, 340, 300];
const H = [96, 84, 74, 66, 60];
const OFF = [0, -22, 24, -12, 18];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const first = p.color && p.color !== "none" ? p.color : C.blue;
  const cols = [first, C.teal, C.yellow, C.pink, C.purple];
  const count = Math.max(4, Math.min(5, Math.round(p.count ?? 5)));
  const anim: string = p.anim ?? "none";
  let cy = 0;
  let topX = 0;
  const books: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const w = W[i], h = H[i], ox = OFF[i], c = cols[i];
    const top = cy - h;
    books.push(
      <g key={i}>
        <rect x={ox - w / 2} y={top} width={w} height={h} rx={8} fill={c} />
        {/* page edges on the right */}
        <rect x={ox + w / 2 - 30} y={top + 10} width={20} height={h - 20} rx={4} fill={C.paper} />
        <rect x={ox + w / 2 - 30} y={top + h / 2 - 2} width={20} height={4} fill={shade(C.paper, 0.15)} />
        {/* spine band and top highlight */}
        <rect x={ox - w / 2} y={top + h * 0.34} width={w - 30} height={9} fill={shade(c, 0.22)} />
        <rect x={ox - w / 2 + 8} y={top + 4} width={w - 46} height={5} rx={2.5} fill={C.white} opacity={0.22} />
      </g>,
    );
    topX = ox;
    cy = top;
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {books}
        {p.apple && (
          <g transform={`translate(${f1(topX + 14)} ${f1(cy - 44)})`}>
            <rect x={-3} y={-74} width={6} height={26} rx={3} fill={C.brownDark} />
            <path d="M 4 -64 Q 34 -92 52 -70 Q 30 -56 4 -64 Z" fill={C.green} />
            <circle cx={0} cy={0} r={44} fill={C.red} />
            <path d="M 14 -30 A 40 40 0 0 1 36 6 A 40 40 0 0 1 14 -30 Z" fill={shade(C.red, 0.2)} />
            <circle cx={-16} cy={-16} r={8} fill={C.white} opacity={0.5} />
          </g>
        )}
      </g>
    </g>
  );
}
