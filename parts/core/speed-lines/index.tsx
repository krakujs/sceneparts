import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Speed lines: full-frame manga focus lines converging on (x, y), or horizontal motion streaks (dir "horizontal").
// Each line is a thin tapered wedge. Flicker shortens and lengthens lines over time. All wedges are one path.

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const x = p.x ?? 540, y = p.y ?? 960;
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 72), 8, 160));
  const inner = Math.max(0, Number(p.inner ?? 300));
  const fl = clamp(Number(p.flicker ?? 0.5), 0, 1);
  const col = p.color ?? u.ink;
  const sd = String(p.seed ?? "speed");
  const horizontal = p.dir === "horizontal";
  const d: string[] = [];
  for (let i = 0; i < n; i++) {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const g = 1 - fl * (0.5 + 0.5 * Math.sin(lf * (0.25 + q(2) * 0.3) + q(0) * 6.28)); // 1 = full length
    if (horizontal) {
      const side = i % 2 ? 1 : -1;
      const yi = q(7) * 1920;
      const tipX = x + side * (inner * (0.4 + 0.6 * q(5)) + (1 - g) * 500);
      const edge = side > 0 ? 1400 : -320;
      const hw = 5 + q(6) * 14;
      d.push(`M${tipX.toFixed(1)} ${yi.toFixed(1)} L${edge} ${(yi - hw).toFixed(1)} L${edge} ${(yi + hw).toFixed(1)} Z`);
    } else {
      const a = (i / n) * Math.PI * 2 + (q(3) - 0.5) * 0.03;
      const hw = 0.004 + q(4) * 0.012; // half angle at the outer end
      const tip = inner * (0.8 + 0.4 * q(5)) + (1 - g) * 700;
      const Ro = 1500 * (0.85 + 0.3 * q(6));
      d.push(
        `M${(Math.cos(a) * tip).toFixed(1)} ${(Math.sin(a) * tip).toFixed(1)} ` +
        `L${(Math.cos(a - hw) * Ro).toFixed(1)} ${(Math.sin(a - hw) * Ro).toFixed(1)} ` +
        `L${(Math.cos(a + hw) * Ro).toFixed(1)} ${(Math.sin(a + hw) * Ro).toFixed(1)} Z`
      );
    }
  }
  return (
    <g transform={horizontal ? undefined : `translate(${x} ${y})`} opacity={Number(p.strength ?? 0.55)}>
      <path d={d.join(" ")} fill={col} />
    </g>
  );
}
