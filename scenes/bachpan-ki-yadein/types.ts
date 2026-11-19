export type Word = { text: string; start: number; end: number }; // seconds, relative to the scene's voice clip

export type Sfx = { name: string; at?: number; volume?: number; src?: string }; // at = seconds from scene start

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
  voice?: Record<string, any>; // per-scene voice override, e.g. { "edge_voice": "en-GB-SoniaNeural" } for a quoted character
  // Filled in by pipeline/build.mjs
  durationInFrames?: number;
  audio?: string | null;
  audioDuration?: number;
  words?: Word[];
  kidShouts?: { at: number; text: string; dur: number }[]; // funny kid shouts (seconds from scene start)
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
  platform?: string | null; // instagram | youtube (platform-exclusive episodes, 24 Oct 2026)
};
