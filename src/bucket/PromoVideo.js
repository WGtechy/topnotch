import { useRef, useState } from 'react'
import { IoVolumeMute } from 'react-icons/io5';

const PromoVideo = ({src}) => {

    const videoRef = useRef()
      const [isPlaying, setIsPlaying] = useState(false);
      const [mute, setMute] = useState(false)
      const handleVolume = ()=>setMute(prev=>!prev)
     
  return (
    <div className="promoVideo">
     <div className="promoVideoContent"><h2 className="promoVideoContentTitle">
      IT'S TIME TO FIND YOUR LUXURY HOME</h2>
      <p className="promoVideoContentInfo">We are a Real Estate Agency Leading the Luxury Properties Market Throughout the World</p>
      <span className="promoVideoContentDescription">Whether you're looking to buy your next home, or simply have questions about your next property investments, let's connect!!! </span>
      </div>
    <div className="promoVideoTemplate">
                     <video
                     src={src}
                       onContextMenu={(e) => e.preventDefault()}
                       ref={videoRef}
                       alt="view"
                       preload="auto"
                       autoPlay={true}
                       loop
                       muted={mute ? "true" : "false"}
                       playsInline
                       loading="lazy"
                       className="promoVideoTemplateVideo"
                     ></video>
                     <div className="promoVideoTemplatePlay" onClick={handleVolume}>
                       {!mute && (
                         <div className="promoVideoTemplatePlayTemplate">
                           <IoVolumeMute className="promoVideoTemplatePlayTemplateIcon" />
                         </div>
                       )}
                     </div>
                   </div>
                   </div>
  )
}

export default PromoVideo