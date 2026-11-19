import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import { lit, asTime } from "../backdrop/index";

// School hallway background (preset of flat-vector/backdrop): one-point perspective. Lockers line the left wall,
// classroom doors the right wall, a notice board on the far wall, tiled floor and ceiling lights. The centre stays clear.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const f = p.f ?? 0, time = asTime(p.time), drift = (p.anim ?? "drift") !== "none";
  const L = (c: string) => lit(c, time, true);
  // wall coordinates: u = 0 at the near edge, 1 at the far wall; a = 0 at ceiling, 1 at floor
  const P = (u: number, a: number, right = false): [number, number] => {
    const x = 250 * u, y = 330 * u + a * (1920 - 1060 * u);
    return [right ? 1080 - x : x, y];
  };
  const poly = (pts: [number, number][]) => "M " + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ") + " Z";
  const wall = L(p.wall ?? "#F3E3C7"), ceil = L("#F4F1EA"), floor = L("#D3DEE6"), line = shade(floor, 0.14);
  const lockerCol = L(p.lockers ?? C.blue);
  const lockers = [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const u0 = 0.03 + i * 0.13, u1 = u0 + 0.11, um = (u0 + u1) / 2;
    const col = i % 2 ? shade(lockerCol, 0.12) : lockerCol;
    return (
      <g key={`lk${i}`}>
        <path d={poly([P(u0, 0.22), P(u1, 0.22), P(u1, 0.9), P(u0, 0.9)])} fill={col} />
        <path d={poly([P(u0, 0.22), P(u1, 0.22), P(u1, 0.27), P(u0, 0.27)])} fill={shade(col, 0.25)} />
        <path d={poly([P(um - 0.015, 0.5), P(um + 0.015, 0.5), P(um + 0.015, 0.56), P(um - 0.015, 0.56)])} fill={shade(col, 0.3)} />
      </g>
    );
  });
  const doors = [0, 1].map((i) => {
    const u0 = 0.2 + i * 0.36, u1 = u0 + 0.22, col = L(i ? C.teal : C.orange);
    return (
      <g key={`dr${i}`}>
        <path d={poly([P(u0, 0.12, true), P(u1, 0.12, true), P(u1, 0.9, true), P(u0, 0.9, true)])} fill={col} />
        <path d={poly([P(u0 + 0.02, 0.2, true), P(u1 - 0.02, 0.2, true), P(u1 - 0.02, 0.48, true), P(u0 + 0.02, 0.48, true)])} fill={L(C.skyDeep)} opacity={0.7} />
        <path d={poly([P(u1 - 0.03, 0.5, true), P(u1 - 0.025, 0.5, true), P(u1 - 0.025, 0.6, true), P(u1 - 0.03, 0.6, true)])} fill={L(C.greyDark)} />
      </g>
    );
  });
  return (
    <g>
      {/* ceiling and walls */}
      <path d="M 0 0 L 1080 0 L 830 330 L 250 330 Z" fill={ceil} />
      <path d={poly([P(0, 0), P(1, 0), P(1, 1), P(0, 1)])} fill={wall} />
      <path d={poly([P(0, 0, true), P(1, 0, true), P(1, 1, true), P(0, 1, true)])} fill={shade(wall, 0.05)} />
      <rect x={250} y={330} width={580} height={860} fill={wall} />
      <rect x={250} y={1000} width={580} height={190} fill={L(C.teal)} />
      <rect x={250} y={990} width={580} height={12} fill={shade(L(C.teal), 0.2)} />
      {/* notice board on the far wall with abstract notes */}
      <rect x={380} y={420} width={320} height={280} rx={10} fill={shade(L(C.brown), 0.1)} />
      <rect x={392} y={432} width={296} height={256} rx={6} fill={L(C.sand)} />
      <rect x={414} y={462} width={96} height={80} rx={4} fill={L(C.white)} transform="rotate(-4 462 502)" />
      <rect x={530} y={458} width={100} height={70} rx={4} fill={L(C.yellow)} transform="rotate(3 580 493)" />
      <rect x={424} y={572} width={120} height={64} rx={4} fill={L(C.pink)} transform="rotate(2 484 604)" />
      <circle cx={600} cy={610} r={26} fill={L(C.teal)} />
      <rect x={560} y={560} width={80} height={14} rx={7} fill={L(C.greyDark)} opacity={0.6} />
      <circle cx={420} cy={444} r={5} fill={L(C.red)} /><circle cx={610} cy={446} r={5} fill={L(C.red)} />
      {/* ceiling lights in perspective */}
      {[0.12, 0.42, 0.78].map((u, i) => {
        const [cx, cy] = P(u, 0, false);
        const hw = 150 * (1 - u) + 20;
        const on = drift ? 0.85 + 0.15 * Math.sin(f / 15 + i) : 1;
        return (
          <g key={`cl${i}`} opacity={on}>
            <rect x={540 - hw} y={cy + 4} width={hw * 2} height={10 + 16 * (1 - u)} rx={6} fill={L("#FFFDF2")} />
            <rect x={540 - hw * 0.5} y={cy + 1} width={hw} height={3} fill={L(C.white)} opacity={0.8} />
          </g>
        );
      })}
      {lockers}
      {doors}
      {/* floor with tiles converging on the vanishing point */}
      <path d="M 0 1920 L 250 1190 L 830 1190 L 1080 1920 Z" fill={floor} />
      {[1190, 1240, 1305, 1390, 1500, 1640, 1800].map((y, i) => {
        const h = (1920 - y) / 730;
        const lx = 250 * (1920 - y) / 730;
        return <line key={`fl${i}`} x1={lx} y1={y} x2={1080 - lx} y2={y} stroke={line} strokeWidth={3 + h * 3} />;
      })}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`fd${i}`} x1={250 + i * (580 / 6)} y1={1190} x2={i * (1080 / 6)} y2={1920} stroke={line} strokeWidth={3} />
      ))}
    </g>
  );
}
