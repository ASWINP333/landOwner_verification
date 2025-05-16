import express from 'express';
import userRoutes from './userRoutes.js';
import branchRoutes from './branchRoutes.js';
import documentRoutes from './documentRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/branch', branchRoutes);
routes.use('/document', documentRoutes);
routes.use('/dashboard', dashboardRoutes);

export default routes;
