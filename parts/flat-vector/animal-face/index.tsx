import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade } from "../style/index";

// Flat vector cute animal head generator. Front-facing, centred on (x, y), about 400 px wide at s = 1.
// Head = oval plus wide cheeks; ears sit behind it; eyes have white highlights; nose and mouth follow the expression.
// blink: every 75 frames (~2.5 s at 30 fps) both eyes close for about 6 frames, driven by p.f.
// Presets can reuse the drawing through the named export AnimalFace.

export type FaceEars = "pointy" | "round" | "floppy" | "long" | "tiny" | "none";
export type FaceMarkings = "none" | "mask" | "patches" | "stripes" | "blaze";
export type FaceExpression = "happy" | "neutral" | "surprised" | "sad" | "sleepy" | "angry" | "laugh";
export type FaceHorns = "none" | "small" | "antlers";
export type FaceSpec = {
  ears?: FaceEars; earColor?: string; color?: string; muzzle?: string; nose?: string;
  markings?: FaceMarkings; markColor?: string; expression?: FaceExpression; whiskers?: boolean;
  horns?: FaceHorns; blink?: boolean; blush?: boolean; tilt?: number;
};

const INK = C.ink, INNER = "#F2A7B8", HORN = "#EFE6D2", ANTLER = "#6B4A2E", CHEEK = "#F27BA6", EYE_Y = -14;

/** One ear for the right side (x > 0); the left ear is the same shape mirrored. */
function Ear({ kind, col, sx }: { kind: FaceEars; col: string; sx: number }) {
  if (kind === "none") return null;
  let body: React.ReactNode = null, inner: React.ReactNode = null;
  if (kind === "pointy") {
    body = <path d="M 20 -120 Q 90 -200 140 -244 Q 158 -258 168 -236 Q 176 -190 150 -70 Z" fill={col} />;
    inner = <path d="M 70 -140 Q 102 -186 130 -218 Q 140 -230 144 -214 Q 152 -186 150 -120 Z" fill={INNER} />;
  } else if (kind === "round") {
    body = <circle cx={140} cy={-140} r={56} fill={col} />;
    inner = <circle cx={140} cy={-140} r={30} fill={INNER} />;
  } else if (kind === "floppy") {
    body = <ellipse cx={200} cy={20} rx={50} ry={112} transform="rotate(-18 200 20)" fill={col} />;
  } else if (kind === "long") {
    body = <ellipse cx={122} cy={-186} rx={46} ry={112} transform="rotate(16 122 -186)" fill={col} />;
    inner = <ellipse cx={122} cy={-186} rx={22} ry={84} transform="rotate(16 122 -186)" fill={INNER} />;
  } else {
    body = <circle cx={150} cy={-150} r={26} fill={col} />;
  }
  return <g transform={`scale(${sx} 1)`}>{body}{inner}</g>;
}

/** Shared drawing for animal heads. Centre (x, y) = middle of the head; s = scale; tilt = degrees. */
export function AnimalFace(p: PartProps<any> & FaceSpec) {
  const s = p.s ?? 1, f = p.f ?? 0;
  const x = p.x ?? 540, y = p.y ?? 960;
  const col = p.color ?? "#E8893C", earC = p.earColor ?? col;
  const muz = p.muzzle ?? "#FFF1DC", noseC = p.nose ?? "#E0697B";
  const mk = p.markings ?? "none", mkC = p.markColor ?? shade(col, 0.32);
  const expr: FaceExpression = p.expression ?? "happy";
  const ph = f % 75;
  const k = (p.blink ?? true) && ph < 6 ? Math.abs(ph - 3) / 3 : 1;
  const open = expr === "neutral" || expr === "surprised" || expr === "sad" || expr === "angry";
  const rx = expr === "surprised" ? 26 : expr === "angry" ? 17 : 19;
  const ry = expr === "surprised" ? 31 : expr === "angry" ? 20 : 24;

  const line = (d: string, w = 7) => <path d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;

  const eye = (cx: number, key: string) => {
    if (open) {
      return (
        <g key={key} transform={`translate(${cx} ${EYE_Y}) scale(1 ${k}) translate(${-cx} ${-EYE_Y})`}>
          <ellipse cx={cx} cy={EYE_Y} rx={rx} ry={ry} fill={INK} />
          <circle cx={cx + 7} cy={EYE_Y - 9} r={8} fill="#FFFFFF" />
          <circle cx={cx - 8} cy={EYE_Y + 9} r={3.5} fill="#FFFFFF" />
        </g>
      );
    }
    if (expr === "happy" || expr === "laugh") {
      return <path key={key} d={`M ${cx - 22} ${EYE_Y + 8} Q ${cx} ${EYE_Y - 26} ${cx + 22} ${EYE_Y + 8}`} fill="none" stroke={INK} strokeWidth={12} strokeLinecap="round" />;
    }
    return <path key={key} d={`M ${cx - 22} ${EYE_Y - 4} Q ${cx} ${EYE_Y + 18} ${cx + 22} ${EYE_Y - 4}`} fill="none" stroke={INK} strokeWidth={12} strokeLinecap="round" />;
  };

  const brows: string[] =
    expr === "sad" ? ["M -104 -66 L -50 -86", "M 104 -66 L 50 -86"]
    : expr === "angry" ? ["M -104 -90 L -50 -68", "M 104 -90 L 50 -68"]
    : expr === "surprised" ? ["M -100 -90 Q -72 -110 -44 -90", "M 100 -90 Q 72 -110 44 -90"]
    : [];

  const mouth = (() => {
    switch (expr) {
      case "happy": return <g>{line("M 0 36 Q -14 54 -30 42")}{line("M 0 36 Q 14 54 30 42")}</g>;
      case "neutral": return line("M -14 54 L 14 54");
      case "surprised": return <ellipse cx={0} cy={64} rx={15} ry={19} fill={INK} />;
      case "sad": return line("M -22 62 Q 0 46 22 62");
      case "sleepy": return line("M -14 52 Q 0 60 14 52");
      case "angry": return line("M -30 58 L -12 50 L 0 58 L 12 50 L 30 58");
      case "laugh": return (
        <g>
          <path d="M -36 40 Q 0 34 36 40 Q 32 90 0 90 Q -32 90 -36 40 Z" fill={INK} />
          <ellipse cx={0} cy={76} rx={17} ry={9} fill={CHEEK} />
        </g>
      );
    }
  })();

  const whiskerSide = (
    <g fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.6}>
      <path d="M 72 52 Q 130 42 192 36" />
      <path d="M 72 62 Q 132 60 194 64" />
      <path d="M 70 72 Q 126 80 186 92" />
    </g>
  );

  const hornSide = p.horns === "small" ? (
    <path d="M 96 -132 Q 118 -186 152 -200 Q 146 -160 134 -124 Z" fill={HORN} />
  ) : p.horns === "antlers" ? (
    <g fill="none" stroke={ANTLER} strokeWidth={13} strokeLinecap="round">
      <path d="M 96 -140 Q 116 -200 150 -252" />
      <path d="M 124 -196 L 170 -214" />
      <path d="M 136 -228 L 112 -272" />
    </g>
  ) : null;

  const marking = (() => {
    switch (mk) {
      case "stripes": return (
        <g fill="none" stroke={mkC} strokeWidth={18} strokeLinecap="round">
          <path d="M -62 -150 L -52 -112" /><path d="M 0 -160 L 0 -118" /><path d="M 62 -150 L 52 -112" />
          <path d="M -176 14 L -136 22" /><path d="M 176 14 L 136 22" />
        </g>
      );
      case "patches": return (
        <g fill={mkC}>
          <ellipse cx={-112} cy={-70} rx={52} ry={40} />
          <ellipse cx={112} cy={-70} rx={52} ry={40} />
        </g>
      );
      case "blaze": return <rect x={-30} y={-160} width={60} height={200} rx={30} fill={mkC} />;
      case "mask": return <ellipse cx={0} cy={-8} rx={152} ry={60} fill={mkC} />;
      default: return null;
    }
  })();

  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${p.tilt ?? 0})`}>
      <Ear kind={p.ears ?? "pointy"} col={earC} sx={1} />
      <Ear kind={p.ears ?? "pointy"} col={earC} sx={-1} />
      {hornSide}
      <g transform="scale(-1 1)">{hornSide}</g>
      <g fill={col}>
        <ellipse cx={0} cy={0} rx={185} ry={160} />
        <ellipse cx={-96} cy={70} rx={92} ry={80} />
        <ellipse cx={96} cy={70} rx={92} ry={80} />
      </g>
      {marking}
      {muz !== "none" && (
        <g fill={muz}>
          <ellipse cx={-46} cy={56} rx={62} ry={52} />
          <ellipse cx={46} cy={56} rx={62} ry={52} />
        </g>
      )}
      {p.blush && (
        <g fill={CHEEK} opacity={0.5}>
          <ellipse cx={-122} cy={44} rx={28} ry={17} />
          <ellipse cx={122} cy={44} rx={28} ry={17} />
        </g>
      )}
      {eye(-72, "l")}
      {eye(72, "r")}
      {brows.map((d, i) => <React.Fragment key={i}>{line(d, 10)}</React.Fragment>)}
      <path d="M -17 16 Q 0 8 17 16 Q 12 34 0 36 Q -12 34 -17 16 Z" fill={noseC} />
      {mouth}
      {(p.whiskers ?? false) && <>{whiskerSide}<g transform="scale(-1 1)">{whiskerSide}</g></>}
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Part(p: PartProps<any> & FaceSpec) {
  return <AnimalFace {...p} />;
}
