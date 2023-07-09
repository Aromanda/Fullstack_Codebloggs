import mongoose from 'mongoose';
const { Schema } = mongoose;

const agentSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  region: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  sales: {
    type: Number,
    required: true
  }
});

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;

