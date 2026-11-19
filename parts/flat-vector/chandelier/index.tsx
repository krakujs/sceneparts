import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Chandelier: six-arm chandelier with candle bulbs and crystal drops. Origin = where the chain meets the ceiling.
// anim "on" lights the candles and adds a warm glow; "swing" sways it gently from the ceiling.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const flamePath = (w: number, h: number) => `M ${f1(-w / 2)} 0 C ${f1(-w / 2)} ${f1(-h * 0.4)} ${f1(-w * 0.1)} ${f1(-h * 0.55)} 0 ${f1(-h)} C ${f1(w * 0.1)} ${f1(-h * 0.55)} ${f1(w / 2)} ${f1(-h * 0.4)} ${f1(w / 2)} 0 Z`;
const drop = (x: number, y: number, k: number) => <path d={`M 0 6 C -18 26 -16 52 0 62 C 16 52 18 26 0 6 Z`} transform={`translate(${f1(x)} ${f1(y)}) scale(${k})`} fill="#CFE6F5" />;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 0;
  const metal = p.color && p.color !== "none" ? p.color : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const on = anim === "on";
  const k = on ? 0.92 + 0.08 * Math.sin((f * 2 * Math.PI) / 60) : 0;
  const sway = anim === "swing" ? Math.sin((f * 2 * Math.PI) / 90) * 4 : 0;
  const arms: [number, number][] = [[-320, 270], [-210, 215], [-100, 180], [100, 180], [210, 215], [320, 270]];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <g transform={`rotate(${f1(sway)})`}>
          {on && (
            <g>
              <circle cx={0} cy={240} r={460} fill={C.yellow} opacity={0.06 * k} />
              <circle cx={0} cy={240} r={340} fill={C.yellow} opacity={0.1 * k} />
              <circle cx={0} cy={240} r={240} fill={C.yellow} opacity={0.15 * k} />
            </g>
          )}
          <rect x={-3} y={18} width={6} height={282} fill={shade(metal, 0.1)} />
          <rect x={-30} y={0} width={60} height={18} rx={6} fill={metal} />
          {arms.map(([ax, ay]) => (
            <path key={`a${ax}`} d={`M 0 300 C ${f1(ax * 0.35)} 300 ${ax} ${ay + 50} ${ax} ${ay}`} fill="none" stroke={metal} strokeWidth={12} strokeLinecap="round" />
          ))}
          <ellipse cx={0} cy={300} rx={46} ry={22} fill={metal} />
          <ellipse cx={0} cy={306} rx={38} ry={11} fill={shade(metal, 0.25)} />
          {drop(0, 300, 1.5)}
          {arms.map(([ax, ay]) => (
            <g key={`c${ax}`}>
              {drop(ax, ay, 0.9)}
              <ellipse cx={ax} cy={ay} rx={18} ry={8} fill={metal} />
              <rect x={ax - 17} y={ay - 84} width={34} height={80} rx={6} fill={C.paper} />
              <rect x={ax + 6} y={ay - 84} width={11} height={80} rx={4} fill={C.greyLight} />
              <rect x={ax - 2} y={ay - 92} width={4} height={10} rx={2} fill={C.ink} />
              <g transform={`translate(${f1(ax)} ${f1(ay - 92)}) scale(${f1(1 + (on ? 0.06 * Math.sin((f + ax) * 1.3) : 0))})`}>
                <path d={flamePath(22, 46)} fill={C.orange} />
                <path d={flamePath(11, 24)} fill={C.yellow} />
              </g>
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
