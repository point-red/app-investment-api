const factory = require("@root/tests/utils/factory");
const DeleteFormRequest = require("./DeleteFormRequest");

describe("User - DeleteFormRequest", () => {
  describe("success request", () => {
    let user;
    beforeEach(async (done) => {
      const role = await factory.role.create({});
      user = await factory.user.create({
        role: role.id,
      });
      done();
    });

    it("delete user", async () => {
      ({ user } = await new DeleteFormRequest({
        userId: user.id,
      }).call());
    });
  });
});
