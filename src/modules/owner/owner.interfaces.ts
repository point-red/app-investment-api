import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IOwner {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status?: string;
}

export interface IOwnerDoc extends IOwner, Document {
  updatedAt: Date;
  createdAt: Date;
}

export interface IOwnerModel extends Model<IOwnerDoc> {
  isEmailTaken(email: string, excludeOwnerId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type CreateOwnerBody = Omit<IOwner, 'status'>;

export type UpdateOwnerBody = Partial<IOwner>;

export type UpdateStatusOwnerBody = Partial<{
  status: string;
}>;

export type NewCreatedOwner = Partial<IOwner>;
