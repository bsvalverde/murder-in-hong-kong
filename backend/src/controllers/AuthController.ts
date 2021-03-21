import { NextFunction, Request, Response } from 'express';
import { login, logout } from '../express/authentication';
import { CodedError } from '../models/errors';

export default class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.user) {
      throw new CodedError('Already logged in', 409);
    }
    try {
      const user = await login(req);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await logout(req);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
