import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

export default {
  connect(mongoUrl: string) {
    return mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  disconnect() {
    mongoose.disconnect();
  },
  getStore() {
    return new MongoStore({
      client: mongoose.connection.getClient(),
    });
  },
};
