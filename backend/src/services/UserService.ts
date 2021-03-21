import { CodedError, MissingInputError } from '../models/errors';
import User, { UserInput, UserStore } from '../types/user';

interface UserServiceConstructor {
  store: UserStore;
}

export default class UserService {
  private store: UserStore;

  constructor({ store }: UserServiceConstructor) {
    this.store = store;
  }

  private async validateInput({ username, password }: UserInput) {
    if (!username) {
      throw new MissingInputError('username');
    }

    if (!password) {
      throw new MissingInputError('password');
    }

    if (username.trim().length < 6) {
      throw new CodedError('Username must be at least 6 characters long', 400);
    }

    if (password.length < 6) {
      throw new CodedError('Password must be at least 6 characters long', 400);
    }

    const user = await this.store.findByUsername(username);
    if (user) {
      throw new CodedError('Username is unavailable', 409);
    }
  }

  async create(userInput: UserInput): Promise<User> {
    await this.validateInput(userInput);

    return this.store.create(userInput);
  }
}
