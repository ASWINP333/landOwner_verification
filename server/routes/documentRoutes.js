import express from 'express';

const documentRoutes = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import { documentController } from '../controllers/index.js';

documentRoutes
  .route('/create')
  .post(authenticate.user, documentController.createDocument);

documentRoutes
  .route('/verify/:documentId/:plotId')
  .post(authenticate.user, documentController.verifyDocument);

documentRoutes
  .route('/revoke/:documentId')
  .delete(authenticate.user, documentController.revokeDocument);

documentRoutes
  .route('/getAll')
  .get(authenticate.user, documentController.getAllDocument);

documentRoutes
  .route('/get/date')
  .get(authenticate.user, documentController.getDocumentsByDate);

documentRoutes
  .route('/getMyDocuments')
  .get(authenticate.user, documentController.getMyDocuments);

documentRoutes
  .route('/get/:documentId/:bId')
  .get(documentController.getSingleDocument);

documentRoutes
  .route('/update/:documentId')
  .put(authenticate.user, documentController.updateDocument);

documentRoutes
  .route('/delete/:id')
  .delete(authenticate.user, documentController.deleteDocument);

documentRoutes
  .route('/plot/create')
  .post(authenticate.user, documentController.createPlot);

documentRoutes
  .route('/plot')
  .get(authenticate.user, documentController.getAllPlots);

documentRoutes
  .route('/plot/update/:id')
  .put(authenticate.user, documentController.updatePlotStatus);

documentRoutes
  .route('/plot/delete/:id')
  .delete(authenticate.user, documentController.deletePlot);

documentRoutes
  .route('/plot/get/:id')
  .get(authenticate.user, documentController.getSinglePlot);

export default documentRoutes;
