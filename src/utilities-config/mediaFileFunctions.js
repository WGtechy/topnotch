import { IoClose } from "react-icons/io5";
import InputComponent from "../bucket/formComponent/InputComponent";
import { useRef } from "react";
import TextAreaComponent from "../bucket/formComponent/TextAreaComponent";

const imageMimtype = ["image/png", "image/jpeg", "image/png", "image/jpg"];

const videoMimtype = [
  "video/mp4",
  "video/mob",
  "video/webm",
  "video/x-m4v",
  "video/avi",
];

const handleImageError = (e) => {
  e.currentTarget.style.display = "none";
  e.currentTarget.onerror = null;
};

const selectedMediaSlider = ({
  i,
  data,
  isSingle,
  name,
  description,
  handleDelete,
  imageListRef,
  handleImageList,
}) => {
  return (
    <div
      className="mediaContainerItem"
      key={i}
      ref={imageListRef}
      onScroll={handleImageList}
    >
      {handleDelete && (
        <div className="mediaContainerItemDelete" onClick={handleDelete(i)}>
          <IoClose />{" "}
        </div>
      )}
      {(!data?.mimetype && data?.includes("data:video/")) ||
      videoMimtype.includes(data?.mimetype) ? (
        <video
          alt="post-media"
          src={data?.media || data}
          onContextMenu={(e) => e.preventDefault()}
          autoPlay={true}
          loop={true}
          muted={true}
          preload="auto"
          playsInline
          onError={(e) => handleImageError(e)}
          loading="lazy"
          className="mediaContainerItemFile"
        />
      ) : (
        <img
          src={data?.media || data}
          alt={data?.title || "display"}
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => handleImageError(e)}
          className="mediaContainerItemFile"
        />
      )}
      {!data?.mimetype && <div className="mediaContainerItemContent">
        <InputComponent
          type={"text"}
          placeholder="File name"
          defaultValue={data?.name}
          title="File name"
          display={true}
          onChange={(e) => (name.current = e.target.value)}
        />

        {/* <TextAreaComponent
          defaultValue={data.description}
          onChange={(e) => (description.current = e.target.current)}
          display={true}
          placeholder={"Media description"}
          name={"Media description description"}
          rows={4}
          required={false}
          title="Media description description"
        /> */}
         <div className="mediaContainerItemContentBtn" > Update</div>

      </div>}
    </div>
  );
};

export { imageMimtype, videoMimtype, selectedMediaSlider };
