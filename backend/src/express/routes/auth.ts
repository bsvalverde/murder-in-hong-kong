import { Router } from 'express';
import AuthController from '../../controllers/AuthController';

const routes = (): Router => {
  const router = Router();

  const authController = new AuthController()

  router.post('/login', authController.login.bind(authController));
  router.post('/logout', authController.logout.bind(authController));

  return router;
};

export default routes;
