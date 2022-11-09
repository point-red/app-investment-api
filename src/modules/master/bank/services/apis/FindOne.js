const { BankModel } = require("../../models");

class FindOne {
  constructor(bankId) {
    this.bankId = bankId;
  }

  async call() {
    const bank = await BankModel.findOne({ _id: this.bankId })
      .populate("accounts")
      .exec();

    return { bank };
  }
}

module.exports = FindOne;
