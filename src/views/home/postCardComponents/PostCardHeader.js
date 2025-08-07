import React from 'react'
import TheAvatar from '../../../bucket/TheAvatar'
import moment from 'moment';

const avatarStyle = {
    width: "35px",
    height: "35px",
  };
  const PostCardHeader = ({item}) => {
  return (
    <section className="cardHeader">
        <div className="cardLeft">
          <TheAvatar
            firstName={item?.addedBy?.firstName}
            surname={item?.addedBy?.surname}
            imageURL={item?.addedBy?.picture || item?.addedBy?.logo}
            style={avatarStyle}
            unitName={
              item?.name || item?.addedBy?.name || item?.addedBy?.cAccountName
            }
          />
          <div className="cardHeadingInfo">
            <span className="cardName">
              {item?.addedBy?.fullName || item?.addedBy?.name || item?.addedBy?.cAccountName}
            </span>
            <span className="cardDesc">
              {item?.target?.targetId?.name}{" "}
            </span>
          </div>
        </div>

        <div className="cardRight">
          {item?.reposted && (
            <div
              className="rePost"
              // onClick={handleGetRepost(item._id)}
            >
              {" "}
              Reposted{" "}
            </div>
          )}
          <div className="commentTime">
            {moment(item?.date || item?.postCreatedAt).fromNow()}
          </div>{" "}
        </div>
      </section>
  )
}

export default PostCardHeader