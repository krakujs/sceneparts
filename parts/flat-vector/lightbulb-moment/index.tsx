import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector glowing light bulb with rays that flicker on. Centre (x, y), about 300 px wide at s = 1.
// Motion comes only from p.f: pop-in, idle flicker/bob/pulse.

const bulbPath = "M 0 -170 C 95 -170 150 -105 150 -35 C 150 5 128 34 110 60 L 110 92 L -110 92 L -110 60 C -128 34 -150 5 -150 -35 C -150 -105 -95 -170 0 -170 Z";
const basePath = "M -62 102 L 62 102 Q 66 102 66 110 L 66 130 Q 66 140 56 140 L -56 140 Q -66 140 -66 130 L -66 110 Q -66 102 -62 102 Z";

const Shape = ({ fill, sticker }: { fill?: string; sticker?: boolean }) => (
  <>
    <path d={bulbPath} fill={fill} stroke={sticker ? "#FFFFFF" : undefined} strokeWidth={sticker ? 34 : 0} strokeLinejoin="round" />
    <path d={basePath} fill={fill} stroke={sticker ? "#FFFFFF" : undefined} strokeWidth={sticker ? 34 : 0} strokeLinejoin="round" />
  </>
);

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const anim: string = p.anim ?? "flicker";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dy = 0, sc = 1, flick = 1;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  else if (anim === "pulse") sc = 1 + Math.sin(f * 0.25) * 0.04;
  else if (anim === "flicker") flick = 0.65 + 0.35 * Math.abs(Math.sin(f * 0.4));
  const rays = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g transform={`translate(${x} ${y + dy * s}) scale(${s * k * sc} ${s * k * sc}) ${p.flip ? "scale(-1 1)" : ""}`}>
      <g opacity={flick}>
        {rays.map((i) => {
          const a = -Math.PI / 2 + (i * Math.PI) / 4 + Math.PI / 8 * 0;
          const r1 = 200, r2 = i % 2 ? 250 : 275;
          return (
            <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1 - 30} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2 - 30}
              stroke={C.yellow} strokeWidth={22} strokeLinecap="round" />
          );
        })}
      </g>
      <g transform="translate(0 40)">
        {p.border !== false && <Shape sticker />}
        <g transform="translate(0 18)" opacity={1}><Shape fill={C.shadow} /></g>
        <g transform="translate(0 12)"><Shape fill={shade(col, 0.22)} /></g>
        <Shape fill={col} />
        <path d="M -96 -40 Q -90 -110 -30 -132" fill="none" stroke="#FFFFFF" strokeWidth={18} strokeLinecap="round" opacity={0.8} />
        <rect x={-66} y={104} width={132} height={10} rx={5} fill={shade(col, 0.3)} />
        <rect x={-66} y={122} width={132} height={10} rx={5} fill={shade(col, 0.3)} />
      </g>
    </g>
  );
}
