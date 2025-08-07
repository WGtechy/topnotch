import React, { useCallback, useEffect, useRef, useState } from "react";
// import { handleImageError } from "../../../utilities-config/imageFunction";
import {
  IoGrid,
  IoList,
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeat,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
// import { mediaCrud, postCRUD } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import useUrlSearchParams from "../../../utilities-config/useUrlSearchParams";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const ProductDescription = ({
  mediaFiles,
  setMediaFiles,
  post,
  history,
  setPost,
}) => {
  const [mediaIsPlaying, setMediaIsPlaying] = useState(true);
  const [volume, setVolume] = useState(false);
  const [track, setTrack] = useState(null);
  const { media } = useUrlSearchParams();
  const [contentType, setContentType] = useState("");
  const dispatch = useDispatch();
  const mediaDescription = useRef("");
  const mediaFileRef = useRef(null);
  const [playType, setPlayType] = useState("repeatAll");
  const changeActive = useRef(false);
  const videoMimtype = [];
  const mediaName = useRef("");
  const handleContentType = useCallback(
    (content) => () => setContentType((prev) => (prev ? "" : content)),
    []
  );
  const handleEditMedia = () => setContentType("update");

  const handleNext = () => {
    let num = Number(media) + 1;
    if (typeof num === "number") {
      if (mediaFiles.length !== num) {
        history.push(`/?media=${num}`);
        setTrack(mediaFiles[num]);
      }
    }
  };

  const handlePrev = () => {
    let num = Number(media) - 1;
    if (typeof num === "number") {
      if (num > 0) {
        history.push(`/?media=${num}`);
        setTrack(mediaFiles[num]);
      } else {
        history.push(`/?media=0`);
        setTrack(mediaFiles[0]);
      }
    }
  };

  useEffect(() => {
    if (media) {
      setTrack(mediaFiles[Number(media)]);
    } else {
      setMediaFiles([]);
      setTrack(null);
    }
  }, [media, setMediaFiles, mediaFiles]);

  const handleDeleteMedia = () => {
    dispatch();
    // postCRUD(
    //   {
    //     crud: "DELETE-MEDIA",
    //     postId: post?._id,
    //     target: post?.target?.postFor,
    //     targetId: post?.target?.targetId,
    //     mediaId: track?._id,
    //   },
    //   "DELETE-MEDIA"
    // )

    setMediaFiles((prev) => {
      let newFiles = prev.filter((x) => x._id !== track._id);
      setPost((prev) => {
        return {
          ...prev,
          media: newFiles,
        };
      });
      return newFiles;
    });
  };

  const toggleVolume = () => {
    setVolume((prev) => !prev);
  };

  const lastItem = useRef(false);

  const handleClickPlay = useCallback(
    ({ index, action }) =>
      () => {
        if (action === "play") {
          if (mediaFileRef.current) {
            mediaFileRef.current.play();
          }
          history.push(`/?media=${index}`);

          setMediaIsPlaying((prev) => !prev);
        } else if (action === "pause") {
          changeActive.current = false;
          if (mediaFileRef.current) {
            mediaFileRef.current.pause();
          }
          setMediaIsPlaying((prev) => !prev);
        } else {
          setMediaIsPlaying(false);
          setTrack(null);
          setMediaFiles([]);
          history.push("/");
        }
      },
    [setMediaFiles, history, mediaFileRef]
  );

  useEffect(() => {
    let count = null;
    const handleChange = async () => {
      if (mediaFiles[Number(media)]?.mediaTime) {
        count =
          mediaFileRef.current?.currentTime > 1
            ? mediaFileRef.current?.currentTime * 1000
            : mediaFiles[Number(media)]?.mediaTime * 1000;
      } else {
        count =
          mediaFileRef.current?.currentTime > 1
            ? mediaFileRef.current?.currentTime * 1000
            : Number(mediaFileRef.current.duration) * 1000;
      }
      await timeout(count);
      mediaIsPlaying &&
        history.push(
          `/${
            mediaFiles.length === Number(media) + 1
              ? playType === "repeatAll"
                ? "?media=0"
                : playType === "repeat"
                ? `?media=${Number(media)}`
                : ""
              : `?media=${Number(media) + 1}`
          }`
        );
    };
    if (track?._id && !lastItem.current && mediaIsPlaying) {
      handleChange();
    }
  }, [mediaFiles, playType, handleClickPlay, history, track, mediaIsPlaying]);

  useEffect(() => {
    if (track) {
      mediaName.current = track.name;
      mediaDescription.current = track.description;
    }
  }, [track]);

  const submitUpdateMedia = (e) => {
    e.preventDefault();
    // dispatch(
    //   mediaCrud({
    //     isPublic: track?.isPublic,
    //     name: mediaName?.current,
    //     mediaTime: track?.mediaTime || mediaFileRef?.current?.duration,
    //     crud: "UPDATE",
    //     mediaId: track?._id,
    //     description: mediaDescription.current,
    //   })
    // );
    mediaDescription.current = "";
    mediaName.current = "";
    setContentType("");
  };

  const handleRepeat = () => {
    if (playType === "repeat") {
      setPlayType("repeatAll");
    } else if (playType === "repeatAll") {
      setPlayType("");
    } else if (playType === "") {
      setPlayType("repeat");
    }
  };

  const gridTemplate = () => {
    return mediaFiles.map(
      (item, index) =>
        [...videoMimtype].includes(item?.mimetype) && (
          <div className="coloredOverlayDetailsContainerItem">
            <div
              className="imageCard coloredOverlayDetailsContainerItemMedia"
              onClick={handleClickPlay({ item, index, action: "play" })}
            >
              {videoMimtype.includes(item.mimetype) && (
                <video
                  alt="post-media"
                  src={item?.media}
                  onContextMenu={(e) => e.preventDefault()}
                  autoPlay={false}
                  preload="auto"
                  playsInline
                  loading="lazy"
                  className="coloredOverlayDetailsContainerItemMediaFile"
                />
              )}
            </div>
            <div className="coloredOverlayDetailsContainerItemRight">
              <div className="coloredOverlayDetailsContainerItemRightTitle reduceText">
                Title: {item?.name || "No title"}
              </div>
              <div className="coloredOverlayDetailsContainerItemRightDescription reduceText">
                Description: {item?.description || "No descriptions"}
              </div>
              <div className="coloredOverlayDetailsContainerItemRightIsPlaying">
                Status: {Number(media) === index ? "Playing" : "Stopped"}{" "}
              </div>
            </div>
          </div>
        )
    );
  };

  return (
    <div
      className={
        !!mediaFiles?.length ? "overlay coloredOverlay" : "coloredOverlayHide"
      }
    >
      <div
        className="coloredOverlayMediaItemClickArea"
        onClick={handleClickPlay({ media: [] })}
      ></div>
      <div className="coloredOverlayMedia">
        {[...videoMimtype].includes(track?.mimetype) && (
          <div className="coloredOverlayMediaItem">
            {videoMimtype.includes(track?.mimetype) && (
              <div className="coloredOverlayMediaItemVideo">
                <video
                  ref={mediaFileRef}
                  alt="post-media"
                  data={post?._id + track?._d}
                  src={track?.media}
                  onContextMenu={(e) => e.preventDefault()}
                  loop
                  // onError={(e) => handleImageError(e)}
                  className="coloredOverlayMediaItemVideoMedia"
                  preload="auto"
                  title="media"
                  webkit-playsinline="true"
                  playsInline={true}
                  autoPlay={mediaIsPlaying}
                  muted={volume ? "" : "muted"}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}
        <div className="coloredOverlayMediaTitle">
          <span className="coloredOverlayMediaTitleText">{track?.name}</span>
        </div>
        <div className="coloredOverlayMediaFooter">
          <IoPlaySkipBack
            className={
              Number(media) === 0
                ? "coloredOverlayMediaFooterIcon stale"
                : "coloredOverlayMediaFooterIcon"
            }
            onClick={Number(media) === 0 ? null : handlePrev}
          />

          <div
            className="coloredOverlayMediaFooterContainer"
            onClick={handleRepeat}
          >
            <IoRepeat
              className={`coloredOverlayMediaFooterIcon ${
                playType === "" ? "dimIcon" : ""
              }`}
              onClick={handleRepeat}
            />
            {["repeat", "repeatAll"].includes(playType) && (
              <span className="coloredOverlayMediaFooterContainerRepeat">
                {playType === "repeat" ? 1 : "All"}
              </span>
            )}
          </div>

          {contentType === "grid" ? (
            <IoGrid
              className="coloredOverlayMediaFooterIcon"
              onClick={handleContentType("")}
            />
          ) : (
            contentType === "" && (
              <IoList
                className="coloredOverlayMediaFooterIcon"
                onClick={handleContentType("grid")}
              />
            )
          )}

          {mediaIsPlaying ? (
            <IoPause
              className="coloredOverlayMediaFooterIcon middleIcon"
              onClick={handleClickPlay({
                index: Number(media),
                action: "pause",
              })}
            />
          ) : (
            <IoPlay
              className="coloredOverlayMediaFooterIcon middleIcon"
              onClick={handleClickPlay({
                index: Number(media),
                action: "play",
              })}
            />
          )}
          {volume ? (
            <IoVolumeHigh
              className="coloredOverlayMediaFooterIcon"
              onClick={toggleVolume}
            />
          ) : (
            <IoVolumeMute
              className="coloredOverlayMediaFooterIcon"
              onClick={toggleVolume}
            />
          )}

          <IoPlaySkipForward
            className={
              Number(media) === mediaFiles?.length - 1
                ? "coloredOverlayMediaFooterIcon stale"
                : "coloredOverlayMediaFooterIcon"
            }
            onClick={
              Number(media) === mediaFiles?.length - 1 ? null : handleNext
            }
          />
        </div>
      </div>
      <div className="coloredOverlayDetails">
        {contentType === "grid" ? (
          <div className="coloredOverlayDetailsContainer">{gridTemplate()}</div>
        ) : contentType === "update" ? (
          <form
            className="coloredOverlayDetailsUpdate"
            onSubmit={submitUpdateMedia}
          >
            <input
              placeholder="Media title"
              type="text"
              required={true}
              defaultValue={track?.name}
              onChange={(e) => (mediaName.current = e.target.value)}
              className="coloredOverlayDetailsUpdateInput"
              title="Media title"
            />

            <textarea
              name="textarea-input"
              id={"Media description"}
              // rows={row || "3"}
              title={"Media description"}
              autoFocus={false}
              placeholder={"Media description"}
              onChange={(e) => (mediaDescription.current = e.target.value)}
              defaultValue={track?.description}
              required={false}
              autoComplete="off"
              className="coloredOverlayDetailsUpdateTextArea"
            ></textarea>
            <button className="btn">Update</button>
          </form>
        ) : (
          <div className="coloredOverlayDetailsAbout">
            {/* <div className="coloredOverlayDetailsAboutNext"> </div> */}
            <div className="coloredOverlayDetailsAboutInfo">
              {" "}
              {track?.description ||
                post?.content ||
                post?.target?.targetId?.aimAndPurpose}{" "}
            </div>
            <div className="coloredOverlayDetailsAboutFooter">
              <div
                className="coloredOverlayDetailsAboutFooterEdit"
                onClick={handleEditMedia}
              >
                Edit and update media{" "}
              </div>
              <div
                className="coloredOverlayDetailsAboutFooterDelete"
                onClick={handleDeleteMedia}
              >
                Delete media
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
