import mongoose from 'mongoose';
import validator from 'validator';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IOwner, IOwnerModel } from './owner.interfaces';

const ownerSchema = new mongoose.Schema<IOwner, IOwnerModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ownerSchema.plugin(toJSON);
ownerSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeOwnerId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
ownerSchema.static('isEmailTaken', async function (email: string, excludeOwnerId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeOwnerId } });
  return !!user;
});

const Owner = mongoose.model<IOwner, IOwnerModel>('Owner', ownerSchema);

export default Owner;
