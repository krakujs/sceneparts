import React from "react";
import type { PartProps } from "@sceneparts/core";
import { shade } from "../style/index";
import { taper } from "../quadruped/index";

// Flat vector brown fruit bat, seen from the front with leathery wings. Centre (x, y default 540, 900), about 500 px wingspan at s = 1.
// pose fly: wings flap from p.f. pose glide: wings held out still. Symmetric, so flip only mirrors the detail.

type P = [number, number];
const BODY = "#6E4B36", DARK = shade(BODY, 0.2), WING = "#8A5E45", WING_DK = shade(WING, 0.15), BONE = "#4A3224", FACE = "#A98065", EAR_IN = "#D49C86", EYE = "#1F2433";

// one wing in local space, shoulder at (34, -18), tips to the right
function Wing({ a }: { a: number }) {
  return (
    <g transform={`translate(34 -18) rotate(${a}) translate(-34 18)`}>
      <path d="M 34 -18 L 150 -72 L 258 -44 Q 236 -10 226 30 Q 200 62 170 60 Q 140 76 110 64 Q 80 52 34 30 Z" fill={WING} />
      <path d="M 150 -72 Q 200 -8 226 30 L 170 60 Q 140 26 150 -72 Z" fill={WING_DK} />
      {taper([34, -18], [96, -48], [150, -72], 12, 9, BONE)}
      {taper([150, -72], [206, -62], [258, -44], 9, 4, BONE)}
      {taper([34, -18], [130, 10], [226, 30], 7, 4, BONE)}
      {taper([34, -18], [120, 44], [170, 60], 6, 3, BONE)}
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, fly = p.pose !== "glide";
  const x = (p.x ?? 540) + (p.vx ?? 0) * f, y = (p.y ?? 900) + (fly ? Math.sin(f * 0.3) * 6 : 0);
  const flap = fly ? Math.sin(f * 0.3) * 26 : -4;
  const eyeBlink = Math.sin(f / 40) > 0.97;

  return (
    <g transform={`translate(${x} ${y}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform="scale(-1 1)"><Wing a={-flap} /></g>
      <Wing a={flap} />
      {taper([-16, -84], [-26, -130], [-14, -160], 24, 6, DARK, undefined, true)}
      {taper([16, -84], [26, -130], [14, -160], 24, 6, DARK, undefined, true)}
      {taper([-14, -88], [-20, -126], [-12, -146], 12, 4, EAR_IN)}
      {taper([14, -88], [20, -126], [12, -146], 12, 4, EAR_IN)}
      <ellipse cx={0} cy={18} rx={40} ry={56} fill={BODY} />
      <ellipse cx={0} cy={26} rx={22} ry={32} fill={FACE} />
      <circle cx={0} cy={-56} r={40} fill={BODY} />
      <ellipse cx={0} cy={-40} rx={22} ry={16} fill={FACE} />
      <ellipse cx={0} cy={-46} rx={6} ry={4} fill={DARK} />
      <circle cx={-18} cy={-62} r={11} fill={EYE} />
      <circle cx={18} cy={-62} r={11} fill={EYE} />
      {!eyeBlink && <circle cx={-15} cy={-66} r={3.5} fill="#FFFFFF" />}
      {!eyeBlink && <circle cx={21} cy={-66} r={3.5} fill="#FFFFFF" />}
      <path d="M -8 -34 Q 0 -28 8 -34" fill="none" stroke={DARK} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}
