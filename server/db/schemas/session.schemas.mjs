import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const sessionSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  cookie: {
    type: String,
    required: true
  }
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
