import { Router } from 'express';
import UserController from '../../controllers/UserController';
import UserService from '../../services/UserService';
import MongoUserStore from '../../stores/MongoUserStore';

const routes = (): Router => {
  const router = Router();

  const store = new MongoUserStore();
  const service = new UserService({ store });
  const userController = new UserController({ service });

  router.get('/me', userController.me.bind(userController));
  router.post('/', userController.create.bind(userController));

  return router;
};

export default routes;
