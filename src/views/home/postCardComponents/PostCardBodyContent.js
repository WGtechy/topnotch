import React from 'react'
import TheAvatar from '../../../bucket/TheAvatar'

const PostCardBodyContent = ({item, handleGetRepost}) => {
  return (
    <section className="cardBody">
        <span className="">
        </span>
        {item?.reposted && (
          <div
            className="repostContainer"
            onClick={handleGetRepost(item?.parentPost?._id)}
          >
            <section className="cardHeader">
              <div className="cardLeft">
                <TheAvatar
                  firstName={item?.parentPost?.addedBy?.firstName}
                  surname={item?.parentPost?.addedBy?.surname}
                  imageURL={
                    item?.parentPost?.addedBy?.picture ||
                    item?.parentPost?.addedBy?.logo
                  }
                  unitName={
                    item?.parentPost?.name ||
                    item?.parentPost?.addedBy?.name ||
                    item?.parentPost?.addedBy?.cAccountName
                  }
                />
                <div className="cardHeadingInfo">
                  <span className="cardName">
                    {item?.parentPost?.addedBy?.fullName
                      ? item?.parentPost?.addedBy?.fullName
                      : item?.parentPost?.addedBy?.cAccountName
                      ? "Church"
                      : item?.parentPost?.name}
                  </span>
                  <span className="cardDesc">
                    {item?.parentPost?.target?.targetId?.name}
                  </span>
                </div>
              </div>

              
            </section>

            <div className="repostContainerContent">
              {item?.parentPost?.content ||
                item?.parentPost?.target?.targetId?.instruction}
            </div>
          </div>
        )}
      </section>
  )
}

export default PostCardBodyContent