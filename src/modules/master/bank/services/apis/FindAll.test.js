const factory = require("@root/tests/utils/factory");
const FindAll = require("./FindAll");

describe("Bank - FindAll", () => {
  describe("success", () => {
    let bank;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ bank } = recordFactories);

      done();
    });

    it("return expected banks", async () => {
      const { banks } = await new FindAll({}).call();

      expect(banks.length).toBe(1);
      expect(banks[0].id).toBe(bank.id);
      expect(banks[0].name).toBe(bank.name);
    });

    it("return expected banks with page & limit query", async () => {
      let queries = {
        page: 1,
        limit: 10,
      };

      let { banks } = await new FindAll(queries).call();

      expect(banks.length).toBe(1);
      expect(banks[0].id).toBe(bank.id);
      expect(banks[0].name).toBe(bank.name);

      queries = {
        page: 2,
        limit: 10,
      };
      ({ banks, currentPage } = await new FindAll(queries).call());

      expect(banks.length).toBe(0);
      expect(currentPage).toBe(2);

      queries = {
        page: 1,
        limit: 5,
      };
      ({ banks, maxItem } = await new FindAll(queries).call());

      expect(banks.length).toBe(1);
      expect(maxItem).toBe(5);
    });

    it("return expected banks with search query", async () => {
      queries = {
        search: bank.name,
      };
      ({ banks } = await new FindAll(queries).call());

      expect(banks.length).toBe(1);
      expect(banks[0].id).toBe(bank.id);
      expect(banks[0].name).toBe(bank.name);

      queries = {
        search: "PT Bank ABC",
      };
      ({ banks } = await new FindAll(queries).call());

      expect(banks.length).toBe(0);
    });

    it("return expected banks with sort query", async () => {
      queries = {
        sort: "createdAt,asc",
      };
      ({ banks } = await new FindAll(queries).call());

      expect(banks.length).toBe(1);
      expect(banks[0].id).toBe(bank.id);
      expect(banks[0].name).toBe(bank.name);

      queries = {
        sort: "createdAt,desc",
      };
      ({ banks } = await new FindAll(queries).call());

      expect(banks.length).toBe(1);
      expect(banks[0].id).toBe(bank.id);
      expect(banks[0].name).toBe(bank.name);
    });
  });
});

const generateRecordFactories = async ({ bank } = {}) => {
  bank = await factory.bank.create({});

  return {
    bank,
  };
};
