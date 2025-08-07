import { forwardRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { addComment } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";

const CommentArea = forwardRef(({ accountId, postId }, ref) => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        addComment({
          postId,
          accountId: accountId,
          content: comment,
        })
      );
      setComment("");
    }
  };
  const [comment, setComment] = useState("");

  const commentHandler = (e) => setComment(e.target.value);

  return (
    <div className="commentArea" ref={ref}>
      <form onSubmit={submitHandler} className="commentAreaForm">
        <input
          placeholder={"Type your comment here"}
          onChange={commentHandler}
          value={comment}
          required={true}
          autoFocus={false}
          autoComplete="off"
          className="commentAreaFormInput"
        />
        {comment && (
          <button className="sendReply">
            <IoSend />
          </button>
        )}
      </form>
    </div>
  );
});

export default CommentArea;
