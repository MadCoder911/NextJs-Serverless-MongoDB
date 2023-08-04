import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  const eventId = req.query.eventId;
  console.log(eventId);
  const client = await MongoClient.connect(
    "mongodb+srv://test2:test2@cluster1.656gljt.mongodb.net/events?retryWrites=true&w=majority"
  );
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    //validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid inputs !" });
      return;
    }
    //Validation done
    //Mongo DB
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Comment Added", comment: newComment });
  } else if (req.method === "GET") {
    const db = client.db();
    const allDocs = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: allDocs });
  }
  client.close();
};
export default handler;
