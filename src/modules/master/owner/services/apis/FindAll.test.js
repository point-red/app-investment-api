const factory = require("@root/tests/utils/factory");
const FindAll = require("./FindAll");

describe("Owner - FindAll", () => {
  describe("success", () => {
    let owner;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ owner } = recordFactories);

      done();
    });

    it("return expected owners", async () => {
      const { owners } = await new FindAll({}).call();

      expect(owners.length).toBe(1);
      expect(owners[0].id).toBe(owner.id);
      expect(owners[0].firstName).toBe(owner.firstName);
      expect(owners[0].lastName).toBe(owner.lastName);
      expect(owners[0].email).toBe(owner.email);
      expect(owners[0].phone).toBe(owner.phone);
    });

    it("return expected owners with page & limit query", async () => {
      let queries = {
        page: 1,
        limit: 10,
      };

      let { owners } = await new FindAll(queries).call();

      expect(owners.length).toBe(1);
      expect(owners[0].id).toBe(owner.id);
      expect(owners[0].firstName).toBe(owner.firstName);
      expect(owners[0].lastName).toBe(owner.lastName);
      expect(owners[0].email).toBe(owner.email);
      expect(owners[0].phone).toBe(owner.phone);

      queries = {
        page: 2,
        limit: 10,
      };
      ({ owners, currentPage } = await new FindAll(queries).call());

      expect(owners.length).toBe(0);
      expect(currentPage).toBe(2);

      queries = {
        page: 1,
        limit: 5,
      };
      ({ owners, maxItem } = await new FindAll(queries).call());

      expect(owners.length).toBe(1);
      expect(maxItem).toBe(5);
    });

    it("return expected owners with search query", async () => {
      queries = {
        search: owner.firstName,
      };
      ({ owners } = await new FindAll(queries).call());

      expect(owners.length).toBe(1);
      expect(owners[0].id).toBe(owner.id);
      expect(owners[0].firstName).toBe(owner.firstName);
      expect(owners[0].lastName).toBe(owner.lastName);
      expect(owners[0].email).toBe(owner.email);
      expect(owners[0].phone).toBe(owner.phone);

      queries = {
        search: "not-found-owner",
      };
      ({ owners } = await new FindAll(queries).call());

      expect(owners.length).toBe(0);
    });

    it("return expected owners with sort query", async () => {
      queries = {
        sort: "firstName,asc",
      };
      ({ owners } = await new FindAll(queries).call());

      expect(owners.length).toBe(1);
      expect(owners[0].id).toBe(owner.id);
      expect(owners[0].firstName).toBe(owner.firstName);
      expect(owners[0].lastName).toBe(owner.lastName);
      expect(owners[0].email).toBe(owner.email);
      expect(owners[0].phone).toBe(owner.phone);

      queries = {
        sort: "lastName,desc",
      };
      ({ owners } = await new FindAll(queries).call());

      expect(owners.length).toBe(1);
      expect(owners[0].id).toBe(owner.id);
      expect(owners[0].firstName).toBe(owner.firstName);
      expect(owners[0].lastName).toBe(owner.lastName);
      expect(owners[0].email).toBe(owner.email);
      expect(owners[0].phone).toBe(owner.phone);
    });
  });
});

const generateRecordFactories = async ({ owner } = {}) => {
  owner = await factory.owner.create({});

  return {
    owner,
  };
};
