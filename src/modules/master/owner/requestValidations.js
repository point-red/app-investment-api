const { Joi } = require("celebrate");

const createFormRequest = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

module.exports = {
  createFormRequest,
};
