import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { getRoleById } from '../modules/role/role.service';
import { ApiError } from '../modules/errors';

const verifyPermission = (...allowedPermission: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;

    const role = await getRoleById(new mongoose.Types.ObjectId(user?.role));

    const permissions: any[] | undefined = role?.permissions?.map((permission: object | any) => permission?.name);

    const found = allowedPermission?.some((permission) => permissions?.includes(permission));

    if (!found)
      return next(new ApiError(httpStatus.UNAUTHORIZED, "You don't have enough permission to perform this action"));

    return next();
  };
};

export default verifyPermission;
