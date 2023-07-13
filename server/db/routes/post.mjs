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
export default router;