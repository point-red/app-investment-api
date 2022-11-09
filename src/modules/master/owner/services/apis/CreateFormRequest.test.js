const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const factory = require("@root/tests/utils/factory");
const CreateFormRequest = require("./CreateFormRequest");

describe("Owner - CreateFormRequest", () => {
  describe("validation", () => {
    let createFormRequestDto;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ owner } = recordFactories);
      createFormRequestDto = generateCreateFormRequestDto({
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
      });
      done();
    });

    it("can't create when owner is exist", async () => {
      await expect(async () => {
        await new CreateFormRequest({ createFormRequestDto }).call();
      }).rejects.toThrow(
        new ApiError(httpStatus.BAD_REQUEST, "Owner Email is Exist")
      );
    });
  });

  describe("success create", () => {
    let createFormRequestDto, ownerForm;
    beforeEach(async (done) => {
      createFormRequestDto = generateCreateFormRequestDto({
        firstName: "Brian",
        lastName: "Mcknight",
        email: "brian@gmail.com",
        phone: "022-123123",
      });
      ({ owner: ownerForm } = await new CreateFormRequest({
        createFormRequestDto,
      }).call());

      done();
    });

    it("create form with correct data", () => {
      expect(ownerForm).toBeDefined();
      expect(ownerForm.firstName).toEqual(createFormRequestDto.firstName);
      expect(ownerForm.lastName).toEqual(createFormRequestDto.lastName);
      expect(ownerForm.email).toEqual(createFormRequestDto.email);
      expect(ownerForm.phone).toEqual(createFormRequestDto.phone);
    });
  });
});

const generateCreateFormRequestDto = ({
  firstName,
  lastName,
  email,
  phone,
}) => ({
  firstName,
  lastName,
  email,
  phone,
});

const generateRecordFactories = async ({ owner } = {}) => {
  owner = await factory.owner.create({});

  return {
    owner,
  };
};
