import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Bug } from "../bug/index";

// Housefly (preset of flat-vector/bug): dark grey body with big red-brown eyes. The generator draws its
// eyes in ink, so the red-brown eyes are drawn on top in the same body frame.
const LOOK = {"abdomenShape":"oval","abdomen":92,"abdomenH":36,"thorax":40,"head":28,"legs":6,"legLen":30,"legW":5,"legColor":"#2E323D","color":"#4A4F5C","color2":"#2E323D","thoraxColor":"#3D4250","headColor":"#6B7080","pattern":"none","wings":"clear","wingSpan":130,"wingColor":"#E6F6FF","antennae":"thin","antennaLen":26,"antennaColor":"#2E323D","eyes":"big","alt":120,"pose":"hover"};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const f = q.f ?? 0, s = q.s ?? 1, x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1560;
  const th = q.thorax ?? 42, hr = q.head ?? 28, lf = q.legLen ?? 46, alt = q.alt ?? 140;
  const pose = q.pose ?? "stand";
  const lift = pose === "hover" ? alt * 0.3 + Math.sin(f / 9) * 6 : pose === "fly" ? alt + Math.sin(f * 0.5) * 6 : 0;
  const by = -lf - lift - th * 0.45;
  const Hc = [th + hr * 0.6, by - th * 0.1];
  const er = hr * 0.42, ex = Hc[0] + hr * 0.35, ey = Hc[1] - hr * 0.12;
  const T = `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${q.flip ? -s : s} ${s})`;
  return (
    <g>
      <Bug {...q} />
      <g transform={T}>
        <circle cx={ex} cy={ey} r={er} fill="#9C4A2E" />
        <circle cx={ex + er * 0.35} cy={ey - er * 0.35} r={er * 0.3} fill="#FFFFFF" />
      </g>
    </g>
  );
}
