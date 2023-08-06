import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  const eventId = req.query.eventId;
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster1.656gljt.mongodb.net/events?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);
  if (req.method === "GET") {
    const db = client.db();
    const allDocs = await db
      .collection("events")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: allDocs });
  }
  client.close();
};
export default handler;
