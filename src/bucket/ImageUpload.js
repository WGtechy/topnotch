import { memo, useState, useRef, useCallback } from "react";
import {  IoImage, IoVideocam } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastObject } from "../redux/toastObject";
import { mediaCrud } from "../redux/actions";
import { selectedMediaSlider } from "../utilities-config/mediaFileFunctions";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { mediaQuery } from "../utilities-config/mediaSelector";
const imageMimtype = ["image/png", "image/jpeg", "image/png", "image/jpg"];

let style = {
  border: "1px solid #e3e3e3",
  borderRadius: "10px",
};
const videoMimtype = [
  "video/mp4",
  "video/mob",
  "video/webm",
  "video/x-m4v",
  "video/avi",
];

const ImageUpload = (props) => {
  const {
    isVideo,
    setMedia,
    targetId,
    htmlFor,
    media,
    isImage,
    title,
    target,
    filesFor,
    btnText,
    isSingle,
    accountId,
  } = props;
  const name = useRef("");
  const description = useRef("");
  const updateMediaContent = () => {
    setMedia();
  };
  // const [loading, setLoading] = useState(0);
  const [localFiles, setLocalFiles] = useState([]);
  const [localFile, setLocalFile] = useState(null);
  const [updateDescription, setUpdateDescription] = useState(null)
  const dispatch = useDispatch();
const handleUpdateMedia = useCallback(data=>()=>{
  dispatch(mediaCrud({
    name: data.name,
    mediaId: data.mediaId,
    description: data.description

  }))
},[dispatch])
  const { loading: mediaLoading } = useSelector((state) => state.media);
  

  const handleImage = async (e) => {
    let mediaArray = [...e.target.files];
    let aImg = [];

    mediaArray.forEach((x) => {
      const reader = new FileReader();
      reader.readAsDataURL(x);
      reader.onload = () => {
        aImg = [...aImg, reader.result].concat(localFiles);
        if (isSingle) {
          setLocalFile(reader.result);
        } else {
          setLocalFiles([...aImg]);
        }
      };
    });

    for (let item of mediaArray) {
      if (item.size > 80000000) {
        toast.error(
          `The ${item.name} file size is too large. Maximum size is 80mb`,
          toastObject
        );
      } else {
        const getMediaTime = (file) => {
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const media = new Audio(reader.result);
              media.onloadedmetadata = () => resolve(media.duration);
            };
            reader.readAsDataURL(file);
            reader.onerror = (error) => reject(error);
          });
        };
        let mediaTime = videoMimtype.includes(item.type)
          ? getMediaTime(item)
          : "";
        const mediaData = new FormData();
        mediaData.append("crud", "CREATE");
        mediaData.append("accountId", accountId);
        mediaData.append("target", target);
        mediaData.append("filesFor", filesFor);
        mediaData.append("fileType", isVideo ? "video" : isImage ? "image" : "");
        mediaData.append("targetId", targetId);
        mediaData.append("mediaTime", mediaTime === "NaN" ? "" : mediaTime);
        mediaData.append("media", item);
        dispatch(mediaCrud(mediaData));
      }
    }
  };

  const deleteDataFile = (index) => {
    setLocalFiles((init) => init.filter((_, i) => index !== i));
    setMedia((init) => {
      if (!!init?.length) {
        init.filter((_, i) => index !== i);
      } else {
        return undefined;
      }
    });
  };

  const handleDelete = useCallback(
    (i) => () => {
      setMedia((prev) => {
        dispatch(mediaCrud({ deleteMediaItem: prev[i] }));
        prev.filter((_, x) => x !== i);
      });
    },
    [setMedia, dispatch]
  );
  const imageListRef = useRef(null);
  const sliderScrollbarRef = useRef(null);
  const scrollbarThumbRef = useRef(null);

 

  const handleImageList = () => {
    // Show or hide slide buttons based on scroll position
    const maxScrollLeft =
      imageListRef.current.scrollWidth - imageListRef.current.clientWidth;

    const scrollPosition = imageListRef.current.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbarRef.current.clientWidth -
        scrollbarThumbRef.current.offsetWidth);
    scrollbarThumbRef.current.style.left = `${thumbPosition}px`;
  };

  const handleBack = () => {
    const scrollAmount = (imageListRef.current.clientWidth * -1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleForward = () => {
    const scrollAmount = (imageListRef.current.clientWidth * 1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const template = (
    <div className="media" style={style}>
      {title && title}
      {isSingle && (localFile || media?.media) ? (
        <div className={localFile ? "singleMediaContainer" : ""}>
          {isVideo ?
          <div className="singleMediaContainerVideo"><video onContextMenu={(e) => e.preventDefault()} src={localFile || media?.media} className="singleMediaContainerVideoVideo" /></div> :

          <img
            src={localFile || media?.media}
            onContextMenu={(e) => e.preventDefault()}
            alt="item"
            loading="lazy"
            className="singleMediaContainerImage"
          />}
        </div>
      ) : (
        (!!localFiles?.length || !!media?.length) && (
          <div className="mediaContainer">
            {[...media, ...localFiles].map((data, i) =>
              selectedMediaSlider({
                data,
                isVideo,
                isImage,
                name,
                handleUpdateMedia,
                updateDescription,
                setUpdateDescription,
                description,
                i,
                handleDelete: !!media?.length ? handleDelete : null,
                imageListRef,
                handleImageList,
              })
            )}
          </div>
        )
      )}
      {(localFiles?.length > 6 || media?.length > 6) &&
        mediaQuery() === "desktop" && (
          <div className="sliderWrapperNavigation">
            <div
              className="sliderWrapperNavigationArrow sliderWrapperNavigationLeft"
              onClick={handleBack}
            >
              <PiArrowLeft />
            </div>
            <div
              className="sliderWrapperNavigationArrow sliderWrapperNavigationRight"
              onClick={handleForward}
            >
              <PiArrowRight />
            </div>
          </div>
        )}

      <div className="mediaAdd" onDrop={handleImage}>
        <div className="mediaAddTop">
          {isVideo ?  <IoVideocam className="addIcon" /> : <IoImage className="addIcon" />}
          <input
            onChange={handleImage}
            id={htmlFor}
            hidden
            type="file"
            name={htmlFor}
            accept={isVideo ? videoMimtype : imageMimtype}
            multiple={isSingle ? false : true}
          />

          <label className="mediaAddTopLabel" htmlFor={htmlFor}>
            {isSingle
              ? localFile
                ? "Change file"
                : "Add file"
              : !!localFiles?.length
              ? "Add more file"
              : btnText || `Add ${isVideo ? "video files" : "images"} `}
          </label>
        </div>
      </div>
    </div>
  );

  return template;
};
export default memo(ImageUpload);
