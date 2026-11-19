import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Ball-and-stick molecule: a ring of six spheres with one more sphere on top, joined by sticks. Centred on x, y.
// About 560 px wide and 600 px tall at s = 1. anim "spin": the molecule turns slowly; "bob": it floats gently.
const f1 = (v: number) => v.toFixed(1);
type V = [number, number, number];
type Atom = { p: V; r: number; c: "a" | "b" | "d" };

const ATOMS: Atom[] = [];
for (let k = 0; k < 6; k++) {
  const ang = (k * Math.PI) / 3;
  ATOMS.push({ p: [230 * Math.cos(ang), 0, 230 * Math.sin(ang)], r: 62, c: k % 2 === 0 ? "a" : "b" });
}
ATOMS.push({ p: [0, -250, 0], r: 50, c: "d" });
const BONDS: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6]];

const project = (p: V, yaw: number, tilt: number) => {
  const x1 = p[0] * Math.cos(yaw) + p[2] * Math.sin(yaw);
  const z1 = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
  const y2 = p[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
  const z2 = p[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
  return { X: x1, Y: y2, Z: z2 };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 900;
  const ca = p.color && p.color !== "none" ? p.color : C.blue;
  const cb = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const cmap = { a: ca, b: cb, d: C.purple } as const;
  const anim: string = p.anim ?? "none";
  const yaw = anim === "spin" ? 0.6 + (f * 2 * Math.PI) / 300 : 0.6;
  const tilt = -0.3;
  const bob = anim === "bob" ? -Math.abs(Math.sin((f * Math.PI) / 60)) * 16 : 0;
  const pts = ATOMS.map((a) => ({ ...a, pr: project(a.p, yaw, tilt) }));
  const sorted = [...pts].sort((u, v) => u.pr.Z - v.pr.Z);
  return (
    <g transform={`translate(${f1(x)} ${f1(y + bob)}) scale(${p.flip ? -s : s} ${s})`}>
      {BONDS.map(([i, j], k) => {
        const u = pts[i].pr, v = pts[j].pr;
        return <line key={k} x1={f1(u.X)} y1={f1(u.Y)} x2={f1(v.X)} y2={f1(v.Y)} stroke={C.greyDark} strokeWidth={22} strokeLinecap="round" />;
      })}
      {sorted.map((a, i) => {
        const sc = 1 + a.pr.Z / 800;
        const r = a.r * sc, col = cmap[a.c];
        return (
          <g key={i} transform={`translate(${f1(a.pr.X)} ${f1(a.pr.Y)})`}>
            <circle cx={0} cy={0} r={r} fill={shade(col, 0.3)} />
            <circle cx={-r * 0.06} cy={-r * 0.06} r={r * 0.9} fill={col} />
            <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.26} fill={C.white} opacity={0.55} />
          </g>
        );
      })}
    </g>
  );
}
