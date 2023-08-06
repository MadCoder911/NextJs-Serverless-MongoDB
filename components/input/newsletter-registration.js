import { useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { useNotificatinContext } from "../../context/notification-context";

function NewsletterRegistration() {
  const { changeState } = useNotificatinContext();
  const emailRef = useRef();
  function registrationHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      !email.includes("com")
    ) {
      window.alert("Please insert a correct email.");
      return;
    } else {
      changeState({
        title: "Signing up...",
        message: "Registering for newsletter.",
        staus: "pending",
      });
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            changeState({
              title: "You have been signed up.",
              message: "You have been registered to our newsletter.",
              staus: "success",
            });
          }
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
