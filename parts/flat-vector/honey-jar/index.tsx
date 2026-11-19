import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Honey jar (preset of flat-vector/drink + extras): round glass jar of golden honey, cream cloth cover tied with string,
// and a wooden honey dipper leaning against it.
const LOOK = { vessel: "jar", color: "#F6EFDF", liquid: "#E8A317", level: 0.82, h: 300 };
const f1 = (v: number) => v.toFixed(1);
const CORD = "#B98A55";

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const s = q.s ?? 1, f = q.f ?? 0, x = q.x ?? 540, y = q.y ?? 1560, h = q.h;
  const top = -h;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          {/* honey dipper leaning on the jar, its head above the rim */}
          <line x1={150} y1={-6} x2={60} y2={f1(top - 40)} stroke="#B98254" strokeWidth={16} strokeLinecap="round" />
          <g transform={`translate(60 ${f1(top - 40)}) rotate(-15)`}>
            <ellipse rx={14} ry={22} fill="#C98A4E" />
            <ellipse cx={0} cy={-4} rx={6} ry={10} fill="#E8A317" opacity={0.85} />
          </g>
          {/* cloth cover, draped over the rim with a scalloped hem */}
          <ellipse cx={0} cy={f1(top - 6)} rx={112} ry={26} fill="#F4E9D2" />
          <path d={`M -112 ${f1(top - 6)} L -106 ${f1(top + 26)} Q -80 ${f1(top + 38)} -54 ${f1(top + 26)} Q -27 ${f1(top + 38)} 0 ${f1(top + 26)} Q 27 ${f1(top + 38)} 54 ${f1(top + 26)} Q 80 ${f1(top + 38)} 106 ${f1(top + 26)} L 112 ${f1(top - 6)} Z`} fill="#F4E9D2" />
          <path d={`M -60 ${f1(top + 4)} Q -62 ${f1(top + 16)} -54 ${f1(top + 26)}`} fill="none" stroke="#E0D0B0" strokeWidth={3} strokeLinecap="round" />
          {/* string tied around the cloth with a bow */}
          <path d={`M -104 ${f1(top + 40)} Q 0 ${f1(top + 56)} 104 ${f1(top + 40)}`} fill="none" stroke={CORD} strokeWidth={6} strokeLinecap="round" />
          <ellipse cx={-12} cy={f1(top + 58)} rx={12} ry={6} transform={`rotate(-25 -12 ${f1(top + 58)})`} fill={CORD} />
          <ellipse cx={12} cy={f1(top + 58)} rx={12} ry={6} transform={`rotate(25 12 ${f1(top + 58)})`} fill={CORD} />
          <circle cx={0} cy={f1(top + 52)} r={5} fill={CORD} />
        </g>
      </g>
    </g>
  );
}
