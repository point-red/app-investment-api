const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { BankModel, BankAccountModel } = require("../../models");

class CreateFormRequest {
  constructor({ createFormRequestDto }) {
    this.createFormRequestDto = createFormRequestDto;
  }

  async call() {
    const { name, branch, address, phone, fax, code, notes, accounts } =
      this.createFormRequestDto;

    await isBankNameExist({ name });

    let bank = await BankModel.create({
      name,
      branch,
      address,
      phone,
      fax,
      code,
      notes,
    });

    accounts.map(async ({ accountName, accountNumber, notes }) => {
      bank = await createBankAccount(bank.id, {
        accountName,
        accountNumber,
        notes,
      });
    });

    return { bank };
  }
}

async function isBankNameExist({ name }) {
  const role = await BankModel.find({
    name: { $regex: new RegExp(`^${name}$`), $options: "i" },
  });
  if (role.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bank Name is Exist");
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

module.exports = CreateFormRequest;
