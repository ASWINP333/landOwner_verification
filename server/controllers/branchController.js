import { Branch } from '../models/index.js';

const createBranch = async (req, res) => {
  try {
    const { bId, branchName, address } = req.body;

    if (!bId || !branchName) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const branchExist = await Branch.findOne({ bId });

    if (branchExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'Branch exists, check branch ID',
      });
    }

    const branch = await Branch.create({
      bId,
      branchName,
      address,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Branch created succesfully',
      branchData: {
        id: branch?._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating branch',
    });
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    return res.status(200).json({
      status: 'success',
      message: 'Branches fetched successfully',
      branches,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching Branches',
    });
  }
};

const getBranchById = async (req, res) => {
  try {
    const { bId } = req.params;
    const branch = await Branch.findOne({ bId: bId });
    return res.status(200).json({
      status: 'success',
      message: 'Branch fetched successfully',
      branch,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching branch',
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { bId } = req.params;
    const branch = await Branch.findOne({ bId: bId });
    if (!branch) {
      return res.status(404).json({
        status: 'failed',
        message: 'Branch not found',
      });
    }
    const updatedBranch = await Branch.findOneAndUpdate(
      { bId: bId },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Branch updated successfully',
      updatedBranch,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while updating Branch',
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { bId } = req.params;
    const branch = await Branch.findOne({ bId: bId });
    if (!branch) {
      return res.status(404).json({
        status: 'failed',
        message: 'Branch not found',
      });
    }
    await Branch.findOneAndDelete({ bId: bId });
    return res.status(200).json({
      status: 'success',
      message: 'Branch deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting branch',
    });
  }
};

export const branchController = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
