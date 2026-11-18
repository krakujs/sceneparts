import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector ringing notification bell with a red dot badge. Centre (x, y), about 400 px wide at s = 1.
// The bell swings from its top pivot; motion comes only from p.f.

const bellPath = "M -130 70 C -130 -40 -130 -170 0 -180 C 130 -170 130 -40 130 70 L 168 118 Q 176 132 160 132 L -160 132 Q -176 132 -168 118 Z";
const clapper = { cx: 0, cy: 168, r: 38 };

const Bell = ({ fill, sticker }: { fill: string; sticker?: boolean }) => (
  <>
    <path d={bellPath} fill={fill} stroke={sticker ? "#FFFFFF" : undefined} strokeWidth={sticker ? 34 : 0} strokeLinejoin="round" />
    <circle cx={clapper.cx} cy={clapper.cy} r={clapper.r + (sticker ? 17 : 0)} fill={fill} />
    <circle cx={0} cy={-196} r={34 + (sticker ? 17 : 0)} fill={fill} />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const anim: string = p.anim ?? "swing";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let rot = 0, dx = 0;
  if (anim === "swing") rot = Math.sin(f * 0.35) * 14 * Math.max(0.35, Math.cos(f * 0.05));
  else if (anim === "shake") dx = Math.sin(f * 0.9) * 6;
  const flip = p.flip ? -1 : 1;
  return (
    <g transform={`translate(${x + dx * s} ${y}) scale(${s * k * flip * 1.3} ${s * k * 1.3})`}>
      <g transform={`rotate(${rot} 0 -180)`}>
        <g transform="translate(0 18)" opacity={1}><Bell fill={C.shadow} sticker={false} /></g>
        {p.border !== false && <Bell fill="#FFFFFF" sticker />}
        <g transform="translate(0 12)"><Bell fill={shade(col, 0.22)} /></g>
        <Bell fill={col} />
        <path d="M -92 -40 Q -86 -110 -40 -140" fill="none" stroke="#FFFFFF" strokeWidth={18} strokeLinecap="round" opacity={0.8} />
        <rect x={-120} y={100} width={240} height={14} rx={7} fill={shade(col, 0.3)} />
        <circle cx={112} cy={-130} r={58} fill="#FFFFFF" />
        <circle cx={112} cy={-130} r={46} fill={C.red} />
        <circle cx={112} cy={-142} r={12} fill="#FFFFFF" opacity={0.6} />
      </g>
    </g>
  );
}
