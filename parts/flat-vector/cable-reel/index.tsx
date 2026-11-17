import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Cable reel: a wooden drum with a coiled orange extension cable and a plug at the end. Seen from the front, standing on its flange.
// Origin = bottom centre (the floor line). Room scale: at s = 1 about 600 px across. Use s about 0.5 next to a person. anim spin turns the reel.
const f1 = (v: number) => v.toFixed(1);
const R = 290; // flange radius; the reel centre sits at (0, -R)
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`;
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wood = p.color && p.color !== "none" ? p.color : C.sand;
  const cable = p.color2 && p.color2 !== "none" ? p.color2 : C.orange;
  const anim: string = p.anim ?? "none";
  const spin = anim === "spin" ? `rotate(${f1((f * 3) % 360)} 0 ${-R})` : "";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={300} ry={16} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <g transform={spin}>
          {/* flanges and drum */}
          <circle cx={0} cy={-R} r={R} fill={shade(wood, 0.2)} />
          <circle cx={0} cy={-R} r={R - 22} fill={wood} />
          <circle cx={0} cy={-R} r={120} fill={shade(wood, 0.2)} />
          {/* wound cable: three layers */}
          {[236, 196, 156].map((r) => (
            <circle key={r} cx={0} cy={-R} r={r} fill="none" stroke={cable} strokeWidth={34} />
          ))}
          {/* cable end leaving the reel, with a plug */}
          <path d={`M222,${f1(-R - 80)} C300,-340 320,-260 290,-228`} fill="none" stroke={cable} strokeWidth={30} strokeLinecap="round" />
          <rect x={280} y={-250} width={80} height={44} rx={10} fill={C.ink} />
          <rect x={352} y={-240} width={24} height={8} rx={3} fill={C.greyLight} />
          <rect x={352} y={-226} width={24} height={8} rx={3} fill={C.greyLight} />
          {/* hub hole */}
          <circle cx={0} cy={-R} r={40} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}
