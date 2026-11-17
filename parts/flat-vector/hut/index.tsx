import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Round mud-and-straw hut with a conical thatch roof, front view. Origin = centre of the floor line.
// About 560 px wide and 640 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const mud = p.color && p.color !== "none" ? p.color : C.sand;
  const straw = p.color2 && p.color2 !== "none" ? p.color2 : C.yellowDark;
  const anim: string = p.anim ?? "none";
  const flicker = anim === "lights" ? (Math.floor(f / 4) % 2 ? C.orange : C.yellow) : C.orange;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={280} ry={20} fill={C.shadow} />
        {/* round mud wall */}
        <path d="M -270 -20 L -270 -300 Q -270 -380 -200 -390 L 200 -390 Q 270 -380 270 -300 L 270 -20 Q 270 0 250 0 L -250 0 Q -270 0 -270 -20 Z" fill={mud} />
        <path d="M 150 -390 Q 270 -380 270 -300 L 270 -20 Q 270 0 250 0 L 200 0 L 200 -40 Q 240 -90 240 -200 Z" fill={shade(mud, 0.14)} />
        {/* conical thatch roof with overhang and straw lines */}
        <path d="M -330 -360 Q -280 -400 -200 -400 L 200 -400 Q 280 -400 330 -360 L 0 -700 Z" fill={straw} />
        <path d="M -330 -360 L 0 -700 L 330 -360 Q 280 -340 200 -360 L -200 -360 Q -280 -340 -330 -360 Z" fill={shade(straw, 0.22)} />
        {[-180, -90, 0, 90, 180].map((sx) => (
          <path key={sx} d={`M ${sx} ${-690 + Math.abs(sx) * 0.1} L ${sx * 1.4} ${-400}`} stroke={shade(straw, 0.3)} strokeWidth={5} strokeLinecap="round" />
        ))}
        {/* doorway with a glow */}
        <path d="M -70 0 L -70 -190 Q -70 -230 0 -230 Q 70 -230 70 -190 L 70 0 Z" fill={C.brownDark} />
        <path d="M -40 0 L -40 -120 Q 0 -160 40 -120 L 40 0 Z" fill={flicker} opacity={anim === "lights" ? 0.9 : 0.5} />
        {/* small window and firewood */}
        <rect x={-220} y={-260} width={70} height={60} rx={10} fill={C.brownDark} />
        <rect x={-200} y={-240} width={30} height={20} rx={4} fill={C.sky} />
        <rect x={150} y={-40} width={110} height={18} rx={6} fill={C.brown} />
        <rect x={160} y={-72} width={110} height={18} rx={6} fill={C.brownDark} />
      </g>
    </g>
  );
}
