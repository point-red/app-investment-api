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
      expect(foundBank.branch).toEqual(bank.branch);
      expect(foundBank.address).toEqual(bank.address);
      expect(foundBank.phone).toEqual(bank.phone);
      expect(foundBank.fax).toEqual(bank.fax);
      expect(foundBank.code).toEqual(bank.code);
      expect(foundBank.notes).toEqual(bank.notes);
    });
  });
});

const generateRecordFactories = async ({ bank } = {}) => {
  bank = await factory.bank.create({});

  return {
    bank,
  };
};
