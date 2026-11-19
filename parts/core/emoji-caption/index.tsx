import React from "react";
import { clamp, type PartProps } from "@sceneparts/core";
import { ui, startFrame, enter, popIn, fitSize, Txt } from "../stat-card/index";

// Emoji caption: a caption pill with a drawn round reaction face at the left that pops in and then bounces.
const FACES = ["happy", "shock", "laugh", "sad", "love", "think"];
const HEART = "M0 9 C-14 -3 -10 -17 0 -9 C10 -17 14 -3 0 9 Z";
/* eslint-disable @typescript-eslint/no-explicit-any */

function Face({ face, u, fill }: { face: string; u: any; fill: string }) {
  const ink = u.ink;
  const dot = (x: number, y: number) => <circle cx={x} cy={y} r={8} fill={ink} />;
  const smile = <path d="M-30 14 Q0 44 30 14" fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" />;
  let eyes: React.ReactNode = null;
  let mouth: React.ReactNode = smile;
  switch (face) {
    case "shock":
      eyes = (<g>
        <circle cx={-22} cy={-14} r={12} fill={u.white} stroke={ink} strokeWidth={4} /><circle cx={-22} cy={-14} r={5} fill={ink} />
        <circle cx={22} cy={-14} r={12} fill={u.white} stroke={ink} strokeWidth={4} /><circle cx={22} cy={-14} r={5} fill={ink} />
      </g>);
      mouth = <ellipse cx={0} cy={28} rx={14} ry={18} fill={ink} />;
      break;
    case "laugh":
      eyes = (<g>
        <path d="M-34 -10 Q-22 -30 -10 -10" fill="none" stroke={ink} strokeWidth={6} strokeLinecap="round" />
        <path d="M10 -10 Q22 -30 34 -10" fill="none" stroke={ink} strokeWidth={6} strokeLinecap="round" />
      </g>);
      mouth = <path d="M-32 12 L32 12 Q30 48 0 48 Q-30 48 -32 12 Z" fill={ink} />;
      break;
    case "sad":
      eyes = (<g>{dot(-22, -12)}{dot(22, -12)}</g>);
      mouth = <path d="M-26 38 Q0 12 26 38" fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" />;
      break;
    case "love":
      eyes = (<g>
        <g transform="translate(-22 -12) scale(1.8)"><path d={HEART} fill={u.bad} stroke={ink} strokeWidth={0.8} /></g>
        <g transform="translate(22 -12) scale(1.8)"><path d={HEART} fill={u.bad} stroke={ink} strokeWidth={0.8} /></g>
      </g>);
      break;
    case "think":
      eyes = (<g>{dot(-22, -18)}{dot(22, -18)}</g>);
      mouth = <path d="M-14 28 L16 22" fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" />;
      break;
    default:
      eyes = (<g>{dot(-22, -12)}{dot(22, -12)}</g>);
  }
  return (
    <g>
      <circle r={62} fill={fill} stroke={ink} strokeWidth={6} />
      {eyes}
      {mouth}
      {face === "sad" ? <path d="M30 6 Q37 18 30 24 Q23 18 30 6 Z" fill="#7CC8FF" /> : null}
    </g>
  );
}

export default function Part(p: PartProps<any>) {
  const u = ui(p.style, p.color);
  const at = startFrame(p);
  const face = FACES.includes(p.face) ? p.face : "happy";
  const W = p.w ?? 800, H = 170;
  const text = String(p.text ?? "");
  const size = fitSize(text, 56, W - 260);
  const k = popIn(p.f, at, 12);
  const ePill = enter(p.f, at, 10);
  const eFace = popIn(p.f, at + 4, 12);
  const bounce = p.f > at + 14 ? -Math.abs(Math.sin((p.f - at - 14) * 0.22)) * 18 : 0;
  const faceFill = p.color ?? u.warn;
  return (
    <g transform={`translate(${p.x ?? 540} ${p.y ?? 1400}) scale(${(p.s ?? 1) * k})`}>
      <rect x={-W / 2 + 10} y={-H / 2 + 14} width={W} height={H} rx={H / 2} fill="rgba(0,0,0,0.18)" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={u.card} stroke={u.ink} strokeWidth={6} />
      <g transform={`translate(${-W / 2 + 60} ${bounce}) scale(${clamp(eFace)})`}>
        <Face face={face} u={u} fill={faceFill} />
      </g>
      <g opacity={ePill}>
        <Txt x={-W / 2 + 170} y={size * 0.36} u={u} size={size} weight={800} anchor="start" maxW={W - 220}>{text}</Txt>
      </g>
    </g>
  );
}
