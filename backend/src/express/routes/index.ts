import { Router } from 'express';
import gameRoutes from './games';
import userRoutes from './user';

const routes = (): Router => {
  const router = Router();

  router.use('/games', gameRoutes());
  router.use('/users', userRoutes());

  return router;
};

export default routes;
