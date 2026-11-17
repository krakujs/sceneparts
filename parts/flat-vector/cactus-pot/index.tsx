import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Small potted cactus with two arms and a tiny pink flower on top. Origin = centre of the pot base on the floor.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const petal = (cx: number, cy: number, r: number) => (
  <g transform={`translate(${f1(cx)} ${f1(cy)})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <circle key={a} cx={0} cy={-r * 0.6} r={r * 0.5} fill={C.pink} transform={`rotate(${a})`} />
    ))}
    <circle cx={0} cy={0} r={r * 0.4} fill={C.yellow} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const green = p.color && p.color !== "none" ? p.color : C.green;
  const potC = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const dk = shade(green, 0.2), hi = shade(green, -0.12);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-96} y={-200} width={70} height={40} rx={20} fill={green} />
        <rect x={-96} y={-270} width={40} height={110} rx={20} fill={green} />
        <rect x={-60} y={-200} width={34} height={40} rx={10} fill={dk} />
        <rect x={26} y={-170} width={70} height={40} rx={20} fill={green} />
        <rect x={56} y={-240} width={40} height={110} rx={20} fill={green} />
        <rect x={56} y={-200} width={14} height={70} rx={7} fill={dk} />
        <rect x={-50} y={-320} width={100} height={220} rx={50} fill={green} />
        <rect x={20} y={-300} width={30} height={200} rx={15} fill={dk} />
        <rect x={-30} y={-290} width={12} height={150} rx={6} fill={hi} />
        <rect x={-72} y={-250} width={8} height={24} rx={4} fill={C.white} opacity={0.7} />
        <rect x={-6} y={-200} width={8} height={24} rx={4} fill={C.white} opacity={0.7} />
        <rect x={38} y={-150} width={8} height={24} rx={4} fill={C.white} opacity={0.7} />
        {petal(0, -334, 22)}
        <path d="M -90 -120 L -78 -20 Q -76 -6 -62 -6 H 62 Q 76 -6 78 -20 L 90 -120 Z" fill={potC} />
        <path d="M 30 -120 L 90 -120 L 78 -20 L 30 -20 Z" fill={shade(potC, 0.2)} />
        <rect x={-100} y={-140} width={200} height={40} rx={12} fill={potC} />
        <rect x={40} y={-140} width={60} height={40} rx={12} fill={shade(potC, 0.2)} />
        <ellipse cx={0} cy={-120} rx={92} ry={10} fill={shade(potC, 0.45)} />
      </g>
    </g>
  );
}
