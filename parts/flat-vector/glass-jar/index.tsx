import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Glass jar: mason-style storage jar with a metal screw lid. fill = none (empty), beans, pasta or cookies.
// Contents are placed so they stay inside the glass. Origin = bottom centre (resting point).
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const GLASS = "#B8DDEE";
const BEANS: [number, number, number][] = [
  [-60, -250, 20], [-20, -240, -30], [24, -246, 15], [60, -236, 40], [-44, -200, -10], [2, -196, 25],
  [46, -198, -20], [-70, -150, 35], [-24, -156, -15], [20, -150, 10], [66, -156, -35], [-50, -100, 5],
  [0, -104, -25], [44, -102, 30], [-22, -54, 15], [24, -56, -10],
];
const PASTA: [number, number, number][] = [
  [-60, -246, 30], [-24, -250, -20], [14, -244, 12], [52, -248, -30], [-42, -190, -40], [-6, -196, 18],
  [30, -192, -12], [66, -190, 40], [-64, -136, 10], [-28, -128, -25], [8, -134, 35], [44, -132, -8],
  [-40, -80, 22], [6, -76, -18], [50, -82, 6],
];
const COOKIES: [number, number][] = [[-40, -60], [40, -60], [0, -112], [-40, -168], [40, -168], [0, -224]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const lid = p.color && p.color !== "none" ? p.color : C.red;
  const fill: string = p.fill ?? "none";

  let contents: React.ReactNode = null;
  if (fill === "beans") {
    contents = BEANS.map(([cx, cy, r], i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={17} ry={11} fill={["#8A5A3C", "#5E3B26", "#7A3B2A"][i % 3]} transform={`rotate(${r} ${cx} ${cy})`} />
    ));
  } else if (fill === "pasta") {
    contents = PASTA.map(([cx, cy, r], i) => (
      <g key={i} transform={`rotate(${r} ${cx} ${cy})`}>
        <rect x={cx - 7} y={cy - 28} width={14} height={56} rx={7} fill="#F2C94C" />
        <rect x={cx - 2} y={cy - 22} width={3} height={44} rx={1.5} fill="#D9A92E" />
      </g>
    ));
  } else if (fill === "cookies") {
    contents = COOKIES.map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={40} fill="#E0A77C" />
        <circle cx={cx - 12} cy={cy - 8} r={6} fill="#5E3B26" />
        <circle cx={cx + 10} cy={cy + 6} r={6} fill="#5E3B26" />
        <circle cx={cx + 2} cy={cy - 18} r={4} fill="#5E3B26" />
      </g>
    ));
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* glass body */}
        <path d="M -108 -318 L -108 -28 Q -108 0 -80 0 L 80 0 Q 108 0 108 -28 L 108 -318 Z" fill={GLASS} />
        {contents}
        {/* glass highlights */}
        <rect x={-92} y={-300} width={14} height={260} rx={7} fill="#FFFFFF" opacity={0.55} />
        <rect x={82} y={-290} width={8} height={240} rx={4} fill="#FFFFFF" opacity={0.3} />
        {/* screw neck and metal lid */}
        <rect x={-100} y={-326} width={200} height={12} rx={4} fill={shade(GLASS, 0.1)} />
        <rect x={-116} y={-360} width={232} height={38} rx={14} fill={lid} />
        <rect x={-116} y={-334} width={232} height={12} rx={6} fill={shade(lid, 0.2)} />
      </g>
    </g>
  );
}
