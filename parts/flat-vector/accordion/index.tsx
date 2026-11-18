import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Accordion seen from the front, held closed-ish: a button panel on the left, a piano keyboard panel on
// the right and pleated bellows between them. anim "squeeze" closes and opens the bellows, moving the panels.
// Origin = bottom centre. About 640 px wide and 480 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};
const H = 170;   // half-width of the bellows when open
const PLEATS = 8;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const panel = p.color && p.color !== "none" ? p.color : C.red;
  const trim = p.accent && p.accent !== "none" ? p.accent : C.yellow;
  const anim: string = p.anim ?? "none";
  const k = anim === "squeeze" ? 1 - 0.3 * (0.5 - 0.5 * Math.cos((f * 2 * Math.PI) / 60)) : 1;
  const close = (1 - k) * H;
  const top = -470, bottom = -40;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={330} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* bellows, squeezed horizontally about the centre */}
        <g transform={`translate(0 0) scale(${f1(k)} 1)`}>
          <rect x={-H - 20} y={top + 60} width={2 * H + 40} height={bottom - top - 120} rx={10} fill={shade(panel, 0.25)} />
          {Array.from({ length: PLEATS }, (_, i) => {
            const w = (2 * H) / PLEATS;
            return (
              <rect key={i} x={-H + i * w} y={top + 40} width={w} height={bottom - top - 80} rx={4} fill={i % 2 ? shade(panel, 0.1) : C.sand} />
            );
          })}
          <rect x={-H - 6} y={top + 40} width={2 * H + 12} height={14} rx={6} fill={shade(panel, 0.35)} />
          <rect x={-H - 6} y={bottom - 54} width={2 * H + 12} height={14} rx={6} fill={shade(panel, 0.35)} />
        </g>
        {/* left: button panel, moves right as the bellows close */}
        <g transform={`translate(${f1(close)} 0)`}>
          <rect x={-H - 210} y={top} width={190} height={bottom - top} rx={26} fill={panel} />
          <rect x={-H - 190} y={top + 20} width={150} height={20} rx={8} fill={shade(panel, 0.3)} />
          {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
            <circle key={`${r}-${c}`} cx={-H - 160 + c * 50} cy={top + 90 + r * 60} r={17} fill={(r + c) % 2 ? trim : C.white} />
          )))}
        </g>
        {/* right: keyboard panel, moves left as the bellows close */}
        <g transform={`translate(${f1(-close)} 0)`}>
          <rect x={H + 20} y={top} width={190} height={bottom - top} rx={26} fill={panel} />
          <rect x={H + 40} y={top + 20} width={150} height={20} rx={8} fill={shade(panel, 0.3)} />
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <rect x={H + 40 + i * 14} y={top + 70} width={13} height={bottom - top - 110} rx={3} fill={C.white} />
              {[0, 1, 3, 4, 5, 7, 8].includes(i % 9) && (
                <rect x={H + 40 + i * 14 + 8} y={top + 70} width={9} height={100} rx={2} fill={C.ink} />
              )}
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
