import {
  useEffect,
  memo,
  useState,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack, IoCheckmark, IoVideocam } from "react-icons/io5";
import { toast } from "react-toastify";
import { toastObject } from "../redux/toastObject";
import Image from "../bucket/Image";
import { getMedia, mediaCrud } from "../redux/actions";
import useArrayData from "../utilities-config/useArrayData";
import {
  imageMimtype,
  videoMimtype,
} from "../utilities-config/mediaFileFunctions";
import EmptyDataPage from "../bucket/EmptyDataPage";
import { componentLoader } from "../bucket/loading-components/componentLoader";
import { appBarStyle, arrowStyle, toolStyle } from "../utilities-config/style";
import Dialog from "./dialog/Dialog";
import AppBar from "./dialog/AppBar";
import Toolbar from "./dialog/Toolbar";

const acceptFileType =
  "application/pdf, application/vnd.ms-word, image/png, image/jpg, image/jpeg, video/mp4, video/mob, video/webm, video/x-m4v, video/avi, audio/x-m4a, audio/mp3, audio/mpeg, audio/x-wav, audio/ogg";

const doneStyle = {
  cursor: "pointer",
};
const TheMediaModal = ({
  accountId,
  openSlideComponent,
  handleClose,
  isArray,
  setSelectedMedia,
  setSelectedMediaArray,
  imagesOnly,
  videosOnly,
}) => {
  const { data, loading, newImage, loadingNew } = useSelector(
    (state) => state.media
  );
  const [page, setPage] = useState(0);
  const [openAddMedia, setOpenAddMedia] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState([]);
  const [keys, setKeys] = useState([]);
  const allData = useArrayData(currentData);
  const observer = useRef();
  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.length > 0) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, data]
  );
  useEffect(() => {
    if (data.length > 0) {
      setCurrentData((init) => [...init, ...data]);
    }
  }, [data, loading]);

  useEffect(() => {
    if (newImage?._id) {
      setCurrentData((init) => [newImage, ...init]);
    }
  }, [newImage]);

  useEffect(() => {
    if (accountId && openSlideComponent) {
      dispatch(
        getMedia({
          fetch: page,
          accountId: accountId,
        })
      );
    }
  }, [dispatch, page, accountId, openSlideComponent]);

  const handleCloseAddMedia = () => {
    setOpenAddMedia((prev) => !prev);
  };

  const handleSelectedArray = useCallback(
    (data) => () => {
      let proceed = false;
      if (imagesOnly) {
        if (imageMimtype.includes(data.mimetype)) {
          proceed = true;
        } else {
          toast.error("Select an images only", toastObject);
        }
      } else if (videosOnly) {
        if (videoMimtype.includes(data.mimetype)) {
          proceed = true;
        } else {
          toast.error("Select videos only", toastObject);
        }
      }
      if (proceed) {
        if (keys.includes(data.media)) {
          setSelectedMediaArray((init) =>
            init.filter((dat) => dat?.media !== data?.media)
          );
          setKeys((init) => init.filter((x) => x !== data.media));
        } else {
          setSelectedMediaArray((init) => [data, ...init]);
          setKeys((init) => [data?.media, ...init]);
        }
      }
    },
    [keys, imagesOnly, videosOnly, setSelectedMediaArray]
  );

  const handleSelectSinlge = useCallback(
    (data) => () => {
      if (!isArray && imageMimtype.includes(data.mimetype)) {
        setSelectedMedia(data);
        handleClose();
      } else {
        toast.error("Select an image file instead", toastObject);
      }
    },
    [setSelectedMedia, handleClose, isArray]
  );
  const template = ({ ref, data, i }) => {
    return (
      <div
        className="mediaCard"
        key={i}
        ref={ref ? lastDataRefElement : null}
        onClick={isArray ? handleSelectedArray(data) : handleSelectSinlge(data)}
      >
        {keys.includes(data.media) && (
          <div className="checkContainer">
            <IoCheckmark className="checkIcon" />{" "}
          </div>
        )}
        {imageMimtype.includes(data?.mimetype) ? (
          <Image src={data?.media} alt={data?.title} />
        ) : (
          videoMimtype.includes(data.mimetype) && (
            <div className="mediaCardVideoContainer">
              <span className="mediaCardVideoContainerIcon">
                <IoVideocam />
              </span>
              <video
                alt="post-media"
                src={data?.media}
                onContextMenu={(e) => e.preventDefault()}
                autoPlay={true}
                preload="auto"
                loading="lazy"
                loop={true}
                playsInline
                muted={true}
                className="mediaCardVideoContainerItem"
              />
            </div>
          )
        )}
      </div>
    );
  };

  // const handleAddMedia = () => setOpenAddMedia((prev) => !prev);

  const imageUploadProps = {
    openAddMedia,
    handleClose: handleCloseAddMedia,
    accountId,
  };

  const handleCloseMedia = () => {
    setKeys([]);
    handleClose();
  };

  // const [media, setMedia] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

  const handleImage = async (e) => {
    setOverlay((prev) => !prev);
    let mediaArray = [...e.target.files];
    for (let item of mediaArray) {
      if (item.size > 300000000000) {
        toast.error(`The ${item.name} file size is too large`, toastObject);
      } else {
        const mediaData = new FormData();
        mediaData.append("crud", "CREATE");
        mediaData.append("accountId", accountId);
        mediaData.append("media", item);
        dispatch(mediaCrud(mediaData));
      }
    }

    // dispatch(mediaCrud(mediaData));
    // mediaArray.forEach((file) => {
    //   new Promise((res, rej) => {
    //     const reader = new FileReader();
    //     reader.onprogress = (data) =>
    //       (reader.onload = async () => {
    //         media = new Audio(reader.result);
    //         media.onloadedmetadata = () => res(media.duration);
    //         setMedia((init) => [...init, file]);

    //         // setLocalFiles((init) => [
    //         //   ...init,
    //         //   {
    //         //     media: reader.result,
    //         //     loaded: reader.result ? true : false,
    //         //   },
    //         // ]);
    //       });
    //     reader.readAsDataURL(file);
    //     reader.onerror = (error) => rej(error);
    //   });
    // });
  };
  const handleOverlay = () => setOverlay((prev) => !prev);

  return (
    <Dialog
      parentDialog={false}
      open={openSlideComponent}
      adjustFullscreen={true}
      onClose={handleClose}
    >
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolStyle}>
          <div onClick={handleClose} className="modalBack">
            <IoArrowBack style={arrowStyle} />
            <span className="headerRightSection">Media files </span>
          </div>
        </Toolbar>
      </AppBar>
      <div className={overlay ? "overlay" : ""} onClick={handleOverlay}></div>

      {allData?.length > 0 ? (
        <div className="cardDisplayGrid">
          {allData?.map((data, i) => {
            if (allData?.length === i + 1) {
              return template({ ref: true, data, i });
            } else {
              return template({ ref: false, data, i });
            }
          })}
        </div>
      ) : (
        !loading && allData.length === 0 && <EmptyDataPage title="No media" />
      )}
      {loading && allData?.length === 0 && componentLoader}
    </Dialog>
  );
};

export default memo(TheMediaModal);
