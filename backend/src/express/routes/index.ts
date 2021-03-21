import { Router } from 'express';
import gameRoutes from './games';

const routes = (): Router => {
  const router = Router();

  router.use('/games', gameRoutes());

  return router;
};

export default routes;
