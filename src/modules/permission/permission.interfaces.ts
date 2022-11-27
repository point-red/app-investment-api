import mongoose, { Model, Document } from 'mongoose';

export interface IPermission {
  name: string;
}

export interface IPermissionDoc extends IPermission, Document {
  updatedAt: Date;
  createdAt: Date;
}

export interface IPermissionModel extends Model<IPermissionDoc> {
  isPermissionTaken(name: string, excludePermissionId?: mongoose.Types.ObjectId): Promise<boolean>;
}

export type NewCreatedPermission = Partial<IPermission>;
