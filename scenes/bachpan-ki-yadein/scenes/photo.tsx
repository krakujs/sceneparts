import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Grain, Sky } from "../kit/Backdrop";
import { Headline, Tag, Typewriter } from "../kit/Text";
import { C, typeFont } from "../theme";
import type { SceneProps } from "./types";

// Real archival photographs (public domain / CC from Wikimedia Commons, fetched with pipeline/fetch_photo.py).
// visual: { src | srcs[], style: "full" | "frame" | "stack", focus: [x,y] (0–1), zoom: [from,to], grade: sepia|bw|duotone|none,
//           headline?, accent?, top?, size?, label?, labelTop?, tag?, tagY?, sky? (frame/stack backdrop), credit? (auto from photos.json) }
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const FILTERS: Record<string, string> = {
  sepia: "grayscale(1) sepia(0.55) contrast(1.12) brightness(0.96)",
  bw: "grayscale(1) contrast(1.18) brightness(0.98)",
  duotone: "grayscale(1) contrast(1.25) brightness(1.02)",
  none: "contrast(1.05)",
};

const photoUrl = (epId: string, src: string) => staticFile(`ep/${epId}/photos/${src}`);

const Scratches: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", mixBlendMode: "screen" }}>
      {new Array(3).fill(0).map((_, i) => {
        const on = random(`on${i}-${Math.floor(f / 2)}`) > 0.55;
        const x = random(`x${i}-${Math.floor(f / 3)}`) * 1080;
        return on ? <line key={i} x1={x} y1={0} x2={x + 6} y2={1920} stroke="#FFF6E0" strokeOpacity={0.18} strokeWidth={1.5 + i} /> : null;
      })}
      {random(`dust${f}`) > 0.7 ? <circle cx={random(`dx${f}`) * 1080} cy={random(`dy${f}`) * 1920} r={3 + random(`dr${f}`) * 5} fill="#FFF6E0" opacity={0.35} /> : null}
    </svg>
  );
};

const Credit: React.FC<{ text?: string; light?: boolean }> = ({ text, light = true }) =>
  text ? (
    <div style={{ position: "absolute", left: 80, top: 232, right: 180, fontFamily: typeFont, fontSize: 22, color: light ? C.cream : C.ink, opacity: 0.72, textShadow: light ? "0 2px 6px #000" : "none" }}>
      {text}
    </div>
  ) : null;

const Full: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const f = useCurrentFrame();
  const v = scene.visual;
  const [fx, fy] = v.focus ?? [0.5, 0.42];
  const [z0, z1] = v.zoom ?? [1.06, 1.24];
  const z = interpolate(f, [0, dur], [z0, z1], clamp);
  const flicker = 1 + (random(`fl${f}`) - 0.5) * 0.05;
  const grade = v.grade ?? "sepia";
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <Img
        src={photoUrl(ep.id, v.src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: `${fx * 100}% ${fy * 100}%`,
          transformOrigin: `${fx * 100}% ${fy * 100}%`,
          scale: String(z),
          filter: `${FILTERS[grade] ?? FILTERS.sepia} brightness(${flicker})`,
        }}
      />
      {grade === "duotone" ? <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.navy}, ${C.brick})`, mixBlendMode: "color", opacity: 0.75 }} /> : null}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0) 28%, rgba(10,8,6,0) 62%, rgba(10,8,6,0.7) 100%)" }} />
      {v.scratches === false ? null : <Scratches />}
      <Grain strength={0.22} />
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? scene.highlight ?? []} top={v.top ?? 330} size={v.size ?? 100} color={C.cream} strokeColor={C.ink} /> : null}
      {v.label ? <Typewriter text={v.label} top={v.labelTop ?? (v.headline ? 600 : 330)} size={44} color={C.cream} /> : null}
      {v.tag ? <Tag text={v.tag} y={v.tagY ?? 760} /> : null}
      <Credit text={v.credit} />
    </AbsoluteFill>
  );
};

const Print: React.FC<{ src: string; epId: string; at: number; x: number; y: number; w: number; h: number; rot: number; grade: string; dur: number; focus?: number[] }> = ({ src, epId, at, x, y, w, h, rot, grade, dur, focus }) => {
  const f = useCurrentFrame() - at;
  const drop = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.3, 0.4, 1) });
  const z = interpolate(f, [0, dur], [1.0, 1.12], clamp);
  const [fx, fy] = focus ?? [0.5, 0.45];
  if (f < 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y,
        width: w,
        height: h,
        padding: 22,
        paddingBottom: 60,
        background: "#F7F0DF",
        boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
        rotate: `${rot + (1 - drop) * 12}deg`,
        translate: `0px ${(1 - drop) * -260}px`,
        opacity: interpolate(f, [0, 4], [0, 1], clamp),
      }}
    >
      <div style={{ width: "100%", height: "100%", overflow: "hidden", background: C.ink }}>
        <Img src={photoUrl(epId, src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${fx * 100}% ${fy * 100}%`, scale: String(z), filter: FILTERS[grade] ?? FILTERS.sepia }} />
      </div>
      <div style={{ position: "absolute", left: w / 2 - 70, top: -18, width: 140, height: 40, background: C.mustard, opacity: 0.8, rotate: "-4deg" }} />
    </div>
  );
};

const Frame: React.FC<SceneProps> = ({ scene, ep, dur }) => {
  const v = scene.visual;
  const srcs: string[] = v.srcs ?? [v.src];
  const n = srcs.length;
  const grade = v.grade ?? "sepia";
  // prints live between the headline (if any) and the caption band (captions sit ~1250–1450)
  const top = v.photoTop ?? (v.headline ? 430 : v.label ? 380 : 300);
  const bottom = v.photoBottom ?? 1230;
  const avail = bottom - top;
  const pad = 82; // print border (22 top + 60 bottom)
  const total = n === 1 ? avail : Math.round(avail * (n === 2 ? 0.6 : 0.46));
  const w = n === 1 ? 900 : n === 2 ? 760 : 660;
  const xs = [[540], [470, 610], [450, 630, 470]][Math.min(n, 3) - 1];
  const rots = [[-2.5], [-5, 4], [-6, 5, -3]][Math.min(n, 3) - 1];
  const layout = new Array(Math.min(n, 3)).fill(0).map((_, i) => ({
    x: xs[i],
    y: n === 1 ? top : top + Math.round((i * (avail - total)) / (Math.min(n, 3) - 1)),
    w,
    h: total - pad,
    rot: rots[i],
  }));
  const step = Math.max(8, Math.floor((dur * 0.7) / n));
  return (
    <Backdrop sky={(v.sky as Sky) ?? "dark"}>
      {srcs.slice(0, 3).map((s, i) => (
        <Print key={s + i} src={s} epId={ep.id} at={i * step} {...layout[i]} grade={grade} dur={dur} focus={i === 0 ? v.focus : undefined} />
      ))}
      {v.headline ? <Headline text={v.headline} accent={v.accent ?? scene.highlight ?? []} top={v.top ?? 250} size={v.size ?? 92} /> : null}
      {v.label ? <Typewriter text={v.label} top={v.labelTop ?? (v.headline ? 1440 : 280)} size={42} /> : null}
      {v.tag ? <Tag text={v.tag} y={v.tagY ?? 1160} /> : null}
      <Credit text={v.credit} />
    </Backdrop>
  );
};

export const Photo: React.FC<SceneProps> = (props) => {
  const style = props.scene.visual.style ?? "full";
  return style === "full" ? <Full {...props} /> : <Frame {...props} />;
};
