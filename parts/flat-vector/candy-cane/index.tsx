import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Candy cane: a thick red-and-white striped stick with a hooked top, standing on its end.
// Origin = bottom centre of the stick (it stands on y). About 350 px wide and 560 px tall at s = 1.
// anim "sway": the cane rocks gently on its base. anim "pop": springs in once (frame 0 is already upright).
const f1 = (v: number) => v.toFixed(1);
const PATH = "M 0 0 L 0 -380 A 130 130 0 0 0 -260 -380 L -260 -330";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1560;
  const red = p.color && p.color !== "none" ? p.color : C.red;
  const anim: string = p.anim ?? "none";
  const sway = anim === "sway" ? Math.sin((f * 2 * Math.PI) / 90) * 3 : 0;
  const t = Math.min(1, f / 20), c1 = 1.70158, c3 = c1 + 1;
  const pop = anim === "pop" ? 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2 : 1;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={150} ry={14} fill={C.shadow} />
      <g transform={`rotate(${f1(sway)}) scale(${f1(pop)})`}>
        <g transform="translate(130 0)">
          <defs>
            <pattern id="candy-cane-stripe" patternUnits="userSpaceOnUse" x={0} y={0} width={46} height={46} patternTransform="rotate(35)">
              <rect x={0} y={0} width={46} height={46} fill={C.white} />
              <rect x={0} y={0} width={23} height={46} fill={red} />
            </pattern>
          </defs>
          {/* soft shade along the left edge */}
          <path d={PATH} fill="none" stroke={C.greyLight} strokeWidth={92} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} transform="translate(-6 4)" />
          <path d={PATH} fill="none" stroke="url(#candy-cane-stripe)" strokeWidth={88} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </g>
  );
}
