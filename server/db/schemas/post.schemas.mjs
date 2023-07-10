import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: Number,
  time_stamp: String,
});

const PostSchema = new Schema({
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: Number,
  time_stamp: String,
  comments: [CommentSchema],
});

export default mongoose.model('Post', PostSchema);
