import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongo from '../mongo';
import {
  initialize as authInitialize,
  session as authSession
} from './authentication';
import errorHandler from './errorHandler';
import routes from './routes';

const {
  PORT = 3030,
  COOKIE_SECRET = 'not so secret',
  COOKIE_DOMAIN = 'localhost',
  SESSION_NAME = 'sessionId',
} = process.env;

export default class API {
  private app;

  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        name: SESSION_NAME,
        secret: COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          domain: COOKIE_DOMAIN,
          httpOnly: false,
        },
        store: mongo.getStore(),
      }),
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(authInitialize());
    this.app.use(authSession());
    this.app.use(cookieParser());

    this.app.use('/api', routes());

    this.app.use(errorHandler());
  }

  start() {
    this.app.listen(PORT, (): void =>
      console.log(`Server Running. See http://localhost:${PORT}`),
    );
  }
}
