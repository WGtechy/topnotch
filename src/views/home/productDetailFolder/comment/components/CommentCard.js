import React, { forwardRef, memo, useRef } from "react";
import TheAvatar from "../../../../../bucket/TheAvatar";
import moment from "moment";

const CommentCard = forwardRef((props, ref) => {
  const { item } = props;
  return (
    <>
      <div ref={ref} className="commentsContainer">
        <div className="commentsContainerAvatar">
          <TheAvatar
            img={item?.accountId?.picture?.media}
            style={{ height: "2.5rem", width: "2.5rem" }}
            firstName={item?.accountId?.firstName}
            surname={item?.accountId?.surname}
          />
        </div>
        <div className="commentsContainerItem">
          <div className="commentsContainerItemHeader">
            <div className="commentsContainerItemHeaderName">
              {item?.accountId?.username}{" "}
            </div>
            <div className="commentsContainerItemHeaderDate">
              {moment(new Date()).calendar()}{" "}
            </div>
          </div>
          <div className="commentsContainerItemContent">{item.content} </div>
        </div>
      </div>
    </>
  );
});

export default memo(CommentCard);
