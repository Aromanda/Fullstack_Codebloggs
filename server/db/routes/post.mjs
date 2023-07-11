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
    const { content, user_id, likes, comment } = req.body;

    // Create a new post object
    const newPost = {
      content,
      user_id: new ObjectId(user_id),
      likes,
      comment,
      timestamps: new Date(),
    };

    // Insert the new post into the database
    const result = await collection.insertOne(newPost);

    if (result.insertedCount === 1) {
      const insertedPost = result.ops[0];
      res.status(201).json({ message: "Post created successfully", post: insertedPost });
    } else {
      res.status(500).json({ error: "Failed to create the post" });
    }
  } catch (error) {
    console.error("Error creating the post:", error);
    res.status(500).json({ error: "Failed to create the post" });
  }
});

export default router;
