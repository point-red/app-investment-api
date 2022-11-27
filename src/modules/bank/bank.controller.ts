import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as bankService from './bank.service';

export const createBank = catchAsync(async (req: Request, res: Response) => {
  const bank = await bankService.createBank(req.body);
  res.status(httpStatus.CREATED).send(bank);
});

export const getBanks = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;
  const filter = { $or: [{ name: { $regex: search || '', $options: 'i' } }] };
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bankService.queryBanks(filter, options);
  res.send(result);
});

export const getBank = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['bankId'] === 'string') {
    const bank = await bankService.getBankById(new mongoose.Types.ObjectId(req.params['bankId']));
    if (!bank) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Bank not found');
    }
    res.send(bank);
  }
});

export const updateBank = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['bankId'] === 'string') {
    const bank = await bankService.updateBankById(new mongoose.Types.ObjectId(req.params['bankId']), req.body);
    res.send(bank);
  }
});

export const deleteBank = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['bankId'] === 'string') {
    await bankService.deleteBankById(new mongoose.Types.ObjectId(req.params['bankId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
