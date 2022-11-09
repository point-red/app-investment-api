const factory = require("@root/tests/utils/factory");
const FindOne = require("./FindOne");

describe("Permission - FindOne", () => {
  describe("success", () => {
    let permission;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ permission } = recordFactories);

      done();
    });

    it("return expected permission", async () => {
      const { permission: foundPermission } = await new FindOne(
        permission.id
      ).call();

      expect(foundPermission).toBeDefined();
      expect(foundPermission.id).toBe(permission.id);
      expect(foundPermission.name).toBe(permission.name);
    });
  });
});

const generateRecordFactories = async ({ permission } = {}) => {
  permission = await factory.permission.create({});

  return {
    permission,
  };
};
