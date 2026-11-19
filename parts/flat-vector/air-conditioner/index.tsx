import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Wall-mounted split air conditioner: a rounded white unit with a louvre flap along the bottom, a small status light,
// and optional airflow lines below the louvre. anim "blow" makes the airflow lines travel downwards.
// Wall item: centred on (x, y), default y 760, no ground shadow. Real size (about 520 px wide).
const f1 = (v: number) => v.toFixed(1);
const motion = (anim: string, f: number) =>
  anim === "bob" ? `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 5)})`
    : anim === "wobble" ? `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 1)})` : "";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 760;
  const c = p.color && p.color !== "none" ? p.color : C.white;
  const dk = shade(c, 0.12);
  const airflow = p.airflow !== false;
  const blow = p.anim === "blow";
  const lines = [-150, 0, 150];

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={motion(p.anim === "blow" ? "none" : (p.anim ?? "none"), f)}>
        {/* airflow lines below the louvre */}
        {airflow && lines.map((lx, i) => (
          <path
            key={lx}
            d={`M ${lx} 110 Q ${lx + (i === 1 ? 0 : i === 0 ? -14 : 14)} 170 ${lx} 240`}
            fill="none"
            stroke={C.skyDeep}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray="34 24"
            strokeDashoffset={blow ? f1(-f * 3) : 0}
          />
        ))}
        {/* unit body with a rounded top */}
        <rect x={-260} y={-100} width={520} height={160} rx={50} fill={c} />
        <rect x={-260} y={-100} width={520} height={18} rx={9} fill={dk} opacity={0.6} />
        {/* louvre flap at the bottom with slats */}
        <rect x={-236} y={22} width={472} height={44} rx={14} fill={shade(c, 0.22)} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-220} y={30 + i * 10} width={440} height={4} rx={2} fill={c} opacity={0.6} />
        ))}
        {/* status light and a small display */}
        <circle cx={196} cy={-44} r={9} fill={C.green} />
        <rect x={150} y={-60} width={34} height={8} rx={4} fill={C.greyDark} opacity={0.5} />
      </g>
    </g>
  );
}
