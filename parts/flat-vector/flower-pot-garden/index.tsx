import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Garden group: four terracotta pots of different sizes with bloom, daisy and herb plants. Origin = centre of the ground line.
// About 900 px wide and 620 px tall at s = 1. anim "sway" rocks each pot's plants gently, out of step.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);
const SOIL = -236;

type Stem = [number, number, string, "bloom" | "daisy" | "herb"];

/** One pot at (cx, 0), scaled by sc. Its plants rotate about the soil by sw degrees. */
const pot = (key: number, cx: number, sc: number, body: string, leafC: string, stems: Stem[], sw: number) => (
  <g key={key} transform={`translate(${cx} 0) scale(${sc})`}>
    <g transform={sw ? `rotate(${f1(sw)} 0 ${SOIL})` : ""}>
      {stems.map(([dx, top, c, kind], i) => {
        const bend = i % 2 ? 16 : -16;
        const stemD = `M ${dx} ${SOIL} Q ${dx + bend} ${f1((SOIL + top) / 2)} ${dx} ${top}`;
        const leaves = kind === "herb" ? 6 : 2;
        const leafCol = kind === "herb" ? shade(leafC, -0.25) : leafC;
        const lv: React.ReactElement[] = [];
        for (let k = 1; k <= leaves; k++) {
          const t = k / (leaves + 1);
          const ly = SOIL + (top - SOIL) * t;
          const side = k % 2 ? 1 : -1;
          lv.push(
            <ellipse key={k} cx={dx + side * 14} cy={f1(ly)} rx={9} ry={26} fill={leafCol} transform={`rotate(${side * -40} ${dx} ${f1(ly)})`} />
          );
        }
        let head: React.ReactElement | null = null;
        if (kind === "bloom") {
          const centre = c === C.yellow ? C.orange : C.yellow;
          head = (
            <g>
              {[0, 1, 2, 3, 4].map((k) => {
                const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
                return <circle key={k} cx={f1(dx + 18 * Math.cos(a))} cy={f1(top + 18 * Math.sin(a))} r={14} fill={c} />;
              })}
              <circle cx={dx} cy={top} r={10} fill={centre} />
            </g>
          );
        } else if (kind === "daisy") {
          head = (
            <g>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                const a = (k * 2 * Math.PI) / 8;
                return <circle key={k} cx={f1(dx + 22 * Math.cos(a))} cy={f1(top + 22 * Math.sin(a))} r={9} fill={c} />;
              })}
              <circle cx={dx} cy={top} r={11} fill={C.yellow} />
            </g>
          );
        }
        return (
          <g key={i}>
            <path d={stemD} stroke={leafC} strokeWidth={9} strokeLinecap="round" fill="none" />
            {lv}
            {head}
          </g>
        );
      })}
    </g>
    {/* pot: rim, soil, tapered body with a shaded side */}
    <rect x={-136} y={-240} width={272} height={42} rx={14} fill={body} />
    <rect x={-136} y={-216} width={272} height={18} fill={shade(body, 0.2)} />
    <ellipse cx={0} cy={SOIL} rx={116} ry={13} fill={C.brownDark} />
    <path d="M -120 -200 L 120 -200 L 92 -20 Q 90 0 70 0 L -70 0 Q -90 0 -92 -20 Z" fill={body} />
    <path d="M 46 -200 L 120 -200 L 92 -20 Q 90 0 70 0 L 46 0 Z" fill={shade(body, 0.2)} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const body = pick(p.color, "#C9704E");
  const leafC = pick(p.color2, C.green);
  const anim: string = p.anim ?? "none";
  const sw = (i: number) => (anim === "sway" ? 3 * Math.sin((f * 2 * Math.PI) / 90 + i * 0.9) : 0);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={-2} rx={470} ry={20} fill={C.shadow} />
        {pot(0, -300, 1.1, body, leafC, [[-70, -460, C.pink, "bloom"], [0, -520, C.yellow, "bloom"], [70, -440, C.purple, "bloom"], [-28, -380, C.orange, "bloom"]], sw(0))}
        {pot(1, -20, 0.9, shade(body, -0.08), leafC, [[-44, -420, leafC, "herb"], [0, -470, leafC, "herb"], [40, -410, leafC, "herb"]], sw(1))}
        {pot(2, 230, 0.72, shade(body, -0.04), leafC, [[-30, -400, C.white, "daisy"], [20, -440, C.white, "daisy"], [-8, -360, C.white, "daisy"]], sw(2))}
        {pot(3, 400, 0.5, body, leafC, [[0, -380, C.red, "bloom"]], sw(3))}
      </g>
    </g>
  );
}
