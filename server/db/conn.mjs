import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("full_stack");

// Specify the collection
const collection = db.collection('session');

// Check if index on 'createdAt' field exists
const indexInfo = await collection.indexInformation();
const indexExists = !!indexInfo['createdAt_1'];

// If it exists, drop it
if (indexExists) {
  await collection.dropIndex('createdAt_1');
}

// Create a TTL index on the 'createdAt' field. The 'expireAfterSeconds' value of 86400 means 
// that the documents will expire 24 hours after the time specified in the 'createdAt' field.
try {
  await collection.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 86400 } );
  console.log("TTL index created successfully");
} catch(e) {
  console.error(e);
}

export default db;
