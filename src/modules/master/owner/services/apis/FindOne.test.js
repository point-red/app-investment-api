const factory = require("@root/tests/utils/factory");
const FindOne = require("./FindOne");

describe("Owner - FindOne", () => {
  describe("success", () => {
    let owner;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ owner } = recordFactories);

      done();
    });

    it("return expected owner", async () => {
      const { owner: foundOwner } = await new FindOne(owner.id).call();

      expect(foundOwner).toBeDefined();
      expect(foundOwner.id).toBe(owner.id);
      expect(foundOwner.firstName).toBe(owner.firstName);
      expect(foundOwner.lastName).toBe(owner.lastName);
      expect(foundOwner.email).toBe(owner.email);
      expect(foundOwner.phone).toBe(owner.phone);
    });
  });
});

const generateRecordFactories = async ({ owner } = {}) => {
  owner = await factory.owner.create({});

  return {
    owner,
  };
};
