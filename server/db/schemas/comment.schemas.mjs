// Import the necessary modules
import mongoose from 'mongoose';
// import { NUMBER } from 'sequelize';

const { Schema } = mongoose;

// Define the Comment schema
const CommentSchema = new Schema({
  content: String,
  post_id: { 
    type: Schema.Types.ObjectId, 
    ref: "Post"
  },
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  likes: {
    type: Number,
    default:0
  },
  timestamp: String,
});

// Export the Comment schema
export default mongoose.model('Comment', CommentSchema);
