import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Container ship, side view facing right. Origin = waterline centre. Room scale: about 800 px wide.
// Three rows of colourful containers on a dark hull, with a bridge tower at the back. anim "drive" rocks it.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "drive") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 100) * 1.0)})`;
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const BOXES = [C.red, C.blue, C.yellow, C.green, C.orange, C.teal, C.purple];
const Water = ({ w }: { w: number }) => (
  <g>
    <rect x={-w / 2} y={-4} width={w} height={38} rx={19} fill={C.skyDeep} />
    <rect x={-w / 2 + 60} y={8} width={100} height={7} rx={3.5} fill={C.white} opacity={0.85} />
    <rect x={w / 2 - 170} y={18} width={90} height={7} rx={3.5} fill={C.white} opacity={0.85} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, y = p.y ?? 1560;
  const x = (p.x ?? 540) + (p.vx ?? 0) * f;
  const bridge = p.color && p.color !== "none" ? p.color : C.white;
  const hull = p.color2 && p.color2 !== "none" ? p.color2 : C.navy;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        {/* bridge tower at the back */}
        <rect x={-330} y={-420} width={7} height={40} fill={C.greyDark} />
        <rect x={-390} y={-372} width={130} height={260} rx={10} fill={bridge} />
        <rect x={-400} y={-384} width={150} height={14} rx={6} fill={shade(bridge, 0.2)} />
        {[-342, -308, -274].map((wy) => (
          <rect key={wy} x={-372} y={wy} width={106} height={16} rx={4} fill={C.skyDeep} />
        ))}
        {/* hull with a flat deck and pointed bow */}
        <path d="M -400 -112 L 390 -112 L 340 12 L -360 12 Q -398 -40 -400 -112 Z" fill={hull} />
        <rect x={-400} y={-116} width={790} height={8} fill={shade(hull, 0.25)} />
        {/* containers: three rows of five */}
        {Array.from({ length: 15 }, (_, k) => {
          const row = Math.floor(k / 5), col = k % 5;
          const cx = -230 + col * 96, cy = -164 - row * 52, c = BOXES[k % BOXES.length];
          return (
            <g key={k}>
              <rect x={cx} y={cy} width={92} height={52} rx={4} fill={c} />
              <rect x={cx + 42} y={cy} width={4} height={52} fill={shade(c, 0.22)} />
            </g>
          );
        })}
      </g>
      <Water w={820} />
    </g>
  );
}
