import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Role from './role.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IRole, UpdateRoleBody, AssignPermissionBody, IRoleDoc } from './role.interfaces';

/**
 * Create a role
 * @param {NewCreatedRole} roleBody
 * @returns {Promise<IRoleDoc>}
 */
export const createRole = async (roleBody: IRole): Promise<IRoleDoc> => {
  if (await Role.isRoleTaken(roleBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role Name already taken');
  }
  return Role.create(roleBody);
};

/**
 * Query for roles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryRoles = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const roles = await Role.paginate(filter, options);
  return roles;
};

/**
 * Get role by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRoleDoc | null>}
 */
export const getRoleById = async (id: mongoose.Types.ObjectId): Promise<IRoleDoc | null> => Role.findById(id);

/**
 * Get role by email
 * @param {string} name
 * @returns {Promise<IRoleDoc | null>}
 */
export const getRoleByEmail = async (name: string): Promise<IRoleDoc | null> => Role.findOne({ name });

/**
 * Update role by id
 * @param {mongoose.Types.ObjectId} roleId
 * @param {UpdateRoleBody} updateBody
 * @returns {Promise<IRoleDoc | null>}
 */
export const updateRoleById = async (
  roleId: mongoose.Types.ObjectId,
  updateBody: UpdateRoleBody
): Promise<IRoleDoc | null> => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  if (updateBody.name && (await Role.isRoleTaken(updateBody.name, roleId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role Name already taken');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

/**
 * Delete role by id
 * @param {mongoose.Types.ObjectId} roleId
 * @returns {Promise<IRoleDoc | null>}
 */
export const deleteRoleById = async (roleId: mongoose.Types.ObjectId): Promise<IRoleDoc | null> => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.remove();
  return role;
};

/**
 * Assign permission by id
 * @param {mongoose.Types.ObjectId} roleId
 * @param {AssignPermissionBody} updateBody
 * @returns {Promise<IRoleDoc | null>}
 */
export const assignPermissionRoleById = async (
  roleId: mongoose.Types.ObjectId,
  updateBody: AssignPermissionBody
): Promise<IRoleDoc | null> => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};
