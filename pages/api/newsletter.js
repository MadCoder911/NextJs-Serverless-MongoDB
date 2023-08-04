import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    //Mongo DB

    const client = await MongoClient.connect(
      "mongodb+srv://test2:test2@cluster1.656gljt.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db
      .collection("emails")
      .insertOne({ email: userEmail, time: new Date().toISOString() });
    client.close();

    res
      .status(201)
      .json({ message: "You have been registered to our lates updates." });
  }
};
export default handler;
