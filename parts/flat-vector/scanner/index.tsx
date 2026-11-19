import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flatbed scanner: lid slightly open, glass bed with a page, and a light bar. Origin = bottom centre.
// anim "scan": a glowing scan line sweeps along the glass.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.teal;
  const anim: string = p.anim ?? "none";
  const scanning = anim === "scan";
  const sweepY = scanning ? -330 + (((f % 60) / 60) * 240) : -330;
  const lineOp = scanning ? 0.9 : 0;
  // lid: lifted a little at the back
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={12} fill={C.shadow} />
      <g transform={motion(anim === "scan" ? "none" : anim, f)}>
        {/* lid, hinged at the back and lifted slightly */}
        <g transform="rotate(-10 0 -270)">
          <rect x={-300} y={-420} width={600} height={210} rx={22} fill={shade(body, 0.1)} />
          <rect x={-270} y={-395} width={540} height={160} rx={14} fill={C.white} opacity={0.12} />
          <rect x={-260} y={-260} width={520} height={18} rx={6} fill={shade(body, 0.25)} />
        </g>
        {/* base */}
        <rect x={-300} y={-260} width={600} height={240} rx={22} fill={body} />
        <rect x={-300} y={-40} width={600} height={20} rx={10} fill={shade(body, 0.25)} />
        {/* glass bed */}
        <rect x={-230} y={-240} width={460} height={190} rx={8} fill={C.sky} />
        <rect x={-230} y={-240} width={460} height={190} rx={8} fill={C.white} opacity={0.25} />
        {/* page on the glass */}
        <rect x={-150} y={-222} width={250} height={160} rx={6} fill={C.white} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-130} y={-200 + i * 26} width={i === 3 ? 120 : 200} height={9} rx={4} fill={C.greyLight} />)}
        {/* light bar and scan line */}
        <rect x={-230} y={-68} width={460} height={6} rx={3} fill={C.greyDark} />
        {scanning && <rect x={-230} y={sweepY} width={460} height={6} rx={3} fill={C.orange} opacity={lineOp} />}
        {scanning && <rect x={-230} y={sweepY - 14} width={460} height={30} rx={12} fill={C.orange} opacity={0.18} />}
        {/* panel buttons */}
        <circle cx={230} cy={-150} r={12} fill={C.green} />
        <circle cx={262} cy={-150} r={12} fill={C.greyLight} />
        <rect x={200} y={-120} width={72} height={18} rx={8} fill={C.ink} opacity={0.5} />
      </g>
    </g>
  );
}
