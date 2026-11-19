import React from "react";
import { type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Card, Txt, DrawPath } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Two-column card: green PROS with check marks, red CONS with crosses. Rows appear one by one and the icons draw in.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const pros: string[] = (p.pros ?? []).slice(0, 6);
  const cons: string[] = (p.cons ?? []).slice(0, 6);
  const n = Math.max(1, pros.length, cons.length);
  const W = 900, colW = 420, HEAD = 90;
  const H = 150 + n * 110 + 20;
  const top = -H / 2;
  const cols = [
    { x0: -W / 2 + 20, items: pros, c: u.good, title: "PROS", kind: "check" },
    { x0: 10, items: cons, c: u.bad, title: "CONS", kind: "cross" },
  ];
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      <Card x={-W / 2} y={top} w={W} h={H} u={u} />
      {cols.map((col, ci) => {
        const hk = enter(p.f, f0 + ci * 3, 10);
        return (
          <g key={ci}>
            <g opacity={hk} transform={`translate(0 ${(1 - hk) * -18})`}>
              <rect x={col.x0} y={top + 24} width={colW} height={HEAD} rx={22} fill={col.c} />
              <Txt x={col.x0 + colW / 2} y={top + 24 + 63} u={u} size={56} weight={900} fill={u.white}>{col.title}</Txt>
            </g>
            {col.items.map((t, i) => {
              const at = f0 + 8 + i * 5;
              const e = enter(p.f, at, 10);
              const cy = top + 150 + i * 110 + 50;
              const dr = enter(p.f, at + 4, 8);
              const ix = col.x0 + 44;
              return (
                <g key={i} opacity={e} transform={`translate(0 ${(1 - e) * 24})`}>
                  <circle cx={ix} cy={cy} r={34} fill={col.c} stroke={u.ink} strokeWidth={4} />
                  <DrawPath
                    transform={`translate(${ix} ${cy})`}
                    d={col.kind === "check" ? "M-16 1 L-5 13 L17 -12" : "M-13 -13 L13 13 M13 -13 L-13 13"}
                    fill="none" stroke={u.white} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"
                    k={dr}
                  />
                  <Txt x={col.x0 + 100} y={cy + 15} u={u} size={40} weight={700} anchor="start" maxW={colW - 120}>{t}</Txt>
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
