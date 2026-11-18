import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Snowman: three stacked snowballs, coal eyes and buttons, carrot nose, stick arms, scarf and knit hat.
// Origin = bottom centre (the bottom ball rests on y). About 500 px wide and 1000 px tall at s = 1.
const f1 = (v: number) => v.toFixed(1);
const popS = (f: number) => { const t = Math.min(1, Math.max(0, f / 20)), c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const pick = (v: string | undefined, d: string) => (v && v !== "none" ? v : d);

/** A snowball with a soft crescent of shade on its lower right. */
const ball = (cx: number, cy: number, r: number, c: string, dk: string) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={dk} />
    <circle cx={cx - r * 0.07} cy={cy - r * 0.08} r={r * 0.93} fill={c} />
  </g>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  const s = p.s ?? 1, f = p.f ?? 0, x = p.x ?? 540, y = p.y ?? 1600;
  const snow = pick(p.color, C.white);
  const scarfC = pick(p.color2, C.red);
  const anim: string = p.anim ?? "none";
  const snowDk = shade(snow, 0.1);
  const twig = "#5E3B26";
  const wave = anim === "wave" ? 12 * Math.sin((f * 2 * Math.PI) / 48) : 0;
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${p.flip ? -s : s} ${s})`}>
      <g transform={anim === "pop" ? `scale(${f1(popS(f))})` : ""}>
        <ellipse cx={0} cy={6} rx={260} ry={22} fill={C.shadow} />
        {ball(0, -210, 210, snow, snowDk)}
        {/* stick arms: left static, right one waves from the shoulder */}
        <path d="M -130 -580 L -300 -660 M -300 -660 L -336 -696 M -300 -660 L -334 -632" stroke={twig} strokeWidth={14} strokeLinecap="round" fill="none" />
        <g transform={`rotate(${f1(wave)} 130 -580)`}>
          <path d="M 130 -580 L 300 -660 M 300 -660 L 334 -696 M 300 -660 L 336 -632" stroke={twig} strokeWidth={14} strokeLinecap="round" fill="none" />
        </g>
        {ball(0, -560, 150, snow, snowDk)}
        {[-520, -465].map((by) => <circle key={by} cx={0} cy={by} r={14} fill={C.ink} />)}
        {ball(0, -745, 110, snow, snowDk)}
        {/* coal eyes, carrot nose, coal smile */}
        <circle cx={-36} cy={-772} r={13} fill={C.ink} />
        <circle cx={36} cy={-772} r={13} fill={C.ink} />
        <path d="M -12 -752 L 58 -738 L -12 -726 Z" fill={C.orange} />
        {[[-50, -716], [-24, -704], [2, -700], [28, -704], [50, -716]].map(([mx, my], i) => (
          <circle key={i} cx={mx} cy={my} r={6} fill={C.ink} />
        ))}
        {/* scarf with a hanging tail */}
        <path d="M 52 -640 L 112 -636 L 132 -530 Q 120 -520 100 -530 L 74 -604 Z" fill={shade(scarfC, 0.2)} />
        <rect x={-118} y={-668} width={236} height={44} rx={22} fill={scarfC} />
        {/* knit hat with ribbed brim and pom-pom */}
        <path d="M -98 -846 C -104 -940 -62 -972 0 -972 C 62 -972 104 -940 98 -846 Z" fill={C.purple} />
        <rect x={-108} y={-872} width={216} height={38} rx={16} fill={shade(C.purple, 0.2)} />
        {[-70, -35, 0, 35, 70].map((kx) => (
          <line key={kx} x1={kx} y1={-866} x2={kx} y2={-840} stroke={shade(C.purple, 0.45)} strokeWidth={5} opacity={0.6} />
        ))}
        <circle cx={0} cy={-982} r={24} fill={C.white} />
      </g>
    </g>
  );
}
