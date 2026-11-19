import React from "react";
import { useCurrentFrame } from "remotion";
import { C } from "../theme";

export type Hat = "cap" | "bonnet" | "top" | "bowler" | "none";
export type HeldProp = "pole" | "peashooter" | "lantern" | "lamplighter" | "pick" | "pencil" | "saw" | "none";
export type Action = "walk" | "tap" | "shoot" | "idle" | "wave" | "write" | "saw";

export type FigureSpec = {
  hat?: Hat;
  coat?: string;
  skin?: string;
  scarf?: string;
  skirt?: boolean;
  prop?: HeldProp;
  action?: Action;
  facing?: "right" | "left";
};

// A reusable storybook character. Origin = feet; total height ~430 at scale 1.
export const Figure: React.FC<FigureSpec & { x: number; y: number; scale?: number; walking?: boolean; frameOffset?: number }> = ({
  x,
  y,
  scale = 1,
  hat = "cap",
  coat = C.teal,
  skin = "#E8B990",
  scarf = C.mustard,
  skirt = false,
  prop = "none",
  action = "idle",
  facing = "right",
  walking,
  frameOffset = 0,
}) => {
  const f = useCurrentFrame() + frameOffset;
  const isWalking = walking ?? action === "walk";
  const phase = f / 5;
  const swing = isWalking ? Math.sin(phase) * 24 : 0;
  const bob = isWalking ? Math.abs(Math.sin(phase)) * -8 : Math.sin(f / 20) * 2;

  // Arm + prop angle (degrees, 0 = pointing down)
  let arm = isWalking ? -swing * 0.6 : 10;
  if (prop === "pole" || prop === "lamplighter") {
    const tap = action === "tap" ? Math.max(0, Math.sin(f / 4)) ** 6 * 10 : 0;
    arm = -145 - tap;
  }
  if (action === "wave") arm = -150 + Math.sin(f / 3) * 20;
  if (prop === "peashooter") arm = -105;
  if (action === "write") arm = -62 + Math.sin(f / 2.2) * 7;
  if (prop === "saw") arm = action === "saw" ? -38 + Math.sin(f / 2.6) * 13 : -20;

  const flip = facing === "left" ? -1 : 1;

  // Peas fired from the shooter every 18 frames
  const peas: React.ReactNode[] = [];
  if (prop === "peashooter" && action === "shoot") {
    for (let k = 0; k < 3; k++) {
      const age = (f + k * 6) % 18;
      const p = age / 14;
      if (p <= 1) {
        const px = 70 + p * 300;
        const py = -400 - p * 420 + p * p * 120;
        peas.push(
          <g key={k}>
            <circle cx={px - 18} cy={py + 30} r={7} fill="#CFEFB0" opacity={0.35} />
            <circle cx={px - 9} cy={py + 15} r={10} fill="#CFEFB0" opacity={0.55} />
            <circle cx={px} cy={py} r={15} fill="#8FD16A" stroke={C.ink} strokeWidth={4} />
          </g>,
        );
      }
    }
  }

  return (
    <g transform={`translate(${x}, ${y + bob}) scale(${scale * flip}, ${scale})`}>
      {/* shadow */}
      <ellipse cx={0} cy={4 - bob} rx={80} ry={14} fill="#000" opacity={0.3} />
      {/* back leg */}
      <g transform={`rotate(${-swing}, 0, -170)`}>
        <rect x={-18} y={-175} width={36} height={170} rx={14} fill={C.ink} />
        <ellipse cx={14} cy={-6} rx={30} ry={14} fill={C.ink} />
      </g>
      {/* back arm */}
      <g transform={`rotate(${swing * 0.6 + 8}, -20, -310)`}>
        <rect x={-36} y={-318} width={32} height={140} rx={16} fill={coat} stroke={C.ink} strokeWidth={5} />
      </g>
      {/* front leg */}
      <g transform={`rotate(${swing}, 0, -170)`}>
        <rect x={-18} y={-175} width={36} height={170} rx={14} fill="#2B2420" />
        <ellipse cx={14} cy={-6} rx={30} ry={14} fill="#2B2420" />
      </g>
      {/* coat / dress */}
      <path
        d={skirt ? "M -55 -330 L 55 -330 L 95 -90 L -95 -90 Z" : "M -55 -330 L 55 -330 L 78 -140 L -78 -140 Z"}
        fill={coat}
        stroke={C.ink}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <line x1={0} y1={-320} x2={0} y2={skirt ? -95 : -145} stroke={C.ink} strokeWidth={4} opacity={0.5} />
      {[0, 1, 2].map((b) => (
        <circle key={b} cx={10} cy={-290 + b * 45} r={6} fill={C.mustard} />
      ))}
      {/* scarf */}
      <rect x={-48} y={-345} width={96} height={30} rx={14} fill={scarf} stroke={C.ink} strokeWidth={5} />
      {/* head */}
      <circle cx={6} cy={-385} r={46} fill={skin} stroke={C.ink} strokeWidth={6} />
      <circle cx={28} cy={-392} r={5} fill={C.ink} />
      <path d="M 50 -380 q 10 6 0 12" stroke={C.ink} strokeWidth={4} fill="none" />
      <circle cx={18} cy={-368} r={7} fill="#D9826A" opacity={0.6} />
      {/* hat */}
      {hat === "cap" ? (
        <g>
          <path d="M -42 -405 Q 0 -460 48 -410 Z" fill="#3D3A44" stroke={C.ink} strokeWidth={5} />
          <path d="M 30 -412 Q 70 -414 82 -402 L 34 -400 Z" fill="#3D3A44" stroke={C.ink} strokeWidth={5} />
        </g>
      ) : null}
      {hat === "bonnet" ? (
        <path d="M -50 -360 Q -60 -450 10 -446 Q 60 -444 58 -400 L 40 -404 Q 30 -428 0 -428 Q -30 -426 -32 -360 Z" fill={C.cream} stroke={C.ink} strokeWidth={5} />
      ) : null}
      {hat === "top" ? (
        <g>
          <rect x={-34} y={-520} width={76} height={100} rx={6} fill={C.ink} />
          <rect x={-56} y={-428} width={120} height={14} rx={6} fill={C.ink} />
          <rect x={-34} y={-450} width={76} height={14} fill={C.brick} />
        </g>
      ) : null}
      {hat === "bowler" ? (
        <g>
          <path d="M -36 -415 Q -34 -480 6 -480 Q 46 -480 48 -415 Z" fill={C.ink} />
          <rect x={-56} y={-420} width={120} height={12} rx={6} fill={C.ink} />
        </g>
      ) : null}
      {/* peashooter */}
      {prop === "peashooter" ? (
        <g transform="rotate(-38, 40, -372)">
          <rect x={40} y={-380} width={110} height={16} rx={8} fill={C.sepia} stroke={C.ink} strokeWidth={4} />
        </g>
      ) : null}
      {peas}
      {/* front arm + held prop */}
      <g transform={`rotate(${arm}, 12, -315)`}>
        <rect x={-4} y={-322} width={32} height={140} rx={16} fill={coat} stroke={C.ink} strokeWidth={5} />
        <circle cx={12} cy={-180} r={17} fill={skin} stroke={C.ink} strokeWidth={4} />
        {prop === "pole" || prop === "lamplighter" ? (
          <g>
            <rect x={6} y={-190} width={12} height={430} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={3} />
            {prop === "pole" ? (
              <path d="M 12 240 l -16 26 M 12 240 l 16 26 M 12 240 l 0 30" stroke={C.ink} strokeWidth={5} />
            ) : (
              <g>
                <circle cx={12} cy={250} r={22} fill={C.glow} opacity={0.5} />
                <rect x={2} y={236} width={20} height={20} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
              </g>
            )}
          </g>
        ) : null}
        {prop === "lantern" ? (
          <g>
            <line x1={12} y1={-170} x2={12} y2={-130} stroke={C.ink} strokeWidth={4} />
            <circle cx={12} cy={-100} r={46} fill={C.glow} opacity={0.35} />
            <rect x={-12} y={-130} width={48} height={60} rx={8} fill={C.glow} stroke={C.ink} strokeWidth={5} />
          </g>
        ) : null}
        {prop === "pencil" ? (
          <g transform="rotate(30, 12, -180)">
            <rect x={6} y={-200} width={10} height={70} rx={2} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
            <polygon points="6,-130 16,-130 11,-116" fill={C.ink} />
          </g>
        ) : null}
        {prop === "saw" ? (
          <g>
            <rect x={-14} y={-196} width={52} height={14} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={3} />
            <rect x={4} y={-186} width={18} height={250} fill="#C9D3DA" stroke={C.ink} strokeWidth={3} />
            <path d={Array.from({ length: 12 }, (_, i) => `M 22 ${-176 + i * 20} l 9 6 l -9 6`).join(" ")} stroke={C.ink} strokeWidth={3} fill="none" />
          </g>
        ) : null}
        {prop === "pick" ? (
          <g>
            <rect x={6} y={-190} width={12} height={230} rx={6} fill="#B98B52" stroke={C.ink} strokeWidth={3} />
            <path d="M -50 40 Q 12 10 74 40 L 70 52 Q 12 26 -46 52 Z" fill={C.stone} stroke={C.ink} strokeWidth={4} />
          </g>
        ) : null}
      </g>
    </g>
  );
};
