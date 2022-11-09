const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");
const factory = require("@root/tests/utils/factory");
const CreateFormRequest = require("./CreateFormRequest");

describe("Role - CreateFormRequest", () => {
  describe("validation", () => {
    let createFormRequestDto;
    beforeEach(async (done) => {
      const recordFactories = await generateRecordFactories();
      ({ role } = recordFactories);
      createFormRequestDto = generateCreateFormRequestDto({
        name: role.name,
      });
      done();
    });

    it("can't create when role is exist", async () => {
      await expect(async () => {
        await new CreateFormRequest({ createFormRequestDto }).call();
      }).rejects.toThrow(
        new ApiError(httpStatus.BAD_REQUEST, "Role Name is Exist")
      );
    });
  });

  describe("success create", () => {
    let createFormRequestDto, roleForm;
    beforeEach(async (done) => {
      createFormRequestDto = generateCreateFormRequestDto({
        name: "Admin Supervisor",
      });
      ({ role: roleForm } = await new CreateFormRequest({
        createFormRequestDto,
      }).call());

      done();
    });

    it("create form with correct data", () => {
      expect(roleForm).toBeDefined();
      expect(roleForm.name).toEqual(createFormRequestDto.name);
    });
  });
});

const generateCreateFormRequestDto = ({ name }) => ({
  name,
});

const generateRecordFactories = async ({ role } = {}) => {
  role = await factory.role.create({});

  return {
    role,
  };
};
