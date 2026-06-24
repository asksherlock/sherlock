const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:JNFjw39cijtYDUnB@ac-ierss2g-shard-00-00.a3jhrbt.mongodb.net:27017,ac-ierss2g-shard-00-01.a3jhrbt.mongodb.net:27017,ac-ierss2g-shard-00-02.a3jhrbt.mongodb.net:27017/payload-blog?ssl=true&replicaSet=atlas-ierss2g-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("✅ Connected successfully to MongoDB!");
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
