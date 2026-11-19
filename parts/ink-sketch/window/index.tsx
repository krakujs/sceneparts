import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../../flat-vector/style/index";
import { inkEach } from "../style/index";

// Ink sketch wall window (geometry from the flat-vector wall-window part, inked shape by shape): white frame with a centre mullion and transom making four panes, a glimpse of sky with a
// soft cloud, and a sill. Centred on (x, y); a wall item, so no ground shadow. Origin = centre.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function Flat(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const frame = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(frame, 0.12);
  const W = 520, H = 600; // outer size
  const FR = 36; // frame width
  const iw = W - 2 * FR, ih = H - 2 * FR;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim ?? "none", f)}>
        {/* wall reveal (slightly darker recess behind the frame) */}
        <rect x={-W / 2 - 18} y={-H / 2 - 18} width={W + 36} height={H + 36} rx={18} fill={C.greyLight} />
        {/* frame */}
        <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={16} fill={frame} />
        {/* glass: sky with a cloud and a sun */}
        <rect x={-iw / 2} y={-ih / 2} width={iw} height={ih} rx={6} fill={C.sky} />
        <rect x={-iw / 2} y={ih / 2 - 110} width={iw} height={110} rx={0} fill={C.skyDeep} opacity={0.35} />
        <circle cx={iw / 2 - 90} cy={-ih / 2 + 100} r={48} fill={C.yellow} opacity={0.9} />
        <ellipse cx={-70} cy={-40} rx={110} ry={44} fill="#FFFFFF" opacity={0.9} />
        <ellipse cx={-10} cy={-60} rx={62} ry={44} fill="#FFFFFF" opacity={0.9} />
        <ellipse cx={130} cy={70} rx={70} ry={32} fill="#FFFFFF" opacity={0.7} />
        {/* mullion and transom: four panes */}
        <rect x={-14} y={-ih / 2} width={28} height={ih} fill={frame} />
        <rect x={-iw / 2} y={-14} width={iw} height={28} fill={frame} />
        {/* inner shade on the top-left pane edges */}
        <rect x={-iw / 2} y={-ih / 2} width={iw} height={12} rx={6} fill="#FFFFFF" opacity={0.25} />
        {/* sill */}
        <rect x={-W / 2 - 40} y={H / 2 - 4} width={W + 80} height={36} rx={12} fill={dk} />
        <rect x={-W / 2 - 30} y={H / 2 + 26} width={W + 60} height={12} rx={6} fill={shade(frame, 0.2)} />
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return inkEach(<Flat {...p} />, 6);
}
