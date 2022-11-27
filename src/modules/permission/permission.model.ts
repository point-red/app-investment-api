import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IPermission, IPermissionModel } from './permission.interfaces';

const permissionSchema = new mongoose.Schema<IPermission, IPermissionModel>(
  {
    name: {
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
permissionSchema.plugin(toJSON);
permissionSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludePermissionId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
permissionSchema.static(
  'isPermissionTaken',
  async function (name: string, excludePermissionId: mongoose.ObjectId): Promise<boolean> {
    const permission = await this.findOne({ name, _id: { $ne: excludePermissionId } });
    return !!permission;
  }
);

const Permission = mongoose.model<IPermission, IPermissionModel>('Permission', permissionSchema);

export default Permission;
