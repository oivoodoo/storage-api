import express from 'express';
import { StorageRoutes } from './modules';
import middlewaresConfig from './config/middlewares';

const app = express();
middlewaresConfig(app);

app.use('/', [StorageRoutes]);

module.exports = app;