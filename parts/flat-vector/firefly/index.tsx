import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Firefly (preset of flat-vector/bug): dark beetle-like body; the generator's glow halo pulses behind the
// abdomen, and a yellow abdomen tip is drawn on top that pulses with the same rhythm (from f).
const LOOK = {"abdomenShape":"oval","abdomen":110,"abdomenH":50,"thorax":40,"head":24,"legs":6,"legLen":40,"legW":6,"legColor":"#1F2330","color":"#3B3F4C","color2":"#1F2330","thoraxColor":"#2C2F3B","headColor":"#2C2F3B","pattern":"none","wings":"shell","wingSpan":120,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":40,"antennaColor":"#1F2330","eyes":"dots","glow":true,"alt":120,"pose":"fly"};

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
        <ellipse cx={acx - arx * 0.6} cy={acy} rx={arx * 0.35} ry={abH * 0.6} fill="#FFE14D" opacity={0.55 + 0.45 * Math.sin(f / 4)} />
      </g>
    </g>
  );
}
