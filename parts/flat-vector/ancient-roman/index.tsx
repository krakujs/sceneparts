import React from "react";
import type { PartProps } from "@sceneparts/core";
import { Person } from "../person/index";
import { C } from "../style/index";

// Ancient Roman preset: white toga draped over one shoulder with a red border, laurel wreath on the head, sandals.
/* eslint-disable @typescript-eslint/no-explicit-any */
const laurel = () => {
  const leaves = (r: number, c: string, n: number, key: string) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((200 + (i * 140) / (n - 1)) * Math.PI) / 180;
      const x = r * Math.cos(a), y = r * Math.sin(a);
      return <ellipse key={key + i} cx={x} cy={y} rx={17} ry={8} transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} fill={c} />;
    });
  return <g>{leaves(86, C.greenDark, 9, "i")}{leaves(102, C.green, 9, "o")}</g>;
};

export default function Part(p: PartProps<any>) {
  return (
    <Person
      {...p}
      x={p.x + (p.vx ?? 0) * p.f}
      f={p.f}
      flip={!!p.flip}
      age="adult"
      top="tank"
      topColor={C.white}
      bottom="skirt"
      bottomColor={C.white}
      shoes="sandals"
      shoesColor={C.brownDark}
      hat="none"
      over={() => (
        <g>
          <path d="M -82 -800 Q -30 -832 30 -816 L 44 -770 L 78 -640 L 92 -470 L 98 -290 L -104 -290 L -92 -470 L -84 -640 Z" fill={C.white} />
          <path d="M 30 -816 L 44 -770 L 78 -640 L 92 -470" stroke={C.red} strokeWidth={16} strokeLinecap="round" fill="none" />
          <rect x={-104} y={-306} width={202} height={18} fill={C.red} />
          <path d="M -30 -740 Q -20 -600 -34 -400 M 10 -700 Q 2 -560 14 -380 M -62 -600 Q -52 -450 -66 -320" stroke={C.greyLight} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      topper={laurel}
    />
  );
}
