import { Request, Response, Router } from 'express';

const routes = (): Router => {
  const router = Router({ mergeParams: true });

  router.get('/', (req: Request, res: Response) => res.sendStatus(200));

  return router;
};

export default routes;
