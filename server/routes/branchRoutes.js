import express from 'express';

const branchRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { branchController } from '../controllers/index.js';

branchRoutes
  .route('/create')
  .post(authenticate.user, branchController.createBranch);
branchRoutes.route('/getAll').get(branchController.getAllBranches);
branchRoutes
  .route('/get/:bId')
  .get(authenticate.user, branchController.getBranchById);
branchRoutes
  .route('/update/:bId')
  .put(authenticate.user, branchController.updateBranch);
branchRoutes.route('/delete/:bId').delete(branchController.deleteBranch);

export default branchRoutes;
