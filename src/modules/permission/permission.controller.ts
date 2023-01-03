import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as permissionService from './permission.service';

export const createPermission = catchAsync(async (req: Request, res: Response) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(httpStatus.CREATED).send(permission);
});

export const getPermissions = catchAsync(async (_req: Request, res: Response) => {
  const result = await permissionService.queryPermissions();
  res.send({ results: result });
});
