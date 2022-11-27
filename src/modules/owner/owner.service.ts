import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Owner from './owner.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IOwner, UpdateOwnerBody, IOwnerDoc } from './owner.interfaces';

/**
 * Create a owner
 * @param {NewCreatedOwner} ownerBody
 * @returns {Promise<IOwnerDoc>}
 */
export const createOwner = async (ownerBody: IOwner): Promise<IOwnerDoc> => {
  if (await Owner.isEmailTaken(ownerBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Owner.create(ownerBody);
};

/**
 * Query for owners
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOwners = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const owners = await Owner.paginate(filter, options);
  return owners;
};

/**
 * Get owner by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IOwnerDoc | null>}
 */
export const getOwnerById = async (id: mongoose.Types.ObjectId): Promise<IOwnerDoc | null> => Owner.findById(id);

/**
 * Get owner by email
 * @param {string} email
 * @returns {Promise<IOwnerDoc | null>}
 */
export const getOwnerByEmail = async (email: string): Promise<IOwnerDoc | null> => Owner.findOne({ email });

/**
 * Update owner by id
 * @param {mongoose.Types.ObjectId} ownerId
 * @param {UpdateOwnerBody} updateBody
 * @returns {Promise<IOwnerDoc | null>}
 */
export const updateOwnerById = async (
  ownerId: mongoose.Types.ObjectId,
  updateBody: UpdateOwnerBody
): Promise<IOwnerDoc | null> => {
  const owner = await getOwnerById(ownerId);
  if (!owner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Owner not found');
  }
  if (updateBody.email && (await Owner.isEmailTaken(updateBody.email, ownerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(owner, updateBody);
  await owner.save();
  return owner;
};

/**
 * Delete owner by id
 * @param {mongoose.Types.ObjectId} ownerId
 * @returns {Promise<IOwnerDoc | null>}
 */
export const deleteOwnerById = async (ownerId: mongoose.Types.ObjectId): Promise<IOwnerDoc | null> => {
  const owner = await getOwnerById(ownerId);
  if (!owner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Owner not found');
  }
  await owner.remove();
  return owner;
};
