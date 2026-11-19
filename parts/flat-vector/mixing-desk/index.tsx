import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Audio mixing desk: a console with eight channel strips, each with a rotary knob, a fader slot and a cap.
// Origin = bottom centre of the console. anim "faders" slides the fader caps up and down at different speeds.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const CHANNELS = [0, 1, 2, 3, 4, 5, 6, 7];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const anim: string = p.anim ?? "none";
  const moving = anim === "faders";
  const caps = [C.orange, C.blue];
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={4} rx={420} ry={14} fill={C.shadow} />
      <g transform={motion(anim === "faders" ? "" : anim, f)}>
        <rect x={-404} y={-8} width={808} height={8} rx={4} fill={C.ink} />
        <rect x={-400} y={-230} width={800} height={230} rx={18} fill={body} />
        {/* sloped top panel */}
        <rect x={-390} y={-252} width={780} height={30} rx={10} fill={shade(body, -0.15)} />
        <rect x={-380} y={-214} width={760} height={206} rx={12} fill={shade(body, 0.25)} />
        {/* meter strip at the top right */}
        <rect x={250} y={-244} width={120} height={16} rx={6} fill={C.ink} />
        {CHANNELS.map((i) => {
          const cx = -315 + i * 90;
          const capY = -100 + (moving ? 48 * Math.sin((f * 2 * Math.PI) / (50 + i * 9) + i * 1.3) : (i % 3) * 12 - 12);
          const lit = i % 2 === 0;
          return (
            <g key={i}>
              <circle cx={cx} cy={-188} r={17} fill={C.greyLight} />
              <line x1={cx} y1={-180} x2={cx + Math.cos((i * 0.7) - 1) * 12} y2={-188 + Math.sin((i * 0.7) - 1) * 12} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
              <rect x={cx - 26} y={-168} width={52} height={10} rx={5} fill={C.greyDark} opacity={0.6} />
              <rect x={cx - 5} y={-150} width={10} height={124} rx={5} fill={C.ink} />
              <rect x={cx - 24} y={capY - 14} width={48} height={28} rx={6} fill={caps[i % 2]} />
              <rect x={cx - 16} y={capY - 4} width={32} height={3} rx={1.5} fill={C.white} opacity={0.8} />
              <circle cx={cx} cy={-28} r={5} fill={lit ? C.green : C.greyDark} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
