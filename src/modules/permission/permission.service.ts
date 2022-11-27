import httpStatus from 'http-status';
import Permission from './permission.model';
import ApiError from '../errors/ApiError';
import { IPermission, IPermissionDoc } from './permission.interfaces';

/**
 * Create a permission
 * @param {NewCreatedPermission} permissionBody
 * @returns {Promise<IPermissionDoc>}
 */
export const createPermission = async (permissionBody: IPermission): Promise<IPermissionDoc> => {
  if (await Permission.isPermissionTaken(permissionBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permission Name already taken');
  }
  return Permission.create(permissionBody);
};

/**
 * Query for permissions
 */
export const queryPermissions = async () => {
  const permissions = await Permission.find({});
  return permissions;
};
