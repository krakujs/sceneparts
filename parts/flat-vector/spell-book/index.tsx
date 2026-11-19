import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Spell book: a thick leather tome, open (two glowing pages) or closed (with a brass clasp).
// Origin = bottom centre. About 460 px wide at s = 1. Runes are original angular symbols.
const f1 = (v: number) => v.toFixed(1);
// Simple original rune strokes, drawn as polylines in a 40 px box.
const RUNES = [
  "M 0 -20 L 14 20 L -14 0 L 14 0",
  "M -12 -20 L -12 20 M -12 -20 L 12 -6 L -12 6",
  "M -14 20 L 0 -20 L 14 20 M -7 4 L 7 4",
  "M 0 -20 L 0 20 M -14 -6 L 14 6 M 14 -6 L -14 6",
];
const RUNE_SEEDS = [
  { x: -150, y: -330, r: 0 }, { x: 150, y: -360, r: 1 }, { x: 0, y: -420, r: 2 }, { x: 110, y: -250, r: 3 },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1.4, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const cover = p.color && p.color !== "none" ? p.color : C.brown;
  const open = (p.state ?? "open") !== "closed";
  const anim: string = p.anim ?? "none";
  const glow = 0.6 + 0.25 * Math.sin((f * 2 * Math.PI) / 60);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={250} ry={16} fill={C.shadow} />
      {open ? (
        <g>
          {/* cover boards */}
          <path d="M -230 -40 L -230 -170 L 0 -130 L 230 -170 L 230 -40 Z" fill={shade(cover, 0.2)} />
          {/* glowing pages */}
          <path d="M -210 -60 Q -120 -230 0 -120 Q 120 -230 210 -60 L 210 -60 L 0 -20 L -210 -60 Z" fill={C.paper} />
          <path d="M -210 -60 Q -120 -230 0 -120 L 0 -20 L -210 -60 Z" fill={shade(C.paper, 0.08)} />
          <path d="M -150 -90 Q -90 -170 -20 -110 M 20 -110 Q 90 -170 150 -90" stroke={C.yellow} strokeWidth={0} fill="none" />
          {/* runes floating above the pages */}
          <g opacity={glow}>
            <path d="M -170 -110 Q -120 -170 -60 -120 Q 0 -70 60 -120 Q 120 -170 170 -110" fill="none" stroke={C.yellow} strokeWidth={5} strokeLinecap="round" />
          </g>
          {RUNE_SEEDS.map((r) => {
            const drift = anim === "float" ? ((f + r.r * 20) % 80) / 80 : 0;
            const op = anim === "float" ? 1 - drift : 1;
            return (
              <g key={r.r} transform={`translate(${r.x} ${f1(r.y - drift * 60)}) scale(0.7)`} opacity={op} stroke={C.purple} strokeWidth={6} fill="none" strokeLinecap="round">
                <path d={RUNES[r.r]} />
              </g>
            );
          })}
        </g>
      ) : (
        <g>
          {/* closed book: pages edge, cover, clasp */}
          <rect x={-200} y={-120} width={400} height={120} rx={14} fill={C.paper} />
          <rect x={-200} y={-120} width={400} height={120} rx={14} fill="none" stroke={shade(C.paper, 0.15)} strokeWidth={0} />
          <rect x={-215} y={-150} width={430} height={150} rx={16} fill={cover} />
          <rect x={-215} y={-150} width={40} height={150} rx={12} fill={shade(cover, 0.25)} />
          <rect x={-40} y={-154} width={34} height={158} rx={6} fill={C.yellow} />
          <rect x={-190} y={-135} width={380} height={6} rx={3} fill={shade(cover, 0.2)} opacity={0.6} />
          {/* a faint rune glow on the cover */}
          <path d="M 80 -95 L 110 -70 L 80 -45 M 110 -70 L 140 -70" fill="none" stroke={C.yellow} strokeWidth={6} strokeLinecap="round" opacity={glow} />
        </g>
      )}
    </g>
  );
}
