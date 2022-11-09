const { BankModel, BankAccountModel } = require("../../models");

class UpdateForm {
  constructor({ bankId, updateFormDto }) {
    this.bankId = bankId;
    this.updateFormDto = updateFormDto;
  }

  async call() {
    const { name, branch, address, phone, fax, code, notes, accounts } =
      this.updateFormDto;

    const bank = await BankModel.findOneAndUpdate(
      { _id: this.bankId },
      {
        name,
        branch,
        address,
        phone,
        fax,
        code,
        notes,
      },
      { new: true }
    );

    accounts.map(async ({ accountName, accountNumber, notes }) => {
      await createBankAccount(this.bankId, {
        accountName,
        accountNumber,
        notes,
      });
    });

    return { bank };
  }
}

async function createBankAccount(bankId, account) {
  const bankAccount = await BankAccountModel.create(account);

  return BankModel.findByIdAndUpdate(
    bankId,
    {
      $push: { accounts: bankAccount._id },
    },
    { new: true }
  );
}

module.exports = UpdateForm;
