import mongoose, { Document, PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import User from '../../types/user';
import BaseSchema from './BaseSchema';
import { trimmedString } from './commonSchemas';

interface UserModel extends User, Document {
  id: string;
}

const userSchema = new BaseSchema({
  city: {
    ...trimmedString,
    required: true,
    minlength: 6,
  },
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model<UserModel>(
  'User',
  userSchema as PassportLocalSchema,
);
