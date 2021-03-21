import MongoUser from '../mongo/models/User';
import User, { UserInput, UserStore } from '../types/user';

class MongoUserStore implements UserStore {
  create({ username, password }: UserInput): Promise<User | null> {
    return MongoUser.register(new MongoUser({ username }), password);
  }
}

export default MongoUserStore;
