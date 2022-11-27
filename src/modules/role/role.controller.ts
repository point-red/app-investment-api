import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as roleService from './role.service';

export const createRole = catchAsync(async (req: Request, res: Response) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

export const getRoles = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;
  const filter = { $or: [{ name: { $regex: search || '', $options: 'i' } }] };
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  res.send(result);
});

export const getRole = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.getRoleById(new mongoose.Types.ObjectId(req.params['roleId']));
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
    }
    res.send(role);
  }
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.updateRoleById(new mongoose.Types.ObjectId(req.params['roleId']), req.body);
    res.send(role);
  }
});

export const deleteRole = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    await roleService.deleteRoleById(new mongoose.Types.ObjectId(req.params['roleId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const assignPermission = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roleId'] === 'string') {
    const role = await roleService.assignPermissionRoleById(new mongoose.Types.ObjectId(req.params['roleId']), req.body);
    res.send(role);
  }
});
