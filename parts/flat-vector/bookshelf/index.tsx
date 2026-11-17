import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Bookshelf: tall open unit with four shelves, each filled with coloured book spines (no text), and a small
// potted plant on the top shelf. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const SPINES = [C.red, C.blue, C.teal, C.yellow, C.pink, C.purple, C.green, C.orange, C.navy, C.skyDeep];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.brown;
  const dk = shade(c, 0.2);
  const W = 230, H = 1000, top = -H;
  const shelfH = 230; // height of each bay
  // spine widths pattern per bay (deterministic, no randomness)
  const spineRows: React.ReactNode[] = [];
  for (let bay = 0; bay < 4; bay++) {
    const by = top + 24 + bay * shelfH;
    let xx = -W + 22;
    const widths = [30, 40, 26, 36, 44, 28, 34, 40, 30, 36, 26, 42];
    let k = bay * 3;
    while (xx < W - 30) {
      const w = widths[k % widths.length];
      const h = (shelfH - 40) - ((k * 37) % 40);
      if (xx + w > W - 22) break;
      spineRows.push(<rect key={`${bay}-${k}`} x={xx} y={by + shelfH - 30 - h} width={w - 4} height={h} rx={5} fill={SPINES[k % SPINES.length]} />);
      xx += w; k++;
    }
    // a leaning book on the bay's right end
    spineRows.push(<rect key={`lean${bay}`} x={W - 80} y={by + shelfH - 200} width={34} height={170} rx={5} fill={SPINES[(bay + 3) % SPINES.length]} transform={`rotate(-8 ${W - 62} ${by + shelfH - 30})`} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={W + 30} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* feet */}
        <rect x={-W + 10} y={-30} width={36} height={30} rx={8} fill={dk} />
        <rect x={W - 46} y={-30} width={36} height={30} rx={8} fill={dk} />
        {/* back panel */}
        <rect x={-W} y={top} width={2 * W} height={H - 30} rx={14} fill={shade(c, 0.22)} />
        {/* bays */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-W + 14} y={top + 24 + i * shelfH} width={2 * W - 28} height={shelfH - 40} rx={6} fill={shade(c, 0.36)} />
        ))}
        {spineRows}
        {/* shelves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-W - 10} y={top + i * shelfH - 6 + (i === 4 ? 6 : 0)} width={2 * W + 20} height={22} rx={8} fill={c} />
        ))}
        {/* side panels in front */}
        <rect x={-W - 10} y={top} width={22} height={H - 30} rx={8} fill={c} />
        <rect x={W - 12} y={top} width={22} height={H - 30} rx={8} fill={dk} />
        {/* small potted plant on top shelf */}
        <rect x={-50} y={top - 90} width={100} height={70} rx={16} fill={C.orange} />
        <rect x={-54} y={top - 90} width={108} height={16} rx={8} fill={shade(C.orange, 0.2)} />
        <ellipse cx={-30} cy={top - 130} rx={34} ry={40} fill={C.green} />
        <ellipse cx={22} cy={top - 150} rx={36} ry={44} fill={C.greenDark} />
        <ellipse cx={0} cy={top - 110} rx={28} ry={30} fill={C.lime} />
      </g>
    </g>
  );
}
