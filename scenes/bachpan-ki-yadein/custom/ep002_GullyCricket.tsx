// Ep 002 – Gully cricket rules ("Jiska bat, uski pehli batting")
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { SceneProps } from "../scenes/types";
import { Adult, Ball, Bricks, Bubble, Chip, clamp, ease, Film, Gully, HouseWindow, INK, Kid, P, Stadium, Stamp, Streaks, Title } from "./byk_kit";

const FEET = 1560;
const FRIEND_A: [string, string] = ["#6FA36B", "#3F7A45"];
const FRIEND_B: [string, string] = ["#7CC4E6", "#2F5D9E"];
const FRIEND_C: [string, string] = ["#F2D49B", "#C0502E"];

// speech bubbles synced to the scene's funny kid shouts (build.mjs -> scene.kidShouts)
const KidBubbles: React.FC<{ scene: SceneProps["scene"]; spots: { x: number; y: number; tail?: "down" | "left" | "right" }[] }> = ({ scene, spots }) => {
  const { fps } = useVideoConfig();
  const shouts = (scene as unknown as { kidShouts?: { at: number; text: string; dur: number }[] }).kidShouts ?? [];
  return (
    <>
      {shouts.map((s, k) => (s.text ? <Bubble key={k} x={spots[k % spots.length].x} y={spots[k % spots.length].y} tail={spots[k % spots.length].tail} text={s.text} delay={Math.round(s.at * fps)} size={78} bg={k % 2 ? P.mustard : "#FFFFFF"} /> : null))}
    </>
  );
};

// 1. HOOK – Bittu owns the bat, so he bats first
export const GullyHook: React.FC<SceneProps> = ({ scene }) => {
  const f = useCurrentFrame();
  return (
    <Film bg="#A8DCEB">
      <Gully />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Bricks x={540} y={FEET - 40} scale={0.9} />
        <Kid x={200} y={FEET} scale={0.95} pose="idle" mouth="grr" tee={FRIEND_A} hair="spiky" look={1} />
        <Kid x={880} y={FEET} scale={0.95} pose="idle" mouth="grr" tee={FRIEND_B} hair="bowl" facing={-1} look={1} />
        <Kid x={540} y={FEET + 60} scale={1.15} pose="bat" prop="bat" swing={-20 + Math.sin(f / 6) * 10} mouth="smile" />
      </svg>
      <Title text="JISKA BAT, USKI BATTING" top={240} size={116} accent={["bat,", "batting"]} />
      <KidBubbles scene={scene} spots={[{ x: 610, y: 820 }]} />
    </Film>
  );
};

// 3. One tip, one hand – off the wall and caught
export const OneTip: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const hit = dur * 0.12, wall = dur * 0.38, catchF = dur * 0.66;
  const p1 = interpolate(f, [hit, wall], [0, 1], clamp);
  const p2 = interpolate(f, [wall, catchF], [0, 1], clamp);
  const bx = f < wall ? interpolate(p1, [0, 1], [620, 360]) : interpolate(p2, [0, 1], [360, 850]);
  const by = f < wall ? interpolate(p1, [0, 1], [1300, 760]) - Math.sin(p1 * Math.PI) * 120 : interpolate(p2, [0, 1], [760, 930]) - Math.sin(p2 * Math.PI) * 260;
  const caught = f >= catchF;
  return (
    <Film bg="#A8DCEB">
      <Gully />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Bricks x={430} y={FEET - 20} scale={0.8} />
        <Kid x={430} y={FEET + 40} scale={1.05} pose="bat" prop="bat" swing={f < hit ? -30 : interpolate(f, [hit, hit + 6], [-30, 70], clamp)} mouth={caught ? "o" : "smile"} />
        <Kid x={860} y={FEET - 40} scale={0.9} pose={caught ? "catch" : "idle"} mouth={caught ? "open" : "o"} tee={FRIEND_B} hair="bowl" facing={-1} />
        {f > hit && !caught ? <Streaks x={bx} y={by} dx={f < wall ? -260 : 490} dy={f < wall ? -540 : 170} /> : null}
        {f > hit ? <Ball x={caught ? 862 : bx} y={caught ? 1035 : by} r={30} spin={f * 25} /> : null}
        {Math.abs(f - wall) < 5 ? <circle cx={360} cy={760} r={70 - Math.abs(f - wall) * 10} fill="none" stroke={P.cream} strokeWidth={10} /> : null}
      </svg>
      <Chip x={250} y={420} text="ONE TIP" delay={Math.round(wall)} rot={-6} bg={P.cream} />
      <Chip x={790} y={560} text="ONE HAND" delay={Math.round(catchF) - 4} rot={5} bg={P.cream} />
      {caught ? <Stamp text="OUT!" x={540} y={300} delay={Math.round(catchF) + 2} /> : null}
      <KidBubbles scene={scene} spots={[{ x: 760, y: 760 }, { x: 330, y: 960 }]} />
    </Film>
  );
};

// 4. Six… straight into Sharma aunty's window
export const SixWindow: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const smash = dur * 0.42;
  const p = interpolate(f, [0, smash], [0, 1], clamp);
  const shake = f > smash ? interpolate(f - smash, [0, 3, 12], [0, 22, 0], clamp) * Math.sin(f * 3) : 0;
  const aunty = ease(f, dur * 0.62, dur * 0.8);
  return (
    <Film bg="#E8C3D3">
      <div style={{ position: "absolute", inset: 0, translate: `${shake}px 0` }}>
        <HouseWindow broken={f > smash ? 1 : 0} aunty={aunty} angry />
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {f < smash ? <Streaks x={interpolate(p, [0, 1], [160, 700])} y={interpolate(p, [0, 1], [1700, 560])} dx={540} dy={-1140} /> : null}
          {f < smash + 2 ? <Ball x={interpolate(p, [0, 1], [160, 700])} y={interpolate(p, [0, 1], [1700, 560])} r={interpolate(p, [0, 1], [70, 26])} spin={f * 30} /> : null}
        </svg>
      </div>
      <Chip x={300} y={260} text="CHHAKKA!" delay={3} rot={-6} size={64} />
      <Stamp text="CHHANNN!" x={540} y={760} delay={Math.round(smash)} color={P.teal} size={130} rot={6} />
      <KidBubbles scene={scene} spots={[{ x: 300, y: 1530 }]} />
    </Film>
  );
};

// 5. Jo maarega, wahi laayega – everyone points at Bittu, then runs
export const Bhago: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const run = dur * 0.55;
  const r = interpolate(f, [run, run + 14], [0, 1], clamp);
  return (
    <Film bg="#A8DCEB">
      <Gully />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Kid x={170 - r * 500} y={FEET} scale={0.9} pose={r > 0 ? "run" : "point"} mouth="open" tee={FRIEND_A} hair="spiky" />
        <Kid x={910 + r * 500} y={FEET} scale={0.9} pose={r > 0 ? "run" : "point"} mouth="open" tee={FRIEND_B} hair="bowl" facing={-1} />
        <Kid x={300 - r * 600} y={FEET - 260} scale={0.7} pose={r > 0 ? "run" : "point"} mouth="smile" tee={FRIEND_C} hair="side" />
        <Kid x={540} y={FEET + 60} scale={1.1} pose="bat" prop="bat" swing={10} mouth={r > 0 ? "o" : "grr"} />
        {r > 0.6 ? <path d={`M 640 ${930 + (f % 20)} q 14 22 0 34 q -14 -12 0 -34 Z`} fill="#7FD3FF" stroke={INK} strokeWidth={4} /> : null}
      </svg>
      <Chip x={540} y={330} text="JO MAAREGA…" delay={2} rot={-4} bg={P.cream} size={60} />
      <Chip x={540} y={450} text="…WAHI LAAYEGA!" delay={Math.round(dur * 0.25)} rot={3} size={60} />
      <KidBubbles scene={scene} spots={[{ x: 820, y: 760 }]} />
    </Film>
  );
};

// 6. Match always ended with one shout from Mummy
export const MummyCall: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const call = Math.round(dur * 0.45);
  return (
    <Film bg="#F2A66B">
      <Gully tint={0.18} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(242,120,80,0.35), rgba(184,92,126,0.25))" }} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <defs><clipPath id="balc"><rect x={780} y={600} width={300} height={430} /></clipPath></defs>
        <g clipPath="url(#balc)"><Adult x={950} y={1460 - ease(f, 4, 16) * 120} scale={0.7} kind="mummy" mouth={f > call ? "open" : "flat"} armR={f > call ? -150 : -20} /></g>
        <polygon points="1040,1010 850,1080 850,1110 1040,1050" fill={P.brick} stroke={INK} strokeWidth={5} />
        <Kid x={380} y={FEET + 60} scale={1.1} pose="bat" prop="bat" swing={f > call ? 80 : 0} mouth={f > call ? "o" : "smile"} />
        <Kid x={150} y={FEET} scale={0.85} pose="idle" mouth="o" tee={FRIEND_A} hair="spiky" />
      </svg>
      <Bubble x={500} y={560} text="BITTUUU! GHAR AAO!" delay={call} size={58} tail="right" bg={P.mustard} />
      <KidBubbles scene={scene} spots={[{ x: 330, y: 820 }]} />
    </Film>
  );
};

// 7. TWIST – the same tennis-ball cricket now has its own T10 league, in stadiums
export const StadiumTwist: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const swing = interpolate(f, [dur * 0.5, dur * 0.5 + 6], [-30, 80], clamp);
  const fly = interpolate(f, [dur * 0.5 + 4, dur], [0, 1], clamp);
  return (
    <Film bg="#0F1B33" grain={0.1}>
      <Stadium />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Kid x={540} y={1640} scale={0.62} pose="bat" prop="bat" swing={swing} tee={["#FFFFFF", "#2F5D9E"]} shorts="#1E2B3A" />
        {fly > 0 ? <Ball x={600 + fly * 380} y={1240 - fly * 900} r={22} spin={f * 30} /> : null}
      </svg>
      <Chip x={540} y={300} text="AAJ…" delay={2} rot={-4} bg={P.cream} />
      <Title text="STADIUM MEIN!" top={380} size={120} accent={["stadium"]} delay={Math.round(dur * 0.35)} />
      <Chip x={540} y={740} text="TENNIS BALL · T10 · SINCE 2024" delay={Math.round(dur * 0.55)} rot={2} size={44} />
    </Film>
  );
};

// 8. Mumbai team owner + the MVP prize (text only – never draw real people)
export const OwnerReveal: React.FC<SceneProps> = ({ dur }) => {
  const reveal = Math.round(dur * 0.12);
  const car = Math.round(dur * 0.58);
  return (
    <Film bg="#0F1B33" grain={0.1}>
      <Stadium />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,27,51,0.45)" }} />
      <Chip x={540} y={330} text="MUMBAI TEAM KE MAALIK" delay={0} rot={-2} bg={P.cream} size={46} />
      <Title text="AMITABH BACHCHAN" top={430} size={124} accent={["bachchan"]} delay={reveal} />
      <Chip x={540} y={780} text="IS SAAL MVP KO MILI:" delay={car - 8} rot={2} bg={P.cream} size={46} />
      <Stamp text="PORSCHE 911" x={540} y={1010} delay={car} color={P.stripeA} size={118} rot={-4} />
      <Chip x={540} y={1180} text="ISPL SEASON 3 · 2026" delay={car + 10} rot={3} size={40} bg={P.mustard} />
    </Film>
  );
};
