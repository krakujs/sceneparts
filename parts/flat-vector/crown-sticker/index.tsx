import React from "react";
import { pop, type PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector gold crown sticker: three points with jewels on a band, for king, best or top moments.
// Centre (x, y), about 440 px wide at s = 1. Motion comes only from p.f.

const crown = "M -190 120 L -230 -150 L -100 -40 L 0 -200 L 100 -40 L 230 -150 L 190 120 Z";
const band = { x: -200, y: 70, w: 400, h: 90, r: 26 };

const Crown = ({ c, e }: { c: string; e: number }) => (
  <>
    <path d={crown} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
    <rect x={band.x} y={band.y} width={band.w} height={band.h} rx={band.r} fill={c} stroke={c} strokeWidth={e} strokeLinejoin="round" />
  </>
);

const sparkPath = "M 0 -34 Q 6 -6 34 0 Q 6 6 0 34 Q -6 6 -34 0 Q -6 -6 0 -34 Z";

export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 960;
  const col: string = p.color ?? C.yellow;
  const anim: string = p.anim ?? "sparkle";
  const k = p.popIn === false ? 1 : pop(f, 0, 10);
  let dy = 0, rot = 0;
  if (anim === "bob") dy = Math.sin(f * 0.12) * 10;
  else if (anim === "wobble") rot = Math.sin(f * 0.15) * 4;
  const tw = (o: number) => (anim === "sparkle" ? 0.5 + 0.5 * Math.abs(Math.sin(f * 0.2 + o)) : 0);
  return (
    <g transform={`translate(${x} ${y + dy * s}) rotate(${rot}) scale(${s * k * 1.1 * (p.flip ? -1 : 1)} ${s * k * 1.1})`}>
      <g transform="translate(0 18)"><Crown c={C.shadow} e={0} /></g>
      {p.border !== false && <Crown c="#FFFFFF" e={34} />}
      <g transform="translate(0 12)"><Crown c={shade(col, 0.22)} e={0} /></g>
      <Crown c={col} e={0} />
      <rect x={-200} y={148} width={400} height={16} rx={8} fill={shade(col, 0.3)} />
      <circle cx={-230} cy={-150} r={30} fill={C.red} stroke="#FFFFFF" strokeWidth={8} />
      <circle cx={0} cy={-200} r={34} fill={C.teal} stroke="#FFFFFF" strokeWidth={8} />
      <circle cx={230} cy={-150} r={30} fill={C.purple} stroke="#FFFFFF" strokeWidth={8} />
      <circle cx={0} cy={105} r={28} fill={C.blue} stroke="#FFFFFF" strokeWidth={8} />
      <circle cx={-10} cy={96} r={8} fill="#FFFFFF" opacity={0.7} />
      {anim === "sparkle" && (
        <>
          <g transform="translate(-270 -220)" opacity={tw(0)}><path d={sparkPath} fill={C.yellow} transform="scale(0.9)" /></g>
          <g transform="translate(270 -230)" opacity={tw(2)}><path d={sparkPath} fill={C.yellow} transform="scale(0.8)" /></g>
        </>
      )}
    </g>
  );
}
