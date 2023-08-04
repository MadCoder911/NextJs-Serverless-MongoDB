import classes from "./comment-list.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items.map((item) => {
        return (
          <>
            <li key={item._id}>
              <p>{item.text}</p>
              <div>
                By <address>@{item.name}</address>
              </div>
            </li>
          </>
        );
      })}
    </ul>
  );
}

export default CommentList;
