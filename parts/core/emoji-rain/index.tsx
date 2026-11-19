import React from "react";
import { clamp, random, type PartProps } from "@sceneparts/core";
import { ui, startFrame } from "../stat-card/index";

// Emoji rain: many original round faces (yellow disc, dot or closed eyes, a smile or laugh, heart eyes)
// drawn with plain shapes, falling and spinning across the whole frame. Not platform emoji.
// Falling wraps, so it loops. Covers the full frame and ignores x and y.

const KINDS = ["smile", "laugh", "heart", "wink"] as const;
type Kind = (typeof KINDS)[number];
const HEART = "M0 -0.42 C-0.55 -1.15 -1.6 -0.55 -1.1 0.32 C-0.75 0.85 -0.25 1.05 0 1.5 C0.25 1.05 0.75 0.85 1.1 0.32 C1.6 -0.55 0.55 -1.15 0 -0.42 Z";
const YELLOW = "#FFC83D", RIM = "#E0A21F", BLUSH = "#F27BA6", HEARTC = "#E8503F";

// One face, drawn in a 100 px disc centred on 0,0.
function Face({ kind, ink }: { kind: Kind; ink: string }) {
  const happyEye = (x0: number) => <path d={`M${x0 - 10} -4 Q${x0} -20 ${x0 + 10} -4`} fill="none" stroke={ink} strokeWidth={6} strokeLinecap="round" />;
  const dot = (x0: number) => <circle cx={x0} cy={-10} r={7} fill={ink} />;
  const heart = (x0: number) => <path d={HEART} fill={HEARTC} transform={`translate(${x0 > 0 ? x0 + 2 : x0 - 2} -12) scale(8.5)`} />;
  let eyes: React.ReactNode;
  if (kind === "laugh") eyes = <>{happyEye(-18)}{happyEye(18)}</>;
  else if (kind === "heart") eyes = <>{heart(-18)}{heart(18)}</>;
  else if (kind === "wink") eyes = <>{happyEye(-18)}{dot(18)}</>;
  else eyes = <>{dot(-18)}{dot(18)}</>;
  const mouth = kind === "laugh"
    ? <path d="M-28 8 Q0 46 28 8 Z" fill={ink} />
    : <path d="M-26 8 Q0 34 26 8" fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" />;
  return (
    <>
      <circle r={50} fill={YELLOW} stroke={RIM} strokeWidth={4} />
      <circle cx={-30} cy={14} r={8} fill={BLUSH} opacity={0.6} />
      <circle cx={30} cy={14} r={8} fill={BLUSH} opacity={0.6} />
      {eyes}
      {mouth}
    </>
  );
}

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const lf = p.f - startFrame(p);
  if (lf < 0) return null;
  const n = Math.round(clamp(Number(p.count ?? 36), 6, 60));
  const speed = Number(p.speed ?? 1), variant = String(p.variant ?? "mixed"), sd = String(p.seed ?? "emoji");
  const faces = Array.from({ length: n }, (_, i) => {
    const q = (k: number) => random(`${sd}-${i}-${k}`);
    const size = 70 + q(0) * 60;
    const span = 1920 + 2 * size;
    const vy = speed * (6 + q(1) * 8);
    const y = ((q(2) * span + lf * vy) % span) - size;
    const x = q(3) * 1080 + Math.sin(lf * 0.03 + q(4) * 6.28) * 24;
    const rot = q(5) * 360 + (q(6) - 0.5) * 3 * lf;
    const kind: Kind = variant === "mixed" ? KINDS[Math.floor(q(7) * KINDS.length)] : (KINDS as readonly string[]).includes(variant) ? (variant as Kind) : "smile";
    return { x, y, size, rot, kind };
  });
  return (
    <g>
      {faces.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(1)}) scale(${(f.size / 100).toFixed(3)})`}>
          <Face kind={f.kind} ink={u.ink} />
        </g>
      ))}
    </g>
  );
}
