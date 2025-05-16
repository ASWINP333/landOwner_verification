import { Branch, Document, User } from '../models/index.js';

const getDashboardValues = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const { branchDetails } = req.user;

    const documents =
      role === 'user'
        ? await Document.find({ plotOwnerId: userId })
        : await Document.find({ issuedBy: userId });
    const branches = await Branch.find();
    const users =
      role === 'Verifier'
        ? await User.find({ branchDetails: branchDetails })
        : await User.find({ creatorId: userId });

    const dashboardData = {
      documents: documents.length,
      branches: branches.length,
      users: users.length,
    };

    return res.status(200).json({
      status: 'success',
      message: 'Dashboard details fetched successfully',
      dashboardData,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching dashboard details.',
      error: error.message,
    });
  }
};

export const dashboardController = {
  getDashboardValues,
};
