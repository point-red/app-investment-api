import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { IOwner } from './owner.interfaces';

const createOwnerBody: Record<keyof IOwner, any> = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.number().required(),
};

export const createOwner = {
  body: Joi.object().keys(createOwnerBody),
};

export const getOwners = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getOwner = {
  params: Joi.object().keys({
    ownerId: Joi.string().custom(objectId),
  }),
};

export const updateOwner = {
  params: Joi.object().keys({
    ownerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.number(),
    })
    .min(1),
};

export const deleteOwner = {
  params: Joi.object().keys({
    ownerId: Joi.string().custom(objectId),
  }),
};
