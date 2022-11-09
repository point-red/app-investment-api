const { Joi } = require("celebrate");

const createFormRequest = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const createPermissionFormRequest = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createFormRequest,
  createPermissionFormRequest,
};
