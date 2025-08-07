import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { loadingIcon } from "../../../../bucket/loading-components/loadingIcon";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./components/CommentCard";
import { getComments } from "../../../../redux/actions";
import CommentArea from "./components/CommentArea";
import useArrayData from "../../../../utilities-config/useArrayData";
import useUrlSearchParams from "../../../../utilities-config/useUrlSearchParams";
import { IoChatbox } from "react-icons/io5";
// import CommentArea from "./CommentArea";

const Comment = ({ accountId, postId }) => {

  const dispatch = useDispatch();

  const {
    postComments,
    loadingComments,
    loadingComment,
    comment: newComment,
  } = useSelector((state) => state.comments);
  const topRef = useRef("");

  const { ctype } = useUrlSearchParams();
  const [skip, setSkip] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const commentObserver = useRef();
  const allData = useArrayData(currentData);

  useEffect(() => {
    if (ctype === "comment" && postId) {
      dispatch(
        getComments({
          skip,
          postId,
          crud: "POST-COMMENTS",
          accountId,
        })
      );
    }
  }, [dispatch, accountId, skip, ctype, postId]);

  // const handleClickScrollToTop = useCallback(() => {
  //   topRef?.current?.scrollIntoView({ behaviour: "smooth" });
  // }, []);

  const commentRef = useCallback(
    (node) => {
      if (loadingComments) return;
      if (commentObserver.current) commentObserver.current.disconnect();
      commentObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && postComments.length > 0) {
          setSkip((prev) => prev + 1);
        }
      });
      if (node) commentObserver.current.observe(node);
    },
    [loadingComments, postComments]
  );

  useEffect(() => {
    if (accountId && ctype === "comment") {
      if (postComments.length > 0) {
        setCurrentData((init) => [...init, ...postComments]);
      }
    }
  }, [postComments, newComment, ctype, accountId]);

  const card = ({ i, ref, item }) => {
    return (
      <CommentCard
        key={i}
        index={i}
        ref={ref ? commentRef : null}
        item={item}
      />
    );
  };

  const commentAreaProps = { accountId, postId };
  return (
    <div className="comments">
    <div className="commentsTitle">
            <span className="commentsTitleIcon">
              {" "}
              <IoChatbox />
            </span>
            Comment
          </div>
      {/* <CommentArea {...commentAreaProps} /> */}
      <section ref={topRef}></section>
      {allData.length > 0
        ? allData.map((item, i) => {
            if (allData.length === i + 1) {
              return card({ item, i, ref: true });
            } else {
              return card({ item, i });
            }
          })
        : allData.length === 0 &&
          !loadingComments && <div className="commentsEmpty">No comment on this property yet.</div>}
          {loadingComments && loadingIcon}
    </div>
  );
};

export default memo(Comment);
