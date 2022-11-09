const { Joi } = require("celebrate");

const createFormRequest = {
  body: Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.string().required(),
  }),
};

module.exports = {
  createFormRequest,
};
