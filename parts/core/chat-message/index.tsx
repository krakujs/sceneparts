import React from "react";
import { ui, startFrame, enter, fitSize, Txt, type UI } from "../stat-card/index";
import { type PartProps } from "@sceneparts/core";

// Chat bubbles: "them" on the left (white, ink outline), "me" on the right (accent). Each pops in with a small
// slide from its side, one after another, and gets a tiny avatar circle.
type Msg = { from: "me" | "them"; text: string };
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const u: UI = ui(p.style, p.color);
  const at = startFrame(p);
  const s = p.s ?? 1;
  const msgs: Msg[] = (Array.isArray(p.messages) ? p.messages : []).slice(0, 4);
  const BH = 96, GAP = 30, AV = 34, MAXW = 640, PADX = 36;
  const total = msgs.length * BH + Math.max(0, msgs.length - 1) * GAP;
  const top = -total / 2;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 960}) scale(${s})`}>
      {msgs.map((m, i) => {
        const me = m.from === "me";
        const t = String(m.text ?? "");
        const bw = Math.min(MAXW, Math.max(200, t.length * 24 + PADX * 2));
        const size = fitSize(t, 40, bw - PADX * 2);
        const ok = enter(p.f, at + i * 9, 10);
        const slide = (1 - ok) * (me ? 60 : -60);
        const y = top + i * (BH + GAP);
        const bx = me ? 360 - bw : -360; // left edge of bubble, 720 px lane centred on 0
        const avX = me ? 360 + AV / 2 + 18 : -360 - AV / 2 - 18;
        const fill = me ? (p.color ?? u.accent) : u.white;
        const tc = me ? u.white : u.ink;
        return (
          <g key={i} opacity={ok}>
            <g transform={`translate(${slide} 0)`}>
              <circle cx={avX} cy={y + BH / 2} r={AV / 2} fill={me ? u.accent : u.soft} stroke={u.ink} strokeWidth={5} />
              <rect x={bx} y={y} width={bw} height={BH} rx={BH / 2} fill={fill} stroke={u.ink} strokeWidth={5} />
              <Txt x={bx + bw / 2} y={y + BH / 2 + size * 0.36} u={u} size={size} weight={700} fill={tc}>{t}</Txt>
            </g>
          </g>
        );
      })}
    </g>
  );
}
