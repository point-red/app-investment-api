const role = require("./role");
const permission = require("./permission");
const bank = require("./bank");
const bankAccount = require("./bankAccount");
const user = require("./user");
const owner = require("./owner");

const factory = {
  role,
  permission,
  bank,
  bankAccount,
  user,
  owner,
};

module.exports = factory;
