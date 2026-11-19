import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Hand landing net: a wooden pole with a grip, a round hoop, and a deep mesh bag hanging well below the hoop
// with a crosshatch pattern and a fish visible inside. Origin = the bottom of the grip on the floor.
// Room scale: about 580 px wide and 870 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "pop") return `scale(${f1(popS(f))})`;
  return "";
};

// Bag outline: starts and ends on the lower half of the hoop, then sags deep down to y = -40.
const BAG = "M -90 -700 A 170 170 0 0 0 250 -700 C 320 -470 290 -120 80 -40 C -130 -120 -160 -470 -90 -700 Z";
// Crosshatch: diagonal lines both ways, spaced 34 px.
const mesh = (() => {
  let d = "";
  for (let c = -1000; c <= 600; c += 34) {
    d += ` M ${c} -700 L ${c + 800} 100`;
    d += ` M ${c} -700 L ${c - 800} 100`;
  }
  return d.trim();
})();

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const hoop = p.color && p.color !== "none" ? p.color : C.greyDark;
  const pole = p.color2 && p.color2 !== "none" ? p.color2 : C.brown;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <defs>
          <clipPath id="flat-net-bag">
            <path d={BAG} />
          </clipPath>
        </defs>
        {/* pole with a darker grip at the bottom, meeting the hoop */}
        <line x1={-330} y1={0} x2={-40} y2={-580} stroke={pole} strokeWidth={22} strokeLinecap="round" />
        <line x1={-330} y1={0} x2={-310} y2={-120} stroke={shade(pole, 0.3)} strokeWidth={34} strokeLinecap="round" />
        {/* bag: translucent fill, a fish, then the mesh over both */}
        <path d={BAG} fill={C.white} opacity={0.6} />
        <g transform="translate(-15 112.5) scale(1.25)">
          <ellipse cx={60} cy={-330} rx={80} ry={38} fill={C.orange} />
          <polygon points="130,-330 180,-368 180,-292" fill={shade(C.orange, 0.1)} />
          <polygon points="50,-366 72,-404 96,-366" fill={shade(C.orange, 0.15)} />
          <circle cx={25} cy={-342} r={9} fill={C.ink} />
          <circle cx={28} cy={-345} r={3} fill={C.white} />
        </g>
        <path d={mesh} stroke={C.greyDark} strokeWidth={3.5} fill="none" opacity={0.7} clipPath="url(#flat-net-bag)" />
        {/* hoop on top of the bag */}
        <circle cx={80} cy={-700} r={170} fill="none" stroke={hoop} strokeWidth={26} />
      </g>
    </g>
  );
}
