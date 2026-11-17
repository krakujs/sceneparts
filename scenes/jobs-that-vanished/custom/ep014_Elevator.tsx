import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, typeFont, titleFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep014 – Lift Operator. Bright Art Deco elevator car (day look) + robotaxi back-seat view.
// visual: { mode?: "car"|"robotaxi", operator?: bool, opOut?: 0-1, speed?: px/frame, passenger?: "none"|"calm"|"nervous"|"inout",
//           stopButton?: bool, speaker?: bool, lever?: "drive"|"level", headline?, accent?, top?, size?, tag?, tagY?, float?: string[], floatTop? }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const BRASS = "#C9A04A";
const BRASS_D = "#8E6B26";
const WOOD = "#8C5A2B";
const WOOD_L = "#A8703A";
const SKIN = "#E8B990";
const BAND = 360; // px between floors in the shaft

const Chips: React.FC<{ items: string[]; dur: number; top: number }> = ({ items, dur, top }) => {
  const f = useCurrentFrame();
  return (
    <>
      {items.map((t, i) => {
        const at = 10 + i * Math.max(22, (dur - 24) / Math.max(1, items.length));
        const age = f - at;
        if (age < 0) return null;
        return (
          <div key={i} style={{ position: "absolute", ...(i % 2 === 0 ? { left: 90 } : { right: 170 }), top: top + (i % 2) * 110 - Math.min(age, 30) * 1.5, fontFamily: typeFont, fontSize: 46, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 20px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", opacity: interpolate(age, [0, 6], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
            {t}
          </div>
        );
      })}
    </>
  );
};

const Operator: React.FC<{ ox: number; hand: { x: number; y: number }; f: number }> = ({ ox, hand, f }) => {
  const bob = Math.sin(f / 18) * 2;
  return (
    <g transform={`translate(0, ${bob})`}>
      {/* legs + shoes */}
      <rect x={ox - 44} y={1300} width={36} height={270} fill={C.navy} stroke={INK} strokeWidth={6} />
      <rect x={ox + 8} y={1300} width={36} height={270} fill={C.navy} stroke={INK} strokeWidth={6} />
      <ellipse cx={ox - 30} cy={1576} rx={34} ry={14} fill={INK} />
      <ellipse cx={ox + 30} cy={1576} rx={34} ry={14} fill={INK} />
      {/* jacket */}
      <path d={`M ${ox - 78} 968 Q ${ox} 940 ${ox + 78} 968 L ${ox + 92} 1320 L ${ox - 92} 1320 Z`} fill={C.brickDark} stroke={INK} strokeWidth={8} />
      <path d={`M ${ox - 22} 950 L ${ox} 1010 L ${ox + 22} 950`} fill={C.cream} stroke={INK} strokeWidth={5} />
      {[1030, 1090, 1150, 1210, 1270].map((y) => (
        <circle key={y} cx={ox} cy={y} r={9} fill={BRASS} stroke={INK} strokeWidth={3} />
      ))}
      <rect x={ox - 96} y={958} width={44} height={16} rx={6} fill={BRASS} stroke={INK} strokeWidth={4} />
      <rect x={ox + 52} y={958} width={44} height={16} rx={6} fill={BRASS} stroke={INK} strokeWidth={4} />
      {/* resting arm */}
      <line x1={ox + 74} y1={990} x2={ox + 92} y2={1200} stroke={INK} strokeWidth={40} strokeLinecap="round" />
      <line x1={ox + 74} y1={990} x2={ox + 92} y2={1200} stroke={C.brickDark} strokeWidth={28} strokeLinecap="round" />
      <circle cx={ox + 94} cy={1214} r={21} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      {/* head + cap */}
      <rect x={ox - 22} y={905} width={44} height={44} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={ox} cy={862} r={60} fill={SKIN} stroke={INK} strokeWidth={8} />
      <circle cx={ox - 20} cy={858} r={7} fill={INK} />
      <circle cx={ox + 20} cy={858} r={7} fill={INK} />
      <path d={`M ${ox - 20} 888 Q ${ox} 904 ${ox + 20} 888`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d={`M ${ox - 66} 822 L ${ox - 58} 776 Q ${ox} 756 ${ox + 58} 776 L ${ox + 66} 822 Z`} fill={C.brickDark} stroke={INK} strokeWidth={7} />
      <path d={`M ${ox - 74} 822 Q ${ox - 30} 846 ${ox + 4} 832 L ${ox + 70} 822 Z`} fill={INK} />
      <rect x={ox - 60} y={806} width={120} height={12} fill={BRASS} />
      {/* working arm to the lever (white glove) */}
      <line x1={ox - 74} y1={990} x2={hand.x} y2={hand.y} stroke={INK} strokeWidth={40} strokeLinecap="round" />
      <line x1={ox - 74} y1={990} x2={hand.x} y2={hand.y} stroke={C.brickDark} strokeWidth={28} strokeLinecap="round" />
      <circle cx={hand.x} cy={hand.y} r={23} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    </g>
  );
};

const Passenger: React.FC<{ x: number; f: number; nervous: boolean; facing: number; look: number; walking: boolean }> = ({ x, f, nervous, facing, look, walking }) => {
  const shake = nervous ? Math.sin(f * 1.7) * 3 : 0;
  const bob = walking ? Math.abs(Math.sin(f / 4)) * -10 : 0;
  const step = walking ? Math.sin(f / 4) * 16 : 0;
  return (
    <g transform={`translate(${x + shake}, ${bob})`}>
      <rect x={-40 + step} y={1300} width={34} height={270} fill="#3A3A44" stroke={INK} strokeWidth={6} />
      <rect x={6 - step} y={1300} width={34} height={270} fill="#3A3A44" stroke={INK} strokeWidth={6} />
      <ellipse cx={-24 + step} cy={1576} rx={32} ry={13} fill={INK} />
      <ellipse cx={24 - step} cy={1576} rx={32} ry={13} fill={INK} />
      <path d="M -80 975 Q 0 950 80 975 L 96 1330 L -96 1330 Z" fill="#6E7F8C" stroke={INK} strokeWidth={8} />
      <path d="M -18 958 L 0 1040 L 18 958" fill={C.brick} stroke={INK} strokeWidth={5} />
      {/* briefcase */}
      <line x1={78 * facing} y1={995} x2={96 * facing} y2={1250} stroke={INK} strokeWidth={36} strokeLinecap="round" />
      <line x1={78 * facing} y1={995} x2={96 * facing} y2={1250} stroke="#6E7F8C" strokeWidth={24} strokeLinecap="round" />
      <rect x={96 * facing - 50} y={1262} width={100} height={74} rx={10} fill="#6B4226" stroke={INK} strokeWidth={6} />
      <rect x={-22} y={910} width={44} height={44} fill={SKIN} stroke={INK} strokeWidth={6} />
      <circle cx={0} cy={866} r={60} fill={SKIN} stroke={INK} strokeWidth={8} />
      <circle cx={-20 + look * 12} cy={862} r={nervous ? 9 : 7} fill="#FFFFFF" stroke={INK} strokeWidth={nervous ? 4 : 0} />
      <circle cx={20 + look * 12} cy={862} r={nervous ? 9 : 7} fill="#FFFFFF" stroke={INK} strokeWidth={nervous ? 4 : 0} />
      <circle cx={-20 + look * 15} cy={862} r={5} fill={INK} />
      <circle cx={20 + look * 15} cy={862} r={5} fill={INK} />
      {nervous ? <path d="M -18 898 Q -9 890 0 898 Q 9 906 18 898" fill="none" stroke={INK} strokeWidth={5} /> : <path d="M -16 894 Q 0 906 16 894" fill="none" stroke={INK} strokeWidth={5} />}
      {/* fedora */}
      <path d="M -54 818 Q -50 760 0 756 Q 50 760 54 818 Z" fill="#4A3A2A" stroke={INK} strokeWidth={7} />
      <ellipse cx={0} cy={820} rx={88} ry={16} fill="#4A3A2A" stroke={INK} strokeWidth={7} />
      <rect x={-52} y={798} width={104} height={12} fill={C.brickDark} />
      {nervous
        ? [0, 1, 2].map((k) => {
            const a = ((f + k * 11) % 33) / 33;
            return <path key={k} d={`M ${62 + k * 8} ${830 + a * 70} q 9 14 0 22 q -9 -8 0 -22 Z`} fill="#9FD3F0" stroke={INK} strokeWidth={3} opacity={1 - a} />;
          })
        : null}
    </g>
  );
};

const Car: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const speed = v.speed ?? 0;
  const travel = f * speed;
  const hasOp = v.operator !== false;
  const opAlpha = hasOp ? (v.opOut != null ? interpolate(f, [v.opOut * dur, v.opOut * dur + 8], [1, 0], clamp) : 1) : 0;
  // lever: "drive" swings up and back, "level" nudges to a stop
  const lv = v.lever ?? (speed ? "drive" : "level");
  const ang = lv === "drive" ? -38 + Math.sin(f / 22) * 6 : interpolate(f, [0, dur * 0.45, dur * 0.6], [-30, 8, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const piv = { x: 175, y: 1120 };
  const rad = ((ang - 90) * Math.PI) / 180;
  const knob = { x: piv.x + Math.cos(rad) * 120, y: piv.y + Math.sin(rad) * 120 };
  // floor dial needle (floors 1–10 on a half circle)
  const floor = (travel / BAND) % 8;
  const needle = (-180 + 13 + floor * 22) * (Math.PI / 180);
  // passenger
  const pm = v.passenger ?? "none";
  let px = 650;
  let facing = -1;
  let walking = false;
  let look = 0;
  if (pm === "inout") {
    const a = interpolate(f, [0, dur * 0.25], [1150, 640], { ...clamp, easing: Easing.out(Easing.cubic) });
    const b = interpolate(f, [dur * 0.68, dur * 0.95], [0, 520], { ...clamp, easing: Easing.in(Easing.cubic) });
    px = a + b;
    walking = f < dur * 0.25 || f > dur * 0.68;
    facing = f > dur * 0.68 ? 1 : -1;
    look = f > dur * 0.28 && f < dur * 0.66 ? Math.sin(f / 7) : 0;
  } else if (pm === "nervous") {
    look = Math.sin(f / 6);
  }
  const pulse = 0.5 + 0.5 * Math.sin(f / 4);
  const shaftLevel = v.lever === "level" ? interpolate(f, [0, dur * 0.6], [140, 0], { ...clamp, easing: Easing.out(Easing.cubic) }) : 0;
  const float: string[] = v.float ?? [];

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #F4EAD5 0%, #EAD9B4 30%, #E2CC9C 100%)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {/* Art Deco lobby wall above the car: sunburst */}
        {new Array(13).fill(0).map((_, i) => {
          const a = Math.PI + (i / 12) * Math.PI;
          return <line key={i} x1={540} y1={540} x2={540 + Math.cos(a) * 640} y2={540 + Math.sin(a) * 640} stroke={BRASS} strokeWidth={10} opacity={0.35} />;
        })}
        {/* car shell */}
        <rect x={70} y={540} width={940} height={1080} rx={10} fill={WOOD} stroke={INK} strokeWidth={10} />
        {/* back wall panels */}
        {[110, 330, 550].map((x) => (
          <rect key={x} x={x} y={780} width={190} height={360} rx={8} fill={WOOD_L} stroke={INK} strokeWidth={5} />
        ))}
        {[110, 330, 550].map((x) => (
          <rect key={`b${x}`} x={x} y={1210} width={190} height={330} rx={8} fill={WOOD_L} stroke={INK} strokeWidth={5} />
        ))}
        <rect x={80} y={1170} width={700} height={18} fill={BRASS} stroke={INK} strokeWidth={4} />
        {/* ceiling lamp */}
        <path d="M 360 560 L 720 560 L 660 610 L 420 610 Z" fill={C.glow} stroke={INK} strokeWidth={6} />
        <ellipse cx={540} cy={640} rx={260} ry={50} fill={C.glow} opacity={0.18} />
        {/* floor dial */}
        <g transform="translate(455, 760)">
          <path d="M -150 0 A 150 150 0 0 1 150 0 Z" fill={BRASS} stroke={INK} strokeWidth={7} />
          <path d="M -128 0 A 128 128 0 0 1 128 0 Z" fill={C.cream} stroke={INK} strokeWidth={4} />
          {new Array(8).fill(0).map((_, i) => {
            const a = (-180 + 13 + i * 22) * (Math.PI / 180);
            return (
              <text key={i} x={Math.cos(a) * 104} y={Math.sin(a) * 104 + 10} textAnchor="middle" fontSize={28} fontFamily={titleFont} fill={INK}>
                {i + 1}
              </text>
            );
          })}
          <line x1={0} y1={0} x2={Math.cos(needle) * 82} y2={Math.sin(needle) * 82} stroke={C.brick} strokeWidth={8} strokeLinecap="round" />
          <circle cx={0} cy={0} r={12} fill={INK} />
        </g>
        {/* speaker grille (recorded voice) */}
        {v.speaker ? (
          <g transform="translate(690, 760)">
            {[0, 1, 2].map((k) => {
              const a = ((f + k * 10) % 30) / 30;
              return <circle key={k} cx={0} cy={0} r={60 + a * 90} fill="none" stroke={C.teal} strokeWidth={8} opacity={1 - a} />;
            })}
            <circle cx={0} cy={0} r={62} fill={BRASS} stroke={INK} strokeWidth={7} />
            {[-30, -10, 10, 30].map((y) => (
              <line key={y} x1={-40} y1={y} x2={40} y2={y} stroke={INK} strokeWidth={6} strokeLinecap="round" />
            ))}
          </g>
        ) : null}
        {/* shaft through the gate (floors slide past) */}
        <rect x={800} y={560} width={190} height={1040} fill="#3A2C24" />
        <defs>
          <clipPath id="shaft14"><rect x={800} y={560} width={190} height={1040} /></clipPath>
        </defs>
        <g clipPath="url(#shaft14)">
          {new Array(5).fill(0).map((_, k) => {
            const y = 560 - BAND + ((k * BAND + travel + shaftLevel + 304) % (BAND * 5));
            const n = Math.floor((k * BAND + travel) / BAND) % 10;
            return (
              <g key={k}>
                <rect x={800} y={y} width={190} height={34} fill="#1B1410" />
                <text x={895} y={y - 30} textAnchor="middle" fontSize={44} fontFamily={titleFont} fill={C.mustard} opacity={0.8}>{n + 1}</text>
              </g>
            );
          })}
        </g>
        {/* accordion gate */}
        <rect x={800} y={560} width={190} height={1040} fill="none" stroke={INK} strokeWidth={8} />
        {new Array(5).fill(0).map((_, i) => {
          const x = 800 + i * 47.5;
          return (
            <g key={i}>
              <line x1={x} y1={560} x2={x + 47.5} y2={1600} stroke={BRASS_D} strokeWidth={7} />
              <line x1={x + 47.5} y1={560} x2={x} y2={1600} stroke={BRASS_D} strokeWidth={7} />
              <line x1={x} y1={560} x2={x} y2={1600} stroke={BRASS} strokeWidth={9} />
            </g>
          );
        })}
        {/* car floor */}
        <rect x={70} y={1584} width={940} height={40} fill={C.brick} stroke={INK} strokeWidth={6} />
        {/* lever controller OR self-service button panel */}
        {opAlpha > 0 ? (
          <g opacity={opAlpha}>
            <path d={`M ${piv.x - 95} ${piv.y} A 95 95 0 0 1 ${piv.x + 95} ${piv.y} Z`} fill={BRASS} stroke={INK} strokeWidth={7} />
            <line x1={piv.x} y1={piv.y} x2={knob.x} y2={knob.y} stroke={INK} strokeWidth={14} strokeLinecap="round" />
            <circle cx={knob.x} cy={knob.y} r={20} fill={INK} />
            <circle cx={piv.x} cy={piv.y} r={14} fill={INK} />
            <Operator ox={330} hand={{ x: knob.x + 6, y: knob.y + 4 }} f={f} />
          </g>
        ) : null}
        {v.stopButton ? (
          <g>
            <rect x={110} y={880} width={180} height={420} rx={14} fill={BRASS} stroke={INK} strokeWidth={7} />
            {new Array(8).fill(0).map((_, i) => (
              <g key={i}>
                <circle cx={160 + (i % 2) * 80} cy={930 + Math.floor(i / 2) * 62} r={22} fill={C.cream} stroke={INK} strokeWidth={5} />
                <text x={160 + (i % 2) * 80} y={940 + Math.floor(i / 2) * 62} textAnchor="middle" fontSize={24} fontFamily={titleFont} fill={INK}>{i + 1}</text>
              </g>
            ))}
            <circle cx={200} cy={1215} r={58 + pulse * 22} fill={C.brick} opacity={0.25} />
            <circle cx={200} cy={1215} r={52} fill="#D93A2B" stroke={INK} strokeWidth={8} />
            <text x={200} y={1228} textAnchor="middle" fontSize={34} fontFamily={titleFont} fill={C.cream}>STOP</text>
          </g>
        ) : null}
        {pm !== "none" ? <Passenger x={px} f={f} nervous={pm === "nervous" || (pm === "inout" && f > dur * 0.3)} facing={facing} look={look} walking={walking} /> : null}
      </svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 230} size={v.size ?? 100} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 520} /> : null}
      <Chips items={float} dur={dur} top={v.floatTop ?? 1060} />
    </Backdrop>
  );
};

const Robotaxi: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const wheel = Math.sin(f / 16) * 22 + Math.sin(f / 7) * 5;
  const float: string[] = v.float ?? [];
  const glowA = 0.5 + 0.5 * Math.sin(f / 5);
  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {/* view through the windshield */}
        <rect x={0} y={0} width={1080} height={1000} fill="#9CC9E0" />
        {[60, 180, 330, 700, 820, 960].map((x, i) => (
          <rect key={x} x={x} y={560 - (i % 3) * 70} width={110} height={240 + (i % 3) * 70} fill={i % 2 ? "#7D8CA0" : "#66748A"} stroke={INK} strokeWidth={5} />
        ))}
        <path d="M 0 800 L 1080 800 L 1080 1000 L 0 1000 Z" fill="#5E6170" />
        <path d="M 470 800 L 610 800 L 1000 1000 L 80 1000 Z" fill="#4A4D5A" />
        {new Array(5).fill(0).map((_, k) => {
          const t = ((f / 22 + k / 5) % 1);
          const y = 800 + t * t * 200;
          const h = 6 + t * 40;
          return <rect key={k} x={540 - (4 + t * 14)} y={y} width={8 + t * 28} height={h} fill={C.cream} />;
        })}
        {/* windshield frame + dashboard */}
        <path d="M 0 300 Q 540 230 1080 300 L 1080 340 Q 540 270 0 340 Z" fill={C.stoneDark} stroke={INK} strokeWidth={6} />
        <path d="M 0 960 Q 540 900 1080 960 L 1080 1110 L 0 1110 Z" fill={C.stoneDark} stroke={INK} strokeWidth={8} />
        <rect x={470} y={950} width={200} height={110} rx={14} fill={C.modernA} stroke={INK} strokeWidth={6} />
        <path d={`M 490 1040 Q 540 ${990 + Math.sin(f / 10) * 10} 590 1005 T 650 970`} fill="none" stroke={C.teal} strokeWidth={8} strokeLinecap="round" />
        <circle cx={650} cy={970} r={10} fill={C.mustard} />
        {/* steering wheel turning by itself */}
        <g transform={`translate(300, 1000) rotate(${wheel})`}>
          <circle cx={0} cy={0} r={150} fill="none" stroke={INK} strokeWidth={40} />
          <circle cx={0} cy={0} r={150} fill="none" stroke="#3A3D48" strokeWidth={26} />
          <line x1={-140} y1={10} x2={140} y2={10} stroke="#3A3D48" strokeWidth={26} />
          <circle cx={0} cy={10} r={46} fill="#3A3D48" stroke={INK} strokeWidth={6} />
        </g>
        {/* empty front seats */}
        {[300, 790].map((sx, i) => (
          <g key={sx}>
            <rect x={sx - 150} y={1260} width={300} height={440} rx={60} fill={i ? "#59473A" : "#6B5544"} stroke={INK} strokeWidth={9} />
            <rect x={sx - 85} y={1170} width={170} height={110} rx={36} fill={i ? "#59473A" : "#6B5544"} stroke={INK} strokeWidth={8} />
            <rect x={sx - 100} y={1320} width={200} height={300} rx={40} fill="none" stroke="#3F3027" strokeWidth={6} />
          </g>
        ))}
        {/* "nobody" ghost outline over the driver's seat */}
        <g opacity={0.25 + 0.35 * glowA}>
          <circle cx={300} cy={1010} r={62} fill="none" stroke={C.glow} strokeWidth={6} strokeDasharray="14 12" />
          <path d="M 200 1160 Q 300 1080 400 1160" fill="none" stroke={C.glow} strokeWidth={6} strokeDasharray="14 12" />
        </g>
      </svg>
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? []} top={v.top ?? 380} size={v.size ?? 96} /> : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 420} /> : null}
      <Chips items={float} dur={dur} top={v.floatTop ?? 1060} />
    </Backdrop>
  );
};

export const Elevator: React.FC<SceneProps> = (p) => (p.scene.visual.mode === "robotaxi" ? <Robotaxi {...p} /> : <Car {...p} />);
