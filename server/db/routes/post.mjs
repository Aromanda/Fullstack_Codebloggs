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
    // Create a new post object
    const newPost = new PostSchemas(req.body);
    const collection = db.collection("post");
    // Insert the new post into the database
    const result = await collection.insertOne(newPost);
    const response = {
      user_id: req.body.user_id,
      post: result
    };
    console.log(response);
    res.status(201).json({ message: "Post created successfully", response });
  } catch (error) {
    console.error("Error creating the post:", error);
    res.status(500).json({ error: "Failed to create the post" });
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
router.patch("/:postId", async (req, res) => {
  try {
    const collection = db.collection("post");
    const postId = req.params.postId;
    const query = { _id: new ObjectId(postId) };
    const update = { $set: { likes: req.body.likes } };  // Update likes with new value from request body
    const result = await collection.updateOne(query, update);
    const updatedPost = await collection.findOne(query);
    const comments = await collection.aggregate(/* ... */).toArray();
    res.status(200).json({ message: "Likes updated successfully", post: updatedPost, comments });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
});
export default router;