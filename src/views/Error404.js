import React, { memo } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import TheFooter from '../bucket/TheFooter'

const Error404 = ({message, messageTitle}) => {
  return (
    <><div className='unknownPage page'>
      <div className="unknownPageContent">
    <div className="unknownPageContentTitle" >{messageTitle || 404}</div>
    <div>{message || 'Page Not Found'}</div>
    <Link className="unknownPageContentLink" to='/'>Go to home</Link>
    </div>
    </div>
    <TheFooter token={true} /></>
  )
}

export default memo(Error404)