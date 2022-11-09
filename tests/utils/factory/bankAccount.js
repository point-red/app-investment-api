const { BankAccountModel } = require("@src/modules/master/bank/models");

async function create({ accountName, accountNumber, notes }) {
  const bankAccount = await BankAccountModel.create({
    accountName: accountName || "You Forger",
    accountNumber: accountNumber || "008367812589",
    notes: notes || "Lorem",
  });

  return bankAccount;
}

module.exports = { create };
