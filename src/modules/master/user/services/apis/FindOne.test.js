const factory = require("@root/tests/utils/factory");
const FindOne = require("./FindOne");

describe("User - FindOne", () => {
  describe("success", () => {
    let user;
    beforeEach(async (done) => {
      const role = await factory.role.create({});
      user = await factory.user.create({
        role: role.id,
      });

      done();
    });

    it("return expected user", async () => {
      const { user: foundUser } = await new FindOne(user.id).call();

      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(user.id);
      expect(foundUser.username).toBe(user.username);
      expect(foundUser.firstName).toBe(user.firstName);
      expect(foundUser.lastName).toBe(user.lastName);
      expect(foundUser.email).toBe(user.email);
      expect(foundUser.phone).toBe(user.phone);
    });
  });
});
