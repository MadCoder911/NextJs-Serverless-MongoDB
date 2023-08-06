import Button from "../ui/button";
import classes from "./results-title.module.css";
import Link from "next/link";
function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Link href={"/events"}>
        <Button>Show all events</Button>
      </Link>
    </section>
  );
}

export default ResultsTitle;
