import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wide oval lake with reeds on the near shore and a far shore of trees. Origin = centre of the near edge. About 1000 px wide and 420 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const col = (v: any, d: string) => (v && v !== "none" ? v : d);
const TREES: [number, number, number][] = [[-390, -395, 72], [-260, -420, 88], [-110, -395, 74], [40, -432, 96], [190, -405, 80], [330, -415, 88], [440, -385, 66]];
const REEDS: [number, number, number, number][] = [[-436, -150, 10, 120], [-448, -120, -8, 140], [-420, -132, 6, 100], [436, -150, -10, 120], [448, -118, 8, 140], [420, -132, -6, 100]];
const SHIMMER: [number, number, number, number][] = [[-250, -200, -170, -200], [60, -150, 170, -150], [-120, -110, -40, -110], [200, -230, 280, -230], [-300, -260, -240, -260]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const water = col(p.color, "#4AA3D9");
  const trees = col(p.color2, C.greenDark);
  const anim: string = p.anim ?? "none";
  const shim = anim === "flow" ? Math.sin(f / 30) * 12 : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={480} ry={16} fill={C.shadow} />
        {/* far shore: trees on grass */}
        <rect x={-500} y={-340} width={1000} height={60} fill={C.green} />
        {TREES.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={trees} />)}
        {/* near shore grass */}
        <ellipse cx={0} cy={-160} rx={500} ry={160} fill={C.green} />
        {/* lake */}
        <ellipse cx={0} cy={-160} rx={420} ry={112} fill={water} />
        <ellipse cx={-120} cy={-196} rx={260} ry={14} fill={shade(water, -0.3)} opacity={0.4} />
        <g transform={`translate(${f1(shim)} 0)`}>
          {SHIMMER.map(([x1, y1, x2, y2], i) => (
            <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={C.white} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
          ))}
        </g>
        {/* reeds */}
        {REEDS.map(([bx, by, dx, h], i) => (
          <g key={i}>
            <path d={`M ${bx} ${by} L ${bx + dx} ${by - h}`} stroke={C.green} strokeWidth={6} strokeLinecap="round" />
            <ellipse cx={bx + dx} cy={by - h} rx={6} ry={16} fill={C.brown} />
          </g>
        ))}
      </g>
    </g>
  );
}
