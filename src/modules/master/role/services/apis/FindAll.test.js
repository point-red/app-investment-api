const factory = require("@root/tests/utils/factory");
const FindAll = require("./FindAll");

describe("Role - FindAll", () => {
  describe("success", () => {
    let role;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ role } = recordFactories);

      done();
    });

    it("return expected roles", async () => {
      const { roles } = await new FindAll({}).call();

      expect(roles.length).toBe(1);
      expect(roles[0].id).toBe(role.id);
      expect(roles[0].name).toBe(role.name);
    });

    it("return expected roles with page & limit query", async () => {
      let queries = {
        page: 1,
        limit: 10,
      };

      let { roles } = await new FindAll(queries).call();

      expect(roles.length).toBe(1);
      expect(roles[0].id).toBe(role.id);
      expect(roles[0].name).toBe(role.name);

      queries = {
        page: 2,
        limit: 10,
      };
      ({ roles, currentPage } = await new FindAll(queries).call());

      expect(roles.length).toBe(0);
      expect(currentPage).toBe(2);

      queries = {
        page: 1,
        limit: 5,
      };
      ({ roles, maxItem } = await new FindAll(queries).call());

      expect(roles.length).toBe(1);
      expect(maxItem).toBe(5);
    });

    it("return expected roles with search query", async () => {
      queries = {
        search: role.name,
      };
      ({ roles } = await new FindAll(queries).call());

      expect(roles.length).toBe(1);
      expect(roles[0].id).toBe(role.id);
      expect(roles[0].name).toBe(role.name);

      queries = {
        search: "manager",
      };
      ({ roles } = await new FindAll(queries).call());

      expect(roles.length).toBe(0);
    });

    it("return expected roles with sort query", async () => {
      queries = {
        sort: "createdAt,asc",
      };
      ({ roles } = await new FindAll(queries).call());

      expect(roles.length).toBe(1);
      expect(roles[0].id).toBe(role.id);
      expect(roles[0].name).toBe(role.name);

      queries = {
        sort: "createdAt,desc",
      };
      ({ roles } = await new FindAll(queries).call());

      expect(roles.length).toBe(1);
      expect(roles[0].id).toBe(role.id);
      expect(roles[0].name).toBe(role.name);
    });
  });
});

const generateRecordFactories = async ({ role } = {}) => {
  role = await factory.role.create({});

  return {
    role,
  };
};
