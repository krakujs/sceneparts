import React from "react";
import type { PartProps } from "@sceneparts/core";
import { C, shade, skinColour, hairColour } from "../style/index";

// Centaur: a horse body with NO horse head or neck. A human torso, arms and head rise from the chest (front) end
// of the horse, and the human holds a plain bow. Feet on y = 0, facing right, about 1000 px tall at s = 1.
// anim: none | idle (slow breathing) | walk (legs step in diagonal pairs and the body bobs).
/* eslint-disable @typescript-eslint/no-explicit-any */
const TUNIC = C.blue, BELT = C.brownDark, BOW = "#8A5A3C", INK = C.ink;
const f1 = (v: number) => v.toFixed(1);

// A horse leg: pivot at the hip (hx, -330), foot offset dx, swung by angle a (walk only), hoof at the bottom.
const Leg = ({ hx, dx, col, a }: { hx: number; dx: number; col: string; a: number }) => (
  <g transform={`rotate(${f1(a)} ${hx} -330)`}>
    <path d={`M ${hx} -330 L ${hx + dx} -60`} stroke={col} strokeWidth={44} strokeLinecap="round" fill="none" />
    <rect x={hx + dx - 28} y={-44} width={56} height={44} rx={10} fill={C.brownDark} />
  </g>
);

export default function Part(p: PartProps<any>) {
  const { x = 540, y = 1560, s = 1, f = 0, flip = false } = p as any;
  const anim: string = p.anim ?? "idle";
  const coat: string = p.coat && p.coat !== "none" ? p.coat : "#8A5A3C";
  const skin = skinColour(p.skin ?? "fair");
  const hair = hairColour(p.hair ?? "brown");
  const coatFar = shade(coat, 0.28);
  const coatDark = shade(coat, 0.2);

  const ph = (f * 2 * Math.PI) / 24;
  const walk = anim === "walk";
  const swing = walk ? 12 * Math.sin(ph) : 0;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 6 : 0;
  const breath = anim === "idle" ? Math.sin((f * 2 * Math.PI) / 60) * 3 : 0;
  const tailSway = anim === "none" ? 0 : Math.sin((f * 2 * Math.PI) / 50) * 5;

  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={6} rx={330} ry={24} fill={C.shadow} />
      {/* far legs (darker) */}
      <Leg hx={-210} dx={-14} col={coatFar} a={-swing} />
      <Leg hx={120} dx={12} col={coatFar} a={-swing} />
      {/* tail, behind the rump */}
      <g transform={`rotate(${f1(tailSway)} -246 -520)`}>
        <path d="M -246 -520 Q -330 -500 -336 -400 Q -340 -330 -300 -280" stroke={hair} strokeWidth={26} fill="none" strokeLinecap="round" />
      </g>
      {/* horse barrel: rump at the left, chest at the right, no neck and no head */}
      <g transform={`translate(0 ${f1(bob)})`}>
        <path d="M -250 -520 Q -272 -600 -170 -596 L 60 -590 Q 150 -600 226 -530 Q 272 -470 252 -400 Q 236 -322 150 -314 L -150 -314 Q -236 -314 -252 -384 Q -270 -452 -250 -520 Z" fill={coat} />
        <ellipse cx={0} cy={-326} rx={220} ry={16} fill={coatDark} opacity={0.55} />
        {/* near legs */}
        <Leg hx={-170} dx={-8} col={coat} a={-swing} />
        <Leg hx={170} dx={14} col={coat} a={swing} />
        {/* human upper body */}
        <g transform={`translate(0 ${f1(breath)})`}>
          {/* bow arm (behind the torso edge, reaches the bow grip) */}
          <path d="M 200 -820 L 290 -772 L 410 -800" stroke={skin} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* torso: sleeveless tunic, bare arms */}
          <path d="M 108 -590 Q 92 -700 118 -820 Q 170 -846 232 -818 Q 252 -700 236 -590 Q 172 -574 108 -590 Z" fill={TUNIC} />
          <rect x={108} y={-612} width={128} height={22} rx={6} fill={BELT} />
          {/* neck and head */}
          <rect x={152} y={-866} width={40} height={52} fill={shade(skin, 0.12)} />
          <circle cx={172} cy={-920} r={60} fill={skin} />
          <circle cx={118} cy={-916} r={13} fill={shade(skin, 0.1)} />
          <path d="M 110 -930 Q 100 -1000 172 -986 Q 244 -982 236 -924 Q 222 -958 190 -960 Q 150 -948 110 -930 Z" fill={hair} />
          <circle cx={198} cy={-924} r={7} fill={INK} />
          <circle cx={200} cy={-926} r={2.5} fill={C.white} />
          <circle cx={206} cy={-898} r={10} fill="#F27BA6" opacity={0.4} />
          <path d="M 190 -888 Q 208 -876 224 -890" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          {/* draw arm: elbow back, hand on the string */}
          <path d="M 222 -818 L 262 -744 L 350 -790" stroke={skin} strokeWidth={28} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* bow and string */}
          <path d="M 350 -990 Q 470 -800 350 -610" stroke={BOW} strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d="M 350 -990 L 350 -610" stroke={C.inkSoft} strokeWidth={3} fill="none" />
          <circle cx={350} cy={-790} r={15} fill={skin} />
          <circle cx={410} cy={-800} r={17} fill={skin} />
        </g>
      </g>
    </g>
  );
}
