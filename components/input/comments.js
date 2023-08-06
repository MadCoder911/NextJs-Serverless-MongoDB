import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { useNotificatinContext } from "../../context/notification-context";
function Comments(props) {
  const { eventId } = props;
  const { changeState } = useNotificatinContext();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    changeState({
      title: "Posting..",
      message: "Your comment is being posted...",
      status: "pending",
      show: true,
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        changeState({
          title: "Success...",
          message: "Your comment has been posted",
          status: "success",
          show: true,
        });

        setTimeout(() => {
          changeState({
            title: "",
            message: "",
            status: "success",
            show: false,
          });
        }, 3000);
      });
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
