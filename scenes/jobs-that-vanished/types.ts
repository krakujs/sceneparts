export type Word = { text: string; start: number; end: number }; // seconds, relative to the scene's voice clip

export type Sfx = { name: string; at?: number; volume?: number }; // at = seconds from scene start

export type SceneType =
  | "hook"
  | "setting"
  | "worker"
  | "stat"
  | "fact"
  | "twist"
  | "modern"
  | "stamp"
  | "outro"
  | "versus"
  | "timeline"
  | "desk"
  | "photo"
  | "custom";

export type SceneSpec = {
  id: string;
  type: SceneType;
  narration: string;
  highlight?: string[]; // words to colour in captions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: Record<string, any>;
  sfx?: Sfx[];
  captions?: boolean; // default true
  transition?: string; // how this scene enters: cut|fade|wipe|iris|whip|slam|paper|flash|push|zoom|ink (kit/Transition.tsx)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop?: boolean | { gap?: number }; // W44: silence the music for `gap` s (default 0.4) before this scene, riser before, impact on entry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  voice?: Record<string, any>; // per-scene voice override, e.g. { "edge_voice": "en-GB-SoniaNeural" } for a quoted character
  // Filled in by pipeline/build.mjs
  durationInFrames?: number;
  audio?: string | null;
  audioDuration?: number;
  words?: Word[];
};

export type EpisodeProps = {
  id: string;
  number: number;
  job: string;
  years: string;
  place: string;
  scenes: SceneSpec[];
  music?: string | null;
  musicVolume?: number;
  voiceDelay?: number; // seconds into each scene before the voice starts
  hookIntro?: string | null; // W46: default = hook headline fully visible at frame 0; "pop" = old word-by-word pop-in
  captionStyle?: string | null; // "smart" = no page ends on a dangling function word (kit/Captions.tsx)
  platform?: string | null; // instagram | youtube (platform-exclusive episodes, 24 Oct 2026)
  endCard?: {
    text?: string;
    sub?: string;
    at?: number;
    // W45 review (8 Nov 2026): answer card instead of the follow banner – two big YES/NO pills + a comment/tag line
    poll?: { yes?: string; no?: string; ask?: string; tag?: string } | null;
  } | null; // follow banner on the stamp scene (W44 review, 1 Nov 2026)
  drops?: [number, number][]; // music-silence windows in frames before a scene with drop:true (W44 review)
};
