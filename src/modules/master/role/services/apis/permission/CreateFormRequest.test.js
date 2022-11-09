const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const factory = require("@root/tests/utils/factory");
const CreateFormRequest = require("./CreateFormRequest");

describe("Permission - CreateFormRequest", () => {
  describe("validation", () => {
    let createFormRequestDto;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ permission } = recordFactories);
      createFormRequestDto = generateCreateFormRequestDto({
        name: permission.name,
      });
      done();
    });

    it("can't create when role is exist", async () => {
      await expect(async () => {
        await new CreateFormRequest({ createFormRequestDto }).call();
      }).rejects.toThrow(
        new ApiError(httpStatus.BAD_REQUEST, "Permission Name is Exist")
      );
    });
  });

  describe("success create", () => {
    let createFormRequestDto, permissionForm;
    beforeEach(async (done) => {
      createFormRequestDto = generateCreateFormRequestDto({
        name: "view permission",
      });
      ({ permission: permissionForm } = await new CreateFormRequest({
        createFormRequestDto,
      }).call());

      done();
    });

    it("create form with correct data", () => {
      expect(permissionForm).toBeDefined();
      expect(permissionForm.name).toEqual(createFormRequestDto.name);
    });
  });
});

const generateCreateFormRequestDto = ({ name }) => ({
  name,
});

const generateRecordFactories = async ({ permission } = {}) => {
  permission = await factory.permission.create({});

  return {
    permission,
  };
};
