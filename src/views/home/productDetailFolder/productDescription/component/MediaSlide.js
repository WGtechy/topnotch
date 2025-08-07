import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import {
  IoArrowBack,
  IoArrowForward,
  IoClose,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import {
  handleImageError,
  imageMimtype,
  videoMimtype,
} from "../../../../../utilities-config/utils";
import Dialog from "../../../../../bucket/dialog/Dialog";
import AppBar from "../../../../../bucket/dialog/AppBar";
import Toolbar from "../../../../../bucket/dialog/Toolbar";

const MediaSlide = ({
  track,
  mediaFiles,
  setSelectedTrack,
  isMobile,
  open,
  handleClose,
}) => {
  const imageListRef = useRef(null);
  const mediaFileRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);
  const [volume, setVolume] = useState(false);
  const observer = useRef(null);
  const [trackId, setTrackId] = useState(null);
  const toggleVolume = () => setVolume((prev) => !prev);

  const focusElement = useCallback((node) => {
    // if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        let entry = null;
        for (entry of entries) {
          if (
            entry?.isIntersecting &&
            entry.target?.classList[0] === "wideScreenItemMediaItemVideo"
          ) {
            entry.target?.play();
            mediaFileRef.current = entry.target;
            setTrackId(entry.target.getAttribute("data"));
          } else {
            entry.target?.pause();
            mediaFileRef.current = entry.target;
          }
        }
      },
      {
        threshold: 0.5,
        // rootMargin: "100px"
      }
    );
    if (node) observer?.current?.observe(node);
  }, []);

  useEffect(() => {
    if (trackId) {
      setSelectedTrack(mediaFiles.find((x) => x._id === trackId));
    }
  }, [trackId, setSelectedTrack, mediaFiles]);

  const handleBack = () => {
    const scrollAmount = (imageListRef.current.clientWidth * -1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleForward = () => {
    const scrollAmount = (imageListRef.current.clientWidth * 1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  function getTime() {
    var minutes, seconds;
    minutes = parseInt(Number(track?.mediaTime) / 60);
    seconds = parseInt(Number(track?.mediaTime) % 60);
    return (
      <div className="wideScreenItemMediaTime">
        {minutes} : {seconds}
        {"s"}
      </div>
    );
  }

  const rightIcons = [
    {
      icon: volume ? IoVolumeHigh : IoVolumeMute,
      action: toggleVolume,
      name: "Volume",
      display: videoMimtype.includes(track?.mimetype) ? true : false,
    },
  ];

  const handleSwitchIconsView = useCallback(
    (data) => () => {
      if (!isMobile) {
        setShowIcons(data);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile) {
      setShowIcons(true);
    }
  }, [isMobile]);

  return (
    <Dialog
      parentDialog={false}
      open={open}
      adjustFullscreen={true}
      onClose={handleClose}
    >
      <AppBar>
        <Toolbar>
          <div onClick={handleClose} className="modalBack">
            <IoClose className="arrowStyle" />
            <span className="headerLeftSection">Media</span>
          </div>
        </Toolbar>
      </AppBar>
      <div
        className="wideScreenItemMedia"
        onMouseEnter={handleSwitchIconsView(true)}
        onMouseLeave={handleSwitchIconsView(false)}
      >
        <div className="wideScreenItemMediaItem" ref={imageListRef}>
          {!!mediaFiles?.length &&
            mediaFiles.map((item, i) =>
              videoMimtype.includes(item?.mimetype) ? (
                <video
                  ref={focusElement || null}
                  alt="item-media"
                  data={item?._id}
                  key={i}
                  src={item?.media}
                  onContextMenu={(e) => e.preventDefault()}
                  loop
                  // onError={(e) => handleImageError(e)}
                  className="wideScreenItemMediaItemVideo"
                  preload="auto"
                  title={item.name}
                  webkit-playsinline="true"
                  playsInline={true}
                  autoPlay={true}
                  muted={volume ? "" : "muted"}
                  loading="lazy"
                />
              ) : (
                imageMimtype.includes(item?.mimetype) && (
                  <img
                    key={i}
                    src={item.media}
                    alt={item.name}
                    className="wideScreenItemMediaItemImg"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              )
            )}
        </div>
        <div
          className={
            showIcons
              ? "wideScreenItemMediaFooter"
              : "wideScreenItemMediaFooter hideAllIcons"
          }
        >
          {rightIcons.map((item, i) =>
            item.display && item.action ? (
              <div
                className={`wideScreenItemMediaFooterIcon ${
                  item?.iconClassName || ""
                }`}
                key={i}
                content={item.name}
                onClick={item.action}
              >
                <item.icon />
              </div>
            ) : (
              <Link
                className="wideScreenItemMediaFooterIcon"
                key={i}
                to={item.link}
              >
                <item.icon />
              </Link>
            )
          )}
        </div>
        {videoMimtype.includes(track?.mimetype) && getTime()}
        <div
          className={
            showIcons
              ? "wideScreenItemMediaScroll"
              : "wideScreenItemMediaScroll hideAllIcons"
          }
        >
          <div className="wideScreenItemMediaScrollUp" onClick={handleBack}>
            <IoArrowBack />
          </div>
          <div
            className="wideScreenItemMediaScrollDown"
            onClick={handleForward}
          >
            <IoArrowForward />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MediaSlide;
