// Bachpan Ki Yadein – reusable "90s Indian home" kit: palette, film look, sky, rooftops, Bittu (original kid),
// adults, CRT TV, roof antenna, crow, phone, speech bubbles, chips. Everything is original flat illustration –
// never draw real TV/cartoon characters, logos or packaging (series.json -> format.rules).
import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Grain } from "../kit/Backdrop";
import { titleFont, typeFont, bodyFont } from "../theme";

export const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
export const pop = (f: number, d = 10) => interpolate(f, [0, d], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
export const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], { ...clamp, easing: Easing.inOut(Easing.cubic) });

export const INK = "#2B160C";
export const P = {
  sky1: "#FFC27A", sky2: "#F48A5C", sky3: "#B85C7E", day1: "#9ED3E2", day2: "#FFE7B8",
  wall: "#EBCB92", wallDark: "#C9A066", floor: "#B9824F", mustard: "#FFC857", cream: "#FFF4D6",
  wood: "#9A5530", woodDark: "#5E2F1A", teal: "#2E7D7A", brick: "#C0502E", pink: "#E88BA0", green: "#6FA36B",
  tank: "#2E2B2A", concrete: "#D8C6A8", concreteDark: "#A9937A", skin: "#C98B5E", skinDark: "#A86E45",
  hair: "#1E1410", shorts: "#2F5D9E", stripeA: "#D9412B", stripeB: "#FFC857", modern1: "#1E2B3A", modern2: "#3D5A73",
};
export const SW = 7; // ink stroke width

// ---------- film look ----------
export const Film: React.FC<{ bg: string; children: React.ReactNode; grain?: number }> = ({ bg, children, grain = 0.12 }) => (
  <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
    {children}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 55%, rgba(43,22,12,0.55) 100%)", pointerEvents: "none" }} />
    <AbsoluteFill style={{ background: "#FFB45A", mixBlendMode: "soft-light", opacity: 0.18, pointerEvents: "none" }} />
    <Grain strength={grain} />
  </AbsoluteFill>
);

export const duskBg = `linear-gradient(180deg, ${P.sky3} 0%, ${P.sky2} 38%, ${P.sky1} 70%, #FFE2A8 100%)`;
export const dayBg = `linear-gradient(180deg, ${P.day1} 0%, #CBE7E6 45%, ${P.day2} 100%)`;

// Sun + drifting kites (patang)
export const Sky: React.FC<{ sunY?: number; kites?: boolean }> = ({ sunY = 760, kites = true }) => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <circle cx={790} cy={sunY} r={170} fill="#FFE9A8" opacity={0.45} />
      <circle cx={790} cy={sunY} r={110} fill="#FFF1C4" />
      {kites
        ? [
            { x: 200, y: 420, c: P.pink, s: 1 },
            { x: 930, y: 300, c: P.teal, s: 0.7 },
          ].map((k, i) => {
            const x = k.x + Math.sin(f / 22 + i) * 26;
            const y = k.y + Math.cos(f / 17 + i * 2) * 18;
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${k.s}) rotate(${Math.sin(f / 15 + i) * 8})`}>
                <path d={`M 0 -60 L 46 0 L 0 60 L -46 0 Z`} fill={k.c} stroke={INK} strokeWidth={5} />
                <path d="M 0 -60 L 0 60 M -46 0 L 46 0" stroke={INK} strokeWidth={3} />
                <path d={`M 0 60 q 20 40 -10 80 q -30 40 10 90`} stroke={INK} strokeWidth={3} fill="none" />
                <path d={`M 0 0 L ${-300 + i * 500} 900`} stroke={INK} strokeWidth={1.5} opacity={0.5} />
              </g>
            );
          })
        : null}
    </svg>
  );
};

// ---------- mohalla rooftops ----------
const BACK = ["#E9B8A0", "#CFE0C8", "#F2D49B", "#BFD5E2", "#E7C3D3", "#D9C6A8", "#F0C9A0"];
export const Rooftops: React.FC<{ floorY?: number; tint?: number }> = ({ floorY = 1120, tint = 0 }) => {
  const f = useCurrentFrame();
  const blds = [
    { x: -40, w: 230, top: 930 }, { x: 170, w: 190, top: 1010 }, { x: 340, w: 250, top: 960 },
    { x: 570, w: 180, top: 1040 }, { x: 730, w: 220, top: 900 }, { x: 930, w: 200, top: 990 },
  ];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      {blds.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.top} width={b.w} height={1920 - b.top} fill={BACK[i % BACK.length]} stroke={INK} strokeWidth={5} />
          <rect x={b.x - 8} y={b.top - 16} width={b.w + 16} height={20} fill={P.concreteDark} stroke={INK} strokeWidth={4} />
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) =>
              c * 70 + 40 < b.w - 30 ? (
                <rect key={`${r}${c}`} x={b.x + 30 + c * 70} y={b.top + 50 + r * 110} width={40} height={60} rx={4}
                  fill={random(`w${i}${r}${c}`) > 0.6 ? "#FFE6A6" : "#6B4A3A"} stroke={INK} strokeWidth={3} />
              ) : null,
            ),
          )}
          {i % 2 === 0 ? (
            <g transform={`translate(${b.x + b.w - 80} ${b.top - 16})`}>
              <rect x={0} y={-70} width={56} height={70} fill={P.tank} stroke={INK} strokeWidth={4} />
              <ellipse cx={28} cy={-70} rx={28} ry={9} fill="#4A4644" stroke={INK} strokeWidth={4} />
            </g>
          ) : (
            <g transform={`translate(${b.x + 50} ${b.top - 16})`} stroke={INK} strokeWidth={4} fill="none">
              <line x1={0} y1={0} x2={0} y2={-150} />
              <line x1={-45} y1={-150} x2={45} y2={-140} />
              {[-30, -10, 10, 30].map((d) => <line key={d} x1={d} y1={-158 + d / 8} x2={d} y2={-130 + d / 8} />)}
            </g>
          )}
        </g>
      ))}
      {/* clothes line on the middle roof */}
      <g>
        <path d={`M 360 ${955} Q 470 ${985} 580 ${950}`} stroke={INK} strokeWidth={3} fill="none" />
        {[[390, P.pink], [430, P.teal], [475, P.mustard], [520, "#FFFFFF"]].map(([x, c], k) => (
          <rect key={k} x={Number(x)} y={962 + Math.sin(f / 9 + k) * 2} width={30} height={46} rx={4} fill={String(c)} stroke={INK} strokeWidth={3}
            transform={`rotate(${Math.sin(f / 11 + k) * 4} ${Number(x) + 15} 962)`} />
        ))}
      </g>
      {/* our roof */}
      <rect x={-10} y={floorY - 40} width={1100} height={46} fill="#B5654A" stroke={INK} strokeWidth={6} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <line key={k} x1={k * 130 - 10} y1={floorY - 40} x2={k * 130 - 10} y2={floorY + 6} stroke={INK} strokeWidth={3} opacity={0.5} />)}
      <rect x={-10} y={floorY + 6} width={1100} height={1920 - floorY} fill={P.concrete} stroke={INK} strokeWidth={6} />
      {[0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={floorY + 120 + k * 150} x2={1080} y2={floorY + 120 + k * 150} stroke={P.concreteDark} strokeWidth={4} />)}
      {tint ? <rect width={1080} height={1920} fill="#2B160C" opacity={tint} /> : null}
    </svg>
  );
};

// Stair room ("mumty") with a door someone shouts out of
export const Mumty: React.FC<{ x: number; floorY: number; open?: number; children?: React.ReactNode }> = ({ x, floorY, open = 1, children }) => (
  <g>
    <rect x={x} y={floorY - 430} width={300} height={440} fill="#E3B486" stroke={INK} strokeWidth={SW} />
    <rect x={x - 14} y={floorY - 450} width={328} height={30} fill={P.concreteDark} stroke={INK} strokeWidth={SW} />
    <rect x={x + 80} y={floorY - 330} width={150} height={330} fill="#3A2418" stroke={INK} strokeWidth={SW} />
    {children}
    <rect x={x + 80} y={floorY - 330} width={150 * (1 - 0.75 * open)} height={330} fill={P.teal} stroke={INK} strokeWidth={SW} />
  </g>
);

// ---------- people ----------
const Arm: React.FC<{ x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; color: string; w?: number }> = ({ x1, y1, x2, y2, x3, y3, color, w = 26 }) => (
  <g strokeLinecap="round" strokeLinejoin="round" fill="none">
    <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} stroke={INK} strokeWidth={w + 12} />
    <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} stroke={color} strokeWidth={w} />
  </g>
);

export type KidPose = "up" | "grip" | "idle" | "wave" | "point" | "cheer" | "bat" | "catch" | "bowl" | "run";
// Bittu – the series' original recurring kid. Feet at (x, y). Head ≈ y - 430*scale.
export const Kid: React.FC<{ x: number; y: number; scale?: number; pose?: KidPose; mouth?: "smile" | "open" | "o" | "grr"; facing?: 1 | -1; look?: number;
  tee?: [string, string]; shorts?: string; hair?: "side" | "spiky" | "bowl"; prop?: "bat"; swing?: number; skin?: string }> = ({
  x, y, scale = 1, pose = "idle", mouth = "smile", facing = 1, look = 0, tee = [P.stripeB, P.stripeA], shorts = P.shorts, hair = "side", prop, swing = 0, skin = P.skin,
}) => {
  const f = useCurrentFrame();
  const wave = Math.sin(f / 4) * 18;
  const arms: Record<KidPose, [number, number, number, number][]> = {
    // [elbowX, elbowY, handX, handY] for left & right arm (shoulders at -60,-350 / 60,-350)
    up: [[-110, -450, -95, -590], [110, -450, 95, -600]],
    grip: [[40, -300, 140, -390], [120, -420, 140, -480]],
    idle: [[-85, -270, -80, -190], [85, -270, 80, -190]],
    wave: [[-85, -270, -80, -190], [120, -420, 150 + wave, -530]],
    point: [[-85, -270, -80, -190], [140, -360, 230, -380]],
    cheer: [[-120, -420, -150 - wave / 2, -530], [120, -420, 150 + wave / 2, -530]],
    bat: [[10, -290, 95, -300], [80, -300, 105, -320]],
    catch: [[-85, -270, -80, -190], [130, -470, 120, -600]],
    bowl: [[-120, -330, -170, -260], [70, -470, 20, -580]],
    run: [[-90, -300, -40 + wave, -250], [90, -300, 40 - wave, -260]],
  };
  const [L, R] = arms[pose];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      {/* legs + chappals */}
      <Arm x1={-35} y1={-170} x2={-38} y2={-80} x3={-40} y3={-10} color={skin} w={30} />
      <Arm x1={35} y1={-170} x2={38} y2={-80} x3={40} y3={-10} color={skin} w={30} />
      <ellipse cx={-48} cy={0} rx={34} ry={11} fill={P.brick} stroke={INK} strokeWidth={5} />
      <ellipse cx={48} cy={0} rx={34} ry={11} fill={P.brick} stroke={INK} strokeWidth={5} />
      {/* shorts */}
      <path d="M -80 -240 L 80 -240 L 88 -150 L 8 -150 L 0 -185 L -8 -150 L -88 -150 Z" fill={shorts} stroke={INK} strokeWidth={SW} />
      {/* striped tee */}
      <defs>
        <clipPath id="tee">
          <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" />
        </clipPath>
      </defs>
      <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" fill={tee[0]} />
      <g clipPath="url(#tee)">
        {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-100} y={-380 + k * 30} width={200} height={15} fill={tee[1]} />)}
      </g>
      <path d="M -78 -372 Q 0 -392 78 -372 L 86 -230 Q 0 -218 -86 -230 Z" fill="none" stroke={INK} strokeWidth={SW} />
      {/* arms (in front of the tee) */}
      <Arm x1={-62} y1={-352} x2={L[0]} y2={L[1]} x3={L[2]} y3={L[3]} color={skin} />
      <Arm x1={62} y1={-352} x2={R[0]} y2={R[1]} x3={R[2]} y3={R[3]} color={skin} />
      {/* sleeves */}
      <circle cx={-66} cy={-352} r={26} fill={tee[1]} stroke={INK} strokeWidth={5} />
      <circle cx={66} cy={-352} r={26} fill={tee[1]} stroke={INK} strokeWidth={5} />
      {prop === "bat" ? (
        <g transform={`translate(100 -300) rotate(${swing})`}>
          <rect x={-9} y={-10} width={18} height={70} rx={6} fill="#3B3B3B" stroke={INK} strokeWidth={5} />
          <path d="M -24 58 L 24 58 L 22 270 Q 0 286 -22 270 Z" fill="#E8C27A" stroke={INK} strokeWidth={6} />
          <line x1={0} y1={70} x2={0} y2={260} stroke="#C99A4E" strokeWidth={5} />
        </g>
      ) : null}
      {/* neck + head */}
      <rect x={-18} y={-405} width={36} height={40} fill={P.skinDark} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-470} r={78} fill={skin} stroke={INK} strokeWidth={SW} />
      <circle cx={-78} cy={-465} r={16} fill={skin} stroke={INK} strokeWidth={5} />
      <circle cx={78} cy={-465} r={16} fill={skin} stroke={INK} strokeWidth={5} />
      {/* side-parted hair */}
      {hair === "side" ? <path d="M -82 -480 Q -86 -560 -10 -556 Q 70 -560 84 -486 Q 60 -520 10 -528 L 4 -505 Q -40 -530 -82 -480 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {hair === "spiky" ? <path d="M -80 -480 L -70 -560 L -40 -530 L -20 -575 L 5 -535 L 30 -578 L 45 -530 L 72 -560 L 82 -482 Q 40 -515 0 -512 Q -40 -515 -80 -480 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {hair === "bowl" ? <path d="M -86 -470 Q -90 -565 0 -562 Q 90 -565 86 -470 L 70 -470 Q 60 -505 0 -505 Q -60 -505 -70 -470 Z" fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
      {/* face */}
      <g transform={`translate(${look * 10} 0)`}>
        <circle cx={-28} cy={-472} r={8} fill={INK} />
        <circle cx={28} cy={-472} r={8} fill={INK} />
        <path d="M -44 -494 q 14 -8 28 0 M 16 -494 q 14 -8 28 0" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        {mouth === "smile" ? <path d="M -26 -436 Q 0 -414 26 -436" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        {mouth === "open" ? <path d="M -26 -440 Q 0 -398 26 -440 Z" fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "o" ? <ellipse cx={0} cy={-430} rx={14} ry={18} fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
        {mouth === "grr" ? <path d="M -24 -428 Q 0 -446 24 -428" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-446} r={10} fill="#E57B6A" opacity={0.45} />
        <circle cx={46} cy={-446} r={10} fill="#E57B6A" opacity={0.45} />
      </g>
    </g>
  );
};

// Adults: papa (moustache, half-sleeve shirt), mummy (saree, bun), bittu (grown-up Bittu in a hoodie)
export const Adult: React.FC<{ x: number; y: number; scale?: number; kind: "papa" | "mummy" | "bittu"; arm?: number; armR?: number; mouth?: "smile" | "open" | "flat"; facing?: 1 | -1; phone?: boolean }> = ({
  x, y, scale = 1, kind, arm = 20, armR = -20, mouth = "smile", facing = 1, phone = false,
}) => {
  const top = kind === "papa" ? "#9CC7E0" : kind === "mummy" ? P.green : P.teal;
  const bottom = kind === "papa" ? "#6B4A35" : kind === "mummy" ? P.green : "#2E4A7A";
  const hx = (deg: number, len: number) => Math.sin((deg * Math.PI) / 180) * len;
  const hy = (deg: number, len: number) => Math.cos((deg * Math.PI) / 180) * len;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale})`}>
      {kind === "mummy" ? (
        <path d="M -95 -470 L 95 -470 L 130 0 L -130 0 Z" fill={bottom} stroke={INK} strokeWidth={SW} />
      ) : (
        <>
          <Arm x1={-40} y1={-300} x2={-44} y2={-150} x3={-46} y3={-10} color={bottom} w={46} />
          <Arm x1={40} y1={-300} x2={44} y2={-150} x3={46} y3={-10} color={bottom} w={46} />
          <ellipse cx={-56} cy={0} rx={40} ry={12} fill={INK} />
          <ellipse cx={56} cy={0} rx={40} ry={12} fill={INK} />
        </>
      )}
      <path d="M -100 -560 Q 0 -585 100 -560 L 110 -300 Q 0 -285 -110 -300 Z" fill={top} stroke={INK} strokeWidth={SW} />
      {kind === "mummy" ? <path d="M 90 -560 L -60 -300 L -20 -300 L 110 -520 Z" fill={P.mustard} stroke={INK} strokeWidth={5} /> : null}
      {kind === "papa" ? <path d="M 0 -575 L 0 -300 M -20 -575 L 0 -540 L 20 -575" stroke={INK} strokeWidth={4} fill="none" /> : null}
      <Arm x1={-92} y1={-545} x2={-92 - hx(arm, 130)} y2={-545 + hy(arm, 130)} x3={-92 - hx(arm, 250)} y3={-545 + hy(arm, 250)} color={P.skin} w={30} />
      <Arm x1={92} y1={-545} x2={92 + hx(-armR, 130)} y2={-545 + hy(-armR, 130)} x3={92 + hx(-armR, 250)} y3={-545 + hy(-armR, 250)} color={P.skin} w={30} />
      {phone ? (
        <g transform={`translate(${92 + hx(-armR, 262)} ${-545 + hy(-armR, 262)}) rotate(${armR + 180})`}>
          <rect x={-34} y={-62} width={68} height={124} rx={12} fill="#15171C" stroke={INK} strokeWidth={5} />
          <rect x={-26} y={-52} width={52} height={100} rx={6} fill="#8FD3FF" />
        </g>
      ) : null}
      <rect x={-22} y={-605} width={44} height={50} fill={P.skinDark} stroke={INK} strokeWidth={5} />
      <circle cx={0} cy={-680} r={82} fill={P.skin} stroke={INK} strokeWidth={SW} />
      {kind === "papa" ? (
        <>
          <path d="M -84 -690 Q -88 -740 -60 -755 L -50 -700 Z M 84 -690 Q 88 -740 60 -755 L 50 -700 Z" fill={P.hair} stroke={INK} strokeWidth={4} />
          <path d="M -40 -648 Q 0 -668 40 -648 Q 30 -630 0 -640 Q -30 -630 -40 -648 Z" fill={P.hair} stroke={INK} strokeWidth={4} />
        </>
      ) : null}
      {kind === "mummy" ? (
        <>
          <path d="M -86 -690 Q -80 -778 0 -770 Q 80 -778 86 -690 Q 60 -735 0 -735 Q -60 -735 -86 -690 Z" fill={P.hair} stroke={INK} strokeWidth={5} />
          <circle cx={-70} cy={-740} r={38} fill={P.hair} stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={-712} r={8} fill={P.brick} />
        </>
      ) : null}
      {kind === "bittu" ? (
        <path d="M -86 -690 Q -90 -775 -10 -770 Q 75 -775 88 -696 Q 62 -735 10 -742 L 4 -718 Q -42 -742 -86 -690 Z" fill={P.hair} stroke={INK} strokeWidth={5} />
      ) : null}
      <circle cx={-30} cy={-685} r={8} fill={INK} />
      <circle cx={30} cy={-685} r={8} fill={INK} />
      {mouth === "smile" ? <path d="M -28 -630 Q 0 -606 28 -630" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
      {mouth === "open" ? <path d="M -28 -634 Q 0 -588 28 -634 Z" fill="#7A2A1E" stroke={INK} strokeWidth={5} /> : null}
      {mouth === "flat" ? <path d="M -24 -626 L 24 -626" stroke={INK} strokeWidth={6} strokeLinecap="round" /> : null}
    </g>
  );
};

// ---------- CRT TV ----------
export type Screen = "snow" | "clear" | "khed" | "bars" | "off";
export const CRT: React.FC<{ x: number; y: number; w?: number; screen: Screen; seed?: string }> = ({ x, y, w = 560, screen, seed = "tv" }) => {
  const f = useCurrentFrame();
  const h = w * 0.78;
  const sx = 30, sy = 30, sw = w * 0.7, sh = h - 60;
  const id = `scr-${seed}`;
  const cols = 22, rows = 16;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <line x1={w * 0.2} y1={h} x2={w * 0.12} y2={h + 70} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <line x1={w * 0.8} y1={h} x2={w * 0.88} y2={h + 70} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <rect x={0} y={0} width={w} height={h} rx={44} fill={P.woodDark} stroke={INK} strokeWidth={SW + 3} />
      <rect x={10} y={10} width={w - 20} height={h - 20} rx={36} fill={P.wood} />
      <rect x={sx - 10} y={sy - 10} width={sw + 20} height={sh + 20} rx={52} fill={INK} />
      <defs>
        <clipPath id={id}><rect x={sx} y={sy} width={sw} height={sh} rx={44} /></clipPath>
        <radialGradient id={`${id}-g`} cx="50%" cy="45%" r="70%"><stop offset="0" stopColor="#FFF4D6" /><stop offset="1" stopColor="#E9A94E" /></radialGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        {screen === "snow" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill="#777" />
            {new Array(cols * rows).fill(0).map((_, i) => {
              const v = Math.floor(random(`${seed}${i}-${f}`) * 255);
              return <rect key={i} x={sx + (i % cols) * (sw / cols)} y={sy + Math.floor(i / cols) * (sh / rows)} width={sw / cols + 1} height={sh / rows + 1} fill={`rgb(${v},${v},${v})`} />;
            })}
            <rect x={sx} y={sy + ((f * 9) % sh) - 30} width={sw} height={30} fill="#FFFFFF" opacity={0.25} />
          </>
        ) : null}
        {screen === "clear" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill={`url(#${id}-g)`} />
            <circle cx={sx + sw * 0.7} cy={sy + sh * 0.35} r={sh * 0.14} fill="#FFFFFF" opacity={0.9} />
            <path d={`M ${sx} ${sy + sh * 0.75} Q ${sx + sw * 0.3} ${sy + sh * 0.5} ${sx + sw * 0.6} ${sy + sh * 0.72} T ${sx + sw} ${sy + sh * 0.68} L ${sx + sw} ${sy + sh} L ${sx} ${sy + sh} Z`} fill={P.green} />
          </>
        ) : null}
        {screen === "bars" ? ["#FFFFFF", "#FFE14D", "#4DE1E1", "#4DE14D", "#E14DE1", "#E14D4D", "#4D4DE1"].map((c, i) => (
          <rect key={i} x={sx + (i * sw) / 7} y={sy} width={sw / 7 + 1} height={sh} fill={c} />
        )) : null}
        {screen === "khed" ? (
          <>
            <rect x={sx} y={sy} width={sw} height={sh} fill="#1F3A93" />
            <text x={sx + sw / 2} y={sy + sh * 0.44} textAnchor="middle" fontFamily={typeFont} fontSize={w * 0.075} fill="#FFFFFF">RUKAWAT KE LIYE</text>
            <text x={sx + sw / 2} y={sy + sh * 0.62} textAnchor="middle" fontFamily={typeFont} fontSize={w * 0.075} fill="#FFFFFF">KHED HAI</text>
          </>
        ) : null}
        {screen === "off" ? <rect x={sx} y={sy} width={sw} height={sh} fill="#2A2E2B" /> : null}
        <rect x={sx} y={sy} width={sw} height={sh} fill="#FFFFFF" opacity={0.06} />
        {new Array(Math.ceil(sh / 8)).fill(0).map((_, k) => <rect key={k} x={sx} y={sy + k * 8} width={sw} height={2} fill="#000" opacity={0.08} />)}
      </g>
      <path d={`M ${sx + 24} ${sy + 40} q 40 -20 110 -18`} stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" fill="none" opacity={0.45} />
      {[0, 1].map((k) => (
        <g key={k}>
          <circle cx={sx + sw + (w - sx - sw) / 2 + 2} cy={sy + 60 + k * 100} r={w * 0.055} fill={INK} />
          <circle cx={sx + sw + (w - sx - sw) / 2 + 2} cy={sy + 60 + k * 100} r={w * 0.035} fill={P.mustard} />
        </g>
      ))}
      {[0, 1, 2, 3].map((k) => <rect key={k} x={sx + sw + 30} y={sy + 250 + k * 26} width={w - sx - sw - 60} height={10} rx={5} fill={INK} />)}
    </g>
  );
};

// ---------- roof antenna (Yagi) – `angle` turns it, `tilt` knocks it crooked ----------
export const Yagi: React.FC<{ x: number; baseY: number; height?: number; angle: number; tilt?: number; scale?: number }> = ({ x, baseY, height = 620, angle, tilt = 0, scale = 1 }) => {
  // drawn around its base so `scale` grows it upwards; the top of the pole is at baseY - height*scale
  const a = (angle * Math.PI) / 180;
  const L = 420;
  const proj = (u: number, v: number) => [u * Math.cos(a) - v * Math.sin(a), (u * Math.sin(a) + v * Math.cos(a)) * 0.3];
  const els = [-180, -110, -40, 30, 100, 170].map((u, i) => ({ u, e: 230 - i * 22 }));
  const topY = -height;
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      <line x1={0} y1={0} x2={0} y2={topY} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      <line x1={0} y1={0} x2={0} y2={topY} stroke="#9AA3A8" strokeWidth={12} strokeLinecap="round" />
      <line x1={-60} y1={0} x2={60} y2={0} stroke={INK} strokeWidth={16} strokeLinecap="round" />
      <path d={`M 0 ${topY + 40} C 60 ${topY + 200} -40 ${topY + 380} 30 0`} stroke={INK} strokeWidth={6} fill="none" />
      <g transform={`translate(0 ${topY}) rotate(${tilt})`}>
        {(() => {
          const [bx1, by1] = proj(-L / 2, 0);
          const [bx2, by2] = proj(L / 2, 0);
          return <line x1={bx1} y1={by1} x2={bx2} y2={by2} stroke={INK} strokeWidth={14} strokeLinecap="round" />;
        })()}
        {els.map(({ u, e }, i) => {
          const [x1, y1] = proj(u, -e / 2);
          const [x2, y2] = proj(u, e / 2);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={10} strokeLinecap="round" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9D0D4" strokeWidth={4} strokeLinecap="round" />
            </g>
          );
        })}
      </g>
    </g>
  );
};

export const Crow: React.FC<{ x: number; y: number; scale?: number; flap?: number }> = ({ x, y, scale = 1, flap = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -60 0 Q -10 -50 50 -20 L 80 -28 L 60 -8 Q 30 30 -30 20 L -90 30 Z" fill="#1B1B22" stroke={INK} strokeWidth={5} />
    <path d={`M -20 -10 Q -40 ${-60 - flap * 60} -100 ${-40 - flap * 70} Q -60 -10 -20 -10 Z`} fill="#2C2C36" stroke={INK} strokeWidth={5} />
    <circle cx={42} cy={-22} r={6} fill="#FFFFFF" />
    <circle cx={43} cy={-22} r={3} fill={INK} />
    <path d="M 0 22 L -6 50 M 20 20 L 24 50" stroke={INK} strokeWidth={5} />
  </g>
);

// Modern phone with Wi-Fi bars (0–3)
export const Phone: React.FC<{ x: number; y: number; w?: number; bars: number; label?: string }> = ({ x, y, w = 300, bars, label = "Searching…" }) => {
  const h = w * 2;
  const cx = w / 2, cy = h * 0.42;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <rect x={0} y={0} width={w} height={h} rx={44} fill="#15171C" stroke={INK} strokeWidth={SW} />
      <rect x={14} y={14} width={w - 28} height={h - 28} rx={32} fill="#0E2233" />
      {[1, 2, 3].map((k) => (
        <path key={k} d={`M ${cx - k * 44} ${cy - k * 18} A ${k * 52} ${k * 52} 0 0 1 ${cx + k * 44} ${cy - k * 18}`}
          stroke={k <= bars ? "#7FE3FF" : "#2B4558"} strokeWidth={22} fill="none" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy + 14} r={16} fill={bars > 0 ? "#7FE3FF" : "#2B4558"} />
      <text x={cx} y={cy + 140} textAnchor="middle" fontFamily={bodyFont} fontWeight={800} fontSize={w * 0.11} fill="#CFE9F5">{label}</text>
    </g>
  );
};

// ---------- text ----------
export const Bubble: React.FC<{ x: number; y: number; text: string; delay?: number; size?: number; tail?: "down" | "left" | "right"; bg?: string }> = ({
  x, y, text, delay = 0, size = 96, tail = "down", bg = "#FFFFFF",
}) => {
  const f = useCurrentFrame();
  const s = pop(f - delay, 9);
  if (f < delay) return null;
  const tails = { down: "M -30 0 L 10 70 L 40 0 Z", left: "M 0 -20 L -90 40 L 0 30 Z", right: "M 0 -20 L 90 40 L 0 30 Z" };
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", scale: s, rotate: `${Math.sin(delay) * 4}deg` }}>
      <svg width={120} height={120} style={{ position: "absolute", left: tail === "left" ? -40 : tail === "right" ? "calc(100% - 80px)" : "40%", top: tail === "down" ? "100%" : "50%", overflow: "visible", marginTop: tail === "down" ? -18 : 0 }}>
        <path d={tails[tail]} fill={bg} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      </svg>
      <div style={{ position: "relative", fontFamily: titleFont, fontSize: size, color: INK, background: bg, border: `7px solid ${INK}`, borderRadius: 60, padding: "10px 46px 18px", whiteSpace: "nowrap", boxShadow: "0 12px 0 rgba(43,22,12,0.35)" }}>
        {text}
      </div>
    </div>
  );
};

export const Chip: React.FC<{ x: number; y: number; text: string; delay?: number; rot?: number; bg?: string; color?: string; size?: number }> = ({
  x, y, text, delay = 0, rot = -3, bg = P.mustard, color = INK, size = 54,
}) => {
  const f = useCurrentFrame();
  if (f < delay) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", rotate: `${rot}deg`, scale: pop(f - delay, 8), fontFamily: bodyFont, fontWeight: 900, fontSize: size, color, background: bg, border: `6px solid ${INK}`, borderRadius: 16, padding: "8px 26px", whiteSpace: "nowrap", textTransform: "uppercase", boxShadow: "0 10px 0 rgba(43,22,12,0.35)" }}>
      {text}
    </div>
  );
};

// Big headline (Roman text only)
export const Title: React.FC<{ text: string; top?: number; size?: number; accent?: string[]; delay?: number; color?: string }> = ({ text, top = 250, size = 120, accent = [], delay = 0, color = P.cream }) => {
  const f = useCurrentFrame();
  const acc = new Set(accent.map((a) => a.toLowerCase()));
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 28px", fontFamily: titleFont, fontSize: size, lineHeight: 1.08, textAlign: "center" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", color: acc.has(w.toLowerCase().replace(/[^a-z0-9]/g, "")) ? P.mustard : color, WebkitTextStroke: `14px ${INK}`, paintOrder: "stroke fill", textShadow: "0 12px 0 rgba(43,22,12,0.4)", opacity: interpolate(f - delay - i * 4, [0, 4], [0, 1], clamp), scale: interpolate(f - delay - i * 4, [0, 8], [1.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.3, 0.4, 1) }) }}>
          {w}
        </span>
      ))}
    </div>
  );
};

// ---------- 90s living room ----------
export const Room: React.FC<{ wall?: string; floorY?: number; night?: boolean }> = ({ wall = P.wall, floorY = 1300, night = false }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    <rect width={1080} height={floorY} fill={wall} />
    {new Array(14).fill(0).map((_, k) => <rect key={k} x={k * 80} y={0} width={40} height={floorY} fill="#000" opacity={0.025} />)}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill={P.floor} />
    {new Array(8).fill(0).map((_, k) => <line key={k} x1={0} y1={floorY + 60 + k * 90} x2={1080} y2={floorY + 60 + k * 90} stroke={INK} strokeWidth={3} opacity={0.25} />)}
    <rect x={0} y={floorY - 14} width={1080} height={20} fill={P.wallDark} stroke={INK} strokeWidth={4} />
    {/* window with grill */}
    <rect x={60} y={300} width={250} height={340} fill={night ? "#2C3550" : "#CFEAF2"} stroke={INK} strokeWidth={SW} />
    {[1, 2, 3, 4].map((k) => <line key={k} x1={60 + k * 50} y1={300} x2={60 + k * 50} y2={640} stroke={INK} strokeWidth={5} />)}
    <line x1={60} y1={470} x2={310} y2={470} stroke={INK} strokeWidth={5} />
    {/* tube light */}
    <rect x={560} y={150} width={330} height={26} rx={13} fill="#FFFDF2" stroke={INK} strokeWidth={5} />
    <rect x={540} y={176} width={370} height={14} fill={P.wallDark} stroke={INK} strokeWidth={4} />
    {/* wall calendar (generic) */}
    <rect x={870} y={330} width={150} height={200} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <rect x={870} y={330} width={150} height={70} fill={P.brick} stroke={INK} strokeWidth={5} />
    {new Array(12).fill(0).map((_, k) => <rect key={k} x={886 + (k % 4) * 32} y={414 + Math.floor(k / 4) * 34} width={22} height={22} fill={P.concreteDark} />)}
  </svg>
);

// Family seen from behind on the sofa (watching TV)
export const SofaBacks: React.FC<{ y?: number; lean?: number }> = ({ y = 1500, lean = 0 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    {[{ x: 300, c: P.green, hair: "bun", s: 1 }, { x: 560, c: "#9CC7E0", hair: "bald", s: 1.05 }, { x: 800, c: P.stripeA, hair: "kid", s: 0.8 }].map((p, i) => (
      <g key={i} transform={`translate(${p.x + lean * (i - 1) * 10} ${y}) scale(${p.s})`}>
        <path d="M -110 0 Q -110 -180 0 -190 Q 110 -180 110 0 Z" fill={p.c} stroke={INK} strokeWidth={SW} />
        <circle cx={0} cy={-250} r={78} fill={P.hair} stroke={INK} strokeWidth={SW} />
        {p.hair === "bun" ? <circle cx={0} cy={-300} r={38} fill={P.hair} stroke={INK} strokeWidth={5} /> : null}
        {p.hair === "bald" ? <ellipse cx={0} cy={-290} rx={45} ry={30} fill={P.skin} /> : null}
      </g>
    ))}
    <rect x={120} y={y - 40} width={840} height={150} rx={40} fill="#7A3B2A" stroke={INK} strokeWidth={SW} />
    <rect x={90} y={y - 140} width={70} height={250} rx={30} fill="#8E4632" stroke={INK} strokeWidth={SW} />
    <rect x={920} y={y - 140} width={70} height={250} rx={30} fill="#8E4632" stroke={INK} strokeWidth={SW} />
  </svg>
);

// ---------- gully (street lane, frontal perspective) ----------
export const Gully: React.FC<{ tint?: number }> = ({ tint = 0 }) => {
  const f = useCurrentFrame();
  const win = (pts: string, k: string, lit = false) => <polygon key={k} points={pts} fill={lit ? "#FFE6A6" : "#5E4436"} stroke={INK} strokeWidth={5} />;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <rect width={1080} height={1920} fill="#A8DCEB" />
      <rect x={340} y={420} width={400} height={800} fill="#F2D49B" stroke={INK} strokeWidth={6} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={380 + c * 120} y={480 + r * 170} width={70} height={100} rx={6} fill={r === 1 && c === 1 ? "#FFE6A6" : "#5E4436"} stroke={INK} strokeWidth={4} />))}
      <rect x={640} y={340} width={70} height={80} fill={P.tank} stroke={INK} strokeWidth={4} />
      {/* left wall */}
      <polygon points="0,0 380,380 380,1220 0,1560" fill="#E9A88E" stroke={INK} strokeWidth={7} />
      {win("60,300 200,410 200,620 60,560", "l1")}
      {win("250,450 330,510 330,680 250,640", "l2", true)}
      <polygon points="60,860 220,950 220,1330 60,1420" fill={P.teal} stroke={INK} strokeWidth={6} />
      {/* right wall */}
      <polygon points="1080,0 700,380 700,1220 1080,1560" fill="#BFD5E2" stroke={INK} strokeWidth={7} />
      {win("1020,300 880,410 880,620 1020,560", "r1", true)}
      {win("830,450 750,510 750,680 830,640", "r2")}
      <polygon points="1030,760 860,850 860,1040 1030,980" fill="#7CC4E6" stroke={INK} strokeWidth={6} />
      {/* balcony rail */}
      <polygon points="1040,1010 850,1080 850,1110 1040,1050" fill={P.brick} stroke={INK} strokeWidth={5} />
      {/* ground + drain */}
      <polygon points="0,1560 380,1220 700,1220 1080,1560 1080,1920 0,1920" fill="#9C8B76" stroke={INK} strokeWidth={6} />
      <polygon points="120,1920 455,1220 625,1220 960,1920" fill="#AD9C86" />
      <line x1={540} y1={1220} x2={540} y2={1920} stroke="#8A7A66" strokeWidth={6} strokeDasharray="40 40" />
      {/* wires + crows of a sort */}
      <path d={`M 0 180 Q 540 ${300 + Math.sin(f / 20) * 6} 1080 160`} stroke={INK} strokeWidth={4} fill="none" />
      <path d={`M 0 250 Q 540 ${360 + Math.sin(f / 23) * 6} 1080 230`} stroke={INK} strokeWidth={3} fill="none" />
      {tint ? <rect width={1080} height={1920} fill="#2B160C" opacity={tint} /> : null}
    </svg>
  );
};

// brick-stack stumps
export const Bricks: React.FC<{ x: number; y: number; scale?: number; fall?: number }> = ({ x, y, scale = 1, fall = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={-60 + (k % 2) * 8 + fall * k * 22} y={-40 - k * 40 + fall * k * 34} width={120} height={40} rx={4} fill="#B5452F" stroke={INK} strokeWidth={5}
        transform={`rotate(${fall * k * 18} 0 ${-20 - k * 40})`} />
    ))}
  </g>
);

export const Ball: React.FC<{ x: number; y: number; r?: number; spin?: number }> = ({ x, y, r = 26, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${spin})`}>
    <circle r={r} fill="#D7F04A" stroke={INK} strokeWidth={5} />
    <path d={`M ${-r * 0.8} ${-r * 0.4} Q 0 ${r * 0.3} ${r * 0.8} ${-r * 0.4}`} stroke="#FFFFFF" strokeWidth={4} fill="none" />
  </g>
);

// motion streaks behind a moving object
export const Streaks: React.FC<{ x: number; y: number; dx: number; dy: number; n?: number }> = ({ x, y, dx, dy, n = 4 }) => {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return (
    <g stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.5}>
      {new Array(n).fill(0).map((_, k) => {
        const off = (k - (n - 1) / 2) * 18;
        return <line key={k} x1={x - ux * 40 - uy * off} y1={y - uy * 40 + ux * off} x2={x - ux * (110 + k * 20) - uy * off} y2={y - uy * (110 + k * 20) + ux * off} />;
      })}
    </g>
  );
};

// big slammed stamp ("OUT!", "SIX!")
export const Stamp: React.FC<{ text: string; x?: number; y?: number; delay?: number; color?: string; size?: number; rot?: number }> = ({ text, x = 540, y = 760, delay = 0, color = P.stripeA, size = 190, rot = -10 }) => {
  const f = useCurrentFrame();
  if (f < delay) return null;
  const s = interpolate(f - delay, [0, 5, 9], [2.4, 0.92, 1], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", rotate: `${rot}deg`, scale: s, fontFamily: titleFont, fontSize: size, color: P.cream, background: color, border: `12px solid ${INK}`, borderRadius: 28, padding: "0 46px 12px", WebkitTextStroke: `10px ${INK}`, paintOrder: "stroke fill", boxShadow: "0 16px 0 rgba(43,22,12,0.4)", whiteSpace: "nowrap" }}>
      {text}
    </div>
  );
};

// a neighbour's window (close-up) – glass can shatter; an aunty can pop up behind it
export const HouseWindow: React.FC<{ broken?: number; aunty?: number; angry?: boolean }> = ({ broken = 0, aunty = 0, angry = true }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    <rect width={1080} height={1920} fill="#E8C3D3" />
    {new Array(10).fill(0).map((_, k) => <rect key={k} x={0} y={k * 200} width={1080} height={8} fill="#000" opacity={0.04} />)}
    <rect x={190} y={330} width={700} height={820} fill="#4A3B33" stroke={INK} strokeWidth={10} />
    <rect x={220} y={360} width={640} height={760} fill="#7FB6CF" />
    <g transform={`translate(0 ${(1 - aunty) * 520})`}>
      <defs><clipPath id="win-aunty"><rect x={220} y={360} width={640} height={760} /></clipPath></defs>
      <g clipPath="url(#win-aunty)">
        <Adult x={540} y={1650} scale={1.25} kind="mummy" mouth={angry ? "open" : "smile"} armR={-150} />
      </g>
    </g>
    <line x1={540} y1={360} x2={540} y2={1120} stroke={INK} strokeWidth={10} />
    <line x1={220} y1={740} x2={860} y2={740} stroke={INK} strokeWidth={10} />
    <rect x={220} y={360} width={640} height={760} fill="#FFFFFF" opacity={0.18 * (1 - broken)} />
    {broken > 0 ? (
      <g stroke="#FFFFFF" strokeWidth={6} opacity={broken} fill="none" strokeLinecap="round">
        {[[0, -1], [0.6, -0.8], [1, -0.1], [0.7, 0.7], [0, 1], [-0.7, 0.6], [-1, -0.1], [-0.5, -0.9]].map(([dx, dy], k) => (
          <polyline key={k} points={`700,560 ${700 + dx * 90},${560 + dy * 70} ${700 + dx * 170 + (k % 2) * 20},${560 + dy * 150} ${700 + dx * 260},${560 + dy * 230}`} />
        ))}
        <circle cx={700} cy={560} r={40} />
      </g>
    ) : null}
    <rect x={160} y={1150} width={760} height={60} fill="#C9A066" stroke={INK} strokeWidth={8} />
    {/* potted tulsi on the sill */}
    <rect x={720} y={1060} width={110} height={90} fill={P.brick} stroke={INK} strokeWidth={6} />
    <path d="M 775 1060 q -40 -80 -10 -140 q 10 50 10 140 q 20 -90 50 -120 q -10 70 -50 120" fill={P.green} stroke={INK} strokeWidth={5} />
  </svg>
);

// floodlit stadium for the "today" twist
export const Stadium: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <rect width={1080} height={1920} fill="#0F1B33" />
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M -40 ${700 + k * 90} Q 540 ${640 + k * 90} 1120 ${700 + k * 90} L 1120 ${790 + k * 90} Q 540 ${730 + k * 90} -40 ${790 + k * 90} Z`} fill={k % 2 ? "#2A3A5E" : "#33466F"} stroke={INK} strokeWidth={4} />
      ))}
      {new Array(260).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * 1080, row = Math.floor(random(`cr${i}`) * 5);
        const y = 712 + row * 90 + random(`cy${i}`) * 60 - Math.sin((x / 1080) * Math.PI) * 55;
        const c = ["#FFC857", "#E88BA0", "#7FE3FF", "#FFFFFF", "#6FA36B", "#D9412B"][i % 6];
        const bob = Math.sin(f / 4 + i) * 3;
        return <circle key={i} cx={x} cy={y + bob} r={9} fill={c} opacity={0.9} />;
      })}
      {[150, 930].map((x, k) => (
        <g key={k}>
          <line x1={x} y1={700} x2={x} y2={260} stroke="#8A93A6" strokeWidth={16} />
          <rect x={x - 90} y={170} width={180} height={110} rx={10} fill="#FFF8D6" stroke={INK} strokeWidth={6} />
          {new Array(6).fill(0).map((_, j) => <circle key={j} cx={x - 60 + (j % 3) * 60} cy={200 + Math.floor(j / 3) * 50} r={18} fill="#FFFFFF" />)}
          <polygon points={`${x - 90},280 ${x + 90},280 ${x + (k ? -420 : 420)},1300 ${x + (k ? -620 : 120)},1300`} fill="#FFF6C8" opacity={0.08} />
        </g>
      ))}
      <path d="M -60 1180 Q 540 1080 1140 1180 L 1140 1920 L -60 1920 Z" fill="#3E8F4E" stroke={INK} strokeWidth={6} />
      {new Array(6).fill(0).map((_, k) => <path key={k} d={`M -60 ${1260 + k * 110} Q 540 ${1170 + k * 110} 1140 ${1260 + k * 110}`} stroke="#4FA35E" strokeWidth={40} fill="none" opacity={0.5} />)}
      <polygon points="470,1200 610,1200 660,1700 420,1700" fill="#D8C59A" stroke={INK} strokeWidth={5} />
      {new Array(5).fill(0).map((_, k) => {
        const on = random(`fl${k}-${Math.floor(f / 7)}`) > 0.6;
        return on ? <circle key={k} cx={100 + random(`fx${k}-${Math.floor(f / 7)}`) * 880} cy={720 + random(`fy${k}-${Math.floor(f / 7)}`) * 400} r={16} fill="#FFFFFF" opacity={0.9} /> : null;
      })}
    </svg>
  );
};

// ---------- post: postcard, pillar letterbox, pen (generic – no real emblem/design) ----------
// Postcard centred at (x, y). `writ` 0..1 fills handwriting on the left half, `stamp` = text in the printed stamp box.
export const Postcard: React.FC<{ x: number; y: number; w?: number; rot?: number; writ?: number; stamp?: string; color?: string; title?: string; blot?: number; seed?: string }> = ({
  x, y, w = 520, rot = 0, writ = 0, stamp = "15 P", color = "#F3DDA6", title = "POST CARD", blot = 0, seed = "pc",
}) => {
  const h = w * 0.62;
  const lines = 6;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={10} fill="rgba(43,22,12,0.3)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={color} stroke={INK} strokeWidth={SW} />
      <text x={-w / 2 + w * 0.05} y={-h / 2 + h * 0.15} fontFamily={typeFont} fontSize={w * 0.06} fill={P.brick}>{title}</text>
      <line x1={w * 0.04} y1={-h / 2 + h * 0.12} x2={w * 0.04} y2={h / 2 - h * 0.08} stroke={P.brick} strokeWidth={3} />
      {/* printed stamp box */}
      <rect x={w / 2 - w * 0.2} y={-h / 2 + h * 0.07} width={w * 0.15} height={w * 0.18} fill="#F7E7C2" stroke={P.brick} strokeWidth={4} strokeDasharray="6 4" />
      <text x={w / 2 - w * 0.125} y={-h / 2 + h * 0.07 + w * 0.115} textAnchor="middle" fontFamily={titleFont} fontSize={w * (stamp.length > 4 ? 0.045 : 0.06)} fill={P.brick}>{stamp}</text>
      {/* address lines */}
      {[0, 1, 2, 3].map((k) => <line key={k} x1={w * 0.1} y1={-h / 2 + h * (0.5 + k * 0.12)} x2={w / 2 - w * 0.06} y2={-h / 2 + h * (0.5 + k * 0.12)} stroke={P.brick} strokeWidth={2.5} opacity={0.7} />)}
      {/* handwriting squiggles */}
      {new Array(lines).fill(0).map((_, k) => {
        const p = Math.max(0, Math.min(1, writ * lines - k));
        if (p <= 0) return null;
        const x0 = -w / 2 + w * 0.06, x1 = x0 + (w * 0.4 - (k === lines - 1 ? w * 0.15 : 0)) * p;
        const yy = -h / 2 + h * (0.28 + k * 0.11);
        let d = `M ${x0} ${yy}`;
        for (let xx = x0; xx < x1; xx += w * 0.025) d += ` q ${w * 0.006} ${-w * 0.028 * (0.6 + random(`${seed}${k}${Math.round(xx)}`) * 0.6)} ${w * 0.0125} 0 t ${w * 0.0125} 0`;
        return <path key={k} d={d} stroke="#1F3A93" strokeWidth={3.5} fill="none" strokeLinecap="round" />;
      })}
      {blot > 0 ? (
        <g transform={`translate(${-w * 0.12} ${h * 0.05}) scale(${blot})`}>
          <path d={`M 0 -${w * 0.07} C ${w * 0.06} -${w * 0.08} ${w * 0.09} -${w * 0.01} ${w * 0.06} ${w * 0.04} C ${w * 0.04} ${w * 0.09} -${w * 0.05} ${w * 0.08} -${w * 0.07} ${w * 0.03} C -${w * 0.1} -${w * 0.02} -${w * 0.06} -${w * 0.06} 0 -${w * 0.07} Z`} fill="#1F3A93" opacity={0.92} />
          <circle cx={w * 0.09} cy={-w * 0.05} r={w * 0.012} fill="#1F3A93" />
          <circle cx={-w * 0.1} cy={w * 0.06} r={w * 0.009} fill="#1F3A93" />
        </g>
      ) : null}
    </g>
  );
};

// Red pillar letterbox, feet at (x, y)
export const LetterBox: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-150} y={-40} width={300} height={40} rx={8} fill={P.concreteDark} stroke={INK} strokeWidth={SW} />
    <path d="M -120 -40 L -120 -560 Q -120 -680 0 -680 Q 120 -680 120 -560 L 120 -40 Z" fill="#D2322A" stroke={INK} strokeWidth={SW} />
    <path d="M -135 -560 Q -135 -700 0 -700 Q 135 -700 135 -560 Z" fill="#B3261F" stroke={INK} strokeWidth={SW} />
    <rect x={-70} y={-500} width={140} height={22} rx={10} fill={INK} />
    <rect x={-70} y={-420} width={140} height={80} rx={8} fill={P.cream} stroke={INK} strokeWidth={5} />
    <text x={0} y={-368} textAnchor="middle" fontFamily={typeFont} fontSize={36} fill={INK}>POST</text>
    <rect x={-90} y={-260} width={180} height={150} rx={10} fill="#BF2B24" stroke={INK} strokeWidth={5} />
    <circle cx={60} cy={-185} r={10} fill={INK} />
    <path d="M -100 -600 Q -80 -650 -30 -660" stroke="#FFFFFF" strokeWidth={10} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

// Ink pen (tip at 0,0), angle in degrees
export const Pen: React.FC<{ x: number; y: number; rot?: number; scale?: number }> = ({ x, y, rot = -35, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d="M 0 0 L 14 -40 L -14 -40 Z" fill="#C9D0D4" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-18} y={-260} width={36} height={222} rx={10} fill="#1F3A93" stroke={INK} strokeWidth={6} />
    <rect x={-20} y={-290} width={40} height={60} rx={10} fill="#2B2B33" stroke={INK} strokeWidth={6} />
    <rect x={14} y={-285} width={10} height={90} rx={4} fill="#C9D0D4" stroke={INK} strokeWidth={4} />
  </g>
);
