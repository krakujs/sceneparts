import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Pair of scissors lying open on the floor, seen from above in an X shape. Hero scale.
// Origin = floor centre under the pivot area. anim "snip" opens and closes the upper half round the pivot.
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const PX = 0, PY = -112; // pivot screw
// Each half is a straight line through the pivot: a blade tip one way, a handle the other way.
const BLADE_A = { x: -190, y: -70 }, HANDLE_A = { x: 152, y: 56 }; // upper half
const BLADE_B = { x: -190, y: 70 }, HANDLE_B = { x: 152, y: -56 }; // lower half

const bladePts = (tip: { x: number; y: number }) => {
  const len = Math.hypot(tip.x, tip.y), ux = tip.x / len, uy = tip.y / len;
  const px = -uy, py = ux; // perpendicular
  const w = 16, t = 4; // half-width at the pivot and at the tip
  const pts: [number, number][] = [
    [PX + px * w, PY + py * w], [PX + tip.x + px * t, PY + tip.y + py * t],
    [PX + tip.x - px * t, PY + tip.y - py * t], [PX - px * w, PY - py * w],
  ];
  return pts.map(([a, b]) => `${f1(a)},${f1(b)}`).join(" ");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const handle = p.color && p.color !== "none" ? p.color : C.red;
  const blade = p.color2 && p.color2 !== "none" ? p.color2 : C.grey;
  const anim: string = p.anim ?? "none";
  const snip = anim === "snip" ? Math.sin((f * 2 * Math.PI) / 36) * 7 : 0;
  const ring = (h: { x: number; y: number }) => (
    <circle cx={PX + h.x} cy={PY + h.y} r={44} fill="none" stroke={handle} strokeWidth={26} />
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={-6} rx={250} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* lower half, fixed */}
        <polygon points={bladePts(BLADE_B)} fill={blade} />
        {ring(HANDLE_B)}
        {/* upper half, opens and closes about the pivot */}
        <g transform={`rotate(${f1(snip)} ${PX} ${PY})`}>
          <polygon points={bladePts(BLADE_A)} fill={shade(blade, 0.12)} />
          {ring(HANDLE_A)}
        </g>
        <circle cx={PX} cy={PY} r={13} fill={C.inkSoft} />
        <circle cx={PX} cy={PY} r={5} fill={C.white} />
      </g>
    </g>
  );
}
