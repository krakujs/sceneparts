import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C } from "../style/index";

// Storybook townsfolk generator: a period person (flat vintage look, thick ink outline) built from
// hat, hair, beard, top, lower and apron choices. Origin = feet, faces right, ~640 px tall at s = 1.
// Presets import `Townsfolk` and pass `held` (drawn in the front hand), `body` (drawn over the torso)
// and `front` (drawn last) to add their own tools and details.

export type TfHat =
  | "none" | "cap" | "flat" | "bonnet" | "top" | "bowler" | "tricorn" | "peaked" | "custodian" | "wide"
  | "straw" | "hood" | "kerchief" | "mob" | "beret" | "pilot" | "helmet" | "turban" | "laurel" | "veil";
export type TfHair = "short" | "bald" | "long" | "bun" | "ponytail" | "curly" | "tonsure";
export type TfBeard = "none" | "moustache" | "full" | "stubble" | "mutton";
export type TfTop = "coat" | "jacket" | "waistcoat" | "smock" | "tunic" | "uniform" | "armour" | "robe" | "dress" | "shirt";
export type TfLower = "trousers" | "breeches" | "skirt" | "long" | "shorts";
export type TfPose = "down" | "forward" | "up" | "carry" | "hip" | "chest";
export type TfAction = "idle" | "walk" | "wave" | "work";

export type TownsfolkSpec = {
  x: number; y: number; s?: number; f?: number; flip?: boolean;
  hat?: TfHat; hatColour?: string; hair?: TfHair; hairColour?: string; beard?: TfBeard;
  skin?: string; top?: TfTop; coat?: string; shirt?: string; lower?: TfLower; legs?: string; boots?: string;
  apron?: boolean; apronColour?: string; scarf?: string; belt?: boolean; buttons?: boolean;
  pose?: TfPose; backPose?: TfPose; action?: TfAction; age?: "adult" | "child" | "old";
  held?: (angle: number) => React.ReactNode; backHeld?: (angle: number) => React.ReactNode;
  body?: React.ReactNode; front?: React.ReactNode; behind?: React.ReactNode;
};

const INK = C.ink;
const SW = 6;
const POSE: Record<TfPose, number> = { down: 8, forward: -78, up: -135, carry: -45, hip: 30, chest: -110 };

/** Front-hand position (local, unscaled, facing right) for a given arm angle in degrees (0 = straight down). */
export const handAt = (angle: number, shoulderY = -440) => {
  const r = (angle * Math.PI) / 180;
  return { x: 18 - Math.sin(r) * 170, y: shoulderY + Math.cos(r) * 170 };
};

const Hat: React.FC<{ hat: TfHat; c: string }> = ({ hat, c }) => {
  const o = { stroke: INK, strokeWidth: SW, strokeLinejoin: "round" as const };
  switch (hat) {
    case "cap":
      return <g><path d="M -52 -556 Q -50 -616 6 -618 Q 60 -616 62 -560 Z" fill={c} {...o} /><path d="M 40 -562 Q 100 -566 112 -548 L 44 -546 Z" fill={c} {...o} /></g>;
    case "flat":
      return <g><path d="M -58 -552 Q -56 -604 10 -606 Q 76 -604 96 -566 L 108 -552 Z" fill={c} {...o} /><path d="M -40 -588 Q 20 -600 80 -572" stroke="#000" strokeOpacity={0.25} strokeWidth={4} fill="none" /></g>;
    case "bonnet":
      return <g><path d="M -70 -480 Q -86 -616 6 -624 Q 76 -626 78 -560 L 58 -556 Q 50 -594 6 -596 Q -40 -594 -44 -480 Z" fill={c} {...o} /><path d="M -44 -480 Q -20 -456 6 -452" stroke={C.brick} strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M 6 -452 l -14 -12 l 0 24 Z M 6 -452 l 14 -12 l 0 24 Z" fill={C.brick} stroke={INK} strokeWidth={3} strokeLinejoin="round" /></g>;
    case "top":
      return <g><rect x={-44} y={-700} width={92} height={136} rx={6} fill={c} {...o} /><rect x={-44} y={-604} width={92} height={18} fill={C.brick} /><rect x={-72} y={-578} width={148} height={18} rx={8} fill={c} {...o} /></g>;
    case "bowler":
      return <g><path d="M -48 -566 Q -48 -646 4 -648 Q 56 -646 56 -566 Z" fill={c} {...o} /><rect x={-70} y={-574} width={144} height={16} rx={8} fill={c} {...o} /></g>;
    case "tricorn":
      return <g><path d="M -92 -566 Q -40 -588 0 -640 Q 40 -588 100 -566 Q 4 -540 -92 -566 Z" fill={c} {...o} /><path d="M -60 -572 Q 0 -560 70 -572" stroke={C.mustard} strokeWidth={5} fill="none" /></g>;
    case "peaked":
      return <g><path d="M -54 -566 L -60 -620 Q 4 -640 66 -620 L 60 -566 Z" fill={c} {...o} /><path d="M 30 -568 Q 90 -570 104 -552 L 34 -552 Z" fill={INK} /><rect x={-56} y={-584} width={116} height={14} fill={C.mustard} stroke={INK} strokeWidth={3} /></g>;
    case "custodian":
      return <g><path d="M -54 -560 Q -56 -660 4 -690 Q 64 -660 62 -560 Z" fill={c} {...o} /><rect x={-64} y={-572} width={136} height={16} rx={6} fill={c} {...o} /><circle cx={4} cy={-610} r={14} fill="#C9D3DA" stroke={INK} strokeWidth={4} /><circle cx={4} cy={-694} r={9} fill="#C9D3DA" stroke={INK} strokeWidth={4} /></g>;
    case "wide":
      return <g><ellipse cx={4} cy={-566} rx={124} ry={22} fill={c} {...o} /><path d="M -54 -568 L -48 -640 Q 4 -656 56 -640 L 62 -568 Z" fill={c} {...o} /><rect x={-52} y={-592} width={112} height={14} fill="#000" opacity={0.3} /></g>;
    case "straw":
      return <g><ellipse cx={4} cy={-566} rx={110} ry={20} fill="#E8C36A" {...o} /><path d="M -50 -568 L -46 -626 Q 4 -640 54 -626 L 58 -568 Z" fill="#E8C36A" {...o} /><rect x={-48} y={-592} width={104} height={14} fill={c} /></g>;
    case "hood":
      return <path d="M -76 -440 Q -96 -560 -40 -616 Q 10 -650 60 -612 Q 90 -580 80 -530 L 60 -520 Q 64 -600 4 -604 Q -54 -600 -54 -520 L -60 -440 Z" fill={c} {...o} />;
    case "kerchief":
      return <g><path d="M -64 -520 Q -70 -612 6 -616 Q 70 -614 68 -548 Q 10 -560 -64 -520 Z" fill={c} {...o} /><path d="M -60 -530 L -96 -500 L -70 -490 Z" fill={c} {...o} /></g>;
    case "mob":
      return <g><path d="M -72 -540 Q -80 -632 4 -636 Q 82 -632 74 -548 Q 40 -566 4 -566 Q -40 -566 -72 -540 Z" fill={C.cream} {...o} /><path d="M -60 -556 Q 4 -580 64 -556" stroke={c} strokeWidth={8} fill="none" /></g>;
    case "beret":
      return <g><ellipse cx={-4} cy={-594} rx={74} ry={28} fill={c} {...o} /><circle cx={-4} cy={-626} r={7} fill={c} stroke={INK} strokeWidth={4} /></g>;
    case "pilot":
      return <g><path d="M -64 -520 Q -70 -620 4 -624 Q 74 -620 66 -540 L 30 -546 L -40 -520 Z" fill={c} {...o} /><rect x={-10} y={-600} width={72} height={30} rx={14} fill="#9CC9CF" stroke={INK} strokeWidth={5} /><rect x={-56} y={-604} width={40} height={30} rx={14} fill="#9CC9CF" stroke={INK} strokeWidth={5} /></g>;
    case "helmet":
      return <g><path d="M -62 -540 Q -66 -640 4 -644 Q 74 -640 70 -540 Z" fill={c} {...o} /><path d="M -84 -542 L 92 -542" stroke={INK} strokeWidth={10} strokeLinecap="round" /><path d="M -84 -542 L 92 -542" stroke={c} strokeWidth={4} strokeLinecap="round" /></g>;
    case "turban":
      return <g><path d="M -60 -560 Q -70 -640 4 -646 Q 78 -640 68 -560 Q 4 -580 -60 -560 Z" fill={c} {...o} /><path d="M -50 -580 Q 10 -620 60 -590 M -54 -608 Q 0 -636 56 -616" stroke={INK} strokeWidth={4} fill="none" opacity={0.5} /></g>;
    case "laurel":
      return <g>{[-50, -30, -10, 10, 30, 50].map((dx, i) => <ellipse key={i} cx={dx} cy={-600 + Math.abs(dx) * 0.45} rx={13} ry={7} transform={`rotate(${dx * 0.8} ${dx} ${-600 + Math.abs(dx) * 0.45})`} fill="#6E9A4A" stroke={INK} strokeWidth={3} />)}</g>;
    case "veil":
      return <path d="M -70 -430 Q -92 -560 -40 -612 Q 10 -640 58 -612 Q 76 -590 70 -566 L 50 -570 Q 30 -596 -10 -594 Q -50 -590 -56 -520 L -40 -430 Z" fill={c} {...o} />;
    default:
      return null;
  }
};

export const Townsfolk: React.FC<TownsfolkSpec> = (p) => {
  const {
    x, y, s = 1, f = 0, flip = false, hat = "cap", hatColour, hair = "short", hairColour = "#4A3324", beard = "none",
    skin = "#E8B990", top = "coat", coat = C.teal, shirt = C.cream, lower = "trousers", legs = "#3D3A44", boots = "#2B2420",
    apron = false, apronColour = C.cream, scarf, belt = false, buttons = true, pose = "down", backPose = "down", action = "idle",
    age = "adult", held, backHeld, body, front, behind,
  } = p;
  const walking = action === "walk";
  const ph = f / 5;
  const swing = walking ? Math.sin(ph) * 22 : 0;
  const bob = walking ? Math.abs(Math.sin(ph)) * -10 : Math.sin(f / 22) * 2;
  let a = POSE[pose];
  if (walking && pose === "down") a = -swing * 0.7;
  if (action === "wave") a = -140 + Math.sin(f / 3) * 16;
  if (action === "work") a += Math.sin(f / 3) * 14;
  let b = POSE[backPose];
  if (walking && backPose === "down") b = swing * 0.7;
  const shoulderY = -440;
  const longLower = lower === "long" || top === "robe" || top === "dress";
  const hemY = longLower ? -24 : lower === "skirt" ? -110 : top === "coat" ? -190 : top === "tunic" || top === "smock" ? -220 : -250;
  const sx = age === "child" ? 0.72 * s : s;
  const hc = hatColour ?? (hat === "bonnet" || hat === "mob" ? C.cream : "#3D3A44");
  const fl = flip ? -1 : 1;
  const legW = 40;
  const legColour = lower === "breeches" ? "#E6DCC6" : legs;

  const leg = (rot: number, shade: number, dx: number) => (
    <g transform={`translate(${dx} 0) rotate(${rot} 0 -260)`}>
      <rect x={-legW / 2} y={-264} width={legW} height={250} rx={16} fill={legColour} stroke={INK} strokeWidth={SW} />
      {lower === "breeches" ? <rect x={-legW / 2 - 2} y={-264} width={legW + 4} height={120} rx={14} fill={legs} stroke={INK} strokeWidth={SW} /> : null}
      {lower === "shorts" ? <rect x={-legW / 2 - 2} y={-264} width={legW + 4} height={90} rx={12} fill={legs} stroke={INK} strokeWidth={SW} /> : null}
      <path d="M -24 -30 L 22 -30 Q 58 -26 58 -2 L -24 -2 Z" fill={boots} stroke={INK} strokeWidth={SW} strokeLinejoin="round" opacity={shade} />
    </g>
  );

  const arm = (ang: number, colour: string, h?: (a: number) => React.ReactNode) => (
    <g transform={`rotate(${ang} 18 ${shoulderY})`}>
      <rect x={-6} y={shoulderY - 18} width={48} height={190} rx={22} fill={colour} stroke={INK} strokeWidth={SW} />
      {h ? <g transform={`translate(18 ${shoulderY + 170}) rotate(${-ang})`}>{h(ang)}</g> : null}
      <circle cx={18} cy={shoulderY + 172} r={22} fill={skin} stroke={INK} strokeWidth={5} />
    </g>
  );

  const sleeve = top === "waistcoat" || top === "shirt" ? shirt : top === "armour" ? "#AEB7BF" : coat;
  const torso = (() => {
    const w0 = 66, w1 = top === "dress" || top === "robe" ? 118 : top === "coat" ? 88 : 76;
    const d = `M ${-w0} ${shoulderY - 20} Q 0 ${shoulderY - 40} ${w0} ${shoulderY - 20} L ${w1} ${hemY} L ${-w1} ${hemY} Z`;
    return (
      <g>
        {lower === "skirt" ? <path d={`M -70 -270 L 70 -270 L 112 -100 L -112 -100 Z`} fill={legs} stroke={INK} strokeWidth={SW} strokeLinejoin="round" /> : null}
        <path d={d} fill={top === "waistcoat" || top === "shirt" ? shirt : top === "armour" ? "#AEB7BF" : coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        {top === "waistcoat" ? <path d={`M -56 ${shoulderY - 14} L 56 ${shoulderY - 14} L 66 -250 L 0 -232 L -66 -250 Z`} fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" /> : null}
        {top === "jacket" || top === "coat" || top === "uniform" ? <path d={`M -18 ${shoulderY - 30} L 0 ${shoulderY + 30} L 18 ${shoulderY - 30} Z`} fill={shirt} stroke={INK} strokeWidth={4} /> : null}
        {top === "armour" ? (
          <g><path d={`M -60 ${shoulderY + 40} Q 0 ${shoulderY + 70} 60 ${shoulderY + 40}`} stroke={INK} strokeWidth={4} fill="none" opacity={0.5} /><path d="M -64 -330 Q 0 -310 64 -330" stroke={INK} strokeWidth={4} fill="none" opacity={0.5} /><path d="M -70 -270 L 70 -270 L 84 -190 L -84 -190 Z" fill={coat} stroke={INK} strokeWidth={SW} strokeLinejoin="round" /></g>
        ) : null}
        {top === "tunic" || top === "smock" ? <path d={`M -14 ${shoulderY - 30} L 0 ${shoulderY + 10} L 14 ${shoulderY - 30}`} stroke={INK} strokeWidth={4} fill="none" /> : null}
        {buttons && (top === "coat" || top === "jacket" || top === "uniform" || top === "waistcoat") ? [0, 1, 2, 3].map((k) => <circle key={k} cx={4} cy={shoulderY + 50 + k * 42} r={6} fill={top === "uniform" ? C.mustard : "#1B1712"} opacity={top === "uniform" ? 1 : 0.6} />) : null}
        {top === "coat" || top === "robe" || top === "dress" ? <line x1={0} y1={shoulderY + 30} x2={0} y2={hemY - 6} stroke={INK} strokeWidth={4} opacity={0.35} /> : null}
        {belt ? <rect x={-80} y={-280} width={160} height={22} fill="#4A3324" stroke={INK} strokeWidth={4} /> : null}
        {belt ? <rect x={-8} y={-284} width={26} height={30} rx={3} fill="none" stroke={C.mustard} strokeWidth={5} /> : null}
        {apron ? <path d={`M -58 -330 L 58 -330 L 72 ${longLower ? -60 : -120} L -72 ${longLower ? -60 : -120} Z`} fill={apronColour} stroke={INK} strokeWidth={SW} strokeLinejoin="round" /> : null}
        {apron ? <path d="M -70 -332 L 70 -332" stroke={apronColour} strokeWidth={10} /> : null}
      </g>
    );
  })();

  const headY = -520;
  const hairBack = hair === "long" ? <path d={`M -58 ${headY - 20} Q -80 ${headY + 70} -50 ${headY + 110} L 10 ${headY + 60} Z`} fill={hairColour} stroke={INK} strokeWidth={5} />
    : hair === "ponytail" ? <path d={`M -50 ${headY - 20} Q -100 ${headY + 10} -86 ${headY + 70} Q -70 ${headY + 40} -40 ${headY + 10} Z`} fill={hairColour} stroke={INK} strokeWidth={5} />
    : hair === "bun" ? <circle cx={-52} cy={headY - 30} r={24} fill={hairColour} stroke={INK} strokeWidth={5} /> : null;
  const hairTop = hair === "bald" ? null
    : hair === "tonsure" ? <path d={`M -58 ${headY + 4} Q -66 ${headY - 40} -40 ${headY - 46} Q 4 ${headY - 30} 44 ${headY - 50} Q 64 ${headY - 34} 60 ${headY - 6} Q 30 ${headY - 26} 4 ${headY - 24} Q -30 ${headY - 24} -58 ${headY + 4} Z`} fill={hairColour} stroke={INK} strokeWidth={5} />
    : hair === "curly" ? <g>{[-44, -20, 6, 30, 50].map((dx, i) => <circle key={i} cx={dx} cy={headY - 44 + Math.abs(dx) * 0.3} r={22} fill={hairColour} stroke={INK} strokeWidth={4} />)}</g>
    : <path d={`M -60 ${headY + 10} Q -64 ${headY - 66} 6 ${headY - 64} Q 62 ${headY - 60} 60 ${headY - 18} Q 30 ${headY - 40} 0 ${headY - 34} Q -28 ${headY - 30} -40 ${headY - 6} L -44 ${headY + 20} Z`} fill={hairColour} stroke={INK} strokeWidth={5} strokeLinejoin="round" />;
  const beardEl = beard === "full" ? <path d={`M -20 ${headY + 20} Q -10 ${headY + 100} 34 ${headY + 92} Q 66 ${headY + 70} 60 ${headY + 20} Q 40 ${headY + 34} 10 ${headY + 30} Z`} fill={hairColour} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    : beard === "moustache" ? <path d={`M 20 ${headY + 26} Q 40 ${headY + 14} 62 ${headY + 24} Q 40 ${headY + 36} 20 ${headY + 26} Z`} fill={hairColour} stroke={INK} strokeWidth={4} />
    : beard === "mutton" ? <path d={`M -34 ${headY - 4} Q -36 ${headY + 50} 0 ${headY + 52} L 10 ${headY + 30} Q -10 ${headY + 20} -14 ${headY - 6} Z`} fill={hairColour} stroke={INK} strokeWidth={4} />
    : beard === "stubble" ? <path d={`M -20 ${headY + 26} Q 10 ${headY + 70} 56 ${headY + 34}`} stroke={hairColour} strokeWidth={22} fill="none" opacity={0.35} strokeLinecap="round" /> : null;
  const wrinkle = age === "old" ? <path d={`M 34 ${headY - 26} q 10 -4 18 0 M 30 ${headY + 40} q 10 6 22 0`} stroke={INK} strokeWidth={3} fill="none" opacity={0.6} /> : null;

  return (
    <g transform={`translate(${x} ${y}) scale(${sx * fl} ${sx})`}>
      <ellipse cx={0} cy={2} rx={110} ry={16} fill="#000" opacity={0.22} />
      <g transform={`translate(0 ${bob})`}>
        {behind}
        {arm(b, sleeve, backHeld)}
        {longLower ? null : leg(-swing, 0.85, -16)}
        {longLower ? null : leg(swing, 1, 14)}
        {longLower ? (
          <g>
            <ellipse cx={-26 + swing} cy={-14} rx={34} ry={14} fill={boots} stroke={INK} strokeWidth={5} />
            <ellipse cx={34 - swing} cy={-14} rx={34} ry={14} fill={boots} stroke={INK} strokeWidth={5} />
          </g>
        ) : null}
        {torso}
        {body}
        {scarf ? <rect x={-56} y={shoulderY - 40} width={112} height={34} rx={16} fill={scarf} stroke={INK} strokeWidth={5} /> : null}
        <rect x={-18} y={headY + 40} width={40} height={40} fill={skin} stroke={INK} strokeWidth={5} />
        {hairBack}
        <circle cx={4} cy={headY} r={60} fill={skin} stroke={INK} strokeWidth={SW} />
        <path d={`M 62 ${headY + 2} q 12 8 2 18`} stroke={INK} strokeWidth={5} fill={skin} strokeLinecap="round" />
        <circle cx={34} cy={headY - 8} r={6.5} fill={INK} />
        <path d={`M 22 ${headY - 26} q 12 -6 24 0`} stroke={INK} strokeWidth={4} fill="none" opacity={0.7} />
        <circle cx={22} cy={headY + 22} r={10} fill="#D9826A" opacity={0.5} />
        <path d={`M 30 ${headY + 36} q 12 6 22 -2`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
        {hairTop}
        {beardEl}
        {wrinkle}
        <path d={`M -10 ${headY - 2} q -18 12 0 26`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.55} />
        <Hat hat={hat} c={hc} />
        {arm(a, sleeve, held)}
        {front}
      </g>
    </g>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any>) {
  return (
    <Townsfolk
      x={p.x + (p.vx ?? 0) * p.f} y={p.y} s={p.s} f={p.f} flip={p.flip}
      hat={p.hat} hatColour={p.hatColour} hair={p.hair} hairColour={p.hairColour} beard={p.beard} skin={p.skin}
      top={p.top} coat={p.coat} shirt={p.shirt} lower={p.lower} legs={p.legs} boots={p.boots}
      apron={p.apron} apronColour={p.apronColour} scarf={p.scarf} belt={p.belt}
      pose={p.pose} backPose={p.backPose} action={p.action} age={p.age}
    />
  );
}
