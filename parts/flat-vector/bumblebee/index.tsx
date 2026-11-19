import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Bumblebee (preset of flat-vector/bug): chubbier than the honey bee, with a white tail tip drawn on top
// of the generator's abdomen in the same body frame (position follows the same lift and bob as the bug).
const LOOK = {"abdomenShape":"oval","abdomen":118,"abdomenH":58,"thorax":50,"head":30,"legs":6,"legLen":30,"legW":8,"legColor":"#1F2433","color":"#FFC83D","color2":"#1F2433","pattern":"stripes","patternColor":"#1F2433","thoraxColor":"#FFC83D","headColor":"#FFC83D","wings":"clear","wingSpan":90,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":44,"eyes":"big","alt":120,"pose":"hover"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const f = q.f ?? 0, s = q.s ?? 1, x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1560;
  const th = q.thorax ?? 42, ab = q.abdomen ?? 100, abH = q.abdomenH ?? th * 0.9, lf = q.legLen ?? 46, alt = q.alt ?? 140;
  const pose = q.pose ?? "stand";
  const lift = pose === "hover" ? alt * 0.3 + Math.sin(f / 9) * 6 : pose === "fly" ? alt + Math.sin(f * 0.5) * 6 : 0;
  const by = -lf - lift - th * 0.45;
  const arx = ab * 0.5, acx = -(th * 0.7 + arx), acy = by + th * 0.05;
  const T = `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${q.flip ? -s : s} ${s})`;
  return (
    <g>
      <Bug {...q} />
      <g transform={T}>
        <ellipse cx={acx - arx * 0.7} cy={acy} rx={arx * 0.22} ry={abH * 0.62} fill="#FFFFFF" />
      </g>
    </g>
  );
}
