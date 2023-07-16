import express from "express";
import db from "../conn.mjs";
import cors from "cors";
import { ObjectId } from "mongodb";
import PostSchemas from "../schemas/post.schemas.mjs";
const router = express.Router();
router.use(cors());
const collection = db.collection("post");
// Create a new post
router.post("/", async (req, res) => {
  try {
    const { user_id, post_id, content } = req.body;
    // Create a new comment object
    const newComment = new Comment({ user_id, post_id, content });
    // Save the new comment to the database
    await newComment.save();
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.error("Error creating the comment:", error);
    res.status(500).json({ error: "Failed to create the comment" });
  }
});
router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    console.log(userID);
    const collection = db.collection('post');
    let query = { user_id: new ObjectId(userID) };
    let result = await collection.find(query).toArray();
    console.log(result);
    // Send the comments as a response
    res.status(200).json({ result });
  } catch (error) {
    // Send an error response if there's any issue
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the comments.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const collection = db.collection('post');
    let result = await collection.find({}).toArray();
    console.log(result);
    // Send the comments as a response
    res.status(200).json({ result });
  } catch (error) {
    // Send an error response if there's any issue
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the comments.' });
  }
});
export default router;