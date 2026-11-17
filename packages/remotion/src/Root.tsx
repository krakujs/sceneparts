import React from "react";
import { Composition } from "remotion";
import { storyFrames, type Registry, type StorySpec } from "@sceneparts/core";
import { makeSceneVideo, type SceneVideoProps } from "./SceneVideo.js";

const placeholder: StorySpec = { style: "core", duration: 3, shots: [{ at: 0, items: [{ t: "title", y: 960, lines: ["SCENEPARTS"] }] }] };

/** A Remotion root with one composition, "SceneVideo", drawing parts from `reg`. */
export const makeRoot = (reg: Registry): React.FC => {
  const Video = makeSceneVideo(reg);
  const Root: React.FC = () => (
    <Composition
      id="SceneVideo"
      component={Video as React.FC<SceneVideoProps>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={90}
      defaultProps={{ story: placeholder }}
      calculateMetadata={({ props }) => {
        const s = props.story;
        const fps = s.fps ?? 30;
        return { durationInFrames: storyFrames(s, fps), fps, width: s.width ?? 1080, height: s.height ?? 1920 };
      }}
    />
  );
  return Root;
};
