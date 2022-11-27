import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IRole {
  name: string;
  permissions?: Array<string>;
}

export interface IRoleDoc extends IRole, Document {
  updatedAt: Date;
  createdAt: Date;
}

export interface IRoleModel extends Model<IRoleDoc> {
  isRoleTaken(name: string, excludeRoleId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateRoleBody = Partial<IRole>;

export type AssignPermissionBody = Omit<IRole, 'name'>;

export type NewCreatedRole = Partial<IRole>;
