/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Fern: arching fronds with many small leaflets, all from one base. Origin = base on the ground.
const f1 = (v: number) => v.toFixed(1);
// One frond in local space: a stem from (0,0) to (dx, -dy) that curls down, leaflets alternate along it.
const frond = (dx: number, dy: number, curl: number, n: number, c: string, sw: number) => {
  const pt = (t: number): [number, number] => [dx * t, -dy * t + curl * t * t];
  const stemEnd = pt(1);
  const leaflets: React.ReactNode[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const [px, py] = pt(t);
    const size = (1 - t * 0.5) * 78;
    const side = i % 2 ? 1 : -1;
    leaflets.push(
      <ellipse key={`${i}a`} cx={px + side * size * 0.45} cy={py - 6} rx={size * 0.6} ry={size * 0.3} fill={side > 0 ? c : shade(c, 0.15)} transform={`rotate(${f1(side * -32 + sw * t)} ${f1(px)} ${f1(py)})`} />
    );
  }
  return (
    <g>
      <path d={`M 0 0 Q ${f1(dx * 0.4)} ${f1(-dy * 0.4 + curl * 0.16)} ${f1(stemEnd[0])} ${f1(stemEnd[1])}`} stroke={shade(c, 0.1)} strokeWidth={12} strokeLinecap="round" fill="none" />
      {leaflets}
    </g>
  );
};

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const anim: string = p.anim ?? "none";
  const wave = (i: number) => (anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.9) : 0);
  // [dx, dy, curl, leaflets, angle]
  const fronds: [number, number, number, number, number][] = [
    [-200, 420, 120, 13, -30], [-120, 580, 160, 14, -8], [0, 600, 20, 15, 4], [120, 560, -100, 14, 14], [200, 420, -120, 13, 30],
  ];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={260} ry={16} fill={C.shadow} />
      <ellipse cx={0} cy={-16} rx={34} ry={22} fill={shade(green, 0.2)} />
      {fronds.map(([dx, dy, curl, n, a], i) => (
        <g key={i} transform={`rotate(${f1(a + wave(i))})`}>
          <g transform="scale(1 1)">
            {frond(dx, dy, curl, n, i % 2 ? shade(green, 0.08) : green, 0)}
          </g>
        </g>
      ))}
    </g>
  );
}
