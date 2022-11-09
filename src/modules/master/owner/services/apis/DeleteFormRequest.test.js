const factory = require("@root/tests/utils/factory");
const DeleteFormRequest = require("./DeleteFormRequest");

describe("Owner - DeleteFormRequest", () => {
  describe("success request", () => {
    let owner;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ owner } = recordFactories);
      done();
    });

    it("delete owner", async () => {
      ({ owner } = await new DeleteFormRequest({
        ownerId: owner.id,
      }).call());
    });
  });
});

const generateRecordFactories = async ({ owner } = {}) => {
  owner = await factory.owner.create({});

  return {
    owner,
  };
};
