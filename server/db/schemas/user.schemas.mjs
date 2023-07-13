import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    user_id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default:"",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  auth_level: {
    type: String,
    default:"basic",
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
