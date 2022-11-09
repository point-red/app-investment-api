const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const { BankModel, BankAccountModel } = require("../../models");

class DeleteAccountFormRequest {
  constructor({ bankId, bankAccountId, deleteAccountFormRequestDto }) {
    this.bankId = bankId;
    this.bankAccountId = bankAccountId;
    this.deleteAccountFormRequestDto = deleteAccountFormRequestDto;
  }

  async call() {
    const bank = await BankModel.findById(this.bankId);

    if (!bank) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Bank is not found");
    }

    await BankModel.findOneAndUpdate(
      { _id: this.bankId },
      {
        $pull: { accounts: this.bankAccountId },
      },
      { new: true }
    );

    const bankAccount = await BankAccountModel.deleteOne({
      _id: this.bankAccountId,
    });

    return { bankAccount };
  }
}

module.exports = DeleteAccountFormRequest;
