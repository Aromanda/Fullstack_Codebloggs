import express from "express";
import db from "../conn.mjs";
import cors from "cors";
import { ObjectId } from "mongodb";
import PostSchema from "../schemas/post.schemas.mjs";

const router = express.Router();
router.use(cors());

const collection = db.collection("post");

// Create a new post
router.post("/", async (req, res) => {
  try {
    // Create a new post object
    const newPost = new PostSchema(req.body);

    // Insert the new post into the database
    const result = await collection.insertOne(newPost);
    res.status(201).json({ message: "Post created successfully", post: result.ops[0] });

  } catch (error) {
    console.error("Error creating the post:", error);
    res.status(500).json({ error: "Failed to create the post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error getting the posts:", error);
    res.status(500).json({ error: "Failed to get the posts" });
  }
});

export default router;
