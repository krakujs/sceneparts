import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Drink } from "../drink/index";

// Jam jar (preset of flat-vector/drink + extras): jar of red jam, red and white gingham cloth lid cover tied with string, plain label.
const LOOK = { vessel: "jar", color: "#DDEFF8", liquid: "#A3193F", level: 0.84, label: "#F4F1EA", h: 300 };
const f1 = (v: number) => v.toFixed(1);
const RED = "#E8503F";
const CORD = "#C9A36A";

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
  const skirt = `M -112 ${f1(top - 6)} L -106 ${f1(top + 26)} Q -80 ${f1(top + 38)} -54 ${f1(top + 26)} Q -27 ${f1(top + 38)} 0 ${f1(top + 26)} Q 27 ${f1(top + 38)} 54 ${f1(top + 26)} Q 80 ${f1(top + 38)} 106 ${f1(top + 26)} L 112 ${f1(top - 6)} Z`;
  return (
    <g>
      <Drink {...q} />
      <g transform={`translate(${f1(x)} ${f1(y)}) scale(${q.flip ? -s : s} ${s})`}>
        <g transform={motion(q.anim ?? "none", f)}>
          <defs>
            <clipPath id="jam-gingham-cloth">
              <ellipse cx={0} cy={f1(top - 6)} rx={112} ry={26} />
              <path d={skirt} />
            </clipPath>
          </defs>
          {/* gingham cloth: white with red stripes both ways, clipped to the cover */}
          <g clipPath="url(#jam-gingham-cloth)">
            <rect x={-120} y={f1(top - 40)} width={240} height={90} fill="#FFFFFF" />
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={"v" + i} x={-126 + i * 18} y={f1(top - 40)} width={9} height={90} fill={RED} opacity={0.5} />
            ))}
            {Array.from({ length: 7 }, (_, j) => (
              <rect key={"h" + j} x={-120} y={f1(top - 36 + j * 16)} width={240} height={8} fill={RED} opacity={0.5} />
            ))}
          </g>
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
