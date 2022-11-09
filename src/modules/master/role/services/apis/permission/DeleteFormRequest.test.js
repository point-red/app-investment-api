const factory = require("@root/tests/utils/factory");
const DeleteFormRequest = require("./DeleteFormRequest");

describe("Permission - DeleteFormRequest", () => {
  describe("success request", () => {
    let permission;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ permission } = recordFactories);
      done();
    });

    it("delete permission", async () => {
      ({ permission } = await new DeleteFormRequest({
        permissionId: permission.id,
      }).call());
    });
  });
});

const generateRecordFactories = async ({ permission } = {}) => {
  permission = await factory.permission.create({});

  return {
    permission,
  };
};
