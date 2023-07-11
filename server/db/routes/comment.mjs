import express from 'express';
import db from '../conn.mjs'; // Import the db object from conn.mjs
import CommentSchema from '../schemas/comment.schemas.mjs'; // Specify the collection name as 'comment'

const router = express.Router();

// Handle POST request to /comment endpoint
router.post('/', async (req, res) => {
  try {
    const collection = db.collection('comment');
    // Create a new Comment document
    const newComment = new CommentSchema(req.body);

    // Save the comment to the MongoDB collection
    await collection.insertOne(newComment);

    // Send a success response
    res.status(201).json({ message: 'Comment saved successfully!' });
  } catch (error) {
    // Send an error response if there's any issue
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the comment.' });
  }
});

export default router;
