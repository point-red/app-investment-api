import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Bank from './bank.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IBank, UpdateBankBody, IBankDoc } from './bank.interfaces';

/**
 * Create a Bank
 * @param {NewCreatedBank} bankBody
 * @returns {Promise<IBankDoc>}
 */
export const createBank = async (bankBody: IBank): Promise<IBankDoc> => {
  return Bank.create(bankBody);
};

/**
 * Query for banks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryBanks = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const banks = await Bank.paginate(filter, options);
  return banks;
};

/**
 * Get bank by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IBankDoc | null>}
 */
export const getBankById = async (id: mongoose.Types.ObjectId): Promise<IBankDoc | null> => Bank.findById(id);

/**
 * Get bank by email
 * @param {string} name
 * @returns {Promise<IBankDoc | null>}
 */
export const getBankByEmail = async (name: string): Promise<IBankDoc | null> => Bank.findOne({ name });

/**
 * Update bank by id
 * @param {mongoose.Types.ObjectId} bankId
 * @param {UpdateBankBody} updateBody
 * @returns {Promise<IBankDoc | null>}
 */
export const updateBankById = async (
  bankId: mongoose.Types.ObjectId,
  updateBody: UpdateBankBody
): Promise<IBankDoc | null> => {
  const bank = await getBankById(bankId);
  if (!bank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bank not found');
  }
  Object.assign(bank, updateBody);
  await bank.save();
  return bank;
};

/**
 * Delete bank by id
 * @param {mongoose.Types.ObjectId} bankId
 * @returns {Promise<IBankDoc | null>}
 */
export const deleteBankById = async (bankId: mongoose.Types.ObjectId): Promise<IBankDoc | null> => {
  const bank = await getBankById(bankId);
  if (!bank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bank not found');
  }
  await bank.remove();
  return bank;
};
