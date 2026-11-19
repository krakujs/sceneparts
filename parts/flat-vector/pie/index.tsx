import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector pie: lattice-topped pie in a white ceramic dish, with an optional slice cut out and moved aside.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~500 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Pie(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const anim = p.anim ?? "none";
  const crust = p.color ?? "#E8A24A";
  const filling = p.filling ?? "#C2342E";
  const dishC = "#FFFFFF";
  const slice = !!p.slice;
  const CY = -110, RX = 225, RY = 54; // top surface ellipse of the pie
  const id = "pie-top-clip";
  const cutA1 = -12, cutA2 = 52; // degrees of the removed wedge (front right)
  const P = (a: number) => [RX * Math.cos((a * Math.PI) / 180), CY + RY * Math.sin((a * Math.PI) / 180)];
  const [x1, y1] = P(cutA1), [x2, y2] = P(cutA2);
  const wedge = `M 0 ${CY} L ${f1(x1)} ${f1(y1)} A ${RX} ${RY} 0 0 1 ${f1(x2)} ${f1(y2)} Z`;
  const ellipseD = `M ${-RX} ${CY} A ${RX} ${RY} 0 1 0 ${RX} ${CY} A ${RX} ${RY} 0 1 0 ${-RX} ${CY} Z`;

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // lattice strips across the top, two diagonal sets
  const strips = [-150, -90, -30, 30, 90, 150].flatMap((k, i) => [
    <rect key={"a" + i} x={k - 12} y={CY - 90} width={24} height={180} fill={shade(crust, 0.1)} transform={`rotate(35 ${k} ${CY})`} />,
    <rect key={"b" + i} x={k - 12} y={CY - 90} width={24} height={180} fill={shade(crust, 0.1)} transform={`rotate(-35 ${k} ${CY})`} />,
  ]);

  const top = (clipD: string | null, cid: string) => (
    <g clipPath={clipD ? `url(#${cid})` : undefined}>
      <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={crust} />
      <ellipse cx={0} cy={CY + 4} rx={RX - 16} ry={RY - 8} fill={shade(crust, 0.05)} opacity={0} />
      {strips}
      <path d={`M ${-RX + 26} ${CY - 6} Q ${-RX * 0.5} ${CY - RY * 0.8} ${-40} ${CY - RY * 0.72}`} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.35} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={265} ry={24} fill={C.shadow} />
      <g transform={tr}>
        {/* ceramic dish */}
        <path d={`M -250 ${CY + 6} L -200 -18 A 200 36 0 0 0 200 -18 L 250 ${CY + 6} A 250 62 0 0 1 -250 ${CY + 6} Z`} fill={shade(dishC, 0.14)} />
        <ellipse cx={0} cy={CY + 6} rx={250} ry={62} fill={dishC} />
        <ellipse cx={0} cy={CY + 6} rx={216} ry={50} fill={shade(dishC, 0.08)} />
        {/* filling under the crust, visible where a slice is missing */}
        <ellipse cx={0} cy={CY + 4} rx={RX - 6} ry={RY - 4} fill={filling} />
        <defs>
          <clipPath id={id} clipRule="evenodd"><path d={slice ? `${ellipseD} ${wedge}` : ellipseD} clipRule="evenodd" /></clipPath>
          <clipPath id="pie-top-full"><path d={ellipseD} /></clipPath>
        </defs>
        {slice ? (
          <g>
            <g clipPath={`url(#${id})`}>
              <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={crust} />
              {strips}
            </g>
            {/* the side of the pie, below the top surface */}
            <path d={`M ${-RX} ${CY} L ${-RX} ${CY + 72} A ${RX} ${RY} 0 0 0 ${RX} ${CY + 72} L ${RX} ${CY} A ${RX} ${RY} 0 0 1 ${-RX} ${CY} Z`} fill={shade(crust, 0.22)} />
            <g transform="translate(70 -18)">
              <path d={`M 0 ${CY} L ${f1(x1)} ${f1(y1)} A ${RX} ${RY} 0 0 1 ${f1(x2)} ${f1(y2)} Z`} fill={filling} stroke="none" transform="translate(0 4)" />
              <path d={wedge} fill={crust} />
              <path d={`M ${f1(x1)} ${f1(y1)} L 0 ${CY} L ${f1(x2)} ${f1(y2)}`} fill="none" stroke={shade(crust, 0.22)} strokeWidth={4} />
            </g>
          </g>
        ) : (
          <g>
            <g clipPath="url(#pie-top-full)">{top(null, "")}</g>
            <path d={`M ${-RX} ${CY} L ${-RX} ${CY + 72} A ${RX} ${RY} 0 0 0 ${RX} ${CY + 72} L ${RX} ${CY} A ${RX} ${RY} 0 0 1 ${-RX} ${CY} Z`} fill={shade(crust, 0.22)} />
          </g>
        )}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Pie {...p} />;
}
