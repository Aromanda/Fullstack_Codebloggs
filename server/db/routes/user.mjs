import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import UserSchema from "../schemas/user.schemas.mjs";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = new UserSchema (req.body)
 console.log(newDocument)
  let collection = await db.collection("user");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;