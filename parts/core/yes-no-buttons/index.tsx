import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, Txt } from "../stat-card/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Yes / No: two big rounded buttons side by side. `pick` presses one (squash, then a ripple); the other one dims.
export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const f0 = startFrame(p);
  const pick = String(p.pick ?? "none");
  const pressAt = f0 + 24;
  const started = p.f >= pressAt;
  const BW = 400, BH = 260, FACE = BH - 22;
  const sides = [
    { key: "yes", label: String(p.yes ?? "YES"), fill: u.good, x: -230 },
    { key: "no", label: String(p.no ?? "NO"), fill: u.bad, x: 230 },
  ];
  const rp = clamp((p.f - pressAt) / 24);
  const press = clamp((p.f - pressAt) / 16);
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${p.s ?? 1})`}>
      {sides.map((b, i) => {
        const picked = pick === b.key;
        const e = enter(p.f, f0 + i * 6, 12);
        const dim = pick !== "none" && !picked ? 1 - 0.55 * enter(p.f, pressAt, 8) : 1;
        const sc = picked ? 1 - 0.07 * Math.sin(Math.PI * press) : 1;
        const ripple = 60 + 220 * ease(rp);
        return (
          <g key={b.key} opacity={e * dim} transform={`translate(${b.x} ${(1 - e) * 60}) scale(${sc})`}>
            <rect x={-BW / 2} y={-BH / 2 + 22} width={BW} height={FACE} rx={60} fill={u.ink} />
            <rect x={-BW / 2} y={-BH / 2} width={BW} height={FACE} rx={60} fill={b.fill} stroke={u.ink} strokeWidth={6} />
            <Txt x={0} y={-BH / 2 + FACE / 2 + 43} u={u} size={120} weight={900} fill={u.white} maxW={BW - 80}>{b.label}</Txt>
            {picked && started && rp < 1 ? (
              <circle cx={0} cy={-BH / 2 + FACE / 2} r={ripple} fill="none" stroke={u.white} strokeWidth={12} opacity={0.7 * (1 - rp)} />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
