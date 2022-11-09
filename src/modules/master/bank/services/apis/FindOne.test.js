const factory = require("@root/tests/utils/factory");
const FindOne = require("./FindOne");

describe("Bank - FindOne", () => {
  describe("success", () => {
    let bank;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ bank } = recordFactories);

      done();
    });

    it("return expected bank", async () => {
      const { bank: foundBank } = await new FindOne(bank.id).call();

      expect(foundBank).toBeDefined();
      expect(foundBank.id).toBe(bank.id);
      expect(foundBank.name).toBe(bank.name);
    });
  });
});

const generateRecordFactories = async ({ bank } = {}) => {
  bank = await factory.bank.create({});

  return {
    bank,
  };
};
