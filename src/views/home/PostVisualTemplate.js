import { memo, forwardRef, useCallback, useRef, useState } from "react";
import {
  IoLockClosed,
  IoLockOpen,
  IoPause,
  IoPlay,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
const audioMimtype = [
  "audio/x-m4a",
  "audio/mp3",
  "audio/mpeg",
  "audio/x-wav",
  "audio/ogg",
];

const videoMimtype = [
  "video/mp4",
  "video/mob",
  "video/webm",
  "video/x-m4v",
  "video/avi",
];

const PostVisualTemplate = forwardRef(
  (
    {
      multipleData,
      singleData,
      isMobile,
      volume,
      toggleVolume,
      handleSelectFile,
      isPage,
      post,
      videoRef,
    },
    ref
  ) => {
    const imageMimtype = ["image/png", "image/jpeg", "image/png", "image/jpg"];

    // const [isActive, setIsActive] = useState([])

    const observer = useRef();
    const handleClickPlay = useCallback(
      ({ index, action }) =>
        () => {
          if (action === "play") {
            videoRef.current.play();
          } else if(action === "pause") {
            videoRef.current.pause();

          } 
        },
      [videoRef]
    );
    const focusElement = useCallback(
      (node) => {
        // if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
          (entries) => {
            let entry = null;
            for (entry of entries) {
              if (entry?.isIntersecting) {
                
                // let item = entry.target.childNodes[3]?.childNodes[0]?.childNodes[0]
                    // ?.childNodes[0]?.childNodes[0]?.classList[0] === "video"
                if (
                  isMobile && entry.target.childNodes[0]?.childNodes[0]?.classList[0] === "postSliderContainerItemVideoMedia"
                ) {
                  let item = entry.target.childNodes[0].childNodes[0]
                  item?.play()
                  // let id = item.getAttribute("data");
                  // setIsActive((prev) => [{ id, item }, ...prev]);
                }
              } else {
                if (
                  isMobile && entry.target.childNodes[0]?.childNodes[0]?.classList[0] === "postSliderContainerItemVideoMedia"
                ) {
                  let item = entry.target.childNodes[0]?.childNodes[0]

                  // let id = item.getAttribute("data");
                  item.pause();
  
                  // setIsActive((prev) => prev.filter((x) => x.id !== id));
                } else {
                  return;
                }
              }
            }
          },
          {
            threshold: 0.6,
            // rootMargin: "100px"
          }
        );
        if (node) observer?.current?.observe(node);
      },
      [isMobile]
    );

    const handleImageError = (e) => {
      e.currentTarget.style.display = "none";
      e.currentTarget.onerror = null;
    };

    // const handleClickMultiCards = useCallback(({videoRef, action})=>()=>{
    //   let element = document?.body.parentNode.style;
    //   if (action === "play") {
    //     videoRef.current.play();
    //     // if (element) {
    //     //   element.overflowY = "hidden";
    //     //   document.getElementById("bd").classList.add("styleBody");
    //     // }
    //   } else {
    //     videoRef.current.pause();
    //     setActive(null);
    //     //  if (element) {
    //     //     document.getElementById("bd").classList.remove("styleBody");
    //     //     element.overflowY = "auto";
    //     //   }
    //   }

    //   // const item = ref.childNodes[3]?.childNodes[0]?.childNodes[0]
    //   // ?.childNodes[0]?.childNodes[0]
    // },[setActive])

    const singleTemplate = () => (
      <div className="singleFileContainer">
        <div className="singleFile" ref={ref}>
          {/* { !play && <div className="playToggle"><IoPlay className ='playAndPauseIcon' /></div>} */}
          {imageMimtype.includes(singleData?.mimetype) ? (
            <div
              className="sliderObject"
              // style={sliderImage}
              // onClick={handleRedirect}
            >
              <img
                src={singleData?.media}
                alt="post"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ) : audioMimtype.includes(singleData?.mimetype) ? (
            <div className="audioDiv">
              <div className="audio">Audio</div>
              <div className="loader">
                <div className="stroke"></div>
                <div className="stroke"></div>
                <div className="stroke"></div>
                <div className="stroke"></div>
                <div className="stroke"></div>
                <div className="stroke"></div>
                <div className="stroke"></div>
              </div>
            </div>
          ) : (
            videoMimtype.includes(singleData?.mimetype) && (
              <div className="videoContainer">
                {/* {isWaiting && <div className="loader">{loadingIcon}</div>} */}

                <video
                  ref={videoRef}
                  alt="post-media"
                  data={post?._id}
                  src={singleData?.media || singleData?.target?.targetId?.media}
                  onContextMenu={(e) => e.preventDefault()}
                  loop
                  onError={(e) => handleImageError(e)}
                  className="video"
                  // muted
                  preload="auto"
                  title="media"
                  webkit-playsinline="true"
                  playsInline={true}
                  autoPlay={isMobile || isPage}
                  muted={volume ? "" : "muted"}
                  loading="lazy"
                  // onClick={handleRedirect}
                  // onMouseOver={() => setMediaPlay(!mediaPlay)}
                  // onTouchMoveCapture={() => setMediaPlay(!mediaPlay)}
                  // onMouseOver={handlePlayDesk}
                  // onMouseOut={handlePlayDeskStop}
                />
                 {!isMobile && 
                  <div className="postSliderContainerItemVideoPlay" onClick={handleSelectFile({index: 0, type: 'video', media: [singleData]})}>
                    <IoPlay className="mediaIcon" />
                  </div>
                }
                {/* <div className="videoBtn">
                  {!isMobile || isPage ? (
                    <div className="playBtn" onClick={togglePlay}>
                      {active === postId ? (
                        <IoPause
                          className="mediaIcon"
                          onClick={handleClickPlay({
                            action: "pause",
                            index: post._id,
                          })}
                        />
                      ) : (
                        <IoPlay
                          className="mediaIcon"
                          onClick={handleClickPlay({
                            action: "play",
                            index: post._id,
                          })}
                        />
                      )}
                    </div>
                  ) : null}
                  

                  <div className="volumeBtn" onClick={toggleVolume}>
                    {volume ? (
                      <IoVolumeHigh className="mediaIcon" />
                    ) : (
                      <IoVolumeMute className="mediaIcon" />
                    )}
                  </div>
                </div> */}
              </div>
            )
          )}
        </div>
      </div>
    );
    const multipleTemplate = ({item, i, ref}) => (
          <div className="postSliderContainerItem" key={i} ref={focusElement}>
            {imageMimtype.includes(item?.mimetype) ? (
              //
              <img
                src={item?.media}
                alt="post"
                className="postSliderContainerItemImage"
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : audioMimtype.includes(item?.mimetype) ? (
              <div className="audioDiv" onClick={
                isMobile ? handleClickPlay({index: i,type: 'audio',  media: multipleData}) :
                handleSelectFile({index: i,type: 'audio',  media: multipleData})
                }>
                {/* <div className="audio">Audio</div> */}
                {/* <div className="loader">
                  <div className="stroke stroke1"></div>
                  <div className="stroke stroke2"></div>
                  <div className="stroke stroke3"></div>
                  <div className="stroke stroke4"></div>
                  <div className="stroke stroke5"></div>
                  <div className="stroke stroke6"></div>
                  <div className="stroke stroke7"></div>
                </div> */}
                <img src="audio.png" alt='audio' className="audioDivImg" />
                  <div className="audioDivAudio" onClick={handleSelectFile({index: i, type: 'audio', media: multipleData})}>
                    <IoPlay className="mediaIcon" />
                  </div>
              </div>
            ) : (
              videoMimtype.includes(item?.mimetype) && (
                <div className="postSliderContainerItemVideo">
                  {/* {isWaiting && <div className="loader">{loadingIcon}</div>} */}

                  <video
                    ref={isMobile ? videoRef : null}
                    alt="post-media"
                    data={post?._id+i}
                    src={item?.media || item?.target?.targetId?.media}
                    onContextMenu={(e) => e.preventDefault()}
                    loop
                    onError={(e) => handleImageError(e)}
                    className="postSliderContainerItemVideoMedia"
                    // muted
                    preload="auto"
                    title="media"
                    webkit-playsinline="true"
                    playsInline={true}
                    autoPlay={isMobile || isPage}
                    muted={volume ? "" : "muted"}
                    loading="lazy"
                    // onClick={handleRedirect}
                    // onMouseOver={() => setMediaPlay(!mediaPlay)}
                    // onTouchMoveCapture={() => setMediaPlay(!mediaPlay)}
                    // onMouseOver={handlePlayDesk}
                    // onMouseOut={handlePlayDeskStop}
                  />
                  <div className="videoBtn">
                    {/* {!isMobile || isPage ? (
                      <div className="playBtn" onClick={togglePlay}>
                        {active === postId ? (
                          <IoPause
                            className="mediaIcon"
                            onClick={handleClickMultiCards({
                              action: "pause",
                              videoRef
                            })}
                          />
                        ) : (
                          <IoPlay
                            className="mediaIcon"
                            onClick={handleClickMultiCards({
                              action: "play",
                              videoRef
                            })}
                          />
                        )}
                      </div>
                    ) : null} */}
                    

                    {isMobile && <div className="volumeBtn" onClick={toggleVolume}>
                      {volume ? (
                        <IoVolumeHigh className="mediaIcon" />
                      ) : (
                        <IoVolumeMute className="mediaIcon" />
                      )}

                
                    </div>
                    }
                    {/* <div className="totalPlaysContainer" onClick={null}>
                  <IoEye className="mediaIcon" />{" "}
                  <span className="totalPlays" style={viewStyle}>
                    {convertNumbers({ value: totalPlays})}
                  </span>
                </div> */}
                  </div>
                  
                      {!isMobile && 
                  <div className="postSliderContainerItemVideoPlay" onClick={handleSelectFile({index: i, type: 'video', media: multipleData})}>
                    <IoPlay className="mediaIcon" />
                  </div>
                }
                </div>
              )
            )}
            
          </div>
    );

    // const sliderImage = { backgroundImage: `url(${singleData?.media})` };
    // const sliderImage = {
    //   // backgroundImage: `url(${singleData?.media})`,
    //   // backgroundRepeat: 'no-repeat',
    //   backgroundPosition: "center",
    //   backgroundSize: "cover",
    // };
    return (
      <>
        {/* <div
          className={active && active === postId ? "overlay" : ""}
          onClick={handleClickPlay({ action: "pause" })}
        ></div> */}
        {singleData?.mimetype
          ? singleTemplate()
          : !!multipleData?.length
          ?  <div
        className="imageSliderContainer postSliderContainer slidersContainer"
        ref={ref}
      >{multipleData.map((item, i) => {
              if (multipleData.length === i + 1) {
                return multipleTemplate({ item, i, ref: true });
              } else {
                return multipleTemplate({ item, i });
              }
            })}
            </div>
          : null}
      </>
    );
  }
);

export default memo(PostVisualTemplate);














