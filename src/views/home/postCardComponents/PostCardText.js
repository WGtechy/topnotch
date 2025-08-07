import React from 'react'

const PostCardText = ({showMore, handleShowMore, item}) => {
  return (
    <div
          className={
            showMore ? "cardInstruction" : "cardInstruction reduceText"
          }
          onClick={handleShowMore}
        >
          {item?.content || item?.target?.targetId?.aimAndPurpose}
        </div>
  )
}

export default PostCardText