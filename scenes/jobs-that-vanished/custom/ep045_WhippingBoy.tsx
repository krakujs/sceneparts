import React from "react";
import { Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../kit/Backdrop";
import { Headline, Tag } from "../kit/Text";
import { C, titleFont, typeFont } from "../theme";
import type { SceneProps } from "../scenes/types";

// ep045 Whipping boy – a Tudor/Stuart royal schoolroom: a smug prince in a ruff, his flinching boy companion,
// a stern tutor holding a birch rod RAISED (never shown striking anyone).
// visual: { mode: "class" | "royal" | "swap" | "guilt" | "myth" | "office", headline?, accent?, top?, size?, tag?, tagY?,
//           float?: string[], floatAt?: number[], floatSide?: "left"|"right", floatTop?,
//           youAt? (swap), stampAt? (myth), answer?, answerAccent?, answerAt?, answerSize?, bubble? (office), sign? (office) }

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const INK = C.ink;
const WALL_A = "#F0D49A";
const WALL_B = "#E2B86E";
const BEAM = "#6B4524";
const OAK = "#8C5A2B";
const OAK_D = "#5E3A1A";
const OAK_L = "#A8703A";
const SKIN = "#F0C7A2";
const SKIN2 = "#E6B489";
const RUFF = "#FBF6EA";
const ROYAL = "#B83A2E";
const ROYAL_D = "#86271F";
const GOLD = "#E0B04A";
const CAP = "#1E1A22";
const FRIEND = "#3F7F5A";
const FRIEND_D = "#2C5E41";
const BLOND = "#E8B85A";
const BROWN = "#7A4A24";
const GOWN = "#2A2433";
const GOWN_HI = "#453C52";
const BEARD = "#D9D4CC";
const BIRCH = "#7A5634";
const BIRCH_L = "#A88456";
const GLASS = "#DDEFF5";
const SWEAT = "#9FD3F0";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const popIn = (f: number, at: number, len = 10) => (f < at ? 0 : interpolate(f - at, [0, len], [0.4, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }));

type FaceKind = "smug" | "tongue" | "flinch" | "guilty" | "shock" | "happy" | "angry" | "sweat";

// face drawn around the head centre (0,0); look: -1..1 shifts the pupils sideways
const Face: React.FC<{ kind: FaceKind; skin: string; look?: number }> = ({ kind, skin, look = 0 }) => {
  const px = look * 7;
  const openEyes = (rx = 17, ry = 15, pr = 7) =>
    [-34, 34].map((x) => (
      <g key={x}>
        <ellipse cx={x} cy={-6} rx={rx} ry={ry} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        <circle cx={x + px} cy={-4} r={pr} fill={INK} />
        <circle cx={x + px - 2} cy={-7} r={2} fill="#FFFFFF" />
      </g>
    ));
  const drop = (x: number, y: number, s = 1) => <path d={`M ${x} ${y} q ${-10 * s} ${18 * s} 0 ${26 * s} q ${10 * s} ${-8 * s} 0 ${-26 * s} Z`} fill={SWEAT} stroke={INK} strokeWidth={3} />;
  const cheeks = [-54, 54].map((x) => <circle key={`c${x}`} cx={x} cy={22} r={15} fill="#E9897A" opacity={0.35} />);
  if (kind === "smug")
    return (
      <g>
        {cheeks}
        {[-34, 34].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={-4} rx={17} ry={12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
            <circle cx={x + 5 + px} cy={-1} r={7} fill={INK} />
            <path d={`M ${x - 19} -4 A 19 14 0 0 1 ${x + 19} -4 Z`} fill={skin} />
            <path d={`M ${x - 20} -4 L ${x + 20} -4`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
          </g>
        ))}
        <path d="M -54 -32 L -18 -30" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <path d="M 16 -40 Q 34 -54 54 -38" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M -26 40 Q 4 56 34 30" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    );
  if (kind === "tongue")
    return (
      <g>
        {cheeks}
        {[-34, 34].map((x) => (
          <path key={x} d={`M ${x - 17} 0 Q ${x} -22 ${x + 17} 0`} stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        ))}
        <path d="M -52 -36 Q -36 -46 -18 -38 M 18 -38 Q 36 -46 52 -36" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M -32 30 Q 0 34 32 30 Q 28 64 0 66 Q -28 64 -32 30 Z" fill="#6E2422" stroke={INK} strokeWidth={5} />
        <path d="M -16 48 Q -18 86 0 88 Q 18 86 16 48 Z" fill="#E86A7A" stroke={INK} strokeWidth={4} />
        <path d="M 0 54 L 0 76" stroke="#C04A5A" strokeWidth={3} />
      </g>
    );
  if (kind === "flinch")
    return (
      <g>
        {cheeks}
        <path d="M -50 -18 L -20 -6 L -50 6" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 50 -18 L 20 -6 L 50 6" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M -56 -34 Q -40 -48 -20 -42 M 20 -42 Q 40 -48 56 -34" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M -30 44 L -18 34 L -6 46 L 6 34 L 18 46 L 30 36" stroke={INK} strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {drop(78, -50)}
        {drop(-86, -30, 0.8)}
      </g>
    );
  if (kind === "guilty")
    return (
      <g>
        {cheeks}
        {openEyes(19, 22, 8)}
        <path d="M -56 -40 Q -38 -42 -22 -56 M 22 -56 Q 38 -42 56 -40" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M -20 46 Q -10 38 0 46 Q 10 54 20 46" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        {drop(80, -44, 1.3)}
      </g>
    );
  if (kind === "shock")
    return (
      <g>
        {cheeks}
        {openEyes(20, 22, 6)}
        <path d="M -54 -46 Q -36 -58 -18 -48 M 18 -48 Q 36 -58 54 -46" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={46} rx={14} ry={18} fill="#6E2422" stroke={INK} strokeWidth={5} />
      </g>
    );
  if (kind === "angry")
    return (
      <g>
        {openEyes(15, 13, 7)}
        <path d="M -56 -40 L -18 -24 M 18 -24 L 56 -40" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M -24 34 Q 0 28 24 34 Q 20 58 0 60 Q -20 58 -24 34 Z" fill="#6E2422" stroke={INK} strokeWidth={5} />
      </g>
    );
  if (kind === "sweat")
    return (
      <g>
        {cheeks}
        {openEyes(18, 20, 6)}
        <path d="M -54 -40 Q -38 -44 -22 -54 M 22 -54 Q 38 -44 54 -40" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M -28 36 L 28 36 L 24 54 L -24 54 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -10 36 L -10 54 M 8 36 L 8 54" stroke={INK} strokeWidth={3} />
        {drop(82, -46, 1.2)}
        {drop(-88, -20, 0.9)}
      </g>
    );
  return (
    <g>
      {cheeks}
      {openEyes()}
      <path d="M -26 34 Q 0 58 26 34" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};

type Costume = "prince" | "friend" | "office";
type Arms = "desk" | "quill" | "toss" | "grip" | "point" | "shrug";
type HairStyle = "bob" | "messy" | "short" | "bun" | "bald";

// a waist-up person (the desk/table hides the legs). Origin = waist centre, facing the viewer.
const Person: React.FC<{
  x: number; y: number; s?: number; f: number; costume: Costume; face: FaceKind; arms?: Arms;
  shrink?: number; lean?: number; jitter?: number; shirt?: string; tie?: string; hair?: string; hairStyle?: HairStyle;
  pointAng?: number; look?: number; tossP?: number; skin?: string; sign?: string;
}> = ({ x, y, s = 1, f, costume, face, arms = "desk", shrink = 0, lean = 0, jitter = 0, shirt, tie, hair, hairStyle, pointAng = 0, look = 0, tossP = 0, skin = SKIN, sign }) => {
  const jx = jitter ? Math.sin(f * 2.3) * jitter : 0;
  const hy = -300 + shrink * 40;
  const breathe = Math.sin(f / 16) * 2;
  const body = costume === "prince" ? ROYAL : costume === "friend" ? FRIEND : shirt ?? "#8DB6D9";
  const bodyD = costume === "prince" ? ROYAL_D : costume === "friend" ? FRIEND_D : INK;
  const hs: HairStyle = hairStyle ?? (costume === "prince" ? "bob" : costume === "friend" ? "messy" : "short");
  const hc = hair ?? (costume === "prince" ? BLOND : BROWN);
  const L: [number, number] = [-92, -176 + shrink * 10];
  const R: [number, number] = [92, -176 + shrink * 10];
  type Arm = { from: [number, number]; ctrl: [number, number]; to: [number, number] };
  let la: Arm = { from: L, ctrl: [-150, -90], to: [-100, -8] };
  let ra: Arm = { from: R, ctrl: [150, -90], to: [100, -8] };
  if (arms === "quill") ra = { from: R, ctrl: [190, -170], to: [168, -290] };
  if (arms === "toss") {
    const hx = lerp(130, 40, tossP);
    const hyy = lerp(-90, -360, tossP);
    ra = { from: R, ctrl: [180, -180], to: [hx, hyy] };
  }
  if (arms === "grip") {
    la = { from: L, ctrl: [-140, -110], to: [-74, -6] };
    ra = { from: R, ctrl: [140, -110], to: [74, -6] };
  }
  if (arms === "shrug") {
    la = { from: L, ctrl: [-180, -110], to: [-196, -236] };
    ra = { from: R, ctrl: [180, -110], to: [196, -236] };
  }
  let finger: React.ReactNode = null;
  if (arms === "point") {
    const a = (pointAng * Math.PI) / 180;
    const to: [number, number] = [R[0] + Math.cos(a) * 230, R[1] + Math.sin(a) * 230];
    ra = { from: R, ctrl: [R[0] + Math.cos(a) * 115, R[1] + Math.sin(a) * 115 + 10], to };
    finger = <path d={`M ${to[0]} ${to[1]} L ${to[0] + Math.cos(a) * 44} ${to[1] + Math.sin(a) * 44}`} stroke={skin} strokeWidth={14} strokeLinecap="round" />;
  }
  const sleeve = (a: Arm, k: string) => (
    <g key={k}>
      <path d={`M ${a.from[0]} ${a.from[1]} Q ${a.ctrl[0]} ${a.ctrl[1]} ${a.to[0]} ${a.to[1]}`} stroke={INK} strokeWidth={64} fill="none" strokeLinecap="round" />
      <path d={`M ${a.from[0]} ${a.from[1]} Q ${a.ctrl[0]} ${a.ctrl[1]} ${a.to[0]} ${a.to[1]}`} stroke={body} strokeWidth={50} fill="none" strokeLinecap="round" />
      {costume === "prince" ? (
        <path d={`M ${lerp(a.from[0], a.ctrl[0], 0.5)} ${lerp(a.from[1], a.ctrl[1], 0.5)} l 0 22 M ${lerp(a.from[0], a.ctrl[0], 0.8)} ${lerp(a.from[1], a.ctrl[1], 0.8)} l 0 22`} stroke={RUFF} strokeWidth={6} strokeLinecap="round" />
      ) : null}
      <circle cx={a.to[0]} cy={a.to[1]} r={24} fill={skin} stroke={INK} strokeWidth={5} />
    </g>
  );
  return (
    <g transform={`translate(${x + jx} ${y}) scale(${s}) rotate(${lean})`}>
      {/* torso */}
      <path d={`M -100 6 L -112 -150 Q -112 -200 -64 -206 L 64 -206 Q 112 -200 112 -150 L 100 6 Z`} fill={body} stroke={INK} strokeWidth={7} strokeLinejoin="round" transform={`translate(0 ${breathe})`} />
      {costume === "prince" ? (
        <g transform={`translate(0 ${breathe})`}>
          <path d="M -40 -200 L -30 4 L 30 4 L 40 -200 Z" fill={GOLD} stroke={INK} strokeWidth={5} />
          {[-160, -116, -72, -28].map((yy) => <circle key={yy} cx={0} cy={yy} r={8} fill={RUFF} stroke={bodyD} strokeWidth={3} />)}
          {[-84, 84].map((xx) => <path key={xx} d={`M ${xx - 10} -150 L ${xx + 6} -40`} stroke={GOLD} strokeWidth={6} strokeLinecap="round" />)}
        </g>
      ) : costume === "friend" ? (
        <g transform={`translate(0 ${breathe})`}>
          <path d="M 0 -200 L 0 4" stroke={bodyD} strokeWidth={6} />
          {[-160, -120, -80, -40].map((yy) => <path key={yy} d={`M -14 ${yy} L 14 ${yy + 14} M 14 ${yy} L -14 ${yy + 14}`} stroke={RUFF} strokeWidth={4} />)}
        </g>
      ) : (
        <g transform={`translate(0 ${breathe})`}>
          <path d="M -40 -206 L 0 -150 L 40 -206 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          {tie ? <path d="M -12 -168 L 12 -168 L 18 -40 L 0 -16 L -18 -40 Z" fill={tie} stroke={INK} strokeWidth={5} strokeLinejoin="round" /> : null}
        </g>
      )}
      {sleeve(la, "l")}
      {sleeve(ra, "r")}
      {finger}
      {arms === "quill" ? (
        <g transform={`translate(${ra.to[0]} ${ra.to[1]}) rotate(${Math.sin(f / 4) * 14})`}>
          <path d="M 0 0 L 40 -120" stroke={INK} strokeWidth={4} />
          <path d="M 8 -30 Q 70 -110 44 -170 Q 10 -110 8 -30 Z" fill={RUFF} stroke={INK} strokeWidth={4} />
        </g>
      ) : null}
      {sign ? (
        <g transform={`translate(0 ${breathe}) rotate(${Math.sin(f / 9) * 2})`}>
          <path d="M -70 -200 L -110 -150 M 70 -200 L 110 -150" stroke={INK} strokeWidth={4} />
          <rect x={-150} y={-160} width={300} height={104} rx={8} fill="#E9D3A3" stroke={INK} strokeWidth={6} />
          <text x={0} y={-94} textAnchor="middle" fontFamily={titleFont} fontSize={44} fill={C.brick} textLength={268} lengthAdjust="spacingAndGlyphs">
            {sign}
          </text>
        </g>
      ) : null}
      {/* collar / ruff */}
      {costume === "office" ? null : (
        <g transform={`translate(0 ${-212 + shrink * 22})`}>
          {new Array(costume === "prince" ? 14 : 9).fill(0).map((_, i, arr) => {
            const t = i / (arr.length - 1);
            const w = costume === "prince" ? 104 : 80;
            return <ellipse key={i} cx={-w + t * 2 * w} cy={Math.sin(t * Math.PI) * -6} rx={costume === "prince" ? 20 : 16} ry={costume === "prince" ? 30 : 20} fill={RUFF} stroke={INK} strokeWidth={4} />;
          })}
        </g>
      )}
      {/* head */}
      <g transform={`translate(0 ${hy})`}>
        <circle cx={-88} cy={6} r={18} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={88} cy={6} r={18} fill={skin} stroke={INK} strokeWidth={5} />
        <circle cx={0} cy={0} r={88} fill={skin} stroke={INK} strokeWidth={7} />
        {hs === "bob" ? <path d="M -96 34 Q -112 -96 0 -104 Q 112 -96 96 34 Q 86 -10 76 -40 Q 0 -30 -76 -40 Q -86 -10 -96 34 Z" fill={hc} stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
        {hs === "messy" ? <path d="M -92 6 Q -102 -86 -42 -98 L -34 -128 L -8 -100 L 12 -132 L 30 -98 L 62 -118 L 64 -86 Q 102 -60 92 6 Q 72 -46 0 -50 Q -70 -46 -92 6 Z" fill={hc} stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
        {hs === "short" || hs === "bun" ? <path d="M -90 -8 Q -98 -100 0 -100 Q 98 -100 90 -8 Q 72 -58 0 -60 Q -72 -58 -90 -8 Z" fill={hc} stroke={INK} strokeWidth={6} strokeLinejoin="round" /> : null}
        {hs === "bun" ? <circle cx={0} cy={-112} r={34} fill={hc} stroke={INK} strokeWidth={6} /> : null}
        {hs === "bald" ? <path d="M -92 20 Q -96 -30 -78 -44 L -70 10 Z M 92 20 Q 96 -30 78 -44 L 70 10 Z" fill={hc} stroke={INK} strokeWidth={5} /> : null}
        <Face kind={face} skin={skin} look={look} />
        {costume === "prince" ? (
          <g transform="rotate(-10)">
            <path d="M -74 -78 Q -64 -142 10 -144 Q 84 -142 92 -78 Z" fill={CAP} stroke={INK} strokeWidth={6} />
            <ellipse cx={10} cy={-76} rx={112} ry={24} fill={CAP} stroke={INK} strokeWidth={6} />
            <path d="M 56 -112 Q 156 -160 150 -54 Q 126 -112 56 -98 Z" fill={RUFF} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
            <circle cx={36} cy={-104} r={12} fill={GOLD} stroke={INK} strokeWidth={4} />
            {[-30, -10, 10, 30, 50, 70].map((k) => <circle key={k} cx={k} cy={-84} r={4} fill={RUFF} />)}
          </g>
        ) : null}
      </g>
    </g>
  );
};

// a birch rod: a bundle of thin twigs bound at the handle; origin = the grip, pointing up (rotate with ang)
const Rod: React.FC<{ len?: number }> = ({ len = 310 }) => (
  <g>
    {[-2, -1, 0, 1, 2].map((k) => (
      <g key={k}>
        <path d={`M ${k * 3} 20 Q ${k * 8} ${-len * 0.5} ${k * 16} ${-len}`} stroke={INK} strokeWidth={13} fill="none" strokeLinecap="round" />
        <path d={`M ${k * 3} 20 Q ${k * 8} ${-len * 0.5} ${k * 16} ${-len}`} stroke={k % 2 ? BIRCH : BIRCH_L} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d={`M ${k * 10} ${-len * 0.62} l ${k >= 0 ? 18 : -18} -26`} stroke={BIRCH} strokeWidth={4} strokeLinecap="round" />
      </g>
    ))}
    <rect x={-16} y={-40} width={32} height={46} rx={8} fill="#B5452F" stroke={INK} strokeWidth={4} />
    <path d="M -16 -28 L 16 -22 M -16 -12 L 16 -6" stroke={INK} strokeWidth={3} />
  </g>
);

// the tutor: black scholar's gown, white bands, grey beard, spectacles, square cap. Faces left (toward the boys).
// Origin = feet centre. rod 0..1 (1 = birch raised high by his head, frozen in the air); face: stern | nervous
const Tutor: React.FC<{ x: number; y: number; s?: number; f: number; rod?: number; face?: "stern" | "nervous"; tremble?: number; pointAt?: boolean }> = ({ x, y, s = 1, f, rod = 1, face = "stern", tremble = 0.4, pointAt = true }) => {
  const sway = Math.sin(f / 20) * 2;
  const hand: [number, number] = [lerp(150, 190, rod), lerp(-440, -930, rod)];
  const ang = lerp(150, -12, rod) + Math.sin(f * 1.7) * tremble * 3;
  const elbow: [number, number] = [lerp(200, 250, rod), lerp(-600, -800, rod)];
  const fh: [number, number] = pointAt ? [-210, -600 + Math.sin(f / 5) * 10] : [-120, -440];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={170} ry={22} fill="#000" opacity={0.18} />
      <ellipse cx={-50} cy={-12} rx={44} ry={16} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <ellipse cx={46} cy={-12} rx={40} ry={16} fill="#1A1614" stroke={INK} strokeWidth={4} />
      <g transform={`rotate(${sway * 0.3})`}>
        {/* gown */}
        <path d="M -112 -770 Q -150 -400 -176 -22 L 176 -22 Q 150 -400 112 -770 Q 0 -800 -112 -770 Z" fill={GOWN} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <path d="M -20 -760 Q -40 -400 -60 -40 M 24 -760 Q 44 -400 64 -40" stroke={GOWN_HI} strokeWidth={8} fill="none" />
        <path d="M -40 -760 L -24 -40 L 24 -40 L 36 -760 Z" fill="#3B2F4A" opacity={0.6} />
        {/* raised arm (his right, behind the head) with the birch */}
        <path d={`M 90 -730 Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={INK} strokeWidth={82} fill="none" strokeLinecap="round" />
        <path d={`M 90 -730 Q ${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`} stroke={GOWN} strokeWidth={68} fill="none" strokeLinecap="round" />
        <g transform={`translate(${hand[0]} ${hand[1]}) rotate(${ang})`}>
          <Rod />
        </g>
        <circle cx={hand[0]} cy={hand[1]} r={30} fill={SKIN2} stroke={INK} strokeWidth={6} />
        {/* front arm: wagging finger at the boys */}
        <path d={`M -86 -720 Q -190 -640 ${fh[0]} ${fh[1]}`} stroke={INK} strokeWidth={80} fill="none" strokeLinecap="round" />
        <path d={`M -86 -720 Q -190 -640 ${fh[0]} ${fh[1]}`} stroke={GOWN} strokeWidth={66} fill="none" strokeLinecap="round" />
        <circle cx={fh[0]} cy={fh[1]} r={28} fill={SKIN2} stroke={INK} strokeWidth={6} />
        {pointAt ? <path d={`M ${fh[0] - 10} ${fh[1] - 14} L ${fh[0] - 30} ${fh[1] - 62}`} stroke={SKIN2} strokeWidth={16} strokeLinecap="round" /> : null}
        {/* white bands */}
        <path d="M -18 -776 L -4 -776 L -6 -712 L -22 -712 Z M 4 -776 L 18 -776 L 22 -712 L 6 -712 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} />
        {/* head */}
        <circle cx={0} cy={-880} r={94} fill={SKIN2} stroke={INK} strokeWidth={7} />
        <path d="M -86 -872 Q -88 -760 0 -722 Q 88 -760 86 -872 Q 62 -818 0 -824 Q -62 -818 -86 -872 Z" fill={BEARD} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -40 -836 Q -20 -850 0 -840 Q 20 -850 40 -836" stroke={INK} strokeWidth={5} fill={BEARD} />
        <path d={face === "nervous" ? "M -18 -804 Q 0 -812 18 -804" : "M -22 -800 Q 0 -814 22 -800"} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -14 -886 Q -48 -846 -16 -846" stroke={INK} strokeWidth={5} fill="#E9A07A" />
        {[-44, 22].map((ex) => (
          <g key={ex}>
            <circle cx={ex} cy={-894} r={22} fill={GLASS} opacity={0.6} stroke={INK} strokeWidth={4} />
            <circle cx={ex - 6} cy={-892} r={6} fill={INK} />
          </g>
        ))}
        <path d="M -22 -896 L 0 -896" stroke={INK} strokeWidth={4} />
        <path d={face === "nervous" ? "M -70 -934 Q -50 -948 -26 -928 M 2 -928 Q 24 -948 46 -934" : "M -70 -936 L -24 -918 M 0 -918 L 46 -936"} stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
        {face === "nervous" ? <path d="M 86 -930 q -12 22 0 32 q 12 -10 0 -32 Z" fill={SWEAT} stroke={INK} strokeWidth={3} /> : null}
        {/* square cap */}
        <path d="M -98 -950 Q 0 -990 98 -950 L 94 -986 Q 0 -1010 -94 -986 Z" fill={CAP} stroke={INK} strokeWidth={6} />
        <path d="M -124 -990 L 0 -1034 L 124 -990 L 0 -954 Z" fill={CAP} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={0} cy={-994} r={10} fill={GOLD} stroke={INK} strokeWidth={3} />
      </g>
    </g>
  );
};

// Tudor schoolroom: warm plaster between oak beams, a leaded diamond-pane window with sunlight, linenfold dado, plank floor.
const Schoolroom: React.FC<{ f: number; floorY?: number }> = ({ f, floorY = 1320 }) => (
  <>
    <rect x={0} y={0} width={1080} height={1920} fill="url(#ep045wall)" />
    <path d="M 120 760 L 430 760 L 760 1700 L -200 1700 Z" fill="#FFF4D2" opacity={0.18 + Math.sin(f / 30) * 0.03} />
    {[-10, 500, 1040].map((bx) => <rect key={bx} x={bx} y={0} width={50} height={floorY} fill={BEAM} stroke={INK} strokeWidth={5} />)}
    <rect x={0} y={0} width={1080} height={60} fill={BEAM} stroke={INK} strokeWidth={5} />
    <path d="M 40 60 L 500 340 M 1040 60 L 550 340" stroke={BEAM} strokeWidth={30} opacity={0.0} />
    {/* leaded window */}
    <g transform="translate(110 430)">
      <rect x={-16} y={-16} width={352} height={372} fill={OAK_D} stroke={INK} strokeWidth={6} />
      <rect x={0} y={0} width={320} height={340} fill="#CFE8F0" />
      <circle cx={240} cy={90} r={70} fill="#FFF6D6" opacity={0.8} />
      <g opacity={0.65}>
        {new Array(9).fill(0).map((_, i) => (
          <path key={`a${i}`} d={`M ${i * 40 - 160} 0 L ${i * 40 + 180} 340`} stroke="#6E6A60" strokeWidth={3} />
        ))}
        {new Array(9).fill(0).map((_, i) => (
          <path key={`b${i}`} d={`M ${i * 40 + 160} 0 L ${i * 40 - 180} 340`} stroke="#6E6A60" strokeWidth={3} />
        ))}
      </g>
      <rect x={0} y={0} width={320} height={340} fill="none" stroke={OAK_D} strokeWidth={10} />
      <path d="M 160 0 L 160 340" stroke={OAK_D} strokeWidth={12} />
      <rect x={-30} y={340} width={380} height={26} fill={OAK_L} stroke={INK} strokeWidth={5} />
    </g>
    {/* linenfold dado */}
    <rect x={0} y={floorY - 250} width={1080} height={250} fill={OAK} stroke={INK} strokeWidth={5} />
    {[20, 230, 440, 650, 860].map((px) => (
      <g key={px}>
        <rect x={px} y={floorY - 228} width={190} height={206} rx={10} fill={OAK_L} stroke={OAK_D} strokeWidth={6} />
        {[0, 1, 2].map((k) => <path key={k} d={`M ${px + 40 + k * 55} ${floorY - 210} Q ${px + 62 + k * 55} ${floorY - 125} ${px + 40 + k * 55} ${floorY - 40}`} fill="none" stroke={OAK_D} strokeWidth={4} opacity={0.6} />)}
      </g>
    ))}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill="#9C6A3C" />
    {new Array(10).fill(0).map((_, k) => <path key={k} d={`M 0 ${floorY + 30 + k * 64} L 1080 ${floorY + 30 + k * 64}`} stroke="#7A5030" strokeWidth={5} />)}
  </>
);

// school desk (top at y), from x0 to x1; with a book, inkpot and quill on top
const Desk: React.FC<{ y: number; x0?: number; x1?: number; f: number; book?: boolean }> = ({ y, x0 = 30, x1 = 770, f, book = true }) => (
  <g>
    <rect x={x0 + 20} y={y + 30} width={x1 - x0 - 40} height={420} fill={OAK} stroke={INK} strokeWidth={7} />
    {new Array(Math.max(1, Math.floor((x1 - x0 - 60) / 180))).fill(0).map((_, i) => (
      <rect key={i} x={x0 + 50 + i * 180} y={y + 70} width={150} height={260} rx={12} fill={OAK_L} stroke={OAK_D} strokeWidth={5} />
    ))}
    <rect x={x0} y={y - 10} width={x1 - x0} height={44} rx={8} fill={OAK_L} stroke={INK} strokeWidth={7} />
    {book ? (
      <g transform={`translate(${x0 + 150} ${y - 8})`}>
        <path d="M -110 0 L -100 -26 Q -50 -36 0 -22 Q 50 -36 100 -26 L 110 0 Q 50 -12 0 4 Q -50 -12 -110 0 Z" fill={RUFF} stroke={INK} strokeWidth={5} />
        <path d="M -80 -20 L -20 -14 M -80 -10 L -24 -6 M 20 -14 L 80 -20 M 24 -6 L 80 -10" stroke="#9A8F7A" strokeWidth={3} />
      </g>
    ) : null}
    <g transform={`translate(${x1 - 110} ${y - 8})`}>
      <path d="M -26 0 L -20 -44 L 20 -44 L 26 0 Z" fill="#2C2A33" stroke={INK} strokeWidth={5} />
      <path d={`M 4 -40 Q ${30 + Math.sin(f / 12) * 4} -120 ${18 + Math.sin(f / 12) * 4} -170 Q -6 -110 4 -40 Z`} fill={RUFF} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

const Burst: React.FC<{ x: number; y: number; p: number; text: string; size?: number; rot?: number; fill?: string; r?: number }> = ({ x, y, p, text, size = 110, rot = -6, fill = C.mustard, r = 200 }) => {
  if (p <= 0) return null;
  const pts = new Array(32)
    .fill(0)
    .map((_, i) => {
      const a = (i / 32) * Math.PI * 2;
      const rr = i % 2 ? r * 0.72 : r;
      return `${Math.cos(a) * rr * 1.25},${Math.sin(a) * rr * 0.8}`;
    })
    .join(" ");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${p})`}>
      <polygon points={pts} fill={fill} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={titleFont} fontSize={size} fill={INK}>
        {text}
      </text>
    </g>
  );
};

const Floats: React.FC<{ items: string[]; f: number; dur: number; top?: number; at?: number[]; side?: "left" | "right" }> = ({ items, f, dur, top = 420, at, side }) => (
  <>
    {items.map((t, i) => {
      const start = at?.[i] !== undefined ? at[i] * dur : 6 + i * Math.max(12, (dur - 20) / Math.max(1, items.length));
      const age = f - start;
      if (age < 0) return null;
      const left = side ? side === "left" : i % 2 === 0;
      return (
        <div key={i} style={{ position: "absolute", ...(left ? { left: 80 } : { right: 170 }), top: top + i * 120 - Math.min(age, 30) * 1.2, fontFamily: typeFont, fontSize: 52, color: INK, background: C.cream, border: `5px solid ${INK}`, borderRadius: 14, padding: "8px 22px", whiteSpace: "nowrap", rotate: i % 2 ? "3deg" : "-3deg", boxShadow: "0 8px 0 rgba(0,0,0,0.3)", opacity: interpolate(age, [0, 5], [0, 1], clamp), scale: interpolate(age, [0, 10], [0.6, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) }) }}>
          {t}
        </div>
      );
    })}
  </>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ep045wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={WALL_A} />
      <stop offset="1" stopColor={WALL_B} />
    </linearGradient>
    <linearGradient id="ep045office" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#E4EEF2" />
      <stop offset="1" stopColor="#C9DAE2" />
    </linearGradient>
    <radialGradient id="ep045aura">
      <stop offset="0" stopColor="#FFE9A6" stopOpacity={0.95} />
      <stop offset="1" stopColor="#FFE9A6" stopOpacity={0} />
    </radialGradient>
    <clipPath id="ep045pic">
      <rect x={600} y={540} width={360} height={560} />
    </clipPath>
    <filter id="ep045shadow">
      <feColorMatrix type="matrix" values="0 0 0 0 0.24  0 0 0 0 0.16  0 0 0 0 0.10  0 0 0 0.5 0" />
    </filter>
  </defs>
);

// the hook tableau: smug prince (tongue out, quill) · flinching companion · tutor with the birch raised
const Tableau: React.FC<{ f: number; prince?: FaceKind; princeArms?: Arms; tossP?: number; friendS?: number; friendX?: number; friendJ?: number; tutorX?: number; deskY?: number }> = ({ f, prince = "tongue", princeArms = "quill", tossP = 0, friendS = 1.25, friendX = 585, friendJ = 3, tutorX = 775, deskY = 1290 }) => (
  <>
    <Tutor x={tutorX} y={1740} s={1.1} f={f} rod={1} />
    <Person x={235} y={deskY} s={1.38} f={f} costume="prince" face={prince} arms={princeArms} tossP={tossP} />
    <Person x={friendX} y={deskY + 4} s={friendS} f={f} costume="friend" face="flinch" arms="grip" shrink={1} lean={-6} jitter={friendJ} skin={SKIN2} />
    {/* "frozen" motion ticks around the raised rod and the flinch */}
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M ${tutorX + 60 - k * 8} ${430 + k * 50} l -34 ${-8 + k * 8}`} stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.7 + Math.sin(f / 3 + k) * 0.3} />
    ))}
    {[0, 1, 2].map((k) => (
      <path key={`n${k}`} d={`M ${friendX - 150 - k * 10} ${deskY - 420 + k * 46} l -44 ${-12 + k * 12}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
    ))}
    <Desk y={deskY} f={f} />
  </>
);

// open chronicle with the whipping-boy story; right page = little picture of the schoolroom
const Book: React.FC<{ f: number; title?: string; titleLift?: number }> = ({ f, title = "THE WHIPPING BOY", titleLift = 0 }) => (
  <g>
    <path d="M 60 1200 L 70 470 Q 300 430 540 490 Q 780 430 1010 470 L 1020 1200 Q 780 1160 540 1220 Q 300 1160 60 1200 Z" fill="#6B4524" stroke={INK} strokeWidth={8} />
    <path d="M 80 1180 L 90 490 Q 300 456 536 508 L 536 1196 Q 300 1146 80 1180 Z" fill="#F5E9CC" stroke={INK} strokeWidth={6} />
    <path d="M 544 508 Q 780 456 990 490 L 1000 1180 Q 780 1146 544 1196 Z" fill="#F5E9CC" stroke={INK} strokeWidth={6} />
    <path d="M 540 500 L 540 1210" stroke={INK} strokeWidth={6} />
    <g opacity={1 - titleLift * 0.2} transform={`translate(0 ${-titleLift * 420}) rotate(${titleLift * -8} 310 600)`}>
      <text x={310} y={620} textAnchor="middle" fontFamily={titleFont} fontSize={60} fill={C.brick} textLength={380} lengthAdjust="spacingAndGlyphs">
        {title}
      </text>
    </g>
    <text x={150} y={760} fontFamily={titleFont} fontSize={110} fill={C.brick}>
      A
    </text>
    {new Array(12).fill(0).map((_, k) => (
      <path key={k} d={`M ${k < 3 ? 240 : 140} ${680 + k * 38} L ${470 - (k % 3) * 20} ${680 + k * 38}`} stroke="#A89C82" strokeWidth={8} strokeLinecap="round" />
    ))}
    <rect x={590} y={530} width={380} height={580} fill="none" stroke={OAK_D} strokeWidth={10} />
    <g clipPath="url(#ep045pic)">
      <rect x={600} y={540} width={360} height={560} fill={WALL_A} />
      <rect x={600} y={1000} width={360} height={100} fill="#9C6A3C" />
      <Tutor x={880} y={1080} s={0.36} f={f} rod={1} />
      <Person x={680} y={985} s={0.42} f={f} costume="prince" face="smug" />
      <Person x={800} y={990} s={0.4} f={f} costume="friend" face="flinch" arms="grip" shrink={1} skin={SKIN2} />
      <rect x={600} y={985} width={300} height={120} fill={OAK} stroke={INK} strokeWidth={4} />
    </g>
  </g>
);

// modern office meeting: everyone points at one man wearing a WHIPPING BOY sign
const Office: React.FC<{ f: number; sign: string; bubble?: string; bubbleP: number }> = ({ f, sign, bubble, bubbleP }) => {
  const target: [number, number] = [860, 960];
  const ang = (x: number, y: number, s: number) => (Math.atan2(target[1] - (y - 176 * s), target[0] - (x + 92 * s)) * 180) / Math.PI;
  return (
    <>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#ep045office)" />
      <g transform="translate(600 440)">
        <rect x={0} y={0} width={440} height={380} fill="#9FD0EE" stroke={INK} strokeWidth={8} />
        {[[20, 200, 90], [120, 140, 80], [210, 230, 70], [290, 110, 100], [400, 180, 60]].map(([bx, bh, bw], i) => (
          <rect key={i} x={bx} y={380 - bh} width={bw} height={bh} fill={i % 2 ? "#6E8CA8" : "#58738F"} stroke={INK} strokeWidth={4} />
        ))}
        <path d="M 220 0 L 220 380" stroke={INK} strokeWidth={8} />
      </g>
      <g transform="translate(70 450)">
        <rect x={0} y={0} width={440} height={300} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={8} />
        <path d="M 40 60 L 140 110 L 220 90 L 320 200 L 380 250" stroke={C.brick} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 350 254 L 392 262 L 384 222" stroke={C.brick} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 40 40 L 40 270 L 410 270" stroke={INK} strokeWidth={6} fill="none" />
      </g>
      <Person x={560} y={1250} s={1.08} f={f} costume="office" face="angry" arms="point" pointAng={ang(560, 1250, 1.08)} shirt="#3B4A6B" hairStyle="bald" hair="#8A8078" tie={C.brick} skin={SKIN2} />
      <Person x={340} y={1250} s={1.0} f={f} costume="office" face="angry" arms="point" pointAng={ang(340, 1250, 1.0)} shirt={C.mustard} hairStyle="short" hair="#2A2420" tie={C.teal} />
      <Person x={130} y={1250} s={0.92} f={f} costume="office" face="angry" arms="point" pointAng={ang(130, 1250, 0.92)} shirt="#E07A5F" hairStyle="bun" hair="#3A2A22" skin="#C98C62" />
      <Person x={target[0]} y={1250} s={1.15} f={f} costume="office" face="sweat" arms="shrug" shirt="#8DB6D9" hairStyle="messy" hair={BROWN} jitter={2} sign={sign} />
      <rect x={0} y={1236} width={1080} height={40} fill="#B9C2CA" stroke={INK} strokeWidth={6} />
      <rect x={0} y={1276} width={1080} height={644} fill="#7C8792" />
      {[200, 460, 760].map((cx) => (
        <g key={cx} transform={`translate(${cx} 1232)`}>
          <rect x={-30} y={-60} width={60} height={60} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <path d="M 30 -46 Q 54 -40 30 -18" stroke={INK} strokeWidth={5} fill="none" />
        </g>
      ))}
      {bubble && bubbleP > 0 ? (
        <g transform={`translate(330 690) scale(${bubbleP})`}>
          <path d="M -200 -80 L 200 -80 Q 230 -80 230 -50 L 230 50 Q 230 80 200 80 L 60 80 L 20 140 L 10 80 L -200 80 Q -230 80 -230 50 L -230 -50 Q -230 -80 -200 -80 Z" fill="#FFFFFF" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <text x={0} y={28} textAnchor="middle" fontFamily={titleFont} fontSize={80} fill={INK} textLength={400} lengthAdjust="spacingAndGlyphs">
            {bubble}
          </text>
        </g>
      ) : null}
    </>
  );
};

export const WhippingBoy: React.FC<SceneProps> = ({ scene, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const mode: string = v.mode ?? "class";
  const float: string[] = v.float ?? [];
  let headline: string | undefined = v.headline;
  let body: React.ReactNode = null;
  const answerAt = (v.answerAt ?? 0.35) * dur;

  if (mode === "class") {
    // frame 0: the whole joke at once – prince sticks his tongue out, the companion flinches, the birch is raised
    body = (
      <>
        <Schoolroom f={f} />
        <Tableau f={f} />
      </>
    );
  } else if (mode === "royal") {
    // the legend: a golden "royal" aura around the prince; the tutor's rod trembles, he doesn't dare
    const aura = popIn(f, 2, 12);
    body = (
      <>
        <Schoolroom f={f} floorY={1500} />
        <g transform={`translate(430 900) scale(${aura}) rotate(${f * 0.6})`}>
          {new Array(16).fill(0).map((_, k) => (
            <path key={k} d={`M 0 0 L ${Math.cos((k / 16) * Math.PI * 2 - 0.08) * 620} ${Math.sin((k / 16) * Math.PI * 2 - 0.08) * 620} L ${Math.cos((k / 16) * Math.PI * 2 + 0.08) * 620} ${Math.sin((k / 16) * Math.PI * 2 + 0.08) * 620} Z`} fill="#FFE9A6" opacity={0.55} />
          ))}
        </g>
        <circle cx={430} cy={900} r={420 * aura} fill="url(#ep045aura)" />
        <Tutor x={880} y={1900} s={1.0} f={f} rod={1} face="nervous" tremble={2.2} pointAt={false} />
        <Person x={420} y={1500} s={2.0} f={f} costume="prince" face="smug" arms="desk" />
        <Desk y={1500} x0={-20} x1={760} f={f} book={false} />
      </>
    );
  } else if (mode === "swap") {
    // the prince tosses his Latin book; the rod stays on the companion: YOU!
    const tossP = ease(f, 0, 14);
    const bt = ease(f, 6, 26);
    const youAt = (v.youAt ?? 0.55) * dur;
    const bx = lerp(300, -160, bt);
    const by = 860 - Math.sin(bt * Math.PI) * 360;
    body = (
      <>
        <Schoolroom f={f} />
        <Tableau f={f} prince="smug" princeArms="toss" tossP={tossP} friendS={1.4} friendX={590} friendJ={f > youAt ? 5 : 2} />
        {bt > 0 && bt < 1 ? (
          <g transform={`translate(${bx} ${by}) rotate(${bt * -540})`}>
            <rect x={-80} y={-56} width={160} height={112} rx={8} fill={C.brick} stroke={INK} strokeWidth={6} />
            <rect x={-66} y={-44} width={132} height={88} rx={4} fill="none" stroke={GOLD} strokeWidth={4} />
            <text x={0} y={14} textAnchor="middle" fontFamily={titleFont} fontSize={40} fill={GOLD}>
              LATIN
            </text>
          </g>
        ) : null}
        <Burst x={560} y={520} p={popIn(f, youAt, 8)} text="YOU!" size={120} rot={-8} r={170} />
      </>
    );
  } else if (mode === "guilt") {
    // close on the prince: he watches the rod's shadow on the wall and squirms
    body = (
      <>
        <Schoolroom f={f} floorY={1560} />
        <g filter="url(#ep045shadow)">
          <Tutor x={930} y={1380} s={0.62} f={f} rod={1} />
          <Person x={760} y={1150} s={0.7} f={f} costume="friend" face="flinch" arms="grip" shrink={1} jitter={3} />
        </g>
        <Person x={400} y={1600} s={2.35} f={f} costume="prince" face="guilty" arms="grip" look={1} jitter={interpolate(f, [0, dur], [0, 3], clamp)} />
        <Desk y={1600} x0={-20} x1={860} f={f} book={false} />
      </>
    );
  } else if (mode === "myth") {
    // historians: true… or myth? A chronicle page gets a red MYTH? stamp
    const stampAt = (v.stampAt ?? 0.7) * dur;
    const sp = f < stampAt ? 0 : interpolate(f - stampAt, [0, 6], [2.2, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    const shake = f >= stampAt ? Math.sin((f - stampAt) * 2.4) * interpolate(f - stampAt, [0, 10], [10, 0], clamp) : 0;
    const gx = interpolate(f, [0, stampAt], [220, 820], clamp);
    const gy = 760 + Math.sin(f / 7) * 40;
    body = (
      <>
        <rect x={0} y={0} width={1080} height={1920} fill={OAK_D} />
        {new Array(8).fill(0).map((_, k) => <path key={k} d={`M 0 ${180 + k * 240} Q 540 ${150 + k * 240} 1080 ${190 + k * 240}`} stroke="#4A2D14" strokeWidth={10} fill="none" />)}
        <g transform={`translate(${shake} 0)`}>
          <Book f={f} />
        </g>
        {sp > 0 ? (
          <g transform={`translate(540 860) rotate(-12) scale(${sp})`} opacity={interpolate(f - stampAt, [0, 3], [0, 0.92], clamp)}>
            <rect x={-300} y={-110} width={600} height={220} rx={24} fill="none" stroke={C.brick} strokeWidth={18} />
            <text x={0} y={60} textAnchor="middle" fontFamily={titleFont} fontSize={170} fill={C.brick} textLength={520} lengthAdjust="spacingAndGlyphs">
              MYTH?
            </text>
          </g>
        ) : null}
        <g transform={`translate(${gx} ${gy}) rotate(-30)`}>
          <path d="M 0 110 L 0 330" stroke={INK} strokeWidth={50} strokeLinecap="round" />
          <path d="M 0 110 L 0 330" stroke={OAK} strokeWidth={36} strokeLinecap="round" />
          <circle r={110} fill={GLASS} opacity={0.35} stroke={INK} strokeWidth={14} />
          <circle r={110} fill="none" stroke={GOLD} strokeWidth={6} />
          <path d="M -60 -40 Q -40 -70 -10 -76" stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.8} />
        </g>
      </>
    );
  } else if (mode === "office") {
    // twist: the words WHIPPING BOY lift off the chronicle → drop + flash → a modern office blames one guy
    if (f < answerAt) {
      const lift = ease(f, answerAt * 0.35, answerAt);
      body = (
        <>
          <rect x={0} y={0} width={1080} height={1920} fill={OAK_D} />
          <Book f={f} titleLift={lift} />
          <circle cx={310} cy={620 - lift * 420} r={260} fill="url(#ep045aura)" opacity={lift} />
        </>
      );
    } else {
      if (v.answer) headline = undefined;
      const g = f - answerAt;
      body = (
        <>
          <Office f={f} sign={v.sign ?? "WHIPPING BOY"} bubble={v.bubble} bubbleP={popIn(f, answerAt + (v.bubbleDelay ?? 14), 8)} />
          <rect x={0} y={0} width={1080} height={1920} fill="#FFFFFF" opacity={interpolate(g, [0, 8], [0.9, 0], clamp)} />
        </>
      );
    }
  }

  return (
    <Backdrop sky="day" stars={false} moon={false} fog={false}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <Defs />
        {body}
      </svg>
      {headline ? <Headline key={headline} text={headline} accent={v.accent ?? []} top={v.top ?? 300} size={v.size ?? 96} /> : null}
      {mode === "office" && v.answer ? (
        <Sequence from={Math.round(answerAt)} layout="none">
          <Headline text={v.answer} accent={v.answerAccent ?? []} top={v.top ?? 300} size={v.answerSize ?? 96} />
        </Sequence>
      ) : null}
      {v.tag ? <Tag text={v.tag} x={540} y={v.tagY ?? 640} /> : null}
      <Floats items={float} f={f} dur={dur} top={v.floatTop ?? 420} at={v.floatAt} side={v.floatSide} />
    </Backdrop>
  );
};
