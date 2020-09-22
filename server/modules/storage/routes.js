import { Router } from 'express';
import * as StorageController from './controller';

const routes = new Router();

routes.post('/storage/:id/set', StorageController.set);
routes.post('/storage/:id/get', StorageController.get);

export default routes;
