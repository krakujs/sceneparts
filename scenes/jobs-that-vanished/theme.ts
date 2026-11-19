import { loadFont as loadTitle } from "@remotion/google-fonts/AlfaSlabOne";
import { loadFont as loadBody } from "@remotion/google-fonts/Rubik";
import { loadFont as loadType } from "@remotion/google-fonts/SpecialElite";

export const titleFont = loadTitle("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const bodyFont = loadBody("normal", { weights: ["500", "800", "900"], subsets: ["latin"] }).fontFamily;
export const typeFont = loadType("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;

// "Vintage storybook" palette for Jobs That Vanished.
export const C = {
  night: "#121A2C",
  navy: "#1E2A47",
  dusk: "#3B3F6E",
  dawn: "#E9A27A",
  mustard: "#F2B544",
  glow: "#FFD983",
  cream: "#F4EAD5",
  paper: "#EADBBE",
  paperDark: "#D9C49C",
  ink: "#1B1712",
  brick: "#B5452F",
  brickDark: "#7E2E22",
  teal: "#2E7D7A",
  sepia: "#8A6A45",
  stone: "#4A4E5E",
  stoneDark: "#2C2F3B",
  modernA: "#0F1020",
  modernB: "#3A2E7A",
};

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Instagram Reels safe area: keep key content inside this box.
export const SAFE = { left: 80, right: 160, top: 220, bottom: 420 };
