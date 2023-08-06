import classes from "./notification.module.css";
import { useNotificatinContext } from "../../context/notification-context";

function Notification() {
  const { title, message, status, show } = useNotificatinContext();

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
  let hiddenClass = show ? classes.show : classes.hide;

  const activeClasses = `${classes.notification} ${statusClasses} ${hiddenClass}`;

  return (
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
export default Notification;
