import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Jug blender on a motor base. The jug holds fruit-coloured contents (color2); anim "blend" swirls the
// contents, orbits the fruit pieces and spins the blade. Origin = bottom centre, hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const base = p.color && p.color !== "none" ? p.color : C.greyDark;
  const fruit = p.color2 && p.color2 !== "none" ? p.color2 : C.pink;
  const dk = shade(base, 0.25);
  const blend = p.anim === "blend";
  const t = f * 2 * Math.PI;
  // whole machine trembles a little while blending
  const shake = blend ? `translate(${f1(Math.sin(t / 6) * 2)} 0)` : "";
  // pieces of fruit orbit inside the liquid while blending
  const pieces = [[-30, -170, 14], [28, -150, 12], [6, -190, 10]];
  const orbit = (i: number) => {
    const a = blend ? t / 12 + i * 2.1 : i * 2.1;
    return [Math.cos(a) * 34, -168 + Math.sin(a) * 9];
  };

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim === "blend" ? "none" : (p.anim ?? "none"), f)}>
        <g transform={shake}>
          {/* motor base */}
          <rect x={-120} y={-118} width={240} height={118} rx={28} fill={base} />
          <rect x={92} y={-118} width={28} height={118} rx={14} fill={dk} />
          <rect x={-104} y={-8} width={208} height={8} rx={4} fill={C.greyDark} />
          <circle cx={-44} cy={-66} r={9} fill={C.white} opacity={0.85} />
          <circle cx={0} cy={-66} r={9} fill={C.white} opacity={0.85} />
          <circle cx={44} cy={-66} r={9} fill={C.yellow} />
          <rect x={-60} y={-40} width={120} height={14} rx={7} fill={dk} />

          {/* jug: translucent glass with liquid and fruit */}
          <path d="M -104 -360 L -88 -128 Q -86 -120 -78 -120 L 78 -120 Q 86 -120 88 -128 L 104 -360 Z" fill={C.white} opacity={0.4} />
          <path d="M -93 -200 L 93 -200 L 86 -130 Q 84 -122 76 -122 L -76 -122 Q -84 -122 -86 -130 Z" fill={fruit} />
          <path d="M -93 -200 L 93 -200 L 90 -186 Q 0 -170 -90 -186 Z" fill={shade(fruit, 0.15)} />
          {pieces.map(([px, py, pr], i) => {
            const [ox, oy] = blend ? orbit(i) : [px, py];
            return <circle key={i} cx={ox} cy={oy} r={pr} fill={shade(fruit, 0.25)} />;
          })}
          {/* blade in the base of the jug */}
          <g transform={`translate(0 -132) rotate(${blend ? f1((f * 14) % 360) : 20})`}>
            <rect x={-44} y={-4} width={88} height={8} rx={4} fill={C.greyLight} />
            <rect x={-4} y={-30} width={8} height={60} rx={4} fill={C.greyLight} />
          </g>
          {/* lid */}
          <rect x={-110} y={-374} width={220} height={18} rx={9} fill={C.inkSoft} />
          <rect x={-70} y={-392} width={140} height={22} rx={11} fill={C.inkSoft} />
        </g>
      </g>
    </g>
  );
}
