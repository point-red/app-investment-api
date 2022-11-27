import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { IRole } from './role.interfaces';

const createRoleBody: Record<keyof IRole, any> = {
  name: Joi.string().required(),
  permissions: Joi.array(),
};

export const createRole = {
  body: Joi.object().keys(createRoleBody),
};

export const getRoles = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

export const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

export const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

export const assignPermission = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      permissions: Joi.array(),
    })
    .min(1),
};
