import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector taco, side view: a half-moon yellow corn shell standing on its curve, open at the top,
// with ground meat, lettuce, tomato and cheese showing above the rim.
// Origin = resting point (bottom centre). Local units are px at s = 1 (about 400 px wide).

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Taco(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const anim = p.anim ?? "none";
  const x = p.x ?? 540, y = p.y ?? 1560;
  const shellC = p.shellColor ?? "#F5C542";
  const meatC = p.meatColor ?? "#8A4B2A";
  const cheese = p.cheese ?? true;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  const RX = 200, RY = 185, RIM = -185; // shell: lower half-ellipse centred on the rim line
  const lettuce: [number, number, number][] = [[-150, -150, 44], [-70, -168, 50], [10, -160, 48], [90, -170, 50], [158, -148, 42]];
  const tomato: [number, number][] = [[-100, -140], [-30, -158], [40, -140], [110, -150], [-55, -120], [75, -120]];
  const cheeseBits: [number, number][] = [[-120, -118], [-10, -128], [60, -110], [140, -120], [-80, -108]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={16} fill={C.shadow} />
      <g transform={tr}>
        <g transform="translate(0 -55)">
        {/* back half of the shell, seen above the filling */}
        <path d={`M ${-RX + 6} ${RIM + 55} Q 0 ${RIM - 60} ${RX - 6} ${RIM + 55} L ${RX - 22} ${RIM + 55} Q 0 ${RIM - 36} ${-RX + 22} ${RIM + 55} Z`} fill={shade(shellC, 0.12)} />
        {/* ground meat layer filling the open top */}
        <path d={`M ${-RX + 8} ${RIM + 6} Q ${-RX + 4} ${RIM - 40} 0 ${RIM - 78} Q ${RX - 4} ${RIM - 70} ${RX - 8} ${RIM + 6} Z`} fill={meatC} />
        {[[-100, -146, 14], [-40, -160, 12], [30, -150, 13], [96, -152, 12], [-10, -134, 9]].map(([mx, my, r], i) => (
          <circle key={i} cx={mx} cy={my} r={r} fill={shade(meatC, 0.3)} opacity={0.55} />
        ))}
        {cheese && cheeseBits.map(([cx, cy], i) => (
          <rect key={"c" + i} x={cx - 9} y={cy - 4} width={18} height={8} rx={3} fill="#FFE07A" transform={`rotate(${(i * 41) % 60 - 30} ${cx} ${cy})`} />
        ))}
        {tomato.map(([tx, ty], i) => (
          <rect key={"t" + i} x={tx - 9} y={ty - 9} width={18} height={18} rx={4} fill={C.red} transform={`rotate(${(i * 29) % 40 - 20} ${tx} ${ty})`} />
        ))}
        {/* frilly lettuce poking above the rim */}
        {lettuce.map(([lx, ly, lw], i) => (
          <g key={"l" + i}>
            <ellipse cx={lx} cy={ly} rx={lw / 2} ry={22} fill={i % 2 ? C.greenDark : C.green} />
            <ellipse cx={lx - 6} cy={ly - 6} rx={lw / 4} ry={8} fill="#FFFFFF" opacity={0.15} />
          </g>
        ))}
        </g>
        {/* shell: half-moon, curved bottom at y 0, open top at the rim */}
        <path d={`M ${-RX} ${RIM} A ${RX} ${RY} 0 0 0 ${RX} ${RIM} Z`} fill={shellC} />
        {/* darker lower curve */}
        <path d={`M ${-RX} ${RIM} A ${RX} ${RY} 0 0 0 ${RX} ${RIM} A ${RX - 28} ${RY - 30} 0 0 1 ${-RX + 28} ${RIM} Z`} fill={shade(shellC, 0.22)} />
        {/* pale speckles */}
        {[[-120, -70], [-60, -32], [20, -40], [90, -85], [140, -120], [-150, -130], [0, -98], [60, -28]].map(([sx, sy], i) => (
          <circle key={"s" + i} cx={sx} cy={sy} r={i % 2 ? 4 : 6} fill="#FFF3B8" opacity={0.8} />
        ))}
        {/* front rim band where the shell opens */}
        <rect x={-RX - 4} y={RIM - 6} width={2 * RX + 8} height={12} rx={6} fill={shade(shellC, 0.12)} />
        <path d={`M ${-RX + 30} ${RIM + 40} Q -60 ${RIM + 70} 0 ${RIM + 70} Q 60 ${RIM + 70} ${RX - 30} ${RIM + 40}`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.25} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Taco {...p} />;
}
