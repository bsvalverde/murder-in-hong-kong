import { Request } from 'express';
import passport from 'passport';
import { CodedError } from '../../models/errors';
import MongoUser from '../../mongo/models/User';
import User from '../../types/user';

passport.use(MongoUser.createStrategy());
passport.serializeUser(MongoUser.serializeUser());
passport.deserializeUser(MongoUser.deserializeUser());

export const initialize = () => passport.initialize();

export const session = () => passport.session();

export const login = async (req: Request) => {
  const user = await authenticate(req);
  await saveSession(user, req);
  return user;
};

export const logout = (req: Request) => endSession(req);

const authenticate = (req: Request): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    await passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        reject(new CodedError('Invalid credentials', 401));
        return;
      }
      resolve(user);
    })(req);
  });
};

const saveSession = (user: User, req: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) {
        reject(new CodedError(err.message, 401));
        return;
      }

      resolve();
    });
  });
};

const endSession = (req: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
