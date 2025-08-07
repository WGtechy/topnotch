import { toast } from "react-toastify";
import { generatePublicUrl } from "./urlConfig";
import {
  IoAdd,
  IoAttach,
  IoClose,
  IoImages,
  IoMic,
  IoPencil,
  IoTrash,
  IoVideocam,
} from "react-icons/io5";
import { toastObject } from "../redux/toastObject";

const handleImage = ({
  e,
  setLocalFiles,
  setServerFiles,
  localFiles,
  serverFiles,
  strictType,
}) => {
  let aImg = [];
  let server = [];
  let imgArray = [...e.target.files];

  let confirmStrictType = strictType
    ? e.target.files[0].type.includes("image/")
    : true;
  if (!confirmStrictType) {
    toast.error(
      "Sorry this file format is not supported, upload an image file",
      toastObject
    );
  } else {
    imgArray.forEach((x) => {
      const reader = new FileReader();
      reader.readAsDataURL(x);
      reader.onload = () => {
        aImg = [...aImg, reader.result].concat(localFiles);
        server = [...server, x].concat(serverFiles);
        setServerFiles([...server]);
        setLocalFiles([...aImg]);
      };
      // reader.onprogress = (data) => {
      //   aImg = [
      //     ...aImg,
      //     ...localFiles,
      //     { progress: Math.round((data.loaded * 100) / data.total), src: "" },
      //   ];
      //   if (data.lengthComputable) {
      //     setLocalFiles([...new Set(aImg)]);
      //   }
      // };
    });
  }
};

const handleBanner = ({
  e,
  setBanner,
  setServerBanner,
  banner,
  serverBanner,
}) => {
  let aImg = [];
  let server = [];
  let imgArray = [...e.target.files];
  let confirmStrictType = e.target.files[0].type.includes("image/");
  if (!confirmStrictType) {
    toast.error(
      "Sorry this file format is not supported, upload an image file",
      toastObject
    );
  } else {
    imgArray.forEach((x) => {
      const reader = new FileReader();
      reader.readAsDataURL(x);
      reader.onload = () => {
        aImg = [...aImg, reader.result].concat(banner);
        server = [...server, x].concat(serverBanner);
        setServerBanner([...server]);
        setBanner([...aImg]);
      };
      // reader.onprogress = (data) => {
      //   aImg = [
      //     ...aImg,
      //     ...localFiles,
      //     { progress: Math.round((data.loaded * 100) / data.total), src: "" },
      //   ];
      //   if (data.lengthComputable) {
      //     setLocalFiles([...new Set(aImg)]);
      //   }
      // };
    });
  }
};

const deleteImage = ({
  item,
  index,
  setServerFiles,
  setLocalFiles,
  localFiles,
  serverFiles,
  single
}) => {
  let newArrServer
  if(single){
    setLocalFiles([]);
    setServerFiles(null)
  } else {
    setLocalFiles(prev=> prev.filter((x, i) => index !== i));
    if(!!serverFiles?.length){
      setServerFiles(prev=>prev.filter((x, i) => index !== i));
    }
  }
};
const filesTemplate = ({
  accept,
  isSingle,
  localFiles,
  serverFiles,
  setLocalFiles,
  setServerFiles,
  htmlFor
}) => {
  const displayFile = (item) => {
    let file = item.split(":")[1].split("/")[0];
    if (file === "video") {
      return (
        <video
          src={item}
          onContextMenu={(e) => e.preventDefault()}
          autoPlay
          loop
          alt="view"
          preload="auto"
          playsInline
          loading="lazy"
          className="fileContent"
        >
          {" "}
        </video>
      );
    } else if (file === "image") {
      return (
        <img src={item} alt="item" accept={accept} loading="lazy" className="fileContent" />
      );
    }
  };
  return (
    <div className="filesContainer">
    {isSingle ? 
      localFiles?.length > 0 || serverFiles ? null : <div
        className="fileItem"
        onChange={(e) =>
          handleImage({
            e,
            setLocalFiles,
            localFiles,
            count: localFiles.length,
            serverFiles,
            setServerFiles,
          })
        }
      >
        <input
          hidden
          type="file"
          id={htmlFor}
          multiple
          className="fileItemInput"
          accept={accept}
        />
        <label htmlFor={htmlFor} className="fileLabel">
          <IoAdd className="addFileIcon" />
        </label>
      </div> : <div
        className="fileItem"
        onChange={(e) =>
          handleImage({
            e,
            setLocalFiles,
            localFiles,
            count: localFiles.length,
            serverFiles,
            setServerFiles,
          })
        }
      >
        <input
          hidden
          type="file"
          id={htmlFor}
          multiple
          className="fileItemInput"
          accept={accept}
        />
        <label htmlFor={htmlFor} className="fileLabel">
          <IoAdd className="addFileIcon" />
        </label>
      </div>}
      {localFiles.length > 0 &&
        localFiles.map((item, index) => (
          <div className="fileItem deleteContainer" key={index}>
            <span
              className="deleteFile"
              onClick={() =>
                deleteImage({
                  item,
                  index,
                  setLocalFiles,
                  setServerFiles,
                  localFiles,
                  serverFiles,
                  single: isSingle
                })
              }
            >
              <IoClose />
            </span>
            {item && displayFile(item)}
          </div>
        ))}
    </div>
  );
};

const handleImageError = (e) => {
  e.currentTarget.style.display = "none";
  e.currentTarget.onerror = null;
};
const imageTemplate = ({
  setOpenMediaSlider,
  picture,
  deleteImageHandler,
  target,
  crud,
}) => {
  const deleteItem = () => deleteImageHandler(target);

  const handlerOpen = () => setOpenMediaSlider(true);
  return (
    <div className="profileImageContainer deleteContainer">
      <div className="addImage">
        {picture ? (
          <img
            src={picture || ""}
            alt="profile"
            onError={(e) => handleImageError(e)}
            onClick={handlerOpen}
          />
        ) : (
          crud && (
            <label>
              <IoAdd className="addImageIcon" onClick={handlerOpen} />
            </label>
          )
        )}
        {picture && target && (
          <div className="deleteContainer" onClick={deleteItem}>
            <IoTrash className="deleteImageIcon" />
          </div>
        )}
      </div>
    </div>
  );
};

const bannerTemplate = ({
  setOpenMediaSlider,
  picture,
  deleteImageHandler,
  target,
  crud,
  cAccountDisplay,
}) => {
  const deleteItem = () => deleteImageHandler(target);

  const handlerOpen = () => setOpenMediaSlider(true);
  return (
    <div className="imageBannerContainer deleteContainer">
      <div className="addImage">
        {picture ? (
          <img
            src={picture || ""}
            alt="banner"
            onError={(e) => handleImageError(e)}
            onClick={target ? handlerOpen : null}
          />
        ) : (
          crud && (
            <label>
              <IoAdd className="addImageIcon" onClick={handlerOpen} />
            </label>
          )
        )}
        {picture && target && (
          <div className="deleteContainer" onClick={deleteItem}>
            <IoTrash className="deleteImageIcon" />
          </div>
        )}
      </div>
    </div>
  );
};
const deleteDataFile = ({
  item,
  setServerFiles,
  setLocalFiles,
  isServerFile,
  index,
  localFiles,
  serverFiles,
}) => {
  const newArrLocal = localFiles.filter((x, i) => index !== i);
  const newArrServer = serverFiles.filter((x, i) => index !== i);
  setServerFiles(newArrServer);
  setLocalFiles(newArrLocal);
};
const filesFormTemplate = ({
  setLocalFiles,
  setServerFiles,
  localFiles,
  serverFiles,
  dataFiles,
  serverFunction,
  icon,
  accept,
}) => {
  return (
    <ul className="formFilesContainer">
      <li
        className="formFilesContainerAdd"
        onChange={(e) =>
          handleImage({
            e,
            setLocalFiles,
            setServerFiles,
            localFiles,
            serverFiles,
          })
        }
      >
        <input
          id="item"
          type="file"
          accept={
            icon === "video"
              ? "video/mp4, video/mob, video/webm, video/x-m4v, video/avi"
              : icon === "picture"
              ? "image/jpeg, image/png"
              : icon === "audio"
              ? "audio/x-m4a,audio/mp3 audio/mpeg audio/x-wav audio/ogg"
              : icon === "file" && "application/vnd.ms-word application/pdf"
          }
          multiple
        />
        <label htmlFor="item">
          {icon === "video" ? (
            <IoVideocam className="addFileIcon" />
          ) : icon === "picture" ? (
            <IoImages className="addFileIcon" />
          ) : icon === "audio" ? (
            <IoMic className="addFileIcon" />
          ) : (
            icon === "file" && <IoAttach className="addFileIcon" />
          )}
        </label>
      </li>
      {localFiles.length > 0 &&
        localFiles.map((item, i) => (
          <li key={i} className="formFilesContainerItem">
            {/* data:application/pdf */}
            <img
              src={
                item.includes("data:image")
                  ? item
                  : item.includes("data:application/pdf") && "/pdf.png"
              }
              alt="profile"
            />
            <div
              className="deleteFile"
              onClick={() =>
                deleteDataFile({
                  index: i,
                  setServerFiles,
                  setLocalFiles,
                  isServerFile: true,
                  serverFunction,
                })
              }
            >
              <IoTrash className="deleteImageIcon" />
            </div>
          </li>
        ))}
      {/* {dataFiles?.length > 0 &&
        dataFiles?.map((item, i) => (
          <li key={i} className="fomFilesContainerItem">
            
            <img src={generatePublicUrl(item)} alt="profile" />
            <div
              className="deleteImage"
              onClick={() =>
                deleteDataFile({
                  item,
                  setServerFiles,
                  setLocalFiles,
                  isServerFile: false,
                })
              }
            >
              <IoTrash className="deleteImageIcon" />
            </div>
          </li>
        ))
        } */}
    </ul>
  );
};

export {
  handleImage,
  deleteImage,
  filesFormTemplate,
  imageTemplate,
  filesTemplate,
  bannerTemplate,
};
