import classes from "./notification.module.css";
import { useNotificatinContext } from "../../context/notification-context";

function Notification() {
  const { title, message, status } = useNotificatinContext();
  console.log(title, message, status);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
export default Notification;
