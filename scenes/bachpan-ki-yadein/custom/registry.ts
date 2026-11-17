import type React from "react";
import type { SceneProps } from "../scenes";
import { AntennaHook, TvSnow, AntennaTurn, CrowSignal, TvSlap, WifiTwist, RoofLoop } from "./ep001_Antenna";
import { GullyHook, OneTip, SixWindow, Bhago, MummyCall, StadiumTwist, OwnerReveal } from "./ep002_GullyCricket";
import { PostcardHook, QuizTv, GharBahas, NeatWriting, LetterBoxWait, PostcardFlood, CompetitionCard, PenLoop } from "./ep003_SurabhiPostcards";

// Bachpan Ki Yadein – bespoke scenes. Shared look lives in ./byk_kit.tsx (Bittu, rooftops, CRT, antenna, phone…).
// New episode: src/custom/<epId>_<Name>.tsx, import here, add to CUSTOM, use { "type": "custom", "visual": { "component": "<Key>" } }.
export const CUSTOM: Record<string, React.FC<SceneProps>> = {
  AntennaHook, TvSnow, AntennaTurn, CrowSignal, TvSlap, WifiTwist, RoofLoop,
  GullyHook, OneTip, SixWindow, Bhago, MummyCall, StadiumTwist, OwnerReveal,
  PostcardHook, QuizTv, GharBahas, NeatWriting, LetterBoxWait, PostcardFlood, CompetitionCard, PenLoop,
};
