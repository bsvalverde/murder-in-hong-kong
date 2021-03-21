import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserInput } from '../types/user';

interface UserControllerConstructor {
  service: UserService;
}

export default class UserController {
  private service: UserService;

  constructor({ service }: UserControllerConstructor) {
    this.service = service;
  }

  getInput(req: Request): UserInput {
    const {
      body: { username, password },
    } = req;

    const input: Partial<UserInput> = {};

    if (username) {
      input.username = username;
    }

    if (password) {
      input.password = password;
    }

    return { username, password };
  }

  me(req: Request, res: Response, next: NextFunction): void {
    res.json(req.user);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userInput = this.getInput(req);

      const user = await this.service.create(userInput);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
