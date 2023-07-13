import express from 'express';
import db from '../conn.mjs'; 
import CommentSchema from '../schemas/comment.schemas.mjs'; 

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

// router.get('/:userID', async (req, res) => {
//     try {
//       const collection = db.collection('comment');
//       const { userID } = req.params;
//         console.log(userID);
//       // Find all comments made by the specified user
//       const comments = await collection.find({ user_id: userID }).toArray();
//       console.log(comments);
      
//       // Customize the response to include specific fields from the CommentSchema
//       const formattedComments = comments.map((comment) => {
//         const { _id, likes, content, user_id, post_id, time_stamp } = comment;
//         return {
//           _id,
//           likes,
//           content,
//           user_id,
//           post_id,
//           time_stamp,
//         };
//       });
//       console.log(formattedComments);
//       // Send the formatted comments as a response
//       res.status(200).json({ comments: formattedComments });
//     } catch (error) {
//       // Send an error response if there's any issue
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred while retrieving the comments.' });
//     }
//   });

  router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    
    // Get the "posts" collection from the "MERNreview" database
    const collection = client.db("MERNreview").collection("posts");

    // Perform the aggregation query
    const comments = await collection.aggregate([
      { $match: { user_id: userID } },
      // Add any additional stages you need for the aggregation pipeline
    ]).toArray();

    // Send the comments as a response
    res.status(200).json({ comments });
  } catch (error) {
    // Send an error response if there's any issue
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the comments.' });
  }
});

  
export default router;
