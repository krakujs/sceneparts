import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";
import Egg from "../easter-egg/index";

// Easter basket: a woven basket with a handle, green grass over the rim and five decorated eggs peeking out.
// Origin = bottom centre (the basket stands on y). About 500 px wide and 690 px tall at s = 1.
// anim "bob": the basket gently rises and falls.
const f1 = (v: number) => v.toFixed(1);
const WEAVE = "M -230 -250 L 230 -250 L 186 -20 Q 180 0 160 0 L -160 0 Q -180 0 -186 -20 Z";
const EGG_COLOURS: [string, string][] = [
  [C.pink, C.white], ["#BDE7D8", C.white], ["#FFE7A3", C.orange], ["#C9B8F0", C.white], ["#B9DDF5", C.yellow],
];
const EGGS: [number, number][] = [[-170, -150], [-85, -186], [0, -140], [85, -180], [170, -152]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const wicker = p.color && p.color !== "none" ? p.color : "#C98B52";
  const grass = p.color2 && p.color2 !== "none" ? p.color2 : C.green;
  const anim: string = p.anim ?? "none";
  const bob = anim === "bob" ? -(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8 : 0;
  const blades = Array.from({ length: 15 }, (_, i) => -218 + i * 32);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={250} ry={16} fill={C.shadow} />
      <g transform={`translate(0 ${f1(bob)})`}>
        {/* handle behind the basket */}
        <path d="M -200 -236 Q -200 -440 0 -440 Q 200 -440 200 -236" fill="none" stroke={shade(wicker, 0.1)} strokeWidth={28} strokeLinecap="round" />
        {/* eggs sit inside, so their lower parts are hidden by the front wall */}
        {EGGS.map(([ex, ey], i) => {
          const q: any = { x: ex, y: ey, s: 0.42, color: EGG_COLOURS[i][0], color2: EGG_COLOURS[i][1], anim: "none", f: 0, d: p.d, t: p.t, style: p.style, render: p.render };
          return <Egg key={i} {...q} />;
        })}
        {/* woven body */}
        <defs>
          <clipPath id="easter-basket-clip">
            <path d={WEAVE} />
          </clipPath>
        </defs>
        <path d={WEAVE} fill={wicker} />
        <g clipPath="url(#easter-basket-clip)" stroke={shade(wicker, 0.28)} strokeWidth={7} fill="none">
          {Array.from({ length: 16 }, (_, i) => -420 + i * 36).map((xx) => <line key={xx} x1={xx} y1={-260} x2={xx + 150} y2={0} />)}
          {Array.from({ length: 16 }, (_, i) => -420 + i * 36).map((xx) => <line key={`b${xx}`} x1={xx + 150} y1={-260} x2={xx} y2={0} />)}
        </g>
        {/* front rim band */}
        <rect x={-240} y={-262} width={480} height={30} rx={12} fill={shade(wicker, 0.12)} />
        <rect x={-240} y={-262} width={480} height={8} rx={4} fill={shade(wicker, 0.25)} />
        {/* grass tufts over the rim */}
        {blades.map((bx, i) => {
          const h = 40 + (i % 3) * 22;
          return (
            <path key={i} d={`M ${f1(bx - 9)} -258 Q ${f1(bx - 2)} ${f1(-258 - h * 0.6)} ${f1(bx + (i % 2 ? 14 : -10))} ${f1(-258 - h)} Q ${f1(bx + 8)} ${f1(-258 - h * 0.5)} ${f1(bx + 9)} -258 Z`} fill={i % 2 ? grass : shade(grass, 0.2)} />
          );
        })}
      </g>
    </g>
  );
}
