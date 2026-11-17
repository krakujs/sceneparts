import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Built-in wall oven unit: control panel on top, tall door with a glowing window, a grill vent strip at the bottom.
// anim "glow" pulses the warm light inside the oven. Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.2)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.greyDark;
  const dk = shade(c, 0.2);
  const glowing = (p.anim ?? "none") === "glow";
  const g = glowing ? 0.5 + 0.5 * Math.sin((f * 2 * Math.PI) / 60) : 0.6;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* unit body */}
        <rect x={-190} y={-590} width={380} height={590} rx={14} fill={c} />
        <rect x={170} y={-590} width={20} height={590} rx={10} fill={dk} />

        {/* control panel with knobs and a small display */}
        <rect x={-170} y={-580} width={340} height={64} rx={12} fill={dk} />
        {[-120, -40, 40, 120].map((kx) => (
          <g key={kx}>
            <circle cx={kx} cy={-548} r={18} fill={C.greyLight} />
            <rect x={kx - 2} y={-562} width={4} height={12} rx={2} fill={C.ink} />
          </g>
        ))}

        {/* door with handle, window and glowing interior */}
        <rect x={-170} y={-506} width={340} height={440} rx={16} fill={c} />
        <rect x={-140} y={-488} width={280} height={14} rx={7} fill={C.greyLight} />
        <rect x={-120} y={-460} width={240} height={300} rx={14} fill={C.ink} />
        <rect x={-108} y={-448} width={216} height={276} rx={10} fill={C.orange} opacity={0.45 + 0.25 * g} />
        <rect x={-96} y={-436} width={192} height={250} rx={8} fill={C.yellow} opacity={0.2 + 0.4 * g} />
        <rect x={-92} y={-420} width={34} height={200} rx={8} fill={C.white} opacity={0.18} />
        {/* grill rack lines inside the window */}
        {[-300, -240, -180].map((ly) => (
          <rect key={ly} x={-96} y={ly} width={192} height={6} rx={3} fill={C.inkSoft} opacity={0.6} />
        ))}

        {/* bottom vent strip and plinth */}
        {[-120, -110, -100, -90].map((vy) => (
          <rect key={vy} x={-110} y={vy} width={220} height={5} rx={2} fill={dk} />
        ))}
        <rect x={-180} y={-40} width={360} height={40} rx={8} fill={C.greyDark} />
      </g>
    </g>
  );
}
