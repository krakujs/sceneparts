import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Generic 3x3x3 puzzle cube in a three-quarter view. Built as 3D stickers projected with a fixed view
// (turned about Y and tilted about X), painted back to front. anim "twist": the top layer turns 90 degrees.
// Origin = bottom centre. About 420 px wide at s = 1.
const f1 = (v: number) => v.toFixed(1);
const STICK = [C.red, C.blue, C.yellow, C.green, C.orange, C.white];
const HALF = 1.5;
const EDGE = 0.46;

type V = [number, number, number];
const rotY = ([x, y, z]: V, a: number): V => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const rotX = ([x, y, z]: V, b: number): V => [x, y * Math.cos(b) - z * Math.sin(b), y * Math.sin(b) + z * Math.cos(b)];
const VIEW_Y = -0.61; // about -35 degrees
const VIEW_X = -0.44; // about -25 degrees (shows the top)
const view = (p: V) => rotX(rotY(p, VIEW_Y), VIEW_X);
const SCALE = 95;

type Sticker = { pts: [number, number][]; depth: number; colour: string };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.ink;
  const anim: string = p.anim ?? "none";
  // Twist: top layer turns 90 degrees over frames 10-40 of every 60-frame cycle.
  const cyc = ((f % 60) + 60) % 60;
  const tw = Math.min(1, Math.max(0, (cyc - 10) / 30));
  const theta = anim === "twist" ? -(Math.PI / 2) * (tw * tw * (3 - 2 * tw)) : 0;

  // Faces that can be seen: front (+z), top (-y), right (+x). Each is a 3x3 grid of stickers.
  const faces: { axis: number; sign: number; colourOffset: number }[] = [
    { axis: 2, sign: 1, colourOffset: 0 },
    { axis: 1, sign: -1, colourOffset: 9 },
    { axis: 0, sign: 1, colourOffset: 18 },
  ];
  const stickers: Sticker[] = [];
  const bodyFaces: { pts: [number, number][]; depth: number }[] = [];
  for (const fc of faces) {
    const others = [0, 1, 2].filter((k) => k !== fc.axis);
    // Visibility of the face (normal after the fixed view).
    const n: V = [0, 0, 0];
    n[fc.axis] = fc.sign;
    const nv = view(n);
    if (nv[2] <= 0) continue;
    // Silhouette of the whole face, drawn first as body colour.
    const corners = [[-HALF, -HALF], [HALF, -HALF], [HALF, HALF], [-HALF, HALF]];
    const bodyPts = corners.map(([u, v]) => {
      const q: V = [0, 0, 0];
      q[fc.axis] = fc.sign * HALF; q[others[0]] = u; q[others[1]] = v;
      const w = view(q);
      return [w[0] * SCALE, w[1] * SCALE] as [number, number];
    });
    bodyFaces.push({ pts: bodyPts, depth: 0 });
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const cu = i, cv = j;
        const idx = (i + 1) * 3 + (j + 1);
        const colour = STICK[(idx + fc.colourOffset) % STICK.length];
        const offs: [number, number][] = [[-EDGE, -EDGE], [EDGE, -EDGE], [EDGE, EDGE], [-EDGE, EDGE]];
        let depthSum = 0;
        const pts: [number, number][] = offs.map(([du, dv]) => {
          const q: V = [0, 0, 0];
          q[fc.axis] = fc.sign * HALF;
          q[others[0]] = cu + du; q[others[1]] = cv + dv;
          // Top layer is the row with y near -1 (includes the top face).
          const centreY = fc.axis === 1 ? fc.sign * HALF : (others[0] === 1 ? cu : cv);
          const inTop = centreY < -0.9;
          const r = inTop ? rotY(q, theta) : q;
          const w = view(r);
          depthSum += w[2];
          return [w[0] * SCALE, w[1] * SCALE];
        });
        // Stickers on the top layer: their normal also turns, so cull ones that have turned away.
        const centreYs = fc.axis === 1 ? fc.sign * HALF : (others[0] === 1 ? cu : cv);
        const nTop = centreYs < -0.9 ? rotY(n, theta) : n;
        if (view(nTop)[2] <= 0) continue;
        stickers.push({ pts, depth: depthSum / 4, colour });
      }
    }
  }
  stickers.sort((a, b) => a.depth - b.depth);
  const poly = (pts: [number, number][]) => pts.map(([px, py]) => `${f1(px)},${f1(py)}`).join(" ");
  // Pull the cube up so its bottom sits on y.
  const lift = 210;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={14} fill={C.shadow} />
      <g transform={`translate(0 ${f1(-lift)})`}>
        {bodyFaces.map((b, i) => <polygon key={`b${i}`} points={poly(b.pts)} fill={body} stroke={body} strokeWidth={10} strokeLinejoin="round" />)}
        {stickers.map((st, i) => (
          <polygon key={i} points={poly(st.pts)} fill={st.colour} stroke={shade(st.colour, 0.15)} strokeWidth={3} strokeLinejoin="round" />
        ))}
      </g>
    </g>
  );
}
