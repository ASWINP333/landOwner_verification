import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      // required: [true, 'document ID is required'],
      unique: true,
    },
    documentUniqueId: {
      type: String,
      // required: [true, 'Document unique is required'],
      unique: true,
    },
    documentName: {
      type: String,
      // required: [true, 'Document name is required'],
    },
    docType: {
      type: String,
      // required: [true, 'Doc Type is required'],
    },
    branchDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      // required: [true, 'Branch reference is required'],
    },
    plotOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //   required: [true, 'Issuer is required'],
    },
    plotDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plot',
      //   required: [true, 'Issuer is required'],
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //   required: [true, 'Issuer is required'],
    },
    transactionDetails: {
      blockNumber: {
        type: Number,
        // required: [true, 'Block number is required'],
      },
      transactionHash: {
        type: String,
        // required: [true, 'Transaction hash is required'],
      },
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'revoked'],
      default: 'pending', // Default status before blockchain confirmation
    },
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
