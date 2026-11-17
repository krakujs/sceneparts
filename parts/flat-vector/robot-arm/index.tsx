import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Industrial robot arm: a column on a heavy base, shoulder and elbow joints and a two-finger gripper.
// Room-scale machine. Origin = centre of the base on the floor. anim "swing" moves the joints and opens/closes the gripper.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = p.color && p.color !== "none" ? p.color : C.orange;
  const dark = shade(body, 0.25);
  const joint = C.greyDark;
  const anim: string = p.anim ?? "none";
  const th = (f * 2 * Math.PI) / 120;
  const sw = anim === "swing";
  const a1 = sw ? 25 + 14 * Math.sin(th) : 25; // shoulder
  const a2 = sw ? -35 + 18 * Math.sin(th + 1.1) : -35; // elbow
  const a3 = sw ? 20 + 20 * Math.sin(th + 2.2) : 20; // wrist
  const open = sw ? 34 + 12 * Math.sin(2 * th) : 34; // gripper opening
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={240} ry={14} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        <rect x={-170} y={-60} width={340} height={60} rx={16} fill={C.inkSoft} />
        <rect x={-95} y={-270} width={190} height={216} rx={22} fill={dark} />
        <circle cx={0} cy={-250} r={92} fill={dark} />
        <g transform={`translate(0 -250) rotate(${f1(a1)})`}>
          <rect x={-55} y={-260} width={110} height={260} rx={26} fill={body} />
          <rect x={-40} y={-240} width={14} height={220} rx={7} fill={C.white} opacity={0.25} />
          <g transform={`translate(0 -260) rotate(${f1(a2)})`}>
            <rect x={-45} y={-230} width={90} height={230} rx={22} fill={body} />
            <rect x={-30} y={-210} width={12} height={190} rx={6} fill={C.white} opacity={0.25} />
            <circle cx={0} cy={0} r={52} fill={joint} />
            <circle cx={0} cy={0} r={22} fill={C.greyLight} />
            <g transform={`translate(0 -230) rotate(${f1(a3)})`}>
              <circle cx={0} cy={0} r={40} fill={joint} />
              <rect x={-(open + 22)} y={-70} width={2 * (open + 22)} height={26} rx={8} fill={joint} />
              <rect x={-(open + 22)} y={-150} width={22} height={100} rx={10} fill={C.inkSoft} />
              <rect x={open} y={-150} width={22} height={100} rx={10} fill={C.inkSoft} />
            </g>
          </g>
          <circle cx={0} cy={0} r={62} fill={joint} />
          <circle cx={0} cy={0} r={24} fill={C.greyLight} />
        </g>
      </g>
    </g>
  );
}
