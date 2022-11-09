const factory = require("@root/tests/utils/factory");
const FindOne = require("./FindOne");

describe("Role - FindOne", () => {
  describe("success", () => {
    let role;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ role } = recordFactories);

      done();
    });

    it("return expected role", async () => {
      const { role: foundRole } = await new FindOne(role.id).call();

      expect(foundRole).toBeDefined();
      expect(foundRole.id).toBe(role.id);
      expect(foundRole.name).toBe(role.name);
    });
  });
});

const generateRecordFactories = async ({ role } = {}) => {
  role = await factory.role.create({});

  return {
    role,
  };
};
