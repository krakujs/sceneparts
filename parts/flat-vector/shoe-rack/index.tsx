import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Shoe rack: two-tier open wooden rack with pairs of plain shoes standing on each shelf (side view, toes to the right).
// Origin = bottom centre; faces the viewer, honours flip, s and anim. Room scale.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/** One plain shoe, side view, sole resting on y = base. */
const Shoe = ({ cx, base, c, far }: { cx: number; base: number; c: string; far?: boolean }) => {
  const dk = shade(c, 0.2);
  const sole = far ? shade(C.ink, 0.1) : C.ink;
  return (
    <g>
      <rect x={cx - 66} y={base - 18} width={132} height={18} rx={8} fill={sole} />
      <path d={`M ${cx - 62} ${base - 18} L ${cx - 62} ${base - 104} Q ${cx - 60} ${base - 116} ${cx - 44} ${base - 114} L ${cx - 16} ${base - 110} Q ${cx + 12} ${base - 92} ${cx + 44} ${base - 84} L ${cx + 66} ${base - 70} L ${cx + 66} ${base - 18} Z`} fill={far ? dk : c} />
      <rect x={cx + 14} y={base - 60} width={52} height={12} rx={6} fill={far ? c : dk} opacity={0.6} />
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const dk = shade(wood, 0.2);
  const c1 = p.color2 && p.color2 !== "none" ? p.color2 : C.red;
  const top = -330, low = -90;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={420} ry={18} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* side posts and feet */}
        <rect x={-376} y={-600} width={26} height={600} rx={8} fill={dk} />
        <rect x={350} y={-600} width={26} height={600} rx={8} fill={dk} />
        <rect x={-392} y={-22} width={70} height={22} rx={10} fill={dk} />
        <rect x={322} y={-22} width={70} height={22} rx={10} fill={dk} />
        {/* top board */}
        <rect x={-400} y={-620} width={800} height={26} rx={10} fill={wood} />
        {/* shelves */}
        <rect x={-380} y={top} width={760} height={22} rx={8} fill={wood} />
        <rect x={-380} y={low} width={760} height={22} rx={8} fill={wood} />
        <rect x={-380} y={top + 22} width={760} height={8} fill={dk} opacity={0.6} />
        <rect x={-380} y={low + 22} width={760} height={8} fill={dk} opacity={0.6} />
        {/* upper tier: two pairs */}
        <Shoe cx={-250} base={top} c={c1} far />
        <Shoe cx={-170} base={top} c={c1} />
        <Shoe cx={60} base={top} c={C.blue} far />
        <Shoe cx={140} base={top} c={C.blue} />
        {/* lower tier: two pairs */}
        <Shoe cx={-250} base={low} c={C.greyDark} far />
        <Shoe cx={-170} base={low} c={C.greyDark} />
        <Shoe cx={60} base={low} c={C.brown} far />
        <Shoe cx={140} base={low} c={C.brown} />
      </g>
    </g>
  );
}
