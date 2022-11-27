import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { IBank } from './bank.interfaces';

const createBankBody: Record<keyof IBank, any> = {
  name: Joi.string().required(),
  branch: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  fax: Joi.string().required(),
  code: Joi.string().required(),
  notes: Joi.string().required(),
  accounts: Joi.array(),
};

export const createBank = {
  body: Joi.object().keys(createBankBody),
};

export const getBanks = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getBank = {
  params: Joi.object().keys({
    bankId: Joi.string().custom(objectId),
  }),
};

export const updateBank = {
  params: Joi.object().keys({
    bankId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      branch: Joi.string(),
      address: Joi.string(),
      phone: Joi.number(),
      fax: Joi.string(),
      code: Joi.string(),
      notes: Joi.string(),
      accounts: Joi.array(),
    })
    .min(1),
};

export const deleteBank = {
  params: Joi.object().keys({
    bankId: Joi.string().custom(objectId),
  }),
};
