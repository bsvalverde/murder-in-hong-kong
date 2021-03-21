import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import shortid from 'shortid';

export default class BaseSchema extends Schema {
  constructor(fields: SchemaDefinition, options: SchemaOptions = {}) {
    super(
      {
        _id: {
          type: String,
          default: shortid.generate,
          alias: 'id',
        },
        active: {
          type: Boolean,
          required: true,
          default: true,
          index: true,
        },
        ...fields,
      },
      {
        timestamps: true,
        ...options,
      },
    );
    this.method('toJSON', function () {
      const obj = this.toObject();

      obj.id = obj._id;
      delete obj._id;

      return obj;
    });
  }
}
