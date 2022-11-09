const factory = require("@root/tests/utils/factory");
const FindAll = require("./FindAll");

describe("Permission - FindAll", () => {
  describe("success", () => {
    let permission;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ permission } = recordFactories);

      done();
    });

    it("return expected permissions", async () => {
      const { permissions } = await new FindAll({}).call();

      expect(permissions.length).toBe(1);
      expect(permissions[0].id).toBe(permission.id);
      expect(permissions[0].name).toBe(permission.name);
    });

    it("return expected permissions with page & limit query", async () => {
      let queries = {
        page: 1,
        limit: 10,
      };

      let { permissions } = await new FindAll(queries).call();

      expect(permissions.length).toBe(1);
      expect(permissions[0].id).toBe(permission.id);
      expect(permissions[0].name).toBe(permission.name);

      queries = {
        page: 2,
        limit: 10,
      };
      ({ permissions, currentPage } = await new FindAll(queries).call());

      expect(permissions.length).toBe(0);
      expect(currentPage).toBe(2);

      queries = {
        page: 1,
        limit: 5,
      };
      ({ permissions, maxItem } = await new FindAll(queries).call());

      expect(permissions.length).toBe(1);
      expect(maxItem).toBe(5);
    });

    it("return expected permissions with search query", async () => {
      queries = {
        search: permission.name,
      };
      ({ permissions } = await new FindAll(queries).call());

      expect(permissions.length).toBe(1);
      expect(permissions[0].id).toBe(permission.id);
      expect(permissions[0].name).toBe(permission.name);

      queries = {
        search: "view data delete",
      };
      ({ permissions } = await new FindAll(queries).call());

      expect(permissions.length).toBe(0);
    });

    it("return expected permissions with sort query", async () => {
      queries = {
        sort: "name,asc",
      };
      ({ permissions } = await new FindAll(queries).call());

      expect(permissions.length).toBe(1);
      expect(permissions[0].id).toBe(permission.id);
      expect(permissions[0].name).toBe(permission.name);

      queries = {
        sort: "createdAt,desc",
      };
      ({ permissions } = await new FindAll(queries).call());

      expect(permissions.length).toBe(1);
      expect(permissions[0].id).toBe(permission.id);
      expect(permissions[0].name).toBe(permission.name);
    });
  });
});

const generateRecordFactories = async ({ permission } = {}) => {
  permission = await factory.permission.create({});

  return {
    permission,
  };
};
