import React from "react";
import { AbsoluteFill, Html5Audio, staticFile, useCurrentFrame } from "remotion";
import { StoryFrame, getStyle, type Registry, type StorySpec } from "@sceneparts/core";
import { ArtifactSlam } from "./ArtifactSlam.js";
import { Captions } from "./Captions.js";

export type SceneVideoProps = { story: StorySpec };

const src = (s: string) => (/^(https?:|data:)/.test(s) ? s : staticFile(s));

/** The whole video: drawn frame + captions + artifact + voice-over + music. */
export const makeSceneVideo = (reg: Registry): React.FC<SceneVideoProps> => {
  const SceneVideo: React.FC<SceneVideoProps> = ({ story }) => {
    const frame = useCurrentFrame();
    const style = getStyle(reg, story.style);
    return (
      <AbsoluteFill style={{ background: style.paper?.base ?? "#ffffff" }}>
        <StoryFrame story={story} frame={frame} reg={reg} />
        {story.artifact ? <ArtifactSlam {...story.artifact} accent={style.accent} /> : null}
        {story.captions?.length ? <Captions captions={story.captions} pos={story.captionPos} font={style.font} /> : null}
        {story.audio ? <Html5Audio src={src(story.audio)} /> : null}
        {story.music ? <Html5Audio src={src(story.music.src)} volume={story.music.volume ?? 0.15} loop /> : null}
      </AbsoluteFill>
    );
  };
  return SceneVideo;
};
