import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Number,
    default:0
  },
  time_stamp: String,
  comments: [{
    type: Schema.Types.ObjectId, 
    ref:"Comment"
  }] 
});

export default mongoose.model('Post', PostSchema);
