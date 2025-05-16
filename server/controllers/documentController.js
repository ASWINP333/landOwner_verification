import {
  contractInstance,
  deployerAddress,
} from '../blockchain-services/instance.js';
import { Branch, Document, Plot } from '../models/index.js';

const createDocument = async (req, res) => {
  try {
    const { documentId, documentName, docType, plotDetails, plotOwnerId } =
      req.body;

    const { _id } = req.user;

    const issuedBy = _id;

    const branchId = req.user.branchDetails;

    const branchDetails = await Branch.findById({ _id: branchId });

    const documentUniqueId = documentId + branchDetails?.bId;

    if (!documentId || !documentName || !docType || !plotDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const documentExist = await Document.findOne({ documentId });

    if (documentExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'Document exists, check document ID',
      });
    }

    const document = await Document.create({
      documentId,
      documentUniqueId,
      documentName,
      docType,
      branchDetails: branchId,
      plotDetails,
      issuedBy,
      plotOwnerId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Document created succesfully',
      documentData: {
        id: document._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating document',
    });
  }
};

const verifyDocument = async (req, res) => {
  try {
    const { documentId ,plotId} = req.params;
    const document = await Document.findOne({
      documentId: documentId,
    })
      .populate('branchDetails')
      .populate('plotDetails');

    if (!document) {
      return res.status(404).json({
        status: 'failed',
        message: 'Document not found',
      });
    }

    const trx = await contractInstance.methods
      .issue(
        document.documentUniqueId,
        document.documentId,
        document.documentName,
        document.docType,
        document.plotDetails.plotOwner,
        document.plotDetails.surveyNumber,
        document.plotDetails.plotAddress,
        document.branchDetails.branchName
      )
      .send({ from: deployerAddress, gasLimit: 927000 });

    if (!trx) {
      return res.status(400).json({
        status: 'error',
        message:
          'Something went wrong while creating certificate in blockchain',
      });
    }

    await Document.findOneAndUpdate(
      { documentId: documentId },
      {
        status: 'verified',
        transactionDetails: {
          transactionHash: trx.transactionHash,
          blockNumber: trx.blockNumber.toString(),
        },
      },
      { new: true }
    );

    await Plot.findOneAndUpdate(
      { _id: plotId },
      {
        status: 'verified',
      },
      { new: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Document verified successfully',
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while verifying Document',
    });
  }
};

const revokeDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const certificate = await Document.findOne({ documentId: documentId });

    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Document not found',
      });
    }

    await Document.findOneAndUpdate(
      { documentId: documentId },
      {
        status: 'revoked',
      },
      { new: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Document rovoked successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while revoking Document',
    });
  }
};

const getAllDocument = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate('branchDetails')
      .populate('plotDetails');
    return res.status(200).json({
      status: 'success',
      message: 'Documents fetched successfully',
      documents,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching documents',
    });
  }
};

const getMyDocuments = async (req, res) => {
  try {
    const { _id, role, branchDetails } = req.user;

    const documents =
      role === 'user'
        ? await Document.find({ plotOwnerId: _id })
            .populate('branchDetails')
            .populate('issuedBy')
            .populate('plotDetails')
        : role === 'Verifier'
          ? await Document.find({ branchDetails: branchDetails })
              .populate('branchDetails')
              .populate('issuedBy')
              .populate('plotDetails')
          : await Document.find()
              .populate('branchDetails')
              .populate('issuedBy')
              .populate('plotDetails');

    return res.status(200).json({
      status: 'success',
      message: 'documents fetched successfully',
      documents,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching my documents',
    });
  }
};

const getSingleDocument = async (req, res) => {
  try {
    const { documentId, bId } = req.params;
    const documentUniqueId = documentId + bId;
    const document = await Document.findOne({
      documentUniqueId: documentUniqueId,
    })
      .populate('branchDetails')
      .populate('issuedBy')
      .populate('plotDetails');

    return res.status(200).json({
      status: 'success',
      message: 'Document fetched successfully',
      document,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching documents',
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findOne({ documentId: documentId });
    if (!document) {
      return res.status(404).json({
        status: 'failed',
        message: 'Document not found',
      });
    }
    const updatedDocument = await Document.findOneAndUpdate(
      { documentId: documentId },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Documents updated successfully',
      updatedDocument,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while updating documents',
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({ _id: id });
    if (!document) {
      return res.status(404).json({
        status: 'failed',
        message: 'Document not found',
      });
    }
    await Document.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: 'success',
      message: 'Document deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting Document',
    });
  }
};

const getDocumentsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const { _id } = req.user;

    const issuedBy = _id;

    // Validate date range
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required',
      });
    }

    // Parse dates and ensure valid format
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set the end date to the end of the day

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format',
      });
    }

    // Find documents within the date range and sort by createdAt (ascending)
    const documents = await Document.find({
      createdAt: { $gte: start, $lte: end },
      issuedBy: issuedBy,
    })
      .populate('branchDetails')
      .populate('issuedBy')
      .populate('plotDetails')
      .sort({ createdAt: 1 });

    if (!documents.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No documents found for the given date range',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Documents fetched successfully',
      documents,
    });
  } catch (error) {
    console.error('Error fetching documents by date:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while getting documents',
    });
  }
};

const createPlot = async (req, res) => {
  try {
    const {
      plotOwner,
      surveyNumber,
      plotAddress,
      thandapperNumber,
      classOfLand,
      plotSize,
    } = req.body;

    const { _id, branchDetails } = req.user;

    const plotOwnerId = _id;

    if (
      !plotOwner ||
      !surveyNumber ||
      !plotAddress ||
      !thandapperNumber ||
      !classOfLand ||
      !plotSize
    ) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const plot = await Plot.create({
      plotOwner,
      surveyNumber,
      plotAddress,
      thandapperNumber,
      classOfLand,
      plotSize,
      plotOwnerId,
      branchId: branchDetails,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Plot created succesfully',
      plotData: {
        id: plot._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating plot',
    });
  }
};

const getAllPlots = async (req, res) => {
  try {
    const { _id, role, branchDetails } = req.user;

    const plot =
      role === 'user'
        ? await Plot.find({ plotOwnerId: _id })
        : role === 'Verifier'
          ? await Plot.find({ branchId: branchDetails })
          : await Plot.find();

    return res.status(201).json({
      status: 'success',
      message: 'Plot created succesfully',
      plot,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while getting plot',
    });
  }
};

const getSinglePlot = async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await Plot.findById({ _id: id });

    return res.status(200).json({
      status: 'success',
      message: 'Plot Fetched succesfully',
      plot,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while getting plot',
    });
  }
};

const updatePlotStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 'failed',
        message: 'Status field is required',
      });
    }

    const updatedPlot = await Plot.findByIdAndUpdate(
      id,
      { status },
      { new: true } // returns the updated document
    );

    if (!updatedPlot) {
      return res.status(404).json({
        status: 'failed',
        message: 'Plot not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Plot updated successfully',
      data: updatedPlot,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating Plot',
      error: error.message, // helpful for debugging
    });
  }
};

const deletePlot = async (req, res) => {
  try {
    const { id } = req.params;
    const plot = await Plot.findOne({ _id: id });
    if (!plot) {
      return res.status(404).json({
        status: 'failed',
        message: 'Plot not found',
      });
    }
    await Plot.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: 'success',
      message: 'Plot deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting Plot',
    });
  }
};

export const documentController = {
  createDocument,
  getAllDocument,
  getSingleDocument,
  updateDocument,
  deleteDocument,
  getMyDocuments,
  verifyDocument,
  revokeDocument,
  getDocumentsByDate,
  createPlot,
  getAllPlots,
  updatePlotStatus,
  deletePlot,
  getSinglePlot,
};
