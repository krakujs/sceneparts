import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Oven mitt: quilted oven glove standing upright on its cuff, thumb to the right, with a hanging loop.
// color = mitt colour, color2 = cuff colour. Origin = bottom centre (resting point). Honours flip, s and anim.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.red;
  const cuff = p.color2 && p.color2 !== "none" ? p.color2 : C.yellow;
  const dk = shade(c, 0.2);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={130} ry={14} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* hanging loop */}
        <path d="M -40 -384 Q -40 -446 0 -446 Q 40 -446 40 -384" fill="none" stroke={dk} strokeWidth={12} strokeLinecap="round" />
        {/* body with rounded top */}
        <path d="M -120 -110 L -120 -270 Q -120 -400 -20 -400 Q 120 -400 120 -270 L 120 -110 Z" fill={c} />
        {/* thumb */}
        <path d="M 100 -236 Q 184 -256 188 -192 Q 190 -128 120 -118 L 100 -118 Z" fill={c} />
        <path d="M 150 -226 Q 186 -206 184 -170 Q 180 -134 128 -122 Q 170 -150 150 -226 Z" fill={dk} />
        {/* quilting stitches and finger seams */}
        {[-300, -240, -180].map((yy, i) => (
          <rect key={i} x={-120} y={yy} width={240} height={8} rx={4} fill={dk} opacity={0.6} />
        ))}
        <rect x={-44} y={-380} width={6} height={250} rx={3} fill={dk} opacity={0.6} />
        <rect x={30} y={-372} width={6} height={240} rx={3} fill={dk} opacity={0.6} />
        {/* cuff */}
        <rect x={-128} y={-110} width={256} height={110} rx={24} fill={cuff} />
        <rect x={-128} y={-40} width={256} height={40} rx={18} fill={shade(cuff, 0.2)} />
      </g>
    </g>
  );
}
