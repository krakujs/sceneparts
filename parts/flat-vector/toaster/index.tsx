import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Two-slot toaster with a lever and a browning dial. anim "popup" makes the toast slices jump up out of the slots
// and sink back. Origin = bottom centre, hero size.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1.5)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/** How far the toast is lifted, 0 (down) .. 1 (up). One cycle every 120 frames. */
const lift = (f: number) => {
  const k = (f % 120) / 120;
  if (k < 0.2) { const t = k / 0.2; return 1 - (1 - t) ** 2; }
  if (k < 0.5) return 1;
  if (k < 0.6) return 1 - (k - 0.5) / 0.1;
  return 0;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.yellow;
  const dk = shade(c, 0.2);
  const up = p.anim === "popup" ? -lift(f) * 74 : 0;

  const slice = (cx: number, key: string) => (
    <g key={key} transform={`translate(${cx} ${f1(up)})`}>
      <rect x={-36} y={-190} width={72} height={100} rx={18} fill="#E0A65A" />
      <rect x={-27} y={-182} width={54} height={84} rx={14} fill="#F3CC85" />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={170} ry={12} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* body */}
        <rect x={-150} y={-150} width={300} height={150} rx={36} fill={c} />
        <rect x={120} y={-150} width={30} height={150} rx={18} fill={dk} />
        {/* top face with two slots */}
        <rect x={-140} y={-172} width={280} height={38} rx={14} fill={dk} />
        <rect x={-110} y={-164} width={80} height={26} rx={13} fill={C.inkSoft} />
        <rect x={30} y={-164} width={80} height={26} rx={13} fill={C.inkSoft} />
        {/* toast sits in the slots */}
        {slice(-70, "a")}
        {slice(70, "b")}
        {/* front: lever slot and handle, browning dial */}
        <rect x={-74} y={-98} width={148} height={14} rx={7} fill={dk} />
        <rect x={-22} y={-106} width={44} height={28} rx={10} fill={C.greyDark} />
        <circle cx={100} cy={-72} r={20} fill={C.white} />
        <rect x={99} y={-84} width={3} height={14} rx={1.5} fill={C.ink} />
        {/* crumb tray */}
        <rect x={-130} y={-22} width={260} height={22} rx={8} fill={C.greyDark} />
      </g>
    </g>
  );
}
