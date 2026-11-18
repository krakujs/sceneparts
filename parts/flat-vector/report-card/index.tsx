import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, font } from "../style/index";

// School report card: white sheet with a coloured header, rows of grey subject lines with A/B grade boxes,
// a teacher comment area and a star sticker. Origin = bottom centre; the sheet has a slight angle.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 2)})`
      : anim === "pop" ? `scale(${f1(1 + 0.2 * Math.sin(Math.min(1, Math.max(0, f / 20)) * Math.PI))})` : "";

const star = (cx: number, cy: number, R: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r : R;
    pts.push(`${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a))}`);
  }
  return pts.join(" ");
};

const ROWS: Array<[number, string]> = [[-470, "A"], [-390, "B"], [-310, "A"], [-230, "B"], [-150, "A"]];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const head = p.color && p.color !== "none" ? p.color : C.blue;
  const anim: string = p.anim ?? "none";
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={220} ry={12} fill={C.shadow} />
      <g transform={`rotate(-3) ${motion(anim, f)}`}>
        {/* sheet */}
        <rect x={-250} y={-640} width={500} height={640} rx={16} fill={C.white} />
        <rect x={-250} y={-640} width={500} height={120} rx={16} fill={head} />
        <rect x={-250} y={-540} width={500} height={20} fill={head} />
        <rect x={-170} y={-604} width={300} height={26} rx={13} fill={C.white} opacity={0.85} />
        {/* star sticker */}
        <polygon points={star(190, -600, 52, 24)} fill={shade(C.yellow, 0.12)} transform="translate(4 6)" />
        <polygon points={star(190, -600, 52, 24)} fill={C.yellow} />
        {/* subject rows */}
        {ROWS.map(([cy, grade], i) => (
          <g key={i}>
            <rect x={-200} y={cy - 7} width={170 - (i % 2) * 40} height={14} rx={7} fill={C.grey} />
            <rect x={80} y={cy - 26} width={100} height={52} rx={10} fill={grade === "A" ? C.greenDark : C.blueDark} />
            <text x={130} y={cy + 12} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={34} fill={C.white}>{grade}</text>
            <rect x={-210} y={cy + 40} width={420} height={3} rx={1.5} fill={C.greyLight} />
          </g>
        ))}
        {/* teacher comment and signature */}
        <rect x={-200} y={-100} width={340} height={12} rx={6} fill={C.grey} />
        <rect x={-200} y={-72} width={280} height={12} rx={6} fill={C.grey} />
        <rect x={-200} y={-36} width={160} height={4} rx={2} fill={C.greyDark} />
        <rect x={40} y={-36} width={160} height={4} rx={2} fill={C.greyDark} />
      </g>
    </g>
  );
}
