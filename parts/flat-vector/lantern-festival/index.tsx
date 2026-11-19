import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Sky lantern festival: a cluster of glowing paper sky lanterns of different sizes, centred on x, y.
// About 700 px wide and 900 px tall at s = 1. anim "rise": the lanterns drift slowly upward and
// fade out at the top, reappearing at the bottom, looping. Frame 0 shows the whole cluster.
const f1 = (v: number) => v.toFixed(1);
const H = 900;

// One sky lantern: a rounded paper body on an open base with a glowing flame inside. Origin = the base.
const SkyLantern = ({ w, h, c }: { w: number; h: number; c: string }) => (
  <g>
    <circle cx={0} cy={-h * 0.5} r={w * 0.95} fill={C.yellow} opacity={0.16} />
    <ellipse cx={0} cy={-h * 0.5} rx={w / 2} ry={h / 2} fill={c} />
    <ellipse cx={w * 0.28} cy={-h * 0.5} rx={w * 0.22} ry={h / 2 - 4} fill={shade(c, 0.2)} opacity={0.6} />
    <rect x={-w * 0.22} y={-h - 8} width={w * 0.44} height={10} rx={4} fill={shade(c, 0.3)} />
    <ellipse cx={0} cy={-6} rx={w * 0.2} ry={9} fill={C.yellow} />
    <ellipse cx={0} cy={-4} rx={w * 0.09} ry={5} fill={C.white} />
    <rect x={-w * 0.16} y={-2} width={w * 0.32} height={6} rx={3} fill={shade(c, 0.3)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const palette = [
    p.color && p.color !== "none" ? p.color : C.red,
    p.color2 && p.color2 !== "none" ? p.color2 : C.orange,
    p.color3 && p.color3 !== "none" ? p.color3 : C.yellow,
    C.pink, C.purple, C.teal, C.orange,
  ];
  const anim: string = p.anim ?? "none";
  // [x offset, phase 0..1, width, height]
  const lanterns: [number, number, number, number][] = [
    [-260, 0.05, 110, 150], [-120, 0.35, 78, 108], [30, 0.6, 128, 178], [180, 0.2, 70, 98],
    [265, 0.8, 100, 140], [-205, 0.75, 60, 84], [100, 0.9, 84, 118],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      {lanterns.map(([dx, ph, w, h], i) => {
        const speed = 0.6 + (i % 3) * 0.15;
        const travel = anim === "rise" ? (ph * H + f * speed) % H : ph * H;
        const ly = H / 2 - travel;
        const sx = dx + (anim === "rise" ? Math.sin(f * 0.04 + i * 1.7) * 14 : 0);
        const op = Math.min(1, travel / 40, (H - travel) / 140);
        return (
          <g key={i} transform={`translate(${f1(sx)} ${f1(ly)})`} opacity={f1(op) as any}>
            <SkyLantern w={w} h={h} c={palette[i % palette.length]} />
          </g>
        );
      })}
    </g>
  );
}
