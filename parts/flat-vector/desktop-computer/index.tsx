import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Desktop computer: monitor, tower and keyboard on a desk. Origin = bottom centre of the group (desk top = y).
// anim "blink": the tower's power LED flashes.
const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`
      : anim === "pop" ? `scale(${f1(easeOutBack(Math.min(1, Math.max(0, f / 20))))})` : "";

const KEY_ROWS = [{ n: 12, y: -33, off: 0 }, { n: 12, y: -24, off: 0 }, { n: 11, y: -15, off: 10 }, { n: 11, y: -6, off: -10 }];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const body = p.color && p.color !== "none" ? p.color : C.inkSoft;
  const scr = p.screen && p.screen !== "none" ? p.screen : C.sky;
  const anim: string = p.anim ?? "none";
  const ledOn = anim !== "blink" || Math.floor(f / 15) % 2 === 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={-30} cy={0} rx={340} ry={10} fill={C.shadow} />
      <g transform={motion(anim, f)}>
        {/* monitor: stand, neck, panel, screen */}
        <rect x={-150} y={-18} width={180} height={18} rx={8} fill={shade(body, 0.25)} />
        <rect x={-84} y={-212} width={48} height={200} fill={shade(body, 0.1)} />
        <rect x={-290} y={-500} width={460} height={290} rx={18} fill={body} />
        <rect x={-274} y={-484} width={428} height={252} rx={8} fill={scr} />
        <rect x={-274} y={-484} width={428} height={24} fill={C.white} opacity={0.5} />
        <rect x={-254} y={-446} width={200} height={170} rx={10} fill={C.white} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-236 + i * 44} y={-296 - [30, 50, 38, 70][i]} width={24} height={[30, 50, 38, 70][i]} rx={4} fill={C.blue} />
        ))}
        <rect x={-40} y={-446} width={176} height={110} rx={10} fill={C.yellow} opacity={0.9} />
        <rect x={-40} y={-322} width={176} height={80} rx={10} fill={C.teal} opacity={0.85} />
        <rect x={-274} y={-244} width={428} height={12} fill={C.inkSoft} opacity={0.3} />
        {/* tower */}
        <rect x={200} y={-430} width={130} height={430} rx={14} fill={body} />
        <rect x={214} y={-410} width={102} height={380} rx={8} fill={shade(body, 0.12)} />
        <rect x={228} y={-380} width={74} height={12} rx={3} fill={shade(body, 0.35)} />
        <rect x={228} y={-356} width={74} height={12} rx={3} fill={shade(body, 0.35)} />
        <circle cx={262} cy={-300} r={6} fill={ledOn ? C.green : shade(C.green, 0.6)} />
        <circle cx={262} cy={-260} r={14} fill={C.greyLight} />
        {/* keyboard */}
        <rect x={-260} y={-40} width={400} height={40} rx={10} fill={shade(body, 0.1)} />
        {KEY_ROWS.map((r, ri) =>
          Array.from({ length: r.n }, (_, c) => (
            <rect key={`${ri}-${c}`} x={-250 + r.off + c * 32} y={r.y - 3} width={26} height={6} rx={2} fill={C.greyLight} />
          )),
        )}
      </g>
    </g>
  );
}
