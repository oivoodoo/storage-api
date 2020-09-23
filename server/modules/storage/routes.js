import { Router } from 'express';
import * as StorageController from './controller';
import { body } from 'express-validator';

const routes = new Router();

routes.post('/storage/:id/set', [
    body('encryption_key').isLength({min: 1})
], StorageController.set);

routes.post('/storage/:id/get', [
    body('decryption_key').isLength({min: 1})
], StorageController.get);

export default routes;
