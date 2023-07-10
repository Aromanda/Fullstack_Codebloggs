import mongoose from 'mongoose';

const { Schema } = mongoose;

const sessionSchema = new Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
  },
  session_date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
