import { memo, forwardRef } from "react";
import PostVisualTemplate from "./PostVisualTemplate";
import { TheImageSlider } from "../../bucket";

const MediaTemplate = forwardRef((props, ref) => {
  const {
    data,
    mediaPlay,
    togglePlay,
    isWaiting,
    isPlaying,
    totalPlays,
    volume,
    toggleVolume,
  } = props;
  const singleProps = {
    data: data[0],
    mediaPlay,
    togglePlay,
    isWaiting,
    isPlaying,
    totalPlays,
    volume,
    toggleVolume,
  };
  const multipleProps = {
    data,
    mediaPlay,
    togglePlay,
    isWaiting,
    isPlaying,
    totalPlays,
    volume,
    toggleVolume,
  };
  return data?.length > 1 ? (
    <div className="imageSliderContainer">
      <TheImageSlider {...multipleProps} />
    </div>
  ) : (
    data?.length === 0 && (
      <div className="singleFileContainer">
        <PostVisualTemplate {...singleProps} />
      </div>
    )
  );
});

export default memo(MediaTemplate);
