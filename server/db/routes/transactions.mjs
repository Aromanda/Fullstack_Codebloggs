import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET endpoint at /transaction-data to get the last 10 transactions
router.get("/transaction-data", async (req, res) => {
  let collection = await db.collection("transactions");
  let results = await collection.find({}).sort({_id: -1}).limit(10).toArray();
  res.status(200).send(results);
});

router.post("/transaction", async (req, res) => {
  try {
    const { agentId, amount } = req.body;
    console.log("1");
    let transactionsCollection = await db.collection("transactions");
    const newTransaction = { agentId, amount: parseFloat(amount) , timestamp: new Date()}; 

    const result = await transactionsCollection.insertOne(newTransaction);
    console.log("2");
    console.log("Inserted transaction for agentId:", agentId);
    console.log("Transaction amount:", newTransaction.amount); // Use parsed amount

    let agentsCollection = await db.collection("agents");

    const agentObjectId = new ObjectId(agentId);
    console.log("Converted agentId to ObjectId:", agentObjectId);

    const agent = await agentsCollection.findOneAndUpdate(
      { _id: agentObjectId },
      { $inc: { sales: newTransaction.amount } }, // Use parsed amount
      { returnOriginal: false }
    );
    console.log("3");
    if (!agent.value) {
      return res.status(404).send("Agent not found");
    }

    console.log("Updated agent sales:", agent.value.sales);
    res.status(200).json({ transaction: result.ops[0], agentUpdate: agent.value });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred");
  }
});


export default router;
