import mongoose, { Schema } from 'mongoose';
const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required:true
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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
});
export default mongoose.model('Post', PostSchema);