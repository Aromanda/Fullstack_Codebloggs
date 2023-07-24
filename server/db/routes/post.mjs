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
      post: result,
    };
    console.log(response);
    res.status(201).json({ message: "Post created successfully", response });
  } catch (error) {
    console.error("Error creating the post:", error);
    res.status(500).json({ error: "Failed to create the post" });
  }
});

// Retrieve posts based on a date range
router.get("/", async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const collection = db.collection("post");
    let query = {};

    if (fromDate && toDate) {
      // Convert fromDate and toDate to JavaScript Date objects
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      // Adjust the toDate to include the full day
      toDateObj.setDate(toDateObj.getDate() + 1);

      // Add the date range condition to the query
      query = {
        time_stamp: {
          $gte: fromDateObj.toISOString(),
          $lt: toDateObj.toISOString(),
        },
      };
    }

    let result = await collection.find(query).toArray();
    console.log(result);
    // Send the posts as a response
    res.status(200).json({ result });
  } catch (error) {
    // Send an error response if there's any issue
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the posts." });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const collection = db.collection("post");
    const postId = req.params.postId;
    const query = { _id: new ObjectId(postId) };
    const update = { $set: { likes: req.body.likes } }; // Update likes with new value from request body
    const result = await collection.updateOne(query, update);
    const updatedPost = await collection.findOne(query);
    const comments = await collection.aggregate(/* ... */).toArray();
    res.status(200).json({ message: "Likes updated successfully", post: updatedPost, comments });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Delete the post
    const postDeleteResult = await collection.deleteOne({ _id: new ObjectId(postId) });

    if (postDeleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the associated comments
    const commentCollection = db.collection("post");
    const commentDeleteResult = await commentCollection.deleteMany({ post_id: new ObjectId(postId) });

    res.status(200).json({
      message: "Post and associated comments deleted successfully",
      postDeletedCount: postDeleteResult.deletedCount,
      commentDeletedCount: commentDeleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting the post:", error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
});

export default router;