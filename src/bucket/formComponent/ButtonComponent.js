import React from 'react'

const ButtonComponent = ({title, type, display, onClick, style}) => {
  return (
   display ? <div className='btnComponent' onClick={onClick || null} style={style}>{title}</div> : null
  )
}

export default ButtonComponent