import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Reptile } from "../reptile/index";

// Komodo dragon (preset of flat-vector/reptile): big heavy grey-brown body. The generator tongue is red,
// so this preset draws its own forked yellow tongue on top, flicking from f in idle.
const LOOK = { body: "lizard", len: 280, bodyH: 150, head: 66, snout: 60, snoutShape: "broad", tailLen: 300, legLen: 100, legW: 54, color: "#7D776C", belly: "#C2B9A0", eyeSize: 0.9 };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const q: any = { ...LOOK };
  for (const k of Object.keys(p)) if ((p as any)[k] !== undefined) q[k] = (p as any)[k];
  const f = q.f ?? 0, s = q.s ?? 1, flip = !!q.flip;
  const x = (q.x ?? 540) + (q.vx ?? 0) * f, y = q.y ?? 1560;
  const idle = (q.pose ?? "idle") === "idle";
  // head position in local space (lizard branch, not raised)
  const L = q.len, bh = q.bodyH, rxB = L / 2, ry = bh / 2, hr = q.head, sn = q.snout;
  const by = -(q.legLen + ry) + ry * 0.1;
  const HX = rxB + hr * 0.2, HY = by - ry * 0.1 - (idle ? Math.sin(f / 18) * 2 : 0);
  const tipX = HX + hr * 0.45 + sn, tipY = HY + hr * 0.12;
  const flick = idle ? Math.pow(Math.max(0, Math.sin(f * 0.22)), 10) : 0;
  const Lt = hr * 1.7 * flick, th = hr * 0.08;
  return (
    <g transform={`translate(${x.toFixed(1)} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Reptile {...q} x={0} y={0} s={1} flip={false} vx={0} tongue={false} />
      {flick > 0.05 && (
        <g fill="#F5C518">
          <rect x={tipX} y={tipY - th / 2} width={Lt * 0.7} height={th} rx={th / 2} />
          <path d={`M ${(tipX + Lt * 0.6).toFixed(1)} ${(tipY - th / 2).toFixed(1)} L ${(tipX + Lt).toFixed(1)} ${(tipY - hr * 0.2).toFixed(1)} L ${(tipX + Lt * 0.9).toFixed(1)} ${tipY.toFixed(1)} L ${(tipX + Lt).toFixed(1)} ${(tipY + hr * 0.2).toFixed(1)} L ${(tipX + Lt * 0.6).toFixed(1)} ${(tipY + th / 2).toFixed(1)} Z`} />
        </g>
      )}
    </g>
  );
}
