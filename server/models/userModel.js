import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'please enter a first name'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'please enter a phone number'],
    },
    branchDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      // required: [true, 'Branch reference is required'],
    },
    designation: {
      type: String,
      required: [true, 'Please add a designation'],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    otp: {
      type: String,
    },
    otpExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

export default User;
