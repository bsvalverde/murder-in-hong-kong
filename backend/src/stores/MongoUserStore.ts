import MongoUser from '../mongo/models/User';
import User, { UserInput, UserStore } from '../types/user';

class MongoUserStore implements UserStore {
  async findByUsername(username: string): Promise<User | null> {
    return MongoUser.findOne({ username });
  }

  async create({ username, password }: UserInput): Promise<User> {
    return MongoUser.register(new MongoUser({ username }), password);
  }
}

export default MongoUserStore;
