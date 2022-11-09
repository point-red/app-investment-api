const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { BankModel, BankAccountModel } = require("../../models");

class DeleteFormRequest {
  constructor({ bankId, deleteFormRequestDto }) {
    this.bankId = bankId;
    this.deleteFormRequestDto = deleteFormRequestDto;
  }

  async call() {
    const bank = await BankModel.findById(this.bankId);

    if (!bank) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Bank is not found");
    }

    bank.accounts.map(async (account) => {
      await BankAccountModel.deleteOne({ _id: account });
    });

    await BankModel.deleteOne({ _id: this.bankId });

    return { bank };
  }
}

module.exports = DeleteFormRequest;
