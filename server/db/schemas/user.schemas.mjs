import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
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
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
