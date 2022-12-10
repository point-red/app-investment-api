import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string;
  status?: string;
}

export interface IUserDoc extends IUser, Document {
  updatedAt: Date;
  createdAt: Date;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  isUsernameTaken(username: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type CreateUserBody = Omit<IUser, 'status'>;

export type UpdateUserBody = Partial<IUser>;

export type UpdateStatusUserBody = Partial<{
  status: string;
}>;

export type NewCreatedUser = Partial<IUser>;
