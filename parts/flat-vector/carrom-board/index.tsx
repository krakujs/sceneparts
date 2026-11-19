import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Square carrom board seen from the front and above: the board is a trapezoid on screen, with pockets in
// the four corners, a centre circle, coins and a striker. Origin = centre of the board. About 760 px wide.
const f1 = (v: number) => v.toFixed(1);
const W = 760, H = 760 * 0.62; // near width, depth on screen
const TOP = -H / 2, BOT = H / 2;
const FAR = 0.72; // far edge width as a fraction of the near edge
// Board coordinates (u, v) in [-1, 1]; v = -1 far edge, +1 near edge.
const proj = (u: number, v: number): [number, number] => {
  const t = (v + 1) / 2;
  const half = (W / 2) * (FAR + (1 - FAR) * t);
  return [u * half, TOP + t * (BOT - TOP)];
};
const scaleAt = (v: number) => 0.7 + 0.3 * ((v + 1) / 2);
const coin = (u: number, v: number, col: string, key: string) => {
  const [px, py] = proj(u, v);
  const sc = scaleAt(v);
  return (
    <g key={key} transform={`translate(${f1(px)} ${f1(py)}) scale(${f1(sc)} ${f1(sc * 0.6)})`}>
      <circle cx={0} cy={8} r={34} fill={shade(col, 0.35)} />
      <circle cx={0} cy={0} r={34} fill={col} />
      <circle cx={0} cy={0} r={18} fill={shade(col, 0.12)} opacity={0.6} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1320;
  const surface = p.color && p.color !== "none" ? p.color : C.skyDeep;
  const red = p.accent && p.accent !== "none" ? p.accent : C.red;
  const anim: string = p.anim ?? "none";
  const edge = shade(surface, 0.3);
  // Striker slides from near edge towards the coins during "strike".
  const sk = anim === "strike" ? Math.min(1, Math.max(0, (f % 60 - 10) / 30)) : 0;
  const strikerV = 0.85 - sk * 1.1;
  const pockets: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  const coins: [number, number, string][] = [
    [0, 0, red], [-0.18, -0.12, C.paper], [0.2, -0.1, C.paper], [0.05, 0.25, red], [-0.22, 0.2, C.paper], [0.3, 0.3, red],
    [-0.08, -0.45, C.paper], [0.4, -0.3, red],
  ];
  const bobY = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6 : 0;
  const popS = anim === "pop" ? (() => { const tt = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (tt - 1) ** 3 + c1 * (tt - 1) ** 2; })() : 1;
  const [sx, sy] = proj(0, strikerV);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={`translate(0 ${f1(bobY)}) scale(${f1(popS)})`}>
        {/* board edge (thickness) */}
        <polygon points={`${f1(proj(-1, -1)[0] - 20)},${f1(TOP - 20)} ${f1(proj(1, -1)[0] + 20)},${f1(TOP - 20)} ${f1(proj(1, 1)[0] + 26)},${f1(BOT + 26)} ${f1(proj(-1, 1)[0] - 26)},${f1(BOT + 26)}`} fill={edge} />
        {/* playing surface */}
        <polygon points={[proj(-1, -1), proj(1, -1), proj(1, 1), proj(-1, 1)].map(([a, b]) => `${f1(a)},${f1(b)}`).join(" ")} fill={surface} />
        {/* border line */}
        <polygon points={[proj(-0.9, -0.9), proj(0.9, -0.9), proj(0.9, 0.9), proj(-0.9, 0.9)].map(([a, b]) => `${f1(a)},${f1(b)}`).join(" ")} fill="none" stroke={shade(surface, 0.18)} strokeWidth={6} />
        {/* centre circle */}
        <ellipse cx={0} cy={f1(proj(0, 0)[1])} rx={f1(W * 0.13)} ry={f1(H * 0.13)} fill="none" stroke={shade(surface, 0.2)} strokeWidth={6} />
        {/* corner pockets */}
        {pockets.map(([u, v], i) => {
          const [px, py] = proj(u, v);
          return <ellipse key={i} cx={f1(px)} cy={f1(py)} rx={44 * scaleAt(v)} ry={26 * scaleAt(v)} fill={C.ink} />;
        })}
        {coins.map(([u, v, col], i) => coin(u, v, col, `c${i}`))}
        {/* striker */}
        {coin(0, strikerV, C.blue, "striker")}
      </g>
    </g>
  );
}
