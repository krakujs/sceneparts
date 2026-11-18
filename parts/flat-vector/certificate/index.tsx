import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Framed certificate on a wall: decorative gold border, grey text lines (no words) and a gold rosette seal
// with ribbons. Wall item: centred on (x, y); default y = 760. anim "shine" sweeps a glint across the frame.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const frame = p.color && p.color !== "none" ? p.color : C.navy;
  const gold = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const anim: string = p.anim ?? "none";
  const sx = -400 + ((f % 100) / 100) * 800;
  const seal = [];
  for (let i = 0; i < 14; i++) {
    const a = (i * Math.PI * 2) / 14;
    seal.push(<circle key={i} cx={170 + Math.cos(a) * 50} cy={110 + Math.sin(a) * 50} r={11} fill={shade(gold, 0.1)} />);
  }
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(anim, f)}>
        <defs>
          <clipPath id="cert-frame-clip">
            <rect x={-330} y={-240} width={660} height={480} rx={14} />
          </clipPath>
        </defs>
        {/* outer frame, gold border band, paper */}
        <rect x={-330} y={-240} width={660} height={480} rx={14} fill={frame} />
        <rect x={-322} y={-232} width={644} height={464} rx={10} fill={shade(frame, 0.2)} />
        <rect x={-300} y={-210} width={600} height={420} rx={6} fill={gold} />
        <rect x={-284} y={-194} width={568} height={388} rx={4} fill={C.white} />
        {[[-284, -194], [284, -194], [-284, 194], [284, 194]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={9} fill={shade(gold, 0.2)} />
        ))}
        {/* title and body lines (grey, no words) */}
        <rect x={-150} y={-130} width={300} height={24} rx={12} fill={C.greyDark} />
        <rect x={-200} y={-72} width={400} height={12} rx={6} fill={C.grey} />
        <rect x={-170} y={-40} width={340} height={12} rx={6} fill={C.grey} />
        <rect x={-190} y={-8} width={380} height={12} rx={6} fill={C.grey} />
        {/* signature line */}
        <rect x={-230} y={130} width={170} height={4} rx={2} fill={C.greyDark} />
        <rect x={-220} y={92} width={150} height={6} rx={3} fill={C.grey} />
        {/* ribbons and rosette seal */}
        <rect x={138} y={140} width={26} height={86} rx={4} fill={C.red} transform="rotate(12 151 140)" />
        <rect x={176} y={140} width={26} height={86} rx={4} fill={C.redDark} transform="rotate(-12 189 140)" />
        {seal}
        <circle cx={170} cy={110} r={46} fill={gold} />
        <circle cx={170} cy={110} r={30} fill={shade(gold, 0.15)} />
        <circle cx={170} cy={110} r={22} fill={gold} />
        {/* shine: a diagonal glint sweeping across the frame */}
        {anim === "shine" && (
          <polygon
            points={`${f1(sx)},-260 ${f1(sx + 70)},-260 ${f1(sx + 330)},260 ${f1(sx + 260)},260`}
            fill={C.white}
            opacity={0.45}
            clipPath="url(#cert-frame-clip)"
          />
        )}
      </g>
    </g>
  );
}
