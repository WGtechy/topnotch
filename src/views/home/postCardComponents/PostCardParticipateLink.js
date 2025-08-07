import React from 'react'
import { IoChevronForward } from 'react-icons/io5'

const PostCardParticipateLink = ({cAccountAdminAccess, item, handleEventDetails}) => {
  return (!item?.target?.targetId?.serviceHeld && ["Church", "Department"].includes(item?.target?.targetId?.meetingFor?.meetingForTarget) && item?.target?.targetId?.allowScanAttendance && ( 
        <div className="cardLive" onClick={handleEventDetails(item?.target?.targetId._id)}
        > <span>{cAccountAdminAccess ? 'View' :'Participate'}</span> <IoChevronForward /> </div>
       )
  )
}

export default PostCardParticipateLink