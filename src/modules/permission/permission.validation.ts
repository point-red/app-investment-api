import Joi from 'joi';
import { IPermission } from './permission.interfaces';

const createPermissionBody: Record<keyof IPermission, any> = {
  name: Joi.string().required(),
};

export const createPermission = {
  body: Joi.object().keys(createPermissionBody),
};

export const getPermissions = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
