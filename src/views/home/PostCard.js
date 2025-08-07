import React from "react";
import { ScreenTemplate } from ".";

const PostCard = ({
  mediaFiles,
  product,
  isMobile,
  history,
  currency,
  volume,
  toggleVolume,
  token,
}) => {
  const temp = {
    mediaFiles,
    product,
    isMobile,
    history,
    currency,
    volume,
    toggleVolume,
    token,
  };
  return <ScreenTemplate {...temp} />;
};

export default PostCard;
