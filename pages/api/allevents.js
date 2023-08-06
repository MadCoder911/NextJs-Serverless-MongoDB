import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  const eventId = req.query.eventId;
  console.log(eventId);
  const client = await MongoClient.connect(
    "mongodb+srv://test2:test2@cluster1.656gljt.mongodb.net/events?retryWrites=true&w=majority"
  );
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
