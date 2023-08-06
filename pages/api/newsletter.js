import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test2:test2@cluster1.656gljt.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
};
const insertDocument = async (client, doc) => {
  const db = client.db();

  await db.collection("emails").insertOne(doc);
  client.close();
};
const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    //Mongo DB
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Couldn't establish a connection with the database" });
      return;
    }
    try {
      await insertDocument(client, {
        email: userEmail,
        time: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed." });
      return;
    }

    res
      .status(201)
      .json({ message: "You have been registered to our lates updates." });
  }
};
export default handler;
