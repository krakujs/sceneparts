// Ep 001 – Antenna on the roof ("Aaya? Ab aaya?")
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { SceneProps } from "../scenes/types";
import { Adult, Bubble, Chip, clamp, CRT, Crow, duskBg, ease, Film, INK, Kid, Mumty, P, Phone, Room, Rooftops, Sky, SofaBacks, Title, Yagi } from "./byk_kit";

const FLOOR = 1180;

// 1. HOOK – Bittu twists the antenna on the roof, Papa shouts back from the stair door
export const AntennaHook: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  const ang = 25 + Math.sin(f / 5) * 38;
  return (
    <Film bg={duskBg}>
      <Sky sunY={800} />
      <Rooftops floorY={FLOOR} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <defs><clipPath id="door"><rect x={120} y={FLOOR - 330} width={150} height={330} /></clipPath></defs>
        <Mumty x={40} floorY={FLOOR}>
          <g clipPath="url(#door)">
            <Adult x={195} y={FLOOR + 300 - ease(f, 20, 34) * 120} scale={0.62} kind="papa" mouth={f > 40 ? "open" : "flat"} />
          </g>
        </Mumty>
        <Yagi x={560} baseY={FLOOR + 20} height={700} angle={ang} />
        <Kid x={700} y={FLOOR + 20} scale={0.95} pose="grip" facing={-1} mouth="open" />
      </svg>
      <Title text="AAYA? AB AAYA?" top={235} size={128} accent={["aaya"]} />
      <Bubble x={830} y={600} text="AAYA??" delay={8} size={84} />
      <Bubble x={250} y={760} text="NAHI!" delay={42} size={84} bg={P.mustard} />
    </Film>
  );
};

// 2. Downstairs: TV full of "jhilmil", Mummy calls out
export const TvSnow: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={250} y={1060} width={580} height={70} fill={P.woodDark} stroke={INK} strokeWidth={7} />
        <g transform={`translate(${Math.sin(f) * 2} 0)`}><CRT x={540} y={830} w={620} screen="snow" seed="s2" /></g>
        <SofaBacks y={1720} lean={Math.sin(f / 8)} />
      </svg>
      <Chip x={540} y={470} text="JHILMIL…" delay={6} rot={-4} />
      <Bubble x={300} y={1110} text="THODA LEFT!" delay={48} size={64} />
    </Film>
  );
};

// 3. Thoda left, thoda right… bas, bas!
export const AntennaTurn: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  const ang = f < 26 ? interpolate(f, [0, 26], [10, -45], clamp) : f < 55 ? interpolate(f, [26, 55], [-45, 55], clamp) : interpolate(f, [55, 75], [55, 20], clamp);
  const got = f > 72;
  return (
    <Film bg={duskBg}>
      <Sky sunY={900} kites={false} />
      <Rooftops floorY={1400} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Yagi x={560} baseY={1420} height={640} angle={ang} scale={1.25} />
        <Kid x={440} y={1430} scale={0.9} pose="grip" mouth={got ? "smile" : "o"} />
        <CRT x={250} y={410} w={300} screen={got ? "clear" : "snow"} seed="s3" />
      </svg>
      <Chip x={760} y={330} text="← THODA LEFT" delay={4} rot={-5} bg={P.cream} />
      <Chip x={760} y={450} text="THODA RIGHT →" delay={30} rot={4} bg={P.cream} />
      <Chip x={760} y={580} text="BAS! BAS!" delay={66} rot={-3} bg={P.stripeA} color={P.cream} size={66} />
    </Film>
  );
};

// 4. A crow lands on it… signal gone
export const CrowSignal: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  const land = ease(f, 0, 30);
  const tilt = interpolate(f, [34, 46], [0, 24], clamp) + (f > 46 ? Math.sin(f / 3) * 2 : 0);
  const bad = f > 42;
  return (
    <Film bg={duskBg}>
      <Sky sunY={950} kites={false} />
      <Rooftops floorY={1250} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Yagi x={560} baseY={1270} height={760} angle={20} tilt={tilt} scale={1.1} />
        <g transform={`rotate(${tilt} 560 ${1270 - 760 * 1.1})`}>
          <Crow x={interpolate(land, [0, 1], [1250, 740])} y={interpolate(land, [0, 1], [150, 380])} scale={1.4} flap={f < 32 ? Math.abs(Math.sin(f / 2)) : 0} />
        </g>
        <Kid x={230} y={1280} scale={0.75} pose="point" mouth="o" />
        <CRT x={830} y={1000} w={300} screen={bad ? "snow" : "clear"} seed="s4" />
      </svg>
      <Chip x={540} y={300} text="KAUVA AAYA…" delay={2} rot={-4} bg={P.cream} />
      <Chip x={330} y={820} text="SIGNAL GAYAB" delay={50} rot={3} bg={P.stripeA} color={P.cream} size={64} />
    </Film>
  );
};

// 5. Papa's formula: two slaps on the TV
export const TvSlap: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  const hits = [24, 46];
  const swing = hits.reduce((a, h) => a + interpolate(f, [h - 10, h, h + 8], [0, 1, 0], clamp), 0);
  const shake = hits.reduce((a, h) => a + interpolate(f, [h, h + 3, h + 10], [0, 14, 0], clamp) * Math.sin(f * 2.5), 0);
  const screen = f < 50 ? "khed" : f < 95 ? "snow" : "clear";
  return (
    <Film bg={P.wall}>
      <Room />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={380} y={1100} width={540} height={70} fill={P.woodDark} stroke={INK} strokeWidth={7} />
        <rect x={410} y={1170} width={30} height={160} fill={P.woodDark} stroke={INK} strokeWidth={6} />
        <rect x={860} y={1170} width={30} height={160} fill={P.woodDark} stroke={INK} strokeWidth={6} />
        <g transform={`translate(${shake} 0)`}><CRT x={650} y={880} w={520} screen={screen} seed="s5" /></g>
        <Adult x={210} y={1640} scale={1.05} kind="papa" armR={interpolate(swing, [0, 1], [-185, -150])} mouth="flat" />
      </svg>
      <Title text="PAPA KA FORMULA" top={240} size={104} accent={["formula"]} />
      <Chip x={300} y={560} text="THAPPAD #1" delay={hits[0]} rot={-6} bg={P.cream} />
      <Chip x={330} y={680} text="THAPPAD #2" delay={hits[1]} rot={5} bg={P.cream} />
      <Chip x={780} y={600} text="CHAL GAYA!" delay={100} rot={-3} bg={P.green} color={P.cream} size={66} />
    </Film>
  );
};

// 6. TWIST – grown-up Bittu, today: phone held high, hunting for Wi-Fi
export const WifiTwist: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 9);
  const bars = f < 30 ? 0 : f < 60 ? 1 : f < 95 ? 2 : 3;
  return (
    <Film bg={`linear-gradient(180deg, ${P.modern1} 0%, ${P.modern2} 100%)`}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={80} y={360} width={420} height={520} fill="#0B1420" stroke={INK} strokeWidth={8} />
        {new Array(9).fill(0).map((_, k) => <rect key={k} x={100 + (k % 3) * 130} y={560 + Math.floor(k / 3) * 100 - (k % 2) * 40} width={90} height={400} fill="#1F3348" />)}
        {new Array(14).fill(0).map((_, k) => <rect key={`w${k}`} x={115 + (k % 5) * 75} y={600 + Math.floor(k / 5) * 80} width={18} height={24} fill="#FFD983" opacity={0.8} />)}
        <line x1={290} y1={360} x2={290} y2={880} stroke={INK} strokeWidth={8} />
        <rect x={0} y={1560} width={1080} height={360} fill="#2A3442" />
        <Adult x={440 + sway * 30} y={1640} scale={1.05} kind="bittu" armR={-168 + sway * 10} phone mouth="flat" />
        <Phone x={810} y={760} w={290} bars={bars} label={bars < 3 ? "Searching…" : "Connected!"} />
      </svg>
      <Chip x={190} y={300} text="AAJ" delay={2} rot={-5} bg={P.cream} />
      <Chip x={800} y={1170} text="WAHI KAHANI" delay={70} rot={3} bg={P.mustard} size={60} />
    </Film>
  );
};

// 7. LOOP – back to the roof at dusk
export const RoofLoop: React.FC<SceneProps> = () => {
  const f = useCurrentFrame();
  return (
    <Film bg={duskBg}>
      <Sky sunY={1000 + f * 0.8} />
      <Rooftops floorY={FLOOR} tint={0.12} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Yagi x={760} baseY={FLOOR + 20} height={700} angle={22} />
        <Kid x={420} y={FLOOR + 20} scale={0.95} pose="wave" mouth="smile" />
      </svg>
      <Title text="SIGNAL KI LADAAI" top={250} size={112} accent={["signal"]} />
      <Chip x={540} y={600} text="BACHPAN KI YADEIN · #01" delay={20} rot={-2} bg={P.cream} size={46} />
    </Film>
  );
};
