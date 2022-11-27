import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as ownerService from './owner.service';

export const createOwner = catchAsync(async (req: Request, res: Response) => {
  const owner = await ownerService.createOwner(req.body);
  res.status(httpStatus.CREATED).send(owner);
});

export const getOwners = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;
  const filter = { $or: [{ firstName: { $regex: search || '', $options: 'i' } }] };
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ownerService.queryOwners(filter, options);
  res.send(result);
});

export const getOwner = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['ownerId'] === 'string') {
    const owner = await ownerService.getOwnerById(new mongoose.Types.ObjectId(req.params['ownerId']));
    if (!owner) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Owner not found');
    }
    res.send(owner);
  }
});

export const updateOwner = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['ownerId'] === 'string') {
    const owner = await ownerService.updateOwnerById(new mongoose.Types.ObjectId(req.params['ownerId']), req.body);
    res.send(owner);
  }
});

export const deleteOwner = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['ownerId'] === 'string') {
    await ownerService.deleteOwnerById(new mongoose.Types.ObjectId(req.params['ownerId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
