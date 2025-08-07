import React from 'react'
import { handleImageError } from '../utilities-config/utils'

const Image = ({src, alt, pictureStyle, className, onClick, srcSet}) => {

  return (
            <img src={src} alt={alt || "banner"} onClick={onClick}  className={className || ""} srcSet={srcSet || ""} style={pictureStyle || {}} loading="lazy" onError={(e)=>handleImageError(e)} onContextMenu={(e) => e.preventDefault()} />
  )
}

export default Image