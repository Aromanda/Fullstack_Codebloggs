// Import the necessary modules
import { Schema } from 'mongoose';

// Define the Comment schema
const CommentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  content: String,
  post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  like: Number,
  timestamp: String,
});

// Export the Comment schema
export default CommentSchema;
