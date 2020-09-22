import express from 'express';
import { StorageRoutes } from './modules';
import middlewaresConfig from './config/middlewares';

const app = express();
middlewaresConfig(app);

app.use('/', [StorageRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(`👽Houston we have a problem : ${err} ☠️`);
  }
  {
    console.log(`🎉 APP Listen to port: ${PORT} 🎉`);
  }
});
