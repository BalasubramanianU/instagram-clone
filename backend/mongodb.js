const { MongoClient } = require("mongodb");

async function main(payload) {
  const uri =
    "mongodb+srv://Santhosh:PsctFdw0ZFIB5HrA@cluster0.7lzyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await client
      .db("instagram-clone")
      .collection("users")
      .insertOne(payload, (err) => console.log(err));
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

module.exports = main;
