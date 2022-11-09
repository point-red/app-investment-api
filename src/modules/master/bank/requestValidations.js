const { Joi } = require("celebrate");

const createFormRequest = {
  body: Joi.object({
    name: Joi.string().required(),
    branch: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    fax: Joi.string().required(),
    code: Joi.string().required(),
    notes: Joi.string().default("").allow(null).max(255),
    accounts: Joi.array().items({
      accountName: Joi.string().required(),
      accountNumber: Joi.number().required(),
      notes: Joi.string().default("").allow(null).max(255),
    }),
  }),
};

module.exports = {
  createFormRequest,
};
