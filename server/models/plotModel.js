import mongoose from 'mongoose';

const PlotSchema = new mongoose.Schema(
  {
    plotOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //   required: [true, 'Issuer is required'],
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      //   required: [true, 'Issuer is required'],
    },
    plotOwner: {
      type: String,
      required: [true, 'Plot number is required'],
    },
    surveyNumber: {
      type: String,
      required: [true, 'Survey number is required'],
    },
    plotAddress: {
      type: String,
      required: [true, 'Plot Address is required'],
    },
    thandapperNumber: {
      type: String,
      required: [true, 'thandapperNumber is required'],
    },
    classOfLand: {
      type: String,
      required: [true, 'thandapperNumber is required'],
    },
    plotSize: {
      type: String,
      required: [true, 'Plot size is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'revoked'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Plot = mongoose.model('Plot', PlotSchema);

export default Plot;
