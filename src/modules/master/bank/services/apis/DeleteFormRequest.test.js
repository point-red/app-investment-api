const factory = require("@root/tests/utils/factory");
const DeleteFormRequest = require("./DeleteFormRequest");

describe("Bank - DeleteFormRequest", () => {
  describe("success request", () => {
    let bank;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ bank } = recordFactories);
      done();
    });

    it("delete bank", async () => {
      ({ bank } = await new DeleteFormRequest({
        bankId: bank.id,
      }).call());
    });
  });
});

const generateRecordFactories = async ({ bank } = {}) => {
  bank = await factory.bank.create({});

  return {
    bank,
  };
};
