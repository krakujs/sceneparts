import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Well bucket: round stone well with a wooden roof, winch and rope, a bucket bobbing on the rope. Stands on (x, y) at ground level.
export const WellBucket: React.FC<{ x: number; y: number; s?: number; f?: number; bobbing?: boolean; roof?: string; flip?: boolean }> = ({ x, y, s = 1, f = 0, bobbing = true, roof = C.brick, flip = false }) => {
  const o = { stroke: C.ink, strokeWidth: 8, strokeLinejoin: "round" as const };
  const bob = bobbing ? Math.sin(f / 25) * 12 : 0;
  const bucketY = -250 + bob;
  const rows = [0, 1, 2, 3, 4];
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s})`}>
      <ellipse cx={0} cy={8} rx={250} ry={22} fill="#000" opacity={0.2} />
      {/* wooden posts and roof behind the winch */}
      <rect x={-196} y={-560} width={26} height={320} fill={C.sepia} {...o} />
      <rect x={170} y={-560} width={26} height={320} fill={C.sepia} {...o} />
      <path d="M -270 -540 L 0 -690 L 270 -540 Z" fill={roof} {...o} />
      <path d="M -230 -530 L 0 -660 L 230 -530" stroke={C.ink} strokeWidth={5} fill="none" opacity={0.4} />
      {/* winch */}
      <rect x={-190} y={-520} width={380} height={22} rx={11} fill={C.sepia} {...o} />
      <rect x={180} y={-540} width={18} height={60} rx={6} fill={C.ink} />
      <path d="M 198 -530 L 240 -530" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
      {/* stone wall */}
      <path d="M -220 -260 L -220 0 Q 0 46 220 0 L 220 -260 Z" fill={C.stone} {...o} />
      {rows.map((r) => {
        const yy = -240 + r * 46;
        const off = r % 2 === 0 ? 0 : 50;
        return (
          <g key={r}>
            <line x1={-220} y1={yy} x2={220} y2={yy} stroke={C.stoneDark} strokeWidth={5} />
            {[-220, -120, -20, 80, 180].map((vx) => <line key={vx} x1={vx + off} y1={yy} x2={vx + off} y2={yy + 46} stroke={C.stoneDark} strokeWidth={5} />)}
          </g>
        );
      })}
      <path d="M -190 -240 L -190 -40" stroke="#FFFFFF" strokeWidth={8} opacity={0.2} strokeLinecap="round" />
      {/* rim and water */}
      <ellipse cx={0} cy={-260} rx={220} ry={52} fill={C.stone} {...o} />
      <ellipse cx={0} cy={-262} rx={178} ry={36} fill={C.navy} stroke={C.ink} strokeWidth={5} />
      <path d="M -120 -272 Q -60 -280 0 -272" stroke="#FFFFFF" strokeWidth={5} opacity={0.4} fill="none" strokeLinecap="round" />
      {/* rope and bucket */}
      <line x1={0} y1={-510} x2={0} y2={bucketY - 40} stroke={C.ink} strokeWidth={8} />
      <line x1={0} y1={-510} x2={0} y2={bucketY - 40} stroke={C.sepia} strokeWidth={4} />
      <g transform={`translate(0 ${bucketY})`}>
        <path d="M -62 -40 L 62 -40 L 46 40 Q 0 52 -46 40 Z" fill={C.brick} {...o} />
        <path d="M -62 -40 L 62 -40" stroke={C.mustard} strokeWidth={10} strokeLinecap="round" />
        <ellipse cx={0} cy={-40} rx={62} ry={12} fill={C.brickDark} stroke={C.ink} strokeWidth={5} />
        <path d="M -40 -20 L -30 24" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return <WellBucket x={p.x} y={p.y} s={p.s} f={p.f} bobbing={p.bobbing} roof={p.roof} flip={p.flip} />;
}
