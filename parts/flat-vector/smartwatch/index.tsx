import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Smartwatch: square case with a generic face (progress ring, hands, date bar) and two strap pieces.
// Origin = bottom centre (lower strap rests on y). anim "glow": the face and ring brighten and flicker.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const strap = p.strap && p.strap !== "none" ? p.strap : C.teal;
  const face = p.screen && p.screen !== "none" ? p.screen : C.navy;
  const anim: string = p.anim ?? "none";
  const glowing = anim === "glow";
  const breathe = (Math.sin((f * 2 * Math.PI) / 50) + 1) / 2;
  const flick = 0.5 + 0.5 * Math.sin(f * 1.7) * Math.sin(f * 0.53 + 1);
  const C_LEN = 2 * Math.PI * 100;
  const hourA = 300 + f * 0.008, minA = 60 + f * 0.1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={160} ry={12} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-92} y={-230} width={184} height={230} rx={22} fill={strap} />
        {[-60, -36].map((hy) => (
          <circle key={hy} cx={0} cy={hy} r={6} fill={shade(strap, 0.35)} />
        ))}
        <rect x={-92} y={-700} width={184} height={250} rx={22} fill={strap} />
        {[-660, -636].map((hy) => (
          <circle key={hy} cx={0} cy={hy} r={6} fill={shade(strap, 0.35)} />
        ))}
        {glowing && <rect x={-176} y={-500} width={352} height={340} rx={100} fill={face} opacity={0.12 + 0.18 * breathe} />}
        <rect x={-140} y={-470} width={280} height={280} rx={72} fill={body} />
        <rect x={138} y={-364} width={22} height={44} rx={8} fill={shade(body, 0.2)} />
        <rect x={-122} y={-452} width={244} height={244} rx={58} fill={face} />
        <circle cx={0} cy={-330} r={100} fill="none" stroke={shade(face, -0.3)} strokeWidth={16} />
        <circle
          cx={0} cy={-330} r={100} fill="none" stroke={C.green} strokeWidth={16}
          strokeDasharray={`${(0.72 * C_LEN).toFixed(1)} ${C_LEN.toFixed(1)}`}
          transform="rotate(-90 0 -330)" strokeLinecap="round"
          opacity={glowing ? 0.75 + 0.25 * breathe : 1}
        />
        <rect x={-40} y={-410} width={80} height={8} rx={4} fill={C.white} opacity={0.5} />
        <g transform={`translate(0 -330) rotate(${f1(hourA)})`}>
          <line x1={0} y1={8} x2={0} y2={-48} stroke={C.white} strokeWidth={12} strokeLinecap="round" />
        </g>
        <g transform={`translate(0 -330) rotate(${f1(minA)})`}>
          <line x1={0} y1={8} x2={0} y2={-74} stroke={C.white} strokeWidth={8} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={-330} r={8} fill={C.yellow} />
        {glowing && <rect x={-122} y={-452} width={244} height={244} rx={58} fill={C.white} opacity={0.03 + 0.09 * flick * (0.6 + 0.4 * breathe)} />}
      </g>
    </g>
  );
}
