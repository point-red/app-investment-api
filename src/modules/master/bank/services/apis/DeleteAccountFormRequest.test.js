const factory = require("@root/tests/utils/factory");
const { BankModel } = require("../../models");
const DeleteAccountFormRequest = require("./DeleteAccountFormRequest");

describe("Bank Account - DeleteAccountFormRequest", () => {
  describe("success request", () => {
    let bank, bankAccount;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ bank } = recordFactories);

      bankAccount = await factory.bankAccount.create({});
      BankModel.findByIdAndUpdate(bank.id, {
        $push: { accounts: bankAccount._id },
      });

      done();
    });

    it("delete bank account", async () => {
      ({ bankAccount } = await new DeleteAccountFormRequest({
        bankId: bank.id,
        bankAccountId: bankAccount.id,
      }).call());
    });
  });
});

const generateRecordFactories = async ({ bankAccount } = {}) => {
  bank = await factory.bank.create({});
  bankAccount = await factory.bankAccount.create({});

  return {
    bank,
    bankAccount,
  };
};
