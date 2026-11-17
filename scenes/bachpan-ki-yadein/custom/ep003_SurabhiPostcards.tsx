// Ep 003 – Surabhi postcards ("Pandrah paise ka postcard… aur poore ghar ka ek jawab!")
// Generic illustration only: no show logo, hosts, India Post emblem or real postcard design.
import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import type { SceneProps } from "../scenes/types";
import { Adult, Bubble, Chip, clamp, CRT, ease, Film, Gully, INK, Kid, LetterBox, P, Pen, pop, Postcard, Room, SofaBacks, Stamp, Title } from "./byk_kit";
import { titleFont } from "../theme";

const KidBubbles: React.FC<{ scene: SceneProps["scene"]; spots: { x: number; y: number; tail?: "down" | "left" | "right" }[] }> = ({ scene, spots }) => {
  const { fps } = useVideoConfig();
  const shouts = (scene as unknown as { kidShouts?: { at: number; text: string; dur: number }[] }).kidShouts ?? [];
  return (
    <>
      {shouts.map((s, k) => (s.text ? <Bubble key={k} x={spots[k % spots.length].x} y={spots[k % spots.length].y} tail={spots[k % spots.length].tail} text={s.text} delay={Math.round(s.at * fps)} size={84} bg={P.mustard} /> : null))}
    </>
  );
};
const firstShout = (scene: SceneProps["scene"], fps: number, fallback: number) => {
  const shouts = (scene as unknown as { kidShouts?: { at: number }[] }).kidShouts ?? [];
  return shouts.length ? Math.round(shouts[0].at * fps) : fallback;
};

// 1. HOOK – the 15-paise postcard spins in, Bittu ready with the pen
export const PostcardHook: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const s = pop(f, 12);
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <g transform={`translate(540 800) scale(${0.3 + 0.7 * s}) rotate(${interpolate(f, [0, 12], [-200, 0], clamp)}) translate(-540 -800)`}>
          <Postcard x={540} y={800} w={700} rot={-5 + Math.sin(f / 10) * 2} writ={interpolate(f, [dur * 0.35, dur], [0, 0.6], clamp)} />
        </g>
        <Kid x={880} y={1680} scale={0.85} pose="wave" mouth="smile" look={-1} />
        <Pen x={1010} y={1180 + Math.sin(f / 4) * 14} rot={200} scale={0.8} />
      </svg>
      <Title text="15 PAISE KA JAWAB" top={230} size={124} accent={["15", "paise"]} />
      <Chip x={300} y={1120} text="POORA GHAR" delay={Math.round(dur * 0.45)} rot={-5} bg={P.cream} size={58} />
    </Film>
  );
};

// 2. Surabhi's weekly question on the TV – the family turns quiz team
export const QuizTv: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const q = pop(f - 6, 10);
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <CRT x={540} y={700} w={640} screen="clear" seed="quiz" />
        <text x={470} y={790} textAnchor="middle" fontFamily={titleFont} fontSize={260 * q} fill={P.brick} stroke={INK} strokeWidth={10} paintOrder="stroke">?</text>
      </svg>
      <SofaBacks y={1560} lean={Math.sin(f / 6)} />
      <Chip x={600} y={300} text="HAR HAFTE EK SAWAAL" delay={4} rot={4} bg={P.cream} size={48} />
      <Chip x={300} y={1110} text="QUIZ SHURU!" delay={Math.round(dur * 0.5)} rot={-5} size={60} />
    </Film>
  );
};

// 3. Papa vs Mummy on the answer – Bittu pops up with his own
export const GharBahas: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kidAt = firstShout(scene, fps, Math.round(dur * 0.75));
  const up = ease(f, kidAt - 8, kidAt);
  const papaOn = Math.round(dur * 0.06), mummyOn = Math.round(dur * 0.3);
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Adult x={240} y={1660} scale={0.82} kind="papa" mouth={f > papaOn && f < mummyOn ? "open" : "flat"} armR={f > papaOn ? -120 + Math.sin(f / 3) * 10 : -20} />
        <Adult x={840} y={1660} scale={0.82} kind="mummy" facing={-1} mouth={f > mummyOn && f < kidAt ? "open" : "flat"} armR={f > mummyOn ? -120 + Math.sin(f / 3 + 1) * 10 : -20} />
        <Kid x={540} y={1960 - up * 300} scale={0.9} pose={up > 0.5 ? "cheer" : "idle"} mouth="open" />
      </svg>
      <Bubble x={330} y={520} text="RAJASTHAN!" delay={papaOn} size={72} tail="down" />
      <Bubble x={760} y={720} text="GUJARAT!" delay={mummyOn} size={72} tail="down" bg={P.cream} />
      <KidBubbles scene={scene} spots={[{ x: 540, y: 960 }]} />
    </Film>
  );
};

// 4. The best handwriting fills it in… one blot and the card is gone
export const NeatWriting: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const W = 900, H = W * 0.62, CX = 540, CY = 740;
  const writ = interpolate(f, [4, dur * 0.58], [0, 0.92], clamp);
  const blotAt = Math.round(dur * 0.62);
  const line = Math.min(5, Math.floor(writ * 6));
  const frac = writ * 6 - line;
  const penX = CX - W / 2 + W * 0.06 + W * 0.4 * Math.min(1, frac);
  const penY = CY - H / 2 + H * (0.28 + line * 0.11);
  const shake = f > blotAt ? interpolate(f - blotAt, [0, 3, 12], [0, 18, 0], clamp) * Math.sin(f * 3) : 0;
  return (
    <Film bg={P.wood}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {new Array(10).fill(0).map((_, k) => <line key={k} x1={0} y1={160 + k * 180} x2={1080} y2={130 + k * 180} stroke={P.woodDark} strokeWidth={6} opacity={0.35} />)}
        <g transform={`translate(${shake} 0)`}>
          <Postcard x={CX} y={CY} w={W} rot={0} writ={writ} blot={f > blotAt ? pop(f - blotAt, 6) : 0} seed="neat" />
        </g>
        {f < blotAt ? <Pen x={penX + Math.sin(f * 1.7) * 6} y={penY - 4} rot={-30} scale={1.1} /> : <Pen x={penX + 40} y={penY + 30} rot={-75} scale={1.1} />}
      </svg>
      <Chip x={540} y={290} text="SABSE ACCHI HANDWRITING" delay={2} rot={-3} bg={P.cream} size={50} />
      <Stamp text="BEKAAR!" x={540} y={1120} delay={blotAt + 4} color={P.stripeA} size={150} rot={-8} />
    </Film>
  );
};

// 5. Into the red letterbox… then the weekly wait
export const LetterBoxWait: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const drop = interpolate(f, [4, dur * 0.25], [0, 1], clamp);
  const w1 = Math.round(dur * 0.42), w2 = Math.round(dur * 0.52), w3 = Math.round(dur * 0.62);
  return (
    <Film bg="#A8DCEB">
      <Gully />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <LetterBox x={700} y={1620} scale={1} />
        <Kid x={360} y={1500 - Math.abs(Math.sin(f / 5)) * 20 * (drop < 1 ? 1 : 0)} scale={0.85} pose={drop < 1 ? "point" : "idle"} mouth={f > w3 ? "smile" : "o"} look={1} />
        {drop < 1 ? <Postcard x={interpolate(drop, [0, 1], [570, 700])} y={interpolate(drop, [0, 1], [1170, 1065])} w={interpolate(drop, [0, 1], [220, 150])} rot={interpolate(drop, [0, 1], [-20, 0])} /> : null}
      </svg>
      <Chip x={250} y={300} text="HAFTA 1" delay={w1} rot={-6} bg={P.cream} size={52} />
      <Chip x={540} y={380} text="HAFTA 2" delay={w2} rot={4} bg={P.cream} size={52} />
      <Chip x={830} y={300} text="HAFTA 3" delay={w3} rot={-3} bg={P.cream} size={52} />
      <Bubble x={400} y={620} text="PAKKA SAHI HAI!" delay={Math.round(dur * 0.72)} size={70} tail="down" bg={P.mustard} />
    </Film>
  );
};

// 6. TWIST – one week, 14 lakh+ postcards: rain, mountain, counter
const indian = (n: number) => {
  const s = String(Math.round(n));
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
};
export const PostcardFlood: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const c0 = dur * 0.3, c1 = dur * 0.62;
  const n = interpolate(f, [c0, c1], [0, 1400000], clamp);
  const done = f >= c1;
  const pile = ease(f, 0, dur * 0.8);
  const cards = new Array(40).fill(0).map((_, i) => ({
    t: random(`t${i}`) * dur * 0.75, x: 60 + random(`x${i}`) * 960, land: 1020 + random(`l${i}`) * 200 + (1 - pile) * 200, rot: (random(`r${i}`) - 0.5) * 70,
  }));
  return (
    <Film bg="#1E3A4A" grain={0.1}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <path d={`M -40 1920 L -40 ${1260 - pile * 160} Q 540 ${1140 - pile * 260} 1120 ${1260 - pile * 160} L 1120 1920 Z`} fill="#E9CF92" stroke={INK} strokeWidth={6} />
        {new Array(16).fill(0).map((_, k) => (
          <rect key={k} x={40 + k * 64} y={1240 - pile * 150 + Math.sin(k * 1.7) * 30} width={90} height={56} rx={4} fill="#F3DDA6" stroke={INK} strokeWidth={4} transform={`rotate(${Math.sin(k * 2.3) * 25} ${85 + k * 64} ${1268 - pile * 150})`} />
        ))}
        {cards.map((c, i) => {
          if (f < c.t) return null;
          const y = Math.min(c.land, -150 + (f - c.t) * 70);
          return <Postcard key={i} x={c.x + Math.sin((f - c.t) / 6 + i) * 20 * (y < c.land ? 1 : 0)} y={y} w={170} rot={c.rot + (y < c.land ? Math.sin(f / 5 + i) * 20 : 0)} stamp="15 P" title="" />;
        })}
      </svg>
      <Chip x={540} y={270} text="SIRF EK HAFTE MEIN" delay={0} rot={-3} bg={P.cream} size={54} />
      <div style={{ position: "absolute", top: 380, left: 0, right: 0, textAlign: "center", fontFamily: titleFont, fontSize: done ? 168 : 150, color: P.mustard, WebkitTextStroke: `16px ${INK}`, paintOrder: "stroke fill", textShadow: "0 14px 0 rgba(0,0,0,0.45)", opacity: f >= c0 - 4 ? 1 : 0 }}>
        {indian(n)}{done ? "+" : ""}
      </div>
      <Chip x={540} y={660} text="POSTCARDS!" delay={Math.round(c1)} rot={3} size={64} />
    </Film>
  );
};

// 7. National record + the new Rs 2 Competition Postcard next to the old 15 P card
export const CompetitionCard: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  const slide = ease(f, dur * 0.38, dur * 0.52);
  return (
    <Film bg="#F2C48A">
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Postcard x={290} y={860} w={420} rot={-7} writ={0.8} seed="old" />
        <g transform={`translate(${(1 - slide) * 700} 0)`}>
          <Postcard x={790} y={860} w={420} rot={5} stamp="Rs 2" title="COMPETITION" color="#F6C9B4" />
        </g>
        {slide > 0.9 ? <path d="M 470 1090 Q 540 1150 610 1090" stroke={INK} strokeWidth={8} fill="none" markerEnd="" /> : null}
      </svg>
      <Stamp text="NATIONAL RECORD" x={540} y={400} delay={Math.round(dur * 0.06)} color={P.teal} size={76} rot={-5} />
      <Chip x={540} y={1130} text="AISE QUIZZES KE LIYE" delay={Math.round(dur * 0.45)} rot={-2} bg={P.cream} size={50} />
      <Chip x={790} y={610} text="NAYA!" delay={Math.round(dur * 0.55)} rot={8} size={54} />
    </Film>
  );
};

// 8. LOOP – "Is hafte ka jawab? Pen uthao…" (flows back into the hook)
export const PenLoop: React.FC<SceneProps> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Postcard x={300} y={820} w={440} rot={-8 + Math.sin(f / 8) * 3} />
        <Kid x={740} y={1600} scale={0.95} pose="wave" mouth="smile" look={-1} />
        <Pen x={880 + Math.sin(f / 4) * 17} y={880} rot={180} scale={0.9} />
      </svg>
      <Title text="IS HAFTE KA JAWAB?" top={240} size={112} accent={["jawab"]} />
      <Chip x={300} y={1100} text="PEN UTHAO!" delay={Math.round(dur * 0.45)} rot={-5} size={58} />
    </Film>
  );
};
