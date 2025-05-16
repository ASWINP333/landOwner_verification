import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    bId: {
      type: String,
      required: [true, 'Branch ID is required'],
      unique: true,
    },
    branchName: {
      type: String,
      required: [true, 'Branch name is required'],
    },
    address: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
