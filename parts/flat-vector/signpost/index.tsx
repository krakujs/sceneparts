import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wooden signpost with three blank arrow boards, pointing alternately right, left and right. Origin = bottom centre;
// the concrete foot stands on y. About 640 px wide and 930 px tall at s = 1.
// anim "lights": the reflector studs on the boards flash one after another. "pop" scales in.
const f1 = (v: number) => v.toFixed(1);
const popScale = (anim: string, f: number) => {
  if (anim !== "pop") return 1;
  const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
// Arrow board centred on (cx, cy); dir +1 points right, -1 points left.
const arrow = (dir: number, cx: number, cy: number, w: number, h: number) => {
  const l = cx - w / 2, r = cx + w / 2, t = cy - h / 2, b = cy + h / 2, tip = h / 2;
  const pts = dir > 0
    ? [[l, t], [r - tip, t], [r, cy], [r - tip, b], [l, b]]
    : [[r, t], [l + tip, t], [l, cy], [l + tip, b], [r, b]];
  return `M ${pts.map(([px, py]) => `${f1(px)} ${f1(py)}`).join(" L ")} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const board = p.color && p.color !== "none" ? p.color : C.blue;
  const wood = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  const boards = [
    { dir: 1, cy: -800 },
    { dir: -1, cy: -690 },
    { dir: 1, cy: -580 },
  ];
  const bw = 300, bh = 80;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={230} ry={14} fill={C.shadow} />
      <g transform={`scale(${f1(popScale(anim, f))})`}>
        <rect x={-70} y={-50} width={140} height={50} rx={8} fill={C.greyDark} />
        <rect x={-22} y={-900} width={44} height={860} rx={6} fill={wood} />
        <rect x={-22} y={-900} width={8} height={860} fill={shade(wood, 0.2)} />
        <path d="M -26 -900 L 0 -930 L 26 -900 Z" fill={shade(wood, 0.2)} />
        {boards.map((b, bi) => {
          const cx = b.dir * (20 + bw / 2);
          return (
            <g key={bi}>
              <path d={arrow(b.dir, cx, b.cy, bw, bh)} fill={board} />
              <path d={arrow(b.dir, cx, b.cy, bw * 0.84, bh * 0.7)} fill={C.white} opacity={0.95} />
              {[-100, 0, 100].map((dx, k) => {
                const idx = bi * 3 + k;
                const on = anim === "lights" && Math.floor(f / 6) % 9 === idx;
                return <circle key={k} cx={cx + dx * b.dir} cy={b.cy} r={7} fill={on ? C.yellow : C.greyLight} />;
              })}
            </g>
          );
        })}
      </g>
    </g>
  );
}
