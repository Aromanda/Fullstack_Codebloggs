import express from 'express';
import db from '../conn.mjs';
import CommentSchema from '../schemas/comment.schemas.mjs';
import { ObjectId } from 'mongodb';
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const collection = db.collection('comment');
    // Create a new Comment document
    const newComment = new CommentSchema({
      ...req.body,
      post_id: req.body.post_id, // Assign the post_id from the request body
      user_ID: req.user_ID
    });
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
  router.get('/:postID', async (req, res) => {
  try {
    const { postID } = req.params;
    console.log(postID);
    const collection = db.collection('comment');
    let query = { post_id: new ObjectId(postID) };
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
export default router;