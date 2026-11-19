import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Portal: a swirling purple and pink vortex in an oval frame, with sparkles circling the rim.
// anim "open": the portal grows from nothing over the first 50 frames, then keeps swirling.
// Effect: origin = centre of the oval; about 600 x 960 px at s = 1.
const RX = 280, RY = 440;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const { x = 540, y = 960, s = 1, f = 0, flip, color = "#7B5CD6", color2 = "#F27BA6", anim = "open" } = p as any;
  const k = anim === "open" ? Math.max(0.001, ease(Math.min(1, f / 50))) : 1;
  const rot = f * 0.035;
  // Four spiral arms running from the centre out to the rim, alternating purple and pink.
  const arms = [0, 1, 2, 3].map((i) => {
    const pts: string[] = [];
    for (let j = 0; j <= 40; j++) {
      const t = j / 40;
      const ang = rot + (i * Math.PI) / 2 + t * Math.PI * 2.2;
      const rr = 0.12 + 0.88 * t;
      pts.push(`${(Math.cos(ang) * RX * rr).toFixed(1)} ${(Math.sin(ang) * RY * rr).toFixed(1)}`);
    }
    return <path key={i} d={"M " + pts.join(" L ")} fill="none" stroke={i % 2 ? color2 : color} strokeWidth={26} strokeLinecap="round" opacity={0.85} />;
  });
  const sparkles = Array.from({ length: 7 }, (_, i) => {
    const a = rot * 1.6 * (1 + i * 0.05) + (i * Math.PI * 2) / 7;
    const px = Math.cos(a) * RX * 0.8, py = Math.sin(a) * RY * 0.8;
    const size = 14 + 8 * Math.sin(f / 8 + i);
    const d = `M 0 ${(-size).toFixed(1)} Q 0 0 ${size.toFixed(1)} 0 Q 0 0 0 ${size.toFixed(1)} Q 0 0 ${(-size).toFixed(1)} 0 Q 0 0 0 ${(-size).toFixed(1)} Z`;
    return (
      <g key={i} transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(f * 6 + i * 30) % 360})`}>
        <path d={d} fill={C.white} opacity={0.9} />
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -s : s) * k} ${s * k})`} opacity={Math.min(1, k * 1.2)}>
      <defs>
        <radialGradient id="portal-core" cx="0" cy="0" r="1">
          <stop offset="0" stopColor="#1E1338" stopOpacity={0.95} />
          <stop offset="0.6" stopColor={color} stopOpacity={0.6} />
          <stop offset="1" stopColor={color2} stopOpacity={0.3} />
        </radialGradient>
      </defs>
      <ellipse cx={0} cy={0} rx={RX + 34} ry={RY + 34} fill={color} opacity={0.22} />
      <ellipse cx={0} cy={0} rx={RX} ry={RY} fill="url(#portal-core)" />
      {arms}
      <ellipse cx={0} cy={0} rx={RX} ry={RY} fill="none" stroke={color2} strokeWidth={22} />
      <ellipse cx={0} cy={0} rx={RX - 18} ry={RY - 18} fill="none" stroke={C.white} strokeWidth={4} opacity={0.5} />
      {sparkles}
    </g>
  );
}
