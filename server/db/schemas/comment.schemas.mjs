import mongoose, { Schema } from 'mongoose';
const CommentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  time_stamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});
export default mongoose.model('Comment', CommentSchema);