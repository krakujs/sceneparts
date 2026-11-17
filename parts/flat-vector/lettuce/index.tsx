/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector lettuce: a loose, ruffled head of light green leaves fanning up from a small base, darker veins.
// Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};

/** A ruffled leaf rising from the origin along -y; the edge waves so the leaf looks loose and crinkled. */
const ruffled = (L: number, W: number, k: number) => {
  const N = 28, right: string[] = [], left: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const env = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.6)), 0.7);
    const ruf = 1 + 0.09 * Math.sin(t * Math.PI * 9 + k * 1.7);
    const hw = W * env * ruf, yy = -L * t;
    right.push(`${f1(hw)} ${f1(yy)}`);
    left.push(`${f1(-hw)} ${f1(yy)}`);
  }
  return "M 0 0 L " + right.slice(1).join(" L ") + " L " + left.slice().reverse().join(" L ") + " Z";
};
const LEAVES: [number, number, number][] = [[-66, 280, 104], [66, 280, 104], [-44, 330, 136], [44, 330, 136], [-22, 362, 150], [22, 362, 150], [0, 384, 150]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const inner: string = p.color ?? "#C5E89C";
  const veinC = "#6EA84C";

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={190} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {LEAVES.map(([a, L, W], i) => {
          const outer = i === 0 || i === 1 || i === 2 || i === 3;
          const fill = outer ? shade(inner, 0.08) : i === 6 ? "#DDF3BE" : inner;
          return (
            <g key={i} transform={`rotate(${f1(a)})`}>
              <path d={ruffled(L, W, i)} fill={fill} />
              <path d={`M 0 0 L 0 ${f1(-L * 0.85)}`} stroke={veinC} strokeWidth={6} strokeLinecap="round" />
              {[0.3, 0.55, 0.78].map((t, j) => (
                <g key={j} stroke={veinC} strokeWidth={3} strokeLinecap="round" opacity={0.7}>
                  <path d={`M 0 ${f1(-L * t)} L ${f1(W * 0.5)} ${f1(-L * (t + 0.12))}`} />
                  <path d={`M 0 ${f1(-L * t)} L ${f1(-W * 0.5)} ${f1(-L * (t + 0.12))}`} />
                </g>
              ))}
            </g>
          );
        })}
        <ellipse cx={0} cy={-6} rx={30} ry={11} fill="#E9E0B8" />
      </g>
    </g>
  );
}
