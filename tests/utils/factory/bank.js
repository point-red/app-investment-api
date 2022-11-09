const { BankModel } = require("@src/modules/master/bank/models");

async function create({ name, branch, address, phone, fax, code, notes }) {
  const bank = await BankModel.create({
    name: name || "PT Bank Central Asia",
    branch: branch || "Bandung",
    address: address || "Jl Asia Africa",
    phone: phone || "022-4236123",
    fax: fax || "021-4238272",
    code: code || "KCBDG001",
    notes: notes || "Lorem",
  });

  return bank;
}

module.exports = { create };
