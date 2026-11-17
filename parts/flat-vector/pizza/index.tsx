import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { Dish } from "../dish/index";

// Flat vector whole pizza on a wooden board, seen from slightly above. One slice is pulled out with a cheese strand.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 520 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const RY = 0.34; // vertical squash for the view from above
const pol = (a: number, r: number): [number, number] => [Math.cos(a) * r, Math.sin(a) * r * RY];
/** Sector of the pizza in unit space, squashed to an ellipse of radius R. */
const sector = (a1: number, a2: number, R: number, ox: number, oy: number) => {
  const [x1, y1] = pol(a1, R), [x2, y2] = pol(a2, R);
  return `M ${f1(ox)} ${f1(oy)} L ${f1(ox + x1)} ${f1(oy + y1)} A ${f1(R)} ${f1(R * RY)} 0 0 1 ${f1(ox + x2)} ${f1(oy + y2)} Z`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Pizza(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const R = 214;
  const cy = -0.17 * 540; // centre of the board surface
  const cutA0 = -Math.PI * 0.62, cutA1 = -Math.PI * 0.38; // missing slice, upper right
  const pulledDx = 120, pulledDy = -40;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const slices: [number, number][] = [[-Math.PI * 0.62 + 0.0, -Math.PI * 0.38], [-Math.PI * 0.38, -Math.PI * 0.12], [-Math.PI * 0.12, Math.PI * 0.12], [Math.PI * 0.12, Math.PI * 0.38], [Math.PI * 0.38, Math.PI * 0.62], [Math.PI * 0.62, Math.PI * 0.88], [Math.PI * 0.88, Math.PI * 1.12], [Math.PI * 1.12, Math.PI * 1.38]];
  const peps: [number, number][] = [[-0.45, 0.3], [0.25, 0.35], [-0.1, -0.2], [0.55, -0.1], [-0.7, -0.05], [0.0, 0.6], [-0.35, 0.7], [0.8, 0.25], [0.45, 0.6]];
  const greens: [number, number][] = [[-0.2, 0.05], [0.35, -0.4], [-0.55, 0.45], [0.1, 0.2]];

  // pizza body: crust ring, cheese base, then the same sectors (minus the cut slice) on top
  const sliceEls = (a1: number, a2: number, ox: number, oy: number, key: string) => (
    <g key={key}>
      <path d={sector(a1, a2, R, ox, oy + cy)} fill={C.yellow} />
      <path d={sector(a1, a2, R * 0.9, ox, oy + cy)} fill="#FFD76A" />
    </g>
  );
  const keep = slices.filter(([a1]) => !(Math.abs(a1 - cutA0) < 0.01));

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={tr}>
        <Dish x={0} y={0} vessel="board" w={540} fill="none" />
        {/* crust ring */}
        <ellipse cx={0} cy={cy} rx={R} ry={R * RY} fill={C.brown} />
        {/* cut slice gap shows the board: draw remaining slices on top of the crust */}
        {keep.map(([a1, a2], i) => sliceEls(a1, a2, 0, 0, "s" + i))}
        {/* pepperoni */}
        {peps.map(([u, v], i) => {
          const px = u * R * 0.75, py = cy + v * R * RY * 0.8;
          return (
            <g key={"p" + i}>
              <circle cx={px} cy={py} r={21} fill={C.red} />
              <circle cx={px - 7} cy={py - 7} r={5} fill="#FFFFFF" opacity={0.35} />
            </g>
          );
        })}
        {greens.map(([u, v], i) => (
          <ellipse key={"g" + i} cx={u * R * 0.7} cy={cy + v * R * RY * 0.8} rx={14} ry={7} fill={C.green} transform={`rotate(${f1(i * 40 - 30)} ${f1(u * R * 0.7)} ${f1(cy + v * R * RY * 0.8)})`} />
        ))}
        {/* pulled slice: lifted up and right, with a cheese strand back to the pizza */}
        <path d={`M ${f1(R * 0.15)} ${f1(cy - 20)} Q ${f1(pulledDx * 0.55)} ${f1(cy - 60)} ${f1(pulledDx)} ${f1(cy + pulledDy + 40)}`} stroke={C.yellow} strokeWidth={9} strokeLinecap="round" fill="none" />
        <g transform={`translate(${f1(pulledDx)} ${f1(cy + pulledDy)}) rotate(-18)`}>
          <path d={sector(cutA0, cutA1, R, 0, 0)} fill={shade(C.yellow, 0.08)} />
          <path d={sector(cutA0, cutA1, R * 0.9, 0, 0)} fill={C.yellow} />
          <path d={sector(cutA0, cutA1, R * 0.9, 0, 0)} fill="none" />
          <circle cx={-R * 0.1} cy={-R * 0.05} r={24} fill={C.red} />
          <circle cx={R * 0.25} cy={-R * 0.12} r={22} fill={C.red} />
        </g>
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Pizza {...p} />;
}
