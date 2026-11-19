import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// A-frame step ladder at room scale (about 1000 px tall at s = 1). Two front legs meet at a top cap;
// a darker back pair splays out behind them for depth; six evenly spaced rungs span exactly between the front rails.
// Origin = bottom centre.
const f1 = (v: number) => v.toFixed(1);

const motion = (anim: string, f: number) => {
  if (anim === "bob") return `translate(0 ${f1(-(Math.sin((f * 2 * Math.PI) / 60) + 1) * 6)})`;
  if (anim === "wobble") return `rotate(${f1(Math.sin((f * 2 * Math.PI) / 40) * 3)})`;
  if (anim === "pop") { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return `scale(${f1(1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2)})`; }
  return "";
};

const TOP = -980, FOOT = 230, LEG_W = 40, BACK_OFF = 56;
/** Horizontal distance of a front rail's centre line from the centre at height yy (negative, up). */
const legX = (yy: number) => (FOOT * (yy - TOP)) / -TOP;
/** Half-width between the inner edges of the two front rails at height yy (rails are tilted, so correct for the slope). */
const innerHalf = (yy: number) => {
  const cos = (-TOP) / Math.hypot(-TOP, FOOT);
  return legX(yy) - LEG_W / 2 / cos;
};

/** A thick rounded bar from (x1,y1) to (x2,y2): used for the legs. */
const bar = (x1: number, y1: number, x2: number, y2: number, w: number, fill: string, key: string) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <rect
      key={key}
      x={-len / 2}
      y={-w / 2}
      width={len}
      height={w}
      rx={w / 2}
      fill={fill}
      transform={`translate(${f1((x1 + x2) / 2)} ${f1((y1 + y2) / 2)}) rotate(${f1(ang)})`}
    />
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const c = p.color && p.color !== "none" ? p.color : C.orange;
  const back = shade(c, 0.3), step = C.greyDark;
  // six rungs, evenly spaced 130 px apart, lowest first
  const rungs = [0, 1, 2, 3, 4, 5].map((i) => -150 - i * 130);
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={320} ry={22} fill={C.shadow} />
      <g transform={motion(p.anim ?? "none", f)}>
        {/* darker back legs, splayed outwards so they show behind the front pair */}
        {bar(0, TOP + 10, -FOOT - BACK_OFF, -6, LEG_W, back, "bl")}
        {bar(0, TOP + 10, FOOT + BACK_OFF, -6, LEG_W, back, "br")}
        {/* back feet */}
        <rect x={-FOOT - BACK_OFF - 30} y={-12} width={60} height={12} rx={6} fill={C.inkSoft} />
        <rect x={FOOT + BACK_OFF - 30} y={-12} width={60} height={12} rx={6} fill={C.inkSoft} />
        {/* rungs, each spanning exactly between the inner edges of the front rails */}
        {rungs.map((yy) => (
          <rect key={yy} x={-innerHalf(yy)} y={yy - 11} width={2 * innerHalf(yy)} height={22} rx={6} fill={step} />
        ))}
        {/* front legs */}
        {bar(0, TOP, -FOOT, 0, LEG_W, c, "fl")}
        {bar(0, TOP, FOOT, 0, LEG_W, c, "fr")}
        {/* front feet pads */}
        <rect x={-FOOT - 30} y={-14} width={60} height={14} rx={6} fill={C.inkSoft} />
        <rect x={FOOT - 30} y={-14} width={60} height={14} rx={6} fill={C.inkSoft} />
        {/* top cap */}
        <rect x={-70} y={TOP - 20} width={140} height={28} rx={10} fill={shade(c, 0.2)} />
      </g>
    </g>
  );
}
