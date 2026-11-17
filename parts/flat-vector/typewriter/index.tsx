import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Manual typewriter: a sheet of paper rolled round the platen, a deck with three rows of keys and a space bar.
// Origin = bottom centre (feet on y), desk size. anim "type": lines of text appear on the paper and a key dips.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};
const LINE_W = [260, 210, 240, 180, 230];
const ROW_SPECS: Array<[number, number, number]> = [
  [-270, 10, -262], // y, count, start x
  [-220, 9, -236],
  [-170, 8, -210],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const typed = anim === "type" ? Math.floor(f / 25) : 99;
  const pressed = anim === "type" ? Math.floor(f / 6) % 10 : -1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={340} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-300} y={-20} width={90} height={20} rx={6} fill={shade(body, 0.4)} />
        <rect x={210} y={-20} width={90} height={20} rx={6} fill={shade(body, 0.4)} />
        {/* paper rolled round the platen */}
        <rect x={-170} y={-650} width={340} height={330} rx={6} fill={C.white} />
        {LINE_W.map((lw, i) => {
          const yy = -612 + i * 42;
          if (i < typed) return <rect key={i} x={-130} y={yy} width={lw} height={10} rx={5} fill={C.greyLight} />;
          if (i === typed) return <rect key={i} x={-130} y={yy} width={f1(260 * ((f % 25) / 25))} height={10} rx={5} fill={C.greyLight} />;
          return null;
        })}
        {/* deck */}
        <rect x={-330} y={-330} width={660} height={310} rx={30} fill={body} />
        <rect x={-330} y={-60} width={660} height={40} rx={16} fill={shade(body, 0.3)} />
        <rect x={-300} y={-318} width={600} height={6} rx={3} fill={C.white} opacity={0.25} />
        {ROW_SPECS.map(([ry, count, sx], r) =>
          Array.from({ length: count }, (_, c) => {
            const idx = r === 0 ? c : -1;
            const dy = idx === pressed ? 3 : 0;
            const kx = sx + c * 52;
            return (
              <g key={`${r}-${c}`} transform={`translate(0 ${dy})`}>
                <rect x={kx} y={ry + 4} width={40} height={32} rx={7} fill={shade(C.white, 0.2)} />
                <rect x={kx} y={ry} width={40} height={32} rx={7} fill={C.white} />
              </g>
            );
          }),
        )}
        <rect x={-130} y={-120} width={260} height={32} rx={8} fill={C.white} />
        {/* platen (roller) and carriage return lever */}
        <rect x={-230} y={-362} width={460} height={46} rx={23} fill={C.inkSoft} />
        <rect x={-210} y={-352} width={420} height={6} rx={3} fill={C.white} opacity={0.25} />
        <rect x={240} y={-384} width={60} height={18} rx={8} fill={C.inkSoft} />
      </g>
    </g>
  );
}
