import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IBankAccount {
  accountName: string;
  accountNumber: string;
  notes?: string;
}

export interface IBank {
  name: string;
  branch: string;
  address: string;
  phone: string;
  fax: string;
  code: string;
  notes: string;
  accounts?: IBankAccount[];
  status?: string;
}

export interface IBankDoc extends IBank, Document {
  updatedAt: Date;
  createdAt: Date;
}

export interface IBankModel extends Model<IBankDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type CreateBankBody = Omit<IBank, 'status'>;

export type UpdateBankBody = Partial<IBank>;

export type AssignPermissionBody = Omit<IBank, 'name'>;

export type UpdateStatusBankBody = Partial<{
  status: string;
}>;

export type NewCreatedBank = Partial<IBank>;
