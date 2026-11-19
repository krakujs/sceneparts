/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Flat vector watermelon. variant "slice" = a wedge with the rind arc at the bottom, red flesh, black seeds;
// variant "whole" = a striped oval melon. Origin = resting point (bottom centre), honours flip.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1, u = Math.min(1, Math.max(0, t)); return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 5)})`;
  if (anim === "pop") return `scale(${f1(easeOutBack(f / 20))})`;
  return "";
};
const rad = (a: number) => (a * Math.PI) / 180;

// Slice: apex of the melon at (0, -400), rind arc of radius 400 at the bottom, a 60 degree wedge.
const R0 = 400;
const P = (r: number, a: number): [number, number] => [r * Math.sin(rad(a)), -R0 + r * Math.cos(rad(a))];
const sector = (r1: number, r2: number) => {
  const [l2x, l2y] = P(r2, -30), [q2x, q2y] = P(r2, 30);
  if (r1 === 0) return `M 0 ${-R0} L ${f1(l2x)} ${f1(l2y)} A ${r2} ${r2} 0 0 0 ${f1(q2x)} ${f1(q2y)} Z`;
  const [l1x, l1y] = P(r1, -30), [q1x, q1y] = P(r1, 30);
  return `M ${f1(l2x)} ${f1(l2y)} A ${r2} ${r2} 0 0 0 ${f1(q2x)} ${f1(q2y)} L ${f1(q1x)} ${f1(q1y)} A ${r1} ${r1} 0 0 1 ${f1(l1x)} ${f1(l1y)} Z`;
};
const SEED_RINGS: [number, number[]][] = [[70, [0]], [130, [-15, 15]], [190, [-22, 0, 22]], [250, [-15, 15]], [300, [-22, 0, 22]]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const anim: string = p.anim ?? "none";
  const whole = p.variant === "whole";

  let body: React.ReactNode, w: number, h: number;
  if (whole) {
    w = 200; h = 160;
    body = (
      <g>
        <ellipse cx={0} cy={-160} rx={200} ry={160} fill={C.green} />
        {[15, 40, 65].map((l) => (
          <ellipse key={l} cx={0} cy={-160} rx={200 * Math.cos(rad(l))} ry={150} fill="none" stroke={C.greenDark} strokeWidth={18} />
        ))}
        <ellipse cx={-80} cy={-245} rx={28} ry={14} fill="#FFFFFF" opacity={0.5} transform="rotate(-35 -80 -245)" />
      </g>
    );
  } else {
    w = 200; h = 400;
    const seeds: React.ReactNode[] = [];
    SEED_RINGS.forEach(([r, angs]) => angs.forEach((a) => {
      const [px, py] = P(r, a);
      seeds.push(<ellipse key={`${r}-${a}`} cx={px} cy={py} rx={5} ry={9} fill={C.ink} transform={`rotate(${f1(-a)} ${f1(px)} ${f1(py)})`} />);
    }));
    body = (
      <g>
        <path d={sector(0, R0)} fill={C.greenDark} />
        <path d={sector(0, 380)} fill={C.green} />
        <path d={sector(0, 362)} fill="#F3F8EA" />
        <path d={sector(0, 348)} fill={C.red} />
        {seeds}
        <path d={`M ${f1(P(330, -18)[0])} ${f1(P(330, -18)[1])} Q ${f1(P(250, -26)[0])} ${f1(P(250, -26)[1] - 40)} ${f1(P(120, -26)[0])} ${f1(P(120, -26)[1])}`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.25} />
      </g>
    );
  }

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={w * 0.95} ry={15} fill={C.shadow} />
      <g transform={motion(anim, f) || undefined}>
        {body}
      </g>
    </g>
  );
}
