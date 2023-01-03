import autopopulate from 'mongoose-autopopulate';
import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IRole, IRoleModel } from './role.interfaces';

const roleSchema = new mongoose.Schema<IRole, IRoleModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', autopopulate: true }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);
roleSchema.plugin(autopopulate);

/**
 * Check if name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludeRoleId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
roleSchema.static('isRoleTaken', async function (name: string, excludeRoleId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ name, _id: { $ne: excludeRoleId } });
  return !!user;
});

const Role = mongoose.model<IRole, IRoleModel>('Role', roleSchema);

export default Role;
