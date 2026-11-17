import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector bagel: golden ring with a hole and sesame seeds, or a cut half with cream cheese spread.
// Origin = resting point (bottom centre), honours flip and s. Hero size ~380 px wide at s = 1.

const f1 = (v: number) => v.toFixed(1);
const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const hash = (i: number) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Bagel(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 1560;
  const variant: string = p.variant ?? "plain";
  const anim = p.anim ?? "none";
  const crust = p.color ?? "#E8A24A";
  const crumb = "#F6DFA8";
  const RX = 175, RY = 128, HX = 66, HY = 44, CY = -150; // outer ring, inner hole, ring centre height

  let tr = "";
  if (anim === "bob") tr = `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 8)})`;
  else if (anim === "wobble") tr = `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 4)})`;
  else if (anim === "pop") tr = `scale(${f1(easeOutBack(clamp01(f / 20)))})`;

  // Ring: thickness shade underneath, crust top, hole showing the ground-side shade
  const ring = (
    <g>
      <ellipse cx={0} cy={CY + 22} rx={RX} ry={RY} fill={shade(crust, 0.28)} />
      <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={crust} />
      <ellipse cx={0} cy={CY - 14} rx={RX * 0.8} ry={RY * 0.78} fill={shade(crust, 0.06)} />
      <ellipse cx={0} cy={CY + 26} rx={HX + 2} ry={HY + 2} fill={shade(crust, 0.4)} />
      <ellipse cx={0} cy={CY + 12} rx={HX} ry={HY} fill="#5E3B26" opacity={0.85} />
      <path d={`M ${f1(-RX * 0.78)} ${f1(CY - 20)} Q ${f1(-RX * 0.6)} ${f1(CY - RY * 0.85)} ${f1(-RX * 0.2)} ${f1(CY - RY * 0.82)}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.4} />
      {Array.from({ length: 22 }, (_, i) => {
        const a = Math.PI * (1.08 + (i / 21) * 0.84) + (hash(i) - 0.5) * 0.12;
        const r = 0.5 * (RX + HX) / RX;
        const cx = Math.cos(a) * RX * 0.74 * r, cy = CY - 4 + Math.sin(a) * RY * 0.74 * r;
        return <ellipse key={i} cx={f1(cx)} cy={f1(cy)} rx={7} ry={4} fill="#FFF8E6" transform={`rotate(${f1(-Math.cos(a) * 40 + hash(i + 3) * 30)} ${f1(cx)} ${f1(cy)})`} />;
      })}
    </g>
  );
  const plainRing = variant === "sesame" ? ring : (
    <g>
      <ellipse cx={0} cy={CY + 22} rx={RX} ry={RY} fill={shade(crust, 0.28)} />
      <ellipse cx={0} cy={CY} rx={RX} ry={RY} fill={crust} />
      <ellipse cx={0} cy={CY + 26} rx={HX + 2} ry={HY + 2} fill={shade(crust, 0.4)} />
      <ellipse cx={0} cy={CY + 12} rx={HX} ry={HY} fill="#5E3B26" opacity={0.85} />
      <path d={`M ${f1(-RX * 0.78)} ${f1(CY - 20)} Q ${f1(-RX * 0.6)} ${f1(CY - RY * 0.85)} ${f1(-RX * 0.2)} ${f1(CY - RY * 0.82)}`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.4} />
    </g>
  );

  // Cream variant: a cut half lies in front with a white cream-cheese layer on its face
  const cut = (
    <g>
      <ellipse cx={-150} cy={-40} rx={120} ry={80} fill={shade(crust, 0.28)} />
      <ellipse cx={-150} cy={-58} rx={120} ry={80} fill={crumb} />
      <path d={`M -262 -80 Q -240 -10 -200 -62 Q -170 -6 -130 -68 Q -100 -18 -40 -86 Q -100 -132 -150 -138 Q -220 -150 -262 -80 Z`} fill="#FFFDF7" />
      <path d={`M -262 -80 Q -240 -10 -200 -62 Q -170 -6 -130 -68 Q -100 -18 -40 -86`} stroke={shade("#FFFDF7", 0.12)} strokeWidth={4} fill="none" />
      <ellipse cx={-205} cy={-110} rx={26} ry={10} fill="#FFFFFF" opacity={0.7} />
    </g>
  );

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={RX + 20} ry={20} fill={C.shadow} />
      <g transform={tr}>
        {variant === "cream" ? (
          <g>
            <g transform="translate(60 0)">{plainRing}</g>
            {cut}
          </g>
        ) : plainRing}
      </g>
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  return <Bagel {...p} />;
}
