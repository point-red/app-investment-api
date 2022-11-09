const factory = require("@root/tests/utils/factory");
const DeleteFormRequest = require("./DeleteFormRequest");

describe("Role - DeleteFormRequest", () => {
  describe("success request", () => {
    let role;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ role } = recordFactories);
      done();
    });

    it("delete role", async () => {
      ({ role } = await new DeleteFormRequest({
        roleId: role.id,
      }).call());
    });
  });
});

const generateRecordFactories = async ({ role } = {}) => {
  role = await factory.role.create({});

  return {
    role,
  };
};
